import { useCallback, useEffect, useMemo, useState } from 'react';
import { CLEAR_PAYOUT, ENTRY_FEE, FLOORS, PAYOUT_TIERS, floorSpec, ARCS, type Input, type RunResult } from '@tower';
import { bridge, type FinishResult, type TowerStatus } from './bridge';
import { Game } from './game/Game';
import { isMuted, setMuted, unlockAudio, sfx } from './game/audio';

type Screen =
  | { kind: 'loading' }
  | { kind: 'error'; message: string }
  | { kind: 'lobby'; status: TowerStatus }
  | { kind: 'play'; runId: string; seed: number }
  | { kind: 'settling'; result: RunResult }
  | { kind: 'result'; result: RunResult; finish: FinishResult; status: TowerStatus | null };

export function App() {
  const [screen, setScreen] = useState<Screen>({ kind: 'loading' });
  const [starting, setStarting] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const status = await bridge.status();
      setScreen({ kind: 'lobby', status });
      bridge.track('tower_opened', { played: !!status.today, free: status.free, balance: status.balance });
    } catch (e) {
      setScreen({ kind: 'error', message: e instanceof Error ? e.message : 'Could not reach the Tower.' });
    }
  }, []);

  useEffect(() => {
    // Dev: `?dev&play` skips the lobby (screenshots, autoplay).
    const p = new URLSearchParams(location.search);
    if (p.has('dev') && p.has('play')) {
      void bridge.start().then((r) => setScreen({ kind: 'play', runId: r.runId, seed: r.seed }));
      return;
    }
    void refresh();
  }, [refresh]);

  const start = async () => {
    unlockAudio();
    setStarting(true);
    try {
      const r = await bridge.start();
      setScreen({ kind: 'play', runId: r.runId, seed: r.seed });
    } catch (e) {
      setScreen({ kind: 'error', message: e instanceof Error ? e.message : 'Could not start.' });
    } finally {
      setStarting(false);
    }
  };

  const onEnd = useCallback(
    async (result: RunResult, inputs: Input[], realMs: number) => {
      if (screen.kind !== 'play') return;
      setScreen({ kind: 'settling', result });
      bridge.track('tower_fell', { fellOn: result.fellOn, cleared: result.cleared, ticks: result.ticks, realMs, boons: result.boons });
      try {
        const finish = await bridge.finish(screen.runId, inputs, result, realMs);
        let status: TowerStatus | null = null;
        try { status = await bridge.status(); } catch { /* shown without the countdown */ }
        setScreen({ kind: 'result', result, finish, status });
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
          <button className="btn ghost" onClick={() => bridge.close()}>Close</button>
        </div>
      )}
      {screen.kind === 'lobby' && <Lobby status={screen.status} onStart={start} starting={starting} />}
      {screen.kind === 'play' && <Game seed={screen.seed} runId={screen.runId} onEnd={onEnd} />}
      {screen.kind === 'settling' && <div className="center column"><div className="spinner" /><p className="muted">Counting your floors…</p></div>}
      {screen.kind === 'result' && <Result {...screen} />}
    </div>
  );
}

// ── lobby ────────────────────────────────────────────────────────────────

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

function Lobby({ status, onStart, starting }: { status: TowerStatus; onStart: () => void; starting: boolean }) {
  const countdown = useCountdown(status.nextAt);
  const [muted, setM] = useState(isMuted());
  const played = status.today?.finished;
  const canPay = status.free || status.balance >= status.fee;
  const resume = status.today && !status.today.finished;
  return (
    <div className="lobby">
      <header className="lobby-head">
        <button className="icon" onClick={() => bridge.close()} aria-label="Close">✕</button>
        <div className="balance">◆ {status.balance.toLocaleString()}</div>
        <button className="icon" onClick={() => { setMuted(!muted); setM(!muted); }} aria-label={muted ? 'Sound on' : 'Sound off'}>{muted ? '🔇' : '🔊'}</button>
      </header>

      <div className="title">
        <span className="title-jp">塔</span>
        <h1>THE TOWER</h1>
        <p className="tagline">30 floors. One climb a day. The higher you fall, the more you earn.</p>
      </div>

      <Ladder best={status.best} today={status.today?.finished ? status.today.fellOn : null} cleared={!!status.today?.cleared} />

      <section className="how">
        <div><b className="white">!</b><span><b>Tap anywhere</b> the moment a strike lands.</span></div>
        <div><b className="red">危</b><span><b>Red?</b> Hit <b>DODGE</b> instead.</span></div>
        <div><b className="gold">★</b><span>Pick a power-up after some floors. Bosses every 5th.</span></div>
      </section>

      <footer className="lobby-foot">
        {played ? (
          <>
            <div className="played">
              <span>Today: {status.today!.cleared ? 'cleared all 30 floors' : `fell on floor ${status.today!.fellOn}`}</span>
              <b>+{status.today!.reward} credits</b>
            </div>
            <div className="next">Next climb in <b>{countdown}</b>{nextIsFree(status.nextAt) && <span className="free-chip">FREE</span>}</div>
            <button className="btn primary" onClick={() => bridge.spend()}>Spend your credits</button>
          </>
        ) : (
          <>
            <button className="btn primary big" disabled={starting || (!canPay && !resume)} onClick={onStart}>
              {resume ? 'Continue today’s climb' : status.free ? <>Climb free today <span className="free-chip">SUNDAY</span></> : <>Climb · <span className="fee">◆ {status.fee}</span></>}
            </button>
            <div className="fine">
              {!canPay && !resume ? `You need ${status.fee} credits to enter. Free every Sunday.` : status.free ? 'No entry fee on Sundays.' : `Entry ${ENTRY_FEE} credits. Free every Sunday. One climb per day.`}
            </div>
          </>
        )}
      </footer>
    </div>
  );
}

function nextIsFree(iso: string): boolean {
  return new Date(iso).getUTCDay() === 0;
}

function Ladder({ best, today, cleared }: { best: number; today: number | null; cleared: boolean }) {
  const rows = useMemo(() => [{ from: FLOORS + 1, to: FLOORS + 1, credits: CLEAR_PAYOUT }, ...PAYOUT_TIERS.slice().reverse()], []);
  return (
    <section className="ladder" aria-label="Rewards">
      {rows.map((t, i) => {
        const clear = t.from > FLOORS;
        const arc = clear ? null : ARCS[floorSpec(t.from).arc]!;
        const boss = clear ? floorSpec(FLOORS).enemy.name : floorSpec(t.to).enemy.name;
        const reached = best >= t.from;
        const here = today !== null && (clear ? cleared : today >= t.from && today <= t.to && !cleared);
        return (
          <div key={i} className={`rung ${reached ? 'reached' : ''} ${here ? 'here' : ''}`} style={{ ['--arc' as string]: arc?.sky[1] ?? '#ffd23f' }}>
            <div className="rung-floors">{clear ? 'CLEAR' : `${t.from}–${t.to}`}</div>
            <div className="rung-name">
              <span>{clear ? 'Beat THE AUTHOR' : arc!.name}</span>
              <small>{clear ? 'The whole tower' : `Boss: ${boss}`}</small>
            </div>
            <div className="rung-pay">+{t.credits}</div>
          </div>
        );
      })}
      <div className="ladder-note">You’re paid for the floor you fall on.{best ? ` Your best: floor ${best > FLOORS ? 'CLEAR' : best}.` : ''}</div>
    </section>
  );
}

// ── result ───────────────────────────────────────────────────────────────

function Result({ result, finish, status }: { result: RunResult; finish: FinishResult; status: TowerStatus | null }) {
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
  return (
    <div className="result">
      <div className="episode">
        <span className="ep-label">{finish.cleared ? 'FINAL EPISODE' : 'NEXT EPISODE'}</span>
        <h1>{finish.cleared ? 'The tower is yours.' : `Floor ${finish.fellOn}. ${enemy} wins this one.`}</h1>
        <p>{finish.cleared ? 'You beat THE AUTHOR. Nobody wrote that ending for you.' : 'The climb continues tomorrow.'}</p>
      </div>
      <div className="reward">
        <span className="reward-label">You earned</span>
        <span className="reward-num">◆ {shown}</span>
        {finish.newBest && <span className="best-chip">NEW BEST</span>}
      </div>
      <div className="stats">
        <div><b>{finish.cleared ? 30 : Math.max(0, finish.fellOn - 1)}</b><span>floors cleared</span></div>
        <div><b>{parries}</b><span>parries</span></div>
        <div><b>{parries ? Math.round((perfects / parries) * 100) : 0}%</b><span>perfect</span></div>
      </div>
      <div className="next">Next climb in <b>{countdown || 'tomorrow'}</b>{status && nextIsFree(status.nextAt) && <span className="free-chip">FREE</span>}</div>
      <div className="result-actions">
        <button className="btn primary big" onClick={() => bridge.spend()}>Spend them in a story</button>
        <button className="btn ghost" onClick={() => bridge.close()}>Done</button>
      </div>
    </div>
  );
}
