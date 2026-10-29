# Vanilla Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the CRA/React portfolio with a one-page site in plain HTML, CSS and JS where every effect is hand-written, built in one readable commit per step on `vanilla-rewrite`.

**Architecture:** One `index.html` holding all real content (readable with JS off), one `styles.css` driven by custom properties on `:root`, and small ES modules under `js/` that each export a single `init*` function and are wired by `js/main.js` after feature-detecting pointer type and motion preference. Canvas and animations only decorate content that already exists in the DOM.

**Tech Stack:** HTML5, CSS3, ES modules (no bundler), Canvas 2D, IntersectionObserver, Prettier (only dev dependency), Python + Pillow for one-off image conversion, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-10-29-vanilla-portfolio-design.md`

## Global Constraints

- No framework, bundler, preprocessor, third-party JS or external requests. System font stack only (decision: no downloaded display font; character comes from a monospace accent face and heavy, tight-tracked headings).
- Palette tokens, verbatim: bg `#121212`, surface `#1e1e1e`, raised `#2d2d2d`, mint `#9bd9b2` (light `#c1f5d9`, dark `#75ad8c`), teal `#4a858b` (light `#71b2b7`), text `#ffffff` / `rgba(255,255,255,.7)`.
- Weight excluding images under 100 KB. Images WebP under 250 KB each with explicit `width`/`height`. OG image JPEG/PNG under 300 KB.
- All asset paths relative (no leading `/`): the site lives at `https://marcsancho.github.io/portfolio-marc/`.
- English everywhere: copy, code, comments, commits. Conventional commit messages, one coherent step each, never squash.
- Hero, tilt, cursor ring and node drift are off under `prefers-reduced-motion: reduce`; tilt and cursor only under `(pointer: fine)`; hero editor not rendered under 768 px.
- No phone number, no date of birth, no unblurred screenshot. Originals stay in the session scratchpad `casal/` folder; only `casal-inici.png`, `casal-reserva.png`, `casal-acord.png` from there enter the repo, as WebP.
- Semantic HTML: single `h1`, ordered headings, `header`/`nav`/`main`/`footer`, visible focus styles, AA contrast.
- Local preview: `python -m http.server 8080` from the repo root (`.claude/launch.json` entry `portfolio`). Verification steps open `http://localhost:8080/` in the built-in browser and check the console is empty.

## Review Focus

1. JS disabled or a module failing to load: all five sections, the nav and the hero's final text must already be in the HTML and visible (Task 1 and Task 3 tests).
2. Skipping the hero mid-typing (click, key, scroll) must stop the typing timer, hide the editor and show the nav exactly once, with no leftover characters appearing later (Task 3 test).
3. Window resize and high-DPR screens: the constellation canvas must rescale without blur or drift outside its bounds (Task 6 test).
4. Touch devices and narrow viewports: no tilt, no cursor ring, hero final state immediately, nav usable in one row (Task 2, 9, 10 tests).
5. Copy-to-clipboard unavailable (insecure context, denied permission): clicking the email row must not throw and the `mailto:` link must still work (Task 7 test).

---

### Task 1: Replace the CRA scaffold with a vanilla skeleton

**Files:**
- Delete: `src/`, `public/`, `.idea/`, `.eslintrc.json`, `.eslintignore`, `package-lock.json`
- Create: `index.html`, `styles.css`, `js/main.js`, `assets/profile.jpg`, `assets/icon.png`, `.claude/launch.json`
- Modify: `package.json`, `.gitignore`, `.prettierignore`

**Interfaces:**
- Produces: `index.html` with `<header class="site-header"><nav class="site-nav">` linking to `#hero #experience #project #skills #contact`, a `<main>` with those five `<section>`s each holding its `<h2>` (the hero holds the `<h1>`), and a `<footer>`. `styles.css` defines the tokens `--bg --surface --raised --mint --mint-light --mint-dark --teal --teal-light --text --text-muted --font-body --font-mono --max-w (72rem)`. `js/main.js` is `type="module"`, exports nothing, and exposes `const prefs = { fine: matchMedia('(pointer: fine)').matches, motion: !matchMedia('(prefers-reduced-motion: reduce)').matches, narrow: innerWidth < 768 }` for later tasks to import from `js/prefs.js`.

- [ ] **Step 1: Move the two reusable images**

`git mv src/assets/images/profile.jpg assets/profile.jpg` and `git mv src/assets/images/icon.png assets/icon.png`.

- [ ] **Step 2: Delete the CRA tree and configs listed above**

`git rm -r src public .idea .eslintrc.json .eslintignore package-lock.json`. In `.gitignore` remove the CRA entries (`/build`, `/coverage`, `.env*`) and keep `node_modules/`, `.DS_Store`, `assets/casal/originals/`.

- [ ] **Step 3: Rewrite `package.json`**

Keep `name`, `version`, `private`. Scripts: `"format": "prettier --write ."`, `"check-format": "prettier --check ."`, `"start": "python -m http.server 8080"`. `devDependencies`: `prettier` only (same version as before). No `dependencies`, no `eslintConfig`, no `browserslist`. `.prettierignore`: `node_modules`, `assets`.

- [ ] **Step 4: Write `index.html`**

`<!doctype html>`, `lang="en"`, viewport meta, `<title>Marc Sancho — Front-end Developer</title>`, `<link rel="stylesheet" href="styles.css">`, `<script type="module" src="js/main.js"></script>`. Body: header with logo (`assets/icon.png`, 32×32, alt "Marc Sancho") and nav; main with the five sections and their headings (`Experience`, `Casal de Colònies`, `Skills`, `Contact`; hero `<h1>Marc Sancho</h1>`); footer with the text from the spec and the year.

- [ ] **Step 5: Write `styles.css` base**

`:root` tokens; `--font-body: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`; `--font-mono: ui-monospace, "Cascadia Code", "JetBrains Mono", Consolas, monospace`. Reset (`box-sizing`, margins), `html { scroll-behavior: smooth; color-scheme: dark }`, body colours, `.container { max-width: var(--max-w); margin-inline: auto; padding-inline: 1.25rem }`, section spacing `padding-block: clamp(4rem, 10vh, 8rem)`, heading scale (`h1` clamp 2.5–5rem, `h2` clamp 1.75–2.5rem, weight 800, `letter-spacing: -0.02em`), link colour mint, `:focus-visible { outline: 2px solid var(--mint); outline-offset: 3px }`. Fixed header: `position: sticky; top: 0; backdrop-filter: blur(8px); background: color-mix(in srgb, var(--bg) 80%, transparent)`; nav links in `--font-mono`, small caps, gap 1.5rem, wrap on narrow screens.

- [ ] **Step 6: Write `js/prefs.js` and `js/main.js`**

`prefs.js`: `export const prefs = {...}` as in Interfaces. `main.js`: `import { prefs } from './prefs.js'; document.documentElement.dataset.pointer = prefs.fine ? 'fine' : 'coarse';` (later tasks add their `init` calls here).

- [ ] **Step 7: Add `.claude/launch.json`**

One configuration `portfolio`: `runtimeExecutable: "python"`, `runtimeArgs: ["-m", "http.server", "8080"]`, `port: 8080`.

- [ ] **Step 8: Verify**

Start the `portfolio` preview, open `http://localhost:8080/`, `read_page`: one `h1`, four `h2`, nav with five links, footer text. Console: no errors. `npx prettier --check .` passes. `git status` shows no `src/` or `public/`.

- [ ] **Step 9: Commit**

`refactor: replace CRA scaffold with a vanilla HTML/CSS/JS skeleton`

---

### Task 2: Hero final content and layout

**Files:**
- Modify: `index.html` (hero section), `styles.css` (hero block)

**Interfaces:**
- Produces: `section#hero` containing `.hero-content` (`h1`, `p.hero-role`, `p.hero-tagline`, `.hero-actions` with two `a.btn` — `.btn-primary` to `#experience` "See my work", `.btn-ghost` to `#contact` "Get in touch" — and `ul.hero-social` with three links carrying inline SVG icons and `aria-label`s) and an empty `<div class="hero-editor" aria-hidden="true" hidden>` placeholder on the right. Every `.hero-content` child carries `data-hero-el` with a unique id (`name`, `role`, `tagline`, `actions`, `social`) that Task 3 reveals in order.

- [ ] **Step 1: Write the hero markup**

Copy from the spec: role `Front-end Developer`; tagline `Angular & ExtJS specialist building large enterprise apps — AI-first.`; links GitHub `https://github.com/marcsancho`, LinkedIn `https://www.linkedin.com/in/marcsanchosantandreu/`, email `mailto:marcsancho22@gmail.com`. External links get `target="_blank" rel="noopener"`.

- [ ] **Step 2: Style the hero**

`min-height: calc(100svh - header height)`, grid `1fr 1fr` from 768 px (`grid-template-columns: minmax(0, 1fr) minmax(0, 1fr)`), single column below; `.hero-content` left-aligned, `h1` with a mint-to-teal `background-clip: text` gradient; `.hero-role` in `--font-mono` mint; buttons 48 px tall, primary mint on bg, ghost outlined; social icons 24 px, `--text-muted`, mint on hover. Background: a faint grid (`background-image` of two `linear-gradient`s, 48 px cells, 4 % white) under a radial mint glow positioned by `--mx`/`--my` custom properties (default 50 %/50 %), masked to fade toward the bottom.

- [ ] **Step 3: Pointer glow**

In `js/main.js`, if `prefs.fine && prefs.motion`, on `pointermove` over `#hero` set `--mx`/`--my` on the section as percentages. One listener, passive.

- [ ] **Step 4: Verify**

Desktop screenshot: name, role, tagline, two buttons, three icons, left half; glow follows the pointer. `resize_window` to mobile: single column, buttons full width, nothing overflows horizontally (`document.documentElement.scrollWidth === innerWidth`). Console clean. Reset to desktop.

- [ ] **Step 5: Commit**

`feat: add hero with final content and layout`

---

### Task 3: Self-writing hero animation

**Files:**
- Create: `js/hero.js`
- Modify: `index.html` (nav gets `is-hidden` only via JS), `styles.css` (editor + reveal states), `js/main.js`

**Interfaces:**
- Consumes: `prefs`, `[data-hero-el]`, `.hero-editor`, `.site-nav`.
- Produces: `export function initHero({ enabled }): void`. When `enabled` is false it does nothing (final state is the default markup). When true it: adds `is-hidden` to `.site-nav` and `is-pending` to every `[data-hero-el]`, un-hides `.hero-editor`, renders a fake editor (title bar `index.html`, line numbers, `<pre><code>` area), types a snippet character by character, removes `is-pending` from the matching element each time a closing tag finishes, then fades the editor and nav back in. `skip()` (internal) runs on the first `pointerdown`, `keydown` or `wheel`/`touchmove` on `window`, jumps to the final state and is idempotent.

- [ ] **Step 1: Define the snippet**

A constant array of `{ text, reveals }` lines, in `js/hero.js`:

```
<section id="hero">            → null
  <h1>Marc Sancho</h1>          → 'name'
  <p class="role">              → null
    Front-end Developer         → null
  </p>                          → 'role'
  <p>Angular & ExtJS specialist, AI-first.</p> → 'tagline'
  <a href="#experience">See my work</a>        → 'actions'
  <a href="#contact">Get in touch</a>          → null
  <!-- github · linkedin · mail -->            → 'social'
</section>                      → null
```

Syntax colouring by wrapping tokens in `<span class="tok-tag|tok-attr|tok-str|tok-text|tok-comment">` at render time (a small tokenizer on each finished line is enough; while a line is being typed show it as plain text).

- [ ] **Step 2: Timing**

Per-character delay 28 ms, plus 180 ms at each line end; total must stay under 4 s (count the characters, adjust the base delay if needed). Use a single `setTimeout` chain stored in one variable so `skip()` can `clearTimeout` it. Blinking caret via CSS `@keyframes`.

- [ ] **Step 3: CSS states**

`.hero-editor`: surface background, 1 px raised border, radius 12 px, mono 0.9 rem, `opacity` transition 400 ms, `is-done` → `opacity: 0; pointer-events: none` (stays in the grid, so no layout shift). `[data-hero-el].is-pending { opacity: 0; transform: translateY(12px) }` with a 500 ms transition back. `.site-nav.is-hidden { opacity: 0; pointer-events: none }` with a 400 ms transition. A `.hero-skip` hint (`press any key or click to skip`) in the editor title bar.

- [ ] **Step 4: Wire it**

In `main.js`: `initHero({ enabled: prefs.motion && !prefs.narrow })`.

- [ ] **Step 5: Verify the animation**

Reload at desktop width; screenshot at ~1 s (editor typing, name hidden) and after 4.5 s (editor gone, all elements visible, nav visible). Check in the console that `document.querySelectorAll('.is-pending').length === 0` and `.site-nav` has no `is-hidden`.

- [ ] **Step 6: Verify the skip (Review Focus 2)**

Reload, click at 0.5 s, wait 1 s: no `.is-pending`, editor `is-done`, nav visible. Wait 4 s more and take `document.querySelector('.hero-editor code').textContent.length` twice 1 s apart: equal (no timer still typing).

- [ ] **Step 7: Verify reduced motion and mobile (Review Focus 1, 4)**

`resize_window` mobile + reload: editor stays `hidden`, content visible immediately, nav visible. Emulate `prefers-reduced-motion: reduce` via `matchMedia` override is not available; instead call `initHero({ enabled: false })` manually in the console on a fresh load and check the same. Reset viewport.

- [ ] **Step 8: Commit**

`feat: animate hero as a self-writing code editor`

---

### Task 4: Experience timeline

**Files:**
- Modify: `index.html` (experience section), `styles.css` (timeline block)

**Interfaces:**
- Produces: `section#experience` with an `<ol class="timeline">`; each `<li class="timeline-item">` holds `<time>` (date range), and an `<article class="card">` with `h3` (role · company), a `p.card-meta` (place), and a `<ul>` of bullets. Cards carry `data-tilt` for Task 9 and `data-reveal` for Task 8.

- [ ] **Step 1: Write the content**

Items in this order, text from the spec's Experience section:
1. `2023 — present` · `Front-end Developer · Serviceware` · Palma de Mallorca · the seven bullets, with the AI-first bullet first and rendered as a highlighted `li.card-highlight` (mint left border).
2. `2021 — 2023` · `Higher Vocational Diploma, Web Development · CIFP Francesc de Borja Moll`.
3. `2019 — 2021` · `Intermediate Vocational Diploma, Network & Systems Administration · IES Capdepera` · bullet: Erasmus placement in Cork, Ireland.
4. `2025` · `Google: Artificial Intelligence and Productivity · Santander Open Academy`.

- [ ] **Step 2: Style**

Timeline: grid `8rem 1fr` from 768 px, a 1 px teal line down the left column with a mint dot per item; single column below with the date above the card. `.card`: surface background, 1 px border `rgba(255,255,255,.08)`, radius 16 px, padding 1.5 rem, `transform-style: preserve-3d` (Task 9 relies on it). Bullets at `--text-muted`, 1.6 line-height.

- [ ] **Step 3: Verify**

Desktop and mobile screenshots; `read_page` shows four `article`s under `#experience`; no horizontal overflow.

- [ ] **Step 4: Commit**

`feat: add experience timeline`

---

### Task 5: Casal de Colònies case study

**Files:**
- Create: `assets/casal/casal-inici.webp`, `assets/casal/casal-reserva.webp`, `assets/casal/casal-acord.webp`
- Modify: `index.html` (project section), `styles.css` (case-study block)

**Interfaces:**
- Produces: `section#project` with `.case-study`: header (`h2`, `p.case-client`), then three `.case-row`s each with a `figure.screen[data-tilt][data-reveal]` (`img` with explicit `width`/`height`, `loading="lazy"`, descriptive `alt`, `figcaption`) and a text column; a `p.case-stack` of `<code>` chips; a closing `p.case-note` "UI in Catalan, the client's language."

- [ ] **Step 1: Convert the screenshots**

With Pillow, from the scratchpad `casal/` folder, read only the three blurred files and write WebP at `quality=82`, width 1440 (keep ratio), into `assets/casal/`. Assert each output is under 250 KB and print sizes. Never touch `1.png`, `2.png`, `3.webp`.

- [ ] **Step 2: Write the content**

Rows: (1) dashboard — problem paragraph + "the solution" paragraph; (2) booking form — the technical challenge paragraph (portable + offline, Electron + Next.js, sql.js, dual auth, Google OAuth from desktop, legacy migration); (3) PDF preview — "delivered to a real client" paragraph. Client line and stack chips verbatim from the spec. Alt texts describe what is on screen (e.g. "Dashboard with a first-run checklist, season KPIs, upcoming arrivals and an occupancy calendar").

- [ ] **Step 3: Style**

`.case-row`: grid `3fr 2fr` from 900 px, alternating image side via `:nth-child(even) .screen { order: 2 }`; stacked below. `.screen`: raised background, 1 px border, radius 12 px, overflow hidden, soft shadow; `img { display:block; width:100%; height:auto }`. Chips: mono, teal border, radius 999 px.

- [ ] **Step 4: Verify**

`read_page`: three images with non-empty `alt`; `ls -l assets/casal` all under 250 KB; Network tab shows them as `image/webp`; mobile layout stacks; console clean.

- [ ] **Step 5: Commit**

`feat: add Casal de Colonies case study`

---

### Task 6: Skills constellation

**Files:**
- Create: `js/constellation.js`
- Modify: `index.html` (skills section), `styles.css` (skills block), `js/main.js`

**Interfaces:**
- Consumes: `prefs`.
- Produces: markup `section#skills` with `<canvas class="skills-canvas" aria-hidden="true">` followed by `<div class="skills-list">` of five `<ul data-group="...">` whose `<li data-size="1|2|3">` are the nodes (text = label). `export function initConstellation(canvas: HTMLCanvasElement, groups: { name: string, items: { label: string, size: number }[] }[], { drift: boolean }): void`. `main.js` reads the groups from the DOM and calls it. Nodes drift only when `drift` is true; hover (pointer within a node radius) highlights the node and its group and draws the label; the list below stays the accessible source.

- [ ] **Step 1: Write the markup**

Groups and nodes from the spec: Frameworks (Angular 3, ExtJS 3, React 2, Next.js 2, Electron 2, Vue 1), Languages (TypeScript 3, JavaScript 3, HTML5 3, CSS3 3, SCSS 2), Tooling (NX monorepo 3, Git 3, Azure DevOps 3, GitHub 2, CI/CD 2), Testing (Playwright 2, Jest 2, Vitest 1), AI (AI agents 3, Agent harness & orchestration 3, Claude Code 2, MCP 2). Each `ul` preceded by an `h3` with the group name.

- [ ] **Step 2: Implement the module**

Layout: each group gets a home centre arranged on a ring inside the canvas; nodes get random offsets within a group radius; drift is a slow sinusoidal wander around the home point (amplitude 12 px, per-node phase), never a force simulation. Radius by size: 5/8/12 px. Lines between nodes of the same group with alpha scaled by distance. Colours: mint nodes, teal lines; the hovered group goes full alpha, others 35 %. Use `ResizeObserver` on the canvas's parent and scale by `devicePixelRatio` (Review Focus 3). Loop with `requestAnimationFrame` only while the canvas is on screen (`IntersectionObserver`) and `drift` is true; otherwise draw once and on hover.

- [ ] **Step 3: Style**

Canvas 100 % width, height `clamp(320px, 50vh, 520px)`, raised border radius 16 px. The list below in a 5-column grid from 900 px (`repeat(auto-fit, minmax(10rem, 1fr))`), `h3` mono teal, items as chips sized by `data-size`.

- [ ] **Step 4: Verify (Review Focus 3)**

Screenshot: nodes and lines visible, grouped. Hover a node: label drawn. In the console: `canvas.width === Math.round(canvas.clientWidth * devicePixelRatio)`; after `resize_window` to tablet and back, the same equality holds and no node position is outside `[0, clientWidth] × [0, clientHeight]` (expose `window.__constellationNodes` only in this check through a temporary console expression, not in code). `read_page` lists all 23 skills as text. Console clean.

- [ ] **Step 5: Commit**

`feat: add skills constellation`

---

### Task 7: Contact section and footer

**Files:**
- Create: `js/contact.js`
- Modify: `index.html`, `styles.css`, `js/main.js`

**Interfaces:**
- Produces: `section#contact` with the intro sentence from the spec and `ul.contact-list` of three `a.contact-row` (email `mailto:`, LinkedIn, GitHub), the email row carrying `data-copy="marcsancho22@gmail.com"` and a `<span class="contact-status" aria-live="polite">`. `export function initContact(): void` — on click of `[data-copy]`, `event.preventDefault()` only if `navigator.clipboard?.writeText` exists, write the text, set the status to `Copied` for 2 s; on any failure let the `mailto:` proceed (Review Focus 5). Footer: spec text with the repo link `https://github.com/marcsancho/portfolio-marc` and `<span id="year">`, filled by `contact.js`.

- [ ] **Step 1: Write markup and styles**

Rows: full-width, 1 px bottom border, label in mono, value large, arrow icon on the right that slides on hover; status text mint.

- [ ] **Step 2: Implement `js/contact.js` and wire it in `main.js`**

- [ ] **Step 3: Verify (Review Focus 5)**

Click the email row on `http://localhost:8080` (secure context for localhost): status shows `Copied`, disappears after 2 s, `await navigator.clipboard.readText()` returns the address. Then in the console set `navigator.clipboard = undefined` and click again: no error, status unchanged, browser attempts the `mailto:` (visible as a navigation attempt). Year shows `2026`.

- [ ] **Step 4: Commit**

`feat: add contact section and footer`

---

### Task 8: Reading progress, scroll reveal and nav highlight

**Files:**
- Create: `js/reveal.js`
- Modify: `index.html` (progress bar element, `data-reveal` on section headers and cards), `styles.css`, `js/main.js`

**Interfaces:**
- Produces: `<div class="progress" aria-hidden="true">` at the top of `body`. `export function initReveal({ instant }): void` — sets `--progress` (0–1) on `.progress` from `scrollY / (scrollHeight - innerHeight)` on scroll (passive); observes `[data-reveal]` with `IntersectionObserver` (`threshold: 0.15`), adds `is-visible` once and unobserves; observes each `main > section` (`rootMargin: '-40% 0px -55%'`) and sets `aria-current="true"` on the matching nav link. When `instant` is true, adds `is-visible` to everything immediately and skips the observer.

- [ ] **Step 1: CSS**

`.progress { position: fixed; inset: 0 0 auto; height: 3px; background: var(--mint); transform-origin: left; transform: scaleX(var(--progress, 0)); z-index: 100 }`. `[data-reveal] { opacity: 0; transform: translateY(24px); transition: opacity .6s, transform .6s } [data-reveal].is-visible { opacity: 1; transform: none }`. Nav link `[aria-current="true"]` mint with an underline.

- [ ] **Step 2: Implement and wire**

`initReveal({ instant: !prefs.motion })`.

- [ ] **Step 3: Verify**

Scroll to `#skills`: progress bar partially filled (`getComputedStyle(progress).transform` not identity), the Skills nav link has `aria-current`, cards above have `is-visible`, cards below do not yet. Scroll back up: visible cards stay visible.

- [ ] **Step 4: Commit**

`feat: add reading progress, scroll reveal and nav highlight`

---

### Task 9: 3D tilt on cards

**Files:**
- Create: `js/tilt.js`
- Modify: `styles.css`, `js/main.js`

**Interfaces:**
- Consumes: `[data-tilt]` elements from Tasks 4 and 5.
- Produces: `export function initTilt(selector: string, { max = 8 } = {}): void`. On `pointermove` sets `--rx`/`--ry` (degrees, clamped to ±max) and `--gx`/`--gy` (percent) on the element; on `pointerleave` resets to 0. Called only when `prefs.fine && prefs.motion` (Review Focus 4).

- [ ] **Step 1: CSS**

`[data-tilt] { transform: perspective(900px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)); transition: transform .15s ease-out; will-change: transform }` and a `::after` highlight: `radial-gradient(circle at var(--gx, 50%) var(--gy, 50%), rgba(255,255,255,.08), transparent 60%)`, `pointer-events: none`, visible only while hovered.

- [ ] **Step 2: Implement and wire**

`if (prefs.fine && prefs.motion) initTilt('[data-tilt]')`.

- [ ] **Step 3: Verify (Review Focus 4)**

Hover a card near its top-right corner: `--rx`/`--ry` non-zero and within ±8; leave: back to 0. `resize_window` mobile + reload: `document.documentElement.dataset.pointer === 'coarse'` and no `--rx` ever set after a simulated `pointermove`. Reset.

- [ ] **Step 4: Commit**

`feat: add 3D tilt on cards`

---

### Task 10: Cursor ring on pointer devices

**Files:**
- Create: `js/cursor.js`
- Modify: `index.html` (ring element), `styles.css`, `js/main.js`

**Interfaces:**
- Produces: `<div class="cursor-ring" aria-hidden="true">`. `export function initCursor(): void` — follows the pointer with lerp 0.18 per frame (`requestAnimationFrame`), adds `is-active` while the pointer is over `a, button, [data-tilt]`, hides itself when the pointer leaves the document. Native cursor untouched. Called only when `prefs.fine && prefs.motion`.

- [ ] **Step 1: CSS**

Fixed, 28 px circle, 1.5 px mint border, `mix-blend-mode: difference`, `pointer-events: none`, `transform: translate(-50%, -50%)`, `is-active` scales to 1.8 with a 150 ms transition, `z-index: 101`; `display: none` when `html[data-pointer="coarse"]`.

- [ ] **Step 2: Implement and wire**

- [ ] **Step 3: Verify**

Move the pointer: ring follows with a slight lag; over a button it grows; mobile emulation: ring not displayed. Console clean.

- [ ] **Step 4: Commit**

`feat: add cursor ring on pointer devices`

---

### Task 11: Reduced motion and accessibility pass

**Files:**
- Modify: `styles.css`, `index.html`

- [ ] **Step 1: Reduced-motion CSS**

`@media (prefers-reduced-motion: reduce) { *, ::before, ::after { animation: none !important; transition-duration: .01ms !important } html { scroll-behavior: auto } [data-reveal] { opacity: 1; transform: none } .cursor-ring { display: none } }`.

- [ ] **Step 2: Keyboard and semantics check**

Tab through the page: every link and button shows the mint focus ring; the skip hint is not focusable; `aria-label`s on icon-only links; headings in order (`h1` → `h2` × 4 → `h3`). Add a "Skip to content" link as the first focusable element, visually hidden until focused.

- [ ] **Step 3: Contrast**

Check `--text-muted` on `--surface` and mint on `--bg` with a contrast calculation in the console (relative luminance formula): both ≥ 4.5:1; adjust `--text-muted` alpha if not.

- [ ] **Step 4: Verify**

Emulate reduced motion in the built-in browser if available (`resize_window` cannot; use the DevTools rendering emulation via `javascript_tool` is not possible either) — so verify by temporarily adding `prefers-reduced-motion` CSS through a `<style>` injected in the console that mirrors the media block and confirming no element is left hidden. Run a Lighthouse-style check manually: no `img` without `alt`, `lang` set, unique `h1`.

- [ ] **Step 5: Commit**

`a11y: respect reduced motion and add focus styles`

---

### Task 12: Meta tags, Open Graph image and favicon

**Files:**
- Create: `assets/og.png`
- Modify: `index.html`

- [ ] **Step 1: Capture the OG image**

At a 1200×630 viewport (`resize_window` width 1200 height 630) with the hero in its final state (skip the animation), screenshot and save as `assets/og.png`; compress with Pillow (`optimize=True`, reduce colours if needed) to under 300 KB. Reset viewport.

- [ ] **Step 2: Meta**

`<meta name="description" content="Marc Sancho, Front-end Developer in Palma de Mallorca. Angular and ExtJS specialist building large enterprise apps, AI-first.">`, `og:title`, `og:description`, `og:type=website`, `og:url=https://marcsancho.github.io/portfolio-marc/`, `og:image=https://marcsancho.github.io/portfolio-marc/assets/og.png`, `twitter:card=summary_large_image`, `<link rel="icon" href="assets/icon.png">`, `<meta name="theme-color" content="#121212">`.

- [ ] **Step 3: Verify**

`read_page` head shows the tags; `assets/og.png` under 300 KB; favicon visible in the tab.

- [ ] **Step 4: Commit**

`chore: add meta tags, Open Graph image and favicon`

---

### Task 13: README, weight check, merge and deploy

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Rewrite `README.md`**

Sections: what it is (one paragraph), how to run (`npm start` or open `index.html`), structure (`index.html`, `styles.css`, `js/*`), effects list, how it deploys (GitHub Pages from `main`), licence line (MIT or none, owner's call: default "All rights reserved" for the content, code free to reuse).

- [ ] **Step 2: Weight check**

`du -cb index.html styles.css js/*.js` under 100 KB; `npx prettier --check .` passes; `git status` clean; `git log --oneline main..vanilla-rewrite` shows 14–16 readable commits.

- [ ] **Step 3: Commit**

`docs: rewrite README for the vanilla site`

- [ ] **Step 4: Ask the owner, then merge and deploy**

Pushing and enabling Pages are outward-facing: confirm with the owner first. Then `git switch main && git merge --no-ff vanilla-rewrite -m "Merge vanilla-rewrite: hand-written HTML/CSS/JS portfolio"`, `git push origin main`, enable Pages with `gh api -X POST repos/marcsancho/portfolio-marc/pages -f build_type=legacy -f source[branch]=main -f source[path]=/`, open `https://marcsancho.github.io/portfolio-marc/` and repeat the Task 3 verification there. Delete the remote `fix-hero-wave` branch only if the owner says so.
