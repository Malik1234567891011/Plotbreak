import { StoryVersion } from '@plotbreak/contracts';

/**
 * "Ace" — the ten years in which every famous thing was still optional.
 *
 * The bible is 2,799 lines and spans Baterilla to Marineford: a birth, a
 * childhood, a departure, a crew, a fruit, an emperor, a betrayal, a war and a
 * death. A `StoryVersion` holds one clock, one map and one cast, so the first
 * authoring decision was the same one Itachi needed — where does the *playable*
 * world start, and what do the other decades become.
 *
 * Unlike Itachi, the bible answers it directly and I have not argued. §12 and
 * §13 set the opening at Dawn Island with Ace around ten and Luffy refusing to
 * stop following him, and §3 warns that this game "cannot jump directly from
 * 'Ace leaves home' to 'Whitebeard commander'." So the playable span really is
 * the decade, and the map carries Mt. Colubo and the Marineford platform at
 * once, with `discoveredByDefault` doing the work of keeping the second one
 * out of a ten-year-old's reach.
 *
 * The thing that makes a decade authorable here is §135, which is the most
 * useful page in the document: **famous events are pending pressures, not
 * chapters.** So none of them are `worldEvents` on a timestamp. Sabo's
 * departure, the Whitebeard challenge, the Teach pursuit, the execution and the
 * Akainu provocation are all quests with `discoverWhen` predicates, and each
 * one goes inert the moment its prerequisites stop being true. `worldEvents`
 * holds only four things, all of which happen to the island rather than to Ace.
 *
 * §136 — "no destiny correction" — is `closesFlags`. If Sabo lives, the route
 * that needed him dead is shut, not re-armed somewhere else. If Ace listens to
 * Whitebeard, there is no replacement duel. The bible says "break means break"
 * and the only way to mean it in a schema is to close the door in data.
 *
 * Four variables. Fuel is the honest GOOD_HIGH that `resolveRest` refills —
 * and in this world rest is funny as well as load-bearing, because §85 is a
 * man who falls asleep in his dinner. Notoriety is deliberately the first
 * GOOD_LOW in array order: the generic cost path and PUBLIC_VIOLENCE both take
 * that slot, and a pirate whose bounty rises because he was seen fighting in
 * a harbour is exactly the right thing for it to hit. Pride sits third because
 * §9 and §11 make it the mechanism of the tragedy rather than a stat, and it
 * is the only resource in this world that kills you at the top of its range.
 */

const raw = {
  id: 'sv_ace_1',
  storyId: 'story_ace',
  version: 1,
  title: 'Ace',
  fantasyLabel: 'You were born already sentenced.',
  /**
   * Nothing. Correct for this world, and worth saying why.
   *
   * Itachi opens eighty minutes from a meeting his father called. Ace opens in
   * a forest at ten years old with a brother he has not agreed to, and the
   * whole point of §12 is that there is no appointment — the pressure is a
   * small boy who will not go home. Inventing a deadline here would be the one
   * thing the bible explicitly forbids, which is starting the story with Roger.
   */
  openingObligations: [],
  hook: 'You were born carrying the Pirate King’s name, and you get to decide whether that is a curse, a challenge, or nothing at all.',
  premise:
    'You are ten. You live on a mountain with bandits because a Marine hero could not think of anywhere safer to put you, and you are very good at hurting people who deserve it.\n\n' +
    'Somewhere in the world there is a record that says who your father was. People who have heard the rumour say his child should have been drowned at birth. You worked out some years ago that they mean you, and you have never asked anybody to confirm it, because the asking would be the confirming.\n\n' +
    'You have a friend now. Sabo is the first person who chose what he was instead of accepting it, and between you there is a can of money buried under the treehouse that is going to buy a ship.\n\n' +
    'And you have a problem. There is a seven-year-old in a straw hat who has been following you for eleven days. He cannot fight, he cannot lie, he cannot take a hint, and he will not stop, and at some point you are going to have to decide what he is to you.\n\n' +
    'Everything famous is still ahead of you and none of it is owed.\n\n' +
    'You only have to decide whether it was good that you were born, and you will not get to do that by thinking about it.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Brotherhood', 'Adventure', 'Found family', 'Coming of age', 'Tragedy'],
  mechanicsChips: [
    'Sabo does not have to die',
    'You can refuse the fruit',
    'Pride is the thing that kills you',
    'Nothing famous is scheduled',
    'You can be talked out of it',
  ],
  contentDescriptors: [
    'FANTASY_VIOLENCE',
    'PERMANENT_DEATH',
    'MORAL_AMBIGUITY',
    'LANGUAGE',
    'ALCOHOL_REFERENCES',
  ],
  intensity: 'INTENSE',
  creatorNote:
    'The famous version of this life ends on a platform with an admiral saying the wrong name at the right moment. This one does not have to. Keep Sabo alive, leave home with your brothers instead of ahead of them, put the fruit in somebody else’s hand, let Whitebeard talk you out of the chase, or hear Akainu out and keep walking. Every one of those is a real destination. The hardest of them is the last, and it is hard for reasons that have nothing to do with difficulty.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: true,
    allowsRomance: false,
    startingLocationId: 'mt_colubo',
    // Mid-morning in the forest. §13 wants light, motion and a boy covered in
    // dirt shouting uphill, none of which works at dusk.
    startWorldMinute: 9 * 60 + 40,
    startingItems: [
      { itemId: 'lead_pipe', qty: 1 },
      { itemId: 'ship_fund', qty: 1 },
    ],
    hardCanon: [
      'The player is Portgas D. Ace, ten years old at story start, raised on Dawn Island by the mountain bandit Curly Dadan at Monkey D. Garp’s insistence.',
      'Gol D. Roger is his biological father and Portgas D. Rouge his mother. Rouge carried him twenty months to hide him from the World Government and died after giving birth. Ace knows the rumour about Roger’s child and has never had it confirmed.',
      'Ace does not begin the story knowing details about Rouge. What he learns about her comes from Garp, from records, or from somebody who was there — never from the narrator deciding he remembers.',
      'Sabo is alive, roughly Ace’s age, noble-born and in flight from it, and is the first person Ace has met who chose his own identity over the one he inherited. Nothing about his death at sea is fixed.',
      'Luffy is seven, has the straw hat, cannot be discouraged, and idolises Ace within days of meeting him. Whether he becomes Ace’s brother is decided in play.',
      'Garp carries a promise made to Roger and wants Ace alive and far away from Roger’s inheritance. He is sincere about this and extremely bad at saying it.',
      'Marshall D. Teach sails under Whitebeard, is patient, and will wait years for the right opportunity. His betrayal is a thing he would do given the chance, not a thing scheduled to happen.',
      'Edward Newgate is enormous — over six metres — and Ace must look small beside him. He believes a family is something you choose and then refuse to abandon, which is the direct answer to the question Ace has been carrying since he was eight.',
      'Ace’s pride is the mechanism of the famous ending. He is excellent at dying for people and bad at letting people die for him, and no scene should resolve that for him.',
      'Nothing downstream of Dawn Island is owed. Not the sake cups, not Sabo’s death, not piracy, not the Mera Mera no Mi, not Whitebeard, not Banaro, not the platform. If the player prevents one, nothing equivalent is invented to replace it.',
    ],
    toneGuide:
      'Energetic anime adventure, and explicitly not Itachi’s register. No dusk, no symbolism, no quiet literary interiority as the default mode. Write motion, sea, heat, hunger, shouting, laughter, and bodies that do absurd things. ' +
      'This world has to hold a man falling asleep face-down in his soup and a man asking whether it was good that he was born, in the same hour, without apologising for either. If a scene has gone solemn for three beats, something loud is overdue. ' +
      'Ace is proud, quick to anger when family is insulted, weirdly polite with strangers, and funny. He is not a cool fire guy. Luffy is not written as a genius — his intelligence is emotional certainty and fighting instinct, and he is a terrible liar. Dadan complains at volume and then runs into danger. ' +
      'Emotional scenes are allowed to slow all the way down, and the good ones are short. Fights are readable: heat distortion, what fire cannot do, where the sea is, who is between whom. Never narrate a five-day battle turn by turn — key exchanges, exhaustion, respect. ' +
      'Do not reproduce manga dialogue. The famous lines are famous; write what they meant in this world’s own words.',
    forkCostCredits: 120,
    loop: null,
  },
  /**
   * A wiry ten-year-old with a decade of headroom.
   *
   * `arcana` is 4 and that is the interesting number: Ace begins with no Devil
   * Fruit, no Haki and no reason to have either, so the stat that governs the
   * thing he is most famous for starts nearly empty. §46 says a run where he
   * never eats the fruit is a legitimate major AU, which only stays true if the
   * build does not quietly assume he will.
   */
  attributes: { might: 11, agility: 15, mind: 10, presence: 13, resolve: 18, arcana: 4 },
  skills: [
    {
      id: 'pipe',
      name: 'Pipe',
      attribute: 'agility',
      description: 'A length of lead pipe swung by somebody who has never had a lesson and has had four hundred fights.',
    },
    {
      id: 'brawl',
      name: 'Brawling',
      attribute: 'might',
      description: 'Close, ugly and committed. No stance, no forms, and an unusually high tolerance for being hit on the way in.',
    },
    {
      id: 'endure',
      name: 'Endurance',
      attribute: 'resolve',
      description: 'Still standing after the point where standing stopped being sensible. The thing he is actually best at, at ten and at twenty.',
    },
    {
      id: 'provoke',
      name: 'Provocation',
      attribute: 'presence',
      description: 'Making somebody bigger than you swing first. Useful, and the beginning of every serious problem he will ever have.',
    },
    {
      id: 'forage',
      name: 'Living Rough',
      attribute: 'mind',
      description: 'Hunting a mountain, reading weather off a ridge, and cooking something that has recently been alive.',
    },
    {
      id: 'seamanship',
      name: 'Seamanship',
      attribute: 'mind',
      description: 'Currents, log poses, rigging, and the difference between a sea that is rough and a sea that is about to be a problem.',
    },
    {
      id: 'command',
      name: 'Command',
      attribute: 'presence',
      description: 'Getting people to follow you somewhere stupid, and — much harder, much later — getting them to stay behind.',
    },
    {
      id: 'fire',
      name: 'Fire',
      attribute: 'arcana',
      description: 'Logia control: what to burn, what to become, and how not to cook the people standing near you. Useless until there is a fruit in him.',
    },
    {
      id: 'haki',
      name: 'Haki',
      attribute: 'arcana',
      description: 'Will made physical. Nobody on Dawn Island can teach it and nobody there will admit it exists.',
    },
  ],
  /**
   * Four, all invisible.
   *
   * Fuel is the GOOD_HIGH that rest refills, and it is the only one of these
   * the player will ever see a joke about — §85 is a man who falls asleep
   * mid-sentence, which in this schema is what the bottom band of a stamina
   * resource looks like from outside.
   *
   * Notoriety is first among the GOOD_LOWs on purpose. The generic cost path
   * and PUBLIC_VIOLENCE both take the first GOOD_LOW in array order, and in a
   * world about a pirate the correct consequence of being seen fighting in a
   * harbour is that more of the world knows where you are.
   *
   * Pride is the only resource here whose top band is fatal, and it is not a
   * flaw meter — high Pride is what makes him worth following. §11 is the whole
   * design: he is superb at spending himself for other people and cannot accept
   * it spent on him, and Marineford is that sentence arriving with a deadline.
   *
   * Worth is the question from §10, kept as a number he cannot see. It rises
   * from evidence rather than from reassurance, which is why nothing anybody
   * *says* moves it much and a person standing between him and something does.
   */
  resources: [
    {
      id: 'fuel',
      name: 'Fuel',
      max: 100,
      start: 82,
      regenPerHour: 3,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'He is asleep. Not resting — asleep, mid-sentence, somewhere inconvenient, and whoever is with him has to decide whether to carry him or let the situation happen around him. On this island that is a joke. On a battlefield it is not.',
      color: '#E8873A',
      bands: [
        {
          upTo: 20,
          behaviour:
            'Running on the last of it and lying about it. He drops off between sentences and wakes furious about having dropped off. Fights get short because he cannot afford a long one, which means they get decided by whoever swings first, which is usually him. Eating and sleeping are genuinely the strongest available moves and he will resent being told so.',
        },
        {
          upTo: 55,
          behaviour:
            'Ordinary hungry tiredness, the kind ten-year-olds and twenty-year-olds both carry constantly. Good for one more climb and honest about not wanting two. Still funny, still fast, no longer patient — and impatience in this world is how he ends up committed to things.',
        },
        {
          upTo: 100,
          behaviour:
            'All of it available. He can go up a mountain, take a beating, laugh about it, and still have enough left to sit on a roof afterwards and say something true. Long scenes work here, and the ones where he is actually funny happen almost entirely in this band.',
        },
      ],
    },
    {
      id: 'notoriety',
      name: 'Notoriety',
      max: 100,
      start: 3,
      regenPerHour: -0.15,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'Nobody outside this island has any idea he exists, which at ten is simply the truth and later is an achievement. No bounty, no poster, no Marine with a reason to look twice. Whoever he becomes, he gets to become it unobserved.',
      color: '#9A3C34',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Local trouble. Known to the Goa garrison as a mountain brat and to Gray Terminal as somebody not to rob. Nothing has left Dawn Island. He can walk into a town and be nobody, which is a freedom he will not notice having until it is gone.',
        },
        {
          upTo: 55,
          behaviour:
            'There is paper on him. A number, a bad likeness, and a name in an office somewhere that files things. Harbours change when he enters them. Crews take him seriously slightly faster than his record deserves, which is convenient and is also how people start believing their own poster.',
        },
        {
          upTo: 80,
          behaviour:
            'The world has decided what he is. Marines plan for him specifically, rivals seek him out to use him as a measurement, and the number on the page has stopped describing his strength and started describing his inconvenience. Ordinary movement now requires either a fight or a lie.',
        },
        {
          upTo: 100,
          behaviour:
            'He is an instrument of somebody else’s politics. His name is useful to the World Government as a demonstration, to pirates as a recruiting argument, and to the press as a shape. Anything he does in public is read as a statement by people who have never met him, and there is no version of walking into a town quietly any more.',
        },
      ],
    },
    {
      id: 'pride',
      name: 'Pride',
      max: 100,
      start: 58,
      regenPerHour: 0,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'Something has gone out of him. He lets things go, accepts help without arguing, walks away from insults, and the people who love him find it more frightening than the temper ever was. Dadan says so out loud. Luffy asks if he is sick.',
      color: '#C7472E',
      bands: [
        {
          upTo: 30,
          behaviour:
            'He can be talked out of things, which is the rarest state in this world. Advice lands. Retreat is available without a speech. He will let somebody else take the last hit of a fight and not treat it as an accusation. Scenes here can end with a decision he did not make alone.',
        },
        {
          upTo: 62,
          behaviour:
            'The working default. Fierce about family, casual about himself, quick to swing when somebody insults the people he has chosen and genuinely surprised afterwards that it escalated. He hears warnings and weighs them, and he weighs them against what refusing would look like.',
        },
        {
          upTo: 85,
          behaviour:
            'Refusal has started to cost more than danger. An insult aimed at Whitebeard, Luffy, Sabo or the crew gets answered, and being told to stand down registers as being told he is not enough. He goes alone not because he wants to but because asking for help is now a sentence he cannot get out of his mouth.',
        },
        {
          upTo: 100,
          behaviour:
            'He will die rather than be seen to be carried, and he will call that loyalty. Everything anyone does for him becomes a debt he has to discharge immediately and preferably fatally. This is the band in which a man who has just been rescued by a thousand people turns around because one stranger said the wrong name, and the terrible thing about it is that from inside it feels exactly like love.',
        },
      ],
    },
    {
      id: 'worth',
      name: 'Worth',
      max: 100,
      start: 22,
      regenPerHour: 0,
      polarity: 'GOOD_HIGH',
      displayPriority: 4,
      visible: false,
      zeroStateConsequence:
        'He has concluded it was not good that he was born, and he is calm about it. That calm is the single most dangerous state in this story: he stops defending himself in ways nobody notices, takes the worse job, stands in the wrong place, and none of it reads as despair from outside.',
      color: '#D7B45C',
      bands: [
        {
          upTo: 25,
          behaviour:
            'The rumour is the only answer he has. He is looking for evidence and reads everything as confirmation — Garp’s awkwardness, Dadan’s complaining, Luffy’s persistence all get filed as pity or obligation. Kindness has to be shown rather than stated, because a stated one gets discounted on arrival.',
        },
        {
          upTo: 60,
          behaviour:
            'Evidence is accumulating and he distrusts it. He has people who chose him, and he can acknowledge that out loud on a good day and then spend a week testing whether they meant it. He will still put himself in front of anybody. He is just no longer completely sure that is arithmetic.',
        },
        {
          upTo: 100,
          behaviour:
            'He believes it, mostly, and can say so without turning it into a joke. This is the band where being saved is survivable — where a thousand people arriving for him reads as an answer rather than a debt, and where somebody telling him to run has a chance of being obeyed.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'lead_pipe',
      name: 'The Pipe',
      tags: ['weapon', 'childhood'],
      stackable: false,
      maxStack: 1,
      equipSlot: 'hand',
      attributeModifiers: {},
      skillModifiers: { pipe: 2 },
      questItem: false,
      droppable: true,
      rarity: 'common',
      description: 'A metre of scavenged lead pipe, bent slightly about a third of the way along from something it hit once.',
      loreText:
        'Every child on this island who intends to survive it carries one of these. Sabo has one. Luffy will turn up with one within a week of being allowed to. There is nothing special about it at all, which is why it is the weapon he is still most comfortable holding at twenty.',
      icon: null,
    },
    {
      id: 'ship_fund',
      name: 'The Can',
      tags: ['quest', 'childhood'],
      stackable: false,
      maxStack: 1,
      equipSlot: null,
      attributeModifiers: {},
      skillModifiers: {},
      questItem: true,
      droppable: false,
      rarity: null,
      description: 'A biscuit tin, buried, containing five million berries in notes that have been counted more often than they have been added to.',
      loreText:
        'The plan is a ship. Not a specific ship — a ship. Sabo did the arithmetic on what one costs and neither of them has questioned the figure since, because questioning it would mean admitting neither of them knows. It is the first thing in Ace’s life that belongs to more than one person, and if Luffy is ever told where it is buried, that means something that no conversation could.',
      icon: null,
    },
    {
      id: 'sake_cups',
      name: 'Three Cups',
      tags: ['quest', 'brotherhood'],
      stackable: false,
      maxStack: 1,
      equipSlot: null,
      attributeModifiers: {},
      skillModifiers: {},
      questItem: true,
      droppable: true,
      rarity: 'rare',
      description: 'Three chipped cups from Dadan’s shelf, and a bottle nobody asked permission for.',
      loreText:
        'The famous version of this exists because three boys decided it should, in a treehouse, without an adult present. §24 is emphatic that it happens only if the relationship earns it — a ceremony performed because the story expected one is worth nothing, and a player who never reaches it has not missed content, they have a different family.',
      icon: null,
    },
    {
      id: 'mera_mera',
      name: 'The Mera Mera no Mi',
      tags: ['quest', 'devil_fruit'],
      stackable: false,
      maxStack: 1,
      equipSlot: null,
      attributeModifiers: {},
      skillModifiers: {},
      questItem: true,
      droppable: true,
      rarity: 'unique',
      description: 'A spiralled orange fruit with flame-shaped whorls, sitting in a crate that has been at sea longer than it should have been.',
      loreText:
        'Eat it and you are fire and cannot swim. Give it to Deuce and he is, and your crew is built differently. Sell it and you have bought a ship, a reputation and a very persistent set of enemies. Leave it in the crate and Fire Fist Ace never exists — §46 calls that a legitimate major AU, and the world is expected to adapt rather than contrive a second fruit.',
      icon: null,
    },
    {
      id: 'orange_hat',
      name: 'The Orange Hat',
      tags: ['identity', 'signature'],
      stackable: false,
      maxStack: 1,
      equipSlot: 'head',
      attributeModifiers: { presence: 1 },
      skillModifiers: {},
      questItem: false,
      droppable: true,
      rarity: 'rare',
      description: 'A wide orange hat with a red bead band and two blue badges pinned to the front — one smiling, one frowning.',
      loreText:
        'He buys it himself, somewhere between leaving home and the New World, for reasons he would struggle to explain. The two faces are the joke and also the whole man: the one that laughs at everything and the one that has already decided how this ends, worn at the same time, on the same head, where everyone can see them.',
      icon: null,
    },
    {
      id: 'green_dagger',
      name: 'Green-Sheathed Dagger',
      tags: ['weapon'],
      stackable: false,
      maxStack: 1,
      equipSlot: 'belt',
      attributeModifiers: {},
      skillModifiers: { brawl: 1 },
      questItem: false,
      droppable: true,
      rarity: 'common',
      description: 'A short knife in a green sheath, worn at the hip and almost never drawn.',
      loreText:
        'A man who can set the air on fire does not need a knife, which is exactly why he keeps one. It is for rope, crates, fish and the specific situation in which fire would kill everybody in the room including the person he came to get.',
      icon: null,
    },
    {
      id: 'vivre_card',
      name: 'Vivre Card',
      tags: ['quest', 'bond'],
      stackable: true,
      maxStack: 3,
      equipSlot: null,
      attributeModifiers: {},
      skillModifiers: {},
      questItem: true,
      droppable: true,
      rarity: 'rare',
      description: 'A scrap of paper that leans towards the person it came from, and burns down as they do.',
      loreText:
        'Handing one to somebody is the least sentimental way this world has of saying you intend to see them again. It is also a status readout on a life you care about, which is a crueller object than it first appears: the person holding yours finds out you are in trouble before you have finished getting into it.',
      icon: null,
    },
    {
      id: 'deuce_log',
      name: 'Deuce’s Log',
      tags: ['quest', 'record'],
      stackable: false,
      maxStack: 1,
      equipSlot: null,
      attributeModifiers: {},
      skillModifiers: { seamanship: 2 },
      questItem: false,
      droppable: true,
      rarity: 'uncommon',
      description: 'A hardbacked notebook kept in a small, aggressively legible hand, with dates.',
      loreText:
        'Deuce writes down what actually happened, which turns out to be the single rarest service anybody performs for Ace in his life. Everyone else who records him is building a legend or a case file. §43 is the point: Deuce knew him before the legend, and the book is the only copy of that man.',
      icon: null,
    },
    {
      id: 'whitebeard_mark',
      name: 'The Mark',
      tags: ['identity', 'faction'],
      stackable: false,
      maxStack: 1,
      equipSlot: null,
      attributeModifiers: { resolve: 2 },
      skillModifiers: {},
      questItem: true,
      droppable: false,
      rarity: 'unique',
      description: 'The Whitebeard flag, across the whole of his back, done in one sitting by somebody who has done it two hundred times.',
      loreText:
        'You do not earn this and you are not given it. You accept it, which is the harder verb, and it goes somewhere you cannot see and cannot cover. Newgate’s entire position is that family is chosen and then not abandoned; the mark is that sentence made permanent on a boy who has spent ten years assuming he was a mistake.',
      icon: null,
    },
    {
      id: 'roger_record',
      name: 'The Record',
      tags: ['quest', 'secret'],
      stackable: false,
      maxStack: 1,
      equipSlot: null,
      attributeModifiers: {},
      skillModifiers: {},
      questItem: true,
      droppable: true,
      rarity: 'unique',
      description: 'A Marine file, heavily redacted, with a birth in South Blue and two names on it.',
      loreText:
        'Confirmation, which he has spent his life not asking for. §33 is strict about this: what he knows about Rouge comes from Garp, from paper, or from somebody who was in the room — never from the narrator granting him a memory. Twenty months is in here. He will not know what to do with twenty months.',
      icon: null,
    },
    {
      id: 'seastone_cuffs',
      name: 'Seastone',
      tags: ['quest', 'restraint'],
      stackable: false,
      maxStack: 1,
      equipSlot: null,
      attributeModifiers: { might: -6, agility: -4, arcana: -4 },
      skillModifiers: { fire: -5 },
      questItem: true,
      droppable: false,
      rarity: 'unique',
      description: 'Pale cuffs that weigh more than they should and make the sea feel closer than it is.',
      loreText:
        'It does not suppress the fruit so much as remind the body that the sea exists and is under everything. A Logia in seastone is an ordinary tired man with a famous name, which is precisely the condition the World Government wants him displayed in.',
      icon: null,
    },
  ],
  /**
   * Six of these nine need something the player may never acquire.
   *
   * §46 is the constraint that shapes this list: a run where Ace never eats the
   * fruit has to be playable, not merely permitted. So the four fire abilities
   * all require the fruit, `unlockedByDefault` is false on every one of them,
   * and the three a ten-year-old starts with are enough to fight a whole
   * childhood with. Haki arrives late and from a person, never from a level.
   */
  abilities: [
    {
      id: 'ab_pipe_rush',
      name: 'Straight At Him',
      tags: ['melee', 'childhood'],
      description: 'Close the distance faster than is sensible and hit the largest available target first. It works far more often than it should, mostly because nobody expects a child to commit.',
      affordances: ['open a fight', 'break a line', 'reach somebody behind somebody'],
      costs: [{ resourceId: 'fuel', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'ab_take_it',
      name: 'Take It',
      tags: ['defence', 'childhood'],
      description: 'Let the hit land, keep the feet, and be standing there afterwards with an expression that makes the other person reconsider their whole afternoon.',
      affordances: ['absorb a hit', 'refuse to go down', 'end a fight without winning it'],
      costs: [{ resourceId: 'fuel', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'ab_swing_first',
      name: 'Say That Again',
      tags: ['social', 'pride'],
      description: 'Make somebody bigger, older and better armed throw the first punch, in front of witnesses, about something they said. Enormously effective and the origin of every serious problem in this life.',
      affordances: ['provoke a swing', 'shift blame for a fight', 'make an enemy commit early'],
      costs: [
        { resourceId: 'pride', amount: -4 },
        { resourceId: 'notoriety', amount: 3 },
      ],
      cooldownMinutes: 30,
      targetRule: 'SINGLE',
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'ab_fire_fist',
      name: 'Fire Fist',
      tags: ['fire', 'signature'],
      description: 'A punch that arrives as a column of flame and keeps going. The thing his name is made of, and never once used indoors without consequences.',
      affordances: ['destroy a formation', 'reach something far away', 'end a fight in one exchange'],
      costs: [{ resourceId: 'fuel', amount: 22 }],
      cooldownMinutes: 5,
      targetRule: 'AREA',
      unlockedByDefault: false,
      requires: { flagsSet: ['ate_mera_mera'] },
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'ab_logia',
      name: 'Nothing To Hit',
      tags: ['fire', 'defence'],
      description: 'Become the fire. Blades and bullets pass through a man who has stopped being solid, which is unanswerable until somebody brings the sea, a Haki user, or a hostage.',
      affordances: ['ignore a physical attack', 'pass through a barrier', 'walk out of a closed room'],
      costs: [{ resourceId: 'fuel', amount: 14 }],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      unlockedByDefault: false,
      requires: { flagsSet: ['ate_mera_mera'] },
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'ab_banked_fire',
      name: 'Bank It',
      tags: ['fire', 'control'],
      description: 'Hold the fire down to something that warms a room, dries a crew, lights a deck, and does not kill anybody standing near him. Much harder than the column, and the reason people let him on a wooden ship.',
      affordances: ['help without destroying', 'light a dark place', 'keep somebody alive through a cold night'],
      costs: [{ resourceId: 'fuel', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'AREA',
      unlockedByDefault: false,
      requires: { flagsSet: ['ate_mera_mera'] },
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'ab_entei',
      name: 'Everything At Once',
      tags: ['fire', 'desperate'],
      description: 'All of it, upward, with nothing held back and nothing left afterwards. Settles the question of who was stronger and leaves him unable to stand.',
      affordances: ['break a siege', 'answer something enormous', 'spend the whole of yourself'],
      costs: [
        { resourceId: 'fuel', amount: 70 },
        { resourceId: 'notoriety', amount: 12 },
      ],
      cooldownMinutes: 720,
      targetRule: 'AREA',
      unlockedByDefault: false,
      requires: { flagsSet: ['ate_mera_mera'] },
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'ab_haki_armament',
      name: 'Will In The Hands',
      tags: ['haki'],
      description: 'Make the fists count against people the fire cannot touch. Learned from somebody who decided he was worth teaching, which is the part that matters.',
      affordances: ['hit a Logia', 'hurt something armoured', 'be taken seriously by a commander'],
      costs: [{ resourceId: 'fuel', amount: 16 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      unlockedByDefault: false,
      requires: { flagsSet: ['learned_haki'] },
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'ab_stand_between',
      name: 'Stand Between',
      tags: ['pride', 'signature'],
      description: 'Put himself physically in the path of something aimed at somebody else. He is superb at this and it costs him nothing he values, which is exactly the problem §11 describes.',
      affordances: ['take a hit meant for someone else', 'buy somebody a second', 'end an argument about who matters'],
      costs: [
        { resourceId: 'fuel', amount: 18 },
        { resourceId: 'pride', amount: 5 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
  ],
  /**
   * Seventeen places across a decade, and only five of them reachable by a
   * ten-year-old.
   *
   * Straight from §147, with connections that encode the shape of the life:
   * Dawn Island is a closed loop you can walk, Sixis has one way in and one way
   * out, and Marineford connects to nothing except the cell that fed it. That
   * last one is deliberate — the platform is not a place you travel to.
   */
  locations: [
    {
      id: 'mt_colubo',
      name: 'Mount Colubo',
      shortName: 'The Mountain',
      description:
        'Forest steep enough that the paths are really just the places where fewer things grow. Tigers bigger than the bandits, a river with a waterfall nobody has measured, and every tree within an hour of Dadan’s house has been climbed and named by two boys who are not admitting they named them.',
      artDirection:
        'Bright dense green, hard tropical daylight through canopy, absurdly large tree trunks in One Piece proportions. Hot and loud rather than mysterious — this is a playground with teeth, not a haunted wood.',
      stageImage: null,
      connections: [
        { to: 'dadan_house', travelMinutes: 25, lockedByFlag: null, label: 'Down to the house' },
        { to: 'asl_treehouse', travelMinutes: 15, lockedByFlag: null, label: 'Over to the treehouse' },
        { to: 'gray_terminal', travelMinutes: 70, lockedByFlag: null, label: 'Down the long way, to the Terminal' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 12, y: 20 },
      ambientSfx: ['cicadas', 'wind in canopy', 'something large moving'],
      takeableItems: [],
    },
    {
      id: 'dadan_house',
      name: 'The Dadan Family House',
      shortName: 'Dadan’s',
      description:
        'A long timber house that smells of smoke, drying meat and cheap alcohol, with nine adults in it who all complain constantly about the two children they would die for. There is a hole in the roof that has been about to be fixed for three years.',
      artDirection:
        'Chaotic warm interior, hanging game, mismatched furniture, cigarette haze. Comedy staging: everything overcrowded, nothing matching, one enormous woman occupying a third of any frame she is in.',
      stageImage: null,
      connections: [
        { to: 'mt_colubo', travelMinutes: 25, lockedByFlag: null, label: 'Up the mountain' },
        { to: 'gray_terminal', travelMinutes: 55, lockedByFlag: null, label: 'Down to the Terminal' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 20, y: 30 },
      ambientSfx: ['men arguing', 'fire crackle', 'pots'],
      takeableItems: [{ itemId: 'sake_cups', qty: 1, ownerId: null, aka: ['the cups', 'sake', 'a bottle', 'three cups'] }],
    },
    {
      id: 'asl_treehouse',
      name: 'The Treehouse',
      shortName: 'Treehouse',
      description:
        'Planks, rope and stubbornness, forty feet up, built by two people who were not going to ask for help. The can is buried at the base under a flat stone that looks accidental and is not.',
      artDirection:
        'Golden late-afternoon light through leaves, rough handmade construction, a view of the sea between trunks. This is the safest place in the world and should be lit like it.',
      stageImage: null,
      connections: [
        { to: 'mt_colubo', travelMinutes: 15, lockedByFlag: null, label: 'Back into the forest' },
        { to: 'dawn_shore', travelMinutes: 45, lockedByFlag: null, label: 'Down to the water' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 8, y: 34 },
      ambientSfx: ['creaking rope', 'distant surf', 'leaves'],
      takeableItems: [{ itemId: 'ship_fund', qty: 1, ownerId: null, aka: ['the can', 'the money', 'the tin', 'our money'] }],
    },
    {
      id: 'gray_terminal',
      name: 'Gray Terminal',
      shortName: 'The Terminal',
      description:
        'The city’s rubbish, piled into a country. People live in it, in structures made of what the people above them threw away, and the wall between them and High Town is the most honest object on Dawn Island.',
      artDirection:
        'Vast junk landscape under grey-brown haze, towers of refuse, smoke columns, the white wall of High Town clean and inhuman in the background. Ugly and enormous. No romanticised squalor.',
      stageImage: null,
      connections: [
        { to: 'dadan_house', travelMinutes: 55, lockedByFlag: null, label: 'Back up to Dadan’s' },
        { to: 'mt_colubo', travelMinutes: 70, lockedByFlag: null, label: 'Back up the mountain' },
        { to: 'goa_high_town', travelMinutes: 30, lockedByFlag: null, label: 'Through the gate, into High Town' },
        { to: 'dawn_shore', travelMinutes: 40, lockedByFlag: null, label: 'Out to the shore' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 38, y: 44 },
      ambientSfx: ['distant shouting', 'crows', 'tin sheeting'],
      takeableItems: [],
    },
    {
      id: 'goa_high_town',
      name: 'High Town, Goa',
      shortName: 'High Town',
      description:
        'Clean streets, painted shutters, and residents who have arranged their entire lives around not seeing the thing on the other side of their wall. Sabo grew up in one of these houses and will not say which.',
      artDirection:
        'Bright pastel colonial architecture, swept cobbles, absurdly ornate noble dress. Lit flatly and prettily, which should read as sinister next to the Terminal rather than as relief.',
      stageImage: null,
      connections: [
        { to: 'gray_terminal', travelMinutes: 30, lockedByFlag: null, label: 'Back out through the gate' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 26, y: 58 },
      ambientSfx: ['surf', 'rigging', 'gulls'],
      takeableItems: [],
    },
    {
      id: 'dawn_shore',
      name: 'Dawn Island Shore',
      shortName: 'The Shore',
      description:
        'Grey sand, a rickety jetty, and the horizon that the two of you have been describing to each other for two years without either of you having seen anything on it. Every departure in this story happens from here.',
      artDirection:
        'Wide open sky, hard sunlight on water, small boats. Compose for distance and departure — a lot of frame given to sea and none to anything comforting.',
      stageImage: null,
      connections: [
        { to: 'asl_treehouse', travelMinutes: 45, lockedByFlag: null, label: 'Up to the treehouse' },
        { to: 'gray_terminal', travelMinutes: 40, lockedByFlag: null, label: 'Along to the Terminal' },
        { to: 'sixis', travelMinutes: 4320, lockedByFlag: 'left_dawn_island', label: 'Out. East, and keep going' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 26, y: 58 },
      ambientSfx: ['surf', 'rigging', 'gulls'],
      takeableItems: [],
    },
    {
      id: 'sixis',
      name: 'Sixis',
      shortName: 'Sixis',
      description:
        'A deserted island at the ragged edge of the East Blue, with fresh water, no people, and one other man who is also pretending he meant to be here. This is where a boy who left alone finds out he is not going to manage alone.',
      artDirection:
        'Empty beach and scrub, wrecked hull, one shelter. Bright and lonely rather than desolate — the comedy of two survivors refusing to admit they need each other has to be possible in this light.',
      stageImage: null,
      connections: [
        { to: 'dawn_shore', travelMinutes: 4320, lockedByFlag: null, label: 'Home, if there is a boat' },
        { to: 'spade_ship', travelMinutes: 60, lockedByFlag: 'spade_pirates_formed', label: 'Aboard the Spade' },
      ],
      discoveredByDefault: false,
      mapPosition: { x: 46, y: 70 },
      ambientSfx: ['surf', 'insects', 'one man muttering'],
      takeableItems: [{ itemId: 'mera_mera', qty: 1, ownerId: null, aka: ['the fruit', 'the crate', 'that fruit', 'devil fruit'] }],
    },
    {
      id: 'spade_ship',
      name: 'The Spade',
      shortName: 'The Spade',
      description:
        'A ship bought, stolen or won depending on how it went, crewed by people who chose a captain younger than most of them. Cramped, loud, and the first thing in Ace’s life that was his because people handed it to him.',
      artDirection:
        'Mid-size pirate vessel, spade insignia, washing strung between rigging, crew visibly comfortable. Warm and busy. This is a home, not a warship.',
      stageImage: null,
      connections: [
        { to: 'sixis', travelMinutes: 60, lockedByFlag: null, label: 'Back to the island' },
        { to: 'grand_line_port', travelMinutes: 2880, lockedByFlag: null, label: 'Make for the Grand Line' },
      ],
      discoveredByDefault: false,
      mapPosition: { x: 58, y: 74 },
      ambientSfx: ['creaking timber', 'crew laughing', 'water on hull'],
      takeableItems: [{ itemId: 'deuce_log', qty: 1, ownerId: null, aka: ['the log', 'his book', 'the notebook', 'the record'] }],
    },
    {
      id: 'grand_line_port',
      name: 'Grand Line Port',
      shortName: 'Port',
      description:
        'Any of forty towns that all work the same way: a harbour full of flags nobody asks about, a bounty board, a bar where the wrong three sentences start something, and a Marine office pretending not to keep a list.',
      artDirection:
        'Dense harbour town, impossible architecture, flags, crowds, market colour. Loud and crowded, every frame full of people with their own business.',
      stageImage: null,
      connections: [
        { to: 'spade_ship', travelMinutes: 2880, lockedByFlag: null, label: 'Back aboard' },
        { to: 'moby_dick_deck', travelMinutes: 5760, lockedByFlag: 'found_whitebeard', label: 'Find the Moby Dick' },
        { to: 'alabasta', travelMinutes: 4320, lockedByFlag: 'whitebeard_commander', label: 'West, to the desert kingdom' },
        { to: 'alabasta', travelMinutes: 4320, lockedByFlag: 'whitebeard_commander', label: 'West, to the desert kingdom' },
        { to: 'banaro', travelMinutes: 2880, lockedByFlag: 'teach_deserted', label: 'After him, to Banaro' },
      ],
      discoveredByDefault: false,
      mapPosition: { x: 68, y: 62 },
      ambientSfx: ['crowd', 'gulls', 'ship bells'],
      takeableItems: [],
    },
    {
      id: 'moby_dick_deck',
      name: 'The Moby Dick — Deck',
      shortName: 'Moby Dick',
      description:
        'A whale-headed ship the size of a district, with an old man in a chair at the centre of it who is bigger than the chair should allow. Sixteen divisions live here and all of them call him the same thing.',
      artDirection:
        'Gigantic vessel, whale figurehead, white sails with the Whitebeard mark. Scale is the point: Whitebeard’s chair dwarfs a man, and Ace must read as small in any frame containing Newgate.',
      stageImage: null,
      connections: [
        { to: 'grand_line_port', travelMinutes: 5760, lockedByFlag: null, label: 'Ashore' },
        { to: 'moby_dick_mess', travelMinutes: 3, lockedByFlag: null, label: 'Below, to the mess' },
        { to: 'whitebeard_medical', travelMinutes: 5, lockedByFlag: null, label: 'Down to the medical bay' },
        { to: 'whitebeard_medical', travelMinutes: 5, lockedByFlag: null, label: 'Down to the medical bay' },
      ],
      discoveredByDefault: false,
      mapPosition: { x: 80, y: 50 },
      ambientSfx: ['enormous timbers', 'crew of hundreds', 'sea'],
      takeableItems: [{ itemId: 'whitebeard_mark', qty: 1, ownerId: null, aka: ['the mark', 'the flag', 'the tattoo'] }],
    },
    {
      id: 'moby_dick_mess',
      name: 'The Moby Dick — Mess',
      shortName: 'The Mess',
      description:
        'Where the Fourth Division feeds four hundred people twice a day and where every relationship on this ship is actually formed. Thatch runs it. Teach eats here. So does Ace, face-first, occasionally mid-sentence.',
      artDirection:
        'Long tables, enormous food, steam, noise, men wedged shoulder to shoulder. Pure comedy staging. This room is what the war is later fought over and it has to be worth it.',
      stageImage: null,
      connections: [
        { to: 'moby_dick_deck', travelMinutes: 3, lockedByFlag: null, label: 'Up on deck' },
      ],
      discoveredByDefault: false,
      mapPosition: { x: 72, y: 34 },
      ambientSfx: ['wind and sand', 'market', 'heat'],
      takeableItems: [{ itemId: 'vivre_card', qty: 1, ownerId: null, aka: ['the card', 'vivre card', 'the paper'] }],
    },
    {
      id: 'whitebeard_medical',
      name: 'The Moby Dick — Medical Bay',
      shortName: 'Medical',
      description:
        'Marco’s domain, and the one room on this ship that is quiet. There are more machines around the captain’s bed each year, and nobody on board has ever said so out loud.',
      artDirection:
        'Clean, dim, equipment, one enormous bed. Still and hushed against the noise of the rest of the ship. The tubes should be visible and unremarked.',
      stageImage: null,
      connections: [
        { to: 'moby_dick_deck', travelMinutes: 5, lockedByFlag: null, label: 'Back on deck' },
      ],
      discoveredByDefault: false,
      mapPosition: { x: 78, y: 44 },
      ambientSfx: ['equipment hum', 'distant crew', 'slow breathing'],
      takeableItems: [],
    },
    {
      id: 'alabasta',
      name: 'Alabasta',
      shortName: 'Alabasta',
      description:
        'A desert kingdom in the middle of somebody else’s crisis, where Ace walks into a restaurant and finds his brother sitting in it, years older and exactly the same.',
      artDirection:
        'Hard desert light, sandstone, robes, heat shimmer. Bleached and enormous. The reunion inside it should be staged small and warm against all that space.',
      stageImage: null,
      connections: [
        { to: 'grand_line_port', travelMinutes: 4320, lockedByFlag: null, label: 'Back to the sea' },
        { to: 'banaro', travelMinutes: 2160, lockedByFlag: 'teach_deserted', label: 'After him, to Banaro' },
      ],
      discoveredByDefault: false,
      mapPosition: { x: 72, y: 34 },
      ambientSfx: ['wind and sand', 'market', 'heat'],
      takeableItems: [{ itemId: 'vivre_card', qty: 1, ownerId: null, aka: ['the card', 'vivre card', 'the paper'] }],
    },
    {
      id: 'banaro',
      name: 'Banaro Island',
      shortName: 'Banaro',
      description:
        'A town that will not exist by evening. Two men who both believe you should live without regret meet in the middle of it to establish which of them meant it.',
      artDirection:
        'Small island town, then the same town on fire and cratered. Fire against darkness, ruin, no civilians in frame once it starts. Stage it as two silhouettes in a hole they made.',
      stageImage: null,
      connections: [
        { to: 'grand_line_port', travelMinutes: 2880, lockedByFlag: null, label: 'Away, while you can' },
        { to: 'impel_down', travelMinutes: 1440, lockedByFlag: 'ace_captured', label: 'Handed over' },
      ],
      discoveredByDefault: false,
      mapPosition: { x: 88, y: 28 },
      ambientSfx: ['fire', 'collapsing masonry', 'wind'],
      takeableItems: [],
    },
    {
      id: 'impel_down',
      name: 'Impel Down — Level Six',
      shortName: 'The Cell',
      description:
        'The floor nobody is released from, where the prisoners are people the world has decided to stop counting. Seastone on the wrists, no sea in sight, and a visitor who keeps turning up and shouting.',
      artDirection:
        'Cold stone, iron, near-dark, water sound. Cramped after the vastness of the ships. One seated figure, chained, lit from a corridor.',
      stageImage: null,
      connections: [
        { to: 'marineford_platform', travelMinutes: 720, lockedByFlag: 'execution_scheduled', label: 'Taken up, in seastone' },
      ],
      discoveredByDefault: false,
      mapPosition: { x: 92, y: 14 },
      ambientSfx: ['dripping', 'distant screaming', 'chain'],
      takeableItems: [{ itemId: 'seastone_cuffs', qty: 1, ownerId: null, aka: ['the cuffs', 'seastone', 'the chains'] }],
    },
    {
      id: 'marineford_platform',
      name: 'The Execution Platform',
      shortName: 'The Platform',
      description:
        'Raised stone above a plaza built to hold a war, with three admirals, a bay full of warships, and the whole of the world’s press arranged to watch one man be made into an argument.',
      artDirection:
        'Vast white marble plaza, enormous scale, warships in the bay, one small kneeling figure high up and alone. Overhead light, no shadows to hide in. Architecture as cruelty.',
      stageImage: null,
      connections: [
        { to: 'marineford_battlefield', travelMinutes: 1, lockedByFlag: 'war_began', label: 'Down, into it' },
      ],
      discoveredByDefault: false,
      mapPosition: { x: 96, y: 8 },
      ambientSfx: ['enormous crowd', 'wind', 'a single bell'],
      takeableItems: [],
    },
    {
      id: 'marineford_battlefield',
      name: 'Marineford',
      shortName: 'Marineford',
      description:
        'The plaza once it stops being a stage. Everybody who ever chose him is in it, and a great many of them will not leave, and that is the arithmetic he is going to be asked to accept.',
      artDirection:
        'Full war: fire, ice, magma, shockwaves, the bay frozen or boiling, thousands of figures. Chaos legible in layers rather than mud. Keep faces readable in the foreground.',
      stageImage: null,
      connections: [
        { to: 'marineford_platform', travelMinutes: 1, lockedByFlag: null, label: 'Back to the platform' },
      ],
      discoveredByDefault: false,
      mapPosition: { x: 98, y: 4 },
      ambientSfx: ['war', 'fire', 'shouting'],
      takeableItems: [],
    },
  ],
  factions: [
    {
      id: 'faction_dadan',
      name: 'The Dadan Family',
      description:
        'Nine mountain bandits who were coerced into raising two children by a Marine vice-admiral and who have never once let anybody forget it. They complain, they threaten, and they go down the mountain armed when the children are late.',
      startingReputation: 45,
      allies: [],
      enemies: ['faction_goa_nobility'],
    },
    {
      id: 'faction_whitebeard',
      name: 'The Whitebeard Pirates',
      description:
        'Sixteen divisions, four hundred and more men, and one old man who calls every one of them his son and means it. The only organisation in this story that is a family first and a force second, which is also what makes it killable.',
      startingReputation: 0,
      allies: ['faction_spade'],
      enemies: ['faction_marines', 'faction_world_government'],
    },
    {
      id: 'faction_spade',
      name: 'The Spade Pirates',
      description:
        'Fewer than fifty people who decided that a teenager was worth following into the New World. Whatever Ace becomes later, this crew chose him before there was anything to choose.',
      startingReputation: 0,
      allies: ['faction_whitebeard'],
      enemies: ['faction_marines'],
    },
    {
      id: 'faction_marines',
      name: 'The Marines',
      description:
        'The armed instrument of the World Government, containing both a vice-admiral who wants this particular boy to live an ordinary life and an admiral who believes mercy is how the last war started.',
      startingReputation: 10,
      allies: ['faction_world_government'],
      enemies: ['faction_whitebeard', 'faction_spade', 'faction_revolutionaries'],
    },
    {
      id: 'faction_world_government',
      name: 'The World Government',
      description:
        'The thing that searched South Blue for a pregnant woman for twenty months. It does not want Ace dead for anything he has done; it wants the demonstration, and it has wanted it since before he was born.',
      startingReputation: -20,
      allies: ['faction_marines', 'faction_goa_nobility'],
      enemies: ['faction_whitebeard', 'faction_revolutionaries'],
    },
    {
      id: 'faction_revolutionaries',
      name: 'The Revolutionary Army',
      description:
        'People who concluded that the wall between High Town and the Terminal is the whole problem and should be removed rather than climbed. If Sabo lives long enough to be picked up by a particular ship, this becomes his answer.',
      startingReputation: 0,
      allies: [],
      enemies: ['faction_world_government', 'faction_marines', 'faction_goa_nobility'],
    },
    {
      id: 'faction_goa_nobility',
      name: 'The Nobility of Goa',
      description:
        'Families who own a clean city and burn the part of it they do not want to look at. Sabo was born into this and has been trying to stop being from it since he was eight.',
      startingReputation: -35,
      allies: ['faction_world_government'],
      enemies: ['faction_dadan', 'faction_revolutionaries'],
    },
  ],
  /**
   * Twelve people, across ten years, and the ages are the hard part.
   *
   * §5 asks for `agePhase` and `wardrobeByPhase` on every canonical character,
   * which this schema has no field for — there is one `appearance` string per
   * person. So the phase lives inside it: Luffy's and Sabo's read "at seven"
   * and "at ten" first and then say what changes, because the art pipeline
   * takes `appearance` whole and a child described in adult clothing is the one
   * failure the visual QA sections care most about.
   *
   * Rouge and Roger are deliberately not here. §32 and §34 want an absence
   * that casts a shadow, and a `CharacterDef` is a person you can walk up to
   * and talk to. They live in `roger_record`, in Garp's secrets, and in the
   * knowledge scopes — which is also how §33 gets enforced, since nothing can
   * hand Ace a memory of a woman he never met.
   */
  characters: [
    {
      id: 'luffy',
      name: 'Monkey D. Luffy',
      role: 'Seven years old, has followed you for eleven days, and will not be discouraged by anything you have tried so far',
      cardBlurb:
        'He cannot fight, he cannot lie, and he has no concept of being unwanted. He has decided you are his brother and is waiting with infinite patience for you to catch up, and the one thing that would actually stop him has not occurred to you because it is being kind to him.',
      pronouns: 'he/him',
      publicTraits: ['Announces what he is about to do before doing it badly', 'Gets up every time', 'Hungry in a way that structures his entire day'],
      hiddenDrives: [
        'He is not following Ace because Ace is strong. He is following him because he was alone on this island before Ace existed and has decided not to be again',
        'He has never once considered that Ace might not want him, and being told directly would not register as information',
      ],
      values: [
        'Saying the true thing immediately, at volume',
        'Not being left behind, which he treats as a rule of nature rather than a preference',
      ],
      fears: [
        'Being alone, specifically and physically — an empty room is worse to him than a tiger',
        'That the people who go away are going away because of something he did',
      ],
      socialStyle:
        'No distance at all. Stands too close, asks the unaskable question in a normal voice, and is entirely unembarrassed by any answer. Laughs at things that were not jokes and means it.',
      boundaries: [
        'Will not pretend to agree to something to end a conversation. He simply says no and keeps following',
        'Will not be bought off with food, which everybody assumes and nobody has tested',
      ],
      goals: [
        'Be allowed up the tree',
        'Find out what is in the can',
        'Hit Ace once, properly, where Ace notices',
      ],
      secrets: [
        {
          id: 'luffy_knows_where_the_can_is',
          fact: 'He worked out where the can is buried on day four by watching which flat stone Ace steps over rather than on, and he has not dug it up, because digging it up is not the point.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He volunteers it, cheerfully and at the worst possible moment, the first time anybody suggests he does not understand what is going on.',
        },
        {
          id: 'luffy_hat_promise',
          fact: 'The hat was given to him by a man who left, with an instruction attached, and Luffy has decided the instruction means he is not allowed to be the kind of person who stays put.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Ask about the hat rather than about Shanks. He will explain the whole thing in about four sentences and none of them will be sad.',
        },
      ],
      speechStyle:
        'Short declarative shouts with the verb doing all the work. No subordinate clauses. Repeats a refusal identically rather than rephrasing it. Says "Ace" constantly and as a complete sentence. Laughs mid-word.',
      topics: ['following you', 'food', 'the tree', 'being strong', 'the hat', 'pirates', 'what is in the can'],
      voiceSamples: [
        'I’m coming. You didn’t say I couldn’t, you said you’d tie me to a tree. That’s different.',
        'I got up. See? I got up. Do it again.',
        'Are we eating? Because I found something and I think it’s meat.',
        'You can’t leave me. I’ll just walk the same way you walked.',
      ],
      appearance:
        'At seven: small, skinny and scabbed, messy black hair, round expressive eyes, the scar already under the left eye, a straw hat too big for him, red sleeveless vest, shorts, sandals. Not a miniature adult — a scruffy child who has fallen out of things.',
      visualHook: 'The straw hat, always on, always too large, and never once put down anywhere.',
      silhouette: 'Small and wide-stanced, arms flung out, hat brim breaking the head shape.',
      artSeed: 'ace-luffy-child-01',
      portrait: null,
      expressions: ['neutral', 'grinning', 'furious', 'crying', 'asleep'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'dadan_house', activity: 'asleep in the wrong place' },
        { startMinute: 360, endMinute: 540, locationId: 'dadan_house', activity: 'eating everything available' },
        { startMinute: 540, endMinute: 1080, locationId: 'mt_colubo', activity: 'following Ace at a distance he believes is subtle' },
        { startMinute: 1080, endMinute: 1260, locationId: 'mt_colubo', activity: 'losing a fight with something enormous' },
        { startMinute: 1260, endMinute: 1440, locationId: 'dadan_house', activity: 'eating again, then asleep mid-sentence' },
      ],
      homeLocationId: 'dadan_house',
      knowledgeScope: ['luffy', 'dadan_house', 'mt_colubo', 'the_hat', 'garp_visits'],
      startingRelationship: { trust: 55, affection: 75, respect: 95, fear: 5, rivalry: 45 },
      gates: [
        {
          id: 'luffy_is_a_brother',
          label: 'He stops being a problem and becomes family',
          kind: 'TRUST',
          requires: { trust: 70, affection: 85, flagsSet: ['spoke:luffy'] },
        },
        {
          id: 'luffy_will_stay_behind',
          label: 'He will actually stay behind if Ace asks him to',
          kind: 'TRUST',
          requires: { trust: 92, respect: 95, flagsSet: ['asl_brotherhood'] },
        },
      ],
      attributes: { might: 8, agility: 11, mind: 5, presence: 14, resolve: 20, arcana: 7 },
      companion: null,
      scouting: null,
      combatant: { health: 40, defenseDc: 12, damage: 5, tags: ['rubber', 'child', 'will-not-stay-down'] },
    },
    {
      id: 'sabo',
      name: 'Sabo',
      role: 'Your first real friend, born into the clean city on the other side of the wall, and the only person you have met who threw away the name he was given',
      cardBlurb:
        'He is the proof that birth is not obligation, which is the argument you most need to hear and would never accept from an adult. He is also a liar, a thief and a better tactician than you, and there is a family in High Town that has not stopped looking for him.',
      pronouns: 'he/him',
      publicTraits: ['Explains the plan whether or not anybody asked', 'Steals competently and without guilt', 'Changes the subject when the subject is his father'],
      hiddenDrives: [
        'He needs somebody to agree out loud that leaving was not cowardice, and has never asked for it',
        'He is terrified he will be reclaimed — not killed, reclaimed, put back in the house and made comfortable, which he considers a worse ending than anything Gray Terminal can do to him',
      ],
      values: [
        'Choosing what you are, and paying whatever that costs',
        'Splitting everything three ways once it is three of you, without discussion',
      ],
      fears: [
        'That the wall is real and everybody born inside it is permanently one of them',
        'That Ace will decide the Roger thing is destiny, because if Ace believes that then Sabo believes it about himself too',
      ],
      socialStyle:
        'Sits on things. Talks with his hands and a mouth full. Argues by laying out the alternative rather than contradicting you, which works on Ace about half the time and infuriates him the other half.',
      boundaries: [
        'Will not go into High Town for any reason, for anybody, at any price',
        'Will not be called by his family name, and does not explain the first time somebody does it',
      ],
      goals: [
        'Buy the ship',
        'Get out to sea before anything can happen to make it impossible',
        'Get Ace to say, once, that being Roger’s son is not the same as being Roger',
      ],
      secrets: [
        {
          id: 'sabo_noble_family',
          fact: 'His family are Goa nobility, he knows exactly which house, and they have been offering money for information about him for two years.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells it in one flat sentence, unprompted, on the night the brotherhood becomes real, and then talks about something else immediately.',
        },
        {
          id: 'sabo_knows_about_the_burning',
          fact: 'He has heard the nobles talking about what happens to Gray Terminal before the World Noble’s visit, and has not told Ace, because telling Ace means Ace goes down there.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Press him about why he has been strange all week rather than about the Terminal itself.',
        },
      ],
      speechStyle:
        'Fluent and quick, full sentences, the vocabulary of a much better education deployed casually. Starts sentences with "look" when he is about to be reasonable and "no, listen" when he is not. Laughs through the word he is saying.',
      topics: ['the ship', 'the can', 'the wall', 'High Town', 'his father', 'pirates', 'Luffy', 'what Ace’s name means'],
      voiceSamples: [
        'Look — nobody checks the eastern gate before noon. That’s not luck, that’s a rota, and rotas are just people being lazy on a schedule.',
        'No, listen. You didn’t pick your father. I did pick mine, and then I unpicked him. One of us did something hard and it wasn’t you.',
        'If he follows us one more day he’s coming with us, and you know it, and you’re just annoyed that it isn’t your idea.',
        'Don’t say that name to me again.',
      ],
      appearance:
        'At ten: same height as Ace, short curly blond hair, rounder face, a missing tooth, a large black top hat with blue goggles wrapped round it, blue jacket with the sleeves rolled, a cravat, pale blue shorts, a pipe. No scar yet and no long coat — those belong to a man he has not become.',
      visualHook: 'The top hat with goggles, absurd on a ten-year-old and never removed.',
      silhouette: 'Tall hat breaking the head shape, pipe over one shoulder, jacket flaring.',
      artSeed: 'ace-sabo-child-01',
      portrait: null,
      expressions: ['neutral', 'grinning', 'scheming', 'angry', 'frightened'],
      schedule: [
        { startMinute: 0, endMinute: 390, locationId: 'asl_treehouse', activity: 'asleep in the treehouse' },
        { startMinute: 390, endMinute: 660, locationId: 'gray_terminal', activity: 'working the Terminal, trading what he lifted' },
        { startMinute: 660, endMinute: 1020, locationId: 'mt_colubo', activity: 'with Ace, planning something' },
        { startMinute: 1020, endMinute: 1200, locationId: 'asl_treehouse', activity: 'counting the can and recounting it' },
        { startMinute: 1200, endMinute: 1440, locationId: 'asl_treehouse', activity: 'awake longer than he admits' },
      ],
      homeLocationId: 'asl_treehouse',
      knowledgeScope: ['sabo', 'asl_treehouse', 'gray_terminal', 'goa_high_town', 'the_wall', 'the_ship_plan', 'nobility'],
      startingRelationship: { trust: 80, affection: 75, respect: 82, fear: 0, rivalry: 55 },
      gates: [
        {
          id: 'sabo_tells_you_his_house',
          label: 'He says which family he is from',
          kind: 'TRUST',
          requires: { trust: 88, flagsSet: ['spoke:sabo'] },
        },
        {
          id: 'sabo_will_not_sail_alone',
          label: 'He will refuse the boat rather than take it without Ace',
          kind: 'ALLIANCE',
          requires: { trust: 90, affection: 88, flagsSet: ['asl_brotherhood'] },
        },
      ],
      attributes: { might: 9, agility: 15, mind: 15, presence: 14, resolve: 15, arcana: 5 },
      companion: null,
      scouting: null,
      combatant: { health: 44, defenseDc: 14, damage: 7, tags: ['pipe', 'child', 'tactician'] },
    },
    {
      id: 'dadan',
      name: 'Curly Dadan',
      role: 'The mountain bandit a Marine vice-admiral handed two children to, and who has complained about it every single day since without ever once putting either of them down',
      cardBlurb:
        'She shouts, she threatens, she tells anyone who will listen that Garp ruined her life, and she has never raised a hand to either boy. If they are late back she goes down the mountain armed. She is family by action and would be physically unable to say so.',
      pronouns: 'she/her',
      publicTraits: ['Volume as a personality', 'Cigarette permanently present', 'Announces that she is not their mother, frequently, unprompted'],
      hiddenDrives: [
        'She decided years ago that the boy would not grow up believing he was a burden, and her entire method for achieving this is to complain about the inconvenience so loudly that it reads as ordinary',
        'She is more frightened of Garp coming back and taking them than of anything in the forest',
      ],
      values: [
        'Turning up, armed, when it matters, and never mentioning it afterwards',
        'Not lying to children about what adults are like',
      ],
      fears: [
        'That the Roger business reaches the mountain and there is nothing she can do about it with an axe',
        'That Ace will leave at seventeen believing nobody in this house wanted him',
      ],
      socialStyle:
        'Every conversation begins at a shout and de-escalates. Insults as endearment. Physically enormous and entirely unthreatening to the two people who know her.',
      boundaries: [
        'Will not be thanked. Thank her and she leaves the room',
        'Will not discuss Garp’s reasons, because she does not know them and hates not knowing them',
      ],
      goals: [
        'Get both of them to eat something that is not stolen',
        'Have one evening in which nobody bleeds',
        'Never speak to Monkey D. Garp again, a goal she fails at annually',
      ],
      secrets: [
        {
          id: 'dadan_kept_the_notice',
          fact: 'She has the paper Garp left with the boy — a name, a date, and no father on it — folded in a tin under the floor, and she has never shown anybody.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She will not be asked into it. She produces it herself, once, on a night when she has decided he is about to find out worse from somebody else.',
        },
      ],
      speechStyle:
        'Loud, coarse, rapid, heavy on rhetorical questions she answers herself. Calls them "brats" as a name. Ends declarations with an insult she does not mean and everybody present treats as punctuation.',
      topics: ['Garp', 'food', 'the roof', 'how much they cost her', 'the forest', 'coming home before dark'],
      voiceSamples: [
        'Do I look like a mother to you? Do I? I am a criminal. I have a record. That old man walked in here and ruined my entire life and now there’s a hole in my roof.',
        'Sit. Eat. I didn’t cook it for you, I cooked it, and you happen to be here.',
        'You’re both late. I wasn’t worried. Put the axe back.',
        'Don’t. Don’t say anything. Go to bed.',
      ],
      appearance:
        'Enormous heavyset woman in her forties, wild orange-brown hair, weathered intimidating face, rough patched mountain clothing, a cigarette almost always going. Exaggerated One Piece proportions — she occupies a third of any frame she is in and must not be redrawn as a slim anime mother.',
      visualHook: 'The cigarette, and the axe leaning by the door that she keeps insisting is for wood.',
      silhouette: 'Vast and square, hair a broad irregular mass, shoulders wider than the doorway.',
      artSeed: 'ace-dadan-01',
      portrait: null,
      expressions: ['neutral', 'shouting', 'exasperated', 'worried', 'fond'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'dadan_house', activity: 'asleep, snoring audibly through the house' },
        { startMinute: 420, endMinute: 600, locationId: 'dadan_house', activity: 'cooking and complaining about cooking' },
        { startMinute: 600, endMinute: 1020, locationId: 'mt_colubo', activity: 'out with the family on bandit business, badly' },
        { startMinute: 1020, endMinute: 1290, locationId: 'dadan_house', activity: 'waiting up, pretending to mend something' },
        { startMinute: 1290, endMinute: 1440, locationId: 'dadan_house', activity: 'drinking with the men, one eye on the door' },
      ],
      homeLocationId: 'dadan_house',
      knowledgeScope: ['dadan', 'dadan_house', 'mt_colubo', 'garp_visits', 'the_notice', 'bandit_family'],
      startingRelationship: { trust: 70, affection: 80, respect: 55, fear: 10, rivalry: 5 },
      gates: [
        {
          id: 'dadan_shows_the_notice',
          label: 'She produces the paper Garp left',
          kind: 'TRUST',
          requires: { trust: 85, affection: 85 },
        },
      ],
      attributes: { might: 17, agility: 8, mind: 10, presence: 16, resolve: 16, arcana: 3 },
      companion: null,
      scouting: null,
      combatant: { health: 75, defenseDc: 15, damage: 12, tags: ['axe', 'bandit', 'protective'] },
    },
    {
      id: 'garp',
      name: 'Monkey D. Garp',
      role: 'Marine vice-admiral, Luffy’s grandfather, the man who carried you off Baterilla, and the only living person who knows who your father was',
      cardBlurb:
        'He keeps trying to push you towards the Marines and cannot say why, which is because the reason is a promise he made to a man he was hunting. He wants you alive and he wants you nowhere near your inheritance, and he is so bad at communicating this that it arrives as violence and laughter.',
      pronouns: 'he/him',
      publicTraits: ['Laughs at the wrong moments, enormously', 'Hits children as a greeting', 'Falls asleep in the middle of his own point'],
      hiddenDrives: [
        'He promised Roger he would take the child, and has interpreted that promise as a duty to keep him out of the sea entirely — a reading Roger never asked for and Garp has never examined',
        'He is trying to work out, annually, whether this is the year the boy is old enough to be told, and he has been wrong about it every year so far',
      ],
      values: [
        'A promise kept even when the man you made it to was your enemy',
        'The Marines as the one structure that could protect a boy the Government would otherwise want dead',
      ],
      fears: [
        'That the boy finds out from somebody who wants to use him',
        'That he has already lost this argument and the sea is going to take both grandsons',
      ],
      socialStyle:
        'Arrives without warning, eats everything, roars with laughter, delivers something devastating in the middle of a joke, and leaves. Never says the important thing in the important sentence.',
      boundaries: [
        'Will not discuss Roger while anybody else is in the room',
        'Will not admit he is here to check on them and insists every visit is coincidence or duty',
      ],
      goals: [
        'Get Ace to consider the Marines without being told why it matters',
        'Confirm both boys are alive, twice a year, without appearing to be checking',
      ],
      secrets: [
        {
          id: 'garp_knows_roger',
          fact: 'Roger asked him, directly and shortly before his execution, to take the unborn child. Garp agreed. He has told nobody in nineteen years.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He will avoid, deflect into laughter, and give a partial truth first. The whole of it arrives only if Ace asks having already found the record — never to a guess.',
        },
        {
          id: 'garp_knows_rouge',
          fact: 'He knows about the twenty months, and that she held on deliberately, and that she asked to see the boy once and was told there was no time.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'This one he gives up more easily than Roger, and it costs him more to say.',
        },
      ],
      speechStyle:
        'Booming, jovial, wildly digressive, punctuated by laughter that is not always about anything funny. Calls him "boy". Says the cruellest accurate thing in the same tone as a joke about food and then moves on before it can be answered.',
      topics: ['the Marines', 'food', 'Luffy', 'the sea', 'what your mother was like', 'pirates', 'nothing in particular'],
      voiceSamples: [
        'You’ve got a good arm on you. Shame. Marines could use that arm. Bwahaha! Is there more of this?',
        'Don’t ask me that, boy. Ask me something else.',
        'She held on. Twenty months. You want to know what kind of woman does that? Neither do I, I only met her once, and I have thought about it every year since.',
        'I put you up this mountain because I couldn’t think of anywhere in the world that was further from the sea. Turns out I’m an idiot.',
      ],
      appearance:
        'Huge and muscular in his seventies, short white hair, stubble, scar beside the left eye, Marine coat worn open over a plain shirt, enormous broad grin. No permanent dog hood — that belongs to specific comic and disguise moments and must not become his default silhouette.',
      visualHook: 'The Marine coat worn like something he has been forced into, and a fist the size of a child’s head.',
      silhouette: 'Immense torso, coat hanging square from the shoulders, head thrown back laughing.',
      artSeed: 'ace-garp-01',
      portrait: null,
      expressions: ['neutral', 'laughing', 'stern', 'grieving', 'asleep'],
      schedule: [
        { startMinute: 480, endMinute: 720, locationId: 'dadan_house', activity: 'eating Dadan’s food and being unwelcome' },
        { startMinute: 720, endMinute: 1020, locationId: 'mt_colubo', activity: 'throwing children into the forest as training' },
        { startMinute: 1020, endMinute: 1200, locationId: 'dadan_house', activity: 'asleep in the chair nobody can move him from' },
      ],
      homeLocationId: null,
      knowledgeScope: ['garp', 'the_marines', 'roger', 'rouge', 'baterilla', 'luffy', 'world_government', 'the_notice'],
      startingRelationship: { trust: 60, affection: 70, respect: 50, fear: 25, rivalry: 20 },
      gates: [
        {
          id: 'garp_talks_about_roger',
          label: 'He answers the question about your father',
          kind: 'TRUST',
          requires: { trust: 80, hasItems: ['roger_record'] },
        },
        {
          id: 'garp_talks_about_rouge',
          label: 'He tells you about the twenty months',
          kind: 'TRUST',
          requires: { trust: 72, flagsSet: ['asked_garp_about_mother'] },
        },
      ],
      attributes: { might: 28, agility: 18, mind: 17, presence: 22, resolve: 26, arcana: 20 },
      companion: null,
      scouting: null,
      combatant: { health: 200, defenseDc: 26, damage: 30, tags: ['haki', 'vice-admiral', 'hero-of-the-marines'] },
    },
    {
      id: 'deuce',
      name: 'Masked Deuce',
      role: 'The first person to join you, met on an island neither of you meant to be on, and the only man alive who knew you before there was a legend to know',
      cardBlurb:
        'He did not want to be a pirate and he does not much like you at first. He is practical where you are not, he writes down what actually happened, and he is the counterweight that makes the difference between a crew and a boy with followers.',
      pronouns: 'he/him',
      publicTraits: ['Keeps a written log with dates', 'States the objection once and then complies', 'Wears the mask long after there is any reason to'],
      hiddenDrives: [
        'He abandoned a name and a medical family and has not decided whether that was cowardice; watching somebody else refuse an inherited name is the reason he stays',
        'He wants the record to be accurate more than he wants it to be flattering, and suspects that will matter later',
      ],
      values: [
        'Accuracy, including about people he loves',
        'Saying the unwelcome thing before the decision rather than after it',
      ],
      fears: [
        'That Ace is the kind of man who dies young and takes the whole crew with him',
        'Being known again by the name he left',
      ],
      socialStyle:
        'Dry, level, slightly formal. Answers questions precisely, including the ones that were rhetorical. Does not perform loyalty and is therefore constantly underestimated by people who mistake volume for commitment.',
      boundaries: [
        'Will not lie in the log, for anybody, including to make Ace look better',
        'Will not discuss what he was before Sixis',
      ],
      goals: [
        'Keep this crew alive through the next island',
        'Get the captain to explain a plan before executing it, once',
        'Finish the record',
      ],
      secrets: [
        {
          id: 'deuce_real_name',
          fact: 'His family are physicians of some standing and his real name would be recognised in three countries. He left because he could not stand the future it guaranteed.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells Ace and nobody else, at sea, at night, in about eleven words, after Ace has said something about his own father.',
        },
      ],
      speechStyle:
        'Measured and complete sentences with the medical habit of naming things precisely. Deadpan. Prefaces disagreement with "for the record" and means it literally. Never raises his voice, which makes him the loudest person in an argument with Ace.',
      topics: ['the log', 'supplies', 'the crew', 'the fruit', 'the New World', 'what happened yesterday'],
      voiceSamples: [
        'For the record: you didn’t have a plan. You had a direction and a lot of confidence, and they are not the same document.',
        'I wrote down what you actually said. You can read it. It won’t help.',
        'If you eat that, you will never swim again. I am not advising you either way. I am telling you what the trade is.',
        'I left a name too. Mine was worth less than yours and it was harder to put down.',
      ],
      appearance:
        'Lean adult man, dark hair, a plain face-covering mask worn from habit rather than need, practical seafaring clothes in muted blues, a satchel with a hardbacked notebook in it. Use the Ace’s Story reference design rather than improvising a generic masked pirate.',
      visualHook: 'The mask, and the notebook he is always halfway through.',
      silhouette: 'Upright, narrow, satchel strap crossing the chest, head slightly tilted down reading.',
      artSeed: 'ace-deuce-01',
      portrait: null,
      expressions: ['neutral', 'dry', 'alarmed', 'grimly amused', 'grieving'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'spade_ship', activity: 'asleep, having written up the day' },
        { startMinute: 360, endMinute: 720, locationId: 'spade_ship', activity: 'navigation and supplies' },
        { startMinute: 720, endMinute: 1140, locationId: 'spade_ship', activity: 'with the crew, objecting to something' },
        { startMinute: 1140, endMinute: 1440, locationId: 'spade_ship', activity: 'the log, by lamp' },
      ],
      homeLocationId: 'spade_ship',
      knowledgeScope: ['deuce', 'sixis', 'spade_ship', 'the_crew', 'mera_mera', 'navigation', 'the_log'],
      startingRelationship: { trust: 30, affection: 15, respect: 40, fear: 15, rivalry: 25 },
      gates: [
        {
          id: 'deuce_gives_his_name',
          label: 'He tells you what he was called',
          kind: 'TRUST',
          requires: { trust: 78, affection: 60, flagsSet: ['spade_pirates_formed'] },
        },
      ],
      attributes: { might: 12, agility: 14, mind: 19, presence: 12, resolve: 16, arcana: 6 },
      companion: null,
      scouting: null,
      combatant: { health: 62, defenseDc: 16, damage: 10, tags: ['first-mate', 'practical'] },
    },
    {
      id: 'whitebeard',
      name: 'Edward Newgate',
      role: 'The strongest man in the world, captain of the ship you came to take, and a father to four hundred people who all chose him',
      cardBlurb:
        'You came to kill him and he offered you a place instead, and he has kept offering it every time you have tried since. He believes a family is something you choose and then refuse to abandon, which is the exact answer to the question you have been carrying since you were eight, and you cannot bring yourself to accept it.',
      pronouns: 'he/him',
      publicTraits: ['Calls everyone on the ship his son and means it literally', 'Laughs at attempts on his life', 'Drinks from a gourd the size of a child'],
      hiddenDrives: [
        'He wants nothing at all — no crown, no One Piece, no territory beyond what keeps his family safe — and this is genuinely incomprehensible to everybody who meets him',
        'He knows how ill he is and has decided that spending what is left on people is the correct expenditure, and will not discuss it',
      ],
      values: [
        'A family chosen deliberately and then never abandoned, regardless of what any of them turn out to be',
        'Letting a son make his own mistake, right up to the point where it will kill him',
      ],
      fears: [
        'Outliving his sons, which he has already done many times',
        'That the boy will die of pride and there will be nothing anybody could have said',
      ],
      socialStyle:
        'Enormous stillness. Speaks rarely and at low volume and everybody stops. Treats an assassination attempt as an introduction. Pays attention to the one person in the room who is not talking.',
      boundaries: [
        'Will not order a son to stay when he can see the son has already gone',
        'Will not permit his crew to be spoken about as a means to anything',
      ],
      goals: [
        'Get this one to accept the mark before he gets himself killed proving he does not need it',
        'See the family through one more year than the doctors will admit to',
      ],
      secrets: [
        {
          id: 'wb_health',
          fact: 'The machinery in the medical bay is keeping him functional rather than comfortable, and Marco knows the actual numbers.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He never says it. Ask Marco, or be in the medical bay when the equipment is running.',
        },
        {
          id: 'wb_saw_it_coming',
          fact: 'He had already identified Teach as dangerous and chose to keep him aboard anyway, because throwing away a son for what he might do is the one thing his whole position forbids.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He says this himself, flatly, on the night Thatch dies, and does not defend it.',
        },
      ],
      speechStyle:
        'Short, low, unhurried. Calls him "son" and "brat" interchangeably. States a position once and does not argue it. Ends with a laugh that is not dismissive. Never explains himself twice.',
      topics: ['family', 'the sea', 'his sons', 'what a father is', 'Teach', 'Roger', 'what you are worth'],
      voiceSamples: [
        'Put it down, son. You’ve tried this eleven times. The twelfth won’t be different and I’ll still be here afterwards.',
        'I don’t want the One Piece. I wanted a family. I got a large one.',
        'Your father’s name is not a sentence anybody passed on you. I knew him. He’d have found that funny.',
        'Don’t go. I am asking, not ordering. There is a difference and you are about to ignore both.',
      ],
      appearance:
        'Over six metres tall and massively muscular in his early seventies, long lined face, an enormous white crescent moustache curving upward — never a hanging beard — black bandana, bare scarred chest, white captain’s coat with epaulettes draped over the shoulders, loose pale trousers, dark sash, huge black boots, and the bisento Murakumogiri. Ace must read as small in any frame containing him.',
      visualHook: 'The upward crescent moustache and the coat worn like a cape, above a chest covered in old scars.',
      silhouette: 'Mountainous. Shoulders filling the frame, crescent breaking the skyline, polearm as a vertical.',
      artSeed: 'ace-whitebeard-01',
      portrait: null,
      expressions: ['neutral', 'laughing', 'grave', 'furious', 'ailing'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'whitebeard_medical', activity: 'asleep, monitored' },
        { startMinute: 420, endMinute: 600, locationId: 'whitebeard_medical', activity: 'being treated, complaining about being treated' },
        { startMinute: 600, endMinute: 1200, locationId: 'moby_dick_deck', activity: 'in the chair on deck, where the family can see him' },
        { startMinute: 1200, endMinute: 1440, locationId: 'moby_dick_deck', activity: 'drinking with whoever comes to sit near him' },
      ],
      homeLocationId: 'moby_dick_deck',
      knowledgeScope: ['whitebeard', 'moby_dick_deck', 'the_divisions', 'teach', 'roger', 'the_new_world', 'his_health'],
      startingRelationship: { trust: 40, affection: 50, respect: 45, fear: 0, rivalry: 10 },
      gates: [
        {
          id: 'wb_offers_the_mark',
          label: 'He offers you the mark',
          kind: 'ALLIANCE',
          requires: { respect: 60, flagsSet: ['challenged_whitebeard'] },
        },
        {
          id: 'wb_asks_you_not_to_go',
          label: 'He asks — not orders — you not to chase Teach',
          kind: 'TRUST',
          requires: { trust: 70, affection: 75, flagsSet: ['thatch_dead'] },
        },
      ],
      attributes: { might: 30, agility: 12, mind: 20, presence: 30, resolve: 28, arcana: 28 },
      companion: null,
      scouting: null,
      combatant: { health: 400, defenseDc: 30, damage: 45, tags: ['gura-gura', 'haki', 'strongest-man', 'ailing'] },
    },
    {
      id: 'marco',
      name: 'Marco',
      role: 'First Division Commander, ship’s doctor, and the brother who has watched the old man adopt disasters for twenty years',
      cardBlurb:
        'He patches you up after every stupid thing you do and files it without comment. He is the only person aboard who will name your pride out loud, in a bored voice, while stitching you, and he is right every single time.',
      pronouns: 'he/him',
      publicTraits: ['Unrattleable', 'Ends sentences with a flat rising sound instead of emphasis', 'Treats a crisis as a scheduling problem'],
      hiddenDrives: [
        'He is the one holding the actual numbers on the captain’s health and has decided the family functions better not knowing, a decision he re-examines weekly',
        'He has buried a great many younger brothers and has stopped letting himself be surprised, which he knows is its own kind of damage',
      ],
      values: [
        'Competence quietly applied, and no credit taken for it',
        'The family continuing to exist after any individual in it stops',
      ],
      fears: [
        'That he will be the one left holding four hundred people',
        'That Ace is a specific sort of disaster — the sort that goes willingly',
      ],
      socialStyle:
        'Relaxed to the point of appearing asleep. Answers a shouted question at half volume. Puts a hand on the back of somebody’s neck instead of finishing the sentence.',
      boundaries: [
        'Will not lie to the crew about the captain’s condition when asked directly',
        'Will not be drawn into an argument about whether Ace should do something after Ace has done it',
      ],
      goals: [
        'Keep the captain upright for another year',
        'Get the Second Division commander to ask for help once, on the record, in front of witnesses',
      ],
      secrets: [
        {
          id: 'marco_the_numbers',
          fact: 'He knows roughly how long Newgate has, and it is measured in a small number of years.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He gives it straight to anybody who asks him directly in the medical bay, and to nobody who asks on deck.',
        },
      ],
      speechStyle:
        'Level, unhurried, faintly amused. Calls him "Ace" and occasionally "kid" without condescension. Delivers the hard observation as an aside while doing something with his hands, then does not follow it up.',
      topics: ['the captain’s health', 'the divisions', 'stitches', 'Teach', 'pride', 'the New World'],
      voiceSamples: [
        'Sit down. You’ve got a hole in you. It can wait until after I’ve closed the hole.',
        'You didn’t take anyone with you. You never take anyone with you. I’ve noticed, the old man’s noticed, and I think you’ve noticed.',
        'He’s not fine. You asked, so I’m telling you. Don’t repeat it on deck.',
        'Go if you’re going. I’d rather come. Nobody here is going to make you let us.',
      ],
      appearance:
        'Lean muscular adult man, blond hair standing up in a distinctive crown shape, heavy-lidded sleepy eyes, light stubble, an open purple jacket over a bare chest with the Whitebeard mark tattooed across it, a pale sash, dark knee-length trousers, sandals. Blue phoenix flames only while using the fruit — no permanent wings and no orange fire.',
      visualHook: 'The upright blond crown and the sleepy eyes, and blue flame where fire should be orange.',
      silhouette: 'Loose and relaxed, jacket open and hanging, distinctive hair shape at the top.',
      artSeed: 'ace-marco-01',
      portrait: null,
      expressions: ['neutral', 'sleepy', 'concerned', 'grim', 'blazing'],
      schedule: [
        { startMinute: 0, endMinute: 390, locationId: 'whitebeard_medical', activity: 'asleep next to his patient' },
        { startMinute: 390, endMinute: 660, locationId: 'whitebeard_medical', activity: 'the captain’s treatment' },
        { startMinute: 660, endMinute: 1080, locationId: 'moby_dick_deck', activity: 'running the ship' },
        { startMinute: 1080, endMinute: 1260, locationId: 'moby_dick_mess', activity: 'eating, listening to everybody' },
        { startMinute: 1260, endMinute: 1440, locationId: 'moby_dick_deck', activity: 'last rounds, then drinking one' },
      ],
      homeLocationId: 'moby_dick_deck',
      knowledgeScope: ['marco', 'whitebeard', 'whitebeard_medical', 'the_divisions', 'teach', 'his_health', 'moby_dick_deck'],
      startingRelationship: { trust: 45, affection: 40, respect: 50, fear: 0, rivalry: 5 },
      gates: [
        {
          id: 'marco_tells_you_the_numbers',
          label: 'He tells you how long the old man has',
          kind: 'TRUST',
          requires: { trust: 68, flagsSet: ['whitebeard_commander'] },
        },
        {
          id: 'marco_comes_with_you',
          label: 'He will come to Banaro if you ask',
          kind: 'ALLIANCE',
          requires: { trust: 75, affection: 65, flagsSet: ['thatch_dead'] },
        },
      ],
      attributes: { might: 22, agility: 20, mind: 21, presence: 19, resolve: 24, arcana: 26 },
      companion: null,
      scouting: null,
      combatant: { health: 220, defenseDc: 26, damage: 26, tags: ['phoenix', 'haki', 'regeneration', 'first-division'] },
    },
    {
      id: 'thatch',
      name: 'Thatch',
      role: 'Fourth Division Commander, runs the galley, and the reason four hundred people on this ship know each other',
      cardBlurb:
        'He feeds everybody twice a day and remembers what each of them will not eat. He is the warmest thing aboard and the one whose death turns this story towards the platform, and if you have not eaten with him the death is a plot point rather than a loss.',
      pronouns: 'he/him',
      publicTraits: ['Feeds people as a form of argument', 'Knows every man’s name and what he is bad at', 'Practical jokes of enormous ambition'],
      hiddenDrives: [
        'He is the ship’s unofficial way of finding out who is struggling, and he does it by cooking rather than asking, deliberately',
        'He has an uneasy feeling about Teach that he has never firmed up enough to take to anybody',
      ],
      values: [
        'Nobody eating alone on his ship',
        'A found family being a real one, at the level of who gets the bigger portion',
      ],
      fears: [
        'A division commander he cannot reach',
        'Being the one who noticed something and said nothing',
      ],
      socialStyle:
        'Constant cheerful noise, always doing three things, pulls people into conversations they were walking past. Physical, warm, entirely without ceremony.',
      boundaries: [
        'Will not let anybody skip a meal to sulk',
        'Will not repeat what he is told in the galley',
      ],
      goals: [
        'Feed four hundred men twice today',
        'Get the new commander to sit down and eat with the crew rather than near them',
      ],
      secrets: [
        {
          id: 'thatch_unease_about_teach',
          fact: 'He has noticed Teach asking specific questions about Devil Fruits for years and has never mentioned it, because it sounds like nothing when said out loud.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He mentions it as a joke in the galley, once, to anybody who has eaten there enough to be sat with rather than served.',
        },
      ],
      speechStyle:
        'Loud, warm, overlapping, lots of questions he does not wait for answers to. Calls him "commander" mockingly and "Ace" when it matters. Talks about feelings exclusively in terms of food.',
      topics: ['food', 'the crew', 'the divisions', 'jokes', 'who has not eaten', 'Devil Fruits'],
      voiceSamples: [
        'Sit. There. No, there, next to him, because you two haven’t said a word to each other in a month and I’m tired of it.',
        'You don’t eat when you’re angry. Everyone on this ship eats when they’re angry. It’s the whole point of the room.',
        'Teach asked me about fruits again. Third time this year. Man’s got a hobby.',
        'Commander. Commander. Look at me being respectful. Take the bowl.',
      ],
      appearance:
        'Solidly built adult man with a distinctive pompadour-swept dark hairstyle, easy open face, cook’s whites worn loose over pirate clothing, sleeves pushed up, always carrying something. Use the official design rather than inventing a generic cook from the name.',
      visualHook: 'The swept hair and a ladle used as a pointer.',
      silhouette: 'Broad, leaning forward, arms occupied, distinctive hair shape.',
      artSeed: 'ace-thatch-01',
      portrait: null,
      expressions: ['neutral', 'laughing', 'conspiratorial', 'serious', 'dying'],
      schedule: [
        { startMinute: 240, endMinute: 420, locationId: 'moby_dick_mess', activity: 'first sitting, cooking for hundreds' },
        { startMinute: 420, endMinute: 720, locationId: 'moby_dick_mess', activity: 'the galley, everything at once' },
        { startMinute: 720, endMinute: 1020, locationId: 'moby_dick_deck', activity: 'division work, visibly resenting it' },
        { startMinute: 1020, endMinute: 1320, locationId: 'moby_dick_mess', activity: 'evening sitting, the best hours of this ship' },
        { startMinute: 1320, endMinute: 1440, locationId: 'moby_dick_mess', activity: 'cleaning down, talking to whoever stayed' },
      ],
      homeLocationId: 'moby_dick_mess',
      knowledgeScope: ['thatch', 'moby_dick_mess', 'the_divisions', 'teach', 'the_crew'],
      startingRelationship: { trust: 60, affection: 65, respect: 45, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'thatch_mentions_teach',
          label: 'He says the thing about Teach and fruits',
          kind: 'TRUST',
          requires: { trust: 70, affection: 70 },
        },
      ],
      attributes: { might: 19, agility: 16, mind: 16, presence: 18, resolve: 18, arcana: 8 },
      companion: null,
      scouting: null,
      combatant: { health: 150, defenseDc: 22, damage: 20, tags: ['haki', 'fourth-division'] },
    },
    {
      id: 'teach',
      name: 'Marshall D. Teach',
      role: 'A Second Division man under your command, patient for decades, and the one person aboard who believes exactly what you believe and drew the opposite conclusion from it',
      cardBlurb:
        'He is loud, friendly, genuinely funny and has been waiting years for one specific opportunity. He believes a man should live without regret, which is your belief too. You attached yours to people. He attached his to whatever is in front of him.',
      pronouns: 'he/him',
      publicTraits: ['Enormous laugh, used constantly and as cover', 'Agrees with everybody', 'Talks about dreams never dying, sincerely'],
      hiddenDrives: [
        'He has been looking for one particular Devil Fruit for most of his adult life and has stayed on this ship because it is the best position in the world from which to find it',
        'He is entirely sincere about the philosophy and entirely willing to kill a friend over the opportunity, and does not experience those as a contradiction',
      ],
      values: [
        'Living without regret, which he means and has thought about more carefully than most people on this ship',
        'Patience — years of it — as the actual skill',
      ],
      fears: [
        'Pain, which he feels more than most men and hides badly',
        'Dying ordinary, having waited his whole life and missed it',
      ],
      socialStyle:
        'Backslapping, over-familiar, remembers your business and brings it up warmly. Never the one who introduces a subject. Laughs longest at the joke that reveals the most.',
      boundaries: [
        'Will not be drawn into a serious conversation he did not start',
        'Will not be somewhere he can be cornered',
      ],
      goals: [
        'Find the Yami Yami no Mi',
        'Stay aboard, useful and unremarkable, for as long as that takes',
      ],
      secrets: [
        {
          id: 'teach_hunting_a_fruit',
          fact: 'He knows what the Yami Yami no Mi is, what it does, and roughly where such a thing surfaces, and he has organised twenty years around being nearby when one does.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Nothing he says gives this up. Thatch’s galley remark, the ship’s manifests, or asking him a specific question about fruits twice in one week.',
        },
        {
          id: 'teach_will_kill_for_it',
          fact: 'He has already decided he will kill whoever is holding it, and has known this about himself for years without distress.',
          visibility: 'CREATOR_ONLY',
          revealHint: 'Not discoverable in advance. This becomes knowable the night Thatch dies and not before.',
        },
      ],
      speechStyle:
        'Loud, drawling, over-warm, heavy with laughter written into the line. Calls him "commander" with just enough weight to be deniable. Says the philosophical thing plainly and then laughs it off, every time.',
      topics: ['dreams', 'Devil Fruits', 'the crew', 'luck', 'the sea', 'what a man is owed'],
      voiceSamples: [
        'Zehahaha! People’s dreams never end, commander. You know that better than anybody on this boat.',
        'Twenty years I’ve been on this ship. Twenty. You think a man does that without a reason?',
        'That’s a hell of a thing you’ve got there. A hell of a thing.',
        'You and me, we’re the same animal. You just put yours in people.',
      ],
      appearance:
        'Huge heavy adult man, dark curly hair, scruffy black facial hair, missing and uneven teeth, a broad constant grin, open pirate clothing over a bare chest, heavy jewellery and necklaces. His silhouette must be ugly, huge and unmistakable — no sleek villain redesign.',
      visualHook: 'The gap-toothed grin, held slightly too long.',
      silhouette: 'Enormous and irregular, shoulders hunched forward, hair a dark mass.',
      artSeed: 'ace-teach-01',
      portrait: null,
      expressions: ['neutral', 'laughing', 'avid', 'in pain', 'cold'],
      schedule: [
        { startMinute: 0, endMinute: 480, locationId: 'moby_dick_deck', activity: 'asleep somewhere he should not be' },
        { startMinute: 480, endMinute: 780, locationId: 'moby_dick_mess', activity: 'eating, being everybody’s friend' },
        { startMinute: 780, endMinute: 1140, locationId: 'moby_dick_deck', activity: 'second division duties, adequately' },
        { startMinute: 1140, endMinute: 1440, locationId: 'moby_dick_mess', activity: 'drinking, listening to what comes up' },
      ],
      homeLocationId: 'moby_dick_deck',
      knowledgeScope: ['teach', 'moby_dick_deck', 'the_divisions', 'devil_fruits', 'the_crew'],
      startingRelationship: { trust: 50, affection: 40, respect: 55, fear: 0, rivalry: 30 },
      gates: [
        {
          id: 'teach_talks_philosophy',
          label: 'He says what he actually believes',
          kind: 'OTHER',
          requires: { trust: 60, flagsSet: ['whitebeard_commander'] },
        },
      ],
      attributes: { might: 24, agility: 13, mind: 20, presence: 20, resolve: 25, arcana: 18 },
      companion: null,
      scouting: null,
      combatant: { health: 190, defenseDc: 23, damage: 28, tags: ['patient', 'second-division', 'pain-sensitive'] },
    },
    {
      id: 'jinbe',
      name: 'Jinbe',
      role: 'A fish-man of enormous strength who fought you to a standstill over five days and has considered you a friend ever since',
      cardBlurb:
        'Neither of you could finish it and neither of you would stop, and at the end of it he decided you were somebody he would go to war for. He is the most composed person in this story and the only one who will tell you plainly that dying is not the same as winning.',
      pronouns: 'he/him',
      publicTraits: ['Formal courtesy in all circumstances', 'Will not strike first', 'Immovable once positioned'],
      hiddenDrives: [
        'He carries obligations from a life before this one and measures every allegiance against them',
        'He wants Ace to understand that his death would be a cost to other people, and has worked out that saying it directly will not land',
      ],
      values: [
        'An obligation honoured whatever it costs socially',
        'Not spending other people’s lives on your own conscience',
      ],
      fears: [
        'Being made to choose between two things he has promised',
        'Watching a young man he respects walk into something avoidable',
      ],
      socialStyle:
        'Grave, courteous, unhurried. Uses full titles. Sits down before difficult conversations and stays sitting. Absolutely unembarrassed by sincerity.',
      boundaries: [
        'Will not break a given word, including inconvenient ones',
        'Will not fight somebody who has stopped fighting him',
      ],
      goals: [
        'Keep this one alive through whatever he has decided to do',
        'Honour every obligation at once, which will eventually prove impossible',
      ],
      secrets: [],
      speechStyle:
        'Measured, formal, complete. Addresses him as "Ace-san". Long steady sentences with the important clause at the end. Never interrupts and does not hurry to fill a silence.',
      topics: ['obligation', 'the sea', 'Whitebeard', 'strength', 'what is owed', 'the war'],
      voiceSamples: [
        'Five days, Ace-san. Neither of us could finish it. I have thought about that more than I have thought about most victories.',
        'You are not obliged to die in order to be worth something. I am aware you will disregard this. I am saying it anyway.',
        'I have given my word in two directions. One of them is going to break, and I would rather it were not the one holding you.',
        'Sit. This will take a moment and it should not be shouted.',
      ],
      appearance:
        'Enormous blue whale-shark fish-man with a stocky sumo-like build, blue skin, tusk-like lower fangs, yellow sideburn and brow accents, a prominent scar near the left eye, dark hair in a topknot, traditional kimono-styled robe, sandals. Not a blue human — the proportions and features are a fish-man’s.',
      visualHook: 'The tusks and the scar, and the composure of a very large person who never needs to demonstrate it.',
      silhouette: 'Immensely broad and low, robe falling in heavy lines, topknot at the crown.',
      artSeed: 'ace-jinbe-01',
      portrait: null,
      expressions: ['neutral', 'grave', 'fond', 'resolute', 'grieving'],
      schedule: [
        { startMinute: 360, endMinute: 720, locationId: 'grand_line_port', activity: 'ship business, formally conducted' },
        { startMinute: 720, endMinute: 1080, locationId: 'grand_line_port', activity: 'obligations of a Warlord he did not want' },
        { startMinute: 1080, endMinute: 1380, locationId: 'grand_line_port', activity: 'drinking slowly with whoever is worth it' },
      ],
      homeLocationId: null,
      knowledgeScope: ['jinbe', 'the_sea', 'whitebeard', 'warlords', 'impel_down', 'fish-men'],
      startingRelationship: { trust: 55, affection: 50, respect: 80, fear: 0, rivalry: 40 },
      gates: [
        {
          id: 'jinbe_will_come_for_you',
          label: 'He will come for you, wherever you are',
          kind: 'ALLIANCE',
          requires: { respect: 85, affection: 65, flagsSet: ['fought_jinbe'] },
        },
      ],
      attributes: { might: 26, agility: 16, mind: 19, presence: 21, resolve: 27, arcana: 22 },
      companion: null,
      scouting: null,
      combatant: { health: 260, defenseDc: 25, damage: 27, tags: ['fish-man-karate', 'haki', 'immovable'] },
    },
    {
      id: 'akainu',
      name: 'Sakazuki',
      role: 'A Marine admiral who has read you accurately, and who understands that the fastest way to kill a proud man is to say something about his father',
      cardBlurb:
        'He does not hate you. He has assessed you, identified the mechanism, and intends to use it, because he believes the last war happened because somebody was merciful. He will insult the man who chose you, and he will be entirely calm while doing it.',
      pronouns: 'he/him',
      publicTraits: ['Absolute and unhurried', 'States consequences rather than threats', 'Kills deserters, including his own'],
      hiddenDrives: [
        'He believes any pirate left alive is a future war, and has done the arithmetic on how many lives that costs, and the arithmetic is not obviously wrong',
        'He has identified pride as the exploitable structure in this particular prisoner and has prepared the sentence he intends to use',
      ],
      values: [
        'Justice without exception, applied to himself as readily as to anybody',
        'Preventing the next war by ending this one completely',
      ],
      fears: [
        'A settlement. Anything that leaves the problem partly alive',
      ],
      socialStyle:
        'Flat, deliberate, unraised. Does not gloat and does not explain. Delivers the provocation in the same register as an order, which is what makes it work.',
      boundaries: [
        'Will not negotiate for a prisoner',
        'Will not be hurried by anybody, including his own command',
      ],
      goals: [
        'End the Whitebeard era at this location on this day',
        'Ensure the demonstration is complete rather than merely successful',
      ],
      secrets: [
        {
          id: 'akainu_reads_pride',
          fact: 'He has read the file and concluded that the prisoner cannot leave an insult to Newgate unanswered, and has planned around it.',
          visibility: 'CREATOR_ONLY',
          revealHint: 'Not learnable from him. A Marine source, an intercepted order, or somebody who has served under him.',
        },
      ],
      speechStyle:
        'Short, level, absolute. No exclamation and no relish. Calls him "Portgas" or "the prisoner". The insult is phrased as a statement of fact about a dead era, which is precisely why it lands.',
      topics: ['justice', 'the era', 'Whitebeard', 'the Government', 'what must be finished'],
      voiceSamples: [
        'Portgas. You are not a person today. You are a demonstration, and demonstrations are permitted to run.',
        'Your captain was a failure who mistook a crew for a family. His era ends here and it ends badly, as it should.',
        'Running. Of course. It is what his sons do.',
        'Mercy is how the last one started. I will not be the reason for the next.',
      ],
      appearance:
        'Very tall, broad and heavily muscled, stern square face, short dark hair, white Marine admiral cap, a dark red floral shirt visible beneath a white justice coat worn over the shoulders, severe expression. Magma effects in dark red, orange and black only while using the fruit — no permanent lava form.',
      visualHook: 'The white coat over a floral shirt, and a face that has never once been surprised.',
      silhouette: 'Square and heavy, coat hanging straight from the shoulders, cap flat across the brow.',
      artSeed: 'ace-akainu-01',
      portrait: null,
      expressions: ['neutral', 'severe', 'contemptuous', 'implacable'],
      schedule: [
        { startMinute: 0, endMinute: 1440, locationId: 'marineford_battlefield', activity: 'the war, methodically' },
      ],
      homeLocationId: 'marineford_battlefield',
      knowledgeScope: ['akainu', 'the_marines', 'world_government', 'marineford_battlefield', 'whitebeard', 'roger'],
      startingRelationship: { trust: 0, affection: 0, respect: 20, fear: 0, rivalry: 70 },
      gates: [],
      attributes: { might: 28, agility: 19, mind: 22, presence: 24, resolve: 28, arcana: 27 },
      companion: null,
      scouting: null,
      combatant: { health: 300, defenseDc: 29, damage: 40, tags: ['magu-magu', 'haki', 'admiral', 'logia'] },
    },
    {
      id: 'shanks',
      name: 'Red-Haired Shanks',
      role: 'An emperor of the sea who gave your little brother a hat, and who becomes an entirely different person the moment you mention his name',
      cardBlurb:
        'You came to thank him, or to measure him, or both, and you were braced for a monster. Then you said Luffy’s name and the room changed. He is the only person in this story who treats your famous bloodline as ordinary, because he has met people like that before.',
      pronouns: 'he/him',
      publicTraits: ['Relaxed to the point of insult', 'Drinks with anybody', 'Enormous presence he never mentions'],
      hiddenDrives: [
        'He is trying to work out what the boy with the hat is turning into, and takes news of him from anywhere',
        'He knew Roger and has decided the son is not a problem to be managed, which puts him at odds with most of the world',
      ],
      values: [
        'Not making a young person carry a legend they did not ask for',
        'Drinking with people rather than about them',
      ],
      fears: [
        'Losing another era to the same argument',
      ],
      socialStyle:
        'Warm, unserious, physically easy, and abruptly unmistakable when something matters. Turns a confrontation into a drink without appearing to have done anything.',
      boundaries: [
        'Will not fight somebody who came to thank him',
        'Will not discuss what Roger said to him',
      ],
      goals: [
        'Hear how the boy is doing',
        'Send this one away in a better state than he arrived in',
      ],
      secrets: [
        {
          id: 'shanks_knew_roger',
          fact: 'He sailed under Roger and was aboard at the end. He knows exactly whose son this is and has known since before Ace arrived.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He will confirm it easily and refuse to expand on it, which is more unsettling than the refusal of anybody who is hiding it.',
        },
      ],
      speechStyle:
        'Easy, amused, conversational, glass in hand. Uses names warmly. Delivers something enormous in a throwaway clause and moves straight on to another question about Luffy.',
      topics: ['Luffy', 'the hat', 'drinking', 'Roger', 'the era', 'Whitebeard'],
      voiceSamples: [
        'Wait — Luffy? Straw hat, no volume control, eats like a siege? Sit down. Sit down, you’re having one with me.',
        'You’ve got his face when you’re annoyed. Not his eyes. Hers, probably. Anyway — drink.',
        'I’m not going to fight you. You came here to thank me. That’s a terrible reason to hit someone.',
        'What Roger said to me is mine. Everything else you can have.',
      ],
      appearance:
        'Adult man with red hair, three parallel scars over the left eye, left arm missing at the shoulder in the present timeline, black cloak worn open, loose open shirt, sash, the sword Gryphon at his hip. Relaxed posture and enormous presence — never a generic red-haired swordsman.',
      visualHook: 'Three scars over one eye, and an empty sleeve nobody comments on.',
      silhouette: 'Cloak asymmetric where the arm is missing, hair loose, weight on one hip.',
      artSeed: 'ace-shanks-01',
      portrait: null,
      expressions: ['neutral', 'delighted', 'serious', 'drunk', 'formidable'],
      schedule: [
        { startMinute: 600, endMinute: 1440, locationId: 'grand_line_port', activity: 'drinking, and hearing everything said in the room' },
      ],
      homeLocationId: null,
      knowledgeScope: ['shanks', 'luffy', 'the_hat', 'roger', 'the_era', 'whitebeard', 'grand_line_port'],
      startingRelationship: { trust: 40, affection: 35, respect: 45, fear: 0, rivalry: 20 },
      gates: [
        {
          id: 'shanks_confirms_roger',
          label: 'He confirms he sailed with your father',
          kind: 'TRUST',
          requires: { trust: 55, flagsSet: ['spoke:shanks'] },
        },
      ],
      attributes: { might: 27, agility: 24, mind: 22, presence: 29, resolve: 26, arcana: 29 },
      companion: null,
      scouting: null,
      combatant: { health: 300, defenseDc: 30, damage: 38, tags: ['conquerors-haki', 'emperor', 'swordsman'] },
    },
  ],
  /**
   * The famous events, as pressures rather than chapters.
   *
   * This is §135 and §136 implemented literally. Every quest after the first
   * has a `discoverWhen` that can simply never be satisfied, and every fork is
   * a `succeedWhenAny` route that sets one flag and closes another. Nothing
   * here re-arms. If `sabo_alive` is still true, `q_sabo_departure` finishes
   * on a route that shuts the drowning permanently, and no later quest invents
   * a substitute — the bible calls that destiny correction and forbids it.
   *
   * The one quest that starts active is the brother question, because that is
   * the only thing actually happening on the morning the story opens.
   */
  quests: [
    {
      id: 'q_luffy',
      title: 'The One Who Will Not Go Home',
      summary:
        'There is a seven-year-old thirty feet behind you and he has been there for eleven days. You have tried shouting, hiding, walking faster and one genuinely cruel thing, and none of it has worked.',
      kind: 'MAIN',
      discoverWhen: null,
      startsActive: true,
      involvedCharacterIds: ['luffy', 'sabo', 'dadan'],
      involvedLocationIds: ['mt_colubo', 'asl_treehouse', 'dadan_house'],
      knownRewardCopy: 'Whatever he turns out to be to you.',
      steps: [
        {
          id: 'q_luffy_decide',
          playerCopy: 'Decide what Luffy is to you.',
          directorNotes:
            'Do not resolve this in one beat and do not let the world nudge towards brotherhood. §14 is explicit that rejection is a real and durable outcome and that Luffy may keep trying regardless. If the player shuts him out, he is still there tomorrow, and the tenth day of being shut out should be genuinely uncomfortable for everybody including the player.',
          enterWhen: null,
          succeedWhenAny: [
            {
              routeId: 'accept',
              label: 'You let him keep up',
              predicate: { minRelationship: [{ characterId: 'luffy', dimension: 'trust', value: 70 }] },
              setsFlags: ['luffy_accepted'],
              closesFlags: ['luffy_never_accepted'],
            },
            {
              routeId: 'test',
              label: 'You make him earn it',
              predicate: { flagsSet: ['luffy_tested'] },
              setsFlags: ['luffy_accepted', 'luffy_earned_it'],
              closesFlags: ['luffy_never_accepted'],
            },
            {
              routeId: 'refuse',
              label: 'You shut him out and mean it',
              predicate: { flagsSet: ['luffy_refused_repeatedly'] },
              setsFlags: ['luffy_never_accepted'],
              closesFlags: ['asl_brotherhood'],
            },
          ],
          succeedWhen: null,
          failWhen: null,
          deadlineWorldMinute: null,
          hiddenUntilEntered: false,
          rewards: { xp: 40, items: [], flags: [] },
        },
        {
          id: 'q_luffy_cups',
          playerCopy: 'If it has earned it: three cups, in the treehouse, with no adult present.',
          directorNotes:
            '§24 — the ceremony happens only if the relationship has earned it, and never because the story expects it. A player who reaches adulthood without this has a different family, not a missed unlock. If Sabo is already gone, two cups and a poured third is the shape of it.',
          enterWhen: { flagsSet: ['luffy_accepted'] },
          succeedWhen: {
            hasItems: ['sake_cups'],
            minRelationship: [
              { characterId: 'luffy', dimension: 'affection', value: 85 },
              { characterId: 'sabo', dimension: 'affection', value: 85 },
            ],
          },
          succeedWhenAny: [],
          failWhen: null,
          deadlineWorldMinute: null,
          hiddenUntilEntered: true,
          rewards: { xp: 90, items: [], flags: ['asl_brotherhood'] },
        },
      ],
    },
    {
      id: 'q_sabo_departure',
      title: 'The Boat From High Town',
      summary:
        'Sabo has been strange all week. There is a World Noble coming to Goa, there are men clearing the Terminal, and there is a family on the other side of the wall who have never stopped looking for him.',
      kind: 'MAIN',
      discoverWhen: { flagsSet: ['spoke:sabo'], flagsUnset: ['sabo_dead', 'sabo_gone'] },
      startsActive: false,
      involvedCharacterIds: ['sabo', 'luffy', 'dadan'],
      involvedLocationIds: ['gray_terminal', 'goa_high_town', 'dawn_shore', 'asl_treehouse'],
      knownRewardCopy: 'Whether he is on the water when it happens.',
      steps: [
        {
          id: 'q_sabo_know',
          playerCopy: 'Find out what Sabo is not telling you.',
          directorNotes:
            'He is sitting on two things: which house he is from, and what he has overheard about the Terminal. Pressing him about the Terminal gets a lie. Pressing him about why he has been strange gets the truth, eventually. Do not let the narrator hand this over.',
          enterWhen: null,
          succeedWhen: { flagsSet: ['knows_about_the_burning'] },
          succeedWhenAny: [],
          failWhen: null,
          deadlineWorldMinute: null,
          hiddenUntilEntered: false,
          rewards: { xp: 50, items: [], flags: [] },
        },
        {
          id: 'q_sabo_sea',
          playerCopy: 'Sabo is getting on a boat. Decide what happens to it.',
          directorNotes:
            'THE fork of the childhood. §37 says the player can save him and §136 forbids killing him another way afterwards. If he lives, he will very likely still leave — §38 — and leaving alive is a completely different wound from drowning. Do not let the saving route also be the route where he stays; that is too cheap for what it costs elsewhere.',
          enterWhen: { flagsSet: ['knows_about_the_burning'] },
          succeedWhenAny: [
            {
              routeId: 'sails_and_is_struck',
              label: 'He sails alone and something enormous comes over the horizon',
              predicate: { flagsSet: ['sabo_sailed_alone'] },
              setsFlags: ['sabo_dead', 'sabo_gone'],
              closesFlags: ['sabo_alive'],
            },
            {
              routeId: 'stopped',
              label: 'You are on the jetty and he does not get on it',
              predicate: { flagsSet: ['stopped_sabo_sailing'] },
              setsFlags: ['sabo_alive'],
              closesFlags: ['sabo_dead'],
            },
            {
              routeId: 'goes_with_him',
              label: 'You go with him, and whatever comes over the horizon finds two of you',
              predicate: { flagsSet: ['sailed_with_sabo'] },
              setsFlags: ['sabo_alive', 'left_dawn_island', 'left_with_sabo'],
              closesFlags: ['sabo_dead', 'left_alone'],
            },
            {
              routeId: 'revolutionaries',
              label: 'He is pulled out of the water by a ship with a different flag',
              predicate: { flagsSet: ['sabo_taken_by_revolutionaries'] },
              setsFlags: ['sabo_alive', 'sabo_gone', 'sabo_revolutionary'],
              closesFlags: ['sabo_dead'],
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
      id: 'q_leaving',
      title: 'Seventeen',
      summary:
        'The can has been full for years. You said you would go at seventeen and you are seventeen, and the only remaining question is how many people are in the boat.',
      kind: 'MAIN',
      discoverWhen: { flagsUnset: ['left_dawn_island'], afterWorldMinute: 3600 },
      startsActive: false,
      involvedCharacterIds: ['luffy', 'dadan', 'garp', 'sabo'],
      involvedLocationIds: ['dawn_shore', 'dadan_house', 'asl_treehouse'],
      knownRewardCopy: 'The sea, and whoever is on it with you.',
      steps: [
        {
          id: 'q_leaving_go',
          playerCopy: 'Leave Dawn Island.',
          directorNotes:
            '§41 allows taking Luffy, which is a large divergence — a seventeen-year-old and a fourteen-year-old at sea together changes every crew beat downstream and must not be quietly corrected. Dadan does not come to the shore and is visible on the ridge. Garp knows and does not stop it, and that costs him something.',
          enterWhen: null,
          succeedWhenAny: [
            {
              routeId: 'alone',
              label: 'Alone, three years ahead of him, as agreed',
              predicate: { flagsSet: ['departed_alone'] },
              setsFlags: ['left_dawn_island', 'left_alone'],
              closesFlags: ['left_with_luffy'],
            },
            {
              routeId: 'with_luffy',
              label: 'With Luffy, who was never going to accept being left',
              predicate: { flagsSet: ['departed_with_luffy'] },
              setsFlags: ['left_dawn_island', 'left_with_luffy'],
              closesFlags: ['left_alone'],
            },
            {
              routeId: 'marine',
              label: 'With Garp, in the other direction',
              predicate: { flagsSet: ['took_garps_offer'] },
              setsFlags: ['left_dawn_island', 'became_marine'],
              closesFlags: ['left_alone', 'spade_pirates_formed'],
            },
            {
              routeId: 'stayed',
              label: 'You do not go',
              predicate: { flagsSet: ['refused_to_leave'] },
              setsFlags: ['stayed_on_dawn_island'],
              closesFlags: ['left_dawn_island'],
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
      id: 'q_sixis',
      title: 'The Island Neither Of You Meant To Be On',
      summary:
        'You are stranded, there is one other man here, and he does not want to be a pirate. There is also a crate on the beach with a fruit in it.',
      kind: 'MAIN',
      discoverWhen: { flagsSet: ['left_dawn_island'], atLocation: 'sixis' },
      startsActive: false,
      involvedCharacterIds: ['deuce'],
      involvedLocationIds: ['sixis', 'spade_ship'],
      knownRewardCopy: 'A first mate, and a decision about fire.',
      steps: [
        {
          id: 'q_sixis_deuce',
          playerCopy: 'Get Deuce to stay.',
          directorNotes:
            '§43 — he experiences Ace before the legend, and that only means anything if he is initially unimpressed. He should refuse at least twice for concrete practical reasons and be won round by something Ace does rather than says.',
          enterWhen: null,
          succeedWhen: { minRelationship: [{ characterId: 'deuce', dimension: 'trust', value: 60 }] },
          succeedWhenAny: [],
          failWhen: null,
          deadlineWorldMinute: null,
          hiddenUntilEntered: false,
          rewards: { xp: 80, items: [], flags: ['spade_pirates_formed'] },
        },
        {
          id: 'q_sixis_fruit',
          playerCopy: 'Decide what happens to the Mera Mera no Mi.',
          directorNotes:
            '§45 and §46. Four real options and no default. If he does not eat it the world adapts — he is a physical fighter who later learns Haki, and nothing invents a second fire fruit for him. If Deuce eats it, the crew has a Logia who is not the captain, which changes every fight for the rest of the story.',
          enterWhen: { hasItems: ['mera_mera'] },
          succeedWhenAny: [
            {
              routeId: 'eat',
              label: 'You eat it',
              predicate: { flagsSet: ['ate_mera_mera'] },
              setsFlags: ['ate_mera_mera', 'cannot_swim'],
              closesFlags: ['deuce_has_fire', 'no_fire_route'],
            },
            {
              routeId: 'give',
              label: 'You give it to Deuce',
              predicate: { flagsSet: ['gave_fruit_to_deuce'] },
              setsFlags: ['deuce_has_fire', 'no_fire_route'],
              closesFlags: ['ate_mera_mera'],
            },
            {
              routeId: 'sell',
              label: 'You sell it and buy something that floats',
              predicate: { flagsSet: ['sold_the_fruit'] },
              setsFlags: ['no_fire_route', 'sold_the_fruit'],
              closesFlags: ['ate_mera_mera', 'deuce_has_fire'],
            },
            {
              routeId: 'leave',
              label: 'You leave it in the crate',
              predicate: { flagsSet: ['left_the_fruit'] },
              setsFlags: ['no_fire_route'],
              closesFlags: ['ate_mera_mera', 'deuce_has_fire'],
            },
          ],
          succeedWhen: null,
          failWhen: null,
          deadlineWorldMinute: null,
          hiddenUntilEntered: true,
          rewards: { xp: 110, items: [], flags: [] },
        },
      ],
    },
    {
      id: 'q_whitebeard',
      title: 'The Strongest Man Alive',
      summary:
        'You came into the New World intending to take the biggest thing in it. The biggest thing in it has offered you a drink instead, eleven times.',
      kind: 'MAIN',
      discoverWhen: { flagsSet: ['spade_pirates_formed'], flagsUnset: ['became_marine'] },
      startsActive: false,
      involvedCharacterIds: ['whitebeard', 'marco', 'thatch', 'deuce'],
      involvedLocationIds: ['moby_dick_deck', 'moby_dick_mess', 'grand_line_port'],
      knownRewardCopy: 'A father, if you can stand to have one.',
      steps: [
        {
          id: 'q_wb_challenge',
          playerCopy: 'Challenge Edward Newgate.',
          directorNotes:
            '§61 — this is not one fight. He tries, repeatedly, and is overwhelmed each time, and it becomes almost domestic. Play the absurdity: the crew stops looking up after the fourth attempt and Thatch starts keeping a tally in the galley. §62 permits the player to actually win, which ends the Whitebeard era early and should not be softened.',
          enterWhen: null,
          succeedWhenAny: [
            {
              routeId: 'lost_repeatedly',
              label: 'Eleven attempts, eleven failures, and an old man who keeps offering',
              predicate: { flagsSet: ['challenged_whitebeard'] },
              setsFlags: ['challenged_whitebeard', 'found_whitebeard'],
              closesFlags: [],
            },
            {
              routeId: 'won',
              label: 'You actually beat him',
              predicate: { flagsSet: ['defeated_whitebeard'] },
              setsFlags: ['defeated_whitebeard', 'found_whitebeard'],
              closesFlags: ['whitebeard_commander'],
            },
          ],
          succeedWhen: null,
          failWhen: null,
          deadlineWorldMinute: null,
          hiddenUntilEntered: false,
          rewards: { xp: 130, items: [], flags: [] },
        },
        {
          id: 'q_wb_mark',
          playerCopy: 'Decide whether to accept the mark.',
          directorNotes:
            '§63 and §64 — refusing is real and permanent, and the Spade Pirates continuing as an independent crew is a supported long-term route. Accepting is the answer to the birth wound and should be played as harder than the fighting was: he is being offered exactly the thing he has decided he does not deserve.',
          enterWhen: { flagsSet: ['challenged_whitebeard'] },
          succeedWhenAny: [
            {
              routeId: 'accept',
              label: 'You take the mark',
              predicate: { hasItems: ['whitebeard_mark'] },
              setsFlags: ['whitebeard_commander', 'accepted_family'],
              closesFlags: ['refused_whitebeard'],
            },
            {
              routeId: 'refuse',
              label: 'You stay your own captain',
              predicate: { flagsSet: ['refused_whitebeard'] },
              setsFlags: ['refused_whitebeard', 'spade_independent'],
              closesFlags: ['whitebeard_commander'],
            },
          ],
          succeedWhen: null,
          failWhen: null,
          deadlineWorldMinute: null,
          hiddenUntilEntered: true,
          rewards: { xp: 150, items: [{ itemId: 'whitebeard_mark', qty: 1 }], flags: [] },
        },
      ],
    },
    {
      id: 'q_teach',
      title: 'A Man Under Your Command',
      summary:
        'Thatch is dead, Teach did it, Teach is gone, and Teach was in your division. Your father has asked you — asked, not ordered — to let this one go.',
      kind: 'MAIN',
      discoverWhen: { flagsSet: ['whitebeard_commander', 'thatch_dead'] },
      startsActive: false,
      involvedCharacterIds: ['teach', 'whitebeard', 'marco', 'thatch'],
      involvedLocationIds: ['moby_dick_deck', 'moby_dick_mess', 'grand_line_port', 'banaro'],
      knownRewardCopy: 'Nothing. This one only costs.',
      steps: [
        {
          id: 'q_teach_decide',
          playerCopy: 'Decide whether to go after him.',
          directorNotes:
            '§77 and §78, and the most important fork in the world. Do not skip from the death to the chase — §76 wants the crew reacting, the galley empty, and Ace working out that this happened under his authority. Whitebeard asks rather than orders, which is what makes refusing possible and makes obeying feel like being told he is not enough. §133: the cards are active, not introspective.',
          enterWhen: null,
          succeedWhenAny: [
            {
              routeId: 'alone',
              label: 'You go, and you go alone',
              predicate: { flagsSet: ['pursued_teach_alone'] },
              setsFlags: ['pursuing_teach', 'went_alone'],
              closesFlags: ['listened_to_whitebeard'],
            },
            {
              routeId: 'with_a_team',
              label: 'You go, and you take people with you',
              predicate: { flagsSet: ['pursued_teach_with_team'] },
              setsFlags: ['pursuing_teach', 'took_a_team'],
              closesFlags: ['listened_to_whitebeard', 'went_alone'],
            },
            {
              routeId: 'listened',
              label: 'You stop at the rail and let him explain why not',
              predicate: { flagsSet: ['listened_to_whitebeard'] },
              setsFlags: ['listened_to_whitebeard'],
              closesFlags: ['pursuing_teach', 'ace_captured'],
            },
          ],
          succeedWhen: null,
          failWhen: null,
          deadlineWorldMinute: null,
          hiddenUntilEntered: false,
          rewards: { xp: 160, items: [], flags: [] },
        },
        {
          id: 'q_teach_banaro',
          playerCopy: 'Banaro Island.',
          directorNotes:
            '§90 to §94. Four outcomes and defeat is only one of them: §92 allows retreat, §93 allows reinforcements to actually arrive in time, and §94 allows him to accept Teach’s offer. §136 is explicit that retreating here does not get him captured at the next island instead.',
          enterWhen: { flagsSet: ['pursuing_teach'] },
          succeedWhenAny: [
            {
              routeId: 'lost',
              label: 'You lose, and he hands you to the Government',
              predicate: { flagsSet: ['lost_at_banaro'] },
              setsFlags: ['ace_captured', 'teach_ascendant'],
              closesFlags: ['teach_defeated'],
            },
            {
              routeId: 'won',
              label: 'You finish it',
              predicate: { flagsSet: ['defeated_teach'] },
              setsFlags: ['teach_defeated'],
              closesFlags: ['ace_captured', 'teach_ascendant'],
            },
            {
              routeId: 'retreat',
              label: 'You break off and live',
              predicate: { flagsSet: ['retreated_from_banaro'] },
              setsFlags: ['teach_ascendant', 'retreated_from_teach'],
              closesFlags: ['ace_captured'],
            },
            {
              routeId: 'joined',
              label: 'You take his hand',
              predicate: { flagsSet: ['joined_teach'] },
              setsFlags: ['joined_teach'],
              closesFlags: ['ace_captured', 'teach_defeated', 'accepted_family'],
            },
          ],
          succeedWhen: null,
          failWhen: null,
          deadlineWorldMinute: null,
          hiddenUntilEntered: true,
          rewards: { xp: 200, items: [], flags: [] },
        },
      ],
    },
    {
      id: 'q_marineford',
      title: 'The Demonstration',
      summary:
        'You are in seastone on a raised stone platform in front of the world’s press, and everybody who ever chose you is coming here to die about it.',
      kind: 'MAIN',
      discoverWhen: { flagsSet: ['ace_captured'] },
      startsActive: false,
      involvedCharacterIds: ['whitebeard', 'akainu', 'luffy', 'marco', 'garp', 'jinbe'],
      involvedLocationIds: ['impel_down', 'marineford_platform', 'marineford_battlefield'],
      knownRewardCopy: 'An answer to the question you have carried since you were eight.',
      steps: [
        {
          id: 'q_mf_cell',
          playerCopy: 'Level Six. Decide what you are willing to be talked out of.',
          directorNotes:
            '§97 and §98: Garp comes, and the player can genuinely work on him. This is also the last chance to move Worth before the platform, and the resource is what decides whether being rescued is survivable. Play the cell quiet and long. Nobody in it is performing.',
          enterWhen: null,
          succeedWhen: { flagsSet: ['execution_scheduled'] },
          succeedWhenAny: [],
          failWhen: null,
          deadlineWorldMinute: null,
          hiddenUntilEntered: false,
          rewards: { xp: 100, items: [], flags: [] },
        },
        {
          id: 'q_mf_freed',
          playerCopy: 'They are actually going to reach you.',
          directorNotes:
            '§105 — this must feel like an impossible victory before the story asks its cruellest question. Count the cost out loud: who is down, who is still standing, what it took. Do not editorialise about whether he deserved it.',
          enterWhen: { flagsSet: ['war_began'] },
          succeedWhen: { flagsSet: ['ace_freed'] },
          succeedWhenAny: [],
          failWhen: { flagsSet: ['ace_executed'] },
          deadlineWorldMinute: null,
          hiddenUntilEntered: true,
          rewards: { xp: 160, items: [], flags: [] },
        },
        {
          id: 'q_mf_the_old_man',
          playerCopy: 'Whatever else happens here, it happens to him too.',
          directorNotes:
            '§112 and §113. Newgate came here intending to spend himself and is already ill — Marco has the numbers. The canon route is that he pays in full, and the epilogue of nearly every ending in this world depends on which way this went, so it must resolve rather than being left implied. Surviving requires the player to have changed something upstream that actually mattered: the war shorter, the prisoner out sooner, Teach never ascendant, or the whole thing never assembled. Do not grant it as a reward for sentiment.',
          enterWhen: { flagsSet: ['war_began'] },
          succeedWhenAny: [
            {
              routeId: 'he_pays',
              label: 'He stays standing until it is finished, and then he does not',
              predicate: { flagsSet: ['whitebeard_fell'] },
              setsFlags: ['whitebeard_dead'],
              closesFlags: [],
            },
            {
              routeId: 'he_walks_away',
              label: 'He walks off this island',
              predicate: { flagsSet: ['whitebeard_withdrew'] },
              setsFlags: [],
              closesFlags: ['whitebeard_dead'],
            },
          ],
          succeedWhen: null,
          failWhen: null,
          deadlineWorldMinute: null,
          hiddenUntilEntered: true,
          rewards: { xp: 140, items: [], flags: [] },
        },
        {
          id: 'q_mf_provocation',
          playerCopy: 'An admiral says something about the man who chose you.',
          directorNotes:
            'The whole story arrives here. §106 — a major explicit free choice with no moralising in either direction, and the four cards from the bible are the right four. Pride and Worth both read here: high Pride and low Worth make turning back feel like the only honourable option available, and that is precisely the trap the bible built. §107 — if he keeps running he survives, and nothing drops a meteor on him afterwards.',
          enterWhen: { flagsSet: ['ace_freed'] },
          succeedWhenAny: [
            {
              routeId: 'turned_back',
              label: 'You stop and make him say it again',
              predicate: { flagsSet: ['turned_back_at_akainu'] },
              setsFlags: ['turned_back_at_akainu'],
              closesFlags: ['ace_survived'],
            },
            {
              routeId: 'kept_running',
              label: 'You keep moving',
              predicate: { flagsSet: ['kept_running'] },
              setsFlags: ['ace_survived', 'kept_running'],
              closesFlags: ['turned_back_at_akainu'],
            },
            {
              routeId: 'dragged',
              label: 'You look at Luffy once and let somebody else decide for you',
              predicate: { flagsSet: ['let_luffy_drag_you'] },
              setsFlags: ['ace_survived', 'accepted_being_saved'],
              closesFlags: ['turned_back_at_akainu'],
            },
            {
              routeId: 'laughed',
              label: 'You laugh at him over your shoulder',
              predicate: { flagsSet: ['laughed_at_akainu'] },
              setsFlags: ['ace_survived', 'laughed_at_akainu'],
              closesFlags: ['turned_back_at_akainu'],
            },
          ],
          succeedWhen: null,
          failWhen: null,
          deadlineWorldMinute: null,
          hiddenUntilEntered: true,
          rewards: { xp: 260, items: [], flags: [] },
        },
      ],
    },
    {
      id: 'q_haki',
      title: 'Will, In The Hands',
      summary:
        'There is a thing the strong ones can do that nobody has ever offered to explain, and it is the reason fire is not enough.',
      kind: 'LEAD',
      discoverWhen: { flagsSet: ['found_whitebeard'] },
      startsActive: false,
      involvedCharacterIds: ['marco', 'whitebeard', 'jinbe'],
      involvedLocationIds: ['moby_dick_deck', 'grand_line_port'],
      knownRewardCopy: 'The ability to hit somebody the fire cannot touch.',
      steps: [
        {
          id: 'q_haki_learn',
          playerCopy: 'Get somebody to teach you.',
          directorNotes:
            '§126 to §128. Nobody on Dawn Island can teach this and nobody there will admit it exists, so it cannot be acquired before the New World. It comes from a person who has decided he is worth the time — Marco out of exasperation after the fourth time fire failed, Newgate by simply doing it in front of him until he sees it, or Jinbe formally and patiently over days. It is never a level-up and never self-taught. For a player on the no-fire route this is the whole combat answer rather than a supplement, and should arrive sooner and matter more.',
          enterWhen: null,
          succeedWhenAny: [
            {
              routeId: 'marco',
              label: 'Marco, irritably, after the fire failed again',
              predicate: { minRelationship: [{ characterId: 'marco', dimension: 'trust', value: 65 }] },
              setsFlags: ['learned_haki'],
              closesFlags: [],
            },
            {
              routeId: 'newgate',
              label: 'The old man, by doing it in front of you until you see it',
              predicate: { minRelationship: [{ characterId: 'whitebeard', dimension: 'respect', value: 60 }] },
              setsFlags: ['learned_haki'],
              closesFlags: [],
            },
            {
              routeId: 'jinbe',
              label: 'Jinbe, formally, over several days',
              predicate: { flagsSet: ['fought_jinbe'] },
              setsFlags: ['learned_haki'],
              closesFlags: [],
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
      id: 'q_the_name',
      title: 'Whose Son',
      summary:
        'Somewhere there is a record with two names on it. You have spent your life not asking, because asking is confirming.',
      kind: 'LEAD',
      discoverWhen: { flagsSet: ['spoke:garp'] },
      startsActive: false,
      involvedCharacterIds: ['garp', 'shanks', 'whitebeard', 'dadan'],
      involvedLocationIds: ['dadan_house', 'grand_line_port', 'moby_dick_deck'],
      knownRewardCopy: 'Confirmation, which is not the same as relief.',
      steps: [
        {
          id: 'q_name_confirm',
          playerCopy: 'Find out, from somebody who actually knows.',
          directorNotes:
            '§33 is the rule that matters: nothing may hand him a memory of Rouge. Four people can tell him something — Garp (most, hardest), Dadan (the paper), Shanks (confirms and refuses to expand), Newgate (knew Roger and finds the whole question funny). Each gives a different piece and none of them gives all of it.',
          enterWhen: null,
          succeedWhenAny: [
            {
              routeId: 'garp',
              label: 'Garp finally answers',
              predicate: { flagsSet: ['garp_confirmed_roger'] },
              setsFlags: ['knows_about_roger'],
              closesFlags: [],
            },
            {
              routeId: 'paper',
              label: 'Dadan produces the paper',
              predicate: { hasItems: ['roger_record'] },
              setsFlags: ['knows_about_roger'],
              closesFlags: [],
            },
            {
              routeId: 'shanks',
              label: 'A man who was there confirms it and says nothing else',
              predicate: { flagsSet: ['shanks_confirmed_roger'] },
              setsFlags: ['knows_about_roger'],
              closesFlags: [],
            },
          ],
          succeedWhen: null,
          failWhen: null,
          deadlineWorldMinute: null,
          hiddenUntilEntered: false,
          rewards: { xp: 90, items: [], flags: [] },
        },
        {
          id: 'q_name_decide',
          playerCopy: 'Decide what the name is going to be.',
          directorNotes:
            '§35, §123, §124, §125 — four positions, all supported, none of them a reconciliation the story requires. Portgas is the mother’s name and choosing it deliberately is a real answer rather than a dodge.',
          enterWhen: { flagsSet: ['knows_about_roger'] },
          succeedWhenAny: [
            {
              routeId: 'portgas',
              label: 'Portgas. Hers, chosen on purpose',
              predicate: { flagsSet: ['chose_portgas'] },
              setsFlags: ['chose_portgas'],
              closesFlags: ['chose_gol_d'],
            },
            {
              routeId: 'gol_d',
              label: 'Gol D. Ace, out loud, where people can hear it',
              predicate: { flagsSet: ['chose_gol_d'] },
              setsFlags: ['chose_gol_d'],
              closesFlags: ['chose_portgas'],
            },
            {
              routeId: 'irrelevant',
              label: 'Neither. It is a fact about somebody else',
              predicate: { flagsSet: ['rejected_roger_entirely'] },
              setsFlags: ['rejected_roger_entirely'],
              closesFlags: [],
            },
          ],
          succeedWhen: null,
          failWhen: null,
          deadlineWorldMinute: null,
          hiddenUntilEntered: true,
          rewards: { xp: 120, items: [], flags: [] },
        },
      ],
    },
  ],
  /**
   * Four, and none of them is a famous beat.
   *
   * Everything with a name — the departure, the challenge, the pursuit, the
   * execution — is a quest with a predicate, per §135. What is left for
   * `worldEvents` is what happens to the island regardless of whether Ace is
   * paying attention, which is the honest use of a timestamp.
   */
  worldEvents: [
    {
      id: 'we_garp_visit',
      atWorldMinute: 1920,
      locationId: 'dadan_house',
      publicCopy: 'There is shouting from the house that is not Dadan’s, and it is laughing.',
      directorNotes:
        'Garp arrives unannounced, eats everything, throws both children into the forest, and says one devastating accurate thing in the middle of a joke about food. He does not explain why he came. He never does.',
      setsFlags: ['garp_visited'],
      cancelledByFlags: ['left_dawn_island'],
      requiresFlags: [],
    },
    {
      id: 'we_terminal_clearance',
      atWorldMinute: 2880,
      locationId: 'gray_terminal',
      publicCopy: 'Men with lists and lamp oil have started at the eastern edge of the Terminal, and nobody living in it has been told anything.',
      directorNotes:
        'The city is preparing to burn the part of itself it does not want a visiting noble to see. This is the pressure behind Sabo’s week. It happens whether or not the player has been told, and being there when it starts is a different story from hearing about it afterwards.',
      setsFlags: ['terminal_clearance_begun'],
      cancelledByFlags: ['left_dawn_island'],
      requiresFlags: [],
    },
    {
      id: 'we_thatch_and_the_crate',
      atWorldMinute: 10080,
      locationId: 'moby_dick_mess',
      publicCopy: 'Thatch has found something in the hold and is being extremely pleased about it in front of four hundred people.',
      directorNotes:
        'He has the Yami Yami no Mi and does not know what it is. This is the last hour in which the galley is a happy room. Do not foreshadow. Let him be funny.',
      setsFlags: ['thatch_has_the_fruit'],
      cancelledByFlags: ['refused_whitebeard', 'became_marine', 'defeated_whitebeard'],
      requiresFlags: ['whitebeard_commander'],
    },
    {
      id: 'we_thatch_dies',
      atWorldMinute: 10260,
      locationId: 'moby_dick_deck',
      publicCopy: 'The mess is empty at a mealtime, which has not happened once in the time you have been aboard.',
      directorNotes:
        '§76 — do not cut from this to the chase. The crew has to react first, Newgate has to decide this is a bad situation, and Ace has to arrive at the fact that the man was in his division on his own. If the player never ate in the galley, this lands as a plot point rather than a loss, and that is the correct consequence of not having been there.',
      setsFlags: ['thatch_dead', 'teach_deserted'],
      cancelledByFlags: ['refused_whitebeard', 'became_marine', 'defeated_whitebeard'],
      requiresFlags: ['thatch_has_the_fruit'],
    },
  ],
  promises: [
    {
      id: 'pr_was_it_good',
      kind: 'MYSTERY',
      label: 'Was it good that you were born?',
      seedHint:
        'He has heard what people say about Roger’s child and has never asked anybody to confirm that it means him. Let the question sit under ordinary scenes rather than being discussed.',
      payoffHint:
        'Not answered by a speech. Answered by how many people turn up, and by whether he can accept it when they do. The `worth` resource is the readout.',
      weight: 1,
    },
    {
      id: 'pr_pride',
      kind: 'THEME',
      label: 'If people love you enough to risk everything, do you owe them the humility to be saved?',
      seedHint:
        'He steps in front of things for other people constantly and from the very first hour, and it costs him nothing he values. Establish that asymmetry early and never remark on it.',
      payoffHint:
        'Marineford. A thousand people arrive for him and one stranger says the wrong name. Whether he can keep walking is the entire story arriving at once.',
      weight: 1,
    },
    {
      id: 'pr_brothers',
      kind: 'RELATIONSHIP',
      label: 'The two boys who decided to be your family',
      seedHint:
        'One will not go home and one threw away his own name. Neither of them is owed to him and both are choosing him before he chooses them.',
      payoffHint:
        'Any of: three cups in a treehouse, three men alive and knowingly reunited, or a man who shut both of them out and got exactly what he asked for.',
      weight: 0.9,
    },
    {
      id: 'pr_teach',
      kind: 'RIVAL',
      label: 'The man who believes what you believe',
      seedHint:
        'Loud, friendly, patient, and says the thing about dreams never ending sincerely. He should be liked before he is suspected.',
      payoffHint:
        'Banaro, or the absence of Banaro. The point is never fire against darkness — it is two men who refuse regret, one of whom attached it to people.',
      weight: 0.8,
    },
    {
      id: 'pr_father',
      kind: 'BOSS',
      label: 'The strongest man in the world, who wants nothing from you',
      seedHint:
        'He is an era rather than an obstacle. Ace must look small beside him and the attempts on his life must become routine and slightly absurd.',
      payoffHint:
        'A mark on his back he cannot see and did not earn, or a refusal that stands for the rest of his life.',
      weight: 0.8,
    },
    {
      id: 'pr_platform',
      kind: 'FINALE',
      label: 'A raised stone and the world’s press',
      seedHint:
        'The Government wanted this demonstration before he was born and has never needed him to do anything to deserve it.',
      payoffHint:
        'Reachable and entirely avoidable. If he listened at the rail, or retreated at Banaro, or never left the mountain, this never assembles and nothing equivalent is built in its place.',
      weight: 0.7,
    },
  ],
  /**
   * Twenty-one destinations, from §149, and the ordering matters.
   *
   * The famous one is not first and is not UNIQUE. It is one rare outcome among
   * twenty, requiring a specific chain the player has to actually build —
   * captured, freed, high Pride, low Worth — and the bible is emphatic that
   * "I Ran" is a growth ending rather than a cowardice ending. A world where
   * the tragedy is the default has not broken anything.
   *
   * Four are reachable without ever leaving Dawn Island, which is deliberate:
   * §120-121 and the quiet endings exist so that a player who spends the whole
   * story on a mountain with two boys has arrived somewhere rather than failed.
   */
  endings: [
    {
      id: 'end_fire_fist',
      name: 'Fire Fist',
      rarity: 'RARE',
      minTurn: 70,
      requires: { flagsSet: ['ace_freed', 'turned_back_at_akainu'] },
      condition:
        'The famous version. He was free, he was moving, a stranger said something about the man who chose him, and he stopped. Write it as love rather than as failure — from inside that decision it is indistinguishable from loyalty, and the prose must not know better than he does.',
      epilogue:
        'He finds out, in the last thirty seconds, that a thousand people came here for him and that this was always the answer to the question he had been carrying since he was eight. He is glad. That is the unbearable part: he gets the answer and is glad, and he had to be dying to accept it. Do not reproduce the famous speech. Write what it meant.',
      hint: '',
    },
    {
      id: 'end_i_ran',
      name: 'I Ran',
      rarity: 'RARE',
      minTurn: 70,
      requires: { flagsSet: ['ace_freed', 'kept_running'] },
      condition:
        'Freed, insulted, and he kept moving anyway. This is not cowardice and the prose must not hedge towards it — he heard the worst available sentence about the man he loves and decided that the man had not come here so that an argument could be won.',
      epilogue:
        'He lives, and the living is the difficult part. He spends years being the person who walked away from that, mostly among people who were there and who are relieved, and occasionally among people who are not. He is not at peace about it. He is alive, and he gets to find out what that is like.',
      hint: 'Hear him out and keep walking.',
    },
    {
      id: 'end_i_listened',
      name: 'I Listened',
      rarity: 'UNCOMMON',
      minTurn: 55,
      requires: { flagsSet: ['listened_to_whitebeard'], flagsUnset: ['ace_captured'] },
      condition:
        'He stopped at the rail and let his father give him the reason. No pursuit, no Banaro, no capture, and the war over his execution does not assemble in any form. The whole downstream apparatus of the famous version quietly never gets built.',
      epilogue:
        'Thatch stays dead and that is not fixed by anything. Teach goes out into the world and becomes somebody else’s catastrophe, on a schedule nobody here controls. Ace remains a commander, and spends a long time working out whether being talked down was the strongest thing he ever did or the one thing he will never forgive himself for. Both readings stay available to him.',
      hint: 'Stop at the rail when he asks.',
    },
    {
      id: 'end_three_brothers',
      name: 'Three Brothers',
      rarity: 'RARE',
      minTurn: 65,
      requires: { flagsSet: ['sabo_alive', 'asl_brotherhood', 'ace_survived'] },
      condition: 'All three of them reach adulthood alive and knowing where the other two are. The rarest arrangement of people in this story.',
      epilogue:
        'They are not together — they are a revolutionary, a pirate captain and whatever Ace has become, on three different oceans — and all three of them are alive and all three of them know it. The cups in the treehouse turn out to have meant the thing they said they meant, which is not something either of the other two ever quite expected.',
      hint: 'Nobody drowns and nobody gets shut out.',
    },
    {
      id: 'end_spade_forever',
      name: 'Spade Forever',
      rarity: 'RARE',
      minTurn: 50,
      requires: { flagsSet: ['refused_whitebeard', 'spade_independent'] },
      condition: 'He never takes the mark. The Spade Pirates remain his crew and his own name stays on the flag.',
      epilogue:
        'Fewer than fifty people, then a hundred, then a fleet, all of them following a captain who declined to be anybody’s son. Deuce keeps the log the whole way. There is a version of this man who needed a father and this is not him, and the interesting thing is that it costs him something he never identifies.',
      hint: 'Beat him or refuse him. Stay your own captain.',
    },
    {
      id: 'end_son_of_whitebeard',
      name: 'Son of Whitebeard',
      rarity: 'RARE',
      minTurn: 60,
      requires: { flagsSet: ['accepted_family', 'ace_survived'] },
      condition: 'He took the mark, meant it, and survived to carry the family forward.',
      epilogue:
        'He wears a flag he did not design on a back he cannot see, and he has stopped treating it as a debt. Four hundred people call the same man the same word and one of them is him. The question from when he was eight does not come up much any more, which is not the same as having been answered, and he has decided he can live with that.',
      hint: '',
    },
    {
      id: 'end_second_captain',
      name: 'Second Captain',
      rarity: 'UNCOMMON',
      minTurn: 70,
      requires: { flagsSet: ['ace_survived', 'accepted_family', 'whitebeard_dead'] },
      condition: 'Newgate is gone and the remnants have decided that Ace is what comes next. He did not ask for this.',
      epilogue:
        'He is not his father and everybody involved knows it, and they follow him anyway because the alternative is dispersal. He is competent at it and hates it, and he keeps the chair on deck where people can see him, which is the only part of the job he took on purpose.',
      hint: '',
    },
    {
      id: 'end_marcos_brother',
      name: 'Marco’s Brother',
      rarity: 'RARE',
      minTurn: 70,
      requires: {
        flagsSet: ['ace_survived', 'whitebeard_dead'],
        minRelationship: [{ characterId: 'marco', dimension: 'trust', value: 85 }],
      },
      condition: 'He survives and refuses the leadership, and rebuilds what is left of the family standing next to the man who was always doing the actual work.',
      epilogue:
        'No empire, no flag on a new ship, no successor ceremony. Two men and a few hundred others putting a family back together in a way nobody will write about. Marco does not thank him and does not have to. This is the quietest good ending this world has.',
      hint: 'Ask him for help, and let him give it.',
    },
    {
      id: 'end_teach_falls',
      name: 'Teach Falls',
      rarity: 'RARE',
      minTurn: 55,
      requires: { flagsSet: ['teach_defeated'] },
      condition: 'He finishes it at Banaro, or before Banaro, and the man who would have become an emperor does not.',
      epilogue:
        'An enormous amount of history does not happen, and nobody will ever know how much. Ace does not experience this as a triumph — Thatch is still dead and the man who did it is just gone — but somewhere out there a great many people live ordinary lives for reasons none of them could name.',
      hint: 'Do not go alone.',
    },
    {
      id: 'end_portgas',
      name: 'Portgas',
      rarity: 'RARE',
      minTurn: 50,
      requires: { flagsSet: ['chose_portgas', 'knows_about_roger'] },
      condition: 'He settles the birth wound by deciding it belongs to his mother and to the people he chose, rather than to the man whose name the world keeps bringing up.',
      epilogue:
        'Twenty months. He thinks about that number for the rest of his life and it does the work that nothing anybody said to him ever managed. He uses her name in full, deliberately, to people who were expecting the other one, and he enjoys their faces.',
      hint: 'Find out, and then choose hers.',
    },
    {
      id: 'end_gol_d_ace',
      name: 'Gol D. Ace',
      rarity: 'RARE',
      minTurn: 55,
      requires: { flagsSet: ['chose_gol_d', 'knows_about_roger'] },
      condition:
        'He says the whole name out loud where people can hear it. This is neither a fall nor a triumph and must not be written as either — it is a man taking the thing that was used against him and holding it up.',
      epilogue:
        'The Government reacts the way the Government was always going to react, and he had worked that out before he said it. What he had not predicted is how many people are glad. There turn out to be a great many people in the world who needed somebody to do that, and he is extremely uncomfortable about being their reason.',
      hint: '',
    },
    {
      id: 'end_pirate_king',
      name: 'Pirate King Ace',
      rarity: 'UNIQUE',
      minTurn: 90,
      requires: { flagsSet: ['ace_survived', 'chose_gol_d'], flagsUnset: ['became_marine', 'joined_teach'] },
      condition: 'A divergent future in which he is a serious claimant, and then the answer, to the thing his father left behind.',
      epilogue:
        'He gets to the end of it and finds out what is there, and the joke of his entire life is that the man whose name he spent twenty years refusing had stood in the same place and laughed. He does not laugh. He sits down for a long time and then he goes home to tell his brothers.',
      hint: '',
    },
    {
      id: 'end_marine_ace',
      name: 'Marine Ace',
      rarity: 'UNCOMMON',
      minTurn: 45,
      requires: { flagsSet: ['became_marine'] },
      condition: 'He takes Garp’s path, with Roger’s blood, inside the organisation that executed him.',
      epilogue:
        'Garp is so relieved that he cannot speak about it and compensates by being twice as violent for a decade. It is not a comfortable life — there are people in that building who know exactly whose son he is and who file it — and it is a life, which was the entire point of everything Garp ever did badly.',
      hint: 'He keeps offering. You could say yes.',
    },
    {
      id: 'end_revolutionary_brother',
      name: 'Revolutionary Brother',
      rarity: 'UNCOMMON',
      minTurn: 55,
      requires: { flagsSet: ['sabo_revolutionary', 'ace_survived'] },
      condition: 'He follows Sabo into the organisation that decided the wall was the problem.',
      epilogue:
        'The boy who was frightened that birth was destiny ends up dismantling, professionally, the structure that decided his birth was a crime. He is not especially ideological about it. His brother is there, and the work is obviously correct, and those two facts are sufficient.',
      hint: '',
    },
    {
      id: 'end_straw_hats_brother',
      name: 'Straw Hat’s Brother',
      rarity: 'RARE',
      minTurn: 75,
      requires: {
        flagsSet: ['ace_survived', 'asl_brotherhood'],
        minRelationship: [{ characterId: 'luffy', dimension: 'affection', value: 90 }],
      },
      condition: 'He survives and sails with Luffy, long-term, as crew rather than as a visiting legend.',
      epilogue:
        'He is not the captain and does not want to be, and it turns out that the seven-year-old who would not stop following him grew into the one person he can take orders from without it costing him anything. The annoyance from the first eleven days never entirely goes away. Neither of them would part with it.',
      hint: '',
    },
    {
      id: 'end_the_father_lives',
      name: 'The Father Lives',
      rarity: 'UNIQUE',
      minTurn: 80,
      requires: { flagsSet: ['ace_survived'], flagsUnset: ['whitebeard_dead'] },
      condition:
        'Newgate walks away from Marineford. This requires the player to have changed enough upstream that the war either never happened or happened differently, and it is the hardest thing in this world to reach.',
      epilogue:
        'An old man who had arranged his own death for a purpose finds that the purpose has been achieved without it, and is briefly at a complete loss. Then he sits down in the chair on deck, where the family can see him, and gets a few more years than anybody had budgeted for. Marco cries exactly once, in the medical bay, with the door shut.',
      hint: '',
    },
    {
      id: 'end_no_fire',
      name: 'No Fire',
      rarity: 'UNCOMMON',
      minTurn: 50,
      requires: { flagsSet: ['no_fire_route'], flagsUnset: ['ate_mera_mera'] },
      condition:
        'He never ate it, and became a major figure on the sea anyway, on fists, Haki, weapons and whatever the player built instead.',
      epilogue:
        'Nobody calls him Fire Fist. The name that sticks is something else entirely and he chose it, and he can swim, which turns out to matter enormously on about four separate occasions. The fruit went somewhere and did something, and it was not his problem.',
      hint: 'Leave it in the crate.',
    },
    {
      id: 'end_deuce',
      name: 'Deuce',
      rarity: 'UNCOMMON',
      minTurn: 50,
      requires: {
        flagsSet: ['spade_pirates_formed'],
        minRelationship: [{ characterId: 'deuce', dimension: 'trust', value: 88 }],
      },
      condition: 'Whatever else happens, the crew from Sixis is the thing he built his life around, and the man who did not want to be a pirate is still there.',
      epilogue:
        'The log runs to eleven volumes. It is the only accurate account of any of this and it will never be published, because the man who wrote it does not think that would be appropriate. He is wrong, and nobody will ever persuade him.',
      hint: '',
    },
    {
      id: 'end_dawn_island',
      name: 'Dawn Island',
      rarity: 'UNCOMMON',
      minTurn: 40,
      requires: { flagsSet: ['stayed_on_dawn_island'] },
      condition:
        'He does not go. Not out of fear — he weighs the sea against a mountain with people on it and picks the mountain, and this must not be written as a failure state.',
      epilogue:
        'Dadan complains about it for thirty years and tells nobody how she actually feels about it. Luffy goes anyway, at seventeen, and Ace stands on the shore and lets him, which is the one thing the famous version of this man could never have done. The can is still buried under the treehouse. Nobody has spent it.',
      hint: 'Seventeen comes and you can simply not get in the boat.',
    },
    {
      id: 'end_blackbeards_man',
      name: 'Blackbeard’s Man',
      rarity: 'RARE',
      minTurn: 60,
      requires: { flagsSet: ['joined_teach'] },
      condition:
        'He takes Teach’s hand. §94 permits this and it should be played straight: two men who refuse regret, one of whom has just made the other a genuinely coherent offer.',
      epilogue:
        'He is good at it, which is the horrifying part. The thing he was always looking for was somebody who would tell him his own philosophy back, and Teach does that better than Newgate ever did, because Teach actually shares it. Thatch is never mentioned again by anybody in that crew.',
      hint: '',
    },
    {
      id: 'end_the_execution',
      name: 'The Execution',
      rarity: 'COMMON',
      minTurn: 65,
      requires: { flagsSet: ['ace_executed'] },
      condition: 'Nobody reaches him in time. This is a loss and the prose does not soften it or find a meaning in it.',
      epilogue:
        'It is quick and administrative and the press are there. What he is thinking about is not the platform. The war still happens, afterwards, for nothing, and the people who arrive too late have to decide what to do with the rest of their lives.',
      hint: '',
    },
  ],
  /**
   * What he did with the rumour, at about eight.
   *
   * §10 is the load-bearing section of the whole bible: he hears that Roger's
   * child deserved death, works out that they mean him, and the rest of his
   * life is a search for evidence either way. These four are the postures he
   * could have taken at that moment, and each one is a real fighting style
   * rather than a mood — but none of them decides whether he accepts Luffy,
   * saves Sabo, eats the fruit or turns back at the end.
   */
  archetypes: [
    {
      id: 'arch_prove_it',
      name: 'You Went Looking',
      role: 'Force and provocation',
      summary:
        'You decided that if the world was going to say that about you, it could say it to your face, and you have been walking towards people who might ever since.',
      playstyle: ['Swings first', 'Fearless', 'Makes enemies fast'],
      blurb:
        'You were eight and you went down to the bar where you had heard it said, and you hit an adult with a bottle. Dadan paid for the bottle. Nobody on Dawn Island has said it in front of you since, which you know is not the same as nobody saying it.',
      attributeBonus: { might: 3, presence: 2 },
      skillProficiencies: { brawl: 3, provoke: 3 },
      startingItems: [{ itemId: 'lead_pipe', qty: 1 }],
      startingAbilities: ['ab_swing_first'],
      startingReputation: [{ factionId: 'faction_goa_nobility', amount: -12 }],
    },
    {
      id: 'arch_out_last_it',
      name: 'You Refused To Fall',
      role: 'Endurance and stubbornness',
      summary:
        'You decided the answer was simply to outlast everybody who thought it, which is the toughest and least strategic of the available replies.',
      playstyle: ['Takes the hit', 'Never retreats', 'Outlasts'],
      blurb:
        'They threw you off the ridge and you climbed back up, and they threw you off again, and on the ninth time they stopped because they were tired. You have thought of this as a victory for two years and it has shaped everything about how you fight.',
      attributeBonus: { resolve: 3, might: 1 },
      skillProficiencies: { endure: 4, brawl: 2 },
      startingItems: [],
      startingAbilities: ['ab_take_it'],
      startingReputation: [{ factionId: 'faction_dadan', amount: 10 }],
    },
    {
      id: 'arch_be_worth_it',
      name: 'You Decided To Earn It',
      role: 'Command and loyalty',
      summary:
        'You decided that if your existence needed justifying you would justify it by being the person other people could stand behind, and you started with a seven-year-old and a boy in a top hat.',
      playstyle: ['Protects', 'Gathers people', 'Stands in front'],
      blurb:
        'You do not remember deciding this. You remember standing between a smaller child and something larger, at eight, for no reason you could articulate, and finding that it was the first hour of your life in which the question did not come up.',
      attributeBonus: { presence: 3, resolve: 1 },
      skillProficiencies: { command: 3, endure: 2 },
      startingItems: [{ itemId: 'ship_fund', qty: 1 }],
      startingAbilities: ['ab_stand_between'],
      startingReputation: [{ factionId: 'faction_dadan', amount: 14 }],
    },
    {
      id: 'arch_never_asked',
      name: 'You Stopped Asking',
      role: 'Speed and self-reliance',
      summary:
        'You worked out that every answer would come from somebody with a reason to give it, so you stopped asking anybody anything and got very fast and very self-sufficient instead.',
      playstyle: ['Fast', 'Self-reliant', 'Hard to read'],
      blurb:
        'You could have asked Garp. He was in the house, he was drunk, and he would probably have told you. You went up the mountain instead and stayed out for four days, and you have handled every large question the same way since.',
      attributeBonus: { agility: 3, mind: 2 },
      skillProficiencies: { pipe: 3, forage: 3 },
      startingItems: [{ itemId: 'green_dagger', qty: 1 }],
      startingAbilities: ['ab_pipe_rush'],
      startingReputation: [],
    },
  ],
  protagonist: {
    portrait: 'story_ace/protagonist',
    kind: 'NAMED',
    name: 'Portgas D. Ace',
    pronouns: 'he/him',
    description:
      'Ten. Wiry, freckled, black hair that will not do anything, a lead pipe he has had for two years, ' +
      'and a face that goes guarded before it goes anything else.',
    setupHeading: 'What kind of Ace are you?',
  },
  setupFields: [
    {
      id: 'archetype',
      label: 'When you were eight you heard what people say about Roger’s child. What did you do about it?',
      helpText:
        'The one thing that moment left in you, which sets what you are good at. It is fixed for the whole story. It does not decide whether Luffy becomes your brother, whether Sabo lives, whether you eat the fruit, or what you do when an admiral says your father’s name — none of that is decided here.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'What do people get wrong about you?',
      helpText: 'The gap between what this island has decided you are and what you actually are. One plain sentence.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. Everyone thinks I hate being followed. I hate being followed by someone who might get hurt.',
    },
    {
      id: 'what_you_want',
      label: 'What is the can actually for?',
      helpText: 'A starting lean, not a commitment. You can do the exact opposite within the hour and the world will keep up.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'a_ship', label: 'A ship. Sabo did the arithmetic and it is a real number' },
        { id: 'away', label: 'Getting off this island before anything happens to make it impossible' },
        { id: 'proof', label: 'Proof. Of what, you have not worked out yet' },
        { id: 'the_three_of_us', label: 'Nothing yet. It stopped being about the money when it stopped being one person’s' },
        { id: 'nobody_asks', label: 'Somewhere far enough that nobody has heard the rumour' },
      ],
    },
  ],
  /**
   * Hand-directed, from the bible's §142 prompt, meshed with the house rules.
   *
   * The brief's layered cast is kept because it is doing real work — child
   * Luffy and child Sabo behind an adult Ace is the whole shape of the story in
   * one image. Two things from it are dropped: "no text rendered inside image",
   * because the title is composited afterwards where it can be spelled and
   * translated, and the manga-panel warning, which our negatives already carry.
   */
  coverDirection: [
    'SUBJECT: Portgas D. Ace, centred and unmistakable, as the key visual for an anime film about his life.',
    'Foreground Ace fills the lower centre from the waist up, larger than everything else and holding',
    'roughly half the visual weight. Twenty years old, lean and muscular without being heavy, jaw-length',
    'messy black hair, freckles scattered across both cheeks and the nose, dark eyes, no facial hair.',
    'He wears a wide orange hat with a red bead band and two small blue badges pinned at the front, one',
    'smiling and one frowning; a red beaded necklace; no shirt; black knee-length shorts; an orange belt',
    'with metal eyelets; a blue pouch strapped to the left thigh; a green-sheathed dagger at the hip.',
    'The ASCE tattoo is visible on his upper left arm with the S struck through. One fist is alight with',
    'vivid orange-yellow flame that lifts heat distortion into the air above it. His expression is',
    'confident and emotionally complicated — not a generic angry hero, and not smiling.',
    'BEHIND HIM, layered and smaller but individually readable: a small boy in a straw hat and red vest',
    'to one side, and a blond boy in a black top hat with blue goggles to the other, both clearly children.',
    'Further back and enormous, a towering old man with an upward-curving white crescent moustache, a white',
    'captain’s coat over bare scarred chest, and a vast polearm — he should read as several times Ace’s size.',
    'High in one corner, blue phoenix flame. Far off and dark, a huge heavy silhouette that is not resolved.',
    'Below and behind all of it, white marble military architecture and a bay of warships, very small.',
    'PALETTE: orange and black dominant, with the warm fire key light on Ace and cold grey-blue on the',
    'architecture and sea, so the foreground and the background belong to different worlds.',
    'The cast fills the frame. No empty sky. Ace is the only figure in sharp focus.',
  ].join(' '),
  opening:
    'He is thirty feet back and downhill, and he has stopped pretending to hide.\n\n' +
    '"I\'m still here," Luffy says, from behind a tree that is narrower than he is. "I\'ve been here the whole time. You knew."\n\n' +
    'Eleven days. Walking faster does not work, because he runs. Leaving at four in the morning does not work, because he does not appear to sleep. Yesterday you said something deliberately cruel about his hat, and he thought about it for nine seconds and then asked what you were having for lunch.\n\n' +
    'Up the slope, Sabo sits on the log with the pipe across his knees, not helping, enjoying himself enormously.\n\n' +
    '"Ace." Luffy comes out from behind the tree, muddy to the knees, a scrape down one arm from something on the way up. "Ace. I can keep up. Look at me. I kept up."',
  openingSuggestions: [
    '"Go home, Luffy. I mean it this time — if you follow us again I am tying you to a tree and leaving you there." I do not look back at Sabo, because Sabo is laughing and I will hit him.',
    'I toss the spare pipe down the slope at him, hard enough that catching it will hurt. "Fine. You want to come? Keep up." Then I turn and go up the ridge at the speed I would use alone.',
    'I stop walking. "Why me? There are a thousand people on this island you could be annoying. Why is it me." I actually want the answer, which is new, and I am annoyed with myself about it.',
  ],
  publishedAt: '2026-09-12T05:00:00.000Z',
};

export const ACE = StoryVersion.parse(raw);
