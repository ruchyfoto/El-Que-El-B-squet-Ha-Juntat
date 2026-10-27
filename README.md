# El que el bàsquet ha juntat

Web estàtica (HTML + CSS + JS) amb Supabase de base de dades i GitHub Pages per publicar-la.

## Posar-ho en marxa

1. **Supabase**: pots fer servir el mateix projecte que el fantasy. Les taules d'aquesta web comencen per `pp_` i no es toquen amb les altres.
2. **Taules**: SQL Editor > New query > enganxa `supabase.sql`. Abans de donar a Run, canvia els dos correus de la línia `insert into public.pp_allowed` pels vostres.
2b. **Jocs diaris**: executa també `supabase_jocs.sql` de la mateixa manera (si ja havies executat `supabase.sql`, executa només aquest).
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
