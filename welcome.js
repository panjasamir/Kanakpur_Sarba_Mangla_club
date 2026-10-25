/* Display once per browser-tab visit. Closing never deletes site content. */
(() => {
  const dialog = document.getElementById("jubilee-welcome");
  if (!dialog || typeof dialog.showModal !== "function") return;
  const key = "kanakpur-jubilee-welcome-dismissed-v1";
  let dismissed = false;
  try {
    dismissed = sessionStorage.getItem(key) === "yes";
  } catch {}
  function close() {
    dialog.close();
  }
  dialog.querySelector(".welcome-close").addEventListener("click", close);
  dialog.querySelector(".welcome-enter").addEventListener("click", close);
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) {
      const r = dialog.getBoundingClientRect();
      if (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      )
        close();
    }
  });
  dialog.addEventListener("close", () => {
    document.body.classList.remove("welcome-open");
    try {
      sessionStorage.setItem(key, "yes");
    } catch {}
    document.querySelector("header .brand")?.focus({ preventScroll: true });
  });
  if (!dismissed) {
    dialog.showModal();
    document.body.classList.add("welcome-open");
  }
})();
