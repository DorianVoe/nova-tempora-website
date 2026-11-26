(() => {
  const section = document.querySelector('.themes');
  const diagram = section.querySelector('.themes-visual');
  const image = diagram.querySelector('.themes-image');
  const imageWidth = Number(image.getAttribute('width'));
  const imageHeight = Number(image.getAttribute('height'));
  const cards = [...section.querySelectorAll('.topic-card')];
  const hotspots = [...diagram.querySelectorAll('.theme-hotspot')];
  const cardButtons = cards.map(card => card.querySelector('.topic-button'));

  // The 1254 × 1254 artwork uses slightly elliptical outlines.
  // Use the same measured coordinates for hit testing and the focus outlines.
  const circles = {
    history: { cx: 623, cy: 395, rx: 299, ry: 306 },
    technology: { cx: 401, cy: 770, rx: 293, ry: 293 },
    society: { cx: 844, cy: 770, rx: 293, ry: 293 }
  };
  for (const hotspot of hotspots) {
    const { cx, cy, rx, ry } = circles[hotspot.dataset.theme];
    hotspot.style.left = `${(cx - rx) / imageWidth * 100}%`;
    hotspot.style.top = `${(cy - ry) / imageHeight * 100}%`;
    hotspot.style.width = `${2 * rx / imageWidth * 100}%`;
    hotspot.style.height = `${2 * ry / imageHeight * 100}%`;
  }

  let hovered = '';
  let focused = '';
  let selected = '';
  let pointerType = '';
  let active = '';

  function render() {
    const theme = hovered || focused || selected;
    if (theme === active) return;
    active = theme;
    for (const element of [...hotspots, ...cards]) {
      element.classList.toggle('is-active', element.dataset.theme === active);
    }
  }

  function select(theme) {
    selected = selected === theme ? '' : theme;
    for (const button of hotspots) {
      button.setAttribute('aria-pressed', String(button.dataset.theme === selected));
    }
    cards.forEach((card, index) => {
      cardButtons[index].setAttribute('aria-pressed', String(card.dataset.theme === selected));
    });
    render();
  }

  function hover(theme) {
    hovered = theme;
    render();
  }

  function themeAt(event) {
    const bounds = image.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width * imageWidth;
    const y = (event.clientY - bounds.top) / bounds.height * imageHeight;
    const matches = Object.entries(circles).filter(([, { cx, cy, rx, ry }]) =>
      ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1
    );
    // Shared areas are neutral: there is no unique circle to activate there.
    return matches.length === 1 ? matches[0][0] : '';
  }

  section.addEventListener('pointerdown', event => {
    pointerType = event.pointerType;
  });

  function isTapOrKeyboard(event) {
    return event.detail === 0 || (event.pointerType || pointerType) !== 'mouse';
  }

  function enableButton(button, theme) {
    button.hidden = false;
    button.disabled = false;
    button.addEventListener('focus', () => {
      if (button.matches(':focus-visible')) {
        focused = theme;
        hover('');
      }
    });
    button.addEventListener('blur', () => {
      focused = '';
      render();
    });
    button.addEventListener('click', event => {
      event.stopPropagation();
      if (isTapOrKeyboard(event)) select(theme);
    });
  }

  for (const button of hotspots) enableButton(button, button.dataset.theme);
  cards.forEach((card, index) => {
    const theme = card.dataset.theme;
    enableButton(cardButtons[index], theme);
    card.addEventListener('pointerenter', event => {
      if (event.pointerType === 'mouse') hover(theme);
    });
    card.addEventListener('pointerleave', event => {
      if (event.pointerType === 'mouse') hover('');
    });
  });

  diagram.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse') return;
    const theme = themeAt(event);
    diagram.classList.toggle('is-over-theme', Boolean(theme));
    hover(theme);
  });
  diagram.addEventListener('pointerleave', event => {
    if (event.pointerType !== 'mouse') return;
    diagram.classList.remove('is-over-theme');
    hover('');
  });
  diagram.addEventListener('click', event => {
    if (!isTapOrKeyboard(event)) return;
    const theme = themeAt(event);
    if (theme) select(theme);
  });
})();
