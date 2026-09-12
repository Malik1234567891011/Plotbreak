# Crash reporting

There was none. The `Intl.RelativeTimeFormat` bug shipped, killed the story
screen on every phone that opened one, and was found because somebody happened
to be holding a device when it died. Nobody else's crash reached us.

It takes two mechanisms, because one crash class cannot see the other.

---

## JavaScript crashes — ours

`ErrorBoundary` at the app root catches a render throw, shows a screen the
player can retry from, and posts the error to `POST /v1/client-errors`.

```bash
npm run crashes                     # last 24h, grouped
npm run crashes -- --hours=168      # the week
npm run crashes -- --stack fp_3a1b  # one group, with a trace
```

Three decisions worth knowing:

- **The endpoint takes no auth.** The crash that matters most is during
  onboarding, where there is no account yet. Requiring a token would have
  hidden exactly the failures worth knowing about. It has its own rate-limit
  budget (`diagnostics`, 20/min) so a relaunch loop cannot flood the table or
  eat a player's write allowance.
- **Ranked by devices, not rows.** One handset stuck relaunching into the same
  throw writes two hundred rows of a bug nobody else will hit. It must not
  outrank something breaking once each for thirty different people.
- **Fingerprint is the message plus the first three frames.** Deeper frames
  differ between two occurrences of one bug, so hashing the whole stack makes
  every crash unique and the grouping useless.

---

## Native crashes — Apple's

**The boundary cannot catch these, and it is the class that has actually hurt
us.** A Hermes segfault takes the process down before React knows anything
happened; no JavaScript runs, so nothing posts. The `Intl` crash would not have
produced a single row in `client_errors`.

Those come from **App Store Connect → your app → Crashes**, which is free and
automatic — but only symbolised if the build uploaded its dSYMs. With EAS that
is on by default; a local Xcode archive needs "Upload Symbols" left checked.
This is on Omar's list in `AppleForOmar.md`.

So: a crash nobody can explain and that wrote no row is probably native. Look
in App Store Connect before assuming the reporting is broken.

---

## What this is not

Not Sentry. Sentry would cover both halves in one place with breadcrumbs and
release tracking, and is the right answer at a scale where somebody is on call.
At two people it is another vendor, another key in the environment and another
SDK in the bundle, to replace two things that already work. The upgrade path is
clean — `reportClientError` is one function and one route.

There is no alerting. Nothing pages anybody; you run `npm run crashes`. That is
a real gap and the honest mitigation is to run it after every release rather
than pretend otherwise.
