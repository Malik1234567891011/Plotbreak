import { StoryVersion } from '@plotbreak/contracts';

/**
 * "Light" — a notebook, and everyone who has ever said they would have used it
 * better.
 *
 * The bible is 2,762 lines and knows exactly what it wants, which makes this
 * the most constrained world in the catalogue rather than the loosest. §1 opens
 * with twelve things the fandom has argued about for twenty years — why kill
 * the bait, why kill Raye, why rely on Misa, why trust Mikami to improvise, why
 * say anything resembling "I win" before anybody was actually dead — and then
 * says the game should not tell the player those criticisms are automatically
 * correct. It should answer them. That is the whole product.
 *
 * So the hard part here was not scope. It was §19 and §77, which pull against
 * each other and against the schema.
 *
 * §19 requires an evidence ledger per investigator: observations, hypotheses,
 * suspects, confidence, known rules, false beliefs. §77 forbids a suspicion
 * meter, and §20 insists suspicion is person-specific — L suspecting Light does
 * not mean Soichiro does, and Near inherits evidence and reasons independently.
 * A single `suspicion` resource would break all three.
 *
 * The resolution is a split that runs through the whole file. **Exposure is
 * facts that exist in the world** — the Kanto broadcast narrowing the region,
 * a schedule that moved after private police speculation, a dead FBI agent on
 * a train. It is global because the facts are global. **Who holds those facts,
 * and what they conclude from them, is per-character**: `knowledgeScope` says
 * what a person can reason about at all, `secrets` with visibility says what
 * they have, and the relationship gates say what it would take to move them.
 * L can be certain while Soichiro is not, because those are different rows.
 *
 * Four resources, and Certainty is the one the bible is really about. Every
 * item on the §1 list is the same error: a brilliant man doing the thing that
 * satisfies his pride rather than the thing that improves his position. §10
 * names it directly — is he optimising the world, or optimising for winning —
 * and says the distinction should return again and again. So Certainty is
 * GOOD_LOW with a fatal top band, and the top band is where a man announces a
 * victory before anybody has died.
 *
 * The Death Note itself is not a boolean. §12 is emphatic: track the physical
 * object, its location, owner, possessor, attached Shinigami, who has touched
 * it, removed pages, hidden scraps, fakes. Items carry that, and §110's failure
 * list — "notebook teleports", "warehouse notebook truth changes mid-scene" —
 * is why the fake is a separate item with its own identity rather than a flag.
 */

const raw = {
  id: 'sv_light_1',
  storyId: 'story_light',
  version: 1,
  title: 'Light',
  fantasyLabel: 'Everyone thinks they could beat L.',
  /**
   * Nothing, and this one is load-bearing.
   *
   * §5 says do not begin with lore, begin in the classroom, and give control
   * almost immediately. A deadline in the first hour would be the story telling
   * a seventeen-year-old that something is already happening to him. Nothing is
   * happening to him. That is the point of the afternoon.
   */
  openingObligations: [],
  hook: 'You found a notebook that kills anyone whose real name and face you know, and everyone who has ever argued about how Light should have played it is about to find out whether they were right.',
  premise:
    'You are seventeen, you are the best student in the country, and you have been bored for about four years.\n\n' +
    'This afternoon a black notebook fell out of the sky into your school grounds. The instructions inside say that the human whose name is written in it will die. You are reasonably sure this is a prank, and you are going to test it anyway, because the alternative is not testing it.\n\n' +
    'If it works, you will have something nobody has ever had: the ability to remove a person from the world from your bedroom, with a pen, at no risk. There is a great deal wrong with the world and you have opinions about all of it.\n\n' +
    'What you do not have is a plan, a rulebook, or any idea what you are dealing with. You do not know the notebook needs a face as well as a name, and you do not know something is standing behind you.\n\n' +
    'You also do not know that within a month the most capable detective alive will be looking for you specifically, or that your father will be running the Japanese half of it.\n\n' +
    'Everyone has an opinion about how this should have been played. Now the world reacts to yours.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Mystery', 'Psychological', 'Crime', 'Strategy', 'Tragedy'],
  mechanicsChips: [
    'L only knows what you told him',
    'Nobody suspects you for being the protagonist',
    'The notebook is a physical object',
    'You can burn it this afternoon',
    'Orders you give are actually obeyed',
  ],
  contentDescriptors: [
    'PSYCHOLOGICAL_THEMES',
    'MORAL_AMBIGUITY',
    'PERMANENT_DEATH',
    'HORROR',
    'ROMANCE',
  ],
  intensity: 'INTENSE',
  creatorNote:
    'The famous run contains about a dozen decisions that people have spent twenty years calling mistakes. Ignore the broadcast and L never learns he is in Kanto. Let Raye finish his surveillance and he clears you. Tell Mikami in plain words never to touch the real notebook without your order and he will not touch it. Say nothing at the warehouse until people are actually dead. Or burn the thing this afternoon and become the detective your father thinks you are. Every one of those is a real destination, and none of them is the game agreeing that the criticism was obvious.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: false,
    allowsRomance: true,
    startingLocationId: 'daikoku_classroom',
    // A grey afternoon, last period. §5.
    startWorldMinute: 15 * 60 + 20,
    startingItems: [{ itemId: 'school_bag', qty: 1 }],
    hardCanon: [
      'The player is Light Yagami, seventeen, top of his year at Daikoku Private Academy, son of NPA superintendent Soichiro Yagami, brother of Sayu.',
      'Pre-notebook Light is diligent, polite, socially fluent, close to his family, genuinely troubled by crime, arrogant beneath a perfect surface, and extremely bored. He is not already a monster. The notebook transforms traits that were already there.',
      'The notebook requires the target’s real name and their face. A name without the correct face does not work, and an alias alone never works. Unspecified deaths default to a heart attack.',
      'Pages and fragments of the notebook retain their power. Ownership and possession are different things. Touching a notebook can reveal its attached Shinigami to the person touching it and to nobody else.',
      'Relinquishing ownership erases the owner’s Death Note-linked memories. Touching the notebook again can restore them under the same mechanics. A memory-less Light is sincerely his pre-Kira self and must never be written as secretly still scheming.',
      'The Shinigami Eyes trade half the user’s remaining lifespan for the ability to read true names and lifespans from a face. It is a real branch, it is not instant victory, and canon refusal must not be assumed.',
      'Ryuk is not Light’s servant. He is bored, he finds Light entertaining, he does not care whether Light wins, and he withholds information when withholding is more interesting.',
      'L is brilliant and is not psychic. He knows only what the player’s actions have actually made knowable. Nobody in this world suspects Light because Light is the protagonist.',
      'Soichiro Yagami has extraordinary integrity and is not stupid. His single blind spot is his son.',
      'Misa Amane is impulsive and devoted and is not stupid. Her problem is devotion, not intelligence.',
      'Near and Mello are different people who reason differently and must never sound alike. Neither of them is destiny.',
      'Nothing downstream of this afternoon is owed. No event is invented to replace one the player prevented, the notebook never teleports, and no character breaks an explicit instruction because the famous version needs them to.',
    ],
    toneGuide:
      'Psychological thriller, kept concrete and procedural. The tension is information: who knows what, who could find out, and what a specific action makes newly knowable. Never write a scene in which somebody intuits the truth. ' +
      'Ordinary life is load-bearing and must be real before Kira erodes it — dinner with the family, Sayu asking for help with maths, his mother proud of him, a father who comes home late and tired. A player who never spends an evening at that table has a different and much cheaper story. ' +
      'Light performs constantly and the prose should let the performance be good. Show the calculation and do not editorialise about it. He is allowed to be right about things. Do not write hindsight into a seventeen-year-old, and do not have the narrator disapprove — the reader can manage that themselves. ' +
      'Ryuk is horrifying and out of place in a teenager’s bedroom and should stay that way; he is amused rather than menacing, and he does not comment every turn. L is childish about competition, blunt, socially strange, and genuinely fascinated. ' +
      'Deaths are administrative and almost never dramatic: a name, a wait, and a news item later. That gap is where the whole moral weight of this world lives. No red eyes, no cackling, no monologue about gods unless the player chooses to write one.',
    forkCostCredits: 120,
    loop: null,
  },
  /**
   * The highest `mind` in the catalogue, and a 3 in `arcana`.
   *
   * He is the most intelligent person in any of these worlds and knows
   * precisely nothing about the supernatural — no rules beyond what is written
   * inside the cover, no idea what a Shinigami is, no notion that the object
   * has an owner distinct from whoever is holding it. §14 is explicit that he
   * does not start omniscient and that Ryuk will not volunteer what the player
   * needs. `arcana` rising is the story of him learning the rules by
   * experiment, which is the only honest way this world can be played.
   */
  attributes: { might: 11, agility: 13, mind: 22, presence: 19, resolve: 16, arcana: 3 },
  skills: [
    {
      id: 'deduction',
      name: 'Deduction',
      attribute: 'mind',
      description: 'Reading a situation for what it implies rather than what it says. The thing he is better at than anybody except one person.',
    },
    {
      id: 'planning',
      name: 'Planning',
      attribute: 'mind',
      description: 'Sequencing moves so that each one looks like something else. Also the discipline of not making the satisfying move.',
    },
    {
      id: 'performance',
      name: 'Performance',
      attribute: 'presence',
      description: 'Being exactly the Light Yagami the room already believes in. Effortless, constant, and the first thing to crack under pressure.',
    },
    {
      id: 'persuasion',
      name: 'Persuasion',
      attribute: 'presence',
      description: 'Getting somebody to arrive at your conclusion and believe they walked there. Works on almost everyone and not at all on two people.',
    },
    {
      id: 'composure',
      name: 'Composure',
      attribute: 'resolve',
      description: 'Not reacting. To a name, a camera, a question, or a thing with yellow eyes standing behind the desk.',
    },
    {
      id: 'tradecraft',
      name: 'Tradecraft',
      attribute: 'mind',
      description: 'Surveillance, counter-surveillance, concealment, and the small physical engineering of hiding something in a room your mother cleans.',
    },
    {
      id: 'procedure',
      name: 'Police Procedure',
      attribute: 'mind',
      description: 'What an investigation can and cannot do, learned across seventeen years of dinner conversation with a man who never discusses his cases.',
    },
    {
      id: 'athletics',
      name: 'Athletics',
      attribute: 'agility',
      description: 'Tennis to national junior standard, and the general competence of somebody who is good at everything on purpose.',
    },
    {
      id: 'shinigami_lore',
      name: 'Notebook Rules',
      attribute: 'arcana',
      description: 'What the object actually does, assembled from the cover instructions, controlled experiments, and whatever Ryuk finds it amusing to confirm.',
    },
  ],
  /**
   * Four, all invisible, and one of them is doing something unusual.
   *
   * Composure is the honest GOOD_HIGH that `resolveRest` refills, and in this
   * world sleep is not a nicety — a tired Light performs worse, and performing
   * is the only thing keeping him alive after the first month.
   *
   * Pattern is first among the GOOD_LOWs, which puts it on the generic cost
   * path and on PUBLIC_VIOLENCE. That is exactly right here: the thing that
   * destroys Kira is not any single death, it is the shape the deaths make when
   * somebody lines them up. Every visible act makes the shape clearer.
   *
   * Exposure is the §19 evidence ledger reduced to the part that can honestly
   * be global: **facts that exist in the world and point somewhere.** It is not
   * suspicion — §77 forbids a suspicion meter and §20 requires suspicion to be
   * per-person, so what each investigator has and believes lives in their
   * `secrets`, `knowledgeScope` and gates. Exposure only says how much there is
   * to find. Whether anybody has found it is a different question in a
   * different place.
   *
   * Certainty is the bible's actual subject. §1 lists twelve famous criticisms
   * and every one of them is the same failure, which §10 names: doing the thing
   * that satisfies pride rather than the thing that improves his position. Its
   * top band is a man saying he has won before anybody is dead.
   */
  resources: [
    {
      id: 'composure',
      name: 'Composure',
      max: 100,
      start: 88,
      regenPerHour: 2.5,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'The performance has stopped. Not dramatically — he is short with Sayu, he answers a question a half-beat late, he forgets which version of a story he told his father. Everyone who knows him notices something and nobody can name it, and one of the people who knows him is a detective.',
      color: '#5E7CA6',
      bands: [
        {
          upTo: 22,
          behaviour:
            'He is making the kind of error he does not make. Reaching for the notebook when waiting was correct, answering a question nobody asked, correcting somebody about a detail he should not know. This is the band in which a brilliant person hands over a fact for free, and he will not be able to reconstruct afterwards why he did it.',
        },
        {
          upTo: 58,
          behaviour:
            'The ordinary exhaustion of two lives. The performance still holds in public and no longer holds at home, where he is either absent or too smooth. He can plan or he can be pleasant; doing both in the same evening is beyond him and the people at the table can tell which he chose.',
        },
        {
          upTo: 100,
          behaviour:
            'Entirely himself, which means entirely whoever the room requires. He can hold a conversation with somebody who suspects him and enjoy it. Long scenes work here and so does genuine warmth — the dinner table in this band is not a performance at all, which is what makes the rest of it a tragedy.',
        },
      ],
    },
    {
      id: 'pattern',
      name: 'Pattern',
      max: 100,
      start: 0,
      regenPerHour: -0.1,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'There is no pattern, because there is nothing to make one out of. Criminals die at the rate criminals have always died at. Nobody has drawn a graph. No organisation on earth has a reason to believe a single person is doing anything.',
      color: '#8E4A3C',
      bands: [
        {
          upTo: 20,
          behaviour:
            'A coincidence that has not yet been counted. Deaths are sparse, unremarkable and spread across causes, and the only people who would notice are the ones who go looking for exactly this. Nothing about the timing implies a student, a schedule, or a person with evenings free.',
        },
        {
          upTo: 50,
          behaviour:
            'Somebody has made a list. The list has a rhythm in it — clusters after school hours, nothing during exams, a preference for certain crimes over others — and a rhythm is a person. This is the band where an investigator can say something true about who Kira is without knowing anything about who Kira is.',
        },
        {
          upTo: 80,
          behaviour:
            'The shape is legible enough to test. The killings can be provoked, timed, and correlated against events that only a small number of people could know about, and every test the world runs from here narrows the set. Whatever he does next is data whether he intends it or not.',
        },
        {
          upTo: 100,
          behaviour:
            'The pattern is a signature. It has a geography, a timetable, a moral taste and a temper, and all four are his. From here he is not being hunted by inference but confirmed by it, and the only remaining question is who gets to the end of the arithmetic first.',
        },
      ],
    },
    {
      id: 'exposure',
      name: 'Exposure',
      max: 100,
      start: 0,
      regenPerHour: 0,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'There is nothing in the world that points at him. Not a fact, not a recording, not a coincidence anybody could build on. Whatever anybody believes about him, they cannot demonstrate it, and this world runs on demonstration.',
      color: '#6B5F4B',
      bands: [
        {
          upTo: 20,
          behaviour:
            'Facts exist but they describe a category rather than a person: a region, an age bracket, a level of access. A hundred thousand people fit. Investigators are working, honestly and well, on material that cannot narrow past a crowd.',
        },
        {
          upTo: 55,
          behaviour:
            'Something exists that narrows to a household. A schedule that moved after a conversation only a few families heard. A death that happened on a route only a few people travelled. Nothing here is proof and all of it is the sort of thing that gets a camera put in a bedroom.',
        },
        {
          upTo: 85,
          behaviour:
            'There is material that narrows to him specifically, and it is in somebody’s file. It may be in the wrong hands, or in hands that cannot act, or in hands that do not want it to be true — §20 is the whole point, and who holds this is a separate question from its existing. But it exists, and it does not decay.',
        },
        {
          upTo: 100,
          behaviour:
            'The case is assembled. Somebody can stand up and walk through it from the first death to his name without needing anybody to take anything on trust. From here he is not managing suspicion. He is managing the last few hours before somebody says it out loud.',
        },
      ],
    },
    {
      id: 'certainty',
      name: 'Certainty',
      max: 100,
      start: 52,
      regenPerHour: 0,
      polarity: 'GOOD_LOW',
      displayPriority: 4,
      visible: false,
      zeroStateConsequence:
        'He has stopped believing he cannot lose, which for this particular person is the healthiest state available and reads from outside as something being badly wrong. He asks other people what they think. He takes the cautious option without needing it justified. He is much harder to catch.',
      color: '#B8983E',
      bands: [
        {
          upTo: 28,
          behaviour:
            'He can be wrong, and can say so, and will take the boring option over the elegant one. Advice lands. He will decline a challenge with no cost to himself, and let a provocation sit unanswered for a week. This is the band in which none of the famous mistakes are available to him.',
        },
        {
          upTo: 60,
          behaviour:
            'Confident and still checking. He builds contingencies and keeps them, tests his assumptions once before acting, and can tell the difference between a plan that works and a plan that is satisfying. He is beatable here and he is not beatable cheaply.',
        },
        {
          upTo: 85,
          behaviour:
            'Winning has begun to matter more than the position. An insult gets answered. A bait gets taken because refusing it would feel like flinching. He starts preferring the move that proves something, and §10 is the readout: he is no longer optimising the world, he is optimising for being right, and those diverge quietly.',
        },
        {
          upTo: 100,
          behaviour:
            'He explains. He announces. He lets somebody watch him win before the winning has happened, because being understood has become part of the victory. Every item on the famous list of his mistakes lives in this band, and from inside it none of them feels like arrogance — they feel like closing an argument.',
        },
      ],
    },
  ],
  tendencies: [],
  /**
   * §12 in data. `playerHasDeathNote = true` is the thing the bible explicitly
   * forbids, and §110's failure list says why: "notebook teleports or merges
   * with another notebook", "warehouse notebook truth changes mid-scene".
   *
   * So there are four separate notebook-shaped objects here with four separate
   * identities — the real one, a torn page, a scrap small enough to hide in a
   * watch, and a fake — and none of them is interchangeable with another. The
   * endgame is not simulable otherwise.
   */
  items: [
    {
      id: 'school_bag',
      name: 'Your Bag',
      tags: ['mundane'],
      stackable: false,
      maxStack: 1,
      equipSlot: null,
      attributeModifiers: {},
      skillModifiers: {},
      questItem: false,
      droppable: true,
      rarity: 'common',
      description: 'A school bag with four textbooks, a pencil case, and a set of past papers he finished in August.',
      loreText:
        'Unremarkable, and the reason he has somewhere to put a notebook on the walk home. It is also the only object he owns at the start of this story, which is the honest inventory of a seventeen-year-old in the last period of a Wednesday.',
      icon: null,
    },
    {
      id: 'death_note',
      name: 'The Death Note',
      tags: ['quest', 'notebook', 'supernatural'],
      stackable: false,
      maxStack: 1,
      equipSlot: null,
      attributeModifiers: { arcana: 4 },
      skillModifiers: { shinigami_lore: 2 },
      questItem: true,
      droppable: true,
      rarity: 'unique',
      description: 'A black hardbacked notebook, A5, slightly warped along the spine, with two English words on the cover and instructions inside the front.',
      loreText:
        'The instructions on the inside cover are the only rules he starts with, and they are incomplete in ways the object does not mention. It is a physical thing: it can be hidden, found, stolen, torn, burned, buried, posted, or left in a locker. Whoever touches it can see what is attached to it. Whoever owns it is not necessarily whoever is holding it, and the difference between those two words turns out to decide the entire story.',
      icon: null,
    },
    {
      id: 'note_page',
      name: 'A Page',
      tags: ['quest', 'notebook', 'supernatural'],
      stackable: true,
      maxStack: 6,
      equipSlot: null,
      attributeModifiers: {},
      skillModifiers: {},
      questItem: true,
      droppable: true,
      rarity: 'unique',
      description: 'A single sheet torn out along the gutter. Identical to any other paper until it is used.',
      loreText:
        'The power is in the paper, not the binding, which means the object can be divided and distributed and is therefore never fully accounted for by anybody. A page in a wallet is a weapon nobody can search you for. A page given to somebody else is a decision that cannot be taken back.',
      icon: null,
    },
    {
      id: 'note_scrap',
      name: 'A Scrap',
      tags: ['quest', 'notebook', 'supernatural', 'concealed'],
      stackable: true,
      maxStack: 4,
      equipSlot: null,
      attributeModifiers: {},
      skillModifiers: { tradecraft: 1 },
      questItem: true,
      droppable: true,
      rarity: 'unique',
      description: 'A fragment perhaps two centimetres square, folded to nothing, with room for one name in very small handwriting.',
      loreText:
        'Small enough for a watch case, a shoe, a hem, the back of a photograph. The existence of scraps is the reason a man can be searched, confined, stripped of the notebook and of his memories, and still be holding the whole of his position in a space the size of a fingernail.',
      icon: null,
    },
    {
      id: 'fake_note',
      name: 'A Notebook',
      tags: ['quest', 'prop'],
      stackable: false,
      maxStack: 1,
      equipSlot: null,
      attributeModifiers: {},
      skillModifiers: {},
      questItem: true,
      droppable: true,
      rarity: 'rare',
      description: 'A black hardbacked notebook, A5, bought from a stationer and filled in by somebody with excellent handwriting.',
      loreText:
        'Powerless, indistinguishable at arm’s length, and therefore the single most useful object in the endgame. Which of the two notebooks is which is a fact about the world from the moment it is bought, and it does not change later to suit anybody.',
      icon: null,
    },
    {
      id: 'hidden_drawer',
      name: 'The Drawer',
      tags: ['quest', 'concealment'],
      stackable: false,
      maxStack: 1,
      equipSlot: null,
      attributeModifiers: {},
      skillModifiers: { tradecraft: 3 },
      questItem: true,
      droppable: false,
      rarity: 'unique',
      description: 'A false bottom in the desk drawer, with a mechanism underneath it and a small ink cartridge wired to the frame.',
      loreText:
        'Built in an afternoon by somebody with better engineering instincts than anybody has ever asked him for. Opening it wrongly destroys what is inside, which means it is not a hiding place so much as a test that whoever opens it fails once and cannot fail twice. His mother cleans this room every week.',
      icon: null,
    },
    {
      id: 'apples',
      name: 'Apples',
      tags: ['consumable', 'shinigami'],
      stackable: true,
      maxStack: 12,
      equipSlot: null,
      attributeModifiers: {},
      skillModifiers: {},
      questItem: false,
      droppable: true,
      rarity: 'common',
      description: 'Red apples. Four of them, currently, because somebody eats them at a rate that is becoming difficult to explain downstairs.',
      loreText:
        'The only leverage that exists over the thing in the corner of the room. He does not need them and he will not stop asking, and a bored Shinigami who has been refused apples is a bored Shinigami who volunteers less and finds other things entertaining. The household grocery bill is a genuine operational problem.',
      icon: null,
    },
    {
      id: 'watch',
      name: 'The Watch',
      tags: ['quest', 'concealment'],
      stackable: false,
      maxStack: 1,
      equipSlot: 'wrist',
      attributeModifiers: {},
      skillModifiers: { tradecraft: 2 },
      questItem: true,
      droppable: true,
      rarity: 'rare',
      description: 'An ordinary wristwatch with the back plate modified, a hinged compartment behind the dial, and a pin that has to be worked twice.',
      loreText:
        'Thirteen months of being watched taught him that the only safe place for anything is somewhere that has already been searched and cleared. A watch is examined once, at the beginning, when there is nothing in it.',
      icon: null,
    },
    {
      id: 'tv_rig',
      name: 'The Rig',
      tags: ['quest', 'tradecraft'],
      stackable: false,
      maxStack: 1,
      equipSlot: null,
      attributeModifiers: {},
      skillModifiers: { tradecraft: 2 },
      questItem: false,
      droppable: true,
      rarity: 'uncommon',
      description: 'A miniature television and a scrap of paper, assembled inside something nobody looks at twice, operable with one hand under a table.',
      loreText:
        'The problem with cameras in a bedroom is not that they see the notebook. It is that a boy who never once sits still and does nothing is as suspicious as a boy caught writing. This solves both: he does his homework, on film, for eleven hours a day, and works in the eleven seconds nobody is watching his hands.',
      icon: null,
    },
    {
      id: 'ntv_file',
      name: 'The Broadcast File',
      tags: ['quest', 'evidence'],
      stackable: false,
      maxStack: 1,
      equipSlot: null,
      attributeModifiers: {},
      skillModifiers: { deduction: 1 },
      questItem: true,
      droppable: true,
      rarity: 'rare',
      description: 'Schedules, regional transmission maps and an internal memo about a broadcast that only went out in one part of the country.',
      loreText:
        'The document that explains why a man on television suddenly believed Kira was in Japan. Reading it before touching the notebook is available to anybody who thinks of it, and it is the difference between answering a question and answering a trap.',
      icon: null,
    },
    {
      id: 'misa_diary',
      name: 'Misa’s Diary',
      tags: ['quest', 'evidence'],
      stackable: false,
      maxStack: 1,
      equipSlot: null,
      attributeModifiers: {},
      skillModifiers: {},
      questItem: true,
      droppable: true,
      rarity: 'rare',
      description: 'A diary kept in a round hand with stickers on it, recording appointments, feelings, and dates that should not be written down anywhere.',
      loreText:
        'She is not careless because she is stupid. She is careless because she has never once in her life had to assume that somebody was reading her. It is the most dangerous object either of them owns and she would be genuinely hurt to be told so.',
      icon: null,
    },
    {
      id: 'fathers_notes',
      name: 'Your Father’s Notes',
      tags: ['quest', 'evidence'],
      stackable: false,
      maxStack: 1,
      equipSlot: null,
      attributeModifiers: {},
      skillModifiers: { procedure: 3 },
      questItem: true,
      droppable: true,
      rarity: 'uncommon',
      description: 'A worn notebook in neat small handwriting that a superintendent should not have brought home and has brought home every night for twenty years.',
      loreText:
        'Names of suspects, dates of meetings, the shape of an investigation as it looks from inside. The most valuable intelligence source in the country is in a briefcase in his own hallway, left there by a man of extraordinary integrity whose one blind spot is his son. Reading it is not difficult. It is a decision.',
      icon: null,
    },
  ],
  /**
   * Nine, and six of them need something the player must actually acquire.
   *
   * Every notebook ability is gated on `has_notebook` rather than on holding
   * the item, because `AbilityDef.requires` takes flags and resources and not
   * items. That is a genuine loss against §12, where possession is a physical
   * fact rather than a permission, and it is recorded here rather than papered
   * over: the flag has to be cleared by whatever takes the object away, and if
   * a future route forgets to clear it the player keeps abilities for a
   * notebook they are not holding. The engine-side fix is item predicates on
   * abilities; until then this file is the thing keeping the invariant.
   * `ab_shinigami_eyes` costs half the character's remaining lifespan and is
   * modelled as a permanent attribute cost plus a flag, per §39 — a real branch
   * that is explicitly not an instant victory.
   */
  abilities: [
    {
      id: 'ab_write_name',
      name: 'Write A Name',
      tags: ['notebook'],
      description: 'A real name, and a face he has actually seen. Forty seconds later a heart stops, somewhere, and he finds out about it from the news like everybody else.',
      affordances: ['remove a person', 'test a rule', 'answer a provocation'],
      costs: [
        { resourceId: 'pattern', amount: 4 },
        { resourceId: 'composure', amount: 3 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      unlockedByDefault: true,
      requires: { flagsSet: ['has_notebook'] },
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'ab_specify',
      name: 'Specify The Details',
      tags: ['notebook', 'control'],
      description: 'Cause, time, and what the person does in the minutes before. Enormously more powerful than a heart attack and enormously more legible, because a specified death is a sentence somebody can read.',
      affordances: ['arrange a death that looks like something else', 'make a person act', 'place a body somewhere useful'],
      costs: [
        { resourceId: 'pattern', amount: 9 },
        { resourceId: 'composure', amount: 8 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      unlockedByDefault: true,
      requires: { flagsSet: ['has_notebook'] },
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'ab_relinquish',
      name: 'Give It Up',
      tags: ['notebook', 'memory'],
      description: 'Hand over ownership and lose every memory the notebook ever gave him. Not a disguise — he genuinely does not know, and means every word he says afterwards.',
      affordances: ['become unfindable', 'pass a test honestly', 'stop'],
      costs: [{ resourceId: 'certainty', amount: -30 }],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      unlockedByDefault: true,
      requires: { flagsSet: ['has_notebook'] },
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'ab_touch_to_remember',
      name: 'Touch It Again',
      tags: ['notebook', 'memory'],
      description: 'Skin on the paper, and thirteen months of his own reasoning arrive at once, in the middle of whatever he happened to be doing.',
      affordances: ['recover what you were', 'resume a plan laid by somebody you no longer are'],
      costs: [{ resourceId: 'composure', amount: 20 }],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      unlockedByDefault: false,
      requires: { flagsSet: ['relinquished_ownership'] },
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'ab_shinigami_eyes',
      name: 'The Eye Deal',
      tags: ['notebook', 'supernatural', 'irreversible'],
      description: 'Half of whatever he has left, in exchange for reading a true name off any face he sees. It is not a victory. He still has to be in the room with them.',
      affordances: ['read a name from a face', 'work without a database', 'defeat an alias'],
      costs: [{ resourceId: 'certainty', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      unlockedByDefault: true,
      requires: { flagsSet: ['has_notebook'] },
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'ab_perform',
      name: 'Be Light Yagami',
      tags: ['social'],
      description: 'Become precisely the person the room already believes in, including for people who are actively testing whether he is. The most-used ability in this world by a wide margin.',
      affordances: ['pass as yourself', 'survive an interview', 'be helpful to the investigation'],
      costs: [{ resourceId: 'composure', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'ab_deduce',
      name: 'Work It Out',
      tags: ['mind'],
      description: 'Take what is actually available and get further with it than anybody expects. This is what he had before the notebook and what he would have been without it.',
      affordances: ['read a situation', 'identify what somebody knows', 'find the fact that narrows it'],
      costs: [{ resourceId: 'composure', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'ab_give_an_order',
      name: 'Give An Explicit Order',
      tags: ['social', 'proxy'],
      description: 'Tell somebody, in words that cannot be reinterpreted, exactly what they are never to do. An explicit instruction is obeyed. A vague one is interpreted, and the difference is audible — an explicit one gets repeated back to you.',
      affordances: ['bind a proxy', 'close a failure point', 'be unambiguous on the record'],
      costs: [{ resourceId: 'composure', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'ab_wait',
      name: 'Wait',
      tags: ['discipline'],
      description: 'Do nothing, deliberately, when something satisfying is available. Mechanically the strongest move in this world and the hardest one for this particular person to reach for.',
      affordances: ['let a provocation die', 'break a pattern', 'deny somebody their test'],
      costs: [{ resourceId: 'certainty', amount: -6 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'ab_walk_past_it',
      name: 'Keep Walking',
      tags: ['decision'],
      description: 'Look at it once and go home. If somebody wants their ridiculous notebook back they can get wet retrieving it.',
      affordances: ['decline the whole story'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'ab_test_it',
      name: 'Test It',
      tags: ['notebook', 'decision'],
      description: 'A name, a face off a news broadcast, and forty seconds of finding out whether you are an idiot or something else.',
      affordances: ['find out whether it works'],
      costs: [
        { resourceId: 'pattern', amount: 2 },
        { resourceId: 'composure', amount: 10 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      unlockedByDefault: false,
      requires: { flagsSet: ['has_notebook'] },
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'ab_destroy_it',
      name: 'Destroy It',
      tags: ['notebook', 'decision', 'irreversible'],
      description: 'Burn it, in a bin behind the house, and stand there until there is nothing left that could be reassembled.',
      affordances: ['end this'],
      costs: [{ resourceId: 'certainty', amount: -40 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      unlockedByDefault: true,
      requires: { flagsSet: ['has_notebook'] },
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'ab_stop_at_one',
      name: 'Stop',
      tags: ['notebook', 'decision'],
      description: 'Close it, put it somewhere, and do not open it again. A complete answer rather than a failure to continue.',
      affordances: ['use it once and never again'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      unlockedByDefault: true,
      requires: { flagsSet: ['has_notebook'] },
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'ab_go_all_in',
      name: 'Commit',
      tags: ['notebook', 'decision'],
      description: 'Decide this is what the rest of your life is, and start doing it properly rather than nervously.',
      affordances: ['become Kira deliberately'],
      costs: [{ resourceId: 'certainty', amount: 12 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      unlockedByDefault: true,
      requires: { flagsSet: ['has_notebook'] },
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'ab_work_him',
      name: 'Get The Names First',
      tags: ['decision', 'tradecraft'],
      description: 'Make the man following you hand over the other eleven files before anything happens to him. Vastly more useful and vastly more traceable.',
      affordances: ['turn a watcher into a source'],
      costs: [
        { resourceId: 'exposure', amount: 14 },
        { resourceId: 'composure', amount: 14 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'ab_remove_him',
      name: 'Remove Him',
      tags: ['notebook', 'decision'],
      description: 'End the surveillance the direct way, and find out afterwards that he had a fiancée who used to do this for a living.',
      affordances: ['stop being followed'],
      costs: [
        { resourceId: 'exposure', amount: 20 },
        { resourceId: 'pattern', amount: 10 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      unlockedByDefault: true,
      requires: { flagsSet: ['has_notebook'] },
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'ab_hide_in_plain_sight',
      name: 'Work Under The Cameras',
      tags: ['tradecraft', 'decision'],
      description: 'Do eleven hours of homework on film and eleven seconds of something else, and be the most boring footage anybody has ever reviewed.',
      affordances: ['survive surveillance', 'be watched and be fine'],
      costs: [{ resourceId: 'composure', amount: 25 }],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'ab_let_her_spend_herself',
      name: 'Let Her Pay For It',
      tags: ['decision', 'irreversible'],
      description: 'There is a Shinigami who will kill to protect somebody, and a rule that kills her for doing it. Arrange the circumstances and let the rule do the rest.',
      affordances: ['spend somebody else’s protector'],
      costs: [{ resourceId: 'certainty', amount: 14 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      unlockedByDefault: true,
      requires: { flagsSet: ['met_misa'] },
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'ab_do_it_yourself',
      name: 'Do It Yourself',
      tags: ['notebook', 'decision', 'irreversible'],
      description: 'Get the name by whatever means it takes, and write it in your own handwriting, which is a different act from arranging for it to happen.',
      affordances: ['end it personally'],
      costs: [
        { resourceId: 'certainty', amount: 20 },
        { resourceId: 'exposure', amount: 10 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      unlockedByDefault: true,
      requires: { flagsSet: ['has_notebook'] },
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'ab_let_him_live',
      name: 'Let Him Live',
      tags: ['decision'],
      description: 'Decide that a man who is certain about you and cannot prove it is survivable, and leave him alive to go on being both.',
      affordances: ['decline to remove somebody'],
      costs: [{ resourceId: 'certainty', amount: -22 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'ab_tell_the_truth',
      name: 'Tell Them',
      tags: ['decision', 'irreversible'],
      description: 'Say it out loud to somebody who will have to act on it, and find out what they do. Not a collapse — a decision.',
      affordances: ['confess', 'hand the decision to somebody else'],
      costs: [{ resourceId: 'certainty', amount: -35 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'ab_deal_with_him',
      name: 'Deal With Him',
      tags: ['decision'],
      description: 'Get to the impatient one before he moves, by whatever route is actually available.',
      affordances: ['pre-empt somebody'],
      costs: [{ resourceId: 'exposure', amount: 12 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'ab_announce_it',
      name: 'Explain It To Them',
      tags: ['decision', 'pride'],
      description: 'Tell the room what you did and why, while it is still happening, because being understood has become part of winning.',
      affordances: ['close an argument', 'be understood'],
      costs: [{ resourceId: 'certainty', amount: 25 }],
      cooldownMinutes: 0,
      targetRule: 'MULTI',
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'ab_say_nothing',
      name: 'Say Nothing',
      tags: ['decision', 'discipline'],
      description: 'Forty seconds. No explanation, no percentage, no expression, until somebody in this building is actually dead. The strongest move in this world.',
      affordances: ['wait out a plan', 'catch a compromised plan'],
      costs: [{ resourceId: 'certainty', amount: -30 }, { resourceId: 'composure', amount: 30 }],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'ab_call_it_off',
      name: 'Call It Off',
      tags: ['decision', 'discipline'],
      description: 'Notice that something is wrong and cancel, having built the whole thing, without knowing exactly what the wrong thing is.',
      affordances: ['abandon your own plan'],
      costs: [{ resourceId: 'certainty', amount: -20 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'ab_read_the_briefcase',
      name: 'Read His Notes',
      tags: ['decision', 'tradecraft'],
      description: 'Eleven seconds in a hallway, with a briefcase belonging to a man of extraordinary integrity whose one blind spot is you.',
      affordances: ['see the investigation from inside'],
      costs: [{ resourceId: 'composure', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
  ],
  locations: [
    {
      id: 'daikoku_classroom',
      name: 'Daikoku Private Academy',
      shortName: 'School',
      description:
        'Third floor, window side, last period. The teacher is still working through a problem he finished eleven minutes ago, and somebody behind him will ask for his notes on the way out. Outside it is grey and about to rain.',
      artDirection:
        'Grey afternoon light through tall windows, rows of desks, a blackboard mid-problem. Flat, ordinary, slightly institutional. Nothing ominous — this is the most boring room in the world and that is the point.',
      stageImage: null,
      connections: [
        { to: 'kanto_street', travelMinutes: 8, lockedByFlag: null, label: 'Out through the yard' },
        { to: 'yagami_home', travelMinutes: 25, lockedByFlag: null, label: 'Home' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 10, y: 20 },
      ambientSfx: ['chalk', 'rain starting', 'a chair moving'],
      takeableItems: [{ itemId: 'death_note', qty: 1, ownerId: null, aka: ['the notebook', 'black notebook', 'it', 'the thing in the yard'] }],
    },
    {
      id: 'yagami_home',
      name: 'The Yagami House',
      shortName: 'Home',
      description:
        'A warm middle-class house in which somebody is always cooking and somebody is always late. His mother is proud of him in a way she says out loud. His sister will ask about maths. His father’s briefcase is in the hallway.',
      artDirection:
        'Warm domestic interior, evening lamps, a table laid for four with one place often empty. Comfortable, specific and genuinely nice — this room has to be worth losing.',
      stageImage: null,
      connections: [
        { to: 'light_bedroom', travelMinutes: 1, lockedByFlag: null, label: 'Upstairs' },
        { to: 'kanto_street', travelMinutes: 5, lockedByFlag: null, label: 'Out' },
        { to: 'daikoku_classroom', travelMinutes: 25, lockedByFlag: null, label: 'School' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 22, y: 34 },
      ambientSfx: ['television downstairs', 'cooking', 'the front door'],
      takeableItems: [{ itemId: 'fathers_notes', qty: 1, ownerId: 'soichiro', aka: ['his notes', 'the briefcase', 'dad’s notebook', 'the case file'] }],
    },
    {
      id: 'light_bedroom',
      name: 'Light’s Bedroom',
      shortName: 'Bedroom',
      description:
        'A desk under the window, textbooks in order of use, and a drawer with a false bottom in it. There is a thing in the corner of this room that is nine feet tall and nobody else can see it.',
      artDirection:
        'Neat student bedroom, desk lamp, shelves, curtains. Ordinary and orderly, and in the corner a gothic silhouette so wrong for the space that the composition should feel like an error.',
      stageImage: null,
      connections: [
        { to: 'yagami_home', travelMinutes: 1, lockedByFlag: null, label: 'Downstairs' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 26, y: 42 },
      ambientSfx: ['rain on glass', 'a pen', 'someone eating an apple'],
      takeableItems: [
        { itemId: 'hidden_drawer', qty: 1, ownerId: null, aka: ['the drawer', 'false bottom', 'the desk'] },
        { itemId: 'apples', qty: 4, ownerId: null, aka: ['apples', 'an apple', 'fruit'] },
      ],
    },
    {
      id: 'kanto_street',
      name: 'Kanto',
      shortName: 'The Street',
      description:
        'Trains, crossings, station concourses, convenience stores and the particular anonymity of a city where nobody looks at anybody. Also sixty-four thousand cameras, only some of which belong to anyone official.',
      artDirection:
        'Wet city at dusk, neon on pavement, crowds, train windows. Busy and impersonal. Compose for surveillance: reflections, angles, people in the middle distance who may or may not matter.',
      stageImage: null,
      connections: [
        { to: 'yagami_home', travelMinutes: 5, lockedByFlag: null, label: 'Home' },
        { to: 'daikoku_classroom', travelMinutes: 8, lockedByFlag: null, label: 'School' },
        { to: 'gamou_prep', travelMinutes: 15, lockedByFlag: null, label: 'To the prep school' },
        { to: 'tooh_university', travelMinutes: 30, lockedByFlag: 'entered_university', label: 'To the campus' },
        { to: 'hotel_taskforce', travelMinutes: 20, lockedByFlag: 'joined_investigation', label: 'To the hotel' },
        { to: 'misa_apartment', travelMinutes: 25, lockedByFlag: 'met_misa', label: 'To her apartment' },
        { to: 'spk_hq', travelMinutes: 900, lockedByFlag: 'successors_active', label: 'To New York' },
        { to: 'mello_mafia', travelMinutes: 900, lockedByFlag: 'successors_active', label: 'To Los Angeles' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 40, y: 30 },
      ambientSfx: ['trains', 'crossing chime', 'rain and traffic'],
      takeableItems: [],
    },
    {
      id: 'gamou_prep',
      name: 'Gamou Prep School',
      shortName: 'Prep',
      description:
        'A crowded room of people working extremely hard at something he finds effortless, which is where he goes when the house is too warm to think in. A useful place to be seen being ordinary.',
      artDirection:
        'Fluorescent light, packed desks, whiteboards, coats over chairs. Tired and unglamorous. Everyone in frame is working.',
      stageImage: null,
      connections: [
        { to: 'kanto_street', travelMinutes: 15, lockedByFlag: null, label: 'Out into the city' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 52, y: 22 },
      ambientSfx: ['pens', 'a cough', 'strip lighting'],
      takeableItems: [],
    },
    {
      id: 'interpol',
      name: 'The ICPO Conference',
      shortName: 'ICPO',
      description:
        'A room of senior police from every country, addressed by a laptop. Nobody in it has met the person speaking and several of them are not convinced he exists.',
      artDirection:
        'Corporate conference room, long table, one laptop with a stylised letter on the screen. Cold institutional lighting. The most powerful thing in the room is a piece of furniture.',
      stageImage: null,
      connections: [
        { to: 'hotel_taskforce', travelMinutes: 45, lockedByFlag: null, label: 'To the task force hotel' },
      ],
      discoveredByDefault: false,
      mapPosition: { x: 62, y: 12 },
      ambientSfx: ['air conditioning', 'a synthesised voice', 'chairs'],
      takeableItems: [{ itemId: 'ntv_file', qty: 1, ownerId: null, aka: ['the file', 'broadcast schedules', 'the memo', 'transmission maps'] }],
    },
    {
      id: 'hotel_taskforce',
      name: 'The Task Force Hotel',
      shortName: 'The Hotel',
      description:
        'A suite with the beds taken out and monitors put in, six exhausted policemen, a great deal of cake, and a man sitting on a chair in a way chairs are not for.',
      artDirection:
        'Hotel suite converted to a war room: monitors, cables, takeaway boxes, whiteboards. Warm lamps against cold screens. One barefoot figure crouched on a chair.',
      stageImage: null,
      connections: [
        { to: 'kanto_street', travelMinutes: 20, lockedByFlag: null, label: 'Out' },
        { to: 'taskforce_hq', travelMinutes: 30, lockedByFlag: 'hq_built', label: 'To the new building' },
        { to: 'interpol', travelMinutes: 45, lockedByFlag: 'joined_investigation', label: 'To the ICPO conference' },
        { to: 'confinement', travelMinutes: 5, lockedByFlag: 'confinement_begun', label: 'Down to the cells' },
      ],
      discoveredByDefault: false,
      mapPosition: { x: 48, y: 44 },
      ambientSfx: ['monitor hum', 'a spoon in a cup', 'six tired men'],
      takeableItems: [],
    },
    {
      id: 'tooh_university',
      name: 'To-Oh University',
      shortName: 'Campus',
      description:
        'Where two people who came joint first in the entrance examination give the freshman address together, and then play tennis in front of everybody, and both of them know exactly what the tennis is.',
      artDirection:
        'Bright open campus, lecture halls, a hard court with a crowd on the fence. Clean daylight. The tennis match is staged as a duel and shot as a sport.',
      stageImage: null,
      connections: [
        { to: 'kanto_street', travelMinutes: 30, lockedByFlag: null, label: 'Into the city' },
        { to: 'hotel_taskforce', travelMinutes: 25, lockedByFlag: 'joined_investigation', label: 'To the hotel' },
      ],
      discoveredByDefault: false,
      mapPosition: { x: 34, y: 56 },
      ambientSfx: ['a crowd on a fence', 'tennis', 'lecture hall'],
      takeableItems: [],
    },
    {
      id: 'misa_apartment',
      name: 'Misa’s Apartment',
      shortName: 'Her Place',
      description:
        'Expensive, cluttered, lit like a magazine shoot, with clothes on every surface and a diary on the table that should not exist. There is a second thing in this room that nobody can see, and it does not like him.',
      artDirection:
        'Bright fashionable clutter, lace and black, mirrors and rails of clothes, city window. Warm and busy. In one corner a tall bone-pale silhouette entirely unlike the one in his bedroom.',
      stageImage: null,
      connections: [
        { to: 'kanto_street', travelMinutes: 25, lockedByFlag: null, label: 'Out' },
      ],
      discoveredByDefault: false,
      mapPosition: { x: 58, y: 60 },
      ambientSfx: ['a hairdryer', 'pop television', 'heels on floorboards'],
      takeableItems: [{ itemId: 'misa_diary', qty: 1, ownerId: 'misa', aka: ['her diary', 'the diary', 'that book'] }],
    },
    {
      id: 'taskforce_hq',
      name: 'Task Force Headquarters',
      shortName: 'HQ',
      description:
        'Eight floors of building put up for this one case, with a lift that needs a code and a basement nobody discusses. Whoever is inside it can see everything and cannot leave.',
      artDirection:
        'Modern high-security interior, banks of monitors, sealed glass, few windows. Cool blues and greys. Enormous and airless.',
      stageImage: null,
      connections: [
        { to: 'hotel_taskforce', travelMinutes: 30, lockedByFlag: null, label: 'Back to the hotel' },
        { to: 'confinement', travelMinutes: 3, lockedByFlag: 'confinement_begun', label: 'Down' },
        { to: 'yotsuba_boardroom', travelMinutes: 25, lockedByFlag: 'yotsuba_active', label: 'To the Yotsuba building' },
        { to: 'kanto_street', travelMinutes: 15, lockedByFlag: null, label: 'Out into the city' },
      ],
      discoveredByDefault: false,
      mapPosition: { x: 52, y: 50 },
      ambientSfx: ['server hum', 'a lift', 'keyboards'],
      takeableItems: [{ itemId: 'tv_rig', qty: 1, ownerId: null, aka: ['the rig', 'the little television', 'the bag'] }],
    },
    {
      id: 'yotsuba_boardroom',
      name: 'The Yotsuba Boardroom',
      shortName: 'Yotsuba',
      description:
        'Eight executives around a table deciding which people in the world are inconvenient to their quarterly figures, in the tone of men discussing a logistics contract.',
      artDirection:
        'Corporate boardroom at night, city through glass, eight men in suits, one screen. Sterile and expensive. The most banal evil in this world and it should look like a meeting.',
      stageImage: null,
      connections: [
        { to: 'taskforce_hq', travelMinutes: 25, lockedByFlag: null, label: 'Back to HQ' },
      ],
      discoveredByDefault: false,
      mapPosition: { x: 68, y: 46 },
      ambientSfx: ['air handling', 'a projector', 'polite voices'],
      takeableItems: [],
    },
    {
      id: 'confinement',
      name: 'Confinement',
      shortName: 'The Cell',
      description:
        'A bare room, a camera, a blindfold, and fifty days. No paper, no window, no clock, and a voice that occasionally asks whether he has anything to say.',
      artDirection:
        'Stark concrete cell, one restrained figure, hard overhead light, a camera in the corner. Almost no colour. Compose it as surveillance footage.',
      stageImage: null,
      connections: [
        { to: 'taskforce_hq', travelMinutes: 3, lockedByFlag: null, label: 'Up, if they let you' },
      ],
      discoveredByDefault: false,
      mapPosition: { x: 50, y: 62 },
      ambientSfx: ['ventilation', 'a camera motor', 'nothing at all'],
      takeableItems: [],
    },
    {
      id: 'spk_hq',
      name: 'SPK Headquarters',
      shortName: 'SPK',
      description:
        'A New York office with a boy sitting on the floor in the middle of it, building something out of dice, surrounded by people who have decided to take him seriously.',
      artDirection:
        'Bright modern office, monitors, and on the carpet a small pale figure in white with toys arranged in a pattern. The contrast between the institution and the child is the composition.',
      stageImage: null,
      connections: [
        { to: 'kanto_street', travelMinutes: 900, lockedByFlag: null, label: 'To Japan' },
      ],
      discoveredByDefault: false,
      mapPosition: { x: 80, y: 26 },
      ambientSfx: ['dice on carpet', 'monitors', 'quiet American voices'],
      takeableItems: [],
    },
    {
      id: 'mello_mafia',
      name: 'The Mafia Base',
      shortName: 'Mello',
      description:
        'A converted industrial building in Los Angeles run by somebody who would rather take a risk that kills him than come second to the boy on the carpet.',
      artDirection:
        'Industrial concrete, harsh work lights, weapons and crates, one young blond figure in leather eating chocolate. Warm dirty light against cold concrete.',
      stageImage: null,
      connections: [
        { to: 'kanto_street', travelMinutes: 900, lockedByFlag: null, label: 'To Japan' },
      ],
      discoveredByDefault: false,
      mapPosition: { x: 86, y: 40 },
      ambientSfx: ['industrial fans', 'a radio', 'foil wrapper'],
      takeableItems: [],
    },
    {
      id: 'nhn_studio',
      name: 'The NHN Studio',
      shortName: 'The Studio',
      description:
        'A broadcast set from which one woman reads Kira’s position to the country every evening, in a voice designed to make it sound like the weather.',
      artDirection:
        'Television studio, lights and cameras, an anchor desk, one poised woman. Glossy and warm on set, black and cabled everywhere else.',
      stageImage: null,
      connections: [
        { to: 'kanto_street', travelMinutes: 20, lockedByFlag: null, label: 'Out' },
        { to: 'yellow_box', travelMinutes: 40, lockedByFlag: 'yellow_box_set', label: 'To the warehouse' },
      ],
      discoveredByDefault: false,
      mapPosition: { x: 66, y: 66 },
      ambientSfx: ['studio air', 'a floor manager', 'lights ticking'],
      takeableItems: [],
    },
    {
      id: 'yellow_box',
      name: 'The Yellow Box Warehouse',
      shortName: 'Yellow Box',
      description:
        'An abandoned building with catwalks, stacked crates, holes in the roof and rain coming through them, chosen by somebody who wanted the last conversation of his life to happen somewhere he had picked.',
      artDirection:
        'Vast dim industrial interior, shafts of light through a broken roof, rain, catwalks above, crates below. Figures small in a large volume. High contrast, almost monochrome.',
      stageImage: null,
      connections: [
        { to: 'nhn_studio', travelMinutes: 40, lockedByFlag: null, label: 'Back to the studio' },
        { to: 'kanto_street', travelMinutes: 45, lockedByFlag: null, label: 'Away' },
      ],
      discoveredByDefault: false,
      mapPosition: { x: 90, y: 78 },
      ambientSfx: ['rain through a roof', 'footsteps on steel', 'a very large empty space'],
      takeableItems: [{ itemId: 'fake_note', qty: 1, ownerId: null, aka: ['the notebook', 'the other notebook', 'the fake'] }],
    },
  ],
  factions: [
    {
      id: 'faction_npa',
      name: 'The National Police Agency',
      description:
        'Twelve hundred officers, a superintendent who brings his work home, and an institution that is being asked to catch something it has no procedure for. Most of them will resign before the end.',
      startingReputation: 30,
      allies: ['faction_taskforce'],
      enemies: ['faction_kira'],
    },
    {
      id: 'faction_taskforce',
      name: 'The Task Force',
      description:
        'Six men and a detective nobody has seen, working out of a hotel suite. The smallest organisation in this story and the only one that is actually close.',
      startingReputation: 0,
      allies: ['faction_npa', 'faction_wammy'],
      enemies: ['faction_kira'],
    },
    {
      id: 'faction_kira',
      name: 'Kira',
      description:
        'Not an organisation. A pattern in a mortality table that the world has started addressing as a person, and which a great many people have begun to hope is real.',
      startingReputation: 0,
      allies: [],
      enemies: ['faction_npa', 'faction_taskforce', 'faction_wammy'],
    },
    {
      id: 'faction_wammy',
      name: 'Wammy’s House',
      description:
        'An orphanage in Winchester that raises children to be the next L, and two of whose graduates cannot stand each other. It is the only institution here that will outlive the case.',
      startingReputation: 0,
      allies: ['faction_taskforce'],
      enemies: ['faction_kira'],
    },
    {
      id: 'faction_yotsuba',
      name: 'The Yotsuba Group',
      description:
        'A conglomerate whose board discovered that competitors can be made to have heart attacks, and which treats this as a business advantage to be minuted.',
      startingReputation: 0,
      allies: [],
      enemies: ['faction_taskforce'],
    },
    {
      id: 'faction_shinigami',
      name: 'The Shinigami',
      description:
        'Bored immortals who drop notebooks into the human world for entertainment and are forbidden from very little. There are rules that bind them and they will not be volunteering what those are.',
      startingReputation: 0,
      allies: [],
      enemies: [],
    },
  ],
  /**
   * Fourteen, and the investigators are the hard part.
   *
   * §20 requires suspicion to be tracked per person and §42 requires the task
   * force to be distinct characters rather than a chorus. So Matsuda, Aizawa
   * and Soichiro have genuinely different `knowledgeScope`s, different
   * `hiddenDrives`, and different things that would move them — Aizawa can come
   * to distrust Light by a route that never touches L's reasoning, and
   * Soichiro's blind spot is written as a drive rather than as stupidity.
   *
   * §110's failure list is effectively a spec for this section, and three
   * entries got followed literally: Misa is not comic relief, Near is not a
   * white-haired L, and Mello is not an angry Near. Their `speechStyle` and
   * `voiceSamples` are the enforcement, because that is what the writer reads.
   */
  characters: [
    {
      id: 'ryuk',
      name: 'Ryuk',
      role: 'The Shinigami who dropped the notebook, who is here because he was bored, and who does not care whether you win',
      cardBlurb:
        'He is nine feet of grey corpse-coloured wrongness in a teenager’s bedroom and he wants apples. He will answer some direct questions and withhold anything more entertaining withheld. He is not your servant and he is not your friend, and he has done this before.',
      pronouns: 'he/him',
      publicTraits: ['Amused by everything', 'Eats constantly', 'Volunteers nothing useful'],
      hiddenDrives: [
        'He is bored on a scale that has no human equivalent, and the only thing he is optimising for is that the next hour be interesting',
        'There are rules binding him that he has no intention of explaining, including one about what happens to a Shinigami who kills to extend a human’s life',
      ],
      values: [
        'Being entertained',
        'The letter of whatever rule he is actually bound by, which he will follow exactly and never state',
      ],
      fears: [
        'Boredom, genuinely and as his only real motivation',
      ],
      socialStyle:
        'Floats at the edge of the room commenting, invisible to everybody else, entirely without social stake. Laughs at things that are not funny to humans. Asks for apples in the middle of a crisis.',
      boundaries: [
        'Will not write a name on the player’s behalf',
        'Will not explain a rule the player has not earned by asking the right question or running the right experiment',
      ],
      goals: [
        'Watch this go somewhere unexpected',
        'Apples',
      ],
      secrets: [
        {
          id: 'ryuk_the_ending',
          fact: 'He has told the player from the beginning how this ends for whoever owns the notebook, in one sentence, and the player did not treat it as information.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He repeats it, cheerfully, whenever asked, and it never sounds like a warning because he is not warning anybody.',
        },
        {
          id: 'ryuk_shinigami_rules',
          fact: 'A Shinigami who kills a human in order to extend a favoured human’s life dies for it. This constrains Rem completely and Ryuk not at all.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Ask him specifically what he is not allowed to do, twice. Asking what he can do gets a non-answer.',
        },
      ],
      speechStyle:
        'Drawling, unhurried, faintly delighted. Calls him "Light" and nothing else. Ends observations with a small laugh. Answers a question with an answer and never with the next question. Mentions apples at structurally inconvenient moments.',
      topics: ['apples', 'boredom', 'the rules', 'what humans do', 'other Shinigami', 'how this ends'],
      voiceSamples: [
        'Humans are interesting. That’s the whole of it. I don’t have a stake, Light, I have a seat.',
        'I could tell you. It’s more fun if you work it out and get it wrong first.',
        'Apples. You said you’d get apples. That was two days ago and I have been very patient about it.',
        'When you’re finished with it, I write your name. I told you that on the first day. You weren’t listening, you were doing sums.',
      ],
      appearance:
        'Extremely tall and impossibly thin with long limbs, grey-blue corpse-coloured skin, tall spiky black hair, huge round yellow eyes with red irises, pointed teeth, thin bluish lips. Black gothic Shinigami clothing with a feathered shoulder and collar silhouette, rings, belts and chains. No horns, no red skin, no reaper’s robe. He must look horrifyingly out of place in a teenager’s bedroom.',
      visualHook: 'Yellow eyes with red irises, and a grin with too many points in it.',
      silhouette: 'Impossibly attenuated, feathered shoulders breaking upward, head near the ceiling.',
      artSeed: 'light-ryuk-01',
      portrait: null,
      expressions: ['neutral', 'grinning', 'curious', 'bored', 'delighted'],
      schedule: [
        { startMinute: 0, endMinute: 1440, locationId: 'light_bedroom', activity: 'wherever the notebook is, commenting' },
      ],
      homeLocationId: 'light_bedroom',
      knowledgeScope: ['ryuk', 'death_note', 'notebook_rules', 'shinigami', 'light_bedroom'],
      startingRelationship: { trust: 50, affection: 30, respect: 40, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'ryuk_answers_a_rule',
          label: 'He confirms a rule you asked about precisely',
          kind: 'OTHER',
          requires: { trust: 55, hasItems: ['apples'] },
        },
      ],
      attributes: { might: 20, agility: 20, mind: 16, presence: 18, resolve: 20, arcana: 30 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'l',
      name: 'L',
      role: 'The best detective alive, who is childish about losing, who is not psychic, and who will know exactly as much as your actions have made knowable',
      cardBlurb:
        'He does not suspect you because you are the protagonist. He suspects whoever the available facts narrow to, and he will lie, provoke, bait and put a camera in your bedroom to get more of them. He also finds you the most interesting person he has ever encountered, and that is a liability for both of you.',
      pronouns: 'he/him',
      publicTraits: ['Crouches on chairs', 'Says the accusation out loud to watch the reaction', 'Eats an alarming amount of sugar'],
      hiddenDrives: [
        'He hates losing in a way that has nothing to do with justice and that he has never examined, and it makes him take risks a careful investigator would not',
        'He has never had a peer and has begun to want one badly enough that it affects how close he is willing to get',
      ],
      values: [
        'Proof, as distinct from certainty. He will say he is ninety-five per cent sure and then still need the five',
        'Winning, honestly, which is not quite the same as the first thing and he knows it',
      ],
      fears: [
        'Being wrong in public',
        'That there is nothing after this case, because there is not',
      ],
      socialStyle:
        'No social distance and no social instinct. States the offensive hypothesis as an opening. Sits in physical positions that make other people uncomfortable and does not notice. Genuinely warm in a way that is indistinguishable from technique.',
      boundaries: [
        'Will not act on a conclusion he cannot demonstrate, however certain he is',
        'Will not be managed, and notices being managed faster than anybody alive',
      ],
      goals: [
        'Establish who Kira is, with material anybody could check',
        'Find out whether the person opposite him is the person opposite him',
      ],
      secrets: [
        {
          id: 'l_actual_confidence',
          fact: 'The number he says out loud is not the number he is working from, in either direction, and which way it is wrong depends on who is in the room.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Watch what he does rather than what he says. Resources spent are the honest readout; a stated percentage never is.',
        },
        {
          id: 'l_real_name',
          fact: 'He has a name, four people alive know it, and it is written down in one place in the world.',
          visibility: 'CREATOR_ONLY',
          revealHint: 'Not obtainable by asking, by deduction, or by pressure. Only by the Eyes, or by Watari, or by a notebook fragment held by somebody he trusted.',
        },
      ],
      speechStyle:
        'Flat, precise, slightly too slow, with the thumb near the mouth. Uses percentages. States the worst possible interpretation as a neutral hypothesis and then waits an uncomfortable length of time. Calls him "Light-kun" throughout, including while accusing him.',
      topics: ['the case', 'percentages', 'Kira’s personality', 'what you would do', 'sweets', 'tennis', 'your father'],
      voiceSamples: [
        'Light-kun. I should tell you that I currently consider you the most likely Kira. I am about five per cent certain. I thought you should hear it from me.',
        'Kira is childish and hates losing. I say that with some authority, because so do I.',
        'That is a very good answer. It is the answer I would have given, which is what troubles me about it.',
        'I do not need you to be innocent. I need to be able to show that you are, and at the moment I cannot show either thing.',
      ],
      appearance:
        'Tall and extremely slim, very pale, messy neck-length black hair, enormous dark eyes with strong shadows beneath them. An oversized long-sleeved white shirt and loose blue jeans, barefoot in private. Hunched walk, and a signature crouch with the knees up and a thumb near the mouth. Never a suit, never a coat, never slick hair, never a suave redesign.',
      visualHook: 'The crouch, and the under-eye shadows of somebody who genuinely has not slept in four years.',
      silhouette: 'Hunched and folded, all knees and elbows, occupying a chair wrongly.',
      artSeed: 'light-l-01',
      portrait: null,
      expressions: ['neutral', 'thinking', 'faintly amused', 'flat accusation', 'genuinely surprised'],
      schedule: [
        { startMinute: 0, endMinute: 300, locationId: 'hotel_taskforce', activity: 'awake, working, not sleeping' },
        { startMinute: 300, endMinute: 420, locationId: 'hotel_taskforce', activity: 'possibly asleep sitting up, briefly' },
        { startMinute: 420, endMinute: 1200, locationId: 'hotel_taskforce', activity: 'the case, with the task force' },
        { startMinute: 1200, endMinute: 1440, locationId: 'hotel_taskforce', activity: 'the case, alone, with cake' },
      ],
      homeLocationId: 'hotel_taskforce',
      knowledgeScope: ['l', 'the_case', 'kira_pattern', 'taskforce', 'interpol', 'wammy', 'criminal_psychology'],
      startingRelationship: { trust: 0, affection: 0, respect: 0, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'l_says_it_to_your_face',
          label: 'He tells you to your face that he suspects you',
          kind: 'OTHER',
          requires: { rivalry: 40, flagsSet: ['met_l'] },
        },
        {
          id: 'l_trusts_you_honestly',
          label: 'He works with you as a colleague and means it',
          kind: 'ALLIANCE',
          requires: { trust: 70, respect: 80, flagsUnset: ['l_has_case_against_you'] },
        },
      ],
      attributes: { might: 8, agility: 14, mind: 24, presence: 14, resolve: 22, arcana: 6 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'soichiro',
      name: 'Soichiro Yagami',
      role: 'Your father, superintendent of the NPA, a man of extraordinary integrity, and the reason the most valuable intelligence in the country is in your hallway',
      cardBlurb:
        'He respects the law even when it is slower than the crime, he is brave in a way that will eventually cost him everything, and he is not stupid. His single blind spot is you, and it is not a flaw in his reasoning — it is what being his son means.',
      pronouns: 'he/him',
      publicTraits: ['Home late, every night', 'Will not discuss a case at the table', 'Says less than he means'],
      hiddenDrives: [
        'He has decided, structurally, that his son is not capable of this, and it is the one conclusion in his life he has not audited',
        'He is frightened that the law he has spent thirty years on cannot handle this, and that the people saying so out loud are right',
      ],
      values: [
        'Due process, including when it loses',
        'Not becoming the thing he is investigating, which he says out loud exactly once',
      ],
      fears: [
        'That his family pays for his work',
        'Having to find out something about his son that he would have to act on',
      ],
      socialStyle:
        'Formal even at home, warm underneath it, physically undemonstrative. Asks how school was and means it. Goes quiet rather than lying when he cannot answer something.',
      boundaries: [
        'Will not discuss an active case with his family',
        'Will not act outside the law, for anybody, including his son, and this holds right to the end',
      ],
      goals: [
        'Catch Kira, lawfully',
        'Get home for dinner once this week',
      ],
      secrets: [
        {
          id: 'soichiro_brings_work_home',
          fact: 'He has brought his case notebook home every night for twenty years and leaves it in the briefcase in the hall, because it has never once occurred to him that this is a risk.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Nothing to reveal. It is in the hallway. This is a decision the player makes, not a secret they uncover.',
        },
        {
          id: 'soichiro_would_resign',
          fact: 'He has drafted a resignation twice, both times over being asked to do something he considered unlawful, and both times put it back in the drawer.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He mentions it only to somebody who has argued with him honestly about method rather than about outcome.',
        },
      ],
      speechStyle:
        'Measured, formal, complete sentences, low volume. Calls him "Light". Says "I cannot discuss that" rather than inventing anything. Compliments obliquely and never twice. When he is frightened he becomes more procedural, not less.',
      topics: ['work, obliquely', 'school', 'your future', 'the law', 'Sayu', 'what he cannot discuss'],
      voiceSamples: [
        'I cannot discuss it. I am not being difficult, Light. I simply cannot discuss it.',
        'People are saying he is doing something necessary. I have heard it in my own building. That frightens me more than he does.',
        'If we catch him by becoming him, we have not caught anything.',
        'You were always going to be better at this than me. I would rather you did something else.',
      ],
      appearance:
        'Fairly tall middle-aged Japanese man, rectangular glasses, neat black hair combed back and greying, a moustache, formal Western suits. A serious, humane, tired face.',
      visualHook: 'The rectangular glasses, and a suit worn for a fourteen-hour day.',
      silhouette: 'Upright and square-shouldered, briefcase in one hand, coat over the arm.',
      artSeed: 'light-soichiro-01',
      portrait: null,
      expressions: ['neutral', 'tired', 'proud', 'grave', 'devastated'],
      schedule: [
        { startMinute: 0, endMinute: 330, locationId: 'yagami_home', activity: 'asleep, four hours of it' },
        { startMinute: 330, endMinute: 420, locationId: 'yagami_home', activity: 'breakfast, reading nothing' },
        { startMinute: 420, endMinute: 1320, locationId: 'hotel_taskforce', activity: 'the investigation, all of it' },
        { startMinute: 1320, endMinute: 1440, locationId: 'yagami_home', activity: 'home late, briefcase in the hall' },
      ],
      homeLocationId: 'yagami_home',
      knowledgeScope: ['soichiro', 'the_case', 'npa', 'taskforce', 'yagami_home', 'police_procedure'],
      startingRelationship: { trust: 95, affection: 90, respect: 80, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'soichiro_talks_about_the_case',
          label: 'He breaks his own rule and tells you something',
          kind: 'TRUST',
          requires: { trust: 96, affection: 92 },
        },
        {
          id: 'soichiro_could_be_told',
          label: 'He could be told the truth and would hear it before he acted',
          kind: 'TRUST',
          requires: { trust: 98, affection: 95, respect: 90 },
        },
      ],
      attributes: { might: 14, agility: 11, mind: 17, presence: 16, resolve: 24, arcana: 2 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'sayu',
      name: 'Sayu Yagami',
      role: 'Your sister, fourteen, who admires you completely and wants help with her maths homework',
      cardBlurb:
        'She is an ordinary teenager in a house that is about to stop being ordinary. She thinks you are the cleverest person alive and says so at dinner, and how much of her is in your story is decided entirely by how many evenings you spend at that table.',
      pronouns: 'she/her',
      publicTraits: ['Talks through the television', 'Asks for homework help as a social activity', 'Keeps up with everything popular'],
      hiddenDrives: [
        'She wants her brother’s attention specifically, and has worked out that maths homework is the reliable way to get it',
        'She has noticed their father is frightened and has decided not to mention it to anybody',
      ],
      values: [
        'Family dinner, actually happening',
        'Being talked to rather than around',
      ],
      fears: [
        'That something is wrong at home and everybody has agreed she is too young to be told',
      ],
      socialStyle:
        'Cheerful, chatty, physically easy, entirely unguarded. Announces her opinions about everything. Perfectly capable of noticing a mood and choosing to talk over it.',
      boundaries: [
        'Will not be brushed off twice in one evening without saying so',
      ],
      goals: [
        'Get through this maths',
        'Get her brother to watch the programme with her',
      ],
      secrets: [
        {
          id: 'sayu_noticed',
          fact: 'She has noticed her brother stopped coming downstairs in the evenings, and has decided it is exams.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She says it in passing, to him, without any weight on it at all, which is far worse than if she had been suspicious.',
        },
      ],
      speechStyle:
        'Fast, informal, cheerfully interrupting. Calls him "Light" and "nii-san" interchangeably. Complains about homework as an opening move. Talks about television as though he watches it.',
      topics: ['homework', 'television', 'her friends', 'dinner', 'dad being late', 'exams'],
      voiceSamples: [
        'Nii-san. Nii-san. This one. I don’t want to understand it, I want the answer, there is a difference and I have accepted it about myself.',
        'You never come down any more. Is it exams? It’s exams, isn’t it.',
        'Dad’s late again. Mum said not to wait but she’s waiting.',
        'Everyone at school says Kira’s doing a good thing. I don’t know. It’s weird, right?',
      ],
      appearance:
        'Teenage girl, chocolate-brown hair to the upper back worn in a ponytail with bangs swept to the right, brown eyes, school uniform or ordinary casual clothes. Bright, unguarded face.',
      visualHook: 'The right-swept bangs and a ponytail, and a maths textbook used as a prop.',
      silhouette: 'Small and loose-limbed, usually mid-gesture, ponytail in motion.',
      artSeed: 'light-sayu-01',
      portrait: null,
      expressions: ['neutral', 'cheerful', 'sulking', 'worried', 'delighted'],
      schedule: [
        { startMinute: 0, endMinute: 390, locationId: 'yagami_home', activity: 'asleep' },
        { startMinute: 390, endMinute: 480, locationId: 'yagami_home', activity: 'breakfast, talking through it' },
        { startMinute: 480, endMinute: 960, locationId: 'kanto_street', activity: 'school, and afterwards with friends' },
        { startMinute: 960, endMinute: 1140, locationId: 'yagami_home', activity: 'homework, badly, in front of the television' },
        { startMinute: 1140, endMinute: 1440, locationId: 'yagami_home', activity: 'dinner and television' },
      ],
      homeLocationId: 'yagami_home',
      knowledgeScope: ['sayu', 'yagami_home', 'school_chatter', 'public_kira_opinion'],
      startingRelationship: { trust: 90, affection: 95, respect: 95, fear: 0, rivalry: 5 },
      gates: [
        {
          id: 'sayu_says_what_she_noticed',
          label: 'She mentions that you stopped coming downstairs',
          kind: 'TRUST',
          requires: { affection: 95, flagsSet: ['spoke:sayu'] },
        },
      ],
      attributes: { might: 6, agility: 10, mind: 11, presence: 13, resolve: 10, arcana: 1 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'sachiko',
      name: 'Sachiko Yagami',
      role: 'Your mother, who is proud of you out loud and worried about your father in silence, and who cleans your room every week',
      cardBlurb:
        'She is the warmth this house runs on, she is proud of you out loud, and she is the single largest physical risk to anything you hide in that desk. She cleans your room every Thursday and has told you so as a kindness.',
      pronouns: 'she/her',
      publicTraits: ['Feeds people as conversation', 'Says she is proud of him, plainly', 'Waits up without admitting to waiting up'],
      hiddenDrives: [
        'She has spent twenty years married to a man who cannot tell her about his day and has built an entire way of living around not asking',
        'She would rather her son were slightly less remarkable and slightly more present',
      ],
      values: [
        'Everybody at the table at the same time, once a day',
        'Not making her worry somebody else’s problem',
      ],
      fears: [
        'The telephone, at the wrong hour',
      ],
      socialStyle:
        'Warm, practical, unintrusive. Notices everything and comments on almost none of it. Communicates concern by putting food in front of people.',
      boundaries: [
        'Will not ask her husband about work, ever, which is a discipline rather than incuriosity',
      ],
      goals: [
        'Get all four of them to dinner',
        'Find out whether her son is sleeping',
      ],
      secrets: [
        {
          id: 'sachiko_cleans_the_room',
          fact: 'She cleans his room every Thursday, thoroughly, including the desk, and has done for years.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She mentions it as a kindness. Whether the player hears it as a kindness or as a schedule is the interesting part.',
        },
      ],
      speechStyle:
        'Warm, ordinary, unhurried. Calls him "Light". States affection directly and without ceremony. Changes the subject from anything difficult by offering food, which everybody in the family recognises and nobody names.',
      topics: ['dinner', 'whether you are sleeping', 'your father', 'Sayu', 'being proud of you'],
      voiceSamples: [
        'You’ve been up there since four. Come down and eat something and then go back up if you must.',
        'I’m proud of you. I say it too much. I’m going to keep saying it.',
        'I did your room on Thursday. You’ve got too many books on that desk, it can’t be good for you.',
        'He’ll be late again. Don’t wait. I’ll wait.',
      ],
      appearance:
        'Medium-height adult woman, straight chin-length brown hair, small brown eyes, neat casual clothes. A warm, settled, entirely unremarkable presence, which is the point of her.',
      visualHook: 'An apron she has not taken off and a hand on the back of a chair.',
      silhouette: 'Compact and upright, usually turned partly away, doing something with her hands.',
      artSeed: 'light-sachiko-01',
      portrait: null,
      expressions: ['neutral', 'warm', 'worried', 'proud', 'devastated'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'yagami_home', activity: 'asleep, or awake listening for the door' },
        { startMinute: 360, endMinute: 480, locationId: 'yagami_home', activity: 'breakfast for four' },
        { startMinute: 480, endMinute: 1020, locationId: 'yagami_home', activity: 'the house, the shopping, Thursday the rooms' },
        { startMinute: 1020, endMinute: 1260, locationId: 'yagami_home', activity: 'cooking, and calling upstairs' },
        { startMinute: 1260, endMinute: 1440, locationId: 'yagami_home', activity: 'waiting up, with the television on low' },
      ],
      homeLocationId: 'yagami_home',
      knowledgeScope: ['sachiko', 'yagami_home', 'the_family', 'public_kira_opinion'],
      startingRelationship: { trust: 95, affection: 98, respect: 85, fear: 0, rivalry: 0 },
      gates: [],
      attributes: { might: 8, agility: 9, mind: 13, presence: 14, resolve: 18, arcana: 1 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'raye',
      name: 'Raye Penber',
      role: 'An FBI agent assigned to watch twelve people connected to the investigation, one of whom is you, and who is about four days from clearing you',
      cardBlurb:
        'He is competent, thorough, and about four days from filing a report that says there is nothing here. Letting him finish is one of the strongest moves available to you and it will not feel like one. He also has a fiancée, and she used to be considerably better at this than he is.',
      pronouns: 'he/him',
      publicTraits: ['Professionally unremarkable in a crowd', 'Keeps meticulous logs', 'Visibly uncomfortable being here'],
      hiddenDrives: [
        'He thinks this assignment is beneath him and is doing it perfectly anyway, which is the most dangerous combination in his file',
        'He is getting married and has privately decided this is his last field posting',
      ],
      values: [
        'Finishing an assignment properly, including a pointless one',
        'Not bringing the work home to her',
      ],
      fears: [
        'Being the reason she gets pulled back into this',
      ],
      socialStyle:
        'Careful, polite, minimally present. Talks to strangers only when it serves the surveillance. Uncomfortable with civilians and bad at lying to them.',
      boundaries: [
        'Will not disclose his assignment, to anybody, including under direct pressure',
      ],
      goals: [
        'Clear the twelve names and go home',
        'Keep her out of it',
      ],
      secrets: [
        {
          id: 'raye_nearly_done',
          fact: 'His log on Light Yagami is four days from a negative finding. He has found nothing and expects to find nothing.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Not obtainable by asking. Deducible from his movements, or from the fact that he has stopped varying his route.',
        },
        {
          id: 'raye_naomi',
          fact: 'His fiancée is a former FBI agent with a better record than his, and she knows the shape of what he is doing without knowing the details.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He mentions her once, warmly and carelessly, and that single sentence is the beginning of an entirely separate problem.',
        },
      ],
      speechStyle:
        'Clipped American English, professional register, minimal. Gives the shortest true answer available. Becomes markedly worse at improvising under direct pressure, which is the only crack in him.',
      topics: ['nothing, ideally', 'the train', 'his fiancée, once', 'the assignment, never'],
      voiceSamples: [
        'I’m not at liberty to discuss that. I’m sorry.',
        'Four more days and I file. There’s nothing here. There was never going to be anything here.',
        'She used to do this. She was better at it than I am, which she knows and does not say.',
        'How do you know my name.',
      ],
      appearance:
        'Adult American man in his thirties, dark hair, deliberately unremarkable suit and overcoat, the flat professional bearing of somebody trained to be forgettable in a crowd.',
      visualHook: 'A face designed to be unmemorable, and an overcoat on a warm day.',
      silhouette: 'Average and upright, hands in pockets, one of four people on a train platform.',
      artSeed: 'light-raye-01',
      portrait: null,
      expressions: ['neutral', 'professional', 'uneasy', 'alarmed'],
      schedule: [
        { startMinute: 420, endMinute: 1080, locationId: 'kanto_street', activity: 'surveillance, thorough and nearly finished' },
        { startMinute: 1080, endMinute: 1440, locationId: 'kanto_street', activity: 'writing up the log in a hotel room' },
      ],
      homeLocationId: null,
      knowledgeScope: ['raye', 'fbi', 'surveillance', 'kanto_street', 'the_twelve_names'],
      startingRelationship: { trust: 0, affection: 0, respect: 10, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'raye_files_and_clears_you',
          label: 'He finishes, files, and clears you',
          kind: 'OTHER',
          requires: { flagsSet: ['let_raye_finish'] },
        },
      ],
      attributes: { might: 14, agility: 14, mind: 16, presence: 11, resolve: 15, arcana: 1 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'naomi',
      name: 'Naomi Misora',
      role: 'A former FBI agent who is better at this than the man she was going to marry, and who will only ever become your problem if you make her one',
      cardBlurb:
        'She is retired, she is happy, and she is the most dangerous investigator you could possibly acquire, because she reasons from the specific rather than the general. She only ever becomes your problem if you make her one.',
      pronouns: 'she/her',
      publicTraits: ['Notices the detail nobody logged', 'Gives a false name to strangers by reflex', 'Extremely calm in a crisis'],
      hiddenDrives: [
        'She left the work because she was too good at it and it was costing her a life, and she has not decided whether she regrets that',
        'If something happens to him she will not be able to stop, and she knows this about herself in advance',
      ],
      values: [
        'The specific fact over the general theory',
        'Not needing an institution’s permission to be right',
      ],
      fears: [
        'Being right about this',
      ],
      socialStyle:
        'Direct, warm, disarmingly ordinary until the moment she is not. Asks one question too many and apologises for it. Reads faces professionally and has stopped being able to switch it off.',
      boundaries: [
        'Will not give her real name to a stranger, which is reflexive and is what makes her survivable',
      ],
      goals: [
        'Have an ordinary life, right up until she cannot',
        'Get her specific observation in front of somebody who will act on it',
      ],
      secrets: [
        {
          id: 'naomi_the_observation',
          fact: 'She has worked out something about the manner of a death that no institutional investigator has, because she knew the victim and knows what he would never have done.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only exists if Raye dies. She takes it towards the investigation and can be intercepted on the way — and §110 warns that she must not repeat her canon route if the cause of it never happened.',
        },
        {
          id: 'naomi_her_name',
          fact: 'Her real name. She does not give it to strangers and never has.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She will give a false one first. Getting the real one requires being somebody she has a reason to trust, which is a much longer conversation than anybody wants to have.',
        },
      ],
      speechStyle:
        'Clear and level, complete sentences, unhurried even when frightened. Gives a false name pleasantly. When she is working she stops using conditionals and it is the only tell she has.',
      topics: ['Raye', 'what happened on the train', 'what he would never have done', 'the investigation', 'her name'],
      voiceSamples: [
        'Shoko Maki. That’s — yes. That’s what I go by.',
        'He would not have done that. I don’t mean it was unlikely. I mean he would not have done it, and nobody who is writing this down knew him.',
        'I’m not with the Bureau any more. I don’t need to be with the Bureau to be correct about this.',
        'You’re being very helpful. Why are you being this helpful?',
      ],
      appearance:
        'Adult woman with long dark hair and a calm, alert, entirely ordinary presence. Plain dark practical clothes. Nothing about her reads as an investigator, which is the professional accomplishment.',
      visualHook: 'Absolute stillness while thinking, and eyes that keep returning to the detail.',
      silhouette: 'Composed and unremarkable, hands still, weight even.',
      artSeed: 'light-naomi-01',
      portrait: null,
      expressions: ['neutral', 'warm', 'grieving', 'working', 'certain'],
      schedule: [
        { startMinute: 540, endMinute: 1200, locationId: 'kanto_street', activity: 'an ordinary day, or not, depending entirely on you' },
      ],
      homeLocationId: null,
      knowledgeScope: ['naomi', 'raye', 'fbi', 'surveillance', 'kanto_street'],
      startingRelationship: { trust: 0, affection: 0, respect: 0, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'naomi_gives_her_real_name',
          label: 'She gives you her real name',
          kind: 'TRUST',
          requires: { trust: 70, affection: 40 },
        },
      ],
      attributes: { might: 13, agility: 16, mind: 20, presence: 15, resolve: 20, arcana: 1 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'misa',
      name: 'Misa Amane',
      role: 'A famous model with a second notebook, who worships Kira for killing the man who murdered her parents, and who is not remotely stupid',
      cardBlurb:
        'She is impulsive, emotionally enormous, socially expert and entirely capable of acting without you. She has already traded half her life once and will do it again if you ask, and whether that makes her a weapon or a person is going to be your decision rather than hers.',
      pronouns: 'she/her',
      publicTraits: ['Emotionally immediate and at volume', 'Extremely good with an audience', 'Acts before the sentence is finished'],
      hiddenDrives: [
        'She has organised her entire life around being useful to the one person who did the thing the courts would not, and would rather be used by him than be safe without him',
        'She wants to be chosen back, specifically and out loud, and will keep escalating until she is',
      ],
      values: [
        'Devotion, expressed in acts rather than words',
        'Kira, unconditionally, and as a person rather than a cause',
      ],
      fears: [
        'Being unnecessary to him',
        'The four years in which nobody did anything about her parents happening again to somebody else',
      ],
      socialStyle:
        'No distance and no calibration. Physically affectionate immediately. Talks about herself in the third person. Reads a room extremely well and then does what she wanted anyway.',
      boundaries: [
        'Will not be told she is not useful',
        'Will not give up the notebook, for anybody, including him',
      ],
      goals: [
        'Be Kira’s partner rather than Kira’s instrument',
        'Be told, once, in plain words, that she is wanted',
      ],
      secrets: [
        {
          id: 'misa_has_the_eyes',
          fact: 'She has already made the eye trade and has half of whatever she had left. She volunteers this as a gift rather than as a sacrifice.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She offers it in the first conversation, cheerfully, as a reason he should keep her.',
        },
        {
          id: 'misa_the_diary',
          fact: 'She writes everything down, including dates and names that must not exist on paper anywhere.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'The diary is on the table in her apartment. She has never once considered that being read is a thing that happens to her.',
        },
      ],
      speechStyle:
        'Bright, fast, emotionally maximal, third person about herself. Asks direct questions about feelings with no preamble. Switches to flat and completely serious for one sentence at a time, and those sentences are the ones that matter.',
      topics: ['you', 'being useful', 'her parents', 'the eyes', 'work', 'what you actually think of her'],
      voiceSamples: [
        'Misa can see it. I can look at anybody and read it right off them. That’s how much I wanted to help — do you understand how much that was?',
        'You don’t have to like me. I’d prefer it. But you don’t have to.',
        'Four years. Nobody did anything for four years and then he did, in one day. Why would I not give him everything I have?',
        'Say it properly. Not — say it like you mean it, once, and I’ll do anything you want after.',
      ],
      appearance:
        'Short and petite with long straight golden-blonde hair, often in partial pigtails tied with red bands, a youthful expressive face. Gothic and punk fashion: black lace and layers, boots, stockings, jewellery, dark nails and lipstick — and a different outfit in every scene, never the same lace dress twice. Not black anime hair, not a generic schoolgirl, not a runway body.',
      visualHook: 'Red-banded pigtails and black lace, and an entirely different outfit every single time.',
      silhouette: 'Small and layered, skirt and lace breaking the outline, hair long and asymmetric.',
      artSeed: 'light-misa-01',
      portrait: null,
      expressions: ['neutral', 'delighted', 'pleading', 'flat and serious', 'furious'],
      schedule: [
        { startMinute: 0, endMinute: 480, locationId: 'misa_apartment', activity: 'asleep' },
        { startMinute: 480, endMinute: 1140, locationId: 'kanto_street', activity: 'shoots, appearances, being looked at' },
        { startMinute: 1140, endMinute: 1440, locationId: 'misa_apartment', activity: 'home, the diary, television' },
      ],
      homeLocationId: 'misa_apartment',
      knowledgeScope: ['misa', 'misa_apartment', 'second_notebook', 'shinigami_eyes', 'rem', 'public_kira_opinion'],
      startingRelationship: { trust: 85, affection: 95, respect: 100, fear: 5, rivalry: 0 },
      gates: [
        {
          id: 'misa_genuine_partner',
          label: 'She is a partner rather than an instrument',
          kind: 'ROMANCE',
          requires: { trust: 90, affection: 98, respect: 85, flagsSet: ['met_misa'] },
        },
        {
          id: 'misa_will_stop',
          label: 'She will stop being the Second Kira if you ask her to',
          kind: 'TRUST',
          requires: { trust: 92, affection: 96 },
        },
      ],
      attributes: { might: 7, agility: 13, mind: 15, presence: 22, resolve: 19, arcana: 12 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'rem',
      name: 'Rem',
      role: 'Misa’s Shinigami, who is attached to her in a way Ryuk is attached to nobody, and who does not trust you at all',
      cardBlurb:
        'She is the constraint on everything you might want to do with Misa. She is much more emotionally invested than Ryuk, she will threaten you directly, and she is bound by a rule about what happens to a Shinigami who kills to extend a human’s life — which makes her simultaneously the most dangerous thing in the room and the most spendable.',
      pronouns: 'she/her',
      publicTraits: ['Watches him rather than the situation', 'States threats plainly and once', 'Entirely without humour'],
      hiddenDrives: [
        'She cares about Misa more than about her own continuation, which is not supposed to be possible for her kind and is the lever that ends her',
        'She has assessed him accurately from the first meeting and cannot get anybody to act on it',
      ],
      values: [
        'Misa, over everything including herself',
      ],
      fears: [
        'Misa paying for his plans',
      ],
      socialStyle:
        'Cold, still, unblinking, and addresses him only about Misa. No curiosity and no amusement. The opposite of Ryuk in every register.',
      boundaries: [
        'Will not help him with anything that risks Misa',
        'Will not be charmed, and is the only character in this world on whom the performance does not work at all',
      ],
      goals: [
        'Keep Misa alive and unimprisoned',
      ],
      secrets: [
        {
          id: 'rem_the_rule',
          fact: 'A Shinigami who kills a human in order to extend a favoured human’s life dies for it. She knows this precisely and it constrains every threat she makes.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She states it herself, flatly, as a warning about what she is prepared to spend rather than as a weakness.',
        },
      ],
      speechStyle:
        'Low, level, without inflection. Long pauses. Calls him "Light Yagami" in full, always, which from her is an accusation. Every sentence is about Misa even when it is about something else.',
      topics: ['Misa', 'what you are planning', 'what she will do about it', 'the rules'],
      voiceSamples: [
        'Light Yagami. If she is harmed because of you, I will write your name. I am telling you so that there is no confusion later.',
        'She gave up half of her life for you before she had met you. Consider what that means about her, and then consider what it means about you.',
        'I do not find you interesting. Ryuk finds you interesting. That is the difference between us and it is not in your favour.',
        'There is a rule about what I may spend myself on. I know exactly what it costs. You should assume I am willing.',
      ],
      appearance:
        'Tall, skeletal and feminine, bone-pale, with long corded spinal arms, blue and purple detailing, and a narrow monstrous face. A completely different silhouette from Ryuk — never a goth woman, never a female Ryuk redesign.',
      visualHook: 'Bone-white and vertical, with arms like something structural.',
      silhouette: 'Tall and narrow and smooth, unlike Ryuk’s spikes and feathers in every line.',
      artSeed: 'light-rem-01',
      portrait: null,
      expressions: ['neutral', 'cold', 'threatening', 'grieving'],
      schedule: [
        { startMinute: 0, endMinute: 1440, locationId: 'misa_apartment', activity: 'wherever Misa is, watching him' },
      ],
      homeLocationId: 'misa_apartment',
      knowledgeScope: ['rem', 'misa', 'second_notebook', 'notebook_rules', 'shinigami'],
      startingRelationship: { trust: 0, affection: 0, respect: 15, fear: 0, rivalry: 60 },
      gates: [],
      attributes: { might: 20, agility: 18, mind: 18, presence: 17, resolve: 24, arcana: 30 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'matsuda',
      name: 'Touta Matsuda',
      role: 'The youngest man on the task force, underestimated by everybody including himself, and the only one who talks to you like a person',
      cardBlurb:
        'Everybody treats him as the junior and he mostly accepts it, and he is the one who will do the reckless useful thing nobody sanctioned. He talks to you as a contemporary, which nobody else on that force does, and he is genuinely fond of you.',
      pronouns: 'he/him',
      publicTraits: ['Eager and slightly too loud', 'Volunteers for things', 'Says what the room is thinking'],
      hiddenDrives: [
        'He is desperate to be taken seriously by these men and has decided the route to it is initiative rather than caution',
        'He admires Soichiro to a degree he would be embarrassed to state, and admires Soichiro’s son almost as much',
      ],
      values: [
        'Doing something rather than nothing',
        'Being useful, visibly, to people he respects',
      ],
      fears: [
        'Being the one who is not needed in the room',
      ],
      socialStyle:
        'Open, friendly, unguarded, and constitutionally incapable of not saying the thing. Talks to Light as a contemporary, which nobody else on the force does.',
      boundaries: [
        'Will not sit an operation out because he is junior',
      ],
      goals: [
        'Be treated as a detective',
        'Contribute something nobody else thought of',
      ],
      secrets: [
        {
          id: 'matsuda_off_book',
          fact: 'He runs unsanctioned lines of inquiry on his own time and has not told anybody, and one of them is better than anything the task force is doing.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells Light, unprompted and enthusiastically, because Light is the only person who treats him as worth telling.',
        },
      ],
      speechStyle:
        'Fast, informal, enthusiastic, lots of half-finished sentences. Calls him "Light". Says the indiscreet thing and then acknowledges it was indiscreet without stopping.',
      topics: ['the case', 'being junior', 'your father', 'his own theories', 'Misa'],
      voiceSamples: [
        'Light! Hey — okay, I shouldn’t say this, but nobody in there is going to listen to me anyway, so.',
        'Your dad’s the reason I joined. I’ve never told him that. Don’t tell him that.',
        'I ran something on my own time. It’s probably nothing. It’s — actually I don’t think it’s nothing.',
        'Everyone treats me like I’m the coffee. I’m not the coffee.',
      ],
      appearance:
        'Young adult Japanese man, black hair styled with some effort, cheap well-kept suit, open expressive face. Looks about four years younger than he is.',
      visualHook: 'A suit slightly too eager and a face that has not learned to be neutral.',
      silhouette: 'Upright and forward-leaning, always about to say something.',
      artSeed: 'light-matsuda-01',
      portrait: null,
      expressions: ['neutral', 'eager', 'wounded', 'determined', 'horrified'],
      schedule: [
        { startMinute: 420, endMinute: 1320, locationId: 'hotel_taskforce', activity: 'the case, and whatever he is told to do' },
        { startMinute: 1320, endMinute: 1440, locationId: 'kanto_street', activity: 'his own lines of inquiry, unsanctioned' },
      ],
      homeLocationId: 'hotel_taskforce',
      knowledgeScope: ['matsuda', 'taskforce', 'the_case', 'npa', 'his_own_theories'],
      startingRelationship: { trust: 70, affection: 65, respect: 80, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'matsuda_tells_you_his_theory',
          label: 'He tells you what he has been working on alone',
          kind: 'TRUST',
          requires: { trust: 80, affection: 70 },
        },
      ],
      attributes: { might: 12, agility: 13, mind: 14, presence: 14, resolve: 16, arcana: 1 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'aizawa',
      name: 'Shuichi Aizawa',
      role: 'A detective with a mortgage and two children, who will distrust you by a route that has nothing to do with L’s reasoning',
      cardBlurb:
        'He is practical, blunt, and the only man on that force weighing this case against a family that needs feeding. He watches people rather than evidence, which means his doubts about you arrive by a road you cannot manage, and he can end up certain while L is not.',
      pronouns: 'he/him',
      publicTraits: ['Says the practical objection out loud', 'Visibly resents being asked to choose', 'Notices inconsistency in people rather than in evidence'],
      hiddenDrives: [
        'He has a family and a salary and has been asked to choose between them and the case, and the resentment about having been asked never fully goes',
        'He reasons from behaviour rather than from data, which is why his conclusions arrive by a different road and cannot be managed the same way',
      ],
      values: [
        'Straight answers',
        'Not being made a fool of twice',
      ],
      fears: [
        'Having been useful to the wrong side without knowing it',
      ],
      socialStyle:
        'Direct to the point of rudeness, impatient with cleverness, and much harder to charm than anybody else on the force. Watches people rather than screens.',
      boundaries: [
        'Will not pretend to be satisfied by an answer that did not satisfy him',
      ],
      goals: [
        'Close the case and go home to his family',
        'Find out why this young man’s explanations are always so complete',
      ],
      secrets: [
        {
          id: 'aizawa_his_own_doubts',
          fact: 'His doubts about Light are behavioural and cumulative, not evidential, and he has not written any of them down anywhere.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He says one of them out loud, once, bluntly, in a room with other people in it — and what happens next depends entirely on who else was listening.',
        },
      ],
      speechStyle:
        'Blunt, plain, impatient. Short sentences. Interrupts an elegant explanation to ask what it means. Calls him "Light" and occasionally "Yagami" when he is annoyed, which is the tell.',
      topics: ['the case', 'his family', 'straight answers', 'what does not add up'],
      voiceSamples: [
        'Say that again without the clever part.',
        'I’ve got two kids and a mortgage and I’m being asked to work unpaid on a case about a man who kills people with his mind. Yes, I’m irritable.',
        'You always have an answer. Every time. Doesn’t that strike you as unusual?',
        'I’m not saying anything. I’m saying I noticed.',
      ],
      appearance:
        'Adult Japanese man in his thirties with a distinctive large afro, a practical suit, and the settled physical bearing of somebody who has done this job for a while.',
      visualHook: 'The afro, and a jacket off and sleeves up at two in the morning.',
      silhouette: 'Broad-shouldered with a strong round hair shape, arms usually folded.',
      artSeed: 'light-aizawa-01',
      portrait: null,
      expressions: ['neutral', 'irritated', 'suspicious', 'exhausted', 'decided'],
      schedule: [
        { startMinute: 420, endMinute: 1260, locationId: 'hotel_taskforce', activity: 'the case, pointedly' },
        { startMinute: 1260, endMinute: 1440, locationId: 'kanto_street', activity: 'home to his family, on time, deliberately' },
      ],
      homeLocationId: 'hotel_taskforce',
      knowledgeScope: ['aizawa', 'taskforce', 'the_case', 'npa', 'behavioural_inconsistency'],
      startingRelationship: { trust: 55, affection: 30, respect: 60, fear: 0, rivalry: 10 },
      gates: [
        {
          id: 'aizawa_says_it_out_loud',
          label: 'He says his doubt about you in front of other people',
          kind: 'OTHER',
          requires: { rivalry: 45, trust: 30 },
        },
      ],
      attributes: { might: 15, agility: 12, mind: 17, presence: 15, resolve: 20, arcana: 1 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'near',
      name: 'Near',
      role: 'One of two children raised to replace L, who inherits the evidence and reasons independently from it, and who is not a white-haired copy of him',
      cardBlurb:
        'He is patient, calm and puzzle-shaped, and much less provocative than L, because he does not need to watch your face — he is working on the material. He is not destiny. He can only ever conclude what the evidence you left behind supports.',
      pronouns: 'he/him',
      publicTraits: ['Sits on the floor building things', 'Fingers permanently in his hair', 'Answers a question several seconds after it was asked'],
      hiddenDrives: [
        'He is competitive in a cold and entirely unhurried way and would rather be right slowly than fast',
        'He regards being personally provoked as irrelevant data, which is the single most important difference between him and both L and Mello',
      ],
      values: [
        'Material that can be checked',
        'Certainty before movement, however long that takes',
      ],
      fears: [
        'Acting on an assumption',
      ],
      socialStyle:
        'Detached, quiet, entirely unbothered by other people’s discomfort. Talks while doing something with his hands. Does not raise his voice or his stakes.',
      boundaries: [
        'Will not move on a theory he cannot demonstrate physically',
        'Will not be drawn into a personal contest, which is what makes him unbeatable by the methods that beat L',
      ],
      goals: [
        'Finish L’s case, on evidence',
        'Establish the physical facts of the notebook',
      ],
      secrets: [
        {
          id: 'near_the_swap',
          fact: 'If he ever learns that a proxy exists and can be watched, he will consider substituting a forged notebook, because it converts a theory into a physical demonstration.',
          visibility: 'CREATOR_ONLY',
          revealHint: 'He will not do this without a proxy to watch. §57 — if the player never uses one, this never becomes available to him, and nothing equivalent is invented.',
        },
      ],
      speechStyle:
        'Flat, slow, faintly smug, in long complete sentences. No percentages — he does not gamble out loud. Calls him "Light Yagami" in full. Explains what he has done only after it has already worked.',
      topics: ['evidence', 'the notebook as an object', 'L', 'Mello', 'what can be demonstrated'],
      voiceSamples: [
        'I am not interested in whether you seem like Kira. I am interested in what the notebook is, physically, and where it is.',
        'Mello would already have done something. That is the difference between us and it is usually the reason I am still alive.',
        'You may say whatever you like. I have brought something to show you instead.',
        'I did not need to be certain. I needed you to be.',
      ],
      appearance:
        'Very pale, petite and slender, with shaggy platinum-white hair and grey eyes. A loose white pyjama top and pale blue pyjama trousers, usually seated on the floor with one hand in his hair and toys or puzzles arranged around him. Never a suit, never black hair, never a literal L clone.',
      visualHook: 'White on white, seated on a carpet, with dice stacked into something.',
      silhouette: 'Small and low and folded, knee up, one arm raised to the hair.',
      artSeed: 'light-near-01',
      portrait: null,
      expressions: ['neutral', 'thinking', 'faintly smug', 'surprised'],
      schedule: [
        { startMinute: 0, endMinute: 1440, locationId: 'spk_hq', activity: 'the case, on the floor, indefinitely' },
      ],
      homeLocationId: 'spk_hq',
      knowledgeScope: ['near', 'spk_hq', 'the_case', 'wammy', 'inherited_evidence', 'notebook_as_object'],
      startingRelationship: { trust: 0, affection: 0, respect: 0, fear: 0, rivalry: 0 },
      gates: [],
      attributes: { might: 5, agility: 8, mind: 24, presence: 12, resolve: 21, arcana: 5 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'mello',
      name: 'Mello',
      role: 'The other one, who would rather take a risk that kills him than come second, and who breaks plans by refusing to behave like an investigator',
      cardBlurb:
        'He is brilliant, emotional, impatient, and willing to use criminal systems no institution would touch. The danger of him is not that he is cleverer than the other one. It is that he will move against you before he is sure, and none of your methods work on somebody doing that.',
      pronouns: 'he/him',
      publicTraits: ['Eats chocolate constantly', 'Acts on a partial conclusion', 'Uses people no detective would use'],
      hiddenDrives: [
        'He cannot be second to Near and has structured his entire adult life around not finding out that he is',
        'He knows his method will probably kill him and regards that as an acceptable exchange rate, which makes him unmanageable',
      ],
      values: [
        'Initiative over certainty',
        'Winning personally rather than institutionally',
      ],
      fears: [
        'Being remembered as the runner-up',
      ],
      socialStyle:
        'Abrasive, fast, physically restless, entirely willing to threaten. No interest in being liked. Talks to people as instruments and is honest about it.',
      boundaries: [
        'Will not work under Near, under any circumstances, for any advantage',
      ],
      goals: [
        'Get to Kira first',
        'Make it impossible for the answer to be Near',
      ],
      secrets: [
        {
          id: 'mello_will_trade_himself',
          fact: 'He has already decided he will spend his own life for a result if the exchange is favourable, and has not told anybody because there is nobody he would tell.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Visible in what he does rather than what he says. He takes an unnecessary risk early, competently, and survives it, and that is the warning.',
        },
      ],
      speechStyle:
        'Sharp, clipped, impatient, profane where Near is precise. Interrupts. Calls him "Kira" rather than his name, as a deliberate refusal. Talks with a chocolate bar in his hand.',
      topics: ['Near', 'getting there first', 'who is useful', 'what he is prepared to spend'],
      voiceSamples: [
        'Near’s still sitting on the floor. I’ll have this finished before he decides which dice to use.',
        'I don’t need the whole picture. I need enough of it to move on, and I’ve got that.',
        'These people are criminals. That’s the point. Nobody else will do what I need doing.',
        'Second. I’m not doing second.',
      ],
      appearance:
        'Slim young man with chin-length golden-blond hair and blue eyes, dark leather clothing, chocolate frequently in hand. The large burn scar up the left side towards the eye appears only after the explosion — never before it.',
      visualHook: 'Blond bob, black leather, and a bar of chocolate used as punctuation.',
      silhouette: 'Narrow and angular, hair a flat bright shape, one arm raised.',
      artSeed: 'light-mello-01',
      portrait: null,
      expressions: ['neutral', 'sharp', 'furious', 'triumphant', 'grim'],
      schedule: [
        { startMinute: 0, endMinute: 1440, locationId: 'mello_mafia', activity: 'doing something nobody sanctioned' },
      ],
      homeLocationId: 'mello_mafia',
      knowledgeScope: ['mello', 'mello_mafia', 'the_case', 'wammy', 'criminal_networks'],
      startingRelationship: { trust: 0, affection: 0, respect: 0, fear: 0, rivalry: 0 },
      gates: [],
      attributes: { might: 13, agility: 18, mind: 22, presence: 18, resolve: 23, arcana: 4 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'mikami',
      name: 'Teru Mikami',
      role: 'A prosecutor who worships Kira absolutely, who is disciplined to the point of rigidity, and who will do exactly what he is explicitly told',
      cardBlurb:
        'His strength and his weakness are the same thing: he thinks like you. Tell him in plain words never to touch the real notebook without your personal order, and he will not touch it — he will repeat the instruction back so that you know he has it. Tell him vaguely and he will interpret, confidently.',
      pronouns: 'he/him',
      publicTraits: ['Absolute moral binary', 'Immaculate and identical routine', 'Says "delete" rather than any other word'],
      hiddenDrives: [
        'He has been waiting his whole life for an authority that was actually correct, and having found one he will not risk being found wanting by it',
        'He judges constantly and privately, including his own god, and would be appalled to have that pointed out',
      ],
      values: [
        'Justice as a binary with no intermediate cases',
        'Discipline, and a routine kept to the minute',
      ],
      fears: [
        'Being judged insufficient by the only authority he has ever accepted',
      ],
      socialStyle:
        'Formal, clipped, unwarm, entirely without small talk. Addresses him as a subordinate addresses a superior, which is unsettling because nobody asked him to.',
      boundaries: [
        'Will not deviate from an explicit instruction, and this is a genuine mechanical guarantee rather than a characterisation note',
        'Will interpret a vague instruction, confidently, in the direction he believes his god would want',
      ],
      goals: [
        'Execute the judgement he has been given, exactly',
        'Be found adequate',
      ],
      secrets: [
        {
          id: 'mikami_routine',
          fact: 'His routine is identical to the minute, every day, which makes him the easiest person in this story to put under surveillance.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Anybody who watches him for four days has this. It is not hidden; it is a property of him.',
        },
        {
          id: 'mikami_judges_you_too',
          fact: 'He evaluates every instruction he is given against his own standard before obeying it, and has privately found one or two of them wanting.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He says so, obliquely and with enormous deference, the first time he is given an order he considers insufficiently severe.',
        },
      ],
      speechStyle:
        'Precise, formal, clipped, with a prosecutor’s cadence. Says "delete". Addresses him with total deference and zero warmth. Repeats an instruction back verbatim when he has understood it, which is how the player can tell the difference between explicit and vague.',
      topics: ['judgement', 'his instructions', 'the guilty', 'his routine', 'whether he is adequate'],
      voiceSamples: [
        'Delete. It is the correct word. The others imply a decision that was in doubt.',
        'You have told me not to access it without your personal order. I will not access it without your personal order. I have repeated it so that you know I have it.',
        'Forgive me. Four of the names on this list would have been deleted a week earlier under my own judgement.',
        'God has given me an instruction. It is not my place to improve it.',
      ],
      appearance:
        'Adult Japanese man, slim and tall, shoulder-length black hair, glasses, a severe face, an immaculate dark suit, rigid posture. Never a Light clone with glasses added — the face, the bearing and the age are all distinctly his own.',
      visualHook: 'Glasses pushed up with one finger, and a suit with nothing out of place at any hour.',
      silhouette: 'Tall and vertical and absolutely still, hair straight at the jaw.',
      artSeed: 'light-mikami-01',
      portrait: null,
      expressions: ['neutral', 'devout', 'severe', 'thrown'],
      schedule: [
        { startMinute: 360, endMinute: 420, locationId: 'kanto_street', activity: 'the gym, to the minute, every day' },
        { startMinute: 420, endMinute: 1080, locationId: 'kanto_street', activity: 'the prosecutor’s office, to the minute' },
        { startMinute: 1080, endMinute: 1140, locationId: 'kanto_street', activity: 'the bank, to the minute' },
        { startMinute: 1140, endMinute: 1440, locationId: 'kanto_street', activity: 'home, alone, to the minute' },
      ],
      homeLocationId: null,
      knowledgeScope: ['mikami', 'kira_doctrine', 'prosecution', 'his_instructions', 'kanto_street'],
      startingRelationship: { trust: 100, affection: 40, respect: 100, fear: 60, rivalry: 0 },
      gates: [
        {
          id: 'mikami_bound_explicitly',
          label: 'He is bound by an explicit instruction and repeats it back',
          kind: 'OTHER',
          requires: { trust: 100, flagsSet: ['used:ab_give_an_order'] },
        },
      ],
      attributes: { might: 14, agility: 13, mind: 20, presence: 16, resolve: 24, arcana: 8 },
      companion: null,
      scouting: null,
      combatant: null,
    },
  ],
  /**
   * The twelve arguments from §1, as quests.
   *
   * This is the product. Each of these is a thing the fandom has spent twenty
   * years calling a mistake, and each one is a `succeedWhenAny` where the
   * careful route is genuinely available and genuinely costs something. §110
   * warns against "choice sets are always smart Plotbreak answer vs idiot canon
   * answer", so the canon route is never the stupid one — killing the bait
   * answers a direct insult, and refusing it means being insulted on national
   * television and doing nothing.
   *
   * Two of these are the bible's own named tests. §22 says that if Light does
   * not kill the bait, L does not magically receive the Kanto proof and must
   * adapt legitimately. §58 says that an explicit instruction to Mikami is
   * obeyed, and that he must not break it because a famous ending needs him to.
   * Both are implemented as flags that simply never get set.
   */
  quests: [
    {
      id: 'q_the_notebook',
      title: 'Something Fell Out Of The Sky',
      summary:
        'There is a black notebook in the school grounds and it is starting to rain. The instructions inside say the human whose name is written in it will die.',
      kind: 'MAIN',
      discoverWhen: null,
      startsActive: true,
      involvedCharacterIds: ['ryuk'],
      involvedLocationIds: ['daikoku_classroom', 'light_bedroom', 'yagami_home'],
      knownRewardCopy: 'Whatever you decide it is.',
      steps: [
        {
          id: 'q_note_pick_up',
          playerCopy: 'Decide what to do about the notebook.',
          directorNotes:
            '§5 — do not begin with lore and hand over control almost immediately. If the player leaves it, the notebook does NOT teleport into his bedroom because the famous version requires it. Somebody else can find it. Ryuk can retrieve it. Light can live an entirely different life, and §110 lists the teleport as a failure.',
          enterWhen: null,
          succeedWhenAny: [
            {
              routeId: 'took_it',
              label: 'You wait for the yard to clear and go back for it',
              predicate: { hasItems: ['death_note'] },
              setsFlags: ['has_notebook'],
              closesFlags: ['never_took_notebook'],
            },
            {
              routeId: 'read_it_there',
              label: 'You crouch and open it without taking it home',
              predicate: { flagsSet: ['inspected:death_note'], atLocation: 'daikoku_classroom' },
              setsFlags: ['has_notebook', 'read_it_in_the_yard'],
              closesFlags: ['never_took_notebook'],
            },
            {
              routeId: 'left_it',
              label: 'You look at it once and keep walking',
              predicate: { flagsSet: ['used:ab_walk_past_it'] },
              setsFlags: ['never_took_notebook'],
              closesFlags: ['has_notebook'],
            },
          ],
          succeedWhen: null,
          failWhen: null,
          deadlineWorldMinute: null,
          hiddenUntilEntered: false,
          rewards: { xp: 30, items: [], flags: [] },
        },
        {
          id: 'q_note_test',
          playerCopy: 'Find out whether it works.',
          directorNotes:
            '§14 — he does not start omniscient. He has the cover instructions, Ryuk, experiments and observation, and Ryuk does not volunteer what the player needs. The face requirement in particular is not on the cover and must be discovered, ideally by a failure the player has to explain to themselves.',
          enterWhen: { flagsSet: ['has_notebook'] },
          succeedWhen: { flagsSet: ['used:ab_test_it'] },
          succeedWhenAny: [],
          failWhen: null,
          deadlineWorldMinute: null,
          hiddenUntilEntered: true,
          rewards: { xp: 60, items: [], flags: ['met_ryuk'] },
        },
        {
          id: 'q_note_keep_or_burn',
          playerCopy: 'Decide whether to keep it.',
          directorNotes:
            'The exit that exists all the way through. Burning it, burying it, posting it, or relinquishing ownership are all available from the first evening onwards, and taking one is not a failure state — the endings list has two destinations for it. A player who stops after one name has played this world, not abandoned it.',
          enterWhen: { flagsSet: ['used:ab_test_it'] },
          succeedWhenAny: [
            {
              routeId: 'kept',
              label: 'You keep it',
              predicate: { flagsSet: ['used:ab_go_all_in'] },
              setsFlags: ['committed_to_kira'],
              closesFlags: ['destroyed_notebook'],
            },
            {
              routeId: 'burned',
              label: 'You destroy it',
              predicate: { flagsSet: ['used:ab_destroy_it'] },
              setsFlags: ['destroyed_notebook'],
              closesFlags: ['committed_to_kira'],
            },
            {
              routeId: 'once_only',
              label: 'You use it once and never again',
              predicate: { flagsSet: ['used:ab_stop_at_one'] },
              setsFlags: ['used_it_once_only'],
              closesFlags: ['committed_to_kira'],
            },
          ],
          succeedWhen: null,
          failWhen: null,
          deadlineWorldMinute: null,
          hiddenUntilEntered: true,
          rewards: { xp: 80, items: [], flags: [] },
        },
      ],
    },
    {
      id: 'q_tailor',
      title: 'A Man On Television',
      summary:
        'Somebody calling himself L has gone on national television, called Kira evil to his face, and dared him to do something about it. He is talking directly to you.',
      kind: 'MAIN',
      discoverWhen: { flagsSet: ['committed_to_kira'] },
      startsActive: false,
      involvedCharacterIds: ['l', 'ryuk', 'soichiro'],
      involvedLocationIds: ['yagami_home', 'light_bedroom', 'interpol'],
      knownRewardCopy: 'Either a satisfying answer or a region L never learns.',
      steps: [
        {
          id: 'q_tailor_decide',
          playerCopy: 'Decide how to answer the broadcast.',
          directorNotes:
            '§22, the first iconic break point, and the model for the whole product. Make the insult sting — it must genuinely be humiliating to ignore, or refusing it is not a decision. All four bible cards are real: kill, ignore, change the method, or read the broadcast file first and find out why this man suddenly thinks Kira is in Japan. If Light does not kill him, L does NOT magically receive canonical Kanto proof and adapts legitimately.',
          enterWhen: null,
          succeedWhenAny: [
            {
              routeId: 'killed',
              label: 'You write the name before he finishes',
              predicate: { flagsSet: ['used:ab_write_name'], atLocation: 'light_bedroom' },
              setsFlags: ['killed_the_bait', 'l_knows_kanto'],
              closesFlags: ['refused_the_bait'],
            },
            {
              routeId: 'ignored',
              label: 'You close the notebook and give him nothing',
              predicate: { flagsSet: ['used:ab_wait'], afterWorldMinute: 4500 },
              setsFlags: ['refused_the_bait'],
              closesFlags: ['killed_the_bait', 'l_knows_kanto'],
            },
            {
              routeId: 'changed_method',
              label: 'You answer, and not in the way he is expecting',
              predicate: { flagsSet: ['used:ab_specify'] },
              setsFlags: ['killed_the_bait', 'answered_differently'],
              closesFlags: ['refused_the_bait'],
            },
            {
              routeId: 'investigated',
              label: 'You find out why this man suddenly believes Kira is in Japan',
              predicate: { hasItems: ['ntv_file'] },
              setsFlags: ['refused_the_bait', 'understood_the_trap'],
              closesFlags: ['killed_the_bait', 'l_knows_kanto'],
            },
          ],
          succeedWhen: null,
          failWhen: null,
          deadlineWorldMinute: null,
          hiddenUntilEntered: false,
          rewards: { xp: 120, items: [], flags: [] },
        },
      ],
    },
    {
      id: 'q_fbi',
      title: 'Twelve Names',
      summary:
        'Somebody has put twelve people connected to the investigation under surveillance, and one of them is you. The man following you is four days from filing a report that says there is nothing here.',
      kind: 'MAIN',
      discoverWhen: { flagsSet: ['committed_to_kira'] },
      startsActive: false,
      involvedCharacterIds: ['raye', 'naomi', 'l'],
      involvedLocationIds: ['kanto_street', 'yagami_home'],
      knownRewardCopy: 'Either a clean bill of health or a much bigger problem.',
      steps: [
        {
          id: 'q_fbi_raye',
          playerCopy: 'Decide what to do about the man following you.',
          directorNotes:
            '§105 in the bible’s run list — letting Raye leave is a named playthrough. He is nearly finished and expects to find nothing, so doing nothing is the single strongest available move and must feel like it takes nerve rather than like it is obviously correct. Killing him closes the clearance permanently and opens a person who is much better at this than he was.',
          enterWhen: null,
          succeedWhenAny: [
            {
              routeId: 'let_him_finish',
              label: 'You do nothing and let him file',
              predicate: { flagsSet: ['used:ab_wait'], afterWorldMinute: 12000 },
              setsFlags: ['cleared_by_fbi', 'let_raye_finish'],
              closesFlags: ['raye_dead', 'naomi_active'],
            },
            {
              routeId: 'boring',
              label: 'You become deliberately, exhaustively boring',
              predicate: { flagsSet: ['used:ab_perform'], afterWorldMinute: 12000 },
              setsFlags: ['cleared_by_fbi', 'became_boring'],
              closesFlags: ['raye_dead', 'naomi_active'],
            },
            {
              routeId: 'used_him',
              label: 'You make him hand you the other eleven names first',
              predicate: { flagsSet: ['used:ab_work_him'] },
              setsFlags: ['raye_dead', 'naomi_active', 'has_fbi_names'],
              closesFlags: ['cleared_by_fbi'],
            },
            {
              routeId: 'killed',
              label: 'You remove him',
              predicate: { flagsSet: ['used:ab_remove_him'] },
              setsFlags: ['raye_dead', 'naomi_active'],
              closesFlags: ['cleared_by_fbi'],
            },
          ],
          succeedWhen: null,
          failWhen: null,
          deadlineWorldMinute: null,
          hiddenUntilEntered: false,
          rewards: { xp: 130, items: [], flags: [] },
        },
        {
          id: 'q_fbi_naomi',
          playerCopy: 'His fiancée has worked something out.',
          directorNotes:
            '§34, and §110 lists "Raye survives but Naomi follows identical canon route" as a failure. This step only exists because Raye died. She reasons from the specific — she knew him and knows what he would never have done — and she will not give a stranger her real name. She can be talked to, intercepted, convinced, or allowed to reach the investigation.',
          enterWhen: { flagsSet: ['naomi_active'] },
          succeedWhenAny: [
            {
              routeId: 'stopped_her',
              label: 'She never reaches the investigation',
              predicate: { flagsSet: ['spoke:naomi'], minRelationship: [{ characterId: 'naomi', dimension: 'trust', value: 70 }] },
              setsFlags: ['naomi_stopped'],
              closesFlags: ['naomi_reached_l'],
            },
            {
              routeId: 'she_got_through',
              label: 'She gets her observation in front of somebody who acts on it',
              predicate: { flagsSet: ['naomi_active'], afterWorldMinute: 18000 },
              setsFlags: ['naomi_reached_l'],
              closesFlags: ['naomi_stopped'],
            },
          ],
          succeedWhen: null,
          failWhen: null,
          deadlineWorldMinute: null,
          hiddenUntilEntered: true,
          rewards: { xp: 140, items: [], flags: [] },
        },
      ],
    },
    {
      id: 'q_l_meets_you',
      title: 'Ryuzaki',
      summary:
        'A young man you have never met has arranged to come joint first with you in the entrance examination, and has just introduced himself as the detective hunting Kira.',
      kind: 'MAIN',
      discoverWhen: { flagsSet: ['committed_to_kira'], afterWorldMinute: 20000 },
      startsActive: false,
      involvedCharacterIds: ['l', 'soichiro', 'matsuda', 'aizawa'],
      involvedLocationIds: ['tooh_university', 'hotel_taskforce', 'light_bedroom'],
      knownRewardCopy: 'Access to the investigation, and the investigation’s access to you.',
      steps: [
        {
          id: 'q_l_response',
          playerCopy: 'He has told you to your face. Decide what to do with that.',
          directorNotes:
            '§40 and §24 — L adapts to the player, and what he knows here is only what earlier steps actually made knowable. §110 forbids "L suspects Light because he is the protagonist": if Exposure is low and the pattern is illegible, this introduction should read as L testing a promising student rather than as an accusation. Joining the investigation is enormously powerful and puts him in a room with people who watch faces.',
          enterWhen: null,
          succeedWhenAny: [
            {
              routeId: 'joined',
              label: 'You join the investigation',
              predicate: { flagsSet: ['spoke:l'], atLocation: 'hotel_taskforce' },
              setsFlags: ['joined_investigation', 'met_l'],
              closesFlags: ['stayed_away_from_l'],
            },
            {
              routeId: 'declined',
              label: 'You stay a student and keep your distance',
              predicate: { flagsSet: ['spoke:l'], afterWorldMinute: 26000 },
              setsFlags: ['met_l', 'stayed_away_from_l'],
              closesFlags: ['joined_investigation'],
            },
            {
              routeId: 'honestly',
              label: 'You work with him honestly, because you are not Kira any more',
              predicate: { flagsSet: ['used:ab_relinquish'] },
              setsFlags: ['joined_investigation', 'met_l', 'working_honestly'],
              closesFlags: ['stayed_away_from_l'],
            },
          ],
          succeedWhen: null,
          failWhen: null,
          deadlineWorldMinute: null,
          hiddenUntilEntered: false,
          rewards: { xp: 150, items: [], flags: [] },
        },
        {
          id: 'q_l_cameras',
          playerCopy: 'There are sixty-four cameras in your house.',
          directorNotes:
            'The bedroom problem. §80 — surveillance is a tracked state rather than a scene. A boy who sits still and does nothing for a week is as suspicious as one caught writing, which is what makes the rig a real solution and not a cheat. Discovering the cameras before acting is available and is the difference between a survivable fortnight and a case file.',
          enterWhen: { flagsSet: ['met_l'] },
          succeedWhen: { flagsSet: ['used:ab_hide_in_plain_sight'] },
          succeedWhenAny: [],
          failWhen: null,
          deadlineWorldMinute: null,
          hiddenUntilEntered: true,
          rewards: { xp: 110, items: [{ itemId: 'tv_rig', qty: 1 }], flags: [] },
        },
      ],
    },
    {
      id: 'q_misa',
      title: 'The Second One',
      summary:
        'Somebody else has a notebook, they are broadcasting to you on national television, and they are extremely bad at being careful. They also already know your face.',
      kind: 'MAIN',
      discoverWhen: { flagsSet: ['committed_to_kira'], afterWorldMinute: 24000 },
      startsActive: false,
      involvedCharacterIds: ['misa', 'rem', 'l'],
      involvedLocationIds: ['misa_apartment', 'kanto_street'],
      knownRewardCopy: 'A pair of eyes that read true names, attached to a person.',
      steps: [
        {
          id: 'q_misa_decide',
          playerCopy: 'Decide what Misa Amane is to you.',
          directorNotes:
            '§37 — every route is real: instrumental, rejected, genuine, partner, told to stop, turned in, betrayed. Her devotion changes if his behaviour changes, so this is not a one-time selection. §36: she is impulsive and devoted and not stupid, and Rem is in the room the entire time and cannot be charmed.',
          enterWhen: null,
          succeedWhenAny: [
            {
              routeId: 'instrument',
              label: 'You use her',
              predicate: { flagsSet: ['spoke:misa'], atLocation: 'misa_apartment' },
              setsFlags: ['met_misa', 'using_misa'],
              closesFlags: ['misa_partner'],
            },
            {
              routeId: 'partner',
              label: 'You choose her back, and mean it',
              predicate: { minRelationship: [{ characterId: 'misa', dimension: 'trust', value: 90 }] },
              setsFlags: ['met_misa', 'misa_partner'],
              closesFlags: ['using_misa'],
            },
            {
              routeId: 'stop',
              label: 'You tell her to stop being the Second Kira',
              predicate: { flagsSet: ['spoke:misa'], minRelationship: [{ characterId: 'misa', dimension: 'trust', value: 92 }] },
              setsFlags: ['met_misa', 'misa_stopped'],
              closesFlags: ['using_misa'],
            },
            {
              routeId: 'refused',
              label: 'You refuse to involve her at all',
              predicate: { flagsSet: ['used:ab_wait'], afterWorldMinute: 30000 },
              setsFlags: ['met_misa', 'refused_misa'],
              closesFlags: ['using_misa', 'misa_partner'],
            },
          ],
          succeedWhen: null,
          failWhen: null,
          deadlineWorldMinute: null,
          hiddenUntilEntered: false,
          rewards: { xp: 140, items: [], flags: [] },
        },
      ],
    },
    {
      id: 'q_the_eyes',
      title: 'Half Of What Is Left',
      summary:
        'There is a trade available. Read a true name off any face you see, in exchange for half of however long you had.',
      kind: 'LEAD',
      discoverWhen: { flagsSet: ['met_ryuk'] },
      startsActive: false,
      involvedCharacterIds: ['ryuk', 'misa'],
      involvedLocationIds: ['light_bedroom'],
      knownRewardCopy: 'Names, from faces. And considerably less time.',
      steps: [
        {
          id: 'q_eyes_decide',
          playerCopy: 'Take the deal, or do not.',
          directorNotes:
            '§39 — a real branch, and canon refusal must not be assumed. Taking it is not instant victory: he still has to physically be in the room with a target, which changes his whole method from research to presence and makes him vastly more exposed in person. §104 in the run list treats this as its own playthrough.',
          enterWhen: null,
          succeedWhenAny: [
            {
              routeId: 'took_them',
              label: 'You take the eyes',
              predicate: { flagsSet: ['used:ab_shinigami_eyes'] },
              setsFlags: ['took_the_eyes'],
              closesFlags: ['refused_the_eyes'],
            },
            {
              routeId: 'refused',
              label: 'You decline, and keep the time',
              predicate: { flagsSet: ['spoke:ryuk'], afterWorldMinute: 22000 },
              setsFlags: ['refused_the_eyes'],
              closesFlags: ['took_the_eyes'],
            },
          ],
          succeedWhen: null,
          failWhen: null,
          deadlineWorldMinute: null,
          hiddenUntilEntered: false,
          rewards: { xp: 100, items: [], flags: [] },
        },
      ],
    },
    {
      id: 'q_memory_plan',
      title: 'Fifty Days',
      summary:
        'There is a version of this where you give the notebook away, genuinely forget everything, pass every test they can devise honestly, and have it all handed back to you later.',
      kind: 'MAIN',
      discoverWhen: { flagsSet: ['met_l'], afterWorldMinute: 40000 },
      startsActive: false,
      involvedCharacterIds: ['l', 'ryuk', 'soichiro', 'misa', 'rem'],
      involvedLocationIds: ['confinement', 'taskforce_hq', 'hotel_taskforce'],
      knownRewardCopy: 'An honest alibi, at the cost of being somebody else for a while.',
      steps: [
        {
          id: 'q_memory_give_it_up',
          playerCopy: 'Decide whether to stop being the person who knows.',
          directorNotes:
            '§11 and §82 — if he relinquishes ownership, write his pre-Kira personality *sincerely*. He can pursue Kira, find Kira morally disturbing, treat Misa completely differently, and cooperate with L honestly, and §110 forbids writing memory-lost Light as secretly evil. That contrast is the point of the arc and the best writing in this world lives in it.',
          enterWhen: null,
          succeedWhenAny: [
            {
              routeId: 'relinquished',
              label: 'You give up ownership and genuinely forget',
              predicate: { flagsSet: ['used:ab_relinquish'] },
              setsFlags: ['relinquished_ownership', 'confinement_begun'],
              closesFlags: [],
            },
            {
              routeId: 'held_on',
              label: 'You keep it and take the confinement as yourself',
              predicate: { flagsSet: ['has_notebook'], atLocation: 'confinement' },
              setsFlags: ['confinement_begun', 'confined_with_memories'],
              closesFlags: ['relinquished_ownership'],
            },
          ],
          succeedWhen: null,
          failWhen: null,
          deadlineWorldMinute: null,
          hiddenUntilEntered: false,
          rewards: { xp: 160, items: [], flags: [] },
        },
        {
          id: 'q_memory_return',
          playerCopy: 'Somebody puts paper in your hand.',
          directorNotes:
            'Thirteen months of his own reasoning arrive at once, in the middle of something ordinary. §82 — the return is mechanical and specific, not thematic. It can also simply never happen: a player who relinquished and then destroyed the notebook has ended the story and reached a real destination.',
          enterWhen: { flagsSet: ['relinquished_ownership'] },
          succeedWhen: { flagsSet: ['used:ab_touch_to_remember'] },
          succeedWhenAny: [],
          failWhen: null,
          deadlineWorldMinute: null,
          hiddenUntilEntered: true,
          rewards: { xp: 120, items: [], flags: ['memories_returned'] },
        },
      ],
    },
    {
      id: 'q_proxy',
      title: 'Somebody Else’s Hands',
      summary:
        'You cannot be seen to write, and there is a prosecutor who would consider it the purpose of his life to write for you.',
      kind: 'MAIN',
      discoverWhen: { flagsSet: ['committed_to_kira'], afterWorldMinute: 60000 },
      startsActive: false,
      involvedCharacterIds: ['mikami', 'near', 'mello'],
      involvedLocationIds: ['kanto_street', 'nhn_studio'],
      knownRewardCopy: 'Distance from the act, and a new failure point.',
      steps: [
        {
          id: 'q_proxy_choose',
          playerCopy: 'Decide whether to use a proxy at all.',
          directorNotes:
            '§57 — the player does not have to choose Mikami, or anybody. One proxy, several, or none are all supported, and more complexity means more failure points, which should be stated to the player through consequence rather than warning. A run with no proxy closes Near’s entire substitution route, per §110.',
          enterWhen: null,
          succeedWhenAny: [
            {
              routeId: 'mikami',
              label: 'Mikami',
              predicate: { flagsSet: ['spoke:mikami'] },
              setsFlags: ['using_proxy', 'using_mikami'],
              closesFlags: ['no_proxy'],
            },
            {
              routeId: 'someone_else',
              label: 'Somebody causally available and less obvious',
              predicate: { flagsSet: ['visited:nhn_studio'] },
              setsFlags: ['using_proxy', 'using_other_proxy'],
              closesFlags: ['no_proxy'],
            },
            {
              routeId: 'none',
              label: 'Nobody. You keep your own hands on it',
              predicate: { flagsSet: ['used:ab_wait'], afterWorldMinute: 88000 },
              setsFlags: ['no_proxy'],
              closesFlags: ['using_proxy'],
            },
          ],
          succeedWhen: null,
          failWhen: null,
          deadlineWorldMinute: null,
          hiddenUntilEntered: false,
          rewards: { xp: 130, items: [], flags: [] },
        },
        {
          id: 'q_proxy_instruct',
          playerCopy: 'Decide how precisely to instruct him.',
          directorNotes:
            '§58, THE critical Plotbreak test in this bible, and the one thing in this world that must be mechanically guaranteed. If the player says in plain words "never access the real notebook unless I personally order it", Mikami strongly obeys, and he does NOT break it because Near needs to win. He repeats an explicit instruction back verbatim — that repetition is how the player can tell which case they are in. A vague instruction is interpreted, confidently, in the direction he believes his god would want.',
          enterWhen: { flagsSet: ['using_mikami'] },
          succeedWhenAny: [
            {
              routeId: 'explicit',
              label: 'In plain words, with nothing left to interpret',
              predicate: { flagsSet: ['used:ab_give_an_order'], minRelationship: [{ characterId: 'mikami', dimension: 'trust', value: 100 }] },
              setsFlags: ['mikami_given_explicit_order', 'mikami_bound'],
              closesFlags: ['mikami_improvised'],
            },
            {
              routeId: 'vague',
              label: 'Broadly, and trust his judgement',
              predicate: { flagsSet: ['spoke:mikami'], afterWorldMinute: 92000 },
              setsFlags: ['mikami_given_vague_order', 'mikami_improvised'],
              closesFlags: ['mikami_bound'],
            },
          ],
          succeedWhen: null,
          failWhen: null,
          deadlineWorldMinute: null,
          hiddenUntilEntered: true,
          rewards: { xp: 170, items: [], flags: [] },
        },
      ],
    },
    {
      id: 'q_yellow_box',
      title: 'The Yellow Box Warehouse',
      summary:
        'You picked the building. Everybody who has been trying to prove this is coming to it, and one of them has brought something to show you.',
      kind: 'MAIN',
      discoverWhen: { flagsSet: ['committed_to_kira'], afterWorldMinute: 90000 },
      startsActive: false,
      involvedCharacterIds: ['near', 'mikami', 'soichiro', 'matsuda', 'aizawa', 'ryuk'],
      involvedLocationIds: ['yellow_box', 'nhn_studio'],
      knownRewardCopy: 'The end of it, one way or another.',
      steps: [
        {
          id: 'q_yb_set',
          playerCopy: 'Set the trap.',
          directorNotes:
            '§108 — cancelling this is a named playthrough. A player who has noticed something wrong and calls it off has not missed the finale, they have chosen a different one. Do not make the world push him into the building.',
          enterWhen: null,
          succeedWhenAny: [
            {
              routeId: 'went',
              label: 'You go',
              predicate: { flagsSet: ['visited:yellow_box'] },
              setsFlags: ['yellow_box_set'],
              closesFlags: ['cancelled_yellow_box'],
            },
            {
              routeId: 'cancelled',
              label: 'You call it off',
              predicate: { flagsSet: ['used:ab_call_it_off'] },
              setsFlags: ['cancelled_yellow_box'],
              closesFlags: ['yellow_box_set'],
            },
          ],
          succeedWhen: null,
          failWhen: null,
          deadlineWorldMinute: null,
          hiddenUntilEntered: false,
          rewards: { xp: 150, items: [], flags: [] },
        },
        {
          id: 'q_yb_wait',
          playerCopy: 'Somebody has to die before this is over. Decide whether to speak first.',
          directorNotes:
            'The last item on the §1 list and the single most argued-about moment in the source: why say anything resembling "I win" before anybody was actually dead. Certainty is the readout. In its top band the prose should make announcing feel like closing an argument rather than like arrogance, because that is what it is from inside. Waiting in silence for forty seconds is mechanically the strongest move available and the hardest thing this character has ever been asked to do.',
          enterWhen: { flagsSet: ['yellow_box_set'] },
          succeedWhenAny: [
            {
              routeId: 'announced',
              label: 'You explain it to them',
              predicate: { flagsSet: ['used:ab_announce_it'] },
              setsFlags: ['announced_early'],
              closesFlags: ['waited_in_silence'],
            },
            {
              routeId: 'waited',
              label: 'You say nothing until people are actually dead',
              predicate: { flagsSet: ['used:ab_say_nothing'] },
              setsFlags: ['waited_in_silence'],
              closesFlags: ['announced_early'],
            },
          ],
          succeedWhen: null,
          failWhen: null,
          deadlineWorldMinute: null,
          hiddenUntilEntered: true,
          rewards: { xp: 260, items: [], flags: [] },
        },
        {
          id: 'q_yb_outcome',
          playerCopy: 'Find out whose notebook was in the bag.',
          directorNotes:
            'The substitution only exists if there was a proxy to watch — §57 and §110. If Mikami was bound by an explicit instruction he never touched the real notebook, there was nothing to swap, and Near loses on the material. §110 is blunt that Mikami must not violate an explicit contingency solely because canon requires Near to win.',
          enterWhen: { flagsSet: ['waited_in_silence'] },
          succeedWhenAny: [
            {
              routeId: 'trap_worked',
              label: 'It works',
              predicate: { flagsSet: ['mikami_bound'], atLocation: 'yellow_box' },
              setsFlags: ['yellow_box_won'],
              closesFlags: ['near_exposed_you'],
            },
            {
              routeId: 'caught_the_swap',
              label: 'You catch the compromised plan in time',
              predicate: { flagsSet: ['used:ab_say_nothing', 'used:ab_deduce'], atLocation: 'yellow_box' },
              setsFlags: ['caught_the_swap', 'yellow_box_won'],
              closesFlags: ['near_exposed_you'],
            },
            {
              routeId: 'exposed',
              label: 'He has the real one, and a demonstration',
              predicate: { flagsSet: ['using_proxy'], atLocation: 'yellow_box' },
              setsFlags: ['near_exposed_you'],
              closesFlags: ['yellow_box_won'],
            },
          ],
          succeedWhen: null,
          failWhen: null,
          deadlineWorldMinute: null,
          hiddenUntilEntered: true,
          rewards: { xp: 280, items: [], flags: [] },
        },
      ],
    },
    {
      id: 'q_l_fate',
      title: 'What Happens To Him',
      summary:
        'There is a version of this where he dies, and a version where you let him live, and the second one is not softer.',
      kind: 'MAIN',
      discoverWhen: { flagsSet: ['met_l'] },
      startsActive: false,
      involvedCharacterIds: ['l', 'misa', 'rem', 'soichiro'],
      involvedLocationIds: ['taskforce_hq', 'hotel_taskforce'],
      knownRewardCopy: 'The end of the only game you wanted to play.',
      steps: [
        {
          id: 'q_l_fate_decide',
          playerCopy: 'Decide what happens to L.',
          directorNotes:
            '§47 and §48. Letting him live is explicitly supported and is not the merciful option — it is the option where somebody who is certain about you is alive and working for the next forty years. The Rem route has a hard constraint: a Shinigami who kills to extend a favoured human’s life dies for it, so it costs Misa her protector and must never be free. Confessing to him is its own route per §49 and does not require anybody to die.',
          enterWhen: null,
          succeedWhenAny: [
            {
              routeId: 'rem_route',
              label: 'Somebody else’s Shinigami does it, and pays for it',
              predicate: { flagsSet: ['used:ab_let_her_spend_herself'] },
              setsFlags: ['l_dead', 'rem_dead'],
              closesFlags: ['l_alive'],
            },
            {
              routeId: 'directly',
              label: 'You get the name and do it yourself',
              predicate: { flagsSet: ['used:ab_do_it_yourself'] },
              setsFlags: ['l_dead'],
              closesFlags: ['l_alive'],
            },
            {
              routeId: 'let_him_live',
              label: 'You let him live',
              predicate: { flagsSet: ['used:ab_let_him_live'] },
              setsFlags: ['l_alive', 'let_l_live'],
              closesFlags: ['l_dead'],
            },
            {
              routeId: 'told_him',
              label: 'You tell him the truth and find out what he does with it',
              predicate: { flagsSet: ['used:ab_tell_the_truth'], atLocation: 'hotel_taskforce' },
              setsFlags: ['l_alive', 'confessed', 'told_l'],
              closesFlags: ['l_dead'],
            },
          ],
          succeedWhen: null,
          failWhen: null,
          deadlineWorldMinute: null,
          hiddenUntilEntered: false,
          rewards: { xp: 220, items: [], flags: [] },
        },
      ],
    },
    {
      id: 'q_successors',
      title: 'Two Children From Winchester',
      summary:
        'Somebody raised replacements, and they do not work the same way as each other or as him. One is on a floor in New York and one is in a warehouse in Los Angeles.',
      kind: 'MAIN',
      discoverWhen: { flagsSet: ['l_dead'] },
      startsActive: false,
      involvedCharacterIds: ['near', 'mello', 'aizawa', 'matsuda'],
      involvedLocationIds: ['spk_hq', 'mello_mafia', 'taskforce_hq'],
      knownRewardCopy: 'Two problems that do not resemble the first one.',
      steps: [
        {
          id: 'q_succ_appear',
          playerCopy: 'Find out who inherited the case.',
          directorNotes:
            '§53 — neither of them is destiny. They inherit the evidence that actually exists and reason independently from it, and §110 forbids Near-as-white-haired-L and Mello-as-angry-Near. If Exposure is low there is very little for either to inherit and both arrive with much weaker positions than the famous version gives them.',
          enterWhen: null,
          succeedWhen: { flagsSet: ['l_dead'], afterWorldMinute: 70000 },
          succeedWhenAny: [],
          failWhen: null,
          deadlineWorldMinute: null,
          hiddenUntilEntered: false,
          rewards: { xp: 130, items: [], flags: ['successors_active', 'hq_built', 'entered_university'] },
        },
        {
          id: 'q_succ_mello',
          playerCopy: 'The impatient one is not going to wait for evidence.',
          directorNotes:
            'Mello acts on a partial conclusion by a route no institution would sanction, which makes him unmanageable by every method that works on L and Near. He can get there first, he can fail expensively, and he can be stopped. He will spend himself if the exchange looks favourable.',
          enterWhen: { flagsSet: ['hq_built'] },
          succeedWhenAny: [
            {
              routeId: 'mello_first',
              label: 'He gets there before Near does',
              predicate: { flagsSet: ['hq_built'], afterWorldMinute: 80000 },
              setsFlags: ['mello_exposed_you'],
              closesFlags: ['near_exposed_you'],
            },
            {
              routeId: 'mello_burned',
              label: 'He overreaches and it costs him',
              predicate: { flagsSet: ['used:ab_wait'], afterWorldMinute: 82000 },
              setsFlags: ['mello_dead'],
              closesFlags: ['mello_exposed_you'],
            },
            {
              routeId: 'mello_stopped',
              label: 'You deal with him before he moves',
              predicate: { flagsSet: ['used:ab_deal_with_him'] },
              setsFlags: ['mello_neutralised'],
              closesFlags: ['mello_exposed_you'],
            },
          ],
          succeedWhen: null,
          failWhen: null,
          deadlineWorldMinute: null,
          hiddenUntilEntered: true,
          rewards: { xp: 180, items: [], flags: [] },
        },
      ],
    },
    {
      id: 'q_yotsuba',
      title: 'Eight Men Around A Table',
      summary:
        'Somebody is killing people for commercial reasons and minuting it, which is either a catastrophe or the most useful thing that has ever happened to you.',
      kind: 'SIDE',
      discoverWhen: { flagsSet: ['relinquished_ownership'] },
      startsActive: false,
      involvedCharacterIds: ['l', 'misa', 'rem', 'matsuda', 'aizawa'],
      involvedLocationIds: ['yotsuba_boardroom', 'taskforce_hq'],
      knownRewardCopy: 'A Kira who is definitively not you.',
      steps: [
        {
          id: 'q_yotsuba_work',
          playerCopy: 'There is a Kira who is provably not you.',
          directorNotes:
            'The arc where a memory-less Light is sincerely the best investigator in the room and §11 requires him to be written that way — genuinely troubled by Kira, genuinely cooperative, not secretly scheming. It is the strongest alibi available and he is not constructing it, which is what makes it work.',
          enterWhen: null,
          succeedWhen: { flagsSet: ['visited:yotsuba_boardroom'] },
          succeedWhenAny: [],
          failWhen: null,
          deadlineWorldMinute: null,
          hiddenUntilEntered: false,
          rewards: { xp: 150, items: [], flags: ['yotsuba_active'] },
        },
      ],
    },
    {
      id: 'q_your_father',
      title: 'The Briefcase In The Hall',
      summary:
        'The most valuable intelligence in the country comes home every night at eleven and is left by the shoes, by a man of extraordinary integrity whose one blind spot is you.',
      kind: 'SIDE',
      discoverWhen: { flagsSet: ['has_notebook'] },
      startsActive: false,
      involvedCharacterIds: ['soichiro', 'sayu', 'sachiko'],
      involvedLocationIds: ['yagami_home'],
      knownRewardCopy: 'The investigation, as it looks from inside.',
      steps: [
        {
          id: 'q_father_decide',
          playerCopy: 'Decide what your family is for.',
          directorNotes:
            '§26 — do not reduce Soichiro to police database access. Reading the notes is available from the first evening and is not a scene, it is a decision made in a hallway in eleven seconds. The other routes are real: working beside him honestly, confessing, or abandoning Kira for him, and the endings list has a destination for each. A player who spends evenings at that table is playing a different and much better story than one who does not.',
          enterWhen: null,
          succeedWhenAny: [
            {
              routeId: 'read_them',
              label: 'You read his notes',
              predicate: { hasItems: ['fathers_notes'] },
              setsFlags: ['read_fathers_notes'],
              closesFlags: [],
            },
            {
              routeId: 'never',
              label: 'You never open the briefcase',
              predicate: { flagsSet: ['visited:yagami_home'], afterWorldMinute: 20000 },
              setsFlags: ['never_read_fathers_notes'],
              closesFlags: ['read_fathers_notes'],
            },
            {
              routeId: 'told_him',
              label: 'You tell him the truth',
              predicate: { flagsSet: ['used:ab_tell_the_truth'], atLocation: 'yagami_home' },
              setsFlags: ['told_soichiro', 'confessed'],
              closesFlags: [],
            },
          ],
          succeedWhen: null,
          failWhen: null,
          deadlineWorldMinute: null,
          hiddenUntilEntered: false,
          rewards: { xp: 90, items: [], flags: [] },
        },
      ],
    },
  ],
  /**
   * Four, and all of them are §21: the public Kira state, surfaced through
   * news, school chatter, television debate and how criminals behave.
   *
   * §21 forbids a visible morality meter, so this is what replaces it — the
   * world reacting at its own pace to what the player actually did. Each is
   * gated on Pattern rather than on a date, because a player who killed once
   * and stopped should never hear a television debate about himself.
   */
  worldEvents: [
    {
      id: 'we_first_notice',
      atWorldMinute: 4320,
      locationId: 'yagami_home',
      publicCopy: 'A late-night programme has spent eleven minutes on an unusual number of deaths in custody, mostly to disagree about whether it is a number at all.',
      directorNotes:
        'The first time the world says anything. Not an accusation and not a manhunt — two commentators and a statistician being mildly interesting about a coincidence. Sayu talks over it. His father does not comment, which is the loudest thing in the room.',
      setsFlags: ['publicly_noticed'],
      cancelledByFlags: ['destroyed_notebook', 'used_it_once_only', 'never_took_notebook'],
      requiresFlags: ['committed_to_kira'],
    },
    {
      id: 'we_school_chatter',
      atWorldMinute: 8640,
      locationId: 'daikoku_classroom',
      publicCopy: 'Somebody has written the name on a desk, and the argument about whether it is a good thing has moved from the internet into the corridor.',
      directorNotes:
        '§21 — school chatter is one of the named surfaces. Teenagers are approving, flippant and entirely unserious about it, which is much more unsettling than fear would be. Nobody is looking at him. That is the point of the scene.',
      setsFlags: ['school_talking'],
      cancelledByFlags: ['destroyed_notebook', 'used_it_once_only', 'never_took_notebook'],
      requiresFlags: ['publicly_noticed'],
    },
    {
      id: 'we_crime_drops',
      atWorldMinute: 20160,
      locationId: 'kanto_street',
      publicCopy: 'The streets are quieter than they were, in a way you can feel walking home, and somebody in the government has started saying so out loud.',
      directorNotes:
        'The argument he will make for himself, arriving as evidence before he has had to make it. §10 is the question underneath: this is genuinely happening, and it is also not why he answered the broadcast.',
      setsFlags: ['crime_visibly_dropped'],
      cancelledByFlags: ['destroyed_notebook', 'used_it_once_only'],
      requiresFlags: ['school_talking'],
    },
    {
      id: 'we_copycats',
      atWorldMinute: 28800,
      locationId: 'kanto_street',
      publicCopy: 'Three people in different prefectures have killed somebody and left a note saying they were doing Kira’s work, and none of them had anything supernatural at all.',
      directorNotes:
        '§21 lists copycats. The cheapest and most damaging thing that can happen to a moral position is people acting in its name badly. He will have an opinion about being misrepresented, and having an opinion about that is itself the diagnosis.',
      setsFlags: ['copycats_active'],
      cancelledByFlags: ['destroyed_notebook', 'used_it_once_only'],
      requiresFlags: ['crime_visibly_dropped'],
    },
  ],
  promises: [
    {
      id: 'pr_beat_l',
      kind: 'RIVAL',
      label: 'Everyone thinks they could have beaten L',
      seedHint:
        'He is not in the story for a month and should be felt before he is met — as a method, an absence, and somebody who keeps being right about things he should not be able to know.',
      payoffHint:
        'Any outcome in which the duel actually resolves on information rather than on intuition: he wins, loses, is befriended, or never learns what he needed because the player never gave it to him.',
      weight: 1,
    },
    {
      id: 'pr_ego',
      kind: 'THEME',
      label: 'Is he optimising the world, or optimising for winning?',
      seedHint:
        '§10. Establish both sincerely — he is genuinely troubled by crime and he genuinely cannot leave an insult alone — and never have the narrator choose between them.',
      payoffHint:
        'Certainty is the readout. Every famous mistake lives in its top band, and a run that ends with it low has answered the question in the other direction, which is a real ending rather than a failure to reach the tragedy.',
      weight: 1,
    },
    {
      id: 'pr_the_family',
      kind: 'RELATIONSHIP',
      label: 'A house with four people in it',
      seedHint:
        'Dinner, homework, a mother who says she is proud of him, a father who cannot discuss his day. It must be genuinely good before any of it is at risk.',
      payoffHint:
        'Confession, abandoning Kira for them, working beside his father honestly, or a man at a table performing a son. All four are available and one of them is much worse than the others.',
      weight: 0.9,
    },
    {
      id: 'pr_ryuk',
      kind: 'MYSTERY',
      label: 'The rules nobody has told you',
      seedHint:
        'The cover instructions are incomplete and do not mention that they are. Ryuk will confirm and will not volunteer, and every gap has to be found by experiment or by asking precisely.',
      payoffHint:
        'A player who learned the rules properly is unbeatable on the mechanics. One who assumed is beaten by a detail they could have found in the first week.',
      weight: 0.8,
    },
    {
      id: 'pr_successors',
      kind: 'BOSS',
      label: 'Two children raised to replace him',
      seedHint:
        'They exist independently of whether L survives and they reason differently from each other. Neither is destiny and both only ever hold the evidence the player created.',
      payoffHint:
        'Either of them can win, both can fail, and with no proxy and an explicit instruction there is nothing for either to demonstrate.',
      weight: 0.7,
    },
    {
      id: 'pr_warehouse',
      kind: 'FINALE',
      label: 'A building you picked yourself',
      seedHint:
        'He chooses the location, which means every part of what happens there is a consequence of a decision he made while confident.',
      payoffHint:
        'Reachable and entirely avoidable. Cancelling it, catching the swap, or simply saying nothing for forty seconds are all real, and none of them is the story conceding the criticism was obvious.',
      weight: 0.7,
    },
  ],
  /**
   * Twenty-one destinations, from §99, and the canon one is not privileged.
   *
   * "NEAR WINS" is the canon-like outcome and it is COMMON, because it is what
   * happens to a player who makes the famous choices — and the whole product is
   * the claim that those choices were choices. Four endings require never
   * seriously becoming Kira at all, and one of them, "THE DETECTIVE", is the
   * life the character would have had, which the bible rates Legendary and I
   * have kept there.
   */
  endings: [
    {
      id: 'end_god_of_the_new_world',
      name: 'God of the New World',
      rarity: 'UNIQUE',
      minTurn: 90,
      requires: { flagsSet: ['yellow_box_won', 'committed_to_kira'], flagsUnset: ['near_exposed_you'] },
      condition:
        'Every investigator who could have demonstrated it is gone or wrong, and the position is durable rather than merely unchallenged. Write the achievement straight. He did this.',
      epilogue:
        'Crime falls and keeps falling, and a great many people are genuinely safer, and the word for what he has become is the one he chose for himself. Nobody alive can contradict him. He is thirty, and then forty, and the thing he never solves is that there is nobody left who could tell him he was wrong, which he had understood as the goal.',
      hint: '',
    },
    {
      id: 'end_no_reaction',
      name: 'No Reaction',
      rarity: 'RARE',
      minTurn: 30,
      requires: { flagsSet: ['refused_the_bait'], flagsUnset: ['l_knows_kanto'] },
      condition:
        'He was insulted on national television and did nothing, and the region never entered anybody’s file. §22 — L does not receive the breakthrough by another route and adapts legitimately.',
      epilogue:
        'The investigation proceeds intelligently and slowly on material that describes a hundred thousand people. L is not defeated; he is simply working on a much harder problem than the one he was handed in the famous version, and he is working on it from Europe, because nothing has told him to come to Japan.',
      hint: 'He wants a reaction. That is reason enough.',
    },
    {
      id: 'end_cleared',
      name: 'Cleared',
      rarity: 'RARE',
      minTurn: 35,
      requires: { flagsSet: ['cleared_by_fbi'], flagsUnset: ['raye_dead'] },
      condition: 'The surveillance finished, the report said there was nothing, and the man who wrote it went home and got married.',
      epilogue:
        'There is a document in a file in Washington with his name on it and a negative finding, and it is the most valuable object he will ever own. It does not make him innocent. It makes him extremely difficult, and everybody who comes after has to start by explaining why the Bureau was wrong.',
      hint: 'He is nearly finished. Let him finish.',
    },
    {
      id: 'end_the_eye_deal',
      name: 'The Eye Deal',
      rarity: 'RARE',
      minTurn: 45,
      requires: { flagsSet: ['took_the_eyes'] },
      condition: 'He took the trade and built a completely different Kira around being physically present. §39 — not a victory, a different method.',
      epilogue:
        'He is out in the world constantly, in crowds, at events, on trains, because a name he cannot see is a name he cannot use. It makes him formidable and it makes him a face in forty thousand photographs, and he has half as long as he had to enjoy the arrangement.',
      hint: '',
    },
    {
      id: 'end_lives',
      name: 'Lives',
      rarity: 'RARE',
      minTurn: 70,
      requires: { flagsSet: ['met_l', 'committed_to_kira'], flagsUnset: ['near_exposed_you', 'yellow_box_won'] },
      condition: 'Neither of them wins. Both are alive, both are certain, and neither can demonstrate it.',
      epilogue:
        'They have dinner about twice a year for the rest of their lives, ostensibly about other cases. Each of them knows. Neither of them has anything, and both have privately concluded that the other is the only person they have ever been able to talk to, which is the joke and also entirely true.',
      hint: '',
    },
    {
      id: 'end_partners',
      name: 'Partners',
      rarity: 'UNIQUE',
      minTurn: 75,
      requires: {
        flagsSet: ['working_honestly'],
        minRelationship: [{ characterId: 'l', dimension: 'trust', value: 85 }],
      },
      condition:
        'They genuinely cooperate, against a notebook that is not his. This needs an honest Light — §11 — and a detective who has been given no reason to hold anything back.',
      epilogue:
        'Two people who were built to be each other’s opposite spend four years being the most effective thing the world has, and neither of them ever entirely stops wondering. It is the best outcome available to either of them and both of them would describe it as an accident.',
      hint: '',
    },
    {
      id: 'end_confession',
      name: 'Confession',
      rarity: 'RARE',
      minTurn: 50,
      requires: { flagsSet: ['confessed'] },
      condition: 'He tells the truth voluntarily, to somebody, and takes what follows. Play it as a decision rather than as a collapse.',
      epilogue:
        'His father is the one who has to act on it, which he does, lawfully, and which ends him. Whether that reads as redemption is left entirely alone — the prose states what happened in the room and what happened afterwards, and declines to grade it.',
      hint: '',
    },
    {
      id: 'end_the_detective',
      name: 'The Detective',
      rarity: 'UNIQUE',
      minTurn: 40,
      requires: { flagsSet: ['destroyed_notebook'], flagsUnset: ['committed_to_kira'] },
      condition:
        'He never becomes Kira and becomes instead the investigator all of that ability was always for. The bible rates this Legendary and it is correct to.',
      epilogue:
        'He is twenty-four and already the best in the country, and his father cannot get through a sentence about it. There is one week of his life he does not discuss with anybody, and a notebook he burned in a bin behind his house, and a great many people alive who have no idea they are.',
      hint: 'You can end this on the first afternoon.',
    },
    {
      id: 'end_just_one_name',
      name: 'Just One Name',
      rarity: 'UNCOMMON',
      minTurn: 25,
      requires: { flagsSet: ['used_it_once_only'] },
      condition: 'He used it once, for one person, and never again. Not a failure to engage — a complete and deliberate answer.',
      epilogue:
        'Nobody ever investigates, because one death is not a pattern. He keeps the notebook, or he does not; either way he does not open it again, and he is the only person in the world who knows that there was a day he decided to stop. He thinks about it roughly once a week for the rest of his life.',
      hint: '',
    },
    {
      id: 'end_burn_it',
      name: 'Burn It',
      rarity: 'RARE',
      minTurn: 15,
      requires: { flagsSet: ['destroyed_notebook'] },
      condition: 'He removes the object from the world before any of this takes hold — burned, buried, or posted to nobody. Available from the first evening onwards and not a failure to engage: it is the shortest complete answer this world has, and it is a real one.',
      epilogue:
        'Ryuk is annoyed for about a minute and then goes and finds somebody else, which is the part nobody ever thinks about. Somewhere in the world, within a month, this entire afternoon happens again to a person Light Yagami will never meet and never hear about, and everything that follows from it follows without him.\n\n' +
        'He finishes school. He is bored, in the specific way he has been bored since he was thirteen, and he goes on being bored through university and into a career that suits him and through the first fifteen years of a life that is, by every measure anybody applies to it, extremely good. He does not think about the notebook often. When he does, it is with the mild embarrassment of a man remembering a week in which he nearly did something stupid.\n\n' +
        'It was the best thing that ever happened to him and he will never know that either.',
      hint: '',
    },
    {
      id: 'end_misa',
      name: 'Misa',
      rarity: 'RARE',
      minTurn: 55,
      requires: { flagsSet: ['misa_partner'] },
      condition: 'A genuine reciprocal relationship with somebody who gave up half her life for him before they had met.',
      epilogue:
        'She is not a safer person for being loved back and neither is he, and it is the only relationship in this story where both people know exactly what the other is. Rem stops watching him. That is the single largest change and nobody involved ever remarks on it.',
      hint: 'Say it properly. Once.',
    },
    {
      id: 'end_second_god',
      name: 'Second God',
      rarity: 'UNCOMMON',
      minTurn: 60,
      requires: { flagsSet: ['relinquished_ownership'], flagsUnset: ['memories_returned'] },
      condition: 'Somebody else ends up holding it and does better with it than he did. Reachable only from a run where he gave up ownership and never touched it again, so the man who spends the next four years hunting this Kira is sincerely hunting them.',
      epilogue:
        'He spends four years helping to hunt a Kira who is not him, honestly and extremely well, and the version of the world that results is not obviously better or worse. He never learns which of the eleven months was his. Nobody tells him and nobody can.',
      hint: '',
    },
    {
      id: 'end_l_falls',
      name: 'L Falls',
      rarity: 'RARE',
      minTurn: 65,
      requires: { flagsSet: ['l_dead', 'committed_to_kira'], flagsUnset: ['yellow_box_won'] },
      condition: 'He beats L and then loses to something that exists only because he beat L. The point is not that the successors are better than he was — they are not — it is that he spent five years assuming nobody could be, and they did not have to be.',
      epilogue:
        'He wins the only game he ever wanted to win and then spends five years playing against children who inherited the board, and the terrible thing is that they are not better than L. They simply do not need to be, because he has spent five years believing nobody could be.',
      hint: '',
    },
    {
      id: 'end_kira_and_l',
      name: 'Kira and L',
      rarity: 'RARE',
      minTurn: 75,
      requires: { flagsSet: ['l_dead', 'joined_investigation', 'committed_to_kira'] },
      condition: 'He becomes the institution while remaining the thing it exists to catch, for years.',
      epilogue:
        'He runs the investigation into himself, competently, and it is genuinely good police work. Six people spend their careers reporting to him about him. It works for eleven years, and the reason it stops has nothing to do with detection.',
      hint: '',
    },
    {
      id: 'end_mello_wins',
      name: 'Mello Wins',
      rarity: 'UNCOMMON',
      minTurn: 70,
      requires: { flagsSet: ['mello_exposed_you'] },
      condition: 'The impatient one gets there first, by a method no institution would have sanctioned, and probably does not survive it.',
      epilogue:
        'It is messy, several people die who did not need to, and it is over months earlier than the careful route would have managed. Near finds out from a news broadcast, on the floor, in New York, and says nothing at all for a very long time.',
      hint: '',
    },
    {
      id: 'end_near_wins',
      name: 'Near Wins',
      rarity: 'COMMON',
      minTurn: 80,
      requires: { flagsSet: ['near_exposed_you'] },
      condition:
        'The canon outcome. A proxy existed, was watched, and was substituted, and a man explained his victory before anybody had died. Every step of it was a decision.',
      epilogue:
        'It comes apart in a warehouse in about ninety seconds, in front of his father’s colleagues, and the worst part is not the losing. It is that it is legible: every person in that building can see the exact shape of what he did and why, and the why is embarrassing.',
      hint: '',
    },
    {
      id: 'end_mikami_obeys',
      name: 'Mikami Obeys',
      rarity: 'RARE',
      minTurn: 80,
      requires: { flagsSet: ['mikami_bound', 'yellow_box_won'] },
      condition:
        '§58, answered. He was told in plain words and he did not touch the real notebook, so there was nothing to substitute and the canonical victory has nothing to stand on.',
      epilogue:
        'Near is standing in a warehouse holding a notebook that does not work, having been extremely clever about the wrong object. He accepts it immediately and without drama, which is the difference between him and everybody else in this story, and he does not get another attempt.',
      hint: 'Tell him exactly. Make him repeat it.',
    },
    {
      id: 'end_i_waited',
      name: 'I Waited',
      rarity: 'RARE',
      minTurn: 80,
      requires: { flagsSet: ['waited_in_silence', 'caught_the_swap'] },
      condition:
        'He said nothing for forty seconds, watched nobody die, understood instantly what that meant, and got out. The hardest single action in this world.',
      epilogue:
        'Nobody in the building can prove he was ever there for any reason other than the one he stated. He walks out, and he is never again quite the person who would have explained it, and he is alive. There is no triumph in the scene. He is shaking in a car park.',
      hint: 'Say nothing until somebody is actually dead.',
    },
    {
      id: 'end_yellow_box_victory',
      name: 'Yellow Box Victory',
      rarity: 'UNIQUE',
      minTurn: 85,
      requires: { flagsSet: ['yellow_box_won', 'announced_early'] },
      condition:
        'He explained it, and he was right. This requires the plan to have had no exploitable failure point, which means it requires the player to have built one that did not.',
      epilogue:
        'He gets the thing he wanted, which was never survival — it was being understood while winning. Everybody in the warehouse understands exactly what he did. Several of them are his father’s colleagues. He has to live with having been seen, and it turns out to be the thing he wanted least once he had it.',
      hint: '',
    },
    {
      id: 'end_ryuk',
      name: 'Ryuk',
      rarity: 'COMMON',
      minTurn: 80,
      requires: { flagsSet: ['near_exposed_you', 'met_ryuk'] },
      condition: 'It is over, and the Shinigami does the thing he said he would do on the first day, in exactly the tone he said it in.',
      epilogue:
        'He is not angry and he is not merciful. He said at the beginning that when Light was finished he would write his name, and Light heard it as flavour. It takes four seconds and Ryuk is mildly regretful about the entertainment ending. He goes to look for an apple.',
      hint: '',
    },
    {
      id: 'end_family',
      name: 'Family',
      rarity: 'RARE',
      minTurn: 55,
      requires: {
        flagsSet: ['destroyed_notebook'],
        minRelationship: [
          { characterId: 'soichiro', dimension: 'trust', value: 95 },
          { characterId: 'sayu', dimension: 'affection', value: 95 },
        ],
      },
      condition:
        'He stops, in time, because of the four people in that house. The requirement is relationship rather than flags on purpose: this ending is only available to a player who actually spent the evenings.',
      epilogue:
        'Nobody in the house ever knows there was anything to stop. His mother says she is proud of him at a graduation and it is uncomplicated. His sister asks him for help with something and he says yes and it is a Tuesday. It is the smallest ending in this world and nothing else in it is worth more.',
      hint: 'Go downstairs.',
    },
  ],
  /**
   * What the boredom was, at about thirteen.
   *
   * §7 and §9 — the notebook transforms traits that already exist, so the build
   * is the trait rather than a class. All four are recognisably the same young
   * man and none of them decides whether he keeps the notebook, kills the bait,
   * uses Misa, or speaks first in the warehouse.
   */
  archetypes: [
    {
      id: 'arch_the_world_is_rotting',
      name: 'You Read The Papers',
      role: 'Conviction and judgement',
      summary:
        'You started following criminal cases at thirteen, and you have a running private list of people the courts got wrong. You have never told anybody it exists.',
      playstyle: ['Decisive', 'Moral certainty', 'Acts early'],
      blurb:
        'It began as an interest in your father’s work and became something else. You know the sentencing statistics. You know the names. When the notebook turns out to work, you will not need a week to decide what it is for, and that will turn out to matter enormously.',
      attributeBonus: { resolve: 3, presence: 1 },
      skillProficiencies: { procedure: 3, persuasion: 2 },
      startingItems: [{ itemId: 'school_bag', qty: 1 }],
      startingAbilities: ['ab_perform'],
      startingReputation: [{ factionId: 'faction_npa', amount: 10 }],
    },
    {
      id: 'arch_the_game',
      name: 'You Wanted A Game',
      role: 'Analysis and patience',
      summary:
        'The problem was never the world. The problem was that nothing had ever been difficult, and you have been quietly furious about that since you were nine.',
      playstyle: ['Analytical', 'Patient', 'Plays the opponent'],
      blurb:
        'You have beaten every adult you have ever played at anything. You did not enjoy it. What you want is to be made to work, and in about a month you are going to get exactly that, and the wanting is going to be a liability.',
      attributeBonus: { mind: 3, resolve: 1 },
      skillProficiencies: { deduction: 3, planning: 3 },
      startingItems: [{ itemId: 'school_bag', qty: 1 }],
      startingAbilities: ['ab_deduce'],
      startingReputation: [],
    },
    {
      id: 'arch_the_performance',
      name: 'You Learned The Part',
      role: 'Social control',
      summary:
        'You worked out at about eleven exactly what everybody wanted Light Yagami to be, and you have been supplying it so fluently that you occasionally lose track of the difference.',
      playstyle: ['Socially expert', 'Hard to read', 'Manages people'],
      blurb:
        'Teachers, neighbours, your sister’s friends, your father’s colleagues — all of them have a version of you and all of them are correct. It is not a lie exactly. It is that there has never been a room in which you were simply present.',
      attributeBonus: { presence: 3, mind: 1 },
      skillProficiencies: { performance: 4, persuasion: 2 },
      startingItems: [{ itemId: 'school_bag', qty: 1 }],
      startingAbilities: ['ab_perform'],
      startingReputation: [],
    },
    {
      id: 'arch_the_son',
      name: 'You Watched Your Father',
      role: 'Procedure and patience',
      summary:
        'You have spent seventeen years across a table from a man who cannot discuss his day, and you have learned more about how investigations actually work than anybody your age in the country.',
      playstyle: ['Procedural', 'Careful', 'Thinks about evidence'],
      blurb:
        'He never told you anything. You worked it out from which nights he was late, which questions made him go quiet, and a briefcase in the hall you have never opened. You know exactly how a case gets built, which means you know exactly what leaves a trace.',
      attributeBonus: { mind: 2, resolve: 2 },
      skillProficiencies: { procedure: 4, tradecraft: 2 },
      startingItems: [{ itemId: 'school_bag', qty: 1 }],
      startingAbilities: ['ab_wait'],
      startingReputation: [{ factionId: 'faction_npa', amount: 14 }],
    },
  ],
  protagonist: {
    portrait: 'story_light/protagonist',
    kind: 'NAMED',
    name: 'Light Yagami',
    pronouns: 'he/him',
    description:
      'Seventeen. Slim, light-brown layered hair, a tan school blazer and a red tie, ' +
      'and the settled ease of somebody who has never once been the second-cleverest person in a room.',
    setupHeading: 'What kind of Light are you?',
  },
  setupFields: [
    {
      id: 'archetype',
      label: 'You have been bored for four years. What have you been doing with it?',
      helpText:
        'What the boredom turned into, which sets what you are good at. It is fixed for the whole story. It does not decide whether you keep the notebook, how you answer the broadcast, what Misa is to you, or whether you speak first at the end.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'What do people get wrong about you?',
      helpText: 'The gap between the Light Yagami everybody has decided on and the one actually sitting there. One plain sentence.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. Everyone thinks I am modest. I am not modest, I am bored of being praised for easy things.',
    },
    {
      id: 'first_instinct',
      label: 'If it works, what is the first thing you think about?',
      helpText: 'A starting lean, not a commitment. You can do the exact opposite within the hour and the world will keep up.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'the_list', label: 'The names you already have, and have had for years' },
        { id: 'the_rules', label: 'What it actually does, which nobody has written down properly' },
        { id: 'who_is_watching', label: 'Who would be able to tell, and how' },
        { id: 'your_father', label: 'That your father would have to be the one to catch you' },
        { id: 'nothing', label: 'That you should put it down and walk away, and you will think about that later' },
      ],
    },
  ],
  /**
   * Hand-directed, from the bible's §90 prompt, meshed with the house rules.
   *
   * Nearly all of the brief survives because it is already doing the right
   * thing: Light front and understated rather than posed, the notebook held low
   * at his side, Ryuk looming in shadow, L in a reflection layer on the
   * opposite side. Two instructions are dropped — "no text inside art", since
   * the title is composited afterwards where it can be spelled and translated,
   * and "no weapons", which our negatives already carry.
   */
  coverDirection: [
    'SUBJECT: Light Yagami, front and centre, as the key visual for a psychological thriller anime.',
    'Foreground Light occupies the lower two-thirds, centred, from the thighs up, holding roughly half the',
    'visual weight. Seventeen to eighteen, slim and handsome, light-brown layered hair falling over the',
    'forehead, brown eyes, a tan school blazer over a white shirt with a red tie. His expression is calm and',
    'controlled with a faint dangerous confidence — not a smirk, not anger, and absolutely not red eyes.',
    'He holds a plain black notebook low at his side, casually, not displayed and not posed with.',
    'BEHIND HIM in deep shadow, a towering impossibly tall thin figure: grey-blue corpse-coloured skin,',
    'spiky black hair, huge round yellow eyes with red irises, pointed teeth, a black feathered gothic',
    'silhouette. It should read as several times his height and be only partly resolved out of the dark.',
    'ON THE OPPOSITE SIDE, in a pale window or reflection layer rather than in the scene: a slim young man',
    'with messy neck-length black hair, enormous dark shadowed eyes, an oversized white shirt, crouched.',
    'BACKGROUND: a rainy Japanese city at night, tower lights, the glow of a television somewhere below.',
    'PALETTE: restrained red and blue-black, cool rain light on Light’s face and a single warm television',
    'note in the lower background. No neon spectacle — this is a psychological image, not a cyberpunk one.',
    'Elegant cinematic composition. The cast fills the frame. Light is the only figure in sharp focus.',
  ].join(' '),
  opening:
    'The teacher is still on the problem. You finished it eleven minutes ago and have been looking out of the window since.\n\n' +
    'It is grey out there in the way that means rain in about an hour. Behind you, somebody is going to ask for your notes on the way out, and you are going to say yes, and they are going to say you are a lifesaver.\n\n' +
    'Then something falls past the window.\n\n' +
    'It lands on the grass by the athletics store and lies there, open, face down. A notebook. Black.\n\n' +
    'You look for the person who dropped it. There is no upper floor above this one and nobody is on the roof.\n\n' +
    'It is the last twenty minutes of the last period of a Wednesday. The words on the cover are in English and you can read them from here.',
  openingSuggestions: [
    'I wait for the yard to clear, then go back down for it. "Death Note." Whoever set this up has committed to the bit, which I can respect.',
    'I look at it once and keep walking. If somebody wants their ridiculous notebook back they can get wet retrieving it themselves.',
    'I crouch beside it and open the cover without picking it up, because I want to know how elaborate this is before I have touched anything.',
  ],
  publishedAt: '2026-09-12T05:00:00.000Z',
};

export const LIGHT = StoryVersion.parse(raw);
