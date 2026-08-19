# Van chat-widget naar echte app — analyse drankspellen-app

## Waar we nu staan

Er draaien al vier werkende prototypes als interactieve widgets: Fuck the Dealer (app als dealer), Fuck the Dealer dealer-view (jij ziet de kaart, voert de gok van de ander in), Kingsen met namen en dynamische opdrachten, en Bussen met alle drie de fases. Dat zijn in feite HTML/JavaScript-mini-apps. Dat is goed nieuws: de kortste route naar een echte app bouwt daar direct op voort, want de spellogica is al bedacht en getest in de praktijk.

## Route 1 — Technische opties om er een app van te maken

**PWA (Progressive Web App).** Een website die zich gedraagt als app: je zet 'm op je homescreen, hij werkt fullscreen en (voor 1-telefoonspellen) offline. Geen App Store nodig, geen review, geen 30% commissie, gratis te hosten (Vercel/Netlify). De bestaande widgets zijn al webcode, dus dit is dagen werk, geen maanden. Nadeel: geen zichtbaarheid in de app stores, en op iOS zijn PWA's iets beperkter (o.a. minder soepel met notificaties — voor dit type app irrelevant).

**Web-first, later "wrappen".** Je bouwt de PWA en verpakt exact dezelfde code later met Capacitor (of vergelijkbaar) tot een echte iOS/Android-app voor de stores. Dit is het standaardpad voor dit soort apps: één codebase, wél store-aanwezigheid zodra je die wil.

**Volledig native (Swift/Kotlin) of React Native/Flutter.** Alleen zinvol als je zwaar op animaties, haptics en performance wil zitten. Voor kaartspellen met simpele UI is dit overkill als startpunt, en het gooit alle bestaande code weg.

**Advies:** start als PWA, wrap met Capacitor zodra het aanslaat. Laagste risico, snelste feedbackloop.

## Route 2 — Multiplayer-modellen (het echte ontwerpvraagstuk)

Dit is belangrijker dan de techniekkeuze, want het bepaalt de hele app-structuur.

**Model A: 1 telefoon (pass-the-phone / dealer houdt 'm vast).** Wat je nu al doet. Geen backend, geen accounts, geen verbinding nodig, werkt in elke kroeg en op elke camping. En het lost je focuspunt vanzelf op: er is maar één scherm, dus iedereen kijkt naar hetzelfde ding of naar elkaar. Vrijwel alle succesvolle drink-apps (Picolo, Boom It) draaien op dit model — dat is geen toeval.

**Model B: host-scherm + telefoons als controllers (het Jackbox-model).** Eén scherm (tv via cast, maar net zo goed een laptop of tablet op tafel) toont de gedeelde spelstaat; spelers joinen via een roomcode in hun browser en gebruiken hun telefoon alleen voor input (gokken, stemmen). Dit lost jouw "je hebt niet altijd een tv"-probleem elegant op: het host-scherm is gewoon een webpagina, dus álles met een browser kan host zijn — inclusief één van de telefoons zelf. Focus blijft goed omdat telefoons alleen een knoppenpaneel zijn, geen tweede spelwereld.

**Model C: iedereen eigen scherm via online rooms (roomcode + websockets).** Wat jij "gezamenlijk LAN-potje" noemt, wordt in de praktijk vrijwel nooit als echte LAN gebouwd. Echte lokale verbindingen (Wi-Fi Direct, Bluetooth, mDNS-discovery) zijn op iOS en Android onbetrouwbaar en veel werk. In plaats daarvan doet iedereen: een lichte server (of Firebase/Supabase realtime), roomcode van 4 letters, klaar. Voelt voor de speler als LAN, werkt ook als de helft op 4G zit. Nodig voor spellen met verborgen handen (ieder ziet z'n eigen kaarten). Nadeel: hosting-kosten, meer bugs, en het grootste risico voor jouw focus-eis — zodra iedereen een eigen scherm heeft, verdwijnt de aandacht in de telefoons.

**Advies:** MVP volledig op Model A. Model B als v2 (het is technisch een kleine stap vanaf Model C-infrastructuur en veel indrukwekkender op een feestje). Model C alleen bouwen voor spellen die het écht nodig hebben.

## Focus & aandacht — ontwerpprincipes

Jouw intuïtie klopt en is te vertalen naar concrete regels: één bron van waarheid (één scherm dat de spelstaat toont), telefoon-input zo kort mogelijk (tik één knop, kijk weer op), grote kaartweergave die je van een meter afstand leest, donkere UI voor kroegverlichting, scherm dat aan blijft tijdens het spel (wake lock), en duidelijke beurt-aanwijzing ("Jesper is aan de beurt") met eventueel geluid of trilling. Geen accounts, geen tutorial-schermen, binnen tien seconden van app openen naar spelen. De meerwaarde van de app boven een echt kaartspel moet zichtbaar zijn: bij Fuck the Dealer is dat de teller die laat zien hoeveel van elke waarde nog in het deck zit — dat kan een fysiek kaartspel niet.

## Welke spellen hebben potentie

De criteria: geen verborgen handen (of maximaal één geheim, bij de dealer), de app voegt state-tracking toe die mensen anders moeten onthouden, beurten zijn duidelijk, en input is minimaal. Dan werkt op 1 telefoon:

- **Fuck the Dealer** (beide versies) — al gebouwd, kerntitel.
- **Kingsen / Ring of Fire** — al gebouwd; de regels-tracker en namen-opdrachten zijn precies waar een app waarde toevoegt.
- **Bussen** — al gebouwd; fase 1 en de piramide zijn perfect voor 1 scherm, alleen de busfase heeft één "eigen hand" (oplosbaar met dealer-view zoals bij FtD).
- **Hoger/lager & Rood/zwart** — triviaal te bouwen, ideaal als instapspel.
- **Paardenrace (azenrace)** — vier azen racen op basis van omgedraaide kaarten; extreem visueel, iedereen kijkt naar één scherm, en op een host-scherm (Model B) is dit een showstopper.
- **Boom It-stijl promptspellen** (opdrachten/meest waarschijnlijke met namen) — geen kaarten nodig, puur content; makkelijk uit te breiden met packs. Dit is ook het bewezen verdienmodel van Picolo: gratis basispack, betaalde uitbreidingen.
- **Quizronde** — jij organiseert zelf al een pubquiz voor je vriendengroep, dus een party-quizmodus (één scherm stelt de vraag, evt. later telefoons als buzzer via Model B) ligt in het verlengde en verbreedt de app voorbij alleen drankspellen.

Wat níét werkt op 1 scherm: alles waar meerdere spelers tegelijk een verborgen hand hebben — poker, toepen, eenendertigen, liegen. Die vereisen Model C en zijn een andere, veel zwaardere app. Bewust buiten scope houden voor v1.

## App store-realiteit (belangrijk vóór jullie beginnen)

Drankspellen krijgen in beide stores een hoge leeftijdsclassificatie (17+/18+), en Apple weert apps die overmatig alcoholgebruik aanmoedigen of minderjarigen erbij betrekken. Bestaande apps als Picolo lossen dit op door zichzelf als "party game" te framen, drinkopdrachten neutraler te formuleren en een leeftijdscheck te tonen. Twee praktische gevolgen: houd de toon in teksten aanpasbaar ("neem een slok" vs. "doe X"), en nog een argument voor de PWA-start — op het web gelden die store-regels niet, dus je kan vrij experimenteren en pas bij het wrappen de framing aanscherpen. Check de actuele richtlijnen van Apple en Google op dat moment, want dit beleid verschuift.

## Voorgesteld stappenplan

**MVP (weken 1–3):** PWA met de vier bestaande spellen op Model A, één gedeeld design (donker, grote kaarten, wake lock), spelkeuzemenu, namen invoeren die overal doorwerken. Testen op echte avonden.

**v2:** roomcodes + host-scherm (Model B) voor paardenrace en quiz; Capacitor-wrap naar de stores als de PWA tractie heeft.

**v3:** contentpacks (opdrachten, quizvragen) als uitbreidingen, eventueel betaald; pas dán nadenken over Model C-spellen.

De kerngedachte om aan je vriend mee te geven: de moeilijkheid zit niet in het bouwen van de spellen (die bestaan al), maar in de keuze voor het multiplayer-model — en daar is "één scherm eerst, roomcodes later" de route die elke succesvolle voorganger heeft genomen.
