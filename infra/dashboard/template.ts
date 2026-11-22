/** The dashboard page. Pure function of the data; all rendering happens in the browser. */

export interface DashboardData {
  readonly generatedAt: string;
  readonly days: ReadonlyArray<{
    d: string; turns: number; players: number; new_players: number; returning: number;
    back_d1: number; revenue: number; purchases: number;
  }>;
  readonly cohorts: ReadonlyArray<{
    wk: string; n: number; e1: number; d1: number; e7: number; d7: number; dw: number; ever: number;
  }>;
}

export function renderDashboard(data: DashboardData): string {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Plotbreak Daily</title>
<style>
:root {
  color-scheme: light;
  --page: #f9f9f7; --surface: #fcfcfb; --ink: #0b0b0b; --ink-2: #52514e; --muted: #898781;
  --line: #e1e0d9; --ring: rgba(11,11,11,0.10); --good: #006300; --bad: #b3261e;
  --seq-0: #f1f0ec;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    color-scheme: dark;
    --page: #0d0d0d; --surface: #1a1a19; --ink: #f0efec; --ink-2: #c3c2b7; --muted: #898781;
    --line: #2c2c2a; --ring: rgba(255,255,255,0.10); --good: #0ca30c; --bad: #ef6a5f;
    --seq-0: #222221;
  }
}
:root[data-theme="dark"] {
  color-scheme: dark;
  --page: #0d0d0d; --surface: #1a1a19; --ink: #f0efec; --ink-2: #c3c2b7; --muted: #898781;
  --line: #2c2c2a; --ring: rgba(255,255,255,0.10); --good: #0ca30c; --bad: #ef6a5f;
  --seq-0: #222221;
}
* { box-sizing: border-box; }
body { margin: 0; background: var(--page); color: var(--ink);
  font: 15px/1.4 system-ui, -apple-system, "Segoe UI", sans-serif; font-variant-numeric: tabular-nums; }
main { max-width: 1280px; margin: 0 auto; padding: 28px 16px 64px; }
header { display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: 8px 24px; }
h1 { font-size: 26px; margin: 0; letter-spacing: -0.01em; }
h2 { font-size: 18px; margin: 40px 0 4px; }
.sub { color: var(--muted); font-size: 13px; }
.kpis { display: grid; grid-template-columns: repeat(auto-fit, minmax(165px, 1fr)); gap: 12px; margin-top: 20px; }
.kpi { background: var(--surface); border: 1px solid var(--ring); border-radius: 14px; padding: 16px 18px; }
.kpi .label { color: var(--ink-2); font-size: 13px; }
.kpi .value { font-size: 40px; font-weight: 650; letter-spacing: -0.02em; line-height: 1.1; margin: 6px 0 2px; }
.kpi .delta { font-size: 13px; color: var(--muted); }
.up { color: var(--good); } .down { color: var(--bad); }
.toolbar { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin: 12px 0 14px; }
.toolbar span { color: var(--ink-2); font-size: 13px; margin-right: 4px; }
.seg { display: inline-flex; background: var(--surface); border: 1px solid var(--ring); border-radius: 10px; padding: 3px; }
.seg button { border: 0; background: transparent; color: var(--ink-2); font: inherit; font-size: 14px;
  padding: 6px 14px; border-radius: 7px; cursor: pointer; }
.seg button[aria-pressed="true"] { background: var(--ink); color: var(--page); }
.scroll { overflow-x: auto; }
.cal { display: grid; grid-template-columns: repeat(7, minmax(108px, 1fr)) minmax(132px, 1.15fr); gap: 6px; min-width: 920px; }
.dow { color: var(--muted); font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; padding: 0 4px 2px; }
.tile { position: relative; aspect-ratio: 1 / 0.92; border-radius: 12px; padding: 10px 11px;
  display: flex; flex-direction: column; justify-content: space-between; border: 1px solid var(--ring); overflow: hidden; }
.tile .date { font-size: 12px; opacity: 0.85; display: flex; justify-content: space-between; gap: 4px; }
.tile .big { font-size: 34px; font-weight: 650; letter-spacing: -0.02em; line-height: 1; }
.tile .big small { font-size: 12px; font-weight: 500; opacity: 0.8; letter-spacing: 0; margin-left: 4px; }
.tile .rows { font-size: 12px; line-height: 1.35; opacity: 0.92; }
.tile .money { font-weight: 650; }
.tile.empty { background: transparent; border: 1px dashed var(--line); }
.tile.today { outline: 2px solid var(--ink); outline-offset: 1px; }
.tile.week { background: var(--surface); color: var(--ink); }
.tile.week .big { font-size: 30px; }
.tile.week .of { font-size: 11px; opacity: 0.7; }
.on-dark { color: #ffffff; } .on-light { color: #0b0b0b; }
.legend { display: flex; align-items: center; gap: 8px; color: var(--muted); font-size: 12px; margin-top: 10px; }
.legend .ramp { display: flex; gap: 2px; } .legend .ramp i { width: 22px; height: 10px; border-radius: 3px; display: block; }
.ret { display: grid; grid-template-columns: minmax(130px, 1.2fr) repeat(5, minmax(96px, 1fr)); gap: 6px; min-width: 700px; margin-top: 12px; }
.ret .h { color: var(--muted); font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; padding: 0 4px; align-self: end; }
.cell { border-radius: 12px; padding: 12px; border: 1px solid var(--ring); min-height: 88px; display: flex; flex-direction: column; justify-content: center; }
.cell .pct { font-size: 30px; font-weight: 650; letter-spacing: -0.02em; line-height: 1.05; }
.cell .of { font-size: 12px; opacity: 0.85; }
.cell.week { background: var(--surface); }
.cell.week b { font-size: 16px; } .cell.week .of { color: var(--ink-2); }
.cell.pending { background: transparent; border-style: dashed; color: var(--muted); }
.notes { color: var(--ink-2); font-size: 13px; margin-top: 40px; max-width: 760px; }
.notes li { margin: 4px 0; }
</style>
</head>
<body>
<main>
  <header>
    <h1>Plotbreak, day by day</h1>
    <div class="sub">Miami time · updated <span id="gen"></span> · Malik's accounts excluded</div>
  </header>

  <section class="kpis" id="kpis" aria-label="Last 7 days"></section>

  <h2>Every day</h2>
  <div class="toolbar">
    <span>Colour and big number:</span>
    <div class="seg" role="group" aria-label="Metric" id="metric"></div>
  </div>
  <div class="scroll"><div class="cal" id="cal"></div></div>
  <div class="legend" id="legend"></div>

  <h2>Do new players come back? (by the week they started)</h2>
  <div class="sub">D1 = played again the next day · D7 = played on day 7 · Within 7 = any day in the first week after · D-any = any later day, ever</div>
  <div class="scroll"><div class="ret" id="ret"></div></div>

  <ul class="notes">
    <li><b>Turns</b>: every turn finished that day. <b>Players</b>: anyone who played at least one turn. <b>New</b>: played their first turn ever that day. <b>Back</b>: played that day, started on an earlier day.</li>
    <li><b>Revenue</b>: gross App Store sales (before Apple's cut), converted to USD at rough fixed rates, plus $2.99 each time a Pass started. Pass renewals aren't recorded by the server, so they're missing.</li>
    <li>Returning players on a week tile: different people who played that week on a later day than their first, counted once however many days they came. "From before this week" leaves out people who started that same week.</li>
    <li>D1 on a day tile: how many of that day's new players came back the next day. A week or day still in progress is outlined or marked "so far".</li>
    <li>Rebuild with <code>npm run dashboard</code>.</li>
  </ul>
</main>
<script>
const DATA = ${json};
const RAMP = ['#cde2fb','#b7d3f6','#9ec5f4','#86b6ef','#6da7ec','#5598e7','#3987e5','#2a78d6','#256abf','#1c5cab','#184f95','#104281','#0d366b'];
const METRICS = {
  turns:   { label: 'Turns',   get: d => d.turns,       fmt: v => v.toLocaleString() },
  players: { label: 'Players', get: d => d.players,     fmt: v => v.toLocaleString() },
  new:     { label: 'New players', get: d => d.new_players, fmt: v => v.toLocaleString() },
  revenue: { label: 'Revenue', get: d => d.revenue,     fmt: v => '$' + (v >= 100 ? v.toFixed(0) : v.toFixed(2)) },
};
let metric = 'turns';
try { metric = localStorage.getItem('pb-metric') || 'turns'; if (!METRICS[metric]) metric = 'turns'; } catch {}

const $ = id => document.getElementById(id);
const days = DATA.days;
const today = days[days.length - 1].d;
const parse = s => new Date(s + 'T12:00:00');
const short = s => parse(s).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
const money = v => '$' + v.toFixed(2);
$('gen').textContent = DATA.generatedAt;

function color(v, max) {
  if (!v) return { bg: 'var(--seq-0)', cls: '' };
  const i = Math.min(RAMP.length - 1, Math.round(Math.sqrt(v / max) * (RAMP.length - 1)));
  return { bg: RAMP[i], cls: i >= 7 ? 'on-dark' : 'on-light' };
}

function kpis() {
  const last = days.slice(-7), prev = days.slice(-14, -7);
  const sum = (arr, f) => arr.reduce((a, d) => a + f(d), 0);
  const items = [
    ['Turns, last 7 days', d => d.turns, v => v.toLocaleString()],
    ['New players, last 7 days', d => d.new_players, v => v.toLocaleString()],
    ['Players per day, last 7 days', d => d.players / 7, v => v.toFixed(1)],
    ['Revenue, last 7 days', d => d.revenue, money],
  ];
  $('kpis').innerHTML = items.map(([label, f, fmt]) => {
    const a = sum(last, f), b = sum(prev, f);
    const pct = b ? Math.round((a - b) / b * 100) : null;
    const delta = pct === null ? 'no data the week before'
      : '<span class="' + (pct >= 0 ? 'up' : 'down') + '">' + (pct >= 0 ? '▲ ' : '▼ ') + Math.abs(pct) + '%</span> vs the 7 days before (' + fmt(b) + ')';
    return '<div class="kpi"><div class="label">' + label + '</div><div class="value">' + fmt(a) + '</div><div class="delta">' + delta + '</div></div>';
  }).join('') + (() => {
    const c = DATA.cohorts.filter(c => c.e7 > 0);
    const done = c[c.length - 1], d1c = DATA.cohorts.filter(c => c.e1 > 0).slice(-1)[0];
    const p = (a, b) => b ? Math.round(a / b * 100) + '%' : '–';
    // D-any: came back on ANY later day. Only players who started 7+ days ago
    // count, so a week that just began can't drag it down for lack of time.
    const allE = sum(DATA.cohorts, c => c.e7), allA = sum(DATA.cohorts, c => c.dany);
    return '<div class="kpi"><div class="label">Ever come back (D-any)</div><div class="value">' + p(allA, allE) +
      '</div><div class="delta">' + allA + ' of ' + allE + ' players who started 7+ days ago played again on a later day' +
      (done ? ' · week of ' + short(done.wk) + ': ' + p(done.dany, done.e7) : '') + '</div></div>' +
      '<div class="kpi"><div class="label">Latest D1 / D7</div><div class="value">' + (d1c ? p(d1c.d1, d1c.e1) : '–') + ' / ' + (done ? p(done.d7, done.e7) : '–') +
      '</div><div class="delta">D1: week of ' + (d1c ? short(d1c.wk) : '–') + ' · D7: week of ' + (done ? short(done.wk) : '–') + '</div></div>';
  })();
}

function controls() {
  $('metric').innerHTML = Object.entries(METRICS).map(([k, m]) =>
    '<button type="button" data-k="' + k + '" aria-pressed="' + (k === metric) + '">' + m.label + '</button>').join('');
  $('metric').onclick = e => {
    const k = e.target.dataset && e.target.dataset.k; if (!k) return;
    metric = k; try { localStorage.setItem('pb-metric', k); } catch {}
    controls(); calendar();
  };
}

function calendar() {
  const m = METRICS[metric];
  const max = Math.max(1, ...days.map(m.get));
  let html = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun','Week'].map(d => '<div class="dow">' + d + '</div>').join('');
  const first = parse(days[0].d);
  const lead = (first.getDay() + 6) % 7;
  const cells = Array(lead).fill(null).concat(days);
  while (cells.length % 7) cells.push(null);
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  for (const wk of weeks.reverse()) {
    for (const d of wk) {
      if (!d) { html += '<div class="tile empty"></div>'; continue; }
      const v = m.get(d), c = color(v, max);
      const isToday = d.d === today;
      // D1 for a day is only final once the day after it has ended.
      const d1 = d.new_players && days.length > 1 && d.d < days[days.length - 2].d ? ' · D1 ' + d.back_d1 + '/' + d.new_players : '';
      const rows = [];
      if (metric !== 'turns') rows.push(d.turns + ' turns');
      if (metric !== 'players') rows.push(d.players + ' players');
      rows.push(d.new_players + ' new · ' + d.returning + ' back' + d1);
      if (metric !== 'revenue' && d.revenue) rows.push('<span class="money">' + money(d.revenue) + '</span> · ' + d.purchases + ' sale' + (d.purchases > 1 ? 's' : ''));
      if (metric === 'revenue' && d.purchases) rows.push(d.purchases + ' sale' + (d.purchases > 1 ? 's' : ''));
      html += '<div class="tile ' + c.cls + (isToday ? ' today' : '') + '" style="background:' + c.bg + '" title="' + short(d.d) + '">' +
        '<div class="date"><span>' + short(d.d) + '</span><span>' + (isToday ? 'so far' : '') + '</span></div>' +
        '<div class="big">' + m.fmt(v) + '</div><div class="rows">' + rows.join('<br>') + '</div></div>';
    }
    const real = wk.filter(Boolean);
    const s = f => real.reduce((a, d) => a + f(d), 0);
    const partial = real.some(d => d.d === today);
    const wkRow = (DATA.weekly || []).find(w => w.wk === real[0].d);
    html += '<div class="tile week"><div class="date"><span>Week of ' + short(real[0].d) + '</span><span>' + (partial ? 'so far' : '') + '</span></div>' +
      '<div class="big">' + (metric === 'players' ? (s(d => d.players) / real.length).toFixed(1) + '<small>/day</small>' : m.fmt(s(m.get))) + '</div>' +
      '<div class="rows">' + s(d => d.turns).toLocaleString() + ' turns<br>' + s(d => d.new_players) + ' new players<br>' +
      (wkRow ? wkRow.returning + ' returning players<br><span class="of">(' + wkRow.earlier + ' from before this week)</span><br>' : '') +
      '<span class="money">' + money(s(d => d.revenue)) + '</span></div></div>';
  }
  $('cal').innerHTML = html;
  $('legend').innerHTML = '<span>0</span><div class="ramp">' + RAMP.filter((_, i) => i % 2 === 0).map(c => '<i style="background:' + c + '"></i>').join('') + '</div><span>' + m.fmt(max) + ' (busiest day)</span>';
}

function retention() {
  let html = ['Started week of', 'New players', 'D1', 'D7', 'Within 7', 'D-any (ever)'].map(h => '<div class="h">' + h + '</div>').join('');
  const cell = (a, b) => {
    if (!b) return '<div class="cell pending"><div class="pct">…</div><div class="of">not in yet</div></div>';
    const p = a / b, c = color(p, 0.5);
    return '<div class="cell ' + c.cls + '" style="background:' + c.bg + '"><div class="pct">' + Math.round(p * 100) + '%</div><div class="of">' + a + ' of ' + b + '</div></div>';
  };
  for (const c of DATA.cohorts.slice().reverse()) {
    const end = parse(c.wk); end.setDate(end.getDate() + 6);
    html += '<div class="cell week"><b>' + short(c.wk) + '</b><div class="of">to ' + end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + '</div></div>' +
      '<div class="cell week"><b style="font-size:26px">' + c.n + '</b></div>' +
      cell(c.d1, c.e1) + cell(c.d7, c.e7) + cell(c.dw, c.e7) + cell(c.ever, c.n);
  }
  $('ret').innerHTML = html;
}

kpis(); controls(); calendar(); retention();
</script>
</body>
</html>`;
}
