const BASE='http://localhost:4000';
import { readFileSync } from 'node:fs';
const env = readFileSync('.env','utf8');
const SUPA = env.match(/^SUPABASE_URL=(.*)$/m)[1].trim().replace(/^["']|["']$/g,'');
const ANON = env.match(/^SUPABASE_ANON_KEY=(.*)$/m)[1].trim().replace(/^["']|["']$/g,'');
const su = await fetch(`${SUPA.replace(/\/$/,'')}/auth/v1/signup`, { method:'POST', headers:{ apikey:ANON, authorization:`Bearer ${ANON}`, 'content-type':'application/json' }, body:'{}' });
const tok = (await su.json()).access_token;
const H = { authorization:`Bearer ${tok}`, 'content-type':'application/json' };
const call = async (m,p,b,x={}) => {
  const r = await fetch(BASE+p,{method:m,headers:{...H,...x},body:b===undefined?undefined:JSON.stringify(b)});
  const t = await r.text(); if(!r.ok) throw new Error(`${m} ${p} ${r.status} ${t.slice(0,200)}`); return JSON.parse(t);
};
const detail = await call('GET','/v1/stories/story_ace');
const s = await call('POST','/v1/stories/story_ace/sessions',{ identity:{ displayName: detail.protagonist.name, pronouns: detail.protagonist.pronouns, archetypeId: detail.archetypes[0].id, advanced:{} }, locale:'en' });
const sid = s.session.sessionId;
const card = (s.suggestions??[])[0];
console.log('card:', card?.text?.slice(0,70));
const acc = await call('POST',`/v1/sessions/${sid}/turns`,{ actionText: card.text, qualityTier:'VIVID', sessionRevision: s.revision ?? 0, selectedSuggestionId: card.id ?? null, voicePreferred:false },{ 'idempotency-key': crypto.randomUUID() });
console.log('accept keys:', Object.keys(acc).join(','));
console.log('streamUrl:', acc.streamUrl);
const su2 = new URL(acc.streamUrl.startsWith('http')?acc.streamUrl:BASE+acc.streamUrl);
su2.protocol='http:'; su2.host='localhost:4000';
if (acc.streamToken) su2.searchParams.set('token', acc.streamToken);
const res = await fetch(su2, { headers:{ authorization:`Bearer ${tok}` }});
const rd = res.body.getReader(); const dec = new TextDecoder(); let buf='';
const t0 = Date.now();
const seen = [];
while (true) {
  const { value, done } = await rd.read(); if (done) break;
  buf += dec.decode(value,{stream:true});
  let i;
  while ((i = buf.indexOf('\n\n')) >= 0) {
    const chunk = buf.slice(0,i); buf = buf.slice(i+2);
    const ev = chunk.match(/^event:\s*(.+)$/m)?.[1];
    const dl = chunk.match(/^data:\s*(.+)$/m)?.[1];
    if (!ev) continue;
    seen.push(ev);
    if (ev.startsWith('reaction') || ev.startsWith('media') || ev==='turn.completed' || ev==='turn.failed')
      console.log(`+${((Date.now()-t0)/1000).toFixed(1)}s  ${ev}  ${ev==='reaction.ready' ? (dl??'') : (dl??'').slice(0,120)}`);
  }
  if (seen.includes('media.completed')||seen.includes('media.failed')) break;
}
console.log('\nevent counts:', JSON.stringify(seen.reduce((a,e)=>(a[e]=(a[e]||0)+1,a),{})));
