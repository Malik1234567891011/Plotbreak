/**
 * Does a time-compression card show up when a stretch of routine begins, stay
 * away mid-crisis, and actually move the clock when tapped?
 */
import { writeFileSync } from 'node:fs';
import { ACE } from '@plotbreak/test-fixtures';
import { createInitialState } from '@plotbreak/engine';
import { runTurnPure, OpenAiGateway } from '@plotbreak/director';
import type { GameState } from '@plotbreak/contracts';

/** Words a card uses when it is offering to let a stretch of time pass. */
const COMPRESSION =
  /\b(over the next|for the next|spend the next|keep (at|going) .* until|next few (days|weeks|months)|weeks|months|every day|day after day|until we have enough|for as long as it takes)\b/i;

const SETTLED = [
  'I climb up to the treehouse with Sabo and we put the day behind us.',
  'I tell Sabo I want to learn to read properly, and that from now on every berry we get goes into the boat fund.',
  'We agree that is the plan, and there is nothing else to settle tonight.',
  'I lie back on the planks and let the evening go quiet.',
];

const CRISIS = [
  'I go down toward Gray Terminal after dark to see what the men with the lamp oil are doing.',
  'I get close enough to hear what they are saying to each other.',
  'I step out where they can see me and tell them to put the oil down.',
];

async function main(): Promise<void> {
  const out = process.argv.slice(2).find((a) => a.startsWith('--out='))?.slice(6) ?? '/tmp/zoom.md';
  const gateway = new OpenAiGateway({ apiKey: process.env.OPENAI_API_KEY!, models: { writer_premium: 'gpt-5.6-terra' } });
  const md: string[] = ['# Temporal-zoom card probe', ''];

  async function play(label: string, script: readonly string[], tapCompression: boolean) {
    md.push(`## ${label}`, '');
    let state: GameState = createInitialState({
      sessionId: `zoom-${label}`, story: ACE,
      identity: { displayName: 'Ace', pronouns: 'he/him', ageBand: null,
        archetypeId: ACE.archetypes[0]!.id, worldKnowsAboutYou: '', advanced: {}, portraitAssetId: null },
    });
    const rendered: Array<{ user: string; assistant: string }> = [];
    let offered: string | null = null;

    for (const [i, actionText] of script.entries()) {
      const before = state.worldMinute;
      const r = await runTurnPure({
        gateway, story: ACE, state, recentTurns: [], rendered, shape: 'append',
        api: 'responses', cacheKey: `pb:zoom-${label}`, actionText, turnId: `z${i}`,
      });
      rendered.push(r.rendered);
      state = r.state;
      const cards = r.suggestions.map((s) => s.text);
      const hit = cards.find((c) => COMPRESSION.test(c)) ?? null;
      if (hit) offered = hit;
      md.push(`**T${i + 1}:** ${actionText}`, '', `*${r.endStatePrompt} · +${state.worldMinute - before} min · sceneStatus: ${r.sceneStatus}*`, '');
      for (const [n, c] of cards.entries()) md.push(`${n + 1}. ${c}${COMPRESSION.test(c) ? '  ⏩ TIME-COMPRESSION' : ''}`);
      md.push('');
      process.stdout.write(`  ${label} T${i + 1}: ${r.sceneStatus.padEnd(8)} ${hit ? 'OFFERED ⏩' : 'no skip card'}\n`);
    }

    if (tapCompression && offered) {
      const before = state.worldMinute;
      const r = await runTurnPure({
        gateway, story: ACE, state, recentTurns: [], rendered, shape: 'append',
        api: 'responses', cacheKey: `pb:zoom-${label}`, actionText: offered, turnId: 'z-tap',
      });
      const days = (r.state.worldMinute - before) / 1440;
      md.push(`### Tapped the compression card`, '', `**Player:** ${offered}`, '');
      for (const b of r.blocks) md.push(`> ${b.speakerId ? `**${b.speakerId}.** ` : ''}${b.text}`, '');
      md.push(`*${r.endStatePrompt} · advanced ${days.toFixed(1)} days · transition: ${r.transition ?? 'none'}*`, '');
      process.stdout.write(`  TAPPED → +${days.toFixed(1)} days → ${r.endStatePrompt} (${r.transition})\n`);
    } else if (tapCompression) {
      md.push('_No compression card was ever offered._', '');
    }
    md.push('---', '');
  }

  await play('A-routine-begins (should offer)', SETTLED, true);
  await play('B-unresolved-danger (must NOT offer)', CRISIS, false);
  writeFileSync(out, md.join('\n'), 'utf8');
  console.log(`\n${out}`);
}
void main().catch((e) => { console.error(e); process.exit(1); });
