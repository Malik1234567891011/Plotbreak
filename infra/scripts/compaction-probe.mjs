import { readFileSync } from 'node:fs';
const key = readFileSync('.env','utf8').match(/^OPENAI_API_KEY=(.*)$/m)[1].trim().replace(/^["']|["']$/g,'');
const MODEL='gpt-5.6-terra';
const H = {authorization:`Bearer ${key}`,'content-type':'application/json'};
async function post(path, body, tag){
  const r=await fetch('https://api.openai.com/v1'+path,{method:'POST',headers:H,body:JSON.stringify(body)});
  const j=await r.json();
  if(j.error){console.log(`${tag}: ERR(${r.status}) ${j.error.message?.slice(0,200)}`);return null;}
  console.log(`${tag}: ok status=${j.status} usage=${JSON.stringify(j.usage)}`);
  if (j.context_management) console.log(`   ctx=${JSON.stringify(j.context_management).slice(0,300)}`);
  if (j.output) console.log(`   outputTypes=${j.output.map(o=>o.type).join(',')}`);
  return j;
}
// big synthetic transcript ~20k tokens
const turns=[];
for(let i=0;i<120;i++){
  turns.push({role:'user',content:`PLAYER: turn ${i}. I look around and ask about the tin box we buried under the fig root.`});
  turns.push({role:'assistant',content:`Sabo grins. "Turn ${i}. The box is still where we left it." The forest is loud with cicadas and someone is walking up the slope carrying rope and a lantern, and the light moves between the trees in a slow arc that nobody comments on.`});
}
console.log('history messages:', turns.length);
// no compaction baseline
const base = await post('/responses',{model:MODEL,max_output_tokens:300,input:[{role:'system',content:'You narrate.'},...turns,{role:'user',content:'Who buried the box?'}]},'no compaction');
// low threshold -> should compact
await post('/responses',{model:MODEL,max_output_tokens:300,input:[{role:'system',content:'You narrate.'},...turns,{role:'user',content:'Who buried the box?'}],
  context_management:[{type:'compaction',compact_threshold:5000}]},'compact_threshold=5000');
// stored response, then standalone compact
const stored = await post('/responses',{model:MODEL,max_output_tokens:300,store:true,input:[{role:'system',content:'You narrate.'},...turns,{role:'user',content:'Who buried the box?'}]},'stored');
if (stored?.id) {
  const r=await fetch('https://api.openai.com/v1/responses/compact',{method:'POST',headers:H,body:JSON.stringify({response_id:stored.id})});
  const t=await r.text();
  console.log(`compact endpoint: ${r.status} ${t.slice(0,300)}`);
}
