/**
 * navigation.js
 * - Header dobiva puniju pozadinu nakon scrolla
 * - Mobilni hamburger izbornik (otvori/zatvori, ESC, focus trap)
 * - Isticanje aktivne poveznice u navigaciji dok korisnik skrola
 */

import { trapFocus, lockBodyScroll } from "./utils.js";

export function initNavigation() {
  const header = document.querySelector("[data-site-header]");
  const toggle = document.querySelector("[data-nav-toggle]");
  const mobileNav = document.querySelector("[data-nav-mobile]");
  const navLinks = document.querySelectorAll("[data-nav-link]");
  const sections = Array.from(document.querySelectorAll("main > section[id]"));

  initStickyHeader(header);
  initMobileMenu(toggle, mobileNav, navLinks);
  initActiveLinkTracking(sections, navLinks);
}

/* ---------- Sticky header ---------- */
function initStickyHeader(header) {
  if (!header) return;

  const setState = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  setState();
  window.addEventListener("scroll", setState, { passive: true });
}

/* ---------- Mobile menu ---------- */
function initMobileMenu(toggle, mobileNav, navLinks) {
  if (!toggle || !mobileNav) return;

  let lastFocused = null;

  const open = () => {
    lastFocused = document.activeElement;
    mobileNav.hidden = false;
    // Sljedeći frame kako bi CSS tranzicija (opacity/visibility) upalila.
    requestAnimationFrame(() => mobileNav.classList.add("is-open"));
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
    lockBodyScroll(true);
    const firstLink = mobileNav.querySelector("a, button");
    firstLink?.focus();
  };

  const close = () => {
    mobileNav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    lockBodyScroll(false);
    setTimeout(() => {
      if (!mobileNav.classList.contains("is-open")) mobileNav.hidden = true;
    }, 320);
    lastFocused?.focus();
  };

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    isOpen ? close() : open();
  });

  mobileNav.addEventListener("keydown", (event) => {
    if (event.key === "Escape") close();
    trapFocus(mobileNav, event);
  });

  // Zatvori izbornik klikom na poveznicu ili na CTA gumb unutar njega.
  mobileNav.querySelectorAll("a, [data-close-mobile-nav]").forEach((el) => {
    el.addEventListener("click", () => close());
  });
}

/* ---------- Aktivna poveznica prema trenutnoj sekciji ---------- */
function initActiveLinkTracking(sections, navLinks) {
  if (!sections.length || !("IntersectionObserver" in window)) return;

  const setActive = (id) => {
    navLinks.forEach((link) => {
      const isMatch = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("is-active", isMatch);
      if (isMatch) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}
