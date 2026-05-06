(function(){
  var bust='?v='+Date.now();
  function set(s,v){var e=document.querySelector(s);if(e&&v!=null)e.textContent=v;}
  function setAll(s,v){if(!v)return;document.querySelectorAll(s).forEach(function(e){e.textContent=v;});}
  function sz(sel,px){if(!px||px==='Default'||px==='')return;document.querySelectorAll(sel).forEach(function(e){e.style.fontSize=px+'px';});}
  function imgH(sel,px){if(!px)return;document.querySelectorAll(sel).forEach(function(i){i.style.height=px+'px';});}
  function updateLinks(phone,email){
    if(phone)document.querySelectorAll('a[href^="tel:"]').forEach(function(a){var r=phone.replace(/\D/g,'');a.href='tel:+1'+r;if(a.textContent.includes('(')||a.textContent.includes('+'))a.textContent=phone;});
    if(email)document.querySelectorAll('a[href^="mailto:"]').forEach(function(a){a.href='mailto:'+email;if(a.textContent.includes('@'))a.textContent=email;});
  }
  function F(url){return fetch(url+bust).then(function(r){return r.json();});}

  document.addEventListener('DOMContentLoaded',async function(){try{
    var d=await F('/content/design.json'),s=await F('/content/site.json');
    var cap=null;try{cap=await F('/content/capabilities.json');}catch(e){}
    var root=document.documentElement;

    /* DESIGN */
    if(d.accent_color)root.style.setProperty('--red',d.accent_color);
    if(d.accent_hover)root.style.setProperty('--red-hover',d.accent_hover);
    if(d.background_color)root.style.setProperty('--black',d.background_color);
    if(d.surface_color)root.style.setProperty('--gray-1',d.surface_color);
    if(d.text_color)root.style.setProperty('--white',d.text_color);
    if(d.nav_logo)document.querySelectorAll('.logo-full').forEach(function(i){i.src='/'+d.nav_logo;});
    if(d.hero_image){var hb=document.getElementById('heroBg');if(hb)hb.style.backgroundImage="url('/"+d.hero_image+"')";}
    if(d.hero_overlay_opacity){var ov=document.querySelector('.hero-overlay');if(ov)ov.style.background='linear-gradient(to top,rgba(8,8,8,'+d.hero_overlay_opacity+') 0%,rgba(8,8,8,0.5) 40%,rgba(8,8,8,0.2) 80%,rgba(8,8,8,0.1) 100%)';}
    if(d.hero_watermark){var wm=document.querySelector('.hero-watermark span');if(wm)wm.textContent=d.hero_watermark;}

    /* SITE */
    updateLinks(s.phone,s.email);setAll('.footer-tagline',s.footer_tagline);
    if(s.tagline)setAll('.footer-bottom span:last-child',s.tagline);

    /* CAPABILITIES */
    var capGrid=document.querySelector('.capabilities-grid');
    if(capGrid&&cap){
      if(cap.eyebrow){var eb=document.querySelector('.capabilities-section .label');if(eb)eb.textContent=cap.eyebrow;}
      if(cap.section_title)set('.capabilities-title',cap.section_title);
      sz('.capabilities-title',cap.section_title_size);
      if(cap.cards&&cap.cards.length>0){
        var existing=capGrid.querySelectorAll('.capability-card');
        cap.cards.forEach(function(c,i){
          var card=existing[i];
          if(!card)return;
          var t=card.querySelector('.capability-title');
          var p=card.querySelector('.capability-text');
          if(t&&c.title)t.textContent=c.title;
          if(p&&c.text)p.textContent=c.text;
          if(t)sz('.capability-card:nth-child('+(i+1)+') .capability-title',cap.card_title_size);
          if(p)sz('.capability-card:nth-child('+(i+1)+') .capability-text',cap.card_text_size);
        });
      }
    }

    /* HOME */
    if(document.querySelector('.hero')){
      var h=await F('/content/home.json');
      set('.hero-eyebrow',h.hero_eyebrow);
      if(h.hero_title){var t=document.querySelector('.hero-title');if(t)t.innerHTML=h.hero_title.replace(/\\n|\n/g,'<br/>');}
      set('.hero-sub',h.hero_subtitle);
      var hbtns=document.querySelectorAll('.hero-actions .btn');
      if(hbtns[0]&&h.hero_cta_primary)hbtns[0].textContent=h.hero_cta_primary;
      if(hbtns[1]&&h.hero_cta_secondary)hbtns[1].textContent=h.hero_cta_secondary;
      if(h.industries){var band=document.querySelector('.industries-band-inner');if(band)band.innerHTML=h.industries.map(function(i){return'<div class="industry-item"><span class="industry-dot"></span><span>'+i+'</span></div>';}).join('');}
      var st=document.querySelectorAll('.split-title'),sx=document.querySelectorAll('.split-text'),sl=document.querySelectorAll('.split-list');
      if(st[0]&&h.what_we_do_title)st[0].textContent=h.what_we_do_title;
      if(sx[0]&&h.what_we_do_text)sx[0].textContent=h.what_we_do_text;
      if(sl[0]&&h.what_we_do_capabilities)sl[0].innerHTML=h.what_we_do_capabilities.map(function(x){return'<li>'+x+'</li>';}).join('');
      if(st[1]&&h.printing_title)st[1].textContent=h.printing_title;
      if(sx[1]&&h.printing_text)sx[1].textContent=h.printing_text;
      if(h.divider_label){var dl=document.querySelector('.full-bleed-text .label');if(dl)dl.textContent=h.divider_label;}
      set('.full-bleed-quote',h.divider_title);
      if(h.divider_image){var di=document.querySelector('.full-bleed img');if(di)di.src='/'+h.divider_image;}
      if(h.gallery_strip){var gs=document.querySelector('.gallery-strip');if(gs)gs.innerHTML=h.gallery_strip.map(function(i){return'<div class="gallery-strip-item"><img src="/'+i.image+'" alt="'+i.label+'" loading="lazy"/><div class="gallery-strip-label">'+i.label+'</div></div>';}).join('');}
      var at2=document.querySelector('.about-title'),ax=document.querySelectorAll('.about-text');
      if(at2&&h.about_title)at2.textContent=h.about_title;
      if(ax[0]&&h.about_text1)ax[0].textContent=h.about_text1;
      if(ax[1]&&h.about_text2)ax[1].textContent=h.about_text2;
      set('.cta-strip-title',h.cta_title);set('.cta-strip-sub',h.cta_subtitle);
      var cb=document.querySelectorAll('.cta-strip-actions .btn');
      if(cb[0]&&h.cta_primary)cb[0].textContent=h.cta_primary;
      if(cb[1]&&h.cta_secondary)cb[1].textContent=h.cta_secondary;
      /* SIZES */
      sz('.hero-title',h.hero_title_size);
      sz('.hero-sub',h.hero_subtitle_size);
      sz('.hero-eyebrow',h.eyebrow_size);
      sz('.split-title,.about-title,.cta-strip-title',h.section_title_size);
      sz('.split-text,.about-text,.cta-strip-sub',h.section_text_size);
      sz('.full-bleed-quote',h.divider_title_size);
      sz('.full-bleed-text .label',h.divider_label_size);
      sz('.hero-actions .btn',h.button_size);
      sz('.cta-strip-actions .btn',h.cta_button_size);
      if(h.gallery_strip_height)imgH('.gallery-strip-item img',h.gallery_strip_height);
      sz('.industry-item span',h.industry_text_size);
    }

    /* SERVICES */
    if(document.querySelector('.service-detail')){
      var sv=await F('/content/services.json');
      set('.page-hero-title',sv.page_title);
      if(sv.services)sv.services.forEach(function(svc){
        var sec=document.querySelector('[data-service="'+svc.id+'"]');if(!sec)return;
        var ti=sec.querySelector('.service-detail-title'),de=sec.querySelector('.service-detail-text'),im=sec.querySelector('img'),sp=sec.querySelector('.service-specs');
        if(ti)ti.textContent=svc.title;if(de)de.textContent=svc.description;
        if(im&&svc.image)im.src='/'+svc.image;
        if(sp&&svc.specs)sp.innerHTML=svc.specs.map(function(x){return'<div class="service-spec"><span class="service-spec-label">'+(x.spec_label||x.label)+'</span><span class="service-spec-value">'+x.value+'</span></div>';}).join('');
      });
      sz('.page-hero-title',sv.page_title_size);
      sz('.service-detail-title',sv.service_title_size);
      sz('.service-detail-text',sv.service_text_size);
      sz('.service-spec-label',sv.spec_label_size);
      sz('.service-spec-value',sv.spec_value_size);
      if(sv.service_image_height)imgH('.service-detail-image img',sv.service_image_height);
    }

    /* GALLERY */
    if(document.querySelector('.gallery-masonry')){
      var g=await F('/content/gallery.json');
      set('.gallery-page-hero h1',g.page_title);set('.gallery-page-hero p',g.page_description);
      var gg=document.querySelector('.gallery-masonry');
      if(gg&&g.items)gg.innerHTML=g.items.map(function(i){return'<div class="gallery-item"><img src="/'+i.image+'" alt="'+i.label+'" loading="lazy"/><div class="gallery-item-overlay"><span class="gallery-item-label">'+i.label+'</span></div></div>';}).join('');
      sz('.gallery-page-hero h1',g.title_size);
      sz('.gallery-page-hero p',g.description_size);
      if(g.image_height)imgH('.gallery-item img',g.image_height);
    }

    /* CONTACT */
    if(document.querySelector('.contact-page,.contact-page-hero')){
      var c=await F('/content/contact.json');
      set('.contact-page-hero h1',c.page_title);set('.contact-page-hero p',c.page_description);
      set('.contact-info-title',c.section_title);set('.contact-info-text',c.section_text);
      updateLinks(c.phone,c.email);
      if(c.response_time){var rt=document.querySelector('.contact-details .contact-detail:last-child div span:last-child');if(rt)rt.textContent=c.response_time;}
      var il=document.querySelector('.contact-industry-list');
      if(il&&c.industries)il.innerHTML=c.industries.map(function(i){return'<li>'+i+'</li>';}).join('');
      sz('.contact-page-hero h1',c.page_title_size);
      sz('.contact-page-hero p',c.page_desc_size);
      sz('.contact-info-title',c.section_title_size);
      sz('.contact-info-text',c.section_text_size);
    }

  }catch(e){console.error('CMS:',e);}});
})();
