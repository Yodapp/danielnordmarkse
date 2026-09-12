(function () {
  const wrapper = document.getElementById("search-wrapper");
  const input = document.getElementById("search-query");
  const results = document.getElementById("search-results");
  const status = document.getElementById("search-status");
  const closeButton = document.getElementById("close-search-button");
  const openButtons = document.querySelectorAll("[id^='search-button']");

  if (!wrapper || !input || !results || !status || !closeButton) return;

  let returnFocus = null;
  let statusTimer = null;

  function isVisible() {
    return wrapper.style.visibility === "visible";
  }

  function rememberFocus(element) {
    if (element instanceof HTMLElement) returnFocus = element;
  }

  function announceResults() {
    const term = input.value.trim();
    if (!term) {
      status.textContent = "";
      return;
    }

    const count = results.querySelectorAll(":scope > li").length;
    status.textContent = count === 0
      ? `Inga träffar för ”${term}”.`
      : `${count} ${count === 1 ? "träff" : "träffar"} för ”${term}”.`;
  }

  function queueAnnouncement() {
    status.textContent = input.value.trim() ? "Söker …" : "";
    window.clearTimeout(statusTimer);
    statusTimer = window.setTimeout(announceResults, 850);
  }

  function restoreFocus() {
    window.clearTimeout(statusTimer);
    status.textContent = "";
    window.setTimeout(() => {
      if (returnFocus && document.contains(returnFocus)) returnFocus.focus();
    }, 0);
  }

  openButtons.forEach((button) => {
    button.addEventListener("click", () => rememberFocus(button), { capture: true });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "/" && !isVisible()) rememberFocus(document.activeElement);
    if (event.key === "Escape" && isVisible()) restoreFocus();
  }, { capture: true });

  closeButton.addEventListener("click", restoreFocus);
  wrapper.addEventListener("click", (event) => {
    if (event.target === wrapper) restoreFocus();
  });
  input.addEventListener("input", queueAnnouncement);
})();
