import { readFileSync } from 'node:fs';
import sharp from 'sharp';
const BASE = 'https://plotbreak-api-production.up.railway.app';
const env = readFileSync('.env', 'utf8');
const pick = (k) => env.match(new RegExp(`^${k}=(.*)$`, 'm'))?.[1]?.trim().replace(/^["']|["']$/g, '');
const su = await fetch(`${pick('SUPABASE_URL').replace(/\/$/, '')}/auth/v1/signup`, {
  method: 'POST',
  headers: { apikey: pick('SUPABASE_ANON_KEY'), authorization: `Bearer ${pick('SUPABASE_ANON_KEY')}`, 'content-type': 'application/json' },
  body: '{}',
});
const token = (await su.json()).access_token;
const H = { authorization: `Bearer ${token}`, 'content-type': 'application/json' };
const call = async (m, p, b) => {
  const r = await fetch(BASE + p, { method: m, headers: b === undefined ? { authorization: H.authorization } : H, body: b === undefined ? undefined : JSON.stringify(b) });
  const t = await r.text();
  return { status: r.status, body: t ? JSON.parse(t) : null };
};
let pass = 0, fail = 0;
const ok = (n, c, note='') => { c ? pass++ : fail++; console.log(`  ${c ? '✓' : '✗'} ${n}${note ? ` — ${note}` : ''}`); };

const draft = await call('POST', '/v1/create/drafts', {});
const id = draft.body.draft.draftId;
ok('a draft starts', draft.status === 200);
ok('it carries compile state', draft.body.draft.compile?.status === 'idle', draft.body.draft.compile?.status);

// Uploads.
const photo = await sharp({ create: { width: 2400, height: 1600, channels: 3, background: { r: 30, g: 60, b: 110 } } })
  .withMetadata({ exif: { GPS: { GPSLatitudeRef: 'N' } } }).jpeg().toBuffer();
const up = await call('POST', `/v1/create/drafts/${id}/image`, { kind: 'cover', data: photo.toString('base64') });
ok('an upload is accepted and moderated', up.status === 200, `HTTP ${up.status} ${up.body?.code ?? ''}`);
if (up.body?.url) {
  const served = await fetch(BASE + up.body.url);
  ok('and served back', served.ok, `HTTP ${served.status}`);
  if (served.ok) {
    const meta = await sharp(Buffer.from(await served.arrayBuffer())).metadata();
    ok('EXIF stripped in production', meta.exif === undefined, meta.exif ? 'STILL PRESENT' : 'stripped');
    ok('resized to card shape', meta.width === 1005 && meta.height === 1490, `${meta.width}x${meta.height}`);
  }
}

// Async compile: accepted immediately, finishes on its own.
const t0 = Date.now();
const started = await call('POST', `/v1/create/drafts/${id}/compile`, {
  pitch: 'A night ferry that only runs in fog, and a deckhand who has started recognising the passengers.',
  tone: 'tense', length: 'medium', pov: 'blank', locale: 'en',
});
ok('compile is accepted, not awaited', started.status === 202, `HTTP ${started.status} after ${Date.now()-t0}ms`);
ok('and marked running', started.body?.draft?.compile?.status === 'running');
const second = await call('POST', `/v1/create/drafts/${id}/compile`, { pitch: 'A night ferry that only runs in fog, and a deckhand who has started recognising the passengers.' });
ok('a second tap is refused, not charged twice', second.status === 409, `HTTP ${second.status}`);

let done = null;
for (let i = 0; i < 90; i += 1) {
  await new Promise((r) => setTimeout(r, 4000));
  const seen = await call('GET', `/v1/create/drafts/${id}`);
  if (seen.body?.draft?.compile?.status !== 'running') { done = seen; break; }
}
ok('it settles', !!done, done ? `${done.body.draft.compile.status} in ${((Date.now()-t0)/1000).toFixed(0)}s` : 'never settled');
if (done?.body?.draft?.compile?.status === 'done') {
  const d = done.body.draft;
  ok('with a world', d.characters.length >= 3 && d.endings.length >= 4, `${d.characters.length} cast, ${d.endings.length} endings`);
  ok('and the upload survived the compile', d.coverImage === up.body?.url);
  ok('ready to publish', done.body.readiness.ready, JSON.stringify(done.body.readiness.blockedSteps));
  console.log(`\n  "${d.title}" — ${d.fantasyLabel}`);
}

console.log(`\n${pass}/${pass+fail} passed.`);
if (fail) process.exitCode = 1;
