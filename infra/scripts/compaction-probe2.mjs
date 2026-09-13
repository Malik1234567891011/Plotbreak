import { readFileSync, writeFileSync } from 'node:fs';
const key = readFileSync('.env','utf8').match(/^OPENAI_API_KEY=(.*)$/m)[1].trim().replace(/^["']|["']$/g,'');
const MODEL='gpt-5.6-terra';
const H={authorization:`Bearer ${key}`,'content-type':'application/json'};
const post=async(p,b)=>{const r=await fetch('https://api.openai.com/v1'+p,{method:'POST',headers:H,body:JSON.stringify(b)});return {status:r.status,j:await r.json()};};
const turns=[];
for(let i=0;i<120;i++){
  turns.push({role:'user',content:`PLAYER: turn ${i}. I look around and ask about the tin box we buried under the fig root.`});
  turns.push({role:'assistant',content:`Sabo grins. "Turn ${i}. The box is still where we left it." The forest is loud with cicadas and someone is walking up the slope carrying rope and a lantern, and the light moves between the trees in a slow arc that nobody comments on.`});
}
const sys={role:'system',content:'You narrate.'};
// A) compacting call, stored so we can chain
const a=await post('/responses',{model:MODEL,max_output_tokens:400,store:true,
  input:[sys,...turns,{role:'user',content:'Who buried the box?'}],
  context_management:[{type:'compaction',compact_threshold:5000}]});
const comp=a.j.output?.find(o=>o.type==='compaction');
console.log('A usage:',JSON.stringify(a.j.usage));
console.log('compaction item keys:',comp?Object.keys(comp).join(','):'none');
writeFileSync(process.env.CLAUDE_JOB_DIR+'/tmp/compaction-item.json', JSON.stringify(comp,null,2));
const cs=JSON.stringify(comp??{});
console.log('compaction item size(chars):',cs.length);
console.log('compaction preview:', cs.slice(0,700));
// B) continue the chain with previous_response_id — does input drop?
const b=await post('/responses',{model:MODEL,max_output_tokens:400,store:true,
  previous_response_id:a.j.id, input:[{role:'user',content:'And what was I carrying?'}],
  context_management:[{type:'compaction',compact_threshold:5000}]});
console.log('B (previous_response_id after compaction) usage:',JSON.stringify(b.j.usage));
// C) stateless: feed the compaction item back in place of the history
if (comp) {
  const c=await post('/responses',{model:MODEL,max_output_tokens:400,
    input:[sys,comp,{role:'user',content:'And what was I carrying?'}]});
  console.log('C (stateless replay of compaction item) status',c.status,'usage:',JSON.stringify(c.j.usage));
  if(c.j.error) console.log('   err:',c.j.error.message?.slice(0,200));
}
