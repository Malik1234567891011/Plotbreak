import { readFileSync } from 'node:fs';
const key = readFileSync('.env','utf8').match(/^OPENAI_API_KEY=(.*)$/m)[1].trim().replace(/^["']|["']$/g,'');
const MODEL='gpt-5.6-terra';
const H={authorization:`Bearer ${key}`,'content-type':'application/json'};
const post=async b=>{const r=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:H,body:JSON.stringify(b)});const j=await r.json();if(j.error)throw new Error(j.error.message);return j;};
const STATIC='STANDING INSTRUCTIONS. '+ 'You narrate a story set on a mountain. '.repeat(400);
const beat=i=>`PLAYER: turn ${i}, I do the next thing.\n\nNARRATOR: The slope gives under his heel and a bird goes up out of the ferns, turn ${i}, and somebody below is still walking with a lantern that swings a slow arc between the trunks.`;
const volatile=i=>`## Right now\nThe player is at Mount Colubo. Present: Sabo, Luffy. Minute ${i*6}.\n\n## Action\n${i}: I keep going.\n\nWrite the next beat as one short paragraph.`;

async function run(label, build){
  console.log(`\n── ${label} ──`);
  const key=`gran-${label}-${Date.now()}`;
  for(let t=1;t<=6;t++){
    const hist=Array.from({length:t},(_,i)=>beat(i)).join('\n\n');
    const j=await post({model:MODEL,max_output_tokens:200,prompt_cache_key:key,input:build(hist,t)});
    const u=j.usage;
    console.log(`  t${t} in=${u.input_tokens} cached=${u.input_tokens_details.cached_tokens} write=${u.input_tokens_details.cache_write_tokens}`);
  }
}
// A: today's shape — history and volatile tail in ONE user message
await run('single-message', (hist,t)=>[
  {role:'system',content:STATIC},
  {role:'user',content:`## The story so far\n\n${hist}\n\n${volatile(t)}`},
]);
// B: history in its own message, volatile in the next
await run('split-message', (hist,t)=>[
  {role:'system',content:STATIC},
  {role:'user',content:`## The story so far\n\n${hist}`},
  {role:'user',content:volatile(t)},
]);
// C: one message per turn, the natural conversation shape
await run('per-turn-messages', (hist,t)=>[
  {role:'system',content:STATIC},
  ...Array.from({length:t},(_,i)=>({role:'user',content:beat(i)})),
  {role:'user',content:volatile(t)},
]);
