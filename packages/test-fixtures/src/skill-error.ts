import { StoryVersion } from '@plotbreak/contracts';

/**
 * "Skill: ERROR" — an OP-skill isekai where the overpowered skill is the
 * thing everybody in the room is negotiating over.
 *
 * Bible: `docs/story-bibles/new50/07_SKILL_ERROR.md`. Pilot for the fifty-story
 * slate, so this file is also the template the other forty-nine copy.
 *
 * Playable span: four days in and around one palace, from the summoning at
 * noon on day 0 to the morning the sworn summoned march north on day 4. The
 * Audit on the third morning is the spine. Everything after the march lives in
 * the endings.
 *
 * The system has to live where the storyteller can read it. Production runs
 * `runTurnPure`, which reads the premise, tone guide, hard canon, cast,
 * opening, style examples, places, quest items, factions, quest summaries,
 * world events and endings. It never sees resources, step notes or the ability
 * list except the chosen archetype's starting abilities. So the status window
 * is a quest item the player starts holding, every archetype starts with the
 * skill's first stage, and the four stages are spelled out in hard canon.
 *
 * Growth by use is real, not narrated: each stage after Read is granted by a
 * step of `q_loading` whose every route requires having used the stage before
 * it. Grant broadly, gate by flag — `error:crash`, `error:rewrite`,
 * `error:full`.
 *
 * Three invisible variables. Stamina is the one honest GOOD_HIGH, because
 * `resolveRest` refills those. Suspicion comes first among the descending
 * pair on purpose: public violence raises the first GOOD_LOW in array order,
 * and violence in a palace makes the court suspicious before it makes static.
 * Overflow is the red static every use of the skill leaks.
 */

const raw = {
  id: 'sv_skill_error_1',
  storyId: 'story_skill_error',
  version: 1,
  title: 'Skill: ERROR',
  fantasyLabel: 'Your skill is too large to display.',
  hook: 'The goddess gave everyone on your bus a skill. Yours reads ERROR, and the court mage just went pale.',
  premise:
    'You were on the 7:42 bus to work, two seats behind your coworker Daichi, when the windows went white. A moment later thirty-one commuters were standing in the summoning hall of a royal palace in another world, each with a glowing blue status window in front of their face.\n\n' +
    'The king read the skills aloud. Daichi got Hero. Others got Saint and Sword Saint. Yours reads [ERROR: skill too large to display], and the court mage who drew the summoning circle went white when she saw it.\n\n' +
    'You find out fast why that matters. Everyone else knelt and swore an oath they were told was a welcome, and now a sworn summoned cannot refuse a royal order. Your skill throws out any line written into it. It also grows each time you use it: first it reads any window, then it makes other skills fail, then it rewrites them.\n\n' +
    'So the court wants it controlled. On the third morning the Church’s Inquisitor will put your hand on the Great Register and decide whether the skill is registered to the Crown, sealed with a hot iron, or left unwritten. Daichi wants you to keep your head down, because the king has promised to send the Hero home.\n\n' +
    'You have three days to keep the skill yours, or decide it should not be. Every use leaks red static that somebody will notice.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Isekai', 'High fantasy', 'OP skill', 'Comedy', 'Drama'],
  mechanicsChips: [
    'A skill that grows each time you use it',
    'Read anyone’s status window',
    'Nobody can make you swear',
    'An Audit on the third morning',
    'A way home, maybe',
  ],
  contentDescriptors: ['FANTASY_VIOLENCE', 'MORAL_AMBIGUITY', 'ROMANCE'],
  intensity: 'MODERATE',
  creatorNote:
    'Your skill is the most powerful thing in the kingdom and nobody, including you, knows what it is yet. You can spend three days hiding it, three days showing it off, or three days finding out what the court did to everybody else on your bus. The court is very polite. That is not the same as safe.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: true,
    allowsRomance: true,
    startingLocationId: 'summoning_hall',
    startWorldMinute: 11 * 60 + 50,
    startingItems: [
      { itemId: 'status_window', qty: 1 },
      { itemId: 'work_lanyard', qty: 1 },
    ],
    hardCanon: [
      'Everyone in this story is an adult. The player is twenty-four. Selene Varre is twenty-four, Princess Aurelia twenty-two, Daichi Ono twenty-seven, Inquisitor Hask forty-three and King Matthias fifty-two. The other summoned from the bus are all adults who were on their way to work.',
      'Thirty-one commuters from one city bus, the player and Daichi Ono among them, were summoned into the Summoning Hall of the palace of Ostmere at noon today. On the way through, a goddess gave each of them a class or a skill. Daichi got Hero. The player and Daichi work at the same logistics firm.',
      'Everyone in this world has a status window: a translucent blue panel with five lines, Name, Class, Level, Skill and Oath. You can open your own at will. Reading anyone else’s needs an appraisal skill or tool: Selene’s Mage’s Eye reads the five lines, and Hask’s Register Lens reads them and the rank. Neither can read hidden lines.',
      'Kneeling at the circle while the king presses the Oath Seal to your head writes an Oath line into a summoned person’s window: Sworn to the Crown of Ostmere, will not refuse a royal order. A sworn person’s body locks if they try to refuse a direct royal order or raise a hand against the royal family. The summoned were told it was a welcome. Twenty-nine of them and Daichi have sworn.',
      'The player’s skill line reads [ERROR: skill too large to display] with a counter beside it that starts at 3% loaded. It throws out any line written into the player’s window, the oath included. Every use loads more, and it unlocks in this order: Read (any window, every line, hidden ones included), then at about a quarter Crash (make one skill in sight fail), then past half Rewrite (change one line in a window), and at a hundred percent it shows its real name.',
      'Every use of the skill leaks red static into the world around the player: stuttering lamps, other people’s windows flickering open, nearby skills misfiring. Used hard and often, it starts to break things, the way a skill broke the palace’s east wing twenty-two years ago.',
      'The skill’s real name is [Summoner]. It is the authority that powers the summoning circle, and it opens the circle in either direction. The circle in the hall went dark when the player arrived, and the court cannot summon anyone again unless the skill is sealed, which hands the authority back to the circle.',
      'Twenty-two years ago a summoned man’s skill read ??? and overflowed in the palace’s east wing on his third day. Eleven people died, the queen among them, and the wing was plastered shut. That man is Inquisitor Hask, born Hasegawa Ren, and very few people know it.',
      'Princess Aurelia was born with no skill at all. The Great Register lists her as Blade, rank B, and Hask wrote that line.',
      'The tear in the sky over the northern pass, the Breach, is real. Grey beasts come through it, soldiers are dying, and the king needs the summoned there by the fourth morning.',
    ],
    toneGuide:
      'Isekai with the lights on: funny, fast and specific, with real stakes under it. The player is the most powerful person in the room and the least informed, and the comedy comes from an office worker applying office sense to a royal court — forms, meetings, the person who actually decides — while the court is polite in a way that is genuinely frightening. ' +
      'Status windows appear in the prose as short bracketed lines, never as tables, and only when somebody opens one. The skill never solves a scene for free: every use shows up as red static that somebody notices. ' +
      'The skill’s real name and Hask’s past are reveals the player earns through a window or a confession; never state them early. Nobody is a villain. The king is desperate, the Church is procedural, the princess is ambitious, Daichi is scared. The face at the top of a beat belongs to whoever reacted to the player most strongly.',
    proseStyle: 'webnovel',
    styleExamples: [
      "Selene takes your wrist and turns it, as if the window were printed on your skin.\n\n\"Eleven percent,\" she says. \"It was three at noon.\"\n\n[ERROR — 11% loaded]\n\nBehind her, every lamp in the corridor stutters once.\n\n\"You used it in the gallery.\"\n\n\"I looked at a guard.\"\n\n\"You read a guard.\" She lets go. \"Please stop reading the guards.\"",
      "Daichi’s window hangs in the air between you. Plain blue. Five lines.\n\nHe can see four of them.\n\n[Oath: Sworn to the Crown of Ostmere. Will not refuse a royal order.]\n\n\"So?\" he says. \"What’s it say? Am I level two yet?\"\n\nAcross the yard a knight calls his name, and Daichi is already walking toward him before he has finished saying \"wait\".",
    ],
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 9, agility: 10, mind: 12, presence: 11, resolve: 11, arcana: 14 },
  skills: [
    { id: 'smalltalk', name: 'Small Talk', attribute: 'presence', description: 'Keeping a conversation pleasant while you work out what it is actually about.' },
    { id: 'composure', name: 'Composure', attribute: 'resolve', description: 'Keeping your face still in a meeting that is going badly.' },
    { id: 'candour', name: 'Candour', attribute: 'resolve', description: 'Saying the true thing to somebody who outranks you, out loud.' },
    { id: 'fine_print', name: 'Fine Print', attribute: 'mind', description: 'Reading the rule, the oath, the clause somebody hoped you would skip.' },
    { id: 'insight', name: 'Noticing', attribute: 'mind', description: 'Working out who in the room actually decides.' },
    { id: 'slipping_out', name: 'Slipping Out', attribute: 'agility', description: 'Leaving a room without anybody marking the moment you went.' },
    { id: 'overtime', name: 'Overtime', attribute: 'might', description: 'Carrying on after your body has asked to stop.' },
    { id: 'control', name: 'Control', attribute: 'arcana', description: 'Keeping the skill to the size you meant, and the static to the room you are in.' },
  ],
  /**
   * Three, all invisible.
   *
   * Stamina is the only GOOD_HIGH, so resting restores the day and nothing
   * else. Suspicion and Overflow descend: Suspicion is how far the court has
   * moved from curiosity to force, Overflow is the red static. Every ERROR
   * ability costs Overflow; Crash, Rewrite and Slip Out cost Suspicion.
   */
  resources: [
    {
      id: 'stamina',
      name: 'Stamina',
      max: 100,
      start: 75,
      regenPerHour: 2,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'The player has been awake since a bus stop in another world. They sit down wherever they are, and whoever is nearest decides what happens next.',
      color: '#E9C46A',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Running on nothing. Answers come out short, jokes miss, and the court reads exhaustion as weakness or as menace depending on who is looking. This is the band where the player agrees to things to end a conversation, and where going to bed in the guest wing is the right move.',
        },
        {
          upTo: 60,
          behaviour:
            'The ordinary tiredness of a very long day. Fine for one more conversation and honest about not wanting two. It is a commuter’s body in a palace built for knights, and the stairs say so.',
        },
        {
          upTo: 100,
          behaviour:
            'Still running on the shock of arriving. Room to be curious, to walk down into the city, to argue properly with a king. Scenes can be long and go somewhere.',
        },
      ],
    },
    {
      id: 'suspicion',
      name: 'Suspicion',
      max: 100,
      start: 30,
      regenPerHour: -0.2,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'The court has decided the ERROR is a curiosity. Courtiers ask about it over dinner and nobody follows the player anywhere.',
      color: '#C0504D',
      bands: [
        {
          upTo: 20,
          behaviour:
            'The court treats the ERROR as a novelty. Courtiers ask about it at dinner, guards nod as the player passes, and the king is courteous and busy. Nobody is following anybody, and doors open when knocked on.',
        },
        {
          upTo: 50,
          behaviour:
            'The court is watching. A knight stands at the end of the guest-wing corridor and calls it an honour guard. Conversations stop when the player walks in. A Church clerk is writing down where the player goes and makes no effort to hide it.',
        },
        {
          upTo: 78,
          behaviour:
            'The court is preparing. Doors the player used yesterday are barred today. Knights walk two steps behind them, in pairs. The king speaks to them kindly and only through other people. Selene is told to keep her distance and does not.',
        },
        {
          upTo: 100,
          behaviour:
            'The court has decided the player is a danger to the realm. Knights are told to bring them to the Cathedral by force if they must, and the Audit is moved to today. Daichi is ordered to help, and the oath in his window means he cannot say no.',
        },
      ],
    },
    {
      id: 'overflow',
      name: 'Overflow',
      max: 100,
      start: 8,
      regenPerHour: -1.5,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence: 'The window is calm, blue and quiet. Only the counter moves.',
      color: '#E63946',
      bands: [
        {
          upTo: 20,
          behaviour:
            'The window flickers at the edges and nothing else happens. Only Selene and Hask could tell the skill had been used at all, and only if they were looking straight at the player.',
        },
        {
          upTo: 50,
          behaviour:
            'Red static leaks into the room after each use. Lamps stutter, other people’s status windows open by themselves for a second, and anyone standing close feels the hair on their arms lift. Anyone paying attention can tell where it came from.',
        },
        {
          upTo: 80,
          behaviour:
            'Skills misfire around the player. A knight’s sword technique fires on its own, a healer’s light goes out mid-spell, a lock opens that nobody touched. Hask’s lens can see the red from across the city, and the plaster over the east wing cracks a little more every hour.',
        },
        {
          upTo: 100,
          behaviour:
            'The world starts to break where the player stands, the way it did in the east wing twenty-two years ago. A stair is missing for one second in ten, a wall forgets to be solid, every window in the room goes red. Somebody is about to get hurt, and the whole palace knows whose static it is.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'status_window',
      name: 'Your Status Window',
      tags: ['quest', 'skill'],
      questItem: true,
      droppable: false,
      description:
        'A translucent blue panel, five lines tall, that opens in the air when you think about it. Name: yours. Class: none. Level: 1. Skill: [ERROR: skill too large to display], with a small counter beside it that started at 3% loaded. Oath: blank, and it stays blank.',
      loreText:
        'The counter climbs each time you use the skill. At first it can only read other people’s windows, every line, the hidden ones included. At about a quarter it can make a skill in front of you fail. Past half it can rewrite one line in a window. At a hundred percent it will show its real name. Every use leaks red static into the room around you.',
      icon: 'page',
    },
    {
      id: 'oath_seal',
      name: 'The Oath Seal',
      tags: ['quest', 'royal'],
      questItem: true,
      droppable: false,
      description:
        'The king’s signet: a heavy gold ring with a flat face engraved with a circle. Pressed to the head of a kneeling summoned at the circle, it writes the Oath line into their window.',
      loreText:
        'Without the seal no new oath can be written. The court calls it the welcome ring. The king has not taken it off since the summoning began, and turns it on his finger while he listens.',
      icon: 'ring',
    },
    {
      id: 'sealing_brand',
      name: 'The Sealing Brand',
      tags: ['quest', 'church'],
      questItem: true,
      description:
        'A short iron rod with a flat end the size of a coin, engraved with a closed circle. Heated and pressed to the back of a hand, it writes [SEALED] over a skill, for good.',
      loreText:
        'Hask carries it in a leather case inside his coat. The back of his own right hand has a scar the exact shape of its end, under the glove he never takes off.',
      icon: 'tool',
    },
    {
      id: 'return_sketch',
      name: 'Selene’s Return Circle',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'The summoning circle, drawn in ink on a folded sheet with every line reversed. One node at the centre is left empty and labelled, in Selene’s small hand, "authority — ?".',
      loreText:
        'The original is chalked on the underside of her worktable, where nobody looks. She has been working on it for a year. The Church would call it heresy, and so, a year ago, would she.',
      icon: 'map',
    },
    {
      id: 'register_lens',
      name: 'The Register Lens',
      tags: ['church', 'tool'],
      skillModifiers: { insight: 2 },
      description:
        'A round crystal lens on a silver chain. Held to the eye, it shows the five lines of anyone’s status window and the rank the Church has given their skill.',
      loreText: 'It cannot read hidden lines. Hask knows exactly what it cannot read, and has never once said so.',
      icon: 'shard',
    },
    {
      id: 'skill_scroll',
      name: 'The Reading Scroll',
      tags: ['document', 'royal'],
      description:
        'The long scroll the king read the skills from. Thirty-one lines, written by the circle itself as each of you arrived. Hero, Saint, Sword Saint, twenty-seven ordinary skills, and one line that is just a red smudge.',
      loreText: 'In the margin beside the red smudge, in Selene’s handwriting and scratched almost out: "transferred?"',
      icon: 'papers',
    },
    {
      id: 'work_lanyard',
      name: 'Your ID Lanyard',
      tags: ['personal'],
      description:
        'A blue lanyard and a laminated ID card with your photo, your name and the logo of the logistics firm you were riding to. In a city with no plastic, a card with your face sealed into it reads as a noble’s warrant.',
      loreText: 'Daichi is still wearing his. Neither of you has said why.',
      icon: 'card',
    },
    {
      id: 'business_cards',
      name: 'A Box of Business Cards',
      tags: ['personal'],
      description: 'Fifty cards with your name, your old job title and a phone number nobody in this world can call.',
      loreText: 'Courtiers take them as letters of introduction and keep them in their sleeves. One has already been framed.',
      icon: 'card',
    },
    {
      id: 'work_notebook',
      name: 'Your Work Notebook',
      tags: ['personal', 'document'],
      skillModifiers: { fine_print: 1 },
      description: 'A ruled notebook with last week’s meeting notes, a to-do list, and sixty blank pages, which in a palace where paper is expensive is a small fortune.',
      loreText: 'The last thing on the to-do list is "ask Daichi about Friday". You do not remember what Friday was.',
      icon: 'book',
    },
    {
      id: 'dead_phone',
      name: 'Your Phone',
      tags: ['personal'],
      description: 'Four percent battery and no signal. The torch, the camera and the calculator still work, which in this kingdom is three miracles.',
      loreText: 'The lock screen is still showing the time you left. It has not changed since the windows went white.',
      icon: 'phone',
    },
    {
      id: 'clear_umbrella',
      name: 'A Clear Plastic Umbrella',
      tags: ['personal'],
      description: 'From a convenience store, bought this morning in the rain. Nobody in this world has ever seen plastic, and the knights keep asking what it is made of.',
      loreText: 'It opens with a button. A guard drew his sword the first time it did.',
      icon: 'umbrella',
    },
    {
      id: 'guest_key',
      name: 'A Guest-Wing Key',
      tags: ['key'],
      description: 'An iron key on a ribbon, one of thirty-one handed out at the guest-wing door. It also opens the servants’ stair.',
      loreText: 'Nobody told the summoned about the servants’ stair. The key does not care.',
      icon: 'key',
    },
    {
      id: 'market_skewer',
      name: 'A Market Skewer',
      tags: ['food'],
      stackable: true,
      maxStack: 5,
      consumable: { resourceId: 'stamina', amount: 15, consumesItem: true },
      description: 'Grilled meat glazed with something sweet and peppery, on a wooden stick, from the stalls below the palace gate.',
      loreText: 'The vendor will not take your money and asks to touch your lanyard instead.',
      icon: 'food',
    },
    {
      id: 'practice_blade',
      name: 'A Practice Blade',
      tags: ['weapon'],
      equipSlot: 'hand',
      description: 'A blunt steel training sword from the rack in the knights’ yard. Heavier than it looks, and every summoned holds it wrong the first time.',
      loreText: 'The rack has thirty of them. Daichi has already broken two.',
      icon: 'sword',
    },
  ],
  abilities: [
    {
      id: 'say_it_plainly',
      name: 'Say It Plainly',
      tags: ['social'],
      description: 'Tell somebody who outranks you the true thing, without softening it, and take whatever comes back.',
      affordances: ['refuse', 'say no', 'tell the truth', 'say it plainly', 'refuse to kneel', 'tell him no', 'be honest', 'object', 'tell them'],
      costs: [{ resourceId: 'stamina', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'candour', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'play_the_part',
      name: 'Play the Part',
      tags: ['social'],
      description: 'Smile, bow, say the expected thing, and get through the meeting while you work out what it is really about.',
      affordances: ['kneel', 'bow', 'play along', 'smile and nod', 'flatter', 'bluff', 'pretend', 'act humble', 'swear the oath', 'lie'],
      costs: [{ resourceId: 'stamina', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'smalltalk', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'read_the_rules',
      name: 'Read the Fine Print',
      tags: ['utility'],
      description: 'Find the rule, the oath wording or the old law that everyone in the room is relying on nobody having read.',
      affordances: ['read the law', 'ask about the oath', 'check the rules', 'read the fine print', 'ask what kneeling does', 'look for a clause', 'read the notice', 'study the covenant'],
      costs: [{ resourceId: 'stamina', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'fine_print', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'size_them_up',
      name: 'Size Them Up',
      tags: ['sight'],
      description: 'Work out, the ordinary way, who in this room is in charge, who is frightened, and who is lying about which.',
      affordances: ['look around', 'watch them', 'study the room', 'read the room', 'notice', 'watch the king', 'take it in'],
      costs: [{ resourceId: 'stamina', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'insight', baseDc: 11 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'slip_away',
      name: 'Slip Out',
      tags: ['movement'],
      description: 'Leave the room, the wing or the palace without anybody marking the moment you went.',
      affordances: ['slip away', 'sneak out', 'leave quietly', 'hide', 'get out unseen', 'lose them', 'take the servants stair'],
      costs: [
        { resourceId: 'stamina', amount: 8 },
        { resourceId: 'suspicion', amount: 5 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: { attribute: 'agility', skillId: 'slipping_out', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'back_them_up',
      name: 'Stand With Them',
      tags: ['social'],
      description: 'Step in beside somebody the room has turned on, and make it clear that whatever happens to them happens to you too.',
      affordances: ['stand beside', 'back him up', 'back her up', 'speak for', 'defend her', 'defend him', 'stay with them', 'step in front of'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'read_window',
      name: 'Read a Window',
      tags: ['sight'],
      description: 'The first thing the ERROR can do: read anyone’s status window, every line of it, including the lines nobody else can see.',
      affordances: ['read her window', 'read his window', 'read the window', 'check his status', 'check her status', 'appraise', 'look at the status', 'use the skill', 'use error', 'open my window', 'touch the red line'],
      costs: [{ resourceId: 'overflow', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'crash_skill',
      name: 'Crash a Skill',
      tags: ['defensive'],
      description: 'The second thing the ERROR can do: make one skill in sight fail. A spell fizzles into static, a technique stops mid-swing, a seal cracks.',
      affordances: ['crash it', 'crash the spell', 'break the spell', 'cancel the skill', 'make it fail', 'shut it down', 'stop the spell', 'error it'],
      costs: [
        { resourceId: 'overflow', amount: 15 },
        { resourceId: 'suspicion', amount: 8 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'arcana', skillId: 'control', baseDc: 13 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['error:crash'],
        lockedCopy: 'The red line twitches when you reach for it, and nothing else happens. The skill has not loaded that far yet.',
      },
    },
    {
      id: 'rewrite_line',
      name: 'Rewrite a Line',
      tags: ['utility'],
      description: 'The third thing the ERROR can do: change one line in a status window or a Register tablet. Delete an oath, move a skill, correct a rank.',
      affordances: ['rewrite', 'rewrite the line', 'delete the oath', 'erase the oath', 'edit the window', 'change the line', 'remove the oath', 'take the skill', 'rewrite the register'],
      costs: [
        { resourceId: 'overflow', amount: 25 },
        { resourceId: 'suspicion', amount: 12 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'arcana', skillId: 'control', baseDc: 16 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['error:rewrite'],
        maxResources: [{ resourceId: 'overflow', value: 80 }],
        lockedCopy: 'You can see the lines, but they will not move for you. Either the skill has not loaded that far, or the static is too thick to hold one still.',
      },
    },
    {
      id: 'open_the_circle',
      name: 'Open the Circle',
      tags: ['utility'],
      description: 'What the ERROR is for, once it is fully loaded: open the summoning circle in the hall floor, in either direction.',
      affordances: ['open the circle', 'send them home', 'go home', 'light the circle', 'reverse the circle', 'open the gate home'],
      costs: [
        { resourceId: 'overflow', amount: 40 },
        { resourceId: 'stamina', amount: 20 },
      ],
      cooldownMinutes: 0,
      targetRule: 'AREA',
      check: { attribute: 'arcana', skillId: 'control', baseDc: 18 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['error:full'],
        maxResources: [{ resourceId: 'overflow', value: 60 }],
        lockedCopy: 'The dark circle in the hall floor does not answer you. Whatever the skill is, it is not all here yet, or the static is drowning it out.',
      },
    },
  ],
  locations: [
    {
      id: 'summoning_hall',
      name: 'The Summoning Hall',
      shortName: 'The Hall',
      description:
        'The throne room of Ostmere and its summoning floor in one: white marble, tall stained-glass windows, banners, a throne on a dais, and a circle fifteen paces wide cut into the floor. It glowed for a hundred years. Since you arrived it has been dark.',
      artDirection:
        'Vast fantasy throne-room summoning hall, white marble floor with a huge engraved summoning circle, tall stained-glass windows throwing coloured light, crimson banners, a gold throne on a dais. Grand, bright, ceremonial.',
      connections: [{ to: 'palace_gallery', travelMinutes: 2, label: 'Out through the great doors' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [
        { itemId: 'skill_scroll', qty: 1, ownerId: 'matthias', aka: ['scroll', 'the reading scroll', 'the skill list', 'the list of skills'] },
      ],
    },
    {
      id: 'palace_gallery',
      name: 'The Long Gallery',
      shortName: 'Gallery',
      description:
        'The spine of the palace: a corridor three hundred paces long, lined with portraits of every Hero Ostmere has ever summoned, twelve of them in two hundred years. At the east end is a doorway that was plastered over twenty-two years ago and painted to match the wall.',
      artDirection:
        'Long palace gallery corridor with tall windows down one side and gilt-framed portraits of armoured heroes down the other, polished floor, and at the far end a plastered-over doorway painted to match the wall. Afternoon light, hushed.',
      connections: [
        { to: 'summoning_hall', travelMinutes: 2, label: 'Back to the hall' },
        { to: 'guest_wing', travelMinutes: 3, label: 'To the guest wing' },
        { to: 'mage_tower', travelMinutes: 5, label: 'Up the tower stair' },
        { to: 'royal_garden', travelMinutes: 4, label: 'Out to the walled garden' },
        { to: 'training_yard', travelMinutes: 4, label: 'Down to the knights’ yard' },
        { to: 'map_room', travelMinutes: 3, label: 'To the map room' },
        { to: 'city_market', travelMinutes: 15, label: 'Down through the palace gate to the city' },
        { to: 'sealed_wing', travelMinutes: 1, lockedByFlag: 'found_the_sealed_door', label: 'Through the plastered door at the east end' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
    },
    {
      id: 'guest_wing',
      name: 'The Guest Wing',
      shortName: 'Guest Wing',
      description:
        'Thirty-one small rooms off one corridor, given to the summoned. Good beds, washbasins, a window each. Someone has put a vase of flowers in every room. The common room at the end is where everybody from the bus ends up at night, because nobody wants to be alone.',
      artDirection:
        'Palace guest corridor with a row of wooden doors, warm lamplight, a common room with mismatched armchairs and people in modern office clothes sitting awkwardly in a fantasy palace. Cosy and slightly surreal.',
      connections: [{ to: 'palace_gallery', travelMinutes: 3, label: 'Back to the gallery' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 1 },
      takeableItems: [
        { itemId: 'guest_key', qty: 1, ownerId: null, aka: ['key', 'room key', 'the guest key', 'iron key'] },
      ],
    },
    {
      id: 'mage_tower',
      name: 'Selene’s Tower',
      shortName: 'The Tower',
      description:
        'A round room at the top of a hundred and twelve steps: crystal lenses on brass arms, chalk circles on every flat surface, a cot she clearly sleeps on, and a wall of notes about the summoning. The worktable is heavy oak and nobody ever looks underneath it.',
      artDirection:
        'Round mage tower study at the top of a stair, brass-armed crystal lenses, chalk circles on the floor and walls, stacks of notes, a narrow cot, a heavy oak worktable, city rooftops through arched windows. Cluttered, brilliant, lived in.',
      connections: [{ to: 'palace_gallery', travelMinutes: 5, label: 'Down the tower stair' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 0 },
      takeableItems: [
        { itemId: 'return_sketch', qty: 1, ownerId: 'selene', aka: ['drawing', 'the return circle', 'her drawing', 'the sketch', 'the reversed circle'] },
      ],
    },
    {
      id: 'royal_garden',
      name: 'The Queen’s Garden',
      shortName: 'Garden',
      description:
        'A walled garden with gravel paths, roses gone slightly wild, and a wooden post in the far corner scarred by ten years of sword practice. The garden was the late queen’s. Nobody has replanted it, and nobody comes here but the princess.',
      artDirection:
        'Walled palace garden with gravel paths and overgrown roses, a stone bench, a scarred wooden practice post in one corner, the palace towers above the wall. Early light, quiet, private.',
      connections: [{ to: 'palace_gallery', travelMinutes: 4, label: 'Back inside' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 0 },
    },
    {
      id: 'training_yard',
      name: 'The Knights’ Yard',
      shortName: 'The Yard',
      description:
        'A sanded yard inside the palace walls with weapon racks, straw targets and a viewing gallery. Every summoned is tested here, and every one of them is being watched while they are. The knights’ gate on the far side opens onto the city.',
      artDirection:
        'Sanded castle training yard with weapon racks, straw targets, knights in practice gear, and summoned people in office clothes holding swords badly, a viewing gallery above. Bright, dusty, loud.',
      connections: [
        { to: 'palace_gallery', travelMinutes: 4, label: 'Back into the palace' },
        { to: 'city_market', travelMinutes: 12, label: 'Out the knights’ gate to the city' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 2 },
      takeableItems: [
        { itemId: 'practice_blade', qty: 1, ownerId: null, aka: ['practice sword', 'blunt sword', 'training sword', 'a blade from the rack'] },
      ],
    },
    {
      id: 'map_room',
      name: 'The Map Room',
      shortName: 'Map Room',
      description:
        'The king’s war room: a table-sized map of Ostmere in painted wood, the northern pass marked in red ink that has been redrawn wider every week. Reports pinned to the walls, most of them lists of names.',
      artDirection:
        'Royal war room with a huge painted wooden map table, red ink marking a mountain pass, candles, pinned reports on stone walls, heavy chairs. Dim, serious, lamplit.',
      connections: [{ to: 'palace_gallery', travelMinutes: 3, label: 'Back to the gallery' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 1 },
    },
    {
      id: 'city_market',
      name: 'The Lower City',
      shortName: 'Lower City',
      description:
        'The streets below the palace gate: food stalls, a fountain, a hiring board, carts, and crowds who have heard the summoned are here and want to see one. The road north starts at the far side of the market square.',
      artDirection:
        'Busy fantasy market square below a hilltop palace, food stalls with smoke, a fountain, banners, carts, crowds, a road leading out of town. Colourful, crowded, warm.',
      connections: [
        { to: 'palace_gallery', travelMinutes: 15, label: 'Up through the palace gate' },
        { to: 'training_yard', travelMinutes: 12, label: 'In through the knights’ gate' },
        { to: 'cathedral', travelMinutes: 8, label: 'Across the square to the Cathedral' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 3 },
      takeableItems: [
        { itemId: 'market_skewer', qty: 3, ownerId: null, aka: ['skewer', 'street food', 'something to eat', 'grilled meat'] },
      ],
    },
    {
      id: 'cathedral',
      name: 'The Cathedral of the Register',
      shortName: 'Cathedral',
      description:
        'A white cathedral whose whole north wall is the Great Register: thousands of stone tablets, one for every skill in the kingdom, each carved with a name, a skill and a rank. New tablets are cut every week. One near the bottom has been left blank with your name above it.',
      artDirection:
        'Huge white cathedral interior with one entire wall made of carved stone tablets rising into shadow, candlelight, a stone lectern, robed clergy, a single blank tablet near the bottom. Solemn, vast, cold.',
      connections: [{ to: 'city_market', travelMinutes: 8, label: 'Back across the square' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 3 },
      takeableItems: [
        { itemId: 'sealing_brand', qty: 1, ownerId: 'hask', aka: ['brand', 'the iron', 'the sealing iron', 'his brand'] },
        { itemId: 'register_lens', qty: 1, ownerId: 'hask', aka: ['lens', 'his lens', 'the crystal lens', 'monocle'] },
      ],
    },
    {
      id: 'sealed_wing',
      name: 'The East Wing',
      shortName: 'East Wing',
      description:
        'Plastered shut twenty-two years ago and left exactly as it was. Furniture frozen mid-fall, a staircase that is missing for one second in every ten, and red static still crawling in the cracks of the walls. It is cold, and it is quiet in a way rooms are not.',
      artDirection:
        'Abandoned palace wing frozen in a moment of collapse, chairs and chandeliers hanging mid-fall, dust, faint red glitch-light crawling along cracks in the walls, a broken staircase. Eerie, still, unsettling.',
      connections: [{ to: 'palace_gallery', travelMinutes: 1, label: 'Back through the plaster' }],
      discoveredByDefault: false,
      mapPosition: { x: 2, y: 1 },
    },
  ],
  factions: [
    {
      id: 'faction_crown',
      name: 'The Crown of Ostmere',
      description:
        'The king, his council and his knights. They summoned your bus to hold the northern pass against the Breach, and they want every summoned sworn, trained and marching by the fourth morning.',
      startingReputation: 20,
      ranks: [
        { atReputation: 0, label: 'Guest' },
        { atReputation: 35, label: 'Trusted' },
        { atReputation: 65, label: 'The Crown’s own' },
      ],
      allies: ['faction_register'],
      enemies: [],
    },
    {
      id: 'faction_register',
      name: 'The Church of the Register',
      description:
        'The church that keeps the Great Register, a wall of stone tablets listing every skill in the kingdom by rank. A skill not in the Register is aberrant, and aberrant skills are audited, then registered, sealed or burned out.',
      startingReputation: 0,
      ranks: [
        { atReputation: 0, label: 'Unwritten' },
        { atReputation: 30, label: 'Recorded' },
        { atReputation: 60, label: 'Vouched for' },
      ],
      allies: ['faction_crown'],
      enemies: [],
    },
    {
      id: 'faction_summoned',
      name: 'The Thirty-One',
      description:
        'Everybody who was on the 7:42 bus with you: a nurse, a delivery driver, a retired teacher, a man who slept the whole way, and Daichi. All adults, all on their way to work. Twenty-nine of them and Daichi swore the oath without reading it.',
      startingReputation: 30,
      ranks: [
        { atReputation: 0, label: 'Someone from the bus' },
        { atReputation: 40, label: 'One of us' },
        { atReputation: 70, label: 'The one we follow' },
      ],
      allies: [],
      enemies: [],
    },
  ],
  characters: [
    {
      id: 'selene',
      name: 'Selene Varre',
      role: 'Court mage of Ostmere, who drew the circle that summoned you and is the only one who can read your window',
      cardBlurb:
        'She drew the circle that pulled you off your bus, she can read your window when nobody else in the hall can, and what she saw under the ERROR made her lie to the king for the first time in her life.',
      pronouns: 'she/her',
      publicTraits: ['Talks in measurements when she is excited', 'Formally polite until she forgets to be', 'Has not slept properly in a month'],
      hiddenDrives: [
        'She needs to study your skill before anybody seals it, because it is the only evidence of what her circle actually does',
        'She has started to believe the summoning is a kidnapping with a ceremony attached, and she is the one who drew it',
      ],
      values: ['A measurement over an opinion', 'Owning a mistake once she can prove it was one'],
      fears: [
        'That she is the reason thirty-one people cannot go home',
        'Losing the tower and being sent back to the lamp-makers’ street as the mage who broke the circle',
      ],
      socialStyle:
        'Steps too close to look at your window, apologises, steps back, and is close again within a minute. Asks three questions before you have answered the first.',
      boundaries: [
        'Will not lie to you once you have asked her something directly. She refuses to answer instead, and says out loud that she is refusing',
        'Will not let anyone read her own window, and leaves the room if you try with yours',
      ],
      goals: ['Get you to her tower before the Inquisitor gets you to the Cathedral', 'Find out whether the circle can be run backwards'],
      secrets: [
        {
          id: 'selene_the_line',
          fact: 'Under the ERROR her Mage’s Eye caught one readable line for half a second: "Circle authority: transferred to holder." Her circle went dark because you are carrying what powered it. She told the king it is resting.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells you in the tower, at night, if you ask her straight out why she went white and you have not used the skill in front of the court since.',
        },
        {
          id: 'selene_return_circle',
          fact: 'For a year she has been drafting a return circle on the underside of her worktable: the summoning circle with every line reversed. It needs an authority she does not have. The Church would call it heresy.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She shows you once she trusts you, and only after you have said that you want to go home, or that you want the others to.',
        },
      ],
      speechStyle:
        'Quick and precise, full of numbers and circle geometry. Starts sentences in the middle when she is excited. Drops into stiff court courtesy, "my lord", "if you would", the moment she remembers who might be listening.',
      topics: ['the circle', 'your skill', 'status windows', 'the Mage’s Eye', 'the court', 'going home'],
      voiceSamples: [
        'Hold still. Closer. Your window is drawing a hundred and four lines of light and showing you one of them. That is a door with the frame painted over.',
        'Forgive me, my lord. I was measuring. I measure when I am frightened, and today I have measured everything in this tower twice.',
        'Three percent at noon. Eleven now, and you have used it twice. Please stop reading the guards.',
        'I drew that circle. Every line of it. If it is a crime, the crime is in my handwriting.',
      ],
      appearance:
        'An adult woman, slim and tall, long straight silver hair with a few thin braids worked through it, violet eyes, a dark navy and gold high-collared court mage’s robe with a silver chain across the chest, fitted dark gloves, and a tall pale-wood staff topped with a ring of clear crystal.',
      visualHook: 'Thin silver braids through loose silver hair, and a crystal-ringed staff she leans on like a measuring rod.',
      silhouette: 'Tall and narrow in the high collar, one gloved hand raised and reaching, staff upright in the other.',
      artSeed: 'skill-error-selene-01',
      portrait: null,
      expressions: ['neutral', 'alarmed', 'curious', 'flustered', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'mage_tower', activity: 'dozing over her worktable with a pen still in her hand' },
        { startMinute: 360, endMinute: 660, locationId: 'mage_tower', activity: 'redrawing the circle’s numbers for the fourth time' },
        { startMinute: 660, endMinute: 800, locationId: 'summoning_hall', activity: 'at the king’s left hand while the court sits' },
        { startMinute: 800, endMinute: 1080, locationId: 'mage_tower', activity: 'in the tower among the lenses, door open for anyone with a question' },
        { startMinute: 1080, endMinute: 1200, locationId: 'palace_gallery', activity: 'walking the long gallery to think, past the portraits of the Heroes' },
        { startMinute: 1200, endMinute: 1440, locationId: 'mage_tower', activity: 'working by lamplight on a drawing she turns face down when the door opens' },
      ],
      homeLocationId: 'mage_tower',
      knowledgeScope: ['the_circle', 'status_windows', 'the_court', 'ostmere', 'the_summoning', 'return_circle'],
      startingRelationship: { trust: 20, affection: 10, respect: 35, fear: 15, rivalry: 0 },
      gates: [
        {
          id: 'selene_tells_you_the_line',
          label: 'She tells you what she saw under the ERROR',
          kind: 'TRUST',
          requires: { trust: 40, flagsSet: ['in_selenes_care'] },
        },
        {
          id: 'selene_shows_the_table',
          label: 'She shows you the circle under her worktable',
          kind: 'TRUST',
          requires: { trust: 60 },
        },
      ],
      attributes: { might: 7, agility: 11, mind: 17, presence: 12, resolve: 12, arcana: 17 },
      companion: null,
      scouting: null,
      combatant: { health: 35, defenseDc: 14, damage: 9, tags: ['mage', 'court'] },
    },
    {
      id: 'aurelia',
      name: 'Princess Aurelia',
      calledName: 'Aurelia',
      role: 'Heir to the throne of Ostmere, promised by an old law to whichever summoned has the highest skill',
      cardBlurb:
        'By an old law she is promised to whichever summoned has the highest skill. The king just announced that was Daichi, your window has made the announcement wrong, and she did not ask for either of you.',
      pronouns: 'she/her',
      publicTraits: ['Wears a sword to court and uses it at dawn', 'Says less than anyone in the room and remembers all of it', 'Cut her own hair short the week the summoning was announced'],
      hiddenDrives: [
        'She wants the throne in her own name, with no summoned husband attached to it',
        'She wants the summoned unsworn, because a crown that rules through people who cannot refuse it is not one she wants to inherit',
      ],
      values: ['Being asked rather than arranged', 'Ten years of practice over one gift'],
      fears: [
        'That your skill reads her window and the court learns what is on it',
        'Becoming her father: a decent man who does one terrible thing every generation and calls it necessary',
      ],
      socialStyle:
        'Lets other people talk first. Asks one short question that ends the conversation she did not want. Offers a deal the way other people offer a hand.',
      boundaries: [
        'Will not be treated as a prize. Anybody who talks about her hand as something to be won has lost her, for good',
        'Will not kneel to the Church, in public or in private',
      ],
      goals: [
        'Stand at your Audit and get the Church to rule that a skill with no rank cannot be the highest, which breaks the old law',
        'Find out what the oath in the others’ windows actually does before her father uses it',
      ],
      secrets: [
        {
          id: 'aurelia_blank',
          fact: 'She was born with no skill at all. Her window’s skill line is empty. The Church registered her as Blade, rank B, to protect the crown, and Hask wrote the line himself.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Anybody who reads her window with your skill sees it at once. She will know you have, and what you do with it decides whether she ever trusts you.',
        },
        {
          id: 'aurelia_petition',
          fact: 'Her petition to the Church is already written: it argues that a skill with no rank breaks the Covenant of the Highest. It only works if you stay unsealed and unregistered.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She shows you in the garden once you have refused the betrothal, or refused to kneel, in front of the court.',
        },
      ],
      speechStyle:
        'Short, dry, exact. Questions instead of statements. Gives orders phrased as suggestions and suggestions phrased as orders. Never raises her voice, and never says "please" to anybody she outranks.',
      topics: ['the Covenant of the Highest', 'her father', 'the oath', 'the north', 'swordwork', 'the Church'],
      voiceSamples: [
        'You did not kneel. Good. Do it again tomorrow, in front of more people.',
        'They will offer you my hand. Decline it loudly. Then come and find me in the garden, and we will discuss something useful.',
        'Why does everyone in this palace explain things to me slowly? I asked a short question.',
        'My father is a decent man. Decent men are exactly who build circles like that one.',
      ],
      appearance:
        'An adult woman, athletic, golden hair cut short at the jaw, grey-green eyes, a thin gold circlet, a white-and-crimson riding coat over a fencing shirt, and a slim rapier worn openly at her hip.',
      visualHook: 'A slim court rapier worn openly beneath a royal circlet.',
      silhouette: 'Straight-backed, one hand resting on the rapier’s guard, chin level.',
      artSeed: 'skill-error-aurelia-01',
      portrait: null,
      expressions: ['neutral', 'wry', 'guarded', 'stern', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 330, locationId: 'royal_garden', activity: 'in the royal apartments over the garden, not sleeping much' },
        { startMinute: 330, endMinute: 480, locationId: 'royal_garden', activity: 'sword drills alone at dawn against a wooden post' },
        { startMinute: 480, endMinute: 660, locationId: 'palace_gallery', activity: 'walking the gallery with petitions she is not supposed to read' },
        { startMinute: 660, endMinute: 800, locationId: 'summoning_hall', activity: 'at her father’s right hand, saying nothing in public' },
        { startMinute: 800, endMinute: 1020, locationId: 'training_yard', activity: 'watching the summoned train and writing in a small book' },
        { startMinute: 1020, endMinute: 1440, locationId: 'royal_garden', activity: 'in the garden with a book on her knee and a sword across it' },
      ],
      homeLocationId: 'royal_garden',
      knowledgeScope: ['the_court', 'ostmere', 'the_covenant', 'the_oath', 'the_north', 'the_church'],
      startingRelationship: { trust: 10, affection: 0, respect: 25, fear: 0, rivalry: 10 },
      gates: [
        {
          id: 'aurelia_shows_the_petition',
          label: 'She shows you her petition to the Church',
          kind: 'ALLIANCE',
          requires: { trust: 45, respect: 40 },
        },
        {
          id: 'aurelia_at_your_side',
          label: 'She stands beside you in front of her father',
          kind: 'ALLIANCE',
          requires: { trust: 60 },
        },
      ],
      attributes: { might: 12, agility: 15, mind: 14, presence: 15, resolve: 16, arcana: 4 },
      companion: null,
      scouting: null,
      combatant: { health: 45, defenseDc: 15, damage: 8, tags: ['royal', 'fencer'] },
    },
    {
      id: 'daichi',
      name: 'Daichi Ono',
      role: 'Your coworker from the same firm, who sat two seats ahead of you on the bus and got the Hero class',
      cardBlurb:
        'He covered for you at work more times than you thanked him. He got the Hero class, he knelt first, and he needs you to kneel too, because the king has promised to send the Hero home and there is a ring in his pocket for somebody expecting him tonight.',
      pronouns: 'he/him',
      publicTraits: ['Good in meetings, bad in silences', 'Apologises before he has done anything', 'Already better with a sword than he has any right to be'],
      hiddenDrives: [
        'He wants to go home to Rina so badly that he has decided to believe the king',
        'Being the Hero is the first time in his life a room has gone quiet for him, and part of him does not want it to end',
      ],
      values: ['Keeping the team together', 'Doing what you said you would do'],
      fears: ['That there is no way home and he is the only one who has not worked it out', 'That you outrank him, and everybody can see it'],
      socialStyle:
        'Jokes in office language to make a terrifying thing sound like a bad quarter. Puts a hand on your shoulder when he wants you to agree with him.',
      boundaries: [
        'Will not leave anyone from the bus behind, including the ones he does not like',
        'Will not hear a word against the king’s promise until somebody shows him proof',
      ],
      goals: ['Get through training, close the Breach, and have the circle send him home', 'Keep you out of trouble long enough that you do not ruin it for everybody'],
      secrets: [
        {
          id: 'daichi_the_line',
          fact: 'His window has a line he cannot see: "Oath: Sworn to the Crown of Ostmere. Will not refuse a royal order." He has already obeyed two orders he meant to argue with, and thinks he simply lost his nerve.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Anyone who reads his window with your skill sees it. Telling him is a separate decision, and he will not believe it until his body locks in front of him.',
        },
        {
          id: 'daichi_the_ring',
          fact: 'There is an engagement ring in his jacket pocket. He was going to propose to Rina tonight. He has told nobody in this world.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He shows you on the guest-wing steps at night if you ask him about home instead of about the Hero.',
        },
      ],
      speechStyle:
        'Friendly salaryman cadence. Office phrases as jokes, "let’s circle back", "not in scope", "per my last message". Gets louder and faster when he is scared, then apologises for it.',
      topics: ['home', 'the Hero class', 'work', 'the oath', 'the others from the bus', 'Rina'],
      voiceSamples: [
        'Okay. Okay. Let’s circle back on the whole other-world situation after lunch.',
        'Sorry, sorry, I’m shouting. They gave me a cloak with my own crest on it, man. I have a crest now.',
        'Just kneel, yeah? Head down, get through the quarter, collect the bonus. Same as always.',
        'He promised. The king looked me in the eye and promised. So I need that to be true, okay?',
      ],
      appearance:
        'An adult man, tall and broad-shouldered, neat short black hair, a white office shirt and loosened tie under a borrowed white-and-gold Hero’s cloak, a company ID lanyard still round his neck, and a new longsword he holds slightly wrong.',
      visualHook: 'A company ID lanyard hanging over a gold-trimmed Hero’s cloak.',
      silhouette: 'Broad and upright, the cloak too long for him, one hand on the back of his own neck.',
      artSeed: 'skill-error-daichi-01',
      portrait: null,
      expressions: ['neutral', 'grinning', 'nervous', 'sheepish', 'hurt'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'guest_wing', activity: 'sleeping badly with a dead phone under his pillow' },
        { startMinute: 420, endMinute: 660, locationId: 'training_yard', activity: 'learning to hold a sword from knights who are nervous of him' },
        { startMinute: 660, endMinute: 800, locationId: 'summoning_hall', activity: 'at court in the Hero’s cloak, being introduced to people' },
        { startMinute: 800, endMinute: 1080, locationId: 'training_yard', activity: 'drilling until his arms shake' },
        { startMinute: 1080, endMinute: 1260, locationId: 'city_market', activity: 'being cheered in the lower city by people who want to touch the cloak' },
        { startMinute: 1260, endMinute: 1440, locationId: 'guest_wing', activity: 'on the guest-wing steps, turning something over in his jacket pocket' },
      ],
      homeLocationId: 'guest_wing',
      knowledgeScope: ['the_bus', 'the_firm', 'the_hero_class', 'the_court', 'rina'],
      startingRelationship: { trust: 55, affection: 45, respect: 30, fear: 0, rivalry: 15 },
      gates: [
        {
          id: 'daichi_shows_the_ring',
          label: 'He shows you what is in his pocket',
          kind: 'TRUST',
          requires: { trust: 60 },
        },
        {
          id: 'daichi_believes_you',
          label: 'He believes you about the oath',
          kind: 'TRUST',
          requires: { trust: 65, flagsSet: ['knows:oath_leash'] },
        },
      ],
      attributes: { might: 16, agility: 13, mind: 11, presence: 14, resolve: 10, arcana: 12 },
      companion: null,
      scouting: null,
      combatant: { health: 70, defenseDc: 14, damage: 12, tags: ['hero', 'summoned', 'sworn'] },
    },
    {
      id: 'hask',
      name: 'Inquisitor Hask',
      calledName: 'Hask',
      role: 'Inquisitor of the Church of the Register, who decides which skills are written down, which are sealed and which are burned out',
      cardBlurb:
        'He has called an Audit of your skill for the third morning, he carries the iron that seals skills shut, and he is the only person in this kingdom who looks at your ERROR as if he has seen one before.',
      pronouns: 'he/him',
      publicTraits: ['Never raises his voice', 'Follows procedure to the letter, including the parts that help you', 'Wears a glove over the back of his right hand'],
      hiddenDrives: [
        'He wants your skill sealed before it does what his did, because he has had twenty-two years to count the dead',
        'He needs to know whether his own skill could have been held, which would make the east wing his fault rather than an accident',
      ],
      values: ['Due process, even for an aberration', 'The Register is true or it is nothing'],
      fears: ['Standing in the east wing again', 'Hope: that you are proof there was a way home and he stopped looking'],
      socialStyle:
        'Speaks in numbered points. Lets silences run until you fill them. Writes down what you say, in front of you, and reads it back.',
      boundaries: [
        'Will not seal a skill without an Audit, whoever orders it, the king included',
        'Will not write a false line in the Register, ever again',
      ],
      goals: [
        'Hold the Audit on the third morning and enter a verdict: registered, sealed, or unwritten',
        'Keep the static out of the palace until then, by any lawful means',
      ],
      secrets: [
        {
          id: 'hask_origin',
          fact: 'He was summoned twenty-two years ago, at twenty-one, from the same world as you. His name was Hasegawa Ren. His skill read ??? and overflowed in the east wing on his third day; eleven people died, the queen among them. The Church sealed it with the Brand he now carries and made him an Inquisitor at his own request.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Your skill reads it straight off his window: Name, Hask (Hasegawa Ren). Origin, summoned. Skill, [SEALED]. What he does next depends on whether you say it in front of anybody.',
        },
        {
          id: 'hask_false_line',
          fact: 'He wrote one false line in the Great Register, eight years ago: the princess’s skill. She has none.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He admits it only to someone who already knows, and only if they have not used it against her.',
        },
      ],
      speechStyle:
        'Quiet, procedural, numbered: "First." "Second." Legal phrasing. Once in a while a word from your world slips out, a shop, a kind of drink, and he moves past it without comment.',
      topics: ['the Audit', 'the Great Register', 'the Brand', 'the east wing', 'aberrant skills', 'procedure'],
      voiceSamples: [
        'First, you will not use the skill inside the palace. Second, you will present yourself at the Cathedral at the ninth bell on the third morning. Third, I am writing down everything you say.',
        'An unregistered skill is not a crime. What it does next might be. The Audit exists to find out which, before anybody has to bury anyone.',
        'Is there still a shop on every corner that never closes? With a chime on the door? No. Disregard the question. Sit down.',
        'I have sealed fourteen skills. I remember every hand. Yours would be the fifteenth.',
      ],
      appearance:
        'An adult man, gaunt, close-cropped grey hair, deep-set dark eyes, a long black coat under a white stole embroidered with rows of tiny script, a black glove on his right hand only, and a round crystal lens on a silver chain.',
      visualHook: 'A single black glove on the right hand, hiding a coin-sized brand scar.',
      silhouette: 'Tall and still, hands clasped behind him, the white stole hanging straight as a ruled line.',
      artSeed: 'skill-error-hask-01',
      portrait: null,
      expressions: ['neutral', 'stern', 'watchful', 'haunted', 'considering'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'cathedral', activity: 'awake in a narrow room behind the Register' },
        { startMinute: 360, endMinute: 660, locationId: 'cathedral', activity: 'at the Great Register, reading new entries line by line' },
        { startMinute: 660, endMinute: 800, locationId: 'summoning_hall', activity: 'at the edge of the court, watching windows through his lens' },
        { startMinute: 800, endMinute: 1140, locationId: 'cathedral', activity: 'hearing petitions under the Register' },
        { startMinute: 1140, endMinute: 1320, locationId: 'palace_gallery', activity: 'standing in front of the plastered doorway at the east end of the gallery' },
        { startMinute: 1320, endMinute: 1440, locationId: 'cathedral', activity: 'writing up the day in his own hand' },
      ],
      homeLocationId: 'cathedral',
      knowledgeScope: ['the_register', 'the_church', 'the_east_wing', 'the_brand', 'the_audit', 'the_other_world'],
      startingRelationship: { trust: 0, affection: 0, respect: 15, fear: 20, rivalry: 0 },
      gates: [
        {
          id: 'hask_off_the_record',
          label: 'He talks to you without writing it down',
          kind: 'TRUST',
          requires: { trust: 45, flagsSet: ['knows:hask_origin'] },
        },
        {
          id: 'hask_argues_for_you',
          label: 'He argues for you at the Audit',
          kind: 'ALLIANCE',
          requires: { trust: 60, respect: 50 },
        },
      ],
      attributes: { might: 11, agility: 10, mind: 16, presence: 13, resolve: 18, arcana: 9 },
      companion: null,
      scouting: null,
      combatant: { health: 45, defenseDc: 15, damage: 7, tags: ['church', 'inquisitor'] },
    },
    {
      id: 'matthias',
      name: 'King Matthias',
      calledName: 'Matthias',
      role: 'King of Ostmere, who ordered the summoning and needs every summoned sworn and marching north within days',
      cardBlurb:
        'He summoned your whole bus to hold a tear in the sky over his northern border, he wears the ring that writes the oath into a window, and he has watched a skill like yours go wrong once before, when it killed his mother.',
      pronouns: 'he/him',
      publicTraits: ['Courteous to everyone, including people he is about to overrule', 'Tired in a way sleep does not touch', 'Turns his seal ring while he listens'],
      hiddenDrives: [
        'He needs the circle lit again, and a sealed skill gives it back',
        'He will not let an unsworn summoned walk his palace a second time, whatever it costs him with his daughter',
      ],
      values: ['The north holds, whatever it takes', 'A king says the hard thing himself rather than sending someone'],
      fears: ['The east wing, again', 'That Aurelia is right about him'],
      socialStyle:
        'Gives you his full attention and all of his reasons, then gives the order anyway. Calls everyone by name after hearing it once.',
      boundaries: [
        'Will not lie to the summoned about the Breach, which is real and is killing people',
        'Will not order a summoned person killed outside the law, because he saw what that bought his father',
      ],
      goals: [
        'Every summoned sworn, trained and marching north by the fourth morning',
        'Your skill registered to the Crown, or sealed so the circle lights again',
      ],
      secrets: [
        {
          id: 'matthias_the_promise',
          fact: 'He promised Daichi the circle will send the Hero home once the Breach is closed. He has no idea whether it can. He made the promise because a Hero fights better with somewhere to go.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He admits it if you ask him in private, in the map room, and you have not threatened him with your skill.',
        },
        {
          id: 'matthias_the_circle',
          fact: 'Selene told him the circle is resting. He does not believe her. He has guessed that sealing your skill would light it again, and that is half of why he wants the Audit.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He says it outright if you refuse the oath twice. He would rather you knew what he wants than guessed.',
        },
      ],
      speechStyle:
        'Measured, warm, final. Explains himself completely and then decides. Uses people’s names. Speaks of the dead in the north by number, and of his mother not at all.',
      topics: ['the Breach', 'the north', 'the oath', 'the summoning', 'his daughter', 'the east wing'],
      voiceSamples: [
        'Kneel, and show us. I ask it of everyone. I asked it of your friend, and he understood.',
        'Four hundred soldiers held the northern pass last month. Ninety came back. That is why you are here, and I am sorry for it.',
        'My daughter thinks I enjoy this. Let her. Someone in this family should be allowed to be right.',
        'Your friend asked me whether he can go home. I told him yes. Ask me again when we are alone.',
      ],
      appearance:
        'An older man, heavyset and grey-bearded, a plain gold crown, a deep blue royal mantle over a soldier’s padded coat, and a heavy gold seal ring on his right hand that he turns while he listens.',
      visualHook: 'A heavy gold seal ring engraved with a circle, turned constantly on his finger.',
      silhouette: 'Seated forward on the throne, elbows on his knees, the ring hand loose.',
      artSeed: 'skill-error-matthias-01',
      portrait: null,
      expressions: ['neutral', 'grave', 'weary', 'stern', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'map_room', activity: 'at the war table, not sleeping' },
        { startMinute: 360, endMinute: 660, locationId: 'map_room', activity: 'reading reports from the north with his council' },
        { startMinute: 660, endMinute: 800, locationId: 'summoning_hall', activity: 'on the throne while the court sits' },
        { startMinute: 800, endMinute: 1320, locationId: 'map_room', activity: 'planning the march over the map in red ink' },
        { startMinute: 1320, endMinute: 1440, locationId: 'map_room', activity: 'alone at the map with the lamps turned low' },
      ],
      homeLocationId: 'map_room',
      knowledgeScope: ['the_court', 'the_north', 'the_breach', 'the_oath', 'the_east_wing', 'ostmere'],
      startingRelationship: { trust: 5, affection: 0, respect: 20, fear: 10, rivalry: 0 },
      gates: [
        {
          id: 'matthias_in_private',
          label: 'He tells you the truth about the promise',
          kind: 'TRUST',
          requires: { trust: 40 },
        },
      ],
      attributes: { might: 12, agility: 8, mind: 14, presence: 17, resolve: 16, arcana: 6 },
      companion: null,
      scouting: null,
      combatant: { health: 40, defenseDc: 12, damage: 5, tags: ['royal'] },
    },
  ],
  quests: [
    {
      id: 'q_kneel',
      title: 'Kneel, and Show Us',
      summary: 'The king wants you on your knees at the circle, where everyone else from your bus has already sworn an oath none of them read.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['matthias', 'selene', 'daichi', 'aurelia', 'hask'],
      involvedLocationIds: ['summoning_hall', 'palace_gallery'],
      knownRewardCopy: 'Some idea of what your skill is, and what the court plans to do about it.',
      steps: [
        {
          id: 'the_circle',
          playerCopy: 'Answer the king in front of the whole court.',
          directorNotes:
            'Every route here is a real answer. If the player kneels, the Oath line appears in their window for half a second and the ERROR spits it out, and Selene and Hask both see it happen. If they refuse, the king does not force it today; he asks again tomorrow, with more knights in the room. If they use the skill, the court learns it reads things nobody else can, which is worse news for the court than a refusal.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'knelt',
              label: 'Kneel with the others',
              predicate: { flagsSet: ['used:play_the_part'] },
              setsFlags: ['knelt', 'oath_rejected'],
              closesFlags: ['refused_to_kneel'],
            },
            {
              routeId: 'refused',
              label: 'Stay on your feet and say no',
              predicate: { flagsSet: ['used:say_it_plainly'] },
              setsFlags: ['refused_to_kneel'],
              closesFlags: ['knelt'],
            },
            {
              routeId: 'showed_them',
              label: 'Show them what the skill does',
              predicate: { flagsSet: ['used:read_window'] },
              setsFlags: ['showed_the_court'],
              closesFlags: [],
            },
            {
              routeId: 'asked_first',
              label: 'Ask what kneeling does before you do it',
              predicate: { flagsSet: ['used:read_the_rules'] },
              setsFlags: ['asked_about_the_oath'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 40,
            items: [],
            flags: ['first_hour_over'],
            abilities: [],
            reputation: [{ factionId: 'faction_crown', amount: 5 }],
          },
        },
        {
          id: 'out_of_the_hall',
          playerCopy: 'Get out of the hall with the skill still yours.',
          directorNotes:
            'Three people want custody of the player before the day is out: Selene wants them in her tower, Hask wants them in the Cathedral until the Audit, and Daichi wants them in the guest wing being normal. All three ask politely. Whoever the player goes with shapes the next two days.',
          enterWhen: { flagsSet: ['first_hour_over'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'with_selene',
              label: 'Go with the court mage to her tower',
              predicate: { flagsSet: ['spoke:selene'] },
              setsFlags: ['in_selenes_care'],
              closesFlags: ['in_church_custody'],
            },
            {
              routeId: 'with_hask',
              label: 'Go quietly with the Inquisitor',
              predicate: { flagsSet: ['spoke:hask'] },
              setsFlags: ['in_church_custody'],
              closesFlags: ['in_selenes_care'],
            },
            {
              routeId: 'with_the_bus',
              label: 'Stay with Daichi and the others from the bus',
              predicate: { flagsSet: ['spoke:daichi'] },
              setsFlags: ['with_the_bus'],
              closesFlags: [],
            },
            {
              routeId: 'on_your_own',
              label: 'Slip away while the court argues',
              predicate: { flagsSet: ['used:slip_away'] },
              setsFlags: ['went_off_alone'],
              closesFlags: ['in_church_custody'],
            },
          ],
          rewards: {
            xp: 60,
            items: [],
            flags: ['out_of_the_hall'],
            abilities: [],
            reputation: [{ factionId: 'faction_summoned', amount: 5 }],
          },
        },
      ],
    },
    {
      id: 'q_loading',
      title: 'ERROR: 3% Loaded',
      summary: 'The red line in your window has started counting. Every time you use the skill the number goes up, it can do more, and the red static it leaks gets harder to hide.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['selene', 'hask', 'daichi'],
      involvedLocationIds: ['mage_tower', 'training_yard', 'cathedral'],
      knownRewardCopy: 'The next thing the skill can do, and in the end, its real name.',
      steps: [
        {
          id: 'first_unlock',
          playerCopy: 'Use the skill until it shows you something it was hiding.',
          directorNotes:
            'Read is the only thing the skill does yet, and it is already more than anyone else in the kingdom can do. Each window the player reads should show one line nobody else can see. Whichever window they read first is the secret they carry into the rest of the story. When this step completes the counter jumps to about a quarter and Crash unlocks.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'read_daichi',
              label: 'Read the hidden line in Daichi’s window',
              predicate: { flagsSet: ['used:read_window', 'spoke:daichi'] },
              setsFlags: ['knows:oath_leash', 'read_daichi'],
              closesFlags: [],
            },
            {
              routeId: 'read_aurelia',
              label: 'Read the princess’s window',
              predicate: { flagsSet: ['used:read_window', 'spoke:aurelia'] },
              setsFlags: ['knows:aurelia_blank'],
              closesFlags: [],
            },
            {
              routeId: 'read_hask',
              label: 'Read the Inquisitor’s window',
              predicate: { flagsSet: ['used:read_window', 'spoke:hask'] },
              setsFlags: ['knows:hask_origin'],
              closesFlags: [],
            },
            {
              routeId: 'measured',
              label: 'Let Selene measure it in her tower',
              predicate: { flagsSet: ['used:read_window'], atLocation: 'mage_tower' },
              setsFlags: ['measured_by_selene'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 80,
            items: [],
            flags: ['error:crash'],
            abilities: ['crash_skill'],
            reputation: [],
          },
        },
        {
          id: 'second_unlock',
          playerCopy: 'Push the skill into breaking something.',
          directorNotes:
            'Crash makes a skill in sight fail, and the failure is loud: static, a smell like a struck match, every window nearby flickering. Where the player does it matters more than what they break. In the yard, the whole court hears about it by dinner. To protect somebody, it makes the player a story people tell. In private, only Hask’s lens notices. When this step completes the counter passes half and Rewrite unlocks.',
          enterWhen: { flagsSet: ['error:crash'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'crashed_in_the_yard',
              label: 'Crash a skill in the knights’ yard, in front of everyone',
              predicate: { flagsSet: ['used:crash_skill'], atLocation: 'training_yard' },
              setsFlags: ['crashed_in_public'],
              closesFlags: ['crashed_in_private'],
            },
            {
              routeId: 'crashed_for_someone',
              label: 'Crash a skill aimed at somebody else',
              predicate: { flagsSet: ['used:crash_skill', 'used:back_them_up'] },
              setsFlags: ['crashed_to_protect'],
              closesFlags: [],
            },
            {
              routeId: 'crashed_quietly',
              label: 'Crash something where nobody is watching',
              predicate: { flagsSet: ['used:crash_skill'] },
              setsFlags: ['crashed_in_private'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['error:rewrite'],
            abilities: ['rewrite_line'],
            reputation: [],
          },
        },
        {
          id: 'full_load',
          playerCopy: 'Load the skill to a hundred percent and read its real name.',
          directorNotes:
            'Rewrite changes one line in a window or a Register tablet, and it is the use that loads the rest. Whatever line the player changes first is the one the story remembers. When this step completes the window prints the real name, [Summoner], and the dark circle in the hall floor answers the player for the first time.',
          enterWhen: { flagsSet: ['error:rewrite'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'freed_daichi',
              label: 'Delete the oath from Daichi’s window',
              predicate: {
                flagsSet: ['used:rewrite_line', 'knows:oath_leash'],
                minRelationship: [{ characterId: 'daichi', dimension: 'trust', value: 50 }],
              },
              setsFlags: ['freed_daichi', 'oath_broken'],
              closesFlags: [],
            },
            {
              routeId: 'rewrote_yourself',
              label: 'Rewrite a line in your own window',
              predicate: { flagsSet: ['used:rewrite_line'], atLocation: 'mage_tower' },
              setsFlags: ['rewrote_self'],
              closesFlags: [],
            },
            {
              routeId: 'rewrote_the_register',
              label: 'Rewrite a tablet in the Great Register',
              predicate: { flagsSet: ['used:rewrite_line'], atLocation: 'cathedral' },
              setsFlags: ['register_altered'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 200,
            items: [],
            flags: ['error:full', 'knows:true_name'],
            abilities: ['open_the_circle'],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_audit',
      title: 'The Audit',
      summary: 'At the ninth bell on the third morning the Inquisitor will put your hand on the Great Register and enter a verdict: registered to the Crown, sealed with a hot iron, or left unwritten.',
      kind: 'MAIN',
      involvedCharacterIds: ['hask', 'matthias', 'aurelia', 'selene'],
      involvedLocationIds: ['cathedral', 'city_market'],
      knownRewardCopy: 'A verdict on your skill, and on you.',
      discoverWhen: { flagsSet: ['audit_called'] },
      steps: [
        {
          id: 'before_the_audit',
          playerCopy: 'Decide who stands with you when you walk into the Cathedral.',
          directorNotes:
            'Four people can be at the player’s side on the third morning, and they want incompatible verdicts. The king wants the skill registered to the Crown. Aurelia wants it unregistered so her petition works. Selene wants it studied. Hask wants it sealed and will not cut a corner to get there. Running is also an answer, and the Church will treat it as one.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'crown_backs_you',
              label: 'Accept the king’s protection',
              predicate: {
                flagsSet: ['knelt'],
                minFactionReputation: [{ factionId: 'faction_crown', value: 30 }],
              },
              setsFlags: ['crown_claims_you'],
              closesFlags: ['aurelia_stands_with_you'],
            },
            {
              routeId: 'aurelia_backs_you',
              label: 'Get the princess to stand beside you',
              predicate: { minRelationship: [{ characterId: 'aurelia', dimension: 'trust', value: 50 }] },
              setsFlags: ['aurelia_stands_with_you'],
              closesFlags: ['crown_claims_you'],
            },
            {
              routeId: 'selene_backs_you',
              label: 'Get Selene to testify for the skill',
              predicate: { minRelationship: [{ characterId: 'selene', dimension: 'trust', value: 55 }] },
              setsFlags: ['selene_testifies'],
              closesFlags: [],
            },
            {
              routeId: 'ran',
              label: 'Leave the city before the ninth bell',
              predicate: { flagsSet: ['used:slip_away', 'visited:city_market'] },
              setsFlags: ['fled_the_audit'],
              closesFlags: ['audited'],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['audit_ready'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'the_audit',
          playerCopy: 'Put your hand on the Register and hear the verdict.',
          directorNotes:
            'Hask presides and follows the procedure exactly: testimony, a reading through his lens, a verdict. He cannot read the ERROR, and he says so on the record. The verdict is not fixed. Registered to the Crown means owned, not sworn. Sealed means the brand, and the circle relights that afternoon. Unwritten means the Church will pretend the skill does not exist, which is freedom with no protection at all.',
          enterWhen: { flagsSet: ['audit_ready'] },
          failWhen: { flagsSet: ['fled_the_audit'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'registered',
              label: 'Let it be registered to the Crown',
              predicate: { flagsSet: ['crown_claims_you'], atLocation: 'cathedral' },
              setsFlags: ['registered_to_crown', 'audited'],
              closesFlags: ['sealed', 'unregistered'],
            },
            {
              routeId: 'sealed',
              label: 'Let Hask seal it',
              predicate: { flagsSet: ['audit_morning', 'used:say_it_plainly'], atLocation: 'cathedral' },
              setsFlags: ['sealed', 'audited'],
              closesFlags: ['registered_to_crown', 'unregistered'],
            },
            {
              routeId: 'rewrote_the_verdict',
              label: 'Make the Register write what you want',
              predicate: { flagsSet: ['used:rewrite_line'], atLocation: 'cathedral' },
              setsFlags: ['register_altered', 'unregistered', 'audited'],
              closesFlags: ['sealed', 'registered_to_crown'],
            },
            {
              routeId: 'hask_spares_it',
              label: 'Convince Hask to leave it unwritten',
              predicate: {
                flagsSet: ['knows:hask_origin'],
                minRelationship: [{ characterId: 'hask', dimension: 'trust', value: 50 }],
              },
              setsFlags: ['hask_spared_it', 'unregistered', 'audited'],
              closesFlags: ['sealed', 'registered_to_crown'],
            },
          ],
          rewards: {
            xp: 180,
            items: [],
            flags: ['audit_done'],
            abilities: [],
            reputation: [{ factionId: 'faction_register', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_the_bus',
      title: 'Everyone From the Bus',
      summary: 'Twenty-nine people from your bus, and Daichi, swore an oath an hour into this world without reading it. Now they cannot refuse a royal order, and the king has ordered them north.',
      kind: 'SIDE',
      involvedCharacterIds: ['daichi', 'matthias'],
      involvedLocationIds: ['guest_wing', 'training_yard'],
      knownRewardCopy: 'What happens to thirty people who trusted a welcome ceremony.',
      discoverWhen: { flagsSet: ['knows:oath_leash'] },
      steps: [
        {
          id: 'what_they_swore',
          playerCopy: 'Decide whether the others find out what they swore.',
          directorNotes:
            'Telling them is not free. A nurse who learns she cannot refuse an order panics in the common room; a delivery driver tries to refuse one on purpose to test it and his legs lock on the stairs. Keeping quiet is also a choice, and Daichi will one day ask the player how long they knew.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'told_daichi',
              label: 'Tell Daichi what is in his window',
              predicate: {
                flagsSet: ['used:say_it_plainly'],
                minRelationship: [{ characterId: 'daichi', dimension: 'trust', value: 50 }],
              },
              setsFlags: ['daichi_knows'],
              closesFlags: [],
            },
            {
              routeId: 'told_everyone',
              label: 'Tell the whole guest wing',
              predicate: { flagsSet: ['used:say_it_plainly'], atLocation: 'guest_wing' },
              setsFlags: ['the_bus_knows', 'daichi_knows'],
              closesFlags: ['kept_it_quiet'],
            },
            {
              routeId: 'kept_quiet',
              label: 'Keep it to yourself for now',
              predicate: { flagsSet: ['used:play_the_part'] },
              setsFlags: ['kept_it_quiet'],
              closesFlags: ['the_bus_knows'],
            },
          ],
          rewards: {
            xp: 70,
            items: [],
            flags: ['bus_decided'],
            abilities: [],
            reputation: [{ factionId: 'faction_summoned', amount: 10 }],
          },
        },
        {
          id: 'the_fourth_morning',
          playerCopy: 'Decide what happens when the king orders them to march.',
          directorNotes:
            'The march is not a bluff. The north is real and the oath works. A player who frees them has thirty frightened adults and no army. A player who marches with them is the only unsworn person in a sworn column. A player who talks the king into waiting buys a day and owes him for it.',
          enterWhen: { flagsSet: ['bus_decided'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'unsworn_them',
              label: 'Delete the oath from every window in the guest wing',
              predicate: { flagsSet: ['used:rewrite_line', 'the_bus_knows'], atLocation: 'guest_wing' },
              setsFlags: ['bus_unsworn'],
              closesFlags: ['bus_marched', 'marched_north'],
            },
            {
              routeId: 'went_with_them',
              label: 'March north with them',
              predicate: {
                flagsSet: ['bus_marched'],
                minRelationship: [{ characterId: 'daichi', dimension: 'trust', value: 45 }],
              },
              setsFlags: ['marched_north'],
              closesFlags: ['bus_unsworn'],
            },
            {
              routeId: 'talked_the_king_down',
              label: 'Get the king to delay the march',
              predicate: {
                flagsSet: ['used:say_it_plainly', 'daichi_knows'],
                minRelationship: [{ characterId: 'matthias', dimension: 'trust', value: 45 }],
              },
              setsFlags: ['march_delayed'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 150,
            items: [],
            flags: ['fourth_morning_settled'],
            abilities: [],
            reputation: [{ factionId: 'faction_summoned', amount: 15 }],
          },
        },
      ],
    },
    {
      id: 'q_the_covenant',
      title: 'The Highest Skill',
      summary: 'An old law promises the heir to whichever summoned has the highest skill. The king announced the Hero. Your window has made that announcement wrong, and the princess did not ask for either of you.',
      kind: 'SIDE',
      involvedCharacterIds: ['aurelia', 'matthias', 'daichi'],
      involvedLocationIds: ['royal_garden', 'summoning_hall', 'cathedral'],
      knownRewardCopy: 'An answer about a betrothal you did not ask for, and a law older than anyone in the room.',
      discoverWhen: { flagsSet: ['covenant_raised'] },
      steps: [
        {
          id: 'the_highest',
          playerCopy: 'Decide what you do about a betrothal nobody asked you about.',
          directorNotes:
            'Aurelia is not a prize in this, and the prose must never treat her as one. Claiming the rank makes the player the court’s problem and her enemy. Declining it loudly makes Daichi her betrothed again, which he did not want either. Helping her break the law means reading it more carefully than anyone has in two hundred years.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'claimed_it',
              label: 'Claim the rank in front of the court',
              predicate: { flagsSet: ['used:say_it_plainly', 'spoke:aurelia'], atLocation: 'summoning_hall' },
              setsFlags: ['claimed_the_rank'],
              closesFlags: ['declined_the_rank'],
            },
            {
              routeId: 'declined_it',
              label: 'Decline the rank, loudly',
              predicate: { flagsSet: ['used:back_them_up', 'spoke:aurelia'] },
              setsFlags: ['declined_the_rank'],
              closesFlags: ['claimed_the_rank'],
            },
            {
              routeId: 'challenged_the_law',
              label: 'Help her break the law itself',
              predicate: {
                flagsSet: ['used:read_the_rules'],
                minRelationship: [{ characterId: 'aurelia', dimension: 'trust', value: 45 }],
              },
              setsFlags: ['covenant_challenged'],
              closesFlags: ['claimed_the_rank'],
            },
          ],
          rewards: {
            xp: 100,
            items: [],
            flags: ['covenant_decided'],
            abilities: [],
            reputation: [{ factionId: 'faction_crown', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_way_back',
      title: 'The Way Back',
      summary: 'The court says the circle only opens one way. The counter in your window, and a drawing under Selene’s worktable, both say otherwise.',
      kind: 'LEAD',
      involvedCharacterIds: ['selene', 'hask', 'daichi'],
      involvedLocationIds: ['mage_tower', 'summoning_hall', 'sealed_wing'],
      knownRewardCopy: 'Whether anyone from the bus ever sees home again.',
      discoverWhen: { flagsSet: ['error:rewrite'] },
      steps: [
        {
          id: 'find_the_return',
          playerCopy: 'Find out whether the circle can run backwards.',
          directorNotes:
            'Three ways in, and they cost different people. Selene showing the player her drawing is her trusting them with heresy. Taking it from her tower is the player deciding they do not need her trust. The east wing is where Hask’s skill broke, and finding the answer there means finding out what he was.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'selene_shows_you',
              label: 'Get Selene to show you the circle under her table',
              predicate: { minRelationship: [{ characterId: 'selene', dimension: 'trust', value: 60 }] },
              setsFlags: ['knows:return_circle'],
              closesFlags: ['took_her_drawing'],
            },
            {
              routeId: 'took_the_drawing',
              label: 'Take her drawing without asking',
              predicate: { hasItems: ['return_sketch'] },
              setsFlags: ['knows:return_circle', 'took_her_drawing'],
              closesFlags: [],
            },
            {
              routeId: 'the_east_wing',
              label: 'Find what the last skill left in the east wing',
              predicate: { flagsSet: ['knows:hask_origin'], atLocation: 'sealed_wing' },
              setsFlags: ['knows:return_circle', 'hask_wants_home'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['return_known'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'who_goes',
          playerCopy: 'Decide who goes through the circle, if anyone.',
          directorNotes:
            'Opening the circle at full load is the biggest thing the skill does, and it costs the most static. Going home is not a win and staying is not a defeat. What matters is who the player leaves, and who they send. Daichi has a ring in his pocket. Hask has been away for twenty-two years. The king loses his army either way.',
          enterWhen: { flagsSet: ['knows:return_circle', 'error:full'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'sent_them_home',
              label: 'Send everyone from the bus home, and stay',
              predicate: { flagsSet: ['used:open_the_circle', 'the_bus_knows'], atLocation: 'summoning_hall' },
              setsFlags: ['sent_the_bus_home'],
              closesFlags: ['went_home', 'circle_kept_shut'],
            },
            {
              routeId: 'went_home',
              label: 'Go home yourself',
              predicate: { flagsSet: ['used:open_the_circle'], atLocation: 'summoning_hall' },
              setsFlags: ['went_home'],
              closesFlags: ['circle_kept_shut'],
            },
            {
              routeId: 'kept_it_shut',
              label: 'Keep the circle shut',
              predicate: { flagsSet: ['knows:return_circle', 'used:say_it_plainly'] },
              setsFlags: ['circle_kept_shut'],
              closesFlags: ['went_home', 'sent_the_bus_home'],
            },
          ],
          rewards: {
            xp: 220,
            items: [],
            flags: ['way_back_decided'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_the_circle_goes_dark',
      atWorldMinute: 12 * 60 + 20,
      locationId: 'summoning_hall',
      publicCopy: 'The summoning circle in the hall floor, which has glowed faintly for a hundred years, goes dark under your feet and stays dark.',
      directorNotes:
        'The circle losing its authority to the player. Selene says loudly that it is resting. The king looks at her and says nothing. Hask writes it down. Nobody tells the player what it means.',
      setsFlags: ['circle_dead'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_the_audit_notice',
      atWorldMinute: 15 * 60,
      locationId: 'guest_wing',
      publicCopy: 'A Church clerk nails a notice to the guest-wing door: one unregistered skill, held by one summoned, will be audited at the Cathedral at the ninth bell on the third morning.',
      directorNotes:
        'Hask’s doing, and entirely lawful. Everyone from the bus reads it, and most of them look at the player. Daichi takes it down and folds it into his pocket, which helps nobody.',
      setsFlags: ['audit_called'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_the_welcome_banquet',
      atWorldMinute: 19 * 60,
      locationId: 'summoning_hall',
      publicCopy: 'The court holds a welcome banquet for the summoned at long tables set over the dark circle, and a councillor asks, loudly, whether the ERROR outranks the Hero.',
      directorNotes:
        'The Covenant of the Highest comes out in public. Aurelia answers the councillor before her father can, in one sentence that ends the subject. Daichi laughs too loudly. The king watches the player.',
      setsFlags: ['covenant_raised'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'aurelia', toLocationId: 'summoning_hall' },
        { characterId: 'daichi', toLocationId: 'summoning_hall' },
        { characterId: 'matthias', toLocationId: 'summoning_hall' },
        { characterId: 'selene', toLocationId: 'summoning_hall' },
      ],
    },
    {
      id: 'we_the_lamps_die',
      atWorldMinute: 1440 + 2 * 60 + 10,
      locationId: 'guest_wing',
      publicCopy: 'Every lamp in the guest wing goes out at once, and for two seconds every sleeping summoned’s status window opens by itself in the dark, all of them flickering red at the edges.',
      directorNotes:
        'Static from the player’s skill, leaking while they sleep. It only happens once the skill can already break things. Hask’s lens catches it from the Cathedral, and by morning he knows the skill is growing.',
      setsFlags: ['the_static_spread'],
      cancelledByFlags: [],
      requiresFlags: ['error:crash'],
      movesCharacters: [],
    },
    {
      id: 'we_the_red_door',
      atWorldMinute: 1440 + 23 * 60,
      locationId: 'palace_gallery',
      publicCopy: 'At the east end of the long gallery, a doorway that was plastered over twenty-two years ago shows through the plaster in thin red lines, the same red as your window.',
      directorNotes:
        'The east wing remembers the last skill like this one. The outline stays until morning, and the plaster gives if pushed. Hask stands in front of this door every evening and will see it.',
      setsFlags: ['found_the_sealed_door'],
      cancelledByFlags: [],
      requiresFlags: ['error:crash'],
      movesCharacters: [],
    },
    {
      id: 'we_the_rider',
      atWorldMinute: 2 * 1440 + 9 * 60,
      locationId: 'summoning_hall',
      publicCopy: 'A rider in a torn grey cloak is carried into the hall: the tear in the sky over the northern pass has doubled in a night, and the king orders the march for the fourth morning, no later.',
      directorNotes:
        'The Breach is real and the dead are real. This is the king at his most sympathetic and his most dangerous, and it puts a clock on Daichi and everyone else from the bus.',
      setsFlags: ['march_ordered'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_the_audit',
      atWorldMinute: 3 * 1440 + 9 * 60,
      locationId: 'cathedral',
      publicCopy: 'The Cathedral bell rings nine. At the foot of the Great Register a stone tablet has been left blank, with your name carved above it.',
      directorNotes:
        'The Audit. Hask presides, the king attends, Aurelia attends if she has any reason to, and Selene testifies only if asked. Hask will not begin without the player, and will send knights if they do not come.',
      setsFlags: ['audit_morning'],
      cancelledByFlags: ['audit_done'],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'hask', toLocationId: 'cathedral' },
        { characterId: 'matthias', toLocationId: 'cathedral' },
      ],
    },
    {
      id: 'we_the_march',
      atWorldMinute: 4 * 1440 + 7 * 60,
      locationId: 'training_yard',
      publicCopy: 'Twenty-nine summoned in borrowed armour form up in the knights’ yard to march north. Some of them are crying. None of their feet will stop.',
      directorNotes:
        'The oath at work: they were ordered, so they go. Daichi leads them because he was told to. If the player has done nothing about the oath, this happens in front of them.',
      setsFlags: ['bus_marched'],
      cancelledByFlags: ['bus_unsworn', 'sent_the_bus_home'],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'daichi', toLocationId: 'training_yard' }],
    },
  ],
  promises: [
    {
      id: 'p_the_real_name',
      kind: 'FINALE',
      label: 'What the skill actually is',
      seedHint: '[ERROR: skill too large to display], with a small counter beside it that reads 3% loaded.',
      payoffHint: 'At a hundred percent the window prints the real name, [Summoner]: the authority that opens the circle, in either direction.',
      weight: 1,
    },
    {
      id: 'p_why_she_went_pale',
      kind: 'MYSTERY',
      label: 'Why the court mage went white',
      seedHint: 'She read your window and her face changed before anyone else in the hall had reacted.',
      payoffHint: 'One line under the error: "Circle authority: transferred to holder." Her circle is dark because you are carrying it.',
      weight: 0.9,
    },
    {
      id: 'p_what_daichi_swore',
      kind: 'RELATIONSHIP',
      label: 'What Daichi swore',
      seedHint: 'He knelt first, and now he agrees to orders half a second before he finishes disagreeing with them.',
      payoffHint: 'A line in his window he cannot see: "Will not refuse a royal order."',
      weight: 0.85,
    },
    {
      id: 'p_the_audit',
      kind: 'BOSS',
      label: 'The Audit on the third morning',
      seedHint: 'A notice on the guest-wing door, and a man with one black glove who looks at your window as if he has seen one before.',
      payoffHint: 'Hask’s own window: Origin, summoned. Skill, [SEALED]. Twenty-two years ago the last skill like yours was his.',
      weight: 0.8,
    },
    {
      id: 'p_the_highest_skill',
      kind: 'THEME',
      label: 'The princess and the highest skill',
      seedHint: 'An old law promises the heir to the summoned with the highest skill, and the princess wears a sword to court.',
      payoffHint: 'Her skill line is empty. She was born with nothing, and the Register says otherwise in Hask’s handwriting.',
      weight: 0.7,
    },
  ],
  archetypes: [
    {
      id: 'arch_sales',
      name: 'You Sold Things',
      role: 'Sales: talk, charm and closing',
      summary: 'You spent your days getting strangers to agree with you before lunch, which turns out to work on courtiers, knights and one very tired king.',
      playstyle: ['Talks well', 'Reads people', 'Bluffs'],
      blurb: 'Six years of client lunches taught you to smile through anything and to hear the exact moment a no turns into a maybe.',
      attributeBonus: { presence: 3, resolve: 1 },
      skillProficiencies: { smalltalk: 3, insight: 1, composure: 1 },
      startingItems: [{ itemId: 'business_cards', qty: 1 }],
      startingAbilities: ['read_window', 'play_the_part'],
      startingReputation: [{ factionId: 'faction_crown', amount: 5 }],
    },
    {
      id: 'arch_ops',
      name: 'You Ran the Paperwork',
      role: 'Operations: rules, forms and process',
      summary: 'You kept the office running by knowing which form went where and which rule nobody had read, and a kingdom is mostly forms.',
      playstyle: ['Careful', 'Finds the clause', 'Patient'],
      blurb: 'You have read every policy your firm ever wrote, including the ones the people who wrote them never read.',
      attributeBonus: { mind: 3, resolve: 1 },
      skillProficiencies: { fine_print: 3, composure: 1, insight: 1 },
      startingItems: [{ itemId: 'work_notebook', qty: 1 }],
      startingAbilities: ['read_window', 'read_the_rules'],
      startingReputation: [{ factionId: 'faction_register', amount: 5 }],
    },
    {
      id: 'arch_support',
      name: 'You Fixed the Systems',
      role: 'IT support: errors, logs and patience',
      summary: 'You spent years staring at error messages until they told you what was actually wrong, so a skill called ERROR feels almost familiar.',
      playstyle: ['Technical', 'Calm in a crisis', 'Pushes buttons'],
      blurb: 'Turning it off and on again is a real strategy, and you have the incident reports to prove it.',
      attributeBonus: { arcana: 2, mind: 2 },
      skillProficiencies: { control: 3, insight: 2 },
      startingItems: [{ itemId: 'dead_phone', qty: 1 }],
      startingAbilities: ['read_window', 'size_them_up'],
      startingReputation: [],
    },
    {
      id: 'arch_floor',
      name: 'You Worked the Warehouse',
      role: 'Logistics: stamina, nerve and hustle',
      summary: 'You ran the loading floor and the late shift, so you are fitter than anyone else from the bus and very good at being somewhere you are not supposed to be.',
      playstyle: ['Physical', 'Quick exits', 'Keeps going'],
      blurb: 'Ten-hour shifts and a supervisor who never checked the back stairs made you hard to tire and hard to find.',
      attributeBonus: { might: 2, agility: 2 },
      skillProficiencies: { overtime: 3, slipping_out: 2 },
      startingItems: [{ itemId: 'clear_umbrella', qty: 1 }],
      startingAbilities: ['read_window', 'slip_away'],
      startingReputation: [{ factionId: 'faction_summoned', amount: 5 }],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What name is on your ID badge?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Sam Okafor' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. he/him' },
    {
      id: 'archetype',
      label: 'What did you do at the firm?',
      helpText:
        'Your job at the logistics firm you were riding to when the bus went white. It sets what you are good at in this world, on top of the ERROR, and it is fixed for the whole story. It does not decide whether you kneel, what you do with the skill, or who you trust. All of that is yours.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'appearance',
      label: 'What does the court see on the marble?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. A rumpled suit, one shoe untied, still holding the coffee I bought at the bus stop.',
    },
  ],
  /**
   * Where this can end up.
   *
   * Five of twelve are losses: owned, sealed, marched north, run off, and the
   * skill outgrowing its holder. "Over the Wall" is walking away and is open
   * from early on. The two going-home endings need the skill fully loaded;
   * everything else is reachable without ever opening the circle.
   */
  endings: [
    {
      id: 'end_the_crowns_weapon',
      name: 'The Crown’s Weapon',
      rarity: 'COMMON',
      minTurn: 25,
      requires: { flagsSet: ['registered_to_crown'], flagsUnset: ['went_home'] },
      condition:
        'The Audit registered the skill to the Crown. The player is not sworn, but they are owned: guarded, housed, consulted and pointed north. Write it as comfortable and cold. Nobody is cruel to them, and every door they open has a knight behind it.',
      epilogue:
        'The Register gives the ERROR a tablet of its own, carved with the Crown’s mark and no rank. The king is courteous every single day. The north holds that winter, and nobody ever asks the player whether they wanted it to.',
      hint: '',
    },
    {
      id: 'end_sealed',
      name: 'Sealed',
      rarity: 'COMMON',
      minTurn: 25,
      requires: { flagsSet: ['sealed'] },
      condition:
        'Hask sealed the skill with the brand. The red line in the window now reads [SEALED], the static stops, and the circle in the hall floor lights again that afternoon. Write the relief and the loss together, and let Hask be the one who stays in the room afterwards.',
      epilogue:
        'The player lives in the lower city with a coin-sized scar on the back of one hand and an ordinary job that pays. The court summons again within the year. Hask visits on the first of every month, sits for an hour, and never once says he is sorry, which is how they both know he is.',
      hint: '',
    },
    {
      id: 'end_north_with_the_others',
      name: 'North With the Others',
      rarity: 'COMMON',
      minTurn: 30,
      requires: { flagsSet: ['bus_marched', 'marched_north'] },
      condition:
        'The bus marched and the player went with them, the only unsworn person in a sworn column. This is a loss and a loyalty at once. Write the road, the cold, and what it is like to be the one person in the column who could turn round.',
      epilogue:
        'The pass is worse than the reports. The player’s static crashes three grey beasts in the first week and one friendly fire spell in the second. Daichi writes a letter every night to someone who cannot receive it, and reads them out loud to the player when he cannot sleep.',
      hint: 'The march is on the fourth morning.',
    },
    {
      id: 'end_over_the_wall',
      name: 'Over the Wall',
      rarity: 'UNCOMMON',
      minTurn: 18,
      requires: { flagsSet: ['left_the_map'], flagsUnset: ['audited'] },
      condition:
        'The player walked out of the city before anyone could audit, seal or own the skill. It is a coherent answer to being kidnapped by a kingdom, and it costs the people left behind. Do not punish it and do not redeem it.',
      epilogue:
        'There is a reward posted for an unregistered skill in every market town in Ostmere, with a description that matches nobody, because nobody at court could agree what the player looked like. Somewhere along the north road, lamps in roadside inns stutter red for a second when a stranger walks in.',
      hint: '',
    },
    {
      id: 'end_too_large_to_display',
      name: 'Too Large to Display',
      rarity: 'UNCOMMON',
      minTurn: 30,
      requires: { flagsSet: ['the_static_spread', 'error:full'], flagsUnset: ['sealed', 'went_home'] },
      condition:
        'Only if the player pushed the skill to full load while the static was already spreading through the palace, and kept going. The world breaks where they stand the way the east wing did. This is the loss the whole court was afraid of. Write who gets hurt, by name, and do not make it the player.',
      epilogue:
        'They plaster over a second wing. Hask writes the Audit report himself and does not sign it. The circle stays dark. In the lower city they say the summoned who broke the palace is still in there somewhere, and on certain nights the windows of the west wing glow a faint, patient red.',
      hint: '',
    },
    {
      id: 'end_the_hero_quits',
      name: 'The Hero Quits',
      rarity: 'UNCOMMON',
      minTurn: 28,
      requires: {
        flagsSet: ['freed_daichi'],
        minRelationship: [{ characterId: 'daichi', dimension: 'trust', value: 55 }],
      },
      condition:
        'The player deleted the oath from Daichi’s window and he chose for himself for the first time since the bus. What he chooses is his. Write the moment he refuses a royal order and his body does not lock, and what it costs him to be the person who decides.',
      epilogue:
        'Daichi goes north anyway, unsworn, because the north is real and he is good at it. He takes the cloak off at the city gate and folds it over his arm. The ring stays in his jacket pocket, and on the first clear night at the pass he finally looks at it for longer than a second.',
      hint: '',
    },
    {
      id: 'end_unregistered',
      name: 'Unregistered',
      rarity: 'RARE',
      minTurn: 32,
      requires: { flagsSet: ['unregistered', 'audit_done'], flagsUnset: ['sealed', 'registered_to_crown'] },
      condition:
        'The player came through the Audit with the skill unwritten. The Church will officially pretend it does not exist, which is freedom with no protection at all. Write the first morning of a life in which the most powerful thing in the kingdom has to find a flat.',
      epilogue:
        'The blank tablet stays blank. The player rents two rooms above a bakery in the lower city and is consulted, quietly and without anyone admitting it, by the Church, the court and two guilds. Every summoned in Ostmere knows where to find them.',
      hint: '',
    },
    {
      id: 'end_two_names_in_the_margin',
      name: 'Two Names in the Margin',
      rarity: 'RARE',
      minTurn: 32,
      requires: {
        flagsSet: ['selene_testifies', 'measured_by_selene'],
        minRelationship: [{ characterId: 'selene', dimension: 'trust', value: 65 }],
      },
      condition:
        'Selene measured the skill and testified for it, and the two of them become the first honest study of how status windows actually work. Partners in the tower, and possibly more, at whatever pace the player sets. Write it as two people who are very good at the same strange thing.',
      epilogue:
        'The tower acquires a second worktable and a second cot. Selene publishes, under both names, the first paper the Church has ever been unable to answer. The return circle stays chalked under the table, finished now, waiting for the day either of them wants it.',
      hint: '',
    },
    {
      id: 'end_her_own_crown',
      name: 'Her Own Crown',
      rarity: 'RARE',
      minTurn: 35,
      requires: {
        flagsSet: ['covenant_challenged', 'aurelia_stands_with_you'],
        minRelationship: [{ characterId: 'aurelia', dimension: 'trust', value: 65 }],
      },
      condition:
        'The Church ruled that a skill with no rank cannot be the highest, the Covenant broke, and Aurelia is heir in her own name. This is her victory, not the player’s, and the prose should know it. What she offers the player afterwards is her choice to make.',
      epilogue:
        'The Covenant tablet is moved from the Register to a museum case. Aurelia is crowned at twenty-six with a sword at her hip and no husband beside her. Her first act as queen is to have the Oath Seal melted down in front of the court.',
      hint: '',
    },
    {
      id: 'end_everyone_off_the_bus',
      name: 'Everyone Off the Bus',
      rarity: 'RARE',
      minTurn: 38,
      requires: { flagsSet: ['sent_the_bus_home'], flagsUnset: ['went_home'] },
      condition:
        'The player opened the circle and sent everyone from the bus home, and stayed. Write the goodbyes one at a time, Daichi last. The court loses its army in an afternoon, and the person who did it is still standing in the hall when the light goes out.',
      epilogue:
        'Thirty people get off a bus at a stop in the rain and have no idea how to explain the next six months. One of them proposes that night. The circle in the hall stays dark after that, and the player keeps the only key to it.',
      hint: '',
    },
    {
      id: 'end_the_742',
      name: 'The 7:42',
      rarity: 'UNIQUE',
      minTurn: 38,
      requires: { flagsSet: ['went_home'] },
      condition:
        'The player opened the circle and went home. Who came with them, and who stayed, is decided by everything before this. Write the bus, the rain and the ordinary morning, and let the last line be something small that proves it happened.',
      epilogue:
        'The bus is exactly where it was. The phone has four percent and suddenly a signal. On the way into the office the player passes a convenience store with a chime on the door, stops, and buys a second coffee for a man who is twenty-two years late.',
      hint: 'It opens in either direction.',
    },
    {
      id: 'end_hasegawa_ren',
      name: 'Hasegawa Ren',
      rarity: 'UNIQUE',
      minTurn: 36,
      requires: {
        flagsSet: ['hask_spared_it', 'hask_wants_home'],
        minRelationship: [{ characterId: 'hask', dimension: 'trust', value: 60 }],
      },
      condition:
        'Hask left the skill unwritten, and then asked the player for the one thing he stopped letting himself want. Whether they can give it to him depends on the circle. Write a forty-three-year-old man saying his own name out loud for the first time in twenty-two years.',
      epilogue:
        'He takes the glove off before he goes. The Church records his departure as a retirement. At the Cathedral, a new Inquisitor finds his last report on the Great Register, one page, procedurally perfect, ending with a sentence that is not procedure at all: "It could have been held."',
      hint: '',
    },
  ],
  opening:
    "The king reads the skills off a long scroll.\n\n\"Hero.\" Daichi, your coworker, still wearing his office lanyard, goes red to the ears as the hall applauds.\n\n\"Saint.\" \"Sword Saint.\" More applause.\n\nDaichi leans back to you. \"What did you get? Tell me it’s something good.\"\n\nThe king reaches your line and stops reading.\n\nA blue window opens in the air in front of you, one line stuttering red:\n\n[ERROR: skill too large to display]\n\nBeside the throne, the silver-haired court mage reads it, and goes white.\n\nNobody claps.\n\nTwenty-nine people from your bus are already kneeling on the marble. Daichi kneels with them.\n\nThe king rolls up the scroll.\n\n\"Kneel,\" he says, \"and show us.\"",
  openingPanel: {
    assetKey: 'story_skill_error/opening',
    alt: 'Selene beside the throne, silver hair and navy-gold robe, staring white-faced at a glitching blue window in the air before you while the summoned crowd kneels on the marble.',
  },
  openingSuggestions: [
    "\"I’ll show you. First tell me what kneeling does.\"",
    'I kneel beside Daichi and keep the red window open where the court can see it.',
    'I stay standing and touch the red line with one finger.',
  ],
  coverDirection: [
    'SUBJECT: Selene Varre, the court mage, alone and unmistakable in the foreground of a key visual for a fantasy anime about a summoning gone wrong.',
    'She fills the frame from the waist up, centred and close, holding about two thirds of the picture.',
    'Long straight silver hair with a few thin braids worked through it, violet eyes, a dark navy and gold high-collared court mage’s robe with a silver chain across the chest, fitted dark gloves.',
    'One gloved hand is raised toward a floating translucent blue status window in front of her; the other hand grips a tall pale-wood staff topped with a ring of clear crystal.',
    'The status window hangs in the air between her and the viewer, cracking and glitching, red shards and static spilling off its broken edges.',
    'It shows only abstract glowing bars and one red warning triangle: no letters, no numbers, nothing that reads as writing.',
    'Her expression is alarmed and fascinated at once, eyes wide, lips parted, looking straight at the viewer.',
    'HER FACE STAYS CLEAN: no red marks, glitch lines, static or shadows on her face or skin.',
    'Every red glitch effect stays on the status window and on the title, never on her face.',
    'BEHIND HER, soft and secondary: a vast fantasy throne-room summoning hall, a marble floor with a large glowing summoning circle,',
    'tall stained-glass windows, hanging banners, and a throne in soft focus.',
    'LIGHT: cool cyan light from the status window across her face and gloves, warm gold light from the hall behind her, so she is rimmed in gold and lit in blue.',
    'TITLE: the words SKILL: ERROR painted into the art in the upper third as a bold condensed game-interface logo, white with a cyan glow,',
    'spelled exactly SKILL: ERROR, large and legible at thumbnail size. A red glitch slice cuts through the word ERROR only. No other text anywhere.',
  ].join(' '),
  publishedAt: '2026-11-22T18:19:46.004Z',
};

export const SKILL_ERROR = StoryVersion.parse(raw);
