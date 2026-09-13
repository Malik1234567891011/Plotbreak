# Quality pass — 40-turn Ace playtest

Working notes. Each item: root cause found, fix, test. Ticked when tests pass.

Order is by what it costs a player, not by the order in the brief.

## P0 — the product refuses to work

- [x] 9. Game offers a card, then refuses it. `harassment/threatening` is in
      `BLOCKING_CATEGORIES` (openai.ts:68). Probed the exact card: it fires
      `harassment, harassment/threatening, violence`. `violence` is correctly
      *not* blocking — every "I hit him" fires it. An in-fiction threat to an
      NPC is the same class of thing. Two fixes: drop that category, and never
      moderate text the engine itself just offered.
- [x] 12. **My audit was wrong again.** Tapping a card *does* send —
      `SessionModel.choose` calls `send(suggestion.text, ...)`, and retested in
      the simulator the wallet goes 540 → 480 and the turn runs. What I saw the
      first time was the 401 from the missing `Local.xcconfig`, which made every
      write fail silently, including the one I blamed on the card. The real
      lesson is the silence: a failed send showed the player nothing at all.
- [x] 12b. Swift: no pending-frame placeholder; art lands ~60s later, above
      content already scrolled past.
- [x] 11. **My audit was wrong.** I read `media_plan.reaction`, and `MediaPlan`
      has no `reaction` field — it has `expressions`. Captured a real SSE
      stream: `reaction.ready` fires at **2.7s** with `luffy/annoyed`, the
      asset 200s, and the Swift client both decodes (`SessionModel:388`) and
      renders it (`SessionFeed:121`). Reactions are alive.
      The real defect is smaller and further down: `sceneState()` hardcodes
      `expression: 'neutral'`, `reactionUrl: null`, `reactionEmotion: null` for
      every character on every turn (`projections.ts:248-256`), so the
      persistent portrait row never shows mood — `SessionStage:104` falls back
      to the plain portrait forever. Only the transient pending reaction ever
      has a face.
- [x] 10. Four causes, all "the prompt was never told":
      `presentCharacterIds` was the *director's* `activeCharacterIds`, unchecked
      against the room (turn 13 sent Dadan while the player was on the
      mountain; turn 20 sent `[]`); `sceneFacts` was `observableFacts` alone,
      **measured empty on turns 13 and 25**, so the prompt carried no statement
      of the moment; `player.appearance` read `identity.advanced.appearance`,
      which is null for a named protagonist, so nothing said who the
      over-the-shoulder body was or that Ace is ten; and the cast list was
      never closed, so extra people and duplicate Luffys were free.

## P1 — the fiction contradicts itself

- [x] 1. 11/38 beats named somebody elsewhere; the guard only fired on
      co-presence phrases. Now the verb, plus arrivals/departures.
- [x] 8. Constrained version: `carrying` is authoritative and policed. A full
      object register (holder, container, who-knows) is scoped, not built.
- [x] 2. `openSituation` from `endStatePrompt` + restatement counter.
- [x] 13. It is an ability name. Unlocked ability = capability; a card asserts
      a situation. Gated on the scene supporting it.

## P2 — it works but does not feel intentional

- [x] 4. 12/16 rolls were `Investigate`/`Interact` with nothing opposing.
- [x] 3. Semantic loop via endStatePrompt similarity.
- [x] 5. Card policy, both locales.
- [x] 7. `openersToAvoid` per character; window 4 -> 8 beats.
- [x] 6. Happening / feels like / means, in that proportion.

## Must not regress

Parser fidelity, invented history, relationship coherence, world movement.
`packages/director/src/playful-challenge.spec.ts`,
`invented-history.spec.ts`, `speech-tics.spec.ts`, `scene-progress.spec.ts`.

## Found during the re-test: `calledName` was never live

The chips still said "Monkey is afraid of you" after the fix that was supposed
to make them say "Luffy". Not a code fault — `calledName` is **data**, and the
published Ace version did not have it. Five versions existed, newest at 19:21,
and `luffy.calledName` was null in every one: the last `migrate` before this
pass ran from a tree that did not carry the field.

So the naming fix has never been live in any playtest, including the two I
reported on. `migrate` republished Ace as v6 with the field present and it is
live now.

Two things this changes about what I said earlier. My audit of the production
catalogue reported "6 of 25 newest versions carry calledName" and I assumed Ace
was one of them; it was not, and I did not check per world. And the second
playtest's "Monkey" labels were evidence of a data gap, not of the fix failing.

A session is pinned to the story version it started on, so the re-test running
now is on v5 and will still show the old labels. Everything else in this pass is
code-side and applies to it regardless.
