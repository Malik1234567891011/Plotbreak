/**
 * The App Store listing copy, and the note the reviewer reads.
 *
 * Kept here rather than typed into App Store Connect so it can be reviewed,
 * corrected and re-applied like anything else. Safe to re-run; it overwrites
 * the fields it owns and touches nothing else.
 *
 *   ASC_KEY_ID=... ASC_ISSUER_ID=... ASC_KEY_PATH=/path/AuthKey_XXX.p8 \
 *     node infra/scripts/appstore-metadata.mjs [--apply]
 *
 * Without `--apply` it prints what it would write and changes nothing.
 *
 * Not set here, deliberately: the price, which is a commercial decision, and
 * the age rating, which is a declaration the account holder makes under their
 * own name. See AppleForOmar.md.
 */
import { createSign } from 'node:crypto';
import { readFileSync } from 'node:fs';

const APP_ID = process.env.ASC_APP_ID ?? '6811307049';
const APPLY = process.argv.includes('--apply');
const KEY_ID = req('ASC_KEY_ID'), ISSUER_ID = req('ASC_ISSUER_ID'), KEY_PATH = req('ASC_KEY_PATH');

function req(name) {
  const v = process.env[name];
  if (!v) { console.error(`Missing ${name}.`); process.exit(1); }
  return v;
}

// --- Copy ----------------------------------------------------------------
//
// Limits Apple enforces: description 4000, keywords 100, promotional text 170,
// subtitle 30. Keywords are comma-separated with no spaces, and must not repeat
// words already in the name or subtitle — those are indexed anyway, so a repeat
// is wasted room.

const EN = {
  description: `In most AI stories, saying a thing makes it true. Type "she forgives me" and she does. Nothing you do matters much, because nothing can fail.

Plotbreak works the other way round.

You type or tap whatever you want. A deterministic game engine — real dice, real difficulty, real consequences — decides what actually happens. Only then is the scene written. The writing never overrules the roll.

So a locked door stays locked until you find a way through it. Someone who does not trust you says no. A fight you pick is a fight you can lose.

TWENTY-THREE WORLDS
An academy with no record of your admission. A ship where nobody knows your name. A marriage four years old to a woman you have just met. A house where you must not open the door at 2:13 a.m. Each has its own cast, its own rules, and its own way of going wrong.

BE WHOEVER YOU LIKE
Choose your name and your pronouns, pick how you got here, or write your own past and let the world take it as fact.

THE WORLD REMEMBERS
Promises, grudges, injuries and favours are recorded state, not a summary that might be forgotten. Open the world sheet for your relationships, inventory, quests, the map, and a timeline of what has actually happened. If it gets something wrong, correct it.

ROLLED, NOT DECIDED
Before a risky attempt you are told the odds in plain words. Some attempts succeed at a price. Some fail in a way that opens something else.

START FREE
Play any world without an account. Credits arrive daily and buy turns and character portraits. No subscription.

ENGLISH AND FRENCH
Interface and worlds both. A run stays in the language it began in.`,
  keywords: 'roleplay,interactive fiction,story game,rpg,text adventure,choices,visual novel,manga,isekai,dice',
  promotionalText:
    'Type anything. A real rules engine decides what happens, then writes the scene. Twenty-three anime worlds that improvise around you and remember what you did.',
  supportUrl: 'https://www.plotbreak.com',
  marketingUrl: 'https://www.plotbreak.com',
};

const FR = {
  description: `Dans la plupart des histoires générées par IA, il suffit de le dire pour que ce soit vrai. Tu écris « elle me pardonne » et elle pardonne. Plus rien ne compte, puisque plus rien ne peut échouer.

Plotbreak fonctionne à l'envers.

Tu écris ou tu touches ce que tu veux. Un moteur de jeu déterministe — de vrais dés, une vraie difficulté, de vraies conséquences — décide de ce qui arrive. La scène n'est écrite qu'ensuite. Le texte ne contredit jamais le jet de dés.

Une porte verrouillée le reste tant que tu n'as pas trouvé comment l'ouvrir. Quelqu'un qui n'a pas confiance en toi refuse. Un combat que tu déclenches, tu peux le perdre.

VINGT-TROIS MONDES
Une académie qui n'a aucune trace de ton admission. Un vaisseau où personne ne connaît ton nom. Un mariage vieux de quatre ans avec une femme que tu viens de rencontrer. Une maison où il ne faut pas ouvrir la porte à 2 h 13. Chacun a ses personnages, ses règles et sa façon de mal tourner.

SOIS QUI TU VEUX
Choisis ton nom et tes pronoms, décide d'où tu viens, ou écris ton propre passé : le monde le prendra pour argent comptant.

LE MONDE SE SOUVIENT
Promesses, rancunes, blessures et services rendus sont enregistrés, pas résumés puis oubliés. La fiche du monde te montre tes relations, ton inventaire, tes quêtes, la carte et la chronologie de ce qui s'est vraiment passé. Si elle se trompe, corrige-la.

LES DÉS DÉCIDENT
Avant une tentative risquée, on te dit tes chances en toutes lettres. Certaines réussissent à un prix. Certaines échouent en ouvrant autre chose.

COMMENCE GRATUITEMENT
Joue à n'importe quel monde sans compte. Des crédits chaque jour, pour tes tours et tes portraits. Pas d'abonnement.

EN FRANÇAIS ET EN ANGLAIS
L'interface et les mondes. Une partie garde la langue dans laquelle elle a commencé.`,
  keywords: 'jeu de rôle,fiction interactive,histoire,rpg,aventure textuelle,choix,visual novel,manga,isekai,dés',
  promotionalText:
    'Écris ce que tu veux. Un vrai moteur de règles décide, puis écrit la scène. Vingt-trois mondes anime qui improvisent autour de toi et se souviennent.',
  supportUrl: 'https://www.plotbreak.com',
  marketingUrl: 'https://www.plotbreak.com',
};

/**
 * What a reviewer needs to know before they open the app, written so they do
 * not have to guess. The two things that get an app like this rejected are a
 * reviewer who cannot get past the front door, and a reviewer who cannot tell
 * what stops the model producing something it should not.
 */
const REVIEW_NOTES = `NO ACCOUNT IS NEEDED
Open the app, confirm an age band, and you can play immediately as a guest.
Sign-in exists only to carry your runs between devices, so there is no demo
account to hand over. Sign in with Apple and an emailed code are both offered
if you would like to test them.

HOW TO REACH EVERYTHING
- A story: Discover, tap any world, then "Start story".
- Gameplay: name your character and tap "Enter". Type anything into the box at
  the bottom, or tap one of the suggested actions.
- In-app purchases: tap the credit balance at the top right of Discover or
  Profile. The wallet sheet lists all six credit packs.
- The world sheet, which shows the state behind the story: the ≡ button at the
  top right of a session.

WHAT THE CONTENT IS
Twenty-three worlds we authored. The player's typed sentence is parsed into a
structured intent, a deterministic engine resolves it, and only then does a
language model write the scene it was given. The model does not decide outcomes
and cannot introduce new characters, locations or items — it describes what the
engine already decided.

CONTENT SAFETY
- An age gate appears before any content, on first launch.
- Every world declares its content descriptors, shown before entry.
- Every scene can be reported from the session screen, and reports are reviewed.
- A validation pass runs on every generated scene before the player sees it, and
  anything that violates the world's rules is regenerated once.

IN-APP PURCHASES
Six consumable credit packs. Credits are spent on story turns and on generated
character portraits. Nothing is subscription-gated, and credits are also granted
free each day. Our server grants credits only after Apple confirms the
transaction; a purchase we cannot confirm is never credited, and the transaction
is left unfinished so StoreKit redelivers it.

LANGUAGES
English and French, switchable in Profile. A run stays in the language it
started in, so switching mid-way does not rewrite an existing story.`;

// --- API -----------------------------------------------------------------

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
    e.detail = j?.errors?.map((x) => `${x.title}: ${x.detail}`).join('; ') ?? t;
    throw e;
  }
  return j;
}

function check(label, value, limit) {
  const n = [...value].length;
  const status = n > limit ? `OVER by ${n - limit}` : 'ok';
  console.log(`  ${label.padEnd(18)} ${String(n).padStart(4)}/${limit}  ${status}`);
  return n <= limit;
}

// --- Run -----------------------------------------------------------------

console.log('Limits:');
let fits = true;
for (const [name, copy] of [['en-US', EN], ['fr-FR', FR]]) {
  console.log(` ${name}`);
  fits = check('description', copy.description, 4000) && fits;
  fits = check('keywords', copy.keywords, 100) && fits;
  fits = check('promotional', copy.promotionalText, 170) && fits;
}
if (!fits) { console.error('\nSomething is over an Apple limit. Fix the copy above.'); process.exit(1); }

const versions = await asc('GET', `/v1/apps/${APP_ID}/appStoreVersions?limit=5`);
const version = versions.data.find((v) => v.attributes.appStoreState === 'PREPARE_FOR_SUBMISSION') ?? versions.data[0];
console.log(`\nVersion ${version.attributes.versionString} (${version.attributes.appStoreState})`);

const locs = (await asc('GET', `/v1/appStoreVersions/${version.id}/appStoreVersionLocalizations`)).data;

for (const [locale, copy] of [['en-US', EN], ['fr-FR', FR]]) {
  // No `whatsNew`: Apple refuses it before a first release, and "What's New"
  // on a version nobody has seen yet would be answering a question nobody asked.
  const attributes = {
    description: copy.description,
    keywords: copy.keywords,
    promotionalText: copy.promotionalText,
    supportUrl: copy.supportUrl,
    marketingUrl: copy.marketingUrl,
  };
  const existing = locs.find((l) => l.attributes.locale === locale);
  if (!APPLY) { console.log(`  ${locale}: would ${existing ? 'update' : 'create'}`); continue; }
  if (existing) {
    await asc('PATCH', `/v1/appStoreVersionLocalizations/${existing.id}`, {
      data: { type: 'appStoreVersionLocalizations', id: existing.id, attributes },
    });
    console.log(`  ${locale}: updated`);
  } else {
    await asc('POST', '/v1/appStoreVersionLocalizations', {
      data: {
        type: 'appStoreVersionLocalizations',
        attributes: { ...attributes, locale },
        relationships: { appStoreVersion: { data: { type: 'appStoreVersions', id: version.id } } },
      },
    });
    console.log(`  ${locale}: created`);
  }
}

// The reviewer's note. Contact name, phone and email are left to the account
// holder — they are a real person's details and not ours to invent.
const detail = await asc('GET', `/v1/appStoreVersions/${version.id}/appStoreReviewDetail`).catch(() => null);
if (!APPLY) {
  console.log(`  review notes: would ${detail?.data ? 'update' : 'create'} (${REVIEW_NOTES.length} chars)`);
} else if (detail?.data) {
  await asc('PATCH', `/v1/appStoreReviewDetails/${detail.data.id}`, {
    data: { type: 'appStoreReviewDetails', id: detail.data.id, attributes: { notes: REVIEW_NOTES, demoAccountRequired: false } },
  });
  console.log('  review notes: updated');
} else {
  await asc('POST', '/v1/appStoreReviewDetails', {
    data: {
      type: 'appStoreReviewDetails',
      attributes: { notes: REVIEW_NOTES, demoAccountRequired: false },
      relationships: { appStoreVersion: { data: { type: 'appStoreVersions', id: version.id } } },
    },
  });
  console.log('  review notes: created');
}

console.log(APPLY ? '\nDone.' : '\nDry run only. Re-run with --apply.');
