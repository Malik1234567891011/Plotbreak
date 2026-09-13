/**
 * An end-to-end purchase, through the real endpoint, against the sandbox
 * verifier. No money and no App Store: what is being tested is everything our
 * side owns — verification refusals, the ledger arithmetic, the bonus, and
 * whether a replayed transaction can be made to pay twice.
 */
import { readFileSync } from 'node:fs';
const BASE = process.env.PLOTBREAK_API ?? 'http://localhost:4000';
const env=readFileSync('.env','utf8');
const SUPA=env.match(/^SUPABASE_URL=(.*)$/m)?.[1]?.trim().replace(/^["']|["']$/g,'');
const ANON=env.match(/^SUPABASE_ANON_KEY=(.*)$/m)?.[1]?.trim().replace(/^["']|["']$/g,'');
const su=await fetch(`${SUPA.replace(/\/$/,'')}/auth/v1/signup`,{method:'POST',headers:{apikey:ANON,authorization:`Bearer ${ANON}`,'content-type':'application/json'},body:'{}'});
const token=(await su.json()).access_token;
const H={authorization:`Bearer ${token}`,'content-type':'application/json'};
const sync=(b)=>fetch(`${BASE}/v1/store/purchases/sync`,{method:'POST',headers:H,body:JSON.stringify(b)});
const balance=async()=>{const r=await fetch(`${BASE}/v1/wallet`,{headers:H});const j=await r.json().catch(()=>({}));return j.balance ?? j.credits ?? JSON.stringify(j).slice(0,60);};

const OFFERS=[['crd_2000',2000,0],['crd_10000',10000,300],['crd_20000',20000,1000],['crd_50000',50000,3500],['crd_100000',100000,10000],['crd_first_21000',21000,null]];
console.log('start balance:', await balance());
let expected = 0;
for (const [pid, credits, bonus] of OFFERS) {
  const tx=`sandbox_${crypto.randomUUID().replace(/-/g,'')}`;
  const r=await sync({productId:pid,storeTransactionId:tx,platform:'SANDBOX',receipt:'sandbox'});
  const j=await r.json();
  const after=await balance();
  console.log(`  ${pid.padEnd(16)} → ${r.status} credited=${String(j.credited).padStart(6)} duplicate=${j.duplicate} balance=${j.balance ?? after}`);
  // replay the same transaction id: must credit nothing
  const again=await sync({productId:pid,storeTransactionId:tx,platform:'SANDBOX',receipt:'sandbox'});
  const j2=await again.json();
  console.log(`  ${''.padEnd(16)}   replay → ${again.status} credited=${j2.credited} duplicate=${j2.duplicate} balance=${j2.balance}`);
}
console.log('\n-- forgery and abuse cases --');
const cases=[
  ['not a sandbox id',   {productId:'crd_100000',storeTransactionId:'totally-made-up',platform:'SANDBOX',receipt:'x'}],
  ['unknown product',    {productId:'crd_9999999',storeTransactionId:`sandbox_${crypto.randomUUID().replace(/-/g,'')}`,platform:'SANDBOX',receipt:'x'}],
  ['wrong platform',     {productId:'crd_2000',storeTransactionId:`sandbox_${crypto.randomUUID().replace(/-/g,'')}`,platform:'APP_STORE',receipt:'x'}],
  ['malformed body',     {productId:'crd_2000'}],
];
for (const [label, body] of cases) {
  const r=await sync(body); const t=await r.text();
  let j={}; try{j=JSON.parse(t);}catch{}
  console.log(`  ${label.padEnd(20)} → ${r.status} ${j.code ?? ''} credited=${j.credited ?? '-'}`);
}
console.log('\nfinal balance:', await balance());
