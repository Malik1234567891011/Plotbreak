import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ARCS, CLEAR_PAYOUT, ENTRY_FEE, FLOORS, PAYOUT_TIERS, floorSpec, type Input, type RunResult } from '@tower';
import { bridge, type FinishResult, type TowerStatus } from './bridge';
import { Game } from './game/Game';
import { isMuted, setMuted, sfx, unlockAudio } from './game/audio';

type Screen =
  | { kind: 'loading' }
  | { kind: 'error'; message: string }
  | { kind: 'lobby'; status: TowerStatus }
  | { kind: 'play'; runId: string; seed: number; fee: number; practice: boolean }
  | { kind: 'settling'; result: RunResult }
  | { kind: 'result'; result: RunResult; finish: FinishResult; status: TowerStatus | null; fee: number }
  | { kind: 'practiced'; result: RunResult; status: TowerStatus | null };

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
      void bridge.start().then((r) => setScreen({ kind: 'play', runId: r.runId, seed: r.seed, fee: r.fee, practice: false }));
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
      setScreen({ kind: 'play', runId: r.runId, seed: r.seed, fee: r.fee, practice: false });
    } catch (e) {
      setScreen({ kind: 'error', message: e instanceof Error ? e.message : 'Could not start.' });
    } finally {
      setStarting(false);
    }
  };

  const practise = () => {
    unlockAudio();
    bridge.track('tower_started', { dev: false, fee: 0, resumed: false });
    setScreen({ kind: 'play', runId: 'practice', seed: (Math.random() * 2 ** 31) >>> 0, fee: 0, practice: true });
  };

  const onEnd = useCallback(
    async (result: RunResult, inputs: Input[], realMs: number) => {
      if (screen.kind !== 'play') return;
      if (screen.practice) {
        setScreen({ kind: 'practiced', result, status: lastStatus.current });
        return;
      }
      const fee = screen.fee;
      setScreen({ kind: 'settling', result });
      bridge.track('tower_fell', { fellOn: result.fellOn, cleared: result.cleared, ticks: result.ticks, realMs, boons: result.boons });
      try {
        const finish = await bridge.finish(screen.runId, inputs, result, realMs);
        let status: TowerStatus | null = null;
        try { status = await bridge.status(); lastStatus.current = status; } catch { /* shown without the countdown */ }
        setScreen({ kind: 'result', result, finish, status, fee });
        bridge.track('tower_reward_seen', { reward: finish.reward, fellOn: finish.fellOn, newBest: finish.newBest });
      } catch (e) {
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
      {screen.kind === 'lobby' && <Lobby status={screen.status} onStart={start} onPractice={practise} onClose={close} starting={starting} />}
      {screen.kind === 'play' && <Game seed={screen.seed} runId={screen.runId} practice={screen.practice} onEnd={onEnd} />}
      {screen.kind === 'settling' && <div className="center column"><div className="spinner" /><p className="muted">Counting your floors…</p></div>}
      {screen.kind === 'result' && <Result {...screen} onClose={close} onPractice={practise} />}
      {screen.kind === 'practiced' && <Practiced result={screen.result} status={screen.status} onAgain={practise} onBack={() => void refresh()} />}
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

function Lobby({ status, onStart, onPractice, onClose, starting }: {
  status: TowerStatus; onStart: () => void; onPractice: () => void; onClose: () => void; starting: boolean;
}) {
  const countdown = useCountdown(status.nextAt);
  const [muted, setM] = useState(isMuted());
  const played = !!status.today?.finished;
  const resume = !!status.today && !status.today.finished;
  const canPay = status.free || status.balance >= status.fee;
  const fee = status.free ? 0 : status.fee;
  return (
    <div className="lobby">
      <header className="lobby-head">
        <button className="icon" onClick={onClose} aria-label="Close">✕</button>
        <div className="balance">◆ {status.balance.toLocaleString()}</div>
        <button className="icon" onClick={() => { setMuted(!muted); setM(!muted); }} aria-label={muted ? 'Sound on' : 'Sound off'}>{muted ? '🔇' : '🔊'}</button>
      </header>

      <div className="title">
        <span className="title-jp">塔</span>
        <h1>THE TOWER</h1>
        <div className={`today-chip ${played ? 'done' : ''}`}>
          {played
            ? <>Today’s climb done · next in <b>{countdown}</b></>
            : <>1 climb today · {status.free ? <b>FREE (Sunday)</b> : <b>◆ {status.fee} entry</b>} · resets in <b>{countdown}</b></>}
        </div>
      </div>

      <Ladder best={status.best} today={played ? status.today!.fellOn : null} cleared={!!status.today?.cleared} fee={fee} />

      <section className="how">
        <div><b className="white">!</b><span><b>Tap anywhere</b> the moment a strike lands.</span></div>
        <div><b className="red">危</b><span><b>Red?</b> Hit <b>DODGE</b>. Only red.</span></div>
        <div><b className="gold">★</b><span>Power-ups between floors. A boss every 5th.</span></div>
      </section>

      <footer className="lobby-foot">
        {played ? (
          <>
            <div className="played">
              <span>{status.today!.cleared ? 'You cleared all 30 floors' : `You fell on floor ${status.today!.fellOn}`}</span>
              <b>{signed(status.today!.reward - fee)} net</b>
            </div>
            <button className="btn primary big" onClick={onPractice}>Practice · free, no rewards</button>
            <button className="btn ghost" onClick={() => bridge.spend()}>Spend your credits</button>
          </>
        ) : (
          <>
            <button className="btn primary big" disabled={starting || (!canPay && !resume)} onClick={onStart}>
              {resume ? 'Continue today’s climb' : status.free ? 'Climb free today' : <>Climb · <span className="fee">◆ {status.fee}</span></>}
            </button>
            <div className="fine">
              {!canPay && !resume ? `You need ◆ ${status.fee} to enter. Sundays are free.` : 'One climb a day. You’re paid for the floor you fall on.'}
              {' '}<button className="link" onClick={onPractice}>Practice first</button>
            </div>
          </>
        )}
      </footer>
    </div>
  );
}

function Ladder({ best, today, cleared, fee }: { best: number; today: number | null; cleared: boolean; fee: number }) {
  const rows = useMemo(() => [{ from: FLOORS + 1, to: FLOORS + 1, credits: CLEAR_PAYOUT }, ...PAYOUT_TIERS.slice().reverse()], []);
  return (
    <section className="ladder" aria-label="Rewards">
      <div className="ladder-head"><span>Fall on</span><span></span><span>You get</span><span>Net</span></div>
      {rows.map((t, i) => {
        const clear = t.from > FLOORS;
        const arc = clear ? null : ARCS[floorSpec(t.from).arc]!;
        const reached = best >= t.from;
        const here = today !== null && (clear ? cleared : today >= t.from && today <= t.to && !cleared);
        const net = t.credits - fee;
        return (
          <div key={i} className={`rung ${reached ? 'reached' : ''} ${here ? 'here' : ''}`} style={{ ['--arc' as string]: arc?.sky[1] ?? '#ffd23f' }}>
            <div className="rung-floors">{clear ? 'CLEAR' : `${t.from}–${t.to}`}</div>
            <div className="rung-name">{clear ? 'Beat THE AUTHOR' : arc!.name}</div>
            <div className="rung-pay">◆{t.credits}</div>
            <div className={`rung-net ${net > 0 ? 'pos' : net < 0 ? 'neg' : ''}`}>{signed(net)}</div>
          </div>
        );
      })}
      {best > 0 && <div className="ladder-note">Your best: {best > FLOORS ? 'cleared the tower' : `floor ${best}`}</div>}
    </section>
  );
}

// ── results ──────────────────────────────────────────────────────────────

function Result({ result, finish, status, fee, onClose, onPractice }: {
  result: RunResult; finish: FinishResult; status: TowerStatus | null; fee: number; onClose: () => void; onPractice: () => void;
}) {
  const [shown, setShown] = useState(0);
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
          <span>Entry <b>{fee ? `−${fee}` : 'free'}</b></span>
          <span>Payout <b>+{finish.reward}</b></span>
          <span>Net <b className={finish.reward - fee >= 0 ? 'pos' : 'neg'}>{signed(finish.reward - fee)}</b></span>
        </div>
      </div>
      <div className="stats">
        <div><b>{finish.cleared ? 30 : Math.max(0, finish.fellOn - 1)}</b><span>floors cleared</span></div>
        <div><b>{parries}</b><span>parries</span></div>
        <div><b>{parries ? Math.round((perfects / parries) * 100) : 0}%</b><span>perfect</span></div>
      </div>
      <div className="next">Next climb in <b>{countdown || 'tomorrow'}</b>{status && nextIsFree(status.nextAt) && <span className="free-chip">FREE</span>}</div>
      <div className="result-actions">
        <button className="btn primary big" onClick={() => bridge.spend()}>Spend them in a story</button>
        <button className="btn" onClick={onPractice}>Practice · free</button>
        <button className="btn ghost" onClick={onClose}>Done</button>
      </div>
    </div>
  );
}

function Practiced({ result, status, onAgain, onBack }: { result: RunResult; status: TowerStatus | null; onAgain: () => void; onBack: () => void }) {
  const fell = result.cleared ? 'You cleared all 30 floors' : `You reached floor ${result.fellOn}`;
  const ready = status && !status.today?.finished;
  return (
    <div className="result">
      <div className="episode">
        <span className="ep-label">PRACTICE</span>
        <h1>{fell}.</h1>
        <p>{ready ? 'Today’s real climb is still waiting. It pays.' : 'Practice never costs or pays anything.'}</p>
      </div>
      <div className="result-actions">
        {ready && <button className="btn primary big" onClick={onBack}>Go to today’s climb</button>}
        <button className={`btn ${ready ? '' : 'primary big'}`} onClick={onAgain}>Practice again</button>
        <button className="btn ghost" onClick={onBack}>Back</button>
      </div>
    </div>
  );
}
