import { readFileSync } from 'node:fs';
const BASE='http://localhost:4000';
const env=readFileSync('.env','utf8');
const SUPA=env.match(/^SUPABASE_URL=(.*)$/m)?.[1]?.trim().replace(/^["']|["']$/g,'');
const ANON=env.match(/^SUPABASE_ANON_KEY=(.*)$/m)?.[1]?.trim().replace(/^["']|["']$/g,'');
let token=`guest_${crypto.randomUUID()}`;
if(SUPA&&ANON){const su=await fetch(`${SUPA.replace(/\/$/,'')}/auth/v1/signup`,{method:'POST',headers:{apikey:ANON,authorization:`Bearer ${ANON}`,'content-type':'application/json'},body:'{}'});token=(await su.json()).access_token??token;}
const H={authorization:`Bearer ${token}`,'content-type':'application/json'};
const call=async(m,p,b,x={})=>{const r=await fetch(BASE+p,{method:m,headers:{...H,...x},body:b===undefined?undefined:JSON.stringify(b)});const t=await r.text();if(!r.ok)throw new Error(`${m} ${p} ${r.status} ${t.slice(0,200)}`);return JSON.parse(t);};
const d=await call('GET','/v1/stories/story_ace');
const s=await call('POST','/v1/stories/story_ace/sessions',{identity:{displayName:d.protagonist.name,pronouns:d.protagonist.pronouns,archetypeId:d.archetypes[0]?.id??null,advanced:{}},locale:'en'});
const t0=Date.now();
const acc=await call('POST',`/v1/sessions/${s.session.sessionId}/turns`,{actionText:'I tell Sabo we should go and look at the boat before it gets dark.',qualityTier:'VIVID',sessionRevision:s.revision??0,selectedSuggestionId:null,voicePreferred:false},{'idempotency-key':crypto.randomUUID()});
console.log(`${String(Date.now()-t0).padStart(6)} ms  202 accepted`);
const res=await fetch(`${BASE}/v1/turns/${acc.turnId}/stream?token=${encodeURIComponent(acc.streamToken)}`,{headers:{authorization:H.authorization}});
const rd=res.body.getReader(); const dec=new TextDecoder(); let buf=''; let n=0;
while(true){
  const {value,done}=await rd.read(); if(done) break;
  buf+=dec.decode(value,{stream:true});
  const parts=buf.split('\n\n'); buf=parts.pop()??'';
  for(const p of parts){
    const ev=p.match(/^event:\s*(\S+)/m)?.[1]; if(!ev) continue;
    const data=JSON.parse(p.match(/^data:\s*(.+)$/m)?.[1]??'{}'); const d2=data.data??data;
    let note='';
    if(ev==='text.stream'){ n++; note=`block ${d2.index} ${d2.speakerId?`[${d2.speakerId}]`:'[narration]'} ${String(d2.text).slice(0,48)}…`; }
    if(ev==='reaction.ready') note=`${d2.characterId}/${d2.emotion}`;
    if(ev==='turn.completed') note=`${(d2.suggestions??[]).length} cards`;
    console.log(`${String(Date.now()-t0).padStart(6)} ms  ${ev.padEnd(16)} ${note}`);
    if(ev==='turn.completed'){ await rd.cancel().catch(()=>{}); console.log(`\ntotal text.stream events: ${n}`); process.exit(0); }
  }
}
