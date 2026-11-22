/**
 * What a story spec accepts for `publishedAt`: `null` until release, then the ISO
 * timestamp `infra/scripts/release-stories.ts` stamps into the fixture
 * (`new Date().toISOString()`).
 *
 * The new-50 specs used to pin it to null ("ships unpublished"), which turned
 * every one of them red the moment phase A stamped the fixture. A hand-written
 * date is still refused unless it is a real ISO 8601 date-time.
 */
const ISO_DATE_TIME = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2})$/;

export function isReleaseDate(value: string | null | undefined): boolean {
  if (value === null) return true;
  if (typeof value !== 'string' || !ISO_DATE_TIME.test(value)) return false;
  return !Number.isNaN(Date.parse(value));
}

/** The message every spec shows when `isReleaseDate` fails. */
export const RELEASE_DATE_RULE = 'publishedAt is null until release, then the ISO time release-stories stamps';
