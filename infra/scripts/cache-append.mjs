import { readFileSync } from 'node:fs';
const key = readFileSync('.env','utf8').match(/^OPENAI_API_KEY=(.*)$/m)[1].trim().replace(/^["']|["']$/g,'');
const MODEL='gpt-5.6-terra';
const H={authorization:`Bearer ${key}`,'content-type':'application/json'};
const post=async b=>{const r=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:H,body:JSON.stringify(b)});const j=await r.json();if(j.error)throw new Error(j.error.message);return j;};
const STATIC='STANDING INSTRUCTIONS. '+'You narrate a story set on a mountain. '.repeat(400);
const narr=i=>`Beat ${i}: `+`the slope gives under his heel and a bird goes up out of the ferns. `.repeat(60);
// the real shape: each turn appends a user message carrying the volatile block
// plus the action, and an assistant message carrying what was written.
const userMsg=i=>`## Right now\nThe player is at Mount Colubo. Present: Sabo, Luffy. Minute ${i*6}.\n\n## The player's action\nI keep going, turn ${i}.\n\nWrite the next beat.`;
async function run(label, build){
  console.log(`\n── ${label} ──`);
  for(let t=0;t<6;t++){
    const j=await post({model:MODEL,max_output_tokens:150,input:build(t)});
    const u=j.usage;
    const unc=u.input_tokens-u.input_tokens_details.cached_tokens;
    console.log(`  t${t+1} in=${u.input_tokens} cached=${u.input_tokens_details.cached_tokens} uncached=${unc} write=${u.input_tokens_details.cache_write_tokens}`);
  }
}
// APPEND-ONLY conversation: every request strictly extends the previous one
await run('append-only conversation (volatile kept in history)', t=>{
  const items=[{role:'system',content:STATIC}];
  for(let i=0;i<t;i++){ items.push({role:'user',content:userMsg(i)}); items.push({role:'assistant',content:narr(i)}); }
  items.push({role:'user',content:userMsg(t)});
  return items;
});
// today's shape for comparison: volatile rebuilt into one rolling user message
await run('rebuilt single-message (today)', t=>{
  const hist=Array.from({length:t},(_,i)=>`PLAYER: turn ${i}\n\nNARRATOR: ${narr(i)}`).join('\n\n');
  return [{role:'system',content:STATIC},
    {role:'user',content:`## The story so far\n\n${hist}\n\n${userMsg(t)}`}];
});
