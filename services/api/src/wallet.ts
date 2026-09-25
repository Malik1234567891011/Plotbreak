import type { LedgerEntry, LedgerEntryType, WalletSummary } from '@plotbreak/contracts';
import {
  GRANT_DAILY,
  GRANT_NEW_USER,
  firstPurchaseBonusFor,
  offerForProduct,
} from '@plotbreak/contracts';
import type { PurchaseTransaction, Repository } from './repo/types.js';

/**
 * Spec §20.7/§20.8 — the wallet service.
 *
 * Balance is *derived* from an append-only ledger, never from a mutable integer
 * (§20.7). Turn spend is two-phase: `TURN_RESERVE` makes credits unavailable,
 * then either `TURN_FINALIZE` or `TURN_RELEASE` settles it. The player is never
 * charged for a provider timeout, an invalid response, or a crash (§20.8) —
 * only for a turn that actually committed.
 *
 * Spec §32.3: no other module writes wallet tables. Everything goes through here.
 */

export class InsufficientCreditsError extends Error {
  constructor(
    readonly required: number,
    readonly balance: number,
  ) {
    super(`Insufficient credits: need ${required}, have ${balance}`);
    this.name = 'InsufficientCreditsError';
  }

  get shortfall(): number {
    return Math.max(0, this.required - this.balance);
  }
}

export interface Reservation {
  readonly reservationId: string;
  readonly accountId: string;
  readonly amount: number;
  readonly balanceAfter: number;
}

const RESERVE_TYPES: ReadonlySet<LedgerEntryType> = new Set(['TURN_RESERVE', 'MEDIA_RESERVE']);
const SETTLE_TYPES: ReadonlySet<LedgerEntryType> = new Set([
  'TURN_FINALIZE',
  'TURN_RELEASE',
  'MEDIA_FINALIZE',
  'MEDIA_RELEASE',
]);

export class WalletService {
  readonly #repo: Repository;
  readonly #now: () => Date;

  constructor(repo: Repository, now: () => Date = () => new Date()) {
    this.#repo = repo;
    this.#now = now;
  }

  /**
   * Settled balance: every entry's signed amount, summed. Reserves are negative
   * and stay negative until finalized (which is a no-op on balance) or released
   * (which adds the amount back).
   */
  async getBalance(accountId: string): Promise<number> {
    const entries = await this.#repo.listLedger(accountId);
    return entries.reduce((sum, entry) => sum + entry.amount, 0);
  }

  /** Credits currently held by reservations that have not settled. */
  async getReserved(accountId: string): Promise<number> {
    const entries = await this.#repo.listLedger(accountId);
    const settled = new Set(
      entries.filter((e) => SETTLE_TYPES.has(e.type)).map((e) => e.referenceId),
    );
    return entries
      .filter((e) => RESERVE_TYPES.has(e.type) && !settled.has(e.referenceId))
      .reduce((sum, entry) => sum + Math.abs(entry.amount), 0);
  }

  async getSummary(accountId: string): Promise<WalletSummary> {
    const entries = await this.#repo.listLedger(accountId);
    const balance = entries.reduce((sum, e) => sum + e.amount, 0);
    const reserved = await this.getReserved(accountId);

    const lifetimeGranted = entries
      .filter((e) => e.amount > 0 && e.type !== 'TURN_RELEASE' && e.type !== 'MEDIA_RELEASE')
      .reduce((sum, e) => sum + e.amount, 0);
    const lifetimeSpent = entries
      .filter((e) => e.type === 'TURN_RESERVE' || e.type === 'MEDIA_RESERVE' || e.type === 'FORK_FEE')
      .reduce((sum, e) => sum + Math.abs(e.amount), 0);

    const lastDaily = entries
      .filter((e) => e.type === 'DAILY_GRANT')
      .map((e) => new Date(e.createdAt))
      .sort((a, b) => b.getTime() - a.getTime())[0];

    const nextDaily = lastDaily ? nextServerDayBoundary(lastDaily) : null;
    const dailyClaimAvailable = !nextDaily || this.#now() >= nextDaily;

    const hasPurchased = entries.some((e) => e.type === 'PURCHASE');

    return {
      accountId,
      balance,
      reserved,
      lifetimeGranted,
      lifetimeSpent,
      dailyClaimAvailable,
      nextDailyClaimAt: nextDaily?.toISOString() ?? null,
      // Nothing expires any more. The 48-hour window this used to carry was
      // counted from signup, so it was spent on people who had not played yet
      // and was always gone by the wall at turn 10 — see
      // `firstPurchaseBonusAvailable` on the contract. Kept on the wire as null
      // so an older client reads "no countdown" rather than a missing field.
      firstPurchaseOfferExpiresAt: null,
      firstPurchaseBonusAvailable: !hasPurchased,
    };
  }

  /**
   * Appends an entry and stamps the running balance onto it. Idempotent on
   * `idempotencyKey`: a retry returns the entry the first call wrote rather than
   * granting twice.
   */
  async #append(
    accountId: string,
    type: LedgerEntryType,
    amount: number,
    reasonCode: string,
    referenceId: string | null,
    idempotencyKey: string | null,
    metadata: Record<string, unknown> = {},
  ): Promise<LedgerEntry> {
    if (idempotencyKey) {
      const existing = await this.#repo.findLedgerEntryByIdempotencyKey(accountId, idempotencyKey);
      if (existing) return existing;
    }

    const balanceAfter = (await this.getBalance(accountId)) + amount;
    const entry: LedgerEntry = {
      id: `led_${crypto.randomUUID()}`,
      accountId,
      type,
      amount,
      balanceAfter,
      reasonCode,
      referenceId,
      idempotencyKey,
      createdAt: this.#now().toISOString(),
      metadata,
    };
    await this.#repo.appendLedgerEntry(entry);
    return entry;
  }

  /**
   * `#append`, but the entry and its purchase record commit together.
   *
   * Same balance stamping and same idempotency as `#append`; the only
   * difference is the repo call, which the port makes atomic. A PURCHASE entry
   * that exists without its `purchase_transactions` row is unreconcilable, so
   * the two are never written separately.
   */
  async #appendPurchase(
    accountId: string,
    draft: {
      type: LedgerEntryType;
      amount: number;
      reasonCode: string;
      referenceId: string | null;
      idempotencyKey: string;
      metadata: Record<string, unknown>;
    },
    purchase: PurchaseTransaction,
  ): Promise<LedgerEntry> {
    const existing = await this.#repo.findLedgerEntryByIdempotencyKey(accountId, draft.idempotencyKey);
    if (existing) return existing;

    const entry: LedgerEntry = {
      id: `led_${crypto.randomUUID()}`,
      accountId,
      type: draft.type,
      amount: draft.amount,
      balanceAfter: (await this.getBalance(accountId)) + draft.amount,
      reasonCode: draft.reasonCode,
      referenceId: draft.referenceId,
      idempotencyKey: draft.idempotencyKey,
      createdAt: this.#now().toISOString(),
      metadata: draft.metadata,
    };
    await this.#repo.appendPurchase(entry, purchase);
    return entry;
  }

  /** Spec §20.8 phase 1. Throws rather than allowing a negative balance. */
  async reserve(
    accountId: string,
    amount: number,
    referenceId: string,
    type: 'TURN_RESERVE' | 'MEDIA_RESERVE' = 'TURN_RESERVE',
  ): Promise<Reservation> {
    if (amount <= 0) throw new Error('Reservation amount must be positive');

    const balance = await this.getBalance(accountId);
    if (balance < amount) throw new InsufficientCreditsError(amount, balance);

    // The reference id is the idempotency key: one turn, one reservation, even
    // if the client retries the POST.
    const entry = await this.#append(
      accountId,
      type,
      -amount,
      'TURN_SPEND',
      referenceId,
      `reserve:${referenceId}`,
    );

    return {
      reservationId: entry.id,
      accountId,
      amount,
      balanceAfter: entry.balanceAfter,
    };
  }

  /**
   * Spec §20.8 phase 2 — the turn committed. Recorded as a zero-amount entry so
   * the ledger shows the spend settling without moving the balance again.
   */
  async finalize(reservation: Reservation, type: 'TURN_FINALIZE' | 'MEDIA_FINALIZE' = 'TURN_FINALIZE'): Promise<void> {
    const referenceId = await this.#referenceFor(reservation);
    await this.#append(
      reservation.accountId,
      type,
      0,
      'TURN_COMMITTED',
      referenceId,
      `finalize:${referenceId}`,
      { reservedAmount: reservation.amount },
    );
  }

  /**
   * Spec §20.8 phase 2 — the turn failed. Credits go back. This is the path for
   * provider timeouts, invalid JSON, internal errors, and system-caused safety
   * failures; none of those are the player's fault (§20.8).
   */
  async release(
    reservation: Reservation,
    reasonCode: string,
    type: 'TURN_RELEASE' | 'MEDIA_RELEASE' = 'TURN_RELEASE',
  ): Promise<void> {
    const referenceId = await this.#referenceFor(reservation);
    await this.#append(
      reservation.accountId,
      type,
      reservation.amount,
      reasonCode,
      referenceId,
      `release:${referenceId}`,
    );
  }

  async #referenceFor(reservation: Reservation): Promise<string> {
    const entries = await this.#repo.listLedger(reservation.accountId);
    const entry = entries.find((e) => e.id === reservation.reservationId);
    return entry?.referenceId ?? reservation.reservationId;
  }

  async grant(
    accountId: string,
    type: LedgerEntryType,
    amount: number,
    idempotencyKey: string,
    metadata: Record<string, unknown> = {},
  ): Promise<LedgerEntry> {
    return this.#append(accountId, type, amount, type, null, idempotencyKey, metadata);
  }

  /** Spec §20.5 — 900 credits on account creation, once. */
  /**
   * The opening grant.
   *
   * `PLOTBREAK_DEV_GRANT` overrides it, and is refused unless the process is
   * also running on the in-process store — a playtest harness needs forty
   * turns in one account, and nothing that can mint credits should be one
   * environment variable away from doing it against a real database.
   */
  async grantNewUser(accountId: string): Promise<LedgerEntry> {
    const override = Number(process.env.PLOTBREAK_DEV_GRANT);
    const amount =
      Number.isFinite(override) && override > 0 && !process.env.DATABASE_URL
        ? Math.trunc(override)
        : GRANT_NEW_USER;
    return this.grant(accountId, 'NEW_USER_GRANT', amount, `new_user:${accountId}`);
  }

  /**
   * Spec §20.5 — 300 credits per server day. Never a streak that confiscates
   * anything the player already earned.
   */
  async claimDaily(accountId: string): Promise<{ granted: boolean; entry: LedgerEntry | null; nextAt: string | null }> {
    const summary = await this.getSummary(accountId);
    if (!summary.dailyClaimAvailable) {
      return { granted: false, entry: null, nextAt: summary.nextDailyClaimAt };
    }
    const day = serverDayKey(this.#now());
    const entry = await this.grant(accountId, 'DAILY_GRANT', GRANT_DAILY, `daily:${accountId}:${day}`);
    return {
      granted: true,
      entry,
      nextAt: nextServerDayBoundary(this.#now()).toISOString(),
    };
  }

  /**
   * Spec §33.5 — store reconciliation is idempotent on the platform transaction
   * id, so a replayed receipt never grants credits twice.
   */
  async reconcilePurchase(
    accountId: string,
    productId: string,
    storeTransactionId: string,
    platform: PurchaseTransaction['platform'],
    charged: { priceLocal: number | null; currency: string | null } = { priceLocal: null, currency: null },
  ): Promise<{ credited: number; duplicate: boolean; entry: LedgerEntry | null }> {
    const offer = offerForProduct(productId);
    if (!offer) return { credited: 0, duplicate: false, entry: null };

    const key = `purchase:${platform}:${storeTransactionId}`;
    const existing = await this.#repo.findLedgerEntryByIdempotencyKey(accountId, key);
    if (existing) return { credited: 0, duplicate: true, entry: existing };

    // Whether this is the account's first purchase, read *before* the ledger
    // write below — the row this call is about to append is itself a PURCHASE,
    // so asking afterwards would always answer "no" and the bonus would never
    // be paid to anyone.
    const ledger = await this.#repo.listLedger(accountId);
    const alreadyPurchased = ledger.some((entry) => entry.type === 'PURCHASE');
    const bonusCredits = offer.bonusCredits + firstPurchaseBonusFor(offer, alreadyPurchased);

    // The credit and the receipt, written in one transaction. §33.5 wants a
    // `purchase_transactions` row per purchase so the money can be reconciled
    // against the store's own reports; going through `#append` instead wrote
    // the ledger alone and left that table empty through two releases, which
    // is invisible until the first chargeback nobody can trace.
    const entry = await this.#appendPurchase(
      accountId,
      {
        type: 'PURCHASE',
        amount: offer.credits,
        reasonCode: 'STORE_PURCHASE',
        referenceId: storeTransactionId,
        idempotencyKey: key,
        metadata: { productId, platform, referencePriceUsd: offer.referencePriceUsd },
      },
      {
        transactionId: `pt_${crypto.randomUUID()}`,
        accountId,
        platform,
        storeTransactionId,
        productId,
        creditsGranted: offer.credits,
        bonusGranted: bonusCredits,
        priceLocal: charged.priceLocal,
        currency: charged.currency,
        // The route only reaches here on a verdict the store signed off on.
        status: 'VERIFIED',
        createdAt: this.#now().toISOString(),
      },
    );

    if (bonusCredits > 0) {
      await this.#append(
        accountId,
        'BONUS',
        bonusCredits,
        'STORE_PURCHASE_BONUS',
        storeTransactionId,
        `${key}:bonus`,
        { productId },
      );
    }

    return { credited: offer.credits + bonusCredits, duplicate: false, entry };
  }

  /**
   * Spec §20.10 — the fork fee is a single charge, not a reservation.
   *
   * `idempotencyKey` is the caller's, and it matters: this used to build
   * `fork:${sessionId}:${crypto.randomUUID()}`, a fresh UUID on every call,
   * which makes the ledger's uniqueness index structurally incapable of
   * catching a replay. A retried request — a flaky network, a double tap —
   * charged 120 credits twice for one fork. Every other spend path in this file
   * passes a key that means something.
   */
  async chargeFork(
    accountId: string,
    sessionId: string,
    amount: number,
    idempotencyKey: string,
  ): Promise<LedgerEntry> {
    const balance = await this.getBalance(accountId);
    if (balance < amount) throw new InsufficientCreditsError(amount, balance);
    return this.#append(accountId, 'FORK_FEE', -amount, 'TIMELINE_FORK', sessionId, idempotencyKey);
  }

  /**
   * Give back a fork fee whose fork did not happen.
   *
   * The charge is single-phase by design, so there is no reservation to
   * release — the compensating entry is the only way back. Without it, a throw
   * anywhere between the debit and the last inherited turn left the player
   * paying for a branch that does not exist.
   */
  async refundFork(accountId: string, sessionId: string, amount: number, idempotencyKey: string): Promise<LedgerEntry> {
    return this.#append(
      accountId,
      'REFUND',
      amount,
      'TIMELINE_FORK_FAILED',
      sessionId,
      `refund:${idempotencyKey}`,
    );
  }

  /**
   * Charge for compiling a world or re-rolling one of its fields.
   *
   * Single-phase like the fork fee, and for the same reason: there is nothing
   * to meter afterwards. If the generation throws, `refundCreate` is the only
   * way back, so every caller that charges must also be prepared to give it up.
   */
  async chargeCreate(
    accountId: string,
    draftId: string,
    amount: number,
    idempotencyKey: string,
    reasonCode: 'STORY_COMPILE' | 'STORY_ASSIST',
  ): Promise<LedgerEntry> {
    const balance = await this.getBalance(accountId);
    if (balance < amount) throw new InsufficientCreditsError(amount, balance);
    return this.#append(accountId, 'CREATE_FEE', -amount, reasonCode, draftId, idempotencyKey);
  }

  async refundCreate(
    accountId: string,
    draftId: string,
    amount: number,
    idempotencyKey: string,
  ): Promise<LedgerEntry> {
    return this.#append(
      accountId,
      'REFUND',
      amount,
      'STORY_GENERATION_FAILED',
      draftId,
      `refund:${idempotencyKey}`,
    );
  }

  async listLedger(accountId: string, limit = 50, cursor?: string): Promise<{ entries: LedgerEntry[]; nextCursor: string | null }> {
    const all = (await this.#repo.listLedger(accountId)).slice().reverse();
    const start = cursor ? all.findIndex((e) => e.id === cursor) + 1 : 0;
    const page = all.slice(start, start + limit);
    const next = start + limit < all.length ? (page.at(-1)?.id ?? null) : null;
    return { entries: page, nextCursor: next };
  }
}

/** Server-defined daily boundary: 00:00 UTC, consistent for every player. */
function serverDayKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function nextServerDayBoundary(from: Date): Date {
  const next = new Date(from);
  next.setUTCHours(0, 0, 0, 0);
  next.setUTCDate(next.getUTCDate() + 1);
  return next;
}
