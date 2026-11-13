/*
  Projektdaten. Reihenfolge = Reihenfolge auf der Seite.
  pruefen: true  -> Name, Ort, Zeitraum, Rolle und Bildrechte noch mit Witold Kondera abstimmen.
  Projekte mit "Arbeitstitel" im Titel haben noch keinen bestätigten Namen.
*/
window.PROJEKTE = [
  {
    slug: "ueberseequartier",
    titel: "Überseequartier",
    ort: "Hamburg",
    nutzung: "Mixed Use",
    zeitraum: "2015–2018",
    status: "Entwurf",
    leistung: "Konzept, Entwurf, Betreuung der externen Architekten",
    rolle: "Leiter Concept Studio Germany, Unibail-Rodamco-Westfield",
    kennzahl: "über 2,26 Mrd. € Baukosten",
    text: [
      "Neues Stadtquartier in der HafenCity mit Handel, Gastronomie, Büro, Wohnen, Hotel und Freiräumen am Wasser.",
      "Mit über 2,26 Milliarden Euro Baukosten das größte Projekt im Werdegang. Schwerpunkte waren das Gesamtkonzept, die Wegeführung durch das Quartier und die Einbindung der Handelsflächen in eine offene Stadtstruktur."
    ],
    bilder: ["uq-1", "uq-2", "uq-3", "uq-4"],
    pruefen: true
  },
  {
    slug: "kaufhof-koe",
    titel: "Kaufhof an der Kö",
    ort: "Düsseldorf",
    nutzung: "Mixed Use",
    zeitraum: "2018–2023",
    status: "Studie",
    leistung: "Konzept, Fassadenstudien, LPH 1–3",
    rolle: "Geschäftsführer SCAx, Signa",
    text: [
      "Umbau eines Warenhauses an der Königsallee zu einem gemischt genutzten Haus.",
      "Vier Fassadenvarianten für den Ergänzungsbau loten aus, wie die neue Ecke neben dem denkmalgeschützten Bestand auftreten kann: von der skulpturalen Glaskrone bis zum ruhigen Weiterbauen."
    ],
    varianten: [
      { bild: "ko-1", name: "Glaskrone" },
      { bild: "ko-2", name: "Dunkler Kubus" },
      { bild: "ko-3", name: "Steinraster" },
      { bild: "ko-4", name: "Lamellen und Arkaden" }
    ],
    bilder: ["ko-1"],
    pruefen: true
  },
  {
    slug: "pasing-arcaden",
    titel: "Pasing Arcaden",
    ort: "München",
    nutzung: "Handel",
    zeitraum: "2003–2014",
    status: "realisiert",
    leistung: "Entwurf und Planung",
    rolle: "Senior Architekt, mfi",
    text: [
      "Shopping-Center im Münchner Westen mit ovalem Atrium über mehrere Ebenen und einem Platz mit Wasserspiel vor dem Eingang.",
      "Das Atrium bündelt Rolltreppen und Blickbeziehungen in einem Raum und macht die Orientierung im Center einfach."
    ],
    bilder: ["pa-1", "pa-2", "pa-3", "pa-4"],
    pruefen: true
  },
  {
    slug: "minto",
    titel: "Minto",
    ort: "Mönchengladbach",
    nutzung: "Handel",
    zeitraum: "2015–2018",
    status: "realisiert",
    leistung: "Konzept, Entwurf, Betreuung der externen Architekten",
    rolle: "Leiter Concept Studio Germany, Unibail-Rodamco-Westfield",
    text: [
      "Innerstädtisches Shopping-Center mit Holzlamellen-Fassade, begrünten Bögen und Lichtbäumen in der Mall.",
      "Innen setzt das Konzept auf Pflanzen, warme Materialien und Aufenthaltsbereiche statt reiner Verkaufsfläche."
    ],
    bilder: ["mi-1", "mi-2", "mi-3", "mi-4"],
    pruefen: true
  },
  {
    slug: "ruhr-park",
    titel: "Ruhr Park",
    ort: "Bochum",
    nutzung: "Handel",
    zeitraum: "2015–2018",
    status: "realisiert",
    leistung: "Konzept und Entwurf",
    rolle: "Leiter Concept Studio Germany, Unibail-Rodamco-Westfield",
    text: [
      "Neuordnung eines der größten Shopping-Center des Ruhrgebiets als offene Einkaufsstraße unter Membrandächern.",
      "Die neue Mall verbindet die Bestandsbauten zu einem Freiraum mit Plätzen, Sitzbereichen und abendlicher Lichtinszenierung."
    ],
    bilder: ["rp-1", "rp-2", "rp-3", "rp-4"],
    pruefen: true
  },
  {
    slug: "erlangen-arcaden",
    titel: "Erlangen Arcaden",
    ort: "Erlangen",
    nutzung: "Handel",
    zeitraum: "2003–2014",
    status: "realisiert",
    leistung: "Entwurf und Planung",
    rolle: "Senior Architekt, mfi",
    text: [
      "Innerstädtisches Shopping-Center über drei Ebenen mit Glasdach über der Mall.",
      "Eines von rund fünfzehn realisierten Arcaden-Projekten, unter anderem in Köln, Düsseldorf, Regensburg, Berlin-Spandau und München-Pasing."
    ],
    bilder: ["erl-1", "erl-2"],
    pruefen: true
  },
  {
    slug: "wohn-und-geschaeftshaus",
    titel: "Wohn- und Geschäftshaus",
    ort: "Ort folgt",
    nutzung: "Wohnen",
    zeitraum: "",
    status: "Entwurf",
    leistung: "Entwurf, Handskizze, Visualisierung",
    rolle: "",
    text: [
      "Blockrandbebauung mit Arkaden im Erdgeschoss, Innenhof und begrünten Dachflächen.",
      "Vom ersten Strich zum Rendering: Die Handskizze legt Proportion, Arkadenrhythmus und Staffelung fest, bevor das Haus im Modell weiterentwickelt wird."
    ],
    bilder: ["wb-1", "sk-1", "wb-2", "wb-3"],
    pruefen: true
  },
  {
    slug: "atrium-und-quartier",
    titel: "Atrium und Quartier",
    ort: "Ort folgt",
    nutzung: "Mixed Use",
    zeitraum: "",
    status: "Entwurf",
    leistung: "Konzept und Entwurf",
    rolle: "",
    text: [
      "Shopping-Center mit gefaltetem Atrium und Oberlicht als Teil eines neuen Quartiers mit Wohnhöfen und Grünzug.",
      "Die Rolltreppen kreuzen sich frei im Luftraum und machen alle Ebenen auf einen Blick erfassbar."
    ],
    bilder: ["ma-1", "ma-2", "ma-3", "ma-4"],
    pruefen: true
  },
  {
    slug: "hochhausstudie",
    titel: "Hochhausstudie",
    ort: "Ort folgt",
    nutzung: "Städtebau",
    zeitraum: "",
    status: "Studie",
    leistung: "Volumenstudie, 3D-Modell",
    rolle: "",
    text: [
      "Massenstudie für ein Hochhaus über einem Blockrand mit Innenhof.",
      "Im weißen Modell werden Höhe, Fugen zwischen Turm und Sockel und die Wirkung im Stadtraum geprüft, bevor über Material gesprochen wird."
    ],
    bilder: ["hh-1", "hh-2", "hh-3", "hh-4"],
    pruefen: true
  },
  {
    slug: "warenhaus-umbau",
    titel: "Warenhaus-Umbau",
    ort: "Ort folgt",
    nutzung: "Mixed Use",
    zeitraum: "2018–2023",
    status: "Studie",
    leistung: "Konzept, Volumenstudien",
    rolle: "Geschäftsführer SCAx, Signa",
    text: [
      "Studie zur Umnutzung eines historischen Warenhauses und zur Nachverdichtung des Blocks.",
      "Varianten von der Aufstockung bis zum gläsernen Neubau im Hof zeigen, wie viel zusätzliche Fläche der Standort verträgt."
    ],
    bilder: ["wu-1", "wu-2", "wu-3", "wu-4"],
    pruefen: true
  },
  {
    slug: "fassaden-im-bestand",
    titel: "Fassaden im Bestand",
    ort: "Ort folgt",
    nutzung: "Handel",
    zeitraum: "",
    status: "Studie",
    leistung: "Fassadenstudien",
    rolle: "",
    text: [
      "Neue Erdgeschossfassaden für Flagship-Stores in einer historischen Häuserzeile.",
      "Die Varianten reichen von der Rekonstruktion der Rundbögen bis zur gläsernen Ornamentfassade und respektieren jeweils die Gliederung der Obergeschosse."
    ],
    bilder: ["fb-1", "fb-2", "fb-3", "fb-4"],
    pruefen: true
  },
  {
    slug: "innenhof-gastronomie",
    titel: "Innenhof mit Gastronomie",
    ort: "Ort folgt",
    nutzung: "Gastronomie",
    zeitraum: "",
    status: "Entwurf",
    leistung: "Konzept, Visualisierung",
    rolle: "",
    text: [
      "Überdachter Innenhof als Restaurant- und Barfläche mit Bäumen, Natursteinpflaster und Lounge-Bereichen.",
      "Der Hof wird zur Adresse des Hauses: tagsüber Café, abends Restaurant."
    ],
    bilder: ["hg-1", "hg-2", "hg-3", "hg-4"],
    pruefen: true
  },
  {
    slug: "markthalle",
    titel: "Markthalle im Bestand",
    ort: "Ort folgt",
    nutzung: "Gastronomie",
    zeitraum: "",
    status: "Studie",
    leistung: "Konzept",
    rolle: "",
    text: [
      "Umnutzung eines Erdgeschosses zur Markthalle mit Gastronomie, Treppenskulptur und Blickbeziehungen über mehrere Ebenen."
    ],
    bilder: ["mh-1", "mh-2", "mh-3"],
    pruefen: true
  },
  {
    slug: "food-court",
    titel: "Food Court",
    ort: "Ort folgt",
    nutzung: "Gastronomie",
    zeitraum: "",
    status: "realisiert",
    leistung: "Entwurf",
    rolle: "",
    text: [
      "Food Court mit Sitzstufen, Pflanzinseln und unterschiedlichen Sitzsituationen von der Bar bis zur Tribüne."
    ],
    bilder: ["fc-1", "fc-2"],
    pruefen: true
  },
  {
    slug: "gastronomie-ebene",
    titel: "Gastronomie-Ebene",
    ort: "Ort folgt",
    nutzung: "Gastronomie",
    zeitraum: "",
    status: "Entwurf",
    leistung: "Konzept, Layout, Visualisierung",
    rolle: "",
    text: [
      "Neue Gastronomie-Ebene in einem Warenhaus mit Lamellendecke, Pflanzinseln und offener Verbindung zu den Rolltreppen.",
      "Die Axonometrie zeigt Möblierung, Theken und Beschilderung als ein zusammenhängendes Layout."
    ],
    bilder: ["ge-1", "ge-2", "ge-3"],
    pruefen: true
  },
  {
    slug: "lobby-und-markt",
    titel: "Lobby und Markt",
    ort: "Ort folgt",
    nutzung: "Mixed Use",
    zeitraum: "",
    status: "Entwurf",
    leistung: "Erdgeschosskonzept, Visualisierung",
    rolle: "",
    text: [
      "Erdgeschoss eines gemischt genutzten Hauses mit Bürolobby, Aufzugshalle und einem kleinen Markt mit Click-and-Collect.",
      "Grüne Fliesen, Sichtbeton und Holz verbinden die Zugänge für Büro und Handel zu einem Raum."
    ],
    bilder: ["ln-1", "ln-2", "ln-3", "ln-4"],
    pruefen: true
  },
  {
    slug: "bueroensemble",
    titel: "Büroensemble",
    ort: "Ort folgt",
    nutzung: "Büro",
    zeitraum: "",
    status: "Entwurf",
    leistung: "Entwurf, Fassade",
    rolle: "",
    text: [
      "Zwei Bürobauten um einen begrünten Hof, mit gefalteter Metallfassade und öffentlichem Erdgeschoss."
    ],
    bilder: ["oc-2", "oc-1", "oc-3"],
    pruefen: true
  },
  {
    slug: "stadthaus",
    titel: "Stadthaus in der Baulücke",
    ort: "Ort folgt",
    nutzung: "Wohnen",
    zeitraum: "",
    status: "Entwurf",
    leistung: "Entwurf, Grundrisse",
    rolle: "",
    text: [
      "Wohn- und Geschäftshaus in einer schmalen Baulücke, mit Laden im Erdgeschoss, gestaffeltem Dach und begrünten Terrassen."
    ],
    bilder: ["st-1", "st-2", "st-3"],
    pruefen: true
  },
  {
    slug: "buero-signa",
    titel: "Büroflächen Signa",
    ort: "Ort folgt",
    nutzung: "Interior",
    zeitraum: "2018–2023",
    status: "realisiert",
    leistung: "Innenraumkonzept",
    rolle: "Geschäftsführer SCAx, Signa",
    text: [
      "Büro mit Holzlamellendecke, Besprechungsräumen hinter Glas und einer Teeküche als Treffpunkt.",
      "Schwarz, Eiche und ein gelber Akzent ziehen sich als Materialkonzept durch alle Räume."
    ],
    bilder: ["so-1", "so-2", "so-3", "so-4"],
    pruefen: true
  },
  {
    slug: "buerolobby",
    titel: "Bürolobby",
    ort: "Ort folgt",
    nutzung: "Interior",
    zeitraum: "",
    status: "Entwurf",
    leistung: "Innenraumkonzept, Grundriss",
    rolle: "",
    text: [
      "Empfang und Lounge eines Bürohauses mit Terrazzo-Theke, Lamellendecke und Think-Tank-Räumen."
    ],
    bilder: ["bo-1", "bo-2", "bo-3"],
    pruefen: true
  },
  {
    slug: "buero-im-altbau",
    titel: "Büro im Altbau",
    ort: "Ort folgt",
    nutzung: "Interior",
    zeitraum: "",
    status: "Entwurf",
    leistung: "Innenraumkonzept",
    rolle: "",
    text: [
      "Büroetage in einem Gründerzeitbau: Stuck, Fischgrätparkett und hohe Fenster bleiben, eingestellte Glasboxen schaffen ruhige Räume."
    ],
    bilder: ["ab-1", "ab-2", "ab-3", "ab-4"],
    pruefen: true
  },
  {
    slug: "empfang-lobby",
    titel: "Empfang und Lobby",
    ort: "Ort folgt",
    nutzung: "Interior",
    zeitraum: "",
    status: "Entwurf",
    leistung: "Innenraumkonzept",
    rolle: "",
    text: [
      "Rundes Empfangsmöbel als Mittelpunkt einer Bürolobby, mit Lichtring und Lamellendecke."
    ],
    bilder: ["ol-1", "ol-2"],
    pruefen: true
  },
  {
    slug: "business-lounge",
    titel: "Business Lounge",
    ort: "Ort folgt",
    nutzung: "Interior",
    zeitraum: "",
    status: "Entwurf",
    leistung: "Innenraumkonzept",
    rolle: "",
    text: [
      "Lounge in einem Gewölbe des Bestands, mit Holzvertäfelung und Besprechungsbereichen."
    ],
    bilder: ["bl-1", "bl-2"],
    pruefen: true
  },
  {
    slug: "arcaden-innenraeume",
    titel: "Arcaden, Mall und Food Court",
    ort: "Ort folgt",
    nutzung: "Handel",
    zeitraum: "2003–2014",
    status: "realisiert",
    leistung: "Entwurf und Planung",
    rolle: "Senior Architekt, mfi",
    text: [
      "Malls, Lichthöfe und Food Courts aus der Reihe der mfi Arcaden: Oberlichter, Galerien über mehrere Ebenen und Gastronomie als Treffpunkt."
    ],
    bilder: ["ai-1", "ai-2", "ai-3", "ai-4"],
    pruefen: true
  }
];

/* Arbeitsorte laut Lebenslauf (Karte) */
window.ORTE = {
  "Hamburg": "Überseequartier",
  "Berlin": "Kudamm 231, Gropius Passagen, Wilma Shoppen, Spandau Arcaden",
  "Düsseldorf": "Kaufhof an der Kö, Düsseldorf Arcaden, Büroumbau KÖ1, Kita Kaldenberger Straße",
  "Köln": "Köln Arcaden, Warenhaus-Umbau",
  "München": "Pasing Arcaden, Warenhaus-Umbau",
  "Erlangen": "Erlangen Arcaden",
  "Regensburg": "Regensburg Arcaden",
  "Leipzig": "Paunsdorf Center",
  "Mönchengladbach": "Minto, Retail Park",
  "Oberhausen": "Food Court Centro, Coca-Cola Oase",
  "Bochum": "Ruhr Park",
  "Essen": "Hochhausprojekte",
  "Dortmund": "Amprion Office",
  "Neu-Isenburg": "Shopping-Center, Neubau und Refurbishment",
  "Stuttgart": "Warenhaus-Umbau",
  "Bad Kreuznach": "Retail Park",
  "Schwerin": "Retail Park",
  "Brandenburg": "Retail Park",
  "Basel": "Globus",
  "London": "Selfridges",
  "Bozen": "Walther Park",
  "Chișinău": "Shopping-Center, Mixed Use, Hochhaus"
};
