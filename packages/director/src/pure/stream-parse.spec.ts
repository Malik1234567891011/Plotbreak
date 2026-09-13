import { describe, expect, it } from 'vitest';
import { NarrativeStreamParser } from './stream-parse.js';

/** Feeds a document in slices of `size`, the way a provider would. */
function stream(doc: string, size: number) {
  const parser = new NarrativeStreamParser();
  const out = [];
  for (let i = 0; i < doc.length; i += size) out.push(...parser.push(doc.slice(i, i + size)));
  return out;
}

const DOC = JSON.stringify({
  narrative: [
    { speaker: 'narration', text: 'You step off the log.' },
    { speaker: 'sabo', text: 'He said "run", and you did not.' },
    { speaker: 'luffy', text: 'A { brace } and a \\ backslash walk in.' },
  ],
  locationId: 'mt_colubo',
  sceneSummary: 'done',
});

describe('narrative stream parser', () => {
  it('hands over each block as it closes, whatever the chunk size', () => {
    for (const size of [1, 3, 7, 50, 5000]) {
      const blocks = stream(DOC, size);
      expect(blocks.map((b) => b.speaker)).toEqual(['narration', 'sabo', 'luffy']);
      expect(blocks[1]!.text).toBe('He said "run", and you did not.');
      expect(blocks[2]!.text).toBe('A { brace } and a \\ backslash walk in.');
    }
  });

  it('emits a block before the document is finished', () => {
    const parser = new NarrativeStreamParser();
    const partial = '{"narrative":[{"speaker":"sabo","text":"First."},{"speaker":"luffy","text":"Sec';
    const blocks = parser.push(partial);
    // The first has closed; the second has not, and is not guessed at.
    expect(blocks).toHaveLength(1);
    expect(blocks[0]).toEqual({ speaker: 'sabo', text: 'First.' });
  });

  it('is not fooled by braces, brackets or quotes inside the prose', () => {
    const doc = '{"narrative":[{"speaker":"narration","text":"He wrote ] and { and \\" on the wall."}],"x":1}';
    expect(stream(doc, 4)).toEqual([{ speaker: 'narration', text: 'He wrote ] and { and " on the wall.' }]);
  });

  it('stops at the end of the narrative array and ignores later objects', () => {
    const doc = '{"narrative":[{"speaker":"sabo","text":"Only me."}],"reaction":{"characterId":"luffy","emotion":"warm"}}';
    expect(stream(doc, 6)).toEqual([{ speaker: 'sabo', text: 'Only me.' }]);
  });

  it('reports nothing rather than throwing on junk', () => {
    const parser = new NarrativeStreamParser();
    expect(() => parser.push('not json at all, just prose')).not.toThrow();
    expect(parser.push('still nothing')).toEqual([]);
  });

  it('skips a malformed block without losing the ones around it', () => {
    const doc = '{"narrative":[{"speaker":"sabo","text":"Good."},{"speaker":},{"speaker":"luffy","text":"Also good."}]}';
    const blocks = stream(doc, 5);
    expect(blocks.map((b) => b.text)).toEqual(['Good.', 'Also good.']);
  });

  it('counts what it has handed out, so the caller can avoid re-sending it', () => {
    const parser = new NarrativeStreamParser();
    parser.push(DOC);
    expect(parser.emitted).toBe(3);
  });
});
