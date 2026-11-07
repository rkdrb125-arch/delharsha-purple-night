'use strict';
// Story data is intentionally modular: replace or extend NODES without changing the UI.
const SAVE_KEY='delharsha_purple_night_v1'; // v1 save compatibility retained
const NODES={
 intro:{speaker:'SYSTEM',text:'델하르사 제국 전역에 황실의 초대장이 전달되었습니다.\n마물 습격 이후, 평화를 기원하는 연회가 열립니다.',next:'invitation'},
 invitation:{speaker:'초대장',text:'화합의 황실 무도회\n\n신분에 연연하지 않고 모두 평화를 위한 축배를 들어주세요.\n장소: 델하르사 황실 연회장\n드레스코드: 보라색 포인트 컬러',next:'daniel'},
 daniel:{speaker:'다니엘 레온하르트',text:'……황실 무도회라.\n초대장의 가장자리를 두 번이나 반듯하게 펴 놓았다. 이런 자리에선 실수하지 않는 것이 최선이었다. 가문에 누를 끼치고 싶지 않았다.',next:'decision'},
 decision:{speaker:'SYSTEM',text:'어떻게 행동하시겠습니까?',choices:[{text:'초대장을 다시 읽는다.',next:'read',effects:{resolve:1}},{text:'연회 준비를 시작한다.',next:'prepare',effects:{resolve:2}},{text:'잠시 생각에 잠긴다.',next:'reflect',effects:{resolve:1}}]},
 read:{speaker:'다니엘',text:'보랏빛 밤…… 세 개의 달이 떠오른다고 했던가.',next:'end'},
 prepare:{speaker:'SYSTEM',text:'다니엘은 연회 준비를 시작합니다.\n(의상 선택 시스템은 추후 확장 예정입니다.)',next:'end'},
 reflect:{speaker:'다니엘',text:'모든 것이 평온하게 지나가기를.',next:'end'},
 end:{speaker:'SYSTEM',text:'프롤로그가 끝났습니다.\n연회에 참석하시겠습니까?',choices:[{text:'황실 연회장으로 향한다.',next:'ball_arrival'},{text:'처음부터 다시 보기',next:'intro',reset:true},{text:'타이틀로 돌아가기',action:'home'}]},
 ball_arrival:{speaker:'SYSTEM',text:'CHAPTER 01 · 보라색의 밤\n세 개의 달이 떠오르는 밤, 황실 연회장의 문이 열립니다.',next:'ball_daniel',day:1,chapter:'CHAPTER 01'},
 ball_daniel:{speaker:'다니엘 레온하르트',text:'……실수하지 말자.\n다니엘은 소매 끝의 보라색 장식을 고쳐 매었다. 낯선 차림이 여전히 어색했다. 예전처럼 안경을 쓰고 오래된 예복을 입었다면 차라리 편했을 텐데. 약혼자가 좋아하는 모습이니, 불평할 일은 아니었다.',next:'ball_choice',chapter:'CHAPTER 01'},
 ball_choice:{speaker:'SYSTEM',text:'연회장에서 무엇을 먼저 하시겠습니까?',chapter:'CHAPTER 01',choices:[{text:'연회장 안쪽으로 들어간다.',next:'ball_miguel',effects:{resolve:1}},{text:'주변 귀족들에게 인사한다.',next:'ball_greeting',effects:{reputation:2}},{text:'잠시 숨을 고른다.',next:'ball_rest',effects:{resolve:2}}]},
 ball_greeting:{speaker:'SYSTEM',text:'다니엘은 예를 갖추어 인사를 나눕니다.\n가문 평판이 조금 올랐습니다.',next:'ball_miguel',chapter:'CHAPTER 01'},
 ball_rest:{speaker:'다니엘 레온하르트',text:'……괜찮습니다. 잠시 숨만 고르면 됩니다.\n그는 괜히 옷깃을 여몄다. 다른 이들은 저마다 제자리를 아는 듯했다.',next:'ball_miguel',chapter:'CHAPTER 01'},
 ball_miguel:{speaker:'SYSTEM',text:'연회장 한편에서 미겔 코트리먼을 발견합니다.\n그녀는 지금도 알렉스 레온하르트의 약혼자입니다.',next:'ball_meeting',chapter:'CHAPTER 01'},
 ball_meeting:{speaker:'SYSTEM',text:'미겔에게 어떻게 다가가시겠습니까?',chapter:'CHAPTER 01',choices:[{text:'정중히 인사를 건넨다.',next:'ball_hello',effects:{trust:2}},{text:'적당한 거리를 유지한다.',next:'ball_distance',effects:{resolve:2}},{text:'먼저 주변 상황을 살핀다.',next:'ball_watch',effects:{reputation:1}}]},
 ball_hello:{speaker:'SYSTEM',text:'다니엘은 자세를 바로잡고 정중히 고개를 숙였다.\n“코트리먼 후작님. ……안녕하십니까.”\n말을 마친 뒤에도 혹시 무례한 표현은 없었는지 되짚었다.',next:'demo_end',chapter:'CHAPTER 01'},
 ball_distance:{speaker:'SYSTEM',text:'다니엘은 예의를 지키며 한 발 물러섭니다.',next:'demo_end',chapter:'CHAPTER 01'},
 ball_watch:{speaker:'SYSTEM',text:'다니엘은 연회장의 분위기를 먼저 살핍니다.',next:'demo_end',chapter:'CHAPTER 01'},
 demo_end:{speaker:'다니엘 레온하르트',text:'……어디로 가셨을까.\n아니, 찾는 건 아닙니다. 그저 예를 갖춰 인사를…….',chapter:'CHAPTER 01',next:'explore'},
 explore:{speaker:'SYSTEM',text:'황궁 탐색 · 미겔의 행방을 찾아보세요.\n장소를 이동하면 시간이 흐릅니다. 단서를 모으면 특별한 장소가 열립니다.',chapter:'CHAPTER 01',explore:true},
 explore_hint:{speaker:'SYSTEM',text:'회랑의 시종에게 조심스레 행방을 묻자 최근 목격 장소를 알려주었다.\n하지만 미겔도 계속 이동하고 있다. 너무 늦으면 단서가 빗나갈지도 모른다.',chapter:'CHAPTER 01',next:'explore'},
 explore_empty:{speaker:'다니엘 레온하르트',text:'……이곳에도 계시지 않는군.\n형의 약혼자에게 인사를 드리는 건 당연한 예의다. 그렇다고 같은 회랑을 두 번이나 지날 필요까지 있었을까.',chapter:'CHAPTER 01',next:'explore'},
 explore_alex:{speaker:'SYSTEM',text:'회랑 건너편에서 알렉스 레온하르트가 모습을 드러냈다. 형과 눈이 마주치자 다니엘은 반사적으로 자세를 바로잡았다.\n어쩐지 손끝이 굳었다. 미겔을 찾고 있었다는 말은, 입 밖에 낼 수 없었다.',chapter:'CHAPTER 01',choices:[{text:'정중하게 인사한다.',next:'alex_greeting',effects:{reputation:2}},{text:'연회장에 관한 이야기로 화제를 돌린다.',next:'alex_smalltalk',effects:{resolve:1}},{text:'잠시 자리를 피해도 되는지 양해를 구한다.',next:'alex_excuse',effects:{risk:1}}]},
 alex_greeting:{speaker:'다니엘 레온하르트',text:'“형님. ……안녕하십니까.”\n고개를 숙인 다니엘은 괜히 옷깃을 고쳐 잡았다. 형의 대답을 기다리는 잠깐이 길게 느껴졌다.',chapter:'CHAPTER 01',next:'explore'},
 alex_smalltalk:{speaker:'다니엘 레온하르트',text:'“오늘 연회는…… 성대하군요.”\n입 밖으로 내고 나서야 너무 뻔한 말이었다는 생각이 들었다. 다니엘은 얌전히 시선을 내렸다.',chapter:'CHAPTER 01',next:'explore'},
 alex_excuse:{speaker:'다니엘 레온하르트',text:'“죄송합니다. 잠시 실례해도 되겠습니까?”\n그는 걸음을 옮기고 나서도 자신의 태도가 무례하지 않았는지 되짚었다.',chapter:'CHAPTER 01',next:'explore'},
 alex_miguel:{speaker:'SYSTEM',text:'미겔의 곁에 알렉이 서 있었다. 다니엘은 그제야 두 사람이 약혼한 사이라는 사실을 새삼 실감했다.\n미겔은 자연스럽게 그를 불렀다. “알렉.”\n다니엘은 인사를 해야 할지, 방해하지 않고 돌아서야 할지 잠시 망설였다.',chapter:'CHAPTER 01',choices:[{text:'두 사람에게 정중히 인사한다.',next:'alex_miguel_greet',effects:{reputation:2,trust:1}},{text:'방해하지 않고 조용히 물러선다.',next:'alex_miguel_leave',effects:{resolve:1}},{text:'급히 발걸음을 돌린다.',next:'alex_miguel_flee',effects:{risk:2}}]},
 alex_miguel_greet:{speaker:'다니엘 레온하르트',text:'“형님, 코트리먼 후작님. ……좋은 밤입니다.”\n말은 무난했다. 다만 가슴께에서 쿵쿵 울리는 소리는 그 자신에게만 들리기를 바랐다.',chapter:'CHAPTER 01',next:'explore'},
 alex_miguel_leave:{speaker:'SYSTEM',text:'다니엘은 두 사람을 향해 가볍게 고개를 숙인 뒤 물러섰다.\n인사를 미룬 이유를 굳이 이름 붙이고 싶지 않았다.',chapter:'CHAPTER 01',next:'explore'},
 alex_miguel_flee:{speaker:'다니엘 레온하르트',text:'“……아.”\n갑작스럽게 방향을 틀었다. 한참 뒤에야 그 행동이 더 눈에 띄었을지도 모른다는 생각이 들었다.',chapter:'CHAPTER 01',next:'explore'},
 explore_found:{speaker:'SYSTEM',text:'노란 장미가 심어진 온실 입구.\n조용한 발소리가 멎고, 미겔 코트리먼이 고개를 돌립니다.\n“……레온하르트 경?”',chapter:'CHAPTER 01',choices:[{text:'“우연히 지나던 길이었습니다.”',next:'found_shy',effects:{affection:2,risk:1}},{text:'“인사를 드리고 싶었습니다.”',next:'found_honest',effects:{trust:3,resolve:2}},{text:'“불편하셨다면 물러나겠습니다.”',next:'found_polite',effects:{trust:2}}]},
 found_shy:{speaker:'다니엘 레온하르트',text:'우연히 지나던 길이라니. 벌써 세 번째로 같은 복도를 지나왔으면서.\n다니엘은 스스로의 변명이 부끄러워 시선을 내렸다. 그저 인사를 드리려 했을 뿐이라고, 다시 한번 속으로 되뇌었다.',chapter:'CHAPTER 01',next:'miguel_conversation'},
 found_honest:{speaker:'미겔 코트리먼',text:'“……그러셨군요.”\n짧은 대답 뒤, 미겔은 조용히 그를 바라봅니다.',chapter:'CHAPTER 01',next:'miguel_conversation'},
 found_polite:{speaker:'미겔 코트리먼',text:'“아닙니다. 잠시 머물다 가셔도 괜찮습니다.”',chapter:'CHAPTER 01',next:'miguel_conversation'},
 miguel_conversation:{speaker:'미겔 코트리먼',text:'“오늘은 알렉과 함께 입장했습니다. 혹시 그를 찾으시는 겁니까?”\n그녀는 잠시 다니엘의 옷깃을 살폈다. 얼굴보다는 복장과 걸음걸이를 기억하는 버릇 때문이었다.',chapter:'CHAPTER 01',choices:[{text:'“아닙니다. 후작님께 인사를 드리고 싶었습니다.”',next:'miguel_truth',effects:{trust:2,affection:1,risk:1}},{text:'“형님께서 어디 계신지 여쭈려 했습니다.”',next:'miguel_alex',effects:{reputation:1,resolve:1}},{text:'“실례했습니다. 이만 물러나겠습니다.”',next:'miguel_retreat',effects:{resolve:2}}]},
 miguel_truth:{speaker:'미겔 코트리먼',text:'“그렇습니까.”\n미겔은 그 이상 캐묻지 않았다. 다만 시선이 잠깐 그의 소매에 머물렀다.\n“오늘은 평소와 다른 옷을 입으셨군요, 레온하르트 경.”',chapter:'CHAPTER 01',next:'explore_finish'},
 miguel_alex:{speaker:'미겔 코트리먼',text:'“알렉이라면 연회장 안쪽에 계실 겁니다.”\n그녀는 짧게 답했다. 다니엘은 감사 인사를 하면서도, 정작 묻고 싶었던 말이 따로 있었음을 깨달았다.',chapter:'CHAPTER 01',next:'explore_finish'},
 miguel_retreat:{speaker:'다니엘 레온하르트',text:'“……미안하게 됐습니다.”\n고개를 숙이고 돌아섰다. 몇 걸음 걷지 못하고 그는 자신이 무엇을 사과한 것인지 생각했다.',chapter:'CHAPTER 01',next:'explore_finish'},
 explore_finish:{speaker:'SYSTEM',text:'CHAPTER 01 · 탐색 완료\n오늘 밤의 만남은 여기까지입니다. 아직 할 말이 남은 듯하지만, 다니엘은 예를 갖추어 물러납니다.',chapter:'CHAPTER 01',choices:[{text:'다음 날 연회에 참석한다.',next:'explore',action:'nextDay'},{text:'오늘 밤 다시 둘러보기',next:'explore',action:'restartExplore'},{text:'타이틀로 돌아가기',action:'home'}]},
 wine_accident:{speaker:'SYSTEM',text:'인파를 피해 서둘러 걸음을 옮기던 다니엘의 손에서 잔이 기울었다. 붉은 와인이 미겔의 연보랏빛 드레스에 튀었다.\n당사자보다 다니엘의 얼굴이 먼저 새하얗게 질렸다.',chapter:'CHAPTER 01',next:'wine_apology'},
 wine_apology:{speaker:'다니엘 레온하르트',text:'“……죄, 죄송합니다. 괜찮으십니까?”\n그는 서둘러 손수건을 꺼냈다가 드레스에 손을 대기 직전 멈칫했다. 직접 닦아드리는 것은 실례일 터였다.',chapter:'CHAPTER 01',choices:[{text:'손수건을 정중히 건넨다.',next:'wine_handoff',effects:{trust:3,resolve:1}},{text:'당황한 채 변상을 약속한다.',next:'wine_compensate',effects:{trust:1,reputation:1}},{text:'어째서 서둘렀는지 솔직히 말한다.',next:'wine_confess',effects:{affection:2,risk:2}}]},
 wine_handoff:{speaker:'미겔 코트리먼',text:'“손수건을 주시겠습니까?”\n미겔은 건네받은 천으로 드레스의 와인을 조용히 눌렀다. “크게 상한 곳은 없습니다. 너무 염려하지 않으셔도 됩니다.”',chapter:'CHAPTER 01',next:'wine_question'},
 wine_compensate:{speaker:'다니엘 레온하르트',text:'“그…… 드레스는 제가 변상하겠습니다. 반드시.”\n미겔은 잠시 그의 손에 쥐어진 손수건을 보았다. “우선 그것부터 주시겠습니까, 레온하르트 경.”',chapter:'CHAPTER 01',next:'wine_question'},
 wine_confess:{speaker:'다니엘 레온하르트',text:'“후작님께 인사를…… 드리려 했습니다. 그뿐입니다.”\n말을 끝내자마자 스스로도 변명처럼 들렸다. 미겔은 잠시 침묵하다 손수건을 청했다.',chapter:'CHAPTER 01',next:'wine_question'},
 wine_question:{speaker:'미겔 코트리먼',text:'“어디를 그리 급히 가시던 중이었습니까?”\n그녀의 목소리는 낮고 차분했다. 다니엘은 대답하기 전 옷깃을 한 번 고쳐 잡았다.',chapter:'CHAPTER 01',choices:[{text:'“속이 좋지 않아 잠시 바람을 쐬려 했습니다.”',next:'wine_after',effects:{trust:1}},{text:'“……후작님을 찾고 있었습니다.”',next:'wine_after',effects:{affection:2,risk:2}},{text:'“부주의했습니다. 다시 한번 사과드립니다.”',next:'wine_after',effects:{reputation:1}}]},
 wine_after:{speaker:'다니엘 레온하르트',text:'미겔은 더 캐묻지 않았다. 그 조용한 배려에 다니엘은 오히려 고개를 들기 어려웠다.\n“……미안하게 됐습니다.”',chapter:'CHAPTER 01',next:'explore_finish'},
 explore_timeout:{speaker:'SYSTEM',text:'연회의 밤이 깊어 간다. 다니엘은 소매 끝을 매만지며 오늘 밤의 일을 되짚었다.\n찾는 사람을 만나지 못했더라도, 황궁의 밤은 내일 다시 이어진다.',chapter:'CHAPTER 01',choices:[{text:'다음 날 연회에 참석한다.',next:'explore',action:'nextDay'},{text:'오늘 밤 다시 둘러보기',next:'explore',action:'restartExplore'},{text:'타이틀로 돌아가기',action:'home'}]}
};
const $=id=>document.getElementById(id);
let state={node:'intro',day:1,stats:{affection:0,trust:0,resolve:0,reputation:50,risk:0},history:[],exploration:{turn:0,clues:[],visited:[],found:false,sceneCounts:{}}};
const clone=x=>JSON.parse(JSON.stringify(x));
function show(id){document.querySelectorAll('.screen').forEach(e=>e.classList.toggle('active',e.id===id));}
const LOCATIONS=[
 {id:'hall',name:'대연회장',desc:'음악과 웃음소리 사이에서 익숙한 실루엣을 찾습니다.'},
 {id:'corridor',name:'대리석 회랑',desc:'시종에게 미겔의 행방을 물어볼 수 있습니다.'},
 {id:'terrace',name:'달빛 테라스',desc:'세 개의 달이 비추는 조용한 테라스입니다.'},
 {id:'drawing',name:'응접실',desc:'귀족들의 대화가 오가는 곳입니다.'},
 {id:'garden',name:'장미 정원',desc:'노란 장미가 보이는 온실로 이어집니다.'}
];
// Game-only rotating itineraries, not official AU canon. Each day has a distinct path.
const NIGHT_SCHEDULES=[
 ['hall','corridor','garden','terrace','drawing','garden','hall'],
 ['drawing','terrace','hall','garden','corridor','drawing','terrace'],
 ['garden','hall','drawing','corridor','terrace','hall','garden'],
 ['terrace','garden','corridor','drawing','hall','terrace','drawing']
];
const ALEX_SCHEDULES=[
 ['drawing','hall','corridor','hall','garden','drawing','corridor'],
 ['hall','corridor','drawing','terrace','hall','garden','drawing'],
 ['corridor','drawing','terrace','hall','drawing','garden','hall'],
 ['drawing','hall','garden','corridor','terrace','hall','corridor']
];
function scheduleFor(table,day){return table[(Math.max(1,day)-1)%table.length];}
// v14 game-only events; original character canon is unchanged.
const DAY_SPECIALS=[
 {day:2,place:'garden',speaker:'SYSTEM',text:'정원사의 바구니에 노란 장미가 담겨 있었다. 시든 꽃을 버리기 전 마지막으로 살피는 모습에 다니엘은 걸음을 멈췄다. 코트리먼 영지에도 이런 꽃이 피겠지.',options:[['정원사에게 꽃의 관리법을 묻는다.','정원사는 꽃을 오래 피우는 것보다 제때 돌보는 일이 중요하다고 답했다.',{resolve:1}],['그대로 지나간다.','다니엘은 꽃잎을 밟지 않도록 조심히 걸었다.',{reputation:1}]]},
 {day:3,place:'drawing',speaker:'시종',text:'응접실에 놓인 차가 식어 가고 있었다. 시종은 손님이 남긴 잔을 치워도 될지 고민하고 있었다.',options:[['정리를 도와준다.','다니엘은 잔을 조심히 옮겨 주었다. 시종이 감사 인사를 했다.',{reputation:1}],['손님이 돌아올지 먼저 확인한다.','서두르지 않고 확인하자 시종도 안도했다.',{trust:1}]]},
 {day:4,place:'terrace',speaker:'SYSTEM',text:'세 개의 달빛이 난간 위에 겹쳤다. 누군가 접어 둔 보랏빛 리본이 바람에 흔들렸다. 다니엘은 이 연회가 오래 기억에 남으리라 생각했다.',options:[['리본을 시종에게 맡긴다.','분실물을 받은 시종은 주인을 찾아보겠다고 했다.',{reputation:1}],['잠시 달빛을 바라본다.','그는 이유 없이 가슴이 답답해지는 것을 느꼈다.',{resolve:1}]]},
 {day:5,place:'corridor',speaker:'경비병',text:'회랑의 통행로가 잠시 바뀌었다. 경비병은 손님들이 길을 헤매지 않도록 안내하고 있었다.',options:[['안내를 돕는다.','다니엘은 길을 묻는 손님들에게 차근차근 방향을 알려 주었다.',{reputation:2}],['조용히 우회한다.','다니엘은 다른 회랑으로 걸음을 옮겼다.',{resolve:1}]]}
];
const CLUE_LINES={hall:['악단의 연주가 끝날 즈음, 누군가 정원으로 향하는 모습을 보았다고 한다.','한 시종이 응접실에 새 찻잔을 준비하라는 말을 들었다.'],corridor:['경비병은 조금 전 테라스 쪽으로 손님들이 지나갔다고 한다.','회랑 끝에 노란 꽃잎 하나가 떨어져 있다.'],terrace:['시종이 실내 응접실에 담요를 가져다 놓으러 갔다고 한다.','난간에 남은 장미 향이 어디에서 왔는지는 알 수 없다.'],drawing:['응접실의 손님이 연회장으로 돌아간다는 말을 남겼다.','한 시종이 정원으로 향하는 문을 잠시 열어 두었다.'],garden:['정원사가 회랑 쪽에서 발소리를 들었다고 한다.','꽃을 구경하던 손님들이 테라스 쪽으로 향했다고 한다.']};
const CLOCK_LABELS=['19:00','19:30','20:00','20:30','21:00','21:30','22:00','22:30'];
function exploration(){if(!state.exploration)state.exploration={turn:0,clues:[],visited:[],found:false,sceneCounts:{}};return state.exploration;}
function resetNight(){const questV15=state.exploration?.questV15||{step:0,done:false};state.exploration={turn:0,clues:[],visited:[],found:false,sceneCounts:{},dayEvents:[],clueChecks:0,questV15};}
function nextDay(){state.day=Math.max(1,Number(state.day)||1)+1;resetNight();v18CheckMissedPromise();state.node='explore';render();}
// 장소별 일반 장면과 익명 NPC. 동일한 장소를 반복 방문해도 다른 사건이 등장합니다.
const AMBIENT_SCENES={
 hall:[
  {speaker:'SYSTEM',text:'악단이 느린 왈츠를 연주한다. 홀 중앙에서는 무도회가 한창이다. 다니엘은 인파 사이를 살폈다가 공연히 시선을 내렸다.'},
  {speaker:'시종',text:'“레온하르트 경, 포도주를 더 드릴까요?”\n다니엘은 얼른 고개를 저었다. “아, 아닙니다. 감사합니다.”'},
  {speaker:'귀족',text:'“오늘은 세 개의 달이 유난히 밝군요.”\n옆에 선 귀족의 말에 다니엘은 정중히 맞장구쳤다. “……그렇습니다.”'},
  {speaker:'SYSTEM',text:'춤을 마친 손님들이 연회장 가장자리로 몰려왔다. 다니엘은 길을 비켜 주고는 제자리에 잠시 멈춰 섰다.'}
 ],
 corridor:[
  {speaker:'시종',text:'“찾으시는 분이 계십니까, 경?”\n다니엘은 잠깐 입술을 달싹였다. “아니…… 그저 길을 살피고 있었습니다.”'},
  {speaker:'SYSTEM',text:'대리석 바닥에 촛불이 길게 비쳤다. 멀리서 발소리가 들려왔으나, 지나간 것은 은식기를 든 시종뿐이었다.'},
  {speaker:'경비병',text:'“이쪽은 응접실로 이어집니다, 경.”\n“알려주셔서 감사합니다.” 다니엘은 필요 이상으로 정중히 고개를 숙였다.'},
  {speaker:'SYSTEM',text:'열린 창으로 서늘한 바람이 들었다. 다니엘은 흐트러진 소매를 고쳐 매고 복도 끝을 바라보았다.'}
 ],
 terrace:[
  {speaker:'SYSTEM',text:'세 개의 달빛이 테라스의 난간에 내려앉았다. 밤은 깊어지는데 하늘은 좀처럼 어두워지지 않았다.'},
  {speaker:'귀족',text:'“연회장 안이 너무 덥지 않습니까?”\n다니엘은 잠시 생각하다 답했다. “……조금은 그렇군요.”'},
  {speaker:'SYSTEM',text:'바람에 보랏빛 리본이 흔들렸다. 다니엘은 누군가 다가오는 소리에 돌아보았지만, 빈 잔을 치우는 시종이었다.'},
  {speaker:'시종',text:'“담요를 가져다드릴까요?”\n“괜찮습니다. 신경 써주셔서 감사합니다.”'}
 ],
 drawing:[
  {speaker:'SYSTEM',text:'응접실에서는 차와 과자가 오가고 있었다. 다니엘은 대화를 방해하지 않으려 문가에 조용히 섰다.'},
  {speaker:'귀족',text:'“코트리먼 영지의 장미가 그리 유명하다지요.”\n다니엘은 찻잔을 내려놓으며 잠시 귀를 기울였다.'},
  {speaker:'시종',text:'“차를 준비해 드릴까요, 경?”\n“아, 예. 부탁드립니다.” 말하고 나서야 다니엘은 자리에 앉을 생각이 없었음을 깨달았다.'},
  {speaker:'SYSTEM',text:'장작 타는 소리만 조용히 이어졌다. 다니엘은 시계를 확인한 뒤, 괜히 창가로 걸음을 옮겼다.'}
 ],
 garden:[
  {speaker:'정원사',text:'“장미를 구경하러 오셨습니까, 경?”\n“그…… 예. 아름답군요.” 다니엘은 가까운 꽃송이를 바라보았다.'},
  {speaker:'SYSTEM',text:'노란 장미의 향이 희미하게 퍼졌다. 정원 길 끝에 사람이 있는 듯했으나, 바람에 흔들린 가지였다.'},
  {speaker:'시종',text:'“정원은 이 시간에도 개방되어 있습니다.”\n“알려주셔서 감사합니다.” 다니엘은 길 가장자리로 비켜섰다.'},
  {speaker:'SYSTEM',text:'꽃잎 하나가 다니엘의 구두 앞에 떨어졌다. 그는 잠시 발을 멈추었다가 다시 걸었다.'}
 ]
};

// v9: additional slice-of-life encounters, with optional two-way responses.
const EXTRA_AMBIENT_SCENES={
 hall:[{"speaker": "시종", "text": "은쟁반 위에 잔들이 나란히 놓여 있다. 시종이 다니엘을 향해 살짝 고개를 숙였다.", "options": [{"text": "물을 청한다.", "response": "“물 한 잔 부탁드립니다.” 시종은 미소를 지으며 맑은 잔을 건넸다.", "effects": {"resolve": 1}}, {"text": "정중히 사양한다.", "response": "“괜찮습니다. 수고가 많으십니다.” 시종이 뜻밖이라는 듯 눈을 깜빡였다.", "effects": {"reputation": 1}}]}, {"speaker": "악사", "text": "바이올린의 현 하나가 끊어졌다. 악사가 당황해 악기를 내려놓았다.", "options": [{"text": "악사를 위로한다.", "response": "“충분히 훌륭한 연주였습니다.” 다니엘은 진심으로 말했다.", "effects": {"resolve": 1}}, {"text": "조용히 자리를 비킨다.", "response": "다니엘은 공연을 방해하지 않도록 기둥 뒤로 물러섰다.", "effects": {"reputation": 1}}]}, {"speaker": "젊은 귀족", "text": "“레온하르트 경, 춤은 추지 않으십니까?” 낯선 귀족이 웃으며 물었다.", "options": [{"text": "춤을 잘 못 춘다고 인정한다.", "response": "“그…… 능숙한 편은 아닙니다.” 상대가 뜻밖이라는 듯 웃었다.", "effects": {"resolve": 1}}, {"text": "다른 손님을 먼저 권한다.", "response": "“저보다 적임자가 많을 겁니다.” 다니엘은 예를 갖춰 답했다.", "effects": {"reputation": 1}}]}, {"speaker": "SYSTEM", "text": "천장에 걸린 보랏빛 유리 장식이 세 개의 달빛을 받아 반짝인다.", "options": [{"text": "잠시 장식을 감상한다.", "response": "다니엘은 고개를 들어 장식이 만들어 낸 빛의 무늬를 바라보았다.", "effects": {"resolve": 1}}, {"text": "연회장 구석으로 이동한다.", "response": "다니엘은 인파를 피해 조용한 기둥 옆으로 걸음을 옮겼다.", "effects": {"reputation": 1}}]}, {"speaker": "시종장", "text": "“경, 이쪽 통로는 손님들이 많이 오갑니다.” 시종장이 조심스럽게 알렸다.", "options": [{"text": "길을 비켜 준다.", "response": "“제가 방해가 되었군요. 죄송합니다.” 다니엘은 급히 물러섰다.", "effects": {"resolve": 1}}, {"text": "안내에 감사를 표한다.", "response": "“알려주셔서 감사합니다.” 그는 통로 끝으로 향했다.", "effects": {"reputation": 1}}]}, {"speaker": "귀족", "text": "한 귀족이 떨어뜨린 장갑을 찾느라 바닥을 두리번거린다.", "options": [{"text": "장갑을 주워 준다.", "response": "“이것을 찾으십니까?” 다니엘은 장갑을 먼지 털어 건넸다.", "effects": {"resolve": 1}}, {"text": "시종에게 위치를 알려 준다.", "response": "다니엘이 가리킨 곳에서 시종이 장갑을 찾아 주었다.", "effects": {"reputation": 1}}]}, {"speaker": "SYSTEM", "text": "한 쌍의 무용수가 박자를 놓쳐 서로의 발을 밟았다. 웃음소리가 번진다.", "options": [{"text": "괜히 자신도 웃는다.", "response": "다니엘은 입가에 번진 웃음을 급히 감췄다. 남의 실수를 웃는 건 실례였다.", "effects": {"resolve": 1}}, {"text": "다른 쪽을 바라본다.", "response": "그는 무용수들이 민망하지 않도록 시선을 돌렸다.", "effects": {"reputation": 1}}]}, {"speaker": "귀족 부인", "text": "“황실의 보랏빛 장식이 참 아름답지 않나요?” 귀족 부인이 말을 건넸다.", "options": [{"text": "솔직히 칭찬한다.", "response": "“예. 세심하게 준비한 흔적이 보입니다.”", "effects": {"resolve": 1}}, {"text": "고개를 숙여 동의한다.", "response": "“그렇습니다.” 다니엘은 단정히 답했다.", "effects": {"reputation": 1}}]}, {"speaker": "시종", "text": "“잃어버린 물건을 찾으십니까?” 시종이 다니엘의 두리번거림을 보고 물었다.", "options": [{"text": "아니라고 답한다.", "response": "“아, 아닙니다. 걱정해 주셔서 감사합니다.”", "effects": {"resolve": 1}}, {"text": "잠시 망설인다.", "response": "다니엘은 누군가의 이름을 꺼내려다 입을 다물었다. “……괜찮습니다.”", "effects": {"reputation": 1}}]}, {"speaker": "SYSTEM", "text": "화려한 샹들리에 아래에서 어린 시종이 촛불을 갈기 위해 사다리를 세웠다.", "options": [{"text": "사다리를 잡아 준다.", "response": "“잠시 붙잡고 있겠습니다.” 시종이 거듭 고개를 숙였다.", "effects": {"resolve": 1}}, {"text": "위험하지 않은지 살핀다.", "response": "다니엘은 시종이 내려올 때까지 가까이에서 지켜보았다.", "effects": {"reputation": 1}}]}],
 corridor:[{"speaker": "경비병", "text": "“이쪽 복도는 황실 서고로 이어집니다.” 경비병이 안내한다.", "options": [{"text": "출입 가능 여부를 묻는다.", "response": "“오늘은 닫혀 있습니다, 경.” 다니엘은 즉시 고개를 숙였다.", "effects": {"resolve": 1}}, {"text": "안내에 감사한다.", "response": "“알겠습니다. 알려주셔서 감사합니다.”", "effects": {"reputation": 1}}]}, {"speaker": "시종", "text": "한 시종이 리넨 더미를 안고 비틀거렸다.", "options": [{"text": "문을 열어 준다.", "response": "다니엘이 문을 잡아 주자 시종이 안도의 한숨을 내쉬었다.", "effects": {"resolve": 1}}, {"text": "짐을 나눠 들겠다고 한다.", "response": "“괜찮습니다, 경!” 시종이 화들짝 놀라자 다니엘도 덩달아 당황했다.", "effects": {"reputation": 1}}]}, {"speaker": "SYSTEM", "text": "복도 벽의 초상화들이 희미한 촛불에 잠겨 있다.", "options": [{"text": "초상화의 설명을 읽는다.", "response": "황실의 오래된 역사가 작은 금속 명패에 빼곡히 적혀 있다.", "effects": {"resolve": 1}}, {"text": "그대로 지나간다.", "response": "구두 굽 소리만 조용히 대리석 위를 울렸다.", "effects": {"reputation": 1}}]}, {"speaker": "시종", "text": "“방금 장미 향기가 나지 않았습니까?” 시종이 다른 시종에게 속삭였다.", "options": [{"text": "향기의 근원을 묻는다.", "response": "“꽃 장식을 옮겼습니다, 경.” 시종이 꽃바구니를 가리켰다.", "effects": {"resolve": 1}}, {"text": "그저 듣고 지나간다.", "response": "다니엘은 괜히 발걸음을 늦추었다가 다시 걸었다.", "effects": {"reputation": 1}}]}, {"speaker": "귀족", "text": "“길을 잃었군요. 대연회장이 어느 쪽이죠?”", "options": [{"text": "길을 안내한다.", "response": "다니엘은 기억을 더듬어 왔던 길을 설명했다.", "effects": {"resolve": 1}}, {"text": "함께 표지판을 찾는다.", "response": "두 사람은 잠시 복도를 살펴보고 표지판을 발견했다.", "effects": {"reputation": 1}}]}, {"speaker": "SYSTEM", "text": "열린 창문 사이로 보랏빛 밤하늘이 보인다.", "options": [{"text": "창문을 닫는다.", "response": "찬바람이 들지 않도록 창문을 닫자 복도가 한결 조용해졌다.", "effects": {"resolve": 1}}, {"text": "잠시 바깥을 바라본다.", "response": "세 개의 달이 나란히 떠 있었다. 다니엘은 말없이 그 빛을 바라보았다.", "effects": {"reputation": 1}}]}, {"speaker": "경비병", "text": "경비병이 다니엘의 예복을 보고 자세를 바로잡았다.", "options": [{"text": "가볍게 인사한다.", "response": "“수고가 많으십니다.” 경비병의 굳은 표정이 조금 풀렸다.", "effects": {"resolve": 1}}, {"text": "지나가도 되는지 묻는다.", "response": "“물론입니다, 경.” 다니엘은 정중히 고개를 숙였다.", "effects": {"reputation": 1}}]}, {"speaker": "시종", "text": "시종이 바닥에 흩어진 초대장 몇 장을 주워 담는다.", "options": [{"text": "함께 줍는다.", "response": "“아, 경께서 이런 일을…….” “괜찮습니다.” 다니엘은 마지막 한 장을 건넸다.", "effects": {"resolve": 1}}, {"text": "발밑의 종이를 피해 간다.", "response": "다니엘은 초대장이 구겨지지 않도록 조심히 걸었다.", "effects": {"reputation": 1}}]}, {"speaker": "SYSTEM", "text": "멀리서 구두 굽 소리가 들려왔다. 다니엘은 무심코 걸음을 멈췄다.", "options": [{"text": "소리 나는 쪽을 본다.", "response": "나타난 것은 커다란 화병을 든 시종 둘이었다.", "effects": {"resolve": 1}}, {"text": "그대로 걸어간다.", "response": "그는 이유 없이 서두른 자신을 의아하게 여겼다.", "effects": {"reputation": 1}}]}, {"speaker": "시종장", "text": "“이곳에선 큰 소리로 말씀하지 않으시면 좋겠습니다.”", "options": [{"text": "즉시 사과한다.", "response": "“……죄송합니다. 주의하겠습니다.” 실은 한마디도 하지 않았지만.", "effects": {"resolve": 1}}, {"text": "조용히 고개를 끄덕인다.", "response": "다니엘은 아무 말 없이 발걸음을 가볍게 옮겼다.", "effects": {"reputation": 1}}]}],
 terrace:[{"speaker": "SYSTEM", "text": "테라스 난간에는 밤이슬이 맺혀 있다.", "options": [{"text": "손수건으로 물기를 닦는다.", "response": "다니엘은 괜히 손수건을 꺼냈다가 자신이 무얼 하는지 깨닫고 멈칫했다.", "effects": {"resolve": 1}}, {"text": "난간에서 물러선다.", "response": "차가운 바람이 옷깃을 스쳤다.", "effects": {"reputation": 1}}]}, {"speaker": "귀족", "text": "“밤이 이렇게 밝으면 별을 보기 어렵군요.”", "options": [{"text": "달 이야기를 나눈다.", "response": "“그렇지만 세 개의 달을 함께 보는 일도 드물지 않습니까.”", "effects": {"resolve": 1}}, {"text": "짧게 동의한다.", "response": "“……그러게 말입니다.”", "effects": {"reputation": 1}}]}, {"speaker": "시종", "text": "“바람이 찹니다. 숄을 가져다드릴까요?”", "options": [{"text": "정중히 거절한다.", "response": "“괜찮습니다. 신경 써 주셔서 감사합니다.”", "effects": {"resolve": 1}}, {"text": "안쪽 손님을 챙겨 달라고 한다.", "response": "“안에 계신 분들부터 살펴주십시오.” 시종은 미소 지었다.", "effects": {"reputation": 1}}]}, {"speaker": "SYSTEM", "text": "하늘에 떠 있는 세 개의 달이 연못 위에 겹쳐 비친다.", "options": [{"text": "연못을 바라본다.", "response": "물결이 일 때마다 달의 형상이 길게 흐트러졌다.", "effects": {"resolve": 1}}, {"text": "눈을 감고 바람을 느낀다.", "response": "다니엘은 한동안 아무 생각도 하지 않으려 애썼다.", "effects": {"reputation": 1}}]}, {"speaker": "귀족", "text": "“여기서도 음악이 들리는군요.” 누군가 난간에 기대어 말했다.", "options": [{"text": "연주에 귀를 기울인다.", "response": "멀리서 들려오는 선율은 연회장 안보다 부드러웠다.", "effects": {"resolve": 1}}, {"text": "안쪽으로 돌아갈 채비를 한다.", "response": "다니엘은 흐트러진 옷깃을 매만졌다.", "effects": {"reputation": 1}}]}, {"speaker": "SYSTEM", "text": "테라스 구석에 작은 화분이 놓여 있다. 보랏빛 꽃이 바람에 흔들린다.", "options": [{"text": "꽃을 살펴본다.", "response": "낯선 꽃이었다. 다니엘은 이름을 짐작해 보다가 포기했다.", "effects": {"resolve": 1}}, {"text": "손대지 않고 지나간다.", "response": "꽃잎이 바람에 가볍게 떨렸다.", "effects": {"reputation": 1}}]}, {"speaker": "경비병", "text": "“밤이 깊었습니다. 발밑을 조심하십시오.”", "options": [{"text": "감사를 전한다.", "response": "“주의하겠습니다. 고맙습니다.”", "effects": {"resolve": 1}}, {"text": "주변의 위험을 살핀다.", "response": "다니엘은 난간 아래 어두운 계단을 확인했다.", "effects": {"reputation": 1}}]}, {"speaker": "시종", "text": "시종이 비어 있는 찻잔을 수거한다.", "options": [{"text": "잔을 건네준다.", "response": "“여기 있습니다.” 다니엘은 빈 잔을 조심스럽게 건넸다.", "effects": {"resolve": 1}}, {"text": "잠시 길을 비켜 준다.", "response": "시종이 고개를 숙이며 지나갔다.", "effects": {"reputation": 1}}]}, {"speaker": "SYSTEM", "text": "문이 열릴 때마다 연회장의 온기가 테라스로 흘러나왔다.", "options": [{"text": "문을 닫아 준다.", "response": "다니엘은 뒤따라오는 손님이 없는지 확인한 뒤 문을 닫았다.", "effects": {"resolve": 1}}, {"text": "실내의 음악을 듣는다.", "response": "현악기의 선율이 바람을 타고 흘러나왔다.", "effects": {"reputation": 1}}]}, {"speaker": "귀족", "text": "“혹시 누구를 기다리고 계십니까?” 낯선 사람이 물었다.", "options": [{"text": "아니라고 답한다.", "response": "“그런 건 아닙니다만…….” 말끝이 조금 흐려졌다.", "effects": {"resolve": 1}}, {"text": "잠시 바람을 쐬는 중이라고 한다.", "response": "“예. 연회장이 조금 답답해서요.”", "effects": {"reputation": 1}}]}],
 drawing:[{"speaker": "시종", "text": "“차는 홍차와 허브차가 준비되어 있습니다.”", "options": [{"text": "홍차를 청한다.", "response": "따뜻한 찻잔이 손에 닿자 긴장이 조금 누그러졌다.", "effects": {"resolve": 1}}, {"text": "허브차를 청한다.", "response": "은은한 풀 향기가 응접실에 퍼졌다.", "effects": {"reputation": 1}}]}, {"speaker": "귀족", "text": "“최근 영지 사정은 어떻습니까?” 낯선 귀족이 말을 건넸다.", "options": [{"text": "신중하게 답한다.", "response": "“제가 단정할 수는 없습니다만, 큰 문제는 없는 것으로 압니다.”", "effects": {"resolve": 1}}, {"text": "화제를 돌린다.", "response": "“먼저 경의 영지는 어떠십니까?”", "effects": {"reputation": 1}}]}, {"speaker": "SYSTEM", "text": "벽난로에서 작은 불꽃이 튀었다.", "options": [{"text": "조금 더 가까이 앉는다.", "response": "불길이 얼굴을 따뜻하게 비추었다.", "effects": {"resolve": 1}}, {"text": "창가로 이동한다.", "response": "창밖에는 보랏빛 하늘이 펼쳐져 있었다.", "effects": {"reputation": 1}}]}, {"speaker": "시종", "text": "“과자를 조금 더 가져다드릴까요?”", "options": [{"text": "하나만 받는다.", "response": "“한 개면 충분합니다. 감사합니다.”", "effects": {"resolve": 1}}, {"text": "사양한다.", "response": "“괜찮습니다.” 다니엘은 빈 접시를 돌려주었다.", "effects": {"reputation": 1}}]}, {"speaker": "귀족 부인", "text": "“오늘 연회에서는 어느 가문의 꽃장식이 가장 훌륭할까요?”", "options": [{"text": "장미를 칭찬한다.", "response": "“장미가 인상 깊었습니다.” 그 말이 왜 유독 조심스러웠는지 스스로도 몰랐다.", "effects": {"resolve": 1}}, {"text": "모두 훌륭하다고 답한다.", "response": "“각각의 장점이 있다고 생각합니다.”", "effects": {"reputation": 1}}]}, {"speaker": "SYSTEM", "text": "탁자 위에 놓인 체스판은 중간에 멈춘 채다.", "options": [{"text": "말의 배치를 살핀다.", "response": "다니엘은 몇 수 앞을 생각하다 이내 손을 거두었다.", "effects": {"resolve": 1}}, {"text": "건드리지 않고 지나간다.", "response": "누군가 곧 돌아와 이어 둘 판이었다.", "effects": {"reputation": 1}}]}, {"speaker": "시종", "text": "“이 책은 손님들께서 자유롭게 읽으셔도 됩니다.”", "options": [{"text": "책을 펼쳐 본다.", "response": "오래된 시집의 책갈피가 바스락거렸다.", "effects": {"resolve": 1}}, {"text": "책을 제자리에 둔다.", "response": "다니엘은 표지가 구겨지지 않도록 책을 바로 놓았다.", "effects": {"reputation": 1}}]}, {"speaker": "귀족", "text": "“황실의 연회가 이렇게 길어질 줄은 몰랐습니다.”", "options": [{"text": "조심스럽게 동의한다.", "response": "“평화를 기리는 자리이니 의미가 있겠지요.”", "effects": {"resolve": 1}}, {"text": "의견을 삼간다.", "response": "다니엘은 찻잔을 들어 잠시 입술을 적셨다.", "effects": {"reputation": 1}}]}, {"speaker": "SYSTEM", "text": "응접실 구석의 작은 시계가 정각을 알렸다.", "options": [{"text": "시간을 확인한다.", "response": "생각보다 시간이 많이 흘렀다. 다니엘은 문 쪽을 바라보았다.", "effects": {"resolve": 1}}, {"text": "차분히 자리에 머문다.", "response": "그는 무릎 위에 놓인 손을 가지런히 모았다.", "effects": {"reputation": 1}}]}, {"speaker": "시종장", "text": "“잠시 후 손님들이 이곳을 이용하실 예정입니다.”", "options": [{"text": "먼저 자리를 양보한다.", "response": "“그럼 저는 이만.” 다니엘은 급히 일어섰다.", "effects": {"resolve": 1}}, {"text": "정중히 물러난다.", "response": "“알겠습니다. 안내해 주셔서 감사합니다.”", "effects": {"reputation": 1}}]}],
 garden:[{"speaker": "정원사", "text": "“노란 장미는 이 계절에도 잘 피어납니다.”", "options": [{"text": "관리 방법을 묻는다.", "response": "정원사는 물과 햇빛에 대해 한참 설명했다. 다니엘은 진지하게 들었다.", "effects": {"resolve": 1}}, {"text": "꽃을 칭찬한다.", "response": "“정성이 많이 들었겠군요.” 정원사가 기분 좋게 웃었다.", "effects": {"reputation": 1}}]}, {"speaker": "SYSTEM", "text": "장미 덤불 사이로 작은 나비가 날아올랐다.", "options": [{"text": "잠시 나비를 바라본다.", "response": "나비는 꽃 사이를 옮겨 다니다 달빛 속으로 사라졌다.", "effects": {"resolve": 1}}, {"text": "조용히 길을 따라간다.", "response": "자갈이 구두 밑에서 가볍게 소리를 냈다.", "effects": {"reputation": 1}}]}, {"speaker": "시종", "text": "“정원 안쪽은 길이 미끄러우니 조심하십시오.”", "options": [{"text": "길 상태를 확인한다.", "response": "다니엘은 젖은 돌바닥을 살피며 천천히 걸었다.", "effects": {"resolve": 1}}, {"text": "감사 인사를 한다.", "response": "“주의하겠습니다. 고맙습니다.”", "effects": {"reputation": 1}}]}, {"speaker": "정원사", "text": "“꽃을 꺾는 손님이 가끔 계십니다.” 정원사가 난처하게 웃었다.", "options": [{"text": "꽃을 지켜 달라고 한다.", "response": "“아름다운 것을 그대로 두는 편이 좋겠습니다.”", "effects": {"resolve": 1}}, {"text": "말없이 고개를 끄덕인다.", "response": "다니엘은 꽃잎에 손을 대지 않았다.", "effects": {"reputation": 1}}]}, {"speaker": "SYSTEM", "text": "온실 유리벽에 보랏빛 달이 희미하게 비친다.", "options": [{"text": "유리벽을 살핀다.", "response": "서리처럼 얇은 물방울이 유리 위에 맺혀 있었다.", "effects": {"resolve": 1}}, {"text": "정원 벤치에 앉는다.", "response": "다니엘은 잠시 다리를 쉬었다.", "effects": {"reputation": 1}}]}, {"speaker": "시종", "text": "“경, 길을 찾고 계십니까?”", "options": [{"text": "정원 출구를 묻는다.", "response": "시종은 친절하게 바깥길을 가리켰다.", "effects": {"resolve": 1}}, {"text": "그저 산책 중이라고 한다.", "response": "“……예. 잠시 꽃을 보고 있었습니다.”", "effects": {"reputation": 1}}]}, {"speaker": "SYSTEM", "text": "꽃잎 몇 장이 돌계단에 흩어져 있다.", "options": [{"text": "꽃잎을 피해 걷는다.", "response": "다니엘은 구두 끝을 조심스럽게 옮겼다.", "effects": {"resolve": 1}}, {"text": "바람이 부는 방향을 본다.", "response": "노란 꽃잎이 한 번 더 허공에 흩날렸다.", "effects": {"reputation": 1}}]}, {"speaker": "정원사", "text": "“코트리먼 영지의 장미는 이곳 것보다 훨씬 넓게 피어 있다더군요.”", "options": [{"text": "영지 이야기를 듣는다.", "response": "다니엘은 무심코 한 걸음 가까이 다가섰다.", "effects": {"resolve": 1}}, {"text": "꽃의 품종을 묻는다.", "response": "정원사는 장미의 종류를 몇 가지 소개했다.", "effects": {"reputation": 1}}]}, {"speaker": "SYSTEM", "text": "멀리 분수대가 조용히 물소리를 낸다.", "options": [{"text": "분수대까지 걸어간다.", "response": "수면에 달빛이 잘게 부서졌다.", "effects": {"resolve": 1}}, {"text": "벤치에 잠시 머문다.", "response": "다니엘은 조용한 정원에 귀를 기울였다.", "effects": {"reputation": 1}}]}, {"speaker": "정원사", "text": "“이 꽃은 아직 피지 않았습니다.” 정원사가 작은 봉오리를 가리켰다.", "options": [{"text": "언제 필지 묻는다.", "response": "“며칠만 기다리시면 됩니다.” 다니엘은 고개를 끄덕였다.", "effects": {"resolve": 1}}, {"text": "기다리는 것도 좋다고 말한다.", "response": "“……기다리는 일도 나쁘지 않겠군요.”", "effects": {"reputation": 1}}]}]
};

// v10: 궁중의 작은 일상과 익명 NPC 대화 25종 추가.
const V10_AMBIENT_SCENES={"hall": [{"speaker": "꽃장식 담당 시종", "text": "시종이 보랏빛 리본을 단 꽃병 앞에서 난처하게 서 있다. “매듭이 자꾸 풀려서요.”", "options": [{"text": "리본을 고쳐 묶어 준다.", "response": "“이렇게 하면 되겠습니까?” 시종은 활짝 웃었다. 다니엘은 어색하게 손을 거두었다.", "effects": {"resolve": 1}}, {"text": "담당자를 불러 주겠다고 한다.", "response": "“제가 직접 만지면 오히려 망칠지도 모르겠습니다.” 시종은 정중히 감사를 표했다.", "effects": {"reputation": 1}}]}, {"speaker": "연회 손님", "text": "“저쪽에 누가 오시는지 아십니까?” 손님이 묻자 다니엘은 문 쪽을 돌아본다.", "options": [{"text": "잘 모르겠다고 답한다.", "response": "“죄송합니다. 제가 사람을 잘 알아보는 편은 아니라서요.”", "effects": {"resolve": 1}}, {"text": "함께 입구를 살핀다.", "response": "문이 열렸지만 들어온 것은 악보를 든 악사였다.", "effects": {"reputation": 1}}]}, {"speaker": "시종", "text": "시종이 무도회 순서표를 건넨다. 다음 곡이 곧 시작된다고 한다.", "options": [{"text": "순서표를 읽는다.", "response": "다니엘은 춤 이름을 조용히 따라 읽었다. 낯선 곡이 절반이었다.", "effects": {"resolve": 1}}, {"text": "정중히 돌려준다.", "response": "“알려주셔서 감사합니다.” 그는 시종에게 종이를 돌려주었다.", "effects": {"reputation": 1}}]}, {"speaker": "귀족", "text": "한 귀족이 장갑을 벗으며 “춤추기 전엔 손이 차가워서 곤란하군요.” 하고 중얼거린다.", "options": [{"text": "따뜻한 차를 권한다.", "response": "“차를 한 잔 드시는 건 어떻겠습니까?” 귀족은 좋은 생각이라며 웃었다.", "effects": {"resolve": 1}}, {"text": "고개를 끄덕인다.", "response": "“그렇군요.” 다니엘은 적당한 위로를 찾지 못했다.", "effects": {"reputation": 1}}]}, {"speaker": "SYSTEM", "text": "문가에서 작은 웃음소리가 번진다. 누군가 꽃잎을 밟고 미끄러질 뻔했다.", "options": [{"text": "괜찮은지 살핀다.", "response": "“다치시진 않았습니까?” 다니엘의 진지한 표정에 상대는 멋쩍게 웃었다.", "effects": {"resolve": 1}}, {"text": "시종에게 바닥을 알려 준다.", "response": "다니엘은 바닥을 가리키며 조심스레 주의를 부탁했다.", "effects": {"reputation": 1}}]}], "corridor": [{"speaker": "어린 시종", "text": "어린 시종이 방향을 헷갈린 듯 은쟁반을 든 채 서성인다.", "options": [{"text": "길을 함께 찾는다.", "response": "다니엘은 벽의 표지판을 확인한 뒤 목적지까지 안내했다.", "effects": {"resolve": 1}}, {"text": "다른 시종을 불러 준다.", "response": "“잠시만 기다리십시오.” 곧 동료 시종이 다가왔다.", "effects": {"reputation": 1}}]}, {"speaker": "경비병", "text": "“회랑의 촛불은 새벽까지 꺼지지 않습니다.” 경비병이 말한다.", "options": [{"text": "이유를 묻는다.", "response": "“손님들의 안전을 위해서입니다.” 다니엘은 고개를 끄덕였다.", "effects": {"resolve": 1}}, {"text": "수고를 격려한다.", "response": "“밤새 고생이 많으십니다.” 경비병이 허리를 폈다.", "effects": {"reputation": 1}}]}, {"speaker": "SYSTEM", "text": "복도 끝에 놓인 거울이 다니엘의 예복을 비춘다. 익숙하지 않은 모습이다.", "options": [{"text": "옷깃을 정리한다.", "response": "그는 반듯하게 옷깃을 세웠다. 그래도 어딘가 남의 옷을 입은 듯했다.", "effects": {"resolve": 1}}, {"text": "시선을 돌린다.", "response": "다니엘은 거울에서 눈을 떼고 걸음을 재촉했다.", "effects": {"reputation": 1}}]}, {"speaker": "귀족", "text": "길을 잃은 귀족이 “응접실이 어디였더라?” 하고 혼잣말한다.", "options": [{"text": "방향을 알려 준다.", "response": "“저쪽 계단을 지나 왼편입니다.” 다니엘은 기억을 더듬어 답했다.", "effects": {"resolve": 1}}, {"text": "함께 찾아보겠다고 한다.", "response": "“저도 가는 길입니다만…….” 사실은 아니었다.", "effects": {"reputation": 1}}]}, {"speaker": "시종", "text": "시종이 회랑 창가에 놓인 작은 화병을 바꾸고 있다.", "options": [{"text": "꽃 이름을 물어본다.", "response": "“오늘 연회를 위해 들여온 꽃입니다.” 다니엘은 꽃잎을 조용히 바라보았다.", "effects": {"resolve": 1}}, {"text": "작업을 방해하지 않는다.", "response": "그는 시종이 지나갈 수 있도록 벽 쪽으로 물러섰다.", "effects": {"reputation": 1}}]}], "terrace": [{"speaker": "SYSTEM", "text": "바람에 달빛을 가린 구름이 천천히 지나간다. 잠깐 테라스가 어두워진다.", "options": [{"text": "하늘을 올려다본다.", "response": "세 개의 달은 곧 다시 모습을 드러냈다.", "effects": {"resolve": 1}}, {"text": "실내로 돌아갈 채비를 한다.", "response": "다니엘은 손끝에 스민 냉기를 털어 냈다.", "effects": {"reputation": 1}}]}, {"speaker": "귀족", "text": "“이 밤이 끝나지 않았으면 좋겠군요.” 누군가 난간 너머를 보며 말한다.", "options": [{"text": "그 말에 공감한다.", "response": "“……기억에 남을 밤이긴 합니다.” 다니엘은 조심스럽게 답했다.", "effects": {"resolve": 1}}, {"text": "말없이 곁에 선다.", "response": "둘은 잠시 같은 하늘을 바라보았다.", "effects": {"reputation": 1}}]}, {"speaker": "시종", "text": "시종이 바람에 날린 식탁보를 붙잡느라 애를 먹는다.", "options": [{"text": "식탁보를 잡아 준다.", "response": "“여기 잡고 있겠습니다.” 시종은 서둘러 모서리를 고정했다.", "effects": {"resolve": 1}}, {"text": "문을 닫아 바람을 막는다.", "response": "문이 닫히자 천이 더는 심하게 펄럭이지 않았다.", "effects": {"reputation": 1}}]}, {"speaker": "SYSTEM", "text": "난간 아래 정원에서 작은 종소리가 울린다.", "options": [{"text": "소리의 근원을 찾는다.", "response": "정원사가 바람에 흔들리는 풍경을 매만지고 있었다.", "effects": {"resolve": 1}}, {"text": "그대로 음악을 듣는다.", "response": "멀리서 왈츠의 마지막 소절이 흘러나왔다.", "effects": {"reputation": 1}}]}, {"speaker": "경비병", "text": "경비병이 “테라스 계단은 밤이슬 때문에 미끄럽습니다.” 하고 당부한다.", "options": [{"text": "주의하겠다고 한다.", "response": "“알겠습니다. 고맙습니다.” 다니엘은 한 발 물러섰다.", "effects": {"resolve": 1}}, {"text": "표지판이 필요한지 묻는다.", "response": "“이미 준비 중입니다.” 경비병은 친절히 답했다.", "effects": {"reputation": 1}}]}], "drawing": [{"speaker": "시종", "text": "시종이 빈 의자에 놓인 책 한 권을 발견하고 주인을 찾는다.", "options": [{"text": "주변 손님에게 묻는다.", "response": "다니엘의 질문에 한 손님이 책을 두고 왔다며 돌아왔다.", "effects": {"resolve": 1}}, {"text": "시종에게 맡긴다.", "response": "“분실물로 보관해 주시는 편이 좋겠습니다.”", "effects": {"reputation": 1}}]}, {"speaker": "귀족", "text": "“체스는 잘 두십니까?” 한 귀족이 빈 체스판을 가리킨다.", "options": [{"text": "서툴다고 말한다.", "response": "“그리 능숙하지는 않습니다.” 다니엘은 괜히 말을 만지작거렸다.", "effects": {"resolve": 1}}, {"text": "관전하겠다고 한다.", "response": "“제가 방해되지 않는다면…….” 귀족은 흔쾌히 자리를 내주었다.", "effects": {"reputation": 1}}]}, {"speaker": "SYSTEM", "text": "창가에 놓인 보랏빛 커튼이 느리게 흔들린다.", "options": [{"text": "창문을 살핀다.", "response": "창문 틈으로 서늘한 공기가 스며들었다.", "effects": {"resolve": 1}}, {"text": "커튼을 정리한다.", "response": "다니엘은 커튼을 고쳐 걸고 조용히 물러섰다.", "effects": {"reputation": 1}}]}, {"speaker": "귀족 부인", "text": "“요즘은 편지를 쓰는 사람이 드물다지요.” 귀족 부인이 말한다.", "options": [{"text": "편지의 장점을 말한다.", "response": "“기다리는 시간이 있어서 더 뜻깊지 않겠습니까.”", "effects": {"resolve": 1}}, {"text": "말없이 미소 짓는다.", "response": "다니엘은 찻잔을 들고 조용히 고개를 끄덕였다.", "effects": {"reputation": 1}}]}, {"speaker": "시종", "text": "시종이 찻주전자를 바꾸며 “너무 뜨겁지는 않으셨습니까?” 하고 묻는다.", "options": [{"text": "괜찮다고 답한다.", "response": "“예, 적당했습니다. 감사합니다.”", "effects": {"resolve": 1}}, {"text": "조금 식혀 달라고 부탁한다.", "response": "“그…… 조금만 식혀 주실 수 있겠습니까?” 시종은 흔쾌히 응했다.", "effects": {"reputation": 1}}]}], "garden": [{"speaker": "정원사", "text": "정원사가 시든 장미를 가위로 정리하고 있다.", "options": [{"text": "이유를 물어본다.", "response": "“다음 꽃이 잘 피도록 하는 겁니다.” 다니엘은 한동안 그 말을 생각했다.", "effects": {"resolve": 1}}, {"text": "작업을 방해하지 않는다.", "response": "가위 소리가 일정한 간격으로 이어졌다.", "effects": {"reputation": 1}}]}, {"speaker": "SYSTEM", "text": "꽃잎 사이에 작은 물방울이 맺혀 보랏빛 하늘을 비춘다.", "options": [{"text": "가까이에서 살펴본다.", "response": "다니엘은 꽃을 건드리지 않으려 몸을 숙였다.", "effects": {"resolve": 1}}, {"text": "그대로 지나친다.", "response": "젖은 흙냄새가 구두 끝을 따라왔다.", "effects": {"reputation": 1}}]}, {"speaker": "정원사", "text": "“온실 문은 바람이 불면 저절로 닫힙니다.” 정원사가 일러 준다.", "options": [{"text": "문을 잡아 준다.", "response": "다니엘은 뒤따라오는 사람을 확인하고 문을 붙잡았다.", "effects": {"resolve": 1}}, {"text": "주의하겠다고 한다.", "response": "“알겠습니다. 조심하겠습니다.”", "effects": {"reputation": 1}}]}, {"speaker": "시종", "text": "시종이 작은 꽃바구니를 들고 지나간다. “연회장 장식으로 쓰일 꽃입니다.”", "options": [{"text": "꽃을 칭찬한다.", "response": "“정말 아름답군요.” 시종은 수줍게 웃었다.", "effects": {"resolve": 1}}, {"text": "길을 비켜 준다.", "response": "다니엘은 바구니가 스치지 않도록 한쪽으로 물러섰다.", "effects": {"reputation": 1}}]}, {"speaker": "SYSTEM", "text": "정원 끝의 벤치에는 누군가 두고 간 얇은 책갈피가 놓여 있다.", "options": [{"text": "시종에게 전달한다.", "response": "“주인을 찾으시면 돌려주십시오.” 다니엘은 책갈피를 맡겼다.", "effects": {"resolve": 1}}, {"text": "손대지 않는다.", "response": "다니엘은 물건을 그대로 둔 채 발길을 돌렸다.", "effects": {"reputation": 1}}]}]};

const V13_AMBIENT_SCENES={"hall":[{"speaker":"무도회 안내원","text":"안내원이 손님들의 동선을 정리하며 춤 순서를 확인하고 있다.","options":[{"text":"순서를 확인한다.","response":"다니엘은 표를 두 번 읽고 고개를 끄덕였다.","effects":{"resolve":1}},{"text":"길을 비켜 준다.","response":"다른 손님들이 먼저 지나가도록 한 걸음 물러섰다.","effects":{"reputation":1}}]},{"speaker":"시종","text":"시종이 넘칠 듯한 과일 접시를 들고 지나간다.","options":[{"text":"접시를 받쳐 준다.","response":"“위험할 뻔했습니다.” 시종이 감사했다.","effects":{"resolve":1}},{"text":"통로를 비워 준다.","response":"다니엘은 발끝을 모으고 조심히 비켜섰다.","effects":{"reputation":1}}]},{"speaker":"귀족","text":"한 귀족이 오늘의 음악이 낯설다며 고개를 갸웃한다.","options":[{"text":"곡 이름을 함께 살핀다.","response":"둘은 프로그램의 작은 글씨를 한참 들여다보았다.","effects":{"resolve":1}},{"text":"잘 모른다고 답한다.","response":"“죄송합니다. 음악에는 문외한이라서요.”","effects":{"reputation":1}}]},{"speaker":"악사","text":"악사가 떨어뜨린 악보를 찾느라 의자 아래를 살핀다.","options":[{"text":"악보를 주워 준다.","response":"다니엘은 구겨지지 않도록 종이 끝을 조심히 잡았다.","effects":{"resolve":1}},{"text":"주변을 살핀다.","response":"발밑에서 악보 한 장을 발견해 위치를 알려 주었다.","effects":{"reputation":1}}]},{"speaker":"귀족 부인","text":"귀족 부인이 황궁의 꽃 장식에 쓰인 보라색 리본을 칭찬한다.","options":[{"text":"조용히 동의한다.","response":"“……참 잘 어울리는 색입니다.”","effects":{"resolve":1}},{"text":"장식 담당을 칭찬한다.","response":"다니엘은 준비한 사람들의 노고를 떠올렸다.","effects":{"reputation":1}}]},{"speaker":"SYSTEM","text":"음악이 잠시 멎고 연회장에 잔 부딪치는 소리만 남는다.","options":[{"text":"다음 곡을 기다린다.","response":"다니엘은 어색하게 손을 포갰다.","effects":{"resolve":1}},{"text":"잠시 물을 마신다.","response":"차가운 물 한 모금에 긴장이 조금 가셨다.","effects":{"reputation":1}}]}],"corridor":[{"speaker":"경비병","text":"경비병이 방문객에게 조용히 걸어 달라는 안내를 하고 있다.","options":[{"text":"규칙을 확인한다.","response":"“알겠습니다.” 다니엘은 곧장 걸음을 늦췄다.","effects":{"resolve":1}},{"text":"안내를 돕는다.","response":"그는 뒤따르던 손님에게도 조용히 주의를 전했다.","effects":{"reputation":1}}]},{"speaker":"시종","text":"시종이 쏟아진 꽃잎을 빗자루로 모으고 있다.","options":[{"text":"꽃잎을 주워 준다.","response":"손끝에 옅은 꽃향기가 남았다.","effects":{"resolve":1}},{"text":"바닥이 미끄럽지 않은지 묻는다.","response":"시종은 이미 정리 중이라며 고개를 숙였다.","effects":{"reputation":1}}]},{"speaker":"SYSTEM","text":"긴 회랑 끝에서 작은 발소리가 울렸다가 사라진다.","options":[{"text":"발소리를 따라가 본다.","response":"돌아보니 늦게 퇴근하는 시종이었다.","effects":{"resolve":1}},{"text":"그대로 걷는다.","response":"다니엘은 괜한 기대를 접었다.","effects":{"reputation":1}}]},{"speaker":"귀족","text":"낯선 귀족이 창문 너머 세 달의 위치를 묻는다.","options":[{"text":"창가로 안내한다.","response":"“저쪽에서 더 잘 보일 겁니다.”","effects":{"resolve":1}},{"text":"모른다고 솔직히 말한다.","response":"“……천문에는 밝지 않습니다.”","effects":{"reputation":1}}]},{"speaker":"시종","text":"시종이 떨어진 단추 하나를 발견해 주인을 찾고 있다.","options":[{"text":"단추를 살핀다.","response":"다니엘은 자기 소매를 확인한 뒤 고개를 저었다.","effects":{"resolve":1}},{"text":"분실물함을 안내한다.","response":"시종은 단추를 안전하게 보관했다.","effects":{"reputation":1}}]},{"speaker":"SYSTEM","text":"벽에 걸린 오래된 전쟁화 앞에서 다니엘이 잠시 걸음을 멈춘다.","options":[{"text":"그림을 살핀다.","response":"가문이 얻은 명예와 자신이 짊어진 기대가 겹쳐 보였다.","effects":{"resolve":1}},{"text":"고개를 돌린다.","response":"오늘만큼은 다른 생각을 하고 싶었다.","effects":{"reputation":1}}]}],"terrace":[{"speaker":"시종","text":"테라스의 촛대 하나가 바람에 꺼져 시종이 불을 다시 붙인다.","options":[{"text":"바람을 막아 준다.","response":"불꽃이 안정되자 시종이 안도의 숨을 내쉬었다.","effects":{"resolve":1}},{"text":"다른 촛대도 확인한다.","response":"멀리 놓인 촛불은 아직 밝았다.","effects":{"reputation":1}}]},{"speaker":"귀족","text":"한 손님이 밤하늘을 보며 달이 몇 개로 보이는지 농담을 던진다.","options":[{"text":"진지하게 셋이라고 답한다.","response":"손님이 웃자 다니엘은 뒤늦게 농담임을 깨달았다.","effects":{"resolve":1}},{"text":"가볍게 웃는다.","response":"그는 어색하지만 예의 바르게 미소 지었다.","effects":{"reputation":1}}]},{"speaker":"SYSTEM","text":"테라스 난간에 이슬이 맺혀 소매 끝이 차가워진다.","options":[{"text":"손을 거둔다.","response":"다니엘은 소매를 털고 자세를 고쳤다.","effects":{"resolve":1}},{"text":"정원을 내려다본다.","response":"멀리 꽃밭 사이로 등불이 보였다.","effects":{"reputation":1}}]},{"speaker":"경비병","text":"경비병이 난간에 너무 기대지 말아 달라고 부탁한다.","options":[{"text":"즉시 물러선다.","response":"“실례했습니다.” 다니엘은 고개를 숙였다.","effects":{"resolve":1}},{"text":"다른 손님에게도 알린다.","response":"경비병은 짧게 감사를 전했다.","effects":{"reputation":1}}]},{"speaker":"귀족","text":"손님이 테라스에서 들리는 음악이 유난히 부드럽다고 말한다.","options":[{"text":"귀 기울여 듣는다.","response":"현악기의 음이 바람에 실려 왔다.","effects":{"resolve":1}},{"text":"홀로 돌아갈까 고민한다.","response":"다니엘은 잠시 더 머무르기로 했다.","effects":{"reputation":1}}]},{"speaker":"SYSTEM","text":"세 달의 빛이 물 위에서 서로 다른 선을 만든다.","options":[{"text":"빛을 바라본다.","response":"오래도록 기억에 남을 풍경이었다.","effects":{"resolve":1}},{"text":"시계를 확인한다.","response":"시간이 생각보다 빨리 지나고 있었다.","effects":{"reputation":1}}]}],"drawing":[{"speaker":"시종","text":"시종이 식어 버린 차를 새것으로 바꾸어 주겠다고 한다.","options":[{"text":"감사를 전한다.","response":"“신경 써 주셔서 감사합니다.”","effects":{"resolve":1}},{"text":"그대로 두겠다고 한다.","response":"다니엘은 남은 차를 조용히 마셨다.","effects":{"reputation":1}}]},{"speaker":"귀족","text":"귀족이 읽다 만 책의 마지막 장을 찾지 못해 난감해한다.","options":[{"text":"책장을 확인한다.","response":"마지막 장은 책갈피 아래에 접혀 있었다.","effects":{"resolve":1}},{"text":"다른 책을 권한다.","response":"귀족은 새 책을 고르러 일어섰다.","effects":{"reputation":1}}]},{"speaker":"SYSTEM","text":"벽난로 옆 의자가 잠시 비었다.","options":[{"text":"앉아 숨을 고른다.","response":"다니엘은 잠깐 눈을 감았다.","effects":{"resolve":1}},{"text":"서서 기다린다.","response":"그는 어색하게 두 손을 모았다.","effects":{"reputation":1}}]},{"speaker":"귀족 부인","text":"귀족 부인이 향이 강한 차와 연한 차 중 무엇이 좋은지 묻는다.","options":[{"text":"연한 차를 고른다.","response":"“저는…… 연한 쪽이 좋겠습니다.”","effects":{"resolve":1}},{"text":"상대의 취향을 묻는다.","response":"부인은 자신의 차 이야기를 길게 들려주었다.","effects":{"reputation":1}}]},{"speaker":"시종","text":"시종이 떨어진 찻숟가락을 새것으로 교체하고 있다.","options":[{"text":"옆으로 물러선다.","response":"다니엘은 작업을 방해하지 않도록 자리를 비켰다.","effects":{"resolve":1}},{"text":"괜찮은지 묻는다.","response":"“다친 곳은 없습니다.” 시종이 답했다.","effects":{"reputation":1}}]},{"speaker":"SYSTEM","text":"응접실 구석의 작은 체스판이 아직 정리되지 않았다.","options":[{"text":"말을 제자리에 놓는다.","response":"다니엘은 규칙을 더듬으며 말을 가지런히 세웠다.","effects":{"resolve":1}},{"text":"그대로 둔다.","response":"누군가 다시 돌아와 대국을 이어 갈지도 모른다.","effects":{"reputation":1}}]}],"garden":[{"speaker":"정원사","text":"정원사가 물을 준 화분의 이름표를 바꿔 달고 있다.","options":[{"text":"이름을 물어본다.","response":"정원사는 꽃의 이름을 친절히 알려 주었다.","effects":{"resolve":1}},{"text":"방해하지 않는다.","response":"다니엘은 흙이 묻지 않도록 옷자락을 들었다.","effects":{"reputation":1}}]},{"speaker":"SYSTEM","text":"바람에 노란 장미 한 송이가 흔들린다.","options":[{"text":"꽃을 살핀다.","response":"다니엘은 코트리먼 영지의 장미화원을 떠올렸다.","effects":{"resolve":1}},{"text":"걸음을 옮긴다.","response":"향기가 한동안 뒤를 따라왔다.","effects":{"reputation":1}}]},{"speaker":"시종","text":"시종이 정원 길목에 작은 등불을 걸고 있다.","options":[{"text":"등불을 받쳐 준다.","response":"등불이 곧게 걸리자 시종이 웃었다.","effects":{"resolve":1}},{"text":"다른 길을 이용한다.","response":"다니엘은 작업 중인 길을 피해 돌아갔다.","effects":{"reputation":1}}]},{"speaker":"귀족","text":"손님이 정원 길을 잘못 들어 같은 분수를 두 번 봤다고 한다.","options":[{"text":"지도를 함께 본다.","response":"다니엘은 지도에 표시된 분수를 손가락으로 짚었다.","effects":{"resolve":1}},{"text":"자신도 길을 헤맸다고 말한다.","response":"두 사람은 잠시 민망하게 웃었다.","effects":{"reputation":1}}]},{"speaker":"정원사","text":"정원사가 밤에 피는 꽃을 소개하며 조용히 해 달라고 부탁한다.","options":[{"text":"목소리를 낮춘다.","response":"다니엘은 숨소리까지 조심하며 꽃을 살폈다.","effects":{"resolve":1}},{"text":"조용히 자리를 뜬다.","response":"그는 정원사에게 작게 인사했다.","effects":{"reputation":1}}]},{"speaker":"SYSTEM","text":"정원 벤치 위에 접힌 담요가 놓여 있다.","options":[{"text":"시종에게 알려 준다.","response":"시종이 담요를 정리하러 왔다.","effects":{"resolve":1}},{"text":"그대로 지나친다.","response":"밤공기가 생각보다 서늘했다.","effects":{"reputation":1}}]}]};
function ambientScene(loc){
 const ex=exploration();if(!ex.sceneCounts)ex.sceneCounts={};
 const count=ex.sceneCounts[loc]||0;ex.sceneCounts[loc]=count+1;
 const scenes=[...AMBIENT_SCENES[loc],...EXTRA_AMBIENT_SCENES[loc],...V10_AMBIENT_SCENES[loc],...V13_AMBIENT_SCENES[loc]];
 // Cycle through every scene before repeating; first 4 visits retain v8 encounters.
 const scene=scenes[count%scenes.length];
 if(scene.options){
  NODES.explore_ambient={speaker:scene.speaker,text:scene.text,chapter:'CHAPTER 01',choices:scene.options.map((option,i)=>({text:option.text,next:'explore_ambient_reply',effects:option.effects,ambientReply:option.response}))};
 }else NODES.explore_ambient={...scene,chapter:'CHAPTER 01',next:'explore'};
 state.node='explore_ambient';
}

function socialProgress(){if(!state.social||typeof state.social!=='object')state.social={miguelMeetings:0,alexTension:0};return state.social;}
function markMiguelMeeting(){socialProgress().miguelMeetings++;}
function markAlexMeeting(shared=false){const social=socialProgress();social.alexTension=Math.min(100,social.alexTension+(shared?3:1));}
function clueSearch(){
 const ex=exploration();if(ex.turn>=7){state.node='explore_timeout';render();return;}
 const loc=ex.visited[ex.visited.length-1]||'hall';
 const lines=CLUE_LINES[loc]||CLUE_LINES.hall;
 const line=lines[(ex.clueChecks||0)%lines.length];ex.clueChecks=(ex.clueChecks||0)+1;
 ex.turn++;const entry='DAY '+state.day+' · '+CLOCK_LABELS[Math.min(ex.turn-1,7)]+' · '+line;
 ex.clues.push(entry);state.history.push('explore');
 NODES.explore_clue_v14={speaker:'SYSTEM',text:line+'\n\n이것이 미겔의 행방을 가리키는지는 확실하지 않다.',chapter:'CHAPTER 01',next:'explore'};
 state.node='explore_clue_v14';render();
}
function specialDayEvent(loc){
 const ex=exploration();if(!Array.isArray(ex.dayEvents))ex.dayEvents=[];
 const event=DAY_SPECIALS.find(e=>e.day===state.day&&e.place===loc&&!ex.dayEvents.includes(e.day));
 if(!event)return false;
 ex.dayEvents.push(event.day);
 NODES.explore_special_v14={speaker:event.speaker,text:event.text,chapter:'CHAPTER 01',choices:event.options.map(([text,response,effects])=>({text,next:'explore_ambient_reply',effects,ambientReply:response}))};
 state.node='explore_special_v14';return true;
}
function repeatedMiguelEvent(){
 const n=socialProgress().miguelMeetings;
 const text=n===2?'미겔은 다니엘의 소매와 걸음걸이를 잠시 살폈다.\n“레온하르트 경. 오늘도 뵙는군요.”\n다니엘은 괜히 어깨를 바로 세웠다.':n===3?'“……이번에는 먼저 알아보았습니다.”\n미겔의 시선은 그의 얼굴이 아니라 옷깃과 걸음걸이에 머물렀다.\n다니엘은 무슨 말을 해야 할지 몰라 손끝만 만지작거렸다.':'“걸음걸이가 익숙하여 알았습니다, 레온하르트 경.”\n짧은 말이었다. 다니엘은 어쩐지 그 한마디가 오래 남을 것 같았다.';
 NODES.explore_repeat_v14={speaker:'미겔 코트리먼',text,chapter:'CHAPTER 01',choices:[{text:'“기억해 주셔서 감사합니다.”',next:'miguel_conversation',effects:{trust:2}},{text:'“……실례가 되었다면 죄송합니다.”',next:'miguel_conversation',effects:{resolve:1}},{text:'“우연히 자주 마주치는군요.”',next:'miguel_conversation',effects:{affection:1,risk:1}}]};
 state.node='explore_repeat_v14';
}
// v15: three-stage original NPC quest; independent of third-party characters.
const QUEST_SCENES={
 hall:{speaker:'악단 보조',text:'악단 보조가 빈 악보함을 붙잡고 어쩔 줄 몰라 한다. “첫 곡의 악보가 사라졌습니다. 회랑으로 옮기는 중에 떨어뜨린 것 같습니다.”',choices:[{text:'“제가 회랑을 살펴보겠습니다.”',next:'explore_ambient_reply',questStep:1,ambientReply:'다니엘은 지나치게 진지하게 고개를 끄덕였다. 작은 부탁이라도 허투루 넘길 수 없었다.',effects:{resolve:1}},{text:'“다른 분께도 알려 두시는 편이 좋겠습니다.”',next:'explore_ambient_reply',questStep:1,ambientReply:'악단 보조가 고개를 끄덕였다. 다니엘은 회랑을 살펴보기로 했다.',effects:{reputation:1}}]},
 corridor:{speaker:'어린 시종',text:'회랑의 어린 시종이 구겨진 악보를 들고 있다. “이게 연회장에서 온 것일까요? 악보 모서리에 보랏빛 잉크가 묻어 있어요.”',choices:[{text:'악보를 조심히 받아 확인한다.',next:'explore_ambient_reply',questStep:2,ambientReply:'악보 첫 장에 악단의 문장이 있었다. 다니엘은 훼손되지 않게 종이를 폈다.',effects:{resolve:1}},{text:'함께 악단에 돌려주자고 제안한다.',next:'explore_ambient_reply',questStep:2,ambientReply:'“도와주셔서 감사합니다.” 시종은 밝은 표정으로 악보를 건넸다.',effects:{reputation:1}}]},
 drawing:{speaker:'악단 보조',text:'응접실 문가에서 악단 보조가 다니엘을 알아본다. “그 악보를 찾으셨습니까? 연주가 곧 시작됩니다.”',choices:[{text:'찾은 악보를 돌려준다.',next:'explore_ambient_reply',questStep:3,ambientReply:'“덕분에 연주를 이어 갈 수 있겠습니다.” 다니엘은 별일 아니라며 손을 내저었다.',effects:{trust:1,reputation:2}},{text:'종이 상태부터 설명한다.',next:'explore_ambient_reply',questStep:3,ambientReply:'“모서리가 조금 구겨졌습니다. ……죄송합니다.” 보조는 웃으며 괜찮다고 했다.',effects:{resolve:2}}]}
};
function questProgress(){const ex=exploration();if(!ex.questV15||typeof ex.questV15!=='object')ex.questV15={step:0,done:false};return ex.questV15;}
function questEvent(loc){const q=questProgress();const needed=['hall','corridor','drawing'][q.step];if(q.done||loc!==needed)return false;const scene=QUEST_SCENES[loc];NODES.explore_quest_v15={...scene,chapter:'CHAPTER 01'};state.node='explore_quest_v15';return true;}
// Clues are hints, not guarantees: NPC sightings can be outdated.
function inferenceV15(){const ex=exploration();const turn=Math.min(ex.turn,6);const schedule=scheduleFor(NIGHT_SCHEDULES,state.day);const hints=[{place:schedule[Math.min(turn+1,6)],confidence:'예상 동선'},{place:schedule[turn],confidence:'현재 시간대 추정'}];const location=id=>LOCATIONS.find(x=>x.id===id)?.name||id;const lines=hints.map(h=>h.confidence+': '+location(h.place));modal('미겔 동선 추리 · DAY '+state.day,'수집한 소문을 바탕으로 한 추정입니다. 실제 방문 시각에 따라 어긋날 수 있습니다.\n\n'+lines.join('\n')+'\n\n단서 '+(ex.clues||[]).length+'건 · 이동 '+ex.turn+'/7');}
function recordGallery(id){if(!Array.isArray(state.unlockedV15))state.unlockedV15=[];if(!state.unlockedV15.includes(id))state.unlockedV15.push(id);}
function sharedEncounterV15(){recordGallery('alex_miguel');NODES.alex_miguel={speaker:'SYSTEM',text:'미겔의 곁에 알렉이 서 있었다. 그녀가 낮게 “알렉.” 하고 부르는 소리에 다니엘의 발이 멈췄다.\n형의 약혼자다. 그 사실을 모르고 있던 것도 아닌데, 가슴이 불편했다.\n……그저 인사를 드리면 될 일이다.',chapter:'CHAPTER 01',choices:[{text:'두 사람에게 예를 갖춰 인사한다.',next:'alex_miguel_greet',effects:{reputation:2,trust:1}},{text:'질투를 인정하지 않고 조용히 물러난다.',next:'alex_miguel_leave',effects:{resolve:2}},{text:'“……죄송합니다.” 무심코 사과한다.',next:'alex_miguel_flee',effects:{risk:2,resolve:1}}]};}

// v16: day-persistent branching quests and seeded daily routes (game adaptation).
const V16_QUESTS=[
 {id:'ribbon',title:'잃어버린 보랏빛 리본',steps:[
  {loc:'terrace',speaker:'시종',text:'“장식용 리본 한 꾸러미가 사라졌습니다. 바람에 날린 모양입니다.”'},
  {loc:'garden',speaker:'정원사',text:'“울타리에 걸린 리본이 있더군요. 가져가시겠습니까?”'},
  {loc:'terrace',speaker:'시종',text:'“찾아주셨군요! 정말 감사합니다.”'}]},
 {id:'tea',title:'식어 버린 찻잔',steps:[
  {loc:'drawing',speaker:'시종',text:'“응접실에 올릴 찻잎을 잘못 가져왔습니다. 누군가 회랑의 보관함을 확인해 주시면 좋겠는데요.”'},
  {loc:'corridor',speaker:'SYSTEM',text:'다니엘은 보관함에서 향이 옅은 찻잎 봉투를 찾았다.'},
  {loc:'drawing',speaker:'시종',text:'“덕분에 손님들께 차를 제때 올렸습니다.”'}]},
 {id:'music',title:'뒤바뀐 악단의 순서표',steps:[
  {loc:'hall',speaker:'악사',text:'“오늘 연주 순서가 뒤바뀌었어요. 응접실에 원본이 있을 텐데……”'},
  {loc:'drawing',speaker:'SYSTEM',text:'다니엘은 테이블 아래로 미끄러진 순서표를 발견했다.'},
  {loc:'hall',speaker:'악사',text:'“이제야 연주를 시작할 수 있겠군요!”'}]}
];
function v16Data(){
 if(!state.v16||typeof state.v16!=='object')state.v16={quests:{},routeDays:{},memories:[],meetingTier:0};
 const d=state.v16;d.quests ||= {};d.routeDays ||= {};d.memories ||= [];
 return d;
}
function v16Hash(day,slot,salt){let n=(day*1103515245+slot*12347+salt*7919)>>>0;n^=n>>>13;n=Math.imul(n,1274126177)>>>0;return (n^(n>>>16))>>>0;}
function v16Route(day){
 const data=v16Data();
 if(!data.routeDays[day]){
  const base=scheduleFor(NIGHT_SCHEDULES,day), places=LOCATIONS.map(x=>x.id);
  data.routeDays[day]=base.map((loc,slot)=>{
   const roll=v16Hash(day,slot,23)%100;
   return roll<28?places[v16Hash(day,slot,31)%places.length]:loc;
  });
 }
 return data.routeDays[day];
}
// v17: original text-only atmosphere and Daniel's introspection.
const V17_ATMOSPHERE={
 hall:['촛대에 불이 하나둘 붙었다. 음악이 시작되기도 전에, 사람들의 웃음이 높은 천장에 부딪혀 흩어졌다.','밤이 깊어질수록 춤곡은 느려졌다. 다니엘은 지나가는 사람들의 얼굴을 살피다가 황급히 시선을 거두었다.'],
 corridor:['대리석 바닥에 세 달의 빛이 길게 드리웠다. 발소리가 지나치게 크게 울려 다니엘은 걸음을 늦췄다.','회랑 끝 창문에 희미한 보랏빛이 걸려 있었다. 밤이 끝나지 않는다는 말이 문득 실감 났다.'],
 terrace:['테라스의 난간이 차가웠다. 아직 완전히 어두워지지 않은 하늘 아래, 먼 정원이 잠겨 있었다.','연회장의 음악이 문틈으로 새어 나왔다. 다니엘은 차마 돌아서지 못한 채 한참 밤하늘을 보았다.'],
 drawing:['응접실의 차 향은 은은했다. 정돈된 찻잔 사이로 누군가 놓고 간 책갈피가 보였다.','시종이 불을 낮추자 방 안의 금박 장식이 부드럽게 빛났다. 아무도 서두르지 않는 시간이었다.'],
 garden:['장미 잎에 맺힌 이슬이 보랏빛 달빛을 받았다. 다니엘은 꽃을 건드리지 않으려 소매를 거두었다.','정원 깊숙한 곳에서는 흙과 잎의 냄새가 났다. 노란 장미를 보고 그는 코트리먼 영지를 떠올렸다.']
};
const V17_THOUGHTS=[
 '형의 약혼자를 찾고 있다. 그렇게 생각하는 것만으로도 다니엘은 목덜미가 뜨거워졌다. ……그저 예의를 갖추려는 것뿐인데.',
 '어디를 가든 누군가에게 도움이 되어야 한다는 생각부터 들었다. 그래야 이곳에 있어도 괜찮을 것 같았다.',
 '누군가를 기다리는 일과 누군가를 찾아다니는 일은 다를까. 그는 답을 알면서도 모른 척했다.',
 '무례하게 보였을까. 다니엘은 조금 전 자신의 말을 머릿속으로 다시 읽었다. 읽을수록 더 어색해졌다.',
 '미겔은 그를 알아볼까. 옷이 달라져도 발걸음은 기억한다는 말을, 그는 이상하게 오래 떠올렸다.'
];
function v17Data(){
 if(!state.v17||typeof state.v17!=='object')state.v17={questEndings:{},bondSeen:{},thoughtIndex:0};
 state.v17.questEndings ||= {};state.v17.bondSeen ||= {};return state.v17;
}
function v17Atmosphere(loc,turn){const lines=V17_ATMOSPHERE[loc]||V17_ATMOSPHERE.hall;return lines[(state.day+turn)%lines.length];}
function v17Thought(){const d=v17Data(),i=d.thoughtIndex++;const thought=V17_THOUGHTS[i%V17_THOUGHTS.length];
 NODES.explore_v17_thought={speaker:'다니엘 레온하르트',text:thought+'\n\n'+v18FeelingLine(),chapter:'CHAPTER 01',next:'explore'};
 state.node='explore_v17_thought';render();}
function v17BondScene(){
 const stats=state.stats,d=v17Data(),meeting=socialProgress().miguelMeetings;
 const tier=stats.trust>=12&&stats.affection>=8?'조심스러운 신뢰':stats.trust>=7?'작은 배려':stats.affection>=6?'뜻밖의 관심':null;
 if(!tier||d.bondSeen[tier]||meeting<2)return false;
 d.bondSeen[tier]=true;
 const text=tier==='조심스러운 신뢰'?'미겔은 그의 발걸음이 멎는 소리를 듣고 고개를 돌렸다. “레온하르트 경. ……오늘은 무슨 일로 오셨습니까?” 다니엘은 그 질문이 자신을 기다렸다는 뜻일 리 없다고 생각했다.':tier==='작은 배려'?'“무리하실 필요는 없습니다.” 미겔이 짧게 말했다. 다니엘은 그 말이 누구에게 향한 것인지 한 박자 늦게 깨달았다.':'미겔이 그의 소매 끝을 잠시 바라보았다. “오늘은 평소와 다른 차림이시군요.” 다니엘은 어떻게 대답해야 할지 몰라 옷깃부터 만졌다.';
 NODES.explore_v17_bond={speaker:'미겔 코트리먼',text,chapter:'CHAPTER 01',choices:[
 {text:'“……염려해 주셔서 감사합니다.”',next:'explore',effects:{trust:2}},
 {text:'“불편을 드렸다면 죄송합니다.”',next:'explore',effects:{resolve:1}},
 {text:'“다음에도 인사를 드려도 되겠습니까?”',next:'explore',effects:{affection:2,risk:1}}]};
 v16Data().memories.push({id:'v17_bond_'+tier,title:'관계 · '+tier,text,day:state.day,category:'관계'});
 state.node='explore_v17_bond';return true;
}
function v17QuestEnding(id,mode){
 const q=V16_QUESTS.find(x=>x.id===id);if(!q)return;
 const d=v17Data(),kind=mode==='finish_help'?'친절한 약속':'조용한 마무리';d.questEndings[id]=kind;
 const text=mode==='finish_help'?'다니엘은 다음에도 도움이 필요하면 불러 달라고 했다. 시종은 몇 번이나 감사했다. 그는 작은 일에도 이렇게 마음이 놓이는 자신이 조금 우스웠다.':'다니엘은 별일 아니라며 고개를 숙였다. 다른 이들의 칭찬을 오래 받는 일은 여전히 익숙하지 않았다.';
 v16Data().memories.push({id:'v17_quest_'+id,title:q.title+' · '+kind,text,day:state.day,category:'의뢰'});
 NODES.explore_v17_ending={speaker:'SYSTEM',text,chapter:'CHAPTER 01',next:'explore'};
}
function v16QuestEvent(loc){
 const data=v16Data();
 for(const q of V16_QUESTS){
  const progress=data.quests[q.id]||{step:0,choice:null,done:false};
  if(progress.done)continue;
  const stage=q.steps[progress.step];
  if(stage?.loc!==loc)continue;
  data.quests[q.id]=progress;
  const final=progress.step===2;
  NODES.explore_v16_quest={speaker:stage.speaker,text:stage.text,chapter:'CHAPTER 01',
   choices:final?[
    {text:'조용히 인사하고 돌아선다.',next:'explore',effects:{reputation:2},v16Quest:q.id,v16Mode:'finish',v17Ending:'quiet'},
    {text:'다음에도 도움이 필요하면 말씀해 주십시오.',next:'explore',effects:{trust:1,reputation:1},v16Quest:q.id,v16Mode:'finish',v17Ending:'help'}
   ]:[
    {text:'도움을 드리겠습니다.',next:'explore',effects:{resolve:1},v16Quest:q.id,v16Mode:'advance'},
    {text:'지금은 어려울 것 같습니다.',next:'explore',v16Quest:q.id,v16Mode:'decline'}
   ]};
  state.node='explore_v16_quest';return true;
 }
 return false;
}
function v16RelationshipEvent(){
 const s=socialProgress(),d=v16Data();
 const tier=s.miguelMeetings>=6?'익숙한 발걸음':s.miguelMeetings>=3?'기억에 남는 손님':'낯선 인사';
 if(d.meetingTier===tier)return false;
 d.meetingTier=tier;
 const words=tier==='익숙한 발걸음'?'“레온하르트 경. 발소리만으로도 알 수 있었습니다.”\n다니엘은 대답을 고르다 시선을 내렸다.':tier==='기억에 남는 손님'?'“또 뵙는군요.”\n미겔은 그의 옷깃을 바라보았다. 다니엘은 손끝을 움켜쥐었다.':'미겔이 고개를 끄덕였다. “레온하르트 경.”';
 NODES.explore_v16_bond={speaker:'미겔 코트리먼',text:words,chapter:'CHAPTER 01',choices:[
  {text:'“……기억해 주셔서 감사합니다.”',next:'explore',effects:{trust:2,affection:1}},
  {text:'“우연입니다. 정말로요.”',next:'explore',effects:{resolve:1,risk:1}}
 ]};
 d.memories.push({id:'bond_'+s.miguelMeetings,title:'미겔 · '+tier,text:words,day:state.day});
 state.node='explore_v16_bond';return true;
}
function v16AlexTension(){
 const tension=socialProgress().alexTension;
 if(tension<4)return;
 const msg=tension>=12?'형과 마주치는 순간, 다니엘은 본능적으로 시선을 피했다.':'다니엘은 형에게 예를 갖췄다. 이상하게도 손끝이 굳었다.';
 NODES.explore_v16_alex={speaker:'SYSTEM',text:msg,chapter:'CHAPTER 01',choices:[
  {text:'형에게 정중하게 인사한다.',next:'explore',effects:{reputation:2,resolve:1}},
  {text:'“……죄송합니다.”',next:'explore',effects:{risk:1}}
 ]};
 v16Data().memories.push({id:'alex_'+state.day+'_'+state.exploration.turn,title:'알렉과의 거리',text:msg,day:state.day});
 state.node='explore_v16_alex';
}
function v16QuestBoard(){
 const data=v16Data();
 modal('황궁 의뢰 수첩',V16_QUESTS.map(q=>{
  const x=data.quests[q.id]||{step:0,done:false};
  return q.title+' · '+(x.done?'완료':x.choice==='decline'?'보류':(x.step+1)+'/3 단계')+'\n'+(x.done?'도움을 마쳤습니다.':'다음 장소: '+(LOCATIONS.find(l=>l.id===q.steps[x.step]?.loc)?.name||'—'));
 }).join('\n\n'));
}


// v18: persistent appointments, time-of-night NPCs, and day-spanning original incidents.
const V18_NPCS={
 hall:[['악단 보조','악단 보조가 낡은 악보철을 정리하고 있다. “아직도 박자를 맞추는 게 어렵습니다.”'],['무도회 안내원','안내원이 손님들의 이름을 다시 확인하고 있다. “마지막 곡까지 자리를 지켜야 해서요.”'],['시종','시종이 비어 있는 잔을 수거한다. 홀에는 조금씩 피로한 웃음이 번진다.']],
 corridor:[['견습 시종','어린 시종이 무거운 쟁반을 붙잡고 서 있다. “아까부터 손이 떨려서……”'],['경비병','경비병이 교대 시간을 확인하며 벽의 촛불을 살핀다.'],['야간 경비병','야간 경비병이 회랑 끝 문을 조용히 잠근다.']],
 terrace:[['화분 담당 시종','화분 담당 시종이 바람에 쓰러진 작은 화분을 일으킨다.'],['손님','손님이 난간에 기대 세 개의 달을 바라본다.'],['야간 시종','야간 시종이 테라스의 담요를 정리하고 있다.']],
 drawing:[['차 담당 시종','시종이 차의 온도를 살피며 새 주전자를 준비한다.'],['귀족 손님','한 손님이 반쯤 읽은 시집을 조심스럽게 덮는다.'],['정리 담당 시종','정리 담당 시종이 손님들이 두고 간 책을 모은다.']],
 garden:[['정원사','정원사가 장미의 잎을 하나씩 살피고 있다.'],['꽃 장식 시종','시종이 연회장으로 옮길 꽃다발을 묶는다.'],['야간 정원사','정원사가 이슬에 젖은 길을 살피며 등불을 옮긴다.']]
};
const V18_SERIAL=[
 {title:'분실된 은색 책갈피',start:'응접실 책상 아래에 은색 책갈피 하나가 떨어져 있었다. 다니엘은 주인을 찾아주는 편이 옳겠다고 생각했다.',middle:'회랑의 시종이 책갈피를 알아보았다. “어제 손님 한 분이 찾고 계셨습니다.”',end:'응접실에 돌아온 다니엘은 책갈피를 분실물 담당 시종에게 건넸다. 주인을 찾을 수 있을 것이다.'},
 {title:'정원에 남겨진 화분',start:'정원 한편에 쓰러진 화분이 있었다. 흙은 쏟아졌지만 꽃은 아직 살아 있었다.',middle:'테라스의 시종이 빈 화분 받침을 찾고 있었다. 다니엘은 정원의 일을 조심스럽게 설명했다.',end:'정원사는 제자리를 찾은 화분을 보며 고개를 숙였다. “덕분에 꽃을 살렸습니다.”'}
];
function v18Data(){
 if(!state.v18||typeof state.v18!=='object')state.v18={promise:null,serial:{},npcSeen:{},emotion:0};
 const d=state.v18;d.serial||={};d.npcSeen||={};d.emotion ||= 0;return d;
}
function v18Remember(id,title,text,category='기타'){
 const memories=v16Data().memories;
 if(!memories.some(m=>m.id===id))memories.push({id,title,text,day:state.day,category});
}
function v18Scene(id,speaker,text,choices){
 NODES.explore_v18_event={speaker,text,chapter:'CHAPTER 01',choices};
 state.node='explore_v18_event';return true;
}
function v18PromiseEncounter(loc,turn){
 const d=v18Data(),promise=d.promise;
 if(!promise||promise.status!=='accepted'||promise.day!==state.day||promise.loc!==loc||promise.turn!==turn)return false;
 promise.status='met';
 const text=(promise.loc==='terrace'?'테라스의 난간 너머로 보랏빛 하늘이 펼쳐져 있었다.':promise.loc==='drawing'?'응접실에는 찻잔을 내려놓는 소리가 잔잔하게 울렸다.':'장미 정원에는 꽃잎을 흔드는 바람이 지나갔다.')+' 미겔은 그의 발소리가 가까워지자 고개를 돌렸다.\n\n“레온하르트 경. 오셨군요.”\n\n다니엘은 인사를 하려다 손끝을 움켜쥐었다. 약속한 것은 분명 자신인데, 그녀가 이곳에 있다는 사실이 믿기지 않았다.';
 v18Remember('promise_'+state.day,'미겔 · 지켜진 약속',text,'관계');
 markMiguelMeeting();
 return v18Scene('promise','미겔 코트리먼',text,[
 {text:'“……기다리게 해 드렸습니까?”',next:'explore',effects:{trust:2,affection:1},v18Emotion:1},
 {text:'“약속을 지키고 싶었습니다.”',next:'explore',effects:{trust:1,affection:2,risk:1},v18Emotion:2},
 {text:'“형님께서도 이곳에 오십니까?”',next:'explore',effects:{resolve:1},v18Emotion:-1}
 ]);
}
function v18OfferPromise(){
 const d=v18Data(),s=socialProgress();
 if(s.miguelMeetings<2||state.day<2||d.promise)return false;
 const tomorrow=state.day+1;
 return v18Scene('offer','미겔 코트리먼',
 '미겔은 조용히 창밖을 보았다. “내일도 이 시간쯤 황궁에 계십니까?”\n\n다니엘은 대답을 서두르다 입을 다물었다. 아무런 뜻이 없는 물음일 수도 있었다.\n\n“저는 내일 저녁, 테라스에 잠시 들를 예정입니다.”',[
 {text:'“……괜찮으시다면 저도 잠시 들르겠습니다.”',next:'explore',effects:{trust:1},v18Promise:'accept',v18Emotion:1},
 {text:'“형님께 실례가 되지 않을까요?”',next:'explore',effects:{resolve:1},v18Promise:'decline',v18Emotion:-1}
 ]);
}
function v18CheckMissedPromise(){
 const d=v18Data(),p=d.promise;
 if(!p||p.status!=='accepted')return;
 if(state.day>p.day||(state.day===p.day&&exploration().turn>p.turn)){
 p.status='missed';
 v18Remember('promise_missed_'+p.day,'미겔 · 지키지 못한 약속','다니엘은 뒤늦게 테라스 쪽을 바라보았다. 약속한 시간은 이미 지나 있었다.','관계');
 }
}
function v18SerialEvent(loc){
 const d=v18Data();
 for(let i=0;i<V18_SERIAL.length;i++){
  const q=V18_SERIAL[i],prog=d.serial[i]||{stage:0,startDay:0,done:false};
  if(prog.done)continue;
  const places=i===0?['drawing','corridor','drawing']:['garden','terrace','garden'];
  if(places[prog.stage]!==loc)continue;
  if(prog.stage>0&&state.day<=prog.startDay+prog.stage-1)continue;
  d.serial[i]=prog;
  const text=[q.start,q.middle,q.end][prog.stage];
  const final=prog.stage===2;
  return v18Scene('serial','SYSTEM',text,final?[
   {text:'조용히 일을 마무리한다.',next:'explore',effects:{reputation:2},v18Serial:i,v18Mode:'finish'},
   {text:'“다음에도 도움이 필요하면 말씀해 주십시오.”',next:'explore',effects:{resolve:1,reputation:1},v18Serial:i,v18Mode:'finish_help'}
  ]:[
   {text:'일을 맡아 진행한다.',next:'explore',effects:{resolve:1},v18Serial:i,v18Mode:'advance'},
   {text:'지금은 다른 일을 먼저 살핀다.',next:'explore'}
  ]);
 }
 return false;
}
function v18NpcEvent(loc,turn){
 const d=v18Data(),slot=turn<2?0:turn<5?1:2;
 const [speaker,text]=(V18_NPCS[loc]||V18_NPCS.hall)[slot];
 const key=state.day+'_'+loc+'_'+slot;
 if(d.npcSeen[key])return false;
 d.npcSeen[key]=true;
 return v18Scene('npc',speaker,text+'\n\n다니엘은 괜히 서두르지 않으려 발을 멈췄다.',[
  {text:'정중하게 말을 건넨다.',next:'explore',effects:{reputation:1},v18Emotion:1},
  {text:'상대의 일을 방해하지 않고 지나간다.',next:'explore',effects:{resolve:1},v18Emotion:-1}
 ]);
}
function v18FeelingLine(){
 const e=v18Data().emotion;
 if(e>=3)return '……한 번쯤은 제 마음을 인정해도 되는 걸까요. 아니, 그럴 수는 없습니다.';
 if(e<=-2)return '……쓸데없는 생각을 하고 있습니다. 형님께 실례가 될 뿐입니다.';
 return '……저는 그저 인사를 드리려는 것뿐입니다. 다른 뜻은 없습니다.';
}
function v18Board(){const d=v18Data(),p=d.promise;
 const promise=p?('미겔과의 약속: '+({accepted:'예정',met:'완료',missed:'시간을 놓침',declined:'정중히 사양'}[p.status]||p.status)+(p.status==='accepted'?' · DAY '+p.day+' 20:30 · 달빛 테라스':'')):'미겔과의 약속: 아직 없음';
 const lines=V18_SERIAL.map((q,i)=>{const x=d.serial[i]||{stage:0,done:false};return q.title+' · '+(x.done?'완료':x.stage===0?'시작 전':x.stage+'/3 진행')});
 modal('황궁의 작은 기록',promise+'\n\n'+lines.join('\n')+'\n\n다니엘의 마음: '+v18FeelingLine());
}

// v19: self-contained, backwards-compatible social continuity and rumor system.
const V19_NPC_PROFILES={
 hall:{name:'악단 보조',intro:'악보를 고쳐 쥔 악단 보조가 다니엘을 알아보았다.',warm:'“지난번 말씀 덕분에 악보를 다시 살폈습니다. 오늘은 실수하지 않을 것 같습니다.”'},
 corridor:{name:'견습 시종',intro:'쟁반을 들고 가던 견습 시종이 멈칫했다.',warm:'“경께서 도와주셨던 일, 아직 기억하고 있습니다.”'},
 terrace:{name:'화분 담당 시종',intro:'난간 옆의 화분을 정리하던 시종이 고개를 숙였다.',warm:'“그날 화분을 살펴주신 덕분에 꽃이 무사합니다.”'},
 drawing:{name:'차 담당 시종',intro:'찻잔을 정리하던 시종이 정중하게 인사했다.',warm:'“지난번에 말씀하신 차를 준비해 두었습니다.”'},
 garden:{name:'정원사',intro:'장미 덤불 사이의 정원사가 장갑을 벗었다.',warm:'“지난번에도 이 길을 지나셨지요. 오늘은 꽃이 조금 더 피었습니다.”'}
};
const V19_RUMORS=[
 {id:'roses',loc:'garden',text:'정원사가 낮은 목소리로 말했다. “노란 장미를 찾는 손님이 계셨다더군요.” 누구를 가리키는지는 확인되지 않았다.',reply:'다니엘은 성급히 짐작하지 않기로 했다. 꽃을 찾는 사람이 반드시 미겔일 리는 없었다.'},
 {id:'terrace',loc:'terrace',text:'시종들이 테라스에 손님을 기다리게 했다는 소문을 나눴다. 이름은 누구도 말하지 않았다.',reply:'약속을 떠올린 다니엘은 공연히 손가락을 움켜쥐었다.'},
 {id:'brothers',loc:'corridor',text:'회랑을 지나던 손님 둘이 레온하르트 형제에 관해 수군거렸다. 자세한 내용은 알아들을 수 없었다.',reply:'다니엘은 제 이름이 들린 것만으로도 걸음을 늦췄다.'},
 {id:'music',loc:'hall',text:'악단의 연주 순서가 바뀌었다는 말이 연회장에 퍼졌다. 소문을 전한 사람마다 이유가 달랐다.',reply:'확인하지 않은 말을 전하는 일은 삼가야 한다고 생각했다.'},
 {id:'tea',loc:'drawing',text:'응접실에서 누군가 차를 남기고 급히 떠났다는 소문이 돌았다. 사정은 아무도 알지 못했다.',reply:'다니엘은 누군가의 사정을 함부로 추측하지 않기로 했다.'}
];
function v19Data(){
 if(!state.v19||typeof state.v19!=='object')state.v19={npc:{},rumors:[],promiseAfter:null,feelings:0,seen:{}};
 const d=state.v19;d.npc||={};d.rumors||=[];d.seen||={};if(!Number.isFinite(d.feelings))d.feelings=0;return d;
}
function v19Record(id,title,text,category='기타'){
 v18Remember('v19_'+id,title,text,category);
}
function v19Mood(){
 const d=v19Data(),e=v18Data().emotion,t=socialProgress().alexTension;
 if(t>=7)return '형님의 이름이 들릴 때마다 다니엘은 자신도 모르게 어깨를 움츠렸다. 이 마음을 감춘다는 것과 아무렇지 않게 행동하는 것은 전혀 다른 일이었다.';
 if(e+d.feelings>=4)return '그녀에게 건넬 말을 몇 번이고 고르다가, 다니엘은 문득 자신이 무엇을 기대하는지 깨닫고 얼굴을 붉혔다.';
 if(e+d.feelings<=-3)return '다니엘은 가문의 체면을 먼저 떠올렸다. 그러면서도 자신이 애써 외면하는 것이 무엇인지 알고 있었다.';
 return '다니엘은 자신의 옷깃을 매만졌다. 인사 한마디를 위해 이토록 마음이 쓰이는 것이 이상했다.';
}
function v19PromiseFollowup(loc){
 const p=v18Data().promise,d=v19Data();
 if(!p||!['met','missed'].includes(p.status)||state.day<=p.day||d.promiseAfter===p.status)return false;
 if(loc!=='terrace'&&loc!=='drawing')return false;
 const missed=p.status==='missed';d.promiseAfter=p.status;
 const text=missed?
 '테라스에서 미겔과 마주친 다니엘은 걸음을 멈췄다. 약속한 시간을 지키지 못한 일이 마음에 걸렸다.\n\n“그날은 뵙지 못했습니다, 레온하르트 경.”\n\n미겔은 이유를 묻거나 탓하지 않았다. 다니엘은 그 담담한 말에 더 깊이 고개를 숙였다.':
 '응접실 문 앞에서 미겔과 다시 마주쳤다.\n\n“지난번 테라스에서는 무사히 돌아가셨습니까?”\n\n짧은 안부였지만 다니엘은 잠시 말을 잇지 못했다. 그녀가 약속을 기억하고 있었다.';
 v19Record('promise_'+p.status+'_'+p.day,missed?'지키지 못한 약속 · 재회':'지킨 약속 · 그 후',text,'관계');
 return v18Scene('v19promise','미겔 코트리먼',text,missed?[
  {text:'“죄송합니다. 기다리시게 했습니다.”',next:'explore',effects:{trust:2,resolve:1},v19Feeling:-1},
  {text:'“변명처럼 들리겠지만, 사정이 있었습니다.”',next:'explore',effects:{trust:1},v19Feeling:1},
  {text:'“다시 인사드릴 기회를 주시겠습니까?”',next:'explore',effects:{affection:1,risk:1},v19Feeling:2}
 ]:[
  {text:'“덕분에 편안한 밤이었습니다.”',next:'explore',effects:{trust:2,affection:1},v19Feeling:2},
  {text:'“……형님께도 안부를 전하겠습니다.”',next:'explore',effects:{resolve:1},v19Feeling:-1}
 ]);
}
function v19NpcEncounter(loc){
 const d=v19Data(),profile=V19_NPC_PROFILES[loc];if(!profile)return false;
 const x=d.npc[loc]||{meetings:0,rapport:0};
 if(x.meetings>=4)return false;
 // One repeat NPC interaction per place and day; persists across saves.
 const key=state.day+'_'+loc;
 if(d.seen['npc_'+key])return false;
 d.seen['npc_'+key]=true;x.meetings++;d.npc[loc]=x;
 const text=profile.intro+'\n\n'+(x.rapport>=2?profile.warm:x.meetings>1?'“또 뵙는군요, 경. 오늘 연회는 평안하십니까?”':'“도움이 필요하신 것은 아니시지요?”')+'\n\n'+v19Mood();
 return v18Scene('v19npc',profile.name,text,[
  {text:'상대의 이야기를 끝까지 들어준다.',next:'explore',effects:{reputation:1},v19Npc:loc,v19Rapport:1,v19Feeling:1},
  {text:'바쁜 일을 방해하지 않도록 인사만 한다.',next:'explore',effects:{resolve:1},v19Npc:loc,v19Rapport:0,v19Feeling:-1}
 ]);
}
function v19RumorEncounter(loc){
 const d=v19Data(),item=V19_RUMORS.find(r=>r.loc===loc);if(!item)return false;
 if(d.rumors.some(r=>r.id===item.id&&r.day===state.day))return false;
 d.rumors.push({id:item.id,day:state.day,loc,verified:false});
 const text=item.text+'\n\n'+v19Mood();
 v19Record('rumor_'+item.id+'_'+state.day,'황궁 소문 · '+LOCATIONS.find(l=>l.id===loc).name,text,'기타');
 return v18Scene('v19rumor','SYSTEM',text,[
  {text:'사실을 확인하기 전까지 마음에만 담아둔다.',next:'explore',effects:{resolve:1},v19Feeling:-1},
  {text:'조심스럽게 사정을 물어본다.',next:'explore',effects:{reputation:1},v19Rumor:item.id,v19Feeling:1}
 ]);
}
function v19Board(){
 const d=v19Data(),lines=Object.entries(V19_NPC_PROFILES).map(([loc,p])=>{const x=d.npc[loc]||{};return p.name+' · 조우 '+(x.meetings||0)+'회 · 친밀 '+(x.rapport||0)});
 const rumors=d.rumors.map(r=>{const item=V19_RUMORS.find(x=>x.id===r.id);return 'DAY '+r.day+' · '+(item?item.text.split(' ')[0]:'소문')+' · '+(r.verified?'확인 시도':'미확인')});
 modal('황궁 인연과 소문',lines.join('\n')+'\n\n[들어본 소문]\n'+(rumors.join('\n')||'아직 들은 소문이 없습니다.')+'\n\n※ 소문은 사실로 확정되지 않은 게임용 이야기입니다.');
}
// v20: rumor verification, trust-based errands, promise renewal, Alex tension, and emotion diary.
const V20_RUMOR_FACTS={
 roses:{place:'garden',fact:'정원사는 노란 장미를 찾은 손님이 꽃 장식 담당 시종이었다고 설명했다. 미겔의 행방과는 관계가 없었다.',effect:'false'},
 terrace:{place:'terrace',fact:'테라스에서 기다리던 손님은 악단 책임자였다. 약속 상대의 이름을 들은 이는 없었다.',effect:'false'},
 brothers:{place:'corridor',fact:'회랑의 경비병은 레온하르트 형제에 관한 대화가 단순한 출입 순서 확인이었다고 전했다. 그 이상의 사정은 알 수 없었다.',effect:'partial'},
 music:{place:'hall',fact:'악단 보조가 순서표 변경을 확인했다. 한 연주자의 악기가 고장 나 연주 순서를 바꾼 것이었다.',effect:'true'},
 tea:{place:'drawing',fact:'차 담당 시종은 찻잔을 남긴 손님이 다른 행사에 늦어 급히 이동했다고 말했다. 그 손님의 신원은 밝히지 않았다.',effect:'partial'}
};
const V20_ERRANDS={
 hall:{title:'접힌 연주표',ask:'악단 보조가 접힌 연주표를 건넨다. “연주 순서가 맞는지 마지막으로 확인해 주시겠습니까?”',good:'다니엘은 표의 순서를 하나씩 짚어 확인했다. 악단 보조는 안도의 숨을 내쉬었다.'},
 corridor:{title:'길을 잃은 손님',ask:'견습 시종이 손님에게 안내할 회랑의 방향을 물었다. “제가 잘못 안내하면 곤란합니다.”',good:'다니엘은 표지판을 확인한 뒤 차분히 방향을 알려 주었다.'},
 terrace:{title:'흔들리는 화분',ask:'화분 담당 시종이 바람에 흔들리는 받침대를 걱정한다. “잠시만 함께 잡아 주실 수 있습니까?”',good:'다니엘이 받침대를 붙잡는 동안 시종이 고정끈을 묶었다.'},
 drawing:{title:'식어 버린 찻물',ask:'차 담당 시종이 새 찻잔을 옮길 손이 부족하다고 말했다. “잠깐만 도와주실 수 있겠습니까?”',good:'다니엘은 조심스럽게 찻잔을 옮겼다. 시종은 손님들에게 무사히 차를 내었다.'},
 garden:{title:'정원의 길',ask:'정원사가 꽃길을 가로막은 빈 화분을 옮기려 한다. “통행에 방해가 되지 않게 해야겠습니다.”',good:'다니엘은 화분을 안전한 곳으로 옮기는 일을 거들었다.'}
};
function v20Data(){
 if(!state.v20||typeof state.v20!=='object')state.v20={rumorChecks:{},errands:{},promiseRenewals:0,alexScenes:{},diary:[],lastDiaryDay:0,rumorImpact:0};
 const d=state.v20;d.rumorChecks||={};d.errands||={};d.alexScenes||={};d.diary||=[];d.promiseRenewals||=0;d.rumorImpact||=0;return d;
}
function v20Record(id,title,text,category='기타'){v18Remember('v20_'+id,title,text,category);}
function v20VerifyRumor(){
 const d=v20Data(),r=v19Data().rumors.find(x=>x.day===state.day&&!d.rumorChecks[x.id+'_'+x.day])||v19Data().rumors.find(x=>!d.rumorChecks[x.id+'_'+x.day]);
 if(!r){modal('소문 확인','확인할 소문이 없습니다. 황궁에서 새로운 소문을 들어 보세요.');return;}
 const fact=V20_RUMOR_FACTS[r.id];if(!fact){modal('소문 확인','아직 확인 가능한 정보가 없습니다.');return;}
 if(exploration().turn>=7){modal('소문 확인','오늘은 더 조사할 시간이 없습니다.');return;}
 exploration().turn++;
 d.rumorChecks[r.id+'_'+r.day]={day:state.day,result:fact.effect};r.verified=true;r.result=fact.effect;
 const delta=fact.effect==='true'?2:fact.effect==='false'?-1:0;d.rumorImpact=Math.max(-20,Math.min(20,d.rumorImpact+delta));
 state.stats.resolve=Math.min(100,state.stats.resolve+1);
 const narrative='DAY '+r.day+'에 들은 소문을 조심스럽게 확인했다.\n\n'+fact.fact+'\n\n확인된 사실과 짐작을 구분하기로 했다.';
 v20Record('rumor_'+r.id+'_'+r.day,'소문의 진위 · '+r.id,narrative,'기타');
 modal('소문 확인 · 30분 경과',narrative+'\n\n소문의 파급 '+d.rumorImpact+' · 남은 이동 '+Math.max(0,7-exploration().turn));render();
}
function v20ErrandEvent(loc){
 const d=v20Data(),npc=v19Data().npc[loc],q=V20_ERRANDS[loc];
 if(!q||!npc||npc.rapport<2||d.errands[loc]||exploration().turn>6)return false;
 d.errands[loc]={offeredDay:state.day,status:'offered'};
 return v18Scene('v20errand',V19_NPC_PROFILES[loc].name,q.ask+'\n\n낯익은 얼굴을 알아본 시종은 다니엘의 대답을 기다렸다.',[
  {text:'“제가 도울 수 있다면 기꺼이 돕겠습니다.”',next:'explore',v20Errand:loc,v20ErrandMode:'help',effects:{reputation:2,resolve:1}},
  {text:'“죄송합니다. 지금은 다른 일을 찾고 있습니다.”',next:'explore',v20Errand:loc,v20ErrandMode:'decline',effects:{resolve:1}}
 ]);
}
function v20PromiseRenew(){
 const p=v18Data().promise,d=v20Data();
 if(!p||!['missed','met','declined'].includes(p.status)){modal('다시 만날 약속','먼저 미겔과 약속을 나누는 이야기를 진행해 주세요.');return;}
 if(d.promiseRenewals>=2){modal('다시 만날 약속','이번 이야기에서 제안할 수 있는 약속은 모두 사용했습니다.');return;}
 if(v18Data().promise&&v18Data().promise.status==='accepted'){modal('다시 만날 약속','이미 기다리고 있는 약속이 있습니다.');return;}
 if(state.day>=30){modal('다시 만날 약속','이번 연회에서는 더 이상 약속을 잡을 수 없습니다.');return;}
 v18Scene('v20renew','다니엘 레온하르트','지난 약속을 떠올린 다니엘은 잠시 말을 고른다. 약속을 다시 청하는 일이 상대에게 부담이 되지는 않을까.\n\n그는 먼저 자신의 마음을 다잡았다.',[
 {text:'다음 날 테라스에서 다시 뵐 수 있는지 정중히 여쭙는다.',next:'explore',v20Renew:true,effects:{trust:1,risk:1}},
 {text:'지금은 더 청하지 않고 기다린다.',next:'explore',effects:{resolve:1}}
 ]);render();
}
function v20AlexEncounter(loc){
 const d=v20Data(),t=socialProgress().alexTension,dayKey=state.day+'_'+loc;
 if(t<3||d.alexScenes[dayKey])return false;
 d.alexScenes[dayKey]=true;
 const text=t>=8?'알렉이 다니엘을 바라보았다. 형의 시선은 오래 머물지 않았지만, 다니엘은 스스로 무언가를 들킨 듯한 기분에 사로잡혔다.':'알렉과 마주친 다니엘은 먼저 자세를 바로잡았다. 형에게 무슨 말을 해야 할지 잠시 망설였다.';
 return v18Scene('v20alex','알렉스 레온하르트',text+'\n\n“무도회는 잘 즐기고 있느냐?”\n\n다니엘은 평범한 안부에도 쉽게 대답하지 못했다.',[
 {text:'“예, 형님. 별일 없습니다.”',next:'explore',v20Alex:'avoid',effects:{resolve:1}},
 {text:'“……그저 제 행동을 돌아보고 있었습니다.”',next:'explore',v20Alex:'confess',effects:{trust:1,risk:1}},
 {text:'먼저 형님의 안부를 여쭙는다.',next:'explore',v20Alex:'courtesy',effects:{reputation:1}}
 ]);
}
function v20DiaryText(){
 const a=state.stats.affection,t=state.stats.trust,x=socialProgress().alexTension,e=v18Data().emotion+v19Data().feelings;
 const opening=x>=8?'형님의 얼굴을 마주한 뒤로 마음이 편치 않았다.':a>=8?'그녀와 나눈 짧은 인사가 밤새 마음에 남았다.':'황궁의 불빛은 환했지만, 나는 자꾸만 말끝을 흐렸다.';
 const middle=t>=6?'상대가 내 말을 믿어 주기를 바라면서도, 먼저 신뢰할 만한 사람이 되어야 한다고 생각했다.':e>=3?'이 마음을 이름 붙여도 되는지 아직 모르겠다.':e<=-3?'내가 바라는 것이 무엇인지 스스로도 외면하고 있었다.':'사소한 일에도 너무 많은 뜻을 부여하고 있는 것은 아닐까.';
 return opening+'\n\n'+middle+'\n\n오늘은 누군가의 소문보다 내가 직접 보고 들은 것을 기억하기로 했다.';
}
function v20Diary(){
 const d=v20Data(),entry={day:state.day,turn:exploration().turn,text:v20DiaryText()};
 if(!d.diary.some(x=>x.day===entry.day&&x.turn===entry.turn)){d.diary.push(entry);v20Record('diary_'+entry.day+'_'+entry.turn,'다니엘의 감정 일지 · DAY '+entry.day,entry.text,'관계');}
 modal('다니엘의 감정 일지',d.diary.slice(-12).map(x=>'DAY '+x.day+' · '+CLOCK_LABELS[Math.min(x.turn,7)]+'\n'+x.text).join('\n\n────────\n\n'));
}
function v20Board(){
 const d=v20Data();const errands=Object.entries(d.errands).map(([loc,x])=>V20_ERRANDS[loc].title+' · '+(x.status==='help'?'도움 완료':x.status==='decline'?'정중히 사양':'대답 대기'));
 const rumors=Object.entries(d.rumorChecks).map(([key,x])=>key.split('_')[0]+' · '+(x.result==='true'?'사실 확인':x.result==='false'?'사실과 다름':'일부만 확인'));
 modal('황궁 조사와 부탁','[확인한 소문]\n'+(rumors.join('\n')||'아직 없습니다.')+'\n\n[개별 부탁]\n'+(errands.join('\n')||'친밀도가 높은 NPC에게 부탁을 받을 수 있습니다.')+'\n\n소문의 파급 '+d.rumorImpact+' · 약속 재제안 '+d.promiseRenewals+'/2');
}


// v21 — narrative-only continuity, all state additive to the original save.
const V21_LOCATIONS={hall:'대연회장',corridor:'회랑',terrace:'테라스',drawing:'응접실',garden:'장미 정원'};
const V21_FOLLOWUPS={
 hall:'악단 보조는 새로 정리한 순서표를 보여 주었다. “그날 도와주신 덕분에 연주를 무사히 마쳤습니다.” 다니엘은 별일 아니었다고 답했지만, 상대는 정중히 고개를 숙였다.',
 corridor:'견습 시종은 멀리서도 다니엘을 알아보았다. “지난번 안내해 주신 길이 맞았습니다.” 작은 안도감이 두 사람 사이에 남았다.',
 terrace:'화분 담당 시종은 고정된 받침대를 가리켰다. “그 뒤로는 바람이 불어도 괜찮습니다.” 다니엘은 화분이 넘어지지 않은 것을 확인했다.',
 drawing:'차 담당 시종은 차분히 잔을 정리하고 있었다. “덕분에 손님들을 오래 기다리게 하지 않았습니다.” 다니엘은 미소 대신 고개를 숙였다.',
 garden:'정원사는 말끔해진 길을 보여 주었다. “덕분에 손님들이 꽃을 가까이 볼 수 있게 됐습니다.” 다니엘은 노란 장미 앞에서 잠시 발걸음을 늦췄다.'
};
const V21_RUMOR_ECHO={
 roses:'노란 장미를 찾은 사람이 미겔이었다는 추측은 꽃 장식 담당 시종의 방문이었다는 확인 뒤 조금씩 잦아들었다.',
 terrace:'테라스의 비밀스러운 만남이라는 이야기는 악단의 일정 확인이었다는 말로 바뀌었다.',
 brothers:'레온하르트 형제에 관한 이야기는 단순한 출입 순서였다는 설명에도 쉽게 사라지지 않았다. 다니엘은 대꾸를 삼켰다.',
 music:'악단의 순서 변경 이유가 악기 고장이었다는 사실이 전해지자 사람들은 공연 준비의 분주함을 이야기했다.',
 tea:'남겨진 찻잔의 주인은 여전히 알려지지 않았다. 시종은 그 손님이 급히 다른 행사로 갔다고만 설명했다.'
};
function v21Data(){
 if(!state.v21||typeof state.v21!=='object')state.v21={followups:{},echoes:{},promisePlaces:[],moodHistory:[],bondScenes:{}};
 const d=state.v21;d.followups||={};d.echoes||={};d.promisePlaces||=[];d.moodHistory||=[];d.bondScenes||={};return d;
}
function v21Record(id,title,body,category='기타'){v18Remember('v21_'+id,title,body,category);}
function v21NpcFollowup(loc){
 const q=v20Data().errands[loc],d=v21Data(),npc=v19Data().npc[loc];
 if(!q||q.status!=='help'||state.day<=q.offeredDay||d.followups[loc]||!npc)return false;
 d.followups[loc]={day:state.day};npc.rapport=Math.min(10,(npc.rapport||0)+1);
 const body=V21_FOLLOWUPS[loc];v21Record('followup_'+loc,'부탁의 후일담 · '+V21_LOCATIONS[loc],body,'의뢰');
 return v18Scene('v21followup',V19_NPC_PROFILES[loc].name,body,[
  {text:'“도움이 되었다니 다행입니다.”',next:'explore',effects:{reputation:1,trust:1}},
  {text:'“그 뒤로 불편한 일은 없으셨습니까?”',next:'explore',effects:{resolve:1}}
 ]);
}
function v21RumorEcho(loc){
 const d=v21Data(),checks=v20Data().rumorChecks;
 const item=Object.entries(checks).find(([key,val])=>{
  const id=key.split('_')[0];return V20_RUMOR_FACTS[id]&&V20_RUMOR_FACTS[id].place!==loc&&!d.echoes[key]&&state.day>val.day;
 });
 if(!item)return false;
 const [key,val]=item,id=key.split('_')[0];d.echoes[key]={day:state.day,place:loc};
 const body='황궁의 다른 장소에도 먼저 들었던 소문이 흘러들어 왔다.\n\n'+V21_RUMOR_ECHO[id]+'\n\n다니엘은 자신이 확인한 사실과 다른 사람의 추측이 섞이지 않도록 말을 골랐다.';
 v21Record('echo_'+key,'소문의 여파 · '+V21_LOCATIONS[loc],body,'기타');
 return v18Scene('v21echo','SYSTEM',body,[
  {text:'확인한 사실만 조심스럽게 전한다.',next:'explore',effects:{reputation:1,resolve:1},v21Echo:'careful'},
  {text:'섣불리 말을 보태지 않는다.',next:'explore',effects:{trust:1},v21Echo:'silent'}
 ]);
}
function v21PromiseMenu(){
 const p=v18Data().promise,d=v20Data();
 if(!p||!['met','missed','declined'].includes(p.status)){modal('약속 장소를 고르기','이전에 나누었던 약속이 마무리된 뒤에 다시 제안할 수 있습니다.');return;}
 if(d.promiseRenewals>=2||state.day>=30){modal('약속 장소를 고르기','이번 연회에서 더 청할 수 있는 약속이 없습니다.');return;}
 const wrap=document.createElement('div');const info=document.createElement('p');info.textContent='다니엘은 상대의 편의를 먼저 생각했다. 어느 장소가 무례하지 않을까. 다음 날 같은 시간대에 그곳으로 가야 한다.';wrap.append(info);
 for(const [loc,label] of [['terrace','테라스'],['drawing','응접실'],['garden','장미 정원']]){
  const b=document.createElement('button');b.textContent='✧ 다음 날 · '+label+'에서 인사 청하기';b.onclick=()=>{
   d.promiseRenewals++;v18Data().promise={day:state.day+1,loc,turn:3,status:'accepted'};
   v19Data().promiseAfter=null;v21Data().promisePlaces.push({day:state.day+1,loc});
   const body='다니엘은 '+label+'에서 다시 인사를 드릴 수 있는지 정중히 여쭈었다. 상대의 답을 강요하지 않겠다는 생각으로 목소리를 낮췄다.';
   v21Record('promise_'+state.day+'_'+loc,'다시 청한 약속 · '+label,body,'관계');
   closeModal();modal('약속을 청했습니다','DAY '+(state.day+1)+' · '+label+' · 네 번째 이동 시간대에 방문하세요.\n\n'+body);
  };wrap.append(b);
 }
 modal('미겔과의 약속 장소 선택',wrap);
}
function v21MoodSnapshot(){
 const d=v21Data(),s=state.stats,x=socialProgress().alexTension,e=v18Data().emotion+v19Data().feelings;
 const mood=x>=8?'죄책감':s.affection>=8&&s.trust>=6?'조심스러운 기대':e<=-3?'망설임':e>=3?'설렘':'긴장';
 const body=mood==='죄책감'?'형님께 어떤 얼굴로 인사해야 할까. 다니엘은 손끝에 힘을 주었다.':mood==='조심스러운 기대'?'그녀가 자신의 발걸음을 알아보았다는 사실이 오래 마음에 남았다.':mood==='망설임'?'말을 꺼냈다가 상대를 곤란하게 만들지는 않을까.':mood==='설렘'?'기대해서는 안 된다는 생각과 다음 인사를 기다리는 마음이 엇갈렸다.':'오늘도 그는 예복의 소매를 한 번 더 바로잡았다.';
 const entry={day:state.day,turn:exploration().turn,mood,text:body};
 if(!d.moodHistory.some(a=>a.day===entry.day&&a.turn===entry.turn)){d.moodHistory.push(entry);v21Record('mood_'+entry.day+'_'+entry.turn,'감정의 변화 · DAY '+entry.day,body,'관계');}
 modal('다니엘의 감정 변화',d.moodHistory.slice(-18).map(a=>'DAY '+a.day+' · '+CLOCK_LABELS[Math.min(a.turn,7)]+' · '+a.mood+'\n'+a.text).join('\n\n────────\n\n'));
}
function v21BondScene(loc){
 if(!['terrace','drawing','garden'].includes(loc))return false;
 const d=v21Data(),a=state.stats.affection,t=state.stats.trust,meet=socialProgress().miguelMeetings;
 const tier=a>=12&&t>=10&&meet>=4?'trust':a>=6&&meet>=3?'warm':null;
 if(!tier||d.bondScenes[tier])return false;
 d.bondScenes[tier]={day:state.day};
 const body=tier==='trust'?'미겔은 다니엘이 인사하기 전에 고개를 돌렸다. “레온하르트 경. 발걸음이 익숙해졌습니다.”\n\n그녀는 한 걸음 거리를 두었다. 다니엘은 그 신중함이 오히려 고마웠다.':'미겔은 그의 옷깃에 시선을 두었다. “오늘은 장식이 조금 다르군요.”\n\n그녀는 사람을 구별할 때 얼굴보다 옷차림과 걸음걸이를 살핀다고 했다. 다니엘은 뜻밖의 관찰에 말을 잃었다.';
 v21Record('bond_'+tier,'미겔과의 대화 · '+(tier==='trust'?'익숙한 발걸음':'옷깃의 장식'),body,'관계');
 return v18Scene('v21bond','미겔 코트리먼',body,[
  {text:'“……기억해 주셨군요. 감사합니다.”',next:'explore',effects:{trust:2,affection:1}},
  {text:'“불편하시지 않도록 조심하겠습니다.”',next:'explore',effects:{trust:1,resolve:1}}
 ]);
}
function v21Board(){
 const d=v21Data(),p=v18Data().promise;
 modal('황궁의 후일담과 변화','[부탁 후일담]\n'+(Object.keys(d.followups).map(k=>V21_LOCATIONS[k]).join(' · ')||'아직 없습니다.')+'\n\n[소문 연쇄 반응]\n'+Object.keys(d.echoes).length+'건\n\n[약속]\n'+(p?'DAY '+p.day+' · '+(V21_LOCATIONS[p.loc]||'미정')+' · '+p.status:'아직 없습니다.')+'\n\n[감정 변화 기록]\n'+d.moodHistory.length+'건');
}


// v22: story extensions. All additions are optional, persisted under state.v22.
const V22_PLACE_SCENES={
 terrace:{title:'달빛 아래의 거리',text:'테라스의 난간에는 달빛이 길게 걸렸다. 미겔은 정중히 고개를 숙였다. “레온하르트 경.”\n\n다니엘은 바람이 그녀의 숄을 스치는 것을 보았다. 가까이 다가가도 될지, 묻는 편이 나을지 한참 망설였다.',ask:'“……바람이 차갑지는 않으십니까?”'},
 drawing:{title:'찻잔 사이의 침묵',text:'응접실에는 식어 가는 차 향이 남았다. 미겔은 맞은편 자리를 가리키되, 다니엘이 먼저 앉을 때까지 기다렸다.\n\n그는 찻잔을 쥐었다 놓았다. 평범한 안부를 묻는 일이 이렇게 어려울 줄은 몰랐다.',ask:'“차는 입에 맞으십니까?”'},
 garden:{title:'장미 사이의 발걸음',text:'장미 정원에는 노란 꽃잎이 드문드문 떨어져 있었다. 미겔은 다니엘의 구두 소리를 듣고 걸음을 멈췄다.\n\n“걸음이 익숙하군요.” 짧은 말이었지만 다니엘은 대답을 고르느라 한 박자 늦었다.',ask:'“꽃을 좋아하십니까?”'}
};
const V22_NPC_SCENES={
 hall:{name:'악단 보조',text:'악단 보조는 다니엘을 알아보고 악보의 가장자리를 접어 보였다. “지난번에 도와주신 덕분에 연주가 무사했습니다. 오늘은 제가 경의 길을 안내해 드릴까요?”'},
 corridor:{name:'견습 시종',text:'견습 시종은 멀리서부터 허리를 숙였다. “이제 복도에서 길을 잃지는 않습니다. 경께서 알려주신 대로 표식을 살폈거든요.”'},
 terrace:{name:'화분 담당 시종',text:'화분 담당 시종은 묶인 끈을 가리켰다. “바람이 다시 불어도 넘어지지 않을 겁니다. 경의 도움이 오래 남았군요.”'},
 drawing:{name:'차 담당 시종',text:'차 담당 시종은 빈 찻잔을 거두며 웃었다. “경께서 거들어 주신 뒤로는 손님들 앞에서 덜 떨립니다.”'},
 garden:{name:'정원사',text:'정원사는 다니엘에게 꽃잎 하나를 내밀었다. “아무것도 아닌 일 같아도, 길을 정리해 두면 누군가는 편히 걸을 수 있지요.”'}
};
function v22Data(){
 if(!state.v22||typeof state.v22!=='object')state.v22={placeMemories:{},npcDeep:{},rumorResponses:{},alexConflict:{},diaryComparisons:[]};
 const d=state.v22;d.placeMemories||={};d.npcDeep||={};d.rumorResponses||={};d.alexConflict||={};d.diaryComparisons||=[];return d;
}
function v22Record(id,title,body,category='기타'){v18Remember('v22_'+id,title,body,category);}
function v22PromiseScene(loc){
 const d=v22Data(),p=v18Data().promise,scene=V22_PLACE_SCENES[loc];
 if(!scene||!p||p.status!=='met'||p.loc!==loc||p.day!==state.day||d.placeMemories[state.day+'_'+loc])return false;
 d.placeMemories[state.day+'_'+loc]=true;
 const text=scene.text+'\n\n형의 약혼녀 앞이라는 사실을 다니엘은 잊지 않았다.';
 v22Record('promise_'+state.day+'_'+loc,'약속의 장소 · '+scene.title,text,'관계');
 return v18Scene('v22promise','미겔 코트리먼',text,[
 {text:scene.ask,next:'explore',effects:{trust:2},v22Choice:'courtesy'},
 {text:'“시간을 내 주셔서 감사합니다.”',next:'explore',effects:{reputation:1,resolve:1},v22Choice:'gratitude'},
 {text:'형님과의 약속을 떠올리고 말을 아낀다.',next:'explore',effects:{resolve:2},v22Choice:'restraint'}]);
}
function v22NpcDeep(loc){
 const npc=v19Data().npc[loc],d=v22Data(),scene=V22_NPC_SCENES[loc];
 if(!scene||!npc||(npc.rapport||0)<4||d.npcDeep[loc])return false;
 d.npcDeep[loc]={day:state.day};
 v22Record('npc_'+loc,'황궁의 익숙한 얼굴 · '+scene.name,scene.text,'관계');
 return v18Scene('v22npc',scene.name,scene.text,[
 {text:'“그렇게 말씀해 주시니 기쁩니다.”',next:'explore',effects:{reputation:2},v22Npc:loc,v22NpcMode:'warm'},
 {text:'“앞으로도 조심해서 일하십시오.”',next:'explore',effects:{resolve:1},v22Npc:loc,v22NpcMode:'reserved'}]);
}
function v22RumorResponse(){
 const d=v22Data(),checks=v20Data().rumorChecks;
 const item=Object.entries(checks).find(([key,val])=>v21Data().echoes[key]&&!d.rumorResponses[key]);
 if(!item){modal('소문 대응','아직 다른 장소로 전해진 소문이 없습니다. 먼저 소문을 확인하고 다음 날의 반응을 살펴보세요.');return;}
 const [key,val]=item,id=key.split('_')[0],fact=V20_RUMOR_FACTS[id];
 const text='이미 다른 장소로 번진 소문을 다시 들었다. '+(fact?.fact||'누군가의 짐작과 사실이 뒤섞여 있었다.')+'\n\n다니엘은 자신이 확인한 만큼만 책임질 수 있다는 사실을 떠올렸다.';
 return v18Scene('v22rumor','SYSTEM',text,[
 {text:'확인된 내용만 바로잡는다.',next:'explore',effects:{reputation:2,resolve:1},v22Rumor:key,v22RumorMode:'correct'},
 {text:'당사자의 사정을 위해 말을 아낀다.',next:'explore',effects:{trust:1},v22Rumor:key,v22RumorMode:'protect'},
 {text:'그 자리를 떠나 더는 관여하지 않는다.',next:'explore',effects:{resolve:1},v22Rumor:key,v22RumorMode:'leave'}]);
}
function v22AlexConflict(loc){
 const tension=socialProgress().alexTension,d=v22Data();
 const tier=tension>=10?'high':tension>=5?'medium':null;
 if(!tier||d.alexConflict[tier])return false;
 d.alexConflict[tier]={day:state.day,loc};
 const text=tier==='high'?'알렉이 다니엘을 불렀다. “요즘 무도회장을 자주 찾는구나.”\n\n다니엘은 시선을 피하지 않으려 애썼다. 형의 약혼녀를 찾아다녔다는 말은 입 밖에 내기 어려웠다.':'알렉은 다니엘의 굳은 어깨를 보았다. “무슨 걱정이라도 있느냐?”\n\n다니엘은 괜찮다는 말을 하려다 잠시 멈췄다. 형은 아직 아무것도 묻지 않았다.';
 v22Record('alex_'+tier,'형 앞에서 · '+(tier==='high'?'숨길 수 없는 망설임':'말하지 못한 걱정'),text,'관계');
 return v18Scene('v22alex','알렉 레온하르트',text,[
 {text:'“아닙니다, 형님. 걱정 끼쳐 드려 죄송합니다.”',next:'explore',effects:{reputation:1},v22Alex:'apologize'},
 {text:'“제가 제 마음을 잘 모르겠습니다.”',next:'explore',effects:{resolve:2,risk:1},v22Alex:'hesitate'},
 {text:'예를 갖추고 대화를 마친다.',next:'explore',effects:{resolve:1},v22Alex:'leave'}]);
}
function v22DiaryCompare(){
 const snapshots=v21Data().moodHistory,diary=v20Data().diary;
 const byDay=new Map();
 for(const a of snapshots){if(!byDay.has(a.day))byDay.set(a.day,[]);byDay.get(a.day).push(a);}
 const days=[...byDay.keys()].sort((a,b)=>a-b);
 if(days.length<2){modal('감정 일지 · 날짜별 비교','서로 다른 날짜에 탐색 화면의 ‘감정 변화 기록하기’를 사용하면 감정을 비교할 수 있습니다. 현재 기록된 날짜: '+days.length+'일');return;}
 const last=days.slice(-2),a=byDay.get(last[0]).at(-1),b=byDay.get(last[1]).at(-1);
 const text='DAY '+a.day+' · '+a.mood+'\n'+a.text+'\n\n→ DAY '+b.day+' · '+b.mood+'\n'+b.text+'\n\n'+(a.mood===b.mood?'감정의 이름은 같았지만, 하루가 더 흘렀다.':'어제와 오늘, 마음에 붙일 수 있는 이름이 달라졌다.');
 const d=v22Data(),key=a.day+'_'+b.day;
 if(!d.diaryComparisons.some(x=>x.key===key)){d.diaryComparisons.push({key,day:state.day,text});v22Record('diary_'+key,'감정의 간격 · DAY '+a.day+' → '+b.day,text,'관계');}
 modal('다니엘의 감정 일지 · 날짜별 비교',text+'\n\n기존 감정 일지 항목 '+diary.length+'건 · 비교 기록 '+d.diaryComparisons.length+'건');
}
function v22Board(){
 const d=v22Data();modal('v22 황궁 관계 수첩','약속 장소별 회상 '+Object.keys(d.placeMemories).length+'건\nNPC 심화 인연 '+Object.keys(d.npcDeep).length+'건\n소문 대응 '+Object.keys(d.rumorResponses).length+'건\n알렉 갈등 '+Object.keys(d.alexConflict).length+'단계\n감정 일지 비교 '+d.diaryComparisons.length+'건');
}

function moveTo(loc){
 const ex=exploration();if(ex.turn>=7){state.node='explore_timeout';render();return;}
 const turn=ex.turn;ex.turn++;ex.visited.push(loc);state.history.push('explore');
 if(v18PromiseEncounter(loc,turn)){v22PromiseScene(loc);render();return;}
 v18CheckMissedPromise();
 const miguelPlace=v16Route(state.day)[turn];
 const atmosphere=v17Atmosphere(loc,turn);
 const alexPlace=scheduleFor(ALEX_SCHEDULES,state.day)[turn];
 if(loc===miguelPlace&&loc===alexPlace){ex.found=true;markMiguelMeeting();markAlexMeeting(true);sharedEncounterV15();state.node='alex_miguel';}
 else if(loc===miguelPlace){ex.found=true;markMiguelMeeting();state.node=(loc==='hall'&&turn===0&&state.day===1)?'wine_accident':socialProgress().miguelMeetings>1?'explore_repeat_v14':'explore_found';if(state.node==='explore_repeat_v14')repeatedMiguelEvent();if(state.node!=='wine_accident'&&!v18OfferPromise()&&!v17BondScene())v16RelationshipEvent(); if(socialProgress().miguelMeetings>=3)v21BondScene(loc);}
 else if(loc===alexPlace){markAlexMeeting();state.node='explore_alex';if(!v22AlexConflict(loc)&&!v20AlexEncounter(loc)&&socialProgress().alexTension>=4)v16AlexTension();}
 else if(!v22NpcDeep(loc)&&!v19PromiseFollowup(loc)&&!v21NpcFollowup(loc)&&!v21RumorEcho(loc)&&!v20ErrandEvent(loc)&&!v18SerialEvent(loc)&&!v16QuestEvent(loc)&&!questEvent(loc)&&!specialDayEvent(loc)&&!v19NpcEncounter(loc)&&!v19RumorEncounter(loc)&&!v18NpcEvent(loc,turn)){ambientScene(loc);}
 if(state.node==='explore_v18_event')NODES.explore_v18_event.text=atmosphere+'\n\n'+NODES.explore_v18_event.text;
 if(state.node==='explore_ambient'&&NODES.explore_ambient)NODES.explore_ambient.text=atmosphere+'\n\n'+NODES.explore_ambient.text;
 else if(state.node==='explore_v16_quest'||state.node==='explore_quest_v15'||state.node==='explore_special_v14')NODES[state.node].text=atmosphere+'\n\n'+NODES[state.node].text;
 render();
}
function renderExplore(){
 const ex=exploration();const now=CLOCK_LABELS[Math.min(ex.turn,7)];
 $('line').textContent='DAY '+state.day+' · 황궁 · '+now+' · 남은 이동 '+Math.max(0,7-ex.turn)+' / 7\n\n황궁에는 저마다의 밤을 보내는 사람들이 있습니다. 어디로 향하시겠습니까?';
 $('nextBtn').classList.add('hidden');const clueBtn=document.createElement('button');clueBtn.textContent='✦ 주변의 소문과 흔적을 살핀다 (30분)';clueBtn.onclick=clueSearch;$('choices').append(clueBtn);const inferBtn=document.createElement('button');inferBtn.textContent='✧ 수집한 소문으로 동선 추리';inferBtn.onclick=inferenceV15;$('choices').append(inferBtn);const questBtn=document.createElement('button');const quest=questProgress();questBtn.textContent='♫ 악보 사건: '+(quest.done?'완료':['연회장에서 시작','회랑에서 악보 찾기','응접실에 전달'][quest.step]);questBtn.onclick=()=>modal('연속 사건 · 사라진 악보',quest.done?'악보를 무사히 돌려주었습니다.':'다음 목표: '+['대연회장','대리석 회랑','응접실'][quest.step]);$('choices').append(questBtn);const v16Btn=document.createElement('button');v16Btn.textContent='✦ 황궁 의뢰 수첩 (3개 연속 사건)';v16Btn.onclick=v16QuestBoard;$('choices').append(v16Btn);const journalBtn=document.createElement('button');journalBtn.textContent='✧ 수집한 단서 확인 ('+(ex.clues||[]).length+')';journalBtn.onclick=()=>modal('탐색 수첩',(ex.clues||[]).length?(ex.clues||[]).join('\n\n'):'아직 기록한 단서가 없습니다.');$('choices').append(journalBtn);const v18Btn=document.createElement('button');v18Btn.textContent='✧ 황궁의 작은 기록 · 약속과 연속 사건';v18Btn.onclick=v18Board;$('choices').append(v18Btn);const v19Btn=document.createElement('button');v19Btn.textContent='✧ 황궁 인연과 소문 수첩';v19Btn.onclick=v19Board;$('choices').append(v19Btn);const verifyBtn=document.createElement('button');verifyBtn.textContent='✧ 들은 소문의 진위 확인 (30분)';verifyBtn.onclick=v20VerifyRumor;$('choices').append(verifyBtn);const errandBtn=document.createElement('button');errandBtn.textContent='✦ 황궁 조사·부탁 수첩';errandBtn.onclick=v20Board;$('choices').append(errandBtn);const renewBtn=document.createElement('button');renewBtn.textContent='✧ 미겔과의 약속을 다시 청할지 생각한다';renewBtn.onclick=v20PromiseRenew;$('choices').append(renewBtn);const diaryBtn=document.createElement('button');diaryBtn.textContent='✦ 다니엘의 감정 일지';diaryBtn.onclick=v20Diary;$('choices').append(diaryBtn);const v21BoardBtn=document.createElement('button');v21BoardBtn.textContent='✧ 후일담·소문·약속 수첩';v21BoardBtn.onclick=v21Board;$('choices').append(v21BoardBtn);const v21PlaceBtn=document.createElement('button');v21PlaceBtn.textContent='✧ 미겔과의 다음 약속 장소 고르기';v21PlaceBtn.onclick=v21PromiseMenu;$('choices').append(v21PlaceBtn);const v21MoodBtn=document.createElement('button');v21MoodBtn.textContent='✦ 감정 변화 기록하기';v21MoodBtn.onclick=v21MoodSnapshot;$('choices').append(v21MoodBtn);const v22Btn=document.createElement('button');v22Btn.textContent='✧ 황궁의 인연 · v22 관계 수첩';v22Btn.onclick=v22Board;$('choices').append(v22Btn);const v22RumorBtn=document.createElement('button');v22RumorBtn.textContent='✦ 번진 소문에 어떻게 대응할지 생각한다';v22RumorBtn.onclick=()=>{if(v22RumorResponse())render();};$('choices').append(v22RumorBtn);const v22DiaryBtn=document.createElement('button');v22DiaryBtn.textContent='✧ 날짜별 감정 일지 비교';v22DiaryBtn.onclick=v22DiaryCompare;$('choices').append(v22DiaryBtn);const thoughtBtn=document.createElement('button');thoughtBtn.textContent='✦ 잠시 생각에 잠긴다';thoughtBtn.onclick=v17Thought;$('choices').append(thoughtBtn);LOCATIONS.forEach(loc=>{const b=document.createElement('button');b.textContent='✧ '+loc.name+(ex.visited.includes(loc.id)?' · 방문함':'');b.title=loc.desc;b.onclick=()=>moveTo(loc.id);$('choices').append(b);});
}

function renderStage(node){
 const area=$('stagePortraits'),cap=$('stageCaption');
 if(!area||!cap)return;
 area.replaceChildren();
 const id=state.node;
 cap.textContent=id==='explore'?'황궁 · 행방을 찾아서':
 /miguel|found_|explore_found|explore_finish|wine_/.test(id)||node.speaker==='미겔 코트리먼'
 ?'노란 장미와 보랏빛 밤':
 /daniel|ball_/.test(id)||node.speaker==='다니엘 레온하르트'
 ?'레온하르트 백작가 · 막내아들':'세 개의 달이 떠오르는 밤';
}
function render(){const node=NODES[state.node]||NODES.intro;renderStage(node);$('speaker').textContent=node.speaker;$('line').textContent=node.text;$('day').textContent='DAY '+state.day;$('chapter').textContent=node.chapter||'PROLOGUE';$('choices').replaceChildren();$('nextBtn').classList.toggle('hidden',!!node.choices);if(node.explore){renderExplore();return;}(node.choices||[]).forEach(choice=>{const b=document.createElement('button');b.textContent='✧ '+choice.text;b.onclick=()=>{if(choice.action==='home'){show('home');return;}if(choice.action==='restartExplore'){resetNight();state.node='explore';render();return;}if(choice.action==='nextDay'){nextDay();return;}if(choice.reset)state=fresh();else{state.history.push(state.node);for(const [k,v] of Object.entries(choice.effects||{}))if(k in state.stats)state.stats[k]=Math.max(0,Math.min(100,state.stats[k]+v));}if(choice.v16Quest){if(choice.v17Ending)v17QuestEnding(choice.v16Quest,choice.v17Ending==='help'?'finish_help':'finish_quiet');const q=v16Data().quests[choice.v16Quest];if(q){if(choice.v16Mode==='advance'){q.step=Math.min(2,q.step+1);q.choice='accept';}else if(choice.v16Mode==='decline'){q.choice='decline';}else if(choice.v16Mode==='finish'){q.done=true;v16Data().memories.push({id:'quest_'+choice.v16Quest,title:V16_QUESTS.find(x=>x.id===choice.v16Quest)?.title||'황궁 사건',text:'황궁의 작은 의뢰를 해결했다.',day:state.day});}}}if(choice.v22Rumor){const d=v22Data();d.rumorResponses[choice.v22Rumor]={day:state.day,mode:choice.v22RumorMode};const change=choice.v22RumorMode==='correct'?-2:choice.v22RumorMode==='protect'?-1:0;v20Data().rumorImpact=Math.max(-20,Math.min(20,v20Data().rumorImpact+change));v22Record('rumor_'+choice.v22Rumor,'소문에 대한 다니엘의 대응',NODES.explore_v18_event?.text||'소문을 조심스럽게 다루었다.','기타');}if(choice.v22Npc){v22Data().npcDeep[choice.v22Npc].choice=choice.v22NpcMode;const npc=v19Data().npc[choice.v22Npc];if(npc&&choice.v22NpcMode==='warm')npc.rapport=Math.min(10,(npc.rapport||0)+1);}if(choice.v22Alex){v22Data().lastAlexResponse=choice.v22Alex;if(choice.v22Alex==='hesitate')socialProgress().alexTension=Math.min(100,socialProgress().alexTension+1);}if(choice.v22Choice){v22Data().lastPromiseResponse=choice.v22Choice;}if(choice.v21Echo){v21Data().lastEchoChoice=choice.v21Echo;}if(choice.v20Errand){const q=v20Data().errands[choice.v20Errand];if(q){q.status=choice.v20ErrandMode;const def=V20_ERRANDS[choice.v20Errand];v20Record('errand_'+choice.v20Errand,def.title,choice.v20ErrandMode==='help'?def.good:'다니엘은 정중히 사양하고 자신의 일을 계속했다.','의뢰');if(choice.v20ErrandMode==='help'){const npc=v19Data().npc[choice.v20Errand];if(npc)npc.rapport=Math.min(10,npc.rapport+1);}}}if(choice.v20Renew){v20Data().promiseRenewals++;v18Data().promise={day:state.day+1,loc:'terrace',turn:3,status:'accepted'};v19Data().promiseAfter=null;v20Record('renew_'+state.day,'다시 청한 약속','다니엘은 다음 날 테라스에서 인사할 기회를 다시 청했다.','관계');}if(choice.v20Alex){const d=v20Data();d.lastAlexChoice=choice.v20Alex;if(choice.v20Alex==='confess')socialProgress().alexTension=Math.min(100,socialProgress().alexTension+1);v20Record('alex_'+state.day+'_'+exploration().turn,'형 앞에서의 대답',NODES.explore_v18_event?.text||'형과의 짧은 대화를 떠올렸다.','관계');}if(choice.v18Emotion)v18Data().emotion=Math.max(-10,Math.min(10,v18Data().emotion+choice.v18Emotion));if(choice.v19Feeling)v19Data().feelings=Math.max(-10,Math.min(10,v19Data().feelings+choice.v19Feeling));if(choice.v19Npc){const npc=v19Data().npc[choice.v19Npc];if(npc){npc.rapport=Math.min(10,(npc.rapport||0)+(choice.v19Rapport||0));if(npc.rapport===2)v19Record('npc_'+choice.v19Npc,'황궁의 인연 · '+V19_NPC_PROFILES[choice.v19Npc].name,V19_NPC_PROFILES[choice.v19Npc].warm,'관계');}}if(choice.v19Rumor){const r=v19Data().rumors.find(x=>x.id===choice.v19Rumor&&x.day===state.day);if(r)r.verified=true;}if(choice.v18Promise){v18Data().promise=choice.v18Promise==='accept'?{day:state.day+1,loc:'terrace',turn:3,status:'accepted'}:{day:state.day+1,status:'declined'};}if(choice.v18Serial!==undefined){const x=v18Data().serial[choice.v18Serial];if(x){if(choice.v18Mode==='advance'){if(x.stage===0)x.startDay=state.day;x.stage=Math.min(2,x.stage+1);}else if(choice.v18Mode.startsWith('finish')){x.done=true;const q=V18_SERIAL[choice.v18Serial];v18Remember('v18_serial_'+choice.v18Serial,q.title+' · 해결',q.end,'의뢰');}}}if(choice.questStep){const q=questProgress();q.step=Math.max(q.step,choice.questStep);if(q.step>=3){q.done=true;recordGallery('quest_done_v15');}}if(choice.ambientReply){NODES.explore_ambient_reply={speaker:'SYSTEM',text:choice.ambientReply,chapter:'CHAPTER 01',next:'explore'};}state.node=choice.v17Ending?'explore_v17_ending':choice.next;render();};$('choices').append(b);});}
function fresh(){return{node:'intro',day:1,social:{miguelMeetings:0,alexTension:0},stats:{affection:0,trust:0,resolve:0,reputation:50,risk:0},history:[],exploration:{turn:0,clues:[],visited:[],found:false,sceneCounts:{}}};}
function save(){try{localStorage.setItem(SAVE_KEY,JSON.stringify({...state,ambientSnapshot:['explore_ambient','explore_ambient_reply','explore_special_v14','explore_repeat_v14','explore_clue_v14','explore_quest_v15','explore_v16_quest','explore_v16_bond','explore_v16_alex','explore_v17_bond','explore_v17_thought','explore_v17_ending','explore_v18_event'].includes(state.node)?{scene:NODES.explore_ambient,reply:NODES.explore_ambient_reply,special:NODES.explore_special_v14,repeat:NODES.explore_repeat_v14,clue:NODES.explore_clue_v14,quest:NODES.explore_quest_v15,v16quest:NODES.explore_v16_quest,v16bond:NODES.explore_v16_bond,v16alex:NODES.explore_v16_alex,v17bond:NODES.explore_v17_bond,v17thought:NODES.explore_v17_thought,v17ending:NODES.explore_v17_ending,v18event:NODES.explore_v18_event}:null}));modal('저장 완료','현재 진행 상황을 이 브라우저에 저장했습니다.');}catch{modal('저장 실패','브라우저 저장 공간을 사용할 수 없습니다.');}}
function load(){try{const raw=localStorage.getItem(SAVE_KEY);if(!raw){modal('불러오기','저장된 진행 상황이 없습니다.');return;}const data=JSON.parse(raw);if(!data||(!['explore_ambient','explore_ambient_reply','explore_special_v14','explore_repeat_v14','explore_clue_v14','explore_quest_v15','explore_v16_quest','explore_v16_bond','explore_v16_alex','explore_v17_bond','explore_v17_thought','explore_v17_ending','explore_v18_event'].includes(data.node)&&!NODES[data.node])||!data.stats||typeof data.stats!=='object')throw Error('invalid');if(['explore_ambient','explore_ambient_reply','explore_special_v14','explore_repeat_v14','explore_clue_v14','explore_quest_v15','explore_v16_quest','explore_v16_bond','explore_v16_alex','explore_v17_bond','explore_v17_thought','explore_v17_ending','explore_v18_event'].includes(data.node)){const snap=data.ambientSnapshot||{};if(data.node==='explore_ambient'&&!snap.scene)throw Error('missing ambient');if(snap.scene)NODES.explore_ambient=snap.scene;if(snap.reply)NODES.explore_ambient_reply=snap.reply;if(snap.special)NODES.explore_special_v14=snap.special;if(snap.repeat)NODES.explore_repeat_v14=snap.repeat;if(snap.clue)NODES.explore_clue_v14=snap.clue;if(snap.quest)NODES.explore_quest_v15=snap.quest;if(snap.v16quest)NODES.explore_v16_quest=snap.v16quest;if(snap.v16bond)NODES.explore_v16_bond=snap.v16bond;if(snap.v16alex)NODES.explore_v16_alex=snap.v16alex;if(snap.v17bond)NODES.explore_v17_bond=snap.v17bond;if(snap.v17thought)NODES.explore_v17_thought=snap.v17thought;if(snap.v17ending)NODES.explore_v17_ending=snap.v17ending;if(snap.v18event)NODES.explore_v18_event=snap.v18event;if(!NODES[data.node])throw Error('missing event');}state={...fresh(),...data,social:{miguelMeetings:0,alexTension:0,...(data.social||{})},stats:{...fresh().stats,...data.stats},exploration:{...fresh().exploration,...(data.exploration||{})}};show('game');render();closeModal();}catch{modal('불러오기 실패','저장 데이터가 올바르지 않습니다.');}}
function modal(title,content){$('modalTitle').textContent=title;$('modalContent').replaceChildren();if(typeof content==='string'){$('modalContent').textContent=content;}else $('modalContent').append(content);$('modal').classList.remove('hidden');}
function closeModal(){$('modal').classList.add('hidden');}
function status(){const wrap=document.createElement('div');const labels={affection:'미겔 호감도',trust:'미겔 신뢰도',resolve:'다니엘의 결심',reputation:'가문 평판',risk:'발각 위험'};for(const [k,label] of Object.entries(labels)){const r=document.createElement('div');r.className='stat';const a=document.createElement('span'),b=document.createElement('strong');a.textContent=label;b.textContent=state.stats[k]+' / 100';r.append(a,b);wrap.append(r);}const p=document.createElement('p');p.className='hint';p.textContent='현재는 샘플 수치입니다. 본편 스토리와 연동해 확장할 수 있습니다.';wrap.append(p);const s=socialProgress();const extra=document.createElement('p');extra.className='hint';extra.textContent='미겔 누적 조우 '+s.miguelMeetings+'회 · 알렉 관계 긴장도 '+s.alexTension+' / 100';wrap.append(extra);const v19=document.createElement('p');v19.className='hint';v19.textContent='황궁에서 들은 소문 '+v19Data().rumors.length+'건 · 다니엘의 감정 변화 '+v19Data().feelings;wrap.append(v19);modal('관계 상태',wrap);}
function journal(){const wrap=document.createElement('div');const p=document.createElement('p');p.className='hint';p.textContent='지금까지 지나온 장면 ('+state.history.length+'개)';wrap.append(p);const entries=[...state.history.slice(-20),state.node];entries.forEach((id,i)=>{const n=NODES[id];if(!n)return;const el=document.createElement('div');el.className='journal-entry';const head=document.createElement('strong');head.textContent=(i+1)+'. '+n.speaker;const body=document.createElement('p');body.textContent=n.text;el.append(head,body);wrap.append(el)});modal('이야기 기록',wrap);}
function characters(){
 const wrap=document.createElement('div');
 const entries=[
  {name:'다니엘 레온하르트 · Daniel Leonhard',summary:'25세 · 남성 · A형 · 189cm / 75kg · 백작가 막내아들 · 플레이어',details:[
   '“……미안하게 됐습니다.”',
   '모범적이고 성실하며 근면하다. 고지식하지만 이성적이기보다 감성적이고 순진한 편이다. 사람을 쉽게 믿어 속기도 한다.',
   '공과 사를 구분하지 못하는 순간을 경계한다. 자존감이 낮고, 원작과 크게 다르지 않으나 로판 AU에서는 늘 주눅 들어 있다.',
   '큰 전쟁의 공적으로 기사단 가문에서 백작가로 올라선 레온하르트 가문의 세 형제 중 막내. 집안에서 홀대받는 일이 많아 인정받고 싶어 한다.',
   '안경이나 모노클을 쓰고 고풍스러운 옷을 입는 것이 본래 취향이다. 지금은 약혼자의 취향에 맞춰 안경을 벗고 옷차림도 바꿨다.',
   '현재 약혼 관계가 있다. 약혼 상대는 게임에서 기존 타인 소유 캐릭터가 아닌 별도의 익명 NPC로 처리한다.',
   '외관: 옅은 금발을 단정하게 뒤로 넘긴 머리, 밝은 피부, 날카롭고 정돈된 눈매와 긴 체형. 흰색 더블브레스트 예복에 검은색 라펠, 무늬가 있는 회색 안감, 어두운 하이웨이스트 바지와 검은 구두를 착용한다.',
   '어깨에 걸친 긴 흰색 외투와 가슴의 노란 장미 장식, 목깃의 작은 브로치가 특징이다. 자세를 꼿꼿하게 세운 격식 있는 모습이지만, 속으로는 늘 타인의 평가를 의식한다.',
   '외관 묘사는 제공된 전신 일러스트 기준이며, 스토리 속 복장 변화는 별도로 구분한다.'
  ]},
  {name:'미겔 코트리먼 · Miguel Cotreeman',summary:'32세 · 여성 · AB형 · 153cm / 48kg · 코트리먼 후작가 외동딸 · 메인 공략 대상',details:[
   '“지는 꽃이 아름답다 하였으니.”',
   '청렴결백하고 실용적이며 가문에 헌신적이다. 자신의 속마음을 쉽게 드러내지 못하며 격식 있는 어휘를 쓰고 말을 아낀다.',
   '저택에 갇히다시피 성장해 아카데미나 기사단에 몸담지 못했다. 얼굴보다 복장, 체격, 걸음걸이, 행동으로 사람을 구별한다.',
   '코트리먼 영지는 풍요롭고 노란 장미화원이 유명하다. 알렉스 레온하르트와 현재 약혼 중이다. 약혼자를 ‘알렉’이라 부른다.',
   '외관: 회갈색 머리카락을 정교하게 틀어 올렸으며, 가늘고 차분한 눈매와 작은 체구가 특징이다. 연보라색 드레스, 짙은 보라색 숄, 금빛 장신구와 노란 장미를 지닌 모습이 공식 일러스트에 등장한다.'
  ]},
  {name:'알렉스 레온하르트 · Alex Leonhard',summary:'다니엘의 형 · 미겔의 현재 약혼자',details:['사용 가능한 기존 캐릭터. 세부 외형·성격·대사는 원본 자료를 받은 뒤 반영합니다.']}
 ];
 for(const entry of entries){const card=document.createElement('div');card.className='journal-entry';const h=document.createElement('strong');h.textContent=entry.name;const p=document.createElement('p');p.textContent=entry.summary;card.append(h,p);for(const detail of entry.details){const line=document.createElement('p');line.textContent=detail;card.append(line)}wrap.append(card)}
 const note=document.createElement('p');note.className='hint';note.textContent='원본 프로필 기반 정리 · 게임 내 독백과 상황 묘사는 창작 각색입니다. 더스크·마레 등 타인 소유 자캐는 사용하지 않습니다.';wrap.append(note);modal('인물 도감',wrap);
}
function gallery(){
 const wrap=document.createElement('div');
 const intro=document.createElement('p');intro.className='hint';intro.textContent='해금된 회상을 선택하면 상세 내용을 볼 수 있습니다.';wrap.append(intro);
 const filter=document.createElement('select');for(const category of ['전체','의뢰','관계','기타']){const opt=document.createElement('option');opt.value=category;opt.textContent='회상 분류 · '+category;filter.append(opt)}wrap.append(filter);const memoryWrap=document.createElement('div');wrap.append(memoryWrap);filter.onchange=()=>{for(const b of memoryWrap.querySelectorAll('button'))b.hidden=filter.value!=='전체'&&b.dataset.category!==filter.value};
 const entries=[['황실 초대장','intro'],['세 개의 달','ball_arrival'],['연회장에서의 조우','ball_miguel'],['장미 온실에서의 만남','explore_found'],['쏟아진 와인','wine_accident'],['형과 약혼녀','alex_miguel'],['사라진 악보 해결','quest_done_v15']];
 entries.forEach(([label,id])=>{
  const unlocked=state.history.includes(id)||state.node===id||(state.unlockedV15||[]).includes(id);
  const b=document.createElement('button');b.textContent=(unlocked?'✦ ':'🔒 ')+label;
  b.disabled=!unlocked;b.onclick=()=>modal('회상 · '+label,(NODES[id]?.text||'황궁에서 있었던 일을 떠올립니다.')+'\n\n다시 돌아가려면 회상 갤러리를 열어주세요.');wrap.append(b);
 });
 for(const memory of (v16Data().memories||[])){
  const b=document.createElement('button');b.textContent='✦ DAY '+memory.day+' · '+memory.title;
  b.dataset.category=memory.category|| (memory.id?.startsWith('quest_')?'의뢰':memory.id?.startsWith('bond_')?'관계':'기타');b.onclick=()=>modal('회상 · '+memory.title,memory.text);memoryWrap.append(b);
 }
 modal('회상 갤러리',wrap);
}
function settings(){const wrap=document.createElement('div');const p=document.createElement('p');p.className='hint';p.textContent='DELHARSA : 보라색의 밤 · 황궁 일상 125종 · 날짜별 특별 이벤트 · v22 약속 장소별 대화와 관계 심화\n게임은 브라우저의 로컬 저장소에 진행 상황을 보관합니다.';wrap.append(p);const btn=document.createElement('button');btn.textContent='저장 데이터 초기화';btn.onclick=()=>{if(confirm('저장 데이터를 삭제할까요?')){localStorage.removeItem(SAVE_KEY);modal('초기화 완료','저장 데이터가 삭제되었습니다.');}};wrap.append(btn);modal('설정',wrap);}
// v11: 게임 내 설정 자료실 — Markdown 원본을 그대로 열람하고 개별 파일로 이동할 수 있습니다.
const LORE_FILES=[
 ['목차 및 정리 원칙','00_설정집_목차.md'],
 ['세계관과 황실 무도회','01_세계관과_무도회.md'],
 ['다니엘 레온하르트','02_다니엘_레온하르트.md'],
 ['미겔 코트리먼','03_미겔_코트리먼.md'],
 ['인물 관계 및 사용 범위','04_인물관계_및_사용범위.md'],
 ['게임 시스템과 연출','05_게임시스템_및_연출.md'],
 ['v13 일정과 조우 설계','06_v13_일정과_조우_설계.md'],
 ['v14 반복 조우와 단서 시스템','07_v14_반복조우와_단서.md'],
 ['v15 연속 사건과 추리·회상','08_v15_연속사건과_추리.md'],
 ['v16 다중 의뢰와 관계·회상','09_v16_다중의뢰_확률일정_회상.md'],
 ['텍스트 전용 연출','10_텍스트_전용_연출.md'],
 ['v17 서술과 관계 분기','11_v17_서술_관계_의뢰.md'],
 ['v18 시간대 NPC와 약속·연속 사건','12_v18_시간대_NPC_약속_연속사건.md'],
 ['v19 소문·인연·약속 후속','13_v19_인연과_소문_약속후속.md'],
 ['v20 소문 검증·NPC 부탁·감정 일지','14_v20_소문검증_개별부탁_감정일지.md'],
 ['v21 후일담·소문·약속 장소·감정 변화','15_v21_후일담_소문연쇄_약속장소_감정변화.md'],
 ['v22 장소별 약속·인연·갈등·일지 비교','16_v22_장소별약속_인연심화_소문대응_감정비교.md']
];
function loreLibrary(){
 const wrap=document.createElement('div');wrap.className='lore-library';
 const intro=document.createElement('p');intro.className='hint';intro.textContent='원본 확정 설정과 게임 각색을 구분해 정리한 Markdown 자료입니다. 항목을 누르면 이 창에서 읽을 수 있습니다.';wrap.append(intro);
 const menu=document.createElement('div');menu.className='lore-menu';wrap.append(menu);
 const reader=document.createElement('pre');reader.className='lore-reader';reader.textContent='읽을 문서를 선택하세요.';wrap.append(reader);
 LORE_FILES.forEach(([label,file])=>{const b=document.createElement('button');b.textContent=label;b.onclick=async()=>{reader.textContent='문서를 불러오는 중…';try{const response=await fetch('lore/'+encodeURIComponent(file));if(!response.ok)throw Error('HTTP '+response.status);reader.textContent=await response.text();}catch(e){reader.textContent='문서를 열 수 없습니다. 배포할 때 lore 폴더도 함께 업로드했는지 확인해 주세요. ('+e.message+')';}};menu.append(b);});

 const link=document.createElement('p');link.className='hint';link.textContent='파일은 배포 폴더의 lore/ 디렉터리에 .md 형식으로 보관됩니다.';wrap.append(link);
 modal('📚 설정 자료실',wrap);
 menu.firstChild.click();
}
$('newBtn').onclick=()=>{state=fresh();show('game');render();};$('continueBtn').onclick=load;$('loadHomeBtn').onclick=load;$('loadBtn').onclick=load;$('saveBtn').onclick=save;$('statusBtn').onclick=status;$('journalBtn').onclick=journal;$('charactersBtn').onclick=characters;$('charactersHomeBtn').onclick=characters;$('galleryBtn').onclick=gallery;$('settingsBtn').onclick=settings;$('titleBtn').onclick=()=>show('home');$('nextBtn').onclick=()=>{const next=NODES[state.node]?.next;if(next){state.history.push(state.node);state.node=next;render();}};$('closeModal').onclick=closeModal;$('modal').onclick=e=>{if(e.target===$('modal'))closeModal();};document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});

$('loreHomeBtn').onclick=loreLibrary;$('loreBtn').onclick=loreLibrary;
