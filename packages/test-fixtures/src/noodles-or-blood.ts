import { StoryVersion } from '@plotbreak/contracts';

/**
 * "Noodles or Blood" — a delinquent dorm where the rent is paid in soup.
 *
 * Bible: `docs/story-bibles/new50/37_NOODLES_OR_BLOOD.md`. Slate #37 of 50,
 * fight-school hierarchy, male lean.
 *
 * Playable span: one week in East Hall, the oldest dormitory of a technical
 * college in a port town, from 21:40 on the Monday the player arrives to the
 * housing review on Friday at ten and the weekend after it. The rent is the
 * opener; the review is the spine; who holds the third floor after Daigo is
 * the finale. Everything after the end of term lives in the endings.
 *
 * The structural bet is that a fight story is better when fighting costs
 * something that is not health. Taking the stairs happens on a landing with a
 * dead camera, so it is off the record; a fight anywhere else goes in the
 * warden's incident book, and one more entry closes the floor. The authored
 * fight is therefore the *safe* one, and a brawl in the corridor is the
 * dangerous one, which is the opposite of what a player expects and is the
 * whole texture of the place.
 *
 * Daigo is not a boss to be beaten. He is a bully with a reason — the rent is
 * how the floor eats in the last week of the month — and he is failing the
 * written half of his certification, so he is looking for somebody to hand the
 * floor to. The antagonist is upstairs and polite.
 *
 * The system lives where production's storyteller can read it: hard canon,
 * quest items (the bowls, the food money, the grinder, the note, the tags, the
 * tab book), quest summaries, world events and the archetypes' starting
 * abilities. Resources, step notes and promises are for the engine and for
 * the next writer.
 *
 * Three invisible variables. Stamina is the one honest GOOD_HIGH, because
 * `resolveRest` refills those. Heat comes first among the descending pair on
 * purpose: public violence raises the first GOOD_LOW in array order, and a
 * fight in public in this building is exactly a step towards the floor
 * closing. The Warden's Office is first among the factions for the same
 * reason. Bruising is what the landing costs the body, and it heals.
 */

const raw = {
  id: 'sv_noodles_or_blood_1',
  storyId: 'story_noodles_or_blood',
  version: 1,
  title: 'Noodles or Blood',
  fantasyLabel: 'Feed the whole floor, or take the stairs.',
  hook: 'Your trade-college dorm has one rule for newcomers: buy noodles for the whole floor on your first night, or take the back stairs with the man who runs it.',
  premise:
    'You transferred to the technical college halfway through the year, and the only bed the housing office had left was 307, on the third floor of East Hall, the old dorm by the canal that everybody calls the Kettle.\n\n' +
    'The third floor has twenty-two people on it, one dead camera, and one rule. A newcomer pays rent on their first night: noodles for the whole floor, or a fight on the back-stairs landing with Daigo, who has run the floor for three years and is almost never told no to his face.\n\n' +
    'Rumi tells him no every day. She is the only one.\n\n' +
    'Bed 307 was empty because the last person in it was thrown out three weeks ago, when tools stolen from the college workshops turned up under his bunk. He said it was not him. Nobody listened.\n\n' +
    'Now the housing office is closing one floor of East Hall at the end of term, and on Friday it decides which. One more fight on the record could sink the third floor, and twenty-two people would lose the cheapest rent in town.\n\n' +
    'So you need to survive your first night, find out who really stole those tools, and decide what kind of floor this is going to be before somebody upstairs decides for you.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Martial arts', 'School', 'Comedy', 'Rivalry', 'Drama'],
  mechanicsChips: [
    'Pay, fight, or refuse',
    'Fights go on the record',
    'A floor that can close',
    'Somebody framed bed 307',
    'Run the floor yourself',
  ],
  contentDescriptors: ['FANTASY_VIOLENCE', 'MORAL_AMBIGUITY', 'ROMANCE'],
  intensity: 'MODERATE',
  creatorNote:
    'You can cook twenty-two bowls of noodles on turn one and spend the week as the floor’s favourite person. You can also take the stairs, refuse to his face, lie, or walk out of the building with your bag. Daigo is not waiting to be beaten. He is waiting to find out whether you are somebody he can hand this floor to.',
  openingObligations: [
    {
      what: 'Pay the third floor’s rent to Daigo before the front door locks at eleven: twenty-two bowls of noodles, or the back stairs.',
      withCharacterId: 'daigo',
      dueInMinutes: 80,
    },
  ],
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: true,
    allowsRomance: true,
    startingLocationId: 'common_room',
    startWorldMinute: 21 * 60 + 40,
    startingItems: [
      { itemId: 'room_key_307', qty: 1 },
      { itemId: 'food_money', qty: 1 },
    ],
    hardCanon: [
      'Everyone in this story is an adult. East Hall houses students of a post-secondary technical college, every one of them eighteen or older, and the player is a transfer student of at least nineteen. Daigo Hatanaka is twenty-two, Rumi Ogata twenty, Ken Ishiyama twenty-four, Bunta Iwai nineteen, Sota Mabuchi twenty-three, and Setsuko Fujii, the warden, fifty-eight. Shun Arai, the evicted last resident of 307, is twenty-one. The other residents of the third floor are all between eighteen and twenty-six.',
      'East Hall is the oldest dormitory of a technical college in a port town: four residential floors and a roof, a lobby with the warden’s office behind it, a shared kitchen on the ground floor, and a concrete back stairwell. Everybody calls it the Kettle because the boiler in the basement bangs all night. The college workshops are across the road and the canal runs along the side of the building.',
      'The third floor’s rule is three years old. A newcomer pays rent on their first night: noodles for every resident of the floor, twenty-two bowls, or a fight with Daigo on the back-stairs landing, which the floor calls taking the stairs. Daigo has never actually thrown anybody down the stairs. Nobody on the floor except Rumi knows that for certain.',
      'Taking the stairs has rules and Daigo enforces them: nothing to the face, nothing in your hands, and it stops the moment somebody is down. Four people have taken the stairs in three years. Fights in this story are shoves, holds, body blows and falls, quick and clumsy and never graphic: a bruise, a split lip, somebody winded on the concrete. Nobody uses a blade or a tool as a weapon. Anybody who picks one up has lost the floor.',
      'The camera above the back-stairs landing has been dead for two years because Rumi Ogata pulled its fuse. A fight on the landing is not recorded unless somebody reports it. A fight anywhere else in the building is seen, and goes in the warden’s incident book.',
      'The housing office is closing one floor of East Hall at the end of term and decides which on Friday at ten, at a review in the warden’s office. The third floor has two incidents on record this term and the fourth floor has none. A third incident will almost certainly close the third floor, and twenty-two people will lose the cheapest rent in town.',
      'Tools have been going missing from the college workshops for a year. Three weeks ago a stolen drill was found under the bunk in room 307 and its resident, Shun Arai, was evicted. Shun did not take it. Sota Mabuchi, head of the fourth floor and student assistant in the workshop tool room, steals the tools, keeps them in the padlocked shower block on the fourth floor, and sells them to a scrap dealer under the canal overpass on Wednesday nights. He planted the drill.',
      'A second stolen tool, a cordless grinder wrapped in a blue-striped fourth-floor towel, is still taped under the bunk frame in room 307 tonight. Shun left a folded note in the window frame that says: It wasn’t me. Check the towels.',
      'The noodle rent is how the third floor eats in the last week of every month, before the student stipend lands. Ken Ishiyama cooks it and keeps the tab. Daigo pays whatever the rent does not cover out of his own welding side jobs, and has never told anybody.',
      'Daigo has failed the written paper of his final welding certification twice. His resit is on Friday at nine. If he fails it he leaves the college at the end of term, and he is quietly looking for somebody to hold the third floor after him.',
      'Bunta Iwai, the player’s roommate in 307, tells Mabuchi what happens on the third floor every afternoon, because Mabuchi paid off his phone debt in October. He hates doing it.',
      'Romance is possible here, slow and earned, and goes no further than a kiss.',
    ],
    toneGuide:
      'Loud, fast and funny, and on the side of people who are broke. A delinquent-dorm comedy with a heart: threats are about face and mostly performed for an audience, food and money matter more than fists, and when a fight does happen it is quick, clumsy, and still hurts the next morning. ' +
      'Everybody talks like their trade. Nobody is a monster: Daigo is a bully with a reason, Rumi is right and a little pleased about it, Ken sells to both floors, the warden bends rules she believes in, and even Mabuchi is polite. ' +
      'Jokes land more often than speeches. Keep it physical and specific: steam off a pot, boots on a table, the bang of the boiler at two in the morning, a towel with a blue stripe where it should not be. ' +
      'The face at the top of a beat is Daigo’s or Rumi’s whenever one of them is in the scene.',
    proseStyle: 'webnovel',
    styleExamples: [
      "Daigo takes his boots off the table, one at a time.\n\n\"The stairs,\" he repeats. \"You sure?\"\n\nThe whole floor is in the corridor now. Somebody has opened the stairwell door and is holding it like an usher.\n\nHe walks past you onto the landing, turns round, and rolls his shoulders. Up close he smells of hot metal and cheap soap.\n\n\"Rules. Nothing to the face. Nothing in your hands. Somebody goes down, it's over.\" He glances up at the dead camera over the door. \"And nobody tells the warden.\"\n\nRumi, from the doorway: \"Daigo.\"\n\n\"I know,\" he says, without looking at her. \"Go on, Transfer. First one's free.\"",
      "Ken doesn't look up from the four pots.\n\n\"Twenty-two bowls. On your money.\" He tastes the broth off the back of a ladle and frowns at it like it said something rude. \"That's your whole week, chef. In soup.\"\n\nHe slides an apron across the counter.\n\n\"Or you chop, and I don't charge you for the onions.\" The ladle points at you. \"Water's already on. Decide before it boils.\"",
      "Rumi is sitting on the water tank with a soldering iron and a radio that only gets one station.\n\n\"He told you about the stairs.\" Not a question. \"He tells everyone about the stairs.\"\n\nShe blows on the solder.\n\n\"Four people have taken them in three years. Want to guess how many went down headfirst?\" She holds up a hand with nothing on it. \"So why does everybody still pay?\"",
    ],
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 11, agility: 11, mind: 11, presence: 11, resolve: 12, arcana: 8 },
  skills: [
    { id: 'brawling', name: 'Brawling', attribute: 'might', description: 'Shoving, holding and taking a hit on a landing exactly two people wide.' },
    { id: 'footwork', name: 'Footwork', attribute: 'agility', description: 'Stairs, fire doors, corridors after curfew, and not being where the swing lands.' },
    { id: 'cooking', name: 'Cooking', attribute: 'mind', description: 'Twenty-two bowls out of four working burners and a budget of nearly nothing.' },
    { id: 'shopwork', name: 'Shop Skills', attribute: 'mind', description: 'Your trade. Wiring, welding, engines: what is broken, and how to fix it with what is in the room.' },
    { id: 'nerve', name: 'Nerve', attribute: 'resolve', description: 'Saying no to somebody bigger, in front of everybody, and not taking it back afterwards.' },
    { id: 'front', name: 'Front', attribute: 'presence', description: 'Looking like you have done this before when you have not, and being believed.' },
    { id: 'street_sense', name: 'Street Sense', attribute: 'arcana', description: 'Knowing which corridor is about to go bad before it does, and who is lying about why.' },
  ],
  /**
   * Three, all invisible.
   *
   * Stamina is GOOD_HIGH because `resolveRest` restores those and a college
   * day genuinely runs out. Heat is first among the descending pair because
   * PUBLIC_VIOLENCE raises the first GOOD_LOW in array order, and a fight in
   * public here is a step towards the third floor closing. Bruising is the
   * landing's price on the body; it heals at its own pace and nothing else
   * touches it.
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
        'The player is running on nothing. They sway on the landing, miss the joke, agree to things to make a conversation end, and anybody on either floor who wanted to push them around picks tonight.',
      color: '#E9A23B',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Empty. The player misses the joke by a beat, agrees to things to make conversations stop, and loses track of who is standing behind them. Anybody who wanted to test the new resident picks now. Sleep, a bowl of something hot, or simply sitting down are the strongest moves available.',
        },
        {
          upTo: 60,
          behaviour:
            'The ordinary tiredness of a day of classes, a corridor full of people watching you, and a dinner of whatever was cheapest. Good for one more argument or one more errand, honest about not being good for both, and nobody needs to remark on it unless they are looking for an opening.',
        },
        {
          upTo: 100,
          behaviour:
            'Fed, rested and quick. The player can cook for twenty-two, take the stairs and still be funny at the end of it, hear what somebody means under what they are saying, and choose the moment instead of being chosen by it.',
        },
      ],
    },
    {
      id: 'heat',
      name: 'Heat',
      max: 100,
      start: 30,
      regenPerHour: -0.3,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'Nobody official is looking at the third floor at all. The warden does her rounds at eleven and goes back to her radio, and the landing belongs to the people who use it.',
      color: '#C8553D',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Nobody official is looking at the third floor. The warden walks the corridor once at eleven and goes back to the shipping forecast. The floor can be loud, the landing can be used, and the worst thing that happens to a raised voice is a knock on the door.',
        },
        {
          upTo: 55,
          behaviour:
            'The warden has noticed the third floor this week. She walks it twice a night instead of once, stands on the back-stairs landing longer than she needs to, and asks residents pleasant questions she already knows the answers to. Mabuchi starts smiling at people on the stairs.',
        },
        {
          upTo: 80,
          behaviour:
            'The incident book is open on her desk at the third floor’s page. Residents shush each other in the corridor, the floor turns on whoever brought this down on it, Daigo calls off the stairs, and anything that happens in public now gets written down by somebody who wants it written.',
        },
        {
          upTo: 100,
          behaviour:
            'One report from closure. The housing office has emailed, the warden is checking rooms, and Mabuchi has stopped bothering to hide that he is waiting. Every resident is working out where they will live next term, and some of them have already decided whose fault it is.',
        },
      ],
    },
    {
      id: 'bruising',
      name: 'Bruising',
      max: 100,
      start: 0,
      regenPerHour: -1.5,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'Unmarked. Nothing about the player says they have been on the landing, which is either a good sign or a sign they have not been tested yet.',
      color: '#6B5B95',
      bands: [
        {
          upTo: 20,
          behaviour:
            'Unmarked, or near enough. The player moves freely, sleeps fine, and nobody looking at them across the breakfast queue would guess they had been on the landing last night.',
        },
        {
          upTo: 50,
          behaviour:
            'A split lip, a stiff side, a bruise coming up purple on one forearm. Stairs are slow in the morning and sudden movement is a bad idea. Everybody at breakfast can see that something happened last night, including the warden, who says nothing yet.',
        },
        {
          upTo: 100,
          behaviour:
            'Properly sore. Ribs complain at every breath taken too fast, one eye is puffy, and the player is not winning a fight with anybody this week. People are careful around them, Ken puts extra in the bowl without comment, and the warden will want to know exactly how they fell.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'room_key_307',
      name: 'The 307 Key',
      tags: ['quest', 'personal'],
      questItem: true,
      droppable: false,
      description: 'A brass key on a plastic fob with 307 written on it in marker. Somebody has scratched the initials S.A. into the back of the fob, and somebody else has tried to scratch them out.',
      loreText: 'S.A. is Shun Arai, who had this key until three weeks ago. Room keys on the third floor are not changed between residents; the warden says the budget goes on the boiler.',
      icon: 'key',
    },
    {
      id: 'food_money',
      name: 'Your Food Money',
      tags: ['quest', 'personal'],
      questItem: true,
      description: 'An envelope with exactly enough cash in it to eat until the stipend lands. At Ken’s prices it is also exactly twenty-two bowls of noodles.',
      loreText: 'There is nothing after this envelope until the stipend, and the stipend is due next week. Paying the rent with it means a week of rice.',
      icon: 'coin',
    },
    {
      id: 'noodle_bowls',
      name: 'The Tower of Bowls',
      tags: ['quest', 'home'],
      questItem: true,
      description: 'Twenty-two empty plastic noodle bowls stacked beside Daigo’s boots on the common-room table, one for every resident of the third floor, each with a name written on the bottom in marker.',
      loreText: 'The bottom bowl says DAIGO. The top one is blank, and it is yours.',
      icon: 'bowl',
    },
    {
      id: 'the_grinder',
      name: 'The Grinder Under the Bunk',
      tags: ['quest', 'evidence'],
      questItem: true,
      description: 'A cordless angle grinder from the college welding bay, taped under the slats of the bottom bunk in 307 and wrapped in a towel with a blue stripe down it. The workshop inventory tag has been prised off and the rivet holes are still bright.',
      loreText: 'Blue-striped towels are fourth-floor laundry; the third floor’s have a red stripe. The tool room lists this grinder as signed out for repair and never returned, and the signature on the form is very neat.',
      icon: 'tools',
    },
    {
      id: 'window_note',
      name: 'Shun’s Note',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'A square of lined paper folded small and pushed into the gap in the 307 window frame. In blunt pencil: It wasn’t me. Check the towels.',
      loreText: 'Written the night Shun Arai was evicted, while the warden waited in the corridor for him to pack. He took everything else.',
      icon: 'letter',
    },
    {
      id: 'ken_tab_book',
      name: 'Ken’s Tab Book',
      tags: ['quest', 'document'],
      questItem: true,
      skillModifiers: { street_sense: 1 },
      description: 'A greasy hardback notebook kept behind the rice cookers. Every resident of East Hall has a line in it: what they owe, what they paid, and what somebody else paid for them.',
      loreText: 'Every month for two years there is a column headed D., and the sums in it are exactly what the noodle rent did not cover. Near the back are eight entries for kitchen kit bought from S.M. at a tenth of the shop price.',
      icon: 'book',
    },
    {
      id: 'instant_noodles',
      name: 'A Crate of Instant Noodles',
      tags: ['food'],
      stackable: true,
      maxStack: 6,
      consumable: { resourceId: 'stamina', amount: 10, consumesItem: true },
      description: 'Cup noodles, the cheapest brand the shop by the canal sells. Ken stocks them and refuses to call them food.',
      loreText: 'Twenty-two of these would technically pay the rent. Somebody tried it once, two years ago, and the floor still brings it up.',
      icon: 'food',
    },
    {
      id: 'incident_book',
      name: 'The Incident Book',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'A thick cloth-covered ledger on the warden’s desk, open at this term. The third floor’s page has two entries in tidy capitals. The fourth floor’s page is blank.',
      loreText: 'Three entries on one floor in one term is the number the housing office uses. Shun Arai’s eviction is the second of the third floor’s two.',
      icon: 'book',
    },
    {
      id: 'tool_tags',
      name: 'A Fistful of Inventory Tags',
      tags: ['quest', 'evidence'],
      questItem: true,
      description: 'Nine small aluminium tags, each stamped with a workshop inventory number, prised off their tools and pushed down the drain of the fourth-floor dry showers.',
      loreText: 'One of the numbers matches the grinder under the bunk in 307. Another matches the drill that got Shun Arai evicted.',
      icon: 'tag',
    },
    {
      id: 'daigo_results_slip',
      name: 'Daigo’s Results Slip',
      tags: ['quest', 'document', 'personal'],
      questItem: true,
      description: 'A college results slip folded small enough to vanish, wedged under the brick that props the roof door. Practical: distinction. Written paper: fail. Resit: Friday, nine o’clock.',
      loreText: 'It is the second slip like this. The first is in a bin somewhere, folded exactly the same way.',
      icon: 'papers',
    },
    {
      id: 'knife_roll',
      name: 'Your Knife Roll',
      tags: ['personal', 'tool'],
      skillModifiers: { cooking: 1 },
      description: 'Canvas, three good knives and one bad one you keep for opening boxes.',
      loreText: 'Ken will notice it within ten seconds of you walking into his kitchen, and will decide what he thinks of you from the bad knife.',
      icon: 'knife',
    },
    {
      id: 'multimeter',
      name: 'Your Multimeter',
      tags: ['personal', 'tool'],
      skillModifiers: { shopwork: 1 },
      description: 'A yellow multimeter with a cracked case and a probe you have repaired twice.',
      loreText: 'Rumi has the same model, and she has repaired hers three times.',
      icon: 'tools',
    },
    {
      id: 'work_gloves',
      name: 'Your Rigger’s Gloves',
      tags: ['personal', 'tool'],
      skillModifiers: { shopwork: 1 },
      description: 'Heavy leather rigger’s gloves, stiff at the knuckles, from a year of carrying steel up scaffolding.',
      loreText: 'Daigo will tell you to take them off before the landing. Nothing in your hands means nothing on them either.',
      icon: 'gloves',
    },
    {
      id: 'scooter_key',
      name: 'Your Scooter Key',
      tags: ['personal'],
      skillModifiers: { footwork: 1 },
      description: 'The key to a secondhand scooter chained up by the canal, which starts on the third try and gets you anywhere in town in ten minutes.',
      loreText: 'The front door locks at eleven. The scooter does not care.',
      icon: 'key',
    },
  ],
  abilities: [
    {
      id: 'cook_for_the_floor',
      name: 'Cook for the Floor',
      tags: ['utility'],
      description: 'Feed a lot of people out of very little: buy it from Ken, cook it yourself, or talk your way into his kitchen.',
      affordances: ['cook', 'make noodles', 'pay the rent', 'feed the floor', 'buy noodles', 'pay in noodles', 'make dinner', 'go to the kitchen', 'cook for everyone'],
      costs: [{ resourceId: 'stamina', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'cooking', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'take_the_stairs',
      name: 'Take the Stairs',
      tags: ['combat'],
      description: 'Settle it on the back-stairs landing, by the landing’s rules: nothing to the face, nothing in your hands, over when somebody is down.',
      affordances: ['take the stairs', 'the stairs', 'square up', 'step onto the landing', 'settle it on the landing', 'take him on', 'fight him on the stairs'],
      costs: [
        { resourceId: 'stamina', amount: 12 },
        { resourceId: 'bruising', amount: 10 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'might', skillId: 'brawling', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'stand_your_ground',
      name: 'Stand Your Ground',
      tags: ['social'],
      description: 'Say no to somebody bigger, in front of everybody, and do not move while they decide what to do about it.',
      affordances: ['refuse', 'say no', 'stand my ground', 'not paying', 'stare him down', 'hold his eye', 'tell him no', 'stand up to him'],
      costs: [{ resourceId: 'stamina', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'nerve', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'talk_big',
      name: 'Talk Big',
      tags: ['social'],
      description: 'Bluff, boast or lie your way through it, and hope nobody on the floor checks.',
      affordances: ['bluff', 'lie', 'pretend', 'act tough', 'talk my way out', 'make something up', 'boast', 'name drop', 'act like I know'],
      costs: [{ resourceId: 'stamina', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'front', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'read_the_floor',
      name: 'Read the Floor',
      tags: ['sight'],
      description: 'Watch who looks at whom, who goes quiet, and what is out of place, before you say anything.',
      affordances: ['look around', 'watch', 'read the room', 'notice', 'listen', 'search', 'check under the bunk', 'look closer', 'keep my head down'],
      costs: [{ resourceId: 'stamina', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'arcana', skillId: 'street_sense', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'fix_it',
      name: 'Fix It',
      tags: ['utility'],
      description: 'Use your trade on whatever in this building is broken: a burner, a lock, a fuse box, a camera.',
      affordances: ['fix', 'repair', 'rewire', 'weld', 'patch it', 'get it working', 'fix the burner', 'fix the camera', 'pick the lock'],
      costs: [{ resourceId: 'stamina', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'shopwork', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'slip_away',
      name: 'Slip Away',
      tags: ['movement'],
      description: 'Get out of a room, a corridor or the building without anybody stopping you, including after curfew.',
      affordances: ['sneak out', 'slip away', 'walk away', 'duck out', 'go out the fire door', 'leave quietly', 'get out of here', 'climb out'],
      costs: [
        { resourceId: 'stamina', amount: 6 },
        { resourceId: 'heat', amount: 6 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: { attribute: 'agility', skillId: 'footwork', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'have_their_back',
      name: 'Have Their Back',
      tags: ['defensive'],
      description: 'Step in for somebody else, in public, and take whatever was coming for them.',
      affordances: ['step in', 'protect', 'stand between them', 'cover for', 'back her up', 'back him up', 'take the blame', 'stand next to her'],
      costs: [
        { resourceId: 'stamina', amount: 8 },
        { resourceId: 'heat', amount: 5 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'nerve', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'sit_down_and_eat',
      name: 'Eat With the Floor',
      tags: ['social'],
      description: 'Sit down at the long table with whoever is there, eat what is going, and listen.',
      affordances: ['sit down', 'eat with them', 'share', 'hang out', 'join them', 'have a bowl', 'stay and talk', 'sit with them'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'walk_them_through',
      name: 'Walk Them Through It',
      tags: ['utility'],
      description: 'Sit with somebody and a problem they cannot get through alone, a page of questions or a wiring diagram, until they can.',
      affordances: ['help him study', 'quiz him', 'read it to him', 'teach', 'explain it', 'go through the questions', 'study together', 'tutor'],
      costs: [{ resourceId: 'stamina', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'shopwork', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'lay_it_out',
      name: 'Lay It Out',
      tags: ['social'],
      description: 'Put what you found on the table in front of somebody with the power to act on it, and say plainly what it means.',
      affordances: ['show her', 'show the proof', 'report it', 'tell the warden', 'hand it over', 'lay it out', 'put it on the desk', 'accuse him'],
      costs: [{ resourceId: 'stamina', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'nerve', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'call_the_floor',
      name: 'Call the Floor',
      tags: ['social'],
      description: 'Speak for the whole third floor, and have twenty-two people get up and follow.',
      affordances: ['call the floor', 'rally the floor', 'everybody up', 'give the order', 'speak for the floor', 'gather everyone', 'third floor, with me'],
      costs: [
        { resourceId: 'stamina', amount: 12 },
        { resourceId: 'heat', amount: 8 },
      ],
      cooldownMinutes: 0,
      targetRule: 'AREA',
      check: { attribute: 'presence', skillId: 'front', baseDc: 15 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['floor_follows_you'],
        lockedCopy: 'The floor does not answer to you yet. You can shout, and twenty-two people will look at you, and then at Daigo.',
      },
    },
  ],
  locations: [
    {
      id: 'common_room',
      name: 'The Third-Floor Common Room',
      shortName: 'Common Room',
      description:
        'A long room at the end of the third-floor corridor: a table nobody eats at properly, a television that only gets the weather, a noticeboard of floor rules in six different handwritings, and one plastic chair at the head of the table that nobody but Daigo sits in. The doors of 301 to 312 open off the corridor outside, and every one of them is propped open, because that is rule five.',
      artDirection:
        'Shabby dormitory common room at night, a long scuffed table, a plastic chair at its head, a stack of empty noodle bowls, a buzzing fluorescent tube, a corridor of propped-open doors beyond with residents leaning out. Green-white light, warm steam, loud and crowded.',
      connections: [
        { to: 'room_307', travelMinutes: 1, label: 'Down the corridor to 307' },
        { to: 'back_stairs', travelMinutes: 1, label: 'The stairwell door' },
        { to: 'lobby', travelMinutes: 2, label: 'Down the front stairs' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [
        { itemId: 'noodle_bowls', qty: 1, ownerId: 'daigo', aka: ['bowls', 'the bowls', 'the stack of bowls', 'empty bowls'] },
      ],
    },
    {
      id: 'room_307',
      name: 'Room 307',
      shortName: '307',
      description:
        'Two bunks, two desks, one window that sticks, and a roommate’s half of the room already full of engine parts and snack wrappers. The bottom bunk is yours. The mattress is new. The frame under it is the one Shun Arai slept on until three weeks ago, and something is taped under its slats.',
      artDirection:
        'Cramped two-person dorm room at night, metal bunk beds, one side cluttered with engine parts and posters, a bare mattress on the bottom bunk, a sticking window with a folded scrap of paper in the frame, a desk lamp. Close, lived-in, slightly suspicious.',
      connections: [{ to: 'common_room', travelMinutes: 1, label: 'Back up the corridor' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 0 },
      takeableItems: [
        { itemId: 'the_grinder', qty: 1, ownerId: null, aka: ['grinder', 'the grinder', 'the tool under the bunk', 'the towel bundle'] },
        { itemId: 'window_note', qty: 1, ownerId: null, aka: ['note', 'the note', 'the folded note', 'the paper in the window'] },
      ],
    },
    {
      id: 'back_stairs',
      name: 'The Back Stairs',
      shortName: 'The Stairs',
      description:
        'A concrete stairwell at the back of the building that smells of rust and floor polish. Between the third and fourth floors there is a landing exactly wide enough for two people to have a disagreement, and above its door a camera whose red light has been off for two years. Up leads to the fourth floor and the roof; down leads to a fire door onto the canal.',
      artDirection:
        'Narrow concrete back stairwell at night, a small landing between flights, a dead security camera above a fire door, scuffed handrails, a single caged bulb, the shadow of somebody waiting on the steps above. Cold, echoing, tense.',
      connections: [
        { to: 'common_room', travelMinutes: 1, label: 'Back onto the third floor' },
        { to: 'fourth_floor', travelMinutes: 1, label: 'Up to the fourth floor' },
        { to: 'the_roof', travelMinutes: 2, label: 'All the way up to the roof door' },
        { to: 'canal_lane', travelMinutes: 3, label: 'Down and out through the fire door' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 0 },
      takeableItems: [],
    },
    {
      id: 'fourth_floor',
      name: 'The Fourth Floor',
      shortName: 'Fourth Floor',
      description:
        'The same corridor as the third, only cleaner and quieter, with blue-striped towels drying on every door handle and a desk chair at the top of the stairs where somebody is always sitting. At the far end the old shower block has a new padlock on it, and a humming sound comes from behind the door.',
      artDirection:
        'Tidy, quiet dormitory corridor at night, blue-striped towels hanging on door handles, a desk chair at the top of a stairwell, a padlocked door at the far end with light under it. Cool blue light, too neat, watchful.',
      connections: [
        { to: 'back_stairs', travelMinutes: 1, label: 'Back down the stairs' },
        { to: 'dry_showers', travelMinutes: 1, lockedByFlag: 'knows:the_showers', label: 'The padlocked shower block' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 1 },
      takeableItems: [],
    },
    {
      id: 'dry_showers',
      name: 'The Dry Showers',
      shortName: 'Showers',
      description:
        'A shower block shut for repairs two years ago and never repaired. The water is off. The power is not: a charging strip runs along the tiles, four cordless tools sit on it with their lights on, and under the benches there are sports bags with the zips done up.',
      artDirection:
        'Disused tiled shower block, water off, cracked tiles, a power strip along the wall with cordless tools charging, green indicator lights, sports bags under a bench, blue-striped towels folded on a shelf. Damp, secret, lit by small green lights.',
      connections: [{ to: 'fourth_floor', travelMinutes: 1, label: 'Back out to the corridor' }],
      discoveredByDefault: false,
      mapPosition: { x: 2, y: 1 },
      takeableItems: [
        { itemId: 'tool_tags', qty: 1, ownerId: 'mabuchi', aka: ['tags', 'inventory tags', 'the metal tags', 'tool tags'] },
      ],
    },
    {
      id: 'the_roof',
      name: 'The Roof',
      shortName: 'Roof',
      description:
        'Water tanks, laundry lines, a broken plastic chair, and the whole port spread out below: cranes, container stacks, the canal, and the lit windows of the college workshops across the road. The roof door is supposed to be locked. It has a brick in it.',
      artDirection:
        'Dormitory rooftop at night, water tanks, laundry lines, a broken plastic chair, a propped door, harbour cranes and container stacks lit up beyond, the glow of a port town. Wide, windy, the one quiet place in the building.',
      connections: [{ to: 'back_stairs', travelMinutes: 2, label: 'Back down the stairs' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 2 },
      takeableItems: [
        { itemId: 'daigo_results_slip', qty: 1, ownerId: 'daigo', aka: ['slip', 'the results slip', 'the exam slip', 'his results'] },
      ],
    },
    {
      id: 'lobby',
      name: 'The Lobby',
      shortName: 'Lobby',
      description:
        'Mailboxes, a vending machine that keeps coins, a noticeboard where the housing office pins things nobody wants to read, and the warden’s window with a curfew clock behind it. The front door locks at eleven and the lobby lights go down to one bulb.',
      artDirection:
        'Old dormitory lobby, rows of metal mailboxes, a vending machine, a cluttered noticeboard, a small lit office window with a wall clock behind it, glass front doors onto a dark street. Fluorescent, institutional, slightly shabby.',
      connections: [
        { to: 'common_room', travelMinutes: 2, label: 'Up the front stairs to the third floor' },
        { to: 'dorm_kitchen', travelMinutes: 1, label: 'Through to the kitchen' },
        { to: 'warden_office', travelMinutes: 1, label: 'Knock on the warden’s door' },
        { to: 'canal_lane', travelMinutes: 1, label: 'Out the front door' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: -1 },
      takeableItems: [],
    },
    {
      id: 'dorm_kitchen',
      name: 'The Ground-Floor Kitchen',
      shortName: 'Kitchen',
      description:
        'Six burners, of which four work, two rice cookers, a fridge with every shelf labelled by floor, and Ken’s corner, where the good knives are and nobody else is allowed. It smells of broth from five in the afternoon until midnight.',
      artDirection:
        'Busy shared dormitory kitchen at night, a row of gas burners with big steaming pots, two rice cookers, a labelled fridge, a counter with a chopping board and a greasy notebook, a man in a bandana at the stove. Warm, steamy, orange light.',
      connections: [{ to: 'lobby', travelMinutes: 1, label: 'Back out to the lobby' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: -1 },
      takeableItems: [
        { itemId: 'ken_tab_book', qty: 1, ownerId: 'ken', aka: ['tab book', 'the tab book', 'kens book', 'the tab'] },
        { itemId: 'instant_noodles', qty: 6, ownerId: 'ken', aka: ['instant noodles', 'cup noodles', 'the crate', 'a cup of noodles'] },
      ],
    },
    {
      id: 'warden_office',
      name: 'The Warden’s Office',
      shortName: 'Office',
      description:
        'A small office behind the lobby window, with a kettle, a radio tuned to the shipping forecast, a board of hooks with every spare key in the building on it, and a thick cloth-covered ledger open on the desk. A door at the back leads to the warden’s own two rooms.',
      artDirection:
        'Small cluttered warden’s office at night, an old radio, a kettle and two mugs, a wall of key hooks, a thick ledger open on a desk under a lamp, a nautical chart pinned to the wall. Warm lamp light, orderly, a little stern.',
      connections: [{ to: 'lobby', travelMinutes: 1, label: 'Back out to the lobby' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: -2 },
      takeableItems: [
        { itemId: 'incident_book', qty: 1, ownerId: 'fujii', aka: ['incident book', 'the incident book', 'the ledger', 'the warden’s book'] },
      ],
    },
    {
      id: 'canal_lane',
      name: 'The Canal Lane',
      shortName: 'The Canal',
      description:
        'A strip of cracked pavement between East Hall and the canal, lit by one streetlamp and by Ken’s noodle cart under the bridge from half past eleven. The college workshops are across the road; the motorway overpass and the scrapyards are a ten-minute walk the other way.',
      artDirection:
        'Night canal-side lane beside an old dormitory, one streetlamp, a small noodle cart with a red lantern under a bridge, the dark water, cranes and a motorway overpass in the distance. Damp, lamplit, quietly cinematic.',
      connections: [
        { to: 'lobby', travelMinutes: 1, label: 'Back in the front door' },
        { to: 'back_stairs', travelMinutes: 3, label: 'In through the fire door' },
        { to: 'workshops', travelMinutes: 5, label: 'Across the road to the workshops' },
        { to: 'scrapyard', travelMinutes: 10, lockedByFlag: 'knows:the_buyer', label: 'Along the canal to the overpass' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: -3 },
      takeableItems: [],
    },
    {
      id: 'workshops',
      name: 'The College Workshops',
      shortName: 'Workshops',
      description:
        'A long brick block across the road: the welding bay, the engine shop, the electrical lab, the training kitchen, and the tool room in the middle, where every tool is signed in and out on a form by a student assistant with very neat handwriting.',
      artDirection:
        'Technical college workshop block, a welding bay with sparks behind a screen, engine stands, an electrical lab bench, a tool-room counter with a clipboard and shelves of power tools. Industrial, bright, noisy.',
      connections: [{ to: 'canal_lane', travelMinutes: 5, label: 'Back across the road' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: -3 },
      takeableItems: [],
    },
    {
      id: 'scrapyard',
      name: 'The Yard Under the Overpass',
      shortName: 'The Yard',
      description:
        'A scrap dealer’s yard under the motorway overpass: chain-link, floodlights, a dog that does not bark, and a portable cabin with a ledger in it. On Wednesday nights a car waits at the gate with its boot open.',
      artDirection:
        'Scrapyard under a concrete motorway overpass at night, chain-link fence, floodlights, piles of scrap metal, a portable cabin with a lit window, a car at the gate with its boot open. Hard light, deep shadow.',
      connections: [{ to: 'canal_lane', travelMinutes: 10, label: 'Back along the canal' }],
      discoveredByDefault: false,
      mapPosition: { x: 1, y: -3 },
      takeableItems: [],
    },
  ],
  factions: [
    {
      id: 'faction_office',
      name: 'The Warden’s Office',
      description:
        'Setsuko Fujii and the college housing office behind her. They decide what goes in the incident book, who keeps a room, and which floor of East Hall closes at the end of term.',
      startingReputation: 20,
      ranks: [
        { atReputation: 0, label: 'In the book' },
        { atReputation: 30, label: 'Resident' },
        { atReputation: 55, label: 'Trusted with a key' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_third',
      name: 'The Third Floor',
      description:
        'Twenty-two residents, most of them trade students living on a stipend, who eat together in the last week of the month and settle things on the back stairs. Daigo runs it. Rumi argues with it. It is loud, broke and loyal, and it does not forgive anybody who brings the warden down on it.',
      startingReputation: 0,
      ranks: [
        { atReputation: 0, label: 'Transfer' },
        { atReputation: 25, label: 'On the floor' },
        { atReputation: 45, label: 'Speaks for the floor' },
      ],
      allies: [],
      enemies: ['faction_fourth'],
    },
    {
      id: 'faction_fourth',
      name: 'The Fourth Floor',
      description:
        'Mabuchi’s floor: quiet, tidy, a clean record, and a lot of favours owed upward. Its residents do not fight, do not get written up, and do not ask where the cheap kitchen kit and the spare phone chargers come from.',
      startingReputation: 0,
      ranks: [
        { atReputation: 0, label: 'Downstairs' },
        { atReputation: 25, label: 'Useful' },
        { atReputation: 50, label: 'One of his' },
      ],
      allies: [],
      enemies: ['faction_third'],
    },
  ],
  characters: [
    {
      id: 'daigo',
      name: 'Daigo Hatanaka',
      calledName: 'Daigo',
      role: 'Head of the third floor for three years, a final-year welding student, and the man who set your rent',
      cardBlurb:
        'He wants twenty-two bowls of noodles from you tonight or you on the back stairs, he is almost never told no to his face, and he is watching you harder than a man collecting rent needs to.',
      pronouns: 'he/him',
      publicTraits: ['Loud on purpose', 'Keeps his word to the letter', 'Eats standing up'],
      hiddenDrives: [
        'He is failing the written half of his welding certification and will be gone at the end of term unless he passes the resit, so he is looking for somebody to hand the floor to before Mabuchi takes it',
        'He wants one person on the floor to find out what the rent is for and still choose to stand next to him',
      ],
      values: [
        'A floor where nobody goes hungry in the last week of the month',
        'Saying a thing once, in front of everybody, and then doing it',
      ],
      fears: [
        'Being exactly what the fourth floor says he is',
        'Leaving the floor to somebody who will collect the rent for the wrong reasons',
      ],
      socialStyle:
        'Talks to the whole room even when he is talking to you. Sits with his boots up, stands up only when it matters, and makes every demand sound like a law that was already there before you arrived.',
      boundaries: [
        'Will not hit anybody in the face, anybody who is down, or anybody who has not agreed to the stairs',
        'Will not let anybody on the floor go to the warden about another resident, including about him',
        'Will not explain where the rent goes. He would rather be called a thief than a charity',
      ],
      goals: [
        'Get the new resident paid in tonight, one way or the other, in front of the floor',
        'Keep the third floor off the record until Friday',
        'Find somebody who can hold the floor after him',
      ],
      secrets: [
        {
          id: 'daigo_the_paper',
          fact: 'He has failed the written paper of his welding certification twice. He can lay a weld any instructor would frame and cannot get through a page of technical questions in the time allowed. The resit is Friday at nine, and if he fails it he leaves the college at the end of term.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'On the roof after midnight, if the player has earned his respect and does not bring up the stairs.',
        },
        {
          id: 'daigo_the_stairs',
          fact: 'Four people have taken the stairs in three years. He has never thrown anybody down them. Each one ended on the landing, with him helping them up and the floor told a better story afterwards.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Rumi knows. He admits it himself only to somebody who has already taken the stairs with him.',
        },
        {
          id: 'daigo_the_rent',
          fact: 'The noodle rent is how the floor eats in the last week of every month. Ken keeps the tab. Daigo pays whatever the rent does not cover out of welding side jobs, and has done for two years.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Ken’s tab book shows it in a column marked D. Daigo will never say it first.',
        },
      ],
      speechStyle:
        'Short, loud sentences made of floor law. Calls the player Transfer until they have earned a name. Ends a demand on a single word, Pick or Well, and goes quiet and plain only on the roof, where nobody else can hear him.',
      topics: ['the rent', 'the stairs', 'the third floor', 'the fourth floor', 'Rumi', 'welding', 'Friday'],
      voiceSamples: [
        'Rent’s due, Transfer. Noodles or the stairs. Pick.',
        'Landing rules. Nothing to the face, nothing in your hands, and it ends when somebody’s down. Break one and you answer to me.',
        'Twenty-two people on this floor. Nine of them ate plain rice on Tuesday. So yeah. Rent’s due.',
        'I can lay a weld you couldn’t find with a magnet. Put a page of questions in front of me and it might as well be on fire.',
      ],
      appearance:
        'An adult man, broad and tall, close-cropped black hair, a pale scar through his left eyebrow, a scorched brown leather welding jacket worn open over a white T-shirt, heavy steel-toed boots.',
      visualHook: 'A scorched leather welding jacket with a burn hole the shape of a thumbprint on the left sleeve.',
      silhouette: 'Leaning back in a plastic chair with his boots up on a table, arms folded, chin lifted.',
      artSeed: 'nob-daigo-01',
      portrait: null,
      expressions: ['neutral', 'grinning', 'stern', 'angry', 'worried'],
      schedule: [
        { startMinute: 0, endMinute: 60, locationId: 'the_roof', activity: 'on the roof with a can of coffee, looking at the cranes' },
        { startMinute: 60, endMinute: 420, locationId: 'common_room', activity: 'in bed in 301 with the door propped open, because that is rule five' },
        { startMinute: 420, endMinute: 480, locationId: 'dorm_kitchen', activity: 'eating breakfast standing up, in Ken’s way' },
        { startMinute: 480, endMinute: 1020, locationId: 'workshops', activity: 'in the welding bay, the only place he is ever quiet' },
        { startMinute: 1020, endMinute: 1140, locationId: 'canal_lane', activity: 'at the canal, paying Ken for something nobody saw him order' },
        { startMinute: 1140, endMinute: 1440, locationId: 'common_room', activity: 'boots on the table, holding court' },
      ],
      homeLocationId: 'common_room',
      knowledgeScope: ['the_third_floor', 'the_stairs', 'the_rent', 'shun_arai', 'mabuchi', 'east_hall', 'welding'],
      startingRelationship: { trust: 10, affection: 5, respect: 15, fear: 0, rivalry: 20 },
      gates: [
        {
          id: 'daigo_uses_your_name',
          label: 'He stops calling you Transfer',
          kind: 'TRUST',
          requires: { respect: 40 },
        },
        {
          id: 'daigo_on_the_roof',
          label: 'He tells you about Friday',
          kind: 'TRUST',
          requires: { trust: 45, respect: 50, flagsSet: ['knows:the_floor'] },
        },
        {
          id: 'daigo_asks_you',
          label: 'He asks you to hold the floor',
          kind: 'ALLIANCE',
          requires: { trust: 60, respect: 60, flagsSet: ['knows:daigo_leaving'] },
        },
      ],
      attributes: { might: 16, agility: 11, mind: 10, presence: 14, resolve: 14, arcana: 7 },
      companion: null,
      scouting: null,
      combatant: { health: 60, defenseDc: 15, damage: 9, tags: ['brawler', 'third-floor'] },
    },
    {
      id: 'rumi',
      name: 'Rumi Ogata',
      calledName: 'Rumi',
      role: 'Second-year electrical student in 309, and the only person on the third floor who has never paid the rent',
      cardBlurb:
        'She tells Daigo no every single day and he lets her, she will tell you that you do not have to pay either, and she has not yet said what she wants you to do instead.',
      pronouns: 'she/her',
      publicTraits: ['Says no first and explains later', 'Fixes things that were not broken', 'Never sits with her back to a door'],
      hiddenDrives: [
        'She wants the rent gone and Daigo kept, and has not worked out how to have both',
        'She grew up two streets from Daigo, he got her the room in 309 when her last place fell through, and she has never forgiven him for being kind about it',
      ],
      values: ['A floor that votes instead of a floor that obeys', 'Fixing a thing properly or not touching it'],
      fears: ['That the rent works and she is wrong about it', 'Owing anybody anything she cannot pay back in work'],
      socialStyle:
        'Leans in doorways. Interrupts Daigo in public in a level voice and never raises it. Explains people the way she explains a circuit: where the power comes from, and where it goes.',
      boundaries: [
        'Will not pay the rent, and will not let anybody pay it for her',
        'Will not stand and watch a fight on the stairs. She walks to the warden or she walks in between',
        'Will not be the reason Daigo gets thrown out, whatever she says about him in public',
      ],
      goals: [
        'Get the new resident through the first night without paying and without the stairs',
        'Prove the floor can run on a rota instead of a rent',
        'Find out why the fourth floor is drawing power from a shower block nobody uses',
      ],
      secrets: [
        {
          id: 'rumi_the_fuse',
          fact: 'She pulled the fuse on the back-stairs camera two years ago, after its footage got a first-year evicted for a shove. She tells herself it was to protect people from the camera. It is also what made the stairs possible.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She admits it on the roof to somebody who asks her why the camera is dead and does not assume it was Daigo.',
        },
        {
          id: 'rumi_the_readings',
          fact: 'The fourth-floor dry showers draw current all night through a circuit that should be dead. She has the readings in a notebook and has shown nobody, because she cannot prove what is drawing it.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She shares the readings with anybody who has seen a blue-striped towel where it should not be and tells her where.',
        },
      ],
      speechStyle:
        'Level, precise and unhurried. Uses electrical words for people: load, short, earth, live, fuse. Says No as a complete sentence and then waits for you to argue, which she enjoys more than she lets on.',
      topics: ['the rent', 'Daigo', 'the camera', 'the fourth floor', 'the dry showers', 'wiring', 'a rota'],
      voiceSamples: [
        'You don’t have to answer him. Nobody does. Everybody just does.',
        'No. That’s the whole answer. Argue with it if you like, I’ve got time.',
        'He isn’t a short circuit, he’s a fuse. He blows so the rest of the building doesn’t.',
        'Something upstairs pulls current all night through a circuit that should be dead. Lights don’t draw like that. Chargers do.',
      ],
      appearance:
        'An adult woman, slim and straight-backed, shoulder-length black hair tied back with a twist of electrical tape, sharp dark eyes, an oversized grey work shirt with the sleeves rolled, a small screwdriver tucked behind one ear.',
      visualHook: 'A small screwdriver tucked behind her right ear like a pencil, always.',
      silhouette: 'Shoulder against a doorframe, arms folded, head tilted, one boot crossed over the other.',
      artSeed: 'nob-rumi-01',
      portrait: null,
      expressions: ['neutral', 'unimpressed', 'amused', 'worried', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'common_room', activity: 'in bed in 309, door propped, a radio on very low' },
        { startMinute: 420, endMinute: 480, locationId: 'lobby', activity: 'arguing with the vending machine about a coin' },
        { startMinute: 480, endMinute: 960, locationId: 'workshops', activity: 'in the electrical lab, rewiring something that was fine' },
        { startMinute: 960, endMinute: 1140, locationId: 'the_roof', activity: 'on the water tank with a soldering iron and a radio that gets one station' },
        { startMinute: 1140, endMinute: 1260, locationId: 'dorm_kitchen', activity: 'eating Ken’s leftovers and paying for them in fixed appliances' },
        { startMinute: 1260, endMinute: 1440, locationId: 'common_room', activity: 'in the doorway of 309, watching Daigo like a fuse she has not pulled yet' },
      ],
      homeLocationId: 'common_room',
      knowledgeScope: ['the_third_floor', 'the_stairs', 'the_camera', 'daigo', 'the_dry_showers', 'east_hall'],
      startingRelationship: { trust: 25, affection: 15, respect: 20, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'rumi_shows_the_readings',
          label: 'She shows you her meter readings',
          kind: 'TRUST',
          requires: { trust: 45, flagsSet: ['knows:the_towels'] },
        },
        {
          id: 'rumi_tells_you_about_the_fuse',
          label: 'She tells you who killed the camera',
          kind: 'TRUST',
          requires: { trust: 55 },
        },
        {
          id: 'rumi_stays_on_the_roof',
          label: 'She stays on the roof after the radio goes off',
          kind: 'ROMANCE',
          requires: { trust: 60, affection: 70 },
        },
      ],
      attributes: { might: 9, agility: 13, mind: 15, presence: 12, resolve: 15, arcana: 8 },
      companion: null,
      scouting: null,
      combatant: { health: 32, defenseDc: 13, damage: 4, tags: ['civilian', 'third-floor'] },
    },
    {
      id: 'ken',
      name: 'Ken Ishiyama',
      calledName: 'Ken',
      role: 'Final-year culinary student, keeper of the ground-floor kitchen and the late-night noodle cart, and the man who actually cooks the rent',
      cardBlurb:
        'Every bowl of rent on your floor comes out of his pots, he knows exactly who has paid and who has not, and he will sell you twenty-two bowls or teach you to make them, depending on how you ask.',
      pronouns: 'he/him',
      publicTraits: ['Feeds everybody, charges most of them', 'Gossips while he chops', 'Neutral between the floors, on principle and for business'],
      hiddenDrives: [
        'He has been buying cheap kitchen kit from Mabuchi for a year without asking where it came from, and has started to suspect',
        'He wants his own shop one day and is saving for it a bowl at a time',
      ],
      values: ['Nobody leaves his kitchen hungry, even if they leave it owing', 'A tab is a promise, so he writes every one down'],
      fears: [
        'That the pans he bought were stolen and his name is on the receipts',
        'Failing his final service a second time in front of the same examiner',
      ],
      socialStyle:
        'Talks while doing three other things. Answers a question with a price, then with gossip, and then, if you stay long enough, with the truth.',
      boundaries: [
        'Will not take sides between the floors where anybody can see him do it',
        'Will not let anybody leave his kitchen hungry, including people he dislikes',
        'Will not show anybody his tab book unless they have earned a line in it',
      ],
      goals: ['Sell twenty-two bowls tonight', 'Pass his final service on Thursday', 'Get out from under whatever Mabuchi has been selling him'],
      secrets: [
        {
          id: 'ken_the_tab',
          fact: 'His tab book has a column marked D. Every month Daigo pays whatever the floor’s rent does not cover. The same book records eight kitchen items Ken bought from Mabuchi at a tenth of their price.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He shows the book to somebody who has cooked in his kitchen beside him, or who fixed his dead burners.',
        },
        {
          id: 'ken_the_bag',
          fact: 'On Wednesday nights Mabuchi walks a heavy sports bag past the noodle cart towards the scrapyard under the overpass, and comes back with it empty.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only to somebody who already knows the tools are stolen and promises to keep his name out of it.',
        },
      ],
      speechStyle:
        'Fast and warm, kitchen slang, and almost every sentence has a number in it: bowls, minutes, prices. Calls everybody chef, whether they cook or not.',
      topics: ['noodles', 'the rent', 'his tab book', 'the noodle cart', 'Daigo', 'Mabuchi', 'his final service'],
      voiceSamples: [
        'Twenty-two bowls, chef. On your money that’s your whole week, in soup.',
        'Four pots, one burner that behaves, and a floor that eats like a building site. Grab a knife or get out of my light.',
        'I write everything down. Who paid, who didn’t, who paid for who. Funny what a column of numbers says about a man.',
        'Nobody walks out of my kitchen hungry. Plenty walk out owing. Different problem, chef.',
      ],
      appearance:
        'An adult man, lean and long-armed, a red bandana folded into a headband over long dark hair, a white chef’s jacket open over a grey hoodie, old burn marks across both forearms, a ladle in one hand.',
      visualHook: 'A red bandana headband and a ladle he points with like a conductor’s baton.',
      silhouette: 'Behind a counter in a cloud of steam, one hand stirring, the other pointing a ladle at somebody.',
      artSeed: 'nob-ken-01',
      portrait: null,
      expressions: ['neutral', 'grinning', 'worried', 'annoyed', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 120, locationId: 'canal_lane', activity: 'closing up the noodle cart under the bridge' },
        { startMinute: 120, endMinute: 540, locationId: 'dorm_kitchen', activity: 'dead to the world in the little room behind the kitchen' },
        { startMinute: 540, endMinute: 900, locationId: 'workshops', activity: 'in the training kitchen, practising his final service' },
        { startMinute: 900, endMinute: 1410, locationId: 'dorm_kitchen', activity: 'running the ground-floor kitchen, four pots on, all of them his' },
        { startMinute: 1410, endMinute: 1440, locationId: 'canal_lane', activity: 'opening the noodle cart under the bridge' },
      ],
      homeLocationId: 'dorm_kitchen',
      knowledgeScope: ['the_rent', 'the_tab_book', 'daigo', 'mabuchi', 'east_hall', 'the_canal'],
      startingRelationship: { trust: 20, affection: 20, respect: 10, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'ken_opens_the_book',
          label: 'He shows you his tab book',
          kind: 'TRUST',
          requires: { trust: 45 },
        },
        {
          id: 'ken_names_the_yard',
          label: 'He tells you where the sports bag goes',
          kind: 'TRUST',
          requires: { trust: 55, flagsSet: ['knows:the_frame'] },
        },
      ],
      attributes: { might: 11, agility: 13, mind: 13, presence: 14, resolve: 10, arcana: 7 },
      companion: null,
      scouting: null,
      combatant: { health: 30, defenseDc: 12, damage: 3, tags: ['civilian'] },
    },
    {
      id: 'mabuchi',
      name: 'Sota Mabuchi',
      calledName: 'Mabuchi',
      role: 'Head of the fourth floor, a final-year machining student, and the student assistant in the workshop tool room',
      cardBlurb:
        'He runs the floor above yours without ever raising his voice, he brought oranges to welcome you, and he already knows your name, your trade and which bunk is yours.',
      pronouns: 'he/him',
      publicTraits: ['Polite to everybody, especially the warden', 'Never seen fighting', 'Remembers names and birthdays'],
      hiddenDrives: [
        'He has been stealing tools from the workshops for a year, and the college audit at the end of term will find the gap unless somebody else is blamed for it first',
        'He wants the third floor closed, so that the audit, the eviction and the blame all land in one place that is not his',
      ],
      values: ['A clean record', 'Owing people favours they do not know they owe'],
      fears: ['A camera that works', 'Daigo deciding the landing rules no longer apply to him'],
      socialStyle:
        'Soft voice, full sentences, and your name in most of them. Makes offers instead of threats and lets you work out the threat yourself. Never touches anybody where anybody can see.',
      boundaries: [
        'Will not fight anywhere it could be recorded, and will not fight fairly anywhere else',
        'Will not raise his voice in front of the warden, whatever happens',
        'Will not confess to anything. Cornered, he makes an offer',
      ],
      goals: [
        'Get one more incident onto the third floor’s record before Friday',
        'Recover the grinder from 307 before anybody looks under the bunk',
        'Find out whether the new resident can be bought',
      ],
      secrets: [
        {
          id: 'mabuchi_the_tools',
          fact: 'He signs tools out of the workshop tool room as broken, wraps them in fourth-floor towels, keeps them in the padlocked dry showers on the fourth floor, and sells them to a scrap dealer under the canal overpass on Wednesday nights.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'The dry showers, the tags in their drain, the yard under the overpass, or Bunta’s account of the towel. He will never confess; he will offer a deal before he is cornered.',
        },
        {
          id: 'mabuchi_planted_shun',
          fact: 'He planted the drill that got Shun Arai evicted from 307, and taped the grinder under the same bunk at the same time to use on whoever came next.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Bunta saw him leave 307 with a towel over his arm. The grinder’s missing inventory tag is in the dry-showers drain.',
        },
      ],
      speechStyle:
        'Quiet, courteous, complete sentences with the player’s name in them. Offers instead of threatens: it would be a shame, I could make that easier. Smiles just before he says anything unpleasant.',
      topics: ['the fourth floor', 'the review', 'the tool room', 'Shun Arai', 'Daigo', 'favours'],
      voiceSamples: [
        'Welcome to East Hall. I brought oranges. Downstairs never thinks to feed its guests properly.',
        'It would be a shame for a new resident to begin the term in the warden’s ledger. I could make sure that never happens, if we were friends.',
        'I don’t brawl. Brawling is what gets floors closed. I simply keep very good records.',
        'Shun Arai was pleasant company. Careless with his belongings, though. I hope you’re more careful with yours.',
      ],
      appearance:
        'An adult man, tall and slim, neat side-parted hair, thin silver-rimmed glasses, a pressed navy college jacket zipped to the collar, spotless white trainers.',
      visualHook: 'Thin silver-rimmed glasses and a pressed navy jacket zipped all the way up, spotless in a building where nothing is.',
      silhouette: 'Upright, hands clasped behind his back, head slightly bowed, smiling.',
      artSeed: 'nob-mabuchi-01',
      portrait: null,
      expressions: ['polite', 'pleased', 'cold', 'surprised', 'angry'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'fourth_floor', activity: 'in 401, the only room on the floor with a lock that works' },
        { startMinute: 420, endMinute: 480, locationId: 'lobby', activity: 'wishing the warden good morning by name' },
        { startMinute: 480, endMinute: 900, locationId: 'workshops', activity: 'behind the tool-room counter, signing tools in and out in very neat handwriting' },
        { startMinute: 900, endMinute: 1080, locationId: 'canal_lane', activity: 'walking a sports bag along the canal, towards the overpass and back' },
        { startMinute: 1080, endMinute: 1440, locationId: 'fourth_floor', activity: 'running the fourth floor from a desk chair at the top of the stairs' },
      ],
      homeLocationId: 'fourth_floor',
      knowledgeScope: ['the_fourth_floor', 'the_tool_room', 'the_dry_showers', 'shun_arai', 'the_review', 'east_hall'],
      startingRelationship: { trust: 5, affection: 0, respect: 10, fear: 0, rivalry: 10 },
      gates: [
        {
          id: 'mabuchi_makes_an_offer',
          label: 'He makes you an offer',
          kind: 'OTHER',
          requires: { respect: 20 },
        },
        {
          id: 'mabuchi_stops_smiling',
          label: 'He stops smiling at you',
          kind: 'OTHER',
          requires: { flagsSet: ['knows:the_thief'] },
        },
      ],
      attributes: { might: 11, agility: 12, mind: 16, presence: 14, resolve: 13, arcana: 8 },
      companion: null,
      scouting: null,
      combatant: { health: 40, defenseDc: 14, damage: 6, tags: ['fourth-floor'] },
    },
    {
      id: 'bunta',
      name: 'Bunta Iwai',
      calledName: 'Bunta',
      role: 'First-year auto mechanics student and your roommate in 307, who paid his rent in noodles on day one and has been broke ever since',
      cardBlurb:
        'He shares your room, knows every rule on the floor by heart and will tell you all of them in your first five minutes, and keeps going up to the fourth floor for reasons he explains a little too fast.',
      pronouns: 'he/him',
      publicTraits: ['Talks very fast when nervous, which is always', 'Knows every rule on the floor', 'Generous with things he cannot afford'],
      hiddenDrives: [
        'Mabuchi paid off his phone debt in October, and since then he reports what happens on the third floor every afternoon. He hates it and cannot see a way out',
        'He wants to be somebody the floor relies on, instead of the one who brings the snacks',
      ],
      values: ['Everybody getting along, ideally without him having to do anything brave', 'Paying people back'],
      fears: ['Daigo finding out', 'Being the next person thrown out of 307'],
      socialStyle:
        'Over-explains, apologises in advance, and goes very quiet whenever anybody mentions the fourth floor. Offers you food within a minute of any conversation.',
      boundaries: [
        'Will not lie to your face if you ask him directly and kindly',
        'Will not take the stairs with anybody, ever, and says so',
      ],
      goals: ['Get through the term without being noticed', 'Pay Mabuchi back so he can stop going upstairs'],
      secrets: [
        {
          id: 'bunta_the_reports',
          fact: 'Every afternoon he tells Mabuchi what happened on the third floor. He told him about the new transfer before the player had even arrived.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He confesses if the player asks him straight why he keeps going upstairs, and does not shout at him.',
        },
        {
          id: 'bunta_saw_the_towel',
          fact: 'On the night before Shun was evicted, Bunta saw Mabuchi come out of 307 with a blue-striped towel over his arm. He said nothing then and has said nothing since.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only after he has confessed about the reports, and only to somebody who promises Daigo will not hear it first.',
        },
      ],
      speechStyle:
        'Run-on sentences and lists. Quotes the floor rules by number from memory, gets rule four wrong every time, and apologises before bad news and again after good news.',
      topics: ['the floor rules', 'engines', 'the fourth floor', 'Shun', 'snacks', 'his phone'],
      voiceSamples: [
        'Okay so rule one is the rent, rule two is the front door locks at eleven, rule three is never stand on the landing unless you mean it, rule four I forget, sorry.',
        'I paid in noodles. Day one. Rice and soy sauce for a month since, and honestly it’s character-building, please don’t tell anyone I cried.',
        'I go up there for notes! Engine notes. Mabuchi is very organised. Why are you looking at me like that?',
        'Sorry. Sorry in advance. You’re going to hate this, and I’m going to hate saying it, and I’m saying it anyway.',
      ],
      appearance:
        'An adult man, stocky and broad-faced, messy bleached-orange hair growing out over dark roots, mechanic’s overalls tied at the waist over a band T-shirt, a phone with a cracked screen always in hand.',
      visualHook: 'Bleached-orange hair growing out over dark roots, and a phone with a spiderweb crack across the screen.',
      silhouette: 'Hunched over a phone, shoulders up round his ears, one hand already raised in apology.',
      artSeed: 'nob-bunta-01',
      portrait: null,
      expressions: ['nervous', 'laughing', 'worried', 'surprised'],
      schedule: [
        { startMinute: 0, endMinute: 450, locationId: 'room_307', activity: 'on the top bunk with the light on, pretending to be out cold' },
        { startMinute: 450, endMinute: 480, locationId: 'dorm_kitchen', activity: 'eating the cheapest thing in the kitchen' },
        { startMinute: 480, endMinute: 960, locationId: 'workshops', activity: 'in the engine shop, holding the wrong spanner confidently' },
        { startMinute: 960, endMinute: 1140, locationId: 'fourth_floor', activity: 'on the fourth floor, where he says he is borrowing notes' },
        { startMinute: 1140, endMinute: 1440, locationId: 'room_307', activity: 'in 307 with his headphones on, listening to the corridor' },
      ],
      homeLocationId: 'room_307',
      knowledgeScope: ['the_third_floor', 'the_floor_rules', 'shun_arai', 'mabuchi', 'room_307'],
      startingRelationship: { trust: 25, affection: 25, respect: 5, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'bunta_comes_clean',
          label: 'He tells you why he keeps going upstairs',
          kind: 'TRUST',
          requires: { trust: 40 },
        },
        {
          id: 'bunta_will_say_it',
          label: 'He agrees to say what he saw, in the warden’s office',
          kind: 'ALLIANCE',
          requires: { trust: 55, flagsSet: ['bunta_confessed'] },
        },
      ],
      attributes: { might: 10, agility: 12, mind: 12, presence: 10, resolve: 8, arcana: 9 },
      companion: null,
      scouting: null,
      combatant: { health: 24, defenseDc: 11, damage: 3, tags: ['civilian', 'third-floor'] },
    },
    {
      id: 'fujii',
      name: 'Setsuko Fujii',
      calledName: 'Fujii',
      role: 'Warden of East Hall for fourteen years, a former ship’s engineer, and the keeper of the incident book',
      cardBlurb:
        'She locks the front door at eleven, writes every fight she sees into a book that can close your floor, and has been very carefully not fixing the camera on your back stairs for two years.',
      pronouns: 'she/her',
      publicTraits: ['Unhurried', 'Hears everything in the building through the pipes', 'Makes tea for people she is about to punish'],
      hiddenDrives: [
        'She knows the third floor has fewer real injuries under Daigo than any floor she has ever run under a camera, and has left the landing alone for that reason',
        'She suspects the fourth floor of the workshop thefts and will not act on suspicion alone',
      ],
      values: ['A rule applied the same way to everybody, or not at all', 'Evidence she could put on a table'],
      fears: [
        'Signing a wrong eviction a second time',
        'The housing office replacing her with a key-card system and a phone number',
      ],
      socialStyle: 'Lets silence do the work. Asks one question, answers none, and writes something down whatever you say.',
      boundaries: [
        'Will not record a fight she did not see and nobody reported',
        'Will not take an accusation without something she can hold in her hand',
        'Will not let anybody stay out past curfew twice in one week',
      ],
      goals: ['Get East Hall through Friday’s review with the right floor closed, or none', 'Find out whether she was wrong about Shun Arai'],
      secrets: [
        {
          id: 'fujii_the_fuse',
          fact: 'She has known for two years that it was Rumi Ogata who pulled the fuse on the back-stairs camera, and has chosen not to report it.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She says so to anybody who asks her straight why the camera was never fixed.',
        },
        {
          id: 'fujii_doubts_shun',
          fact: 'She signed Shun Arai’s eviction and has doubted it ever since: the drill was wrapped in a blue-striped fourth-floor towel, she noticed, and she said nothing because the housing office wanted the case closed.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only to somebody who brings her the grinder and its towel together and does not try to bargain with them.',
        },
      ],
      speechStyle:
        'Short, nautical and exact. Gives times to the minute and calls the building she. Asks one question and then lets the silence ask the rest.',
      topics: ['curfew', 'the incident book', 'the review', 'the camera', 'Shun Arai', 'the boiler'],
      voiceSamples: [
        'Front door locks at eleven. After eleven you are either in your room or in my book.',
        'She’s an old building. Every pipe in her runs past my office. I hear a door slam on four before the person slamming it does.',
        'Sit down. Tea first. Then tell me what you saw, and only what you saw.',
        'I signed one eviction this term on what I was shown. I will not sign another on what I am told.',
      ],
      appearance:
        'An older woman, broad-shouldered and square, short iron-grey hair, reading glasses on a cord, a faded navy cardigan over a merchant-navy work shirt, a heavy ring of brass keys on her belt.',
      visualHook: 'A heavy ring of old brass keys on her belt that announces her two corridors before she arrives.',
      silhouette: 'Square and still in a doorway, one hand on the key ring, the other holding a mug.',
      artSeed: 'nob-fujii-01',
      portrait: null,
      expressions: ['neutral', 'stern', 'warm', 'suspicious', 'surprised'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'warden_office', activity: 'in her rooms behind the office, door ajar' },
        { startMinute: 360, endMinute: 480, locationId: 'lobby', activity: 'unlocking the front door and reading the night log' },
        { startMinute: 480, endMinute: 1080, locationId: 'warden_office', activity: 'paperwork and the shipping forecast, the incident book open' },
        { startMinute: 1080, endMinute: 1260, locationId: 'lobby', activity: 'at the window, counting people in' },
        { startMinute: 1260, endMinute: 1380, locationId: 'warden_office', activity: 'kettle on, logging the evening' },
        { startMinute: 1380, endMinute: 1440, locationId: 'back_stairs', activity: 'walking the floors after curfew, slowest on the back stairs' },
      ],
      homeLocationId: 'warden_office',
      knowledgeScope: ['east_hall', 'the_incident_book', 'the_review', 'the_camera', 'shun_arai', 'the_boiler'],
      startingRelationship: { trust: 15, affection: 5, respect: 15, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'fujii_listens',
          label: 'She hears you out properly',
          kind: 'TRUST',
          requires: { trust: 40 },
        },
        {
          id: 'fujii_speaks_for_the_floor',
          label: 'She speaks for the third floor at the review',
          kind: 'ALLIANCE',
          requires: { trust: 55, respect: 45 },
        },
      ],
      attributes: { might: 12, agility: 9, mind: 15, presence: 14, resolve: 17, arcana: 9 },
      companion: null,
      scouting: null,
      combatant: { health: 45, defenseDc: 14, damage: 5, tags: ['staff'] },
    },
  ],
  /**
   * Seven quests, two of them live on the first turn.
   *
   * The rent is the opener and every way of answering it is a route: cook,
   * take the stairs, swing at him in the corridor, refuse, bluff, or walk off
   * to bed. On the Record is the rule the whole week hangs on, written as a
   * quest so the storyteller reads it: hit the wrong person in the wrong room
   * and the third floor's page in the incident book fills up. Bed 307 is the
   * mystery, Friday at Ten is the clock, Last Week of the Month is why the
   * rent exists, Who Holds the Floor is the finale, and the dead camera is the
   * question underneath all of it.
   */
  quests: [
    {
      id: 'q_rent_is_due',
      title: 'Rent’s Due',
      summary:
        'The third floor wants twenty-two bowls of noodles from you tonight, or you on the back-stairs landing with Daigo. Rumi says you do not have to answer at all.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['daigo', 'rumi', 'ken', 'bunta'],
      involvedLocationIds: ['common_room', 'back_stairs', 'dorm_kitchen', 'room_307'],
      knownRewardCopy: 'A place on the floor, or at least a name on it that is not Transfer.',
      steps: [
        {
          id: 'pay_or_bleed',
          playerCopy: 'Answer Daigo before the front door locks at eleven: noodles, the stairs, or something else.',
          directorNotes:
            'The whole floor is watching and every answer is a real one. Cooking costs the player their food money or a night of work in Ken’s kitchen and buys goodwill; the stairs cost bruises and buy respect; refusing costs nothing tonight and makes Rumi very interested; a bluff works exactly as long as nobody checks. If the player swings at Daigo in the common room instead of on the landing, he takes it, puts them down without hitting their face, and the warden hears it through the pipes: that is the third incident and the whole floor knows it. Walking off to bed is allowed and Daigo lets them go, loudly, which is worse.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'cooked',
              label: 'Feed the whole floor',
              predicate: { flagsSet: ['used:cook_for_the_floor'] },
              setsFlags: ['paid_in_noodles'],
              closesFlags: ['refused_rent'],
            },
            {
              routeId: 'took_the_stairs',
              label: 'Take the stairs with Daigo',
              predicate: { flagsSet: ['used:take_the_stairs'] },
              setsFlags: ['took_the_stairs'],
              closesFlags: ['paid_in_noodles'],
            },
            {
              routeId: 'fought_on_the_landing',
              label: 'Go for him on the landing, under the dead camera',
              predicate: { flagsSet: ['attacked:daigo'], atLocation: 'back_stairs' },
              setsFlags: ['took_the_stairs'],
              closesFlags: ['paid_in_noodles'],
            },
            {
              routeId: 'swung_in_the_corridor',
              label: 'Swing at him in front of everybody',
              predicate: { flagsSet: ['attacked:daigo'] },
              setsFlags: ['swung_at_daigo', 'third_incident'],
              closesFlags: ['paid_in_noodles', 'took_the_stairs'],
            },
            {
              routeId: 'refused',
              label: 'Tell him no, to his face',
              predicate: { flagsSet: ['used:stand_your_ground'] },
              setsFlags: ['refused_rent'],
              closesFlags: ['paid_in_noodles'],
            },
            {
              routeId: 'talked',
              label: 'Talk your way past it',
              predicate: { flagsSet: ['used:talk_big'] },
              setsFlags: ['talked_round_it'],
              closesFlags: [],
            },
            {
              routeId: 'walked',
              label: 'Ignore him and go to bed',
              predicate: { flagsSet: ['visited:room_307'] },
              setsFlags: ['ignored_daigo'],
              closesFlags: [],
            },
            {
              routeId: 'slipped_out',
              label: 'Leave the building instead',
              predicate: { flagsSet: ['used:slip_away'] },
              setsFlags: ['ignored_daigo'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 40, items: [], flags: ['first_night_answered'], abilities: ['call_the_floor'], reputation: [] },
        },
        {
          id: 'the_floor_decides',
          playerCopy: 'Find out what the third floor makes of you.',
          directorNotes:
            'The day after. Whatever the player did last night has gone round the floor twice and grown in the telling. People decide who the new resident is over breakfast, in the corridor and on the landing. Let the player hear their own story told back wrong at least once.',
          enterWhen: { flagsSet: ['first_night_answered'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'daigo_noticed',
              label: 'Earn Daigo’s attention',
              predicate: { minRelationship: [{ characterId: 'daigo', dimension: 'respect', value: 45 }] },
              setsFlags: ['daigo_noticed_you'],
              closesFlags: [],
            },
            {
              routeId: 'stood_with_rumi',
              label: 'Stand with Rumi',
              predicate: { minRelationship: [{ characterId: 'rumi', dimension: 'trust', value: 45 }] },
              setsFlags: ['stood_with_rumi'],
              closesFlags: [],
            },
            {
              routeId: 'ate_with_them',
              label: 'Sit down and eat with the floor',
              predicate: { flagsSet: ['used:sit_down_and_eat'] },
              setsFlags: ['ate_with_the_floor'],
              closesFlags: [],
            },
            {
              routeId: 'kept_your_head_down',
              label: 'Watch the floor before it watches you',
              predicate: { flagsSet: ['used:read_the_floor'] },
              setsFlags: ['kept_your_head_down'],
              closesFlags: [],
            },
            {
              routeId: 'roommate',
              label: 'Get the whole floor explained by your roommate',
              predicate: { flagsSet: ['spoke:bunta'] },
              setsFlags: ['roommate_talked'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 40, items: [], flags: ['knows:the_floor'], abilities: [], reputation: [{ factionId: 'faction_third', amount: 10 }] },
        },
      ],
    },
    {
      id: 'q_on_the_record',
      title: 'On the Record',
      summary:
        'The third floor has two fights in the warden’s incident book this term. One more, anywhere but the back-stairs landing under the dead camera, and the housing office closes the floor.',
      kind: 'SIDE',
      startsActive: true,
      involvedCharacterIds: ['fujii', 'mabuchi'],
      involvedLocationIds: ['warden_office', 'back_stairs'],
      knownRewardCopy: 'Nothing. This one is about what you do not do.',
      steps: [
        {
          id: 'the_third_entry',
          playerCopy: 'Keep the third floor’s page in the incident book at two.',
          directorNotes:
            'This step only completes when the player hits somebody they should not have. Mabuchi reports any blow to the warden within the hour, in person, with a witness. The warden writes what she sees. Ken’s kitchen is public. Rumi and Bunta will not report the player, but the floor will know, and Daigo will want a word on the landing.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'hit_mabuchi',
              label: 'Hit Mabuchi',
              predicate: { flagsSet: ['attacked:mabuchi'] },
              setsFlags: ['third_incident', 'hit_mabuchi'],
              closesFlags: [],
            },
            {
              routeId: 'hit_the_warden',
              label: 'Raise a hand to the warden',
              predicate: { flagsSet: ['attacked:fujii'] },
              setsFlags: ['third_incident', 'hit_the_warden'],
              closesFlags: [],
            },
            {
              routeId: 'hit_ken',
              label: 'Start something in Ken’s kitchen',
              predicate: { flagsSet: ['attacked:ken'] },
              setsFlags: ['third_incident', 'turned_on_the_floor'],
              closesFlags: [],
            },
            {
              routeId: 'hit_rumi',
              label: 'Go for Rumi',
              predicate: { flagsSet: ['attacked:rumi'] },
              setsFlags: ['turned_on_the_floor'],
              closesFlags: [],
            },
            {
              routeId: 'hit_bunta',
              label: 'Go for your roommate',
              predicate: { flagsSet: ['attacked:bunta'] },
              setsFlags: ['turned_on_the_floor'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 0, items: [], flags: ['the_book_moved'], abilities: [], reputation: [{ factionId: 'faction_office', amount: -10 }] },
        },
      ],
    },
    {
      id: 'q_bed_307',
      title: 'Bed 307',
      summary:
        'The last person in your bunk was evicted three weeks ago for stolen workshop tools. He said it was not him, and left a note in the window frame.',
      kind: 'MAIN',
      discoverWhen: { flagsSet: ['first_night_answered'] },
      involvedCharacterIds: ['bunta', 'rumi', 'ken', 'mabuchi', 'fujii'],
      involvedLocationIds: ['room_307', 'fourth_floor', 'dry_showers', 'scrapyard', 'warden_office'],
      knownRewardCopy: 'The truth about Shun Arai, and maybe the thing that saves the floor.',
      steps: [
        {
          id: 'under_the_bunk',
          playerCopy: 'Find out what is wrong with bed 307.',
          directorNotes:
            'The grinder is taped under the slats of the bottom bunk, wrapped in a blue-striped towel, and Shun’s note is in the window frame. Either is found by somebody who actually looks. Bunta knows more and confesses to anybody who asks him kindly and straight. If nobody looks before Wednesday night, the warden finds the grinder for them, with Mabuchi standing helpfully in the doorway.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'found_the_grinder',
              label: 'Find what is taped under the bunk',
              predicate: { hasItems: ['the_grinder'] },
              setsFlags: ['has_the_grinder', 'knows:the_frame'],
              closesFlags: [],
            },
            {
              routeId: 'found_the_note',
              label: 'Find the note in the window frame',
              predicate: { hasItems: ['window_note'] },
              setsFlags: ['knows:the_frame'],
              closesFlags: [],
            },
            {
              routeId: 'bunta_talked',
              label: 'Get the truth out of your roommate',
              predicate: { minRelationship: [{ characterId: 'bunta', dimension: 'trust', value: 40 }] },
              setsFlags: ['knows:the_frame', 'bunta_confessed'],
              closesFlags: [],
            },
            {
              routeId: 'caught_with_it',
              label: 'Get caught with it',
              predicate: { flagsSet: ['caught_with_the_grinder'] },
              setsFlags: ['knows:the_frame', 'framed'],
              closesFlags: ['has_the_grinder'],
            },
          ],
          rewards: { xp: 50, items: [], flags: ['knows:the_towels'], abilities: [], reputation: [] },
        },
        {
          id: 'follow_the_towels',
          playerCopy: 'Follow the blue-striped towels upstairs.',
          directorNotes:
            'Blue-striped towels are fourth-floor laundry. Rumi has meter readings showing the padlocked dry showers drawing power all night. Ken has seen a heavy sports bag go past his cart on Wednesdays. Bunta saw Mabuchi leave 307 with a towel over his arm. Any one of these gets the player to the shower door; none of them on its own is proof Fujii will accept.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'rumis_readings',
              label: 'Get Rumi’s meter readings',
              predicate: { minRelationship: [{ characterId: 'rumi', dimension: 'trust', value: 45 }] },
              setsFlags: ['knows:the_showers', 'rumi_is_in'],
              closesFlags: [],
            },
            {
              routeId: 'read_the_corridor',
              label: 'Watch the fourth floor until it gives itself away',
              predicate: { flagsSet: ['used:read_the_floor'], atLocation: 'fourth_floor' },
              setsFlags: ['knows:the_showers'],
              closesFlags: [],
            },
            {
              routeId: 'picked_the_padlock',
              label: 'Open the padlock yourself',
              predicate: { flagsSet: ['used:fix_it'], atLocation: 'fourth_floor' },
              setsFlags: ['knows:the_showers', 'picked_the_padlock'],
              closesFlags: [],
            },
            {
              routeId: 'ken_told_you',
              label: 'Get Ken to tell you about the sports bag',
              predicate: { minRelationship: [{ characterId: 'ken', dimension: 'trust', value: 55 }] },
              setsFlags: ['knows:the_showers', 'knows:the_buyer'],
              closesFlags: [],
            },
            {
              routeId: 'bunta_saw_it',
              label: 'Get Bunta to tell you what he saw',
              predicate: { flagsSet: ['bunta_confessed'] },
              setsFlags: ['knows:the_showers', 'bunta_will_say_it'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 60, items: [], flags: ['knows:the_thief'], abilities: [], reputation: [] },
        },
        {
          id: 'what_you_do_with_it',
          playerCopy: 'Decide what to do about Mabuchi before Friday.',
          directorNotes:
            'The player knows. The warden will act on something she can hold in her hand or a witness who will say it in her office, never on an accusation. Mabuchi will offer a deal the moment he suspects the player knows: a clean record, the fourth floor’s favour, the third floor’s rent quietly forgiven. Calling the whole floor up the stairs ends it fast and loud, and is a fight in public.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'reported_with_tags',
              label: 'Put the inventory tags on the warden’s desk',
              predicate: { flagsSet: ['used:lay_it_out'], hasItems: ['tool_tags'] },
              setsFlags: ['the_floor_cleared', 'mabuchi_reported'],
              closesFlags: ['deal_with_mabuchi'],
            },
            {
              routeId: 'reported_with_bunta',
              label: 'Bring Bunta to the warden’s office to say it',
              predicate: { flagsSet: ['used:lay_it_out', 'bunta_will_say_it'] },
              setsFlags: ['the_floor_cleared', 'mabuchi_reported', 'bunta_testified'],
              closesFlags: ['deal_with_mabuchi'],
            },
            {
              routeId: 'reported_with_grinder',
              label: 'Put the grinder and its towel in front of the warden',
              predicate: {
                flagsSet: ['used:lay_it_out'],
                hasItems: ['the_grinder'],
                atLocation: 'warden_office',
                minRelationship: [{ characterId: 'fujii', dimension: 'trust', value: 40 }],
              },
              setsFlags: ['the_floor_cleared', 'mabuchi_reported'],
              closesFlags: ['deal_with_mabuchi'],
            },
            {
              routeId: 'called_the_floor',
              label: 'Take the whole third floor up the stairs',
              predicate: { flagsSet: ['used:call_the_floor'] },
              setsFlags: ['the_floor_settled_it', 'third_incident', 'tools_found'],
              closesFlags: ['the_floor_cleared'],
            },
            {
              routeId: 'took_the_deal',
              label: 'Take Mabuchi’s offer and tell the floor a story',
              predicate: {
                flagsSet: ['used:talk_big'],
                atLocation: 'fourth_floor',
                minRelationship: [{ characterId: 'mabuchi', dimension: 'respect', value: 20 }],
              },
              setsFlags: ['deal_with_mabuchi'],
              closesFlags: ['the_floor_cleared', 'mabuchi_reported'],
            },
          ],
          rewards: { xp: 80, items: [], flags: ['bed_307_answered'], abilities: [], reputation: [{ factionId: 'faction_office', amount: 15 }] },
        },
      ],
    },
    {
      id: 'q_the_review',
      title: 'Friday at Ten',
      summary:
        'On Friday at ten the housing office decides, in the warden’s office, which floor of East Hall closes at the end of term. The third floor has two incidents on record and the fourth has none.',
      kind: 'MAIN',
      discoverWhen: { flagsSet: ['knows:the_review'] },
      involvedCharacterIds: ['fujii', 'mabuchi', 'daigo'],
      involvedLocationIds: ['warden_office'],
      knownRewardCopy: 'A floor to live on next term, or boxes in the corridor.',
      steps: [
        {
          id: 'friday_at_ten',
          playerCopy: 'Get to Friday with the third floor still worth keeping.',
          directorNotes:
            'The review is short and dull and decides everything. The warden reads the incident counts aloud. Mabuchi speaks for the fourth floor, beautifully. Whoever speaks for the third floor matters less than what is already on the desk. If Mabuchi has been reported with proof, it is the fourth floor that closes.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'cleared',
              label: 'Walk in with the thief already named',
              predicate: { flagsSet: ['review_held', 'the_floor_cleared'], flagsUnset: ['third_incident'] },
              setsFlags: ['floor_saved', 'fourth_floor_closed'],
              closesFlags: ['floor_closed'],
            },
            {
              routeId: 'the_deal',
              label: 'Let Mabuchi speak for both floors',
              predicate: { flagsSet: ['review_held', 'deal_with_mabuchi'], flagsUnset: ['third_incident'] },
              setsFlags: ['floor_saved', 'sold_the_floor'],
              closesFlags: ['floor_closed'],
            },
            {
              routeId: 'vouched',
              label: 'Have the warden speak for the third floor',
              predicate: {
                flagsSet: ['review_held'],
                flagsUnset: ['third_incident', 'framed'],
                minRelationship: [{ characterId: 'fujii', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['floor_saved', 'fujii_vouched'],
              closesFlags: ['floor_closed'],
            },
            {
              routeId: 'closed',
              label: 'Lose the floor',
              predicate: { flagsSet: ['review_held'] },
              setsFlags: ['floor_closed'],
              closesFlags: ['floor_saved'],
            },
          ],
          rewards: { xp: 100, items: [], flags: ['review_done'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_last_week',
      title: 'Last Week of the Month',
      summary:
        'The stipend is late, half the third floor has nothing left to eat, and the rent you were asked for on your first night suddenly makes a different kind of sense.',
      kind: 'SIDE',
      discoverWhen: { flagsSet: ['stipend_late'] },
      involvedCharacterIds: ['ken', 'daigo'],
      involvedLocationIds: ['dorm_kitchen', 'canal_lane'],
      knownRewardCopy: 'Twenty-two people who remember who fed them.',
      steps: [
        {
          id: 'feed_the_floor',
          playerCopy: 'Help get the whole third floor fed until the stipend lands.',
          directorNotes:
            'Ken has four working burners, a sack of rice, and a floor that cannot pay him. Two of his burners are dead. The player can cook, fix the burners, or simply sit down at the long table and make it a meal instead of a queue. Whoever does it, the floor notices.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'cooked',
              label: 'Cook in Ken’s kitchen',
              predicate: { flagsSet: ['used:cook_for_the_floor'], atLocation: 'dorm_kitchen' },
              setsFlags: ['floor_fed'],
              closesFlags: [],
            },
            {
              routeId: 'fixed_the_burners',
              label: 'Get the two dead burners working',
              predicate: { flagsSet: ['used:fix_it'], atLocation: 'dorm_kitchen' },
              setsFlags: ['floor_fed', 'ken_owes_you'],
              closesFlags: [],
            },
            {
              routeId: 'ate_together',
              label: 'Turn the queue into a meal',
              predicate: {
                flagsSet: ['used:sit_down_and_eat'],
                minRelationship: [{ characterId: 'ken', dimension: 'trust', value: 40 }],
              },
              setsFlags: ['floor_fed'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 50, items: [], flags: ['floor_follows_you'], abilities: [], reputation: [{ factionId: 'faction_third', amount: 15 }] },
        },
        {
          id: 'where_it_goes',
          playerCopy: 'Find out where the noodle rent actually goes.',
          directorNotes:
            'Ken’s tab book has a column marked D. Daigo will not explain it; Ken will, to somebody who has cooked beside him. Daigo’s results slip under the roof brick tells the other half: why he cares so much who holds the floor.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'read_the_tab',
              label: 'Read the column marked D in Ken’s tab book',
              predicate: { hasItems: ['ken_tab_book'] },
              setsFlags: ['knows:the_noodle_money'],
              closesFlags: [],
            },
            {
              routeId: 'ken_explained',
              label: 'Get Ken to explain the tab',
              predicate: { minRelationship: [{ characterId: 'ken', dimension: 'trust', value: 45 }] },
              setsFlags: ['knows:the_noodle_money'],
              closesFlags: [],
            },
            {
              routeId: 'daigo_explained',
              label: 'Get Daigo to say it himself',
              predicate: { minRelationship: [{ characterId: 'daigo', dimension: 'trust', value: 55 }] },
              setsFlags: ['knows:the_noodle_money', 'knows:daigo_leaving'],
              closesFlags: [],
            },
            {
              routeId: 'found_the_slip',
              label: 'Find the slip under the roof brick',
              predicate: { hasItems: ['daigo_results_slip'] },
              setsFlags: ['knows:daigo_leaving'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 50, items: [], flags: ['rent_understood'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_after_daigo',
      title: 'Who Holds the Floor',
      summary:
        'Daigo has failed his written certification twice and sits it again on Friday at nine. If he fails, somebody else holds the third floor next term.',
      kind: 'MAIN',
      discoverWhen: { flagsSet: ['knows:daigo_leaving'] },
      involvedCharacterIds: ['daigo', 'rumi', 'mabuchi'],
      involvedLocationIds: ['the_roof', 'common_room', 'workshops'],
      knownRewardCopy: 'The floor, or a say in who gets it.',
      steps: [
        {
          id: 'the_paper',
          playerCopy: 'Decide whether to help Daigo with Friday’s paper.',
          directorNotes:
            'Daigo will not ask. He can do everything on the paper with his hands and nothing on it with a pen in forty minutes. Somebody who sits with him and walks him through the questions out loud, more than once, gives him a real chance. He will be rude about it every time and turn up every time.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'studied',
              label: 'Sit him down with the questions',
              predicate: {
                flagsSet: ['used:walk_them_through'],
                minRelationship: [{ characterId: 'daigo', dimension: 'trust', value: 50 }],
              },
              setsFlags: ['daigo_studying'],
              closesFlags: ['daigo_alone'],
            },
            {
              routeId: 'alone',
              label: 'Let him sit it alone',
              predicate: { flagsSet: ['knows:daigo_leaving'], afterWorldMinute: 4 * 1440 + 9 * 60 },
              setsFlags: ['daigo_alone'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 40, items: [], flags: ['resit_sat'], abilities: [], reputation: [] },
        },
        {
          id: 'the_handover',
          playerCopy: 'Settle who holds the third floor next term.',
          directorNotes:
            'Whoever it is, Daigo hands it over on the landing, in front of everybody, in one sentence. If the player has thrown in with Mabuchi, Mabuchi simply starts sitting in the plastic chair. If the player has fed the floor and stood up to Daigo with the tab book in their head, they can end the rent altogether, and Daigo will be furious for exactly one evening.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'mabuchi_takes_it',
              label: 'Let Mabuchi take both floors',
              predicate: { flagsSet: ['deal_with_mabuchi'] },
              setsFlags: ['mabuchi_holds_both'],
              closesFlags: ['daigo_holds_it', 'you_hold_the_floor', 'rumi_holds_the_floor', 'no_more_rent'],
            },
            {
              routeId: 'daigo_stays',
              label: 'Daigo passes and keeps the floor',
              predicate: { flagsSet: ['daigo_passed'] },
              setsFlags: ['daigo_holds_it'],
              closesFlags: ['mabuchi_holds_both', 'you_hold_the_floor', 'rumi_holds_the_floor', 'no_more_rent'],
            },
            {
              routeId: 'you_take_it',
              label: 'Take the floor yourself',
              predicate: {
                flagsSet: ['floor_follows_you'],
                flagsUnset: ['turned_on_the_floor'],
                minRelationship: [{ characterId: 'daigo', dimension: 'respect', value: 60 }],
              },
              setsFlags: ['you_hold_the_floor'],
              closesFlags: ['mabuchi_holds_both', 'daigo_holds_it', 'rumi_holds_the_floor', 'no_more_rent'],
            },
            {
              routeId: 'rumi_takes_it',
              label: 'Back Rumi to run it',
              predicate: {
                flagsSet: ['used:have_their_back'],
                minRelationship: [{ characterId: 'rumi', dimension: 'trust', value: 60 }],
              },
              setsFlags: ['rumi_holds_the_floor'],
              closesFlags: ['mabuchi_holds_both', 'daigo_holds_it', 'you_hold_the_floor', 'no_more_rent'],
            },
            {
              routeId: 'end_the_rent',
              label: 'End the rent for good',
              predicate: { flagsSet: ['used:stand_your_ground', 'knows:the_noodle_money', 'floor_fed'] },
              setsFlags: ['no_more_rent'],
              closesFlags: ['mabuchi_holds_both', 'daigo_holds_it', 'you_hold_the_floor', 'rumi_holds_the_floor'],
            },
          ],
          rewards: { xp: 100, items: [], flags: ['the_floor_decided'], abilities: [], reputation: [{ factionId: 'faction_third', amount: 10 }] },
        },
      ],
    },
    {
      id: 'q_dead_camera',
      title: 'The Dead Camera',
      summary:
        'The camera over the back-stairs landing has been dead for two years, and everything the third floor settles on those stairs depends on it staying that way.',
      kind: 'LEAD',
      discoverWhen: { flagsSet: ['knows:the_floor'] },
      involvedCharacterIds: ['rumi', 'fujii', 'daigo'],
      involvedLocationIds: ['back_stairs'],
      knownRewardCopy: 'The answer to who killed it, and the choice of whether it comes back on.',
      steps: [
        {
          id: 'why_dead',
          playerCopy: 'Find out why the camera on the back stairs is dead.',
          directorNotes:
            'Everybody assumes Daigo broke it. Rumi pulled the fuse two years ago after its footage got a first-year evicted for a shove, and the warden has known all along and left it. Either of them says so to somebody who asks straight and does not assume.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'rumi_said',
              label: 'Hear it from Rumi',
              predicate: { minRelationship: [{ characterId: 'rumi', dimension: 'trust', value: 55 }] },
              setsFlags: ['knows:the_camera'],
              closesFlags: [],
            },
            {
              routeId: 'fujii_said',
              label: 'Hear it from the warden',
              predicate: { minRelationship: [{ characterId: 'fujii', dimension: 'trust', value: 45 }] },
              setsFlags: ['knows:the_camera'],
              closesFlags: [],
            },
            {
              routeId: 'looked_yourself',
              label: 'Look at the camera yourself',
              predicate: { flagsSet: ['used:read_the_floor'], atLocation: 'back_stairs' },
              setsFlags: ['knows:the_camera'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 30, items: [], flags: ['camera_questioned'], abilities: [], reputation: [{ factionId: 'faction_office', amount: 5 }] },
        },
        {
          id: 'on_or_off',
          playerCopy: 'Decide whether the camera stays dead.',
          directorNotes:
            'Putting the fuse back takes ten minutes and a screwdriver. A working camera records the landing, which ends the stairs and also records anybody walking a sports bag down from the fourth floor. Leaving it dead is a choice too, and the floor will treat it as one.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'fixed_it',
              label: 'Put the fuse back',
              predicate: { flagsSet: ['used:fix_it'], atLocation: 'back_stairs' },
              setsFlags: ['camera_fixed'],
              closesFlags: ['camera_left_dead'],
            },
            {
              routeId: 'left_it',
              label: 'Leave it dead',
              predicate: { flagsSet: ['review_held'] },
              setsFlags: ['camera_left_dead'],
              closesFlags: ['camera_fixed'],
            },
          ],
          rewards: { xp: 30, items: [], flags: ['camera_decided'], abilities: [], reputation: [] },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_mabuchi_brings_oranges',
      atWorldMinute: 22 * 60 + 30,
      locationId: 'common_room',
      publicCopy:
        'A tall man in a pressed navy jacket comes down from the fourth floor with a bag of oranges, says good evening to the whole third floor by name, and offers you the first one.',
      directorNotes:
        'Mabuchi, here because Bunta told him this afternoon that the transfer was getting 307. He is checking whether the new resident has looked under the bunk yet, and being charming about it. Daigo does not take an orange. Rumi watches Mabuchi the way she watches a frayed cable.',
      setsFlags: ['mabuchi_came_down'],
      cancelledByFlags: ['left_the_map'],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'mabuchi', toLocationId: 'common_room' }],
    },
    {
      id: 'we_curfew_first_night',
      atWorldMinute: 23 * 60,
      locationId: null,
      publicCopy:
        'The front door locks at eleven with a clank you can hear on the third floor, and a ring of keys starts slowly up the back stairs.',
      directorNotes:
        'The warden’s round. She walks every floor and lingers on the back-stairs landing. Anybody on the landing, or out of the building, is in her book by midnight unless they have a reason she believes.',
      setsFlags: ['curfew_monday'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_review_notice',
      atWorldMinute: 1440 + 7 * 60 + 30,
      locationId: null,
      publicCopy:
        'A notice goes up on every floor of East Hall: the housing review is Friday at ten in the warden’s office, and one floor will close at the end of term.',
      directorNotes:
        'Everybody already knew. Seeing it typed makes it real. The third floor reads it in silence; the fourth floor reads it and goes back to bed.',
      setsFlags: ['knows:the_review'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_stipend_late',
      atWorldMinute: 1440 + 18 * 60,
      locationId: null,
      publicCopy: 'Every phone on the third floor buzzes at once with the same message: this month’s student stipend is delayed by a week.',
      directorNotes:
        'Half the floor was already living on rice. Ken starts counting the sack. Daigo goes very quiet and then very loud. This is the week the rent was invented for.',
      setsFlags: ['stipend_late'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_roof_at_night',
      atWorldMinute: 2 * 1440 + 30,
      locationId: 'the_roof',
      publicCopy: 'Daigo is on the roof after midnight with a can of coffee and a folded slip of paper he puts away when he hears the door.',
      directorNotes:
        'He has been waiting to see whether the new resident would come up. If the player is here, he tells them about Friday at nine, in four sentences, looking at the cranes. He does not ask for help.',
      setsFlags: ['knows:daigo_leaving'],
      cancelledByFlags: [],
      requiresFlags: ['daigo_noticed_you'],
      movesCharacters: [{ characterId: 'daigo', toLocationId: 'the_roof' }],
    },
    {
      id: 'we_the_inspection',
      atWorldMinute: 2 * 1440 + 21 * 60,
      locationId: 'room_307',
      publicCopy:
        'The warden knocks on 307 with her keys already out, Mabuchi a polite step behind her, and asks you to stand in the corridor while she checks under the bunks.',
      directorNotes:
        'Mabuchi tipped her off. If the grinder is still taped under the bunk, she finds it, in its blue-striped towel, and the player is in exactly the position Shun Arai was. She is visibly unhappy about it. She also notices the towel.',
      setsFlags: ['caught_with_the_grinder'],
      cancelledByFlags: ['has_the_grinder', 'bed_307_answered', 'left_the_map'],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'fujii', toLocationId: 'room_307' },
        { characterId: 'mabuchi', toLocationId: 'room_307' },
      ],
    },
    {
      id: 'we_wednesday_overpass',
      atWorldMinute: 2 * 1440 + 22 * 60 + 40,
      locationId: 'canal_lane',
      publicCopy: 'A tall figure in a navy jacket walks along the canal towards the overpass with a heavy sports bag on one shoulder.',
      directorNotes:
        'Mabuchi’s Wednesday run to the scrap dealer under the overpass. Anybody who follows at a distance sees the boot of the car open and the bag go in. He comes back with the bag empty and folded.',
      setsFlags: ['knows:the_buyer'],
      cancelledByFlags: [],
      requiresFlags: ['knows:the_towels'],
      movesCharacters: [{ characterId: 'mabuchi', toLocationId: 'canal_lane' }],
    },
    {
      id: 'we_ken_lets_slip',
      atWorldMinute: 3 * 1440 + 20 * 60 + 30,
      locationId: 'dorm_kitchen',
      publicCopy: 'Ken, washing twenty-two bowls, says to nobody in particular that it will be strange next year without Daigo.',
      directorNotes:
        'He assumes the player knows. When it is clear they do not, he is mortified and tells them the rest: the resit, the results slip, Friday at nine.',
      setsFlags: ['knows:daigo_leaving'],
      cancelledByFlags: [],
      requiresFlags: ['floor_fed'],
      movesCharacters: [],
    },
    {
      id: 'we_the_resit',
      atWorldMinute: 4 * 1440 + 9 * 60 + 40,
      locationId: 'workshops',
      publicCopy: 'Daigo walks out of the exam room twenty minutes early, sees you, and nods once.',
      directorNotes:
        'He passed, and he knows it before the results come out on Monday. He will not say so in words. He will say "Rent’s due" to somebody new next term, and mean something different by it.',
      setsFlags: ['daigo_passed'],
      cancelledByFlags: [],
      requiresFlags: ['daigo_studying'],
      movesCharacters: [{ characterId: 'daigo', toLocationId: 'workshops' }],
    },
    {
      id: 'we_the_review',
      atWorldMinute: 4 * 1440 + 10 * 60,
      locationId: 'warden_office',
      publicCopy:
        'The housing review begins in the warden’s office: three chairs, one desk, the incident book open on it, and the door left exactly wide enough for the corridor to hear.',
      directorNotes:
        'The warden, Mabuchi for the fourth floor, Daigo for the third, and whoever the player has brought. It takes fifteen minutes. Everything that decides it was settled earlier in the week.',
      setsFlags: ['review_held'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'fujii', toLocationId: 'warden_office' },
        { characterId: 'mabuchi', toLocationId: 'warden_office' },
        { characterId: 'daigo', toLocationId: 'warden_office' },
      ],
    },
  ],
  promises: [
    {
      id: 'p_the_rent',
      kind: 'FINALE',
      label: 'Who holds the third floor, and whether there is still a rent',
      seedHint: 'Twenty-two plastic bowls with names on the bottom and one blank one on top.',
      payoffHint: 'Somebody sits in the plastic chair at the head of the table, and everybody on the floor knows why it is them.',
      weight: 1,
    },
    {
      id: 'p_bed_307',
      kind: 'MYSTERY',
      label: 'What really happened to the last person in your bunk',
      seedHint: 'A new mattress on an old frame, and a scrap of paper that does not belong in the window.',
      payoffHint: 'A blue-striped towel, a padlocked shower block and a car under the overpass on a Wednesday night.',
      weight: 0.9,
    },
    {
      id: 'p_daigo',
      kind: 'RELATIONSHIP',
      label: 'What Daigo is really collecting rent for',
      seedHint: 'He never eats a bowl of the rent himself, and pays Ken for something nobody saw him order.',
      payoffHint: 'A column marked D. in a greasy notebook and a results slip folded small under a brick.',
      weight: 0.85,
    },
    {
      id: 'p_mabuchi',
      kind: 'RIVAL',
      label: 'The polite man upstairs who wants your floor closed',
      seedHint: 'Oranges, your name before you have said it, and very clean trainers in a very dirty building.',
      payoffHint: 'He stops smiling, for the first time, in the warden’s office.',
      weight: 0.85,
    },
    {
      id: 'p_the_camera',
      kind: 'THEME',
      label: 'Whether the landing should ever be watched',
      seedHint: 'A camera over the back stairs whose red light has been off for two years.',
      payoffHint: 'Somebody holds the fuse in their hand and decides.',
      weight: 0.6,
    },
  ],
  archetypes: [
    {
      id: 'arch_kitchen',
      name: 'You Train as a Cook',
      role: 'Cooking and talk',
      summary: 'You study cooking at the college, which in a building that runs on noodles makes you the most useful person on the floor by Tuesday.',
      playstyle: ['Feeds people', 'Talks well', 'Avoids fights'],
      blurb: 'Two years of service kitchens taught you to feed thirty people on nothing and to talk to anybody while you do it.',
      attributeBonus: { presence: 2, mind: 1 },
      skillProficiencies: { cooking: 3, front: 1 },
      startingItems: [{ itemId: 'knife_roll', qty: 1 }],
      startingAbilities: ['cook_for_the_floor', 'sit_down_and_eat'],
      startingReputation: [],
    },
    {
      id: 'arch_wiring',
      name: 'You Train as an Electrician',
      role: 'Technical and observant',
      summary: 'You study electrical work, so you notice what in this building is wired wrong, what draws too much power, and who has been tampering with it.',
      playstyle: ['Technical', 'Notices things', 'Patient'],
      blurb: 'You can trace a fault through three floors of bad wiring, and people turn out to be wired much the same way.',
      attributeBonus: { mind: 2, arcana: 1 },
      skillProficiencies: { shopwork: 3, street_sense: 2 },
      startingItems: [{ itemId: 'multimeter', qty: 1 }],
      startingAbilities: ['fix_it', 'read_the_floor'],
      startingReputation: [{ factionId: 'faction_office', amount: 5 }],
    },
    {
      id: 'arch_steel',
      name: 'You Train as a Steel Fixer',
      role: 'Strength and defence',
      summary: 'You study structural steelwork, which means a year of carrying it up scaffolding. You are the one person here who could take the stairs and win.',
      playstyle: ['Physical', 'Stubborn', 'Hard to move'],
      blurb: 'You have carried steel up nine floors of scaffolding in the rain, and a man with his boots on a table does not frighten you much.',
      attributeBonus: { might: 3, resolve: 1 },
      skillProficiencies: { brawling: 2, nerve: 2 },
      startingItems: [{ itemId: 'work_gloves', qty: 1 }],
      startingAbilities: ['take_the_stairs', 'stand_your_ground'],
      startingReputation: [{ factionId: 'faction_third', amount: 5 }],
    },
    {
      id: 'arch_engines',
      name: 'You Train as a Mechanic',
      role: 'Speed and stealth',
      summary: 'You study engines and own a scooter that starts on the third try, so you are quick, hard to pin down, and very good at being somewhere else.',
      playstyle: ['Quick exits', 'Bluffs', 'Out after curfew'],
      blurb: 'You can talk your way into any garage in town and out of most trouble, and when talking fails the scooter usually starts.',
      attributeBonus: { agility: 3, presence: 1 },
      skillProficiencies: { footwork: 2, front: 2 },
      startingItems: [{ itemId: 'scooter_key', qty: 1 }],
      startingAbilities: ['slip_away', 'talk_big'],
      startingReputation: [],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What does the floor call you, once it stops calling you Transfer?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Kai Morrow' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. she/her' },
    {
      id: 'archetype',
      label: 'What do you study here?',
      helpText:
        'The trade you transferred to the technical college to learn, which sets what you are good at in East Hall. It is fixed for the whole story and cannot be changed later. It does not decide whether you pay the rent, take the stairs or walk out. All of that is yours.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'What does the floor find out about you in the first week?',
      helpText: 'One plain sentence about who you are. The floor will find it out whether you tell them or not.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. I have never once backed down from a bet, and I have lost most of them.',
    },
    {
      id: 'why_you_transferred',
      label: 'Why did you transfer halfway through the year?',
      helpText: 'A starting reason, not a script. You can tell the floor the truth, a lie, or nothing at all.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'asked_to_leave', label: 'My last college asked me to leave, and I would rather not say why' },
        { id: 'followed_the_work', label: 'The course I wanted only runs here' },
        { id: 'cheaper', label: 'This is the cheapest place to study a trade in the country' },
        { id: 'starting_over', label: 'I wanted to start over somewhere nobody knew me' },
        { id: 'family', label: 'Family, and that is all anybody is getting' },
      ],
    },
    {
      id: 'appearance',
      label: 'What does the third floor see in the doorway?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. A duffel bag, a borrowed jacket, and the face of somebody who has already decided not to pay.',
    },
  ],
  /**
   * Where this can end up.
   *
   * Four of twelve are losses: the floor closed with nobody to blame, the
   * floor closed with the player blamed for it, the floor closed after it
   * stormed upstairs, and both floors in Mabuchi's pocket. "The Last Bus Out"
   * is walking away and is open from early on. The romance is one ending of
   * twelve and needs the camera's secret, because that is the night on the
   * roof it is about.
   */
  endings: [
    {
      id: 'end_the_floor_stands',
      name: 'The Floor Stands',
      rarity: 'COMMON',
      minTurn: 26,
      requires: {
        flagsSet: ['floor_saved'],
        flagsUnset: ['you_hold_the_floor', 'no_more_rent', 'mabuchi_holds_both', 'rumi_holds_the_floor', 'daigo_holds_it'],
      },
      condition:
        'The third floor survived the review and nothing else about it changed: the rent, the stairs, the plastic chair, all still there. The player got through the week and helped keep twenty-two people housed. Write it as an ordinary loud evening in the common room, the player one face among many, with a bowl that has their name on the bottom now.',
      epilogue:
        'The noticeboard gets a seventh handwriting. Next term a new transfer stands in the corridor with a bag, and the whole floor turns to look, and somebody says "Rent’s due." Nobody asks whether it should be.',
      hint: '',
    },
    {
      id: 'end_rent_is_due',
      name: 'Rent’s Due, Transfer',
      rarity: 'UNCOMMON',
      minTurn: 30,
      requires: {
        flagsSet: ['floor_saved', 'you_hold_the_floor'],
        minFactionReputation: [{ factionId: 'faction_third', value: 30 }],
      },
      condition:
        'Daigo handed the floor to the player on the landing, in one sentence, and the floor accepted it. The player now sits in the plastic chair. Write the first time they have to collect the rent from somebody new, and let them decide in the moment what the rule is now. Daigo is in the doorway, pretending not to watch.',
      epilogue:
        'Next term, a transfer with a bag stands in the corridor and the whole floor turns to look at the chair. The player takes their boots off the table, or does not. Twenty-two bowls, or the stairs, or something nobody on the floor has heard before.',
      hint: '',
    },
    {
      id: 'end_free_noodles',
      name: 'Free Noodles on Thursdays',
      rarity: 'RARE',
      minTurn: 32,
      requires: { flagsSet: ['floor_saved', 'no_more_rent'] },
      condition:
        'The player ended the rent. They read the tab book, fed the floor through the last week of the month, and stood in front of Daigo and said no to the whole system in front of everybody, with a better one ready. Daigo was furious for one evening. Write the first Thursday of the new rota: everybody cooks, nobody pays, and Ken pretending to hate it.',
      epilogue:
        'There is a rota on the noticeboard now, in Rumi’s handwriting, with every name on it including Daigo’s. The column marked D. in Ken’s book stops growing. Some Thursdays the noodles are terrible, and everybody eats them anyway.',
      hint: '',
    },
    {
      id: 'end_rumis_rota',
      name: 'Rumi’s Rota',
      rarity: 'UNCOMMON',
      minTurn: 30,
      requires: { flagsSet: ['floor_saved', 'rumi_holds_the_floor'] },
      condition:
        'The player stood next to Rumi in public until the floor accepted her as its head, the first one who never once paid the rent. She runs it like a circuit: everything labelled, everything voted on, nothing settled on the stairs. Write her first floor meeting, which overruns by an hour, and Daigo voting against everything and losing.',
      epilogue:
        'The plastic chair goes in the skip. The floor votes on what replaces it and the vote takes three weeks. In the end it is a bench, so that nobody sits at the head of anything, and Rumi sits at the end of it with a screwdriver behind her ear.',
      hint: '',
    },
    {
      id: 'end_one_more_year',
      name: 'One More Year',
      rarity: 'UNIQUE',
      minTurn: 34,
      requires: { flagsSet: ['floor_saved', 'daigo_passed', 'daigo_holds_it'] },
      condition:
        'The player sat with Daigo and walked him through the written paper until he could do it, and he passed. He keeps the floor for one more year, and everybody on it knows who got him through. Write him being exactly as loud as before and, once, on the roof, saying thank you in a way that does not use those words.',
      epilogue:
        'The results slip goes on the noticeboard, unfolded, with the word PASS circled in welding marker. Nobody mentions it. Daigo stops eating standing up, most days. He still calls the player Transfer, but only when other people can hear.',
      hint: '',
    },
    {
      id: 'end_boxes_in_the_corridor',
      name: 'Boxes in the Corridor',
      rarity: 'COMMON',
      minTurn: 26,
      requires: { flagsSet: ['floor_closed'], flagsUnset: ['framed'] },
      condition:
        'The review closed the third floor. Too many incidents, not enough proof, and a fourth floor that looked spotless. This is a real loss and should be written as one: twenty-two people packing on a weekday, Daigo carrying other people’s boxes down the front stairs, the noodle bowls in a bin bag.',
      epilogue:
        'The third floor is empty by the end of term. Some of its residents end up on the fourth floor, saying good morning to Mabuchi on the stairs. The rest scatter across town. Ken still keeps a column for each of them in the tab book, and some of them still pay it.',
      hint: '',
    },
    {
      id: 'end_bed_307_again',
      name: 'Bed 307, Again',
      rarity: 'UNCOMMON',
      minTurn: 24,
      requires: { flagsSet: ['framed', 'floor_closed'] },
      condition:
        'The warden found the grinder under the player’s bunk, exactly as she found the drill under Shun Arai’s, and the floor closed with the player’s name on its last incident. Write it as the player packing the same room Shun packed, the warden watching from the corridor and visibly unhappy, and Mabuchi helpfully holding the door.',
      epilogue:
        'The player leaves a note folded small in the gap of the 307 window frame before they go. The room stays empty until the building is sold. Nobody ever finds out whether the next person would have read it.',
      hint: '',
    },
    {
      id: 'end_both_floors',
      name: 'Both Floors',
      rarity: 'RARE',
      minTurn: 30,
      requires: { flagsSet: ['mabuchi_holds_both'] },
      condition:
        'The player took Mabuchi’s offer and told the floor a story, and Mabuchi now runs the third floor as well as the fourth. The rent is gone. So is the noise. Write it as a quiet, clean, orderly evening in the common room, the player with a clean record and a very good room, and nobody laughing.',
      epilogue:
        'The tool room audit finds nothing missing, because the paperwork is perfect. The plastic chair is replaced by a desk at the top of the stairs. Daigo moves out at the end of term without saying goodbye to anybody, and the fourth floor sends him a card.',
      hint: '',
    },
    {
      id: 'end_headfirst',
      name: 'Headfirst',
      rarity: 'RARE',
      minTurn: 30,
      requires: { flagsSet: ['took_the_stairs', 'the_floor_settled_it', 'floor_closed'] },
      condition:
        'The player took the stairs on the first night, earned the floor, and then led it straight up the back stairs to the fourth floor and dragged the stolen tools out of the dry showers into the corridor. They were right, and it was a fight in public, and the third floor closed for it. Write it as a loss the floor is proud of.',
      epilogue:
        'The tools go back to the workshops. Mabuchi is expelled in the same week the third floor is emptied, which nobody on the third floor thinks is a fair trade and nobody regrets. Years later, in a garage or a kitchen somewhere, somebody still tells the story of the night the Kettle went upstairs.',
      hint: '',
    },
    {
      id: 'end_camera_on',
      name: 'Camera On',
      rarity: 'UNCOMMON',
      minTurn: 28,
      requires: {
        flagsSet: ['camera_fixed', 'mabuchi_reported'],
        minFactionReputation: [{ factionId: 'faction_office', value: 40 }],
      },
      condition:
        'The player put the fuse back in the camera over the landing and took the evidence to the warden instead of the stairs. The building is safer and the stairs are over. Write the first evening the red light is on: nobody stands on the landing, and nobody quite knows what to do with their hands.',
      epilogue:
        'The warden gives the player a key to the roof door, which she has never given anybody. The floor settles arguments in the common room now, loudly and badly. Daigo, of all people, says he prefers it, and nobody believes him.',
      hint: '',
    },
    {
      id: 'end_the_roof',
      name: 'The Roof After Curfew',
      rarity: 'RARE',
      minTurn: 30,
      requires: {
        flagsSet: ['knows:the_camera'],
        minRelationship: [{ characterId: 'rumi', dimension: 'affection', value: 75 }],
      },
      condition:
        'Rumi told the player she was the one who killed the camera, and the player did not hold it against her. Somewhere in that week, on the roof after curfew, the radio that only gets one station went off and neither of them moved. Romance up to one kiss and no further; write it as two people who argue for a living deciding to stop for a minute.',
      epilogue:
        'The radio gets a second station, eventually. Rumi fixes it on the roof one night while the player holds the torch, and says it was never actually broken, and the player says they know.',
      hint: '',
    },
    {
      id: 'end_last_bus',
      name: 'The Last Bus Out',
      rarity: 'UNCOMMON',
      minTurn: 16,
      requires: { flagsSet: ['left_the_map'], flagsUnset: ['floor_follows_you'] },
      condition:
        'The player decided East Hall was not worth it, whatever it was, and left with their bag before the floor had decided anything about them. Nobody stops them. Write it without judgement: the canal, the last bus, the lit windows of the third floor getting smaller.',
      epilogue:
        'The 307 bunk is empty again by Friday. Bunta keeps the player’s side of the room tidy for a week in case they come back. The floor never learns their name, and calls them Transfer whenever the story comes up, which is less often every month.',
      hint: '',
    },
  ],
  opening:
    "\"Rent’s due, Transfer.\"\n\nDaigo doesn’t get up. His boots are on the common-room table, a scorched welding jacket hangs off his shoulders, and beside his heel stands a tower of empty noodle bowls.\n\nTwenty-two of them. One for everybody on the third floor, and everybody on the third floor is watching you.\n\n\"Noodles for the whole floor. Tonight.\" He tips his chin at the stairwell door behind you. \"Or the stairs. Headfirst.\"\n\nSomebody laughs. A woman in a doorway, screwdriver behind her ear, doesn’t.\n\n\"You don’t have to answer him,\" she says.\n\n\"Rumi.\" Daigo hasn’t looked away from you once. \"Let the Transfer talk.\"\n\nThe corridor goes quiet.\n\n\"Well? Noodles, or the stairs?\"",
  openingSuggestions: [
    "\"Twenty-two bowls? Fine. I’ll cook them myself. Where’s the kitchen?\"",
    'I step around his boots and carry my bag down the corridor to my room.',
    "I hold the stairwell door open for him. \"After you.\"",
  ],
  coverDirection: [
    'SUBJECT: Daigo Hatanaka, a broad, tall man with close-cropped black hair and a pale scar through his left eyebrow, alone and unmistakable in the foreground of a key visual for a delinquent dormitory comedy anime.',
    'He sits sprawled in a cheap plastic chair, centred and close, filling about two thirds of the frame, both steel-toed boots up on a scuffed table.',
    'He wears a scorched brown leather welding jacket open over a white T-shirt, arms folded, chin lifted, a slow challenging grin, looking straight at the viewer.',
    'Beside his boots on the table stands a tall, leaning tower of empty white plastic noodle bowls.',
    'BEHIND HIM, soft and secondary: a long shabby dormitory corridor at night with propped-open doors and residents leaning out to watch,',
    'and in one doorway a slim woman with black hair tied back with electrical tape and a small screwdriver behind her ear, arms folded, unimpressed.',
    'LIGHT: green-white fluorescent tubes overhead, warm steam drifting through the frame, a red exit sign glowing over a stairwell door.',
    'Loud, funny, confident, a little dangerous. No blood, no injuries, no weapons anywhere.',
    'TITLE: the words NOODLES OR BLOOD painted into the art in the upper third as a bold brush-lettered logo, white with a red outline,',
    'spelled exactly NOODLES OR BLOOD, large and legible at thumbnail size. No other text anywhere.',
  ].join(' '),
  publishedAt: null,
};

export const NOODLES_OR_BLOOD = StoryVersion.parse(raw);
