/**
 * main.js
 * Ulazna točka aplikacije. Uvozi sve module i pokreće ih nakon
 * učitavanja DOM-a. Svaki modul je samostalan i odgovoran za svoj
 * dio funkcionalnosti (vidi js/modules/).
 */

import { initNavigation } from "./modules/navigation.js";
import { initScrollAnimations } from "./modules/scrollAnimations.js";
import { initGallery } from "./modules/gallery.js";
import { initModals } from "./modules/modal.js";
import { initBooking } from "./modules/booking.js";
import { initShop } from "./modules/shop.js";
import { initToast } from "./modules/toast.js";
import { initBackToTop } from "./modules/backToTop.js";
import { initAftercareTabs } from "./modules/aftercareTabs.js";

function initYearStamp() {
  const el = document.querySelector("[data-current-year]");
  if (el) el.textContent = new Date().getFullYear();
}

function init() {
  initYearStamp();
  initNavigation();
  initToast();
  initModals();
  initBooking();
  initShop();
  initGallery();
  initBackToTop();
  initAftercareTabs();
  // Scroll animacije zadnje, nakon što je sav sadržaj u DOM-u.
  initScrollAnimations();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
