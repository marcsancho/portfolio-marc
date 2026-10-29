const RADIUS = { 1: 5, 2: 8, 3: 12 };
const AMPLITUDE = 12; // px of sinusoidal wander around each node's home point
const HIT_SLOP = 8; // px beyond the node radius that still counts as hovering it
const DIM_ALPHA = 0.35;
const LINE_ALPHA = 0.6;

export function initConstellation(canvas, groups, { drift }) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const css = getComputedStyle(document.documentElement);
  const color = (name) => css.getPropertyValue(name).trim();
  const [mint, mintLight, teal, text, bg, mono] = [
    '--mint',
    '--mint-light',
    '--teal',
    '--text',
    '--raised',
    '--font-mono',
  ].map(color);

  // Offsets are unit-disc fractions, so layout rescales with the canvas.
  const nodes = groups.flatMap((group, g) =>
    group.items.map((item) => {
      const a = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random());
      return {
        g,
        label: item.label,
        radius: RADIUS[item.size] ?? RADIUS[1],
        ox: Math.cos(a) * r,
        oy: Math.sin(a) * r,
        phase: Math.random() * Math.PI * 2,
        speed: 0.6 + Math.random() * 0.8,
        hx: 0,
        hy: 0,
        x: 0,
        y: 0,
      };
    })
  );

  let w = 0;
  let h = 0;
  let groupR = 0;
  let pointer = null;
  let visible = true;
  let raf = 0;

  function layout() {
    const dpr = window.devicePixelRatio || 1;
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // Margin keeps wander (AMPLITUDE) and the biggest node inside the canvas.
    const margin = AMPLITUDE + RADIUS[3] + 4;
    groupR = Math.min(w, h) * 0.16;
    const rx = Math.max(0, w / 2 - margin - groupR);
    const ry = Math.max(0, h / 2 - margin - groupR);
    for (const n of nodes) {
      const a = -Math.PI / 2 + (n.g * Math.PI * 2) / groups.length;
      n.hx = w / 2 + Math.cos(a) * rx + n.ox * groupR;
      n.hy = h / 2 + Math.sin(a) * ry + n.oy * groupR;
    }
  }

  function draw(t = 0) {
    ctx.clearRect(0, 0, w, h);
    for (const n of nodes) {
      n.x = n.hx + Math.sin(t * 0.0004 * n.speed + n.phase) * AMPLITUDE;
      n.y = n.hy + Math.cos(t * 0.0003 * n.speed + n.phase * 1.7) * AMPLITUDE;
    }

    let hovered = null;
    if (pointer) {
      let best = Infinity;
      for (const n of nodes) {
        const d = Math.hypot(n.x - pointer.x, n.y - pointer.y);
        if (d <= n.radius + HIT_SLOP && d < best) [hovered, best] = [n, d];
      }
    }
    const alphaOf = (g) => (hovered && hovered.g !== g ? DIM_ALPHA : 1);

    ctx.strokeStyle = teal;
    ctx.lineWidth = 1;
    const reach = groupR * 2 + 30;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        if (a.g !== b.g) continue;
        const near = 1 - Math.hypot(a.x - b.x, a.y - b.y) / reach;
        if (near <= 0) continue;
        ctx.globalAlpha = near * LINE_ALPHA * alphaOf(a.g);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }

    for (const n of nodes) {
      ctx.globalAlpha = alphaOf(n.g);
      ctx.fillStyle = n === hovered ? mintLight : mint;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalAlpha = 1;
    if (hovered) {
      ctx.font = `13px ${mono}`;
      ctx.textBaseline = 'middle';
      const width = ctx.measureText(hovered.label).width;
      const gap = hovered.radius + 6;
      const flip = hovered.x + gap + width > w; // keep the label inside the canvas
      ctx.textAlign = flip ? 'right' : 'left';
      const x = hovered.x + (flip ? -gap : gap);
      ctx.lineWidth = 4;
      ctx.lineJoin = 'round';
      ctx.strokeStyle = bg;
      ctx.strokeText(hovered.label, x, hovered.y);
      ctx.fillStyle = text;
      ctx.fillText(hovered.label, x, hovered.y);
    }
  }

  function loop(t) {
    draw(t);
    raf = visible ? requestAnimationFrame(loop) : 0;
  }

  function sync() {
    if (drift && visible && !raf) raf = requestAnimationFrame(loop);
  }

  const redraw = () => {
    if (!raf) draw(drift ? performance.now() : 0); // t = 0 keeps static nodes from jumping on hover
  };

  canvas.addEventListener('pointermove', (e) => {
    const r = canvas.getBoundingClientRect();
    pointer = { x: e.clientX - r.left, y: e.clientY - r.top };
    redraw();
  });
  canvas.addEventListener('pointerleave', () => {
    pointer = null;
    redraw();
  });

  new ResizeObserver(() => {
    layout();
    redraw();
  }).observe(canvas.parentElement);

  if (drift) {
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    }).observe(canvas);
  }
}
