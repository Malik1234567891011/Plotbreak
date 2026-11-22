// Cover style v2: the four test stories' full cover prompts, and a side-folder generator.
//
//   npx tsx docs/stories-50/tools/cover-style-v2.mts                 # print the prompts (markdown), no API call
//   npx tsx --env-file=.env docs/stories-50/tools/cover-style-v2.mts --generate [--only=<storyId>]
//
// --generate draws each cover exactly as generate-art.ts would (generatedCoverPrompt, Tsubaki.3 pro,
// 1152x1744, DEFAULT_NEGATIVE, ~4,400 credits each) but writes docs/stories-50/cover-style-v2/<storyId>.png,
// never infra/seed/assets/*/cover.*, and never touches the manifest. Ledger label: cover-style-v2:<storyId>.
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  MARRIED_TO_THE_SHRINE_FOX,
  SEVEN_YEARS_EARLY,
  THE_MAID_OWNS_THE_HOUSE_NOW,
  THE_ONE_COPPER_INN,
} from '@plotbreak/test-fixtures';
import { generatedCoverPrompt } from '@plotbreak/director';
import { COVER, PIXAI_SIZE, pixaiGenerate } from '../../../infra/scripts/pixai.js';

const OUT = resolve(dirname(fileURLToPath(import.meta.url)), '../cover-style-v2');
const STORIES = [MARRIED_TO_THE_SHRINE_FOX, THE_ONE_COPPER_INN, THE_MAID_OWNS_THE_HOUSE_NOW, SEVEN_YEARS_EARLY];

const args = process.argv.slice(2);
const only = args.find((a) => a.startsWith('--only='))?.slice('--only='.length);
const picked = STORIES.filter((s) => !only || s.storyId === only);

if (!args.includes('--generate')) {
  for (const story of picked) {
    const spec = generatedCoverPrompt(story, story.title);
    console.log(`### ${story.title} (\`${story.storyId}\`, ${spec.prompt.length} chars)\n\n\`\`\`text\n${spec.prompt}\n\`\`\`\n`);
  }
} else {
  await mkdir(OUT, { recursive: true });
  for (const story of picked) {
    const spec = generatedCoverPrompt(story, story.title);
    const r = await pixaiGenerate({ prompt: spec.prompt, ...COVER, ...PIXAI_SIZE.COVER, label: `cover-style-v2:${story.storyId}` });
    const file = join(OUT, `${story.storyId}.png`);
    await writeFile(file, r.png);
    console.log(`${story.storyId}: ${r.width}x${r.height}, ${r.paidQuota} credits -> ${file}`);
  }
}
