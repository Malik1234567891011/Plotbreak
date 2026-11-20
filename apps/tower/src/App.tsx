import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ARCS, CHARACTERS, CHARACTERS_BY_ID, CLEAR_PAYOUT, FLOORS, MODIFIERS_BY_ID, PAYOUT_TIERS, STREAK_CAP, floorSpec,
  type CharacterDef, type Input, type ModifierId, type RunResult,
} from '@tower';
import { bridge, type FinishResult, type TowerStatus } from './bridge';
import { Game } from './game/Game';
import { isMuted, setMuted, sfx, unlockAudio } from './game/audio';
import { Portrait } from './game/Portrait';

type Screen =
  | { kind: 'loading' }
  | { kind: 'error'; message: string }
  | { kind: 'lobby'; status: TowerStatus }
  | { kind: 'fighters'; status: TowerStatus }
  | { kind: 'play'; runId: string; seed: number; day: string; fee: number; characterId: string; practice: boolean; startFloor: number }
  | { kind: 'settling'; practice: boolean }
  | { kind: 'result'; result: RunResult; finish: FinishResult; status: TowerStatus | null; fee: number }
  | { kind: 'practiced'; result: RunResult; finish: FinishResult | null; status: TowerStatus | null };

export function App() {
  const [screen, setScreen] = useState<Screen>({ kind: 'loading' });
  const [starting, setStarting] = useState(false);
  const opened = useRef(Date.now());
  const lastStatus = useRef<TowerStatus | null>(null);

  const refresh = useCallback(async () => {
    try {
      const status = await bridge.status();
      lastStatus.current = status;
      setScreen({ kind: 'lobby', status });
      bridge.track('tower_opened', { played: !!status.today?.finished, free: status.free, balance: status.balance });
    } catch (e) {
      setScreen({ kind: 'error', message: e instanceof Error ? e.message : 'Could not reach the Tower.' });
    }
  }, []);

  useEffect(() => {
    // Dev: `?dev&play` skips the lobby (screenshots, autoplay).
    const p = new URLSearchParams(location.search);
    if (p.has('dev') && p.has('play')) {
      void bridge.start().then((r) => setScreen({ kind: 'play', runId: r.runId, seed: r.seed, day: r.day, fee: r.fee, characterId: p.get('hero') ?? r.characterId, practice: false, startFloor: 1 }));
      return;
    }
    if (p.has('dev') && p.get('screen') === 'fighters') {
      void bridge.status().then((status) => setScreen({ kind: 'fighters', status }));
      return;
    }
    void refresh();
  }, [refresh]);

  const close = useCallback(() => {
    bridge.track('tower_closed', { screen: screen.kind, seconds: Math.round((Date.now() - opened.current) / 1000) });
    bridge.close();
  }, [screen.kind]);

  const start = async () => {
    unlockAudio();
    setStarting(true);
    try {
      const r = await bridge.start();
      setScreen({ kind: 'play', runId: r.runId, seed: r.seed, day: r.day, fee: r.fee, characterId: r.characterId, practice: false, startFloor: 1 });
    } catch (e) {
      setScreen({ kind: 'error', message: e instanceof Error ? e.message : 'Could not start.' });
    } finally {
      setStarting(false);
    }
  };

  const practise = async (floor = 1) => {
    unlockAudio();
    try {
      const r = await bridge.practice(floor);
      setScreen({ kind: 'play', runId: r.runId, seed: r.seed, day: r.day, fee: 0, characterId: r.characterId, practice: true, startFloor: r.startFloor });
    } catch (e) {
      setScreen({ kind: 'error', message: e instanceof Error ? e.message : 'Could not start practice.' });
    }
  };

  const onEnd = useCallback(
    async (result: RunResult, inputs: Input[], realMs: number) => {
      if (screen.kind !== 'play') return;
      const { practice, fee, runId } = screen;
      setScreen({ kind: 'settling', practice });
      if (!practice) bridge.track('tower_fell', { fellOn: result.fellOn, cleared: result.cleared, ticks: result.ticks, realMs, boons: result.boons });
      try {
        const finish = await bridge.finish(runId, inputs, result, realMs);
        let status: TowerStatus | null = null;
        try { status = await bridge.status(); lastStatus.current = status; } catch { /* shown without the countdown */ }
        if (practice) {
          setScreen({ kind: 'practiced', result, finish, status });
          return;
        }
        setScreen({ kind: 'result', result, finish, status, fee });
        bridge.track('tower_reward_seen', { reward: finish.reward, fellOn: finish.fellOn, newBest: finish.newBest });
      } catch (e) {
        if (practice) { setScreen({ kind: 'practiced', result, finish: null, status: lastStatus.current }); return; }
        setScreen({ kind: 'error', message: e instanceof Error ? e.message : 'Could not save your climb. It will be settled next time you open the Tower.' });
      }
    },
    [screen],
  );

  return (
    <div className="app">
      {screen.kind === 'loading' && <div className="center"><div className="spinner" /></div>}
      {screen.kind === 'error' && (
        <div className="center column">
          <p className="error">{screen.message}</p>
          <button className="btn" onClick={() => void refresh()}>Try again</button>
          <button className="btn ghost" onClick={close}>Close</button>
        </div>
      )}
      {screen.kind === 'lobby' && (
        <Lobby status={screen.status} onStart={start} onPractice={(f) => void practise(f)} onClose={close} starting={starting}
          onFighters={() => setScreen({ kind: 'fighters', status: screen.status })}
          onRevive={async () => {
            try { await bridge.revive(); bridge.haptic('success'); sfx.heal(); await refresh(); }
            catch (e) { setScreen({ kind: 'error', message: e instanceof Error ? e.message : 'Could not revive.' }); }
          }} />
      )}
      {screen.kind === 'fighters' && <Fighters status={screen.status} onBack={() => void refresh()} />}
      {screen.kind === 'play' && (
        <Game seed={screen.seed} runId={screen.runId} day={screen.day} characterId={screen.characterId} startFloor={screen.startFloor} practice={screen.practice} onEnd={onEnd} />
      )}
      {screen.kind === 'settling' && <div className="center column"><div className="spinner" /><p className="muted">{screen.practice ? 'Counting your floors…' : 'Counting your floors…'}</p></div>}
      {screen.kind === 'result' && <Result {...screen} onClose={close} onPractice={() => void practise()} />}
      {screen.kind === 'practiced' && <Practiced result={screen.result} finish={screen.finish} status={screen.status} onAgain={() => void practise()} onBack={() => void refresh()} />}
    </div>
  );
}

// ── shared ───────────────────────────────────────────────────────────────

function useCountdown(iso: string | undefined): string {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  if (!iso) return '';
  const ms = Math.max(0, new Date(iso).getTime() - now);
  const h = Math.floor(ms / 3600000), m = Math.floor((ms % 3600000) / 60000), s = Math.floor((ms % 60000) / 1000);
  return h ? `${h}h ${String(m).padStart(2, '0')}m` : `${m}m ${String(s).padStart(2, '0')}s`;
}

function nextIsFree(iso: string): boolean {
  return new Date(iso).getUTCDay() === 0;
}

const signed = (n: number) => (n > 0 ? `+${n}` : n === 0 ? '±0' : `−${Math.abs(n)}`);

// ── lobby ────────────────────────────────────────────────────────────────

function Lobby({ status, onStart, onPractice, onClose, onFighters, onRevive, starting }: {
  status: TowerStatus; onStart: () => void; onPractice: (floor: number) => void; onClose: () => void; onFighters: () => void;
  onRevive: () => Promise<void>; starting: boolean;
}) {
  const [picking, setPicking] = useState(false);
  const [floor, setFloor] = useState(status.practice.maxFloor);
  const [reviving, setReviving] = useState(false);
  const [left, setLeft] = useState(() => { try { return localStorage.getItem('tower-left') === '1'; } catch { return false; } });
  const openPractice = () => (status.practice.maxFloor > 1 ? setPicking(true) : onPractice(1));
  const countdown = useCountdown(status.nextAt);
  const [muted, setM] = useState(isMuted());
  const played = !!status.today?.finished;
  const resume = !!status.today && !status.today.finished;
  const canPay = status.free || status.balance >= status.fee;
  const mod = MODIFIERS_BY_ID[status.modifier as ModifierId] ?? MODIFIERS_BY_ID.none;
  const hero = CHARACTERS_BY_ID[status.characters.selected] ?? CHARACTERS[0]!;
  const practiceLeft = Math.max(0, status.practice.cap - status.practice.earnedToday);
  return (
    <div className="lobby">
      <header className="lobby-head">
        <button className="icon" onClick={onClose} aria-label="Close">✕</button>
        <div className="balance">◆ {status.balance.toLocaleString()}</div>
        <button className="icon" onClick={() => { setMuted(!muted); setM(!muted); }} aria-label={muted ? 'Sound on' : 'Sound off'}>{muted ? '🔇' : '🔊'}</button>
      </header>

      <div className="title compact">
        <h1>THE TOWER <span className="title-jp-inline">塔</span></h1>
        <div className={`today-chip ${played ? 'done' : ''}`}>
          {played
            ? <>Today’s climb done · next in <b>{countdown}</b></>
            : <>1 climb today · {status.free ? <b>FREE (Sunday)</b> : <b>◆ {status.fee} entry</b>} · resets in <b>{countdown}</b></>}
        </div>
      </div>

      <div className={`streak-card ${status.revive ? 'broken' : status.streak.alive ? '' : 'cold'}`}>
        <div className="flame">{status.revive ? '💔' : '🔥'}</div>
        <div className="streak-main">
          <b>{status.revive ? `${status.revive.days}-day streak died` : `${status.streak.days}-day streak`}</b>
          <span>
            {status.revive
              ? `Revive for ◆${status.revive.cost} and climb at +${Math.min(20, status.revive.days + 1) * 5}%${status.revive.nextCost ? ` (◆${status.revive.nextCost} tomorrow)` : ' (last chance)'}`
              : played ? `Today paid +${status.streak.todayBonusPercent}%. Tomorrow +${Math.min(20, status.streak.days + 1) * 5}%.` : `Climb today for +${status.streak.todayBonusPercent}% on your payout`}
          </span>
          <div className="streak-bar"><i style={{ width: `${(Math.min(STREAK_CAP, (status.revive ? status.revive.days : status.streak.days) + (played ? 0 : 1)) / STREAK_CAP) * 100}%` }} /></div>
        </div>
        {status.revive ? (
          <button className="btn primary small" disabled={reviving || status.balance < status.revive.cost}
            onClick={async () => { setReviving(true); await onRevive(); setReviving(false); }}>
            Revive<br />◆{status.revive.cost}
          </button>
        ) : (
          <div className="streak-badge">+{status.streak.todayBonusPercent}%</div>
        )}
      </div>

      <div className="twist-banner"><b><span className="jp">{mod.jp}</span> {mod.name}</b><span>{mod.text}</span></div>

      <button className="fighter-row" onClick={onFighters}>
        <Portrait c={hero} size={52} />
        <span><small>FIGHTING AS</small><b>{hero.name}</b></span>
        <span className="fighter-cta">Change ›</span>
      </button>

      <Ladder best={status.best} today={played ? status.today!.fellOn : null} cleared={!!status.today?.cleared} bonus={status.streak.todayBonusPercent} />

      <footer className="lobby-foot">
        {played ? (
          <>
            <div className="played">
              <span>{status.today!.cleared ? 'You cleared all 30 floors' : `You fell on floor ${status.today!.fellOn}`}</span>
              <b>+{status.today!.reward}</b>
            </div>
            <button className="btn primary big" onClick={openPractice}>Practice · ◆1 a floor ({practiceLeft} left today)</button>
          </>
        ) : (
          <>
            <button className="btn primary big" disabled={starting || (!canPay && !resume)} onClick={onStart}>
              {resume ? 'Continue today’s climb' : status.free ? 'Climb free today' : <>Climb · <span className="fee">◆ {status.fee}</span></>}
            </button>
            <div className="fine">
              {!canPay && !resume ? `You need ◆ ${status.fee} to enter. Sundays are free.` : 'One climb a day. Miss a day and the streak restarts.'}
              {' '}<button className="link" onClick={openPractice}>Practice (◆1 a floor)</button>
            </div>
            <button className="link hand" onClick={() => { const next = !left; try { localStorage.setItem('tower-left', next ? '1' : '0'); } catch { /* private mode */ } setLeft(next); }}>
              DODGE button: {left ? 'left hand' : 'right hand'} (change)
            </button>
          </>
        )}
      </footer>

      {picking && (
        <div className="confirm" onClick={() => setPicking(false)}>
          <div className="confirm-card picker" onClick={(e) => e.stopPropagation()}>
            <h3>Practice from floor</h3>
            <p>Any floor you’ve reached. ◆1 for each floor you clear from there, {practiceLeft} left today.</p>
            <div className="stepper">
              <button className="icon" onClick={() => setFloor((f) => Math.max(1, f - 1))} aria-label="Lower">−</button>
              <div><b>{floor}</b><small>{ARCS[floorSpec(floor).arc]!.name}{floorSpec(floor).boss ? ' · boss' : ''}</small></div>
              <button className="icon" onClick={() => setFloor((f) => Math.min(status.practice.maxFloor, f + 1))} aria-label="Higher">+</button>
            </div>
            <input type="range" min={1} max={status.practice.maxFloor} value={floor} onChange={(e) => setFloor(Number(e.target.value))} />
            <div className="confirm-row">
              <button className="btn ghost" onClick={() => setPicking(false)}>Cancel</button>
              <button className="btn primary" onClick={() => { setPicking(false); onPractice(floor); }}>Practice</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Ladder({ best, today, cleared, bonus }: { best: number; today: number | null; cleared: boolean; bonus: number }) {
  // Drawn as the tower itself: floor 1 at the bottom, CLEAR at the top, narrowing as it rises.
  const rows = useMemo(() => [{ from: FLOORS + 1, to: FLOORS + 1, credits: CLEAR_PAYOUT }, ...PAYOUT_TIERS.slice().reverse()], []);
  const reachedTier = rows.find((t) => best >= t.from && best <= Math.max(t.to, t.from));
  const nextRung = [...rows].reverse().find((t) => t.from > Math.max(1, best));
  return (
    <section className="tower" aria-label="Rewards">
      {rows.map((t, i) => {
        const clear = t.from > FLOORS;
        const arc = clear ? null : ARCS[floorSpec(t.from).arc]!;
        const here = today !== null && (clear ? cleared : today >= t.from && today <= t.to && !cleared);
        const pay = bonus ? Math.round((t.credits * (100 + bonus)) / 100) : t.credits;
        const width = 72 + (i / (rows.length - 1)) * 28;
        return (
          <div key={i} className={`storey ${clear ? 'top' : ''} ${here ? 'here' : ''} ${t === nextRung ? 'next' : ''}`}
            style={{ width: `${width}%`, ['--arc' as string]: arc?.sky[1] ?? '#ffd23f', ['--arc2' as string]: arc?.sky[0] ?? '#ffb020' }}>
            <span className="storey-floors">{clear ? 'TOP' : `${t.from}–${t.to}`}</span>
            <span className="storey-name">{clear ? 'THE AUTHOR' : arc!.name}</span>
            <span className="storey-pay">◆{pay}</span>
            {t === reachedTier && best > 0 && <span className="pin best">BEST</span>}
            {t === nextRung && <span className="pin next">NEXT</span>}
            {here && <span className="pin today">TODAY</span>}
          </div>
        );
      })}
      <div className="tower-note">You’re paid for the floor you fall on{bonus ? `, +${bonus}% streak included` : ''}. ◆30 gets your entry back.</div>
    </section>
  );
}

// ── fighters ─────────────────────────────────────────────────────────────

function Fighters({ status, onBack }: { status: TowerStatus; onBack: () => void }) {
  const [owned, setOwned] = useState<readonly string[]>(status.characters.owned);
  const [selected, setSelected] = useState(status.characters.selected);
  const [balance, setBalance] = useState(status.balance);
  const [confirm, setConfirm] = useState<CharacterDef | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const choose = async (c: CharacterDef) => {
    setError(null);
    if (!owned.includes(c.id)) { setConfirm(c); return; }
    bridge.haptic('select');
    setSelected(c.id);
    try { await bridge.selectCharacter(c.id); } catch (e) { setError(e instanceof Error ? e.message : 'Could not switch.'); }
  };
  const buy = async (c: CharacterDef) => {
    setBusy(true);
    try {
      const r = await bridge.buyCharacter(c.id);
      setOwned(r.owned); setSelected(r.selected); setBalance(r.balance);
      bridge.haptic('success');
      sfx.won();
      setConfirm(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not unlock.');
      setConfirm(null);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="lobby fighters">
      <header className="lobby-head">
        <button className="icon" onClick={onBack} aria-label="Back">‹</button>
        <div className="balance">◆ {balance.toLocaleString()}</div>
        <span style={{ width: 38 }} />
      </header>
      <div className="title small">
        <h1>FIGHTERS</h1>
        <p className="tagline">Same skills, different style. Unlock one for ◆500 and it’s yours for good.</p>
      </div>
      {error && <p className="error center-text">{error}</p>}
      <div className="roster">
        {CHARACTERS.map((c) => {
          const has = owned.includes(c.id);
          const on = selected === c.id;
          return (
            <button key={c.id} className={`fighter ${on ? 'on' : ''} ${has ? '' : 'locked'}`} onClick={() => void choose(c)}>
              <Portrait c={c} size={110} dim={!has} />
              <b>{c.name}</b>
              <small>{c.title}</small>
              <span className="fighter-tag">{on ? 'FIGHTING' : has ? 'Use' : `◆ ${c.price}`}</span>
            </button>
          );
        })}
      </div>
      {confirm && (
        <div className="confirm" onClick={() => setConfirm(null)}>
          <div className="confirm-card unlock" onClick={(e) => e.stopPropagation()}>
            <Portrait c={confirm} size={150} />
            <h3>{confirm.name}</h3>
            <p>{confirm.title}. Finisher: <b>{confirm.cry}</b></p>
            <div className="confirm-row">
              <button className="btn ghost" onClick={() => setConfirm(null)}>Not now</button>
              <button className="btn primary" disabled={busy || balance < confirm.price} onClick={() => void buy(confirm)}>
                {balance < confirm.price ? `Need ◆${confirm.price}` : `Unlock · ◆${confirm.price}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── results ──────────────────────────────────────────────────────────────

function Result({ result, finish, status, fee, onClose, onPractice }: {
  result: RunResult; finish: FinishResult; status: TowerStatus | null; fee: number; onClose: () => void; onPractice: () => void;
}) {
  const [shown, setShown] = useState(0);
  const [reminded, setReminded] = useState<boolean | null>(null);
  const countdown = useCountdown(status?.nextAt);
  useEffect(() => {
    let v = 0;
    const step = Math.max(1, Math.ceil(finish.reward / 30));
    const id = setInterval(() => {
      v = Math.min(finish.reward, v + step);
      setShown(v);
      if (v % (step * 3) === 0) sfx.coin();
      if (v >= finish.reward) clearInterval(id);
    }, 40);
    return () => clearInterval(id);
  }, [finish.reward]);
  const last = result.floors[result.floors.length - 1];
  const parries = result.floors.reduce((a, f) => a + f.parries, 0);
  const perfects = result.floors.reduce((a, f) => a + f.perfects, 0);
  const enemy = last ? floorSpec(last.floor).enemy.name : '';
  const next = PAYOUT_TIERS.find((t) => t.from > finish.fellOn);
  const tomorrow = Math.min(STREAK_CAP, finish.streak + 1) * 5;
  return (
    <div className="result">
      <div className="episode">
        <span className="ep-label">{finish.cleared ? 'FINAL EPISODE' : 'NEXT EPISODE'}</span>
        <h1>{finish.cleared ? 'The tower is yours.' : `Floor ${finish.fellOn}. ${enemy} wins this one.`}</h1>
        <p>{finish.cleared ? 'You beat THE AUTHOR. Nobody wrote that ending for you.' : next ? `Reach floor ${next.from} tomorrow for ◆${next.credits}.` : 'One floor from the top. Tomorrow.'}</p>
      </div>
      <div className="reward">
        <span className="reward-num">◆ {shown}</span>
        {finish.newBest && <span className="best-chip">NEW BEST</span>}
        <div className="math">
          <span>Floor pay <b>+{finish.base}</b></span>
          {finish.bonusPercent > 0 && <span>Streak <b className="pos">+{finish.bonusPercent}%</b></span>}
          <span>Entry <b>{fee ? `−${fee}` : 'free'}</b></span>
        </div>
      </div>
      {status?.today?.beat != null && (
        <div className="beat">Higher than <b>{status.today.beat}%</b> of today’s {status.today.climbers < 10 ? 'early ' : ''}climbers</div>
      )}
      <div className="streak-next">
        <span>🔥 Day {finish.streak} streak</span>
        <b>Come back tomorrow for +{tomorrow}%</b>
        <small>Next climb in {countdown || 'a few hours'}{status && nextIsFree(status.nextAt) ? ' · FREE' : ''}.</small>
        <button className={`btn remind ${reminded ? 'done' : ''}`} disabled={reminded !== null}
          onClick={async () => { const ok = await bridge.remind(); setReminded(ok); if (ok) bridge.haptic('success'); }}>
          {reminded === null ? '🔔 Remind me when it opens' : reminded ? '✓ We’ll remind you' : 'Turn on notifications in Settings'}
        </button>
      </div>
      <div className="stats">
        <div><b>{finish.cleared ? 30 : Math.max(0, finish.fellOn - 1)}</b><span>floors cleared</span></div>
        <div><b>{parries}</b><span>parries</span></div>
        <div><b>{parries ? Math.round((perfects / parries) * 100) : 0}%</b><span>perfect</span></div>
      </div>
      <div className="result-actions">
        <button className="btn share" onClick={() => {
          const mod = MODIFIERS_BY_ID[(status?.modifier ?? 'none') as ModifierId] ?? MODIFIERS_BY_ID.none;
          bridge.share(`${finish.cleared ? 'I beat THE AUTHOR and cleared all 30 floors' : `I reached floor ${finish.fellOn} of 30`} in The Tower on Plotbreak. ${mod.jp} ${mod.name} · 🔥 day ${finish.streak}. Your turn: https://apps.apple.com/app/id6811307049`);
          bridge.track('tower_closed', { screen: 'share', seconds: 0 });
        }}>Share your climb</button>
        <button className="btn primary big" onClick={() => bridge.spend()}>Spend them in a story</button>
        <button className="btn" onClick={onPractice}>Practice · ◆1 a floor</button>
        <button className="btn ghost" onClick={onClose}>Done</button>
      </div>
    </div>
  );
}

function Practiced({ result, finish, status, onAgain, onBack }: {
  result: RunResult; finish: FinishResult | null; status: TowerStatus | null; onAgain: () => void; onBack: () => void;
}) {
  const fell = result.cleared ? 'You cleared all 30 floors' : `You reached floor ${result.fellOn}`;
  const ready = status && !status.today?.finished;
  const left = status ? Math.max(0, status.practice.cap - status.practice.earnedToday) : 0;
  return (
    <div className="result">
      <div className="episode">
        <span className="ep-label">PRACTICE</span>
        <h1>{fell}.</h1>
        <p>{finish ? (finish.reward ? `+◆${finish.reward} for the floors you cleared.` : 'Today’s practice credits are used up. Still good training.') : 'Practice result couldn’t be saved.'}</p>
      </div>
      <div className="reward small">
        <span className="reward-num">◆ {finish?.reward ?? 0}</span>
        <div className="math"><span>{left} practice credits left today</span></div>
      </div>
      <div className="result-actions">
        {ready && <button className="btn primary big" onClick={onBack}>Go to today’s climb</button>}
        <button className={`btn ${ready ? '' : 'primary big'}`} onClick={onAgain}>Practice again</button>
        <button className="btn ghost" onClick={onBack}>Back</button>
      </div>
    </div>
  );
}
