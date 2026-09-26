/**
 * backToTop.js
 * Prikazuje plutajući gumb za povratak na vrh stranice nakon što
 * korisnik odskrola dalje od prvog ekrana.
 */

export function initBackToTop() {
  const button = document.querySelector("[data-back-to-top]");
  if (!button) return;

  button.hidden = false; // ukloni [hidden], vidljivost dalje kontrolira CSS klasa

  const toggleVisibility = () => {
    button.classList.toggle("is-visible", window.scrollY > window.innerHeight * 0.8);
  };

  toggleVisibility();
  window.addEventListener("scroll", toggleVisibility, { passive: true });

  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
