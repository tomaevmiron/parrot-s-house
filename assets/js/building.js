/* Parrot's House — subpágina de cada edificio (elección del piso) */
(function () {
  const PH = window.PH;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const bid = document.body.dataset.b;
  const B = PH.BUILDINGS[bid];
  const apts = PH.aptsOf(bid);

  const ABOUT = {
    breeze: 'Un pequeño aparthotel a un paseo de la playa central de Lloret. Paredes encaladas, azul Egeo, ratán y suelo hidráulico: el Mediterráneo griego trasladado a la Costa Brava. Pisos luminosos para parejas y familias pequeñas.',
    pescadors: 'Líneas limpias en gris y blanco, cocinas negro mate y azulejo metro. Pescadors es el más sobrio de nuestros aparthoteles: práctico, silencioso y a pocos minutos de la arena.',
    pareclaret: 'Nuestro edificio más grande: diez apartamentos con nombre de flor en pleno centro de Lloret, con parking subterráneo. Madera, tonos tierra y terrazas soleadas para desayunar sin prisa.',
    fenals: 'Dos apartamentos LUX en una urbanización tranquila de Fenals, con piscina comunitaria, jardín y parking subterráneo. La playa de Fenals y el camino de ronda, a un paseo. Ideal para familias.',
  };
  const AMEN = {
    common: [['wifi', 'Wifi gratis'], ['kitchen', 'Cocina equipada'], ['tv', 'Smart TV'], ['towel', 'Ropa de cama y toallas'], ['crib', 'Cuna gratis bajo petición'], ['nosmoke', 'Sin humo']],
    breeze: [['beach', 'Playa central a un paseo']],
    pescadors: [['beach', 'Playa central a un paseo']],
    pareclaret: [['parking', 'Parking subterráneo'], ['beach', 'Terraza']],
    fenals: [['pool', 'Piscina comunitaria'], ['parking', 'Parking subterráneo'], ['family', 'Ideal familias']],
  };
  const HERO_IMGS = {
    breeze: [PH.photo(apts[0], 1), PH.photo(apts[1], 1, true), PH.photo(apts[0], 3, true)],
    pescadors: [PH.photo(apts[0], 1), PH.photo(apts[1], 1, true), PH.photo(apts[0], 2, true)],
    pareclaret: [PH.photo(PH.aptById(2), 1), PH.photo(PH.aptById(4), 1, true), PH.photo(PH.aptById(3), 8, true)],
    fenals: [PH.photo(PH.aptById(15), 4), PH.photo(PH.aptById(11), 1, true), PH.photo(PH.aptById(15), 6, true)],
  };
  const SEL_TITLE = {
    breeze: ['La fachada', 'Toca una ventana para ver el piso.'],
    pescadors: ['El registro', 'Cada piso, su número. Elige uno.'],
    pareclaret: ['El jardín', 'Diez pisos, diez flores. ¿Cuál es la tuya?'],
    fenals: ['Las calles de la piscina', 'Dos pisos gemelos, junto al agua.'],
  };

  /* ---------- HERO ---------- */
  const min = PH.minPrice(apts);
  $('#bh').innerHTML = `
    <div class="wrap bh__grid">
      <div class="bh__text">
        <a class="bh__back" href="index.html#apartamentos" data-wing>${PH.icon('back')} Todos los edificios</a>
        <span class="bh__kind">${B.kind} · Parrot's House</span>
        <h1 class="bh__name">${B.name}</h1>
        <p class="bh__about">${ABOUT[bid]}</p>
        <p class="bh__addr">${PH.icon('pin')} ${B.address}</p>
        <div class="bh__row">
          <a class="btn bh__btn" href="#pisos">Elegir piso ${PH.icon('arrow')}</a>
          <span class="bh__from"><b>${apts.length}</b> ${apts.length === 1 ? 'piso' : 'pisos'} · desde <b>${PH.eur(min)}</b>/noche</span>
        </div>
      </div>
      <div class="bh__media">
        ${HERO_IMGS[bid].map((src, i) => `<figure class="bh__ph bh__ph--${i + 1}"><img src="${src}" alt="Apartamento de ${B.name}" ${i ? 'loading="lazy"' : ''}></figure>`).join('')}
        <span class="bh__deco" aria-hidden="true"></span>
      </div>
    </div>`;

  /* ---------- SELECTOR (distinto en cada edificio) ---------- */
  $('#sel-title').textContent = SEL_TITLE[bid][0];
  $('#sel-sub').textContent = SEL_TITLE[bid][1];

  function facadeSVG() {
    // edificio de 4 plantas, 2 ventanas por planta. Los pisos se iluminan.
    const isB = bid === 'breeze';
    const W = 360, top = 70, fh = 72;
    // [planta desde arriba, columna] para cada piso (en el orden de PH.APTS)
    const slots = isB ? [[1, 0], [3, 1]] : [[2, 0], [0, 1]];
    let s = `<svg viewBox="0 0 ${W} 430" class="facade" role="group" aria-label="Fachada del edificio ${B.name}">`;
    if (isB) {
      s += `<circle cx="96" cy="70" r="40" class="f-dome"/><rect x="50" y="68" width="92" height="10" class="f-wall"/>
            <line x1="96" y1="20" x2="96" y2="30" class="f-cross"/><line x1="91" y1="25" x2="101" y2="25" class="f-cross"/>`;
    } else {
      s += `<rect x="40" y="56" width="280" height="10" class="f-rail"/>` +
        Array.from({ length: 15 }, (_, i) => `<line x1="${48 + i * 19}" y1="42" x2="${48 + i * 19}" y2="58" class="f-rail-l"/>`).join('') +
        `<line x1="40" y1="42" x2="320" y2="42" class="f-rail-l"/>`;
    }
    s += `<rect x="40" y="${top}" width="280" height="${fh * 4 + 60}" class="f-wall"/>`;
    for (let f = 0; f < 4; f++) {
      for (let c = 0; c < 2; c++) {
        const x = c ? 210 : 70, y = top + 16 + f * fh;
        const idx = slots.findIndex(([ff, cc]) => ff === f && cc === c);
        const a = idx >= 0 ? apts[idx] : null;
        if (a) {
          s += `<g class="win is-apt" data-id="${a.id}" tabindex="0" role="button" aria-label="${a.name}">
            <rect x="${x - 14}" y="${y - 2}" width="108" height="${fh - 18}" class="win__glow"/>
            <rect x="${x - 10}" y="${y + 2}" width="16" height="${fh - 26}" class="shut"/>
            <rect x="${x + 64}" y="${y + 2}" width="16" height="${fh - 26}" class="shut"/>
            <rect x="${x + 8}" y="${y + 2}" width="54" height="${fh - 26}" class="pane"/>
            <line x1="${x + 35}" y1="${y + 2}" x2="${x + 35}" y2="${y + fh - 24}" class="mull"/>
            <text x="${x + 35}" y="${y + fh / 2}" class="win__code">${a.code}</text>
          </g>`;
        } else {
          s += `<g class="win">
            <rect x="${x - 10}" y="${y + 2}" width="16" height="${fh - 26}" class="shut"/>
            <rect x="${x + 64}" y="${y + 2}" width="16" height="${fh - 26}" class="shut"/>
            <rect x="${x + 8}" y="${y + 2}" width="54" height="${fh - 26}" class="pane pane--off"/>
            <line x1="${x + 35}" y1="${y + 2}" x2="${x + 35}" y2="${y + fh - 24}" class="mull"/></g>`;
        }
      }
    }
    const gy = top + fh * 4 + 6;
    s += `<rect x="150" y="${gy}" width="60" height="54" class="door"/><circle cx="200" cy="${gy + 30}" r="2.5" class="knob"/>
          <text x="180" y="${gy - 8}" class="f-sign">${B.name.toUpperCase()}</text>
          <rect x="0" y="${gy + 54}" width="${W}" height="6" class="f-ground"/>`;
    if (isB) s += `<rect x="66" y="${gy + 18}" width="34" height="30" class="pot"/><path d="M70 ${gy + 18} q13 -30 26 0" class="leaf"/>`;
    s += '</svg>';
    return s;
  }

  function listHTML() {
    return `<div class="plist">${apts.map((a, i) => `
      <button type="button" class="pitem" data-id="${a.id}">
        <span class="pitem__no">${bid === 'pescadors' ? 'Nº ' + a.code.replace('N', '') : a.code}</span>
        <span class="pitem__n">${a.name}</span>
        <span class="pitem__m">${a.m2} m² · ${a.beds} hab. · hasta ${a.cap}</span>
        <span class="pitem__p">desde ${PH.eur(a.base)}</span>
      </button>`).join('')}</div>`;
  }

  function gardenHTML() {
    return `<div class="garden">${apts.map((a) => `
      <button type="button" class="flower" data-id="${a.id}" style="--sw:${a.swatch}">
        <span class="flower__bloom" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><b></b></span>
        <span class="flower__n">${a.name}</span>
        <span class="flower__m">${a.m2} m² · hasta ${a.cap}</span>
      </button>`).join('')}</div>`;
  }

  function lanesHTML() {
    return `<div class="lanes">${apts.map((a, i) => `
      <button type="button" class="lane" data-id="${a.id}">
        <img src="${PH.photo(a, 1, true)}" alt="" loading="lazy">
        <span class="lane__no">${i + 1}</span>
        <span class="lane__n">${a.name}</span>
        <span class="lane__m">${a.m2} m² · ${a.beds} hab. · terraza · desde ${PH.eur(a.base)}</span>
        <svg class="lane__w" viewBox="0 0 200 16" preserveAspectRatio="none" aria-hidden="true"><path d="M0 8 Q 12.5 0 25 8 T 50 8 T 75 8 T 100 8 T 125 8 T 150 8 T 175 8 T 200 8"/></svg>
      </button>`).join('')}</div>`;
  }

  const sel = $('#sel');
  if (bid === 'breeze' || bid === 'pescadors') sel.innerHTML = `<div class="sel-facade">${facadeSVG()}${listHTML()}</div>`;
  else if (bid === 'pareclaret') sel.innerHTML = gardenHTML();
  else sel.innerHTML = lanesHTML();

  /* ---------- DETALLE DEL PISO ---------- */
  let cur = null, photoIdx = 1;
  const amen = [...AMEN[bid], ...AMEN.common];

  function priceRange(a) {
    return [['Baja', a.base], ['Media', Math.round(a.base * 1.4 / 5) * 5], ['Alta', Math.round(a.base * 2.4 / 5) * 5]];
  }

  function renderDetail(a, animate) {
    cur = a; photoIdx = 1;
    const i = apts.indexOf(a);
    const prev = apts[(i - 1 + apts.length) % apts.length], next = apts[(i + 1) % apts.length];
    const pd = $('#pd');
    const html = `
      <div class="pd__gal">
        <button type="button" class="pd__main" aria-label="Ver foto en grande"><img src="${PH.photo(a, 1)}" alt="${a.name}, foto 1"></button>
        <div class="pd__thumbs">${Array.from({ length: a.photos }, (_, k) =>
          `<button type="button" data-k="${k + 1}" class="${k === 0 ? 'is-on' : ''}" aria-label="Foto ${k + 1}"><img src="${PH.photo(a, k + 1, true)}" alt="" loading="lazy"></button>`).join('')}</div>
      </div>
      <div class="pd__info">
        <span class="pd__code">${B.name} · ${String(i + 1).padStart(2, '0')}/${String(apts.length).padStart(2, '0')}</span>
        <h2 class="pd__name">${a.name}</h2>
        <p class="pd__note">${a.note}</p>
        <dl class="pd__specs">
          <div>${PH.icon('size')}<dt>Superficie</dt><dd>${a.m2} m²</dd></div>
          <div>${PH.icon('bed')}<dt>Dormitorios</dt><dd>${a.beds}</dd></div>
          <div>${PH.icon('users')}<dt>Huéspedes</dt><dd>hasta ${a.cap}</dd></div>
        </dl>
        <ul class="pd__amen">${amen.map(([ic, t]) => `<li>${PH.icon(ic)}${t}</li>`).join('')}</ul>
        <div class="pd__price">
          ${priceRange(a).map(([k, v]) => `<span><small>Temp. ${k.toLowerCase()}</small><b>${PH.eur(v)}</b></span>`).join('')}
          <em>precio orientativo por noche</em>
        </div>
        <div class="pd__ctas">
          <a class="btn pd__book" href="index.html?apt=${a.id}#reserva" data-wing>Reservar ${a.name} ${PH.icon('arrow')}</a>
          <a class="btn btn--ghost pd__ask" href="https://api.whatsapp.com/send?phone=${PH.CONTACT.phoneRaw}&text=${encodeURIComponent(`Hola, me interesa el apartamento ${a.name} de ${B.name}.`)}" target="_blank" rel="noopener">${PH.icon('whatsapp')} Preguntar</a>
        </div>
        ${apts.length > 2 ? `<div class="pd__nav">
          <button type="button" data-id="${prev.id}">${PH.icon('back')} ${prev.name}</button>
          <button type="button" data-id="${next.id}">${next.name} ${PH.icon('arrow')}</button></div>`
        : apts.length === 2 ? `<div class="pd__nav"><span>¿Comparar?</span>
          <button type="button" data-id="${next.id}">Ver ${next.name} ${PH.icon('arrow')}</button></div>` : ''}
      </div>`;
    if (animate) {
      pd.classList.add('is-swap');
      setTimeout(() => { pd.innerHTML = html; pd.classList.remove('is-swap'); }, 260);
    } else pd.innerHTML = html;

    $$('[data-id]', sel).forEach((x) => {
      const on = Number(x.dataset.id) === a.id;
      x.classList.toggle('is-sel', on);
      if (x.tagName === 'BUTTON') x.setAttribute('aria-pressed', on);
    });
    history.replaceState(null, '', `#piso-${a.id}`);
  }

  function choose(id, scroll) {
    const a = PH.aptById(id);
    if (!a || a.b !== bid) return;
    renderDetail(a, true);
    if (scroll) setTimeout(() => $('#detalle').scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
  }
  sel.addEventListener('click', (e) => { const t = e.target.closest('[data-id]'); if (t) choose(t.dataset.id, true); });
  sel.addEventListener('keydown', (e) => { if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('g[data-id]')) { e.preventDefault(); choose(e.target.dataset.id, true); } });

  const pd = $('#pd');
  pd.addEventListener('click', (e) => {
    const th = e.target.closest('.pd__thumbs button');
    if (th) { setPhoto(Number(th.dataset.k)); return; }
    if (e.target.closest('.pd__main')) { openLB(); return; }
    const nv = e.target.closest('.pd__nav button');
    if (nv) choose(nv.dataset.id, false);
  });
  function setPhoto(k) {
    photoIdx = k;
    const img = $('.pd__main img', pd);
    img.classList.add('is-fade');
    setTimeout(() => { img.src = PH.photo(cur, k); img.alt = `${cur.name}, foto ${k}`; img.onload = () => img.classList.remove('is-fade'); }, 150);
    $$('.pd__thumbs button', pd).forEach((b) => b.classList.toggle('is-on', Number(b.dataset.k) === k));
  }

  /* ---------- Visor de fotos ---------- */
  const lb = $('#lb');
  function lbShow() { $('img', lb).src = PH.photo(cur, photoIdx); $('.lb__c', lb).textContent = `${cur.name} · ${photoIdx}/${cur.photos}`; }
  function openLB() { lbShow(); lb.hidden = false; requestAnimationFrame(() => lb.classList.add('is-on')); document.body.style.overflow = 'hidden'; $('.lb__x', lb).focus(); }
  function closeLB() { lb.classList.remove('is-on'); document.body.style.overflow = ''; setTimeout(() => { lb.hidden = true; }, 250); }
  function stepLB(d) { photoIdx = ((photoIdx - 1 + d + cur.photos) % cur.photos) + 1; lbShow(); setPhoto(photoIdx); }
  $('.lb__x', lb).addEventListener('click', closeLB);
  $('.lb__p', lb).addEventListener('click', () => stepLB(-1));
  $('.lb__n', lb).addEventListener('click', () => stepLB(1));
  lb.addEventListener('click', (e) => { if (e.target === lb) closeLB(); });
  document.addEventListener('keydown', (e) => {
    if (lb.hidden) return;
    if (e.key === 'Escape') closeLB();
    if (e.key === 'ArrowLeft') stepLB(-1);
    if (e.key === 'ArrowRight') stepLB(1);
  });

  /* ---------- Cerca de aquí ---------- */
  const near = PH.PLACES.filter((p) => ['playa', 'monumento', 'restaurante', 'bar'].includes(p.c))
    .map((p) => ({ ...p, w: PH.walk(B, p) })).sort((a, b) => a.w.m - b.w.m).slice(0, 6);
  $('#near').innerHTML = near.map((p, i) => `
    <li class="rise" style="--d:${i * 0.05}s">
      <span class="near__min">${p.w.min}<small>min</small></span>
      <span class="near__t"><b>${p.n}</b><small>${PH.CATS[p.c].label.replace(/s$/, '').replace('Bares y ocio', 'Ocio')} · ${PH.fmtDist(p.w.m)}</small></span>
    </li>`).join('');

  /* ---------- Otras casas ---------- */
  $('#others').innerHTML = Object.values(PH.BUILDINGS).filter((x) => x.id !== bid).map((x) => `
    <a class="other other--${x.id}" href="${x.page}" data-wing>
      <img src="${x.cover.replace('/01.jpg', '/01-s.jpg')}" alt="" loading="lazy">
      <span><small>${x.kind}</small><b>${x.name}</b></span>${PH.icon('arrow')}
    </a>`).join('');

  /* ---------- Arranque ---------- */
  const fromHash = (location.hash.match(/piso-(\d+)/) || [])[1];
  renderDetail(PH.aptById(fromHash) && PH.aptById(fromHash).b === bid ? PH.aptById(fromHash) : apts[0], false);
  PH.observeRise();
})();
