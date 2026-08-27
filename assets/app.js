(() => {
  const S = window.SITE;
  const $ = (q, r=document) => r.querySelector(q), $$=(q,r=document)=>[...r.querySelectorAll(q)];
  document.documentElement.style.setProperty('--primary',S.colors.primary);document.documentElement.style.setProperty('--secondary',S.colors.secondary);document.documentElement.style.setProperty('--accent',S.colors.accent);document.documentElement.style.setProperty('--dark',S.colors.dark);
  const wa = m => `https://wa.me/${S.whatsapp}?text=${encodeURIComponent(m)}`;
  const page = document.body.dataset.page || 'home';
  const nav = S.nav.map(([l,h])=>`<a class="${page===l.toLowerCase()?'active':''}" href="${h}">${l}</a>`).join('');
  $('#siteHeader').innerHTML=`<header class="header"><a class="brand" href="/"><img src="${S.logo}" alt="${S.name} logo"><span><strong>${S.shortName}</strong><small>${S.slogan}</small></span></a><nav class="desktopNav">${nav}</nav><button id="menuBtn" class="menuBtn" aria-label="Menu">☰</button></header><div id="mobileMenu" class="mobileMenu">${nav}</div>`;
  $('#menuBtn').onclick=()=>$('#mobileMenu').classList.toggle('open');
  $('#siteFooter').innerHTML=`<footer><div class="footerGrid"><div><h3>${S.name}</h3><p>${S.description}</p></div><div><h4>Contact</h4><p>${S.phoneDisplay}<br>${S.email}<br>${S.website}<br>${S.address}</p></div><div><h4>Quick Links</h4>${S.nav.map(([l,h])=>`<a href="${h}">${l}</a>`).join('')}</div></div><div class="footerBottom">© ${new Date().getFullYear()} ${S.name}. Website designed by <a target="_blank" href="${S.footer.designerUrl}">${S.footer.designerName}</a> | ${S.footer.designerPhoneDisplay}</div></footer>`;
  // Populate client content from the single master config file.
  $$('.js-name').forEach(el=>el.textContent=S.name);$$('.js-slogan').forEach(el=>el.textContent=S.slogan);$$('.js-description').forEach(el=>el.textContent=S.description);$$('.js-about-heading').forEach(el=>el.textContent=S.about.heading);$$('.js-about-intro').forEach(el=>el.textContent=S.about.intro);
  if($('#aboutParagraphs')) $('#aboutParagraphs').innerHTML=S.about.paragraphs.map(p=>`<p class="leadSmall">${p}</p>`).join('');
  if($('#valuesGrid')) $('#valuesGrid').innerHTML=S.about.values.map((v,i)=>`<article class="card lift"><div class="cardIcon">0${i+1}</div><h3>${v}</h3><p>Professional standards, reliable communication and a customer-first approach are built into every project.</p></article>`).join('');
  if($('#servicesGrid')) $('#servicesGrid').innerHTML=S.services.map((x,i)=>`<article class="card serviceCard lift">${x.image?`<img class="serviceImage" src="${x.image}" alt="${x.title}" loading="lazy">`:''}<div class="cardIcon">${String(i+1).padStart(2,'0')}</div><h3>${x.title}</h3><p>${x.text}</p><a target="_blank" href="${wa('Hello '+S.name+', I am interested in '+x.title+'.')}">Enquire on WhatsApp →</a></article>`).join('');
  if($('#servicesPreview')) $('#servicesPreview').innerHTML=S.services.slice(0,4).map((x,i)=>`<article class="card lift">${x.image?`<img class="serviceImage" src="${x.image}" alt="${x.title}" loading="lazy">`:''}<div class="cardIcon">0${i+1}</div><h3>${x.title}</h3><p>${x.text}</p></article>`).join('');
  $$('.stats').forEach(el=>el.innerHTML=S.stats.map(x=>`<div class="stat"><div class="counterNum" data-value="${x.value}" data-suffix="${x.suffix}">0${x.suffix}</div><span>${x.label}</span></div>`).join(''));
  if($('#galleryGrid')) $('#galleryGrid').innerHTML=S.gallery.map(x=>`<figure class="galleryItem"><img src="${x.url}" alt="${x.alt}" loading="lazy"><figcaption>${x.alt}</figcaption></figure>`).join('');
  if($('#galleryPreview')) $('#galleryPreview').innerHTML=S.gallery.slice(0,6).map(x=>`<figure class="galleryItem"><img src="${x.url}" alt="${x.alt}" loading="lazy"><figcaption>${x.alt}</figcaption></figure>`).join('');
  if($('#faqList')) $('#faqList').innerHTML=S.faqs.map(f=>`<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('');
  $$('.waQuote').forEach(a=>a.href=wa('Hello '+S.name+', I would like a quote.'));$$('.telLink').forEach(a=>a.href='tel:'+S.phoneTel);
  if($('#contactDetails')) $('#contactDetails').innerHTML=`<p><b>Phone:</b> ${S.phoneDisplay}</p><p><b>Email:</b> ${S.email}</p><p><b>Website:</b> ${S.website}</p><p><b>Address:</b> ${S.address}</p>`;
  const form=$('#contactForm'); if(form) form.onsubmit=e=>{e.preventDefault();const fd=new FormData(form);open(wa(`Website enquiry\nName: ${fd.get('name')}\nPhone: ${fd.get('phone')}\nService: ${fd.get('service')}\nMessage: ${fd.get('message')}`),'_blank')};
  if($('#serviceSelect')) $('#serviceSelect').innerHTML='<option value="" disabled selected>Select a service</option>'+S.services.map(x=>`<option>${x.title}</option>`).join('');
  // Service worker
  if('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(()=>{});
  let deferredPrompt=null; window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;});
  const isStandalone=()=>matchMedia('(display-mode: standalone)').matches||window.navigator.standalone;
  const install=async()=>{if(isStandalone())return alert('This website is already installed.');if(deferredPrompt){deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;return;}if(/iphone|ipad|ipod/i.test(navigator.userAgent)){showInstallHelp();return;}alert("Use your browser menu and choose 'Install app' or 'Add to Home screen'. On Safari use Share → Add to Home Screen.");};
  window.ultraInstall=install;
  const showInstallHelp=()=>{const m=document.createElement('div');m.className='modalShade';m.innerHTML=`<div class="installHelp"><div class="installIcon">⇩</div><h3>Install this website</h3><p><b>iPhone/iPad:</b> open in Safari, tap Share, then <b>Add to Home Screen</b>.<br><br><b>Android/Windows:</b> choose <b>Install app</b> or <b>Add to Home screen</b> from the browser menu.</p><button class="btn primary">Got it</button></div>`;document.body.appendChild(m);m.onclick=e=>{if(e.target===m||e.target.closest('button'))m.remove()};};
  setTimeout(()=>{if(isStandalone())return;const n=document.createElement('div');n.className='installNudge';n.innerHTML=`<span class="installSymbol">⇩</span><div><b>Install this website</b><small>Keep it on your device like an app.</small></div><button class="nudgeInstall">Install</button><button class="nudgeClose">×</button>`;document.body.appendChild(n);$('.nudgeInstall',n).onclick=install;$('.nudgeClose',n).onclick=()=>n.remove();},25000);
  // Ultra Max 2 premium mobile controls + interactive compact chat
  // Ultra Max 4 — polished icon system. All icons are inline SVG so the
  // template stays self-contained and deploys cleanly on Vercel/GitHub.
  const uiIcons={
    home:`<svg class="uiLineIcon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3.2 11.2 12 3.8l8.8 7.4"/><path d="M5.5 10.3v9.2h5v-5.6h3v5.6h5v-9.2"/><path d="M9 7.2h6"/></svg>`,
    services:`<svg class="uiLineIcon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8 14 7l4.6.7-3.3 3.2.8 4.5-4.1-2.2-4.1 2.2.8-4.5-3.3-3.2L10 7Z"/><path d="M5 18.2h14"/><path d="M7.5 21h9"/></svg>`,
    gallery:`<svg class="uiLineIcon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="8.2" cy="9" r="1.6"/><path d="m5.3 17 4.3-4.5 3 3 2.5-2.6 3.6 4.1"/></svg>`,
    whatsapp:`<svg class="uiWhatsAppIcon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.75a9.1 9.1 0 0 0-7.84 13.72L3 21l4.68-1.13A9.1 9.1 0 1 0 12 2.75Z"/><path d="M8.2 7.65c.22-.48.45-.5.78-.5h.42c.22 0 .42.08.53.4l.77 1.86c.09.27.06.48-.11.69l-.62.76c-.18.2-.15.38-.02.61.73 1.32 1.75 2.35 3.13 3.08.25.14.45.12.64-.1l.83-.99c.2-.24.42-.3.7-.19l1.9.9c.28.13.4.34.37.62-.05.57-.31 1.46-.95 2.04-.58.52-1.35.78-2.22.78-1.08 0-2.55-.37-4.23-1.48-2.38-1.56-3.86-3.86-4.03-4.12-.15-.24-.94-1.43-.94-2.73 0-1.28.65-1.94 1.02-2.3.31-.3.61-.33.83-.33Z"/></svg>`,
    install:`<svg class="uiLineIcon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.2v10.4"/><path d="m8.2 10.2 3.8 3.9 3.8-3.9"/><path d="M5 17.3v2.1A1.6 1.6 0 0 0 6.6 21h10.8a1.6 1.6 0 0 0 1.6-1.6v-2.1"/></svg>`,
    close:`<svg class="uiLineIcon" viewBox="0 0 24 24" aria-hidden="true"><path d="m7 7 10 10M17 7 7 17"/></svg>`,
    send:`<svg class="uiLineIcon" viewBox="0 0 24 24" aria-hidden="true"><path d="m4 4 16 8-16 8 3-8Z"/><path d="M7 12h13"/></svg>`
  };
  const mobilePage=page==='home'?'home':page;
  document.body.insertAdjacentHTML('beforeend',`
    <button id="chatOpen" class="chatButton pulse" aria-label="Open WhatsApp assistant">
      ${uiIcons.whatsapp}<span class="chatBadge">1</span>
    </button>
    <a class="backTop" href="#top" aria-label="Back to top">↑</a>
    <nav class="mobileFooter" aria-label="Mobile navigation">
      <a href="/" data-tone="home" class="${mobilePage==='home'?'active':''}"><span class="footerIcon">${uiIcons.home}</span><span class="footerLabel">Home</span></a>
      <a href="/services.html" data-tone="services" class="${mobilePage==='services'?'active':''}"><span class="footerIcon">${uiIcons.services}</span><span class="footerLabel">Services</span></a>
      <a href="/gallery.html" data-tone="gallery" class="${mobilePage==='gallery'?'active':''}"><span class="footerIcon">${uiIcons.gallery}</span><span class="footerLabel">Gallery</span></a>
      <a target="_blank" data-tone="whatsapp" href="${wa('Hello '+S.name)}"><span class="footerIcon waIcon">${uiIcons.whatsapp}</span><span class="footerLabel">WhatsApp</span></a>
      <button id="installMobile" data-tone="install"><span class="footerIcon">${uiIcons.install}</span><span class="footerLabel">Install</span></button>
    </nav>`);
  $('#installMobile').onclick=install;

  const toggleChat=()=>{
    let box=$('#chatBox');
    if(box){box.remove();return;}
    $('.chatBadge')?.remove();
    box=document.createElement('div');
    box.id='chatBox';
    box.className='chatBox compact';
    box.innerHTML=`
      <div class="chatHead">
        <div class="chatIdentity">
          <span class="chatAvatar">${uiIcons.whatsapp}</span>
          <div><b>${S.shortName} Assistant</b><small><span class="onlineDot"></span> Online enquiry assistant</small></div>
        </div>
        <button id="chatClose" class="chatClose" aria-label="Close">${uiIcons.close}</button>
      </div>
      <div class="chatMessages">
        <div class="bubble bot">${S.chat.welcome}</div>
        <div class="bubble bot subtle">Choose an option below to get started.</div>
      </div>
      <div class="quickReplies">${S.chat.options.map(o=>`<button>${o}</button>`).join('')}</div>`;
    document.body.appendChild(box);
    $('#chatClose',box).onclick=()=>box.remove();

    let service='',name='',details='';
    const messages=$('.chatMessages',box);
    function add(from,text){
      messages.insertAdjacentHTML('beforeend',`<div class="bubble ${from}">${text}</div>`);
      messages.scrollTop=messages.scrollHeight;
    }
    function ask(ph,cb){
      const old=$('.chatInput',box);if(old)old.remove();
      const w=document.createElement('div');
      w.className='chatInput';
      w.innerHTML=`<input autocomplete="off" placeholder="${ph}"><button aria-label="Send">${uiIcons.send}</button>`;
      box.appendChild(w);
      const inp=$('input',w);
      const send=()=>{const v=inp.value.trim();if(!v)return;add('user',v);w.remove();cb(v)};
      $('button',w).onclick=send;
      inp.onkeydown=e=>e.key==='Enter'&&send();
      inp.focus();
    }
    $$('.quickReplies button',box).forEach(b=>b.onclick=()=>{
      service=b.textContent;
      add('user',service);
      add('bot','Great. What is your name?');
      $('.quickReplies',box).remove();
      ask('Your name...',v=>{
        name=v;
        add('bot',`Thanks ${name}. Please describe what you need, your location, and preferred timing.`);
        ask('Project details...',v2=>{
          details=v2;
          add('bot',S.chat.closing);
          const a=document.createElement('a');
          a.className='chatContinue';
          a.target='_blank';
          a.href=wa(`Hello ${S.name}.\nName: ${name}\nEnquiry: ${service}\nDetails: ${details}`);
          a.innerHTML=`${uiIcons.whatsapp}<span>Continue on WhatsApp</span>`;
          box.appendChild(a);
        });
      });
    });
  };
  $('#chatOpen').onclick=toggleChat;

  // Ultra Max 4: the assistant waits 20 seconds before opening automatically.
  // It auto-opens only once per browsing session so navigation never feels intrusive.
  setTimeout(()=>{
    try{
      if(!sessionStorage.getItem('ultra4ChatSeen') && !$('#chatBox')){
        sessionStorage.setItem('ultra4ChatSeen','1');
        toggleChat();
      }
    }catch(_){ if(!$('#chatBox')) toggleChat(); }
  },20000);


  // Reveal animations
  const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});$$('.reveal').forEach(el=>obs.observe(el));
  // Counters
  $$('.counterNum').forEach(el=>{const val=+el.dataset.value,suffix=el.dataset.suffix||'';let ran=false;const o=new IntersectionObserver(([e])=>{if(!e.isIntersecting||ran)return;ran=true;const st=performance.now(),dur=1400;function tick(now){const t=Math.min(1,(now-st)/dur),n=Math.round(val*(1-Math.pow(1-t,3)));el.textContent=n+suffix;if(t<1)requestAnimationFrame(tick)}requestAnimationFrame(tick)},{threshold:.5});o.observe(el)});
  // Ultra Max 3 stable typewriter controller.
  // Each element owns exactly one timer, so changing hero slides can never leave old
  // typewriter loops running in the background. This removes the flicker/glitch bug.
  const typewriterJobs=new WeakMap();
  window.stopTypewriter=(el)=>{
    const job=typewriterJobs.get(el);
    if(job){job.cancelled=true;if(job.timer)clearTimeout(job.timer);typewriterJobs.delete(el);}
  };
  window.typewriter=(el,items,speed=78,pause=1700,eraseSpeed=42)=>{
    if(!el||!items||!items.length)return()=>{};
    window.stopTypewriter(el);
    const job={cancelled:false,timer:null};
    typewriterJobs.set(el,job);
    let i=0,pos=0,erasing=false;
    const schedule=(fn,delay)=>{job.timer=setTimeout(()=>{if(!job.cancelled)fn();},delay)};
    const render=()=>{
      if(job.cancelled)return;
      const full=String(items[i%items.length]);
      el.textContent=full.slice(0,pos);
      const cursor=document.createElement('span');cursor.className='cursor';cursor.textContent='|';el.appendChild(cursor);
      if(!erasing){
        if(pos<full.length){pos++;schedule(render,speed);return;}
        erasing=true;schedule(render,pause);return;
      }
      if(pos>0){pos--;schedule(render,eraseSpeed);return;}
      erasing=false;i=(i+1)%items.length;schedule(render,320);
    };
    render();
    return()=>window.stopTypewriter(el);
  };

  // Hero slider: preloaded images, one controlled slide timer, one controlled typewriter.
  const hero=$('.hero');
  if(hero&&S.hero?.length){
    let s=0,slideTimer=null,stopHeroTyping=null;
    const title=$('#heroTitle'),type=$('#heroType'),dots=$('.dots');
    S.hero.forEach(h=>{const img=new Image();img.src=h.image;});
    dots.innerHTML='';
    S.hero.forEach((_,i)=>dots.insertAdjacentHTML('beforeend',`<button type="button" aria-label="Go to slide ${i+1}" data-i="${i}"></button>`));
    const scheduleSlide=()=>{
      if(slideTimer)clearTimeout(slideTimer);
      slideTimer=setTimeout(()=>{s=(s+1)%S.hero.length;paint();},7600);
    };
    function paint(){
      const h=S.hero[s];
      if(stopHeroTyping)stopHeroTyping();
      hero.style.backgroundImage=`linear-gradient(90deg,rgba(2,6,23,.82),rgba(2,6,23,.28)),url('${h.image}')`;
      title.textContent=h.heading;
      title.classList.remove('heroEnter');void title.offsetWidth;title.classList.add('heroEnter');
      type.textContent='';
      stopHeroTyping=window.typewriter(type,h.phrases,82,1850,46);
      $$('.dots button').forEach((b,i)=>b.classList.toggle('active',i===s));
      scheduleSlide();
    }
    $$('.dots button').forEach(b=>b.onclick=()=>{s=+b.dataset.i;paint();});
    paint();
    document.addEventListener('visibilitychange',()=>{
      if(document.hidden){if(slideTimer)clearTimeout(slideTimer);if(stopHeroTyping)stopHeroTyping();}
      else paint();
    });
  }
  $$('.pageType').forEach(el=>window.typewriter(el,[el.dataset.text,'Professional • Reliable • Responsive'],86,1900,48));
})();
