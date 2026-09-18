// The upload path, including that a real photo is moderated and that EXIF is
// gone afterwards. The "photo" is generated locally; nothing here uploads
// anything from a real camera roll.
import sharp from 'sharp';

const BASE = 'http://localhost:4000';
const H = { authorization: `Bearer guest_upl_${crypto.randomUUID().slice(0,8)}`, 'content-type': 'application/json' };
const call = async (m, p, b) => {
  const r = await fetch(BASE + p, { method: m, headers: b === undefined ? { authorization: H.authorization } : H, body: b === undefined ? undefined : JSON.stringify(b) });
  const t = await r.text();
  return { status: r.status, body: t ? JSON.parse(t) : null };
};
let pass = 0, fail = 0;
const ok = (n, c, note='') => { c ? pass++ : fail++; console.log(`  ${c ? '✓' : '✗'} ${n}${note ? ` — ${note}` : ''}`); };

// A benign picture, with GPS EXIF deliberately attached so the strip is testable.
const plain = await sharp({ create: { width: 1400, height: 900, channels: 3, background: { r: 40, g: 70, b: 120 } } })
  .jpeg().toBuffer();
const withExif = await sharp(plain).withMetadata({
  exif: { IFD0: { Copyright: 'Malik', Artist: 'Malik' }, GPS: { GPSLatitudeRef: 'N' } },
}).jpeg().toBuffer();
console.log(`  (test image ${(withExif.length/1024).toFixed(0)}KB, EXIF in: ${JSON.stringify((await sharp(withExif).metadata()).exif !== undefined)})`);

const draft = await call('POST', '/v1/create/drafts', {});
const id = draft.body.draft.draftId;

const up = await call('POST', `/v1/create/drafts/${id}/image`, { kind: 'cover', data: withExif.toString('base64') });
ok('a benign picture is accepted', up.status === 200, `HTTP ${up.status} ${up.body?.code ?? ''}`);
const url = up.body?.url;
ok('it comes back as a media url', typeof url === 'string' && url.startsWith('/media/uploads/'), url);
ok('the url carries no user id', !!url && !url.includes(H.authorization.replace('Bearer ','')));
ok('the draft records it', up.body?.draft?.coverImage === url);

if (url) {
  const served = await fetch(BASE + url);
  ok('it is served back', served.ok, `HTTP ${served.status}`);
  const bytes = Buffer.from(await served.arrayBuffer());
  const meta = await sharp(bytes).metadata();
  ok('EXIF is gone', meta.exif === undefined, meta.exif ? 'STILL PRESENT' : 'stripped');
  ok('it was resized to card shape', meta.width === 1005 && meta.height === 1490, `${meta.width}x${meta.height}`);
  ok('and re-encoded as jpeg', meta.format === 'jpeg', String(meta.format));
  ok('and is much smaller', bytes.length < withExif.length, `${(bytes.length/1024).toFixed(0)}KB`);
}

// A patch must not be able to set or clear an image.
const sneak = await call('PATCH', `/v1/create/drafts/${id}`, { coverImage: 'https://evil.example/x.jpg' });
ok('a patch cannot set a cover url', sneak.status === 400 || sneak.body?.draft?.coverImage === url, `HTTP ${sneak.status}`);

const clear = await call('DELETE', `/v1/create/drafts/${id}/image?kind=cover`);
ok('removing it works', clear.status === 200 && clear.body?.draft?.coverImage === null);

// Rubbish and oversize.
const notImage = await call('POST', `/v1/create/drafts/${id}/image`, { kind: 'cover', data: Buffer.from('x'.repeat(4096)).toString('base64') });
ok('a non-image is refused', notImage.status === 415, `HTTP ${notImage.status}`);
const huge = await call('POST', `/v1/create/drafts/${id}/image`, { kind: 'cover', data: 'A'.repeat(14 * 1024 * 1024) });
ok('an oversize upload is refused before decoding', huge.status === 413, `HTTP ${huge.status}`);
const noBody = await call('POST', `/v1/create/drafts/${id}/image`, { kind: 'cover', data: '' });
ok('an empty upload is refused', noBody.status === 400, `HTTP ${noBody.status}`);
const noPerson = await call('POST', `/v1/create/drafts/${id}/image`, { kind: 'character', index: 7, data: plain.toString('base64') });
ok('a portrait for nobody is refused', noPerson.status === 400, `HTTP ${noPerson.status}`);

console.log(`\n${pass}/${pass+fail} passed.`);
if (fail) process.exitCode = 1;
