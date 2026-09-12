/**
 * Uploads the App Store screenshots for every localization.
 *
 * Sources `docs/appstore-screenshots/*.png` for English and
 * `docs/appstore-screenshots/fr/*.png` for French, in filename order, which is
 * the order they appear on the product page. See the README next to them for
 * how they are built.
 *
 *   ASC_KEY_ID=... ASC_ISSUER_ID=... ASC_KEY_PATH=/path/AuthKey_XXX.p8 \
 *     node infra/scripts/appstore-screenshots.mjs [--apply] [--replace]
 *
 * Without `--apply` it prints what it would upload. With `--replace` it clears
 * the existing set first, which is how you correct a screenshot rather than
 * ending up with both.
 */
import { createSign, createHash } from 'node:crypto';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../..');
const APP_ID = process.env.ASC_APP_ID ?? '6811307049';
const APPLY = process.argv.includes('--apply');
const REPLACE = process.argv.includes('--replace');
const KEY_ID = req('ASC_KEY_ID'), ISSUER_ID = req('ASC_ISSUER_ID'), KEY_PATH = req('ASC_KEY_PATH');

function req(name) {
  const v = process.env[name];
  if (!v) { console.error(`Missing ${name}.`); process.exit(1); }
  return v;
}

/**
 * Where each localization's panels live.
 *
 * The French set is not the English one relabelled: the headlines are French
 * and the app underneath was captured in French, because a store page whose
 * screenshots are in another language is telling the reader the app is too.
 */
const SETS = [
  { locale: 'en-US', dir: 'docs/appstore-screenshots' },
  { locale: 'fr-FR', dir: 'docs/appstore-screenshots/fr' },
];

/**
 * 1320 × 2868 is the 6.9-inch iPhone. Apple has called that slot different
 * things over time, so the first one the API accepts wins rather than this
 * guessing right.
 */
const DISPLAY_TYPES = ['APP_IPHONE_69', 'APP_IPHONE_67'];

function token() {
  const h = { alg: 'ES256', kid: KEY_ID, typ: 'JWT' };
  const n = Math.floor(Date.now() / 1000);
  const p = { iss: ISSUER_ID, iat: n, exp: n + 900, aud: 'appstoreconnect-v1' };
  const b = (v) => Buffer.from(JSON.stringify(v)).toString('base64url');
  const i = `${b(h)}.${b(p)}`;
  const s = createSign('SHA256');
  s.update(i);
  return `${i}.${s.sign({ key: readFileSync(KEY_PATH, 'utf8'), dsaEncoding: 'ieee-p1363' }).toString('base64url')}`;
}

async function asc(method, path, body) {
  const r = await fetch(`https://api.appstoreconnect.apple.com${path}`, {
    method,
    headers: { authorization: `Bearer ${token()}`, ...(body ? { 'content-type': 'application/json' } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  const t = await r.text();
  const j = t ? JSON.parse(t) : null;
  if (!r.ok) {
    const e = new Error(`${method} ${path} → ${r.status}`);
    e.status = r.status;
    e.detail = j?.errors?.map((x) => `${x.title}: ${x.detail}`).join('; ') ?? t;
    throw e;
  }
  return j;
}

async function upload(setId, file, name) {
  const bytes = readFileSync(file);
  const reserved = await asc('POST', '/v1/appScreenshots', {
    data: {
      type: 'appScreenshots',
      attributes: { fileSize: bytes.length, fileName: name },
      relationships: { appScreenshotSet: { data: { type: 'appScreenshotSets', id: setId } } },
    },
  });
  for (const op of reserved.data.attributes.uploadOperations) {
    const headers = Object.fromEntries((op.requestHeaders ?? []).map((h) => [h.name, h.value]));
    const put = await fetch(op.url, { method: op.method, headers, body: bytes.subarray(op.offset, op.offset + op.length) });
    if (!put.ok) throw new Error(`chunk upload failed: ${put.status}`);
  }
  await asc('PATCH', `/v1/appScreenshots/${reserved.data.id}`, {
    data: {
      type: 'appScreenshots',
      id: reserved.data.id,
      attributes: { uploaded: true, sourceFileChecksum: createHash('md5').update(bytes).digest('hex') },
    },
  });
}

// --- Run -----------------------------------------------------------------

const versions = await asc('GET', `/v1/apps/${APP_ID}/appStoreVersions?limit=5`);
const version = versions.data.find((v) => v.attributes.appStoreState === 'PREPARE_FOR_SUBMISSION') ?? versions.data[0];
const locs = (await asc('GET', `/v1/appStoreVersions/${version.id}/appStoreVersionLocalizations`)).data;
console.log(`${APPLY ? 'Applying' : 'Dry run'} — version ${version.attributes.versionString}\n`);

for (const { locale, dir } of SETS) {
  const loc = locs.find((l) => l.attributes.locale === locale);
  if (!loc) { console.log(`${locale}: no localization, skipped`); continue; }

  const files = readdirSync(join(ROOT, dir)).filter((f) => f.endsWith('.png')).sort();
  console.log(`${locale}: ${files.length} panels from ${dir}`);

  const sets = (await asc('GET', `/v1/appStoreVersionLocalizations/${loc.id}/appScreenshotSets`)).data;
  let set = sets.find((s) => DISPLAY_TYPES.includes(s.attributes.screenshotDisplayType));

  if (set && REPLACE) {
    const shots = (await asc('GET', `/v1/appScreenshotSets/${set.id}/appScreenshots`)).data;
    if (!APPLY) {
      console.log(`  would delete ${shots.length} existing`);
    } else {
      for (const s of shots) await asc('DELETE', `/v1/appScreenshots/${s.id}`);
      console.log(`  deleted ${shots.length} existing`);
    }
  } else if (set) {
    const shots = (await asc('GET', `/v1/appScreenshotSets/${set.id}/appScreenshots`)).data;
    if (shots.length > 0) {
      console.log(`  ${shots.length} already uploaded — pass --replace to redo them`);
      continue;
    }
  }

  if (!APPLY) { console.log(`  would upload: ${files.join(', ')}`); continue; }

  if (!set) {
    let created = null;
    for (const displayType of DISPLAY_TYPES) {
      try {
        created = await asc('POST', '/v1/appScreenshotSets', {
          data: {
            type: 'appScreenshotSets',
            attributes: { screenshotDisplayType: displayType },
            relationships: { appStoreVersionLocalization: { data: { type: 'appStoreVersionLocalizations', id: loc.id } } },
          },
        });
        console.log(`  set created (${displayType})`);
        break;
      } catch (error) {
        if (error.status !== 400 && error.status !== 409) throw error;
      }
    }
    if (!created) throw new Error('no display type accepted for 1320x2868');
    set = created.data;
  }

  for (const file of files) {
    await upload(set.id, join(ROOT, dir, file), file);
    console.log(`  uploaded ${file}`);
  }
}

console.log(APPLY ? '\nDone.' : '\nDry run only. Re-run with --apply.');
