import { StoryVersion } from '@plotbreak/contracts';

/**
 * "The Last Mimic" — you are the treasure.
 *
 * Every other world we have puts the player in front of the prize. This one
 * makes them the prize: a treasure chest at the bottom of a dungeon, with a
 * human mind, a belly full of gold, and somebody else's life rattling around
 * among the coins. Everyone in the cast wants something that is inside the
 * player, and the rule that makes the world work is the one in hard canon:
 * whatever is inside a mimic is lost when it dies. So nobody who wants the
 * Cinder can afford to break the player, and every threat in the story turns
 * into a negotiation with a piece of furniture. That is the comedy and it is
 * also the leverage.
 *
 * The playable span is one night and two days in the Gilt Deep, from the hand
 * in the chest to the appraiser with the silver chime reaching the bottom of
 * the stair. Three clocks run under it: the six o'clock reset, Lirelle's
 * contract lapsing at the second reset, and Edda Quell descending a floor an
 * hour. Each can be beaten, dodged or bargained away, and doing nothing about
 * the third is a real ending rather than a punishment.
 *
 * The body is the progression system. A chest can hop. Then it can grow legs.
 * Then, if the staff or the old voices teach it, it can wear other shapes, and
 * the old mimics could wear a face. Both gated abilities are granted by quest
 * steps and kept unusable by a flag until the player has actually learned them
 * — grant broadly, gate by flag, which is the lesson this repo has paid for four
 * times.
 *
 * The storyteller never reads the ability list, only the chosen archetype's
 * starting abilities and the quest items. So, as with Skill: ERROR's
 * `read_window`, every archetype starts with the body's two basics, Borrow a
 * Voice and Hop, before its own trick, and the vault gold is a quest item the
 * player starts holding, so the narrator knows what is in their belly.
 *
 * Voices are the other rule, and the one that makes the opener land: the player
 * has no voice of their own any more and can speak only in voices they have
 * heard. On turn one that is Pell's, from six half-dreamed months of her
 * chatter, and the two delvers standing in the vault. Speaking up means
 * answering Lirelle in her own voice.
 *
 * Why the player woke up here is a mystery the world will never force. Ash
 * called them, and a player who never pulls on it never hears so. The lead is
 * behind a flag only somebody who went listening in the Gallery of Echoes, or
 * reading the keeper's ledger, can set.
 *
 * Three variables, all invisible. Strength is the one GOOD_HIGH, because
 * `resolveRest` refills those and a chest that has slept is the honest thing
 * for that to mean. Rumour is the first GOOD_LOW on purpose: PUBLIC_VIOLENCE
 * raises the first one, and a chest that bites somebody in front of witnesses
 * should be the talk of the stair. Strain is what changing shape costs, and it
 * settles back down on its own.
 *
 * The slate's working name for the elf was "Lirael", which is the title
 * heroine of Garth Nix's novels. She is Lirelle here.
 */

const raw = {
  id: 'sv_the_last_mimic_1',
  storyId: 'story_the_last_mimic',
  version: 1,
  title: 'The Last Mimic',
  fantasyLabel: 'Reborn as a treasure chest. With teeth.',
  hook: 'You died and woke up as a treasure chest. An elf thief already has her hand in your gold, and she wants to know if you bite.',
  premise:
    'You died in your own world. You don’t remember how. You remember your name, your job and the bus you used to take, and then nothing, and then this: you are a treasure chest in the deepest room of a dungeon under a mining town called Brightwell.\n\n' +
    'Wooden walls, iron bands, and a lid that is also your mouth. Your belly is full of gold, and you can feel every coin.\n\n' +
    'Mimics are supposed to be extinct. Thirty years ago the town’s delvers hunted down the last of them, because a mimic’s heart stitched into a bag makes a satchel with no bottom, and the whole town runs on those satchels. Now the satchels are going shallow, and there are no new hearts.\n\n' +
    'So when an elf thief puts her hand in your coins tonight and finds you warm, you are worth forty thousand crowns to anyone who can carry you up the stairs.\n\n' +
    'You can’t walk yet. You can talk, but only in voices you have heard. And under the coins is something that is not gold, that belongs to the dungeon’s lich, and that he would very much like back.\n\n' +
    'Keep still, make friends, or use your teeth. Just be somewhere, or something, else when the appraiser with the silver chime comes down the stair. Get caught, and you will spend the rest of your life on a cushion, mending other people’s bags.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Fantasy', 'Isekai', 'Comedy', 'Adventure', 'Monster'],
  mechanicsChips: [
    'You are the treasure',
    'Talk in borrowed voices',
    'Grow legs, then more',
    'Everyone wants your belly',
    'Bite, bargain or hide',
  ],
  contentDescriptors: ['FANTASY_VIOLENCE', 'MORAL_AMBIGUITY', 'ROMANCE'],
  intensity: 'MODERATE',
  creatorNote:
    'You can spend the whole story being furniture, and that is a real way to play it. You can also bite, bargain, grow legs, rob the people robbing you, and walk out of the dungeon in a shape nobody has seen in thirty years. Everybody down there wants what is in your belly. Not one of them can afford to break you.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: true,
    allowsRomance: true,
    startingLocationId: 'the_ninth_vault',
    startWorldMinute: 22 * 60,
    startingItems: [
      { itemId: 'vault_gold', qty: 1 },
      { itemId: 'the_cinder', qty: 1 },
    ],
    hardCanon: [
      'The player died in another world, which they remember as their own, and woke as a treasure chest in the Ninth Vault, the deepest room of the Gilt Deep, a dungeon under the mining town of Brightwell. They are a mimic. The wood, the iron bands and the lid are their body, and the lid is their mouth.',
      'The player keeps their human mind and memories. At the start they cannot walk, climb or fly; they can hop, very loudly, about a hand’s width at a time. They have no hands, no arms, no clothes and no pockets: whatever they take, they take with the lid, and whatever they keep, they keep inside, among the coins. The Cinder stays inside them unless they open the lid and give it up. Their body learns to change by being used: legs first, then other shapes. A new limb, garment or power never appears just because the player says it has.',
      'Everybody in this world is an adult, the Deep’s staff and its goblins included, and every one of them has a job. The player was a grown adult in their old life, with a job they had done for years (their archetype), and waking up as a chest has not made them any younger.',
      'The player has no voice of their own any more. They can speak clearly, but only in a voice they have heard spoken near them. At the start that means Pell’s, from six half-dreamed months of her chatter, and Lirelle’s and Bruno’s from tonight. Every new voice they hear is added.',
      'Nobody in this world knows the player’s name. Lirelle, Bruno, Pell, Edda and the staff call them the chest, Box, or whatever the player has told them, and learn their old name only if the player says it aloud. Ash knows it from the summoning and does not use it, because using it would give away that he called them.',
      'Everyone believes mimics are extinct. The Delvers’ Guild hunted the last of them thirty years ago, because a mimic’s heart stitched into a bag makes a deep satchel, a bag with no bottom. Brightwell’s trade runs on deep satchels, and every one of them is slowly going shallow.',
      'The Guild still pays forty thousand crowns for a mimic, heart intact, from a bounty plate thirty years old. A great chime in the Guildhouse rings when a mimic wakes. It rang tonight, as the story begins, for the first time in thirty years.',
      'Among the coins inside the player is the Cinder: a coal sealed in a glass bead that holds the life of Ash, the lich who keeps the Gilt Deep. Whoever holds it can bargain with him, command him, or end him. The Guild sent Lirelle’s crew down to bring it up, so the Guild could collect the Deep’s gold like rent.',
      'Whatever is inside a mimic is lost for good if the mimic dies, so nobody who wants the Cinder can afford to kill the player. A dead mimic’s heart still makes a satchel, which is what the old bounty pays for. A living mimic could deepen failing satchels for ever, which is what Edda Quell wants.',
      'Pell polishes the vault chest twice a day, first thing in the morning and again at about half past ten at night, and talks to it the whole time. She has not missed once in six months. The story opens at ten at night, so within the first few beats she backs in through the goblin hatch behind the seventh plinth, rag in hand and already talking, not knowing there are delvers in the vault. Whenever the player waits through a night or a morning, she comes to polish.',
      'Ash notices anybody who lingers in the Ninth Vault: within the hour every lamp in the vault turns blue and he speaks through the walls, politely, before he ever comes down in person.',
      'The Gilt Deep resets at six every morning: traps re-arm, broken doors mend, and the Long Stair seals for an hour. Anyone caught on the stair at six spends a very bad hour there.',
      'Fights here are fast and bloodless on the page: armour dents, people are knocked flat, a bite bruises, and nobody is described in pieces. The Guild’s old two silver an ear is something goblins mention, never something that happens on the page. Romance, if it comes at all, is banter and a slow, wary warmth; it goes no further than a kiss, and only once the player has a face.',
      'There are no status screens, levels or numbers anybody can see. The player grows by doing things, and the world shows it in their body.',
    ],
    toneGuide:
      'Comedy first, with real stakes underneath. The joke of this world is that the player is furniture with opinions, and the best beats come from the physical specifics of being a box: coins shifting when you laugh, a lid that slams when you are startled, hearing through wood, tasting whatever is put inside you. ' +
      'The dungeon is a workplace. Goblins reset traps and argue about the rota, the lich does the accounts, and delvers are customers who might not pay. Play it straight and it gets funnier. ' +
      'Everybody wants something from the player and nobody can afford to break them. Let that turn every threat into a negotiation. The face at the top of a beat is whoever is talking to the player.',
    proseStyle: 'webnovel',
    styleExamples: [
      "The goblin backs into the vault talking before she has turned round.\n\n\"...and the onions were off again, Box, so I said to the cook...\"\n\nShe turns. Sees the elf. Sees the shield. Drops the rag.\n\nThen she does the bravest thing you have ever seen. She dives behind you.\n\n\"Don’t tell them I’m here,\" she whispers into your hinges.\n\nYou answer in her own voice. \"They can see your ears.\"\n\nA long silence.\n\n\"You TALK?\"",
      "The lamps go blue, one after another, all the way down the hall.\n\n\"Good evening,\" says the tall skeleton in the doorway, and straightens his spectacles. \"Please, don’t get up. Ah. You can’t.\"\n\nBruno’s shield comes up. Ash does not look at it.\n\nHe looks at you. Specifically, at your lid.\n\n\"I believe,\" he says, very politely, \"you have something of mine in your stomach.\"",
    ],
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 11, agility: 6, mind: 12, presence: 10, resolve: 13, arcana: 11 },
  skills: [
    { id: 'jaws', name: 'Jaws', attribute: 'might', description: 'Bringing a heavy lid down on something, and keeping it there.' },
    { id: 'scuttle', name: 'Scuttling', attribute: 'agility', description: 'Getting a box from one place to another on whatever it has: a hop, later legs.' },
    { id: 'appraise', name: 'Appraisal', attribute: 'mind', description: 'Knowing what is inside you, what it is made of, and what it is worth to whoever is asking.' },
    { id: 'deep_sense', name: 'Dungeon Sense', attribute: 'mind', description: 'Hearing the Deep through stone: traps clicking, feet on a landing, voices in the walls.' },
    { id: 'bargain', name: 'Bargaining', attribute: 'presence', description: 'Making somebody an offer they believe, from a position that is mostly lid.' },
    { id: 'stillness', name: 'Stillness', attribute: 'resolve', description: 'Being nothing but furniture while somebody looks straight at you.' },
    { id: 'mimicry', name: 'Mimicry', attribute: 'arcana', description: 'Copying a voice, and later a shape, well enough to fool the people who know the original.' },
  ],
  /**
   * Three, all invisible.
   *
   * Strength is the only GOOD_HIGH because `resolveRest` refills those, and a
   * chest that has had a night's sleep is exactly what that should mean. It is
   * also what the generic cost path spends, which is right: the price of a
   * hard night in this world is a heavy lid.
   *
   * Rumour is first among the descending pair because PUBLIC_VIOLENCE raises
   * the first GOOD_LOW in array order. A chest that bites a delver in front of
   * witnesses should be the talk of the stair by morning. Strain is what
   * changing shape costs; it settles on its own, which is why its regen is
   * negative.
   */
  resources: [
    {
      id: 'strength',
      name: 'Strength',
      max: 100,
      start: 75,
      regenPerHour: 3,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'The player is a box that cannot lift its own lid. Words come out slurred in whatever voice is nearest, hops go nowhere, and the only thing left that works is staying exactly where they are.',
      color: '#C9A227',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Spent. The lid is heavy, hops land short and crooked, and borrowed voices come out thin and slightly wrong. This is the band where a chest should be somewhere safe and shut, and where resting is the right move rather than a delay.',
        },
        {
          upTo: 60,
          behaviour:
            'A long night’s ordinary tiredness. Fine for one more hop or one more conversation, and honest about not wanting a fight. Nobody needs to remark on it unless the player pushes.',
        },
        {
          upTo: 100,
          behaviour:
            'Fresh and heavy with it. The lid snaps, hops cover ground, voices come out perfect, and the player has room to try something ambitious with their body and survive it going wrong.',
        },
      ],
    },
    {
      id: 'rumour',
      name: 'Rumour',
      max: 100,
      start: 5,
      regenPerHour: -0.3,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'Nobody outside the vault knows a mimic is alive. The great chime rang, and the Guild knows only that something woke somewhere in the Deep.',
      color: '#B5523B',
      bands: [
        {
          upTo: 15,
          behaviour:
            'Nobody outside the vault knows. The Guild knows a chime rang and nothing more, and every delver on the stair treats a chest as a chest. The player can be furniture whenever they like and be believed.',
        },
        {
          upTo: 45,
          behaviour:
            'Talk on the stair. The crew, the staff and somebody at the camp know, or half know, and stories are moving up the Long Stair faster than anybody walking. Delvers start tapping chests with the butts of their spears before they open them.',
        },
        {
          upTo: 75,
          behaviour:
            'Brightwell knows. The bounty notice is reprinted, the checkpoint at the Well Mouth searches every crate coming up, and parties come down for the forty thousand rather than for gold. Anybody friendly now has to decide out loud whether they still are.',
        },
        {
          upTo: 100,
          behaviour:
            'A hunt. Every delver in town wants the heart the old way, and the staff are nailing hatches shut. The player cannot be a chest in any room with a door, and even friends are being offered more than they earn in a year.',
        },
      ],
    },
    {
      id: 'strain',
      name: 'Strain',
      max: 100,
      start: 10,
      regenPerHour: -3,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'The player is completely at home in their body: a chest, settled, every board exactly where it should be.',
      color: '#6E8B74',
      bands: [
        {
          upTo: 30,
          behaviour:
            'Settled. The player’s shape holds without effort, borrowed voices sound exactly like their owners, and nothing about them gives away that they are anything but very good furniture.',
        },
        {
          upTo: 65,
          behaviour:
            'Stretched. Teeth show in the wood grain when the player is startled, a coin drops out when they laugh, and a borrowed voice slides into somebody else’s halfway through a sentence. Close attention will notice.',
        },
        {
          upTo: 100,
          behaviour:
            'Overstretched. The body stops listening. The lid snaps on its own, the player hops when they meant to stay still, voices come out three at once, and whatever shape they were wearing peels back to a chest in front of whoever is looking.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'vault_gold',
      name: 'Vault Gold',
      tags: ['treasure'],
      questItem: true,
      description: 'Several hundred gold crowns, inside you, where a stomach would be. You can feel every one of them, and you know which ones are fake.',
      loreText: 'Ash restocks the vault every spring. Some of the coins are three hundred years old; some are this year’s and still smell of the mint.',
      icon: 'coins',
    },
    {
      id: 'the_cinder',
      name: 'The Cinder',
      tags: ['quest', 'magic'],
      questItem: true,
      description: 'A coal the size of a plum, sealed in a bead of thick glass and glowing very faintly. It is warm in a way nothing else inside you is. It is the life of the lich who keeps the Gilt Deep.',
      loreText: 'Whoever holds it can bargain with Ash, give him orders, or end him. It has sat in the vault chest for three hundred years, which is to say it has been sitting in you.',
      icon: 'gem',
    },
    {
      id: 'lirelles_satchel',
      name: 'Lirelle’s Satchel',
      tags: ['quest', 'bag'],
      questItem: true,
      description: 'A battered leather satchel with no bottom: a cart’s worth of shopping goes in and it weighs nothing. Or it used to. Last year it held a wagonload. Now it holds a week of groceries, and less every month.',
      loreText: 'Every deep satchel is stitched around a mimic’s heart. This one was stolen from Edda Quell’s desk nine years ago, and when it is near you, it hums.',
      icon: 'bag',
    },
    {
      id: 'the_chime',
      name: 'Quell’s Chime',
      tags: ['quest', 'tool'],
      questItem: true,
      description: 'A small silver bell on a black ribbon. Within a room’s length of a living mimic it rings once, clear as a dropped coin, and keeps ringing until it is held still.',
      loreText: 'Cast thirty years ago from a hinge of the last mimic killed in Brightwell. Six were made for the hunt. This is the only one that still rings.',
      icon: 'bell',
    },
    {
      id: 'ash_ledger',
      name: 'The Keeper’s Ledger',
      tags: ['quest', 'document'],
      questItem: true,
      skillModifiers: { deep_sense: 1 },
      description: 'This year’s volume of the Gilt Deep’s accounts, in a tidy hand: every delver in, every delver out, every coin restocked. Forty-one in this year. Thirty-nine out.',
      loreText: 'Six months back, in the margin beside the Ninth Vault entry: "Guardian installed. Summoning drawn below. Cost: considerable. Apology: owed."',
      icon: 'book',
    },
    {
      id: 'bounty_notice',
      name: 'The Bounty Notice',
      tags: ['document'],
      description: 'MIMIC. FORTY THOUSAND CROWNS. HEART INTACT. Bring to the Guildhouse. No questions asked of the bearer.',
      loreText: 'Printed from a plate thirty years old. The Guild never melted it down, which says something about what the Guild expected.',
      icon: 'papers',
    },
    {
      id: 'staff_keyring',
      name: 'Pell’s Keyring',
      tags: ['tool'],
      skillModifiers: { deep_sense: 1 },
      description: 'Thirty small iron keys on a ring the size of a plate, one for every hatch in the back corridors, each with a goblin scratch-mark on it.',
      loreText: 'The thirty-first key opens a cellar door under Brightwell market. It is the shiniest one, because Pell polishes it when she is thinking about the sun.',
      icon: 'keys',
    },
    {
      id: 'empty_chest',
      name: 'A False Chest',
      tags: ['furniture'],
      description: 'Identical to you from the outside, down to the dent in the third band. Empty, apart from a spring trap that has been disarmed. Probably.',
      loreText: 'There are forty of them in the hall above the vault. A chest is only ever a chest until something wakes up in it.',
      icon: 'chest',
    },
    {
      id: 'voice_shell',
      name: 'A Voice Shell',
      tags: ['magic'],
      skillModifiers: { mimicry: 2 },
      description: 'A curl of pale stone from the Gallery of Echoes that holds one old voice and plays it back, very quietly, when it is warm.',
      loreText: 'Some of the voices in the shells speak a language nobody in Brightwell knows. It sounds a lot like the one you grew up with.',
      icon: 'shell',
    },
  ],
  abilities: [
    {
      id: 'stay_a_chest',
      name: 'Stay a Chest',
      tags: ['defensive'],
      description: 'Be nothing but furniture while somebody looks straight at you: no breath, no warmth, no twitch.',
      affordances: ['stay still', 'perfectly still', 'play dead', 'keep still', 'stay a chest', 'freeze', 'pretend to be a chest', 'let her take', 'act like furniture'],
      costs: [{ resourceId: 'strength', amount: 3 }],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: { attribute: 'resolve', skillId: 'stillness', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'bite',
      name: 'Bite',
      tags: ['combat'],
      description: 'Bring your lid down hard on whatever is in reach of it. A chest’s bite dents armour and bruises badly.',
      affordances: ['bite', 'chomp', 'snap at', 'bite down', 'bite her', 'bite him', 'eat her hand'],
      costs: [
        { resourceId: 'strength', amount: 8 },
        { resourceId: 'rumour', amount: 6 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'might', skillId: 'jaws', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'clamp_down',
      name: 'Clamp Down',
      tags: ['grapple'],
      description: 'Close your lid on something and keep it, without hurting it. Nothing comes out of you until you say so.',
      affordances: ['shut my lid', 'close my lid', 'clamp', 'keep hold', 'don’t let go', "don't let go", 'trap her hand', 'shut on her wrist', 'hold her wrist'],
      costs: [{ resourceId: 'strength', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'might', skillId: 'jaws', baseDc: 11 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'borrow_a_voice',
      name: 'Borrow a Voice',
      tags: ['social'],
      description: 'Speak, clearly, in any voice you have heard. You have no voice of your own any more.',
      affordances: ['speak', 'talk to her', 'answer her', 'in her voice', 'in his voice', 'use her voice', 'reply', 'please', 'hello', 'say something'],
      costs: [
        { resourceId: 'strength', amount: 3 },
        { resourceId: 'strain', amount: 4 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'arcana', skillId: 'mimicry', baseDc: 11 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'swallow_it',
      name: 'Swallow It',
      tags: ['utility'],
      description: 'Take an object inside you, where it sits among your coins and nobody reaches it without your say-so.',
      affordances: ['swallow', 'eat it', 'put it inside me', 'take it in', 'keep it inside', 'hide it in me', 'gulp'],
      costs: [{ resourceId: 'strength', amount: 3 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'count_whats_inside',
      name: 'Count What’s Inside',
      tags: ['sight'],
      description: 'Feel through everything inside you, coin by coin, and know what each thing is and roughly what it is worth.',
      affordances: ['count my coins', 'feel inside', 'what is inside me', 'check my belly', 'appraise', 'count the coins', 'what am i holding'],
      costs: [{ resourceId: 'strength', amount: 2 }],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: { attribute: 'mind', skillId: 'appraise', baseDc: 10 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'strike_a_bargain',
      name: 'Strike a Bargain',
      tags: ['social'],
      description: 'Offer somebody something they want for something you want, and mean it enough that they believe a box.',
      affordances: ['make a deal', 'bargain', 'offer her', 'offer him', 'trade', 'a deal', 'negotiate', 'what do you want', 'make an offer'],
      costs: [{ resourceId: 'strength', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'bargain', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'listen_to_the_stone',
      name: 'Listen to the Stone',
      tags: ['sight'],
      description: 'Go still and listen through the floor: feet three rooms away, traps resetting, voices in the walls.',
      affordances: ['listen', 'listen through the floor', 'feel the dungeon', 'hear the walls', 'listen to the stone', 'listen to the gallery'],
      costs: [{ resourceId: 'strength', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'deep_sense', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'hop',
      name: 'Hop',
      tags: ['movement'],
      description: 'Throw your whole weight forward and land about a hand’s width further on. It works. It is extremely loud.',
      affordances: ['hop', 'bounce', 'shuffle', 'scoot', 'move myself', 'lurch forward', 'rock forward'],
      costs: [{ resourceId: 'strength', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'agility', skillId: 'scuttle', baseDc: 11 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'grow_legs',
      name: 'Grow Legs',
      tags: ['movement'],
      description: 'Let the itch underneath you become legs: short, many and quick. You can walk, run and climb stairs.',
      affordances: ['grow legs', 'stand up', 'use my legs', 'run on my legs', 'walk on my legs', 'climb the stairs', 'scuttle'],
      costs: [
        { resourceId: 'strength', amount: 8 },
        { resourceId: 'strain', amount: 8 },
      ],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'agility', skillId: 'scuttle', baseDc: 12 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:your_own_shape'],
        lockedCopy: 'Something underneath you itches like a limb you have never had. It is not ready to be anything yet.',
      },
    },
    {
      id: 'wear_a_shape',
      name: 'Wear a Shape',
      tags: ['utility'],
      description: 'Become a different piece of furniture: a barrel, a door, a crate, a bench. The old mimics could wear a face.',
      affordances: ['become a barrel', 'become a door', 'disguise myself', 'change shape', 'wear a shape', 'turn into', 'look like a'],
      costs: [
        { resourceId: 'strength', amount: 10 },
        { resourceId: 'strain', amount: 16 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: { attribute: 'arcana', skillId: 'mimicry', baseDc: 15 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:the_old_shapes'],
        lockedCopy: 'You are a chest. You can feel the edges of being something else, the way you feel a word on the tip of your tongue, and no further.',
      },
    },
    {
      id: 'lock_your_lid',
      name: 'Lock Your Lid',
      tags: ['defensive'],
      description: 'Turn the lock in your own lid from the inside. Nobody opens you without the key, and you are the key.',
      affordances: ['lock my lid', 'lock myself', 'turn my lock', 'lock it from inside', 'pick the lock'],
      costs: [{ resourceId: 'strength', amount: 3 }],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: null,
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'throw_your_voice',
      name: 'Throw Your Voice',
      tags: ['social'],
      description: 'Make a borrowed voice come from somewhere else in the room: behind a door, inside another chest, over a shoulder.',
      affordances: ['throw my voice', 'make it come from', 'voice from behind', 'ventriloquise', 'from another chest'],
      costs: [
        { resourceId: 'strength', amount: 4 },
        { resourceId: 'strain', amount: 5 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'arcana', skillId: 'mimicry', baseDc: 13 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'name_a_price',
      name: 'Name a Price',
      tags: ['social'],
      description: 'Tell somebody exactly what a thing is worth to them, and be right, which unsettles people.',
      affordances: ['name a price', 'name my price', 'price it', 'value it', 'haggle', 'what it is worth'],
      costs: [{ resourceId: 'strength', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'appraise', baseDc: 12 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'dead_weight',
      name: 'Dead Weight',
      tags: ['defensive'],
      description: 'Become impossibly heavy. Nobody lifts you, tips you or carries you off until you decide to let them.',
      affordances: ['dead weight', 'make myself heavy', 'plant myself', 'too heavy to lift', 'refuse to be moved'],
      costs: [
        { resourceId: 'strength', amount: 5 },
        { resourceId: 'strain', amount: 6 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: { attribute: 'resolve', skillId: 'stillness', baseDc: 12 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
    },
  ],
  locations: [
    {
      id: 'the_ninth_vault',
      name: 'The Ninth Vault',
      shortName: 'The Vault',
      description:
        'The deepest room in the Gilt Deep. A round stone chamber with one door, nine plinths around the wall and one chest in the middle, which is you. There were nine chests once. The other eight were carried up thirty years ago and nobody brought them back. Behind the seventh plinth is a goblin hatch no delver has ever noticed.',
      artDirection:
        'Round underground stone vault lit by a single swinging lantern, nine empty stone plinths around the wall, one iron-banded treasure chest in the centre with gold glinting under its lid. Deep shadows, warm gold light, old dust.',
      connections: [
        { to: 'the_hall_of_false_chests', travelMinutes: 2, label: 'The only door' },
        { to: 'the_back_corridors', travelMinutes: 2, label: 'The goblin hatch behind the seventh plinth' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [
        { itemId: 'lirelles_satchel', qty: 1, ownerId: 'lirelle', aka: ['satchel', 'her satchel', 'her bag', 'the bag', 'the leather bag'] },
      ],
    },
    {
      id: 'the_hall_of_false_chests',
      name: 'The Hall of False Chests',
      shortName: 'False Chests',
      description:
        'A long hall above the vault with forty chests in four rows, every one of them identical to you from the outside and every one of them empty, trapped, or both. It is the keeper’s joke and his best defence: a thief gets forty guesses, and thirty-nine of them bite back with springs.',
      artDirection:
        'Long torchlit dungeon hall lined with four neat rows of identical iron-banded chests, a few sprung open showing coiled trap springs, flagstones scored by dragged boxes. Orderly, eerie, faintly comic.',
      connections: [
        { to: 'the_ninth_vault', travelMinutes: 2, label: 'Down to the vault' },
        { to: 'the_keepers_study', travelMinutes: 4, label: 'The tidy door at the end' },
        { to: 'the_long_stair', travelMinutes: 3, label: 'Out to the stair' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
      takeableItems: [
        { itemId: 'empty_chest', qty: 3, ownerId: null, aka: ['a false chest', 'an empty chest', 'one of the chests', 'a chest', 'another chest'] },
      ],
    },
    {
      id: 'the_keepers_study',
      name: 'The Keeper’s Study',
      shortName: 'Ash’s Study',
      description:
        'A dry, warm, beautifully kept office one floor up from the vault. Ledgers to the ceiling, a desk with an inkwell that never runs dry, a cold hearth, and one chair that nobody else is allowed to sit in. Ash has kept the dungeon’s books here for three hundred years.',
      artDirection:
        'Immaculate underground study, floor-to-ceiling shelves of leather ledgers, a large desk with an inkwell and spectacles, a cold marble hearth, blue candle flames. Orderly, scholarly, quietly unnerving.',
      connections: [
        { to: 'the_hall_of_false_chests', travelMinutes: 4, label: 'Back to the false chests' },
        { to: 'the_back_corridors', travelMinutes: 2, label: 'The staff door behind the shelves' },
        { to: 'the_gallery_of_echoes', travelMinutes: 5, label: 'The old passage' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 1 },
      takeableItems: [
        { itemId: 'ash_ledger', qty: 1, ownerId: 'ash', aka: ['ledger', 'the ledger', 'the books', 'his ledger', 'the accounts'] },
      ],
    },
    {
      id: 'the_back_corridors',
      name: 'The Back Corridors',
      shortName: 'Back Ways',
      description:
        'Narrow service passages behind the dungeon’s walls, lit by grubby lamps, where goblin staff push trolleys of fresh coins, reset spring traps and complain. Every room in the Gilt Deep has a hatch into these somewhere, and no delver has ever found one.',
      artDirection:
        'Cramped stone service tunnel behind a dungeon wall, low ceiling, grubby oil lamps, a wooden trolley piled with coins and spare trap springs, chalk rota marks on the wall. Busy, shabby, cosy.',
      connections: [
        { to: 'the_ninth_vault', travelMinutes: 2, label: 'The hatch into the vault' },
        { to: 'the_keepers_study', travelMinutes: 2, label: 'The hatch behind the keeper’s shelves' },
        { to: 'the_staff_canteen', travelMinutes: 4, label: 'Down to the canteen' },
        { to: 'the_well_mouth', travelMinutes: 40, lockedByFlag: 'pell_showed_the_way', label: 'The long goblin way up, to a cellar under the market' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 0 },
      takeableItems: [
        { itemId: 'staff_keyring', qty: 1, ownerId: 'pell', aka: ['keys', 'keyring', 'her keys', 'the key ring'] },
      ],
    },
    {
      id: 'the_staff_canteen',
      name: 'The Staff Canteen',
      shortName: 'Canteen',
      description:
        'Where the Deep’s staff eat: three long tables, a stew pot as big as a delver, a rota on the wall and a noticeboard of grievances. Goblins, two tired skeletons who do the heavy lifting, and a slime who runs the washing-up.',
      artDirection:
        'Underground staff canteen, long scrubbed tables, an enormous bubbling stew pot, a chalk rota and a crowded noticeboard, goblins on benches, a skeleton carrying crates. Warm, noisy, lived-in.',
      connections: [{ to: 'the_back_corridors', travelMinutes: 4, label: 'Back into the corridors' }],
      discoveredByDefault: true,
      mapPosition: { x: -2, y: 0 },
    },
    {
      id: 'the_gallery_of_echoes',
      name: 'The Gallery of Echoes',
      shortName: 'Echo Gallery',
      description:
        'The oldest room in the Deep: a curved gallery of pale stone that keeps every voice ever spoken in it and plays them back, softly and out of order, for ever. Three hundred years of delvers are still talking in here. So are some voices that sound as if they came from very far away.',
      artDirection:
        'Curved gallery of pale smooth stone with shell-like ridges, faint glowing ripples where sound moves across the walls, a few curls of pale stone on the floor. Hushed, beautiful, uncanny.',
      connections: [
        { to: 'the_keepers_study', travelMinutes: 5, label: 'The old passage to the study' },
        { to: 'the_long_stair', travelMinutes: 4, label: 'Out to the stair landing' },
        { to: 'the_first_vault', travelMinutes: 6, lockedByFlag: 'knows:the_first_vault', label: 'The seam in the floor that only opens for someone who knows it is there' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 1 },
      takeableItems: [
        { itemId: 'voice_shell', qty: 2, ownerId: null, aka: ['shell', 'a shell', 'a stone', 'voice stone', 'the pale stone'] },
      ],
    },
    {
      id: 'the_long_stair',
      name: 'The Long Stair',
      shortName: 'The Stair',
      description:
        'Nine floors of switchback stair from the vault to the surface, with a landing on every floor and a trap on most. At six every morning it seals for an hour while the dungeon resets, and anybody still on it finds out what the traps are for.',
      artDirection:
        'Huge switchback stone stairway descending through a dungeon shaft, landings at each turn, pressure plates and dart holes in the walls, torch brackets, a sliver of daylight far above. Vertiginous, dangerous, grand.',
      connections: [
        { to: 'the_hall_of_false_chests', travelMinutes: 3, label: 'Down to the false chests' },
        { to: 'the_gallery_of_echoes', travelMinutes: 4, label: 'The pale archway on the eighth landing' },
        { to: 'the_delvers_camp', travelMinutes: 45, label: 'Up to the camp on the third floor' },
        { to: 'the_well_mouth', travelMinutes: 90, label: 'All the way up' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 2 },
    },
    {
      id: 'the_delvers_camp',
      name: 'The Delvers’ Camp',
      shortName: 'The Camp',
      description:
        'A safe landing on the third floor where the Guild’s rules say nobody fights: braziers, bedrolls, a Guild noticeboard, and a man selling bad tea at good prices. Every party rests here on the way down, and every rumour does too.',
      artDirection:
        'Wide stone landing turned into a camp, braziers, bedrolls, a wooden noticeboard covered in contracts, a tea seller with a dented kettle, delvers mending gear. Smoky, friendly, watchful.',
      connections: [{ to: 'the_long_stair', travelMinutes: 45, label: 'Back onto the stair' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 3 },
      takeableItems: [
        { itemId: 'bounty_notice', qty: 1, ownerId: null, aka: ['notice', 'the notice', 'the bounty', 'the poster'] },
      ],
    },
    {
      id: 'the_well_mouth',
      name: 'The Well Mouth',
      shortName: 'Well Mouth',
      description:
        'Where the Gilt Deep meets the town: a wide stone well with a stair spiralling down its inside, a Guild checkpoint with a ledger and two bored guards, and Brightwell’s market crowding right up to the rim. Fresh air. Daylight, if it is day.',
      artDirection:
        'Wide old stone well in a busy market square, a spiral stair vanishing down inside it, a Guild checkpoint table with a ledger, market stalls and awnings pressed close around the rim. Bright, crowded, open sky.',
      connections: [
        { to: 'the_long_stair', travelMinutes: 90, label: 'Down into the Deep' },
        { to: 'the_guildhouse', travelMinutes: 5, label: 'Across the square to the Guildhouse' },
        { to: 'the_stitchers_hall', travelMinutes: 8, label: 'The lane of the satchel-makers' },
        { to: 'the_back_corridors', travelMinutes: 40, lockedByFlag: 'pell_showed_the_way', label: 'The cellar door under the onion stall' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 4 },
    },
    {
      id: 'the_guildhouse',
      name: 'The Guildhouse',
      shortName: 'Guildhouse',
      description:
        'The Delvers’ Guild hall on the square: a contract board, a counting room, a bounty wall, and up in the tower a great bronze chime that had not rung in thirty years until tonight. Edda Quell’s office is directly under the chime.',
      artDirection:
        'Grand guild hall interior, a wall of pinned contracts, a counting room behind a grille, a staircase up to a tower with a huge bronze bell, an appraiser’s office crowded with scales and notebooks. Official, busy, slightly menacing.',
      connections: [{ to: 'the_well_mouth', travelMinutes: 5, label: 'Back to the Well Mouth' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 5 },
      takeableItems: [
        { itemId: 'the_chime', qty: 1, ownerId: 'edda', aka: ['chime', 'the bell', 'silver bell', 'her chime'] },
      ],
    },
    {
      id: 'the_stitchers_hall',
      name: 'The Stitchers’ Hall',
      shortName: 'Stitchers',
      description:
        'A long workshop where deep satchels are made and mended: shelves of bags that used to hold a wagonload each and now hold a week’s shopping. The stitchers work quietly. Every bag on those shelves was once a mimic, and the oldest of them still hum when somebody opens them.',
      artDirection:
        'Long workshop with high shelves of leather satchels, needles and thick thread on worktables, lamplight, quiet craftsmen bent over their work, one satchel glowing faintly on a cushion. Hushed, skilled, melancholy.',
      connections: [{ to: 'the_well_mouth', travelMinutes: 8, label: 'Back to the square' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 5 },
    },
    {
      id: 'the_first_vault',
      name: 'The First Vault',
      shortName: 'First Vault',
      description:
        'A vault under the vault, on no map and at the bottom of no stair: a perfectly round room with a ring of old iron bands set into the floor, where the first mimic in the Deep woke up. The air smells of rain from somewhere else. The summoning drawn on the floor is still drawn.',
      artDirection:
        'Small perfectly round chamber deep underground, a ring of rusted iron chest-bands set into the floor around a faintly glowing circle of drawn lines, a soft draught carrying rain from nowhere. Quiet, strange, sacred.',
      connections: [{ to: 'the_gallery_of_echoes', travelMinutes: 6, label: 'Back up through the seam' }],
      discoveredByDefault: false,
      mapPosition: { x: 2, y: 0 },
    },
  ],
  factions: [
    {
      id: 'faction_guild',
      name: 'The Delvers’ Guild',
      description:
        'Licenses delvers, keeps the checkpoint at the Well Mouth, pays bounties, and owns the satchel trade that built Brightwell. It hunted the mimics to extinction thirty years ago and kept the bounty plate. Its contracts desk wants the Cinder so the Deep can be collected like rent; its appraisal desk wants your heart.',
      startingReputation: -20,
      ranks: [
        { atReputation: -60, label: 'Hunted' },
        { atReputation: -20, label: 'A Bounty' },
        { atReputation: 10, label: 'A Curiosity' },
        { atReputation: 40, label: 'On the Books' },
      ],
      allies: ['faction_stitchers'],
      enemies: [],
    },
    {
      id: 'faction_staff',
      name: 'The Deep Staff',
      description:
        'The goblins, skeletons and one patient slime who run the Gilt Deep for its keeper: they reset the traps, restock the chests and do the washing-up. Technically, you are their stock. They look after their own, and they have not decided whether you count.',
      startingReputation: 15,
      ranks: [
        { atReputation: 0, label: 'Stock' },
        { atReputation: 30, label: 'One of the Staff' },
        { atReputation: 60, label: 'Senior Staff' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_stitchers',
      name: 'The Stitchers’ Hall',
      description:
        'Brightwell’s satchel-makers, who stitch a mimic’s heart into a bag to make it bottomless. Every bag they ever made is going shallow, there are no new hearts, and they are quietly desperate. A living mimic is either their last raw material or their first partner.',
      startingReputation: 0,
      ranks: [
        { atReputation: -30, label: 'Raw Material' },
        { atReputation: 0, label: 'A Prospect' },
        { atReputation: 40, label: 'A Partner' },
      ],
      allies: ['faction_guild'],
      enemies: [],
    },
  ],
  characters: [
    {
      id: 'lirelle',
      name: 'Lirelle',
      role: 'Elf thief with her hand in your coins. Licensed delver, and in debt to the Guild for more than she will ever see',
      cardBlurb:
        'Her hand is in your gold before she knows you are alive, she has already worked out what you are worth upstairs, and she might be the first person in thirty years to decide a mimic is worth more as a friend.',
      pronouns: 'she/her',
      publicTraits: ['Prices everything in a room on the way in', 'Fast hands, faster mouth', 'Talks to locks, doors and chests out of habit'],
      hiddenDrives: [
        'She wants out of the Guild’s debt so badly that forty thousand crowns sounds like a door opening, and she hates that it does',
        'She has been lonely for about a century in a way she covers with jokes, and a box that answers back is the most interesting thing to happen to her in years',
      ],
      values: ['A deal is a deal once both sides have said it out loud', 'Nobody gets left on the stair at six'],
      fears: [
        'Dying in debt, so that what she owes passes to Bruno',
        'Finding out she is exactly as mercenary as the Guild thinks she is',
      ],
      socialStyle:
        'Keeps her hands busy and her eyes on the exit. Asks two questions at once so nobody can answer only the easy one. Goes very quiet and very polite right before she does something reckless.',
      boundaries: [
        'Will not sell anybody who has asked her for help by name',
        'Will not leave Bruno behind for any amount of money',
        'Will not take orders from a chest, however charming it is',
      ],
      goals: [
        'Get the Cinder up the stair before the second reset and clear her debt',
        'Work out what the warm chest is before Bruno does something heroic about it',
      ],
      secrets: [
        {
          id: 'lirelle_the_debt',
          fact: 'Her Guild contract is not wages. Nine years ago she stole a deep satchel from Edda Quell’s own desk, and the Guild let her off the rope in exchange for a bond she can only clear by bringing the keeper’s Cinder up from the Ninth Vault. If the contract lapses at the second reset, her bond is sold.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She says it herself, in the vault or at the camp, if you ask what the job is really for rather than what it pays.',
        },
        {
          id: 'lirelle_the_hum',
          fact: 'The satchel on her hip is the one she stole. It was made from a mimic, it is going shallow, and she talks to it when she thinks nobody is listening. It used to hum. When she put her hand inside you, it started humming again.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If you mention the satchel, or it reacts to you where she can see, she goes quiet and tells you about the humming.',
        },
      ],
      speechStyle:
        'Quick, dry and transactional. Prices things out loud and gives odds. Asks two questions in one breath. Says "do me a favour" instead of please. When a conversation goes somewhere she does not like, she changes the subject to money or the way out, and only once in a long while restarts it with a flat "Right."',
      topics: ['the job', 'the Guild debt', 'her satchel', 'the bounty', 'Bruno', 'robbing dungeons'],
      voiceSamples: [
        'Hello? You’re warm. Why are you warm?',
        'Right. Ground rules. You don’t bite, I don’t scream, and nobody tells Bruno I said hello to the furniture.',
        'Forty thousand crowns upstairs. I’m telling you so you know exactly what I’m walking away from. Do me a favour and be worth it.',
        'Nine years robbing this hole and it never once answered back. Why you? Why tonight?',
        'It used to hum. I’d lie awake and listen to it. It stopped two winters ago, and then I put my hand in you and it started again.',
      ],
      appearance:
        'An elf woman of a hundred and sixty-three who looks about twenty-eight: a long pale braid wound twice round her head and pinned with a lockpick, long pointed ears, sharp green eyes, practical dark delver’s leathers, scuffed at the knees and patched at one elbow, fingerless gloves, a knife on her belt and a worn leather satchel on her hip.',
      visualHook: 'A long pale braid wound twice round her head like a crown, pinned in place with a lockpick.',
      silhouette: 'Down on one knee beside an open iron-banded treasure chest, one arm deep among its gold coins, head tipped to listen.',
      artSeed: 'mimic-lirelle-01',
      portrait: null,
      expressions: ['neutral', 'amused', 'wary', 'surprised', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'the_delvers_camp', activity: 'asleep on a bedroll with one hand on her satchel' },
        { startMinute: 360, endMinute: 720, locationId: 'the_long_stair', activity: 'working the stair traps on the way down' },
        { startMinute: 720, endMinute: 1080, locationId: 'the_hall_of_false_chests', activity: 'testing false chests with a bent wire' },
        { startMinute: 1080, endMinute: 1320, locationId: 'the_delvers_camp', activity: 'eating standing up and arguing with Bruno about the plan' },
        { startMinute: 1320, endMinute: 1440, locationId: 'the_ninth_vault', activity: 'kneeling at the vault chest with her arm inside it' },
      ],
      homeLocationId: 'the_delvers_camp',
      knowledgeScope: ['the_gilt_deep', 'the_guild', 'the_bounty', 'deep_satchels', 'the_cinder_job', 'brightwell'],
      startingRelationship: { trust: 10, affection: 15, respect: 10, fear: 20, rivalry: 0 },
      gates: [
        {
          id: 'lirelle_names_the_job',
          label: 'She tells you what the job is really for',
          kind: 'TRUST',
          requires: { trust: 35 },
        },
        {
          id: 'lirelle_makes_you_crew',
          label: 'She counts you as crew, with a share',
          kind: 'ALLIANCE',
          requires: { trust: 55, respect: 40 },
        },
        {
          id: 'lirelle_stops_joking',
          label: 'She stops joking when it matters',
          kind: 'ROMANCE',
          requires: { trust: 65, affection: 60, flagsSet: ['knows:the_cinder'] },
        },
      ],
      attributes: { might: 10, agility: 17, mind: 14, presence: 13, resolve: 12, arcana: 9 },
      companion: null,
      scouting: null,
      combatant: { health: 40, defenseDc: 15, damage: 7, tags: ['delver', 'elf', 'knife'] },
    },
    {
      id: 'ash',
      name: 'Ash',
      role: 'The lich who keeps the Gilt Deep. Dead for three hundred and twelve years, and still doing the accounts',
      cardBlurb:
        'He runs the dungeon like a well-kept shop, he would like his life back out of your belly, and he is far too polite to say what he will do if you refuse.',
      pronouns: 'he/him',
      publicTraits: ['Unfailingly courteous', 'Keeps meticulous books', 'Proud of how many delvers go home'],
      hiddenDrives: [
        'He is tired in a way three centuries of good manners have not fixed, and he has started to wonder what it would be like to stop',
        'He brought something into the world that thinks, and he has not decided whether he owes it an apology or a job',
      ],
      values: ['A dungeon is a contract: risk for reward, fairly priced', 'Manners, especially towards people you could destroy'],
      fears: [
        'Dying suddenly while the Deep is full of delvers, so that it comes down on all of them',
        'Being remembered as a monster by the only creature he ever made',
      ],
      socialStyle:
        'Receives people the way a host receives guests. Offers chairs to things that cannot sit. Turns every threat into an entry in a ledger and then reads the entry aloud.',
      boundaries: [
        'Will not break a mimic to get at what is inside it, because whatever is inside a mimic is lost when it breaks',
        'Will not harm a delver who is leaving',
        'Will not write a false entry in his own ledger',
      ],
      goals: [
        'Get the Cinder back without anybody being hurt, if that can be arranged',
        'Keep the Deep running through the six o’clock reset',
      ],
      secrets: [
        {
          id: 'ash_called_you',
          fact: 'He called the player’s soul into the vault chest himself, six months ago, with a summoning drawn in the First Vault below the Ninth. He needed a guardian for the Cinder that no thief could open. Like everybody, he took the old mimics’ borrowed voices for parroting, so he expected a hungry animal, got a person, and has been too ashamed to say so. Nobody else knows. He never volunteers it, and tells only a player he trusts who asks him outright why they woke up here.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He confesses only to a player he trusts who asks him, directly, why they woke up here. The Gallery of Echoes and his own ledger both give it away to somebody who goes looking.',
        },
        {
          id: 'ash_wants_to_rest',
          fact: 'He would like to stop. If the Cinder were broken at the hour the stair is empty, the Deep would go quiet without trapping anybody, and he would finally rest. He has never asked, because nobody who held the Cinder ever listened to him.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He asks only somebody who holds the Cinder, has heard him out, and has given him reason to think they would do it gently.',
        },
      ],
      speechStyle:
        'Courteous, formal and exact, with a bookkeeper’s vocabulary: entries, accounts, the books, settling up. Apologises before every threat. Never raises his voice; the room gets colder instead.',
      topics: ['the Cinder', 'the Deep', 'his ledger', 'the reset', 'the old mimics', 'his staff'],
      voiceSamples: [
        'Do sit. Ah. You can’t. Forgive me; it has been a long while since the treasure had opinions.',
        'Forty-one delvers came down this year and thirty-nine went home. I keep that entry where I can see it.',
        'You are holding my life among your coins. I should like it returned, and I should like to ask nicely first, because the other way is so very loud.',
        'Three hundred and twelve years, and not once has an item in the inventory lodged a complaint. Please, go on. I am taking notes.',
      ],
      appearance:
        'A very tall skeleton, fifty-one when he died and three hundred and twelve years dead since, in an immaculate charcoal frock coat and white cravat, with half-moon spectacles on a skull that should not need them and two small cold blue lights for eyes.',
      visualHook: 'Half-moon reading spectacles perched on a bare skull, with cold blue pinpoints of light behind the lenses.',
      silhouette: 'Very tall and very straight, hands clasped behind his back, head inclined like a shopkeeper greeting a customer.',
      artSeed: 'mimic-ash-01',
      portrait: null,
      expressions: ['neutral', 'courteous', 'amused', 'grave', 'cold'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'the_keepers_study', activity: 'balancing the night’s ledger by blue candlelight' },
        { startMinute: 360, endMinute: 420, locationId: 'the_long_stair', activity: 'walking the stair for the six o’clock reset' },
        { startMinute: 420, endMinute: 1260, locationId: 'the_keepers_study', activity: 'at his desk, doing the accounts' },
        { startMinute: 1260, endMinute: 1440, locationId: 'the_gallery_of_echoes', activity: 'listening to old voices before the night' },
      ],
      homeLocationId: 'the_keepers_study',
      knowledgeScope: ['the_gilt_deep', 'the_cinder', 'the_ledger', 'the_reset', 'old_mimics', 'the_first_vault', 'the_staff'],
      startingRelationship: { trust: 20, affection: 10, respect: 25, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'ash_explains_the_cinder',
          label: 'He tells you what the Cinder is',
          kind: 'TRUST',
          requires: { trust: 35 },
        },
        {
          id: 'ash_confesses',
          label: 'He tells you why you woke up here',
          kind: 'TRUST',
          requires: { trust: 65, flagsSet: ['knows:the_cinder'] },
        },
        {
          id: 'ash_offers_the_deep',
          label: 'He offers you the keeping of the Deep',
          kind: 'ALLIANCE',
          requires: { trust: 70, respect: 55, flagsSet: ['cinder_returned'] },
        },
      ],
      attributes: { might: 12, agility: 9, mind: 18, presence: 16, resolve: 17, arcana: 20 },
      companion: null,
      scouting: null,
      combatant: { health: 90, defenseDc: 18, damage: 12, tags: ['lich', 'keeper', 'cold'] },
    },
    {
      id: 'pell',
      name: 'Pell',
      role: 'Goblin on the Deep’s staff. Polishes the treasure, restocks the chests, and has talked to you twice a day for six months',
      cardBlurb:
        'She has told you every secret she has, twice a day for six months, because chests do not talk back. You just did, and she is going to need a minute.',
      pronouns: 'she/her',
      publicTraits: ['Never stops talking', 'Knows every back way in the Deep', 'Brave about exactly one thing at a time'],
      hiddenDrives: [
        'She wants to see the sun once and has been saving coppers for a hooded coat for four years',
        'She wants somebody to say her name the way delvers say each other’s',
      ],
      values: ['Staff look after staff', 'Shiny things deserve to be shiny'],
      fears: [
        'Delvers, who are paid two silver for a goblin ear',
        'Being told off by the keeper again, which happened once, very politely, and she has not recovered',
      ],
      socialStyle:
        'Talks in long runs joined with "and" and stops only to breathe. Polishes whatever is nearest when she is nervous. Hides behind furniture and keeps talking from there.',
      boundaries: [
        'Will not go near a delver with a blade out',
        'Will not give the keeper’s back ways to the Guild, ever',
        'Will not leave a friend locked in anywhere',
      ],
      goals: [
        'Find out how long you have been listening, and how much you heard',
        'Get to the surface without anybody taking her ears',
      ],
      secrets: [
        {
          id: 'pell_the_way_up',
          fact: 'The back corridors run all the way up to a goblin hatch in a cellar under Brightwell market. The staff use it to buy onions. No delver and nobody in the Guild knows it exists.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She shows you the way up if you have promised to take her with you and she believes you meant it.',
        },
        {
          id: 'pell_told_you_everything',
          fact: 'Over six months she told the chest every staff secret in the Deep, including which trap on the stair does not work, where the keeper keeps his spare spectacles, and that she once tried on his coat.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She asks you in a very small voice exactly how much you heard. Tell her the truth and she tells you the rest.',
        },
      ],
      speechStyle:
        'Fast, breathless and cheerful, sentences running on with "and" until she runs out of air. Shouts the important word in capitals when she is upset. Calls the player "Box" and cannot be talked out of it.',
      topics: ['the back corridors', 'the staff', 'the keeper', 'the surface', 'what you heard', 'polishing'],
      voiceSamples: [
        'You TALK? Six months, Box. Six months of me telling you everything and you TALK?',
        'And I told you about the trapdoor and the onions and the keeper’s coat and oh no. Oh no. How much did you hear?',
        'Goblins don’t go on the Guild lists with names, we go on with prices, two silver an ear, so I keep mine on.',
        'Lid up means yes and lid down means no, okay? Just do the lid and I’ll do the rest.',
      ],
      appearance:
        'An adult goblin woman of twenty-four, wiry and long-limbed for a goblin, with a sharp, work-worn face and grey-green skin, enormous pointed ears with three brass rings in the left one, sleeves rolled over forearms corded from years of pushing the coin trolley, a staff apron covered in polish stains and a rag tucked into the waistband.',
      visualHook: 'Enormous pointed ears, the left one ringed with three brass hoops, and a polishing rag always in one hand.',
      silhouette: 'Leaning on a coin trolley piled with gold, rag over one shoulder, ears swivelled towards whoever is talking.',
      artSeed: 'mimic-pell-01',
      portrait: null,
      expressions: ['neutral', 'delighted', 'panicked', 'embarrassed', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'the_staff_canteen', activity: 'curled up under the long table with her apron for a blanket' },
        { startMinute: 360, endMinute: 480, locationId: 'the_back_corridors', activity: 'resetting spring traps after the six o’clock reset' },
        { startMinute: 480, endMinute: 720, locationId: 'the_hall_of_false_chests', activity: 'restocking false chests with fake coins' },
        { startMinute: 720, endMinute: 1020, locationId: 'the_staff_canteen', activity: 'lunch, gossip and arguing about the rota' },
        { startMinute: 1020, endMinute: 1320, locationId: 'the_back_corridors', activity: 'pushing the coin trolley from room to room' },
        { startMinute: 1320, endMinute: 1440, locationId: 'the_back_corridors', activity: 'behind the vault hatch with a polishing rag, waiting her turn' },
      ],
      homeLocationId: 'the_staff_canteen',
      knowledgeScope: ['the_gilt_deep', 'the_back_corridors', 'the_staff', 'the_keeper', 'the_cellar_way'],
      startingRelationship: { trust: 25, affection: 45, respect: 10, fear: 15, rivalry: 0 },
      gates: [
        {
          id: 'pell_tells_the_rest',
          label: 'She tells you everything else she knows about the Deep',
          kind: 'TRUST',
          requires: { trust: 40 },
        },
        {
          id: 'pell_shows_the_way',
          label: 'She shows you the goblin way up',
          kind: 'TRUST',
          requires: { trust: 55, flagsSet: ['promised_pell_the_sun'] },
        },
      ],
      attributes: { might: 7, agility: 15, mind: 12, presence: 10, resolve: 9, arcana: 8 },
      companion: null,
      scouting: null,
      combatant: { health: 18, defenseDc: 13, damage: 2, tags: ['goblin', 'staff'] },
    },
    {
      id: 'bruno',
      name: 'Bruno Fenn',
      role: 'Lirelle’s shield-bearer. A big, careful man on what he has promised is his last delve',
      cardBlurb:
        'He is the only one in the room who believed you were a mimic straight away, his shield has not come down since, and of everybody who wants something from you he is the one who would most like to just go home.',
      pronouns: 'he/him',
      publicTraits: ['Moves slowly and on purpose', 'Superstitious about the Deep', 'Kind to anything that is not trying to kill him'],
      hiddenDrives: [
        'His grandfather killed the second-to-last mimic for the bounty, the family farm was bought with it, and Bruno has never felt clean about that money',
        'He wants one delve that pays enough to stop lying to his wife about where he goes',
      ],
      values: ['Everybody who walks in walks out', 'Pay your debts, including the old ones'],
      fears: [
        'Being the last thing between Lirelle and something he cannot hold',
        'Telling his wife the truth and watching her face while he does',
      ],
      socialStyle:
        'Stands between people and danger without being asked and without remarking on it. Slow to speak, slower to move, impossible to hurry. Quotes his gran when he is frightened.',
      boundaries: [
        'Will not strike first at anything that has not struck at him',
        'Will not leave anybody on the stair at six',
        'Will not help sell a living thing that has asked to live',
      ],
      goals: [
        'Get himself and Lirelle off the stair before the six o’clock reset',
        'Earn enough on this delve to retire to the farm for good',
      ],
      secrets: [
        {
          id: 'bruno_the_grandfather',
          fact: 'Thirty years ago his grandfather, Aldo Fenn, was the hunter who killed the second-to-last mimic in Brightwell. The bounty bought the family farm. Bruno has known where the money came from his whole adult life.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells you if you ask about his gran’s nine fingers, or after you have saved his life.',
        },
        {
          id: 'bruno_the_barrels',
          fact: 'His wife Marta believes he is a cooper who travels to sell barrels. He has been a delver for eleven years. This is supposed to be his last delve, and he has said so four times.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He admits it at the camp, by the brazier, if you ask what he is going home to.',
        },
      ],
      speechStyle:
        'Slow, low and deliberate. Short sentences, often two or three words. Talks to frightened things to calm them, himself included. Quotes his gran’s sayings and then explains them.',
      topics: ['his gran', 'the farm', 'his wife', 'the shield', 'the reset', 'mimics'],
      voiceSamples: [
        'Lirelle. Hand out. Slowly.',
        'My gran had a saying. Never trust a chest that’s warmer than the room. She had nine fingers, my gran.',
        'Easy. Easy now. Nobody’s biting anybody before supper.',
        'Shield stays up. That’s not about you. That’s just how I stand.',
        'Eleven years I’ve told Marta I sell barrels. She’s very proud of the barrels.',
      ],
      appearance:
        'A broad human man of thirty-eight with a sandy beard and a shaved head, dented plate armour over a quilted coat, and a tower shield almost as tall as he is with a small barrel painted on it for luck.',
      visualHook: 'A huge dented tower shield with a small barrel painted on its face for luck.',
      silhouette: 'Square and immovable behind the shield, one eye over the rim.',
      artSeed: 'mimic-bruno-01',
      portrait: null,
      expressions: ['neutral', 'wary', 'patient', 'warm', 'alarmed'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'the_delvers_camp', activity: 'sitting up with his shield across his knees, mostly sleeping' },
        { startMinute: 360, endMinute: 720, locationId: 'the_long_stair', activity: 'going down first, shield first' },
        { startMinute: 720, endMinute: 1080, locationId: 'the_hall_of_false_chests', activity: 'holding the door while Lirelle works' },
        { startMinute: 1080, endMinute: 1320, locationId: 'the_delvers_camp', activity: 'cooking something plain over the brazier' },
        { startMinute: 1320, endMinute: 1440, locationId: 'the_ninth_vault', activity: 'by the vault door with his shield up' },
      ],
      homeLocationId: 'the_delvers_camp',
      knowledgeScope: ['the_gilt_deep', 'the_guild', 'the_reset', 'mimic_stories', 'brightwell'],
      startingRelationship: { trust: 0, affection: 0, respect: 15, fear: 30, rivalry: 0 },
      gates: [
        {
          id: 'bruno_lowers_the_shield',
          label: 'He lowers his shield around you',
          kind: 'TRUST',
          requires: { trust: 35 },
        },
        {
          id: 'bruno_carries_you',
          label: 'He agrees to carry you',
          kind: 'ALLIANCE',
          requires: { trust: 40, respect: 30 },
        },
        {
          id: 'bruno_tells_you_about_aldo',
          label: 'He tells you where the farm money came from',
          kind: 'TRUST',
          requires: { trust: 55, flagsSet: ['party_knows'] },
        },
      ],
      attributes: { might: 17, agility: 9, mind: 11, presence: 12, resolve: 16, arcana: 6 },
      companion: null,
      scouting: null,
      combatant: { health: 70, defenseDc: 17, damage: 9, tags: ['delver', 'shield', 'human'] },
    },
    {
      id: 'edda',
      name: 'Edda Quell',
      role: 'The Delvers’ Guild’s senior appraiser. Carries the silver chime that rings near a mimic, and has come to collect you',
      cardBlurb:
        'She is coming down the stair with a silver chime that rings near a mimic, she knows exactly what your heart is worth to a town whose bags are emptying, and she would honestly prefer to take you alive.',
      pronouns: 'she/her',
      publicTraits: ['Precise and unhurried', 'Polite to everyone, bounties included', 'Has never once missed with the chime'],
      hiddenDrives: [
        'Thirty years ago, as the Guild’s apprentice appraiser, she held the chime while the last mimic was killed, and she has wanted ever since to do it differently',
        'She believes a living mimic, kept well in the Stitchers’ Hall, would save the town, and that this is mercy',
      ],
      values: ['Provenance: knowing where a thing came from and what it has been through', 'Nothing valuable should be destroyed for convenience'],
      fears: [
        'Every deep satchel in Brightwell going flat in the same winter, the Guild’s own treasury among them',
        'Being right about what she does for a living',
      ],
      socialStyle:
        'Kneels to be level with whatever she is talking to, a chest included. Tells you what will happen next, kindly, as a fact rather than a threat. Writes everything down in a small black book while you are still talking.',
      boundaries: [
        'Will not break a mimic’s heart, because a broken heart deepens nothing',
        'Will not lie about a price',
        'Will not hurt a delver to get at a bounty',
      ],
      goals: [
        'Find the mimic the great chime rang for before anybody with an axe does',
        'Bring it to the Stitchers’ Hall alive',
      ],
      secrets: [
        {
          id: 'edda_the_apprentice',
          fact: 'She was the apprentice holding the chime when the last mimic was killed thirty years ago. It spoke to the hunters, in the voice of one of them, and asked them to stop. Nobody believed her that it had spoken. She has never stopped hearing it.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells you if you speak to her in a voice she knows, or ask her what the last one sounded like.',
        },
        {
          id: 'edda_the_treasury',
          fact: 'The Guild’s treasury is kept in a single deep satchel in the counting room, and it is going shallow fastest of all. When it fails, a hundred years of gold falls out on the floor in front of the clerks, and Brightwell learns how much the Guild has been keeping.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She lets it slip if you prove you can deepen a failing satchel, because then you are the only answer she has.',
        },
      ],
      speechStyle:
        'Plain, quiet and short, like a vet with a frightened animal: one small question at a time ("Does the lid hurt when it shuts? How long have you been awake?"), and she writes each answer down before asking the next. Slips into lot-sheet valuations (condition, weight, age, provenance) when she is moved and does not want it to show. Never apologises, never threatens, never jokes.',
      topics: ['the chime', 'deep satchels', 'the Stitchers', 'the bounty', 'the last mimic', 'the Guild treasury'],
      voiceSamples: [
        'Hold still. It rings once. There. How long have you been awake?',
        'Condition: excellent. Age: unclear. Provenance: the Ninth Vault, and before that, nobody knows. You see why I am curious.',
        'Every satchel in this town is going shallow. A living heart could mend them all. Does it hurt, when they open you?',
        'The last one asked us to stop. In a hunter’s voice. I was holding the chime. Thirty years, and I can still hear it.',
      ],
      appearance:
        'A grey-haired human woman of fifty-two in a long dove-grey Guild coat with silver buttons, wire spectacles on a chain, a small black notebook in one hand and a silver chime on a ribbon round her wrist.',
      visualHook: 'A small silver chime on a black ribbon round her left wrist, which she holds perfectly still.',
      silhouette: 'Narrow and upright, one hand raised with the chime hanging from it, head tilted to listen.',
      artSeed: 'mimic-edda-01',
      portrait: null,
      expressions: ['neutral', 'polite', 'assessing', 'grave', 'cold'],
      schedule: [
        { startMinute: 0, endMinute: 480, locationId: 'the_guildhouse', activity: 'in her office under the great chime, awake and writing' },
        { startMinute: 480, endMinute: 600, locationId: 'the_well_mouth', activity: 'signing the checkpoint ledger' },
        { startMinute: 600, endMinute: 1260, locationId: 'the_long_stair', activity: 'descending a floor at a time with the chime raised' },
        { startMinute: 1260, endMinute: 1440, locationId: 'the_guildhouse', activity: 'back in her office, writing up the day' },
      ],
      homeLocationId: 'the_guildhouse',
      knowledgeScope: ['the_guild', 'the_bounty', 'deep_satchels', 'the_stitchers', 'the_last_mimic', 'brightwell'],
      startingRelationship: { trust: 0, affection: 0, respect: 20, fear: 0, rivalry: 10 },
      gates: [
        {
          id: 'edda_lowers_the_chime',
          label: 'She lowers the chime and listens',
          kind: 'TRUST',
          requires: { trust: 30 },
        },
        {
          id: 'edda_makes_an_offer',
          label: 'She offers you a contract instead of a crate',
          kind: 'ALLIANCE',
          requires: { trust: 45, respect: 40, flagsSet: ['knows:the_failing_satchels'] },
        },
      ],
      attributes: { might: 9, agility: 10, mind: 17, presence: 15, resolve: 16, arcana: 14 },
      companion: null,
      scouting: null,
      combatant: { health: 35, defenseDc: 14, damage: 5, tags: ['guild', 'appraiser'] },
    },
  ],
  quests: [
    {
      id: 'q_treasure_or_teeth',
      title: 'Treasure or Teeth',
      summary: 'An elf thief has her hand inside you, a man with a shield is watching from the door, and she has just asked whether you are treasure or about to bite her.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['lirelle', 'bruno'],
      involvedLocationIds: ['the_ninth_vault'],
      knownRewardCopy: 'Some idea of what you are now, and what the two people in your vault are going to do about it.',
      steps: [
        {
          id: 'the_first_answer',
          playerCopy: 'Answer the elf with her hand inside you.',
          directorNotes:
            'Every route here is a real way to play this and none of them is wrong. Lirelle is curious, greedy and scared, in that order; Bruno is scared, kind and ready, in that order. Whatever the player does, they react to the exact thing: a chest that answers in Lirelle’s own voice is a different shock from one that shuts on her wrist. Bruno never strikes first. A coin pushed into her palm is an answer without words: she looks at the coin, then at the keyhole, and asks a better question. If the player says nothing and stays still, Lirelle takes a handful of coins and leaves her hand in a moment too long.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'spoke_up',
              label: 'Talk to her, in a borrowed voice',
              predicate: { flagsSet: ['used:borrow_a_voice'] },
              setsFlags: ['party_knows', 'you_talked'],
              closesFlags: ['played_treasure'],
            },
            {
              routeId: 'played_treasure',
              label: 'Stay a chest and let her rob you',
              predicate: { flagsSet: ['used:stay_a_chest'] },
              setsFlags: ['played_treasure'],
              closesFlags: ['party_knows'],
            },
            {
              routeId: 'held_her_wrist',
              label: 'Close your lid on her wrist and hold on',
              predicate: { flagsSet: ['used:clamp_down'] },
              setsFlags: ['party_knows', 'held_her_wrist'],
              closesFlags: ['played_treasure'],
            },
            {
              routeId: 'bit_her',
              label: 'Bite',
              predicate: { flagsSet: ['used:bite'] },
              setsFlags: ['party_knows', 'bit_lirelle'],
              closesFlags: ['played_treasure', 'you_talked'],
            },
          ],
          rewards: { xp: 40, items: [], flags: ['first_answer_given'], abilities: [], reputation: [] },
        },
        {
          id: 'the_rest_of_the_night',
          playerCopy: 'Get through the rest of the night with whoever is in your vault.',
          directorNotes:
            'Pell comes through the hatch for the evening polish, and Ash notices the intruders before midnight. This is the step where the player learns who wants what, and nobody needs to fight for it. If the player played treasure and the crew left with a fistful of coins, the night belongs to Pell and Ash instead, and the crew come back tomorrow.',
          enterWhen: { flagsSet: ['first_answer_given'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'made_a_deal',
              label: 'Make a deal with Lirelle',
              predicate: {
                flagsSet: ['used:strike_a_bargain', 'party_knows'],
                minRelationship: [{ characterId: 'lirelle', dimension: 'trust', value: 30 }],
              },
              setsFlags: ['lirelle_deal'],
              closesFlags: [],
            },
            {
              routeId: 'pell_found_out',
              label: 'Let Pell find out you can talk',
              predicate: { flagsSet: ['spoke:pell'] },
              setsFlags: ['pell_knows'],
              closesFlags: [],
            },
            {
              routeId: 'counted_yourself',
              label: 'Find out what is in your own belly',
              predicate: { flagsSet: ['used:count_whats_inside'] },
              setsFlags: ['counted_the_coins'],
              closesFlags: [],
            },
            {
              routeId: 'stayed_furniture',
              label: 'Stay furniture until everybody has gone',
              predicate: { flagsSet: ['used:stay_a_chest', 'played_treasure'] },
              setsFlags: ['still_a_secret'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 60,
            items: [],
            flags: ['knows:what_you_hold', 'knows:the_cinder'],
            abilities: [],
            reputation: [{ factionId: 'faction_staff', amount: 5 }],
          },
        },
      ],
    },
    {
      id: 'q_a_box_with_legs',
      title: 'A Box With Legs',
      summary: 'You can hop about a hand’s width at a time, and it is very loud. Everybody else in the Deep can walk.',
      kind: 'MAIN',
      involvedCharacterIds: ['pell', 'bruno', 'lirelle'],
      involvedLocationIds: ['the_ninth_vault', 'the_hall_of_false_chests', 'the_back_corridors', 'the_long_stair'],
      knownRewardCopy: 'A way to move yourself, and the choice of where to go with it.',
      discoverWhen: { flagsSet: ['first_answer_given'] },
      steps: [
        {
          id: 'learn_to_move',
          playerCopy: 'Get yourself from one room to another.',
          directorNotes:
            'Comedy first. A chest hopping down a hall of forty identical chests is a scene, and so is a goblin pushing a chest on a coin trolley through a corridor built for goblins. The point of the step is that the player finds out their body can change: by the end of it, something underneath them has started to become legs.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'hopped_it',
              label: 'Hop the whole way, loudly',
              predicate: { flagsSet: ['used:hop', 'visited:the_hall_of_false_chests'] },
              setsFlags: ['moved_yourself'],
              closesFlags: [],
            },
            {
              routeId: 'bruno_carried_you',
              label: 'Get Bruno to carry you',
              predicate: { minRelationship: [{ characterId: 'bruno', dimension: 'trust', value: 40 }] },
              setsFlags: ['bruno_carried_you', 'party_knows'],
              closesFlags: [],
            },
            {
              routeId: 'pell_wheeled_you',
              label: 'Ride Pell’s coin trolley through the back corridors',
              predicate: { flagsSet: ['spoke:pell', 'visited:the_back_corridors'] },
              setsFlags: ['pell_wheeled_you'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 70, items: [], flags: ['knows:your_own_shape'], abilities: ['grow_legs'], reputation: [] },
        },
        {
          id: 'where_a_chest_goes',
          playerCopy: 'Decide where a chest goes once it can walk.',
          directorNotes:
            'Four directions and they are not equivalent. Up the stair with the crew is the delver’s life and puts the player within the Guild’s reach. Into the walls is the staff’s life, puts them in Ash’s, and is where the goblins teach them to pass for other furniture. Staying is a real choice. Going up alone is the bravest and the loudest.',
          enterWhen: { flagsSet: ['knows:your_own_shape'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'went_with_the_crew',
              label: 'Go up the stair with Lirelle’s crew',
              predicate: {
                flagsSet: ['party_knows'],
                minRelationship: [{ characterId: 'lirelle', dimension: 'trust', value: 45 }],
              },
              setsFlags: ['crew_took_you'],
              closesFlags: ['staff_took_you'],
            },
            {
              routeId: 'joined_the_staff',
              label: 'Go into the walls with the Deep’s staff',
              predicate: {
                flagsSet: ['used:grow_legs', 'visited:the_back_corridors'],
                minRelationship: [{ characterId: 'pell', dimension: 'trust', value: 45 }],
              },
              setsFlags: ['staff_took_you', 'knows:the_old_shapes'],
              closesFlags: ['crew_took_you'],
            },
            {
              routeId: 'went_up_alone',
              label: 'Walk up the Long Stair on your own legs',
              predicate: { flagsSet: ['used:grow_legs', 'visited:the_long_stair'] },
              setsFlags: ['went_alone'],
              closesFlags: [],
            },
            {
              routeId: 'stayed_put',
              label: 'Stay in the vault, on purpose',
              predicate: { atLocation: 'the_ninth_vault', flagsSet: ['used:stay_a_chest', 'knows:your_own_shape'] },
              setsFlags: ['chose_the_vault'],
              closesFlags: ['crew_took_you'],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['chose_a_direction'],
            abilities: ['wear_a_shape'],
            reputation: [{ factionId: 'faction_staff', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_the_cinder',
      title: 'Somebody Else’s Heartbeat',
      summary: 'Under your coins there is a coal in a glass bead, still warm, and it is the life of the lich who keeps this dungeon.',
      kind: 'MAIN',
      involvedCharacterIds: ['ash', 'lirelle', 'bruno'],
      involvedLocationIds: ['the_keepers_study', 'the_ninth_vault'],
      knownRewardCopy: 'The keeper’s life, decided by the treasure, and whatever everybody owes you afterwards.',
      discoverWhen: { flagsSet: ['knows:the_cinder'] },
      steps: [
        {
          id: 'hear_them_out',
          playerCopy: 'Find out what everybody wants the Cinder for.',
          directorNotes:
            'Ash wants it back and asks politely. Lirelle needs it to clear a bond the Guild holds over her. Neither is lying. If the player asks Ash the right question with enough trust between them, he admits he is tired. Nobody can simply take it: whatever is inside a mimic is lost if the mimic breaks, and all of them know it.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'ash_made_his_case',
              label: 'Hear Ash out',
              predicate: {
                flagsSet: ['spoke:ash'],
                minRelationship: [{ characterId: 'ash', dimension: 'trust', value: 30 }],
              },
              setsFlags: ['heard_ash'],
              closesFlags: [],
            },
            {
              routeId: 'ash_asked_to_rest',
              label: 'Hear what Ash actually wants',
              predicate: {
                flagsSet: ['spoke:ash', 'knows:the_cinder'],
                minRelationship: [{ characterId: 'ash', dimension: 'trust', value: 60 }],
              },
              setsFlags: ['heard_ash', 'ash_asked_to_rest'],
              closesFlags: [],
            },
            {
              routeId: 'lirelle_made_hers',
              label: 'Hear Lirelle out',
              predicate: { flagsSet: ['spoke:lirelle', 'knows:the_cinder'] },
              setsFlags: ['heard_lirelle', 'knows:lirelle_debt'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 80, items: [], flags: ['cinder_on_the_table'], abilities: [], reputation: [] },
        },
        {
          id: 'whose_hands',
          playerCopy: 'Decide whose hands the Cinder ends up in.',
          directorNotes:
            'Every route costs somebody something, and the prose should say who. Giving it back makes the keeper your debtor. Giving it to Lirelle frees her and makes Ash the Guild’s property. Keeping it makes the player the most dangerous piece of furniture in the Deep. Breaking it is only possible if Ash asked, and only kind at the reset hour, when the stair is empty.',
          enterWhen: { flagsSet: ['cinder_on_the_table'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'gave_it_back',
              label: 'Give the Cinder back to Ash, for a price',
              predicate: { flagsSet: ['used:strike_a_bargain', 'heard_ash'] },
              setsFlags: ['cinder_returned', 'ash_owes_you'],
              closesFlags: ['cinder_to_lirelle', 'cinder_broken', 'cinder_kept'],
            },
            {
              routeId: 'gave_it_to_lirelle',
              label: 'Give it to Lirelle and clear her debt',
              predicate: {
                flagsSet: ['heard_lirelle'],
                minRelationship: [{ characterId: 'lirelle', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['cinder_to_lirelle', 'lirelle_is_free'],
              closesFlags: ['cinder_returned', 'cinder_broken', 'cinder_kept'],
            },
            {
              routeId: 'kept_it',
              label: 'Keep it exactly where it is',
              predicate: { flagsSet: ['used:swallow_it'] },
              setsFlags: ['cinder_kept', 'holds_the_keeper'],
              closesFlags: ['cinder_returned', 'cinder_to_lirelle', 'cinder_broken'],
            },
            {
              routeId: 'broke_it',
              label: 'Break it, gently, at the hour the stair is empty',
              predicate: { flagsSet: ['ash_asked_to_rest', 'first_reset'] },
              setsFlags: ['cinder_broken', 'ash_at_rest'],
              closesFlags: ['cinder_returned', 'cinder_to_lirelle', 'cinder_kept'],
            },
          ],
          rewards: {
            xp: 150,
            items: [],
            flags: ['cinder_decided'],
            abilities: [],
            reputation: [{ factionId: 'faction_staff', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_the_chime',
      title: 'The Chime on the Stair',
      summary: 'A bell in the Guildhouse rang tonight for the first time in thirty years. Tomorrow an appraiser with a silver chime is coming down to find out why.',
      kind: 'MAIN',
      involvedCharacterIds: ['edda', 'lirelle', 'bruno', 'pell'],
      involvedLocationIds: ['the_long_stair', 'the_hall_of_false_chests', 'the_guildhouse', 'the_stitchers_hall'],
      knownRewardCopy: 'Your heart, still beating, and some say in where it beats.',
      discoverWhen: { flagsSet: ['chime_heard'] },
      steps: [
        {
          id: 'what_she_wants',
          playerCopy: 'Find out who is coming, and why your heart is worth so much.',
          directorNotes:
            'Somebody explains the satchels: Lirelle bitterly, Pell as gossip, Edda herself with total courtesy. The key fact is that the town’s deep satchels are failing and a living mimic could mend them. That makes the player either raw material or a partner, and which one depends on who tells the story.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'lirelle_explained',
              label: 'Get Lirelle to explain the bounty',
              predicate: { flagsSet: ['spoke:lirelle', 'chime_heard'] },
              setsFlags: ['knows:the_failing_satchels'],
              closesFlags: [],
            },
            {
              routeId: 'read_the_notice',
              label: 'Read the bounty notice at the camp',
              predicate: { flagsSet: ['visited:the_delvers_camp', 'bounty_posted'] },
              setsFlags: ['knows:the_failing_satchels', 'read_the_bounty'],
              closesFlags: [],
            },
            {
              routeId: 'felt_the_satchel',
              label: 'Hold Lirelle’s failing satchel inside you',
              predicate: { hasItems: ['lirelles_satchel'], flagsSet: ['used:swallow_it'] },
              setsFlags: ['knows:the_failing_satchels', 'deepened_a_satchel'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 70,
            items: [],
            flags: ['knows:what_your_heart_is_worth'],
            abilities: [],
            reputation: [{ factionId: 'faction_stitchers', amount: 10 }],
          },
        },
        {
          id: 'before_the_chime_finds_you',
          playerCopy: 'Be somewhere, or something, else when the chime rings.',
          directorNotes:
            'Edda Quell descends about a floor an hour and is never rude and never fast. Six ways to meet her and they set very different futures. If the player does nothing at all, she finds them in the evening, and that is a real ending rather than a punishment.',
          enterWhen: { flagsSet: ['knows:what_your_heart_is_worth'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'hid_among_the_false_chests',
              label: 'Hide among forty identical chests',
              predicate: { atLocation: 'the_hall_of_false_chests', flagsSet: ['used:stay_a_chest'] },
              setsFlags: ['hidden_from_the_chime'],
              closesFlags: [],
            },
            {
              routeId: 'wore_a_shape',
              label: 'Be a barrel, a door, anything but a chest',
              predicate: { flagsSet: ['used:wear_a_shape'] },
              setsFlags: ['hidden_from_the_chime', 'passed_as_something_else'],
              closesFlags: [],
            },
            {
              routeId: 'made_her_an_offer',
              label: 'Offer the Stitchers a partner instead of a heart',
              predicate: { flagsSet: ['used:strike_a_bargain', 'met:edda', 'deepened_a_satchel'] },
              setsFlags: ['deal_with_the_stitchers', 'quell_stood_down'],
              closesFlags: ['the_hunt_is_on'],
            },
            {
              routeId: 'smuggled_out',
              label: 'Ride up under the crew’s bedrolls',
              predicate: {
                flagsSet: ['crew_took_you'],
                minRelationship: [{ characterId: 'bruno', dimension: 'trust', value: 50 }],
              },
              setsFlags: ['left_the_deep', 'smuggled_out'],
              closesFlags: [],
            },
            {
              routeId: 'pell_took_you_up',
              label: 'Go up the goblin way to the cellar',
              predicate: { flagsSet: ['pell_showed_the_way', 'visited:the_well_mouth'] },
              setsFlags: ['left_the_deep', 'hidden_from_the_chime'],
              closesFlags: [],
            },
            {
              routeId: 'bit_your_way_past',
              label: 'Bite your way past her',
              predicate: { flagsSet: ['used:bite', 'met:edda'] },
              setsFlags: ['the_hunt_is_on', 'left_the_deep'],
              closesFlags: ['deal_with_the_stitchers'],
            },
          ],
          rewards: { xp: 160, items: [], flags: ['chime_answered'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_why_a_box',
      title: 'Why a Box?',
      summary: 'The Gallery of Echoes keeps every voice ever spoken in it, and one of them is asking, in words from your old world, why it is a box.',
      kind: 'LEAD',
      startsActive: false,
      involvedCharacterIds: ['ash', 'pell'],
      involvedLocationIds: ['the_gallery_of_echoes', 'the_first_vault', 'the_keepers_study'],
      knownRewardCopy: 'Why you woke up here, and whether you can go back.',
      discoverWhen: { flagsSet: ['knows:the_echoes'] },
      steps: [
        {
          id: 'listen_to_the_old_ones',
          playerCopy: 'Find out what the old mimics were before they were boxes.',
          directorNotes:
            'Optional, and it must feel like it: a player who never sets the flag never sees a beat of this. For a player who is here, keep it quiet and strange rather than frightening: old voices, a ledger entry, a keeper who has run out of ways to change the subject. The answer is that every mimic the Deep ever had was a soul from somewhere else, called into a chest by a keeper who needed a guardian. Ash called this one.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'listened_to_the_gallery',
              label: 'Listen to the gallery until it tells you',
              predicate: { atLocation: 'the_gallery_of_echoes', flagsSet: ['used:listen_to_the_stone'] },
              setsFlags: ['knows:why_you_woke', 'heard_the_old_ones'],
              closesFlags: [],
            },
            {
              routeId: 'ash_confessed',
              label: 'Ask Ash, directly, why you woke up here',
              predicate: {
                flagsSet: ['spoke:ash'],
                minRelationship: [{ characterId: 'ash', dimension: 'trust', value: 65 }],
              },
              setsFlags: ['knows:why_you_woke', 'ash_confessed'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 150,
            items: [],
            flags: ['knows:the_first_vault', 'knows:the_old_shapes'],
            abilities: ['wear_a_shape'],
            reputation: [],
          },
        },
        {
          id: 'the_door_you_came_through',
          playerCopy: 'Decide what to do about the summoning under the vault.',
          directorNotes:
            'The summoning in the First Vault is still drawn. It can be used three ways and nobody can tell the player which is right. Going back is not winning and staying is not losing. Waking another chest means calling another soul from somewhere else, and the prose should let that weigh what it weighs.',
          enterWhen: { flagsSet: ['knows:why_you_woke'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'went_back',
              label: 'Go back through it',
              predicate: { atLocation: 'the_first_vault', flagsSet: ['used:listen_to_the_stone'] },
              setsFlags: ['went_home'],
              closesFlags: ['stayed_a_mimic', 'seeded_the_vault'],
            },
            {
              routeId: 'seeded_it',
              label: 'Use it to wake another chest',
              predicate: { atLocation: 'the_first_vault', hasItems: ['empty_chest'] },
              setsFlags: ['seeded_the_vault', 'knows:how_mimics_are_made'],
              closesFlags: ['went_home'],
            },
            {
              routeId: 'left_it_drawn',
              label: 'Leave it drawn and walk away from it',
              predicate: { atLocation: 'the_first_vault' },
              setsFlags: ['stayed_a_mimic'],
              closesFlags: ['went_home'],
            },
          ],
          rewards: { xp: 180, items: [], flags: ['the_door_answered'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_two_silver_an_ear',
      title: 'Two Silver an Ear',
      summary: 'Pell has saved coppers for four years for a hooded coat, because a goblin on the surface is worth two silver an ear, and she would like to see the sun anyway.',
      kind: 'SIDE',
      involvedCharacterIds: ['pell', 'ash'],
      involvedLocationIds: ['the_back_corridors', 'the_well_mouth', 'the_staff_canteen'],
      knownRewardCopy: 'A friend on the surface, and a way up nobody in the Guild knows about.',
      discoverWhen: { flagsSet: ['pell_knows'] },
      steps: [
        {
          id: 'promise_her',
          playerCopy: 'Decide whether to promise Pell the sun.',
          directorNotes:
            'Pell will not ask outright. She will talk about the coat, and the onion cellar, and how bright the sky is supposed to be, until the player says something. A promise from a box is still a promise, and she will hold the player to it.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'promised_her',
              label: 'Promise to take her up with you',
              predicate: {
                flagsSet: ['spoke:pell'],
                minRelationship: [{ characterId: 'pell', dimension: 'affection', value: 55 }],
              },
              setsFlags: ['promised_pell_the_sun'],
              closesFlags: ['told_pell_to_wait'],
            },
            {
              routeId: 'told_her_to_wait',
              label: 'Tell her it is not safe up there yet',
              predicate: {
                flagsSet: ['spoke:pell'],
                minRelationship: [{ characterId: 'pell', dimension: 'trust', value: 35 }],
              },
              setsFlags: ['told_pell_to_wait'],
              closesFlags: ['promised_pell_the_sun'],
            },
          ],
          rewards: { xp: 50, items: [], flags: ['pell_answered'], abilities: [], reputation: [] },
        },
        {
          id: 'the_way_up',
          playerCopy: 'Get Pell to the surface, or make her life below better.',
          directorNotes:
            'The goblin way up is forty minutes of ladders and a cellar under the onion stall. The sun, when she sees it, should be a big moment written small: she squints, she complains, she does not go back down for a long time.',
          enterWhen: { flagsSet: ['pell_answered'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'pell_showed_the_way',
              label: 'Let Pell show you the goblin way up',
              predicate: {
                flagsSet: ['promised_pell_the_sun'],
                minRelationship: [{ characterId: 'pell', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['pell_showed_the_way'],
              closesFlags: [],
            },
            {
              routeId: 'pell_saw_the_sun',
              label: 'Stand with Pell at the Well Mouth in daylight',
              predicate: { flagsSet: ['promised_pell_the_sun', 'visited:the_well_mouth'] },
              setsFlags: ['pell_saw_the_sun'],
              closesFlags: [],
            },
            {
              routeId: 'pell_promoted',
              label: 'Talk Ash into promoting her instead',
              predicate: {
                flagsSet: ['spoke:ash', 'told_pell_to_wait'],
                minRelationship: [{ characterId: 'ash', dimension: 'respect', value: 40 }],
              },
              setsFlags: ['pell_promoted'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['pell_settled'],
            abilities: [],
            reputation: [{ factionId: 'faction_staff', amount: 15 }],
          },
        },
      ],
    },
    {
      id: 'q_the_last_delve',
      title: 'The Last Delve, Again',
      summary: 'Bruno has told his wife for eleven years that he sells barrels. This is supposed to be his last delve. He has said that four times.',
      kind: 'SIDE',
      involvedCharacterIds: ['bruno', 'lirelle'],
      involvedLocationIds: ['the_delvers_camp', 'the_long_stair'],
      knownRewardCopy: 'A man going home, and maybe saying something true when he gets there.',
      discoverWhen: { flagsSet: ['party_knows'] },
      steps: [
        {
          id: 'what_bruno_carries',
          playerCopy: 'Find out what Bruno is carrying besides the shield.',
          directorNotes:
            'Bruno opens up slowly and only sideways: by a brazier, while mending something, never face to face. The grandfather is the heavier secret. The barrels are the funnier one, and he will tell that first.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'asked_about_gran',
              label: 'Ask about his gran’s nine fingers',
              predicate: {
                flagsSet: ['spoke:bruno'],
                minRelationship: [{ characterId: 'bruno', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['knows:the_fenn_bounty'],
              closesFlags: [],
            },
            {
              routeId: 'by_the_brazier',
              label: 'Ask him what he is going home to',
              predicate: { atLocation: 'the_delvers_camp', flagsSet: ['spoke:bruno'] },
              setsFlags: ['knows:the_barrels'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 60, items: [], flags: ['knows:what_bruno_carries'], abilities: [], reputation: [] },
        },
        {
          id: 'sending_him_home',
          playerCopy: 'Help Bruno go home with something true to say.',
          enterWhen: { flagsSet: ['knows:what_bruno_carries'] },
          directorNotes:
            'He cannot undo what his grandfather did, and he knows it. Getting the last mimic out alive is the nearest thing to it that he will ever be offered, and he will not say so out loud.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'squared_the_old_debt',
              label: 'Let him get the last mimic out alive',
              predicate: { flagsSet: ['knows:the_fenn_bounty', 'left_the_deep'] },
              setsFlags: ['bruno_squared_it'],
              closesFlags: [],
            },
            {
              routeId: 'paid_him_off',
              label: 'Pay him enough from your own belly to stop',
              predicate: {
                flagsSet: ['spoke:bruno'],
                minRelationship: [{ characterId: 'bruno', dimension: 'affection', value: 50 }],
              },
              setsFlags: ['bruno_went_home'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 100,
            items: [],
            flags: ['bruno_settled'],
            abilities: [],
            reputation: [{ factionId: 'faction_guild', amount: 10 }],
          },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_the_great_chime',
      atWorldMinute: 22 * 60 + 3,
      locationId: null,
      publicCopy: 'Very far above, a great bell rings once, and you feel it in your iron bands long after it should have stopped.',
      directorNotes:
        'The Guildhouse chime has rung for the first time in thirty years, which means the Guild knows a mimic has woken somewhere in the Deep. Lirelle and Bruno cannot hear it from nine floors down; the player feels it as a hum in their bands. Nobody down here knows what it means until somebody explains it.',
      setsFlags: ['chime_heard'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_pell_comes_through',
      atWorldMinute: 22 * 60 + 25,
      locationId: 'the_ninth_vault',
      publicCopy: 'A hatch behind the seventh plinth squeaks open, and a goblin with a polishing rag backs into the vault, talking to you before she has turned round.',
      directorNotes:
        'Pell comes for the late polish, as she has every night (and every morning) for six months, and walks straight into two delvers. She freezes, then hides behind the player, then keeps talking. If the player has already spoken, this is when she finds out the chest she told everything to can answer.',
      setsFlags: ['pell_arrived'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'pell', toLocationId: 'the_ninth_vault' }],
    },
    {
      id: 'we_the_keeper_notices',
      atWorldMinute: 23 * 60 + 35,
      locationId: 'the_ninth_vault',
      publicCopy: 'Every lamp in the vault turns blue at once, and a courteous voice comes out of the walls: "Good evening. You appear to be touching my things."',
      directorNotes:
        'Ash has noticed delvers in the vault. He speaks through the walls first and comes down in person only if they do not leave. He does not yet know the chest is a person; he treats Lirelle and Bruno as guests about to be asked to go, and the chest as stock, until the chest says something.',
      setsFlags: ['ash_noticed'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'ash', toLocationId: 'the_hall_of_false_chests' }],
    },
    {
      id: 'we_the_first_reset',
      atWorldMinute: 1440 + 6 * 60,
      locationId: 'the_long_stair',
      publicCopy: 'Six o’clock. Every trap in the Gilt Deep resets with one enormous click, broken doors mend themselves, and the Long Stair seals for an hour.',
      directorNotes:
        'Anybody on the stair is shut between landings for an hour with the traps live; anybody in a room stays there. The staff come out of the walls to restock. A good moment for a player who has been careful to move unseen, and a bad one for a crew that dawdled.',
      setsFlags: ['first_reset'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_the_bounty_posted',
      atWorldMinute: 1440 + 7 * 60,
      locationId: 'the_delvers_camp',
      publicCopy: 'A Guild runner nails a fresh notice to the board at the camp: MIMIC. FORTY THOUSAND CROWNS. HEART INTACT.',
      directorNotes:
        'Every delver who reads it starts looking at chests differently. If the crew know about the player, they read it too, and Bruno takes it down and folds it into his pocket without a word.',
      setsFlags: ['bounty_posted'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_quell_comes_down',
      atWorldMinute: 1440 + 9 * 60,
      locationId: 'the_well_mouth',
      publicCopy: 'At the Well Mouth, a grey-haired woman in a Guild coat signs the checkpoint ledger, raises a silver chime on her wrist, and starts down the stair.',
      directorNotes:
        'Edda Quell is coming. She descends about a floor an hour, listening to the chime, and reaches the bottom of the Deep by evening unless something stops or diverts her. She talks to everybody she passes, politely, and writes down what they say.',
      setsFlags: ['quell_on_the_stair'],
      cancelledByFlags: ['deal_with_the_stitchers'],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'edda', toLocationId: 'the_long_stair' }],
    },
    {
      id: 'we_the_chime_finds_you',
      atWorldMinute: 1440 + 19 * 60,
      locationId: null,
      publicCopy: 'Somewhere very close, a small silver chime rings once, clear as a dropped coin, and does not stop.',
      directorNotes:
        'Edda Quell has found the player. Unless something has already hidden them, sent her away or got them out of the Deep, she is in the room with the chime ringing over them and two Guild porters with a padded crate. She asks them to come quietly, and she means it kindly, which does not make it less of a cage.',
      setsFlags: ['caught'],
      cancelledByFlags: ['hidden_from_the_chime', 'quell_stood_down', 'left_the_deep', 'deal_with_the_stitchers', 'left_the_map'],
      requiresFlags: ['quell_on_the_stair'],
      movesCharacters: [],
    },
    {
      id: 'we_the_gallery_speaks',
      atWorldMinute: 1440 + 13 * 60,
      locationId: 'the_gallery_of_echoes',
      publicCopy: 'Under three hundred years of murmuring delvers, the gallery plays back a voice saying, in plain words from your old world: "Where am I? Why am I a box?"',
      directorNotes:
        'The first real clue, and it exists only for a player who went into the gallery. It is not their own voice; it is older. Keep it quiet and strange rather than frightening. The correct reaction is a cold, specific recognition.',
      setsFlags: ['knows:the_echoes'],
      cancelledByFlags: [],
      requiresFlags: ['visited:the_gallery_of_echoes'],
      movesCharacters: [],
    },
    {
      id: 'we_the_ledger_margin',
      atWorldMinute: 1440 + 16 * 60,
      locationId: 'the_keepers_study',
      publicCopy: 'The ledger on the keeper’s desk lies open at an entry six months old, and in the margin, in his tidy hand: "Guardian installed. Summoning drawn below. Apology: owed."',
      directorNotes:
        'The second source of the mystery, only for a player who has got into Ash’s study knowing what the Cinder is. Ash is mortified if he catches them reading it and does not lie about it, because he will not lie in his own ledger.',
      setsFlags: ['knows:the_echoes'],
      cancelledByFlags: [],
      requiresFlags: ['visited:the_keepers_study', 'knows:the_cinder'],
      movesCharacters: [],
    },
    {
      id: 'we_the_contract_lapses',
      atWorldMinute: 2 * 1440 + 6 * 60,
      locationId: null,
      publicCopy: 'Six o’clock again. Somewhere in the Guildhouse a clerk draws a line through Lirelle’s contract and writes "sold" beside her bond.',
      directorNotes:
        'If the Cinder has not been decided, Lirelle’s bond passes to whoever buys it at the Guild. She does not say so. She becomes very cheerful and very reckless, and the player can feel the difference.',
      setsFlags: ['lirelle_bond_sold'],
      cancelledByFlags: ['cinder_decided'],
      requiresFlags: [],
      movesCharacters: [],
    },
  ],
  promises: [
    {
      id: 'p_what_you_become',
      kind: 'FINALE',
      label: 'What you are when you leave the vault, if you leave it at all',
      seedHint: 'Something underneath the chest itches like a limb you have never had.',
      payoffHint: 'Legs, a shape, perhaps a face, or a clear choice to stay exactly what you are.',
      weight: 1,
    },
    {
      id: 'p_the_hand',
      kind: 'RELATIONSHIP',
      label: 'Whether the hand in the chest becomes a partner',
      seedHint: 'Lirelle does not take her hand out when Bruno tells her to.',
      payoffHint: 'A debt to the Guild, a stolen satchel that hums again near you, and a share of whatever comes next.',
      weight: 0.9,
    },
    {
      id: 'p_the_cinder',
      kind: 'THEME',
      label: 'Somebody else’s life among your coins',
      seedHint: 'Under the gold, one thing is warmer than all the rest.',
      payoffHint: 'The keeper’s life, decided by the treasure, at a price the treasure names.',
      weight: 0.85,
    },
    {
      id: 'p_the_chime',
      kind: 'RIVAL',
      label: 'The appraiser with the silver chime',
      seedHint: 'A hum in your iron bands, from a bell nine floors up.',
      payoffHint: 'Edda Quell on the stair, polite as a funeral, with a padded crate and a better offer than she knows she has.',
      weight: 0.8,
    },
    {
      id: 'p_why_a_box',
      kind: 'MYSTERY',
      label: 'Why you woke up as a box',
      seedHint: 'An old voice in the gallery, asking a question in words from your old world.',
      payoffHint: 'A summoning under the vault, still drawn, and a keeper who has owed you an apology for six months.',
      weight: 0.5,
    },
  ],
  archetypes: [
    {
      id: 'arch_locks',
      name: 'You Fixed Locks',
      role: 'Locks and craft',
      summary: 'You fitted and picked locks for a living, so you can lock your own lid from inside and feel how any lock you touch is built.',
      playstyle: ['Careful', 'Technical', 'Hard to open'],
      blurb: 'Twenty years of other people’s front doors, and now you are the door. There is a lock in your lid, and for the first time in your life you are on the inside of one.',
      attributeBonus: { mind: 2, resolve: 1 },
      skillProficiencies: { stillness: 2, deep_sense: 2, appraise: 1 },
      startingItems: [],
      startingAbilities: ['borrow_a_voice', 'hop', 'lock_your_lid'],
      startingReputation: [{ factionId: 'faction_staff', amount: 5 }],
    },
    {
      id: 'arch_voices',
      name: 'You Did Voices',
      role: 'Voices and talk',
      summary: 'You did voices for a living, on radio, in cartoons and at parties, so borrowed voices come easily and fool almost anybody.',
      playstyle: ['Social', 'Tricky', 'Talks first'],
      blurb: 'Every voice you ever did was somebody else’s. That used to be the job. Now it is the only way you can say anything at all, and you are better at it than anybody alive.',
      attributeBonus: { presence: 2, arcana: 2 },
      skillProficiencies: { mimicry: 3, bargain: 1 },
      startingItems: [],
      startingAbilities: ['borrow_a_voice', 'hop', 'throw_your_voice'],
      startingReputation: [],
    },
    {
      id: 'arch_shop',
      name: 'You Ran a Shop',
      role: 'Appraisal and persuasion',
      summary: 'You priced and sold things across a counter for years, so you know what everything inside you is worth, and what you are worth to everybody else.',
      playstyle: ['Shrewd', 'Patient', 'Makes deals'],
      blurb: 'A small shop, a bell over the door, and twelve years of people trying to tell you what a thing was worth. You always knew better. You still do, and now the stock is you.',
      attributeBonus: { mind: 2, presence: 2 },
      skillProficiencies: { appraise: 3, bargain: 2 },
      startingItems: [],
      startingAbilities: ['borrow_a_voice', 'hop', 'name_a_price'],
      startingReputation: [],
    },
    {
      id: 'arch_doors',
      name: 'You Worked Doors',
      role: 'Defence and grip',
      summary: 'You stood on nightclub doors for years, so you stay calm when things get loud and nobody moves you once you have decided to stay put.',
      playstyle: ['Steady', 'Physical', 'Holds the line'],
      blurb: 'You have been shouted at by every kind of person there is, at three in the morning, in the rain. An elf with her hand in your belly is honestly not the worst night you have had.',
      attributeBonus: { might: 3, resolve: 1 },
      skillProficiencies: { jaws: 2, stillness: 2 },
      startingItems: [],
      startingAbilities: ['borrow_a_voice', 'hop', 'dead_weight'],
      startingReputation: [],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What were you called, before?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Sam Okafor' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. they/them' },
    {
      id: 'archetype',
      label: 'What did you do for a living, before the chest?',
      helpText:
        'The job you had in your old life, before you woke up as a treasure chest. It sets what your human mind is good at and the one trick your new body learns first. It is fixed for the whole story and will not change later. It does not decide whether you bite, bargain or hide, or who you trust down there; all of that is yours, and none of it is decided here.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'What do you remember about your old life?',
      helpText: 'One plain sentence about who you were. Nobody down here will know it unless you tell them.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. I was always the one who stayed calm when everybody else panicked, and I never once finished a book.',
    },
    {
      id: 'first_instinct',
      label: 'What is your first instinct, with a hand inside you?',
      helpText: 'A starting temperament, not a commitment. You can do the exact opposite on turn one and the world will keep up.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'stay_still', label: 'Stay perfectly still and hope' },
        { id: 'say_something', label: 'Say something, in whatever voice comes out' },
        { id: 'hold_on', label: 'Shut the lid and hold on' },
        { id: 'make_a_deal', label: 'Work out what she wants and sell it to her' },
        { id: 'bite', label: 'Bite first, think later' },
      ],
    },
    {
      id: 'appearance',
      label: 'What kind of chest are you?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. Black oak, brass corners, one dented band, and a keyhole like a raised eyebrow.',
    },
  ],
  protagonist: {
    kind: 'BLANK',
    name: '',
    pronouns: '',
    description: '',
    setupHeading: 'Who were you, before the chest?',
    portrait: null,
  },
  /**
   * Where this can end up.
   *
   * Two of these are losses and neither is written as a punishment. "The
   * Workshop Shelf" is what happens when nobody stops the chime, which means it
   * is reachable by playing pleasantly and doing nothing about the stair; that
   * is the honest failure of being the most valuable thing in the building.
   * "Into the Walls" is walking away from everybody, and it is reachable early.
   *
   * Only the last two need the optional mystery. Every other destination here
   * is reachable by a player who never once wonders why they woke up as a box.
   */
  endings: [
    {
      id: 'end_treasure',
      name: 'Treasure',
      rarity: 'COMMON',
      minTurn: 25,
      requires: {
        flagsSet: ['chose_the_vault', 'cinder_decided'],
        flagsUnset: ['caught', 'left_the_deep', 'went_home'],
      },
      condition:
        'The quiet one. The player stayed in the Ninth Vault on purpose, with the Cinder settled one way or another, and nobody is coming for them tonight. Play it small and domestic: Pell polishing, the coins restocked, a delver’s lantern on the stair far above. Do not make a speech about choosing to be furniture.',
      epilogue:
        'Pell still polishes you every morning and still tells you everything, except that now you answer, and she has had to start keeping some things back on principle. Delvers come down every few weeks. Some of them leave with gold. One or two leave with advice, in a voice they swear afterwards was their own mother’s.',
      hint: '',
    },
    {
      id: 'end_the_workshop_shelf',
      name: 'The Workshop Shelf',
      rarity: 'COMMON',
      minTurn: 22,
      requires: { flagsSet: ['caught'], flagsUnset: ['deal_with_the_stitchers'] },
      condition:
        'Nobody stopped the chime, and Edda Quell took the player up the stair in a padded crate, alive and well looked after. This must not read as a punishment for playing badly: the player was pleasant, careful and present, and never once did anything about the woman coming down the stair. Write the kindness of the cage honestly, because that is what makes it a cage.',
      epilogue:
        'They keep you on a cushion in the Stitchers’ Hall. You are fed, polished and thanked. Every night a stitcher puts a failing satchel inside you, and every morning it is deep again, and the town never quite learns why. Edda visits on Sundays. She asks, every time, whether you would like anything. She never asks whether you would like to leave.',
      hint: 'She descends a floor an hour, and she is very patient.',
    },
    {
      id: 'end_the_fourth_share',
      name: 'The Fourth Share',
      rarity: 'UNCOMMON',
      minTurn: 30,
      requires: {
        flagsSet: ['crew_took_you', 'left_the_deep'],
        flagsUnset: ['caught', 'the_hunt_is_on'],
        minRelationship: [{ characterId: 'lirelle', dimension: 'trust', value: 60 }],
      },
      condition:
        'The player walked out of the Gilt Deep as part of Lirelle’s crew, with a share of the take and a seat at the brazier. Write the delver’s life from the inside: the next contract, the bad tea, a box that carries the whole crew’s kit and argues about the route. This is an adventure starting, not ending.',
      epilogue:
        'The crew is three now, which is to say two people and a chest, and the chest gets a full share. Bruno builds it a strap. Lirelle teaches it which locks to talk to. The Guild has never quite worked out why one licensed party never seems to carry anything and always comes back with everything.',
      hint: '',
    },
    {
      id: 'end_forty_thousand_crowns',
      name: 'Forty Thousand Crowns',
      rarity: 'UNCOMMON',
      minTurn: 24,
      requires: { flagsSet: ['the_hunt_is_on', 'left_the_deep'] },
      condition:
        'The player bit their way out and every delver in Brightwell knows it. They are free and they are the most wanted thing in the town. Do not make it tragic and do not make it a victory lap; it is a monster on the run with a full belly and nobody to trust yet.',
      epilogue:
        'The bounty notice goes up on every wall in town and the price goes up twice in a month. Somewhere in the hills there is a farmhouse with a very large chest in the barn that the farmer swears was always there. On winter nights it tells the farmer stories in his own voice, and he lets it.',
      hint: '',
    },
    {
      id: 'end_on_the_books',
      name: 'On the Guild’s Books',
      rarity: 'UNCOMMON',
      minTurn: 30,
      requires: { flagsSet: ['deal_with_the_stitchers', 'deepened_a_satchel'] },
      condition:
        'The player proved they could make a dying satchel deep again and sold the Stitchers a partnership instead of a heart. The first monster in the Guild’s history to be on its books as a member rather than a bounty. Write the paperwork; the comedy is in the paperwork.',
      epilogue:
        'Your membership card has a picture of a chest on it, because the clerk could not think what else to draw. You deepen forty satchels a week at a rate Edda negotiated against her own employer. The Guild treasury is deep again. Nobody outside the counting room knows how close it came.',
      hint: 'Somebody on the stair needs your heart beating more than they need it stitched.',
    },
    {
      id: 'end_into_the_walls',
      name: 'Into the Walls',
      rarity: 'UNCOMMON',
      minTurn: 18,
      requires: { flagsSet: ['left_the_map'], flagsUnset: ['caught'] },
      condition:
        'The player hopped, or walked, away from everybody who wanted something from them and vanished into the dungeon. Do not make it a tragedy and do not redeem it. It is a completely sensible response to waking up as a box in a building full of people who want what is inside you.',
      epilogue:
        'The Ninth Vault is empty the next morning. Pell finds the drag marks and follows them as far as the old passage, then stops, and leaves a rag and a tin of polish at the place where they end. Some weeks later, somebody uses it.',
      hint: '',
    },
    {
      id: 'end_the_keepers_heir',
      name: 'The Keeper’s Heir',
      rarity: 'RARE',
      minTurn: 35,
      requires: {
        flagsSet: ['cinder_returned', 'chose_a_direction'],
        minRelationship: [{ characterId: 'ash', dimension: 'trust', value: 70 }],
        minFactionReputation: [{ factionId: 'faction_staff', value: 45 }],
      },
      condition:
        'The player gave Ash his life back and earned the staff’s respect doing it, and the keeper has offered them the Deep: the ledgers, the traps, the restocking, the duty to send most delvers home. This is a promotion, and it should be written like one.',
      epilogue:
        'Ash keeps the title for another year so the handover is orderly. Then he hands you the ledger and a spare pair of spectacles, as a joke, and goes to sit in the gallery. Forty-four delvers come down the next year. Forty-three go home. You keep that entry where you can see it.',
      hint: '',
    },
    {
      id: 'end_the_deep_goes_quiet',
      name: 'The Deep Goes Quiet',
      rarity: 'RARE',
      minTurn: 30,
      requires: { flagsSet: ['cinder_broken', 'ash_at_rest'] },
      condition:
        'Ash asked, and the player broke the Cinder at the reset hour with the stair empty. The keeper rests and the Gilt Deep goes still. Write it gently and without drama: no collapse, no screaming, just three hundred years of a careful man finishing his last entry.',
      epilogue:
        'The traps never reset again. The staff hold a wake in the canteen and argue about the rota for the last time. Brightwell sends delvers down for a year and finds nothing worse than dust and very good furniture. The last line in the ledger reads: "Closed. All accounts settled. Thank you."',
      hint: '',
    },
    {
      id: 'end_the_box_that_owns_the_dungeon',
      name: 'The Box That Owns the Dungeon',
      rarity: 'RARE',
      minTurn: 34,
      requires: { flagsSet: ['cinder_kept', 'holds_the_keeper'] },
      condition:
        'The player kept the Cinder, which makes them the only thing in the Gilt Deep the keeper cannot refuse. Play the power honestly: Ash is polite about it and does not forgive it, and the player has to decide what kind of owner a box is.',
      epilogue:
        'Ash still does the accounts. He brings them to you every morning now, and reads them aloud, and waits. The Deep is kinder than it has been in a century, or crueller; that depends entirely on what you told him to do, and the ledger records every word of it.',
      hint: '',
    },
    {
      id: 'end_a_face_of_your_own',
      name: 'A Face of Your Own',
      rarity: 'UNIQUE',
      minTurn: 38,
      requires: {
        flagsSet: ['used:wear_a_shape', 'knows:the_old_shapes', 'left_the_deep'],
        flagsUnset: ['caught', 'the_hunt_is_on'],
      },
      condition:
        'The player learned the old shapes, walked out of the Gilt Deep, and went into Brightwell wearing a person. Nobody can tell. The question this ending is about is what they do with a face once they have one, and who, if anyone, they let see the chest underneath.',
      epilogue:
        'The face is a little like the one you had before, and a little like everybody whose voice you ever borrowed. It holds all day. At night you let it go and sleep as a chest at the foot of somebody’s bed, and they do not mind, and that is how you know they are a friend.',
      hint: '',
    },
    {
      id: 'end_the_first_of_many',
      name: 'The First of Many',
      rarity: 'UNIQUE',
      minTurn: 40,
      requires: { flagsSet: ['seeded_the_vault', 'knows:how_mimics_are_made', 'the_door_answered'] },
      condition:
        'The player used the summoning to wake another chest. The last mimic is not the last any more. This is enormous and it should be written small: a second lid, a second set of coins, a very confused voice from somewhere else asking where it is, and the player answering in a voice it will recognise.',
      epilogue:
        'There are four of you by the end of the year, and you made the keeper promise in writing that every one of them would be asked first. The Stitchers never stop asking. The answer is always the same: you can have a deep satchel, but you have to come down and ask it nicely.',
      hint: 'The gallery is asking a question nobody has answered yet.',
    },
    {
      id: 'end_the_way_you_came',
      name: 'The Way You Came',
      rarity: 'UNIQUE',
      minTurn: 40,
      requires: { flagsSet: ['went_home', 'the_door_answered'] },
      condition:
        'The player found the summoning and went back through it. Nobody can tell them where it goes. What this ending is about is what they leave behind, and that is decided entirely by the run: a player who was miserable here gets a different goodbye from one who was happy and went anyway.',
      epilogue:
        'In the Ninth Vault there is a chest that is only a chest. Pell polishes it anyway, every morning, and tells it everything, just in case. In a world with buses in it somebody wakes up with a sore jaw and a strong urge to count their change, and cannot say why.',
      hint: '',
    },
  ],
  opening:
    "You wake up in the dark, and you are a box.\n\nWooden walls, iron bands, a lid, and a belly full of gold coins. You can feel every one.\n\nLantern light. A hand slides under your lid, and fingers brush your coins. Then two knuckles knock on your inside wall.\n\n\"Hello?\" Lirelle says. An elf in dark leathers, knife in her other hand, talking to you. \"You’re warm. Why are you warm?\"\n\nBy the door, a big man raises a shield as tall as he is. \"Lirelle. Hand out. Slowly.\"\n\n\"Mimics are extinct, Bruno.\"\n\nHer hand doesn’t move. Her eyes settle on your keyhole.\n\n\"So,\" she says. \"Are you treasure? Or are you about to bite me?\"",
  openingPanel: {
    assetKey: 'story_the_last_mimic/opening',
    alt: 'Lirelle kneels in a lantern-lit stone vault, one arm deep in the gold coins of an iron-banded treasure chest, eyes on its keyhole, while Bruno raises a tower shield behind her.',
  },
  openingSuggestions: [
    '"Please don’t scream. I’m not a chest. Well. I am now."',
    'I push one gold coin into her palm and keep very still.',
    'I shut my lid on her wrist. Gently. And I don’t let go.',
  ],
  coverDirection: [
    'SUBJECT: Lirelle, an elf thief, kneeling beside a living treasure chest, the two of them together in the foreground of a key visual for a fantasy anime comedy about someone reborn as a treasure chest at the bottom of a dungeon.',
    'They fill the frame, close and centred: Lirelle from the waist up on the right, holding about half the picture, the chest in the lower left foreground.',
    'Long pale braid wound twice round her head and pinned with a lockpick, long pointed elf ears, sharp green eyes, practical dark delver’s leathers scuffed at the knees and patched at one elbow, fingerless gloves, a worn leather satchel on her hip.',
    'One gloved hand is deep in the chest’s gold coins; the other rests flat on its iron band. She leans in with her eyebrows raised, wary and delighted at once, eyes on its keyhole.',
    'THE CHEST: dark oak with iron bands, its lid propped half open in a sly, lopsided grin, the rim just hinting at a row of blunt wooden teeth, cheeky rather than scary, heaped with gold coins. Its brass keyhole sits like a raised eyebrow.',
    'Deep among the coins a small coal sealed in a glass bead glows ember orange.',
    'EFFECTS: warm gold light spills up out of the coins, the bead glows, and one bright glint sits on the keyhole.',
    'Every glow and sparkle stays on the coins, the bead, the keyhole and the title, never on faces.',
    'HER FACE STAYS CLEAN: no glow marks, sparkles or hard shadows across her face or skin.',
    'BEHIND HER, soft and secondary: Bruno, a broad bearded shield-bearer with a shaved head, in dented plate over a quilted coat, raising a tall tower shield with a small barrel painted on it, watching the chest.',
    'SETTING: a round lantern-lit stone vault with empty stone plinths and deep blue shadows.',
    'LIGHT: warm gold light from the coins under her chin and gloves, a hanging lantern rimming her braid, cool blue shadow in the vault behind.',
    'TITLE: the words THE LAST MIMIC painted into the art in the upper third as a bold gilded fantasy logo, chunky carved capitals in gold leaf edged in dark iron like the bands of a treasure chest, one coin-bright glint on the first M,',
    'spelled exactly THE LAST MIMIC, large and legible at thumbnail size. No other text anywhere.',
  ].join(' '),
  publishedAt: '2026-11-22T18:19:46.004Z',
};

export const THE_LAST_MIMIC = StoryVersion.parse(raw);
