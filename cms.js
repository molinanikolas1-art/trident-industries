/* ============================================================
   TRIDENT INDUSTRIES — cms.js
   Loads content from JSON files and populates the page.
   Included on every page BEFORE script.js
   ============================================================ */

(function () {
  'use strict';

  // Fill a single element's text/html
  function fill(selector, value, attr) {
    const el = document.querySelector(selector);
    if (!el || value === undefined) return;
    if (attr) { el.setAttribute(attr, value); return; }
    el.textContent = value;
  }

  function fillAll(selector, value) {
    document.querySelectorAll(selector).forEach(el => { el.textContent = value; });
  }

  // Apply site-wide settings (contact info, etc.)
  async function loadSite() {
    try {
      const r = await fetch('/content/site.json');
      const d = await r.json();
      fillAll('[data-cms="email"]', d.email);
      fillAll('[data-cms="phone"]', d.phone);
      fillAll('[data-cms="company_name"]', d.company_name);
      fillAll('[data-cms="footer_tagline"]', d.footer_tagline);
      fillAll('[data-cms="tagline"]', d.tagline);
      // Update all mailto/tel links
      document.querySelectorAll('a[href^="mailto:"]').forEach(a => { a.href = `mailto:${d.email}`; a.textContent = d.email; });
      document.querySelectorAll('a[href^="tel:"]').forEach(a => {
        const raw = d.phone.replace(/\D/g,'');
        a.href = `tel:+1${raw}`;
        a.textContent = d.phone;
      });
    } catch(e) { /* content file not found, use static HTML */ }
  }

  // Home page
  async function loadHome() {
    if (!document.querySelector('[data-page="home"]')) return;
    try {
      const r = await fetch('/content/home.json');
      const d = await r.json();
      fill('[data-cms="hero_eyebrow"]', d.hero_eyebrow);
      // Hero title: support \n line breaks
      const titleEl = document.querySelector('[data-cms="hero_title"]');
      if (titleEl && d.hero_title) {
        titleEl.innerHTML = d.hero_title.replace(/\\n/g, '<br/>').replace(/\n/g, '<br/>');
      }
      fill('[data-cms="hero_subtitle"]', d.hero_subtitle);
      fill('[data-cms="hero_cta_primary"]', d.hero_cta_primary);
      fill('[data-cms="hero_cta_secondary"]', d.hero_cta_secondary);
      fill('[data-cms="what_we_do_label"]', d.what_we_do_label);
      fill('[data-cms="what_we_do_title"]', d.what_we_do_title);
      fill('[data-cms="what_we_do_text"]', d.what_we_do_text);
      fill('[data-cms="about_label"]', d.about_label);
      fill('[data-cms="about_title"]', d.about_title);
      fill('[data-cms="about_text1"]', d.about_text1);
      fill('[data-cms="about_text2"]', d.about_text2);
      fill('[data-cms="cta_title"]', d.cta_title);
      fill('[data-cms="cta_subtitle"]', d.cta_subtitle);
      fill('[data-cms="cta_primary"]', d.cta_primary);
      fill('[data-cms="cta_secondary"]', d.cta_secondary);
      // Industries band
      const band = document.querySelector('[data-cms="industries_band"]');
      if (band && d.industries) {
        band.innerHTML = d.industries.map(ind => `
          <div class="industry-item"><span class="industry-dot"></span><span>${ind}</span></div>
        `).join('');
      }
      // Capabilities list
      const capList = document.querySelector('[data-cms="capabilities_list"]');
      if (capList && d.what_we_do_capabilities) {
        capList.innerHTML = d.what_we_do_capabilities.map(c => `<li>${c}</li>`).join('');
      }
    } catch(e) {}
  }

  // Services page
  async function loadServices() {
    if (!document.querySelector('[data-page="services"]')) return;
    try {
      const r = await fetch('/content/services.json');
      const d = await r.json();
      fill('[data-cms="page_label"]', d.page_label);
      fill('[data-cms="page_title"]', d.page_title);
      // Update each service section
      if (d.services) {
        d.services.forEach(svc => {
          const section = document.querySelector(`[data-service="${svc.id}"]`);
          if (!section) return;
          const q = (sel) => section.querySelector(sel);
          if (q('[data-cms="svc_label"]')) q('[data-cms="svc_label"]').textContent = `${svc.number} — ${svc.label}`;
          if (q('[data-cms="svc_title"]')) q('[data-cms="svc_title"]').textContent = svc.title;
          if (q('[data-cms="svc_desc"]'))  q('[data-cms="svc_desc"]').textContent = svc.description;
          if (q('[data-cms="svc_img"]'))   q('[data-cms="svc_img"]').src = `/${svc.image}`;
          // Specs
          const specsList = q('[data-cms="svc_specs"]');
          if (specsList && svc.specs) {
            specsList.innerHTML = svc.specs.map(s => `
              <div class="service-spec">
                <span class="service-spec-label">${s.label}</span>
                <span class="service-spec-value">${s.value}</span>
              </div>`).join('');
          }
        });
      }
    } catch(e) {}
  }

  // Gallery page
  async function loadGallery() {
    if (!document.querySelector('[data-page="gallery"]')) return;
    try {
      const r = await fetch('/content/gallery.json');
      const d = await r.json();
      fill('[data-cms="page_label"]', d.page_label);
      fill('[data-cms="page_title"]', d.page_title);
      fill('[data-cms="page_description"]', d.page_description);
      const grid = document.querySelector('[data-cms="gallery_grid"]');
      if (grid && d.items) {
        grid.innerHTML = d.items.map(item => `
          <div class="gallery-item">
            <img src="/${item.image}" alt="${item.label}" loading="lazy" />
            <div class="gallery-item-overlay"><span class="gallery-item-label">${item.label}</span></div>
          </div>`).join('');
      }
    } catch(e) {}
  }

  // Contact page
  async function loadContact() {
    if (!document.querySelector('[data-page="contact"]')) return;
    try {
      const r = await fetch('/content/contact.json');
      const d = await r.json();
      fill('[data-cms="page_title"]', d.page_title);
      fill('[data-cms="page_description"]', d.page_description);
      fill('[data-cms="section_title"]', d.section_title);
      fill('[data-cms="section_text"]', d.section_text);
      fill('[data-cms="response_time"]', d.response_time);
      // Industries list
      const indList = document.querySelector('[data-cms="contact_industries"]');
      if (indList && d.industries) {
        indList.innerHTML = d.industries.map(i => `<li>${i}</li>`).join('');
      }
    } catch(e) {}
  }

  // Run all loaders
  document.addEventListener('DOMContentLoaded', function () {
    loadSite();
    loadHome();
    loadServices();
    loadGallery();
    loadContact();
  });

})();
