const LERP = 0.18;
const INTERACTIVE = 'a, button, [data-tilt]';

export function initCursor() {
  const ring = document.querySelector('.cursor-ring');
  let tx = 0;
  let ty = 0;
  let x = 0;
  let y = 0;
  let frame = 0;

  function tick() {
    x += (tx - x) * LERP;
    y += (ty - y) * LERP;
    ring.style.translate = `${x}px ${y}px`;
    frame = requestAnimationFrame(tick);
  }

  function hide() {
    cancelAnimationFrame(frame);
    frame = 0;
    ring.classList.remove('is-visible', 'is-active');
  }

  addEventListener(
    'pointermove',
    (e) => {
      tx = e.clientX;
      ty = e.clientY;
      if (frame) return;
      x = tx; // first move, or re-entering the page: start under the pointer instead of sweeping in
      y = ty;
      ring.classList.add('is-visible');
      tick();
    },
    { passive: true }
  );
  document.documentElement.addEventListener('pointerleave', hide);

  document.addEventListener('pointerover', (e) =>
    ring.classList.toggle('is-active', !!e.target.closest(INTERACTIVE))
  );
  document.addEventListener('pointerout', (e) => {
    if (!e.relatedTarget?.closest(INTERACTIVE)) ring.classList.remove('is-active');
  });
}
