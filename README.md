# nova-tempora-website
Official website of Nova Tempora – History, Technology &amp; Society

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
