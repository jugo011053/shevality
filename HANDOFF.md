# Shevality – Handoff für die nächste KI-Session

Stand: 15.07.2026. Dieses Dokument ist für eine andere KI/Session gedacht, die
hier weiterarbeitet. Der Nutzer (Janik) ist Anfänger – einfach erklären,
auf Deutsch, Handgriffe möglichst selbst übernehmen.

## Repo & Branch

- Repo: `jugo011053/shevality` (öffentlich)
- Aktiver Arbeits-Branch: `claude/shevality-supabase-setup-lgi3xy` (alles bisherige
  ist dort committet und gepusht, sauberer Zustand)
- App-Code liegt unter `app/` (Expo/React Native, SDK 57)
- **Wichtig:** `app/AGENTS.md` sagt: "Expo HAS CHANGED – read the exact
  versioned docs at https://docs.expo.dev/versions/v57.0.0/ before writing any
  code." Das ernst nehmen, nicht aus altem Trainingswissen für Expo coden.

## Was die App ist

Shevality macht frauengeführte Geschäfte in Frankfurt entdeckbar. Drei Tabs:
**Feed**, **Entdecken**, **Sicher** (Sicher = Notrufnummern, unverändert seit
Prototyp-Handoff). Marke: warm, editorial, Beere/Rosé/Pfirsich, Serifen-Display
(YoungSerif) + Hanken Grotesk, runde Karten.

## Wie die App live läuft (wichtig für Weiterarbeit!)

Der Nutzer hat **keine Node/npm-Installation** und arbeitet nur über den
Browser. Die App läuft deshalb **nicht** über Expo Go, sondern als
**statischer Web-Export, deployed über GitHub Pages**:

- Live-URL: **https://jugo011053.github.io/shevality/**
- Die Web-Version liegt im **separaten Branch `gh-pages`** desselben Repos
  (Root-Verzeichnis = `dist/`-Inhalt, plus `.nojekyll`).
- GitHub Pages ist in den Repo-Settings bereits aktiv (Source: "Deploy from a
  branch", Branch `gh-pages` / root). Muss nicht neu eingerichtet werden.

### Build- & Deploy-Ablauf (jedes Mal, wenn sich App-Code ändert)

```bash
cd app
rm -rf dist
npx expo export --platform web     # erzeugt dist/
node scripts/pwa.mjs               # kopiert manifest, sw.js, map.html, icon
                                    # in dist/ und trägt <head>-Tags ein
```

Dann `dist/` in den `gh-pages`-Branch pushen. **Wichtig:** In der vorigen
Session lag dafür ein separater Git-Checkout in einem Sitzungs-Scratchpad
(`/tmp/.../scratchpad/ghpages`) – das existiert in einer neuen Session
**nicht mehr**. Neu einrichten z. B. so:

```bash
# einmalig, in einem Arbeitsverzeichnis außerhalb von app/
git clone <repo-url> /tmp/ghpages-deploy
cd /tmp/ghpages-deploy
git checkout gh-pages
find . -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +
cp -r /pfad/zu/shevality/app/dist/. ./
touch .nojekyll
git add -A
git commit -m "Deploy: <kurze Beschreibung>"
git push origin gh-pages
```

- **Vor jedem Deploy** in `app/web/sw.js` die `CACHE`-Konstante hochzählen
  (z. B. `shevality-v6` → `v7`), sonst bekommen Nutzer alte Dateien aus dem
  Service-Worker-Cache ausgeliefert.
- `app.json` hat `experiments.baseUrl: "/shevality"` – nötig, weil GitHub
  Pages die App unter einem Unterpfad ausliefert (Projekt-Pages, kein
  User-Root). Wenn sich der Deploy-Pfad mal ändert, hier anpassen.
- **Bekannter Stolperstein:** GitHub Pages bricht Deploys manchmal mit
  „Deployment failed, try again later" ab und der Workflow-Run bleibt in der
  Warteschlange hängen. Kein Rerun des alten Runs versuchen – stattdessen
  einen **neuen** Commit auf `gh-pages` pushen (notfalls leerer Commit), das
  löst meist einen sauberen neuen Run aus.
- Nach dem Deploy per GitHub-MCP-Tool (`mcp__github__actions_list`,
  `workflow_runs_filter: {branch: "gh-pages", event: "dynamic"}`) prüfen, ob
  `conclusion: success`. Die Antwort ist oft riesig (>100k Zeichen) – notfalls
  in eine Datei umleiten und mit `python3 -c "import json; ..."` nur `status`/
  `conclusion`/`run_number` extrahieren, nicht die Rohantwort im Kontext
  behalten.

Der Nutzer testet ausschließlich über die Live-URL (Browser + "Zum
Home-Bildschirm hinzufügen" als PWA). Es gibt keinen anderen Testweg, den er
selbst nutzen kann/will.

## Supabase (Datenbank)

- Projekt: **Shevality**, `project_id = sjdlplkcpcwgymmzfchb`, Region
  `eu-central-1` (Frankfurt), Organisation `ajblfjdtxalqakxggysw` (jugo011).
- Zugangsdaten liegen in `app/.env` (im Repo, absichtlich – siehe unten) und
  `app/.env.example` als Vorlage:
  `EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_ANON_KEY`.
- `app/src/lib/supabase.ts` liest diese Variablen; `hasSupabase` ist `false`,
  wenn sie fehlen.
- `app/src/data/businesses.ts`: `fetchBusinesses()` lädt aus Supabase, fällt
  bei Fehler/keiner Konfiguration auf `BUSINESSES` aus `app/src/data/constants.ts`
  zurück (eingebaute Sicherheitskopie – **muss inhaltlich mit der DB
  übereinstimmen**, wird aktuell manuell synchron gehalten).
- Tabelle `businesses`, Schema in `app/db/schema.sql`, Seed in
  `app/db/seed.sql` (SQL ist idempotent, `on conflict do nothing`). Spalten
  u. a.: `id, name, category, neighborhood, address, hours, image, website,
  description, lat, lng, owner, rechtsform, source, founded, ownership,
  leadership, verified`. RLS: öffentliches Lesen erlaubt (`Public read
  businesses`-Policy), kein Schreiben von außen möglich – anon-Key ist absichtlich
  öffentlich im Repo, das ist ok (Schutz kommt über die RLS-Policy, nicht über
  Geheimhaltung des Keys).
- **Kostenlos-Tarif-Falle:** Das Projekt geht nach Inaktivität in
  `INACTIVE`/Ruhezustand, dann timen `execute_sql`/`apply_migration` aus. Falls
  das passiert: `mcp__Supabase__get_project` prüft Status,
  `mcp__Supabase__restore_project` weckt es auf (dauert ~30–60 Sek.), danach
  klappt SQL wieder normal.
- Aktuell 20 echte Läden eingepflegt (IDs `g1, g3, g4, g5, g6, g7, g10, g65,
  g344, g463, g545, g710, g1229, g107, g412, g432, g627, g724, g759, g826`),
  13 davon `verified = true`, 7 `verified = false` ("Kandidatin/ungeprüft").
  Quelle: Impressum-Angaben, geprüft 13./14.07.2026 vom Nutzer.

### Wichtige Datenethik-Regel (bitte beibehalten!)

Nur **"von einer Frau geleitet" (`leadership`)** wird behauptet – das ist per
Impressum belegt. **`founded`/`ownership` bleiben `false`/offen**, weil sie
laut Nutzer-Quelle *nicht* geprüft sind. Bei `verified = false` (7 Läden)
zeigt die App sichtbare "ungeprüft"-Hinweise (Detailseite: Warnbox; Liste:
gelbes "?"-Badge statt lila "✓"). Wenn neue Läden dazukommen: diese
Unterscheidung nicht aufweichen, sonst werden unbelegte Tatsachenbehauptungen
über echte, namentlich genannte Personen gemacht.

## Frankfurt-Karte

- `app/web/map.html`: eigenständige Leaflet-Seite (kein React), OSM-Standard-
  Kacheln (nicht CARTO – kam beim Nutzer nicht durch, siehe Commit-History).
  Enthält ein **hardcodiertes `PLACES`-Array** mit den 20 Läden (Name,
  Kategorie, Viertel, lat/lng, `v` = verified, Inhaberin, Website).
- Auf Nutzerwunsch **bewusst nicht live aus der DB** geladen (Entscheidung
  vom 15.07., um es einfach zu halten). Wenn sich Läden/Koordinaten ändern,
  `PLACES` in `map.html` manuell nachziehen.
- `app/src/screens/MapScreen.tsx` bettet `map.html` im Web per `<iframe>` ein
  (`Platform.OS === 'web'`), native Plattformen zeigen einen Hinweistext (kein
  natives Karten-SDK eingebunden).
- `app/scripts/pwa.mjs` kopiert `map.html` mit in den `dist/`-Build – beim
  Ändern von `map.html` **muss** dieses Skript erneut laufen, sonst landet die
  alte Version im Deploy.

## Navigation (Stand jetzt)

- **Entdecken-Tab**: `EntdeckenHome` = Karte (`MapScreen`, Standardansicht),
  `EntdeckenList` = Liste mit Suche/Filter (`EntdeckenScreen`),
  `BusinessDetail` = Detailseite. Wechsel über Buttons ("Liste" oben auf der
  Karte, "🗺️ Karte" oben auf der Liste).
- **Feed-Tab**: `FeedHome` (`FeedScreen`), `Gemerkt` (`GemerktScreen`, über
  Lesezeichen-Icon im Feed-Header erreichbar). Es gibt **keinen** `StoryDetail`-
  Screen mehr für Feed-Posts – die Karten sind jetzt selbsttragend (kein
  Antippen zum Weiterlesen), nur "Teilen"/"Merken".
- Typen dazu in `app/src/navigation/types.ts`.

## Feed (Stufe 5, mehrfach überarbeitet)

- Daten: `app/src/data/feed.ts` – `FEED_POSTS` (Array, ~17 Posts: 15 vom
  Nutzer geliefert + 2 ergänzte Prototyp-Karten für `global_lokal`/`portrait`,
  da der Nutzer dafür keine Beispieldaten hatte). Zweisprachig (`Bi = {de,
  en}` überall). `FEED_ACCENT` = Akzentfarbe je Rubrik. `mixFeed()` verteilt
  Kartentypen gleichmäßig, `orderFeed()` erzwingt danach die Rhythmusregel
  für `rueckschritt` (nie zwei hintereinander, max. jede 3. Karte).
- Rendering: `app/src/components/feed2/FeedCards.tsx` – sechs Kartentypen
  (`zahl`, `global_lokal`, `portrait`, `neu_gelistet`, `event`,
  `rueckschritt`), jeweils eigene Silhouette + Akzentfarbe + Bild. `zahl`-
  Karten haben optional eine `ZahlViz` (Vergleichsbalken `compare` oder
  direkt beschrifteter Richtungs-Chip `delta` – **keine** Balken mit
  Referenz-Strich + Legende mehr, das wurde vom Nutzer explizit verworfen).
- **Pflichtregel im Code**: `rueckschritt`-Karten werfen einen Fehler, wenn
  `handlung` fehlt (bewusst, laut Spezifikation – nicht "reparieren" durch
  stillschweigendes Weglassen der Karte).
- Bilder: aktuell Unsplash-Stockfotos als Platzhalter (`IMG`-Objekt in
  `feed.ts`), keine echten Fotos der Läden. `ArchImage`-Komponente hat
  eingebauten Streifen-Fallback, falls eine Bild-URL nicht lädt.
- Teilen: `app/src/lib/shareImage.ts` zeichnet im Web ein Canvas-PNG (Marke,
  Akzentfarbe, Zahl/Aussage, Quelle, Wordmark) und teilt es per
  `navigator.share({files})`, Fallback: PNG-Download bzw. Text-Zwischenablage.
  **Ungetestet vom Nutzer** (letzter Stand vor diesem Handoff) – als Erstes
  prüfen, ob das Bild gut aussieht (Schriftarten im Canvas laden ggf. nicht
  zuverlässig, das ist der wackligste Teil).
- "Gemerkt" sammelt gemerkte Feed-Posts **und** gemerkte Läden (Zustand in
  `app/src/state/AppState.tsx`, ein gemeinsamer `saves`-Record, Schlüssel ist
  jeweils die Post- bzw. Business-ID – kein Konflikt, da IDs sich nicht
  überschneiden, aber darauf achten, falls neue ID-Räume entstehen).

## Offene Punkte / nächste sinnvolle Schritte

1. **Teilen-Bild vom Nutzer noch nicht bestätigt.** Das war die letzte
   Baustelle vor diesem Handoff – zuerst nachfragen, ob es beim Nutzer gut
   aussieht, dann ggf. Canvas-Layout nachjustieren.
2. Echte Fotos für die Läden (aktuell Stockfotos/Streifenmuster).
3. `neu_gelistet` bzw. der Feed generell könnte später aus der DB gespeist
   werden (bewusst noch nicht gemacht, siehe Karten-Entscheidung oben).
4. Perspektivisch weitere Städte – Datenmodell (Stadtteil-Feld, `map.html`
   PLACES) ist darauf nicht hart vorbereitet, nur Frankfurt-spezifisch.
5. Kein automatisierter CI-Deploy – jeder Deploy ist ein manueller Push auf
   `gh-pages`, wie oben beschrieben. Bei Bedarf könnte man das als GitHub
   Actions Workflow automatisieren (aktuell nicht eingerichtet).

## Wie mit dem Nutzer kommunizieren

- Deutsch, einfach erklären, Anfänger-Niveau. Er hat keine Entwicklungsumgebung
  lokal (keine Admin-Rechte auf seinem ThinkPad) – alles muss über die
  Cloud-Session laufen und am Ende als Live-URL ankommen.
- Bei Design-/Produktentscheidungen mit mehreren sinnvollen Optionen: aktiv
  nachfragen (er antwortet gerne konkret und mit klarer Meinung), nicht
  einfach annehmen.
- Bei Datenfragen zu echten, namentlich genannten Personen (Inhaberinnen):
  vorsichtig sein, siehe Datenethik-Regel oben.
