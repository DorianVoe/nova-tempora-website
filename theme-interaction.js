(() => {
  const section = document.querySelector('.themes');
  const diagram = section.querySelector('.themes-visual');
  const image = diagram.querySelector('img');
  const cards = [...section.querySelectorAll('.topic-card')];
  const hotspots = [...diagram.querySelectorAll('button')];

  // The original 1448 × 1086 artwork uses slightly elliptical outlines.
  // Use the same measured coordinates for pointer hit testing and the glow.
  const circles = {
    history: { cx: 713, cy: 335, rx: 333, ry: 313 },
    technology: { cx: 449, cy: 696, rx: 318, ry: 310 },
    society: { cx: 972, cy: 696, rx: 321, ry: 310 }
  };
  const svgNamespace = 'http://www.w3.org/2000/svg';
  const overlay = document.createElementNS(svgNamespace, 'svg');
  overlay.setAttribute('class', 'theme-overlay');
  overlay.setAttribute('viewBox', '0 0 1448 1086');
  overlay.setAttribute('aria-hidden', 'true');
  for (const [theme, geometry] of Object.entries(circles)) {
    const ellipse = document.createElementNS(svgNamespace, 'ellipse');
    ellipse.dataset.theme = theme;
    for (const [attribute, value] of Object.entries(geometry)) {
      ellipse.setAttribute(attribute, value);
    }
    overlay.append(ellipse);
  }
  diagram.append(overlay);

  let hovered = '';
  let focused = '';
  let selected = '';
  let pointerType = '';

  function render() {
    section.dataset.activeTheme = hovered || focused || selected;
  }

  function select(theme) {
    selected = selected === theme ? '' : theme;
    for (const button of hotspots) {
      button.setAttribute('aria-pressed', String(button.dataset.theme === selected));
    }
    for (const card of cards) {
      card.querySelector('button').setAttribute('aria-pressed', String(card.dataset.theme === selected));
    }
    render();
  }

  function hover(theme) {
    hovered = theme;
    render();
  }

  function themeAt(event) {
    const bounds = image.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width * 1448;
    const y = (event.clientY - bounds.top) / bounds.height * 1086;
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
  for (const card of cards) {
    const theme = card.dataset.theme;
    enableButton(card.querySelector('button'), theme);
    card.addEventListener('pointerenter', event => {
      if (event.pointerType === 'mouse') hover(theme);
    });
    card.addEventListener('pointerleave', event => {
      if (event.pointerType === 'mouse') hover('');
    });
  }

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
