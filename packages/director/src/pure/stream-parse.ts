/**
 * Pulls complete narrative blocks out of a structured response while it is
 * still being written.
 *
 * The model streams one JSON document. Until the final brace arrives it is
 * syntactically incomplete, so this tracks just enough state — string, escape,
 * depth — to know when one `{ "speaker": ..., "text": ... }` inside the
 * `narrative` array has closed, and hands that object over. It is a scanner,
 * not a regex, because the text being scanned is prose full of braces, quotes
 * and apostrophes.
 *
 * It never throws. Anything it cannot make sense of it simply stops reporting,
 * and the caller falls back to parsing the completed document — streaming is a
 * latency optimisation and must never become a way for a turn to fail.
 */

export interface StreamedBlock {
  readonly speaker: string;
  readonly text: string;
}

export class NarrativeStreamParser {
  #buffer = '';
  /** Index into `#buffer` we have already scanned. */
  #cursor = 0;
  /** Where the `narrative` array starts, once found. */
  #arrayStart = -1;
  /** Start of the object currently being read, or -1 between objects. */
  #objectStart = -1;
  #depth = 0;
  #inString = false;
  #escaped = false;
  #done = false;
  #emitted = 0;

  /** How many blocks have been handed out so far. */
  get emitted(): number {
    return this.#emitted;
  }

  /**
   * Feeds another slice of the response and returns any blocks that became
   * complete. Safe to call with partial multi-byte-free text of any size.
   */
  push(chunk: string): StreamedBlock[] {
    if (this.#done) return [];
    this.#buffer += chunk;
    const out: StreamedBlock[] = [];

    try {
      if (this.#arrayStart === -1) {
        // `"narrative"` then a colon then `[`, with whatever whitespace.
        const key = this.#buffer.indexOf('"narrative"');
        if (key === -1) return out;
        const open = this.#buffer.indexOf('[', key);
        if (open === -1) return out;
        this.#arrayStart = open;
        this.#cursor = open + 1;
      }

      for (; this.#cursor < this.#buffer.length; this.#cursor += 1) {
        const ch = this.#buffer[this.#cursor]!;

        if (this.#inString) {
          if (this.#escaped) this.#escaped = false;
          else if (ch === '\\') this.#escaped = true;
          else if (ch === '"') this.#inString = false;
          continue;
        }

        if (ch === '"') {
          this.#inString = true;
          continue;
        }
        if (ch === '{') {
          if (this.#depth === 0) this.#objectStart = this.#cursor;
          this.#depth += 1;
          continue;
        }
        if (ch === '}') {
          this.#depth -= 1;
          if (this.#depth === 0 && this.#objectStart >= 0) {
            const raw = this.#buffer.slice(this.#objectStart, this.#cursor + 1);
            this.#objectStart = -1;
            const block = coerce(raw);
            if (block) {
              this.#emitted += 1;
              out.push(block);
            }
          }
          continue;
        }
        // The array closed: everything after this belongs to other fields.
        if (ch === ']' && this.#depth === 0) {
          this.#done = true;
          break;
        }
      }
    } catch {
      // Whatever happened, the completed document is still authoritative.
      this.#done = true;
    }
    return out;
  }
}

function coerce(raw: string): StreamedBlock | null {
  try {
    const parsed = JSON.parse(raw) as { speaker?: unknown; text?: unknown };
    if (typeof parsed.text !== 'string' || parsed.text.length === 0) return null;
    return { speaker: typeof parsed.speaker === 'string' ? parsed.speaker : 'narration', text: parsed.text };
  } catch {
    return null;
  }
}
