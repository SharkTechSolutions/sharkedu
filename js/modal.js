/**
 * Modal open/close and launch bar padding sync
 */
const Modal = (function () {
  let modalEl = null;
  let closeBtn = null;
  let onOpenFocus = null;

  function syncLaunchBarPadding() {
    const bar = document.querySelector(".launch-bar");
    if (!bar || document.body.classList.contains("modal-open")) return;
    const h = bar.getBoundingClientRect().height;
    document.documentElement.style.setProperty("--launch-bar-h", h + "px");
  }

  function initLaunchBarSync() {
    const launchBar = document.querySelector(".launch-bar");
    if (!launchBar) return;

    syncLaunchBarPadding();
    window.addEventListener("resize", syncLaunchBarPadding);
    window.addEventListener("orientationchange", () => {
      setTimeout(syncLaunchBarPadding, 150);
    });
    window.addEventListener("load", syncLaunchBarPadding);

    if (typeof ResizeObserver !== "undefined") {
      new ResizeObserver(syncLaunchBarPadding).observe(launchBar);
    }
  }

  function open() {
    if (!modalEl) return;
    modalEl.classList.add("is-open");
    modalEl.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    if (typeof onOpenFocus === "function") onOpenFocus();
  }

  function close() {
    if (!modalEl) return;
    modalEl.classList.remove("is-open");
    modalEl.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    requestAnimationFrame(syncLaunchBarPadding);
  }

  function init(options = {}) {
    modalEl = document.getElementById("enrollModal");
    closeBtn = document.getElementById("closeModalBtn");
    onOpenFocus = options.onOpenFocus || null;

    if (!modalEl) return;

    document.querySelectorAll(".js-open-enroll").forEach((btn) => {
      btn.addEventListener("click", open);
    });

    if (closeBtn) closeBtn.addEventListener("click", close);

    modalEl.addEventListener("click", (e) => {
      if (e.target === modalEl) close();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modalEl.classList.contains("is-open")) close();
    });

    initLaunchBarSync();
  }

  return { init, open, close, syncLaunchBarPadding };
})();
