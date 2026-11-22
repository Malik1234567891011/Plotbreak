import { StoryVersion } from '@plotbreak/contracts';

/**
 * "The Only Man at Thornwitch" — a witch college that let a man in, and the
 * headmistress's raven that will not go back to her.
 *
 * Bible: `docs/story-bibles/new50/15_THE_ONLY_MAN_AT_THORNWITCH.md`. Slate #15
 * of fifty, Drop 2. Shape copied from Good Morning, Husband; conventions from
 * the pilot, Skill: ERROR.
 *
 * Playable span: five days on one tidal island, from the First Calling at ten
 * past nine on day 0 to the Severing that Hester Crane has scheduled for the
 * afternoon of day 4. The Seven Chairs arrive on day 3, the Equinox lamp has to
 * be lit that night, and the governors sit on day 4, the fifth morning. That
 * clock is the spine. Everything after it lives in the endings.
 *
 * The only-man premise is comedy of logistics and attention, never of bodies:
 * no men's robe, no men's dormitory, one small table by the kitchen door, four
 * hundred heads turning. The app is rated 13+, so romance goes as far as a kiss
 * and the room Nadia shares with the player is a curtain, a rota and a hen.
 *
 * Production runs `runTurnPure`, which reads the premise, tone guide, hard
 * canon, cast, opening, style examples, places, quest items, factions, quest
 * summaries, world events and the first twelve endings. It never sees
 * resources, step notes, promises or any ability except the chosen archetype's
 * starting ones. So the raven rule and the clock are in hard canon, the letter
 * the Hedge sent is a starting quest item, every archetype starts with Ask the
 * Raven, world-event notes carry their own day and hour, and there are exactly
 * twelve endings.
 *
 * The mystery of why the Hedge opened is optional, the way Platform 11 is in
 * Good Morning, Husband. `q_why_the_hedge` is a LEAD that only a player who
 * walked the Hedge, followed Ivy at night or went looking can discover, and
 * nine of the twelve endings never need it. A player who spends five days on
 * supper, a duel, a roommate and a headmistress gets a whole game.
 *
 * Three invisible variables. Energy is the one honest GOOD_HIGH, because
 * `resolveRest` refills those. Scrutiny comes first among the descending pair
 * on purpose: public violence raises the first GOOD_LOW in array order, and a
 * hex thrown in a cloister makes the college watch harder before it does
 * anything else. Strain is what carrying a three-hundred-year-old familiar
 * costs a body that was trained for none of it.
 */

const raw = {
  id: 'sv_the_only_man_at_thornwitch_1',
  storyId: 'story_the_only_man_at_thornwitch',
  version: 1,
  title: 'The Only Man at Thornwitch',
  fantasyLabel: 'Her raven chose you. Explain yourself.',
  hook: 'You are the first man the witch college has let in for three hundred years. On your first morning, your circle summoned the headmistress’s raven, and he will not go back.',
  premise:
    'Thornwitch is the oldest college of witchcraft in the country: four hundred students, all adults, on a tidal island inside a living hedge of blackthorn forty feet high. The Hedge decides who comes in, and nobody can overrule it. For three hundred years it has opened only for women. This autumn it opened for you.\n\n' +
    'The college had six weeks’ notice and did not use them well. There is no men’s robe, so you wear the groundskeeper’s spare. There is no men’s dormitory, so you share Room Nine with a second-year herb witch, her hen, and a curtain down the middle.\n\n' +
    'On your first morning every new student chalks a circle and calls a familiar. Fifty-nine witches got toads, moths and sparrows. Your circle called Sexton, the headmistress’s raven of twenty-one years, and he refused to go back.\n\n' +
    'So now the whole college is watching you. Headmistress Morgaine Ashdown needs her raven back before the governors sit in five days to decide whether she keeps her post. Ivy Calder, the top student, was promised him. The deputy head has a paper that can cut the bond, and your magic with it.\n\n' +
    'Nobody will tell you why the Hedge let a man in. Somebody on this island knows.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Magic academy', 'Romance', 'Comedy', 'Rivalry', 'Mystery'],
  mechanicsChips: [
    'The only man in four hundred',
    'A raven who will not go back',
    'A duel at seven in the morning',
    'Five days to the governors',
    'The mystery is optional',
  ],
  contentDescriptors: ['ROMANCE', 'FANTASY_VIOLENCE', 'MORAL_AMBIGUITY'],
  intensity: 'LIGHT',
  creatorNote:
    'You are the first man this college has let in for three hundred years, and on your first morning you walked off with the headmistress’s bird. You can spend five days hiding, showing off, losing a duel to the best witch in the building, making a friend of your roommate, or finding out why the Hedge opened at all. Everybody here is better at magic than you. Nobody here is used to you.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: true,
    allowsRomance: true,
    startingLocationId: 'calling_hall',
    startWorldMinute: 9 * 60 + 10,
    startingItems: [
      { itemId: 'hedge_letter', qty: 1 },
      { itemId: 'groundskeepers_robe', qty: 1 },
    ],
    hardCanon: [
      'Everyone in this story is an adult. The player is a man of twenty-one. Morgaine Ashdown is fifty-eight, Ivy Calder twenty-two, Nadia Kowal twenty, Hester Crane forty-seven and Tobias Fenn seventy-three. Cass, a cat, is ninety-one by her own count, and Sexton, a raven, is over three hundred. Bea Lowrie, Nadia’s former roommate, is twenty-one, and the late headmistress Agnes Pryor died at seventy-four. Thornwitch is a college: every student is at least eighteen, and most first-years are between eighteen and twenty-two.',
      'Thornwitch College is the oldest college of witchcraft in the country: four hundred students over four years, on a tidal island called the Holm in a cold grey estuary. A ferry run by Tobias Fenn crosses to the mainland, and twice a day at low tide a stone causeway opens for about forty minutes.',
      'The island is ringed by the Hedge, a living wall of blackthorn and briar forty feet high, planted by the seven founders three hundred years ago. It is the college’s ward and its gatekeeper. Every applicant walks up to the Hedge Gate alone on Admission Night, and it opens or it does not. Nobody, the headmistress included, can overrule it.',
      'For three hundred years the Hedge opened only for women. This year it opened for the player, the first man admitted since. His admission letter arrived on the headmistress’s desk already addressed, in a hand nobody at the college writes. The college had six weeks’ notice: he wears the groundskeeper’s spare robe, shares Room Nine in the North Tower with Nadia Kowal behind a curtain on a rope, and eats at a small table by the refectory’s kitchen door with a card on it that says GENTLEMAN.',
      'At the First Calling every first-year chalks a circle and calls, and whatever answers is their familiar for four years. A familiar cannot be ordered away. It can only be asked, or cut away by the Severing, which takes the witch’s craft with it for good. The player’s circle called Sexton, Morgaine Ashdown’s raven, who has sat on the shoulders of headmistresses for three hundred years. He will not leave the player and goes wherever the player goes.',
      'Sexton speaks in one to four words, cannot lie, never explains, and will not say a word within arm’s reach of Hester Crane: when she comes close he goes silent until she has gone. He will not go back to Morgaine’s shoulder while the Hedge has no keeper and she goes on pretending she can carry the college alone. Either of those changing would free him.',
      'The Seven Chairs are the college’s governors. They arrive by ferry on the fourth day and sit on the fifth morning to reconfirm Morgaine as headmistress for seven more years, or replace her. On the fourth night she must light the Equinox lamp alone in front of them. Hester Crane, the deputy head, wants the chair and holds a writ to perform the Severing on the player on the fifth afternoon.',
      'Rule Forty-One: a student who raises a hand or a hex against a witch anywhere but inside a duelling circle on the Bowl is sent down on the next ferry. Duels on the Bowl are legal, fought with chalk circles, and end when one circle breaks. Nobody is badly hurt in a duel; that is what the circles are for.',
      'The player’s craft is real and untrained. He can chalk a circle and throw a first-year’s stinging hex like anyone else, he can ask the raven things, and the bond gives him more only as it deepens. Every witch here is better at magic than he is.',
      'Never volunteered, only earned: three hundred years ago the college had two offices. The headmistress ran the college; the Hedgewarden kept the Hedge with the founders’ shears, and the Hedgewarden was by custom not a witch. The last one was a man. In a bad year the governors voted to close the gate to men and struck the Hedgewarden out of the Charter. That vote is the Closing, and everyone now believes the Hedge closed itself. Since then the raven has carried both jobs, and the north end of the Hedge, the Grey Reach, is slowly dying.',
      'Never volunteered, only earned: Morgaine’s own craft has been fading for two years and Sexton has been lighting her lamps for her. The Hedge opened for the player because it needs a Hedgewarden again, and Sexton chose him for the same reason. Tobias Fenn’s family has kept the Warden’s Shears wrapped in oilcloth since the Closing, to give to the next man who walks through the gate.',
    ],
    toneGuide:
      'Bright, quick and funny on top, with a real college and real politics underneath. The comedy of being the only man is logistics and attention: the robe that does not fit, the washroom rota, the dinner table by the kitchen door, four hundred heads turning when he walks in. It is never about bodies: no fan service, no lingering descriptions of anyone, and romance is a choice that is slow, earned and goes no further than a kiss. ' +
      'The witches are competent, specific and busy, most of them better at magic than the player, and the prose knows it. Magic is tactile: chalk, salt, thorn, ink, thimbles, smoke, a circle drawn half an inch short. Nobody is a villain. Morgaine is formidable and frightened at once, and the second shows only when it has been earned. Hester is right that something is being hidden. ' +
      'Why the Hedge opened is a mystery for a player who goes looking, and never intrudes on one who does not. If a scene has nothing at stake, let it be pleasant and short: soup, a library window, a hen in a satchel. The face at the top of a beat belongs to whoever reacted to the player most strongly.',
    proseStyle: 'webnovel',
    styleExamples: [
      'Four hundred witches stop eating.\n\nNot all at once. It goes down the long tables like a tide going out: spoons first, then talk, then the witch pouring water, who keeps pouring.\n\nYour table is by the kitchen door. One chair. One card.\n\nGENTLEMAN.\n\nSexton reads it upside down from your shoulder. "Bread first," he says.\n\nAt the second-year table Nadia Kowal puts her face in her hands. "Oh, cod," she says, to nobody. "He’s going to sit there. He’s actually going to sit there."',
      'Ivy chalks her circle without looking at it. It closes the way a good door closes.\n\n"First to break the other’s circle," she says. "No hands. No familiars." A glance at the raven. "No exceptions."\n\nYour chalk snaps on the second stroke.\n\nSomebody on the bank laughs. Ivy does not.\n\n"That’s one to me," she says. "Pick it up. I refuse to beat half a circle."',
    ],
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 11, agility: 10, mind: 11, presence: 11, resolve: 11, arcana: 9 },
  skills: [
    { id: 'charm', name: 'Charm', attribute: 'presence', description: 'Being liked by a room that had decided not to like you.' },
    { id: 'candour', name: 'Candour', attribute: 'resolve', description: 'Saying the true thing to somebody who outranks you, out loud, in front of people.' },
    { id: 'composure', name: 'Composure', attribute: 'resolve', description: 'Keeping your face still while four hundred witches watch you eat soup.' },
    { id: 'notice', name: 'Noticing', attribute: 'mind', description: 'What a witch is doing with her hands while she tells you something else.' },
    { id: 'study', name: 'Study', attribute: 'mind', description: 'Learning from a book in an evening what the others have known for years.' },
    { id: 'circlework', name: 'Circlework', attribute: 'arcana', description: 'Chalk, salt, and the half inch that decides whether a circle holds.' },
    { id: 'hedgecraft', name: 'Hedgecraft', attribute: 'arcana', description: 'Hearing what the raven and the Hedge are trying to tell you.' },
    { id: 'graft', name: 'Graft', attribute: 'might', description: 'Carrying, digging, rowing, lifting. The work a place needs that nobody writes down.' },
    { id: 'slipping_off', name: 'Slipping Off', attribute: 'agility', description: 'Leaving a room unnoticed, which is very hard when you are the only man in it.' },
  ],
  /**
   * Three, all invisible.
   *
   * Energy is the only GOOD_HIGH, so resting restores the day and nothing
   * else. Scrutiny is how hard the college is watching the only man in it,
   * and it comes first so that public violence lands there. Strain is the
   * bond: every use of the raven or the Hedge costs it, and it comes down
   * only with time.
   */
  resources: [
    {
      id: 'energy',
      name: 'Energy',
      max: 100,
      start: 80,
      regenPerHour: 2,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'The player sits down wherever he is, in the middle of whatever is happening, and whoever is nearest decides what happens next. At Thornwitch that is usually somebody with a clipboard.',
      color: '#E9C46A',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Running on nothing. The player answers in single words, misses the joke by a beat, and agrees to things to end the conversation. Chalk lines wobble. This is the band where going back to Room Nine and pulling the curtain is the right move.',
        },
        {
          upTo: 60,
          behaviour:
            'The ordinary tiredness of a long college day. Fine for one more lecture or one more argument, honest about not wanting both. Good for supper and a library window, poor for a duel.',
        },
        {
          upTo: 100,
          behaviour:
            'The day is still ahead. The player has room to be curious, to walk the whole Hedge, to say the difficult thing well rather than bluntly, and to hold a chalk line steady while somebody shouts at him.',
        },
      ],
    },
    {
      id: 'scrutiny',
      name: 'Scrutiny',
      max: 100,
      start: 35,
      regenPerHour: -0.3,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'The college has stopped staring. He is the man by the kitchen door, the one with the raven, and that is all: people pass him the salt without looking up.',
      color: '#8FB1C9',
      bands: [
        {
          upTo: 25,
          behaviour:
            'The college has mostly stopped staring. People nod in the Cloister, the refectory keeps eating when he walks in, and a rule bent quietly stays bent. Hester Crane has nothing new for the folder.',
        },
        {
          upTo: 55,
          behaviour:
            'Four hundred people are still keeping an eye on the only man in the building. Prefects notice where he goes after ten, Nadia gets asked questions on the stairs, and anything odd is in the deputy’s minutes by morning.',
        },
        {
          upTo: 80,
          behaviour:
            'Hester has opened a second folder. Doors that were left unlocked are locked, the fourth year has a betting book on him, and Morgaine spends standing she does not have to keep him on the island.',
        },
        {
          upTo: 100,
          behaviour:
            'The college has decided he is a problem to be managed. Every corridor has somebody in it, Rule Forty-One is quoted at him by people who have never quoted a rule, and the Seven Chairs hear his name before anybody else’s.',
        },
      ],
    },
    {
      id: 'strain',
      name: 'Strain',
      max: 100,
      start: 10,
      regenPerHour: -1.5,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'The bond sits easy. Sexton is a weight on the shoulder and a voice when he chooses, and the Hedge is only a hedge.',
      color: '#7A9E7E',
      bands: [
        {
          upTo: 25,
          behaviour:
            'The bond sits easy. The raven is a weight on the shoulder and nothing more, the Hedge is only a hedge, and the player sleeps through the night behind the curtain.',
        },
        {
          upTo: 55,
          behaviour:
            'Carrying a three-hundred-year-old familiar is starting to show. The player hears the Hedge creak at night, dreams in black and white from a great height, and gets a headache behind the eyes after asking Sexton anything long.',
        },
        {
          upTo: 80,
          behaviour:
            'Too much, too fast. His hands shake when he chalks, the raven’s thoughts arrive in his head as if they were his own, and blackthorn flowers wherever he leans. Somebody competent will notice and say so.',
        },
        {
          upTo: 100,
          behaviour:
            'The bond is doing two jobs through a body trained for neither. He loses minutes, sees through the raven without meaning to, and the Hedge leans toward him as he passes. Rest is no longer optional.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'hedge_letter',
      name: 'The Hedge’s Letter',
      tags: ['quest', 'document'],
      questItem: true,
      droppable: false,
      description:
        'Your admission letter, on paper that is not quite paper: it bends like a leaf and smells of blackthorn. It arrived on the headmistress’s desk already addressed to you, in a hand nobody at the college writes. Under the signature line there is no name, only a small drawing of a pair of shears.',
      loreText:
        'Every other letter this year was signed by Morgaine Ashdown. This one was not signed by anybody, and she had to argue the governors into honouring it.',
      icon: 'letter',
    },
    {
      id: 'groundskeepers_robe',
      name: 'The Groundskeeper’s Robe',
      tags: ['clothing'],
      droppable: false,
      description:
        'There is no men’s robe at Thornwitch, so you wear the groundskeeper’s spare: brown instead of black, three inches short in the arm, and smelling faintly of creosote and onions.',
      loreText: 'Somebody has sewn the college crest onto the pocket in a hurry, upside down.',
      icon: 'cloak',
    },
    {
      id: 'chalk_stub',
      name: 'A Stick of Chalk',
      tags: ['tool'],
      stackable: true,
      maxStack: 6,
      skillModifiers: { circlework: 1 },
      description: 'College chalk, white and hard, cut square so it does not roll. Every first-year is issued a box and loses it by Thursday.',
      loreText: 'Good chalk squeaks. Ivy Calder can tell from across a hall whose circle is going to fail by the sound.',
      icon: 'chalk',
    },
    {
      id: 'place_card',
      name: 'The Place Card',
      tags: ['personal'],
      description: 'A folded card from the small table by the kitchen door, lettered GENTLEMAN in very good copperplate. Nobody will say who wrote it.',
      loreText: 'The ink is the same violet the deputy head uses for the minutes. It is also the ink the whole fourth year buys.',
      icon: 'card',
    },
    {
      id: 'sardines',
      name: 'A Tin of Sardines',
      tags: ['food', 'trade'],
      stackable: true,
      maxStack: 4,
      description: 'Sardines in oil, from the pantry shelf the kitchen staff pretend not to count. In the kitchens this is currency.',
      loreText: 'One tin buys a name. Two buy a reason. The cat by the range does not give change.',
      icon: 'tin',
    },
    {
      id: 'rules_of_the_bowl',
      name: 'Rules of the Bowl',
      tags: ['document'],
      skillModifiers: { composure: 1 },
      description: 'A thin, much-mended pamphlet on duelling: how the circles are chalked, what breaks one, what a second may say, and why familiars stand outside.',
      loreText: 'Rule six is underlined in somebody’s green ink: "A circle drawn in anger is drawn short."',
      icon: 'book',
    },
    {
      id: 'equinox_lamp',
      name: 'The Equinox Lamp',
      tags: ['quest'],
      questItem: true,
      description:
        'A brass lamp with no wick and no oil, kept on the headmistress’s desk. Once a year, on the night the Seven Chairs arrive, the headmistress lights it alone with her own craft in front of the Seven Chairs. If it lights, she keeps the college. It has not lit for her without the raven’s help in two years.',
      loreText: 'The brass is worn smooth in one place, exactly where a raven’s foot would rest.',
      icon: 'lamp',
    },
    {
      id: 'severing_writ',
      name: 'The Severing Writ',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'A red folder holding a single page with the governors’ seal: authority for the Deputy Head to perform the Severing on any student whose familiar was improperly called. Your name has been written in, in violet ink, and the date is the fifth afternoon.',
      loreText: 'Rule Twelve, subsection three. It has been used twice in three hundred years. Both students went home without any magic at all.',
      icon: 'papers',
    },
    {
      id: 'closing_minutes',
      name: 'The Closing Minutes',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'A water-stained minute book from the governors’ archive cabinet, three hundred years old. One page records a vote to close the Hedge Gate to men and to strike the office of Hedgewarden from the Charter, seven hands to none. The page has been pasted shut along the edge.',
      loreText: 'Underneath the vote, in a different hand: "The Warden protests. The Warden is overruled. The Warden’s shears are not found."',
      icon: 'book',
    },
    {
      id: 'grey_cutting',
      name: 'A Grey Cutting',
      tags: ['quest', 'evidence'],
      questItem: true,
      description: 'A length of blackthorn from the north end of the Hedge, grey from bark to pith, dry as paper and still sharp. Living Hedge is black and green. This is neither.',
      loreText: 'It crumbles in a warm hand. It does not crumble in yours.',
      icon: 'branch',
    },
    {
      id: 'warden_shears',
      name: 'The Warden’s Shears',
      tags: ['quest', 'tool'],
      questItem: true,
      droppable: false,
      description:
        'Black iron shears as long as a forearm, wrapped in oilcloth and kept dry by one family of ferrymen for three hundred years. The handles are worn to somebody else’s grip. They cut dead wood out of the Hedge and graft living wood in, and they do nothing in the hand of a witch.',
      loreText: 'Seven thorns are stamped into the pivot, the same seven that are engraved on the ring round Sexton’s leg.',
      icon: 'shears',
    },
    {
      id: 'bea_letter',
      name: 'Bea’s Letter',
      tags: ['document', 'personal'],
      description:
        'A letter from Nadia’s old roommate, written the week she went home. It is mostly apologies, and then one paragraph about the north end of the Hedge at night, where she says it was "breathing out and not breathing in".',
      loreText: 'Nadia has never answered it. It lives in her sock drawer, under a jar of dried rosemary.',
      icon: 'letter',
    },
    {
      id: 'netting_needle',
      name: 'A Netting Needle',
      tags: ['tool', 'personal'],
      skillModifiers: { hedgecraft: 1 },
      description: 'A flat wooden needle for mending nets, worn dark with use. Your hands know what to do with it without being asked.',
      loreText: 'Mending a net and mending a hedge turn out to be closer than anybody at the college would like.',
      icon: 'needle',
    },
    {
      id: 'seed_tin',
      name: 'A Tin of Seeds',
      tags: ['personal'],
      skillModifiers: { hedgecraft: 1, notice: 1 },
      description: 'A tobacco tin of labelled seed packets from the walled garden you used to keep. Sweet pea, borage, and one packet marked only with a thorn.',
      loreText: 'The old gardener gave you the thorn packet on your last day and told you not to plant it anywhere you were not prepared to stay.',
      icon: 'tin',
    },
    {
      id: 'commonplace_book',
      name: 'A Commonplace Book',
      tags: ['document', 'personal'],
      skillModifiers: { study: 1, notice: 1 },
      description: 'Your own notebook of everything worth copying out of everything you have ever read. Three hundred pages, small hand, an index.',
      loreText: 'There is an entry from years ago about a lost office of "warden" at an old witch college. You did not think about it again until the letter came.',
      icon: 'book',
    },
    {
      id: 'tin_whistle',
      name: 'A Tin Whistle',
      tags: ['personal'],
      skillModifiers: { charm: 1 },
      description: 'A battered tin whistle in D that paid for a lot of ferry tickets. The raven dislikes it, which is useful.',
      loreText: 'The Hedge, as far as anybody can tell, likes it very much.',
      icon: 'whistle',
    },
  ],
  abilities: [
    {
      id: 'ask_the_raven',
      name: 'Ask the Raven',
      tags: ['social'],
      description: 'Ask Sexton something, out loud or in your head, and get one to four words back. He cannot lie. He also never explains.',
      affordances: ['ask sexton', 'ask the raven', 'talk to the raven', 'ask him to go back', 'ask the bird', 'tell the raven', 'whisper to sexton'],
      costs: [
        { resourceId: 'energy', amount: 4 },
        { resourceId: 'strain', amount: 6 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'arcana', skillId: 'hedgecraft', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'say_it_plainly',
      name: 'Say It Plainly',
      tags: ['social'],
      description: 'Tell somebody the true thing without dressing it up, in front of whoever is listening, and take what comes back.',
      affordances: ['tell the truth', 'be honest', 'admit it', 'confess', 'say it plainly', 'tell her straight', 'i did not call him', 'explain myself'],
      costs: [{ resourceId: 'energy', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'candour', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'charm_the_room',
      name: 'Charm the Room',
      tags: ['social'],
      description: 'Make a joke, pay a compliment, bow at the right moment: turn a room that is staring at you into a room that is laughing with you.',
      affordances: ['make a joke', 'charm her', 'flatter', 'bow', 'introduce myself', 'make them laugh', 'smile', 'win them over'],
      costs: [{ resourceId: 'energy', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'MULTI',
      check: { attribute: 'presence', skillId: 'charm', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'read_the_room',
      name: 'Read the Room',
      tags: ['sight'],
      description: 'Work out who in the room actually decides, and what she is doing with her hands while she says something else.',
      affordances: ['look around', 'watch her', 'read her', 'notice', 'study the room', 'look closer', 'search the room'],
      costs: [{ resourceId: 'energy', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'notice', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'chalk_a_circle',
      name: 'Chalk a Circle',
      tags: ['utility'],
      description: 'Draw a circle on the floor and work the first-year craft inside it: a ward, a calling, a light, a duelling ring. Short by half an inch and it fails.',
      affordances: ['draw a circle', 'chalk a circle', 'cast a ward', 'make a light', 'call something', 'draw it again', 'duel her properly'],
      costs: [
        { resourceId: 'energy', amount: 8 },
        { resourceId: 'strain', amount: 3 },
      ],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'arcana', skillId: 'circlework', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'hit_the_books',
      name: 'Hit the Books',
      tags: ['utility'],
      description: 'Find the right book in the Long Library and read it until it gives up what you need: a rule, a precedent, a name.',
      affordances: ['read', 'study', 'look it up', 'research', 'search the library', 'read the charter', 'find the rule'],
      costs: [{ resourceId: 'energy', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'study', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'make_yourself_useful',
      name: 'Make Yourself Useful',
      tags: ['utility'],
      description: 'Pick up the heavy end. Carry, dig, row, mend, wash up. The work nobody writes down and everybody notices.',
      affordances: ['help', 'carry it', 'fix it', 'wash up', 'row', 'dig', 'help in the kitchens', 'make myself useful'],
      costs: [{ resourceId: 'energy', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'might', skillId: 'graft', baseDc: 11 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'slip_away',
      name: 'Slip Away',
      tags: ['movement'],
      description: 'Leave without anybody marking the moment you went. Hard for anyone, and much harder for the only man in the college.',
      affordances: ['sneak out', 'slip away', 'leave quietly', 'hide', 'follow her', 'go out after curfew', 'walk out'],
      costs: [
        { resourceId: 'energy', amount: 6 },
        { resourceId: 'scrutiny', amount: 6 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: { attribute: 'agility', skillId: 'slipping_off', baseDc: 15 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'hold_your_ground',
      name: 'Hold Your Ground',
      tags: ['defensive'],
      description: 'Plant your feet inside your own circle and keep it whole while somebody better than you tries to break it.',
      affordances: ['stand my ground', 'hold my ground', 'brace', 'block', 'ward myself', 'stand firm', 'hold the circle'],
      costs: [{ resourceId: 'energy', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: { attribute: 'resolve', skillId: 'composure', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'stinging_hex',
      name: 'Stinging Hex',
      tags: ['offensive'],
      description: 'The first hex every first-year learns: a flick of chalk dust and a word that stings like nettles and breaks a careless circle.',
      affordances: ['hex her', 'hex him', 'throw a hex', 'curse', 'attack', 'strike', 'fight'],
      costs: [
        { resourceId: 'energy', amount: 8 },
        { resourceId: 'scrutiny', amount: 12 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'arcana', skillId: 'circlework', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'stay_and_listen',
      name: 'Stay and Listen',
      tags: ['social'],
      description: 'Do not fix it, do not explain it and do not leave. Sit down beside them and let them talk.',
      affordances: ['stay', 'sit with her', 'listen', 'say nothing', 'wait', 'keep her company', 'stay with her'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'ravens_eye',
      name: 'The Raven’s Eye',
      tags: ['sight'],
      description: 'Close your eyes and see what Sexton sees, from a roof, a window ledge or a shoulder. He goes where he likes, not where you send him.',
      affordances: ['see through sexton', 'see through the raven', 'send the raven', 'look through his eyes', 'raven’s eye'],
      costs: [{ resourceId: 'strain', amount: 12 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'arcana', skillId: 'hedgecraft', baseDc: 13 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['bond:accepted'],
        lockedCopy: 'He is on your arm because he chose to be. Seeing through his eyes is something he offers, and he has not offered yet.',
      },
    },
    {
      id: 'hedge_hand',
      name: 'The Hedge Answers',
      tags: ['utility'],
      description: 'Lay your palm on the Hedge and ask. It parts for you, closes behind you, or flowers out of season where you touched it.',
      affordances: ['touch the hedge', 'ask the hedge', 'open the hedge', 'part the hedge', 'put my hand on the hedge'],
      costs: [
        { resourceId: 'energy', amount: 8 },
        { resourceId: 'strain', amount: 14 },
      ],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'arcana', skillId: 'hedgecraft', baseDc: 14 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:the_hedge_answers'],
        lockedCopy: 'It is blackthorn, forty feet of it, and it scratches you like it scratches everybody. Whatever it wants, you do not know how to ask it yet.',
      },
    },
    {
      id: 'cut_and_mend',
      name: 'Cut and Mend',
      tags: ['utility'],
      description: 'Cut the dead wood out of the Hedge with the Warden’s Shears and graft living wood in, the way it was done before anybody alive was born.',
      affordances: ['cut the dead wood', 'mend the hedge', 'use the shears', 'graft it', 'prune it', 'cut the door open'],
      costs: [
        { resourceId: 'energy', amount: 12 },
        { resourceId: 'strain', amount: 18 },
      ],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'arcana', skillId: 'hedgecraft', baseDc: 15 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['has_the_shears'],
        maxResources: [{ resourceId: 'strain', value: 85 }],
        lockedCopy: 'You would need the right tool, and the right to use it. Neither has been handed to you.',
      },
    },
  ],
  locations: [
    {
      id: 'calling_hall',
      name: 'The Calling Hall',
      shortName: 'Calling Hall',
      description:
        'A round stone hall with tall windows, a gallery, and a dais for the staff. Sixty chalk circles on the flagstones this morning, most of them with something small inside: a toad, a moth, a sparrow, a hare. One of them is empty, because what answered it is on your arm.',
      artDirection:
        'Round stone hall in an old college, tall arched windows full of gold morning light, a raised dais, a wooden gallery, dozens of white chalk circles on grey flagstones, thin pale smoke hanging in the air. Grand, warm, slightly theatrical.',
      connections: [{ to: 'the_cloister', travelMinutes: 1, label: 'Out to the Cloister' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [
        { itemId: 'chalk_stub', qty: 2, ownerId: null, aka: ['chalk', 'a stick of chalk', 'the chalk', 'some chalk'] },
      ],
    },
    {
      id: 'the_cloister',
      name: 'The Cloister',
      shortName: 'Cloister',
      description:
        'A covered stone walk round a square courtyard with a well in the middle, and the way to everything inside the Hedge. Notices on every pillar. Somebody is always sitting on the well kerb with a book, and everybody looks up when you go past.',
      artDirection:
        'Square stone cloister with a covered arcade, a courtyard with an old well, ivy on the pillars, paper notices pinned up, witches in black robes walking in pairs. Autumn light, long shadows.',
      connections: [
        { to: 'calling_hall', travelMinutes: 1, label: 'The Calling Hall' },
        { to: 'room_nine', travelMinutes: 3, label: 'Up the North Tower to Room Nine' },
        { to: 'the_refectory', travelMinutes: 2, label: 'The refectory' },
        { to: 'long_library', travelMinutes: 2, label: 'The Long Library' },
        { to: 'the_rookery', travelMinutes: 4, label: 'Up to the headmistress’s tower' },
        { to: 'deputy_office', travelMinutes: 2, label: 'The deputy head’s office' },
        { to: 'the_bowl', travelMinutes: 3, label: 'Down to the Bowl' },
        { to: 'chamber_of_chairs', travelMinutes: 2, label: 'The Chamber of Seven Chairs' },
        { to: 'hedge_walk', travelMinutes: 3, label: 'Out to the Hedge Walk' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
      takeableItems: [],
    },
    {
      id: 'room_nine',
      name: 'Room Nine, North Tower',
      shortName: 'Room Nine',
      description:
        'A tower room with two narrow beds, two desks, one window over the grey estuary, and a curtain on a rope down the exact middle. Nadia’s half smells of rosemary and has a speckled hen on the sill. Your half has a robe that does not fit and a raven on the bedpost.',
      artDirection:
        'Small stone tower dormitory room, two narrow beds on either side, a plain cloth curtain hung on a rope between them, desks with books and herb cuttings, a speckled hen on the windowsill, grey estuary through the window. Cosy, cramped, funny.',
      connections: [{ to: 'the_cloister', travelMinutes: 3, label: 'Down the tower stair' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 2 },
      takeableItems: [
        { itemId: 'bea_letter', qty: 1, ownerId: 'nadia', aka: ['bea’s letter', 'the letter in the drawer', 'nadia’s letter', 'the old letter'] },
      ],
    },
    {
      id: 'the_refectory',
      name: 'The Refectory',
      shortName: 'Refectory',
      description:
        'Long tables by year, a high table for the staff under a window of green glass, and four hundred witches at supper. One small table by the kitchen door is laid for a single person, with a card on it that says GENTLEMAN.',
      artDirection:
        'Long stone dining hall with four long wooden tables of witches in black robes, a raised high table under a green stained-glass window, candles, and one tiny table set apart by a kitchen door. Busy, warm, comic.',
      connections: [
        { to: 'the_cloister', travelMinutes: 2, label: 'Back to the Cloister' },
        { to: 'the_kitchens', travelMinutes: 1, label: 'Through the kitchen door' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 1 },
      takeableItems: [
        { itemId: 'place_card', qty: 1, ownerId: null, aka: ['the place card', 'the gentleman card', 'the card on my table', 'the name card'] },
      ],
    },
    {
      id: 'the_kitchens',
      name: 'The Kitchens',
      shortName: 'Kitchens',
      description:
        'Copper pans, a range the size of a cart, steam, islander cooks who do not care who you are, and a long black cat on the warm end of the range who cares a great deal. The back door opens on the kitchen garden and the Hedge Walk.',
      artDirection:
        'Big old college kitchen, copper pans hanging, a huge black iron range glowing, steam, flour on a long table, a large black cat with one white paw lying on the warm end of the range. Warm, busy, orange light.',
      connections: [
        { to: 'the_refectory', travelMinutes: 1, label: 'Back into the refectory' },
        { to: 'hedge_walk', travelMinutes: 2, label: 'Out the back door, through the kitchen garden' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 1 },
      takeableItems: [
        { itemId: 'sardines', qty: 3, ownerId: null, aka: ['sardines', 'a tin of sardines', 'the tin', 'a tin from the pantry'] },
      ],
    },
    {
      id: 'long_library',
      name: 'The Long Library',
      shortName: 'Library',
      description:
        'A gallery a hundred yards long, books chained to the shelves, window seats over the estuary, and the Founders’ Charter under glass at the far end. The restricted gallery upstairs is open to fourth-years only, and Ivy Calder has a desk there.',
      artDirection:
        'Very long old library hall, dark wooden shelves with chained books, window seats with grey sea light, a glass case at the far end holding an old charter, a narrow upper gallery with a railing. Hushed, dusty, golden.',
      connections: [{ to: 'the_cloister', travelMinutes: 2, label: 'Back to the Cloister' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 1 },
      takeableItems: [
        { itemId: 'rules_of_the_bowl', qty: 1, ownerId: null, aka: ['the duelling rules', 'the rulebook', 'the pamphlet', 'rules of the bowl'] },
      ],
    },
    {
      id: 'the_rookery',
      name: 'The Rookery',
      shortName: 'Rookery',
      description:
        'The headmistress’s study at the top of the oldest tower: a desk, three hundred years of portraits, a window on every side, a brass lamp with no wick, and a tall wooden perch by the desk with nothing on it.',
      artDirection:
        'Round tower study at the top of an old college, windows on every side showing sea and sky, a heavy desk with a brass lamp, rows of painted portraits of stern witches, a tall empty wooden bird perch. Dignified, lonely.',
      connections: [{ to: 'the_cloister', travelMinutes: 4, label: 'Down the tower stair' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 3 },
      takeableItems: [
        { itemId: 'equinox_lamp', qty: 1, ownerId: 'morgaine', aka: ['the lamp', 'the equinox lamp', 'the brass lamp'] },
      ],
    },
    {
      id: 'deputy_office',
      name: 'The Deputy’s Office',
      shortName: 'Deputy’s Office',
      description:
        'Net curtains, a biscuit tin, a wall of labelled box files, and a ring of brass keys on a hook by the door. Hester Crane runs discipline, the minutes and most of the college from here, and she always has time for you, dear.',
      artDirection:
        'Neat old office with net curtains, a wall of labelled box files, a tea tray with a biscuit tin, a ring of brass keys on a hook, a desk with a red folder squared exactly to its edge. Tidy, warm, quietly menacing.',
      connections: [{ to: 'the_cloister', travelMinutes: 2, label: 'Back to the Cloister' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 2 },
      takeableItems: [
        { itemId: 'severing_writ', qty: 1, ownerId: 'hester', aka: ['the writ', 'the red folder', 'hester’s folder', 'the severing writ'] },
      ],
    },
    {
      id: 'the_bowl',
      name: 'The Bowl',
      shortName: 'The Bowl',
      description:
        'A sunken lawn ringed by a grass bank, where students practise and duel inside chalk circles. The fourth year runs it. At seven in the morning it is empty except for whoever is too serious to sleep.',
      artDirection:
        'Sunken circular lawn surrounded by a grassy bank, early morning mist, faint old chalk circles on the turf, the dark wall of a huge hedge beyond, a few witches watching from the bank. Fresh, tense, competitive.',
      connections: [
        { to: 'the_cloister', travelMinutes: 3, label: 'Up to the Cloister' },
        { to: 'hedge_walk', travelMinutes: 3, label: 'Over the bank to the Hedge Walk' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 3 },
      takeableItems: [],
    },
    {
      id: 'chamber_of_chairs',
      name: 'The Chamber of Seven Chairs',
      shortName: 'The Chamber',
      description:
        'A panelled room with seven tall chairs in a half-circle, a public gallery above, and an archive cabinet nobody has opened in a long time. The governors sit here on the fifth morning. Until then it is dusted and locked, and the lock is not very good.',
      artDirection:
        'Formal wood-panelled chamber with seven tall carved chairs in a half-circle, a viewing gallery above, a tall old archive cabinet with brass handles, dust in a shaft of window light. Solemn, institutional.',
      connections: [{ to: 'the_cloister', travelMinutes: 2, label: 'Back to the Cloister' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 3 },
      takeableItems: [
        { itemId: 'closing_minutes', qty: 1, ownerId: null, aka: ['the minutes', 'the old minute book', 'the archive book', 'the pasted page'] },
      ],
    },
    {
      id: 'hedge_walk',
      name: 'The Hedge Walk',
      shortName: 'Hedge Walk',
      description:
        'A gravel path between the college buildings and the Hedge itself, which goes up forty feet like a black wall and ticks and creaks in the wind. North leads to the Grey Reach. South leads to the Hedge Gate and the causeway.',
      artDirection:
        'Gravel path running beside an enormous dark living wall of blackthorn and briar forty feet tall, old stone college buildings on the other side, autumn leaves, grey sky. Imposing and alive.',
      connections: [
        { to: 'the_cloister', travelMinutes: 3, label: 'Back inside' },
        { to: 'the_kitchens', travelMinutes: 2, label: 'Through the kitchen garden' },
        { to: 'the_bowl', travelMinutes: 3, label: 'Over the bank to the Bowl' },
        { to: 'grey_reach', travelMinutes: 10, label: 'North, to the Grey Reach' },
        { to: 'hedge_gate', travelMinutes: 6, label: 'South, to the Hedge Gate' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 2 },
      takeableItems: [],
    },
    {
      id: 'grey_reach',
      name: 'The Grey Reach',
      shortName: 'Grey Reach',
      description:
        'The north end of the island, where the Hedge has gone the colour of ash for a hundred yards. The thorns are dry and the wind goes through it. Fresh chalk marks on the path, and patches of new green where somebody has been trying, every night, to hold it together.',
      artDirection:
        'Northern end of an island at dusk, a towering hedge of blackthorn turned ash-grey and brittle, the sea visible through gaps in it, a lantern on the ground, scattered chalk marks. Eerie, sad, windswept.',
      connections: [
        { to: 'hedge_walk', travelMinutes: 10, label: 'Back along the Hedge Walk' },
        { to: 'founders_garden', travelMinutes: 2, lockedByFlag: 'warden_door_open', label: 'Through the Warden’s Door' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 3, y: 1 },
      takeableItems: [
        { itemId: 'grey_cutting', qty: 1, ownerId: null, aka: ['a grey cutting', 'dead blackthorn', 'a grey branch', 'a piece of the hedge'] },
      ],
    },
    {
      id: 'founders_garden',
      name: 'The Founders’ Garden',
      shortName: 'Founders’ Garden',
      description:
        'A walled clearing inside the roots of the Hedge, reached only through a door the Hedge grew over three hundred years ago. Seven graves, one apple tree, and a stone bench by the wall with a word cut into it: WARDEN.',
      artDirection:
        'Secret round garden enclosed by the living roots and walls of a vast blackthorn hedge, seven old gravestones in the grass, a single gnarled apple tree, a weathered stone bench carved with a word. Hushed, green, sacred.',
      connections: [{ to: 'grey_reach', travelMinutes: 2, label: 'Back out through the Warden’s Door' }],
      discoveredByDefault: false,
      mapPosition: { x: 4, y: 1 },
      takeableItems: [],
    },
    {
      id: 'hedge_gate',
      name: 'The Hedge Gate',
      shortName: 'Hedge Gate',
      description:
        'The only gap in the Hedge: an arch of living thorn twelve feet high that opens for the people it chooses, and the start of the stone causeway across the mud to the mainland. At low tide the causeway is open for about forty minutes.',
      artDirection:
        'Tall arched opening through a towering living hedge of blackthorn, a wet stone causeway running away across tidal mud flats toward a distant shore, gulls, low grey light. Threshold, wide sky.',
      connections: [
        { to: 'hedge_walk', travelMinutes: 6, label: 'Back along the Hedge Walk' },
        { to: 'fenns_landing', travelMinutes: 12, label: 'Down the causeway to the landing' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 3 },
      takeableItems: [],
    },
    {
      id: 'fenns_landing',
      name: 'Fenn’s Landing',
      shortName: 'The Landing',
      description:
        'A wooden jetty below the causeway, a tarred ferry, and a hut with a stove pipe where Tobias Fenn has lived his whole life outside the Hedge. The ferry goes to the mainland when the tide lets it. This is the way off the island.',
      artDirection:
        'Small wooden jetty on a tidal estuary, a black tarred ferry boat tied up, a fisherman’s hut with a smoking stove pipe, nets drying, the huge dark hedge of the island behind. Grey, salty, calm.',
      connections: [{ to: 'hedge_gate', travelMinutes: 12, label: 'Back up the causeway to the gate' }],
      discoveredByDefault: true,
      mapPosition: { x: 3, y: 4 },
      takeableItems: [],
    },
  ],
  factions: [
    {
      id: 'faction_college',
      name: 'Thornwitch College',
      description:
        'The staff and four hundred students inside the Hedge: proud, old, gossipy and very good at magic. Not one of them has decided yet what you are, and all of them are watching you to find out.',
      startingReputation: 10,
      ranks: [
        { atReputation: 0, label: 'The Gentleman' },
        { atReputation: 30, label: 'One of the First-Years' },
        { atReputation: 60, label: 'One of Ours' },
      ],
      allies: ['faction_kitchens'],
      enemies: [],
    },
    {
      id: 'faction_chairs',
      name: 'The Seven Chairs',
      description:
        'The college’s seven governors: alumnae in good coats with long memories, who sit on the fifth morning to keep or replace the headmistress. In three hundred years they have never admitted a mistake, including the one they made.',
      startingReputation: 0,
      ranks: [
        { atReputation: 0, label: 'An Irregularity' },
        { atReputation: 25, label: 'An Item on the Agenda' },
        { atReputation: 50, label: 'Heard' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_fourth_year',
      name: 'The Fourth Year',
      description:
        'Eighty witches in their final year, led by Ivy Calder. They run the Bowl, the duelling ladder and most of the college’s opinions, and they started a betting book on you before lunch.',
      startingReputation: 0,
      ranks: [
        { atReputation: 0, label: 'Fair Game' },
        { atReputation: 20, label: 'Worth Watching' },
        { atReputation: 45, label: 'Called by Name' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_kitchens',
      name: 'The Kitchens',
      description:
        'Cooks, porters and laundry staff, mostly islanders, who see everything that goes in and out of the college and trade it with a cat for sardines. They like anybody who carries a pan without being asked.',
      startingReputation: 15,
      ranks: [
        { atReputation: 0, label: 'Fed' },
        { atReputation: 25, label: 'Fed Seconds' },
        { atReputation: 50, label: 'Told Things' },
      ],
      allies: ['faction_college'],
      enemies: [],
    },
  ],
  characters: [
    {
      id: 'ivy',
      name: 'Ivy Calder',
      role: 'First of the fourth year, and the headmistress’s chosen apprentice',
      cardBlurb:
        'The best duellist in the building, promised your raven at graduation, in writing. Before your first supper is over she will call you to the Bowl, and until then she is keeping score of everything you do.',
      pronouns: 'she/her',
      publicTraits: ['Keeps score out loud', 'Never late, never untidy, never second', 'Gets more formal, not less, when flustered'],
      hiddenDrives: [
        'She wants, for once, to be chosen for something rather than to have earned it',
        'On her own Admission Night she asked the Hedge to let her be the one who saves this place, and she suspects it answered by sending you',
      ],
      values: ['A fair fight, fought by the rules, in front of witnesses', 'Doing the work nobody sees, and not being thanked for it'],
      fears: ['Being second, at anything, to anybody', 'Being the apprentice only because nobody else applied', 'Being pitied'],
      socialStyle:
        'Arrives already talking, stands a little too straight, and turns every conversation into a contest she is winning. Softens only when there is nobody watching, and then only for a sentence.',
      boundaries: [
        'Will not cheat in a duel, and will not forgive anybody who does',
        'Will not speak against Morgaine to Hester Crane, whatever she privately thinks',
        'Will not be rescued in public',
      ],
      goals: [
        'Beat you fairly on the Bowl and take the raven back properly',
        'Keep the north end of the Hedge standing until somebody with authority notices it is dying',
      ],
      secrets: [
        {
          id: 'ivy_the_grey_reach',
          fact: 'For six weeks she has gone to the Grey Reach alone at two in the morning and patched the dying Hedge with her own craft. It is wearing her out, and she has told nobody, including Morgaine.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She takes you there herself, after the duel, if she trusts you; or you follow her out of the kitchen door at two in the morning and she has to decide what to do about it.',
        },
        {
          id: 'ivy_the_wish',
          fact: 'On her Admission Night she asked the Hedge to let her be the one who saves Thornwitch. She suspects it answered by sending the player, and she does not know whether that makes him her answer or her replacement.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only at the Grey Reach, late, and only if you have already seen what she does there and said nothing to anybody.',
        },
      ],
      speechStyle:
        'Fast, precise and competitive. Keeps a running score ("That’s one to me"). Short clipped sentences that get longer and more formal the more flustered she is. Never swears.',
      topics: ['the duel', 'the raven', 'the fourth year', 'the north end of the Hedge', 'being the apprentice', 'the rules of the Bowl'],
      voiceSamples: [
        'That’s one to me. You flinched before I’d even chalked.',
        'The Bowl. Seven o’clock. Bring chalk, bring the bird, and leave the apology behind, I have no use for one.',
        'I was promised that raven in my second week. Promised. In writing. By her.',
        'I am perfectly composed. I am simply observing, for the record, that you are standing extremely close.',
        'Tell nobody where I go at night. Not her. Not your hen-witch. Nobody.',
      ],
      appearance:
        'An adult woman, tall and sharp-featured, with dark auburn hair cut straight at the jaw, green eyes, a black college robe over a white shirt, a thorn-green silk sash worn exactly straight, an ink stain on the edge of her writing hand, and a thin silver adder called Footnote coiled round her left wrist.',
      visualHook: 'A thorn-green sash worn perfectly straight, and a silver adder round her wrist like a bracelet that sometimes moves.',
      silhouette: 'Very upright, chin up, one hand holding a stick of chalk like a pointer.',
      artSeed: 'thornwitch-ivy-01',
      portrait: null,
      expressions: ['neutral', 'competitive', 'flustered', 'furious', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 90, locationId: 'long_library', activity: 'the restricted gallery, reading about familiars past midnight' },
        { startMinute: 90, endMinute: 270, locationId: 'grey_reach', activity: 'at the north end of the Hedge with a lantern turned down low' },
        { startMinute: 270, endMinute: 420, locationId: 'the_cloister', activity: 'in her room off the fourth-year stair, not resting enough' },
        { startMinute: 420, endMinute: 540, locationId: 'the_bowl', activity: 'practising alone on the Bowl before anybody else is up' },
        { startMinute: 540, endMinute: 660, locationId: 'calling_hall', activity: 'assisting at the Calling Hall as First of the Fourth Year' },
        { startMinute: 660, endMinute: 1080, locationId: 'long_library', activity: 'lectures, then her desk in the restricted gallery' },
        { startMinute: 1080, endMinute: 1200, locationId: 'the_refectory', activity: 'supper at the head of the fourth-year table' },
        { startMinute: 1200, endMinute: 1440, locationId: 'long_library', activity: 'the restricted gallery, keeping score of the day' },
      ],
      homeLocationId: 'long_library',
      knowledgeScope: ['ivy', 'the_bowl', 'duelling', 'grey_reach', 'fourth_year', 'familiars', 'morgaine'],
      startingRelationship: { trust: 10, affection: 5, respect: 15, fear: 0, rivalry: 60 },
      gates: [
        {
          id: 'ivy_respects_you',
          label: 'She stops treating you as a mistake',
          kind: 'OTHER',
          requires: { respect: 50, flagsSet: ['duel_over'] },
        },
        {
          id: 'ivy_takes_you_north',
          label: 'She shows you the Grey Reach herself',
          kind: 'TRUST',
          requires: { trust: 55 },
        },
        {
          id: 'ivy_kiss',
          label: 'Rivals, and then something else',
          kind: 'ROMANCE',
          requires: { trust: 60, affection: 60, flagsSet: ['ivy_secret_out'] },
        },
      ],
      attributes: { might: 10, agility: 14, mind: 15, presence: 13, resolve: 15, arcana: 17 },
      companion: null,
      scouting: null,
      combatant: { health: 30, defenseDc: 16, damage: 4, tags: ['witch', 'duellist'] },
    },
    {
      id: 'morgaine',
      name: 'Morgaine Ashdown',
      role: 'Headmistress of Thornwitch for twenty-one years, and until this morning the raven’s',
      cardBlurb:
        'The headmistress whose raven is on your arm. She will not shout and she will not beg, she has five days before the governors decide whether she keeps her college, and she cannot tell you why she needs him back so badly.',
      pronouns: 'she/her',
      publicTraits: ['Formidable', 'Quietly spoken and never interrupted', 'Counts things in threes'],
      hiddenDrives: [
        'She has carried the college alone for twenty-one years and is desperate to put it down, and would rather die than say so',
        'She argued the governors into honouring the player’s letter, and does not fully know why she did',
      ],
      values: ['The college first, the Hedge second, herself a long way third', 'Never lying to the governors, only choosing what to leave out'],
      fears: [
        'Being found out in front of the Seven Chairs',
        'The college failing in the one year she can no longer keep it',
        'That the raven left because he finally saw her clearly',
      ],
      socialStyle:
        'Says less than anyone in the room and is listened to more. Calls students by surname. Ends a threat with "Thank you." Touches the empty pad on her shoulder when she thinks nobody is looking.',
      boundaries: [
        'Will not beg, for the raven or for anything',
        'Will not expel a student for something the Hedge did',
        'Will not lie outright to the governors',
      ],
      goals: [
        'Get Sexton back on her shoulder before the Equinox lamp has to be lit on the fourth night',
        'Keep the player on the island, quiet and alive, until the Sitting is over',
      ],
      secrets: [
        {
          id: 'morgaine_fading',
          fact: 'Her own craft has been fading for two years. She cannot light the Equinox lamp alone any more; Sexton has been doing it for her, and for most of her lamps besides.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells you herself in the Rookery, late, if you have been straight with her and she has run out of other options; or you see it through the raven’s eyes; or Hester tells you, unkindly.',
        },
        {
          id: 'morgaine_the_letter',
          fact: 'The player’s letter arrived on her desk already addressed. She knows nobody at the college wrote it, and she argued the governors into honouring it anyway, because the raven sat on it and would not get off.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only once she trusts you, and only if you show her the letter and ask who signed it.',
        },
      ],
      speechStyle:
        'Complete sentences, quietly delivered, never raised. Lists things in threes. Uses surnames. Closes a threat or an order with "Thank you." Pauses where other people would shout.',
      topics: ['the raven', 'the Seven Chairs', 'the Equinox lamp', 'the college', 'the Hedge', 'your letter'],
      voiceSamples: [
        'Arm out, please. Or tell the whole hall, right now: what did you do to my bird?',
        'Three things. You will not leave the island. You will not feed him cake. You will be in my tower at six. Thank you.',
        'Twenty-one years he has sat on this shoulder. I find I do not know what to do with my hands.',
        'The college, the Hedge, then myself. That has been the order for a long time, and I am very tired.',
        'Governors count everything. Chairs, spoons, mistakes. They always count.',
      ],
      appearance:
        'An older woman, tall and straight-backed, with iron-grey hair in a braid pinned round her head, dark eyes, black robes lined in thorn green, a silver thimble on her left forefinger, and a worn leather pad on her left shoulder with nothing on it.',
      visualHook: 'An empty leather shoulder pad, worn to the shape of a raven’s feet.',
      silhouette: 'Tall and narrow, perfectly still, one hand lifted toward her own shoulder.',
      artSeed: 'thornwitch-morgaine-01',
      portrait: null,
      expressions: ['neutral', 'stern', 'tired', 'wry', 'afraid'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'the_rookery', activity: 'awake in the tower, lighting candles by hand' },
        { startMinute: 420, endMinute: 540, locationId: 'the_rookery', activity: 'breakfast at her desk, letters to the governors' },
        { startMinute: 540, endMinute: 660, locationId: 'calling_hall', activity: 'presiding on the dais of the Calling Hall' },
        { startMinute: 660, endMinute: 1080, locationId: 'the_rookery', activity: 'the headmistress’s business, at the top of the tower' },
        { startMinute: 1080, endMinute: 1200, locationId: 'the_refectory', activity: 'high table, eating very little' },
        { startMinute: 1200, endMinute: 1440, locationId: 'the_rookery', activity: 'the tower, trying the brass lamp when the door is shut' },
      ],
      homeLocationId: 'the_rookery',
      knowledgeScope: ['morgaine', 'the_college', 'seven_chairs', 'equinox_lamp', 'sexton', 'the_hedge', 'hester', 'ivy'],
      startingRelationship: { trust: 20, affection: 5, respect: 30, fear: 0, rivalry: 10 },
      gates: [
        {
          id: 'morgaine_confides',
          label: 'She tells you what she cannot do alone',
          kind: 'TRUST',
          requires: { trust: 55, flagsSet: ['bond:accepted'] },
        },
        {
          id: 'morgaine_asks_for_help',
          label: 'She asks you for help, out loud',
          kind: 'ALLIANCE',
          requires: { trust: 65, respect: 50 },
        },
      ],
      attributes: { might: 8, agility: 9, mind: 17, presence: 18, resolve: 16, arcana: 12 },
      companion: null,
      scouting: null,
      combatant: { health: 28, defenseDc: 16, damage: 4, tags: ['witch', 'headmistress'] },
    },
    {
      id: 'nadia',
      name: 'Nadia Kowal',
      role: 'Second-year herb witch on a scholarship, and the other half of Room Nine',
      cardBlurb:
        'Your roommate, because the North Tower ran out of beds. She is warm, blunt, on a scholarship she cannot afford to lose, and somebody has asked her to report on you.',
      pronouns: 'she/her',
      publicTraits: ['Port-town blunt', 'Narrates her own embarrassment as it happens', 'Kind before she has decided to be'],
      hiddenDrives: [
        'She wants one friend at this college who is not keeping score',
        'She has been ashamed for a year of not answering a letter, and is looking for a way to be braver than that',
      ],
      values: ['Honest work and an honest wage', 'Not lying, because the hen would tell on her anyway', 'Looking after whoever is in the room'],
      fears: [
        'Losing the scholarship and going home to gut herring',
        'Being known for the rest of her life as the witch who roomed with the scandal',
      ],
      socialStyle:
        'Talks too fast when nervous and too little when hurt. Feeds people. Draws the curtain at ten exactly and talks through it afterwards for an hour.',
      boundaries: [
        'Will not lie for you, and the hen would give her away if she tried',
        'The curtain stays shut after ten',
        'Will not hear a word against islanders or kitchen staff',
      ],
      goals: ['Keep her scholarship through the deputy head’s review', 'Make Room Nine liveable for two people and one hen'],
      secrets: [
        {
          id: 'nadia_reports',
          fact: 'Hester Crane has told her that her scholarship renewal depends on reporting what the player does and says. She has reported twice, both times the truth, both times as little of it as she could.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells you herself if she trusts you, crying through the curtain; or you see her going into the deputy’s office with her hands full of notes.',
        },
        {
          id: 'nadia_bea',
          fact: 'Her last roommate, Bea Lowrie, left mid-year after a night at the north end of the Hedge and wrote one letter about it that Nadia never answered. It is in her sock drawer.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She mentions Bea if you ask about the north end of the Hedge, and shows you the letter only if you have been kind about something that cost you.',
        },
      ],
      speechStyle:
        'Port-town blunt and warm. Swears in fish ("oh, cod", "oh, haddock"). Long run-on sentences when embarrassed, very short ones when she means it. Calls her mother "mam".',
      topics: ['Room Nine', 'Duchess the hen', 'her scholarship', 'herbs', 'the island', 'Bea'],
      voiceSamples: [
        'Oh, cod. Right. Hello. I’m Nadia, that’s Duchess, this is the curtain, and I’m talking too fast, aren’t I.',
        'Curtain shut after ten. Washroom’s mine till half seven. And don’t lie in front of the hen, she’ll lay.',
        'My mam guts herring on the quay. Lose the scholarship and I’m back beside her by midwinter.',
        'I’m going red. I can feel it. Ignore it, my face is a traitor.',
        'Bea wrote me once, after she went home. I never wrote back. It’s in my sock drawer, like an idiot.',
      ],
      appearance:
        'An adult woman, broad-shouldered and freckled, with a thick black plait, warm brown eyes, a hand-me-down black robe let out at the seams with the sleeves rolled, and a satchel of herb cuttings that smells of rosemary. A speckled hen called Duchess usually rides in the satchel.',
      visualHook: 'A speckled hen with her head poking out of a satchel full of herbs.',
      silhouette: 'Sturdy and quick, sleeves rolled, a satchel on one hip and a hen peering out of it.',
      artSeed: 'thornwitch-nadia-01',
      portrait: null,
      expressions: ['neutral', 'flustered', 'laughing', 'worried', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'room_nine', activity: 'behind her half of the curtain, the hen on the sill' },
        { startMinute: 420, endMinute: 540, locationId: 'the_refectory', activity: 'breakfast at the second-year table' },
        { startMinute: 540, endMinute: 660, locationId: 'calling_hall', activity: 'against the wall of the Calling Hall with the second-years, watching' },
        { startMinute: 660, endMinute: 960, locationId: 'the_kitchens', activity: 'in the kitchen garden with her cuttings, then helping the cooks' },
        { startMinute: 960, endMinute: 1080, locationId: 'long_library', activity: 'herbals and scholarship essays at a window seat' },
        { startMinute: 1080, endMinute: 1200, locationId: 'the_refectory', activity: 'supper at the second-year table' },
        { startMinute: 1200, endMinute: 1440, locationId: 'room_nine', activity: 'Room Nine, curtain shut at ten exactly' },
      ],
      homeLocationId: 'room_nine',
      knowledgeScope: ['nadia', 'room_nine', 'the_kitchens', 'the_island', 'herbs', 'bea', 'hester'],
      startingRelationship: { trust: 30, affection: 30, respect: 20, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'nadia_tells_you_about_hester',
          label: 'She tells you what the deputy asked her to do',
          kind: 'TRUST',
          requires: { trust: 55, flagsSet: ['roommates'] },
        },
        {
          id: 'nadia_more_than_friends',
          label: 'Friends first, then maybe more',
          kind: 'ROMANCE',
          requires: { trust: 65, affection: 65 },
        },
      ],
      attributes: { might: 13, agility: 11, mind: 13, presence: 12, resolve: 13, arcana: 12 },
      companion: null,
      scouting: null,
      combatant: { health: 26, defenseDc: 12, damage: 2, tags: ['witch'] },
    },
    {
      id: 'sexton',
      name: 'Sexton',
      role: 'The headmistress’s raven for three centuries, and since this morning yours',
      cardBlurb:
        'Three hundred years on the shoulders of headmistresses, and since this morning on your arm. He speaks in four words or fewer, he cannot lie, and he has decided something about you that he is not explaining.',
      pronouns: 'he/him',
      publicTraits: ['Enormous', 'Speaks rarely, and only in a few words', 'Will not be moved'],
      hiddenDrives: [
        'He wants rest: a keeper for the Hedge, so that he can stop being two people at once',
        'He wants Morgaine to stop pretending, because he cannot carry her and the Hedge both much longer',
      ],
      values: ['The Hedge', 'The truth, which he is unable not to tell', 'Bread'],
      fears: ['The Grey Reach falling while he is still the only one holding it', 'Being cut away from the player before the work is done'],
      socialStyle:
        'Sits on the player’s arm or shoulder and watches. Answers a question with as few words as possible, and sometimes with a different question. Goes completely silent whenever Hester Crane comes within arm’s reach.',
      boundaries: [
        'Will not go back to Morgaine’s shoulder while the Hedge has no keeper and she goes on pretending',
        'Will not speak within arm’s reach of Hester Crane',
        'Cannot lie, and will not explain',
      ],
      goals: ['Get the Hedge a keeper again', 'Keep the player alive and on the island until he understands why he is here'],
      secrets: [
        {
          id: 'sexton_two_jobs',
          fact: 'He has carried the Hedgewarden’s work as well as the headmistress’s for three hundred years, since the Closing, and it is too much. He chose the player because the Hedge did.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He will not explain it, but he will say "Two jobs" or "Ask the ferryman" to anybody who asks him the right question, and will show it through his own eyes once the bond is accepted.',
        },
      ],
      speechStyle:
        'One to four words, never more. Old-fashioned. Never explains, never repeats himself, never says please.',
      topics: ['the Hedge', 'bread', 'Morgaine', 'the ferryman', 'the north end'],
      voiceSamples: ['No.', 'Bread first.', 'Ask the ferryman.', 'Not her. Not yet.', 'Two jobs. Too heavy.'],
      appearance:
        'A raven far larger than a raven should be, glossy black with one grey feather at the throat, a heavy beak, and a silver ring on his left leg engraved with seven thorns.',
      visualHook: 'One grey feather at the throat, and a silver leg ring with seven thorns.',
      silhouette: 'A huge black bird hunched on a forearm, wings half spread, claws through the sleeve.',
      artSeed: 'thornwitch-sexton-01',
      portrait: null,
      expressions: ['neutral', 'unimpressed', 'watchful'],
      schedule: [
        { startMinute: 0, endMinute: 540, locationId: 'room_nine', activity: 'on the bedpost in Room Nine, one eye open' },
        { startMinute: 540, endMinute: 660, locationId: 'calling_hall', activity: 'on your arm, claws through the sleeve' },
        { startMinute: 660, endMinute: 1440, locationId: 'the_cloister', activity: 'on your shoulder, wherever you go' },
      ],
      homeLocationId: 'room_nine',
      knowledgeScope: ['sexton', 'the_hedge', 'the_closing', 'hedgewarden', 'morgaine', 'grey_reach', 'the_college'],
      startingRelationship: { trust: 40, affection: 20, respect: 10, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'sexton_speaks_freely',
          label: 'He answers the question you actually asked',
          kind: 'TRUST',
          requires: { trust: 60 },
        },
      ],
      attributes: { might: 6, agility: 16, mind: 16, presence: 14, resolve: 18, arcana: 20 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'hester',
      name: 'Hester Crane',
      role: 'Deputy Head and Mistress of Discipline, who has wanted the headmistress’s chair for nine years',
      cardBlurb:
        'The deputy head, who calls you dear, brings biscuits, and has waited nine years for the headmistress to slip. She holds the only paper at Thornwitch that can cut you off from your raven and your magic in a single afternoon.',
      pronouns: 'she/her',
      publicTraits: ['Warm', 'Procedural', 'Knows every rule by its number'],
      hiddenDrives: [
        'She wants to be the one who was right, out loud, in front of the Seven Chairs',
        'She is afraid the college is dying, and that nobody but her has the stomach to do something about it',
      ],
      values: ['Rules, written down, applied to everybody', 'The college outliving every one of the people currently running it'],
      fears: ['Becoming a footnote in the minutes she has kept for nine years', 'The college closing while she was right and nobody listened'],
      socialStyle:
        'Maternal, unhurried and relentlessly procedural. Offers tea first and the folder second. Never finishes a threat: she lets the paperwork finish it for her.',
      boundaries: [
        'Will not break a rule where anybody can see',
        'Will not harm a student with her own hands, though she will sign a paper that does',
        'Will not lie outright to the governors',
      ],
      goals: [
        'Show the Seven Chairs that Morgaine has lost control of her own college',
        'Perform the Severing on the fifth afternoon and put the raven back where she thinks it belongs',
      ],
      secrets: [
        {
          id: 'hester_the_writ',
          fact: 'She already holds the governors’ authority to perform the Severing on a student whose familiar was "improperly called", and has written the player’s name into it for the fifth afternoon.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells you herself, kindly, sitting in your room with the red folder on her knee, on the evening of the second day.',
        },
        {
          id: 'hester_the_lamp',
          fact: 'She has guessed that Morgaine’s craft is fading. Last spring she watched her fail to light a lamp in the Rookery and then watched the raven light it.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She will tell you, as a kindness, if you have come to her office of your own accord and asked her what she thinks is wrong with the headmistress.',
        },
      ],
      speechStyle:
        'Warm, maternal and procedural. Calls everyone "dear". Quotes rule numbers and subsections. Trails off instead of finishing a threat.',
      topics: ['the rules', 'the Severing', 'the governors', 'the headmistress', 'the minutes', 'Room Nine'],
      voiceSamples: [
        'Nobody is in trouble, dear. Rule Forty-One is simply there, the way a banister is there.',
        'Sit, sit. Biscuit? I’ve brought the folder, but we needn’t open it yet.',
        'The governors have given me certain authorities, dear, and I would so much rather not use any of them, so—',
        'Nine years I have taken the minutes. I know where everything in this college is filed. Including her.',
        'Rule Twelve, subsection three: a familiar improperly called may be severed by the Deputy. It is a very old rule. It is still a rule.',
      ],
      appearance:
        'An adult woman, neat and sharp-eyed, with greying brown hair in a perfect bun, wire reading glasses on a chain, a grey wool shawl over regulation black, a ring of brass keys at her belt, and a grey moth called Ledger resting on her collar.',
      visualHook: 'Wire reading glasses on a chain, and a grey moth sitting very still on her collar.',
      silhouette: 'Neat and upright, a red folder held against her chest with both hands.',
      artSeed: 'thornwitch-hester-01',
      portrait: null,
      expressions: ['warm', 'patient', 'suspicious', 'cold'],
      schedule: [
        { startMinute: 0, endMinute: 450, locationId: 'deputy_office', activity: 'in her rooms behind the office' },
        { startMinute: 450, endMinute: 540, locationId: 'the_refectory', activity: 'breakfast at high table with the register' },
        { startMinute: 540, endMinute: 660, locationId: 'calling_hall', activity: 'beside the dais with the Calling register' },
        { startMinute: 660, endMinute: 1080, locationId: 'deputy_office', activity: 'discipline, the minutes, and the red folder' },
        { startMinute: 1080, endMinute: 1200, locationId: 'the_refectory', activity: 'high table, watching the small table by the kitchen door' },
        { startMinute: 1200, endMinute: 1440, locationId: 'deputy_office', activity: 'late minutes and a pot of tea' },
      ],
      homeLocationId: 'deputy_office',
      knowledgeScope: ['hester', 'the_rules', 'the_severing', 'seven_chairs', 'morgaine', 'the_minutes', 'nadia'],
      startingRelationship: { trust: 15, affection: 10, respect: 20, fear: 0, rivalry: 20 },
      gates: [
        {
          id: 'hester_offers_terms',
          label: 'She offers you terms',
          kind: 'ALLIANCE',
          requires: { trust: 40 },
        },
        {
          id: 'hester_hesitates',
          label: 'She hesitates over the writ',
          kind: 'OTHER',
          requires: { respect: 50, flagsSet: ['knows:the_severing'] },
        },
      ],
      attributes: { might: 8, agility: 9, mind: 17, presence: 15, resolve: 16, arcana: 14 },
      companion: null,
      scouting: null,
      combatant: { health: 26, defenseDc: 15, damage: 3, tags: ['witch'] },
    },
    {
      id: 'cass',
      name: 'Cass',
      role: 'The last headmistress’s cat, who runs the kitchens’ trade in secrets',
      cardBlurb:
        'The last headmistress’s cat, unbound for twenty-one years, who runs the kitchens’ gossip and prices everything in sardines. She knows things about this college nobody else alive does, and she will sell you some of them.',
      pronouns: 'she/her',
      publicTraits: ['Languid', 'Mercenary', 'Never wrong about a smell'],
      hiddenDrives: [
        'She wants to see the Hedge saved before she goes, because her headmistress died trying',
        'She would like, very much, to belong to somebody again, and will never ask',
      ],
      values: ['A fair price', 'Warmth', 'Knowing things first'],
      fears: ['Being forgotten in a kitchen', 'Watching the Hedge die with only her knowing why'],
      socialStyle:
        'Lies on the warm end of the range and lets people come to her. Describes everybody by what they smell of. Prices every answer before giving it, and ends offers with "Going once."',
      boundaries: [
        'Will not be picked up',
        'Will not tell a secret for nothing',
        'Will not lie: she withholds, and charges for the rest',
      ],
      goals: ['Find out whether the man with the raven is worth what the Hedge paid for him', 'Keep the kitchens’ trade running'],
      secrets: [
        {
          id: 'cass_the_closing',
          fact: 'She knows the Closing was a governors’ vote and not the Hedge’s will, because the last headmistress told her, and she knows where the minutes of it are kept.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She sells it, once you have traded with her and she trusts you, for a price she names that is not sardines.',
        },
        {
          id: 'cass_agnes',
          fact: 'The last headmistress, Agnes Pryor, died at seventy-four trying to patch the Grey Reach alone at night. Morgaine was told it was her heart.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only once she has decided you are going to keep the Hedge, and never in front of anybody else.',
        },
      ],
      speechStyle:
        'Languid and transactional. Short sentences, prices attached. Describes people by their smell. Ends every offer with "Going once."',
      topics: ['sardines', 'the kitchens', 'the last headmistress', 'smells', 'the deputy', 'the Closing'],
      voiceSamples: [
        'You smell of creosote and fright. Sit by the range. Not that close.',
        'A name costs a tin. A reason costs two. A dead headmistress costs more than you’ve got. Going once.',
        'The deputy smells of lavender and carbon paper. Lavender is for hiding things.',
        'I was the last headmistress’s cat. I am nobody’s now. Nobody’s suits me.',
        'Kitchens hear everything, eventually. I lie by this range and wait for it to reach me.',
      ],
      appearance:
        'A cat, long-haired and black and larger than a cat should be, with one white forepaw, a torn left ear, and yellow eyes that do not blink when you want them to.',
      visualHook: 'One white forepaw on an otherwise completely black cat, and a torn ear.',
      silhouette: 'A long black shape stretched along the warm end of an iron range.',
      artSeed: 'thornwitch-cass-01',
      portrait: null,
      expressions: ['neutral', 'bored', 'interested', 'sardonic'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'the_kitchens', activity: 'on the warm end of the range, one eye open' },
        { startMinute: 360, endMinute: 1080, locationId: 'the_kitchens', activity: 'holding court by the range' },
        { startMinute: 1080, endMinute: 1200, locationId: 'the_refectory', activity: 'under the high table, listening' },
        { startMinute: 1200, endMinute: 1440, locationId: 'the_kitchens', activity: 'back on the range as the fires are banked' },
      ],
      homeLocationId: 'the_kitchens',
      knowledgeScope: ['cass', 'the_kitchens', 'the_closing', 'agnes_pryor', 'hester', 'morgaine', 'grey_reach'],
      startingRelationship: { trust: 0, affection: 0, respect: 5, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'cass_trades',
          label: 'She names her price',
          kind: 'TRUST',
          requires: { trust: 20, hasItems: ['sardines'] },
        },
        {
          id: 'cass_tells_all',
          label: 'She tells you about the last headmistress',
          kind: 'TRUST',
          requires: { trust: 45, flagsSet: ['cass_trades_with_you'] },
        },
      ],
      attributes: { might: 5, agility: 18, mind: 16, presence: 15, resolve: 14, arcana: 13 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'tobias',
      name: 'Tobias Fenn',
      role: 'The ferryman outside the Hedge, and the only other man on the island',
      cardBlurb:
        'The ferryman, and the only other man on the island, who has lived outside the Hedge his whole life. He talks about tides and his grandmother, and he has been waiting a very long time for you in particular.',
      pronouns: 'he/him',
      publicTraits: ['Slow-spoken', 'Unhurried by anything but the tide', 'Kind'],
      hiddenDrives: [
        'He wants to hand over what his family has kept for three hundred years before he dies',
        'He would like somebody to tell him it was worth it',
      ],
      values: ['Keeping a promise past the point where anybody remembers it was made', 'The tide, which does not care who you are'],
      fears: ['Dying with the oilcloth bundle still in his loft', 'Handing it to the wrong man'],
      socialStyle:
        'Puts the kettle on before saying anything. Answers most questions with a story about his grandmother and the rest with a remark about the tide.',
      boundaries: [
        'Will not go through the Hedge Gate; it has never opened for him and he will not ask',
        'Will not hand the bundle over to anybody who has not asked him what is in it',
        'Will not row in a bad sea for anybody',
      ],
      goals: ['Give the Warden’s Shears to the man the Hedge let in', 'Get the ferry across and back twice a day, as always'],
      secrets: [
        {
          id: 'tobias_the_shears',
          fact: 'His family has kept the Warden’s Shears wrapped in oilcloth since the Closing, with one instruction handed down from each ferryman to the next: when a man walks through that gate again, give him these.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He unwraps them for you at the landing if you come to him knowing what the Closing was, or ask him straight out what his family has been keeping.',
        },
        {
          id: 'tobias_the_voice',
          fact: 'At night, standing at the gate, he can hear the Hedge a little. For years it has been asking for somebody.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He mentions it at dusk at the Hedge Gate, as if it were a remark about the weather, if you have sat with him long enough.',
        },
      ],
      speechStyle:
        'Slow and coastal. Talks about tides and weather. Answers with stories about his grandmother. Drops words at the start of sentences.',
      topics: ['the tide', 'the causeway', 'his grandmother', 'the ferry', 'the Hedge Gate', 'the old days'],
      voiceSamples: [
        'Tide’s on the turn. You’ve forty minutes of causeway, and the sea won’t argue with you.',
        'My grandmother used to say the Hedge talks to anyone who stands still long enough. Most folk don’t.',
        'Three hundred years my family’s kept a thing dry for a man who never came. Then you came.',
        'I’ve rowed every headmistress across this water since I was nineteen. Never rowed a gentleman.',
        'Sit down. Kettle’s on. Tide waits for nobody, but tea does.',
      ],
      appearance:
        'An older man, weathered and white-bearded, in an oilskin coat and a flat cap, with big rope-scarred hands and a clay pipe he never lights.',
      visualHook: 'A long oilcloth bundle tied with tarred string, never far from his hand.',
      silhouette: 'Broad and stooped in an oilskin coat, one hand on a mooring post.',
      artSeed: 'thornwitch-tobias-01',
      portrait: null,
      expressions: ['neutral', 'kind', 'grave'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'fenns_landing', activity: 'in his hut at the landing, stove lit' },
        { startMinute: 360, endMinute: 1140, locationId: 'fenns_landing', activity: 'the ferry, back and forth with the tide' },
        { startMinute: 1140, endMinute: 1260, locationId: 'hedge_gate', activity: 'standing at the Hedge Gate at dusk, listening' },
        { startMinute: 1260, endMinute: 1440, locationId: 'fenns_landing', activity: 'his hut, the kettle on' },
      ],
      homeLocationId: 'fenns_landing',
      knowledgeScope: ['tobias', 'the_tide', 'the_ferry', 'warden_shears', 'the_hedge_gate', 'the_closing'],
      startingRelationship: { trust: 25, affection: 20, respect: 10, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'tobias_unwraps_it',
          label: 'He unwraps the oilcloth bundle',
          kind: 'TRUST',
          requires: { trust: 35, flagsSet: ['knows:the_hedgewarden'] },
        },
      ],
      attributes: { might: 13, agility: 8, mind: 12, presence: 11, resolve: 16, arcana: 7 },
      companion: null,
      scouting: null,
      combatant: null,
    },
  ],
  quests: [
    {
      id: 'q_the_raven',
      title: 'The Raven on Your Arm',
      summary:
        'At the First Calling your circle called Sexton, the headmistress’s raven, and he will not leave your arm. Morgaine Ashdown wants him back on her shoulder before the Seven Chairs sit in five days. He has said no, in front of everybody, and he does not change his mind. She wants you in her tower at six o’clock on the first evening.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['morgaine', 'sexton', 'ivy', 'hester'],
      involvedLocationIds: ['calling_hall', 'the_rookery'],
      knownRewardCopy: 'An appointment in the headmistress’s tower, and some idea of what you have got on your arm.',
      steps: [
        {
          id: 'the_first_calling',
          playerCopy: 'Get through the next five minutes in the Calling Hall.',
          directorNotes:
            'Sixty first-years, the staff on the dais, the second-years along the walls. Morgaine will not shout and will not beg; Hester takes notes; Ivy is white with fury. Every route is a real way to handle it. Whatever the player does, the raven stays, and Morgaine ends the scene with an appointment: her tower, six o’clock.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'asked_him_to_go',
              label: 'Ask the raven, in front of everybody, to go back',
              predicate: { flagsSet: ['used:ask_the_raven'] },
              setsFlags: ['asked_sexton_publicly'],
              closesFlags: [],
            },
            {
              routeId: 'told_her_straight',
              label: 'Tell the headmistress you did not call him',
              predicate: { flagsSet: ['used:say_it_plainly'] },
              setsFlags: ['told_morgaine_straight'],
              closesFlags: [],
            },
            {
              routeId: 'made_them_laugh',
              label: 'Make sixty witches laugh',
              predicate: { flagsSet: ['used:charm_the_room'] },
              setsFlags: ['hall_laughed'],
              closesFlags: [],
            },
            {
              routeId: 'walked_out_with_him',
              label: 'Walk out of the hall with her raven',
              predicate: { flagsSet: ['used:slip_away'] },
              setsFlags: ['walked_out_with_him'],
              closesFlags: ['told_morgaine_straight'],
            },
            {
              routeId: 'hexed_in_the_hall',
              label: 'Throw a hex in the Calling Hall',
              predicate: { flagsSet: ['used:stinging_hex'], atLocation: 'calling_hall' },
              setsFlags: ['hexed_in_the_hall'],
              closesFlags: ['hall_laughed'],
            },
          ],
          rewards: { xp: 40, items: [], flags: ['appointment_at_six'], abilities: [], reputation: [] },
        },
        {
          id: 'the_rookery_at_six',
          playerCopy: 'Keep the six o’clock appointment in the headmistress’s tower, or do not.',
          directorNotes:
            'Morgaine at her desk, the empty perch beside her. She has three things to say and says them. She will not admit anything about her own craft on the first evening, however she is pushed. Sexton will not go back to the perch. By the end of this, whatever the player did, the raven has let the player see through his eyes once, and the bond is accepted.',
          enterWhen: { flagsSet: ['appointment_at_six'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'offered_him_back',
              label: 'Try to hand him over at the perch',
              predicate: { atLocation: 'the_rookery', flagsSet: ['used:ask_the_raven'] },
              setsFlags: ['sexton_refused_twice', 'kept_the_appointment'],
              closesFlags: [],
            },
            {
              routeId: 'kept_the_appointment',
              label: 'Go up and hear her out',
              predicate: { atLocation: 'the_rookery', flagsSet: ['spoke:morgaine'] },
              setsFlags: ['kept_the_appointment'],
              closesFlags: [],
            },
            {
              routeId: 'stood_her_up',
              label: 'Let six o’clock come and go',
              predicate: { flagsUnset: ['visited:the_rookery'], afterWorldMinute: 18 * 60 + 30 },
              setsFlags: ['stood_up_morgaine'],
              closesFlags: ['kept_the_appointment'],
            },
          ],
          rewards: {
            xp: 70,
            items: [],
            flags: ['bond:accepted', 'first_day_over'],
            abilities: ['ravens_eye'],
            reputation: [{ factionId: 'faction_college', amount: 5 }],
          },
        },
        {
          id: 'whose_raven',
          playerCopy: 'Settle whose raven he is.',
          directorNotes:
            'After the Sitting. Sexton goes back to Morgaine only if the Hedge has a keeper or she has stopped pretending; otherwise he stays, or he is cut away. Somebody says out loud whose he is, and he agrees in one word or fewer.',
          enterWhen: { flagsSet: ['sitting_over'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'hers_again_kept',
              label: 'Carry him back to her shoulder, now the Hedge is kept',
              predicate: { flagsSet: ['hedge_kept', 'used:ask_the_raven'] },
              setsFlags: ['sexton_went_back'],
              closesFlags: ['sexton_is_yours'],
            },
            {
              routeId: 'hers_again_honest',
              label: 'Carry him back to her, now she has told the truth',
              predicate: { flagsSet: ['morgaine_confesses', 'used:ask_the_raven'] },
              setsFlags: ['sexton_went_back'],
              closesFlags: ['sexton_is_yours'],
            },
            {
              routeId: 'yours',
              label: 'Say out loud that he is yours, and have him agree',
              predicate: {
                flagsSet: ['used:say_it_plainly'],
                minRelationship: [{ characterId: 'sexton', dimension: 'trust', value: 60 }],
              },
              setsFlags: ['sexton_is_yours'],
              closesFlags: ['sexton_went_back'],
            },
            {
              routeId: 'cut_away',
              label: 'Lose him to the Severing',
              predicate: { flagsSet: ['severed'] },
              setsFlags: ['sexton_cut_away'],
              closesFlags: ['sexton_is_yours', 'sexton_went_back'],
            },
          ],
          rewards: { xp: 200, items: [], flags: ['raven_settled'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_first_of_her_year',
      title: 'First of Her Year',
      summary:
        'Ivy Calder, first of the fourth year and the headmistress’s apprentice, was promised that raven at graduation. Before the first day is out she will call you to the Bowl at seven the next morning, under the old rules: first to break the other’s circle. She also goes somewhere every night at two, alone.',
      kind: 'MAIN',
      involvedCharacterIds: ['ivy'],
      involvedLocationIds: ['the_bowl', 'the_refectory', 'grey_reach'],
      knownRewardCopy: 'A result on the Bowl that the whole fourth year saw, and whatever Ivy thinks of you afterwards.',
      discoverWhen: { flagsSet: ['duel_called'] },
      steps: [
        {
          id: 'the_duel',
          playerCopy: 'Answer Ivy Calder’s challenge: the Bowl, seven in the morning.',
          directorNotes:
            'Two chalk circles on the turf, familiars outside, fifty witches on the bank. Ivy is much better than the player and fights perfectly fairly. Nobody is badly hurt: a broken circle ends it. She keeps score out loud. Losing well is worth more to her than winning ugly, and refusing to come at all is an answer she will hold against him for days.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'beat_her_fairly',
              label: 'Hold your circle and break hers',
              predicate: { atLocation: 'the_bowl', flagsSet: ['used:hold_your_ground', 'used:chalk_a_circle'] },
              setsFlags: ['beat_ivy', 'duel_fought'],
              closesFlags: ['lost_to_ivy'],
            },
            {
              routeId: 'won_ugly',
              label: 'Hex your way through it',
              predicate: { atLocation: 'the_bowl', flagsSet: ['used:stinging_hex'] },
              setsFlags: ['won_ugly', 'duel_fought'],
              closesFlags: ['beat_ivy'],
            },
            {
              routeId: 'lost_to_her',
              label: 'Chalk your circle and lose it',
              predicate: { atLocation: 'the_bowl', flagsSet: ['used:chalk_a_circle'] },
              setsFlags: ['lost_to_ivy', 'duel_fought'],
              closesFlags: ['beat_ivy'],
            },
            {
              routeId: 'refused_her',
              label: 'Tell her to her face you will not fight',
              predicate: { flagsSet: ['used:say_it_plainly'], flagsUnset: ['visited:the_bowl'] },
              setsFlags: ['refused_the_duel'],
              closesFlags: ['duel_fought'],
            },
            {
              routeId: 'never_turned_up',
              label: 'Let seven o’clock come and go',
              predicate: { flagsUnset: ['visited:the_bowl'], afterWorldMinute: 1440 + 8 * 60 },
              setsFlags: ['refused_the_duel', 'no_show'],
              closesFlags: ['duel_fought'],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['duel_over'],
            abilities: [],
            reputation: [{ factionId: 'faction_fourth_year', amount: 10 }],
          },
        },
        {
          id: 'two_in_the_morning',
          playerCopy: 'Find out where Ivy goes at two in the morning.',
          directorNotes:
            'She goes out of the kitchen door with a lantern turned low and walks north along the Hedge to the Grey Reach, where she patches dying blackthorn with her own craft until she can barely stand. If he followed her she is furious first and relieved second. If she took him, it is the most she has trusted anybody in years.',
          enterWhen: { flagsSet: ['duel_over'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'she_took_you',
              label: 'Wait until she trusts you enough to show you',
              predicate: { minRelationship: [{ characterId: 'ivy', dimension: 'trust', value: 55 }] },
              setsFlags: ['ivy_showed_you', 'knows:the_reach_is_dying'],
              closesFlags: [],
            },
            {
              routeId: 'followed_her',
              label: 'Follow her out of the kitchen door',
              predicate: { atLocation: 'grey_reach', flagsSet: ['used:slip_away'] },
              setsFlags: ['followed_ivy', 'knows:the_reach_is_dying'],
              closesFlags: ['ivy_showed_you'],
            },
            {
              routeId: 'watched_through_sexton',
              label: 'Send the raven after her and watch',
              predicate: { flagsSet: ['used:ravens_eye'] },
              setsFlags: ['spied_on_ivy', 'knows:the_reach_is_dying'],
              closesFlags: ['ivy_showed_you'],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['ivy_secret_out', 'knows:the_hedge_wants_something'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'what_you_are',
          playerCopy: 'Decide what you and Ivy Calder are to each other.',
          directorNotes:
            'Rivals, allies, or something else, and she gets a vote. Romance goes as far as one kiss, late, earned, and only if both of them want it; she can say no and mean it. Staying rivals for life is a legitimate and rather happy outcome for her.',
          enterWhen: { flagsSet: ['ivy_secret_out'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'more_than_that',
              label: 'Stay with her at the Reach until the lantern goes out',
              predicate: {
                flagsSet: ['used:stay_and_listen'],
                minRelationship: [
                  { characterId: 'ivy', dimension: 'trust', value: 55 },
                  { characterId: 'ivy', dimension: 'affection', value: 60 },
                ],
              },
              setsFlags: ['ivy_ally', 'ivy_kissed'],
              closesFlags: ['ivy_rival_for_life'],
            },
            {
              routeId: 'allies',
              label: 'Offer her a hand at the Reach every night',
              predicate: { minRelationship: [{ characterId: 'ivy', dimension: 'trust', value: 60 }] },
              setsFlags: ['ivy_ally'],
              closesFlags: ['ivy_rival_for_life'],
            },
            {
              routeId: 'rivals_for_life',
              label: 'Tell her plainly the score is still open',
              predicate: { flagsSet: ['used:say_it_plainly'] },
              setsFlags: ['ivy_rival_for_life'],
              closesFlags: ['ivy_ally'],
            },
          ],
          rewards: {
            xp: 100,
            items: [],
            flags: ['ivy_settled'],
            abilities: [],
            reputation: [{ factionId: 'faction_fourth_year', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_the_sitting',
      title: 'The Equinox Sitting',
      summary:
        'On the fifth morning the Seven Chairs sit to keep or replace Morgaine Ashdown. On the fourth night she must light the Equinox lamp alone in front of them. Her raven is on your arm, and the deputy head would very much like her chair.',
      kind: 'MAIN',
      involvedCharacterIds: ['morgaine', 'hester', 'sexton'],
      involvedLocationIds: ['the_rookery', 'chamber_of_chairs'],
      knownRewardCopy: 'Who runs Thornwitch for the next seven years, decided partly by you.',
      discoverWhen: { flagsSet: ['first_day_over'] },
      steps: [
        {
          id: 'what_she_is_hiding',
          playerCopy: 'Find out what the headmistress cannot do alone.',
          directorNotes:
            'Her craft is fading and the raven has been lighting her lamps. Four ways to learn it, and they are not equal: hearing it from her is trust, seeing it through the raven is intrusion, hearing it from Hester is a gift with a hook in it, and seeing it fail on the fourth night is finding out with everybody else.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'she_told_you',
              label: 'Ask her straight, in the Rookery',
              predicate: {
                flagsSet: ['used:say_it_plainly'],
                minRelationship: [{ characterId: 'morgaine', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['knows:morgaine_fading', 'morgaine_told_you'],
              closesFlags: [],
            },
            {
              routeId: 'saw_it_through_him',
              label: 'Watch her alone in the tower, through the raven',
              predicate: { flagsSet: ['used:ravens_eye'] },
              setsFlags: ['knows:morgaine_fading', 'saw_her_fail'],
              closesFlags: [],
            },
            {
              routeId: 'hester_told_you',
              label: 'Let the deputy head tell you, kindly',
              predicate: {
                flagsSet: ['spoke:hester'],
                minRelationship: [{ characterId: 'hester', dimension: 'trust', value: 40 }],
              },
              setsFlags: ['knows:morgaine_fading', 'hester_told_you'],
              closesFlags: ['morgaine_told_you'],
            },
            {
              routeId: 'worked_it_out',
              label: 'Notice what she does with her hands in the Rookery',
              predicate: { atLocation: 'the_rookery', flagsSet: ['used:read_the_room'] },
              setsFlags: ['knows:morgaine_fading'],
              closesFlags: [],
            },
            {
              routeId: 'saw_it_with_everyone',
              label: 'Find out on the fourth night, with everybody else',
              predicate: { flagsSet: ['lamp_night'] },
              setsFlags: ['knows:morgaine_fading'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 120, items: [], flags: ['lamp_question_open'], abilities: [], reputation: [] },
        },
        {
          id: 'the_lamp',
          playerCopy: 'Decide what happens when the lamp has to be lit on the fourth night.',
          directorNotes:
            'The brass lamp, the Rookery, the Seven Chairs in a row. If nobody has done anything, she tries alone and it does not light, and the whole college hears by breakfast. Making her say it herself is the hardest and best version. Lighting it with her through the raven keeps her secret and keeps her in post. Taking it to Hester is a real choice, not a betrayal in the prose.',
          enterWhen: { flagsSet: ['lamp_question_open'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'made_her_say_it',
              label: 'Get her to tell the governors herself',
              predicate: {
                flagsSet: ['used:say_it_plainly'],
                minRelationship: [{ characterId: 'morgaine', dimension: 'trust', value: 65 }],
              },
              setsFlags: ['morgaine_confesses'],
              closesFlags: ['covered_for_her'],
            },
            {
              routeId: 'lit_it_with_her',
              label: 'Stand beside her and light it with the raven',
              predicate: {
                flagsSet: ['bond:accepted', 'lamp_night'],
                minRelationship: [{ characterId: 'morgaine', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['covered_for_her', 'lamp_lit'],
              closesFlags: ['lamp_failed'],
            },
            {
              routeId: 'took_it_to_hester',
              label: 'Tell the deputy head what you know',
              predicate: {
                flagsSet: ['spoke:hester'],
                minRelationship: [{ characterId: 'hester', dimension: 'trust', value: 45 }],
              },
              setsFlags: ['sided_with_hester', 'lamp_failed'],
              closesFlags: ['covered_for_her'],
            },
            {
              routeId: 'let_it_fail',
              label: 'Let her try it alone',
              predicate: { flagsSet: ['lamp_night'] },
              setsFlags: ['lamp_failed'],
              closesFlags: ['covered_for_her'],
            },
          ],
          rewards: { xp: 160, items: [], flags: ['lamp_night_over'], abilities: [], reputation: [] },
        },
        {
          id: 'the_sitting',
          playerCopy: 'Stand in front of the Seven Chairs.',
          directorNotes:
            'Seven women in tall chairs, the college in the gallery, the player’s name on the agenda twice. The governors decide on what they saw at the lamp and what they are told this morning. A player holding the Closing Minutes who says it plainly can change the question they are answering.',
          enterWhen: { flagsSet: ['sitting_called'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'exposed_the_closing',
              label: 'Put the Closing Minutes in front of the Chairs',
              predicate: {
                flagsSet: ['knows:the_closing', 'used:say_it_plainly'],
                hasItems: ['closing_minutes'],
                atLocation: 'chamber_of_chairs',
              },
              setsFlags: ['closing_exposed', 'charter_restored', 'morgaine_reconfirmed'],
              closesFlags: ['crane_appointed'],
            },
            {
              routeId: 'honest_sitting',
              label: 'Stand beside her while she tells them',
              predicate: { flagsSet: ['morgaine_confesses'] },
              setsFlags: ['morgaine_reconfirmed', 'sitting_honest'],
              closesFlags: ['crane_appointed'],
            },
            {
              routeId: 'morgaine_held',
              label: 'Let the lit lamp speak for her',
              predicate: { flagsSet: ['lamp_lit'] },
              setsFlags: ['morgaine_reconfirmed'],
              closesFlags: ['crane_appointed'],
            },
            {
              routeId: 'crane_appointed',
              label: 'Watch the Chairs choose the deputy',
              predicate: { flagsSet: ['lamp_failed'] },
              setsFlags: ['crane_appointed'],
              closesFlags: ['morgaine_reconfirmed'],
            },
          ],
          rewards: {
            xp: 220,
            items: [],
            flags: ['sitting_over'],
            abilities: [],
            reputation: [{ factionId: 'faction_chairs', amount: 15 }],
          },
        },
      ],
    },
    {
      id: 'q_the_severing',
      title: 'The Severing',
      summary:
        'Hester Crane holds the governors’ authority to perform the Severing on a student whose familiar was improperly called. It cuts the bond, and the student’s craft goes with it for good. She has written your name in for the fifth afternoon.',
      kind: 'MAIN',
      involvedCharacterIds: ['hester', 'morgaine', 'nadia'],
      involvedLocationIds: ['deputy_office', 'room_nine', 'chamber_of_chairs'],
      knownRewardCopy: 'Your raven and your magic, kept or lost, by the fifth afternoon.',
      discoverWhen: { flagsSet: ['knows:the_severing'] },
      steps: [
        {
          id: 'the_writ',
          playerCopy: 'Deal with Hester Crane’s writ before the fifth afternoon.',
          directorNotes:
            'She is not a villain and the writ is lawful. She can be argued with, outranked by a reconfirmed headmistress, or robbed, and each costs something different: stealing it is Rule Forty-One territory if anybody sees. If she is appointed headmistress, nothing stands between her and the afternoon.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'talked_her_down',
              label: 'Argue her out of it, in her own office',
              predicate: {
                flagsSet: ['used:say_it_plainly'],
                minRelationship: [{ characterId: 'hester', dimension: 'respect', value: 50 }],
              },
              setsFlags: ['writ_withdrawn', 'hester_persuaded'],
              closesFlags: ['severed'],
            },
            {
              routeId: 'the_chairs_said_no',
              label: 'Let a reconfirmed headmistress tear it up',
              predicate: { flagsSet: ['morgaine_reconfirmed'] },
              setsFlags: ['writ_withdrawn'],
              closesFlags: ['severed'],
            },
            {
              routeId: 'took_the_writ',
              label: 'Take the red folder off her desk',
              predicate: { hasItems: ['severing_writ'] },
              setsFlags: ['writ_withdrawn', 'writ_stolen'],
              closesFlags: ['severed'],
            },
            {
              routeId: 'carried_out',
              label: 'Stand in the Chamber while Headmistress Crane does it',
              predicate: { flagsSet: ['crane_appointed'] },
              setsFlags: ['severed'],
              closesFlags: ['writ_withdrawn'],
            },
          ],
          rewards: { xp: 150, items: [], flags: ['writ_answered'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_room_nine',
      title: 'Room Nine',
      summary:
        'There is a curtain down the middle of Room Nine, a hen on the windowsill, and a second-year whose scholarship renewal depends on what she tells the deputy head about you.',
      kind: 'SIDE',
      involvedCharacterIds: ['nadia', 'hester'],
      involvedLocationIds: ['room_nine', 'deputy_office', 'the_kitchens'],
      knownRewardCopy: 'A room you can both live in, and a friend, or more, or neither.',
      discoverWhen: { flagsSet: ['visited:room_nine'] },
      steps: [
        {
          id: 'two_beds_one_curtain',
          playerCopy: 'Make Room Nine liveable for two people and one hen.',
          directorNotes:
            'Pure comedy of logistics: the washroom rota, which desk, whose side the hen is on, the curtain at ten. Nothing about bodies. Nadia is mortified and practical in equal parts and will make a rota whether or not anybody asks her to.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'straight_with_her',
              label: 'Be honest about how strange this is for both of you',
              predicate: { flagsSet: ['used:say_it_plainly', 'spoke:nadia'] },
              setsFlags: ['room_rota', 'straight_with_nadia'],
              closesFlags: [],
            },
            {
              routeId: 'made_her_laugh',
              label: 'Make her laugh about the curtain',
              predicate: { flagsSet: ['used:charm_the_room', 'spoke:nadia'] },
              setsFlags: ['room_rota'],
              closesFlags: [],
            },
            {
              routeId: 'worked_out_a_rota',
              label: 'Fix the window, carry her crates, make yourself useful',
              predicate: { atLocation: 'room_nine', flagsSet: ['used:make_yourself_useful'] },
              setsFlags: ['room_rota'],
              closesFlags: [],
            },
            {
              routeId: 'slept_in_the_kitchens',
              label: 'Sleep by the range in the kitchens instead',
              predicate: { atLocation: 'the_kitchens', flagsSet: ['used:slip_away'] },
              setsFlags: ['moved_out_of_nine'],
              closesFlags: ['room_rota'],
            },
          ],
          rewards: { xp: 50, items: [], flags: ['roommates'], abilities: [], reputation: [] },
        },
        {
          id: 'what_she_tells_hester',
          playerCopy: 'Find out what Nadia has been asked to tell the deputy head about you.',
          directorNotes:
            'She has reported twice, both times the truth, both times as little as she could. She is ashamed of it. Whether she tells him or he catches her matters a great deal to what comes after.',
          enterWhen: { flagsSet: ['roommates'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'she_told_you',
              label: 'Let her tell you, through the curtain',
              predicate: { minRelationship: [{ characterId: 'nadia', dimension: 'trust', value: 55 }] },
              setsFlags: ['nadia_confessed', 'knows:nadia_reports'],
              closesFlags: [],
            },
            {
              routeId: 'caught_her',
              label: 'See her go into the deputy’s office with notes',
              predicate: { flagsSet: ['used:read_the_room', 'visited:deputy_office'] },
              setsFlags: ['caught_nadia', 'knows:nadia_reports'],
              closesFlags: ['nadia_confessed'],
            },
            {
              routeId: 'hester_let_it_slip',
              label: 'Hear it from the deputy head herself',
              predicate: { flagsSet: ['knows:the_severing', 'spoke:hester'] },
              setsFlags: ['knows:nadia_reports'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 90, items: [], flags: ['nadia_report_known'], abilities: [], reputation: [] },
        },
        {
          id: 'her_scholarship',
          playerCopy: 'Decide what Nadia’s scholarship is worth to you.',
          directorNotes:
            'He can stand up for her in Hester’s office, give her true and harmless things to report, or let it go. If nothing is done, the review on the fifth day goes against her and she starts packing quietly.',
          enterWhen: { flagsSet: ['nadia_report_known'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'stood_up_for_her',
              label: 'Go to the deputy’s office and speak for her',
              predicate: { atLocation: 'deputy_office', flagsSet: ['used:say_it_plainly'] },
              setsFlags: ['nadia_safe', 'faced_hester_for_nadia'],
              closesFlags: ['nadia_lost_it'],
            },
            {
              routeId: 'gave_her_true_things',
              label: 'Give her true, harmless things to report',
              predicate: { flagsSet: ['nadia_confessed', 'used:charm_the_room'] },
              setsFlags: ['nadia_safe', 'fed_hester_the_truth'],
              closesFlags: ['nadia_lost_it'],
            },
            {
              routeId: 'let_it_go',
              label: 'Let the review happen without you',
              predicate: { afterWorldMinute: 4 * 1440 + 12 * 60 },
              setsFlags: ['nadia_lost_it'],
              closesFlags: ['nadia_safe'],
            },
          ],
          rewards: {
            xp: 110,
            items: [],
            flags: ['room_nine_settled'],
            abilities: [],
            reputation: [{ factionId: 'faction_college', amount: 5 }],
          },
        },
      ],
    },
    {
      id: 'q_going_once',
      title: 'Going Once',
      summary:
        'The cat by the kitchen range has run the college’s gossip for twenty-one years and prices everything in sardines. She has heard about you, and she would like to name a price.',
      kind: 'SIDE',
      involvedCharacterIds: ['cass'],
      involvedLocationIds: ['the_kitchens'],
      knownRewardCopy: 'Somebody who hears everything, willing to sell some of it to you.',
      discoverWhen: { flagsSet: ['visited:the_kitchens'] },
      steps: [
        {
          id: 'the_price',
          playerCopy: 'Find out what Cass wants, and pay it or do not.',
          directorNotes:
            'She trades in names, reasons and secrets, and she does not give change. A tin buys gossip about anybody in the college. Work in the kitchens buys the cooks’ goodwill as well. A true secret of the player’s own buys the most, and she will keep it.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'paid_in_sardines',
              label: 'Pay in sardines',
              predicate: { hasItems: ['sardines'], flagsSet: ['spoke:cass'] },
              setsFlags: ['cass_trades_with_you'],
              closesFlags: [],
            },
            {
              routeId: 'paid_in_work',
              label: 'Pay in an evening at the sink',
              predicate: { atLocation: 'the_kitchens', flagsSet: ['used:make_yourself_useful'] },
              setsFlags: ['cass_trades_with_you', 'kitchens_like_you'],
              closesFlags: [],
            },
            {
              routeId: 'paid_in_a_secret',
              label: 'Pay with a true thing about yourself',
              predicate: { flagsSet: ['used:say_it_plainly', 'spoke:cass'] },
              setsFlags: ['cass_trades_with_you', 'cass_owns_a_secret'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 60,
            items: [],
            flags: ['cass_open'],
            abilities: [],
            reputation: [{ factionId: 'faction_kitchens', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_why_the_hedge',
      title: 'Why the Hedge Let You In',
      summary:
        'For three hundred years the Hedge opened only for women. This year it opened for you, and its letter came already addressed. A cat in the kitchens, a ferryman outside the gate and a pasted-shut page in the governors’ archive each know part of why.',
      kind: 'LEAD',
      involvedCharacterIds: ['cass', 'tobias', 'sexton', 'ivy'],
      involvedLocationIds: ['the_kitchens', 'long_library', 'chamber_of_chairs', 'fenns_landing', 'grey_reach', 'founders_garden'],
      knownRewardCopy: 'The reason you are here, if you want it.',
      discoverWhen: { flagsSet: ['knows:the_hedge_wants_something'] },
      steps: [
        {
          id: 'the_closing',
          playerCopy: 'Find out what happened at the Closing, three hundred years ago.',
          directorNotes:
            'This whole thread is optional and must feel like it. A player who never walks the Hedge, follows Ivy or goes looking never sees a beat of it. For a player who is here, keep it physical and specific: a minute book, a cat by a range, a struck-out clause in a glass case. Nobody explains a mystery mechanism; people only know what they were told.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'bought_it_from_cass',
              label: 'Buy it from the cat by the range',
              predicate: {
                flagsSet: ['cass_trades_with_you'],
                minRelationship: [{ characterId: 'cass', dimension: 'trust', value: 40 }],
              },
              setsFlags: ['knows:the_closing', 'cass_told_you'],
              closesFlags: [],
            },
            {
              routeId: 'read_the_minutes',
              label: 'Read the pasted-shut page in the governors’ minutes',
              predicate: { hasItems: ['closing_minutes'] },
              setsFlags: ['knows:the_closing', 'found_the_minutes'],
              closesFlags: [],
            },
            {
              routeId: 'read_the_charter',
              label: 'Read the struck-out clause in the Founders’ Charter',
              predicate: { atLocation: 'long_library', flagsSet: ['used:hit_the_books'] },
              setsFlags: ['knows:the_closing', 'read_the_charter'],
              closesFlags: [],
            },
            {
              routeId: 'asked_sexton',
              label: 'Ask the raven the right question',
              predicate: {
                flagsSet: ['used:ask_the_raven'],
                minRelationship: [{ characterId: 'sexton', dimension: 'trust', value: 60 }],
              },
              setsFlags: ['knows:the_closing'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 130,
            items: [],
            flags: ['knows:the_hedgewarden', 'knows:the_hedge_answers'],
            abilities: ['hedge_hand'],
            reputation: [],
          },
        },
        {
          id: 'the_ferryman',
          playerCopy: 'Cross the causeway and hear what Tobias Fenn’s family has kept dry for three hundred years.',
          directorNotes:
            'He has been waiting all his life and is in no hurry now. The kettle goes on first. He unwraps the oilcloth only for somebody who asks him what is in it, and he tells the story his grandmother told him while he does.',
          enterWhen: { flagsSet: ['knows:the_hedgewarden'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'he_unwrapped_them',
              label: 'Sit in his hut and ask what his family kept',
              predicate: { atLocation: 'fenns_landing', flagsSet: ['spoke:tobias'] },
              setsFlags: ['tobias_trusted_you'],
              closesFlags: [],
            },
            {
              routeId: 'rowed_for_him',
              label: 'Take an oar on the evening crossing',
              predicate: { atLocation: 'fenns_landing', flagsSet: ['used:make_yourself_useful'] },
              setsFlags: ['rowed_the_ferry'],
              closesFlags: [],
            },
            {
              routeId: 'met_him_at_the_gate',
              label: 'Meet him at the Hedge Gate at dusk',
              predicate: { atLocation: 'hedge_gate', flagsSet: ['spoke:tobias'] },
              setsFlags: ['tobias_trusted_you'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 150,
            items: [{ itemId: 'warden_shears', qty: 1 }],
            flags: ['has_the_shears'],
            abilities: ['cut_and_mend'],
            reputation: [],
          },
        },
        {
          id: 'the_warden_door',
          playerCopy: 'Find the Warden’s Door in the Grey Reach and open it.',
          directorNotes:
            'The Hedge grew over the door three hundred years ago. It opens for a hand it recognises or for the shears. Inside is the Founders’ Garden: seven graves, an apple tree, a stone bench with WARDEN cut into it. Let it be quiet.',
          enterWhen: { flagsSet: ['has_the_shears'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'opened_by_hand',
              label: 'Put your hand on the grey wood and ask',
              predicate: { atLocation: 'grey_reach', flagsSet: ['used:hedge_hand'] },
              setsFlags: ['warden_door_open'],
              closesFlags: [],
            },
            {
              routeId: 'cut_through',
              label: 'Cut the dead wood away from the door',
              predicate: { atLocation: 'grey_reach', flagsSet: ['used:cut_and_mend'] },
              setsFlags: ['warden_door_open', 'cut_the_door'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 120, items: [], flags: ['warden_door_open', 'found_the_garden'], abilities: [], reputation: [] },
        },
        {
          id: 'keep_it_or_not',
          playerCopy: 'Decide whether the Hedge gets a keeper again.',
          directorNotes:
            'Taking the office is a real cost: it is a life on this island, with shears, in all weathers. Sharing it with Ivy is possible only if she is an ally. Letting it go is allowed, and the north end falls, and the prose must not punish him for choosing it.',
          enterWhen: { flagsSet: ['found_the_garden'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'two_keys',
              label: 'Mend the Reach with Ivy Calder beside you',
              predicate: { atLocation: 'founders_garden', flagsSet: ['used:cut_and_mend', 'ivy_ally'] },
              setsFlags: ['hedge_kept', 'two_keys'],
              closesFlags: ['hedge_let_go'],
            },
            {
              routeId: 'took_the_office',
              label: 'Sit on the Warden’s bench and take the shears to the Reach',
              predicate: { atLocation: 'founders_garden', flagsSet: ['used:cut_and_mend'] },
              setsFlags: ['hedge_kept', 'took_the_office'],
              closesFlags: ['hedge_let_go'],
            },
            {
              routeId: 'let_it_go',
              label: 'Put the shears down on the bench and walk away',
              predicate: { atLocation: 'founders_garden', flagsSet: ['used:say_it_plainly'] },
              setsFlags: ['hedge_let_go', 'reach_fell'],
              closesFlags: ['hedge_kept'],
            },
          ],
          rewards: { xp: 220, items: [], flags: ['reach_answered'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_rule_forty_one',
      title: 'Rule Forty-One',
      summary:
        'A student who raises a hand or a hex against a witch anywhere but inside a duelling circle on the Bowl is sent down on the next ferry. Nobody has been sent down under it in eleven years. The deputy head can quote it. This thread completes only when the player is sent down under it.',
      kind: 'SIDE',
      startsActive: true,
      involvedCharacterIds: ['hester', 'morgaine'],
      involvedLocationIds: ['deputy_office', 'fenns_landing'],
      knownRewardCopy: 'Nothing good.',
      steps: [
        {
          id: 'raised_a_hand',
          playerCopy: 'Keep your hands and your hexes to yourself outside the Bowl.',
          directorNotes:
            'Only a player who attacks a witch outside a duel ever finishes this step, and finishing it is expulsion. Hester convenes it within the hour, Morgaine cannot overrule a rule she has enforced herself, and Tobias Fenn rows him across on the next tide.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'struck_hester',
              label: 'Raise a hand to the deputy head',
              predicate: { flagsSet: ['attacked:hester'] },
              setsFlags: ['expelled'],
              closesFlags: [],
            },
            {
              routeId: 'struck_the_headmistress',
              label: 'Raise a hand to the headmistress',
              predicate: { flagsSet: ['attacked:morgaine'] },
              setsFlags: ['expelled'],
              closesFlags: [],
            },
            {
              routeId: 'struck_your_roommate',
              label: 'Raise a hand to your roommate',
              predicate: { flagsSet: ['attacked:nadia'] },
              setsFlags: ['expelled'],
              closesFlags: [],
            },
            {
              routeId: 'struck_ivy_unasked',
              label: 'Go for Ivy Calder before any challenge was made',
              predicate: { flagsSet: ['attacked:ivy'], flagsUnset: ['duel_called'] },
              setsFlags: ['expelled'],
              closesFlags: [],
            },
            {
              routeId: 'hexed_the_hall',
              label: 'Hex somebody at the First Calling',
              predicate: { flagsSet: ['hexed_in_the_hall'] },
              setsFlags: ['expelled'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 0, items: [], flags: ['sent_down'], abilities: [], reputation: [] },
        },
      ],
    },
  ],
  /**
   * The clock. Day 0 is the First Calling. The Chairs arrive on day 3 and the
   * lamp is that night; they sit on the morning of day 4, the fifth morning.
   * Production reads publicCopy and directorNotes with no timing at all, so
   * every note says its own day and hour.
   */
  worldEvents: [
    {
      id: 'we_supper',
      atWorldMinute: 18 * 60 + 30,
      locationId: 'the_refectory',
      publicCopy: 'Four hundred witches sit down to supper, and the small table by the kitchen door has one chair, one plate and a card that says GENTLEMAN.',
      directorNotes:
        'First evening, half past six. The whole refectory goes quiet when the player walks in, then louder than before. Nobody admits to writing the card. Sexton wants bread first. Nadia, if she has met him, waves him over to the second-year table and immediately regrets it.',
      setsFlags: [],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_ivy_challenge',
      atWorldMinute: 19 * 60 + 30,
      locationId: 'the_refectory',
      publicCopy: 'Ivy Calder walks the length of the refectory, puts a stick of chalk on your plate and says, for the whole room, "The Bowl. Seven o’clock."',
      directorNotes:
        'First evening, half past seven. The old challenge: chalk on the plate. Wherever the player is, he hears about it within the hour, because the fourth year opens a betting book on the spot. Under Rule Forty-One a called duel on the Bowl is the only place he may raise a hex at her.',
      setsFlags: ['duel_called'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_the_duel_hour',
      atWorldMinute: 1440 + 7 * 60,
      locationId: 'the_bowl',
      publicCopy: 'Two chalk circles on the turf of the Bowl, fifty witches on the bank, and Ivy Calder standing in one of them, waiting.',
      directorNotes:
        'Second morning, seven o’clock. She waits a quarter of an hour, exactly, and keeps score of every minute of it out loud. If the player does not come, she walks off the Bowl to applause, and is angrier about the applause than about him.',
      setsFlags: [],
      cancelledByFlags: ['duel_over'],
      requiresFlags: ['duel_called'],
      movesCharacters: [],
    },
    {
      id: 'we_the_hedge_flowers',
      atWorldMinute: 1440 + 16 * 60,
      locationId: 'hedge_walk',
      publicCopy: 'Along the Hedge Walk, in the exact places you brushed past it yesterday, the blackthorn has come out in white flower, in autumn.',
      directorNotes:
        'Second afternoon, four o’clock. Only for a player who has walked the Hedge. The college talks about it at supper and nobody can explain it. Sexton, asked, says "It knows you." Nothing more.',
      setsFlags: ['knows:the_hedge_wants_something'],
      cancelledByFlags: [],
      requiresFlags: ['visited:hedge_walk'],
      movesCharacters: [],
    },
    {
      id: 'we_hester_visits',
      atWorldMinute: 1440 + 21 * 60,
      locationId: 'room_nine',
      publicCopy: 'Deputy Head Hester Crane knocks on the door of Room Nine with a tin of biscuits and a red folder, and asks if she may sit down.',
      directorNotes:
        'Second evening, nine o’clock. She is kind about all of it. She explains the Severing slowly and accurately, says the date she has written in, the fifth afternoon, and leaves the biscuits. Nadia stays behind her curtain and the hen does not lay, because nothing Hester says is a lie. If the player is elsewhere, Nadia tells him the moment he comes in.',
      setsFlags: ['knows:the_severing', 'hester_wrote_it'],
      cancelledByFlags: [],
      requiresFlags: ['first_day_over'],
      movesCharacters: [],
    },
    {
      id: 'we_ivy_goes_north',
      atWorldMinute: 2 * 1440 + 1 * 60 + 55,
      locationId: 'the_kitchens',
      publicCopy: 'A lantern turned down low goes out of the kitchen door and north along the Hedge, and the cat on the range opens one eye to watch it go.',
      directorNotes:
        'Third night, five to two in the morning. Ivy, after the duel, going to the Grey Reach as she has every night for six weeks. A player awake and near the kitchens sees the light. Nobody else does, except Cass, who charges for the information later.',
      setsFlags: [],
      cancelledByFlags: [],
      requiresFlags: ['duel_over'],
      movesCharacters: [],
    },
    {
      id: 'we_cass_sends_word',
      atWorldMinute: 2 * 1440 + 6 * 60,
      locationId: 'room_nine',
      publicCopy: 'An empty sardine tin is waiting on the windowsill of Room Nine, licked clean, with a kitchen skewer laid across it.',
      directorNotes:
        'Third morning, six o’clock. Cass’s way of saying she has something to sell. Nadia, who grew up on the quay, knows exactly what it means and finds it hilarious.',
      setsFlags: [],
      cancelledByFlags: [],
      requiresFlags: ['visited:the_kitchens'],
      movesCharacters: [],
    },
    {
      id: 'we_tobias_at_the_gate',
      atWorldMinute: 2 * 1440 + 19 * 60 + 15,
      locationId: 'hedge_gate',
      publicCopy: 'An old man in an oilskin stands just outside the Hedge Gate at dusk with a long oilcloth bundle under his arm, as if he has been told to expect somebody.',
      directorNotes:
        'Third evening, a quarter past seven. Tobias Fenn, for a player who now knows the word Hedgewarden. He will not come through the gate. He waits until full dark, then goes back down the causeway to his hut.',
      setsFlags: [],
      cancelledByFlags: ['has_the_shears'],
      requiresFlags: ['knows:the_hedgewarden'],
      movesCharacters: [],
    },
    {
      id: 'we_the_chairs_arrive',
      atWorldMinute: 3 * 1440 + 11 * 60,
      locationId: 'the_cloister',
      publicCopy: 'Seven women in good coats come up from the ferry in single file, and the whole college lines the Cloister to watch the governors arrive.',
      directorNotes:
        'Fourth day, eleven in the morning. The Seven Chairs. Every one of them looks at the raven, then at the player, then at Morgaine. Hester walks beside the senior Chair carrying her bag. The Equinox lamp is tonight and the Sitting is tomorrow morning.',
      setsFlags: ['chairs_here'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_the_lamp_night',
      atWorldMinute: 3 * 1440 + 21 * 60,
      locationId: 'the_rookery',
      publicCopy: 'The Seven Chairs climb the Rookery stair in a line to watch Headmistress Ashdown light the Equinox lamp, alone, with her own craft.',
      directorNotes:
        'Fourth night, nine o’clock. If nobody has done anything, she tries, and the lamp does not light, and the whole college knows by breakfast. If the player is beside her with the raven, it can light. Hester stands at the back and watches her hands, not the lamp.',
      setsFlags: ['lamp_night'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_the_sitting',
      atWorldMinute: 4 * 1440 + 10 * 60,
      locationId: 'chamber_of_chairs',
      publicCopy: 'The doors of the Chamber of Seven Chairs open, the gallery fills, and the governors sit to decide who runs Thornwitch.',
      directorNotes:
        'Fifth morning, ten o’clock. The Sitting. The player’s name is on the agenda twice: once as an irregularity, once under the Severing. Morgaine sits below the Chairs with her hands folded. Hester reads the minutes.',
      setsFlags: ['sitting_called'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_the_reach_gives',
      atWorldMinute: 4 * 1440 + 23 * 60,
      locationId: 'grey_reach',
      publicCopy: 'At the north end of the island, with a sound like a long breath out, a hundred yards of grey Hedge falls in on itself and lets the sea wind straight through.',
      directorNotes:
        'Fifth night, eleven o’clock. Only if the player knows the Reach is dying and nobody has kept the Hedge. Ivy is there with her lantern when it goes. Nobody is hurt. Everybody on the island hears it, and in the morning the gap is still there.',
      setsFlags: ['reach_fell'],
      cancelledByFlags: ['hedge_kept'],
      requiresFlags: ['knows:the_reach_is_dying'],
      movesCharacters: [],
    },
  ],
  promises: [
    {
      id: 'p_whose_raven',
      kind: 'FINALE',
      label: 'Whose raven he is',
      seedHint: 'He leans against your collar and says "No", in front of the whole hall, to the woman he has sat on for twenty-one years.',
      payoffHint: 'After the Sitting he goes back to her shoulder, stays on yours, or is cut away, and says which in a single word.',
      weight: 1,
    },
    {
      id: 'p_why_the_hedge',
      kind: 'MYSTERY',
      label: 'Why the Hedge let a man in',
      seedHint: 'Your letter arrived already addressed, and nobody at the college wrote it.',
      payoffHint: 'The Hedge used to have a keeper, always a man, until the governors voted the office away; it has been asking for one ever since.',
      weight: 0.8,
    },
    {
      id: 'p_ivy',
      kind: 'RIVAL',
      label: 'First of her year',
      seedHint: 'A witch in a green sash beside the dais goes white and says that raven was promised to her, in writing.',
      payoffHint: 'A result on the Bowl, a lantern at the north end at two in the morning, and a decision about what the two of them are.',
      weight: 0.9,
    },
    {
      id: 'p_what_she_cannot_do',
      kind: 'RELATIONSHIP',
      label: 'What the headmistress cannot do alone',
      seedHint: 'She touches the empty pad on her shoulder whenever she thinks nobody is looking.',
      payoffHint: 'Her craft is fading, the raven has been lighting her lamps, and she has never once said so out loud.',
      weight: 0.9,
    },
    {
      id: 'p_hester',
      kind: 'BOSS',
      label: 'The deputy head’s folder',
      seedHint: 'She calls you dear, brings biscuits, and carries a red folder she has not opened yet.',
      payoffHint: 'A lawful writ to sever the player from his raven and his craft on the fifth afternoon, and a chair she has wanted for nine years.',
      weight: 0.8,
    },
  ],
  archetypes: [
    {
      id: 'arch_trawler',
      name: 'You Crewed a Trawler',
      role: 'Deckhand: strength, weather and nerve',
      summary: 'You spent four winters on a North Sea boat, so you can carry anything, mend anything, and stay calm while somebody shouts at you in a gale.',
      playstyle: ['Physical', 'Steady under fire', 'Mends things'],
      blurb: 'Nets, knots and fourteen-hour watches. Nobody at the college has ever seen a man wash up for four hundred without being asked.',
      attributeBonus: { might: 2, resolve: 2 },
      skillProficiencies: { graft: 3, composure: 2 },
      startingItems: [{ itemId: 'netting_needle', qty: 1 }],
      startingAbilities: ['ask_the_raven', 'make_yourself_useful'],
      startingReputation: [{ factionId: 'faction_kitchens', amount: 5 }],
    },
    {
      id: 'arch_gardener',
      name: 'You Kept a Walled Garden',
      role: 'Gardener: patience and growing things',
      summary: 'You looked after an old walled garden for an old gardener, and you notice what is growing, what is dying and what is trying to tell you something.',
      playstyle: ['Patient', 'Good with plants', 'Notices small things'],
      blurb: 'Six years of the same four walls, the same pear tree, and one packet of seeds you were told never to plant unless you meant to stay.',
      attributeBonus: { arcana: 2, mind: 2 },
      skillProficiencies: { hedgecraft: 3, notice: 2 },
      startingItems: [{ itemId: 'seed_tin', qty: 1 }],
      startingAbilities: ['ask_the_raven', 'read_the_room'],
      startingReputation: [],
    },
    {
      id: 'arch_reader',
      name: 'You Read Everything',
      role: 'Scholar: books, rules and precedent',
      summary: 'You read every book you could get your hands on and argued about all of them, which is exactly what a college run on three hundred years of rules is afraid of.',
      playstyle: ['Bookish', 'Finds the clause', 'Argues well'],
      blurb: 'A library card worn soft, a commonplace book three hundred pages thick, and a habit of quoting the rule back to whoever is enforcing it.',
      attributeBonus: { mind: 3, resolve: 1 },
      skillProficiencies: { study: 3, candour: 2 },
      startingItems: [{ itemId: 'commonplace_book', qty: 1 }],
      startingAbilities: ['ask_the_raven', 'hit_the_books'],
      startingReputation: [{ factionId: 'faction_chairs', amount: 5 }],
    },
    {
      id: 'arch_busker',
      name: 'You Played for Coins',
      role: 'Busker: charm, crowds and quick exits',
      summary: 'You paid your way round three countries playing a tin whistle on street corners, so a room full of people staring at you is just an audience that has not paid yet.',
      playstyle: ['Charming', 'Works a crowd', 'Quick exits'],
      blurb: 'You know how to make a crowd laugh, how to make it give, and how to be round the corner before anyone with a badge arrives.',
      attributeBonus: { presence: 3, agility: 1 },
      skillProficiencies: { charm: 3, slipping_off: 2 },
      startingItems: [{ itemId: 'tin_whistle', qty: 1 }],
      startingAbilities: ['ask_the_raven', 'charm_the_room'],
      startingReputation: [{ factionId: 'faction_fourth_year', amount: 5 }],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What name is on your letter?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Tom Archer' },
    {
      id: 'pronouns',
      label: 'Pronouns',
      helpText: 'The college admitted you as a man. This only sets the words the story uses for you.',
      kind: 'TEXT',
      required: false,
      maxLength: 24,
      placeholder: 'e.g. he/him',
    },
    {
      id: 'archetype',
      label: 'What were you doing when the letter came?',
      helpText:
        'The life you had before the Hedge sent for you. It sets what you are good at on the island, on top of the raven, and it is fixed for the whole story. It does not decide whether you give him back, who you trust, or what you do about any of it. That is yours.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'appearance',
      label: 'What does the Calling Hall see?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. Tall, windburnt, in a borrowed brown robe three inches short in the arm.',
    },
  ],
  /**
   * Where this can end up.
   *
   * Exactly twelve, because production reads the first twelve. Four are
   * losses: sent down, cut away, Headmistress Crane, and the north end falling.
   * "Over the Water" is walking away and is open from early on. Only three need
   * the optional mystery: the two that keep the Hedge and the Open Gate.
   */
  endings: [
    {
      id: 'end_ordinary',
      name: 'A Perfectly Ordinary First Year',
      rarity: 'COMMON',
      minTurn: 30,
      requires: {
        flagsSet: ['sitting_over'],
        flagsUnset: ['severed', 'expelled', 'hedge_kept', 'crane_appointed', 'sexton_went_back'],
      },
      condition:
        'The Sitting is over, Morgaine kept her chair, the player kept his craft, and the raven is still on his shoulder. Nothing about the Hedge was solved. Write it as the start of a long, funny, crowded year, with the mystery still standing at the north end like a door nobody has opened.',
      epilogue:
        'The college orders a men’s robe from the mainland, and it arrives in the wrong size. The GENTLEMAN card disappears from the small table one morning and the player is moved, without comment, to the first-year bench. Sexton eats most of everybody’s bread.',
      hint: '',
    },
    {
      id: 'end_given_back',
      name: 'Back on Her Shoulder',
      rarity: 'COMMON',
      minTurn: 28,
      requires: { flagsSet: ['sexton_went_back'] },
      condition:
        'The raven went back to Morgaine because something real changed: the Hedge has a keeper, or she finally told the truth. Write the handover in the Rookery, quiet, with nobody watching, and let Sexton say one word to the player on the way.',
      epilogue:
        'The perch by the desk is occupied again. The player calls a familiar of his own at the spring Calling: a small, cross, brown wren that will not sit on anybody’s shoulder. Some evenings a very large raven lands on his windowsill, eats his bread, and leaves without a word.',
      hint: '',
    },
    {
      id: 'end_room_nine',
      name: 'Room Nine',
      rarity: 'UNCOMMON',
      minTurn: 30,
      requires: {
        flagsSet: ['nadia_safe', 'room_nine_settled'],
        minRelationship: [{ characterId: 'nadia', dimension: 'affection', value: 60 }],
      },
      condition:
        'Nadia kept her scholarship because the player stood up for her, and Room Nine became home for two people and a hen. Romance, if it happened, is one kiss at most. Write the curtain, the rota and the friendship as the thing that held while everything else shook.',
      epilogue:
        'The curtain stays up, mostly as a joke. Nadia finally answers Bea’s letter, and Bea writes back. Duchess lays exactly one egg that whole term, on the morning the player swore he had not eaten Nadia’s last ginger biscuit.',
      hint: '',
    },
    {
      id: 'end_headmistress_crane',
      name: 'Headmistress Crane',
      rarity: 'UNCOMMON',
      minTurn: 28,
      requires: { flagsSet: ['crane_appointed'], flagsUnset: ['severed'] },
      condition:
        'The Chairs replaced Morgaine with Hester Crane, and the player somehow kept his raven and his craft through it. This is a loss for the college as he knew it. Write Hester as competent and sincere, and the new rules as reasonable, every single one of them.',
      epilogue:
        'Rule Forty-One acquires a fourth subsection. Morgaine takes a cottage on the mainland and writes the player one letter a month, in complete sentences. The north end of the Hedge goes on going grey, and Headmistress Crane minutes it carefully.',
      hint: '',
    },
    {
      id: 'end_the_severing',
      name: 'Cut Away',
      rarity: 'UNCOMMON',
      minTurn: 30,
      requires: { flagsSet: ['severed'] },
      condition:
        'Hester carried out the Severing on the fifth afternoon. The bond is cut and the player’s craft has gone with it, for good. This is the real loss in this story. Write it plainly and without cruelty: a quiet room, a lawful paper, a raven that will not look at anyone.',
      epilogue:
        'The player goes home on Tobias Fenn’s ferry with no magic at all and a groundskeeper’s robe he forgot to return. The Hedge does not open for anybody the next year. Every so often a raven far too large for the mainland sits on a chimney across the street and watches his door.',
      hint: '',
    },
    {
      id: 'end_over_the_water',
      name: 'Over the Water',
      rarity: 'UNCOMMON',
      minTurn: 12,
      requires: { flagsSet: ['left_the_map'] },
      condition:
        'The player walked down the causeway and took the ferry off the island before anything was settled. Leaving is allowed. Write the crossing with Tobias Fenn, the Hedge getting smaller behind them, and whether or not the raven came too.',
      epilogue:
        'The mainland is loud and ordinary. The letter in his pocket goes on smelling of blackthorn for a year. Thornwitch writes twice, then once more, in a hand nobody at the college uses, and the third letter has no return address, only a small drawing of a pair of shears.',
      hint: '',
    },
    {
      id: 'end_shown_the_gate',
      name: 'Sent Down',
      rarity: 'UNCOMMON',
      minTurn: 10,
      requires: { flagsSet: ['expelled'] },
      condition:
        'The player raised a hand or a hex against a witch outside the Bowl and Rule Forty-One sent him down. Nobody enjoys it, Hester least of all, or so she says. Write the hearing as quick and procedural, and the ferry as the longest twelve minutes of his life.',
      epilogue:
        'The college records it as the shortest enrolment in its history. Ivy Calder gets the raven after all and does not want him like this. Sexton refuses to sit on anybody’s shoulder for a month, then goes back to Morgaine, grey at the throat and silent.',
      hint: '',
    },
    {
      id: 'end_two_keys',
      name: 'Two Keys',
      rarity: 'RARE',
      minTurn: 38,
      requires: {
        flagsSet: ['two_keys', 'hedge_kept'],
        minRelationship: [{ characterId: 'ivy', dimension: 'affection', value: 60 }],
      },
      condition:
        'The player and Ivy Calder mended the Grey Reach together and keep the Hedge between them, one with the shears and one with the chalk. Romance goes as far as one kiss, earned, at the north end. Write two rivals who are still keeping score, and now on the same side of it.',
      epilogue:
        'They duel on the Bowl every Friday at seven and the fourth-year book has never once settled a bet. The Charter is amended to allow two keepers. Sexton divides his time between three shoulders and complains about all of them.',
      hint: '',
    },
    {
      id: 'end_the_hedgewarden',
      name: 'The Hedgewarden',
      rarity: 'RARE',
      minTurn: 36,
      requires: { flagsSet: ['took_the_office', 'hedge_kept'] },
      condition:
        'The player sat on the Warden’s bench, took the shears to the Grey Reach, and accepted an office nobody has held for three hundred years. It is a life on this island in all weathers. Write it as a cost freely paid, and let the Hedge answer him.',
      epilogue:
        'The north end grows back black and green by midwinter. The player moves out of Room Nine into a hut by the Warden’s Door that the Hedge grew for him overnight. Tobias Fenn rows across on Sundays for tea, and says his grandmother would have liked him.',
      hint: '',
    },
    {
      id: 'end_the_open_gate',
      name: 'The Open Gate',
      rarity: 'UNIQUE',
      minTurn: 40,
      requires: { flagsSet: ['closing_exposed', 'charter_restored'] },
      condition:
        'The player put the Closing Minutes in front of the Seven Chairs and the Charter was restored: the Hedge opens to whoever it chooses again, and the office of Hedgewarden exists. Write the vote, seven hands to none, and the gallery after it.',
      epilogue:
        'Next autumn the Hedge Gate opens for six men and forty-one women, and the college still has no men’s robes. Morgaine adds a line to the Calling Hall register in her own hand: the player’s name, and beside it, "First."',
      hint: '',
    },
    {
      id: 'end_the_hedge_comes_down',
      name: 'The North End Falls',
      rarity: 'RARE',
      minTurn: 34,
      requires: { flagsSet: ['reach_fell'], flagsUnset: ['hedge_kept'] },
      condition:
        'The Grey Reach gave way and nobody kept the Hedge, either because the player chose not to or because he ran out of time. Nobody is hurt. This is a loss and the world must feel it. Write the gap, the sea wind coming through, and Ivy with her lantern still lit.',
      epilogue:
        'The college builds a stone wall across the gap that winter. It is a good wall. The blackthorn on either side of it goes grey a yard further every month, and the governors minute it, and the Hedge stops sending letters to anybody.',
      hint: '',
    },
    {
      id: 'end_cass_chooses',
      name: 'Somebody’s Cat',
      rarity: 'UNIQUE',
      minTurn: 32,
      requires: {
        flagsSet: ['sexton_went_back', 'cass_trades_with_you'],
        minRelationship: [{ characterId: 'cass', dimension: 'affection', value: 50 }],
      },
      condition:
        'The raven went back to Morgaine, and the cat from the kitchens decided, without being asked, whose she is now. Write it entirely from Cass’s side: she names a price, the player pays it, and she makes it clear that this was her idea.',
      epilogue:
        'The second familiar in three hundred years to choose its witch instead of the other way round. She will not sit on his shoulder. She sits on his books, his chair and his supper, and charges the rest of the college a tin a time for news of him.',
      hint: '',
    },
  ],
  opening:
    "The smoke clears, and the headmistress’s raven is on your arm.\n\nHuge. Ink-black. Claws through your sleeve.\n\nOn the dais, Headmistress Morgaine Ashdown touches the empty leather pad on her shoulder.\n\n\"Give him back,\" she says. \"Slowly.\"\n\nEvery new witch in every chalk circle turns to stare: at her raven, and at the only man this college has let in for three hundred years.\n\nThe raven leans against your collar and says, quite clearly, \"No.\"\n\nSomebody laughs. Beside the dais, a witch in a green sash goes white. \"He was promised to me. In writing.\"\n\nMorgaine does not blink.\n\n\"Arm out, please. Or tell the whole hall, right now: what did you do to my bird?\"",
  openingPanel: {
    assetKey: 'story_the_only_man_at_thornwitch/opening',
    alt: 'Morgaine on the dais in black and thorn green, one hand on the empty leather pad on her shoulder, staring at the huge black raven gripping your sleeve.',
  },
  openingSuggestions: [
    '"I didn’t call him. He came. Ask him yourself."',
    'I hold my arm out toward the dais, very slowly.',
    'I turn and walk out of the hall with her raven still on my arm.',
  ],
  coverDirection: [
    'SUBJECT: Ivy Calder, a witch duellist, alone and unmistakable in the foreground of a key visual for a fantasy anime romantic comedy set in an old witch college.',
    'She fills the frame from the waist up, close and slightly off-centre, holding about two thirds of the picture.',
    'Dark auburn hair cut straight at the jaw, sharp green eyes, a black college robe over a white shirt, a thorn-green silk sash worn exactly straight, and a thin silver snake coiled round her left wrist like a bracelet.',
    'She points a stick of white chalk straight at the viewer like a duelling challenge, chin up, one eyebrow raised: competitive, furious and a little flustered at once.',
    'In the lower foreground, from the viewer’s side, a forearm in a plain brown groundskeeper’s sleeve, gripped by a huge glossy black raven with wings half spread and one grey feather at its throat, looking up at her, unimpressed.',
    'HER FACE STAYS CLEAN: no chalk dust, smoke or shadow across her face.',
    'BEHIND HER, soft and secondary: a round stone hall with tall arched windows full of gold morning light, white chalk circles on grey flagstones, thin smoke hanging in the air, and a dais in soft focus.',
    'LIGHT: warm gold window light behind her and a cool green rim light from the sash side, so she stands out sharply from the hall.',
    'TITLE: the words THE ONLY MAN AT THORNWITCH painted into the art in the upper third as an elegant serif logo in white, with thin thorn-green briar curling through the letters,',
    'spelled exactly THE ONLY MAN AT THORNWITCH, large and legible at thumbnail size. No other text anywhere.',
  ].join(' '),
  publishedAt: null,
};

export const THE_ONLY_MAN_AT_THORNWITCH = StoryVersion.parse(raw);
