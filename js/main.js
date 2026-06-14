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
  /* --- GALLERY FILTER --- */
  const filterBtns = document.querySelectorAll(".gf-btn");
  const galItems   = document.querySelectorAll(".gal-item");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      galItems.forEach((item) => {
        if (filter === "all" || item.dataset.category === filter) {
          item.classList.remove("hidden");
        } else {
          item.classList.add("hidden");
        }
      });
    });
  });

  /* --- LIGHTBOX --- */
  const lightbox = document.getElementById("lightbox");
  const lbImg    = document.getElementById("lbImg");
  const lbCap    = document.getElementById("lbCaption");
  const lbClose  = document.getElementById("lbClose");
  const lbPrev   = document.getElementById("lbPrev");
  const lbNext   = document.getElementById("lbNext");

  let currentIndex = 0;
  let visibleItems = [];

  function openLightbox(index) {
    visibleItems = Array.from(galItems).filter(
      (el) => !el.classList.contains("hidden")
    );
    currentIndex = index;
    showLbImage();
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }

  function showLbImage() {
    const item = visibleItems[currentIndex];
    const img  = item.querySelector("img");
    lbImg.src  = img.src;
    lbImg.alt  = img.alt;
    lbCap.textContent = item.dataset.caption || img.alt;
  }

  galItems.forEach((item) => {
    item.addEventListener("click", () => {
      visibleItems = Array.from(galItems).filter(
        (el) => !el.classList.contains("hidden")
      );
      const idx = visibleItems.indexOf(item);
      openLightbox(idx);
    });
  });

  lbClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  lbNext.addEventListener("click", (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % visibleItems.length;
    showLbImage();
  });

  lbPrev.addEventListener("click", (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
    showLbImage();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape")     closeLightbox();
    if (e.key === "ArrowRight") { currentIndex = (currentIndex + 1) % visibleItems.length; showLbImage(); }
    if (e.key === "ArrowLeft")  { currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length; showLbImage(); }
  });

  /* --- IICM GALLERY FILTER --- */
  const iicmFilterBtns = document.querySelectorAll("[data-iicm-filter]");
  const iicmItems      = document.querySelectorAll(".iicm-item");

  iicmFilterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      iicmFilterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.iicmFilter;
      iicmItems.forEach((item) => {
        if (filter === "all" || item.dataset.iicm === filter) {
          item.classList.remove("hidden");
        } else {
          item.classList.add("hidden");
        }
      });
    });
  });

  /* Make IICM items open in the same shared lightbox */
  iicmItems.forEach((item) => {
    item.addEventListener("click", () => {
      const visibleIicm = Array.from(iicmItems).filter(
        (el) => !el.classList.contains("hidden")
      );
      const idx = visibleIicm.indexOf(item);
      /* Temporarily set visibleItems to the IICM set */
      visibleItems = visibleIicm;
      currentIndex = idx;
      showLbImage();
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });

})();
