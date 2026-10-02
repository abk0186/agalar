/* agalar.kz: renders the page from data.js. No build step, no dependencies. */
(function () {
  "use strict";
  var DATA = window.AGALAR_DATA || { ui: { ru: {}, kz: {} }, friends: [], days: [] };
  var LANGS = ["ru", "kz"];
  var STORE_KEY = "agalar_lang_v2";
  var PLACEHOLDER = "/v-3cg4dwoa/assets/avatar-placeholder.svg";

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function safeUrl(u) {
    u = String(u || "").trim();
    return /^(https?:\/\/|mailto:|tel:)/i.test(u) ? u : "";
  }
  // Localised field with RU fallback: pick(obj, "role") -> obj.role_kz || obj.role_ru
  function pick(obj, key, lang) {
    if (!obj) return "";
    var v = obj[key + "_" + lang];
    if (v == null || v === "") v = obj[key + "_ru"];
    if (v == null || v === "") v = obj[key];
    return v == null ? "" : String(v);
  }
  function t(key, lang) {
    var ui = DATA.ui || {};
    var v = (ui[lang] || {})[key];
    return v == null || v === "" ? ((ui.ru || {})[key] || "") : v;
  }
  function icon(id) { return '<svg aria-hidden="true"><use href="#' + id + '"/></svg>'; }
  function ext(url, cls, inner, label) {
    return '<a class="' + cls + '" href="' + esc(url) + '" target="_blank" rel="noopener noreferrer"' +
      (label ? ' aria-label="' + esc(label) + '" title="' + esc(label) + '"' : "") + ">" + inner + "</a>";
  }

  function getInitialLang() {
    var q = null;
    try { q = new URLSearchParams(location.search).get("lang"); } catch (e) {}
    if (q) {
      q = q.toLowerCase();
      if (q === "kk") q = "kz";
      if (LANGS.indexOf(q) !== -1) { save(q); return q; }
    }
    var s = null;
    try { s = localStorage.getItem(STORE_KEY); } catch (e) {}
    return LANGS.indexOf(s) !== -1 ? s : "kz";
  }
  function save(lang) { try { localStorage.setItem(STORE_KEY, lang); } catch (e) {} }

  function renderMeta(lang) {
    var m = DATA.meta || {};
    var el = document.getElementById("hero-meta");
    var html = "";
    if (m.arrival) html += '<li class="chip">' + icon("i-plane-in") + "<span>" + esc(t("arrival", lang)) + "</span><b>" + esc(m.arrival.date) + " · " + esc(m.arrival.time) + "</b></li>";
    if (m.departure) html += '<li class="chip">' + icon("i-plane-out") + "<span>" + esc(t("departure", lang)) + "</span><b>" + esc(m.departure.date) + " · " + esc(m.departure.time) + "</b></li>";
    el.innerHTML = html;
    el.hidden = !html;
  }

  var LINK_TYPES = {
    instagram:          { icon: "i-instagram", name: "Instagram" },
    business_instagram: { icon: "i-instagram", name: "Instagram" },
    facebook:           { icon: "i-facebook",  name: "Facebook" },
    tiktok:             { icon: "i-tiktok",    name: "TikTok" },
    website:            { icon: "i-globe",     name: "" }
  };
  // Normalise a friend's links: links[] if present, else legacy instagram/website fields
  function friendLinks(f) {
    var list = Array.isArray(f.links) ? f.links.slice() : [];
    if (!Array.isArray(f.links)) {
      if (f.instagram) list.push({ type: "instagram", url: f.instagram });
      if (f.website) list.push({ type: "website", url: f.website, label: f.website_label || "" });
    }
    var BIZ = { website: 0, business_instagram: 0 };
    return list.filter(function (l) { return l && safeUrl(l.url); })
      .map(function (l, i) { return { l: l, i: i }; })
      .sort(function (a, b) { return ((a.l.type in BIZ) ? 0 : 1) - ((b.l.type in BIZ) ? 0 : 1) || a.i - b.i; })
      .map(function (x) { return x.l; });
  }

  function renderFriends(lang) {
    var grid = document.getElementById("friends-grid");
    var list = DATA.friends || [];
    var showHandles = !DATA.meta || DATA.meta.show_handles !== false;
    grid.innerHTML = list.map(function (f) {
      var name = pick(f, "name", lang);
      var role = pick(f, "role", lang);
      var photo = f.photo || PLACEHOLDER;
      var socials = "", biz = "";
      friendLinks(f).forEach(function (l) {
        var ty = LINK_TYPES[l.type] || LINK_TYPES.website;
        var label = pick(l, "label", lang);
        var url = safeUrl(l.url);
        if (label) {
          var aria = label + (ty.name ? " · " + ty.name : " · " + t("btn_website", lang));
          biz += ext(url, "tag", icon(ty.icon) + "<span>" + esc(label) + "</span>", aria);
        } else {
          var a = (ty.name || t("btn_website", lang)) + (l.type === "instagram" && f.handle ? " @" + f.handle : "");
          socials += ext(url, "icon-btn", icon(ty.icon), a);
        }
      });
      var minimal = !(f.handle && showHandles) && !role && !socials && !biz;
      return '<article class="friend' + (minimal ? " friend--minimal" : "") + '">' +
        '<div class="friend__photo"><img src="' + esc(photo) + '" alt="' + esc(name) + '" width="112" height="112" decoding="async" onerror="this.onerror=null;this.src=\'' + PLACEHOLDER + '\'"></div>' +
        '<div class="friend__body">' +
          '<h3 class="friend__name">' + esc(name) + "</h3>" +
          (f.handle && showHandles ? '<div class="friend__handle">@' + esc(f.handle) + "</div>" : "") +
          (pick(f, "badge", lang) ? '<span class="friend__badge">' + esc(pick(f, "badge", lang)) + "</span>" : "") +
          (role ? '<p class="friend__role">' + esc(role) + "</p>" : "") +
          ((socials || biz) ? '<div class="friend__links">' +
            (biz ? '<div class="friend__biz">' + biz + "</div>" : "") +
            (socials ? '<div class="friend__social">' + socials + "</div>" : "") +
          "</div>" : "") +
        "</div></article>";
    }).join("");
    // On wide screens avoid a lone card in the last row: 9 -> 3x3, 5 -> 3+2, etc.
    var n = list.length;
    grid.setAttribute("data-cols", (n > 4 && n % 4 === 1 && n % 3 !== 1) ? "3" : "4");
    document.getElementById("friends").hidden = !list.length;
  }

  function renderProgram(lang) {
    var wrap = document.getElementById("program-days");
    var days = DATA.days || [];
    wrap.innerHTML = days.map(function (d, i) {
      var items = (d.items || []).map(function (it) {
        var venue = pick(it, "venue", lang), about = pick(it, "about", lang);
        var site = safeUrl(it.website), map = safeUrl(it.map);
        var extra = (it.links || []).filter(function (l) { return safeUrl(l.url); });
        var rich = !!(venue || site || map || extra.length);
        var links = "";
        if (site) links += ext(site, "pill", icon("i-globe") + "<span>" + esc(t("btn_website", lang)) + "</span>");
        extra.forEach(function (l) { links += ext(safeUrl(l.url), "pill", icon(l.type === "instagram" ? "i-instagram" : "i-globe") + "<span>" + esc(pick(l, "label", lang) || t("btn_website", lang)) + "</span>"); });
        if (map) links += ext(map, "pill", icon("i-pin") + "<span>" + esc(t("btn_map", lang)) + "</span>");
        var card = "";
        var note = pick(it, "note", lang);
        if (rich) {
          card = '<div class="tl__card">' +
            (note ? '<span class="tl__tag">' + esc(note) + "</span>" : "") +
            (venue ? '<p class="tl__venue">' + esc(venue) + "</p>" : "") +
            (about ? '<p class="tl__about">' + esc(about) + "</p>" : "") +
            (links ? '<div class="tl__links">' + links + "</div>" : "") + "</div>";
        } else if (about) {
          card = '<p class="tl__note">' + esc(about) + "</p>";
        }
        return '<li class="tl' + (rich ? " tl--rich" : "") + '">' +
          '<p class="tl__time">' + esc(it.time) + "</p>" +
          '<div class="tl__body"><h4 class="tl__title">' + esc(pick(it, "title", lang)) + "</h4>" + card + "</div></li>";
      }).join("");
      return '<article class="day">' +
        '<header class="day__head"><span class="day__num" aria-hidden="true">' + (i + 1) + '</span>' +
        '<h3 class="day__title">' + esc(pick(d, "date", lang)) + '</h3><span class="day__rule" aria-hidden="true"></span></header>' +
        '<ol class="timeline">' + items + "</ol></article>";
    }).join("");
    document.getElementById("program").hidden = !days.length;
  }

  function applyLang(lang) {
    document.documentElement.lang = lang === "kz" ? "kk" : "ru";
    document.title = t("doc_title", lang) || document.title;
    document.querySelectorAll("[data-i18n]").forEach(function (el) { el.textContent = t(el.getAttribute("data-i18n"), lang); });
    // hero_title may contain <br>; it is author-controlled content from data.js
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) { el.innerHTML = t(el.getAttribute("data-i18n-html"), lang); });
    document.querySelectorAll(".lang__btn").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === lang)); });
    var grp = document.querySelector(".lang"); if (grp) grp.setAttribute("aria-label", t("lang_label", lang));
    renderMeta(lang); renderFriends(lang); renderProgram(lang);
  }

  function setLang(lang) {
    if (LANGS.indexOf(lang) === -1) return;
    save(lang);
    applyLang(lang);
    try {
      var u = new URL(location.href);
      if (lang === "kz") u.searchParams.delete("lang"); else u.searchParams.set("lang", lang);
      history.replaceState(null, "", u.pathname + u.search + u.hash);
    } catch (e) {}
  }

  document.querySelectorAll(".lang__btn").forEach(function (b) {
    b.addEventListener("click", function () { setLang(b.getAttribute("data-lang")); });
  });
  applyLang(getInitialLang());
})();
