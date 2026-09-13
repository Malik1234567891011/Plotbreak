/**
 * Decisive: at realistic scale, does the growing transcript cache, or does
 * caching stop at the static prefix?
 *
 * static ~7k tokens (like Pure's world block), history grows 10k -> 20k.
 * If cached only ever equals ~static, the transcript never caches and the
 * O(n^2) cost stands regardless of layout.
 */
import { readFileSync } from 'node:fs';
const key = readFileSync('.env','utf8').match(/^OPENAI_API_KEY=(.*)$/m)[1].trim().replace(/^["']|["']$/g,'');
const MODEL = process.argv[2] ?? 'gpt-5.6-terra';
const STATIC = 'You are a narrator.\n' + Array.from({length:1200},(_,i)=>`Fact ${i}: the mountain has ${i} trees and a path worn by ${i} feet.`).join('\n');
const turn = (i) => `PLAYER: I do thing number ${i}.\n\nThe world answers thing ${i} at length, with detail about the light and the noise and who was standing where, and what was said afterwards, and how the weather turned while it happened.`;

async function call(messages, tag) {
  const r = await fetch('https://api.openai.com/v1/chat/completions', {
    method:'POST', headers:{ authorization:`Bearer ${key}`, 'content-type':'application/json' },
    body: JSON.stringify({ model: MODEL, max_completion_tokens: 2000, messages, prompt_cache_key:'pb-probe3' }),
  });
  const j = await r.json();
  if (!j.usage) return console.log(tag,'ERR',JSON.stringify(j).slice(0,150));
  const c = j.usage.prompt_tokens_details?.cached_tokens ?? 0;
  console.log(`${tag}  input ${String(j.usage.prompt_tokens).padStart(6)}  cached ${String(c).padStart(6)}  (${(c/j.usage.prompt_tokens*100).toFixed(0)}%)`);
  return c;
}
console.log('static block alone is ~7k tokens; watch whether cached climbs past it\n');
for (const n of [60, 90, 120, 150]) {
  const history = Array.from({length:n},(_,i)=>turn(i)).join('\n\n');
  await call([{role:'system',content:STATIC},{role:'user',content:`## Story so far\n${history}\n\n## Action\nI do thing ${n}.`}], `turns=${String(n).padStart(3)}`);
  await new Promise(r=>setTimeout(r,900));
}
