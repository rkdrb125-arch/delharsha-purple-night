// v62: two bundled opening recordings, selected by the player. No save-game schema changes.
(()=>{
 'use strict';
 const ko=document.getElementById('openingKo'),ja=document.getElementById('openingJa');
 const play=document.getElementById('openingPlay'),stop=document.getElementById('openingStop');
 const status=document.getElementById('openingStatus');
 const panel=document.getElementById('openingPanel');
 const audio=new Audio();audio.preload='none';audio.loop=false;
 const tracks={ko:'assets/audio/opening_ko.mp3',ja:'assets/audio/opening_ja.mp3'};
 const labels={ko:'한국어',ja:'日本語'};
 const key='delharsha_opening_language_v1';
 let selected='ko';
 try{const saved=localStorage.getItem(key);if(saved==='ja'||saved==='ko')selected=saved;}catch(_){/* private browsing */}
 function update(){ko.setAttribute('aria-pressed',String(selected==='ko'));ja.setAttribute('aria-pressed',String(selected==='ja'));status.textContent=labels[selected]+' 오프닝 선택됨';}
 // v71: fade volume without cutting the selected recording abruptly.
 const FADE_IN=1100, FADE_OUT=850;
 let fadeToken=0,fadeFrame=0,playToken=0;
 const clamp=x=>Math.max(0,Math.min(1,x));
 function cancelFade(){fadeToken++;if(fadeFrame)cancelAnimationFrame(fadeFrame);fadeFrame=0;}
 function fadeTo(target,duration,after){
  cancelFade();const token=fadeToken,from=audio.volume,begin=performance.now();
  function frame(now){if(token!==fadeToken)return;const t=clamp((now-begin)/duration);const smooth=t*t*(3-2*t);audio.volume=clamp(from+(target-from)*smooth);if(t<1){fadeFrame=requestAnimationFrame(frame);}else{fadeFrame=0;if(after)after();}}
  fadeFrame=requestAnimationFrame(frame);
 }
 function pause(immediate=false){
  playToken++;
  if(immediate||audio.paused){cancelFade();audio.pause();audio.currentTime=0;audio.volume=0;return;}
  fadeTo(0,FADE_OUT,()=>{audio.pause();audio.currentTime=0;});
 }
 function choose(lang){if(selected!==lang)pause();selected=lang;try{localStorage.setItem(key,lang);}catch(_){}update();}
 async function start(){
  // Avoid a stale play() promise restarting audio after leaving the title.
  pause(true);const token=++playToken;
  if(!document.getElementById('home')?.classList.contains('active'))return;
  audio.src=tracks[selected];audio.volume=0;
  status.textContent=labels[selected]+' 오프닝 재생 중…';
  try{await audio.play();if(token!==playToken||!document.getElementById('home')?.classList.contains('active')){pause(true);return;}fadeTo(1,FADE_IN);}
  catch(_){if(token===playToken)status.textContent='브라우저가 재생을 차단했습니다. 재생 버튼을 다시 눌러 주세요.';}
 }
 ko.addEventListener('click',()=>choose('ko'));ja.addEventListener('click',()=>choose('ja'));
 play.addEventListener('click',start);stop.addEventListener('click',()=>{panel.open=false;pause();update();});
 audio.addEventListener('ended',update);
 audio.addEventListener('error',()=>{status.textContent='오프닝 파일을 불러오지 못했습니다.';});
 // Close the player after selection or when leaving the title; retain language.
 document.addEventListener('pointerdown',(event)=>{if(panel.open&&!panel.contains(event.target))panel.open=false;});
 document.addEventListener('keydown',(event)=>{if(event.key==='Escape'&&panel.open)panel.open=false;});
 // Opening audio belongs to the title only. Every navigation into the game stops it.
 function syncScreen(){
  const home=document.getElementById('home');
  if(home && !home.classList.contains('active')){panel.open=false;pause();update();}
 }
 const observer=new MutationObserver(syncScreen);
 observer.observe(document.getElementById('home'),{attributes:true,attributeFilter:['class']});
 // v75: the scene transition signals the audio fade at its start, not at its end.
 document.addEventListener('delharsha:title-leaving',()=>{panel.open=false;pause();update();});
 // Loading only fades music after a successful transition; failed loads keep playback.
 document.getElementById('titleBtn')?.addEventListener('click',()=>{panel.open=false;pause();update();});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)pause(true);});
 update();
})();
