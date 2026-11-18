/* =========================================================
   Parrot's House — datos compartidos (edificios, pisos, lugares)
   Edita aquí precios, capacidades, direcciones y lugares.
   ========================================================= */
window.PH = window.PH || {};

PH.CONTACT = {
  phone: '+34 628 254 672',
  phoneRaw: '34628254672',
  email: 'parrotshouse.eu@gmail.com',
};

/* Edificios. mapGroup agrupa los que comparten ubicación en el mapa. */
PH.BUILDINGS = {
  breeze: {
    id: 'breeze', name: 'Breeze', kind: 'Aparthotel de playa',
    page: 'breeze.html', theme: 'breeze',
    tagline: 'Blanco, azul Egeo y la playa central a un paseo.',
    address: 'Carrer Emili Martínez, 8 · Lloret de Mar',
    lat: 41.69932, lng: 2.84826, mapGroup: 'centro-playa',
    perks: ['50 m de la playa central', 'Estilo griego', 'Wifi gratis', 'Cocina equipada'],
    cover: 'assets/img/apt/19/01.jpg',
  },
  pescadors: {
    id: 'pescadors', name: 'Pescadors', kind: 'Aparthotel',
    page: 'pescadors.html', theme: 'pescadors',
    tagline: 'Grises de lonja, blanco de cal y líneas limpias.',
    address: 'Centro de Lloret de Mar',
    lat: 41.69932, lng: 2.84826, mapGroup: 'centro-playa',
    perks: ['Junto a la playa central', 'Interiores en gris y blanco', 'Wifi gratis', 'Cocina equipada'],
    cover: 'assets/img/apt/16/01.jpg',
  },
  pareclaret: {
    id: 'pareclaret', name: 'Pare Claret', kind: 'Apartamentos en el centro',
    page: 'pare-claret.html', theme: 'pareclaret',
    tagline: 'Madera, terracota y terrazas al sol en pleno centro.',
    address: 'Carrer Pare Claret, 16 · Lloret de Mar',
    lat: 41.70285, lng: 2.8564, mapGroup: 'pareclaret',
    perks: ['Parking subterráneo', 'Terrazas', 'Centro de Lloret', 'Wifi gratis'],
    cover: 'assets/img/apt/2/01.jpg',
  },
  fenals: {
    id: 'fenals', name: 'Fenals', kind: 'Apartamentos con piscina',
    page: 'fenals.html', theme: 'fenals',
    tagline: 'Piscina, pinos y calma. Pensado para familias.',
    address: 'Av. Passapera, 1 · Fenals, Lloret de Mar',
    lat: 41.695985, lng: 2.829109, mapGroup: 'fenals',
    perks: ['Piscina comunitaria', 'Parking subterráneo', 'Zona tranquila', 'Ideal familias'],
    cover: 'assets/img/apt/15/01.jpg',
  },
};

/* Ubicaciones del mapa (3 puntos) */
PH.LOCATIONS = [
  { id: 'pareclaret', title: "Parrot's House Pare Claret", buildings: ['pareclaret'], lat: 41.70285, lng: 2.8564, address: 'Carrer Pare Claret, 16, 17310 Lloret de Mar' },
  { id: 'centro-playa', title: 'Aparthoteles Breeze & Pescadors', buildings: ['breeze', 'pescadors'], lat: 41.69932, lng: 2.84826, address: 'Carrer Emili Martínez, 8, 17310 Lloret de Mar' },
  { id: 'fenals', title: "Parrot's House Fenals", buildings: ['fenals'], lat: 41.695985, lng: 2.829109, address: 'Av. Passapera, 1, 17310 Lloret de Mar' },
];

/* Pisos. base = precio/noche en temporada baja (simulación). */
PH.APTS = [
  // Breeze
  { id: 19, b: 'breeze', name: 'Apartamento 2 hab.', code: '2H', m2: 59, beds: 2, cap: 4, base: 70,
    note: 'Dos dormitorios con cabeceros de ratán, salón con sofá azul y suelo hidráulico geométrico.', photos: 10 },
  { id: 18, b: 'breeze', name: 'Apartamento N1', code: 'N1', m2: 39, beds: 1, cap: 2, base: 50,
    note: 'Rayas arena y azul marino, sofá de terciopelo y cocina abierta con frente de azulejo azul.', photos: 9 },
  // Pescadors
  { id: 17, b: 'pescadors', name: 'Apartamento N2', code: 'N2', m2: 43, beds: 1, cap: 2, base: 50,
    note: 'Cocina negra mate, azulejo metro blanco y salón luminoso con balcón a la calle.', photos: 10 },
  { id: 16, b: 'pescadors', name: 'Apartamento N4', code: 'N4', m2: 43, beds: 1, cap: 2, base: 50,
    note: 'Papel pintado gris, mesa redonda y baño de líneas negras. Sobrio y muy práctico.', photos: 9 },
  // Pare Claret
  { id: 3, b: 'pareclaret', name: 'White Orchid', m2: 75, beds: 2, cap: 4, base: 60, swatch: '#f4efe6',
    note: 'El más amplio: dos dormitorios, salón con sofá cama y terraza con toldo.', photos: 10 },
  { id: 4, b: 'pareclaret', name: 'Beige Rose', m2: 63, beds: 1, cap: 2, base: 55, swatch: '#e7cdb8',
    note: 'Gran terraza naranja con sofá de exterior y dormitorio de madera maciza.', photos: 10 },
  { id: 7, b: 'pareclaret', name: 'Sunflower', m2: 57, beds: 1, cap: 3, base: 55, swatch: '#f2b632',
    note: 'Cálido y luminoso, con sofá cama para una tercera persona.', photos: 10 },
  { id: 8, b: 'pareclaret', name: 'Red Wine', m2: 57, beds: 1, cap: 3, base: 55, swatch: '#8e2b33',
    note: 'Tonos vino y madera, terraza y sofá cama para una tercera persona.', photos: 10 },
  { id: 2, b: 'pareclaret', name: 'Look Down', m2: 55, beds: 1, cap: 2, base: 50, swatch: '#b9a4b8',
    note: 'Terraza alta con vistas sobre los tejados de Lloret.', photos: 10 },
  { id: 5, b: 'pareclaret', name: 'Poppy Field', m2: 55, beds: 1, cap: 3, base: 50, swatch: '#d9442f',
    note: 'Inspirado en un campo de amapolas; sofá cama y terraza.', photos: 10 },
  { id: 6, b: 'pareclaret', name: 'Blue Lagoon', m2: 55, beds: 1, cap: 2, base: 50, swatch: '#58b3b6',
    note: 'Turquesas suaves, mesa de cristal y balcón corrido.', photos: 10 },
  { id: 10, b: 'pareclaret', name: 'Lotus', m2: 55, beds: 1, cap: 2, base: 50, swatch: '#e9a3b5',
    note: 'Sereno y cuidado, con cocina abierta y terraza.', photos: 10 },
  { id: 1, b: 'pareclaret', name: 'Magnolia', m2: 51, beds: 1, cap: 2, base: 50, swatch: '#efe0cf',
    note: 'Salón alargado con sofá tostado y terraza naranja.', photos: 10 },
  { id: 9, b: 'pareclaret', name: 'Sun Day', m2: 51, beds: 1, cap: 2, base: 50, swatch: '#f6d36b',
    note: 'Sillas de colores, sofá rojo y terraza con mesa de mimbre.', photos: 10 },
  // Fenals
  { id: 11, b: 'fenals', name: 'LUX 1', m2: 51, beds: 1, cap: 2, base: 65,
    note: 'Salón gris con chaise longue, cocina abierta y terraza con vistas a los pinos.', photos: 10 },
  { id: 15, b: 'fenals', name: 'LUX 2', m2: 51, beds: 1, cap: 2, base: 65,
    note: 'Sofá rojo, comedor nórdico y gran balcón sobre el jardín y la piscina.', photos: 10 },
];

PH.aptById = (id) => PH.APTS.find((a) => a.id === Number(id));
PH.aptsOf = (b) => PH.APTS.filter((a) => a.b === b);
PH.photo = (a, n, small) => `assets/img/apt/${a.id}/${String(n).padStart(2, '0')}${small ? '-s' : ''}.jpg`;

/* ---------- Precios y disponibilidad simulados ---------- */
PH.season = (d) => {
  const m = d.getMonth() + 1, day = d.getDate();
  if ((m === 12 && day >= 24) || (m === 1 && day <= 6)) return { k: 'Fiestas', f: 2.2 };
  if (m === 7 || m === 8) return { k: 'Alta', f: 2.4 };
  if (m === 6 || m === 9) return { k: 'Media-alta', f: 1.8 };
  if (m === 4 || m === 5 || m === 10) return { k: 'Media', f: 1.4 };
  return { k: 'Baja', f: 1 };
};
PH.nightPrice = (apt, d) => Math.round((apt.base * PH.season(d).f) / 5) * 5;
PH.CLEANING = 40;
PH.TOURIST_TAX = 1.1; // € por adulto y noche (orientativo)

/* Ocupación pseudoaleatoria y estable por piso y fecha */
PH.isBooked = (apt, d) => {
  const key = apt.id * 7919 + Math.floor(d.getTime() / 864e5);
  let x = Math.sin(key * 12.9898) * 43758.5453;
  x = x - Math.floor(x);
  // bloques de ocupación: usa también el día vecino para que parezcan estancias
  let y = Math.sin((key - 1) * 12.9898) * 43758.5453; y = y - Math.floor(y);
  return x < 0.16 || (x < 0.3 && y < 0.3);
};

/* ---------- Lugares de interés ---------- */
PH.PLACES = [
  // Playas
  { n: 'Platja de Lloret', c: 'playa', lat: 41.6983, lng: 2.8455, d: 'La playa central: arena gruesa, paseo marítimo y chiringuitos.' },
  { n: 'Sa Caleta', c: 'playa', lat: 41.6963, lng: 2.8503, d: 'Pequeña cala junto al castillo, con las barcas de los pescadores.' },
  { n: 'Cala Banys', c: 'playa', lat: 41.6950, lng: 2.8378, d: 'Rocas, agua transparente y buen snorkel a la salida del camino de ronda.' },
  { n: 'Platja de Fenals', c: 'playa', lat: 41.6930, lng: 2.8310, d: 'Playa amplia y tranquila, perfecta con niños.' },
  { n: 'Platja de Santa Cristina', c: 'playa', lat: 41.6838, lng: 2.8160, d: 'Arena dorada rodeada de pinos, junto a la ermita.' },
  // Monumentos
  { n: 'Església de Sant Romà', c: 'monumento', lat: 41.6998, lng: 2.8462, d: 'Iglesia gótica (1522) con cúpulas modernistas de cerámica.' },
  { n: 'Dona Marinera', c: 'monumento', lat: 41.6953, lng: 2.8520, d: 'La estatua de bronce que mira al mar desde el mirador.' },
  { n: "Castell d'en Plaja", c: 'monumento', lat: 41.6958, lng: 2.8529, d: 'El castillo neomedieval que corona el extremo de la playa.' },
  { n: 'Museu del Mar', c: 'monumento', lat: 41.6984, lng: 2.8478, d: 'La historia marinera de Lloret en una casa indiana del paseo.' },
  { n: 'Jardins de Santa Clotilde', c: 'monumento', lat: 41.6890, lng: 2.8225, d: 'Jardines novecentistas en terrazas sobre el acantilado.' },
  { n: 'Ermita de Santa Cristina', c: 'monumento', lat: 41.6845, lng: 2.8150, d: 'Santuario del s. XVIII y escenario de la procesión marítima de julio.' },
  // Restaurantes
  { n: 'Casa Marlès 1585', c: 'restaurante', lat: 41.6999, lng: 2.8458, d: 'Tapas, pasta y pizza en una plaza animada del centro.' },
  { n: 'Trattoria da Paolo', c: 'restaurante', lat: 41.6980, lng: 2.8448, d: 'Cocina italiana frente al mar con más de 20 años de historia.' },
  { n: 'Velamar', c: 'restaurante', lat: 41.6962, lng: 2.8522, d: 'Mediterráneo con vistas, al lado del Castell d’en Plaja.' },
  { n: 'Planiol', c: 'restaurante', lat: 41.6942, lng: 2.8322, d: 'Paellas y arroces en Fenals.' },
  { n: "L'Arrosseria de Fenals", c: 'restaurante', lat: 41.6940, lng: 2.8302, d: 'Arroces y pescado a pocos pasos de la arena.' },
  { n: 'Xaloc', c: 'restaurante', lat: 41.6948, lng: 2.8290, d: 'Cocina mediterránea en la zona de Fenals.' },
  // Bares y ocio
  { n: 'La Terrassa del Bella', c: 'bar', lat: 41.7000, lng: 2.8450, d: 'Terraza para tapear en el centro.' },
  { n: 'La Brava Street Food', c: 'bar', lat: 41.7003, lng: 2.8455, d: 'Hamburguesas y street food en pleno centro.' },
  { n: 'Punta Garbí', c: 'bar', lat: 41.6925, lng: 2.8318, d: 'Chiringuito sobre la arena de Fenals.' },
  { n: 'Casino Lloret de Mar', c: 'bar', lat: 41.6977, lng: 2.8410, d: 'Juego, cenas y espectáculos al final del paseo.' },
  // Actividades
  { n: 'Camí de Ronda Lloret–Fenals', c: 'actividad', lat: 41.6955, lng: 2.8395, d: 'Sendero costero entre calas, ideal al atardecer.' },
  { n: 'Water World', c: 'actividad', lat: 41.7160, lng: 2.8425, d: 'Parque acuático con toboganes para toda la familia.' },
  { n: "Estació d'autobusos", c: 'actividad', lat: 41.7036, lng: 2.8428, d: 'Buses a Barcelona, Girona y aeropuertos.' },
];

PH.CATS = {
  playa: { label: 'Playas', icon: 'wave' },
  monumento: { label: 'Monumentos', icon: 'tower' },
  restaurante: { label: 'Restaurantes', icon: 'fork' },
  bar: { label: 'Bares y ocio', icon: 'glass' },
  actividad: { label: 'Actividades', icon: 'route' },
};

/* Distancia real aproximada a pie (línea recta × 1.25) */
PH.walk = (a, b) => {
  const R = 6371000, toR = Math.PI / 180;
  const dLat = (b.lat - a.lat) * toR, dLng = (b.lng - a.lng) * toR;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * toR) * Math.cos(b.lat * toR) * Math.sin(dLng / 2) ** 2;
  const m = 2 * R * Math.asin(Math.sqrt(h)) * 1.25;
  return { m: Math.round(m / 10) * 10, min: Math.max(1, Math.round(m / 75)) };
};
PH.fmtDist = (m) => (m < 1000 ? `${m} m` : `${(m / 1000).toFixed(1).replace('.', ',')} km`);

/* Iconos SVG pequeños (trazo) */
PH.ICONS = {
  wave: '<path d="M2 15c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2M2 19c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2M12 4l4 6H8z"/>',
  tower: '<path d="M5 21V9l2-2V4h2v2h2V4h2v2h2V4h2v3l2 2v12M3 21h18M10 21v-4a2 2 0 0 1 4 0v4"/>',
  fork: '<path d="M7 3v8a2 2 0 0 0 2 2v8M5 3v5M9 3v5M17 3c-2 2-2.5 5-2.5 8H17v10"/>',
  glass: '<path d="M6 3h12l-1.5 8a4.5 4.5 0 0 1-9 0zM12 15.5V21M8 21h8M6.6 7h10.8"/>',
  route: '<circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="6" r="2.5"/><path d="M8.5 18H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.5"/>',
  parking: '<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M9.5 17V7h3.5a3 3 0 0 1 0 6H9.5"/>',
  wifi: '<path d="M2 9a15 15 0 0 1 20 0M5.5 12.5a10 10 0 0 1 13 0M9 16a5 5 0 0 1 6 0"/><circle cx="12" cy="19.5" r="1"/>',
  family: '<circle cx="7" cy="5" r="2.2"/><circle cx="17" cy="5" r="2.2"/><circle cx="12" cy="11" r="1.8"/><path d="M4 21v-7l-1-4h8l-1 4v7M14 21v-7l-1-4h8l-1 4v7M10.5 21v-4h3v4"/>',
  beach: '<path d="M3 21h18M12 21V9M4.5 9a7.5 7.5 0 0 1 15 0zM12 2v1"/>',
  plane: '<path d="M10 14l-7 2v-2l7-5V4a2 2 0 0 1 4 0v5l7 5v2l-7-2v4l2.5 2v1L12 21l-4.5 1v-1L10 18z"/>',
  nosmoke: '<circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8M7 13h7v3H7z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  crib: '<path d="M4 6v14M20 6v14M4 16h16M4 10h16M8 10v6M12 10v6M16 10v6"/>',
  towel: '<path d="M6 3h12v14a4 4 0 0 1-4 4H6zM6 8h12M10 13h4"/>',
  pool: '<path d="M2 18c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2M7 15V5a2 2 0 0 1 4 0M13 15V5a2 2 0 0 1 4 0M7 8h10M7 12h10"/>',
  kitchen: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M4 9h16M8 6h.01M11 6h.01M9 14h6"/>',
  tv: '<rect x="3" y="5" width="18" height="12" rx="2"/><path d="M8 21h8M12 17v4"/>',
  bed: '<path d="M3 19V6M3 14h18v5M21 14v-2a3 3 0 0 0-3-3h-7v5M7 11h.01"/>',
  users: '<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0M16 5.5a3 3 0 0 1 0 5M18 20a6 6 0 0 0-3-5.2"/>',
  size: '<path d="M4 4h6M4 4v6M20 20h-6M20 20v-6M4 4l16 16"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  car: '<path d="M5 17h14M3 17v-5l2.5-5h13L21 12v5M7 20v-3M17 20v-3"/><circle cx="7.5" cy="13.5" r="1"/><circle cx="16.5" cy="13.5" r="1"/>',
  bus: '<rect x="4" y="3" width="16" height="15" rx="3"/><path d="M4 11h16M8 21v-3M16 21v-3"/><circle cx="8" cy="14.5" r=".8"/><circle cx="16" cy="14.5" r=".8"/>',
  train: '<rect x="5" y="3" width="14" height="14" rx="3"/><path d="M5 10h14M8 21l2-4M16 21l-2-4"/>',
  phone: '<path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  star: '<path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  back: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  check: '<path d="M4 12l5 5L20 6"/>',
  card: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/>',
  lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  whatsapp: '<path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.6z"/><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 1c-1.2-.5-2.5-1.8-3-3l1-1-1-2z"/>',
};
PH.icon = (name, cls = '') =>
  `<svg class="ico ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${PH.ICONS[name] || ''}</svg>`;
