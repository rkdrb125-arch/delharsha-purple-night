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
 explore_found:{speaker:'SYSTEM',text:'노란 장미가 심어진 온실 입구.\n조용한 발소리가 멎고, 미겔 코트리먼이 고개를 돌립니다.\n“레온하르트 경. 이곳에서 뵙는군요.”',chapter:'CHAPTER 01',choices:[{text:'“우연히 지나던 길이었습니다.”',next:'found_shy',effects:{affection:2,risk:1}},{text:'“인사를 드리고 싶었습니다.”',next:'found_honest',effects:{trust:3,resolve:2}},{text:'“불편하셨다면 물러나겠습니다.”',next:'found_polite',effects:{trust:2}}]},
 found_shy:{speaker:'다니엘 레온하르트',text:'우연히 지나던 길이라니. 벌써 세 번째로 같은 복도를 지나왔으면서.\n다니엘은 스스로의 변명이 부끄러워 시선을 내렸다. 그저 인사를 드리려 했을 뿐이라고, 다시 한번 속으로 되뇌었다.',chapter:'CHAPTER 01',next:'miguel_conversation'},
 found_honest:{speaker:'미겔 코트리먼',text:'“그랬구나. 네가 어떤 마음으로 찾아왔는지, 굳이 서둘러 말하지 않아도 된단다.”\n미겔은 다니엘이 말을 고를 수 있도록 잠시 기다렸다.',chapter:'CHAPTER 01',next:'miguel_conversation'},
 found_polite:{speaker:'미겔 코트리먼',text:'“괜찮아. 잠시 머물다 가렴. 이곳은 바람이 제법 온화하거든.”',chapter:'CHAPTER 01',next:'miguel_conversation'},
 miguel_conversation:{speaker:'미겔 코트리먼',text:'“오늘은 알렉과 함께 왔단다. 혹시 그를 찾고 있니?”\n그녀는 잠시 다니엘의 옷깃을 살폈다. 얼굴보다는 복장과 걸음걸이를 기억하는 버릇 때문이었다.',chapter:'CHAPTER 01',choices:[{text:'“아닙니다. 후작님께 인사를 드리고 싶었습니다.”',next:'miguel_truth',effects:{trust:2,affection:1,risk:1}},{text:'“형님께서 어디 계신지 여쭈려 했습니다.”',next:'miguel_alex',effects:{reputation:1,resolve:1}},{text:'“실례했습니다. 이만 물러나겠습니다.”',next:'miguel_retreat',effects:{resolve:2}}]},
 miguel_truth:{speaker:'미겔 코트리먼',text:'“그랬구나.”\n미겔은 그 이상 캐묻지 않았다. 다만 시선이 잠깐 그의 소매에 머물렀다.\n“오늘은 평소와 다른 옷을 입었구나, 다니엘. 네게 잘 어울려.”',chapter:'CHAPTER 01',next:'explore_finish'},
 miguel_alex:{speaker:'미겔 코트리먼',text:'“알렉이라면 연회장 안쪽에 있을 거야.”\n그녀는 짧게 답했다. 다니엘은 감사 인사를 하면서도, 정작 묻고 싶었던 말이 따로 있었음을 깨달았다.',chapter:'CHAPTER 01',next:'explore_finish'},
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

const V13_AMBIENT_SCENES={"hall":[{"speaker":"무도회 안내원","text":"안내원이 손님들의 동선을 정리하며 춤 순서를 확인하고 있다.","options":[{"text":"순서를 확인한다.","response":"다니엘은 표를 두 번 읽고 고개를 끄덕였다.","effects":{"resolve":1}},{"text":"길을 비켜 준다.","response":"다른 손님들이 먼저 지나가도록 한 걸음 물러섰다.","effects":{"reputation":1}}]},{"speaker":"시종","text":"시종이 넘칠 듯한 과일 접시를 들고 지나간다.","options":[{"text":"접시를 받쳐 준다.","response":"“위험할 뻔했습니다.” 시종이 감사했다.","effects":{"resolve":1}},{"text":"통로를 비워 준다.","response":"다니엘은 발끝을 모으고 조심히 비켜섰다.","effects":{"reputation":1}}]},{"speaker":"귀족","text":"한 귀족이 오늘의 음악이 낯설다며 고개를 갸웃한다.","options":[{"text":"곡 이름을 함께 살핀다.","response":"둘은 프로그램의 작은 글씨를 한참 들여다보았다.","effects":{"resolve":1}},{"text":"잘 모른다고 답한다.","response":"“죄송합니다. 음악에는 문외한이라서요.”","effects":{"reputation":1}}]},{"speaker":"악사","text":"악사가 떨어뜨린 악보를 찾느라 의자 아래를 살핀다.","options":[{"text":"악보를 주워 준다.","response":"다니엘은 구겨지지 않도록 종이 끝을 조심히 잡았다.","effects":{"resolve":1}},{"text":"주변을 살핀다.","response":"발밑에서 악보 한 장을 발견해 위치를 알려 주었다.","effects":{"reputation":1}}]},{"speaker":"귀족 부인","text":"귀족 부인이 황궁의 꽃 장식에 쓰인 보라색 리본을 칭찬한다.","options":[{"text":"조용히 동의한다.","response":"“……참 잘 어울리는 색입니다.”","effects":{"resolve":1}},{"text":"장식 담당을 칭찬한다.","response":"다니엘은 준비한 사람들의 노고를 떠올렸다.","effects":{"reputation":1}}]},{"speaker":"SYSTEM","text":"음악이 잠시 멎고 연회장에 잔 부딪치는 소리만 남는다.","options":[{"text":"다음 곡을 기다린다.","response":"다니엘은 어색하게 손을 포갰다.","effects":{"resolve":1}},{"text":"잠시 물을 마신다.","response":"차가운 물 한 모금에 긴장이 조금 가셨다.","effects":{"reputation":1}}]}],"corridor":[{"speaker":"경비병","text":"경비병이 방문객에게 조용히 걸어 달라는 안내를 하고 있다.","options":[{"text":"규칙을 확인한다.","response":"“네 말은 잘 들었어, 다니엘.” 다니엘은 곧장 걸음을 늦췄다.","effects":{"resolve":1}},{"text":"안내를 돕는다.","response":"그는 뒤따르던 손님에게도 조용히 주의를 전했다.","effects":{"reputation":1}}]},{"speaker":"시종","text":"시종이 쏟아진 꽃잎을 빗자루로 모으고 있다.","options":[{"text":"꽃잎을 주워 준다.","response":"손끝에 옅은 꽃향기가 남았다.","effects":{"resolve":1}},{"text":"바닥이 미끄럽지 않은지 묻는다.","response":"시종은 이미 정리 중이라며 고개를 숙였다.","effects":{"reputation":1}}]},{"speaker":"SYSTEM","text":"긴 회랑 끝에서 작은 발소리가 울렸다가 사라진다.","options":[{"text":"발소리를 따라가 본다.","response":"돌아보니 늦게 퇴근하는 시종이었다.","effects":{"resolve":1}},{"text":"그대로 걷는다.","response":"다니엘은 괜한 기대를 접었다.","effects":{"reputation":1}}]},{"speaker":"귀족","text":"낯선 귀족이 창문 너머 세 달의 위치를 묻는다.","options":[{"text":"창가로 안내한다.","response":"“저쪽에서 더 잘 보일 겁니다.”","effects":{"resolve":1}},{"text":"모른다고 솔직히 말한다.","response":"“……천문에는 밝지 않습니다.”","effects":{"reputation":1}}]},{"speaker":"시종","text":"시종이 떨어진 단추 하나를 발견해 주인을 찾고 있다.","options":[{"text":"단추를 살핀다.","response":"다니엘은 자기 소매를 확인한 뒤 고개를 저었다.","effects":{"resolve":1}},{"text":"분실물함을 안내한다.","response":"시종은 단추를 안전하게 보관했다.","effects":{"reputation":1}}]},{"speaker":"SYSTEM","text":"벽에 걸린 오래된 전쟁화 앞에서 다니엘이 잠시 걸음을 멈춘다.","options":[{"text":"그림을 살핀다.","response":"가문이 얻은 명예와 자신이 짊어진 기대가 겹쳐 보였다.","effects":{"resolve":1}},{"text":"고개를 돌린다.","response":"오늘만큼은 다른 생각을 하고 싶었다.","effects":{"reputation":1}}]}],"terrace":[{"speaker":"시종","text":"테라스의 촛대 하나가 바람에 꺼져 시종이 불을 다시 붙인다.","options":[{"text":"바람을 막아 준다.","response":"불꽃이 안정되자 시종이 안도의 숨을 내쉬었다.","effects":{"resolve":1}},{"text":"다른 촛대도 확인한다.","response":"멀리 놓인 촛불은 아직 밝았다.","effects":{"reputation":1}}]},{"speaker":"귀족","text":"한 손님이 밤하늘을 보며 달이 몇 개로 보이는지 농담을 던진다.","options":[{"text":"진지하게 셋이라고 답한다.","response":"손님이 웃자 다니엘은 뒤늦게 농담임을 깨달았다.","effects":{"resolve":1}},{"text":"가볍게 웃는다.","response":"그는 어색하지만 예의 바르게 미소 지었다.","effects":{"reputation":1}}]},{"speaker":"SYSTEM","text":"테라스 난간에 이슬이 맺혀 소매 끝이 차가워진다.","options":[{"text":"손을 거둔다.","response":"다니엘은 소매를 털고 자세를 고쳤다.","effects":{"resolve":1}},{"text":"정원을 내려다본다.","response":"멀리 꽃밭 사이로 등불이 보였다.","effects":{"reputation":1}}]},{"speaker":"경비병","text":"경비병이 난간에 너무 기대지 말아 달라고 부탁한다.","options":[{"text":"즉시 물러선다.","response":"“실례했습니다.” 다니엘은 고개를 숙였다.","effects":{"resolve":1}},{"text":"다른 손님에게도 알린다.","response":"경비병은 짧게 감사를 전했다.","effects":{"reputation":1}}]},{"speaker":"귀족","text":"손님이 테라스에서 들리는 음악이 유난히 부드럽다고 말한다.","options":[{"text":"귀 기울여 듣는다.","response":"현악기의 음이 바람에 실려 왔다.","effects":{"resolve":1}},{"text":"홀로 돌아갈까 고민한다.","response":"다니엘은 잠시 더 머무르기로 했다.","effects":{"reputation":1}}]},{"speaker":"SYSTEM","text":"세 달의 빛이 물 위에서 서로 다른 선을 만든다.","options":[{"text":"빛을 바라본다.","response":"오래도록 기억에 남을 풍경이었다.","effects":{"resolve":1}},{"text":"시계를 확인한다.","response":"시간이 생각보다 빨리 지나고 있었다.","effects":{"reputation":1}}]}],"drawing":[{"speaker":"시종","text":"시종이 식어 버린 차를 새것으로 바꾸어 주겠다고 한다.","options":[{"text":"감사를 전한다.","response":"“신경 써 주셔서 감사합니다.”","effects":{"resolve":1}},{"text":"그대로 두겠다고 한다.","response":"다니엘은 남은 차를 조용히 마셨다.","effects":{"reputation":1}}]},{"speaker":"귀족","text":"귀족이 읽다 만 책의 마지막 장을 찾지 못해 난감해한다.","options":[{"text":"책장을 확인한다.","response":"마지막 장은 책갈피 아래에 접혀 있었다.","effects":{"resolve":1}},{"text":"다른 책을 권한다.","response":"귀족은 새 책을 고르러 일어섰다.","effects":{"reputation":1}}]},{"speaker":"SYSTEM","text":"벽난로 옆 의자가 잠시 비었다.","options":[{"text":"앉아 숨을 고른다.","response":"다니엘은 잠깐 눈을 감았다.","effects":{"resolve":1}},{"text":"서서 기다린다.","response":"그는 어색하게 두 손을 모았다.","effects":{"reputation":1}}]},{"speaker":"귀족 부인","text":"귀족 부인이 향이 강한 차와 연한 차 중 무엇이 좋은지 묻는다.","options":[{"text":"연한 차를 고른다.","response":"“저는…… 연한 쪽이 좋겠습니다.”","effects":{"resolve":1}},{"text":"상대의 취향을 묻는다.","response":"부인은 자신의 차 이야기를 길게 들려주었다.","effects":{"reputation":1}}]},{"speaker":"시종","text":"시종이 떨어진 찻숟가락을 새것으로 교체하고 있다.","options":[{"text":"옆으로 물러선다.","response":"다니엘은 작업을 방해하지 않도록 자리를 비켰다.","effects":{"resolve":1}},{"text":"괜찮은지 묻는다.","response":"“다친 곳은 없습니다.” 시종이 답했다.","effects":{"reputation":1}}]},{"speaker":"SYSTEM","text":"응접실 구석의 작은 체스판이 아직 정리되지 않았다.","options":[{"text":"말을 제자리에 놓는다.","response":"다니엘은 규칙을 더듬으며 말을 가지런히 세웠다.","effects":{"resolve":1}},{"text":"그대로 둔다.","response":"누군가 다시 돌아와 대국을 이어 갈지도 모른다.","effects":{"reputation":1}}]}],"garden":[{"speaker":"정원사","text":"정원사가 물을 준 화분의 이름표를 바꿔 달고 있다.","options":[{"text":"이름을 물어본다.","response":"정원사는 꽃의 이름을 친절히 알려 주었다.","effects":{"resolve":1}},{"text":"방해하지 않는다.","response":"다니엘은 흙이 묻지 않도록 옷자락을 들었다.","effects":{"reputation":1}}]},{"speaker":"SYSTEM","text":"바람에 노란 장미 한 송이가 흔들린다.","options":[{"text":"꽃을 살핀다.","response":"다니엘은 코트리먼 영지의 장미화원을 떠올렸다.","effects":{"resolve":1}},{"text":"걸음을 옮긴다.","response":"향기가 한동안 뒤를 따라왔다.","effects":{"reputation":1}}]},{"speaker":"시종","text":"시종이 정원 길목에 작은 등불을 걸고 있다.","options":[{"text":"등불을 받쳐 준다.","response":"등불이 곧게 걸리자 시종이 웃었다.","effects":{"resolve":1}},{"text":"다른 길을 이용한다.","response":"다니엘은 작업 중인 길을 피해 돌아갔다.","effects":{"reputation":1}}]},{"speaker":"귀족","text":"손님이 정원 길을 잘못 들어 같은 분수를 두 번 봤다고 한다.","options":[{"text":"지도를 함께 본다.","response":"다니엘은 지도에 표시된 분수를 손가락으로 짚었다.","effects":{"resolve":1}},{"text":"자신도 길을 헤맸다고 말한다.","response":"두 사람은 잠시 민망하게 웃었다.","effects":{"reputation":1}}]},{"speaker":"정원사","text":"정원사가 밤에 피는 꽃을 소개하며 조용히 해 달라고 부탁한다.","options":[{"text":"목소리를 낮춘다.","response":"다니엘은 숨소리까지 조심하며 꽃을 살폈다.","effects":{"resolve":1}},{"text":"조용히 자리를 뜬다.","response":"그는 정원사에게 작게 인사했다.","effects":{"reputation":1}}]},{"speaker":"SYSTEM","text":"정원 벤치 위에 접힌 담요가 놓여 있다.","options":[{"text":"시종에게 알려 준다.","response":"시종이 담요를 정리하러 왔다.","effects":{"resolve":1}},{"text":"그대로 지나친다.","response":"밤공기가 생각보다 서늘했다.","effects":{"reputation":1}}]}]};
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


// v23: optional persistent story extensions, separate from official canon.
const V23_REWARDS={
 hall:{name:'악단 보조',gift:'악단 보조는 공연 순서가 적힌 작은 종이를 건넸다. “덕분에 무사히 연주했습니다. 다음 공연이 시작될 때 이걸 보시면 편할 겁니다.”',token:'연주 순서 메모'},
 corridor:{name:'견습 시종',gift:'견습 시종은 손때 묻은 황궁 약도를 내밀었다. “제가 다시 그려 본 겁니다. 경께서도 길을 찾으실 때 쓰십시오.”',token:'손그림 약도'},
 terrace:{name:'화분 담당 시종',gift:'화분 담당 시종은 잘 말린 보랏빛 압화를 내밀었다. “장식으로 쓰셔도 좋겠습니다. 무거운 선물은 아닙니다.”',token:'보랏빛 압화'},
 drawing:{name:'차 담당 시종',gift:'차 담당 시종은 향이 은은한 찻잎 한 봉지를 건넸다. “부담 없는 감사의 표시입니다.”',token:'작은 찻잎 봉투'},
 garden:{name:'정원사',gift:'정원사는 조심스럽게 잘라 둔 노란 장미 한 송이를 건넸다. “길을 정돈해 주신 분께 드리고 싶었습니다.”',token:'노란 장미 한 송이'}
};
function v23Data(){
 if(!state.v23||typeof state.v23!=='object')state.v23={miguelArc:{},npcRewards:{},alexAfter:{},emotionChoices:{},recollections:[]};
 const d=state.v23;d.miguelArc||={};d.npcRewards||={};d.alexAfter||={};d.emotionChoices||={};d.recollections||=[];return d;
}
function v23Remember(id,title,text,category='관계'){
 v18Remember('v23_'+id,title,text,category);
 const d=v23Data();if(!d.recollections.some(x=>x.id===id))d.recollections.push({id,title,day:state.day,category});
}
function v23MiguelArc(loc){
 if(!['terrace','drawing','garden'].includes(loc))return false;
 const d=v23Data(),s=state.stats,meet=socialProgress().miguelMeetings;
 const phase=meet>=7&&s.affection>=13&&s.trust>=11?'boundaries':meet>=4&&s.trust>=6?'recognition':null;
 if(!phase||d.miguelArc[phase])return false;
 d.miguelArc[phase]={day:state.day,loc};
 const text=phase==='recognition'?'미겔은 그가 다가오기 전에 책장을 덮었다. “레온하르트 경. 발소리만으로도 알아보게 되는군요.”\n\n다니엘은 순간 말을 잃었다. 기뻐해도 되는 말인지조차 쉽게 판단할 수 없었다. “……기억해 주셔서 감사합니다.”':'미겔은 한동안 말을 고르다가 조용히 입을 열었다. “알렉과 제 약혼은 변함없습니다. 경께서도 알고 계시겠지요.”\n\n“예, 알고 있습니다.” 다니엘은 겨우 대답했다. 마음이 흔들린다고 해서 지켜야 할 예의가 사라지는 것은 아니었다.';
 v23Remember('miguel_'+phase,phase==='recognition'?'익숙해진 발걸음':'넘지 말아야 할 선',text);
 return v18Scene('v23miguel','미겔 코트리먼',text,phase==='recognition'?[{text:'“……제가 무례하게 굴지는 않았습니까?”',next:'explore',effects:{trust:2},v23Emotion:'careful'},{text:'“그렇게 말씀해 주시니 기쁩니다.”',next:'explore',effects:{affection:1,resolve:1},v23Emotion:'hope'}]:[{text:'“예. 형님과의 약속을 존중하겠습니다.”',next:'explore',effects:{trust:2,resolve:2},v23Emotion:'restraint'},{text:'“……제 마음을 정리할 시간이 필요합니다.”',next:'explore',effects:{resolve:1,risk:1},v23Emotion:'conflict'}]);
}
function v23NpcReward(loc){
 const d=v23Data(),npc=v19Data().npc[loc],deep=v22Data().npcDeep[loc],def=V23_REWARDS[loc];
 if(!def||!deep||!npc||(npc.rapport||0)<4||d.npcRewards[loc]||state.day<=deep.day)return false;
 d.npcRewards[loc]={day:state.day,item:def.token};
 const text=def.gift+'\n\n다니엘은 사양하려다 상대의 정성을 생각해 두 손으로 받았다.';
 v23Remember('npc_'+loc,'감사의 표시 · '+def.name,text,'의뢰');
 return v18Scene('v23reward',def.name,text,[{text:'“정말 감사합니다. 소중히 간직하겠습니다.”',next:'explore',effects:{reputation:1,trust:1}},{text:'“과분한 선물입니다. 마음만으로도 충분합니다.”',next:'explore',effects:{resolve:1,reputation:1}}]);
}
function v23AlexAfter(loc){
 const d=v23Data(),past=v22Data().alexConflict;
 const tier=past.high?'high':past.medium?'medium':null;
 if(!tier||d.alexAfter[tier]||state.day<=past[tier].day)return false;
 d.alexAfter[tier]={day:state.day,loc};
 const text=tier==='high'?'형과 눈이 마주쳤다. 전날의 어색한 대화가 다시 떠올랐다. 알렉은 곧장 추궁하지 않았다. “다니엘, 오늘은 좀 나아졌느냐?”\n\n그 배려가 오히려 마음을 무겁게 했다.':'알렉은 지나가던 다니엘을 잠시 불렀다. “어제는 표정이 좋지 않더구나.”\n\n다니엘은 자신이 생각보다 쉽게 마음을 드러내는 사람이라는 사실을 깨달았다.';
 v23Remember('alex_'+tier,'형과 다시 마주한 날',text);
 return v18Scene('v23alex','알렉 레온하르트',text,[{text:'“걱정해 주셔서 감사합니다, 형님.”',next:'explore',effects:{reputation:1,resolve:1},v23Alex:'courtesy'},{text:'“제 경솔함을 돌아보고 있습니다.”',next:'explore',effects:{trust:1,resolve:2},v23Alex:'reflection'},{text:'“……아직 말씀드릴 준비가 되지 않았습니다.”',next:'explore',effects:{risk:1},v23Alex:'hesitation'}]);
}
function v23EmotionChoice(){
 const d=v23Data(),s=state.stats,t=socialProgress().alexTension;
 const mood=t>=8?'guilt':s.affection>=10?'hope':v18Data().emotion+v19Data().feelings<=-2?'doubt':'duty';
 const key=state.day+'_'+mood;if(d.emotionChoices[key]){modal('오늘의 마음','이미 오늘의 마음을 돌아보았습니다.');return;}
 const text={guilt:'형님은 내게 늘 형님이었다. 그 사실이 달라진 적은 없다. 그런데 어째서 나는 자꾸만 변명을 찾는 걸까.',hope:'다시 만나고 싶다. 그 바람을 인정하는 것만으로도 가슴이 뛰었다. 그러나 바람과 행동은 구분해야 했다.',doubt:'괜한 말을 하지는 않았을까. 상대의 짧은 침묵까지 내 탓으로 돌리는 버릇은 좀처럼 고쳐지지 않았다.',duty:'맡은 일부터 제대로 하자. 내가 할 수 있는 것을 해내는 것만큼은 포기하고 싶지 않다.'}[mood];
 return v18Scene('v23emotion','다니엘의 독백',text,[{text:'감정을 인정하되 예의를 지킨다.',next:'explore',effects:{resolve:2,trust:1},v23EmotionChoice:key,v23Emotion:'restraint'},{text:'당분간 마음을 가라앉히기로 한다.',next:'explore',effects:{resolve:1},v23EmotionChoice:key,v23Emotion:'distance'},{text:'그저 다음 인사를 기다린다.',next:'explore',effects:{affection:1,risk:1},v23EmotionChoice:key,v23Emotion:'hope'}]);
}
function v23Board(){
 const d=v23Data(),rewards=Object.values(d.npcRewards).map(x=>x.item);
 modal('v23 · 인연과 마음의 기록','[미겔과의 장기 사건] '+Object.keys(d.miguelArc).length+'/2\n[황궁 NPC 감사 선물] '+rewards.length+'/5'+(rewards.length?'\n'+rewards.join(' · '):'')+'\n[알렉과의 후속 대화] '+Object.keys(d.alexAfter).length+'/2\n[다니엘 감정 선택 기록] '+Object.keys(d.emotionChoices).length+'건\n[새로운 회상] '+d.recollections.length+'건');
}


// v24: delayed consequences and narrative continuity. Game-only events; official canon unchanged.
const V24_NPC_FOLLOW={
 hall:['악단 보조','연주 순서표를 기억한 악단 보조가 다니엘에게 다음 연주가 시작되기 전 조용히 자리를 알려 주었다.','그는 자신이 건넨 작은 종이가 실제로 도움이 되었다며 기뻐했다.'],
 corridor:['견습 시종','견습 시종이 손그림 약도에 잘못 그린 계단을 고쳐 놓았다. “경께 드린 지도라서 더 신경 쓰였습니다.”','다니엘은 상대가 자신의 일을 소홀히 여기지 않았음을 알았다.'],
 terrace:['화분 담당 시종','시종은 압화를 넣을 봉투를 건넸다. “바람에 꽃잎이 상하지 않았으면 해서요.”','손바닥만 한 종이 봉투가 그날의 작은 배려를 떠올리게 했다.'],
 drawing:['차 담당 시종','차 담당 시종이 찻잎을 우릴 물의 온도를 알려 주었다. “지난번에 드린 차는 오래 우리면 쓰거든요.”','다니엘은 그가 작은 선물까지 기억한다는 사실에 감사했다.'],
 garden:['정원사','정원사는 다니엘이 받은 장미의 줄기를 물에 담가 두라고 일러 주었다. “오래 두려면 끝을 조금 잘라 주십시오.”','꽃이 시들더라도 그날의 친절은 사라지지 않을 것이다.']
};
function v24Data(){
 if(!state.v24||typeof state.v24!=='object')state.v24={delayed:[],miguelMemory:[],npcFollow:{},alexArc:{},diary:[],lastDay:0,visitedToday:{}};
 const d=state.v24;d.delayed||=[];d.miguelMemory||=[];d.npcFollow||={};d.alexArc||={};d.diary||=[];d.visitedToday||={};return d;
}
function v24Record(id,title,body,category='관계'){
 v18Remember('v24_'+id,title,body,category);
}
function v24Choice(kind,mode){
 const d=v24Data();const day=state.day;
 if(kind==='miguel'){
  d.miguelMemory.push({day,mode});d.delayed.push({type:'miguel',day:day+2,mode,done:false});
  v24Record('miguel_choice_'+day+'_'+d.miguelMemory.length,'그날의 대답',mode==='courtesy'?'다니엘은 형의 약혼녀라는 사실을 잊지 않고 예의를 지켰다.':'다니엘은 자신의 망설임을 숨기지 못했다.');
 }else if(kind==='alex'){
  d.alexArc.last={day,mode};d.delayed.push({type:'alex',day:day+2,mode,done:false});
  socialProgress().alexTension=Math.max(0,Math.min(100,socialProgress().alexTension+(mode==='avoid'?1:-1)));
  v24Record('alex_choice_'+day,'형 앞에서의 태도',mode==='speak'?'다니엘은 형에게 정중하게 자신의 태도를 돌아보겠다고 말했다.':'다니엘은 끝내 시선을 피했다.');
 }
}
function v24Delayed(loc){
 const d=v24Data();const ev=d.delayed.find(x=>!x.done&&state.day>=x.day&&(x.type==='miguel'?loc==='garden'||loc==='terrace'||loc==='drawing':loc==='hall'||loc==='corridor'||loc==='drawing'));
 if(!ev)return false;
 ev.done=true;
 let text,who;
 if(ev.type==='miguel'){
  who='미겔 코트리먼';text=ev.mode==='courtesy'?'미겔은 지난번 다니엘이 한 발 물러서 인사하던 일을 기억하고 있었다. “그날 배려해 주신 일은 알고 있습니다, 레온하르트 경.”\n\n다니엘은 괜스레 손끝을 모았다. 사소한 예의를 기억해 주는 것이 기쁘면서도 부끄러웠다.':'미겔은 그의 머뭇거림을 기억하는 듯했다. “지난번에는 하시려던 말씀이 있으셨지요.”\n\n다니엘은 답을 찾지 못했다. 상대의 약혼을 떠올리는 순간 말은 더욱 무거워졌다.';
 }else{
  who='알렉 레온하르트';text=ev.mode==='speak'?'알렉은 지난번 동생이 신중하게 말을 고르던 모습을 기억했다. “다니엘, 무리해서 대답할 필요는 없다.”\n\n다니엘은 그 말에 오히려 책임을 느꼈다.':'알렉은 회랑에서 동생을 불러 세웠다. “요즘 나를 피하는 것 같구나.”\n\n다니엘은 부정하려다가, 그조차 변명이라는 생각에 입을 다물었다.';
 }
 v24Record('delayed_'+ev.type+'_'+ev.day+'_'+d.delayed.indexOf(ev),'며칠 뒤 돌아온 말',text);
 return v18Scene('v24delayed',who,text,[{text:'“말씀 감사합니다. 잊지 않겠습니다.”',next:'explore',effects:{resolve:1,trust:1}},{text:'“……조금 생각할 시간을 주십시오.”',next:'explore',effects:{resolve:1}}]);
}
function v24MiguelMemory(loc){
 if(!['terrace','drawing','garden'].includes(loc))return false;
 const d=v24Data(),prev=d.miguelMemory.at(-1);if(!prev||state.day<=prev.day||d.visitedToday['miguel_'+state.day])return false;
 d.visitedToday['miguel_'+state.day]=true;
 const text=prev.mode==='courtesy'?'미겔은 다니엘이 지난번처럼 한 걸음 거리를 두자 고개를 끄덕였다. “지난번에도 예의를 지켜 주셨지요.”\n\n그녀의 짧은 인정에 다니엘은 더 조심스럽게 자세를 바로잡았다.':'미겔은 그의 입술이 몇 번 열렸다 닫히는 것을 지켜보았다. “말씀하기 어려운 일이 있으십니까?”\n\n다니엘은 그날 자신이 말을 끝맺지 못한 일을 떠올렸다.';
 v24Record('memory_'+state.day,'이전의 대답을 기억하는 사람',text);
 return v18Scene('v24memory','미겔 코트리먼',text,[{text:'“제게 베풀어 주신 배려를 기억하겠습니다.”',next:'explore',effects:{trust:1},v24Choice:'miguel',v24Mode:'courtesy'},{text:'“……저도 아직 마음을 정리하지 못했습니다.”',next:'explore',effects:{resolve:1,risk:1},v24Choice:'miguel',v24Mode:'hesitate'}]);
}
function v24NpcFollow(loc){
 const d=v24Data(),gift=v23Data().npcRewards[loc],def=V24_NPC_FOLLOW[loc];if(!gift||!def||state.day<=gift.day||d.npcFollow[loc])return false;
 d.npcFollow[loc]={day:state.day};const text=def[1]+'\n\n'+def[2];v24Record('gift_'+loc,'선물 이후 · '+def[0],text,'의뢰');
 return v18Scene('v24gift',def[0],text,[{text:'“덕분에 큰 도움이 되었습니다.”',next:'explore',effects:{reputation:1,resolve:1}},{text:'“저도 다음에 도움이 될 수 있으면 좋겠습니다.”',next:'explore',effects:{reputation:1,trust:1}}]);
}
function v24AlexArc(loc){
 const d=v24Data(),t=socialProgress().alexTension;
 if(t<6||d.alexArc['tier'+(t>=12?12:6)]||!['hall','corridor','drawing'].includes(loc))return false;
 const tier=t>=12?12:6;d.alexArc['tier'+tier]={day:state.day,loc};
 const text=tier===12?'알렉은 한참이나 다니엘을 살피다가 입을 열었다. “요즘 네가 무엇을 걱정하는지 모르겠구나.”\n\n다니엘은 형의 시선을 마주하지 못했다. 설명할 수 없는 마음을 가진 것 자체가 부끄러웠다.':'알렉은 다니엘의 굳은 어깨를 보고 물었다. “무도회가 불편하냐?”\n\n다니엘은 대답하기 전에 옷깃을 고쳐 잡았다. 형이 걱정할 만큼 티가 났던 걸까.';
 v24Record('alex_arc_'+tier,'형이 알아챈 망설임',text);
 return v18Scene('v24alex','알렉 레온하르트',text,[{text:'“제 태도가 경솔했습니다. 조심하겠습니다.”',next:'explore',effects:{resolve:2},v24Choice:'alex',v24Mode:'speak'},{text:'“……별일 아닙니다, 형님.”',next:'explore',effects:{risk:1},v24Choice:'alex',v24Mode:'avoid'}]);
}
function v24Diary(){
 const d=v24Data();if(d.lastDay===state.day){modal('감정의 흐름','오늘은 이미 기록했습니다. 다른 날에 다시 기록해 주세요.');return;}
 const s=state.stats,entry={day:state.day,affection:s.affection,trust:s.trust,resolve:s.resolve,risk:s.risk,tension:socialProgress().alexTension};
 const prior=d.diary.at(-1);d.diary.push(entry);d.lastDay=state.day;
 const delta=prior?'지난 기록과 비교: 호감 '+(entry.affection-prior.affection>=0?'+':'')+(entry.affection-prior.affection)+' · 신뢰 '+(entry.trust-prior.trust>=0?'+':'')+(entry.trust-prior.trust)+' · 결심 '+(entry.resolve-prior.resolve>=0?'+':'')+(entry.resolve-prior.resolve):'오늘이 첫 기록이다.';
 const prose=entry.tension>=10?'형님 앞에서는 아무 말도 제대로 할 수 없었다.':entry.affection>entry.trust?'그분을 다시 뵙고 싶다는 생각이 앞선다.':'서두르지 않는 편이 옳다. 내가 지켜야 할 예의가 있다.';
 const body='DAY '+state.day+'\n'+prose+'\n\n'+delta;v24Record('diary_'+state.day,'다니엘의 감정 흐름 · DAY '+state.day,body,'기타');modal('감정의 흐름',body);
}
function v24Board(){
 const d=v24Data(),pending=d.delayed.filter(x=>!x.done).length;
 modal('v24 · 이어지는 선택','며칠 뒤 돌아올 선택 '+pending+'건\n미겔과의 대답 기록 '+d.miguelMemory.length+'건\n선물 후속 사건 '+Object.keys(d.npcFollow).length+'/5\n알렉 갈등 장면 '+Object.keys(d.alexArc).filter(x=>x.startsWith('tier')).length+'/2\n날짜별 감정 기록 '+d.diary.length+'건\n\n기록된 선택은 다른 날의 대화에 반영됩니다.');
}

// v25: 장기 인연, 비밀 부탁, 형제 관계, 회고 (게임용 각색)
const V25_SECRETS={
 hall:{npc:'악단 보조',title:'낡은 악보의 여백',text:'악단 보조가 남들에게 보이지 않게 악보의 여백을 가리켰다. 다음 연주를 준비하던 누군가가 잘못된 음표를 적어 놓았다고 했다. 그는 누구의 실수인지 밝히기보다 공연을 무사히 끝내고 싶어 했다.',help:'다니엘은 조용히 악보를 대조해 잘못 적힌 부분을 찾았다. 누구의 이름도 거론하지 않았다.'},
 corridor:{npc:'견습 시종',title:'접힌 안내문',text:'견습 시종이 손님에게 전달할 안내문이 뒤섞였다고 털어놓았다. 사소한 실수지만 연회장 안에서는 쉽게 소문이 될 수 있었다.',help:'다니엘은 봉투를 다시 분류하고 견습 시종에게 직접 전달할 기회를 남겨 주었다.'},
 terrace:{npc:'화분 담당 시종',title:'바람에 떨어진 표찰',text:'화분 담당 시종이 화분의 이름표를 잃어버렸다며 작은 목소리로 도움을 청했다. 이름표가 없으면 정원으로 돌려보낼 꽃을 구분하기 어려웠다.',help:'다니엘은 꽃의 모양과 옮겨 온 순서를 대조해 표찰을 찾아 주었다.'},
 drawing:{npc:'차 담당 시종',title:'바뀐 찻잎 상자',text:'차 담당 시종은 손님에게 낼 찻잎 상자가 뒤바뀌었다며 난처해했다. 누구에게 책임을 돌릴 생각은 없다고 했다.',help:'다니엘은 찻잎의 향을 확인하고 상자를 제자리에 놓는 일을 거들었다.'},
 garden:{npc:'정원사',title:'아직 피지 않은 장미',text:'정원사가 온실의 어린 장미를 잠시 살펴봐 달라고 했다. 귀한 꽃이라서가 아니라, 오늘 밤 바람이 너무 차가웠기 때문이다.',help:'다니엘은 창문 틈을 살피고 정원사와 함께 어린 장미를 보호했다.'}
};
function v25Data(){
 if(!state.v25||typeof state.v25!=='object')state.v25={secret:{},bond:{},alex:{suspicion:0,scenes:[],lastResponse:null},dailyLinks:[],retrospections:[],seen:{}};
 const d=state.v25;d.secret||={};d.bond||={};d.alex||={suspicion:0,scenes:[],lastResponse:null};d.alex.scenes||=[];d.dailyLinks||=[];d.retrospections||=[];d.seen||={};return d;
}
function v25Remember(id,title,body,category='관계'){v18Remember('v25_'+id,title,body,category);}
function v25Outcome(choice){
 const d=v25Data();
 if(choice.v25Secret){const x=d.secret[choice.v25Secret];if(x){x.status=choice.v25Mode;x.finishedDay=state.day;const def=V25_SECRETS[choice.v25Secret];v25Remember('secret_'+choice.v25Secret,def.title,choice.v25Mode==='help'?def.help:'다니엘은 사정을 듣고도 정중히 사양했다. 누군가를 함부로 탓하지 않기로 했다.','의뢰');}}
 if(choice.v25Bond){d.bond[choice.v25Bond]={day:state.day,mode:choice.v25Mode};v25Remember('bond_'+state.day+'_'+choice.v25Bond,'미겔과의 거리',choice.v25Mode==='care'?'다니엘은 조심스럽게 마음을 드러내되 상대가 지켜야 할 선을 존중했다.':'다니엘은 형과 미겔의 약혼을 떠올리고 자신의 마음을 삼켰다.');}
 if(choice.v25Alex){d.alex.lastResponse=choice.v25Alex;d.alex.suspicion=Math.max(0,Math.min(12,d.alex.suspicion+(choice.v25Alex==='avoid'?2:choice.v25Alex==='truth'?1:-1)));v25Remember('alex_'+state.day+'_'+d.alex.scenes.length,'형 앞에서 고른 말',choice.v25Alex==='avoid'?'다니엘은 말을 피했다. 형의 침묵이 오래 남았다.':choice.v25Alex==='truth'?'다니엘은 자신의 불안함만큼은 솔직히 인정했다.':'다니엘은 형의 말을 듣고 성급한 해명을 삼갔다.');}
}
function v25BondScene(loc){
 if(!['garden','terrace','drawing'].includes(loc))return false;
 const d=v25Data(),s=state.stats,meet=socialProgress().miguelMeetings;
 const tier=meet>=8&&s.trust>=9&&s.affection>=8?3:meet>=5&&s.trust>=5?2:meet>=3?1:0;
 if(!tier||d.seen['bond_'+tier]||!d.bond['tier'+(tier-1)]&&tier>1)return false;
 d.seen['bond_'+tier]=state.day;
 const prev=d.bond['tier'+(tier-1)];
 const texts={1:'미겔은 다니엘의 발소리를 듣고 시선을 들었다. “오늘도 같은 걸음으로 오시는군요.”\n\n다니엘은 무심코 옷깃을 바로잡았다. 얼굴을 알아보는 것보다 먼저 그의 걸음을 기억했다는 말이 오래 남았다.',2:'“지난번에는 말씀을 고르시더군요.” 미겔이 짧게 말했다.\n\n다니엘은 그때 자신이 어떤 말을 삼켰는지 기억했다. 그녀는 이유를 캐묻지 않았다. 그 침묵이 오히려 다니엘을 더 조심스럽게 했다.',3:'“레온하르트 경.” 미겔이 먼저 불렀다.\n\n그 이름이 낯설지 않게 들린다는 사실에 다니엘은 당황했다. 그러나 미겔은 알렉의 약혼녀였고, 그 사실은 오늘도 변하지 않았다.'};
 const text=texts[tier]+(prev?'\n\n지난번 다니엘의 태도 또한 두 사람 사이에 남아 있었다.':'');
 v25Remember('bond_scene_'+tier,'미겔 · 장기 관계 '+tier+'단계',text);
 return v18Scene('v25bond','미겔 코트리먼',text,[{text:'“말씀을 기억하겠습니다. 불편하시지 않도록 하겠습니다.”',next:'explore',effects:{trust:2,resolve:1},v25Bond:tier,v25Mode:'care'},{text:'“……실례했습니다. 제 분수를 잊지 않겠습니다.”',next:'explore',effects:{resolve:2},v25Bond:tier,v25Mode:'distance'}]);
}
function v25SecretEvent(loc){
 const d=v25Data(),def=V25_SECRETS[loc],npc=v19Data().npc[loc];if(!def||!npc||npc.rapport<3)return false;
 const x=d.secret[loc];
 if(!x){d.secret[loc]={status:'offered',day:state.day};return v18Scene('v25secret',def.npc,def.text,[{text:'“제가 도와드리겠습니다. 조용히 처리하지요.”',next:'explore',effects:{resolve:1},v25Secret:loc,v25Mode:'help'},{text:'“죄송합니다. 지금은 어렵겠습니다.”',next:'explore',v25Secret:loc,v25Mode:'decline'}]);}
 if(x.status==='help'&&state.day>x.finishedDay&&!x.followup){x.followup=true;const text=def.help+'\n\n“지난번 일은 덕분에 잘 끝났습니다.” 시종은 다른 사람의 눈을 피해 짧게 감사 인사를 건넸다.';v25Remember('secret_after_'+loc,'비밀 부탁의 후일담 · '+def.title,text,'의뢰');return v18Scene('v25secretAfter',def.npc,text,[{text:'“잘 해결되어 다행입니다.”',next:'explore',effects:{reputation:1}}]);}
 return false;
}
function v25AlexScene(loc){
 if(!['hall','corridor','drawing'].includes(loc))return false;
 const d=v25Data(),t=socialProgress().alexTension+d.alex.suspicion;
 const tier=t>=14?3:t>=9?2:t>=5?1:0;
 if(!tier||d.alex.scenes.includes(tier)||tier>1&&!d.alex.scenes.includes(tier-1))return false;
 d.alex.scenes.push(tier);
 const lines={1:'알렉은 동생의 표정을 잠시 살폈다. “다니엘, 오늘은 무슨 일이 있느냐?”\n\n그 물음이 다정한지 엄격한지 판단하기도 전에 다니엘은 자세를 바로잡았다.',2:'“요즘 네가 말을 아끼는구나.” 알렉의 말에 다니엘은 손끝을 굳혔다.\n\n형이 무엇을 알고 있는지 알 수 없었다. 그러나 짐작만으로 상대를 탓할 수는 없었다.',3:'알렉은 동생이 물러서려는 것을 보고 조용히 불렀다. “잠깐만, 다니엘.”\n\n형제 사이에 길어진 침묵이 있었다. 다니엘은 아직 자신의 감정을 어떻게 설명해야 할지 몰랐다.'};
 v25Remember('alex_scene_'+tier,'형제 사이에 남은 말 · '+tier+'단계',lines[tier]);
 return v18Scene('v25alex','알렉 레온하르트',lines[tier],[{text:'“……제가 불안한 일이 조금 있습니다.”',next:'explore',effects:{resolve:1},v25Alex:'truth'},{text:'“형님 말씀을 듣겠습니다.”',next:'explore',effects:{trust:1},v25Alex:'listen'},{text:'“죄송합니다. 지금은 말씀드리기 어렵습니다.”',next:'explore',effects:{risk:1},v25Alex:'avoid'}]);
}
function v25LinkDay(){
 const d=v25Data();if(d.dailyLinks.some(x=>x.day===state.day))return;
 const yesterday=d.dailyLinks.at(-1),s=state.stats;
 const mood=socialProgress().alexTension>=10?'형님과 마주한 침묵이 마음을 무겁게 했다.':s.affection>s.trust?'다시 만나고 싶다는 생각이 먼저 들었다.':'서두르지 않고 예의를 지키려 했다.';
 const line='DAY '+state.day+' · '+mood+(yesterday?'\n전날의 기록: '+yesterday.mood:'\n첫 기록은 아직 서툴렀다.');
 d.dailyLinks.push({day:state.day,mood,affection:s.affection,trust:s.trust,tension:socialProgress().alexTension});
 v25Remember('daily_'+state.day,'이어지는 하루 · DAY '+state.day,line,'기타');
}
function v25Retrospect(){
 const d=v25Data();v25LinkDay();const entries=d.dailyLinks.slice(-7);
 const lines=entries.map((x,i)=>'DAY '+x.day+' · '+x.mood+'\n호감 '+x.affection+' / 신뢰 '+x.trust+' / 형제 긴장 '+x.tension+(i?'\n이전 기록 대비 호감 '+(x.affection-entries[i-1].affection>=0?'+':'')+(x.affection-entries[i-1].affection):'')).join('\n\n');
 const summary='최근 '+entries.length+'일의 마음을 되짚었다. 달라진 것이 없다고 믿고 싶었지만, 매일의 작은 선택은 분명히 남아 있었다.';
 if(!d.retrospections.includes(state.day)){d.retrospections.push(state.day);v25Remember('review_'+state.day,'다니엘의 회고 · DAY '+state.day,summary+'\n\n'+lines,'기타');}
 modal('다니엘의 회고 · 날짜별 기록',summary+'\n\n'+lines);
}
function v25Board(){const d=v25Data();modal('v25 · 장기 서사 수첩','미겔 관계 단계 '+Object.keys(d.bond).length+'/3\nNPC 비밀 부탁 '+Object.keys(d.secret).length+'/5\n형제 갈등 장면 '+d.alex.scenes.length+'/3\n의심의 누적 '+d.alex.suspicion+'\n날짜별 기록 '+d.dailyLinks.length+'일\n\n새로운 부탁은 NPC 친밀도 3 이상일 때 등장합니다.');}


// v26: delayed relationship consequences, secret-errand outcomes, sibling trust and chronological memoirs.
// These events are game-only adaptations; none changes the official engagement.
function v26Data(){
 if(!state.v26||typeof state.v26!=='object')state.v26={miguel:{pending:[],resolved:[]},secret:{},alex:{trust:0,history:[],seen:{}},days:[],seen:{}};
 const d=state.v26;d.miguel||={pending:[],resolved:[]};d.miguel.pending||=[];d.miguel.resolved||=[];d.secret||={};d.alex||={trust:0,history:[],seen:{}};d.alex.history||=[];d.alex.seen||={};d.days||=[];d.seen||={};return d;
}
function v26Record(id,title,text,category='관계'){v18Remember('v26_'+id,title,text,category);}
function v26Outcome(choice){
 const d=v26Data();
 if(choice.v25Bond){
  const mode=choice.v25Mode==='care'?'care':'distance';
  const key='tier'+choice.v25Bond;
  if(!d.miguel.pending.some(x=>x.key===key)&&!d.miguel.resolved.includes(key))d.miguel.pending.push({key,mode,day:state.day,due:state.day+1});
 }
 if(choice.v25Secret){
  const loc=choice.v25Secret,mode=choice.v25Mode;
  if(!d.secret[loc])d.secret[loc]={mode,day:state.day,stage:'pending'};
 }
 if(choice.v25Alex){
  const delta=choice.v25Alex==='listen'?2:choice.v25Alex==='truth'?1:-2;
  d.alex.trust=Math.max(-10,Math.min(10,d.alex.trust+delta));
  d.alex.history.push({day:state.day,mode:choice.v25Alex,trust:d.alex.trust});
 }
}
function v26MiguelFollow(loc){
 if(!['garden','terrace','drawing'].includes(loc))return false;
 const d=v26Data(),i=d.miguel.pending.findIndex(x=>state.day>=x.due);
 if(i<0)return false;
 const x=d.miguel.pending.splice(i,1)[0];d.miguel.resolved.push(x.key);
 const careful=x.mode==='care';
 const body=careful?'미겔은 다니엘의 발소리를 알아차리고 먼저 말을 건넸다. “지난번 말씀은 기억하고 있습니다. 제게 무례한 일은 아니었어요.”\n\n다니엘은 안도의 숨을 삼켰다. 그 말이 자신에게 얼마나 큰 의미인지 밝힐 수는 없었다.':'미겔은 다니엘이 멈춰 선 거리를 살피더니 고개를 끄덕였다. “지난번에는 조금 난처하셨던 모양이군요.”\n\n다니엘은 형의 약혼녀 앞에서 지켜야 할 예의를 다시 떠올렸다. 미겔은 더 묻지 않았다.';
 v26Record('miguel_'+x.key,'미겔이 기억한 대답 · '+x.key,body);
 return v18Scene('v26miguel','미겔 코트리먼',body,careful?[{text:'“그렇게 말씀해 주셔서 감사합니다.”',next:'explore',effects:{trust:1,resolve:1}},{text:'“……제가 너무 많은 말씀을 드렸습니다.”',next:'explore',effects:{resolve:1}}]:[{text:'“배려해 주셔서 감사합니다.”',next:'explore',effects:{trust:1}},{text:'“앞으로는 더욱 조심하겠습니다.”',next:'explore',effects:{resolve:1}}]);
}
function v26SecretFollow(loc){
 const d=v26Data(),q=d.secret[loc],def=V25_SECRETS[loc];
 if(!q||!def||q.stage!=='pending'||state.day<=q.day)return false;
 q.stage='shown';
 const helped=q.mode==='help';
 const body=helped?def.help+'\n\n며칠이 지나 시종은 다니엘을 알아보고 가볍게 고개를 숙였다. “그날 조용히 도와주신 덕분에 아무도 곤란해지지 않았습니다.”':'시종은 다시 다니엘과 마주쳤지만, 이전의 부탁을 꺼내지 않았다. 다니엘은 그때 거절한 이유가 있었음을 알면서도 마음 한구석이 불편했다.';
 v26Record('secret_'+loc,'비밀 부탁의 결과 · '+def.title,body,'의뢰');
 return v18Scene('v26secret',def.npc,body,helped?[{text:'“도움이 되었다니 다행입니다.”',next:'explore',effects:{reputation:1},v26Secret:loc,v26Mode:'modest'},{text:'“앞으로도 어려운 일이 있으면 말씀하십시오.”',next:'explore',effects:{trust:1},v26Secret:loc,v26Mode:'kind'}]:[{text:'“그때는 도와드리지 못해 죄송합니다.”',next:'explore',effects:{resolve:1},v26Secret:loc,v26Mode:'apology'},{text:'말없이 예를 갖추고 물러난다.',next:'explore',v26Secret:loc,v26Mode:'quiet'}]);
}
function v26AlexFollow(loc){
 if(!['hall','corridor','drawing'].includes(loc))return false;
 const d=v26Data(),last=d.alex.history.at(-1);
 if(!last||state.day<=last.day||d.alex.seen[last.day+'_'+last.mode])return false;
 const key=last.day+'_'+last.mode;d.alex.seen[key]=true;
 const body=last.mode==='avoid'?'알렉은 다니엘을 불러 세웠다. “그날은 네가 말을 피했지.”\n\n다니엘은 목이 메었다. 형이 자신의 속마음을 알고 있다고 단정할 수는 없었다.':'알렉은 잠시 동생을 바라보다가 말했다. “지난번에는 네 말을 들었다. 오늘은 좀 나아졌느냐?”\n\n다니엘은 형이 자신을 걱정한다는 사실에 오히려 더 죄책감을 느꼈다.';
 v26Record('alex_'+key,'형제 사이의 다음 날',body);
 return v18Scene('v26alex','알렉 레온하르트',body,[{text:'“형님, 걱정을 끼쳐 드려 죄송합니다.”',next:'explore',effects:{resolve:1},v26Alex:'apologize'},{text:'“제게 생각할 시간을 조금만 주십시오.”',next:'explore',effects:{trust:1},v26Alex:'time'}]);
}
function v26DailyLink(){
 const d=v26Data();if(d.days.some(x=>x.day===state.day))return;
 const s=state.stats,old=d.days.at(-1),bond=d.miguel.resolved.length,secret=Object.values(d.secret).filter(x=>x.stage!=='pending').length;
 const note=old?'전날의 망설임은 사라지지 않았다. 그러나 선택의 결과가 오늘의 대화에 조금씩 스며들고 있었다.':'다니엘은 아직 자신이 무엇을 기다리는지 확신하지 못했다.';
 const entry={day:state.day,affection:s.affection,trust:s.trust,resolve:s.resolve,alexTrust:d.alex.trust,bond,secret,note};d.days.push(entry);
 v26Record('day_'+state.day,'사건과 마음 · DAY '+state.day,note+'\n미겔과의 후속 만남 '+bond+'건 / NPC 결과 '+secret+'건 / 형제 신뢰 '+d.alex.trust,'기타');
}
function v26Timeline(){
 const memories=v16Data().memories||[];
 const wrap=document.createElement('div');
 const hint=document.createElement('p');hint.className='hint';hint.textContent='기존 기록까지 포함한 시간순 회상입니다. 날짜가 같은 경우 기록된 순서대로 표시합니다.';wrap.append(hint);
 const select=document.createElement('select');for(const [value,label] of [['new','오래된 순'],['old','최근 순']]){const o=document.createElement('option');o.value=value;o.textContent=label;select.append(o)}wrap.append(select);
 const list=document.createElement('div');wrap.append(list);
 function paint(){list.replaceChildren();const entries=memories.map((m,i)=>({...m,_index:i})).sort((a,b)=>Number(a.day||0)-Number(b.day||0)||a._index-b._index);if(select.value==='old')entries.reverse();if(!entries.length){const p=document.createElement('p');p.textContent='아직 기록된 회상이 없습니다.';list.append(p)}for(const m of entries){const b=document.createElement('button');b.textContent='DAY '+(m.day||'?')+' · '+m.title;b.onclick=()=>modal('회상 · '+m.title,m.text||'기록된 내용이 없습니다.');list.append(b)}}
 select.onchange=paint;paint();modal('회상 · 시간순 열람',wrap);
}
function v26Board(){const d=v26Data();modal('v26 · 이어지는 선택','미겔 후속 대화 '+d.miguel.resolved.length+'건 / 대기 '+d.miguel.pending.length+'건\nNPC 비밀 부탁 결과 '+Object.values(d.secret).filter(x=>x.stage!=='pending').length+'건\n형제 신뢰 '+d.alex.trust+' / 대화 기록 '+d.alex.history.length+'건\n연결된 날짜 기록 '+d.days.length+'일\n\n후속 사건은 선택 다음 날 이후 해당 인물을 만나는 장소에서 나타납니다.');}


// v27: lasting emotions, NPC consequences, sibling reconciliation, delayed events and character-indexed memoirs.
function v27Data(){
 if(!state.v27||typeof state.v27!=='object')state.v27={miguel:{decisions:[],seen:{}},npc:{},alex:{history:[],seen:{}},delayed:[],completed:[],daily:{}};
 const d=state.v27;d.miguel||={decisions:[],seen:{}};d.miguel.decisions||=[];d.miguel.seen||={};d.npc||={};d.alex||={history:[],seen:{}};d.alex.history||=[];d.alex.seen||={};d.delayed||=[];d.completed||=[];d.daily||={};return d;
}
function v27Record(id,title,body,category='관계',person='다니엘'){
 v18Remember('v27_'+id,title,body,category);
 const m=v16Data().memories.find(x=>x.id==='v27_'+id);if(m)m.person=person;
}
function v27OnChoice(choice){
 const d=v27Data();
 if(choice.v25Bond){const mode=choice.v25Mode==='care'?'care':'distance';d.miguel.decisions.push({day:state.day,mode,tier:choice.v25Bond});d.delayed.push({id:'miguel_'+state.day+'_'+choice.v25Bond,due:state.day+2,type:'miguel',mode});}
 if(choice.v25Secret){const loc=choice.v25Secret,mode=choice.v25Mode;d.npc[loc]={mode,day:state.day,rapport:mode==='help'?1:-1,seen:false};d.delayed.push({id:'npc_'+loc,due:state.day+2,type:'npc',loc,mode});}
 if(choice.v25Alex){const mode=choice.v25Alex;d.alex.history.push({day:state.day,mode});d.delayed.push({id:'alex_'+state.day+'_'+d.alex.history.length,due:state.day+2,type:'alex',mode});}
 if(choice.v26Alex){d.alex.history.push({day:state.day,mode:choice.v26Alex});}
}
function v27Follow(loc,person){
 const d=v27Data();const i=d.delayed.findIndex(x=>state.day>=x.due&&((person==='miguel'&&x.type==='miguel')||(person==='alex'&&x.type==='alex')||(person==='npc'&&x.type==='npc'&&x.loc===loc)));
 if(i<0)return false;
 const x=d.delayed.splice(i,1)[0];if(d.completed.includes(x.id))return false;d.completed.push(x.id);
 if(x.type==='miguel'){
  const gentle=x.mode==='care';const body=gentle?'“그날 말씀하신 것은 기억하고 있습니다.” 미겔은 다니엘의 옷깃에 잠시 시선을 두었다. “상대를 배려하는 일과 스스로를 숨기는 일은 다르겠지요.”\n\n다니엘은 대답을 고르다가 입을 다물었다. 알렉의 약혼녀 앞에서 마음을 가벼이 내보일 수는 없었다.':'“거리를 두겠다고 하셨지요.” 미겔이 담담하게 말했다. “그 뜻을 존중하겠습니다.”\n\n다니엘은 오히려 그 말에 가슴이 저렸다. 제 입으로 정한 선이니 누구를 원망할 수도 없었다.';
  v27Record(x.id,'미겔 · 며칠 뒤의 대답',body,'관계','미겔');return v18Scene('v27miguel','미겔 코트리먼',body,[{text:'“기억해 주셔서 감사합니다.”',next:'explore',effects:{trust:1}},{text:'“……제가 경솔했습니다.”',next:'explore',effects:{resolve:1}}]);
 }
 if(x.type==='alex'){
  const restore=['listen','truth','apologize','time'].includes(x.mode);const body=restore?'알렉은 동생을 잠시 바라보다가 낮게 물었다. “요즘은 좀 괜찮으냐.”\n\n다니엘은 선뜻 대답하지 못했다. 그래도 형이 먼저 말을 건넨 사실만큼은 놓치고 싶지 않았다.':'“또 말을 피할 생각이냐.” 알렉의 물음은 짧았다.\n\n다니엘은 손끝을 굳혔다. 형의 의심이 전부 오해라고 말할 자신도 없었다.';
  v26Data().alex.trust=Math.max(-10,Math.min(10,v26Data().alex.trust+(restore?1:-1)));
  v27Record(x.id,'알렉 · 늦게 돌아온 물음',body,'관계','알렉');return v18Scene('v27alex','알렉 레온하르트',body,[{text:'“형님, 제 말을 들어 주시겠습니까.”',next:'explore',effects:{resolve:1},v27Alex:'repair'},{text:'“……죄송합니다. 아직 정리가 되지 않았습니다.”',next:'explore',effects:{risk:1},v27Alex:'withdraw'}]);
 }
 const def=V25_SECRETS[x.loc];if(!def)return false;
 const helped=x.mode==='help';const body=helped?def.npc+'은 다니엘을 알아보고 작은 목례를 했다. 지난번의 부탁이 무사히 끝난 뒤 다른 시종들도 한결 안심한 눈치였다.':'다니엘이 다가가자 '+def.npc+'은 예를 갖췄지만 먼저 말을 꺼내지 않았다. 그때 부탁을 거절한 일을 기억하고 있는 듯했다.';
 const npc=v19Data().npc[x.loc];if(npc)npc.rapport=Math.max(0,Math.min(10,(npc.rapport||0)+(helped?1:-1)));
 v27Record(x.id,'NPC · 선택의 후일담 · '+def.title,body,'의뢰',def.npc);return v18Scene('v27npc',def.npc,body,[{text:'“지난번 일은 마음에 두고 있었습니다.”',next:'explore',effects:{resolve:1}},{text:'조용히 인사하고 자리를 떠난다.',next:'explore'}]);
}
function v27Daily(){const d=v27Data();if(d.daily[state.day])return;const s=state.stats;d.daily[state.day]={affection:s.affection,trust:s.trust,resolve:s.resolve,alexTrust:v26Data().alex.trust};}
function v27Gallery(){
 const wrap=document.createElement('div');const note=document.createElement('p');note.className='hint';note.textContent='기존 회상과 신규 회상을 인물별로 분류합니다. 등장인물 이름은 기록의 내용에 따라 분류되며 공식 설정과는 별개입니다.';wrap.append(note);
 const select=document.createElement('select');for(const x of ['전체','다니엘','미겔','알렉','황궁 NPC']){const o=document.createElement('option');o.value=x;o.textContent=x;select.append(o)}wrap.append(select);
 const list=document.createElement('div');wrap.append(list);function person(m){if(m.person)return ['악단 보조','견습 시종','화분 담당 시종','차 담당 시종','정원사'].includes(m.person)?'황궁 NPC':m.person;const t=(m.title||'')+' '+(m.text||'');if(/미겔/.test(t))return '미겔';if(/알렉|형제|형님/.test(t))return '알렉';if(/시종|정원사|악단|부탁|의뢰/.test(t))return '황궁 NPC';return '다니엘'}
 function paint(){list.replaceChildren();const entries=(v16Data().memories||[]).map((m,i)=>({...m,_i:i})).filter(m=>select.value==='전체'||person(m)===select.value).sort((a,b)=>Number(a.day||0)-Number(b.day||0)||a._i-b._i);if(!entries.length){const x=document.createElement('p');x.textContent='아직 해당 인물의 회상이 없습니다.';list.append(x)}for(const m of entries){const b=document.createElement('button');b.textContent='DAY '+(m.day||'?')+' · '+m.title;b.onclick=()=>modal('회상 · '+m.title,m.text||'기록된 내용이 없습니다.');list.append(b)}}select.onchange=paint;paint();modal('회상 · 인물별 분류',wrap);
}
function v27Board(){const d=v27Data();modal('v27 · 며칠 뒤의 이야기','미겔 선택 기록 '+d.miguel.decisions.length+'건\nNPC 결과 '+Object.keys(d.npc).length+'건\n알렉 대화 기록 '+d.alex.history.length+'건\n완료된 후속 사건 '+d.completed.length+'건\n대기 중인 후속 사건 '+d.delayed.length+'건\n\n이전 선택의 결과는 이틀 뒤 해당 인물과 다시 만났을 때 나타납니다.');}


// v28: long-running emotional consequences and searchable memories.
function v28Data(){
 if(!state.v28||typeof state.v28!=='object')state.v28={seen:{},emotion:[],alex:{resolved:0},npc:{},chapters:{},searches:0};
 const d=state.v28;d.seen||={};d.emotion||=[];d.alex||={resolved:0};d.npc||={};d.chapters||={};return d;
}
function v28Remember(id,title,body,category='관계',person='다니엘'){
 const key='v28_'+id;v18Remember(key,title,body,category);
 const m=v16Data().memories.find(x=>x.id===key);if(m)m.person=person;
}
function v28OnChoice(choice){
 const d=v28Data();
 if(choice.v28Feeling){d.emotion.push({day:state.day,mode:choice.v28Feeling});d.emotion=d.emotion.slice(-40);v28Remember('feeling_'+state.day+'_'+d.emotion.length,'다니엘 · 마음의 방향',choice.v28Feeling==='hold'?'다니엘은 마음을 인정하되 행동은 신중히 하기로 했다.':'다니엘은 자신에게도 시간이 필요하다고 생각했다.');}
 if(choice.v28Alex){d.alex.resolved=Math.max(-5,Math.min(5,d.alex.resolved+(choice.v28Alex==='repair'?1:-1)));v26Data().alex.trust=Math.max(-10,Math.min(10,v26Data().alex.trust+(choice.v28Alex==='repair'?2:-1)));v28Remember('alex_'+state.day+'_'+d.alex.resolved,'알렉 · 남겨 둔 말',choice.v28Alex==='repair'?'다니엘은 형에게 거짓 약속 대신 진지하게 대화할 시간을 청했다.':'다니엘은 입을 다물었다. 형제 사이에 다시 침묵이 쌓였다.','관계','알렉');}
 if(choice.v28Npc){d.npc[choice.v28Npc]={day:state.day,mode:choice.v28NpcMode};const npc=v19Data().npc[choice.v28Npc];if(npc)npc.rapport=Math.max(0,Math.min(10,(npc.rapport||0)+(choice.v28NpcMode==='help'?1:-1)));v28Remember('npc_'+choice.v28Npc,'황궁의 인연 · 작은 부탁',choice.v28NpcMode==='help'?'다니엘은 상대의 사정을 듣고 작은 일을 거들었다.':'다니엘은 지금은 도울 수 없다고 정중히 말했다.','의뢰',V19_NPC_PROFILES[choice.v28Npc].name);}
}
function v28Miguel(loc){
 const d=v28Data(),last=v27Data().miguel.decisions.slice(-1)[0];
 if(!last||state.day<last.day+2||d.seen['miguel_'+last.day]||!['terrace','garden','drawing'].includes(loc))return false;
 d.seen['miguel_'+last.day]=true;
 const text=last.mode==='care'?'미겔은 잠시 다니엘의 걸음에 귀를 기울였다. “지난번에도 그리 조심스러우셨지요.”\n\n다니엘은 자신의 마음이 들킨 듯 어깨를 굳혔다. 그러나 그녀는 짐작을 입 밖에 내지 않았다.':'“요즘은 거리를 두시는군요.” 미겔의 목소리는 담담했다. “불편하게 해 드렸다면 말씀해 주십시오.”\n\n그녀의 배려가 오히려 다니엘의 마음을 무겁게 했다.';
 v28Remember('miguel_'+last.day,'미겔 · 기억하는 거리',text,'관계','미겔');
 return v18Scene('v28_miguel','미겔 코트리먼',text,[{text:'“불편한 일은 아닙니다. 제가 조금 서툴렀습니다.”',next:'explore',effects:{trust:1},v28Feeling:'hold'},{text:'“……잠시 생각할 시간을 주십시오.”',next:'explore',effects:{resolve:1},v28Feeling:'wait'}]);
}
function v28Alex(loc){
 const d=v28Data(),hist=v27Data().alex.history,last=hist[hist.length-1];
 if(!last||state.day<last.day+2||d.seen['alex_'+last.day]||d.alex.resolved>=2&&v26Data().alex.trust>=5)return false;
 d.seen['alex_'+last.day]=true;
 const trust=v26Data().alex.trust;
 const text=trust>=1?'알렉은 다니엘의 말이 끝날 때까지 기다렸다. 침묵은 여전히 어색했으나, 이번에는 먼저 자리를 뜨지 않았다.':'알렉의 시선이 다니엘에게 머물렀다. “네가 무슨 생각을 하는지 모르겠구나.”\n\n다니엘은 변명하려다 고개를 숙였다.';
 v28Remember('alex_'+last.day,'알렉 · 형제의 침묵',text,'관계','알렉');
 return v18Scene('v28_alex','알렉 레온하르트',text,[{text:'“형님, 제대로 말씀드리고 싶습니다.”',next:'explore',effects:{resolve:1},v28Alex:'repair'},{text:'“죄송합니다. 지금은 말씀드리기 어렵습니다.”',next:'explore',effects:{risk:1},v28Alex:'avoid'}]);
}
function v28Npc(loc){
 const d=v28Data(),profile=V19_NPC_PROFILES[loc],npc=v19Data().npc[loc];
 if(!profile||!npc||(npc.rapport||0)<4||d.npc[loc]||d.seen['npc_'+loc])return false;
 d.seen['npc_'+loc]=true;
 const text=profile.name+'이 다니엘을 알아보고 조심스럽게 부탁했다. “경께서 괜찮으시다면 잠시만 도와주실 수 있겠습니까?”\n\n그의 손에는 서류와 작은 소품이 가득했다. 큰 사건은 아니지만 혼자서는 처리하기 어려워 보였다.';
 return v18Scene('v28_npc',profile.name,text,[{text:'“제가 할 수 있는 일이라면 돕겠습니다.”',next:'explore',effects:{reputation:1},v28Npc:loc,v28NpcMode:'help'},{text:'“죄송합니다. 지금은 다른 일이 있어 어렵습니다.”',next:'explore',v28Npc:loc,v28NpcMode:'decline'}]);
}
function v28Chapter(){
 const d=v28Data(),chapter=state.day>=5?'후반의 밤':state.day>=3?'이어지는 밤':'첫 번째 밤';
 const last=d.chapters[state.day];if(last)return;
 d.chapters[state.day]=chapter;
 const mood=d.emotion.slice(-1)[0]?.mode==='hold'?'조심스럽게 마음을 인정한 채':'여전히 답을 찾지 못한 채';
 v28Remember('chapter_'+state.day,'DAY '+state.day+' · '+chapter,'다니엘은 '+mood+' 황궁의 복도를 걸었다. 어제 들은 말이 오늘의 선택을 바꿀 수도 있었다.','기타');
}
function v28Search(){
 const wrap=document.createElement('div'),hint=document.createElement('p');hint.className='hint';hint.textContent='기존 회상과 신규 기록을 제목·본문·인물로 검색합니다. 기록은 최신 날짜순으로 표시됩니다.';wrap.append(hint);
 const input=document.createElement('input');input.type='search';input.placeholder='예: 미겔, 알렉, 장미, 약속';input.setAttribute('aria-label','회상 검색어');wrap.append(input);
 const result=document.createElement('div');wrap.append(result);
 function paint(){result.replaceChildren();const q=input.value.trim().toLocaleLowerCase();const list=(v16Data().memories||[]).map((m,i)=>({...m,_i:i})).filter(m=>!q||[m.title,m.text,m.person,m.category].some(v=>String(v||'').toLocaleLowerCase().includes(q))).sort((a,b)=>Number(b.day||0)-Number(a.day||0)||b._i-a._i);const info=document.createElement('p');info.className='hint';info.textContent=list.length+'건의 기록';result.append(info);for(const m of list.slice(0,100)){const b=document.createElement('button');b.textContent='DAY '+(m.day||'?')+' · '+m.title;b.onclick=()=>modal('회상 · '+m.title,m.text||'기록된 내용이 없습니다.');result.append(b)}}
 input.addEventListener('input',paint);paint();modal('회상 갤러리 · 검색',wrap);
}
function v28Board(){const d=v28Data();modal('v28 · 이어지는 이야기','다니엘 감정 선택 '+d.emotion.length+'회\n알렉 관계 변화 '+d.alex.resolved+'\nNPC 특별 사건 '+Object.keys(d.npc).length+'건\n날짜별 서사 '+Object.keys(d.chapters).length+'일\n\n서술과 대화의 변화는 기존 관계 수치와 이전 선택에 따라 발생합니다.');}


// v29: choices carry consequences across days; all additions are backward compatible.
function v29Data(){
 const d=state.v29??(state.v29={miguel:[],alex:[],npc:{},chapters:{},seen:{},choices:[]});
 d.miguel||=[];d.alex||=[];d.npc||={};d.chapters||={};d.seen||={};d.choices||=[];return d;
}
function v29Memory(key,title,body,category='관계',person='다니엘'){
 v18Remember('v29_'+key,title,body,category);
 const m=v16Data().memories.find(x=>x.id==='v29_'+key);if(m)m.person=person;
}
function v29OnChoice(c){
 const d=v29Data();
 if(c.v29Miguel){d.miguel.push({day:state.day,mode:c.v29Miguel,done:false});d.choices.push({day:state.day,who:'미겔',mode:c.v29Miguel});}
 if(c.v29Alex){const change=c.v29Alex==='reconcile'?2:-2;v26Data().alex.trust=Math.max(-10,Math.min(10,v26Data().alex.trust+change));d.alex.push({day:state.day,mode:c.v29Alex,done:false});d.choices.push({day:state.day,who:'알렉',mode:c.v29Alex});}
 if(c.v29Npc){const n=v19Data().npc[c.v29Npc];if(n)n.rapport=Math.max(0,Math.min(10,(n.rapport||0)+(c.v29NpcMode==='accept'?2:-1)));d.npc[c.v29Npc]={day:state.day,mode:c.v29NpcMode,done:false};d.choices.push({day:state.day,who:V19_NPC_PROFILES[c.v29Npc]?.name||'NPC',mode:c.v29NpcMode});}
}
function v29Miguel(loc){
 if(!['terrace','garden','drawing'].includes(loc))return false;
 const d=v29Data(),pending=d.miguel.find(x=>!x.done&&state.day>=x.day+2);
 if(pending){pending.done=true;const tender=pending.mode==='open';const txt=tender?'미겔은 다니엘이 건넸던 조심스러운 말을 기억하고 있었다. “그날 하신 말씀은 잊지 않았습니다. 다만 저희가 지켜야 할 자리가 있겠지요.”\n\n다니엘은 고개를 숙였다. 그녀가 자신의 마음을 함부로 다루지 않았다는 사실만으로도 가슴이 저렸다.':'“요 며칠은 무척 조용하시더군요.” 미겔이 말했다. 다니엘은 그녀가 자신의 침묵마저 기억한다는 사실에 놀랐다.\n\n“불편하신 일이 있다면 억지로 말씀하지 않으셔도 됩니다.”';v29Memory('miguel_'+pending.day+'_'+d.miguel.indexOf(pending),'미겔 · 이틀 뒤의 대답',txt,'관계','미겔');return v18Scene('v29_miguel','미겔 코트리먼',txt,[{text:'“배려해 주셔서 감사합니다.”',next:'explore',effects:{trust:1}},{text:'“제 마음을 잘 다스리겠습니다.”',next:'explore',effects:{resolve:1}}]);}
 if(socialProgress().miguelMeetings<3||d.seen['miguelOffer_'+state.day])return false;
 d.seen['miguelOffer_'+state.day]=true;
 return v18Scene('v29_miguel','미겔 코트리먼','미겔이 다니엘의 인사를 받았다. 그녀는 눈길보다 먼저 익숙한 발소리를 알아챈 듯했다.\n\n“무슨 말씀을 하시려던 참이었습니까?” 다니엘은 잠시 입술을 달싹였다. 형님의 약혼녀라는 사실을 잊은 적은 없었다.',[{text:'“다시 뵈어 기뻤습니다. 그 말씀만 드리고 싶었습니다.”',next:'explore',effects:{affection:1,risk:1},v29Miguel:'open'},{text:'“아닙니다. 괜한 말씀을 드릴 뻔했습니다.”',next:'explore',effects:{resolve:1},v29Miguel:'restrain'}]);
}
function v29Alex(loc){
 const d=v29Data(),pending=d.alex.find(x=>!x.done&&state.day>=x.day+2);
 if(pending){pending.done=true;const good=pending.mode==='reconcile';const txt=good?'알렉은 동생이 먼저 말을 꺼낼 때까지 기다렸다. 다니엘은 형의 시선을 피하지 않으려 애썼다. 형제 사이의 어색함이 모두 사라진 것은 아니었으나, 적어도 서로의 말을 들을 여지는 남아 있었다.':'알렉과 마주친 순간 다니엘은 지난번 대화를 떠올렸다. 형의 짧은 인사에는 거리가 남아 있었다. 다니엘은 그 침묵이 자신이 미뤄 둔 말에서 비롯되었음을 알았다.';v29Memory('alex_'+pending.day+'_'+d.alex.indexOf(pending),'알렉 · 남겨진 형제의 말',txt,'관계','알렉');return v18Scene('v29_alex','알렉 레온하르트',txt,[{text:'“형님, 제 말을 들어 주시겠습니까?”',next:'explore',effects:{resolve:1}},{text:'“오늘은 인사만 드리겠습니다.”',next:'explore',effects:{trust:1}}]);}
 if(d.seen['alexOffer_'+state.day]||socialProgress().alexTension<3)return false;
 d.seen['alexOffer_'+state.day]=true;
 return v18Scene('v29_alex','알렉 레온하르트','알렉은 다니엘을 불러 세웠다. “네가 요즘 무슨 생각을 하는지 궁금하구나.”\n\n다니엘은 목을 가다듬었다. 형이 무엇을 알고 있는지 짐작할 수 없었다.',[{text:'“형님께서 걱정하실 만한 행동은 삼가겠습니다.”',next:'explore',effects:{resolve:1},v29Alex:'reconcile'},{text:'“죄송합니다. 지금은 말씀드릴 수 없습니다.”',next:'explore',effects:{risk:1},v29Alex:'withdraw'}]);
}
function v29Npc(loc){
 const d=v29Data(),profile=V19_NPC_PROFILES[loc],npc=v19Data().npc[loc];if(!profile||!npc)return false;
 const prior=d.npc[loc];
 if(prior&&!prior.done&&state.day>=prior.day+1){prior.done=true;const helped=prior.mode==='accept';const txt=helped?profile.name+'은 다니엘을 다시 알아보았다. “지난번에는 정말 감사했습니다. 덕분에 무사히 일을 마쳤습니다.”\n\n작은 감사의 표시로 손수 적은 쪽지를 건넸다.':'다니엘은 '+profile.name+'과 다시 마주쳤다. 상대는 예의를 갖춰 인사했다. 다니엘은 지난번 부탁을 거절했던 일이 마음에 걸렸으나, 무리하게 변명하지 않았다.';v29Memory('npc_'+loc+'_'+prior.day,profile.name+' · 부탁의 결과',txt,'의뢰',profile.name);return v18Scene('v29_npc',profile.name,txt,[{text:helped?'“무사히 끝나서 다행입니다.”':'“지난번에는 도움을 드리지 못해 죄송합니다.”',next:'explore',effects:{reputation:helped?1:0}}]);}
 if(prior||(npc.rapport||0)<5)return false;
 const txt=profile.name+'이 조심스럽게 다가왔다. “전에 도와주셨던 일을 기억하고 있습니다. 이번에도 잠시 손을 빌릴 수 있을까요?”\n\n다니엘은 일정이 빠듯하다는 사실을 떠올렸다. 그렇지만 상대의 표정을 외면하기도 어려웠다.';
 return v18Scene('v29_npc',profile.name,txt,[{text:'“네, 함께 살펴보겠습니다.”',next:'explore',effects:{reputation:1},v29Npc:loc,v29NpcMode:'accept'},{text:'“죄송합니다. 오늘은 여유가 없습니다.”',next:'explore',v29Npc:loc,v29NpcMode:'decline'}]);
}
function v29Chapter(){
 const d=v29Data();if(d.chapters[state.day])return;
 const yesterday=d.choices.filter(x=>x.day<state.day).slice(-1)[0];const prev=yesterday?yesterday.who+'에게 건넨 말이 여전히 마음에 남아 있었다.':'황궁의 밤이 차곡차곡 쌓여 갔다.';
 const txt='DAY '+state.day+'. 다니엘은 창가에서 세 개의 달을 올려다보았다. '+prev+'\n\n오늘의 선택이 내일 어떤 얼굴로 돌아올지는 알 수 없었다.';
 d.chapters[state.day]=true;v29Memory('chapter_'+state.day,'DAY '+state.day+' · 이어지는 밤',txt,'기타','다니엘');
}
function v29Board(){const d=v29Data();modal('v29 · 이어지는 선택','미겔 선택 '+d.miguel.length+'건 · 후속 완료 '+d.miguel.filter(x=>x.done).length+'건\n알렉 선택 '+d.alex.length+'건 · 후속 완료 '+d.alex.filter(x=>x.done).length+'건\nNPC 부탁 '+Object.keys(d.npc).length+'건\n연결된 날짜 기록 '+Object.keys(d.chapters).length+'일\n\n미겔·알렉의 후속 장면은 선택 이틀 뒤부터, NPC 결과는 다음 날부터 해당 인물과 조우하면 열립니다.');}
function v29Gallery(){
 const wrap=document.createElement('div');const note=document.createElement('p');note.className='hint';note.textContent='제목·본문·인물 검색, 분류와 날짜순 정렬을 함께 적용합니다.';wrap.append(note);
 const input=document.createElement('input');input.type='search';input.placeholder='회상 검색';input.setAttribute('aria-label','회상 검색');wrap.append(input);
 const category=document.createElement('select');for(const c of ['전체','관계','의뢰','기타']){const o=document.createElement('option');o.value=c;o.textContent='분류 · '+c;category.append(o)}wrap.append(category);
 const person=document.createElement('select');for(const c of ['전체','다니엘','미겔','알렉','황궁 NPC']){const o=document.createElement('option');o.value=c;o.textContent='인물 · '+c;person.append(o)}wrap.append(person);
 const order=document.createElement('select');for(const [v,t] of [['new','최신 날짜순'],['old','오래된 날짜순'],['title','제목 가나다순']]){const o=document.createElement('option');o.value=v;o.textContent=t;order.append(o)}wrap.append(order);
 const result=document.createElement('div');wrap.append(result);
 const infer=m=>{if(m.person)return ['악단 보조','견습 시종','화분 담당 시종','차 담당 시종','정원사'].includes(m.person)?'황궁 NPC':m.person;const t=(m.title||'')+' '+(m.text||'');return /미겔/.test(t)?'미겔':/알렉|형제/.test(t)?'알렉':/시종|정원사|악단|부탁/.test(t)?'황궁 NPC':'다니엘'};
 function paint(){result.replaceChildren();const q=input.value.trim().toLocaleLowerCase();let arr=(v16Data().memories||[]).map((m,i)=>({...m,_i:i})).filter(m=>(category.value==='전체'||(m.category||'기타')===category.value)&&(person.value==='전체'||infer(m)===person.value)&&(!q||[m.title,m.text,m.person,m.category].some(v=>String(v||'').toLocaleLowerCase().includes(q))));arr.sort((a,b)=>order.value==='title'?String(a.title).localeCompare(String(b.title),'ko'):order.value==='old'?Number(a.day||0)-Number(b.day||0)||a._i-b._i:Number(b.day||0)-Number(a.day||0)||b._i-a._i);const count=document.createElement('p');count.className='hint';count.textContent=arr.length+'건의 회상';result.append(count);for(const m of arr.slice(0,150)){const b=document.createElement('button');b.textContent='DAY '+(m.day||'?')+' · '+m.title;b.onclick=()=>modal('회상 · '+m.title,m.text||'기록된 내용이 없습니다.');result.append(b)}}
 for(const e of [input,category,person,order])e.addEventListener(e===input?'input':'change',paint);paint();modal('회상 · 통합 검색과 정렬',wrap);
}


// v30: deferred relationship decisions and NPC aftercare. All flags are optional in old saves.
function v30Data(){return state.v30??(state.v30={miguel:[],alex:[],npc:{},chapters:{},seen:{},journal:[]});}
function v30Remember(key,title,body,category='관계',person='다니엘'){
 const id='v30_'+key;if(v16Data().memories.some(m=>m.id===id))return;
 v16Data().memories.push({id,title,text:body,category,person,day:state.day});
}
function v30Choice(c){const d=v30Data();
 if(c.v30Miguel){d.miguel.push({day:state.day,mode:c.v30Miguel,done:false});d.journal.push({day:state.day,who:'미겔',mode:c.v30Miguel});}
 if(c.v30Alex){const trust=v26Data().alex;trust.trust=Math.max(-10,Math.min(10,(trust.trust||0)+(c.v30Alex==='repair'?2:-2)));d.alex.push({day:state.day,mode:c.v30Alex,done:false});d.journal.push({day:state.day,who:'알렉',mode:c.v30Alex});}
 if(c.v30Npc){const n=v19Data().npc[c.v30Npc];if(n)n.rapport=Math.max(0,Math.min(10,(n.rapport||0)+(c.v30NpcMode==='assist'?1:-1)));d.npc[c.v30Npc]={day:state.day,mode:c.v30NpcMode,done:false};d.journal.push({day:state.day,who:V19_NPC_PROFILES[c.v30Npc]?.name||'시종',mode:c.v30NpcMode});}
 d.journal=d.journal.slice(-100);
}
function v30Miguel(loc){const d=v30Data(),pending=d.miguel.find(x=>!x.done&&state.day>=x.day+2);
 if(pending){pending.done=true;const close=pending.mode==='sincere';const txt=close?'미겔은 지난번 다니엘이 말을 고르던 모습을 기억했다. “그날은 제게도 생각할 시간이 필요했습니다.” 그녀는 조용히 덧붙였다. “하지만 서로의 처지를 잊어서는 안 되겠지요.” 다니엘은 대답 대신 고개를 끄덕였다.':'미겔은 다니엘이 한 걸음 물러섰던 일을 기억했다. “그날의 배려에는 감사드립니다.” 다니엘은 무심코 손끝을 움켜쥐었다. 가까워지지 않는 것이 옳다고 생각하면서도 마음은 쉬이 따라주지 않았다.';
 v30Remember('miguel_'+pending.day+'_'+d.miguel.indexOf(pending),'미겔 · 선택 뒤의 인사',txt,'관계','미겔');return v18Scene('v30_miguel','미겔 코트리먼',txt,[{text:'“말씀을 명심하겠습니다.”',next:'explore',effects:{trust:1}},{text:'“제 처신을 돌아보겠습니다.”',next:'explore',effects:{resolve:1}}]);}
 if(d.seen['miguel_'+state.day])return false;
 if(socialProgress().miguelMeetings<3)return false;
 d.seen['miguel_'+state.day]=true;
 const trust=state.stats.trust||0,aff=state.stats.affection||0;
 const txt=trust>=5&&aff>=5?'익숙한 발걸음 소리에 미겔이 고개를 돌렸다. 다니엘은 자신의 발걸음을 그녀가 알아챘다는 사실에 잠시 말문이 막혔다.':'미겔이 먼저 예를 갖춰 인사했다. 다니엘은 뜻밖의 인사에 당황했으나, 허둥지둥하지 않으려 애썼다.';
 return v18Scene('v30_miguel','미겔 코트리먼',txt+'\n\n다니엘은 어떤 말을 남겨야 할지 고민했다.',[{text:'“오늘도 뵙게 되어 기쁩니다.”',next:'explore',effects:{affection:1,risk:1},v30Miguel:'sincere'},{text:'“바쁘실 텐데 붙잡아 죄송합니다.”',next:'explore',effects:{resolve:1},v30Miguel:'distance'}]);
}
function v30Alex(loc){const d=v30Data(),pending=d.alex.find(x=>!x.done&&state.day>=x.day+2);
 if(pending){pending.done=true;const good=pending.mode==='repair',txt=good?'알렉은 동생의 인사를 받아 주었다. 짧은 대화였지만 다니엘은 형이 자신의 말을 끝까지 들어 주었다는 사실을 오래 생각했다.':'알렉과 다니엘 사이에는 말하지 못한 것이 남아 있었다. 형이 걸음을 멈추자 다니엘은 먼저 시선을 내렸다. 피했던 대화가 사라진 것은 아니었다.';
 v30Remember('alex_'+pending.day+'_'+d.alex.indexOf(pending),'알렉 · 이틀 뒤의 거리',txt,'관계','알렉');return v18Scene('v30_alex','알렉 레온하르트',txt,[{text:'“형님, 제게 조금만 시간을 주십시오.”',next:'explore',effects:{resolve:1}},{text:'“앞으로 더 신중히 행동하겠습니다.”',next:'explore',effects:{trust:1}}]);}
 if(d.seen['alex_'+state.day]||socialProgress().alexTension<4)return false;
 d.seen['alex_'+state.day]=true;const trust=v26Data().alex.trust||0;
 const txt=trust>=0?'알렉은 동생이 입을 열 때까지 기다렸다. 다니엘은 그 기다림이 오히려 무거웠다.':'알렉의 짧은 질문에 다니엘은 쉽게 답하지 못했다. 한 번 멀어진 형제 사이의 거리는 생각보다 길었다.';
 return v18Scene('v30_alex','알렉 레온하르트',txt,[{text:'“형님, 제 행동을 돌아보겠습니다.”',next:'explore',effects:{resolve:1},v30Alex:'repair'},{text:'“지금은 말씀드리기 어렵습니다.”',next:'explore',effects:{risk:1},v30Alex:'avoid'}]);
}
function v30Npc(loc){const d=v30Data(),p=V19_NPC_PROFILES[loc],n=v19Data().npc[loc];if(!p||!n)return false;
 const q=d.npc[loc];if(q&&!q.done&&state.day>q.day){q.done=true;const yes=q.mode==='assist';const txt=yes?p.name+'은 다니엘을 알아보고 감사의 뜻으로 작은 손글씨 쪽지를 내밀었다. “지난번에 도와주신 덕분에 무사히 마쳤습니다.”':'다니엘은 '+p.name+'과 다시 마주쳤다. 지난번 부탁을 사양했지만 상대는 여전히 예를 갖춰 인사했다. 다니엘도 진심으로 안부를 물었다.';
 v30Remember('npc_'+loc+'_'+q.day,p.name+' · 부탁의 다음 날',txt,'의뢰',p.name);return v18Scene('v30_npc',p.name,txt,[{text:yes?'“다행입니다. 수고 많으셨습니다.”':'“오늘은 괜찮으십니까?”',next:'explore',effects:{reputation:yes?1:0}}]);}
 if(d.seen['npc_'+loc+'_'+state.day]||q||n.rapport<5)return false;
 d.seen['npc_'+loc+'_'+state.day]=true;
 return v18Scene('v30_npc',p.name,p.name+'이 조심스럽게 다가왔다. “바쁘신 줄 알지만, 잠깐 도와주실 수 있겠습니까?” 다니엘은 자신을 믿고 부탁하는 사람이 있다는 사실에 잠시 마음이 놓였다.',[{text:'“제가 도울 수 있다면 기꺼이 돕겠습니다.”',next:'explore',effects:{reputation:1},v30Npc:loc,v30NpcMode:'assist'},{text:'“죄송합니다. 지금은 어렵겠습니다.”',next:'explore',v30Npc:loc,v30NpcMode:'decline'}]);
}
function v30Chapter(){const d=v30Data();if(d.chapters[state.day])return;d.chapters[state.day]=true;
 const last=d.journal.filter(x=>x.day<state.day).slice(-1)[0];
 const text=last?'어젯밤 '+last.who+'에게 했던 말이 마음에 남았다. 다니엘은 그때의 선택을 바꿀 수 없지만, 오늘의 태도는 고를 수 있다고 생각했다.':'세 개의 달이 떠 있는 황궁에서 다니엘은 오늘도 자신의 자리를 생각했다. 어떤 말은 쉽게 건넬 수 없었다.';
 v30Remember('day_'+state.day,'DAY '+state.day+' · 남아 있는 말',text,'기타','다니엘');}
function v30Board(){const d=v30Data();modal('v30 · 이어지는 관계','미겔 선택 '+d.miguel.length+'회 / 후속 '+d.miguel.filter(x=>x.done).length+'회\n알렉 선택 '+d.alex.length+'회 / 후속 '+d.alex.filter(x=>x.done).length+'회\nNPC 부탁 '+Object.keys(d.npc).length+'건\n날짜별 기록 '+Object.keys(d.chapters).length+'일\n\n후속 만남은 선택 후 이틀(미겔·알렉), 다음 날(NPC)부터 열립니다.');}
function v30Gallery(){v29Gallery();}


// v31: linked chapters, relationship consequences, multi-stage NPC requests and timeline.
function v31Data(){return state.v31??(state.v31={miguel:[],alex:[],npc:{},daily:{},seen:{},choices:[]});}
function v31Record(key,title,body,person='다니엘',category='관계'){
 const id='v31_'+key;if(v16Data().memories.some(m=>m.id===id))return;
 v16Data().memories.push({id,title,text:body,person,category,day:state.day});
}
function v31Choice(c){const d=v31Data();
 if(c.v31Miguel){d.miguel.push({day:state.day,mode:c.v31Miguel,stage:0});d.choices.push({day:state.day,person:'미겔',mode:c.v31Miguel});}
 if(c.v31Alex){const trust=v26Data().alex;trust.trust=Math.max(-10,Math.min(10,(trust.trust||0)+(c.v31Alex==='reconcile'?2:-2)));d.alex.push({day:state.day,mode:c.v31Alex,stage:0});d.choices.push({day:state.day,person:'알렉',mode:c.v31Alex});}
 if(c.v31Npc){const q=d.npc[c.v31Npc];if(q){q.mode=c.v31NpcMode;q.stage=1;q.day=state.day;}d.choices.push({day:state.day,person:V19_NPC_PROFILES[c.v31Npc]?.name||'황궁 NPC',mode:c.v31NpcMode});}
 d.choices=d.choices.slice(-120);
}
function v31Miguel(loc){const d=v31Data();const q=d.miguel.find(x=>x.stage<2&&state.day>=x.day+(x.stage===0?1:3));
 if(q){const second=q.stage===1;const text=q.mode==='respect'?(second?'미겔은 두 사람이 지킨 거리를 먼저 언급하지 않았다. 그러나 다니엘이 예를 갖추자, 그녀는 그의 이름을 정확히 불렀다. 가까워지지 않는 배려도 기억될 수 있었다.':'미겔은 다니엘의 조심스러운 인사를 받아 주었다. “그날 하신 말씀은 기억합니다. 제 처지를 헤아려 주셔서 감사드립니다.” 다니엘은 짧은 감사에 도리어 얼굴이 달아올랐다.'):(second?'미겔이 잠시 말을 멈췄다. “솔직함은 귀한 일이지만, 그것만으로 모든 일이 가벼워지지는 않겠지요.” 다니엘은 형의 얼굴을 떠올렸다.':'미겔은 다니엘의 지난 고백에 가까운 말을 잊지 않았다. “그날은 대답을 드리지 못했습니다.” 그녀의 어조는 여전히 단정했다. “제게는 이미 지켜야 할 약속이 있습니다.”');
 q.stage++;v31Record('miguel_'+q.day+'_'+q.stage,'미겔 · '+(second?'남아 있는 거리':'다시 들은 대답'),text,'미겔');return v18Scene('v31_miguel','미겔 코트리먼',text,[{text:'“네, 경솔하게 굴지 않겠습니다.”',next:'explore',effects:{trust:1,resolve:1}},{text:'“말씀해 주셔서 감사합니다.”',next:'explore',effects:{affection:1}}]);}
 if(d.seen['miguel_'+state.day]||socialProgress().miguelMeetings<4)return false;d.seen['miguel_'+state.day]=true;
 const text='세 개의 달 아래, 미겔의 보랏빛 옷자락이 가볍게 흔들렸다. 다니엘은 그녀의 얼굴을 바라보다가 곧 시선을 내렸다. 자신이 원하는 것과 옳다고 배운 것 사이에는 이름 붙이기 어려운 거리가 있었다.';
 return v18Scene('v31_miguel','다니엘의 독백',text,[{text:'형님과 그분의 입장을 먼저 헤아린다.',next:'explore',effects:{trust:1,resolve:1},v31Miguel:'respect'},{text:'마음이 흔들리고 있음을 정직하게 인정한다.',next:'explore',effects:{affection:1,risk:1},v31Miguel:'confess'}]);}
function v31Alex(loc){const d=v31Data(),q=d.alex.find(x=>x.stage<2&&state.day>=x.day+(x.stage===0?1:3));
 if(q){const second=q.stage===1,good=q.mode==='reconcile';const text=good?(second?'알렉은 지난번의 사과를 다시 거론하지 않았다. 다니엘은 평범한 형제의 인사가 이토록 안도감을 줄 수 있다는 사실에 놀랐다.':'알렉은 다니엘이 끝까지 말을 마치도록 기다렸다. 다니엘은 형을 향해 고개를 숙였다. 모든 의혹이 풀린 것은 아니지만, 피하지 않기로 한 선택은 남았다.'):(second?'형제 사이의 침묵은 한층 길어졌다. 다니엘은 그 침묵이 자신의 선택에서 시작되었다는 사실을 부정할 수 없었다.':'알렉이 말을 걸자 다니엘은 다시 대답을 피했다. 형은 더 묻지 않았지만, 다니엘은 그 침묵이 관대함인지 실망인지 알 수 없었다.');q.stage++;
 v31Record('alex_'+q.day+'_'+q.stage,'알렉 · '+(second?'그 뒤의 침묵':'다시 마주한 형'),text,'알렉');return v18Scene('v31_alex','알렉 레온하르트',text,[{text:'“형님, 제 말을 들어주셔서 감사합니다.”',next:'explore',effects:{resolve:1}},{text:'“제가 조금 더 신중하겠습니다.”',next:'explore',effects:{trust:1}}]);}
 if(d.seen['alex_'+state.day]||socialProgress().alexTension<5)return false;d.seen['alex_'+state.day]=true;
 const trust=v26Data().alex.trust||0;const text=trust>=0?'알렉은 동생의 안색을 살피고 잠시 걸음을 늦췄다. 다니엘은 형이 건네는 평범한 관심조차 떳떳하게 받기 어려웠다.':'알렉은 무언가 묻고 싶은 듯 다니엘을 바라보았다. 다니엘은 먼저 입을 열어야 한다는 것을 알면서도 목소리가 나오지 않았다.';
 return v18Scene('v31_alex','알렉 레온하르트',text,[{text:'“형님, 지난번에는 제가 경솔했습니다.”',next:'explore',effects:{resolve:1},v31Alex:'reconcile'},{text:'“지금은 말씀드리기 어렵습니다.”',next:'explore',effects:{risk:1},v31Alex:'withdraw'}]);}
function v31Npc(loc){const d=v31Data(),profile=V19_NPC_PROFILES[loc],npc=v19Data().npc[loc];if(!profile||!npc)return false;
 const q=d.npc[loc];if(q&&q.stage===1&&state.day>q.day){q.stage=2;const help=q.mode==='help';const text=help?profile.name+'은 다니엘에게 정성스럽게 접은 감사 편지를 건넸다. 작은 부탁이었지만 누군가의 하루를 바꾸었다는 사실이 그에게는 뜻밖의 위로였다.':profile.name+'은 다니엘에게 예전과 다름없이 인사했다. 부탁을 사양했던 일이 마음에 남아 있던 다니엘은 이번에는 먼저 안부를 물었다.';
 v31Record('npc_'+loc+'_2',profile.name+' · 부탁의 결과',text,profile.name,'의뢰');return v18Scene('v31_npc',profile.name,text,[{text:'“다음에도 도움이 필요하면 말씀하십시오.”',next:'explore',effects:{reputation:help?2:1}}]);}
 if(q&&q.stage===2&&state.day>q.day+2){q.stage=3;const text=profile.name+'은 다니엘을 알아보고 짧게 웃었다. 그날의 선택이 두 사람 사이에 작은 인연으로 남아 있었다.';v31Record('npc_'+loc+'_3',profile.name+' · 인연의 후일담',text,profile.name,'의뢰');return v18Scene('v31_npc',profile.name,text,[{text:'“저도 기억하고 있습니다.”',next:'explore',effects:{trust:1}}]);}
 if(q||npc.rapport<5||d.seen['npc_'+loc+'_'+state.day])return false;d.seen['npc_'+loc+'_'+state.day]=true;d.npc[loc]={day:state.day,stage:0,mode:null};
 const text=profile.name+'이 다니엘을 알아보고 조용히 말을 걸었다. “지난번에 도움을 주신 일이 있어, 이번에도 여쭙고 싶었습니다.” 다니엘은 잠시 자신이 할 수 있는 일을 헤아렸다.';
 return v18Scene('v31_npc',profile.name,text,[{text:'“가능한 만큼 돕겠습니다.”',next:'explore',effects:{reputation:1},v31Npc:loc,v31NpcMode:'help'},{text:'“죄송합니다. 이번에는 어렵겠습니다.”',next:'explore',v31Npc:loc,v31NpcMode:'decline'}]);}
function v31Daily(){const d=v31Data();if(d.daily[state.day])return;d.daily[state.day]=true;
 const last=d.choices.filter(x=>x.day<state.day).slice(-1)[0];const text=last?'어제 '+last.person+' 앞에서 내린 선택이 마음에 남아 있었다. 다니엘은 그 말을 돌이킬 수 없다는 것을 알았다. 오늘은 그 결과를 어떻게 받아들일지 결정해야 했다.':'황궁의 창 너머로 세 개의 달이 떠 있었다. 다니엘은 오늘 누구와 마주칠지 알 수 없었다. 다만 자신의 말에는 책임을 져야 한다고 생각했다.';
 v31Record('day_'+state.day,'DAY '+state.day+' · 선택의 여운',text,'다니엘','기타');}
function v31Board(){const d=v31Data();modal('v31 · 이어지는 이야기','미겔 장기 선택 '+d.miguel.length+'회\n알렉 형제 선택 '+d.alex.length+'회\nNPC 연속 부탁 '+Object.keys(d.npc).length+'건\n날짜별 서사 '+Object.keys(d.daily).length+'일\n\n각 선택은 다음 날 이후 후속 만남으로 이어집니다.');}
function v31Timeline(){const entries=(v16Data().memories||[]).map((m,i)=>({...m,index:i})).sort((a,b)=>(a.day||0)-(b.day||0)||a.index-b.index);const wrap=document.createElement('div');const intro=document.createElement('p');intro.className='hint';intro.textContent='날짜별로 쌓인 사건을 시간순으로 확인합니다. 각 기록을 누르면 본문을 읽을 수 있습니다.';wrap.append(intro);
 const filter=document.createElement('select');for(const person of ['전체','다니엘','미겔','알렉','황궁 NPC']){const o=document.createElement('option');o.value=person;o.textContent=person;filter.append(o)}wrap.append(filter);const list=document.createElement('div');wrap.append(list);
 const paint=()=>{list.replaceChildren();for(const m of entries){const who=m.person||(/미겔/.test(m.title)?'미겔':/알렉/.test(m.title)?'알렉':/시종|정원사|악단/.test(m.title)?'황궁 NPC':'다니엘');const group=['악단 보조','견습 시종','화분 담당 시종','차 담당 시종','정원사'].includes(who)?'황궁 NPC':who;if(filter.value!=='전체'&&filter.value!==group)continue;const b=document.createElement('button');b.textContent='DAY '+(m.day||'?')+' · '+m.title;b.onclick=()=>modal('회상 · '+m.title,m.text||'');list.append(b)}if(!list.children.length){const p=document.createElement('p');p.textContent='해당 인물의 기록이 없습니다.';list.append(p)}};filter.onchange=paint;paint();modal('v31 · 사건 연대기',wrap);}



// v33: relationship-stage dialogues, sibling confrontation, palace reputation and linked chronicle.
function v33Data(){const d=state.v33??(state.v33={miguel:{seen:{},feelings:0},alex:{seen:{},choices:[]},npc:{},reputation:0,chains:[],seen:{}});d.miguel??={seen:{},feelings:0};d.miguel.seen??={};d.alex??={seen:{},choices:[]};d.alex.seen??={};d.alex.choices??=[];d.npc??={};d.chains??=[];d.seen??={};return d;}
function v33Record(id,title,body,person='다니엘',category='연속 사건',parent=null){const d=v33Data(),key='v33_'+id;if(d.chains.some(x=>x.id===key))return;d.chains.push({id:key,title,text:body,person,category,day:state.day,parent});d.chains=d.chains.slice(-200);v18Remember(key,title,body,category);const m=v16Data().memories.find(x=>x.id===key);if(m){m.person=person;m.parent=parent;m.day=state.day;}}
function v33Choice(c){const d=v33Data();if(c.v33Miguel){const n=c.v33Miguel==='speak'?2:c.v33Miguel==='courtesy'?1:-1;d.miguel.feelings=Math.max(-12,Math.min(12,d.miguel.feelings+n));const id='miguel_'+state.day+'_'+d.chains.length;v33Record(id,'미겔 · 감정의 흔적',c.v33Miguel==='speak'?'다니엘은 마음을 숨기지 않았으나, 미겔과 형의 약혼을 먼저 떠올렸다.':c.v33Miguel==='courtesy'?'다니엘은 짧은 인사만으로도 서로의 경계를 존중할 수 있다고 생각했다.':'다니엘은 오늘의 마음을 혼자 간직하기로 했다.','미겔');d.seen['mnext_'+state.day]={due:state.day+2,mode:c.v33Miguel,parent:'v33_'+id};}if(c.v33Alex){const a=v32Data().alex;const repair=c.v33Alex==='repair';a.repair=Math.max(0,a.repair+(repair?2:0));a.suspicion=Math.max(0,a.suspicion+(repair?-1:2));const id='alex_'+state.day+'_'+d.alex.choices.length;d.alex.choices.push({day:state.day,mode:c.v33Alex});v33Record(id,'알렉 · 형제의 선택',repair?'다니엘은 변명 대신 자신의 미숙함을 인정했다.':'다니엘은 대답을 미루었다. 침묵이 오해를 키울지도 몰랐다.','알렉');d.seen['anext_'+state.day]={due:state.day+2,mode:c.v33Alex,parent:'v33_'+id};}if(c.v33Npc){const n=d.npc[c.v33Npc];if(n){n.mode=c.v33NpcMode;n.stage=1;n.due=state.day+1;v33Record('npc_'+c.v33Npc+'_'+state.day,n.name+' · 궁의 작은 부탁',n.mode==='help'?'다니엘은 비밀을 지키며 도움을 주기로 했다.':'다니엘은 섣부른 약속을 피하기로 했다.',n.name,'황궁');}}}
function v33Miguel(loc){const d=v33Data(),m=v32Data().miguel;const next=Object.entries(d.seen).find(([k,v])=>k.startsWith('mnext_')&&!v.done&&state.day>=v.due);if(next){const [key,q]=next;q.done=true;const t=q.mode==='speak'?'미겔은 지난 대화를 기억하고 있었다. “레온하르트 경. 말씀은 들었습니다. 다만 알렉과의 약혼을 잊어서는 안 됩니다.” 다니엘은 그 말에 서툴게 고개를 끄덕였다.':q.mode==='courtesy'?'“지난번의 배려는 감사했습니다.” 미겔은 짧게 말했다. 다니엘은 조심스러운 거리에도 온기가 남을 수 있음을 알았다.':'미겔은 평소와 다름없이 인사했다. 다니엘은 자신의 침묵을 그녀에게 짐으로 지우지 않기로 했다.';v33Record('mfollow_'+key,'미겔 · 다시 돌아온 말',t,'미겔','후속',q.parent);return v18Scene('v33_miguel','미겔 코트리먼',t,[{text:'“……알겠습니다.”',next:'explore',effects:{resolve:1}}]);}const stage=m.phase,key=state.day+'_'+stage;if(d.miguel.seen[key]||m.encounters<6)return false;d.miguel.seen[key]=true;const t=stage==='서로를 의식하는 거리'?'미겔은 다니엘의 발걸음을 알아듣고 고개를 들었다. “레온하르트 경, 무슨 일이십니까?” 다니엘은 준비한 말이 모두 흩어지는 기분이었다.':stage==='조심스러운 단절'?'미겔은 일정한 거리를 두고 인사했다. 다니엘은 그 거리가 자신이 선택한 결과임을 알고 있었다.':'노란 장미 옆에서 미겔이 서류를 정리하고 있었다. 다니엘은 그녀의 시간을 빼앗지 않으려 조심스럽게 말을 골랐다.';return v18Scene('v33_miguel','다니엘의 독백',t,[{text:'예의를 지키며 용건만 전한다.',next:'explore',v33Miguel:'courtesy',effects:{trust:1}},{text:'“……말씀드리고 싶은 것이 있습니다.”',next:'explore',v33Miguel:'speak',effects:{risk:1}},{text:'인사만 남기고 물러선다.',next:'explore',v33Miguel:'quiet',effects:{resolve:1}}]);}
function v33Alex(loc){const d=v33Data(),a=v32Data().alex;const next=Object.entries(d.seen).find(([k,v])=>k.startsWith('anext_')&&!v.done&&state.day>=v.due);if(next){const [key,q]=next;q.done=true;const t=q.mode==='repair'?'알렉은 다니엘의 말을 끝까지 들었다. “당장 모두 이해할 수는 없겠지만, 네가 먼저 말한 건 알겠다.” 다니엘은 고개를 숙였다.':'알렉은 동생의 침묵을 기억하고 있었다. “피한다고 없어질 문제는 아니다.” 다니엘은 더 늦기 전에 답해야 한다고 생각했다.';v33Record('afollow_'+key,'알렉 · 남겨진 대화',t,'알렉','후속',q.parent);return v18Scene('v33_alex','알렉 레온하르트',t,[{text:'“예, 형님.”',next:'explore',effects:{resolve:1}}]);}const stage=a.suspicion>a.repair?'의심':'회복',key=state.day+'_'+stage;if(d.alex.seen[key]||a.suspicion+a.repair<5)return false;d.alex.seen[key]=true;const t=stage==='의심'?'알렉은 한동안 다니엘을 바라보았다. “요즘 네가 내게 숨기는 것이 있느냐?” 다니엘은 형의 약혼녀인 미겔을 떠올리고 시선을 내렸다.':'알렉은 서류를 덮고 동생에게 앉으라고 했다. 두 사람 사이에 남은 거리만큼이나 할 말도 많았다.';return v18Scene('v33_alex','알렉 레온하르트',t,[{text:'“형님, 제 잘못부터 말씀드리겠습니다.”',next:'explore',v33Alex:'repair',effects:{resolve:1}},{text:'“……아직은 말씀드리기 어렵습니다.”',next:'explore',v33Alex:'avoid',effects:{risk:1}}]);}
function v33Npc(loc){const p=V19_NPC_PROFILES[loc],n=v19Data().npc[loc];if(!p||!n)return false;const d=v33Data(),q=d.npc[loc];if(q&&q.stage===1&&state.day>=q.due){q.stage=2;q.due=state.day+2;const good=q.mode==='help';n.rapport=Math.max(0,(n.rapport||0)+(good?2:-1));d.reputation=Math.max(-20,Math.min(20,d.reputation+(good?2:-1)));const t=good?p.name+'은 다른 사람들 앞에서 다니엘을 믿을 만한 사람이라고 말했다. 작은 호의가 궁의 평판에 조용히 번졌다.':p.name+'은 거절을 받아들였지만, 궁 안에서는 다니엘이 신중한 사람이라는 말과 냉정하다는 말이 함께 돌았다.';v33Record('npcresult_'+loc+'_'+q.day,p.name+' · 평판의 변화',t,p.name,'평판',q.parent);return v18Scene('v33_npc',p.name,t,[{text:'소문에 휘둘리지 않고 인사한다.',next:'explore',effects:{reputation:good?2:0}}]);}if(q&&q.stage===2&&state.day>=q.due){q.stage=3;const t=q.mode==='help'?p.name+'은 다니엘에게 다시 작은 도움을 청하기 전에 먼저 그의 형편을 살폈다. 신뢰는 한 번의 약속보다 오래 남았다.':p.name+'은 다니엘과 예를 갖춰 대화했다. 서먹함은 남았지만 다시 시작할 여지도 있었다.';v33Record('npcecho_'+loc+'_'+q.day,p.name+' · 인연의 여운',t,p.name,'후속');return v18Scene('v33_npc',p.name,t,[{text:'서로의 입장을 존중한다.',next:'explore',effects:{resolve:1}}]);}if(q||n.rapport<7)return false;d.npc[loc]={name:p.name,stage:0,day:state.day};const t=p.name+'은 다니엘에게 궁 안의 작은 비밀을 지켜 달라고 부탁했다. 소문이 퍼지면 다른 이가 곤란해질 수도 있는 일이었다.';return v18Scene('v33_npc',p.name,t,[{text:'“제가 책임질 수 있는 만큼 돕겠습니다.”',next:'explore',v33Npc:loc,v33NpcMode:'help'},{text:'“죄송합니다. 약속드릴 수 없습니다.”',next:'explore',v33Npc:loc,v33NpcMode:'decline'}]);}
function v33Chronicle(){const d=v33Data(),wrap=document.createElement('div');const info=document.createElement('p');info.textContent='v33 사건의 원인과 후속 결과를 연결해 읽습니다. (기존 기록은 v32 상세 연대기에서 확인)';wrap.append(info);const filter=document.createElement('select');['전체','미겔','알렉','황궁','다니엘'].forEach(x=>{const o=document.createElement('option');o.textContent=x;o.value=x;filter.append(o)});wrap.append(filter);const list=document.createElement('div');wrap.append(list);function paint(){list.replaceChildren();for(const e of d.chains.filter(x=>filter.value==='전체'||(filter.value==='황궁'?x.category==='황궁'||x.category==='평판':x.person===filter.value))){const parent=d.chains.find(x=>x.id===e.parent);const b=document.createElement('button');b.textContent='DAY '+e.day+' · '+e.title+(parent?' ↳ '+parent.title:'');b.onclick=()=>modal(e.title,(parent?'앞선 선택: '+parent.title+' (DAY '+parent.day+')\n'+parent.text+'\n\n':'')+'DAY '+e.day+'\n'+e.text);list.append(b)}if(!list.children.length){const p=document.createElement('p');p.textContent='아직 해당 기록이 없습니다.';list.append(p)}}filter.onchange=paint;paint();modal('v33 · 연결된 사건 연대기',wrap);}
function v33Board(){const d=v33Data(),a=v32Data().alex,m=v32Data().miguel;modal('v33 · 황궁 관계 현황','미겔: '+m.phase+' / 감정 기록 '+d.miguel.feelings+'\n알렉: 회복 '+a.repair+' / 의심 '+a.suspicion+'\n황궁 평판 변화 '+d.reputation+'\n연결된 사건 '+d.chains.length+'건');}

// v32: deferred relationship states and detailed chronological records (game-only adaptation).
function v32Data(){const d=state.v32??(state.v32={miguel:{phase:'조심스러운 거리',score:0,encounters:0,pending:[],seen:{}},alex:{suspicion:0,repair:0,pending:[],seen:{}},npc:{},days:{},events:[]});d.miguel??={phase:'조심스러운 거리',score:0,encounters:0,pending:[],seen:{}};d.miguel.pending??=[];d.miguel.seen??={};d.alex??={suspicion:0,repair:0,pending:[],seen:{}};d.alex.pending??=[];d.alex.seen??={};d.npc??={};d.days??={};d.events??=[];return d;}
function v32Record(key,title,body,person='다니엘',category='관계'){const d=v32Data(),id='v32_'+key;if(d.events.some(e=>e.id===id))return;const e={id,title,text:body,person,category,day:state.day};d.events.push(e);d.events=d.events.slice(-250);v18Remember(id,title,body,category);const m=v16Data().memories.find(x=>x.id===id);if(m){m.person=person;m.day=state.day;}}
function v32Choice(c){const d=v32Data();if(c.v32Miguel){const delta=c.v32Miguel==='respect'?1:c.v32Miguel==='honest'?2:-1;d.miguel.score=Math.max(-12,Math.min(12,d.miguel.score+delta));d.miguel.phase=d.miguel.score>=4?'서로를 의식하는 거리':d.miguel.score<=-2?'조심스러운 단절':'조심스러운 거리';d.miguel.pending.push({day:state.day,due:state.day+2,mode:c.v32Miguel,done:false});v32Record('mchoice_'+state.day+'_'+d.miguel.pending.length,'미겔 · 다니엘의 선택','다니엘은 '+(c.v32Miguel==='respect'?'예의를 지키기로':c.v32Miguel==='honest'?'흔들리는 마음을 인정하기로':'한동안 거리를 두기로')+' 했다.','다니엘');}if(c.v32Alex){const good=c.v32Alex==='repair';d.alex.repair=Math.max(0,d.alex.repair+(good?2:-1));d.alex.suspicion=Math.max(0,d.alex.suspicion+(good?-1:2));d.alex.pending.push({day:state.day,due:state.day+2,mode:c.v32Alex,done:false});v32Record('achoice_'+state.day+'_'+d.alex.pending.length,'알렉 · 형제의 갈림길',good?'다니엘은 형에게 먼저 말을 건넸다.':'다니엘은 형의 물음을 피했다.','알렉');}if(c.v32Npc){const q=d.npc[c.v32Npc];if(q){q.mode=c.v32NpcMode;q.stage=1;q.due=state.day+2;v32Record('npcchoice_'+c.v32Npc,'황궁 · 작은 약속',q.name+'의 부탁에 '+(q.mode==='help'?'응하기로':'응하기 어렵다고')+' 했다.',q.name,'의뢰');}}}
function v32Miguel(loc){const d=v32Data(),m=d.miguel;m.encounters++;const q=m.pending.find(x=>!x.done&&state.day>=x.due);if(q){q.done=true;const t=q.mode==='honest'?'미겔은 다니엘의 지난 고백을 잊지 않은 듯했다. “레온하르트 경. 그날 하신 말씀은 기억하고 있습니다.” 그녀는 시선을 거두었다. “그러나 알렉과의 약혼은 달라지지 않았습니다.” 다니엘은 고개를 숙였다.':q.mode==='respect'?'미겔은 다니엘이 지켜 준 거리를 알아차렸다. “그날의 배려는 감사했습니다.” 짧은 인사였지만 다니엘은 마음이 조금 놓였다.':'미겔은 다니엘에게 필요한 만큼만 인사를 건넸다. 서로가 물러선 거리가 더 뚜렷해졌다.';v32Record('mfollow_'+q.day,'미겔 · 선택의 결과',t,'미겔');return v18Scene('v32_miguel','미겔 코트리먼',t,[{text:'“……말씀, 감사합니다.”',next:'explore',effects:{resolve:1}}]);}if(m.encounters<5||m.seen[state.day])return false;m.seen[state.day]=true;const t=m.phase==='서로를 의식하는 거리'?'미겔은 다니엘의 발소리를 알아듣고 고개를 돌렸다. “레온하르트 경.” 그녀의 목소리는 차분했지만, 다니엘은 그 짧은 부름에도 마음이 흔들렸다.':m.phase==='조심스러운 단절'?'미겔은 먼저 예를 갖췄다. 다니엘은 형의 약혼녀와 마주한 지금, 자신의 침묵이 무례하게 보이지 않기를 바랐다.':'미겔은 노란 장미가 놓인 창가에 서 있었다. 다니엘은 다가갈 이유와 물러설 이유를 동시에 떠올렸다.';return v18Scene('v32_miguel','다니엘의 독백',t,[{text:'예의를 지키며 짧게 안부를 묻는다.',next:'explore',effects:{trust:1},v32Miguel:'respect'},{text:'숨기지 않고 솔직한 마음을 인정한다.',next:'explore',effects:{affection:1,risk:1},v32Miguel:'honest'},{text:'오늘은 인사만 남기고 물러선다.',next:'explore',effects:{resolve:1},v32Miguel:'withdraw'}]);}
function v32Alex(loc){const d=v32Data(),a=d.alex,q=a.pending.find(x=>!x.done&&state.day>=x.due);if(q){q.done=true;const good=q.mode==='repair';const t=good?'알렉은 다니엘의 사과를 조용히 들었다. 형제 사이의 불편함이 한 번에 사라지지는 않았지만, 적어도 서로의 말을 들을 자리는 남았다.':'알렉은 다니엘을 잠시 바라보았다. “네가 무슨 생각을 하는지 모르겠구나.” 다니엘은 그 말을 듣고도 곧바로 답하지 못했다.';v32Record('afollow_'+q.day,'알렉 · '+(good?'남겨 둔 자리':'쌓이는 의심'),t,'알렉');return v18Scene('v32_alex','알렉 레온하르트',t,[{text:good?'“형님, 감사합니다.”':'“……죄송합니다, 형님.”',next:'explore',effects:{resolve:1}}]);}if(a.seen[state.day]||socialProgress().alexTension<5)return false;a.seen[state.day]=true;const t=a.suspicion>a.repair?'알렉의 질문은 짧았지만 다니엘은 그 안에 쌓인 의심을 느꼈다. 형은 아직 미겔과의 약혼을 이어 가고 있었다.':'알렉은 동생에게 잠시 자리를 내주었다. 다니엘은 형의 배려 앞에서 자신이 얼마나 서툴렀는지 떠올렸다.';return v18Scene('v32_alex','알렉 레온하르트',t,[{text:'“형님, 저부터 말씀드리겠습니다.”',next:'explore',effects:{resolve:1},v32Alex:'repair'},{text:'“지금은 말씀드릴 수 없습니다.”',next:'explore',effects:{risk:1},v32Alex:'avoid'}]);}
function v32Npc(loc){const d=v32Data(),p=V19_NPC_PROFILES[loc],n=v19Data().npc[loc];if(!p||!n)return false;const q=d.npc[loc];if(q&&q.stage===1&&state.day>=q.due){q.stage=2;q.due=state.day+2;const good=q.mode==='help';n.rapport=Math.max(0,(n.rapport||0)+(good?2:-1));const t=good?p.name+'은 다니엘에게 조용히 감사를 표했다. 도움받은 일을 잊지 않겠다며 궁의 소소한 소식을 전했다.':p.name+'은 고개를 끄덕였다. 부탁을 거절당한 일은 이해했지만, 두 사람의 대화는 전보다 짧아졌다.';v32Record('npcresult_'+loc,p.name+' · 인연의 변화',t,p.name,'의뢰');return v18Scene('v32_npc',p.name,t,[{text:'정중히 인사한다.',next:'explore',effects:{reputation:good?2:0}}]);}if(q&&q.stage===2&&state.day>=q.due){q.stage=3;const t=q.mode==='help'?p.name+'은 다니엘을 다시 찾아 작은 소식을 전했다. 그날의 부탁은 궁 안에 믿을 만한 인연 하나를 남겼다.':p.name+'과 다니엘은 다시 마주쳤다. 서로를 탓하지 않았지만, 관계를 회복하려면 시간이 필요했다.';v32Record('npcecho_'+loc,p.name+' · 다시 마주친 날',t,p.name,'의뢰');return v18Scene('v32_npc',p.name,t,[{text:'그날의 일을 마음에 새긴다.',next:'explore',effects:{resolve:1}}]);}if(q||n.rapport<6)return false;d.npc[loc]={name:p.name,stage:0,mode:null,due:0};const t=p.name+'은 다니엘에게 작지만 남에게 말하기 어려운 부탁을 꺼냈다. 다니엘은 자신의 약속이 훗날 두 사람의 관계를 바꿀 수도 있다는 생각을 했다.';return v18Scene('v32_npc',p.name,t,[{text:'“제가 할 수 있는 만큼 돕겠습니다.”',next:'explore',v32Npc:loc,v32NpcMode:'help'},{text:'“죄송합니다. 이번에는 어렵겠습니다.”',next:'explore',v32Npc:loc,v32NpcMode:'decline'}]);}
function v32Daily(){const d=v32Data();if(d.days[state.day])return;const last=d.events.filter(x=>x.day<state.day).slice(-1)[0];const t=last?'전날의 기록 「'+last.title+'」이 마음에 남았다. 다니엘은 그때의 선택이 오늘의 자신에게도 영향을 주고 있음을 느꼈다.':'황궁의 아침이 밝았다. 다니엘은 세 개의 달 아래서 무엇을 지켜야 할지 생각했다.';d.days[state.day]={text:t,previous:last?.id||null};v32Record('day_'+state.day,'DAY '+state.day+' · 이어지는 마음',t,'다니엘','연대기');}
function v32Board(){const d=v32Data();modal('v32 · 관계와 인연','미겔: '+d.miguel.phase+' (선택 '+d.miguel.pending.length+'회)\n알렉: 신뢰 회복 '+d.alex.repair+' / 누적 의심 '+d.alex.suspicion+'\nNPC 특별 인연 '+Object.keys(d.npc).length+'건\n날짜별 기록 '+Object.keys(d.days).length+'일');}
function v32Chronicle(){const memories=v16Data().memories||[],wrap=document.createElement('div'),head=document.createElement('p');head.className='hint';head.textContent='기록을 인물·분류·검색어로 찾고 날짜순으로 읽습니다. 항목을 누르면 상세 내용을 확인할 수 있습니다.';wrap.append(head);const search=document.createElement('input');search.placeholder='기록 검색';wrap.append(search);const who=document.createElement('select');['전체','다니엘','미겔','알렉','황궁 NPC'].forEach(v=>{const o=document.createElement('option');o.value=v;o.textContent=v;who.append(o)});wrap.append(who);const order=document.createElement('select');[['old','오래된순'],['new','최신순'],['title','제목순']].forEach(([v,t])=>{const o=document.createElement('option');o.value=v;o.textContent=t;order.append(o)});wrap.append(order);const list=document.createElement('div');wrap.append(list);function paint(){list.replaceChildren();let items=memories.map((m,i)=>({...m,index:i})).filter(m=>{const person=m.person||(/미겔/.test(m.title)?'미겔':/알렉/.test(m.title)?'알렉':/시종|정원사|악단/.test(m.title)?'황궁 NPC':'다니엘');const group=person==='다니엘'||person==='미겔'||person==='알렉'?person:'황궁 NPC';return(who.value==='전체'||who.value===group)&&[m.title,m.text,m.category,m.person].join(' ').toLowerCase().includes(search.value.trim().toLowerCase())});items.sort((a,b)=>order.value==='title'?String(a.title).localeCompare(String(b.title),'ko'):order.value==='new'?(b.day||0)-(a.day||0)||b.index-a.index:(a.day||0)-(b.day||0)||a.index-b.index);for(const m of items){const b=document.createElement('button');b.textContent='DAY '+(m.day||'?')+' · '+m.title;b.onclick=()=>modal(m.title,'DAY '+(m.day||'?')+' · '+(m.person||m.category||'기록')+'\n\n'+m.text);list.append(b)}if(!items.length){const p=document.createElement('p');p.textContent='조건에 맞는 기록이 없습니다.';list.append(p)}}search.oninput=paint;who.onchange=paint;order.onchange=paint;paint();modal('v32 · 상세 사건 연대기',wrap);}


// v34: independent, lazy-initialized state; old saves remain readable.
function v34Data(){
 const d=state.v34??(state.v34={miguel:{warmth:0,restraint:0,meetings:0},alex:{trust:0,doubt:0},npc:{},pending:[],events:[],seen:{},lastDay:0});
 d.miguel??={warmth:0,restraint:0,meetings:0};d.alex??={trust:0,doubt:0};d.npc??={};d.pending??=[];d.events??=[];d.seen??={};return d;
}
function v34Record(id,title,body,person,kind,parent){
 const d=v34Data(),key='v34_'+id;if(d.events.some(e=>e.id===key))return key;
 const event={id:key,day:state.day,title,text:body,person,category:kind,parent:parent||null};
 d.events.push(event);if(d.events.length>300)d.events.shift();
 v18Remember(key,title,body,kind);const mem=v16Data().memories.find(m=>m.id===key);
 if(mem){mem.person=person;mem.parent=parent||null;mem.day=state.day;}return key;
}
function v34Queue(kind,mode,person,parent,delay=2,loc=null){
 const d=v34Data();d.pending.push({id:'v34q_'+kind+'_'+state.day+'_'+d.pending.length,kind,mode,person,parent,loc,due:state.day+delay,done:false});
}
function v34Choice(c){
 const d=v34Data();
 if(c.v34Miguel){const mode=c.v34Miguel;d.miguel.meetings++;d.miguel.warmth=Math.max(-12,Math.min(12,d.miguel.warmth+(mode==='honest'?2:mode==='courtesy'?1:-1)));d.miguel.restraint=Math.max(0,Math.min(15,d.miguel.restraint+(mode==='courtesy'?2:mode==='withdraw'?1:0)));const id=v34Record('m_'+state.day+'_'+d.miguel.meetings,'미겔 · 마음과 예의',mode==='honest'?'다니엘은 솔직한 마음을 인정했지만, 형과 미겔의 약혼을 먼저 떠올렸다.':mode==='courtesy'?'다니엘은 선을 넘지 않으려 조심스럽게 예의를 갖췄다.':'다니엘은 자신이 감당할 수 없는 말을 삼켰다.','미겔','감정',null);v34Queue('miguel',mode,'미겔',id,2);}
 if(c.v34Alex){const mode=c.v34Alex;d.alex.trust=Math.max(-12,Math.min(12,d.alex.trust+(mode==='speak'?2:-1)));d.alex.doubt=Math.max(0,Math.min(15,d.alex.doubt+(mode==='speak'?-1:2)));const id=v34Record('a_'+state.day+'_'+d.events.length,'알렉 · 형제의 거리',mode==='speak'?'다니엘은 불편한 대화를 피하지 않기로 했다.':'다니엘은 대답을 미루었다. 형의 시선이 오래 남았다.','알렉','형제',null);v34Queue('alex',mode,'알렉',id,2);}
 if(c.v34Npc){const q=d.npc[c.v34Npc];if(q){q.mode=c.v34NpcMode;q.stage=1;q.due=state.day+2;const id=v34Record('n_'+c.v34Npc+'_'+state.day,q.name+' · 평판 앞의 선택',q.mode==='help'?'다니엘은 누군가의 체면을 지키며 돕기로 했다.':'다니엘은 지키지 못할 약속을 하지 않았다.',q.name,'황궁',null);q.parent=id;}}
}
function v34Follow(kind,loc){
 const d=v34Data(),q=d.pending.find(x=>!x.done&&x.kind===kind&&state.day>=x.due&&(x.loc===null||x.loc===loc));if(!q)return false;
 q.done=true;let title,text,speaker;
 if(kind==='miguel'){speaker='미겔 코트리먼';title='미겔 · 며칠 뒤의 인사';text=q.mode==='honest'?'미겔은 다니엘의 말을 잊지 않았다. “레온하르트 경. 그날의 말씀은 기억합니다. 하지만 알렉과의 약혼은 달라지지 않았습니다.” 다니엘은 고개를 숙였다.':'미겔은 다니엘의 걸음소리를 알아차렸다. '+(q.mode==='courtesy'?'“지난번에는 배려해 주셔서 감사했습니다.” 짧은 말에 다니엘의 마음이 흔들렸다.':'그녀는 더 묻지 않았다. 다니엘은 침묵도 하나의 선택임을 깨달았다.');}
 else{speaker='알렉 레온하르트';title='알렉 · 남겨 둔 대답';text=q.mode==='speak'?'알렉은 동생이 먼저 꺼낸 말을 끝까지 들었다. “한 번의 대화로 모든 게 달라지진 않는다. 그래도 네가 피하지 않은 건 알겠다.”':'알렉은 동생을 조용히 불렀다. “다니엘, 지난번 대답은 아직 듣지 못했다.” 다니엘은 고개를 들었다.';}
 v34Record('follow_'+q.id,title,text,kind==='miguel'?'미겔':'알렉','후속',q.parent);
 return v18Scene('v34_follow',speaker,text,[{text:'“……예. 기억하겠습니다.”',next:'explore',effects:{resolve:1}}]);
}
function v34Miguel(loc){
 if(v34Follow('miguel',loc))return true;
 const d=v34Data(),m=v32Data().miguel,phase=m.phase||'조심스러운 거리',key='miguel_'+phase+'_'+Math.floor(state.day/3);
 if((m.encounters||0)<7||d.seen[key])return false;d.seen[key]=true;
 const tone=d.miguel.warmth>=4?'그녀는 다니엘이 다가오는 소리를 알아차리고 먼저 서류를 덮었다.':d.miguel.warmth<=-2?'그녀는 평소처럼 예의를 갖췄지만, 두 사람 사이에는 말을 고르는 시간이 길었다.':'미겔은 노란 장미를 바라보다 다니엘의 발소리에 고개를 돌렸다.';
 return v18Scene('v34_miguel','다니엘의 독백',tone+' 다니엘은 형의 약혼녀에게 어떤 태도가 옳은지 여전히 확신하지 못했다.',[{text:'“코트리먼 영애, 잠시 말씀드려도 되겠습니까?”',next:'explore',v34Miguel:'honest'},{text:'예의를 갖춰 용건만 전한다.',next:'explore',v34Miguel:'courtesy'},{text:'인사만 하고 물러난다.',next:'explore',v34Miguel:'withdraw'}]);
}
function v34Alex(loc){
 if(v34Follow('alex',loc))return true;
 const d=v34Data(),a=v32Data().alex,key='alex_'+Math.floor(state.day/3);
 if(d.seen[key]||(a.repair||0)+(a.suspicion||0)<7)return false;d.seen[key]=true;
 const doubt=(a.suspicion||0)+d.alex.doubt,trust=(a.repair||0)+d.alex.trust;
 const t=doubt>trust?'알렉은 동생을 바라보며 물었다. “요즘 내게 말하지 않는 일이 있느냐?” 다니엘은 형의 약혼을 떠올리고 입술을 다물었다.':'알렉은 다니엘에게 옆자리를 가리켰다. “전보다 말이 많아졌구나. 오늘은 네 생각을 듣고 싶다.”';
 return v18Scene('v34_alex','알렉 레온하르트',t,[{text:'“형님, 제가 먼저 말씀드리겠습니다.”',next:'explore',v34Alex:'speak'},{text:'“……아직 정리되지 않았습니다.”',next:'explore',v34Alex:'avoid'}]);
}
function v34Npc(loc){
 const p=V19_NPC_PROFILES[loc],n=v19Data().npc[loc];if(!p||!n)return false;
 const d=v34Data(),q=d.npc[loc];
 if(q&&q.stage===1&&state.day>=q.due){q.stage=2;q.due=state.day+2;const good=q.mode==='help';n.rapport=Math.max(0,Math.min(10,(n.rapport||0)+(good?1:-1)));d.reputation=(d.reputation||0)+(good?2:-1);const t=good?p.name+'은 다니엘이 지킨 약속을 기억했다. 궁 안에서 그를 신중하고 믿음직한 사람이라 말하는 이들이 늘었다.':p.name+'은 정중하게 인사했다. 부탁은 이루어지지 않았고, 궁 안의 평가는 엇갈렸다.';const id=v34Record('npc_result_'+loc+'_'+q.start,p.name+' · 달라진 소문',t,p.name,'평판',q.parent);q.result=id;return v18Scene('v34_npc',p.name,t,[{text:'차분히 대답한다.',next:'explore'}]);}
 if(q&&q.stage===2&&state.day>=q.due){q.stage=3;const t=q.mode==='help'?p.name+'은 다니엘에게 다른 이들의 작은 고마움을 전했다. 다니엘은 자신이 한 선택의 무게를 다시 생각했다.':p.name+'은 다니엘에게 다시 인사했다. 한 번의 거절로 모든 인연이 끝나는 것은 아니었다.';v34Record('npc_echo_'+loc+'_'+q.start,p.name+' · 남은 인연',t,p.name,'후속',q.result);return v18Scene('v34_npc',p.name,t,[{text:'예의를 갖춰 답한다.',next:'explore'}]);}
 if(q||(n.rapport||0)<8)return false;
 d.npc[loc]={name:p.name,start:state.day,stage:0,mode:null,due:0};
 const t=p.name+'은 다니엘에게 황궁의 소문 때문에 곤란해진 이를 도울 수 있겠느냐고 조심스럽게 물었다. 사소한 선택이 다른 이의 평판까지 바꿀 수 있었다.';
 return v18Scene('v34_npc',p.name,t,[{text:'“제가 할 수 있는 범위에서 돕겠습니다.”',next:'explore',v34Npc:loc,v34NpcMode:'help'},{text:'“죄송합니다. 약속드리기는 어렵습니다.”',next:'explore',v34Npc:loc,v34NpcMode:'decline'}]);
}
function v34Daily(){
 const d=v34Data();if(d.seen['day_'+state.day])return;d.seen['day_'+state.day]=true;
 const due=d.pending.filter(q=>!q.done&&q.due<=state.day),last=d.events.filter(e=>e.day<state.day).slice(-1)[0];
 const t=due.length?'다니엘은 며칠 전의 선택이 아직 끝나지 않았음을 느꼈다. 다시 마주해야 할 사람이 있었다.':last?'어제의 일 「'+last.title+'」이 마음에 남았다. 다니엘은 같은 선택을 반복하지 않으려 애썼다.':'세 개의 달이 남긴 희미한 빛 아래, 황궁의 하루가 다시 시작되었다.';
 v34Record('day_'+state.day,'DAY '+state.day+' · 이어지는 선택',t,'다니엘','일지',last?.id||null);
}
function v34Chronicle(){
 const d=v34Data(),wrap=document.createElement('div'),desc=document.createElement('p');desc.textContent='v34에서 기록된 선택 → 결과 → 후일담을 연결해 확인합니다. 과거 버전 기록은 기존 회상 갤러리에 보존됩니다.';wrap.append(desc);
 const person=document.createElement('select');['전체','미겔','알렉','다니엘','황궁 NPC'].forEach(x=>{const o=document.createElement('option');o.value=x;o.textContent=x;person.append(o)});wrap.append(person);
 const search=document.createElement('input');search.placeholder='제목·본문 검색';wrap.append(search);
 const order=document.createElement('select');[['new','최신순'],['old','오래된순'],['title','제목순']].forEach(([v,t])=>{const o=document.createElement('option');o.value=v;o.textContent=t;order.append(o)});wrap.append(order);
 const list=document.createElement('div');wrap.append(list);
 function paint(){list.replaceChildren();let a=d.events.map((e,i)=>({...e,index:i})).filter(e=>(person.value==='전체'||(person.value==='황궁 NPC'?!['미겔','알렉','다니엘'].includes(e.person):e.person===person.value))&&[e.title,e.text,e.person,e.category].join(' ').toLowerCase().includes(search.value.trim().toLowerCase()));a.sort((x,y)=>order.value==='title'?x.title.localeCompare(y.title,'ko'):order.value==='old'?x.day-y.day||x.index-y.index:y.day-x.day||y.index-x.index);for(const e of a){const b=document.createElement('button');b.textContent='DAY '+e.day+' · '+e.title+(e.parent?' · ↳ 이전 선택':'');b.onclick=()=>{const parent=d.events.find(x=>x.id===e.parent);modal(e.title,(parent?'원인: DAY '+parent.day+' · '+parent.title+'\n'+parent.text+'\n\n':'')+'DAY '+e.day+'\n'+e.text)};list.append(b)}if(!a.length){const p=document.createElement('p');p.textContent='해당 기록이 없습니다.';list.append(p)}}person.onchange=paint;search.oninput=paint;order.onchange=paint;paint();modal('v34 · 선택 경로 연대기',wrap);
}
function v34Board(){const d=v34Data();modal('v34 · 관계와 평판','미겔 · 감정 '+d.miguel.warmth+' / 절제 '+d.miguel.restraint+'\n알렉 · 신뢰 '+d.alex.trust+' / 의심 '+d.alex.doubt+'\n황궁 평판 변화 '+(d.reputation||0)+'\n남은 후속 사건 '+d.pending.filter(q=>!q.done).length+'건\n기록 '+d.events.length+'건');}


// v35: choice consequences and multi-day stories. All new fields are lazy and optional.
function v35Data(){
 const d=state.v35??(state.v35={miguel:{meetings:0,choices:[]},alex:{conversations:0,choices:[]},npc:{},reputation:0,quests:[],events:[],seen:{}});
 d.miguel??={meetings:0,choices:[]};d.miguel.choices??=[];d.alex??={conversations:0,choices:[]};d.alex.choices??=[];d.npc??={};d.quests??=[];d.events??=[];d.seen??={};return d;
}
function v35Record(id,title,body,person,category,parent){
 const d=v35Data(),key='v35_'+id;if(d.events.some(e=>e.id===key))return key;
 const e={id:key,title,text:body,person,category,parent:parent||null,day:state.day};d.events.push(e);if(d.events.length>250)d.events.shift();
 v18Remember(key,title,body,category);const m=v16Data().memories.find(x=>x.id===key);if(m){m.person=person;m.parent=parent||null;m.day=state.day;}return key;
}
function v35Queue(type,mode,place,parent,delay){const d=v35Data();d.quests.push({id:'q'+state.day+'_'+d.quests.length,type,mode,place,parent,due:state.day+delay,stage:0});}
function v35Choice(c){
 const d=v35Data();
 if(c.v35Miguel){const mode=c.v35Miguel;d.miguel.choices.push({day:state.day,mode});const id=v35Record('mchoice_'+state.day+'_'+d.miguel.choices.length,'미겔 · 마음을 다루는 법',mode==='confess'?'다니엘은 마음을 숨기지 않았지만, 형의 약혼녀에게 답을 요구할 수 없음을 알았다.':mode==='respect'?'다니엘은 미겔의 입장을 먼저 헤아리며 예의를 지켰다.':'다니엘은 더 말하지 않기로 했다. 침묵 역시 책임이 될 수 있었다.','미겔','선택',null);v35Queue('miguel',mode,null,id,2);}
 if(c.v35Alex){const mode=c.v35Alex;d.alex.choices.push({day:state.day,mode});const id=v35Record('achoice_'+state.day+'_'+d.alex.choices.length,'알렉 · 신뢰의 문턱',mode==='repair'?'다니엘은 형에게 먼저 설명하고 끝까지 들으려 했다.':'다니엘은 대답을 피했다. 오해를 바로잡을 기회도 함께 미뤄졌다.','알렉','선택',null);v35Queue('alex',mode,null,id,2);}
 if(c.v35Npc){const q=d.npc[c.v35Npc];if(q&&q.stage===0){q.mode=c.v35NpcMode;q.stage=1;q.due=state.day+1;q.parent=v35Record('nchoice_'+c.v35Npc+'_'+state.day,q.name+' · 평판을 건 부탁',q.mode==='help'?'다니엘은 소문보다 당사자의 사정을 먼저 확인하기로 했다.':'다니엘은 자신이 책임질 수 없는 약속을 거절했다.',q.name,'선택',null);}}
}
function v35Follow(type,loc){
 const d=v35Data(),q=d.quests.find(x=>x.type===type&&x.stage===0&&state.day>=x.due);if(!q)return false;q.stage=1;
 let speaker,title,body;
 if(type==='miguel'){speaker='미겔 코트리먼';title='미겔 · 남겨 둔 대답';body=q.mode==='confess'?'미겔은 다니엘의 걸음걸이를 알아보고 고개를 들었다. “그날의 말씀은 기억합니다. 다만 알렉과의 약혼을 가볍게 여길 수는 없습니다.” 다니엘은 서둘러 대답했다. “……예. 알고 있습니다. 곤란하게 해 드릴 생각은 없었습니다.”':q.mode==='respect'?'미겔은 짧게 고개를 숙였다. “지난번 배려는 감사했습니다. 알렉에게도 같은 예의를 보여 주시겠지요.” 다니엘은 한참 뒤에야 “물론입니다.”라고 답했다.':'미겔은 아무것도 캐묻지 않았다. “레온하르트 경, 그날 이후 괜찮으셨습니까?” 다니엘은 눈을 피하지 않으려 애썼다.';}
 else{speaker='알렉 레온하르트';title='알렉 · 이틀 뒤의 대화';body=q.mode==='repair'?'알렉은 다니엘의 설명을 끝까지 들었다. “네가 내게 먼저 이야기한 건 고맙다. 하지만 신뢰는 말보다 시간이 필요해.” 다니엘은 “……알겠습니다, 형님.” 하고 고개를 숙였다.':'알렉은 한동안 동생을 바라보았다. “다니엘, 네가 피할수록 내가 묻지 않을 수 없다는 건 알겠지.” 다니엘은 자신의 침묵이 형을 더 불안하게 했음을 깨달았다.';}
 const id=v35Record('result_'+q.id,title,body,type==='miguel'?'미겔':'알렉','후속',q.parent);q.result=id;q.stage=2;q.due=state.day+2;
 return v18Scene('v35_follow',speaker,body,[{text:'그 말을 마음에 새긴다.',next:'explore'}]);
}
function v35Echo(type){const d=v35Data(),q=d.quests.find(x=>x.type===type&&x.stage===2&&state.day>=x.due);if(!q)return false;q.stage=3;
 const isM=type==='miguel',text=isM?'며칠 전 미겔이 남긴 말이 다시 떠올랐다. 다니엘은 자신의 감정과 지켜야 할 선이 서로 다르다는 사실을 조금씩 배웠다.':'형과 나눈 말이 쉽게 잊히지 않았다. 다니엘은 다음 대화에서 도망치지 않겠다고, 혹은 더 신중해지겠다고 마음먹었다.';
 v35Record('echo_'+q.id,isM?'미겔 · 오래 남은 인사':'알렉 · 남은 숙제',text,'다니엘','감정',q.result);return v18Scene('v35_echo','다니엘의 독백',text,[{text:'다음 날을 맞이한다.',next:'explore'}]);}
function v35Miguel(loc){if(v35Follow('miguel',loc)||v35Echo('miguel'))return true;const d=v35Data(),m=v34Data().miguel;const key='m_'+Math.floor(state.day/4);if(d.seen[key]||(m.meetings||0)<2)return false;d.seen[key]=true;d.miguel.meetings++;
 const mood=m.warmth>=3&&m.restraint>=2?'미겔은 다니엘의 걸음소리를 듣고 서류를 접었다. 조심스러운 신뢰가 생겼지만, 그녀의 태도는 여전히 단정했다.':m.warmth<=-2?'미겔은 인사를 받아 주었으나 먼저 거리를 좁히지는 않았다.':'노란 장미 곁에서 미겔이 다니엘을 돌아보았다. 그녀는 표정보다 그의 망설이는 발걸음을 먼저 알아차렸다.';
 return v18Scene('v35_miguel','다니엘의 독백',mood+' 다니엘은 형 알렉의 약혼녀 앞에서 자신의 마음을 어떻게 다뤄야 할지 생각했다.',[{text:'“코트리먼 영애, 제 마음을 부정할 수는 없습니다.”',next:'explore',v35Miguel:'confess'},{text:'“영애의 입장을 먼저 생각하겠습니다.”',next:'explore',v35Miguel:'respect'},{text:'고개를 숙이고 조용히 물러난다.',next:'explore',v35Miguel:'withdraw'}]);}
function v35Alex(loc){if(v35Follow('alex',loc)||v35Echo('alex'))return true;const d=v35Data(),a=v34Data().alex,key='a_'+Math.floor(state.day/4);if(d.seen[key]||a.trust+a.doubt<3)return false;d.seen[key]=true;d.alex.conversations++;
 const tension=a.doubt>a.trust?'알렉의 말투에는 여전히 경계가 남아 있었다. “네가 숨기는 일이 있다면 언젠가는 듣게 되겠지.”':'알렉은 동생에게 자리를 내주었다. “너와 제대로 이야기할 시간이 필요하겠구나.”';
 return v18Scene('v35_alex','알렉 레온하르트',tension,[{text:'“형님, 제 이야기를 끝까지 들어 주시겠습니까?”',next:'explore',v35Alex:'repair'},{text:'“……지금은 말씀드리기 어렵습니다.”',next:'explore',v35Alex:'avoid'}]);}
function v35Npc(loc){const p=V19_NPC_PROFILES[loc],n=v19Data().npc[loc];if(!p||!n)return false;const d=v35Data(),q=d.npc[loc];
 if(q&&q.stage===1&&state.day>=q.due){q.stage=2;q.due=state.day+2;const good=q.mode==='help';n.rapport=Math.max(0,Math.min(10,(n.rapport||0)+(good?1:-1)));d.reputation+=good?2:-1;const t=good?p.name+'은 다니엘의 확인 덕분에 억울한 소문이 잦아들었다고 전했다. 황궁에서는 그가 사람을 함부로 판단하지 않는다는 이야기가 돌았다.':p.name+'은 부탁이 해결되지 않았다고 전했다. 다니엘은 거절에도 책임이 따른다는 사실을 받아들였다.';q.result=v35Record('nresult_'+loc+'_'+q.start,p.name+' · 달라진 평가',t,p.name,'결과',q.parent);return v18Scene('v35_npc',p.name,t,[{text:'“말씀해 주셔서 감사합니다.”',next:'explore'}]);}
 if(q&&q.stage===2&&state.day>=q.due){q.stage=3;const t=q.mode==='help'?p.name+'은 다른 시종이 보낸 짧은 감사의 말을 전했다. 다니엘은 작은 배려가 다른 이의 하루를 바꿀 수 있음을 알았다.':p.name+'은 다니엘에게 평소처럼 인사했다. 부탁은 이루어지지 않았지만, 인연을 다시 쌓을 여지는 남아 있었다.';v35Record('necho_'+loc+'_'+q.start,p.name+' · 소문 뒤의 인연',t,p.name,'후일담',q.result);return v18Scene('v35_npc',p.name,t,[{text:'정중하게 인사를 돌려준다.',next:'explore'}]);}
 if(q||(n.rapport||0)<7)return false;d.npc[loc]={name:p.name,start:state.day,stage:0,mode:null,due:0};const rep=(v34Data().reputation||0)+(v33Data().reputation||0)+d.reputation;const t=rep>=3?p.name+'은 황궁에서 다니엘의 평판이 나쁘지 않다며, 억울한 소문을 듣는 이의 사정을 확인해 달라고 부탁했다.':p.name+'은 최근 황궁의 소문이 복잡해졌다고 조심스럽게 털어놓았다. 다니엘이 편견 없이 이야기를 들어 줄 수 있을지 묻는다.';
 return v18Scene('v35_npc',p.name,t,[{text:'“확인해 보겠습니다. 다만 성급히 판단하지 않겠습니다.”',next:'explore',v35Npc:loc,v35NpcMode:'help'},{text:'“죄송합니다. 지금은 책임질 수 없습니다.”',next:'explore',v35Npc:loc,v35NpcMode:'decline'}]);}
function v35Daily(){const d=v35Data(),key='day_'+state.day;if(d.seen[key])return;d.seen[key]=true;const q=d.quests.filter(x=>x.stage<3&&x.due<=state.day),last=d.events.filter(e=>e.day<state.day).slice(-1)[0];const t=q.length?'지난 선택의 결과가 다가오고 있었다. 다니엘은 오늘 마주칠 얼굴을 떠올렸다.':last?'「'+last.title+'」의 기억이 남았다. 다니엘은 어제의 자신과 같은 사람이면서도 조금은 달라졌음을 느꼈다.':'황궁의 하루가 시작되었다. 다니엘은 세 개의 달 아래에서 누구를 만나게 될지 알 수 없었다.';v35Record('day_'+state.day,'DAY '+state.day+' · 이어지는 마음',t,'다니엘','일지',last?.id||null);}
function v35Chronicle(){const d=v35Data(),wrap=document.createElement('div'),intro=document.createElement('p');intro.textContent='v35의 선택 → 결과 → 후일담을 따라갑니다. 기존 회상 기록은 이전 갤러리에서 계속 볼 수 있습니다.';wrap.append(intro);const search=document.createElement('input');search.placeholder='제목·본문·인물 검색';wrap.append(search);const who=document.createElement('select');['전체','미겔','알렉','다니엘','황궁 NPC'].forEach(x=>{const o=document.createElement('option');o.value=x;o.textContent=x;who.append(o)});wrap.append(who);const order=document.createElement('select');[['new','최신순'],['old','오래된순'],['title','제목순']].forEach(([v,t])=>{const o=document.createElement('option');o.value=v;o.textContent=t;order.append(o)});wrap.append(order);const list=document.createElement('div');wrap.append(list);
 function paint(){list.replaceChildren();let a=d.events.map((e,i)=>({...e,i})).filter(e=>(who.value==='전체'||(who.value==='황궁 NPC'?!['미겔','알렉','다니엘'].includes(e.person):e.person===who.value))&&[e.title,e.text,e.person,e.category].join(' ').toLowerCase().includes(search.value.trim().toLowerCase()));a.sort((x,y)=>order.value==='title'?x.title.localeCompare(y.title,'ko'):order.value==='old'?x.day-y.day||x.i-y.i:y.day-x.day||y.i-x.i);for(const e of a){const b=document.createElement('button');b.textContent='DAY '+e.day+' · '+e.title+(e.parent?' · ↳ 연결됨':'');b.onclick=()=>{let chain=[],cur=e,seen=new Set();while(cur&&!seen.has(cur.id)){seen.add(cur.id);chain.unshift(cur);cur=d.events.find(x=>x.id===cur.parent)}modal(e.title,chain.map(x=>'DAY '+x.day+' · '+x.title+'\n'+x.text).join('\n\n↓ 이어지는 선택 ↓\n\n'))};list.append(b)}if(!a.length){const x=document.createElement('p');x.textContent='해당 기록이 없습니다.';list.append(x)}}search.oninput=paint;who.onchange=paint;order.onchange=paint;paint();modal('v35 · 선택 경로 상세 추적',wrap);}
function v35Board(){const d=v35Data(),m=v34Data().miguel,a=v34Data().alex;modal('v35 · 장기 관계 현황','미겔 · 감정 '+m.warmth+' / 절제 '+m.restraint+' / v35 선택 '+d.miguel.choices.length+'회\n알렉 · 신뢰 '+a.trust+' / 의심 '+a.doubt+' / v35 대화 '+d.alex.conversations+'회\n황궁 평판(v35) '+d.reputation+'\n진행 중 사건 '+(d.quests.filter(x=>x.stage<3).length+Object.values(d.npc).filter(x=>x.stage>0&&x.stage<3).length)+'건\n기록 '+d.events.length+'건');}


// v36: backward-compatible long-running consequences and unified chronicle.
function v36Data(){
 const d=state.v36??(state.v36={miguel:{tone:'조심스러운 거리',choices:0},alex:{tone:'대화의 여지'},npc:{},pending:[],events:[],seen:{}});
 d.miguel??={tone:'조심스러운 거리',choices:0};d.alex??={tone:'대화의 여지'};d.npc??={};d.pending??=[];d.events??=[];d.seen??={};return d;
}
function v36Log(id,title,body,person='다니엘',kind='서사',parent=null){
 const d=v36Data(),key='v36_'+id;if(d.events.some(e=>e.id===key))return key;
 d.events.push({id:key,title,text:body,person,category:kind,parent,day:state.day});
 v18Remember(key,title,body,kind);const m=v16Data().memories.find(x=>x.id===key);if(m){m.person=person;m.parent=parent;m.day=state.day;}
 return key;
}
function v36Choice(c){
 const d=v36Data();let type='',mode='',person='',title='',body='';
 if(c.v36Miguel){type='miguel';mode=c.v36Miguel;person='미겔';title='미겔 · 조심스러운 약속';body=mode==='respect'?'다니엘은 형의 약혼녀를 향한 마음보다 먼저 그녀의 선택과 의무를 존중하기로 했다.':'다니엘은 마음을 숨기지 않되 답을 재촉하지 않기로 했다.';d.miguel.choices++;d.miguel.tone=mode==='respect'?'존중과 절제':'솔직함과 경계';}
 if(c.v36Alex){type='alex';mode=c.v36Alex;person='알렉';title='알렉 · 형제의 문턱';body=mode==='speak'?'다니엘은 오해를 풀기 위해 자신의 말부터 바로잡았다.':'다니엘은 감정을 정리할 시간을 부탁했다.';d.alex.tone=mode==='speak'?'신뢰 회복의 시도':'미뤄진 대화';}
 if(c.v36Npc){type='npc';mode=c.v36NpcMode;person=V19_NPC_PROFILES[c.v36Npc]?.name||'황궁 NPC';title=person+' · 소문의 무게';body=mode==='help'?'다니엘은 소문을 옮기지 않고 사실을 확인하기로 했다.':'다니엘은 지금 책임질 수 없는 일을 약속하지 않았다.';d.npc[c.v36Npc]={mode,day:state.day};}
 if(!type)return;const id=v36Log('choice_'+type+'_'+state.day+'_'+d.events.length,title,body,person,'선택');
 d.pending.push({id:'v36q_'+state.day+'_'+d.pending.length,type,mode,loc:c.v36Npc||null,due:state.day+2,stage:0,parent:id});
}
function v36Follow(type,loc){
 const d=v36Data(),q=d.pending.find(x=>x.type===type&&x.stage<2&&state.day>=x.due&&(type!=='npc'||x.loc===loc));if(!q)return false;
 const first=q.stage===0;q.stage++;q.due=state.day+(first?2:0);
 let person='다니엘',body='',title='';
 if(type==='miguel'){
  person='미겔';title=first?'미겔 · 다시 만난 인사':'미겔 · 오래 남은 침묵';
  body=first?(q.mode==='respect'?'미겔은 다니엘의 발소리를 알아보았다. “지난번의 배려는 기억하고 있습니다.” 다니엘은 고개를 숙였다. “……당연히 지켜야 할 예의였습니다.”':'미겔은 잠시 말을 고른 뒤 대답했다. “말씀은 들었습니다. 다만 알렉과의 약혼은 제 책임입니다.” 다니엘은 “……알고 있습니다.” 하고 답했다.'):'그녀가 했던 말을 떠올리며 다니엘은 자신의 감정과 상대의 결정을 구별해야 한다고 생각했다.';
 }else if(type==='alex'){
  person='알렉';title=first?'알렉 · 다음 대화':'알렉 · 형제의 남은 말';
  body=first?(q.mode==='speak'?'알렉은 동생의 말을 끝까지 듣고 한숨을 내쉬었다. “네가 먼저 말한 건 알겠다. 다만 나도 생각할 시간이 필요해.”':'알렉은 다니엘의 침묵을 살폈다. “말하지 않으면 서로의 생각을 알 수 없어.” 다니엘은 시선을 내렸다.'):'다니엘은 형과의 대화가 한 번의 사과나 침묵으로 끝나지 않는다는 사실을 받아들였다.';
 }else{
  const profile=V19_NPC_PROFILES[loc],n=v19Data().npc[loc];person=profile?.name||'황궁 NPC';title=first?person+' · 부탁의 결과':person+' · 뒤늦은 소식';
  body=first?(q.mode==='help'?person+'은 다니엘이 소문을 함부로 퍼뜨리지 않아 다행이라고 전했다.':person+'은 부탁이 이루어지지 않았지만 솔직한 답을 기억한다고 말했다.'):'황궁 복도에서 다시 마주친 '+person+'은 이전의 부탁을 떠올리며 조용히 인사했다.';
  if(first&&n)n.rapport=Math.max(0,Math.min(10,(n.rapport||0)+(q.mode==='help'?1:-1)));
 }
 const id=v36Log('follow_'+q.id+'_'+q.stage,title,body,person,first?'결과':'후일담',q.parent);q.parent=id;
 return v18Scene('v36_follow',person,body,[{text:'그 말을 기억한다.',next:'explore'}]);
}
function v36Miguel(loc){if(v36Follow('miguel',loc))return true;const d=v36Data(),m=v34Data().miguel,key='miguel_'+Math.floor(state.day/5);if(d.seen[key]||(m.meetings||0)<3)return false;d.seen[key]=true;
 const tone=m.warmth>=3&&m.restraint>=2?'다니엘은 미겔이 자신의 발소리를 알아보는 순간 놀랐다. 그녀는 여전히 단정하고 신중했다.':m.warmth<0?'미겔은 예의를 갖춰 인사했지만 먼저 가까이 다가오지는 않았다.':'미겔은 노란 장미 곁에서 짧게 인사했다.';
 return v18Scene('v36_miguel','미겔 코트리먼',tone+' “무슨 일이십니까, 레온하르트 경?”',[{text:'“영애의 입장을 존중하겠습니다.”',next:'explore',v36Miguel:'respect'},{text:'“제 마음을 부정할 수는 없지만, 답을 바라지는 않겠습니다.”',next:'explore',v36Miguel:'honest'}]);
}
function v36Alex(loc){if(v36Follow('alex',loc))return true;const d=v36Data(),a=v34Data().alex,key='alex_'+Math.floor(state.day/5);if(d.seen[key]||a.trust+a.doubt<4)return false;d.seen[key]=true;
 const text=a.doubt>a.trust?'알렉은 동생을 오래 바라보았다. “서로 숨기는 말이 늘어나는 것 같구나.”':'알렉은 다니엘에게 잠시 앉으라고 말했다. “우리도 제대로 이야기할 때가 됐지.”';
 return v18Scene('v36_alex','알렉 레온하르트',text,[{text:'“형님, 제 말씀을 들어 주십시오.”',next:'explore',v36Alex:'speak'},{text:'“……조금만 시간을 주십시오.”',next:'explore',v36Alex:'wait'}]);
}
function v36Npc(loc){if(v36Follow('npc',loc))return true;const p=V19_NPC_PROFILES[loc],n=v19Data().npc[loc],d=v36Data();if(!p||!n||(n.rapport||0)<6||d.npc[loc])return false;
 const rep=(v33Data().reputation||0)+(v34Data().reputation||0)+(v35Data().reputation||0);const text=rep>=3?p.name+'은 황궁에서 다니엘을 믿고 일을 맡길 수 있다는 말이 돈다며 조심스레 부탁했다.':p.name+'은 소문 때문에 곤란한 사람이 있다며, 사실을 확인해 줄 수 있겠느냐고 물었다.';
 return v18Scene('v36_npc',p.name,text,[{text:'“확인해 보겠습니다. 경솔하게 말하지 않겠습니다.”',next:'explore',v36Npc:loc,v36NpcMode:'help'},{text:'“죄송합니다. 지금은 약속드릴 수 없습니다.”',next:'explore',v36Npc:loc,v36NpcMode:'decline'}]);
}
function v36Daily(){const d=v36Data(),key='day_'+state.day;if(d.seen[key])return;d.seen[key]=true;const pending=d.pending.filter(q=>q.stage<2&&q.due<=state.day),last=d.events.filter(e=>e.day<state.day).slice(-1)[0];const body=pending.length?'지나간 선택이 오늘의 만남을 바꿀지도 모른다. 다니엘은 대답을 서두르지 않기로 했다.':last?'다니엘은 전날의 「'+last.title+'」을 떠올렸다. 시간이 지나도 말의 무게는 사라지지 않았다.':'황궁의 아침, 다니엘은 오늘도 자신이 해야 할 일을 먼저 생각했다.';v36Log('day_'+state.day,'DAY '+state.day+' · 선택의 여운',body,'다니엘','일지',last?.id||null);}
function v36Chronicle(){
 const wrap=document.createElement('div'),info=document.createElement('p');info.className='hint';info.textContent='v16~v36 회상 기록을 통합합니다. 항목을 누르면 원인 기록까지 연결해서 볼 수 있습니다.';wrap.append(info);
 const search=document.createElement('input');search.placeholder='사건·대사 검색';wrap.append(search);
 const who=document.createElement('select');['전체','미겔','알렉','다니엘','황궁 NPC'].forEach(x=>{const o=document.createElement('option');o.value=x;o.textContent=x;who.append(o);});wrap.append(who);
 const order=document.createElement('select');[['new','최신순'],['old','오래된순'],['title','제목순']].forEach(([v,t])=>{const o=document.createElement('option');o.value=v;o.textContent=t;order.append(o);});wrap.append(order);
 const list=document.createElement('div');wrap.append(list);
 function draw(){list.replaceChildren();const memories=v16Data().memories||[],unique=new Map();for(const m of memories){if(!m||!m.id)continue;unique.set(m.id,m);}for(const m of v36Data().events)unique.set(m.id,m);
  let a=[...unique.values()].filter(m=>{const person=m.person||( /미겔|코트리먼/.test(m.title||'')?'미겔':/알렉/.test(m.title||'')?'알렉':/다니엘|DAY /.test(m.title||'')?'다니엘':'황궁 NPC');return (who.value==='전체'||who.value===person)&&[m.title,m.text,m.category,person].join(' ').toLowerCase().includes(search.value.toLowerCase());});
  a.sort((x,y)=>order.value==='title'?String(x.title).localeCompare(String(y.title),'ko'):order.value==='old'?(x.day||0)-(y.day||0):(y.day||0)-(x.day||0));
  const count=document.createElement('p');count.className='hint';count.textContent='검색 결과 '+a.length+'건';list.append(count);
  for(const m of a){const b=document.createElement('button');b.textContent='✦ DAY '+(m.day||'?')+' · '+m.title;b.onclick=()=>{const trail=[],seen=new Set();let current=m;while(current&&!seen.has(current.id)&&trail.length<12){seen.add(current.id);trail.unshift('DAY '+(current.day||'?')+' · '+current.title+'\n'+(current.text||''));current=current.parent?unique.get(current.parent):null;}modal('연결 회상 · '+m.title,trail.join('\n\n────\n\n'));};list.append(b);}
 }
 search.oninput=draw;who.onchange=draw;order.onchange=draw;draw();modal('v36 · 통합 사건 연대기',wrap);
}
function v36Board(){const d=v36Data(),m=v34Data().miguel,a=v34Data().alex;modal('v36 · 장기 서사 현황','미겔 · '+d.miguel.tone+' / 감정 '+m.warmth+' / 절제 '+m.restraint+'\n알렉 · '+d.alex.tone+' / 신뢰 '+a.trust+' / 의심 '+a.doubt+'\n미완료 후속 사건 '+d.pending.filter(x=>x.stage<2).length+'건\n통합 연대기에서 과거의 선택과 후속 결과를 확인할 수 있습니다.');}


// v37: stage-aware reunions, brotherly turning points, court reputation and choice trails.
function v37Data(){
 const d=state.v37??(state.v37={miguel:{stage:'예의와 거리',last:0},alex:{stage:'대화 이전',last:0},reputation:{},pending:[],events:[],seen:{}});
 d.miguel??={stage:'예의와 거리',last:0};d.alex??={stage:'대화 이전',last:0};d.reputation??={};d.pending??=[];d.events??=[];d.seen??={};return d;
}
function v37Record(id,title,body,person,kind,parent){
 const d=v37Data(),key='v37_'+id;if(d.events.some(x=>x.id===key))return key;
 const e={id:key,title,text:body,person,category:kind||'서사',parent:parent||null,day:state.day};d.events.push(e);
 v18Remember(key,title,body,e.category);const m=v16Data().memories.find(x=>x.id===key);if(m){m.person=person;m.parent=e.parent;m.day=state.day;}return key;
}
function v37Schedule(type,mode,loc,parent){const d=v37Data();d.pending.push({id:'q_'+state.day+'_'+d.pending.length,type,mode,loc:loc||null,stage:0,due:state.day+2,parent});}
function v37Choice(c){
 const d=v37Data();let type,mode,loc=null,person,title,body;
 if(c.v37Miguel){type='miguel';mode=c.v37Miguel;person='미겔';title='미겔 · 마음의 경계';body=mode==='respect'?'다니엘은 미겔의 의무와 결정을 먼저 존중하기로 했다.':'다니엘은 감정을 부정하지 않으면서도 그녀에게 아무런 답을 요구하지 않았다.';d.miguel.stage=mode==='respect'?'절제된 존중':'조심스러운 고백';d.miguel.last=state.day;}
 else if(c.v37Alex){type='alex';mode=c.v37Alex;person='알렉';title='알렉 · 형제의 선택';body=mode==='repair'?'다니엘은 두려움을 누르고 형에게 오해를 풀 기회를 청했다.':'다니엘은 더 상처 주는 말을 피하려고 대화를 미뤘다.';d.alex.stage=mode==='repair'?'회복을 위한 대화':'깊어진 침묵';d.alex.last=state.day;const a=v34Data().alex;a.trust=Math.max(0,(a.trust||0)+(mode==='repair'?2:0));a.doubt=Math.max(0,(a.doubt||0)+(mode==='avoid'?2:-1));}
 else if(c.v37Npc){type='npc';mode=c.v37NpcMode;loc=c.v37Npc;person=V19_NPC_PROFILES[loc]?.name||'황궁 NPC';title=person+' · 소문의 방향';body=mode==='clarify'?'다니엘은 사실을 확인하고 당사자의 사정을 먼저 듣기로 했다.':'다니엘은 섣부른 개입을 삼가겠다고 정중히 설명했다.';}
 else return;
 const id=v37Record('choice_'+type+'_'+state.day+'_'+d.events.length,title,body,person,'선택',null);v37Schedule(type,mode,loc,id);
}
function v37Follow(type,loc){
 const d=v37Data(),q=d.pending.find(x=>x.type===type&&x.stage<3&&state.day>=x.due&&(type!=='npc'||x.loc===loc));if(!q)return false;
 const stage=++q.stage;q.due=state.day+2;let person='',title='',body='';
 if(type==='miguel'){
  person='미겔';title=['','미겔 · 기억한 인사','미겔 · 지켜야 할 선','미겔 · 오래 남는 선택'][stage];
  body=stage===1?(q.mode==='respect'?'미겔은 발걸음 소리만으로 다니엘을 알아보았다. “그날의 배려는 기억하고 있습니다.” 다니엘은 시선을 내렸다. “……제가 해야 할 일이었습니다.”':'“그날 하신 말씀은 잊지 않았습니다.” 미겔은 조용히 말했다. “하지만 알렉과의 약혼은 변함없습니다.” 다니엘은 잠시 숨을 고르고 고개를 끄덕였다.'):stage===2?'다니엘은 미겔을 향한 감정과 그녀가 지켜야 하는 약속을 혼동하지 않기로 했다.':'다니엘은 짧은 인사가 오랜 시간 마음에 남는다는 것을 알았다. 다만 그것을 상대에게 짐으로 지울 생각은 없었다.';
 }else if(type==='alex'){
  person='알렉';title=['','알렉 · 다시 열린 대화','알렉 · 남겨진 의심','알렉 · 형제의 다음 날'][stage];
  body=stage===1?(q.mode==='repair'?'알렉은 동생의 말을 끊지 않았다. “네 말은 들었다. 나도 쉽게 답할 수 있는 일은 아니구나.”':'알렉은 다니엘에게 짧게 물었다. “계속 피할 셈이냐?” 다니엘은 고개를 숙였다. “……죄송합니다, 형님.”'):stage===2?(q.mode==='repair'?'서로를 완전히 이해한 것은 아니지만, 두 사람 사이에 다시 말을 건넬 자리가 생겼다.':'말하지 않은 일들이 쌓일수록 형과 동생의 거리는 멀어졌다. 다니엘은 그 사실을 외면할 수 없었다.'):'형제의 관계는 한 번의 대화로 결론나지 않았다. 다니엘은 다음에야말로 자신의 말을 분명히 하리라 다짐했다.';
 }else{
  person=V19_NPC_PROFILES[loc]?.name||'황궁 NPC';title=person+' · '+(['','돌아온 소식','황궁에 퍼진 평가','소문의 결말'][stage]);
  body=stage===1?(q.mode==='clarify'?person+'은 사실을 확인해 준 다니엘에게 감사 인사를 건넸다.':person+'은 다니엘이 경솔한 약속을 하지 않았다는 점을 이해한다고 말했다.'):stage===2?(q.mode==='clarify'?'황궁에서는 다니엘이 소문을 옮기기보다 사실을 살핀다는 이야기가 돌았다.':'황궁에서는 다니엘이 신중하지만 선뜻 나서지 않는다는 평이 엇갈렸다.'):'다니엘은 누군가의 평가가 진실을 전부 말해 주지는 않는다는 사실을 배웠다.';
  if(stage===2){const n=v19Data().npc[loc];if(n)n.rapport=Math.max(0,Math.min(10,(n.rapport||0)+(q.mode==='clarify'?1:-1)));d.reputation[loc]=(d.reputation[loc]||0)+(q.mode==='clarify'?2:-1);}
 }
 const id=v37Record('follow_'+q.id+'_'+stage,title,body,person,stage===3?'결말':'후속',q.parent);q.parent=id;
 return v18Scene('v37_follow',person,body,[{text:'그날의 일을 마음에 새긴다.',next:'explore'}]);
}
function v37Miguel(loc){if(v37Follow('miguel',loc))return true;const d=v37Data(),m=v34Data().miguel,key='miguel_'+Math.floor(state.day/6);if(d.seen[key]||(m.meetings||0)<3)return false;d.seen[key]=true;
 const warm=m.warmth||0,rest=m.restraint||0;const opening=warm>=3&&rest>=2?'미겔은 다니엘의 발소리를 알아보고 먼저 고개를 돌렸다. “오늘은 걸음이 조금 빠르시군요.”':warm>=3?'미겔은 잠시 망설이다가 정중히 인사했다. 두 사람 사이에 말로 설명하기 어려운 조심스러움이 남았다.':rest>=3?'미겔은 정해진 거리를 지킨 채 인사를 건넸다. 그 태도는 냉담함보다 신중함에 가까웠다.':'노란 장미 곁에서 미겔과 마주쳤다. 다니엘은 형의 약혼녀라는 사실을 먼저 떠올렸다.';
 return v18Scene('v37_miguel','미겔 코트리먼',opening,[{text:'“영애의 뜻을 먼저 존중하겠습니다.”',next:'explore',v37Miguel:'respect'},{text:'“……제 마음을 감추지는 않겠습니다. 다만 답을 바라지는 않습니다.”',next:'explore',v37Miguel:'honest'}]);
}
function v37Alex(loc){if(v37Follow('alex',loc))return true;const d=v37Data(),a=v34Data().alex,key='alex_'+Math.floor(state.day/6);if(d.seen[key]||(a.trust||0)+(a.doubt||0)<4)return false;d.seen[key]=true;
 const opening=(a.doubt||0)>(a.trust||0)?'알렉은 동생의 발걸음을 듣고도 한동안 돌아보지 않았다. “우리 사이에 아직 할 말이 남아 있겠지.”':'알렉은 다니엘에게 자리를 권했다. “지난번에는 제대로 듣지 못했구나.”';
 return v18Scene('v37_alex','알렉 레온하르트',opening,[{text:'“형님, 제 말을 다시 들어 주시겠습니까?”',next:'explore',v37Alex:'repair'},{text:'“……지금은 조금 어렵습니다.”',next:'explore',v37Alex:'avoid'}]);
}
function v37Npc(loc){if(v37Follow('npc',loc))return true;const d=v37Data(),p=V19_NPC_PROFILES[loc],n=v19Data().npc[loc];if(!p||!n||(n.rapport||0)<5)return false;const key='npc_'+loc+'_'+Math.floor(state.day/7);if(d.seen[key])return false;d.seen[key]=true;
 const rep=(v33Data().reputation||0)+(v34Data().reputation||0)+(v35Data().reputation||0)+(d.reputation[loc]||0);
 const body=rep>=3?p.name+'은 다니엘에게 “경께서 소문을 함부로 옮기지 않으신다는 말을 들었습니다.” 하고 조심스럽게 사실 확인을 부탁했다.':rep<=-2?p.name+'은 “황궁에서는 경에 관한 말도 엇갈립니다.” 하며 다니엘의 의견을 물었다.':p.name+'은 복도에서 작은 소문 하나를 전하며 사실을 확인해 줄 수 있겠느냐고 물었다.';
 return v18Scene('v37_npc',p.name,body,[{text:'“확인해 보겠습니다. 함부로 말하지 않겠습니다.”',next:'explore',v37Npc:loc,v37NpcMode:'clarify'},{text:'“죄송합니다. 지금은 나서기 어렵습니다.”',next:'explore',v37Npc:loc,v37NpcMode:'decline'}]);
}
function v37Daily(){const d=v37Data(),key='day_'+state.day;if(d.seen[key])return;d.seen[key]=true;const due=d.pending.filter(q=>q.stage<3&&q.due<=state.day),last=d.events.filter(e=>e.day<state.day).slice(-1)[0];const body=due.length?'오늘은 과거의 선택이 새로운 대답을 요구할지도 모른다. 다니엘은 침착하게 마음을 가다듬었다.':last?'어제의 「'+last.title+'」을 떠올리며 다니엘은 자신이 지켜야 할 말을 생각했다.':'세 개의 달 아래에서 다니엘은 또 하루를 맞았다. 오늘은 어떤 말을 남기게 될까.';v37Record('day_'+state.day,'DAY '+state.day+' · 남겨진 말',body,'다니엘','일지',last?.id||null);}
function v37Chronicle(){
 const wrap=document.createElement('div'),hint=document.createElement('p');hint.className='hint';hint.textContent='전체 회상과 v37 사건을 함께 검색합니다. 연결된 선택을 누르면 원인 → 후속 → 결말의 기록을 역순으로 추적할 수 있습니다.';wrap.append(hint);
 const search=document.createElement('input');search.placeholder='제목·본문·사건 ID 검색';wrap.append(search);
 const who=document.createElement('select');for(const x of ['전체','미겔','알렉','다니엘','황궁 NPC']){const o=document.createElement('option');o.value=x;o.textContent=x;who.append(o);}wrap.append(who);
 const kind=document.createElement('select');for(const x of ['전체','선택','후속','결말','일지','서사','관계','의뢰','기타']){const o=document.createElement('option');o.value=x;o.textContent=x;kind.append(o);}wrap.append(kind);
 const order=document.createElement('select');for(const [value,label] of [['new','최신순'],['old','오래된순'],['title','제목순']]){const o=document.createElement('option');o.value=value;o.textContent=label;order.append(o);}wrap.append(order);
 const list=document.createElement('div');wrap.append(list);
 function draw(){list.replaceChildren();const all=new Map();for(const m of v16Data().memories||[])if(m?.id)all.set(m.id,m);for(const m of v36Data().events)all.set(m.id,m);for(const m of v37Data().events)all.set(m.id,m);
 let entries=[...all.values()].filter(m=>{const person=m.person||(/미겔|코트리먼/.test(m.title||'')?'미겔':/알렉/.test(m.title||'')?'알렉':/다니엘|DAY /.test(m.title||'')?'다니엘':'황궁 NPC');return (who.value==='전체'||person===who.value)&&(kind.value==='전체'||m.category===kind.value)&&[m.id,m.title,m.text,person].join(' ').toLowerCase().includes(search.value.trim().toLowerCase());});
 entries.sort((a,b)=>order.value==='title'?String(a.title).localeCompare(String(b.title),'ko'):order.value==='old'?(a.day||0)-(b.day||0):(b.day||0)-(a.day||0));const info=document.createElement('p');info.className='hint';info.textContent='검색 결과 '+entries.length+'건';list.append(info);
 for(const m of entries){const b=document.createElement('button');b.textContent='✦ DAY '+(m.day||'?')+' · '+m.title;b.onclick=()=>{const trail=[],seen=new Set();let cur=m;while(cur&&!seen.has(cur.id)&&trail.length<20){seen.add(cur.id);trail.unshift('DAY '+(cur.day||'?')+' · '+cur.title+' ['+(cur.category||'기타')+']\n'+(cur.text||''));cur=cur.parent?all.get(cur.parent):null;}modal('선택 경로 · '+m.title,trail.join('\n\n────\n\n'));};list.append(b);}
 }
 search.oninput=draw;who.onchange=draw;kind.onchange=draw;order.onchange=draw;draw();modal('v37 · 통합 선택 경로 연대기',wrap);
}
function v37Board(){const d=v37Data(),a=v34Data().alex,m=v34Data().miguel;modal('v37 · 관계와 사건','미겔 · '+d.miguel.stage+' / 감정 '+(m.warmth||0)+' / 절제 '+(m.restraint||0)+'\n알렉 · '+d.alex.stage+' / 신뢰 '+(a.trust||0)+' / 의심 '+(a.doubt||0)+'\n진행 중 연속 사건 '+d.pending.filter(x=>x.stage<3).length+'건\n황궁 인연별 평판 기록 '+Object.keys(d.reputation).length+'명');}


// v38 — long-range consequences, court echoes and navigable choice history.
function v38Data(){
 const d=state.v38??(state.v38={miguel:{tone:'조심스러운 거리',count:0},alex:{tone:'대화를 기다림',count:0},court:{},pending:[],events:[],seen:{}});
 d.miguel??={tone:'조심스러운 거리',count:0};d.alex??={tone:'대화를 기다림',count:0};d.court??={};d.pending??=[];d.events??=[];d.seen??={};return d;
}
function v38Record(id,title,body,person,category,parent){
 const d=v38Data(),key='v38_'+id;if(d.events.some(e=>e.id===key))return key;
 const e={id:key,title,text:body,person,category,day:state.day,parent:parent||null};d.events.push(e);
 v18Remember(key,title,body,category);const m=v16Data().memories.find(x=>x.id===key);if(m){m.person=person;m.parent=e.parent;m.day=state.day;}return key;
}
function v38Choice(c){
 const d=v38Data();let type,mode,loc=null,title,body,person;
 if(c.v38Miguel){type='miguel';mode=c.v38Miguel;person='미겔';d.miguel.count++;d.miguel.tone=mode==='boundary'?'절제된 신뢰':'고백하지 않은 진심';title='미겔 · 다시 정한 거리';body=mode==='boundary'?'다니엘은 미겔의 약혼과 책임을 먼저 생각했다. 마음을 전하는 것과 답을 요구하는 것은 다른 일이었다.':'다니엘은 자신의 감정을 부정하지 않았지만 미겔에게 결정을 재촉하지 않기로 했다.';}
 else if(c.v38Alex){type='alex';mode=c.v38Alex;person='알렉';d.alex.count++;d.alex.tone=mode==='listen'?'회복을 위한 경청':'서로 다른 침묵';title='알렉 · 형제의 갈림길';body=mode==='listen'?'다니엘은 형의 말을 끝까지 듣겠다고 약속했다.':'다니엘은 당장의 변명을 삼켰다. 그 침묵이 오해를 키울 수 있다는 것도 알았다.';}
 else if(c.v38Npc){type='npc';mode=c.v38NpcMode;loc=c.v38Npc;person=V19_NPC_PROFILES[loc]?.name||'황궁 사람';title=person+' · 평판의 메아리';body=mode==='verify'?'다니엘은 소문의 진위를 먼저 확인하고 당사자를 보호하기로 했다.':'다니엘은 섣부른 약속을 피하고 상황을 지켜보기로 했다.';}
 else return;
 const id=v38Record('choice_'+type+'_'+state.day+'_'+d.events.length,title,body,person,'선택',null);
 d.pending.push({id:'q'+state.day+'_'+d.pending.length,type,mode,loc,stage:0,due:state.day+2,parent:id});
}
function v38Follow(type,loc){
 const d=v38Data(),q=d.pending.find(x=>x.type===type&&x.stage<3&&state.day>=x.due&&(type!=='npc'||x.loc===loc));if(!q)return false;
 const stage=++q.stage;q.due=state.day+2;let person,title,body;
 if(type==='miguel'){
 person='미겔';title=['','미겔 · 돌아온 인사','미겔 · 지켜진 약속','미겔 · 재회의 끝자락'][stage];
 body=stage===1?(q.mode==='boundary'?'미겔은 다니엘의 걸음걸이를 알아보았다. “그날 하신 말씀은 기억합니다.” 다니엘은 조심스럽게 고개를 숙였다.':'“말씀을 가볍게 여기지는 않았습니다.” 미겔은 차분하게 말했다. 다니엘은 그녀의 입장을 먼저 헤아렸다.'):stage===2?'미겔은 알렉과의 약혼을 가볍게 여기지 않았다. 다니엘 또한 그 사실을 알기에 불필요한 기대를 말로 옮기지 않았다.':'시간이 흘러도 두 사람 사이의 예의는 남았다. 다니엘은 자신의 감정을 책임지는 법을 조금씩 배웠다.';
 }else if(type==='alex'){
 person='알렉';title=['','알렉 · 다시 들은 말','알렉 · 남은 의심','알렉 · 형제의 결론'][stage];
 body=stage===1?(q.mode==='listen'?'알렉은 다니엘의 말을 끝까지 들었다. “나 역시 네 생각을 듣고 싶었다.”':'알렉은 잠시 동생을 바라보았다. “피한다고 모든 일이 끝나지는 않는다.”'):stage===2?(q.mode==='listen'?'형제 사이에 쌓인 오해가 한 번에 풀리지는 않았지만, 서로의 말을 듣기 시작했다.':'말하지 않은 사정이 쌓이며 두 사람의 거리는 조금 더 벌어졌다.'):(q.mode==='listen'?'다니엘은 형에게 정중히 인사했다. 아직 서툴러도 관계를 바로잡으려는 의지는 남아 있었다.':'다니엘은 언젠가 형에게 설명해야 할 일이 남았음을 인정했다.');
 if(stage===3){const a=v34Data().alex;a.trust=Math.max(0,(a.trust||0)+(q.mode==='listen'?2:0));a.doubt=Math.max(0,(a.doubt||0)+(q.mode==='listen'?-1:2));}
 }else{
 person=V19_NPC_PROFILES[loc]?.name||'황궁 사람';title=person+' · '+(['','확인된 이야기','바뀐 시선','소문의 끝'][stage]);
 body=stage===1?(q.mode==='verify'?person+'은 다니엘이 사실을 확인해 준 데 감사했다.':person+'은 다니엘의 조심스러운 태도를 이해하려 애썼다.'):stage===2?(q.mode==='verify'?'황궁에서는 다니엘이 사람의 사정을 함부로 말하지 않는다는 평가가 돌았다.':'황궁에서는 다니엘의 침묵을 두고 서로 다른 해석이 오갔다.'):(q.mode==='verify'?'다니엘은 한 사람의 신뢰가 다른 사람의 태도까지 바꿀 수 있음을 깨달았다.':'다니엘은 오해를 바로잡을 기회를 다음으로 미루지 않기로 했다.');
 if(stage===2){d.court[loc]=(d.court[loc]||0)+(q.mode==='verify'?2:-1);const n=v19Data().npc[loc];if(n)n.rapport=Math.max(0,Math.min(10,(n.rapport||0)+(q.mode==='verify'?1:-1)));}
 }
 const id=v38Record('follow_'+q.id+'_'+stage,title,body,person,stage===3?'결말':'후속',q.parent);q.parent=id;
 return v18Scene('v38_follow',person,body,[{text:'지나온 선택을 기억한다.',next:'explore'}]);
}
function v38Miguel(loc){if(v38Follow('miguel',loc))return true;const d=v38Data(),m=v34Data().miguel,key='miguel_'+Math.floor(state.day/7);if(d.seen[key]||(m.meetings||0)<3)return false;d.seen[key]=true;
 const warm=m.warmth||0,rest=m.restraint||0;const opening=warm>=4&&rest>=3?'미겔은 발소리만 듣고 다니엘을 알아보았다. “지난번보다 걸음이 차분하시군요.”':warm>=4?'미겔은 한동안 말없이 다니엘을 바라보았다. “무슨 말씀을 하시려는지는 알겠습니다.”':rest>=3?'미겔은 단정히 인사했다. 두 사람 사이에는 말하지 않아도 지켜지는 선이 있었다.':'미겔은 서류를 접고 다니엘에게 용건을 물었다. 그는 잠시 망설였다.';
 return v18Scene('v38_miguel','미겔 코트리먼',opening,[{text:'“영애의 뜻과 약혼을 존중하겠습니다.”',next:'explore',v38Miguel:'boundary'},{text:'“……제 마음은 제가 책임지겠습니다.”',next:'explore',v38Miguel:'truth'}]);
}
function v38Alex(loc){if(v38Follow('alex',loc))return true;const d=v38Data(),a=v34Data().alex,key='alex_'+Math.floor(state.day/7);if(d.seen[key]||(a.trust||0)+(a.doubt||0)<4)return false;d.seen[key]=true;
 const body=(a.doubt||0)>(a.trust||0)?'알렉은 동생을 마주하고도 한동안 침묵했다. “우리 사이에 풀지 못한 일이 있지.”':'알렉은 다니엘에게 자리를 권했다. “오늘은 네 말을 듣겠다.”';
 return v18Scene('v38_alex','알렉 레온하르트',body,[{text:'“형님, 먼저 말씀해 주십시오. 듣겠습니다.”',next:'explore',v38Alex:'listen'},{text:'“……생각을 정리할 시간이 필요합니다.”',next:'explore',v38Alex:'silence'}]);
}
function v38Npc(loc){if(v38Follow('npc',loc))return true;const d=v38Data(),p=V19_NPC_PROFILES[loc],n=v19Data().npc[loc];if(!p||!n||(n.rapport||0)<5)return false;const key='npc_'+loc+'_'+Math.floor(state.day/8);if(d.seen[key])return false;d.seen[key]=true;
 const rep=(v37Data().reputation[loc]||0)+(d.court[loc]||0);const body=rep>=3?p.name+'은 “경이라면 믿고 말씀드릴 수 있겠습니다.”라며 또 다른 궁중 소문을 전했다.':rep<=-2?p.name+'은 조심스레 물었다. “경에 관한 이야기도 엇갈리는데, 사실을 확인해 주시겠습니까?”':p.name+'은 복도에서 들은 소문 하나를 다니엘에게 조심스럽게 털어놓았다.';
 return v18Scene('v38_npc',p.name,body,[{text:'“먼저 사실을 확인하겠습니다.”',next:'explore',v38Npc:loc,v38NpcMode:'verify'},{text:'“섣불리 나서지는 않겠습니다.”',next:'explore',v38Npc:loc,v38NpcMode:'wait'}]);
}
function v38Daily(){const d=v38Data(),key='day_'+state.day;if(d.seen[key])return;d.seen[key]=true;const last=d.events.filter(e=>e.day<state.day).slice(-1)[0];const due=d.pending.filter(q=>q.stage<3&&q.due<=state.day);const body=due.length?'지난 선택의 결과를 마주할 때가 다가왔다. 다니엘은 책임을 피하지 않으려 했다.':last?'다니엘은 「'+last.title+'」을 떠올렸다. 짧은 말도 사람 사이에 오래 남을 수 있었다.':'황궁의 아침, 다니엘은 오늘 해야 할 일과 지켜야 할 예의를 되짚었다.';v38Record('day_'+state.day,'DAY '+state.day+' · 남은 말',body,'다니엘','일지',last?.id||null);}
function v38Chronicle(){
 const wrap=document.createElement('div'),hint=document.createElement('p');hint.className='hint';hint.textContent='이전 버전의 회상까지 통합합니다. 사건을 선택하면 원인에서 결말까지 이어지는 기록을 볼 수 있습니다.';wrap.append(hint);
 const search=document.createElement('input');search.placeholder='제목·내용·사건 ID 검색';wrap.append(search);
 const who=document.createElement('select');for(const x of ['전체','미겔','알렉','다니엘','황궁 NPC']){const o=document.createElement('option');o.value=x;o.textContent=x;who.append(o);}wrap.append(who);
 const kind=document.createElement('select');for(const x of ['전체','선택','후속','결말','일지','서사','관계','기타']){const o=document.createElement('option');o.value=x;o.textContent=x;kind.append(o);}wrap.append(kind);
 const order=document.createElement('select');for(const [v,t] of [['new','최신순'],['old','오래된순'],['title','제목순']]){const o=document.createElement('option');o.value=v;o.textContent=t;order.append(o);}wrap.append(order);
 const list=document.createElement('div');wrap.append(list);
 function draw(){list.replaceChildren();const all=new Map();for(const m of v16Data().memories||[])if(m?.id)all.set(m.id,m);for(const group of [v36Data().events,v37Data().events,v38Data().events])for(const m of group)all.set(m.id,m);
 let entries=[...all.values()].filter(m=>{const person=m.person||(/미겔|코트리먼/.test(m.title||'')?'미겔':/알렉/.test(m.title||'')?'알렉':/다니엘|DAY /.test(m.title||'')?'다니엘':'황궁 NPC');return (who.value==='전체'||who.value===person||who.value==='황궁 NPC'&&!['미겔','알렉','다니엘'].includes(person))&&(kind.value==='전체'||(m.category||'기타')===kind.value)&&[m.id,m.title,m.text,person].join(' ').toLowerCase().includes(search.value.toLowerCase());});
 entries.sort((a,b)=>order.value==='title'?String(a.title).localeCompare(String(b.title),'ko'):order.value==='old'?(a.day||0)-(b.day||0):(b.day||0)-(a.day||0));const info=document.createElement('p');info.className='hint';info.textContent='검색 결과 '+entries.length+'건';list.append(info);
 for(const m of entries){const b=document.createElement('button');b.textContent='✦ DAY '+(m.day||'?')+' · '+m.title;b.onclick=()=>{const chain=[],seen=new Set();let cur=m;while(cur&&!seen.has(cur.id)&&chain.length<30){seen.add(cur.id);chain.unshift('DAY '+(cur.day||'?')+' · '+cur.title+' ['+(cur.category||'기타')+']\n'+(cur.text||''));cur=cur.parent?all.get(cur.parent):null;}modal('v38 · 선택에서 결말까지',chain.join('\n\n↓ 이어진 사건 ↓\n\n'));};list.append(b);}
 }
 search.oninput=draw;who.onchange=draw;kind.onchange=draw;order.onchange=draw;draw();modal('v38 · 통합 선택 연대기',wrap);
}
function v38Board(){const d=v38Data(),m=v34Data().miguel,a=v34Data().alex;modal('v38 · 관계와 황궁 평판','미겔 · '+d.miguel.tone+' / 감정 '+(m.warmth||0)+' / 절제 '+(m.restraint||0)+'\n알렉 · '+d.alex.tone+' / 신뢰 '+(a.trust||0)+' / 의심 '+(a.doubt||0)+'\n진행 중인 연속 사건 '+d.pending.filter(q=>q.stage<3).length+'건\n황궁 평판 변화 장소 '+Object.keys(d.court).length+'곳');}


// v39: aftermath arcs; lazily initialized for pre-v39 saves.
function v39Data(){
 const d=state.v39??(state.v39={miguel:{respect:0,candor:0,meetings:0},alex:{repair:0,friction:0},court:{},pending:[],events:[],seen:{}});
 d.miguel??={respect:0,candor:0,meetings:0};d.alex??={repair:0,friction:0};d.court??={};d.pending??=[];d.events??=[];d.seen??={};return d;
}
function v39Record(id,title,body,person,category,parent){
 const d=v39Data(),key='v39_'+id;if(d.events.some(e=>e.id===key))return key;
 const e={id:key,title,text:body,person,category,day:state.day,parent:parent||null};d.events.push(e);
 v18Remember(key,title,body,category);const m=v16Data().memories.find(x=>x.id===key);if(m){m.person=person;m.parent=e.parent;m.day=e.day;}return key;
}
function v39Choice(c){
 const d=v39Data();let type,mode,loc=null,person,title,body;
 if(c.v39Miguel){type='miguel';mode=c.v39Miguel;person='미겔';d.miguel.meetings++;d.miguel.respect+=mode==='respect'?2:1;d.miguel.candor+=mode==='honest'?2:0;title='미겔 · 책임지는 마음';body=mode==='respect'?'다니엘은 미겔의 뜻을 먼저 묻고, 그녀의 약혼을 존중했다.':'다니엘은 마음을 숨기지 않았으나, 미겔에게 답을 요구하지 않았다.';}
 else if(c.v39Alex){type='alex';mode=c.v39Alex;person='알렉';d.alex.repair+=mode==='talk'?2:0;d.alex.friction+=mode==='avoid'?2:0;title='알렉 · 선택한 대화';body=mode==='talk'?'다니엘은 형의 말을 끊지 않고 자신이 오해한 부분을 인정했다.':'다니엘은 또다시 설명을 미루었다. 미뤄 둔 말은 사라지지 않았다.';}
 else if(c.v39Npc){type='npc';mode=c.v39NpcMode;loc=c.v39Npc;person=V19_NPC_PROFILES[loc]?.name||'황궁 사람';d.court[loc]=(d.court[loc]||0)+(mode==='protect'?2:-1);title=person+' · 소문의 다음 주인';body=mode==='protect'?'다니엘은 당사자의 이름을 밝히지 않고 사실을 확인했다.':'다니엘은 섣부른 개입을 피했다. 침묵이 다른 소문을 낳을 가능성도 남았다.';}
 else return;
 const parent=v39Record('choice_'+type+'_'+state.day+'_'+d.events.length,title,body,person,'선택',null);
 d.pending.push({id:'arc_'+state.day+'_'+d.pending.length,type,mode,loc,stage:0,due:state.day+2,parent});
}
function v39Follow(type,loc){
 const d=v39Data(),q=d.pending.find(x=>x.type===type&&x.stage<3&&state.day>=x.due&&(type!=='npc'||x.loc===loc));if(!q)return false;
 q.stage++;const step=q.stage;q.due=state.day+2;let person,title,body;
 if(type==='miguel'){
 person='미겔';title=['','미겔 · 다시 마주한 거리','미겔 · 달라진 인사','미겔 · 남겨 둔 답'][step];
 body=step===1?(q.mode==='respect'?'미겔은 다니엘의 발소리를 알아차렸다. “그때 지켜 주신 선을 기억합니다.”':'미겔은 잠시 서류를 내려놓았다. “하신 말씀을 잊지는 않았습니다.”'):step===2?'다니엘은 감정을 앞세우지 않고 미겔의 생각을 들었다. 그녀의 선택은 여전히 그녀의 것이었다.':'미겔은 약혼에 관한 책임을 분명히 했다. 다니엘은 그 답을 존중하면서도 자신의 마음을 성급히 지우지 않았다.';
 }else if(type==='alex'){
 person='알렉';title=['','알렉 · 대화의 대가','알렉 · 남은 오해','알렉 · 형제의 다음 날'][step];
 body=step===1?(q.mode==='talk'?'알렉은 동생의 말을 끝까지 들었다. “네가 먼저 말해 준 건 다행이구나.”':'알렉은 다니엘에게 눈길을 주었다. “침묵도 때로는 대답이 된다.”'):step===2?(q.mode==='talk'?'형제는 서로 다른 생각을 인정했다. 오래된 서운함이 한 번에 사라지지는 않았다.':'다니엘은 형과 눈을 마주치기 어려웠다. 설명을 미룬 이유가 점점 복잡해졌다.'):(q.mode==='talk'?'다니엘은 형에게 먼저 인사했다. 화해는 단번에 완성되지 않아도 시작될 수 있었다.':'다니엘은 다음 대화에서 더는 피하지 않겠다고 다짐했다.');
 if(step===3){const a=v34Data().alex;a.trust=Math.max(0,(a.trust||0)+(q.mode==='talk'?2:0));a.doubt=Math.max(0,(a.doubt||0)+(q.mode==='talk'?-1:2));}
 }else{
 person=V19_NPC_PROFILES[loc]?.name||'황궁 사람';title=person+' · '+(['','퍼진 소문','달라진 시선','인연의 결말'][step]);
 body=step===1?(q.mode==='protect'?'소문에 휘말린 사람이 다니엘에게 조용히 감사의 뜻을 전했다.':'다니엘이 나서지 않은 사이, 소문은 서로 다른 모습으로 전해졌다.'):step===2?(q.mode==='protect'?'다른 궁인도 다니엘에게 조심스럽게 도움을 청하기 시작했다.':'몇몇 궁인은 다니엘에게 말을 아꼈다. 그는 섣불리 단정하지 않기로 했다.'):(q.mode==='protect'?'다니엘은 신뢰가 하루아침에 만들어지지 않는다는 것을 깨달았다.':'다니엘은 신뢰를 회복할 기회가 남아 있음을 기억했다.');
 if(step===2){const n=v19Data().npc[loc];if(n)n.rapport=Math.max(0,Math.min(10,(n.rapport||0)+(q.mode==='protect'?1:-1)));v37Data().reputation[loc]=(v37Data().reputation[loc]||0)+(q.mode==='protect'?1:-1);}
 }
 const id=v39Record('follow_'+q.id+'_'+step,title,body,person,step===3?'결말':'후속',q.parent);q.parent=id;
 return v18Scene('v39_follow',person,body,[{text:'그날의 선택을 마음에 새긴다.',next:'explore'}]);
}
function v39Miguel(loc){if(v39Follow('miguel',loc))return true;
 const d=v39Data(),m=v34Data().miguel,key='miguel_'+Math.floor(state.day/9);
 if(d.seen[key]||(m.meetings||0)<4||!v38Data().events.some(e=>e.person==='미겔'&&e.category==='결말'))return false;
 d.seen[key]=true;const tone=(m.restraint||0)>=(m.warmth||0)?'미겔은 단정하게 고개를 끄덕였다. “이전에 말씀하신 약속은 기억합니다.”':'미겔은 다니엘의 발걸음을 알아보았다. “서두르지 않으셨군요.”';
 return v18Scene('v39_miguel','미겔 코트리먼',tone+'\n\n다니엘은 미겔과 알렉의 약혼을 떠올렸다. 그녀의 결정을 대신할 수는 없었다.',[{text:'“영애의 뜻을 존중하겠습니다.”',next:'explore',v39Miguel:'respect'},{text:'“……제 마음은 제가 책임지겠습니다.”',next:'explore',v39Miguel:'honest'}]);
}
function v39Alex(loc){if(v39Follow('alex',loc))return true;
 const d=v39Data(),a=v34Data().alex,key='alex_'+Math.floor(state.day/9);if(d.seen[key]||!v38Data().events.some(e=>e.person==='알렉'&&e.category==='결말'))return false;d.seen[key]=true;
 const line=(a.doubt||0)>(a.trust||0)?'알렉은 동생의 눈을 피하지 않았다. “계속 미뤄 둘 생각이냐?”':'알렉은 조용히 자리를 권했다. “이제 네 생각을 들을 수 있겠니?”';
 return v18Scene('v39_alex','알렉 레온하르트',line,[{text:'“형님, 이번에는 끝까지 말씀드리겠습니다.”',next:'explore',v39Alex:'talk'},{text:'“……조금만 시간을 주십시오.”',next:'explore',v39Alex:'avoid'}]);
}
function v39Npc(loc){if(v39Follow('npc',loc))return true;
 const d=v39Data(),p=V19_NPC_PROFILES[loc],n=v19Data().npc[loc],key='npc_'+loc+'_'+Math.floor(state.day/10);
 if(!p||!n||d.seen[key]||!v38Data().events.some(e=>e.person===p.name&&e.category==='결말'))return false;d.seen[key]=true;
 const rep=(v37Data().reputation[loc]||0)+(v38Data().court[loc]||0)+(d.court[loc]||0);
 const line=rep>=3?p.name+'은 다니엘에게 고개를 숙였다. “이전 일을 기억하는 사람이 많습니다.”':rep<0?p.name+'은 주위를 살피며 말했다. “궁 안에서는 작은 말도 크게 번집니다.”':p.name+'은 다니엘에게 조용히 새로운 소문을 전했다.';
 return v18Scene('v39_npc',p.name,line,[{text:'“당사자를 보호하며 확인하겠습니다.”',next:'explore',v39Npc:loc,v39NpcMode:'protect'},{text:'“이번에는 관망하겠습니다.”',next:'explore',v39Npc:loc,v39NpcMode:'wait'}]);
}
function v39Daily(){const d=v39Data(),key='day_'+state.day;if(d.seen[key])return;d.seen[key]=true;const due=d.pending.filter(q=>q.stage<3&&q.due<=state.day);if(!due.length)return;const q=due[0];v39Record('day_'+state.day,'DAY '+state.day+' · 기다리는 대답','다니엘은 지난 선택의 후속 이야기가 아직 끝나지 않았음을 기억했다.','다니엘','일지',q.parent);}
function v39Chronicle(){
 const d=v39Data(),wrap=document.createElement('div');const hint=document.createElement('p');hint.className='hint';hint.textContent='전체 버전의 기록을 모아 선택의 원인과 후속 결과를 탐색합니다. v39 사건은 같은 경로의 다음 기록도 보여 줍니다.';wrap.append(hint);
 const search=document.createElement('input');search.placeholder='제목·본문·사건 ID 검색';wrap.append(search);
 function selector(items){const el=document.createElement('select');for(const [value,label] of items){const o=document.createElement('option');o.value=value;o.textContent=label;el.append(o);}wrap.append(el);return el;}
 const who=selector(['전체','미겔','알렉','다니엘','황궁 NPC'].map(x=>[x,x]));const kind=selector(['전체','선택','후속','결말','일지','서사','관계','기타'].map(x=>[x,x]));const order=selector([['new','최신순'],['old','오래된순'],['title','제목순']]);
 const list=document.createElement('div');wrap.append(list);
 const all=new Map();for(const m of v16Data().memories||[])if(m&&m.id)all.set(m.id,m);for(const group of [v36Data().events,v37Data().events,v38Data().events,d.events])for(const m of group)if(m&&m.id)all.set(m.id,m);
 function personOf(m){return m.person||(/미겔|코트리먼/.test(m.title||'')?'미겔':/알렉/.test(m.title||'')?'알렉':/다니엘|DAY /.test(m.title||'')?'다니엘':'황궁 NPC');}
 function draw(){list.replaceChildren();const needle=search.value.trim().toLowerCase();let items=[...all.values()].filter(m=>(who.value==='전체'||who.value===personOf(m)||who.value==='황궁 NPC'&&!['미겔','알렉','다니엘'].includes(personOf(m)))&&(kind.value==='전체'||(m.category||'기타')===kind.value)&&[m.id,m.title,m.text,personOf(m)].join(' ').toLowerCase().includes(needle));items.sort((a,b)=>order.value==='title'?String(a.title||'').localeCompare(String(b.title||''),'ko'):order.value==='old'?(a.day||0)-(b.day||0):(b.day||0)-(a.day||0));const count=document.createElement('p');count.className='hint';count.textContent='검색 결과 '+items.length+'건';list.append(count);
 for(const m of items){const b=document.createElement('button');b.textContent='✦ DAY '+(m.day||'?')+' · '+(m.title||'기록');b.onclick=()=>{let root=m,seen=new Set();while(root.parent&&all.has(root.parent)&&!seen.has(root.id)){seen.add(root.id);root=all.get(root.parent);}const chain=[root],visited=new Set([root.id]);for(let i=0;i<50;i++){const next=[...all.values()].filter(x=>x.parent===chain[chain.length-1].id&&!visited.has(x.id)).sort((a,b)=>(a.day||0)-(b.day||0))[0];if(!next)break;chain.push(next);visited.add(next.id);}modal('v39 · 선택 경로',chain.map((x,i)=>(i?'↓ 이어진 사건 ↓\n':'')+'DAY '+(x.day||'?')+' · '+x.title+' ['+(x.category||'기타')+']\n'+(x.text||'')).join('\n\n'));};list.append(b);}}
 search.oninput=draw;who.onchange=draw;kind.onchange=draw;order.onchange=draw;draw();modal('v39 · 통합 회상 연대기',wrap);
}
function v39Board(){const d=v39Data(),a=v34Data().alex,m=v34Data().miguel;modal('v39 · 관계 후속 현황','미겔 · 감정 '+(m.warmth||0)+' / 절제 '+(m.restraint||0)+' / 존중 선택 '+d.miguel.respect+' / 솔직함 '+d.miguel.candor+'\n알렉 · 신뢰 '+(a.trust||0)+' / 의심 '+(a.doubt||0)+' / 회복 시도 '+d.alex.repair+' / 갈등 누적 '+d.alex.friction+'\n진행 중 후속 사건 '+d.pending.filter(q=>q.stage<3).length+'건');}


// v40: milestone-driven consequences. Existing save data is extended lazily.
function v40Data(){
 const d=state.v40??(state.v40={milestones:{},pending:[],events:[],seen:{},court:{},backup:null});
 d.milestones??={};d.pending??=[];d.events??=[];d.seen??={};d.court??={};return d;
}
function v40Record(id,title,body,person,category,parent){
 const d=v40Data(),key='v40_'+id;if(d.events.some(e=>e.id===key))return key;
 const e={id:key,title,text:body,person,category,day:state.day,parent:parent||null};d.events.push(e);
 v18Remember(key,title,body,category);const m=(v16Data().memories||[]).find(x=>x.id===key);if(m){m.person=person;m.parent=e.parent;m.day=e.day;}return key;
}
function v40Choice(c){
 const d=v40Data();let type,mode,loc=null,person,title,body;
 if(c.v40Miguel){type='miguel';mode=c.v40Miguel;person='미겔';d.milestones.miguel=(d.milestones.miguel||0)+1;title='미겔 · 선택한 거리';body=mode==='respect'?'다니엘은 미겔의 뜻과 알렉과의 약혼을 존중하며 자신의 마음을 다스렸다.':'다니엘은 조심스럽게 자신의 마음을 인정하되 미겔에게 대답을 요구하지 않았다.';}
 else if(c.v40Alex){type='alex';mode=c.v40Alex;person='알렉';d.milestones.alex=(d.milestones.alex||0)+1;title='알렉 · 형제의 갈림길';body=mode==='repair'?'다니엘은 형에게 자신이 피했던 대화를 먼저 청했다.':'다니엘은 형의 질문에 답을 미루었다. 오해는 아직 풀리지 않았다.';const a=v34Data().alex;a.trust=Math.max(0,(a.trust||0)+(mode==='repair'?2:0));a.doubt=Math.max(0,(a.doubt||0)+(mode==='repair'?-1:2));}
 else if(c.v40Npc){type='npc';mode=c.v40NpcMode;loc=c.v40Npc;person=V19_NPC_PROFILES[loc]?.name||'황궁 사람';title=person+' · 이어지는 평판';body=mode==='help'?'다니엘은 사람들의 소문보다 당사자의 사정을 먼저 확인했다.':'다니엘은 경솔한 개입을 피했지만, 침묵을 다르게 해석하는 사람도 있었다.';d.court[loc]=(d.court[loc]||0)+(mode==='help'?2:-1);}
 else return;
 const parent=v40Record('choice_'+type+'_'+state.day+'_'+d.events.length,title,body,person,'선택');
 d.pending.push({id:'v40arc_'+state.day+'_'+d.pending.length,type,mode,loc,stage:0,due:state.day+2,parent});
}
function v40Follow(type,loc){
 const d=v40Data(),q=d.pending.find(x=>x.type===type&&x.stage<3&&state.day>=x.due&&(type!=='npc'||x.loc===loc));if(!q)return false;
 q.stage++;const stage=q.stage;q.due=state.day+2;let person,title,body;
 if(type==='miguel'){person='미겔';title=['','미겔 · 되돌아온 인사','미겔 · 지켜 낸 약속','미겔 · 다음 계절의 거리'][stage];body=stage===1?(q.mode==='respect'?'“다니엘 경. 그날의 배려를 기억하고 있습니다.” 미겔은 짧게 인사했다.':'“그 말씀을 가볍게 듣지 않았습니다.” 미겔은 담담히 말했다.'):(stage===2?'다니엘은 서두르지 않고 미겔의 결정을 기다렸다. 알렉과의 약혼은 여전히 변함없었다.':q.mode==='respect'?'서로의 경계를 지킨 인사가 두 사람 사이에 조용한 신뢰로 남았다.':'고백이 곧 약속은 아니었다. 다니엘은 답을 재촉하지 않는 법을 배웠다.');}
 else if(type==='alex'){person='알렉';title=['','알렉 · 다시 시작한 대화','알렉 · 오해의 무게','알렉 · 형제의 다음 자리'][stage];body=stage===1?(q.mode==='repair'?'알렉은 동생에게 자리를 내주었다. “네 얘기를 듣겠다.”':'알렉은 침묵을 오래 바라보았다. “말하지 않으면 나도 알 수 없다.”'):(stage===2?q.mode==='repair'?'다니엘은 어설프게나마 사과했고, 형은 쉽게 대답하지 않았다.':'말하지 못한 사정이 쌓이자 두 사람의 인사는 더 짧아졌다.':q.mode==='repair'?'서로를 완전히 이해하지 못해도 대화를 이어갈 여지는 남았다.':'형제는 같은 공간에 서 있어도 서로에게 한 걸음 더 멀어졌다.');}
 else {person=V19_NPC_PROFILES[loc]?.name||'황궁 사람';title=person+' · '+['','소문의 여파','다른 궁인의 반응','평판의 귀결'][stage];body=stage===1?(q.mode==='help'?'궁인 한 사람이 다니엘에게 감사를 전했다.':'소문은 다니엘이 아무 말도 하지 않았다는 사실까지 퍼뜨렸다.'):(stage===2?q.mode==='help'?'다른 궁인이 도움을 청하며 다니엘의 판단을 믿어 보겠다고 했다.':'궁인들은 다니엘 앞에서 말을 아꼈다.':q.mode==='help'?'당사자를 지키려던 선택이 작은 신뢰의 연결망을 만들었다.':'침묵이 남긴 오해는 쉽게 사라지지 않았다.');if(stage===2){const n=v19Data().npc[loc];if(n)n.rapport=Math.max(0,Math.min(10,(n.rapport||0)+(q.mode==='help'?1:-1)));}}
 const id=v40Record('follow_'+q.id+'_'+stage,title,body,person,stage===3?'결말':'후속',q.parent);q.parent=id;
 return v18Scene('v40_follow',person,body,[{text:'이후의 일을 기억한다.',next:'explore'}]);
}
function v40Miguel(loc){if(v40Follow('miguel',loc))return true;
 const d=v40Data(),m=v34Data().miguel,key='miguel_'+Math.floor(state.day/11);
 if(d.seen[key]||(m.meetings||0)<5||!v39Data().events.some(e=>e.person==='미겔'&&e.category==='결말'))return false;
 d.seen[key]=true;const calm=(m.restraint||0)>=(m.warmth||0);
 return v18Scene('v40_miguel','미겔 코트리먼',(calm?'미겔은 다니엘의 조심스러운 인사를 받아 주었다. “지난번처럼 서두르지 않으시는군요.”':'미겔은 다니엘을 바라보았다. “그날 하신 말씀을 기억합니다.”')+'\n\n다니엘은 그녀가 알렉의 약혼자임을 잊지 않았다.',[{text:'“영애의 결정을 존중하겠습니다.”',next:'explore',v40Miguel:'respect'},{text:'“……제 마음만큼은 부정하지 않겠습니다.”',next:'explore',v40Miguel:'honest'}]);
}
function v40Alex(loc){if(v40Follow('alex',loc))return true;
 const d=v40Data(),a=v34Data().alex,key='alex_'+Math.floor(state.day/11);if(d.seen[key]||!v39Data().events.some(e=>e.person==='알렉'&&e.category==='결말'))return false;d.seen[key]=true;
 return v18Scene('v40_alex','알렉 레온하르트',(a.doubt||0)>(a.trust||0)?'알렉은 다니엘을 불러 세웠다. “또 피할 생각이냐?”':'알렉은 먼저 말을 건넸다. “네가 하고 싶은 말이 남아 있겠지.”',[{text:'“형님, 제 말을 들어 주십시오.”',next:'explore',v40Alex:'repair'},{text:'“……지금은 답하기 어렵습니다.”',next:'explore',v40Alex:'avoid'}]);
}
function v40Npc(loc){if(v40Follow('npc',loc))return true;
 const d=v40Data(),p=V19_NPC_PROFILES[loc],n=v19Data().npc[loc],key='npc_'+loc+'_'+Math.floor(state.day/12);
 if(!p||!n||d.seen[key]||!v39Data().events.some(e=>e.person===p.name&&e.category==='결말'))return false;d.seen[key]=true;
 const rep=(v37Data().reputation[loc]||0)+(v38Data().court[loc]||0)+(v39Data().court[loc]||0)+(d.court[loc]||0);
 return v18Scene('v40_npc',p.name,rep>=4?'“다니엘 경이라면 믿을 수 있겠지요.” 황궁 사람들의 시선이 조금 누그러졌다.':rep<0?'“궁 안에서는 말을 아끼셔야 합니다.” 경계하는 눈길이 스쳤다.':'“최근 들리는 소문을 확인해 주시겠습니까?” 조심스러운 부탁이었다.',[{text:'“당사자의 사정을 먼저 듣겠습니다.”',next:'explore',v40Npc:loc,v40NpcMode:'help'},{text:'“섣불리 개입하지 않겠습니다.”',next:'explore',v40Npc:loc,v40NpcMode:'wait'}]);
}
function v40Daily(){const d=v40Data(),key='day_'+state.day;if(d.seen[key])return;d.seen[key]=true;const due=d.pending.find(q=>q.stage<3&&q.due<=state.day);if(due)v40Record('day_'+state.day,'DAY '+state.day+' · 아직 끝나지 않은 선택','다니엘은 '+(due.type==='miguel'?'미겔과의 대화':due.type==='alex'?'형과 나눈 말':'황궁에서 들은 소문')+'이 아직 결말에 닿지 않았음을 알았다.','다니엘','일지',due.parent);}
function v40Chronicle(){
 const d=v40Data(),wrap=document.createElement('div'),hint=document.createElement('p');hint.className='hint';hint.textContent='v1~v40 회상을 검색합니다. 사건을 선택하면 부모 선택과 후속 사건을 시간순으로 표시합니다.';wrap.append(hint);
 const search=document.createElement('input');search.placeholder='제목·본문·ID 검색';wrap.append(search);
 function select(items){const e=document.createElement('select');for(const [v,t] of items){const o=document.createElement('option');o.value=v;o.textContent=t;e.append(o);}wrap.append(e);return e;}
 const who=select(['전체','미겔','알렉','다니엘','황궁 NPC'].map(x=>[x,x])),kind=select(['전체','선택','후속','결말','일지','서사','관계','기타'].map(x=>[x,x])),sort=select([['new','최신순'],['old','오래된순'],['title','제목순']]);
 const list=document.createElement('div');wrap.append(list);const all=new Map();for(const m of v16Data().memories||[])if(m?.id)all.set(m.id,m);for(const group of [v36Data().events,v37Data().events,v38Data().events,v39Data().events,d.events])for(const m of group||[])if(m?.id)all.set(m.id,m);
 const person=m=>m.person||(/미겔|코트리먼/.test(m.title||'')?'미겔':/알렉/.test(m.title||'')?'알렉':/다니엘|DAY /.test(m.title||'')?'다니엘':'황궁 NPC');
 function draw(){list.replaceChildren();const term=search.value.trim().toLowerCase();let items=[...all.values()].filter(m=>(who.value==='전체'||who.value===person(m)||who.value==='황궁 NPC'&&!['미겔','알렉','다니엘'].includes(person(m)))&&(kind.value==='전체'||(m.category||'기타')===kind.value)&&[m.title,m.text,m.id].some(x=>String(x||'').toLowerCase().includes(term)));items.sort((a,b)=>sort.value==='title'?String(a.title).localeCompare(String(b.title),'ko'):sort.value==='old'?(a.day||0)-(b.day||0):(b.day||0)-(a.day||0));
 for(const m of items.slice(0,250)){const b=document.createElement('button');b.textContent='✦ DAY '+(m.day||'?')+' · '+(m.title||'기록');b.onclick=()=>{let root=m;const guard=new Set();while(root.parent&&all.has(root.parent)&&!guard.has(root.id)){guard.add(root.id);root=all.get(root.parent);}const chain=[root],visited=new Set([root.id]);for(let i=0;i<20;i++){const next=[...all.values()].filter(x=>x.parent===chain[chain.length-1].id&&!visited.has(x.id)).sort((a,b)=>(a.day||0)-(b.day||0))[0];if(!next)break;chain.push(next);visited.add(next.id);}modal('선택 경로 · '+(m.title||'회상'),chain.map(x=>'DAY '+(x.day||'?')+' · '+x.title+'\n'+(x.text||'')).join('\n\n────\n\n'));};list.append(b);}if(!items.length){const empty=document.createElement('p');empty.textContent='일치하는 기록이 없습니다.';list.append(empty);}}
 search.oninput=draw;who.onchange=draw;kind.onchange=draw;sort.onchange=draw;draw();modal('v40 · 통합 사건 연대기',wrap);
}
function v40Board(){const d=v40Data(),a=v34Data().alex,m=v34Data().miguel;modal('v40 · 관계 전환점','미겔 · 감정 '+(m.warmth||0)+' / 절제 '+(m.restraint||0)+' / 전환점 '+(d.milestones.miguel||0)+'\n알렉 · 신뢰 '+(a.trust||0)+' / 의심 '+(a.doubt||0)+' / 대화 전환점 '+(d.milestones.alex||0)+'\n진행 중인 후속 사건 '+d.pending.filter(q=>q.stage<3).length+'건');}


// v41: follow-up arcs and validated recovery snapshots; preserves the v1 save key.
function v41Data(){
 const d=state.v41??(state.v41={choices:[],arcs:[],events:[],rumors:{},seen:{},milestones:{}});
 d.choices??=[];d.arcs??=[];d.events??=[];d.rumors??={};d.seen??={};d.milestones??={};return d;
}
function v41Log(id,title,body,person,category,parent){
 const d=v41Data(),key='v41_'+id;if(d.events.some(e=>e.id===key))return key;
 const e={id:key,day:state.day,title,text:body,person,category,parent:parent||null};d.events.push(e);
 v18Remember(key,title,body,category);
 const m=(v16Data().memories||[]).find(x=>x.id===key);if(m){m.person=person;m.parent=e.parent;m.day=e.day;}
 return key;
}
function v41Choose(c){
 const d=v41Data();let kind,mode,loc=null,person,title,body;
 if(c.v41Miguel){kind='miguel';mode=c.v41Miguel;person='미겔';title='미겔 · 조심스러운 진심';body=mode==='boundary'?'다니엘은 미겔과 알렉의 약혼을 존중하며 더는 대답을 바라지 않기로 했다.':'다니엘은 감정을 인정하되 그 감정이 미겔에게 짐이 되어서는 안 된다고 말했다.';const m=v34Data().miguel;m.restraint=Math.max(0,(m.restraint||0)+(mode==='boundary'?2:1));m.warmth=Math.max(-12,Math.min(20,(m.warmth||0)+(mode==='honest'?1:0)));}
 else if(c.v41Alex){kind='alex';mode=c.v41Alex;person='알렉';title='알렉 · 말하지 못한 사정';body=mode==='speak'?'다니엘은 형에게 자신의 미숙함을 인정하고 대화를 청했다.':'다니엘은 당장 진실을 말할 용기가 없어 다시 시간을 청했다.';const a=v34Data().alex;a.trust=Math.max(-12,Math.min(20,(a.trust||0)+(mode==='speak'?2:-1)));a.doubt=Math.max(0,Math.min(20,(a.doubt||0)+(mode==='speak'?-1:2)));}
 else if(c.v41Npc){kind='npc';mode=c.v41NpcMode;loc=c.v41Npc;person=V19_NPC_PROFILES[loc]?.name||'황궁 사람';title=person+' · 소문의 출처';body=mode==='verify'?'다니엘은 떠도는 말을 퍼뜨리기 전에 당사자의 설명을 들었다.':'다니엘은 확인되지 않은 이야기를 더는 옮기지 않기로 했다.';d.rumors[loc]=(d.rumors[loc]||0)+(mode==='verify'?2:-1);}
 else return;
 const id=v41Log('choice_'+kind+'_'+state.day+'_'+d.choices.length,title,body,person,'선택');
 d.choices.push({id,kind,mode,loc,day:state.day});
 d.arcs.push({id:'v41arc_'+d.arcs.length+'_'+state.day,kind,mode,loc,stage:0,due:state.day+2,parent:id});
}
function v41Follow(kind,loc){
 const d=v41Data(),q=d.arcs.find(x=>x.kind===kind&&x.stage<3&&state.day>=x.due&&(kind!=='npc'||x.loc===loc));if(!q)return false;
 q.stage++;q.due=state.day+2;const stage=q.stage;
 let person,title,body;
 if(kind==='miguel'){
 person='미겔';title=['','미겔 · 말의 무게','미겔 · 다시 만난 복도','미겔 · 서로의 경계'][stage];
 body=stage===1?(q.mode==='boundary'?'“그날의 말씀은 기억합니다.” 미겔은 다니엘의 조심스러운 배려를 인정했다.':'“다니엘 경의 말씀을 가볍게 여기지는 않았습니다.” 미겔은 더 이상의 답을 약속하지 않았다.'):
 stage===2?'미겔은 알렉과의 약혼을 변함없이 지켰다. 다니엘은 그 사실을 알면서도 지난 대화가 마음에 남았다.':
 q.mode==='boundary'?'두 사람은 넘지 않기로 한 선을 지켰다. 그 선택은 짧지만 진실한 신뢰로 남았다.':'다니엘은 자신의 마음을 인정하면서도 미겔에게 결정을 요구하지 않는 법을 배웠다.';
 }else if(kind==='alex'){
 person='알렉';title=['','알렉 · 어긋난 인사','알렉 · 형의 질문','알렉 · 남겨 둔 자리'][stage];
 body=stage===1?(q.mode==='speak'?'알렉은 동생의 말을 끊지 않았다. “끝까지 말해 봐라.”':'알렉은 잠시 입을 다물었다. “네가 말하지 않는다면 기다릴 수밖에 없겠군.”'):
 stage===2?(q.mode==='speak'?'다니엘은 솔직하게 사과했지만 형제 사이의 모든 오해가 단번에 풀리지는 않았다.':'말하지 못한 사정이 쌓이면서 알렉은 동생을 더 주의 깊게 살폈다.'):
 q.mode==='speak'?'알렉은 동생에게 다음 대화의 자리를 남겨 두었다. 화해는 서서히 시작되었다.':'형제의 거리는 좁혀지지 않았다. 다니엘은 언젠가 대답해야 한다는 것을 알았다.';
 }else{
 person=V19_NPC_PROFILES[loc]?.name||'황궁 사람';title=person+' · '+['','퍼져 나간 말','또 다른 궁인의 반응','소문이 남긴 자리'][stage];
 body=stage===1?(q.mode==='verify'?'다니엘이 직접 확인한 사정이 조용히 전해졌다.':'누구도 소문을 확언하지 못했지만 침묵에도 저마다 뜻을 붙였다.'):
 stage===2?(q.mode==='verify'?'다른 궁인이 다니엘을 찾아와 소문의 당사자가 안도했다고 전했다.':'다른 궁인은 다니엘 앞에서 말을 고르기 시작했다.'):
 q.mode==='verify'?'확인한 말만 전하려는 태도가 작은 신뢰를 남겼다.':'확인되지 않은 말을 멈춘 덕분에 소문은 더 커지지 않았지만 오해는 남았다.';
 if(stage===2){const n=v19Data().npc?.[loc];if(n)n.rapport=Math.max(0,Math.min(10,(n.rapport||0)+(q.mode==='verify'?1:0)));}
 }
 const id=v41Log('follow_'+q.id+'_'+stage,title,body,person,stage===3?'결말':'후속',q.parent);q.parent=id;
 if(stage===3)d.milestones[kind]=(d.milestones[kind]||0)+1;
 return v18Scene('v41_follow',person,body,[{text:'그날의 일을 기억한다.',next:'explore'}]);
}
function v41Miguel(loc){if(v41Follow('miguel',loc))return true;
 const d=v41Data(),m=v34Data().miguel,key='m_'+Math.floor(state.day/13);
 if(d.seen[key]||!v40Data().events.some(e=>e.person==='미겔'&&e.category==='결말')||(m.meetings||0)<5)return false;
 d.seen[key]=true;const restrained=(m.restraint||0)>=(m.warmth||0);
 const t=restrained?'미겔은 복도에서 다니엘을 알아보았다. “지난번에는 말을 아끼셨지요. 그 배려는 기억합니다.”':'미겔은 잠시 발걸음을 멈췄다. “경께서 그날 하신 말씀을 기억합니다.”';
 return v18Scene('v41_miguel','미겔 코트리먼',t+'\n\n다니엘은 그녀가 여전히 알렉의 약혼자라는 사실을 잊지 않았다.',[{text:'“영애의 뜻을 존중하겠습니다.”',next:'explore',v41Miguel:'boundary'},{text:'“……제 감정은 제가 감당하겠습니다.”',next:'explore',v41Miguel:'honest'}]);
}
function v41Alex(loc){if(v41Follow('alex',loc))return true;
 const d=v41Data(),a=v34Data().alex,key='a_'+Math.floor(state.day/13);
 if(d.seen[key]||!v40Data().events.some(e=>e.person==='알렉'&&e.category==='결말'))return false;
 d.seen[key]=true;const t=(a.doubt||0)>(a.trust||0)?'알렉은 다니엘의 앞을 막아섰다. “이번에도 아무 말 하지 않을 셈이냐?”':'알렉은 동생에게 자리를 권했다. “네 이야기를 듣겠다.”';
 return v18Scene('v41_alex','알렉 레온하르트',t,[{text:'“형님, 제 말을 들어 주십시오.”',next:'explore',v41Alex:'speak'},{text:'“……조금만 시간을 주십시오.”',next:'explore',v41Alex:'delay'}]);
}
function v41Npc(loc){if(v41Follow('npc',loc))return true;
 const d=v41Data(),p=V19_NPC_PROFILES[loc],key='n_'+loc+'_'+Math.floor(state.day/13);
 if(!p||d.seen[key]||!v40Data().events.some(e=>e.person===p.name&&e.category==='결말'))return false;
 d.seen[key]=true;
 const old=(v37Data().reputation?.[loc]||0)+(v38Data().court?.[loc]||0)+(v39Data().court?.[loc]||0)+(v40Data().court?.[loc]||0)+(d.rumors[loc]||0);
 const t=old>=5?'“경께서 말씀하신 일은 믿을 만하다고들 합니다.”':old<0?'“최근 궁 안의 소문이 심상치 않습니다. 조심하셔야 합니다.”':'“다니엘 경, 최근 떠도는 이야기를 들어 보셨습니까?”';
 return v18Scene('v41_npc',p.name,t,[{text:'“당사자의 말을 직접 듣겠습니다.”',next:'explore',v41Npc:loc,v41NpcMode:'verify'},{text:'“확인되지 않은 말은 옮기지 않겠습니다.”',next:'explore',v41Npc:loc,v41NpcMode:'quiet'}]);
}
function v41Daily(){const d=v41Data(),key='day_'+state.day;if(d.seen[key])return;d.seen[key]=true;
 const due=d.arcs.find(x=>x.stage<3&&x.due<=state.day);if(!due)return;
 v41Log('day_'+state.day,'DAY '+state.day+' · 되돌아오는 말','다니엘은 '+(due.kind==='miguel'?'미겔에게 전한 마음':due.kind==='alex'?'형에게 미룬 대답':'궁 안에서 들은 소문')+'이 아직 끝나지 않았음을 떠올렸다.','다니엘','일지',due.parent);
}
const V41_BACKUP_KEY='delharsha_purple_night_v1_backup_v41';
function v41ValidSave(raw){try{const d=JSON.parse(raw);return !!(d&&typeof d==='object'&&typeof d.node==='string'&&Number.isFinite(d.day)&&d.day>=1&&d.stats&&typeof d.stats==='object'&&d.exploration&&typeof d.exploration==='object'&&Array.isArray(d.history));}catch{return false;}}
function v41SafeBackup(){try{const raw=localStorage.getItem(SAVE_KEY);if(!raw||!v41ValidSave(raw))return false;localStorage.setItem(V41_BACKUP_KEY,raw);return true;}catch{return false;}}
function v41Recovery(){const wrap=document.createElement('div');const p=document.createElement('p');p.className='hint';p.textContent='현재 저장본을 보호하기 위해 저장 직전의 정상 데이터가 별도 백업됩니다. 복구는 기존 저장 데이터를 교체하므로 확인 후 실행하세요.';wrap.append(p);
 const current=localStorage.getItem(SAVE_KEY),backup=localStorage.getItem(V41_BACKUP_KEY);const info=document.createElement('p');info.textContent='현재 저장본: '+(v41ValidSave(current)?'형식 정상':'없음 또는 손상')+' / 복구용 백업: '+(v41ValidSave(backup)?'형식 정상':'없음 또는 손상');wrap.append(info);
 const make=document.createElement('button');make.textContent='현재 저장본 백업하기';make.onclick=()=>{if(!v41SafeBackup()){modal('백업 실패','정상적인 저장본이 없어 백업할 수 없습니다.');return;}modal('백업 완료','현재 저장본을 별도 복구 슬롯에 보관했습니다.');};wrap.append(make);
 const restore=document.createElement('button');restore.textContent='백업에서 복구하기';restore.disabled=!v41ValidSave(backup);restore.onclick=()=>{if(!confirm('현재 저장본을 백업 데이터로 교체하시겠습니까?'))return;try{const raw=localStorage.getItem(V41_BACKUP_KEY);if(!v41ValidSave(raw))throw Error('invalid');localStorage.setItem(SAVE_KEY,raw);modal('복구 완료','백업 저장본으로 교체했습니다. 불러오기 버튼을 눌러 진행하세요.');}catch{modal('복구 실패','백업 데이터가 유효하지 않거나 저장소를 사용할 수 없습니다.');}};wrap.append(restore);modal('v41 · 저장 복구',wrap);
}
function v41Chronicle(){
 const wrap=document.createElement('div');const p=document.createElement('p');p.className='hint';p.textContent='기존 회상과 v41 사건을 통합합니다. 사건을 선택하면 연결된 선행 선택과 후속 결과를 확인합니다.';wrap.append(p);
 const input=document.createElement('input');input.placeholder='제목·내용 검색';wrap.append(input);
 function pick(items){const s=document.createElement('select');for(const [v,t] of items){const o=document.createElement('option');o.value=v;o.textContent=t;s.append(o);}wrap.append(s);return s;}
 const who=pick(['전체','미겔','알렉','다니엘','황궁 NPC'].map(x=>[x,x]));const sort=pick([['new','최신순'],['old','오래된순'],['title','제목순']]);const kind=pick(['전체','선택','후속','결말','일지'].map(x=>[x,x]));
 const list=document.createElement('div');wrap.append(list);const map=new Map();
 for(const m of v16Data().memories||[])if(m?.id)map.set(m.id,m);
 for(const arr of [v34Data().events,v35Data().events,v36Data().events,v37Data().events,v38Data().events,v39Data().events,v40Data().events,v41Data().events])for(const m of arr||[])if(m?.id)map.set(m.id,m);
 const all=[...map.values()];function person(m){return m.person||(/미겔|코트리먼/.test(m.title||'')?'미겔':/알렉/.test(m.title||'')?'알렉':/다니엘|DAY /.test(m.title||'')?'다니엘':'황궁 NPC');}
 function paint(){list.replaceChildren();const term=input.value.trim().toLowerCase();const items=all.filter(m=>(who.value==='전체'||person(m)===who.value||who.value==='황궁 NPC'&&!['미겔','알렉','다니엘'].includes(person(m)))&&(kind.value==='전체'||(m.category||'')===kind.value)&&[m.title,m.text,m.id].some(x=>String(x||'').toLowerCase().includes(term)));
 items.sort((a,b)=>sort.value==='title'?String(a.title).localeCompare(String(b.title),'ko'):sort.value==='old'?(a.day||0)-(b.day||0):(b.day||0)-(a.day||0));
 for(const m of items.slice(0,300)){const b=document.createElement('button');b.textContent='DAY '+(m.day||'?')+' · '+m.title;b.onclick=()=>{const seen=new Set();let root=m;while(root.parent&&map.has(root.parent)&&!seen.has(root.id)){seen.add(root.id);root=map.get(root.parent);}const chain=[];function walk(e,depth){if(depth>30||seen.has('shown_'+e.id))return;seen.add('shown_'+e.id);chain.push(e);for(const child of all.filter(x=>x.parent===e.id).sort((a,b)=>(a.day||0)-(b.day||0)))walk(child,depth+1);}walk(root,0);modal('사건의 선택 경로',chain.map(x=>'DAY '+(x.day||'?')+' · '+x.title+'\n'+(x.text||'')).join('\n\n────\n\n'));};list.append(b);}
 if(!items.length){const empty=document.createElement('p');empty.textContent='조건에 맞는 기록이 없습니다.';list.append(empty);}}
 input.oninput=paint;who.onchange=paint;sort.onchange=paint;kind.onchange=paint;paint();modal('v41 · 통합 사건 연대기',wrap);
}
function v41Board(){const d=v41Data(),a=v34Data().alex,m=v34Data().miguel;modal('v41 · 관계와 후일담','미겔 · 감정 '+(m.warmth||0)+' / 절제 '+(m.restraint||0)+'\n알렉 · 신뢰 '+(a.trust||0)+' / 의심 '+(a.doubt||0)+'\n진행 중인 후속 사건 '+d.arcs.filter(x=>x.stage<3).length+'건\n완결된 후일담 '+d.events.filter(x=>x.category==='결말').length+'건');}


// v42: save-compatible long-form outcomes, rumor network, and recovery verification.
function v42Data(){const d=state.v42??(state.v42={seen:{},arcs:[],events:[],ties:{},rumors:{},checkpoints:[]});d.seen??={};d.arcs??=[];d.events??=[];d.ties??={};d.rumors??={};d.checkpoints??=[];return d;}
function v42Log(id,title,body,person,category,parent){const d=v42Data(),key='v42_'+id;if(d.events.some(e=>e.id===key))return key;const e={id:key,day:state.day,title,text:body,person,category,parent:parent||null};d.events.push(e);v18Remember(key,title,body,category);const m=(v16Data().memories||[]).find(x=>x.id===key);if(m){m.person=person;m.parent=e.parent;}return key;}
function v42Choice(c){let kind,mode,loc,person;if(c.v42Miguel){kind='miguel';mode=c.v42Miguel;person='미겔';}else if(c.v42Alex){kind='alex';mode=c.v42Alex;person='알렉';}else if(c.v42Npc){kind='npc';mode=c.v42NpcMode;loc=c.v42Npc;person=V19_NPC_PROFILES[loc]?.name||'황궁 사람';}else return;
 const d=v42Data(),title=person+' · 다시 선택한 태도',body=kind==='miguel'?(mode==='respect'?'다니엘은 미겔의 약혼과 선택을 존중하며 자신의 감정을 다스리기로 했다.':'다니엘은 답을 강요하지 않으면서도 자신의 마음을 부정하지 않았다.'):kind==='alex'?(mode==='repair'?'다니엘은 형에게 숨겼던 두려움을 조심스럽게 고백했다.':'다니엘은 형과의 대화를 또다시 미뤘다.'):(mode==='clarify'?'다니엘은 소문이 닿은 두 사람의 말을 각각 확인했다.':'다니엘은 확인되지 않은 말을 더는 옮기지 않기로 했다.');
 const id=v42Log('choice_'+kind+'_'+state.day+'_'+d.arcs.length,title,body,person,'선택');d.arcs.push({id:'v42arc_'+d.arcs.length+'_'+state.day,kind,mode,loc,stage:0,due:state.day+2,parent:id});
 if(kind==='miguel'){d.ties.miguel=(d.ties.miguel||0)+(mode==='respect'?1:0);}
 if(kind==='alex'){d.ties.alex=(d.ties.alex||0)+(mode==='repair'?2:-1);}
 if(kind==='npc'){d.rumors[loc]=(d.rumors[loc]||0)+(mode==='clarify'?2:-1);const n=v19Data().npc?.[loc];if(n)n.rapport=Math.max(0,Math.min(10,(n.rapport||0)+(mode==='clarify'?1:0)));}
}
function v42Follow(kind,loc){const d=v42Data(),q=d.arcs.find(x=>x.kind===kind&&x.stage<3&&x.due<=state.day&&(kind!=='npc'||x.loc===loc));if(!q)return false;q.stage++;q.due=state.day+2;const stage=q.stage;let person,title,body;
 if(kind==='miguel'){person='미겔';title=['','미겔 · 기억하는 말','미겔 · 보랏빛 회랑','미겔 · 지켜 낸 거리'][stage];body=stage===1?'미겔은 다니엘의 걸음걸이를 알아보고 고개를 돌렸다. “지난번 말씀은 잊지 않았습니다.”':stage===2?(q.mode==='respect'?'미겔은 경계를 존중한 태도에 짧게 감사를 표했다. 다니엘은 답을 바라지 않았다.':'미겔은 그 마음을 이해한다고 말했으나, 자신의 약혼과 책임을 분명히 했다.'):(q.mode==='respect'?'서로의 책임을 지키며 나눈 인사가 신뢰로 남았다.':'다니엘은 거절도 승낙도 강요하지 않은 채 감정을 스스로 감당하기로 했다.');}
 else if(kind==='alex'){person='알렉';title=['','알렉 · 돌아온 질문','알렉 · 형제의 식탁','알렉 · 남은 대화'][stage];body=stage===1?(q.mode==='repair'?'알렉은 동생의 말을 듣기 위해 자리를 비워 두었다.':'알렉은 다니엘의 침묵을 알아차리고 더 묻지 않았다.'):stage===2?(q.mode==='repair'?'두 사람은 오해를 하나씩 풀어 갔으나 아직 서먹했다.':'미뤄 둔 대답이 다시 두 사람 사이에 놓였다.'):(q.mode==='repair'?'형제는 다음에도 대화할 수 있다는 작은 확신을 얻었다.':'다니엘은 피한 질문이 사라진 것이 아님을 알았다.');}
 else {person=V19_NPC_PROFILES[loc]?.name||'황궁 사람';title=person+' · '+['','소문의 다음 행선지','서로 다른 증언','전해진 말의 결말'][stage];body=stage===1?'다른 궁인이 같은 소문을 전했다. 다니엘은 처음 들은 말과 달라진 부분을 알아차렸다.':stage===2?(q.mode==='clarify'?'서로 다른 증언을 대조한 덕에 잘못 알려진 부분이 바로잡혔다.':'확인되지 않은 말이 더 퍼지지는 않았으나 이미 생긴 오해는 남았다.'):(q.mode==='clarify'?'황궁 사람들은 다니엘이 당사자의 말을 확인한 일을 기억했다.':'다니엘은 침묵만으로 해결되지 않는 오해도 있다는 사실을 배웠다.');if(stage===2){const other=Object.keys(V19_NPC_PROFILES).find(k=>k!==loc);if(other)d.rumors[other]=(d.rumors[other]||0)+(q.mode==='clarify'?1:-1);}}
 const id=v42Log('follow_'+q.id+'_'+stage,title,body,person,stage===3?'결말':'후속',q.parent);q.parent=id;return v18Scene('v42_follow',person,body,[{text:'이후의 일을 기억한다.',next:'explore'}]);}
function v42Miguel(loc){if(v42Follow('miguel',loc))return true;const d=v42Data(),m=v34Data().miguel,key='miguel_'+Math.floor(state.day/15);if(d.seen[key]||(m.meetings||0)<5||!v41Data().events.some(x=>x.person==='미겔'&&x.category==='결말'))return false;d.seen[key]=true;const warm=(m.warmth||0),rest=(m.restraint||0);const intro=rest>=warm?'“다니엘 경. 지난번에는 제 처지를 헤아려 주셨지요.” 미겔이 조용히 말했다.':'“그날의 말씀을 가볍게 여기지는 않았습니다.” 미겔은 잠시 시선을 내렸다.';return v18Scene('v42_miguel','미겔 코트리먼',intro+'\n\n다니엘은 그녀와 알렉의 약혼이 여전히 유효함을 알고 있었다.',[{text:'“영애의 뜻을 먼저 생각하겠습니다.”',next:'explore',v42Miguel:'respect'},{text:'“……제 마음은 제가 책임지겠습니다.”',next:'explore',v42Miguel:'honest'}]);}
function v42Alex(loc){if(v42Follow('alex',loc))return true;const d=v42Data(),a=v34Data().alex,key='alex_'+Math.floor(state.day/15);if(d.seen[key]||!v41Data().events.some(x=>x.person==='알렉'&&x.category==='결말'))return false;d.seen[key]=true;const intro=(a.doubt||0)>(a.trust||0)?'“이번에도 피하려는 것이냐?” 알렉은 동생에게 물었다.':'“네 말을 들을 시간이 있다.” 알렉은 의자를 가리켰다.';return v18Scene('v42_alex','알렉 레온하르트',intro,[{text:'“형님, 이제 말씀드리겠습니다.”',next:'explore',v42Alex:'repair'},{text:'“……아직 준비되지 않았습니다.”',next:'explore',v42Alex:'delay'}]);}
function v42Npc(loc){if(v42Follow('npc',loc))return true;const d=v42Data(),p=V19_NPC_PROFILES[loc],key='npc_'+loc+'_'+Math.floor(state.day/15);if(!p||d.seen[key]||!v41Data().events.some(x=>x.person===p.name&&x.category==='결말'))return false;d.seen[key]=true;const score=(d.rumors[loc]||0)+(v41Data().rumors[loc]||0);const intro=score>0?'“경께서는 소문의 근거부터 확인하신다고 들었습니다.”':score<0?'“궁 안의 말이 어디서 시작됐는지 알 수가 없군요.”':'“한 가지 소문이 여러 사람을 거쳐 다른 이야기가 됐습니다.”';return v18Scene('v42_npc',p.name,intro,[{text:'“관련된 분들의 말을 확인하겠습니다.”',next:'explore',v42Npc:loc,v42NpcMode:'clarify'},{text:'“확인 전에는 말을 옮기지 않겠습니다.”',next:'explore',v42Npc:loc,v42NpcMode:'quiet'}]);}
function v42Daily(){const d=v42Data(),key='day_'+state.day;if(d.seen[key])return;d.seen[key]=true;const due=d.arcs.find(q=>q.stage<3&&q.due<=state.day);if(due)v42Log('day_'+state.day,'DAY '+state.day+' · 미뤄 둔 이야기','다니엘은 '+(due.kind==='miguel'?'미겔과 나눈 말':due.kind==='alex'?'형에게 전하지 못한 대답':'황궁에서 달라진 소문')+'이 아직 끝나지 않았음을 떠올렸다.','다니엘','일지',due.parent);}
function v42VerifyRecovery(){const wrap=document.createElement('div');const note=document.createElement('p');note.className='hint';note.textContent='현재 저장본과 v41 백업을 각각 파싱·구조 검증합니다. 검사만으로 저장 데이터는 변경되지 않습니다.';wrap.append(note);const result=document.createElement('pre');wrap.append(result);const check=document.createElement('button');check.textContent='저장본·백업 검증하기';check.onclick=()=>{const raw=localStorage.getItem(SAVE_KEY),back=localStorage.getItem(V41_BACKUP_KEY);const report=x=>{if(!x)return '없음';if(!v41ValidSave(x))return '구조 검사 실패';try{const o=JSON.parse(x);return '정상 · DAY '+o.day+' · '+x.length+'자';}catch{return 'JSON 손상';}};result.textContent='현재 저장본: '+report(raw)+'\n복구용 백업: '+report(back)+'\n기존 저장 키: '+SAVE_KEY+'\n검사는 읽기 전용입니다.';};wrap.append(check);const recovery=document.createElement('button');recovery.textContent='기존 백업·복구 메뉴 열기';recovery.onclick=v41Recovery;wrap.append(recovery);modal('v42 · 저장 데이터 안전 검사',wrap);}
function v42Chronicle(){const wrap=document.createElement('div'),note=document.createElement('p');note.className='hint';note.textContent='v16~v42 기록을 중복 제거해 연결합니다. 사건을 선택하면 선행 원인부터 후속 결과까지 탐색합니다.';wrap.append(note);const search=document.createElement('input');search.placeholder='제목·내용·인물 검색';wrap.append(search);function selector(values){const x=document.createElement('select');for(const [v,t] of values){const o=document.createElement('option');o.value=v;o.textContent=t;x.append(o);}wrap.append(x);return x;}const who=selector(['전체','미겔','알렉','다니엘','황궁 NPC'].map(v=>[v,v])),sort=selector([['new','최신순'],['old','오래된순'],['title','제목순']]),kind=selector(['전체','선택','후속','결말','일지'].map(v=>[v,v]));const list=document.createElement('div');wrap.append(list);const map=new Map();for(const m of v16Data().memories||[])if(m?.id)map.set(m.id,m);for(const arr of [v34Data().events,v35Data().events,v36Data().events,v37Data().events,v38Data().events,v39Data().events,v40Data().events,v41Data().events,v42Data().events])for(const m of arr||[])if(m?.id)map.set(m.id,m);const all=[...map.values()];const person=m=>m.person||(/미겔|코트리먼/.test(m.title||'')?'미겔':/알렉/.test(m.title||'')?'알렉':/다니엘|DAY /.test(m.title||'')?'다니엘':'황궁 NPC');function paint(){list.replaceChildren();const term=search.value.trim().toLowerCase();const items=all.filter(m=>(who.value==='전체'||person(m)===who.value||who.value==='황궁 NPC'&&!['미겔','알렉','다니엘'].includes(person(m)))&&(kind.value==='전체'||m.category===kind.value)&&(!term||[m.title,m.text,person(m)].join(' ').toLowerCase().includes(term)));items.sort((a,b)=>sort.value==='title'?String(a.title).localeCompare(String(b.title),'ko'):sort.value==='old'?(a.day||0)-(b.day||0):(b.day||0)-(a.day||0));for(const m of items.slice(0,350)){const b=document.createElement('button');b.textContent='DAY '+(m.day||'?')+' · '+m.title;b.onclick=()=>{const seen=new Set();let root=m;while(root.parent&&map.has(root.parent)&&!seen.has(root.id)){seen.add(root.id);root=map.get(root.parent);}const chain=[root],visited=new Set([root.id]);let changed=true;while(changed){changed=false;for(const e of all){if(e.parent&&visited.has(e.parent)&&!visited.has(e.id)){visited.add(e.id);chain.push(e);changed=true;}}}chain.sort((a,b)=>(a.day||0)-(b.day||0));modal('선택 경로 · '+m.title,chain.map(x=>'DAY '+(x.day||'?')+' · '+x.title+'\n'+(x.text||'')).join('\n\n────────\n\n'));};list.append(b);}if(!items.length){const p=document.createElement('p');p.textContent='조건에 맞는 회상이 없습니다.';list.append(p);}}search.oninput=paint;who.onchange=paint;sort.onchange=paint;kind.onchange=paint;paint();modal('v42 · 통합 회상 연대기',wrap);}
function v42Board(){const d=v42Data();modal('v42 · 장기 관계 기록','미겔 · 존중 선택 '+(d.ties.miguel||0)+'\n알렉 · 대화 누적 '+(d.ties.alex||0)+'\n황궁 소문 변화 '+Object.values(d.rumors).reduce((a,b)=>a+b,0)+'\n진행 중인 연속 사건 '+d.arcs.filter(x=>x.stage<3).length+'건');}


// v43: 별도 상태만 추가하며 이전 버전 저장 구조를 변경하지 않습니다.
function v43Data(){const d=state.v43??(state.v43={seen:{},arcs:[],events:[],rumorWeb:{},audit:[]});d.seen??={};d.arcs??=[];d.events??=[];d.rumorWeb??={};d.audit??=[];return d;}
function v43Log(key,title,body,person,category,parent){const d=v43Data(),id='v43_'+key;if(d.events.some(e=>e.id===id))return id;d.events.push({id,day:state.day,title,text:body,person,category,parent:parent||null});v18Remember(id,title,body,category);const m=(v16Data().memories||[]).find(x=>x.id===id);if(m){m.person=person;m.parent=parent||null;}return id;}
function v43Choice(c){let kind,mode,loc,person;if(c.v43Miguel){kind='miguel';mode=c.v43Miguel;person='미겔';}else if(c.v43Alex){kind='alex';mode=c.v43Alex;person='알렉';}else if(c.v43Npc){kind='npc';mode=c.v43NpcMode;loc=c.v43Npc;person=V19_NPC_PROFILES[loc]?.name||'황궁 사람';}else return;
 const d=v43Data(),parent=v43Log('choice_'+state.day+'_'+d.arcs.length,person+' · 선택의 무게',kind==='miguel'?(mode==='restraint'?'다니엘은 미겔의 약혼을 존중하며 서두르지 않기로 했다.':'다니엘은 답을 요구하지 않고 자신의 혼란을 솔직히 인정했다.'):kind==='alex'?(mode==='repair'?'다니엘은 형의 말을 끝까지 듣겠다고 약속했다.':'다니엘은 상처를 키울까 두려워 한동안 대화를 피했다.'):(mode==='verify'?'다니엘은 소문의 출처를 직접 확인하겠다고 했다.':'다니엘은 검증되지 않은 이야기를 전하지 않기로 했다.'),person,'선택');
 d.arcs.push({id:'arc_'+state.day+'_'+d.arcs.length,kind,mode,loc,stage:0,due:state.day+2,parent});
 if(kind==='npc'){const places=Object.keys(V19_NPC_PROFILES).filter(x=>x!==loc);for(const other of places.slice(0,2)){d.rumorWeb[other]=(d.rumorWeb[other]||0)+(mode==='verify'?1:-1);}const n=v19Data().npc?.[loc];if(n)n.rapport=Math.max(0,Math.min(10,(n.rapport||0)+(mode==='verify'?1:0)));}
}
function v43Follow(kind,loc){const d=v43Data(),q=d.arcs.find(a=>a.kind===kind&&a.stage<4&&a.due<=state.day&&(kind!=='npc'||a.loc===loc));if(!q)return false;q.stage++;q.due=state.day+2;let person,body,title;
 if(kind==='miguel'){person='미겔';title=['','노란 장미의 인사','지키기로 한 거리','세 개의 달 아래','다시 만날 날'][q.stage];body=[null,'미겔은 다니엘의 옷자락과 걸음걸이를 알아보았다. “레온하르트 경. 지난번의 말씀을 기억합니다.”',q.mode==='restraint'?'“서로의 처지를 지키는 일도 용기가 필요하지요.” 미겔은 담담하게 말했다.':'“솔직함은 가볍게 다룰 일이 아닙니다.” 미겔은 대답을 재촉하지 않았다.','다니엘은 자신의 마음이 상대의 선택을 대신할 수 없다는 사실을 되새겼다.','그들은 짧게 인사했다. 결론을 강요하지 않았기에 다음 만남의 여지가 남았다.'][q.stage];}
 else if(kind==='alex'){person='알렉';title=['','형제의 서신','미뤄 둔 식탁','말하지 못한 이유','형제의 다음 날'][q.stage];body=[null,'알렉은 다니엘에게 먼저 말을 꺼낼 기회를 주었다.',q.mode==='repair'?'“끝까지 듣겠습니다, 형님.” 다니엘은 떨리는 목소리로 말했다.':'다니엘이 침묵하자 알렉도 말을 삼켰다. 그 사이의 거리는 아직 좁혀지지 않았다.',q.mode==='repair'?'두 사람은 서로의 의도를 단정하지 않기로 했다.':'서로의 의심이 쌓이는 동안 대화의 문턱도 높아졌다.',q.mode==='repair'?'화해가 모든 문제를 해결하지는 않았지만 다시 대화할 길은 열렸다.':'다니엘은 갈등을 끝내지 못한 채 다음 대화를 준비했다.'][q.stage];const a=v34Data().alex;if(q.stage===4){a.trust=(a.trust||0)+(q.mode==='repair'?1:0);a.doubt=Math.max(0,(a.doubt||0)+(q.mode==='repair'?-1:1));}}
 else {person=V19_NPC_PROFILES[loc]?.name||'황궁 사람';title=person+' · '+['','달라진 소문','다른 궁인의 증언','황궁의 반응','소문의 뒤끝'][q.stage];body=[null,'소문은 다른 궁인에게도 전해졌지만 그 내용은 조금씩 달랐다.',q.mode==='verify'?'다니엘은 확인한 사실과 추측을 분리해 전했다.':'다니엘은 불확실한 이야기를 더 퍼뜨리지 않았다.','누군가는 다니엘의 신중함을 기억했고, 누군가는 그 침묵을 오해했다.','다니엘은 소문을 완전히 없앨 수는 없지만 자신의 태도는 선택할 수 있음을 알았다.'][q.stage];}
 const id=v43Log('follow_'+q.id+'_'+q.stage,title,body,person,q.stage===4?'결말':'후속',q.parent);q.parent=id;return v18Scene('v43_follow',person,body,[{text:'이날의 일을 기억한다.',next:'explore'}]);}
function v43Miguel(loc){if(v43Follow('miguel',loc))return true;const d=v43Data(),m=v34Data().miguel,key='miguel_'+Math.floor(state.day/18);if(d.seen[key]||(m.meetings||0)<6||!v42Data().events.some(e=>e.person==='미겔'&&e.category==='결말'))return false;d.seen[key]=true;const intro=(m.restraint||0)>=(m.warmth||0)?'“서두르지 않으시는군요.” 미겔은 다니엘의 조심스러운 태도를 알아보았다.':'“레온하르트 경. 마음을 숨기는 일이 늘 옳지는 않겠지요.” 미겔은 짧게 말했다.';return v18Scene('v43_miguel','미겔',intro+'\n\n다니엘은 미겔과 알렉의 약혼을 알고 있다. 이 대화가 그녀에게 답을 강요하는 일이 되어서는 안 된다.',[{text:'약혼과 결정을 존중하며 거리를 지킨다.',v43Miguel:'restraint',next:'explore'},{text:'답을 요구하지 않고 감정만 인정한다.',v43Miguel:'honesty',next:'explore'}]);}
function v43Alex(loc){if(v43Follow('alex',loc))return true;const d=v43Data(),a=v34Data().alex,key='alex_'+Math.floor(state.day/18);if(d.seen[key]||!v42Data().events.some(e=>e.person==='알렉'&&e.category==='결말'))return false;d.seen[key]=true;const intro=(a.doubt||0)>(a.trust||0)?'알렉은 다니엘을 바라보다가 조용히 물었다. “이번에도 내 말을 피할 생각이니?”':'알렉은 빈 의자를 가리켰다. “앉아라. 이번에는 끝까지 들어 보마.”';return v18Scene('v43_alex','알렉',intro,[{text:'형의 말을 끝까지 듣는다.',v43Alex:'repair',next:'explore'},{text:'지금은 대답을 미룬다.',v43Alex:'avoid',next:'explore'}]);}
function v43Npc(loc){if(v43Follow('npc',loc))return true;const d=v43Data(),p=V19_NPC_PROFILES[loc],key='npc_'+loc+'_'+Math.floor(state.day/18);if(!p||d.seen[key]||!v42Data().events.some(e=>e.person===p.name&&e.category==='결말'))return false;d.seen[key]=true;const score=d.rumorWeb[loc]||0;return v18Scene('v43_npc',p.name,(score>0?'“경께서 지난번 이야기를 확인하셨다면서요.”':'“지난번 소문이 다시 돌고 있습니다.”')+' 궁인은 복도 건너편을 살피며 목소리를 낮췄다.',[{text:'출처를 확인하고 사실만 전한다.',v43Npc:loc,v43NpcMode:'verify',next:'explore'},{text:'확인되지 않은 소문은 전달하지 않는다.',v43Npc:loc,v43NpcMode:'silence',next:'explore'}]);}
function v43Daily(){const d=v43Data(),key='day_'+state.day;if(d.seen[key])return;d.seen[key]=true;const pending=d.arcs.find(a=>a.stage<4&&a.due<=state.day);if(pending)v43Log('day_'+state.day,'DAY '+state.day+' · 아직 끝나지 않은 대화','다니엘은 '+(pending.kind==='miguel'?'미겔에게 건넨 말':pending.kind==='alex'?'형과 나눈 대화':'황궁에서 들은 소문')+'의 뒤를 생각했다. 결말을 서두를 수는 없었다.','다니엘','일지',pending.parent);}
function v43Chronicle(){const wrap=document.createElement('div');const hint=document.createElement('p');hint.className='hint';hint.textContent='기존 회상과 v43 기록을 검색합니다. 연결된 사건은 원인부터 결말까지 확인할 수 있습니다.';wrap.append(hint);const search=document.createElement('input');search.placeholder='인물·제목·내용 검색';wrap.append(search);function sel(options){const x=document.createElement('select');for(const [v,t] of options){const o=document.createElement('option');o.value=v;o.textContent=t;x.append(o);}wrap.append(x);return x;}const who=sel(['전체','미겔','알렉','다니엘','황궁 NPC'].map(v=>[v,v])),type=sel(['전체','선택','후속','결말','일지'].map(v=>[v,v])),order=sel([['new','최신순'],['old','오래된순'],['title','제목순']]);const result=document.createElement('div');wrap.append(result);const events=[...(v16Data().memories||[]),...Array.from({length:17},(_,i)=>i+27).flatMap(n=>{try{return (state['v'+n]?.events||[])}catch{return []}})];const unique=[...new Map(events.filter(Boolean).map(e=>[e.id||e.title+'_'+e.day,e])).values()];const index=new Map(unique.map(e=>[e.id,e]));function renderList(){result.replaceChildren();const q=search.value.trim().toLowerCase();let items=unique.filter(e=>{const name=e.person||((e.title||'').includes('미겔')?'미겔':(e.title||'').includes('알렉')?'알렉':(e.title||'').includes('다니엘')?'다니엘':'황궁 NPC');return (who.value==='전체'||name===who.value)&&(type.value==='전체'||e.category===type.value)&&(!q||[e.title,e.text,name,e.category].some(t=>String(t||'').toLowerCase().includes(q)));});items.sort((a,b)=>order.value==='title'?String(a.title).localeCompare(String(b.title),'ko'):order.value==='old'?(a.day||0)-(b.day||0):(b.day||0)-(a.day||0));const count=document.createElement('p');count.className='hint';count.textContent=items.length+'건 / 전체 '+unique.length+'건';result.append(count);for(const e of items.slice(0,160)){const b=document.createElement('button');b.textContent='DAY '+(e.day||'?')+' · '+(e.title||'이름 없는 회상');b.onclick=()=>{const chain=[],visited=new Set();let cur=e;while(cur&&!visited.has(cur.id)){chain.unshift(cur);visited.add(cur.id);cur=index.get(cur.parent);}modal('선택 경로 · '+(e.title||'회상'),chain.map(x=>'DAY '+(x.day||'?')+' · '+(x.title||'')+'\n'+(x.text||'')).join('\n\n↓ 이후 사건 ↓\n\n'));};result.append(b);}}for(const x of [search,who,type,order])x.addEventListener('input',renderList);renderList();modal('v43 · 통합 사건 연대기',wrap);}
function v43Audit(){const wrap=document.createElement('div');const p=document.createElement('p');p.className='hint';p.textContent='현재 저장과 백업의 구조를 읽기 전용으로 검사합니다. 복구나 저장 덮어쓰기는 수행하지 않습니다.';wrap.append(p);const result=document.createElement('pre');wrap.append(result);const btn=document.createElement('button');btn.textContent='현재 저장본·백업 검사';btn.onclick=()=>{const keys=[SAVE_KEY,V41_BACKUP_KEY],lines=[];for(const key of keys){let raw=null;try{raw=localStorage.getItem(key);if(!raw){lines.push(key+': 없음');continue;}const obj=JSON.parse(raw),valid=v41ValidSave(raw),arcs=obj.v43?.arcs;lines.push(key+': '+(valid?'기본 구조 정상':'기본 구조 오류')+' / '+raw.length+'자 / v43 사건 '+(Array.isArray(arcs)?arcs.length:0)+'건');}catch(e){lines.push(key+': 파싱 실패 ('+e.message+')');}}result.textContent=lines.join('\n');};wrap.append(btn);modal('v43 · 저장 무결성 점검',wrap);}
function v43Board(){const d=v43Data();modal('v43 · 관계 후일담','진행 중인 사건 '+d.arcs.filter(x=>x.stage<4).length+'건\n완료한 사건 '+d.arcs.filter(x=>x.stage===4).length+'건\n소문이 전해진 장소 '+Object.keys(d.rumorWeb).length+'곳');}

// v44: completed-arc continuations, relationship consequences and recovery diagnostics.
function v44Data(){const d=state.v44??(state.v44={seen:{},arcs:[],events:[],relations:{miguel:0,alex:0,npc:{}},rumors:{}});d.seen??={};d.arcs??=[];d.events??=[];d.relations??={miguel:0,alex:0,npc:{}};d.relations.npc??={};d.rumors??={};return d;}
function v44Record(id,title,body,person,category,parent){const d=v44Data(),key='v44_'+id;if(d.events.some(x=>x.id===key))return key;d.events.push({id:key,day:state.day,title,text:body,person,category,parent:parent||null});v18Remember(key,title,body,category);const m=(v16Data().memories||[]).find(x=>x.id===key);if(m){m.person=person;m.parent=parent||null;}return key;}
function v44Choice(c){let kind,mode,loc,person;if(c.v44Miguel){kind='miguel';mode=c.v44Miguel;person='미겔';}else if(c.v44Alex){kind='alex';mode=c.v44Alex;person='알렉';}else if(c.v44Npc){kind='npc';mode=c.v44NpcMode;loc=c.v44Npc;person=V19_NPC_PROFILES[loc]?.name||'황궁 사람';}else return;const d=v44Data();const parent=v44Record('choice_'+state.day+'_'+d.arcs.length,person+' · 이후의 선택',kind==='miguel'?(mode==='respect'?'다니엘은 약혼을 존중하며 자신의 감정을 스스로 다스리기로 했다.':'다니엘은 답을 재촉하지 않되 자신의 마음을 부정하지 않기로 했다.'):kind==='alex'?(mode==='listen'?'다니엘은 형의 말을 끝까지 듣고 오해를 확인하기로 했다.':'다니엘은 형과의 대화를 또 미루었다.'):(mode==='check'?'다니엘은 소문을 직접 확인해 사실과 추측을 구분했다.':'다니엘은 확인되지 않은 소문의 전달을 멈췄다.'),person,'선택');d.arcs.push({id:'arc_'+state.day+'_'+d.arcs.length,kind,mode,loc,stage:0,due:state.day+2,parent});if(kind==='miguel')d.relations.miguel+=(mode==='respect'?2:1);if(kind==='alex'){d.relations.alex+=(mode==='listen'?2:-2);const a=v34Data().alex;a.trust=Math.max(0,(a.trust||0)+(mode==='listen'?1:0));a.doubt=Math.max(0,(a.doubt||0)+(mode==='listen'?-1:1));}if(kind==='npc'){d.relations.npc[loc]=(d.relations.npc[loc]||0)+(mode==='check'?2:1);for(const other of Object.keys(V19_NPC_PROFILES).filter(x=>x!==loc)){d.rumors[other]=(d.rumors[other]||0)+(mode==='check'?1:-1);}const n=v19Data().npc?.[loc];if(n)n.rapport=Math.max(0,Math.min(10,(n.rapport||0)+(mode==='check'?1:0)));}}
function v44Follow(kind,loc){const d=v44Data(),a=d.arcs.find(x=>x.kind===kind&&x.stage<3&&x.due<=state.day&&(kind!=='npc'||x.loc===loc));if(!a)return false;a.stage++;a.due=state.day+2;let person,body;if(kind==='miguel'){person='미겔';body=[null,'미겔은 걸음걸이만으로 다니엘을 알아보았다. “레온하르트 경. 지난번의 약속을 기억합니다.”',a.mode==='respect'?'“서로의 처지를 존중해 주셔서 감사합니다.” 그녀는 짧게 고개를 숙였다.':'“솔직함을 가볍게 여기지 않겠습니다. 다만 제 선택은 제 몫입니다.”', '다니엘은 결론을 요구하지 않고도 자신의 마음을 책임질 수 있음을 깨달았다.'][a.stage];}else if(kind==='alex'){person='알렉';body=[null,'알렉은 다니엘에게 대화할 시간을 내어 주었다.',a.mode==='listen'?'“형님, 제가 잘못 이해한 것이 있다면 듣겠습니다.” 다니엘은 먼저 입을 열었다.':'다니엘이 말을 미루자 알렉은 더 묻지 않았다. 두 사람 사이의 침묵이 길어졌다.',a.mode==='listen'?'모든 오해가 풀리지는 않았지만 형제는 다음 대화를 약속했다.':'해결되지 않은 의심은 남았다. 다니엘은 더 미루기 전에 마주해야 한다고 생각했다.'][a.stage];}else{person=V19_NPC_PROFILES[loc]?.name||'황궁 사람';body=[null,'소문은 다른 궁인에게 전해져 조금 다른 모습으로 돌아왔다.',a.mode==='check'?'확인된 사실이 퍼지자 불필요한 오해가 조금씩 줄었다.':'전달을 멈춘 덕분에 새로운 소문은 줄었지만 남은 오해는 쉽게 사라지지 않았다.','궁인들은 다니엘의 태도를 기억했다. 소문의 끝은 한 사람의 말로 결정되지 않았다.'][a.stage];}const id=v44Record('follow_'+a.id+'_'+a.stage,person+' · '+(a.stage===3?'새로운 매듭':'후속 이야기 '+a.stage),body,person,a.stage===3?'결말':'후속',a.parent);a.parent=id;return v18Scene('v44_follow',person,body,[{text:'이날의 일을 마음에 새긴다.',next:'explore'}]);}
function v44Miguel(loc){if(v44Follow('miguel',loc))return true;const d=v44Data(),finished=v43Data().arcs.filter(a=>a.kind==='miguel'&&a.stage===4);const source=finished.find(a=>!d.seen['source_'+a.id]);if(!source)return false;d.seen['source_'+source.id]=true;const m=v34Data().miguel;const body=(m.restraint||0)>=(m.warmth||0)?'미겔은 다니엘이 지켜 온 거리를 알아보았다. “경께서 신중하셨다는 것을 압니다.”':'미겔은 잠시 발걸음을 멈췄다. “레온하르트 경. 그날의 말씀을 잊지 않았습니다.”';return v18Scene('v44_miguel','미겔',body+'\n\n다니엘은 미겔과 알렉의 약혼을 알고 있다. 감정이 상대의 선택을 대신할 수는 없다.',[{text:'그녀의 결정과 약혼을 존중한다.',v44Miguel:'respect',next:'explore'},{text:'답을 바라지 않고 마음을 인정한다.',v44Miguel:'honest',next:'explore'}]);}
function v44Alex(loc){if(v44Follow('alex',loc))return true;const d=v44Data(),finished=v43Data().arcs.filter(a=>a.kind==='alex'&&a.stage===4),source=finished.find(a=>!d.seen['source_'+a.id]);if(!source)return false;d.seen['source_'+source.id]=true;const a=v34Data().alex;return v18Scene('v44_alex','알렉',(a.doubt||0)>(a.trust||0)?'“다니엘. 우리가 서로를 의심하는 데 익숙해진 것 같구나.”':'“이번에는 네 말을 들어 보겠다.” 알렉이 빈 의자를 가리켰다.',[{text:'형의 말을 듣고 오해를 확인한다.',v44Alex:'listen',next:'explore'},{text:'아직은 대화를 미룬다.',v44Alex:'avoid',next:'explore'}]);}
function v44Npc(loc){if(v44Follow('npc',loc))return true;const p=V19_NPC_PROFILES[loc];if(!p)return false;const d=v44Data(),finished=v43Data().arcs.filter(a=>a.kind==='npc'&&a.loc===loc&&a.stage===4),source=finished.find(a=>!d.seen['source_'+a.id]);if(!source)return false;d.seen['source_'+source.id]=true;const ripple=(d.rumors[loc]||0)+(v43Data().rumorWeb[loc]||0);return v18Scene('v44_npc',p.name,(ripple>0?'“다른 궁인들도 경께서 사실을 확인하셨다고 합니다.”':'“지난번 소문이 아직 남아 있습니다.”')+' 궁인은 복도 끝을 살피며 말을 이었다.',[{text:'직접 확인한 사실만 전한다.',v44Npc:loc,v44NpcMode:'check',next:'explore'},{text:'불확실한 소문을 전하지 않는다.',v44Npc:loc,v44NpcMode:'stop',next:'explore'}]);}
function v44Daily(){const d=v44Data(),key='day_'+state.day;if(d.seen[key])return;d.seen[key]=true;const due=d.arcs.find(a=>a.stage<3&&a.due<=state.day);if(due)v44Record('day_'+state.day,'DAY '+state.day+' · 남겨진 선택','다니엘은 아직 끝나지 않은 '+(due.kind==='miguel'?'미겔과의 대화':due.kind==='alex'?'형과의 대화':'황궁의 소문')+'를 떠올렸다.','다니엘','일지',due.parent);}
function v44Chronicle(){const wrap=document.createElement('div');const intro=document.createElement('p');intro.className='hint';intro.textContent='v16부터 현재까지의 회상을 모아 봅니다. 사건을 누르면 부모 사건을 거슬러 올라갑니다.';wrap.append(intro);const search=document.createElement('input');search.placeholder='제목·내용·인물 검색';wrap.append(search);const mk=(opts)=>{const e=document.createElement('select');opts.forEach(([v,t])=>{const o=document.createElement('option');o.value=v;o.textContent=t;e.append(o);});wrap.append(e);return e;};const person=mk(['전체','미겔','알렉','다니엘','황궁 NPC'].map(x=>[x,x]));const kind=mk(['전체','선택','후속','결말','일지'].map(x=>[x,x]));const order=mk([['new','최신순'],['old','오래된순'],['title','제목순']]);const result=document.createElement('div');wrap.append(result);const all=[...(v16Data().memories||[])];for(let i=27;i<=44;i++){const events=state['v'+i]?.events;if(Array.isArray(events))all.push(...events);}const unique=[...new Map(all.filter(Boolean).map((x,i)=>[x.id||'old_'+i,x])).values()];const index=new Map(unique.filter(x=>x.id).map(x=>[x.id,x]));const name=x=>x.person||(/미겔/.test(x.title||'')?'미겔':/알렉/.test(x.title||'')?'알렉':/다니엘/.test(x.title||'')?'다니엘':'황궁 NPC');function update(){result.replaceChildren();const q=search.value.trim().toLowerCase();let items=unique.filter(x=>(person.value==='전체'||name(x)===person.value)&&(kind.value==='전체'||x.category===kind.value)&&(!q||[x.title,x.text,name(x),x.category].some(t=>String(t||'').toLowerCase().includes(q))));items.sort((a,b)=>order.value==='title'?String(a.title||'').localeCompare(String(b.title||''),'ko'):order.value==='old'?(a.day||0)-(b.day||0):(b.day||0)-(a.day||0));const count=document.createElement('p');count.className='hint';count.textContent=items.length+'건 / 전체 '+unique.length+'건';result.append(count);items.slice(0,150).forEach(x=>{const b=document.createElement('button');b.textContent='DAY '+(x.day||'?')+' · '+(x.title||'기록')+' ['+(x.category||'기타')+']';b.onclick=()=>{const chain=[],seen=new Set();let cur=x;while(cur&&!seen.has(cur.id)&&chain.length<30){chain.unshift(cur);seen.add(cur.id);cur=index.get(cur.parent);}modal('선택 경로 · '+(x.title||'기록'),chain.map(y=>'DAY '+(y.day||'?')+' · '+(y.title||'기록')+'\n'+(y.text||'')).join('\n\n↓ 이어진 사건 ↓\n\n'));};result.append(b);});}search.oninput=update;person.onchange=kind.onchange=order.onchange=update;update();modal('v44 · 통합 선택 연대기',wrap);}
function v44Audit(){const wrap=document.createElement('div'),intro=document.createElement('p');intro.className='hint';intro.textContent='현재 저장과 백업을 읽기 전용으로 검사합니다. 검사 과정에서 데이터를 변경하지 않습니다.';wrap.append(intro);const result=document.createElement('pre');wrap.append(result);const btn=document.createElement('button');btn.textContent='저장본·백업 구조 검사';btn.onclick=()=>{const lines=[];for(const key of [SAVE_KEY,V41_BACKUP_KEY]){try{const raw=localStorage.getItem(key);if(!raw){lines.push(key+': 없음');continue;}const o=JSON.parse(raw),ok=v41ValidSave(raw),arrays=['v41','v42','v43','v44'].every(k=>!o[k]||!o[k].arcs||Array.isArray(o[k].arcs));lines.push(key+': '+(ok&&arrays?'구조 정상':'구조 확인 필요')+' · DAY '+o.day+' · '+raw.length+'자');}catch(e){lines.push(key+': 파싱 오류 ('+e.message+')');}}result.textContent=lines.join('\n');};wrap.append(btn);modal('v44 · 저장·백업 진단',wrap);}
function v44Board(){const d=v44Data();modal('v44 · 관계와 소문','미겔 · 선택 누적 '+d.relations.miguel+'\n알렉 · 관계 변화 '+d.relations.alex+'\n소문 영향 장소 '+Object.keys(d.rumors).length+'곳\n진행 중 후일담 '+d.arcs.filter(x=>x.stage<3).length+'건\n완료한 후일담 '+d.arcs.filter(x=>x.stage===3).length+'건');}


// v45: post-conclusion cross-relationship stories. All new material is game adaptation.
function v45Data(){const d=state.v45??(state.v45={seen:{},arcs:[],events:[],echo:{miguel:0,alex:0,npc:0},network:{}});if(!d.seen||typeof d.seen!=='object'||Array.isArray(d.seen))d.seen={};if(!Array.isArray(d.arcs))d.arcs=[];if(!Array.isArray(d.events))d.events=[];if(!d.echo||typeof d.echo!=='object')d.echo={miguel:0,alex:0,npc:0};if(!d.network||typeof d.network!=='object')d.network={};return d;}
function v45Record(id,title,body,person,category,parent){const d=v45Data(),key='v45_'+id;if(d.events.some(x=>x&&x.id===key))return key;const e={id:key,day:state.day,title,text:body,person,category,parent:parent||null};d.events.push(e);v18Remember(key,title,body,category);const m=v16Data().memories.find(x=>x.id===key);if(m){m.person=person;m.parent=e.parent;m.day=state.day;}return key;}
function v45Choice(c){let kind,mode,loc,person;if(c.v45Miguel){kind='miguel';mode=c.v45Miguel;person='미겔';}else if(c.v45Alex){kind='alex';mode=c.v45Alex;person='알렉';}else if(c.v45Npc){kind='npc';mode=c.v45Mode;loc=c.v45Npc;person=V19_NPC_PROFILES[loc]?.name||'황궁 사람';}else return;const d=v45Data(),parent=v45Record('decision_'+state.day+'_'+d.arcs.length,person+' · 남겨 둔 말',kind==='miguel'?(mode==='distance'?'다니엘은 미겔의 약혼과 선택을 존중하며 거리를 지켰다.':'다니엘은 자신의 마음을 인정하되 어떤 답도 요구하지 않았다.'):kind==='alex'?(mode==='repair'?'다니엘은 형의 말을 끝까지 듣고 자신의 잘못도 인정했다.':'다니엘은 의심을 숨기지 않고 형에게 확인을 청했다.'):(mode==='verify'?'다니엘은 확인된 사실만 전하기로 했다.':'다니엘은 소문을 옮기지 않고 당사자를 보호하기로 했다.'),person,'선택');d.arcs.push({id:'v45_arc_'+state.day+'_'+d.arcs.length,kind,mode,loc,stage:0,due:state.day+2,parent});d.echo[kind]=(d.echo[kind]||0)+1;if(kind==='miguel'){const m=v34Data().miguel;if(mode==='distance')m.restraint=(m.restraint||0)+1;else m.warmth=(m.warmth||0)+1;}else if(kind==='alex'){const a=v34Data().alex;if(mode==='repair')a.trust=(a.trust||0)+1;else a.doubt=(a.doubt||0)+1;}else{for(const other of Object.keys(V19_NPC_PROFILES)){const change=other===loc?1:(mode==='verify'?1:0);d.network[other]=(d.network[other]||0)+change;}const n=v19Data().npc?.[loc];if(n)n.rapport=Math.min(10,Math.max(0,(n.rapport||0)+1));}}
function v45Follow(kind,loc){const d=v45Data(),a=d.arcs.find(x=>x&&x.kind===kind&&x.stage<4&&x.due<=state.day&&(kind!=='npc'||x.loc===loc));if(!a)return false;a.stage++;a.due=state.day+2;let person,body;if(kind==='miguel'){person='미겔';body=[null,'미겔은 다니엘의 걸음소리를 알아듣고 서류에서 시선을 들었다. “레온하르트 경.”',a.mode==='distance'?'“지켜 주신 예의는 기억하고 있습니다.” 미겔은 더 이상의 약속을 하지 않았다.':'“솔직한 말씀을 가볍게 여기지 않습니다. 그러나 제 처지는 달라지지 않았습니다.”','두 사람은 말보다 긴 침묵 속에서 서로의 경계를 확인했다.','다니엘은 마음을 감추는 일과 타인의 결정을 존중하는 일이 같지 않음을 깨달았다.'][a.stage];}else if(kind==='alex'){person='알렉';body=[null,'알렉은 잠시 다니엘을 바라보다 먼저 자리를 내주었다.',a.mode==='repair'?'“형님. 제 말도 끝까지 들어 주십시오.” 다니엘은 어렵게 입을 열었다.':'“형님, 저는 아직 이해하지 못했습니다.” 다니엘은 물러서지 않았다.',a.mode==='repair'?'두 형제는 서로 다른 기억을 하나씩 맞추어 보았다.':'대답이 모두 주어진 것은 아니었다. 그러나 침묵으로 덮어 둘 수도 없었다.',a.mode==='repair'?'완전한 화해는 아니었지만 다음 대화의 약속이 남았다.':'의심은 여전히 남았지만 다니엘은 자신의 판단을 스스로 책임지기로 했다.'][a.stage];}else{person=V19_NPC_PROFILES[loc]?.name||'황궁 사람';body=[null,'복도 끝에서 시작된 말은 다른 장소에 닿을 때마다 조금씩 달라졌다.',a.mode==='verify'?'다니엘이 확인한 사실을 전하자 궁인들은 추측을 거두기 시작했다.':'다니엘이 말을 옮기지 않자 적어도 새로운 소문 하나는 멈추었다.','다른 궁인들도 다니엘의 태도를 이야기했다. 소문을 믿는 이와 경계하는 이가 나뉘었다.','황궁의 소문은 완전히 사라지지 않았다. 그러나 다니엘의 선택은 몇 사람의 기억에 남았다.'][a.stage];}const id=v45Record('follow_'+a.id+'_'+a.stage,person+' · '+(a.stage===4?'오래 남은 결과':'후속 장면 '+a.stage),body,person,a.stage===4?'결말':'후속',a.parent);a.parent=id;return v18Scene('v45_follow',person,body,[{text:'그날의 일을 기록한다.',next:'explore'}]);}
function v45Miguel(loc){if(v45Follow('miguel',loc))return true;const d=v45Data(),source=v44Data().arcs.find(a=>a.kind==='miguel'&&a.stage===3&&!d.seen['source_'+a.id]);if(!source)return false;d.seen['source_'+source.id]=true;const m=v34Data().miguel,body=(m.restraint||0)>=(m.warmth||0)?'미겔은 잠시 다니엘을 바라보았다. “경께서 거리를 지켜 주셨다는 것을 압니다.”':'미겔은 다니엘의 걸음소리를 알아챘다. “지난번 말씀을 잊지 않았습니다. 그렇지만 제 선택은 제가 하겠습니다.”';return v18Scene('v45_miguel','미겔',body,[{text:'그녀의 약혼과 결정을 존중하며 물러선다.',v45Miguel:'distance',next:'explore'},{text:'대답을 바라지 않고 마음을 인정한다.',v45Miguel:'honest',next:'explore'}]);}
function v45Alex(loc){if(v45Follow('alex',loc))return true;const d=v45Data(),source=v44Data().arcs.find(a=>a.kind==='alex'&&a.stage===3&&!d.seen['source_'+a.id]);if(!source)return false;d.seen['source_'+source.id]=true;const a=v34Data().alex,body=(a.trust||0)>=(a.doubt||0)?'“다니엘. 이번에는 서로 말을 끊지 말자.” 알렉은 의자를 가리켰다.':'“다니엘, 아직 내 말을 믿지 못하겠느냐.” 알렉의 물음에 다니엘은 선뜻 대답하지 못했다.';return v18Scene('v45_alex','알렉',body,[{text:'형의 말을 듣고 오해를 풀어 본다.',v45Alex:'repair',next:'explore'},{text:'남은 의심을 직접 확인한다.',v45Alex:'question',next:'explore'}]);}
function v45Npc(loc){if(v45Follow('npc',loc))return true;const d=v45Data(),source=v44Data().arcs.find(a=>a.kind==='npc'&&a.loc===loc&&a.stage===3&&!d.seen['source_'+a.id]);if(!source)return false;d.seen['source_'+source.id]=true;const p=V19_NPC_PROFILES[loc];if(!p)return false;const network=(d.network[loc]||0)+(v44Data().rumors[loc]||0);return v18Scene('v45_npc',p.name,network>0?'“다른 곳에서도 경께서 소문을 바로잡으셨다고 들었습니다.”':'“궁 안의 이야기가 어디까지 사실인지 모르겠습니다.”',[{text:'출처를 확인하고 사실만 전한다.',v45Npc:loc,v45Mode:'verify',next:'explore'},{text:'확인되지 않은 말은 옮기지 않는다.',v45Npc:loc,v45Mode:'protect',next:'explore'}]);}
function v45Daily(){const d=v45Data(),key='day_'+state.day;if(d.seen[key])return;d.seen[key]=true;const a=d.arcs.find(x=>x.stage<4&&x.due<=state.day);if(a)v45Record('day_'+state.day,'DAY '+state.day+' · 아직 남은 대화','다니엘은 '+(a.kind==='miguel'?'미겔':a.kind==='alex'?'형':'황궁 사람들')+'과의 대화가 끝나지 않았음을 떠올렸다.','다니엘','일지',a.parent);}
function v45Chronicle(){const wrap=document.createElement('div'),intro=document.createElement('p');intro.className='hint';intro.textContent='선택의 원인과 후속 갈래를 함께 확인합니다. 사건을 선택하면 선행 경로와 직접 이어진 사건을 보여 줍니다.';wrap.append(intro);const search=document.createElement('input');search.placeholder='인물·제목·내용 검색';wrap.append(search);const select=(arr)=>{const e=document.createElement('select');for(const [v,t] of arr){const o=document.createElement('option');o.value=v;o.textContent=t;e.append(o);}wrap.append(e);return e;};const person=select(['전체','미겔','알렉','다니엘','황궁 NPC'].map(x=>[x,x])),kind=select(['전체','선택','후속','결말','일지'].map(x=>[x,x])),order=select([['new','최신순'],['old','오래된순'],['title','제목순']]);const result=document.createElement('div');wrap.append(result);const all=[...(v16Data().memories||[])];for(let i=27;i<=45;i++){const a=state['v'+i]?.events;if(Array.isArray(a))all.push(...a);}const unique=[...new Map(all.filter(x=>x&&typeof x==='object').map((x,i)=>[x.id||'legacy_'+i,x])).values()],index=new Map(unique.filter(x=>x.id).map(x=>[x.id,x]));const children=new Map();for(const e of unique)if(e.parent){const list=children.get(e.parent)||[];list.push(e);children.set(e.parent,list);}const name=x=>x.person||(/미겔/.test(x.title||'')?'미겔':/알렉/.test(x.title||'')?'알렉':/다니엘/.test(x.title||'')?'다니엘':'황궁 NPC');function detail(x){const chain=[],visited=new Set();let cur=x;while(cur&&!visited.has(cur.id)&&chain.length<50){chain.unshift(cur);visited.add(cur.id);cur=index.get(cur.parent);}const box=document.createElement('div');const h=document.createElement('p');h.textContent='선행 선택 경로 ('+chain.length+'단계)';box.append(h);for(const e of chain){const b=document.createElement('button');b.textContent='DAY '+(e.day||'?')+' · '+(e.title||'기록');b.onclick=()=>detail(e);box.append(b);const p=document.createElement('p');p.textContent=e.text||'';box.append(p);}const descendants=children.get(x.id)||[];const sub=document.createElement('p');sub.textContent='이 사건에서 이어진 직접 후속 '+descendants.length+'건';box.append(sub);for(const e of descendants){const b=document.createElement('button');b.textContent='↳ DAY '+(e.day||'?')+' · '+(e.title||'기록');b.onclick=()=>detail(e);box.append(b);}modal('v45 · 선택 경로',box);}function update(){result.replaceChildren();const q=search.value.trim().toLowerCase();const list=unique.filter(x=>(person.value==='전체'||name(x)===person.value)&&(kind.value==='전체'||x.category===kind.value)&&(!q||[x.title,x.text,name(x),x.category].some(t=>String(t||'').toLowerCase().includes(q))));list.sort((a,b)=>order.value==='title'?String(a.title||'').localeCompare(String(b.title||''),'ko'):order.value==='old'?(a.day||0)-(b.day||0):(b.day||0)-(a.day||0));const c=document.createElement('p');c.className='hint';c.textContent=list.length+'건 / 전체 '+unique.length+'건';result.append(c);for(const x of list.slice(0,180)){const b=document.createElement('button');b.textContent='DAY '+(x.day||'?')+' · '+(x.title||'기록')+' ['+(x.category||'기타')+']';b.onclick=()=>detail(x);result.append(b);}}search.oninput=update;person.onchange=kind.onchange=order.onchange=update;update();modal('v45 · 통합 회상 연대기',wrap);}
function v45Audit(){const wrap=document.createElement('div'),p=document.createElement('p'),pre=document.createElement('pre'),b=document.createElement('button');p.textContent='읽기 전용 진단입니다. 복구하거나 덮어쓰지 않습니다.';b.textContent='저장본·백업 상세 점검';b.onclick=()=>{const lines=[];for(const key of [SAVE_KEY,V41_BACKUP_KEY]){try{const raw=localStorage.getItem(key);if(!raw){lines.push(key+': 없음');continue;}const o=JSON.parse(raw);const faults=[];if(!o||typeof o!=='object'||Array.isArray(o))faults.push('객체 아님');if(!v41ValidSave(raw))faults.push('기본 구조 불일치');for(let n=40;n<=45;n++){const d=o?.['v'+n];if(d&&((d.arcs!==undefined&&!Array.isArray(d.arcs))||(d.events!==undefined&&!Array.isArray(d.events))))faults.push('v'+n+' 사건 배열 확인 필요');if(d?.arcs&&Array.isArray(d.arcs)&&d.arcs.some(a=>!a||typeof a.stage!=='number'||!Number.isFinite(a.due)))faults.push('v'+n+' 후속 단계 확인 필요');}lines.push(key+': '+(faults.length?faults.join(', '):'기본 구조 정상')+' · '+raw.length+'자');}catch(e){lines.push(key+': 읽기 실패 ('+e.message+')');}}pre.textContent=lines.join('\n');};wrap.append(p,b,pre);modal('v45 · 저장·백업 검증',wrap);}
function v45Board(){const d=v45Data();modal('v45 · 관계의 여운','미겔 선택 '+(d.echo.miguel||0)+'건\n알렉 선택 '+(d.echo.alex||0)+'건\nNPC 소문 선택 '+(d.echo.npc||0)+'건\n진행 중 후일담 '+d.arcs.filter(a=>a.stage<4).length+'건\n완료 후일담 '+d.arcs.filter(a=>a.stage===4).length+'건');}


// v46: independent cross-character threads; additive state, no save migration.
function v46Data(){const d=state.v46??(state.v46={seen:{},arcs:[],events:[],rumors:{},cross:0});if(!d.seen||typeof d.seen!=='object'||Array.isArray(d.seen))d.seen={};if(!Array.isArray(d.arcs))d.arcs=[];if(!Array.isArray(d.events))d.events=[];if(!d.rumors||typeof d.rumors!=='object'||Array.isArray(d.rumors))d.rumors={};return d;}
function v46Record(id,title,body,person,category,parent){const d=v46Data(),key='v46_'+id;if(d.events.some(e=>e&&e.id===key))return key;const e={id:key,day:state.day,title,text:body,person,category,parent:parent||null};d.events.push(e);v18Remember(key,title,body,category);const m=v16Data().memories.find(x=>x.id===key);if(m){m.person=person;m.parent=e.parent;m.day=state.day;}return key;}
function v46Choice(c){let kind,mode,loc,person;if(c.v46Miguel){kind='miguel';mode=c.v46Miguel;person='미겔';}else if(c.v46Alex){kind='alex';mode=c.v46Alex;person='알렉';}else if(c.v46Npc){kind='npc';mode=c.v46Mode;loc=c.v46Npc;person=V19_NPC_PROFILES[loc]?.name||'황궁 사람';}else return;const d=v46Data(),parent=v46Record('decision_'+state.day+'_'+d.arcs.length,person+' · 엇갈린 선택',kind==='miguel'?(mode==='respect'?'다니엘은 미겔이 정한 경계를 존중하고 자신의 감정을 다스리기로 했다.':'다니엘은 답을 재촉하지 않겠다고 말하며 마음을 숨기지 않았다.'):kind==='alex'?(mode==='listen'?'다니엘은 형의 입장을 끝까지 듣기로 했다.':'다니엘은 오래 남은 의심을 직접 물었다.'):(mode==='verify'?'다니엘은 소문의 출처를 확인했다.':'다니엘은 당사자 없는 자리에서 추측을 전하지 않았다.'),person,'선택');d.arcs.push({id:'v46_arc_'+state.day+'_'+d.arcs.length,kind,mode,loc,stage:0,due:state.day+2,parent});if(kind==='miguel'){const m=v34Data().miguel;if(mode==='respect')m.restraint=(m.restraint||0)+1;else m.warmth=(m.warmth||0)+1;}else if(kind==='alex'){const a=v34Data().alex;if(mode==='listen')a.trust=(a.trust||0)+1;else a.doubt=(a.doubt||0)+1;}else{for(const place of Object.keys(V19_NPC_PROFILES)){d.rumors[place]=(d.rumors[place]||0)+(place===loc?2:1);}const n=v19Data().npc?.[loc];if(n)n.rapport=Math.min(10,Math.max(0,(n.rapport||0)+1));}}
function v46Follow(kind,loc){const d=v46Data(),a=d.arcs.find(x=>x&&x.kind===kind&&x.stage<3&&x.due<=state.day&&(kind!=='npc'||x.loc===loc));if(!a)return false;a.stage++;a.due=state.day+2;let person,body;if(kind==='miguel'){person='미겔';body=[null,'미겔은 발걸음 소리로 다니엘을 알아보았다. “레온하르트 경. 지난번 말씀은 기억하고 있습니다.”',a.mode==='respect'?'“제게 선택할 시간을 남겨 주신 점은 감사드립니다.” 미겔은 서류를 정돈했다.':'“마음을 가볍게 여기지 않습니다. 그렇다고 제 약혼과 책임이 사라지는 것은 아닙니다.”','서로에게 허락되지 않은 약속을 만들지 않은 채, 두 사람은 다시 마주할 수 있는 거리를 배웠다.'][a.stage];}else if(kind==='alex'){person='알렉';body=[null,'알렉은 다니엘을 조용한 회랑으로 불렀다. “네 생각을 들려다오.”',a.mode==='listen'?'형의 말을 끝까지 들은 다니엘은 처음으로 서로의 두려움이 다르다는 것을 알았다.':'다니엘은 대답이 모호한 부분을 다시 물었다. 형제의 말투는 여전히 조심스러웠다.',a.mode==='listen'?'화해는 서둘러 완성되지 않았지만, 형제는 다음 만남을 피하지 않기로 했다.':'남은 의심을 인정한 두 사람은 적어도 거짓된 화해를 약속하지 않았다.'][a.stage];}else{person=V19_NPC_PROFILES[loc]?.name||'황궁 사람';body=[null,'한 궁인의 이야기가 회랑과 정원을 거쳐 다시 돌아왔다. 처음의 말과는 어딘가 달랐다.',a.mode==='verify'?'다니엘이 출처를 따져 묻자 궁인들은 확인하지 못한 대목을 지웠다.':'다니엘이 전언을 멈추자 주변의 몇 사람도 입을 다물었다.','소문은 남았지만, 누군가는 다니엘이 말을 다루는 방식을 기억했다.'][a.stage];}const id=v46Record('follow_'+a.id+'_'+a.stage,person+' · '+(a.stage===3?'서로 다른 결말':'교차 후일담 '+a.stage),body,person,a.stage===3?'결말':'후속',a.parent);a.parent=id;return v18Scene('v46_follow',person,body,[{text:'이날의 기억을 간직한다.',next:'explore'}]);}
function v46Miguel(loc){if(v46Follow('miguel',loc))return true;const d=v46Data(),source=v45Data().arcs.find(a=>a&&a.kind==='miguel'&&a.stage===4&&!d.seen['m_'+a.id]);if(!source)return false;d.seen['m_'+source.id]=true;const m=v34Data().miguel,a=v34Data().alex;const contrast=(a.trust||0)>=(a.doubt||0)?'형과의 대화를 마친 뒤에도 다니엘은 미겔에게 쉽게 다가가지 못했다.':'형에게 남긴 의문이 미겔 앞에서도 마음을 무겁게 했다.';return v18Scene('v46_miguel','미겔',contrast+'\n\n'+((m.restraint||0)>=(m.warmth||0)?'“경의 신중함은 알고 있습니다.”':'“마음을 숨기지 않으셨다는 것도 알고 있습니다.”')+' 미겔은 짧게 답했다.',[{text:'그녀의 선택을 존중하며 거리를 지킨다.',v46Miguel:'respect',next:'explore'},{text:'대답을 바라지 않고 진심을 전한다.',v46Miguel:'honest',next:'explore'}]);}
function v46Alex(loc){if(v46Follow('alex',loc))return true;const d=v46Data(),source=v45Data().arcs.find(a=>a&&a.kind==='alex'&&a.stage===4&&!d.seen['a_'+a.id]);if(!source)return false;d.seen['a_'+source.id]=true;const m=v34Data().miguel,a=v34Data().alex;return v18Scene('v46_alex','알렉',((m.warmth||0)>(m.restraint||0)?'미겔과 마주한 이후 다니엘은 형에게 말을 고르는 일이 더 어려워졌다.':'미겔의 뜻을 존중하려던 다니엘은 형과의 관계도 함부로 단정할 수 없었다.')+'\n\n'+((a.trust||0)>=(a.doubt||0)?'“이번에는 네 이야기를 먼저 듣겠다.”':'“우리가 서로를 믿을 수 있는지부터 이야기해야겠구나.”'),[{text:'형의 말을 끝까지 듣고 대화한다.',v46Alex:'listen',next:'explore'},{text:'남은 의심을 숨기지 않고 묻는다.',v46Alex:'question',next:'explore'}]);}
function v46Npc(loc){if(v46Follow('npc',loc))return true;const d=v46Data(),source=v45Data().arcs.find(a=>a&&a.kind==='npc'&&a.stage===4&&!d.seen['n_'+a.id]);if(!source)return false;d.seen['n_'+source.id]=true;const p=V19_NPC_PROFILES[loc];if(!p)return false;const spread=Object.values(d.rumors).reduce((n,x)=>n+(Number(x)||0),0)+(v45Data().network[loc]||0);return v18Scene('v46_npc',p.name,spread>1?'“다른 회랑에서도 경께서 소문을 조심스럽게 다루셨다고 들었습니다.”':'“한 곳에서 시작된 말이 벌써 여러 곳에 닿았답니다.”',[{text:'이야기의 출처부터 확인한다.',v46Npc:loc,v46Mode:'verify',next:'explore'},{text:'확인되지 않은 말을 전하지 않는다.',v46Npc:loc,v46Mode:'protect',next:'explore'}]);}
function v46Daily(){const d=v46Data(),key='day_'+state.day;if(d.seen[key])return;d.seen[key]=true;const a=d.arcs.find(x=>x&&x.stage<3&&x.due<=state.day);if(a)v46Record('day_'+state.day,'DAY '+state.day+' · 엇갈린 기억','아직 마무리하지 못한 대화가 다니엘의 마음에 남아 있었다.','다니엘','일지',a.parent);}
function v46Chronicle(){const wrap=document.createElement('div');const info=document.createElement('p');info.className='hint';info.textContent='원인·후속 분기를 탐색합니다. 기록을 선택하면 상위 선택과 모든 직계 후속 갈래를 볼 수 있습니다.';wrap.append(info);const search=document.createElement('input');search.placeholder='제목·내용·인물 검색';wrap.append(search);const result=document.createElement('div');wrap.append(result);const raw=[...(v16Data().memories||[])];for(let i=27;i<=46;i++){const a=state['v'+i]?.events;if(Array.isArray(a))raw.push(...a);}const map=new Map();for(const e of raw)if(e&&typeof e==='object'&&e.id){const old=map.get(e.id);map.set(e.id,{...(old||{}),...e});}const all=[...map.values()],byId=new Map(all.map(e=>[e.id,e])),children=new Map();for(const e of all)if(e.parent){const a=children.get(e.parent)||[];a.push(e);children.set(e.parent,a);}function detail(x){const root=document.createElement('div'),chain=[],seen=new Set();let cur=x;while(cur&&cur.id&&!seen.has(cur.id)&&chain.length<100){chain.unshift(cur);seen.add(cur.id);cur=byId.get(cur.parent);}const heading=document.createElement('p');heading.textContent='선행 경로 '+chain.length+'단계';root.append(heading);for(const e of chain){const b=document.createElement('button');b.textContent='DAY '+(e.day??'?')+' · '+(e.title||'기록');b.onclick=()=>detail(e);root.append(b);const p=document.createElement('p');p.textContent=e.text||'';root.append(p);}const branches=document.createElement('p');branches.textContent='이 선택에서 갈라진 직접 후속 '+(children.get(x.id)||[]).length+'건';root.append(branches);function draw(e,depth,visited){if(depth>12||visited.has(e.id))return;const next=new Set(visited);next.add(e.id);const b=document.createElement('button');b.textContent='　'.repeat(depth)+'↳ '+(e.title||'기록')+' (DAY '+(e.day??'?')+')';b.onclick=()=>detail(e);root.append(b);for(const c of children.get(e.id)||[])draw(c,depth+1,next);}for(const c of children.get(x.id)||[])draw(c,1,new Set([x.id]));modal('v46 · 다중 선택 경로',root);}function update(){result.replaceChildren();const q=search.value.toLowerCase().trim();const list=all.filter(e=>!q||[e.title,e.text,e.person,e.category].some(v=>String(v||'').toLowerCase().includes(q))).sort((a,b)=>(b.day||0)-(a.day||0));const count=document.createElement('p');count.textContent=list.length+'건 / 전체 '+all.length+'건';result.append(count);for(const e of list.slice(0,200)){const b=document.createElement('button');b.textContent='DAY '+(e.day??'?')+' · '+(e.title||'기록');b.onclick=()=>detail(e);result.append(b);}}search.oninput=update;update();modal('v46 · 통합 연대기',wrap);}
function v46Audit(){const wrap=document.createElement('div'),intro=document.createElement('p'),output=document.createElement('pre'),btn=document.createElement('button');intro.textContent='읽기 전용 검사입니다. 현재 저장본과 백업은 변경하지 않습니다.';btn.textContent='저장·백업 무결성 검사';btn.onclick=()=>{const lines=[];for(const key of [SAVE_KEY,V41_BACKUP_KEY]){try{const raw=localStorage.getItem(key);if(!raw){lines.push(key+': 없음');continue;}const o=JSON.parse(raw),issues=[];if(!v41ValidSave(raw))issues.push('기본 저장 구조 오류');for(let i=40;i<=46;i++){const d=o?.['v'+i];if(!d)continue;if(d.arcs!==undefined&&!Array.isArray(d.arcs))issues.push('v'+i+' arcs 오류');if(d.events!==undefined&&!Array.isArray(d.events))issues.push('v'+i+' events 오류');if(Array.isArray(d.arcs)&&d.arcs.some(a=>!a||!Number.isFinite(a.stage)||!Number.isFinite(a.due)))issues.push('v'+i+' 진행 단계 오류');}lines.push(key+': '+(issues.length?issues.join(', '):'검사 통과')+' ('+raw.length+'자)');}catch(e){lines.push(key+': 읽기 실패 '+e.message);}}output.textContent=lines.join('\n');};wrap.append(intro,btn,output);modal('v46 · 저장 검증',wrap);}
function v46Board(){const d=v46Data();modal('v46 · 교차 서사 현황','미겔 후일담 '+d.arcs.filter(x=>x.kind==='miguel').length+'건\n알렉 후일담 '+d.arcs.filter(x=>x.kind==='alex').length+'건\n소문 후일담 '+d.arcs.filter(x=>x.kind==='npc').length+'건\n완료 '+d.arcs.filter(x=>x.stage===3).length+'건');}


// v47: post-conclusion cross-character encounters, branching records and safe backup review.
function v47Data(){const d=state.v47??(state.v47={seen:{},arcs:[],events:[],network:{},decisions:0});if(!d.seen||typeof d.seen!=='object'||Array.isArray(d.seen))d.seen={};if(!Array.isArray(d.arcs))d.arcs=[];if(!Array.isArray(d.events))d.events=[];if(!d.network||typeof d.network!=='object'||Array.isArray(d.network))d.network={};return d;}
function v47Record(id,title,body,person,category,parent){const d=v47Data(),key='v47_'+id;if(d.events.some(x=>x&&x.id===key))return key;const e={id:key,day:state.day,title,text:body,person,category,parent:parent||null};d.events.push(e);v18Remember(key,title,body,category);const m=v16Data().memories.find(x=>x.id===key);if(m){m.person=person;m.parent=e.parent;m.day=state.day;}return key;}
function v47Choice(c){let kind,mode,loc,person;if(c.v47Miguel){kind='miguel';mode=c.v47Miguel;person='미겔';}else if(c.v47Alex){kind='alex';mode=c.v47Alex;person='알렉';}else if(c.v47Npc){kind='npc';mode=c.v47Mode;loc=c.v47Npc;person=V19_NPC_PROFILES[loc]?.name||'황궁 사람';}else return;const d=v47Data();const text=kind==='miguel'?(mode==='distance'?'다니엘은 미겔의 약혼과 결정을 존중하고 거리를 지켰다.':'다니엘은 답을 요구하지 않고 감정을 정리할 시간을 청했다.'):kind==='alex'?(mode==='reconcile'?'다니엘은 형에게 자신의 잘못을 인정하며 먼저 손을 내밀었다.':'다니엘은 의심을 감추지 않되 형의 설명을 끝까지 듣기로 했다.'):(mode==='source'?'다니엘은 소문의 발원지를 묻고 사실만 기록했다.':'다니엘은 당사자 없는 추측이 퍼지지 않도록 말을 멈췄다.');const parent=v47Record('choice_'+state.day+'_'+d.decisions++,person+' · 선택의 파문',text,person,'선택',c.v47Parent||null);const id='v47_arc_'+state.day+'_'+d.arcs.length;d.arcs.push({id,kind,mode,loc,stage:0,due:state.day+2,parent});if(kind==='miguel'){const m=v34Data().miguel;if(mode==='distance')m.restraint=(m.restraint||0)+1;else m.warmth=(m.warmth||0)+1;}else if(kind==='alex'){const a=v34Data().alex;if(mode==='reconcile')a.trust=(a.trust||0)+2;else a.doubt=(a.doubt||0)+1;}else{for(const place of Object.keys(V19_NPC_PROFILES)){const weight=place===loc?2:1;d.network[place]=(d.network[place]||0)+(mode==='source'?-weight:weight);}}}
function v47Follow(kind,loc){const d=v47Data(),a=d.arcs.find(x=>x&&x.kind===kind&&x.stage<4&&x.due<=state.day&&(kind!=='npc'||x.loc===loc));if(!a)return false;a.stage++;a.due=state.day+2;let person,body;if(kind==='miguel'){person='미겔';body=[null,'미겔은 다니엘의 발소리를 듣고 문서를 덮었다. “레온하르트 경. 지난번 일은 기억하고 있습니다.”',a.mode==='distance'?'“저의 사정을 이해하셨다는 말씀, 감사드립니다.” 미겔은 단정히 고개를 끄덕였다.':'“솔직한 마음을 들었다고 해서 제가 지켜야 할 약속이 달라지지는 않습니다.”', '두 사람은 무도회의 불빛 아래에서 서로의 침묵을 함부로 해석하지 않기로 했다.','다니엘은 대답 대신 예를 갖추었다. 미겔은 잠시 그를 바라본 뒤 자신의 길로 돌아갔다.'][a.stage];}else if(kind==='alex'){person='알렉';body=[null,'알렉은 동생을 조용한 회랑으로 불렀다. “다니엘. 끝내지 못한 이야기가 있지.”',a.mode==='reconcile'?'“네가 먼저 손을 내밀 줄은 몰랐다.” 형은 잠시 시선을 내렸다.':'“의심하는 이유를 묻겠다. 서로의 말을 끝까지 듣자.”','서로의 상처가 하루아침에 지워지지는 않았으나, 형제는 대화를 피하지 않았다.','알렉은 마지막으로 동생의 어깨에 손을 얹었다. 앞으로의 신뢰는 말보다 행동으로 쌓아야 했다.'][a.stage];}else{person=V19_NPC_PROFILES[a.loc]?.name||'황궁 사람';body=[null,'회랑 끝에서 같은 소문이 다른 목소리로 되돌아왔다.',a.mode==='source'?'출처를 확인하자 확인되지 않은 이야기의 일부가 잦아들었다.':'추측을 전하지 않자 그 자리의 대화가 조용히 끝났다.','정원과 응접실의 사람들은 다니엘의 태도를 각기 다르게 받아들였다.','소문이 완전히 사라지지는 않았으나, 누군가는 사실을 먼저 묻기 시작했다.'][a.stage];}const id=v47Record('follow_'+a.id+'_'+a.stage,person+' · '+(a.stage===4?'새로운 후일담':'이어진 파문 '+a.stage),body,person,a.stage===4?'결말':'후속',a.stage===1?a.parent:'v47_follow_'+a.id+'_'+(a.stage-1));if(a.stage===4){v47Record('echo_'+a.id,'DAY '+state.day+' · 남겨진 선택','이날의 일은 다니엘이 훗날 떠올릴 하나의 기억이 되었다.','다니엘','회상',id);}return v18Scene('v47_follow_'+kind,person,body,[{text:'이 장면을 마음에 새긴다.',next:'explore'}]);}
function v47Miguel(loc){if(v47Follow('miguel',loc))return true;const d=v47Data(),source=v46Data().arcs.find(x=>x&&x.kind==='miguel'&&x.stage>=3&&!d.seen['m_'+x.id]);if(!source)return false;d.seen['m_'+source.id]=true;const m=v34Data().miguel,a=v34Data().alex;const mood=(m.warmth||0)>(m.restraint||0)?'가까워진 마음만큼 지켜야 할 선도 또렷했다.':'서로를 배려하는 거리가 오히려 낯설게 느껴졌다.';const family=(a.trust||0)>=(a.doubt||0)?'형과 나눈 대화가 다니엘의 말끝을 조심스럽게 했다.':'형과의 미해결된 갈등이 마음을 무겁게 했다.';return v18Scene('v47_miguel','미겔',mood+' '+family+'\n\n미겔이 서류를 거두었다. “레온하르트 경. 용건이 있으십니까?”',[{text:'그녀의 약혼과 결정을 존중하며 물러선다.',v47Miguel:'distance',v47Parent:source.parent,next:'explore'},{text:'대답을 요구하지 않고 감정을 정리할 시간을 청한다.',v47Miguel:'honest',v47Parent:source.parent,next:'explore'}]);}
function v47Alex(loc){if(v47Follow('alex',loc))return true;const d=v47Data(),source=v46Data().arcs.find(x=>x&&x.kind==='alex'&&x.stage>=3&&!d.seen['a_'+x.id]);if(!source)return false;d.seen['a_'+source.id]=true;const a=v34Data().alex;const text=(a.trust||0)>=(a.doubt||0)?'알렉은 동생이 다가오자 잠시 기다렸다. “이번에는 네 말을 먼저 듣겠다.”':'알렉은 굳은 표정으로 말했다. “우리 사이에 아직 확인할 말이 남았구나.”';return v18Scene('v47_alex','알렉',text,[{text:'형에게 먼저 화해의 뜻을 전한다.',v47Alex:'reconcile',v47Parent:source.parent,next:'explore'},{text:'의문을 밝히되 형의 설명도 듣는다.',v47Alex:'question',v47Parent:source.parent,next:'explore'}]);}
function v47Npc(loc){if(v47Follow('npc',loc))return true;const d=v47Data(),source=v46Data().arcs.find(x=>x&&x.kind==='npc'&&x.stage>=3&&!d.seen['n_'+x.id]);if(!source)return false;const p=V19_NPC_PROFILES[loc];if(!p)return false;d.seen['n_'+source.id]=true;const pressure=(v46Data().rumors[loc]||0)+(d.network[loc]||0);const text=pressure>2?'“이곳뿐 아니라 정원에서도 같은 이야기를 들었습니다. 무엇을 믿어야 할지 모르겠군요.”':'“이야기가 퍼지기 전에 사실을 먼저 알아보는 편이 낫겠지요.”';return v18Scene('v47_npc',p.name,text,[{text:'누가 처음 말했는지 확인한다.',v47Npc:loc,v47Mode:'source',v47Parent:source.parent,next:'explore'},{text:'당사자가 없는 추측은 옮기지 않는다.',v47Npc:loc,v47Mode:'silence',v47Parent:source.parent,next:'explore'}]);}
function v47Daily(){const d=v47Data(),key='day_'+state.day;if(d.seen[key])return;d.seen[key]=true;const a=d.arcs.find(x=>x&&x.stage<4&&x.due<=state.day);if(a)v47Record('diary_'+state.day,'DAY '+state.day+' · 다음 만남을 기다리며','끝난 줄 알았던 대화가 아직 마음에 남아 있었다.','다니엘','일지',a.parent);}
function v47Chronicle(){const wrap=document.createElement('div'),intro=document.createElement('p');intro.className='hint';intro.textContent='v16~v47 통합 회상 · 원인과 여러 갈래의 후속 사건을 펼쳐 볼 수 있습니다.';wrap.append(intro);const search=document.createElement('input');search.placeholder='제목·인물·내용 검색';const filter=document.createElement('select');for(const name of ['전체','미겔','알렉','다니엘','황궁 사람']){const o=document.createElement('option');o.value=name;o.textContent=name;filter.append(o);}const results=document.createElement('div');wrap.append(search,filter,results);const raw=[...(v16Data().memories||[])];for(let i=27;i<=47;i++){const e=state['v'+i]?.events;if(Array.isArray(e))raw.push(...e);}const map=new Map();for(const e of raw)if(e&&typeof e==='object'&&typeof e.id==='string')map.set(e.id,{...(map.get(e.id)||{}),...e});const all=[...map.values()],byId=new Map(all.map(x=>[x.id,x])),children=new Map();for(const x of all)if(x.parent){const a=children.get(x.parent)||[];a.push(x);children.set(x.parent,a);}function detail(x){const body=document.createElement('div'),path=[],visited=new Set();let p=x;while(p&&!visited.has(p.id)&&path.length<80){path.unshift(p);visited.add(p.id);p=byId.get(p.parent);}const h=document.createElement('p');h.textContent='선행 선택 '+path.length+'단계 · 연결된 후속 분기';body.append(h);for(const e of path){const b=document.createElement('button');b.textContent='DAY '+(e.day||'?')+' · '+(e.title||'기록');b.onclick=()=>detail(e);body.append(b);const t=document.createElement('p');t.textContent=e.text||'';body.append(t);}function branch(e,depth,seen){if(depth>15||seen.has(e.id))return;const b=document.createElement('button');b.textContent='　'.repeat(depth)+'↳ '+(e.title||'기록');b.onclick=()=>detail(e);body.append(b);const next=new Set(seen);next.add(e.id);for(const c of children.get(e.id)||[])branch(c,depth+1,next);}for(const e of children.get(x.id)||[])branch(e,1,new Set([x.id]));modal('v47 · 선택 분기 탐색',body);}function update(){results.replaceChildren();const q=search.value.toLowerCase().trim(),who=filter.value;const list=all.filter(x=>(who==='전체'||(who==='황궁 사람'?x.person&&!['미겔','알렉','다니엘'].includes(x.person):x.person===who))&&(!q||[x.title,x.text,x.person,x.category].some(y=>String(y||'').toLowerCase().includes(q)))).sort((a,b)=>(b.day||0)-(a.day||0));const c=document.createElement('p');c.textContent=list.length+'건 / 전체 '+all.length+'건';results.append(c);for(const e of list.slice(0,250)){const b=document.createElement('button');b.textContent='DAY '+(e.day||'?')+' · '+(e.title||'기록');b.onclick=()=>detail(e);results.append(b);}}search.oninput=update;filter.onchange=update;update();modal('v47 · 통합 다중 분기 연대기',wrap);}
function v47Audit(){const wrap=document.createElement('div'),p=document.createElement('p'),out=document.createElement('pre'),btn=document.createElement('button');p.textContent='현재 저장본과 v41 백업을 읽기 전용으로 검사합니다. 검사 중 저장 데이터를 변경하지 않습니다.';btn.textContent='저장·백업 정밀 검사';btn.onclick=()=>{const lines=[];for(const key of [SAVE_KEY,V41_BACKUP_KEY]){const raw=localStorage.getItem(key);if(!raw){lines.push(key+': 없음');continue;}try{const obj=JSON.parse(raw),issues=[];if(!v41ValidSave(raw))issues.push('기본 구조 오류');for(let i=40;i<=47;i++){const d=obj['v'+i];if(!d)continue;if(d.arcs!==undefined&&!Array.isArray(d.arcs))issues.push('v'+i+' 사건 배열 오류');if(d.events!==undefined&&!Array.isArray(d.events))issues.push('v'+i+' 회상 배열 오류');if(Array.isArray(d.arcs))for(const a of d.arcs){if(!a||!Number.isInteger(a.stage)||a.stage<0||a.stage>(i>=47?4:6)||!Number.isFinite(a.due))issues.push('v'+i+' 후일담 단계 오류');}}const ids=new Set();for(const e of obj.v47?.events||[]){if(!e||typeof e.id!=='string')issues.push('v47 기록 ID 오류');else if(ids.has(e.id))issues.push('v47 중복 기록');else ids.add(e.id);}lines.push(key+': '+(issues.length?issues.join(', '):'구조 정상')+' ('+raw.length+'자)');}catch(e){lines.push(key+': JSON 파싱 실패');}}out.textContent=lines.join('\n');};wrap.append(p,btn,out);modal('v47 · 저장 및 백업 검사',wrap);}
function v47Board(){const d=v47Data();modal('v47 · 관계의 파문','미겔 '+d.arcs.filter(a=>a.kind==='miguel').length+'건\n알렉 '+d.arcs.filter(a=>a.kind==='alex').length+'건\n황궁 '+d.arcs.filter(a=>a.kind==='npc').length+'건\n완료 '+d.arcs.filter(a=>a.stage===4).length+'건');}


// v48: 정식 엔딩과 회차 독립 엔딩 도감. 기존 저장 구조를 변경하지 않는다.
const V48_ENDINGS=[
 {id:'miguel_respect',name:'노란 장미의 약속',group:'미겔',desc:'미겔의 결정을 존중하고 마음을 지키는 결말',need:'미겔과의 재회 및 절제',text:'다니엘은 노란 장미 앞에서 오래 머물지 않았다. 미겔은 서류를 접으며 조용히 고개를 끄덕였다. “다니엘, 네가 지켜 준 거리를 나도 가볍게 여기지는 않을 거야.”\n\n그것은 연인의 약속이 아니었다. 하지만 그가 지킨 예의는 보랏빛 밤의 끝까지 남았다.'},
 {id:'miguel_confession',name:'대답 없는 고백',group:'미겔',desc:'답을 강요하지 않고 진심을 전하는 열린 결말',need:'미겔과의 깊은 감정',text:'“……대답하지 않으셔도 됩니다.” 다니엘의 목소리는 떨렸다. 미겔은 한참 뒤 짧게 말했다. “네 마음을 가벼이 여기지는 않아. 하지만 내가 지켜야 할 약속도 있다는 걸 이해해 주겠니?”\n\n두 사람은 서로의 마음을 알게 되었지만, 그날 밤 어떤 관계도 새로 맺지 않았다.'},
 {id:'miguel_separation',name:'장미가 지는 계절',group:'미겔',desc:'미겔을 향한 마음을 정리하고 떠나는 결말',need:'미겔과의 만남과 거리 두기',text:'다니엘은 미겔을 찾아가지 않았다. 대신 전하지 못한 인사를 편지에 적어 봉했다.\n\n보랏빛 밤이 지나고, 그 편지는 끝내 보내지지 않았다. 마음을 접는 일 또한 자신의 선택이었다.'},
 {id:'alex_reconcile',name:'형제의 새벽',group:'알렉',desc:'알렉과 오해를 풀고 관계를 회복하는 결말',need:'알렉과의 신뢰',text:'알렉은 오래 침묵하다 동생에게 자리를 내주었다. “앉아라, 다니엘.”\n\n말끔한 화해는 아니었다. 그러나 다니엘은 처음으로 자신의 말을 끝까지 전했고, 형은 그 말을 끝까지 들었다.'},
 {id:'alex_fracture',name:'닫힌 문 너머',group:'알렉',desc:'형제의 갈등을 해결하지 못한 결말',need:'알렉과의 깊은 의심',text:'“형님, 저는……” 다니엘은 말을 끝맺지 못했다. 알렉은 대답 없이 문을 닫았다.\n\n같은 성을 가진 두 사람 사이에 남은 것은 아직 풀리지 않은 질문이었다.'},
 {id:'court_guardian',name:'황궁의 작은 등불',group:'황궁',desc:'소문을 바로잡고 사람들을 보호하는 결말',need:'평판과 황궁 인연',text:'다니엘은 이름 모를 시종의 증언을 기록하고 거짓 소문을 멈추게 했다. 누군가는 그의 이름을 기억했다.\n\n커다란 훈장도 칭송도 없었지만, 그가 지킨 작은 신뢰가 황궁의 밤을 밝혔다.'},
 {id:'secret',name:'달빛 아래의 비밀',group:'미겔',desc:'드러내지 않은 마음을 간직하는 열린 결말',need:'깊은 감정과 조심스러운 절제',text:'다니엘과 미겔은 사람들 앞에서 언제나 예의를 지켰다. 두 사람만 아는 말 한마디가 남았지만, 그 말이 연애를 뜻하지는 않았다.\n\n알렉과 미겔의 약혼은 계속되었다. 비밀은 누군가를 속이기 위한 약속이 아니라, 아직 이름 붙이지 못한 감정이었다.'},
 {id:'independent',name:'나만의 보랏빛 밤',group:'독립',desc:'누구의 사랑도 택하지 않고 스스로의 길을 걷는 결말',need:'7일차 이후',text:'세 개의 달이 서서히 자취를 감췄다. 다니엘은 누구의 대답도 기다리지 않고 황궁을 떠났다.\n\n그에게도 스스로 정할 내일이 있었다. 보랏빛 밤은 끝났지만, 그의 이야기는 끝나지 않았다.'}
];
const V48_GALLERY_KEY='delharsha_purple_night_ending_gallery_v1';
function v48Data(){const d=state.v48??(state.v48={endings:[],last:null});if(!Array.isArray(d.endings))d.endings=[];return d;}
function v48GalleryRead(){try{const v=JSON.parse(localStorage.getItem(V48_GALLERY_KEY)||'[]');return Array.isArray(v)?v.filter(x=>x&&typeof x.id==='string'&&V48_ENDINGS.some(e=>e.id===x.id)).slice(0,100):[];}catch{return [];}}
function v48GalleryWrite(id){try{const old=v48GalleryRead();if(!old.some(x=>x.id===id))old.push({id,day:state.day,at:new Date().toISOString()});localStorage.setItem(V48_GALLERY_KEY,JSON.stringify(old));return true;}catch{return false;}}
function v48UnlockLegacy(e){const m=v34Data().miguel,a=v34Data().alex,d=v47Data(),arcs=Array.isArray(d.arcs)?d.arcs:[],completed=k=>arcs.some(x=>x&&x.kind===k&&x.stage>=4),met=(state.social?.miguelMeetings||0)>=2;const warmth=Number(m.warmth)||0,restraint=Number(m.restraint)||0,trust=Number(a.trust)||0,doubt=Number(a.doubt)||0;const day=Number(state.day)||1;if(day<7)return false;switch(e.id){case 'miguel_respect':return met&&(restraint>=warmth||completed('miguel'));case 'miguel_confession':return met&&warmth>=2&&(warmth>restraint||completed('miguel'));case 'miguel_separation':return met&&restraint>=1;case 'alex_reconcile':return trust>=doubt&&((state.social?.alexTension||0)>0||completed('alex'));case 'alex_fracture':return doubt>trust&&((state.social?.alexTension||0)>0||completed('alex'));case 'court_guardian':return (state.stats?.reputation||0)>=55&&(completed('npc')||(state.v47?.decisions||0)>=2);case 'secret':return met&&warmth>=2&&restraint>=2;case 'independent':return true;default:return false;}}
// v49: one ending per run; completion persists in the existing save, gallery stays separate.
const V49_EPILOGUES={
 miguel_respect:'다니엘은 노란 장미 한 송이를 화병에 꽂아 두었다. 대답을 받지 못한 마음보다 먼저 지켜야 할 것은 상대의 의사였다.\n\n미겔은 다음 날에도 자신의 일을 계속했다. 두 사람의 거리는 멀어졌지만, 그 사이에는 존중이라는 이름의 길이 남았다.',
 miguel_confession:'“죄송합니다. 부담을 드릴 생각은 없었습니다.”\n\n미겔은 다니엘의 말이 끝나기를 기다렸다. “알겠습니다. 다만 저의 약속은 그대로입니다.”\n\n다니엘은 고개를 숙였다. 대답을 요구하지 않는 고백은 그날로 끝났지만, 자신의 마음을 정직하게 마주한 기억은 남았다.',
 miguel_separation:'다니엘은 편지를 끝내 부치지 않았다. 봄이 오면 장미가 다시 피겠지만, 모든 꽃을 기다릴 필요는 없었다.\n\n그는 자신이 걸어야 할 길을 스스로 정하기로 했다.',
 alex_reconcile:'“형님, 이번에는 끝까지 말씀드리고 싶습니다.”\n\n알렉은 잠시 고개를 돌렸으나 자리를 떠나지 않았다. 형제가 서로의 말을 듣는 데에는 긴 시간이 필요했다. 그럼에도 새벽이 밝을 때 두 사람은 같은 문으로 나왔다.',
 alex_fracture:'닫힌 문 앞에서 다니엘은 한참을 기다렸다. 형을 미워하는 마음과 인정받고 싶은 마음은 쉽게 나뉘지 않았다.\n\n그는 언젠가 다시 대화할 날을 남겨 두되, 오늘의 침묵을 억지로 화해라 부르지 않았다.',
 court_guardian:'황궁의 소문은 하루아침에 사라지지 않았다. 그러나 한 사람의 증언을 끝까지 듣는 이들이 늘었다.\n\n다니엘은 작은 일을 끝까지 책임지는 사람이 되기로 했다.',
 secret:'세 개의 달 아래에서 다니엘은 아무 말도 덧붙이지 않았다. 미겔 역시 자신의 약속을 바꾸지 않았다.\n\n둘 사이에 남은 것은 연애의 맹세가 아니라, 서로의 선택을 넘어서지 않기로 한 침묵이었다.',
 independent:'황궁의 문이 열리자 이른 바람이 불어왔다. 다니엘은 누군가의 동생이자 누군가를 사랑했던 사람인 동시에, 자기 삶의 주인이기도 했다.\n\n그는 뒤돌아보지 않고 첫걸음을 내디뎠다.'
};
const V49_META_KEY='delharsha_purple_night_run_meta_v1';
function v49Meta(){try{const d=JSON.parse(localStorage.getItem(V49_META_KEY)||'{}');return d&&typeof d==='object'&&!Array.isArray(d)?{runs:Math.max(1,Math.min(9999,Number(d.runs)||1)),legacy:Number(d.legacy)||0}: {runs:1,legacy:0};}catch{return {runs:1,legacy:0};}}
function v49SetMeta(m){try{localStorage.setItem(V49_META_KEY,JSON.stringify(m));return true;}catch{return false;}}
function v49Data(){const d=state.v49&&typeof state.v49==='object'&&!Array.isArray(state.v49)?state.v49:(state.v49={});if(d.finished&&!V48_ENDINGS.some(e=>e.id===d.finished))d.finished=null;return d;}
function v49Finished(){return !!v49Data().finished;}
function v49Hint(e){const tips={miguel_respect:'미겔과 두 번 이상 만나고, 절제와 배려를 쌓으세요.',miguel_confession:'미겔과 두 번 이상 만나고, 진솔한 감정을 쌓으세요.',miguel_separation:'미겔과 만난 뒤 거리를 두는 선택을 해보세요.',alex_reconcile:'알렉과의 신뢰가 의심보다 낮지 않도록 대화하세요.',alex_fracture:'알렉과의 갈등이 신뢰보다 깊어지는 경로입니다.',court_guardian:'황궁 평판 55 이상, NPC와의 관계 사건을 진행하세요.',secret:'미겔을 향한 감정과 절제를 모두 충분히 쌓으세요.',independent:'7일차 이후 누구의 선택에도 매이지 않는 길입니다.'};return tips[e.id]||e.need;}
function v48Finish(id){const e=V48_ENDINGS.find(x=>x.id===id);if(!e||v49Finished()||!v48Unlock(e))return;const d=v48Data(),v=v49Data();if(!d.endings.includes(id))d.endings.push(id);d.last=id;v.finished=id;v.day=state.day;v.epilogue=V49_EPILOGUES[id];v.completedAt=new Date().toISOString();v.v50Scene=V50_SCENES[id];const rec='v50_ending_'+id+'_run_'+v49Meta().runs;v18Remember(rec,'정식 엔딩 · '+e.name,v50EndingText(id),'엔딩');const memory=v16Data().memories.find(x=>x.id===rec);if(memory){memory.person=e.group;memory.day=state.day;}const saved=v48GalleryWrite(id),detail=v50StoreDetail(id);try{localStorage.setItem(SAVE_KEY,JSON.stringify(state));}catch{modal('저장 오류','현재 회차를 저장하지 못했습니다. 저장 공간을 확인하세요.');return;}v49FinalScreen();if(!saved||!detail)modal('도감 저장 안내','현재 회차는 종료되었지만 별도 도감 또는 상세 기록을 저장하지 못했습니다.');}
function v49FinalScreen(){const d=v49Data(),e=V48_ENDINGS.find(x=>x.id===d.finished);if(!e)return;const wrap=document.createElement('div'),p=document.createElement('p');p.style.whiteSpace='pre-wrap';p.textContent=v50EndingText(e.id);wrap.append(p);const note=document.createElement('p');note.className='hint';note.textContent='DAY '+(d.day||state.day)+' · '+v49Meta().runs+'회차 종료';wrap.append(note);for(const [label,action] of [['엔딩 도감 보기',v48Gallery],['다음 회차 준비',v48NewGameConfirm]]){const b=document.createElement('button');b.textContent=label;b.onclick=action;wrap.append(b);}modal('✦ ENDING · '+e.name,wrap);}
function v48EndingMenu(){if(v49Finished()){v49FinalScreen();return;}const wrap=document.createElement('div'),p=document.createElement('p');p.className='hint';p.textContent='한 회차에 한 엔딩만 확정할 수 있습니다. 7일차부터 조건에 맞는 결말을 선택하세요.';wrap.append(p);for(const e of V48_ENDINGS){const ok=v48Unlock(e),b=document.createElement('button');b.textContent=(ok?'✧ ':'🔒 ')+e.name+' · '+e.group;b.disabled=!ok;b.onclick=()=>v48EndingConfirm(e);wrap.append(b);const hint=document.createElement('p');hint.className='hint';hint.textContent=(ok?'해금 완료 · ':'해금 힌트 · ')+v49Hint(e)+'\n'+v50Progress(e);wrap.append(hint);}modal('정식 엔딩 선택 · v50',wrap);}
function v48EndingConfirm(e){const wrap=document.createElement('div'),p=document.createElement('p'),yes=document.createElement('button'),back=document.createElement('button');p.textContent=e.desc+'\n\n이 엔딩을 확정하고 도감에 기록하시겠습니까? 확정하면 이 회차의 탐색은 종료되며 다른 엔딩을 선택할 수 없습니다.';yes.textContent='이 엔딩 확정하기';yes.onclick=()=>v48Finish(e.id);back.textContent='엔딩 목록으로';back.onclick=v48EndingMenu;wrap.append(p,yes,back);modal(e.name,wrap);}
function v48Gallery(){const wrap=document.createElement('div'),items=v48GalleryRead(),details=v50Details(),n=new Set(items.map(x=>x.id)).size,head=document.createElement('p');head.textContent='수집 '+n+' / 8 ('+Math.round(n/8*100)+'%) · '+v49Meta().runs+'회차 · 도감은 회차 저장과 별도로 보존';wrap.append(head);for(const e of V48_ENDINGS){const found=items.find(x=>x.id===e.id),history=details.filter(x=>x.id===e.id),b=document.createElement('button');b.textContent=(found?'✦ ':'🔒 ')+(found?e.name:'???')+' · '+e.group+(history.length?' · 기록 '+history.length+'회':'');b.onclick=()=>found?modal('✦ '+e.name,v50EndingText(e.id)+'\n\n[수집 기록]\n'+(history.length?history.map(x=>x.run+'회차 · DAY '+x.day).join('\n'):'이전 버전 수집 기록')):modal('해금 힌트',v49Hint(e)+'\n'+v50Progress(e));wrap.append(b);}const check=document.createElement('button');check.textContent='저장 데이터 진단';check.onclick=v50SaveCheck;const ng=document.createElement('button');ng.textContent='새 회차 시작 (도감 유지)';ng.onclick=v48NewGameConfirm;wrap.append(check,ng);modal('엔딩 도감 · v50',wrap);}
function v48NewGameConfirm(){const wrap=document.createElement('div'),p=document.createElement('p'),yes=document.createElement('button'),no=document.createElement('button');p.textContent='현재 회차의 진행 데이터가 초기화됩니다. 엔딩 도감·상세 기록·회차 횟수는 유지됩니다. 복구할 진행은 미리 백업하세요.';yes.textContent='다음 회차 시작';yes.onclick=()=>{const previous=state,m=v49Meta(),next={...m,runs:m.runs+1,legacy:m.legacy+Number(!!v49Finished())};const newState=fresh();try{localStorage.setItem(SAVE_KEY,JSON.stringify(newState));if(!v49SetMeta(next)){localStorage.setItem(SAVE_KEY,JSON.stringify(previous));throw Error('회차 기록 저장 실패');}state=newState;}catch(e){modal('저장 공간 오류','새 회차를 저장하지 못했습니다. '+e.message);return;}closeModal();show('game');render();};no.textContent='취소';no.onclick=v48Gallery;wrap.append(p,yes,no);modal('새 회차 시작 확인',wrap);}
function v48Board(){const wrap=document.createElement('div'),p=document.createElement('p');p.textContent='정식 엔딩 8종 · 1회차 1엔딩 · 현재 '+v49Meta().runs+'회차 · 도감 수집률 '+Math.round(new Set(v48GalleryRead().map(x=>x.id)).size/8*100)+'%'+v50RunLine();wrap.append(p);for(const [label,action] of [['정식 엔딩 선택',v48EndingMenu],['엔딩 도감 / 다회차',v48Gallery],['통합 분기 연대기',v47Chronicle],['저장 진단',v50SaveCheck]]){const b=document.createElement('button');b.textContent=label;b.onclick=action;wrap.append(b);}modal('v50 · 엔딩과 다회차',wrap);}

function v49RenderCompleted(){const d=v49Data(),e=V48_ENDINGS.find(x=>x.id===d.finished);$('speaker').textContent='보랏빛 밤 · 완결';$('line').textContent=e?v50EndingText(e.id):'이 회차는 종료되었습니다.';$('day').textContent='DAY '+state.day;$('chapter').textContent='ENDING';$('choices').replaceChildren();$('nextBtn').classList.add('hidden');for(const [label,action] of [['✦ 엔딩 도감',v48Gallery],['다음 회차 시작',v48NewGameConfirm]]){const b=document.createElement('button');b.textContent=label;b.onclick=action;$('choices').append(b);}}

// v50: ending presentation, persistent gallery detail, and legacy-friendly eligibility.
const V50_SCENES={
 miguel_respect:['노란 장미','그녀의 선택을 존중한다는 것은 자신의 마음을 부정하는 일이 아니었다. 다니엘은 꽃을 내려놓고 한 걸음 물러섰다.','서로의 약속을 침범하지 않는 거리가 남았다.'],
 miguel_confession:['끝맺은 문장','“제 마음은 제 몫입니다. 부담을 드려 죄송합니다.” 미겔은 잠시 시선을 낮추었다. “네 말은 잘 들었어, 다니엘.”','대답은 약속이 아니었다. 다니엘은 그 차이를 기억했다.'],
 miguel_separation:['부치지 않은 편지','접힌 편지 위로 달빛이 스쳤다. 다니엘은 마지막 문장을 지우고 창을 닫았다.','떠나는 일에도 상대를 존중하는 용기가 필요했다.'],
 secret:['세 개의 달','사람들의 시선이 닿지 않는 복도에서 둘은 잠시 멈췄다. 누구도 선을 넘지 않았다.','말하지 않은 마음은 관계의 약속이 되지 않았다.'],
 alex_reconcile:['빈 의자','“형님, 잠시 말씀드려도 되겠습니까?” 알렉은 빈 의자를 가리켰다.','화해는 한 번의 사과가 아니라 다시 듣는 일에서 시작되었다.'],
 alex_fracture:['닫힌 문','다니엘은 문고리에 손을 얹었다가 거두었다. 오늘은 답을 얻을 수 없었다.','닫힌 문은 영원한 판결이 아니었다.'],
 court_guardian:['작은 등불','소문보다 늦게 도착한 증언이 있었다. 다니엘은 끝까지 그 말을 받아 적었다.','황궁의 신뢰는 이름 없는 사람을 지키는 일에서 자랐다.'],
 independent:['첫걸음','세 개의 달이 비추는 길에서 다니엘은 누구의 답도 기다리지 않았다.','그의 다음 계절은 스스로 써 내려갈 이야기였다.']
};
const V50_GALLERY_DETAIL_KEY='delharsha_purple_night_ending_details_v1';
function v50Details(){try{const x=JSON.parse(localStorage.getItem(V50_GALLERY_DETAIL_KEY)||'[]');return Array.isArray(x)?x.filter(y=>y&&V48_ENDINGS.some(e=>e.id===y.id)).slice(-100):[];}catch{return [];}}
function v50StoreDetail(id){try{const old=v50Details();old.push({id,run:v49Meta().runs,day:state.day,at:new Date().toISOString(),reputation:Number(state.stats?.reputation)||0});localStorage.setItem(V50_GALLERY_DETAIL_KEY,JSON.stringify(old.slice(-100)));return true;}catch{return false;}}
function v50RunLine(){const meta=v49Meta(),found=new Set(v48GalleryRead().map(x=>x.id));if(meta.runs<=1)return '';return '\n\n[다시 시작된 밤] '+meta.runs+'번째 회차. 다니엘은 처음 보는 풍경인데도 이상하게 낯설지 않은 달빛을 올려다보았다. (게임용 다회차 연출 · 인물의 실제 기억 계승은 아님)'+(found.size?'\n기록된 가능성 '+found.size+'개가 엔딩 도감에 남아 있다.':'');}
function v50EndingText(id){const e=V48_ENDINGS.find(x=>x.id===id),scene=V50_SCENES[id];if(!e)return '';return '✦ '+e.name+'\n\n'+scene[0]+'\n\n'+scene[1]+'\n\n'+e.text+'\n\n— 에필로그 —\n'+V49_EPILOGUES[id]+'\n\n— 마지막 문장 —\n'+scene[2];}
function v48Unlock(e){if(!e||Number(state.day||1)<7)return false;const m=v34Data().miguel,a=v34Data().alex,d=v47Data(),arcs=Array.isArray(d.arcs)?d.arcs:[],completed=k=>arcs.some(x=>x&&x.kind===k&&Number(x.stage)>=3),met=Number(state.social?.miguelMeetings)||0,w=Number(m.warmth)||0,r=Number(m.restraint)||0,t=Number(a.trust)||0,q=Number(a.doubt)||0,tension=Number(state.social?.alexTension)||0;switch(e.id){case 'miguel_respect':return met>=2&&(r>=1||completed('miguel'));case 'miguel_confession':return met>=2&&w>=2;case 'miguel_separation':return met>=2&&r>=2;case 'secret':return met>=3&&w>=3&&r>=3;case 'alex_reconcile':return t>=q&&(tension>0||completed('alex')||t>=2);case 'alex_fracture':return q>t&&(tension>0||completed('alex')||q>=2);case 'court_guardian':return (Number(state.stats?.reputation)||0)>=55&&(completed('npc')||(Number(state.v47?.decisions)||0)>=2);case 'independent':return true;default:return false;}}
function v50Progress(e){const m=v34Data().miguel,a=v34Data().alex;const met=Number(state.social?.miguelMeetings)||0;const w=Number(m.warmth)||0,r=Number(m.restraint)||0,t=Number(a.trust)||0,q=Number(a.doubt)||0;const data={miguel_respect:'미겔 만남 '+met+'/2 · 절제 '+r+'/1',miguel_confession:'미겔 만남 '+met+'/2 · 감정 '+w+'/2',miguel_separation:'미겔 만남 '+met+'/2 · 절제 '+r+'/2',secret:'미겔 만남 '+met+'/3 · 감정 '+w+'/3 · 절제 '+r+'/3',alex_reconcile:'형제 신뢰 '+t+' · 의심 '+q,alex_fracture:'형제 의심 '+q+' · 신뢰 '+t,court_guardian:'황궁 평판 '+(Number(state.stats?.reputation)||0)+'/55',independent:'7일차부터 선택 가능'};return data[e.id]||'';}
function v50SaveCheck(){const checks=[];for(const [key,label] of [[SAVE_KEY,'현재 진행'],[V48_GALLERY_KEY,'엔딩 도감'],[V49_META_KEY,'회차 계승'],[V50_GALLERY_DETAIL_KEY,'엔딩 상세 기록']]){try{const raw=localStorage.getItem(key);if(raw===null){checks.push(label+': 아직 저장 없음');continue;}const parsed=JSON.parse(raw);checks.push(label+': '+(parsed&&typeof parsed==='object'?'정상 JSON':'형식 확인 필요'));}catch(e){checks.push(label+': 읽기 오류 ('+e.message+')');}}const v=v49Data();checks.push('현재 회차 종료 상태: '+(v.finished||'진행 중'));modal('v50 저장 진단 · 읽기 전용',checks.join('\n'));}


// v51 · AU 미겔의 화법: 공석의 격식과 단둘이 있을 때의 온화한 연상 말투.
// 새 사건은 게임용 각색이며, 알렉과 미겔의 약혼 및 사교계 평판을 변경하지 않는다.
function v51Data(){const d=state.v51&&typeof state.v51==='object'&&!Array.isArray(state.v51)?state.v51:(state.v51={});if(!d.seen||typeof d.seen!=='object'||Array.isArray(d.seen))d.seen={};if(!Array.isArray(d.events))d.events=[];if(!Array.isArray(d.pending))d.pending=[];return d;}
function v51Remember(id,title,body,parent){const d=v51Data(),key='v51_'+id;if(d.events.some(e=>e&&e.id===key))return key;const e={id:key,title,text:body,person:'미겔',category:'관계',day:state.day,parent:parent||null};d.events.push(e);v18Remember(key,title,body,'관계');const m=v16Data().memories.find(x=>x&&x.id===key);if(m){m.person='미겔';m.parent=e.parent;m.day=e.day;}return key;}
function v51Choice(c){if(!c.v51Miguel)return;const d=v51Data(),mode=c.v51Miguel,privateTalk=c.v51Private===true;
 const text=mode==='listen'?'다니엘은 그녀의 말을 재촉하지 않고 끝까지 들었다. 미겔은 자신을 배려한 침묵을 알아차렸다.':mode==='truth'?'다니엘은 조심스럽게 진심을 전했다. 미겔은 그 마음을 희롱하지 않고, 자신의 약속을 분명히 했다.':'다니엘은 격식을 지켜 인사했다. 미겔 역시 사교계의 시선 앞에서 흔들림 없는 예를 갖추었다.';
 const parent=v51Remember('choice_'+state.day+'_'+d.events.length,'미겔 · '+(privateTalk?'정원에서 나눈 말':'연회장의 인사'),text,null);
 if(privateTalk){const m=v34Data().miguel;if(mode==='listen')m.restraint=(Number(m.restraint)||0)+1;if(mode==='truth')m.warmth=(Number(m.warmth)||0)+1;d.pending.push({id:parent,mode,due:state.day+2,stage:0});}
}
function v51Miguel(loc){const d=v51Data(),isPrivate=loc==='garden';
 const pending=d.pending.find(x=>x&&x.stage<2&&state.day>=x.due);
 if(pending&&isPrivate){pending.stage++;pending.due=state.day+2;const text=pending.stage===1?
 '인적이 드문 정원 길에서 미겔은 걸음을 늦추었다. “다니엘, 지난번 네가 해 준 말을 생각했어. 고맙구나. 하지만 고마움과 약속은 별개의 일이란다.” 그녀는 노란 장미의 잎을 가만히 살폈다. “그러니 네 마음도 소홀히 여기지 말렴.”':
 '미겔은 다니엘을 조용히 불렀다. “이리 오렴. 이쪽은 바람이 덜 차가워.” 그녀는 웃음을 머금었지만, 손을 내밀거나 약속을 바꾸지는 않았다. “세상에는 서둘러 결론짓지 않아도 되는 마음이 있단다. 너도 언젠가는 알게 될 거야.”';
 v51Remember('follow_'+pending.id+'_'+pending.stage,'미겔 · '+(pending.stage===2?'정원의 여운':'다시 만난 날'),text,pending.stage===1?pending.id:'v51_follow_'+pending.id+'_1');
 return v18Scene('v51_miguel_follow','미겔',text,[{text:'그녀의 말을 마음에 새긴다.',next:'explore'}]);}
 const key=(isPrivate?'private_':'public_')+Math.floor(state.day/5);if(d.seen[key]||Number(state.social?.miguelMeetings||0)<2)return false;d.seen[key]=true;
 if(isPrivate){const text='노란 장미가 늘어선 정원 깊숙한 길에는 다른 사람의 발소리가 없었다. 미겔은 다니엘의 옷깃에 묻은 꽃잎을 눈여겨보았다.\n\n“이리 오렴, 다니엘. 꽃잎 하나가 붙었구나.”\n\n그녀는 섣불리 손을 뻗지 않고 다니엘이 스스로 떼어 낼 시간을 주었다. “사교계에선 작은 친절조차 뜻밖의 의미를 얻곤 하지. 그래서 말 한마디도 허투루 건네지 않는 거란다.”\n\n미겔은 부드럽게 미소 지었다. “너라면 내 말의 무게를 알아주겠니?”';
 return v18Scene('v51_miguel_private','미겔',text,[{text:'“말씀을 끝까지 듣겠습니다.”',v51Miguel:'listen',v51Private:true,next:'explore'},{text:'“제 마음을 가볍게 여기지 않겠습니다.”',v51Miguel:'truth',v51Private:true,next:'explore'}]);}
 const text='연회장에는 귀족들의 시선과 조용한 대화가 오갔다. 미겔은 누구에게나 흠잡을 데 없는 예를 갖추었다. 그녀의 명성에는 흔한 염문 하나 따라붙지 않았다.\n\n“레온하르트 경. 오늘 연회가 경께도 유익한 자리가 되기를 바랍니다.”\n\n그녀는 필요한 만큼만 미소 지었다. 사적인 친밀함을 암시하는 말도, 불필요한 여지도 남기지 않았다.';
 return v18Scene('v51_miguel_public','미겔',text,[{text:'공식적인 예를 갖추어 인사한다.',v51Miguel:'formal',v51Private:false,next:'explore'}]);
}
function v51Board(){const d=v51Data(),wrap=document.createElement('div'),p=document.createElement('p');p.style.whiteSpace='pre-wrap';p.textContent='《보라색의 밤》 AU 미겔\n\n공석: 격식 있는 존댓말, 세련된 어휘, 철저한 공사 구분\n사석: “이리 오렴”처럼 부드럽고 여유로운 연상의 반말\n성격: 노련하고 계산적이되 심술궂거나 조롱하지 않음\n사교계: 염문 없는 품위와 자기관리\n가족: 부모님 모두 생존\n\n신규 회상 '+d.events.length+'건 · 후속 대화 '+d.pending.filter(x=>x.stage>=2).length+'건 완료\n\n이 설정은 중세 AU의 게임용 각색입니다.';wrap.append(p);modal('v51 · 미겔의 두 얼굴',wrap);}


// v52 · 대사 감사 및 공사 구분: 확실히 사적인 정원/테라스에서만 사적 호칭을 쓴다.
const V52_AUDIT={privateScenes:['found_honest','found_polite','miguel_conversation','miguel_truth','miguel_alex'],publicScenes:['wine_handoff','wine_question','alex_miguel','v51_miguel_public'],policy:'공적 존댓말 / 확실한 사석의 품위 있는 반말 / 애매한 장소는 존댓말 유지'};
function v52Data(){const d=state.v52&&typeof state.v52==='object'&&!Array.isArray(state.v52)?state.v52:(state.v52={});if(!d.seen||typeof d.seen!=='object'||Array.isArray(d.seen))d.seen={};if(!Array.isArray(d.events))d.events=[];if(!Array.isArray(d.pending))d.pending=[];return d;}
function v52Record(id,title,body,parent){const d=v52Data(),key='v52_'+id;if(d.events.some(e=>e.id===key))return key;d.events.push({id:key,title,text:body,person:'미겔',category:'관계',day:state.day,parent:parent||null});v18Remember(key,title,body,'관계');const m=v16Data().memories.find(e=>e&&e.id===key);if(m){m.person='미겔';m.parent=parent||null;m.day=state.day;}return key;}
function v52Choice(c){if(!c.v52Miguel)return;const d=v52Data(),mode=c.v52Miguel;const body=mode==='wait'?'다니엘은 미겔의 사정을 존중하고, 대답을 재촉하지 않겠다고 말했다.':'다니엘은 자신의 마음을 숨기지 않되, 그녀의 선택을 침범하지 않겠다고 말했다.';const id=v52Record('choice_'+state.day+'_'+d.events.length,'미겔 · 조용한 약속',body,null);d.pending.push({id,mode,stage:0,due:state.day+2});const m=v34Data().miguel;if(mode==='wait')m.restraint=(Number(m.restraint)||0)+1;else m.warmth=(Number(m.warmth)||0)+1;}
function v52Miguel(loc){if(loc!=='garden'&&loc!=='terrace')return false;const d=v52Data(),p=d.pending.find(x=>x&&x.stage<2&&state.day>=x.due);if(p){p.stage++;p.due=state.day+2;const text=p.stage===1?'세 개의 달이 비추는 길목에서 미겔은 다니엘을 알아보고 걸음을 멈췄다.\n\n“이리 오렴, 다니엘. 네가 전해 준 말은 잊지 않았어. 성급히 답을 내리지 않는 것도 때로는 성의가 필요한 일이란다.”\n\n다니엘은 그녀가 알렉과의 약혼을 가볍게 여기지 않는다는 사실을 알고 있었다. 그래서 그 말이 더욱 조심스럽게 들렸다.':'정원에서 미겔은 노란 장미의 가지를 살폈다.\n\n“네가 스스로의 마음을 정직하게 돌보았으면 좋겠구나. 내게 무엇을 증명하려 애쓰지는 말렴.”\n\n그녀는 미소 지었다. 그 미소에는 미숙한 사람을 내려다보는 기색도, 헛된 약속도 없었다.';const parent=p.stage===1?p.id:'v52_follow_'+p.id+'_1';v52Record('follow_'+p.id+'_'+p.stage,p.stage===2?'미겔 · 장미의 여운':'미겔 · 달 아래의 재회',text,parent);return v18Scene('v52_miguel_follow','미겔',text,[{text:'그녀의 뜻을 존중한다.',next:'explore'}]);}
 const key=loc+'_'+Math.floor(state.day/6);if(d.seen[key]||Number(state.social?.miguelMeetings||0)<2)return false;d.seen[key]=true;
 const intro=loc==='garden'?'정원 깊숙한 곳에는 다른 손님의 기척이 없었다. 미겔은 옷자락을 정리하고 다니엘을 향해 돌아섰다.':'테라스의 문이 닫히자 연회장의 소음이 멀어졌다. 그곳에 다른 사람이 없는 것을 확인한 미겔의 말투가 한결 부드러워졌다.';
 const text=intro+'\n\n“이리 오렴, 다니엘. 너무 멀리 서 있으면 목소리를 높여야 하잖니.”\n\n미겔은 조용히 웃었다. “사람들이 무엇을 보고 싶어 하는지 아는 것과, 그 기대에 응하는 건 별개의 문제란다. 사교계에선 그 차이를 분별할 줄 알아야 하지.”\n\n다니엘이 말을 잇지 못하자 그녀는 조금 기다렸다. “네 생각은 어떠니? 천천히 들려주렴.”';
 return v18Scene('v52_miguel_private','미겔',text,[{text:'“서두르지 않고 기다리겠습니다.”',v52Miguel:'wait',next:'explore'},{text:'“제 마음을 책임지겠습니다.”',v52Miguel:'honest',next:'explore'}]);}
function v52Board(){const d=v52Data(),lines=['v52 · 미겔 화법 감사','공석: 레온하르트 경, 격식 있는 존댓말','사석(단둘): 다니엘, “이리 오렴” “-구나” “-란다”','불명확한 장소: 공적인 화법을 우선 적용','염문 없음 / 부모 생존 / 알렉과 약혼 유지','고급 어휘와 부드러운 권유, 조롱과 유혹의 과시 금지','','신규 사건 '+d.events.length+'건 / 후속 사건 '+d.pending.filter(x=>x.stage>=2).length+'건 완료'];modal('v52 · 미겔 화법 감사',lines.join('\n'));}


// v54 — confirmed Leonhardt family positions; additional court scenes are game adaptations.
function v54Data(){const d=state.v54&&typeof state.v54==='object'&&!Array.isArray(state.v54)?state.v54:(state.v54={});if(!d.seen||typeof d.seen!=='object')d.seen={};return d;}
function v54FamilyBoard(){modal('v54 · 레온하르트 삼형제와 약혼',[
'장남: 존재만 확정. 이름·성격·역할은 미정.',
'차남: 알렉스(알렉) 레온하르트. 사교적 처세, 약간 능글맞은 여유, 가문에 대한 충실함.',
'막내 삼남: 다니엘 레온하르트. 형들과 달리 솔직하고 서툰 면이 있다.',
'코트리먼 후작가의 미겔: 부모 생존, 염문 없는 평판, 노련하고 우아한 언행.',
'알렉스와 미겔: 유효한 약혼. 이미 키스와 잠자리를 나눈 편안하고 합리적인 관계.',
'공석: 격식 있는 존댓말 / 미겔과 다니엘 단둘: 온화한 연상 반말.',
'', '※ 정치적 장면과 내면 묘사는 게임용 각색이며, 확정 설정과 구분합니다.'
].join('\n'));}
function v54FamilyScene(loc){if(state.day<2||!['hall','drawing','terrace','garden'].includes(loc))return false;const d=v54Data();const key='family_'+Math.floor(state.day/6);if(d.seen[key])return false;d.seen[key]=true;
const publicPlace=loc==='hall'||loc==='drawing';const body=publicPlace?
'황궁의 회의가 끝나자 알렉스 레온하르트는 잔을 내려놓았다. 차남이라는 위치를 핑계로 책임을 피할 생각은 없어 보였다.\n\n“가문의 명예란 지켜 달라고 부탁한다고 지켜지는 게 아니지. 그렇다고 매번 칼부터 뽑을 필요도 없고.”\n\n그는 가볍게 웃으며 다니엘에게 의자를 권했다. “우리 막내는 어떻게 생각하나? 형님께서도 아직 결론을 내리지 않으셨으니, 네 의견부터 듣지.”\n\n미겔은 정중하게 고개를 숙였다. “알렉스 경의 말씀에 일리가 있습니다. 레온하르트 경께서도 의견을 주시겠습니까?”':
'테라스에서 다니엘은 형 알렉스와 미겔이 나란히 서 있는 모습을 보았다. 두 사람 사이에는 오래 익숙해진 이들만의 편안한 간격이 있었다.\n\n알렉스가 미소 지었다. “미겔, 오늘은 우리 막내가 유난히 생각이 많아 보이는군.”\n\n미겔은 차분히 답한 뒤 다니엘과 단둘이 남자 부드럽게 말했다. “이리 오렴, 다니엘. 네가 무슨 생각을 하는지 천천히 들려주겠니?”\n\n그녀에게 알렉스와의 약혼은 불행한 속박이 아니었다. 그 사실이 오히려 다니엘의 마음을 복잡하게 했다.';
const id='v54_family_'+key;v18Remember(id,'레온하르트 삼형제와 약혼의 무게',body,'관계');return v18Scene(id,publicPlace?'알렉스':'미겔',body,[{text:'“가문에 도움이 될 길을 찾겠습니다.”',next:'explore'},{text:'“제 생각을 차분히 말씀드리겠습니다.”',next:'explore'}]);}
// v53 — palace factions and court etiquette (game-only adaptations; not official canon).
const V53_PLACES={hall:'대연회장',corridor:'회랑',terrace:'테라스',drawing:'응접실',garden:'정원'};

// v55 — 확정 인물 관계를 존중하는 궁중 정치/로맨스 연속 사건 (게임용 각색)
function v55Data(){const d=state.v55&&typeof state.v55==='object'&&!Array.isArray(state.v55)?state.v55:(state.v55={});if(!d.seen||typeof d.seen!=='object')d.seen={};if(!Array.isArray(d.arcs))d.arcs=[];if(!Array.isArray(d.events))d.events=[];if(!d.bonds||typeof d.bonds!=='object')d.bonds={family:0,conscience:0,discretion:0};return d;}
function v55Record(id,title,body,person,parent){const d=v55Data(),key='v55_'+id;if(d.events.some(e=>e.id===key))return key;d.events.push({id:key,title,text:body,person,category:'v55 궁중·관계',day:state.day,parent:parent||null});v18Remember(key,title,body,'v55 궁중·관계');return key;}
function v55Choice(c){if(!c.v55Mode)return;const d=v55Data(),mode=c.v55Mode,arc=c.v55Arc;const delta={protect:{family:2,conscience:0,discretion:1},investigate:{family:1,conscience:2,discretion:0},confess:{family:-1,conscience:2,discretion:0},restrain:{family:1,conscience:1,discretion:2},listen:{family:1,conscience:1,discretion:1},observe:{family:0,conscience:1,discretion:2}}[mode]||{};for(const [k,v] of Object.entries(delta))d.bonds[k]=Math.max(-10,Math.min(20,(d.bonds[k]||0)+v));const bodies={protect:'다니엘은 가문의 명예를 지키면서도 사실을 감추지 않을 절차를 택했다.',investigate:'다니엘은 공훈 명부와 구휼 장부의 차이를 직접 대조하기로 했다.',confess:'다니엘은 자신의 감정을 인정하되 미겔에게 답을 요구하지 않기로 했다.',restrain:'다니엘은 형과 미겔의 약혼을 존중하며 사적인 경계를 지켰다.',listen:'다니엘은 알렉스의 말에서 농담과 경고를 구별해 들었다.',observe:'다니엘은 성급히 판단하지 않고 가문 간 서신의 맥락을 살폈다.'};const parent=v55Record('decision_'+state.day+'_'+d.arcs.length,'다니엘의 선택 · '+arc,bodies[mode]||'다니엘은 자신의 선택을 돌아보았다.','다니엘');d.arcs.push({id:'v55arc_'+state.day+'_'+d.arcs.length,arc,mode,stage:0,due:state.day+2,parent});}
function v55Follow(arc){const d=v55Data(),a=d.arcs.find(x=>x.arc===arc&&x.stage<3&&x.due<=state.day);if(!a)return false;a.stage++;a.due=state.day+2;const scripts={alex:['알렉스는 궁정 회의가 끝난 뒤에도 미소를 거두지 않았다. “가문의 이름은 서류 한 장으로 지켜지는 게 아니지. 그렇다고 서류 한 장을 우습게 보아서도 곤란하고.”','그는 동생에게 후원 명부를 다시 보여 주었다. 농담을 섞는 목소리와 달리, 사실관계를 확인하는 태도는 빈틈없었다.','알렉스는 마지막 서류에 서명했다. 가문의 명예를 지키는 일은 누군가를 희생양으로 만드는 것과 다르다는 결론이었다.'],miguel:['미겔은 알렉스가 보낸 서신을 읽고 조용히 접었다. 두 사람의 약혼은 서로의 생활과 의무를 존중하는 안정적인 약속이었다.','다니엘은 미겔과 알렉스가 익숙한 거리에서 자연스럽게 대화를 나누는 모습을 보았다. 그 친밀함은 형식적인 인사만으로 설명되지 않았다.','미겔은 다니엘에게 결정을 재촉하지 않았다. 다니엘 또한 자신이 품은 마음과 타인의 약속을 구별해야 한다는 것을 알았다.'],court:['서기관은 구휼 장부의 이중 기재를 확인했다. 어느 가문도 공개적인 망신을 원하지 않았지만 책임은 분명히 남아 있었다.','알렉스는 황실 실무자와 후작가 대리인을 같은 자리로 불러 절차를 조율했다. 능숙한 웃음 뒤로 가문의 이익을 놓치지 않았다.','명부는 정정되었고 구휼 물자는 예정대로 움직였다. 완전한 승자는 없었지만, 다니엘은 정치가 사람들의 삶에 닿는 방식을 배웠다.']};const body=scripts[arc][a.stage-1],parent=a.parent;a.parent=v55Record(a.id+'_'+a.stage,'v55 · '+({alex:'차남의 협상',miguel:'안락한 약혼의 무게',court:'구휼 장부의 진실'}[arc])+' '+a.stage,body,arc==='alex'?'알렉스':arc==='miguel'?'미겔':'황궁 서기관',parent);return v18Scene('v55_follow_'+arc,'궁중 기록',body,[{text:'그날의 일을 기억한다.',next:'explore'}]);}
function v55Alex(loc){if(v55Follow('alex'))return true;if(state.day<5||!['hall','drawing','terrace','garden'].includes(loc))return false;const d=v55Data(),key='alex_'+Math.floor(state.day/9);if(d.seen[key])return false;d.seen[key]=true;return v18Scene('v55_alex','알렉스 레온하르트','황실의 구휼 예산을 둘러싼 귀족들의 의견이 팽팽했다. 알렉스는 레온하르트가의 차남답게 자신의 역할을 알고 있었다. 장남의 권한을 넘보지 않으면서도 가문이 부담할 책임은 외면하지 않았다.\n\n“다니엘, 네가 셋째라 해서 세상의 셈법까지 모를 필요는 없지.” 형은 느긋하게 웃었다. “상대가 웃고 있다고 해서 양보할 생각이라는 뜻은 아니거든.”\n\n그는 곧장 후원 명부의 오류를 짚었다. 말투는 능글맞았지만, 가문의 명예를 지키는 태도는 진지했다.',[{text:'“형님, 장부부터 확인해 보겠습니다.”',v55Arc:'alex',v55Mode:'investigate',next:'explore'},{text:'“가문에 불이익이 없도록 절차를 지키겠습니다.”',v55Arc:'alex',v55Mode:'protect',next:'explore'}]);}
function v55Miguel(loc){if(v55Follow('miguel'))return true;if(state.day<6||!['garden','terrace','hall','drawing'].includes(loc))return false;const d=v55Data(),key='miguel_'+Math.floor(state.day/9);if(d.seen[key])return false;d.seen[key]=true;const alone=loc==='garden'||loc==='terrace';const text=alone?'정원에는 다니엘과 미겔뿐이었다. 그녀는 알렉스가 보내온 편지를 봉투에 넣었다. 둘의 약혼은 정치적 합의인 동시에, 서로의 사적인 영역을 이미 익숙하게 공유해 온 관계였다.\n\n“이리 오렴, 다니엘. 마음이 복잡한 모양이구나.”\n\n미겔은 성급한 위로나 장난스러운 도발 대신 잠시 침묵을 내주었다. “무엇이든 서둘러 이름 붙일 필요는 없단다. 다만 누군가의 약속을 가볍게 여겨서는 안 되겠지.”':'다른 귀족들이 오가는 응접실에서 미겔은 단정히 예를 갖추었다. 알렉스와는 익숙한 눈인사를 나누었으나, 사적인 친밀함을 공적인 언사에 섞지 않았다.\n\n“레온하르트 경, 후작가에서 전달한 서신은 정식 절차에 따라 검토해 주시기 바랍니다.”\n\n다니엘은 그녀가 공과 사의 경계를 얼마나 자연스럽게 지키는지 새삼 깨달았다.';return v18Scene('v55_miguel','미겔 코트리먼',text,[{text:'약혼과 가문의 약속을 존중하며 물러선다.',v55Arc:'miguel',v55Mode:'restrain',next:'explore'},{text:'자신의 혼란을 인정하되 답을 요구하지 않는다.',v55Arc:'miguel',v55Mode:'confess',next:'explore'}]);}
function v55Court(loc){if(v55Follow('court'))return true;if(state.day<5||!['corridor','hall','drawing'].includes(loc))return false;const d=v55Data(),key='court_'+Math.floor(state.day/8);if(d.seen[key])return false;d.seen[key]=true;return v18Scene('v55_court','황궁 서기관','구휼 명부에 코트리먼 후작가와 레온하르트 백작가의 후원 내역이 나란히 적혀 있었다. 누군가는 이중 기재를 정치적 공격의 구실로 삼으려 했다.\n\n알렉스는 웃는 낯으로 서기관의 발언을 끊었다. “확인도 끝나지 않은 혐의를 연회장의 화제로 삼으시려는 건 아니겠지요?”\n\n장남의 이름과 권한을 함부로 빌리지 않으면서도, 그는 가문에 불필요한 흠집이 생기지 않도록 협상의 순서를 바꾸었다.',[{text:'기록의 출처와 실무 책임을 조사한다.',v55Arc:'court',v55Mode:'investigate',next:'explore'},{text:'양 가문의 입장을 듣고 공개 발언을 유보한다.',v55Arc:'court',v55Mode:'observe',next:'explore'}]);}
function v55Board(){const d=v55Data();modal('v55 · 삼형제·궁중 암투·약혼', ['레온하르트가 장남: 이름·성격·역할 미정','차남: 알렉스 레온하르트 — 처세에 능하고 능글맞으며 가문을 중시','막내 셋째: 다니엘 레온하르트','미겔 코트리먼: 알렉스와 약혼 유지, 서로 편안하고 사적으로 친밀한 사이','미겔 공석 존댓말 / 다니엘과 단둘이 있을 때 우아한 연상 반말','','가문 보호 '+d.bonds.family+' · 양심과 책임 '+d.bonds.conscience+' · 신중함 '+d.bonds.discretion,'회상 사건 '+d.events.length+'건 · 진행 중 '+d.arcs.filter(a=>a.stage<3).length+'건','','※ 정치 사건과 세부 대화는 게임용 각색입니다. 장남의 미정 설정을 확정하지 않습니다.'].join('\n'));}

function v53Data(){const d=state.v53&&typeof state.v53==='object'&&!Array.isArray(state.v53)?state.v53:(state.v53={});if(!d.factions||typeof d.factions!=='object')d.factions={imperial:0,nobility:0,relief:0};if(!d.seen||typeof d.seen!=='object')d.seen={};if(!Array.isArray(d.pending))d.pending=[];if(!Array.isArray(d.events))d.events=[];if(!d.flags||typeof d.flags!=='object')d.flags={};return d;}
function v53Record(id,title,body,person,parent){const d=v53Data(),key='v53_'+id;if(d.events.some(e=>e.id===key))return key;d.events.push({id:key,title,text:body,person,category:'궁중 정치',day:state.day,parent:parent||null});v18Remember(key,title,body,'궁중 정치');const m=v16Data().memories.find(e=>e.id===key);if(m){m.person=person;m.parent=parent||null;}return key;}
function v53Choice(c){if(!c.v53Decision)return;const d=v53Data(),mode=c.v53Decision,arc=c.v53Arc,delta={imperial:0,nobility:0,relief:0};if(mode==='verify'){delta.imperial=1;delta.relief=1;}if(mode==='discreet'){delta.nobility=1;delta.imperial=1;}if(mode==='protect'){delta.relief=2;delta.nobility=-1;}if(mode==='confront'){delta.imperial=-1;delta.nobility=-1;}if(mode==='mediate'){delta.imperial=1;delta.nobility=1;}if(mode==='defer'){delta.nobility=1;}for(const [k,v] of Object.entries(delta))d.factions[k]=Math.max(-9,Math.min(9,(Number(d.factions[k])||0)+v));const title={miguel:'코트리먼 가문의 서신',alex:'레온하르트 가문의 입장',npc:'황궁 구휼 명부'}[arc]||'궁중의 선택';const body='다니엘은 '+({verify:'장부의 출처를 확인하고, 추측을 사실처럼 말하지 않기로 했다.',discreet:'공식 절차를 존중하며 사적인 정보를 공석에 드러내지 않았다.',protect:'구휼 대상자의 신원을 보호하기로 했다.',confront:'책임을 분명히 묻되 무리한 단정의 위험을 감수했다.',mediate:'상충하는 이해관계 사이에서 조정안을 제안했다.',defer:'가문의 판단을 기다리며 즉각적인 선언을 유보했다.'}[mode]||'신중히 대응했다.');const root=v53Record(arc+'_'+state.day+'_'+mode,title+' · 선택',body,arc==='miguel'?'미겔':arc==='alex'?'알렉':'황궁 인물');d.pending.push({id:root,arc,mode,stage:0,due:state.day+2});}
function v53Follow(arc,loc){const d=v53Data(),p=d.pending.find(x=>x&&x.arc===arc&&x.stage<3&&state.day>=x.due);if(!p)return false;p.stage++;p.due=state.day+2;const parent=p.id;const text=p.stage===1?'선택의 여파가 이틀 만에 궁정의 서류와 말투에 스며들었다. 누구도 노골적으로 반발하지 않았으나, 사람들은 다니엘이 무엇을 우선했는지 기억하고 있었다.':p.stage===2?'회의석상에서 처음에는 사소해 보였던 결정이 다시 거론되었다. 당사자의 체면을 지키는 일과 사실을 밝히는 일이 늘 같은 방향을 향하지는 않았다.':'마침내 해당 안건은 정리되었다. 다니엘이 얻은 것은 완전한 승리가 아니라, 어떤 책임을 감수했는지 스스로 설명할 수 있는 자리였다.';const ending=p.stage===3?' · 결말':'';v53Record(arc+'_'+parent+'_'+p.stage,'궁정의 파문'+ending,text,arc==='miguel'?'미겔':arc==='alex'?'알렉':'황궁 인물',parent);return v18Scene('v53_follow_'+arc,'궁정 기록',text+'\n\n'+(p.stage===3?'이 사건의 결말은 회상 연대기에 남았다.':'다음 결과는 며칠 뒤 드러날 것이다.'),[{text:'기록을 마음에 새긴다.',next:'explore'}]);}
function v53Miguel(loc){if(v53Follow('miguel',loc))return true;if(state.day<3||!['hall','drawing','garden','terrace'].includes(loc))return false;const d=v53Data(),key='miguel_'+Math.floor(state.day/7);if(d.seen[key])return false;d.seen[key]=true;const privateRoom=loc==='garden'||loc==='terrace';const intro=privateRoom?'주변에 사람이 없음을 확인한 미겔은 접어 둔 서신을 꺼냈다. 후작가의 문장 아래에는 구휼 물자의 통행 허가를 둘러싼 귀족들의 이견이 정갈한 필체로 적혀 있었다.':'코트리먼 영애는 회의 자료를 단정하게 접었다. 알렉과 다른 귀족들이 드나드는 자리였으므로 말 한마디에도 공적인 격식을 유지했다.';const quote=privateRoom?'“이리 오렴, 다니엘. 누군가의 선의를 증명하는 일보다, 그 선의가 누구의 손을 거쳐 전달되는지 살피는 일이 더 어렵단다.”':'“레온하르트 경, 구휼 물자에 관한 안건은 공적인 절차를 거쳐 검토하는 편이 적절하겠습니다. 제 가문의 입장 또한 그 범위 안에서 말씀드리지요.”';return v18Scene('v53_miguel_court','미겔',intro+'\n\n'+quote+'\n\n미겔은 다니엘에게 결정의 부담을 떠넘기지 않았다. 다만 정확한 문서와 사교계의 침묵이 어떻게 서로를 지탱하는지 조용히 설명했다.',[{text:'“먼저 서류의 출처를 확인하겠습니다.”',v53Arc:'miguel',v53Decision:'verify',next:'explore'},{text:'“가문의 체면을 해치지 않도록 절차를 지키겠습니다.”',v53Arc:'miguel',v53Decision:'discreet',next:'explore'}]);}
function v53Alex(loc){if(v53Follow('alex',loc))return true;if(state.day<4)return false;const d=v53Data(),key='alex_'+Math.floor(state.day/7);if(d.seen[key])return false;d.seen[key]=true;const a=v34Data().alex,trust=Number(a.trust||0),doubt=Number(a.doubt||0);const mood=trust>=doubt?'알렉은 동생의 판단을 끝까지 듣겠다는 듯 의자를 비워 두었다.':'알렉은 말없이 가문의 서류를 펼쳤다. 오래된 의심이 대화의 첫 문장부터 묻어났다.';return v18Scene('v53_alex_court','알렉',mood+'\n\n레온하르트 가문이 전쟁에서 얻은 지위는 황실에 대한 의무와 맞닿아 있었다. 형은 다니엘에게 물었다. “네가 내리는 결정이 가문과 황실 양쪽에 어떤 의미인지 생각해 보았느냐?”\n\n다니엘은 형에게 인정받고 싶었지만, 그 마음만으로 공적인 결정을 내려서는 안 된다는 사실도 알고 있었다.',[{text:'“양쪽의 우려를 듣고 조정안을 올리겠습니다.”',v53Arc:'alex',v53Decision:'mediate',next:'explore'},{text:'“제 판단을 서두르지 않고 가문의 의견을 듣겠습니다.”',v53Arc:'alex',v53Decision:'defer',next:'explore'}]);}
function v53Npc(loc){if(v53Follow('npc',loc))return true;if(state.day<3||!['corridor','drawing','hall'].includes(loc))return false;const d=v53Data(),key='npc_'+Math.floor(state.day/5);if(d.seen[key])return false;d.seen[key]=true;const f=d.factions;const flavor=(f.relief||0)>1?'구휼 명부를 지키려 했던 다니엘의 태도를 기억하는 이들이 조심스럽게 인사를 건넸다.':(f.nobility||0)>1?'서기관은 귀족들의 체면을 지켜 온 다니엘에게 한결 신중한 태도를 보였다.':'서기관은 출처가 불분명한 소문이 명부를 따라 퍼지고 있다고 귀띔했다.';return v18Scene('v53_npc_court','황궁 서기관',flavor+'\n\n변방 피해 지역으로 보내는 물자 명부에는 귀족 후원자의 이름과 수혜자의 신원이 함께 적혀 있었다. 누군가는 명부를 공개하자고 했고, 누군가는 무조건 덮자고 했다. 어느 쪽이든 위험이 있었다.',[{text:'“수혜자의 이름부터 보호해야 합니다.”',v53Arc:'npc',v53Decision:'protect',next:'explore'},{text:'“기록을 대조해 책임 소재를 확인하겠습니다.”',v53Arc:'npc',v53Decision:'verify',next:'explore'}]);}
function v53Board(){const d=v53Data(),f=d.factions;modal('v53 · 황궁 정치와 가문', ['황실 의전·행정 신뢰: '+f.imperial,'귀족 가문 협력: '+f.nobility,'구휼·민생 신뢰: '+f.relief,'','가문: 레온하르트 백작가(전쟁 공훈으로 위상 상승), 코트리먼 후작가(미겔의 부모 생존)','미겔과 알렉의 약혼은 유효하며, 공석에서는 예법과 공식 호칭을 지킵니다.','새 정치 사건 '+d.events.length+'건 · 진행 중 '+d.pending.filter(x=>x.stage<3).length+'건','','※ 세 파벌 지표와 구휼 명부·서신 사건은 게임용 각색이며 공식 원작 확정 설정이 아닙니다.'].join('\n'));}

function moveTo(loc){
 if(v49Finished()){v49FinalScreen();return;}
 const ex=exploration();if(ex.turn>=7){state.node='explore_timeout';render();return;}
 const turn=ex.turn;ex.turn++;ex.visited.push(loc);state.history.push('explore');
 v25LinkDay();v26DailyLink();v27Daily();v28Chapter();v29Chapter();v30Chapter();v31Daily();v32Daily();v34Daily();v35Daily();v36Daily();v37Daily();v38Daily();v39Daily();v40Daily();v41Daily();v42Daily();v43Daily();v44Daily();v45Daily();v46Daily();v47Daily();
 if(v18PromiseEncounter(loc,turn)){v22PromiseScene(loc);render();return;}
 v18CheckMissedPromise();
 const miguelPlace=v16Route(state.day)[turn];
 const atmosphere=v17Atmosphere(loc,turn);
 const alexPlace=scheduleFor(ALEX_SCHEDULES,state.day)[turn];
 if(loc===miguelPlace&&loc===alexPlace){ex.found=true;markMiguelMeeting();markAlexMeeting(true);sharedEncounterV15();state.node='alex_miguel';}
 else if(loc===miguelPlace){ex.found=true;markMiguelMeeting();state.node=(loc==='hall'&&turn===0&&state.day===1)?'wine_accident':socialProgress().miguelMeetings>1?'explore_repeat_v14':'explore_found';if(state.node==='explore_repeat_v14')repeatedMiguelEvent();if(state.node!=='wine_accident'&&!v18OfferPromise()&&!v17BondScene())v16RelationshipEvent(); if(socialProgress().miguelMeetings>=3)v21BondScene(loc);if(state.node==='explore_found'||state.node==='explore_repeat_v14'){if(!v55Miguel(loc)&&!v53Miguel(loc)&&!v52Miguel(loc)&&!v51Miguel(loc)&&!v47Miguel(loc)&&!v46Miguel(loc)&&!v45Miguel(loc)&&!v44Miguel(loc)&&!v43Miguel(loc)&&!v42Miguel(loc)&&!v41Miguel(loc)&&!v40Miguel(loc)&&!v39Miguel(loc)&&!v38Miguel(loc)&&!v37Miguel(loc)&&!v36Miguel(loc)&&!v35Miguel(loc)&&!v34Miguel(loc)&&!v33Miguel(loc)&&!v32Miguel(loc)&&!v31Miguel(loc)&&!v30Miguel(loc)&&!v29Miguel(loc)&&!v28Miguel(loc)&&!v27Follow(loc,'miguel')&&!v26MiguelFollow(loc)&&!v25BondScene(loc)&&!v24Delayed(loc)&&!v24MiguelMemory(loc))v23MiguelArc(loc);}}
 else if(loc===alexPlace){markAlexMeeting();state.node='explore_alex';if(!v55Alex(loc)&&!v54FamilyScene(loc)&&!v53Alex(loc)&&!v47Alex(loc)&&!v46Alex(loc)&&!v45Alex(loc)&&!v44Alex(loc)&&!v43Alex(loc)&&!v42Alex(loc)&&!v41Alex(loc)&&!v40Alex(loc)&&!v39Alex(loc)&&!v38Alex(loc)&&!v37Alex(loc)&&!v36Alex(loc)&&!v35Alex(loc)&&!v34Alex(loc)&&!v33Alex(loc)&&!v32Alex(loc)&&!v31Alex(loc)&&!v30Alex(loc)&&!v29Alex(loc)&&!v28Alex(loc)&&!v27Follow(loc,'alex')&&!v26AlexFollow(loc)&&!v25AlexScene(loc)&&!v24Delayed(loc)&&!v24AlexArc(loc)&&!v23AlexAfter(loc)&&!v22AlexConflict(loc)&&!v20AlexEncounter(loc)&&socialProgress().alexTension>=4)v16AlexTension();}
 else if(!v55Court(loc)&&!v53Npc(loc)&&!v47Npc(loc)&&!v46Npc(loc)&&!v45Npc(loc)&&!v44Npc(loc)&&!v43Npc(loc)&&!v42Npc(loc)&&!v41Npc(loc)&&!v40Npc(loc)&&!v39Npc(loc)&&!v38Npc(loc)&&!v37Npc(loc)&&!v36Npc(loc)&&!v35Npc(loc)&&!v34Npc(loc)&&!v33Npc(loc)&&!v32Npc(loc)&&!v31Npc(loc)&&!v30Npc(loc)&&!v29Npc(loc)&&!v28Npc(loc)&&!v27Follow(loc,'npc')&&!v26SecretFollow(loc)&&!v25SecretEvent(loc)&&!v24NpcFollow(loc)&&!v23NpcReward(loc)&&!v22NpcDeep(loc)&&!v19PromiseFollowup(loc)&&!v21NpcFollowup(loc)&&!v21RumorEcho(loc)&&!v20ErrandEvent(loc)&&!v18SerialEvent(loc)&&!v16QuestEvent(loc)&&!questEvent(loc)&&!specialDayEvent(loc)&&!v19NpcEncounter(loc)&&!v19RumorEncounter(loc)&&!v18NpcEvent(loc,turn)){ambientScene(loc);}
 if(state.node==='explore_v18_event')NODES.explore_v18_event.text=atmosphere+'\n\n'+NODES.explore_v18_event.text;
 if(state.node==='explore_ambient'&&NODES.explore_ambient)NODES.explore_ambient.text=atmosphere+'\n\n'+NODES.explore_ambient.text;
 else if(state.node==='explore_v16_quest'||state.node==='explore_quest_v15'||state.node==='explore_special_v14')NODES[state.node].text=atmosphere+'\n\n'+NODES[state.node].text;
 render();
}
function v56CollectExplore(){
 if(v49Finished()){v49RenderCompleted();return;}
 const ex=exploration();const now=CLOCK_LABELS[Math.min(ex.turn,7)];
 $('line').textContent='DAY '+state.day+' · 황궁 · '+now+' · 남은 이동 '+Math.max(0,7-ex.turn)+' / 7\n\n황궁에는 저마다의 밤을 보내는 사람들이 있습니다. 어디로 향하시겠습니까?';
 $('nextBtn').classList.add('hidden');const v55Menu=document.createElement('button');v55Menu.textContent='♛ v55 궁중 암투·알렉스·미겔';v55Menu.onclick=v55Board;v56Register(v55Menu);const v54Menu=document.createElement('button');v54Menu.textContent='♛ v54 레온하르트 삼형제·약혼';v54Menu.onclick=v54FamilyBoard;v56Register(v54Menu);const v53Menu=document.createElement('button');v53Menu.textContent='♜ v53 황궁 정치·가문 관계';v53Menu.onclick=v53Board;v56Register(v53Menu);const v52Menu=document.createElement('button');v52Menu.textContent='✧ v52 미겔 대사·공사 구분';v52Menu.onclick=v52Board;v56Register(v52Menu);const v51Menu=document.createElement('button');v51Menu.textContent='✧ v51 미겔 AU · 화법과 관계';v51Menu.onclick=v51Board;v56Register(v51Menu);const v48Menu=document.createElement('button');v48Menu.textContent='♛ v48 정식 엔딩 · 엔딩 도감';v48Menu.onclick=v48Board;v56Register(v48Menu);const v47Status=document.createElement('button');v47Status.textContent='✧ v47 관계의 파문';v47Status.onclick=v47Board;v56Register(v47Status);const v47History=document.createElement('button');v47History.textContent='✦ v47 통합 분기 연대기';v47History.onclick=v47Chronicle;v56Register(v47History);const v47Save=document.createElement('button');v47Save.textContent='♧ v47 저장·백업 검사';v47Save.onclick=v47Audit;v56Register(v47Save);const v46Status=document.createElement('button');v46Status.textContent='✧ v46 교차 서사';v46Status.onclick=v46Board;v56Register(v46Status);const v46History=document.createElement('button');v46History.textContent='✦ v46 다중 분기 연대기';v46History.onclick=v46Chronicle;v56Register(v46History);const v46Save=document.createElement('button');v46Save.textContent='♧ v46 저장 검증';v46Save.onclick=v46Audit;v56Register(v46Save);const v45Status=document.createElement('button');v45Status.textContent='✧ v45 관계·소문 여운';v45Status.onclick=v45Board;v56Register(v45Status);const v45History=document.createElement('button');v45History.textContent='✦ v45 선택 경로 연대기';v45History.onclick=v45Chronicle;v56Register(v45History);const v45Save=document.createElement('button');v45Save.textContent='♧ v45 저장·백업 점검';v45Save.onclick=v45Audit;v56Register(v45Save);const v44Status=document.createElement('button');v44Status.textContent='✧ v44 관계·소문 기록';v44Status.onclick=v44Board;v56Register(v44Status);const v44History=document.createElement('button');v44History.textContent='✦ v44 통합 선택 연대기';v44History.onclick=v44Chronicle;v56Register(v44History);const v44Save=document.createElement('button');v44Save.textContent='♧ v44 저장·백업 진단';v44Save.onclick=v44Audit;v56Register(v44Save);const v43Status=document.createElement('button');v43Status.textContent='✧ v43 관계 후일담';v43Status.onclick=v43Board;v56Register(v43Status);const v43History=document.createElement('button');v43History.textContent='✦ v43 통합 사건 연대기';v43History.onclick=v43Chronicle;v56Register(v43History);const v43Save=document.createElement('button');v43Save.textContent='♧ v43 저장 무결성 점검';v43Save.onclick=v43Audit;v56Register(v43Save);const v42Status=document.createElement('button');v42Status.textContent='✧ v42 장기 관계 기록';v42Status.onclick=v42Board;v56Register(v42Status);const v42History=document.createElement('button');v42History.textContent='✦ v42 통합 사건 연대기';v42History.onclick=v42Chronicle;v56Register(v42History);const v42Recovery=document.createElement('button');v42Recovery.textContent='♧ v42 저장 데이터 검증';v42Recovery.onclick=v42VerifyRecovery;v56Register(v42Recovery);const v41Status=document.createElement('button');v41Status.textContent='✧ v41 관계와 후일담';v41Status.onclick=v41Board;v56Register(v41Status);const v41History=document.createElement('button');v41History.textContent='✦ v41 통합 사건 연대기';v41History.onclick=v41Chronicle;v56Register(v41History);const v41Restore=document.createElement('button');v41Restore.textContent='▣ v41 저장 백업·복구';v41Restore.onclick=v41Recovery;v56Register(v41Restore);const v40Status=document.createElement('button');v40Status.textContent='✧ v40 관계 전환점';v40Status.onclick=v40Board;v56Register(v40Status);const v40History=document.createElement('button');v40History.textContent='✦ v40 통합 사건 연대기';v40History.onclick=v40Chronicle;v56Register(v40History);const v39Status=document.createElement('button');v39Status.textContent='✧ v39 관계 후속 현황';v39Status.onclick=v39Board;v56Register(v39Status);const v39History=document.createElement('button');v39History.textContent='✦ v39 통합 선택 경로';v39History.onclick=v39Chronicle;v56Register(v39History);const v36Status=document.createElement('button');v36Status.textContent='✧ v36 장기 서사 현황';v36Status.onclick=v36Board;v56Register(v36Status);const v36History=document.createElement('button');v36History.textContent='✦ v36 통합 사건 연대기';v36History.onclick=v36Chronicle;v56Register(v36History);const v35Status=document.createElement('button');v35Status.textContent='✧ v35 장기 관계 현황';v35Status.onclick=v35Board;v56Register(v35Status);const v35History=document.createElement('button');v35History.textContent='✦ v35 선택 경로 상세 추적';v35History.onclick=v35Chronicle;v56Register(v35History);const v34Status=document.createElement('button');v34Status.textContent='✧ v34 관계·평판 현황';v34Status.onclick=v34Board;v56Register(v34Status);const v34History=document.createElement('button');v34History.textContent='✦ v34 선택 경로 연대기';v34History.onclick=v34Chronicle;v56Register(v34History);const v33Status=document.createElement('button');v33Status.textContent='✧ v33 황궁 관계 현황';v33Status.onclick=v33Board;v56Register(v33Status);const v33History=document.createElement('button');v33History.textContent='✦ v33 연결된 사건 연대기';v33History.onclick=v33Chronicle;v56Register(v33History);const v32Status=document.createElement('button');v32Status.textContent='✧ v32 관계의 변화';v32Status.onclick=v32Board;v56Register(v32Status);const v32History=document.createElement('button');v32History.textContent='✦ v32 상세 사건 연대기';v32History.onclick=v32Chronicle;v56Register(v32History);const clueBtn=document.createElement('button');clueBtn.textContent='✦ 주변의 소문과 흔적을 살핀다 (30분)';clueBtn.onclick=clueSearch;v56Register(clueBtn);const inferBtn=document.createElement('button');inferBtn.textContent='✧ 수집한 소문으로 동선 추리';inferBtn.onclick=inferenceV15;v56Register(inferBtn);const questBtn=document.createElement('button');const quest=questProgress();questBtn.textContent='♫ 악보 사건: '+(quest.done?'완료':['연회장에서 시작','회랑에서 악보 찾기','응접실에 전달'][quest.step]);questBtn.onclick=()=>modal('연속 사건 · 사라진 악보',quest.done?'악보를 무사히 돌려주었습니다.':'다음 목표: '+['대연회장','대리석 회랑','응접실'][quest.step]);v56Register(questBtn);const v16Btn=document.createElement('button');v16Btn.textContent='✦ 황궁 의뢰 수첩 (3개 연속 사건)';v16Btn.onclick=v16QuestBoard;v56Register(v16Btn);const journalBtn=document.createElement('button');journalBtn.textContent='✧ 수집한 단서 확인 ('+(ex.clues||[]).length+')';journalBtn.onclick=()=>modal('탐색 수첩',(ex.clues||[]).length?(ex.clues||[]).join('\n\n'):'아직 기록한 단서가 없습니다.');v56Register(journalBtn);const v18Btn=document.createElement('button');v18Btn.textContent='✧ 황궁의 작은 기록 · 약속과 연속 사건';v18Btn.onclick=v18Board;v56Register(v18Btn);const v19Btn=document.createElement('button');v19Btn.textContent='✧ 황궁 인연과 소문 수첩';v19Btn.onclick=v19Board;v56Register(v19Btn);const verifyBtn=document.createElement('button');verifyBtn.textContent='✧ 들은 소문의 진위 확인 (30분)';verifyBtn.onclick=v20VerifyRumor;v56Register(verifyBtn);const errandBtn=document.createElement('button');errandBtn.textContent='✦ 황궁 조사·부탁 수첩';errandBtn.onclick=v20Board;v56Register(errandBtn);const renewBtn=document.createElement('button');renewBtn.textContent='✧ 미겔과의 약속을 다시 청할지 생각한다';renewBtn.onclick=v20PromiseRenew;v56Register(renewBtn);const diaryBtn=document.createElement('button');diaryBtn.textContent='✦ 다니엘의 감정 일지';diaryBtn.onclick=v20Diary;v56Register(diaryBtn);const v21BoardBtn=document.createElement('button');v21BoardBtn.textContent='✧ 후일담·소문·약속 수첩';v21BoardBtn.onclick=v21Board;v56Register(v21BoardBtn);const v21PlaceBtn=document.createElement('button');v21PlaceBtn.textContent='✧ 미겔과의 다음 약속 장소 고르기';v21PlaceBtn.onclick=v21PromiseMenu;v56Register(v21PlaceBtn);const v21MoodBtn=document.createElement('button');v21MoodBtn.textContent='✦ 감정 변화 기록하기';v21MoodBtn.onclick=v21MoodSnapshot;v56Register(v21MoodBtn);const v22Btn=document.createElement('button');v22Btn.textContent='✧ 황궁의 인연 · v22 관계 수첩';v22Btn.onclick=v22Board;v56Register(v22Btn);const v22RumorBtn=document.createElement('button');v22RumorBtn.textContent='✦ 번진 소문에 어떻게 대응할지 생각한다';v22RumorBtn.onclick=()=>{if(v22RumorResponse())render();};v56Register(v22RumorBtn);const v22DiaryBtn=document.createElement('button');v22DiaryBtn.textContent='✧ 날짜별 감정 일지 비교';v22DiaryBtn.onclick=v22DiaryCompare;v56Register(v22DiaryBtn);const v24Btn=document.createElement('button');v24Btn.textContent='✧ 이어지는 선택과 후일담';v24Btn.onclick=v24Board;v56Register(v24Btn);const v24DiaryBtn=document.createElement('button');v24DiaryBtn.textContent='✦ 오늘의 감정 흐름 기록';v24DiaryBtn.onclick=v24Diary;v56Register(v24DiaryBtn);const v24MiguelBtn=document.createElement('button');v24MiguelBtn.textContent='✧ 미겔과의 지난 대답을 돌아본다';v24MiguelBtn.onclick=()=>{const d=v24Data();if(socialProgress().miguelMeetings<2){modal('지난 대답','미겔과 조금 더 대화를 나눈 뒤에 떠올릴 수 있습니다.');return;}if(d.visitedToday['choice_'+state.day]){modal('지난 대답','오늘은 이미 마음을 정했습니다.');return;}d.visitedToday['choice_'+state.day]=true;v18Scene('v24choose','다니엘의 독백','그분을 다시 뵈면 무슨 말을 해야 할까. 형님의 약혼녀라는 사실을 잊지 말아야 한다.\n\n그러나 다니엘은 자신이 내일도 같은 결심을 할 수 있을지 알지 못했다.',[{text:'예의를 지키며 한 걸음 물러서기로 한다.',next:'explore',effects:{trust:1,resolve:1},v24Choice:'miguel',v24Mode:'courtesy'},{text:'아직 마음이 정리되지 않았음을 인정한다.',next:'explore',effects:{affection:1,risk:1},v24Choice:'miguel',v24Mode:'hesitate'}]);render();};v56Register(v24MiguelBtn);const v23Btn=document.createElement('button');v23Btn.textContent='✧ 장기 인연과 감사의 기록';v23Btn.onclick=v23Board;v56Register(v23Btn);const v23EmotionBtn=document.createElement('button');v23EmotionBtn.textContent='✦ 오늘의 마음을 선택한다';v23EmotionBtn.onclick=()=>{if(v23EmotionChoice())render();};v56Register(v23EmotionBtn);const v26Btn=document.createElement('button');v26Btn.textContent='✧ 이어지는 선택 · v26 수첩';v26Btn.onclick=v26Board;v56Register(v26Btn);const v27Btn=document.createElement('button');v27Btn.textContent='✧ 며칠 뒤의 이야기 · v27 수첩';v27Btn.onclick=v27Board;v56Register(v27Btn);const v27GalleryBtn=document.createElement('button');v27GalleryBtn.textContent='✦ 회상 · 인물별 분류';v27GalleryBtn.onclick=v27Gallery;v56Register(v27GalleryBtn);const v29Btn=document.createElement('button');v29Btn.textContent='✧ v29 · 이어지는 선택 수첩';v29Btn.onclick=v29Board;v56Register(v29Btn);const v29GalleryBtn=document.createElement('button');v29GalleryBtn.textContent='✦ 회상 · 통합 검색·분류·정렬';v29GalleryBtn.onclick=v29Gallery;v56Register(v29GalleryBtn);const v28SearchBtn=document.createElement('button');v28SearchBtn.textContent='✦ 회상 갤러리 검색';v28SearchBtn.onclick=v28Search;v56Register(v28SearchBtn);const v28BoardBtn=document.createElement('button');v28BoardBtn.textContent='✧ v28 · 이어지는 이야기';v28BoardBtn.onclick=v28Board;v56Register(v28BoardBtn);const v31Btn=document.createElement('button');v31Btn.textContent='✧ v31 · 이어지는 이야기';v31Btn.onclick=v31Board;v56Register(v31Btn);const v31TimelineBtn=document.createElement('button');v31TimelineBtn.textContent='✦ 사건 연대기 · 인물별 시간순 열람';v31TimelineBtn.onclick=v31Timeline;v56Register(v31TimelineBtn);const v30Btn=document.createElement('button');v30Btn.textContent='✧ v30 · 이어지는 관계 기록';v30Btn.onclick=v30Board;v56Register(v30Btn);const timelineBtn=document.createElement('button');timelineBtn.textContent='✦ 회상 기록을 시간순으로 읽는다';timelineBtn.onclick=v26Timeline;v56Register(timelineBtn);const v25Btn=document.createElement('button');v25Btn.textContent='✧ 장기 서사 · 비밀 부탁 수첩';v25Btn.onclick=v25Board;v56Register(v25Btn);const v25Review=document.createElement('button');v25Review.textContent='✦ 다니엘의 날짜별 회고';v25Review.onclick=v25Retrospect;v56Register(v25Review);const v38Btn=document.createElement('button');v38Btn.textContent='✧ v38 · 관계와 평판';v38Btn.onclick=v38Board;v56Register(v38Btn);const v38Chron=document.createElement('button');v38Chron.textContent='✦ v38 · 선택부터 결말까지';v38Chron.onclick=v38Chronicle;v56Register(v38Chron);const v37Btn=document.createElement('button');v37Btn.textContent='✧ v37 · 관계와 연속 사건';v37Btn.onclick=v37Board;v56Register(v37Btn);const v37ChronBtn=document.createElement('button');v37ChronBtn.textContent='✦ v37 · 통합 선택 경로 연대기';v37ChronBtn.onclick=v37Chronicle;v56Register(v37ChronBtn);const thoughtBtn=document.createElement('button');thoughtBtn.textContent='✦ 잠시 생각에 잠긴다';thoughtBtn.onclick=v17Thought;v56Register(thoughtBtn);LOCATIONS.forEach(loc=>{const b=document.createElement('button');b.textContent='✧ '+loc.name+(ex.visited.includes(loc.id)?' · 방문함':'');b.title=loc.desc;b.onclick=()=>moveTo(loc.id);v56Register(b);});
}


// v56: player-facing navigation. Original actions remain registered by v56CollectExplore.
let v56Entries=[];
let v56View={section:'main',page:0};
function v56Register(button){v56Entries.push(button);}
function v56Go(section,page){v56View={section,page:Math.max(0,page||0)};renderExplore();}
function v56Item(label,action,desc){const b=document.createElement('button');b.textContent=label;b.onclick=action;if(desc)b.title=desc;$('choices').append(b);return b;}
function v56Group(button){const t=button.textContent||'';
 if(LOCATIONS.some(loc=>t.includes(loc.name)))return 'places';
 if(/저장|백업|검사|검증|진단|무결성|복구/.test(t))return 'developer';
 if(/수첩|도감|연대기|회상|기록|일지|현황|갤러리|검색|흐름|서열|관계·|관계와|관계의 파문|후일담|이어지는 이야기|교차 서사|황궁 정치|미겔 AU|미겔 대사|궁중 암투/.test(t))return 'journal';
 return 'events';
}
function v56Friendly(button){return (button.textContent||'').replace(/^[✧✦♛♜♧▣♫]\s*/,'').replace(/\bv\d+\s*[·:：-]?\s*/gi,'').replace(/\s*[·-]\s*수첩$/,' 수첩').trim();}
// v57: progression-aware discovery, with legacy actions retained in the archive.
function v57Kind(b){const t=b.textContent||'';
 if(/미겔|약속|장미/.test(t))return 'miguel';
 if(/알렉|레온하르트|형제/.test(t))return 'alex';
 if(/소문|단서|추리|악보|의뢰|조사|황궁|정치|궁중/.test(t))return 'court';
 return 'other';
}
function v57IsAction(b){const t=b.textContent||'';
 return /30분|다시 청|다음 약속 장소|대답을 돌아본다|소문에 어떻게 대응|오늘의 마음을 선택/.test(t);
}
function v57Unlocked(b){const t=b.textContent||'',ex=exploration();
 if(/다시 청|다음 약속 장소/.test(t))return state.day>=2 && socialProgress().miguelMeetings>=1;
 if(/지난 대답을 돌아본다/.test(t))return socialProgress().miguelMeetings>=2;
 if(/소문에 어떻게 대응|들은 소문의 진위/.test(t))return state.day>=2 && (ex.clues||[]).length>0;
 if(/동선 추리/.test(t))return (ex.clues||[]).length>=1;
 if(/오늘의 마음을 선택/.test(t))return state.day>=2;
 if(/악보 사건/.test(t))return !questProgress().done;
 return true;
}
function v56Visible(button,group){
 if(group==='places'||group==='developer'||group==='archive')return true;
 return v57Unlocked(button);
}
function v57Unique(items){const seen=new Set();return items.filter(b=>{const key=v56Friendly(b).replace(/\s*· 방문함$/,'').replace(/\s*\([^)]*\)$/,'').replace(/\s+/g,' ').trim();if(seen.has(key))return false;seen.add(key);return true;});}
// v58: UI-only discovery metadata; stored in its own namespace for old-save compatibility.
function v58Data(){const d=state.v58??(state.v58={actions:{},lastDay:state.day});if(!d.actions||typeof d.actions!=='object')d.actions={};return d;}
function v58Key(b){return v56Friendly(b).replace(/\s+/g,' ').trim();}
function v58Priority(b,section){const t=b.textContent||'',ex=exploration();let score=0;
 if(/30분|약속|대응|추리/.test(t))score+=15;
 if(/약속/.test(t)&&socialProgress().miguelMeetings)score+=15;
 if(/소문|단서|조사/.test(t)&&(ex.clues||[]).length)score+=12;
 if(/오늘의 마음/.test(t))score+=8;
 if(section==='places'){const loc=LOCATIONS.find(l=>t.includes(l.name));if(loc){const visits=(ex.visited||[]);if(!visits.includes(loc.id))score+=20;}}
 return score;
}
function v58Eligible(b,section){if(!v56Visible(b,section))return false;
 if(['miguel','alex','court'].includes(section)){
  const t=b.textContent||'';if(/30분/.test(t)&&exploration().turn>=7)return false;
  if(/오늘의 마음을 선택/.test(t)&&v58Data().actions['day:'+state.day+':'+v58Key(b)])return false;
 }
 return true;
}
function v58Order(items,section){return v57Unique(items).filter(b=>v58Eligible(b,section)).map((b,i)=>({b,i,p:v58Priority(b,section)})).sort((a,b)=>b.p-a.p||a.i-b.i).map(x=>x.b);}
function v57EntriesFor(section){
 if(section==='places')return v58Order(v56Entries.filter(b=>v56Group(b)==='places'),section);
 if(section==='developer')return v56Entries.filter(b=>v56Group(b)==='developer');
 if(section==='archive')return v56Entries.filter(b=>v56Group(b)!=='places'&&v56Group(b)!=='developer');
 if(section==='miguel'||section==='alex'||section==='court')return v58Order(v56Entries.filter(b=>v56Group(b)==='events'&&v57Kind(b)===section&&v57IsAction(b)&&v57Unlocked(b)),section);
 if(section==='relations')return v57Unique(v56Entries.filter(b=>v56Group(b)==='journal'&&/관계|현황|평판|삼형제|약혼/.test(b.textContent||'')).reverse()).slice(0,5);
 if(section==='chronicles')return v57Unique(v56Entries.filter(b=>v56Group(b)==='journal'&&/회상|연대기|갤러리|시간순/.test(b.textContent||'')).reverse()).slice(0,5);
 if(section==='endings')return v57Unique(v56Entries.filter(b=>/엔딩 도감/.test(b.textContent||''))).slice(0,2);
 return [];
}
function v56ShowEntries(items,title,section){
 const pageSize=3,maxPage=Math.max(0,Math.ceil(items.length/pageSize)-1);v56View.page=Math.min(v56View.page,maxPage);
 $('line').textContent=title+'\n\n원하는 항목을 선택하세요. ('+(items.length?((v56View.page*pageSize+1)+'–'+Math.min(items.length,(v56View.page+1)*pageSize)):'0')+' / '+items.length+')';
 const slice=items.slice(v56View.page*pageSize,(v56View.page+1)*pageSize);
 slice.forEach(b=>{const clone=document.createElement('button');clone.textContent=v56Friendly(b);clone.title=b.title||'';clone.onclick=()=>{if(['miguel','alex','court'].includes(section))v58Data().actions['day:'+state.day+':'+v58Key(b)]=true;v56View={section:'main',page:0};b.click();};$('choices').append(clone);});
 if(v56View.page>0)v56Item('‹ 이전 항목',()=>v56Go(section,v56View.page-1));
 if(v56View.page<maxPage)v56Item('다음 항목 ›',()=>v56Go(section,v56View.page+1));
 v56Item('← 돌아가기',()=>v56Go(section==='relations'||section==='chronicles'||section==='endings'||section==='developer'||section==='archive'?'journal':section==='miguel'||section==='alex'||section==='court'?'events':'main',0));
}
function renderExplore(){
 if(v49Finished()){v49RenderCompleted();return;}
 $('choices').replaceChildren();v56Entries=[];v56CollectExplore();$('choices').replaceChildren();
 const ex=exploration(),section=v56View.section;
 if(section==='main'){
  $('line').textContent='DAY '+state.day+' · 황궁 · '+CLOCK_LABELS[Math.min(ex.turn,7)]+'\n남은 이동 '+Math.max(0,7-ex.turn)+' / 7\n\n황궁에는 저마다의 밤을 보내는 사람들이 있습니다. 어디로 향하시겠습니까?';
  v56Item('♛ 장소 이동',()=>v56Go('places',0));
  v56Item('✦ 인물과 사건',()=>v56Go('events',0));
  v56Item('✧ 회상과 이야기 기록',()=>v56Go('journal',0));
  v56Item('♧ 하루를 정리하기',()=>v56Go('daily',0));return;
 }
 if(section==='events'){
  $('line').textContent='인물과 사건\n\n현재 진행에 맞는 사건은 장소를 방문하면 자연스럽게 발생합니다. 아래에서는 진행 가능한 특별 행동을 살펴볼 수 있습니다.';
  v56Item('✦ 미겔과의 인연',()=>v56Go('miguel',0));
  v56Item('♛ 알렉스와 가문의 일',()=>v56Go('alex',0));
  v56Item('✧ 궁중의 소문과 사건',()=>v56Go('court',0));
  v56Item('← 돌아가기',()=>v56Go('main',0));return;
 }
 if(section==='daily'){
  $('line').textContent='하루의 끝\n\n잠시 마음을 정리하거나 다음 날을 준비할 수 있습니다.';
  const thought=v56Entries.find(b=>(b.textContent||'').includes('잠시 생각에 잠긴다'));
  if(thought)v56Item('오늘의 마음을 돌아본다',()=>{v56View={section:'main',page:0};thought.click();});
  const diary=v56Entries.find(b=>(b.textContent||'').includes('감정 일지'));
  if(diary)v56Item('감정 일지 살펴보기',()=>{v56View={section:'main',page:0};diary.click();});
  v56Item('← 돌아가기',()=>v56Go('main',0));return;
 }
 if(section==='journal'){
  $('line').textContent='이야기 기록\n\n인물과 사건의 기록을 열람할 수 있습니다.';
  v56Item('✦ 인물·관계 기록',()=>v56Go('relations',0));
  v56Item('✧ 회상·연대기',()=>v56Go('chronicles',0));
  v56Item('♛ 엔딩 도감',()=>v56Go('endings',0));
  v56Item('← 돌아가기',()=>v56Go('main',0));return;
 }
 if(section==='archive'){
  const items=v57EntriesFor('archive');
  v56ShowEntries(items,'이전 사건·기록 전체 보관함',section);return;
 }
 const items=v57EntriesFor(section).filter(b=>v58Eligible(b,section));
 const titles={places:'황궁의 장소',miguel:'미겔과의 인연',alex:'알렉스와 가문의 일',court:'궁중의 소문과 사건',relations:'인물·관계 기록',chronicles:'회상·연대기',endings:'엔딩 도감',developer:'개발자 도구'};
 if(!items.length && ['miguel','alex','court'].includes(section)){
  $('line').textContent='지금은 진행할 특별 행동이 없습니다.\n\n장소를 방문하거나 날짜가 지나면 새로운 만남과 사건이 열립니다.';
  v56Item('← 돌아가기',()=>v56Go('events',0));return;
 }
 v56ShowEntries(items,titles[section]||'이야기',section);
}
function v57DeveloperMenu(){
 modal('개발자 도구','기존 저장·백업 검사와 이전 버전별 기록은 아래 보관함에서 확인할 수 있습니다.');
 const content=$('modalContent');
 const btn=document.createElement('button');btn.textContent='이전 버전 기록·진단 열기';btn.onclick=()=>{closeModal();if(state.node==='explore'){v56Go('archive',0);}else{modal('안내','황궁 탐색 중에 개발자 보관함을 열 수 있습니다.');}};content.append(btn);
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
function render(){if(v49Finished()){v49RenderCompleted();return;}const node=NODES[state.node]||NODES.intro;renderStage(node);$('speaker').textContent=node.speaker;$('line').textContent=node.text;$('day').textContent='DAY '+state.day;$('chapter').textContent=node.chapter||'PROLOGUE';$('choices').replaceChildren();$('nextBtn').classList.toggle('hidden',!!node.choices);if(node.explore){renderExplore();return;}(node.choices||[]).forEach(choice=>{const b=document.createElement('button');b.textContent='✧ '+choice.text;b.onclick=()=>{if(choice.action==='home'){show('home');return;}if(choice.action==='restartExplore'){resetNight();state.node='explore';render();return;}if(choice.action==='nextDay'){nextDay();return;}if(choice.reset)state=fresh();else{state.history.push(state.node);for(const [k,v] of Object.entries(choice.effects||{}))if(k in state.stats)state.stats[k]=Math.max(0,Math.min(100,state.stats[k]+v));}if(choice.v16Quest){if(choice.v17Ending)v17QuestEnding(choice.v16Quest,choice.v17Ending==='help'?'finish_help':'finish_quiet');const q=v16Data().quests[choice.v16Quest];if(q){if(choice.v16Mode==='advance'){q.step=Math.min(2,q.step+1);q.choice='accept';}else if(choice.v16Mode==='decline'){q.choice='decline';}else if(choice.v16Mode==='finish'){q.done=true;v16Data().memories.push({id:'quest_'+choice.v16Quest,title:V16_QUESTS.find(x=>x.id===choice.v16Quest)?.title||'황궁 사건',text:'황궁의 작은 의뢰를 해결했다.',day:state.day});}}}if(choice.v38Miguel||choice.v38Alex||choice.v38Npc)v38Choice(choice);v39Choice(choice);v40Choice(choice);v41Choose(choice);v42Choice(choice);v43Choice(choice);v44Choice(choice);v45Choice(choice);v46Choice(choice);v47Choice(choice);v51Choice(choice);v52Choice(choice);v53Choice(choice);v55Choice(choice);if(choice.v37Miguel||choice.v37Alex||choice.v37Npc)v37Choice(choice);if(choice.v36Miguel||choice.v36Alex||choice.v36Npc)v36Choice(choice);if(choice.v35Miguel||choice.v35Alex||choice.v35Npc)v35Choice(choice);if(choice.v34Miguel||choice.v34Alex||choice.v34Npc)v34Choice(choice);if(choice.v33Miguel||choice.v33Alex||choice.v33Npc)v33Choice(choice);if(choice.v32Miguel||choice.v32Alex||choice.v32Npc)v32Choice(choice);if(choice.v31Miguel||choice.v31Alex||choice.v31Npc)v31Choice(choice);if(choice.v30Miguel||choice.v30Alex||choice.v30Npc)v30Choice(choice);if(choice.v28Feeling||choice.v28Alex||choice.v28Npc)v28OnChoice(choice);if(choice.v29Miguel||choice.v29Alex||choice.v29Npc)v29OnChoice(choice);if(choice.v25Secret||choice.v25Bond||choice.v25Alex){v25Outcome(choice);v26Outcome(choice);v27OnChoice(choice);}if(choice.v26Secret){const q=v26Data().secret[choice.v26Secret];if(q)q.response=choice.v26Mode;}if(choice.v27Alex){v26Data().alex.trust=Math.max(-10,Math.min(10,v26Data().alex.trust+(choice.v27Alex==='repair'?2:-1)));}if(choice.v26Alex){v26Data().alex.trust=Math.max(-10,Math.min(10,v26Data().alex.trust+(choice.v26Alex==='apologize'?1:0)));}if(choice.v24Choice)v24Choice(choice.v24Choice,choice.v24Mode);if(choice.v23EmotionChoice){const d=v23Data();d.emotionChoices[choice.v23EmotionChoice]={day:state.day,mode:choice.v23Emotion};v23Remember('emotion_'+choice.v23EmotionChoice,'다니엘의 선택 · DAY '+state.day,NODES.explore_v18_event?.text||'다니엘은 자신의 마음을 돌아보았다.');}if(choice.v23Alex){v23Data().lastAlexChoice=choice.v23Alex;}if(choice.v22Rumor){const d=v22Data();d.rumorResponses[choice.v22Rumor]={day:state.day,mode:choice.v22RumorMode};const change=choice.v22RumorMode==='correct'?-2:choice.v22RumorMode==='protect'?-1:0;v20Data().rumorImpact=Math.max(-20,Math.min(20,v20Data().rumorImpact+change));v22Record('rumor_'+choice.v22Rumor,'소문에 대한 다니엘의 대응',NODES.explore_v18_event?.text||'소문을 조심스럽게 다루었다.','기타');}if(choice.v22Npc){v22Data().npcDeep[choice.v22Npc].choice=choice.v22NpcMode;const npc=v19Data().npc[choice.v22Npc];if(npc&&choice.v22NpcMode==='warm')npc.rapport=Math.min(10,(npc.rapport||0)+1);}if(choice.v22Alex){v22Data().lastAlexResponse=choice.v22Alex;if(choice.v22Alex==='hesitate')socialProgress().alexTension=Math.min(100,socialProgress().alexTension+1);}if(choice.v22Choice){v22Data().lastPromiseResponse=choice.v22Choice;}if(choice.v21Echo){v21Data().lastEchoChoice=choice.v21Echo;}if(choice.v20Errand){const q=v20Data().errands[choice.v20Errand];if(q){q.status=choice.v20ErrandMode;const def=V20_ERRANDS[choice.v20Errand];v20Record('errand_'+choice.v20Errand,def.title,choice.v20ErrandMode==='help'?def.good:'다니엘은 정중히 사양하고 자신의 일을 계속했다.','의뢰');if(choice.v20ErrandMode==='help'){const npc=v19Data().npc[choice.v20Errand];if(npc)npc.rapport=Math.min(10,npc.rapport+1);}}}if(choice.v20Renew){v20Data().promiseRenewals++;v18Data().promise={day:state.day+1,loc:'terrace',turn:3,status:'accepted'};v19Data().promiseAfter=null;v20Record('renew_'+state.day,'다시 청한 약속','다니엘은 다음 날 테라스에서 인사할 기회를 다시 청했다.','관계');}if(choice.v20Alex){const d=v20Data();d.lastAlexChoice=choice.v20Alex;if(choice.v20Alex==='confess')socialProgress().alexTension=Math.min(100,socialProgress().alexTension+1);v20Record('alex_'+state.day+'_'+exploration().turn,'형 앞에서의 대답',NODES.explore_v18_event?.text||'형과의 짧은 대화를 떠올렸다.','관계');}if(choice.v18Emotion)v18Data().emotion=Math.max(-10,Math.min(10,v18Data().emotion+choice.v18Emotion));if(choice.v19Feeling)v19Data().feelings=Math.max(-10,Math.min(10,v19Data().feelings+choice.v19Feeling));if(choice.v19Npc){const npc=v19Data().npc[choice.v19Npc];if(npc){npc.rapport=Math.min(10,(npc.rapport||0)+(choice.v19Rapport||0));if(npc.rapport===2)v19Record('npc_'+choice.v19Npc,'황궁의 인연 · '+V19_NPC_PROFILES[choice.v19Npc].name,V19_NPC_PROFILES[choice.v19Npc].warm,'관계');}}if(choice.v19Rumor){const r=v19Data().rumors.find(x=>x.id===choice.v19Rumor&&x.day===state.day);if(r)r.verified=true;}if(choice.v18Promise){v18Data().promise=choice.v18Promise==='accept'?{day:state.day+1,loc:'terrace',turn:3,status:'accepted'}:{day:state.day+1,status:'declined'};}if(choice.v18Serial!==undefined){const x=v18Data().serial[choice.v18Serial];if(x){if(choice.v18Mode==='advance'){if(x.stage===0)x.startDay=state.day;x.stage=Math.min(2,x.stage+1);}else if(choice.v18Mode.startsWith('finish')){x.done=true;const q=V18_SERIAL[choice.v18Serial];v18Remember('v18_serial_'+choice.v18Serial,q.title+' · 해결',q.end,'의뢰');}}}if(choice.questStep){const q=questProgress();q.step=Math.max(q.step,choice.questStep);if(q.step>=3){q.done=true;recordGallery('quest_done_v15');}}if(choice.ambientReply){NODES.explore_ambient_reply={speaker:'SYSTEM',text:choice.ambientReply,chapter:'CHAPTER 01',next:'explore'};}state.node=choice.v17Ending?'explore_v17_ending':choice.next;render();};$('choices').append(b);});}
function fresh(){return{node:'intro',day:1,social:{miguelMeetings:0,alexTension:0},stats:{affection:0,trust:0,resolve:0,reputation:50,risk:0},history:[],exploration:{turn:0,clues:[],visited:[],found:false,sceneCounts:{}}};}
function save(){try{v41SafeBackup();localStorage.setItem(SAVE_KEY,JSON.stringify({...state,ambientSnapshot:['explore_ambient','explore_ambient_reply','explore_special_v14','explore_repeat_v14','explore_clue_v14','explore_quest_v15','explore_v16_quest','explore_v16_bond','explore_v16_alex','explore_v17_bond','explore_v17_thought','explore_v17_ending','explore_v18_event'].includes(state.node)?{scene:NODES.explore_ambient,reply:NODES.explore_ambient_reply,special:NODES.explore_special_v14,repeat:NODES.explore_repeat_v14,clue:NODES.explore_clue_v14,quest:NODES.explore_quest_v15,v16quest:NODES.explore_v16_quest,v16bond:NODES.explore_v16_bond,v16alex:NODES.explore_v16_alex,v17bond:NODES.explore_v17_bond,v17thought:NODES.explore_v17_thought,v17ending:NODES.explore_v17_ending,v18event:NODES.explore_v18_event}:null}));modal('저장 완료','현재 진행 상황을 이 브라우저에 저장했습니다.');}catch{modal('저장 실패','브라우저 저장 공간을 사용할 수 없습니다.');}}
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
   '중세 AU에서는 부모가 모두 생존한다. 사교에 능하고 세련되며 계산이 빠르지만 심술궂지 않다. 공석에서는 격식 있는 존댓말을, 다니엘과 단둘이 있을 때에는 ‘이리 오렴’ 같은 온화하고 우아한 연상 반말을 사용한다.',
   '저택에 갇히다시피 성장해 아카데미나 기사단에 몸담지 못했다. 얼굴보다 복장, 체격, 걸음걸이, 행동으로 사람을 구별한다.',
   '코트리먼 영지는 풍요롭고 노란 장미화원이 유명하다. 알렉스 레온하르트와 현재 약혼 중이며 약혼자를 ‘알렉’이라 부른다. 둘은 키스와 잠자리를 나눈 사이로, 서로에게 거부감이 없는 편안하고 합리적인 관계다. 열렬한 사랑이나 불행한 약혼으로 단정하지 않는다.',
   '외관: 회갈색 머리카락을 정교하게 틀어 올렸으며, 가늘고 차분한 눈매와 작은 체구가 특징이다. 연보라색 드레스, 짙은 보라색 숄, 금빛 장신구와 노란 장미를 지닌 모습이 공식 일러스트에 등장한다.'
  ]},
  {name:'알렉스 레온하르트 · Alex Leonhard',summary:'레온하르트 백작가의 차남 · 다니엘의 둘째 형 · 미겔의 약혼자',details:['알렉은 약칭이며 본명은 알렉스 레온하르트다. 귀족 사회의 처세에 능하고 약간 능글맞으며 어른의 여유가 있다.','가문의 명예와 이익을 중시하되, 차남이라는 이유로 열등감이나 후계 경쟁에 집착하는 인물은 아니다.','미겔과는 서로 거부감 없는 편안한 약혼 관계이며 이미 사적인 친밀함도 나누었다. 그의 사랑의 깊이는 확정되지 않았다.']},{name:'레온하르트가 장남',summary:'첫째 · 이름과 성격 및 정치적 역할 미정',details:['형제 중 첫째가 존재한다는 사실 외의 세부 사항은 확정하지 않는다.']}
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
function settings(){const wrap=document.createElement('div');const p=document.createElement('p');p.className='hint';p.textContent='DELHARSA : 보라색의 밤 · 황궁 일상 125종 · 날짜별 특별 이벤트 · v24 장기 결과와 감정 흐름\n게임은 브라우저의 로컬 저장소에 진행 상황을 보관합니다.';wrap.append(p);const btn=document.createElement('button');btn.textContent='저장 데이터 초기화';btn.onclick=()=>{if(confirm('저장 데이터를 삭제할까요?')){localStorage.removeItem(SAVE_KEY);modal('초기화 완료','저장 데이터가 삭제되었습니다.');}};wrap.append(btn);const dev=document.createElement('button');dev.textContent='⚙ 개발자 도구 · 이전 기록';dev.onclick=()=>{closeModal();if(state.node==='explore'){v56Go('archive',0);}else{modal('개발자 도구','황궁 탐색 화면에서 열 수 있습니다.');}};wrap.append(dev);modal('설정',wrap);}
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
 ['v22 장소별 약속·인연·갈등·일지 비교','16_v22_장소별약속_인연심화_소문대응_감정비교.md'],
 ['v23 장기 관계·NPC 선물·감정 선택','17_v23_장기관계_후일담_감정선.md'],
 ['v24 장기 결과·기억·선물 후일담·감정 흐름','18_v24_장기결과_기억_감정흐름.md'],
 ['v25 장기 관계·비밀 부탁·형제 갈등·회고','19_v25_장기관계_비밀부탁_형제갈등_회고.md'],
 ['v26 장기 선택 결과·비밀 부탁 분기·시간순 회상','20_v26_선택후속_비밀부탁_시간순회상.md'],
 ['v27 장기 감정·선택 후속·인물별 회상','21_v27_감정분기_인연_형제신뢰_인물회상.md'],
 ['v28 감정·형제·NPC 특별 사건·회상 검색','22_v28_감정분기_형제관계_NPC사건_회상검색.md'],
 ['v29 장기 결과·형제 후속·NPC 보상·회상 필터','23_v29_장기결과_형제후속_NPC보상_회상필터.md'],
 ['v30 관계 선택·형제 신뢰·NPC 후일담·날짜별 서사','24_v30_관계선택_형제신뢰_NPC후일담.md'],
 ['v31 연속 장면·형제 신뢰·인연·연대기','25_v31_장기서사_인연_사건연대기.md'],
 ['v32 관계 상태·특별 재회·상세 연대기','26_v32_관계상태_특별재회_상세연대기.md'],
 ['v33 관계 대화·형제 갈등·황궁 평판·연결 연대기','27_v33_관계대화_형제갈등_황궁평판_연결연대기.md'],
 ['v34 장기 재회·형제 관계·평판·선택 경로','28_v34_장기재회_형제관계_평판_선택경로.md'],
 ['v35 고유 재회·형제 결과·평판·다단계 선택 추적','29_v35_재회_형제결과_평판_다단계연대기.md'],
 ['v36 장기 감정·형제 신뢰·통합 연대기','30_v36_장기감정_형제신뢰_통합연대기.md'],
 ['v37 장기 재회·형제 관계·평판·결말 경로','31_v37_특별재회_형제전환_황궁평판_선택경로.md'],
 ['v38 재회 이후·형제 갈등·평판 연쇄·통합 연대기','32_v38_재회이후_형제갈등_평판연쇄_연대기.md'],
 ['v39 장기 관계·후속 연쇄·통합 선택 경로','33_v39_장기관계_형제결과_평판후속_통합연대기.md'],
 ['v40 관계 전환·평판 관계망·통합 연대기','34_v40_관계전환_평판관계망_통합연대기.md'],
 ['v41 감정적 갈등·형제 신뢰·소문 확산·저장 복구','35_v41_감정갈등_형제결과_소문확산_저장복구.md'],
 ['v42 장기 관계·소문 관계망·선택 연대기·저장 검증','36_v42_장기관계_소문관계망_연대기_복구검증.md'],
 ['v43 장기 재회·형제 화해·소문·저장 점검','37_v43_장기재회_형제화해_소문후속_저장점검.md'],
 ['v44 관계 전환·형제 결과·소문 관계망·선택 경로','38_v44_관계전환_형제결과_소문연쇄_선택경로.md'],
 ['v45 관계의 여운·형제 대화·소문 관계망·백업 검증','39_v45_관계여운_형제대화_소문관계망_백업검증.md'],
 ['v46 교차 서사·소문 파급·다중 선택 경로','40_v46_교차서사_소문파급_다중분기_저장검증.md'],
 ['v47 복합 관계·후일담·분기 탐색·저장 검사','41_v47_복합관계_후일담_분기탐색_저장검사.md'],
 ['v48 정식 엔딩·엔딩 도감·다회차','42_v48_정식엔딩_도감_다회차.md'],
 ['v49 전용 에필로그·단일 엔딩·회차 계승','43_v49_에필로그_회차종료_엔딩도감.md'],
 ['v50 엔딩 텍스트 연출·다회차·도감 상세·저장 진단','44_v50_엔딩연출_다회차_도감상세_저장진단.md'],
 ['v51 미겔 AU 말투·공사 구분·정원 후일담','45_v51_미겔_AU_말투_사교계_후일담.md'],
 ['v52 미겔 대사 감사·사적 화법·재회','46_v52_미겔_대사감사_공사구분_재회.md'],
 ['v53 황궁 정치·가문 이해관계·의전','47_v53_황궁정치_가문이해_의전_후속.md'],
 ['v54 삼형제 서열·알렉스·미겔 약혼','48_v54_삼형제_알렉스_미겔_약혼.md'],
 ['v55 궁중 암투·차남 알렉스·약혼 관계','49_v55_궁중암투_알렉스_미겔_다니엘.md'],
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


// v59: presentation-only navigation; existing nodes, choices, saves and endings stay intact.
(function(){
 const move=document.getElementById('moveBtn'),settingsButton=document.getElementById('gameSettingsBtn');
 move.addEventListener('click',()=>{if(state.node==='explore'){v56Go('places',0);}else{modal('이동 안내','현재 대화를 마친 뒤 장소를 선택할 수 있습니다.');}});
 settingsButton.addEventListener('click',()=>{
  const wrap=document.createElement('div');wrap.className='modal-actions';
  [['저장',save],['불러오기',load],['인물 도감',characters],['회상·엔딩 도감',gallery],['세부 설정',settings],['타이틀로',()=>{closeModal();show('home');}]].forEach(([name,fn])=>{const b=document.createElement('button');b.textContent=name;b.onclick=()=>{closeModal();fn();};wrap.append(b);});
  modal('설정',wrap);
 });
 const journalButton=document.getElementById('journalBtn');
 journalButton.onclick=()=>{
  const wrap=document.createElement('div');wrap.className='modal-actions';
  [['이야기 기록',journal],['인물 도감',characters],['회상·엔딩 도감',gallery],['설정 자료실',loreLibrary]].forEach(([name,fn])=>{const b=document.createElement('button');b.textContent=name;b.onclick=()=>{closeModal();fn();};wrap.append(b);});
  modal('기록',wrap);
 };
 let page=0,updating=false;
 const choices=document.getElementById('choices'),pager=document.getElementById('choicePager');
 function paginate(reset){if(updating)return;updating=true;
  if(reset)page=0;
  const buttons=Array.from(choices.children).filter(e=>e.tagName==='BUTTON');
  const pages=Math.max(1,Math.ceil(buttons.length/3));page=Math.max(0,Math.min(page,pages-1));
  buttons.forEach((b,i)=>{b.hidden=!(i>=page*3&&i<(page+1)*3);});
  pager.replaceChildren();pager.classList.toggle('hidden',pages===1);
  if(pages>1){
   const prev=document.createElement('button');prev.textContent='‹ 이전';prev.disabled=page===0;prev.onclick=()=>{page--;paginate(false);};pager.append(prev);
   const label=document.createElement('span');label.textContent=(page+1)+' / '+pages;pager.append(label);
   const next=document.createElement('button');next.textContent='다음 ›';next.disabled=page===pages-1;next.onclick=()=>{page++;paginate(false);};pager.append(next);
  }
  updating=false;
 }
 const observer=new MutationObserver(mutations=>{if(mutations.some(m=>m.type==='childList'))paginate(true);});
 observer.observe(choices,{childList:true});paginate(true);
 // v61: bundled backgrounds, mapped by actual location and scene context.
 const bg=document.getElementById('stage');
 const originalStage=renderStage;
 const BG_FILES=new Set(['terrace','rose_garden','grand_hall','leonhardt_manor','ballroom_balcony','royal_bedroom','library','lion_study','council','ballroom','greenhouse','corridor','tea_salon','palace','garden','manor']);
 function sceneBackground(node){
  const id=String(state.node||'');
  const loc=String((state.exploration&&state.exploration.location)||'');
  const desc=String(node.chapter||'')+' '+String(node.text||'').slice(0,180);
  const all=id+' '+desc;
  if(/침실|bedroom|bedchamber/.test(all))return 'royal_bedroom';
  if(/사자 문장|lion_study/.test(all))return 'lion_study';
  if(/티살롱|차를 마시|tea_salon/.test(all))return 'tea_salon';
  if(/발코니|balcony/.test(all))return 'ballroom_balcony';
  if(/온실|greenhouse/.test(all))return 'greenhouse';
  if(/도서관|서재|서고|library|study/.test(all))return 'library';
  if(/의회|회의|council|협상/.test(all))return 'council';
  if(/백작가|레온하르트 저택|manor/.test(all))return 'leonhardt_manor';
  if(/테라스|terrace/.test(all))return 'terrace';
  if(/회랑|복도|corridor/.test(all))return 'corridor';
  if(/정원|장미|garden/.test(all))return 'rose_garden';
  if(/연회|무도회|ballroom|ball_/.test(all))return 'ballroom';
  if(id==='explore'||/explore/.test(id)){
   if(loc==='garden')return 'rose_garden';
   if(loc==='terrace')return 'terrace';
   if(loc==='corridor')return 'corridor';
   if(loc==='drawing')return 'tea_salon';
   if(loc==='hall')return 'grand_hall';
  }
  return 'grand_hall';
 }
 renderStage=function(node){
  originalStage(node);
  const name=sceneBackground(node);
  bg.style.backgroundImage='linear-gradient(180deg,#140d1d12,#130d1a08 55%,#140b1b66),url("assets/backgrounds/'+name+'.webp")';
  bg.dataset.background=name;
 };

})();

// v60: small-screen accessibility and viewport stability; no save schema changes.
(function(){
 const dialog=document.querySelector('#game .dialogue');
 const choices=document.getElementById('choices');
 const stage=document.getElementById('stage');
 const modalRoot=document.getElementById('modal');
 if(!dialog||!choices||!stage||!modalRoot)return;
 // Maintain a stable scroll position when a new choice page or dialogue is rendered.
 const observer=new MutationObserver(()=>{dialog.scrollTop=0;});
 observer.observe(choices,{childList:true});
 // Keep modal focus inside the dialog while open; Escape closes it.
 document.addEventListener('keydown',e=>{
  if(modalRoot.classList.contains('hidden'))return;
  if(e.key==='Escape'){e.preventDefault();document.getElementById('closeModal').click();return;}
  if(e.key!=='Tab')return;
  const focusable=[...modalRoot.querySelectorAll('button:not(:disabled),input:not(:disabled),select:not(:disabled),textarea:not(:disabled),a[href]')].filter(x=>x.getClientRects().length);
  if(!focusable.length)return;
  if(e.shiftKey&&document.activeElement===focusable[0]){e.preventDefault();focusable.at(-1).focus();}
  else if(!e.shiftKey&&document.activeElement===focusable.at(-1)){e.preventDefault();focusable[0].focus();}
 });
})();
