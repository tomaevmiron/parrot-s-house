/* Parrot's House — utilidades comunes a todas las páginas */
(function () {
  const PH = window.PH;

  PH.fillIcons = (root = document) => {
    root.querySelectorAll('i[data-ico]').forEach((i) => {
      i.outerHTML = PH.icon(i.dataset.ico);
    });
  };
  PH.fillIcons();

  // Cabecera: sombra al hacer scroll + menú móvil
  const header = document.getElementById('header');
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

  // Fechas
  PH.ymd = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  PH.parse = (s) => { const [a, b, c] = s.split('-').map(Number); return new Date(a, b - 1, c); };
  PH.addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
  PH.nights = (a, b) => Math.round((b - a) / 864e5);
  PH.fmtDate = (d, opts = { day: 'numeric', month: 'short' }) => d.toLocaleDateString('es-ES', opts);
  PH.eur = (n) => n.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
  PH.minPrice = (apts) => Math.min(...apts.map((a) => a.base));
})();
