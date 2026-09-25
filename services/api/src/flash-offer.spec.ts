import { describe, expect, it } from 'vitest';
import { FLASH_OFFER, FLASH_OFFER_WINDOW_HOURS, FLASH_OFFER_COOLDOWN_DAYS } from '@plotbreak/contracts';
import { MemoryRepository } from './repo/memory.js';
import { WalletService } from './wallet.js';

/**
 * The limited-time offer, and the thing that makes it honest.
 *
 * §3.8 forbids fake scarcity, so the window has to be real: opened by an event
 * the player caused, recorded in the append-only ledger, and enforced from that
 * row on the server. These tests exist to stop it quietly becoming a countdown
 * that restarts whenever somebody reopens the app — which is the version of
 * this feature that would be a lie.
 */
const HOUR = 3600 * 1000;
const DAY = 24 * HOUR;

/** A wallet whose clock we control. */
function walletAt(start: Date): { wallet: WalletService; setNow: (d: Date) => void; userId: string } {
  let now = start;
  const repo = new MemoryRepository();
  const wallet = new WalletService(repo, () => now);
  return { wallet, setNow: (d) => { now = d; }, userId: 'usr_flash' };
}

describe('the limited-time offer', () => {
  it('does not exist until the player runs out', async () => {
    const { wallet, userId } = walletAt(new Date('2026-09-25T10:00:00Z'));
    await wallet.grantNewUser(userId);
    expect(await wallet.flashOfferExpiresAt(userId)).toBeNull();
    expect((await wallet.getSummary(userId)).flashOfferExpiresAt).toBeNull();
  });

  it('opens at the wall and runs for the stated window', async () => {
    const start = new Date('2026-09-25T10:00:00Z');
    const { wallet, userId } = walletAt(start);
    await wallet.grantNewUser(userId);

    const expires = await wallet.openFlashOffer(userId);
    expect(expires).not.toBeNull();
    expect(expires!.getTime() - start.getTime()).toBe(FLASH_OFFER_WINDOW_HOURS * HOUR);
  });

  it('re-shows the same deadline rather than restarting it', async () => {
    const start = new Date('2026-09-25T10:00:00Z');
    const { wallet, setNow, userId } = walletAt(start);
    await wallet.grantNewUser(userId);
    const first = await wallet.openFlashOffer(userId);

    // Hitting the wall again two hours later must not buy another twelve.
    setNow(new Date(start.getTime() + 2 * HOUR));
    const second = await wallet.openFlashOffer(userId);
    expect(second!.toISOString()).toBe(first!.toISOString());
  });

  it('really lapses', async () => {
    const start = new Date('2026-09-25T10:00:00Z');
    const { wallet, setNow, userId } = walletAt(start);
    await wallet.grantNewUser(userId);
    await wallet.openFlashOffer(userId);

    setNow(new Date(start.getTime() + FLASH_OFFER_WINDOW_HOURS * HOUR + 1000));
    expect(await wallet.flashOfferExpiresAt(userId)).toBeNull();
  });

  it('cannot reopen inside the cooldown', async () => {
    const start = new Date('2026-09-25T10:00:00Z');
    const { wallet, setNow, userId } = walletAt(start);
    await wallet.grantNewUser(userId);
    await wallet.openFlashOffer(userId);

    // A day later: lapsed, and still not available again.
    setNow(new Date(start.getTime() + DAY));
    expect(await wallet.flashOfferExpiresAt(userId)).toBeNull();
    expect(await wallet.openFlashOffer(userId)).toBeNull();

    // After the cooldown it can run again.
    setNow(new Date(start.getTime() + FLASH_OFFER_COOLDOWN_DAYS * DAY + HOUR));
    expect(await wallet.openFlashOffer(userId)).not.toBeNull();
  });

  it('doubles the pack while open and charges normally after', async () => {
    const start = new Date('2026-09-25T10:00:00Z');
    const { wallet, setNow, userId } = walletAt(start);
    await wallet.grantNewUser(userId);
    await wallet.openFlashOffer(userId);

    const inside = await wallet.reconcilePurchase(userId, FLASH_OFFER.productId, 'tx_in', 'SANDBOX');
    expect(inside.credited).toBe(FLASH_OFFER.credits * 2);

    setNow(new Date(start.getTime() + FLASH_OFFER_WINDOW_HOURS * HOUR + 1000));
    const outside = await wallet.reconcilePurchase(userId, FLASH_OFFER.productId, 'tx_out', 'SANDBOX');
    expect(outside.credited).toBe(FLASH_OFFER.credits);
  });

  it('opening a window moves no credits', async () => {
    const { wallet, userId } = walletAt(new Date('2026-09-25T10:00:00Z'));
    await wallet.grantNewUser(userId);
    const before = await wallet.getBalance(userId);
    await wallet.openFlashOffer(userId);
    expect(await wallet.getBalance(userId)).toBe(before);
  });
});
