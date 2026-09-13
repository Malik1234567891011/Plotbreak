import { readFileSync } from 'node:fs';
const key = readFileSync('.env','utf8').match(/^OPENAI_API_KEY=(.*)$/m)[1].trim().replace(/^["']|["']$/g,'');
const MODEL = process.argv[2] ?? 'gpt-5.6-terra';
async function post(body, tag) {
  const r = await fetch('https://api.openai.com/v1/responses', {
    method:'POST', headers:{ authorization:`Bearer ${key}`,'content-type':'application/json' },
    body: JSON.stringify(body) });
  const j = await r.json();
  if (j.error) { console.log(`${tag}: ERROR ${j.error.message?.slice(0,220)}`); return null; }
  console.log(`${tag}: ok  top-level keys = ${Object.keys(j).join(',')}`);
  console.log(`   usage = ${JSON.stringify(j.usage)}`);
  const text = j.output?.flatMap(o=>o.content??[]).map(c=>c.text).filter(Boolean).join('') ?? '';
  console.log(`   text  = ${text.slice(0,120)}`);
  return j;
}
// 1. minimal + structured output
await post({ model: MODEL, input: [
    { role:'system', content:'You are terse.' },
    { role:'user', content:'Give me a fact about rope.' }],
  max_output_tokens: 2000,
  text: { format: { type:'json_schema', name:'fact', strict:true,
    schema:{ type:'object', properties:{ fact:{type:'string'} }, required:['fact'], additionalProperties:false } } },
}, '1 structured');
// 2. prompt cache key + breakpoint
await post({ model: MODEL, input:[
    { role:'system', content:'x '.repeat(3000) },
    { role:'user', content:'Say hi.' }],
  max_output_tokens: 600, prompt_cache_key:'pb-resp-probe',
}, '2 cache_key');
// 3. context_management compaction
await post({ model: MODEL, input:[{ role:'user', content:'Say hi.' }],
  max_output_tokens: 600,
  context_management:[{ type:'compaction', compact_threshold: 200000 }],
}, '3 compaction');
