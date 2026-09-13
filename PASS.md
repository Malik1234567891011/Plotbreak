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
- [ ] 12b. Swift: no pending-frame placeholder; art lands ~60s later, above
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

- [ ] 1. Presence/blocking not authoritative.
- [ ] 8. Important objects have no authoritative location.
- [ ] 2. Foregrounded obstacles silently forgotten.
- [ ] 13. Planned-but-unestablished events leaking into cards
      ("Accept being saved").

## P2 — it works but does not feel intentional

- [ ] 4. Checks with no uncertain outcome.
- [ ] 3. Scene exhaustion, second pass (semantic loop, not location loop).
- [ ] 5. Cards articulate theme instead of character.
- [ ] 7. Per-character phrase tics ("Look,").
- [ ] 6. Literary prose density.

## Must not regress

Parser fidelity, invented history, relationship coherence, world movement.
`packages/director/src/playful-challenge.spec.ts`,
`invented-history.spec.ts`, `speech-tics.spec.ts`, `scene-progress.spec.ts`.
