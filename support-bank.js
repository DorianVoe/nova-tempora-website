(() => {
  // Verify the account holder, bank, IBAN and reference before setting confirmed to true.
  // For an optional verified Swiss QR payment slip, use an image inside images/.
  const bankDetails = {
    confirmed: false,
    accountHolder: 'Nova Tempora',
    bank: 'PostFinance',
    iban: '',
    paymentReference: { de: 'Freiwilliger Förderbeitrag', en: 'Voluntary contribution' },
    qrImage: ''
  };

  const language = document.documentElement.lang.startsWith('en') ? 'en' : 'de';
  const iban = bankDetails.iban.replace(/\s/g, '').toUpperCase();
  const fields = {
    accountHolder: bankDetails.accountHolder.trim(),
    bank: bankDetails.bank.trim(),
    iban: iban.match(/.{1,4}/g)?.join(' '),
    paymentReference: bankDetails.paymentReference[language].trim()
  };

  if (!bankDetails.confirmed || !/^CH\d{2}[A-Z0-9]{17}$/.test(iban) || !Object.values(fields).every(Boolean)) return;

  const imagesDirectory = new URL('images/', document.currentScript.src);
  for (const card of document.querySelectorAll('[data-support-bank]')) {
    for (const [field, value] of Object.entries(fields)) {
      card.querySelector(`[data-bank-field="${field}"]`).textContent = value;
    }
    card.querySelector('[data-bank-pending]').hidden = true;
    card.querySelector('[data-bank-details]').hidden = false;

    if (!bankDetails.qrImage) continue;
    const qrUrl = new URL(bankDetails.qrImage, document.currentScript.src);
    if (qrUrl.origin !== imagesDirectory.origin || !qrUrl.pathname.startsWith(imagesDirectory.pathname)) continue;

    const qrSlot = card.querySelector('[data-bank-qr]');
    const image = document.createElement('img');
    image.alt = qrSlot.dataset.imageAlt;
    image.addEventListener('load', () => { qrSlot.hidden = false; });
    image.src = qrUrl.href;
    qrSlot.append(image);
  }
})();
