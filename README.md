# nova-tempora-website
Official website of Nova Tempora – History, Technology &amp; Society

## CSS-Cache bei Veröffentlichungen

Die aktiven HTML-Seiten binden `styles.css` und `site-extras.css` mit
`?v=` und einem kurzen Inhalts-Hash ein. Nach CSS-Änderungen die ersten zwölf
Zeichen des SHA-256-Hashes der betreffenden Datei in den zugehörigen Links
aller Sprachseiten aktualisieren. So laden die neuen HTML-Seiten das neue
CSS auch dann, wenn die alte URL noch im Browsercache liegt.

## Online-Mitgliedschaft

`mitglied-werden.html` und `en/join.html` senden UTF-8-kodierte Anträge per
POST an die separate Form.taxi-Verbindung, die in `membership.js` bei
`membershipEndpoint` hinterlegt ist. Die Einstellungen zur Benachrichtigung
werden im [Form.taxi-Panel](https://form.taxi/panel/) verwaltet.

`_lang` bestimmt die Sprache der Form.taxi-Systemmeldungen. Nach erfolgreicher
Übermittlung verweist `_next` auf die Eingangsbestätigung in der Sprache des
Formulars. Die Aufnahme bestätigt der Vorstand separat per E-Mail.

Die [Form.taxi-Dokumentation](https://docs.form.taxi/en/functional-fields)
erklärt beide Formularfelder.

## Bankverbindung für freiwillige Förderbeiträge

Die Einstellungen in `support-bank.js` gelten für die Vereins- und Anmeldeseiten
in beiden Sprachen. Bis zur Freigabe steht dort nur «Bankverbindung folgt in Kürze.».

1. `accountHolder` und `bank` anhand der Kontoeröffnungsunterlagen prüfen und
   die bestätigte Schweizer IBAN in `iban` eintragen. `paymentReference` enthält
   den Zahlungszweck auf Deutsch und Englisch.
2. Optional den geprüften Swiss-QR-Zahlteil als Bild im Ordner `images/` ablegen
   und den Pfad ab der Website-Wurzel ohne führenden Schrägstrich in `qrImage`
   eintragen. Ohne Eintrag werden nur die Bankdaten angezeigt.
3. Erst nach Prüfung aller Angaben `confirmed` auf `true` setzen. Die Karte auf
   allen vier Seiten vor der Veröffentlichung kontrollieren.
