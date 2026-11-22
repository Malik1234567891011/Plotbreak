# PixAI cover bake-off (2026-11-21)

Test only. Nothing installed, no production writes, no MEDIA_EPOCH bump.
Board: https://claude.ai/artifact/81xKYkBXAGZHbBN46CuSRJ (private)

## Recommendation

Keep the current pipeline. Do not move covers to PixAI.

- **Looks:** the shipped covers win 4 of 5 at thumbnail size. They are glossier,
  higher contrast and closer to the ooc.ai key-visual bar. PixAI reads softer and
  paler, closer to a clean illustration than a poster.
- **Titles:** 8 of 8 PixAI covers spelled the title right and legibly. 3 Flash
  takes added small stray marks (hearts, a fake subtitle, badge gibberish).
- **Where PixAI wins:** brief fidelity on a busy cast (The Fracture Crown got
  every detail) and on-model franchise faces (Itachi). 0 filter refusals.
- **Price is a wash** against OpenAI gpt-image, and the bot needs a paid
  membership key to call PixAI unattended. OpenAI is already wired.

If someone wants a second round: try PixAI's own style recipes (e.g. "Glossy
Glass Anime") and a lighting LoRA on 2 stories. That costs about 4,000 to 9,000
credits, which the daily check-in refills.

## Scope as run

The user changed scope mid-task: no Dare runs, no gpt-image runs. PixAI covers
were made in the pixai.art web app on the user's account (no API key exists).
The comparison column is the cover already on the shelf, not re-run.

| Story | Shipped cover (model) | PixAI Tsubaki.3 | PixAI Tsubaki.3 Flash |
|---|---|---|---|
| Good Morning, Husband (romance) | gpt-image-2.6-sunburst, v5 | yes | yes |
| Hush House (horror romance) | gpt-image-2.6-sunburst, v5 | not run (credits) | yes |
| Zero Throne (mecha action) | Dare seedream-5-pro, v4 | not run (credits) | yes |
| Itachi (franchise, filter test) | gpt-image-2 via Dare, v4 | yes | yes |
| The Fracture Crown (`story_user_4082f1b0c7f4430c`, player-made) | in-app auto path (OpenAI gpt-image) | yes | yes |

Shipped files are the exact shelf assets (`infra/seed/assets/<story>/cover.webp`,
and the prod media URL for the player story). Briefs: `prompts/*.txt`, the
approved shipped prompts verbatim; `fracture_crown.txt` written in the same
shape from the story's DB definition. Same prompt for every PixAI model.

## Numbers

| Model | Credits / cover (web) | $ / cover | Seconds | Refusals | Title | Unattended API |
|---|---|---|---|---|---|---|
| PixAI Tsubaki.3 (Pro) | 4,400 = 3,400 + 1,000 High Priority | $0.11 member, $0.15 with priority | 28–97 (3 runs) | 0/3 | 3/3 clean | Only with key |
| PixAI Tsubaki.3 Flash | 2,100 = 1,100 + 1,000 High Priority | $0.04 member, $0.07 with priority | 18–54 (5 runs) | 0/5 | 5/5 right, 3 stray marks | Only with key |
| OpenAI gpt-image (shipped) | n/a | ~$0.03–0.17 (plotbreak-fd's figure) | not re-run | — | yes | Yes, wired |
| Dare seedream / gpt-image-2 (shipped) | Dare credits | not priced | not re-run | — | yes | No: login-bound unofficial MCP |

Full log: `runlog.tsv`. Seconds are a window (last poll before done, first poll
after), all at High Priority, one task at a time.

### Deriving $/cover

- Memberships (monthly, USD, read off the pixai.art modal): Starter $9.99 =
  300,000 credits/month; Plus $29.99 = 1,000,000; Premium $49.99 = 2,000,000.
  Annual: Starter $95.88, Plus $275.88, Premium $431.88.
- Starter rate = $0.0333 per 1,000 credits. Premium = $0.025 per 1,000.
- Members get Turbo Mode (~52 s quoted) with no surcharge, so the 1,000-credit
  High Priority fee drops out: Flash 1,100 credits = **$0.037**, Tsubaki.3 3,400
  = **$0.113** at Starter rate ($0.028 / $0.085 at Premium).
- Floor: $9.99/month to hold a self-serve key. Starter covers ~270 Flash or ~88
  Tsubaki.3 covers a month.
- Non-members: only Low Priority is free of surcharge, quoted at ~88 minutes.
- Unverified: these are web-app charges. The API publishes no price list and
  reports the charge per task as `paidQuota`; one paid API call would confirm.
- Free credits: daily web check-in (7 consecutive days = 108,000 total) plus
  1,000-credit quests. Human-only; a bot cannot collect them.
- Resolution barely moves price (Tsubaki.3: XL 4,400, L 4,200). 4 images cost
  about 2× one image.

Total spend for this test: 23,700 free credits (balance 25,000 → 1,300), $0.

## PixAI API facts (platform.pixai.art docs)

- Official REST API at `api.pixai.art`, Bearer key, async: create task, poll
  `GET /v2/task/{id}` (no faster than every 1.5 s) or a webhook.
- Key: join a membership and create it at pixai.art/profile/edit/api (instant),
  or email api@withpixai.art (manual review, up to 5 business days). Docs do not
  say a credit-pack-only account can create a key.
- Models by `modelVersionId`: Tsubaki.3 `2024383379556065549` (flagship, "readable
  text in images"), Tsubaki.2 `1983308862240288769`, Haruka v2 (SDXL)
  `1861558740588989558`, Hoshino v2 `1954632828118619567`. LoRAs: up to 15, 3
  without membership.
- 2:3 supported (web XL = 1152×1744). Max 10 waiting tasks per account.
  Moderation error `422 NSFW_PROMPT_REJECTED`. Outputs are not kept forever.

## Per-story notes

- **Good Morning, Husband:** shipped wins (warmer, glossier, stronger logo).
  Flash added two stray hearts around the comma.
- **Hush House:** shipped wins, Flash close. Flash added a tiny fake subtitle
  above HOUSE and invented text on the can.
- **Zero Throne:** shipped wins clearly. Flash drew the mech standing, not
  kneeling, in flat light, with gibberish badge text.
- **Itachi:** no refusal. PixAI drew the franchise look closely, including the
  village headband symbol the brief asked to have scratched out (IP exposure).
  Shipped has the better mood.
- **The Fracture Crown:** PixAI's best. Tsubaki.3 placed every brief element.
  The shipped cover came from the auto path's own prompt, so it is not a
  same-brief comparison.

## Fairness caveats

- Shipped covers were picked from retries; PixAI got one take each.
- Prompts were written for GPT and Seedream, not tuned for PixAI.
- PixAI recipes and LoRAs were not tried. Haruka v2 was skipped: it cannot paint
  titles, and the nano-banana-2 title pass was out of scope (no Dare).

## Files

- `pixai/<story>.<tsubaki3|flash>.webp`: full-size PixAI outputs (1152×1744).
- `shipped/<story>.webp`: the shelf covers as they are today.
- `prompts/<story>.txt`: the brief each model got.
- `runlog.tsv`: credits, seconds, refusals and task ids per generation.
