// Apply the saved reading preference before paint, even if storage is unavailable.
(() => {
  const root = document.documentElement;
  let preference;
  try { preference = localStorage.getItem('appearance'); } catch (_) {}
  const dark = preference === 'dark' || (!preference && root.dataset.defaultAppearance === 'dark');
  root.classList.toggle('dark', dark);

  function sync() {
    const isDark = root.classList.contains('dark');
    document.querySelectorAll('[id^="appearance-switcher"]').forEach(button => {
      button.setAttribute('aria-pressed', String(isDark));
      button.title = isDark ? 'Byt till ljust läge' : 'Byt till mörkt läge';
    });
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = isDark ? '#232220' : '#fcfbf8';
  }
  document.addEventListener('DOMContentLoaded', () => {
    sync();
    document.querySelectorAll('[id^="appearance-switcher"]').forEach(button => {
      button.addEventListener('click', () => {
        root.classList.toggle('dark');
        try { localStorage.setItem('appearance', root.classList.contains('dark') ? 'dark' : 'light'); } catch (_) {}
        sync();
      });
    });
    const toTop = document.getElementById('to-top');
    if (toTop) toTop.hidden = document.documentElement.scrollHeight < innerHeight + 150;
  });
})();
