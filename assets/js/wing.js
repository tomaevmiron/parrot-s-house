/* =========================================================
   Parrot's House — el ala
   Un ala gigante de loro (plumas azul / rojo / gris, los colores
   del logo) que barre la pantalla: en la intro y al cambiar de página.

   Rendimiento: cada tipo de pluma se pinta UNA sola vez en un canvas.
   Cada pluma es su propio <canvas> (una capa de GPU) y se mueve solo
   con transform (rotate + scale) mediante la Web Animations API.
   Así la animación la ejecuta el compositor de la GPU: no hay repintado
   en cada fotograma y no se bloquea aunque la página esté cargando.
   ========================================================= */
(function () {
  const PH = (window.PH = window.PH || {});
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const PALETTE = {
    blue: ['#0b5a95', '#0f70b7', '#3a8fd0'],
    red: ['#b8241f', '#e7302a', '#f0645a'],
    grey: ['#9fa3a8', '#c7c5c6', '#e4e3e3'],
    navy: ['#0a4a7c', '#0f70b7', '#5aa2da'],
  };
  // filas: de la más larga (detrás) a la más corta (delante)
  const ROWS = [
    { len: 1.18, w: 0.17, col: 'blue', n: 13 },
    { len: 0.8, w: 0.2, col: 'red', n: 11 },
    { len: 0.55, w: 0.24, col: 'grey', n: 10 },
    { len: 0.34, w: 0.3, col: 'navy', n: 8 },
  ];
  const FROM = -125;   // ángulo extra al entrar (plumas plegadas fuera de pantalla)
  const TO = 118;      // ángulo extra al salir
  const EASE_OUT = 'cubic-bezier(.215,.61,.355,1)';
  const EASE_IN = 'cubic-bezier(.55,.055,.675,.19)';

  let host = null, feathers = [], textures = null, running = [], built = false;

  /* ---------- texturas: una por fila, pintadas una sola vez ---------- */
  function featherPath(L, w) {
    const p = new Path2D();
    p.moveTo(0, 0);
    p.bezierCurveTo(L * 0.16, -w * 0.36, L * 0.6, -w * 0.42, L * 0.93, -w * 0.2);
    p.quadraticCurveTo(L * 1.01, -w * 0.12, L, 0);
    p.bezierCurveTo(L * 0.96, w * 0.28, L * 0.6, w * 0.6, L * 0.14, w * 0.4);
    p.closePath();
    return p;
  }
  function makeTextures() {
    const small = Math.min(window.innerWidth, window.innerHeight) < 700;
    const TW = small ? 520 : 820;          // resolución del dibujo (la GPU lo escala)
    const pad = Math.round(TW * 0.03);
    const out = {};
    ROWS.forEach((row, r) => {
      const w = TW * row.w;
      const cw = Math.ceil(TW + pad * 2), ch = Math.ceil(w * 1.12 + pad * 2);
      const ox = pad, oy = Math.round(pad + w * 0.46);   // base del cañón = punto de giro
      const c = document.createElement('canvas');
      c.width = cw; c.height = ch;
      const x = c.getContext('2d');
      x.translate(ox, oy);
      const path = featherPath(TW, w);
      const g = x.createLinearGradient(0, 0, TW, 0);
      const pal = PALETTE[row.col];
      g.addColorStop(0, pal[0]); g.addColorStop(0.55, pal[1]); g.addColorStop(1, pal[2]);
      // sombra suave horneada en la textura (gratis en la animación)
      x.save();
      x.shadowColor = 'rgba(6,28,48,.28)'; x.shadowBlur = pad * 0.8; x.shadowOffsetY = pad * 0.25;
      x.fillStyle = g; x.fill(path);
      x.restore();
      x.lineWidth = 1.2; x.strokeStyle = 'rgba(6,28,48,.22)'; x.stroke(path);
      // barbas separadas
      x.lineCap = 'round';
      x.strokeStyle = 'rgba(255,255,255,.3)'; x.lineWidth = Math.max(1, TW * 0.0028);
      x.beginPath();
      x.moveTo(TW * 0.52, w * 0.03); x.lineTo(TW * 0.64, w * 0.4);
      x.moveTo(TW * 0.74, w * 0.02); x.lineTo(TW * 0.83, w * 0.27);
      x.moveTo(TW * 0.4, -w * 0.03); x.lineTo(TW * 0.5, -w * 0.3);
      x.stroke();
      // raquis (cañón)
      x.strokeStyle = 'rgba(255,255,255,.62)'; x.lineWidth = Math.max(1.4, TW * 0.004);
      x.beginPath(); x.moveTo(0, 0); x.quadraticCurveTo(TW * 0.5, -w * 0.07, TW * 0.985, -w * 0.015); x.stroke();
      out[r] = { canvas: c, cw, ch, ox, oy, TW };
    });
    return out;
  }

  /* ---------- construcción de las capas ---------- */
  function ensureHost() {
    host = document.getElementById('wing');
    if (!host) {
      host = document.createElement('div');
      host.id = 'wing';
      host.className = 'wing';
      host.setAttribute('aria-hidden', 'true');
      document.body.appendChild(host);
    }
  }

  function build() {
    ensureHost();
    if (!textures) textures = makeTextures();
    cancelAll();
    host.textContent = '';
    feathers = [];
    const W = window.innerWidth, H = window.innerHeight;
    // pivote (el "hombro") fuera de pantalla, abajo a la izquierda
    const px = -0.16 * W, py = 1.14 * H;
    const far = Math.hypot(W - px, py);
    const aTL = Math.atan2(-py, -px) * 180 / Math.PI;
    const aBR = Math.atan2(H - py, W - px) * 180 / Math.PI;
    const a0 = aTL - 14, a1 = aBR + 12;
    const frag = document.createDocumentFragment();

    ROWS.forEach((row, r) => {
      const t = textures[r];
      const k = (far * row.len) / t.TW;          // escala de la textura al tamaño real
      for (let i = 0; i < row.n; i++) {
        const f = row.n === 1 ? 0 : i / (row.n - 1);
        const jitter = r % 2 && i < row.n - 1 ? 0.5 * ((a1 - a0) / row.n) : 0;
        const a = a0 + (a1 - a0) * f + jitter;
        const c = document.createElement('canvas');
        c.width = t.cw; c.height = t.ch;
        c.getContext('2d').drawImage(t.canvas, 0, 0);
        c.className = 'wing__f';
        c.style.width = t.cw + 'px';
        c.style.height = t.ch + 'px';
        c.style.transformOrigin = `${t.ox}px ${t.oy}px`;
        const base = `translate3d(${(px - t.ox).toFixed(1)}px, ${(py - t.oy).toFixed(1)}px, 0)`;
        frag.appendChild(c);
        feathers.push({ el: c, a, r, i, n: row.n, k, base });
      }
    });
    host.appendChild(frag);
    built = true;
  }

  const tf = (f, extra, s) => `${f.base} rotate(${(f.a + extra).toFixed(2)}deg) scale(${(f.k * s).toFixed(4)})`;
  function pose(extra, s) { feathers.forEach((f) => { f.el.style.transform = tf(f, extra, s); }); }
  function cancelAll() { running.forEach((an) => an.cancel()); running = []; }

  /* Anima todas las plumas. mode: 'in' (entran y cubren) | 'out' (salen y descubren) */
  function play(mode, dur = 900) {
    if (!built) build();
    host.classList.add('is-on');
    cancelAll();
    if (reduce || !feathers[0].el.animate) {
      pose(mode === 'in' ? 0 : TO, 1);
      if (mode === 'out') host.classList.remove('is-on');
      return Promise.resolve();
    }
    const per = dur * 0.62;
    running = feathers.map((f) => {
      const order = mode === 'in' ? f.r * 0.07 + (f.i / f.n) * 0.3 : (3 - f.r) * 0.05 + (f.i / f.n) * 0.33;
      const frames = mode === 'in'
        ? [{ transform: tf(f, FROM, 0.9) }, { transform: tf(f, 0, 1) }]
        : [{ transform: tf(f, 0, 1) }, { transform: tf(f, TO, 0.92) }];
      return f.el.animate(frames, { duration: per, delay: order * dur, easing: mode === 'in' ? EASE_OUT : EASE_IN, fill: 'both' });
    });
    return Promise.all(running.map((an) => an.finished.catch(() => {}))).then(() => {
      // fija la pose final en el estilo y libera las animaciones
      pose(mode === 'in' ? 0 : TO, mode === 'in' ? 1 : 0.92);
      cancelAll();
      if (mode === 'out') host.classList.remove('is-on');
    });
  }

  function covered() {
    if (!built) build();
    cancelAll();
    pose(0, 1);
    host.classList.add('is-on');
  }
  function hidden() {
    if (!built) build();
    pose(FROM, 0.9);
  }

  PH.wing = {
    cover: (d) => { hidden(); return play('in', d); },
    reveal: (d) => play('out', d),
    covered,
    prepare: () => { if (!built) build(); },
  };

  /* ---------- Transiciones entre páginas ---------- */
  let leaving = false;
  // reload=true: recarga aunque la URL solo cambie en el #hash (p. ej. al cambiar de idioma)
  function go(href, reload) {
    if (leaving) return;
    leaving = true;
    try { sessionStorage.setItem('ph_wing', '1'); } catch (e) {}
    let done = false;
    const nav = () => {
      if (done) return;
      done = true;
      const to = new URL(href, location.href);
      if (reload && to.pathname === location.pathname && to.search === location.search) location.reload();
      else window.location.href = href;
    };
    PH.wing.cover(820).then(nav);
    setTimeout(nav, 1600); // red de seguridad: navega aunque la animación no termine
  }
  PH.go = go;

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-wing]');
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    const href = a.getAttribute('href');
    if (!href) return;
    e.preventDefault();
    go(href);
  });

  // llegada a una página con el ala puesta
  function arrive() {
    let pending = false;
    try { pending = sessionStorage.getItem('ph_wing') === '1'; sessionStorage.removeItem('ph_wing'); } catch (e) {}
    if (!pending) {
      document.documentElement.classList.remove('wing-pending');
      // prepara las capas cuando el navegador esté libre, para que el primer clic sea instantáneo
      (window.requestIdleCallback || ((fn) => setTimeout(fn, 600)))(() => PH.wing.prepare());
      return;
    }
    covered();
    document.documentElement.classList.remove('wing-pending');
    // espera dos fotogramas (pintado del estado cubierto) y deja que la página respire antes de destapar
    requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(() => PH.wing.reveal(1000), 160)));
  }

  window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
      leaving = false;
      if (host) { cancelAll(); host.classList.remove('is-on'); }
      document.documentElement.classList.remove('wing-pending');
    }
  });
  let rt;
  window.addEventListener('resize', () => {
    clearTimeout(rt);
    rt = setTimeout(() => { if (built && !host.classList.contains('is-on')) build(); }, 250);
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', arrive);
  else arrive();
})();
