/* shared interactions: lang toggle, burger, reveal, filters, contact form */
(function(){
  document.documentElement.classList.add("js");
  applyLang(currentLang());
  document.querySelectorAll("[data-lang-toggle]").forEach(b=>{
    b.addEventListener("click",()=>applyLang(document.documentElement.lang==="en"?"zh":"en"));
  });

  // mobile menu
  document.querySelectorAll("[data-burger]").forEach(btn=>{
    btn.addEventListener("click",()=>{
      const nav=btn.closest(".nav");
      if(nav)nav.classList.toggle("open");
    });
  });

  // reveal on scroll
  const io=new IntersectionObserver(es=>{
    es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}});
  },{threshold:.12});
  document.querySelectorAll(".rv").forEach(el=>io.observe(el));

  // category filters (projects + blog pages)
  document.querySelectorAll("[data-filter-group]").forEach(group=>{
    const pills=group.querySelectorAll("[data-filter]");
    pills.forEach(p=>p.addEventListener("click",()=>{
      pills.forEach(x=>x.classList.remove("active"));
      p.classList.add("active");
      const f=p.getAttribute("data-filter");
      document.querySelectorAll("[data-cat]").forEach(card=>{
        const cats=(card.getAttribute("data-cat")||"").split(/\s+/);
        card.style.display=(f==="all"||cats.includes(f))?"":"none";
      });
    }));
  });

  // contact form
  const form=document.getElementById("contactForm");
  if(form){
    const show=(name,msg)=>{
      const e=form.querySelector('[data-err="'+name+'"]');
      if(e){e.textContent=msg||"";e.style.display=msg?"block":"none";}
    };
    form.addEventListener("submit",ev=>{
      ev.preventDefault();
      const name=form.name.value.trim(),email=form.email.value.trim(),msg=form.message.value.trim();
      let ok=true;
      show("name",name?"":__t("form.errName"));if(!name)ok=false;
      const bad=!email?__t("form.errEmail"):(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)?"":__t("form.errEmailBad"));
      show("email",bad);if(bad)ok=false;
      show("message",msg?"":__t("form.errMsg"));if(!msg)ok=false;
      if(!ok)return;
      const subject=encodeURIComponent("Website inquiry from "+name);
      const body=encodeURIComponent("Name: "+name+"\nEmail: "+email+"\n\n"+msg);
      window.location.href="mailto:hello@jevik.dev?subject="+subject+"&body="+body;
    });
    ["name","email","message"].forEach(n=>{
      const f=form[n];if(f)f.addEventListener("input",()=>show(n,""));
    });
  }

  // ripple on primary buttons: white wave on gradient/chrome fills,
  // translucent blue on outline buttons (white would be invisible there)
  document.addEventListener("pointerdown",e=>{
    const t=e.target.closest(".btn");
    if(!t)return;
    const r=t.getBoundingClientRect(),d=Math.max(r.width,r.height)*2.1;
    const s=document.createElement("span");
    const rgb=t.classList.contains("btn-outline")?"63,140,255":"255,255,255";
    s.className="ripple";
    s.style.cssText="width:"+d+"px;height:"+d+"px;left:"+(e.clientX-r.left-d/2)+"px;"+
      "top:"+(e.clientY-r.top-d/2)+"px;background:rgba("+rgb+",.45)";
    t.appendChild(s);
    s.offsetWidth; // force reflow so the scale transition runs
    s.style.transform="scale(1)";s.style.opacity="0";
    s.addEventListener("transitionend",()=>s.remove(),{once:true});
  });
})();
