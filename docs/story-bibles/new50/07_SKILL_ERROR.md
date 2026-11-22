# SKILL: ERROR

**Slate:** #7 of 50 (`docs/stories-50/PLAN.md`), Drop 1. Pilot for the other 49.
**Trope:** OP-skill isekai with a status window. **Lean:** male.
**OOC evidence:** "Reincarnated With an OP Skill" 20.7M + 5.9M plays; ISEKAI is OOC's #2 search.
**Hook:** The goddess gave everyone on your bus a skill. Yours reads ERROR, and the court mage just went pale.
**Fixture:** `packages/test-fixtures/src/skill-error.ts` (`SKILL_ERROR`, `story_skill_error`). **Spec:** `skill-error.spec.ts`.
**Protagonist:** BLANK. The player names themselves; the archetype is their job at the firm.

## Adults only

Every person in this story is an adult. The ages are canon and are also written into `hardCanon`, so
the storyteller has them on every turn.

| Who | Age |
|---|---|
| The player, a summoned office worker | 24 |
| Selene Varre, court mage | 24 |
| Princess Aurelia, heir to the throne | 22 |
| Daichi Ono, the player's coworker, Hero class | 27 |
| Inquisitor Hask (born Hasegawa Ren) | 43 |
| King Matthias of Ostmere | 52 |
| The other 29 summoned from the bus | all adults on their way to work |

Covers and portraits describe people by costume and pose, never by age words.

## The pitch

You were on the 7:42 bus to work. The windows went white, a woman's voice said one sentence to each
passenger, and thirty-one commuters landed on the marble of a royal summoning hall with status windows
hanging in front of their faces. The king reads the skills aloud like a payroll: Hero, Saint, Sword
Saint. Yours reads `[ERROR: skill too large to display]`, and the court mage who drew the circle goes
white, because she can read one line under the error that nobody else can.

It is the most powerful skill in the kingdom. Nobody, including you, knows what it is yet. The court
is very polite about wanting to own it.

## Playable span

Four days in and around the palace of Ostmere, from the moment of the summoning (day 0, 11:50) to the
morning the sworn summoned march north (day 4, 07:00). The Audit at the Cathedral sits on the third
morning (day 3, 09:00) and is the spine. Everything after the march lives in the endings.

The span is small on purpose: one palace, one city below it, one cathedral, five people with
conflicting plans, and a skill that gets bigger every time it is used. That is enough to make every
route different.

## The world, in plain words

- **Ostmere** is a kingdom with a palace on a hill and a walled city below it.
- Over the northern pass there is a tear in the sky, **the Breach**. Grey, faceless beasts come through
  it. It is real, soldiers are dying, and it is why the court summons people.
- The **Church of the Register** keeps the **Great Register**: a wall of stone tablets in the Cathedral
  where every skill in the kingdom is carved with its rank (C, B, A, S). A skill that is not in the
  Register is "aberrant", and aberrant skills are audited.
- The **Covenant of the Highest** is a two-hundred-year-old law: the heir marries whichever summoned
  has the highest-ranked skill. It is how Ostmere ties its Heroes to the crown.
- Twenty-two years ago a summoned man's skill read `???` and overflowed in the palace's east wing on
  his third day. Eleven people died, the queen among them. The east wing was plastered shut.

## The system (the thing that makes this an OP-skill isekai)

### Status windows

Everyone has one: a translucent blue panel, five lines tall.

```
Name   ·  Class  ·  Level  ·  Skill  ·  Oath
```

You open your own at will. Reading anyone else's needs an appraisal skill or tool. Selene's
**Mage's Eye** reads the five lines. Hask's **Register Lens** reads the five lines and the rank. Neither
reads hidden lines.

### The oath (why the court wants control)

Kneeling at the circle while the king presses the **Oath Seal** (his signet ring) to your head writes
an Oath line into a summoned person's window:

```
Oath: Sworn to the Crown of Ostmere. Will not refuse a royal order.
```

A sworn person's body locks if they try to refuse a direct royal order or raise a hand against the
royal family. The summoned were told it was a welcome ceremony. Twenty-nine of them and Daichi have
sworn by the time the story opens.

### ERROR

The player's window:

```
Name: <player>   Class: —   Level: 1
Skill: [ERROR: skill too large to display]   3% loaded
Oath: —
```

**ERROR rejects any line written into it.** If the player kneels, the oath line appears for half a
second and glitches out. That is the first thing the court learns, and it is why they go quiet.

**It grows by use.** Every use loads more, and it unlocks in a fixed order:

| Load | Unlock | What it does | Ability id |
|---|---|---|---|
| 3% (start) | **Read** | Read any window, every line, including hidden ones (oaths, sealed skills, true names, false Register entries) | `read_window` |
| ~25% | **Crash** | Make one skill in sight fail: a spell fizzles to static, a technique stops mid-swing, a seal cracks | `crash_skill` |
| ~60% | **Rewrite** | Change one line in a window: delete an oath, move a skill, edit a Register tablet | `rewrite_line` |
| 100% | **Real name** | The window prints `[Summoner]`, and the player can open the circle | `open_the_circle` |

In the engine, each unlock is a quest-step reward (`q_loading`), and every route of the step that
grants it requires having used the previous stage. Grant broadly, gate by flag: `error:crash`,
`error:rewrite`, `error:full`.

**The cost is static.** Every use leaks red static into the world around the player: stuttering
lamps, other people's windows flickering open, nearby skills misfiring. Use it hard and often enough
and the world starts to break the way it did in the east wing. That is the `overflow` resource, and
Rewrite and Open the Circle cannot be used when it is too high.

**The real name.** At 100% the window prints `[Summoner]`. ERROR is the authority that powers the
summoning circle, and it opens the circle in either direction. The circle in the hall went dark when
the player arrived. The court cannot summon anybody again unless the skill is sealed, which hands the
authority back to the circle. That is the king's real reason for wanting the Audit.

## Premise (as shipped)

> You were on the 7:42 bus to work, two seats behind your coworker Daichi, when the windows went
> white. A moment later thirty-one commuters were standing in the summoning hall of a royal palace in
> another world, each with a glowing blue status window in front of their face.
>
> The king read the skills aloud. Daichi got Hero. Others got Saint and Sword Saint. Yours reads
> [ERROR: skill too large to display], and the court mage who drew the summoning circle went white
> when she saw it.
>
> You find out fast why that matters. Everyone else knelt and swore an oath they were told was a
> welcome, and now a sworn summoned cannot refuse a royal order. Your skill throws out any line written
> into it. It also grows each time you use it: first it reads any window, then it makes other skills
> fail, then it rewrites them.
>
> So the court wants it controlled. On the third morning the Church's Inquisitor will put your hand on
> the Great Register and decide whether the skill is registered to the Crown, sealed with a hot iron,
> or left unwritten. Daichi wants you to keep your head down, because the king has promised to send
> the Hero home.
>
> You have three days to keep the skill yours, or decide it should not be. Every use leaks red static
> that somebody will notice.

## Opener (turn 1, verbatim)

> The king reads the skills off a long scroll.
>
> "Hero." Daichi, your coworker, still wearing his office lanyard, goes red to the ears as the hall applauds.
>
> "Saint." "Sword Saint." More applause.
>
> Daichi leans back to you. "What did you get? Tell me it's something good."
>
> The king reaches your line and stops reading.
>
> A blue window opens in the air in front of you, one line stuttering red:
>
> [ERROR: skill too large to display]
>
> Beside the throne, the silver-haired court mage reads it, and goes white.
>
> Nobody claps.
>
> Twenty-nine people from your bus are already kneeling on the marble. Daichi kneels with them.
>
> The king rolls up the scroll.
>
> "Kneel," he says, "and show us."

**Quality bar:** Daichi speaks to the player inside the first 60 words. It ends on a demand that needs
an answer now. Under 120 words. The only proper noun is Daichi, introduced as "your coworker".

**Opening suggestions** (said / done / risky):

1. Said: `"I'll show you. First tell me what kneeling does."`
2. Done: `I kneel beside Daichi and keep the red window open where the court can see it.`
3. Risky: `I stay standing and touch the red line with one finger.`

## Cast

Every one of them wants something that has nothing to do with the player. That is what keeps them
from being an audience.

### Selene Varre, 24, court mage

- **Role:** Drew the summoning circle. The only person in the hall who can read the player's window.
- **Looks:** Long straight silver hair with thin braids worked through it, violet eyes, a navy-and-gold
  high-collared mage's robe with a silver chain, dark gloves, a tall pale-wood staff ringed with crystal.
- **Her own motive:** Commoner-born, a lamp-maker's daughter, the youngest court mage in a century. The
  summoning was her career's work. If the court decides the circle is broken, she loses the tower and
  goes before the Inquisition as the mage who let an aberration in.
- **Immediate want:** Get the player to her tower before Hask gets them to the Cathedral, and study
  the skill before anyone seals it.
- **Long-term want:** To understand the goddess's system, and to find out whether the summoning can be
  run backwards.
- **Fear:** That she is the reason thirty-one people cannot go home.
- **Secret 1 (why she went pale):** Under the ERROR, the Mage's Eye caught one line for half a second:
  `Circle authority: transferred to holder.` Her circle is dark because the player is carrying what
  powered it. She told the king it is "resting".
- **Secret 2:** For a year she has been drafting a return circle on the underside of her worktable. It
  needs an authority she does not have. The Church would call it heresy.
- **Boundaries:** Will not lie to the player once asked directly; she refuses out loud instead. Will
  not let anyone read her own window.
- **Voice:** Fast, precise, numbers and circle geometry. Starts sentences in the middle. Snaps into
  stiff court courtesy the moment she remembers who might be listening.

### Princess Aurelia, 22, heir to the throne

- **Role:** Heir. By the Covenant of the Highest, promised to whichever summoned has the highest skill.
- **Looks:** Golden hair cut short at the jaw, grey-green eyes, a thin gold circlet, a white-and-crimson
  riding coat over a fencing shirt, a slim rapier worn openly at court.
- **Her own motive:** She wants the throne in her own name, with no summoned husband attached. She also
  wants the summoned unsworn: a crown that rules through people who cannot refuse it is not one she
  wants to inherit.
- **Immediate want:** Stand at the Audit and get the Church to rule that a skill with no rank cannot be
  "the highest", which breaks the Covenant.
- **Fear:** That the player reads her window and the court learns what is on it. Becoming her father.
- **Secret 1:** She was born with no skill. The Register lists her as "Blade, rank B". Hask wrote that
  line. Ten years of dawn sword practice is how she made up for it.
- **Secret 2:** Her petition to the Church is already written. It only works if the player stays
  unsealed and unregistered.
- **Boundaries:** Will not be treated as a prize; anyone who talks about her hand as something to win
  has lost her. Will not kneel to the Church.
- **Voice:** Short, dry, exact. Questions instead of statements. Orders phrased as suggestions.

### Daichi Ono, 27, the player's coworker, Hero class

- **Role:** Team lead at the same logistics firm. Sat two seats ahead on the bus. Got Hero. Knelt first.
- **Looks:** Tall, broad-shouldered, neat short black hair, white office shirt and loosened tie under a
  borrowed white-and-gold Hero's cloak, company ID lanyard still round his neck, a longsword he holds
  slightly wrong.
- **His own motive:** He was going to propose to Rina tonight. The ring is in his jacket pocket. The
  king promised the circle will send the Hero home once the Breach is closed, and he has decided to
  believe it.
- **Underneath:** Being the Hero is the first time a room has ever gone quiet for him. Part of him does
  not want it to end.
- **Immediate want:** Get through training, close the Breach, go home. Keep the player out of trouble
  long enough not to ruin it for everybody.
- **Fear:** That there is no way home. That the player outranks him and everyone can see it.
- **Secret:** His window has a line he cannot see: `Oath: Sworn to the Crown of Ostmere. Will not
  refuse a royal order.` He has already obeyed two orders he meant to argue with and thinks he lost his
  nerve.
- **Boundaries:** Will not leave anyone from the bus behind. Will not hear a word against the king's
  promise without proof.
- **Voice:** Friendly salaryman. Office phrases as jokes ("let's circle back", "not in scope"). Louder
  and faster when scared, then apologises.

### Inquisitor Hask, 43, Church of the Register

- **Role:** Decides which skills are written down, which are sealed, and which are burned out. Has
  called the Audit for the third morning. Carries the Sealing Brand.
- **Looks:** Gaunt, close-cropped grey hair, deep-set dark eyes, long black coat, a white stole
  embroidered with rows of tiny script, a single black glove on the right hand, a round crystal lens
  on a chain.
- **His own motive:** He is the man from the east wing. Born Hasegawa Ren, summoned at twenty-one from
  the player's own world. His skill read `???` and overflowed on his third day. The Church sealed it
  and made him an Inquisitor at his own request. He wants the player's skill sealed before it does what
  his did, and underneath, he needs to know whether his could have been held.
- **Fear:** The east wing, again. Hope: that the player is proof there was a way home and he stopped
  looking.
- **Secret 1:** His window: `Name: Hask (Hasegawa Ren). Origin: Summoned. Skill: [SEALED].` ERROR reads
  it straight off.
- **Secret 2:** He wrote one false line in the Register: the princess's skill.
- **Boundaries:** Will not seal a skill without an Audit, whoever orders it. Will not write a false line
  in the Register ever again.
- **Voice:** Quiet, procedural, numbered points. Once in a while a word from the player's world slips
  out and he corrects himself without comment.

### King Matthias of Ostmere, 52

- **Role:** Ordered the summoning. Holds the Oath Seal.
- **Looks:** Heavyset, grey-bearded, a plain gold crown, a deep blue mantle over a soldier's padded
  coat, a heavy gold seal ring engraved with a circle that he turns while he listens.
- **His own motive:** The northern pass is failing; four hundred held it last month and ninety came
  back. He needs every summoned sworn and marching by the fourth morning, and he needs the circle lit
  again. He was thirty when the east wing broke and killed his mother; he will not have an unsworn
  summoned walking his palace a second time.
- **Fear:** The east wing. That his daughter is right about him.
- **Secret 1:** He promised Daichi the circle will send the Hero home. He has no idea whether it can.
- **Secret 2:** He has guessed that sealing the player's skill would relight the circle.
- **Boundaries:** Will not lie about the Breach. Will not order a summoned person killed outside the law.
- **Voice:** Measured, warm, final. Explains himself completely, then decides. Uses people's names.

## Places

| Id | Place | What it is |
|---|---|---|
| `summoning_hall` | The Summoning Hall | Throne room and summoning floor: marble, a great circle (dark since the player arrived), stained glass, the throne. Start. |
| `palace_gallery` | The Long Gallery | The palace spine. Portraits of every Hero ever summoned. A plastered doorway at the east end. |
| `guest_wing` | The Guest Wing | Where the thirty-one are quartered. The notice for the Audit goes up on its door. |
| `mage_tower` | Selene's Tower | Lenses, chalk circles, a cot, and the return circle under the worktable. |
| `royal_garden` | The Queen's Garden | Walled garden. Aurelia's dawn sword practice. |
| `training_yard` | The Knights' Yard | Where the summoned train and are tested. Where they form up to march. |
| `map_room` | The Map Room | The king's war table, the Breach in red ink. |
| `city_market` | The Lower City | Market streets below the palace. Food, crowds, the way out. |
| `cathedral` | The Cathedral of the Register | The Great Register. The Audit. Hask's lens and brand. |
| `sealed_wing` | The East Wing | Plastered shut for twenty-two years. Opens when the red outline shows through (`found_the_sealed_door`). |

## Factions

- **The Crown of Ostmere** (first in the array, so public violence costs crown standing first).
- **The Church of the Register.**
- **The Thirty-One:** everyone from the bus.

## Threads (quests)

1. **Kneel, and Show Us** (MAIN, starts active). Answer the king; get out of the hall with the skill
   still yours.
2. **ERROR: 3% Loaded** (MAIN, starts active). The skill's growth: Read → Crash → Rewrite → real name.
3. **The Audit** (MAIN). Who stands with you; the verdict: registered, sealed, rewritten, or spared.
4. **Everyone From the Bus** (SIDE). What the others swore, and what happens on the fourth morning.
5. **The Highest Skill** (SIDE). The Covenant, the princess, and a betrothal nobody asked for.
6. **The Way Back** (LEAD). Whether the circle runs backwards, and who goes through.

## World events

| When | Where | What |
|---|---|---|
| Day 0, 12:20 | Hall | The circle goes dark under the player's feet. |
| Day 0, 15:00 | Guest wing | The Audit notice goes up. |
| Day 0, 19:00 | Hall | Welcome banquet; a councillor asks whether ERROR outranks the Hero. |
| Day 1, 02:10 | Guest wing | (once Crash is unlocked) Every lamp dies; every window opens in the dark. |
| Day 1, 23:00 | Gallery | (once Crash is unlocked) The plastered door shows a red outline. |
| Day 2, 09:00 | Hall | A rider from the north: the Breach has doubled; march on the fourth morning. |
| Day 3, 09:00 | Cathedral | The Audit. |
| Day 4, 07:00 | Yard | The sworn summoned march north, unless they have been unsworn or sent home. |

## Five promises

1. **FINALE: what the skill actually is.** Seed: `[ERROR: skill too large to display] 3% loaded`.
   Payoff: `[Summoner]`.
2. **MYSTERY: why the court mage went white.** Payoff: `Circle authority: transferred to holder.`
3. **RELATIONSHIP: what Daichi swore.** Payoff: `Will not refuse a royal order.`
4. **BOSS: the Audit on the third morning.** Payoff: Hask's own window: summoned, sealed, the east wing.
5. **THEME: the princess and the highest skill.** Payoff: her skill line is empty.

## Endings

Five of twelve are losses, and walking away is one of them.

| Ending | Rarity | Reached when |
|---|---|---|
| The Crown's Weapon | COMMON | Registered to the Crown at the Audit. Not sworn, but owned. |
| Sealed | COMMON | Hask seals the skill. The circle relights. |
| North With the Others | COMMON | The bus marches and the player marches with them. |
| Over the Wall | UNCOMMON | The player walks out of the city before the Audit. |
| Too Large to Display | UNCOMMON | The skill is fully loaded and the static has already spread. The east wing again. |
| The Hero Quits | UNCOMMON | Daichi's oath deleted, and he chooses for himself. |
| Unregistered | RARE | Through the Audit with the skill unwritten. |
| Two Names in the Margin | RARE | Selene measured it and testified for it; partners in the tower. |
| Her Own Crown | RARE | The Covenant broken; Aurelia heir in her own name. |
| Everyone Off the Bus | RARE | The player opens the circle, sends the others home, and stays. |
| The 7:42 | UNIQUE | The player goes home. |
| Hasegawa Ren | UNIQUE | Hask leaves the skill unwritten and asks to go home himself. |

## Archetypes (what you did at the firm)

All four work at the same logistics firm as Daichi. Each starts with ERROR's Read plus one ordinary
ability, so the storyteller sees both.

| Id | Name | Gives |
|---|---|---|
| `arch_sales` | You Sold Things | Presence, Small Talk; Play the Part; a box of business cards |
| `arch_ops` | You Ran the Paperwork | Mind, Fine Print; Read the Fine Print; a work notebook |
| `arch_support` | You Fixed the Systems | Arcana, Control; a dead phone with a working torch |
| `arch_floor` | You Worked the Warehouse | Might and Agility, Overtime; Slip Out; a clear plastic umbrella |

## State (three invisible resources)

- **Stamina** (GOOD_HIGH, the only one rest restores). The day runs out.
- **Suspicion** (GOOD_LOW, first in the array). How far the court has moved from curiosity to force.
  Raised by Crash, Rewrite and Slip Out.
- **Overflow** (GOOD_LOW). Red static. Raised by every ERROR ability; drains on its own.

## Cover direction

A fantasy throne-room summoning hall: marble floor with a glowing summoning circle, stained glass, a
throne in soft focus. Selene large in frame, waist up, close and centred. One gloved hand raised toward
a cracking, glitching translucent blue status window with red shards and static that shows only
abstract bars and a red warning triangle (no letters, no numbers). Alarmed and fascinated, looking
straight at the viewer. Cyan light from the window, warm gold from the hall. The title "SKILL: ERROR"
painted into the art.

Two fixes from the PixAI test render, both written into `coverDirection`:

- Red glitch effects go on the window and on the word ERROR in the title, **never on her face**. A red
  mark on her cheek read as a wound.
- She is described by costume and pose, not by age words.

## Conventions this pilot sets for the other 49

- Bible at `docs/story-bibles/new50/NN_TITLE.md`; fixture `packages/test-fixtures/src/<slug>.ts`
  exporting the raw `StoryVersion.parse(raw)` as `SCREAMING_SLUG`; `storyId: story_<slug>`,
  `id: sv_<slug>_1`.
- Registered in `index.ts` raw (no `withDerivedAssetKeys`) until art exists. `publishedAt: null`; the
  drop sets the date.
- No `openingPanel` and no `prologue` until art exists: both name asset keys that would 404.
- The pure storyteller reads the premise, tone guide, hard canon, cast, opening, style examples,
  places, **quest items only**, factions, quest titles and summaries, world events and the first twelve
  endings. It does **not** read resources, step director notes, promises, skills, or abilities other
  than the chosen archetype's starting ones. So the system lives in hard canon, a quest item (the
  status window) and the archetypes' starting abilities.
- The tone guide is also pasted into the cover prompt as "Mood". Keep literal window text out of it.
