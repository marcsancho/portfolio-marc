const clamp = (v, max) => Math.max(-max, Math.min(max, v));

// `data-tilt="8"` overrides the default maximum angle for that element.
export function initTilt(selector, { max = 4 } = {}) {
  document.querySelectorAll(selector).forEach((el) => {
    const limit = Number(el.dataset.tilt) || max;
    let rect;
    const set = (rx, ry, gx, gy) => {
      el.style.setProperty('--rx', `${rx}deg`);
      el.style.setProperty('--ry', `${ry}deg`);
      el.style.setProperty('--gx', `${gx}%`);
      el.style.setProperty('--gy', `${gy}%`);
    };

    el.addEventListener('pointerenter', () => {
      rect = el.getBoundingClientRect();
    });
    el.addEventListener(
      'pointermove',
      (e) => {
        if (!rect) return;
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        set(
          clamp((0.5 - py) * 2 * limit, limit),
          clamp((px - 0.5) * 2 * limit, limit),
          px * 100,
          py * 100
        );
      },
      { passive: true }
    );
    el.addEventListener('pointerleave', () => set(0, 0, 50, 50));
  });
}
