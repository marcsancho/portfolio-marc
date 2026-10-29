const REVEAL_THRESHOLD = 0.15;
const ACTIVE_BAND = '-40% 0px -55%'; // a thin band near the middle of the viewport

export function initReveal({ instant }) {
  const progress = document.querySelector('.progress');
  const update = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.setProperty('--progress', max > 0 ? Math.min(scrollY / max, 1) : 0);
  };
  addEventListener('scroll', update, { passive: true });
  update();

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

  const links = [...document.querySelectorAll('.site-nav a')];
  const current = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        for (const link of links) {
          if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        }
      }
    },
    { rootMargin: ACTIVE_BAND }
  );
  document.querySelectorAll('main > section').forEach((s) => current.observe(s));
}
