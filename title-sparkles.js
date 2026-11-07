// v78: two independent title-only sparkle layers, responsive CSS controls visibility.
(()=>{
 'use strict';
 const home=document.getElementById('home');
 if(!home)return;
 const layers=[
  {el:home.querySelector('.v75-sparkles-back'),count:75,min:1,max:2,duration:10,range:7,opacity:.43},
  {el:home.querySelector('.v75-sparkles-front'),count:12,min:3,max:4,duration:9,range:5,opacity:.62}
 ];
 // Seeded PRNG keeps the same natural layout across reloads without changing game randomness.
 let seed=740034;
 const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
 const palette=[['#fcebc7','rgba(255,224,164,.55)'],['#e9d5ff','rgba(207,161,255,.5)']];
 for(const layer of layers){
  if(!layer.el)continue;
  const fragment=document.createDocumentFragment();
  for(let i=0;i<layer.count;i++){
   const p=document.createElement('i');p.className='v75-sparkle';
   const size=layer.min+Math.floor(random()*(layer.max-layer.min+1));
   const [color,glow]=palette[random()<.7?0:1];
   const angle=34*Math.PI/180;
   const distance=210+random()*115;
   p.style.cssText=[
    `--x:${(random()*120-15).toFixed(2)}%`,`--y:${(random()*130-5).toFixed(2)}%`,
    `--size:${size}px`,`--duration:${(layer.duration+random()*layer.range).toFixed(2)}s`,
    `--delay:${(-random()*22).toFixed(2)}s`,`--opacity:${(layer.opacity*(.6+random()*.4)).toFixed(2)}`,
    `--dx:${(Math.cos(angle)*distance).toFixed(1)}px`,`--dy:${(-Math.sin(angle)*distance).toFixed(1)}px`,
    `--glow:${glow}`,`background:${color}`
   ].join(';');
   fragment.appendChild(p);
  }
  layer.el.appendChild(fragment);
 }
})();
