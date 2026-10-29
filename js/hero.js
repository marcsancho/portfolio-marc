// Timing: leading indentation is typed instantly, so total ≈ typed chars * CHAR_MS + lines * LINE_MS,
// plus the 400 ms fade. Keep it under 4 s when editing the snippet.
const CHAR_MS = 5;
const LINE_MS = 180;

const SNIPPET = [
  { text: '<section id="hero">', reveals: null },
  { text: '  <h1>Marc Sancho</h1>', reveals: 'name' },
  { text: '  <p class="role">', reveals: null },
  { text: '    Front-end Developer', reveals: null },
  { text: '  </p>', reveals: 'role' },
  { text: '  <p>Angular & ExtJS specialist, AI-first.</p>', reveals: 'tagline' },
  { text: '  <a href="#experience">See my work</a>', reveals: 'actions' },
  { text: '  <a href="#contact">Get in touch</a>', reveals: null },
  { text: '  <!-- github · linkedin · mail -->', reveals: 'social' },
  { text: '</section>', reveals: null },
];

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const tok = (cls, s) => `<span class="tok-${cls}">${esc(s)}</span>`;

function highlight(line) {
  return line
    .split(/(<!--.*?-->|<[^>]*>)/)
    .filter(Boolean)
    .map((part) => {
      if (part.startsWith('<!--')) return tok('comment', part);
      const tag = part.match(/^(<\/?[\w-]+)([^>]*?)(\/?>)$/);
      if (!tag) return tok('text', part);
      const attrs = tag[2]
        .split(/([\w-]+=)("[^"]*")/)
        .map((p, i) => (i % 3 === 1 ? tok('attr', p) : i % 3 === 2 ? tok('str', p) : esc(p)))
        .join('');
      return tok('tag', tag[1]) + attrs + tok('tag', tag[3]);
    })
    .join('');
}

export function initHero({ enabled }) {
  if (!enabled) {
    document.documentElement.classList.remove('hero-anim');
    return;
  }

  const editor = document.querySelector('.hero-editor');
  const nav = document.querySelector('.site-nav');
  const els = [...document.querySelectorAll('[data-hero-el]')];
  const byKey = new Map(els.map((el) => [el.dataset.heroEl, el]));

  editor.innerHTML =
    '<div class="hero-editor__bar"><span>index.html</span>' +
    '<span class="hero-skip">press any key or click to skip</span></div>' +
    '<div class="hero-editor__body"><div class="hero-editor__gutter"></div><pre><code></code></pre></div>';
  const gutter = editor.querySelector('.hero-editor__gutter');
  const code = editor.querySelector('code');
  const done = document.createElement('span');
  const cur = document.createTextNode('');
  const caret = document.createElement('span');
  caret.className = 'hero-caret';
  code.append(done, cur, caret);

  nav.classList.add('is-hidden');
  els.forEach((el) => el.classList.add('is-pending'));
  document.documentElement.classList.remove('hero-anim'); // same tick: is-pending takes over unpainted
  editor.hidden = false;

  let line = 0;
  let col = 0;
  let timer = 0;
  let finished = false;
  const ac = new AbortController();

  function finish() {
    if (finished) return;
    finished = true;
    clearTimeout(timer);
    ac.abort();
    done.innerHTML = SNIPPET.map((l) => highlight(l.text) + '\n').join('');
    gutter.textContent = SNIPPET.map((_, i) => i + 1).join('\n');
    cur.nodeValue = '';
    caret.remove();
    els.forEach((el) => el.classList.remove('is-pending'));
    editor.classList.add('is-done');
    nav.classList.remove('is-hidden');
  }

  function startLine() {
    const { text } = SNIPPET[line];
    col = text.length - text.trimStart().length;
    gutter.append(`${line + 1}\n`);
    tick();
  }

  function tick() {
    const { text, reveals } = SNIPPET[line];
    if (col < text.length) {
      cur.nodeValue = text.slice(0, ++col);
      timer = setTimeout(tick, CHAR_MS);
      return;
    }
    done.insertAdjacentHTML('beforeend', highlight(text) + '\n');
    cur.nodeValue = '';
    byKey.get(reveals)?.classList.remove('is-pending');
    line++;
    timer = setTimeout(line < SNIPPET.length ? startLine : finish, LINE_MS);
  }

  ['pointerdown', 'keydown', 'wheel', 'touchmove'].forEach((type) =>
    window.addEventListener(type, finish, { passive: true, signal: ac.signal })
  );
  startLine();
}
