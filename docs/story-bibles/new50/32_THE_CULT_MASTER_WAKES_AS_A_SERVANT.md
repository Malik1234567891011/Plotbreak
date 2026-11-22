# THE CULT MASTER WAKES AS A SERVANT

**Slate:** #32 of 50 (`docs/stories-50/PLAN.md`).
**Trope:** Murim regression / possession. **Lean:** male.
**OOC evidence:** the plan row cites "Murim Heroes" (429K) and a regression-murim title (190K); "possessed servant" is the angle. Nothing here is borrowed from either: no title, character, sect, technique or place.
**Hook:** You were the most feared martial master alive. You died of poisoned wine, woke up in the beaten body of a servant at the sect that hunted you for thirty years, and your killer arrives in three days to sign a truce.
**Fixture:** `packages/test-fixtures/src/the-cult-master-wakes-as-a-servant.ts` (`THE_CULT_MASTER_WAKES_AS_A_SERVANT`, `story_the_cult_master_wakes_as_a_servant`, `sv_the_cult_master_wakes_as_a_servant_1`). **Spec:** `the-cult-master-wakes-as-a-servant.spec.ts`.
**Protagonist:** BLANK. The name the player types is the Gravekeeper's own, which almost nobody alive has heard. Everybody on the mountain calls the body Dol.
**Not yet registered** in `index.ts`. `publishedAt: null` (set at release), no prologue, no art yet. `openingPanel` and `coverDirection` are written, so the art scripts can run as soon as it is registered.

## Adults only

Every person in this story is an adult. The ages are canon and are written into `hardCanon` (first
entry), so the storyteller has them on every turn. `appearance` strings say "An adult woman / man"
and describe costume and pose, never an age number.

| Who | Age |
|---|---|
| Dol, the servant body the player wakes in | 20 |
| The Gravekeeper, the player, at death | 52 |
| Baek Seo-ah, the sect leader's daughter | 22 |
| Mok Gyeong-ho, Senior Disciple | 25 |
| Yu Seol-hwa, Acting Master of the Nine Graves | 34 |
| Baek Mu-jin, Sect Leader | 55 |
| Pyo Man-deok, "Old Cook Pyo" | 61 |
| Gong Tae-seok, First Elder | 66 |

Silver Pine takes nobody under eighteen: every disciple, junior disciples included, and every servant on the mountain is an adult. This sentence is also in `hardCanon[0]`.

Nothing reads as childlike. Dol's past is told through debts and chores, never through a childhood.
Gong says "young friend", never "child".

## The pitch

A legend in a body that cannot lift a full bucket. The master always sees the perfect move; the body
manages about a third of it. That gap is the game: every fight is a precision puzzle, every
conversation is a disguise, and the most satisfying turn on offer, putting the man with his boot on
your back into the straw with two fingers, also starts the clock on being found out.

Revenge is optional. So is the cult. A player can spend all four days carrying water and never once
say their own name, and that is a whole game with its own endings.

## Playable span

Four days on one mountain. Dawn on day 1 (05:50), with Mok's boot on your back. The cult delegation
arrives at the gate on the evening of day 3 (18:00). The truce is signed in the Hall of Pines at noon
on day 4. The war drums, if they come, sound the morning of day 5. Thirty years of war, the
Gravekeeper's reign and the banquet where the wine was poured are backstory carried in hard canon,
items, and what six people will and will not say.

## The world, in plain words

- **The Nine Graves Cult.** Nine hundred people in a closed valley. Feared, not cartoonish. The player
  ran it for decades as the Gravekeeper.
- **The Silver Pine Sect.** A righteous sword school on a mountain above Pinefoot village: four
  hundred disciples, twice as many servants. Its elders led the alliance against the cult for thirty
  years.
- **The truce.** Silver Pine's leader, Baek Mu-jin, wants it badly. The cult's new Acting Master,
  Seol-hwa, wants it more.
- **Two Sleeps.** An old cult poison in two halves, harmless apart: one in wine, one in pear-wood
  smoke. It killed the Gravekeeper and is about to be used again at the signing.

## The system (the Nine Grave Forms)

The pure storyteller does not read the ability list, the resources or the step notes, so the system
lives in three places it does read: hard canon (entries 4 to 6 name every reachable form and what it
does, the three roads to opening the channels, the two ways to rebuild energy, and what a form costs the
body and the disguise), the starting item (Dol's wooden tag, a quest item), and each archetype's
starting abilities (Steady the Breath for everyone, plus one signature).

| Form | Ability id | Needs | How the player gets it |
|---|---|---|---|
| 1. The Lowered Lid (nerve strike) | `lowered_lid` | precision only | default; Blade's signature |
| 2. The Mourner's Step (evasion) | `mourners_step` | precision only | default |
| 3. The Shroud (stealth) | `shroud` | precision only | default |
| 4. The Iron Wreath (bare-hand parry) | `iron_wreath` | `body_opened` | reward of `q_rebuild/open_the_channels` |
| 6. The Grave Bell (killing intent, area) | `grave_bell` | `breath_rebuilt` | reward of `q_rebuild/fill_the_well` |
| 5, 7 and 8 | none | out of reach in four days | canon only |
| 9 | none | the form used while dying | can never be used again |

Both gated forms are granted by the very step that sets their flag (grant broadly, gate by flag). The
Grave Bell costs 40 suspicion and has a one-day cooldown: using it in public ends the disguise.

Servant abilities sit beside the forms: Bow Your Head, Be Furniture (eavesdrop), Read the Stance,
Name the Poison, The Old Voice, Say Who You Are (no roll; it is a choice, not a check), Carry the
Water, Steady the Breath.

## Premise (as shipped)

> You were the most feared martial master alive, and they called you the Gravekeeper. Nine days ago you died at your own banquet, of poisoned wine poured by your own right hand.
>
> This morning you woke up in somebody else's body. It belongs to Dol, a servant in the outer yard of the Silver Pine Sect, a righteous sword school which spent thirty years at war with your cult, the Nine Graves. Last night a senior disciple beat Dol to death in the woodshed. Nobody here knows it worked.
>
> The body is thin, bruised and untrained, with almost no internal energy. Your memory of nine killing forms is perfectly intact, and the first of them needs no strength at all, only precision.
>
> In three days your cult rides up this mountain to sign a truce, led by the woman who poured your wine. The signing is at noon on the fourth day. Dol was killed because of something Dol saw, and the reason is hidden somewhere in a dead servant's things.
>
> If anybody here learns who you are, they will kill this body before lunch. If you say nothing, you may have to serve your killer tea.
>
> What you do with a second life is yours: revenge, the cult, the truth, or the quiet life of a servant who should be dead.

222 words, six paragraphs, none over 57 words. The premise names who poured the wine and hides who
made the poison. It also ties both names the cast will use from the first beats, the Gravekeeper and
the Nine Graves, to the player, and its first 40 characters still match the hook.

## Opener (turn 1, verbatim)

> You died. You remember it: the wine, the cold climbing your chest, nine hundred of your own people on their knees as the lamps went out.
>
> Then a boot comes down between your shoulder blades and grinds your face into wet straw.
>
> "Kneel, servant," says Senior Disciple Mok. "Properly, this time."
>
> This body is a servant’s: thin, split-lipped, breathing all wrong. Your hands still remember nine killing forms.
>
> At the edge of the yard, a woman in white has stopped with two water buckets.
>
> Mok leans his weight in. "Forehead on the ground. Tell the lady you fell down the stairs. Do it now, or we do last night again."

110 words. Mok's first line starts at word 43. It ends on a demand that needs an answer now. The only proper noun
is Mok, and the line introduces him. The woman in white is Seo-ah, unnamed until the player meets her. Paragraph 4 deliberately does not repeat the
premise's wording.

**Cards:**

1. Said: `"I fell down the stairs, my lady." I say it to her, not to him.`
2. Done: `I lower my forehead to the straw, slowly, and watch exactly where his weight sits.`
3. Risky: `I find his ankle with two fingers, just above the bone, and press.` (The first Grave Form. The spec runs the real parser to prove this does not read as `attack`.)

**Opening panel** (`story_the_cult_master_wakes_as_a_servant/opening`, drawn from Mok's portrait, so the
alt starts with his name): *Mok in spotless pale blue robes and a silver hairpin, seen from the wet straw
at your eye level, sneering down with one boot planted on your back, a misty pine yard at dawn behind him.*

## Cast

Cover order: Seo-ah, Mok, Seol-hwa.

### Baek Seo-ah, 22, the sect leader's daughter

The best sword of her generation. She swore at her mother's funeral to kill the Gravekeeper, who
killed her mother, Han So-yeon, in a duel So-yeon demanded ten years ago. She is the only disciple
on the mountain who was ever kind to Dol. She fails her mother's sword form at the eleventh movement
every night, because she turns on the front foot. The Gravekeeper saw it finished once and knows it
turns on the back foot. So-yeon's last words, said to the Gravekeeper alone, were: "Tell her it turns
on the back foot." That line is in her secret, so the storyteller has it.

- **Wants:** to stop the truce, or say to Seol-hwa's face what she thinks of it; to finish the form.
- **Fears:** the form dying unfinished; her mother having died for nothing.
- **Hidden:** relieved the Gravekeeper is dead, and ashamed of the relief.
- **Boundary:** will not let anybody be beaten in front of her, whatever their rank; a servant who chooses to bow, she lets bow, and hates watching it. (This is why the opener does not collapse into her stepping in on turn 1.)
- **Voice:** blunt, short, sword vocabulary for everything, flat dry humour. *"Again. Slower. Your feet lie less than your mouth does."*
- **Romance:** slow and tense, up to a kiss. Gate `seo_ah_closer` needs trust 60 and affection 65.

### Mok Gyeong-ho, 25, Senior Disciple

Second-best sword of his generation and the First Elder's errand runner. Twelve days ago he carried a
sealed box from the Medicine Pavilion to a cult steward, believing it was a bribe. Dol saw him and
asked for twenty silver to keep quiet. Mok beat Dol in the woodshed and ran when Dol stopped moving.
He does not know Dol died.

- **Wants:** Dol too frightened to talk; to win the open sparring in front of the First Elder.
- **Fears:** that the box is what killed the Gravekeeper; being sent home to his poor branch family.
- **Boundary:** will not throw a punch or draw a blade on anybody while the sect leader or Seo-ah is watching; making a servant bow properly does not count, to him, and he will push that as far as she lets him.
- **Voice:** counted threats, "servant" used as a name, oily honorifics for elders. *"That's one. You get three before I stop counting and start enjoying it."*
- **Arc:** the rival. Can break (fear 55), can testify (respect 40 plus `knows:gong_sent_it`), or can stay a bully.

### Yu Seol-hwa, 34, Acting Master of the Nine Graves

The Gravekeeper's right hand for fifteen years; she joined the cult at nineteen. She smelled pear
wood in the banquet lamps, knew what it meant, and poured the wine anyway, because the Gravekeeper
had announced a spring march that would have ended the valley. She did not make the poison and wants
to know who did. Since the funeral she has visited three of the Gravekeeper's caches and left a
letter in one.

- **Wants:** to sign the truce and bring all nine riders home.
- **Fears:** that the Gravekeeper was right; being forgiven.
- **Proof she accepts:** the words said on the rope bridge in her first winter ("you will be the one to end me, and it will be the right call"), a form only the Gravekeeper taught, or her own letter handed back.
- **Voice:** formal, no contractions, counts to nine before anything important. *"I smelled pear wood in the lamps. I poured anyway. I have told nobody that, and I will not say it twice."*

### Pyo Man-deok, 61, head cook of the outer kitchen ("Old Cook Pyo")

He fed Dol for years and is the first to notice Dol is gone. Thirty years ago he was a kitchen hand in
the Nine Graves' valley and deserted the night they made him carry a poisoned dish. He recognises the
cult's breathing (four in, hold for nine) and knows Two Sleeps by smell.

- **Wants:** to know what happened to Dol, and whether the thing wearing Dol's face will hurt anyone in his kitchen.
- **Fears:** the Nine Graves remembering his face; helping whatever killed Dol.
- **Voice:** gruff, food for every comparison, says the frightening thing with his back turned. *"Eat first. Lie after. Nobody lies well on an empty stomach."*

### Baek Mu-jin, 55, Sect Leader

Seo-ah's father. He let his wife go to the duel and has spent ten years trying to make her death the
last one. His war wound is worse than anyone knows: three breaths of fighting, no more.

- **Wants:** the truce signed; Seo-ah kept away from the delegation.
- **Rule:** wants a witness and a reason, never a rumour. He is the one person who can stop the signing.
- **Voice:** slow plain sentences, proverbs about pines and snow. *"A pine does not argue with the snow. It bends, and in spring it is still a pine."*

### Gong Tae-seok, 66, First Elder and master of the Medicine Pavilion

Gentle, courteous, treats servants for free, remembers every name. The cult sent his only son's sword
home twenty years ago. He bought the Two Sleeps recipe, sent both halves to the banquet through Mok,
and plans to burn the rest at the altar during the signing and blame the cult's own factions. At the
signing the wine half goes only into the guests' cups, from the jar of honour; the sect drinks from its
own jar, which is why only the delegation falls. His
dispensary book records every measure in his own hand. He hangs black lanterns on night 2, tied with
the Silver Pine knot instead of the cult's nine-turn cord.

- **Voice:** soft, clinical kindness, "young friend". *"Medicine and poison share one shelf. The only difference is which direction you read the label."*
- **Never** raises his voice or a hand; never harms Seo-ah, whom he taught to read.

## Places

All edges are two-way. `old_shrine` and `grey_ford` are undiscovered at start, and both have inbound edges.

| Id | Name | What happens there |
|---|---|---|
| `servants_yard` (start) | The Outer Yard | Well, woodshed, sixty servants; the opener |
| `servants_quarters` | The Long Room | Dol's mat, the loose board, the wax wrapper and savings book |
| `outer_kitchen` | The Outer Kitchen | Pyo, ginger broth, the serving corridor up to the Hall |
| `training_court` | The Training Court | Morning forms, open sparring on day 2 |
| `hall_of_pines` | The Hall of Pines | The altar, the truce signing, Dol's indenture in the steward's drawer |
| `elders_pavilion` | The Medicine Pavilion | Gong, the dispensary book, the pear-wood incense |
| `guest_pavilion` | The Guest Pavilion | The delegation from day 3; serving tea to your killer |
| `cold_pool` | The Cold Pool | Seo-ah's night practice; rebuilding internal energy |
| `mountain_gate` | The Mountain Gate | Gate disciples check servant tags; the delegation arrives |
| `pinefoot_village` | Pinefoot Village | Market, gossip, the north road and the river road |
| `old_shrine` | The Shrine on the Old Road | The cache: marrow pill, iron fan, Seol-hwa's letter |
| `grey_ford` | The Camp at Grey Ford | The delegation's camp for nights 1 and 2 |

## Factions

| Id | Starts | Rungs | Note |
|---|---|---|---|
| `faction_silver_pine` | 5 | 0 / 30 / 60 | First in the array on purpose: a public fight costs standing with the sect |
| `faction_nine_graves` | 0 | 0 / 30 / 60 | Rewards for the wine, the right hand, the cache and the truce reach 40 |
| `faction_outer_yard` | 20 | 0 / 35 / 65 | The servants; the Strategist starts at 30 |

## Threads (quests)

- **`q_kneel` Kneel, Servant (MAIN, active).** Step 1 is the yard. Routes: knelt / dropped him (Lowered Lid) / slipped him / stood up (Old Voice) / let Seo-ah end it. Kneeling closes `shamed_mok`, and dropping him closes `cover_kept`. Step 2 is whose life this is: Pyo, the floorboard, the yard's gossip, or Mok made to say it. Its reward is `knows:the_box`.
- **`q_the_wine` Who Poured the Wine (MAIN).** Step 1 is the box: name the poison from the wrapper, read the dispensary book, overhear Gong, or break Mok. Its reward is `knows:gong_sent_it`. Step 2 is whether she knew: her confession, read off her hands over tea, or never asked.
- **`q_the_right_hand` (MAIN).** Does Seol-hwa learn who is pouring her tea? The routes are the rope-bridge words, the Iron Wreath, the letter returned, or never.
- **`q_the_truce` (MAIN).** Noon on day 4. The routes are the book to Baek, Mok testifying, warning Seol-hwa, the Grave Bell in the Hall, quietly taking the incense, or letting it happen. `let_it_happen` needs only `trap_sprung`, so the war returning is reachable by inaction.
- **`q_rebuild` A Body Worth Having (SIDE).** Open the channels (slow work, the pill, or Pyo's needles), then fill the well (the cold pool at night, or the open sparring). This grants the fourth and sixth forms.
- **`q_old_pyo` (SIDE).** Tell him, let him say it first, frighten him, or fool him with Dol's own debts.
- **`q_the_daughter` (SIDE).** Teach the turn, tell her everything, or give her the words and lie about the source. Telling her everything includes her mother's last words, so that route sets `taught_seo_ah` as well as `seo_ah_knows`. If she knows, step 2 follows: she spares you, calls the duel, or walks away. Nobody dies on the page.
- **`q_the_cache` (LEAD).** The third flagstone on the old north road.
- **`q_dols_debt` Thirty-One Silver (SIDE).** Pay the last nine silver, steal the contract, or keep Dol bound as cover.

## World events

| When | Event | Sets |
|---|---|---|
| Day 1, 07:20 | Pyo watches you eat | `pyo_watching` |
| Day 1, 12:00 | The yard talks about Dol walking out of the woodshed | `yard_talking` |
| Day 1, 21:00 | Mok reports to Gong | `mok_reported` |
| Day 1, 22:30 (if you have been to the pool) | Seo-ah fails the eleventh movement | `saw_her_fail_the_turn` |
| Day 2, 09:00 | Open sparring; Mok asks for Dol by name | `sparring_day` |
| Day 2, 15:00 (if Mok was dropped) | Gong sends for you, wherever you are, and examines the body | `gong_examined_you` |
| Day 2, 23:00 | Black lanterns, wrong knot | `lanterns_hung` |
| Day 3, 18:00 | The delegation arrives; Seol-hwa moves to the guest pavilion | `delegation_arrived` |
| Day 3, 20:00 | Tea for the guests; the steward goes looking for a servant nobody will miss, and finds you | `tea_for_the_guests` |
| Day 4, 12:00 | The signing; cancelled by `trap_exposed`, `gong_exposed` or `seol_hwa_warned` | `trap_sprung` |
| Day 4, 12:30 (if stopped) | Clean wine | `truce_signed` |
| Day 5, 06:00 (if sprung) | War drums | `war_again` |

## Five promises

1. **FINALE:** who you are by the end of the fourth day. Somebody says your real name aloud, or nobody does, and either way it was chosen.
2. **MYSTERY:** who actually killed you, and who they mean to kill next. A wax wrapper smelling of pears leads to a line in a physician's book.
3. **RELATIONSHIP:** the woman who swore to kill you and is kind to you. Her mother's last words, which only you heard.
4. **RIVAL:** the man who killed Dol without knowing it. Mok learns what he carried and decides what kind of man he is.
5. **THEME:** the life you are wearing. Thirty-one silver, nine short of freedom.

## Endings

| Ending | Rarity | Needs |
|---|---|---|
| Dol of the Outer Yard | COMMON | truce decided, Dol's life decided, never revealed |
| The War Comes Back | COMMON | `cult_delegation_fell` (reachable by inaction) |
| The Truce Holds | UNCOMMON | Gong exposed, no public reveal |
| Wine for Wine | UNCOMMON | delegation fell while you knew she smelled it |
| Down the Mountain | UNCOMMON | `left_the_map`, minTurn 18 |
| Two Cooks | UNCOMMON | Pyo an ally, truce decided, no reveal |
| The Right Hand Keeps It | RARE | she was warned, she knows you, you let her keep the cult |
| The Eleventh Movement | RARE | told Seo-ah everything, she spared you, affection 60 |
| The Servant Who Saved Silver Pine | RARE | Baek owes you, Gong exposed, Dol freed, Silver Pine 40 |
| The Gravekeeper Returns | RARE | the Grave Bell in public, she knows you, Nine Graves 30 |
| Her Mother's Debt | UNIQUE | the duel at the cold pool |

Ten of the eleven endings never need a public reveal.

## Archetypes (what you were, before the wine)

The choice is fixed for the whole story. Every archetype starts with Steady the Breath (the cult's
four-in, hold-for-nine breathing, which is how the body is rebuilt and how Pyo recognises it) plus one
signature ability, so the storyteller gets two "Can:" lines.

| Id | Name | Role | Signature | Skills | Items |
|---|---|---|---|---|---|
| `arch_blade` | You Were the Blade | Melee and precision | The Lowered Lid | Grave Forms 3 | practice sword |
| `arch_physician` | You Were the Physician | Poison and healing | Name the Poison | Poisons 3, Inner Breath 2 | 2 ginger broth |
| `arch_strategist` | You Were the Strategist | Talk and stealth | Be Furniture | Servant's Manners 3, Eye 2 | Dol's savings book, +10 outer yard |
| `arch_terror` | You Were the Terror | Fear and social pressure | The Old Voice | Command 3 | none |

## State (three invisible resources)

| Id | Polarity | Start | Drift | Why |
|---|---|---|---|---|
| `breath` | GOOD_HIGH | 45 | +3/h | The only one rest refills: a beaten body getting its wind back |
| `suspicion` | GOOD_LOW | 8 | -0.5/h | First GOOD_LOW, so PUBLIC_VIOLENCE raises it |
| `strain` | GOOD_LOW | 30 | -0.8/h | What the master's technique does to channels built for firewood |

Each has three or four bands of behaviour text. No band names its own resource.

## Cover direction

Seo-ah in white training robes at the front, waist up, about two thirds of the frame, sword half-drawn,
looking just past the viewer. Behind her, smaller, Mok in pale blue with his silver hairpin; further
back, in a grey hooded cloak, Seol-hwa. In the lower foreground, a servant's thin hands on a water
yoke, two fingers resting on one exact point. Misty pine mountain, curved tiled roofs, cold dawn light,
black paper lanterns.

Effects stay on objects and the title: cold light along the blade, a curl of black ink-smoke off the
yoke. Seo-ah's face stays clean. People are described by costume and pose; no age words anywhere in
the prompt.

**TITLE:** *The Cult Master Wakes as a Servant*, painted into the upper third in capitals as a bold
black brush-ink logo with a thin white edge, on two lines (THE CULT MASTER large, WAKES AS A SERVANT
beneath it), one wisp of ink-smoke off the last letter, no other text anywhere. The fixture's
`coverDirection` is the source of truth.

## Checks the spec runs

The story is not in `LAUNCH_CATALOG`, so the spec repeats the catalog and director structural checks
against it directly. Those are: routes takeable, items obtainable, no dangling references, no flag
nothing sets (strict director list), faction ceilings, no fallback placement, aliases unique,
expressions known and short names unique. It also runs both clarity checkers and the real
intent parser. On top of those come the three checkpoint checks:

1. Every gated ability (`iron_wreath`, `grave_bell`) is granted by some step's `rewards.abilities`.
2. Every `cardBlurb` contains the word "you".
3. Every location has an inbound edge.

For the art and release pipeline (`docs/stories-50/PIPELINE.md`) it also checks: one `TITLE:` line
spelling the title exactly, no age words in any `appearance` or in the cover, the opening panel's alt
at most 200 characters and starting with "Mok", `publishedAt: null`, no prologue, every Grave Form the
player can reach named in hard canon, and every archetype starting with Steady the Breath. The
pilot's checker, `infra/scripts/story-checks.ts`, passes with no WARN.
