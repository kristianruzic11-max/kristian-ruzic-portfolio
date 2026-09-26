/**
 * modal.js
 * Generički open/close mehanizam za sve modale (rezervacija,
 * quick view). Svaki gumb s data-open-modal="ime" otvara
 * modal-overlay s odgovarajućim data-modal="ime". Vraća korisne
 * funkcije koje booking.js i shop.js pozivaju za predaju/reset
 * podataka prije otvaranja/nakon zatvaranja.
 */

import { trapFocus, lockBodyScroll } from "./utils.js";

const openModals = new Map();

export function initModals() {
  const overlays = document.querySelectorAll(".modal-overlay[data-modal]");

  overlays.forEach((overlay) => {
    const name = overlay.dataset.modal;

    const close = () => {
      overlay.classList.remove("is-open");
      overlay.setAttribute("aria-hidden", "true");
      lockBodyScroll(false);
      const record = openModals.get(name);
      record?.lastFocused?.focus();
      record?.onClose?.();
    };

    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) close();
    });

    overlay.querySelectorAll("[data-modal-close]").forEach((btn) => {
      btn.addEventListener("click", close);
    });

    overlay.addEventListener("keydown", (event) => {
      if (!overlay.classList.contains("is-open")) return;
      if (event.key === "Escape") close();
      trapFocus(overlay, event);
    });

    openModals.set(name, { overlay, close, lastFocused: null, onClose: null });
  });

  // Bilo koji gumb s data-open-modal="ime" otvara odgovarajući modal.
  document.querySelectorAll("[data-open-modal]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      openModal(trigger.dataset.openModal, trigger);
    });
  });
}

/** Programatski otvori modal po imenu (npr. iz shop.js s podacima o proizvodu). */
export function openModal(name, triggerEl) {
  const record = openModals.get(name);
  if (!record) return;

  record.lastFocused = triggerEl || document.activeElement;
  record.overlay.classList.add("is-open");
  record.overlay.setAttribute("aria-hidden", "false");
  lockBodyScroll(true);

  const firstField = record.overlay.querySelector(
    "input, select, textarea, button:not([data-modal-close])"
  );
  firstField?.focus();

  record.onOpen?.(triggerEl);
}

export function closeModal(name) {
  openModals.get(name)?.close();
}

/** Registriraj callback koji se izvrši svaki put kad se modal otvori/zatvori. */
export function onModalOpen(name, callback) {
  const record = openModals.get(name);
  if (record) record.onOpen = callback;
}

export function onModalClose(name, callback) {
  const record = openModals.get(name);
  if (record) record.onClose = callback;
}
