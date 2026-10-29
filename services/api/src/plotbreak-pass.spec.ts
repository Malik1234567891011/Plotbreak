import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { GRANT_DAILY, PASS_DAILY_CREDITS, PASS_PRODUCT_ID } from '@plotbreak/contracts';
import { createDefaultPipeline, RuleBasedModerator } from '@plotbreak/director';
import { JobQueue } from '@plotbreak/worker';
import { NoopSink } from '@plotbreak/analytics';
import { buildServer } from './server.js';
import { loadConfig } from './context.js';
import { MemoryRepository } from './repo/memory.js';
import { WalletService } from './wallet.js';
import { DevTokenVerifier, devUserId } from './auth.js';
import { createStoreVerifierFromEnv } from './store-verifier.js';
import type { AppContext } from './context.js';

/**
 * Plotbreak Pass: a weekly subscription that pays 400 credits a day.
 *
 * What matters is that it pays exactly once a day while it is live, never
 * after it lapses, and that buying it is never mistaken for a credit pack.
 */
const HOUR = 3600 * 1000;
const DAY = 24 * HOUR;

type Server = FastifyInstance & { ctx: AppContext };

const TOKEN = 'member_pass_holder';
const USER = devUserId(TOKEN);
const auth = { authorization: `Bearer ${TOKEN}` };

/**
 * Today at 10:00 UTC. The sandbox verifier stamps a week from the real clock,
 * so the wallet's clock has to start near it for "eight days later" to mean
 * lapsed.
 */
function todayAtTen(): Date {
  const d = new Date();
  d.setUTCHours(10, 0, 0, 0);
  return d;
}

let now = todayAtTen();
let ctx: AppContext;
let app: Server;

function makeContext(): AppContext {
  const repo = new MemoryRepository();
  const config = loadConfig({ PORT: '4000' } as NodeJS.ProcessEnv);
  return {
    config,
    repo,
    wallet: new WalletService(repo, () => now),
    pipeline: createDefaultPipeline(),
    modelProvider: null,
    modelGateway: null,
    mediaGateway: null,
    analytics: new NoopSink(),
    jobs: new JobQueue(),
    auth: new DevTokenVerifier(),
    moderator: new RuleBasedModerator(),
    rateLimiter: { check: () => ({ allowed: true, retryAfterSeconds: 0, limit: 1e6, remaining: 1e6 }) },
    storeVerifier: createStoreVerifierFromEnv(config, {} as NodeJS.ProcessEnv),
  };
}

beforeEach(() => {
  now = todayAtTen();
  ctx = makeContext();
  app = buildServer({ ctx }) as Server;
});

afterEach(async () => {
  await app.close();
});

/** `days` after the test clock, as Apple would send it. */
function later(days: number): string {
  return new Date(now.getTime() + days * DAY).toISOString();
}

async function buyPass(transactionId = 'sandbox_pass_1') {
  return app.inject({
    method: 'POST',
    url: '/v1/store/purchases/sync',
    headers: auth,
    payload: { productId: PASS_PRODUCT_ID, storeTransactionId: transactionId, platform: 'SANDBOX', receipt: null },
  });
}

describe('Plotbreak Pass', () => {
  it('pays today’s credits the moment it is bought, and is not a credit pack', async () => {
    await app.inject({ method: 'GET', url: '/v1/wallet', headers: auth });
    const before = await ctx.wallet.getBalance(USER);

    const response = await buyPass();
    expect(response.statusCode).toBe(200);
    expect(response.json().credited).toBe(PASS_DAILY_CREDITS);
    expect(await ctx.wallet.getBalance(USER)).toBe(before + PASS_DAILY_CREDITS);

    const ledger = await ctx.repo.listLedger(USER);
    expect(ledger.some((e) => e.type === 'PURCHASE')).toBe(false);
    expect(ledger.filter((e) => e.type === 'SUBSCRIPTION_GRANT')).toHaveLength(1);

    const wallet = (await app.inject({ method: 'GET', url: '/v1/wallet', headers: auth })).json().wallet;
    expect(wallet.pass.active).toBe(true);
    expect(wallet.pass.bonusClaimedToday).toBe(true);
    // A subscription is not a purchase, so the doubled starter is still waiting.
    expect(wallet.firstPurchaseBonusAvailable).toBe(true);
  });

  it('pays once a day, alongside the free daily, never twice', async () => {
    await buyPass();
    const balance = () => ctx.wallet.getBalance(USER);

    // Same day: the free 300 lands, the Pass 400 already did.
    const sameDay = await app.inject({ method: 'POST', url: '/v1/wallet/daily-claim', headers: auth });
    expect(sameDay.json()).toMatchObject({ granted: true, amount: GRANT_DAILY });
    const afterFirstDay = await balance();

    // A redelivered transaction pays nothing more.
    expect((await buyPass()).json().credited).toBe(0);
    expect(await balance()).toBe(afterFirstDay);

    // Next day: both again.
    now = new Date(now.getTime() + DAY);
    const nextDay = await app.inject({ method: 'POST', url: '/v1/wallet/daily-claim', headers: auth });
    expect(nextDay.json()).toMatchObject({ granted: true, amount: GRANT_DAILY, passAmount: PASS_DAILY_CREDITS });
    expect(await balance()).toBe(afterFirstDay + GRANT_DAILY + PASS_DAILY_CREDITS);

    // Claiming again that day pays neither.
    const again = await app.inject({ method: 'POST', url: '/v1/wallet/daily-claim', headers: auth });
    expect(again.json()).toMatchObject({ granted: false, passAmount: PASS_DAILY_CREDITS });
    expect(await balance()).toBe(afterFirstDay + GRANT_DAILY + PASS_DAILY_CREDITS);
  });

  it('stops paying when the week runs out', async () => {
    await buyPass();
    now = new Date(now.getTime() + 8 * DAY);
    const claim = await app.inject({ method: 'POST', url: '/v1/wallet/daily-claim', headers: auth });
    expect(claim.json().passAmount).toBe(0);
    const wallet = (await app.inject({ method: 'GET', url: '/v1/wallet', headers: auth })).json().wallet;
    expect(wallet.pass.active).toBe(false);
  });

  it('never moves an expiry backwards when an old transaction is redelivered', async () => {
    await ctx.wallet.recordSubscription({
      originalTransactionId: 'otx_1', userId: USER, productId: PASS_PRODUCT_ID, platform: 'APP_STORE',
      environment: 'PRODUCTION', expiresAt: later(14), revokedAt: null,
    });
    await ctx.wallet.recordSubscription({
      originalTransactionId: 'otx_1', userId: USER, productId: PASS_PRODUCT_ID, platform: 'APP_STORE',
      environment: 'PRODUCTION', expiresAt: later(3), revokedAt: null,
    });
    expect((await ctx.wallet.passStatus(USER)).expiresAt).toBe(later(14));
  });

  it('a refunded pass pays nothing', async () => {
    await ctx.wallet.recordSubscription({
      originalTransactionId: 'otx_r', userId: USER, productId: PASS_PRODUCT_ID, platform: 'APP_STORE',
      environment: 'PRODUCTION', expiresAt: later(5), revokedAt: later(-0.1),
    });
    expect((await ctx.wallet.passStatus(USER)).active).toBe(false);
    expect(await ctx.wallet.grantPassDaily(USER)).toBeNull();
  });
});

describe('story requests', () => {
  const post = (body: string) =>
    app.inject({ method: 'POST', url: '/v1/story-requests', headers: auth, payload: { body } });

  it('are for Pass holders only', async () => {
    const refused = await post('A ronin who can only fight on rainy days.');
    expect(refused.statusCode).toBe(403);
    expect(refused.json().code).toBe('PASS_REQUIRED');

    const board = (await app.inject({ method: 'GET', url: '/v1/story-requests', headers: auth })).json();
    expect(board.canParticipate).toBe(false);
  });

  it('one a week, ranked by votes', async () => {
    await buyPass();
    expect((await post('A ronin who can only fight on rainy days.')).statusCode).toBe(201);

    const second = await post('A second idea, too soon after the first.');
    expect(second.statusCode).toBe(429);

    let board = (await app.inject({ method: 'GET', url: '/v1/story-requests', headers: auth })).json();
    expect(board.requests).toHaveLength(1);
    expect(board.requests[0]).toMatchObject({ mine: true, votes: 0, votedByMe: false });
    expect(board.nextRequestAt).not.toBeNull();

    const id = board.requests[0].id;
    await app.inject({ method: 'POST', url: `/v1/story-requests/${id}/vote`, headers: auth, payload: { voted: true } });
    board = (await app.inject({ method: 'GET', url: '/v1/story-requests', headers: auth })).json();
    expect(board.requests[0]).toMatchObject({ votes: 1, votedByMe: true });

  });

  it('refuses a pitch that is too long', async () => {
    await buyPass();
    expect((await post('x'.repeat(281))).statusCode).toBe(400);
  });
});
