# Portfolio rewrite in vanilla HTML/CSS/JS — design

Date: 2026-10-29
Owner: Marc Sancho
Status: approved by owner, pending builder review

## Intent

Replace the current React + MUI portfolio (`src/`, CRA) with a single-page site written in
plain HTML, CSS and JavaScript, where every visual effect is hand-written code. The point of
the site is twofold: tell a recruiter or a frontend lead in ten seconds who Marc is, and let
anyone who opens "view source" see that the code is his.

The commit history on the `vanilla-rewrite` branch is part of the deliverable: it must read
as a developer building the site step by step, not as one "rewrite" dump.

## Goals

- A visitor understands within ten seconds: name, role (Front-end Developer), where he is
  strongest (Angular, ExtJS, large enterprise apps) and what sets him apart (AI-first tooling).
- Original, visible craft: at least one effect a visitor has not seen on every other portfolio
  (the self-writing hero, the skills constellation).
- Works and looks good on a phone, on a laptop trackpad and with a mouse.
- Zero build step. Open `index.html` locally and it works; GitHub Pages serves the repo root.
- Lighthouse 95+ on performance, accessibility, best practices and SEO.

## Non-goals

- No blog, no CMS, no dark/light toggle (dark only), no language switcher (English only).
- No contact form or backend. Contact is direct links.
- No framework, no bundler, no CSS preprocessor, no third-party JS, no external requests at
  all. Body text uses the system font stack; at most one display font, self-hosted as a
  single `woff2` in `assets/fonts/` (counts toward the weight budget).

## Anti-goals (what would make this a failure even if it "works")

- Looks like a template. If a section could be swapped into any other portfolio unchanged,
  it is not done.
- Effects that hurt usage: a hero that cannot be skipped, a cursor that hides the pointer on
  touch, animations that run with `prefers-reduced-motion: reduce`, scroll-jacking.
- Personal data leaks: no phone number, no date of birth, no real client contacts in the
  screenshots.
- A commit history with one giant commit or with commits like "wip", "fix", "changes".

## Constraints

- Language of the site: English. Code, comments and commits: English.
- Deploy target: GitHub Pages from the `main` branch root (the default branch, renamed from `master` on 2026-10-29), URL
  `https://marcsancho.github.io/portfolio-marc/`. All asset paths relative (no leading `/`).
- Palette (keep from the current theme): background `#121212`, surface `#1e1e1e`, raised
  surface `#2d2d2d`, primary mint `#9bd9b2` (light `#c1f5d9`, dark `#75ad8c`), secondary
  teal `#4a858b` (light `#71b2b7`), text `#ffffff` / `rgba(255,255,255,.7)`. Builder may add
  one warm accent for emphasis if contrast allows; everything goes through CSS custom
  properties on `:root`.
- Total weight excluding images under 100 KB. Images in WebP, each under 250 KB, with
  explicit `width`/`height` to avoid layout shift. Exception: the Open Graph image is a
  JPEG or PNG under 300 KB (OG scrapers handle WebP unevenly) and is not counted.
- The Casal screenshots live in the repo under `assets/casal/`. They are the blurred versions
  (personal names, phones and company registration data already blurred). The originals are
  outside the repository (in the session scratchpad, `casal/1.png`, `2.png`, `3.webp`) and
  must never be copied in; only `casal-inici.png`, `casal-reserva.png` and `casal-acord.png`
  from that folder enter the repo, converted to WebP.
- Existing files to reuse: `src/assets/images/profile.jpg` (photo), `src/assets/images/icon.png`
  (favicon/logo). They move to `assets/`.

## Site structure

One page, in this order. Each section is a `<section id="...">` with a heading, and the nav
links scroll to them.

### 1. Hero — "the page writes itself"

Concept: on load, a fake code editor types the HTML of the hero; as each element's closing
tag is typed, the real element fades in beside the editor. When the snippet is complete the
editor fades out and the finished hero stays.

Behaviour:
- Snippet is short (roughly 8–10 lines): `<h1>Marc Sancho</h1>`, a `<p class="role">`,
  a one-line tagline, and the CTA buttons. Typed with syntax colouring (tags, attributes,
  strings) using the palette. Total animation under 4 seconds.
- Any click, key press or scroll skips straight to the final state. A small "skip" hint is
  visible from the start.
- The final state is also what renders immediately when `prefers-reduced-motion: reduce`
  is set or the viewport is narrower than 768 px. The hero is never blank: the real elements
  exist in the HTML and are only hidden while the animation runs, so the page is readable
  with JS disabled and by search engines.
- The animation runs once per page load; no session storage trick.

Final hero content:
- `Marc Sancho`
- `Front-end Developer`
- Tagline, one line: "Angular & ExtJS specialist building large enterprise apps,
  AI-first." (builder may tighten the wording, keep the three ideas: enterprise scale,
  Angular/ExtJS, AI-first)
- CTAs: "See my work" (scrolls to Experience) and "Get in touch" (scrolls to Contact).
- Social icons: GitHub (`https://github.com/marcsancho`), LinkedIn
  (`https://www.linkedin.com/in/marcsanchosantandreu/`), email (`marcsancho22@gmail.com`).
- Background: subtle and cheap (a faint grid or gradient that reacts slightly to the
  pointer). No particle canvas here; the canvas budget goes to the skills section.
- Layout: the final hero is left-aligned in the content container and occupies the left
  half on wide screens; the editor is a floating panel on the right half that fades out
  when done. Nothing moves when it disappears, so there is no layout shift. Under 768 px
  the editor is simply not rendered.
- Nav: present in the HTML from the start. JS adds a `is-hidden` class while the animation
  runs and removes it when the hero finishes or is skipped; without JS, under reduced
  motion and on narrow screens the nav is visible immediately.

### 2. Experience

The strongest part of the CV, so it comes first and takes space. Serviceware is presented
with the company name and the public product line (Serviceware Knowledge). Describe what
Marc did; never internal repo names, client names or non-public figures.

Layout: a vertical timeline on the left (dates), cards on the right. Cards get the 3D tilt
effect on pointer devices.

Content (owner's words, to be edited by the builder for rhythm, not meaning):

**Serviceware — Front-end Developer, Palma de Mallorca, March 2023 – present**
- Builds and maintains the frontend of Serviceware Knowledge: widgets and applications in
  Angular inside an NX monorepo with shared libraries and reusable components.
- Works on a very large ExtJS application, the product's main client.
- Built a browser extension for Chrome and Edge in React that brings Knowledge into other
  tools. (Described generically; the owner did not confirm the extension is listed publicly.
  Builder: keep it to "browser extension in React", no store links.)
- AI-first: designs and maintains a meta-repository and agent harness that orchestrates AI
  agents across the frontend repositories (planning, implementation, review, Azure DevOps
  integration). This is the differentiator; give it its own card or highlight.
- Owns Azure DevOps workflows: repositories, branching, CI/CD pipelines, repository migrations.
- Automated tests with Playwright and Jest; code review, documentation and JSDoc across
  frontend projects.
- Works with backend, QA and product in an agile enterprise team.

**Education** (compact, below the job, same timeline):
- 2021–2023 Higher Vocational Diploma, Web Development — CIFP Francesc de Borja Moll.
- 2019–2021 Intermediate Vocational Diploma, Network & Systems Administration — IES
  Capdepera, including an Erasmus placement in Cork, Ireland.
- 2025 Google: Artificial Intelligence and Productivity — Santander Open Academy.

### 3. Project — Casal de Colònies (case study)

The only personal project shown. Code is private, so this is a case study with screenshots,
no repository link.

Structure (one wide block, screenshots alternating with text, each screenshot in a
tilt-enabled frame):
- Title: "Casal de Colònies — booking management for a summer camp".
  Client line: "Built for a camp in Colònia de Sant Pere, Mallorca. In production."
- The problem: a small camp managing school group bookings for each season by hand:
  agreements, annexes, deadlines, occupancy, all spread over documents and email.
- The solution: a portable desktop app that runs from a USB stick on any Windows machine,
  with no server and no installation. Manages schools and bookings, tracks the status of
  each booking (agreement sent, waiting for Annex 1, confirmed), generates the booking
  agreement and Annex 1 as PDFs from customisable templates, emails them through the
  client's Gmail account, shows an occupancy calendar and upcoming deadlines, and includes
  a first-run checklist and a built-in manual.
- The technical challenge (the owner's chosen highlight): portable and offline. Electron
  packaging a Next.js app, local SQLite through sql.js, dual authentication (Google sign-in
  when online, "continue offline" when not), Google OAuth from a desktop app, and a
  documented migration path for legacy data.
- Stack line: Next.js, TypeScript, Electron, Tailwind CSS, sql.js (SQLite), Gmail API,
  Playwright, Vitest.
- The other highlight: delivered to a real client. Requirements, delivery, support.

Screenshots (already blurred, in `assets/casal/`): `casal-inici.png` (dashboard with
checklist, KPIs, calendar), `casal-reserva.png` (booking form), `casal-acord.png` (generated
PDF preview). Builder converts them to WebP and writes descriptive `alt` text.
The UI is in Catalan; say so in a caption ("UI in Catalan, the client's language").

### 4. Skills — constellation

Replace progress bars with a canvas "constellation": each technology is a node, nodes are
grouped by area and drift slowly, lines connect nodes within a group, and hovering a node
highlights it and its group and shows its name. Below or beside the canvas, the same list in
plain HTML (for keyboard users, screen readers, search engines and reduced-motion users);
the canvas is decoration over real content, never the only copy.

Groups and nodes (levels drive node size, not labels like "expert"):
- Frameworks: Angular (largest), ExtJS (largest), React, Next.js, Electron, Vue (small).
- Languages: TypeScript, JavaScript, HTML5, CSS3, SCSS.
- Tooling: NX monorepo, Git, Azure DevOps, GitHub, CI/CD.
- Testing: Playwright, Jest, Vitest.
- AI: AI agents, agent harness/orchestration, Claude Code, MCP.

### 5. Contact

Heading, one sentence ("Open to frontend roles and interesting problems. Based in Palma de
Mallorca, happy with remote."), then three large link rows: email (click copies the address
and shows "Copied" for two seconds; the `mailto:` link is still there), LinkedIn, GitHub.
No phone, no form. The email address is in the HTML in plain text (a `mailto:` link); the
owner accepts the scraping risk in exchange for a link that always works.

Footer: "Built by hand with HTML, CSS and JavaScript. Source on GitHub." linking to the
repository, plus the year.

## Site-wide effects (all hand-written)

- **Reading progress bar**: 2–3 px at the top, fills with scroll position.
- **Scroll reveal**: sections and cards get a `reveal` class; an `IntersectionObserver` adds
  `is-visible` once; CSS does the transition (opacity + translate). Reveal once, never
  re-hide.
- **3D tilt**: cards and screenshot frames tilt toward the pointer (`perspective` +
  `rotateX/rotateY`, max ~8°) with a soft highlight following the pointer. Enabled only when
  `(pointer: fine)` matches. Reset on leave.
- **Custom cursor**: a small ring that follows the pointer with slight lag and grows over
  links and buttons. Enabled only when `(pointer: fine)` and motion is allowed; the native
  cursor stays visible (the ring is an addition, not a replacement).
- **Nav**: fixed top bar with the logo and section links, appears once the hero animation
  ends (or immediately when it is skipped), current section highlighted. On narrow screens
  it collapses to a single row of icons or a compact menu, builder's choice.
- All of the above are disabled or reduced under `prefers-reduced-motion: reduce`: no
  typing, no tilt, no cursor ring, no node drift; reveals become instant.

## Quality bar

- Semantic HTML: one `h1`, headings in order, landmarks (`header`, `main`, `nav`, `footer`),
  every interactive element keyboard reachable with a visible focus style.
- Colour contrast AA on all text.
- `<title>`, meta description, Open Graph tags (title, description, image = a screenshot of
  the finished hero, added at the end), favicon from `icon.png`.
- No console errors; no layout shift on load.
- `prettier` stays as the only dev dependency (the repo already has a Prettier config);
  CRA and all runtime dependencies go.

## Files (builder's starting point, may adjust)

```
index.html
styles.css            # or split: tokens, base, sections, effects — keep it readable
js/main.js            # ES module entry: wires the others, feature-detects pointer/motion
js/hero.js            # self-writing hero
js/reveal.js          # progress bar + scroll reveal + nav highlight
js/tilt.js
js/constellation.js
js/cursor.js
assets/               # profile, icon, casal/*.webp, og.png
docs/superpowers/     # specs and plans
README.md             # what it is, how to run (open index.html), how it deploys
.prettierrc.json, .prettierignore, .gitignore, package.json (prettier only)
```

## Commit history plan (branch `vanilla-rewrite`, merge to `main` at the end)

Each commit is one coherent step with a conventional, descriptive message. Expected shape:

0. (before anything) `.gitignore` gets `assets/casal/originals/` so an unblurred copy can
   never be committed by accident, even though none should ever be placed there.
1. `docs: add vanilla portfolio design spec`
2. `refactor: replace CRA scaffold with a vanilla HTML/CSS/JS skeleton` (remove `src/`,
   `public/`, CRA deps; add `index.html`, `styles.css` with tokens, `js/main.js`; move
   assets)
3. `feat: add hero with final content and layout`
4. `feat: animate hero as a self-writing code editor`
5. `feat: add experience timeline`
6. `feat: add Casal de Colonies case study`
7. `feat: add skills constellation`
8. `feat: add contact section and footer`
9. `feat: add reading progress, scroll reveal and nav highlight`
10. `feat: add 3D tilt on cards`
11. `feat: add cursor ring on pointer devices`
12. `a11y: respect reduced motion and add focus styles`
13. `chore: add meta tags, Open Graph image and favicon`
14. `docs: rewrite README for the vanilla site`
15. Merge to `main`; enable GitHub Pages on `main` / root.

The builder may split or reorder, but never squash into one.

## Left to the builder

- Exact typography (font pairing, sizes, spacing scale). Recommendation: a display sans with
  character for headings, system stack or a single Google font for body. Decide and record
  the choice in the plan.
- Exact wording of the hero snippet and the timing curve of the typing.
- Constellation layout algorithm (simple force-free drift inside a bounded area is enough).
- Narrow-screen nav pattern.
- Open Graph image: a real screenshot of the finished hero, 1200×630.

## Open questions (none blocking)

- Whether the browser extension can be named or linked. Until the owner confirms it is
  publicly listed, it stays generic.
- School names in the dashboard screenshot stay visible: they are public institutions and
  the owner confirmed they need no blurring.
