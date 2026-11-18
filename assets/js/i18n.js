/* =========================================================
   Parrot's House — idiomas: es · en · fr · de · nl · ru · uk
   Cada entrada: [es, en, fr, de, nl, ru]. Plurales con "|":
   "singular|plural" (ru: "1|2-4|5+"). Variables: {n}, {name}…
   ========================================================= */
(function () {
  const PH = (window.PH = window.PH || {});
  const LANGS = ['es', 'en', 'fr', 'de', 'nl', 'ru', 'uk'];
  PH.LANGS = LANGS;
  PH.LANG_NAMES = { es: 'Español', en: 'English', fr: 'Français', de: 'Deutsch', nl: 'Nederlands', ru: 'Русский', uk: 'Українська' };
  PH.langLabel = (l) => (l === 'uk' ? 'UA' : l.toUpperCase());
  const LOCALES = { es: 'es-ES', en: 'en-GB', fr: 'fr-FR', de: 'de-DE', nl: 'nl-NL', ru: 'ru-RU', uk: 'uk-UA' };

  /* ---------- idioma activo: ?lang= > elegido antes > navegador > es ---------- */
  function detect() {
    try {
      const q = new URLSearchParams(location.search).get('lang');
      if (q && LANGS.includes(q)) { localStorage.setItem('ph_lang', q); return q; }
      const s = localStorage.getItem('ph_lang');
      if (s && LANGS.includes(s)) return s;
    } catch (e) {}
    const nav = (navigator.languages || [navigator.language || 'es']).map((l) => String(l).slice(0, 2).toLowerCase());
    return nav.find((l) => LANGS.includes(l)) || 'es';
  }
  const lang = detect();
  const L = LANGS.indexOf(lang);
  PH.lang = lang;
  PH.locale = LOCALES[lang];
  document.documentElement.lang = lang;
  if (lang === 'ru' || lang === 'uk') document.documentElement.classList.add('lang-cyr');

  const D = {
    /* --- meta --- */
    'meta.title': ["Parrot's House · Apartamentos en Lloret de Mar", "Parrot's House · Apartments in Lloret de Mar", "Parrot's House · Appartements à Lloret de Mar", "Parrot's House · Ferienwohnungen in Lloret de Mar", "Parrot's House · Appartementen in Lloret de Mar", "Parrot's House · Апартаменты в Льорет-де-Мар"],
    'meta.desc': ["Parrot's House: 16 apartamentos turísticos en Lloret de Mar, Costa Brava. Aparthotel Breeze junto a la playa, Pare Claret en el centro con parking y Fenals con piscina.", "Parrot's House: 16 holiday apartments in Lloret de Mar, Costa Brava. Aparthotel Breeze by the beach, Pare Claret in the centre with parking and Fenals with a pool.", "Parrot's House : 16 appartements de vacances à Lloret de Mar, Costa Brava. L'aparthotel Breeze près de la plage, Pare Claret au centre avec parking et Fenals avec piscine.", "Parrot's House: 16 Ferienwohnungen in Lloret de Mar, Costa Brava. Aparthotel Breeze am Strand, Pare Claret im Zentrum mit Parkplatz und Fenals mit Pool.", "Parrot's House: 16 vakantieappartementen in Lloret de Mar, Costa Brava. Aparthotel Breeze bij het strand, Pare Claret in het centrum met parkeergarage en Fenals met zwembad.", "Parrot's House: 16 апартаментов в Льорет-де-Мар, Коста-Брава. Апарт-отель Breeze у пляжа, Pare Claret в центре с парковкой и Fenals с бассейном."],

    /* --- cabecera / pie --- */
    'nav.home': ['Inicio', 'Home', 'Accueil', 'Start', 'Home', 'Главная'],
    'nav.apts': ['Apartamentos', 'Apartments', 'Appartements', 'Apartments', 'Appartementen', 'Апартаменты'],
    'nav.around': ['Alrededores', 'Surroundings', 'Alentours', 'Umgebung', 'Omgeving', 'Окрестности'],
    'nav.book': ['Reservar', 'Book', 'Réserver', 'Buchen', 'Boeken', 'Бронь'],
    'nav.reviews': ['Reseñas', 'Reviews', 'Avis', 'Bewertungen', 'Beoordelingen', 'Отзывы'],
    'nav.reach': ['Cómo llegar', 'Getting here', 'Accès', 'Anfahrt', 'Route', 'Как добраться'],
    'cta.bookNow': ['Reservar ahora', 'Book now', 'Réserver', 'Jetzt buchen', 'Nu boeken', 'Забронировать'],
    'cta.book': ['Reservar', 'Book', 'Réserver', 'Buchen', 'Boeken', 'Забронировать'],
    'aria.menu': ['Abrir menú', 'Open menu', 'Ouvrir le menu', 'Menü öffnen', 'Menu openen', 'Открыть меню'],
    'aria.wa': ['Escríbenos por WhatsApp', 'Message us on WhatsApp', 'Écrivez-nous sur WhatsApp', 'Schreiben Sie uns auf WhatsApp', 'Stuur ons een WhatsApp', 'Напишите нам в WhatsApp'],
    'aria.lang': ['Idioma', 'Language', 'Langue', 'Sprache', 'Taal', 'Язык'],
    'aria.home': ["Parrot's House, inicio", "Parrot's House, home", "Parrot's House, accueil", "Parrot's House, Startseite", "Parrot's House, home", "Parrot's House, главная"],
    'aria.backHome': ["Parrot's House, volver al inicio", "Parrot's House, back to home", "Parrot's House, retour à l'accueil", "Parrot's House, zurück zur Startseite", "Parrot's House, terug naar home", "Parrot's House, на главную"],
    'alt.logo': ["Logo de Parrot's House", "Parrot's House logo", "Logo Parrot's House", "Parrot's-House-Logo", "Logo van Parrot's House", "Логотип Parrot's House"],
    'skip': ['Saltar', 'Skip', 'Passer', 'Überspringen', 'Overslaan', 'Пропустить'],
    'foot.about': ['Apartamentos turísticos en Lloret de Mar, Costa Brava.', 'Holiday apartments in Lloret de Mar, Costa Brava.', 'Appartements de vacances à Lloret de Mar, Costa Brava.', 'Ferienwohnungen in Lloret de Mar an der Costa Brava.', 'Vakantieappartementen in Lloret de Mar, Costa Brava.', 'Апартаменты для отдыха в Льорет-де-Мар, Коста-Брава.'],
    'foot.buildings': ['Edificios', 'Buildings', 'Résidences', 'Häuser', 'Gebouwen', 'Здания'],
    'foot.addresses': ['Direcciones', 'Addresses', 'Adresses', 'Adressen', 'Adressen', 'Адреса'],
    'foot.contact': ['Contacto', 'Contact', 'Contact', 'Kontakt', 'Contact', 'Контакты'],
    'foot.legal': ['Nombre y logotipo son marcas registradas.', 'Name and logo are registered trademarks.', 'Le nom et le logo sont des marques déposées.', 'Name und Logo sind eingetragene Marken.', 'Naam en logo zijn geregistreerde handelsmerken.', 'Название и логотип — зарегистрированные товарные знаки.'],
    'b.breeze.full': ['Aparthotel Breeze', 'Aparthotel Breeze', 'Aparthotel Breeze', 'Aparthotel Breeze', 'Aparthotel Breeze', 'Апарт-отель Breeze'],

    /* --- intro / hero --- */
    'hero.title': ['Tu nido en la <em>Costa&nbsp;Brava</em>', 'Your nest on the <em>Costa&nbsp;Brava</em>', 'Votre nid sur la <em>Costa&nbsp;Brava</em>', 'Ihr Nest an der <em>Costa&nbsp;Brava</em>', 'Jouw nest aan de <em>Costa&nbsp;Brava</em>', 'Ваше гнёздышко на <em>Коста-Брава</em>'],
    'hero.lead': [
      '16 apartamentos en tres puntos de Lloret de Mar: un aparthotel de estilo griego a pasos de la playa central, un edificio con parking en pleno centro y dos apartamentos con piscina en la tranquila Fenals. A 45 minutos del aeropuerto de Barcelona y 20 del de Girona.',
      '16 apartments in three spots across Lloret de Mar: a Greek-style aparthotel steps from the main beach, a building with parking right in the centre and two apartments with a pool in peaceful Fenals. 45 minutes from Barcelona airport and 20 from Girona.',
      "16 appartements répartis en trois lieux de Lloret de Mar : un aparthotel de style grec à deux pas de la plage principale, un immeuble avec parking en plein centre et deux appartements avec piscine dans le paisible quartier de Fenals. À 45 minutes de l'aéroport de Barcelone et à 20 de celui de Gérone.",
      '16 Apartments an drei Orten in Lloret de Mar: ein Aparthotel im griechischen Stil nur wenige Schritte vom Hauptstrand, ein Haus mit Parkplatz mitten im Zentrum und zwei Apartments mit Pool im ruhigen Fenals. 45 Minuten vom Flughafen Barcelona und 20 vom Flughafen Girona entfernt.',
      '16 appartementen op drie plekken in Lloret de Mar: een aparthotel in Griekse stijl op een paar stappen van het hoofdstrand, een gebouw met parkeergarage midden in het centrum en twee appartementen met zwembad in het rustige Fenals. Op 45 minuten van de luchthaven van Barcelona en 20 van die van Girona.',
      '16 апартаментов в трёх районах Льорет-де-Мар: апарт-отель в греческом стиле в двух шагах от центрального пляжа, дом с парковкой в самом центре и два апартамента с бассейном в тихом районе Феналс. 45 минут от аэропорта Барселоны и 20 — от аэропорта Жироны.'],
    'hero.cta1': ['Elegir apartamento', 'Choose an apartment', 'Choisir un appartement', 'Apartment wählen', 'Kies een appartement', 'Выбрать апартаменты'],
    'hero.cta2': ['Qué hay cerca', "What's nearby", 'À proximité', 'In der Nähe', 'Wat is er in de buurt', 'Что рядом'],
    'fact.apts': ['apartamentos', 'apartments', 'appartements', 'Apartments', 'appartementen', 'апартаментов'],
    'fact.locs': ['ubicaciones', 'locations', 'adresses', 'Standorte', 'locaties', 'адреса'],
    'fact.beach': ['de la playa central', 'from the main beach', 'de la plage principale', 'zum Hauptstrand', 'van het hoofdstrand', 'до центрального пляжа'],
    'fact.care': ['atención al huésped', 'guest support', 'assistance aux hôtes', 'Gästeservice', 'gastenservice', 'поддержка гостей'],
    'alt.heroMain': ['Vista aérea de la bahía de Lloret de Mar', 'Aerial view of Lloret de Mar bay', 'Vue aérienne de la baie de Lloret de Mar', 'Luftaufnahme der Bucht von Lloret de Mar', 'Luchtfoto van de baai van Lloret de Mar', 'Вид с воздуха на бухту Льорет-де-Мар'],
    'alt.heroSmall': ['Salón de un apartamento del aparthotel Breeze', 'Living room of an apartment at Aparthotel Breeze', "Salon d'un appartement de l'aparthotel Breeze", 'Wohnzimmer eines Apartments im Aparthotel Breeze', 'Woonkamer van een appartement in Aparthotel Breeze', 'Гостиная в апарт-отеле Breeze'],

    /* --- buscador rápido --- */
    'q.building': ['Edificio', 'Building', 'Résidence', 'Haus', 'Gebouw', 'Здание'],
    'q.any': ['Cualquiera', 'Any', 'Toutes', 'Alle', 'Alle', 'Любое'],
    'q.opt.breeze': ['Breeze · playa', 'Breeze · beach', 'Breeze · plage', 'Breeze · Strand', 'Breeze · strand', 'Breeze · пляж'],
    'q.opt.pareclaret': ['Pare Claret · centro', 'Pare Claret · centre', 'Pare Claret · centre', 'Pare Claret · Zentrum', 'Pare Claret · centrum', 'Pare Claret · центр'],
    'q.opt.fenals': ['Fenals · piscina', 'Fenals · pool', 'Fenals · piscine', 'Fenals · Pool', 'Fenals · zwembad', 'Fenals · бассейн'],
    'q.in': ['Llegada', 'Check-in', 'Arrivée', 'Anreise', 'Aankomst', 'Заезд'],
    'q.out': ['Salida', 'Check-out', 'Départ', 'Abreise', 'Vertrek', 'Выезд'],
    'q.guests': ['Huéspedes', 'Guests', 'Voyageurs', 'Gäste', 'Gasten', 'Гости'],
    'q.go': ['Ver disponibilidad', 'Check availability', 'Voir les disponibilités', 'Verfügbarkeit prüfen', 'Beschikbaarheid bekijken', 'Проверить наличие'],

    /* --- servicios --- */
    'perks.title': ['Servicios incluidos', 'Included services', 'Services inclus', 'Inklusivleistungen', 'Inbegrepen diensten', 'Включённые услуги'],
    'perk.beach': ['Playa a pocos pasos', 'Beach just steps away', 'Plage à deux pas', 'Strand nur wenige Schritte entfernt', 'Strand op een paar stappen', 'Пляж в двух шагах'],
    'perk.parking': ['Parking gratuito', 'Free parking', 'Parking gratuit', 'Kostenloser Parkplatz', 'Gratis parkeren', 'Бесплатная парковка'],
    'perk.wifi': ['Wifi gratis', 'Free Wi-Fi', 'Wi-Fi gratuit', 'Kostenloses WLAN', 'Gratis wifi', 'Бесплатный Wi-Fi'],
    'perk.family': ['Ideal familias', 'Great for families', 'Idéal pour les familles', 'Ideal für Familien', 'Ideaal voor gezinnen', 'Идеально для семей'],
    'perk.transfer': ['Traslado aeropuerto', 'Airport transfer', 'Transfert aéroport', 'Flughafentransfer', 'Luchthaventransfer', 'Трансфер из аэропорта'],
    'perk.247': ['Atención 24/7', '24/7 support', 'Assistance 24h/24', 'Rund um die Uhr erreichbar', '24/7 bereikbaar', 'Поддержка 24/7'],
    'perk.crib': ['Cuna y silla de lactancia gratis', 'Free cot and nursing chair', "Lit bébé et fauteuil d'allaitement gratuits", 'Kinderbett und Stillstuhl gratis', 'Gratis babybedje en voedingsstoel', 'Бесплатная кроватка и кресло для кормления'],
    'perk.linen': ['Ropa de cama y toallas', 'Bed linen and towels', 'Linge de lit et serviettes', 'Bettwäsche und Handtücher', 'Beddengoed en handdoeken', 'Постельное бельё и полотенца'],
    'perk.nosmoke': ['Apartamentos sin humo', 'Non-smoking apartments', 'Appartements non-fumeurs', 'Nichtraucher-Apartments', 'Rookvrije appartementen', 'Апартаменты для некурящих'],

    /* --- edificios (home) --- */
    'sec.apts.title': ['Elige dónde posarte', 'Choose where to perch', 'Choisissez où vous poser', 'Wählen Sie Ihren Landeplatz', 'Kies waar je neerstrijkt', 'Выберите, где приземлиться'],
    'sec.apts.lead': ['Tres casas, tres caracteres. Cada edificio tiene su propio estilo: entra en el que más te guste y elige el piso que prefieras dentro.', 'Three houses, three personalities. Each building has its own style: step into the one you like best and pick your apartment inside.', 'Trois maisons, trois caractères. Chaque résidence a son propre style : entrez dans celle qui vous plaît et choisissez votre appartement.', 'Drei Häuser, drei Charaktere. Jedes Haus hat seinen eigenen Stil: Treten Sie ein und wählen Sie Ihr Apartment.', 'Drie huizen, drie karakters. Elk gebouw heeft een eigen stijl: stap binnen in je favoriet en kies daar je appartement.', 'Три дома — три характера. У каждого здания свой стиль: зайдите в понравившееся и выберите апартаменты.'],
    'card.see': ['Ver pisos', 'See apartments', 'Voir les appartements', 'Apartments ansehen', 'Bekijk appartementen', 'Смотреть апартаменты'],

    /* --- unidades y plurales --- */
    'u.flats': ['piso|pisos', 'apartment|apartments', 'appartement|appartements', 'Apartment|Apartments', 'appartement|appartementen', 'апартамент|апартамента|апартаментов'],
    'u.nights': ['noche|noches', 'night|nights', 'nuit|nuits', 'Nacht|Nächte', 'nacht|nachten', 'ночь|ночи|ночей'],
    'u.bedrooms': ['hab.|hab.', 'bedroom|bedrooms', 'chambre|chambres', 'Schlafzimmer|Schlafzimmer', 'slaapkamer|slaapkamers', 'спальня|спальни|спален'],
    'u.from': ['desde', 'from', 'dès', 'ab', 'vanaf', 'от'],
    'u.perNight': ['/noche', '/night', '/nuit', '/Nacht', '/nacht', '/ночь'],
    'u.upTo': ['hasta {n}', 'sleeps {n}', "jusqu'à {n} pers.", 'bis {n} Pers.', 'max. {n} pers.', 'до {n} гостей'],
    'u.upToGuests': ['hasta {n} huéspedes', 'sleeps {n}', "jusqu'à {n} voyageurs", 'bis zu {n} Gäste', 'tot {n} gasten', 'до {n} гостей'],
    'u.min': ['min', 'min', 'min', 'Min.', 'min', 'мин'],
    'u.onFoot': ['{d} a pie', '{d} on foot', '{d} à pied', '{d} zu Fuß', '{d} lopen', '{d} пешком'],
    'apt.word': ['Apartamento', 'Apartment', 'Appartement', 'Apartment', 'Appartement', 'Апартаменты'],
    'apt.2bed': ['Apartamento 2 hab.', 'Two-bedroom apartment', 'Appartement 2 chambres', 'Apartment mit 2 Schlafzimmern', 'Appartement met 2 slaapkamers', 'Апартаменты с 2 спальнями'],

    /* --- alrededores --- */
    'sec.around.title': ['Lloret, a vuelo de loro', "Lloret from a parrot's-eye view", 'Lloret à vol de perroquet', 'Lloret aus der Papageienperspektive', 'Lloret in vogelvlucht', 'Льорет с высоты птичьего полёта'],
    'sec.around.lead': ['Playas, monumentos, restaurantes y planes, con la distancia a pie desde tu apartamento. Elige desde dónde sales.', "Beaches, landmarks, restaurants and things to do, with walking distances from your apartment. Choose where you're starting from.", 'Plages, monuments, restaurants et sorties, avec la distance à pied depuis votre appartement. Choisissez votre point de départ.', 'Strände, Sehenswürdigkeiten, Restaurants und Ausflüge – mit Fußweg ab Ihrem Apartment. Wählen Sie Ihren Ausgangspunkt.', 'Stranden, bezienswaardigheden, restaurants en uitjes, met de loopafstand vanaf je appartement. Kies je vertrekpunt.', 'Пляжи, достопримечательности, рестораны и развлечения — с расстоянием пешком от ваших апартаментов. Выберите, откуда отправляетесь.'],
    'aria.origin': ['Salgo desde', 'Starting from', 'Je pars de', 'Ich starte von', 'Ik vertrek vanaf', 'Отправляюсь из'],
    'aria.cats': ['Filtrar por tipo', 'Filter by type', 'Filtrer par type', 'Nach Art filtern', 'Filteren op type', 'Фильтр по типу'],
    'origin.centro': ['Centro', 'Centre', 'Centre', 'Zentrum', 'Centrum', 'Центр'],
    'origin.playa': ['Playa', 'Beach', 'Plage', 'Strand', 'Strand', 'Пляж'],
    'origin.piscina': ['Piscina', 'Pool', 'Piscine', 'Pool', 'Zwembad', 'Бассейн'],
    'key.beach': ['Playa más cercana', 'Nearest beach', 'Plage la plus proche', 'Nächster Strand', 'Dichtstbijzijnde strand', 'Ближайший пляж'],
    'key.church': ['Iglesia de Sant Romà', 'Sant Romà Church', 'Église Sant Romà', 'Kirche Sant Romà', 'Kerk van Sant Romà', 'Церковь Сант-Рома'],
    'key.bus': ['Estación de autobuses', 'Bus station', 'Gare routière', 'Busbahnhof', 'Busstation', 'Автовокзал'],
    'cat.all': ['Todo', 'All', 'Tout', 'Alle', 'Alles', 'Все'],
    'cat.playa': ['Playas', 'Beaches', 'Plages', 'Strände', 'Stranden', 'Пляжи'],
    'cat.monumento': ['Monumentos', 'Landmarks', 'Monuments', 'Sehenswürdigkeiten', 'Bezienswaardigheden', 'Достопримечательности'],
    'cat.restaurante': ['Restaurantes', 'Restaurants', 'Restaurants', 'Restaurants', 'Restaurants', 'Рестораны'],
    'cat.bar': ['Bares y ocio', 'Bars & nightlife', 'Bars et sorties', 'Bars & Ausgehen', 'Bars & uitgaan', 'Бары и досуг'],
    'cat.actividad': ['Actividades', 'Activities', 'Activités', 'Aktivitäten', 'Activiteiten', 'Развлечения'],
    'cat1.playa': ['Playa', 'Beach', 'Plage', 'Strand', 'Strand', 'Пляж'],
    'cat1.monumento': ['Monumento', 'Landmark', 'Monument', 'Sehenswürdigkeit', 'Bezienswaardigheid', 'Достопримечательность'],
    'cat1.restaurante': ['Restaurante', 'Restaurant', 'Restaurant', 'Restaurant', 'Restaurant', 'Ресторан'],
    'cat1.bar': ['Ocio', 'Nightlife', 'Sortie', 'Ausgehen', 'Uitgaan', 'Досуг'],
    'cat1.actividad': ['Actividad', 'Activity', 'Activité', 'Aktivität', 'Activiteit', 'Развлечение'],
    'around.fine': ['Distancias aproximadas a pie calculadas desde la dirección de cada edificio.', "Approximate walking distances calculated from each building's address.", 'Distances à pied approximatives, calculées depuis l’adresse de chaque résidence.', 'Ungefähre Fußwege, berechnet ab der Adresse jedes Hauses.', 'Geschatte loopafstanden vanaf het adres van elk gebouw.', 'Примерное расстояние пешком от адреса каждого здания.'],
    'cap.all': ["La playa de Lloret y el Castell d'en Plaja", "Lloret beach and the Castell d'en Plaja", "La plage de Lloret et le Castell d'en Plaja", "Der Strand von Lloret und das Castell d'en Plaja", "Het strand van Lloret en het Castell d'en Plaja", 'Пляж Льорета и замок Кастель-д’эн-Пладжа'],
    'cap.playa': ['Arena y agua clara en la bahía de Lloret', 'Sand and clear water in Lloret bay', 'Sable et eau claire dans la baie de Lloret', 'Sand und klares Wasser in der Bucht von Lloret', 'Zand en helder water in de baai van Lloret', 'Песок и прозрачная вода в бухте Льорета'],
    'cap.monumento': ["El Castell d'en Plaja sobre el mar", "The Castell d'en Plaja above the sea", "Le Castell d'en Plaja au-dessus de la mer", "Das Castell d'en Plaja über dem Meer", "Het Castell d'en Plaja boven de zee", 'Замок Кастель-д’эн-Пладжа над морем'],
    'cap.restaurante': ['Arroces y paellas frente al mar', 'Rice dishes and paella by the sea', 'Riz et paellas face à la mer', 'Reisgerichte und Paella am Meer', 'Rijstgerechten en paella aan zee', 'Рис и паэлья у моря'],
    'cap.bar': ['Tapas y cócteles en terraza', 'Tapas and cocktails on a terrace', 'Tapas et cocktails en terrasse', 'Tapas und Cocktails auf der Terrasse', 'Tapas en cocktails op een terras', 'Тапас и коктейли на террасе'],
    'cap.actividad': ['El camí de ronda entre calas', 'The coastal path between coves', 'Le sentier côtier entre les criques', 'Der Küstenweg zwischen den Buchten', 'Het kustpad tussen de baaien', 'Прибрежная тропа между бухтами'],
    'tips.title': ['Consejo de la casa', 'House tip', 'Le conseil de la maison', 'Unser Tipp', 'Tip van het huis', 'Совет от хозяев'],
    'tips.text': ['Recorre el camino de ronda desde Sa Caleta hasta Fenals al atardecer: calas, pinos y la Dona Marinera mirando al mar.', 'Walk the coastal path from Sa Caleta to Fenals at sunset: coves, pine trees and the Dona Marinera gazing out to sea.', 'Parcourez le sentier côtier de Sa Caleta à Fenals au coucher du soleil : criques, pins et la Dona Marinera qui regarde la mer.', 'Gehen Sie bei Sonnenuntergang den Küstenweg von Sa Caleta nach Fenals: Buchten, Pinien und die Dona Marinera mit Blick aufs Meer.', 'Loop bij zonsondergang het kustpad van Sa Caleta naar Fenals: baaien, dennen en de Dona Marinera die over zee uitkijkt.', 'Пройдите на закате по прибрежной тропе от Са-Калеты до Феналса: бухты, сосны и «Дона Маринера», смотрящая на море.'],

    /* --- reserva --- */
    'sec.book.plume': ['Reserva y pago', 'Booking & payment', 'Réservation et paiement', 'Buchung & Zahlung', 'Boeken & betalen', 'Бронирование и оплата'],
    'sec.book.title': ['Reserva tu nido', 'Book your nest', 'Réservez votre nid', 'Buchen Sie Ihr Nest', 'Boek je nest', 'Забронируйте гнёздышко'],
    'sec.book.lead': ['Tres pasos y listo. Precio final sin sorpresas: ves el desglose antes de pagar.', "Three steps and you're done. Final price with no surprises: you see the breakdown before paying.", "Trois étapes et c'est fait. Prix final sans surprise : vous voyez le détail avant de payer.", 'Drei Schritte, fertig. Endpreis ohne Überraschungen: Sie sehen die Aufschlüsselung vor dem Bezahlen.', 'Drie stappen en klaar. Eindprijs zonder verrassingen: je ziet de opbouw vóór het betalen.', 'Три шага — и готово. Итоговая цена без сюрпризов: вы видите расчёт до оплаты.'],
    'step1': ['Apartamento', 'Apartment', 'Appartement', 'Apartment', 'Appartement', 'Апартаменты'],
    'step2': ['Fechas', 'Dates', 'Dates', 'Daten', 'Data', 'Даты'],
    'step3': ['Datos y pago', 'Details & payment', 'Coordonnées et paiement', 'Daten & Zahlung', 'Gegevens & betaling', 'Данные и оплата'],
    'bk.all': ['Todos', 'All', 'Toutes', 'Alle', 'Alle', 'Все'],
    'aria.lessGuests': ['Menos huéspedes', 'Fewer guests', 'Moins de voyageurs', 'Weniger Gäste', 'Minder gasten', 'Меньше гостей'],
    'aria.moreGuests': ['Más huéspedes', 'More guests', 'Plus de voyageurs', 'Mehr Gäste', 'Meer gasten', 'Больше гостей'],
    'av.ok': ['Libre en tus fechas', 'Available on your dates', 'Disponible à vos dates', 'An Ihren Daten frei', 'Vrij op jouw data', 'Свободно в ваши даты'],
    'av.no': ['Ocupado en tus fechas', 'Booked on your dates', 'Occupé à vos dates', 'An Ihren Daten belegt', 'Bezet op jouw data', 'Занято в ваши даты'],
    'av.max': ['Máx. {n} huéspedes', 'Max. {n} guests', 'Max. {n} voyageurs', 'Max. {n} Gäste', 'Max. {n} gasten', 'Макс. {n} гостя'],
    'aria.prevMonth': ['Mes anterior', 'Previous month', 'Mois précédent', 'Vorheriger Monat', 'Vorige maand', 'Предыдущий месяц'],
    'aria.nextMonth': ['Mes siguiente', 'Next month', 'Mois suivant', 'Nächster Monat', 'Volgende maand', 'Следующий месяц'],
    'cal.pickIn': ['Elige el día de llegada', 'Choose your arrival date', "Choisissez la date d'arrivée", 'Wählen Sie den Anreisetag', 'Kies je aankomstdatum', 'Выберите дату заезда'],
    'cal.pickOut': ['Llegada el {d} · ahora elige la salida (mín. {n} noches)', 'Arrival {d} · now choose departure (min. {n} nights)', 'Arrivée le {d} · choisissez le départ (min. {n} nuits)', 'Anreise am {d} · jetzt Abreise wählen (mind. {n} Nächte)', 'Aankomst {d} · kies nu je vertrek (min. {n} nachten)', 'Заезд {d} · теперь выберите выезд (мин. {n} ночи)'],
    'cal.min': ['La estancia mínima es de {n} noches', 'Minimum stay is {n} nights', 'Séjour minimum de {n} nuits', 'Mindestaufenthalt {n} Nächte', 'Minimaal verblijf is {n} nachten', 'Минимальный срок проживания — {n} ночи'],
    'cal.busy': ['ocupado', 'booked', 'occupé', 'belegt', 'bezet', 'занято'],
    'leg.free': ['Libre', 'Available', 'Libre', 'Frei', 'Vrij', 'Свободно'],
    'leg.busy': ['Ocupado', 'Booked', 'Occupé', 'Belegt', 'Bezet', 'Занято'],
    'leg.sel': ['Tu estancia', 'Your stay', 'Votre séjour', 'Ihr Aufenthalt', 'Jouw verblijf', 'Ваше проживание'],
    'bk.change': ['Cambiar piso', 'Change apartment', "Changer d'appartement", 'Apartment ändern', 'Ander appartement', 'Сменить апартаменты'],
    'bk.continue': ['Continuar', 'Continue', 'Continuer', 'Weiter', 'Verder', 'Далее'],
    'f.data': ['Tus datos', 'Your details', 'Vos coordonnées', 'Ihre Daten', 'Jouw gegevens', 'Ваши данные'],
    'f.name': ['Nombre y apellidos', 'Full name', 'Nom et prénom', 'Vor- und Nachname', 'Voor- en achternaam', 'Имя и фамилия'],
    'f.email': ['Email', 'Email', 'E-mail', 'E-Mail', 'E-mail', 'Эл. почта'],
    'f.tel': ['Teléfono', 'Phone', 'Téléphone', 'Telefon', 'Telefoon', 'Телефон'],
    'f.eta': ['Hora de llegada aprox.', 'Approx. arrival time', "Heure d'arrivée approx.", 'Ungefähre Ankunftszeit', 'Verwachte aankomsttijd', 'Примерное время прибытия'],
    'f.after22': ['Después de las 22:00', 'After 22:00', 'Après 22h00', 'Nach 22:00 Uhr', 'Na 22:00', 'После 22:00'],
    'f.notes': ['Peticiones (opcional)', 'Requests (optional)', 'Demandes (facultatif)', 'Wünsche (optional)', 'Verzoeken (optioneel)', 'Пожелания (необязательно)'],
    'f.notesPh': ['Cuna, trona, traslado desde el aeropuerto…', 'Cot, high chair, airport transfer…', 'Lit bébé, chaise haute, transfert aéroport…', 'Kinderbett, Hochstuhl, Flughafentransfer…', 'Babybedje, kinderstoel, luchthaventransfer…', 'Кроватка, детский стульчик, трансфер из аэропорта…'],
    'f.pay': ['Forma de pago', 'Payment method', 'Mode de paiement', 'Zahlungsart', 'Betaalmethode', 'Способ оплаты'],
    'pm.card': ['Tarjeta', 'Card', 'Carte', 'Karte', 'Kaart', 'Карта'],
    'pm.arrival': ['Pagar al llegar', 'Pay on arrival', "Payer à l'arrivée", 'Bei Ankunft zahlen', 'Betalen bij aankomst', 'Оплата при заезде'],
    'cv.name': ['TU NOMBRE', 'YOUR NAME', 'VOTRE NOM', 'IHR NAME', 'JOUW NAAM', 'ВАШЕ ИМЯ'],
    'cv.exp': ['MM/AA', 'MM/YY', 'MM/AA', 'MM/JJ', 'MM/JJ', 'ММ/ГГ'],
    'f.cc': ['Número de tarjeta', 'Card number', 'Numéro de carte', 'Kartennummer', 'Kaartnummer', 'Номер карты'],
    'f.exp': ['Caducidad', 'Expiry', 'Expiration', 'Gültig bis', 'Vervaldatum', 'Срок действия'],
    'pm.bizumText': ['Te enviaremos una solicitud de pago Bizum al teléfono indicado al confirmar.', "We'll send a Bizum payment request to your phone when you confirm.", 'Nous enverrons une demande de paiement Bizum à votre téléphone lors de la confirmation.', 'Bei Bestätigung senden wir eine Bizum-Zahlungsanfrage an Ihr Telefon.', 'We sturen een Bizum-betaalverzoek naar je telefoon zodra je bevestigt.', 'После подтверждения мы отправим запрос на оплату Bizum на указанный телефон.'],
    'pm.arrivalText': ['Pagas el total al llegar, en efectivo o con tarjeta. Guardamos tu reserva 48 h sin cargo.', 'You pay the full amount on arrival, in cash or by card. We hold your booking for 48 h free of charge.', 'Vous payez le total à l’arrivée, en espèces ou par carte. Nous gardons votre réservation 48 h sans frais.', 'Sie zahlen den Gesamtbetrag bei Ankunft, bar oder mit Karte. Wir halten Ihre Buchung 48 Std. kostenlos.', 'Je betaalt het totaal bij aankomst, contant of met kaart. We houden je boeking 48 uur gratis vast.', 'Вы оплачиваете всю сумму при заезде наличными или картой. Мы бесплатно держим бронь 48 часов.'],
    'f.terms': ['Acepto las condiciones de reserva y la política de cancelación.', 'I accept the booking terms and the cancellation policy.', "J'accepte les conditions de réservation et la politique d'annulation.", 'Ich akzeptiere die Buchungs- und Stornierungsbedingungen.', 'Ik ga akkoord met de boekingsvoorwaarden en het annuleringsbeleid.', 'Я принимаю условия бронирования и правила отмены.'],
    'f.sim': ['Simulación de pago: no se realiza ningún cargo real.', 'Payment simulation: no real charge is made.', "Paiement simulé : aucun débit réel n'est effectué.", 'Zahlungssimulation: Es wird nichts belastet.', 'Betaalsimulatie: er wordt niets afgeschreven.', 'Симуляция оплаты: реальное списание не производится.'],
    'bk.payBtn': ['Confirmar y pagar', 'Confirm and pay', 'Confirmer et payer', 'Bestätigen und bezahlen', 'Bevestigen en betalen', 'Подтвердить и оплатить'],
    'bk.confirmBtn': ['Confirmar reserva', 'Confirm booking', 'Confirmer la réservation', 'Buchung bestätigen', 'Boeking bevestigen', 'Подтвердить бронь'],
    'bk.processing': ['Procesando…', 'Processing…', 'Traitement…', 'Wird verarbeitet…', 'Bezig…', 'Обработка…'],
    'done.title': ['¡Reserva confirmada!', 'Booking confirmed!', 'Réservation confirmée !', 'Buchung bestätigt!', 'Boeking bevestigd!', 'Бронирование подтверждено!'],
    'done.code': ['Código de reserva', 'Booking code', 'Code de réservation', 'Buchungscode', 'Boekingscode', 'Код бронирования'],
    'done.sent': ['Te hemos enviado los detalles a', "We've sent the details to", 'Nous avons envoyé les détails à', 'Wir haben die Details gesendet an', 'We hebben de details gestuurd naar', 'Мы отправили подробности на'],
    'done.fine': ['(Simulación: no se ha enviado ningún email ni realizado ningún cargo.)', '(Simulation: no email has been sent and no charge has been made.)', '(Simulation : aucun e-mail envoyé, aucun débit effectué.)', '(Simulation: Es wurde keine E-Mail gesendet und nichts belastet.)', '(Simulatie: er is geen e-mail verstuurd en niets afgeschreven.)', '(Симуляция: письмо не отправлено, оплата не списана.)'],
    'done.again': ['Hacer otra reserva', 'Make another booking', 'Faire une autre réservation', 'Weitere Buchung', 'Nog een boeking maken', 'Новое бронирование'],
    'sum.empty': ['Elige un apartamento para ver aquí el resumen y el precio.', 'Choose an apartment to see the summary and price here.', 'Choisissez un appartement pour voir ici le récapitulatif et le prix.', 'Wählen Sie ein Apartment, um hier Übersicht und Preis zu sehen.', 'Kies een appartement om hier het overzicht en de prijs te zien.', 'Выберите апартаменты, чтобы увидеть здесь сводку и цену.'],
    'sum.cleaning': ['Limpieza final', 'Final cleaning', 'Ménage final', 'Endreinigung', 'Eindschoonmaak', 'Финальная уборка'],
    'sum.tax': ['Tasa turística', 'Tourist tax', 'Taxe de séjour', 'Kurtaxe', 'Toeristenbelasting', 'Туристический налог'],
    'sum.total': ['Total', 'Total', 'Total', 'Gesamt', 'Totaal', 'Итого'],
    'sum.payNothing': ['Hoy no pagas nada.', 'You pay nothing today.', "Vous ne payez rien aujourd'hui.", 'Heute zahlen Sie nichts.', 'Vandaag betaal je niets.', 'Сегодня вы ничего не платите.'],
    'sum.cancel': ['Cancelación gratuita hasta 7 días antes.', 'Free cancellation up to 7 days before.', "Annulation gratuite jusqu'à 7 jours avant.", 'Kostenlose Stornierung bis 7 Tage vorher.', 'Gratis annuleren tot 7 dagen vooraf.', 'Бесплатная отмена за 7 дней до заезда.'],
    'sum.pickDates': ['Elige fechas en el calendario para calcular el precio. Desde {p}/noche en temporada baja.', 'Pick dates on the calendar to calculate the price. From {p}/night in low season.', 'Choisissez vos dates dans le calendrier pour calculer le prix. À partir de {p}/nuit en basse saison.', 'Wählen Sie Daten im Kalender, um den Preis zu berechnen. Ab {p}/Nacht in der Nebensaison.', 'Kies data in de kalender om de prijs te berekenen. Vanaf {p}/nacht in het laagseizoen.', 'Выберите даты в календаре, чтобы рассчитать цену. От {p}/ночь в низкий сезон.'],

    /* --- reseñas --- */
    'sec.rev.title': ['Lo que cuentan quienes ya se posaron aquí', 'What guests who have perched here say', 'Ce que racontent ceux qui se sont posés ici', 'Was Gäste erzählen, die schon hier gelandet sind', 'Wat gasten vertellen die hier al neerstreken', 'Что рассказывают те, кто уже здесь гостил'],
    'rev.fine': ['Reseñas de muestra para el diseño: se sustituirán por las opiniones reales de los huéspedes.', 'Sample reviews for the design: they will be replaced by real guest reviews.', "Avis d'exemple pour la maquette : ils seront remplacés par de vrais avis de voyageurs.", 'Beispielbewertungen für das Design: Sie werden durch echte Gästebewertungen ersetzt.', 'Voorbeeldbeoordelingen voor het ontwerp: ze worden vervangen door echte beoordelingen van gasten.', 'Примеры отзывов для макета: они будут заменены настоящими отзывами гостей.'],
    'aria.prev': ['Anterior', 'Previous', 'Précédent', 'Zurück', 'Vorige', 'Назад'],
    'aria.next': ['Siguiente', 'Next', 'Suivant', 'Weiter', 'Volgende', 'Далее'],
    'rev.of5': ['{n} de 5', '{n} out of 5', '{n} sur 5', '{n} von 5', '{n} van 5', '{n} из 5'],

    /* --- cómo llegar --- */
    'sec.reach.title': ['Tres direcciones en Lloret', 'Three addresses in Lloret', 'Trois adresses à Lloret', 'Drei Adressen in Lloret', 'Drie adressen in Lloret', 'Три адреса в Льорете'],
    'aria.map': ['Mapa con las tres ubicaciones', 'Map with the three locations', 'Carte des trois adresses', 'Karte mit den drei Standorten', 'Kaart met de drie locaties', 'Карта с тремя адресами'],
    'loc.route': ['Ruta en Google Maps', 'Directions in Google Maps', 'Itinéraire Google Maps', 'Route in Google Maps', 'Route in Google Maps', 'Маршрут в Google Maps'],
    'tr.bcn.t': ['Aeropuerto de Barcelona', 'Barcelona Airport', 'Aéroport de Barcelone', 'Flughafen Barcelona', 'Luchthaven Barcelona', 'Аэропорт Барселоны'],
    'tr.bcn.d': ['45 min en coche por la AP-7 / C-32. Ofrecemos traslado: pídelo al reservar.', '45 min by car via the AP-7 / C-32. We offer transfers: ask when booking.', "45 min en voiture par l'AP-7 / C-32. Nous proposons un transfert : demandez-le en réservant.", '45 Min. mit dem Auto über AP-7 / C-32. Wir bieten Transfers an – einfach bei der Buchung anfragen.', '45 min met de auto via de AP-7 / C-32. We bieden transfers aan: vraag ernaar bij het boeken.', '45 минут на машине по AP-7 / C-32. Есть трансфер — укажите при бронировании.'],
    'tr.gro.t': ['Aeropuerto de Girona', 'Girona Airport', 'Aéroport de Gérone', 'Flughafen Girona', 'Luchthaven Girona', 'Аэропорт Жироны'],
    'tr.gro.d': ['Unos 20–30 min en coche o en bus directo hasta Lloret.', 'About 20–30 min by car, or by direct bus to Lloret.', "Environ 20–30 min en voiture ou en bus direct jusqu'à Lloret.", 'Etwa 20–30 Min. mit dem Auto oder per Direktbus nach Lloret.', 'Ongeveer 20–30 min met de auto of met een directe bus naar Lloret.', 'Около 20–30 минут на машине или прямым автобусом до Льорета.'],
    'tr.bus.t': ['En autobús', 'By bus', 'En bus', 'Mit dem Bus', 'Met de bus', 'На автобусе'],
    'tr.bus.d': ['Líneas directas desde Barcelona y Girona hasta la estación de autobuses de Lloret.', 'Direct lines from Barcelona and Girona to Lloret bus station.', "Lignes directes depuis Barcelone et Gérone jusqu'à la gare routière de Lloret.", 'Direktlinien ab Barcelona und Girona zum Busbahnhof Lloret.', 'Directe lijnen vanuit Barcelona en Girona naar het busstation van Lloret.', 'Прямые рейсы из Барселоны и Жироны до автовокзала Льорета.'],
    'tr.train.t': ['En tren', 'By train', 'En train', 'Mit dem Zug', 'Met de trein', 'На поезде'],
    'tr.train.d': ['Rodalies R1 hasta Blanes y bus o taxi hasta Lloret (unos 15 min).', 'Rodalies R1 to Blanes, then bus or taxi to Lloret (about 15 min).', "Rodalies R1 jusqu'à Blanes, puis bus ou taxi jusqu'à Lloret (env. 15 min).", 'Rodalies R1 bis Blanes, dann Bus oder Taxi nach Lloret (ca. 15 Min.).', 'Rodalies R1 naar Blanes, daarna bus of taxi naar Lloret (ca. 15 min).', 'Электричка Rodalies R1 до Бланеса, затем автобус или такси до Льорета (около 15 минут).'],

    /* --- edificios (datos) --- */
    'b.breeze.kind': ['Aparthotel de playa', 'Beach aparthotel', 'Aparthotel de plage', 'Strand-Aparthotel', 'Strandaparthotel', 'Пляжный апарт-отель'],
    'b.breeze.tagline': ['Blanco, azul Egeo y la playa central a un paseo.', 'White, Aegean blue and the main beach a short stroll away.', 'Blanc, bleu égéen et la plage principale à deux pas.', 'Weiß, Ägäisblau und der Hauptstrand nur einen Spaziergang entfernt.', 'Wit, Egeïsch blauw en het hoofdstrand op loopafstand.', 'Белый, эгейский синий и центральный пляж в двух шагах.'],
    'b.breeze.perks': ['50 m de la playa central|Estilo griego|Wifi gratis|Cocina equipada', '50 m from the main beach|Greek style|Free Wi-Fi|Fully equipped kitchen', 'À 50 m de la plage principale|Style grec|Wi-Fi gratuit|Cuisine équipée', '50 m zum Hauptstrand|Griechischer Stil|Kostenloses WLAN|Voll ausgestattete Küche', '50 m van het hoofdstrand|Griekse stijl|Gratis wifi|Volledig uitgeruste keuken', '50 м до центрального пляжа|Греческий стиль|Бесплатный Wi-Fi|Оборудованная кухня'],
    'b.pareclaret.kind': ['Apartamentos en el centro', 'Apartments in the centre', 'Appartements en centre-ville', 'Apartments im Zentrum', 'Appartementen in het centrum', 'Апартаменты в центре'],
    'b.pareclaret.tagline': ['Madera, terracota y terrazas al sol en pleno centro.', 'Wood, terracotta and sunny terraces right in the centre.', 'Bois, terre cuite et terrasses ensoleillées en plein centre.', 'Holz, Terrakotta und sonnige Terrassen mitten im Zentrum.', 'Hout, terracotta en zonnige terrassen midden in het centrum.', 'Дерево, терракота и солнечные террасы в самом центре.'],
    'b.pareclaret.perks': ['Parking subterráneo|Terrazas|Centro de Lloret|Wifi gratis', 'Underground parking|Terraces|Lloret centre|Free Wi-Fi', 'Parking souterrain|Terrasses|Centre de Lloret|Wi-Fi gratuit', 'Tiefgarage|Terrassen|Zentrum von Lloret|Kostenloses WLAN', 'Ondergrondse parkeergarage|Terrassen|Centrum van Lloret|Gratis wifi', 'Подземная парковка|Террасы|Центр Льорета|Бесплатный Wi-Fi'],
    'b.fenals.kind': ['Apartamentos con piscina', 'Apartments with pool', 'Appartements avec piscine', 'Apartments mit Pool', 'Appartementen met zwembad', 'Апартаменты с бассейном'],
    'b.fenals.tagline': ['Piscina, pinos y calma. Pensado para familias.', 'Pool, pine trees and peace. Designed for families.', 'Piscine, pins et calme. Pensé pour les familles.', 'Pool, Pinien und Ruhe. Ideal für Familien.', 'Zwembad, dennen en rust. Gemaakt voor gezinnen.', 'Бассейн, сосны и тишина. Для семейного отдыха.'],
    'b.fenals.perks': ['Piscina comunitaria|Parking subterráneo|Zona tranquila|Ideal familias', 'Shared pool|Underground parking|Quiet area|Great for families', 'Piscine commune|Parking souterrain|Quartier calme|Idéal pour les familles', 'Gemeinschaftspool|Tiefgarage|Ruhige Lage|Ideal für Familien', 'Gemeenschappelijk zwembad|Ondergrondse parkeergarage|Rustige buurt|Ideaal voor gezinnen', 'Общий бассейн|Подземная парковка|Тихий район|Идеально для семей'],

    /* --- subpáginas --- */
    'about.breeze': ['Un pequeño aparthotel a un paseo de la playa central de Lloret. Paredes encaladas, azul Egeo, ratán y suelo hidráulico: el Mediterráneo griego trasladado a la Costa Brava. Pisos luminosos para parejas y familias pequeñas.', "A small aparthotel a short walk from Lloret's main beach. Whitewashed walls, Aegean blue, rattan and encaustic tiles: the Greek Mediterranean brought to the Costa Brava. Bright apartments for couples and small families.", 'Un petit aparthotel à deux pas de la plage principale de Lloret. Murs blanchis à la chaux, bleu égéen, rotin et carreaux de ciment : la Méditerranée grecque sur la Costa Brava. Des appartements lumineux pour couples et petites familles.', 'Ein kleines Aparthotel nur einen Spaziergang vom Hauptstrand von Lloret entfernt. Gekalkte Wände, Ägäisblau, Rattan und Zementfliesen: das griechische Mittelmeer an der Costa Brava. Helle Apartments für Paare und kleine Familien.', 'Een klein aparthotel op loopafstand van het hoofdstrand van Lloret. Witgekalkte muren, Egeïsch blauw, rotan en cementtegels: de Griekse Middellandse Zee aan de Costa Brava. Lichte appartementen voor stellen en kleine gezinnen.', 'Небольшой апарт-отель в нескольких минутах ходьбы от центрального пляжа Льорета. Белёные стены, эгейский синий, ротанг и гидравлическая плитка — греческое Средиземноморье на Коста-Брава. Светлые апартаменты для пар и небольших семей.'],
    'about.pareclaret': ['Nuestro edificio más grande: diez apartamentos con nombre de flor en pleno centro de Lloret, con parking subterráneo. Madera, tonos tierra y terrazas soleadas para desayunar sin prisa.', 'Our largest building: ten apartments named after flowers, right in the centre of Lloret, with underground parking. Wood, earthy tones and sunny terraces for unhurried breakfasts.', 'Notre plus grande résidence : dix appartements aux noms de fleurs en plein centre de Lloret, avec parking souterrain. Bois, tons terre et terrasses ensoleillées pour des petits-déjeuners sans hâte.', 'Unser größtes Haus: zehn Apartments mit Blumennamen mitten im Zentrum von Lloret, mit Tiefgarage. Holz, Erdtöne und sonnige Terrassen für ein entspanntes Frühstück.', 'Ons grootste gebouw: tien appartementen met bloemennamen midden in het centrum van Lloret, met ondergrondse parkeergarage. Hout, aardetinten en zonnige terrassen om rustig te ontbijten.', 'Наше самое большое здание: десять апартаментов с цветочными названиями в самом центре Льорета, с подземной парковкой. Дерево, землистые оттенки и солнечные террасы для неспешного завтрака.'],
    'about.fenals': ['Dos apartamentos LUX en una urbanización tranquila de Fenals, con piscina comunitaria, jardín y parking subterráneo. La playa de Fenals y el camino de ronda, a un paseo. Ideal para familias.', 'Two LUX apartments in a quiet residential complex in Fenals, with a shared pool, garden and underground parking. Fenals beach and the coastal path are a short walk away. Ideal for families.', 'Deux appartements LUX dans une résidence calme de Fenals, avec piscine commune, jardin et parking souterrain. La plage de Fenals et le sentier côtier à quelques pas. Idéal pour les familles.', 'Zwei LUX-Apartments in einer ruhigen Wohnanlage in Fenals, mit Gemeinschaftspool, Garten und Tiefgarage. Der Strand von Fenals und der Küstenweg sind nur einen Spaziergang entfernt. Ideal für Familien.', 'Twee LUX-appartementen in een rustig wooncomplex in Fenals, met gemeenschappelijk zwembad, tuin en ondergrondse parkeergarage. Het strand van Fenals en het kustpad liggen op loopafstand. Ideaal voor gezinnen.', 'Два апартамента LUX в тихом жилом комплексе в Феналсе: общий бассейн, сад и подземная парковка. До пляжа Феналс и прибрежной тропы — несколько минут пешком. Идеально для семей.'],
    'bh.back': ['Todos los edificios', 'All buildings', 'Toutes les résidences', 'Alle Häuser', 'Alle gebouwen', 'Все здания'],
    'bh.choose': ['Elegir piso', 'Choose apartment', "Choisir l'appartement", 'Apartment wählen', 'Kies appartement', 'Выбрать апартаменты'],
    'sel.plume': ['Elige tu piso', 'Choose your apartment', 'Choisissez votre appartement', 'Wählen Sie Ihr Apartment', 'Kies je appartement', 'Выберите апартаменты'],
    'sel.breeze.t': ['La fachada', 'The façade', 'La façade', 'Die Fassade', 'De gevel', 'Фасад'],
    'sel.breeze.s': ['Toca una ventana para ver el piso.', 'Tap a window to see the apartment.', "Touchez une fenêtre pour voir l'appartement.", 'Tippen Sie auf ein Fenster, um das Apartment zu sehen.', 'Tik op een raam om het appartement te bekijken.', 'Нажмите на окно, чтобы увидеть апартаменты.'],
    'sel.pareclaret.t': ['El jardín', 'The garden', 'Le jardin', 'Der Garten', 'De tuin', 'Сад'],
    'sel.pareclaret.s': ['Diez pisos, diez flores. ¿Cuál es la tuya?', 'Ten apartments, ten flowers. Which one is yours?', 'Dix appartements, dix fleurs. Laquelle est la vôtre ?', 'Zehn Apartments, zehn Blumen. Welche ist Ihre?', 'Tien appartementen, tien bloemen. Welke is de jouwe?', 'Десять апартаментов — десять цветов. Какой ваш?'],
    'sel.fenals.t': ['Las calles de la piscina', 'The pool lanes', 'Les couloirs de nage', 'Die Schwimmbahnen', 'De zwembanen', 'Дорожки бассейна'],
    'sel.fenals.s': ['Dos pisos gemelos, junto al agua.', 'Two twin apartments by the water.', "Deux appartements jumeaux au bord de l'eau.", 'Zwei Zwillings-Apartments am Wasser.', 'Twee tweelingappartementen aan het water.', 'Два апартамента-близнеца у воды.'],
    'am.kitchen': ['Cocina equipada', 'Fully equipped kitchen', 'Cuisine équipée', 'Voll ausgestattete Küche', 'Volledig uitgeruste keuken', 'Оборудованная кухня'],
    'am.tv': ['Smart TV', 'Smart TV', 'Smart TV', 'Smart-TV', 'Smart-tv', 'Smart TV'],
    'am.crib': ['Cuna gratis bajo petición', 'Free cot on request', 'Lit bébé gratuit sur demande', 'Kinderbett gratis auf Anfrage', 'Gratis babybedje op aanvraag', 'Бесплатная кроватка по запросу'],
    'am.nosmoke': ['Sin humo', 'Non-smoking', 'Non-fumeur', 'Nichtraucher', 'Rookvrij', 'Не для курящих'],
    'am.beach': ['Playa central a un paseo', 'Main beach a short walk away', 'Plage principale à deux pas', 'Hauptstrand zu Fuß erreichbar', 'Hoofdstrand op loopafstand', 'Центральный пляж рядом'],
    'am.parking': ['Parking subterráneo', 'Underground parking', 'Parking souterrain', 'Tiefgarage', 'Ondergrondse parkeergarage', 'Подземная парковка'],
    'am.terrace': ['Terraza', 'Terrace', 'Terrasse', 'Terrasse', 'Terras', 'Терраса'],
    'am.pool': ['Piscina comunitaria', 'Shared pool', 'Piscine commune', 'Gemeinschaftspool', 'Gemeenschappelijk zwembad', 'Общий бассейн'],
    'spec.size': ['Superficie', 'Size', 'Surface', 'Fläche', 'Oppervlakte', 'Площадь'],
    'spec.beds': ['Dormitorios', 'Bedrooms', 'Chambres', 'Schlafzimmer', 'Slaapkamers', 'Спальни'],
    'season.low': ['Temp. baja', 'Low season', 'Basse saison', 'Nebensaison', 'Laagseizoen', 'Низкий сезон'],
    'season.mid': ['Temp. media', 'Mid season', 'Moyenne saison', 'Zwischensaison', 'Middenseizoen', 'Средний сезон'],
    'season.high': ['Temp. alta', 'High season', 'Haute saison', 'Hauptsaison', 'Hoogseizoen', 'Высокий сезон'],
    'price.note': ['precio orientativo por noche', 'guide price per night', 'prix indicatif par nuit', 'Richtpreis pro Nacht', 'richtprijs per nacht', 'ориентировочная цена за ночь'],
    'pd.book': ['Reservar {name}', 'Book {name}', 'Réserver {name}', '{name} buchen', '{name} boeken', 'Забронировать {name}'],
    'pd.ask': ['Preguntar', 'Ask', 'Demander', 'Anfragen', 'Vragen', 'Спросить'],
    'pd.wa': ['Hola, me interesa el apartamento {a} de {b}.', "Hi, I'm interested in apartment {a} at {b}.", "Bonjour, l'appartement {a} de {b} m'intéresse.", 'Hallo, ich interessiere mich für das Apartment {a} im {b}.', 'Hallo, ik heb interesse in appartement {a} van {b}.', 'Здравствуйте, меня интересуют апартаменты {a} в {b}.'],
    'pd.compare': ['¿Comparar?', 'Compare?', 'Comparer ?', 'Vergleichen?', 'Vergelijken?', 'Сравнить?'],
    'pd.see': ['Ver {name}', 'See {name}', 'Voir {name}', '{name} ansehen', 'Bekijk {name}', 'Смотреть {name}'],
    'pd.zoom': ['Ver foto en grande', 'View larger photo', 'Agrandir la photo', 'Foto vergrößern', 'Foto vergroten', 'Увеличить фото'],
    'pd.photo': ['Foto {n}', 'Photo {n}', 'Photo {n}', 'Foto {n}', 'Foto {n}', 'Фото {n}'],
    'near.plume': ['Cerca de aquí', 'Nearby', 'À proximité', 'In der Nähe', 'In de buurt', 'Рядом'],
    'near.title': ['A pie desde {b}', 'On foot from {b}', 'À pied depuis {b}', 'Zu Fuß ab {b}', 'Te voet vanaf {b}', 'Пешком от {b}'],
    'near.more': ['Ver todos los lugares', 'See all places', 'Voir tous les lieux', 'Alle Orte ansehen', 'Bekijk alle plekken', 'Все места'],
    'others.plume': ["Otras casas de Parrot's House", "More Parrot's House homes", 'Les autres résidences Parrot’s House', "Weitere Häuser von Parrot's House", "Andere huizen van Parrot's House", 'Другие дома Parrot’s House'],
    'aria.close': ['Cerrar', 'Close', 'Fermer', 'Schließen', 'Sluiten', 'Закрыть'],
    'aria.prevPhoto': ['Foto anterior', 'Previous photo', 'Photo précédente', 'Vorheriges Foto', 'Vorige foto', 'Предыдущее фото'],
    'aria.nextPhoto': ['Foto siguiente', 'Next photo', 'Photo suivante', 'Nächstes Foto', 'Volgende foto', 'Следующее фото'],
    'aria.facade': ['Fachada del edificio {b}', 'Façade of the {b} building', 'Façade de la résidence {b}', 'Fassade des Hauses {b}', 'Gevel van gebouw {b}', 'Фасад здания {b}'],
  };

  /* Descripciones de pisos (por id) */
  const APT_NOTES = {
    19: ['Dos dormitorios con cabeceros de ratán, salón con sofá azul y suelo hidráulico geométrico.', 'Two bedrooms with rattan headboards, a living room with a blue sofa and geometric encaustic tiles.', 'Deux chambres aux têtes de lit en rotin, salon avec canapé bleu et carreaux de ciment géométriques.', 'Zwei Schlafzimmer mit Rattan-Kopfteilen, Wohnzimmer mit blauem Sofa und geometrischen Zementfliesen.', 'Twee slaapkamers met rotan hoofdborden, woonkamer met blauwe bank en geometrische cementtegels.', 'Две спальни с ротанговыми изголовьями, гостиная с синим диваном и геометрической гидравлической плиткой.'],
    18: ['Rayas arena y azul marino, sofá de terciopelo y cocina abierta con frente de azulejo azul.', 'Sand and navy stripes, a velvet sofa and an open kitchen with blue tiles.', 'Rayures sable et bleu marine, canapé en velours et cuisine ouverte à crédence bleue.', 'Streifen in Sand und Marineblau, Samtsofa und offene Küche mit blauen Fliesen.', 'Strepen in zand en marineblauw, fluwelen bank en open keuken met blauwe tegels.', 'Полосы песочного и тёмно-синего цвета, бархатный диван и открытая кухня с синей плиткой.'],
    17: ['Papel pintado de azulejo azul, cocina negra mate y salón luminoso con balcón a la calle.', 'Blue tile-pattern wallpaper, a matte black kitchen and a bright living room with a street-facing balcony.', 'Papier peint motif azulejo bleu, cuisine noir mat et salon lumineux avec balcon sur rue.', 'Tapete mit blauem Fliesenmuster, mattschwarze Küche und helles Wohnzimmer mit Balkon zur Straße.', 'Behang met blauw tegelpatroon, matzwarte keuken en lichte woonkamer met balkon aan de straat.', 'Обои с синим узором под плитку, матово-чёрная кухня и светлая гостиная с балконом на улицу.'],
    16: ['Mesa redonda, sofá azul y baño de azulejo metro con detalles marineros.', 'Round table, blue sofa and a subway-tiled bathroom with nautical touches.', 'Table ronde, canapé bleu et salle de bain en carrelage métro aux touches marines.', 'Runder Tisch, blaues Sofa und Bad mit Metrofliesen und maritimen Details.', 'Ronde tafel, blauwe bank en badkamer met metrotegels en maritieme details.', 'Круглый стол, синий диван и ванная с плиткой «кабанчик» и морскими деталями.'],
    3: ['El más amplio: dos dormitorios, salón con sofá cama y terraza con toldo.', 'The most spacious: two bedrooms, a living room with sofa bed and an awning-covered terrace.', 'Le plus spacieux : deux chambres, salon avec canapé-lit et terrasse avec store.', 'Das geräumigste: zwei Schlafzimmer, Wohnzimmer mit Schlafsofa und Terrasse mit Markise.', 'De ruimste: twee slaapkamers, woonkamer met slaapbank en terras met zonnescherm.', 'Самые просторные: две спальни, гостиная с диваном-кроватью и терраса с маркизой.'],
    4: ['Gran terraza naranja con sofá de exterior y dormitorio de madera maciza.', 'Large orange terrace with an outdoor sofa and a solid-wood bedroom.', "Grande terrasse orange avec canapé d'extérieur et chambre en bois massif.", 'Große orangefarbene Terrasse mit Outdoor-Sofa und Schlafzimmer aus Massivholz.', 'Groot oranje terras met loungebank en een slaapkamer van massief hout.', 'Большая оранжевая терраса с уличным диваном и спальня из массива дерева.'],
    7: ['Cálido y luminoso, con sofá cama para una tercera persona.', 'Warm and bright, with a sofa bed for a third guest.', 'Chaleureux et lumineux, avec canapé-lit pour une troisième personne.', 'Warm und hell, mit Schlafsofa für eine dritte Person.', 'Warm en licht, met een slaapbank voor een derde gast.', 'Тёплые и светлые, с диваном-кроватью для третьего гостя.'],
    8: ['Tonos vino y madera, terraza y sofá cama para una tercera persona.', 'Wine and wood tones, a terrace and a sofa bed for a third guest.', 'Tons lie-de-vin et bois, terrasse et canapé-lit pour une troisième personne.', 'Weinrot und Holz, Terrasse und Schlafsofa für eine dritte Person.', 'Wijnrode en houttinten, terras en slaapbank voor een derde gast.', 'Винные и древесные оттенки, терраса и диван-кровать для третьего гостя.'],
    2: ['Terraza alta con vistas sobre los tejados de Lloret.', 'High terrace overlooking the rooftops of Lloret.', 'Terrasse en hauteur avec vue sur les toits de Lloret.', 'Hoch gelegene Terrasse mit Blick über die Dächer von Lloret.', 'Hoog terras met uitzicht over de daken van Lloret.', 'Высокая терраса с видом на крыши Льорета.'],
    5: ['Inspirado en un campo de amapolas; sofá cama y terraza.', 'Inspired by a poppy field; sofa bed and terrace.', "Inspiré d'un champ de coquelicots ; canapé-lit et terrasse.", 'Inspiriert von einem Mohnfeld; Schlafsofa und Terrasse.', 'Geïnspireerd op een klaprozenveld; slaapbank en terras.', 'Вдохновлены маковым полем; диван-кровать и терраса.'],
    6: ['Turquesas suaves, mesa de cristal y balcón corrido.', 'Soft turquoises, a glass table and a long balcony.', 'Turquoises doux, table en verre et long balcon.', 'Sanfte Türkistöne, Glastisch und durchgehender Balkon.', 'Zacht turquoise, glazen tafel en een lang balkon.', 'Мягкие бирюзовые тона, стеклянный стол и длинный балкон.'],
    10: ['Sereno y cuidado, con cocina abierta y terraza.', 'Calm and well kept, with an open kitchen and terrace.', 'Serein et soigné, avec cuisine ouverte et terrasse.', 'Ruhig und gepflegt, mit offener Küche und Terrasse.', 'Sereen en verzorgd, met open keuken en terras.', 'Спокойные и ухоженные, с открытой кухней и террасой.'],
    1: ['Salón alargado con sofá tostado y terraza naranja.', 'Long living room with a tan sofa and an orange terrace.', 'Salon tout en longueur avec canapé caramel et terrasse orange.', 'Langgezogenes Wohnzimmer mit hellbraunem Sofa und orangefarbener Terrasse.', 'Langwerpige woonkamer met lichtbruine bank en oranje terras.', 'Вытянутая гостиная с бежево-коричневым диваном и оранжевая терраса.'],
    9: ['Sillas de colores, sofá rojo y terraza con mesa de mimbre.', 'Colourful chairs, a red sofa and a terrace with a wicker table.', 'Chaises colorées, canapé rouge et terrasse avec table en osier.', 'Bunte Stühle, rotes Sofa und Terrasse mit Korbtisch.', 'Kleurrijke stoelen, rode bank en terras met rieten tafel.', 'Яркие стулья, красный диван и терраса с плетёным столиком.'],
    11: ['Salón gris con chaise longue, cocina abierta y terraza con vistas a los pinos.', 'Grey living room with a chaise longue, open kitchen and a terrace overlooking the pines.', 'Salon gris avec méridienne, cuisine ouverte et terrasse avec vue sur les pins.', 'Graues Wohnzimmer mit Chaiselongue, offene Küche und Terrasse mit Blick auf die Pinien.', 'Grijze woonkamer met chaise longue, open keuken en terras met uitzicht op de dennen.', 'Серая гостиная с шезлонгом, открытая кухня и терраса с видом на сосны.'],
    15: ['Sofá rojo, comedor nórdico y gran balcón sobre el jardín y la piscina.', 'Red sofa, Nordic-style dining area and a large balcony over the garden and pool.', 'Canapé rouge, coin repas nordique et grand balcon sur le jardin et la piscine.', 'Rotes Sofa, Essbereich im nordischen Stil und großer Balkon über Garten und Pool.', 'Rode bank, Scandinavische eethoek en groot balkon boven de tuin en het zwembad.', 'Красный диван, обеденная зона в скандинавском стиле и большой балкон над садом и бассейном.'],
  };

  /* Descripciones de lugares (mismo orden que PH.PLACES) */
  const PLACE_D = [
    ['La playa central: arena gruesa, paseo marítimo y chiringuitos.', 'The main beach: coarse sand, promenade and beach bars.', 'La plage principale : sable grossier, promenade et paillotes.', 'Der Hauptstrand: grober Sand, Promenade und Strandbars.', 'Het hoofdstrand: grof zand, boulevard en strandbars.', 'Центральный пляж: крупный песок, набережная и пляжные бары.'],
    ['Pequeña cala junto al castillo, con las barcas de los pescadores.', "A small cove by the castle, with the fishermen's boats.", 'Petite crique près du château, avec les barques des pêcheurs.', 'Kleine Bucht beim Castell mit den Booten der Fischer.', 'Kleine baai bij het kasteel, met de vissersbootjes.', 'Маленькая бухта у замка с рыбацкими лодками.'],
    ['Rocas, agua transparente y buen snorkel a la salida del camino de ronda.', 'Rocks, crystal-clear water and good snorkelling along the coastal path.', 'Rochers, eau transparente et bon snorkeling au départ du sentier côtier.', 'Felsen, glasklares Wasser und gutes Schnorcheln am Küstenweg.', 'Rotsen, kristalhelder water en goed snorkelen aan het kustpad.', 'Скалы, прозрачная вода и хороший снорклинг у прибрежной тропы.'],
    ['Playa amplia y tranquila, perfecta con niños.', 'A wide, calm beach, perfect with children.', 'Plage large et calme, parfaite avec des enfants.', 'Breiter, ruhiger Strand, perfekt mit Kindern.', 'Breed en rustig strand, perfect met kinderen.', 'Широкий спокойный пляж, идеален для отдыха с детьми.'],
    ['Arena dorada rodeada de pinos, junto a la ermita.', 'Golden sand surrounded by pines, next to the hermitage.', "Sable doré entouré de pins, près de l'ermitage.", 'Goldener Sand, umgeben von Pinien, neben der Einsiedelei.', 'Goudgeel zand tussen de dennen, naast de kapel.', 'Золотой песок в окружении сосен, рядом с часовней.'],
    ['Iglesia gótica (1522) con cúpulas modernistas de cerámica.', 'Gothic church (1522) with modernist ceramic domes.', 'Église gothique (1522) aux coupoles modernistes en céramique.', 'Gotische Kirche (1522) mit modernistischen Keramikkuppeln.', 'Gotische kerk (1522) met modernistische keramische koepels.', 'Готическая церковь (1522) с модернистскими керамическими куполами.'],
    ['La estatua de bronce que mira al mar desde el mirador.', 'The bronze statue gazing out to sea from the viewpoint.', 'La statue de bronze qui contemple la mer depuis le belvédère.', 'Die Bronzestatue, die vom Aussichtspunkt aufs Meer blickt.', 'Het bronzen beeld dat vanaf het uitkijkpunt over zee kijkt.', 'Бронзовая статуя, смотрящая на море со смотровой площадки.'],
    ['El castillo neomedieval que corona el extremo de la playa.', 'The neo-medieval castle crowning the end of the beach.', 'Le château néo-médiéval qui couronne le bout de la plage.', 'Die neomittelalterliche Burg am Ende des Strandes.', 'Het neomiddeleeuwse kasteel aan het eind van het strand.', 'Неосредневековый замок на краю пляжа.'],
    ['La historia marinera de Lloret en una casa indiana del paseo.', "Lloret's seafaring history in an 'indiano' mansion on the promenade.", "L'histoire maritime de Lloret dans une maison d'indiano sur la promenade.", 'Die Seefahrtsgeschichte von Lloret in einer Indiano-Villa an der Promenade.', 'De maritieme geschiedenis van Lloret in een indianovilla aan de boulevard.', 'Морская история Льорета в особняке «индиано» на набережной.'],
    ['Jardines novecentistas en terrazas sobre el acantilado.', 'Noucentista terraced gardens above the cliffs.', 'Jardins noucentistes en terrasses au-dessus de la falaise.', 'Terrassengärten im Noucentisme-Stil über den Klippen.', 'Noucentistische terrastuinen boven de kliffen.', 'Террасные сады в стиле нусентизм над обрывом.'],
    ['Santuario del s. XVIII y escenario de la procesión marítima de julio.', '18th-century shrine and setting of the July sea procession.', 'Sanctuaire du XVIIIe siècle et cadre de la procession maritime de juillet.', 'Heiligtum aus dem 18. Jh. und Schauplatz der Meeresprozession im Juli.', 'Heiligdom uit de 18e eeuw en decor van de processie over zee in juli.', 'Святилище XVIII века, место морской процессии в июле.'],
    ['Tapas, pasta y pizza en una plaza animada del centro.', 'Tapas, pasta and pizza on a lively square in the centre.', 'Tapas, pâtes et pizzas sur une place animée du centre.', 'Tapas, Pasta und Pizza an einem belebten Platz im Zentrum.', 'Tapas, pasta en pizza op een levendig plein in het centrum.', 'Тапас, паста и пицца на оживлённой площади в центре.'],
    ['Cocina italiana frente al mar con más de 20 años de historia.', 'Italian cooking by the sea, with over 20 years of history.', "Cuisine italienne face à la mer, plus de 20 ans d'histoire.", 'Italienische Küche am Meer, seit über 20 Jahren.', 'Italiaanse keuken aan zee, al meer dan 20 jaar.', 'Итальянская кухня у моря с более чем 20-летней историей.'],
    ["Mediterráneo con vistas, al lado del Castell d'en Plaja.", "Mediterranean food with a view, next to the Castell d'en Plaja.", "Cuisine méditerranéenne avec vue, à côté du Castell d'en Plaja.", "Mediterrane Küche mit Aussicht, neben dem Castell d'en Plaja.", "Mediterraans met uitzicht, naast het Castell d'en Plaja.", 'Средиземноморская кухня с видом, рядом с замком Кастель-д’эн-Пладжа.'],
    ['Paellas y arroces en Fenals.', 'Paella and rice dishes in Fenals.', 'Paellas et riz à Fenals.', 'Paella und Reisgerichte in Fenals.', 'Paella en rijstgerechten in Fenals.', 'Паэлья и блюда из риса в Феналсе.'],
    ['Arroces y pescado a pocos pasos de la arena.', 'Rice dishes and fish just steps from the sand.', 'Riz et poisson à deux pas du sable.', 'Reisgerichte und Fisch nur wenige Schritte vom Sand.', 'Rijstgerechten en vis op een paar stappen van het zand.', 'Рис и рыба в нескольких шагах от пляжа.'],
    ['Cocina mediterránea en la zona de Fenals.', 'Mediterranean cooking in the Fenals area.', 'Cuisine méditerranéenne dans le quartier de Fenals.', 'Mediterrane Küche im Viertel Fenals.', 'Mediterrane keuken in de wijk Fenals.', 'Средиземноморская кухня в районе Феналс.'],
    ['Terraza para tapear en el centro.', 'A terrace for tapas in the centre.', 'Une terrasse pour les tapas en centre-ville.', 'Terrasse für Tapas im Zentrum.', 'Terras voor tapas in het centrum.', 'Терраса с тапас в центре.'],
    ['Hamburguesas y street food en pleno centro.', 'Burgers and street food right in the centre.', 'Burgers et street food en plein centre.', 'Burger und Streetfood mitten im Zentrum.', 'Burgers en streetfood midden in het centrum.', 'Бургеры и стритфуд в самом центре.'],
    ['Chiringuito sobre la arena de Fenals.', 'Beach bar on the sand at Fenals.', 'Paillote sur le sable de Fenals.', 'Strandbar direkt im Sand von Fenals.', 'Strandtent op het zand van Fenals.', 'Пляжный бар прямо на песке Феналса.'],
    ['Juego, cenas y espectáculos al final del paseo.', 'Gaming, dinners and shows at the end of the promenade.', 'Jeux, dîners et spectacles au bout de la promenade.', 'Spiel, Dinner und Shows am Ende der Promenade.', 'Gokken, diners en shows aan het eind van de boulevard.', 'Игры, ужины и шоу в конце набережной.'],
    ['Sendero costero entre calas, ideal al atardecer.', 'Coastal path between coves, perfect at sunset.', 'Sentier côtier entre les criques, idéal au coucher du soleil.', 'Küstenpfad zwischen Buchten, ideal bei Sonnenuntergang.', 'Kustpad tussen baaien, ideaal bij zonsondergang.', 'Прибрежная тропа между бухтами, особенно хороша на закате.'],
    ['Parque acuático con toboganes para toda la familia.', 'Water park with slides for the whole family.', 'Parc aquatique avec toboggans pour toute la famille.', 'Wasserpark mit Rutschen für die ganze Familie.', 'Waterpark met glijbanen voor het hele gezin.', 'Аквапарк с горками для всей семьи.'],
    ['Buses a Barcelona, Girona y aeropuertos.', 'Buses to Barcelona, Girona and the airports.', 'Bus vers Barcelone, Gérone et les aéroports.', 'Busse nach Barcelona, Girona und zu den Flughäfen.', 'Bussen naar Barcelona, Girona en de luchthavens.', 'Автобусы в Барселону, Жирону и аэропорты.'],
  ];

  /* ---------- Українська (uk) — se añade como 7.ª columna ---------- */
  const UK = {
    'meta.title': "Parrot's House · Апартаменти в Льорет-де-Мар",
    'meta.desc': "Parrot's House: 16 апартаментів у Льорет-де-Мар, Коста-Брава. Апарт-готель Breeze біля пляжу, Pare Claret у центрі з парковкою та Fenals із басейном.",
    'nav.home': 'Головна', 'nav.apts': 'Апартаменти', 'nav.around': 'Околиці', 'nav.book': 'Бронювання', 'nav.reviews': 'Відгуки', 'nav.reach': 'Як дістатися',
    'cta.bookNow': 'Забронювати', 'cta.book': 'Забронювати',
    'aria.menu': 'Відкрити меню', 'aria.wa': 'Напишіть нам у WhatsApp', 'aria.lang': 'Мова',
    'aria.home': "Parrot's House, головна", 'aria.backHome': "Parrot's House, на головну", 'alt.logo': "Логотип Parrot's House",
    'skip': 'Пропустити',
    'foot.about': 'Апартаменти для відпочинку в Льорет-де-Мар, Коста-Брава.', 'foot.buildings': 'Будинки', 'foot.addresses': 'Адреси', 'foot.contact': 'Контакти',
    'foot.legal': 'Назва й логотип — зареєстровані торговельні марки.', 'b.breeze.full': 'Апарт-готель Breeze',
    'hero.title': 'Ваше гніздечко на <em>Коста-Брава</em>',
    'hero.lead': '16 апартаментів у трьох районах Льорет-де-Мар: апарт-готель у грецькому стилі за кілька кроків від центрального пляжу, будинок із парковкою в самому центрі та два апартаменти з басейном у тихому районі Феналс. 45 хвилин від аеропорту Барселони та 20 — від аеропорту Жирони.',
    'hero.cta1': 'Обрати апартаменти', 'hero.cta2': 'Що поруч',
    'fact.apts': 'апартаментів', 'fact.locs': 'адреси', 'fact.beach': 'до центрального пляжу', 'fact.care': 'підтримка гостей',
    'alt.heroMain': 'Вид з повітря на бухту Льорет-де-Мар', 'alt.heroSmall': 'Вітальня в апарт-готелі Breeze',
    'q.building': 'Будинок', 'q.any': 'Будь-який', 'q.opt.breeze': 'Breeze · пляж', 'q.opt.pareclaret': 'Pare Claret · центр', 'q.opt.fenals': 'Fenals · басейн',
    'q.in': 'Заїзд', 'q.out': 'Виїзд', 'q.guests': 'Гості', 'q.go': 'Перевірити наявність',
    'perks.title': 'Включені послуги', 'perk.beach': 'Пляж за кілька кроків', 'perk.parking': 'Безкоштовна парковка', 'perk.wifi': 'Безкоштовний Wi-Fi',
    'perk.family': 'Ідеально для сімей', 'perk.transfer': 'Трансфер з аеропорту', 'perk.247': 'Підтримка 24/7',
    'perk.crib': 'Безкоштовне ліжечко та крісло для годування', 'perk.linen': 'Постільна білизна й рушники', 'perk.nosmoke': 'Апартаменти для некурців',
    'sec.apts.title': 'Оберіть, де приземлитися',
    'sec.apts.lead': 'Три будинки — три характери. Кожен має власний стиль: зайдіть у той, що до вподоби, і оберіть апартаменти всередині.',
    'card.see': 'Дивитися апартаменти',
    'u.flats': 'апартамент|апартаменти|апартаментів', 'u.nights': 'ніч|ночі|ночей', 'u.bedrooms': 'спальня|спальні|спалень',
    'u.from': 'від', 'u.perNight': '/ніч', 'u.upTo': 'до {n} гостей', 'u.upToGuests': 'до {n} гостей', 'u.min': 'хв', 'u.onFoot': '{d} пішки',
    'apt.word': 'Апартаменти', 'apt.2bed': 'Апартаменти з 2 спальнями',
    'sec.around.title': 'Льорет з висоти пташиного польоту',
    'sec.around.lead': 'Пляжі, пам’ятки, ресторани й розваги — з відстанню пішки від ваших апартаментів. Оберіть, звідки вирушаєте.',
    'aria.origin': 'Вирушаю з', 'aria.cats': 'Фільтр за типом',
    'origin.centro': 'Центр', 'origin.playa': 'Пляж', 'origin.piscina': 'Басейн',
    'key.beach': 'Найближчий пляж', 'key.church': 'Церква Сант-Рома', 'key.bus': 'Автовокзал',
    'cat.all': 'Усе', 'cat.playa': 'Пляжі', 'cat.monumento': 'Пам’ятки', 'cat.restaurante': 'Ресторани', 'cat.bar': 'Бари й дозвілля', 'cat.actividad': 'Розваги',
    'cat1.playa': 'Пляж', 'cat1.monumento': 'Пам’ятка', 'cat1.restaurante': 'Ресторан', 'cat1.bar': 'Дозвілля', 'cat1.actividad': 'Розвага',
    'around.fine': 'Приблизна відстань пішки від адреси кожного будинку.',
    'cap.all': 'Пляж Льорета й замок Кастель-д’ен-Пладжа', 'cap.playa': 'Пісок і прозора вода в бухті Льорета', 'cap.monumento': 'Замок Кастель-д’ен-Пладжа над морем',
    'cap.restaurante': 'Рис і паелья біля моря', 'cap.bar': 'Тапас і коктейлі на терасі', 'cap.actividad': 'Прибережна стежка між бухтами',
    'tips.title': 'Порада від господарів',
    'tips.text': 'Пройдіться на заході сонця прибережною стежкою від Са-Калети до Феналса: бухти, сосни й «Дона Марінера», що дивиться на море.',
    'sec.book.plume': 'Бронювання та оплата', 'sec.book.title': 'Забронюйте гніздечко',
    'sec.book.lead': 'Три кроки — і готово. Підсумкова ціна без сюрпризів: ви бачите розрахунок до оплати.',
    'step1': 'Апартаменти', 'step2': 'Дати', 'step3': 'Дані та оплата', 'bk.all': 'Усі',
    'aria.lessGuests': 'Менше гостей', 'aria.moreGuests': 'Більше гостей',
    'av.ok': 'Вільно у ваші дати', 'av.no': 'Зайнято у ваші дати', 'av.max': 'Макс. {n} гості',
    'aria.prevMonth': 'Попередній місяць', 'aria.nextMonth': 'Наступний місяць',
    'cal.pickIn': 'Оберіть дату заїзду', 'cal.pickOut': 'Заїзд {d} · тепер оберіть виїзд (мін. {n} ночі)',
    'cal.min': 'Мінімальний термін проживання — {n} ночі', 'cal.busy': 'зайнято',
    'leg.free': 'Вільно', 'leg.busy': 'Зайнято', 'leg.sel': 'Ваше проживання',
    'bk.change': 'Змінити апартаменти', 'bk.continue': 'Далі',
    'f.data': 'Ваші дані', 'f.name': 'Ім’я та прізвище', 'f.email': 'Ел. пошта', 'f.tel': 'Телефон', 'f.eta': 'Орієнтовний час прибуття',
    'f.after22': 'Після 22:00', 'f.notes': 'Побажання (необов’язково)', 'f.notesPh': 'Ліжечко, дитячий стільчик, трансфер з аеропорту…',
    'f.pay': 'Спосіб оплати', 'pm.card': 'Картка', 'pm.arrival': 'Оплата під час заїзду', 'cv.name': 'ВАШЕ ІМ’Я', 'cv.exp': 'ММ/РР',
    'f.cc': 'Номер картки', 'f.exp': 'Термін дії',
    'pm.bizumText': 'Після підтвердження ми надішлемо запит на оплату Bizum на вказаний телефон.',
    'pm.arrivalText': 'Ви сплачуєте всю суму під час заїзду готівкою або карткою. Ми безкоштовно тримаємо бронювання 48 годин.',
    'f.terms': 'Я приймаю умови бронювання та правила скасування.', 'f.sim': 'Симуляція оплати: реальне списання не здійснюється.',
    'bk.payBtn': 'Підтвердити й оплатити', 'bk.confirmBtn': 'Підтвердити бронювання', 'bk.processing': 'Обробка…',
    'done.title': 'Бронювання підтверджено!', 'done.code': 'Код бронювання', 'done.sent': 'Ми надіслали деталі на',
    'done.fine': '(Симуляція: лист не надіслано, оплату не списано.)', 'done.again': 'Нове бронювання',
    'sum.empty': 'Оберіть апартаменти, щоб побачити тут підсумок і ціну.', 'sum.cleaning': 'Фінальне прибирання', 'sum.tax': 'Туристичний збір',
    'sum.total': 'Разом', 'sum.payNothing': 'Сьогодні ви нічого не сплачуєте.', 'sum.cancel': 'Безкоштовне скасування за 7 днів до заїзду.',
    'sum.pickDates': 'Оберіть дати в календарі, щоб розрахувати ціну. Від {p}/ніч у низький сезон.',
    'sec.rev.title': 'Що розповідають ті, хто вже тут гостював',
    'rev.fine': 'Приклади відгуків для макета: їх замінять справжніми відгуками гостей.',
    'aria.prev': 'Назад', 'aria.next': 'Далі', 'rev.of5': '{n} з 5',
    'sec.reach.title': 'Три адреси в Льореті', 'aria.map': 'Мапа з трьома адресами', 'loc.route': 'Маршрут у Google Maps',
    'tr.bcn.t': 'Аеропорт Барселони', 'tr.bcn.d': '45 хвилин автомобілем трасою AP-7 / C-32. Є трансфер — вкажіть під час бронювання.',
    'tr.gro.t': 'Аеропорт Жирони', 'tr.gro.d': 'Близько 20–30 хвилин автомобілем або прямим автобусом до Льорета.',
    'tr.bus.t': 'Автобусом', 'tr.bus.d': 'Прямі рейси з Барселони та Жирони до автовокзалу Льорета.',
    'tr.train.t': 'Потягом', 'tr.train.d': 'Приміським потягом Rodalies R1 до Бланеса, далі автобусом або таксі до Льорета (близько 15 хвилин).',
    'b.breeze.kind': 'Пляжний апарт-готель', 'b.breeze.tagline': 'Білий, егейський синій і центральний пляж за кілька кроків.',
    'b.breeze.perks': '50 м до центрального пляжу|Грецький стиль|Безкоштовний Wi-Fi|Обладнана кухня',
    'b.pareclaret.kind': 'Апартаменти в центрі', 'b.pareclaret.tagline': 'Дерево, теракота й сонячні тераси в самому центрі.',
    'b.pareclaret.perks': 'Підземна парковка|Тераси|Центр Льорета|Безкоштовний Wi-Fi',
    'b.fenals.kind': 'Апартаменти з басейном', 'b.fenals.tagline': 'Басейн, сосни й тиша. Для сімейного відпочинку.',
    'b.fenals.perks': 'Спільний басейн|Підземна парковка|Тихий район|Ідеально для сімей',
    'about.breeze': 'Невеликий апарт-готель за кілька хвилин ходьби від центрального пляжу Льорета. Побілені стіни, егейський синій, ротанг і гідравлічна плитка — грецьке Середземномор’я на Коста-Брава. Світлі апартаменти для пар і невеликих сімей.',
    'about.pareclaret': 'Наш найбільший будинок: десять апартаментів із квітковими назвами в самому центрі Льорета, з підземною парковкою. Дерево, землисті відтінки й сонячні тераси для неквапливого сніданку.',
    'about.fenals': 'Два апартаменти LUX у тихому житловому комплексі у Феналсі: спільний басейн, сад і підземна парковка. До пляжу Феналс і прибережної стежки — кілька хвилин пішки. Ідеально для сімей.',
    'bh.back': 'Усі будинки', 'bh.choose': 'Обрати апартаменти', 'sel.plume': 'Оберіть апартаменти',
    'sel.breeze.t': 'Фасад', 'sel.breeze.s': 'Натисніть на вікно, щоб побачити апартаменти.',
    'sel.pareclaret.t': 'Сад', 'sel.pareclaret.s': 'Десять апартаментів — десять квітів. Яка ваша?',
    'sel.fenals.t': 'Доріжки басейну', 'sel.fenals.s': 'Два апартаменти-близнюки біля води.',
    'am.kitchen': 'Обладнана кухня', 'am.tv': 'Smart TV', 'am.crib': 'Безкоштовне ліжечко на запит', 'am.nosmoke': 'Для некурців',
    'am.beach': 'Центральний пляж поруч', 'am.parking': 'Підземна парковка', 'am.terrace': 'Тераса', 'am.pool': 'Спільний басейн',
    'spec.size': 'Площа', 'spec.beds': 'Спальні',
    'season.low': 'Низький сезон', 'season.mid': 'Середній сезон', 'season.high': 'Високий сезон', 'price.note': 'орієнтовна ціна за ніч',
    'pd.book': 'Забронювати {name}', 'pd.ask': 'Запитати', 'pd.wa': 'Добрий день, мене цікавлять апартаменти {a} у {b}.',
    'pd.compare': 'Порівняти?', 'pd.see': 'Дивитися {name}', 'pd.zoom': 'Збільшити фото', 'pd.photo': 'Фото {n}',
    'near.plume': 'Поруч', 'near.title': 'Пішки від {b}', 'near.more': 'Усі місця', 'others.plume': 'Інші будинки Parrot’s House',
    'aria.close': 'Закрити', 'aria.prevPhoto': 'Попереднє фото', 'aria.nextPhoto': 'Наступне фото', 'aria.facade': 'Фасад будинку {b}',
  };
  const UK_NOTES = {
    19: 'Дві спальні з ротанговими узголів’ями, вітальня із синім диваном і геометричною гідравлічною плиткою.',
    18: 'Смуги піщаного й темно-синього кольору, оксамитовий диван і відкрита кухня із синьою плиткою.',
    17: 'Шпалери із синім візерунком під плитку, матово-чорна кухня та світла вітальня з балконом на вулицю.',
    16: 'Круглий стіл, синій диван і ванна з плиткою «кабанчик» та морськими деталями.',
    3: 'Найпросторіші: дві спальні, вітальня з диваном-ліжком і тераса з маркізою.',
    4: 'Велика помаранчева тераса з вуличним диваном і спальня з масиву дерева.',
    7: 'Теплі й світлі, з диваном-ліжком для третього гостя.',
    8: 'Винні та дерев’яні відтінки, тераса й диван-ліжко для третього гостя.',
    2: 'Висока тераса з видом на дахи Льорета.',
    5: 'Натхненні маковим полем; диван-ліжко й тераса.',
    6: 'М’які бірюзові тони, скляний стіл і довгий балкон.',
    10: 'Спокійні й доглянуті, з відкритою кухнею та терасою.',
    1: 'Видовжена вітальня з бежево-коричневим диваном і помаранчева тераса.',
    9: 'Яскраві стільці, червоний диван і тераса з плетеним столиком.',
    11: 'Сіра вітальня з шезлонгом, відкрита кухня й тераса з видом на сосни.',
    15: 'Червоний диван, обідня зона в скандинавському стилі та великий балкон над садом і басейном.',
  };
  const UK_PLACES = [
    'Центральний пляж: великозернистий пісок, набережна й пляжні бари.',
    'Маленька бухта біля замку з рибальськими човнами.',
    'Скелі, прозора вода й чудовий снорклінг біля прибережної стежки.',
    'Широкий спокійний пляж, ідеальний для відпочинку з дітьми.',
    'Золотий пісок серед сосен, поруч із каплицею.',
    'Готична церква (1522) з модерністськими керамічними банями.',
    'Бронзова статуя, що дивиться на море з оглядового майданчика.',
    'Неосередньовічний замок на краю пляжу.',
    'Морська історія Льорета в особняку «індіано» на набережній.',
    'Терасні сади в стилі ноусентизму над урвищем.',
    'Святилище XVIII століття, місце морської процесії в липні.',
    'Тапас, паста й піца на жвавій площі в центрі.',
    'Італійська кухня біля моря з понад 20-річною історією.',
    'Середземноморська кухня з видом, поруч із замком Кастель-д’ен-Пладжа.',
    'Паелья та страви з рису у Феналсі.',
    'Рис і риба за кілька кроків від пляжу.',
    'Середземноморська кухня в районі Феналс.',
    'Тераса з тапас у центрі.',
    'Бургери й стрітфуд у самому центрі.',
    'Пляжний бар просто на піску Феналса.',
    'Ігри, вечері та шоу в кінці набережної.',
    'Прибережна стежка між бухтами, особливо гарна на заході сонця.',
    'Аквапарк із гірками для всієї родини.',
    'Автобуси до Барселони, Жирони та аеропортів.',
  ];
  const UKI = LANGS.indexOf('uk');
  Object.entries(UK).forEach(([k, v]) => { if (D[k]) D[k][UKI] = v; });
  Object.entries(UK_NOTES).forEach(([id, v]) => { if (APT_NOTES[id]) APT_NOTES[id][UKI] = v; });
  UK_PLACES.forEach((v, i) => { if (PLACE_D[i]) PLACE_D[i][UKI] = v; });

  /* ---------- API ---------- */
  const fill = (s, vars) => (vars ? s.replace(/\{(\w+)\}/g, (m, k) => (vars[k] !== undefined ? vars[k] : m)) : s);
  PH.t = (key, vars) => {
    const row = D[key];
    if (!row) return key;
    return fill(row[L] !== undefined ? row[L] : row[0], vars);
  };
  // plural: forma según el número (ru tiene 3 formas)
  PH.tn = (key, n) => {
    const forms = PH.t(key).split('|');
    let i;
    if (lang === 'ru' || lang === 'uk') {
      const a = Math.abs(n) % 100, b = a % 10;
      i = a > 10 && a < 20 ? 2 : b === 1 ? 0 : b >= 2 && b <= 4 ? 1 : 2;
    } else if (lang === 'fr') i = n <= 1 ? 0 : 1;
    else i = n === 1 ? 0 : 1;
    return forms[Math.min(i, forms.length - 1)];
  };
  PH.tl = (key) => PH.t(key).split('|'); // listas

  /* ---------- traduce los datos compartidos ---------- */
  if (PH.BUILDINGS) {
    Object.values(PH.BUILDINGS).forEach((b) => {
      b.kind = PH.t(`b.${b.id}.kind`);
      b.tagline = PH.t(`b.${b.id}.tagline`);
      b.perks = PH.tl(`b.${b.id}.perks`);
    });
  }
  if (PH.APTS) {
    PH.APTS.forEach((a) => {
      if (APT_NOTES[a.id]) a.note = APT_NOTES[a.id][L];
      if (a.b === 'breeze') a.name = a.code === '2H' ? PH.t('apt.2bed') : `${PH.t('apt.word')} ${a.code}`;
    });
  }
  if (PH.PLACES) PH.PLACES.forEach((p, i) => { if (PLACE_D[i]) p.d = PLACE_D[i][L]; });
  if (PH.CATS) Object.keys(PH.CATS).forEach((k) => { PH.CATS[k].label = PH.t(`cat.${k}`); PH.CATS[k].one = PH.t(`cat1.${k}`); });

  /* ---------- traduce el HTML estático ----------
     data-i18n="clave"          → texto
     data-i18n-html="clave"     → HTML
     data-i18n-attr="attr:clave; attr2:clave2" */
  PH.applyI18n = (root = document) => {
    root.querySelectorAll('[data-i18n]').forEach((el) => {
      const v = el.dataset.i18nVars ? JSON.parse(el.dataset.i18nVars) : null;
      el.textContent = PH.t(el.dataset.i18n, v);
    });
    root.querySelectorAll('[data-i18n-html]').forEach((el) => { el.innerHTML = PH.t(el.dataset.i18nHtml); });
    root.querySelectorAll('[data-i18n-attr]').forEach((el) => {
      el.dataset.i18nAttr.split(';').forEach((pair) => {
        const [attr, key] = pair.split(':').map((s) => s.trim());
        if (attr && key) el.setAttribute(attr, PH.t(key));
      });
    });
  };
  PH.applyI18n();
})();
