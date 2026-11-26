# nova-tempora-website
Official website of Nova Tempora – History, Technology &amp; Society

## Online-Mitgliedschaft freischalten

Die Antragsseiten liegen in `mitglied-werden.html` und `en/join.html`. Solange
`membershipEndpoint` in `membership.js` leer ist, bleibt der Versand auf
beiden Seiten gesperrt.

1. Im [Form.taxi-Panel](https://form.taxi/panel/) ein separates Formular für
   Mitgliedschaftsanträge anlegen und die Benachrichtigung an das dafür vorgesehene
   Vereinspostfach einrichten. Die bestehende Kontaktverbindung bleibt unverändert.
2. Die zugewiesene HTTPS-Übermittlungsadresse aus den Verbindungsdetails in
   `membership.js` bei `membershipEndpoint` eintragen. Beide Sprachen nutzen
   dieselbe Verbindung. Der Code akzeptiert URLs im Format
   `https://form.taxi/s/<Formularcode>` und weist den Kontakt-Endpunkt zurück.
3. Die standardmässige Eingangsbestätigung von Form.taxi verwenden oder eine
   gleichwertige Meldung konfigurieren, die ausschliesslich den Eingang
   bestätigt. Die Aufnahme bestätigt der Vorstand separat. Das Feld `_lang`
   übermittelt für die Systemmeldungen `de` beziehungsweise `en`.
4. Nach Freigabe je einen Testantrag mit Testdaten über die deutsche und englische
   Seite senden. Zustellung, Feldwerte und Bestätigung in beiden Sprachen prüfen.

Details zur [Einrichtung](https://docs.form.taxi/en/form-setup) und
[Sprachoption](https://docs.form.taxi/en/functional-fields) stehen in der
Dokumentation von Form.taxi.
