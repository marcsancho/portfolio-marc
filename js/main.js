import { prefs } from './prefs.js';
import { initHero } from './hero.js';
import { initHeroGrid } from './hero-grid.js';
import { initMagnetic } from './magnetic.js';
import { initConstellation } from './constellation.js';
import { initContact } from './contact.js';
import { initReveal } from './reveal.js';
import { initTilt } from './tilt.js';
import { initCursor } from './cursor.js';

initHero({ enabled: prefs.motion && !prefs.narrow });
initContact();
initReveal({ instant: !prefs.motion });

const groups = [...document.querySelectorAll('ul[data-group]')].map((ul) => ({
  name: ul.dataset.group,
  items: [...ul.children].map((li) => ({
    label: li.textContent.trim(),
    size: Number(li.dataset.size),
    note: li.dataset.note,
  })),
}));
initConstellation(document.querySelector('.skills-canvas'), groups, {
  drift: prefs.motion,
  detail: document.querySelector('.skills-detail'),
});

document.documentElement.dataset.pointer = prefs.fine ? 'fine' : 'coarse';
initHeroGrid(document.querySelector('.hero-canvas'), { animate: prefs.fine && prefs.motion });

if (prefs.fine && prefs.motion) {
  initTilt('[data-tilt]');
  initMagnetic('.hero-actions .btn');
  initCursor();
}
