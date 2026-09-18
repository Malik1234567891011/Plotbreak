// Does an uploaded cover actually reach a player's screen?
//
// The bug this exists to stop: `coverImage` is an asset *key* everywhere in
// the product — `localizeStory` appends `.fr`, `resolveAssetUrl` prefixes the
// CDN, `/media/*` appends an extension — and an upload that stored its own URL
// instead came out as `<cdn>//media/…/cover.jpg.en` and rendered as nothing.
// So this follows the whole path and fetches the bytes at the end of it.
import { readFileSync } from 'node:fs';
import sharp from 'sharp';

const BASE = process.env.PLOTBREAK_API ?? 'http://localhost:4000';
const env = (() => { try { return readFileSync('.env', 'utf8'); } catch { return ''; } })();
const pick = (k) => env.match(new RegExp(`^${k}=(.*)$`, 'm'))?.[1]?.trim().replace(/^["']|["']$/g, '');

let token = `guest_cover_${crypto.randomUUID().slice(0, 8)}`;
if (BASE.startsWith('https') && pick('SUPABASE_URL')) {
  const su = await fetch(`${pick('SUPABASE_URL').replace(/\/$/, '')}/auth/v1/signup`, {
    method: 'POST',
    headers: { apikey: pick('SUPABASE_ANON_KEY'), authorization: `Bearer ${pick('SUPABASE_ANON_KEY')}`, 'content-type': 'application/json' },
    body: '{}',
  });
  token = (await su.json()).access_token ?? token;
}
const H = { authorization: `Bearer ${token}`, 'content-type': 'application/json' };
const call = async (m, p, b, extra = {}) => {
  const r = await fetch(BASE + p, { method: m, headers: { ...(b === undefined ? { authorization: H.authorization } : H), ...extra }, body: b === undefined ? undefined : JSON.stringify(b) });
  const t = await r.text();
  return { status: r.status, body: t ? JSON.parse(t) : null };
};
let pass = 0, fail = 0;
const ok = (n, c, note = '') => { c ? pass++ : fail++; console.log(`  ${c ? '✓' : '✗'} ${n}${note ? ` — ${note}` : ''}`); };

const fetchable = async (url) => {
  if (!url) return { ok: false, why: 'no url' };
  const absolute = url.startsWith('http') ? url : BASE + url;
  const r = await fetch(absolute);
  if (!r.ok) return { ok: false, why: `HTTP ${r.status} ${absolute}` };
  const bytes = Buffer.from(await r.arrayBuffer());
  try {
    const meta = await sharp(bytes).metadata();
    return { ok: true, why: `${meta.format} ${meta.width}x${meta.height}` };
  } catch {
    return { ok: false, why: 'not an image' };
  }
};

const draft = await call('POST', '/v1/create/drafts', {});
const id = draft.body.draft.draftId;

const photo = await sharp({ create: { width: 1800, height: 2400, channels: 3, background: { r: 90, g: 40, b: 120 } } }).jpeg().toBuffer();
const up = await call('POST', `/v1/create/drafts/${id}/image`, { kind: 'cover', data: photo.toString('base64') });
ok('cover uploads', up.status === 200, `HTTP ${up.status}`);
const key = up.body?.assetKey;
ok('the draft stores a key, not a url', typeof key === 'string' && !key.includes('/media/') && !key.endsWith('.jpg'), String(key));
ok('the draft field matches it', up.body?.draft?.coverImage === key);
ok('the upload response url fetches', (await fetchable(up.body?.url)).ok, (await fetchable(up.body?.url)).why);

// Fill it in enough to publish, then follow the cover through every projection.
await call('PATCH', `/v1/create/drafts/${id}`, {
  title: 'The Cover Test',
  fantasyLabel: 'See whether the picture arrives',
  hook: 'A story that exists to prove a cover renders.',
  premise: Array.from({ length: 70 }, (_, i) => `word${i}`).join(' '),
  toneGuide: 'Plain.',
  characters: [
    { id: 'a', name: 'Ana', role: 'The first', cardBlurb: 'Is here.' },
    { id: 'b', name: 'Bo', role: 'The second', cardBlurb: 'Also here.' },
  ],
  places: [{ id: 'p', name: 'The room', description: 'Four walls.' }],
  startingPlaceId: 'p',
  opening: Array.from({ length: 40 }, (_, i) => `beat${i}`).join(' '),
  endings: [{ id: 'e', name: 'It ended', rarity: 'COMMON', minTurn: 10, condition: 'Time passed.', epilogue: '', hint: '' }],
  description: 'A test.',
  tags: ['drama'],
});
// A portrait too, since it travels the same road.
const portrait = await call('POST', `/v1/create/drafts/${id}/image`, { kind: 'character', index: 0, data: photo.toString('base64') });
ok('a portrait uploads', portrait.status === 200, `HTTP ${portrait.status}`);

const published = await call('POST', `/v1/create/drafts/${id}/publish`, { visibility: 'PUBLIC' });
ok('it publishes', published.status === 200, `HTTP ${published.status} ${JSON.stringify(published.body?.details ?? '')}`);
const storyId = published.body?.storyId;

for (const locale of ['en', 'fr']) {
  const detail = await call('GET', `/v1/stories/${storyId}`, undefined, { 'accept-language': locale });
  const cover = detail.body?.story?.coverImage;
  const got = await fetchable(cover);
  ok(`the story page cover renders (${locale})`, got.ok, got.why || cover);
  const castPortrait = (detail.body?.cast ?? [])[0]?.portrait;
  const gotPortrait = await fetchable(castPortrait);
  ok(`the cast portrait renders (${locale})`, gotPortrait.ok, gotPortrait.why || String(castPortrait));
}

const disc = await call('GET', '/v1/discover');
const card = (disc.body?.rails ?? []).flatMap((r) => r.stories ?? []).find((s) => s.storyId === storyId);
ok('it appears in Discover', !!card);
const cardCover = await fetchable(card?.coverImage);
ok('the Discover card cover renders', cardCover.ok, cardCover.why || String(card?.coverImage));

const titles = await call('GET', '/v1/create/titles');
const mine = (titles.body?.titles ?? []).find((t) => t.draftId === id);
ok('the creator dashboard carries the cover', !!mine?.coverImage, String(mine?.coverImage));

console.log(`\n${pass}/${pass + fail} passed.`);
if (fail) process.exitCode = 1;
