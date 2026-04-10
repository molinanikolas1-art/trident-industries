(function(){
  var bust='?v='+Date.now();
  function set(s,v){var e=document.querySelector(s);if(e&&v!=null)e.textContent=v;}
  function setAll(s,v){if(!v)return;document.querySelectorAll(s).forEach(function(e){e.textContent=v;});}

  /* DESIGN + WATERMARK */
  async function loadDesign(){try{
    var d=await fetch('/content/design.json'+bust).then(r=>r.json());
    var root=document.documentElement;
    if(d.accent_color)root.style.setProperty('--red',d.accent_color);
    if(d.accent_hover)root.style.setProperty('--red-hover',d.accent_hover);
    if(d.background_color)root.style.setProperty('--black',d.background_color);
    if(d.surface_color)root.style.setProperty('--gray-1',d.surface_color);
    if(d.text_color)root.style.setProperty('--white',d.text_color);
    if(d.nav_logo)document.querySelectorAll('.logo-full').forEach(function(i){i.src='/'+d.nav_logo;});
    if(d.hero_image){var h=document.getElementById('heroBg');if(h)h.style.backgroundImage="url('/"+d.hero_image+"')";}
    if(d.hero_overlay_opacity){var ov=document.querySelector('.hero-overlay');if(ov)ov.style.background='linear-gradient(to top,rgba(8,8,8,'+d.hero_overlay_opacity+') 0%,rgba(8,8,8,0.5) 40%,rgba(8,8,8,0.2) 80%,rgba(8,8,8,0.1) 100%)';}
    if(d.hero_watermark){var wm=document.querySelector('.hero-watermark span');if(wm)wm.textContent=d.hero_watermark;}
  }catch(e){}}

  /* SITE-WIDE */
  function updateLinks(phone,email){
    if(phone)document.querySelectorAll('a[href^="tel:"]').forEach(function(a){var r=phone.replace(/\D/g,'');a.href='tel:+1'+r;if(a.textContent.includes('(')||a.textContent.includes('+'))a.textContent=phone;});
    if(email)document.querySelectorAll('a[href^="mailto:"]').forEach(function(a){a.href='mailto:'+email;if(a.textContent.includes('@'))a.textContent=email;});
  }
  async function loadSite(){try{
    var d=await fetch('/content/site.json'+bust).then(r=>r.json());
    updateLinks(d.phone,d.email);
    setAll('.footer-tagline',d.footer_tagline);
    if(d.tagline)setAll('.footer-bottom span:last-child',d.tagline);
  }catch(e){}}

  /* HOME */
  async function loadHome(){if(!document.querySelector('.hero'))return;try{
    var d=await fetch('/content/home.json'+bust).then(r=>r.json());
    set('.hero-eyebrow',d.hero_eyebrow);
    if(d.hero_title){var t=document.querySelector('.hero-title');if(t)t.innerHTML=d.hero_title.replace(/\\n|\n/g,'<br/>');}
    set('.hero-sub',d.hero_subtitle);
    var hb=document.querySelectorAll('.hero-actions .btn');
    if(hb[0]&&d.hero_cta_primary)hb[0].textContent=d.hero_cta_primary;
    if(hb[1]&&d.hero_cta_secondary)hb[1].textContent=d.hero_cta_secondary;
    if(d.industries){var band=document.querySelector('.industries-band-inner');if(band)band.innerHTML=d.industries.map(function(i){return'<div class="industry-item"><span class="industry-dot"></span><span>'+i+'</span></div>';}).join('');}
    var st=document.querySelectorAll('.split-title');
    var sx=document.querySelectorAll('.split-text');
    var sl=document.querySelectorAll('.split-list');
    if(st[0]&&d.what_we_do_title)st[0].textContent=d.what_we_do_title;
    if(sx[0]&&d.what_we_do_text)sx[0].textContent=d.what_we_do_text;
    if(sl[0]&&d.what_we_do_capabilities)sl[0].innerHTML=d.what_we_do_capabilities.map(function(c){return'<li>'+c+'</li>';}).join('');
    if(st[1]&&d.printing_title)st[1].textContent=d.printing_title;
    if(sx[1]&&d.printing_text)sx[1].textContent=d.printing_text;
    if(sl[1]&&d.printing_materials)sl[1].innerHTML=d.printing_materials.map(function(c){return'<li>'+c+'</li>';}).join('');
    /* DIVIDER */
    if(d.divider_label){var dl=document.querySelector('.full-bleed-text .label');if(dl)dl.textContent=d.divider_label;}
    set('.full-bleed-quote',d.divider_title);
    if(d.divider_image){var di=document.querySelector('.full-bleed img');if(di)di.src='/'+d.divider_image;}
    /* GALLERY STRIP */
    if(d.gallery_strip){var gs=document.querySelector('.gallery-strip');if(gs)gs.innerHTML=d.gallery_strip.map(function(i){return'<div class="gallery-strip-item"><img src="/'+i.image+'" alt="'+i.label+'" loading="lazy"/><div class="gallery-strip-label">'+i.label+'</div></div>';}).join('');}
    /* ABOUT */
    var at=document.querySelector('.about-title');
    var ax=document.querySelectorAll('.about-text');
    if(at&&d.about_title)at.textContent=d.about_title;
    if(ax[0]&&d.about_text1)ax[0].textContent=d.about_text1;
    if(ax[1]&&d.about_text2)ax[1].textContent=d.about_text2;
    /* CTA */
    set('.cta-strip-title',d.cta_title);
    set('.cta-strip-sub',d.cta_subtitle);
    var cb=document.querySelectorAll('.cta-strip-actions .btn');
    if(cb[0]&&d.cta_primary)cb[0].textContent=d.cta_primary;
    if(cb[1]&&d.cta_secondary)cb[1].textContent=d.cta_secondary;
  }catch(e){}}

  /* SERVICES */
  async function loadServices(){if(!document.querySelector('.service-detail'))return;try{
    var d=await fetch('/content/services.json'+bust).then(r=>r.json());
    set('.page-hero-title',d.page_title);
    if(d.services)d.services.forEach(function(svc){
      var sec=document.querySelector('[data-service="'+svc.id+'"]');if(!sec)return;
      var ti=sec.querySelector('.service-detail-title');
      var de=sec.querySelector('.service-detail-text');
      var im=sec.querySelector('img');
      var sp=sec.querySelector('.service-specs');
      if(ti)ti.textContent=svc.title;
      if(de)de.textContent=svc.description;
      if(im&&svc.image)im.src='/'+svc.image;
      if(sp&&svc.specs)sp.innerHTML=svc.specs.map(function(s){return'<div class="service-spec"><span class="service-spec-label">'+s.label+'</span><span class="service-spec-value">'+s.value+'</span></div>';}).join('');
    });
  }catch(e){}}

  /* GALLERY */
  async function loadGallery(){if(!document.querySelector('.gallery-masonry'))return;try{
    var d=await fetch('/content/gallery.json'+bust).then(r=>r.json());
    set('.gallery-page-hero h1',d.page_title);
    set('.gallery-page-hero p',d.page_description);
    var g=document.querySelector('.gallery-masonry');
    if(g&&d.items)g.innerHTML=d.items.map(function(i){return'<div class="gallery-item"><img src="/'+i.image+'" alt="'+i.label+'" loading="lazy"/><div class="gallery-item-overlay"><span class="gallery-item-label">'+i.label+'</span></div></div>';}).join('');
  }catch(e){}}

  /* CONTACT */
  async function loadContact(){if(!document.querySelector('.contact-page,.contact-page-hero'))return;try{
    var d=await fetch('/content/contact.json'+bust).then(r=>r.json());
    set('.contact-page-hero h1',d.page_title);
    set('.contact-page-hero p',d.page_description);
    set('.contact-info-title',d.section_title);
    set('.contact-info-text',d.section_text);
    updateLinks(d.phone,d.email);
    if(d.response_time){var rt=document.querySelector('.contact-details .contact-detail:last-child div span:last-child');if(rt)rt.textContent=d.response_time;}
    var il=document.querySelector('.contact-industry-list');
    if(il&&d.industries)il.innerHTML=d.industries.map(function(i){return'<li>'+i+'</li>';}).join('');
  }catch(e){}}

  document.addEventListener('DOMContentLoaded',function(){
    loadDesign();loadSite();loadHome();loadServices();loadGallery();loadContact();
  });
})();
