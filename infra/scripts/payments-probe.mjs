/**
 * Is the purchase path actually wired up in production?
 *
 * Sends a deliberately invalid purchase. No money is involved and nothing is
 * credited; the only thing being read is *which* refusal comes back:
 *
 *   503 STORE_VERIFICATION_UNAVAILABLE → no verifier configured for the
 *       platform. Every real purchase would fail the same way.
 *   402 PURCHASE_NOT_VERIFIED          → a verifier exists and rejected a
 *       forgery, which is what it is for.
 */
import { readFileSync } from 'node:fs';
const BASE = process.env.PLOTBREAK_API ?? 'http://localhost:4000';
const env = readFileSync('.env','utf8');
const SUPA=env.match(/^SUPABASE_URL=(.*)$/m)?.[1]?.trim().replace(/^["']|["']$/g,'');
const ANON=env.match(/^SUPABASE_ANON_KEY=(.*)$/m)?.[1]?.trim().replace(/^["']|["']$/g,'');
let token=`guest_${crypto.randomUUID()}`;
if(SUPA&&ANON){
  const su=await fetch(`${SUPA.replace(/\/$/,'')}/auth/v1/signup`,{method:'POST',
    headers:{apikey:ANON,authorization:`Bearer ${ANON}`,'content-type':'application/json'},body:'{}'});
  token=(await su.json()).access_token??token;
}
const H={authorization:`Bearer ${token}`,'content-type':'application/json'};

for (const platform of ['APP_STORE','SANDBOX','PLAY_STORE']) {
  const r = await fetch(`${BASE}/v1/store/purchases/sync`, {method:'POST', headers:H,
    body: JSON.stringify({ productId:'crd_2000', storeTransactionId:`probe_${crypto.randomUUID()}`,
      platform, receipt:'not-a-real-receipt' })});
  const body = await r.text();
  let code=''; try { code = JSON.parse(body).code ?? JSON.parse(body).error?.code ?? ''; } catch {}
  console.log(`${platform.padEnd(10)} → ${r.status} ${code}  ${body.slice(0,110).replace(/\s+/g,' ')}`);
}
// and the restore path
const r2 = await fetch(`${BASE}/v1/store/purchases/restore`, {method:'POST', headers:H,
  body: JSON.stringify({ platform:'APP_STORE', transactions: [] })});
console.log(`restore    → ${r2.status} ${(await r2.text()).slice(0,110)}`);
