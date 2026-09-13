// Submits one turn and reads the SSE stream, so the art path is verified
// end to end rather than inferred from the code.
import { readFileSync } from 'node:fs';
const BASE='http://localhost:4000';
const env=readFileSync('.env','utf8');
const SUPA=env.match(/^SUPABASE_URL=(.*)$/m)?.[1]?.trim().replace(/^["']|["']$/g,'');
const ANON=env.match(/^SUPABASE_ANON_KEY=(.*)$/m)?.[1]?.trim().replace(/^["']|["']$/g,'');
let token=`guest_${crypto.randomUUID()}`;
if(SUPA&&ANON){const su=await fetch(`${SUPA.replace(/\/$/,'')}/auth/v1/signup`,{method:'POST',headers:{apikey:ANON,authorization:`Bearer ${ANON}`,'content-type':'application/json'},body:'{}'});token=(await su.json()).access_token??token;}
const H={authorization:`Bearer ${token}`,'content-type':'application/json'};
const call=async(m,p,b,x={})=>{const r=await fetch(BASE+p,{method:m,headers:{...H,...x},body:b===undefined?undefined:JSON.stringify(b)});const t=await r.text();if(!r.ok)throw new Error(`${m} ${p} ${r.status} ${t.slice(0,200)}`);return JSON.parse(t);};
const detail=await call('GET','/v1/stories/story_ace');
const s=await call('POST','/v1/stories/story_ace/sessions',{identity:{displayName:detail.protagonist.name,pronouns:detail.protagonist.pronouns,archetypeId:detail.archetypes[0]?.id??null,advanced:{}},locale:'en'});
const sessionId=s.session.sessionId;
const acc=await call('POST',`/v1/sessions/${sessionId}/turns`,{actionText:'I tell Sabo his hat looks ridiculous.',qualityTier:'VIVID',sessionRevision:s.revision??0,selectedSuggestionId:null,voicePreferred:false},{'idempotency-key':crypto.randomUUID()});
const res=await fetch(`${BASE}/v1/turns/${acc.turnId}/stream?token=${encodeURIComponent(acc.streamToken)}`,{headers:{authorization:`Bearer ${token}`}});
const reader=res.body.getReader(); const dec=new TextDecoder(); let buf=''; const seen=[]; const t0=Date.now();
while(Date.now()-t0<90000){
  const {value,done}=await reader.read(); if(done) break;
  buf+=dec.decode(value,{stream:true});
  for(const evt of buf.split('\n\n').slice(0,-1)){
    const name=evt.match(/^event:\s*(\S+)/m)?.[1];
    if(name){ seen.push(name); if(name==='reaction.ready'||name==='media.queued') console.log('  →',evt.replace(/\n/g,' ').slice(0,220)); }
  }
  buf=buf.split('\n\n').slice(-1)[0];
  if(seen.includes('turn.completed')) break;
}
console.log('\nevents seen:', [...new Set(seen)].join(', '));
console.log('reaction.ready:', seen.filter(x=>x==='reaction.ready').length);
console.log('media.queued (paid generation):', seen.filter(x=>x==='media.queued').length);
