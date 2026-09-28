/* ===========================================
   GAURAV PORTFOLIO — MAIN.JS
   Vanilla JS: intro, nav, scroll animations
   =========================================== */

(function () {
  'use strict';

  // ─────────────────────────────────────────
  // 1. INTRO TYPEWRITER
  // ─────────────────────────────────────────
  const introEl = document.getElementById('intro');
  const introTextEl = document.getElementById('intro-text');
  const introCursorEl = document.getElementById('intro-cursor');
  const name = 'GAURAV.';
  let charIndex = 0;

  function type() {
    if (charIndex < name.length) {
      introTextEl.textContent = name.slice(0, ++charIndex);
      introTextEl.appendChild(introCursorEl);
      setTimeout(type, 65);
    } else {
      // Hold, then exit
      setTimeout(exitIntro, 320);
    }
  }

  function exitIntro() {
    introEl.classList.add('fade-out');
    // After transition, remove from DOM and trigger hero animations
    setTimeout(() => {
      introEl.style.display = 'none';
      revealHero();
    }, 600);
  }

  type();

  // ─────────────────────────────────────────
  // 2. HERO REVEAL (fires after intro exits)
  // ─────────────────────────────────────────
  function revealHero() {
    // Show nav
    document.querySelector('nav').classList.add('visible');

    // Stagger headline words
    const words = document.querySelectorAll('.headline-word');
    words.forEach((word, i) => {
      setTimeout(() => word.classList.add('revealed'), i * 120);
    });

    // Sub + badge + index after words
    setTimeout(() => {
      const sub = document.querySelector('.hero-sub');
      const badge = document.querySelector('.hero-badge');
      const idx = document.querySelector('.hero-index');
      const scroll = document.querySelector('.hero-scroll');
      if (sub) sub.classList.add('visible');
      if (badge) badge.classList.add('visible');
      if (idx) idx.classList.add('visible');
      if (scroll) scroll.classList.add('visible');
    }, words.length * 120 + 200);
  }

  // ─────────────────────────────────────────
  // 3. NAV SCROLL BLUR
  // ─────────────────────────────────────────
  const nav = document.querySelector('nav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });

  // ─────────────────────────────────────────
  // 4. SCROLL REVEAL — Intersection Observer
  // ─────────────────────────────────────────
  const revealSelectors = '.reveal, .reveal-x, .reveal-fade';
  const revealEls = document.querySelectorAll(revealSelectors);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay || 0;
        setTimeout(() => el.classList.add('visible'), delay);
        observer.unobserve(el);
      }
    });
  }, {
    rootMargin: '-8% 0px',
    threshold: 0.01
  });

  revealEls.forEach(el => observer.observe(el));

  // ─────────────────────────────────────────
  // 5. CURRENT YEAR IN FOOTER
  // ─────────────────────────────────────────
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
