# Marc Sancho — Portfolio

The one-page portfolio of Marc Sancho, Front-end Developer in Palma de Mallorca.
Written by hand in HTML, CSS and ES modules: no framework, no bundler, no build step.
All content is in the HTML and readable without JavaScript; the effects are an enhancement on top.

Live site: https://marcsancho.github.io/portfolio-marc/

## Sections

Hero, experience timeline, Casal de Colònies case study, skills, "Working with AI", contact.

## Running it

```sh
npm install   # installs Prettier, the only dev dependency
npm start     # python -m http.server on http://localhost:8080
```

Opening `index.html` directly shows the content, but browsers such as Chrome block ES modules
on `file://`, so the effects need the local server.

## Effects

- **Hero:** a code editor writes its own snippet, then fades into the photo.
- **Hero grid:** a canvas grid whose lines bend away from the pointer and light up around it.
- **Skills:** a canvas of labelled clusters; hovering a node shows its note.
- **Reveal:** reading progress bar, scroll reveal and nav highlight.
- **Cards:** subtle 3D tilt.
- **Cursor:** a ring that follows the pointer.

The effects run only on fine pointers (`(pointer: fine)`) and only when
`prefers-reduced-motion` is not set. The hero animation also needs a viewport of 768 px or wider.

## Structure

```
index.html          all content and markup
styles.css          all styles
js/main.js          entry point: feature-detects prefs, then starts each effect
js/prefs.js         pointer type and motion preference
js/hero.js          self-writing code editor
js/hero-grid.js     canvas grid behind the hero
js/constellation.js skills canvas
js/reveal.js        progress bar, scroll reveal, nav highlight
js/tilt.js          3D tilt on cards
js/cursor.js        cursor ring
js/contact.js       copy-to-clipboard contact links (mailto fallback), footer year
assets/             photo, favicon, Open Graph image, Casal screenshots (WebP)
docs/superpowers/   design spec and implementation plan
```

## Accessibility

- Content does not depend on JavaScript or animation.
- Effects are gated on `(pointer: fine)` and `prefers-reduced-motion`.
- Skip link to the main content.
- Visible keyboard focus styles.

## Formatting

```sh
npm run check-format   # Prettier check
npm run format         # Prettier write
```

## Deployment

GitHub Pages serves the `main` branch root. Each push to `main` publishes the site.

## Licence

Content © Marc Sancho. Code is free to reuse; the content, photos and screenshots are not.
