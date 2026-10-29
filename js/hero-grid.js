// Background grid for the hero: lines bend away from the pointer and light up around it.
const CELL = 48; // px between grid lines
const STEP = 16; // px between samples along a line (smaller = smoother bend)
const REACH = 180; // px radius of the pointer's influence
const PUSH = 22; // px of maximum displacement
const GLOW = 240; // px radius of the highlight
const EASE = 0.12; // pointer smoothing per frame

export function initHeroGrid(canvas, { animate }) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const mint = getComputedStyle(document.documentElement).getPropertyValue('--mint').trim();
  const host = canvas.parentElement;

  let w = 0;
  let h = 0;
  let target = null; // where the pointer is
  let p = null; // where the grid thinks it is (eased)
  let raf = 0;

  function layout() {
    const dpr = window.devicePixelRatio || 1;
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw();
  }

  // Displacement of a grid point: pushed radially away from the pointer, fading with distance.
  function offset(x, y) {
    if (!p) return [0, 0];
    const dx = x - p.x;
    const dy = y - p.y;
    const d = Math.hypot(dx, dy) || 1;
    const k = (PUSH * Math.exp(-((d / REACH) ** 2))) / d;
    return [dx * k, dy * k];
  }

  function tracePath() {
    ctx.beginPath();
    for (let x = CELL; x < w; x += CELL) {
      for (let y = 0; y <= h; y += STEP) {
        const [ox, oy] = offset(x, y);
        y === 0 ? ctx.moveTo(x + ox, y + oy) : ctx.lineTo(x + ox, y + oy);
      }
    }
    for (let y = CELL; y < h; y += CELL) {
      for (let x = 0; x <= w; x += STEP) {
        const [ox, oy] = offset(x, y);
        x === 0 ? ctx.moveTo(x + ox, y + oy) : ctx.lineTo(x + ox, y + oy);
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    ctx.lineWidth = 1;
    tracePath();
    ctx.globalAlpha = 0.06;
    ctx.strokeStyle = '#fff';
    ctx.stroke();
    if (!p) return;
    // Second pass: the same path stroked with a radial gradient centred on the pointer.
    const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, GLOW);
    glow.addColorStop(0, mint);
    glow.addColorStop(1, 'transparent');
    ctx.globalAlpha = 0.55;
    ctx.strokeStyle = glow;
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  function tick() {
    if (!target) {
      p = null;
      draw();
      raf = 0;
      return;
    }
    p = p ?? { ...target };
    p.x += (target.x - p.x) * EASE;
    p.y += (target.y - p.y) * EASE;
    draw();
    const settled = Math.abs(target.x - p.x) + Math.abs(target.y - p.y) < 0.2;
    raf = settled ? 0 : requestAnimationFrame(tick);
  }

  const wake = () => {
    if (!raf) raf = requestAnimationFrame(tick);
  };

  if (animate) {
    host.addEventListener(
      'pointermove',
      (e) => {
        const r = canvas.getBoundingClientRect();
        target = { x: e.clientX - r.left, y: e.clientY - r.top };
        wake();
      },
      { passive: true }
    );
    host.addEventListener('pointerleave', () => {
      target = null;
      wake();
    });
  }

  new ResizeObserver(layout).observe(host);
}
