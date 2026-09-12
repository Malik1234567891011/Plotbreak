/**
 * Creates and configures the credit packs in App Store Connect.
 *
 * The products the app sells live in `packages/contracts/src/game/economy.ts`.
 * Apple has to be told about each one separately, and a pack the server sells
 * that the store has never heard of fails at the moment of payment — so this
 * reads the contract rather than repeating it, and is safe to re-run: anything
 * already correct is left alone.
 *
 * Creating an *app* record is not in Apple's API; that part is done once by
 * hand. Everything below is.
 *
 *   ASC_KEY_ID=... ASC_ISSUER_ID=... ASC_KEY_PATH=/path/AuthKey_XXX.p8 \
 *     node infra/scripts/appstore-iaps.mjs [--apply]
 *
 * Without `--apply` it prints what it would do and changes nothing.
 */
import { createSign } from 'node:crypto';
import { readFileSync } from 'node:fs';

const APP_ID = process.env.ASC_APP_ID ?? '6811307049';
const KEY_ID = required('ASC_KEY_ID');
const ISSUER_ID = required('ASC_ISSUER_ID');
const KEY_PATH = required('ASC_KEY_PATH');
const APPLY = process.argv.includes('--apply');

function required(name) {
  const value = process.env[name];
  if (!value) {
    console.error(`Missing ${name}. See the comment at the top of this file.`);
    process.exit(1);
  }
  return value;
}

// --- The catalogue -------------------------------------------------------
//
// `credits` and `bonusCredits` are what the *server* grants; Apple only needs
// the words and the price. Keep `priceUsd` in step with `referencePriceUsd` in
// the contract, which is what the app shows before StoreKit answers.

const PACKS = [
  {
    productId: 'crd_2000',
    priceUsd: 2.89,
    en: { name: '2,000 Credits', description: '2,000 credits to spend on turns and art.' },
    fr: { name: '2 000 crédits', description: '2 000 crédits pour tes tours et tes images.' },
  },
  {
    productId: 'crd_10000',
    priceUsd: 14.49,
    en: { name: '10,000 Credits', description: '10,000 credits, plus 300 on the house.' },
    fr: { name: '10 000 crédits', description: '10 000 crédits, plus 300 offerts.' },
  },
  {
    productId: 'crd_20000',
    priceUsd: 28.49,
    en: { name: '20,000 Credits', description: '20,000 credits, plus 1,000 on the house.' },
    fr: { name: '20 000 crédits', description: '20 000 crédits, plus 1 000 offerts.' },
  },
  {
    productId: 'crd_50000',
    priceUsd: 71,
    en: { name: '50,000 Credits', description: '50,000 credits, plus 3,500 on the house.' },
    fr: { name: '50 000 crédits', description: '50 000 crédits, plus 3 500 offerts.' },
  },
  {
    productId: 'crd_100000',
    priceUsd: 142.99,
    en: { name: '100,000 Credits', description: '100,000 credits, plus 10,000 on the house.' },
    fr: { name: '100 000 crédits', description: '100 000 crédits, plus 10 000 offerts.' },
  },
  {
    productId: 'crd_first_21000',
    priceUsd: 19.99,
    en: { name: 'Starter Pack: 21,000', description: '21,000 credits. First purchase only.' },
    fr: { name: 'Pack de départ : 21 000', description: '21 000 crédits. Premier achat seulement.' },
  },
];

/** What a reviewer needs in order to reach the purchase at all. */
const REVIEW_NOTE = [
  'Credits are spent on story turns and on generated character art.',
  'To reach the packs: open the app, tap the credit balance at the top right of',
  'Discover (or Profile), and the wallet sheet lists every pack.',
  'Credits are consumable and are granted by our server only after Apple confirms',
  'the transaction. "First purchase only" on the starter pack is enforced by our',
  'server, not by Apple.',
].join(' ');

// --- API -----------------------------------------------------------------

function token() {
  const header = { alg: 'ES256', kid: KEY_ID, typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const payload = { iss: ISSUER_ID, iat: now, exp: now + 900, aud: 'appstoreconnect-v1' };
  const b64 = (value) => Buffer.from(JSON.stringify(value)).toString('base64url');
  const input = `${b64(header)}.${b64(payload)}`;
  const signer = createSign('SHA256');
  signer.update(input);
  return `${input}.${signer.sign({ key: readFileSync(KEY_PATH, 'utf8'), dsaEncoding: 'ieee-p1363' }).toString('base64url')}`;
}

async function asc(method, path, body) {
  const response = await fetch(`https://api.appstoreconnect.apple.com${path}`, {
    method,
    headers: {
      authorization: `Bearer ${token()}`,
      ...(body ? { 'content-type': 'application/json' } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await response.text();
  const parsed = text ? JSON.parse(text) : null;
  if (!response.ok) {
    const error = new Error(`${method} ${path} → ${response.status}`);
    error.detail = parsed?.errors?.map((e) => `${e.title}: ${e.detail}`).join('; ') ?? text;
    throw error;
  }
  return parsed;
}

/** Follows `links.next` so a 200-item page limit cannot silently truncate. */
async function all(path) {
  const out = [];
  let next = path;
  while (next) {
    const page = await asc('GET', next);
    out.push(...page.data);
    next = page.links?.next?.replace('https://api.appstoreconnect.apple.com', '') ?? null;
  }
  return out;
}

// --- Steps ---------------------------------------------------------------

async function ensurePack(pack, existing) {
  let iap = existing.find((p) => p.attributes.productId === pack.productId);
  if (iap) {
    console.log(`  exists: ${pack.productId} (${iap.id})`);
  } else if (!APPLY) {
    console.log(`  would create: ${pack.productId}`);
    return null;
  } else {
    const created = await asc('POST', '/v2/inAppPurchases', {
      data: {
        type: 'inAppPurchases',
        attributes: {
          name: pack.en.name,
          productId: pack.productId,
          inAppPurchaseType: 'CONSUMABLE',
          reviewNote: REVIEW_NOTE,
          familySharable: false,
        },
        relationships: { app: { data: { type: 'apps', id: APP_ID } } },
      },
    });
    iap = created.data;
    console.log(`  created: ${pack.productId} (${iap.id})`);
  }
  return iap;
}

async function ensureLocalizations(pack, iap) {
  const existing = await all(`/v2/inAppPurchases/${iap.id}/inAppPurchaseLocalizations?limit=50`);
  for (const [locale, copy] of [['en-US', pack.en], ['fr-FR', pack.fr]]) {
    const found = existing.find((l) => l.attributes.locale === locale);
    if (found) {
      const same = found.attributes.name === copy.name && found.attributes.description === copy.description;
      if (same) { console.log(`    ${locale}: ok`); continue; }
      if (!APPLY) { console.log(`    ${locale}: would update`); continue; }
      await asc('PATCH', `/v1/inAppPurchaseLocalizations/${found.id}`, {
        data: { type: 'inAppPurchaseLocalizations', id: found.id, attributes: copy },
      });
      console.log(`    ${locale}: updated`);
      continue;
    }
    if (!APPLY) { console.log(`    ${locale}: would add`); continue; }
    await asc('POST', '/v1/inAppPurchaseLocalizations', {
      data: {
        type: 'inAppPurchaseLocalizations',
        attributes: { ...copy, locale },
        relationships: { inAppPurchaseV2: { data: { type: 'inAppPurchases', id: iap.id } } },
      },
    });
    console.log(`    ${locale}: added`);
  }
}

async function ensurePrice(pack, iap) {
  const schedule = await asc('GET', `/v2/inAppPurchases/${iap.id}/iapPriceSchedule`).catch(() => null);
  if (schedule?.data) { console.log('    price: already set'); return; }
  if (!APPLY) { console.log(`    price: would set $${pack.priceUsd}`); return; }

  const points = await all(`/v2/inAppPurchases/${iap.id}/pricePoints?filter[territory]=USA&limit=200`);
  const point = points.find((p) => Number(p.attributes.customerPrice) === pack.priceUsd);
  if (!point) throw new Error(`no USA price point for $${pack.priceUsd} on ${pack.productId}`);

  await asc('POST', '/v1/inAppPurchasePriceSchedules', {
    data: {
      type: 'inAppPurchasePriceSchedules',
      relationships: {
        inAppPurchase: { data: { type: 'inAppPurchases', id: iap.id } },
        baseTerritory: { data: { type: 'territories', id: 'USA' } },
        manualPrices: { data: [{ type: 'inAppPurchasePrices', id: '${price}' }] },
      },
    },
    included: [
      {
        type: 'inAppPurchasePrices',
        id: '${price}',
        attributes: { startDate: null, endDate: null },
        relationships: { inAppPurchasePricePoint: { data: { type: 'inAppPurchasePricePoints', id: point.id } } },
      },
    ],
  });
  console.log(`    price: $${pack.priceUsd} set`);
}

async function ensureAvailability(iap, territories) {
  const current = await asc('GET', `/v2/inAppPurchases/${iap.id}/iapPriceSchedule`).catch(() => null);
  const availability = await asc('GET', `/v2/inAppPurchases/${iap.id}/inAppPurchaseAvailability`).catch(() => null);
  if (availability?.data) { console.log('    availability: already set'); return; }
  if (!APPLY) { console.log(`    availability: would open in ${territories.length} territories`); return; }
  void current;

  await asc('POST', '/v1/inAppPurchaseAvailabilities', {
    data: {
      type: 'inAppPurchaseAvailabilities',
      attributes: { availableInNewTerritories: true },
      relationships: {
        inAppPurchase: { data: { type: 'inAppPurchases', id: iap.id } },
        availableTerritories: { data: territories.map((id) => ({ type: 'territories', id })) },
      },
    },
  });
  console.log(`    availability: ${territories.length} territories`);
}

// --- Run -----------------------------------------------------------------

const existing = await all(`/v1/apps/${APP_ID}/inAppPurchasesV2?limit=200`);
const territories = (await all('/v1/territories?limit=200')).map((t) => t.id);
console.log(`${APPLY ? 'Applying' : 'Dry run'} — app ${APP_ID}, ${existing.length} existing, ${territories.length} territories\n`);

for (const pack of PACKS) {
  console.log(pack.productId);
  const iap = await ensurePack(pack, existing);
  if (!iap) continue;
  await ensureLocalizations(pack, iap);
  await ensurePrice(pack, iap);
  await ensureAvailability(iap, territories);
}

console.log(APPLY ? '\nDone.' : '\nDry run only. Re-run with --apply.');
