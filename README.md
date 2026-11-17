# RouteaM

Aplicació web per entrenar en parella: rutina de 6 dies i 1 de descans (que pots moure cada setmana), exercicis amb dibuixos, tècnica i errors a evitar, versió de gimnàs i de casa, **mode sense pesos externs per defecte**, cronòmetre, dieta segons el pes i seguiment del progrés. Les dades de les dues persones es sincronitzen entre dispositius amb un codi de parella.

## Contingut

- `index.html`: tota l'aplicació en un sol fitxer.
- `netlify/functions/sync.mjs`: la funció que desa i combina les dades (Netlify Blobs).
- `manifest.webmanifest`, `sw.js` i les icones: fan que s'instal·li com una app i funcioni sense cobertura.
- `netlify.toml` i `package.json`: configuració de Netlify.

## 1. Pujar-ho a GitHub

1. Crea un repositori nou a github.com (per exemple `routeam`). Deixa'l **privat**.
2. A la carpeta del projecte, executa:

```bash
git init
git add .
git commit -m "RouteaM"
git branch -M main
git remote add origin https://github.com/EL_TEU_USUARI/routeam.git
git push -u origin main
```

Sense terminal: al repositori nou toca **uploading an existing file** i arrossega tots els fitxers i la carpeta `netlify`.

## 2. Publicar-ho a Netlify

1. A app.netlify.com, **Add new site → Import an existing project → GitHub** i tria el repositori.
2. No cal canviar res: Netlify llegeix `netlify.toml`. Prem **Deploy**.
3. Quan acabi tindràs una adreça tipus `https://nom-aleatori.netlify.app`. Pots canviar el nom a **Site configuration → Change site name** (per exemple `routeam`).

No cal cap variable d'entorn ni cap base de dades: l'emmagatzematge (Netlify Blobs) ve inclòs.

## 3. Sincronitzar els dos mòbils

1. Obre l'adreça al primer dispositiu. Ves a **Perfil → Sincronitzar dispositius**, prem **Generar codi nou** i **Connectar**.
2. Escriu el mateix codi al dispositiu de la teva parella (i als altres que vulgueu).
3. A dalt de tot, cadascú tria el seu perfil. Cada perfil guarda les seves dades a part, així que podeu entrenar a la vegada.

Notes:
- El codi és la clau: qui el tingui pot veure i canviar les vostres dades. Guardeu-lo només vosaltres dos.
- Si dues persones canvien el mateix perfil alhora, es queda l'últim canvi.
- Cada canvi es puja uns segons després, i l'aplicació consulta les novetats cada 30 segons.

## 4. Instal·lar-la al mòbil

- **iPhone (Safari):** Compartir → **Afegir a la pantalla d'inici**.
- **Android (Chrome):** menú → **Instal·lar aplicació**.

Així s'obre a pantalla completa, amb la seva icona, i durant l'entrenament la pantalla no s'apaga. Si perds cobertura al gimnàs, continua funcionant amb l'última còpia i se sincronitza quan tornis a tenir xarxa.

## Material: pes corporal o pesos

Al **Perfil → Material** cadascú tria "Pes corporal (sense pesos externs)", que és el mode per defecte (dominades, remades australianes, fons, flexions, gambades, ponts de glutis, isomètrics…), o "Amb pesos i màquines".

## Provar-ho en local

```bash
npm install -g netlify-cli
npm install
netlify dev
```


## El logo "Powered by Netlify"

El logo/insígnia el posa Netlify sobre la teva pàgina i **no es pot moure des del codi de l'app**.
Per això el cronòmetre deixa un marge a la dreta perquè no el tapi.
Per treure'l: Netlify > el teu projecte > Project configuration > General > "Powered by Netlify badge"
(no sempre disponible als projectes del pla gratuït; cada visitant també el pot amagar des del propi logo).
