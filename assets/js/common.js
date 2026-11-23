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

  /* ---------- Modo oscuro (botón luna/sol en la cabecera) ---------- */
  const root = document.documentElement;
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  const lightThemeColor = metaTheme ? metaTheme.content : '#0f70b7';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isDark = () => root.getAttribute('data-theme') === 'dark';
  let themeBtn = null;
  function paintThemeBtn() {
    if (metaTheme) metaTheme.content = isDark() ? '#0b1826' : lightThemeColor;
    if (!themeBtn) return;
    const label = t(isDark() ? 'theme.toLight' : 'theme.toDark');
    themeBtn.setAttribute('aria-label', label);
    themeBtn.title = label;
    themeBtn.setAttribute('aria-pressed', isDark());
  }
  function applyTheme(dark) {
    if (dark) root.setAttribute('data-theme', 'dark'); else root.removeAttribute('data-theme');
    paintThemeBtn();
  }
  PH.setTheme = (dark, animate) => {
    if (dark === isDark()) return;
    if (!animate || reduceMotion) { applyTheme(dark); return; }
    if (document.startViewTransition) {
      document.startViewTransition(() => applyTheme(dark));       // fundido por GPU
    } else {
      root.classList.add('theme-anim');
      applyTheme(dark);
      setTimeout(() => root.classList.remove('theme-anim'), 500);
    }
  };
  if (header) {
    themeBtn = document.createElement('button');
    themeBtn.type = 'button';
    themeBtn.className = 'theme-btn';
    themeBtn.innerHTML = `
      <svg class="ico i-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z"/></svg>
      <svg class="ico i-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"/></svg>`;
    const wrap = header.querySelector('.wrap');
    wrap.insertBefore(themeBtn, header.querySelector('.lang') || document.getElementById('burger'));
    themeBtn.addEventListener('click', () => {
      const next = !isDark();
      try { localStorage.setItem('ph_theme', next ? 'dark' : 'light'); } catch (e) {}
      PH.setTheme(next, true);
    });
  }
  paintThemeBtn();
  // si el visitante no ha elegido, sigue el modo de su sistema en tiempo real
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  const onSystem = (e) => { let saved = null; try { saved = localStorage.getItem('ph_theme'); } catch (err) {} if (!saved) PH.setTheme(e.matches, true); };
  if (mq.addEventListener) mq.addEventListener('change', onSystem); else if (mq.addListener) mq.addListener(onSystem);

  PH.fillIcons();

  /* ---------- ® → certificado de registro de la marca ----------
     Cada ® junto al nombre (cabecera, pie, intro y línea legal) se convierte en enlace al PDF.
     Algunos están dentro del enlace del logo: el clic en la ® abre solo el certificado. */
  PH.linkTrademarks = (root = document) => {
    root.querySelectorAll('sup').forEach((sup) => {
      if (sup.textContent.trim() !== '®' || sup.querySelector('.tm')) return;
      const a = document.createElement('a');
      a.className = 'tm';
      a.href = PH.TRADEMARK_URL;
      a.target = '_blank';
      a.rel = 'noopener';
      a.textContent = '®';
      a.title = t('tm.label');
      a.setAttribute('aria-label', t('tm.label'));
      if (sup.closest('[aria-hidden="true"]')) a.tabIndex = -1;
      sup.textContent = '';
      sup.appendChild(a);
    });
  };
  PH.linkTrademarks();
  // que la ® no active el enlace del logo en el que está metida
  document.addEventListener('click', (e) => {
    const tm = e.target.closest('a.tm');
    if (!tm) return;
    e.stopPropagation();
    e.preventDefault();
    window.open(tm.href, '_blank', 'noopener');
  }, true);

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
