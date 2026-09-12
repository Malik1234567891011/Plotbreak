/**
 * Put credits in somebody's wallet.
 *
 *   npm run grant                              # list wallets, newest activity first
 *   npm run grant -- --account=acc_x --amount=2000
 *   npm run grant -- --latest --amount=2000    # the wallet that moved most recently
 *   npm run grant -- --all-guests --amount=2000  # every guest wallet
 *
 * `--all-guests` exists because a playtest session leaves a dozen anonymous
 * wallets behind and there is no way to tell from the database which one is
 * the phone in somebody's hand. Crediting all of them is correct in a dev
 * database and wrong in a real one, so it refuses to run against a wallet
 * that belongs to a signed-in account.
 *
 * Appends a PROMO_GRANT to the same ledger the wallet reads, so the balance is
 * derived rather than set — there is no second source of truth to disagree
 * with. Idempotency-keyed, so a retried run does not double-credit.
 *
 * There was a `topUp` buried in playthrough.ts that granted to whichever
 * account had transacted most recently, which during a playtest session is a
 * harness guest rather than the person asking. Hence the listing: identify the
 * wallet first, then credit it by name.
 */
import { Pool } from 'pg';

interface WalletRow {
  account_id: string;
  user_id: string | null;
  display_name: string | null;
  is_guest: boolean | null;
  balance: string;
  entries: string;
  last_activity: Date;
}

async function main(): Promise<void> {
  if (!process.env.DATABASE_URL) {
    console.error('No DATABASE_URL. Run as `npm run grant`, which loads .env.');
    process.exit(1);
  }
  const argv = process.argv.slice(2);
  const flag = (name: string): string | undefined =>
    argv.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);
  const amount = Number(flag('amount') ?? 0);
  const account = flag('account');
  const latest = argv.includes('--latest');
  const allGuests = argv.includes('--all-guests');

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  try {
    // The balance is the newest entry's balance_after, per account.
    const { rows } = await pool.query<WalletRow>(`
      SELECT l.account_id,
             p.user_id::text        AS user_id,
             p.display_name,
             p.is_guest,
             (ARRAY_AGG(l.balance_after ORDER BY l.created_at DESC))[1]::text AS balance,
             COUNT(*)::text         AS entries,
             MAX(l.created_at)      AS last_activity
        FROM wallet_ledger l
        LEFT JOIN wallet_accounts a ON a.account_id = l.account_id
        LEFT JOIN profiles p ON p.user_id = a.user_id
       GROUP BY l.account_id, p.user_id, p.display_name, p.is_guest
       ORDER BY MAX(l.created_at) DESC
       LIMIT 12`);

    if (!amount) {
      console.log('\nbalance  entries  last activity        guest  who                      account');
      for (const r of rows) {
        const when = r.last_activity.toISOString().slice(0, 16).replace('T', ' ');
        console.log(
          `${String(r.balance).padStart(7)}  ${String(r.entries).padStart(7)}  ${when}  ` +
            `${String(r.is_guest ?? '?').padStart(5)}  ${(r.display_name ?? '—').padEnd(24)} ${r.account_id}`,
        );
      }
      console.log('\nPass --account=<id> --amount=<n> to credit one, or --latest --amount=<n>.');
      return;
    }

    if (allGuests) {
      // Guests only, and never a signed-in account — a bulk grant is a dev
      // convenience, not something that should ever touch a real wallet.
      const guests = rows.filter((r) => r.is_guest !== false);
      const named = rows.filter((r) => r.is_guest === false);
      if (named.length > 0) {
        console.log(`Skipping ${named.length} signed-in wallet(s); --all-guests is guests only.`);
      }
      for (const wallet of guests) {
        const before = Number(wallet.balance);
        await pool.query(
          `INSERT INTO wallet_ledger (entry_id, account_id, type, amount, balance_after, reason_code,
                                      reference_id, idempotency_key, metadata, created_at)
           VALUES ($1,$2,'PROMO_GRANT',$3,$4,'PROMO_GRANT',NULL,$5,'{"source":"grant-credits"}',now())`,
          [`led_${crypto.randomUUID()}`, wallet.account_id, amount, before + amount, `grant:${crypto.randomUUID()}`],
        );
        console.log(`  ${wallet.account_id}  ${before} -> ${before + amount}`);
      }
      console.log(`\n${guests.length} guest wallet(s) credited ${amount} each.`);
      return;
    }

    const target = account ?? (latest ? rows[0]?.account_id : undefined);
    if (!target) {
      console.error('Which wallet? Pass --account=<id>, or --latest for the most recent.');
      process.exit(1);
    }
    const current = rows.find((r) => r.account_id === target);
    if (!current) {
      console.error(`No wallet ${target}. Run without --amount to list them.`);
      process.exit(1);
    }

    const before = Number(current.balance);
    await pool.query(
      `INSERT INTO wallet_ledger (entry_id, account_id, type, amount, balance_after, reason_code,
                                  reference_id, idempotency_key, metadata, created_at)
       VALUES ($1,$2,'PROMO_GRANT',$3,$4,'PROMO_GRANT',NULL,$5,'{"source":"grant-credits"}',now())`,
      [`led_${crypto.randomUUID()}`, target, amount, before + amount, `grant:${crypto.randomUUID()}`],
    );
    console.log(
      `\n${current.display_name ?? target}: ${before} + ${amount} = ${before + amount} credits.`,
    );
  } finally {
    await pool.end();
  }
}

void main().catch((error) => {
  console.error(error);
  process.exit(1);
});
