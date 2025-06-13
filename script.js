// script.js
(function(){
  document.addEventListener('DOMContentLoaded',()=>{
    const overlay=document.getElementById('splash');
    // animate shrink and fade
    setTimeout(()=>overlay.classList.add('shrinkOverlay'),2500);
    // move content into hero
    setTimeout(()=>{
      const splash=document.querySelector('.splash-content');
      const heroCont=document.querySelector('.hero .container');
      heroCont.appendChild(splash);
      overlay.remove();
    },3100);
    initApp();
  });
  function initApp(){
    const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav-links');toggle&&toggle.addEventListener('click',()=>nav.classList.toggle('open'));
    document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();document.querySelector(a.getAttribute('href')).scrollIntoView({behavior:'smooth'});}));
    document.getElementById('scrollToAbout').addEventListener('click',()=>document.querySelector('#about').scrollIntoView({behavior:'smooth'}));
    const obs=new IntersectionObserver((es,o)=>{es.forEach(ent=>{if(ent.isIntersecting){ent.target.classList.add('visible');o.unobserve(ent.target);}});},{threshold:0.1});document.querySelectorAll('.section').forEach(s=>obs.observe(s));
    let z=100;document.querySelectorAll('.folder').forEach(f=>{let down=false,ox,oy;const saved=localStorage.getItem(f.id);if(saved){const p=JSON.parse(saved);f.style.left=p.left;f.style.top=p.top;}f.addEventListener('mousedown',e=>{down=true;ox=e.clientX-f.offsetLeft;oy=e.clientY-f.offsetTop;f.style.zIndex=++z;});document.addEventListener('mousemove',e=>{if(!down)return;f.style.left=`${e.clientX-ox}px`;f.style.top=`${e.clientY-oy}px`;});document.addEventListener('mouseup',()=>{if(down)localStorage.setItem(f.id,JSON.stringify({left:f.style.left,top:f.style.top}));down=false;});f.addEventListener('click',()=>openPopup(f.dataset.link,f.querySelector('.label').innerText));});
    function openPopup(link,title){const tpl=document.getElementById('popup-template').content;const win=document.importNode(tpl,true).querySelector('.popup-window');const hdr=win.querySelector('.title-bar-mac');const btn=win.querySelector('.close');const lbl=win.querySelector('.title-text');const frm=win.querySelector('iframe');lbl.textContent=title;frm.src=link;win.style.zIndex=++z;document.body.appendChild(win);requestAnimationFrame(()=>win.classList.add('active'));btn.addEventListener('click',()=>win.remove());let mv=false,mx,my;hdr.addEventListener('mousedown',e=>{mv=true;mx=e.clientX-win.offsetLeft;my=e.clientY-win.offsetTop;win.style.zIndex=++z;});document.addEventListener('mousemove',e=>{if(!mv)return;win.style.left=`${e.clientX-mx}px`;win.style.top=`${e.clientY-my}px`;});document.addEventListener('mouseup',()=>mv=false);}  }
})();
