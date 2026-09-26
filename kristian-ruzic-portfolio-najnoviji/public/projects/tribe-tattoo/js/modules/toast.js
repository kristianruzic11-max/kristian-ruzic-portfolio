/**
 * toast.js
 * Prikazuje kratku potvrdnu poruku pri dnu ekrana (npr. "Dodano u
 * košaricu"). Koristi se iz shop.js i za sve elemente koji imaju
 * atribut data-toast="poruka" (npr. "Pogledaj cijelu galeriju").
 */

let toastEl;
let messageEl;
let hideTimer;

export function initToast() {
  toastEl = document.querySelector("[data-toast-el]");
  messageEl = document.querySelector("[data-toast-message]");

  // Bilo koji element s data-toast="..." automatski prikazuje toast.
  document.querySelectorAll("[data-toast]").forEach((el) => {
    el.addEventListener("click", (event) => {
      event.preventDefault();
      showToast(el.dataset.toast);
    });
  });
}

export function showToast(message, duration = 3200) {
  if (!toastEl) return;

  messageEl.textContent = message;
  toastEl.classList.add("is-visible");

  clearTimeout(hideTimer);
  hideTimer = setTimeout(() => {
    toastEl.classList.remove("is-visible");
  }, duration);
}
