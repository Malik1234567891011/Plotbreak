import { readFileSync } from 'node:fs';
const key = readFileSync('.env','utf8').match(/^OPENAI_API_KEY=(.*)$/m)[1].trim().replace(/^["']|["']$/g,'');
const r = await fetch('https://api.openai.com/v1/responses', {
  method:'POST', headers:{authorization:`Bearer ${key}`,'content-type':'application/json'},
  body: JSON.stringify({
    model:'gpt-5.6-terra', max_output_tokens:800, stream:true,
    input:[{role:'system',content:'You narrate.'},{role:'user',content:'Two short blocks about a boy on a mountain, as JSON.'}],
    text:{format:{type:'json_schema',name:'turn',strict:false,schema:{
      type:'object',
      properties:{narrative:{type:'array',items:{type:'object',properties:{speaker:{type:'string'},text:{type:'string'}},required:['speaker','text']}},sceneSummary:{type:'string'}},
      required:['narrative','sceneSummary'], additionalProperties:false}}},
  }),
});
console.log('status', r.status, r.headers.get('content-type'));
const reader=r.body.getReader(); const dec=new TextDecoder();
let buf='', seen=new Map(), firstDelta=null, t0=Date.now(), chars=0;
while(true){
  const {value,done}=await reader.read(); if(done) break;
  buf+=dec.decode(value,{stream:true});
  const parts=buf.split('\n\n'); buf=parts.pop()??'';
  for(const p of parts){
    const ev=p.match(/^event:\s*(\S+)/m)?.[1];
    if(!ev) continue;
    seen.set(ev,(seen.get(ev)??0)+1);
    if(ev==='response.output_text.delta'){
      const d=JSON.parse(p.match(/^data:\s*(.+)$/m)[1]);
      if(firstDelta===null){firstDelta=Date.now()-t0; console.log(`first delta at ${firstDelta}ms:`, JSON.stringify(d.delta));}
      chars+=(d.delta??'').length;
    }
    if(ev==='response.completed'){
      const d=JSON.parse(p.match(/^data:\s*(.+)$/m)[1]);
      console.log('completed at', Date.now()-t0, 'ms; usage=', JSON.stringify(d.response?.usage));
    }
  }
}
console.log('\nevent types seen:'); for(const [k,v] of seen) console.log(`  ${k} × ${v}`);
console.log('total streamed chars:', chars);
