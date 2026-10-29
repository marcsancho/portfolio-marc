const REVEAL_THRESHOLD = 0.15;
const ACTIVE_BAND = '-40% 0px -55%'; // a thin band near the middle of the viewport

export function initReveal({ instant }) {
  const progress = document.querySelector('.progress');
  const sections = [...document.querySelectorAll('main > section')];
  const links = [...document.querySelectorAll('.site-nav a')];
  let inBand = null; // section under the observer's band
  let shown = null;

  const maxScroll = () => document.documentElement.scrollHeight - innerHeight;

  // On tall viewports the last section may never reach the band, so the page bottom wins.
  function markCurrent() {
    const max = maxScroll();
    const atBottom = max > 0 && scrollY >= max - 2;
    const id = (atBottom ? sections.at(-1) : inBand)?.id;
    if (id === shown) return;
    shown = id;
    for (const link of links) {
      if (link.hash === `#${id}`) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    }
  }

  function onScroll() {
    const max = maxScroll();
    progress.style.setProperty('--progress', max > 0 ? Math.min(scrollY / max, 1) : 0);
    markCurrent();
  }
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const targets = document.querySelectorAll('[data-reveal]');
  if (instant) {
    targets.forEach((el) => el.classList.add('is-visible'));
  } else {
    const reveal = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-visible');
          reveal.unobserve(entry.target);
        }
      },
      { threshold: REVEAL_THRESHOLD }
    );
    targets.forEach((el) => reveal.observe(el));
  }
  document.documentElement.classList.add('reveal-ready'); // disarms the CSS fallback

  const current = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) if (entry.isIntersecting) inBand = entry.target;
      markCurrent();
    },
    { rootMargin: ACTIVE_BAND }
  );
  sections.forEach((s) => current.observe(s));
}
