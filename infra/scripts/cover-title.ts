/**
 * Moved to `packages/director/src/media/cover-title.ts`.
 *
 * It stopped being a script's helper the moment covers were drawn at runtime:
 * `services/api` cannot import from `infra/scripts`, and a second copy of the
 * wordmark treatment is a second cover style. Re-exported here so the two
 * scripts that already used it keep working.
 */
export { compositeTitle, type TitlePlate } from '@plotbreak/director';
