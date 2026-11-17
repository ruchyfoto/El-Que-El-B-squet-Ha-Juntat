// Widget «el que el bàsquet ha juntat» per a l'app Scriptable (iPhone).
// Mostra els dies que falten per veure-us, els que porteu sense veure-us, l'hora i el temps de l'altra persona
// i la propera data assenyalada.
//
// 1) Omple les 5 línies de sota (vegeu el README o les instruccions del xat).
// 2) Afegeix un widget de Scriptable a la pantalla d'inici i tria aquest script.

const SUPABASE_URL = "https://EL-TEU-PROJECTE.supabase.co"; // el mateix que a config.js
const ANON_KEY = "LA-TEVA-CLAU-PUBLICA";                     // el mateix que a config.js (clau "anon")
const TOKEN = "EL-TOKEN-DEL-WIDGET";                         // select token from public.pp_widget_cfg;
const ME = "a";                                              // "a" si ets el primer nom, "b" si ets el segon
const NAMES = { a: "NOM1", b: "NOM2" };                      // els noms, en el mateix ordre que a config.js
const APP_URL = "https://EL-TEU-USUARI.github.io/EL-TEU-REPO/"; // la teva web (s'obre en tocar el widget)

// ---------------------------------------------------------------------------------------------

const OTHER = ME === "a" ? "b" : "a";
const pad = (n) => String(n).padStart(2, "0");
const DAY = 864e5;

function parseDay(s) {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(s || "");
  return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null;
}
function dim(y, m) { return new Date(y, m, 0).getDate(); }
function occursOn(ev, y, m, d) {
  if (d !== Math.min(ev.day, dim(y, m))) return false;
  const s = parseDay(ev.since);
  if (ev.repeat === "monthly") return !(s && y * 12 + m < s.getFullYear() * 12 + s.getMonth() + 1);
  if (ev.repeat === "yearly") return ev.month === m && !(s && y < s.getFullYear());
  return !!s && s.getFullYear() === y && s.getMonth() + 1 === m && s.getDate() === d;
}
function nextAug1(today) {
  let d = new Date(today.getFullYear(), 7, 1);
  if (d < today) d = new Date(today.getFullYear() + 1, 7, 1);
  return d;
}
function nextEvent(dates, today) {
  let best = null;
  for (const ev of dates || []) {
    for (let i = 0; i < 800; i++) {
      const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
      if (occursOn(ev, d.getFullYear(), d.getMonth() + 1, d.getDate())) {
        if (!best || i < best.days) best = { title: ev.title, days: i, date: d };
        break;
      }
    }
  }
  return best;
}
function plural(n, a, b) { return n === 1 ? a : b; }

function wmo(code, isDay) {
  const c = Number(code);
  if (c === 0 || c === 1) return [isDay ? "☀️" : "🌙", "Serè"];
  if (c === 2) return ["⛅", "Parcialment ennuvolat"];
  if (c === 3) return ["☁️", "Ennuvolat"];
  if (c === 45 || c === 48) return ["🌫️", "Boira"];
  if (c >= 51 && c <= 57) return ["🌦️", "Plugim"];
  if (c >= 61 && c <= 67) return ["🌧️", "Pluja"];
  if (c >= 71 && c <= 77) return ["🌨️", "Neu"];
  if (c >= 80 && c <= 82) return ["🌦️", "Ruixats"];
  if (c === 85 || c === 86) return ["🌨️", "Ruixats de neu"];
  if (c >= 95) return ["⛈️", "Tempesta"];
  return ["🌡️", "Variable"];
}

async function loadData() {
  const req = new Request(SUPABASE_URL + "/rest/v1/rpc/pp_widget");
  req.method = "POST";
  req.headers = { apikey: ANON_KEY, Authorization: "Bearer " + ANON_KEY, "Content-Type": "application/json" };
  req.body = JSON.stringify({ t: TOKEN });
  return await req.loadJSON();
}
async function loadWeather(p) {
  try {
    const url = "https://api.open-meteo.com/v1/forecast?latitude=" + p.lat + "&longitude=" + p.lon +
      "&current=temperature_2m,weather_code,is_day&timezone=auto";
    const j = await new Request(url).loadJSON();
    return j && j.current ? j.current : null;
  } catch (e) { return null; }
}
function localTime(tz) {
  try {
    return new Intl.DateTimeFormat("ca", { timeZone: tz, hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date());
  } catch (e) { return null; }
}

async function build() {
  const data = await loadData();
  if (!data || data.code || data.message) throw new Error((data && (data.message || data.code)) || "sense dades");
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let target = parseDay(data.meet_date), approx = false;
  if (!target || target < today) { target = nextAug1(today); approx = true; }
  const days = Math.round((target - today) / DAY);
  const last = parseDay(data.last_seen);
  const since = last && last <= today ? Math.round((today - last) / DAY) : null;
  const other = (data.places || []).find((p) => p.player === OTHER) || null;
  const wx = other ? await loadWeather(other) : null;
  const tm = other && other.tz ? localTime(other.tz) : null;
  const ev = nextEvent(data.dates, today);
  return { days, approx, since, other, wx, tm, ev, target };
}

function addText(parent, text, size, color, bold) {
  const t = parent.addText(String(text));
  t.textColor = new Color(color || "#FFF4F1");
  t.font = bold ? Font.boldSystemFont(size) : Font.mediumSystemFont(size);
  t.minimumScaleFactor = 0.6;
  t.lineLimit = 1;
  return t;
}

function render(d, family) {
  const w = new ListWidget();
  const g = new LinearGradient();
  g.colors = [new Color("#7A1F44"), new Color("#3A0F26")];
  g.locations = [0, 1];
  w.backgroundGradient = g;
  w.url = APP_URL;
  w.refreshAfterDate = new Date(Date.now() + 30 * 60 * 1000);

  const label = d.days === 0 ? "Avui us veieu ♥" : plural(d.days, "dia", "dies") + " per veure’ns";

  if (family === "accessoryInline") {
    w.addText("♥ " + (d.days === 0 ? "Avui us veieu" : d.days + " " + plural(d.days, "dia", "dies")));
    return w;
  }
  if (family === "accessoryCircular") {
    const t = w.addText(String(d.days));
    t.font = Font.boldSystemFont(22);
    t.centerAlignText();
    const s = w.addText("dies");
    s.font = Font.systemFont(10);
    s.centerAlignText();
    return w;
  }
  if (family === "accessoryRectangular") {
    w.addText("♥ " + d.days + " " + plural(d.days, "dia", "dies") + " per veure’ns").font = Font.boldSystemFont(13);
    if (d.since != null) w.addText(d.since + " " + plural(d.since, "dia", "dies") + " sense veure’ns").font = Font.systemFont(11);
    if (d.other && d.tm) w.addText(NAMES[OTHER] + " · " + d.tm).font = Font.systemFont(11);
    return w;
  }

  const medium = family === "medium" || family === "large" || family === "extraLarge";
  w.setPadding(14, 16, 14, 16);
  const row = w.addStack();
  row.layoutHorizontally();
  row.topAlignContent();

  const left = row.addStack();
  left.layoutVertically();
  addText(left, "♥ " + (d.approx ? "Orientatiu" : "Retrobada"), 11, "#F4C98B", true);
  left.addSpacer(2);
  addText(left, d.days === 0 ? "Avui!" : d.days, d.days > 999 ? 40 : 52, "#F4C98B", true);
  addText(left, d.days === 0 ? "us veieu" : label, 12, "#FFE3EA");
  left.addSpacer(6);
  if (d.since != null) {
    addText(left, d.since === 0 ? "Avui us heu vist ♥" : d.since + " " + plural(d.since, "dia", "dies") + " sense veure’ns", 11, "#D9AFBD");
  }

  if (medium) {
    row.addSpacer();
    const right = row.addStack();
    right.layoutVertically();
    if (d.other) {
      addText(right, NAMES[OTHER] + (d.tm ? " · " + d.tm : ""), 18, "#FFF4F1", true);
      addText(right, String(d.other.name).split(",")[0], 11, "#D9AFBD");
      if (d.wx) {
        const m = wmo(d.wx.weather_code, d.wx.is_day === 1);
        right.addSpacer(4);
        addText(right, m[0] + " " + Math.round(d.wx.temperature_2m) + "°  " + m[1], 12, "#FFE3EA");
      }
    }
    if (d.ev) {
      right.addSpacer(8);
      addText(right, d.ev.days === 0 ? "Avui: " + d.ev.title : d.ev.title + " · " + d.ev.days + " d", 12, "#F4C98B", true);
    }
  } else if (d.other && d.tm) {
    left.addSpacer(2);
    addText(left, NAMES[OTHER] + " · " + d.tm + (d.wx ? " " + wmo(d.wx.weather_code, d.wx.is_day === 1)[0] + Math.round(d.wx.temperature_2m) + "°" : ""), 11, "#FFE3EA");
  }
  return w;
}

function errorWidget(msg) {
  const w = new ListWidget();
  w.backgroundColor = new Color("#3A0F26");
  const t = w.addText("♥ No puc carregar el widget");
  t.textColor = new Color("#FFF4F1");
  t.font = Font.boldSystemFont(13);
  const s = w.addText(String(msg).slice(0, 90));
  s.textColor = new Color("#D9AFBD");
  s.font = Font.systemFont(10);
  w.refreshAfterDate = new Date(Date.now() + 10 * 60 * 1000);
  return w;
}

const family = (config && config.widgetFamily) || "medium";
let widget;
try {
  widget = render(await build(), family);
} catch (e) {
  widget = errorWidget(e && e.message ? e.message : e);
}
if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  await widget.presentMedium();
}
Script.complete();
