import { prefs } from './prefs.js';
import { initHero } from './hero.js';
import { initConstellation } from './constellation.js';
import { initContact } from './contact.js';
import { initReveal } from './reveal.js';
import { initTilt } from './tilt.js';

initHero({ enabled: prefs.motion && !prefs.narrow });
initContact();
initReveal({ instant: !prefs.motion });

const groups = [...document.querySelectorAll('ul[data-group]')].map((ul) => ({
  name: ul.dataset.group,
  items: [...ul.children].map((li) => ({
    label: li.textContent.trim(),
    size: Number(li.dataset.size),
  })),
}));
initConstellation(document.querySelector('.skills-canvas'), groups, { drift: prefs.motion });

document.documentElement.dataset.pointer = prefs.fine ? 'fine' : 'coarse';

if (prefs.fine && prefs.motion) {
  initTilt('[data-tilt]');

  const hero = document.getElementById('hero');
  hero.addEventListener(
    'pointermove',
    (e) => {
      const r = hero.getBoundingClientRect();
      hero.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
      hero.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
    },
    { passive: true }
  );
}
