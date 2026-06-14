/* ===========================
   AARSHI WEBSITE — JS
   =========================== */

(function () {
  "use strict";

  /* --- CURTAIN REVEAL --- */
  const curtain = document.getElementById("curtain");
  if (curtain) {
    // Small delay so user sees the curtain, then open
    setTimeout(() => {
      curtain.classList.add("open");
      // Remove from DOM after animation so it doesn't block
      setTimeout(() => curtain.classList.add("gone"), 1300);
    }, 800);
  }

  /* --- NAV SCROLL STATE --- */
  const nav = document.getElementById("nav");
  function onScroll() {
    if (window.scrollY > 40) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* --- MOBILE NAV TOGGLE --- */
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      navToggle.setAttribute(
        "aria-expanded",
        navLinks.classList.contains("open") ? "true" : "false"
      );
    });
    // Close on link click
    navLinks.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* --- SCROLL REVEAL --- */
  const revealEls = document.querySelectorAll(
    ".pillar, .event-card, .trophy-item, .ach-item, .team-card, .contact-card, .about-text, .about-pillars, .trophy-banner, .other-achievements, .drama-room-note"
  );

  revealEls.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  revealEls.forEach((el) => observer.observe(el));

  /* --- STAGGERED REVEAL FOR GRIDS --- */
  function staggerReveal(parentSelector, childSelector, delayStep) {
    const parent = document.querySelector(parentSelector);
    if (!parent) return;
    parent.querySelectorAll(childSelector).forEach((el, i) => {
      el.style.transitionDelay = `${i * delayStep}ms`;
    });
  }
  staggerReveal(".about-pillars", ".pillar", 80);
  staggerReveal(".events-grid", ".event-card", 80);
  staggerReveal(".team-grid", ".team-card", 60);
  staggerReveal(".ach-list", ".ach-item", 80);
  staggerReveal(".contact-grid", ".contact-card", 80);

  /* --- ACTIVE NAV HIGHLIGHT ON SCROLL --- */
  const sections = document.querySelectorAll("section[id]");
  const navAnchors = document.querySelectorAll(".nav-links a[href^='#']");

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navAnchors.forEach((a) => a.classList.remove("active"));
          const activeAnchor = document.querySelector(
            `.nav-links a[href='#${entry.target.id}']`
          );
          if (activeAnchor) activeAnchor.classList.add("active");
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((s) => sectionObserver.observe(s));
})();
