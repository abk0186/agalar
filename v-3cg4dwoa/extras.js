/* agalar.kz: live weather (Open-Meteo), weather background animation, background music (YouTube).
   Everything here is optional: if a request fails, the rest of the page keeps working. */
(function () {
  "use strict";
  var DATA = window.AGALAR_DATA || {};
  var UI = DATA.ui || {};
  function lang() { return window.AGALAR_LANG === "ru" ? "ru" : "kz"; }
  function t(key) { var v = (UI[lang()] || {})[key]; return v == null || v === "" ? ((UI.ru || {})[key] || "") : v; }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  var params = {};
  try { var sp = new URLSearchParams(location.search); params.wx = sp.get("wx") || ""; params.music = sp.get("music"); } catch (e) {}

  /* ================= Weather ================= */
  var CFG = DATA.weather || {};
  // WMO weather code -> [kind, ru, kz]. kind drives the icon and the background animation.
  var WMO = {
    0: ["sun", "Ясно", "Ашық"],
    1: ["sun", "Преимущественно ясно", "Негізінен ашық"],
    2: ["partly", "Переменная облачность", "Аздап бұлтты"],
    3: ["clouds", "Пасмурно", "Бұлыңғыр"],
    45: ["fog", "Туман", "Тұман"], 48: ["fog", "Туман с изморозью", "Қырау тұман"],
    51: ["rain", "Слабая морось", "Әлсіз сіркіреме"], 53: ["rain", "Морось", "Сіркіреме жаңбыр"], 55: ["rain", "Сильная морось", "Қатты сіркіреме"],
    56: ["rain", "Ледяная морось", "Мұзды сіркіреме"], 57: ["rain", "Ледяная морось", "Мұзды сіркіреме"],
    61: ["rain", "Небольшой дождь", "Аздап жаңбыр"], 63: ["rain", "Дождь", "Жаңбыр"], 65: ["rain", "Сильный дождь", "Қатты жаңбыр"],
    66: ["rain", "Ледяной дождь", "Мұзды жаңбыр"], 67: ["rain", "Сильный ледяной дождь", "Қатты мұзды жаңбыр"],
    71: ["snow", "Небольшой снег", "Аздап қар"], 73: ["snow", "Снег", "Қар"], 75: ["snow", "Сильный снег", "Қалың қар"],
    77: ["snow", "Снежная крупа", "Қар түйіршігі"],
    80: ["rain", "Небольшой ливень", "Аздап нөсер"], 81: ["rain", "Ливень", "Нөсер"], 82: ["rain", "Сильный ливень", "Қатты нөсер"],
    85: ["snow", "Снегопад", "Қар жауады"], 86: ["snow", "Сильный снегопад", "Қатты қар жауады"],
    95: ["storm", "Гроза", "Найзағай"], 96: ["storm", "Гроза с градом", "Бұршақты найзағай"], 99: ["storm", "Сильная гроза с градом", "Қатты бұршақты найзағай"]
  };
  var OVERRIDE = { sun: 0, clouds: 3, partly: 2, rain: 63, snow: 73, storm: 95, fog: 45, night: 0 };
  var MONTHS = {
    ru: ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"],
    kz: ["қаңтар", "ақпан", "наурыз", "сәуір", "мамыр", "маусым", "шілде", "тамыз", "қыркүйек", "қазан", "қараша", "желтоқсан"]
  };
  var WEEKDAYS = {
    ru: ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"],
    kz: ["жексенбі", "дүйсенбі", "сейсенбі", "сәрсенбі", "бейсенбі", "жұма", "сенбі"]
  };
  function wmo(code) { return WMO[code] || WMO[Math.floor(code / 10) * 10] || ["clouds", "—", "—"]; }
  function deg(v) { if (v == null || isNaN(v)) return "—"; var r = Math.round(v); return (r > 0 ? "+" : r < 0 ? "\u2212" : "") + Math.abs(r) + "°"; }
  function num(v) { return v == null || isNaN(v) ? "—" : String(Math.round(v)); }
  function dayLabel(iso) {
    var p = iso.split("-"), d = new Date(Date.UTC(+p[0], +p[1] - 1, +p[2])), L = lang();
    var wd = WEEKDAYS[L][d.getUTCDay()], m = MONTHS[L][d.getUTCMonth()], dd = d.getUTCDate();
    return L === "kz" ? dd + " " + m + ", " + wd : wd.charAt(0).toUpperCase() + wd.slice(1) + ", " + dd + " " + m;
  }
  function wxIcon(kind, night) {
    var k = (kind === "sun" || kind === "partly") && night ? (kind === "sun" ? "moon" : "partly-night") : kind;
    return '<svg class="wx-ico" aria-hidden="true"><use href="#wx-' + k + '"/></svg>';
  }

  var state = { status: "loading", data: null, updated: null };
  var CACHE_KEY = "agalar_wx_v1", CACHE_MS = 30 * 60 * 1000;

  function apiUrl(withDaily) {
    var q = "latitude=" + CFG.lat + "&longitude=" + CFG.lon + "&timezone=" + encodeURIComponent(CFG.timezone || "Asia/Almaty") +
      "&wind_speed_unit=ms&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,is_day";
    if (withDaily && CFG.days && CFG.days.length) {
      q += "&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max" +
        "&start_date=" + CFG.days[0] + "&end_date=" + CFG.days[CFG.days.length - 1];
    }
    return "https://api.open-meteo.com/v1/forecast?" + q;
  }
  function getJSON(url) {
    var ctrl = typeof AbortController === "function" ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 10000);
    return fetch(url, ctrl ? { signal: ctrl.signal } : {}).then(function (r) {
      clearTimeout(timer);
      return r.json().then(function (j) { if (!r.ok || j.error) throw new Error(j.reason || r.status); return j; });
    }, function (e) { clearTimeout(timer); throw e; });
  }
  function load(force) {
    if (!CFG.lat || typeof fetch !== "function") { state.status = "error"; render(); return; }
    if (!force) {
      try {
        var c = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
        if (c && c.data && Date.now() - c.ts < CACHE_MS) { state = { status: "ok", data: c.data, updated: new Date(c.ts) }; render(); return; }
      } catch (e) {}
    }
    getJSON(apiUrl(true)).catch(function () {
      // forecast window not available yet (or past) -> current weather only
      return getJSON(apiUrl(false));
    }).then(function (j) {
      state = { status: "ok", data: j, updated: new Date() };
      try { localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data: j })); } catch (e) {}
      render();
    }).catch(function () {
      if (!state.data) state.status = "error";
      render();
    });
  }

  function hhmm(d) { return ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2); }

  function render() {
    var box = document.getElementById("weather-box");
    if (!box) return;
    var L = lang(), i = L === "kz" ? 2 : 1, html = "";
    var ms = " " + t("weather_ms");
    if (state.status === "loading") {
      html = '<p class="wx-msg">' + esc(t("weather_loading")) + "</p>";
    } else if (state.status === "error") {
      html = '<p class="wx-msg">' + esc(t("weather_error")) + "</p>";
    } else {
      var j = state.data, cur = j.current, daily = j.daily;
      if (cur) {
        var w = wmo(cur.weather_code), night = cur.is_day === 0;
        html += '<div class="wx-now">' + wxIcon(w[0], night) +
          '<div class="wx-now__body"><p class="wx-now__label">' + esc(t("weather_now")) + "</p>" +
          '<p class="wx-now__main"><b>' + deg(cur.temperature_2m) + "</b> " + esc(w[i]) + "</p>" +
          '<p class="wx-now__sub">' + esc(t("weather_feels")) + " " + deg(cur.apparent_temperature) + " · " +
          esc(t("weather_wind")) + " " + num(cur.wind_speed_10m) + ms + "</p></div></div>";
      }
      var days = (CFG.days || []).map(function (iso) {
        var k = daily && daily.time ? daily.time.indexOf(iso) : -1;
        if (k < 0) return '<article class="wx-day wx-day--pending"><h3 class="wx-day__date">' + esc(dayLabel(iso)) + '</h3><p class="wx-msg">' + esc(t("weather_pending")) + "</p></article>";
        var w = wmo(daily.weather_code[k]);
        var pp = daily.precipitation_probability_max ? daily.precipitation_probability_max[k] : null;
        return '<article class="wx-day"><h3 class="wx-day__date">' + esc(dayLabel(iso)) + "</h3>" +
          '<div class="wx-day__main">' + wxIcon(w[0], false) +
          '<p class="wx-day__temp"><b>' + deg(daily.temperature_2m_max[k]) + '</b><span>' + deg(daily.temperature_2m_min[k]) + "</span></p></div>" +
          '<p class="wx-day__cond">' + esc(w[i]) + "</p>" +
          '<ul class="wx-day__facts"><li><svg aria-hidden="true"><use href="#wx-drop"/></svg><span>' + esc(t("weather_precip")) + "</span><b>" + num(pp) + "%</b></li>" +
          '<li><svg aria-hidden="true"><use href="#wx-wind"/></svg><span>' + esc(t("weather_wind_max")) + "</span><b>" + num(daily.wind_speed_10m_max[k]) + ms + "</b></li></ul></article>";
      }).join("");
      html += '<div class="wx-days">' + days + "</div>";
      if (state.updated) html += '<p class="wx-src">' + esc(t("weather_source")) + " " + hhmm(state.updated) + "</p>";
    }
    box.innerHTML = html;
    box.setAttribute("aria-busy", String(state.status === "loading"));
    setBackground();
  }

  /* ================= Guest info: Astana vs Aktau ================= */
  var GI = DATA.guest_info || null;
  var gi = { data: null, live: false, updated: null };
  var GI_KEY = "agalar_gi_v1";
  function fmt(tpl, map) { return String(tpl || "").replace(/\{(\w+)\}/g, function (m, k) { return map[k] != null ? map[k] : m; }); }
  function avg(a) { var s = 0, n = 0; (a || []).forEach(function (v) { if (v != null && !isNaN(v)) { s += v; n++; } }); return n ? s / n : null; }
  function giUrl() {
    var d = CFG.days || [];
    return "https://api.open-meteo.com/v1/forecast?latitude=" + GI.astana.lat + "," + GI.aktau.lat +
      "&longitude=" + GI.astana.lon + "," + GI.aktau.lon + "&timezone=" + encodeURIComponent(CFG.timezone || "Asia/Almaty") +
      "&wind_speed_unit=ms&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,wind_speed_10m_max" +
      "&hourly=temperature_2m&start_date=" + d[0] + "&end_date=" + d[d.length - 1];
  }
  function giParse(list) {
    if (!list || list.length < 2) throw new Error("bad");
    var hh = ("0" + (GI.evening_hour || 20)).slice(-2) + ":00";
    function city(x) {
      var d = x.daily, h = x.hourly, out = { day: [], eve: [], min: [], pp: [], rain: [], wind: [], code: [] };
      (CFG.days || []).forEach(function (iso) {
        var k = d.time.indexOf(iso), e = h.time.indexOf(iso + "T" + hh);
        if (k < 0 || e < 0) throw new Error("day missing");
        out.day.push(d.temperature_2m_max[k]); out.eve.push(h.temperature_2m[e]); out.min.push(d.temperature_2m_min[k]);
        out.pp.push(d.precipitation_probability_max[k]); out.rain.push(d.precipitation_sum[k]);
        out.wind.push(d.wind_speed_10m_max[k]); out.code.push(d.weather_code[k]);
      });
      return out;
    }
    return { astana: city(list[0]), aktau: city(list[1]) };
  }
  function giLoad() {
    if (!GI || !GI.astana || !GI.aktau || typeof fetch !== "function" || !(CFG.days || []).length) return;
    try {
      var c = JSON.parse(localStorage.getItem(GI_KEY) || "null");
      if (c && c.data && Date.now() - c.ts < CACHE_MS) { gi = { data: c.data, live: true, updated: new Date(c.ts) }; giRender(); return; }
    } catch (e) {}
    getJSON(giUrl()).then(function (j) {
      var data = giParse(j);
      gi = { data: data, live: true, updated: new Date() };
      try { localStorage.setItem(GI_KEY, JSON.stringify({ ts: Date.now(), data: data })); } catch (e) {}
      giRender();
    }).catch(function () { /* keep the baked-in forecast */ });
  }
  function giRender() {
    var box = document.getElementById("guest-info-box");
    if (!box || !GI) return;
    var D = gi.data || GI.fallback;
    if (!D || !D.astana || !D.aktau) { box.innerHTML = ""; return; }
    var A = D.astana, K = D.aktau, L = lang(), ci = L === "kz" ? 2 : 1;
    var aDay = avg(A.day), aEve = avg(A.eve), kDay = avg(K.day), kEve = avg(K.eve);
    var night = Math.min.apply(null, A.min);
    var d1 = Math.round(kDay) - Math.round(aDay), d2 = Math.round(kEve) - Math.round(aEve);
    var lo = Math.min(d1, d2), hi = Math.max(d1, d2);
    var diff = lo === hi ? String(lo) : lo + "–" + hi;
    var text = fmt(hi >= 3 ? t("gi_text") : t("gi_text_same"), { day: deg(aDay), eve: deg(aEve), diff: diff, night: deg(night) });

    var all = A.day.concat(A.eve, K.day, K.eve).filter(function (v) { return v != null; });
    var sMin = Math.min(0, Math.min.apply(null, all)) - 2, sMax = Math.max.apply(null, all) + 2;
    function bar(cls, name, v) {
      var w = Math.max(6, Math.min(100, (v - sMin) / (sMax - sMin) * 100));
      return '<div class="gi-bar gi-bar--' + cls + '"><span class="gi-bar__city">' + esc(name) + '</span>' +
        '<span class="gi-bar__track"><span class="gi-bar__fill" style="width:' + w.toFixed(1) + '%"></span></span>' +
        '<b class="gi-bar__val">' + deg(v) + "</b></div>";
    }
    function row(icon, label, a, k) {
      var n = Math.round(k) - Math.round(a);
      return '<div class="gi-row"><div class="gi-row__head"><svg aria-hidden="true"><use href="#' + icon + '"/></svg><span>' + esc(label) + "</span>" +
        '<em class="gi-diff' + (n >= 3 ? "" : " gi-diff--same") + '">' + esc(n >= 3 ? fmt(t("gi_diff"), { n: n }) : t("gi_diff_same")) + "</em></div>" +
        bar("astana", t("gi_city_astana"), a) + bar("aktau", t("gi_city_aktau"), k) + "</div>";
    }
    var cards = (CFG.days || []).map(function (iso, k) {
      var w = wmo(A.code[k]);
      return '<article class="gi-day"><header class="gi-day__head"><h3 class="gi-day__date">' + esc(dayLabel(iso)) + "</h3>" + wxIcon(w[0], false) + "</header>" +
        row("wx-sun", t("gi_daytime"), A.day[k], K.day[k]) + row("wx-moon", t("gi_evening"), A.eve[k], K.eve[k]) +
        '<p class="gi-day__cond">' + esc(t("gi_in_astana")) + ": " + esc(w[ci]) + " · " + esc(fmt(t("gi_wind"), { n: num(A.wind[k]) })) +
        " · " + esc(fmt(t("gi_precip"), { n: num(A.pp[k]) })) + "</p></article>";
    }).join("");

    var ppMax = Math.max.apply(null, A.pp), rainSum = A.rain.reduce(function (s, v) { return s + (v || 0); }, 0), windMax = Math.max.apply(null, A.wind);
    var pack = [["i-jacket", t("gi_pack_jacket")]];
    if (night <= 5) pack.push(["i-hat", t("gi_pack_hat")]);
    if (windMax >= 8) pack.push(["wx-wind", fmt(t("gi_pack_wind"), { n: num(windMax) })]);
    pack.push(ppMax >= 40 || rainSum >= 1 ? ["i-umbrella", t("gi_pack_umbrella")] : ["i-umbrella-off", t("gi_pack_no_umbrella")]);
    var packHtml = '<div class="gi-pack"><p class="gi-pack__title">' + esc(t("gi_pack_title")) + '</p><ul class="gi-pack__list">' +
      pack.map(function (p) { return '<li><svg aria-hidden="true"><use href="#' + p[0] + '"/></svg><span>' + esc(p[1]) + "</span></li>"; }).join("") + "</ul></div>";

    var src = gi.live && gi.updated ? fmt(t("gi_src_live"), { time: hhmm(gi.updated) }) : fmt(t("gi_src_static"), { time: (GI.fallback || {}).fetched || "" });
    box.innerHTML = '<div class="gi-msg"><svg class="gi-msg__ico" aria-hidden="true"><use href="#i-jacket"/></svg><p>' + esc(text) + "</p></div>" +
      '<div class="gi-days">' + cards + "</div>" + packHtml + '<p class="wx-src">' + esc(src) + "</p>";
  }

  /* ---------- Background animation by CURRENT weather ---------- */
  function setBackground() {
    var el = document.getElementById("wx-bg");
    if (!el) return;
    var kind = null;
    var ov = (params.wx || "").toLowerCase();
    if (OVERRIDE.hasOwnProperty(ov)) kind = ov === "partly" ? "clouds" : ov;
    else if (state.data && state.data.current) {
      var c = state.data.current, k = wmo(c.weather_code)[0];
      kind = k === "partly" ? "clouds" : k;
      if (kind === "sun" && c.is_day === 0) kind = "night";
    }
    var cls = "wx-bg" + (kind ? " wx-bg--" + kind + " is-on" : "");
    if (el.className !== cls) el.className = cls;
  }

  /* ================= Music (YouTube IFrame API) ================= */
  var MUSIC = DATA.music || {};
  var MUSIC_KEY = "agalar_music";
  var music = { player: null, ready: false, playing: false, wanted: false, failed: false, userOff: false, started: false };
  var btn = document.getElementById("music-btn");

  try { music.userOff = localStorage.getItem(MUSIC_KEY) === "off"; } catch (e) {}

  function updateBtn() {
    if (!btn) return;
    btn.hidden = music.failed || !MUSIC.youtube_id;
    btn.setAttribute("aria-pressed", String(music.playing));
    var label = music.playing ? t("music_off") : t("music_on");
    btn.setAttribute("aria-label", label);
    btn.title = label;
    btn.classList.toggle("is-playing", music.playing);
    btn.classList.toggle("is-loading", music.wanted && !music.playing && !music.failed);
  }
  function fail() {
    music.failed = true; music.playing = false; updateBtn();
  }
  function play() {
    music.wanted = true; updateBtn();
    if (!music.ready || !music.player) return; // will start in onReady
    try {
      if (!music.started) { music.player.seekTo(MUSIC.start || 0, true); music.started = true; }
      music.player.unMute(); music.player.setVolume(70);
      music.player.playVideo();
    } catch (e) { fail(); }
  }
  function pause() {
    music.wanted = false;
    try { if (music.player && music.ready) music.player.pauseVideo(); } catch (e) {}
    music.playing = false; updateBtn();
  }

  function loadYouTube() {
    if (!MUSIC.youtube_id) return;
    var host = document.createElement("div");
    host.className = "yt-host"; host.setAttribute("aria-hidden", "true");
    var target = document.createElement("div"); target.id = "yt-player";
    host.appendChild(target); document.body.appendChild(host);
    var prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = function () {
      if (typeof prev === "function") try { prev(); } catch (e) {}
      try {
        music.player = new YT.Player("yt-player", {
          width: 200, height: 200, videoId: MUSIC.youtube_id,
          playerVars: { start: MUSIC.start || 0, autoplay: 0, origin: location.origin, enablejsapi: 1, controls: 0, disablekb: 1, fs: 0, playsinline: 1, rel: 0, iv_load_policy: 3, modestbranding: 1 },
          events: {
            onReady: function () {
              music.ready = true;
              try { var f = host.querySelector("iframe"); if (f) { f.setAttribute("tabindex", "-1"); f.setAttribute("title", "music"); f.setAttribute("allow", "autoplay; encrypted-media"); } } catch (e) {}
              updateBtn();
              if (music.wanted) play();
            },
            onStateChange: function (e) {
              if (e.data === 1) { music.playing = true; music.started = true; }
              else if (e.data === 2) { music.playing = false; }
              else if (e.data === 0) { // ended -> loop from the start second
                music.playing = false;
                if (music.wanted) { try { music.player.seekTo(MUSIC.start || 0, true); music.player.playVideo(); } catch (x) {} }
              }
              updateBtn();
            },
            onError: function () { fail(); }
          }
        });
      } catch (e) { fail(); }
    };
    var s = document.createElement("script");
    s.src = "https://www.youtube.com/iframe_api";
    s.async = true;
    s.onerror = fail;
    document.head.appendChild(s);
    // give up quietly if the player never becomes ready (blocked network, etc.)
    setTimeout(function () { if (!music.ready) fail(); }, 20000);
  }

  // First user interaction anywhere -> start music (unless the visitor turned it off earlier)
  var GESTURES = ["pointerup", "touchend", "click", "keydown"];
  function onFirstGesture(e) {
    if (btn && e && e.target && btn.contains(e.target)) return; // the toggle handles itself
    if (music.userOff || music.failed) { detachGestures(); return; }
    play();
    detachGestures();
    // if the browser refused (no real user activation yet), try again on the next tap
    setTimeout(function () {
      if (!music.playing && music.wanted && !music.failed && !music.userOff) attachGestures();
    }, 2500);
  }
  function attachGestures() { GESTURES.forEach(function (ev) { document.addEventListener(ev, onFirstGesture, { capture: true, passive: true }); }); }
  function detachGestures() { GESTURES.forEach(function (ev) { document.removeEventListener(ev, onFirstGesture, { capture: true, passive: true }); }); }

  if (btn) {
    btn.addEventListener("click", function () {
      if (music.playing || (music.wanted && !music.failed)) {
        pause(); music.userOff = true;
        try { localStorage.setItem(MUSIC_KEY, "off"); } catch (e) {}
      } else {
        music.userOff = false;
        try { localStorage.removeItem(MUSIC_KEY); } catch (e) {}
        play();
      }
      detachGestures();
    });
  }
  // pause in background tabs, resume when the visitor comes back
  var resumeOnShow = false;
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) { resumeOnShow = music.playing; if (music.playing) { try { music.player.pauseVideo(); } catch (e) {} } }
    else if (resumeOnShow && music.wanted) { resumeOnShow = false; try { music.player.playVideo(); } catch (e) {} }
  });

  /* ================= Init ================= */
  document.addEventListener("agalar:lang", function () { render(); giRender(); updateBtn(); });
  render();
  giRender();
  load(false);
  giLoad();
  setInterval(function () { if (!document.hidden) { load(true); giLoad(); } }, CACHE_MS);
  updateBtn();
  if (MUSIC.youtube_id && params.music !== "0") { loadYouTube(); attachGestures(); }
  else if (btn) btn.hidden = true;
})();
