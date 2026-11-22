/**
 * Writes art-manifest entries without clobbering entries that other processes
 * wrote since this one started.
 *
 * generate-art used to load manifest.json once and write the whole object back
 * after every asset. With one process that is fine; with several stories' art
 * running in parallel in one checkout, the last writer erased everyone else's
 * entries. Now: take a lock file, re-read, merge, write, release.
 */
import { closeSync, openSync, readFileSync, statSync, unlinkSync, writeFileSync, existsSync } from 'node:fs';

export async function saveManifestEntry<T extends { assetKey: string }>(
  manifestPath: string,
  entry: T | null,
  /** Entries to add only if absent (bookkeeping catch-up for skipped assets). */
  catchUp: Record<string, T> = {},
): Promise<void> {
  const lock = `${manifestPath}.lock`;
  for (let i = 0; ; i++) {
    try {
      closeSync(openSync(lock, 'wx'));
      break;
    } catch {
      // A lock older than a minute belongs to a process that died holding it.
      try {
        if (Date.now() - statSync(lock).mtimeMs > 60_000) unlinkSync(lock);
      } catch {
        // Already released.
      }
      if (i > 1200) throw new Error(`${lock} stayed held for two minutes`);
      await new Promise((r) => setTimeout(r, 100));
    }
  }
  try {
    const current = existsSync(manifestPath)
      ? (JSON.parse(readFileSync(manifestPath, 'utf8')) as Record<string, T>)
      : {};
    for (const [k, v] of Object.entries(catchUp)) if (!current[k]) current[k] = v;
    if (entry) current[entry.assetKey] = entry;
    writeFileSync(manifestPath, `${JSON.stringify(current, null, 2)}\n`);
  } finally {
    unlinkSync(lock);
  }
}
