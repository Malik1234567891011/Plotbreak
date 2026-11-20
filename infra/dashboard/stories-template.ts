/** The story-by-story page. Pure function of the data; all rendering happens in the browser. */

export interface StoriesData {
  readonly generatedAt: string;
  readonly today: string;
  readonly start: string;
  readonly stories: ReadonlyArray<Record<string, unknown>>;
  readonly daily: ReadonlyArray<{ story_id: string; d: string; p: number; t: number; n: number }>;
  readonly weekly: ReadonlyArray<{ story_id: string; wk: string; p: number; t: number }>;
  readonly signals: ReadonlyArray<Record<string, unknown>>;
  readonly unlinked: { turns: number; unlinked: number };
  readonly unattributedSales: number;
  readonly totalSales: number;
}

export function renderStories(data: StoriesData): string {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Plotbreak Stories</title>
<style>
:root {
  color-scheme: light;
  --page: #f9f9f7; --surface: #fcfcfb; --ink: #0b0b0b; --ink-2: #52514e; --muted: #898781;
  --line: #e1e0d9; --ring: rgba(11,11,11,0.10); --good: #006300; --bad: #b3261e; --seq-0: #f1f0ec;
  --bar: #2a78d6; --bar-dim: #b7d3f6;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    color-scheme: dark;
    --page: #0d0d0d; --surface: #1a1a19; --ink: #f0efec; --ink-2: #c3c2b7; --muted: #898781;
    --line: #2c2c2a; --ring: rgba(255,255,255,0.10); --good: #0ca30c; --bad: #ef6a5f; --seq-0: #222221;
    --bar: #5598e7; --bar-dim: #1c5cab;
  }
}
:root[data-theme="dark"] {
  color-scheme: dark;
  --page: #0d0d0d; --surface: #1a1a19; --ink: #f0efec; --ink-2: #c3c2b7; --muted: #898781;
  --line: #2c2c2a; --ring: rgba(255,255,255,0.10); --good: #0ca30c; --bad: #ef6a5f; --seq-0: #222221;
  --bar: #5598e7; --bar-dim: #1c5cab;
}
* { box-sizing: border-box; }
body { margin: 0; background: var(--page); color: var(--ink);
  font: 15px/1.4 system-ui, -apple-system, "Segoe UI", sans-serif; font-variant-numeric: tabular-nums; }
main { max-width: 1280px; margin: 0 auto; padding: 28px 16px 64px; }
header { display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: 8px 24px; }
h1 { font-size: 26px; margin: 0; letter-spacing: -0.01em; }
h2 { font-size: 18px; margin: 44px 0 4px; }
a { color: inherit; }
.sub { color: var(--muted); font-size: 13px; }
.kpis { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; margin-top: 20px; }
.kpi { background: var(--surface); border: 1px solid var(--ring); border-radius: 14px; padding: 16px 18px; }
.kpi .label { color: var(--ink-2); font-size: 13px; }
.kpi .value { font-size: 34px; font-weight: 650; letter-spacing: -0.02em; line-height: 1.15; margin: 6px 0 2px; overflow-wrap: anywhere; }
.kpi .delta { font-size: 13px; color: var(--muted); }
.toolbar { display: flex; flex-wrap: wrap; gap: 8px 14px; align-items: center; margin: 12px 0 14px; }
.toolbar > span { color: var(--ink-2); font-size: 13px; }
.seg { display: inline-flex; flex-wrap: wrap; background: var(--surface); border: 1px solid var(--ring); border-radius: 10px; padding: 3px; }
.seg button { border: 0; background: transparent; color: var(--ink-2); font: inherit; font-size: 14px;
  padding: 6px 12px; border-radius: 7px; cursor: pointer; }
.seg button[aria-pressed="true"] { background: var(--ink); color: var(--page); }
select { font: inherit; font-size: 14px; padding: 6px 10px; border-radius: 10px; border: 1px solid var(--ring); background: var(--surface); color: var(--ink); max-width: 100%; }
.cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 270px), 1fr)); gap: 10px; }
.card { border-radius: 14px; padding: 14px 15px; border: 1px solid var(--ring); cursor: pointer; text-align: left;
  font: inherit; color: inherit; display: flex; flex-direction: column; gap: 8px; min-height: 230px; }
.card:focus-visible, .card.sel { outline: 2px solid var(--ink); outline-offset: 2px; }
.card .top { display: flex; justify-content: space-between; gap: 8px; align-items: start; }
.card .name { font-weight: 650; font-size: 16px; line-height: 1.2; }
.card .rank { font-size: 12px; opacity: 0.75; }
.tags { display: flex; gap: 4px; flex-wrap: wrap; }
.tag { font-size: 11px; padding: 1px 7px; border-radius: 99px; border: 1px solid currentColor; opacity: 0.75; }
.card .big { font-size: 38px; font-weight: 650; letter-spacing: -0.02em; line-height: 1; }
.card .big small { font-size: 12px; font-weight: 500; opacity: 0.85; letter-spacing: 0; margin-left: 4px; }
.card dl { display: grid; grid-template-columns: auto 1fr; gap: 2px 8px; margin: 0; font-size: 12px; }
.card dt { opacity: 0.75; white-space: nowrap; } .card dd { margin: 0; text-align: right; font-weight: 550; white-space: nowrap; }
.on-dark { color: #ffffff; } .on-light { color: #0b0b0b; }
.bars { display: grid; grid-template-columns: minmax(120px, 220px) 1fr; gap: 6px 12px; align-items: center; margin-top: 14px; }
.bars .lbl { font-size: 14px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.bars .lbl small { color: var(--muted); }
.track { position: relative; height: 26px; }
.fill { position: absolute; left: 0; top: 3px; bottom: 3px; border-radius: 0 4px 4px 0; background: var(--bar); min-width: 2px; }
.fill.thin { background: var(--bar-dim); }
.track .v { position: absolute; top: 3px; font-size: 13px; line-height: 20px; color: var(--ink-2); white-space: nowrap; }
.base { position: absolute; top: -3px; bottom: -3px; border-left: 1.5px dashed var(--muted); }
.sig { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 14px; margin-top: 14px; }
.sigbox { background: var(--surface); border: 1px solid var(--ring); border-radius: 14px; padding: 14px 16px; }
.sigbox h3 { font-size: 14px; margin: 0 0 8px; }
.sigrow { display: grid; grid-template-columns: minmax(90px, 1.1fr) 2fr 70px; gap: 8px; align-items: center; font-size: 13px; padding: 3px 0; }
.sigrow .n { color: var(--muted); text-align: right; font-size: 12px; }
.minibar { position: relative; height: 20px; background: var(--seq-0); border-radius: 4px; overflow: visible; }
.minibar i { position: absolute; left: 0; top: 0; bottom: 0; background: var(--bar); border-radius: 0 4px 4px 0; }
.minibar i.thin { background: var(--bar-dim); }
.minibar b { position: absolute; left: 6px; top: 0; line-height: 20px; font-size: 12px; font-weight: 600; color: var(--ink); text-shadow: 0 0 3px var(--surface); }
.minibar .base { top: -2px; bottom: -2px; }
.scroll { overflow-x: auto; }
.cal { display: grid; grid-template-columns: repeat(7, minmax(84px, 1fr)) minmax(100px, 1.1fr); gap: 5px; min-width: 760px; }
.dow { color: var(--muted); font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; padding: 0 4px 2px; }
.tile { border-radius: 10px; padding: 8px 9px; display: flex; flex-direction: column; justify-content: space-between;
  border: 1px solid var(--ring); aspect-ratio: 1 / 0.8; }
.tile .date { font-size: 11px; opacity: 0.85; }
.tile .big { font-size: 26px; font-weight: 650; line-height: 1; }
.tile .rows { font-size: 11px; opacity: 0.9; }
.tile.empty { background: transparent; border: 1px dashed var(--line); }
.tile.today { outline: 2px solid var(--ink); outline-offset: 1px; }
.tile.week { background: var(--surface); }
table { border-collapse: collapse; width: 100%; font-size: 13px; min-width: 1100px; }
th, td { padding: 7px 8px; border-bottom: 1px solid var(--line); text-align: right; white-space: nowrap; }
th:first-child, td:first-child { text-align: left; }
th { color: var(--ink-2); font-weight: 600; cursor: pointer; position: sticky; top: 0; background: var(--page); user-select: none; }
th[aria-sort] { color: var(--ink); }
tbody tr:hover { background: var(--surface); }
.muted { color: var(--muted); }
.notes { color: var(--ink-2); font-size: 13px; margin-top: 40px; max-width: 800px; }
.notes li { margin: 4px 0; }
</style>
</head>
<body>
<main>
  <header>
    <h1>Plotbreak, story by story</h1>
    <div class="sub">Miami time · updated <span id="gen"></span> · since Sep 14 · Malik's accounts excluded · <a href="index.html">day-by-day page</a></div>
  </header>

  <section class="kpis" id="kpis"></section>

  <h2>Every story</h2>
  <div class="sub">Click a story to see it day by day below.</div>
  <div class="toolbar">
    <span>Sort and big number:</span><div class="seg" id="sort" role="group" aria-label="Sort by"></div>
    <span>Show:</span><div class="seg" id="kind" role="group" aria-label="Which stories"></div>
  </div>
  <div class="cards" id="cards"></div>

  <h2>Players whose first story it was: how many came back on a later day</h2>
  <div class="sub">Shelf stories with 5+ first-timers and player-made stories with 10+, counting only players whose first day is over. The dashed line is everyone. Pale bars have fewer than 25 players, so treat them as a hint.</div>
  <div class="bars" id="first"></div>

  <h2>Signals: what new players did on day one, and how many came back</h2>
  <div class="sub" id="sigsub"></div>
  <div class="sig" id="sig"></div>

  <h2 id="detail-h">One story, day by day</h2>
  <div class="toolbar"><select id="pick" aria-label="Story"></select><div class="seg" id="dm" role="group" aria-label="Metric"></div></div>
  <div class="sub" id="detail-sub"></div>
  <div class="scroll" style="margin-top:10px"><div class="cal" id="cal"></div></div>

  <h2>All stories, table</h2>
  <div class="sub">Click a column to sort.</div>
  <div class="scroll" style="margin-top:10px"><table id="tbl"></table></div>

  <ul class="notes">
    <li><b>Players</b>: different people who finished at least one turn in the story. <b>Turns per player</b>: all their turns in that story, all time.</li>
    <li><b>First story</b>: the story of a player's first turn ever. <b>Came back</b>: played anything on any later day. <b>Came back to it</b>: played this same story again on a later day. Only players whose first day has ended are counted.</li>
    <li><b>Sales</b>: an App Store purchase belongs to the story the buyer last played in the 6 hours before buying, or the one they played in the hour after. Gross, USD at rough rates. Pass subscriptions aren't counted here.</li>
    <li><b>Missing</b>: turns by deleted accounts can't be tied to a story because their sessions are gone (<span id="unl"></span>). They count on the day-by-day page but not here.</li>
    <li>Rebuild with <code>npm run dashboard:stories</code>.</li>
  </ul>
</main>
<script>
const DATA = ${json};
const RAMP = ['#cde2fb','#b7d3f6','#9ec5f4','#86b6ef','#6da7ec','#5598e7','#3987e5','#2a78d6','#256abf','#1c5cab','#184f95','#104281','#0d366b'];
const $ = id => document.getElementById(id);
const S = DATA.stories;
const byId = Object.fromEntries(S.map(s => [s.story_id, s]));
const parse = s => new Date(s + 'T12:00:00');
const short = s => parse(s).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
const pct = (a, b) => b ? Math.round(a / b * 100) + '%' : '–';
const num = v => v == null ? '–' : (Math.round(v * 10) / 10).toLocaleString();
const money = v => '$' + v.toFixed(2);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
$('gen').textContent = DATA.generatedAt;
$('unl').textContent = DATA.unlinked.unlinked.toLocaleString() + ' of ' + DATA.unlinked.turns.toLocaleString() + ' turns, ' + DATA.unattributedSales + ' of ' + DATA.totalSales + ' sales';

function color(v, max) {
  if (!v || max <= 0) return { bg: 'var(--seq-0)', cls: '' };
  const i = Math.min(RAMP.length - 1, Math.round(Math.sqrt(Math.min(v, max) / max) * (RAMP.length - 1)));
  return { bg: RAMP[i], cls: i >= 7 ? 'on-dark' : 'on-light' };
}
function store(k, v) { try { localStorage.setItem(k, v); } catch {} }
function load(k, d) { try { return localStorage.getItem(k) || d; } catch { return d; } }

const backRate = s => s.first_elig ? s.first_back / s.first_elig : null;
const SORTS = {
  players:  { label: 'Players, all time', get: s => s.players, fmt: v => v.toLocaleString(), unit: 'players' },
  players7: { label: 'Players, 7 days', get: s => s.players_7, fmt: v => v.toLocaleString(), unit: 'players this week' },
  turns:    { label: 'Turns', get: s => s.turns, fmt: v => v.toLocaleString(), unit: 'turns' },
  med:      { label: 'Median turns', get: s => s.med, fmt: v => num(v), unit: 'median turns/player' },
  back:     { label: 'First-timers back', get: s => s.first_elig >= 5 ? backRate(s) : null, fmt: v => v == null ? '–' : Math.round(v * 100) + '%', unit: 'came back' },
  sales:    { label: 'Sales', get: s => s.sales_usd, fmt: v => money(v), unit: 'in sales' },
};
const KINDS = { shelf: 'Shelf', made: 'Player-made', all: 'All' };
let sort = load('pbs-sort', 'players'); if (!SORTS[sort]) sort = 'players';
let kind = load('pbs-kind', 'shelf'); if (!KINDS[kind]) kind = 'shelf';
let picked = load('pbs-pick', S[0] && S[0].story_id); if (!byId[picked]) picked = S[0] && S[0].story_id;
let dmetric = load('pbs-dm', 'p');

function visible() {
  return S.filter(s => kind === 'all' || (kind === 'shelf') === s.official);
}

function kpis() {
  const shelf = S.filter(s => s.official);
  const top7 = S.slice().sort((a, b) => b.players_7 - a.players_7)[0];
  const topAll = S[0];
  const ok = S.filter(s => s.first_elig >= 25).sort((a, b) => backRate(b) - backRate(a));
  const allElig = DATA.signals.length, allBack = DATA.signals.filter(r => r.back).length;
  const sold = S.slice().sort((a, b) => b.sales_usd - a.sales_usd)[0];
  const items = [
    ['Most played, all time', topAll.title, topAll.players + ' players · ' + topAll.turns.toLocaleString() + ' turns'],
    ['Most played, last 7 days', top7.title, top7.players_7 + ' players · ' + top7.turns_7.toLocaleString() + ' turns'],
    ['Best first story for coming back', ok[0] ? ok[0].title : '–', ok[0] ? pct(ok[0].first_back, ok[0].first_elig) + ' of ' + ok[0].first_elig + ' came back (everyone: ' + pct(allBack, allElig) + ')' : 'needs 25+ first-timers'],
    ['Most sales while playing', sold && sold.sales ? sold.title : '–', sold ? sold.sales + ' sales · ' + money(sold.sales_usd) : ''],
  ];
  $('kpis').innerHTML = items.map(([l, v, d]) => '<div class="kpi"><div class="label">' + l + '</div><div class="value">' + esc(v) + '</div><div class="delta">' + d + '</div></div>').join('');
}

function seg(el, opts, cur, on) {
  el.innerHTML = Object.entries(opts).map(([k, l]) => '<button type="button" data-k="' + k + '" aria-pressed="' + (k === cur) + '">' + l + '</button>').join('');
  el.onclick = e => { const k = e.target.dataset && e.target.dataset.k; if (k) on(k); };
}

function cards() {
  seg($('sort'), Object.fromEntries(Object.entries(SORTS).map(([k, m]) => [k, m.label])), sort, k => { sort = k; store('pbs-sort', k); cards(); });
  seg($('kind'), KINDS, kind, k => { kind = k; store('pbs-kind', k); cards(); });
  const m = SORTS[sort];
  const list = visible().slice().sort((a, b) => (m.get(b) ?? -1) - (m.get(a) ?? -1) || b.players - a.players);
  const max = Math.max(0, ...list.map(s => m.get(s) ?? 0));
  $('cards').innerHTML = list.map((s, i) => {
    const v = m.get(s), c = color(v ?? 0, max);
    const tags = (s.official ? '<span class="tag">shelf</span>' : '<span class="tag">player-made</span>') + (s.rewritten ? '<span class="tag">rewritten</span>' : '');
    const delta = s.players_p7 ? (s.players_7 - s.players_p7) : null;
    return '<button class="card ' + c.cls + (s.story_id === picked ? ' sel' : '') + '" style="background:' + c.bg + '" data-id="' + esc(s.story_id) + '" title="' + esc(s.title) + ': click for day by day">' +
      '<div class="top"><div><div class="name">' + esc(s.title) + '</div><div class="tags" style="margin-top:4px">' + tags + '</div></div><div class="rank">#' + (i + 1) + '</div></div>' +
      '<div class="big">' + m.fmt(v) + '<small>' + m.unit + '</small></div>' +
      '<dl>' +
      '<dt>Players</dt><dd>' + s.players_today + ' today · ' + s.players_7 + ' 7d · ' + s.players + ' all</dd>' +
      '<dt>Turns</dt><dd>' + s.turns_7.toLocaleString() + ' 7d · ' + s.turns.toLocaleString() + ' all</dd>' +
      '<dt>Turns/player</dt><dd>median ' + num(s.med) + ' · avg ' + num(s.avg) + '</dd>' +
      '<dt>Played 10+</dt><dd>' + s.ten_plus + ' of ' + s.players + ' (' + pct(s.ten_plus, s.players) + ')</dd>' +
      '<dt>First story for</dt><dd>' + s.first_n + ' players</dd>' +
      '<dt>…came back</dt><dd>' + (s.first_elig ? s.first_back + '/' + s.first_elig + ' (' + pct(s.first_back, s.first_elig) + ') · D1 ' + pct(s.first_d1, s.first_elig) : '–') + '</dd>' +
      '<dt>Sales</dt><dd>' + (s.sales ? s.sales + ' · ' + money(s.sales_usd) : '–') + '</dd>' +
      '</dl></button>';
  }).join('') || '<div class="sub">No stories here.</div>';
  $('cards').onclick = e => { const b = e.target.closest('.card'); if (b) { pick(b.dataset.id); document.getElementById('detail-h').scrollIntoView({ behavior: 'smooth' }); } };
}

function firstBars() {
  const all = DATA.signals, base = all.filter(r => r.back).length / Math.max(1, all.length);
  const list = S.filter(s => s.first_elig >= 10 || (s.official && s.first_elig >= 5)).sort((a, b) => backRate(b) - backRate(a) || b.first_elig - a.first_elig);
  const max = Math.max(base, ...list.map(backRate)) * 1.6;
  $('first').innerHTML = list.map(s => {
    const r = backRate(s), w = r / max * 100;
    return '<div class="lbl" title="' + esc(s.title) + '">' + esc(s.title) + ' <small>' + (s.official ? '' : '(player-made)') + '</small></div>' +
      '<div class="track" title="' + esc(s.title) + ': ' + s.first_back + ' of ' + s.first_elig + ' came back · ' + s.first_back_same + ' came back to this story · D1 ' + s.first_d1 + ' · median day-one turns ' + num(s.day1_med) + '">' +
      '<div class="fill' + (s.first_elig < 25 ? ' thin' : '') + '" style="width:' + w + '%"></div>' +
      '<div class="base" style="left:' + (base / max * 100) + '%"></div>' +
      '<div class="v" style="left:calc(' + w + '% + 8px)">' + pct(s.first_back, s.first_elig) + ' · ' + s.first_back + ' of ' + s.first_elig + (s.first_back_same ? ' · ' + s.first_back_same + ' to this story' : '') + '</div></div>';
  }).join('');
}

function signals() {
  const R = DATA.signals, n = R.length, back = R.filter(r => r.back).length, base = back / Math.max(1, n);
  $('sigsub').textContent = n + ' new players whose first day is over; ' + back + ' (' + pct(back, n) + ') came back on a later day — that\\'s the dashed line. Pale bars have fewer than 25 players.';
  const groups = [
    ['Turns on day one', r => r.turns <= 1 ? '1' : r.turns <= 4 ? '2–4' : r.turns <= 9 ? '5–9' : r.turns <= 19 ? '10–19' : r.turns <= 39 ? '20–39' : '40+', ['1', '2–4', '5–9', '10–19', '20–39', '40+']],
    ['Stories tried on day one', r => r.stories <= 1 ? '1' : r.stories === 2 ? '2' : '3+', ['1', '2', '3+']],
    ['Bought something on day one', r => r.bought ? 'Bought' : 'Didn\\'t', ['Bought', 'Didn\\'t']],
    ['Made their own story on day one', r => r.created ? 'Made one' : 'Didn\\'t', ['Made one', 'Didn\\'t']],
    ['First story was', r => !r.first_story ? 'Unknown' : !r.first_official ? 'Player-made' : r.first_rewritten ? 'Shelf, rewritten' : 'Shelf, classic', ['Shelf, classic', 'Shelf, rewritten', 'Player-made']],
    ['Time they started (Miami)', r => r.hr < 6 ? 'Night 0–6' : r.hr < 12 ? 'Morning 6–12' : r.hr < 18 ? 'Afternoon 12–6' : 'Evening 6–12', ['Night 0–6', 'Morning 6–12', 'Afternoon 12–6', 'Evening 6–12']],
    ['Day they started', r => r.dow >= 6 ? 'Weekend' : 'Weekday', ['Weekday', 'Weekend']],
  ];
  $('sig').innerHTML = groups.map(([title, key, order]) => {
    const m = {};
    for (const r of R) { const k = key(r); (m[k] = m[k] || { n: 0, b: 0, d1: 0 }); m[k].n++; if (r.back) m[k].b++; if (r.back_d1) m[k].d1++; }
    const max = Math.max(base, ...order.map(k => m[k] ? m[k].b / m[k].n : 0)) * 1.1 || 1;
    return '<div class="sigbox"><h3>' + title + '</h3>' + order.filter(k => m[k]).map(k => {
      const g = m[k], r = g.b / g.n;
      return '<div class="sigrow" title="' + esc(k) + ': ' + g.b + ' of ' + g.n + ' came back · ' + g.d1 + ' came back the next day (D1 ' + pct(g.d1, g.n) + ')">' +
        '<div>' + esc(k) + '</div><div class="minibar"><i class="' + (g.n < 25 ? 'thin' : '') + '" style="width:' + (r / max * 100) + '%"></i>' +
        '<div class="base" style="left:' + (base / max * 100) + '%"></div><b>' + pct(g.b, g.n) + '</b></div><div class="n">' + g.b + ' of ' + g.n + '</div></div>';
    }).join('') + '</div>';
  }).join('');
}

function pick(id) {
  if (!byId[id]) return;
  picked = id; store('pbs-pick', id);
  for (const c of document.querySelectorAll('.card')) c.classList.toggle('sel', c.dataset.id === id);
  $('pick').value = id;
  detail();
}

function detail() {
  const s = byId[picked]; if (!s) return;
  const DM = { p: 'Players', n: 'New players', t: 'Turns' };
  if (!DM[dmetric]) dmetric = 'p';
  seg($('dm'), DM, dmetric, k => { dmetric = k; store('pbs-dm', k); detail(); });
  const rows = DATA.daily.filter(r => r.story_id === picked);
  const weeks = Object.fromEntries(DATA.weekly.filter(r => r.story_id === picked).map(r => [r.wk, r]));
  const byDay = Object.fromEntries(rows.map(r => [r.d, r]));
  $('detail-sub').textContent = s.title + ' · first played ' + short(s.first_d) + ' · last played ' + short(s.last_d) + ' · ' + s.players + ' players · ' + s.turns.toLocaleString() + ' turns · median ' + num(s.med) + ' turns per player';
  const startD = parse(rows.length ? rows[0].d : DATA.today), endD = parse(DATA.today);
  startD.setDate(startD.getDate() - ((startD.getDay() + 6) % 7));
  const max = Math.max(1, ...rows.map(r => r[dmetric]));
  let html = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun','Week'].map(d => '<div class="dow">' + d + '</div>').join('');
  const wkStarts = [];
  for (let d = new Date(startD); d <= endD; d.setDate(d.getDate() + 7)) wkStarts.push(new Date(d));
  const iso = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  for (const ws of wkStarts.reverse()) {
    for (let i = 0; i < 7; i++) {
      const d = new Date(ws); d.setDate(d.getDate() + i);
      const k = iso(d);
      if (d > endD) { html += '<div class="tile empty"></div>'; continue; }
      const r = byDay[k] || { p: 0, n: 0, t: 0 }, c = color(r[dmetric], max);
      html += '<div class="tile ' + c.cls + (k === DATA.today ? ' today' : '') + '" style="background:' + c.bg + '" title="' + short(k) + ': ' + r.p + ' players, ' + r.n + ' new, ' + r.t + ' turns">' +
        '<div class="date">' + short(k) + (k === DATA.today ? ' · so far' : '') + '</div><div class="big">' + r[dmetric] + '</div>' +
        '<div class="rows">' + (dmetric !== 'p' ? r.p + ' players<br>' : '') + (dmetric !== 'n' ? r.n + ' new<br>' : '') + (dmetric !== 't' ? r.t + ' turns' : '') + '</div></div>';
    }
    const w = weeks[iso(ws)] || { p: 0, t: 0 };
    html += '<div class="tile week"><div class="date">Week of ' + short(iso(ws)) + '</div><div class="big">' + w.p + '</div><div class="rows">different players<br>' + w.t.toLocaleString() + ' turns</div></div>';
  }
  $('cal').innerHTML = html;
}

function picker() {
  const opts = (label, list) => '<optgroup label="' + label + '">' + list.map(s => '<option value="' + esc(s.story_id) + '">' + esc(s.title) + ' (' + s.players + ')</option>').join('') + '</optgroup>';
  $('pick').innerHTML = opts('Shelf', S.filter(s => s.official)) + opts('Player-made', S.filter(s => !s.official));
  $('pick').value = picked;
  $('pick').onchange = e => pick(e.target.value);
}

const COLS = [
  ['Story', s => s.title, s => esc(s.title) + (s.official ? '' : ' <span class="muted">· player-made</span>') + (s.rewritten ? ' <span class="muted">· rewritten</span>' : '')],
  ['Today', s => s.players_today], ['7 days', s => s.players_7], ['Prior 7', s => s.players_p7], ['All time', s => s.players],
  ['Turns 7d', s => s.turns_7], ['Turns', s => s.turns],
  ['Median', s => s.med, s => num(s.med)], ['Avg', s => s.avg, s => num(s.avg)], ['10+ turns', s => s.players ? s.ten_plus / s.players : 0, s => pct(s.ten_plus, s.players)],
  ['First story for', s => s.first_n], ['Day-one median', s => s.day1_med ?? -1, s => num(s.day1_med)],
  ['Came back', s => backRate(s) ?? -1, s => s.first_elig ? pct(s.first_back, s.first_elig) + ' <span class="muted">' + s.first_back + '/' + s.first_elig + '</span>' : '–'],
  ['To this story', s => s.first_elig ? s.first_back_same / s.first_elig : -1, s => s.first_elig ? pct(s.first_back_same, s.first_elig) : '–'],
  ['D1', s => s.first_elig ? s.first_d1 / s.first_elig : -1, s => s.first_elig ? pct(s.first_d1, s.first_elig) : '–'],
  ['Sales', s => s.sales_usd, s => s.sales ? s.sales + ' · ' + money(s.sales_usd) : '–'],
];
let tsort = 4, tdir = -1;
function table() {
  const list = S.slice().sort((a, b) => {
    const x = COLS[tsort][1](a), y = COLS[tsort][1](b);
    return (typeof x === 'string' ? x.localeCompare(y) : x - y) * tdir;
  });
  $('tbl').innerHTML = '<thead><tr>' + COLS.map((c, i) => '<th data-i="' + i + '"' + (i === tsort ? ' aria-sort="' + (tdir > 0 ? 'ascending' : 'descending') + '"' : '') + '>' + c[0] + (i === tsort ? (tdir > 0 ? ' ▲' : ' ▼') : '') + '</th>').join('') + '</tr></thead><tbody>' +
    list.map(s => '<tr>' + COLS.map(c => '<td>' + (c[2] ? c[2](s) : (c[1](s) ?? 0).toLocaleString()) + '</td>').join('') + '</tr>').join('') + '</tbody>';
  $('tbl').querySelector('thead').onclick = e => {
    const th = e.target.closest('th'); if (!th) return;
    const i = +th.dataset.i; if (i === tsort) tdir = -tdir; else { tsort = i; tdir = i === 0 ? 1 : -1; }
    table();
  };
}

kpis(); cards(); firstBars(); signals(); picker(); detail(); table();
</script>
</body>
</html>`;
}
