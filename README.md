# RONDO — voetbalmanager

Een complete voetbalmanager die volledig in de browser draait. Geen server, geen installatie:
open `index.html` en je speelt. Als PWA kun je hem op je beginscherm zetten en offline spelen.

## Wat er in het pakket zit
| bestand | waarvoor |
|---|---|
| `index.html` | het hele spel: engine, data en interface in één bestand |
| `manifest.webmanifest` | maakt er een installeerbare app van (naam, kleuren, iconen) |
| `sw.js` | service worker; bewaart het spel zodat het offline werkt |
| `icon-192.png` · `icon-512.png` · `icon-maskable.png` | app-iconen voor je beginscherm |
| `.nojekyll` | zorgt dat GitHub Pages de bestanden onbewerkt serveert |
| `README.md` | dit bestand |

## Wat er in het spel zit
- 31 competities in 21 landen, inclusief de Keuken Kampioen Divisie — 517 clubs en bijna 15.000 spelers, van de Premier League tot League Two,
  met Turkije, Polen, Schotland, Denemarken, Oostenrijk, Zwitserland, Argentinië, Brazilië en Saoedi-Arabië
- Champions League, Europa League en Conference League in het huidige format (36 clubs, acht duels,
  tussenronde, knock-out) met een vijfjarige coëfficiëntenlijst
- Nationale bekers en supercups per land, UEFA Super Cup, interlandperiodes met eindtoernooi,
  transfermarkt met onderhandelingen, deadline day, huurcontracten, scouting, training, moraal,
  jeugdopleiding, bondscoachcarrière, derby's en publiekssfeer
- Live wedstrijden minuut voor minuut met rustmoment, wissels en tactische bijsturing

## Online zetten via GitHub Pages
1. Maak een nieuwe repository (public), bijvoorbeeld `rondo`.
2. Upload **alle** bestanden uit dit pakket in de hoofdmap — niet alleen `index.html`.
3. Settings → Pages → Source: `Deploy from a branch`, branch `main`, map `/ (root)`.
4. Na een minuut staat het spel op `https://<gebruikersnaam>.github.io/rondo/`.
5. Open die link op je telefoon en kies "Zet op beginscherm".

## Opslag
Het spel bewaart je carrière in de browser (IndexedDB) en heeft drie handmatige slots plus een automatische
veiligheidskopie van vlak vóór elke jaarwisseling.
Saves zijn gzip-verpakt (~0,7 MB). Via Wereld → Opslaan kun je exporteren naar een bestand en
weer importeren — handig om je carrière naar een ander apparaat te verhuizen.

## Eigen clublogo's
Standaard tekent RONDO zelf een embleem per club. Heb je een eigen logopakket, vul dan bij
Wereld → Opslaan → Clublogo's een adres in met `{naam}`, `{slug}` of `{id}` als plek voor de club,
bijvoorbeeld `https://mijnsite.nl/logos/{slug}.png`. Ontbreekt een logo, dan valt het spel
automatisch terug op de eigen tekening.

## Bijwerken
Vervang `index.html` door een nieuwe versie en hoog in `sw.js` het versienummer op
(`const CACHE = "rondo-v12"`), anders blijven bezoekers de oude versie uit hun cache zien.
