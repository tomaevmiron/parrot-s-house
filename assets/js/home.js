/* Parrot's House — página principal */
(function () {
  const PH = window.PH;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const html = document.documentElement;
  const t = PH.t, tn = PH.tn;

  /* =====================================================
     1 · INTRO — el ala barre la pantalla y aparece el logo
     ===================================================== */
  const intro = $('#intro');
  if (html.classList.contains('intro-pending')) runIntro();
  else intro.remove();

  function runIntro() {
    try { sessionStorage.setItem('ph_seen', '1'); } catch (e) {}
    document.body.style.overflow = 'hidden';
    intro.classList.add('is-on');
    html.classList.remove('intro-pending');
    const timers = [];
    let ended = false;
    const later = (fn, ms) => timers.push(setTimeout(fn, ms));

    const end = () => {
      if (ended) return;
      ended = true;
      timers.forEach(clearTimeout);
      intro.classList.add('is-out');
      document.body.style.overflow = '';
      const w = document.getElementById('wing');
      if (w) w.classList.remove('is-on');
      setTimeout(() => intro.remove(), 900);
      $$('.hero .rise').forEach((e) => e.classList.add('is-in'));
    };
    intro.addEventListener('click', end);
    document.addEventListener('keydown', function k(e) { if (e.key === 'Escape') { end(); document.removeEventListener('keydown', k); } });

    // 1) el ala entra y cubre la pantalla
    later(() => {
      if (ended) return;
      PH.wing.cover(1050).then(() => {
        if (ended) return;
        // 2) bajo el ala aparece el logo; el ala se retira
        intro.classList.add('show');
        PH.wing.reveal(1150);
        later(() => intro.classList.add('blink'), 1900);
        later(end, 3300);
      });
    }, 150);
  }

  /* =====================================================
     2 · SERVICIOS
     ===================================================== */
  const PERKS = [
    ['beach', 'perk.beach'], ['parking', 'perk.parking'], ['wifi', 'perk.wifi'],
    ['family', 'perk.family'], ['plane', 'perk.transfer'], ['clock', 'perk.247'],
    ['crib', 'perk.crib'], ['towel', 'perk.linen'], ['nosmoke', 'perk.nosmoke'],
  ];
  $('#perks').innerHTML = PERKS.map(([i, k], n) =>
    `<li class="rise" style="--d:${n * 0.04}s">${PH.icon(i)}<span>${t(k)}</span></li>`).join('');

  /* =====================================================
     3 · EDIFICIOS (cada tarjeta con su mini diseño)
     ===================================================== */
  const order = ['breeze', 'pareclaret', 'fenals'];
  const deco = {
    breeze: '<svg class="bc-sun" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="22"/><g>' +
      Array.from({ length: 12 }, (_, i) => `<line x1="50" y1="12" x2="50" y2="22" transform="rotate(${i * 30} 50 50)"/>`).join('') + '</g></svg>',
    pareclaret: '<span class="bc-blob" aria-hidden="true"></span>',
    fenals: '<svg class="bc-wave" viewBox="0 0 400 40" preserveAspectRatio="none" aria-hidden="true"><path d="M0 20 Q 25 5 50 20 T 100 20 T 150 20 T 200 20 T 250 20 T 300 20 T 350 20 T 400 20 V40 H0Z"/></svg>',
  };
  $('#bgrid').innerHTML = order.map((id, k) => {
    const b = PH.BUILDINGS[id], apts = PH.aptsOf(id);
    return `
    <a class="bcard bcard--${id} rise" style="--d:${k * 0.08}s" href="${b.page}" data-wing>
      <div class="bcard__media"><img src="${b.cover}" alt="${b.name} · ${b.kind}" loading="lazy"></div>
      <div class="bcard__body">
        <span class="bcard__kind">${b.kind}</span>
        <h3 class="bcard__name">${b.name}</h3>
        <p class="bcard__tag">${b.tagline}</p>
        <ul class="bcard__perks">${b.perks.map((p) => `<li>${p}</li>`).join('')}</ul>
        <div class="bcard__foot">
          <span><b>${apts.length}</b> ${tn('u.flats', apts.length)} · ${t('u.from')} <b>${PH.eur(PH.minPrice(apts))}</b>${t('u.perNight')}</span>
          <span class="bcard__go">${t('card.see')} ${PH.icon('arrow')}</span>
        </div>
      </div>
      ${deco[id]}
    </a>`;
  }).join('');

  /* =====================================================
     4 · ALREDEDORES
     ===================================================== */
  const ORIGINS = [
    { id: 'pareclaret', label: 'Pare Claret', sub: t('origin.centro') },
    { id: 'centro-playa', label: 'Breeze', sub: t('origin.playa') },
    { id: 'fenals', label: 'Fenals', sub: t('origin.piscina') },
  ];
  const PHOTOS = {
    all: ['05', t('cap.all')],
    playa: ['17', t('cap.playa')],
    monumento: ['18', t('cap.monumento')],
    restaurante: ['15', t('cap.restaurante')],
    bar: ['14', t('cap.bar')],
    actividad: ['04', t('cap.actividad')],
  };
  const around = { origin: 'centro-playa', cat: 'all' };
  const originEl = $('#origin');
  originEl.innerHTML = ORIGINS.map((o) =>
    `<button role="tab" type="button" data-o="${o.id}" aria-selected="${o.id === around.origin}"><b>${o.label}</b><small>${o.sub}</small></button>`).join('');
  $('#cats').innerHTML = [['all', t('cat.all'), 'pin'], ...Object.entries(PH.CATS).map(([k, v]) => [k, v.label, v.icon])]
    .map(([k, l, i]) => `<button type="button" class="cat cat--${k}" data-c="${k}" aria-pressed="${k === 'all'}">${PH.icon(i)}${l}</button>`).join('');

  function originPoint() { return PH.LOCATIONS.find((l) => l.id === around.origin); }
  function renderAround() {
    const o = originPoint();
    const withD = PH.PLACES.map((p) => ({ ...p, w: PH.walk(o, p) }));
    const nearestBeach = withD.filter((p) => p.c === 'playa').sort((a, b) => a.w.m - b.w.m)[0];
    const key = [
      [t('key.beach'), nearestBeach.n, nearestBeach.w],
      [t('key.church'), '', withD.find((p) => p.n.startsWith('Església')).w],
      ['Dona Marinera', '', withD.find((p) => p.n === 'Dona Marinera').w],
      [t('key.bus'), '', withD.find((p) => p.n.startsWith('Estació')).w],
    ];
    $('#around-key').innerHTML = key.map(([title, s, w], i) => `
      <div class="kfig" style="--i:${i}">
        <span class="kfig__min">${w.min}<small> ${t('u.min')}</small></span>
        <span class="kfig__t">${title}</span>
        <span class="kfig__s">${s ? s + ' · ' : ''}${t('u.onFoot', { d: PH.fmtDist(w.m) })}</span>
      </div>`).join('');

    const list = withD.filter((p) => around.cat === 'all' || p.c === around.cat).sort((a, b) => a.w.m - b.w.m);
    const maxMin = Math.max(30, ...list.map((p) => p.w.min));
    $('#places').innerHTML = list.map((p, i) => `
      <li class="place place--${p.c}" style="--i:${i}">
        <span class="place__ico">${PH.icon(PH.CATS[p.c].icon)}</span>
        <div class="place__txt"><b>${p.n}</b><span>${p.d}</span></div>
        <div class="place__dist">
          <span class="place__min">${p.w.min} ${t('u.min')}</span>
          <span class="place__bar"><i style="width:${Math.max(6, (p.w.min / maxMin) * 100)}%"></i></span>
          <span class="place__m">${PH.fmtDist(p.w.m)}</span>
        </div>
      </li>`).join('');
    const ph = PHOTOS[around.cat];
    const fig = $('#around-photo');
    const img = fig.querySelector('img');
    if (!img.src.endsWith(`/${ph[0]}.jpg`)) {
      fig.classList.add('is-swap');
      setTimeout(() => {
        img.src = `assets/img/lloret/${ph[0]}.jpg`; img.alt = ph[1]; $('#around-cap').textContent = ph[1];
        img.onload = () => fig.classList.remove('is-swap');
      }, 220);
    }
  }
  originEl.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-o]'); if (!b) return;
    around.origin = b.dataset.o;
    $$('button', originEl).forEach((x) => x.setAttribute('aria-selected', x === b));
    renderAround();
  });
  $('#cats').addEventListener('click', (e) => {
    const b = e.target.closest('button[data-c]'); if (!b) return;
    around.cat = b.dataset.c;
    $$('#cats button').forEach((x) => x.setAttribute('aria-pressed', x === b));
    renderAround();
  });
  renderAround();

  /* =====================================================
     5 · RESERVA Y PAGO (simulación)
     ===================================================== */
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const st = { b: '', guests: 2, apt: null, in: null, out: null, month: new Date(today.getFullYear(), today.getMonth(), 1), step: 1, pm: 'card' };
  const MIN_N = 2;

  const BLABEL = { '': t('bk.all'), breeze: 'Breeze', pareclaret: 'Pare Claret', fenals: 'Fenals' };
  $('#bk-bfilter').innerHTML = Object.entries(BLABEL).map(([k, v]) =>
    `<button type="button" data-b="${k}" aria-pressed="${k === st.b}">${v}</button>`).join('');

  const rangeFree = (apt, a, b) => { for (let d = new Date(a); d < b; d = PH.addDays(d, 1)) if (PH.isBooked(apt, d)) return false; return true; };
  const stayTotal = (apt, a, b) => { let s = 0; for (let d = new Date(a); d < b; d = PH.addDays(d, 1)) s += PH.nightPrice(apt, d); return s; };

  function goStep(n) {
    st.step = n;
    $$('.bk__pane').forEach((p) => p.classList.toggle('is-on', Number(p.dataset.step) === n));
    $$('#bk-steps li').forEach((li, i) => {
      li.classList.toggle('is-on', i + 1 === n);
      li.classList.toggle('is-done', i + 1 < n);
    });
    if (n === 2) renderCal();
    renderSum();
  }
  $$('#bk-steps li').forEach((li, i) => li.addEventListener('click', () => { if (i + 1 < st.step && st.step < 4) goStep(i + 1); }));

  function renderApts() {
    const list = PH.APTS.filter((a) => !st.b || a.b === st.b);
    $('#bk-apts').innerHTML = list.map((a) => {
      const B = PH.BUILDINGS[a.b];
      const tooSmall = a.cap < st.guests;
      let avail = '';
      if (st.in && st.out) {
        const ok = rangeFree(a, st.in, st.out);
        avail = ok ? `<span class="av av--ok">${t('av.ok')}</span>` : `<span class="av av--no">${t('av.no')}</span>`;
      }
      return `
      <button type="button" class="apt apt--${a.b}${st.apt === a ? ' is-sel' : ''}" data-id="${a.id}" ${tooSmall ? 'disabled' : ''}>
        <img src="${PH.photo(a, 1, true)}" alt="" loading="lazy">
        <span class="apt__b">${B.name}</span>
        <b class="apt__n">${a.name}</b>
        <span class="apt__meta">${PH.aptMeta(a)}</span>
        <span class="apt__p">${t('u.from')} <b>${PH.eur(a.base)}</b>${t('u.perNight')}</span>
        ${tooSmall ? `<span class="av av--no">${t('av.max', { n: a.cap })}</span>` : avail}
      </button>`;
    }).join('');
  }
  $('#bk-apts').addEventListener('click', (e) => {
    const b = e.target.closest('.apt'); if (!b || b.disabled) return;
    st.apt = PH.aptById(b.dataset.id);
    if (st.in && st.out && !rangeFree(st.apt, st.in, st.out)) { st.in = st.out = null; }
    if (st.in) st.month = new Date(st.in.getFullYear(), st.in.getMonth(), 1);
    renderApts();
    goStep(2);
  });
  $('#bk-bfilter').addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    st.b = b.dataset.b;
    $$('#bk-bfilter button').forEach((x) => x.setAttribute('aria-pressed', x === b));
    renderApts();
  });
  $$('.stepper button').forEach((b) => b.addEventListener('click', () => {
    st.guests = Math.min(4, Math.max(1, st.guests + Number(b.dataset.g)));
    $('#bk-guests').textContent = st.guests;
    if (st.apt && st.apt.cap < st.guests) st.apt = null;
    renderApts(); renderSum();
  }));

  // Calendario
  // iniciales de los días (lunes primero) en el idioma activo
  const WD = Array.from({ length: 7 }, (_, i) => new Date(2024, 0, 1 + i).toLocaleDateString(PH.locale, { weekday: 'narrow' }));
  function monthHTML(m0) {
    const y = m0.getFullYear(), m = m0.getMonth();
    const first = new Date(y, m, 1), days = new Date(y, m + 1, 0).getDate();
    const pad = (first.getDay() + 6) % 7;
    const a = st.apt;
    // primera noche ocupada tras la llegada (límite para la salida)
    let limit = null;
    if (st.in && !st.out) { for (let d = new Date(st.in); d < PH.addDays(st.in, 60); d = PH.addDays(d, 1)) if (PH.isBooked(a, d)) { limit = d; break; } }
    let cells = WD.map((w) => `<span class="cal__wd">${w}</span>`).join('') + '<span></span>'.repeat(pad);
    for (let i = 1; i <= days; i++) {
      const d = new Date(y, m, i);
      const past = d < today;
      const busy = PH.isBooked(a, d);
      let cls = 'day', dis;
      if (busy) cls += ' is-busy';
      if (st.in && !st.out) {
        // eligiendo salida: se puede salir incluso un día ocupado (no se duerme esa noche)
        if (d <= st.in) dis = past || (busy && +d !== +st.in);
        else {
          dis = !!(limit && d > limit);
          if (!dis) cls += ' is-pick';
          if (!dis && PH.nights(st.in, d) < MIN_N) cls += ' is-short';
        }
      } else {
        dis = past || busy;
      }
      if (st.in && +d === +st.in) cls += ' is-in';
      if (st.out && +d === +st.out) cls += ' is-out';
      if (st.in && st.out && d > st.in && d < st.out) cls += ' is-range';
      const price = !busy && !past ? `<small>${PH.nightPrice(a, d)}</small>` : '';
      cells += `<button type="button" class="${cls}" data-d="${PH.ymd(d)}" ${dis ? 'disabled' : ''} aria-label="${PH.fmtDate(d, { weekday: 'long', day: 'numeric', month: 'long' })}${busy ? ', ' + t('cal.busy') : ''}">${i}${price}</button>`;
    }
    const title = first.toLocaleDateString(PH.locale, { month: 'long', year: 'numeric' });
    return `<div class="cal__m"><h4>${title[0].toUpperCase() + title.slice(1)}</h4><div class="cal__g">${cells}</div></div>`;
  }
  function renderCal() {
    if (!st.apt) return;
    const m2 = new Date(st.month.getFullYear(), st.month.getMonth() + 1, 1);
    $('#cal').innerHTML = monthHTML(st.month) + monthHTML(m2);
    $('#cal-prev').disabled = st.month <= new Date(today.getFullYear(), today.getMonth(), 1);
    const nN = st.in && st.out ? PH.nights(st.in, st.out) : 0;
    $('#cal-hint').textContent = !st.in ? t('cal.pickIn')
      : !st.out ? t('cal.pickOut', { d: PH.fmtDate(st.in), n: MIN_N })
      : `${nN} ${tn('u.nights', nN)} · ${PH.fmtDate(st.in)} → ${PH.fmtDate(st.out)}`;
    $('#to-3').disabled = !(st.in && st.out);
  }
  $('#cal').addEventListener('click', (e) => {
    const b = e.target.closest('.day'); if (!b || b.disabled) return;
    const d = PH.parse(b.dataset.d);
    if (!st.in || st.out || d <= st.in) {
      if (PH.isBooked(st.apt, d)) return;
      st.in = d; st.out = null;
    } else {
      if (PH.nights(st.in, d) < MIN_N) { $('#cal-hint').textContent = t('cal.min', { n: MIN_N }); return; }
      st.out = d;
    }
    renderCal(); renderSum();
  });
  $('#cal-prev').addEventListener('click', () => { st.month = new Date(st.month.getFullYear(), st.month.getMonth() - 1, 1); renderCal(); });
  $('#cal-next').addEventListener('click', () => { st.month = new Date(st.month.getFullYear(), st.month.getMonth() + 1, 1); renderCal(); });
  $$('[data-go]').forEach((b) => b.addEventListener('click', () => goStep(Number(b.dataset.go))));

  // Resumen
  function calc() {
    const a = st.apt, n = PH.nights(st.in, st.out);
    const stay = stayTotal(a, st.in, st.out);
    const tax = Math.round(PH.TOURIST_TAX * Math.min(n, 7) * st.guests * 100) / 100;
    return { n, stay, tax, total: stay + PH.CLEANING + tax };
  }
  function renderSum() {
    const el = $('#bk-sum');
    if (!st.apt) {
      el.innerHTML = `<div class="sum-empty"><img src="assets/img/logo-original.png" alt=""><p>${t('sum.empty')}</p></div>`;
      return;
    }
    const a = st.apt, B = PH.BUILDINGS[a.b];
    let rows = '';
    if (st.in && st.out) {
      const c = calc();
      rows = `
        <dl class="sum-dates"><div><dt>${t('q.in')}</dt><dd>${PH.fmtDate(st.in, { weekday: 'short', day: 'numeric', month: 'short' })}</dd></div>
        <div><dt>${t('q.out')}</dt><dd>${PH.fmtDate(st.out, { weekday: 'short', day: 'numeric', month: 'short' })}</dd></div>
        <div><dt>${t('q.guests')}</dt><dd>${st.guests}</dd></div></dl>
        <ul class="sum-lines">
          <li><span>${c.n} ${tn('u.nights', c.n)}</span><b>${PH.eur(c.stay)}</b></li>
          <li><span>${t('sum.cleaning')}</span><b>${PH.eur(PH.CLEANING)}</b></li>
          <li><span>${t('sum.tax')}</span><b>${PH.eur(c.tax, 2)}</b></li>
          <li class="sum-total"><span>${t('sum.total')}</span><b>${PH.eur(c.total, 2)}</b></li>
        </ul>
        <p class="sum-note">${st.pm === 'arrival' ? t('sum.payNothing') : t('sum.cancel')}</p>`;
    } else {
      rows = `<p class="sum-note">${t('sum.pickDates', { p: PH.eur(a.base) })}</p>`;
    }
    el.innerHTML = `
      <div class="sum-photo"><img src="${PH.photo(a, 1, true)}" alt=""><span class="sum-b sum-b--${a.b}">${B.name}</span></div>
      <h3>${a.name}</h3>
      <p class="sum-meta">${PH.aptMeta(a, true)}</p>
      ${rows}`;
  }

  // Pago
  // Tarjeta → página de pago de Stripe (modo prueba). Bizum y "pagar al llegar" siguen simulados.
  const pay = $('#pay');
  const payBtn = $('#pay-btn');
  const btnLabel = () => t(st.pm === 'card' ? 'bk.toStripe' : st.pm === 'arrival' ? 'bk.confirmBtn' : 'bk.payBtn');
  $('#stripe-test').textContent = t('pm.stripeTest', { p: PH.eur(PH.STRIPE_TEST.amount) });
  $('#paym').addEventListener('change', (e) => {
    st.pm = e.target.value;
    $$('.pm-pane').forEach((p) => p.classList.toggle('is-on', p.dataset.pm === st.pm));
    payBtn.textContent = btnLabel();
    renderSum();
  });
  // Si el visitante vuelve atrás desde Stripe, el botón tiene que volver a estar activo
  window.addEventListener('pageshow', (e) => { if (e.persisted) { payBtn.disabled = false; payBtn.textContent = btnLabel(); } });

  function showDone(code, email, viaStripe) {
    $('#done-code').textContent = code;
    $('#done-mail').textContent = email;
    $('#done-fine').textContent = t(viaStripe ? 'done.fineStripe' : 'done.fine');
    goStep(4);
    $('#bk-steps li:last-child').classList.add('is-done');
  }
  const STRIPE_LOCALES = ['es', 'en', 'fr', 'de', 'nl', 'it', 'pt', 'ru'];

  pay.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;
    ['name', 'email', 'tel'].forEach((n) => {
      const f = pay[n];
      let valid = f.value.trim().length > 1;
      if (n === 'email') valid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.value.trim());
      f.closest('.field').classList.toggle('is-bad', !valid);
      if (!valid) ok = false;
    });
    const chk = pay.ok;
    chk.closest('.check').classList.toggle('is-bad', !chk.checked);
    if (!chk.checked) ok = false;
    if (!ok) { pay.querySelector('.is-bad input, .is-bad textarea')?.focus(); return; }

    const code = 'PH-' + Math.random().toString(36).slice(2, 7).toUpperCase();
    const email = pay.email.value.trim();
    payBtn.disabled = true;

    if (st.pm === 'card') {
      // Se guarda la reserva para enseñarla al volver de Stripe
      try {
        sessionStorage.setItem('ph_pay', JSON.stringify({ code, email, apt: st.apt.id, in: PH.ymd(st.in), out: PH.ymd(st.out), guests: st.guests }));
      } catch (err) {}
      // Referencia que se ve en el pago dentro de Stripe: código_piso_entrada_salida_personas
      const ref = [code, 'apt' + st.apt.id, PH.ymd(st.in).replace(/-/g, ''), PH.ymd(st.out).replace(/-/g, ''), 'g' + st.guests].join('_');
      const u = new URL(PH.STRIPE_TEST.link);
      u.searchParams.set('prefilled_email', email);
      u.searchParams.set('client_reference_id', ref);
      u.searchParams.set('locale', STRIPE_LOCALES.includes(PH.lang) ? PH.lang : 'auto');
      payBtn.textContent = t('bk.redirecting');
      location.href = u.toString();
      return;
    }

    payBtn.textContent = t('bk.processing');
    setTimeout(() => {
      payBtn.disabled = false; payBtn.textContent = btnLabel();
      showDone(code, email, false);
    }, 1100);
  });
  $('#bk-reset').addEventListener('click', () => {
    pay.reset(); st.apt = null; st.in = st.out = null; st.pm = 'card';
    $$('.pm-pane').forEach((p) => p.classList.toggle('is-on', p.dataset.pm === 'card'));
    payBtn.textContent = btnLabel();
    renderApts(); goStep(1);
  });

  // Buscador rápido (arriba)
  const qin = $('#q-in'), qout = $('#q-out');
  qin.min = PH.ymd(today);
  qin.value = PH.ymd(PH.addDays(today, 14));
  qout.value = PH.ymd(PH.addDays(today, 18));
  qin.addEventListener('change', () => {
    qout.min = PH.ymd(PH.addDays(PH.parse(qin.value), MIN_N));
    if (!qout.value || qout.value <= qin.value) qout.value = PH.ymd(PH.addDays(PH.parse(qin.value), 3));
  });
  $('#quick').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!qin.value || !qout.value || qout.value <= qin.value) { qout.focus(); return; }
    st.b = $('#q-b').value; st.guests = Number($('#q-g').value);
    st.in = PH.parse(qin.value); st.out = PH.parse(qout.value);
    if (PH.nights(st.in, st.out) < MIN_N) st.out = PH.addDays(st.in, MIN_N);
    st.month = new Date(st.in.getFullYear(), st.in.getMonth(), 1);
    st.apt = null;
    $('#bk-guests').textContent = st.guests;
    $$('#bk-bfilter button').forEach((x) => x.setAttribute('aria-pressed', x.dataset.b === st.b));
    renderApts(); goStep(1);
    document.getElementById('reserva').scrollIntoView({ behavior: 'smooth' });
  });

  // ¿Venimos de una subpágina con un piso elegido? (?apt=19#reserva)
  // ¿O volvemos de pagar en Stripe? (?pago=ok, configurado en el enlace de pago)
  const qp = new URLSearchParams(location.search);
  renderApts();
  let back = null;
  if (qp.get('pago') === 'ok') {
    try { back = JSON.parse(sessionStorage.getItem('ph_pay')); sessionStorage.removeItem('ph_pay'); } catch (err) {}
    history.replaceState(null, '', location.pathname + '#reserva');
  }
  if (back && PH.aptById(back.apt)) {
    st.apt = PH.aptById(back.apt);
    st.in = PH.parse(back.in); st.out = PH.parse(back.out); st.guests = back.guests;
    $('#bk-guests').textContent = st.guests;
    renderApts();
    showDone(back.code, back.email, true);
    requestAnimationFrame(() => document.getElementById('reserva').scrollIntoView());
  } else if (qp.get('pago') === 'ok') {
    showDone('—', '', true);
    requestAnimationFrame(() => document.getElementById('reserva').scrollIntoView());
  } else if (qp.get('apt') && PH.aptById(qp.get('apt'))) {
    st.apt = PH.aptById(qp.get('apt'));
    st.guests = Math.min(st.guests, st.apt.cap);
    $('#bk-guests').textContent = st.guests;
    renderApts(); goStep(2);
  } else goStep(1);

  /* =====================================================
     6 · RESEÑAS (de muestra)
     ===================================================== */
  const REVIEWS = [
    { n: 'Laura', f: 'Madrid', b: 'breeze', s: 5, t: 'Salimos del portal y en un minuto estábamos en la arena. El apartamento, impecable y con mucho encanto.' },
    { n: 'Marc', f: 'Girona', b: 'pareclaret', s: 5, t: 'Tener parking en pleno centro de Lloret no tiene precio. La terraza para desayunar, un lujo.' },
    { n: 'Sophie', f: 'Lyon', b: 'fenals', s: 5, t: 'Parfait avec les enfants : piscine, calme et la plage de Fenals à deux pas.' },
    { n: 'Jan', f: 'Amsterdam', b: 'breeze', s: 4, t: 'Clean, modern and quiet. Great kitchen, we cooked most evenings. Very responsive host.' },
    { n: 'Anna', f: 'Warszawa', b: 'pareclaret', s: 5, t: 'Bardzo przytulnie, wszystko czyste. Dostaliśmy łóżeczko dla dziecka bez problemu.' },
    { n: 'Jordi', f: 'Barcelona', b: 'breeze', s: 5, t: 'Estil grec, llum a tot arreu i la platja a tocar. Tornarem segur!' },
    { n: 'Tom', f: 'Manchester', b: 'fenals', s: 4, t: 'Lovely balcony over the pine trees. A short walk to the coastal path and the beach bars.' },
  ];
  $('#rev-track').innerHTML = REVIEWS.map((r, i) => `
    <article class="rev rev--${r.b}" style="--i:${i}">
      <div class="rev__stars" aria-label="${t('rev.of5', { n: r.s })}">${Array.from({ length: 5 }, (_, k) => `<span class="${k < r.s ? 'on' : ''}">${PH.icon('star')}</span>`).join('')}</div>
      <p>“${r.t}”</p>
      <footer><span class="rev__av">${r.n[0]}</span><span><b>${r.n}</b><small>${r.f} · ${PH.BUILDINGS[r.b].name}</small></span></footer>
    </article>`).join('');
  const track = $('#rev-track');
  const step = () => (track.querySelector('.rev')?.offsetWidth || 300) + 20;
  $('#rev-prev').addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
  $('#rev-next').addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));

  /* =====================================================
     7 · CÓMO LLEGAR — mapa con las 3 ubicaciones
     ===================================================== */
  $('#locs').innerHTML = PH.LOCATIONS.map((l, i) => `
    <article class="loc rise" style="--d:${i * 0.08}s" data-loc="${l.id}" tabindex="0">
      <span class="loc__n">${i + 1}</span>
      <div>
        <h3>${l.title}</h3>
        <p>${PH.icon('pin')} ${l.address}</p>
        <div class="loc__links">
          ${l.buildings.map((b) => `<a href="${PH.BUILDINGS[b].page}" data-wing>${PH.BUILDINGS[b].name}</a>`).join('')}
          <a href="https://www.google.com/maps/dir/?api=1&destination=${l.lat},${l.lng}" target="_blank" rel="noopener">${t('loc.route')} ${PH.icon('arrow')}</a>
        </div>
      </div>
    </article>`).join('');
  PH.observeRise($('#locs'));

  if (window.L) {
    const map = L.map('map', { scrollWheelZoom: false, zoomControl: true }).setView([41.699, 2.843], 15);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19, className: 'ph-tiles',
    }).addTo(map);
    const markers = {};
    PH.LOCATIONS.forEach((l, i) => {
      const icon = L.divIcon({
        className: 'pin', iconSize: [54, 64], iconAnchor: [27, 62], popupAnchor: [0, -58],
        html: `<span class="pin__in"><img src="assets/img/logo-original.png" alt=""></span><b>${i + 1}</b>`,
      });
      markers[l.id] = L.marker([l.lat, l.lng], { icon, title: l.title }).addTo(map)
        .bindPopup(`<b>${l.title}</b><br>${l.address}`);
    });
    // algunas referencias
    ['Església de Sant Romà', 'Dona Marinera', 'Platja de Fenals', 'Platja de Lloret'].forEach((n) => {
      const p = PH.PLACES.find((x) => x.n === n);
      L.circleMarker([p.lat, p.lng], { radius: 6, color: '#fff', weight: 2, fillColor: '#16191d', fillOpacity: 1 })
        .addTo(map).bindTooltip(p.n, { direction: 'top', offset: [0, -6] });
    });
    map.fitBounds(L.latLngBounds(PH.LOCATIONS.map((l) => [l.lat, l.lng])).pad(0.25));
    $$('.loc').forEach((c) => {
      const go = () => { const l = PH.LOCATIONS.find((x) => x.id === c.dataset.loc); map.flyTo([l.lat, l.lng], 17, { duration: 0.8 }); markers[l.id].openPopup(); $$('.loc').forEach((x) => x.classList.toggle('is-on', x === c)); };
      c.addEventListener('click', (e) => { if (!e.target.closest('a')) go(); });
      c.addEventListener('keydown', (e) => { if (e.key === 'Enter') go(); });
    });
  }

  // Nav activa según sección
  const navLinks = $$('.nav a');
  const secs = navLinks.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const so = new IntersectionObserver((en) => {
    en.forEach((x) => {
      if (x.isIntersecting) navLinks.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + x.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  secs.forEach((s) => so.observe(s));

  PH.observeRise();
})();
