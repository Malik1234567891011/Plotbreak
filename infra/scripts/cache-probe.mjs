/**
 * Deterministic prompt-cache probe.
 *
 * Two layouts, identical information, same growing conversation:
 *
 *   A "volatile-in-prefix"  static + VOLATILE + history + action   (what Pure does)
 *   B "volatile-at-tail"    static + history + VOLATILE + action
 *
 * The docs say caching matches unchanged tokens at the beginning and that any
 * content change before a breakpoint prevents prefix matching. If that is the
 * cause, A should cache only up to its first volatile token and B should cache
 * nearly the whole transcript.
 */
import { readFileSync } from 'node:fs';
const key = readFileSync('.env','utf8').match(/^OPENAI_API_KEY=(.*)$/m)[1].trim().replace(/^["']|["']$/g,'');
const MODEL = process.argv[2] ?? 'gpt-5.6-terra';

const STATIC = 'You are a narrator.\n' + Array.from({length: 900}, (_,i) =>
  `Fact ${i}: the mountain has ${i} trees, a path worn by ${i} feet, and weather that turns at ${i} o'clock.`).join('\n');
const turn = (i) => `PLAYER: I do thing number ${i}.\n\nThe world answers thing number ${i} at some length, with detail about the light and the noise and who was standing where when it happened.`;

async function call(messages, tag) {
  const t0 = Date.now();
  const r = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
    body: JSON.stringify({ model: MODEL, max_completion_tokens: 40, messages,
      prompt_cache_key: 'plotbreak-cache-probe' }),
  });
  const j = await r.json();
  if (!j.usage) return console.log(tag, 'ERROR', JSON.stringify(j).slice(0,200));
  const u = j.usage;
  const cached = u.prompt_tokens_details?.cached_tokens ?? 0;
  console.log(`${tag}  input ${String(u.prompt_tokens).padStart(6)}  cached ${String(cached).padStart(6)}  (${(cached/u.prompt_tokens*100).toFixed(0)}%)  ${Date.now()-t0}ms`);
  return cached;
}

const volatile = (n) => `## Right now\nThe player is at location ${n % 3}. Present: ${['Sabo','Luffy','Dadan'].slice(0, (n % 3) + 1).join(', ')}.`;

for (const layout of ['A volatile-in-prefix', 'B volatile-at-tail']) {
  console.log(`\n--- ${layout} ---`);
  for (const n of [20, 21, 22, 23]) {
    const history = Array.from({length: n}, (_, i) => turn(i)).join('\n\n');
    const messages = layout.startsWith('A')
      ? [{ role: 'system', content: STATIC + '\n\n' + volatile(n) },
         { role: 'user', content: `## Story so far\n${history}\n\n## Action\nI do thing ${n}.` }]
      : [{ role: 'system', content: STATIC },
         { role: 'user', content: `## Story so far\n${history}\n\n${volatile(n)}\n\n## Action\nI do thing ${n}.` }];
    await call(messages, `turns=${String(n).padStart(3)}`);
    await new Promise(r => setTimeout(r, 800));
  }
}
