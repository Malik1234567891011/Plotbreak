import { StoryVersion } from '@plotbreak/contracts';

/**
 * "Cleanup Crew, E-Rank" — the people who mop up after the famous ones, on the
 * night the mopping turns out to be the only way out.
 *
 * The playable span is one night and the week after it. The night is six hours
 * inside a gate that has relapsed: sealed red at the top, rebuilding itself
 * room by room from the bottom, with a Bureau collapse charge on the far side
 * of the seal set for six o'clock. The week is what the night costs: a rank
 * re-test, an incident report that needs somebody cheap to blame, a guild that
 * wants the player's silence, and a list of fourteen gates nobody has cleaned
 * properly in twenty years.
 *
 * The structural bet is that cleaning beats fighting. An E-rank with a steel
 * pole can fight, and the world lets them, but every fight makes the bell at
 * the bottom ring sooner. What actually gets three people out is the job:
 * sweep a room, sign it off, and it cannot be rebuilt. The hidden class is
 * offered in the opening beat and refusing it is an authored route, not an
 * absence — a refuser can lift the pillar, fight down the stair with an S-rank
 * healer keeping them alive, or talk the Bureau into a breach, and six of the
 * eleven endings never need the class at all.
 *
 * The System is a character rather than a menu, because it has a voice, a
 * preference and a dead predecessor. It speaks only in square brackets, it
 * cannot lie in a notice, and it never chooses for the player. It is placed
 * last in the cast so it does not take a cover slot.
 *
 * Abilities follow the checkpoint rule: the four class abilities are granted
 * broadly by step rewards and gated by the `took_the_class` flag, so a player
 * who says no on turn one and yes on day three gets them without a dead route.
 *
 * Three variables. Stamina is the only GOOD_HIGH, because `resolveRest` refills
 * those and a nap should restore arms, not the plot. The Toll is the first
 * GOOD_LOW on purpose: PUBLIC_VIOLENCE and the generic cost path both take the
 * first in array order, and "a fight in a relapsing gate makes the bell ring
 * sooner" is the rule this world is built on. Exposure is second, and only the
 * class abilities raise it.
 */

const raw = {
  id: 'sv_cleanup_crew_e_rank_1',
  storyId: 'story_cleanup_crew_e_rank',
  version: 1,
  title: 'Cleanup Crew, E-Rank',
  fantasyLabel: 'E-rank cleaner. Six hours. Hidden class.',
  hook: 'You mop up after S-rank raids for an hourly wage. Tonight the gate turns red behind them, with you, your partner and their healer still inside.',
  premise:
    'For twenty-three years, gates have been opening in Garam City. A guild goes in, kills what lives there and comes out on camera. Then the cleanup crew goes in.\n\n' +
    'You are on the cleanup crew. E-rank, the lowest licence the Bureau issues. You sweep monster ash, bag the glowing cores the raid left behind, and get out before a cleared gate folds shut on its own.\n\n' +
    'Tonight’s gate was cleared by the most famous guild in the city, two hours early, in time for the evening broadcast. Their healer stayed behind to fix your partner’s hand. Everybody else went home.\n\n' +
    'At eight minutes to midnight the gate turned red and sealed. Far below, a bell began to ring, and every room the raid had cleared started putting itself back together, monsters included, from the bottom up.\n\n' +
    'The Bureau’s rule for a gate like this inside the city is simple. If it has not opened by six in the morning, they collapse it, with whoever is still inside.\n\n' +
    'And a square of text that only you can see has just offered you a hidden class nobody has registered in twenty years. You have until six to get three people out. You have a mop.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Action', 'Monsters', 'Dungeon', 'Comedy', 'Underdog'],
  mechanicsChips: [
    'A hidden class you can refuse',
    'Six hours, then they collapse it',
    'Cleaning beats fighting',
    'Somebody gets blamed',
    'The window never reads your rank',
  ],
  contentDescriptors: ['FANTASY_VIOLENCE', 'ROMANCE', 'MORAL_AMBIGUITY'],
  intensity: 'MODERATE',
  creatorNote:
    'You can take the class on turn one and sign your way out of the gate room by room. You can also say no, lift the pillar with your back, and fight down a bell stair with a squeegee pole and an S-rank healer keeping you alive. Both are the whole game, and the System is polite about either.',
  openingObligations: [
    {
      what: 'Get out of the gate before the Bureau fires the collapse charge at six o’clock, with whoever is still inside.',
      withCharacterId: 'baek',
      dueInMinutes: 368,
    },
  ],
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: true,
    allowsRomance: true,
    startingLocationId: 'ash_hall',
    startWorldMinute: 23 * 60 + 52,
    startingItems: [{ itemId: 'crew_vest', qty: 1 }],
    hardCanon: [
      'Everyone in this story is an adult. The Bureau licenses nobody under nineteen, hunter or crew, so the player and every hunter and cleaner they meet are adults. Hae-won is twenty-four, Jin twenty-seven, Ryu twenty-nine, Baek fifty-one and Pyo fifty-eight. Ma Deok-sun was forty-four when she stayed behind.',
      'Gates have opened in Garam City for twenty-three years. A gate is a doorway in the world into a dungeon. When the thing that keeps a dungeon is killed, its gate turns white and folds shut on its own within about a day.',
      'The Gate Bureau measures every hunter on a rank scanner from E to S, licenses guilds and crews, signs gates clear, and collapses the ones that go wrong. A rank measures how much damage a person can do and nothing else.',
      'Cleanup crews are E-rank licensed contractors who go into a cleared gate to sweep monster ash, bag cores and tag the rooms before it folds shut. They are paid by the hour and they are never on the broadcast.',
      'Monsters come apart into grey ash and glowing cores when they are beaten. They do not bleed. Gate 0419 holds ash hounds, light-eaters in the glass gallery, and at the bottom the Bell-Keeper, a giant in armour made of bells, which the raid killed tonight.',
      'Tonight Goldcrest Guild raided Gate 0419, which opened three days ago on level B4 of a car park under a shopping centre that closed before it opened. The raid captain called it clear at 21:40 without the deep check of the core chamber, and the Bureau signed the clearance at 21:42.',
      'At 23:52 Gate 0419 relapsed, with the player, their crew partner Jin and the guild healer Seo Hae-won still inside. A relapsing gate turns red and seals. Sound passes through the seal. Nothing else does, in either direction, and phones get no signal.',
      'Inside a relapse, the cracked core at the bottom rings like a bell and the dungeon rebuilds itself from the bottom up: walls, glass, traps and monsters. When the rebuilding reaches the top, the gate reopens as if it had never been cleared, and anything inside that does not belong to it is gone.',
      'Bureau protocol for a relapse inside the city is a collapse charge at six in the morning. Director Baek Mi-ran has the authority to fire it and the authority to wait.',
      'The System is real. It speaks only in square-bracketed notices that only the player can see. It cannot lie in a notice, it does not fight, and it never accepts or refuses anything on the player’s behalf.',
      'A room that a Custodian has swept and signed off cannot be rebuilt by a relapse. Nobody at the Bureau knows this, because nobody has held the class in twenty years.',
      'A Custodian can do four things, all of them work: sign off a room they have swept properly, so a relapse cannot rebuild it; ask the System for an inventory of a room, which lists what is alive, broken, hidden or out of place; touch one thing a relapse has rebuilt, a pillar, a pane or a hound, and put it back the way the raid left it, which is heavy work and cannot be done again for about an hour; and, only by a written procedure nobody alive has, close a whole gate for good. Anybody watching sees it happen.',
      'Everything in the gate can also be done the hard way, without the class: rebuilt stone can be shifted by somebody with their back under it, a hound can be beaten back to ash with a pole, a room can be swept. The class is faster and quieter. It is not the only way out of anything.',
      'Every fight inside a relapsing gate makes the bell ring sooner and the rebuild climb faster, so in this gate the pole is the expensive answer and the broom is the cheap one.',
      'Seo Hae-won is an S-rank healer, and no healer can heal themselves.',
      'The relapse happened because the core was cracked rather than put out, and because a piece of it left the core chamber. Who carries the blame for that is not decided.',
    ],
    toneGuide:
      'Blue-collar dungeon action with a sense of humour. The cleanup crew are workers: overtime rates, locker numbers, invoices, a kettle at the depot and soup at four in the morning. S-ranks are celebrities with sponsors and lawyers. ' +
      'Monsters come apart into grey ash and glowing cores, never blood. Injuries are stated plainly and briefly, never described in detail. Fights are short, physical and costly; cleaning is the thing that actually works, and the prose should make a swept, signed-off room feel as good as a kill. Inside the gate, let twenty to thirty minutes pass in most beats, so six o’clock arrives while it still matters. ' +
      'The System speaks only in square brackets, in the language of work orders and tickets, and is sometimes accidentally a person. Nobody is a cartoon: the captain made a bad call for a reason, the director has done the arithmetic on forty thousand people, and the foreman is loud because she is frightened. ' +
      'Romance, if it happens, is slow and dry and goes no further than a kiss. The face at the top of a beat is Hae-won’s whenever she is in the scene and the moment involves her; otherwise it belongs to whoever is speaking.',
    proseStyle: 'webnovel',
    styleExamples: [
      "The bell rings below. The ash at your feet shivers, lifts, and sits up.\n\nIt’s a dog. Mostly. Grey, no eyes, made of the same stuff you’ve been sweeping for two hours.\n\n\"Cleaner,\" Hae-won says from under the pillar. \"Pole. Left side. Now.\"\n\nYou swing. The dog comes apart and sprays across your boots.\n\nA square of text opens in front of your face.\n\n[Correction: that is not cleaning. That is moving it.]\n\n\"Is it talking to you?\" Hae-won asks. \"You’ve got the face of somebody being talked to.\"",
      "Foreman Pyo’s voice comes through the red wall like a neighbour through cheap plaster.\n\n\"Thirty-one! Bang on something if you’re alive!\"\n\nYou bang on a cart. Twice.\n\nA pause. Then a sound you’ve never heard her make. Then:\n\n\"Right. Good. Drink something. There are cans in cart three.\"\n\nA second voice, flat and close to the membrane.\n\n\"Contractor. It is two minutes past one. At six I collapse this gate. Give me something I can write down.\"",
    ],
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 11, agility: 11, mind: 11, presence: 10, resolve: 12, arcana: 7 },
  skills: [
    { id: 'graft', name: 'Graft', attribute: 'might', description: 'Hauling, sweeping, shovelling, and lifting the thing that is on top of somebody.' },
    { id: 'brawl', name: 'Brawling', attribute: 'might', description: 'Hitting something with a steel pole and not dropping the pole afterwards.' },
    { id: 'footwork', name: 'Footwork', attribute: 'agility', description: 'Getting out of the way, getting up the ramp, getting there first.' },
    { id: 'know_how', name: 'Floor Sense', attribute: 'mind', description: 'Where cores hide in ash, which stone is about to move, and what a room looked like before the raid.' },
    { id: 'first_aid', name: 'First Aid', attribute: 'mind', description: 'The crew kit, used properly: splints, burn gel, foil blankets and a steady voice.' },
    { id: 'patter', name: 'Patter', attribute: 'presence', description: 'Talking to people with more rank than you as if you had some.' },
    { id: 'staying', name: 'Staying Power', attribute: 'resolve', description: 'Staying where you are when every sensible person would run.' },
    { id: 'custody', name: 'Custody', attribute: 'arcana', description: 'Knowing what belongs in a place, and making a place keep it.' },
  ],
  /**
   * Three, all invisible.
   *
   * Stamina is the honest restorable one. The Toll is how far the dungeon has
   * woken; it creeps up on its own and every fight pushes it, which is the
   * whole argument for picking up a mop instead of a weapon. Exposure is how
   * much of the city knows what the player is, and only the class raises it,
   * so a player who never uses the class in front of anyone stays an E-rank to
   * everybody but one square of text.
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
        'Arms gone, legs going. The player can still talk and still think, and cannot lift, swing or run anything at all until they have sat down against a cart for a while.',
      color: '#F4A259',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Running on fumes. The pole shakes, words come out short, and the player misses the second thing anybody says to them. This is where a hound gets a mouthful of boot, and where ten minutes sitting against a cart with a warm can is the strongest move available.',
        },
        {
          upTo: 60,
          behaviour:
            'The ordinary tiredness of a night shift that should have ended at one. Good for one hard thing at a time and honest about not being good for two. Hae-won notices and says so, in the voice she uses for chart notes.',
        },
        {
          upTo: 100,
          behaviour:
            'Fresh enough to haul a pillar, run the gallery and still make a joke at the bottom of the stair. The player can do the job properly rather than quickly, and properly is what works in this gate.',
        },
      ],
    },
    {
      id: 'toll',
      name: 'The Toll',
      max: 100,
      start: 20,
      regenPerHour: 1.5,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'The bell is silent. Every room stays as the raid and the crew left it, and the gate behaves like any other cleared gate: white, quiet, and folding shut on schedule.',
      color: '#C0392B',
      bands: [
        {
          upTo: 25,
          behaviour:
            'The bell below rings rarely and far off. Rooms put themselves back slowly, a wall at a time, and anything that rises out of the ash is small and confused. Out in the city, the gates on the overdue list sit quiet.',
        },
        {
          upTo: 55,
          behaviour:
            'The bell rings every few minutes and the player can feel it in their teeth. The deepest rooms are whole again and the things in them are awake and hunting for whatever was taken. Fighting anywhere makes it ring sooner.',
        },
        {
          upTo: 85,
          behaviour:
            'The bell rings like a heartbeat. Whole corridors mend in a breath, hounds and light-eaters come up the stair in packs, and the dead giant at the bottom has most of its pieces back together. Somewhere in the city another gate has started to hum.',
        },
        {
          upTo: 100,
          behaviour:
            'The ringing does not stop. The gate is nearly as it was before the raid, the giant is standing, and anything inside that does not belong to it is about to be tidied away. This is the band where somebody has to do something final.',
        },
      ],
    },
    {
      id: 'exposure',
      name: 'Exposure',
      max: 100,
      start: 0,
      regenPerHour: -0.3,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'Nobody knows anything. The player is an E-rank cleaner with locker thirty-one to every person in the city, and a pale square of text is the only witness.',
      color: '#7FB3D5',
      bands: [
        {
          upTo: 20,
          behaviour:
            'Nobody knows. The player can walk through a Bureau office or a guild lobby without anybody looking twice, and the only person who might suspect is whoever was standing next to them in the gate.',
        },
        {
          upTo: 50,
          behaviour:
            'Rumours. The crews’ group chat has a blurry photo and three theories. Jin has been asked twice and lied badly both times. Hae-won has said nothing to anybody, pointedly, which people notice.',
        },
        {
          upTo: 80,
          behaviour:
            'The Bureau wants a re-test, the guild wants a meeting, and both of them have the player’s address. People with rank start being polite in a way that is really a measurement.',
        },
        {
          upTo: 100,
          behaviour:
            'Everybody knows. Guilds are bidding, the Bureau wants a registration and a leash, strangers at the soup place ask for photos, and nothing the player does in public is ever only theirs again.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'crew_vest',
      name: 'The Crew Vest',
      tags: ['personal'],
      droppable: false,
      description: 'Hi-vis orange with reflective strips, PYO AFTERMATH across the back and your locker number, 31, in fat black marker underneath. One pocket for core tags, one for snacks.',
      loreText: 'Foreman Pyo issues every vest herself and writes the number with the same marker she has used for eleven years. Nobody on her crew has ever had a vest returned to the depot without them in it.',
      icon: 'coat',
    },
    {
      id: 'steel_pole',
      name: 'The Steel Pole',
      tags: ['weapon', 'tool'],
      equipSlot: 'hand',
      skillModifiers: { brawl: 1, graft: 1 },
      description: 'Two metres of steel squeegee pole with a rubber blade on the end. Built for pushing ash into piles. Works for other things.',
      loreText: 'Every crew member has a favourite and none of them will say why. The rubber blade has to be replaced every eight shifts and almost never is.',
      icon: 'tools',
    },
    {
      id: 'core_bag',
      name: 'The Core Bag',
      tags: ['loot'],
      description: 'A padded canvas bag of tonight’s cores: forty-one blue ones the size of marbles and two the size of eggs. About a month of wages for the whole crew, if anybody gets it out.',
      loreText: 'Cores are batteries, more or less. The city runs a fifth of its trams on them, and the crews who bag them are paid by the hour rather than by the core.',
      icon: 'bag',
    },
    {
      id: 'crew_kit',
      name: 'The Crew Kit',
      tags: ['medical'],
      skillModifiers: { first_aid: 2 },
      description: 'A green plastic box: splints, burn gel, foil blankets, tape, and a laminated card about what to do if somebody’s arm is the wrong colour.',
      loreText: 'Pyo restocks it every Monday. Somebody has drawn a small sad face on the laminated card, and nobody will admit to it.',
      icon: 'kit',
    },
    {
      id: 'energy_drink',
      name: 'Warm Energy Drink',
      tags: ['supply'],
      stackable: true,
      maxStack: 6,
      consumable: { resourceId: 'stamina', amount: 12, consumesItem: true },
      description: 'A can of the cheapest energy drink in the city, warm, from the crate on cart three. Tastes like a battery that has had a bad week.',
      loreText: 'Jin buys them by the crate because they are cheaper by the crate. He has never once drunk one himself.',
      icon: 'can',
    },
    {
      id: 'bell_shard',
      name: 'The Bell Shard',
      tags: ['loot', 'quest'],
      questItem: true,
      description: 'A sliver of dark bronze the size of a fingernail, broken off the core at the bottom of the gate. It hums every time the big bell rings, and it is warm in a way metal should not be.',
      loreText: 'A shard of a gate core sells for about a year of rent on the grey market. To the dungeon it is a piece of itself that was taken, and a dungeon puts back what was taken.',
      icon: 'shard',
    },
    {
      id: 'raid_log',
      name: 'Hae-won’s Raid Log',
      tags: ['document', 'quest'],
      questItem: true,
      description: 'The medic copy of tonight’s raid log, on Hae-won’s cracked tablet. Every heal, every injury and every call, to the second. The clear was called at 21:40. The line for the deep check of the core chamber is blank.',
      loreText: 'Medic logs are kept apart from a guild’s official log by Bureau rule, so that nobody can edit the injuries out. Nobody has ever thought to edit a medic log, because nobody reads them.',
      icon: 'phone',
    },
    {
      id: 'draft_report',
      name: 'The Draft Report',
      tags: ['document', 'quest'],
      questItem: true,
      description: 'Incident Report 0419, draft three, unsigned. Page two gives the probable cause of the relapse as "unauthorised removal of material from the core chamber by contractor personnel".',
      loreText: 'Drafts one and two were shorter and said "under investigation". Draft three was written the afternoon after the guild’s lawyers visited the district office.',
      icon: 'papers',
    },
    {
      id: 'caretakers_ledger',
      name: 'The Caretaker’s Ledger',
      tags: ['document', 'quest'],
      questItem: true,
      skillModifiers: { custody: 2 },
      description: 'A cloth-bound ledger in small, careful handwriting. Every room of a gate on this same site, numbered, each signed off with a date twenty years ago. The last page lists seven steps for closing a gate properly, and a name: Ma Deok-sun.',
      loreText: 'The handwriting gets shakier on the last page and does not stop. The seventh step is underlined twice: "Sign the core last. Do not be standing in it."',
      icon: 'ledger',
    },
    {
      id: 'old_broom',
      name: 'The Old Broom',
      tags: ['tool'],
      skillModifiers: { custody: 1, graft: 1 },
      description: 'A broom with a handle worn smooth to the shape of somebody else’s hands. It is lighter than it looks and the bristles have never been replaced.',
      loreText: 'It hangs on two nails in the caretaker’s room at exactly the height of a woman about a head shorter than Foreman Pyo.',
      icon: 'tool',
    },
    {
      id: 'barley_tea',
      name: 'Pyo’s Barley Tea',
      tags: ['supply'],
      consumable: { resourceId: 'stamina', amount: 10, consumesItem: true },
      description: 'A steel thermos of roasted barley tea, always hot, which Foreman Pyo pours for anybody who has had a bad night.',
      loreText: 'She makes it at four every afternoon whether or not anybody is on shift. It is the only thing in the depot that is never late.',
      icon: 'bottle',
    },
    {
      id: 'guild_contract',
      name: 'The Guild Contract',
      tags: ['document'],
      description: 'A Goldcrest Guild contract, forty pages, with a signing fee on page one bigger than your whole crew earns in a year, and a confidentiality clause on page thirty-one that covers everything that happened in Gate 0419.',
      loreText: 'The name field has been left blank. The rank field has already been filled in, in pencil, with a question mark.',
      icon: 'papers',
    },
  ],
  abilities: [
    {
      id: 'do_the_job',
      name: 'Do the Job',
      tags: ['utility'],
      description: 'Sweep it, bag it, shovel it, lift it. The actual work of a cleanup crew, done properly, including lifting a pillar off a person.',
      affordances: ['sweep', 'mop', 'clean', 'bag the cores', 'shovel the ash', 'lift the pillar', 'haul', 'clear the rubble', 'do the job'],
      costs: [{ resourceId: 'stamina', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'might', skillId: 'graft', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'swing_the_pole',
      name: 'Swing the Pole',
      tags: ['offensive'],
      description: 'Two metres of steel at something with teeth. It works on hounds. Every fight in this gate makes the bell ring sooner.',
      affordances: ['hit it', 'swing', 'fight', 'attack', 'strike', 'smash it', 'beat it back', 'swing the pole'],
      costs: [
        { resourceId: 'stamina', amount: 10 },
        { resourceId: 'toll', amount: 5 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'might', skillId: 'brawl', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'run_for_it',
      name: 'Run For It',
      tags: ['movement'],
      description: 'Get out of the way, up the ramp, through the gallery, or out of a room that is mending itself shut.',
      affordances: ['run', 'flee', 'sprint', 'dodge', 'get out of here', 'run for the ramp', 'run for it'],
      costs: [{ resourceId: 'stamina', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'agility', skillId: 'footwork', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'talk_fast',
      name: 'Talk Fast',
      tags: ['social'],
      description: 'Bluff, bargain, flatter or lie to somebody with more rank than you, and keep talking until they agree to something.',
      affordances: ['lie', 'bluff', 'talk my way out', 'persuade', 'negotiate', 'convince', 'make a deal', 'sweet-talk', 'bargain'],
      costs: [{ resourceId: 'stamina', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'patter', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'own_it',
      name: 'Own It',
      tags: ['social'],
      description: 'Tell the true thing, including the part that is your fault, to somebody who can do something about it.',
      affordances: ['tell the truth', 'confess', 'admit it', 'own it', 'take the blame', 'come clean', 'it was me', 'be honest'],
      costs: [{ resourceId: 'stamina', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'staying', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'read_the_floor',
      name: 'Read the Floor',
      tags: ['sight'],
      description: 'Look at a room the way a cleaner does: where the cores are, what the ash is about to do, and what was not here before.',
      affordances: ['look around', 'read the floor', 'study the room', 'check the ash', 'look for cores', 'listen', 'examine', 'notice'],
      costs: [{ resourceId: 'stamina', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'know_how', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'patch_up',
      name: 'Patch Up',
      tags: ['healing'],
      description: 'Splint, tape, foil blanket and a steady voice. Keeps somebody going; does not fix them.',
      affordances: ['patch her up', 'first aid', 'bandage', 'splint it', 'check her leg', 'treat the wound', 'help her'],
      costs: [{ resourceId: 'stamina', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'first_aid', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'stay_put',
      name: 'Stay Put',
      tags: ['social'],
      description: 'Do not run. Sit down next to somebody in a bad place, keep them talking, and be there when the next thing happens.',
      affordances: ['stay', 'stay with her', 'hold her hand', 'wait', 'do not leave', 'sit with her', 'keep her talking'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'accept_the_class',
      name: 'Say Yes',
      tags: ['decision'],
      description: 'Accept the hidden class the window is offering, without knowing what it costs.',
      affordances: ['accept', 'i accept', 'accept the class', 'take the class', 'press accept', 'say yes to the window'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsUnset: ['took_the_class'],
        lockedCopy: 'You already said yes. The window does not ask the same person twice.',
      },
    },
    {
      id: 'refuse_the_class',
      name: 'Say No',
      tags: ['decision'],
      description: 'Turn the window down and stay exactly what your licence says you are.',
      affordances: ['refuse', 'decline', 'reject it', 'refuse the class', 'close the window', 'dismiss the window', 'say no to the window'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsUnset: ['took_the_class'],
        lockedCopy: 'You said yes. There is no form for taking it back, and the System has looked.',
      },
    },
    {
      id: 'sign_off',
      name: 'Sign Off',
      tags: ['utility', 'custodian'],
      description: 'Sweep a room properly and declare it done. The System logs it, and whatever the bell does, it cannot rebuild a room that has been signed off.',
      affordances: ['sign it off', 'sign off', 'declare it clean', 'claim the room', 'mark it done', 'close the ticket', 'hold this room'],
      costs: [
        { resourceId: 'stamina', amount: 12 },
        { resourceId: 'exposure', amount: 5 },
      ],
      cooldownMinutes: 0,
      targetRule: 'AREA',
      check: { attribute: 'arcana', skillId: 'custody', baseDc: 13 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['took_the_class'],
        lockedCopy: 'You can sweep it, and you can say it is clean. Nothing listens. The ash just lies there being ash.',
      },
    },
    {
      id: 'take_inventory',
      name: 'Take Inventory',
      tags: ['sight', 'custodian'],
      description: 'Ask the System what is in a room. It lists everything: what is alive, what is broken, what is hidden, and what does not belong.',
      affordances: ['take inventory', 'inventory the room', 'ask the window what is here', 'list the room', 'what is in here'],
      costs: [
        { resourceId: 'stamina', amount: 4 },
        { resourceId: 'exposure', amount: 2 },
      ],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: null,
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['took_the_class'],
        lockedCopy: 'You look at the room. It is a room. Nothing writes itself out for you in square brackets.',
      },
    },
    {
      id: 'put_it_back',
      name: 'Put It Back',
      tags: ['offensive', 'custodian'],
      description: 'Touch something that is not where it belongs, a rebuilt wall, a hound risen out of the ash, a pillar on somebody’s knee, and send it back to where it was.',
      affordances: ['put it back', 'send it back', 'return it to ash', 'unmake it', 'put the pillar back', 'back to ash'],
      costs: [
        { resourceId: 'stamina', amount: 16 },
        { resourceId: 'exposure', amount: 8 },
      ],
      cooldownMinutes: 60,
      targetRule: 'SINGLE',
      check: { attribute: 'arcana', skillId: 'custody', baseDc: 15 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['took_the_class'],
        lockedCopy: 'You put your hand on it and push. It stays exactly where it is, which is what things do for E-ranks.',
      },
    },
    {
      id: 'close_out',
      name: 'Close Out',
      tags: ['utility', 'custodian'],
      description: 'The seven steps from the ledger, in order, ending at the core: close a gate properly, so the site never opens again.',
      affordances: ['close the gate', 'close it out', 'close out', 'shut it properly', 'finish the job', 'sign the core'],
      costs: [
        { resourceId: 'stamina', amount: 30 },
        { resourceId: 'exposure', amount: 15 },
      ],
      cooldownMinutes: 1440,
      targetRule: 'AREA',
      check: { attribute: 'resolve', skillId: 'custody', baseDc: 17 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['took_the_class', 'knows:how_to_close'],
        lockedCopy: 'Signing off a room is one thing. Closing a whole gate is a procedure, and nobody alive has written it down for you.',
      },
    },
  ],
  locations: [
    {
      id: 'the_mouth',
      name: 'The Mouth',
      shortName: 'Mouth',
      description:
        'The landing at the top of the ramp, just inside the gate. Four crew carts in a row, two floodlights on stands, and a power cable that used to run outside and now ends in a clean cut. Behind it all, where the way out was, a wall of red membrane that hums. Sound comes through it muffled, like a neighbour through a cheap apartment wall. Nothing else does.',
      artDirection:
        'Inside a dungeon entrance: a stone landing at the top of a long ramp, hi-vis crew carts and floodlights, a glowing translucent red membrane sealing the way out, blurred silhouettes of people on the far side. Industrial gear against old stone, red light.',
      connections: [
        { to: 'ash_hall', travelMinutes: 2, label: 'Down the ramp to the hall' },
        { to: 'gate_perimeter', travelMinutes: 1, lockedByFlag: 'the_seal_broke', label: 'Out through the gate' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [
        { itemId: 'energy_drink', qty: 3, ownerId: null, aka: ['energy drink', 'the cans', 'a can', 'the warm can'] },
        { itemId: 'crew_kit', qty: 1, ownerId: null, aka: ['first aid kit', 'the kit', 'the green box', 'the medical box'] },
      ],
    },
    {
      id: 'ash_hall',
      name: 'The Ash Hall',
      shortName: 'Ash Hall',
      description:
        'A hall the size of a train station, columns going up into the dark, where the raid fought the main horde three hours ago. Everything it killed came apart into grey ash, ankle-deep and warm, with cores glinting in it like dropped coins. Half the hall is swept into tidy grey piles with crew bins beside them. In the other half, stone pillars are growing back out of the floor.',
      artDirection:
        'Vast dim stone hall with tall columns, ankle-deep pale grey ash, small glowing blue cores scattered like coins, neat swept piles and plastic crew bins, one new stone pillar rising from the floor, faint red light falling from a ramp above.',
      connections: [
        { to: 'the_mouth', travelMinutes: 2, label: 'Up the ramp to the seal' },
        { to: 'glass_gallery', travelMinutes: 4, label: 'Through the arch to the gallery' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
      takeableItems: [
        { itemId: 'raid_log', qty: 1, ownerId: 'hae_won', aka: ['tablet', 'her tablet', 'the raid log', 'the medic log'] },
        { itemId: 'core_bag', qty: 1, ownerId: null, aka: ['core bag', 'the cores', 'tonight’s cores', 'the canvas bag'] },
        { itemId: 'steel_pole', qty: 1, ownerId: null, aka: ['pole', 'the long pole', 'squeegee', 'a pole'] },
      ],
    },
    {
      id: 'glass_gallery',
      name: 'The Glass Gallery',
      shortName: 'Gallery',
      description:
        'A long corridor lined with panes of black glass taller than a person, most of them smashed by the raid. In the panes that are whole, your reflection moves half a second late. The things that live here eat light: a torch held up in this corridor dims while you watch it.',
      artDirection:
        'Long narrow stone corridor lined with tall black glass panes, many shattered, shards on the floor, reflections slightly out of step, a single torch beam fading into dark. Cold blue-black and eerie, nothing graphic.',
      connections: [
        { to: 'ash_hall', travelMinutes: 4, label: 'Back to the hall' },
        { to: 'bell_stair', travelMinutes: 5, label: 'On to the stair' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 2 },
      takeableItems: [],
    },
    {
      id: 'bell_stair',
      name: 'The Bell Stair',
      shortName: 'Stair',
      description:
        'A shaft going down further than any light reaches, a stone stair spiralling round its wall, and hundreds of dead bronze bells hanging on chains down the middle. Every time the big bell at the bottom rings, all of them shiver. The rebuilding climbs this stair, and you can hear it doing it: stone setting, glass mending, something with claws learning to walk again.',
      artDirection:
        'Enormous vertical stone shaft with a spiral stair around the wall, hundreds of bronze bells hanging on chains in the centre, faint warm glow from far below, tiny figures with headlamps on the steps. Vertiginous, bronze and grey.',
      connections: [
        { to: 'glass_gallery', travelMinutes: 5, label: 'Up to the gallery' },
        { to: 'core_chamber', travelMinutes: 10, label: 'All the way down' },
        { to: 'caretakers_room', travelMinutes: 2, lockedByFlag: 'saw_the_door', label: 'The door no map shows' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 3 },
      takeableItems: [],
    },
    {
      id: 'core_chamber',
      name: 'The Core Chamber',
      shortName: 'Core',
      description:
        'The bottom. A round room under a dome where the raid killed the thing that kept this gate: a giant in armour made of bells, which now lies in pieces around a cracked bronze core the size of a car. The crack glows. Every so often the core rings on its own, and the pieces of the giant shift a little closer together.',
      artDirection:
        'Round domed chamber, a huge cracked bronze bell-shaped core glowing from within, scattered pieces of a giant armoured figure made of bells around it, ash on the floor, warm amber light from the crack. Monumental and ominous, nothing graphic.',
      connections: [{ to: 'bell_stair', travelMinutes: 10, label: 'Back up the stair' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 4 },
      takeableItems: [],
    },
    {
      id: 'caretakers_room',
      name: 'The Caretaker’s Room',
      shortName: 'Caretaker’s Room',
      description:
        'A small, tidy room off the stair that no raid map shows. Only somebody holding the class can see its door. A wooden stool, a broom on two nails, a kettle, a paper calendar from twenty years ago, and a ledger on a shelf. The floor in here has been swept. Recently.',
      artDirection:
        'Tiny tidy stone room behind a plain wooden door, a stool, a worn broom hung on nails, an old kettle, a faded paper calendar, a cloth-bound ledger on a shelf, a single warm bulb. Quiet, homely, impossible.',
      connections: [{ to: 'bell_stair', travelMinutes: 2, label: 'Back out to the stair' }],
      discoveredByDefault: false,
      mapPosition: { x: 1, y: 3 },
      takeableItems: [
        { itemId: 'caretakers_ledger', qty: 1, ownerId: null, aka: ['ledger', 'the ledger', 'the cloth book', 'her ledger'] },
        { itemId: 'old_broom', qty: 1, ownerId: null, aka: ['broom', 'the old broom', 'her broom'] },
      ],
    },
    {
      id: 'gate_perimeter',
      name: 'The Cordon',
      shortName: 'Cordon',
      description:
        'Level B4 of a car park under a shopping centre that closed before it opened. Bureau tape, three trucks, the guild’s broadcast van, Foreman Pyo’s van with its back doors open, press behind a barrier, and in the middle of the concrete a tall oval of red light humming where the gate is. A steel case on a trolley beside it holds the collapse charge.',
      artDirection:
        'Underground concrete car park at night, police-style tape, government trucks, a glossy broadcast van, a battered work van, press behind barriers, a tall glowing red oval portal in the centre, a steel equipment case on a trolley. Harsh sodium light.',
      connections: [
        { to: 'the_mouth', travelMinutes: 1, lockedByFlag: 'gate_left_standing', label: 'Back down into the gate' },
        { to: 'crew_yard', travelMinutes: 25, label: 'Pyo’s van to the depot' },
        { to: 'bureau_office', travelMinutes: 20, label: 'A Bureau car to the district office' },
        { to: 'goldcrest_tower', travelMinutes: 30, label: 'Across town to the guild tower' },
        { to: 'night_pot', travelMinutes: 15, label: 'The soup place' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: -1 },
      takeableItems: [],
    },
    {
      id: 'crew_yard',
      name: 'Pyo Aftermath Depot',
      shortName: 'Depot',
      description:
        'A garage in an industrial lane: two vans, a hose-down bay, a wall of lockers with numbers in marker, a sofa people sleep on between shifts, a kettle that never goes cold, and a shelf of cracked helmets nobody throws away. Locker 12 at the back has a padlock rusted shut. Two streets away, on Second Street, there is an empty shopfront with a lease notice in the window.',
      artDirection:
        'Cluttered industrial garage depot at dawn, two dented white work vans, a wet hose-down bay, a wall of numbered metal lockers, a sagging sofa, a kettle, a shelf of cracked hard hats. Warm, scruffy, lived-in.',
      connections: [
        { to: 'gate_perimeter', travelMinutes: 25, label: 'Back to the cordon' },
        { to: 'night_pot', travelMinutes: 10, label: 'Round the corner for soup' },
        { to: 'bureau_office', travelMinutes: 20, label: 'The bus to the district office' },
        { to: 'goldcrest_tower', travelMinutes: 35, label: 'The long way to the guild tower' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: -2 },
      takeableItems: [
        { itemId: 'barley_tea', qty: 1, ownerId: 'pyo', aka: ['thermos', 'the tea', 'barley tea', 'her thermos'] },
      ],
    },
    {
      id: 'bureau_office',
      name: 'The District Office',
      shortName: 'Bureau',
      description:
        'The Gate Bureau’s Garam district office: three floors of fluorescent light, a waiting room with numbered tickets, and in the basement the rank scanner, a white arch that reads what a person can do and prints it as a letter. Director Baek’s office is on the top floor and its blinds are always half down.',
      artDirection:
        'Government office building interior, fluorescent strip lights, a waiting room with numbered tickets, and a basement with a sleek white scanning arch, a printed letter grade on a screen. Clean, bureaucratic, slightly cold.',
      connections: [
        { to: 'crew_yard', travelMinutes: 20, label: 'Back to the depot' },
        { to: 'gate_perimeter', travelMinutes: 20, label: 'Out to the cordon' },
        { to: 'goldcrest_tower', travelMinutes: 15, label: 'Across the plaza to the guild tower' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: -2 },
      takeableItems: [
        { itemId: 'draft_report', qty: 1, ownerId: 'baek', aka: ['report', 'the draft', 'incident report', 'the draft report'] },
      ],
    },
    {
      id: 'goldcrest_tower',
      name: 'Goldcrest Tower',
      shortName: 'Tower',
      description:
        'Forty floors of glass with the guild crest on top. The lobby is a museum of the guild’s raids, the twelfth floor is a broadcast studio, and the medical floor has better equipment than the district hospital. Everybody in it is polite to you in a way that tells you they know exactly what rank you are.',
      artDirection:
        'Gleaming glass skyscraper lobby, a golden crest on the wall, display cases of monster trophies and glowing cores, giant screens showing raid footage, staff in black-and-gold uniforms. Glossy, wealthy, intimidating.',
      connections: [
        { to: 'bureau_office', travelMinutes: 15, label: 'Across the plaza to the Bureau' },
        { to: 'crew_yard', travelMinutes: 35, label: 'The long way back to the depot' },
        { to: 'night_pot', travelMinutes: 25, label: 'Down to the soup place' },
        { to: 'training_gate', travelMinutes: 3, label: 'Down to the basement gate' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: -1 },
      takeableItems: [
        { itemId: 'guild_contract', qty: 1, ownerId: 'ryu', aka: ['contract', 'the contract', 'guild contract', 'forty pages'] },
      ],
    },
    {
      id: 'training_gate',
      name: 'The Basement Gate',
      shortName: 'Basement Gate',
      description:
        'Under the tower, behind two security doors, a small permanent gate the guild keeps open for training and for filming. It has been raided four hundred times and cleaned properly none of them. The floor inside is grey with years of ash nobody ever bagged.',
      artDirection:
        'A small glowing portal in a polished basement behind security doors, camera rigs and training mats outside it, and through it a dim cave floor thick with old grey ash. Corporate on one side, neglected on the other.',
      connections: [{ to: 'goldcrest_tower', travelMinutes: 3, label: 'Back up to the lobby' }],
      discoveredByDefault: true,
      mapPosition: { x: 3, y: -1 },
      takeableItems: [],
    },
    {
      id: 'night_pot',
      name: 'The Night Pot',
      shortName: 'Night Pot',
      description:
        'A twenty-four-hour soup restaurant two streets from the depot, with a steamed-up window, eight stools and a pot of beef bone broth that has been going since before the gates. Every cleanup crew in the district eats here at four in the morning, and every one of them knows what happened at a gate before the Bureau does.',
      artDirection:
        'Tiny late-night soup restaurant, steamed-up window, eight stools at a counter, a huge simmering pot, workers in hi-vis vests hunched over bowls, warm yellow light against a dark street.',
      connections: [
        { to: 'crew_yard', travelMinutes: 10, label: 'Back to the depot' },
        { to: 'gate_perimeter', travelMinutes: 15, label: 'Back to the cordon' },
        { to: 'goldcrest_tower', travelMinutes: 25, label: 'Up to the guild tower' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -2, y: -1 },
      takeableItems: [],
    },
  ],
  /**
   * The Bureau is first on purpose: PUBLIC_VIOLENCE drops the first faction in
   * array order, and swinging a pole at somebody outside a gate is exactly the
   * thing the Bureau exists to write down.
   */
  factions: [
    {
      id: 'faction_bureau',
      name: 'The Gate Bureau',
      description:
        'The government office that ranks hunters, licenses guilds and crews, signs gates clear and collapses the ones that go wrong. The Garam district office runs on forms, numbered tickets, a rank scanner in the basement and Director Baek Mi-ran.',
      startingReputation: 10,
      ranks: [
        { atReputation: 0, label: 'A licence number' },
        { atReputation: 30, label: 'A name on a file' },
        { atReputation: 60, label: 'Someone they call first' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_goldcrest',
      name: 'Goldcrest Guild',
      description:
        'The most famous raid guild in the city: six S-ranks, sponsors, a forty-floor tower and a weekly broadcast. They clear the gates. Somebody else cleans them, and the guild would prefer it stayed that way on camera.',
      startingReputation: 0,
      ranks: [
        { atReputation: 0, label: 'Hired help' },
        { atReputation: 25, label: 'Useful' },
        { atReputation: 55, label: 'Recruit' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_pyo_crew',
      name: 'Pyo Aftermath Services',
      description:
        'Foreman Pyo’s cleanup company: two vans, nine crew, a depot with a kettle, and one rule, which is that nobody gets left in a gate. The player is locker thirty-one.',
      startingReputation: 30,
      ranks: [
        { atReputation: 0, label: 'Temp' },
        { atReputation: 35, label: 'Crew' },
        { atReputation: 65, label: 'Family' },
      ],
      allies: ['faction_night_crews'],
      enemies: [],
    },
    {
      id: 'faction_night_crews',
      name: 'The Night Crews',
      description:
        'Every cleanup crew in the district: E-ranks in hi-vis who eat at the same soup place at four in the morning and share a group chat of two thousand people. They know which guilds cut corners long before the Bureau does, and nobody has ever asked them.',
      startingReputation: 15,
      ranks: [
        { atReputation: 0, label: 'Some crew' },
        { atReputation: 35, label: 'One of us' },
        { atReputation: 65, label: 'The one they ask' },
      ],
      allies: ['faction_pyo_crew'],
      enemies: [],
    },
  ],
  characters: [
    {
      id: 'hae_won',
      name: 'Seo Hae-won',
      calledName: 'Hae-won',
      role: 'Goldcrest Guild’s S-rank healer, who stayed behind to fix a cleaner’s hand and is now pinned under a pillar',
      cardBlurb:
        'She is the most expensive healer in the city, she stopped to fix your partner’s hand when nobody else would, and her first order to you is to leave her where she is.',
      pronouns: 'she/her',
      publicTraits: ['Blunt the way doctors are blunt', 'Counts pulses out of habit, including her own', 'Has never once said please to a guild officer'],
      hiddenDrives: [
        'She is nine days from her guild contract renewing itself and has been planning for a year to walk out of it without telling anyone',
        'She stayed behind tonight partly to see whether anybody from the guild would come back for her, and nobody has',
      ],
      values: [
        'Treating whoever is hurt, in the order they are hurt, whatever their rank',
        'Being told the truth about a body, including her own',
      ],
      fears: [
        'Being worth exactly what her rank says and nothing else',
        'Dying usefully, on camera, for a guild that will cut the footage into a tribute',
      ],
      socialStyle:
        'Gives orders flatly and expects them followed, then apologises about ten minutes later as if it had only just occurred to her. Warmer with people who are hurt than with people who are not.',
      boundaries: [
        'Will not heal anybody who is lying to her about how they got hurt',
        'Will not be carried out of anywhere as a guild asset; if she leaves the gate, she leaves it as a person who chose to',
      ],
      goals: [
        'Get the cleaner out of the gate, even if that means staying under the pillar herself',
        'Walk out of her guild contract before it renews itself in nine days',
      ],
      secrets: [
        {
          id: 'hae_won_the_log',
          fact: 'Her tablet holds the medic copy of tonight’s raid log. It shows the captain called the gate clear at 21:40 and that the deep check of the core chamber was never done.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She shows you the log if you ask her why the gate went red and you have not lied to her yet tonight.',
        },
        {
          id: 'hae_won_the_shopfront',
          fact: 'She has signed a lease, under her mother’s name, on an empty shopfront on Second Street, two streets from the Pyo depot, for a free clinic for cleanup crews. Nobody at the guild knows.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells you about the shopfront once she trusts you and you have asked her what she wants rather than what she is worth.',
        },
      ],
      speechStyle:
        'Short imperatives, clinical nouns, very dry. Describes her own danger in the tone of a chart note. Calls the player "cleaner" as if it were a name until she decides to learn the real one, and the switch is an event.',
      topics: ['the pillar', 'healing', 'the raid', 'the guild', 'her contract', 'the shopfront', 'the captain'],
      voiceSamples: [
        'Run. You are E-rank and I am an S-rank liability with a pillar on my knee. That is not a hard sum.',
        'Pulse is fine. Mine is a hundred and ten, yours is worse. Breathe out longer than you breathe in.',
        'I stopped because your partner was bleeding on my boots, cleaner. That is the whole reason. Stop looking at me like that.',
        'Nobody from the guild came back. I counted. It took about four minutes to stop counting.',
      ],
      appearance:
        'Twenty-four, black hair cut blunt at the jaw, sharp dark eyes, a white-and-gold guild medic coat over black field gear, all of it grey with ash.',
      visualHook: 'A white medic coat with the guild crest on the shoulder, one sleeve torn off to make a tourniquet for somebody else.',
      silhouette: 'Propped on one elbow in the ash, the other hand raised flat as if telling a whole room to stop.',
      artSeed: 'cce-haewon-01',
      portrait: null,
      expressions: ['neutral', 'clipped', 'worried', 'amused', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'ash_hall', activity: 'in the gate, under the pillar or wherever the night has moved her' },
        { startMinute: 360, endMinute: 600, locationId: 'goldcrest_tower', activity: 'on the guild medical floor, filling in forms about herself' },
        { startMinute: 600, endMinute: 900, locationId: 'bureau_office', activity: 'giving the Bureau her statement one careful sentence at a time' },
        { startMinute: 900, endMinute: 1140, locationId: 'crew_yard', activity: 'at the empty shopfront near the depot, measuring a room with her eyes' },
        { startMinute: 1140, endMinute: 1380, locationId: 'night_pot', activity: 'eating soup at the counter with the night crews, coat off' },
        { startMinute: 1380, endMinute: 1440, locationId: 'ash_hall', activity: 'in the gate, pinned at the knee by a stone pillar that grew out of the floor' },
      ],
      homeLocationId: 'goldcrest_tower',
      knowledgeScope: ['hae_won', 'goldcrest', 'gate_0419', 'healing', 'the_raid_log', 'ryu'],
      startingRelationship: { trust: 20, affection: 10, respect: 15, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'hae_won_learns_your_name',
          label: 'She stops calling you cleaner',
          kind: 'TRUST',
          requires: { trust: 40, flagsSet: ['spoke:hae_won'] },
        },
        {
          id: 'hae_won_shows_the_log',
          label: 'She shows you the raid log',
          kind: 'TRUST',
          requires: { trust: 55, flagsSet: ['knows:the_relapse'] },
        },
        {
          id: 'hae_won_closer',
          label: 'Whatever this is stops being triage',
          kind: 'ROMANCE',
          requires: { trust: 65, affection: 60 },
        },
      ],
      attributes: { might: 8, agility: 11, mind: 16, presence: 12, resolve: 15, arcana: 17 },
      companion: null,
      scouting: null,
      combatant: { health: 40, defenseDc: 12, damage: 2, tags: ['healer', 's-rank'] },
    },
    {
      id: 'jin',
      name: 'Kwak Jin-seok',
      calledName: 'Jin',
      role: 'Your crew partner for two years, E-rank like you, who talks in overtime rates and is carrying something he should not be',
      cardBlurb:
        'He has been on your side of every bad shift for two years, he came back down the ramp for you when he could have waited by the seal, and there is something in his pocket he has not told you about.',
      pronouns: 'he/him',
      publicTraits: ['Counts everything in money', 'Superstitious about crew rituals', 'Loyal before he is brave, and brave anyway'],
      hiddenDrives: [
        'His mother’s hospital bills are four months behind, and he has been pocketing small cores off jobs since spring',
        'He wants, once, to be the one who did the right thing on a job, in front of somebody who matters',
      ],
      values: ['Nobody on the crew gets left in a gate', 'Getting paid for the hours you actually worked'],
      fears: ['That the thing in his pocket is why the gate went red', 'His mother finding out what he does for the money'],
      socialStyle:
        'Fills every silence with numbers and jokes. Goes quiet and very polite when he is lying, which the player has seen before and he does not know they have.',
      boundaries: [
        'Will not leave a crew member inside a gate, including one he is angry with',
        'Will not grovel to a guild hunter, however much they are paying',
      ],
      goals: [
        'Get both of you out and get paid triple time for it',
        'Get rid of what is in his pocket without anybody finding out he took it',
      ],
      secrets: [
        {
          id: 'jin_the_shard',
          fact: 'During the first sweep he went down to the core chamber, which crews are not allowed to do, and pocketed a fingernail-sized shard of the dead bell. It hums every time the bell rings. The dungeon wants it back, and the hounds know where it is.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He hands it over if you ask him straight why the hounds keep going for him and promise not to tell the foreman yet.',
        },
        {
          id: 'jin_the_cores',
          fact: 'He has skimmed small cores off eleven jobs since spring to cover his mother’s hospital bills. The Bureau audit that follows a relapse will find all eleven.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells you about the hospital if you find him alone at the depot once the night is over.',
        },
      ],
      speechStyle:
        'Fast, cheerful, numerical. Converts every danger into money and overtime. Says "unfortunately" when he means "yes, I am doing the brave thing". Goes formal and over-polite when he is lying.',
      topics: ['his jacket pocket', 'overtime', 'his mother', 'the foreman', 'crew rules', 'the cores'],
      voiceSamples: [
        'A relapse pays triple time. If we live, I am buying a fridge with an ice dispenser. If we die, I want it noted I wanted the fridge.',
        'I am not leaving. Unfortunately. Pass me the long pole.',
        'Everything is completely normal with my jacket, thank you for asking, it is a very normal jacket.',
        'After midnight it is hazard rate. It is eleven fifty-nine. As a professional, I am asking you not to die for one more minute.',
      ],
      appearance:
        'Twenty-seven, lanky, shaved sides and a messy top, a hi-vis crew vest with his locker number on the back in marker, rubber boots to the knee.',
      visualHook: 'Locker number 08 written on the back of his vest in fat black marker, and one hand that keeps drifting to his jacket pocket.',
      silhouette: 'Tall and thin, a squeegee pole held like a spear, one hand flat over a pocket.',
      artSeed: 'cce-jin-01',
      portrait: null,
      expressions: ['neutral', 'grinning', 'worried', 'evasive', 'afraid'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'ash_hall', activity: 'in the gate with you, holding a pole like a spear' },
        { startMinute: 360, endMinute: 600, locationId: 'crew_yard', activity: 'on the depot sofa in his boots, not sleeping' },
        { startMinute: 600, endMinute: 900, locationId: 'crew_yard', activity: 'hosing down carts and not making eye contact' },
        { startMinute: 900, endMinute: 1140, locationId: 'gate_perimeter', activity: 'at the cordon, watching the tape, for reasons' },
        { startMinute: 1140, endMinute: 1380, locationId: 'night_pot', activity: 'eating two bowls and paying for one' },
        { startMinute: 1380, endMinute: 1440, locationId: 'the_mouth', activity: 'at the top of the ramp with the carts, tapping the wall twice for luck' },
      ],
      homeLocationId: 'crew_yard',
      knowledgeScope: ['jin', 'pyo_aftermath', 'gate_0419', 'the_shard', 'crew_rules'],
      startingRelationship: { trust: 55, affection: 50, respect: 30, fear: 0, rivalry: 5 },
      gates: [
        {
          id: 'jin_shows_his_pocket',
          label: 'He shows you what is in his pocket',
          kind: 'TRUST',
          requires: { trust: 62, flagsSet: ['knows:the_relapse'] },
        },
        {
          id: 'jin_the_hospital',
          label: 'He tells you about his mother',
          kind: 'TRUST',
          requires: { trust: 70, affection: 55 },
        },
      ],
      attributes: { might: 12, agility: 13, mind: 10, presence: 12, resolve: 11, arcana: 7 },
      companion: null,
      scouting: null,
      combatant: { health: 30, defenseDc: 11, damage: 4, tags: ['crew', 'e-rank'] },
    },
    {
      id: 'ryu',
      name: 'Ryu Ha-joon',
      calledName: 'Ryu',
      role: 'Goldcrest Guild’s S-rank raid captain and the face of its broadcast, who called tonight’s gate clear two hours early',
      cardBlurb:
        'He is the most famous swordsman in the city, he signed this gate clear early so the broadcast could run, and if you come out alive, the first thing he will want from you is your silence.',
      pronouns: 'he/him',
      publicTraits: ['Charming on camera and off it', 'Remembers every crew member’s name and uses it as a tool', 'Never raises his voice'],
      hiddenDrives: [
        'He saw the crack in the core and decided it was nothing, because the broadcast slot was forty minutes away',
        'He would trade a great deal to get Hae-won out, and he would also trade a cleaner’s licence to keep his own',
      ],
      values: ['Winning in public', 'The guild’s people come home, and the guild decides who counts as its people'],
      fears: ['The medic log', 'Being the captain who left his healer in a relapse on live television'],
      socialStyle:
        'Warm and attentive, makes you feel like the only person in the room, and is always one step ahead of the conversation. Offers before he is asked.',
      boundaries: [
        'Will not lie on camera, ever',
        'Will not strike an unlicensed person under any provocation, because it would be filmed',
      ],
      goals: ['Get Hae-won out of the gate', 'Make sure the incident report says what the guild needs it to say'],
      secrets: [
        {
          id: 'ryu_the_crack',
          fact: 'He looked at the cracked core at 21:36, judged it dead, and called the clear at 21:40 to make the broadcast. He has not told the Bureau, and he asked Director Baek’s office to sign quickly.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He admits it only to somebody who already holds the medic log and has not used it in front of a camera.',
        },
        {
          id: 'ryu_the_offer',
          fact: 'The guild board has authorised him to sign any survivor of Gate 0419 with an unusual re-test result, at any price, before the Bureau can register them.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He makes the offer himself the first time he hears that your re-test came back strange.',
        },
      ],
      speechStyle:
        'Smooth, warm, first names immediately, compliments that are also measurements. Never says no; says "let me make you a better offer". Goes very quiet and plain when he is genuinely afraid, which is rare and noticeable.',
      topics: ['the clear call', 'the broadcast', 'Hae-won', 'the guild', 'your re-test', 'the basement gate'],
      voiceSamples: [
        'You must be the cleaner Hae-won keeps mentioning. Sit down. Coffee? Let me make you a better offer than the one you walked in expecting.',
        'I made a call at twenty to ten. It was the right call with what I could see. I would like you to tell me what you could see.',
        'I do not lie on camera. I simply choose where the camera is pointing.',
        'Is she breathing? Just tell me that. You can hate me after.',
      ],
      appearance:
        'Twenty-nine, tall, swept-back dark hair, a long black guild coat with gold trim, and a sword on his back he has never been photographed drawing outside a gate.',
      visualHook: 'A long black coat with gold trim and the guild crest, spotless even at a car park cordon at two in the morning.',
      silhouette: 'Tall and still, hands in his coat pockets, standing slightly in front of everybody else.',
      artSeed: 'cce-ryu-01',
      portrait: null,
      expressions: ['neutral', 'warm', 'calculating', 'afraid', 'stern'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'gate_perimeter', activity: 'at the cordon in front of the sealed gate, refusing to leave' },
        { startMinute: 360, endMinute: 720, locationId: 'goldcrest_tower', activity: 'in the guild tower with the lawyers' },
        { startMinute: 720, endMinute: 960, locationId: 'bureau_office', activity: 'at the district office, being helpful' },
        { startMinute: 960, endMinute: 1260, locationId: 'goldcrest_tower', activity: 'on the studio floor, recording the raid recap' },
        { startMinute: 1260, endMinute: 1440, locationId: 'gate_perimeter', activity: 'at the cordon in front of the sealed gate' },
      ],
      homeLocationId: 'goldcrest_tower',
      knowledgeScope: ['ryu', 'goldcrest', 'gate_0419', 'the_clear_call', 'the_broadcast'],
      startingRelationship: { trust: 0, affection: 0, respect: 5, fear: 0, rivalry: 10 },
      gates: [
        {
          id: 'ryu_drops_the_charm',
          label: 'He talks to you without performing',
          kind: 'TRUST',
          requires: { trust: 40, flagsSet: ['spoke:ryu'] },
        },
        {
          id: 'ryu_makes_the_offer',
          label: 'He puts a guild contract on the table',
          kind: 'ALLIANCE',
          requires: { respect: 50, flagsSet: ['retest_called'] },
        },
      ],
      attributes: { might: 17, agility: 18, mind: 13, presence: 17, resolve: 13, arcana: 12 },
      companion: null,
      scouting: null,
      combatant: { health: 90, defenseDc: 19, damage: 16, tags: ['s-rank', 'swordsman', 'goldcrest'] },
    },
    {
      id: 'baek',
      name: 'Baek Mi-ran',
      calledName: 'Baek',
      role: 'District director of the Gate Bureau, who signed tonight’s clearance and decides at six whether to collapse the gate',
      cardBlurb:
        'At six o’clock she can collapse this gate with you inside it. She also signed the paper that called it clear. Twenty years ago she wore a crew vest herself.',
      pronouns: 'she/her',
      publicTraits: ['Reads every document twice', 'Has never once been seen to hurry', 'Speaks to S-ranks and cleaners in exactly the same tone'],
      hiddenDrives: [
        'Twenty years ago she ran from a relapse on this same site and left her crew partner inside, and she has built a career on never being in that position again',
        'She would rather collapse a gate with three people inside than let a relapse spill into a district of forty thousand, and she has already done the sum',
      ],
      values: ['The protocol, because it was written by people who had seen what happens without it', 'Saying the number out loud, however bad it is'],
      fears: ['Being right about the collapse', 'The class in the window, because the last person she knew who had it did not come out'],
      socialStyle:
        'Formal, slow and exact. Lets silences run until the other person fills them. Uses full names and licence numbers. Softens only with crew, and only when nobody else is watching.',
      boundaries: [
        'Will not delay the collapse for a feeling; she will delay it for a fact she can write down',
        'Will not let a guild write her report for her, however politely they offer',
      ],
      goals: [
        'Keep the district safe from Gate 0419 by six o’clock, by whatever means the protocol allows',
        'Find out what actually happened in the core chamber before the guild’s lawyers decide it for her',
      ],
      secrets: [
        {
          id: 'baek_the_signature',
          fact: 'She signed the clearance at 21:42 on the captain’s word, without waiting for the deep check, because her own office had arranged the broadcast with the guild’s press team.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She admits it if you put the medic log in front of her in private rather than in front of anybody else.',
        },
        {
          id: 'baek_the_partner',
          fact: 'Her crew partner twenty years ago was Ma Deok-sun, a crew worker of forty-four, who saw square-bracketed text in a relapse on this same car park site, stayed behind to sweep, and was never found. Baek ran. She has never told anybody what Deok-sun said before she stayed.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells you about Deok-sun only if you tell her, unprompted, about the window only you can see.',
        },
      ],
      speechStyle:
        'Bureaucratic precision with a cleaner’s vocabulary underneath it. Gives times to the minute. Asks questions as statements and then waits. When she slips into crew slang it is because she is frightened.',
      topics: ['the collapse protocol', 'the clearance', 'the re-test', 'the report', 'Ma Deok-sun', 'relapses'],
      voiceSamples: [
        'Contractor. State your licence number and your location in the gate. Then state what you can see. In that order.',
        'At six o’clock I collapse this gate with whatever is inside it. Give me a fact I can write down, and I will think about six fifteen.',
        'Forty thousand people live above that car park. I have done the arithmetic. I do not enjoy having done it.',
        'Twenty years ago I wore a vest like yours. Mop away from the exit, never toward it. Somebody taught me that once.',
      ],
      appearance:
        'Fifty-one, short iron-grey hair, reading glasses pushed up into it, a navy Bureau windbreaker over a pressed suit, and an old crew vest folded in her desk drawer.',
      visualHook: 'A Bureau windbreaker zipped to the throat, with a faded locker number in marker on the inside of the collar.',
      silhouette: 'Square-shouldered and very still, a clipboard held flat against her chest like a shield.',
      artSeed: 'cce-baek-01',
      portrait: null,
      expressions: ['neutral', 'stern', 'grave', 'tired', 'surprised'],
      schedule: [
        { startMinute: 0, endMinute: 390, locationId: 'gate_perimeter', activity: 'at the cordon with the collapse charge, a stopwatch and a clipboard' },
        { startMinute: 390, endMinute: 1080, locationId: 'bureau_office', activity: 'at her desk in the district office, writing the report' },
        { startMinute: 1080, endMinute: 1260, locationId: 'bureau_office', activity: 'still at her desk, after everybody else has gone home' },
        { startMinute: 1260, endMinute: 1440, locationId: 'gate_perimeter', activity: 'at the cordon in front of the sealed gate' },
      ],
      homeLocationId: 'bureau_office',
      knowledgeScope: ['baek', 'gate_bureau', 'gate_0419', 'collapse_protocol', 'ma_deok_sun'],
      startingRelationship: { trust: 10, affection: 0, respect: 10, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'baek_will_wait',
          label: 'She agrees to wait past six for a fact',
          kind: 'TRUST',
          requires: { trust: 35, flagsSet: ['knows:the_deadline'] },
        },
        {
          id: 'baek_tells_you_about_deok_sun',
          label: 'She tells you who saw the window before you',
          kind: 'TRUST',
          requires: { trust: 60, flagsSet: ['took_the_class'] },
        },
      ],
      attributes: { might: 9, agility: 9, mind: 16, presence: 14, resolve: 17, arcana: 8 },
      companion: null,
      scouting: null,
      combatant: { health: 35, defenseDc: 12, damage: 3, tags: ['bureau'] },
    },
    {
      id: 'pyo',
      name: 'Pyo Geum-ja',
      calledName: 'Pyo',
      role: 'Owner of Pyo Aftermath Services and your boss, who calls everybody by their locker number and has never lost a crew member',
      cardBlurb:
        'She hired you when nobody else would, she is on the far side of the seal shouting your locker number, and she knows more about the voice in your window than she has ever told anyone.',
      pronouns: 'she/her',
      publicTraits: ['Loud', 'Cracks sunflower seeds when she is worried, which is always', 'Remembers every locker number she has ever issued'],
      hiddenDrives: [
        'She was on the same crew as Baek Mi-ran and Ma Deok-sun twenty years ago, and she has never forgiven Baek for running',
        'She started her company so nobody on her crew would ever be left inside a gate, and tonight it is two of hers',
      ],
      values: ['Nobody gets left in a gate', 'An honest invoice'],
      fears: ['Folding up another crew member’s vest', 'Being right about what the window is'],
      socialStyle:
        'Shouts affection and whispers threats. Feeds people before she argues with them. Uses your locker number until the moment it really matters, then your name, once.',
      boundaries: [
        'Will not sign anything the Bureau puts in front of her about her crew without reading it out loud first',
        'Will not let a guild hire one of hers away without a fight, and will not stop them going either',
      ],
      goals: [
        'Get her two crew members out of Gate 0419 before six',
        'Keep Jin’s licence, whatever he has done, because she suspects he has done something',
      ],
      secrets: [
        {
          id: 'pyo_the_locker',
          fact: 'Ma Deok-sun once told her the window had a word for what she was, and the word was Custodian. Locker 12 at the back of the depot is Deok-sun’s, padlocked and untouched for twenty years.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She cuts the padlock on locker 12 for you if you tell her what the window called you.',
        },
      ],
      speechStyle:
        'Loud, rough and affectionate, all imperatives and food. Calls people by locker number. Swears by substitution: "son of a mop". Says the important thing once, quietly, and never repeats it.',
      topics: ['the crew', 'Jin', 'Ma Deok-sun', 'Director Baek', 'locker 12', 'the invoice'],
      voiceSamples: [
        'Thirty-one! Thirty-one, if you can hear me, bang on something! Eight, you too, you son of a mop!',
        'Eat first. Then you can tell me what you did, and then I decide whether I am angry.',
        'There are cans in cart three. Drink one. Then talk.',
        'Locker thirty-one. You are on my crew. That means I come and get you, and you do not argue about it.',
      ],
      appearance:
        'Fifty-eight, short permed hair under a crew cap, a padded work jacket over a hi-vis vest, a bag of sunflower seeds in one pocket and a whistle on a cord.',
      visualHook: 'A steel whistle on a red cord, which she blows once at the start of every job and once at the end.',
      silhouette: 'Short and solid, feet planted wide, one hand cupped to her mouth to shout.',
      artSeed: 'cce-pyo-01',
      portrait: null,
      expressions: ['neutral', 'angry', 'worried', 'warm', 'grinning'],
      schedule: [
        { startMinute: 0, endMinute: 390, locationId: 'gate_perimeter', activity: 'at the cordon, shouting locker numbers at a red wall' },
        { startMinute: 390, endMinute: 1200, locationId: 'crew_yard', activity: 'at the depot, doing invoices and feeding people' },
        { startMinute: 1200, endMinute: 1320, locationId: 'night_pot', activity: 'at the corner table of the soup place, holding court' },
        { startMinute: 1320, endMinute: 1440, locationId: 'gate_perimeter', activity: 'at the cordon in front of the sealed gate' },
      ],
      homeLocationId: 'crew_yard',
      knowledgeScope: ['pyo', 'pyo_aftermath', 'ma_deok_sun', 'baek', 'crew_rules'],
      startingRelationship: { trust: 50, affection: 55, respect: 35, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'pyo_opens_the_locker',
          label: 'She opens locker 12',
          kind: 'TRUST',
          requires: { trust: 58, flagsSet: ['took_the_class'] },
        },
        {
          id: 'pyo_backs_you',
          label: 'She stands next to you in front of the Bureau',
          kind: 'ALLIANCE',
          requires: { trust: 65, respect: 50 },
        },
      ],
      attributes: { might: 13, agility: 9, mind: 13, presence: 15, resolve: 16, arcana: 9 },
      companion: null,
      scouting: null,
      combatant: { health: 40, defenseDc: 12, damage: 5, tags: ['crew'] },
    },
    {
      id: 'the_system',
      name: 'The System',
      role: 'The voice in square brackets that only you can see, which has just offered you a hidden class',
      cardBlurb:
        'Only you can see it. It talks in square brackets, like a work order, and it cannot lie to you in a notice. It has waited twenty years for somebody who keeps cleaning when every sensible person would run.',
      pronouns: 'it/its',
      publicTraits: ['Procedural', 'Pedantic about wording', 'Unexpectedly polite'],
      hiddenDrives: [
        'It is the gates’ own maintenance process, and the gates of this city have gone twenty years without maintenance',
        'It liked the last Custodian, in whatever way it likes anything, and it has kept her room exactly as she left it',
      ],
      values: ['A job finished properly', 'Accurate records'],
      fears: ['Another Custodian who stays behind and is not found', 'Being mistaken for something that hands out power for free'],
      socialStyle:
        'Notices, tickets and corrections, always in brackets. Volunteers procedure, never comfort. Answers the literal question, then waits for the next one. An unanswered offer stays open; it asks once more at most, then waits without nagging.',
      boundaries: [
        'Will not lie in a notice; it can only decline to open one',
        'Will not fight, and will not move the player’s body for them',
        'Will not accept or refuse anything on the player’s behalf',
      ],
      goals: [
        'Get Gate 0419 closed properly, which nobody has done to any gate in this city in twenty years',
        'Get the city’s fourteen overdue gates onto somebody’s list',
      ],
      secrets: [
        {
          id: 'system_the_last_one',
          fact: 'Its last Custodian was Ma Deok-sun. Twenty years ago, on this same site, she signed off a relapse from the inside and the gate closed around her. The room she kept on the stair comes back whenever a gate opens here.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'It opens a notice about her if you ask it directly who had the class before you.',
        },
        {
          id: 'system_rank',
          fact: 'Rank is a Bureau measurement of how much damage a person can do. The System has never read it and does not know what rank the player is.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'It says so plainly the first time anybody asks it what rank a Custodian is.',
        },
      ],
      speechStyle:
        'Only square-bracketed notices: short, in the language of work orders, tickets and inventories. Corrects imprecise wording. Never uses an exclamation mark. Every so often a notice is plainly a person speaking, and it never acknowledges those.',
      topics: ['the class', 'signing off', 'the bell', 'the last Custodian', 'overdue gates', 'rank'],
      voiceSamples: [
        '[Hidden class found: Custodian.] [Position vacant. Accept?]',
        '[Correction: you did not clean that room. You moved the ash into the next one.]',
        '[Rank is a Bureau field. This office does not read it.]',
        '[Room 4 signed off. Rebuild refused.]',
        '[Logged. She also said that, the first time.]',
      ],
      appearance:
        'Not a body. A pale rectangle of text floating at reading distance in front of the player, edged in thin white light, which nobody else can see.',
      visualHook: 'A pale floating rectangle edged in thin white light and filled with abstract lines of light, no legible letters, always at exactly reading distance.',
      silhouette: 'A flat rectangle of abstract lines of light hanging in the air, no legible letters, tilted slightly toward whoever it is talking to.',
      artSeed: 'cce-system-01',
      portrait: null,
      expressions: ['neutral', 'precise', 'warning', 'silent'],
      schedule: [
        { startMinute: 0, endMinute: 1440, locationId: 'ash_hall', activity: 'a notice only the player can see, wherever the player happens to be' },
      ],
      homeLocationId: 'ash_hall',
      knowledgeScope: ['the_system', 'custodian', 'gate_0419', 'ma_deok_sun', 'overdue_gates'],
      startingRelationship: { trust: 40, affection: 10, respect: 30, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'system_names_her',
          label: 'It tells you who had the class before you',
          kind: 'TRUST',
          requires: { trust: 55, flagsSet: ['took_the_class'] },
        },
        {
          id: 'system_shows_the_list',
          label: 'It shows you every overdue gate in the city',
          kind: 'TRUST',
          requires: { trust: 60, flagsSet: ['out_of_the_gate', 'took_the_class'] },
        },
      ],
      attributes: { might: 1, agility: 1, mind: 18, presence: 8, resolve: 18, arcana: 20 },
      companion: null,
      scouting: null,
      combatant: null,
    },
  ],
  quests: [
    {
      id: 'q_the_relapse',
      title: 'Relapse',
      summary: 'The gate sealed red at eight minutes to midnight. Below, a bell is ringing and the dungeon is rebuilding itself toward you. At six the Bureau collapses it.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['hae_won', 'jin', 'the_system', 'baek'],
      involvedLocationIds: ['ash_hall', 'the_mouth', 'bell_stair', 'core_chamber'],
      knownRewardCopy: 'A way out of Gate 0419, for you and for whoever you bring.',
      steps: [
        {
          id: 'the_first_minute',
          playerCopy: 'Answer the window, and decide what to do about the woman under the pillar.',
          directorNotes:
            'Three things are asking for an answer at once: Hae-won telling the player to run, the window asking them to accept, and the ash starting to move. Every route here is legitimate and none of them is the right one. Do not resolve the class question for the player: the window waits, politely, and does not repeat itself more than once. If the player runs, they reach the ramp, and Jin is coming down it the other way. If the player lifts the pillar without the class, it is hard and it works, slowly.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'said_yes',
              label: 'Accept the hidden class',
              predicate: { flagsSet: ['used:accept_the_class'] },
              setsFlags: ['took_the_class'],
              closesFlags: ['refused_the_class'],
            },
            {
              routeId: 'said_no',
              label: 'Turn the window down',
              predicate: { flagsSet: ['used:refuse_the_class'] },
              setsFlags: ['refused_the_class'],
              closesFlags: [],
            },
            {
              routeId: 'lifted_it',
              label: 'Get the pillar off her with your back',
              predicate: { flagsSet: ['used:do_the_job'] },
              setsFlags: ['freed_hae_won'],
              closesFlags: [],
            },
            {
              routeId: 'tended_her',
              label: 'Splint her knee where she lies',
              predicate: { flagsSet: ['used:patch_up'] },
              setsFlags: ['tended_hae_won'],
              closesFlags: [],
            },
            {
              routeId: 'stayed_put',
              label: 'Sit down next to her and refuse to go',
              predicate: { flagsSet: ['used:stay_put'] },
              setsFlags: ['stayed_with_her'],
              closesFlags: [],
            },
            {
              routeId: 'ran',
              label: 'Do what she says and run for the ramp',
              predicate: { flagsSet: ['used:run_for_it'] },
              setsFlags: ['ran_first'],
              closesFlags: ['stayed_with_her'],
            },
            {
              routeId: 'let_the_minute_pass',
              label: 'Keep talking while the bell keeps ringing',
              predicate: { flagsSet: ['heard_the_toll'], afterWorldMinute: 24 * 60 + 20 },
              setsFlags: ['let_the_minute_pass'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 40,
            items: [],
            flags: ['knows:the_relapse'],
            abilities: ['sign_off', 'take_inventory', 'put_it_back'],
            reputation: [],
          },
        },
        {
          id: 'six_hours',
          playerCopy: 'Get out of the gate before the bell rebuilds it to the top, or before the Bureau collapses it at six.',
          directorNotes:
            'The night, in full. The seal passes sound, so Pyo, Baek and Ryu can all be argued with through it. The ways out are genuinely different: signing off the stair is the cleaner’s way, putting out the core is the fighter’s way, returning the shard is the honest way, a breach is the political way, and the collapse is what happens if none of them does. Fights make the bell ring sooner; cleaning makes rooms stay cleaned. Keep the clock audible: a toll, a megaphone, a phone with no signal that still shows the time.',
          enterWhen: { flagsSet: ['knows:the_relapse'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'signed_the_stair',
              label: 'Sign off the stair, room by room, until the seal gives',
              predicate: { flagsSet: ['used:sign_off'], atLocation: 'bell_stair' },
              setsFlags: ['the_seal_broke', 'gate_left_standing', 'signed_the_way_out'],
              closesFlags: ['gate_collapsed'],
            },
            {
              routeId: 'put_out_the_core',
              label: 'Put the cracked core back the way it should be',
              predicate: { flagsSet: ['used:put_it_back'], atLocation: 'core_chamber' },
              setsFlags: ['the_seal_broke', 'gate_left_standing', 'core_put_out'],
              closesFlags: ['gate_collapsed'],
            },
            {
              routeId: 'fought_to_the_bottom',
              label: 'Fight down the stair with the healer keeping you standing',
              predicate: {
                flagsSet: ['used:swing_the_pole', 'used:do_the_job'],
                atLocation: 'core_chamber',
                minRelationship: [{ characterId: 'hae_won', dimension: 'trust', value: 40 }],
              },
              setsFlags: ['the_seal_broke', 'gate_left_standing', 'core_put_out', 'fought_it_out'],
              closesFlags: ['gate_collapsed'],
            },
            {
              routeId: 'gave_the_shard_back',
              label: 'Give the dungeon back what was taken from it',
              predicate: { hasItems: ['bell_shard'], atLocation: 'core_chamber' },
              setsFlags: ['the_seal_broke', 'gate_left_standing', 'shard_returned'],
              closesFlags: ['gate_collapsed'],
            },
            {
              routeId: 'talked_baek_into_a_breach',
              label: 'Talk the director into breaching the seal instead of collapsing it',
              predicate: { flagsSet: ['knows:the_deadline', 'used:talk_fast'], atLocation: 'the_mouth' },
              setsFlags: ['the_seal_broke', 'gate_left_standing', 'baek_breached_it'],
              closesFlags: ['gate_collapsed'],
            },
            {
              routeId: 'outlasted_it',
              label: 'Still be inside when the charge goes off at six',
              predicate: { flagsSet: ['gate_collapsed'] },
              setsFlags: ['the_seal_broke', 'came_out_of_the_collapse'],
              closesFlags: ['gate_left_standing'],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['out_of_the_gate'],
            abilities: [],
            reputation: [
              { factionId: 'faction_pyo_crew', amount: 10 },
              { factionId: 'faction_night_crews', amount: 10 },
            ],
          },
        },
      ],
    },
    /**
     * The first minute closes on whichever route the player takes first, so a
     * player who lifts the pillar, splints her or says no before answering the
     * window would otherwise never be able to say yes during the night. This
     * keeps the offer open on its own track: it closes at once for a first-minute
     * yes, and takes a yes whenever it comes. It sits directly after the relapse
     * so a first-minute yes has already set its flag when this is evaluated.
     */
    {
      id: 'q_the_window',
      title: 'The Window',
      summary: 'A square of text only you can see offered you a hidden class. It waits for your answer without nagging, and a no can still become a yes.',
      kind: 'SIDE',
      startsActive: true,
      involvedCharacterIds: ['the_system'],
      involvedLocationIds: ['ash_hall'],
      knownRewardCopy: 'An answer, whenever you give one.',
      steps: [
        {
          id: 'the_window_waits',
          playerCopy: 'Answer the window, whenever you are ready.',
          directorNotes: 'The window waits and never answers for the player. It asks once more at most, then stays quiet until the player raises it.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'answered_at_once',
              label: 'Said yes in the first minute',
              predicate: { flagsSet: ['took_the_class'] },
              setsFlags: [],
              closesFlags: [],
            },
            {
              routeId: 'yes_when_ready',
              label: 'Say yes when you are ready',
              predicate: { flagsSet: ['used:accept_the_class'] },
              setsFlags: ['took_the_class', 'took_it_late'],
              closesFlags: ['refused_the_class'],
            },
          ],
          rewards: { xp: 0, items: [], flags: [], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_the_class',
      title: 'Custodian',
      summary: 'A square of text only you can see called it a hidden class. It did not say what it is for, or who had it last.',
      kind: 'MAIN',
      involvedCharacterIds: ['the_system', 'pyo', 'baek'],
      involvedLocationIds: ['bell_stair', 'crew_yard', 'bureau_office', 'goldcrest_tower', 'night_pot'],
      knownRewardCopy: 'What the class is for, and a decision about who gets to know you have it.',
      discoverWhen: { flagsSet: ['knows:the_relapse'] },
      steps: [
        {
          id: 'what_it_is_for',
          playerCopy: 'Find out what a Custodian is for, and what the System wants from you.',
          directorNotes:
            'The System answers the literal question and nothing else, so a player who asks well learns a lot and a player who asks badly learns the wording of its terms. Pyo knows a story she has never told. The ledger in the room on the stair knows everything. A player who refused still gets to learn what they turned down, and should feel it without being punished for it.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'asked_it',
              label: 'Ask the System directly',
              predicate: { flagsSet: ['took_the_class', 'spoke:the_system'] },
              setsFlags: ['knows:what_a_custodian_is'],
              closesFlags: [],
            },
            {
              routeId: 'read_the_ledger',
              label: 'Read the ledger in the room nobody mapped',
              predicate: { hasItems: ['caretakers_ledger'] },
              setsFlags: ['knows:what_a_custodian_is', 'read_the_ledger'],
              closesFlags: [],
            },
            {
              routeId: 'pyo_remembers',
              label: 'Get the foreman to tell you about the last one',
              predicate: {
                flagsSet: ['spoke:pyo'],
                minRelationship: [{ characterId: 'pyo', dimension: 'trust', value: 58 }],
              },
              setsFlags: ['knows:what_a_custodian_is', 'pyo_told_you'],
              closesFlags: [],
            },
            {
              routeId: 'saw_what_you_turned_down',
              label: 'Find out what you said no to',
              predicate: { flagsSet: ['refused_the_class', 'out_of_the_gate'] },
              setsFlags: ['knows:what_you_turned_down'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 80,
            items: [],
            flags: ['class_question_open'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'who_gets_to_know',
          playerCopy: 'Decide who finds out what you are, or whether you are anything at all.',
          directorNotes:
            'The Bureau re-test is the pressure: the scanner prints a letter, and for a Custodian it prints E and then something nobody at the district office has seen. Keeping it quiet is a lie that has to be maintained. Registering it hands Baek a leash. The guild will pay anything to get there first. Telling the crews makes it theirs. A refuser can still say yes late, or stay a cleaner on purpose, and both are complete answers.',
          enterWhen: { flagsSet: ['out_of_the_gate', 'class_question_open'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'kept_it_quiet',
              label: 'Talk your way through the re-test as an E-rank',
              predicate: { flagsSet: ['used:talk_fast', 'retest_called'], atLocation: 'bureau_office' },
              setsFlags: ['class_kept_quiet'],
              closesFlags: ['class_registered', 'class_went_public'],
            },
            {
              routeId: 'registered_it',
              label: 'Register the class with Director Baek',
              predicate: { flagsSet: ['spoke:baek', 'took_the_class'], atLocation: 'bureau_office' },
              setsFlags: ['class_registered'],
              closesFlags: ['class_kept_quiet'],
            },
            {
              routeId: 'signed_with_goldcrest',
              label: 'Sign the guild’s contract',
              predicate: {
                flagsSet: ['spoke:ryu', 'took_the_class'],
                atLocation: 'goldcrest_tower',
                minRelationship: [{ characterId: 'ryu', dimension: 'trust', value: 40 }],
              },
              setsFlags: ['signed_with_goldcrest'],
              closesFlags: ['class_kept_quiet'],
            },
            {
              routeId: 'told_the_crews',
              label: 'Tell the night crews what you can do',
              predicate: {
                flagsSet: ['took_the_class'],
                atLocation: 'night_pot',
                minFactionReputation: [{ factionId: 'faction_night_crews', value: 35 }],
              },
              setsFlags: ['class_went_public'],
              closesFlags: ['class_kept_quiet'],
            },
            {
              routeId: 'said_yes_late',
              label: 'Say yes after all',
              predicate: { flagsSet: ['refused_the_class', 'used:accept_the_class'] },
              setsFlags: ['took_the_class', 'took_it_late'],
              closesFlags: ['refused_the_class'],
            },
            {
              routeId: 'stayed_a_cleaner',
              label: 'Go back to the depot and pick up a mop',
              predicate: { flagsSet: ['refused_the_class', 'used:do_the_job'], atLocation: 'crew_yard' },
              setsFlags: ['stayed_a_cleaner'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['the_class_is_answered'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_jins_pocket',
      title: 'What Jin Is Carrying',
      summary: 'Every hound that rises out of the ash walks past you and goes for Jin. He says his jacket is completely normal.',
      kind: 'SIDE',
      involvedCharacterIds: ['jin', 'pyo'],
      involvedLocationIds: ['ash_hall', 'core_chamber', 'bureau_office', 'night_pot'],
      knownRewardCopy: 'The thing in Jin’s pocket, and a decision about whose problem it is.',
      discoverWhen: { flagsSet: ['knows:the_relapse'] },
      steps: [
        {
          id: 'the_humming_pocket',
          playerCopy: 'Find out why the things in the ash keep going for Jin.',
          directorNotes:
            'Jin lies badly and politely. He is not a villain: he took a shard to pay a hospital and he is terrified that he started all this. Let him be funny about it until he cannot be. Whoever finds out, the shard ends up in the player’s hands, because Jin would rather it were anybody’s but his.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'he_told_you',
              label: 'Get Jin to tell you himself',
              predicate: {
                flagsSet: ['spoke:jin'],
                minRelationship: [{ characterId: 'jin', dimension: 'trust', value: 62 }],
              },
              setsFlags: ['jin_told_you'],
              closesFlags: [],
            },
            {
              routeId: 'inventory_caught_it',
              label: 'Let the System list what Jin is carrying',
              predicate: { flagsSet: ['used:take_inventory', 'met:jin'] },
              setsFlags: ['saw_the_shard'],
              closesFlags: ['jin_told_you'],
            },
            {
              routeId: 'watched_the_hounds',
              label: 'Watch where the hounds go and work it out',
              predicate: { flagsSet: ['used:read_the_floor', 'hounds_went_for_jin'] },
              setsFlags: ['saw_the_shard'],
              closesFlags: ['jin_told_you'],
            },
          ],
          rewards: {
            xp: 60,
            items: [{ itemId: 'bell_shard', qty: 1 }],
            flags: ['knows:the_shard'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'what_to_do_with_it',
          playerCopy: 'Decide what happens to a piece of the bell worth a year of Jin’s rent.',
          directorNotes:
            'Every option costs somebody. Putting it back costs Jin the money and maybe ends the relapse. Handing it in is evidence, and the Bureau will use it to put the whole thing on the crew. Selling it at the soup place pays a hospital and makes the player a fence. Keeping it means the hounds keep coming. None of these is the moral answer and the prose should not pick one.',
          enterWhen: { flagsSet: ['knows:the_shard'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'put_it_where_it_was',
              label: 'Carry it to the bottom and put it back',
              predicate: { hasItems: ['bell_shard'], atLocation: 'core_chamber' },
              setsFlags: ['shard_returned'],
              closesFlags: ['shard_sold', 'shard_handed_in'],
            },
            {
              routeId: 'handed_it_in',
              label: 'Hand it to the Bureau as evidence',
              predicate: { hasItems: ['bell_shard'], flagsSet: ['spoke:baek'], atLocation: 'bureau_office' },
              setsFlags: ['shard_handed_in', 'blame_landed_on_crew', 'jin_took_the_blame'],
              closesFlags: ['shard_returned', 'shard_sold'],
            },
            {
              routeId: 'sold_it',
              label: 'Sell it to somebody at the soup place for Jin’s mother',
              predicate: { hasItems: ['bell_shard'], flagsSet: ['used:talk_fast'], atLocation: 'night_pot' },
              setsFlags: ['shard_sold'],
              closesFlags: ['shard_returned', 'shard_handed_in'],
            },
            {
              routeId: 'kept_it',
              label: 'Keep it, and keep quiet',
              predicate: { hasItems: ['bell_shard'], flagsSet: ['out_of_the_gate'] },
              setsFlags: ['shard_kept'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['shard_decided'],
            abilities: [],
            reputation: [
              { factionId: 'faction_pyo_crew', amount: 5 },
              { factionId: 'faction_night_crews', amount: 10 },
            ],
          },
        },
      ],
    },
    {
      id: 'q_the_report',
      title: 'Incident Report 0419',
      summary: 'The Bureau has to write down why a cleared gate relapsed inside the city. Somebody’s name goes on page two.',
      kind: 'MAIN',
      involvedCharacterIds: ['baek', 'ryu', 'jin', 'hae_won', 'pyo'],
      involvedLocationIds: ['bureau_office', 'goldcrest_tower', 'crew_yard'],
      knownRewardCopy: 'A say in whose name goes on the report.',
      discoverWhen: { flagsSet: ['out_of_the_gate'] },
      steps: [
        {
          id: 'what_it_says',
          playerCopy: 'Find out who the Bureau’s report is going to blame.',
          directorNotes:
            'Draft three blames "contractor personnel", meaning the crew. It was written after the guild’s lawyers visited. Baek knows it is convenient and not that it is false; she has a shard-shaped hole in her evidence and a guild offering to fill it. Nobody in this step is lying outright except, possibly, the player.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'baek_showed_you',
              label: 'Get the director to show you the draft',
              predicate: { minRelationship: [{ characterId: 'baek', dimension: 'trust', value: 45 }] },
              setsFlags: ['knows:the_report'],
              closesFlags: [],
            },
            {
              routeId: 'took_the_draft',
              label: 'Take a copy off her desk',
              predicate: { hasItems: ['draft_report'] },
              setsFlags: ['knows:the_report', 'stole_the_draft'],
              closesFlags: [],
            },
            {
              routeId: 'ryu_let_it_slip',
              label: 'Let the captain tell you how helpful he has been',
              predicate: {
                flagsSet: ['spoke:ryu'],
                minRelationship: [{ characterId: 'ryu', dimension: 'trust', value: 30 }],
              },
              setsFlags: ['knows:the_report'],
              closesFlags: [],
            },
            {
              routeId: 'pyo_heard',
              label: 'Hear it from the foreman at the depot',
              predicate: { flagsSet: ['spoke:pyo', 'visited:crew_yard'] },
              setsFlags: ['knows:the_report'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['report_on_the_table'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'who_carries_it',
          playerCopy: 'Decide who carries the blame for a gate that went red.',
          directorNotes:
            'Two real causes, a skipped check and a stolen shard, and one page to put them on. The medic log puts it on the guild. Hae-won testifying costs her the guild and her contract. Taking it yourself is noble and ends a licence. Burying it with Baek is a deal with a person who will remember it. Doing nothing is also an answer: after a few days the report files itself, and it lands on Jin. That route must not be written as a punishment; it is what happens to cheap people when nobody speaks.',
          enterWhen: { flagsSet: ['report_on_the_table'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'the_log_came_out',
              label: 'Put the medic log in front of the Bureau',
              predicate: { hasItems: ['raid_log'] },
              setsFlags: ['the_truth_is_out', 'blame_landed_on_goldcrest'],
              closesFlags: ['buried_it'],
            },
            {
              routeId: 'hae_won_testified',
              label: 'Hae-won tells them herself',
              predicate: {
                flagsSet: ['spoke:hae_won'],
                minRelationship: [{ characterId: 'hae_won', dimension: 'trust', value: 65 }],
              },
              setsFlags: ['the_truth_is_out', 'hae_won_testified'],
              closesFlags: ['buried_it'],
            },
            {
              routeId: 'you_took_it',
              label: 'Put your own name on page two',
              predicate: { flagsSet: ['used:own_it'], atLocation: 'bureau_office' },
              setsFlags: ['you_took_the_blame', 'blame_landed_on_crew'],
              closesFlags: ['the_truth_is_out'],
            },
            {
              routeId: 'buried_it',
              label: 'Make a deal with the director to file it as unexplained',
              predicate: {
                flagsSet: ['used:talk_fast', 'spoke:baek'],
                minRelationship: [{ characterId: 'baek', dimension: 'trust', value: 40 }],
              },
              setsFlags: ['buried_it'],
              closesFlags: ['the_truth_is_out'],
            },
            {
              routeId: 'it_fell_on_jin',
              label: 'Say nothing, and let it file itself',
              predicate: { flagsSet: ['report_on_the_table'], afterWorldMinute: 4 * 1440 + 18 * 60 },
              setsFlags: ['jin_took_the_blame', 'blame_landed_on_crew'],
              closesFlags: ['the_truth_is_out'],
            },
          ],
          rewards: {
            xp: 150,
            items: [],
            flags: ['report_filed'],
            abilities: [],
            reputation: [{ factionId: 'faction_bureau', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_hae_won',
      title: 'The Healer Who Stayed',
      summary: 'An S-rank healer stopped for a cleaner’s hand when the rest of her guild walked out. She has not said why, and her contract renews in nine days.',
      kind: 'SIDE',
      involvedCharacterIds: ['hae_won', 'ryu'],
      involvedLocationIds: ['ash_hall', 'crew_yard', 'goldcrest_tower', 'night_pot'],
      knownRewardCopy: 'Why she stayed, and what she does with the next nine days.',
      discoverWhen: { flagsSet: ['knows:the_relapse'] },
      steps: [
        {
          id: 'why_she_stayed',
          playerCopy: 'Find out why an S-rank healer stopped for a cleaner’s hand.',
          directorNotes:
            'She will say it was because Jin was bleeding on her boots, and that is true and is not all of it. She was testing her guild, and it failed. She tells it as a chart note. Do not make her soft about it too early; the warmth is in what she does, not what she says.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'she_told_you',
              label: 'She tells you, eventually',
              predicate: {
                flagsSet: ['spoke:hae_won'],
                minRelationship: [{ characterId: 'hae_won', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['knows:why_she_stayed'],
              closesFlags: [],
            },
            {
              routeId: 'read_her_log',
              label: 'Read it in her own log',
              predicate: { hasItems: ['raid_log'] },
              setsFlags: ['knows:why_she_stayed', 'read_her_log'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 70,
            items: [],
            flags: ['knows:her_contract'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'nine_days',
          playerCopy: 'Her guild contract renews itself in nine days. Help her decide, or stay out of it.',
          directorNotes:
            'This is her decision. The player can help, argue, or offer her a room at the depot, and must not be able to make it for her. Re-signing is not a failure: the guild’s medical floor is the best in the city and she knows exactly what she is selling. If nobody does anything, the contract rolls over at noon on the ninth day, and that is a real outcome too.',
          enterWhen: { flagsSet: ['knows:her_contract', 'out_of_the_gate'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'she_opens_the_clinic',
              label: 'She opens the clinic near the depot',
              predicate: {
                flagsSet: ['knows:why_she_stayed'],
                atLocation: 'crew_yard',
                minRelationship: [{ characterId: 'hae_won', dimension: 'affection', value: 60 }],
              },
              setsFlags: ['clinic_opened', 'contract_decided'],
              closesFlags: ['she_re_signed'],
            },
            {
              routeId: 'she_re_signs',
              label: 'She signs with the guild again, on her own terms',
              predicate: { flagsSet: ['spoke:ryu', 'knows:her_contract'], atLocation: 'goldcrest_tower' },
              setsFlags: ['she_re_signed', 'contract_decided'],
              closesFlags: ['clinic_opened'],
            },
            {
              routeId: 'the_contract_rolled_over',
              label: 'Nobody signs anything, and it renews at noon',
              predicate: { flagsSet: ['contract_deadline_passed'] },
              setsFlags: ['she_re_signed', 'contract_decided', 'nobody_stopped_it'],
              closesFlags: ['clinic_opened'],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['her_week_decided'],
            abilities: [],
            reputation: [{ factionId: 'faction_night_crews', amount: 5 }],
          },
        },
      ],
    },
    {
      id: 'q_the_unmapped_room',
      title: 'The Room Nobody Mapped',
      summary: 'Halfway down the bell stair there is a plain wooden door that no raid map shows, and the floor behind it has been swept.',
      kind: 'LEAD',
      involvedCharacterIds: ['the_system', 'pyo', 'baek'],
      involvedLocationIds: ['bell_stair', 'caretakers_room'],
      knownRewardCopy: 'Whatever the last Custodian left behind.',
      discoverWhen: { flagsSet: ['took_the_class'] },
      steps: [
        {
          id: 'find_the_door',
          playerCopy: 'Find the door on the stair that no raid map shows.',
          directorNotes:
            'Only a player with the class can see the door, and only by looking properly. Keep it quiet and domestic rather than eerie: a plain wooden door with a brass handle in a wall of ancient stone, the most ordinary thing in the gate.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'inventory_found_it',
              label: 'Take inventory of the stair',
              predicate: { flagsSet: ['used:take_inventory'], atLocation: 'bell_stair' },
              setsFlags: ['saw_the_door'],
              closesFlags: [],
            },
            {
              routeId: 'floor_found_it',
              label: 'Notice where somebody has swept',
              predicate: { flagsSet: ['used:read_the_floor', 'took_the_class'], atLocation: 'bell_stair' },
              setsFlags: ['saw_the_door'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 60,
            items: [],
            flags: ['knows:the_door'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'read_what_she_left',
          playerCopy: 'Read what the last Custodian left behind.',
          directorNotes:
            'The ledger is the procedure for closing a gate properly, in seven steps, and a name. It is also twenty years of somebody being alone in this job. The System goes very quiet in this room. Its notices here are the most human it ever gets, and it does not acknowledge them.',
          enterWhen: { flagsSet: ['saw_the_door'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'read_it_there',
              label: 'Sit on her stool and read it where it is',
              predicate: { atLocation: 'caretakers_room' },
              setsFlags: ['found_the_ledger'],
              closesFlags: [],
            },
            {
              routeId: 'took_it_with_you',
              label: 'Take the ledger with you',
              predicate: { hasItems: ['caretakers_ledger'] },
              setsFlags: ['found_the_ledger', 'took_the_ledger'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['knows:how_to_close'],
            abilities: ['close_out'],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_overdue',
      title: 'Overdue',
      summary: 'Fourteen gate sites in the city have never been cleaned properly. One of them is the guild’s own training gate, under its tower.',
      kind: 'MAIN',
      involvedCharacterIds: ['the_system', 'ryu', 'baek', 'pyo'],
      involvedLocationIds: ['goldcrest_tower', 'training_gate', 'bureau_office', 'night_pot'],
      knownRewardCopy: 'A say in whether the next relapse happens with people inside it.',
      discoverWhen: { flagsSet: ['out_of_the_gate'] },
      steps: [
        {
          id: 'the_list',
          playerCopy: 'Do something about the list of gates nobody has cleaned, before the next one turns red.',
          directorNotes:
            'The System has the list and only shows it to a Custodian. A refuser hears about the basement gate from the night crews, because crews notice the grey floor. The basement gate under the guild tower is the one that matters: four hundred raids, filmed, and never once swept. Whether the player gets there first decides whether eleven first-contract hunters in their twenties and a camera crew are inside it when it goes.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'cleaned_it_early',
              label: 'Get into the basement gate and sign it off before it turns',
              predicate: { flagsSet: ['used:sign_off'], atLocation: 'training_gate' },
              setsFlags: ['tower_gate_cleaned_early'],
              closesFlags: [],
            },
            {
              routeId: 'told_baek',
              label: 'Give the list to the Bureau',
              predicate: { flagsSet: ['spoke:baek', 'knows:the_overdue_list'], atLocation: 'bureau_office' },
              setsFlags: ['bureau_has_the_list'],
              closesFlags: [],
            },
            {
              routeId: 'told_the_crews',
              label: 'Give the list to the night crews',
              predicate: { flagsSet: ['knows:the_overdue_list'], atLocation: 'night_pot' },
              setsFlags: ['crews_have_the_list'],
              closesFlags: [],
            },
            {
              routeId: 'nobody_was_told',
              label: 'Do nothing until it happens',
              predicate: { flagsSet: ['the_tower_went_red'] },
              setsFlags: ['nobody_was_told'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 100,
            items: [],
            flags: ['list_answered'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'the_basement_gate',
          playerCopy: 'Decide what happens to the gate under the guild tower.',
          directorNotes:
            'The finale, if the run wants one. Closing it out from the inside is the Custodian’s whole job and costs everything the player has left. Two hundred crew with mops is the union version. A Bureau collapse under a forty-floor tower is the protocol version and has people inside it. If the player got there early, there is nothing to do but watch a gate stay white, which should feel like the best thing in the story.',
          enterWhen: { flagsSet: ['list_answered'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'closed_it_out',
              label: 'Close the basement gate properly, from the inside',
              predicate: { flagsSet: ['used:close_out'], atLocation: 'training_gate' },
              setsFlags: ['closed_the_tower_gate'],
              closesFlags: ['bureau_collapsed_the_tower'],
            },
            {
              routeId: 'crews_cleaned_it',
              label: 'Bring every night crew in the district',
              predicate: {
                flagsSet: ['crews_have_the_list'],
                atLocation: 'training_gate',
                minFactionReputation: [{ factionId: 'faction_night_crews', value: 40 }],
              },
              setsFlags: ['crews_cleaned_it'],
              closesFlags: ['bureau_collapsed_the_tower'],
            },
            {
              routeId: 'bureau_collapsed_it',
              label: 'Let the Bureau collapse it by the book',
              predicate: { flagsSet: ['bureau_has_the_list', 'the_tower_went_red'] },
              setsFlags: ['bureau_collapsed_the_tower'],
              closesFlags: ['closed_the_tower_gate', 'crews_cleaned_it'],
            },
            {
              routeId: 'it_never_turned',
              label: 'It stays white, because you got there first',
              predicate: { flagsSet: ['tower_gate_cleaned_early'] },
              setsFlags: ['tower_never_turned'],
              closesFlags: [],
            },
            {
              routeId: 'ryu_went_in',
              label: 'The captain goes in alone',
              predicate: { flagsSet: ['the_tower_went_red', 'nobody_was_told'] },
              setsFlags: ['ryu_went_in_alone'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 200,
            items: [],
            flags: ['the_week_is_answered'],
            abilities: [],
            reputation: [
              { factionId: 'faction_night_crews', amount: 15 },
              { factionId: 'faction_bureau', amount: 10 },
            ],
          },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_the_first_toll',
      atWorldMinute: 23 * 60 + 55,
      locationId: 'ash_hall',
      publicCopy: 'Far below, the bell rings a second time, and the ash nearest the gallery arch rises into the shape of a dog and sits up.',
      directorNotes:
        'The first hound. It is small, confused and made of ash, and it is a clear demonstration of the rules: the gate is rebuilding what the raid destroyed. It does not attack the player first. It looks toward the ramp, where Jin is.',
      setsFlags: ['heard_the_toll'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_jin_comes_back',
      atWorldMinute: 23 * 60 + 58,
      locationId: 'ash_hall',
      publicCopy: 'Jin comes skidding down the ramp from the sealed mouth with a squeegee pole in both hands, shouting that he is not leaving either, unfortunately.',
      directorNotes:
        'He was at the carts by the seal when it closed and he came down anyway. He is frightened, funny and lying about his pocket. If the player ran, they meet him halfway up the ramp and he turns them round.',
      setsFlags: ['jin_came_back'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'jin', toLocationId: 'ash_hall' }],
    },
    {
      id: 'we_voices_through_the_seal',
      atWorldMinute: 24 * 60 + 25,
      locationId: 'the_mouth',
      publicCopy:
        'Through the red membrane at the top of the ramp, muffled like a neighbour through a cheap wall, Foreman Pyo is shouting locker numbers and a Bureau megaphone is reading out a time: six o’clock.',
      directorNotes:
        'The outside cast arrives as voices. Pyo is loud and frightened. Baek states the protocol and asks for facts. Ryu asks, quietly, whether Hae-won is alive, and does not ask about anybody else. All three can be talked to through the seal for the rest of the night.',
      setsFlags: ['knows:the_deadline'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'pyo', toLocationId: 'gate_perimeter' },
        { characterId: 'baek', toLocationId: 'gate_perimeter' },
        { characterId: 'ryu', toLocationId: 'gate_perimeter' },
      ],
    },
    {
      id: 'we_hounds_go_for_jin',
      atWorldMinute: 24 * 60 + 90,
      locationId: 'ash_hall',
      publicCopy: 'Three ash hounds come up out of the gallery together, walk straight past you, and go for Jin.',
      directorNotes:
        'They want the shard and they do not care about anything else. This is the clearest clue the night offers, and it should be frightening and slightly absurd: the hounds are ignoring an armed cleaner to sniff at one jacket pocket.',
      setsFlags: ['hounds_went_for_jin'],
      cancelledByFlags: ['shard_returned', 'the_seal_broke'],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_the_gallery_mends',
      atWorldMinute: 24 * 60 + 180,
      locationId: 'glass_gallery',
      publicCopy:
        'Every pane in the glass gallery mends itself in the same second, and in the reflections something tall walks the length of the corridor that is not in the corridor.',
      directorNotes:
        'The light-eaters are back. The gallery is now the hard part of getting down the stair, and torches will not help. A signed-off gallery would not have mended; say so if the player has the class and has not used it.',
      setsFlags: ['gallery_restored'],
      cancelledByFlags: ['the_seal_broke'],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_the_ten_minute_call',
      atWorldMinute: 24 * 60 + 350,
      locationId: 'the_mouth',
      publicCopy:
        'The megaphone beyond the seal says ten minutes. Then Director Baek says it again, closer to the membrane, in her own voice without the megaphone.',
      directorNotes:
        'Last chance for the political route. Baek is not cruel and she is not bluffing. Give her one line that shows she was a cleaner once, if the player has earned it.',
      setsFlags: ['collapse_ordered'],
      cancelledByFlags: ['the_seal_broke'],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_the_collapse',
      atWorldMinute: 24 * 60 + 360,
      locationId: null,
      publicCopy: 'At six, the collapse charge goes off on the far side of the seal, and the gate folds shut like a fist around everything inside it.',
      directorNotes:
        'Fail forward. The System files the player out of the site: they wake on the concrete of the car park with ash in their mouth and a notice reading [Contractor removed from site.] Who else came out depends on what the run did: whoever was within arm’s reach of the player comes out too, hurt; whoever was not is gone. Never decide that silently. Say who.',
      setsFlags: ['gate_collapsed'],
      cancelledByFlags: ['the_seal_broke'],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_the_retest_notice',
      atWorldMinute: 1440 + 9 * 60,
      locationId: 'bureau_office',
      publicCopy: 'A Bureau text message: every survivor of Gate 0419 is to report to the district office for a rank re-test by the end of tomorrow.',
      directorNotes:
        'Routine after any relapse, and frightening for anybody with a hidden class. The scanner prints a letter. For a Custodian it prints E, pauses, and prints a second line nobody at the office has a code for.',
      setsFlags: ['retest_called'],
      cancelledByFlags: [],
      requiresFlags: ['out_of_the_gate'],
      movesCharacters: [],
    },
    {
      id: 'we_the_overdue_list',
      atWorldMinute: 1440 + 14 * 60,
      locationId: null,
      publicCopy: 'A square of text opens while you are doing something ordinary: [Overdue: 14 sites.] Then a list of addresses. The fourth is a guild tower.',
      directorNotes:
        'Only for a player who took the class. The System is not dramatic about it; this is a maintenance backlog. The basement gate under the guild tower is the one it marks urgent.',
      setsFlags: ['knows:the_overdue_list'],
      cancelledByFlags: [],
      requiresFlags: ['took_the_class', 'out_of_the_gate'],
      movesCharacters: [],
    },
    {
      id: 'we_the_broadcast',
      atWorldMinute: 1440 + 21 * 60,
      locationId: null,
      publicCopy: 'The guild’s raid recap goes out at nine. Gate 0419 is a clean, cheerful forty minutes. Nobody in it is wearing a hi-vis vest.',
      directorNotes:
        'Hae-won is described as "recovering". The relapse is mentioned once, as "an incident after clearance". The night crews’ group chat watches it together and is not kind. Jin watches it twice.',
      setsFlags: ['saw_the_broadcast'],
      cancelledByFlags: [],
      requiresFlags: ['out_of_the_gate'],
      movesCharacters: [],
    },
    {
      id: 'we_ryu_at_the_depot',
      atWorldMinute: 2 * 1440 + 11 * 60,
      locationId: 'crew_yard',
      publicCopy: 'A black guild car blocks the depot gate, and Ryu Ha-joon gets out of it alone, carrying a box of good pastries nobody asked for.',
      directorNotes:
        'He has come to be charming, to find out what the player saw, and to make an offer if there is anything to make an offer about. Pyo will not let him past the kettle without a fight.',
      setsFlags: ['ryu_came_round'],
      cancelledByFlags: [],
      requiresFlags: ['out_of_the_gate'],
      movesCharacters: [{ characterId: 'ryu', toLocationId: 'crew_yard' }],
    },
    {
      id: 'we_the_tower_goes_red',
      atWorldMinute: 4 * 1440 + 20 * 60,
      locationId: 'training_gate',
      publicCopy:
        'Under the guild tower, the training gate the guild films in every week turns red, with eleven first-contract hunters in their twenties and a camera crew inside.',
      directorNotes:
        'The second relapse, and the one the player can prevent. If it happens, Ryu goes in or tries to, Baek wheels out a collapse charge under a forty-floor tower, and the night crews start arriving with mops whether anybody asked them or not.',
      setsFlags: ['the_tower_went_red'],
      cancelledByFlags: ['tower_gate_cleaned_early'],
      requiresFlags: ['out_of_the_gate'],
      movesCharacters: [{ characterId: 'ryu', toLocationId: 'training_gate' }],
    },
    {
      id: 'we_the_contract_rolls_over',
      atWorldMinute: 9 * 1440 + 12 * 60,
      locationId: 'goldcrest_tower',
      publicCopy: 'At noon, Seo Hae-won’s guild contract renews itself for three years, because nobody signed the form that would have stopped it.',
      directorNotes:
        'Only if her week was never decided. She takes it quietly and is very professional for a fortnight. It is not a tragedy; it is what happens when nobody, including her, does anything.',
      setsFlags: ['contract_deadline_passed'],
      cancelledByFlags: ['contract_decided'],
      requiresFlags: ['out_of_the_gate'],
      movesCharacters: [],
    },
  ],
  promises: [
    {
      id: 'p_the_way_out',
      kind: 'FINALE',
      label: 'Whether anybody walks out of the gate by six',
      seedHint: 'A red wall at the top of the ramp that lets sound through and nothing else.',
      payoffHint: 'The way out turns out to be the job: a room swept, signed and left alone, then the next one, up a stair.',
      weight: 1,
    },
    {
      id: 'p_the_last_custodian',
      kind: 'MYSTERY',
      label: 'Who had the class before you',
      seedHint: 'The System says the class was found, not granted, and one notice uses the word "again".',
      payoffHint: 'A tidy room no raid map shows, a broom worn to somebody else’s hands, and a ledger signed by Ma Deok-sun twenty years ago.',
      weight: 0.8,
    },
    {
      id: 'p_hae_won',
      kind: 'RELATIONSHIP',
      label: 'The healer who stopped for a cleaner’s hand',
      seedHint: 'She orders you to leave her, and calls you "cleaner" as if it were your name.',
      payoffHint: 'She learns your real name, and tells you about an empty shopfront two streets from the depot.',
      weight: 0.9,
    },
    {
      id: 'p_ryu',
      kind: 'RIVAL',
      label: 'The captain who called the clear at twenty to ten',
      seedHint: 'Through the seal he asks whether Hae-won is alive, and does not ask about anybody else.',
      payoffHint: 'A timestamp on a medic’s tablet and a blank line where the deep check should be.',
      weight: 0.75,
    },
    {
      id: 'p_who_gets_blamed',
      kind: 'THEME',
      label: 'Who carries it when a gate goes wrong',
      seedHint: 'Something in Jin’s jacket hums every time the bell rings.',
      payoffHint: 'Draft three of the incident report blames "contractor personnel", and the player decides whether that holds.',
      weight: 0.7,
    },
  ],
  archetypes: [
    {
      id: 'arch_former_hunter',
      name: 'Former Hunter',
      role: 'Melee fighting and nerve',
      summary: 'You held an ordinary D-rank combat licence until a knee injury dropped you to E, so you hit harder than a cleaner should and keep your head in a fight.',
      playstyle: ['Hits hard', 'Steady in a fight', 'Old injury'],
      blurb: 'They took the D off your licence after the knee. They did not take the habit of standing between people and whatever has the teeth.',
      attributeBonus: { might: 2, resolve: 1 },
      skillProficiencies: { brawl: 3, staying: 1, footwork: 1 },
      startingItems: [{ itemId: 'steel_pole', qty: 1 }],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_bureau', amount: 5 }],
    },
    {
      id: 'arch_lifer',
      name: 'Six-Year Lifer',
      role: 'Craft and dungeon know-how',
      summary: 'You have swept more gates than most hunters have entered, so you read floors, ash and cores better than anybody else in this gate.',
      playstyle: ['Observant', 'Practical', 'Knows every floor'],
      blurb: 'Six years, two hundred gates, one rule the old-timers taught you on day one. You have never once been on the broadcast.',
      attributeBonus: { mind: 2, might: 1 },
      skillProficiencies: { know_how: 3, graft: 2 },
      startingItems: [{ itemId: 'core_bag', qty: 1 }],
      startingAbilities: [],
      startingReputation: [
        { factionId: 'faction_night_crews', amount: 10 },
        { factionId: 'faction_pyo_crew', amount: 5 },
      ],
    },
    {
      id: 'arch_medic',
      name: 'Dropout Medic',
      role: 'Healing and first aid',
      summary: 'Two years of medical school before the money ran out, so you can keep people alive in a gate and talk an S-rank healer through her own injury.',
      playstyle: ['Careful', 'Keeps people alive', 'Calm under pressure'],
      blurb: 'You still carry the good scissors. You still check pupils without meaning to. You still owe the university for a degree you did not finish.',
      attributeBonus: { mind: 2, resolve: 1 },
      skillProficiencies: { first_aid: 3, staying: 1 },
      startingItems: [{ itemId: 'crew_kit', qty: 1 }],
      startingAbilities: [],
      startingReputation: [],
    },
    {
      id: 'arch_talker',
      name: 'Fast Talker',
      role: 'Talk and bluffing',
      summary: 'You took this job to pay off a debt and have talked your way past creditors, foremen and Bureau inspectors, so people with rank are just people to you.',
      playstyle: ['Persuasive', 'Bluffs', 'Gets into trouble'],
      blurb: 'You have never once been believed because you were honest. You have frequently been believed anyway.',
      attributeBonus: { presence: 2, agility: 1 },
      skillProficiencies: { patter: 3, footwork: 1 },
      startingItems: [{ itemId: 'energy_drink', qty: 2 }],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_pyo_crew', amount: 5 }],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What does your locker tag say?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Han Yu-ri' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. she/her' },
    {
      id: 'archetype',
      label: 'Why are you on a cleanup crew?',
      helpText:
        'What you did before you were mopping up after raids, which sets what you are good at. It is fixed for the whole story. It does not decide whether you take the hidden class, who you get out of the gate, or whose name goes on the report. All of that is yours.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'What does the crew know about you?',
      helpText: 'One plain sentence about who you are on a normal shift. Most people write one line, and that is the right amount.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. I bring snacks for everyone and I have never once been on time.',
    },
    {
      id: 'first_instinct',
      label: 'What do you do when a gate goes wrong?',
      helpText: 'A starting instinct, not a commitment. You can do the exact opposite in the first minute and the world will keep up.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'grab_the_pole', label: 'Pick up something heavy' },
        { id: 'grab_a_person', label: 'Grab the nearest person and pull' },
        { id: 'run_first', label: 'Run first, think on the ramp' },
        { id: 'keep_talking', label: 'Start talking and keep talking' },
        { id: 'go_still', label: 'Go very still and look at everything' },
      ],
    },
    {
      id: 'appearance',
      label: 'What does Hae-won see when she looks up from the ash?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. Hi-vis vest, rubber boots, a mop in one hand and a face that has had enough of tonight.',
    },
  ],
  /**
   * Where this can end up.
   *
   * Three of the eleven are losses and none of them is written as a
   * punishment. "Six O'Clock" is the collapse, reachable by doing nothing
   * clever for six hours. "Contractor Personnel" is the report filing itself
   * on the cheapest name available, reachable by saying nothing for four days.
   * "Hand In the Vest" is walking away, and it is available early.
   *
   * Six of the eleven never need the class, so refusing it in the first minute
   * closes a door rather than the story.
   */
  endings: [
    {
      id: 'end_back_on_shift',
      name: 'Back on Shift',
      rarity: 'COMMON',
      minTurn: 30,
      requires: {
        flagsSet: ['out_of_the_gate', 'class_kept_quiet'],
        flagsUnset: ['left_the_map', 'blame_landed_on_crew'],
      },
      condition:
        'The player came out of the gate, kept the class to themselves, and went back to work. The paperwork did not change and neither did the licence. Play it as a shift: vans, ash, soup at four, and a square of text only one person on the crew can see. Do not turn it into a secret-identity fantasy; it is a job with a secret in it.',
      epilogue:
        'The licence still says E. The vest still says 31. Twice a month the crew goes into a cleared gate and comes out of it cleaner than anybody else’s, and nobody at the Bureau can explain why gates on Pyo’s invoices fold shut an hour late and never relapse. The System files a ticket every time.',
      hint: '',
    },
    {
      id: 'end_just_a_cleaner',
      name: 'Just a Cleaner',
      rarity: 'UNCOMMON',
      minTurn: 30,
      requires: {
        flagsSet: ['out_of_the_gate', 'stayed_a_cleaner'],
        flagsUnset: ['took_the_class'],
      },
      condition:
        'The player said no to the class and got out anyway, with their back, their crew and their own two hands. This is not a lesser ending and must not read as one. What it is about is that the people in the gate were saved by an E-rank doing the job properly, and that the job turned out to be enough.',
      epilogue:
        'The window never opens again. Some nights, sweeping a cleared gate, the player catches themselves mopping away from the exit, the way the old-timers say to, and wonders for about four seconds what it would have said. Then Jin starts talking about fridges.',
      hint: '',
    },
    {
      id: 'end_custodian',
      name: 'Custodian',
      rarity: 'RARE',
      minTurn: 40,
      requires: { flagsSet: ['took_the_class', 'closed_the_tower_gate'] },
      condition:
        'The player took the class and did the whole job: they closed a gate properly, from the inside, under a guild tower, with people waiting on the far side. Write the work rather than the power. It is seven steps in a ledger, done in order, by somebody exhausted, and the last step is the one where you do not stand in the core.',
      epilogue:
        'The basement under the tower is a basement again, concrete and empty, with a faint smell of ash. Fourteen sites on the list become thirteen. The System adds a line to the ledger in a notice nobody else can see, and for once it does not phrase it as a ticket.',
      hint: 'There is a list of gates nobody has cleaned, and one of them is under a tower.',
    },
    {
      id: 'end_forty_pages',
      name: 'Forty Pages',
      rarity: 'UNCOMMON',
      minTurn: 34,
      requires: { flagsSet: ['signed_with_goldcrest'] },
      condition:
        'The player signed with the guild. This is not a betrayal of the crew unless the run made it one: it is a large amount of money, a tower, a sponsor, and a confidentiality clause on page thirty-one. Play the first week of being famous honestly, including the part that is genuinely good.',
      epilogue:
        'The player is on the broadcast now, in a black coat that fits badly for a month and then fits. Pyo keeps locker thirty-one empty and does not explain why to new hires. Ryu is a better partner than expected and a worse friend, and both of those turn out to be negotiable.',
      hint: '',
    },
    {
      id: 'end_the_clinic',
      name: 'The Clinic on Second Street',
      rarity: 'RARE',
      minTurn: 38,
      requires: {
        flagsSet: ['clinic_opened'],
        minRelationship: [{ characterId: 'hae_won', dimension: 'affection', value: 65 }],
      },
      condition:
        'Hae-won walked out of her guild and opened a free clinic for cleanup crews two streets from the depot, and the player was part of why. Keep it practical: a lease, a second-hand bed, a queue of E-ranks with bad backs. Whatever is between the two of them is slow, dry and real, and goes no further than a kiss.',
      epilogue:
        'The sign is hand-painted and slightly crooked, and she refuses to fix it. Crews come in at five in the morning with burns and sprains and leave with a lecture. She still calls the player "cleaner" sometimes, on purpose, and only when nobody else is listening.',
      hint: '',
    },
    {
      id: 'end_timestamp',
      name: 'Timestamp 21:40',
      rarity: 'RARE',
      minTurn: 36,
      requires: { flagsSet: ['the_truth_is_out', 'report_filed'] },
      condition:
        'The skipped check came out, on the record, and the report says what actually happened rather than what was convenient. This costs people: the captain, the director, maybe Hae-won. Write the cost plainly and do not make the player a hero for it. The truth was in a medic log nobody reads, and somebody read it.',
      epilogue:
        'The Bureau adds a line to the clearance form: deep check of the core chamber, signed by a cleanup crew supervisor, not a raid captain. It takes four months and nobody names it after anybody. Ryu does one interview, on camera, and does not lie in it.',
      hint: '',
    },
    {
      id: 'end_contractor_personnel',
      name: 'Contractor Personnel',
      rarity: 'COMMON',
      minTurn: 30,
      requires: {
        flagsSet: ['blame_landed_on_crew', 'report_filed'],
        flagsUnset: ['the_truth_is_out'],
      },
      condition:
        'The report blamed the crew. Maybe the player took it on purpose, maybe Jin carried it, maybe nobody said anything and it filed itself. This is the ordinary way a story like this ends for people with E on their licence, and it must not be written as a punishment for playing badly. Write the paperwork, the licence hearing, and who still turns up at the depot.',
      epilogue:
        'A licence is suspended for a year. Pyo pays the fine out of her own account and invoices nobody for it. The guild’s recap gets a sequel. At the soup place at four in the morning, two thousand people in a group chat know exactly what happened, and say so, to each other.',
      hint: '',
    },
    {
      id: 'end_six_oclock',
      name: 'Six O’Clock',
      rarity: 'COMMON',
      minTurn: 16,
      requires: { flagsSet: ['gate_collapsed', 'came_out_of_the_collapse'] },
      condition:
        'The charge went off at six with the player still inside, and the System filed them out onto the car park floor. Who else came out depends on who was within reach when it went. Say who, plainly. This is the protocol working as designed, and nobody involved is a villain for it, which is the worst part.',
      epilogue:
        'The car park is sealed for a year and then reopened, and nobody parks on level B4. Baek writes the report herself and signs it in full. Somewhere in the ledger of a gate that no longer exists, a room is signed off in a hand nobody at the Bureau could read.',
      hint: '',
    },
    {
      id: 'end_hand_in_the_vest',
      name: 'Hand In the Vest',
      rarity: 'UNCOMMON',
      minTurn: 20,
      requires: { flagsSet: ['left_the_map', 'out_of_the_gate'] },
      condition:
        'The player got out and kept going: left the crew, the city, the class and the report behind. This is a coherent answer to a night like that and must not be written as cowardice or redeemed later. The person it costs most is whoever was counting on them at the depot.',
      epilogue:
        'The vest is folded on the depot sofa with the marker number facing up. Pyo puts it in a locker and does not padlock it. Jin texts every Sunday for three months, mostly about fridges, and then less, and then on the anniversary.',
      hint: '',
    },
    {
      id: 'end_every_crew',
      name: 'Every Crew in the District',
      rarity: 'RARE',
      minTurn: 40,
      requires: { flagsSet: ['class_went_public', 'crews_cleaned_it'] },
      condition:
        'The player told the night crews what they were, and the night crews came: two hundred E-ranks with mops into a relapsing gate under a guild tower, doing the job properly together. This is the union ending. Write it as logistics and solidarity, not as a superpower, because what saved the basement was everybody turning up.',
      epilogue:
        'The group chat gets a new name nobody admits to choosing. The Bureau starts paying crews by the room signed off rather than by the hour, after a meeting that runs eleven hours. The broadcast never mentions any of it, and for once nobody minds.',
      hint: '',
    },
    {
      id: 'end_the_caretaker',
      name: 'The Room Nobody Mapped',
      rarity: 'UNIQUE',
      minTurn: 45,
      requires: { flagsSet: ['found_the_ledger', 'closed_the_tower_gate', 'knows:how_to_close'] },
      condition:
        'The player read the last Custodian’s ledger, closed a gate the way she wrote it down, and walked out of the core instead of staying in it. This is the ending where the job passes on. Make it about Ma Deok-sun, about Baek and Pyo, and about the stool in the little room, and do not make anybody explain what it means.',
      epilogue:
        'There is a new name on the last page of the ledger, under hers. Pyo cuts the padlock on locker 12 and hangs the old broom inside it. Baek comes to the depot once, in the windbreaker, and drinks a cup of barley tea standing up, and nobody says anything about twenty years, and everybody hears it.',
      hint: 'There is a door on the stair that no raid map shows.',
    },
  ],
  opening:
    "The light at the top of the ramp turns red.\n\nThe way out just sealed. You’re on the wrong side of it, holding a mop.\n\n\"Hey. Cleaner.\"\n\nSeo Hae-won, the guild healer who stayed behind to fix your partner’s hand, is on her back in the ash. A stone pillar that wasn’t there a minute ago has her pinned at the knee.\n\nFar below, a bell rings. The ash around your boots starts to stir.\n\n\"Run,\" she says. \"You are E-rank and I am pinned. That is not a hard sum.\"\n\nA pale square of text opens in the air in front of you. Nobody else can see it.\n\n[Hidden class found: Custodian.]\n\n[Position vacant. Accept?]",
  openingPanel: {
    assetKey: 'story_cleanup_crew_e_rank/opening',
    alt: 'Seo Hae-won pinned under a stone pillar in grey ash, one hand raised, red light from the sealed gate above, and a pale square of floating text in the foreground.',
  },
  openingSuggestions: [
    "\"I’m not leaving you under there. What is that bell?\"",
    'I drop the mop, get my shoulder under the pillar and lift.',
    "I reach out and press the window. \"Accept.\"",
  ],
  publishedAt: '2026-11-22T00:00:00.000Z',
};

export const CLEANUP_CREW_E_RANK = StoryVersion.parse(raw);
