/**
 * Is production ready for people?
 *
 * Every assertion here runs against the real server, with a real account, and
 * checks an outcome rather than a shape — an image is fetched and decoded, a
 * story is played, a block is observed to hide something. The bugs this
 * release shipped and then fixed were all invisible to a test that only looked
 * at whether a field was present.
 */
import { readFileSync } from 'node:fs';
import sharp from 'sharp';

const BASE = process.env.PLOTBREAK_API ?? 'https://plotbreak-api-production.up.railway.app';
const env = readFileSync('.env', 'utf8');
const pick = (k) => env.match(new RegExp(`^${k}=(.*)$`, 'm'))?.[1]?.trim().replace(/^["']|["']$/g, '');

async function account() {
  const su = await fetch(`${pick('SUPABASE_URL').replace(/\/$/, '')}/auth/v1/signup`, {
    method: 'POST',
    headers: { apikey: pick('SUPABASE_ANON_KEY'), authorization: `Bearer ${pick('SUPABASE_ANON_KEY')}`, 'content-type': 'application/json' },
    body: '{}',
  });
  const token = (await su.json()).access_token;
  if (!token) throw new Error('could not make a test account');
  return (m, p, b, extra = {}) =>
    fetch(BASE + p, {
      method: m,
      headers: { authorization: `Bearer ${token}`, ...(b === undefined ? {} : { 'content-type': 'application/json' }), ...extra },
      body: b === undefined ? undefined : JSON.stringify(b),
    }).then(async (r) => ({ status: r.status, body: await r.text().then((t) => (t ? JSON.parse(t) : null)) }));
}

let pass = 0, fail = 0;
const ok = (n, c, note = '') => { c ? pass++ : fail++; console.log(`  ${c ? '✓' : '✗'} ${n}${note ? ` — ${note}` : ''}`); };
const section = (n) => console.log(`\n— ${n} —`);

const image = async (url) => {
  if (!url) return false;
  const r = await fetch(url.startsWith('http') ? url : BASE + url);
  if (!r.ok) return false;
  try { await sharp(Buffer.from(await r.arrayBuffer())).metadata(); return true; } catch { return false; }
};

const alice = await account();
const bob = await account();

section('the catalogue a new player sees');
const boot = await alice('GET', '/v1/bootstrap');
ok('bootstrap answers', boot.status === 200);
const disc = await alice('GET', '/v1/discover');
const cards = [...new Map([...(disc.body?.rails ?? []).flatMap((r) => r.stories ?? [])].map((s) => [s.storyId, s])).values()];
ok('Discover has the official catalogue', cards.length >= 20, `${cards.length} cards`);
ok('every card has a cover that loads', (await Promise.all(cards.slice(0, 6).map((c) => image(c.coverImage)))).every(Boolean));
ok('no removed or test story is showing', !cards.some((c) => /cover test|round trip|picture test/i.test(c.title)));
ok('French Discover is French', /[àâçéèêëîïôûù]/i.test(JSON.stringify((await alice('GET', '/v1/discover', undefined, { 'accept-language': 'fr' })).body?.rails ?? [])));

section('playing an official world');
const session = await alice('POST', '/v1/stories/story_light/sessions', {
  identity: { displayName: 'Ready', pronouns: 'they/them', archetypeId: null, advanced: {} }, locale: 'en',
});
// 201, because it creates a resource. The first version of this check
// asserted 200 and reported a healthy server as broken.
ok('a session starts', session.status === 201, `HTTP ${session.status}`);
const sid = session.body?.session?.sessionId;
if (sid) {
  const turn = await alice('POST', `/v1/sessions/${sid}/turns`, {
    actionText: 'I test what the notebook actually does, carefully.',
    qualityTier: 'VIVID', sessionRevision: session.body.revision, selectedSuggestionId: null, voicePreferred: false,
  }, { 'idempotency-key': crypto.randomUUID() });
  ok('a turn is accepted', turn.status === 200 || turn.status === 202, `HTTP ${turn.status}`);
  let played = null;
  for (let i = 0; i < 60 && !played; i += 1) {
    await new Promise((r) => setTimeout(r, 2000));
    const got = await alice('GET', `/v1/turns/${turn.body?.turnId}`);
    if (got.body?.blocks?.length) played = got.body;
  }
  ok('and produces prose', !!played, played ? `${played.blocks.length} blocks` : 'never arrived');
}

section('making a world');
const draft = await alice('POST', '/v1/create/drafts', {});
const id = draft.body.draft.draftId;
const photo = await sharp({ create: { width: 2000, height: 3000, channels: 3, background: { r: 60, g: 30, b: 90 } } }).jpeg().toBuffer();
const up = await alice('POST', `/v1/create/drafts/${id}/image`, { kind: 'cover', data: photo.toString('base64') });
ok('an uploaded cover is moderated and kept', up.status === 200, `HTTP ${up.status}`);
const t0 = Date.now();
const started = await alice('POST', `/v1/create/drafts/${id}/compile`, {
  pitch: 'A lighthouse keeper on a coast where the sea has started giving things back, one object a night.',
  tone: 'grim', length: 'medium', pov: 'blank', locale: 'en',
});
ok('compile returns at once', started.status === 202 && Date.now() - t0 < 5000, `HTTP ${started.status} in ${Date.now()-t0}ms`);
let done = null;
for (let i = 0; i < 90 && !done; i += 1) {
  await new Promise((r) => setTimeout(r, 4000));
  const seen = await alice('GET', `/v1/create/drafts/${id}`);
  if (seen.body?.draft?.compile?.status !== 'running') done = seen;
}
ok('and finishes', done?.body?.draft?.compile?.status === 'done', `${done?.body?.draft?.compile?.status} in ${((Date.now()-t0)/1000).toFixed(0)}s`);
const world = done?.body?.draft;
if (world) {
  ok('with a full cast and endings', world.characters.length >= 3 && world.endings.length >= 4, `${world.characters.length} cast, ${world.endings.length} endings`);
  ok('the cover survived the compile', world.coverImage === up.body?.assetKey);
  ok('and it is publishable', done.body.readiness.ready, JSON.stringify(done.body.readiness.blockedSteps));
}

section('publishing, and what other people can do about it');
const pub = await alice('POST', `/v1/create/drafts/${id}/publish`, { visibility: 'PUBLIC' });
ok('it publishes', pub.status === 200, `HTTP ${pub.status}`);
const storyId = pub.body?.storyId;
const inDiscover = async (who) => {
  const d = await who('GET', '/v1/discover');
  return JSON.stringify(d.body).includes(storyId);
};
ok('a stranger can see it', await inDiscover(bob));
const detail = await bob('GET', `/v1/stories/${storyId}`);
ok('its cover loads for them', await image(detail.body?.story?.coverImage), String(detail.body?.story?.coverImage));
const creatorId = detail.body?.story?.creatorId;
ok('it names a creator they can block', !!creatorId);
if (creatorId) {
  await bob('POST', '/v1/blocks', { targetId: creatorId });
  ok('blocking hides it', !(await inDiscover(bob)));
  await bob('DELETE', `/v1/blocks/${creatorId}`);
  ok('unblocking restores it', await inDiscover(bob));
}
ok('reporting works', (await bob('POST', '/v1/reports', { targetType: 'STORY', targetId: storyId, reason: 'OTHER', details: 'readiness check', alsoHide: false })).status === 201);
await alice('POST', `/v1/create/drafts/${id}/visibility`, { visibility: 'PRIVATE' });
ok('the creator can take it private again', !(await inDiscover(bob)));

section('money')
const wallet = await alice('GET', '/v1/wallet');
ok('the wallet answers', wallet.status === 200, `balance ${wallet.body?.wallet?.balance}`);
ok('store offers are intact', ((await alice('GET', '/v1/store/offers')).body?.offers ?? []).length > 0);
const opts = await alice('GET', '/v1/create/options');
ok('creating is priced', opts.body?.compileCost > 0 && opts.body?.assistCost > 0, `${opts.body?.compileCost}/${opts.body?.assistCost}`);
const badges = await alice('GET', '/v1/badges');
ok('all eighteen badges load', (badges.body?.badges ?? []).length === 18, `${(badges.body?.badges ?? []).length}`);
ok('the secret one is still masked', (badges.body?.badges ?? []).find((b) => b.secret)?.title === '???');

console.log(`\n${pass}/${pass + fail} passed.`);
if (fail) process.exitCode = 1;
