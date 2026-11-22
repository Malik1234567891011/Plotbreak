import { StoryVersion } from '@plotbreak/contracts';

/**
 * "The Wolf Clan's Guest" — four brothers, one stranger, three days.
 *
 * The structural bet is the reverse-harem one done honestly: four men who want
 * the player under their roof, and every one of them with a reason that is not
 * the player. Varek did not claim the player because he saw their lantern two
 * nights early and waited. Sil already knows where the player came from and is
 * hiding their pack. Ronan wants a guest because a guest is standing, and standing is what he
 * needs before midwinter. Tam carried the player, and is the thing that walked
 * ahead of the player in the storm. None of them is a prize and none of them is a meter; each
 * is authored so the writer can motivate him rather than only voice him.
 *
 * The law underneath is guest-right, and it is the whole engine of the first
 * scene: a stranger must be claimed by a host, the host answers for the guest,
 * and a stranger nobody claims goes back into the snow. So the opener is a
 * choice that costs something either way, and refusing to choose, running, and
 * fighting are all authored routes that land the player with the hardest host
 * in camp rather than nowhere.
 *
 * Two clocks, both concrete. The Company's factor comes up to the boundary
 * stones on day two with a sled of flour and a polite offer to buy the player
 * back, and the clan mother names the price at the midwinter fire. The pass
 * closes at dusk on the fourth day, and whichever side of it the player is on
 * is where they spend the winter.
 *
 * The white wolf is a lead, not the plot. A player who never asks what walked
 * ahead of them in the storm never sees it: the lead is gated behind a flag
 * only a curious player sets, and ten of the twelve endings do not need it.
 *
 * Three variables. Warmth is GOOD_HIGH because `resolveRest` refills those and
 * because the cold genuinely runs out. Suspicion and Friction are descending:
 * what the camp thinks of the stranger, and what the stranger is doing to four
 * brothers who share a lodge. Suspicion is first among the GOOD_LOW on purpose
 * (a fight in camp is what makes the camp watch you), and the Greyhowe clan is
 * first among the factions for the same reason.
 */

const raw = {
  id: 'sv_the_wolf_clan_s_guest_1',
  storyId: 'story_the_wolf_clan_s_guest',
  version: 1,
  title: 'The Wolf Clan’s Guest',
  fantasyLabel: 'Lost in the snow. Found by four wolves.',
  hook: 'You wake in a fur tent in a wolf clan’s winter camp. Three brothers are arguing over which of them saved you. The eldest claims nothing, and won’t say why.',
  premise:
    'You came north with the last caravan of the year: three sleds, nine people and a guide, crossing a mountain pass a week before the snow shut it. On the second night of the storm you took a lantern and walked out to find the guide, and the guide was gone.\n\n' +
    'You remember the cold, and something pale walking ahead of you through the shallowest snow. Then nothing.\n\n' +
    'You wake in a hide tent in the winter camp of a wolf clan: people with wolf ears, wolf tails, sharp noses and one old law about strangers. A stranger has to be claimed by a host, who answers for everything the guest does. A stranger nobody claims goes back into the snow.\n\n' +
    'Four brothers stand over you. Three of them are arguing over whose claim on you is best, and each has his own reason to want you under his roof. The eldest claims no part in it, and has not said why.\n\n' +
    'You have three days before the pass closes for the winter. In that time you need a host, a place at the fire, and an answer for the polite man from the south who is coming up the mountain with a sled of flour to buy you back.\n\n' +
    'Stay until spring or go down before the snow decides for you. Somebody in this camp knows exactly what walked ahead of you in the storm, and is hoping you never ask.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Romance', 'Fantasy', 'Beastfolk', 'Reverse harem', 'Comedy'],
  mechanicsChips: [
    'Four brothers, one guest',
    'Pick who you trust',
    'Earn your place or leave',
    'The pass closes in three days',
    'Every brother can be refused',
  ],
  contentDescriptors: ['ROMANCE', 'FANTASY_VIOLENCE', 'MORAL_AMBIGUITY'],
  intensity: 'MODERATE',
  creatorNote:
    'You can spend this whole story hauling water, losing fishing bets and learning which brother takes the last of the tea, and that is a real way to play it. Nobody here is a prize. Four people have four reasons to want you to stay, and at least one of them would be safer if you went.',
  openingObligations: [
    {
      what: 'Name a host before the clan mother asks whose guest you are.',
      withCharacterId: 'aud',
      dueInMinutes: 12,
    },
  ],
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: true,
    allowsRomance: true,
    startingLocationId: 'the_warm_tent',
    startWorldMinute: 7 * 60 + 40,
    startingItems: [{ itemId: 'borrowed_cloak', qty: 1 }],
    hardCanon: [
      'Everyone in this story is an adult. Varek is thirty-one, Sil twenty-seven, Ronan twenty-five and Tam twenty-one. Aud is fifty-six, Dagny twenty-six and Kell forty-four. The player is a grown traveller who crossed the pass for work.',
      'The Greyhowe are wolf-kin: people with wolf ears, wolf tails, sharp noses and good night eyes. They are people in every respect. They speak, dress, joke and argue like anyone, and nobody in the camp is an animal.',
      'This is a clan, not a pack. Nobody is an alpha or an omega, nobody is anybody’s mate or fated anything, and nobody is a werewolf, direwolf or skinchanger: never use those words. The clan’s words for itself are clan, kin, hearth and host, and the only name for what Tam can do is the old shape.',
      'Guest-right is the clan’s oldest law. A stranger in the winter camp must be claimed by a host, who ties a red cord on the guest’s wrist and answers for everything the guest does with his own standing. To harm a claimed guest is to harm the host. A stranger nobody claims is given a day’s food and walked to the boundary stones. By the same custom, a stranger who runs belongs to whoever catches them, and a stranger who refuses every host, or raises a hand against one, becomes the clan mother’s own guest: the hardest host in camp. Once the cord is tied, the guest can call on guest-right out loud, and then the whole camp must answer to the host for anything said or done to the guest.',
      'The four brothers are the sons of Clan Mother Aud, eldest to last: Varek, Sil, Ronan, Tam. Ronan found the player face-down in a drift, Tam carried the player three miles to camp, and Sil kept the player breathing through the first night. Varek claims no part in it.',
      'Sil warmed the player with hot stones, broth and furs, and sat up beside the bed all night. The player woke fully dressed in their own travelling clothes, dried out by his fire, under the furs and Tam’s cloak. Nobody shared the bed.',
      'The high pass closes for the winter at dusk on the fourth day of the story, and nobody crosses it again until the thaw. Whichever side of it the player is on then is where the player spends the winter.',
      'The clan’s stores are short after a bad autumn hunt, and every guest is a mouth. Aud knows the flour runs out a month before thaw and has told nobody.',
      'The Company is a southern trading house with a stockaded post at the foot of the south road. Its factor, Matthias Kell, hired the caravan the player crossed with. He wants the player back, he wants the survey of the pass, and he wants the white wolf a caravan driver swears walked through the storm.',
      'The three days run on a calendar the whole camp knows. Late on the morning of the second day, the factor comes up the south road to the boundary stones with a sled of flour, to ask the clan mother for the lost traveller. On the evening of the third day the clan lights the midwinter fire: Aud counts the stores aloud, names the factor’s offer for the guest, and the guest’s host is expected to stand up and answer it in front of everyone. The betrothal is meant to be sealed at the same fire.',
      'Varek saw the player’s lantern on the high pass two nights before anyone found the player, and watched it instead of going down, to see whether Company men followed. Nobody did. When it went out he went up and found only the lantern. He did not claim the player because he does not think he has the right.',
      'Tam can take the old shape: a full white wolf, larger than any wild one, in deep cold. Only Aud and Varek know. In the storm he found the player as the wolf, walked ahead through the shallowest snow to Ronan’s hunting line, then came back as himself to carry the player down. For most of the two nights between the lantern going out and Ronan finding them, the player sheltered half-conscious in a snow hollow among the eastern rocks, with something pale lying across its mouth to keep the wind out. The old shape is feared in the south, and the Company has a bounty on it.',
      'The old shape takes Tam’s clothes with it and gives them back: he is always dressed when he is himself, and the change itself is never shown or described, only before and after.',
      'Wolf-kin can smell fear, fever and a nervous lie. A calm lie passes. Ears and tails give their owners away constantly, and everyone in camp reads them the way southerners read faces.',
      'Violence has consequences rather than detail. A guest who strikes someone in camp shames the host, and the host answers it first. The clan does not kill guests; it walks them to the boundary stones. Brothers settle a quarrel by wrestling to the ground in the old form, never with blades.',
      'The cold is the edge of the map. Anyone who walks out of the valley without furs, food or a guide is in real danger within the hour, and the clan always sends someone after a guest who wanders, usually the host and usually furious. Inside the camp the cold still counts: outdoor work, the ice lake and the high snow wear a southerner down, and a fire, food and a night’s sleep bring them back.',
      'A stranger in camp is watched, and the host’s standing pays for every hour of it. Work done where people can see it, the truth told plainly and a host who vouches out loud make the camp stop watching. A nervous lie, sneaking about, or a raised hand make it watch harder.',
      'The four brothers share one lodge and one fire, and each of them notices whom the guest sits beside, thanks and walks with. Playing one brother against another works, and it costs all four: the family is a few quarrels away from four separate tents.',
      'Romance here is slow and chosen: teasing, a cloak around the shoulders, a held hand, at most a kiss. Nobody takes what is not offered, and every brother can be refused without the story punishing the player for it.',
    ],
    toneGuide:
      'Cold outside, warm inside, and funny in between. This is a world of practical kindness: the better blanket, the warm side of the fire, a fish somebody caught specially and pretends not to have. ' +
      'The four brothers bicker like brothers and never all agree; give each his own rhythm in every scene he is in. Varek is short sentences, Sil is dry diagnosis, Ronan is dares and noise, Tam is two questions at once. ' +
      'Romance is slow, chosen and specific, and it lives in what people do rather than in how anybody looks: no lingering on bodies, nothing past a kiss. The clan is neither savage nor noble and the south is neither villain nor saviour; both have somebody counting flour. ' +
      'Violence is quick, never lingered on, and always has consequences. When a scene has nothing at stake, let it be cosy and short. The face at the top of a beat is whichever brother is talking to the player. ' +
      'Ears and tails say what people feel before their mouths do, so let them carry a scene: a flat ear, a tail that will not keep still, a pink ear-tip somebody pretends is the cold.',
    proseStyle: 'webnovel',
    styleExamples: [
      'Ronan hands you the ice pick like it’s a sword.\n\n"First fish wins," he says. "Loser does the dishes for a week."\n\n"I’ve never fished through ice."\n\n"Great. I love winning."\n\nHis tail is going like a flag. Behind him, Sil doesn’t look up from the net he’s mending. "He cheats. He baits the hole the night before."\n\nRonan’s ears go flat. "That is a vicious lie."\n\nHis tail is still wagging.',
      'Varek doesn’t turn round when you climb up to the lookout.\n\n"You’ll freeze up here."\n\n"You’re up here."\n\n"I’m used to it." He shifts on the stones and makes room. Not much. Enough.\n\nBelow, the camp’s fires glow like coals in a hearth. Above, the pass is a white line under the moon.\n\n"Why didn’t you claim me?"\n\nHis ears go flat. For a long moment there is only the wind.\n\n"Listen," Varek says. "Ask me that again when the pass is shut."',
    ],
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 10, agility: 10, mind: 11, presence: 12, resolve: 12, arcana: 7 },
  skills: [
    { id: 'candour', name: 'Candour', attribute: 'resolve', description: 'Saying the true thing while it can still change something.' },
    { id: 'guile', name: 'Guile', attribute: 'presence', description: 'A story that holds together, told to people who can hear your heartbeat.' },
    { id: 'notice', name: 'Notice', attribute: 'mind', description: 'Ears, tails, hands and tracks: what people and snow say without meaning to.' },
    { id: 'labour', name: 'Labour', attribute: 'might', description: 'Water, wood, fish and nets. The work a winter runs on.' },
    { id: 'healing', name: 'Healing', attribute: 'mind', description: 'Fevers, frostbite and cuts, with whatever is in the satchel.' },
    { id: 'nerve', name: 'Nerve', attribute: 'resolve', description: 'Not stepping back when a tent full of wolf-kin leans in.' },
    { id: 'brawl', name: 'Brawling', attribute: 'might', description: 'Fighting close, badly and on purpose.' },
    { id: 'stealth', name: 'Stealth', attribute: 'agility', description: 'Moving through a camp where everybody can smell you coming.' },
    { id: 'lore', name: 'Old Stories', attribute: 'arcana', description: 'Knowing the old stories well enough to notice when one of them is happening to you.' },
  ],
  /**
   * Three, all invisible.
   *
   * Warmth is the one GOOD_HIGH, so resting by a fire restores something real
   * and the generic cost path spends the cold rather than a relationship.
   *
   * Suspicion and Friction are descending, and both are driven by abilities
   * the player actually uses: lying and sneaking raise what the camp thinks,
   * and playing the brothers off against each other raises what it does to
   * them. Both cool on their own, slowly, which is what living somewhere does.
   */
  resources: [
    {
      id: 'warmth',
      name: 'Warmth',
      max: 100,
      start: 55,
      regenPerHour: 3,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'The cold has the player. Fingers will not do up a clasp, words come out slurred, and anybody nearby drops what they are doing to get the player to a fire. Nobody in this camp lets a guest freeze, and everybody will remember having to carry one.',
      color: '#E8B04B',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Shaking too hard to hold a cup. The player is slow, clumsy and short with people, and every scene bends toward getting them to a fire. A brother notices first and does not ask permission before wrapping them in something. This is the band where pride gets set aside.',
        },
        {
          upTo: 60,
          behaviour:
            'Cold at the edges, which is the ordinary state of a northern winter. Fine for one more errand outdoors and honest about wanting the fire after it. Nobody needs to remark on it unless the player pushes up into the high snow.',
        },
        {
          upTo: 100,
          behaviour:
            'Fed, rested and steady through. The player has the energy for the lake, the lookout, a long argument or a long walk, and the room to say the difficult thing carefully instead of bluntly.',
        },
      ],
    },
    {
      id: 'suspicion',
      name: 'Suspicion',
      max: 100,
      start: 50,
      regenPerHour: -0.6,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'The camp has stopped watching. Hunters ask the stranger’s opinion of the weather, tools get left within reach, and the clan mother sends the player alone to count the stores.',
      color: '#8FA8C0',
      bands: [
        {
          upTo: 20,
          behaviour:
            'The camp has decided the stranger is part of the furniture. People talk freely in front of the player, ask small favours and leave the stores unwatched. Secrets slip out in ordinary conversation here, because nobody is guarding them.',
        },
        {
          upTo: 50,
          behaviour:
            'Polite and watchful. Ears turn when the player passes, conversations drop a register, and somebody always happens to be nearby. Work is accepted and thanked. Questions get answered with a little less than the whole truth.',
        },
        {
          upTo: 75,
          behaviour:
            'The camp is sure the stranger is hiding something. Hunters step into the player’s path, the stores are guarded, and the clan mother asks the host to account for every hour. The host’s own standing is starting to pay for it, and he knows it.',
        },
        {
          upTo: 100,
          behaviour:
            'One more wrong step and the player is out at the boundary stones with a day’s food. Nobody is cruel about it, and nobody needs to be. The host has to argue for the player in public, and the brothers argue with each other about whether he should.',
        },
      ],
    },
    {
      id: 'friction',
      name: 'Friction',
      max: 100,
      start: 25,
      regenPerHour: -0.4,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'The four of them are brothers again: elbowing each other at the fire, finishing each other’s insults, and taking turns being kind to the guest without keeping score.',
      color: '#B5523B',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Ordinary sibling noise. They compete over who brings the guest the better fish and laugh about it afterwards. Varek keeps the peace without trying, and Tam is in on every joke.',
        },
        {
          upTo: 55,
          behaviour:
            'Keeping score. Each brother notices who the player sat beside, who they thanked, who they walked with. Ronan says it out loud, Sil says it dryly, Varek says nothing and goes up to the lookout. Still funny, with an edge on it.',
        },
        {
          upTo: 80,
          behaviour:
            'Open quarrels. Two of them will not sit at the same fire. Tam tries to fix it and makes it worse. Their mother notices, and starts asking the player pointed questions about intentions over the stew.',
        },
        {
          upTo: 100,
          behaviour:
            'One push away from a fight at the long fire that nobody can take back. The brothers are scrupulously polite to each other, which is the worst sign there is, and the player is the reason everybody gives and nobody says.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'borrowed_cloak',
      name: 'Tam’s Cloak',
      tags: ['clothing', 'personal'],
      questItem: true,
      description: 'A heavy elk-hide cloak lined with fleece, far too long for you and patched at the hem in three different threads. You woke up wrapped in it.',
      loreText: 'Tam put it round you on the high pass and has not asked for it back. He has been cold for two days and will deny it to anybody who asks.',
      icon: 'cloak',
    },
    {
      id: 'guest_cord',
      name: 'The Guest Cord',
      tags: ['quest', 'personal'],
      questItem: true,
      droppable: false,
      description: 'A braided red cord tied round your wrist by your host. Every wolf-kin in camp can see it from across the long fire, and every one of them knows whose knot it is.',
      loreText: 'Cutting it is how a host gives a guest back to the snow. Replacing it with a grey one is how a clan makes a guest kin, and nobody living has seen that done.',
      icon: 'cord',
    },
    {
      id: 'white_fur',
      name: 'The White Fur',
      tags: ['quest', 'evidence'],
      questItem: true,
      skillModifiers: { lore: 2 },
      description: 'A tuft of white fur caught in the clasp of your coat, longer and finer than any fox’s, and still faintly warm when you hold it.',
      loreText: 'Nobody wild on this mountain is that colour in winter. Tam goes red to the tips of his ears when he sees it, and leaves the tent.',
      icon: 'fur',
    },
    {
      id: 'guide_lantern',
      name: 'The Cracked Lantern',
      tags: ['quest', 'evidence'],
      questItem: true,
      description: 'Your lantern from the pass, its glass cracked and its oil burned out. Somebody has cut a small claw-mark into the handle, the way the clan marks a thing it has claimed.',
      loreText: 'The mark is Varek’s. He found it in the snow on the high pass two nights before Ronan found you, and has kept it in the windbreak at the lookout ever since.',
      icon: 'lantern',
    },
    {
      id: 'survey_map',
      name: 'The Survey Map',
      tags: ['quest', 'document'],
      questItem: true,
      skillModifiers: { notice: 1 },
      description: 'A Company survey of the high pass on oiled paper, in a careful hand. Somebody else has added a dotted line in red ink straight down through the clan’s winter valley.',
      loreText: 'The red line is labelled in small capitals: ROAD, SECOND SEASON. There is a square drawn over the long fire, and beside it one word: GARRISON.',
      icon: 'map',
    },
    {
      id: 'sealed_letter',
      name: 'The Sealed Letter',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'A waxed envelope addressed to the clan mother of the Greyhowe, sealed with the Company’s stamp. The Company paid a courier to carry it over the pass, and paid them not to open it.',
      loreText: 'It offers the clan flour, salt and iron every winter for ten years in exchange for right of road through the winter valley. It does not say what a road brings with it.',
      icon: 'letter',
    },
    {
      id: 'company_ledger',
      name: 'The Factor’s Ledger',
      tags: ['quest', 'document', 'evidence'],
      questItem: true,
      description: 'A leather ledger in Kell’s neat hand: flour, salt, wages, and on the last written page a costed plan for a road and a garrison through the Greyhowe winter valley.',
      loreText: 'Under BOUNTIES there is a single line: white wolf, true, pelt or live. The figure beside it is larger than the cost of the road.',
      icon: 'book',
    },
    {
      id: 'herb_satchel',
      name: 'The Herb Satchel',
      tags: ['tool'],
      skillModifiers: { healing: 2 },
      description: 'Your own satchel of dried roots and powders from the south, half of them labelled and a quarter of them any use in this cold.',
      loreText: 'Sil goes through it the way other people go through a letter from home, and asks what every jar is for twice.',
      icon: 'bag',
    },
    {
      id: 'caravan_sword',
      name: 'The Caravan Sword',
      tags: ['weapon'],
      skillModifiers: { brawl: 2 },
      description: 'A plain short sword in a scuffed scabbard, issued by the Company to its caravan guards. Every wolf-kin in camp knows exactly where it is at all times.',
      loreText: 'Ronan has asked to hold it four times. Varek has asked you, once and quietly, not to wear it at the long fire.',
      icon: 'sword',
    },
    {
      id: 'dried_apples',
      name: 'Ronan’s Dried Apples',
      tags: ['food'],
      consumable: { resourceId: 'warmth', amount: 6, consumesItem: true },
      description: 'A pouch of dried apple rings, stolen from Sil’s stores in a way Sil knows all about.',
      loreText: 'Ronan offers them as an apology, a bribe or a dare, and you can tell which by how many he holds out.',
      icon: 'food',
    },
    {
      id: 'bone_whistle',
      name: 'Tam’s Bone Whistle',
      tags: ['personal'],
      questItem: true,
      description: 'A whistle carved from deer bone, the kind the clan uses to call across the ice. Two short notes mean come. One long one means stay away.',
      loreText: 'Tam carved it the winter he first went up to the den alone, so that somebody could always call him back. Until now nobody has had it but him.',
      icon: 'whistle',
    },
  ],
  abilities: [
    {
      id: 'speak_plainly',
      name: 'Say It Plainly',
      tags: ['social'],
      description: 'Tell somebody the true thing about who you are or what you want, and take whatever comes back.',
      affordances: ['tell the truth', 'be honest', 'confess', 'tell them who i am', 'come clean', 'admit it', 'say it plainly'],
      costs: [{ resourceId: 'warmth', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'candour', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'bluff',
      name: 'Lie Well',
      tags: ['social'],
      description: 'Give them a story that holds up, in a camp where people can smell a nervous lie.',
      affordances: ['lie', 'bluff', 'make something up', 'pretend', 'cover story', 'deny it', 'tell them a story'],
      costs: [{ resourceId: 'suspicion', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'guile', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'read_them',
      name: 'Watch Them',
      tags: ['sight'],
      description: 'Work out what somebody means from their ears, their tail and their hands, which in this camp say more than their mouths.',
      affordances: ['watch', 'read them', 'look around', 'study', 'notice', 'take it in', 'look closer', 'search', 'read it'],
      costs: [{ resourceId: 'warmth', amount: 3 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'notice', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'earn_your_keep',
      name: 'Earn Your Keep',
      tags: ['utility'],
      description: 'Haul water, split wood, gut fish, mend nets: the work a winter camp runs on, done where people can see it.',
      affordances: ['help', 'work', 'haul water', 'chop wood', 'split wood', 'fish', 'mend the nets', 'carry', 'cook', 'pull my weight'],
      costs: [{ resourceId: 'warmth', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'might', skillId: 'labour', baseDc: 11 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'tend_wounds',
      name: 'Tend Someone',
      tags: ['healing'],
      description: 'Clean a cut, warm a frostbitten hand, sit up with a fever. Somebody in this camp is always coughing.',
      affordances: ['heal', 'tend', 'bandage', 'treat', 'check the wound', 'look after', 'nurse'],
      costs: [{ resourceId: 'warmth', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'healing', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'stand_your_ground',
      name: 'Stand Your Ground',
      tags: ['defensive'],
      description: 'Refuse, out loud, in front of people who are used to being obeyed, and do not step back.',
      affordances: ['refuse', 'say no', 'stand firm', 'stand my ground', 'speak for myself', 'hold my ground', 'face them'],
      costs: [{ resourceId: 'warmth', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'nerve', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'fight',
      name: 'Fight',
      tags: ['offensive'],
      description: 'Hit somebody, in a camp full of people with better teeth. It works sometimes, and it is always remembered.',
      affordances: ['fight', 'hit', 'punch', 'attack', 'swing at', 'grab', 'wrestle', 'knock down'],
      costs: [
        { resourceId: 'warmth', amount: 12 },
        { resourceId: 'suspicion', amount: 10 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'might', skillId: 'brawl', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'slip_away',
      name: 'Slip Away',
      tags: ['movement'],
      description: 'Go somewhere without the camp noticing, among people who can smell where you have been.',
      affordances: ['sneak', 'slip away', 'hide', 'sneak out', 'leave quietly', 'make a run for it', 'creep', 'eavesdrop', 'listen in'],
      costs: [
        { resourceId: 'warmth', amount: 6 },
        { resourceId: 'suspicion', amount: 8 },
      ],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'agility', skillId: 'stealth', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'let_him_close',
      name: 'Let Someone Close',
      tags: ['social'],
      description: 'Sit nearer than you need to. Take the offered hand. Say the warm thing instead of the safe one, and let the others see it.',
      affordances: ['flirt', 'hold his hand', 'sit close', 'lean on him', 'let him close', 'thank him', 'kiss', 'smile at him'],
      costs: [{ resourceId: 'friction', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'play_them_off',
      name: 'Play Them Off',
      tags: ['social'],
      description: 'Use one brother’s pride against another’s to get what you want. It works, and it costs all four of them.',
      affordances: ['play them off', 'make him jealous', 'set them against each other', 'pit them', 'compare them', 'tell him his brother said'],
      costs: [{ resourceId: 'friction', amount: 14 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'guile', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'invoke_guest_right',
      name: 'Call on Guest-Right',
      tags: ['social'],
      description: 'Remind the camp, out loud, whose guest you are and what that makes your host answerable for.',
      affordances: ['guest-right', 'call on guest right', 'i am his guest', 'remind them whose guest i am', 'invoke the law', 'ask my host to speak'],
      costs: [{ resourceId: 'warmth', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'nerve', baseDc: 12 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['has_a_host'],
        lockedCopy: 'Nobody has tied a cord on your wrist. Until somebody does, you are a stranger with an opinion, and the old law has nothing to say about strangers.',
      },
    },
    {
      id: 'follow_the_white_tracks',
      name: 'Follow the White Tracks',
      tags: ['survival'],
      description: 'Follow prints wider than your spread hand up into snow nobody in camp will walk.',
      affordances: ['follow the tracks', 'track it', 'follow the prints', 'find the den', 'go after the wolf', 'trail it'],
      costs: [{ resourceId: 'warmth', amount: 12 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'arcana', skillId: 'lore', baseDc: 14 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:the_white_wolf'],
        lockedCopy: 'There is nothing to follow. You remember something pale in the storm the way you remember a dream, and a dream leaves no prints.',
      },
    },
  ],
  locations: [
    {
      id: 'the_warm_tent',
      name: 'The Warm Tent',
      shortName: 'Sil’s Tent',
      description:
        'Sil’s healing tent at the low end of camp: a ring of hides over bent poles, a fire that never goes out, bundles of drying bark hanging from every pole, and the fur bed nearest the heat that you woke up in. It smells of smoke and willow. The long fire is a short walk uphill.',
      artDirection:
        'Interior of a round hide tent in a snowy northern camp, a small central fire, bundles of bark and herbs hanging from the poles, a fur bed close to the flames, warm orange light against blue cold at the flap.',
      connections: [{ to: 'the_long_fire', travelMinutes: 2, label: 'Uphill to the long fire' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [
        { itemId: 'white_fur', qty: 1, ownerId: null, aka: ['white fur', 'the tuft', 'fur on my coat', 'pale fur'] },
      ],
    },
    {
      id: 'the_long_fire',
      name: 'The Long Fire',
      shortName: 'The Fire',
      description:
        'The heart of the winter camp: a trench fire as long as three tents, ringed with log benches, where forty-odd wolf-kin eat, argue and hold council. Who sits nearest the clan mother matters this week. Every path in camp starts here, down to the warm tent, across to the lodges and stores, out to the lake, and up to the lookout.',
      artDirection:
        'A long trench fire in the middle of a winter camp at dusk, log benches crowded with wolf-eared people in furs, hide tents and smoke behind, snowy pines and a mountain pass above.',
      connections: [
        { to: 'the_warm_tent', travelMinutes: 2, label: 'Down to Sil’s tent' },
        { to: 'mothers_lodge', travelMinutes: 2, label: 'The clan mother’s lodge' },
        { to: 'the_sons_lodge', travelMinutes: 2, label: 'The brothers’ lodge' },
        { to: 'the_stores', travelMinutes: 3, label: 'The smokehouse and stores' },
        { to: 'the_ice_lake', travelMinutes: 10, label: 'Down to the frozen lake' },
        { to: 'the_lookout', travelMinutes: 20, label: 'The climb to the lookout' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
      takeableItems: [],
    },
    {
      id: 'mothers_lodge',
      name: 'The Clan Mother’s Lodge',
      shortName: 'Aud’s Lodge',
      description:
        'The only timber-framed lodge in camp, hung with old hunting gear and a loom with a half-finished blanket on it. Aud hears disputes here from a stool lower than everybody else’s, and nobody mistakes it for modesty. The walls are thin enough to listen through if you are careful about the snow.',
      artDirection:
        'A timber-framed lodge interior hung with furs and hunting gear, a loom with a half-woven blanket, a low stool by a hearth, a small grey-haired woman holding a knotted cord. Firelit, orderly, formidable.',
      connections: [{ to: 'the_long_fire', travelMinutes: 2, label: 'Back to the long fire' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 1 },
      takeableItems: [],
    },
    {
      id: 'the_sons_lodge',
      name: 'The Brothers’ Lodge',
      shortName: 'The Lodge',
      description:
        'A long tent with four hearths and hide curtains between them, where the four brothers sleep, argue and leave their boots in each other’s way. Each hearth has a guest-curtain, and a guest sleeps behind the host’s. The woodpile behind it is taller than it needs to be, and Tam gets nervous if anybody moves it.',
      artDirection:
        'A long hide lodge interior divided by hanging curtains into four hearth spaces, boots and gear everywhere, a guest-curtain of red-dyed hide, warm firelight. Crowded, lived-in, comic.',
      connections: [{ to: 'the_long_fire', travelMinutes: 2, label: 'Out to the long fire' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 1 },
      takeableItems: [
        { itemId: 'dried_apples', qty: 1, ownerId: 'ronan', aka: ['apples', 'dried apples', 'the pouch', 'apple rings'] },
      ],
    },
    {
      id: 'the_stores',
      name: 'The Stores',
      shortName: 'Stores',
      description:
        'Smokehouse, drying racks and a larder dug in under turf. Fish on lines, meat in the smoke, and a row of flour sacks that is visibly too short for the winter, if you know how to count. Aud comes here every afternoon and ties knots in her cord.',
      artDirection:
        'A northern smokehouse and turf-roofed larder in snow, racks of drying fish, a short row of grain sacks against a log wall, smoke drifting. Practical and slightly worrying.',
      connections: [{ to: 'the_long_fire', travelMinutes: 3, label: 'Back to the long fire' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 0 },
      takeableItems: [],
    },
    {
      id: 'the_ice_lake',
      name: 'The Ice Lake',
      shortName: 'The Lake',
      description:
        'A frozen lake below camp, black ice swept clear in patches, with a line of fishing holes cut across it. Sound carries for a mile out here. Ronan thinks it is the best place in the world to win an argument, and Tam checks the lines on the far shore when he wants to be alone.',
      artDirection:
        'A wide frozen lake under a pale sky, swept black ice, a row of fishing holes with lines and poles, snowy pines on the far shore, two distant adult figures in furs, with wolf tails. Open, bright, cold.',
      connections: [{ to: 'the_long_fire', travelMinutes: 10, label: 'Up to camp' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: -1 },
      takeableItems: [],
    },
    {
      id: 'the_lookout',
      name: 'The Lookout',
      shortName: 'Lookout',
      description:
        'A spur of rock above camp with a windbreak of stacked stones, where somebody always watches the pass. From here you can see the high pass, the guide-poles going under, and the place where you were found. A ridge trail runs east from here to the other clan’s camp.',
      artDirection:
        'A rocky outcrop above a valley camp, a curved windbreak of stacked stones, a tall figure in a grey fur mantle looking up at a snowy mountain pass marked with guide-poles. Wind, height, moonlight.',
      connections: [
        { to: 'the_long_fire', travelMinutes: 20, label: 'Down to camp' },
        { to: 'the_high_pass', travelMinutes: 60, label: 'Up to the high pass' },
        { to: 'the_cold_ridge', travelMinutes: 120, label: 'East along the ridge trail' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 2 },
      takeableItems: [
        { itemId: 'guide_lantern', qty: 1, ownerId: 'varek', aka: ['lantern', 'the lantern', 'my lantern', 'cracked lantern'] },
      ],
    },
    {
      id: 'the_high_pass',
      name: 'The High Pass',
      shortName: 'The Pass',
      description:
        'A white saddle between two peaks, marked with guide-poles that are already half buried. The caravan’s broken sled is still up here under a drift, with a map case lashed to it that holds the survey’s second copy. The boundary stones stand at the top, and the rocks to the east are full of hollows nobody in camp will walk past after dark.',
      artDirection:
        'A high snowy mountain saddle between two peaks, a line of half-buried wooden guide-poles, a broken sled under a drift, wind lifting snow off the ridge. Vast, white, dangerous.',
      connections: [
        { to: 'the_lookout', travelMinutes: 60, label: 'Down to the lookout' },
        { to: 'the_boundary_stones', travelMinutes: 30, label: 'Up to the boundary stones' },
        { to: 'the_old_den', travelMinutes: 25, lockedByFlag: 'found_the_old_den', label: 'Into the eastern rocks' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 3 },
      takeableItems: [
        { itemId: 'survey_map', qty: 1, ownerId: null, aka: ['survey map', 'the map case', 'the survey', 'oiled map'] },
      ],
    },
    {
      id: 'the_boundary_stones',
      name: 'The Boundary Stones',
      shortName: 'The Stones',
      description:
        'A ring of seven standing stones at the top of the pass, where clan land ends and the Company’s road begins. Outsiders wait here to be met. On the second day a Company sled stands outside the ring with twenty sacks of flour under oilcloth, and its owner will not step inside.',
      artDirection:
        'A ring of tall weathered standing stones at the top of a snowy pass, a southern sled loaded with sacks under oilcloth just outside the ring, hired men with lanterns, a man in spectacles. Wind and grey light.',
      connections: [
        { to: 'the_high_pass', travelMinutes: 30, label: 'Back down to the high pass' },
        { to: 'company_post', travelMinutes: 150, label: 'Down the south road' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 4 },
      takeableItems: [],
    },
    {
      id: 'company_post',
      name: 'The Company Post',
      shortName: 'The Post',
      description:
        'A timber stockade at the foot of the south road, with a counting room, a store, a stove that never goes out and a smell of lamp oil and wet wool. Kell works upstairs with the ledger. Two and a half hours’ climb back up to the stones, and the last place anybody can reach from the clan’s side once the pass shuts.',
      artDirection:
        'A southern trading-post stockade of raw timber at the foot of a mountain road, lamplit windows, sledges and sacks in the yard, snowy peaks behind. Warm-looking and slightly sinister.',
      connections: [{ to: 'the_boundary_stones', travelMinutes: 150, label: 'Back up the south road' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 5 },
      takeableItems: [
        { itemId: 'company_ledger', qty: 1, ownerId: 'kell', aka: ['ledger', 'the ledger', 'his ledger', 'account book'] },
      ],
    },
    {
      id: 'the_old_den',
      name: 'The Old Den',
      shortName: 'The Den',
      description:
        'A dry cave in the eastern rocks above the pass, older than the camp, with claw marks on the walls far too high for any wild wolf. There is a blanket folded in the back, a stub of candle, and a spare cloak on a peg. In deep cold the snow outside is always printed with white tracks.',
      artDirection:
        'A dry rock cave above a snowy pass, old claw marks high on the stone walls, a folded blanket and a candle stub at the back, pale blue light from the entrance, huge wolf prints in the snow outside. Hushed and secret.',
      connections: [{ to: 'the_high_pass', travelMinutes: 25, label: 'Back down to the pass' }],
      discoveredByDefault: false,
      mapPosition: { x: 1, y: 3 },
      takeableItems: [],
    },
    {
      id: 'the_cold_ridge',
      name: 'The Cold Ridge Camp',
      shortName: 'Cold Ridge',
      description:
        'The other wolf clan’s winter camp, two hours east along the ridge: more hunters, fewer tents, and almost no flour. Their fires burn smaller than the Greyhowe’s and everybody notices. Dagny’s tent is the one with a fox-fur flap and nobody waiting outside it.',
      artDirection:
        'A sparser wolf-kin winter camp on an exposed ridge, small fires, lean hunters in pale furs, one tent with a white fox-fur flap. Wind-scoured and proud.',
      connections: [{ to: 'the_lookout', travelMinutes: 120, label: 'West along the ridge trail' }],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 2 },
      takeableItems: [],
    },
  ],
  factions: [
    {
      id: 'faction_greyhowe',
      name: 'The Greyhowe Clan',
      description:
        'Forty-odd wolf-kin wintering in a sheltered valley under the high pass: hunters, fishers, one healer, a clan mother who counts everything, and a law about strangers older than anybody’s grandmother. Short of flour this year, and not saying so.',
      startingReputation: 0,
      ranks: [
        { atReputation: -30, label: 'Trespasser' },
        { atReputation: 0, label: 'Stranger' },
        { atReputation: 25, label: 'Guest' },
        { atReputation: 45, label: 'Hearth-friend' },
        { atReputation: 70, label: 'Kin' },
      ],
      allies: [],
      enemies: ['faction_company'],
    },
    {
      id: 'faction_company',
      name: 'The Company',
      description:
        'A southern trading house with a stockaded post at the foot of the south road, a factor who prices everything out loud, and a survey of the high pass it paid for and has not explained. It pays well, writes everything down, and has never lost an argument it could put a number on.',
      startingReputation: 20,
      ranks: [
        { atReputation: 0, label: 'Written off' },
        { atReputation: 20, label: 'Under contract' },
        { atReputation: 40, label: 'Valued' },
        { atReputation: 65, label: 'One of theirs' },
      ],
      allies: [],
      enemies: ['faction_greyhowe'],
    },
    {
      id: 'faction_cold_ridge',
      name: 'The Cold Ridge',
      description:
        'The other wolf clan on this mountain, wintering two hours east along the ridge: forty hunters, no flour, a mother who wants the pass held, and an heir who has been promised to Varek without being asked.',
      startingReputation: 0,
      ranks: [
        { atReputation: 0, label: 'Outsider' },
        { atReputation: 25, label: 'Known' },
        { atReputation: 50, label: 'Trusted' },
        { atReputation: 75, label: 'Ally' },
      ],
      allies: [],
      enemies: [],
    },
  ],
  characters: [
    {
      id: 'varek',
      name: 'Varek',
      role: 'The eldest brother, who leads the clan’s hunters and is expected to lead the clan',
      cardBlurb:
        'He is the only brother who did not claim you, he has never once raised his voice, and he knows something about the night you were found that he would rather you never asked.',
      pronouns: 'he/him',
      publicTraits: ['Says less than he knows', 'Calm in a way that makes other people calmer', 'Counts time in nights before the pass shuts'],
      hiddenDrives: [
        'He does not want to lead the clan and nobody has ever asked him whether he does',
        'He wants to be forgiven for the two nights he waited, and does not think he should be',
      ],
      values: ['Getting the clan through the winter', 'Doing the hard thing himself rather than ordering somebody else to'],
      fears: ['That waiting is the only thing he is good at', 'Turning into his mother without her humour'],
      socialStyle:
        'Stands between people and the door. Answers a question with the one fact that matters, then waits for you to work out the rest.',
      boundaries: [
        'Will not lie to you. He will refuse to answer instead, and say that he is refusing',
        'Will not fight his brothers in front of the clan, whatever they do to provoke it',
      ],
      goals: [
        'Get the clan to the thaw on short stores',
        'Find a way out of the midwinter betrothal his mother arranged without costing the clan the pass',
      ],
      secrets: [
        {
          id: 'varek_the_lantern',
          fact: 'He saw the player’s lantern on the high pass two nights before anyone found the player, and watched it rather than going down, to see whether Company men followed. Nobody did. When it went out he climbed up and found only the lantern, which he still keeps.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells you himself at the lookout, alone, if you ask why he did not claim you after the first night; or you find the lantern in his windbreak with his mark on the handle.',
        },
        {
          id: 'varek_the_betrothal',
          fact: 'His mother has arranged for him to marry Dagny of the Cold Ridge at the midwinter fire, to buy the Ridge hunters’ help holding the pass against the Company. He has neither agreed nor refused.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Dagny tells you before he does, the evening she arrives, if you speak to her away from the fire.',
        },
        {
          id: 'varek_tams_shape',
          fact: 'He knows Tam can take the old shape and has been covering for him for six winters, including on the night of the storm.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only once you already know what Tam is, and only if you tell Varek you will keep it.',
        },
      ],
      speechStyle:
        'Short declaratives, rarely more than eight words. Starts hard sentences with "Listen." Measures everything in nights. Never asks a question he can state instead, and never fills a silence.',
      topics: ['the pass', 'the lantern', 'the betrothal', 'his mother', 'leading the hunt', 'his brothers'],
      voiceSamples: [
        'Listen. The pass shuts in three nights. After that, nobody goes down until thaw. Decide while deciding is still yours.',
        'Mother will ask what you are worth. Give her a number. She respects numbers.',
        'Sit. Eat. Arguing keeps until you stop shaking.',
        'I saw your lantern. Two nights before Ronan found you. I watched it, and waited, and nobody came after you. Nobody.',
      ],
      appearance:
        'An adult man, tall and broad-shouldered, dark hair with a single streak of grey at the front he was born with, steady amber eyes, grey wolf ears that go flat when he is thinking, a long grey tail, and a heavy grey fur mantle over a dark brown wool hunting tunic.',
      visualHook: 'Grey wolf ears and one streak of grey through dark hair, the same colour as his mantle.',
      silhouette: 'Filling a doorway, arms folded, tail perfectly still.',
      artSeed: 'twcg-varek-01',
      portrait: null,
      expressions: ['neutral', 'guarded', 'warm', 'grave', 'surprised'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'the_sons_lodge', activity: 'sleeping at the hearth nearest the door' },
        { startMinute: 420, endMinute: 540, locationId: 'the_warm_tent', activity: 'giving the morning report at Sil’s fire, standing' },
        { startMinute: 540, endMinute: 780, locationId: 'the_lookout', activity: 'watching the pass from the windbreak' },
        { startMinute: 780, endMinute: 960, locationId: 'the_high_pass', activity: 'walking the guide-poles to see how deep the snow is' },
        { startMinute: 960, endMinute: 1080, locationId: 'mothers_lodge', activity: 'arguing quietly with his mother about flour' },
        { startMinute: 1080, endMinute: 1260, locationId: 'the_long_fire', activity: 'at the long fire, seated where he can see the whole camp' },
        { startMinute: 1260, endMinute: 1440, locationId: 'the_sons_lodge', activity: 'mending gear by the hearth, last to lie down' },
      ],
      homeLocationId: 'the_sons_lodge',
      knowledgeScope: ['the_pass', 'the_lantern', 'greyhowe', 'the_betrothal', 'tams_shape', 'the_company', 'the_stores'],
      startingRelationship: { trust: 25, affection: 15, respect: 30, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'varek_tells_you_about_the_lantern',
          label: 'He tells you why he did not claim you',
          kind: 'TRUST',
          requires: { trust: 55, flagsSet: ['claim_settled'] },
        },
        {
          id: 'varek_leaves_the_doorway',
          label: 'He stops standing between you and the door',
          kind: 'ROMANCE',
          requires: { trust: 65, affection: 70 },
        },
      ],
      attributes: { might: 15, agility: 12, mind: 13, presence: 14, resolve: 16, arcana: 8 },
      companion: null,
      scouting: null,
      combatant: { health: 70, defenseDc: 17, damage: 11, tags: ['wolfkin', 'hunter'] },
    },
    {
      id: 'ronan',
      name: 'Ronan',
      role: 'The third brother, the clan’s best hunter and loudest voice, who found you face-down in a drift',
      cardBlurb:
        'He found you in the snow and has told the story eleven times since, bigger every time. He will dare you into anything, and he is the brother most likely to step between you and trouble without being asked.',
      pronouns: 'he/him',
      publicTraits: ['Loud, quick and delighted by trouble', 'Competitive about everything, including soup', 'Brave before he is careful'],
      hiddenDrives: [
        'He wants the clan to look at him the way it looks at Varek, just once',
        'He is afraid he is only fun, and that nobody follows fun',
        'A guest at his hearth is standing, and he needs every scrap of it before he stands up at midwinter',
      ],
      values: ['Saying it to your face', 'Never leaving anybody out in the snow'],
      fears: ['Losing to Varek in front of everyone', 'Being the brother people like and nobody trusts'],
      socialStyle:
        'Turns everything into a contest, then lets you win the ones that matter. Gets loud when he is hurt and quiet when he is serious.',
      boundaries: [
        'Will not hit anybody who cannot hit back, and will stop a fight he started if it turns into that',
        'Will not pretend to like the Company, whatever his mother is offered',
      ],
      goals: [
        'Stand up at the midwinter fire and challenge Varek, in the old form, for the right to speak for the hunters',
        'Make you laugh before you leave, if you are leaving',
      ],
      secrets: [
        {
          id: 'ronan_the_challenge',
          fact: 'He means to stand up at the midwinter fire and challenge Varek in the old form, wrestling to the ground, for the right to speak for the hunters. He has told nobody but Tam.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells you on the ice, as a boast, once you have beaten him at something or made him laugh twice.',
        },
        {
          id: 'ronan_the_trapper',
          fact: 'A month ago he broke a Company trapper’s arm in a fight at the boundary stones, and the Company wants him handed over. Kell’s flour is partly about that.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Kell mentions it, pleasantly, if you meet him at the stones; Ronan admits it at once if you ask him straight.',
        },
      ],
      speechStyle:
        'Fast and loud. Laughs mid-sentence. Makes a bet or a dare out of everything, opens with "Ha!" and calls people by nicknames he invents on the spot. His tail wags when he lies, and he knows it.',
      topics: ['hunting', 'the midwinter challenge', 'Varek', 'the Company trappers', 'fishing on the ice', 'the rescue'],
      voiceSamples: [
        'Ha! Face-down in a drift with snow up your nose, and still glaring at me. I like you already.',
        'Bet you a week of dishes I can cut a fishing hole faster than you can say my brother’s name. Go on. Try it.',
        'Everybody keeps telling me to wait for spring. Twenty-five winters I’ve waited. Midwinter, I stand up at that fire.',
        'Pick Varek and you get rules. Pick me and you get fun. Pick Sil and you get soup.',
      ],
      appearance:
        'An adult man, lean and quick, rust-red hair worn long and tied back badly, bright green eyes, rust-red wolf ears with a nick out of the left one, a bushy rust-red tail he cannot keep still, and a red wool scarf he never takes off over a scuffed brown leather hunting jacket.',
      visualHook: 'A nick out of his left wolf ear and a tail that wags every time he lies.',
      silhouette: 'Mid-movement, one foot up on something, grinning back over his shoulder.',
      artSeed: 'twcg-ronan-01',
      portrait: null,
      expressions: ['grinning', 'angry', 'warm', 'surprised', 'sulking'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'the_sons_lodge', activity: 'sleeping sprawled across two hearths' },
        { startMinute: 420, endMinute: 500, locationId: 'the_warm_tent', activity: 'eating Sil’s dried apples and talking over everybody' },
        { startMinute: 500, endMinute: 780, locationId: 'the_ice_lake', activity: 'cutting fishing holes and losing his temper with them' },
        { startMinute: 780, endMinute: 1020, locationId: 'the_lookout', activity: 'hunting the slopes above the lookout' },
        { startMinute: 1020, endMinute: 1260, locationId: 'the_long_fire', activity: 'telling the rescue story again, bigger' },
        { startMinute: 1260, endMinute: 1440, locationId: 'the_sons_lodge', activity: 'arguing with Tam in the dark about nothing' },
      ],
      homeLocationId: 'the_sons_lodge',
      knowledgeScope: ['hunting', 'greyhowe', 'the_rescue', 'the_challenge', 'the_company_trappers', 'the_ice_lake'],
      startingRelationship: { trust: 15, affection: 30, respect: 10, fear: 0, rivalry: 15 },
      gates: [
        {
          id: 'ronan_tells_you_the_plan',
          label: 'He tells you what he means to do at midwinter',
          kind: 'TRUST',
          requires: { trust: 40, respect: 45 },
        },
        {
          id: 'ronan_goes_quiet',
          label: 'He stops performing for you',
          kind: 'ROMANCE',
          requires: { trust: 60, affection: 70 },
        },
      ],
      attributes: { might: 15, agility: 15, mind: 10, presence: 13, resolve: 11, arcana: 7 },
      companion: null,
      scouting: null,
      combatant: { health: 65, defenseDc: 16, damage: 12, tags: ['wolfkin', 'hunter'] },
    },
    {
      id: 'sil',
      name: 'Sil',
      role: 'The second brother and the clan’s healer, whose tent you woke up in',
      cardBlurb:
        'Your pack is under his bedding and he hasn’t mentioned it. He did sit up all night keeping you breathing, so he feels the two things balance out.',
      pronouns: 'he/him',
      publicTraits: ['Dry as kindling', 'Gentle with patients and nobody else', 'Reads people like symptoms'],
      hiddenDrives: [
        'He wants to learn what the southern physicians know, and is ashamed of how much',
        'He wants one person in camp who will not ask him to choose between the clan and a patient',
      ],
      values: ['Treating whoever is sick', 'Telling people exactly what is wrong with them'],
      fears: ['A fever he cannot break, in a winter with no medicine left', 'His mother learning where his medicine comes from'],
      socialStyle:
        'Busy with his hands the whole time you talk to him. Delivers bad news and jokes in the same flat voice, so you have to watch his ears to tell them apart.',
      boundaries: [
        'Will not refuse treatment to anybody, including the Company, and including you if you have lied to him',
        'Will not lie to a patient about what is wrong with them',
      ],
      goals: [
        'Get the camp through the winter without losing anybody to the cough',
        'Learn everything you know about the south before the pass closes',
      ],
      secrets: [
        {
          id: 'sil_the_post',
          fact: 'All autumn he has been going down to the Company post in secret, treating fevers among the clerks in exchange for southern medicine. The clan would call it treason. He has heard the clerks talk about the road.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He shows you the southern medicine chest under his herb shelves if you are hurt or sick and you promise not to tell his mother.',
        },
        {
          id: 'sil_your_pack',
          fact: 'He recognised the Company’s stamp on the player’s pack when Tam carried the player in, and hid the pack under his own bedding before his mother could see it.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He gives it back without being asked once you have told him one true thing about why you came north.',
        },
      ],
      speechStyle:
        'Level and clinical. Short instructions, then a dry joke in exactly the same tone. Says "Hm." when he is thinking. Names the remedy and what it is made of, and never softens a diagnosis.',
      topics: ['your health', 'the cough in camp', 'southern medicine', 'the trading post', 'his brothers', 'herbs and bark'],
      voiceSamples: [
        'Hold still. All ten fingertips kept, which is more than the cold usually leaves anybody. Thank the willow bark, not my brothers.',
        'Hm. Ronan found you, Tam carried you, and I spent a night keeping your heart from forgetting its rhythm. Weigh those however you like.',
        'Fever does not ask which side of the stones anybody sleeps on. Neither do I.',
        'Drink this. It tastes like boiled bark because it is boiled bark.',
      ],
      appearance:
        'An adult man, slim, black hair cut short for practicality, ink-dark eyes, soft charcoal wolf ears and a charcoal tail, a dark green wool tunic with the sleeves always rolled to the elbow, a thin burn scar across the back of one hand, and a satchel of herbs slung across his chest.',
      visualHook: 'Charcoal wolf ears and a thin burn scar across the back of one hand from a pot he refused to let go of.',
      silhouette: 'Bent over a pot or a patient, one ear turned toward whoever is talking.',
      artSeed: 'twcg-sil-01',
      portrait: null,
      expressions: ['dry', 'neutral', 'warm', 'concerned', 'annoyed'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'the_warm_tent', activity: 'dozing upright beside whoever is sick' },
        { startMinute: 420, endMinute: 720, locationId: 'the_warm_tent', activity: 'boiling bark, grinding roots, checking pulses' },
        { startMinute: 720, endMinute: 840, locationId: 'the_stores', activity: 'counting what is left on the drying racks' },
        { startMinute: 840, endMinute: 1080, locationId: 'the_warm_tent', activity: 'seeing the camp’s coughs one at a time' },
        { startMinute: 1080, endMinute: 1200, locationId: 'the_long_fire', activity: 'eating fast at the end of a bench' },
        { startMinute: 1200, endMinute: 1440, locationId: 'the_warm_tent', activity: 'reading a southern book by a fat lamp' },
      ],
      homeLocationId: 'the_warm_tent',
      knowledgeScope: ['healing', 'greyhowe', 'the_company_post', 'the_road', 'your_pack', 'the_cough'],
      startingRelationship: { trust: 30, affection: 20, respect: 25, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'sil_returns_your_pack',
          label: 'He gives you back the pack he hid',
          kind: 'TRUST',
          requires: { trust: 40, flagsSet: ['told_the_truth'] },
        },
        {
          id: 'sil_shows_you_the_chest',
          label: 'He shows you where his medicine really comes from',
          kind: 'TRUST',
          requires: { trust: 50 },
        },
        {
          id: 'sil_lets_you_close',
          label: 'He stops treating you like a patient',
          kind: 'ROMANCE',
          requires: { trust: 65, affection: 65 },
        },
      ],
      attributes: { might: 9, agility: 12, mind: 16, presence: 11, resolve: 14, arcana: 10 },
      companion: null,
      scouting: null,
      combatant: { health: 40, defenseDc: 13, damage: 5, tags: ['wolfkin', 'healer'] },
    },
    {
      id: 'tam',
      name: 'Tam',
      role: 'The fourth brother, who carried you three miles through the storm',
      cardBlurb:
        'You are wearing his cloak, and he has been cold for two days without a word about it. Ask him what walked ahead of you in the storm and watch his ears.',
      pronouns: 'he/him',
      publicTraits: ['Asks two questions at once', 'Warm to everybody, which embarrasses him', 'A terrible liar, with one exception'],
      hiddenDrives: [
        'He wants to see the south once before he decides whether he belongs anywhere',
        'He wants somebody to know what he is and not be afraid of it',
      ],
      values: ['Being kind before being clever', 'Keeping a promise even when it costs him'],
      fears: ['The Company finding out what walks the pass in a storm', 'His brothers looking at him the way people look at a wolf'],
      socialStyle:
        'Talks fast, apologises for talking fast, and keeps going. Brings you things without being asked: tea, a better blanket, a fish he caught himself.',
      boundaries: [
        'Will not let anybody be left outside in a storm, including people who deserve it',
        'Will not show the old shape to anybody who has not asked to see it, and will never let it be used as a weapon',
      ],
      goals: ['Hear everything about the south before the pass closes', 'Keep the Company’s hunters off the high pass this winter'],
      secrets: [
        {
          id: 'tam_the_old_shape',
          fact: 'He can take the old shape, a full white wolf, in deep cold. Only his mother and Varek know. In the storm he found the player as the wolf, walked ahead through the shallowest snow to Ronan’s hunting line, then came back as himself to carry the player down.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells you himself at the old den if you ask what you saw in the snow and promise not to be afraid; or you follow the white tracks that circle your tent at dawn.',
        },
        {
          id: 'tam_the_bag',
          fact: 'He has a bag packed under the woodpile behind the lodge, with a knife, dried fish and one southern coin, in case he ever decides to go.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He admits it, red to the ear-tips, if you tell him you are going south and ask whether he has ever thought about it.',
        },
      ],
      speechStyle:
        'Quick, eager and full of questions, often two in a row. Corrects himself mid-sentence, says "sorry" and then says the thing anyway. Goes very quiet and very simple when something matters.',
      topics: ['the south', 'the storm', 'what you saw in the snow', 'his brothers', 'the ice lake', 'stories'],
      voiceSamples: [
        'Is it true southern towns keep lamps burning all night? Every street? Who pays for the oil?',
        'Keep the cloak. No, really, keep it. I run warm. Everyone says so. Ronan says it’s annoying.',
        'I didn’t find you. I only carried you. Three miles, and you never woke, just kept mumbling about a light.',
        'Sorry, I’m asking too much. Have you seen the sea? Properly seen it? What colour is it, really?',
      ],
      appearance:
        'An adult man, tall and long-limbed, messy white-blond hair, pale blue eyes, pale silver wolf ears that go pink at the edges when he is embarrassed, a pale silver tail, and a patched oatmeal wool tunic with no cloak over it, because he gave you his.',
      visualHook: 'Pale silver wolf ears that turn pink at the edges when he is embarrassed.',
      silhouette: 'Leaning in, holding out something he brought you, ears forward.',
      artSeed: 'twcg-tam-01',
      portrait: null,
      expressions: ['bright', 'flustered', 'warm', 'worried', 'surprised'],
      schedule: [
        { startMinute: 0, endMinute: 400, locationId: 'the_sons_lodge', activity: 'sleeping with his ears under the blanket' },
        { startMinute: 400, endMinute: 540, locationId: 'the_warm_tent', activity: 'hauling firewood for Sil and staying to ask questions' },
        { startMinute: 540, endMinute: 720, locationId: 'the_stores', activity: 'gutting fish at the smokehouse' },
        { startMinute: 720, endMinute: 900, locationId: 'the_ice_lake', activity: 'checking the lines on the far shore' },
        { startMinute: 900, endMinute: 1080, locationId: 'the_lookout', activity: 'walking the ridge trail alone, checking his own snare line' },
        { startMinute: 1080, endMinute: 1260, locationId: 'the_long_fire', activity: 'at the long fire, as close to the guest as he is allowed' },
        { startMinute: 1260, endMinute: 1440, locationId: 'the_sons_lodge', activity: 'pretending to sleep while Ronan talks' },
      ],
      homeLocationId: 'the_sons_lodge',
      knowledgeScope: ['the_storm', 'the_old_shape', 'the_old_den', 'greyhowe', 'the_ice_lake', 'the_south_as_rumour'],
      startingRelationship: { trust: 35, affection: 35, respect: 10, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'tam_shows_you',
          label: 'He shows you what walked ahead of you in the storm',
          kind: 'TRUST',
          requires: { trust: 70 },
        },
        {
          id: 'tam_asks_to_come',
          label: 'He asks whether he could come south with you',
          kind: 'ROMANCE',
          requires: { trust: 60, affection: 70 },
        },
      ],
      attributes: { might: 13, agility: 14, mind: 11, presence: 12, resolve: 12, arcana: 15 },
      companion: null,
      scouting: null,
      combatant: { health: 50, defenseDc: 14, damage: 8, tags: ['wolfkin', 'old-shape'] },
    },
    {
      id: 'aud',
      name: 'Clan Mother Aud',
      calledName: 'Aud',
      role: 'The brothers’ mother and head of the Greyhowe clan, who decides whether a guest stays',
      cardBlurb:
        'Every guest is a mouth, and she has counted yours. At the midwinter fire she decides what you are worth, out loud, in sacks of flour.',
      pronouns: 'she/her',
      publicTraits: ['Counts everything', 'Funny in a way that leaves marks', 'Never makes a promise she has not priced'],
      hiddenDrives: [
        'She is tired, and wants one of her sons to take the clan off her before the next bad winter',
        'She has kept Tam’s secret for six winters and is running out of ways to keep it',
      ],
      values: ['Nobody in the clan goes hungry before she does', 'A bargain kept to the knot'],
      fears: ['A winter that empties the stores before thaw', 'The Company learning what Tam is'],
      socialStyle:
        'Asks what you are worth, then listens to how you answer rather than what you say. Feeds you while she questions you, and notices which hand you eat with.',
      boundaries: [
        'Will not break guest-right once it is given, even to save flour',
        'Will not let one son fight another past the ground at her fire',
      ],
      goals: [
        'Get the clan to the thaw on short stores',
        'Marry Varek to the Cold Ridge to hold the pass against the Company',
        'Find out what the factor really wants with a lost traveller',
      ],
      secrets: [
        {
          id: 'aud_the_count',
          fact: 'The flour runs out a month before thaw unless something changes. She has told nobody, not even Varek.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells you in the stores, counting sacks, if you have worked a full day for the clan without being asked.',
        },
        {
          id: 'aud_the_fallback',
          fact: 'She has half-agreed to Kell’s flour for the player, as a fallback, if nobody speaks for the player at the midwinter fire.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Sil or Varek lets it slip if you ask what happens when a host does not stand up for a guest.',
        },
      ],
      speechStyle:
        'Brisk, wry and practical. Turns everything into arithmetic: mouths, sacks, days to thaw. Calls everybody "love" or "stranger", depending, and switches without warning.',
      topics: ['the stores', 'guest-right', 'her sons', 'the Company', 'the Cold Ridge', 'the old stories'],
      voiceSamples: [
        'Every guest is a mouth, love, and every mouth eats until thaw. So. What do you bring, besides an appetite and my sons’ attention?',
        'Forty sacks, the factor offers. For one stranger. Either you are worth a great deal to him, or he is lying to me about why.',
        'I raised four sons through every hard winter since Varek. One guest will not finish me.',
      ],
      appearance:
        'An older woman, small and solid, iron-grey hair in a crown of braids, sharp grey eyes, grey wolf ears tipped with white, a heavy mantle of layered furs, and a knotted counting cord at her belt.',
      visualHook: 'A knotted counting cord at her belt, one knot for every sack left in the stores.',
      silhouette: 'Seated very upright on a low stool, a bowl in one hand and the counting cord in the other.',
      artSeed: 'twcg-aud-01',
      portrait: null,
      expressions: ['neutral', 'amused', 'stern', 'warm', 'grave'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'mothers_lodge', activity: 'sleeping lightly by the loom' },
        { startMinute: 420, endMinute: 720, locationId: 'mothers_lodge', activity: 'hearing disputes from a low stool' },
        { startMinute: 720, endMinute: 900, locationId: 'the_stores', activity: 'counting sacks and tying knots in her cord' },
        { startMinute: 900, endMinute: 1080, locationId: 'mothers_lodge', activity: 'at the loom, receiving anybody with a complaint' },
        { startMinute: 1080, endMinute: 1320, locationId: 'the_long_fire', activity: 'at the head of the long fire' },
        { startMinute: 1320, endMinute: 1440, locationId: 'mothers_lodge', activity: 'alone with the count' },
      ],
      homeLocationId: 'mothers_lodge',
      knowledgeScope: ['greyhowe', 'guest_right', 'the_stores', 'the_betrothal', 'tams_shape', 'the_company', 'the_old_stories'],
      startingRelationship: { trust: 0, affection: 0, respect: 10, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'aud_accepts_the_guest',
          label: 'She accepts you as a guest in front of the clan',
          kind: 'TRUST',
          requires: { trust: 30, flagsSet: ['claim_settled'] },
        },
        {
          id: 'aud_tells_you_the_count',
          label: 'She tells you how long the flour really lasts',
          kind: 'TRUST',
          requires: { trust: 50, flagsSet: ['pulled_your_weight'] },
        },
      ],
      attributes: { might: 9, agility: 9, mind: 16, presence: 17, resolve: 17, arcana: 12 },
      companion: null,
      scouting: null,
      combatant: { health: 40, defenseDc: 15, damage: 7, tags: ['wolfkin', 'elder'] },
    },
    {
      id: 'dagny',
      name: 'Dagny of the Cold Ridge',
      calledName: 'Dagny',
      role: 'Heir of the Cold Ridge clan, betrothed to Varek by two mothers who did not ask either of them',
      cardBlurb:
        'She is meant to marry Varek at midwinter and would sooner marry the weather. Offer her a way out and she may be the best ally you have on this mountain.',
      pronouns: 'she/her',
      publicTraits: ['Blunt to the point of rudeness', 'Funny when she is angry', 'Thinks three moves ahead'],
      hiddenDrives: [
        'She wants to lead her own clan, not be traded into somebody else’s',
        'She suspects the Company has offered her mother the same flour it offered Aud',
      ],
      values: ['Saying the price out loud', 'Her clan’s hunters eating this winter'],
      fears: ['Being a treaty instead of a person', 'The Company playing both clans against each other until there is no pass left to hold'],
      socialStyle: 'Arrives, takes the best seat, and tells everybody what they are actually arguing about.',
      boundaries: [
        'Will not marry anybody to be polite',
        'Will not betray her own clan’s hunters, whatever she thinks of her mother',
      ],
      goals: ['Get out of the betrothal without losing the alliance', 'Find out whether the Company is lying to both clans'],
      secrets: [
        {
          id: 'dagny_the_same_offer',
          fact: 'Kell visited the Cold Ridge a week ago and offered her mother the same flour for the same white wolf. Both clans are being bid against each other.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells you if you tell her something true about the Company first.',
        },
      ],
      speechStyle:
        'Dry, fast and blunt. Opens with "Let me save us both some time." Talks about romance like trade and about trade like a fight, and enjoys watching people decide whether she is joking.',
      topics: ['the betrothal', 'the Cold Ridge', 'Varek', 'the Company', 'holding the pass'],
      voiceSamples: [
        'Let me save us both some time. I don’t want him, he doesn’t want me, and our mothers want the pass. Now, which of those can you change?',
        'You look at Varek like he’s a locked door. Everybody does. Most of them give up before trying the handle.',
        'Cold Ridge has forty hunters and no flour. Greyhowe has flour and no hunters. That is the whole romance.',
      ],
      appearance:
        'An adult woman, tall, ash-blonde braids pinned up like a helmet, pale grey eyes, black-tipped wolf ears, a thin scar through her left eyebrow, and a white fox-fur collar over dark hunting leathers.',
      visualHook: 'Black-tipped wolf ears and a scar through her left eyebrow she explains differently every time.',
      silhouette: 'Sprawled in the best seat by the fire as if she owns it.',
      artSeed: 'twcg-dagny-01',
      portrait: null,
      expressions: ['dry', 'amused', 'blunt', 'neutral', 'surprised'],
      schedule: [
        { startMinute: 0, endMinute: 1440, locationId: 'the_cold_ridge', activity: 'at the Cold Ridge camp, two hours east along the ridge' },
      ],
      homeLocationId: 'the_cold_ridge',
      knowledgeScope: ['the_cold_ridge', 'the_betrothal', 'the_company', 'the_pass'],
      startingRelationship: { trust: 0, affection: 0, respect: 15, fear: 0, rivalry: 10 },
      gates: [
        {
          id: 'dagny_tells_you_the_offer',
          label: 'She tells you what the Company offered her mother',
          kind: 'TRUST',
          requires: { trust: 40 },
        },
        {
          id: 'dagny_sides_with_you',
          label: 'She brings the Cold Ridge in on your side',
          kind: 'ALLIANCE',
          requires: { trust: 55, respect: 50 },
        },
      ],
      attributes: { might: 14, agility: 14, mind: 14, presence: 14, resolve: 13, arcana: 7 },
      companion: null,
      scouting: null,
      combatant: { health: 55, defenseDc: 16, damage: 10, tags: ['wolfkin', 'ridge'] },
    },
    {
      id: 'kell',
      name: 'Matthias Kell',
      calledName: 'Kell',
      role: 'Factor of the Company post at the foot of the south road, and the man who hired your caravan',
      cardBlurb:
        'He signed your caravan’s papers and is coming up the mountain to collect you, with flour, apologies and a price list. You are not the most valuable thing on it.',
      pronouns: 'he/him',
      publicTraits: ['Courteous in every circumstance', 'Prices everything out loud', 'Never raises a threat he has not already costed'],
      hiddenDrives: [
        'He has been promised a seat on the Company board if the road over the pass is surveyed by spring',
        'He is frightened of the mountain and has never told a soul',
      ],
      values: ['A contract kept to the letter', 'Not wasting anything, including people'],
      fears: ['Going back south having failed', 'The snow above the boundary stones after dark'],
      socialStyle:
        'Smiles, apologises and produces a document. Makes every threat sound like a kindness he is reluctantly declining to extend.',
      boundaries: ['Will not use force himself; he hires it', 'Will not go above the boundary stones after dark'],
      goals: [
        'Bring back the traveller and the survey before the pass closes',
        'Get a white wolf south, alive or as a pelt',
        'Break the clans’ hold on the pass by spring',
      ],
      secrets: [
        {
          id: 'kell_the_road',
          fact: 'The survey is for a road through the Greyhowe winter valley, with a Company garrison where the long fire is. The clan would be moved off its winter grounds.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'It is in his ledger at the post and on the survey map, and Sil has heard the clerks talk about it.',
        },
        {
          id: 'kell_the_buyer',
          fact: 'The white wolf bounty is his own idea. A southern buyer has promised a fortune for a true-wolf pelt, and Kell believes the caravan driver who swears one walked through the storm.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He names the price himself if you ask what the notice on the boundary stone is for.',
        },
      ],
      speechStyle:
        'Smooth, formal and apologetic. Speaks in prices, clauses and regrets. Says "regrettably" and "arrangement", and never uses a threatening word when a number will do.',
      topics: ['the contract', 'the flour', 'the survey', 'the white wolf', 'the south road'],
      voiceSamples: [
        'Regrettably, the Company considers your contract undischarged. Paper, you understand. Nothing personal.',
        'Forty sacks for the traveller. Sixty if the papers come too. For the white wolf, I would empty the storehouse.',
        'I’m sure we can reach an arrangement. People generally do, once they have seen the alternative priced out.',
      ],
      appearance:
        'An adult man, neat and narrow, a trimmed brown beard going grey, round wire spectacles, a buttoned southern greatcoat too thin for the mountain, and a leather ledger under one arm. No wolf ears and no tail.',
      visualHook: 'Round wire spectacles that fog over every time he comes in from the cold.',
      silhouette: 'Standing very straight beside a laden sled, ledger open, pen ready.',
      artSeed: 'twcg-kell-01',
      portrait: null,
      expressions: ['polite', 'calculating', 'cold', 'neutral', 'surprised'],
      schedule: [
        { startMinute: 0, endMinute: 480, locationId: 'company_post', activity: 'in his rooms above the counting room' },
        { startMinute: 480, endMinute: 1080, locationId: 'company_post', activity: 'in the counting room with the ledger' },
        { startMinute: 1080, endMinute: 1440, locationId: 'company_post', activity: 'dining alone by the stove' },
      ],
      homeLocationId: 'company_post',
      knowledgeScope: ['the_company', 'the_road', 'the_bounty', 'the_caravan', 'the_south'],
      startingRelationship: { trust: 30, affection: 5, respect: 20, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'kell_names_the_price',
          label: 'He tells you what you are worth to the Company',
          kind: 'OTHER',
          requires: { trust: 20 },
        },
        {
          id: 'kell_opens_the_ledger',
          label: 'He lets you see the last page of the ledger',
          kind: 'TRUST',
          requires: { trust: 60 },
        },
      ],
      attributes: { might: 8, agility: 9, mind: 15, presence: 14, resolve: 12, arcana: 5 },
      companion: null,
      scouting: null,
      combatant: { health: 30, defenseDc: 12, damage: 4, tags: ['southerner', 'company'] },
    },
  ],
  quests: [
    {
      id: 'q_the_guest_claim',
      title: 'Whose Guest',
      summary:
        'Three brothers each claim a part in saving you and the eldest claims nothing, their mother is at the tent flap, and a stranger with no host goes back into the snow. Name somebody, or find another way through.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['varek', 'sil', 'ronan', 'tam', 'aud'],
      involvedLocationIds: ['the_warm_tent', 'the_long_fire'],
      knownRewardCopy: 'A host who answers for you, a red cord on your wrist, and a place at somebody’s fire.',
      steps: [
        {
          id: 'name_a_host',
          playerCopy: 'Name the brother you trust before the clan mother asks.',
          directorNotes:
            'Every route here is a real answer and none of them is wrong. Each brother reacts to being chosen or passed over in his own way: Varek is startled and does not show it, Sil says "Hm" and means it, Ronan crows, Tam goes pink. Refusing to choose makes the player Aud’s own guest, the hardest host in camp. Running ends with Ronan catching the player at the treeline, because he is fastest, and by custom whoever catches a runner keeps them. Fighting makes the player Aud’s guest too, with Suspicion to match.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'host_varek',
              label: 'Name Varek, who claimed nothing',
              predicate: { flagsSet: ['spoke:varek'], minRelationship: [{ characterId: 'varek', dimension: 'trust', value: 30 }] },
              setsFlags: ['has_a_host', 'host:varek'],
              closesFlags: ['host:sil', 'host:ronan', 'host:tam', 'host:aud'],
            },
            {
              routeId: 'host_sil',
              label: 'Name Sil, who kept you breathing',
              predicate: { flagsSet: ['spoke:sil'], minRelationship: [{ characterId: 'sil', dimension: 'trust', value: 35 }] },
              setsFlags: ['has_a_host', 'host:sil'],
              closesFlags: ['host:varek', 'host:ronan', 'host:tam', 'host:aud'],
            },
            {
              routeId: 'host_ronan',
              label: 'Name Ronan, who found you in the snow',
              predicate: { flagsSet: ['spoke:ronan'], minRelationship: [{ characterId: 'ronan', dimension: 'affection', value: 35 }] },
              setsFlags: ['has_a_host', 'host:ronan'],
              closesFlags: ['host:varek', 'host:sil', 'host:tam', 'host:aud'],
            },
            {
              routeId: 'host_tam',
              label: 'Name Tam, who carried you',
              predicate: { flagsSet: ['spoke:tam'], minRelationship: [{ characterId: 'tam', dimension: 'trust', value: 40 }] },
              setsFlags: ['has_a_host', 'host:tam'],
              closesFlags: ['host:varek', 'host:sil', 'host:ronan', 'host:aud'],
            },
            {
              routeId: 'spoke_for_yourself',
              label: 'Refuse to choose, and speak for yourself',
              predicate: { flagsSet: ['used:stand_your_ground'] },
              setsFlags: ['has_a_host', 'host:aud', 'spoke_for_yourself'],
              closesFlags: ['host:varek', 'host:sil', 'host:ronan', 'host:tam'],
            },
            {
              routeId: 'ran_for_it',
              label: 'Run for the tent flap',
              predicate: { flagsSet: ['used:slip_away'] },
              setsFlags: ['has_a_host', 'host:ronan', 'ran_from_the_tent'],
              closesFlags: ['host:varek', 'host:sil', 'host:tam', 'host:aud'],
            },
            {
              routeId: 'fought_your_way',
              label: 'Fight your way out',
              predicate: { flagsSet: ['used:fight'] },
              setsFlags: ['has_a_host', 'host:aud', 'drew_on_the_clan'],
              closesFlags: ['host:varek', 'host:sil', 'host:ronan', 'host:tam'],
            },
          ],
          rewards: {
            xp: 40,
            items: [{ itemId: 'guest_cord', qty: 1 }],
            flags: ['claim_settled'],
            abilities: ['invoke_guest_right', 'follow_the_white_tracks'],
            reputation: [{ factionId: 'faction_greyhowe', amount: 5 }],
          },
        },
        {
          id: 'the_first_night',
          playerCopy: 'Get through your first night in a camp that has not decided about you.',
          directorNotes:
            'Supper at the long fire, the guest-curtain, the first cold morning. The camp is watching and the player can feel it. Nothing forces itself on the player: working, talking, lying, flirting and watching are all legitimate ways through, and each one is noticed by somebody different.',
          enterWhen: { flagsSet: ['claim_settled'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'pulled_your_weight',
              label: 'Work for your supper',
              predicate: { flagsSet: ['used:earn_your_keep'] },
              setsFlags: ['pulled_your_weight'],
              closesFlags: [],
            },
            {
              routeId: 'told_the_truth',
              label: 'Tell them who you are and why you came',
              predicate: { flagsSet: ['used:speak_plainly'] },
              setsFlags: ['told_the_truth'],
              closesFlags: ['kept_your_cover'],
            },
            {
              routeId: 'kept_your_cover',
              label: 'Keep your story to yourself',
              predicate: { flagsSet: ['used:bluff'] },
              setsFlags: ['kept_your_cover'],
              closesFlags: ['told_the_truth'],
            },
            {
              routeId: 'stayed_close',
              label: 'Stay close to your host',
              predicate: { flagsSet: ['used:let_him_close'] },
              setsFlags: ['close_to_your_host'],
              closesFlags: [],
            },
            {
              routeId: 'searched_the_camp',
              label: 'Watch the camp while it watches you',
              predicate: { flagsSet: ['used:read_them'] },
              setsFlags: ['searched_the_camp'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 60,
            items: [],
            flags: ['first_night_over'],
            abilities: [],
            reputation: [{ factionId: 'faction_greyhowe', amount: 5 }],
          },
        },
      ],
    },
    {
      id: 'q_the_factor',
      title: 'The Man With the Flour',
      summary:
        'A Company factor has come up to the boundary stones with twenty sacks of flour and a polite request to have you back. The clan mother will name your price at the midwinter fire.',
      kind: 'MAIN',
      involvedCharacterIds: ['aud', 'kell', 'sil', 'varek'],
      involvedLocationIds: ['the_boundary_stones', 'the_long_fire', 'company_post'],
      knownRewardCopy: 'Your price, said out loud, and one chance to change it.',
      discoverWhen: { flagsSet: ['first_night_over'] },
      steps: [
        {
          id: 'learn_the_offer',
          playerCopy: 'Find out what the Company wants with you.',
          directorNotes:
            'Three ways to learn it and they are not equivalent. Meeting Kell at the stones means he has seen the player’s face and priced it. Hearing it from Sil means Sil has admitted he goes down to the post. Listening at Aud’s lodge means the player knows something the clan mother did not choose to say, and she will smell it on them.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'met_kell',
              label: 'Go up to the boundary stones and hear him out',
              predicate: { atLocation: 'the_boundary_stones', flagsSet: ['spoke:kell'] },
              setsFlags: ['met_the_factor'],
              closesFlags: [],
            },
            {
              routeId: 'sil_told_you',
              label: 'Get it out of Sil, who has been down to the post',
              predicate: { minRelationship: [{ characterId: 'sil', dimension: 'trust', value: 50 }] },
              setsFlags: ['sil_told_you'],
              closesFlags: [],
            },
            {
              routeId: 'overheard_aud',
              label: 'Listen at the clan mother’s lodge',
              predicate: { atLocation: 'mothers_lodge', flagsSet: ['used:slip_away'] },
              setsFlags: ['overheard_aud'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 100,
            items: [],
            flags: ['bounty_on_the_table'],
            abilities: [],
            reputation: [{ factionId: 'faction_company', amount: 10 }],
          },
        },
        {
          id: 'the_midwinter_fire',
          playerCopy: 'Be at the long fire when the clan mother names your price, and change it if you can.',
          directorNotes:
            'Aud stands, counts the winter out loud, and names the flour. This is a negotiation in public, not a trial. A host who stands up for the player spends his own standing to do it, and his brothers watch him spend it. Going with Kell is a choice rather than a defeat, and being traded is the honest result of nobody speaking: the clan eats because of it.',
          enterWhen: { flagsSet: ['bounty_on_the_table'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'host_stood_up',
              label: 'Have your host stand up for you',
              predicate: { flagsSet: ['has_a_host', 'used:invoke_guest_right'] },
              setsFlags: ['kept_by_the_clan', 'host_stood_up'],
              closesFlags: ['traded_to_the_company'],
            },
            {
              routeId: 'earned_it',
              label: 'Prove you are worth more than flour',
              predicate: {
                flagsSet: ['pulled_your_weight'],
                minFactionReputation: [{ factionId: 'faction_greyhowe', value: 30 }],
              },
              setsFlags: ['kept_by_the_clan', 'earned_your_place'],
              closesFlags: ['traded_to_the_company'],
            },
            {
              routeId: 'exposed_the_road',
              label: 'Tell the fire what the Company’s road is for',
              predicate: { flagsSet: ['knows:the_road'] },
              setsFlags: ['kept_by_the_clan', 'company_exposed'],
              closesFlags: ['traded_to_the_company'],
            },
            {
              routeId: 'went_with_kell',
              label: 'Go down the mountain with the factor of your own accord',
              predicate: {
                flagsSet: ['met_the_factor'],
                minFactionReputation: [{ factionId: 'faction_company', value: 30 }],
              },
              setsFlags: ['traded_to_the_company', 'chose_the_company'],
              closesFlags: ['kept_by_the_clan'],
            },
            {
              routeId: 'were_traded',
              label: 'Let the clan mother make the trade',
              predicate: { flagsSet: ['bounty_on_the_table', 'midwinter_fire_lit'] },
              setsFlags: ['traded_to_the_company'],
              closesFlags: ['kept_by_the_clan'],
            },
          ],
          rewards: {
            xp: 160,
            items: [],
            flags: ['midwinter_decided'],
            abilities: [],
            reputation: [{ factionId: 'faction_greyhowe', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_the_road',
      title: 'What the Survey Is For',
      summary:
        'Nobody sends a caravan over a closing pass for the trade. Somebody drew a line through the clan’s winter valley, and it was not the clan.',
      kind: 'SIDE',
      involvedCharacterIds: ['kell', 'sil', 'dagny'],
      involvedLocationIds: ['company_post', 'the_high_pass', 'the_boundary_stones'],
      knownRewardCopy: 'What the Company means to build here, in a form you can put in front of a fire.',
      discoverWhen: { flagsSet: ['bounty_on_the_table'] },
      steps: [
        {
          id: 'find_the_line',
          playerCopy: 'Find out what the Company means to build on this mountain.',
          directorNotes:
            'The answer is the same however the player finds it: a road through the winter valley and a garrison where the long fire is. What changes is what it cost to learn. Stealing the ledger is theft from the man holding the player’s contract. Breaking the courier’s seal is a broken promise. Sil telling it means Sil has confessed where his medicine comes from.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'read_the_ledger',
              label: 'Get a look at the factor’s ledger',
              predicate: { hasItems: ['company_ledger'] },
              setsFlags: ['knows:the_road', 'saw_the_ledger'],
              closesFlags: [],
            },
            {
              routeId: 'read_the_survey',
              label: 'Read the survey map properly',
              predicate: { hasItems: ['survey_map'], flagsSet: ['used:read_them'] },
              setsFlags: ['knows:the_road'],
              closesFlags: [],
            },
            {
              routeId: 'broke_the_seal',
              label: 'Break the seal on the letter you carried',
              predicate: { hasItems: ['sealed_letter'], flagsSet: ['used:read_them'] },
              setsFlags: ['knows:the_road', 'broke_the_seal'],
              closesFlags: [],
            },
            {
              routeId: 'sil_heard_it',
              label: 'Get Sil to tell you what the clerks say',
              predicate: { flagsSet: ['sil_told_you'], minRelationship: [{ characterId: 'sil', dimension: 'trust', value: 60 }] },
              setsFlags: ['knows:the_road'],
              closesFlags: [],
            },
            {
              routeId: 'compared_with_dagny',
              label: 'Compare notes with Dagny of the Cold Ridge',
              predicate: { minRelationship: [{ characterId: 'dagny', dimension: 'trust', value: 45 }] },
              setsFlags: ['knows:the_road', 'ridge_knows'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['road_known'],
            abilities: [],
            reputation: [
              { factionId: 'faction_greyhowe', amount: 10 },
              { factionId: 'faction_cold_ridge', amount: 15 },
            ],
          },
        },
      ],
    },
    {
      id: 'q_the_brothers',
      title: 'Four Brothers, One Guest',
      summary:
        'Three of them claim they saved you and the eldest claims nothing. Each has a reason to want you under his roof that he has not said out loud, and one is hiding something bigger than you are.',
      kind: 'MAIN',
      involvedCharacterIds: ['varek', 'sil', 'ronan', 'tam'],
      involvedLocationIds: ['the_sons_lodge', 'the_warm_tent', 'the_ice_lake', 'the_lookout'],
      knownRewardCopy: 'What the four of them actually want, and what you are to them by the time the snow comes.',
      discoverWhen: { flagsSet: ['first_night_over'] },
      steps: [
        {
          id: 'learn_them',
          playerCopy: 'Find out what each brother is not telling you.',
          directorNotes:
            'Each brother’s secret comes out a different way: Varek’s at the lookout when he is asked directly, Sil’s when the player is hurt or sick, Ronan’s on the ice as a boast, Tam’s only when he trusts the player completely. None of them volunteers it in front of the others.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'varek_told_you',
              label: 'Hear from Varek why he did not claim you',
              predicate: { flagsSet: ['spoke:varek'], minRelationship: [{ characterId: 'varek', dimension: 'trust', value: 55 }] },
              setsFlags: ['knows:the_lantern'],
              closesFlags: [],
            },
            {
              routeId: 'found_the_lantern',
              label: 'Find the lantern he kept',
              predicate: { hasItems: ['guide_lantern'] },
              setsFlags: ['knows:the_lantern', 'found_his_lantern'],
              closesFlags: [],
            },
            {
              routeId: 'sil_showed_you',
              label: 'See what Sil keeps under his herb shelves',
              predicate: { minRelationship: [{ characterId: 'sil', dimension: 'trust', value: 55 }] },
              setsFlags: ['knows:sils_medicine'],
              closesFlags: [],
            },
            {
              routeId: 'ronan_boasted',
              label: 'Get Ronan to tell you what he means to do at midwinter',
              predicate: { minRelationship: [{ characterId: 'ronan', dimension: 'respect', value: 45 }] },
              setsFlags: ['knows:ronans_challenge'],
              closesFlags: [],
            },
            {
              routeId: 'tam_trusted_you',
              label: 'Get Tam to say what you saw in the snow',
              predicate: { minRelationship: [{ characterId: 'tam', dimension: 'trust', value: 65 }] },
              setsFlags: ['knows:the_white_wolf'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['knows:the_brothers'],
            abilities: [],
            reputation: [{ factionId: 'faction_greyhowe', amount: 5 }],
          },
        },
        {
          id: 'the_hearth_choice',
          playerCopy: 'Decide what you are to the four of them before the pass closes.',
          directorNotes:
            'Not a contest with a correct winner. Choosing one brother costs the other three something, and each of them takes it in character. Choosing nobody is a real answer and the warmest one for the family. Playing them off against each other works and breaks something that does not mend by spring.',
          enterWhen: { flagsSet: ['knows:the_brothers'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'chose_varek',
              label: 'Choose Varek',
              predicate: { flagsSet: ['used:let_him_close'], minRelationship: [{ characterId: 'varek', dimension: 'affection', value: 70 }] },
              setsFlags: ['heart:varek'],
              closesFlags: ['heart:sil', 'heart:ronan', 'heart:tam', 'heart:nobody'],
            },
            {
              routeId: 'chose_sil',
              label: 'Choose Sil',
              predicate: { flagsSet: ['used:let_him_close'], minRelationship: [{ characterId: 'sil', dimension: 'affection', value: 70 }] },
              setsFlags: ['heart:sil'],
              closesFlags: ['heart:varek', 'heart:ronan', 'heart:tam', 'heart:nobody'],
            },
            {
              routeId: 'chose_ronan',
              label: 'Choose Ronan',
              predicate: { flagsSet: ['used:let_him_close'], minRelationship: [{ characterId: 'ronan', dimension: 'affection', value: 70 }] },
              setsFlags: ['heart:ronan'],
              closesFlags: ['heart:varek', 'heart:sil', 'heart:tam', 'heart:nobody'],
            },
            {
              routeId: 'chose_tam',
              label: 'Choose Tam',
              predicate: { flagsSet: ['used:let_him_close'], minRelationship: [{ characterId: 'tam', dimension: 'affection', value: 70 }] },
              setsFlags: ['heart:tam'],
              closesFlags: ['heart:varek', 'heart:sil', 'heart:ronan', 'heart:nobody'],
            },
            {
              routeId: 'chose_nobody',
              label: 'Stay everybody’s guest and nobody’s',
              predicate: { flagsSet: ['used:speak_plainly'] },
              setsFlags: ['heart:nobody'],
              closesFlags: ['heart:varek', 'heart:sil', 'heart:ronan', 'heart:tam'],
            },
            {
              routeId: 'set_them_at_each_other',
              label: 'Play them against each other',
              predicate: { flagsSet: ['used:play_them_off'] },
              setsFlags: ['brothers_broken'],
              closesFlags: ['heart:nobody'],
            },
          ],
          rewards: {
            xp: 180,
            items: [],
            flags: ['hearth_decided'],
            abilities: [],
            reputation: [{ factionId: 'faction_greyhowe', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_the_betrothal',
      title: 'Two Mothers’ Bargain',
      summary:
        'Varek is promised to the Cold Ridge heir at the midwinter fire, to hold the pass against the Company. Neither of them was asked, and both of them have noticed you.',
      kind: 'SIDE',
      involvedCharacterIds: ['varek', 'dagny', 'aud'],
      involvedLocationIds: ['the_long_fire', 'the_cold_ridge', 'mothers_lodge'],
      knownRewardCopy: 'A marriage made, unmade or traded for something better, and the Cold Ridge’s opinion of you.',
      discoverWhen: { flagsSet: ['dagny_arrived'] },
      steps: [
        {
          id: 'the_match',
          playerCopy: 'Decide whether the betrothal stands, and what replaces it if it does not.',
          directorNotes:
            'Dagny does not want Varek, Varek does not want Dagny, and both clans need the alliance. Unmaking the match without replacing what it buys leaves the pass weaker. Helping Dagny find another price keeps the alliance. Getting Varek to refuse it outright is a public act he has never once committed in his life.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'helped_dagny',
              label: 'Help Dagny find a price that is not a wedding',
              predicate: { flagsSet: ['spoke:dagny'], minRelationship: [{ characterId: 'dagny', dimension: 'trust', value: 45 }] },
              setsFlags: ['betrothal_undone', 'ridge_alliance_kept'],
              closesFlags: ['betrothal_stands'],
            },
            {
              routeId: 'varek_refused',
              label: 'Get Varek to refuse it at the fire',
              predicate: { flagsSet: ['spoke:varek'], minRelationship: [{ characterId: 'varek', dimension: 'trust', value: 65 }] },
              setsFlags: ['betrothal_undone'],
              closesFlags: ['betrothal_stands', 'ridge_alliance_kept'],
            },
            {
              routeId: 'let_it_stand',
              label: 'Leave it alone',
              predicate: { flagsSet: ['midwinter_decided'] },
              setsFlags: ['betrothal_stands'],
              closesFlags: ['betrothal_undone'],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['betrothal_settled'],
            abilities: [],
            reputation: [
              { factionId: 'faction_cold_ridge', amount: 20 },
              { factionId: 'faction_greyhowe', amount: 5 },
            ],
          },
        },
      ],
    },
    {
      id: 'q_the_white_wolf',
      title: 'What Walked Ahead of You',
      summary:
        'You remember something pale in the storm, walking ahead of you where the snow was shallowest. There is white fur caught in your coat, and nobody in camp will say the word wolf.',
      kind: 'LEAD',
      involvedCharacterIds: ['tam', 'varek', 'aud', 'kell'],
      involvedLocationIds: ['the_high_pass', 'the_old_den', 'the_warm_tent'],
      knownRewardCopy: 'What found you in the storm, and the choice of who else gets to know.',
      discoverWhen: { flagsSet: ['knows:the_white_wolf'] },
      steps: [
        {
          id: 'find_the_den',
          playerCopy: 'Follow the white tracks to where they end.',
          directorNotes:
            'This quest is optional and must feel like it. A player who never sets `knows:the_white_wolf` never sees a beat of it, and the guest story is the whole game. For a player who is here, keep it quiet and physical: prints, a cave, a folded blanket, a candle stub. If Tam takes the player, he goes in first to light the candle.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'tam_took_you',
              label: 'Ask Tam to show you',
              predicate: {
                flagsSet: ['used:follow_the_white_tracks'],
                minRelationship: [{ characterId: 'tam', dimension: 'trust', value: 70 }],
              },
              setsFlags: ['found_the_old_den', 'tam_showed_you'],
              closesFlags: [],
            },
            {
              routeId: 'tracked_it_alone',
              label: 'Follow the tracks past the guide-poles alone',
              predicate: { flagsSet: ['used:follow_the_white_tracks', 'visited:the_high_pass'] },
              setsFlags: ['found_the_old_den', 'went_alone'],
              closesFlags: ['tam_showed_you'],
            },
          ],
          rewards: {
            xp: 150,
            items: [{ itemId: 'bone_whistle', qty: 1 }],
            flags: ['den_found'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'who_gets_to_know',
          playerCopy: 'Decide who gets to know what Tam is.',
          directorNotes:
            'The bounty on the stone is real, and the player now knows exactly where to send it. Keeping the secret costs nothing visible. Telling Aud that you know takes a weight off her she has carried for six winters. Selling it to Kell is a betrayal the whole camp learns about by nightfall, and Tam escapes into the high snow either way: nobody is killed.',
          enterWhen: { flagsSet: ['den_found'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'kept_it',
              label: 'Keep his secret',
              predicate: { atLocation: 'the_old_den', minRelationship: [{ characterId: 'tam', dimension: 'trust', value: 70 }] },
              setsFlags: ['kept_tams_secret'],
              closesFlags: ['sold_the_wolf'],
            },
            {
              routeId: 'told_aud',
              label: 'Tell the clan mother you know, and that you will keep it',
              predicate: { flagsSet: ['spoke:aud'], minRelationship: [{ characterId: 'aud', dimension: 'trust', value: 30 }] },
              setsFlags: ['kept_tams_secret', 'aud_knows_you_know'],
              closesFlags: ['sold_the_wolf'],
            },
            {
              routeId: 'sold_it',
              label: 'Tell the factor where the white wolf sleeps',
              predicate: { atLocation: 'company_post', flagsSet: ['met_the_factor', 'spoke:kell'] },
              setsFlags: ['sold_the_wolf'],
              closesFlags: ['kept_tams_secret'],
            },
          ],
          rewards: {
            xp: 180,
            items: [],
            flags: ['wolf_answered'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_the_pass_closes',
      title: 'Before the Pass Closes',
      summary:
        'At dusk on the fourth day the snow shuts the high pass until spring. Whichever side of it you are on then is where you spend the winter.',
      kind: 'MAIN',
      involvedCharacterIds: ['varek', 'ronan', 'sil', 'tam', 'aud', 'kell'],
      involvedLocationIds: ['the_high_pass', 'the_boundary_stones', 'the_long_fire'],
      knownRewardCopy: 'A winter, on one side of the mountain or the other, and whoever is with you for it.',
      discoverWhen: { flagsSet: ['midwinter_decided'] },
      steps: [
        {
          id: 'leave_or_stay',
          playerCopy: 'Choose which side of the pass you wake up on when the snow shuts it.',
          directorNotes:
            'Staying needs the clan to have kept the player. Going needs the player at the boundary stones before dusk on the fourth day, and a host will walk them as far as the stones and not one step past. Taking a brother south is the biggest thing either of them has ever done, and the family is in the scene. If nobody decides, the snow does, and the player is wintering here whether or not anybody arranged it.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'stayed',
              label: 'Stay the winter at the long fire',
              predicate: {
                flagsSet: ['kept_by_the_clan'],
                minFactionReputation: [{ factionId: 'faction_greyhowe', value: 40 }],
              },
              setsFlags: ['stayed_the_winter'],
              closesFlags: ['went_south'],
            },
            {
              routeId: 'took_him_south',
              label: 'Go south, and take the brother you chose with you',
              predicate: {
                flagsSet: ['hearth_decided'],
                flagsUnset: ['heart:nobody', 'brothers_broken'],
                atLocation: 'the_boundary_stones',
                beforeWorldMinute: 3 * 1440 + 16 * 60,
              },
              setsFlags: ['went_south', 'he_came_too'],
              closesFlags: ['stayed_the_winter'],
            },
            {
              routeId: 'went_south_guided',
              label: 'Go south with your host as guide to the stones',
              predicate: {
                flagsSet: ['has_a_host'],
                atLocation: 'the_boundary_stones',
                beforeWorldMinute: 3 * 1440 + 16 * 60,
              },
              setsFlags: ['went_south'],
              closesFlags: ['stayed_the_winter'],
            },
            {
              routeId: 'with_the_company',
              label: 'Go down with the Company',
              predicate: { flagsSet: ['traded_to_the_company'] },
              setsFlags: ['went_south', 'with_the_company'],
              closesFlags: ['stayed_the_winter'],
            },
            {
              routeId: 'snowed_in',
              label: 'Let the snow decide',
              predicate: { flagsSet: ['pass_shut'] },
              setsFlags: ['stayed_the_winter', 'snowed_in'],
              closesFlags: ['went_south'],
            },
          ],
          rewards: {
            xp: 200,
            items: [],
            flags: ['pass_decided'],
            abilities: [],
            reputation: [{ factionId: 'faction_greyhowe', amount: 10 }],
          },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_aud_at_the_flap',
      atWorldMinute: 7 * 60 + 52,
      locationId: 'the_warm_tent',
      publicCopy:
        'The tent flap goes back. A small grey-haired woman with a knotted cord at her belt ducks in out of the snow, looks at her four sons, then at you. "Well," says Clan Mother Aud. "Whose?"',
      directorNotes:
        'She arrives whether or not a host has been named. If one has, she makes that brother say it again in front of her and watches the other three while he does. If not, she asks the player directly, and a refusal makes the player her own guest: the hardest host in camp.',
      setsFlags: ['aud_has_seen_you'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'aud', toLocationId: 'the_warm_tent' }],
    },
    {
      id: 'we_supper_at_the_fire',
      atWorldMinute: 18 * 60 + 30,
      locationId: 'the_long_fire',
      publicCopy:
        'Supper at the long fire. Forty wolf-kin on log benches, one pot of fish stew, and every ear in camp turning to see which bench the stranger sits on.',
      directorNotes:
        'The guest sits with the host, by custom. Every other seating is a statement and the camp reads it as one. Ronan will try to swap places at least once. Aud serves the guest herself and watches how much they take.',
      setsFlags: ['ate_with_the_clan'],
      cancelledByFlags: [],
      requiresFlags: ['claim_settled'],
      movesCharacters: [],
    },
    {
      id: 'we_white_tracks',
      atWorldMinute: 1440 + 6 * 60 + 30,
      locationId: 'the_warm_tent',
      publicCopy:
        'In the new snow outside the warm tent there is a ring of tracks, each print wider than your spread hand, circling the tent once and heading up toward the pass.',
      directorNotes:
        'Only for a player who spent the first night watching. Tam sees the player see it and goes red to the tips of his ears. Do not explain it, and do not let any brother say the word wolf.',
      setsFlags: ['knows:the_white_wolf'],
      cancelledByFlags: [],
      requiresFlags: ['searched_the_camp'],
      movesCharacters: [],
    },
    {
      id: 'we_the_factor_arrives',
      atWorldMinute: 1440 + 11 * 60,
      locationId: 'the_boundary_stones',
      publicCopy:
        'A Company sled comes up the south road to the boundary stones: four hired men, twenty sacks of flour under oilcloth, and a man in fogged spectacles who asks very politely to speak to the clan mother about a lost traveller.',
      directorNotes:
        'Word reaches the long fire inside the hour. Kell will not step inside the ring of stones and will not stay above them after dark. Aud sends Varek to hear him, and Varek comes back with even fewer words than usual.',
      setsFlags: ['the_factor_has_come'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'kell', toLocationId: 'the_boundary_stones' }],
    },
    {
      id: 'we_the_notice',
      atWorldMinute: 1440 + 15 * 60,
      locationId: 'the_boundary_stones',
      publicCopy:
        'A notice nailed to the tallest boundary stone, in good southern ink: a reward for a white wolf seen on the high pass. Alive, a fortune. As a pelt, half of one.',
      directorNotes:
        'Only for a player who went up to meet Kell. Whoever is with them goes very still. If Tam is there, he finds a reason to leave, and his ears give him away.',
      setsFlags: ['knows:the_white_wolf'],
      cancelledByFlags: [],
      requiresFlags: ['met_the_factor'],
      movesCharacters: [],
    },
    {
      id: 'we_dagny_arrives',
      atWorldMinute: 1440 + 17 * 60,
      locationId: 'the_long_fire',
      publicCopy:
        'A party from the Cold Ridge arrives at the long fire with gifts of dried meat, and at the head of it a tall woman with black-tipped ears, who sits down in the clan mother’s seat before anybody can stop her.',
      directorNotes:
        'Dagny is here for the midwinter betrothal and makes no secret of how she feels about it. She finds the guest interesting within ten minutes and says so to Varek’s face. Ronan has not had this much fun all week.',
      setsFlags: ['dagny_arrived'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'dagny', toLocationId: 'the_long_fire' }],
    },
    {
      id: 'we_the_midwinter_fire',
      atWorldMinute: 2 * 1440 + 19 * 60,
      locationId: 'the_long_fire',
      publicCopy:
        'The midwinter fire. The whole clan, the Cold Ridge guests, the trench fire built twice its usual height, and the clan mother standing up to say what the winter will cost and who is going to pay it.',
      directorNotes:
        'Aud counts the stores aloud for the first time in living memory, then names the factor’s offer for the guest. The host is expected to answer. This is also where the betrothal is meant to be sealed. Everything the player has done in camp is legible to this crowd, and somebody will say so.',
      setsFlags: ['midwinter_fire_lit'],
      cancelledByFlags: ['left_the_map'],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'aud', toLocationId: 'the_long_fire' },
        { characterId: 'varek', toLocationId: 'the_long_fire' },
        { characterId: 'sil', toLocationId: 'the_long_fire' },
        { characterId: 'ronan', toLocationId: 'the_long_fire' },
        { characterId: 'tam', toLocationId: 'the_long_fire' },
        { characterId: 'dagny', toLocationId: 'the_long_fire' },
      ],
    },
    {
      id: 'we_ronan_stands',
      atWorldMinute: 2 * 1440 + 20 * 60 + 30,
      locationId: 'the_long_fire',
      publicCopy: 'Ronan stands up at the midwinter fire, in the old form, and says his brother’s name.',
      directorNotes:
        'A challenge to speak for the hunters, settled by wrestling to the ground inside a ring of the clan, never with blades. Varek does not want to fight and will. The player can be part of this or not, but the whole fire looks at the guest the moment Ronan stands. If the player chose Ronan, he never stands: he no longer needs to.',
      setsFlags: ['ronan_challenged'],
      cancelledByFlags: ['heart:ronan', 'left_the_map'],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_company_hunters',
      atWorldMinute: 3 * 1440 + 6 * 60,
      locationId: 'the_high_pass',
      publicCopy: 'Before dawn, six Company hunters with nets and dogs go up past the boundary stones toward the eastern rocks.',
      directorNotes:
        'Only after the player sold the wolf. Tam is already gone into the high snow; somebody warned him, or he smelled them coming. The hunters come back with empty nets. The camp knows who sent them before the sun is up.',
      setsFlags: ['hunters_on_the_pass'],
      cancelledByFlags: [],
      requiresFlags: ['sold_the_wolf'],
      movesCharacters: [],
    },
    {
      id: 'we_the_pass_closes',
      atWorldMinute: 3 * 1440 + 16 * 60,
      locationId: 'the_high_pass',
      publicCopy:
        'The wind turns. By dusk the guide-poles on the high pass are gone under new snow, and nobody will cross it again until the thaw.',
      directorNotes:
        'Whatever was undecided is decided now. If the player is still on the clan’s side, they winter here. If they made it to the stones in time, they are on the south road with whoever came with them. Nobody pretends otherwise.',
      setsFlags: ['pass_shut'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
  ],
  promises: [
    {
      id: 'p_which_side',
      kind: 'FINALE',
      label: 'Which side of the pass you are on when the snow shuts it',
      seedHint: 'Guide-poles on the high pass, already half buried, and Varek counting nights.',
      payoffHint: 'Dusk on the fourth day: you are at the long fire or on the south road, and somebody watched you choose.',
      weight: 1,
    },
    {
      id: 'p_four_brothers',
      kind: 'RELATIONSHIP',
      label: 'Which brother you trust, and what that costs the other three',
      seedHint: 'Three brothers arguing over which of them saved you, and the eldest naming everybody’s part but his own.',
      payoffHint: 'A host who stands up at the midwinter fire, a brother who comes south, or four brothers who never quite forgive each other.',
      weight: 0.95,
    },
    {
      id: 'p_the_lantern',
      kind: 'MYSTERY',
      label: 'Why the eldest did not claim you',
      seedHint: 'Varek is the only brother who claims no part in saving you.',
      payoffHint: 'He saw your lantern two nights before anybody found you, and waited to see who followed.',
      weight: 0.8,
    },
    {
      id: 'p_the_company',
      kind: 'RIVAL',
      label: 'What the Company actually wants on this mountain',
      seedHint: 'Flour sacks on a sled at the boundary stones, and a polite man who will not step inside the ring.',
      payoffHint: 'A road through the winter valley, a garrison where the long fire is, and a bounty on the white wolf.',
      weight: 0.75,
    },
    {
      id: 'p_the_white_wolf',
      kind: 'THEME',
      label: 'What walked ahead of you in the storm',
      seedHint: 'A tuft of white fur caught in the clasp of your coat, still faintly warm.',
      payoffHint: 'Tam, in the old shape, and a dry cave above the pass where he goes when the deep cold calls it out of him.',
      weight: 0.5,
    },
  ],
  archetypes: [
    {
      id: 'arch_mapmaker',
      name: 'You Draw Maps',
      role: 'Scout and surveyor',
      summary:
        'The Company paid you to map the mountain pass. That makes you the most useful stranger the clan has ever found, and the one with the most to explain.',
      playstyle: ['Observant', 'Careful', 'Has a secret'],
      blurb: 'You can still see the shape of the pass with your eyes shut, because you counted every guide-pole on it yourself.',
      attributeBonus: { mind: 3, agility: 1 },
      skillProficiencies: { notice: 3, stealth: 1, lore: 1 },
      startingItems: [{ itemId: 'survey_map', qty: 1 }],
      startingAbilities: ['read_them', 'slip_away'],
      startingReputation: [{ factionId: 'faction_company', amount: 10 }],
    },
    {
      id: 'arch_healer',
      name: 'You Heal People',
      role: 'Healer and medicine',
      summary:
        'You came north for a winter root that grows nowhere else, and a camp with one healer and a cough going round has a use for you on day one.',
      playstyle: ['Useful', 'Gentle', 'Busy hands'],
      blurb: 'You have sat up with fevers in three countries and you have never once been able to walk past somebody coughing.',
      attributeBonus: { mind: 2, resolve: 2 },
      skillProficiencies: { healing: 3, candour: 1, notice: 1 },
      startingItems: [{ itemId: 'herb_satchel', qty: 1 }],
      startingAbilities: ['tend_wounds', 'speak_plainly'],
      startingReputation: [{ factionId: 'faction_greyhowe', amount: 10 }],
    },
    {
      id: 'arch_courier',
      name: 'You Carry Letters',
      role: 'Talk, nerve and bargaining',
      summary:
        'You were paid to carry a sealed letter over the pass to the clan mother, and you have not read it. Nobody here is going to believe that.',
      playstyle: ['Talks well', 'Bold', 'Reads a room'],
      blurb: 'Nine years of knocking on doors that did not want to open has made you very good at first sentences and very bad at going home.',
      attributeBonus: { presence: 3, resolve: 1 },
      skillProficiencies: { guile: 3, candour: 1, nerve: 1 },
      startingItems: [{ itemId: 'sealed_letter', qty: 1 }],
      startingAbilities: ['bluff', 'stand_your_ground'],
      startingReputation: [],
    },
    {
      id: 'arch_guard',
      name: 'You Guard Caravans',
      role: 'Sword and endurance',
      summary:
        'You were hired to keep the caravan safe and you lost it in a storm, so you have a sword, a bad conscience and a professional opinion about wolves.',
      playstyle: ['Tough', 'Direct', 'Fights well'],
      blurb: 'You have walked the south road eleven times and the high pass twice, and the second time is the one you will be explaining for the rest of your life.',
      attributeBonus: { might: 3, resolve: 1 },
      skillProficiencies: { brawl: 3, labour: 1, nerve: 1 },
      startingItems: [{ itemId: 'caravan_sword', qty: 1 }],
      startingAbilities: ['earn_your_keep', 'fight'],
      startingReputation: [],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What do the brothers call you?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Elin Marsh' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. she/her' },
    {
      id: 'archetype',
      label: 'Why did you come north?',
      helpText:
        'The work that brought you over the pass, which sets what you are good at and what you were carrying. The Company is the southern trading house that hired your caravan. You keep it for the whole story. It does not decide which brother you trust, whether you stay the winter or whose side you end up on: all of that is yours, and none of it is decided here.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'What is true about you that the cold did not change?',
      helpText: 'One plain sentence is the right amount. The clan will find out the rest the way people do.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. I have never once admitted I was lost, including now.',
    },
    {
      id: 'first_instinct',
      label: 'Who do you lean toward when you wake?',
      helpText: 'A first impression, not a commitment. You can choose the exact opposite in the tent and the story will keep up.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'the_quiet_one', label: 'The one who did not claim me' },
        { id: 'the_healer', label: 'The one who kept me alive' },
        { id: 'the_bold_one', label: 'The one who found me' },
        { id: 'the_kind_one', label: 'The one who carried me' },
        { id: 'nobody', label: 'Nobody, yet' },
      ],
    },
    {
      id: 'appearance',
      label: 'What do four wolf-kin see when you sit up?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. Southern clothes ruined by the storm, hair full of snow, and a glare that has not warmed up yet.',
    },
  ],
  /**
   * Where this can end up.
   *
   * Every brother has an ending, and so does nobody. Four of the twelve are the
   * guest not staying, and none of those is written as a punishment: being
   * traded for flour is reachable by doing nothing at the midwinter fire, which
   * is the honest result of nobody speaking up, and walking out alone is
   * available early. Only two endings need the optional white wolf.
   */
  endings: [
    {
      id: 'end_guest_until_spring',
      name: 'A Guest Until Spring',
      rarity: 'COMMON',
      minTurn: 26,
      requires: {
        flagsSet: ['stayed_the_winter'],
        flagsUnset: ['heart:varek', 'heart:sil', 'heart:ronan', 'heart:tam', 'brothers_broken'],
      },
      condition:
        'The player stayed the winter as a guest and did not choose any one brother. Play it as the warm ending: work, meals at the long fire, four brothers still competing over who brings the better fish and pretending they are not. Nothing between the player and any of them is settled, and that is both the joke and the comfort. Do not pair anybody off in the last scene.',
      epilogue:
        'The pass stays shut for four months. Ronan loses forty-one fishing bets and pays none of them. Sil teaches the guest the name of every root in the stores. Varek makes room at the lookout without being asked, and the cloak is never asked back. In spring the pass opens and nobody brings it up.',
      hint: '',
    },
    {
      id: 'end_the_eldests_hearth',
      name: 'The Eldest’s Hearth',
      rarity: 'RARE',
      minTurn: 34,
      requires: {
        flagsSet: ['heart:varek', 'stayed_the_winter', 'betrothal_undone'],
        minRelationship: [{ characterId: 'varek', dimension: 'affection', value: 75 }],
      },
      condition:
        'Varek refused the match his mother made, the player chose him, and the player is staying. Write it quietly: he is a man of very few words and the ending should be too. What matters is that he stopped waiting for permission, and that the first thing he did with that was tell the truth about the lantern.',
      epilogue:
        'He gives the lantern back with new glass in it. The clan mother takes three days to forgive him for the Cold Ridge and one to forgive the guest. When the pass opens he walks the guide-poles with somebody beside him, and for the first time in his life he does not count the nights.',
      hint: 'He named everybody’s part but his own.',
    },
    {
      id: 'end_the_healers_road',
      name: 'The Healer’s Road',
      rarity: 'RARE',
      minTurn: 34,
      requires: {
        flagsSet: ['heart:sil', 'he_came_too'],
        minRelationship: [{ characterId: 'sil', dimension: 'affection', value: 72 }],
      },
      condition:
        'Sil came south with the player before the pass closed, to learn what the southern physicians know, and the clan let him go. This is the one romance that leaves the mountain. Write the leaving honestly: his mother at the stones, the medicine chest he finally stops hiding, and how strange a southern town is to somebody with wolf ears.',
      epilogue:
        'The first southern physician who sees him laughs at his ears and then watches him set a broken wrist in under a minute. He writes home every month and the letters wait at the post until thaw. He is dry about everything except the guest, and even there he tries.',
      hint: '',
    },
    {
      id: 'end_standing_at_the_fire',
      name: 'Standing at the Fire',
      rarity: 'RARE',
      minTurn: 34,
      requires: {
        flagsSet: ['heart:ronan', 'stayed_the_winter'],
        minRelationship: [{ characterId: 'ronan', dimension: 'affection', value: 75 }],
      },
      condition:
        'The player chose Ronan, and he never needed to stand up at the midwinter fire after all. Write him loud everywhere except with the player, where he has gone surprisingly quiet. The ending is about a man who thought fun was all he had, finding out somebody wanted the rest of him too.',
      epilogue:
        'He still loses every bet on purpose, still cheats at fishing, and still tells the rescue story at every fire while the guest corrects the details. At the thaw Varek asks him to lead the spring hunt. He says yes before Varek finishes the sentence, then looks round to see who saw.',
      hint: '',
    },
    {
      id: 'end_three_miles',
      name: 'Three Miles',
      rarity: 'RARE',
      minTurn: 34,
      requires: {
        flagsSet: ['heart:tam'],
        flagsUnset: ['sold_the_wolf'],
        minRelationship: [{ characterId: 'tam', dimension: 'affection', value: 75 }],
      },
      condition:
        'The player chose Tam, on whichever side of the pass they ended up. If the player knows what he is, the ending is about being the one person who is not afraid of it. If the player never found out, he tells them in the last scene, badly and all at once, and they decide together what that means.',
      epilogue:
        'He keeps his ears under a hat for the first week of anything new, and then stops bothering. Every winter, on the first night of deep cold, he goes up to the den, and every winter somebody sits up by the fire until he comes back with snow in his hair, apologising.',
      hint: 'He says he only carried you.',
    },
    {
      id: 'end_snow_led',
      name: 'Snow-Led',
      rarity: 'UNIQUE',
      minTurn: 40,
      requires: {
        flagsSet: ['kept_tams_secret', 'stayed_the_winter', 'wolf_answered'],
        minFactionReputation: [{ factionId: 'faction_greyhowe', value: 55 }],
      },
      condition:
        'By the oldest story the clan has, a stranger led out of the storm by the white wolf is kin rather than guest. The player knows what led them, kept the secret, and earned the clan’s trust the slow way, and the clan mother cuts the red cord at the long fire. Write it as a family ceremony, plain and a little embarrassing for everybody.',
      epilogue:
        'The red cord comes off and a grey one goes on, which means nothing outside these mountains and everything inside them. The flour runs short in the last month before thaw, as Aud always knew it would, and the clan gets through it the way it always has: one more pair of hands on the nets.',
      hint: 'Something pale walked ahead of you.',
    },
    {
      id: 'end_no_road',
      name: 'No Road Through the Valley',
      rarity: 'RARE',
      minTurn: 36,
      requires: {
        flagsSet: ['company_exposed', 'road_known', 'kept_by_the_clan'],
        minFactionReputation: [{ factionId: 'faction_cold_ridge', value: 25 }],
      },
      condition:
        'The player put the Company’s road in front of the midwinter fire, and both clans heard it. The two clans hold the pass together for the first time in a generation, and the factor goes down the mountain with his flour and without his road. Write the politics through people: two clan mothers arguing over one pot, and Kell courteous to the very end.',
      epilogue:
        'Kell sends a letter at the thaw, regretting everything in excellent handwriting. The Cold Ridge and the Greyhowe winter in the same valley for the first time anybody can remember. Nobody marries anybody to make it happen, which Dagny describes at length as the best outcome of her life.',
      hint: '',
    },
    {
      id: 'end_down_the_mountain',
      name: 'Down the Mountain',
      rarity: 'COMMON',
      minTurn: 22,
      requires: {
        flagsSet: ['went_south'],
        flagsUnset: ['he_came_too', 'with_the_company'],
      },
      condition:
        'The player went back over the pass before it closed, with a host as guide as far as the boundary stones and no further. Nobody is betrayed and nothing is solved. Write the parting practically: the cord cut, the cloak handed back or not, four figures on the ridge getting smaller, and the first southern building feeling much too warm.',
      epilogue:
        'The post smells of lamp oil and wet wool. Somebody asks where you have been and you find you cannot explain it in a way that sounds true. Some nights in the south you wake at the hour the clan’s horn used to sound, and listen, and there is nothing.',
      hint: '',
    },
    {
      id: 'end_returned_with_interest',
      name: 'Returned With Interest',
      rarity: 'UNCOMMON',
      minTurn: 22,
      requires: { flagsSet: ['traded_to_the_company'] },
      condition:
        'The clan traded the player to the Company for flour, or the player went down with the factor by choice. Do not write this as a disaster or as a victory. The clan eats this winter because of it, the factor is perfectly pleasant, and the player decides how much to tell him about what they saw up there.',
      epilogue:
        'Forty sacks of flour go up the mountain on the sled you came down on. Kell enters the transaction in a neat hand and offers you a clerkship. At the thaw a cloak arrives at the post with no note, and the clerk on duty swears the man who left it had pale silver ears.',
      hint: '',
    },
    {
      id: 'end_the_price_of_a_pelt',
      name: 'The Price of a Pelt',
      rarity: 'UNCOMMON',
      minTurn: 26,
      requires: { flagsSet: ['sold_the_wolf'] },
      condition:
        'The player told the Company where the white wolf sleeps. Tam gets away into the high snow, that much is not in doubt, and nobody is killed. What the player loses is the whole camp, which knows by nightfall. Write the cost precisely and without melodrama, and do not let the money feel like nothing.',
      epilogue:
        'The hunters come back down with empty nets. The Greyhowe move camp a week early, to a valley nobody from the south has ever mapped. Kell pays the finder’s fee in full anyway, because he keeps his bargains, and it is more money than you have ever held and buys nothing you want.',
      hint: '',
    },
    {
      id: 'end_four_tents',
      name: 'Four Tents',
      rarity: 'UNCOMMON',
      minTurn: 28,
      requires: { flagsSet: ['brothers_broken'] },
      condition:
        'The player set the brothers against each other and it worked. Nobody is hurt in a way that shows; the four of them simply stop sharing a lodge. Write it as a family coming apart over something that was never really about the player, though the player is the reason everybody gives. The player can still be kind in it.',
      epilogue:
        'By spring there are four hearths in four separate tents. Aud stops seating the long fire by family and starts seating it by work. It takes two winters and a bad fever for Sil to sit down next to Ronan again, and nobody ever mentions the guest to their faces.',
      hint: '',
    },
    {
      id: 'end_back_into_the_snow',
      name: 'Back Into the Snow',
      rarity: 'UNCOMMON',
      minTurn: 18,
      requires: { flagsSet: ['left_the_map'] },
      condition:
        'The player walked out of the camp alone, without a host’s blessing or a guide, into the mountains in winter. Do not make it a death and do not rescue them in the last line. It is a coherent thing to do after waking among strangers, and the person it costs most is whoever tied the cord on their wrist.',
      epilogue:
        'The host goes after them, as the law says a host must, and comes back two days later with frost in his hair and nothing he will talk about. The red cord turns up in the spring melt by the guide-poles. The clan tells the story at every midwinter fire afterwards, a little differently each time.',
      hint: '',
    },
  ],
  opening:
    '"I found the stranger."\n\n"I carried the stranger."\n\n"I kept the stranger breathing. That counts more."\n\nYou wake in a fur tent, warm for the first time in days. Four men with wolf ears are arguing over you.\n\nThen you move, and all four go silent.\n\nThe eldest kneels beside you, grey ears flat. "Easy. I’m Varek. Ronan found you." The redhead grins. "Tam carried you." The tall pale one goes pink. "Sil kept you alive." The one by the kettle shrugs.\n\nA horn sounds outside, low and close.\n\n"Our mother. She runs this clan. She’ll ask whose guest you are, and a stranger with no host goes back into the snow. Pick who you trust. Now."',
  openingPanel: {
    assetKey: 'story_the_wolf_clan_s_guest/opening',
    alt: 'Varek kneeling beside a fur bed in a firelit hide tent, grey wolf ears flat, one hand held out to you, while three wolf-eared brothers crowd behind him and snow blows past the open flap.',
  },
  openingSuggestions: [
    '"Varek. You’re the only one who didn’t claim me. I’ll trust you."',
    'I reach for Tam’s sleeve and hold on.',
    'I throw off the furs and make a run for the tent flap.',
  ],
  /**
   * Four brothers, because four is the card's promise, staged in depth so the
   * faces stay large: Varek in front (he speaks the opener and his portrait
   * leads), Ronan and Tam over his shoulders, Sil softer at the back. The
   * player is never drawn; the viewer is the guest they are all looking at.
   * Nobody is placed by age or birth order, only by costume and pose.
   */
  coverDirection: [
    'SUBJECT: four wolf-kin brothers crowded close around the viewer inside a firelit hide tent, the key visual for a cosy winter fantasy romance anime.',
    'The viewer is the stranger they have just carried in out of the snow, and all four of them are looking at the viewer.',
    'All four have wolf ears on top of their heads and long wolf tails, with entirely human faces and hands. Four clearly different hair colours: dark with a grey streak, rust-red, white-blond and black.',
    'FOREGROUND: Varek, centred and close from the chest up, holding about half the picture.',
    'Dark hair with a single streak of grey at the front, steady amber eyes, grey wolf ears laid flat, a heavy grey fur mantle over a dark brown wool hunting tunic, arms folded.',
    'His expression is calm, grave and unreadable, eyes straight at the viewer.',
    'BEHIND HIM, to the left, leaning in over his shoulder with a wide grin: Ronan, rust-red hair tied back badly, bright green eyes, rust-red wolf ears with a nick out of the left one,',
    'a red wool scarf over a scuffed brown leather hunting jacket, and a braided red cord dangling from two fingers like a prize he has just won.',
    'BEHIND HIM, to the right, a little shy: Tam, tall, messy white-blond hair, pale blue eyes, pale silver wolf ears with pink edges, a patched oatmeal wool tunic, holding a steaming wooden cup out toward the viewer in both hands.',
    'FURTHER BACK, in softer focus beside a kettle on the fire: Sil, short black hair, ink-dark eyes, charcoal wolf ears, a dark green wool tunic with the sleeves rolled to the elbow, a herb satchel strap across his chest, one eyebrow raised.',
    'THEIR FACES STAY CLEAN: no frost, snow, marks or shadows on any face.',
    'Every snowflake and every glint of frost stays on the furs, the tent flap and the title, never on their faces.',
    'SETTING, soft and secondary: the inside of a round hide tent on bent poles, bundles of drying bark hanging overhead, a low fire, and behind them the tent flap thrown open on blowing snow and a deep blue winter night.',
    'LIGHT: warm orange firelight on their faces from the front, cold blue snow light from the open flap behind, so they are lit in gold and rimmed in blue. The red cord is the one hard spot of red.',
    'TITLE: the story title "The Wolf Clan’s Guest" painted into the art across the upper third, above their heads, as a bold rustic serif logo in all capitals, cream-white letters with a dark charcoal outline and a thin crust of snow along the top edge of each letter.',
    'Set on two lines, THE WOLF CLAN’S smaller above and GUEST large below, spelled exactly THE WOLF CLAN’S GUEST with the apostrophe, large and legible at thumbnail size. No other text anywhere.',
  ].join(' '),
  publishedAt: null,
};

export const THE_WOLF_CLAN_S_GUEST = StoryVersion.parse(raw);
