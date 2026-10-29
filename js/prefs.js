export const prefs = {
  fine: matchMedia('(pointer: fine)').matches,
  motion: !matchMedia('(prefers-reduced-motion: reduce)').matches,
  narrow: innerWidth < 768,
};
