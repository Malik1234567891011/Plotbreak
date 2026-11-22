# THE MORNING OF THE GALLOWS

**Slate:** #26 of 50 (`docs/stories-50/PLAN.md`), Drop 3.
**Trope:** Betrayal and regression: executed, sent back, and given one more try. **Lean:** male.
**OOC evidence:** "The Betrayal" 5.2M plays; "Return of the Heavenly Demon" 190K.
**Hook:** Hanged for treason, you wake three years earlier, and the woman who signed your warrant is at your cell with a key.
**Fixture:** `packages/test-fixtures/src/the-morning-of-the-gallows.ts` (`THE_MORNING_OF_THE_GALLOWS`,
`story_the_morning_of_the_gallows`). **Spec:** `the-morning-of-the-gallows.spec.ts`.
**Protagonist:** BLANK. The player names themselves; the archetype is what kind of knight-captain they were.
**Title check:** a search for existing work titled "The Morning of the Gallows" found nothing.

## Adults only

Every person in this story is an adult. The ages are canon and are also the first line of `hardCanon`,
so the storyteller has them on every turn.

| Who | Age |
|---|---|
| The player, knight-captain of the Watergate Company | 26 (29 on the gallows, last time) |
| Lady Isra Vane, the Crown's Advocate, your betrothed | 26 |
| Prince Corvin, the King's only son | 30 |
| Sabine Orrel, the Prince's secretary | 32 |
| Sergeant Hob Garrow, turnkey | 54 |
| Hangman Tull (Ambrose Tull) | 66 |
| King Osric of Vellmark (offstage, at the feast) | 71 |

Covers and portraits describe people by costume and pose, never by age words. Content stays 13+:
romance goes up to a kiss and no further, and the gallows is described by its timber and its crowd,
never by a body.

## The pitch

Three years from now you were hanged on Tollmarket Green for poisoning the old king. You did not do it.
The woman who prosecuted you, signed the warrant and read it aloud at the foot of the scaffold was
Lady Isra Vane, who was going to marry you.

This morning you wake in a cell under the Watergate, three years earlier, with a red rope line round
your neck that does not fade. A key turns in the lock. It is Isra, hooded, with a stolen key ring and
a shaking hand, and she remembers too.

## Playable span

One week in the river city of Vellmark: from 05:40 on day 0 in the Watergate cells to the Feast of
Oaths on the evening of day 6. Last time, that feast is where the player knelt and gave the Prince the
signet ring that later sealed three forged letters. Everything after the feast (the three years, a
second trial, a second gallows or none) lives in the endings.

Small on purpose: one city, twelve places, five people, and a memory of the future that gets less
reliable with every change the player makes.

## The world, in plain words

- **Vellmark** is a walled river city and the capital of a small kingdom. **King Osric** rules from the
  Crownhold on the hill. Bread has doubled since spring. The Crown hangs bread thieves on Tollmarket Green.
- **Yesterday** the player, captain of the sixty-strong Watergate Company, refused the Lord Marshal's
  order to turn the company's crossbows on a bread riot in the river market. They spent the night in
  their own cells for it. It is the only night they were ever locked up.
- **Last time**, at nine this morning, Prince Corvin came down alone, praised the refusal, had the charge
  dropped and made them captain of his guard. Six days later, at the Feast of Oaths, they knelt and put
  their signet ring in his hand. Three years later the King died of a shaking illness, and they hanged
  for it: a vial of nightbell in their sea chest, three letters to the Duke of Harn under their seal, and
  their old sergeant swearing he saw them with the vial.
- **Nightbell** is a blue-flowered plant sold as dye. A drop a week makes a shaking sickness that looks
  like old age. A spoonful stops the heart. The King's hands began to shake this spring.

## The knot (the thing that makes this a regression story)

Hangman Tull knows a knot no other hangman can tie: **the turning knot**. Tied right on a wrongly hanged
neck, it sends the condemned back to their last free morning. Three people come back remembering:

1. **The neck.** The player, with a rope line that does not fade.
2. **The hand that signed the warrant.** Isra. A thin red line circles her right wrist, hidden under one
   long black glove. It appeared at four this morning.
3. **The one who tied it.** Tull. Each turning takes something of his and does not give it back: the
   first took his mother's voice, the second his wife's face. He does not yet know what this one took.

**It works once for any neck. There is no third morning.** That line is in the premise, the chips and
hard canon. A player who gets themselves hanged again stays hanged.

The memory is the player's power and their trap. While events run the old course, every remembered
line is accurate. Every change they make bends the future away from what they remember. That is the
invisible `old_course` variable, and the storyteller is told to make it felt.

Isra went to Tull at midnight before the hanging, after Hob confessed to her that he had been paid to
plant the vial, and after she took that to Corvin and he thanked her and did nothing. She had read the
knot in an old case file. She did not believe it would work.

## Premise (as shipped)

> Three years from now, you were hanged in the city square for poisoning the old king. You did not do
> it. A vial of poison was found in your quarters, three letters under your own seal were read to the
> court, and your old sergeant swore he saw you with the vial. The Crown's Advocate who prosecuted the
> case and signed your death warrant was Lady Isra Vane, who was going to marry you.
>
> This morning you woke in a cell under the Watergate, three years earlier, on the one night you ever
> spent locked up: the night after you refused an order to turn your company's crossbows on a bread
> riot. There is a rope mark on your neck that does not fade.
>
> Isra remembers too. She is at the cell door with a stolen key, and a boat is waiting on the river
> until the seven o'clock bell.
>
> At nine, if you are still here, Prince Corvin will walk down those stairs, praise you for refusing,
> and make you captain of his guard. Last time that was the best day of your life. Six days later, at
> the Feast of Oaths, you knelt and put your signet ring, which seals your every order, in his hand.
>
> Somebody in this city is already building your gallows, and you have one week before the first of it
> is in place. You know how the last life ended. With every change you make, that knowledge gets less
> true. There is no third morning.

The Prince's guilt is **not** in the premise, the hook, the opener or his card. The spec checks that.

## Opener (turn 1, verbatim)

> A key turns in the lock, and you wake with a rope around your throat.
>
> There is no rope. There is a cell, wet straw, a grey slit of dawn, and a raw red line around your neck
> where the knot sat.
>
> "Up," Isra says from the doorway, her hood pulled low. "Quietly."
>
> Your betrothed. The last time you saw her, she stood beneath the gallows and read your death warrant
> aloud.
>
> Behind her, your old sergeant snores at the turnkey's desk, his key ring gone from his belt.
>
> Isra holds the door open. Her hand is shaking.
>
> "Walk out with me now," she says, "or stay and die like last time."

**Quality bar:** 112 words. Isra speaks at word 43. It ends on a demand with two answers and a clock.
The only proper noun is Isra, introduced as "your betrothed". She says "last time", so the player
learns in the first beat that she remembers.

**Opening suggestions** (said / done / risky):

1. Said: `"Last time? You remember it too?"`
2. Done: `I take her hand and walk out past my sleeping sergeant.`
3. Risky: `I sit back down on the straw and wait for the prince, like last time.`

## Cast

Every one of them wants something that has nothing to do with the player.

### Lady Isra Vane, 26, the Crown's Advocate, your betrothed

- **Looks:** Black hair cut sharp at the jaw, grey eyes, an advocate's black coat with a high white
  collar under a hooded cloak, ink on her left hand. **One long black glove on her right hand only.**
- **Voice:** Clipped, exact, legal. Numbers her points ("Item one…"), states the charge before the
  feeling, and when she breaks it is one unguarded sentence before she goes back to the list.
  "Hate me in a boat. Please. I can live with that one."
- **Her own motive:** She believed the evidence over the person. She wants to be punished by the one
  person entitled to do it, and is afraid you will be kind instead. She would rather you were in a boat
  hating her than in the city and dead.
- **Boundaries:** Will not lie under oath, even to save you. Will not ask to be forgiven; if it is
  offered she makes you say it twice.
- **Secrets:** Why she signed (the evidence was complete, and if she had stepped aside the case went to
  a man who would have hanged you faster; she read it aloud herself so the last voice you heard loved
  you). Hob's confession and the midnight visit to the Hangman. The red line on her wrist.
- **Gates:** names the Hangman (trust 55 + you compared notes); takes off the glove (trust 62 + heard
  her out); a kiss, this time (ROMANCE: trust 65, affection 80, forgave her).
- **Starts:** trust 50, affection 75, respect 55, fear 15.

### Prince Corvin, 30, heir to the throne

- **Looks:** Tall and easy, sandy hair, a broad warm smile, a plain green coat, **soil on his cuffs**,
  no crown or chain anywhere.
- **Voice:** Warm, quick, self-mocking, first names at once, garden words for the kingdom (grafting,
  rootstock, frost). Never raises his voice; gets quieter when crossed.
- **His own motive:** He wants the bread hangings ended and the granaries built, and he has decided his
  father has to die for that, calmly, in the spring, with a pruning knife in his hand.
- **The secret (hard canon, never narrated):** he brews nightbell in a stillroom behind his glasshouse
  at Ashcourt and doses the seventh-day cask of wine he sends the King. He chose the player to hang for
  it the night of the riot, because a court will believe a knight who refused one order would refuse a
  king. He genuinely likes them, and counts that as a price he is paying.
- **Boundaries:** No violence in public, ever. Will not move against Isra. Will not confess, not even to
  someone who already knows; he says it only to someone who has joined him.
- **Gates:** the glasshouse (ALLIANCE: trust 50 + sworn to him); tells you what goes in the cask
  (trust 75 + joined him).

### Sergeant Hob Garrow, 54, turnkey, your old sergeant

- **Looks:** Broad and grey-bearded, a coat shiny at the elbows, two fingers missing from the left hand,
  a ladle through his belt beside the keys.
- **Voice:** Barrack-plain and loud. Calls the player Captain every time. Food, feet and weather; bad
  news hidden inside a joke. "Eat first. Bad news keeps. Porridge doesn't."
- **His own motive:** He owes 88 crowns at the Drowned Lantern dice house and would sooner lose the post
  than take your money. Last time, Sabine bought his marker on the second night, and from then on he did
  what the Prince's people asked: plant the vial, swear in court.
- **Secret:** he was awake when the hooded woman lifted his keys, and kept his eyes shut on purpose.
- **Gates:** owns up about the marker (trust 75 + you spoke); stands up in court for you (ALLIANCE:
  trust 80 + debt paid).

### Sabine Orrel, 32, the Prince's secretary

- **Looks:** Small and quick, brown hair under a grey cap, grey wool coat, ink-stained cuffs, a fat
  grey-bound ledger always under one arm.
- **Voice:** Dry, fast, in figures and prices. A river-market vowel she cannot iron out when angry.
  "Granaries cost money. Gallows cost rope. Guess which one the council funds."
- **Her own motive:** Her brother was hanged on the green for a sack of flour twelve years ago. She would
  do anything for the prince who promised no more bread hangings, and has never asked what anything covers.
- **Secrets:** She buys debts as "loyalty insurance" on Corvin's word (six this year). She signs for two
  ounces of nightbell a month, entered as blue dye. Ashcourt has no dye vats. She noticed, wrote it in
  the margin, and did nothing.
- **Gates:** shows you the margin (trust 50 + you named nightbell); will say it in court (ALLIANCE:
  trust 65 + she talked).

### Hangman Tull, 66, hangman of Vellmark for forty-one years

- **Looks:** Tall and stooped like a gallows post, white hair tied back, long leather coat, huge gentle
  rope-scarred hands, a coil of pale hemp worn over one shoulder.
- **Voice:** Low, slow and kind, the voice he uses on the scaffold. Lengths, weights, knots. Gallows humour
  so dry it takes a moment. "Everyone thinks it's the drop. It's the knot. Always the knot."
- **His own motive:** He has tied the turning knot three times and wants to know, once, that one of them
  was worth it. He would like to stop, and nobody has ever asked him to.
- **Secrets:** what the knot does; what each turning has cost him.
- **Gates:** explains the knot (trust 45 + met him); stands witness at the feast (ALLIANCE: trust 65 +
  you know the knot).

## Places

| Id | Place | What it is |
|---|---|---|
| `watergate_cells` | The Watergate Cells | Start. Wet straw, a slit window, Hob's desk and porridge pot, a drain grate to the river steps. |
| `gatehouse_yard` | The Watergate Yard | The company's drill square and barracks. Sixty soldiers who were not made to fire. |
| `river_market` | The River Market | The quay of yesterday's riot. Bread stalls, boats, Isra's boatman at the steps. |
| `drowned_lantern` | The Drowned Lantern | Dice house under the quay. Debt slates on the back wall, Hob's the biggest. |
| `south_road` | The South Road | Downriver and out. Going here is walking away (`left_the_map`). |
| `tollmarket_green` | Tollmarket Green | The square, the toll house and the gallows. The hub. |
| `hangmans_house` | The Hangman's House | Rope from the rafters, a kettle, one empty chair. The turning knot on a nail. |
| `hall_of_pleas` | The Hall of Pleas | The court where you were tried. Isra's chambers up the back stair. |
| `vane_house` | The Vane House | Isra's townhouse; four pages of warrant written from memory on her desk. |
| `the_crownhold` | The Crownhold | The palace: great hall, the King's sickroom, the cellar with the green-waxed casks. |
| `ashcourt` | Ashcourt | The Prince's house: petitions, Sabine's counting room, the glasshouse. |
| `ashcourt_stillroom` | The Stillroom | Behind the glasshouse. Opens on `found_the_stillroom`. Blue flowers, a still, vials. |

## Factions

- **The Crown's Law** (first in the array, so public violence costs Crown standing first).
- **The Prince's House.**
- **The Watergate Company** (starts at 40; your company).
- **The River Market** (allied to the company; yesterday they were the crowd).

## Threads (quests)

1. **Walk, or Stay** (MAIN, starts active). The cell door: walk out with Isra before nine, stay like last
   time, make her talk, tell her your side, or wake Hob. Then nine o'clock: say yes as before, say yes
   and mean none of it, turn him down to his face, be gone, or go for his throat. Taking the commission
   grants Speak in His Name.
2. **Item Three: Your Sergeant** (MAIN). Buy Hob's slate, tell him what he said in court, or let the grey
   coat buy him on the second night and watch who sent her.
3. **Who Built the Gallows** (MAIN). Find the thread (the ledger, the cask, or Sabine), then hold proof a
   court must hear (a vial, a sealed flask, or Sabine sworn).
4. **The Feast of Oaths** (MAIN). In the Great Hall on day 6: accuse him with proof, stop the cup, kneel
   again, join him, kill him, or stay away with your ring.
5. **The Woman Who Signed It** (SIDE). Hear her out (ask straight, read her pages, or see her wrist), then
   decide what she is now: forgiven, a partner, or refused.
6. **There Is No Third Morning** (LEAD, opens on meeting Tull). Learn the knot (grants See the Rope Line),
   then decide what the Hangman is owed.

## World events

| When | Where | What |
|---|---|---|
| Day 0, 06:50 | Cells | (if you walked) Hob wakes to an empty cell and takes the blame. |
| Day 0, 09:00 | Cells | The Prince comes down, word for word as last time. |
| Day 0, 12:00 | Green | (if you walked, unless sworn) You are cried as a deserter. |
| Day 0, 23:30 | Green | Isra and the Hangman stand at the foot of the empty gallows. |
| Day 1, 22:00 | Dice house | The grey coat buys Hob's marker, unless it has been paid. |
| Day 2, 09:00 | Hall of Pleas | (if you struck the Prince without proof) The assize condemns you. |
| Day 2, 10:30 | Crownhold | The King's cup rattles against his teeth; "age", says the physician. |
| Day 3, 15:00 | Ashcourt | (if you have been there) A crate marked DYE, BLUE goes through the glasshouse. |
| Day 6, 08:00 | Crownhold | The seventh-day cask arrives in green wax. |
| Day 6, 19:00 | Crownhold | The Feast of Oaths. |
| Day 7, 09:00 | Hall of Pleas | (if you struck the Prince without proof) The last assize. |

## Five promises

1. **FINALE: whether you hang again.** Seed: a rope mark on a neck never hanged in this life.
2. **RELATIONSHIP: why she signed it.** Seed: one black glove she will not take off. Payoff: she believed
   the evidence, and a red line round her signing wrist has paid for it since four this morning.
3. **MYSTERY: who built the gallows.** Seed: a green-waxed cask every seventh day. Payoff: a stillroom
   behind a glasshouse, and a prince with soil on his cuffs.
4. **RIVAL: what your sergeant will say.** Seed: 88 crowns on a slate.
5. **THEME: there is no third morning.** Seed: the Hangman looks at your neck before your face.

## Endings

Exactly twelve, because the storyteller reads the first twelve. Five are losses of one kind or another,
and walking away is reachable from turn 16.

| Ending | Rarity | Reached when |
|---|---|---|
| The Same Gallows | COMMON | Condemned for striking the Prince without proof. |
| The South Road | UNCOMMON | Left the city and did not come back. |
| His Captain, Again | COMMON | Knelt and gave the ring, with nothing in hand. |
| Someone Else's Rope | COMMON | Refused him and proved nothing; another captain will hang. |
| The King's Cup | UNCOMMON | Stopped the cup without naming who filled it. |
| The Other Trial | RARE | Accused him with proof; Isra trusts you (60). |
| The Prince at His Own Feast | RARE | Killed Corvin in the Great Hall. |
| The Prince's Hand | RARE | Joined him. |
| The Banns, Read Twice | RARE | Forgave Isra, stayed, survived the feast; affection 80. |
| Her Signature | UNCOMMON | Heard her out and refused her. |
| No Third Morning | UNIQUE | Sat with Tull until he put the rope down. |
| The Morning, Kept | UNIQUE | Corvin accused, Isra forgiven, Hob never bought. |

## Archetypes (what kind of knight-captain you were)

Each starts with **Remember It** plus one ordinary ability, so the storyteller always sees the memory.

| Id | Name | Gives |
|---|---|---|
| `arch_blade` | The Best Sword | Might, Swordwork; Draw Steel; your sword; Company +10 |
| `arch_court` | The Courtier | Presence, Courtcraft; Lie Like a Courtier; Isra's letters; Crown +10 |
| `arch_watch` | The Watch Captain | Mind and Agility, Legwork; Turn It Over; a list of favours; River +15 |
| `arch_soldier` | The Soldiers' Captain | Presence and Resolve, Command; Call Out the Company; the company badge; Company +20 |

Advanced setup asks what the rope left you wanting (revenge, to run, to be proven innocent, to save the
King, or to hear her explain) as a starting temperament only.

## State (three invisible resources)

- **Stamina** (GOOD_HIGH, the only one rest restores).
- **Suspicion** (GOOD_LOW, first in the array, so public violence lands here). How far the Prince's house
  has moved from fondness to management. At the top, the gallows does not wait three years.
- **Old Course** (GOOD_LOW, starts at 70, drains slowly). How closely this life still runs to the last.
  Playing your old part raises it. High means perfect foresight on a road that ends on a scaffold.

Gated abilities: **Speak in His Name** (granted by taking the commission, locked behind
`sworn_to_corvin`) and **See the Rope Line** (granted by the Hangman, locked behind `knows:the_knot`).

## Cover direction

Isra large in frame, waist up, close and centred: black hair at the jaw, grey eyes, hood pushed back over
an advocate's black coat and high white collar, **one long black glove on her right hand**, holding up a
ring of old iron keys toward the viewer. Fierce and frightened at once. Behind her, soft: an open cell
door, wet straw, a slit window with cold dawn, and far off through it a small empty gallows silhouetted
against a red-gold sunrise. Cold blue from the window on one side of her face, ember from a brazier on
the other. The title THE MORNING OF THE GALLOWS painted in as a pale-gold engraved serif, no other text.
Described by costume and pose, never by age words. No art has been generated yet; `openingPanel` names
`story_the_morning_of_the_gallows/opening` for when it is.
