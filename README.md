# Website Witold Albert Kondera, Architekt

Statische Website für GitHub Pages. Kein Build-Schritt nötig: Ordner hochladen, Pages aktivieren, fertig.

## Struktur
- `index.html` – Startseite, Projektseiten, Impressum und Datenschutz (Routing über `#projekt/<slug>`)
- `assets/js/projekte.js` – alle 24 Projekte und die Orte für die Karte. Neues Projekt = neuer Eintrag hier
- `assets/js/bildformate.js` – Seitenverhältnisse der Bilder für den Kontaktbogen (nach Bildtausch neu erzeugen oder Eintrag anpassen)
- `assets/js/app.js` – Logik (Scroll-Hero, Kontaktbogen, Projektkarte mit Nachbarn, Europakarte, Werdegang, Lightbox, Aufdeck-Effekte)
- `assets/js/hero-lines.js` – die Linien der Hero-Animation, aus dem Rendering berechnet
- `assets/js/europa.js` – Europakarte als vorberechnete Pfade
- `assets/img/` – Bilder als WebP (max. 2000 px)
- `assets/fonts/` – Jost, lokal eingebunden (keine Google-Fonts-Anfrage, DSGVO)

## Bilder tauschen
Datei mit gleichem Namen in `assets/img/` ersetzen, oder neuen Namen in `projekte.js` eintragen.
Die aktuellen Bilder sind aus dem Portfolio-PDF ausgeschnitten und werden durch die Originale ersetzt.

## Offen vor Livegang
- Originalbilder und Bildrechte je Projekt
- Projektnamen, Orte, Zeiträume und Rollen (alle Einträge mit `pruefen: true`)
- Impressum: Kammer-Mitgliedsnummer, Berufshaftpflicht, USt-IdNr.
- Datenschutzerklärung vervollständigen
- Porträt in besserer Auflösung
- Englische Fassung

## Farbwelt (CI)
Zwei Varianten über dieselben Farbwerte in `assets/css/style.css`:
- **Kalkstein** (Standard, warm): `<html lang="de">`
- **Beton** (kühl): `<html lang="de" data-ci="beton">`
Die Hintergründe hinter den Projekten und im Kontaktbereich sind stark weichgezeichnete Renderings aus seinem Portfolio (`bg-*-warm.webp`, `bg-*-kalt.webp`).

## Vor dem Livegang
- In `index.html` die Zeile mit `noindex` entfernen und `robots.txt` löschen (oder auf `Allow: /` setzen)
- Eigene Domain unter Settings > Pages eintragen
