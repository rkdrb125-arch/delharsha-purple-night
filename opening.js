// v62: two bundled opening recordings, selected by the player. No save-game schema changes.
(()=>{
 'use strict';
 const ko=document.getElementById('openingKo'),ja=document.getElementById('openingJa');
 const play=document.getElementById('openingPlay'),stop=document.getElementById('openingStop');
 const status=document.getElementById('openingStatus');
 const audio=new Audio();audio.preload='none';audio.loop=false;
 const tracks={ko:'assets/audio/opening_ko.mp3',ja:'assets/audio/opening_ja.mp3'};
 const labels={ko:'한국어',ja:'日本語'};
 const key='delharsha_opening_language_v1';
 let selected='ko';
 try{const saved=localStorage.getItem(key);if(saved==='ja'||saved==='ko')selected=saved;}catch(_){/* private browsing */}
 function update(){ko.setAttribute('aria-pressed',String(selected==='ko'));ja.setAttribute('aria-pressed',String(selected==='ja'));status.textContent=labels[selected]+' 오프닝 선택됨';}
 function pause(){audio.pause();audio.currentTime=0;}
 function choose(lang){if(selected!==lang)pause();selected=lang;try{localStorage.setItem(key,lang);}catch(_){}update();}
 async function start(){pause();audio.src=tracks[selected];status.textContent=labels[selected]+' 오프닝 재생 중…';try{await audio.play();}catch(_){status.textContent='브라우저가 재생을 차단했습니다. 재생 버튼을 다시 눌러 주세요.';}}
 ko.addEventListener('click',()=>choose('ko'));ja.addEventListener('click',()=>choose('ja'));
 play.addEventListener('click',start);stop.addEventListener('click',()=>{pause();update();});
 audio.addEventListener('ended',update);
 audio.addEventListener('error',()=>{status.textContent='오프닝 파일을 불러오지 못했습니다.';});
 // New game starts the chosen opening on the user's click, never via forced autoplay.
 document.getElementById('newBtn').addEventListener('click',()=>{void start();});
 // Keep soundtrack out of continuing a saved scene; home/title can replay it on demand.
 document.getElementById('continueBtn').addEventListener('click',pause);
 document.getElementById('loadHomeBtn').addEventListener('click',pause);
 document.getElementById('titleBtn').addEventListener('click',()=>{pause();update();});
 update();
})();
