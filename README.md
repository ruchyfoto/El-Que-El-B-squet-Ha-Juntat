# El que el bàsquet ha juntat

Web estàtica (HTML + CSS + JS) amb Supabase de base de dades i GitHub Pages per publicar-la.

## Posar-ho en marxa

1. **Supabase**: pots fer servir el mateix projecte que el fantasy. Les taules d'aquesta web comencen per `pp_` i no es toquen amb les altres.
2. **Taules**: SQL Editor > New query > enganxa `supabase.sql`. Abans de donar a Run, canvia els dos correus de la línia `insert into public.pp_allowed` pels vostres.
2b. **Jocs diaris**: executa també `supabase_jocs.sql` de la mateixa manera (si ja havies executat `supabase.sql`, executa només aquest).
2c. **Colors**: executa també `supabase_colors.sql` (perquè cadascú pugui triar el seu color).
3. **Usuaris**: Authentication > Users > Add user > Create new user, dues vegades, amb aquests mateixos correus, una contrasenya i "Auto Confirm User" activat.
   No cal desactivar els registres: només els correus de `pp_allowed` poden llegir i escriure les dades.
4. **Claus**: Project Settings > API. Copia la Project URL i la clau `anon` / `publishable` dins de `config.js` (si fas servir el projecte del fantasy, són les mateixes).
5. **GitHub**: crea un repositori, puja `index.html`, `styles.css`, `app.js` i `config.js`. Settings > Pages > Deploy from a branch > `main` / root.
6. Obre `https://USUARI.github.io/REPO/`, entra amb el teu correu i poseu els dos noms.

## Canviar coses

- Punts i categories: `CATS` al principi de `app.js`.
- Reptes setmanals: llista `CHALL`.
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
