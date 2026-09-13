import { readFileSync } from 'node:fs';
const key = readFileSync('.env','utf8').match(/^OPENAI_API_KEY=(.*)$/m)[1].trim().replace(/^["']|["']$/g,'');
const MODEL='gpt-5.6-terra';
async function post(body, tag){
  const r = await fetch('https://api.openai.com/v1/responses',{method:'POST',
    headers:{authorization:`Bearer ${key}`,'content-type':'application/json'},body:JSON.stringify(body)});
  const j = await r.json();
  if (j.error){ console.log(`${tag}: ERR ${j.error.message?.slice(0,260)}`); return null; }
  console.log(`${tag}: ok usage=${JSON.stringify(j.usage)}`);
  if (j.billing) console.log(`   billing=${JSON.stringify(j.billing)}`);
  if (j.prompt_cache_retention !== undefined) console.log(`   retention=${JSON.stringify(j.prompt_cache_retention)}`);
  if (j.context_management) console.log(`   ctxmgmt=${JSON.stringify(j.context_management)}`);
  return j;
}
const filler = (n)=> Array.from({length:n},(_,i)=>`Sentence number ${i} about a quiet harbour town where nothing much happens.`).join(' ');
// breakpoint mode values
for (const mode of ['auto','manual','enabled','true']) {
  await post({model:MODEL,input:[{role:'system',content:filler(400)},{role:'user',content:'hi'}],
    max_output_tokens:400, prompt_cache_breakpoint:{mode}}, `bp mode=${mode}`);
}
// breakpoint as message-level field
await post({model:MODEL,input:[
  {role:'system',content:filler(400)},
  {role:'user',content:'hi', prompt_cache_breakpoint:{mode:'auto'}}], max_output_tokens:400}, 'bp on message');
// retention
await post({model:MODEL,input:[{role:'user',content:'hi'}],max_output_tokens:400,prompt_cache_retention:'24h'},'retention 24h');
// reasoning effort
await post({model:MODEL,input:[{role:'user',content:'hi'}],max_output_tokens:400,reasoning:{effort:'low'}},'reasoning low');
