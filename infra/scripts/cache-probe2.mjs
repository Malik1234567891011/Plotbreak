/**
 * Does a growing conversation cache at all, and does message shape matter?
 *
 *   C  one user message containing the whole transcript, growing
 *   D  one message per turn, so completed turns are stable messages
 *
 * Small static prefix in both, so anything cached above ~600 tokens is the
 * transcript itself rather than the preamble.
 */
import { readFileSync } from 'node:fs';
const key = readFileSync('.env','utf8').match(/^OPENAI_API_KEY=(.*)$/m)[1].trim().replace(/^["']|["']$/g,'');
const MODEL = process.argv[2] ?? 'gpt-5.6-terra';
const STATIC = 'You are a narrator. Keep it short.\n' + Array.from({length: 40}, (_,i)=>`Rule ${i}: keep detail ${i} consistent.`).join('\n');
const turn = (i) => `PLAYER: I do thing number ${i}.\n\nThe world answers thing ${i} at length, with detail about the light, the noise, and who was standing where when it happened, and what they said about it afterwards.`;

async function call(messages, tag) {
  const r = await fetch('https://api.openai.com/v1/chat/completions', {
    method:'POST', headers:{ authorization:`Bearer ${key}`, 'content-type':'application/json' },
    body: JSON.stringify({ model: MODEL, max_completion_tokens: 30, messages, prompt_cache_key: 'pb-probe2' }),
  });
  const j = await r.json();
  if (!j.usage) return console.log(tag,'ERR',JSON.stringify(j).slice(0,160));
  const c = j.usage.prompt_tokens_details?.cached_tokens ?? 0;
  console.log(`${tag}  input ${String(j.usage.prompt_tokens).padStart(6)}  cached ${String(c).padStart(6)}  (${(c/j.usage.prompt_tokens*100).toFixed(0)}%)`);
}

console.log('\n--- C: whole transcript in ONE growing user message ---');
for (const n of [30,31,32,33]) {
  const history = Array.from({length:n},(_,i)=>turn(i)).join('\n\n');
  await call([{role:'system',content:STATIC},{role:'user',content:`## Story so far\n${history}\n\n## Action\nI do thing ${n}.`}], `turns=${n}`);
  await new Promise(r=>setTimeout(r,700));
}

console.log('\n--- D: one message per turn ---');
for (const n of [30,31,32,33]) {
  const msgs = [{role:'system',content:STATIC}];
  for (let i=0;i<n;i++){ msgs.push({role:'user',content:`I do thing number ${i}.`});
    msgs.push({role:'assistant',content:`The world answers thing ${i} at length, with detail about the light, the noise, and who was standing where when it happened, and what they said about it afterwards.`}); }
  msgs.push({role:'user',content:`I do thing ${n}.`});
  await call(msgs, `turns=${n}`);
  await new Promise(r=>setTimeout(r,700));
}
