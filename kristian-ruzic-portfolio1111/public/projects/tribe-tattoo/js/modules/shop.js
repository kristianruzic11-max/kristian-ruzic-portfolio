/**
 * shop.js
 * Fills the "quick view" modal with data from the clicked product
 * card (data-product-* attributes) and manages color + size selection.
 *
 * Colors and sizes are read per-product from data-product-colors /
 * data-product-sizes (comma-separated) on the product-card button, so
 * each product can offer its own set — see index.html's #shop cards.
 *
 * Picking a color re-renders the product photo in that color. Some
 * colors have their own real photographed mockup (data-product-color-photos
 * on the product-card button, a comma-separated "Name:path" list); for
 * anything else, the color is synthesized client-side from the base
 * photo (see productColor.js). Either way both the quick-view photo and
 * the product's thumbnail back in the grid are updated, so the new
 * color sticks even after the modal is closed.
 *
 * Ordering currently goes through email (data-buy-link in index.html
 * is a real, static mailto: link) — there's no cart of its own since
 * the studio has no checkout system yet. Once it does, replace that
 * link with a real add-to-cart call to the chosen e-commerce service,
 * reusing selectedColor/selectedSize/currentProductName here as needed.
 */

import { onModalOpen } from "./modal.js";
import { getRecoloredImage } from "./productColor.js";

// Best-effort swatch colors for common product-color names. Anything
// not listed falls back to a neutral mid-grey dot so a new color name
// typed into data-product-colors still renders something reasonable.
const COLOR_SWATCHES = {
  black: "#171717",
  white: "#efece6",
  charcoal: "#b7b8bb",
  navy: "#1b2436",
  stone: "#b9ae9c",
  natural: "#e6dcc6",
  "forest green": "#1f3a2c",
  grey: "#8c8c8c",
  gray: "#8c8c8c",
  "heather grey": "#a8a8a4",
  maroon: "#5c1f28",
  cream: "#efe6d3",
};

function swatchColor(name) {
  return COLOR_SWATCHES[name.trim().toLowerCase()] || "#9a9a9a";
}

/** Parses data-product-color-photos="Name:path|Name2:path2" into a
 * lowercase-name -> path Map. Pairs are "|"-separated rather than
 * comma-separated because the path becomes a data: URI once bundled
 * for the standalone preview, and "data:image/jpeg;base64,..." itself
 * contains a comma. Missing/malformed entries are skipped. */
function parseColorPhotos(raw) {
  const map = new Map();
  (raw || "")
    .split("|")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .forEach((entry) => {
      const idx = entry.indexOf(":");
      if (idx === -1) return;
      const name = entry.slice(0, idx).trim();
      const path = entry.slice(idx + 1).trim();
      if (name && path) map.set(name.toLowerCase(), path);
    });
  return map;
}

export function initShop() {
  const overlay = document.querySelector('.modal-overlay[data-modal="quickview"]');
  if (!overlay) return;

  const nameEl = overlay.querySelector("[data-quickview-name]");
  const priceEl = overlay.querySelector("[data-quickview-price]");
  const descEl = overlay.querySelector("[data-quickview-desc]");
  const iconWrap = overlay.querySelector("[data-quickview-iconwrap]");
  const iconUse = overlay.querySelector("[data-quickview-icon] use");
  const photoEl = overlay.querySelector("[data-quickview-photo]");
  const colorGroup = overlay.querySelector("[data-color-group]");
  const colorNameEl = overlay.querySelector("[data-quickview-color-name]");
  const sizeGroup = overlay.querySelector("[data-size-group]");

  let selectedSize = "";
  let currentTrigger = null;
  let currentBasePhoto = "";
  let currentNativeColor = "";
  let currentColorPhotos = new Map();
  let currentGridImg = null;
  let requestToken = 0;

  async function applyColor(name) {
    if (!currentBasePhoto) return;
    const token = ++requestToken;
    const hex = swatchColor(name);
    const key = name.trim().toLowerCase();

    // The product's own photographed color: just show the crisp original.
    if (key === currentNativeColor.trim().toLowerCase()) {
      photoEl.src = currentBasePhoto;
      if (currentGridImg) currentGridImg.src = currentBasePhoto;
      return;
    }

    // A real photographed mockup exists for this color too — use it
    // directly rather than synthesizing one from the base photo.
    const realPhoto = currentColorPhotos.get(key);
    if (realPhoto) {
      photoEl.src = realPhoto;
      if (currentGridImg) currentGridImg.src = realPhoto;
      return;
    }

    try {
      const url = await getRecoloredImage(currentBasePhoto, name, hex);
      if (token !== requestToken) return; // a newer color was picked meanwhile
      photoEl.src = url;
      if (currentGridImg) currentGridImg.src = url;
    } catch (err) {
      // Recoloring isn't supported (very old browser, tainted canvas, etc.)
      // — fall back to the photographed color rather than breaking the UI.
      console.warn("Product recolor failed, showing original photo instead.", err);
      photoEl.src = currentBasePhoto;
      if (currentGridImg) currentGridImg.src = currentBasePhoto;
    }
  }

  function selectColor(name) {
    if (colorNameEl) colorNameEl.textContent = name;
    colorGroup.querySelectorAll(".color-pill").forEach((pill) => {
      pill.classList.toggle("is-selected", pill.dataset.color === name);
    });
    if (currentTrigger) currentTrigger.dataset.selectedColor = name;
    applyColor(name);
  }

  function selectSize(value) {
    selectedSize = value;
    sizeGroup.querySelectorAll(".size-pill").forEach((pill) => {
      pill.classList.toggle("is-selected", pill.dataset.size === value);
    });
  }

  function buildColors(names, initial) {
    colorGroup.innerHTML = "";
    names.forEach((name) => {
      const pill = document.createElement("button");
      pill.type = "button";
      pill.className = "color-pill";
      pill.dataset.color = name;
      pill.style.setProperty("--swatch", swatchColor(name));
      pill.setAttribute("aria-label", name);
      pill.title = name;
      pill.addEventListener("click", () => selectColor(name));
      colorGroup.appendChild(pill);
    });
    selectColor(initial && names.includes(initial) ? initial : names[0] || "");
  }

  function buildSizes(values) {
    sizeGroup.innerHTML = "";
    const multiChar = values.some((v) => v.replace(/\s/g, "").length > 2);
    sizeGroup.classList.toggle("quickview__sizes--wide", multiChar);
    values.forEach((value) => {
      const pill = document.createElement("button");
      pill.type = "button";
      pill.className = "size-pill";
      pill.dataset.size = value;
      pill.textContent = value;
      pill.addEventListener("click", () => selectSize(value));
      sizeGroup.appendChild(pill);
    });
    selectSize(values[0] || "");
  }

  onModalOpen("quickview", (triggerEl) => {
    if (!triggerEl) return;
    const {
      productName,
      productPrice,
      productIcon,
      productPhoto,
      productDesc,
      productColors,
      productSizes,
      productNativeColor,
      productColorPhotos,
      selectedColor,
    } = triggerEl.dataset;

    currentTrigger = triggerEl;
    currentBasePhoto = productPhoto || "";
    currentNativeColor = productNativeColor || "";
    currentColorPhotos = parseColorPhotos(productColorPhotos);
    currentGridImg = triggerEl.querySelector(".product-card__frame img");

    nameEl.textContent = productName || "Product";
    priceEl.textContent = productPrice || "";
    descEl.textContent = productDesc || "";

    if (productPhoto) {
      photoEl.hidden = false;
      iconWrap.hidden = true;
    } else {
      iconUse.setAttribute("href", `#${productIcon || "icon-shirt"}`);
      iconWrap.hidden = false;
      photoEl.hidden = true;
      photoEl.removeAttribute("src");
    }

    const colors = (productColors || "Black").split(",").map((c) => c.trim()).filter(Boolean);
    const sizes = (productSizes || "S,M,L,XL").split(",").map((s) => s.trim()).filter(Boolean);
    buildColors(colors, selectedColor);
    buildSizes(sizes);
  });
}
