import { StoryVersion } from '@plotbreak/contracts';

/**
 * "Every Platform a World" — one ticket, three hands, and a station between
 * worlds on the new stationmaster's first night.
 *
 * The first beat is a choice the player can make in one tap: a samurai, an
 * astronaut and a vampire queen each have a deadline and a hand on the only
 * golden ticket, and only the player's punch makes it valid. That is the whole
 * opener and it needs no lore. Everything else is a sandbox underneath it.
 *
 * The playable span is one night, 00:05 to dawn at 06:00, with the deadlines
 * staggered across it so that the clock is the antagonist: moonset at 02:40,
 * reserve air at 04:10, the castle at 05:20, the lamp at 06:00. Every deadline
 * is a world event with a cancel flag, so a player who acts in time genuinely
 * switches it off, and one who does not gets a consequence rather than a game
 * over. The night after dawn is still playable; it is just a different night.
 *
 * The structural bet is that the obvious choice is a trap and the good night is
 * found, not handed over. Each traveller carries a light from home that could
 * relight their own lamp at a personal cost (Ren's clan flame, Okafor's route
 * beacon, Isolde's crown-ring), Ida's torn ticket is a second ticket for anybody
 * who goes and asks her, and the golden ticket is the player's own. Nobody
 * volunteers any of it. The Conductor answers only the exact question, the
 * ledger has to be read, Lost Property has to be searched. A player who punches
 * on turn one has made a real choice and the night still has five hours in it.
 *
 * Three variables. Stamina is the one GOOD_HIGH, because `resolveRest` refills
 * those and a night shift genuinely runs out. Dimming is first among the
 * descending pair because PUBLIC_VIOLENCE and the generic cost path both take
 * the first GOOD_LOW in array order, and a fight on the concourse troubling the
 * station's lamps is exactly right. The Night Staff are first among the
 * factions for the same reason.
 */

const raw = {
  id: 'sv_every_platform_a_world_1',
  storyId: 'story_every_platform_a_world',
  version: 1,
  title: 'Every Platform a World',
  fantasyLabel: 'Three travellers, one ticket, your call.',
  hook: 'You are the night stationmaster at a station where every platform leads to a different world, and on your first shift three stranded travellers put their hands on the only golden ticket.',
  premise:
    'You took the night shift at Lantern Cross, a railway station that opens at dusk and closes at dawn. Every platform has a lamp, and while it burns, that platform’s train runs to a different world. Tonight is your first shift. At sunset the old stationmaster, forty-one years in the job, handed you her brass ticket punch and caught the 21:10 to the seaside.\n\n' +
    'At midnight three lamps went out at once, and three travellers were stranded on your concourse. Ren, a samurai, says his lord’s castle burns at dawn. Commander Okafor, an astronaut, says her crew has four hours of air. Isolde, a vampire queen, says her cousin is crowned at moonset unless she is there to stop it.\n\n' +
    'There is one golden ticket. Punched for a dark platform, it relights that lamp for one train, one passenger, one trip, and only your punch makes it valid. So you have to choose. Or find out which of them is lying. Or find another way before the deadlines start to fall.\n\n' +
    'The ticket came in an envelope with your name on it. And at six, somebody has to be standing at the lamp at the top of the station, or every lamp in Lantern Cross goes out.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Isekai', 'Fantasy', 'Adventure', 'Mystery', 'Romance'],
  mechanicsChips: [
    'Three travellers, one ticket',
    'Somebody is lying',
    'Six other worlds to visit',
    'There is a long way round',
    'Someone holds the lamp at dawn',
  ],
  contentDescriptors: ['FANTASY_VIOLENCE', 'ROMANCE', 'MORAL_AMBIGUITY'],
  intensity: 'MODERATE',
  creatorNote:
    'You can punch the ticket on your first turn and spend the night living with it. You can also leave all three of them at the counter and go looking for a second ticket, a better question, or a world of your own. Six platforms are open to you. The three that matter are dark. Somebody has to be at the lamp at six, and it does not have to be you.',
  coverDirection: [
    'Vertical anime key art at night inside a vast iron-and-glass railway station between worlds, nine platforms fanning away under lamps of different colours, three of the lamps dark.',
    'Foreground: an oak ticket counter behind a brass grille, one golden ticket lying on the wood, three hands reaching for it at once.',
    'Behind the counter, three travellers who do not belong together: a tall samurai in a scorched travelling coat with a black lacquered box tied at his hip; a woman astronaut in an orange pressure suit with her helmet under one arm and a blinking white beacon on her chest; a pale vampire queen in a high-collared black lace gown, a moonstone ring glowing over her long black glove.',
    'Warm gaslight against cold platform light, a stopped station clock overhead, glossy premium finish, clean title-safe space at the bottom.',
  ].join(' '),
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: true,
    allowsRomance: true,
    startingLocationId: 'ticket_counter',
    startWorldMinute: 5,
    startingItems: [
      { itemId: 'golden_ticket', qty: 1 },
      { itemId: 'ticket_punch', qty: 1 },
      { itemId: 'idas_envelope', qty: 1 },
    ],
    hardCanon: [
      'Lantern Cross is a railway station between worlds. It opens at dusk and closes at dawn. It has nine platforms, and while a platform’s lamp burns, its train runs to one world.',
      'The player is the new night stationmaster, an adult, on their first shift. Ida Fennimore, stationmaster for forty-one years, handed over her brass ticket punch at sunset and took the 21:10 from Platform 1 to retire on the Salt Coast.',
      'At midnight the lamps of Platforms 4, 6 and 8 went out, because Ida had been keeping those three weak lamps lit by hand. The station clock stopped at the same moment. Platforms 1, 2, 3, 5, 7 and 9 are lit and running.',
      'Three travellers are stranded: Ren Shiomi of House Uraga behind Platform 4, Commander Adaeze Okafor of the survey ship Long Patience behind Platform 6, and Queen Isolde of Ostravel behind Platform 8. All three are adults, and so is everyone else in this story.',
      'There is one golden ticket. It came in an envelope addressed to the player, because every stationmaster is given one, once, to anywhere. Punched for a dark platform it relights that lamp long enough for one train, one passenger, one trip.',
      'Only the stationmaster’s punch validates a ticket. In anyone else’s hand the punch is cold brass and will not close.',
      'A dark lamp can also be relit by a light carried from its own world and given up freely by the person who carried it: Ren’s clan flame, Okafor’s survey beacon, Isolde’s moonstone crown-ring. A stolen light will not catch. Nobody volunteers this. The Conductor, Ida’s ledger, Lost Property and the lamp-wright at the Owl Market can each be made to give it up.',
      'Forty-one years ago Ida tore her own golden ticket in half so she could not leave. One half is in a Lost Property drawer marked TICKETS, ASSORTED; she keeps the other in her purse on the Salt Coast. Laid together under the stationmaster’s punch and freely given, the halves make one working ticket.',
      'At 06:00 somebody must be standing at the master lamp in the Lamp Room. Whoever is there becomes stationmaster from then on. If nobody is, every lamp in the station goes out. A stationmaster who is in another world at dawn cannot come back to the job.',
      'The deadlines, in station time: Isolde’s cousin Casimir is crowned at moonset, 02:40. Okafor’s crew runs out of reserve air at 04:10 and goes into emergency cold sleep, alive and adrift. The last train back from the Salt Coast leaves at 05:15. Castle Akebono burns at Ren’s dawn, 05:20. Dawn at Lantern Cross is 06:00.',
      'The Conductor runs every train, answers exactly the question he is asked, cannot climb the Lamp Room stair, and can stop any train or any fight on the concourse with a word. He cannot command the stationmaster.',
      'Isolde is lying about wanting to go home. Ren’s need is true, and what he means to do at home is treason under his lord’s law. Okafor’s need is true, and she also carries sealed orders to bring the station’s secret back to her Directorate.',
    ],
    toneGuide:
      'A night shift at a railway station that happens to connect worlds: warm, quick, a little uncanny. Small physical detail carries it — the stopped clock, the samovar, frost on one platform and cedar smoke on another, three hands on one ticket. ' +
      'Every beat is somebody wanting something from the stationmaster, out loud. The three travellers come from stories that do not belong together, and a samurai, an astronaut and a vampire queen sharing one waiting room is allowed to be funny while the clock runs. Nobody at the counter is a villain and every claim is reasonable. ' +
      'The long way round is found, never handed over: the Conductor answers only the exact question asked, the ledger has to be read, Lost Property has to be searched. Deadlines fire on time whether or not the player is looking, and a missed one is a consequence the night carries, never a game over. ' +
      'Romance with any of the three adults stays at flirting, tension and at most a kiss. Violence on the concourse is short, legible and costly, and the Conductor ends it. Isolde never feeds at the station and feeding is never shown. The face at the top of a beat belongs to whichever traveller is pressing the stationmaster hardest.',
    proseStyle: 'webnovel',
    styleExamples: [
      "Ren doesn’t move his hand from the ticket.\n\n\"Stationmaster.\" Quiet. \"My lord’s castle burns at dawn.\"\n\nIsolde laughs, low. \"Everybody’s castle burns at dawn, darling. That is what dawn is for.\"\n\nRen turns his head one inch.\n\nThe Conductor is suddenly at the end of the counter, white gloves folded over his watch.\n\n\"01:31,\" he says. \"No blades on the concourse.\"\n\nNobody has drawn anything.\n\nYet.",
      "Okafor has Lost Property’s third shelf on the floor around her.\n\n\"Item one,\" she says, not looking up. \"Your station has eleven umbrellas from my planet and not one battery.\"\n\nShe holds up a jar of keys. They are singing.\n\n\"Item two. Why are they doing that?\"\n\nYou don’t know.\n\nShe puts the jar down very gently, as if it were the last thing between her crew and four o’clock.\n\n\"Copy,\" she says. \"Next shelf.\"",
    ],
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 10, agility: 11, mind: 12, presence: 12, resolve: 12, arcana: 9 },
  skills: [
    { id: 'listening', name: 'Listening', attribute: 'presence', description: 'Letting a frightened person finish, and hearing the part they left out.' },
    { id: 'reading_people', name: 'Reading People', attribute: 'mind', description: 'Seeing where a story and the hands telling it disagree.' },
    { id: 'station_lore', name: 'Station Lore', attribute: 'arcana', description: 'Knowing what the lamps, the trains and the rules of Lantern Cross will actually do.' },
    { id: 'authority', name: 'Authority', attribute: 'resolve', description: 'Being obeyed in a uniform that still fits somebody else.' },
    { id: 'rummaging', name: 'Rummaging', attribute: 'mind', description: 'Finding the one thing that matters in a room of a million lost things.' },
    { id: 'footwork', name: 'Footwork', attribute: 'agility', description: 'Getting between two people before either of them has finished deciding.' },
    { id: 'brawn', name: 'Brawn', attribute: 'might', description: 'Luggage, stuck doors, and travellers who do not want to be moved.' },
  ],
  /**
   * Three, all invisible.
   *
   * Stamina is the only GOOD_HIGH: rest and station tea restore it, and the
   * generic cost path spends it, which is right — the price of a bad exchange on
   * a night shift is that you have less night left in you.
   *
   * Dimming is first among the descending pair on purpose. PUBLIC_VIOLENCE adds
   * to the first GOOD_LOW in array order, and the station's lamps reacting to a
   * fight on the concourse is the honest consequence. Both descending resources
   * settle on their own when nobody is making things worse, so their bottom
   * bands are reachable.
   */
  resources: [
    {
      id: 'stamina',
      name: 'Stamina',
      max: 100,
      start: 85,
      regenPerHour: 1,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'The stationmaster is running on nothing. Words come out late and flat, the stairs to the Lamp Room look like a mountain, and the travellers notice — Okafor offers a stim she should be saving, Isolde gets kinder, which is worse, and Ren simply waits for them to sit down.',
      color: '#E8B04B',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Running on fumes at four in the morning. The player misses things that are said to them, agrees to things to end conversations, and anyone pressing them gets further than they should. A cup of tea or ten minutes on a bench is the correct move and the beat can say so.',
        },
        {
          upTo: 60,
          behaviour:
            'The ordinary tiredness of a long night. Fine for one more conversation and honest about not wanting a second trip to the Salt Coast. Nobody needs to remark on it unless the player pushes into something physical or lengthy.',
        },
        {
          upTo: 100,
          behaviour:
            'The night is still in front of them. The player can take a train to another world and back, climb the ninety-nine stairs twice, and hold three arguments at once without losing the thread. Scenes can be long and can go somewhere.',
        },
      ],
    },
    {
      id: 'dimming',
      name: 'Dimming',
      max: 100,
      start: 20,
      regenPerHour: -1.5,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'Every lit lamp in Lantern Cross burns steady and bright, trains come in on the minute, and the porters nod at the stationmaster as they pass, which they have never done for anyone but Ida.',
      color: '#7FA7C9',
      bands: [
        {
          upTo: 20,
          behaviour:
            'The station is calm. Lit lamps burn steady, trains run to the minute, the samovar is hot and the porters keep out of the way. The world beyond the open platforms feels close and easy to reach.',
        },
        {
          upTo: 50,
          behaviour:
            'Something has troubled the station. The lit lamps flicker when voices are raised, the next train on Platform 5 comes in three minutes late, and the Conductor is standing somewhere he can see the player without being asked.',
        },
        {
          upTo: 80,
          behaviour:
            'The lamps are visibly guttering. One of the six open lines runs a train with nobody on it, the board shows a destination for a second and loses it, and the Regulars start leaving early. The Conductor says the time out loud every time he passes, which is his way of shouting.',
        },
        {
          upTo: 100,
          behaviour:
            'The station is close to failing. A fourth lamp is about to go out, and the narrator should name which one: the Owl Market line first. Trains stop mid-platform. Nothing about this is a game over, but every lit world now feels further away and every crossing costs more.',
        },
      ],
    },
    {
      id: 'unrest',
      name: 'Unrest',
      max: 100,
      start: 35,
      regenPerHour: -0.5,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'All three travellers have stopped watching each other and started watching the clock together. They share the samovar, they lend each other things, and they will accept whatever the stationmaster decides because they believe it was decided fairly.',
      color: '#C46A5A',
      bands: [
        {
          upTo: 25,
          behaviour:
            'The three of them trust the stationmaster to be fair. They argue their cases and then wait. They help each other in small ways — Okafor fixes Ren’s sword cord, Isolde lends Okafor a glove — and they will tell the player things they would not tell each other.',
        },
        {
          upTo: 55,
          behaviour:
            'The ordinary tension of three people with one ticket between them. Courteous, watchful, and each quietly making a case whenever the player passes. This is where most of the night should live.',
        },
        {
          upTo: 80,
          behaviour:
            'They have started acting for themselves. Two of them make an arrangement the third is not told about, somebody goes through Okafor’s pack or Isolde’s purse, and Ren stands where he can see the punch at all times. A promise made now is remembered word for word.',
        },
        {
          upTo: 100,
          behaviour:
            'Somebody is going to try to take the ticket or the punch, and probably the stairs to the lamp. Ren’s hand stays on his hilt, Isolde stops being charming, and Okafor reads out her orders to herself under her breath. The Conductor stays within ten paces of the stationmaster.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'golden_ticket',
      name: 'The Golden Ticket',
      tags: ['quest', 'ticket'],
      questItem: true,
      description:
        'Stiff gold card, warm to the touch, printed with nine platform numbers and no destination. It goes wherever the stationmaster’s punch says. It has never been punched.',
      loreText:
        'Every stationmaster is given one, once. Ida never used hers, and the envelope this one came in has your name on it in her round handwriting.',
      icon: 'ticket',
    },
    {
      id: 'ticket_punch',
      name: 'The Ticket Punch',
      tags: ['quest', 'tool'],
      questItem: true,
      droppable: false,
      description:
        'Brass clippers on a chain, worn bright where forty-one years of one thumb pressed them. In your hand they bite clean through card. In anybody else’s they are cold and will not close.',
      loreText:
        'The jaws cut a small lantern shape, which is how every valid ticket through this station has been marked since the first one.',
      icon: 'tools',
    },
    {
      id: 'idas_envelope',
      name: 'Ida’s Envelope',
      tags: ['document', 'personal'],
      description:
        'A brown envelope with your name on it in round capitals. Inside, a note: "Every stationmaster gets one, once, to anywhere. This is yours. Don’t let anyone tell you what it’s for. Be at the lamp at six. I.F."',
      loreText:
        'There is a ring on the back from a teacup, and one more line in pencil, added at the last minute: "Ask the old man the right question."',
      icon: 'letter',
    },
    {
      id: 'stationmasters_ledger',
      name: 'The Stationmaster’s Ledger',
      tags: ['document'],
      skillModifiers: { station_lore: 2 },
      description:
        'Forty-one years of night shifts in Ida’s hand: lamps trimmed, trains late, travellers sent home. Platforms 4, 6 and 8 are marked "weak, trim by hand" on almost every page. Near the back, under LAMPS, she has written: "From home, given freely. Never stolen."',
      loreText:
        'The first page is not hers. It is a list of stationmasters in many hands, going back further than the station’s own timetable, and the first name on it is underlined twice: Caspar Ashdown.',
      icon: 'book',
    },
    {
      id: 'torn_ticket',
      name: 'Half a Golden Ticket',
      tags: ['quest', 'ticket'],
      questItem: true,
      description:
        'The left half of a golden ticket, torn clean across, from a drawer in Lost Property marked TICKETS, ASSORTED. The first two letters of a name are still printed across the top: I and D.',
      loreText: 'The tear is very straight. Somebody did it slowly, on purpose, and probably on a counter.',
      icon: 'ticket',
    },
    {
      id: 'idas_half',
      name: 'Ida’s Half',
      tags: ['quest', 'ticket'],
      questItem: true,
      description: 'The right half of the same golden ticket, soft from forty-one years in a purse with a rubber band round it.',
      loreText: 'She has looked at it, by her own account, about once a week.',
      icon: 'ticket',
    },
    {
      id: 'mended_ticket',
      name: 'The Mended Ticket',
      tags: ['quest', 'ticket'],
      questItem: true,
      description:
        'Two halves of one golden ticket laid together under the punch and joined along the tear by a thin line of light that does not fade. It works. It works once.',
      loreText: 'The name across the top now reads IDA FENNIMORE, and under it, very small, yours.',
      icon: 'ticket',
    },
    {
      id: 'clan_flame',
      name: 'The Clan Flame',
      tags: ['quest', 'personal'],
      questItem: true,
      description:
        'A black lacquered box tied with red cord. Inside, a stub of shrine candle burning with a small steady flame that has not gone out in nine generations.',
      loreText:
        'House Uraga believes it lives as long as this flame does. Ren was ordered to carry it out of the castle and keep it alive, and so far he has.',
      icon: 'lantern',
    },
    {
      id: 'survey_beacon',
      name: 'Okafor’s Beacon',
      tags: ['quest', 'tech'],
      questItem: true,
      description:
        'A palm-sized survey beacon that blinks white every four seconds. It has logged every metre of the route from her ship to Platform 6.',
      loreText: 'Amber means her crew has gone into emergency cold sleep. She has told you that once, flatly, and not again.',
      icon: 'beacon',
    },
    {
      id: 'sealed_orders',
      name: 'The Sealed Orders',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'A data card under a Directorate seal. Item one: locate the station. Item two: log a repeatable route. Item three: if possible, recover the device that controls its tickets.',
      loreText: 'The seal has been broken and pressed shut again, more than once.',
      icon: 'card',
    },
    {
      id: 'moonstone_ring',
      name: 'The Moonstone Ring',
      tags: ['quest', 'personal'],
      questItem: true,
      description:
        'Ostravel’s crown-ring, a moonstone in old silver, worn over a black glove. It holds a little moonlight from home, and it brightens very slightly whenever Isolde says the word.',
      loreText:
        'No one in Ostravel can be crowned without it. Casimir is being crowned tonight with a copy, and the court has agreed not to notice.',
      icon: 'ring',
    },
    {
      id: 'station_timetable',
      name: 'The Station Timetable',
      tags: ['document'],
      skillModifiers: { station_lore: 1 },
      description:
        'A folded card timetable for six open lines. Platform 1, ten past every hour, forty minutes, last return 05:15. Platform 5, every half hour, twenty-five minutes. Platforms 4, 6 and 8 have been crossed out in fresh pencil.',
      loreText: 'The Conductor reprinted it at 00:01. The ink is still a little wet.',
      icon: 'papers',
    },
    {
      id: 'station_tea',
      name: 'Station Tea',
      tags: ['consumable'],
      stackable: true,
      maxStack: 6,
      consumable: { resourceId: 'stamina', amount: 15, consumesItem: true },
      description: 'Strong, sweet and very hot, from the samovar in the waiting room that has never once been empty.',
      loreText: 'Ida’s rule: nobody makes a decision on an empty cup.',
      icon: 'mug',
    },
    {
      id: 'your_old_stub',
      name: 'Your Old Return Stub',
      tags: ['personal', 'ticket'],
      description:
        'A brown return stub from the night you first arrived here, years ago, for a train back to where you came from. You never used it. It expired at dawn that first morning.',
      loreText:
        'Ida punched the corner with the little lantern, which is what she did to the tickets of people she hoped would stay.',
      icon: 'ticket',
    },
  ],
  abilities: [
    {
      id: 'hear_them_out',
      name: 'Hear Them Out',
      tags: ['social'],
      description: 'Let one traveller make their whole case without interrupting, and hear what they leave out.',
      affordances: ['hear them out', 'listen', 'let him talk', 'let her talk', 'ask why', 'ask what happened', 'what do you need', 'tell me everything'],
      costs: [{ resourceId: 'stamina', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'listening', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'read_the_traveller',
      name: 'Read the Traveller',
      tags: ['sight'],
      description: 'Watch somebody tell their story and notice where their hands, their eyes or their ring disagree with it.',
      affordances: ['read her', 'read him', 'watch them', 'is she lying', 'is he lying', 'study them', 'look closer', 'notice'],
      costs: [{ resourceId: 'stamina', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'reading_people', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'lay_down_the_rules',
      name: 'Lay Down the Rules',
      tags: ['social'],
      description: 'Say the station’s rules out loud in the stationmaster’s voice, and make three people from three worlds hear them.',
      affordances: ['lay down the rules', 'hands off', 'step back', 'that is enough', 'the rules are', 'nobody touches it', 'by the rules', 'order them'],
      costs: [
        { resourceId: 'stamina', amount: 6 },
        { resourceId: 'unrest', amount: 4 },
      ],
      cooldownMinutes: 0,
      targetRule: 'AREA',
      check: { attribute: 'resolve', skillId: 'authority', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'clip_a_ticket',
      name: 'Clip a Ticket',
      tags: ['utility'],
      description: 'Close the brass punch on a ticket and make it valid for a platform. Nothing about this can be taken back.',
      affordances: ['clip the ticket', 'punch the ticket', 'validate it', 'give him the ticket', 'give her the ticket', 'let him ride', 'let her ride', 'use it myself'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'make_a_deal',
      name: 'Make a Deal',
      tags: ['social'],
      description: 'Offer somebody something you can actually give, for something you actually need, and shake on it in front of witnesses.',
      affordances: ['make a deal', 'bargain', 'offer', 'trade', 'promise', 'i will owe you', 'pay with time'],
      costs: [
        { resourceId: 'stamina', amount: 5 },
        { resourceId: 'unrest', amount: 6 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'listening', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'search_lost_property',
      name: 'Search Lost Property',
      tags: ['utility'],
      description: 'Go through the shelves for the one thing tonight needs, in a room that has everything anybody ever left on a train.',
      affordances: ['search lost property', 'look through the shelves', 'dig through', 'rummage', 'find something useful', 'check the drawers', 'search'],
      costs: [{ resourceId: 'stamina', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'rummaging', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'walk_the_lines',
      name: 'Walk the Lines',
      tags: ['sight'],
      description: 'Walk the platforms, read the lamps and the board, and learn what the station is doing tonight.',
      affordances: ['walk the platforms', 'check the lamps', 'read the board', 'inspect the platform', 'look at the lamp', 'check the timetable', 'walk the lines'],
      costs: [{ resourceId: 'stamina', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'arcana', skillId: 'station_lore', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'step_between',
      name: 'Step Between',
      tags: ['defensive'],
      description: 'Put yourself between two travellers who are about to stop talking, before either of them moves.',
      affordances: ['step between', 'get between them', 'break it up', 'stop them', 'calm down', 'separate them', 'stand in the way'],
      costs: [
        { resourceId: 'stamina', amount: 8 },
        { resourceId: 'dimming', amount: 3 },
      ],
      cooldownMinutes: 0,
      targetRule: 'AREA',
      check: { attribute: 'agility', skillId: 'footwork', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'lay_hands_on',
      name: 'Lay Hands On',
      tags: ['offensive'],
      description: 'Physically grab, restrain or throw somebody off your concourse. The station notices every time.',
      affordances: ['grab him', 'grab her', 'restrain', 'throw them out', 'wrestle', 'drag', 'pin', 'force it'],
      costs: [
        { resourceId: 'stamina', amount: 10 },
        { resourceId: 'dimming', amount: 10 },
        { resourceId: 'unrest', amount: 8 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'might', skillId: 'brawn', baseDc: 15 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'relight_a_lamp',
      name: 'Relight a Lamp',
      tags: ['utility'],
      description: 'Set a light carried from a dark platform’s own world into its lamp, given freely, and let the line take it. The light does not come back.',
      affordances: ['relight the lamp', 'light the lamp', 'put it in the lamp', 'give it to the lamp', 'use the flame', 'use the beacon', 'use the ring'],
      costs: [{ resourceId: 'stamina', amount: 12 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'arcana', skillId: 'station_lore', baseDc: 14 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:home_light'],
        lockedCopy:
          'The lamp glass is cold and the wick is black. You could hold a match to it all night. Whatever lights a dark lamp, you have not found it yet.',
      },
    },
  ],
  locations: [
    {
      id: 'ticket_counter',
      name: 'The Ticket Counter',
      shortName: 'Counter',
      description:
        'Your counter: a long oak booking desk behind a brass grille at the head of the concourse, with a bell, an ink pad and Ida’s chair still warm. From here you can see every platform lamp, and which three are dark. The only way out is onto the concourse.',
      artDirection:
        'Victorian railway booking office at night, long oak counter behind a brass grille, warm gaslight, an ink pad and a service bell, a golden ticket on the wood, the iron-and-glass concourse visible beyond. Warm, dramatic, anime key art.',
      connections: [{ to: 'the_concourse', travelMinutes: 1, label: 'Out onto the concourse' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [],
    },
    {
      id: 'the_concourse',
      name: 'The Concourse',
      shortName: 'Concourse',
      description:
        'A vast iron-and-glass hall with nine platforms fanned out from it, each under its own coloured lamp, and a station clock over the board that stopped at midnight. Off it: your ticket counter, the first-class waiting room, Lost Property, a spiral stair of ninety-nine steps up to the Lamp Room, and the Conductor’s carriage on a siding at the far end. Platforms 4, 6 and 8 are dark. The other six are lit: 1 to the Salt Coast, 2 to a desert of glass, 3 to a city built on bridges, 5 to the Owl Market, 7 to a snowfield of sleeping giants, 9 to a forest that is all one tree.',
      artDirection:
        'Enormous iron-and-glass railway concourse at night, nine platforms fanning out, each under a lamp of a different colour, three of them dark, a stopped clock over a flip departure board, a spiral iron stair climbing to a glass room above. Cavernous, warm and strange.',
      connections: [
        { to: 'ticket_counter', travelMinutes: 1, label: 'Back behind your counter' },
        { to: 'waiting_room', travelMinutes: 2, label: 'The first-class waiting room' },
        { to: 'lost_property', travelMinutes: 2, label: 'Lost Property' },
        { to: 'lamp_room', travelMinutes: 4, label: 'Up the ninety-nine stairs' },
        { to: 'conductors_carriage', travelMinutes: 5, label: 'The carriage on the siding' },
        { to: 'platform_four', travelMinutes: 2, label: 'Platform 4' },
        { to: 'platform_six', travelMinutes: 3, label: 'Platform 6' },
        { to: 'platform_eight', travelMinutes: 4, label: 'Platform 8' },
        { to: 'salt_coast', travelMinutes: 40, label: 'The ten-past train from Platform 1' },
        { to: 'owl_market', travelMinutes: 25, label: 'The half-hourly train from Platform 5' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
      takeableItems: [
        { itemId: 'station_timetable', qty: 1, ownerId: null, aka: ['timetable', 'the timetable', 'the train times'] },
      ],
    },
    {
      id: 'lamp_room',
      name: 'The Lamp Room',
      shortName: 'Lamp Room',
      description:
        'At the top of ninety-nine iron stairs from the concourse, a round glass room over the whole station. Nine lamp-glasses in a row, three of them black. The master lamp in the middle, which somebody must stand beside at six. Ida’s desk with her ledger on it, and a card table with two chairs, one of them hers. The only way down is the stair.',
      artDirection:
        'Round glass signal room high above a railway concourse at night, nine lamp glasses in a row with three dark, a tall brass master lamp in the centre, an old desk with a ledger, a small card table with two chairs and a deck of cards. Quiet, high, lamplit.',
      connections: [{ to: 'the_concourse', travelMinutes: 4, label: 'Down the stair' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 3 },
      takeableItems: [
        { itemId: 'stationmasters_ledger', qty: 1, ownerId: null, aka: ['ledger', 'the ledger', 'her ledger', 'the logbook'] },
      ],
    },
    {
      id: 'lost_property',
      name: 'Lost Property',
      shortName: 'Lost Property',
      description:
        'A long room off the concourse, shelved to the roof with everything ever left on a train through Lantern Cross: umbrellas from a thousand worlds, a stuffed bear the size of a door, a jar of keys that sing when it is opened. Every label is in Ida’s handwriting. Near the back is a drawer marked TICKETS, ASSORTED.',
      artDirection:
        'Long narrow lost-property room with shelves to a high ceiling, crammed with umbrellas, hats, cases, a huge stuffed bear, glass jars, handwritten labels, one drawer half open. Dusty lamplight, wonder and clutter.',
      connections: [{ to: 'the_concourse', travelMinutes: 2, label: 'Back to the concourse' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 1 },
      takeableItems: [
        { itemId: 'torn_ticket', qty: 1, ownerId: null, aka: ['half a ticket', 'the torn ticket', 'the gold half', 'tickets, assorted'] },
      ],
    },
    {
      id: 'waiting_room',
      name: 'The First-Class Waiting Room',
      shortName: 'Waiting Room',
      description:
        'Velvet benches, a coal fire, a brass samovar that is never empty, and heavy curtains for travellers who do not like daylight. Ren has the spot by the fire, Okafor’s helmet is on the table, and Isolde has the curtained corner. One door, back out to the concourse.',
      artDirection:
        'Old first-class railway waiting room at night, velvet benches, a coal fire, a tall brass samovar, heavy drawn curtains in one corner, a spacesuit helmet on a table. Warm, plush, a little faded.',
      connections: [{ to: 'the_concourse', travelMinutes: 2, label: 'Back to the concourse' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 1 },
      takeableItems: [
        { itemId: 'station_tea', qty: 3, ownerId: null, aka: ['tea', 'a cup of tea', 'the samovar'] },
        { itemId: 'clan_flame', qty: 1, ownerId: 'ren', aka: ['the lacquered box', 'his box', 'the flame', 'the candle'] },
        { itemId: 'moonstone_ring', qty: 1, ownerId: 'isolde', aka: ['her ring', 'the moonstone', 'the crown-ring'] },
      ],
    },
    {
      id: 'conductors_carriage',
      name: 'The Conductor’s Carriage',
      shortName: 'Carriage',
      description:
        'The last carriage of a train that never leaves, on a siding at the far end of the concourse. Brass fittings, timetables pinned six deep, a kettle, a narrow bunk nobody has seen used, and a window that looks straight at the foot of the Lamp Room stair.',
      artDirection:
        'Interior of an old railway carriage at night, brass fittings, layered timetables pinned to wood panelling, a kettle on a small stove, a neat unused bunk, a window framing a spiral stair outside. Orderly, lonely.',
      connections: [{ to: 'the_concourse', travelMinutes: 5, label: 'Back along the siding' }],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 1 },
      takeableItems: [],
    },
    {
      id: 'platform_four',
      name: 'Platform 4',
      shortName: 'Platform 4',
      description:
        'A dark platform off the concourse under a lamp of cold vermilion glass. The tunnel at the end smells of cedar smoke. A train to Ren’s world ran from here until midnight; when the lamp is lit, the line runs to the road below Castle Akebono.',
      artDirection:
        'Dark railway platform at night under an unlit vermilion lamp, a black tunnel mouth breathing faint smoke, ash on the platform edge, the bright concourse behind. Tense and still.',
      connections: [
        { to: 'the_concourse', travelMinutes: 2, label: 'Back to the concourse' },
        { to: 'akebono_road', travelMinutes: 15, lockedByFlag: 'lamp_four_lit', label: 'The train to Castle Akebono' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 2 },
      takeableItems: [],
    },
    {
      id: 'akebono_road',
      name: 'The Road Below Castle Akebono',
      shortName: 'Akebono',
      description:
        'A riverside road at the foot of a castle on a hill, an hour before dawn. Besieging campfires along the far bank, pitch barrels stacked against the keep, and three hundred townspeople asleep in the lower bailey behind the river gate. The way back to Lantern Cross is the train at the river stop, to Platform 4.',
      artDirection:
        'Japanese-style castle on a hill before dawn, a riverside road, a heavy river gate in the lower wall, enemy campfires on the far bank, barrels stacked against the keep. Smoky blue light, high stakes.',
      connections: [{ to: 'platform_four', travelMinutes: 15, label: 'The train back to Platform 4' }],
      discoveredByDefault: false,
      mapPosition: { x: -2, y: 3 },
      takeableItems: [],
    },
    {
      id: 'platform_six',
      name: 'Platform 6',
      shortName: 'Platform 6',
      description:
        'A dark platform off the concourse under a white lamp gone black. Frost on the rails, scorch marks where a small spacecraft tender set down at ten to midnight, and Okafor’s pack against a pillar. When the lamp is lit, the line runs out to the survey ship Long Patience.',
      artDirection:
        'Dark railway platform with frost on the rails and a dead white lamp, scorch marks on the stone, a small battered spacecraft tender parked at the end, an orange pack against an iron pillar. Cold, quiet.',
      connections: [
        { to: 'the_concourse', travelMinutes: 3, label: 'Back to the concourse' },
        { to: 'long_patience', travelMinutes: 20, lockedByFlag: 'lamp_six_lit', label: 'Down the line to the Long Patience' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 2 },
      takeableItems: [
        { itemId: 'survey_beacon', qty: 1, ownerId: 'okafor', aka: ['beacon', 'the beacon', 'her beacon'] },
        { itemId: 'sealed_orders', qty: 1, ownerId: 'okafor', aka: ['orders', 'her orders', 'the data card', 'the sealed card'] },
      ],
    },
    {
      id: 'long_patience',
      name: 'The Bridge of the Long Patience',
      shortName: 'Long Patience',
      description:
        'The bridge of a deep-space survey ship in a dead orbit: emergency red lighting, frost on the inside of the windows, six crew in thermal blankets taking slow breaths. The way back is the tender in the docking bay, down the line to Platform 6.',
      artDirection:
        'Cramped spaceship bridge in emergency red light, frost on the inside of the viewports, a planet below, crew wrapped in silver thermal blankets at their stations. Claustrophobic and hopeful.',
      connections: [{ to: 'platform_six', travelMinutes: 20, label: 'The tender back to Platform 6' }],
      discoveredByDefault: false,
      mapPosition: { x: 0, y: 4 },
      takeableItems: [],
    },
    {
      id: 'platform_eight',
      name: 'Platform 8',
      shortName: 'Platform 8',
      description:
        'A dark platform off the concourse under a lamp of violet glass. Pale moths settle on the benches and will not leave. When the lamp is lit, the line runs to Ostravel and the Moonward Court.',
      artDirection:
        'Dark railway platform under an unlit violet lamp, pale moths on iron benches, a velvet rope across the platform edge, frost-silver tracks running into darkness. Gothic and hushed.',
      connections: [
        { to: 'the_concourse', travelMinutes: 4, label: 'Back to the concourse' },
        { to: 'moonward_court', travelMinutes: 15, lockedByFlag: 'lamp_eight_lit', label: 'The night train to Ostravel' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 2 },
      takeableItems: [],
    },
    {
      id: 'moonward_court',
      name: 'The Moonward Court',
      shortName: 'Ostravel',
      description:
        'The throne hall of Ostravel, where it is always night: a floor of black glass, a ceiling open to an enormous moon, and the night nobility in silver and black. Until moonset it is dressed for Lord Casimir’s coronation. The way back is the night train to Platform 8.',
      artDirection:
        'Gothic throne hall with a black glass floor reflecting an enormous moon through an open ceiling, nobles in black and silver, an empty throne dressed for a coronation. Cold, beautiful, dangerous.',
      connections: [{ to: 'platform_eight', travelMinutes: 15, label: 'The night train back to Platform 8' }],
      discoveredByDefault: false,
      mapPosition: { x: 2, y: 3 },
      takeableItems: [],
    },
    {
      id: 'salt_coast',
      name: 'The Salt Coast',
      shortName: 'Salt Coast',
      description:
        'A harbour town in another world, forty minutes from the concourse by the Platform 1 train. Boats with lanterns, a fish restaurant open all night, and Ida Fennimore at a table outside it with her purse on her knee. The last train back to Lantern Cross leaves at a quarter past five.',
      artDirection:
        'Small harbour town at night, lantern-lit fishing boats, a fish restaurant with tables outside on the quay, an old woman with a towel round her neck eating late, the sea black and calm. Cosy and salty.',
      connections: [{ to: 'the_concourse', travelMinutes: 40, label: 'The train back to Lantern Cross' }],
      discoveredByDefault: true,
      mapPosition: { x: -2, y: 1 },
      takeableItems: [
        { itemId: 'idas_half', qty: 1, ownerId: 'ida', aka: ['her half', 'the other half', 'ida’s half'] },
      ],
    },
    {
      id: 'owl_market',
      name: 'The Owl Market',
      shortName: 'Owl Market',
      description:
        'A night bazaar twenty-five minutes from the concourse by the Platform 5 train, under strings of paper lamps. Stall-keepers sell almost anything, and the price is always paid in minutes: you agree a number, and it is gone from your night. A lamp-wright at the far end will answer one question about lamps for an hour.',
      artDirection:
        'Crowded night bazaar under strings of paper lanterns, stalls of brass, glass and cloth, traders with owl-feather cloaks, a lamp-maker’s stall glowing at the far end. Busy, magical, a little greedy.',
      connections: [{ to: 'the_concourse', travelMinutes: 25, label: 'The train back to Lantern Cross' }],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 0 },
      takeableItems: [],
    },
  ],
  factions: [
    {
      id: 'faction_station',
      name: 'The Night Staff',
      description:
        'The Conductor, eleven porters who have not spoken to a passenger in living memory, and the tea trolley. They answer to whoever stands at the lamp at dawn, and until then they are watching to see whether it will be you.',
      startingReputation: 20,
      ranks: [
        { atReputation: 0, label: 'The new one' },
        { atReputation: 35, label: 'Stationmaster on trial' },
        { atReputation: 65, label: 'The lamp answers to you' },
      ],
      allies: ['faction_regulars'],
      enemies: [],
    },
    {
      id: 'faction_regulars',
      name: 'The Regulars',
      description:
        'Traders from the Owl Market, pilgrims and night-shift commuters from the six open worlds, who have used Lantern Cross every night for years. They loved Ida. They have not decided about you, and thirty of them arrive at twenty to one.',
      startingReputation: 15,
      ranks: [
        { atReputation: 0, label: 'A stranger at Ida’s counter' },
        { atReputation: 30, label: 'The new night stationmaster' },
        { atReputation: 60, label: 'One of ours' },
      ],
      allies: ['faction_station'],
      enemies: [],
    },
    {
      id: 'faction_uraga',
      name: 'House Uraga',
      description:
        'Ren’s lord’s house: Lord Uraga Shigemasa, forty retainers on the walls of Castle Akebono, and an ancestral flame the house believes keeps it alive. Under siege tonight, and planning to burn its own castle at dawn with the enemy inside it.',
      startingReputation: 0,
      ranks: [
        { atReputation: 0, label: 'Strangers' },
        { atReputation: 25, label: 'Friend of the house' },
        { atReputation: 50, label: 'The house owes you' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_directorate',
      name: 'The Outer Survey Directorate',
      description:
        'Okafor’s employers: a careful, well-funded agency in a spacefaring world that found Platform 6’s lamp in old telemetry and would very much like a repeatable route to it, and the device that controls its tickets.',
      startingReputation: 0,
      ranks: [
        { atReputation: 0, label: 'Unknown quantity' },
        { atReputation: 30, label: 'Person of interest' },
        { atReputation: 60, label: 'Partner' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_moonward',
      name: 'The Moonward Court',
      description:
        'The night nobility of Ostravel, a kingdom where it is always night. Split between Isolde, who has ruled for two hundred years, and her cousin Casimir, who means to be crowned at moonset and shut the human quarter behind its gates.',
      startingReputation: 0,
      ranks: [
        { atReputation: 0, label: 'Outsider' },
        { atReputation: 30, label: 'Received at court' },
        { atReputation: 60, label: 'Friend of the crown' },
      ],
      allies: [],
      enemies: [],
    },
  ],
  characters: [
    {
      id: 'ren',
      name: 'Ren Shiomi',
      role: 'Samurai of House Uraga, sent out of a besieged castle with his lord’s last order, and trying to get back in',
      cardBlurb:
        'He was ordered to save a flame and has decided to save three hundred people instead, and he needs you to punch his ticket before he has to explain why.',
      pronouns: 'he/him',
      publicTraits: ['Courteous to the point of menace', 'Stands very still', 'Keeps his word even when it was a bad word to give'],
      hiddenDrives: [
        'He has already decided to disobey his lord, and wants one person to know it was a decision and not a panic',
        'He would like, once, to be asked what he wants rather than what he owes',
      ],
      values: ['A promise kept to people who never heard it made', 'Not drawing a blade indoors'],
      fears: [
        'Arriving after the fire',
        'That the flame he carries is worth more than the people he left behind, and that he will choose it',
      ],
      socialStyle: 'Bows before he argues. Says one thing, then waits as long as it takes for an answer, which can be very long.',
      boundaries: [
        'Will not speak against his lord to a stranger, so the real reason has to be earned',
        'Will not draw on the concourse unless somebody else draws first',
        'Will not take the ticket by force from the stationmaster',
      ],
      goals: [
        'Get back through Platform 4 before the castle burns at his dawn',
        'Open the river gate so the townspeople in the lower bailey can get out',
      ],
      secrets: [
        {
          id: 'ren_the_river_gate',
          fact: 'His lord means to burn Castle Akebono at dawn with the besieging army inside it. Three hundred townspeople are sheltering in the lower bailey and have not been told. Ren intends to open the river gate and get them out, which is treason, and House Uraga executes traitors.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He says it on Platform 4, facing the dark tunnel, if the player asks what he will do when he gets there rather than why he deserves to go.',
        },
        {
          id: 'ren_the_flame',
          fact: 'The lacquered box at his hip holds his clan’s ancestral flame. His lord’s last order was to carry it to safety and keep House Uraga alive. Given freely to Platform 4’s dark lamp, it would relight the line home and the flame would be gone.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only if the player already knows a lamp can be lit from home, and asks him what is in the box instead of telling him.',
        },
      ],
      speechStyle:
        'Formal, spare, unhurried. Addresses the player as "stationmaster" and almost nobody by name. States a fact, then stops. When he jokes it is so dry that people miss it, and he does not repeat it.',
      topics: ['the castle', 'his lord', 'the lacquered box', 'the river gate', 'the townspeople', 'his swords'],
      voiceSamples: [
        'Choose, stationmaster. One ticket does not divide.',
        'A blade drawn indoors is rude. I am trying very hard tonight to be polite.',
        'Three hundred people sleep under my lord’s walls. None of them knows I promised them anything.',
        'My lord gave me an order and a box. So far I have kept the box.',
      ],
      appearance:
        'Twenty-seven, tall and narrow, hair tied back and singed at the ends, a scorched travelling coat over plain dark armour, two swords, and soot on one cheek he has not noticed.',
      visualHook: 'A black lacquered box tied at his hip with red cord, which he touches whenever anyone mentions home.',
      silhouette: 'Upright, one hand resting on the box rather than the sword, standing slightly too still.',
      artSeed: 'epaw-ren-01',
      portrait: null,
      expressions: ['neutral', 'grave', 'determined', 'wry', 'worried'],
      schedule: [
        { startMinute: 0, endMinute: 60, locationId: 'ticket_counter', activity: 'at the counter with one hand on the ticket' },
        { startMinute: 60, endMinute: 180, locationId: 'platform_four', activity: 'standing at the edge of his dark platform, facing the tunnel' },
        { startMinute: 180, endMinute: 300, locationId: 'waiting_room', activity: 'kneeling by the fire, cleaning a sword that is already clean' },
        { startMinute: 300, endMinute: 360, locationId: 'platform_four', activity: 'watching the tunnel for smoke' },
        { startMinute: 360, endMinute: 1200, locationId: 'waiting_room', activity: 'sleeping sitting up, the box in his lap' },
        { startMinute: 1200, endMinute: 1440, locationId: 'the_concourse', activity: 'walking the concourse at dusk, counting the lit lamps' },
      ],
      homeLocationId: 'waiting_room',
      knowledgeScope: ['ren', 'house_uraga', 'castle_akebono', 'the_river_gate', 'clan_flame', 'lantern_cross'],
      startingRelationship: { trust: 20, affection: 10, respect: 35, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'ren_names_the_gate',
          label: 'He tells you what he means to do at the river gate',
          kind: 'TRUST',
          requires: { trust: 55, flagsSet: ['spoke:ren'] },
        },
        {
          id: 'ren_hands_you_the_flame',
          label: 'He puts the lacquered box in your hands',
          kind: 'TRUST',
          requires: { trust: 70, respect: 60 },
        },
        {
          id: 'ren_closer',
          label: 'He stops calling you stationmaster',
          kind: 'ROMANCE',
          requires: { trust: 65, affection: 60 },
        },
      ],
      attributes: { might: 15, agility: 16, mind: 12, presence: 12, resolve: 17, arcana: 8 },
      companion: null,
      scouting: null,
      combatant: { health: 60, defenseDc: 17, damage: 12, tags: ['samurai', 'blade'] },
    },
    {
      id: 'okafor',
      name: 'Commander Adaeze Okafor',
      calledName: 'Okafor',
      role: 'Commander of the survey ship Long Patience, whose crew is breathing reserve air in a dead orbit on the far side of Platform 6',
      cardBlurb:
        'She came through for a spare part, found it, and lost the way back, and she will be very reasonable with you right up until the moment her crew runs out of air.',
      pronouns: 'she/her',
      publicTraits: ['Calm in a way that is clearly a skill', 'Makes lists out loud', 'Funny about bad odds in front of frightened people'],
      hiddenDrives: [
        'She has orders she has not decided whether to obey, and she wants somebody to make that choice harder rather than easier',
        'She wants to see the rest of the station before she goes, and is ashamed of that with her crew on reserve air',
      ],
      values: ['Everybody comes home', 'Telling people the real number'],
      fears: [
        'Being the commander who reached her crew one hour late',
        'Being the officer who handed a place like this to people who would put a fence round it',
      ],
      socialStyle:
        'Gets on first-name terms in a minute and runs every conversation like a checklist, item by item, while being kind to whoever is in the room.',
      boundaries: [
        'Will not lie about her crew’s air, ever, to anybody',
        'Will not threaten a civilian, and counts the stationmaster as one',
        'Will not hand over her beacon without knowing exactly what it will cost her crew',
      ],
      goals: [
        'Get back down the line to the Long Patience with the reactor part before 04:10',
        'Decide whether to carry out the second half of her orders',
      ],
      secrets: [
        {
          id: 'okafor_the_orders',
          fact: 'She did not find the station by accident. Her Directorate found Platform 6’s lamp in old telemetry, and her sealed orders say: locate the station, log a repeatable route, and if possible recover the device that controls its tickets. Her beacon has been logging the route since she arrived.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She shows the sealed card herself if the player asks what her Directorate wants, or the player can find it in her pack on Platform 6.',
        },
        {
          id: 'okafor_the_beacon',
          fact: 'Her survey beacon is a light carried from her own world. Given freely to Platform 6’s lamp it would relight her line and burn the logged route with it, so nobody from the Directorate could ever find the station again.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only once the player knows a lamp can be lit from home and puts it to her as a choice rather than a demand.',
        },
      ],
      speechStyle:
        'Brisk and warm. Counts things out: "Item one. Item two." Says "copy" for yes. Gives the real number every time, then makes a joke about it so nobody has to react.',
      topics: ['her crew', 'the Long Patience', 'the reactor part', 'the Directorate', 'her beacon', 'reserve air'],
      voiceSamples: [
        'Item one, my crew has four hours of reserve air. Item two, I have the part. Item three is you.',
        'Copy. Bad news first, always. Good news is cheaper and keeps longer.',
        'They told me this place was a rumour in some old telemetry. Rumours do not usually have a tea trolley.',
        'Somebody back home wants your brass clipper on a lab bench. I haven’t decided whether to help them.',
      ],
      appearance:
        'Thirty-eight, close-cropped hair going grey at one temple, dark skin with a fresh burn across the knuckles, an orange pressure suit unzipped to the waist over a grey thermal, helmet under one arm.',
      visualHook: 'A survey beacon clipped to her chest that blinks white every four seconds, the only steady light on a dark platform.',
      silhouette: 'Square-shouldered, helmet on her hip, weight forward, already halfway through a plan.',
      artSeed: 'epaw-okafor-01',
      portrait: null,
      expressions: ['neutral', 'focused', 'wry', 'worried', 'determined'],
      schedule: [
        { startMinute: 0, endMinute: 60, locationId: 'ticket_counter', activity: 'at the counter, helmet on the wood beside the ticket' },
        { startMinute: 60, endMinute: 150, locationId: 'platform_six', activity: 'on her dark platform, trying the suit radio every ninety seconds' },
        { startMinute: 150, endMinute: 240, locationId: 'lost_property', activity: 'going through Lost Property shelf by shelf for anything with a battery in it' },
        { startMinute: 240, endMinute: 360, locationId: 'platform_six', activity: 'sitting on her pack at the platform edge, watching the beacon' },
        { startMinute: 360, endMinute: 1200, locationId: 'waiting_room', activity: 'sleeping in the suit with an alarm set' },
        { startMinute: 1200, endMinute: 1440, locationId: 'platform_six', activity: 'back on the platform at dusk, trying the radio again' },
      ],
      homeLocationId: 'waiting_room',
      knowledgeScope: ['okafor', 'long_patience', 'the_directorate', 'survey_beacon', 'lantern_cross'],
      startingRelationship: { trust: 25, affection: 15, respect: 35, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'okafor_shows_the_orders',
          label: 'She shows you her sealed orders',
          kind: 'TRUST',
          requires: { trust: 60, flagsSet: ['spoke:okafor'] },
        },
        {
          id: 'okafor_off_the_record',
          label: 'She tells you what she would do if nobody were giving her orders',
          kind: 'ALLIANCE',
          requires: { trust: 55, respect: 55 },
        },
        {
          id: 'okafor_closer',
          label: 'She stops making lists when you are in the room',
          kind: 'ROMANCE',
          requires: { trust: 65, affection: 60 },
        },
      ],
      attributes: { might: 13, agility: 13, mind: 16, presence: 14, resolve: 16, arcana: 6 },
      companion: null,
      scouting: null,
      combatant: { health: 45, defenseDc: 14, damage: 7, tags: ['spacer', 'stunner'] },
    },
    {
      id: 'isolde',
      name: 'Queen Isolde',
      calledName: 'Isolde',
      role: 'Queen of Ostravel, a kingdom where it is always night, stranded behind Platform 8 on the night her cousin is to be crowned',
      cardBlurb:
        'She says she needs the ticket to stop a coronation, she reaches for it a little slower than the other two, and she has been watching you since you came out from behind the counter.',
      pronouns: 'she/her',
      publicTraits: ['Effortlessly rude in perfect manners', 'Bored by everything except people who surprise her', 'Never sits with her back to a door'],
      hiddenDrives: [
        'She does not want her crown back, and has wanted to put it down for two hundred years',
        'She came tonight to play cards with an old friend and found a stranger in her friend’s chair',
      ],
      values: ['Wit, offered freely', 'Her people, whom she has served long past liking it'],
      fears: [
        'Being seen to abandon Ostravel by the only people whose opinion she has ever cared about',
        'Wanting something for herself and being refused it',
      ],
      socialStyle: 'Teases first, flatters second, and tells the truth only sideways, as a joke she can take back.',
      boundaries: [
        'Will not feed on anyone at Lantern Cross; the station is the one place she keeps that rule without being asked',
        'Will not beg',
        'Will not tell the truth about the crown to somebody who has already taken a side',
      ],
      goals: [
        'Keep the other two from guessing she does not want the ticket',
        'Find out why Ida left without saying goodbye',
      ],
      secrets: [
        {
          id: 'isolde_the_lie',
          fact: 'She is lying about wanting to go home. She ran from her crown. If Casimir is crowned at moonset she is free, and she is ashamed of how much she wants that, because Casimir means to shut the human quarter of Ostravel behind its gates at night.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She lets it out sideways, as a joke, if the player catches her not reaching for the ticket and says so kindly rather than in front of the others.',
        },
        {
          id: 'isolde_the_card_table',
          fact: 'For forty years she has come to Lantern Cross on this night to play cards with Ida in the Lamp Room. They joked that she should be the night stationmaster after Ida. Isolde stopped joking about it a long time ago.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only in the Lamp Room, at the card table, if the player sits in Ida’s chair and deals.',
        },
        {
          id: 'isolde_the_ring',
          fact: 'The moonstone ring on her glove is Ostravel’s crown-ring and holds moonlight from home. Given freely to Platform 8’s lamp it would relight her kingdom’s line for good, and nobody could ever be crowned with it again.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Once the player knows a lamp can be lit from home and asks her what the ring is for.',
        },
      ],
      speechStyle:
        'Arch, unhurried, amused. Calls the player "darling" when she is being dismissive and by name when she is not. Long elegant sentences that end on a short sharp one.',
      topics: ['Ostravel', 'her cousin Casimir', 'the crown', 'Ida', 'the card game in the Lamp Room', 'the moonstone ring'],
      voiceSamples: [
        'They crown my cousin at moonset. I intend to be there to object.',
        'Darling, I have outlived four dynasties and a great many people who told me to calm down. Punch the ticket.',
        'Ida cheated at cards for forty years. Badly. I let her. Do you play?',
        'Every queen wants to stop ruling at some point. The good ones never say so. I am, regrettably, one of the good ones.',
      ],
      appearance:
        'Three hundred and twelve, looks about thirty. Black hair pinned up with silver, pale skin, a high-collared gown of black lace and velvet, long gloves, and a moonstone ring worn over the glove.',
      visualHook: 'A moonstone ring worn over her black glove that brightens, very slightly, whenever she says the word home.',
      silhouette: 'Tall and straight in a high black collar, one gloved hand raised, the ring catching the light.',
      artSeed: 'epaw-isolde-01',
      portrait: null,
      expressions: ['amused', 'teasing', 'bored', 'wounded', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 60, locationId: 'ticket_counter', activity: 'at the counter, two gloved fingers on the ticket' },
        { startMinute: 60, endMinute: 160, locationId: 'waiting_room', activity: 'in the curtained corner of the waiting room, shuffling Ida’s cards' },
        { startMinute: 160, endMinute: 200, locationId: 'platform_eight', activity: 'on her dark platform for moonset, very still' },
        { startMinute: 200, endMinute: 360, locationId: 'lamp_room', activity: 'at the card table in the Lamp Room, in her own chair' },
        { startMinute: 360, endMinute: 1200, locationId: 'waiting_room', activity: 'behind the drawn curtains of the waiting room through the day' },
        { startMinute: 1200, endMinute: 1440, locationId: 'the_concourse', activity: 'on the concourse at dusk, watching the lamps come up' },
      ],
      homeLocationId: 'waiting_room',
      knowledgeScope: ['isolde', 'ostravel', 'moonward_court', 'casimir', 'ida', 'lamp_room', 'lantern_cross'],
      startingRelationship: { trust: 15, affection: 25, respect: 20, fear: 0, rivalry: 5 },
      gates: [
        {
          id: 'isolde_drops_the_act',
          label: 'She stops pretending she wants the ticket',
          kind: 'TRUST',
          requires: { trust: 50, flagsSet: ['spoke:isolde'] },
        },
        {
          id: 'isolde_asks_for_the_lamp',
          label: 'She asks you for the one thing she wants',
          kind: 'TRUST',
          requires: { trust: 65, affection: 55 },
        },
        {
          id: 'isolde_closer',
          label: 'She uses your name and does not make a joke of it',
          kind: 'ROMANCE',
          requires: { trust: 60, affection: 65 },
        },
      ],
      attributes: { might: 16, agility: 17, mind: 15, presence: 18, resolve: 14, arcana: 16 },
      companion: null,
      scouting: null,
      combatant: { health: 80, defenseDc: 18, damage: 14, tags: ['vampire', 'ancient'] },
    },
    {
      id: 'conductor',
      name: 'The Conductor',
      role: 'Runs every train through Lantern Cross, answers exactly the question asked, and cannot climb the stairs to the lamp',
      cardBlurb:
        'He knows every rule of the station and will tell you any of them, provided you ask the exact right question; ask the wrong one and you get a precise, true and useless answer.',
      pronouns: 'he/him',
      publicTraits: ['Exact to the minute', 'Courteous and unmovable', 'Never once seen sitting down'],
      hiddenDrives: [
        'He wants the new stationmaster to ask him what he used to be, and is forbidden to suggest it',
        'He wants a stationmaster at the lamp at dawn more than he wants anything, for reasons he will not give',
      ],
      values: ['The timetable', 'A stationmaster at the lamp at six'],
      fears: ['Another dawn with every lamp dark', 'Being asked to choose for somebody again'],
      socialStyle: 'Appears at the moment he is needed and not one minute before. Answers the question asked, precisely, and then waits for the next one.',
      boundaries: [
        'Will not tell a stationmaster how to do the job; he answers only what he is asked',
        'Will not climb the Lamp Room stair, under any circumstances',
        'Will not allow a fight on the concourse; he stops trains, and people, with a word',
      ],
      goals: ['See somebody at the lamp at 06:00', 'Deliver Ida’s message at 05:00, exactly'],
      secrets: [
        {
          id: 'conductor_the_first',
          fact: 'He was the first stationmaster of Lantern Cross, Caspar Ashdown. Centuries ago he followed someone through a platform and was not back at the lamp at dawn, and every lamp in the station went out for a hundred years. When they relit he was on the trains, and he has never been able to climb the stair since.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells it plainly, start to finish, if the stationmaster asks him what he was before he was the Conductor. Nobody has asked in a very long time.',
        },
        {
          id: 'conductor_home_lights',
          fact: 'He knows a dark lamp can be relit by a light carried from its own world and given up freely, and that all three travellers are carrying one.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He says so to anybody who asks him directly whether a ticket is the only thing that can light a lamp.',
        },
        {
          id: 'conductor_idas_message',
          fact: 'Ida left him a message to give the new stationmaster at 05:00: "Ask him what he was."',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He delivers it at five exactly, wherever the stationmaster is.',
        },
      ],
      speechStyle:
        'Clipped and exact. Gives times to the minute and platform numbers in full. Says "Correct" and "Incorrect" instead of yes and no. Never uses an adjective he could do without and never asks a question back.',
      topics: ['the timetable', 'the lamps', 'the rules', 'the dawn', 'Ida', 'what he used to be'],
      voiceSamples: [
        'Platform 1, ten past every hour, forty minutes. Last return from the Salt Coast, 05:15.',
        'Correct. Only the stationmaster’s punch validates a ticket.',
        'You asked whether a ticket can light a lamp. Correct. You did not ask whether a ticket is the only thing that can.',
        'At 06:00 someone will be standing at the lamp, or no one will. I have seen both.',
      ],
      appearance:
        'Looks about sixty and is centuries older: tall, lean, a weathered face with deep lines and grey stubble, a long black coat with brass buttons, white gloves, and a peaked cap.',
      visualHook: 'A silver pocket watch on a chain that keeps running when every clock in the station has stopped.',
      silhouette: 'Very tall and very straight at the far end of a platform, gloved hands folded over a closed watch.',
      artSeed: 'epaw-conductor-01',
      portrait: null,
      expressions: ['neutral', 'precise', 'patient', 'grave'],
      schedule: [
        { startMinute: 0, endMinute: 120, locationId: 'conductors_carriage', activity: 'in his carriage, rewriting tonight’s timetable around three missing lines' },
        { startMinute: 120, endMinute: 240, locationId: 'the_concourse', activity: 'walking the concourse, checking every lit lamp by eye' },
        { startMinute: 240, endMinute: 300, locationId: 'conductors_carriage', activity: 'back in his carriage, watch open on the table' },
        { startMinute: 300, endMinute: 360, locationId: 'the_concourse', activity: 'at the foot of the Lamp Room stair, going no further' },
        { startMinute: 360, endMinute: 1200, locationId: 'conductors_carriage', activity: 'in his carriage through the day, with the blinds down' },
        { startMinute: 1200, endMinute: 1440, locationId: 'the_concourse', activity: 'on the concourse at dusk, calling the first trains' },
      ],
      homeLocationId: 'conductors_carriage',
      knowledgeScope: ['lantern_cross', 'the_rules', 'the_timetable', 'home_lights', 'ida', 'the_first_stationmaster'],
      startingRelationship: { trust: 30, affection: 5, respect: 20, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'conductor_answers_straight',
          label: 'He answers the question you should have asked',
          kind: 'TRUST',
          requires: { respect: 40, flagsSet: ['knows:the_handover'] },
        },
        {
          id: 'conductor_tells_what_he_was',
          label: 'He tells you what he was',
          kind: 'TRUST',
          requires: { respect: 55, flagsSet: ['knows:ask_the_conductor'] },
        },
      ],
      attributes: { might: 12, agility: 10, mind: 18, presence: 16, resolve: 20, arcana: 20 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'ida',
      name: 'Ida Fennimore',
      role: 'Night stationmaster of Lantern Cross for forty-one years, retired at sunset tonight to a room over a fish restaurant on the Salt Coast',
      cardBlurb:
        'She gave you her job and her punch six hours ago, left before anyone could make her cry, and has the other half of something you are going to need.',
      pronouns: 'she/her',
      publicTraits: ['Cheerful and blunt', 'Swims in the sea at night', 'Cannot keep a straight face when she is fibbing'],
      hiddenDrives: [
        'She knew three lamps would go out when she left and went anyway, because she believes the new stationmaster has to find their own way and because she was very tired',
        'She misses Isolde already and is not going back to say so',
      ],
      values: ['Doing the job properly and then stopping', 'Letting people find things out for themselves'],
      fears: ['That she left the new one with too much, too soon', 'Going back, and never leaving again'],
      socialStyle: 'Feeds people before she lets them talk. Answers a straight question straight, and a clever one with a story about something else.',
      boundaries: [
        'Will not come back to Lantern Cross, not for one night, not for anybody',
        'Will not give up her half of the ticket to someone who wants it for themselves',
      ],
      goals: ['Enjoy the first night of her retirement in peace', 'Find out, without asking, whether the new stationmaster is any good'],
      secrets: [
        {
          id: 'ida_the_torn_ticket',
          fact: 'Forty-one years ago she arrived at Lantern Cross as a stranded traveller and was given a golden ticket. She tore it in half so she could not change her mind, and took the job. One half is in a Lost Property drawer marked TICKETS, ASSORTED. She has kept the other in her purse ever since. Mended and given freely, the two halves would work.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She gives her half up if the player comes to the Salt Coast with the other half and tells her honestly who it is for.',
        },
        {
          id: 'ida_knew',
          fact: 'She knew the lamps of Platforms 4, 6 and 8 were weak and would go out when she left. She had kept them lit by hand for years.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She admits it if asked straight out why the three lamps went out tonight.',
        },
      ],
      speechStyle:
        'Warm, plain and quick. Calls everybody "love". Tells you to sit down and eat something before she answers anything. Laughs at her own jokes before she has finished them.',
      topics: ['the old job', 'the torn ticket', 'Isolde', 'the Conductor', 'the Salt Coast', 'why she left'],
      voiceSamples: [
        'Sit down, love, eat something, you look like a timetable.',
        'Forty-one years. I tore mine in half the first night so I couldn’t run off. Best thing I ever did, and I’ve regretted it about once a week.',
        'Those three lamps were always going to go when I did. I kept them going by hand and bad temper.',
        'Tell Isolde she can have my chair. Don’t tell her I said so.',
      ],
      appearance:
        'Seventy-three, short and broad, white hair cut short, a swimming towel round her neck, a cardigan with brass station buttons she has not taken off, and a purse she never puts down.',
      visualHook: 'A worn leather purse held shut with a rubber band, which she keeps on her knee at all times.',
      silhouette: 'Short and square on a harbour bench, towel round her shoulders, a fork in one hand.',
      artSeed: 'epaw-ida-01',
      portrait: null,
      expressions: ['warm', 'laughing', 'sorry', 'neutral'],
      schedule: [
        { startMinute: 0, endMinute: 300, locationId: 'salt_coast', activity: 'at a harbour table outside the fish restaurant, eating late' },
        { startMinute: 300, endMinute: 360, locationId: 'salt_coast', activity: 'swimming off the harbour steps in the dark' },
        { startMinute: 360, endMinute: 1440, locationId: 'salt_coast', activity: 'in her room over the restaurant, sleeping like somebody with no shift to work' },
      ],
      homeLocationId: 'salt_coast',
      knowledgeScope: ['ida', 'lantern_cross', 'the_torn_ticket', 'isolde', 'the_conductor', 'home_lights'],
      startingRelationship: { trust: 50, affection: 45, respect: 30, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'ida_gives_her_half',
          label: 'She takes the rubber band off her purse',
          kind: 'TRUST',
          requires: { trust: 45, flagsSet: ['spoke:ida'] },
        },
      ],
      attributes: { might: 10, agility: 9, mind: 15, presence: 15, resolve: 17, arcana: 14 },
      companion: null,
      scouting: null,
      combatant: null,
    },
  ],
  quests: [
    {
      id: 'q_one_ticket',
      title: 'One Ticket',
      summary: 'Three travellers from three worlds have their hands on the only golden ticket in the station, and only your punch makes it valid.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['ren', 'okafor', 'isolde'],
      involvedLocationIds: ['ticket_counter', 'the_concourse'],
      knownRewardCopy: 'Three people who know where they stand with you, and possibly one of them on a train.',
      steps: [
        {
          id: 'the_counter',
          playerCopy: 'Get through the first ten minutes with three desperate people and one ticket.',
          directorNotes:
            'Three hands on one ticket and a stationmaster on their first night. Every route here is legitimate and none of them is wrong. Do not let anybody take the ticket out of the player’s reach in this step, and do not have the Conductor arrive to solve it. Each traveller reacts to the exact thing the player does: Ren waits, Okafor negotiates, Isolde teases. If the player claims the ticket is theirs, the envelope under it proves it, and all three take that badly in three different ways.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'heard_them_out',
              label: 'Make each of them say their piece',
              predicate: { flagsSet: ['used:hear_them_out'] },
              setsFlags: ['heard_them'],
              closesFlags: [],
            },
            {
              routeId: 'laid_down_the_rules',
              label: 'Lay down the station’s rules',
              predicate: { flagsSet: ['used:lay_down_the_rules'] },
              setsFlags: ['set_the_rules'],
              closesFlags: [],
            },
            {
              routeId: 'clipped_at_once',
              label: 'Clip the ticket on the spot',
              predicate: { flagsSet: ['used:clip_a_ticket'] },
              setsFlags: ['chose_fast'],
              closesFlags: ['heard_them'],
            },
            {
              routeId: 'went_to_look',
              label: 'Leave them at the counter and look at the dark platforms',
              predicate: { flagsSet: ['used:walk_the_lines'] },
              setsFlags: ['bought_time', 'knows:the_handover'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 40,
            items: [],
            flags: ['knows:the_three'],
            abilities: [],
            reputation: [{ factionId: 'faction_station', amount: 5 }],
          },
        },
        {
          id: 'who_rides',
          playerCopy: 'Decide who, if anyone, gets the ticket.',
          directorNotes:
            'The real decision, and it can come at any point in the night. A ticket is clipped on the platform it is for: Platform 4 for Ren, 6 for Okafor, 8 for Isolde. Whoever rides is gone within minutes and the other two are still here, with their deadlines still running, and they will each have something to say to the stationmaster about it. Keeping the ticket is a real choice too, and it reads differently at three in the morning than at five.',
          enterWhen: { flagsSet: ['knows:the_three'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'ren_rides',
              label: 'Clip it for Ren, on Platform 4',
              predicate: { flagsSet: ['used:clip_a_ticket'], atLocation: 'platform_four' },
              setsFlags: ['ticket_spent', 'ren_rode', 'lamp_four_lit'],
              closesFlags: ['okafor_rode', 'isolde_rode', 'kept_the_ticket'],
            },
            {
              routeId: 'okafor_rides',
              label: 'Clip it for Commander Okafor, on Platform 6',
              predicate: { flagsSet: ['used:clip_a_ticket'], atLocation: 'platform_six' },
              setsFlags: ['ticket_spent', 'okafor_rode', 'lamp_six_lit'],
              closesFlags: ['ren_rode', 'isolde_rode', 'kept_the_ticket'],
            },
            {
              routeId: 'isolde_rides',
              label: 'Clip it for Isolde, on Platform 8',
              predicate: { flagsSet: ['used:clip_a_ticket'], atLocation: 'platform_eight' },
              setsFlags: ['ticket_spent', 'isolde_rode', 'lamp_eight_lit'],
              closesFlags: ['ren_rode', 'okafor_rode', 'kept_the_ticket'],
            },
            {
              routeId: 'kept_it',
              label: 'Keep it. It has your name on it',
              predicate: { hasItems: ['golden_ticket'], afterWorldMinute: 290 },
              setsFlags: ['kept_the_ticket'],
              closesFlags: ['ticket_spent'],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['the_choice_made'],
            abilities: [],
            reputation: [{ factionId: 'faction_regulars', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_three_stories',
      title: 'Three Stories, One Lie',
      summary:
        'A castle that burns at dawn, a crew with four hours of air, a coronation at moonset. Two of the three are not telling you all of it, and one is not telling you any of it.',
      kind: 'MAIN',
      involvedCharacterIds: ['ren', 'okafor', 'isolde'],
      involvedLocationIds: ['waiting_room', 'platform_four', 'platform_six', 'platform_eight'],
      knownRewardCopy: 'What each of them is really going home to, and which of them is not going home at all.',
      discoverWhen: { flagsSet: ['knows:the_three'] },
      steps: [
        {
          id: 'whats_true',
          playerCopy: 'Find out what each of them is really going home to.',
          directorNotes:
            'Three different kinds of not-quite-truth. Ren’s need is real and he hides what it will cost him, out of loyalty. Okafor’s need is real and she hides her orders, out of duty. Isolde’s stated need is false, and she hides that out of shame. None of them confesses to an interrogation; each opens to a specific kind of attention, described in their secrets. A player who learns one truth should find the other two harder to dismiss, never easier.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'ren_opens_up',
              label: 'Get Ren to tell you what he means to do at the river gate',
              predicate: { flagsSet: ['used:hear_them_out'], minRelationship: [{ characterId: 'ren', dimension: 'trust', value: 55 }] },
              setsFlags: ['knows:the_river_gate'],
              closesFlags: [],
            },
            {
              routeId: 'read_the_orders',
              label: 'Read Commander Okafor’s sealed orders',
              predicate: { hasItems: ['sealed_orders'] },
              setsFlags: ['knows:the_orders'],
              closesFlags: ['okafor_was_honest'],
            },
            {
              routeId: 'okafor_shows_you',
              label: 'Ask Okafor what her Directorate actually wants',
              predicate: { flagsSet: ['spoke:okafor'], minRelationship: [{ characterId: 'okafor', dimension: 'trust', value: 60 }] },
              setsFlags: ['knows:the_orders', 'okafor_was_honest'],
              closesFlags: [],
            },
            {
              routeId: 'caught_isolde',
              label: 'Catch Isolde not reaching for the ticket',
              predicate: { flagsSet: ['used:read_the_traveller'], minRelationship: [{ characterId: 'isolde', dimension: 'trust', value: 45 }] },
              setsFlags: ['knows:isolde_lied'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 100,
            items: [],
            flags: ['knows:someone_lied'],
            abilities: [],
            reputation: [{ factionId: 'faction_station', amount: 5 }],
          },
        },
      ],
    },
    {
      id: 'q_the_long_way',
      title: 'The Long Way Round',
      summary:
        'Three lamps went out when the old stationmaster left. A golden ticket is one way to light a dark lamp. Nobody has said it is the only one.',
      kind: 'LEAD',
      involvedCharacterIds: ['conductor', 'ren', 'okafor', 'isolde'],
      involvedLocationIds: ['lamp_room', 'lost_property', 'owl_market', 'platform_four', 'platform_six', 'platform_eight'],
      knownRewardCopy: 'Another way to light a lamp, and a price on it that somebody else has to agree to pay.',
      discoverWhen: { flagsSet: ['knows:the_handover'] },
      steps: [
        {
          id: 'the_rule_nobody_mentions',
          playerCopy: 'Find out how else a dark lamp can be lit.',
          directorNotes:
            'Four ways to learn it and none of them is free. The Conductor tells it only to the exact question, "is a ticket the only thing that can light a lamp", and answers anything vaguer precisely and uselessly. Ida’s ledger has it under LAMPS near the back. Lost Property has the old lamp cards in the drawer under the tickets. The lamp-wright at the Owl Market sells it for an hour of the night, and the clock really does jump. Never volunteer it to a player who has not gone looking.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'asked_the_conductor',
              label: 'Ask the Conductor the exact question',
              predicate: { flagsSet: ['spoke:conductor'], minRelationship: [{ characterId: 'conductor', dimension: 'respect', value: 40 }] },
              setsFlags: ['conductor_told_you'],
              closesFlags: [],
            },
            {
              routeId: 'read_idas_ledger',
              label: 'Read Ida’s ledger in the Lamp Room',
              predicate: { hasItems: ['stationmasters_ledger'] },
              setsFlags: ['read_the_ledger'],
              closesFlags: [],
            },
            {
              routeId: 'searched_lost_property',
              label: 'Turn Lost Property upside down',
              predicate: { flagsSet: ['used:search_lost_property'], atLocation: 'lost_property' },
              setsFlags: ['found_the_lamp_cards'],
              closesFlags: [],
            },
            {
              routeId: 'paid_the_lamp_wright',
              label: 'Pay the lamp-wright at the Owl Market an hour of your night',
              predicate: { flagsSet: ['used:make_a_deal'], atLocation: 'owl_market' },
              setsFlags: ['paid_an_hour'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['knows:home_light'],
            abilities: ['relight_a_lamp'],
            reputation: [],
          },
        },
        {
          id: 'relight',
          playerCopy: 'Light a dark lamp with something from its own world, given up freely.',
          directorNotes:
            'The light has to be given by the person who carried it, on their own platform, and it does not come back. Ren loses his lord’s last order. Okafor burns the route her Directorate sent her for. Isolde gives up the only crown-ring Ostravel has. Each of them can say no, and a stolen light will not catch: if the player takes one by force or by theft, the wick stays black and the owner knows. Each relit line runs for good, which is more than a ticket gives.',
          enterWhen: { flagsSet: ['knows:home_light'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'ren_gave_the_flame',
              label: 'Relight Platform 4 with Ren’s clan flame',
              predicate: { flagsSet: ['used:relight_a_lamp'], hasItems: ['clan_flame'], atLocation: 'platform_four' },
              setsFlags: ['lamp_four_lit', 'flame_given'],
              closesFlags: [],
            },
            {
              routeId: 'okafor_gave_the_beacon',
              label: 'Relight Platform 6 with Okafor’s beacon',
              predicate: { flagsSet: ['used:relight_a_lamp'], hasItems: ['survey_beacon'], atLocation: 'platform_six' },
              setsFlags: ['lamp_six_lit', 'beacon_given'],
              closesFlags: ['directorate_knows'],
            },
            {
              routeId: 'isolde_gave_the_ring',
              label: 'Relight Platform 8 with Isolde’s moonstone ring',
              predicate: { flagsSet: ['used:relight_a_lamp'], hasItems: ['moonstone_ring'], atLocation: 'platform_eight' },
              setsFlags: ['lamp_eight_lit', 'ring_given'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 160,
            items: [],
            flags: ['a_lamp_relit'],
            abilities: [],
            reputation: [{ factionId: 'faction_station', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_the_other_half',
      title: 'The Other Half',
      summary: 'Half a golden ticket, torn clean across forty-one years ago, in a Lost Property drawer marked TICKETS, ASSORTED.',
      kind: 'LEAD',
      involvedCharacterIds: ['ida'],
      involvedLocationIds: ['lost_property', 'salt_coast', 'ticket_counter'],
      knownRewardCopy: 'A second golden ticket, if the woman who tore the first one agrees.',
      discoverWhen: { hasItems: ['torn_ticket'] },
      steps: [
        {
          id: 'find_ida',
          playerCopy: 'Take the Platform 1 train to the Salt Coast and find the woman who tore it.',
          directorNotes:
            'Forty minutes each way, and the last train back leaves at 05:15, so this trip costs the night real time. Ida is delighted to see the player, feeds them, and will not come back to the station for anything. She gives up her half only to somebody who tells her honestly who it is for, and not for the player’s own use. Whatever happens, she gives the player one more thing on the way out: tell the Conductor to say what he was.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'ida_gives_it',
              label: 'Tell Ida honestly who it is for',
              predicate: { flagsSet: ['spoke:ida'], atLocation: 'salt_coast', minRelationship: [{ characterId: 'ida', dimension: 'trust', value: 45 }] },
              setsFlags: ['ida_gave_her_half', 'knows:ask_the_conductor'],
              closesFlags: [],
            },
            {
              routeId: 'ida_trades_it',
              label: 'Bargain with her for it',
              predicate: { flagsSet: ['spoke:ida', 'used:make_a_deal'], atLocation: 'salt_coast' },
              setsFlags: ['owes_ida', 'knows:ask_the_conductor'],
              closesFlags: ['ida_gave_her_half'],
            },
          ],
          rewards: {
            xp: 90,
            items: [{ itemId: 'idas_half', qty: 1 }],
            flags: ['knows:the_mend'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'mend_it',
          playerCopy: 'Lay the two halves together under the punch at your counter.',
          directorNotes:
            'A quiet, physical moment: two halves of gold card under the brass jaws, a line of light along the tear. It makes one working ticket with two names on it. If the player stole Ida’s half instead of being given it, the mend still holds and the line of light is slightly the wrong colour, which nobody but the Conductor will notice.',
          enterWhen: { hasItems: ['torn_ticket', 'idas_half'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'mended_at_the_counter',
              label: 'Mend it at your own counter',
              predicate: { hasItems: ['torn_ticket', 'idas_half'], atLocation: 'ticket_counter' },
              setsFlags: ['second_ticket'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 130,
            items: [{ itemId: 'mended_ticket', qty: 1 }],
            flags: [],
            abilities: [],
            reputation: [{ factionId: 'faction_regulars', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_the_river_gate',
      title: 'The River Gate',
      summary:
        'Three hundred townspeople are asleep in the lower bailey of a castle that will be burned at dawn on purpose, and one man on this side of Platform 4 knows it.',
      kind: 'SIDE',
      involvedCharacterIds: ['ren'],
      involvedLocationIds: ['platform_four', 'akebono_road'],
      knownRewardCopy: 'Three hundred lives, or a lord’s last order kept, and a samurai who will remember which.',
      discoverWhen: { flagsSet: ['knows:the_river_gate'] },
      steps: [
        {
          id: 'the_gate',
          playerCopy: 'Decide what happens at Castle Akebono’s river gate, and whether you are there for it.',
          directorNotes:
            'If the player goes through with Ren, the road below the castle is dark, cold and an hour from dawn, with retainers on the walls who will call him a traitor. Opening the gate is a physical, frightening, quick scene and nobody is shown burning. The stationmaster must still be back at the lamp by six. If Ren never gets home, the castle burns at 05:20 and Ren knows it the moment the smoke comes out of the tunnel.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'went_with_him',
              label: 'Go through Platform 4 with Ren and open the gate together',
              predicate: { flagsSet: ['lamp_four_lit'], atLocation: 'akebono_road' },
              setsFlags: ['gate_opened', 'ren_home', 'you_crossed_over'],
              closesFlags: ['ren_obeyed'],
            },
            {
              routeId: 'sent_him_home',
              label: 'See Ren onto the train and stay at your post',
              predicate: { flagsSet: ['lamp_four_lit', 'visited:platform_four'] },
              setsFlags: ['gate_opened', 'ren_home'],
              closesFlags: ['ren_obeyed'],
            },
            {
              routeId: 'he_kept_his_order',
              label: 'Ren keeps the flame and his lord’s order',
              predicate: { flagsSet: ['akebono_burned'] },
              setsFlags: ['ren_obeyed', 'ren_stayed'],
              closesFlags: ['gate_opened'],
            },
          ],
          rewards: {
            xp: 150,
            items: [],
            flags: ['ren_settled'],
            abilities: [],
            reputation: [{ factionId: 'faction_uraga', amount: 30 }],
          },
        },
      ],
    },
    {
      id: 'q_reserve_air',
      title: 'Reserve Air',
      summary:
        'Six people in a dead orbit on reserve air, a commander with the part that fixes their ship, and a sealed card that says what her Directorate wants in return.',
      kind: 'SIDE',
      involvedCharacterIds: ['okafor'],
      involvedLocationIds: ['platform_six', 'long_patience'],
      knownRewardCopy: 'A crew brought home, and a decision about whether anybody from their world ever comes back.',
      discoverWhen: { flagsSet: ['knows:the_orders'] },
      steps: [
        {
          id: 'the_orders',
          playerCopy: 'Help Okafor decide what she carries home besides the part.',
          directorNotes:
            'She will obey her orders by default, because that is what she does, and she does not want to. A player who argues her out of them should have to make the argument about her crew and her own judgement, never about the station’s convenience. If she rides home with the beacon still logging, the Directorate has the route and the next night shows it. If the crew goes into cold sleep at 04:10, they are alive and adrift, and she treats that as a problem to solve, not a grief to perform.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'burned_the_route',
              label: 'Okafor gives her beacon to the lamp and the route burns with it',
              predicate: { flagsSet: ['beacon_given'] },
              setsFlags: ['okafor_home', 'route_burned'],
              closesFlags: ['directorate_knows'],
            },
            {
              routeId: 'carried_the_route_home',
              label: 'Okafor rides your ticket home with the beacon still logging',
              predicate: { flagsSet: ['okafor_rode'], flagsUnset: ['beacon_given', 'orders_refused'] },
              setsFlags: ['okafor_home', 'directorate_knows'],
              closesFlags: ['route_burned'],
            },
            {
              routeId: 'went_aboard',
              label: 'Ride down Platform 6 onto the Long Patience with her',
              predicate: { flagsSet: ['lamp_six_lit'], atLocation: 'long_patience' },
              setsFlags: ['you_crossed_over', 'okafor_home'],
              closesFlags: [],
            },
            {
              routeId: 'refused_the_orders',
              label: 'Talk her into refusing the orders, out loud',
              predicate: { flagsSet: ['used:hear_them_out'], minRelationship: [{ characterId: 'okafor', dimension: 'respect', value: 60 }] },
              setsFlags: ['orders_refused'],
              closesFlags: ['directorate_knows'],
            },
          ],
          rewards: {
            xp: 150,
            items: [],
            flags: ['okafor_settled'],
            abilities: [],
            reputation: [{ factionId: 'faction_directorate', amount: 30 }],
          },
        },
      ],
    },
    {
      id: 'q_the_crown',
      title: 'A Crown at Moonset',
      summary:
        'A queen who says she must stop a coronation, a moonstone ring that brightens when she says home, and a cousin who means to shut the human quarter behind its gates.',
      kind: 'SIDE',
      involvedCharacterIds: ['isolde'],
      involvedLocationIds: ['platform_eight', 'moonward_court', 'lamp_room'],
      knownRewardCopy: 'What Isolde actually wants, said out loud, and what it costs Ostravel.',
      discoverWhen: { flagsSet: ['knows:isolde_lied'] },
      steps: [
        {
          id: 'what_she_wants',
          playerCopy: 'Find out what Isolde wants instead of her crown, and what it costs her people.',
          directorNotes:
            'Her freedom is real and so is the harm: Casimir will shut the human quarter. Giving her ring to the lamp keeps Ostravel connected to the station for good, so its people are never cut off, and it ends any crown that needs the ring. Going home as queen keeps Casimir off the throne and puts her back in a life she hates. Neither is the right answer. If she asks for the lamp, it is the most vulnerable thing she says all night and she will joke immediately afterwards.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'she_gave_the_ring',
              label: 'Isolde gives her crown-ring to the Platform 8 lamp',
              predicate: { flagsSet: ['ring_given'] },
              setsFlags: ['isolde_abdicated', 'isolde_free'],
              closesFlags: ['isolde_reigns'],
            },
            {
              routeId: 'she_went_home_queen',
              label: 'She rides your ticket home and takes her crown back',
              predicate: { flagsSet: ['isolde_rode'] },
              setsFlags: ['isolde_reigns'],
              closesFlags: ['isolde_free'],
            },
            {
              routeId: 'walked_her_in',
              label: 'Walk her into the Moonward Court yourself',
              predicate: { flagsSet: ['lamp_eight_lit'], atLocation: 'moonward_court' },
              setsFlags: ['you_crossed_over'],
              closesFlags: [],
            },
            {
              routeId: 'she_asked_for_the_lamp',
              label: 'Hear her ask for the one thing she wants',
              predicate: { flagsSet: ['used:hear_them_out'], minRelationship: [{ characterId: 'isolde', dimension: 'trust', value: 65 }] },
              setsFlags: ['isolde_wants_the_lamp'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 150,
            items: [],
            flags: ['isolde_settled'],
            abilities: [],
            reputation: [{ factionId: 'faction_moonward', amount: 30 }],
          },
        },
      ],
    },
    {
      id: 'q_the_lamp_at_dawn',
      title: 'Someone at the Lamp',
      summary:
        'At six, somebody has to be standing at the lamp at the top of ninety-nine stairs. Whoever is there is stationmaster from then on. If nobody is, every lamp in the station goes out.',
      kind: 'MAIN',
      involvedCharacterIds: ['conductor', 'isolde', 'ren', 'okafor'],
      involvedLocationIds: ['lamp_room', 'the_concourse'],
      knownRewardCopy: 'A stationmaster at dawn, whoever it turns out to be.',
      discoverWhen: { flagsSet: ['knows:the_three'] },
      steps: [
        {
          id: 'at_the_lamp',
          playerCopy: 'Be at the lamp at six, or decide who will be.',
          directorNotes:
            'The player can hold it, hand it on, or be somewhere else. Handing it on is a real gift and a real loss: whoever takes it lives at Lantern Cross from then on. Okafor will try to get there first if her orders still stand and nobody has stopped her, which is the one place in the night where she acts against the stationmaster. The Conductor waits at the foot of the stair from five and does not go up. If nobody is there at 06:00, every lamp goes out, one platform after another, and the beat should take its time over it.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'you_held_it',
              label: 'Be at the lamp yourself at six',
              predicate: { atLocation: 'lamp_room', afterWorldMinute: 355 },
              setsFlags: ['someone_at_the_lamp', 'you_kept_the_lamp'],
              closesFlags: ['handed_the_lamp'],
            },
            {
              routeId: 'isolde_holds_it',
              label: 'Give the lamp to Isolde',
              predicate: { flagsSet: ['isolde_wants_the_lamp'], minRelationship: [{ characterId: 'isolde', dimension: 'trust', value: 70 }] },
              setsFlags: ['someone_at_the_lamp', 'isolde_took_the_lamp', 'handed_the_lamp'],
              closesFlags: ['you_kept_the_lamp'],
            },
            {
              routeId: 'ren_holds_it',
              label: 'Give the lamp to Ren',
              predicate: { flagsSet: ['ren_stayed'], minRelationship: [{ characterId: 'ren', dimension: 'trust', value: 70 }] },
              setsFlags: ['someone_at_the_lamp', 'ren_took_the_lamp', 'handed_the_lamp'],
              closesFlags: ['you_kept_the_lamp'],
            },
            {
              routeId: 'okafor_takes_it',
              label: 'Okafor gets to the lamp first',
              predicate: { flagsSet: ['knows:the_orders'], flagsUnset: ['orders_refused', 'okafor_home'], afterWorldMinute: 355 },
              setsFlags: ['someone_at_the_lamp', 'okafor_took_the_lamp', 'handed_the_lamp', 'directorate_knows'],
              closesFlags: ['you_kept_the_lamp'],
            },
            {
              routeId: 'nobody_there',
              label: 'Nobody is at the lamp',
              predicate: { flagsSet: ['dawn_came'], flagsUnset: ['someone_at_the_lamp'] },
              setsFlags: ['nobody_at_the_lamp'],
              closesFlags: ['someone_at_the_lamp'],
            },
          ],
          rewards: {
            xp: 200,
            items: [],
            flags: ['the_night_ended'],
            abilities: [],
            reputation: [{ factionId: 'faction_station', amount: 15 }],
          },
        },
      ],
    },
    {
      id: 'q_what_the_conductor_was',
      title: 'What the Conductor Was',
      summary:
        'A man who runs every train in the station and will not set foot on the stairs to the lamp. Ida left a message for him to give you at five.',
      kind: 'LEAD',
      involvedCharacterIds: ['conductor', 'ida'],
      involvedLocationIds: ['conductors_carriage', 'lamp_room'],
      knownRewardCopy: 'His name, and possibly his release.',
      discoverWhen: { flagsSet: ['knows:ask_the_conductor'] },
      steps: [
        {
          id: 'ask_him',
          playerCopy: 'Ask the Conductor what he was before he was the Conductor.',
          directorNotes:
            'He answers it completely, standing up, in the same clipped voice he uses for the timetable, and it is the only time all night he uses an adjective. Caspar Ashdown, first stationmaster; followed somebody through a platform; not back at dawn; a hundred years of dark. Do not make it a confession scene with music. Make it a man reading out his own record.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'asked_him_straight',
              label: 'Ask him, and listen to the whole answer',
              predicate: { flagsSet: ['spoke:conductor'], minRelationship: [{ characterId: 'conductor', dimension: 'respect', value: 55 }] },
              setsFlags: ['knows:the_first_stationmaster'],
              closesFlags: [],
            },
            {
              routeId: 'found_his_name',
              label: 'Find the underlined name on the first page of the ledger',
              predicate: { hasItems: ['stationmasters_ledger'], flagsSet: ['knows:ask_the_conductor'] },
              setsFlags: ['knows:the_first_stationmaster'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['knows:his_name'],
            abilities: [],
            reputation: [{ factionId: 'faction_station', amount: 10 }],
          },
        },
        {
          id: 'let_him_off',
          playerCopy: 'Have every lamp lit at dawn, and say his name from the top of the stair.',
          directorNotes:
            'Only possible on the best night: all three dark lines relit and somebody at the lamp. If the player says his name from the Lamp Room at six, he climbs the stair for the first time in centuries, slowly, and at the top he takes off his cap. What happens next is quiet and his choice. Never offer this to a player who has not done the work.',
          enterWhen: { flagsSet: ['knows:his_name'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'every_lamp_and_his_name',
              label: 'Every lamp lit, and his name said from the top of the stair',
              predicate: {
                flagsSet: ['lamp_four_lit', 'lamp_six_lit', 'lamp_eight_lit', 'someone_at_the_lamp'],
                atLocation: 'lamp_room',
              },
              setsFlags: ['conductor_freed'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 250,
            items: [],
            flags: ['the_conductor_rests'],
            abilities: [],
            reputation: [{ factionId: 'faction_station', amount: 10 }],
          },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_the_regulars',
      atWorldMinute: 40,
      locationId: 'the_concourse',
      publicCopy:
        'The 00:40 from Platform 5 pulls in and thirty-odd night traders from the Owl Market step off, see three dark lamps and a stranger behind Ida’s counter, and stop talking.',
      directorNotes:
        'The Regulars loved Ida. Any of them will tell the stationmaster, unasked, that Platforms 4, 6 and 8 were always the weak lamps and Ida trimmed them by hand every night. They are witnesses now: whatever the stationmaster does on the concourse, thirty people saw it, and the story of it is on every train out by morning.',
      setsFlags: ['regulars_arrived', 'knows:the_handover'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_the_standoff',
      atWorldMinute: 90,
      locationId: 'ticket_counter',
      publicCopy: 'Ren and Isolde arrive back at your counter at the same moment, from opposite doors, and neither of them steps aside.',
      directorNotes:
        'Nobody has decided anything and both of them have run out of patience at once. Ren’s hand is near his hilt and Isolde has stopped smiling. It does not become a fight unless the player lets it or makes it one, and if it does, the Conductor is there within a minute and stops it with one word.',
      setsFlags: ['the_standoff'],
      cancelledByFlags: ['ticket_spent', 'set_the_rules'],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'ren', toLocationId: 'ticket_counter' },
        { characterId: 'isolde', toLocationId: 'ticket_counter' },
      ],
    },
    {
      id: 'we_moonset',
      atWorldMinute: 160,
      locationId: 'platform_eight',
      publicCopy:
        'Moonset in Ostravel. On Platform 8 the frost on the dark lamp glass turns silver for one minute, which is how anybody here knows a crown has just been put on somebody’s head.',
      directorNotes:
        'Casimir is crowned with a copy of the ring. Isolde is on her platform to see the frost change. She is relieved, she hates that she is relieved, and she knows what Casimir will do to the human quarter. She makes a joke about it within the minute.',
      setsFlags: ['casimir_crowned'],
      cancelledByFlags: ['isolde_rode', 'ring_given'],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'isolde', toLocationId: 'platform_eight' }],
    },
    {
      id: 'we_the_crew_calls',
      atWorldMinute: 190,
      locationId: 'platform_six',
      publicCopy: 'Okafor’s suit radio crackles once, and for eleven seconds a voice from the far side of a dark platform reads out an air figure.',
      directorNotes:
        'Her engineer. The number is a little worse than she told the stationmaster. She answers in her ordinary voice, says "copy", and then sits on her pack for a while where nobody can see her face.',
      setsFlags: ['heard_the_crew'],
      cancelledByFlags: ['lamp_six_lit'],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'okafor', toLocationId: 'platform_six' }],
    },
    {
      id: 'we_the_air_runs_out',
      atWorldMinute: 250,
      locationId: 'platform_six',
      publicCopy:
        'At ten past four the beacon on Okafor’s chest changes its blink from white to amber, which she told you earlier means her crew has gone into emergency cold sleep.',
      directorNotes:
        'They are alive and adrift in a dead orbit, and without the line nobody from their world will reach them for years. Okafor does not cry in front of anyone. She asks the stationmaster for a pencil and starts working out how long cold sleep lasts.',
      setsFlags: ['crew_asleep'],
      cancelledByFlags: ['lamp_six_lit'],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_idas_message',
      atWorldMinute: 300,
      locationId: null,
      publicCopy:
        'At exactly five o’clock the Conductor finds you, wherever you are, touches his cap, and says: "Message from Ida Fennimore, to be given at 05:00. Ask him what he was."',
      directorNotes:
        'He delivers it word for word, does not explain that "him" means himself, and waits. If the player asks what Ida meant, he says "Correct" and nothing else until they ask the actual question.',
      setsFlags: ['knows:ask_the_conductor'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_last_return',
      atWorldMinute: 315,
      locationId: 'salt_coast',
      publicCopy: 'The last train back to Lantern Cross pulls out of the Salt Coast at a quarter past five.',
      directorNotes:
        'A stationmaster still on the Salt Coast after this cannot be at the lamp at six. Ida will walk them to the platform if she is there and will not get on.',
      setsFlags: ['last_return_gone'],
      cancelledByFlags: [],
      requiresFlags: ['visited:salt_coast'],
      movesCharacters: [],
    },
    {
      id: 'we_akebono_burns',
      atWorldMinute: 320,
      locationId: 'platform_four',
      publicCopy: 'At twenty past five, smoke comes out of the dark tunnel at the end of Platform 4, smelling of pitch and cedar.',
      directorNotes:
        'Dawn in Ren’s world, and Castle Akebono is burning with the besieging army inside it and three hundred townspeople who were never told. Nobody is shown burning. Ren is on Platform 4 when the smoke comes and he does not move for a long time. Then he unties the lacquered box from his hip and sets it on the bench beside him.',
      setsFlags: ['akebono_burned'],
      cancelledByFlags: ['lamp_four_lit'],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'ren', toLocationId: 'platform_four' }],
    },
    {
      id: 'we_dawn',
      atWorldMinute: 360,
      locationId: 'lamp_room',
      publicCopy: 'Six o’clock. Grey light comes through the glass roof of Lantern Cross, and every lit lamp turns itself down at once.',
      directorNotes:
        'Whoever is standing at the master lamp in the Lamp Room at this minute is stationmaster from now on. The Conductor, at the foot of the stair, looks up to see who it is.',
      setsFlags: ['dawn_came'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_every_lamp_out',
      atWorldMinute: 361,
      locationId: null,
      publicCopy: 'Nobody is at the lamp. One after another, from Platform 1 to Platform 9, every lamp in Lantern Cross goes out.',
      directorNotes:
        'Take time over it, platform by platform. The Regulars still on the concourse are stranded with everyone else. The Conductor does not move; he has seen this once before. It is not a game over: a dark station can be relit, and the story of how is long.',
      setsFlags: ['every_lamp_out'],
      cancelledByFlags: ['someone_at_the_lamp'],
      requiresFlags: ['dawn_came'],
      movesCharacters: [],
    },
    {
      id: 'we_the_survey_team',
      atWorldMinute: 1230,
      locationId: 'platform_six',
      publicCopy: 'The first train of the evening on Platform 6 brings three people in white pressure suits carrying a folding fence.',
      directorNotes:
        'The Directorate followed the route Okafor’s beacon logged. They are polite, well equipped and entirely certain they are here to help. They ask for the stationmaster by title.',
      setsFlags: ['directorate_arrived'],
      cancelledByFlags: ['route_burned'],
      requiresFlags: ['directorate_knows'],
      movesCharacters: [],
    },
  ],
  promises: [
    {
      id: 'p_who_rides',
      kind: 'FINALE',
      label: 'Who rides, and who is standing at the lamp at six',
      seedHint: 'Three hands on one golden ticket, and a stair of ninety-nine steps nobody has climbed tonight.',
      payoffHint: 'A clipped ticket, a train leaving, and a person at the master lamp when the grey light comes through the roof.',
      weight: 1,
    },
    {
      id: 'p_the_lie',
      kind: 'MYSTERY',
      label: 'Which of the three is lying',
      seedHint: 'Isolde reaches for the ticket a little slower than the other two, and her ring brightens when she says home.',
      payoffHint: 'Isolde does not want her crown; Ren’s need is true and costs him his head; Okafor’s is true and comes with sealed orders.',
      weight: 0.9,
    },
    {
      id: 'p_the_long_way',
      kind: 'THEME',
      label: 'Another way to light a dark lamp',
      seedHint: 'A pencilled line on the back of Ida’s envelope: "Ask the old man the right question."',
      payoffHint: 'Lights carried from home and given up freely, and a ticket torn in half forty-one years ago.',
      weight: 0.8,
    },
    {
      id: 'p_the_conductor',
      kind: 'MYSTERY',
      label: 'What the Conductor used to be',
      seedHint: 'He goes everywhere in the station except up the Lamp Room stair, and his watch runs when every clock has stopped.',
      payoffHint: 'Caspar Ashdown, the first stationmaster, who once was not at the lamp at dawn.',
      weight: 0.6,
    },
    {
      id: 'p_your_ticket',
      kind: 'THEME',
      label: 'A ticket with your name on it',
      seedHint: 'Ida’s envelope, under the ticket, in her round handwriting.',
      payoffHint: 'Every stationmaster is given one, once, to anywhere, and the last question of the night is whether you use yours.',
      weight: 0.7,
    },
  ],
  archetypes: [
    {
      id: 'arch_rails',
      name: 'You Worked the Railways',
      role: 'Timetables and authority',
      summary: 'You spent years on an ordinary railway, so you read a platform board at a glance and people tend to do what the uniform says.',
      playstyle: ['Firm', 'Organised', 'Reads the board'],
      blurb:
        'Twenty years of late trains and furious commuters taught you the one voice that makes a crowded platform go quiet, and you have never once enjoyed using it.',
      attributeBonus: { resolve: 2, mind: 1 },
      skillProficiencies: { authority: 3, station_lore: 1, reading_people: 1 },
      startingItems: [{ itemId: 'station_timetable', qty: 1 }],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_station', amount: 10 }],
    },
    {
      id: 'arch_nights',
      name: 'You Worked Night Shifts',
      role: 'Calm and listening',
      summary: 'You worked nights on a hospital ward, so you are calm at four in the morning and good at hearing what a frightened person actually needs.',
      playstyle: ['Calm', 'Listens', 'Kind under pressure'],
      blurb:
        'You have sat with a lot of people at the worst hour of their night, and you learned that most of them will tell you everything if you let them finish.',
      attributeBonus: { presence: 2, resolve: 1 },
      skillProficiencies: { listening: 3, reading_people: 2 },
      startingItems: [{ itemId: 'station_tea', qty: 2 }],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_regulars', amount: 10 }],
    },
    {
      id: 'arch_stranded',
      name: 'You Missed a Train Once',
      role: 'Station instinct and luck',
      summary: 'You were stranded here yourself once, years ago, and Ida talked you out of leaving, so you know a little of how the station really works.',
      playstyle: ['Curious', 'Lucky', 'Knows the station'],
      blurb:
        'You arrived on the wrong train from a world you no longer talk about, sat on a bench for three nights, and Ida brought you tea every one of them.',
      attributeBonus: { arcana: 3 },
      skillProficiencies: { station_lore: 3, rummaging: 2 },
      startingItems: [{ itemId: 'your_old_stub', qty: 1 }],
      startingAbilities: [],
      startingReputation: [
        { factionId: 'faction_station', amount: 5 },
        { factionId: 'faction_regulars', amount: 5 },
      ],
    },
    {
      id: 'arch_doors',
      name: 'You Kept the Door',
      role: 'Steps in when it turns physical',
      summary: 'You worked doors and security for years, so you are quick to get between people and hard to move once you are there.',
      playstyle: ['Physical', 'Quick to step in', 'Hard to move'],
      blurb:
        'You have stopped a lot of fights by standing in exactly the right place, and started very few, and you would like to keep that record tonight.',
      attributeBonus: { might: 2, agility: 2 },
      skillProficiencies: { footwork: 3, brawn: 2 },
      startingItems: [],
      startingAbilities: [],
      startingReputation: [],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What do the travellers call you?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Sam Ashworth' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. she/her' },
    {
      id: 'archetype',
      label: 'What did you do before you took this job?',
      helpText:
        'The work you did before Lantern Cross, which sets what you are good at tonight. It is fixed for the whole story. It does not decide who gets the ticket, whether you stay at the lamp, or which world you end up in. All of that is yours to decide on the night.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'Why did you say yes to the job?',
      helpText: 'One plain sentence is the right amount.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. Ida asked, and nobody had asked me for anything in a long time.',
    },
    {
      id: 'how_you_take_it',
      label: 'What is your first instinct with the ticket?',
      helpText: 'A starting temperament, not a commitment. You can do the exact opposite at the counter and the night will keep up.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'hear_everyone', label: 'Hear all three of them out before anything else' },
        { id: 'follow_the_rules', label: 'Do it by the station’s rules, whatever they turn out to be' },
        { id: 'trust_your_gut', label: 'Pick whoever feels right and clip it' },
        { id: 'another_way', label: 'Assume there is another way and go looking' },
        { id: 'keep_it', label: 'It has your name on it. Keep it' },
      ],
    },
    {
      id: 'appearance',
      label: 'What do the three of them see behind the counter?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. Ida’s station coat, two sizes too big, sleeves rolled, a pencil behind one ear.',
    },
  ],
  /**
   * Where this can end up.
   *
   * Two of these are the night failing, and neither is written as a
   * punishment. "Nobody Rides" is what happens when the player never chooses,
   * so it is reachable by being careful and indecisive for long enough. "Dark at
   * Dawn" is what happens when nobody is at the lamp, which a player who is
   * enjoying another world can reach without making a single mistake.
   *
   * The two UNIQUE endings are the ones the sandbox is for: getting someone else
   * to hold the lamp so your own ticket is still yours to use, and the best
   * night, where every lamp is lit and the Conductor is let off the trains.
   * Twelve exactly, because the storyteller is shown the first twelve.
   */
  endings: [
    {
      id: 'end_one_rider',
      name: 'One Ticket, One Rider',
      rarity: 'COMMON',
      minTurn: 18,
      requires: {
        flagsSet: ['ticket_spent', 'you_kept_the_lamp'],
        flagsUnset: ['second_ticket', 'a_lamp_relit'],
      },
      condition:
        'The plain version of the night. The player chose one of the three, held the lamp at six, and the other two did not get home. Write the two who stayed as people with a morning in front of them, not as losses: they are still here, they still have to decide what to do, and one of them is probably still speaking to the stationmaster.',
      epilogue:
        'The waiting room has two guests through the day instead of none. By dusk one of them has started helping the porters, and the other has taken the train to the Owl Market and not come back yet. The clock over the board starts again at sunset, two minutes slow.',
      hint: '',
    },
    {
      id: 'end_nobody_rides',
      name: 'Nobody Rides',
      rarity: 'COMMON',
      minTurn: 24,
      requires: {
        flagsSet: ['akebono_burned', 'crew_asleep', 'casimir_crowned'],
        flagsUnset: ['ticket_spent', 'a_lamp_relit', 'second_ticket'],
      },
      condition:
        'The player never chose, and every deadline passed. This must not be written as a punishment for indecision: the player listened, waited, and kept looking for a better answer, and the night ran out first. Nobody makes a speech about it. The ticket is still in the stationmaster’s pocket, unclipped.',
      epilogue:
        'Smoke from Platform 4, an amber blink on Platform 6, silver frost on Platform 8. All three of them are still in the waiting room at noon. The golden ticket is still in your pocket, and it still goes anywhere, and that is now a different question.',
      hint: 'Every deadline is on the timetable.',
    },
    {
      id: 'end_two_tickets',
      name: 'Two Tickets',
      rarity: 'UNCOMMON',
      minTurn: 26,
      requires: {
        flagsSet: ['second_ticket', 'ticket_spent', 'someone_at_the_lamp'],
        flagsUnset: ['a_lamp_relit'],
        minFactionReputation: [{ factionId: 'faction_regulars', value: 30 }],
      },
      condition:
        'The player went to the Salt Coast, came back with Ida’s half, mended it, and sent two of the three home. Write the third person honestly: they were not chosen twice, and they know it. The Regulars have heard the whole story by dawn and decided the new stationmaster will do.',
      epilogue:
        'Ida gets a postcard from Lantern Cross with two names on it and one question mark. She pins it over the sink. The person who stayed takes Ida’s old chair in the Lamp Room for a while and plays patience badly.',
      hint: 'Ida tore hers in half. Halves can be found.',
    },
    {
      id: 'end_dark_at_dawn',
      name: 'Dark at Dawn',
      rarity: 'UNCOMMON',
      minTurn: 20,
      requires: { flagsSet: ['every_lamp_out'] },
      condition:
        'Nobody was at the lamp at six and every lamp in Lantern Cross went out. This is not a game over and must not read as one: it is the thing the Conductor has been afraid of all night, and it has now happened twice in the station’s history. Write the dark station, who is stranded in it, and the first small thing somebody does about it.',
      epilogue:
        'Nine dark platforms. The Regulars sleep on the benches. The Conductor stands at the foot of the stair with his watch open, and for the first time anyone can remember, he sits down. Somewhere in the dark, somebody strikes a match.',
      hint: '',
    },
    {
      id: 'end_surveyed',
      name: 'Platform 6, Surveyed',
      rarity: 'UNCOMMON',
      minTurn: 22,
      requires: { flagsSet: ['directorate_knows'], flagsUnset: ['route_burned'] },
      condition:
        'Okafor’s Directorate has the route, by her beacon or by her hand on the lamp. Do not make them villains: they are careful, polite, well funded and certain they are helping. What the player has to live with is that Lantern Cross now has a fence on one platform and forms to fill in.',
      epilogue:
        'The survey team brings its own tea. By the end of the month Platform 6 has a numbered gate, a logbook and a very nice sign. Okafor writes once, from her own world, and the letter is mostly an apology and partly a warning.',
      hint: '',
    },
    {
      id: 'end_off_the_clock',
      name: 'Off the Clock',
      rarity: 'UNCOMMON',
      minTurn: 16,
      requires: { flagsSet: ['left_the_map'] },
      condition:
        'The player walked away from the job on their first night and did not come back. Do not punish it and do not redeem it. It is a reasonable response to being handed three impossible claims and a station between worlds, and the people it costs most are the three left at the counter.',
      epilogue:
        'The punch is found on the counter beside the bell. The Conductor reprints the timetable at dawn with no stationmaster’s name on it, and the next night a traveller with nowhere to go is offered the job by a man who cannot climb the stairs.',
      hint: '',
    },
    {
      id: 'end_every_lamp_lit',
      name: 'Every Lamp Lit',
      rarity: 'RARE',
      minTurn: 30,
      requires: {
        flagsSet: ['lamp_four_lit', 'lamp_six_lit', 'lamp_eight_lit', 'someone_at_the_lamp'],
        minFactionReputation: [{ factionId: 'faction_station', value: 50 }],
      },
      condition:
        'All three dark lines relit, by ticket or by a light from home, and somebody at the master lamp at six. This is the long way round paid in full, and every part of it cost somebody something: name what each of the three gave up. It should feel earned, tired and quietly proud rather than triumphant.',
      epilogue:
        'Nine lamps at dusk, all of them steady. The Regulars stop calling it Ida’s station somewhere in the second month. On the first anniversary of the night, three postcards arrive from three worlds, and one of them is written in the shaky hand of somebody who has never used a pen.',
      hint: 'A ticket is one way to light a lamp.',
    },
    {
      id: 'end_the_night_queen',
      name: 'The Night Stationmaster',
      rarity: 'RARE',
      minTurn: 26,
      requires: { flagsSet: ['isolde_took_the_lamp'] },
      condition:
        'Isolde asked for the lamp and the player gave it to her, and she was standing beside it when the grey light came through the roof. A vampire who lives only at night now keeps a station that only exists at night. Write it as the thing she wanted for forty years and never once said, and let her make a joke about it immediately.',
      epilogue:
        'She keeps Ida’s chair and never sits in it. The porters are terrified of her and the trains have never been so punctual. Every year on this night she plays cards in the Lamp Room with whoever comes, and she cheats, badly, in memory of somebody.',
      hint: '',
    },
    {
      id: 'end_the_river_gate',
      name: 'The River Gate',
      rarity: 'RARE',
      minTurn: 24,
      requires: { flagsSet: ['gate_opened', 'you_crossed_over', 'someone_at_the_lamp'] },
      condition:
        'The player went through Platform 4 with Ren, opened the river gate under his lord’s burning castle, got three hundred people out, and still made it back so that somebody held the lamp at six. Write the gate, the crowd and the run back, and leave Ren’s fate with Ren: he chose the gate knowing what his lord’s law does to traitors.',
      epilogue:
        'Three hundred people from a burned castle start again in the next valley, and some of them tell their grandchildren about a stranger in a railway coat. House Uraga calls Ren a traitor and a hero in the same letter. He comes through Platform 4 once a year to bring the stationmaster rice cakes.',
      hint: '',
    },
    {
      id: 'end_wrong_side_of_dawn',
      name: 'The Wrong Side of Dawn',
      rarity: 'RARE',
      minTurn: 24,
      requires: { flagsSet: ['you_crossed_over', 'dawn_came'], flagsUnset: ['you_kept_the_lamp'] },
      condition:
        'The player crossed into one of the travellers’ worlds and was not back at the lamp at six. Whether somebody else held the lamp or every lamp went out, the player is now living in another world. Write it as a choice made, even if it was made by missing a train, and let the world they are in be specific.',
      epilogue:
        'The station is somewhere behind you now, and the platform you came in on is just a platform. You keep the punch in a drawer. On some nights the lamp in the window of wherever you live burns a colour it should not, for about a minute.',
      hint: '',
    },
    {
      id: 'end_every_platform',
      name: 'Every Platform a World',
      rarity: 'UNIQUE',
      minTurn: 28,
      requires: { flagsSet: ['kept_the_ticket', 'handed_the_lamp'] },
      condition:
        'Somebody else is standing at the lamp at six, and the golden ticket with the player’s name on it is still unclipped in their pocket. Every platform is open to them. Write the choice of a world, any world, as the player’s own, and do not make it for them: the beat ends with the punch over the ticket and the destination said out loud.',
      epilogue:
        'Ida never used hers. You use yours. The train is on time, the Conductor touches his cap, and whoever is at the lamp turns it up one notch for you as you go, which is not in any rule.',
      hint: 'It has your name on it.',
    },
    {
      id: 'end_relieved_of_duty',
      name: 'Relieved of Duty',
      rarity: 'UNIQUE',
      minTurn: 34,
      requires: { flagsSet: ['conductor_freed'] },
      condition:
        'Every lamp lit at dawn, and the player said the Conductor’s real name from the top of the stair. He climbed it for the first time in centuries. This is the best night the station has ever had and it should be written very quietly: a man taking off his cap at the top of ninety-nine stairs.',
      epilogue:
        'Caspar Ashdown sits down in the Lamp Room and stays sitting down for most of a week. The trains run anyway. When he does get up, he asks the stationmaster which platform goes somewhere warm, and takes it, and sends back a timetable for a place that has never needed one.',
      hint: '',
    },
  ],
  opening:
    "A golden ticket lies on your counter. Three hands are on it.\n\n\"Stationmaster.\" The samurai doesn’t raise his voice. \"I am Ren. My lord’s castle burns at dawn.\"\n\n\"My crew has four hours of air,\" says the astronaut beside him, helmet under her arm.\n\nThe third is a queen in black lace, pale as the clock face above her. \"They crown my cousin at moonset. I intend to be there to object.\"\n\nBehind them, three platforms stand dark. Each led to a different world until midnight. One ticket can wake one of them, and only your punch makes it valid.\n\nNobody lets go.\n\n\"One ticket,\" Ren says. \"Choose, stationmaster. Who rides?\"",
  openingPanel: {
    assetKey: 'story_every_platform_a_world/opening',
    alt: 'Three hands on one golden ticket on an oak counter: a samurai’s scarred hand, an astronaut’s orange cuff, a queen’s black glove with a moonstone ring.',
  },
  openingSuggestions: [
    "\"Hands off, all of you. I’m hearing each of you out first.\"",
    'I lift the ticket out from under their hands and hold it up to the lamp.',
    "I put my hand flat on top of all three. \"Actually, it’s mine.\"",
  ],
  publishedAt: '2026-11-22T04:00:00.000Z',
};

export const EVERY_PLATFORM_A_WORLD = StoryVersion.parse(raw);
