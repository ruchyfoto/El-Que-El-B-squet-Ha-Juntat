# El que el bàsquet ha juntat

Web estàtica (HTML + CSS + JS) amb Supabase de base de dades i GitHub Pages per publicar-la.

## Posar-ho en marxa

1. **Supabase**: pots fer servir el mateix projecte que el fantasy. Les taules d'aquesta web comencen per `pp_` i no es toquen amb les altres.
2. **Taules**: SQL Editor > New query > enganxa `supabase.sql`. Abans de donar a Run, canvia els dos correus de la línia `insert into public.pp_allowed` pels vostres.
2b. **Jocs diaris**: executa també `supabase_jocs.sql` de la mateixa manera (si ja havies executat `supabase.sql`, executa només aquest).
2d. **Abraçades**: executa també `supabase_hugs.sql` (taula `pp_hugs` i avisos de les abraçades). Si ja tens la funció `pp-push` desplegada, enganxa-hi el codi nou de `pp-push/index.ts` i torna-la a desplegar.
2c. **Colors**: executa també `supabase_colors.sql` (perquè cadascú pugui triar el seu color).
3. **Usuaris**: Authentication > Users > Add user > Create new user, dues vegades, amb aquests mateixos correus, una contrasenya i "Auto Confirm User" activat.
   No cal desactivar els registres: només els correus de `pp_allowed` poden llegir i escriure les dades.
4. **Claus**: Project Settings > API. Copia la Project URL i la clau `anon` / `publishable` dins de `config.js` (si fas servir el projecte del fantasy, són les mateixes).
5. **GitHub**: crea un repositori, puja `index.html`, `styles.css`, `app.js` i `config.js`. Settings > Pages > Deploy from a branch > `main` / root.
6. Obre `https://USUARI.github.io/REPO/`, entra amb el teu correu i poseu els dos noms.

## Canviar coses

- Punts i categories: `CATS` al principi de `app.js`.
- Reptes setmanals: llista `CHALL`.
- Punts per abraçada: `HUGPTS` a `app.js` (i a `index.ts` de la funció).
- Preguntes del dia: llista `Q`. Parells d'això o allò: llista `T`. Punts: `QPTS` i `TPTS`.
- Punts per nivell: `STEP`.
- Colors: variables al principi de `styles.css`.

## Notificacions push

1. **Claus:** obre `vapid.html` amb doble clic al teu ordinador i prem «Generar claus». Et dona una clau pública i una de privada.
2. **config.js:** posa la clau pública a `vapid: '...'`. La privada no s'ha de posar mai aquí ni pujar a GitHub.
3. **Taula i avisos automàtics:** obre `supabase_push.sql`, canvia `PROJECT_REF` (el codi de la teva URL de Supabase) i `SECRET` (una frase llarga inventada) a la línia `declare` de la part 2, i executa-ho al SQL Editor.
4. **Funció:** Supabase > Edge Functions > Deploy a new function (via editor). Nom: `pp-push`. Enganxa-hi tot `pp-push/index.ts` i desplega-la.
   A la configuració de la funció, desactiva «Verify JWT» (la protegeix el secret).
5. **Secrets de la funció** (Edge Functions > Secrets):
   - `VAPID_PUBLIC_KEY`: la clau pública
   - `VAPID_PRIVATE_KEY`: la clau privada
   - `VAPID_SUBJECT`: `mailto:el-teu@correu.com`
   - `PP_PUSH_SECRET`: el mateix `SECRET` del pas 3
6. **GitHub:** puja tots els fitxers nous (`sw.js`, `manifest.webmanifest`, les tres icones `.png`, i els actualitzats `app.js`, `index.html`, `config.js`).
7. **Cada mòbil:** obre la web, tria qui ets, prem **Avisos** > **Activar avisos**.
   A l'iPhone, abans cal afegir la web a la pantalla d'inici (Compartir > Afegeix a la pantalla d'inici) i obrir-la des de la icona.

Prova: a Edge Functions > `pp-push` > envia una petició POST amb la capçalera `x-pp-secret: EL_TEU_SECRET` i el cos `{"test": true}`. Si tens els avisos activats, t'arriba una notificació de prova.

Avisos que s'envien: una frase nova que et sumen, que l'altra persona ha respost la pregunta del dia o l'Això o allò, pujar de nivell o que et preparin un premi, i un recordatori a les 20:00 (hora de Madrid) si tens la pregunta pendent o la ratxa en perill.

## Cartes (transport i temps de viatge)

1. A Supabase → SQL Editor, executa `supabase_cartes.sql` (després de tots els anteriors).
2. Substitueix el codi de la Edge Function pel de `pp-push.txt` (o `pp-push/index.ts`) i fes **Deploy** (avisa quan s'envia una carta i quan arriba).
3. Puja els fitxers nous: `app.js`, `index.html`, `styles.css`.
4. Cadascú obre «Cartes» i tria la seva ciutat. Quan hi són les dues, es calcula la distància i el temps de cada transport.

Velocitats: a `app.js`, constant `TRANSPORTS` (km/h, factor de carretera i temps fix de càrrega/aeroport). Es poden canviar lliurement.
Nota: l'ocultació del text d'una carta abans que arribi és només visual; algú amb accés tècnic a la base de dades podria llegir-la.

## Mapa de les cartes
Mentre una carta és en camí es mostra un mapa amb les dues ciutats i la carta avançant. Els continents es carreguen de `cdn.jsdelivr.net` (world-atlas 2.0.2); si no es poden carregar, el mapa es veu igualment amb quadrícula, ruta i marcadors.

## Retrobada, hora de l'altre i càpsules del temps
1. SQL Editor → executa `supabase_extres.sql` (després de `supabase_cartes.sql`; es pot repetir).
2. Substitueix el codi de la Edge Function pel de `pp-push.txt` i fes Deploy.
3. Puja `app.js`, `index.html` i `styles.css`.
- Compte enrere: per defecte l'1 d'agost; es pot canviar des de la web (botó «Canviar la data»).
- Hora de l'altre: surt quan l'altre ha triat la seva ciutat. Les ubicacions antigues s'actualitzen soles amb el seu fus horari.
- Càpsula del temps: es tria com a «transport» en escriure una carta; s'obre el dia i l'hora que triïs (entre 2 minuts i 5 anys).

## Botiga de cupons i Quatre en ratlla
1. SQL Editor → executa `supabase_botiga.sql` (després de `supabase_extres.sql`; es pot repetir).
2. Substitueix el codi de la Edge Function pel de `pp-push.txt` i fes Deploy.
3. Puja `app.js`, `index.html` i `styles.css`.
- Botiga: cadascú afegeix cupons amb preu; l'altre els canvia amb els seus punts (saldo = punts guanyats − gastats; el marcador no baixa). Qui l'ha d'oferir el marca com a «Fet».
- Quatre en ratlla: una partida alhora, per torns; avisos quan toca moure i quan algú guanya. Comença qui ha perdut l'anterior.

## Xat
1. SQL Editor → executa `supabase_xat.sql` (després de `supabase_botiga.sql`).
2. Substitueix el codi de la Edge Function pel de `pp-push.txt` i fes Deploy (avisa de cada missatge nou).
3. Puja `app.js`, `index.html` i `styles.css`.
El xat és plegable, mostra els no llegits i «vist» quan l'altre l'ha obert.

## Calendari de dates assenyalades
1. SQL Editor → executa `supabase_dates.sql` (després de `supabase_xat.sql`). Crea dates d'exemple: Fem mes (19), Sant Valentí, Sant Jordi, Nadal, Cap d'any i Reis.
2. Substitueix el codi de la Edge Function pel de `pp-push.txt` i fes Deploy.
3. Puja `app.js`, `index.html` i `styles.css`.
- Els avisos arriben el mateix dia a les 00:00 hora de Madrid (constant `DATES_HOUR` de la funció) gràcies al cron horari que ja teniu.
- Prova: al SQL Editor, `select public.pp_cron();` només enviarà a les 00:00; per forçar-ho, truca la funció amb `{"cron":true,"dates":true}`.

## Petons (màxim 3 al dia)
1. SQL Editor → executa `supabase_petons.sql` (després de `supabase_dates.sql`; es pot repetir).
2. Substitueix el codi de la Edge Function pel de `pp-push.txt` i fes Deploy.
3. Puja `app.js`, `index.html` i `styles.css`.
- Funciona com les abraçades (donar +1, o demanar i que l'altre el torni: +1 cadascú), i també compta per als nivells i les ratxes.
- Límit: 3 petons iniciats (donats o demanats) per persona i dia, controlat per la base de dades. Tornar un petó demanat no compta. El «dia» és el del mòbil de cada persona.

## Sorpresa: pluja de cors
1. SQL Editor → executa `supabase_sorpresa.sql` (després de `supabase_petons.sql`).
2. Puja `app.js`, `index.html` i `styles.css`. No cal tocar la funció de notificacions: expressament no avisa.
- A la targeta «Sorpresa» s'escriu el missatge (per defecte «T'estimo») i s'envia. L'altra persona la veu la propera vegada que obri l'aplicació (o ja, si la té oberta), una sola vegada.

## Dies sense veure-us
1. SQL Editor → executa `supabase_ultimavegada.sql` (ja posa el 20 d'octubre del 2026 com a última vegada).
2. Puja `app.js` i `styles.css`.
- A la targeta del compte enrere surt, més petit, «11 dies sense veure's» i una barra de progrés fins a la retrobada. Es canvia amb «Canviar les dates».

## El món ara mateix (mapa de dia i nit + temps)
Targeta sota el compte enrere: un mapa amb la nit en directe, les dues ciutats, l'hora i el temps a cadascuna (Open-Meteo). Només cal pujar `app.js`, `index.html` i `styles.css`. Cada persona ha de tenir la seva ciutat guardada a «Cartes».

## Widgets a la pantalla d'inici (iPhone, amb Scriptable)
Una pàgina web no pot crear widgets nadius, però l'app gratuïta **Scriptable** sí que en pot mostrar un amb les teves dades.
1. SQL Editor → executa `supabase_widget.sql`, i després: `select token from public.pp_widget_cfg;` (copia el token, és secret).
2. A l'iPhone, instal·la **Scriptable** (App Store, gratuïta) → botó «+» → enganxa tot el contingut de `widget-scriptable.js`.
3. Omple les línies de dalt: `SUPABASE_URL` i `ANON_KEY` (els de `config.js`), `TOKEN`, `ME` («a» si ets el primer nom, «b» si ets el segon), `NAMES` i `APP_URL`.
4. Pantalla d'inici → mantén premut → «+» → Scriptable → tria mida (petit o mitjà) → toca el widget → «Script» = el teu → «When Interacting: Open URL» opcional.
- També funciona a la pantalla de bloqueig (iOS 16+).
- iOS refresca els widgets quan vol (uns cada 15-60 min), no és en directe al segon.

## Calendari d'advent secret (supabase_advent.sql + advent-editor.html)

Una sorpresa de l'1 al 25 de desembre. Fins a les 00:00 (Madrid) de cada dia la casella **no existeix** per a qui la rep: la base de dades (RLS) no l'envia ni a l'app, ni a l'API, ni a Realtime. Tampoc hi ha cap notificació en escriure-la.

1. SQL Editor: executa `supabase_advent.sql`.
2. Torna a publicar la funció `pp-push` (`pp-push/index.ts`): envia l'avís a les 00:00 Madrid de cada dia (1-25 des.) i t'avisa a tu quan ella obre una casella.
3. Puja `app.js`, `index.html`, `styles.css` i `advent-editor.html` a GitHub.
4. Obre `advent-editor.html` (a la mateixa web, amb la sessió iniciada), comprova a qui van les caselles i escriu-les (o "Omple els buits amb suggeriments" i edita).
5. El missatge viu només a la base de dades, mai al repositori.

A la pantalla d'ella: abans de l'1 de desembre no hi surt res. L'1 apareix la targeta amb les 25 caselles; cada dia s'obre una de nova.

## Pestanyes

L'app s'organitza en 5 pestanyes a la barra de baix: **Inici** (advent, compte enrere, món, calendari), **Punts** (marcador, apuntar frases, premis, botiga), **Jocs** (pregunta del dia, això o allò, Quatre en ratlla), **Missatges** (xat i cartes) i **Mimos** (abraçades, petons, sorpresa). Cada pestanya mostra un puntet amb el que et queda pendent. L'app recorda l'última pestanya oberta.
