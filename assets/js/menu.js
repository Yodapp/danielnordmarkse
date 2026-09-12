// In-flow disclosure: reading and keyboard navigation remain available below it.
(() => {
  const toggle = document.getElementById('dn-menu-toggle');
  const nav = document.getElementById('dn-navigation');
  if (!toggle || !nav) return;
  const compact = window.matchMedia('(max-width: 74.99rem)');
  const label = toggle.querySelector('.dn-menu-label');
  function setOpen(open) {
    toggle.setAttribute('aria-expanded', String(open));
    label.textContent = open ? 'Stäng' : 'Meny';
    nav.hidden = compact.matches && !open;
  }
  function sync() {
    if (!compact.matches && nav.contains(document.activeElement)) {
      nav.hidden = false;
    }
    toggle.hidden = !compact.matches;
    if (compact.matches && nav.contains(document.activeElement)) toggle.focus();
    if (!compact.matches && document.activeElement === toggle) nav.querySelector('a').focus();
    setOpen(false);
  }
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });
  nav.addEventListener('click', event => {
    if (event.target.closest('a')) setOpen(false);
  });
  compact.addEventListener('change', sync);
  sync();
})();
