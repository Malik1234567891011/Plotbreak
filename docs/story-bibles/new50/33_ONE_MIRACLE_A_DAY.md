# ONE MIRACLE A DAY

**Slate:** #33 of 50 (`docs/stories-50/PLAN.md`).
**Trope:** A patron god backing one mortal in a tournament, told from the god's seat. **Lean:** both.
**Hook:** You're a minor god with one follower, about to lose the city tournament. You get one miracle a day.
**Fixture:** `packages/test-fixtures/src/one-miracle-a-day.ts` (`ONE_MIRACLE_A_DAY`, `story_one_miracle_a_day`). **Spec:** `one-miracle-a-day.spec.ts`.
**Protagonist:** BLANK. The player names themselves (the name Tamsin prays to); the archetype is the one thing they are god of.
**Collision search:** no anime, manga, webtoon or novel titled "One Miracle a Day" turned up (nearest: *One Fine Day*, a different manhwa). No system term is borrowed from a known title. Every invented word here is plain English: gods are fed by prayer, sit in a Gallery, and get miracles. The spec scans the fixture for the vocabulary of the best-known system-patron webnovel and fails if any of it appears.

## Adults only

Every person in this story is an adult. The ages are canon and are also the first line of `hardCanon`, so the storyteller has them on every turn. Gods are described by how long they have existed and by the adult shape they wear.

| Who | Age |
|---|---|
| The player, a small god | about 200 years; walks down as an adult in their middle twenties |
| Tamsin Reed, your one follower and champion | 24 |
| Lady Fortune, the biggest god in the city | about 600 years; wears the shape of a woman of about 30 |
| Duke Halvard Stenn, the Iron Duke | 41 |
| Brother Ash, Arbiter of the Games | 63 |
| Wick, god of candle-ends, your neighbour in the back row | about 400 years; wears the shape of a woman of about 70 |
| Mother Sabine Orlo, High Priestess of the Golden House | 52 |
| Hettie (offstage), the night baker who keeps Wick’s candle | 76 |

Covers and portraits describe people by costume and pose, never by age words. Romance (Tamsin, and Fortune's flirting) goes no further than a kiss, and that rule is the second line of `hardCanon`, so the storyteller reads it on every turn.

## The pitch

You are a god. A very small one. Your whole shrine is a dented tin lamp in a wall in the poorest street of a harbour city with seven hundred shrines, and exactly one person still prays to you: Tamsin Reed, a dock porter who has lit that lamp every night for eleven years and never once asked you for anything.

This week she entered the city's great tournament under your mark without telling you, drew the five-time champion in the first round, and has just had the sword knocked out of her hands. She looks up at the sky, where the gods sit, straight at your seat in the back row. For the first time in eleven years, she asks.

You get one miracle a day. Today's is still unspent.

## Playable span

Three days and three nights in Merrowgate, from the moment of the opener (day 0, 14:30, first round of the Hearth Games) to the night of the Hearth Final (day 2, 19:00) and the Hearth turning after it (21:30). The bracket is the spine; the nights are free. Everything after the third night lives in the endings.

Daytime is the arena: the player sits in the Gallery, watches, talks to Tamsin in her head, and decides what to spend. Night-time is the city: for the three nights of the Games the gods may walk down in bodies, so the player can go anywhere, talk to anyone, steal, scuffle, flirt and get lost. That split is what lets a player who wanders off still be inside the story.

## The world, in plain words

- **Merrowgate** is a harbour city of seven hundred shrines. Gods are real and live on prayer. A god nobody prays to **goes out**, like a lamp.
- **The Bowl** is the great arena. Above its top tier, where mortals see only sky, is **the Gallery**: stone benches where the gods watch, ranked by how many people pray to them. The biggest sit at the **gold rail**. The player sits in the **back row, by a cracked pillar**, in the draught.
- **The Hearth Games**: three days at midsummer, sixteen champions, each under one god's **mark** (a small glowing sign on the back of the hand). Real steel; a bout ends on a yield, a fall that does not get up by the count of three, or the Arbiter's bell. A champion who is down or has lost her weapon gets the same count: her opponent counts aloud, and if by three she has not yielded, stood up or got a weapon back in hand, the Arbiter rings the bell and she has lost the bout. Nobody strikes after the bell. First-round losers drop into the **Low Ring**, where one of eight fights back in. The **Hearth Final** is at dusk on the third day.
- **The Hearth** is the fire in the **Temple of All Gods**. The winning champion's god takes it, and for a year every prayer said at any hearth in the city goes up to that god.
- **The Sixth Year**: a god who holds the Hearth six years running keeps it for good, and the Games end forever. **Lady Fortune has five.**
- **The Gallery Pact**: in the Bowl a god may work miracles only on its own champion and what that champion is holding. Anything else is a foul. Gods cannot hurt each other directly. A big god can **take a small god in** as an aspect, with its consent, and the small god stops being itself.
- **The Arbiter**, Brother Ash, is a monk of **the Unsworn**, an order that prays to no god. He is **sighted**: he sees the Gallery and the gold light of a miracle. If he sees a foul, that god's champion is out.
- **The Register of Shrines** is a wall of bronze plates in the Temple of All Gods. The player's plate came down decades ago: one follower does not count as a shrine.

## The system (the thing that makes this a patron-god story)

### The gold line

A small line of gold light only the player can see. It is a quest item the player starts holding (`gold_line`), because production's storyteller reads quest items and hard canon, never resources.

```
[Miracles left today: 1]
[Followers: 1, Tamsin Reed]
```

### Miracles

- **One per follower per day**, back at dawn. One follower, one miracle.
- A miracle is one clear physical thing that lasts a breath: a sword back in a hand, a gust, a wound closed, a lock giving way, a voice carried, a light in the dark. **It always works.** It cannot kill, raise the dead, or change what anyone believes or wants.
- **Your domain** (the archetype) gives small favours for free, without spending the miracle: a lost coin turning up, a draught under a door. Anything that would turn a bout, save a life or be seen as a wonder costs a miracle.
- **Burning**: a god with none left can work one more by burning itself. It works, and it costs part of what the god is. Three burns in a few days and a small god goes out.

### Growth: more believers, more miracles

Anyone who prays to a god by name at its shrine, meaning it, becomes a follower, and the god gets one more miracle from the next dawn. So the power curve is people: a second believer is two miracles a day; five is five. In the engine this is `q_one_miracle` (`second_follower` then `five_followers`), and five followers unlocks **Show Yourself** (appearing in full light to a crowd).

### Presence

By day a god is an unseen presence in the Gallery, at its own shrine, or beside a follower, and moves between them in a moment. Only its own followers and the sighted can hear it, only the sighted can see it, and gods can always see and hear one another. During the three nights of the Games, dusk to dawn, gods **walk down** in bodies. A god's body can be hurt; a bad wound sends it back to the Gallery until the next dusk.

### Fortune's luck

Lady Fortune's miracles do not show gold. They look like luck: a strap snaps, a foot slips on dry sand. **Her luck is moved, not made**: everything she gives the Duke is taken from someone else, mostly from the Lower Wards, which have had five very unlucky years. A barge rolls over in still water; a bakery shuts; a porch collapses. That is the story's theme, and the way the back row can beat the rail: make the luck show gold where the Arbiter can see it (`show_the_luck`).

## Premise (as shipped)

> You are a god. A very small one. Merrowgate, the harbour city you belong to, has seven hundred shrines, and yours is a dented tin lamp in a wall in Tanner's Row. Exactly one person still prays to you: Tamsin Reed, a dock porter who has lit that lamp every night for eleven years and never once asked you for anything.
>
> Gods here live on prayer. Every dawn you get one miracle for each person who truly prays to you, so you get one a day. A god nobody prays to goes out like a lamp, and nobody is sure what is left afterwards.
>
> This week the city holds the Hearth Games: three days of bouts in the great arena, every champion fighting under a god's mark. The winner's god takes the Hearth, and with it every prayer in the city, for a year. Lady Fortune has won it five years running through her champion, the Iron Duke. One more win and she keeps it forever, and the Games end.
>
> Tamsin entered under your mark and never prayed about it, so you never heard. Today she drew the Duke in the first round, and he has just knocked the sword out of her hands. You have one miracle left today. You have three days to keep her standing, and to keep yourself lit.

## Opener (turn 1, verbatim)

> The Iron Duke knocks the sword from Tamsin Reed’s hands, and the whole arena roars.
>
> She doesn’t chase it. She looks up, past the packed stands, to the gallery of gods no mortal can see.
>
> At you. Back row, by the cracked pillar.
>
> "I know you’re up there," she says, barely moving her lips. You hear her as if she stood at your elbow.
>
> She is the only person in this city who still prays to you.
>
> A small gold line burns in the air before you:
>
> [Miracles left today: 1]
>
> The Duke raises his axe and begins the count to yield. "One."
>
> Tamsin doesn’t look away from you. "Well? Are you going to help me or not?"

**Quality bar:** Tamsin speaks to the player at word 44. It ends on a direct question that needs an answer before the Duke reaches three. 118 words. The only names are Tamsin Reed (introduced by what she is doing and that she prays to you) and the Iron Duke (introduced by what he is doing). Nothing the player must already know.

**Opening suggestions** (said / done / risky):

1. Said: `"Yield. You'll get another bout tomorrow, and I'm not going anywhere."` (Keeps the miracle; drops her into the Low Ring.)
2. Done: `I spend my one miracle and put her sword back in her hand.`
3. Risky: `I spend it on the Duke's axe instead, rules or no rules.` (A foul under the Gallery Pact, in front of a sighted Arbiter.)

## Cast

Every one of them wants something that has nothing to do with the player. That is what keeps them from being an audience.

### Tamsin Reed, 24, your one follower and champion

- **Role:** Dock porter from Tanner's Row. Entered the Games under your mark with a borrowed sword and did not tell you.
- **Looks:** Tall, broad-shouldered, dark brown skin, short tight black curls under a sweat-dark headscarf, a split lip healing, a sleeveless padded jerkin over dockworker's trousers, a leather strap round her right knee, and your mark, a thumb-sized glow of gold, on the back of her left hand.
- **Her own motive:** The champion's purse would buy back the Kittiwake, the Reed family boat the harbour bailiffs seized. And she wants you to have the Hearth, so you never go out.
- **Underneath:** She half entered the Games to find out whether you exist at all. She is more frightened of that answer than of the Duke.
- **Fear:** That she has been lighting a lamp for nobody, the way her grandmother did. Being the Reed the light goes out on.
- **Secret 1 (the knee):** Her right knee has locked under weight since a crate fell on it last winter. She has strapped it and told nobody. In a long bout it will give out.
- **Secret 2:** She has prayed every night for eleven years and never once felt an answer. Today is the first time she has asked. If nothing happens, she has privately decided to stop.
- **Boundaries:** Will not be told to throw a bout; she yields if she chooses to. Will not trade her prayer for luck, and will notice if you try to buy her faith with a miracle.
- **Voice:** Short, dry, dockside. Mild swearing ("hells"). Talks to a god like a neighbour who owes her money. Goes very quiet when she means something.

### Lady Fortune, about 600 years old, the biggest god in Merrowgate

- **Role:** Holder of the Hearth five years running through the Iron Duke. Sits at the gold rail. Has noticed you.
- **Looks:** Tall and languid, warm golden-brown skin, long hair the colour of new coins over one shoulder, honey-gold eyes, a draped high-collared gown of gold silk with long open sleeves, rings on every finger, and a gold coin that walks across her knuckles on its own.
- **Her own motive:** The sixth year, so she never again has to wonder whether the city still loves her.
- **Underneath:** Six hundred years ago she sat in your seat, back row by the cracked pillar, with one follower, a dice-player. She grew by taking in seventeen small gods. You are what she used to be, and she wants you either beside her or gone.
- **Immediate want:** Win the final; take Wick in on the last night; offer you the same deal (her coin: flip it and say yes).
- **Fear:** Going out. Being prayed to by people who would leave the moment the luck stopped, which is everyone.
- **Secret 1:** Her luck is moved, not made. She knows exactly what the Lower Wards have paid for five wins.
- **Secret 2:** The back row, the dice-player, the seventeen.
- **Boundaries:** Will not break the Pact openly; her cheat looks like weather and she will not be caught doing anything else. Will not take a god in without its consent.
- **Voice:** Warm, amused, unhurried. "Darling." Prices everything in odds. Never raises her voice, because luck never has to.

### Duke Halvard Stenn, 41, the Iron Duke

- **Role:** Five-time champion, under Fortune's mark. Tamsin's first-round opponent.
- **Looks:** Very tall and heavily built, close-cropped iron-grey hair and short grey beard, pale grey eyes that stay fixed straight ahead, a dented steel breastplate over a dark red quilted coat, a long-hafted double-bitted axe.
- **His own motive:** The Golden House holds the deed to Stenn House, his family home, against old debts, and will call it the day he loses. He fights for a goddess he does not believe in.
- **Underneath:** He wants one honest bout before his sight goes, to know whether any of the five wins were his.
- **Fear:** Going blind in front of thirty thousand people. Finding out he never actually won anything.
- **Secret 1:** A grey fog has been closing in from the edges of his sight for two years. Fortune's luck has covered it in every bout. His courtyard has white lines painted on the flagstones. He has told nobody, and nobody but Fortune has noticed.
- **Secret 2:** The deed, at interest, in Mother Sabine's strongroom.
- **Boundaries:** Will not kill in the ring, and will stop a bout himself if he thinks he might. Has never gone past the count of three. Will not pray to Fortune, and says so to her priests.
- **Voice:** Short declaratives. Surnames, titles, numbers. One very dry joke a day, delivered without changing his face.

### Brother Ash, 63, Arbiter of the Hearth Games

- **Role:** Monk of the Unsworn. Rings the bell, calls the fouls. The only mortal in the Bowl who can see the Gallery.
- **Looks:** Lean and slightly stooped, shaved head, short white beard, deep-set dark eyes, a plain undyed robe with the sleeves tied back, a bronze hand-bell at his belt, a broom over one shoulder.
- **His own motive:** He wants one god from the back row to get a fair fight before the sixth year ends the Games forever.
- **Underneath:** He wants to know whether going out is an ending. He is the only evidence he has.
- **Fear:** That the Games end on his watch. Remembering more than he already does.
- **Secret 1 (the mystery):** Forty years ago he was a small god of this city, the god of kept promises, with one follower, a ferryman. The ferryman drowned. Ash went out, and woke up a grown man in the ash of his own burned shrine behind the Temple of All Gods, with no name. That is why he is sighted.
- **Secret 2:** He signed Tamsin's entry himself, vouching that your shrine is lit, which breaks the rules he enforces. Sabine is looking for exactly that signature.
- **Boundaries:** Will not call a foul he did not see, and will not ignore one he did, whoever asks. Will not pray to any god, including you.
- **Voice:** Patient and dry. Numbers his rules ("Rule four"), then asks what the rule is for. Short words. Treats gods the way a gardener treats weather.

### Wick, about 400 years old, god of candle-ends

- **Role:** The last inch of every candle in the city: bakers up late, lamplighters nearly home. Your neighbour in the back row for longer than you can remember. Down to one follower, like you.
- **Looks:** Small and round, soft lined face, bright black eyes, white hair in a bun stuck through with three burnt-down candle stubs (one still lit), a long wax-spattered apron over a faded blue dress, fingertips that glow like embers.
- **Her own motive:** Not to go out. She has agreed to let Fortune take her in on the last night, because Fortune's pocket is warmer than a gutter.
- **Underneath:** She does not want to become a corner of somebody else either, and cannot see a third door.
- **Fear:** The dark after the last inch. Being remembered as Fortune's Candle rather than as herself.
- **Secret 1:** Fortune's offer came with a price: report what you spend your miracle on. She has done it twice.
- **Secret 2:** Her baker Benno died in the winter. Her last follower is Hettie at the night bakery, old and tired, who prays mostly out of habit.
- **Boundaries:** Will not lie to you twice. Will not take another god's follower to save herself, and will think less of you if you take hers.
- **Voice:** Run-on, warm, gossiping. "Love." Changes subject mid-sentence. Food, wax and the small hours in every other line.

### Mother Sabine Orlo, 52, High Priestess of the Golden House

- **Role:** Runs Fortune's temple like a counting house. Holds the Duke's deed and half the Lower Wards' debts. Has filed a challenge to strike Tamsin out of the Games.
- **Looks:** Upright and slender, light olive skin, silver-streaked dark hair in a severe braided crown, sharp hazel eyes behind small gold spectacles, a high-necked gold-and-cream robe, a small gold abacus at her belt, ink on her fingers.
- **Her own motive:** A year without the Hearth would bankrupt the temple. She does not trust luck to deliver a sixth year, so she is arranging certainty with paper, money and hired hands.
- **Underneath:** She has never seen a god and has quietly stopped believing in them. Nothing she does is on Fortune's orders.
- **Fear:** The temple's debts coming due. Finding out something was watching all along.
- **Secret 1:** The doubt.
- **Secret 2:** She has paid two dockhands to lever your lamp out of its niche on the first night, so that at the hearing your shrine is dark.
- **Boundaries:** Will not have anyone killed: injured, robbed, ruined, never killed. Will not lie in a sworn hearing; she misleads with the truth instead.
- **Voice:** Measured, polite, commercial. Percentages and terms. Clicks her abacus while others talk and answers with the total. "Let us be practical." Never says thank you without a figure attached.

## Places

| Id | Place | What it is |
|---|---|---|
| `the_bowl` | The Bowl | The arena, and above it the Gallery. Start. Everyone in the opener is here. |
| `champions_cells` | The Champions' Cells | Under the stands. Tamsin's door has a mark nobody else recognises. Her knee strap. |
| `arbiter_chapel` | The Unsworn Chapel | Ash's bare chapel in the arena wall. The bout ledger. |
| `festival_streets` | The Festival Streets | The hub: lanterns, god-colour ribbons, bookmakers. |
| `twelve_bells` | The Twelve Bells | Champions' tavern. Tamsin chalked at two hundred to one. Fortune drinks here at night. |
| `tanners_row` | Tanner's Row | Tamsin's lane in the Lower Wards. Five years of bad luck. |
| `the_lamp` | The Lamp in the Wall | Your shrine. The Reed lamp. |
| `the_harbour` | Merrowgate Harbour | The dawn tide, the seized Kittiwake, a barge rolled over in still water. |
| `night_bakery` | The Night Bakery | Hettie's oven and Wick's candle-end. |
| `golden_house` | The Golden House | Fortune's temple, Sabine's counting room, the strongroom with the Stenn deed. |
| `hearth_temple` | The Temple of All Gods | The Hearth, the Register of Shrines, the hearing. Tamsin's entry paper. |
| `stenn_house` | Stenn House | The Duke's half-shuttered townhouse, white lines on the courtyard stones. |
| `the_cinder_yard` | The Cinder Yard | Where dead shrines are dumped, behind the Hearth. Opens with `found_the_cinder_yard`. |

Every place has an inbound edge. A god can go from the Bowl to its own lamp and back in a moment (travel 0).

## Factions

- **The Gallery** (first in the array, so a god seen brawling loses standing among gods first). Back row / Middle tier / At the rail.
- **The Unsworn.** The monks who judge the Games.
- **The Golden House.** Fortune's temple, priests and money.
- **The Lower Wards.** Tanner's Row and the docks: where new believers come from.

## Threads (quests)

1. **The Count of Three** (MAIN, active). Answer her before the Duke reaches three; then go and see what she, Fortune, Ash or Wick makes of it. Grants Walk Down, Answer a Stranger, Show the Luck, Use Your Fists (each gated by its own flag).
2. **More Believers** (MAIN, active). A second believer, then five. Five unlocks Show Yourself.
3. **The Hearth Games** (MAIN, active). The second day (or the Low Ring), the Register hearing, the Hearth Final.
4. **The Last of the Reeds** (SIDE). Her knee, and what she believes once you have answered.
5. **The Iron Duke** (SIDE). His eyes, and the deed to Stenn House.
6. **The Back Row** (SIDE). Fortune's coin first (from the first night), then Wick's last night (from Fortune's feast).
7. **The Lamp in the Wall** (SIDE). Sabine's men come for your lamp on the first night.
8. **Where the Luck Comes From** (LEAD). Make Fortune's luck show gold where the Arbiter can see it.
9. **What Happens to a God Who Goes Out** (LEAD). The Cinder Yard, and a choice: stay a god, or let the lamp go and wake mortal.

## World events

| When | Where | What |
|---|---|---|
| Day 0, 18:00 | Temple of All Gods | Sabine files the Register challenge. |
| Day 0, 20:30 | Everywhere | First dusk: the gods may walk down. |
| Day 0, 21:30 | Your lamp | Fortune is waiting at your lamp with her coin. |
| Day 1, 02:15 | Your lamp | Two dockhands lever the lamp out (unless you guarded it). |
| Day 1, 05:20 | Tanner's Row | Tamsin's knee locks on the stairs (unless mended). |
| Day 1, 09:00 | Harbour | A second barge rolls over in still water (if you have been to the harbour). |
| Day 1, 11:00 | The Bowl | The Low Ring (if she yielded or lost). |
| Day 1, 13:00 | The Bowl | Wick tells you where the luck comes from (if she has confided). |
| Day 1, 15:00 | The Bowl | Second-day bout: Tamsin against a docker she has worked beside for six years. |
| Day 1, 15:20 | The Bowl | The knee folds (unless mended or strapped). |
| Day 1, 20:00 | Temple of All Gods | The Register hearing. |
| Day 2, 00:30 | The Bowl | Fortune's midnight feast; she announces she will take Wick in. |
| Day 2, 19:00 | The Bowl | The Hearth Final. |
| Day 2, 21:30 | Temple of All Gods | The Hearth turns to Fortune for a sixth year (unless you won, or her luck was exposed). |

## Five promises

1. **FINALE: whether a back-row god can take the Hearth.** Seed: the gold line reading one. Payoff: the Hearth Final at dusk on the third day, and the fire choosing.
2. **RELATIONSHIP: what Tamsin believes once you answer.** Seed: eleven years of prayer and never once asking. Payoff: the first night, when she sees your face at the lamp, and the knee she has hidden from everyone.
3. **MYSTERY: why the Arbiter can see the gods.** Seed: he looks straight up at the back row and tells you to sit up straight. Payoff: the Cinder Yard. He was one of you.
4. **RIVAL: Lady Fortune and the sixth year.** Seed: "Darling" from the rail, and a coin that never falls. Payoff: her offer, her old seat by your pillar, and the rule that ends the Games.
5. **THEME: where the luck comes from.** Seed: Tanner's Row's collapsed porch and shuttered bakery. Payoff: luck is moved, not made, and the Lower Wards have paid for five wins.

## Endings

Seven of thirteen are losses, and walking away is one of them (minTurn 14).

| Ending | Rarity | Reached when |
|---|---|---|
| A City That Prays to You | RARE | Tamsin wins the Hearth. |
| Won Clean | UNIQUE | She beats a Duke fighting fair, with no miracle spent. |
| The Sixth Year | COMMON | Fortune wins and keeps the Hearth forever. |
| Two Lamps in Tanner's Row | RARE | No Hearth, but Wick kept lit and Tamsin still believing. |
| Fortune's Newest Face | UNCOMMON | You flip her coin and say yes. |
| Mortal | UNIQUE | You let the lamp go on purpose and wake up a person. |
| Gone Out | COMMON | Tamsin stops praying. |
| No Plate, No Shrine | UNCOMMON | Sabine wins the hearing. |
| Carried Off the Sand | COMMON | Her knee gives out; out of the Games, still yours. |
| The Back Row Stands Up | RARE | Fortune's luck exposed; no sixth year. |
| She Would Not Finish Him | UNCOMMON | Tamsin will not beat a blind man. |
| Somewhere Else | UNCOMMON | You walk out of the city. |
| A Seat at the Rail | RARE | You sell Fortune your silence, for terms. |

The storyteller reads only the first twelve endings, so Won Clean, a flavour of A City That Prays to You, sits last in the fixture and every other ending stays in view.

## Archetypes (what you are the god of)

Each starts with **Work a Miracle** plus one domain ability, so the storyteller sees both.

| Id | Name | Gives |
|---|---|---|
| `arch_lost` | God of Lost Things | Mind, Arcana, Your Domain, Listening; Bring It Back; a key nobody missed |
| `arch_mercy` | God of Small Mercies | Presence, Resolve, Your Domain, Charm; Ease the Hurt; a clean bandage |
| `arch_weather` | God of Bad Weather | Arcana, Might, Your Domain, Miracles, Brawling; Turn the Sky; a tin weather-bell |
| `arch_doors` | God of Locked Doors | Agility, Mind, Your Domain, Quiet Hands; Open the Way; a stub of door-chalk |

Every domain answers the opener differently: Lost Things puts the sword back, Small Mercies closes the cut and steadies the knee, Bad Weather throws sand in the wind, Locked Doors makes the Duke's axe-strap give. Each of those is one miracle, on her or what she holds, except the last, which is a foul.

## State (three invisible resources)

- **Flame** (GOOD_HIGH, the only one rest restores). How much of you there is right now.
- **Notice** (GOOD_LOW, first in the array). How far the Gallery and the Arbiter have noticed you bending the Pact. Raised by Break the Pact, Show the Luck, Show Yourself.
- **Fading** (GOOD_LOW). How close you are to going out. Raised by Burn for It and Let the Lamp Go; drains slowly while someone prays.

## Cover direction

Tamsin Reed in the foreground, waist up, centred and close, empty-handed on arena sand, face tipped up toward the viewer (the viewer is the god). Her sword stuck in the sand behind her; the Iron Duke a huge dark silhouette behind, axe raised and still. A thin warm shaft of gold light falls on her face from above. High in soft focus, a tier of stone benches in the sky where Lady Fortune lounges in gold silk. The title "ONE MIRACLE A DAY" painted into the art. No letters or numbers anywhere else, and no glow or marks on her face.

## Notes for the integrator

- Not registered in `index.ts` (this session may not edit it). To ship: import `ONE_MIRACLE_A_DAY` raw, add it to `LAUNCH_CATALOG`, and wrap with `withDerivedAssetKeys` only once art exists.
- openingPanel is declared as story_one_miracle_a_day/opening (drawn by opening-panel-art.ts); no prologue.
- `publishedAt: null`; the drop sets the date.
