/**
 * gallery.js
 * Galerija radova: filter po kategoriji (Sve / Tattoo / Piercing) s
 * glatkom fade tranzicijom + lightbox za uvećani prikaz koji podržava
 * i prave fotografije (data-photo) i ilustrirane placeholdere
 * (data-icon). Lightbox prev/next kruži samo kroz trenutno vidljive
 * (filtrirane) stavke.
 *
 * Elementi izvan galerije mogu programatski promijeniti filter i
 * odskrolati do sekcije preko [data-gallery-filter="tattoo|piercing|sve"]
 * (koristi se npr. na "Portfolio" gumbima kod Nensi/Renata).
 */

import { trapFocus, lockBodyScroll } from "./utils.js";

const FILTER_TRANSITION_MS = 220;

let items = [];
let filterButtons = [];

export function initGallery() {
  items = Array.from(document.querySelectorAll("[data-gallery-item]"));
  filterButtons = Array.from(document.querySelectorAll("[data-gallery-filters] [data-filter]"));
  const lightbox = document.querySelector("[data-lightbox]");

  initFilters();
  if (items.length && lightbox) initLightbox(lightbox);
  initExternalFilterTriggers();
}

/* ---------- Filtriranje po kategoriji (s glatkom tranzicijom) ---------- */
function initFilters() {
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => applyFilter(btn.dataset.filter));
  });
}

export function applyFilter(category) {
  filterButtons.forEach((btn) => {
    const isActive = btn.dataset.filter === category;
    btn.classList.toggle("is-active", isActive);
    btn.setAttribute("aria-selected", String(isActive));
  });

  const toHide = [];
  const toShow = [];

  items.forEach((item) => {
    const matches = category === "sve" || item.dataset.category === category;
    const currentlyHidden = item.classList.contains("is-hidden");
    if (matches && currentlyHidden) toShow.push(item);
    if (!matches && !currentlyHidden) toHide.push(item);
  });

  // Faza 1: elementi koji nestaju blago se smanje i nestanu.
  toHide.forEach((item) => item.classList.add("is-filtering-out"));

  window.setTimeout(() => {
    toHide.forEach((item) => {
      item.classList.add("is-hidden");
      item.classList.remove("is-filtering-out");
    });

    // Faza 2: novi elementi uđu u layout skriveni, pa se odmah "upale"
    // (reflow prije uklanjanja klase da tranzicija stvarno odigra).
    toShow.forEach((item) => {
      item.classList.remove("is-hidden");
      item.classList.add("is-filtering-out");
    });
    void document.body.offsetWidth;
    requestAnimationFrame(() => {
      toShow.forEach((item) => item.classList.remove("is-filtering-out"));
    });
  }, FILTER_TRANSITION_MS);
}

/** Vrati trenutno vidljive (neskrivene) stavke galerije, tim redom. */
function visibleItems() {
  return items.filter((item) => !item.classList.contains("is-hidden"));
}

/* Gumbi izvan galerije (npr. "Portfolio" kod umjetnika) koji postave
   filter i odskrolaju do galerije — sam scroll obavlja href="#galerija". */
function initExternalFilterTriggers() {
  document.querySelectorAll("[data-gallery-filter]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      applyFilter(trigger.dataset.galleryFilter);
    });
  });
}

/* ---------- Lightbox ---------- */
function initLightbox(lightbox) {
  const iconUse = lightbox.querySelector("[data-lightbox-icon] use");
  const iconEl = lightbox.querySelector("[data-lightbox-icon]");
  const photoEl = lightbox.querySelector("[data-lightbox-photo]");
  const titleEl = lightbox.querySelector("[data-lightbox-title]");
  const metaEl = lightbox.querySelector("[data-lightbox-meta]");
  const counterEl = lightbox.querySelector("[data-lightbox-counter]");
  const closeBtn = lightbox.querySelector("[data-lightbox-close]");
  const prevBtn = lightbox.querySelector("[data-lightbox-prev]");
  const nextBtn = lightbox.querySelector("[data-lightbox-next]");

  let currentItem = null;
  let lastFocused = null;

  const render = () => {
    const { title, style, artist, icon, photo } = currentItem.dataset;
    const visible = visibleItems();
    const position = visible.indexOf(currentItem);

    if (photo) {
      photoEl.src = photo;
      photoEl.alt = title || "";
      photoEl.hidden = false;
      iconEl.hidden = true;
    } else {
      iconUse.setAttribute("href", `#${icon}`);
      iconEl.hidden = false;
      photoEl.hidden = true;
      photoEl.removeAttribute("src");
    }

    titleEl.textContent = title;
    metaEl.textContent = `${style} · ${artist}`;
    counterEl.textContent = `${position + 1} / ${visible.length}`;

    const animatedEl = photo ? photoEl : iconEl;
    animatedEl.style.animation = "none";
    void animatedEl.offsetWidth; // reflow, da se animacija može ponovno pokrenuti
    animatedEl.style.animation = "reveal-up 0.4s ease-out";
  };

  const open = (item, triggerEl) => {
    lastFocused = triggerEl || document.activeElement;
    currentItem = item;
    render();
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    lockBodyScroll(true);
    closeBtn.focus();
  };

  const close = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    lockBodyScroll(false);
    lastFocused?.focus();
  };

  const showRelative = (delta) => {
    const visible = visibleItems();
    if (!visible.length) return;
    const position = visible.indexOf(currentItem);
    const nextPosition = (position + delta + visible.length) % visible.length;
    currentItem = visible[nextPosition];
    render();
  };

  items.forEach((item) => {
    item.addEventListener("click", () => open(item, item));
  });

  closeBtn.addEventListener("click", close);
  prevBtn.addEventListener("click", () => showRelative(-1));
  nextBtn.addEventListener("click", () => showRelative(1));

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) close();
  });

  lightbox.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("is-open")) return;

    if (event.key === "Escape") close();
    if (event.key === "ArrowLeft") showRelative(-1);
    if (event.key === "ArrowRight") showRelative(1);
    trapFocus(lightbox, event);
  });
}
