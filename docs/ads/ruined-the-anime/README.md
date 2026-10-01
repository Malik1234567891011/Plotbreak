# "I just ruined the entire anime" (15s, 9:16, EN)

The creator-style ad: a guy posts what happened when he typed something outrageous
into Plotbreak. The hook is the consequence, the phone is the explanation, and the
unresolved fight is the CTA. Built with `~/seedance-plotbreak` (Seedance 2.5 via Runware).

Screens follow Malik's mockup (`ref/screens-mockup.png`), not the live app. No home,
discovery or loading screens: we go straight into the story screen.

## Decisions (agreed 2026-09-22)

- Hook = a flash-forward to the crown moment, not an unexplained wrecked throne room.
  The payoff then catches up to it.
- Two renders, cut together: anime (10s, cinematic, multi-shot) and bedroom (4s,
  handheld "anime UGC"). Cost is per second, so this costs the same as one render.
- 4 guards in focus at most, visored helmets (no faces to clone), extras as soft
  silhouettes. One crown only.
- Full-screen UI cut-ins built in post from the mockup, not tracked into the phone.
- All dialogue is external TTS, verified by transcription. Shots are framed so that
  only the king's line needs a visible mouth.

## Character bible (locked)

- **Player (real layer):** ~19, messy dark-brown hair, warm brown eyes, slight
  under-eye shadows, expressive eyebrows, oversized black hoodie, thin silver chain,
  grey sweatpants. Dark bedroom, purple LED strip, manga shelf, one figure, laptop.
- **Hero (anime layer):** same face and hair, idealised. Black coat with crimson lining
  and gold trim, boots, sword sheathed at left hip until the last beat, small scar on
  his left cheekbone.
- **King Aurelius:** ~25, long straight pale-blond hair, blue eyes, white-and-gold
  filigree armour, white fur-trimmed cloak. Calm; surprise, then stillness, then a
  faint smile.
- **Crown:** gold, tall spires, deep red gems. Exactly one.

## Delivered

`~/Desktop/plotbreak-ruined-v1.mp4` (= `cut/edit-v2.mp4`), 2026-09-22. 15.000s, 360 frames at
24 fps, 720x1280, -14.1 LUFS. Every line verified by transcription. Rebuild with
`python3 cut/assemble.py <out.mp4>`. Screens: `python3 ui/render_ui.py`. Voices:
`python3 vo/make_vo.py [id]`. Effects: `sfx/make_sfx.sh`.

## Edit as built (frames at 24 fps; the table below is the original plan)

| frames | t | segment | source |
|---|---|---|---|
| 0-38 | 0.00 | hook | anime shot 5, f167-205; audio borrowed from shot 1 |
| 38-82 | 1.58 | bedroom1 | bedroom f0-44 |
| 82-150 | 3.42 | ui | ui/ui-a.mp4 (tap f10, typing f19-56, SEND f61) |
| 150-172 | 6.25 | snatch | anime f14-36 |
| 172-198 | 7.17 | crown | anime f54-80 |
| 198-221 | 8.25 | swords | anime f82-105 |
| 221-256 | 9.21 | king | anime f106-141 |
| 256-275 | 10.67 | bedroom2 | bedroom f62-81 |
| 275-308 | 11.46 | montage | ui/montage.mp4 |
| 308-341 | 12.83 | charge | anime f208-241 |
| 341-360 | 14.21 | end card | ui/endcard.mp4 |

Voices: his lines are `echo` (the fastest speaker; `verse` was too slow for the slots), the
king is `onyx`, the guard `ash`. Placements are in `cut/assemble.py`.

## What went wrong, and what to do next time

- **Two renders at once fail.** Runware holds credit for an in-flight request, so the
  second one came back "Insufficient available balance" with $12 in the account. Render
  one at a time.
- **The prompt writer forces a single take at 10s or less,** even when the brief says
  multi-shot in capitals. The anime prompt was rewritten by hand through
  `PATCH /api/runs/:id/prompt` (`briefs/anime-prompt-v1.txt`).
- **Seedance added a spoken "Oh no!"** in shot 5 (6.66-8.42s) despite "no voices". The
  hook uses shot 1's bed instead.
- **"Lips move silently" did not animate the king's lips.** His line starts over the wide
  shot and finishes over the first frames of the close-up, with the smile after it.
- **Runware balance fell $4.41** (12.36 to 7.94) against $3.22 of video on the app's own
  cost lines. The $1.19 gap is unexplained, possibly the failed concurrent request.
  Check the Runware usage page before assuming what a render costs.

## Edit (15.0s), original plan

| t | layer | picture | sound |
|---|---|---|---|
| 0.00-1.60 | anime b5 | hero wearing the crown, surrounded, "oh no" | impact on frame 1; VO "Bro... I just ruined the entire anime." caption `i just ruined the entire anime 💀` |
| 1.60-3.40 | bedroom b1 | laughing at phone, glance to camera | VO "It actually let me do it." |
| 3.40-6.40 | UI | king screen, then typing "I grab the king's crown and put it on myself", then SEND | key taps; VO "Watch this." |
| 6.40-7.20 | anime b1 | crown snatched | clink |
| 7.20-8.30 | anime b2 | crown on, king's eyes wide | gasp, guard "WHAT—?!" |
| 8.30-9.20 | anime b3 | swords drawn, wide | SHING |
| 9.20-10.40 | anime b4 | king's smile | KING "Then defend your throne." |
| 10.40-11.20 | bedroom b2 | head shake, grin | VO "You can literally type anything." |
| 11.20-12.70 | UI montage | princess / duel / villain, 0.5s each | |
| 12.70-14.20 | anime b6 | charge, grin | VO "Nah, I'm becoming the villain." |
| 14.20-15.00 | end card | logo, PLAY THE ANIME. BREAK THE PLOT., Play now | |

## Runs

- anime: `67c55d20`
- bedroom: `3df0b230`

## Voice v2 (done 2026-09-22): ~/Desktop/plotbreak-ruined-v2.mp4 = cut/edit-v3.mp4

Malik: v1 voices sound AI-ish, cadence off. Cause on our side: `make_vo.py` sped lines up by as much as
1.3x and cut pauses to 0.14s to fit the slots. v2 attempts:

- `vo/perform.py`: one acted take per character from gpt-audio-1.5 (creator `cedar`, king `ballad`),
  sliced at pauses into `vo/v2/`, no time-stretch. The listener still scores it 3.6/10.
- **Listener** `vo/eval/listen.py` (run with `~/.venvs/voice-eval/bin/python`): Praat prosody + a blind
  gpt-audio "casting director" rating, 3 runs averaged. Calibrated: v1 creator 3.47, v2 creator 3.57,
  v1 king 4.1, v2 king 3.8. It names the same faults Malik heard (even spacing, over-enunciation, no
  breaths). Not yet shown it can score a good take high.
- ElevenLabs (Starter, 90k credits): v3 + audio tags looks like the fix. Creating an API key from the
  browser was blocked by the permission classifier. The web UI works (v3, voice "Liam - Energetic,
  Social Media Creator", 2 generations per click, audio arrives as a data: URL in the page's <audio>).
  Moving clips to disk goes through `vo/eleven/receiver.py` on 127.0.0.1:8791, which needs Chrome's
  local-network permission for elevenlabs.io, or an API key in `~/seedance-plotbreak/.env.local`.

### Result

ElevenLabs API key is in `~/seedance-plotbreak/.env.local` as `ELEVENLABS_API_KEY` (Malik supplied it).
`vo/eval/eleven.py sweep <name>` generates v3 takes and scores them (`vo/eleven/results.jsonl` has every
take); `vo/eval/duel.py` runs head-to-heads in both orders (strong position bias, so never trust one order).

| | v1 OpenAI TTS | v2 gpt-audio | ElevenLabs v3 |
|---|---|---|---|
| him (5 lines) | 3.5 | 3.6 | **8.8** raw take, 8.1 as sliced |
| king | 4.1 | 3.8 | **5.9** |

- Him: library voice **Andrew - Young Male, Outgoing** (`BTEPH6wbWkb66Dys0ry6`), script `s1`, stability
  0.0 (Creative), seed 11. Keeps a natural stumble ("It, it actually..."). Creative mode says "Bruh",
  which is fine.
- King: **Blackwood - Sinister, Posh and British** (`agL69Vji082CshT65Tcy`), script `k3`, stability 0.0,
  seed 33. v3 is erratic on short text, so he performs a lead-in speech and only the last line is used.
  26 king takes across 7 voices plus Voice Design all landed around 4-6: stylised king lines seem to top
  out there with this listener.
- Natural delivery is ~2.3 s longer than the squeezed v1, so the edit is re-timed to **16.0 s / 385 f**
  (bedroom1 58 f, UI 64 f, king 45 f, end card 24 f); "villain" lands on the cut to black.
- A phone-mic treatment on his voice was inconclusive (absolute score down, duel up), so it is not applied.
- ElevenLabs credits used: 13,351 of 90,000.
