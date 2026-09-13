/**
 * Does a warm prefix survive a change of model?
 *
 * Append-only caching is what makes Terra affordable. If a tier switch lands on
 * a different model with a cold prefix, a single Apex turn late in a long
 * session could cost more than everything before it — so this measures rather
 * than assumes, on a realistically sized conversation.
 */
import { readFileSync } from 'node:fs';
const key = readFileSync('.env','utf8').match(/^OPENAI_API_KEY=(.*)$/m)[1].trim().replace(/^["']|["']$/g,'');
const H = { authorization:`Bearer ${key}`, 'content-type':'application/json' };

const STATIC = 'STANDING INSTRUCTIONS. ' + 'You narrate an anime story set on a mountain. '.repeat(900);
const beat = (i) => `PLAYER: turn ${i}. I keep going.\n\nNARRATOR: ` +
  `Beat ${i}: the slope gives under your heel and a bird goes up out of the ferns while somebody below walks with a lantern. `.repeat(12);

/** A conversation of `turns` exchanges — roughly a mid-length session. */
function conversation(turns) {
  const items = [{ role: 'system', content: STATIC }];
  for (let i = 0; i < turns; i++) {
    items.push({ role: 'user', content: `## Right now\nMinute ${i * 6}.\n## Action\n${i}: I keep going.` });
    items.push({ role: 'assistant', content: beat(i) });
  }
  items.push({ role: 'user', content: `## Right now\nMinute ${turns * 6}.\n## Action\n${turns}: I keep going.` });
  return items;
}

async function call(model, items, cacheKey) {
  const t0 = Date.now();
  const r = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST', headers: H,
    body: JSON.stringify({ model, max_output_tokens: 120, input: items, prompt_cache_key: cacheKey, prompt_cache_retention: '24h' }),
  });
  const j = await r.json();
  if (j.error) return { error: j.error.message?.slice(0, 90) };
  const u = j.usage;
  return {
    input: u.input_tokens,
    cached: u.input_tokens_details.cached_tokens,
    uncached: u.input_tokens - u.input_tokens_details.cached_tokens,
    ms: Date.now() - t0,
  };
}

const TURNS = 20;
const items = conversation(TURNS);
const CK = `xmodel-${Date.now()}`;
console.log(`conversation: ${TURNS} exchanges, ~${Math.round(JSON.stringify(items).length / 4)} tokens\n`);
console.log('step                                  input   cached uncached    ms');
const seq = [
  ['terra  warm-up 1', 'gpt-5.6-terra'],
  ['terra  warm-up 2', 'gpt-5.6-terra'],
  ['terra  warm (baseline)', 'gpt-5.6-terra'],
  ['luna   FIRST after terra', 'gpt-5.6-luna'],
  ['luna   second', 'gpt-5.6-luna'],
  ['terra  back again', 'gpt-5.6-terra'],
  ['sol    FIRST after terra', 'gpt-5.6-sol'],
  ['astra  FIRST after terra', 'gpt-6-astra'],
  ['astra  second', 'gpt-6-astra'],
  ['terra  back again', 'gpt-5.6-terra'],
];
for (const [label, model] of seq) {
  const r = await call(model, items, CK);
  if (r.error) { console.log(`  ${label.padEnd(36)} ERROR ${r.error}`); continue; }
  console.log(`  ${label.padEnd(36)} ${String(r.input).padStart(6)} ${String(r.cached).padStart(8)} ${String(r.uncached).padStart(8)} ${String(r.ms).padStart(5)}`);
}
// Does each model keep its own cache, or do they share one?
console.log('\nshared vs per-model cache key:');
const ck2 = `xmodel-sep-${Date.now()}`;
for (const [label, model] of [['terra first', 'gpt-5.6-terra'], ['terra again', 'gpt-5.6-terra'], ['luna on same key', 'gpt-5.6-luna'], ['luna again', 'gpt-5.6-luna']]) {
  const r = await call(model, items, ck2);
  console.log(`  ${label.padEnd(36)} ${String(r.input ?? '-').padStart(6)} ${String(r.cached ?? '-').padStart(8)} ${String(r.uncached ?? '-').padStart(8)}`);
}
