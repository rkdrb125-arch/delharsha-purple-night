// v72: Bad-ending theme is reserved for confirmed ending, not a normal BGM choice.
(()=>{
'use strict';
const panel=document.getElementById('bgmPanel'),sel=document.getElementById('bgmTrack');
const play=document.getElementById('bgmPlay'),pause=document.getElementById('bgmPause');
const vol=document.getElementById('bgmVolume'),status=document.getElementById('bgmStatus');
const game=document.getElementById('game');
if(!panel||!sel||!game)return;
const tracks={musicbox:'assets/audio/purple_night_musicbox.mp3',piano:'assets/audio/purple_night_piano.mp3'};
const audio=new Audio();audio.preload='none';audio.loop=true;audio.volume=.35;
const endingAudio=new Audio('assets/audio/purple_night_alt.mp3');endingAudio.preload='none';endingAudio.loop=false;endingAudio.volume=.45;
const badEndings=new Set(['alex_fracture']);
let current='';
function active(){return game.classList.contains('active');}
function stop(){audio.pause();audio.currentTime=0;endingAudio.pause();endingAudio.currentTime=0;status.textContent='정지됨';}
sel.addEventListener('change',()=>{audio.pause();audio.currentTime=0;current='';status.textContent=sel.value?'재생 버튼을 눌러 주세요':'음악 없음';});
play.addEventListener('click',async()=>{
 if(!active()){status.textContent='게임 화면에서만 재생할 수 있습니다';return;}
 const track=sel.value;if(!tracks[track]){status.textContent='음악을 선택해 주세요';return;}
 endingAudio.pause();endingAudio.currentTime=0;
 if(current!==track){audio.src=tracks[track];current=track;}
 try{await audio.play();status.textContent='재생 중';}catch(_){status.textContent='재생이 차단되었습니다. 다시 눌러 주세요';}
});
pause.addEventListener('click',()=>{audio.pause();endingAudio.pause();status.textContent='일시정지';});
vol.addEventListener('input',()=>{audio.volume=Number(vol.value)/100;endingAudio.volume=Number(vol.value)/100;});
audio.addEventListener('error',()=>{status.textContent='음악 파일을 열 수 없습니다';});
endingAudio.addEventListener('error',()=>{status.textContent='엔딩 음악 파일을 열 수 없습니다';});
document.addEventListener('delharsha:ending',(event)=>{
 audio.pause();audio.currentTime=0;endingAudio.pause();endingAudio.currentTime=0;
 panel.open=false;
 if(!badEndings.has(event.detail?.id))return;
 // Fired synchronously from the player's ending-confirmation click.
 endingAudio.currentTime=0;
 const result=endingAudio.play();
 status.textContent='배드 엔딩 테마 재생 중';
 if(result&&typeof result.catch==='function')result.catch(()=>{status.textContent='배드 엔딩 음악은 재생이 차단되었습니다';});
});
const observer=new MutationObserver(()=>{if(!active()){stop();panel.open=false;}});
observer.observe(game,{attributes:true,attributeFilter:['class']});
document.getElementById('titleBtn')?.addEventListener('click',()=>{stop();panel.open=false;});
document.addEventListener('visibilitychange',()=>{if(document.hidden){audio.pause();endingAudio.pause();}});
// New game / next run button: the ending music should never continue into gameplay.
document.addEventListener('click',e=>{const t=e.target;if(t instanceof HTMLElement && /다음 회차 시작|새로운 이야기/.test(t.textContent||''))endingAudio.pause();},true);
})();
