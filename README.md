# El que el bàsquet ha juntat

Web estàtica (HTML + CSS + JS) amb Supabase de base de dades i GitHub Pages per publicar-la.

## Posar-ho en marxa

1. **Supabase**: crea un projecte nou (millor no el del fantasy, perquè al pas 3 es tanquen els registres).
2. **Taules**: SQL Editor > New query > enganxa tot `supabase.sql` > Run.
3. **Només vosaltres dos**: Authentication > Sign In / Providers > Email: desactiva "Allow new users to sign up".
   Després Authentication > Users > Add user > Create new user, dues vegades (el vostre correu i contrasenya, amb "Auto Confirm User" activat).
4. **Claus**: Project Settings > API (o Data API). Copia la Project URL i la clau `anon` / `publishable` dins de `config.js`.
5. **GitHub**: crea un repositori, puja tots els fitxers d'aquesta carpeta (`index.html`, `styles.css`, `app.js`, `config.js`).
   Settings > Pages > Deploy from a branch > `main` / root.
6. Obre la URL que et dona GitHub Pages (`https://USUARI.github.io/REPO/`), entra amb el teu correu i poseu els dos noms.

## Canviar coses

- Punts i categories: `CATS` al principi de `app.js`.
- Reptes setmanals: llista `CHALL`.
- Punts per nivell: `STEP`.
- Colors: variables al principi de `styles.css`.
