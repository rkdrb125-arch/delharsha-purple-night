// v75: independent parallax-like particle planes, diagonal 34-degree motion.
(()=>{
 'use strict';
 const home=document.getElementById('home');if(!home)return;
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 const layers=[
  {selector:'.v74-sparkles-back',desktop:75,mobile:48,min:1,max:2,duration:11,range:7,opacity:.40,distance:0.30},
  {selector:'.v74-sparkles-front',desktop:12,mobile:8,min:3,max:4,duration:8,range:5,opacity:.61,distance:0.52}
 ];
 let seed=750034;
 const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
 const palette=[['#fcebc7','rgba(255,224,164,.5)'],['#e9d5ff','rgba(207,161,255,.48)']];
 const particles=[];
 for(const layer of layers){
  const host=home.querySelector(layer.selector);if(!host)continue;
  const fragment=document.createDocumentFragment();
  for(let i=0;i<layer.desktop;i++){
   const el=document.createElement('i');el.className='v74-sparkle';
   const size=layer.min+Math.floor(random()*(layer.max-layer.min+1));
   const [color,glow]=palette[random()<.7?0:1];
   const particle={el,layer,i,phase:random(),distance:layer.distance*(.7+random()*.6)};
   el.style.cssText=[
    `--x:${(random()*124-17).toFixed(2)}%`,`--y:${(random()*140-20).toFixed(2)}%`,
    `--size:${size}px`,`--duration:${(layer.duration+random()*layer.range).toFixed(2)}s`,
    `--delay:${(-random()*24).toFixed(2)}s`,`--opacity:${(layer.opacity*(.55+random()*.45)).toFixed(2)}`,
    `--glow:${glow}`,`background:${color}`
   ].join(';');
   fragment.appendChild(el);particles.push(particle);
  }
  host.appendChild(fragment);
 }
 function layout(){
  const mobile=window.innerWidth<=800;
  // 34 degrees above the horizon: tan(34°)=vertical/horizontal displacement.
  const span=Math.max(300,Math.hypot(home.clientWidth,home.clientHeight));
  for(const p of particles){
   p.el.hidden=mobile&&p.i>=p.layer.mobile;
   const distance=span*p.distance;
   p.el.style.setProperty('--dx',`${(Math.cos(34*Math.PI/180)*distance).toFixed(1)}px`);
   p.el.style.setProperty('--dy',`${(-Math.sin(34*Math.PI/180)*distance).toFixed(1)}px`);
  }
 }
 let scheduled=false;
 window.addEventListener('resize',()=>{if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;layout();});},{passive:true});
 layout();
 // Hidden screens and reduced-motion users do not spend GPU cycles on drifting particles.
 const observer=new MutationObserver(()=>{
  const inactive=!home.classList.contains('active');
  home.classList.toggle('v75-particles-paused',inactive||reduced.matches);
 });
 observer.observe(home,{attributes:true,attributeFilter:['class']});
 home.classList.toggle('v75-particles-paused',reduced.matches||!home.classList.contains('active'));
 reduced.addEventListener?.('change',()=>home.classList.toggle('v75-particles-paused',reduced.matches||!home.classList.contains('active')));
})();
