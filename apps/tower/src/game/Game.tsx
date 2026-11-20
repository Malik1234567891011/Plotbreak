import { useEffect, useRef, useState } from 'react';
import { BOONS_BY_ID, CHARACTERS, CHARACTERS_BY_ID, ENEMIES, TowerSim, dailyTower, type BoonId, type Input, type RunResult, type SimEvent } from '@tower';
import { Portrait } from './Portrait';
import type { BotDriver } from '../../../../packages/tower/src/bots';
import { bridge } from '../bridge';
import { sfx, unlockAudio } from './audio';
import { Stage } from './render';

const TICK_MS = 1000 / 60;
/** Never advance more than this many ticks in one frame: a stall must not skip an attack past you. */
const MAX_STEPS = 4;

export interface GameProps {
  seed: number;
  runId: string;
  /** The UTC day: which daily tower (lineup and twist) this run climbs. */
  day: string;
  characterId: string;
  startFloor?: number;
  /** Practice: no checkpoints, a little paid. */
  practice?: boolean;
  onEnd: (result: RunResult, inputs: Input[], realMs: number) => void;
}

export function Game({ seed, runId, day, characterId, startFloor: firstFloor = 1, practice = false, onEnd }: GameProps) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [offer, setOffer] = useState<BoonId[] | null>(null);
  const [erase, setErase] = useState<BoonId[] | null>(null);
  const [teach, setTeach] = useState<string | null>(null);
  const paused = useRef(false);
  const resumeAt = useRef(0);
  const [quit, setQuit] = useState(false);
  const simRef = useRef<TowerSim | null>(null);
  const hero = CHARACTERS_BY_ID[characterId] ?? CHARACTERS[0]!;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const dev = params.has('dev');
    const botName = dev ? params.get('bot') : null;
    let stop: (() => void) | null = null;
    let cancelled = false;
    // Bots are dev tools: loaded on demand so they are not in the shipped page's code path.
    const load = import.meta.env.DEV && botName ? import('../../../../packages/tower/src/bots') : Promise.resolve(null);
    void load.then((mod) => {
      if (cancelled) return;
      const bot = mod ? new mod.BotDriver(mod.SKILLS.find((s) => s.name === botName!.replace('-', ' ')) ?? mod.SKILLS[4]!, 99) : null;
      if (bot && params.has('pick')) bot.autoPick = false;
      stop = run(params, dev, bot);
    });
    return () => {
      cancelled = true;
      stop?.();
    };
  }, [seed, runId, day, characterId, firstFloor, practice, onEnd]);

  function run(params: URLSearchParams, dev: boolean, bot: BotDriver | null): () => void {
    const sim = new TowerSim(seed, dailyTower(day), firstFloor);
    simRef.current = sim;
    const startFloor = dev ? Number(params.get('floor') ?? 1) : 1;

    const stage = new Stage(canvas.current!);
    stage.hero = CHARACTERS_BY_ID[characterId] ?? CHARACTERS[0]!;
    // A lesson pauses the sim. It just stops stepping, so the replay is unaffected.
    if (!bot) stage.onTeach = (key) => { paused.current = true; setTeach(key); bridge.haptic('medium'); };
    const css = getComputedStyle(document.documentElement);
    const inset = (v: string) => parseFloat(css.getPropertyValue(v)) || 0;
    const fit = () => {
      const r = wrap.current!.getBoundingClientRect();
      stage.resize(r.width, r.height, Math.min(3, window.devicePixelRatio || 1), Math.max(inset('--sat'), 8), Math.max(inset('--sab'), 10));
    };
    fit();
    window.addEventListener('resize', fit);
    if (startFloor > 1) sim.devStartAt(startFloor);
    stage.ringsOn = sim.floor <= 10;

    // Dev: `freeze=<event>:<ticks>` fast-forwards (with the bot) to N ticks after the first
    // matching moment and holds there — reliable frames for review. Events: heavy, slash, kunai,
    // fake, stance, parry, perfect, hit, break, boon, dead, twist, counter, opening.
    const freeze = dev ? params.get('freeze') : null;
    let frozen = false;
    if (freeze && bot) {
      const [what, plus] = freeze.split(':');
      const extra = Number(plus ?? 0);
      let at = -1;
      const matches = (e: SimEvent): boolean => {
        if (e.type === 'tele') {
          const a = sim.attacks.find((x) => x.id === e.attack);
          return !!a && (what === a.kind || (what === 'delayed' && a.delayed));
        }
        if (e.type === 'stance') return what === 'stance';
        if (e.type === 'parry') return what === 'parry' || (what === 'perfect' && e.perfect);
        if (e.type === 'boon_offer') return what === 'boon';
        return e.type === what;
      };
      let scanned = sim.events.length;
      while (!sim.over && sim.tick < 60 * 60 * 20) {
        if (at < 0) {
          for (; scanned < sim.events.length; scanned++) if (matches(sim.events[scanned]!)) { at = sim.tick; break; }
        }
        if (at >= 0 && sim.tick >= at + extra) break;
        if (sim.phase === 'boon' && what === 'boon') break;
        bot.beforeStep(sim);
        sim.step();
      }
      frozen = true;
    }

    // Replay the last few events into the stage so a frozen frame shows its effects.
    let seen = Math.max(0, sim.events.length - (frozen ? 6 : sim.events.length));
    if (frozen && sim.phase === 'boon' && sim.offer) setOffer([...sim.offer]);
    let acc = 0;
    let last = performance.now();
    let raf = 0;
    let ended = false;
    let endAt = 0;
    const started = performance.now();
    let activeMs = 0;

    const handle = (e: SimEvent) => {
      stage.onEvent(e, sim);
      switch (e.type) {
        case 'tele': {
          const a = sim.attacks.find((x) => x.id === e.attack);
          sfx.tele(a ? (a.twisted ? a.kind !== 'heavy' : a.kind === 'heavy') : false);
          break;
        }
        case 'parry':
          (e.kunai ? sfx.kunai : () => sfx.parry(e.perfect))();
          bridge.haptic(e.perfect ? 'heavy' : 'light');
          break;
        case 'dodge': sfx.dodge(); bridge.haptic('select'); break;
        case 'counter': sfx.counter(); bridge.haptic('heavy'); break;
        case 'hit': sfx.hit(); bridge.haptic('error'); break;
        case 'whiff': sfx.whiff(); break;
        case 'saved': sfx.saved(); bridge.haptic('medium'); break;
        case 'break': sfx.breakGuard(e.final); setTimeout(() => sfx.cutin(), 0); bridge.haptic('heavy'); break;
        case 'cleared':
          bridge.haptic('success');
          if (!practice) {
            bridge.track('tower_floor_cleared', { floor: e.floor, skipped: e.skipped, hp: sim.hp, ticks: sim.stats.ticks });
            void bridge.checkpoint(runId, sim.inputs, e.floor);
          }
          break;
        case 'erase_offer': setErase(e.offer); bridge.haptic('heavy'); break;
        case 'erased': setErase(null); break;
        case 'floor': sfx.floor(sim.spec.boss); break;
        case 'heal': sfx.heal(); break;
        case 'boon_offer': setOffer(e.offer); break;
        case 'boon_pick': setOffer(null); sfx.pick(); break;
        case 'dead': sfx.dead(); bridge.haptic('error'); break;
        case 'won': sfx.won(); bridge.haptic('success'); break;
        default: break;
      }
    };

    const frame = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      if (!document.hidden) activeMs += dt * 1000;
      if (paused.current || now < resumeAt.current) acc = 0;
      else acc += dt * 1000;
      let steps = 0;
      while (!frozen && acc >= TICK_MS && steps < MAX_STEPS) {
        bot?.beforeStep(sim);
        sim.step();
        acc -= TICK_MS;
        steps += 1;
      }
      if (steps === MAX_STEPS) acc = 0;
      while (seen < sim.events.length) handle(sim.events[seen++]!);
      stage.draw(sim, acc / TICK_MS, now / 1000, dt);
      if (sim.over && !ended) {
        ended = true;
        endAt = now;
      }
      if (ended && now - endAt > (sim.phase === 'won' ? 1600 : 1900)) {
        onEnd(sim.result(), [...sim.inputs], Math.round(activeMs || now - started));
        return;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    // Input: pointerdown, not click — a click waits for the finger to lift.
    const el = wrap.current!;
    const down = (ev: PointerEvent) => {
      if ((ev.target as HTMLElement).closest('[data-ui]')) return;
      ev.preventDefault();
      unlockAudio();
      if (sim.phase !== 'fight' || paused.current) return;
      const r = el.getBoundingClientRect();
      const dodge = stage.isDodge(ev.clientX - r.left, ev.clientY - r.top);
      if (dodge) stage.pressDodge();
      sim.input(dodge ? 'dodge' : 'tap');
      // Feed events produced by the input straight away so the response is on this frame.
      while (seen < sim.events.length) handle(sim.events[seen++]!);
    };
    const key = (ev: KeyboardEvent) => {
      if (ev.repeat) return;
      if ((sim.eraseOffer || (sim.phase === 'boon' && sim.offer)) && ['1', '2', '3'].includes(ev.key)) { sim.input('pick', Number(ev.key) - 1); return; }
      if (paused.current && (ev.code === 'Space' || ev.key === 'Enter')) { ev.preventDefault(); dismissTeach(); return; }
      if (sim.phase !== 'fight' || paused.current) return;
      if (ev.code === 'Space' || ev.key === 'j' || ev.key === 'f') { ev.preventDefault(); sim.input('tap'); }
      else if (ev.key === 'k' || ev.key === 'd' || ev.code === 'ShiftLeft' || ev.code === 'ShiftRight') { stage.pressDodge(); sim.input('dodge'); }
      while (seen < sim.events.length) handle(sim.events[seen++]!);
    };
    el.addEventListener('pointerdown', down, { passive: false });
    window.addEventListener('keydown', key);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', fit);
      el.removeEventListener('pointerdown', down);
      window.removeEventListener('keydown', key);
    };
  }

  function dismissTeach() {
    if (!paused.current) return;
    paused.current = false;
    // A short beat before the fight moves again, so the finger that closed the card is off the glass.
    resumeAt.current = performance.now() + 350;
    setTeach(null);
  }

  const pick = (i: number) => {
    const sim = simRef.current;
    if (!sim) return;
    bridge.haptic('select');
    sim.input('pick', i);
  };

  return (
    <div ref={wrap} className="game">
      <canvas ref={canvas} />
      <button data-ui className="quit" onClick={() => setQuit(true)} aria-label="Give up">✕</button>
      {offer && (
        <div data-ui className="boons">
          <div className="boons-title">
            <Portrait c={hero} size={150} eyes="angry" />
            <span className="cleared-tag">FLOOR {simRef.current?.floor ?? ''} CLEARED</span>
            <h2>Choose a power-up</h2>
            <p>It lasts for the rest of this climb.</p>
          </div>
          <div className="boon-cards">
            {offer.map((id, i) => {
              const b = BOONS_BY_ID[id];
              return (
                <button key={id} className={`boon ${b.rarity}`} onClick={() => pick(i)} style={{ animationDelay: `${i * 70}ms` }}>
                  <span className="boon-jp">{b.jp}</span>
                  <span className="boon-name">{b.name}</span>
                  <span className="boon-text">{b.text}</span>
                  {comboWith(id, simRef.current?.boons ?? []) && <span className="boon-combo">⚡ Combos with {comboWith(id, simRef.current?.boons ?? [])}</span>}
                  <span className="boon-rarity">{b.rarity}</span>
                </button>
              );
            })}
          </div>
          {!!simRef.current?.boons.length && (
            <div className="boons-held">You have: {simRef.current.boons.map((b) => BOONS_BY_ID[b].name).join(' · ')}</div>
          )}
        </div>
      )}
      {erase && (
        <div data-ui className="boons erase">
          <div className="boons-title">
            <span className="author">THE AUTHOR</span>
            <h2>“I’m cutting one of these.”</h2>
            <p>Choose the power-up you can live without.</p>
          </div>
          <div className="boon-cards">
            {erase.map((id, i) => {
              const b = BOONS_BY_ID[id];
              return (
                <button key={id} className={`boon ${b.rarity} cut`} onClick={() => pick(i)} style={{ animationDelay: `${i * 70}ms` }}>
                  <span className="boon-jp">{b.jp}</span>
                  <span className="boon-name">{b.name}</span>
                  <span className="boon-text">{b.text}</span>
                  <span className="boon-rarity">lose this</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
      {teach && LESSONS[teach] && (
        <div data-ui className="lesson" onClick={dismissTeach}>
          <div className={`lesson-panel ${LESSONS[teach].tone}`}>
            <div className="lesson-band"><span>{LESSONS[teach].icon}</span><b>{LESSONS[teach].title}</b></div>
            <div className="lesson-body">
              <div className="lesson-sensei"><Portrait c={SENSEI} size={118} eyes="smug" /><small>Captain Rin</small></div>
              <p className="lesson-bubble">{LESSONS[teach].text}</p>
            </div>
            <button className="btn primary">Got it</button>
          </div>
        </div>
      )}
      {practice && <div className="practice-tag">PRACTICE · ◆1 a floor</div>}
      {quit && (
        <div data-ui className="confirm">
          <div className="confirm-card">
            <h3>{practice ? 'Stop practising?' : 'Give up this climb?'}</h3>
            <p>{practice ? 'You keep ◆1 for each floor you cleared.' : 'You’ll be paid for the floor you’re on, and today’s try is used.'}</p>
            <div className="confirm-row">
              <button className="btn ghost" onClick={() => setQuit(false)}>Keep fighting</button>
              <button
                className="btn danger"
                onClick={() => {
                  const sim = simRef.current;
                  setQuit(false);
                  if (sim) onEnd(sim.result(), [...sim.inputs], 0);
                }}
              >
                Give up
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/** Each lesson, taught once by a card that pauses the fight. */
const LESSONS: Record<string, { icon: string; title: string; text: string; tone: string }> = {
  slash: { icon: '!', title: 'Tap as it lands', tone: 'white', text: 'Watch the enemy dash in. Tap anywhere the moment the blade reaches you. The ring closing on you shows when.' },
  kunai: { icon: '➶', title: 'Kunai', tone: 'white', text: 'Thrown knives. Tap as each one reaches you.' },
  heavy: { icon: '危', title: 'Red means DODGE', tone: 'red', text: 'Red attacks can’t be parried. Hit the DODGE button as it lands. Only red.' },
  feint: { icon: '?!', title: 'Yellow means feint', tone: 'gold', text: 'It flashes yellow, pulls back and grins. Don’t touch anything: the real strike comes right after.' },
  delayed: { icon: '…!', title: 'It’s holding', tone: 'purple', text: 'This one stops mid-swing to catch you early. Wait for it.' },
  stance: { icon: '構', title: 'Blue means hands off', tone: 'blue', text: 'A counter stance. Touch the screen and you get hit. Wait until the aura is gone.' },
  opening: { icon: '★', title: 'Chance!', tone: 'gold', text: 'After you dodge a red attack the enemy is wide open. Tap right away for a big counter.' },
  graze: { icon: '½', title: 'Dodging isn’t free', tone: 'red', text: 'From floor 11, dodging a white strike grazes you for half a heart. Tap white ones.' },
  kiai: { icon: '気', title: 'Kiai full', tone: 'purple', text: 'Perfect parries charge it. When it’s full, your next parry hits extra hard.' },
  twist: { icon: '改', title: 'Plot twist', tone: 'gold', text: 'THE AUTHOR is swapping the colours. Some red attacks are drawn white and some white ones red. Read the move, not the colour.' },
};

/** The coach in every lesson card: the kendo captain from floor 4, who has opinions. */
const SENSEI = { look: ENEMIES.kendo.look, scarf: null, headband: null };

const COMBOS: readonly [BoonId, BoonId][] = [
  ['training_arc', 'battle_cry'], ['second_form', 'rivals_respect'], ['glasses_glint', 'chuunibyou'],
  ['bento', 'beach_episode'], ['plot_armor', 'second_form'], ['time_skip', 'training_arc'], ['flashback', 'plot_armor'],
  ['friendship', 'bento'], ['truck_kun', 'filler_episode'],
];

/** The name of a held power-up this one works well with, if any. */
function comboWith(id: BoonId, held: readonly BoonId[]): string | null {
  for (const [a, b] of COMBOS) {
    if (a === id && held.includes(b)) return BOONS_BY_ID[b].name;
    if (b === id && held.includes(a)) return BOONS_BY_ID[a].name;
  }
  return null;
}
