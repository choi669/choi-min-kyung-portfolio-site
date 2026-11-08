
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const header = document.querySelector('.site-header');
  const progress = document.createElement('div'); progress.className='scroll-progress'; progress.setAttribute('aria-hidden','true'); document.body.append(progress);
  let ticking=false;
  const updateScroll=()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${max>0?Math.min(1,scrollY/max):0})`;header?.classList.toggle('is-scrolled',scrollY>12);ticking=false;};
  addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(updateScroll)}},{passive:true});updateScroll();
  document.querySelectorAll('.nav-links a').forEach(a=>{const label=a.textContent.trim();a.setAttribute('aria-label',label);a.replaceChildren();const wrap=document.createElement('span');wrap.className='roll-word';wrap.setAttribute('aria-hidden','true');const first=document.createElement('span');first.textContent=label;const copy=first.cloneNode(true);copy.className='roll-copy';wrap.append(first,copy);a.append(wrap);});
  const heading=document.querySelector('.hero h1');if(heading){const lines=heading.innerHTML.split(/<br\s*\/?\s*>/i);const label=lines.join(' ');heading.setAttribute('aria-label',label);heading.replaceChildren();lines.forEach((line,i)=>{const row=document.createElement('span');row.className='title-line';row.setAttribute('aria-hidden','true');const inner=document.createElement('span');inner.textContent=line;inner.style.setProperty('--line-delay',`${.08+i*.12}s`);row.append(inner);heading.append(row);});}
  if(!reduced.matches&&'IntersectionObserver'in window){const observer=new IntersectionObserver(items=>{items.forEach(item=>{if(item.isIntersecting){item.target.classList.add('is-visible');observer.unobserve(item.target)}})},{threshold:.08,rootMargin:'0px 0px -24px 0px'});document.querySelectorAll('.section-heading,.section-description,.project-card,.gallery-card,.osulloc-visuals,.case-section,.site-footer h2').forEach((el,i)=>{el.classList.add('motion-reveal');if(el.matches('.project-card,.gallery-card'))el.style.setProperty('--reveal-delay',`${(i%3)*65}ms`);observer.observe(el);});
    reduced.addEventListener('change',event=>{if(event.matches){observer.disconnect();document.querySelectorAll('.motion-reveal').forEach(el=>el.classList.add('is-visible'));}});
  }
  document.body.classList.add('motion-ready');
  const dialog=document.querySelector('.preparing-dialog');
  document.querySelectorAll('[data-preparing]').forEach(button=>button.addEventListener('click',()=>{if(dialog?.showModal){dialog.showModal()}else{alert('아직 준비 중입니다.')}}));
  dialog?.querySelector('[data-close-dialog]')?.addEventListener('click',()=>dialog.close());
  dialog?.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
})();
