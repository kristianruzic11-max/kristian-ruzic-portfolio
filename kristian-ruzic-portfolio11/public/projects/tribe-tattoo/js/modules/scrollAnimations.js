/**
 * scrollAnimations.js
 * Suptilne "fade + slide up" animacije za elemente označene s
 * [data-reveal] kada uđu u viewport. Elementi unutar
 * [data-reveal-group] (npr. grid galerije) dobivaju postupno
 * kašnjenje (--i) kako bi se pojavljivali jedan za drugim.
 */

import { prefersReducedMotion } from "./utils.js";

export function initScrollAnimations() {
  const revealEls = document.querySelectorAll("[data-reveal]");
  if (!revealEls.length) return;

  // Postavi indeks za grupno kašnjenje (npr. grid galerije).
  document.querySelectorAll("[data-reveal-group]").forEach((group) => {
    Array.from(group.children).forEach((child, i) => {
      child.style.setProperty("--i", i);
    });
  });

  if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-revealed"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.01, rootMargin: "0px 0px 120px 0px" }
  );

  revealEls.forEach((el) => observer.observe(el));
}
