/**
 * booking.js
 * Validacija i (mock) slanje forme za rezervaciju termina.
 *
 * BACKEND HOOK: trenutno nema pravog API-ja — submitBooking()
 * simulira mrežni poziv s kratkim odgodom. Kad postoji pravi
 * endpoint, zamijeni tijelo submitBooking() pravim fetch() pozivom,
 * npr.:
 *
 *   const res = await fetch("/api/rezervacije", {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify(payload),
 *   });
 *   if (!res.ok) throw new Error("Slanje nije uspjelo");
 */

import { onModalOpen, onModalClose } from "./modal.js";

const validators = {
  name: (value) => value.trim().length >= 2 || "Enter your full name.",
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Enter a valid email address.",
  phone: (value) => value.replace(/[^\d+]/g, "").length >= 8 || "Enter a valid phone number.",
  service: (value) => Boolean(value) || "Select a service.",
};

export function initBooking() {
  const overlay = document.querySelector('.modal-overlay[data-modal="booking"]');
  if (!overlay) return;

  const form = overlay.querySelector("[data-booking-form]");
  const formWrap = overlay.querySelector("[data-modal-form-wrap]");
  const successPanel = overlay.querySelector("[data-modal-success]");
  const submitBtn = form.querySelector('button[type="submit"]');
  const submitLabel = form.querySelector("[data-submit-label]");
  const serviceSelect = overlay.querySelector("[data-booking-service]");
  const artistSelect = overlay.querySelector("[data-booking-artist]");

  // If booking is opened from a specific artist's button (e.g. the
  // Iris Cole/Max Reed card in the team section), preselect that
  // artist — and, since Max is a piercer and Iris a tattoo artist,
  // preselect the matching service too.
  const artistToService = { "Iris Cole": "tattoo", "Max Reed": "piercing" };

  onModalOpen("booking", (triggerEl) => {
    const preselectedArtist = triggerEl?.dataset?.artist;
    if (preselectedArtist && artistSelect) {
      artistSelect.value = preselectedArtist;
    }
    if (preselectedArtist && serviceSelect && artistToService[preselectedArtist]) {
      serviceSelect.value = artistToService[preselectedArtist];
    }
  });

  // Kad se modal zatvori, resetiraj formu natrag na početno stanje
  // (nakon kratke odgode da se ne vidi "skok" tijekom zatvaranja).
  onModalClose("booking", () => {
    setTimeout(() => {
      form.reset();
      form.hidden = false;
      formWrap.hidden = false;
      successPanel.classList.remove("is-visible");
      clearErrors(form);
    }, 300);
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(form).entries());
    const errors = validate(data);

    clearErrors(form);

    if (Object.keys(errors).length > 0) {
      showErrors(form, errors);
      return;
    }

    submitBtn.disabled = true;
    submitLabel.textContent = "Sending...";

    try {
      await submitBooking(data);
      formWrap.hidden = true;
      successPanel.classList.add("is-visible");
    } catch (err) {
      showErrors(form, { name: "Something went wrong. Please try again." });
    } finally {
      submitBtn.disabled = false;
      submitLabel.textContent = "Send Request";
    }
  });

  serviceSelect?.addEventListener("change", () => {
    clearFieldError(form, "b-service");
  });
}

function validate(data) {
  const errors = {};
  Object.entries(validators).forEach(([field, check]) => {
    const result = check(data[field] || "");
    if (result !== true) errors[field] = result;
  });
  return errors;
}

function showErrors(form, errors) {
  Object.entries(errors).forEach(([field, message]) => {
    const input = form.querySelector(`[name="${field}"]`);
    const errorEl = form.querySelector(`[data-error-for="b-${field}"]`);
    if (errorEl) errorEl.textContent = message;
    input?.setAttribute("aria-invalid", "true");
  });
  form.querySelector(`[name="${Object.keys(errors)[0]}"]`)?.focus();
}

function clearErrors(form) {
  form.querySelectorAll(".form-error").forEach((el) => (el.textContent = ""));
  form.querySelectorAll("[aria-invalid]").forEach((el) => el.removeAttribute("aria-invalid"));
}

function clearFieldError(form, id) {
  const errorEl = form.querySelector(`[data-error-for="${id}"]`);
  if (errorEl) errorEl.textContent = "";
}

/** Mock "mrežni poziv" — zamijeni pravim fetch() kad backend bude spreman. */
function submitBooking(payload) {
  return new Promise((resolve) => {
    console.info("[booking] mock submit →", payload);
    setTimeout(resolve, 900);
  });
}
