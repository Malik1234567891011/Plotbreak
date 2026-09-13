import { readFileSync } from 'node:fs';
const key = readFileSync('.env','utf8').match(/^OPENAI_API_KEY=(.*)$/m)[1].trim().replace(/^["']|["']$/g,'');
const MODEL='gpt-5.6-terra';
const H={authorization:`Bearer ${key}`,'content-type':'application/json'};
const post=async b=>{const r=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:H,body:JSON.stringify(b)});const j=await r.json();if(j.error)throw new Error(j.error.message);return j;};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const STATIC='STANDING INSTRUCTIONS. '+'You narrate a story set on a mountain. '.repeat(400);
// ~1200 tokens per beat, far above any plausible cache increment
const beat=i=>`PLAYER: turn ${i}.\n\nNARRATOR: `+`Beat ${i}: the slope gives under his heel and a bird goes up out of the ferns while somebody below walks with a lantern swinging a slow arc between the trunks. `.repeat(60);
const vol=i=>`## Right now\nMinute ${i*6}.\n## Action\n${i}: I keep going.`;
const build=(t)=>[{role:'system',content:STATIC},
  {role:'user',content:'## The story so far\n\n'+Array.from({length:t},(_,i)=>beat(i)).join('\n\n')},
  {role:'user',content:vol(t)}];

async function run(label, delayMs){
  console.log(`\n── ${label} (growth ~1200 tok/turn, delay ${delayMs}ms) ──`);
  const ck=`grow-${label}-${Date.now()}`;
  for(let t=1;t<=5;t++){
    const j=await post({model:MODEL,max_output_tokens:150,prompt_cache_key:ck,input:build(t)});
    const u=j.usage;
    console.log(`  t${t} in=${u.input_tokens} cached=${u.input_tokens_details.cached_tokens} write=${u.input_tokens_details.cache_write_tokens}`);
    if(delayMs) await sleep(delayMs);
  }
}
await run('no-delay', 0);
await run('30s-delay', 30000);
// control: identical request twice
console.log('\n── control: identical request repeated ──');
const ck=`ctl-${Date.now()}`;
for(const n of [1,2]){
  const j=await post({model:MODEL,max_output_tokens:150,prompt_cache_key:ck,input:build(4)});
  const u=j.usage;
  console.log(`  send${n} in=${u.input_tokens} cached=${u.input_tokens_details.cached_tokens} write=${u.input_tokens_details.cache_write_tokens}`);
}
