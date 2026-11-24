/**
 * Parrot's House — función de cobro (Cloudflare Worker)
 *
 * Crea una sesión de pago de Stripe Checkout con el importe EXACTO de la reserva.
 * El precio se recalcula aquí, nunca se fía de lo que mande el navegador.
 *
 * Rutas:
 *   POST /checkout   { apt, in, out, guests, email, name, lang, ref }  →  { url, total }
 *   GET  /estado?sesion=cs_...                                         →  { paid, total, email }
 *   GET  /                                                             →  comprobación de que funciona
 *
 * Secreto obligatorio (Cloudflare → la función → Settings → Variables and Secrets, tipo "Secret"):
 *   STRIPE_SECRET_KEY = sk_test_…
 * Mientras no exista la variable ALLOW_LIVE = "yes", la función se niega a usar claves reales (sk_live_…).
 */

// Web pública y orígenes que pueden llamar a la función
const SITE = 'https://tomaevmiron.github.io/parrot-s-house/';
const ALLOWED_ORIGINS = ['https://tomaevmiron.github.io', 'http://localhost:8765'];

// ⚠️ Mantener igual que assets/js/data.js (PH.APTS, PH.season, PH.CLEANING, PH.TOURIST_TAX).
// Precios de prueba: cuando el cobro pase por Beds24, los precios saldrán de allí.
const APTS = {
  18: { name: 'Apartamento N1', b: 'Breeze', cap: 2, base: 50 },
  17: { name: 'Apartamento N2', b: 'Breeze', cap: 2, base: 50 },
  16: { name: 'Apartamento N4', b: 'Breeze', cap: 2, base: 50 },
  19: { name: 'Apartamento 2 hab.', b: 'Breeze', cap: 4, base: 70 },
  3: { name: 'White Orchid', b: 'Pare Claret', cap: 4, base: 60 },
  4: { name: 'Beige Rose', b: 'Pare Claret', cap: 2, base: 55 },
  7: { name: 'Sunflower', b: 'Pare Claret', cap: 3, base: 55 },
  8: { name: 'Red Wine', b: 'Pare Claret', cap: 3, base: 55 },
  2: { name: 'Look Down', b: 'Pare Claret', cap: 2, base: 50 },
  5: { name: 'Poppy Field', b: 'Pare Claret', cap: 3, base: 50 },
  6: { name: 'Blue Lagoon', b: 'Pare Claret', cap: 2, base: 50 },
  10: { name: 'Lotus', b: 'Pare Claret', cap: 2, base: 50 },
  1: { name: 'Magnolia', b: 'Pare Claret', cap: 2, base: 50 },
  9: { name: 'Sun Day', b: 'Pare Claret', cap: 2, base: 50 },
  11: { name: 'LUX 1', b: 'Fenals', cap: 2, base: 65 },
  15: { name: 'LUX 2', b: 'Fenals', cap: 2, base: 65 },
};
const CLEANING = 40;          // € por estancia
const TOURIST_TAX = 1.1;      // € por persona y noche, máximo 7 noches
const MIN_NIGHTS = 2;
const MAX_NIGHTS = 31;        // más de 31 noches ya no es alquiler turístico
const LOCALES = ['es', 'en', 'fr', 'de', 'nl', 'it', 'pt', 'ru'];

// Temporadas (mismas reglas que la web). Fechas en UTC para no depender de la zona horaria.
function seasonFactor(d) {
  const m = d.getUTCMonth() + 1, day = d.getUTCDate();
  if ((m === 12 && day >= 24) || (m === 1 && day <= 6)) return 2.2;
  if (m === 7 || m === 8) return 2.4;
  if (m === 6 || m === 9) return 1.8;
  if (m === 4 || m === 5 || m === 10) return 1.4;
  return 1;
}
const nightPrice = (apt, d) => Math.round((apt.base * seasonFactor(d)) / 5) * 5;
const parseDay = (s) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s || '')) return null;
  const [y, m, d] = s.split('-').map(Number);
  const t = new Date(Date.UTC(y, m - 1, d));
  return t.getUTCFullYear() === y && t.getUTCMonth() === m - 1 && t.getUTCDate() === d ? t : null;
};
const DAY = 864e5;

/** Calcula el desglose de la reserva o devuelve { error } si los datos no son válidos. */
export function quote(input) {
  const apt = APTS[Number(input.apt)];
  if (!apt) return { error: 'apartamento' };
  const a = parseDay(input.in), b = parseDay(input.out);
  if (!a || !b) return { error: 'fechas' };
  const now = new Date();
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  if (a.getTime() < today - DAY) return { error: 'fecha_pasada' }; // margen de un día por zonas horarias
  const nights = Math.round((b.getTime() - a.getTime()) / DAY);
  if (nights < MIN_NIGHTS || nights > MAX_NIGHTS) return { error: 'noches' };
  const guests = Number(input.guests);
  if (!Number.isInteger(guests) || guests < 1 || guests > apt.cap) return { error: 'huespedes' };

  let stay = 0;
  for (let t = a.getTime(); t < b.getTime(); t += DAY) stay += nightPrice(apt, new Date(t));
  const tax = Math.round(TOURIST_TAX * Math.min(nights, 7) * guests * 100) / 100;
  return { apt, nights, guests, stay, cleaning: CLEANING, tax, total: Math.round((stay + CLEANING + tax) * 100) / 100 };
}

const cents = (eur) => Math.round(eur * 100);

function cors(origin) {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}
const json = (data, status, origin) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', ...(origin ? cors(origin) : {}) } });

function stripeKey(env) {
  const key = env.STRIPE_SECRET_KEY || '';
  if (!key) return { error: 'falta_clave' };
  if (key.startsWith('sk_live_') && env.ALLOW_LIVE !== 'yes') return { error: 'clave_real_bloqueada' };
  return { key };
}

async function stripe(env, method, path, params) {
  const { key, error } = stripeKey(env);
  if (error) return { ok: false, status: 500, data: { error } };
  const res = await fetch('https://api.stripe.com/v1/' + path, {
    method,
    headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params ? params.toString() : undefined,
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}

async function createCheckout(body, env, origin) {
  const q = quote(body);
  if (q.error) return json({ error: q.error }, 400, origin);

  const email = String(body.email || '').trim();
  const ref = String(body.ref || '');
  const lang = LOCALES.includes(body.lang) ? body.lang : 'auto';
  // Al volver de Stripe se regresa a la misma web desde la que se pagó
  const back = origin === 'http://localhost:8765' ? 'http://localhost:8765/' : SITE;

  const p = new URLSearchParams();
  p.append('mode', 'payment');
  p.append('success_url', back + '?pago=ok&sesion={CHECKOUT_SESSION_ID}');
  p.append('cancel_url', back + '?pago=cancelado');
  p.append('locale', lang);
  const line = (i, name, eur) => {
    p.append(`line_items[${i}][quantity]`, '1');
    p.append(`line_items[${i}][price_data][currency]`, 'eur');
    p.append(`line_items[${i}][price_data][unit_amount]`, String(cents(eur)));
    p.append(`line_items[${i}][price_data][product_data][name]`, name);
  };
  line(0, `${q.apt.name} · ${q.apt.b} — ${q.nights} noches (${body.in} → ${body.out})`, q.stay);
  line(1, 'Limpieza final', q.cleaning);
  if (q.tax > 0) line(2, `Tasa turística (${q.guests} pers. × ${Math.min(q.nights, 7)} noches)`, q.tax);
  if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) p.append('customer_email', email);
  if (/^[A-Za-z0-9_-]{1,200}$/.test(ref)) p.append('client_reference_id', ref);
  const meta = { apt: String(body.apt), entrada: body.in, salida: body.out, huespedes: String(q.guests), ref };
  for (const [k, v] of Object.entries(meta)) {
    p.append(`metadata[${k}]`, v);
    p.append(`payment_intent_data[metadata][${k}]`, v);
  }
  p.append('payment_intent_data[description]', `Parrot's House · ${q.apt.name} · ${body.in} → ${body.out} · ${ref}`);

  const r = await stripe(env, 'POST', 'checkout/sessions', p);
  if (!r.ok) {
    console.log('Stripe error', r.status, JSON.stringify(r.data && r.data.error ? r.data.error : r.data));
    return json({ error: r.data.error && typeof r.data.error === 'string' ? r.data.error : 'stripe' }, 502, origin);
  }
  return json({ url: r.data.url, total: q.total }, 200, origin);
}

async function sessionStatus(id, env, origin) {
  if (!/^cs_(test|live)_[A-Za-z0-9]{10,}$/.test(id || '')) return json({ error: 'sesion' }, 400, origin);
  const r = await stripe(env, 'GET', 'checkout/sessions/' + encodeURIComponent(id));
  if (!r.ok) return json({ error: 'stripe' }, 502, origin);
  return json({
    paid: r.data.payment_status === 'paid',
    total: (r.data.amount_total || 0) / 100,
    email: (r.data.customer_details && r.data.customer_details.email) || r.data.customer_email || '',
    ref: r.data.client_reference_id || '',
  }, 200, origin);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin') || '';
    const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : '';

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: allowed ? 204 : 403, headers: allowed ? cors(allowed) : {} });
    }
    if (request.method === 'GET' && url.pathname === '/') {
      return new Response("Parrot's House · pagos: funcionando", { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
    }
    if (!allowed) return json({ error: 'origen' }, 403, '');

    try {
      if (request.method === 'POST' && url.pathname === '/checkout') {
        const body = await request.json().catch(() => null);
        if (!body) return json({ error: 'datos' }, 400, allowed);
        return await createCheckout(body, env, allowed);
      }
      if (request.method === 'GET' && url.pathname === '/estado') {
        return await sessionStatus(url.searchParams.get('sesion'), env, allowed);
      }
      return json({ error: 'ruta' }, 404, allowed);
    } catch (err) {
      console.log('Error', err && err.stack ? err.stack : String(err));
      return json({ error: 'interno' }, 500, allowed);
    }
  },
};
