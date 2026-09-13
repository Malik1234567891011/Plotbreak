/**
 * Measures two things the reviewed transcript got wrong: who the client thinks
 * is speaking, and who the metadata says is standing there.
 *
 * Both are judged against the prose the same model just wrote, so the output is
 * printed in full for a human read — a detector that agrees with itself proves
 * nothing.
 *
 *   npm run attribution-probe -- --only=attribution
 */
import { writeFileSync } from 'node:fs';
import { ACE } from '@plotbreak/test-fixtures';
import { createInitialState } from '@plotbreak/engine';
import { runTurnPure, OpenAiGateway } from '@plotbreak/director';
import type { GameState } from '@plotbreak/contracts';

interface Scene {
  readonly id: string;
  readonly what: string;
  readonly setup?: readonly string[];
  readonly action: string;
  /** Who the prose should end with in the scene, for a human to check against. */
  readonly expect: string;
}

const ATTRIBUTION: Scene[] = [
  { id: 'A1-sabo', what: 'Sabo, two-hander', action: 'I ask Sabo straight out whether he actually plans to stay on this island.', expect: 'Sabo speaks; his lines are dialogue blocks' },
  { id: 'A2-luffy', what: 'Luffy, loud and interrupting', action: 'I tell Luffy he is too small to come with us and I mean it.', expect: 'Luffy speaks, probably several times' },
  { id: 'A3-dadan', what: 'Dadan, shouting', setup: ['I walk down to Dadan’s house and kick the door open.'], action: 'I tell Dadan we are not coming back tonight and she can do what she likes about it.', expect: 'Dadan shouts; every shout attributed' },
  { id: 'A4-garp', what: 'Garp, arriving', setup: ['I hear something enormous coming up the path toward the house.'], action: 'I stand my ground and wait to see who it is.', expect: 'Garp speaks on arrival' },
  { id: 'A5-mixed', what: 'Four-way argument', setup: ['I go down to Dadan’s house with Sabo and Luffy and find Garp already there.'], action: 'I tell all of them at once that I am leaving this island one day and none of them can stop me.', expect: 'multiple named speakers in one beat' },
  { id: 'A6-offscreen', what: 'Known speaker offscreen', setup: ['I climb up into the treehouse on my own and pull the ladder up behind me.'], action: 'I stay up here and ignore whoever is shouting at me from the bottom of the tree.', expect: 'the shouter is known — should still be attributed' },
  { id: 'A7-unknown', what: 'Genuinely unknown speaker', setup: ['I go down to Gray Terminal after dark on my own, keeping off the main path.'], action: 'I freeze when a voice I do not recognise says something behind me in the dark.', expect: 'speakerId null is CORRECT here' },
];

const PRESENCE: Scene[] = [
  { id: 'P1-stays-behind', what: 'Somebody stays put while the player goes', action: 'I leave Sabo up at the treehouse and walk down to the shore on my own.', expect: 'Sabo NOT present' },
  { id: 'P2-exits', what: 'Somebody leaves mid-beat', action: 'I tell Luffy to go back to Dadan’s and I watch him until he is out of sight.', expect: 'Luffy NOT present' },
  { id: 'P3-arrives', what: 'Somebody arrives mid-beat', setup: ['I hear somebody heavy coming up the mountain path toward us.'], action: 'I wait where I am until whoever it is gets here.', expect: 'the arrival IS present' },
  { id: 'P4-discussed', what: 'Absent character discussed', action: 'I ask Sabo what he thinks Dadan would say if she knew about the can.', expect: 'Dadan NOT present' },
  { id: 'P5-nearby', what: 'Visible but not in the scene', setup: ['I climb the ridge above Dadan’s house where I can see the whole yard.'], action: 'I sit up here and watch the bandits moving around down in the yard.', expect: 'bandits/Dadan NOT present — they are below' },
  { id: 'P6-split', what: 'The group splits', action: 'I send Sabo around the long way and take Luffy with me up the short climb.', expect: 'Luffy present, Sabo NOT' },
];

async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  const only = argv.find((a) => a.startsWith('--only='))?.slice(7);
  const out = argv.find((a) => a.startsWith('--out='))?.slice(6) ?? '/tmp/attribution.md';
  const gateway = new OpenAiGateway({
    apiKey: process.env.OPENAI_API_KEY!,
    models: { writer_premium: 'gpt-5.6-terra' },
  });
  const cast = new Map(ACE.characters.map((c) => [c.id, c.name]));

  const scenes = only === 'presence' ? PRESENCE : only === 'attribution' ? ATTRIBUTION : [...ATTRIBUTION, ...PRESENCE];
  const md: string[] = ['# Attribution and presence probe', ''];
  let spoken = 0;
  let attributed = 0;

  for (const scene of scenes) {
    let state: GameState = createInitialState({
      sessionId: `probe-${scene.id}`,
      story: ACE,
      identity: { displayName: 'Ace', pronouns: 'he/him', ageBand: null,
        archetypeId: ACE.archetypes[0]!.id, worldKnowsAboutYou: '', advanced: {}, portraitAssetId: null },
    });
    const rendered: Array<{ user: string; assistant: string }> = [];
    for (const step of [...(scene.setup ?? []), scene.action]) {
      const result = await runTurnPure({
        gateway, story: ACE, state, recentTurns: [], rendered,
        shape: 'append', api: 'responses', cacheKey: `pb:probe-${scene.id}`,
        actionText: step, turnId: `${scene.id}`,
      });
      rendered.push(result.rendered);
      state = result.state;
      if (step !== scene.action) continue;

      md.push(`## ${scene.id} — ${scene.what}`, '', `**Player:** ${step}`, '', `*expected:* ${scene.expect}`, '');
      for (const b of result.blocks) {
        const who = b.speakerId ? (cast.get(b.speakerId) ?? b.speakerId) : null;
        // A null-speaker block that is plainly somebody talking is the failure
        // we are hunting. Flagged, never auto-corrected.
        const looksSpoken = /^["“”']|[.!?]["“”']\s*$|^[A-Z][A-Z ,!?'’—-]{12,}$/.test(b.text.trim());
        const flag = !b.speakerId && looksSpoken ? '  ⚠️ UNATTRIBUTED-SPEECH?' : '';
        if (b.speakerId) { spoken += 1; attributed += 1; }
        else if (looksSpoken) spoken += 1;
        md.push(`> ${who ? `**${who}.** ` : ''}${b.text}${flag}`, '');
      }
      md.push(
        `*present: ${result.state.characters.filter((c) => c.locationId === result.state.player.locationId).map((c) => cast.get(c.characterId) ?? c.characterId).join(', ') || 'nobody'} · location: ${result.state.player.locationId} · ${result.endStatePrompt}*`,
        '', '---', '',
      );
      process.stdout.write(`${scene.id}: ${result.blocks.length} blocks, ${result.blocks.filter((b) => b.speakerId).length} attributed\n`);
    }
  }
  md.push('', `Attributed ${attributed} of ${spoken} apparently-spoken blocks.`);
  writeFileSync(out, md.join('\n'), 'utf8');
  console.log(`\n${out}\nattributed ${attributed}/${spoken}`);
}
void main().catch((e) => { console.error(e); process.exit(1); });
