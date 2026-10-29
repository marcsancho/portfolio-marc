// Elements that drift a few pixels toward the pointer when it comes close.
const REACH = 90; // px from the element's edge where the pull starts
const PULL = 0.35; // fraction of the pointer offset the element follows
const MAX = 14; // px cap on the drift

export function initMagnetic(selector) {
  const els = [...document.querySelectorAll(selector)];
  if (!els.length) return;

  const reset = () => els.forEach((el) => (el.style.translate = ''));

  window.addEventListener(
    'pointermove',
    (e) => {
      for (const el of els) {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const near = Math.abs(dx) < r.width / 2 + REACH && Math.abs(dy) < r.height / 2 + REACH;
        if (!near) {
          el.style.translate = '';
          continue;
        }
        const x = Math.max(-MAX, Math.min(MAX, dx * PULL));
        const y = Math.max(-MAX, Math.min(MAX, dy * PULL));
        el.style.translate = `${x}px ${y}px`;
      }
    },
    { passive: true }
  );
  document.documentElement.addEventListener('pointerleave', reset);
}
