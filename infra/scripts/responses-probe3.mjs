import { readFileSync } from 'node:fs';
const key = readFileSync('.env','utf8').match(/^OPENAI_API_KEY=(.*)$/m)[1].trim().replace(/^["']|["']$/g,'');
const MODEL='gpt-5.6-terra';
async function post(body,tag){
  const r=await fetch('https://api.openai.com/v1/responses',{method:'POST',
    headers:{authorization:`Bearer ${key}`,'content-type':'application/json'},body:JSON.stringify(body)});
  const j=await r.json();
  if(j.error){console.log(`${tag}: ERR ${j.error.message?.slice(0,200)}`);return;}
  const text=j.output?.flatMap(o=>o.content??[]).map(c=>c.text).filter(Boolean).join('')??'';
  console.log(`${tag}: ok status=${j.status} out=${text.slice(0,90).replace(/\n/g,' ')}`);
}
const base={model:MODEL,max_output_tokens:1200,input:[{role:'user',content:'Describe a lamp as JSON with keys name and note.'}]};
await post({...base,text:{format:{type:'json_object'}}},'json_object');
await post({...base,text:{format:{type:'json_schema',name:'lamp',strict:false,
  schema:{type:'object',properties:{name:{type:'string'},note:{type:'string'}},required:['name']}}}},'json_schema strict:false');
await post({...base,text:{format:{type:'json_schema',name:'lamp',
  schema:{type:'object',properties:{name:{type:'string'},note:{type:'string'}},required:['name']}}}},'json_schema no-strict-field');
// open-ended record under strict:false — the thing chat/completions strict rejects
await post({...base,text:{format:{type:'json_schema',name:'rec',strict:false,
  schema:{type:'object',properties:{bag:{type:'object',additionalProperties:true}},required:['bag']}}}},'open record strict:false');
// developer role
await post({model:MODEL,max_output_tokens:600,input:[{role:'developer',content:'Be terse.'},{role:'user',content:'hi'}]},'developer role');
// assistant role in input (history replay)
await post({model:MODEL,max_output_tokens:600,input:[{role:'user',content:'say A'},{role:'assistant',content:'A'},{role:'user',content:'say B'}]},'assistant history');
