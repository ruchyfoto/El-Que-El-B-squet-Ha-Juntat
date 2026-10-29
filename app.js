(function(){
'use strict';
var CATS=[
 {k:'detall',n:'Un detall',p:1,e:'Bon dia, que tinguis un dia genial'},
 {k:'maca',n:'Una cosa maca',p:2,e:'Avui t\'he trobat molt guapa o guapo'},
 {k:'molt',n:'Molt maca',p:3,e:'Em fas riure com ningú'},
 {k:'cor',n:'Al cor',p:5,e:'Et trobo a faltar i et vull molt'},
 {k:'peli',n:'De pel·lícula',p:10,e:'M\'ha fet plorar d\'alegria'}
];
var REPTE={k:'repte',n:'Repte de la setmana',p:5};
var CHALL=[
 'Digues-li una cosa que t\'ha fet somriure aquesta setmana.',
 'Recorda un moment que heu viscut a la pista.',
 'Digues una cosa que admires de la teva parella.',
 'Explica què és el que més trobes a faltar.',
 'Envia una nota de veu només per dir una cosa maca.',
 'Digues què t\'agrada del seu riure o de la seva manera de ser.',
 'Descriu un pla que vols fer quan us torneu a veure.',
 'Dona les gràcies per una cosa petita que ha fet per tu.',
 'Explica una cosa que has après gràcies a ella o ell.',
 'Escriu tres motius pels quals t\'ha alegrat el dia.',
 'Explica quin és el teu record preferit juntes o junts.',
 'Posa-li un renom nou i explica per què.'
];
var STEP=50;
var Q=[
 "Quina cançó t'ha acompanyat més aquesta setmana?",
 "Si demà tinguessis el dia lliure, què faries?",
 "Quin és el pitjor consell que t'han donat mai?",
 "Quina és la teva excusa preferida per no fer exercici?",
 "Quin superpoder petit i inútil voldries tenir?",
 "Què has menjat avui que t'hagi fet feliç?",
 "Quin va ser el teu millor partit o entrenament de la temporada?",
 "Quina és la cosa més rara que has fet per diversió?",
 "Si poguessis viure un any a qualsevol ciutat, quina triaries?",
 "Quin és el record més vergonyós que ara et fa riure?",
 "Quina sèrie o pel·lícula pots veure mil vegades?",
 "Què t'ha sorprès avui?",
 "Quina és la millor cosa que t'ha passat aquesta setmana?",
 "Si fossis d'un altre esport, quin series?",
 "Quina és la manera més ràpida de posar-te de mal humor?",
 "I la manera més ràpida de posar-te de bon humor?",
 "Quin sobrenom tens o has tingut que et faci gràcia?",
 "Quin menjar no tornaries a tastar mai més?",
 "Quin viatge tens pendent de fer?",
 "Quin és el teu hàbit més estrany?",
 "Què t'agradaria aprendre a fer aquest any?",
 "Quina és la millor cosa que has comprat aquest mes?",
 "Descriu el teu dia amb tres paraules.",
 "Quina mania teva creus que fa més gràcia als altres?",
 "Si fossis entrenador o entrenadora, quin seria el teu lema?",
 "Quina app del mòbil no podries esborrar?",
 "Quin és el millor lloc on has dormit mai?",
 "Qui o què t'ha fet riure més avui?",
 "Quin va ser el teu primer ídol esportiu?",
 "Què no pot faltar mai en un dia perfecte?",
 "Amb qui soparíes, viu o mort, si poguessis triar qualsevol persona?",
 "Quina cosa petita et fa sentir millor quan estàs fet pols?",
 "Quina és la teva pitjor habilitat?",
 "Què faries si demà guanyessis la loteria?",
 "Quin és el millor detall que algú ha tingut amb tu?",
 "Quina és la cosa que més trobes a faltar ara mateix?",
 "Quin animal series i per què?",
 "Quin és el teu lloc preferit de la teva ciutat?",
 "Quina és la cosa més útil que saps fer?",
 "Quina jugada de bàsquet no oblidaràs mai?",
 "Quin plat posaries al teu menú perfecte?",
 "Quina paraula o frase dius massa?",
 "Quin és el millor regal que has rebut mai?",
 "Si el teu dia fos un partit, quin seria el marcador i per què?",
 "Quin mal costum t'agradaria deixar?",
 "Quin és el teu proper petit repte?",
 "Quina cosa et fa una mica de por, però t'agradaria provar?",
 "Quin és el millor moment del teu dia?",
 "Digues una cosa que has après aquesta setmana."
];
var T=[
 ["Platja","Muntanya"],["Pizza","Sushi"],["Matinar","Vetllar"],["Gat","Gos"],["Dolç","Salat"],
 ["Cinema","Sèrie"],["Estiu","Hivern"],["Llegir","Veure una pel·li"],["Cafè","Te"],["Xocolata","Gelat"],
 ["Pla tranquil","Pla improvisat"],["Ciutat","Poble"],["Cuinar","Demanar a domicili"],["Música d'estudi","Silenci total"],["Davant","Defensa"],
 ["Entrenar sol","Entrenar en equip"],["Anar a la platja d'hora","Anar-hi a la tarda"],["Pa amb tomàquet","Sandvitx"],["Truita de patates amb ceba","Truita de patates sense ceba"],["Tren","Cotxe"],
 ["Avió","Autocar"],["Tots els partits a casa","Tots els partits a fora"],["Pel·lícula de por","Comèdia"],["Dutxa","Bany"],["Aigua amb gas","Aigua sense gas"],
 ["Pasta","Arròs"],["Pluja","Calor"],["Anar de càmping","Dormir en un hotel"],["Videojocs","Jocs de taula"],["Missatge de text","Nota de veu"],
 ["Trucada","Videotrucada"],["Fer la maleta amb temps","Fer la maleta a l'últim moment"],["Esmorzar fort","Només un cafè"],["Ser el més ràpid","Ser el més precís"],["Marcar el tir guanyador","Fer l'última assistència"],
 ["Concert","Festival"],["Museu","Parc d'atraccions"],["Caminar","Córrer"],["Entrepà de truita","Entrepà de pernil"],["Gelat de vainilla","Gelat de nata"],
 ["Pelar-te de fred","Morir-te de calor"],["Tenir sempre raó","Ser feliç"],["Viure al mar","Viure a la muntanya"],["Mai més internet","Mai més música"],["Parlar tots els idiomes","Tocar tots els instruments"],
 ["Un dia sense mòbil","Un dia sense música"],["Sopar a les 8","Sopar a les 11"],["Postres","Un segon plat"],["Cervesa","Vi"],["Fer una migdiada","Una passejada"],
 ["Fer un esport nou","Veure un partit"],["Natació","Ciclisme"],["Foto sense filtre","Foto amb filtre"],["Hivern a la neu","Estiu a la platja"],["Sorpresa","Pla organitzat"]
];
var QPTS=2,TPTS=1;


var S={authed:false,setup:false,names:null,cfgLoaded:false,moments:[],rewards:{},answers:[],ai:{},hugs:[],places:{a:null,b:null},letters:[],ltr:null,openL:null,editPlace:false,lsig:'',colors:{a:null,b:null},colorsOpen:false,pushOpen:false,pushSub:false,pushSynced:'',who:null,speaker:null,cat:'maca',editNames:false,confirmDel:null,saving:false,sig:''};
try{S.who=localStorage.getItem('who')||null;}catch(e){}

function h(tag,props){
  var e=document.createElement(tag),k,v,kids=Array.prototype.slice.call(arguments,2);
  for(k in (props||{})){v=props[k];
    if(k==='class')e.className=v;
    else if(k.indexOf('on')===0)e.addEventListener(k.slice(2),v);
    else if(v===true)e.setAttribute(k,'');
    else if(v!==false&&v!=null)e.setAttribute(k,v);
  }
  (function add(list){list.forEach(function(c){
    if(c==null||c===false)return;
    if(Array.isArray(c))return add(c);
    e.append(c.nodeType?c:document.createTextNode(String(c)));
  });})(kids);
  return e;
}
function $(id){return document.getElementById(id);}
function put(id,node){var el=$(id);el.replaceChildren();if(node)el.append(node);}
function pad(n){return String(n).padStart(2,'0');}
function dayKey(d){return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());}
function weekInfo(d){
  var t=new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate()));
  var day=t.getUTCDay()||7;t.setUTCDate(t.getUTCDate()+4-day);
  var y=t.getUTCFullYear(),w=Math.ceil(((t-Date.UTC(y,0,1))/864e5+1)/7);
  return {key:y+'-W'+pad(w),n:y*53+w};
}
var WEEK=weekInfo(new Date());
var CHALLENGE=CHALL[WEEK.n%CHALL.length];

function toast(msg){
  var t=$('toast');t.textContent=msg;t.hidden=false;
  clearTimeout(toast.t);toast.t=setTimeout(function(){t.hidden=true;},3200);
}
function nm(p){return (S.names&&S.names[p])||(p==='a'?'Jugador 1':'Jugador 2');}
function other(p){return p==='a'?'b':'a';}
function catOf(k){return k==='repte'?REPTE:(CATS.filter(function(c){return c.k===k;})[0]||CATS[0]);}
function score(p){return S.moments.reduce(function(s,m){return m.speaker===p?s+(+m.pts||0):s;},0)+gamePts(p)+hugPts(p);}
function level(p){return Math.floor(score(p)/STEP);}
function streak(p){
  var days={};S.moments.forEach(function(m){if(m.speaker===p)days[m.day]=1;});S.answers.forEach(function(a){if(a.player===p)days[a.day]=1;});S.hugs.forEach(function(x){if(x.from_player===p)days[x.day]=1;if(x.status==='returned'&&x.from_player!==p&&x.ret_day)days[x.ret_day]=1;});
  var d=new Date();d.setHours(12,0,0,0);
  if(!days[dayKey(d)])d.setDate(d.getDate()-1);
  var n=0;while(days[dayKey(d)]){n++;d.setDate(d.getDate()-1);}
  return n;
}
function reptDone(p){return S.moments.some(function(m){return m.speaker===p&&m.cat==='repte'&&m.wk===WEEK.key;});}
function ready(){return S.cfgLoaded&&S.names&&S.names.a&&S.names.b;}

/* ---------- jocs diaris ---------- */
function gameDay(){
  try{return new Intl.DateTimeFormat('sv-SE',{timeZone:'Europe/Madrid'}).format(new Date());}
  catch(e){return dayKey(new Date());}
}
function dayNum(s){var p=s.split('-');return Math.floor(Date.UTC(+p[0],+p[1]-1,+p[2])/864e5);}
function ans(day,game,slot,p){return S.ai[day+'|'+game+'|'+slot+'|'+p];}
function gamePts(p){
  var n=0;
  S.answers.forEach(function(a){
    if(a.player!==p)return;
    if(a.game==='q')n+=QPTS;
    else{var o=ans(a.day,'t',a.slot,other(p));if(o&&o.answer===a.answer)n+=TPTS;}
  });
  return n;
}
var gSaving=false;
function saveAns(row,after){
  if(gSaving)return;gSaving=true;
  api.saveAnswer(row).then(function(){if(after)after();}).catch(function(e){toast(saveErr(e));}).then(function(){gSaving=false;});
}
function nameChip(p){return h('span',{class:'nm2'},h('span',{class:'dot',style:'background:var(--'+p+')'}),nm(p));}
function renderGames(){
  var z=$('games');
  if(!ready()||!S.who){z.replaceChildren();return;}
  var prev=document.getElementById('qans'),keep=prev?prev.value:'',had=prev&&document.activeElement===prev;
  var me=S.who,ot=other(me),day=gameDay(),dn=dayNum(day);

  /* pregunta del dia */
  var qtext=Q[dn%Q.length],mine=ans(day,'q',0,me),theirs=ans(day,'q',0,ot),qbody;
  if(!mine){
    var ta=h('textarea',{id:'qans',maxlength:'300',placeholder:'La teva resposta'});ta.value=keep;
    var bt=h('button',{class:'btn '+me,type:'button'},'Respondre · +'+QPTS);
    bt.addEventListener('click',function(){
      var t=ta.value.trim();if(!t){toast('Escriu una resposta.');ta.focus();return;}
      bt.disabled=true;
      saveAns({day:day,game:'q',slot:0,player:me,answer:t,prompt:qtext},function(){toast('+'+QPTS+' per a '+nm(me));});
    });
    qbody=h('div',null,ta,bt,h('p',{class:'tiny',style:'margin:8px 0 0'},theirs?nm(ot)+' ja ha respost. La veuràs quan responguis.':nm(ot)+' encara no ha respost.'));
    if(had)setTimeout(function(){var f=document.getElementById('qans');if(f)f.focus({preventScroll:true});},0);
  }else if(!theirs){
    qbody=h('div',null,h('div',{class:'ans'},nameChip(me),h('p',null,mine.answer)),h('p',{class:'tiny',style:'margin:8px 0 0'},'Esperant que '+nm(ot)+' respongui.'));
  }else{
    qbody=h('div',{class:'pair'},[me,ot].map(function(p){return h('div',{class:'ans'},nameChip(p),h('p',null,ans(day,'q',0,p).answer));}));
  }
  var qcard=h('div',{class:'game'},h('div',{class:'k'},'Pregunta del dia'),h('p',{class:'qt'},qtext),qbody);

  /* això o allò */
  var rows=[0,1,2].map(function(i){
    var pr=T[(dn*3+i)%T.length],m=ans(day,'t',i,me),o=ans(day,'t',i,ot),body;
    if(!m){
      body=h('div',{class:'opts'},[0,1].map(function(k){
        return h('button',{class:'opt',type:'button',onclick:function(){saveAns({day:day,game:'t',slot:i,player:me,answer:String(k),prompt:pr[0]+'|'+pr[1]});}},pr[k]);
      }));
    }else if(!o){
      body=h('div',{class:'tiny'},'Has triat '+pr[+m.answer]+'. Esperant '+nm(ot)+'.');
    }else{
      var same=m.answer===o.answer;
      body=h('div',{class:same?'ok':'pend'},nm(me)+': '+pr[+m.answer]+' · '+nm(ot)+': '+pr[+o.answer]+(same?' · Coincidiu! +'+TPTS+' a cadascú':' · Cadascú la seva'));
    }
    return h('div',{class:'trow'},h('div',{class:'tt'},pr[0]+' o '+pr[1]+'?'),body);
  });
  var tcard=h('div',{class:'game'},h('div',{class:'k'},'Això o allò · +'+TPTS+' a cadascú si coincidiu'),rows);

  /* dies anteriors */
  var days={};
  S.answers.forEach(function(a){if(a.day<day)days[a.day]=1;});
  var past=Object.keys(days).sort().reverse().slice(0,7),items=[];
  past.forEach(function(d){
    var lines=[],qa=ans(d,'q',0,'a'),qb=ans(d,'q',0,'b');
    if(qa&&qb){
      lines.push(h('div',{class:'ph'},qa.prompt||'Pregunta'));
      ['a','b'].forEach(function(p){lines.push(h('div',{class:'pl'},h('b',null,nm(p)+': '),ans(d,'q',0,p).answer));});
    }
    [0,1,2].forEach(function(i){
      var x=ans(d,'t',i,'a'),y=ans(d,'t',i,'b');
      if(x&&y){
        var pr=(x.prompt||'|').split('|'),same=x.answer===y.answer;
        lines.push(h('div',{class:'pl'},h('b',null,(pr[0]||'?')+' o '+(pr[1]||'?')+': '),nm('a')+' '+(pr[+x.answer]||'?')+', '+nm('b')+' '+(pr[+y.answer]||'?')+(same?' (coincidència)':'')));
      }
    });
    if(lines.length){
      var dd=new Date(d+'T12:00:00');
      items.push(h('div',{class:'pday'},h('div',{class:'lv'},dd.toLocaleDateString('ca',{weekday:'long',day:'numeric',month:'long'})),lines));
    }
  });
  var hist=items.length?h('details',{class:'hist'},h('summary',null,'Dies anteriors'),items):null;
  z.replaceChildren(h('section',{class:'card'},h('h2',null,'Jocs d\'avui'),
    h('p',{class:'tiny',style:'margin:-4px 0 12px'},'Es reveles quan heu respost tots dos. Màxim '+(QPTS+3*TPTS)+' punts al dia.'),
    qcard,tcard,hist));
}

/* ---------- abraçades ---------- */
var HUGPTS=1;
function hugPts(p){
  var n=0;
  S.hugs.forEach(function(x){
    if(x.kind==='give'){if(x.from_player===p)n+=HUGPTS;}
    else if(x.status==='returned')n+=HUGPTS;
  });
  return n;
}
var hSaving=false;
function hugAct(fn,msg){
  if(hSaving)return;hSaving=true;
  fn().then(function(){toast(msg);}).catch(function(e){toast(saveErr(e));}).then(function(){hSaving=false;renderHugs();});
}
function fmtWhen(ts){var d=new Date(ts);return d.toLocaleDateString('ca',{day:'numeric',month:'short'})+', '+pad(d.getHours())+':'+pad(d.getMinutes());}
function renderHugs(){
  var z=$('hugs');
  if(!ready()||!S.who){z.replaceChildren();return;}
  var me=S.who,ot=other(me);
  var inc=S.hugs.filter(function(x){return x.kind==='ask'&&x.status==='pending'&&x.from_player===ot;});
  var out=S.hugs.filter(function(x){return x.kind==='ask'&&x.status==='pending'&&x.from_player===me;});
  var give=h('button',{class:'btn sm '+me,type:'button',onclick:function(){hugAct(function(){return api.giveHug();},'Abraçada donada: +'+HUGPTS);}},'Donar abraçada · +'+HUGPTS);
  var ask=h('button',{class:'btn sm ghost',type:'button',disabled:out.length>0,onclick:function(){hugAct(function(){return api.askHug();},'Abraçada demanada');}},out.length?'Ja n\'has demanat una':'Demanar abraçada');
  var parts=[h('div',{class:'hugbtns'},give,ask)];
  inc.forEach(function(x){
    parts.push(h('div',{class:'hugreq'},h('div',null,h('b',null,nm(ot)),' et demana una abraçada.'),
      h('button',{class:'btn sm '+me,type:'button',onclick:function(){hugAct(function(){return api.returnHug(x.id);},'Abraçada tornada: +'+HUGPTS+' per als dos');}},'Tornar l\'abraçada · +'+HUGPTS+' per als dos')));
  });
  if(out.length)parts.push(h('p',{class:'tiny',style:'margin:10px 0 0'},'Esperant que '+nm(ot)+' et torni l\'abraçada. Si la torna, sumeu '+HUGPTS+' punt cadascú.'));
  var rows=S.hugs.slice().sort(function(x,y){return y.ts-x.ts;}).slice(0,6).map(function(x){
    var txt;
    if(x.kind==='give')txt=nm(x.from_player)+' ha donat una abraçada · +'+HUGPTS;
    else if(x.status==='returned')txt=nm(other(x.from_player))+' ha tornat l\'abraçada a '+nm(x.from_player)+' · +'+HUGPTS+' cadascú';
    else txt=nm(x.from_player)+' ha demanat una abraçada · pendent';
    return h('div',{class:'hugrow'},h('span',null,txt),h('span',{class:'tiny'},fmtWhen(x.ts)));
  });
  if(rows.length)parts.push(h('div',{class:'hugs'},rows));
  z.replaceChildren(h('section',{class:'card'},h('h2',null,'Abraçades'),parts));
}

/* ---------- cartes ---------- */
var TRANSPORTS=[
 {k:'colom',n:'Colom missatger',kmh:55,road:1,over:0,d:'Vola en línia recta, sense pressa.',
  svg:'<path d="M3 16c3 1 6 0 8-3l2-4 2 3 5 1-4 2c-1 4-5 6-9 5l-3 2z"/><circle cx="15.5" cy="9.5" r=".6"/>'},
 {k:'cotxe',n:'Cotxe',kmh:80,road:1.25,over:0,d:'Per carretera.',
  svg:'<path d="M3 15l2-5h14l2 5v3h-3v-2H6v2H3z"/><path d="M5 10l1.5-3h11L19 10"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>'},
 {k:'vaixell',n:'Vaixell',kmh:30,road:1.15,over:240,d:'Lent, però segur. Inclou 4 h de càrrega.',
  svg:'<path d="M3 16h18l-2.5 4h-13z"/><path d="M12 3v13"/><path d="M12 4l6 9h-6"/><path d="M12 6L7 13h5"/>'},
 {k:'avio',n:'Avió',kmh:800,road:1,over:120,d:'El més ràpid. Inclou 2 h d\'aeroport.',
  svg:'<path d="M21 3L3 10l7 3 3 7z"/><path d="M10 13l5-5"/>'}
];
function trOf(k){return TRANSPORTS.filter(function(t){return t.k===k;})[0]||TRANSPORTS[0];}
function icon(t){var s=document.createElement('span');s.className='ico';s.innerHTML='<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+t.svg+'</svg>';return s;}
function haversine(a,b,c,d){
  var R=6371,r=Math.PI/180,dl=(c-a)*r,dn=(d-b)*r;
  var x=Math.sin(dl/2)*Math.sin(dl/2)+Math.cos(a*r)*Math.cos(c*r)*Math.sin(dn/2)*Math.sin(dn/2);
  return 2*R*Math.asin(Math.min(1,Math.sqrt(x)));
}
function distKm(){var a=S.places.a,b=S.places.b;return(a&&b)?haversine(+a.lat,+a.lon,+b.lat,+b.lon):null;}
function etaMin(t,km){return Math.max(1,Math.round(t.over+km*t.road/t.kmh*60));}
function fmtDur(min){
  min=Math.max(0,Math.round(min));
  if(min<60)return min+' min';
  var h=Math.floor(min/60),m=min%60;
  if(h<48)return h+' h'+(m?' '+m+' min':'');
  var d=Math.floor(h/24),hh=h%24;return d+(d===1?' dia':' dies')+(hh?' '+hh+' h':'');
}
function fmtClock(ts){
  var d=new Date(ts),n=new Date(),t=dayKey(d),today=dayKey(n),tm=new Date(n.getTime()+864e5);
  var hm=pad(d.getHours())+':'+pad(d.getMinutes());
  if(t===today)return 'avui a les '+hm;
  if(t===dayKey(tm))return 'demà a les '+hm;
  return d.toLocaleDateString('ca',{day:'numeric',month:'long'})+' a les '+hm;
}
function fmtKm(km){return Math.round(km).toLocaleString('ca')+' km';}
function searchCity(q){
  return fetch('https://geocoding-api.open-meteo.com/v1/search?name='+encodeURIComponent(q)+'&count=6&language=ca&format=json')
    .then(function(r){if(!r.ok)throw new Error('geo');return r.json();})
    .then(function(j){return (j.results||[]).map(function(x){return {name:[x.name,x.admin1,x.country].filter(Boolean).join(', '),lat:x.latitude,lon:x.longitude};});});
}

/* ---------- mapa de la carta ---------- */
var LAND={d:null,state:0}; /* state: 0 pendent, 1 carregant, 2 llest, 3 error */
var LAND_URL='https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/land-110m.json';
function topoToPath(t){
  var sc=t.transform?t.transform.scale:[1,1],tr=t.transform?t.transform.translate:[0,0],arcs=[];
  t.arcs.forEach(function(a){var x=0,y=0,pts=[];a.forEach(function(p){if(t.transform){x+=p[0];y+=p[1];pts.push([x*sc[0]+tr[0],y*sc[1]+tr[1]]);}else pts.push([p[0],p[1]]);});arcs.push(pts);});
  function arc(i){return i<0?arcs[~i].slice().reverse():arcs[i];}
  function ring(idx){var out=[];idx.forEach(function(i,k){var a=arc(i);out=out.concat(k?a.slice(1):a);});return out;}
  var d='';
  function poly(rings){rings.forEach(function(r){var pts=ring(r);pts.forEach(function(p,i){d+=(i?'L':'M')+(p[0]+180).toFixed(1)+' '+(90-p[1]).toFixed(1);});d+='Z';});}
  function geom(g){
    if(g.type==='GeometryCollection')g.geometries.forEach(geom);
    else if(g.type==='Polygon')poly(g.arcs);
    else if(g.type==='MultiPolygon')g.arcs.forEach(poly);
  }
  Object.keys(t.objects).forEach(function(k){geom(t.objects[k]);});
  return d;
}
function loadLand(){
  if(LAND.state!==0)return;LAND.state=1;
  fetch(LAND_URL).then(function(r){if(!r.ok)throw new Error('land');return r.json();})
    .then(function(j){LAND.d=topoToPath(j);LAND.state=2;if(S.authed&&ready()&&S.who)renderLetterLists();})
    .catch(function(){LAND.state=3;});
}
var SVGNS='http://www.w3.org/2000/svg';
function sv(tag,attrs,kids){
  var e=document.createElementNS(SVGNS,tag),k;
  for(k in (attrs||{}))e.setAttribute(k,attrs[k]);
  (kids||[]).forEach(function(c){e.append(c);});
  return e;
}
function shortPlace(n){return String(n||'').split(',')[0];}
/* progrés 0..1 de la carta; p1 = remitent, p2 = destinatari */
function letterMap(p1,p2,frac,from,t){
  var x1=+p1.lon+180,y1=90-p1.lat,x2=+p2.lon+180,y2=90-p2.lat;
  var cx=(x1+x2)/2,cy=(y1+y2)/2,w=Math.max(Math.abs(x2-x1)*1.7,70),h;
  w=Math.min(w,360);h=Math.min(w*0.62,180);if(h<Math.abs(y2-y1)*1.9){h=Math.min(Math.abs(y2-y1)*1.9,180);w=Math.min(h/0.62,360);}
  var vx=Math.max(0,Math.min(360-w,cx-w/2)),vy=Math.max(0,Math.min(180-h,cy-h/2));
  var k=w/380;
  var dx=x2-x1,dy=y2-y1,len=Math.sqrt(dx*dx+dy*dy)||1,bend=len*0.22;
  var qx=cx,qy=cy-Math.max(bend,4);
  var path='M'+x1+' '+y1+' Q'+qx+' '+qy+' '+x2+' '+y2;
  var tt=Math.max(0,Math.min(1,frac)),u=1-tt;
  var mx=u*u*x1+2*u*tt*qx+tt*tt*x2,my=u*u*y1+2*u*tt*qy+tt*tt*y2;
  var svg=sv('svg',{viewBox:vx+' '+vy+' '+w+' '+h,class:'lmap',role:'img','aria-label':'Mapa del viatge de la carta de '+shortPlace(p1.name)+' a '+shortPlace(p2.name),preserveAspectRatio:'xMidYMid meet',style:'aspect-ratio:'+w.toFixed(1)+'/'+h.toFixed(1)});
  var defs=sv('defs',null,[]);
  var g=sv('linearGradient',{id:'ocean',x1:'0',y1:'0',x2:'0',y2:'1'});
  g.append(sv('stop',{offset:'0','stop-color':'var(--ocean1)'}),sv('stop',{offset:'1','stop-color':'var(--ocean2)'}));
  defs.append(g);svg.append(defs);
  svg.append(sv('rect',{x:vx,y:vy,width:w,height:h,fill:'url(#ocean)'}));
  var grat='';
  for(var lo=0;lo<=360;lo+=30)grat+='M'+lo+' 0V180';
  for(var la=0;la<=180;la+=30)grat+='M0 '+la+'H360';
  svg.append(sv('path',{d:grat,class:'grat','vector-effect':'non-scaling-stroke'}));
  if(LAND.d)svg.append(sv('path',{d:LAND.d,class:'land'}));
  svg.append(sv('path',{d:path,class:'route','vector-effect':'non-scaling-stroke'}));
  svg.append(sv('path',{d:path,class:'done','vector-effect':'non-scaling-stroke',pathLength:'1','stroke-dasharray':tt+' 1',style:'stroke:var(--'+from+')'}));
  function pin(x,y,pl,place,anchor){
    var r=3.2*k*2.9;
    var gp=sv('g',null,[sv('circle',{cx:x,cy:y,r:r*1.9,class:'halo',style:'fill:var(--'+pl+')'}),sv('circle',{cx:x,cy:y,r:r,class:'pin',style:'fill:var(--'+pl+')'})]);
    var tx=sv('text',{x:x,y:y-r*2.4,'text-anchor':anchor,class:'plc','font-size':(15*k).toFixed(2)});tx.textContent=shortPlace(place.name);
    gp.append(tx);return gp;
  }
  svg.append(pin(x1,y1,from,p1,'middle'),pin(x2,y2,from==='a'?'b':'a',p2,'middle'));
  if(tt>0&&tt<1){
    var r=6*k;
    var env=sv('g',{transform:'translate('+mx+' '+my+') scale('+(k*1.5).toFixed(3)+')'});
    env.append(sv('circle',{r:'6.5',class:'mk',style:'fill:var(--'+from+')'}),
      sv('path',{d:'M-3.6 -2.2h7.2v4.4h-7.2z M-3.6 -2.2L0 0.6L3.6 -2.2',fill:'none',stroke:'#fff','stroke-width':'1.1','stroke-linejoin':'round'}));
    svg.append(env);
  }
  return svg;
}
var lSaving=false;
function lAct(fn,msg){
  if(lSaving)return Promise.resolve();lSaving=true;
  return fn().then(function(){if(msg)toast(msg);}).catch(function(e){toast(saveErr(e));}).then(function(){lSaving=false;});
}
function placePicker(){
  var q=h('input',{type:'text',id:'cityq',maxlength:'60',placeholder:'La teva ciutat o poble',autocomplete:'off'});
  var res=h('div',{class:'cityres'});
  var go=h('button',{class:'btn sm',type:'button'},'Cercar');
  function showManual(){
    var nmI=h('input',{type:'text',id:'mname',maxlength:'60',placeholder:'Nom del lloc'});
    var la=h('input',{type:'text',id:'mlat',inputmode:'decimal',placeholder:'Latitud (ex. 41.39)'});
    var lo=h('input',{type:'text',id:'mlon',inputmode:'decimal',placeholder:'Longitud (ex. 2.17)'});
    var sv=h('button',{class:'btn sm',type:'button',onclick:function(){
      var a=parseFloat(String(la.value).replace(',','.')),b=parseFloat(String(lo.value).replace(',','.'));
      if(!nmI.value.trim()||!isFinite(a)||!isFinite(b)||Math.abs(a)>90||Math.abs(b)>180){toast('Revisa el nom i les coordenades.');return;}
      savePlace(nmI.value.trim(),a,b);
    }},'Guardar');
    res.append(h('p',{class:'tiny',style:'margin:8px 0'},'No trobo el lloc. Pots escriure les coordenades (a Google Maps, clic dret sobre el mapa):'),nmI,la,lo,sv);
  }
  function doSearch(){
    var v=q.value.trim();if(v.length<2){toast('Escriu el nom d\'una ciutat.');return;}
    res.replaceChildren(h('p',{class:'tiny'},'Cercant…'));
    searchCity(v).then(function(list){
      res.replaceChildren();
      if(!list.length){showManual();return;}
      list.forEach(function(x){res.append(h('button',{class:'cityopt',type:'button',onclick:function(){savePlace(x.name,x.lat,x.lon);}},x.name));});
    }).catch(function(){res.replaceChildren();res.append(h('p',{class:'tiny'},'No puc cercar ara.'));showManual();});
  }
  go.addEventListener('click',doSearch);
  q.addEventListener('keydown',function(e){if(e.key==='Enter')doSearch();});
  return h('div',null,h('div',{class:'row'},q,go),res);
}
function savePlace(name,lat,lon){
  lAct(function(){return api.savePlace({player:S.who,name:name,lat:lat,lon:lon});},'Ubicació guardada').then(function(){S.editPlace=false;S.lsig='';renderLetters();});
}
function updateCta(){
  var b=$('btn-letter');if(!b)return;
  if(!S.authed||!ready()||!S.who){b.hidden=true;return;}
  var now=Date.now(),me=S.who,n=S.letters.filter(function(x){return x.to_player===me&&x.arrive<=now&&!x.read;}).length;
  b.hidden=false;b.classList.toggle('has',n>0);
  b.textContent=n>0?'\u2709 Tens '+n+(n===1?' carta per obrir':' cartes per obrir'):'\u2709 Escriure una carta';
}
function renderLetters(){
  var z=$('letters');
  updateCta();
  if(!ready()||!S.who){z.replaceChildren();return;}
  var me=S.who,ot=other(me);
  var sig=JSON.stringify([me,S.names,S.places,S.editPlace]);
  if(S.lsig!==sig||!z.firstChild){
    var prev=document.getElementById('ltext'),keep=prev?prev.value:'';
    var mine=S.places[me],theirs=S.places[ot],km=distKm(),parts=[];
    if(!mine||S.editPlace){
      parts.push(h('p',{class:'tiny',style:'margin:0 0 10px'},mine?'Tria la teva nova ubicació.':'Per calcular quant triga una carta, digues on ets. Només es guarda el nom de la ciutat i la seva posició aproximada.'),placePicker());
      if(mine)parts.push(h('button',{class:'link',type:'button',onclick:function(){S.editPlace=false;S.lsig='';renderLetters();}},'Cancel·lar'));
    }else{
      parts.push(h('p',{class:'tiny',style:'margin:0 0 12px'},
        nm(me)+': '+mine.name+(theirs?' · '+nm(ot)+': '+theirs.name+' · '+fmtKm(km)+' entre vosaltres':' · Falta que '+nm(ot)+' digui on és.'),' ',
        h('button',{class:'link',type:'button',onclick:function(){S.editPlace=true;S.lsig='';renderLetters();}},'Canviar la meva ubicació')));
    }
    if(mine&&theirs&&!S.editPlace){
      var ta=h('textarea',{id:'ltext',maxlength:'2000',placeholder:'Escriu la carta per a '+nm(ot)+'…'});ta.value=keep;
      var send=h('button',{class:'btn '+me,type:'button',id:'lsend'},'Enviar carta');
      var opts=TRANSPORTS.map(function(t){
        var m=etaMin(t,km);
        return h('button',{class:'tr',type:'button','data-k':t.k,'aria-pressed':String(S.ltr===t.k),onclick:function(ev){
          S.ltr=t.k;Array.prototype.forEach.call(document.querySelectorAll('#letters .tr'),function(b){b.setAttribute('aria-pressed',String(b.getAttribute('data-k')===t.k));});
          document.getElementById('lsend').textContent='Enviar carta amb '+t.n.toLowerCase();
        }},icon(t),h('span',{class:'tn'},t.n),h('span',{class:'te'},fmtDur(m)),h('span',{class:'td'},t.d));
      });
      send.addEventListener('click',function(){
        var txt=ta.value.trim();
        if(txt.length<2){toast('Escriu la carta abans d\'enviar-la.');ta.focus();return;}
        if(!S.ltr){toast('Tria com viatjarà la carta.');return;}
        var t=trOf(S.ltr),m=etaMin(t,km);
        send.disabled=true;
        lAct(function(){return api.sendLetter({from_player:me,to_player:ot,transport:t.k,distance_km:Math.round(km),duration_min:m,body:txt});},'Carta enviada. Arribarà '+fmtClock(Date.now()+m*60000)+'.')
          .then(function(){ta.value='';send.disabled=false;});
      });
      if(S.ltr)send.textContent='Enviar carta amb '+trOf(S.ltr).n.toLowerCase();
      parts.push(h('span',{class:'lab'},'Nova carta'),ta,h('span',{class:'lab'},'Com viatjarà?'),h('div',{class:'trs'},opts),send);
    }
    parts.push(h('div',{id:'llists'}));
    z.replaceChildren(h('section',{class:'card'},h('h2',null,'Cartes'),parts));
    S.lsig=sig;
  }
  renderLetterLists();
}
function renderLetterLists(){
  var box=document.getElementById('llists');if(!box)return;
  loadLand();
  var me=S.who,ot=other(me),now=Date.now(),out=[];
  var ls=S.letters.slice().sort(function(a,b){return b.sent-a.sent;});
  var transit=ls.filter(function(x){return x.arrive>now;}),arrived=ls.filter(function(x){return x.arrive<=now;});
  if(transit.length){
    out.push(h('span',{class:'lab'},'En camí'));
    transit.forEach(function(x){
      var t=trOf(x.transport),tot=Math.max(1,x.arrive-x.sent),pct=Math.min(100,Math.max(2,(now-x.sent)/tot*100));
      var mineL=x.from_player===me;
      out.push(h('div',{class:'lt'},
        h('div',{class:'lth'},icon(t),h('div',null,
          h('div',{class:'ltt'},mineL?'Per a '+nm(x.to_player)+' · '+t.n.toLowerCase():'De '+nm(x.from_player)+' · '+t.n.toLowerCase()),
          h('div',{class:'tiny'},'Arriba d\'aquí '+fmtDur((x.arrive-now)/60000)+' ('+fmtClock(x.arrive)+') · '+fmtKm(x.distance_km)))),
        (S.places[x.from_player]&&S.places[x.to_player])?letterMap(S.places[x.from_player],S.places[x.to_player],(now-x.sent)/tot,x.from_player,t):h('div',{class:'prog'},h('i',{style:'width:'+pct+'%'})),
        mineL?h('div',{class:'lbody'},x.body):null));
    });
  }
  if(arrived.length){
    out.push(h('span',{class:'lab'},'Arribades'));
    arrived.slice(0,15).forEach(function(x){
      var t=trOf(x.transport),mineL=x.from_player===me,t0=h('div',{class:'ltt'});
      if(mineL){
        out.push(h('div',{class:'lt'},h('div',{class:'lth'},icon(t),h('div',null,
          h('div',{class:'ltt'},'Enviada a '+nm(x.to_player)+' · '+t.n.toLowerCase()),
          h('div',{class:'tiny'},'Va arribar '+fmtClock(x.arrive)+(x.read?' · llegida':' · encara sense llegir')))),
          h('div',{class:'lbody'},x.body)));
      }else if(!x.read&&S.openL!==x.id){
        out.push(h('div',{class:'lt new'},h('div',{class:'lth'},icon(t),h('div',null,
          h('div',{class:'ltt'},'Ha arribat una carta de '+nm(x.from_player)),
          h('div',{class:'tiny'},'Ha viatjat en '+t.n.toLowerCase()+' (' +fmtKm(x.distance_km)+')'))),
          h('button',{class:'btn sm '+me,type:'button',onclick:function(){
            S.openL=x.id;renderLetterLists();
            lAct(function(){return api.readLetter(x.id);});
          }},'Obrir carta')));
      }else{
        out.push(h('div',{class:'lt'},h('div',{class:'lth'},icon(t),h('div',null,
          h('div',{class:'ltt'},'De '+nm(x.from_player)+' · '+t.n.toLowerCase()),
          h('div',{class:'tiny'},'Va arribar '+fmtClock(x.arrive)))),
          h('div',{class:'lbody'},x.body)));
      }
    });
  }
  if(!ls.length)out.push(h('p',{class:'tiny',style:'margin:14px 0 0'},'Encara no hi ha cap carta. La primera que envieu començarà el seu viatge.'));
  box.replaceChildren.apply(box,out);
}
setInterval(function(){if(S.authed&&ready()&&S.who)renderLetterLists();updateCta();},30000);


/* ---------- notificacions push ---------- */
function urlB64(b){var p='='.repeat((4-b.length%4)%4),t=(b+p).replace(/-/g,'+').replace(/_/g,'/'),r=atob(t),o=new Uint8Array(r.length);for(var i=0;i<r.length;i++)o[i]=r.charCodeAt(i);return o;}
function isIOS(){return /iphone|ipad|ipod/i.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);}
function isStandalone(){return window.navigator.standalone===true||(window.matchMedia&&window.matchMedia('(display-mode: standalone)').matches);}
function pushSupported(){return 'serviceWorker' in navigator&&'PushManager' in window&&'Notification' in window;}
var swReg=null;
function getReg(){
  if(swReg)return Promise.resolve(swReg);
  return navigator.serviceWorker.register('sw.js').then(function(){return navigator.serviceWorker.ready;}).then(function(r){swReg=r;return r;});
}
function keyMatches(sub){
  try{
    var k=sub&&sub.options&&sub.options.applicationServerKey;
    if(!k)return true;
    var a=new Uint8Array(k),b=urlB64(cfg.vapid);
    if(a.length!==b.length)return false;
    for(var i=0;i<a.length;i++){if(a[i]!==b[i])return false;}
    return true;
  }catch(e){return true;}
}
function pushRow(sub){return {endpoint:sub.endpoint,player:S.who,name:nm(S.who),sub:sub.toJSON()};}
function syncPush(){
  if(!cfg.vapid||!pushSupported()||!S.authed||!S.who||!ready())return;
  var key=S.who+'|'+nm(S.who);if(S.pushSynced===key||S.pushBusy)return;S.pushBusy=true;
  getReg().then(function(r){return r.pushManager.getSubscription();}).then(function(sub){
    var ok=!!sub&&keyMatches(sub);
    S.pushSub=ok;S.pushSynced=key;
    if(ok)return sb.from('pp_push').upsert(pushRow(sub)).then(chk);
  }).then(function(){S.pushBusy=false;renderPush();}).catch(function(){S.pushBusy=false;});
}
function enablePush(){
  return Notification.requestPermission().then(function(p){
    if(p!=='granted')throw new Error('denied');
    return getReg();
  }).then(function(r){
    return r.pushManager.getSubscription().then(function(s){
      var fresh=function(){return r.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:urlB64(cfg.vapid)});};
      if(!s)return fresh();
      if(keyMatches(s))return s;
      return s.unsubscribe().then(fresh);
    });
  }).then(function(sub){
    return sb.from('pp_push').upsert(pushRow(sub)).then(chk).then(function(){S.pushSub=true;S.pushSynced=S.who+'|'+nm(S.who);});
  });
}
function disablePush(){
  return getReg().then(function(r){return r.pushManager.getSubscription();}).then(function(sub){
    if(!sub)return;
    return sb.from('pp_push').delete().eq('endpoint',sub.endpoint).then(function(){return sub.unsubscribe();});
  }).then(function(){S.pushSub=false;S.pushSynced='';});
}
function renderPush(){
  var z=$('pushzone');
  if(!ready()||!S.who||!S.pushOpen||!cfg.vapid){z.replaceChildren();return;}
  var body;
  if(!pushSupported()){
    body=isIOS()&&!isStandalone()
      ?h('div',null,h('p',{style:'margin:0 0 8px'},'A l\'iPhone les notificacions només funcionen si la web està a la pantalla d\'inici:'),
          h('ol',{style:'margin:0;padding-left:20px'},h('li',null,'Obre aquesta web a Safari.'),h('li',null,'Toca Compartir i després «Afegeix a la pantalla d\'inici».'),h('li',null,'Obre-la des de la icona nova i torna aquí a activar els avisos.')))
      :h('p',{style:'margin:0'},'Aquest navegador no admet notificacions.');
  }else if(typeof Notification!=='undefined'&&Notification.permission==='denied'){
    body=h('p',{style:'margin:0'},'Has bloquejat les notificacions d\'aquesta web. Activa-les a la configuració del navegador i torna a provar.');
  }else if(S.pushSub){
    var off=h('button',{class:'btn sm',type:'button'},'Desactivar en aquest dispositiu');
    off.addEventListener('click',function(){off.disabled=true;disablePush().then(function(){toast('Avisos desactivats');renderPush();}).catch(function(e){toast(saveErr(e));off.disabled=false;});});
    body=h('div',null,h('p',{class:'ok',style:'margin:0 0 12px'},'Avisos activats en aquest dispositiu.'),off);
  }else{
    var on=h('button',{class:'btn sm',type:'button'},'Activar avisos');
    on.addEventListener('click',function(){
      on.disabled=true;
      enablePush().then(function(){toast('Avisos activats');renderPush();}).catch(function(e){
        toast(String(e&&e.message)==='denied'?'No has donat permís per als avisos.':saveErr(e));on.disabled=false;
      });
    });
    body=h('div',null,h('p',{style:'margin:0 0 12px'},'T\'avisarem quan et sumin punts, quan l\'altra persona respongui els jocs, quan pugis de nivell o et preparin un premi, i a les 20:00 si tens alguna cosa pendent.'),on);
  }
  z.replaceChildren(h('section',{class:'card'},h('h2',null,'Avisos al mòbil'),body));
}

/* ---------- colors ---------- */
var PAL=[['Taronja','#F26A1B'],['Verd blavós','#14A3A8'],['Rosa','#E8508A'],['Lila','#8B6CF0'],['Blau','#3C82F6'],['Verd','#2FA866'],['Groc','#E5B91A'],['Vermell','#E04848'],['Magenta','#C03BC4'],['Gris','#8A94A6']];
function rgb(hex){var m=/^#?([0-9a-f]{6})$/i.exec(String(hex).trim());if(!m)return null;var n=parseInt(m[1],16);return [n>>16&255,n>>8&255,n&255];}
function lum(hex){var c=rgb(hex);if(!c)return 0;var f=function(v){v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4);};return .2126*f(c[0])+.7152*f(c[1])+.0722*f(c[2]);}
function applyColors(){
  var root=document.documentElement;
  ['a','b'].forEach(function(p){
    var c=S.colors[p];
    if(c){root.style.setProperty('--'+p,c);root.style.setProperty('--on-'+p,lum(c)>.4?'#0A1122':'#FFFFFF');}
    else{root.style.removeProperty('--'+p);root.style.removeProperty('--on-'+p);}
  });
}
function effColor(p){return S.colors[p]||getComputedStyle(document.documentElement).getPropertyValue('--'+p).trim();}
function tooClose(c1,c2){var x=rgb(c1),y=rgb(c2);if(!x||!y)return false;return Math.sqrt(Math.pow(x[0]-y[0],2)+Math.pow(x[1]-y[1],2)+Math.pow(x[2]-y[2],2))<70;}
function pickColor(c){
  var o=other(S.who);
  if(tooClose(c,effColor(o))){toast('Massa semblant al color de '+nm(o)+'. Tria\'n un altre.');return;}
  api.savePref({player:S.who,color:c.toLowerCase()}).then(function(){toast('Color guardat');}).catch(function(e){toast(saveErr(e));});
}
function renderColors(){
  var z=$('colors');
  if(!ready()||!S.who||!S.colorsOpen){z.replaceChildren();return;}
  var cur=(S.colors[S.who]||'').toLowerCase();
  var picker=h('input',{type:'color',id:'cpick','aria-label':'Altre color',value:cur||'#f26a1b'});
  picker.addEventListener('change',function(){pickColor(picker.value);});
  z.replaceChildren(h('section',{class:'card'},h('h2',null,'El teu color'),
    h('p',{class:'tiny',style:'margin:-4px 0 12px'},'Només canvies el teu color, '+nm(S.who)+'. Es veu igual als dos mòbils.'),
    h('div',{class:'sw'},PAL.map(function(p){
      return h('button',{class:'swb',type:'button','aria-label':p[0],'aria-pressed':String(cur===p[1].toLowerCase()),style:'background:'+p[1],onclick:function(){pickColor(p[1]);}});
    }),h('label',{class:'swc'},'Altre',picker)),
    h('div',{style:'margin-top:12px'},h('button',{class:'link',type:'button',onclick:function(){api.delPref(S.who).then(function(){toast('Color per defecte');}).catch(function(e){toast(saveErr(e));});}},'Tornar al color per defecte'))));
}

/* ---------- renders ---------- */
function renderTop(){
  var box=h('div');
  if(S.setup){
    box.append(h('section',{class:'card'},h('h2',null,'Falta configurar'),
      h('p',{style:'margin:0 0 8px'},'Obre config.js i enganxa-hi la URL i la clau pública del teu projecte de Supabase.'),
      h('p',{class:'tiny',style:'margin:0'},'Diagnòstic: '+setupWhy())));
    put('top',box);return;
  }
  if(!S.authed){
    var em=h('input',{type:'text',id:'em',autocomplete:'username',inputmode:'email',placeholder:'correu@exemple.com'});
    var pw=h('input',{type:'password',id:'pw',autocomplete:'current-password',placeholder:'Contrasenya'});
    var go=h('button',{class:'btn',type:'button'},'Entrar');
    function submit(){
      if(!em.value.trim()||!pw.value){toast('Escriu el correu i la contrasenya.');return;}
      go.disabled=true;
      login(em.value.trim(),pw.value).catch(function(e){toast(loginMsg(e));}).then(function(){go.disabled=false;});
    }
    go.addEventListener('click',submit);
    pw.addEventListener('keydown',function(e){if(e.key==='Enter')submit();});
    box.append(h('section',{class:'card'},h('h2',null,'Entrar'),
      h('label',{class:'lab',for:'em'},'Correu'),em,
      h('label',{class:'lab',for:'pw'},'Contrasenya'),pw,go));
    put('top',box);return;
  }
  if(!S.cfgLoaded){box.append(h('p',{class:'tiny'},'Carregant el marcador…'));put('top',box);return;}
  if(!ready()||S.editNames){
    var i1=h('input',{type:'text',id:'n1',placeholder:'Primer nom',maxlength:'24',value:(S.names&&S.names.a)||''});
    var i2=h('input',{type:'text',id:'n2',placeholder:'Segon nom',maxlength:'24',value:(S.names&&S.names.b)||''});
    var b=h('button',{class:'btn',type:'button',onclick:function(){
      var a=i1.value.trim(),c=i2.value.trim();
      if(!a||!c||a.toLowerCase()===c.toLowerCase()){toast('Escriu dos noms diferents.');return;}
      b.disabled=true;
      api.saveNames(a,c).then(function(){S.editNames=false;toast('Noms guardats');})
        .catch(function(e){toast(saveErr(e));})
        .then(function(){b.disabled=false;});
    }},'Guardar noms');
    box.append(h('section',{class:'card'},h('h2',null,'Qui juga?'),
      h('p',{class:'tiny',style:'margin:0 0 12px'},'Els noms es veuen al marcador. El primer serà taronja i el segon verd blavós.'),
      h('label',{class:'lab',for:'n1'},'Jugador taronja'),i1,
      h('label',{class:'lab',for:'n2'},'Jugador verd blavós'),i2,b));
    put('top',box);return;
  }
  if(!S.who){
    box.append(h('section',{class:'card'},h('h2',null,'Qui ets tu?'),
      h('p',{class:'tiny',style:'margin:0 0 12px'},'Així sabré a qui sumar-li els punts quan escriguis una frase. Ho recordo en aquest mòbil.'),
      h('div',{class:'chips'},['a','b'].map(function(p){
        return h('button',{class:'chip '+p,type:'button',onclick:function(){setWho(p);}},h('span',{class:'dot'}),nm(p));
      }))));
  }
  put('top',box);
}
function setWho(p){
  S.who=p;S.speaker=other(p);
  try{localStorage.setItem('who',p);}catch(e){}
  S.sig='';renderAll();
}

function renderBoard(){
  if(!ready()){put('board',null);return;}
  var A=score('a'),B=score('b');
  function side(p,pts){
    var lv=Math.floor(pts/STEP),into=pts%STEP,st=streak(p);
    return h('div',{class:'side '+p},
      h('div',{class:'nm'},h('span',{class:'dot'}),nm(p)),
      h('div',{class:'pts'},pts),
      h('div',{class:'meta'},'Nivell '+lv+' · '+(STEP-into)+' per al següent'),
      h('div',{class:'meta'},st>0?('Ratxa de '+st+(st===1?' dia':' dies')):'Sense ratxa'),
      h('div',{class:'bar'},h('i',{style:'width:'+(into/STEP*100)+'%'})));
  }
  var lead;
  if(A===B)lead=h('span',null,A===0?'Partit per començar':'Empat a '+A);
  else{var w=A>B?'a':'b';lead=h('span',null,h('b',null,nm(w)),' va guanyant per '+Math.abs(A-B)+(Math.abs(A-B)===1?' punt':' punts'));}
  put('board',h('section',{class:'board','aria-label':'Marcador'},side('a',A),h('div',{class:'mid'},'VS'),side('b',B),h('div',{class:'lead'},lead)));
}

function renderAdd(){
  if(!ready()||!S.who){put('addzone',null);return;}
  if(!S.speaker)S.speaker=other(S.who);
  var sp=S.speaker;
  if(S.cat==='repte'&&reptDone(sp))S.cat='maca';
  var prev=document.getElementById('phrase');var keep=prev?prev.value:'';var hadFocus=prev&&document.activeElement===prev;
  var ta=h('textarea',{id:'phrase',maxlength:'400',placeholder:'Escriu què s\'ha dit, amb les seves paraules'});
  ta.value=keep;
  setTimeout(function(){if(hadFocus){var f=document.getElementById('phrase');if(f)f.focus({preventScroll:true});}},0);
  var cp=catOf(S.cat).p;
  var submit=h('button',{class:'btn '+sp,type:'button',id:'send'},'Sumar '+cp+(cp===1?' punt':' punts')+' a '+nm(sp));
  submit.addEventListener('click',function(){
    var txt=ta.value.trim();
    if(txt.length<3){toast('Escriu la frase abans de sumar.');ta.focus();return;}
    if(S.saving)return;S.saving=true;submit.disabled=true;
    var c=catOf(S.cat),now=new Date();
    api.addMoment({speaker:S.speaker,cat:c.k,pts:c.p,text:txt,day:dayKey(now),wk:WEEK.key})
      .then(function(){ta.value='';toast('+'+c.p+' per a '+nm(S.speaker));})
      .catch(function(e){toast(saveErr(e));})
      .then(function(){S.saving=false;submit.disabled=false;});
  });
  var rd=reptDone(sp);
  var cats=CATS.concat([REPTE]).map(function(c){
    var isR=c.k==='repte';
    return h('button',{class:'cat',type:'button','aria-pressed':String(S.cat===c.k),disabled:isR&&rd,onclick:function(){S.cat=c.k;renderAdd();}},
      h('span',{class:'t'},c.n),h('span',{class:'p'},'+'+c.p),
      h('span',{class:'e'},isR?(rd?nm(sp)+' ja l\'ha fet aquesta setmana':CHALLENGE):c.e));
  });
  put('addzone',h('section',{class:'card'},
    h('h2',null,'Ha dit una cosa maca'),
    h('span',{class:'lab'},'Qui l\'ha dita?'),
    h('div',{class:'chips'},['a','b'].map(function(p){
      return h('button',{class:'chip '+p,type:'button','aria-pressed':String(sp===p),onclick:function(){S.speaker=p;renderAdd();}},h('span',{class:'dot'}),nm(p)+(p===S.who?' (jo)':''));
    })),
    h('span',{class:'lab'},'Com de maca ha estat?'),
    h('div',{class:'cats'},cats),
    h('label',{class:'lab',for:'phrase'},'La frase'),
    ta,submit,
    h('div',{style:'margin-top:12px'},h('button',{class:'link',type:'button',onclick:function(){S.who=null;S.speaker=null;try{localStorage.removeItem('who');}catch(e){}renderAll();}},'Jugo com a '+nm(S.who)+' · canviar'))
  ));
}

function renderChallenge(){
  if(!ready()){put('challenge',null);return;}
}

function renderRewards(){
  if(!ready()){put('rewards',null);return;}
  var la=level('a'),lb=level('b');
  var sig=JSON.stringify([la,lb,S.who,S.names,Object.keys(S.rewards).sort().map(function(k){return [k,S.rewards[k].text];})]);
  if(sig===S.sig&&$('rewards').firstChild)return;
  S.sig=sig;
  function col(p){
    var lv=level(p),pts=score(p),rows=[];
    for(var n=lv;n>=1;n--){(function(n){
      var r=S.rewards[p+'-'+n],o=other(p);
      var body;
      if(r&&r.text)body=h('div',{class:'tx'},r.text);
      else if(S.who===o){
        var inp=h('input',{type:'text',maxlength:'140',placeholder:'Què s\'ha guanyat '+nm(p)+'?','aria-label':'Premi del nivell '+n+' de '+nm(p)});
        var sv=h('button',{class:'btn sm',type:'button',onclick:function(){
          var t=inp.value.trim();if(t.length<2){toast('Escriu el premi.');return;}
          sv.disabled=true;
          api.saveReward({player:p,level:n,text:t})
            .catch(function(e){toast(saveErr(e));sv.disabled=false;});
        }},'Guardar');
        body=h('div',{class:'row'},inp,sv);
      } else body=h('div',{class:'pend'},'Pendent: '+nm(o)+' l\'ha d\'inventar');
      rows.push(h('div',{class:'prize'},h('div',{class:'lv'},'Nivell '+n+' · '+(n*STEP)+' punts'),body));
    })(n);}
    if(!rows.length)rows.push(h('div',{class:'prize pend'},'El primer premi es desbloqueja als '+STEP+' punts. En falten '+(STEP-pts)+'.'));
    return h('div',null,h('h3',null,h('span',{class:'dot',style:'background:var(--'+p+')'}),nm(p)),rows);
  }
  put('rewards',h('section',{class:'card'},h('h2',null,'Premis'),
    h('p',{class:'tiny',style:'margin:-4px 0 12px'},'Cada '+STEP+' punts es desbloqueja un premi. El premi l\'inventa l\'altra persona.'),
    h('div',{class:'two'},col('a'),col('b'))));
}

function renderWall(){
  var card=$('wallcard');
  if(!ready()){card.hidden=true;return;}
  card.hidden=false;
  var wall=$('wall');wall.replaceChildren();
  if(!S.moments.length){wall.append(h('div',{class:'empty'},'Encara no hi ha cap frase. La primera cosa maca ja és un punt.'));return;}
  S.moments.slice(0,200).forEach(function(m){
    var d=new Date(m.ts),c=catOf(m.cat);
    var del;
    if(S.confirmDel===m.id)del=h('span',null,
      h('button',{class:'link',type:'button',onclick:function(){S.confirmDel=null;api.deleteMoment(m.id).catch(function(e){toast(saveErr(e));});}},'Esborrar de debò'),' ',
      h('button',{class:'link',type:'button',onclick:function(){S.confirmDel=null;renderWall();}},'Cancel·lar'));
    else del=h('button',{class:'link',type:'button',onclick:function(){S.confirmDel=m.id;renderWall();}},'Esborrar');
    wall.append(h('article',{class:'mom'},
      h('div',{class:'sc '+m.speaker,'aria-label':m.pts+' punts'},'+'+m.pts),
      h('blockquote',null,'“'+m.text+'”'),
      h('div',{class:'by'},h('span',null,nm(m.speaker)),h('span',null,'· '+c.n),
        h('span',null,'· '+d.toLocaleDateString('ca',{day:'numeric',month:'short'})+', '+pad(d.getHours())+':'+pad(d.getMinutes())),del)));
  });
}

function renderChallengeCard(){
  var z=$('challenge');
  if(!z)return;
  if(!ready()){z.replaceChildren();return;}
  z.replaceChildren(h('section',{class:'rep'},
    h('div',{class:'k'},'Repte de la setmana · +'+REPTE.p),
    h('p',null,CHALLENGE),
    h('div',{class:'st'},['a','b'].map(function(p){
      return h('span',{class:reptDone(p)?'ok':'pend'},nm(p)+': '+(reptDone(p)?'fet':'pendent'));
    })),
    S.who?h('div',null,h('button',{class:'btn sm',type:'button',onclick:function(){
      S.speaker=S.who;if(reptDone(S.speaker))S.speaker=other(S.who);
      if(!reptDone(S.speaker))S.cat='repte';
      renderAdd();var f=$('phrase');if(f){f.scrollIntoView({behavior:'smooth',block:'center'});f.focus({preventScroll:true});}
    }},'Apunta\'l')):null));
}

function renderAll(){
  $('btn-names').hidden=!(S.authed&&S.cfgLoaded&&ready()&&!(cfg.names&&cfg.names[0]&&cfg.names[1]));
  $('btn-out').hidden=!S.authed;
  $('btn-colors').hidden=!(S.authed&&ready()&&S.who);
  $('btn-push').hidden=!(S.authed&&ready()&&S.who&&cfg.vapid);
  renderTop();renderBoard();renderColors();renderPush();syncPush();renderChallengeCard();renderGames();renderHugs();renderLetters();renderAdd();renderRewards();renderWall();
}

/* challenge slot lives above the form */
(function(){var z=document.createElement('div');z.id='challenge';$('board').after(z);})();

$('btn-letter').addEventListener('click',function(){var z=$('letters');z.scrollIntoView({behavior:'smooth',block:'start'});var t=document.getElementById('ltext')||document.getElementById('cityq');if(t)setTimeout(function(){try{t.focus({preventScroll:true});}catch(e){}},400);});
$('btn-names').addEventListener('click',function(){S.editNames=!S.editNames;renderTop();});

/* ---------- Supabase ---------- */
var cfg=window.PUNTS_CONFIG||{};
function setupWhy(){
  if(!window.supabase)return 'no s\'ha carregat la llibreria de Supabase (comprova la connexió o que index.html la inclogui).';
  if(!window.PUNTS_CONFIG)return 'config.js no s\'ha carregat o té un error d\'escriptura (falta una coma, una cometa o una clau }).';
  if(!cfg.url||cfg.url.indexOf('http')!==0)return 'la URL de config.js no comença per https://.';
  if(!cfg.key)return 'falta la clau (key) a config.js.';
  if(/EL-TEU|LA-TEVA/.test(cfg.url+cfg.key))return 'config.js encara té els valors d\'exemple (o la pàgina mostra una còpia antiga: prova Ctrl+Shift+R).';
  return 'desconegut.';
}
var sb=null;
function chk(r){if(r&&r.error)throw r.error;return r;}
var api={
  saveNames:function(a,b){return sb.from('pp_config').upsert({id:1,name_a:a,name_b:b}).then(chk).then(loadAll);},
  addMoment:function(m){return sb.from('pp_moments').insert(m).then(chk).then(loadAll);},
  savePref:function(r){return sb.from('pp_prefs').upsert(r).then(chk).then(loadAll);},
  delPref:function(p){return sb.from('pp_prefs').delete().eq('player',p).then(chk).then(loadAll);},
  savePlace:function(r){return sb.from('pp_places').upsert(r).then(chk).then(loadAll);},
  sendLetter:function(r){return sb.from('pp_letters').insert(r).then(chk).then(loadAll);},
  readLetter:function(id){return sb.from('pp_letters').update({read_at:new Date().toISOString()}).eq('id',id).is('read_at',null).then(chk).then(loadAll);},
  giveHug:function(){var n=new Date();return sb.from('pp_hugs').insert({kind:'give',from_player:S.who,status:'done',day:dayKey(n)}).then(chk).then(loadAll);},
  askHug:function(){var n=new Date();return sb.from('pp_hugs').insert({kind:'ask',from_player:S.who,status:'pending',day:dayKey(n)}).then(chk).then(loadAll);},
  returnHug:function(id){var n=new Date();return sb.from('pp_hugs').update({status:'returned',ret_day:dayKey(n),ret_ts:n.toISOString()}).eq('id',id).eq('status','pending').then(chk).then(loadAll);},
  saveAnswer:function(r){return sb.from('pp_answers').insert(r).then(chk).then(loadAll);},
  saveReward:function(r){return sb.from('pp_rewards').upsert(r).then(chk).then(loadAll);},
  deleteMoment:function(id){return sb.from('pp_moments').delete().eq('id',id).then(chk).then(loadAll);}
};
function saveErr(e){
  var m=String(e&&e.message||e||'');
  if(/row-level security|permission|policy/i.test(m))return 'No tens permís: el teu correu no és a pp_allowed (o falta executar supabase.sql).';
  if(/does not exist|schema cache|relation|Could not find/i.test(m))return 'Falta una taula a Supabase: executa supabase.sql i supabase_jocs.sql.';
  if(/fetch|network|load failed/i.test(m))return 'No puc connectar amb Supabase.';
  return 'No s\'ha pogut guardar: '+m;
}
function loginMsg(e){
  var m=String(e&&e.message||e||'');
  if(/invalid login/i.test(m))return 'Correu o contrasenya incorrectes, o l\'usuari no existeix en aquest projecte.';
  if(/not confirmed/i.test(m))return 'Falta confirmar el correu: a Supabase, obre l\'usuari i confirma\'l.';
  if(/fetch|network|load failed/i.test(m))return 'No puc connectar amb Supabase. Revisa la URL de config.js.';
  if(/api key|apikey|jwt/i.test(m))return 'La clau de config.js no és vàlida per a aquest projecte.';
  return 'Error: '+m;
}
function login(email,pass){
  return sb.auth.signInWithPassword({email:email,password:pass}).then(function(r){
    if(r.error)throw r.error;S.authed=true;start();
  });
}
function loadAll(){
  return Promise.all([
    sb.from('pp_config').select('*').eq('id',1).maybeSingle(),
    sb.from('pp_moments').select('*').order('ts',{ascending:false}).limit(1000),
    sb.from('pp_rewards').select('*'),
    sb.from('pp_answers').select('*').order('day',{ascending:false}).limit(2000),
    sb.from('pp_prefs').select('*'),
    sb.from('pp_hugs').select('*').order('ts',{ascending:false}).limit(500),
    sb.from('pp_places').select('*'),
    sb.from('pp_letters').select('*').order('sent_at',{ascending:false}).limit(300)
  ]).then(function(rs){
    var c=rs[0].data;
    var fx=cfg.names;
    S.names=(fx&&fx.length===2&&fx[0]&&fx[1])?{a:String(fx[0]),b:String(fx[1])}:(c?{a:c.name_a,b:c.name_b}:null);S.cfgLoaded=true;
    if(S.who&&!S.speaker)S.speaker=other(S.who);
    S.moments=(rs[1].data||[]).map(function(x){return {id:x.id,speaker:x.speaker,cat:x.cat,pts:x.pts,text:x.text,ts:new Date(x.ts).getTime(),day:x.day,wk:x.wk};});
    var r={};(rs[2].data||[]).forEach(function(x){r[x.player+'-'+x.level]={player:x.player,level:x.level,text:x.text};});
    S.rewards=r;
    S.answers=(rs[3].data||[]).map(function(x){return {day:x.day,game:x.game,slot:x.slot,player:x.player,answer:x.answer,prompt:x.prompt};});
    S.colors={a:null,b:null};(rs[4].data||[]).forEach(function(x){if(x.player==='a'||x.player==='b')S.colors[x.player]=x.color;});applyColors();
    S.hugs=(rs[5].data||[]).map(function(x){return {id:x.id,kind:x.kind,from_player:x.from_player,status:x.status,day:x.day,ret_day:x.ret_day,ts:new Date(x.ts).getTime()};});
    S.places={a:null,b:null};(rs[6].data||[]).forEach(function(x){if(x.player==='a'||x.player==='b')S.places[x.player]={name:x.name,lat:x.lat,lon:x.lon};});
    S.letters=(rs[7].data||[]).map(function(x){return {id:x.id,from_player:x.from_player,to_player:x.to_player,transport:x.transport,distance_km:x.distance_km,body:x.body,sent:new Date(x.sent_at).getTime(),arrive:new Date(x.arrive_at).getTime(),read:!!x.read_at};});
    S.ai={};S.answers.forEach(function(a){S.ai[a.day+'|'+a.game+'|'+a.slot+'|'+a.player]=a;});
    if(S.editNames||document.activeElement&&(document.activeElement.id==='phrase'||document.activeElement.id==='qans')){
      renderBoard();renderChallengeCard();renderRewards();renderWall();
      if(!S.editNames){renderGames();renderHugs();renderLetters();renderAdd();}
    }else renderAll();
  }).catch(function(){toast('No he pogut carregar el marcador.');});
}
var started=false;
function start(){
  if(started){loadAll();return;}
  started=true;
  sb.channel('punts').on('postgres_changes',{event:'*',schema:'public'},function(){loadAll();}).subscribe();
  loadAll();
}
$('btn-colors').addEventListener('click',function(){S.colorsOpen=!S.colorsOpen;renderColors();});
$('btn-push').addEventListener('click',function(){S.pushOpen=!S.pushOpen;renderPush();});
$('btn-out').addEventListener('click',function(){
  sb.auth.signOut().then(function(){S.authed=false;S.colorsOpen=false;S.pushOpen=false;S.colors={a:null,b:null};applyColors();S.cfgLoaded=false;S.names=null;S.moments=[];S.rewards={};started=false;renderAll();});
});
if(!window.supabase||!cfg.url||cfg.url.indexOf('http')!==0||!cfg.key||/EL-TEU|LA-TEVA/.test(cfg.url+cfg.key)){S.setup=true;renderAll();}
else{
  sb=window.supabase.createClient(cfg.url,cfg.key);
  renderAll();
  sb.auth.getSession().then(function(r){
    if(r.data&&r.data.session){S.authed=true;renderAll();start();}else renderAll();
  });
}
})();
