// Skills as labelled clusters: one cluster per group, every node named, the biggest node
// of each group is its hub. Hovering a node writes its note into the detail element.
const RADIUS = { 1: 4, 2: 6, 3: 9 };
const LEVEL = { 1: 'Familiar', 2: 'Solid', 3: 'Expert' };
const CELL_H = 270; // px per cluster row
const RING = [0, 52, 98]; // px: hub at the centre, then an inner and an outer ring
const INNER_MAX = 3; // nodes on the inner ring
const AMPLITUDE = 4; // px of sinusoidal wander
const DIM_ALPHA = 0.3;
const FONT = 12;

export function initConstellation(canvas, groups, { drift, detail }) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const css = getComputedStyle(document.documentElement);
  const color = (name) => css.getPropertyValue(name).trim();
  const [mint, mintLight, teal, tealLight, text, muted, bg, mono] = [
    '--mint',
    '--mint-light',
    '--teal',
    '--teal-light',
    '--text',
    '--text-muted',
    '--raised',
    '--font-mono',
  ].map(color);
  const idleText = detail?.textContent ?? '';

  const clusters = groups.map((group, g) => {
    const items = [...group.items].sort((a, b) => b.size - a.size);
    const nodes = items.map((item, i) => {
      const ring = i === 0 ? 0 : i <= INNER_MAX ? 1 : 2;
      const first = ring === 1 ? 1 : INNER_MAX + 1;
      const count = ring === 1 ? Math.min(items.length - 1, INNER_MAX) : items.length - first;
      const index = i - first;
      // Spread evenly; the inner ring is rotated half a step so no node sits on the hub's label.
      const angle = ring ? (index / count) * Math.PI * 2 + (ring === 1 ? Math.PI / count : 0) : 0;
      return {
        g,
        label: item.label,
        note: item.note,
        size: item.size,
        radius: RADIUS[item.size] ?? RADIUS[1],
        angle,
        dist: RING[ring],
        phase: Math.random() * Math.PI * 2,
        x: 0,
        y: 0,
      };
    });
    return { name: group.name, nodes, cx: 0, cy: 0 };
  });
  const nodes = clusters.flatMap((c) => c.nodes);

  let w = 0;
  let h = 0;
  let pointer = null;
  let hovered = null;
  let visible = true;
  let raf = 0;

  function layout() {
    const dpr = window.devicePixelRatio || 1;
    w = canvas.clientWidth;
    const cols = w >= 900 ? 3 : 2;
    const rows = Math.ceil(clusters.length / cols);
    h = rows * CELL_H;
    canvas.style.height = `${h}px`;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    clusters.forEach((c, i) => {
      const row = Math.floor(i / cols);
      const inRow = Math.min(cols, clusters.length - row * cols);
      const col = i - row * cols;
      c.cx = (w / inRow) * (col + 0.5);
      c.cy = CELL_H * (row + 0.5) + 10;
    });
  }

  function place(t) {
    for (const c of clusters) {
      for (const n of c.nodes) {
        const wobble = Math.sin(t * 0.0005 + n.phase) * AMPLITUDE;
        n.x = c.cx + Math.cos(n.angle) * (n.dist + wobble);
        n.y = c.cy + Math.sin(n.angle) * (n.dist + wobble);
      }
    }
  }

  function labelBox(n) {
    ctx.font = `${FONT}px ${mono}`;
    const width = ctx.measureText(n.label).width;
    const right = Math.cos(n.angle) >= 0;
    const gap = n.radius + 6;
    const x = right ? n.x + gap : n.x - gap - width;
    return { x, y: n.y - FONT / 2, width, height: FONT, right };
  }

  function pick() {
    if (!pointer) return null;
    for (const n of nodes) {
      if (Math.hypot(n.x - pointer.x, n.y - pointer.y) <= n.radius + 6) return n;
      const b = labelBox(n);
      if (
        pointer.x >= b.x - 4 &&
        pointer.x <= b.x + b.width + 4 &&
        pointer.y >= b.y - 3 &&
        pointer.y <= b.y + b.height + 3
      )
        return n;
    }
    return null;
  }

  function draw(t = 0) {
    place(t);
    const next = pick();
    if (next !== hovered) {
      hovered = next;
      if (detail)
        detail.textContent = hovered
          ? `${hovered.label} — ${LEVEL[hovered.size]}${hovered.note ? ` · ${hovered.note}` : ''}`
          : idleText;
    }
    const alphaOf = (g) => (hovered && hovered.g !== g ? DIM_ALPHA : 1);

    ctx.clearRect(0, 0, w, h);
    ctx.lineWidth = 1;

    for (const c of clusters) {
      const [hub, ...rest] = c.nodes;
      ctx.globalAlpha = alphaOf(hub.g);

      // Cluster boundary and caption.
      ctx.setLineDash([3, 5]);
      ctx.strokeStyle = teal;
      ctx.globalAlpha = 0.18 * alphaOf(hub.g);
      ctx.beginPath();
      ctx.arc(c.cx, c.cy, RING[2] + 24, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.globalAlpha = alphaOf(hub.g);
      ctx.fillStyle = tealLight;
      ctx.font = `600 11px ${mono}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(c.name.toUpperCase(), c.cx, c.cy - RING[2] - 38);

      // Star lines from every node to the hub.
      ctx.strokeStyle = teal;
      ctx.globalAlpha = 0.45 * alphaOf(hub.g);
      ctx.beginPath();
      for (const n of rest) {
        ctx.moveTo(hub.x, hub.y);
        ctx.lineTo(n.x, n.y);
      }
      ctx.stroke();
    }

    for (const n of nodes) {
      const a = alphaOf(n.g);
      const lit = n === hovered;
      if (n.size === 3 || lit) {
        const halo = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius * 3);
        halo.addColorStop(0, mint);
        halo.addColorStop(1, 'transparent');
        ctx.globalAlpha = (lit ? 0.5 : 0.25) * a;
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius * 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = a;
      ctx.fillStyle = lit ? mintLight : mint;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      ctx.fill();

      const b = labelBox(n);
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.lineJoin = 'round';
      ctx.lineWidth = 3;
      ctx.strokeStyle = bg;
      ctx.strokeText(n.label, b.x, n.y);
      ctx.fillStyle = lit ? text : n.size === 3 ? text : muted;
      ctx.fillText(n.label, b.x, n.y);
    }
    ctx.globalAlpha = 1;
  }

  function loop(t) {
    draw(t);
    raf = visible ? requestAnimationFrame(loop) : 0;
  }

  function sync() {
    if (drift && visible && !raf) raf = requestAnimationFrame(loop);
  }

  const redraw = () => {
    if (!raf) draw(drift ? performance.now() : 0);
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
    if (!canvas.clientWidth) return; // hidden on narrow screens; the HTML list shows instead
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
