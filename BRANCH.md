# `engine-fixes`

**Sits on `eea773a` — Omar's "Serve a world from its newest version that
parses", 12 September 2026**, which is the tip of `main`. It was originally cut
from `5f1152f`, the commit that finished the SwiftUI port and deleted
`apps/mobile`, and has been rebased forward since; it is kept rebased on `main`
rather than merged, so `main..engine-fixes` is always exactly this branch's own
work and nothing else.

Verify the base at any time:

    git merge-base main engine-fixes      # -> the commit this sits on
    git log --oneline main..engine-fixes  # only this branch's commits

## Why this is a branch and not main

Omar is still working on `main`. Everything here is engine-side — the parser,
the director, the writer, the validator and the world fixtures — and none of it
touches `apps/ios`, so it should merge without argument when he is ready. It is
parked rather than merged so that it is his call when.

## What is on it

Six commits, all from reading a twenty-turn Ace playtest as an adversarial
artifact and then re-playing it to check the fixes. Each commit message carries
the evidence that produced it. In order:

1. `8701b8b` — banter parsed as assault; phantom characters; two names for one
   person on one screen.
2. `40d3a6f` — the writer inventing injuries and promises the run never had.
3. `281bb40` — verbal tics, repeated cards and repeated images, all grown by the
   context window feeding on itself.
4. `317ea73` — a measurement for a scene that has stopped moving, and for a
   present character the prose has forgotten.
5. `c125d56` — one punch printing "afraid of you" for everybody who watched.
6. `5753d7b` — what re-playing it found the first five had missed.

## This branch is what repairs the production catalogue

`eea773a` exists because of a mistake made while writing this branch: `npm run
migrate` was run against the **production** database from a machine holding an
unpushed contract change, so every world was republished carrying
`CharacterDef.calledName`, which the deployed build's strict schema rejects.
`/v1/discover` and `/v1/bootstrap` answered 500 while `/health` said fine, and
the app read that as offline. Omar made the catalogue resilient — a world whose
newest version will not parse is served from its newest version that does — so
production is up, but it is serving the version *before* the bad one for the
six worlds that carry the new field.

`calledName` is defined in this branch, so merging it is what makes those
versions parse again. Measured against the live database: **25 of 25 newest
published versions parse under this branch's contract**, six of them carrying
`calledName`.

Until then, do not run `migrate` against production from a branch whose
contract changes are not deployed. The lesson is the ordering: a schema change
ships before the data that uses it, never after.

## Before merging

`npm run smoke` has not been run green against this branch. It plays all
twenty-five worlds badly on purpose and is where false positives in the new
validators would show up. Run it before merging.

## Also unfinished

The pending-hero-frame placeholder was written for the Expo `Session.tsx` and
did not survive the port. It needs rebuilding in `apps/ios`. Without it a
player sees no sign that a frame is coming, and meets the art by scrolling
backwards into a beat they have already read.
