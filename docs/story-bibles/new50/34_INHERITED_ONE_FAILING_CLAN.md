# INHERITED: ONE FAILING CLAN

**Slate:** #34 of 50 (`docs/stories-50/PLAN.md`).
**Trope:** crime-family inheritance. **Lean:** male.
**OOC evidence:** "I Became the Oyabun of a Failing Yakuza" (New #5). Nothing from it is used here: no
title, names, terms or plot. The shared ground is the trope only.
**Hook:** At twenty-five you inherit your grandfather's crime family: three lieutenants, a debt due at
midnight, and his oldest rival at the funeral.
**Fixture:** `packages/test-fixtures/src/inherited-one-failing-clan.ts` (`INHERITED_ONE_FAILING_CLAN`,
`story_inherited_one_failing_clan`, `sv_inherited_one_failing_clan_1`). **Spec:**
`inherited-one-failing-clan.spec.ts`.
**Protagonist:** BLANK. The player names themselves; the archetype is the job they had until this morning.
**Asset prefix:** `story_inherited_one_failing_clan/`. No art generated yet; `openingPanel.assetKey` points
at `story_inherited_one_failing_clan/opening` for when it is. Its alt starts with "Tatsuo", because
`opening-panel-art.ts` picks the reference portrait by the first word of a character's name: an alt starting
"Kagami" matched nobody and would have drawn the panel from Ryo's portrait.

## Adults only

Every person in this story is an adult. The ages are canon and are also the first fact in `hardCanon`,
so the storyteller has them on every turn.

| Who | Age |
|---|---|
| The player, the old man's only grandchild | 25 |
| Ryo Okumura, first lieutenant | 34 |
| Saeko Imai, the family's accountant | 29 |
| Hachiro "Hachi" Ueda, third lieutenant, driver and cook | 61 |
| Tatsuo Kagami, boss of the Kagami Group | 63 |
| Mariko Kagami, his daughter and heir | 26 |
| Detective Asako Nori, harbour precinct | 44 |
| Goro, member, driver | 52 |
| Taka, member, driver | 40 |
| Ken Endo and Jun Endo, twins, members, market errands | 24 |
| Kiku, member, the Lantern's door | 33 |
| Bun, member, the youngest, joined last month | 21 |
| Genzo Hayami, the grandfather (dead before the story starts) | 81 |
| Mother Fuku, owner of the Lantern (background only) | 82 |
| Ume Shiomi, head of the Shiomi family (ice house, fuel dock) | 71 |
| Daisuke Tanabe, head of the Tanabe family (boatyard) | 58 |
| Shin Ishizaki, head of the Ishizaki family (harbour ferry) | 47 |

Bun was nineteen in the first draft and is twenty-one now: the setting is Japan-coded, where the
drinking age is twenty, and every member drinks sake at the seventh-day cup. Hard canon says nobody in
the family is ever called a kid, a boy or a girl.

Kagami calls the player "young boss". That is a 63-year-old rival needling a 25-year-old adult and is
the only use of the word. Appearances begin "An adult man/woman" or "An older man/woman" and carry no age
words; the spec enforces this on appearance, visual hook, silhouette, cover direction and panel alt.

Content: 13+. Violence is short and shown by cost (split lip, broken hand, hospital corridor, police
report). No gore, no torture, nobody dies on the page, guns almost unheard of. Romance goes no further
than a kiss. Alcohol is referenced (the Lantern serves sake, the seventh-day cup), never shown to excess.
No self-harm, including finger-cutting apologies; no tattoo reveals; no drug, gambling or hostess-bar
rackets. The tone guide says so in words the storyteller reads every turn (if the player tries any of it,
somebody stops their hand), because the English production prompt carries no 13+ policy of its own.

The tone guide is also the cover's mood text (`generatedCoverPrompt` appends it as `Mood:`), so it states
the policy in words that paint nothing: no gore, no torture, nobody dies on the page, nobody harms
themselves to atone, the business never becomes a racket. The concrete words (split lip, broken hand,
hospital corridor, guns, the finger, the tattoos, drugs, gambling, hostess bars) live in two hard-canon
facts, which the storyteller also reads every turn and the image model never sees. The spec pins both.

## The pitch

You had an ordinary job and a grandfather you had met twice. This morning a lawyer put a black stone seal
in your hand and told you that for fifty years your grandfather ran the old harbour ward of the city, and
that his will makes you the boss of what is left: nine people, a noodle shop, a lease on the last working
pier, and no money.

At the funeral his rival of forty years walks up the aisle in a white suit, bows to the coffin, bows to
you, and holds up a note stamped with your new seal. Ten million yen, due at midnight. Or the docks are
his.

The comedy is an ordinary adult applying office sense to a family that runs on bows, paper and grudges.
The drama is that the family is nine real people, each of whom wants something this week that has
nothing to do with the player, and each of whom will decide on the seventh day whether to drink to them.

## Playable span

From 18:40 on the evening of the funeral (day 0) to the seventh-day cup (day 7, 18:00), across one old
harbour ward and the glass tower over the bridge. Two spines:

1. **Midnight, day 0.** The debt is called at the Lantern in front of the harbour families. If nothing has
   been done, Kagami's men lock Pier 9 at 1 a.m. Doing nothing is a route, not a punishment.
2. **The cup, day 7.** Nine members drink to the new boss or hand back their silver heron pins.

What the family becomes after that lives in the endings.

## The world, in plain words

- **Saiharu**, a port city. The **old harbour ward** is a night market, a fishermen's pier, a temple on a
  hill. Across a bridge on reclaimed land is the **new side**, where the Kagami Group's glass tower is.
- **The Hayami family.** Founded by Genzo Hayami from dockhands fifty years ago. Kept the market's peace,
  settled fights before the police came, lent money when the boats came back empty, held the Pier 9 lease
  for the fishermen's co-op. Once two hundred members. Now nine, and broke.
- **The five old families** meet at the Lantern as the Lantern Table: the Hayami, the Kagami, and three
  small ones, the Shiomi (ice house and fuel dock, Ume Shiomi, who knits through meetings), the Tanabe
  (boatyard, Daisuke Tanabe, who repeats the last speaker) and the Ishizaki (harbour ferry, Shin Ishizaki,
  who owes Kagami money and hates it). They give the midnight calling its faces.
- **The harbour code** binds all five old families: no blood on the waterfront; a sealed debt is honoured
  and called at the Lantern at midnight; a boss is whoever holds the seal and is given the cup on the
  seventh day; no family calls the police on another. Whoever breaks it first loses the other families.
- **The Heron Seal.** Palm-sized, black stone, a heron on its face. Whatever it is stamped on, the family
  stands behind. It is in the player's pocket from turn one and cannot be dropped. It cannot be given
  up before the cup either: handed to Ryo or thrown in the bay, it still speaks for the heir until the
  seventh evening, and Ryo will not take it before then.
- **The debt.** Eleven months ago Genzo borrowed ten million yen from Kagami against the Pier 9 lease. Due
  at midnight on the night of his funeral, which is tonight. Tearing or snatching the note in public does
  not cancel it. The families saw the Heron Seal on it, the debt is still called at midnight on their
  word, and whoever destroyed it has broken the code first, in front of witnesses. Only a note that
  disappears out of sight, with nobody able to say who took it, leaves Kagami nothing to lay on the
  Lantern counter.
- **The note, read properly,** has one line nobody mentions, in Kagami's own hand: if it is not paid, the
  lender takes the Pier 9 lease and gives up any later claim in money. He wrote it to get the pier, not
  the ten million. This is the payoff for the first opening card. The date is no loophole: the note was
  witnessed at the Lantern, and the funeral is tonight whatever anybody does.
- **The funeral hall.** The coffin is there on the night of the funeral; after the crematorium, the urn
  and the photograph stay on the altar for the seven days of the vigil.
- **The Lantern.** A tiny bar on the market corner, neutral ground for sixty years. Owner Mother Fuku. A go
  board in the back with Genzo and Kagami's last game on it, black to play. Black was Genzo.

## The system (where it lives so production can read it)

Production runs `runTurnPure`, which reads premise, tone guide, hard canon, cast, opening, style examples,
place names and descriptions, quest items, factions, quest titles and summaries, world events, and the
first twelve endings. It does not read resources, step notes, promises, skills, or abilities other than
the chosen archetype's starting ones. So:

- Every lever against the debt is in **hard canon** (fifteen facts) and is a **quest item**: the seal, the
  note, the blue passbook, the co-op transfer, the favour book, the letter, the resort contract.
- The three invisible resources are one **hard-canon** fact in plain words (police attention, the feud,
  the player's nerve: what raises each and what calms it), because production never reads `resources`.
  The Heron Seal is the starting item; every archetype starts with two abilities.
- **Place descriptions** say what is next to what, because production never sees `connections`.
- Every archetype starts with **Speak as the Boss** plus one job ability.
- Exactly **twelve endings**.
- No archetype name appears in premise, hard canon or a character name.

For the legacy engine path the routes are wired properly (see Threads), and the spec checks everything
the catalogue specs would check if the story were registered.

## Premise (as shipped)

> You are twenty-five. Until this morning you had an ordinary job and a grandfather you had met exactly
> twice.
>
> Then his lawyer put a black stone seal in your hand. Your grandfather was Genzo Hayami, and for fifty
> years his family ran the old harbour ward of the city: the night market, the fishermen's pier, the
> peace on the waterfront. His will names you the new boss.
>
> The family is nine people now, and it is broke. Ryo, the first lieutenant, expected the seal himself.
> Saeko, the accountant, knows exactly how broke. Hachi, the old man's driver, cooks for everybody and
> cried through the will.
>
> At the funeral, Kagami, the rival boss from across the bay, walks up the aisle with a note stamped with
> that seal. Your grandfather borrowed ten million from him. It is due at midnight tonight. If it is not
> paid, Pier 9 is his, so the fishermen lose their landing and the family loses the last thing it owns.
>
> You have five hours to find ten million, or a reason you do not owe it. Then you have seven days before
> every member drinks from the old man's cup or walks away.
>
> Everyone on the waterfront is watching to see what kind of boss you are. Some of them want you to fail.

218 words. Passes `checkStoryClarity` with zero issues. It spends none of the secrets (passbook, resort,
transfer, letter).

## Opener (turn 1, verbatim)

> Incense. Eighty mourners in black. A photo of the grandfather you met twice.
>
> This morning his lawyer put the family seal in your hand. That makes you the boss.
>
> A silver-haired man in a white suit bows to the coffin, then to you.
>
> "Kagami," he says. "I fought your grandfather for forty years."
>
> He holds up a note stamped with that same seal.
>
> "Ten million by midnight, young boss. Or the docks are mine."
>
> The hall goes silent. Behind you, a scarred man in a black tie mutters, "Boss. Answer him."
>
> Kagami smiles. "Well? What does the new head of the family say?"

103 words. Kagami speaks to the player by word 48 ("I fought your grandfather"). Ends on a direct question
that needs an answer in front of eighty people. The only proper noun is Kagami, who names himself. The
scarred man is Ryo, unnamed on purpose: the player meets him on turn two.

**Suggestions** (said / done / risky):

1. "Let me read that note first. I don't pay for paper I haven't read."
2. I bow to the coffin, then to Kagami, exactly as low as he bowed to me.
3. I take the note from his hand and tear it in half in front of everyone.

The spec runs all three through the real `RuleBasedIntentParser`; none parses as an attack.

At 18:40 the hall holds Kagami, Mariko (beside him, not bowing), Ryo, Saeko and Hachi. Nori is already
outside by the temple gate (her schedule), and the 19:05 event puts her in the publicCopy.

## Cast

### Ryo Okumura, 34, first lieutenant

Ran the family's streets for sixteen years and expected the seal. **Wants:** the family through midnight
with the pier and nobody in hospital; to decide what to tell Kagami before Kagami decides for him.
**Fears:** the family dying on his watch; being the reason the six end up working for Kagami anyway.
**Secrets:** Kagami offered him the Pier 9 night shift and jobs for the other six for the seal, two nights
ago, and he has not answered. Last spring the old man told him he would not be heir: "you would die for
this family, and I need somebody who would close it."
**Voice:** clipped, formal. "Boss" as a sentence on its own, with a pause in front that shortens as he
decides about you. Calls the dead man "the old man". *"Boss. ...Boss. Practising. Give me a week."*
Will not take the seal before the seventh day. None of his voice samples states the offer; the storyteller
gets *"Kagami talks. I listen. Listening is not answering."* instead, so the 22:15 thread keeps its secret.

### Saeko Imai, 29, the family's accountant

Former bank auditor, fired for being right. **Wants:** the new boss to understand the books before
midnight; to keep the 6.2 million for the people it was meant for. **Fears:** keeping a dying business alive
past kindness; being the one who spends the passbook. **Secrets:** the blue passbook, FOR WHEN THEY LEAVE;
the pencil note under the ten million, "Sorry. Ask Saeko about the blue one."
**Voice:** figures first, adjectives never; fast, exact and openly exasperated about money, and the
angrier she gets, the funnier and more precise; reads people like a balance sheet; says "Net" for "in the
end". *"Assets: one pier lease, one sedan with a rattle, a noodle shop that loses forty thousand a month.
Liabilities: everyone at this funeral."* A slow romance is possible (gate `saeko_stays_late`, trust 60,
affection 55), no further than a kiss and never the price of the passbook. Mariko is the main romance.

### Tatsuo Kagami, 63, boss of the Kagami Group

The old man's rival for forty years, at the funeral in white. **Wants:** Pier 9 by 1 a.m. by the code, with
paper; the whole waterfront delivered to the developer by month end. **Fears:** dying with the family half
sold and nobody told; his daughter learning what the deal costs. **Secrets:** the 400-million resort
contract, two councillors paid; whoever plays the old man's move on the board may ask him for anything.
**Voice:** slow, formal, unbreakable courtesy; the dead in the present tense; debts, games, manners.
*"Manners are cheaper than blood and they last longer."* He alone calls the Hayami family "your
grandfather's clan", the one place the title's word lives in the story. Not a villain. He is grieving the only man who
ever beat him.

### Mariko Kagami, 26, his daughter and heir

Runs his security firm, carries a bamboo practice sword in a bag everywhere. **Wants:** to stop the deal
without destroying her father; to find out whether the new boss is worth standing next to. **Fears:**
becoming her father with better manners. **Secrets:** photographs of every page of the contract on her
phone; she learned to ride a bike on Pier 9 with the old man holding the seat.
**Voice:** short, teasing and physical (she steps in, tests you, steps back); fencer's words (stance, distance, opening); never "father", always "the
chairman". *"Relax. If the chairman wanted you hurt, he would have sent somebody polite."* Optional slow
romance, never the price of her help.

### Hachiro "Hachi" Ueda, 61, third lieutenant

The old man's driver for twenty-six years, and the family's cook. Will not fight, under any circumstances.
**Wants:** the new boss fed before midnight; the noodle shop's shutter all the way up with a queue outside.
**Fears:** outliving the family; being asked to hurt somebody again. **Secrets:** drove the old man to the
registry office six weeks ago and knows the safe combination (the date the shop opened); put a man in
hospital thirty years ago and has not raised a hand since.
**Voice:** warm, rambling, food first. *"Have you eaten? No. Sit. Nobody decides about ten million on an
empty stomach."*

### Detective Asako Nori, 44, harbour precinct

The organised-crime desk is her and a filing cabinet. Traded facts with the old man for nineteen years,
never money. **Wants:** Kagami's contract, or a witness to it, before she is moved inland at the end of next
week. **Fears:** the waterfront paved over and knowing who was paid. **Secrets:** the old man told her about
the deal a month before he died; her transfer notice.
**Voice:** dry, tired, procedural; separates what she knows from what she can prove, out loud.
*"Here is what I know. Here is what I can prove. Two different lists, and the second one is short."*

**Lexical separation:** the spec keeps every pair of voice-sample vocabularies under 30% overlap and bars
two characters from sharing a rhetorical move. Only Nori's speech style leads with "dry"; Saeko is
exasperated and Mariko teasing, so the three women do not converge by turn ten. Card blurbs are written
in six different shapes on purpose, because they sit side by side in the cast carousel.

## Places

All eleven are discovered from the start and every one has an inbound edge.

| Place | Next to | Holds |
|---|---|---|
| The Funeral Hall (start) | Temple Yard (1 min) | coffin tonight, then urn and photograph; nine heron pins |
| The Temple Yard | Hall, Old Man's House (9), Night Market (14) | Kagami's cars, Nori at the gate |
| The Old Man's House | Temple Yard | the favour book on the study desk |
| The Night Market (hub) | Noodle Shop (2), Pier 9 (6), Lantern (4), Station (7), Tower (22) | the ward |
| Hachi's Noodle Shop | Market, Family Office (back stairs, 1) | the car keys |
| The Family Office | Noodle Shop | ledger, blue passbook, the green safe |
| Pier 9 | Market, Breakwater (5) | the co-op's gate |
| The Breakwater | Pier 9 | Mariko in the evenings |
| The Lantern | Market | the go board, the midnight calling |
| The Harbour Police Station | Market | Nori's desk |
| The Kagami Tower | Market (across the bridge, 22) | the note and the resort contract in the safe |

## Factions

Order matters to the engine. The Harbour Ward is first, so public violence costs the market people first.

| Faction | Start | Ranks |
|---|---|---|
| The Harbour Ward | 30 | 0 the old man's grandchild / 40 our boss / 70 one of the ward |
| The Hayami Family | 20 | 0 the heir nobody picked / 30 boss on paper / 50 boss / 80 the old man's successor |
| The Lantern Table | 20 | 0 a name / 35 a voice / 60 the table listens |
| The Kagami Group | -10 | -40 enemy / 0 a problem / 30 a rival worth respecting / 60 partner |
| The Harbour Police | 0 | -30 a file / 0 a name in a file / 30 a source / 60 a friend at the station |

## Threads (quests)

1. **Ten Million by Midnight** (MAIN). *Answer him* at the funeral: bow and accept, refuse out loud, read
   the note first, name terms, bluff, hit him (breaks the code), or walk out. Then *find the money*: the
   passbook with Saeko's blessing (listed first) or taken behind her back; call in the favours; seal the
   pier to the co-op (still owes the ten million); play Kagami for it at the board; steal the note (breaks
   the code); fight for the pier at 1 a.m. (breaks the code); or let midnight come (`pier_lost`).
2. **The Heir Nobody Picked** (MAIN). *Meet the family* (eat with them, open the books with Saeko, ask Ryo
   straight, or keep apart); grants Call In a Favour. *What Ryo agreed*: he tells you, you outbid Kagami, you
   follow him across the bridge, or he goes over if the pier is lost. *The cup* on day 7: hand Ryo the seal,
   close the family and pay everyone from the passbook (only if it is unspent), all nine drink (Hayami rep
   50), or some walk.
3. **Forty-One Favours** (SIDE): the notebook in the study, or Saeko's typed copy.
4. **The Green Safe** (SIDE): Hachi's number or the four digits and SHOP on the notebook's last page. Gives
   the co-op transfer and the letter. Open the letter after the cup, or early.
5. **The Rival's Daughter** (SIDE): the breakwater; she shows the photos (trust 55), or stands with the
   player as more than an ally, or stays her father's.
6. **Off the Record** (SIDE): hear Nori out or send her away; then give her the contract, trade with her,
   give her the family's own ledger (informing), or keep the code.
7. **What the Pier Is Worth** (LEAD, from the surveyors on day 1): find the buyer four ways; then tell the
   Lantern Table, sell Kagami the pier at the real price, or sit on it.
8. **What the Family Becomes** (MAIN, after midnight is answered): a family under the code, a business
   with its shutter up, closed kindly, a branch of the Kagami Group, or run on fear.

Gated ability: **Call In a Favour** starts locked, is granted by *Meet the Family*, and needs
`has_the_favour_book`. Every other ability is unlocked by default.

## World events

| When | Where | What |
|---|---|---|
| Day 0, 19:05 | Temple Yard | Nori by the gate with a can of coffee |
| Day 0, 19:30 | Lantern | Kagami goes to the board, as every night this week |
| Day 0, 20:30 | Noodle Shop | six stallholders ask whether they still pay dues on Friday (after the funeral) |
| Day 0, 22:15 | Tower | Ryo's phone goes to voicemail; he has gone to answer Kagami (cancelled if he came clean) |
| Day 1, 00:00 | Lantern | the calling (cancelled if paid, cancelled or the note stolen) |
| Day 1, 01:00 | Pier 9 | locks on the gate (cancelled by the co-op transfer, a fight, or payment) |
| Day 1, 07:00 | Pier 9 | surveyors with a resort developer's van; opens the LEAD |
| Day 2, 22:00 | Noodle Shop | a brick through the shutter, heron drawn upside down |
| Day 3, 09:00 | Station | Nori's transfer notice |
| Day 7, 18:00 | Funeral Hall | nine cups in front of the photograph |

## Five promises

| Kind | Seed | Payoff |
|---|---|---|
| FINALE: what the family becomes | nine heron pins on velvet by the coffin | nine cups on the seventh evening, and who drinks |
| MYSTERY: why you | a lunch last spring with a polite stranger who paid cash | the letter in the green safe |
| RIVAL: Kagami | a white suit in a hall full of black | black to play, and what he gives the one who plays it |
| RELATIONSHIP: Ryo | the pause before he says boss | the night-shift offer, and his answer |
| BOSS: the price | surveyors on Pier 9 the morning after | four hundred million and two paid councillors |

## Endings (exactly twelve)

| Ending | Rarity | Min turn | Needs |
|---|---|---|---|
| The Heron Stands | COMMON | 30 | all nine drank; pier not lost; not dissolved |
| Kagami's Pier | COMMON | 18 | `pier_lost` (unpaid at midnight, or sold) |
| Nine Envelopes | UNCOMMON | 30 | family closed, everyone paid from the passbook |
| Ryo's Family | UNCOMMON | 28 | the seal handed to Ryo at the cup |
| The Informant | UNCOMMON | 22 | gave Nori the family's own ledger |
| Worse Than the Old Man | UNCOMMON | 24 | broke the code and ran it on fear |
| Back to Work on Monday | UNCOMMON | 16 | `left_the_map` |
| The Fishermen's Pier | RARE | 32 | pier sealed to the co-op and the family went legitimate |
| The Mirror Cracks | RARE | 34 | resort contract given to Nori |
| Two Heirs on the Breakwater | RARE | 34 | Mariko turned and close, affection 60 (no further than a kiss) |
| Black to Play | UNIQUE | 26 | won the old man's last game; Kagami respect 50 |
| What the Letter Said | UNIQUE | 36 | read the letter after deciding what the family is |

The letter's text is in that ending's condition, so the storyteller can quote it when it is reached and
not before: he picked the player because they did not need it; Ryo would have died for it, Saeko balanced it
until it bled, Hachi fed it until it was fat; the player was the only one who could decide whether it should
exist at all. "I was watching at lunch. You tipped the waitress."

## Archetypes (what you did until this morning)

| Archetype | Role | Starts with | Bonus |
|---|---|---|---|
| You Kept the Books | Numbers, paper and patience | Speak as the Boss, Read the Paper | mind +3, resolve +1 |
| You Worked the Door | Fists, nerve and a cold stare | Speak as the Boss, Throw Hands | might +3, resolve +1; Hayami +5 |
| You Sold Things | Talk, deals and charm | Speak as the Boss, Make an Offer | presence +3, agility +1; Lantern Table +5 |
| You Delivered Food | Streets, speed and staying unseen | Speak as the Boss, Slip Out | agility +3, mind +1; Ward +5 |

## State (three invisible resources)

- **Nerve** (GOOD_HIGH, 70/100, +2/h). The only one rest refills. Bluffs fall apart below 25.
- **Heat** (GOOD_LOW, 15, -0.5/h). Police attention. First GOOD_LOW, so public violence raises it.
  Lean On Them +6, Throw Hands +14.
- **Feud** (GOOD_LOW, 30, -0.25/h). How close the bay is to war. Lean On Them +6, Throw Hands +10.

Each has three or four bands of behaviour the writer can act on, none naming the variable.

## Cover direction

Saeko in the foreground, waist up, suit buttoned to the collar, a ledger tucked under one arm at her side
(never framed on her chest), the Heron Seal raised toward the viewer, one eyebrow up. Ryo smaller behind
her left shoulder, perfectly still. Kagami at the right edge in white with his cane, bowing slightly.
People are described by costume and pose only. Behind: a rain-wet night harbour, rusted cranes, market
bulbs, red lanterns, the glass tower across the bay. Warm lantern orange against cold tower blue. Faces
stay clean: rain beads on the seal, the harbour and the lettering, never on a face, and Ryo's scar is the
only mark on anyone.

The direction carries its own `TITLE:` line, so the generic "lower third, no lettering" cover rules drop
out: the title is painted into the upper third on two lines, colon included, INHERITED: large in brushed
white ink-stroke capitals with rain beading on the strokes, ONE FAILING CLAN smaller beneath in chipped red
lacquer capitals, legible at thumbnail. The read-back target is exactly `INHERITED: ONE FAILING CLAN` (the
pipeline upper-cases the title "Inherited: One Failing Clan"). No other text. No digits and no age words in
the direction itself.

## Notes for whoever registers it

- Not in `index.ts` and not in `LAUNCH_CATALOG`. Export raw until the art exists, then wrap with
  `withDerivedAssetKeys` like the others.
- `publishedAt: null`.
- A fixture change needs `npm run migrate` and a new session to take effect.
- Smoke: `infra/scripts/smoke.ts` filters `LAUNCH_CATALOG` by `storyId.includes(only)`, so run it as
  `npm run smoke -- --only=inherited_one_failing_clan` (underscores) after registering. With hyphens, or
  before registration, it matches nothing and exits 0 without testing anything.
- Keep this story out of `ALL_IN_ROMANCE_STORIES`: that storyteller-test arm says its rules win where they
  disagree, which would override the kiss cap here.
- Legacy engine only (production unaffected): `used:` flags never clear, so on
  `PLOTBREAK_NARRATIVE=engine` the letter's `opened_it_early` route fires as soon as the safe opens for
  anyone who ever used Read the Paper, and `kept_the_code` fires on any earlier Speak as the Boss.
- Title search (PLAN §7.3): a web search for the exact title with anime, webtoon and manhwa found no
  collision at editor review; no character name collides. The title does share "Failing" with the OOC
  trope title; the slate fixed the title, so it stays. Ryo and Saeko as a pair faintly echo an older crime
  anime's leads; both are common names and the characters share nothing else.
