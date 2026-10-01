/* shared interactions: lang toggle, burger, reveal, filters, contact form */
(function(){
  document.documentElement.classList.add("js");
  applyLang(currentLang());
  document.querySelectorAll("[data-lang-toggle]").forEach(sw=>{
    sw.querySelectorAll("[data-lang]").forEach(button=>{
      button.addEventListener("click",()=>applyLang(button.getAttribute("data-lang")));
    });
  });

  // One navigation contract for every page, independent of the original template variant.
  const NAV_ITEMS=[
    ["index.html","nav.home"],["home-alt.html","nav.work"],["projects.html","nav.projects"],
    ["blog.html","nav.blog"],["about.html","nav.about"],["contact.html","nav.contact"]
  ];
  // 2026-09-30 朵教主决策:去掉当前页高亮定位功能,导航词条一律中性
  const makeLink=([href,key])=>{
    const link=document.createElement("a");
    link.href=href;link.dataset.i18n=key;link.textContent=__t(key);
    return link;
  };
  document.querySelectorAll(".nav-links").forEach(menu=>{
    menu.replaceChildren(...NAV_ITEMS.map(makeLink));
  });
  document.querySelectorAll(".mobile-menu").forEach(menu=>{
    const language=menu.querySelector(".lang-switch");
    menu.replaceChildren(...(language?[language]:[]),...NAV_ITEMS.map(makeLink));
  });

  // mobile menu
  document.querySelectorAll("[data-burger]").forEach(btn=>{
    btn.setAttribute("aria-expanded","false");
    btn.addEventListener("click",()=>{
      const nav=btn.closest(".nav");
      if(nav){const open=nav.classList.toggle("open");btn.setAttribute("aria-expanded",String(open));}
    });
  });
  document.querySelectorAll(".mobile-menu a").forEach(link=>link.addEventListener("click",()=>{
    const nav=link.closest(".nav"),btn=nav?.querySelector("[data-burger]");
    nav?.classList.remove("open");btn?.setAttribute("aria-expanded","false");
  }));

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
      const scope=group.closest("main,section,body");
      scope.querySelectorAll("[data-cat]").forEach(card=>{
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
      window.location.href="mailto:duojianwen@gmail.com?subject="+subject+"&body="+body;
    });
    ["name","email","message"].forEach(n=>{
      const f=form[n];if(f)f.addEventListener("input",()=>show(n,""));
    });
  }
})();
