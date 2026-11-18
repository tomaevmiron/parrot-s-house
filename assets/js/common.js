/* Parrot's House — utilidades comunes a todas las páginas */
(function () {
  const PH = window.PH;
  const t = PH.t, tn = PH.tn;

  PH.fillIcons = (root = document) => {
    root.querySelectorAll('i[data-ico]').forEach((i) => {
      i.outerHTML = PH.icon(i.dataset.ico);
    });
  };

  /* ---------- Selector de idioma (en la cabecera) ---------- */
  const header = document.getElementById('header');
  function buildLangSwitch() {
    if (!header) return;
    const wrap = header.querySelector('.wrap');
    const box = document.createElement('div');
    box.className = 'lang';
    box.innerHTML = `
      <button type="button" class="lang__btn" aria-haspopup="true" aria-expanded="false" aria-label="${t('aria.lang')}: ${PH.LANG_NAMES[PH.lang]}">
        <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>
        <span>${PH.langLabel(PH.lang)}</span>
      </button>
      <ul class="lang__menu" role="menu">
        ${PH.LANGS.map((l) => `<li role="none"><button type="button" role="menuitem" lang="${l}" data-lang="${l}" ${l === PH.lang ? 'aria-current="true"' : ''}><b>${PH.langLabel(l)}</b>${PH.LANG_NAMES[l]}</button></li>`).join('')}
      </ul>`;
    wrap.insertBefore(box, document.getElementById('burger'));
    const btn = box.querySelector('.lang__btn');
    const close = () => { box.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); };
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = box.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open);
      if (open) box.querySelector('[aria-current]')?.focus();
    });
    document.addEventListener('click', (e) => { if (!box.contains(e.target)) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
    box.querySelector('.lang__menu').addEventListener('click', (e) => {
      const b = e.target.closest('[data-lang]');
      if (!b) return;
      close();
      if (b.dataset.lang === PH.lang) return;
      try { localStorage.setItem('ph_lang', b.dataset.lang); } catch (err) {}
      // quita ?lang= de la URL para que mande la elección guardada
      const u = new URL(location.href);
      u.searchParams.delete('lang');
      PH.go ? PH.go(u.pathname.split('/').pop() + u.search + u.hash, true) : location.replace(u);
    });
  }
  buildLangSwitch();
  PH.fillIcons();

  // Cabecera: sombra al hacer scroll + menú móvil
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const burger = document.getElementById('burger');
    if (burger) {
      burger.addEventListener('click', () => {
        const open = header.classList.toggle('is-open');
        burger.setAttribute('aria-expanded', open);
      });
      header.querySelectorAll('.nav a').forEach((a) => a.addEventListener('click', () => {
        header.classList.remove('is-open'); burger.setAttribute('aria-expanded', 'false');
      }));
    }
  }

  // Revelado al entrar en pantalla
  PH.observeRise = (root = document) => {
    const els = root.querySelectorAll('.rise:not(.is-in)');
    if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('is-in')); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach((e) => io.observe(e));
  };
  PH.observeRise();

  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Fechas, precios y distancias en el formato del idioma activo
  PH.ymd = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  PH.parse = (s) => { const [a, b, c] = s.split('-').map(Number); return new Date(a, b - 1, c); };
  PH.addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
  PH.nights = (a, b) => Math.round((b - a) / 864e5);
  PH.fmtDate = (d, opts = { day: 'numeric', month: 'short' }) => d.toLocaleDateString(PH.locale, opts);
  PH.eur = (n, dec = 0) => n.toLocaleString(PH.locale, { style: 'currency', currency: 'EUR', currencyDisplay: 'narrowSymbol', minimumFractionDigits: dec, maximumFractionDigits: dec });
  const [uM, uKm] = (PH.lang === 'ru' || PH.lang === 'uk') ? ['м', 'км'] : ['m', 'km'];
  PH.fmtDist = (m) => (m < 1000 ? `${m} ${uM}` : `${(m / 1000).toLocaleString(PH.locale, { maximumFractionDigits: 1 })} ${uKm}`);
  PH.minPrice = (apts) => Math.min(...apts.map((a) => a.base));
  // "59 m² · 2 dormitorios · hasta 4"
  PH.aptMeta = (a, long) => `${a.m2} m² · ${a.beds} ${tn('u.bedrooms', a.beds)} · ${t(long ? 'u.upToGuests' : 'u.upTo', { n: a.cap })}`;
})();
