import { readFileSync } from 'node:fs';
const key = readFileSync('.env','utf8').match(/^OPENAI_API_KEY=(.*)$/m)[1].trim().replace(/^["']|["']$/g,'');
const MODEL='gpt-5.6-terra';
const H={authorization:`Bearer ${key}`,'content-type':'application/json'};
const post=async b=>{const r=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:H,body:JSON.stringify(b)});const j=await r.json();if(j.error)throw new Error(j.error.message);return j;};
const STATIC='STANDING INSTRUCTIONS. '+'You narrate a story set on a mountain. '.repeat(400);
const beat=i=>`PLAYER: turn ${i}.\n\nNARRATOR: `+`Beat ${i}: the slope gives under his heel and a bird goes up out of the ferns. `.repeat(60);
const vol=i=>`## Right now\nMinute ${i*6}.\n## Action\n${i}: I keep going.`;
async function run(label, extra, build){
  console.log(`\n── ${label} ──`);
  for(let t=1;t<=4;t++){
    const j=await post({model:MODEL,max_output_tokens:150,...extra(t),input:build(t)});
    const u=j.usage;
    console.log(`  t${t} in=${u.input_tokens} cached=${u.input_tokens_details.cached_tokens} write=${u.input_tokens_details.cache_write_tokens}`);
  }
}
const flat=t=>[{role:'system',content:STATIC},
  {role:'user',content:'## The story so far\n\n'+Array.from({length:t},(_,i)=>beat(i)).join('\n\n')},
  {role:'user',content:vol(t)}];
// no prompt_cache_key at all
await run('no cache key', ()=>({}), flat);
// volatile FIRST, history last (does position matter?)
await run('volatile-first', ()=>({}), t=>[{role:'system',content:STATIC},
  {role:'user',content:vol(t)},
  {role:'user',content:'## The story so far\n\n'+Array.from({length:t},(_,i)=>beat(i)).join('\n\n')}]);
// append-only: history messages identical, nothing volatile at all
await run('pure append, no volatile', ()=>({}), t=>[{role:'system',content:STATIC},
  ...Array.from({length:t},(_,i)=>({role:'user',content:beat(i)}))]);
