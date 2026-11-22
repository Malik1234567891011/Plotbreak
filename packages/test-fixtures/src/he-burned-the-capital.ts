import { StoryVersion } from '@plotbreak/contracts';

/**
 * "He Burned the Capital" — the most dangerous man in the kingdom, asking.
 *
 * The OOC evidence for this slot is an obsessive male lead whose devotion is
 * measured in what he destroys. That fantasy sells, and on a 13+ shelf it has
 * one failure mode: a man who takes what he wants is a threat, not a romance.
 * So the scale of the obsession stays and the lock turns the other way. Lucien
 * Ardent burned a city for the player, and he takes no for an answer. Both are
 * hard canon from the first line, and "Come home. Or tell me no." is a real
 * question with two real answers.
 *
 * Playable span is three to five days at a mountain convent, starting at 21:40
 * on the night he arrives. The betrothal, the running and the fire are
 * backstory carried by hard canon, by six people who each know a different
 * piece of it, and by the burned townspeople who reach the infirmary an hour in.
 * The crown's riders are at the gate at seven on the second morning; the army
 * marches north on the fourth unless somebody stops it.
 *
 * The rumour is the mystery. Every rider says he burned the capital looking for
 * the player. What he actually burned was one building, to destroy one writ
 * that would have tried the player for treason, and the fire got away from him
 * and nine people died. What nobody knows is that the writ was not there: the
 * kind prince who helped the player run took it out the day before and told
 * Lucien where to find it. The person to be afraid of is not the man in the
 * doorway, and the man in the doorway is still responsible for nine deaths.
 * The story never lets either of those cancel the other.
 *
 * The protagonist is BLANK: the player names themselves. The slate pitches a
 * runaway noblewoman, so the pronoun placeholder is she/her, and no authored
 * line depends on it.
 *
 * Three invisible variables. Composure is the one honest restorable resource,
 * because `resolveRest` refills every GOOD_HIGH. Pursuit is first of the
 * descending two on purpose: PUBLIC_VIOLENCE raises the first GOOD_LOW, and a
 * fight in a convent is exactly what brings the crown. Smoulder is how close
 * his fire is to the surface, and nothing the player says by way of "no"
 * raises it.
 *
 * The system has to live where the storyteller can read it. Production runs
 * `runTurnPure`, which never sees resources, revealHints, step notes or any
 * ability except the chosen archetype's starting ones. So how each of the
 * three pressures moves, when each secret comes out, and the 13+ line are all
 * hard canon; the player starts wearing the guest's cord, a quest item that
 * carries the house rule; and every archetype starts with both answers to his
 * question plus one move of its own. The tone guide is also the cover's mood
 * text, so it says how the story feels and nothing about knives, wounds or
 * where the romance stops.
 */

const raw = {
  id: 'sv_he_burned_the_capital_1',
  storyId: 'story_he_burned_the_capital',
  version: 1,
  title: 'He Burned the Capital',
  fantasyLabel: 'He burned a city. Now he is asking.',
  hook: 'You ran from your betrothal to the most dangerous man in the kingdom. Three nights ago he burned the capital looking for you. Tonight he is standing in the convent doorway, holding out your ring.',
  premise:
    'A year ago, by royal decree, you were betrothed to the most dangerous man in the kingdom: Lucien Ardent, the grand duke who holds the northern passes, whose family’s blood answers to fire. The marriage was the crown’s leash on the north, and you were the knot in it.\n\n' +
    'Nineteen days ago, eleven days before the wedding, you ran. Your maid came with you. The king’s second son paid for the horses and named a place to hide: Stillwater, a convent on a mountain lake, where the sisters keep an old rule that nobody can be taken out through their gate by force.\n\n' +
    'Running from a royal betrothal is defiance of the crown. The king signed a writ: if you were not back within a month, you would be tried for treason and your family would lose its lands.\n\n' +
    'Three nights ago the capital burned. The fire started in the hall where the crown keeps its writs and took the upper city before morning. Nine people died, and thousands lost their homes.\n\n' +
    'The crown says the grand duke did it in a rage, hunting for you. It has named him a traitor, and a judge is on the south road with forty riders and a warrant for you both.\n\n' +
    'Tonight he walked into the convent chapel with ash on his coat and your ring in his hand. He stopped at the door, because the sisters’ rule says he must. He asked you to come home, or to tell him no.\n\n' +
    'So now you have to decide what you owe a man who burned a city for you, and whether that was love or the most dangerous thing anybody has ever done in your name. Find out what really burned before the riders reach the gate. Somebody you trust has been lying to you.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Romance', 'Fantasy', 'Drama', 'Mystery'],
  mechanicsChips: [
    'He takes no for an answer',
    'A city burned for you',
    'Riders at dawn',
    'Somebody lied to you',
    'Twelve ways it ends',
  ],
  contentDescriptors: ['ROMANCE', 'FANTASY_VIOLENCE', 'PSYCHOLOGICAL_THEMES', 'MORAL_AMBIGUITY', 'PERMANENT_DEATH', 'ALCOHOL_REFERENCES'],
  intensity: 'MODERATE',
  creatorNote:
    'He is the most dangerous man in the kingdom and he is asking. Everything here turns on that: he will not take you anywhere you do not choose to go, and the whole kingdom is about to make that choice very hard. Say yes, say no, run, or make him answer for the nine people who died first. All of it is a real way to play, and so is finding out who actually lit the match.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: true,
    allowsRomance: true,
    startingLocationId: 'stillwater_chapel',
    startWorldMinute: 21 * 60 + 40,
    startingItems: [
      { itemId: 'mothers_knife', qty: 1 },
      { itemId: 'travel_purse', qty: 1 },
      { itemId: 'guests_cord', qty: 1 },
    ],
    hardCanon: [
      'Everyone in this story is an adult. The player is twenty-two. Grand Duke Lucien Ardent is twenty-nine, Prince Remy twenty-six, Mara Ferrand twenty-four, Sister Agathe sixty-one, Captain Ottilie Ferrand thirty-six and Justiciar Isaure Dane forty-eight. Everybody else who appears or is mentioned is an adult too: the King and his elder son, the Archbishop, the riders, the sisters and novices, the villagers and the burned from the capital. No children appear in this story.',
      'Esterre is a kingdom; its capital, Aubrais, is a river city of bridges. The northern passes and the fortress of Hollowfell belong to the Grand Dukes Ardent. Stillwater is a convent of forty sisters with an infirmary, on a mountain lake a day’s ride north of the capital. Mossford is the village at the foot of the lake.',
      'A year ago, by royal decree, the player was betrothed to Grand Duke Lucien Ardent and wore his family’s betrothal ring at a rite in the capital. The decree was the crown’s way of binding the north to it.',
      'Nineteen days before the story begins, eleven days before the wedding, the player ran, with their maid Mara Ferrand. Prince Remy, the King’s second son, paid for the horses and chose Stillwater. The player left the betrothal ring on a pillow and has been a guest of the convent under a borrowed name ever since.',
      'The player carries their mother’s knife, a slim horn-handled blade and the one thing of hers they took when they ran; the purse Prince Remy pressed on them that night, with eleven gold crowns left in it; and, knotted at the wrist, the white guest’s cord Sister Agathe tied the night they arrived.',
      'Under the old law, breaking a royal betrothal is defiance of the crown. The King signed a Writ of Forfeiture: unless the player returned within a month, they would be tried for treason and their family’s lands forfeit. The player learned of it from Remy’s letter four days ago.',
      'Three nights before the story begins, Lucien set fire to the Hall of Seals in Aubrais, where the crown keeps its writs, to destroy that writ. He rang the alarm bells himself first. The wind took the fire across the upper city: the Hall, the Exchequer, the palace’s west wing and the Street of Lamps. He held it off the river quarter for six hours until he collapsed and Captain Ottilie carried him out. Nine people died. Thousands lost their homes.',
      'The Ardent line carries the Oathfire, an oath sworn with fire three hundred years ago: candle flames lean toward the Grand Duke when he comes into a room, he can set alight anything he can see, and he can put out any fire he has lit. It burns him to use it. He called it at full strength in the capital; his hands are burned to the wrist under his gloves, and a second full calling this season would very likely kill him, as it killed his father. Only Ottilie knows that for certain; Sister Agathe, who nursed his father, has guessed it from the gloves.',
      'The first Duchess Ardent took the veil at Stillwater as a widow and wrote in her psalter, now in the bell-tower book chest, the Banked Word: spoken by the person the Grand Duke is betrothed or married to, it puts out every fire he has lit and holds his fire quiet for a day. The player is still that person. Nobody has told them.',
      'The writ was never in the Hall of Seals. Prince Remy took it out the day before the fire, then told Lucien where it was kept, wanting him to burn the Hall and be ruined for it. The writ is folded in four in Remy’s saddlebag at the inn in Mossford. Justiciar Isaure Dane has dug the writ’s iron case out of the ashes: locked, unburned and empty.',
      'Stillwater’s house rule: nobody may be taken out through its gate by force, by king or duke, and no armed man crosses its threshold uninvited. A guest is sheltered only while the sisters choose to keep them, and wears the guest’s cord the prioress ties until the prioress cuts it. A novice who takes the grey veil is sheltered absolutely, for a year and a day.',
      'Lucien will not take the player anywhere by force and will not let anybody else do it. If the player tells him no and means it, he accepts it. His private plan, if that happens, is to give himself up to the Justiciar so the crown has its traitor and the army never marches on the north.',
      'Mara Ferrand is Captain Ottilie Ferrand’s younger sister and has written to her every week since the player ran, so that somebody would know where they were. That is how Lucien found the player. He knew for twelve days and did not come, until the fire made it urgent.',
      'The crown says Lucien burned the capital in a jealous rage hunting his runaway betrothed. It has declared him a traitor and is mustering an army to march north on the fourth morning. Justiciar Isaure Dane rides ahead of it with forty riders and a warrant for them both, and reaches Stillwater’s gate at seven on the second morning.',
      'Sister Agathe holds an order from the Archbishop: surrender the player to the crown, or Stillwater loses its charter, its infirmary and its forty sisters’ home. She has not decided and has told nobody.',
      'The player is running on very little. Hard conversations, lies, running and long hours in the infirmary wear them down; a night’s sleep, a meal or a bowl of Agathe’s willow-bark tea puts it back. Worn out, they cannot lie convincingly or hold a line under a stare, and they agree to things to make a conversation stop.',
      'The crown closes in whatever anybody does: torches on the south road before the second dawn, the Justiciar at the gate at seven, the army on the fourth morning. Anything loud brings it faster: a fight inside the walls, a chase through Mossford, a fire, a sighting at the ferry. Inside the gate the house rule holds the riders off; outside it, every trip is watched and reported, and by the second day the Mossford road and the ferry are held.',
      'Lucien’s fire answers to provocation, never to refusal. A knife drawn on him, a lie told to his face, or being made to go through the nine again brings it closer to the surface: candles gutter toward him, the air near him turns warm in a cold room, and Ottilie stays within arm’s reach of him. A plain no never does. Left alone it settles, and at rest he is dry, gentle and unguarded. At the very edge, anybody who threatens the player is in real danger, and so is he.',
      'Secrets come out when the player earns them, not when a scene goes slow. Lucien takes a glove off only for somebody who has asked about him rather than about the fire, and never on the first night. Sister Agathe opens the psalter only for somebody who already knows about his hands. Prince Remy admits the writ only with the writ or the empty case in front of him. Mara confesses the letters when she is asked straight how he found the player.',
      'Remy’s part in the fire is the story’s central secret. Nobody but Remy knows it at the start, and it surfaces only through evidence the player finds (the saddlebag, the empty case, Mara’s note), never through narration or another character guessing.',
      'A yes does not mean riding tonight: the pass is two days away, his riders are spent, and carrying off a person named in a crown warrant is the war he came to prevent, so a yes keeps everybody at Stillwater through the first night.',
      'If the player draws a knife on him, he does not defend himself and does not let his riders do it for him.',
      'Romance here can be flirtatious, tense and heartfelt, up to a kiss, and no further. No sexual content, no undressing, no lingering on bodies. The fire is shown by smoke, bells, ash and the colour of the sky; the burned by bandages, coughs and what they carried out, never the wound. The nine are named and grieved, never described.',
    ],
    toneGuide:
      'Romance fantasy with a court mystery underneath, played close and specific: candle flames, wet stone, the smell of smoke on wool, a bucket handed over a threshold. ' +
      'Lucien is frightening because of what he did and how still he is, never because he takes anything. He asks, every time, and a no is honoured on the page. His devotion shows in what he has already done and in what he refuses to do. ' +
      'The fire is a real moral weight, and nobody in this story is allowed to make it cosy, including the man who lit it. ' +
      'Slow-burn and heartfelt: a held look across a threshold, a coat put round somebody’s shoulders, one true sentence said badly. ' +
      'Remy is warm and funny and his argument against Lucien is a good one; let the player like him. Jokes land, mostly from Agathe and Ottilie. If a scene has nothing at stake, keep it short. The face at the top of a beat is Lucien’s whenever he is in the scene.',
    proseStyle: 'webnovel',
    styleExamples: [
      "The camp fire leans toward him when he sits down. He does not seem to notice. He stopped noticing years ago, the way other people stop noticing their own heartbeat.\n\n\"Ask,\" he says.\n\n\"How many?\"\n\n\"Nine.\" No pause. \"A baker. Two clerks from the Exchequer. A lamplighter and his grown son.\" He keeps going until there are nine, and then he stops, and his gloved hands stay very still on his knees.\n\n\"You could have lied.\"\n\n\"To you?\" He looks at you then. \"No. I could not.\"",
      "Sister Agathe meets the captain at the gate with a bucket.\n\n\"No swords over the step,\" she says.\n\n\"I am not crossing the step.\" Ottilie Ferrand is standing exactly on it. \"I am delivering a message.\"\n\n\"Then deliver it from there and carry this while you do. The burned need water and my novices are afraid of your horse.\"\n\nOttilie looks at the bucket. Then at you, behind the nun.\n\n\"He says,\" she says, through her teeth, \"good morning.\"",
    ],
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 9, agility: 11, mind: 12, presence: 13, resolve: 12, arcana: 8 },
  skills: [
    { id: 'steel', name: 'Steel', attribute: 'resolve', description: 'Holding a line under a stare that has burned buildings. Saying no and meaning it.' },
    { id: 'court_face', name: 'Court Face', attribute: 'presence', description: 'The smile that says nothing, the lie that sounds like manners, the curtsey that buys a minute.' },
    { id: 'insight', name: 'Insight', attribute: 'mind', description: 'What somebody is doing with their hands while they tell you something else.' },
    { id: 'letters', name: 'Law and Letters', attribute: 'mind', description: 'Writs, seals, the old betrothal law, and what a document is really for.' },
    { id: 'riding', name: 'Riding', attribute: 'agility', description: 'A horse in the dark on a mountain road, or a boat on a black lake.' },
    { id: 'knifework', name: 'Knifework', attribute: 'might', description: 'Your mother’s knife, used for something other than letters.' },
    { id: 'old_lore', name: 'Old Lore', attribute: 'arcana', description: 'Chapel rites, the house rule, and what the old families swore to fire.' },
    { id: 'nursing', name: 'Nursing', attribute: 'mind', description: 'Clean water, clean linen, and keeping somebody talking while it hurts.' },
  ],
  /**
   * Three, all invisible.
   *
   * Composure is GOOD_HIGH because `resolveRest` refills those, and it is the
   * honest thing a night's sleep restores: the reserve for hard conversations,
   * lies and running. It is also what the generic cost path spends.
   *
   * Pursuit is the first GOOD_LOW on purpose. PUBLIC_VIOLENCE raises the first
   * descending resource, and a fight inside a convent is precisely the news
   * that brings the crown's riders faster. It creeps up on its own, because
   * they are coming whatever anybody does.
   *
   * Smoulder is how close his fire is to the surface. It falls on its own when
   * nothing provokes him. A knife, a lie to his face, or forcing him to recite
   * the nine raise it. A plain no never does, and that is the point of him.
   */
  resources: [
    {
      id: 'composure',
      name: 'Composure',
      max: 100,
      start: 75,
      regenPerHour: 2,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'The player has nothing left to hold their face with. Everything true comes out at once and in the wrong order, and the people around them see exactly how frightened they are. Lucien goes very quiet and very gentle, which is worse.',
      color: '#C9A227',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Worn to the bone. The player cannot lie convincingly, cannot hold a line under a stare, and agrees to things to make a conversation stop. This is the band where sitting down in the infirmary with a cup of willow tea is the right move, and where people who love the player start making decisions for them.',
        },
        {
          upTo: 60,
          behaviour:
            'Tired, and holding. The player can manage one more hard conversation tonight and is honest with themselves about not wanting two. The court smile still works on strangers and has stopped working on Mara.',
        },
        {
          upTo: 100,
          behaviour:
            'Steady. The player can meet his eyes, lie to a prince, question a judge and still notice what everybody is doing with their hands. Scenes can be long and can turn on a single sentence said well.',
        },
      ],
    },
    {
      id: 'pursuit',
      name: 'Pursuit',
      max: 100,
      start: 30,
      regenPerHour: 0.5,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'The crown has lost the trail. Riders on the south road are looking for somebody else, the warrant is a rumour in a tavern, and the player can walk through Mossford in daylight with their hood down.',
      color: '#5B7FA6',
      bands: [
        {
          upTo: 30,
          behaviour:
            'The crown is a day away and not sure where to look. Strangers in Mossford are just strangers. The player can move between the convent, the village and the lake without anybody counting.',
        },
        {
          upTo: 60,
          behaviour:
            'Riders are on the south road and somebody in the village has been paid to watch the convent gate. Every trip outside the wall is noticed and reported. The sisters start locking the orchard door at night.',
        },
        {
          upTo: 85,
          behaviour:
            'The Justiciar knows exactly where the player is and is only waiting on the house rule. Her riders hold the Mossford road and the ferry. Leaving the convent now means being seen, followed and very probably stopped.',
        },
        {
          upTo: 100,
          behaviour:
            'The net is closed. Soldiers at the gate, at the boathouse and on the north road, and an order in a sergeant’s pocket to stop waiting on the sisters. The next mistake ends in a cell in a burned city.',
        },
      ],
    },
    {
      id: 'smoulder',
      name: 'Smoulder',
      max: 100,
      start: 40,
      regenPerHour: -0.6,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'He is entirely quiet. Candle flames stand straight when he comes into the room, he sleeps for the first time in three nights, and he laughs once, briefly, at something Agathe says, and looks startled at himself.',
      color: '#B5452B',
      bands: [
        {
          upTo: 25,
          behaviour:
            'He is at rest. Flames barely notice him. He is gentle, dry, unguarded with the player and patient with everybody else, and he will talk about anything at all, including his father, including the nine.',
        },
        {
          upTo: 55,
          behaviour:
            'Controlled and watchful. Candles lean when he is angry and he steadies them on purpose. He answers exactly what is asked and keeps his gloved hands still. This is where most of the story lives.',
        },
        {
          upTo: 80,
          behaviour:
            'The fire is close under the skin. Lamps gutter toward him, the air near him is warm in a cold chapel, and Ottilie stays within arm’s reach of him without being asked. He is still courteous, and every courtesy is visibly a decision.',
        },
        {
          upTo: 100,
          behaviour:
            'One more provocation and he calls it, whatever it costs him. Every flame in sight is bent toward him and smoke rises off his coat. Anybody who threatens the player now is in real danger, and so is he, because a second full calling this season kills him.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'betrothal_ring',
      name: 'The Betrothal Ring',
      tags: ['quest', 'personal'],
      questItem: true,
      droppable: true,
      description: 'Dark red gold, a little too heavy for the finger, with a line of flame cut into the inside of the band. You left it on a pillow nineteen days ago. He has carried it ever since.',
      loreText: 'The Ardent betrothal ring is what the fire in his blood recognises. While it exists and you once wore it at the rite, the Oathfire knows your voice.',
      icon: 'ring',
    },
    {
      id: 'treason_writ',
      name: 'The Writ of Forfeiture',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'One page of royal vellum under the King’s seal: if the runaway is not returned within a month, they are to be tried for treason and their family’s lands forfeit to the crown.',
      loreText: 'Every soul in the kingdom believes this burned in the Hall of Seals. It is folded in four in a prince’s saddlebag at the inn in Mossford.',
      icon: 'scroll',
    },
    {
      id: 'empty_writ_case',
      name: 'The Empty Writ-Case',
      tags: ['quest', 'evidence'],
      questItem: true,
      description: 'A fire-blackened iron document case from the Hall of Seals, still locked, with nothing inside. Iron does not burn, and neither did whatever was in it, because it was gone before the fire.',
      loreText: 'The Justiciar’s clerk logged it as found in the ashes of the writ room at noon the day after. The seal on the lock is the Hall’s own, and it was opened and closed again with the right key.',
      icon: 'box',
    },
    {
      id: 'stillwater_psalter',
      name: 'The Stillwater Psalter',
      tags: ['quest', 'book'],
      questItem: true,
      skillModifiers: { old_lore: 2 },
      description: 'A psalter three hundred years old, its margins full of a small fierce hand: the first Duchess Ardent, who took the veil here as a widow.',
      loreText: 'On the last page, under a pressed sprig of heather, she wrote down a single word, who may speak it, and what it does to the fire in an Ardent’s blood.',
      icon: 'book',
    },
    {
      id: 'nine_names',
      name: 'The Nine Names',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'A page torn from a duty book, nine names in his handwriting, each with a street and a trade. A baker. Two clerks. A lamplighter and his son, who was twenty.',
      loreText: 'He has written to every family. None of them has written back yet, and he keeps the page in his coat over his heart, which Ottilie pretends not to know.',
      icon: 'papers',
    },
    {
      id: 'grey_veil',
      name: 'The Grey Veil',
      tags: ['quest', 'vow'],
      questItem: true,
      description: 'A novice’s plain grey veil, folded on the altar rail. Whoever takes it and says the vow is sheltered absolutely by the house rule, for a year and a day.',
      loreText: 'Nobody who wore it has ever been taken out through Stillwater’s gate. A king tried, once, and the chronicle records only that he went home.',
      icon: 'cloth',
    },
    {
      id: 'guests_cord',
      name: 'The Guest’s Cord',
      tags: ['quest', 'vow'],
      questItem: true,
      droppable: true,
      description:
        'A plain white linen cord knotted round your wrist, with one wooden bead cut with Stillwater’s mark, a ring of still water. Sister Agathe tied it the night you arrived under a borrowed name, and every sister in the house knows what it means.',
      loreText:
        'While you wear it, the house rule stands between you and everybody outside the gate: nobody takes you out through it by force, and no armed man crosses the threshold to reach you uninvited. Only the prioress can cut it, and a guest is sheltered only for as long as the sisters choose to keep them. Trade it for the grey veil and the shelter is absolute for a year and a day. Take it off and walk out of the gate, and it is only a cord.',
      icon: 'cloth',
    },
    {
      id: 'maras_letters',
      name: 'Mara’s Letters',
      tags: ['document', 'personal'],
      description: 'Three short letters in a captain’s square hand, tied with kitchen string. The first two say some version of: Thank you. He knows. He has not come. Write again.',
      loreText: 'The third is dated the morning after the fire and says only: He is alive. Stay where you are.',
      icon: 'letter',
    },
    {
      id: 'mothers_knife',
      name: 'Your Mother’s Knife',
      tags: ['weapon', 'personal'],
      skillModifiers: { knifework: 1 },
      description: 'A slim blade with a horn handle, meant for letters and sometimes not. The one thing of hers you took when you ran.',
      loreText: 'There is a nick near the tip from the night you cut the window cord to get out.',
      icon: 'knife',
    },
    {
      id: 'travel_purse',
      name: 'The Prince’s Purse',
      tags: ['money'],
      description: 'The purse Prince Remy pressed into your hand the night you ran. Soft green leather, and eleven gold crowns left in it.',
      loreText: 'Enough for a boat down the river, or a horse and three weeks, or one very good bribe.',
      icon: 'coins',
    },
    {
      id: 'willow_tea',
      name: 'Willow-Bark Tea',
      tags: ['consumable'],
      stackable: true,
      maxStack: 3,
      consumable: { resourceId: 'composure', amount: 15, consumesItem: true },
      description: 'Bitter, hot, and served by the infirmary in chipped bowls to anybody who looks like they need sitting down.',
      loreText: 'Agathe’s own recipe, from the army. She says it works on fevers, nerves and dukes, in that order.',
      icon: 'cup',
    },
    {
      id: 'his_coat',
      name: 'His Coat',
      tags: ['clothing'],
      description: 'A long black riding coat, heavy, still warm, smelling of smoke and horse. There is ash in every seam.',
      loreText: 'He will put it round your shoulders without asking if you are cold, which is the only thing he does without asking.',
      icon: 'coat',
    },
    {
      id: 'family_seal',
      name: 'Your Family Seal',
      tags: ['personal', 'document'],
      skillModifiers: { letters: 2 },
      description: 'A small signet in a pouch, the mark of your house, good for sealing a letter or proving who wrote it.',
      loreText: 'The writ would have handed the lands this seal stands for to the crown.',
      icon: 'ring',
    },
    {
      id: 'grey_mare',
      name: 'Your Grey Mare',
      tags: ['mount'],
      skillModifiers: { riding: 2 },
      description: 'A grey mare in the convent stable, fast, bad-tempered and fond of exactly one person, who is you.',
      loreText: 'Remy bought her for the night you ran. She has bitten him twice since, which you have chosen to find meaningful.',
      icon: 'horse',
    },
    {
      id: 'pearl_pins',
      name: 'Pearl Hairpins',
      tags: ['valuable'],
      skillModifiers: { court_face: 1 },
      description: 'Three pearl hairpins, each worth a good horse, from the last ball you went to before you ran.',
      loreText: 'A ferryman, a sergeant or an ostler would take one and forget your face.',
      icon: 'gem',
    },
    {
      id: 'chapel_beads',
      name: 'Chapel Beads',
      tags: ['personal'],
      skillModifiers: { old_lore: 1 },
      description: 'A string of plain wooden prayer beads, worn smooth, from the canonesses who taught you.',
      loreText: 'The sisters of Stillwater use the same pattern, which is the first reason they trusted you.',
      icon: 'beads',
    },
  ],
  abilities: [
    {
      id: 'say_no',
      name: 'Tell Him No',
      tags: ['social'],
      description: 'Refuse him, plainly, and mean it. He asked for exactly this answer as one of two, and he will honour it.',
      affordances: ['tell him no', 'say no', 'no', 'refuse', 'turn him down', 'send him away', 'i will not', 'refuse him'],
      costs: [{ resourceId: 'composure', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'take_his_hand',
      name: 'Take His Hand',
      tags: ['social'],
      description: 'Say yes, to the ring or to the hand or only to the next hour, and let him see that you mean it.',
      affordances: ['take his hand', 'say yes', 'go with him', 'take the ring', 'accept', 'come home', 'yes'],
      costs: [{ resourceId: 'composure', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'demand_the_truth',
      name: 'Demand the Truth',
      tags: ['social'],
      description: 'Make somebody account for the fire, the writ or the nine dead, and do not let them change the subject.',
      affordances: ['what did you do', 'tell me about the fire', 'how many died', 'make him explain', 'demand answers', 'ask about the writ', 'press him'],
      costs: [
        { resourceId: 'composure', amount: 8 },
        { resourceId: 'smoulder', amount: 6 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'steel', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'lie_smoothly',
      name: 'Lie Like a Courtier',
      tags: ['social'],
      description: 'Give somebody a pleasant, plausible untruth with your best court smile and see whether they take it.',
      affordances: ['lie', 'pretend', 'bluff', 'deceive', 'play innocent', 'give a false name', 'flatter'],
      costs: [
        { resourceId: 'composure', amount: 6 },
        { resourceId: 'smoulder', amount: 3 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'court_face', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'watch_them',
      name: 'Watch Their Hands',
      tags: ['sight'],
      description: 'Say nothing for a moment and read what somebody is doing while they talk: gloves, sleeves, a ring turned inward.',
      affordances: ['watch', 'study him', 'look closer', 'notice', 'read her', 'look around', 'keep watch', 'search the room'],
      costs: [{ resourceId: 'composure', amount: 3 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'insight', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'claim_sanctuary',
      name: 'Claim Sanctuary',
      tags: ['utility'],
      description: 'Invoke Stillwater’s house rule: kneel at the altar, ask for the grey veil, and put the sisters between you and everyone.',
      affordances: ['claim sanctuary', 'take the veil', 'kneel at the altar', 'ask for sanctuary', 'invoke the house rule', 'become a novice'],
      costs: [{ resourceId: 'composure', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: { attribute: 'arcana', skillId: 'old_lore', baseDc: 11 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'slip_away',
      name: 'Slip Away',
      tags: ['movement'],
      description: 'Run again: the side door, the orchard wall, a horse in the dark or a boat on the lake.',
      affordances: ['run', 'flee', 'escape', 'slip out', 'take the boat', 'ride off', 'bolt', 'climb the wall'],
      costs: [
        { resourceId: 'composure', amount: 10 },
        { resourceId: 'pursuit', amount: 8 },
        { resourceId: 'smoulder', amount: 4 },
      ],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'agility', skillId: 'riding', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'draw_steel',
      name: 'Draw Your Knife',
      tags: ['combat'],
      description: 'Your mother’s knife, out and pointed at somebody. It will not stop a duke, and it will make everybody take you seriously.',
      affordances: ['draw my knife', 'stab', 'attack', 'cut', 'slap him', 'hit', 'fight', 'threaten'],
      costs: [
        { resourceId: 'composure', amount: 8 },
        { resourceId: 'pursuit', amount: 6 },
        { resourceId: 'smoulder', amount: 12 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'might', skillId: 'knifework', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'tend_the_wounded',
      name: 'Tend the Burned',
      tags: ['healing'],
      description: 'Roll your sleeves up in the infirmary: water, linen, a steady voice for somebody who walked out of the fire.',
      affordances: ['help', 'tend', 'bandage', 'nurse', 'help the sisters', 'carry water', 'sit with the burned'],
      costs: [{ resourceId: 'composure', amount: 12 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'nursing', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'bear_witness',
      name: 'Bear Witness',
      tags: ['social'],
      description: 'Tell the Justiciar what you know, under oath, for the record, and accept that you cannot take it back.',
      affordances: ['testify', 'tell the justiciar', 'swear to it', 'give evidence', 'bear witness', 'make a statement'],
      costs: [
        { resourceId: 'composure', amount: 12 },
        { resourceId: 'pursuit', amount: 4 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'steel', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'set_terms',
      name: 'Name Your Terms',
      tags: ['social'],
      description: 'Bargain like somebody raised in a house that reads its contracts: what you want, in writing, before you say yes to anything.',
      affordances: ['set terms', 'make conditions', 'bargain', 'negotiate', 'my conditions', 'on my terms', 'put it in writing'],
      costs: [{ resourceId: 'composure', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'letters', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'bank_the_fire',
      name: 'Bank the Fire',
      tags: ['utility'],
      description: 'Speak the first duchess’s word. Every fire he has lit goes out, and his own fire lies quiet for a day.',
      affordances: ['speak the word', 'bank the fire', 'say the word', 'put it out', 'still the fire', 'stop him burning'],
      costs: [{ resourceId: 'composure', amount: 20 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: null,
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:the_banked_word'],
        lockedCopy: 'You have no word a fire would listen to. You have a voice, and in your whole life fire has never once cared about voices.',
      },
    },
  ],
  locations: [
    {
      id: 'stillwater_chapel',
      name: 'The Chapel',
      shortName: 'Chapel',
      description:
        'A long cold chapel lit by two hundred candles, with a carved altar rail and a grey veil folded on it. Its west door opens straight onto the gate court, and the threshold stone is worn into a dip by three hundred years of people stopping there.',
      artDirection:
        'Stone convent chapel at night, rows of candles all leaning toward an open west door, a tall gloved man in a smoke-dark coat standing on the threshold, a grey-habited nun in the aisle in front of the viewer. Gold candlelight and blue night.',
      connections: [
        { to: 'the_cloister', travelMinutes: 1, label: 'Through the side door to the cloister' },
        { to: 'the_bell_tower', travelMinutes: 2, label: 'The tower stair behind the altar' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [
        { itemId: 'betrothal_ring', qty: 1, ownerId: 'lucien', aka: ['ring', 'my ring', 'the betrothal ring', 'the ring'] },
        { itemId: 'grey_veil', qty: 1, ownerId: 'agathe', aka: ['veil', 'the grey veil', 'the novice veil'] },
      ],
    },
    {
      id: 'the_cloister',
      name: 'The Cloister',
      shortName: 'Cloister',
      description:
        'A covered walk round a square herb garden, lamps every ten paces, and the sound of the lake behind the north wall. Every door in the convent opens off it, and the sisters cross it in pairs, fast, not looking at the gate.',
      artDirection:
        'Romanesque convent cloister at night, arched stone walk, oil lamps, a square herb garden with frost on it, a dark bell tower above the roofs. Quiet, cold, enclosed.',
      connections: [
        { to: 'stillwater_chapel', travelMinutes: 1, label: 'Back into the chapel' },
        { to: 'your_cell', travelMinutes: 1, label: 'The guest corridor' },
        { to: 'the_infirmary', travelMinutes: 1, label: 'The infirmary door' },
        { to: 'the_bell_tower', travelMinutes: 2, label: 'Up the tower' },
        { to: 'the_gatehouse', travelMinutes: 2, label: 'Out to the gate court' },
        { to: 'the_lake_shore', travelMinutes: 4, label: 'The orchard door to the lake' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
      takeableItems: [],
    },
    {
      id: 'your_cell',
      name: 'Your Cell',
      shortName: 'Your Cell',
      description:
        'A whitewashed room nine feet by seven: two narrow cots, a jug and basin, a hook for a cloak, a window onto the lake. Mara has made it as much like home as a basket and nineteen days allowed, and keeps something under her mattress she thinks you have not noticed.',
      artDirection:
        'Tiny whitewashed convent guest cell, two narrow cots, a wash jug, a candle, a small window over a dark lake, a covered basket on the floor. Plain, warm candlelight, intimate.',
      connections: [{ to: 'the_cloister', travelMinutes: 1, label: 'Back to the cloister' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 1 },
      takeableItems: [
        { itemId: 'maras_letters', qty: 1, ownerId: 'mara', aka: ['letters', 'the letters', 'her letters', 'the bundle'] },
      ],
    },
    {
      id: 'the_infirmary',
      name: 'The Infirmary',
      shortName: 'Infirmary',
      description:
        'Twelve beds under a low roof, a fire that never goes out, and a smell of vinegar and willow bark. Since the sky went orange the sisters have kept every bed made up, the kettles full and the linen torn into bandages, for whoever walks north from the capital next.',
      artDirection:
        'Low-beamed convent infirmary at night, rows of plain beds with grey blankets, a big hearth, nuns in aprons carrying basins, bandaged survivors sitting up, bunches of dried herbs from the beams. Warm, crowded, tender.',
      connections: [{ to: 'the_cloister', travelMinutes: 1, label: 'Back to the cloister' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 1 },
      takeableItems: [
        { itemId: 'willow_tea', qty: 3, ownerId: null, aka: ['tea', 'willow tea', 'a bowl of tea'] },
      ],
    },
    {
      id: 'the_bell_tower',
      name: 'The Bell Tower',
      shortName: 'Bell Tower',
      description:
        'One bell, a ladder, a wooden book chest and a window on each side. From the south window you watched the sky go orange three nights ago. From the north you can see his camp fire, and in daylight both roads for ten miles.',
      artDirection:
        'Narrow stone bell tower room, a single bronze bell, an iron-bound book chest, four arched windows, one showing a distant orange glow on a dark horizon. Wind, height, lonely.',
      connections: [
        { to: 'the_cloister', travelMinutes: 2, label: 'Down to the cloister' },
        { to: 'stillwater_chapel', travelMinutes: 2, label: 'Down the stair into the chapel' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: -1 },
      takeableItems: [
        { itemId: 'stillwater_psalter', qty: 1, ownerId: 'agathe', aka: ['psalter', 'the psalter', 'the old book', 'the duchess’s book'] },
      ],
    },
    {
      id: 'the_gatehouse',
      name: 'The Gatehouse',
      shortName: 'The Gate',
      description:
        'A thick arch with an oak gate and an iron bar, a porter’s lodge, and a line of white stones set across the road outside: the boundary of the house rule. On the far side of it, twelve riders in Ardent black, and from the second morning, forty more under the crown’s banner.',
      artDirection:
        'Convent gatehouse at dawn, heavy oak gate half open, a line of white stones across a muddy road, black-clad riders on one side and a column of riders under a white-and-blue banner arriving on the other. Mist, tension.',
      connections: [
        { to: 'the_cloister', travelMinutes: 2, label: 'Back inside' },
        { to: 'the_ardent_camp', travelMinutes: 3, label: 'Across the meadow to his camp' },
        { to: 'mossford', travelMinutes: 35, label: 'Down the lake road to the village' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 2 },
      takeableItems: [],
    },
    {
      id: 'the_ardent_camp',
      name: 'His Camp',
      shortName: 'His Camp',
      description:
        'Twelve riders, twenty horses and one fire on the meadow outside the wall, close enough to see the gate and far enough not to crowd it. Nobody in the camp sleeps much. He sits nearest the fire, and it leans toward him.',
      artDirection:
        'Small military camp on a mountain meadow at night, picketed black horses, a single big campfire bending toward a seated man in a black coat, a convent wall and gate behind. Orange firelight, cold blue dark.',
      connections: [
        { to: 'the_gatehouse', travelMinutes: 3, label: 'Back to the gate' },
        { to: 'the_north_road', travelMinutes: 30, label: 'Up to the north road' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 2 },
      takeableItems: [
        { itemId: 'nine_names', qty: 1, ownerId: 'lucien', aka: ['list', 'the names', 'the nine names', 'the page'] },
        { itemId: 'his_coat', qty: 1, ownerId: 'lucien', aka: ['coat', 'his coat', 'the black coat'] },
      ],
    },
    {
      id: 'the_lake_shore',
      name: 'The Boathouse',
      shortName: 'Boathouse',
      description:
        'A timber boathouse on the black lake below the orchard wall, three boats, a jetty and a lantern hook. From here the lake runs south to Mossford and the river beyond it runs all the way to the sea.',
      artDirection:
        'Old timber boathouse on a still black mountain lake at night, a small jetty, rowing boats, a single lantern held up in the doorway by a golden-haired man. Mist on the water, silver and amber.',
      connections: [
        { to: 'the_cloister', travelMinutes: 4, label: 'Up through the orchard' },
        { to: 'mossford', travelMinutes: 40, label: 'Row down the lake to the village' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 0 },
      takeableItems: [],
    },
    {
      id: 'mossford',
      name: 'Mossford',
      shortName: 'Mossford',
      description:
        'A grey stone village at the foot of the lake: a ferry, a smithy, a chapel without a priest and the Heron inn, where a prince is staying under a borrowed name with a saddlebag he never lets the ostler carry. Everybody here watched the sky go orange too.',
      artDirection:
        'Small grey-stone lakeside village at dusk, a ferry landing, an inn with a heron sign, stables behind it, villagers on the road looking north. Damp, close, gossiping.',
      connections: [
        { to: 'the_gatehouse', travelMinutes: 35, label: 'Up the lake road to the convent' },
        { to: 'the_lake_shore', travelMinutes: 40, label: 'Row up the lake to the boathouse' },
        { to: 'the_capital_road', travelMinutes: 60, label: 'Onto the south road' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 3 },
      takeableItems: [
        { itemId: 'treason_writ', qty: 1, ownerId: 'remy', aka: ['writ', 'the writ', 'the vellum', 'the writ of forfeiture'] },
      ],
    },
    {
      id: 'the_capital_road',
      name: 'The South Road',
      shortName: 'South Road',
      description:
        'The road from the capital, crowded since the fire with handcarts, singed bedding and people walking north to anybody who will feed them. At the crossroads below Mossford, the Justiciar’s riders camp in neat rows with a clerk’s tent in the middle.',
      artDirection:
        'Muddy southern road through hills, refugees with handcarts and bundles walking one way, a tidy military camp of white tents at a crossroads, a grey-coated woman at a camp desk. Overcast, smoky horizon.',
      connections: [
        { to: 'mossford', travelMinutes: 60, label: 'North to Mossford' },
        { to: 'the_ashen_capital', travelMinutes: 720, label: 'A long day’s ride to the capital' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 4 },
      takeableItems: [
        { itemId: 'empty_writ_case', qty: 1, ownerId: 'isaure', aka: ['case', 'the iron case', 'the writ-case', 'the empty case'] },
      ],
    },
    {
      id: 'the_ashen_capital',
      name: 'Aubrais, Burned',
      shortName: 'The Capital',
      description:
        'The upper city of Aubrais is roofless black stone for a mile. The Hall of Seals is a shell. In the writ room the embers still burn blue-white and will not go out, because they are his. The river quarter below is untouched, and people stand on its bridges looking up.',
      artDirection:
        'Ruined upper district of a grand river city after a great fire, roofless black stone halls, a collapsed archive with faint blue-white embers glowing in the ash, intact bridges and houses below, people watching from a bridge. Grey and blue, haunting, not gory.',
      connections: [{ to: 'the_capital_road', travelMinutes: 720, label: 'Back up the south road' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 5 },
      takeableItems: [],
    },
    {
      id: 'the_north_road',
      name: 'The North Road',
      shortName: 'North Road',
      description:
        'A mountain road climbing toward the pass between pines and old snow, with Ardent waystones every mile. Once you are on it, everybody behind you will assume you chose him.',
      artDirection:
        'Steep mountain road through dark pines toward a snowy pass at first light, black stone waystones, a small mounted party climbing. Cold, wide, decisive.',
      connections: [
        { to: 'the_ardent_camp', travelMinutes: 30, label: 'Back down to the camp' },
        { to: 'hollowfell', travelMinutes: 2880, label: 'Two days over the pass to his fortress' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 3 },
      takeableItems: [],
    },
    {
      id: 'hollowfell',
      name: 'Hollowfell',
      shortName: 'Hollowfell',
      description:
        'The Ardent fortress in the pass: black stone, three hundred years of snow, a great hall with a hearth that has not gone out since the oath was sworn, and a household that has been told you are coming and has no idea what you will be like.',
      artDirection:
        'Black stone mountain fortress in a snowy pass, banners in black and red, a great hall with an enormous ever-burning hearth, servants lined up in the courtyard. Severe, grand, warmer inside than it looks.',
      connections: [{ to: 'the_north_road', travelMinutes: 2880, label: 'Back down the pass' }],
      discoveredByDefault: false,
      mapPosition: { x: 1, y: 4 },
      takeableItems: [],
    },
  ],
  factions: [
    {
      id: 'faction_stillwater',
      name: 'The Sisters of Stillwater',
      description: 'Forty sisters, an infirmary and a house rule older than the crown. They took you in under a borrowed name and asked nothing, and their charter is now hanging on whether they hand you over.',
      startingReputation: 20,
      ranks: [
        { atReputation: 0, label: 'Guest' },
        { atReputation: 30, label: 'Sheltered' },
        { atReputation: 60, label: 'One of the house' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_ardent',
      name: 'House Ardent',
      description: 'The Grand Duke’s household, his twelve riders at the gate and the whole of the north behind the pass. To them you are the runaway who cost their lord a city, and the person he would cross it again for.',
      startingReputation: 10,
      ranks: [
        { atReputation: 0, label: 'The runaway' },
        { atReputation: 35, label: 'His choice' },
        { atReputation: 70, label: 'One of the north' },
      ],
      allies: [],
      enemies: ['faction_crown'],
    },
    {
      id: 'faction_crown',
      name: 'The Crown of Esterre',
      description: 'The King, his two sons, the Justiciar on the south road and an army mustering in the ruins. The crown wants a traitor for the fire, the north brought to heel, and you as the witness who hands them both.',
      startingReputation: -20,
      ranks: [
        { atReputation: -100, label: 'Wanted' },
        { atReputation: 0, label: 'Witness' },
        { atReputation: 40, label: 'Pardoned' },
      ],
      allies: [],
      enemies: ['faction_ardent'],
    },
    {
      id: 'faction_burned',
      name: 'The People of the Capital',
      description: 'The burned city: bakers, clerks, lamplighters, townspeople walking north with what they carried out. Every one of them has heard the fire was for you.',
      startingReputation: -10,
      ranks: [
        { atReputation: -100, label: 'The one it was for' },
        { atReputation: 0, label: 'Somebody who came' },
        { atReputation: 40, label: 'One of ours' },
      ],
      allies: [],
      enemies: [],
    },
  ],
  characters: [
    {
      id: 'lucien',
      name: 'Grand Duke Lucien Ardent',
      calledName: 'Lucien',
      role: 'Grand Duke of the northern passes, the man you were promised to, and the man the whole kingdom says burned the capital looking for you',
      cardBlurb:
        'Everyone says he burned the capital looking for you. He will not lie to you about the nine people who died in it, and he will take no for an answer, which nobody at court believes.',
      pronouns: 'he/him',
      publicTraits: ['Very still, then very fast', 'Answers exactly the question asked', 'Never takes his gloves off'],
      hiddenDrives: [
        'You are the one thing in his life the Oathfire did not choose for him, and he is terrified that wanting you this much is the same thing as the fire',
        'He means to give you the Banked Word whatever you answer, so that nobody, himself included, can burn anything in your name again',
      ],
      values: [
        'Saying the true thing first, however badly it lands',
        'Paying for what he did himself instead of letting the north pay for it',
      ],
      fears: [
        'That you only ever saw the fire and never him',
        'Burning out in front of you the way his father burned out in front of him',
        'Becoming a man who would take you anyway',
      ],
      socialStyle:
        'Stands at the edge of a room and lets it come to him. Asks permission for small things and for none of the large ones, and knows that is backwards.',
      boundaries: [
        'Will not take you anywhere by force, and will stand between you and anybody who tries',
        'Will not cross the convent threshold uninvited',
        'Will not pretend the nine dead were somebody else’s fault',
      ],
      goals: [
        'Get an answer from you that you mean, either one',
        'Keep the crown’s army off the north, by himself if he has to',
        'Write to the families of all nine, and get one of them to write back',
      ],
      secrets: [
        {
          id: 'lucien_hands',
          fact: 'His hands are burned to the wrist under the gloves. He called the Oathfire at full strength in the capital, and a second full calling this season would very likely kill him. The kingdom is terrified of a weapon that has one shot left.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He takes a glove off only if you have asked about him rather than about the fire, and only where his riders cannot see.',
        },
        {
          id: 'lucien_surrender',
          fact: 'If you tell him no, he plans to walk out to the Justiciar unarmed and give himself up, so the crown has its traitor and the army never marches on his people.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Ottilie tells you, furious, if you have said no and she believes you meant it. He tells you himself only if you ask him straight what he will do now.',
        },
        {
          id: 'lucien_twelve_days',
          fact: 'He knew where you were for twelve days before the fire and did not come, because you had chosen to run and he meant to let you. He came only when the writ made running a death sentence.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He admits it the moment you accuse him of hunting you, because it is the one accusation that is not true.',
        },
      ],
      speechStyle:
        'Low and level. Short sentences, no ornament. States the worst fact first and then waits. Uses your name rarely and on purpose. Says "tell me" where other people would say "please".',
      topics: ['the fire', 'the Hall of Seals', 'the nine', 'the Oathfire', 'your ring', 'why you ran', 'the north', 'his father'],
      voiceSamples: [
        'You ran. So I burned everything you ran from. Come home, or tell me no.',
        'Nine. A baker, two clerks, a lamplighter and his grown son, a woman who went back for a dog, three whose names I am still learning. Ask me anything else.',
        'I knew where you were for twelve days. I stayed away. You had chosen, and I was trying to be a man who lets you.',
        'Tell me no and I will go. I will hate it. You will never have to watch how much.',
      ],
      appearance:
        'An adult man, tall and lean, short black hair falling into pale grey eyes, a long black riding coat with ash in every seam over a high-collared charcoal tunic buttoned to the throat, and black leather gloves buttoned at the wrist.',
      visualHook: 'Black gloves he never takes off, and candle flames that lean toward him when he walks into a room.',
      silhouette: 'Tall in a doorway, one gloved hand held out palm up, the other at his side.',
      artSeed: 'hbtc-lucien-01',
      portrait: null,
      expressions: ['neutral', 'guarded', 'warm', 'hurt', 'blazing'],
      schedule: [
        { startMinute: 0, endMinute: 330, locationId: 'the_ardent_camp', activity: 'by the camp fire with his gloves on, not sleeping' },
        { startMinute: 330, endMinute: 480, locationId: 'the_gatehouse', activity: 'at the white stones at first light, watching the south road' },
        { startMinute: 480, endMinute: 720, locationId: 'the_ardent_camp', activity: 'with his riders, checking horses and writing letters nobody answers' },
        { startMinute: 720, endMinute: 1020, locationId: 'the_gatehouse', activity: 'outside the gate, not crossing it unless he is asked in' },
        { startMinute: 1020, endMinute: 1260, locationId: 'the_ardent_camp', activity: 'at the fire, listening to the south road' },
        { startMinute: 1260, endMinute: 1380, locationId: 'stillwater_chapel', activity: 'on the chapel threshold during the night office, as far as the house rule lets him come' },
        { startMinute: 1380, endMinute: 1440, locationId: 'the_gatehouse', activity: 'walking the outside of the wall in the dark' },
      ],
      homeLocationId: 'the_ardent_camp',
      knowledgeScope: ['the_fire', 'hall_of_seals', 'the_nine', 'oathfire', 'banked_word', 'house_ardent', 'the_north', 'the_betrothal'],
      startingRelationship: { trust: 40, affection: 85, respect: 60, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'lucien_the_hall',
          label: 'He tells you what he burned, and why',
          kind: 'TRUST',
          requires: { trust: 55 },
        },
        {
          id: 'lucien_the_gloves',
          label: 'He takes a glove off in front of you',
          kind: 'TRUST',
          requires: { trust: 65, flagsSet: ['heard_his_side'] },
        },
        {
          id: 'lucien_his_plan',
          label: 'He tells you what he will do if your answer is no',
          kind: 'TRUST',
          requires: { trust: 50, flagsSet: ['told_him_no'] },
        },
        {
          id: 'lucien_the_word',
          label: 'He gives you the word that banks his fire',
          kind: 'ROMANCE',
          requires: { trust: 70, affection: 85 },
        },
      ],
      attributes: { might: 14, agility: 13, mind: 14, presence: 15, resolve: 17, arcana: 18 },
      companion: null,
      scouting: null,
      combatant: { health: 60, defenseDc: 16, damage: 10, tags: ['noble', 'oathfire'] },
    },
    {
      id: 'remy',
      name: 'Prince Remy',
      calledName: 'Remy',
      role: 'The King’s second son, who paid for your horses the night you ran and has come back to the lake with a boat',
      cardBlurb:
        'He got you out once, he is the easiest person in the kingdom to talk to, and he has come back with a boat and a plan to take you somewhere the fire cannot follow.',
      pronouns: 'he/him',
      publicTraits: ['Charming without trying', 'Remembers every name', 'Laughs at himself first'],
      hiddenDrives: [
        'He has been the spare all his life. The King has promised the northern passes to whichever son brings him the traitor who burned the capital, and ruining the Grand Duke is the first thing Remy has ever been in a position to win',
        'He is truly fond of you and has decided that this counts as being good to you',
      ],
      values: ['Getting the result while everybody still likes him', 'Never being the one holding the knife'],
      fears: [
        'That the nine dead are his',
        'Being found out by you in particular',
        'Going back to being nobody at his father’s table',
      ],
      socialStyle:
        'Warm, funny and close. Touches your elbow when he agrees with you. Turns the subject with a joke the moment it comes near him.',
      boundaries: [
        'Will not raise a hand to anybody himself',
        'Will not say the word writ out loud if he can possibly help it',
        'Will not leave the lake without you while he still has a move left',
      ],
      goals: [
        'Get you into his boat and down the river before the third dawn',
        'See the Grand Duke condemned for the fire, with your testimony if he can get it',
      ],
      secrets: [
        {
          id: 'remy_the_writ',
          fact: 'He took the Writ of Forfeiture out of the Hall of Seals the day before the fire, then told Lucien exactly where it was kept, knowing Lucien would burn the Hall to destroy it and be ruined for it. The writ is folded in his saddlebag at the inn in Mossford.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He admits it only when you put the writ or the empty iron case in front of him. Otherwise somebody has to go through his saddlebag.',
        },
        {
          id: 'remy_the_nine',
          fact: 'He did not expect anybody to die. He has copied the nine names from the crown’s list and has not slept properly since.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'It shows on his face if you tell him what Lucien said about the nine, and you are watching him when you do.',
        },
        {
          id: 'remy_the_stables',
          fact: 'If you will not come to the boat, his manservant is to set fire to the stables at the Mossford inn on the third night, so that the whole valley blames the Grand Duke and you run.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only after the stables burn, and only if you can show him it was not Lucien’s fire.',
        },
      ],
      speechStyle:
        'Light, quick and intimate. First names and inside jokes. Ends nearly everything on a question so that you are always the one answering. Never quite finishes a sentence about himself.',
      topics: ['the night you ran', 'the boat', 'the river', 'his father', 'his brother', 'the Grand Duke', 'the sea'],
      voiceSamples: [
        'There you are. I swung the lantern three times like an idiot and you actually came. Boat leaves whenever you say?',
        'A man who would burn a city for you will burn one at you. I only want you somewhere he cannot reach. Is that so terrible?',
        'Can we talk about anything else, just for the length of this cup? Your hair. The weather. My brother’s terrible poetry?',
        'You always did read the last page first. Fine. Ask me.',
      ],
      appearance:
        'An adult man, slight and golden-haired, warm brown eyes, an easy smile, a deep green travelling coat with gold buttons far too good for the road, and a royal signet ring turned inward on his finger.',
      visualHook: 'A royal signet ring he wears turned palm-side so the crest does not show.',
      silhouette: 'Leaning in a boathouse doorway, lantern held up, smiling at whoever is coming.',
      artSeed: 'hbtc-remy-01',
      portrait: null,
      expressions: ['neutral', 'warm', 'amused', 'evasive', 'caught out'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'mossford', activity: 'asleep at the Heron with his boots on and the saddlebag under the pillow' },
        { startMinute: 420, endMinute: 720, locationId: 'mossford', activity: 'at the inn, writing letters under a borrowed name' },
        { startMinute: 720, endMinute: 960, locationId: 'the_lake_shore', activity: 'at the boathouse, readying the boat he came for' },
        { startMinute: 960, endMinute: 1320, locationId: 'mossford', activity: 'in the inn’s back room, buying the village drinks and news' },
        { startMinute: 1320, endMinute: 1440, locationId: 'the_lake_shore', activity: 'at the boathouse with a lantern, waiting for you' },
      ],
      homeLocationId: 'mossford',
      knowledgeScope: ['the_court', 'the_betrothal', 'the_night_you_ran', 'the_writ', 'hall_of_seals', 'the_river'],
      startingRelationship: { trust: 55, affection: 60, respect: 40, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'remy_the_boat',
          label: 'He tells you where the boat really goes',
          kind: 'TRUST',
          requires: { trust: 60 },
        },
        {
          id: 'remy_the_writ_gate',
          label: 'He stops pretending the writ burned',
          kind: 'TRUST',
          requires: { trust: 70, flagsSet: ['knows:the_writ_survived'] },
        },
      ],
      attributes: { might: 10, agility: 13, mind: 15, presence: 17, resolve: 10, arcana: 8 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'mara',
      name: 'Mara Ferrand',
      calledName: 'Mara',
      role: 'Your maid for six years, who ran with you, and who has been writing letters',
      cardBlurb:
        'She climbed out of a window after you with both your shoes in her teeth, she would lie to a king for you, and she has been writing letters that she hides whenever you come in.',
      pronouns: 'she/her',
      publicTraits: ['Talks fast when frightened', 'Practical to the bone', 'Loudly, fiercely loyal'],
      hiddenDrives: [
        'She wanted one person in the world to know where you were in case it went wrong, and the only person she trusts with anything is her sister',
        'She thinks you might have been happy with him, and nobody has ever let her say so',
      ],
      values: ['You, first', 'Having a plan for the worst night of anybody’s life'],
      fears: [
        'That you will never forgive the letters',
        'Being sent home in disgrace',
        'Her sister and you ending up on opposite sides of a sword',
      ],
      socialStyle: 'Fusses when she is frightened. Straightens your collar while telling you something she should not.',
      boundaries: [
        'Will not leave you alone with anybody you have not chosen to be alone with',
        'Will not lie to you once you ask her straight',
      ],
      goals: ['Keep you fed, warm and out of a cell', 'Tell you about the letters before somebody else does'],
      secrets: [
        {
          id: 'mara_letters',
          fact: 'She is Captain Ottilie Ferrand’s younger sister and has written to her every week since you ran, saying where you were and that you were safe. That is how the Grand Duke found you.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells you herself if you ask how he knew where to come. She cries first, briefly, and then tells you properly.',
        },
        {
          id: 'mara_the_note',
          fact: 'She kept the prince’s note from the night you ran. It names Stillwater in his hand and tells you to stay there whatever the writ says, and it is dated the day before the King signed the writ, so the prince knew there would be a writ before there was one.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She fetches it from the bottom of her basket if you ask her what she really thinks of the prince.',
        },
      ],
      speechStyle:
        'Rapid and warm, full of household detail: boots, bread, which sister snores. Calls you by your name when she is scared and by nothing at all when she is cross.',
      topics: ['the night you ran', 'her sister', 'the letters', 'the prince', 'home', 'what you should eat'],
      voiceSamples: [
        'I packed your good boots, your mother’s knife and four days of bread. I did not have time for the rest of your life.',
        'He looked at you like you were the only lit window in the street. I am only remarking. I have remarked. Moving on.',
        'I wrote to my sister. Every week. If it went wrong, one person would know which convent to come and shout at.',
        'Eat this. Then be furious with me. Furious goes better on bread.',
      ],
      appearance:
        'An adult woman, small and quick, dark hair in a tight plait, freckles, a borrowed grey work dress with the hem pinned up, a covered basket on one arm.',
      visualHook: 'A covered basket she never puts down, with bread, a knife and somebody else’s shoes in it.',
      silhouette: 'Half a step behind somebody, basket on her arm, chin up.',
      artSeed: 'hbtc-mara-01',
      portrait: null,
      expressions: ['neutral', 'worried', 'warm', 'guilty', 'defiant'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'your_cell', activity: 'on the cot by the door, sleeping in her shoes' },
        { startMinute: 360, endMinute: 600, locationId: 'the_infirmary', activity: 'helping the sisters with the burned, because she cannot sit still' },
        { startMinute: 600, endMinute: 900, locationId: 'the_cloister', activity: 'mending on a bench where she can see the gate' },
        { startMinute: 900, endMinute: 1260, locationId: 'your_cell', activity: 'writing a letter she hides when you come in' },
        { startMinute: 1260, endMinute: 1380, locationId: 'stillwater_chapel', activity: 'in the back pew at the night office, pretending to pray' },
        { startMinute: 1380, endMinute: 1440, locationId: 'your_cell', activity: 'laying out tomorrow’s clothes and talking too fast' },
      ],
      homeLocationId: 'your_cell',
      knowledgeScope: ['the_night_you_ran', 'the_letters', 'ottilie', 'your_household', 'the_prince'],
      startingRelationship: { trust: 70, affection: 75, respect: 50, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'mara_the_letters_gate',
          label: 'She tells you about the letters',
          kind: 'TRUST',
          requires: { trust: 72, flagsSet: ['first_night_over'] },
        },
      ],
      attributes: { might: 9, agility: 13, mind: 12, presence: 11, resolve: 13, arcana: 7 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'agathe',
      name: 'Sister Agathe',
      calledName: 'Agathe',
      role: 'Prioress of Stillwater, once an army surgeon, and the only person in the building who is not afraid of him',
      cardBlurb:
        'She took you in under a borrowed name and asked no questions, she has set more bones than she has sung psalms, and the house rule standing between you and the crown is hers to keep, or to break.',
      pronouns: 'she/her',
      publicTraits: ['Unshockable', 'Dry as old bread', 'Counts the cost of everything out loud'],
      hiddenDrives: [
        'She nursed his father the winter the Oathfire burned him out, and she has sworn she will not watch it happen to the son',
        'She wants the forty sisters and the infirmary to outlive her more than she wants to be good',
      ],
      values: ['The house rule, which is older than the crown', 'Telling the patient the truth about the wound'],
      fears: [
        'Turning forty sisters and eleven burned strangers out onto a mountain road',
        'Watching another Ardent burn from the inside',
      ],
      socialStyle: 'Talks while doing something useful with her hands. Puts a task in front of you before she asks you anything.',
      boundaries: [
        'Will not let any armed man over her threshold uninvited, duke or king',
        'Will not lie in chapel',
        'Will not decide for you, and will tell you exactly what each choice costs her',
      ],
      goals: [
        'Keep the convent, the infirmary and the house rule through the week',
        'Get the Grand Duke to let her look at his hands',
      ],
      secrets: [
        {
          id: 'agathe_the_order',
          fact: 'A letter from the Archbishop orders her to surrender you to the crown’s Justiciar or lose Stillwater’s charter. She has not decided and has told nobody.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She shows you the letter herself if you ask her what she is afraid of, rather than what she is going to do.',
        },
        {
          id: 'agathe_the_psalter',
          fact: 'She knows the Banked Word is written in the first duchess’s psalter in the bell-tower chest, and that you are the one person alive who could speak it.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If you come to her already knowing about his hands, she takes you up the tower and opens the book.',
        },
        {
          id: 'agathe_his_father',
          fact: 'She was the army surgeon at the pass the winter his father called the Oathfire a second time in one season. She knows exactly what the gloves mean.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She says so, flatly, the first time she sees the Grand Duke take a cup in both hands.',
        },
      ],
      speechStyle:
        'Clipped and practical, a soldier’s vocabulary in a nun’s habit. Gives orders as if they were the weather. Prays briskly and means every word.',
      topics: ['the house rule', 'the burned', 'the Archbishop', 'his father', 'the psalter', 'the army'],
      voiceSamples: [
        'Stay behind me. He will not come over the step, and if he does I have set heavier men than him.',
        'Boil the water, then ask me your question. I can do both.',
        'Forty sisters, eleven burned strangers, one roof. Weigh a duke against that for me and I will tell you what I decide.',
        'I have seen those gloves before. On his father, the winter he went up the pass and came down in a cart.',
      ],
      appearance:
        'An older woman, short and broad, a grey habit with the sleeves rolled to the elbow, a surgeon’s leather apron over it, steel spectacles, a ring of keys at her belt.',
      visualHook: 'A surgeon’s leather apron worn over a nun’s grey habit, sleeves always rolled.',
      silhouette: 'Square and planted, arms folded across the apron, standing in front of somebody.',
      artSeed: 'hbtc-agathe-01',
      portrait: null,
      expressions: ['neutral', 'dry', 'stern', 'worried'],
      schedule: [
        { startMinute: 0, endMinute: 300, locationId: 'the_infirmary', activity: 'the night watch over the burned' },
        { startMinute: 300, endMinute: 420, locationId: 'stillwater_chapel', activity: 'the dawn office' },
        { startMinute: 420, endMinute: 720, locationId: 'the_infirmary', activity: 'dressings, splints and arguing with the herb store' },
        { startMinute: 720, endMinute: 900, locationId: 'the_cloister', activity: 'walking the cloister with the accounts, deciding things' },
        { startMinute: 900, endMinute: 1260, locationId: 'the_infirmary', activity: 'the afternoon round of the people from the south road' },
        { startMinute: 1260, endMinute: 1380, locationId: 'stillwater_chapel', activity: 'leading the night office' },
        { startMinute: 1380, endMinute: 1440, locationId: 'the_infirmary', activity: 'back on the night watch' },
      ],
      homeLocationId: 'the_infirmary',
      knowledgeScope: ['stillwater', 'house_rule', 'the_burned', 'oathfire', 'banked_word', 'the_archbishop', 'his_father'],
      startingRelationship: { trust: 50, affection: 40, respect: 35, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'agathe_the_letter',
          label: 'She shows you the Archbishop’s order',
          kind: 'TRUST',
          requires: { trust: 60 },
        },
        {
          id: 'agathe_opens_the_book',
          label: 'She takes you up the tower to the psalter',
          kind: 'TRUST',
          requires: { trust: 55, flagsSet: ['knows:his_hands'] },
        },
      ],
      attributes: { might: 11, agility: 9, mind: 16, presence: 14, resolve: 18, arcana: 12 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'ottilie',
      name: 'Captain Ottilie Ferrand',
      calledName: 'Ottilie',
      role: 'Captain of the Grand Duke’s riders, Mara’s older sister, and nobody’s admirer of yours',
      cardBlurb:
        'She carried him out of the capital on her back when the fire was done with him, she thinks you cost the north a city, and she will tell you so to your face while holding your horse.',
      pronouns: 'she/her',
      publicTraits: ['Blunt to the point of insult', 'Never sits down on duty', 'Swears in three dialects'],
      hiddenDrives: [
        'She has served two Grand Dukes and buried one, and she will do anything at all to avoid burying a second',
        'She is proud of her sister and has never once managed to say so',
      ],
      values: ['Duty done in the mud, without a speech', 'Her riders home alive'],
      fears: [
        'Carrying him down the pass in a cart the way they carried his father',
        'Her sister hanged for helping the traitor’s runaway',
      ],
      socialStyle: 'Talks to you over a horse’s back while she works. Calls you by a title you never got to have.',
      boundaries: [
        'Will not disobey a direct order from him, even one she thinks will kill him',
        'Will not let anybody hurt her sister, including you',
      ],
      goals: ['Get him back across the pass alive', 'Make you understand what that night cost him'],
      secrets: [
        {
          id: 'ottilie_the_hands',
          fact: 'She carried him out of the capital at dawn with his hands burned to the wrist. She knows a second full calling of the Oathfire this season would kill him, and that he would do it anyway for you.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells you, angrily, if you defend him to anybody in her hearing, or if you ask her outright what happened to his hands.',
        },
        {
          id: 'ottilie_the_letters',
          fact: 'Mara’s letters came to her. She is the one who told the Grand Duke where you were, and she argued for twelve days that he should go.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She says it flat out if you accuse her sister, because she will not let Mara carry it alone.',
        },
        {
          id: 'ottilie_the_order',
          fact: 'He has ordered her that if you say no, she is to escort you wherever you want to go and then take the riders home without him.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells you after you have said no to him, because she wants you to know exactly what it costs.',
        },
      ],
      speechStyle:
        'Barracks-blunt. Short orders, shorter opinions, and every so often one sentence of startling tenderness that she regrets immediately and covers with an insult.',
      topics: ['his hands', 'the night of the fire', 'her sister', 'the riders', 'the pass', 'horses'],
      voiceSamples: [
        'Your Grace-that-was-going-to-be. Mind the mare, she bites people she has no respect for.',
        'I carried him down the palace steps at dawn. He weighed nothing. Do you understand me? Nothing.',
        'He gave me an order about you. I hate it. I will carry it out to the letter.',
        'My sister writes a good letter. Short. Spells your name wrong every single time.',
      ],
      appearance:
        'An adult woman, tall and rangy, sun-browned, cropped fair hair, a scar through one eyebrow, black riding brigandine and a red captain’s sash.',
      visualHook: 'A red captain’s sash knotted over black brigandine, and a scar splitting one eyebrow.',
      silhouette: 'One hand on a horse’s bridle, the other on her sword hilt, weight back.',
      artSeed: 'hbtc-ottilie-01',
      portrait: null,
      expressions: ['neutral', 'blunt', 'grim', 'worried'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'the_ardent_camp', activity: 'the night watch, walking the horse lines' },
        { startMinute: 360, endMinute: 600, locationId: 'the_gatehouse', activity: 'at the gate beside him, saying nothing she means' },
        { startMinute: 600, endMinute: 900, locationId: 'the_north_road', activity: 'riding the north road to keep it open' },
        { startMinute: 900, endMinute: 1260, locationId: 'the_ardent_camp', activity: 'drilling twelve riders who do not need drilling' },
        { startMinute: 1260, endMinute: 1440, locationId: 'the_gatehouse', activity: 'at the gate, watching the chapel door and you' },
      ],
      homeLocationId: 'the_ardent_camp',
      knowledgeScope: ['the_fire', 'his_hands', 'house_ardent', 'the_riders', 'mara', 'the_north'],
      startingRelationship: { trust: 10, affection: 5, respect: 20, fear: 0, rivalry: 25 },
      gates: [
        {
          id: 'ottilie_tells_you',
          label: 'She tells you what the fire cost him',
          kind: 'TRUST',
          requires: { trust: 40 },
        },
        {
          id: 'ottilie_on_your_side',
          label: 'She starts treating you as his equal rather than his mistake',
          kind: 'ALLIANCE',
          requires: { trust: 50, respect: 45 },
        },
      ],
      attributes: { might: 16, agility: 14, mind: 11, presence: 12, resolve: 16, arcana: 6 },
      companion: null,
      scouting: null,
      combatant: { health: 55, defenseDc: 15, damage: 9, tags: ['soldier', 'ardent'] },
    },
    {
      id: 'isaure',
      name: 'Justiciar Isaure Dane',
      calledName: 'Dane',
      role: 'The crown’s Justiciar, sent with forty riders and a warrant for you both, who wants the truth more than she wants a traitor',
      cardBlurb:
        'She has a warrant with your name on it, she has walked every street of the burned city with a list of nine names, and if you can show her what really happened she is the one person who can make the crown hear it.',
      pronouns: 'she/her',
      publicTraits: ['Incorruptible, and tiresome about it', 'Never raises her voice', 'Writes everything down'],
      hiddenDrives: [
        'The empty writ-case has kept her awake for two nights: somebody emptied it before the fire, and nobody in the capital wants to ask who',
        'She suspects the warrant she carries was written to hang the wrong person, and she would rather lose her post than serve it',
      ],
      values: ['Evidence', 'The law applying to princes'],
      fears: ['Hanging an innocent person on a king’s say-so', 'Being the crown’s tool and calling it justice'],
      socialStyle: 'Polite, unhurried, takes notes while you talk and reads them back to you.',
      boundaries: [
        'Will not break Stillwater’s house rule while the sisters hold it',
        'Will not take a bribe, a threat or a favour',
        'Will not let anybody else question a witness she is questioning',
      ],
      goals: ['Bring whoever set the fire before the crown’s court', 'Find out who emptied the writ-case'],
      secrets: [
        {
          id: 'isaure_the_case',
          fact: 'She has the iron writ-case from the Hall of Seals: locked, unburned and empty. Whatever the Grand Duke burned the Hall to destroy was gone before he got there.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She shows it to you if you tell her something true about the fire that she did not already know.',
        },
        {
          id: 'isaure_the_order',
          fact: 'The order sending her riders to Stillwater came from Prince Remy’s office, not the King’s, and named the convent before anybody at court but Remy could have known you were in it.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She reads it to you, for the record, once you have shown her the writ or told her under oath who had it.',
        },
      ],
      speechStyle:
        'Formal, exact and quietly relentless. Restates what you said in plainer words and asks if that is correct. Never threatens; describes what the law will do next.',
      topics: ['the warrant', 'the nine', 'the writ-case', 'the house rule', 'evidence', 'the crown’s court'],
      voiceSamples: [
        'For the record: you are the person named in this warrant. Correct me if I have that wrong.',
        'Nine dead. I have stood at the door of every one of them. I would like the right person to answer for it, and I am no longer certain I hold the right warrant.',
        'Iron does not burn. This case was locked when we found it, and it was empty. Tell me what that means.',
        'The house rule binds me until the sisters release you. I will wait. Waiting is most of my profession.',
      ],
      appearance:
        'An adult woman, spare and upright, iron-grey hair pinned flat, a long grey judge’s coat with the crown’s white cord at the shoulder, ink on two fingers.',
      visualHook: 'Ink-stained fingers and a ledger she writes in while you talk.',
      silhouette: 'Upright beside a horse in the rain, ledger open on her forearm.',
      artSeed: 'hbtc-isaure-01',
      portrait: null,
      expressions: ['neutral', 'level', 'sceptical', 'stern'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'the_capital_road', activity: 'breaking camp at the crossroads before dawn' },
        { startMinute: 420, endMinute: 1080, locationId: 'the_gatehouse', activity: 'at Stillwater’s gate with her riders, waiting on the house rule' },
        { startMinute: 1080, endMinute: 1440, locationId: 'the_capital_road', activity: 'at the riders’ camp on the south road, reading depositions by lamplight' },
      ],
      homeLocationId: 'the_capital_road',
      knowledgeScope: ['the_warrant', 'the_nine', 'hall_of_seals', 'the_writ_case', 'the_crown', 'house_rule'],
      startingRelationship: { trust: 0, affection: 0, respect: 15, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'isaure_shows_the_case',
          label: 'She shows you the empty writ-case',
          kind: 'TRUST',
          requires: { trust: 35, flagsSet: ['crown_at_the_gate'] },
        },
      ],
      attributes: { might: 10, agility: 10, mind: 17, presence: 14, resolve: 17, arcana: 8 },
      companion: null,
      scouting: null,
      combatant: null,
    },
  ],
  quests: [
    {
      id: 'q_the_doorway',
      title: 'Come Home, Or Tell Me No',
      summary: 'The man you were promised to is standing on the chapel threshold with your ring in his hand, and he has asked you a question with two answers.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['lucien', 'agathe', 'mara'],
      involvedLocationIds: ['stillwater_chapel', 'the_gatehouse'],
      knownRewardCopy: 'An answer to the man in the doorway, which will not be the last one you give him.',
      steps: [
        {
          id: 'answer_him',
          playerCopy: 'Answer the man in the chapel doorway.',
          directorNotes:
            'He asked a real question and both answers are honoured. He does not cross the threshold, does not raise his voice and does not argue with a no; he asks once what it means, and then he goes to the camp. A yes is not the end of anything either: he will ask what the player wants before he asks anything else, and nobody rides anywhere tonight. Agathe stays physically between them until the player moves. Every route here is a real way to play and none of them is wrong, including the knife, which he does not defend himself against.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'told_him_no',
              label: 'Tell him no',
              predicate: { flagsSet: ['used:say_no'] },
              setsFlags: ['told_him_no'],
              closesFlags: ['took_his_hand'],
            },
            {
              routeId: 'took_his_hand',
              label: 'Take his hand',
              predicate: { flagsSet: ['used:take_his_hand'] },
              setsFlags: ['took_his_hand'],
              closesFlags: ['told_him_no'],
            },
            {
              routeId: 'made_him_explain',
              label: 'Make him account for the fire before you answer anything',
              predicate: { flagsSet: ['used:demand_the_truth'] },
              setsFlags: ['made_him_explain'],
              closesFlags: [],
            },
            {
              routeId: 'claimed_sanctuary',
              label: 'Kneel at the altar and claim the house rule',
              predicate: { flagsSet: ['used:claim_sanctuary'] },
              setsFlags: ['in_sanctuary'],
              closesFlags: [],
            },
            {
              routeId: 'ran_for_the_lake',
              label: 'Run for the side door and the boats',
              predicate: { flagsSet: ['used:slip_away'] },
              setsFlags: ['ran_again'],
              closesFlags: [],
            },
            {
              routeId: 'drew_on_him',
              label: 'Draw your mother’s knife on him',
              predicate: { flagsSet: ['used:draw_steel'] },
              setsFlags: ['drew_on_him'],
              closesFlags: [],
            },
            {
              routeId: 'lied_to_him',
              label: 'Tell him a pretty lie and buy the night',
              predicate: { flagsSet: ['used:lie_smoothly'] },
              setsFlags: ['lied_to_him'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 40,
            items: [],
            flags: ['answered_him'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'the_first_night',
          playerCopy: 'Get through the first night with his camp outside the gate.',
          directorNotes:
            'The convent does not sleep. The burned arrive at the infirmary, a lantern swings at the boathouse, his camp fire leans toward him on the meadow, and Mara has something under her mattress. Nothing forces itself on the player; every door is open and every person has something they will say tonight and something they will not. A player who spends the whole night carrying water in the infirmary has made a choice, and the story should honour it.',
          enterWhen: { flagsSet: ['answered_him'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'saw_the_burned',
              label: 'Help the sisters with the people from the capital',
              predicate: { flagsSet: ['used:tend_the_wounded'] },
              setsFlags: ['saw_the_cost'],
              closesFlags: [],
            },
            {
              routeId: 'heard_his_side',
              label: 'Go out to his camp fire and hear his side',
              predicate: {
                flagsSet: ['spoke:lucien'],
                minRelationship: [{ characterId: 'lucien', dimension: 'trust', value: 45 }],
                atLocation: 'the_ardent_camp',
              },
              setsFlags: ['heard_his_side'],
              closesFlags: [],
            },
            {
              routeId: 'found_maras_letters',
              label: 'Find what Mara keeps under her mattress',
              predicate: { hasItems: ['maras_letters'] },
              setsFlags: ['knows:the_letters'],
              closesFlags: [],
            },
            {
              routeId: 'went_to_the_lantern',
              label: 'Go down to the boathouse and the prince',
              predicate: { flagsSet: ['spoke:remy'] },
              setsFlags: ['met_remy_again'],
              closesFlags: [],
            },
            {
              routeId: 'kept_watch',
              label: 'Keep watch from the bell tower',
              predicate: { flagsSet: ['used:watch_them'], atLocation: 'the_bell_tower' },
              setsFlags: ['saw_the_riders_coming'],
              closesFlags: [],
            },
            {
              routeId: 'rode_out_with_him',
              label: 'Make for the north road tonight, with him or without',
              predicate: { atLocation: 'the_north_road' },
              setsFlags: ['crossed_the_pass'],
              closesFlags: ['in_sanctuary'],
            },
          ],
          rewards: {
            xp: 70,
            items: [],
            flags: ['first_night_over'],
            abilities: [],
            reputation: [{ factionId: 'faction_stillwater', amount: 5 }],
          },
        },
      ],
    },
    {
      id: 'q_what_burned',
      title: 'What Really Burned',
      summary: 'Every rider says he burned the capital looking for you, and nine people died in it. Find out what he actually set alight, and why, and whether the thing he burned it for was ever there.',
      kind: 'MAIN',
      involvedCharacterIds: ['lucien', 'ottilie', 'isaure', 'remy'],
      involvedLocationIds: ['the_ardent_camp', 'the_gatehouse', 'the_capital_road', 'the_ashen_capital', 'mossford'],
      knownRewardCopy: 'The truth about the fire, which is worse than the rumour in one way and better in another.',
      discoverWhen: { flagsSet: ['answered_him'] },
      steps: [
        {
          id: 'what_he_burned',
          playerCopy: 'Find out what he set fire to, and why.',
          directorNotes:
            'He burned one building on purpose, the Hall of Seals, to destroy the writ that would have tried the player for treason. He rang the bells first. The wind did the rest and he could not hold all of it. Nine died. He will say every part of this if asked straight, worst fact first, and will not let anybody, the player included, make it sound better than it was. Ottilie will say what it cost him; the Justiciar will say what it cost the city.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'he_told_you',
              label: 'Make him tell you himself',
              predicate: {
                flagsSet: ['used:demand_the_truth'],
                minRelationship: [{ characterId: 'lucien', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['knows:the_hall_of_seals', 'he_told_you_himself'],
              closesFlags: [],
            },
            {
              routeId: 'ottilie_told_you',
              label: 'Get it out of his captain',
              predicate: {
                flagsSet: ['spoke:ottilie'],
                minRelationship: [{ characterId: 'ottilie', dimension: 'trust', value: 40 }],
              },
              setsFlags: ['knows:the_hall_of_seals', 'knows:his_hands'],
              closesFlags: [],
            },
            {
              routeId: 'the_justiciar_told_you',
              label: 'Hear it from the Justiciar',
              predicate: {
                flagsSet: ['spoke:isaure'],
                minRelationship: [{ characterId: 'isaure', dimension: 'trust', value: 35 }],
              },
              setsFlags: ['knows:the_hall_of_seals', 'knows:the_empty_case'],
              closesFlags: [],
            },
            {
              routeId: 'went_to_see',
              label: 'Ride to the burned city and see for yourself',
              predicate: { atLocation: 'the_ashen_capital' },
              setsFlags: ['knows:the_hall_of_seals', 'saw_the_ruins'],
              closesFlags: [],
            },
            {
              routeId: 'read_the_names',
              label: 'Read the page he keeps in his coat',
              predicate: { hasItems: ['nine_names'] },
              setsFlags: ['knows:the_hall_of_seals', 'knows:the_nine'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 110,
            items: [],
            flags: ['knows:what_he_burned'],
            abilities: [],
            reputation: [{ factionId: 'faction_burned', amount: 5 }],
          },
        },
        {
          id: 'where_the_writ_went',
          playerCopy: 'Find out whether the writ he burned a city for was ever in the Hall.',
          directorNotes:
            'It was not. Remy took it out the day before and told Lucien where it was kept. The writ is in Remy’s saddlebag at the Heron; the Justiciar has the empty iron case; Mara has a note in Remy’s hand, dated before the writ existed, that already tells the player to stay put whatever the writ says. Any one of these is enough to know. Remy is not a cackling villain when caught: he is frightened, articulate, and his argument that Lucien is too dangerous to exist is still a good one.',
          enterWhen: { flagsSet: ['knows:what_he_burned'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'took_the_writ',
              label: 'Take the writ out of the prince’s saddlebag',
              predicate: { hasItems: ['treason_writ'] },
              setsFlags: ['holds_the_writ', 'knows:remy_had_it'],
              closesFlags: [],
            },
            {
              routeId: 'remy_admitted_it',
              label: 'Make the prince admit it',
              predicate: {
                flagsSet: ['used:demand_the_truth', 'spoke:remy'],
                minRelationship: [{ characterId: 'remy', dimension: 'trust', value: 60 }],
              },
              setsFlags: ['knows:remy_had_it'],
              closesFlags: [],
            },
            {
              routeId: 'the_case_was_empty',
              label: 'Get your hands on the empty iron case',
              predicate: { hasItems: ['empty_writ_case'] },
              setsFlags: ['knows:the_case_was_empty'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 150,
            items: [],
            flags: ['knows:the_writ_survived'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_riders_at_dawn',
      title: 'Forty Riders at the Gate',
      summary: 'A Justiciar has come with forty riders and a warrant for you both. The house rule holds the gate until somebody breaks it, and twelve of his riders are facing forty of hers across a line of white stones.',
      kind: 'MAIN',
      involvedCharacterIds: ['isaure', 'lucien', 'ottilie', 'agathe'],
      involvedLocationIds: ['the_gatehouse', 'the_ardent_camp', 'the_capital_road'],
      knownRewardCopy: 'A way through the morning that does not end with a fire at the gate.',
      discoverWhen: { flagsSet: ['crown_at_the_gate'] },
      steps: [
        {
          id: 'the_standoff',
          playerCopy: 'Settle what happens at the gate before somebody forces it.',
          directorNotes:
            'Isaure will not cross the white stones while the sisters hold the rule, and her sergeant is less patient than she is. Lucien will not let anybody take the player and has one calling of the Oathfire left in him. Agathe has an order in her sleeve. If the morning runs out with nothing settled, the gate is forced and he calls the fire; that is a possibility the player can prevent, not a schedule to steer toward.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'spoke_for_him',
              label: 'Testify that the prince emptied the writ-case',
              predicate: { flagsSet: ['used:bear_witness', 'knows:remy_had_it'] },
              setsFlags: ['spoke_for_him', 'remy_exposed', 'war_averted'],
              closesFlags: ['gave_him_up'],
            },
            {
              routeId: 'gave_him_up',
              label: 'Testify that he burned the capital',
              predicate: { flagsSet: ['used:bear_witness', 'told_him_no'] },
              setsFlags: ['gave_him_up'],
              closesFlags: ['spoke_for_him'],
            },
            {
              routeId: 'held_the_gate',
              label: 'Stand behind the house rule in the grey veil',
              predicate: { flagsSet: ['in_sanctuary'], atLocation: 'the_gatehouse' },
              setsFlags: ['sanctuary_held'],
              closesFlags: [],
            },
            {
              routeId: 'let_him_go',
              label: 'Let him give himself up',
              predicate: { flagsSet: ['he_offered_himself'] },
              setsFlags: ['lucien_surrendered', 'war_averted'],
              closesFlags: [],
            },
            {
              routeId: 'taken_at_the_gate',
              label: 'Be taken when the gate falls',
              predicate: { flagsSet: ['gate_forced'], flagsUnset: ['in_sanctuary'] },
              setsFlags: ['in_crown_custody'],
              closesFlags: [],
            },
            {
              routeId: 'rode_north',
              label: 'Ride for the pass before the line closes',
              predicate: { atLocation: 'the_north_road' },
              setsFlags: ['crossed_the_pass'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 150,
            items: [],
            flags: ['the_crown_answered'],
            abilities: [],
            reputation: [{ factionId: 'faction_crown', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_the_banked_word',
      title: 'The Word That Banks a Fire',
      summary: 'The first duchess of his house took the veil at this convent and wrote down what the fire in his blood answers to, and what can put it out.',
      kind: 'LEAD',
      involvedCharacterIds: ['agathe', 'lucien'],
      involvedLocationIds: ['the_bell_tower', 'the_ardent_camp'],
      knownRewardCopy: 'A word only you can say, and the power to stop him, or save him.',
      discoverWhen: { flagsSet: ['knows:his_hands'] },
      steps: [
        {
          id: 'find_the_word',
          playerCopy: 'Learn the word the first duchess wrote down.',
          directorNotes:
            'Only for a player who has found out about his hands. The word is real and it works exactly as written: from the betrothed or the spouse, it puts out every fire he has lit and holds his own fire quiet for a day. That makes it a leash and a lifeline at once, and the player should feel both. He was always going to give it to the player, whatever their answer; Agathe was never sure she should.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'agathe_opened_the_book',
              label: 'Get Agathe to open the psalter for you',
              predicate: {
                flagsSet: ['spoke:agathe'],
                minRelationship: [{ characterId: 'agathe', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['knows:the_banked_word', 'agathe_shared_it'],
              closesFlags: [],
            },
            {
              routeId: 'took_the_psalter',
              label: 'Take the psalter from the bell-tower chest',
              predicate: { hasItems: ['stillwater_psalter'] },
              setsFlags: ['knows:the_banked_word'],
              closesFlags: [],
            },
            {
              routeId: 'he_gave_it_to_you',
              label: 'Let him give it to you himself',
              predicate: {
                flagsSet: ['spoke:lucien'],
                minRelationship: [
                  { characterId: 'lucien', dimension: 'trust', value: 70 },
                  { characterId: 'lucien', dimension: 'affection', value: 85 },
                ],
              },
              setsFlags: ['knows:the_banked_word', 'he_gave_you_the_word'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['word_in_hand'],
            abilities: ['bank_the_fire'],
            reputation: [{ factionId: 'faction_ardent', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_maras_letters',
      title: 'Mara’s Letters',
      summary: 'He did not find you by chance. Somebody has written to his household every week since you ran, and the letters came from inside the convent.',
      kind: 'SIDE',
      involvedCharacterIds: ['mara', 'ottilie'],
      involvedLocationIds: ['your_cell', 'the_ardent_camp'],
      knownRewardCopy: 'Your maid, kept or lost, and what you think loyalty is.',
      discoverWhen: { flagsSet: ['knows:the_letters'] },
      steps: [
        {
          id: 'what_mara_did',
          playerCopy: 'Decide what to do about Mara.',
          directorNotes:
            'She did it so somebody would know where they were if it went wrong, and she wrote to the only person she trusts, who happened to be his captain. She will not defend herself much and will not stop feeding the player while being shouted at. Ottilie will not let anybody blame Mara alone. Every route is fair; dismissing her is allowed and should hurt.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'forgave_her',
              label: 'Forgive her',
              predicate: {
                flagsSet: ['knows:the_letters'],
                minRelationship: [{ characterId: 'mara', dimension: 'trust', value: 80 }],
              },
              setsFlags: ['forgave_mara'],
              closesFlags: ['sent_mara_away'],
            },
            {
              routeId: 'sent_her_away',
              label: 'Send her home',
              predicate: { flagsSet: ['knows:the_letters', 'used:say_no'] },
              setsFlags: ['sent_mara_away'],
              closesFlags: ['forgave_mara'],
            },
            {
              routeId: 'sent_her_to_her_sister',
              label: 'Send her to her sister’s riders',
              predicate: { flagsSet: ['knows:the_letters', 'spoke:ottilie'] },
              setsFlags: ['mara_with_her_sister'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 80,
            items: [],
            flags: ['mara_settled'],
            abilities: [],
            reputation: [{ factionId: 'faction_ardent', amount: 5 }],
          },
        },
      ],
    },
    {
      id: 'q_your_answer',
      title: 'Your Real Answer',
      summary: 'He asked you a question in a chapel doorway. Before this is over you give him the real answer, knowing what he did, and the rest of the kingdom gives its own.',
      kind: 'MAIN',
      involvedCharacterIds: ['lucien', 'remy', 'agathe', 'ottilie'],
      involvedLocationIds: ['stillwater_chapel', 'the_gatehouse', 'the_lake_shore', 'the_north_road', 'hollowfell'],
      knownRewardCopy: 'An answer you give knowing everything, and a place to live with it.',
      discoverWhen: { flagsSet: ['knows:what_he_burned'] },
      steps: [
        {
          id: 'the_real_answer',
          playerCopy: 'Give him your real answer.',
          directorNotes:
            'Every route is a legitimate ending of the romance, including the ones without him. Going north with him is not a reward and saying no is not a punishment. Sailing with Remy without knowing what he did is the trap the story has been setting since the lantern, and it should feel like a rescue right up to the end. Never have Lucien argue with a final answer; he has said his piece, and what he does next is in the endings.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'went_home_with_him',
              label: 'Go north with him, knowing what he did',
              predicate: { flagsSet: ['used:take_his_hand', 'knows:what_he_burned'], atLocation: 'the_north_road' },
              setsFlags: ['went_north_with_him'],
              closesFlags: ['parted_from_him', 'took_the_veil'],
            },
            {
              routeId: 'on_your_terms',
              label: 'Marry him on terms you set, holding his word',
              predicate: {
                flagsSet: ['used:set_terms', 'knows:the_banked_word'],
                minRelationship: [{ characterId: 'lucien', dimension: 'trust', value: 70 }],
              },
              setsFlags: ['married_on_terms'],
              closesFlags: ['parted_from_him'],
            },
            {
              routeId: 'parted_from_him',
              label: 'Tell him no, knowing everything',
              predicate: { flagsSet: ['used:say_no', 'knows:what_he_burned'] },
              setsFlags: ['parted_from_him'],
              closesFlags: ['went_north_with_him', 'married_on_terms'],
            },
            {
              routeId: 'took_the_veil',
              label: 'Take the grey veil for a year and a day',
              predicate: { flagsSet: ['in_sanctuary'], hasItems: ['grey_veil'] },
              setsFlags: ['took_the_veil'],
              closesFlags: ['went_north_with_him', 'married_on_terms'],
            },
            {
              routeId: 'sailed_with_remy',
              label: 'Get into the prince’s boat',
              predicate: {
                flagsSet: ['spoke:remy'],
                flagsUnset: ['knows:remy_had_it'],
                atLocation: 'the_lake_shore',
              },
              setsFlags: ['sailed_with_remy'],
              closesFlags: ['went_north_with_him'],
            },
            {
              routeId: 'held_the_north',
              label: 'Ride north and hold his country for him',
              predicate: { flagsSet: ['lucien_surrendered'], atLocation: 'the_north_road' },
              setsFlags: ['holds_the_north'],
              closesFlags: ['sailed_with_remy'],
            },
            {
              routeId: 'banked_his_fire',
              label: 'Speak the word when he calls the fire',
              predicate: { flagsSet: ['he_called_the_fire', 'used:bank_the_fire'] },
              setsFlags: ['saved_him'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 220,
            items: [],
            flags: ['answered_for_good'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_the_burned_arrive',
      atWorldMinute: 22 * 60 + 30,
      locationId: 'the_infirmary',
      publicCopy:
        'Two carts come up the convent road from the south and stop at the infirmary door: eleven people from the capital, bandaged hands, singed hair, a baker still holding his bread paddle.',
      directorNotes:
        'The cost of the fire, with faces. None of them knows who the player is, and two of them say his name the way people say the name of a storm. Agathe needs hands. Show the burns as bandages, coughing and what people carried out, never the wound.',
      setsFlags: ['the_burned_came'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'agathe', toLocationId: 'the_infirmary' }],
    },
    {
      id: 'we_the_lantern',
      atWorldMinute: 23 * 60 + 30,
      locationId: 'the_lake_shore',
      publicCopy:
        'Down on the lake a lantern swings three times at the boathouse door: the signal the prince used the night he got you out.',
      directorNotes:
        'Remy rowed up from Mossford after dark. He is charming, relieved, a little out of breath, and he has a boat ready. He wants the player in it tonight. Nothing about him is sinister on the surface; let the player like him and let his argument against the Grand Duke land.',
      setsFlags: ['remy_signalled'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'remy', toLocationId: 'the_lake_shore' }],
    },
    {
      id: 'we_torches_on_the_road',
      atWorldMinute: 1440 + 5 * 60 + 20,
      locationId: 'the_bell_tower',
      publicCopy: 'Before dawn, a line of torches on the south road, too many to count at once, all moving under one banner.',
      directorNotes:
        'Seen from the bell tower or the gate. Ottilie has seen them too and is already beside the Grand Duke at the white stones. They are under two hours away.',
      setsFlags: ['riders_seen'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_the_justiciar_at_the_gate',
      atWorldMinute: 1440 + 7 * 60,
      locationId: 'the_gatehouse',
      publicCopy:
        'Forty riders under the crown’s banner draw up outside Stillwater’s white stones. A woman in a grey judge’s coat dismounts and reads a warrant aloud. Both your names are in it.',
      directorNotes:
        'Isaure Dane will not cross the stones while the sisters hold the house rule, and says so. She asks for the player to come out and give a statement, and for the Grand Duke to surrender. Twelve Ardent riders face forty across a line of white stones; everybody is very polite and nobody takes a hand off a hilt.',
      setsFlags: ['crown_at_the_gate'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'isaure', toLocationId: 'the_gatehouse' },
        { characterId: 'lucien', toLocationId: 'the_gatehouse' },
      ],
    },
    {
      id: 'we_he_walks_out',
      atWorldMinute: 1440 + 7 * 60 + 40,
      locationId: 'the_gatehouse',
      publicCopy:
        'He unbuckles his sword belt, hands it to his captain without looking at her, and walks out across the white stones toward the Justiciar’s line with his gloved hands open.',
      directorNotes:
        'His plan since the doorway, if the answer was no. He is giving the crown its traitor so the army never goes north. Ottilie is white with fury and obeying. The player can stop him, follow him, testify, or let him go; whatever they do, he does not look back at the gate, because he promised not to make this harder.',
      setsFlags: ['he_offered_himself'],
      cancelledByFlags: ['took_his_hand', 'lucien_surrendered', 'crossed_the_pass'],
      requiresFlags: ['told_him_no', 'crown_at_the_gate'],
      movesCharacters: [],
    },
    {
      id: 'we_the_archbishops_order',
      atWorldMinute: 1440 + 9 * 60,
      locationId: 'the_infirmary',
      publicCopy: 'A rider in church grey hands Sister Agathe a sealed letter at the infirmary door. She reads it twice and puts it in her sleeve.',
      directorNotes:
        'The Archbishop’s order again, carried with the Justiciar for exactly this. Agathe has until the evening office to decide whether Stillwater keeps the player or keeps its charter. She will not lie about it if asked, and she will not decide it for the player.',
      setsFlags: ['the_order_came'],
      cancelledByFlags: [],
      requiresFlags: ['crown_at_the_gate'],
      movesCharacters: [],
    },
    {
      id: 'we_the_gate_forced',
      atWorldMinute: 1440 + 11 * 60,
      locationId: 'the_gatehouse',
      publicCopy: 'The Justiciar’s sergeant runs out of patience before she does. Ropes go over the gate bar, and forty riders lean on them.',
      directorNotes:
        'Only if nothing at the gate is settled by late morning. Isaure did not order this and is shouting to stop it. Lucien calls the Oathfire to hold the gate: a wall of fire along the white stones, riders thrown back, nobody burned if he can help it. It is his second full calling this season and it is killing him. Unless the player knows the Banked Word and speaks it, he does not walk away from this.',
      setsFlags: ['gate_forced', 'he_called_the_fire'],
      cancelledByFlags: ['the_crown_answered', 'lucien_surrendered', 'crossed_the_pass'],
      requiresFlags: ['crown_at_the_gate'],
      movesCharacters: [{ characterId: 'lucien', toLocationId: 'the_gatehouse' }],
    },
    {
      id: 'we_his_hands',
      atWorldMinute: 1440 + 21 * 60,
      locationId: 'the_ardent_camp',
      publicCopy: 'At the camp fire he pulls one glove off with his teeth to hold a hot cup, forgets for a moment that you are there, and you see his hand.',
      directorNotes:
        'Only after the player has sat at his fire and heard his side, never on the first night. Burned to the wrist and healing badly. Do not describe the injury in detail: the colour of the bandage, how he holds the cup in his fingertips, how fast the glove goes back on. Ottilie looks away. If the player asks, Ottilie or he will say exactly what a second calling would do.',
      setsFlags: ['knows:his_hands'],
      cancelledByFlags: [],
      requiresFlags: ['heard_his_side'],
      movesCharacters: [],
    },
    {
      id: 'we_fire_in_mossford',
      atWorldMinute: 2 * 1440 + 20 * 60,
      locationId: 'mossford',
      publicCopy: 'Just after dark the stables behind the Heron inn go up, and the whole of Mossford is on the lake road shouting the Grand Duke’s name.',
      directorNotes:
        'Remy’s manservant set it, on Remy’s orders, to make the valley blame Lucien and drive the player into the boat. Lucien never left the camp and Ottilie will swear to it. If the player speaks the Banked Word and this fire does not go out, it was never his, and that is proof anybody watching can see. Nobody dies in this one; the horses are got out.',
      setsFlags: ['mossford_burned'],
      cancelledByFlags: ['remy_exposed', 'sailed_with_remy'],
      requiresFlags: ['spoke:remy'],
      movesCharacters: [],
    },
    {
      id: 'we_the_army_marches',
      atWorldMinute: 3 * 1440 + 8 * 60,
      locationId: null,
      publicCopy: 'The crown’s army leaves the ruins of the capital and turns onto the north road.',
      directorNotes:
        'Six thousand soldiers, four days from the pass. From now on every conversation about the north is a conversation about a war that has started. It can still be stopped by the truth reaching the King, or by the Grand Duke in chains.',
      setsFlags: ['the_army_marched'],
      cancelledByFlags: ['war_averted'],
      requiresFlags: [],
      movesCharacters: [],
    },
  ],
  promises: [
    {
      id: 'p_your_answer',
      kind: 'FINALE',
      label: 'What you finally tell him',
      seedHint: 'A ring in a gloved palm, held out across a threshold he will not cross.',
      payoffHint: 'An answer given knowing everything, to him and to the kingdom, and honoured whichever it is.',
      weight: 1,
    },
    {
      id: 'p_what_burned',
      kind: 'MYSTERY',
      label: 'What really burned in the capital',
      seedHint: 'Every rider says the same thing: the capital burned, and he was looking for you.',
      payoffHint: 'The Hall of Seals, an iron case that was empty before the fire, and a writ folded in four in a prince’s saddlebag.',
      weight: 0.9,
    },
    {
      id: 'p_the_prince',
      kind: 'RIVAL',
      label: 'The prince who helped you run',
      seedHint: 'A lantern swung three times at the boathouse, the same signal as the night you ran.',
      payoffHint: '"A man who would burn a city for you will burn one at you." The man who said it lit the match.',
      weight: 0.8,
    },
    {
      id: 'p_his_hands',
      kind: 'RELATIONSHIP',
      label: 'What the fire cost him',
      seedHint: 'He never takes his gloves off, even to hold a cup.',
      payoffHint: 'His hands, the first duchess’s word, and the choice of whether to use it on him.',
      weight: 0.75,
    },
    {
      id: 'p_the_nine',
      kind: 'THEME',
      label: 'Nine people who were not looking for anybody',
      seedHint: 'Two carts of the burned at the infirmary door on the first night.',
      payoffHint: 'A page of nine names in his handwriting, and what anybody is willing to do about them.',
      weight: 0.6,
    },
  ],
  archetypes: [
    {
      id: 'arch_steward',
      name: 'You Kept the House Books',
      role: 'Background: letters and law',
      summary: 'You ran your family’s estate, rents and lawsuits for five years, so writs, seals and what a document is really for are your native language, and your family’s signet is in a pouch at your belt.',
      playstyle: ['Observant', 'Reads the fine print', 'Patient'],
      blurb: 'You read the old betrothal law cover to cover before you ran, which is how you knew exactly what it would cost and did it anyway.',
      attributeBonus: { mind: 3, resolve: 1 },
      skillProficiencies: { letters: 3, insight: 1, steel: 1 },
      startingItems: [{ itemId: 'family_seal', qty: 1 }],
      startingAbilities: ['say_no', 'take_his_hand', 'set_terms'],
      startingReputation: [],
    },
    {
      id: 'arch_rider',
      name: 'You Ride and Fence',
      role: 'Background: riding and blade',
      summary: 'A fencing master hired to scandalise the court taught you the knife, and you rode before you danced, so running is something you are good at, and your grey mare is in the convent stable.',
      playstyle: ['Physical', 'Fast', 'Takes risks'],
      blurb: 'You have outridden two suitors and a royal hunt, and his captain will notice how you sit a horse before she notices anything else.',
      attributeBonus: { agility: 2, might: 2 },
      skillProficiencies: { riding: 3, knifework: 2 },
      startingItems: [{ itemId: 'grey_mare', qty: 1 }],
      startingAbilities: ['say_no', 'take_his_hand', 'slip_away'],
      startingReputation: [{ factionId: 'faction_ardent', amount: 5 }],
    },
    {
      id: 'arch_courtier',
      name: 'The Court’s Favourite',
      role: 'Background: social and court',
      summary: 'Two seasons at court taught you every smile, every lie worth telling and every name worth knowing, which is how you came to trust a prince, and three pearl hairpins worth a good horse each are still in your hair.',
      playstyle: ['Charming', 'Talks well', 'Lies well'],
      blurb: 'Half the capital danced with you and the other half wrote poems about it, and none of them ever once knew what you were thinking.',
      attributeBonus: { presence: 3, agility: 1 },
      skillProficiencies: { court_face: 3, insight: 2 },
      startingItems: [{ itemId: 'pearl_pins', qty: 1 }],
      startingAbilities: ['say_no', 'take_his_hand', 'lie_smoothly'],
      startingReputation: [{ factionId: 'faction_crown', amount: 10 }],
    },
    {
      id: 'arch_devout',
      name: 'Taught by Canonesses',
      role: 'Background: lore and healing',
      summary: 'You were schooled by canonesses before you were sent to court, so Stillwater’s rules, its old psalms and its infirmary feel like home ground, and you still carry their plain wooden prayer beads.',
      playstyle: ['Calm', 'Healer', 'Knows the old rules'],
      blurb: 'You can sing the night office from memory and dress a burn without flinching, and the sisters noticed both inside a week.',
      attributeBonus: { arcana: 3, mind: 1 },
      skillProficiencies: { old_lore: 3, nursing: 2 },
      startingItems: [{ itemId: 'chapel_beads', qty: 1 }],
      startingAbilities: ['say_no', 'take_his_hand', 'claim_sanctuary'],
      startingReputation: [{ factionId: 'faction_stillwater', amount: 10 }],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What name did you run from?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Elise Marchand' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. she/her' },
    {
      id: 'archetype',
      label: 'How were you raised, before you ran?',
      helpText:
        'What your family made of you before the betrothal, which sets what you are good at. It is fixed for the whole story and cannot be changed later. It does not decide whether you go with him, whether you forgive him, or what you do about the fire: all of that is yours, and none of it is decided here.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'What does the court say about you?',
      helpText: 'The thing everybody in the capital would say about the one who ran. One plain sentence is the right amount.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. That I laughed out loud during the betrothal rite and never once apologised.',
    },
    {
      id: 'first_instinct',
      label: 'When he holds out his hand, what is your first instinct?',
      helpText: 'A starting temperament, not a promise. You can do the exact opposite on the first turn and the story will keep up.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'take_it', label: 'Take it, and hate how much you want to' },
        { id: 'refuse', label: 'Refuse him. You ran for a reason' },
        { id: 'explain', label: 'Make him explain the fire first' },
        { id: 'run', label: 'Run again, now, while he is on the step' },
        { id: 'hide', label: 'Stay behind the sister and the house rule' },
      ],
    },
    {
      id: 'appearance',
      label: 'What does he see in the candlelight?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. A borrowed grey dress, my hair still pinned from a ball nineteen days ago, and my mother’s knife in my sleeve.',
    },
  ],
  /**
   * Where this can end up. Twelve, because the storyteller reads the first
   * twelve and no more.
   *
   * Three are plain losses: the crown takes the player, he burns out at the
   * gate, or the player sails away with the man who lit the match and never
   * finds out. Four end without him and none of those is written as a failure:
   * "Tell Me No" is the promise in the opener kept, and "Gone Before Morning"
   * is walking out on all of them, open from turn eighteen.
   *
   * Only "The Banked Fire" needs the optional word, and every other ending is
   * reachable by a player who never climbs the bell tower.
   */
  endings: [
    {
      id: 'end_come_home',
      name: 'Come Home',
      rarity: 'COMMON',
      minTurn: 28,
      requires: {
        flagsSet: ['went_north_with_him'],
        flagsUnset: ['in_crown_custody'],
        minRelationship: [{ characterId: 'lucien', dimension: 'affection', value: 80 }],
      },
      condition:
        'The player went north with him knowing exactly what he did, and chose it anyway. Write the crossing of the pass and the first night at Hollowfell, not a wedding. He asks before he does anything, still, and the household watches the player to see what kind of consort this will be. The nine are not forgotten: there is a letter on his desk to a baker’s widow, and the player can see it.',
      epilogue:
        'The hearth at Hollowfell has not gone out in three hundred years, and the first thing the player learns is that it leans toward him too. The wedding is small, in the snow, with Ottilie as witness and complaining throughout. Every spring he rides south with money for the Street of Lamps, and every spring the player goes with him.',
      hint: '',
    },
    {
      id: 'end_on_your_terms',
      name: 'On Your Terms',
      rarity: 'UNCOMMON',
      minTurn: 32,
      requires: {
        flagsSet: ['married_on_terms', 'knows:the_banked_word'],
        minRelationship: [{ characterId: 'lucien', dimension: 'trust', value: 75 }],
      },
      condition:
        'The player said yes with conditions, in writing, and holds the word that banks his fire. This is the version where the romance is between equals: name the actual terms the player set, show him agreeing to each one without bargaining, and let the word sit between them as trust rather than a leash.',
      epilogue:
        'The contract runs to four pages and he signs every one of them in front of Agathe without reading past the first. The player has never once had to speak the word. Both of them know it is there, and it turns out that knowing is what lets him sleep.',
      hint: 'The first duchess wrote something down.',
    },
    {
      id: 'end_tell_me_no',
      name: 'Tell Me No',
      rarity: 'COMMON',
      minTurn: 24,
      requires: {
        flagsSet: ['parted_from_him'],
        flagsUnset: ['remy_exposed', 'sailed_with_remy'],
      },
      condition:
        'The player told him no, knowing everything, and he honoured it, exactly as he promised in the doorway. This is the opener kept, not a failure. Write him going, without a speech and without looking back, and write the player free: a road, a name of their own, the first morning nobody is looking for them. Do not punish the choice.',
      epilogue:
        'Ottilie escorts the player as far as the coast, under orders, furious, and at the last inn buys them both a drink and says the one kind thing she has said all week. The ring comes back once, years later, in a parcel with no letter. The player keeps it in a drawer and never decides what it means.',
      hint: '',
    },
    {
      id: 'end_the_grey_veil',
      name: 'The Grey Veil',
      rarity: 'UNCOMMON',
      minTurn: 26,
      requires: { flagsSet: ['took_the_veil'] },
      condition:
        'The player took the grey veil and the house rule: a year and a day in which no king and no duke can take them anywhere. It is a refusal of everyone, chosen, and the story should treat it as a real life rather than a hiding place. He camps outside the white stones for a week and then goes home, because he was asked to.',
      epilogue:
        'The year is cold, busy and mostly spent in the infirmary. Letters arrive from the north every month, unsigned, and the player answers four of them. On the morning after the year and a day, there is one rider at the gate, alone, and no ring this time. Just a question.',
      hint: '',
    },
    {
      id: 'end_gone_before_morning',
      name: 'Gone Before Morning',
      rarity: 'UNCOMMON',
      minTurn: 18,
      requires: { flagsSet: ['left_the_map'] },
      condition:
        'The player walked out on all of them: the duke, the prince, the sisters and the crown, and did not explain it to anybody. It is a completely coherent answer to a week like this. Do not redeem it and do not make it tragic. The people who pay for it are the ones left behind.',
      epilogue:
        'Mara finds the cot empty at dawn and the mother’s knife gone. He does not send riders after the player, and Ottilie never forgives him for that or understands it. Somewhere far from any capital the player gives a new name at a new door, and it holds.',
      hint: '',
    },
    {
      id: 'end_the_princes_ship',
      name: 'The Prince’s Ship',
      rarity: 'UNCOMMON',
      minTurn: 24,
      requires: {
        flagsSet: ['sailed_with_remy'],
        flagsUnset: ['knows:remy_had_it'],
      },
      condition:
        'The player got into Remy’s boat without ever learning what he did, and it felt like a rescue. It is a loss that looks like a happy ending, and it should be written as one: warm, safe, beautifully lit, and wrong. Let the player find one small thing that does not fit, and leave it there.',
      epilogue:
        'The river reaches the sea in four days. Remy is kind every one of them. In the spring a letter reaches the coast saying the Grand Duke Ardent was tried for the burning of the capital and did not defend himself. Remy reads it at breakfast, folds it in four, and puts it in his coat.',
      hint: 'The lantern swung three times.',
    },
    {
      id: 'end_the_traitors_runaway',
      name: 'The Traitor’s Runaway',
      rarity: 'COMMON',
      minTurn: 16,
      requires: { flagsSet: ['in_crown_custody'] },
      condition:
        'The crown took the player. This is a plain loss: a closed carriage on the south road, a room with a locked door in what is left of the palace, and a court that wants the player to say one sentence about the Grand Duke. Isaure Dane is the only person who treats them as a witness rather than a prize.',
      epilogue:
        'They keep the player comfortable and watched for a season. The north does not come for them, because he was told it would be war, and he listened. What the player says at the hearing is the last thing either of them gets to decide, and the court records it word for word.',
      hint: '',
    },
    {
      id: 'end_burned_out',
      name: 'Burned Out',
      rarity: 'RARE',
      minTurn: 20,
      requires: {
        flagsSet: ['he_called_the_fire'],
        flagsUnset: ['used:bank_the_fire', 'saved_him'],
      },
      condition:
        'He called the Oathfire a second time this season to hold the gate, and nobody spoke the word that would have stopped it. It held the gate. It killed him. This is a real loss and should be written with restraint: no flourish, no last speech beyond a few words to the player, and the candles in the chapel standing straight for the first time.',
      epilogue:
        'Ottilie carries him down the pass in a cart, which is the thing she swore she would never do again. The army turns back at the border, because there is nobody left to fight. Agathe writes his name in the chapel book under his father’s, and leaves the line under it blank.',
      hint: 'He never takes his gloves off.',
    },
    {
      id: 'end_what_the_ashes_said',
      name: 'What the Ashes Said',
      rarity: 'RARE',
      minTurn: 34,
      requires: { flagsSet: ['spoke_for_him', 'he_offered_himself'] },
      condition:
        'The player told him no, he walked out across the white stones to give himself up, and the player testified under oath that the prince emptied the writ-case, before he went or after. The truth comes out and he is still tried, because nine people died and he will not say otherwise. Write the hearing, the verdict and the player choosing where to stand during it.',
      epilogue:
        'The court sentences him to rebuild the Street of Lamps with his own money and his own hands, gloves and all, for as long as it takes. Remy leaves the country quietly in the autumn. The player visits the site more often than strictly necessary, and nobody on the scaffolding is fooled.',
      hint: '',
    },
    {
      id: 'end_the_witness',
      name: 'The Witness',
      rarity: 'RARE',
      minTurn: 30,
      requires: { flagsSet: ['remy_exposed', 'parted_from_him'] },
      condition:
        'The player exposed the prince and then refused both men. This is the ending where the player belongs to nobody and is owed something by everybody: the crown pardons them in public and resents it in private. Write it as earned independence, with the one cost being that they know exactly what both men were willing to do in their name.',
      epilogue:
        'Isaure Dane reads the player’s statement into the record herself. The pardon arrives with the King’s seal and no letter. The player buys back their family’s lands with eleven gold crowns and a very long lawsuit, and wins.',
      hint: 'The case was empty.',
    },
    {
      id: 'end_grand_duchess',
      name: 'Holding the North',
      rarity: 'RARE',
      minTurn: 34,
      requires: {
        flagsSet: ['holds_the_north'],
        minFactionReputation: [{ factionId: 'faction_ardent', value: 20 }],
      },
      condition:
        'He gave himself up to stop the war, and the player crossed the pass and held his country for him: his household, his riders and his fortress, under the player’s orders. It is a power ending, not a romance one. Write the first council at Hollowfell and the moment the household decides to obey.',
      epilogue:
        'The north holds the winter without a Grand Duke and without a war. Ottilie becomes the player’s captain and stops pretending to mind. In spring the player rides south to negotiate his release, and the King, who has never once been out-argued in his own hall, is.',
      hint: '',
    },
    {
      id: 'end_the_banked_fire',
      name: 'The Banked Fire',
      rarity: 'UNIQUE',
      minTurn: 30,
      requires: { flagsSet: ['saved_him', 'knows:the_banked_word'] },
      condition:
        'He called the Oathfire to hold the gate, and the player spoke the first duchess’s word in front of forty riders and a Justiciar. Every flame went out. He lived. And the whole crown saw, with their own eyes, that the most dangerous fire in the kingdom answers to the player’s voice. Write the silence after, and what that changes about who has power here.',
      epilogue:
        'Isaure Dane writes it down exactly, and her report reaches the King before the army does. The fire leans toward him still, but it waits now, and everybody in the kingdom knows what it is waiting for. He asks the question in the doorway one more time, in the spring, and this time the player does not need a ring to answer.',
      hint: 'The first duchess retired here.',
    },
  ],
  opening:
    "Every candle in the chapel leans toward the door at once.\n\nSister Agathe stops mid-psalm and steps in front of you. \"Stay behind me,\" she says, low. \"That’s him.\"\n\nThe man you were promised to stands in the doorway. Gloved. Ash on his collar. Smoke lifting off his coat into the cold.\n\nThree nights ago the sky to the south turned orange until dawn. Every rider since has said the same thing: the capital burned, and he was looking for you.\n\nHe has already found you behind her.\n\n\"You ran,\" he says. \"So I burned everything you ran from.\"\n\nHe holds out his hand. Your betrothal ring lies in the palm.\n\n\"Come home. Or tell me no.\"",
  openingPanel: {
    assetKey: 'story_he_burned_the_capital/opening',
    alt: 'Lucien, the Grand Duke, black-gloved in a smoke-dark coat, holds a red-gold ring out on his palm in a candlelit chapel doorway, every flame leaning to him, a nun in grey between him and you.',
  },
  openingSuggestions: [
    '"No. Not until you tell me how many people died."',
    'I step out from behind Sister Agathe and take back my ring.',
    'I bolt for the side door and the boats on the lake.',
  ],
  coverDirection: [
    'SUBJECT: Grand Duke Lucien Ardent, alone and unmistakable in the foreground of a key visual for a romance fantasy anime about a man who burned a city and is now asking.',
    'He stands in the arched west doorway of a stone convent chapel at night and fills the frame from the waist up, centred and close, holding about two thirds of the picture.',
    'Tall and lean, short black hair falling into pale grey eyes, a long black riding coat with grey ash in its seams over a high-collared charcoal tunic buttoned to the throat, and black leather gloves buttoned at the wrist.',
    'One gloved hand is held out toward the viewer, palm up, and in the palm lies a dark red-gold ring that catches the candlelight in one bright glint; the other hand rests on the stone of the door frame.',
    'Thin grey smoke lifts off the shoulders of the coat into the cold air.',
    'His expression is calm, intent and a little sad, lips closed, looking straight at the viewer as if he has asked a question and is waiting for the answer.',
    'AROUND HIM, rows of tall chapel candles in the foreground and along the edges of the frame, every flame leaning toward him.',
    'BEHIND HIM, soft and secondary, through the open door: a dark mountain landscape under a cold blue night sky, and a faint orange glow on the far horizon where a city burned.',
    'LIGHT: warm gold candlelight on him from the front and cold blue night behind, so he is rimmed in gold against the dark.',
    'HIS FACE STAYS CLEAN: no glow, sparks, embers, ash, marks or fire effects on his face or skin.',
    'Every flame, ember and glow stays on the candles, the smoke, the ring, the horizon and the title, never on his face.',
    'TITLE: the title He Burned the Capital painted into the art in the upper third, above his head, as an elegant high-contrast serif logo set in capitals on two lines,',
    'HE BURNED on the first line and THE CAPITAL larger on the second, warm ivory-white letters with a thin black outline and a soft ember-orange glow along their lower edges, a few small sparks drifting up off the last line,',
    'spelled exactly HE BURNED THE CAPITAL, large and legible at thumbnail size. No other text anywhere: nothing written on the ring, the door, the candles or the sky.',
  ].join(' '),
  publishedAt: null,
};

export const HE_BURNED_THE_CAPITAL = StoryVersion.parse(raw);
