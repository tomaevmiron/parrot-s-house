# Función de cobro de Parrot's House (Cloudflare Worker)

`worker.js` crea el pago de Stripe por el **importe exacto** de la reserva. Recalcula el precio por su cuenta, así que nadie puede trucarlo desde el navegador.

## Subirla (desde el panel web de Cloudflare, sin instalar nada)

1. Entra en Cloudflare y ve a **Workers & Pages → Create → Create Worker**.
2. Llámala `parrots-house-pagos` y pulsa **Deploy**.
3. Pulsa **Edit code**. Borra todo lo que hay, pega el contenido de `worker.js` y pulsa **Deploy**.
4. En **Settings → Variables and Secrets → Add**, crea un secreto:
   - **Type:** Secret
   - **Name:** `STRIPE_SECRET_KEY`
   - **Value:** la clave secreta de prueba de Stripe (`sk_test_…`)
5. Copia la dirección de la función (`https://parrots-house-pagos.<tu-subdominio>.workers.dev`) y ponla en `assets/js/data.js`, en `PH.PAY_API`.

## Seguridad

- La clave secreta **solo** va en el secreto de Cloudflare. Nunca en este repositorio, que es público.
- La función se niega a usar claves reales (`sk_live_…`) mientras no exista la variable `ALLOW_LIVE = yes`.
- Solo acepta peticiones de la web (`tomaevmiron.github.io`) y de la prueba local (`localhost:8765`). Si la web cambia de dominio, hay que añadirlo en `ALLOWED_ORIGINS`.
- Los precios están copiados de `assets/js/data.js`. Si cambian allí, hay que cambiarlos también aquí.

## Plan de Cloudflare

- El plan gratuito (100.000 peticiones al día) sobra para las pruebas.
- Para cobrar a clientes reales conviene **Workers Paid (5 $/mes)**: no tiene tope diario.
