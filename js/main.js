import { prefs } from './prefs.js';

document.documentElement.dataset.pointer = prefs.fine ? 'fine' : 'coarse';

if (prefs.fine && prefs.motion) {
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
