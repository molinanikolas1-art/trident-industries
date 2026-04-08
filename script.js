/* ============================================================
   TRIDENT INDUSTRIES — script.js
   Nav behavior | Scroll reveals | Form | Hero bg
   ============================================================ */

(function () {
  'use strict';

  /* ---- Nav scroll behavior ---- */
  const nav = document.getElementById('nav');
  let lastY = 0;
  let ticking = false;

  function updateNav() {
    const y = window.scrollY;

    if (y < 80) {
      // At the top — snap nav back instantly, no slide animation
      nav.style.transition = 'background 0.35s, box-shadow 0.35s';
      nav.classList.remove('hidden', 'scrolled');
      nav.classList.add('at-top');
      requestAnimationFrame(() => { nav.style.transition = ''; });
    } else {
      nav.classList.remove('at-top');
      nav.classList.add('scrolled');
      // Hide nav when scrolling down quickly
      if (y > lastY + 60 && y > 200) {
        nav.classList.add('hidden');
      } else if (y < lastY - 10) {
        nav.classList.remove('hidden');
      }
    }

    lastY = y;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(updateNav); ticking = true; }
  }, { passive: true });

  /* ---- Mobile menu ---- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open);
      mobileMenu.setAttribute('aria-hidden', !open);
    });
    mobileMenu.querySelectorAll('a').forEach(l => l.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
    }));
  }

  /* ---- Hero bg ken-burns ---- */
  const heroBg = document.getElementById('heroBg');
  if (heroBg) {
    heroBg.style.backgroundImage = "url('assets/missile-flight.jpg')";
    setTimeout(() => heroBg.classList.add('loaded'), 100);
  }

  /* ---- Scroll reveal ---- */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    reveals.forEach(el => el.classList.add('hidden'));
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.remove('hidden');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => obs.observe(el));
  }

  /* ---- Service row hover image preview ---- */
  // Hover effect is CSS-only, no JS needed

  /* ---- Contact form ---- */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const orig = btn.innerHTML;
      btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="16" height="16"><path d="M20 6L9 17l-5-5"/></svg> Sent Successfully`;
      btn.style.background = '#1a6b2e';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = orig;
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 5000);
    });
  }

  /* ---- Smooth scroll for hash links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    });
  });

})();
