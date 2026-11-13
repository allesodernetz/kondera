(function () {
  "use strict";

  var P = window.PROJEKTE, ORTE = window.ORTE, AR = window.BILD_AR || {};
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
  var img = function (k) { return (window.BILDER && window.BILDER[k]) || "assets/img/" + k + ".webp"; };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
  var ease = function (k) { return k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; };
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  document.documentElement.classList.add("js");
  if (reduce) document.documentElement.classList.add("reduce");

  /* ---------------- Hero: Strich, Lasur, Rendering ---------------- */
  var Hero = (function () {
    var D = window.HERO_LINES, hero = $(".hero"), svg = $("#lines");
    var stage = $("#stage"), wash = $(".wash", stage), photo = $(".photo", stage);
    var phases = $$(".phases li"), bars = phases.map(function (li) { return $("i", li); });
    var FIRST = 45, N = D.p.length, PH = [0, 0.18, 0.5, 0.72, 1];
    svg.setAttribute("viewBox", "0 0 " + D.w + " " + D.h);

    var seed = 7, rnd = function () { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    var win = D.p.map(function (d, i) {
      if (i < FIRST) { var s = 0.005 + (i / FIRST) * 0.14; return [s, s + 0.05]; }
      var t = (i - FIRST) / (N - FIRST), s2 = 0.18 + Math.pow(t, 0.85) * 0.3 + rnd() * 0.02;
      return [s2, s2 + 0.03];
    });
    svg.innerHTML = D.p.map(function (d, i) {
      var w = i < FIRST ? 1.9 : (D.L[i] > 200 ? 1.35 : 1.0), o = i < FIRST ? 0.92 : 0.55 + rnd() * 0.3;
      return '<path pathLength="1" d="' + d + '" style="stroke-width:' + w + ";opacity:" + o.toFixed(2) + '"/>';
    }).join("");
    var paths = $$("path", svg), last = new Float32Array(N).fill(-1);

    function draw(d) {
      for (var i = 0; i < N; i++) {
        var w = win[i], v = clamp((d - w[0]) / (w[1] - w[0]), 0, 1);
        if (v !== last[i] && (Math.abs(v - last[i]) > 0.004 || v === 0 || v === 1)) { paths[i].style.strokeDashoffset = 1 - v; last[i] = v; }
      }
      var wv = clamp((d - 0.5) / 0.22, 0, 1), mp = (100 - wv * 100) + "% 0";
      wash.style.opacity = d > 0.49 ? 1 : 0;
      wash.style.webkitMaskPosition = mp; wash.style.maskPosition = mp;
      photo.style.opacity = clamp((d - 0.72) / 0.2, 0, 1);
      stage.style.setProperty("--blatt", clamp((d - 0.16) / 0.3, 0, 1).toFixed(3));   // weißes Blatt kommt mit dem Entwurf
      svg.style.opacity = 1 - clamp((d - 0.82) / 0.14, 0, 1);
      for (var k = 0; k < 4; k++) {
        bars[k].style.transform = "scaleX(" + clamp((d - PH[k]) / (PH[k + 1] - PH[k]), 0, 1) + ")";
        phases[k].classList.toggle("on", d >= PH[k] && d < PH[k + 1]);
        phases[k].classList.toggle("done", d >= PH[k + 1]);
      }
    }

    if (reduce) { draw(1); return { kick: function () {} }; }

    var intro = 0, cur = 0, raf = 0, INTRO = 0.07;
    function scrollP() {
      var total = hero.offsetHeight - innerHeight;
      return total > 0 ? clamp(-hero.getBoundingClientRect().top / total, 0, 1) : 0;
    }
    function apply(s) {
      var f = clamp(s / 0.88, 0, 1);                 // Zeichnen über 88 % des Scrollwegs, danach kurz stehen
      draw(INTRO * intro + (1 - INTRO * intro) * f);  // ganz oben: nur die ersten Striche
    }
    function tick() {
      var t = scrollP();
      cur += (t - cur) * 0.15;
      if (Math.abs(t - cur) < 0.0006) cur = t;
      apply(cur);
      raf = cur !== t ? requestAnimationFrame(tick) : 0;
    }
    function kick() { if (!raf) raf = requestAnimationFrame(tick); }
    addEventListener("scroll", kick, { passive: true });
    addEventListener("resize", kick);

    var t0 = performance.now();
    (function introStep(now) {
      intro = ease(clamp((now - t0) / 1400, 0, 1)); apply(cur);
      if (intro < 1) requestAnimationFrame(introStep);
    })(t0);
    return { kick: kick };
  })();

  /* ---------------- Aufdecken beim Scrollen ---------------- */
  $$('[data-rv="line"]').forEach(function (h) { h.innerHTML = '<span class="rv-in">' + h.innerHTML + "</span>"; });
  $$('[data-rv="floors"] li').forEach(function (li, i) { li.style.setProperty("--i", i); });
  var rvIO = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); rvIO.unobserve(e.target); } });
  }, { rootMargin: "0px 0px -10% 0px" });
  function observeReveals(root) { $$("[data-rv]", root).forEach(function (el) { if (!el.classList.contains("in")) rvIO.observe(el); }); }
  observeReveals(document);

  /* ---------------- Tiefe: Bilder bewegen sich langsamer als die Seite ---------------- */
  var Par = (function () {
    var vis = new Set(), raf = 0;
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) vis.add(e.target); else vis.delete(e.target); }); kick(); });
    function tick() {
      raf = 0;
      vis.forEach(function (el) {
        var r = el.getBoundingClientRect(), p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
        el.style.setProperty("--py", (clamp(p, -1, 1) * -6).toFixed(2) + "%");
      });
    }
    function kick() { if (!raf && !reduce) raf = requestAnimationFrame(tick); }
    addEventListener("scroll", kick, { passive: true });
    return { watch: function (root) { if (!reduce) $$("[data-par]", root).forEach(function (el) { io.observe(el); }); }, kick: kick };
  })();

  /* ---------------- Projekte: Kontaktbogen ---------------- */
  var filter = "Alle", shown = P.slice(), sheet = $("#sheet");
  var arOf = function (k) { return clamp(AR[k] || 1.45, 0.75, 2.0); };
  function perRow() { var w = innerWidth; return w > 1500 ? 6 : w > 1100 ? 5 : 4; }
  function renderFilters() {
    var cats = ["Alle"].concat(P.map(function (p) { return p.nutzung; }).filter(function (c, i, a) { return a.indexOf(c) === i; }));
    $(".filters").innerHTML = cats.map(function (c) {
      var n = c === "Alle" ? P.length : P.filter(function (p) { return p.nutzung === c; }).length;
      return '<button type="button" data-f="' + esc(c) + '" aria-pressed="' + (c === filter) + '">' + esc(c) + "<sup>" + n + "</sup></button>";
    }).join("");
  }
  function renderSheet(instant) {
    shown = P.filter(function (p) { return filter === "Alle" || p.nutzung === filter; });
    var n = shown.length, base = perRow(), rows = Math.max(1, Math.ceil(n / base)), per = rows === 1 ? base : Math.ceil(n / rows), out = [];
    for (var r = 0; r < rows; r++) {
      var items = shown.slice(r * per, (r + 1) * per);
      var ars = items.map(function (p) { return arOf(p.bilder[0]); });
      var cols = ars.map(function (x) { return "minmax(0," + x + "fr)"; });
      if (items.length < per) {
        var avg = ars.reduce(function (a, b) { return a + b; }, 0) / ars.length;
        cols.push("minmax(0," + (avg * (per - items.length)).toFixed(2) + "fr)");
      }
      out.push('<div class="sheet-row" style="grid-template-columns:' + cols.join(" ") + '">' + items.map(function (p, j) {
        return '<a class="tile' + (instant ? " in" : "") + '" data-rv="tile" style="--j:' + j + '" href="#projekt/' + p.slug + '" data-i="' + shown.indexOf(p) + '">' +
          '<span class="tile-img" data-par style="aspect-ratio:' + ars[j] + '"><img src="' + img(p.bilder[0]) + '" alt="" loading="lazy"></span>' +
          '<span class="tile-cap"><span class="tile-t">' + esc(p.titel) + '</span><span class="tile-m">' + (p.ort === "Ort folgt" ? "" : esc(p.ort)) + "</span></span></a>";
      }).join("") + (items.length < per ? '<span class="tile-fill"></span>' : "") + "</div>");
    }
    sheet.innerHTML = out.join("");
    if (!instant) observeReveals(sheet);
    Par.watch(sheet); Par.kick();
  }
  $(".filters").addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return;
    filter = b.dataset.f; renderFilters(); renderSheet(true);
  });
  sheet.addEventListener("click", function (e) {
    var a = e.target.closest(".tile"); if (!a || e.metaKey || e.ctrlKey) return;
    e.preventDefault(); Card.open(+a.dataset.i);
  });
  var lastPer = perRow();
  addEventListener("resize", function () { if (perRow() !== lastPer) { lastPer = perRow(); renderSheet(true); } });
  renderFilters(); renderSheet(false);

  // Cursor-Label über den Projekten
  (function () {
    if (!finePointer || reduce) return;
    var c = $(".cursor"), x = 0, y = 0, cx = 0, cy = 0, raf = 0, on = false;
    function tick() {
      cx += (x - cx) * 0.22; cy += (y - cy) * 0.22;
      c.style.transform = "translate(" + cx.toFixed(1) + "px," + cy.toFixed(1) + "px)";
      raf = on || Math.abs(x - cx) > 0.3 ? requestAnimationFrame(tick) : 0;
    }
    sheet.addEventListener("mousemove", function (e) {
      x = e.clientX; y = e.clientY;
      var over = !!e.target.closest(".tile");
      if (over && !on) { cx = x; cy = y; }
      on = over; c.classList.toggle("on", over);
      if (!raf) raf = requestAnimationFrame(tick);
    });
    sheet.addEventListener("mouseleave", function () { on = false; c.classList.remove("on"); });
    addEventListener("scroll", function () { if (on) { on = false; c.classList.remove("on"); } }, { passive: true });
  })();

  /* ---------------- Projektkarte mit Nachbarn ---------------- */
  var Card = (function () {
    var el = $("#pv"), pimg = $(".pv-img img", el), thumbs = $(".pv-thumbs", el);
    var pkL = $(".pv-peek-l", el), pkR = $(".pv-peek-r", el);
    var idx = 0, imgs = [], cur = 0, back = null, busy = false;
    function bilder(p) {
      var list = p.bilder.slice();
      (p.varianten || []).forEach(function (v) { if (list.indexOf(v.bild) < 0) list.push(v.bild); });
      return list;
    }
    function setImg(k) {
      cur = k; pimg.classList.add("swap");
      var src = img(imgs[k]), pre = new Image();
      pre.onload = pre.onerror = function () { pimg.src = src; pimg.alt = shown[idx].titel; requestAnimationFrame(function () { pimg.classList.remove("swap"); }); };
      pre.src = src;
      $$("button", thumbs).forEach(function (b, j) { b.setAttribute("aria-current", j === k); });
    }
    function peek(btn, p, label) { $("img", btn).src = img(p.bilder[0]); $(".pk-t span", btn).textContent = p.titel; btn.setAttribute("aria-label", label + " Projekt: " + p.titel); }
    function fill() {
      var p = shown[idx], nx = shown[(idx + 1) % shown.length], pv = shown[(idx - 1 + shown.length) % shown.length];
      imgs = bilder(p);
      $(".pv-count", el).textContent = (idx + 1) + " / " + shown.length;
      $("#pv-title").textContent = p.titel;
      $(".pv-meta", el).textContent = [p.ort === "Ort folgt" ? "" : p.ort, p.nutzung, p.zeitraum].filter(Boolean).join(", ");
      $(".pv-lede", el).textContent = p.text[0];
      $(".pv-facts", el).innerHTML = [["Status", p.status], ["Leistung", p.leistung], ["Rolle", p.rolle], ["Umfang", p.kennzahl]]
        .filter(function (f) { return f[1]; }).map(function (f) { return "<dt>" + f[0] + "</dt><dd>" + esc(f[1]) + "</dd>"; }).join("");
      $(".pv-more", el).href = "#projekt/" + p.slug;
      $(".pv-prev span", el).textContent = pv.titel;
      $(".pv-next span", el).textContent = nx.titel;
      el.classList.toggle("single", shown.length < 2);
      peek(pkL, pv, "Vorheriges"); peek(pkR, nx, "Nächstes");
      thumbs.innerHTML = imgs.length > 1 ? imgs.map(function (k, j) { return '<button type="button" aria-label="Bild ' + (j + 1) + '"><img src="' + img(k) + '" alt=""></button>'; }).join("") : "";
      setImg(0);
    }
    function go(d) {
      if (shown.length < 2 || busy) return;
      busy = true;
      el.classList.add(d > 0 ? "go-next" : "go-prev");
      setTimeout(function () {
        idx = (idx + d + shown.length) % shown.length; fill();
        el.classList.remove("go-next", "go-prev"); el.classList.add(d > 0 ? "from-next" : "from-prev");
        requestAnimationFrame(function () { requestAnimationFrame(function () { el.classList.remove("from-next", "from-prev"); busy = false; }); });
      }, reduce ? 0 : 300);
    }
    function open(i) {
      idx = i; fill(); back = document.activeElement;
      el.hidden = false; document.body.style.overflow = "hidden";
      requestAnimationFrame(function () { requestAnimationFrame(function () { el.classList.add("on"); }); });
      $(".pv-x", el).focus({ preventScroll: true });
    }
    function close() {
      el.classList.remove("on"); document.body.style.overflow = "";
      setTimeout(function () { el.hidden = true; }, reduce ? 0 : 350);
      if (back && back.focus) back.focus({ preventScroll: true });
    }
    $(".pv-x", el).addEventListener("click", close);
    $(".pv-prev", el).addEventListener("click", function () { go(-1); });
    $(".pv-next", el).addEventListener("click", function () { go(1); });
    pkL.addEventListener("click", function () { go(-1); });
    pkR.addEventListener("click", function () { go(1); });
    $(".pv-more", el).addEventListener("click", function () { el.classList.remove("on"); el.hidden = true; document.body.style.overflow = ""; });
    el.addEventListener("click", function (e) { if (e.target === el) close(); });
    thumbs.addEventListener("click", function (e) { var b = e.target.closest("button"); if (b) setImg($$("button", thumbs).indexOf(b)); });
    $(".pv-img", el).addEventListener("click", function () { if (imgs.length > 1) setImg((cur + 1) % imgs.length); });
    document.addEventListener("keydown", function (e) {
      if (el.hidden) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "Tab") {
        var f = $$("button, a[href]", el).filter(function (x) { return x.offsetParent; });
        if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
      }
    });
    var sx = 0, sy = 0;
    $(".pv-media", el).addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    $(".pv-media", el).addEventListener("touchend", function (e) {
      var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
    }, { passive: true });
    return { open: open };
  })();

  /* ---------------- Karte ---------------- */
  (function () {
    var M = window.EUROPA, svg = $("#map"), tip = $("#map-tip"), list = $("#ort-list"), wrap = $(".map-wrap");
    var vb = [130, 195, 840, 400];
    svg.setAttribute("viewBox", vb.join(" "));
    var base = M.p.filter(function (c) { return c.n === "Oberhausen"; })[0];
    var count = M.p.map(function (c) { return (ORTE[c.n] || "").split(",").length; });
    var html = M.c.map(function (c) { return '<path class="land' + (c.hl ? " hl" : "") + '" d="' + c.d + '"/>'; }).join("");
    html += '<g class="routes">' + M.p.filter(function (c) { return c !== base; }).map(function (c) {
      var mx = (base.x + c.x) / 2, my = (base.y + c.y) / 2 - Math.hypot(c.x - base.x, c.y - base.y) * 0.18;
      return '<path class="route" pathLength="1" d="M' + base.x + "," + base.y + " Q" + mx.toFixed(1) + "," + my.toFixed(1) + " " + c.x + "," + c.y + '"/>';
    }).join("") + "</g>";
    html += M.p.map(function (c, i) {
      var hq = c === base || c.n === "Düsseldorf";
      return '<g class="city' + (hq ? " hq" : "") + '" data-i="' + i + '" tabindex="0" role="button" aria-label="' + esc(c.n + ": " + (ORTE[c.n] || "")) + '">' +
        '<circle class="hit" cx="' + c.x + '" cy="' + c.y + '" r="10"/>' +
        '<circle class="halo" cx="' + c.x + '" cy="' + c.y + '" r="9"/>' +
        (hq ? '<rect class="dot" x="' + (c.x - 4) + '" y="' + (c.y - 4) + '" width="8" height="8"/>' : '<circle class="dot" cx="' + c.x + '" cy="' + c.y + '" r="3.6"/>') + "</g>";
    }).join("");
    svg.insertAdjacentHTML("beforeend", html);
    var groups = $$(".city", svg);

    list.innerHTML = M.p.slice().sort(function (a, b) { return a.n.localeCompare(b.n, "de"); }).map(function (c) {
      var i = M.p.indexOf(c);
      return '<li><button type="button" data-i="' + i + '">' + esc(c.n) + "<sup>" + count[i] + "</sup></button></li>";
    }).join("");
    var listBtns = $$("button", list);

    var active = -1;
    function show(i) {
      active = i;
      var c = M.p[i], wr = wrap.getBoundingClientRect(), d = $(".dot", groups[i]).getBoundingClientRect();
      groups.forEach(function (g, j) { g.classList.toggle("on", j === i); });
      listBtns.forEach(function (b) { b.classList.toggle("on", +b.dataset.i === i); });
      tip.innerHTML = "<b>" + esc(c.n) + "</b>" + esc(ORTE[c.n] || "");
      tip.style.left = clamp(d.left + d.width / 2 - wr.left, 100, wr.width - 100) + "px";
      tip.style.top = (d.top - wr.top) + "px";
      tip.hidden = false;
    }
    function hide(i) {
      if (i !== undefined && i !== active) return;
      active = -1; tip.hidden = true;
      groups.forEach(function (g) { g.classList.remove("on"); });
      listBtns.forEach(function (b) { b.classList.remove("on"); });
    }
    // Infos nur, solange der Zeiger auf dem Punkt ist
    function bind(el, i) {
      el.addEventListener("mouseenter", function () { show(i); });
      el.addEventListener("mouseleave", function () { hide(i); });
      el.addEventListener("focus", function () { show(i); });
      el.addEventListener("blur", function () { hide(i); });
      el.addEventListener("click", function (e) { e.stopPropagation(); if (!finePointer) { active === i ? hide(i) : show(i); } });
    }
    groups.forEach(function (g) { bind(g, +g.dataset.i); });
    listBtns.forEach(function (b) { bind(b, +b.dataset.i); });
    document.addEventListener("click", function () { if (active > -1) hide(); });
    addEventListener("scroll", function () { if (active > -1 && !finePointer) hide(); }, { passive: true });

    // Verbindungen vom Büro aus, einmal beim Erscheinen
    var routes = $$(".route", svg);
    if (reduce) return;
    routes.forEach(function (p) { p.style.strokeDasharray = "1"; p.style.strokeDashoffset = "1"; });
    var io = new IntersectionObserver(function (es) {
      if (!es[0].isIntersecting) return;
      routes.forEach(function (p, i) {
        p.style.transition = "stroke-dashoffset 1.4s cubic-bezier(.4,0,.2,1) " + (0.2 + i * 0.05).toFixed(2) + "s";
        p.style.strokeDashoffset = "0";
      });
      setTimeout(function () { routes.forEach(function (p) { p.style.strokeDasharray = ""; p.style.strokeDashoffset = ""; p.style.transition = ""; p.removeAttribute("pathLength"); p.classList.add("done"); }); }, 2800);
      io.disconnect();
    }, { threshold: 0.35 });
    io.observe(wrap);
  })();

  /* ---------------- Werdegang ---------------- */
  (function () {
    var C = [
      { von: 1997, bis: 2003, name: "RKW Architektur +", rolle: "Entwurfsarchitekt, Düsseldorf", text: "Wettbewerbe, Ausführungsplanung und Entwurf von Shopping-Centern für die mfi AG." },
      { von: 2003, bis: 2014, name: "mfi", rolle: "Senior Architekt, Essen", text: "Rund 15 realisierte Arcaden, unter anderem Erlangen, Regensburg, Pasing, Bilk, Köln und Wilma Shoppen Berlin." },
      { von: 2014, bis: 2015, gap: true },
      { von: 2015, bis: 2018, name: "URW", rolle: "Leiter Concept Studio Germany, Unibail-Rodamco-Westfield", text: "Überseequartier Hamburg, Gropius Passagen Berlin, Paunsdorf Center Leipzig, Minto Mönchengladbach, Food Court Centro Oberhausen." },
      { von: 2018, bis: 2023, name: "Signa", rolle: "Geschäftsführer SCAx GmbH", text: "Umbau von Warenhäusern zu gemischt genutzten Häusern: Karstadt-Kaufhof-Portfolio, Selfridges, Globus. Büro, Gastronomie, Wohnen, Hotel und Entertainment." },
      { von: 2023, bis: 2024, gap: true },
      { von: 2024, bis: 2026.7, name: "Chapman Taylor", rolle: "Associate Director, Düsseldorf", text: "Leitung Entwurf und Design. Shopping-Center Neu-Isenburg, Mixed Use in Moldawien, Kudamm Berlin, Amprion Office Dortmund." },
      { von: 2026.7, bis: 2028, name: "Freier Architekt", rolle: "seit September 2026", text: "Leistungsphasen 1 bis 5, Partnerschaften mit Homann Architects und Yvonne von Salm.", now: true }
    ];
    var el = $("#career"), det = $("#career-detail");
    $(".career-axis").innerHTML = [1997, 2002, 2007, 2012, 2017, 2022, "heute"].map(function (y) { return "<span>" + y + "</span>"; }).join("");
    el.innerHTML = C.map(function (c, i) {
      var cls = c.gap ? "gap" : c.now ? "now" : "";
      return '<li class="' + cls + '" style="flex:' + (c.bis - c.von) + " 1 0;--i:" + i + '"><button type="button" data-i="' + i + '"' + (c.gap ? ' tabindex="-1" aria-hidden="true"' : "") + ">" + (c.gap ? "" : esc(c.name)) + "</button></li>";
    }).join("");
    function show(i) {
      var c = C[i]; if (!c || c.gap) return;
      det.innerHTML = "<b>" + esc(c.name) + "</b>, " + esc(c.rolle) + (c.now ? "" : ", " + c.von + "–" + Math.floor(c.bis)) + ". " + esc(c.text);
      $$("button", el).forEach(function (b) { b.classList.toggle("on", +b.dataset.i === i); });
    }
    ["mouseover", "focusin", "click"].forEach(function (ev) { el.addEventListener(ev, function (e) { var b = e.target.closest("button"); if (b) show(+b.dataset.i); }); });
    show(C.length - 1);
  })();

  /* ---------------- Projektseite ---------------- */
  var lbSet = [];
  function renderProject(p) {
    var i = P.indexOf(p), nx = P[(i + 1) % P.length];
    var facts = [["Ort", p.ort], ["Nutzung", p.nutzung], ["Status", p.status], ["Leistung", p.leistung], ["Rolle", p.rolle], ["Zeitraum", p.zeitraum], ["Umfang", p.kennzahl]]
      .filter(function (f) { return f[1] && f[1] !== "Ort folgt"; });
    var rest = p.bilder.slice(1);
    var gallery = rest.map(function (k, j) {
      var a = AR[k] || 1.4, cls = (rest.length % 2 === 1 && j === 0) ? "wide" : a < 1 ? "tall" : "";
      return '<figure class="' + cls + '" data-rv="curtain"><span class="g-in" data-par><img src="' + img(k) + '" alt="' + esc(p.titel) + ", Ansicht " + (j + 2) + '" loading="lazy" data-lb="' + (j + 1) + '"></span></figure>';
    }).join("");
    var variants = "";
    if (p.varianten) {
      variants = '<section class="variants" aria-labelledby="h-var"><h2 id="h-var">Fassadenvarianten</h2>' +
        '<div class="v-stage">' + p.varianten.map(function (v, k) { return '<img src="' + img(v.bild) + '" alt="Variante ' + "ABCD"[k] + ": " + esc(v.name) + '"' + (k === 0 ? ' class="on"' : ' loading="lazy"') + ">"; }).join("") + "</div>" +
        '<div class="v-tabs" role="group" aria-label="Variante wählen">' + p.varianten.map(function (v, k) { return '<button type="button" data-v="' + k + '" aria-pressed="' + (k === 0) + '"><small>' + "ABCD"[k] + "</small>" + esc(v.name) + "</button>"; }).join("") + "</div></section>";
    }
    var view = $("#view-projekt");
    view.innerHTML =
      '<article class="pj">' +
        '<header class="pj-head"><a class="pj-back" href="#projekte">Alle Projekte</a>' +
          '<h1 data-rv="line"><span class="rv-in">' + esc(p.titel) + "</span></h1>" +
          '<p class="pj-meta">' + (p.ort === "Ort folgt" ? "" : esc(p.ort) + "<br>") + esc(p.nutzung) + (p.zeitraum ? ", " + esc(p.zeitraum) : "") + "</p></header>" +
        (p.varianten ? variants : '<div class="pj-cover"><img src="' + img(p.bilder[0]) + '" alt="' + esc(p.titel) + '" data-lb="0"></div>') +
        '<div class="pj-body"><dl class="pj-facts">' + facts.map(function (f) { return "<dt>" + f[0] + "</dt><dd>" + esc(f[1]) + "</dd>"; }).join("") + "</dl>" +
          '<div class="pj-text" data-rv="fade">' + p.text.map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("") +
          (p.pruefen ? '<p class="pj-note">Entwurfsstand: Angaben und Bildrechte werden mit Witold Kondera abgestimmt.</p>' : "") + "</div></div>" +
        (gallery ? '<div class="gallery">' + gallery + "</div>" : "") +
        '<a class="pj-next" href="#projekt/' + nx.slug + '"><span>Nächstes Projekt</span><strong>' + esc(nx.titel) + "</strong></a>" +
      "</article>";
    observeReveals(view); Par.watch(view);
    lbSet = p.bilder.slice();
    var vt = $(".v-tabs", view);
    if (vt) vt.addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      var k = +b.dataset.v;
      $$(".v-stage img", view).forEach(function (im, j) { im.classList.toggle("on", j === k); });
      $$("button", vt).forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
    });
  }

  /* ---------------- Lightbox ---------------- */
  var lb = $("#lb"), lbImg = $("img", lb), lbI = 0, lbBack = null;
  function lbShow(i) { lbI = (i + lbSet.length) % lbSet.length; lbImg.src = img(lbSet[lbI]); $(".lb-count", lb).textContent = (lbI + 1) + " / " + lbSet.length; }
  function lbOpen(i) { lbBack = document.activeElement; lb.hidden = false; lbShow(i); $(".lb-x", lb).focus(); document.body.style.overflow = "hidden"; }
  function lbClose() { lb.hidden = true; document.body.style.overflow = ""; if (lbBack && lbBack.focus) lbBack.focus(); }
  document.addEventListener("click", function (e) { var t = e.target.closest("[data-lb]"); if (t) lbOpen(+t.dataset.lb); });
  $(".lb-x", lb).addEventListener("click", lbClose);
  $(".lb-prev", lb).addEventListener("click", function () { lbShow(lbI - 1); });
  $(".lb-next", lb).addEventListener("click", function () { lbShow(lbI + 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) lbClose(); });
  document.addEventListener("keydown", function (e) {
    if (lb.hidden) return;
    if (e.key === "Escape") lbClose();
    if (e.key === "ArrowLeft") lbShow(lbI - 1);
    if (e.key === "ArrowRight") lbShow(lbI + 1);
  });

  /* ---------------- Menü ---------------- */
  var menu = $("#menu"), mBtn = $(".menu-btn");
  function setMenu(open) { menu.hidden = !open; mBtn.setAttribute("aria-expanded", open); mBtn.textContent = open ? "Schließen" : "Menü"; document.body.style.overflow = open ? "hidden" : ""; }
  mBtn.addEventListener("click", function () { setMenu(menu.hidden); });
  menu.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });

  /* ---------------- Kopfzeile, aktive Navigation ---------------- */
  var top = $("#top");
  addEventListener("scroll", function () { top.classList.toggle("scrolled", scrollY > 8); }, { passive: true });
  var navLinks = $$(".nav a");
  var secIO = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      navLinks.forEach(function (a) { a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id); });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  $$("#view-home section[id]").forEach(function (s) { secIO.observe(s); });

  /* ---------------- Routing ---------------- */
  var homeScroll = 0, current = "home";
  function show(id) {
    $$(".view").forEach(function (v) { v.hidden = v.id !== "view-" + id; });
    document.body.classList.toggle("home", id === "home");
  }
  function route() {
    var h = decodeURIComponent(location.hash.slice(1));
    if (h.indexOf("projekt/") === 0) {
      var p = P.filter(function (x) { return "projekt/" + x.slug === h; })[0];
      if (p) {
        if (current === "home") homeScroll = scrollY;
        renderProject(p); show("projekt"); current = "projekt";
        document.title = p.titel + ", Witold Albert Kondera";
        scrollTo(0, 0); return;
      }
    }
    if (h === "impressum" || h === "datenschutz") {
      if (current === "home") homeScroll = scrollY;
      show(h); current = h;
      document.title = (h === "impressum" ? "Impressum" : "Datenschutz") + ", Witold Albert Kondera";
      scrollTo(0, 0); return;
    }
    var wasHome = current === "home";
    show("home"); current = "home";
    document.title = "Witold Albert Kondera, Architekt";
    var target = h && document.getElementById(h);
    if (target) requestAnimationFrame(function () { target.scrollIntoView({ behavior: wasHome && !reduce ? "smooth" : "auto" }); });
    else if (!wasHome) scrollTo(0, homeScroll);
    else if (!h) scrollTo(0, 0);
    Hero.kick(); Par.kick();
  }
  $$("[data-home]").forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      if (!location.hash) { scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }); return; }
      try { history.pushState(null, "", location.pathname + location.search); route(); }
      catch (err) { location.hash = ""; }
    });
  });
  addEventListener("hashchange", route);
  route();
})();
