import { buildServer } from './server.js';
import { assertProductionReady, loadConfig } from './context.js';
import { PostgresRepository } from './repo/postgres.js';

const config = loadConfig();

// Before anything binds a port: a production process with development auth
// would hand every account to anyone who knows a user id.
try {
  assertProductionReady(config);
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}

const app = buildServer({ logger: true });

// A database that is unreachable should stop the process here, not on the first
// player's first turn.
const ready =
  app.ctx.repo instanceof PostgresRepository
    ? app.ctx.repo.ping().catch((error: unknown) => {
        app.log.error(error, 'Cannot reach DATABASE_URL');
        process.exit(1);
      })
    : Promise.resolve();

ready
  .then(() => app.listen({ port: config.port, host: config.host }))
  .then(() => {
    app.log.info(
      {
        environment: config.environment,
        modelProvider: app.ctx.modelProvider ?? 'rule-based',
        persistence: app.ctx.repo instanceof PostgresRepository ? 'postgres' : 'in-process',
        auth: app.ctx.auth.name,
      },
      'Plotbreak API listening',
    );
  })
  .catch((error) => {
    app.log.error(error, 'Failed to start');
    process.exit(1);
  });

for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.on(signal, () => {
    // §37 — drain the analytics buffer before the process goes.
    //
    // The sink batches to memory and sends on a timer, so a deploy that
    // restarts the API mid-interval would drop whatever had not gone yet.
    // Bounded, and never allowed to hold the shutdown open: a stuck analytics
    // vendor must not be able to stop us from restarting.
    //
    // Wrapped rather than chained off `?.`: optional call short-circuits the
    // whole chain, so with a sink that has no `shutdown` — the console one, in
    // development — `app.close()` would never run and the process would hang on
    // Ctrl-C.
    void Promise.resolve(app.ctx.analytics.shutdown?.(3_000))
      .catch(() => undefined)
      .then(() => app.close())
      .then(() => process.exit(0));
  });
}
