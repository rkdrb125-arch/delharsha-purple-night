// v82: scene-aware BGM, with explicit user control and ending music priority.
(()=>{
'use strict';
const panel=document.getElementById('bgmPanel'),sel=document.getElementById('bgmTrack');
const play=document.getElementById('bgmPlay'),pause=document.getElementById('bgmPause');
const vol=document.getElementById('bgmVolume'),status=document.getElementById('bgmStatus');
const game=document.getElementById('game');
if(!panel||!sel||!game)return;
const tracks={musicbox:'assets/audio/purple_night_musicbox.mp3',piano:'assets/audio/purple_night_piano.mp3',
 prologue:'assets/audio/scene_prologue.mp3',palace:'assets/audio/scene_palace.mp3',garden:'assets/audio/scene_garden.mp3',
 ballroom:'assets/audio/scene_ballroom.mp3',library:'assets/audio/scene_library.mp3',romance:'assets/audio/scene_romance.mp3',
 miguel:'assets/audio/scene_miguel.mp3',daniel:'assets/audio/scene_daniel.mp3'};
const audio=new Audio();audio.preload='none';audio.loop=true;audio.volume=.35;
const endingAudio=new Audio('assets/audio/purple_night_alt.mp3');endingAudio.preload='none';endingAudio.loop=false;endingAudio.volume=.45;
const badEndings=new Set(['alex_fracture']);
let current='',generation=0,scene=null,ending=false,manualPaused=false,desired='prologue';
const active=()=>game.classList.contains('active');
function choose(d){
 if(!d)return 'palace';
 const id=String(d.id||'').toLowerCase(),chapter=String(d.chapter||'').toLowerCase(),speaker=String(d.speaker||'').toLowerCase(),t=String(d.text||'').toLowerCase();
 if(/cinematic|intro|prologue|opening|moon/.test(id+' '+chapter))return 'prologue';
 if(/romance|kiss|confess|love|intimacy/.test(id)||/입맞춤|고백|연심|사랑을 속삭/.test(t))return 'romance';
 if(/garden|rose|greenhouse|정원|장미/.test(id+' '+chapter+' '+t))return 'garden';
 if(/ball|dance|banquet|무도회|연회/.test(id+' '+chapter+' '+t))return 'ballroom';
 if(/library|archive|study|book|도서관|서재/.test(id+' '+chapter+' '+t))return 'library';
 if(/miguel|미겔/.test(speaker)||/miguel/.test(id))return 'miguel';
 if(/daniel|다니엘/.test(speaker)||/daniel/.test(id))return 'daniel';
 return 'palace';
}
function stopAll(){generation++;audio.pause();audio.currentTime=0;endingAudio.pause();endingAudio.currentTime=0;current='';status.textContent='정지됨';}
async function start(key){
 const token=++generation;
 if(!active()||ending||!tracks[key])return;
 endingAudio.pause();endingAudio.currentTime=0;
 if(current!==key){audio.pause();audio.src=tracks[key];current=key;}
 try{await audio.play();if(token!==generation||!active()||ending){audio.pause();return;}status.textContent='재생 중 · '+sel.options[sel.selectedIndex]?.text;}
 catch(_){if(token===generation)status.textContent='브라우저에서 자동 재생을 차단했습니다 · ▶ 재생을 눌러 주세요';}
}
function sync(){if(ending||!active())return;const key=sel.value==='auto'?desired:sel.value;if(!key){generation++;audio.pause();current='';status.textContent='음악 없음';return;}if(manualPaused)return;if(current===key&&!audio.paused)return;start(key);}
sel.value='auto';status.textContent='장면별 자동 BGM · 시작 후 재생';
sel.addEventListener('change',()=>{manualPaused=false;generation++;audio.pause();current='';sync();});
play.addEventListener('click',()=>{manualPaused=false;sync();});
pause.addEventListener('click',()=>{manualPaused=true;generation++;audio.pause();endingAudio.pause();status.textContent='일시정지';});
vol.addEventListener('input',()=>{audio.volume=Number(vol.value)/100;endingAudio.volume=Number(vol.value)/100;});
audio.addEventListener('error',()=>{status.textContent='음악 파일을 열 수 없습니다';});
endingAudio.addEventListener('error',()=>{status.textContent='엔딩 음악 파일을 열 수 없습니다';});
document.addEventListener('delharsha:scene',e=>{scene=e.detail;desired=choose(scene);if(sel.value==='auto')sync();});
document.addEventListener('delharsha:ending',e=>{generation++;audio.pause();audio.currentTime=0;endingAudio.pause();endingAudio.currentTime=0;ending=false;panel.open=false;if(!badEndings.has(e.detail?.id))return;ending=true;const result=endingAudio.play();status.textContent='배드 엔딩 전용곡 재생 중';if(result?.catch)result.catch(()=>{status.textContent='엔딩곡 재생이 차단되었습니다';});});
document.addEventListener('delharsha:game-audio-stop',()=>{stopAll();panel.open=false;});
const observer=new MutationObserver(()=>{if(!active()){stopAll();ending=false;panel.open=false;}else{ending=false;sync();}});
observer.observe(game,{attributes:true,attributeFilter:['class']});
document.getElementById('titleBtn')?.addEventListener('click',()=>{stopAll();ending=false;panel.open=false;});
document.addEventListener('visibilitychange',()=>{if(document.hidden){generation++;audio.pause();endingAudio.pause();status.textContent='일시정지 · ▶ 재생으로 재개';manualPaused=true;}});
document.addEventListener('click',e=>{const t=e.target;if(t instanceof HTMLElement&&/다음 회차 시작|새로운 이야기/.test(t.textContent||'')){ending=false;endingAudio.pause();endingAudio.currentTime=0;}},true);
})();
