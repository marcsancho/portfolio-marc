const COPIED_MS = 2000;

export function initContact() {
  document.getElementById('year').textContent = new Date().getFullYear();

  document.querySelectorAll('[data-copy]').forEach((link) => {
    const status = link.querySelector('.contact-status');
    let timer = 0;

    link.addEventListener('click', async (event) => {
      if (!navigator.clipboard?.writeText) return;
      event.preventDefault();
      try {
        await navigator.clipboard.writeText(link.dataset.copy);
        status.textContent = 'Copied';
        clearTimeout(timer);
        timer = setTimeout(() => (status.textContent = ''), COPIED_MS);
      } catch {
        clearTimeout(timer);
        status.textContent = '';
      }
    });
  });
}
