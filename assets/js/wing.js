/* =========================================================
   Parrot's House — el ala
   Un ala gigante de loro (plumas azul / rojo / gris, los colores
   del logo) que barre la pantalla: en la intro y al cambiar de página.
   ========================================================= */
(function () {
  const PH = (window.PH = window.PH || {});
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const NS = 'http://www.w3.org/2000/svg';

  const PALETTE = {
    blue: ['#0b5a95', '#0f70b7', '#3a8fd0'],
    red: ['#b8241f', '#e7302a', '#f0645a'],
    grey: ['#9fa3a8', '#c7c5c6', '#e4e3e3'],
    navy: ['#0a4a7c', '#0f70b7', '#5aa2da'],
  };
  // filas: de la más larga (detrás) a la más corta (delante)
  const ROWS = [
    { len: 1.18, w: 0.17, col: 'blue', n: 17 },
    { len: 0.8, w: 0.2, col: 'red', n: 15 },
    { len: 0.55, w: 0.24, col: 'grey', n: 13 },
    { len: 0.34, w: 0.3, col: 'navy', n: 11 },
  ];

  let host, svg, feathers = [], built = false;

  const el = (tag, attrs) => {
    const n = document.createElementNS(NS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  };
  const ease = {
    out: (t) => 1 - Math.pow(1 - t, 3),
    inOut: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
    in: (t) => t * t * t,
  };

  function featherPath(L, w) {
    // pluma asimétrica: vano delantero estrecho, trasero ancho, punta redondeada
    return `M0,0 C${L * 0.16},${-w * 0.36} ${L * 0.6},${-w * 0.42} ${L * 0.93},${-w * 0.2}
      Q${L * 1.01},${-w * 0.12} ${L},${0}
      C${L * 0.96},${w * 0.28} ${L * 0.6},${w * 0.6} ${L * 0.14},${w * 0.4} Z`;
  }

  function build() {
    host = document.getElementById('wing');
    if (!host) {
      host = document.createElement('div');
      host.id = 'wing';
      host.className = 'wing';
      host.setAttribute('aria-hidden', 'true');
      document.body.appendChild(host);
    }
    host.innerHTML = '';
    const W = window.innerWidth, H = window.innerHeight;
    svg = el('svg', { viewBox: `0 0 ${W} ${H}`, preserveAspectRatio: 'none', width: '100%', height: '100%' });
    const defs = el('defs', {});
    Object.entries(PALETTE).forEach(([k, c]) => {
      const g = el('linearGradient', { id: `wg-${k}`, x1: '0', y1: '0', x2: '1', y2: '0' });
      g.appendChild(el('stop', { offset: '0', 'stop-color': c[0] }));
      g.appendChild(el('stop', { offset: '0.55', 'stop-color': c[1] }));
      g.appendChild(el('stop', { offset: '1', 'stop-color': c[2] }));
      defs.appendChild(g);
    });
    svg.appendChild(defs);

    // pivote (el "hombro") fuera de pantalla, abajo a la izquierda
    const px = -0.16 * W, py = 1.14 * H;
    const far = Math.hypot(W - px, py);
    const aTL = Math.atan2(-py, -px) * 180 / Math.PI;           // esquina sup. izq.
    const aBR = Math.atan2(H - py, W - px) * 180 / Math.PI;      // esquina inf. der.
    const a0 = aTL - 14, a1 = aBR + 12;
    const root = el('g', { transform: `translate(${px},${py})` });
    feathers = [];

    ROWS.forEach((row, r) => {
      const gRow = el('g', {});
      const L = far * row.len;
      const w = Math.min(L * row.w, 620);
      const d = featherPath(L, w);
      const shaft = Math.max(1.6, L * 0.0035);
      for (let i = 0; i < row.n; i++) {
        const t = row.n === 1 ? 0 : i / (row.n - 1);
        const jitter = (r % 2 ? 0.5 : 0) * ((a1 - a0) / row.n);
        const a = a0 + (a1 - a0) * t + jitter * (i < row.n - 1 ? 1 : 0);
        const g = el('g', {});
        g.appendChild(el('path', { d, fill: `url(#wg-${row.col})`, stroke: 'rgba(6,28,48,.22)', 'stroke-width': 1.4 }));
        // barbas separadas (pequeñas muescas)
        g.appendChild(el('path', {
          d: `M${L * 0.52},${w * 0.03} L${L * 0.64},${w * 0.4} M${L * 0.74},${w * 0.02} L${L * 0.83},${w * 0.27} M${L * 0.4},${-w * 0.03} L${L * 0.5},${-w * 0.3}`,
          stroke: 'rgba(255,255,255,.28)', 'stroke-width': Math.max(1.2, shaft * 0.7), fill: 'none', 'stroke-linecap': 'round',
        }));
        // raquis (el cañón de la pluma)
        g.appendChild(el('path', {
          d: `M0,0 Q${L * 0.5},${-w * 0.07} ${L * 0.985},${-w * 0.015}`,
          stroke: 'rgba(255,255,255,.6)', 'stroke-width': shaft, fill: 'none', 'stroke-linecap': 'round',
        }));
        gRow.appendChild(g);
        feathers.push({ g, a, r, i, n: row.n });
      }
      root.appendChild(gRow);
    });
    svg.appendChild(root);
    host.appendChild(svg);
    built = true;
  }

  function setAngle(f, deg, s = 1) {
    f.g.setAttribute('transform', `rotate(${deg.toFixed(2)}) scale(${s.toFixed(3)})`);
  }

  /* Anima todas las plumas. mode: 'in' (entran y cubren) | 'out' (salen y descubren) */
  function play(mode, dur = 900) {
    if (!built) build();
    host.classList.add('is-on');
    if (reduce) {
      feathers.forEach((f) => setAngle(f, mode === 'in' ? f.a : f.a + 140));
      if (mode === 'out') host.classList.remove('is-on');
      return Promise.resolve();
    }
    const FROM = -125, TO = 118;
    const per = dur * 0.62;
    return new Promise((resolve) => {
      const start = performance.now();
      const delayOf = (f) => {
        const order = mode === 'in' ? f.r * 0.07 + (f.i / f.n) * 0.3 : (3 - f.r) * 0.05 + (f.i / f.n) * 0.33;
        return order * dur;
      };
      function frame(now) {
        let done = true;
        for (const f of feathers) {
          let t = (now - start - delayOf(f)) / per;
          t = Math.min(1, Math.max(0, t));
          if (t < 1) done = false;
          if (mode === 'in') {
            const e = ease.out(t);
            setAngle(f, f.a + FROM * (1 - e), 0.9 + 0.1 * e);
          } else {
            const e = ease.in(t);
            setAngle(f, f.a + TO * e, 1 - 0.08 * e);
          }
        }
        if (!done) requestAnimationFrame(frame);
        else {
          if (mode === 'out') host.classList.remove('is-on');
          resolve();
        }
      }
      requestAnimationFrame(frame);
    });
  }

  /* Estado inicial: cubierto (para llegar a una página nueva) */
  function covered() {
    build();
    host.classList.add('is-on');
    feathers.forEach((f) => setAngle(f, f.a));
  }
  function hidden() {
    if (!built) build();
    feathers.forEach((f) => setAngle(f, f.a - 125, 0.9));
  }

  PH.wing = {
    cover: (d) => { hidden(); return play('in', d); },
    reveal: (d) => play('out', d),
    covered,
    rebuild: () => { if (built && !host.classList.contains('is-on')) build(); },
  };

  /* ---------- Transiciones entre páginas ---------- */
  function go(href) {
    try { sessionStorage.setItem('ph_wing', '1'); } catch (e) {}
    PH.wing.cover(820).then(() => { window.location.href = href; });
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
    if (!pending) { document.documentElement.classList.remove('wing-pending'); return; }
    covered();
    document.documentElement.classList.remove('wing-pending');
    setTimeout(() => PH.wing.reveal(1000), 120);
  }

  window.addEventListener('pageshow', (e) => {
    if (e.persisted && host) { host.classList.remove('is-on'); document.documentElement.classList.remove('wing-pending'); }
  });
  let rt;
  window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => PH.wing.rebuild(), 200); });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', arrive);
  else arrive();
})();
