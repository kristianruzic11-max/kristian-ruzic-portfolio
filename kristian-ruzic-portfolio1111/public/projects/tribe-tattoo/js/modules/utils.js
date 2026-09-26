/**
 * utils.js
 * Male, ponovno iskoristive pomoćne funkcije koje dijele svi moduli.
 */

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Vrati sve elemente unutar kontejnera na koje se može fokusirati. */
export function getFocusable(container) {
  return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
    (el) => el.offsetParent !== null
  );
}

/**
 * Jednostavan "focus trap" — dok je aktivan, Tab/Shift+Tab kruže
 * unutar zadanog kontejnera (koristi se u modalima, lightboxu i
 * mobilnoj navigaciji radi pristupačnosti tipkovnice).
 */
export function trapFocus(container, event) {
  if (event.key !== "Tab") return;

  const focusable = getFocusable(container);
  if (focusable.length === 0) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

/** Vrati true ako korisnik preferira smanjeno kretanje (reduced motion). */
export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Zaključaj/otključaj scroll na <body> (koristi se dok je modal/nav otvoren). */
export function lockBodyScroll(shouldLock) {
  document.body.style.overflow = shouldLock ? "hidden" : "";
}
