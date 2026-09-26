(function () {
  "use strict";

  /* ---------- Header scroll state ---------- */
  var header = document.getElementById("siteHeader");
  var backToTop = document.getElementById("backToTop");

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle("scrolled", y > 12);
    if (backToTop) backToTop.classList.toggle("show", y > 600);
  }
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Mobile nav ---------- */
  var navToggle = document.getElementById("navToggle");
  var mobileNav = document.getElementById("mobileNav");

  function closeNav() {
    if (!mobileNav) return;
    mobileNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  }

  if (navToggle && mobileNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mobileNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("nav-open", isOpen);
    });

    mobileNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  /* Close mobile nav automatically if resized to desktop */
  window.addEventListener("resize", function () {
    if (window.innerWidth > 1024) closeNav();
  });

  /* ---------- Active nav link on scroll ---------- */
  var sections = ["usluge", "o-nama", "reference", "kontakt"]
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);
  var navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

  if (sections.length && "IntersectionObserver" in window) {
    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = entry.target.id;
          navLinks.forEach(function (link) {
            link.classList.toggle("active", link.getAttribute("href") === "#" + id);
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (s) { navObserver.observe(s); });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll("[data-reveal], [data-reveal-group]");
  if ("IntersectionObserver" in window && revealEls.length) {
    var revealObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
  }

  /* Enable transitions only after first paint, avoids flash on load */
  window.requestAnimationFrame(function () {
    document.body.classList.add("loaded");
  });

  /* ---------- Testimonial carousel ---------- */
  var track = document.getElementById("testimonialTrack");
  var prevBtn = document.getElementById("testPrev");
  var nextBtn = document.getElementById("testNext");

  if (track && prevBtn && nextBtn) {
    var scrollByCard = function (dir) {
      var card = track.querySelector(".testimonial-card");
      if (!card) return;
      var gap = 22;
      var amount = card.getBoundingClientRect().width + gap;
      track.scrollBy({ left: dir * amount, behavior: "smooth" });
    };
    prevBtn.addEventListener("click", function () { scrollByCard(-1); });
    nextBtn.addEventListener("click", function () { scrollByCard(1); });
  }

  /* ---------- Contact form (client-side only demo) ---------- */
  var form = document.getElementById("contactForm");
  var status = document.getElementById("formStatus");

  function setInvalid(group, invalid) {
    if (!group) return;
    group.classList.toggle("invalid", invalid);
  }

  function isValidEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  function isValidPhone(v) {
    return /^[0-9+()\s-]{6,}$/.test(v);
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var nameInput = document.getElementById("fullName");
      var phoneInput = document.getElementById("phone");
      var emailInput = document.getElementById("email");
      var messageInput = document.getElementById("message");
      var consentInput = document.getElementById("consent");

      var valid = true;

      var nameOk = nameInput.value.trim().length > 1;
      setInvalid(nameInput.closest(".form-group"), !nameOk);
      valid = valid && nameOk;

      var phoneOk = isValidPhone(phoneInput.value.trim());
      setInvalid(phoneInput.closest(".form-group"), !phoneOk);
      valid = valid && phoneOk;

      var emailOk = isValidEmail(emailInput.value.trim());
      setInvalid(emailInput.closest(".form-group"), !emailOk);
      valid = valid && emailOk;

      var messageOk = messageInput.value.trim().length > 4;
      setInvalid(messageInput.closest(".form-group"), !messageOk);
      valid = valid && messageOk;

      if (!consentInput.checked) valid = false;

      if (!status) return;

      status.classList.remove("show", "success", "error");

      if (!valid) {
        status.textContent = "Please fix the highlighted fields and accept the privacy policy before sending.";
        status.classList.add("show", "error");
        return;
      }

      /*
        NOTE: This form is not yet wired to a backend or email service.
        To make it functional, connect it to a form endpoint (e.g. your
        own API, Formspree, Netlify Forms) or replace this block with a
        fetch() call to your service, then handle the response instead
        of showing the message below.
      */
      status.textContent = "Thanks! Your request is ready to send — connect this form to your email service so submissions are actually received.";
      status.classList.add("show", "success");
      form.reset();
    });

    ["fullName", "phone", "email", "message"].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      el.addEventListener("input", function () {
        setInvalid(el.closest(".form-group"), false);
      });
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
