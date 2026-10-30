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


var S={authed:false,setup:false,names:null,cfgLoaded:false,moments:[],rewards:{},answers:[],ai:{},hugs:[],kisses:[],surprises:[],places:{a:null,b:null},letters:[],offers:[],redeems:[],c4:[],chat:[],chatOpen:false,dates:[],calSel:null,calMonth:null,dateForm:null,ltr:null,openL:null,editPlace:false,lsig:'',colors:{a:null,b:null},colorsOpen:false,pushOpen:false,pushSub:false,pushSynced:'',who:null,speaker:null,cat:'maca',editNames:false,confirmDel:null,saving:false,sig:''};
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
function score(p){return S.moments.reduce(function(s,m){return m.speaker===p?s+(+m.pts||0):s;},0)+gamePts(p)+hugPts(p)+kissPts(p);}
function level(p){return Math.floor(score(p)/STEP);}
function streak(p){
  var days={};S.moments.forEach(function(m){if(m.speaker===p)days[m.day]=1;});S.answers.forEach(function(a){if(a.player===p)days[a.day]=1;});S.hugs.forEach(function(x){if(x.from_player===p)days[x.day]=1;if(x.status==='returned'&&x.from_player!==p&&x.ret_day)days[x.ret_day]=1;});S.kisses.forEach(function(x){if(x.from_player===p)days[x.day]=1;if(x.status==='returned'&&x.from_player!==p&&x.ret_day)days[x.ret_day]=1;});
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

/* ---------- sorpreses: pluja de cors ---------- */
var HEARTCOL=['#ff6b8b','#ff9eb5','#f4c98b','#ffffff','#e23e6b','#ffc1d0'];
function surpriseOverlay(from,msg,onClose){
  var old=document.getElementById('surprise');if(old)old.remove();
  var rain=h('div',{class:'srain','aria-hidden':'true'}),i;
  for(i=0;i<64;i++){
    var s=document.createElement('span');s.className='hrt';s.textContent='♥';
    s.style.left=(Math.random()*100).toFixed(1)+'%';
    s.style.fontSize=(14+Math.random()*34).toFixed(0)+'px';
    s.style.color=HEARTCOL[i%HEARTCOL.length];
    s.style.animationDuration=(4.5+Math.random()*5).toFixed(1)+'s';
    s.style.animationDelay=(-Math.random()*9).toFixed(1)+'s';
    s.style.opacity=(0.55+Math.random()*0.45).toFixed(2);
    rain.append(s);
  }
  var len=msg.length,cls=len>28?' xs':(len>14?' sm':'');
  var btn=h('button',{class:'sbtn',type:'button',onclick:function(){ov.remove();document.body.classList.remove('nosc');if(onClose)onClose();}},'♥ Tancar');
  var ov=h('div',{id:'surprise',class:'sur',role:'dialog','aria-modal':'true','aria-label':'Una sorpresa per a tu'},
    rain,
    h('div',{class:'sbox'},
      h('div',{class:'sfrom'},from?'Una sorpresa de '+from:'Una sorpresa'),
      h('div',{class:'smsg'+cls},msg),
      h('div',{class:'sbig','aria-hidden':'true'},'♥'),
      btn));
  document.body.classList.add('nosc');
  document.body.append(ov);
  setTimeout(function(){try{btn.focus({preventScroll:true});}catch(e){}},50);
}
function checkSurprise(){
  if(!S.authed||!ready()||!S.who||document.hidden)return;
  var me=S.who,list=S.surprises.filter(function(x){return x.to_player===me&&!x.seen;}).sort(function(a,b){return a.ts-b.ts;});
  var x=list[0];
  if(!x||S.surShown===x.id||document.getElementById('surprise'))return;
  S.surShown=x.id;
  surpriseOverlay(nm(x.from_player),x.message,function(){api.seeSurprise(x.id).catch(function(){});});
}
document.addEventListener('visibilitychange',function(){if(!document.hidden)checkSurprise();});
function renderSurpriseCard(){
  var z=$('surp');if(!z)return;
  if(!ready()||!S.who){z.replaceChildren();return;}
  var ae=document.activeElement;if(z.firstChild&&ae&&ae.id==='surmsg')return;
  var me=S.who,ot=other(me),prev=document.getElementById('surmsg'),keep=prev?prev.value:'T’estimo';
  var pend=S.surprises.filter(function(x){return x.from_player===me&&!x.seen;});
  var inp=h('input',{type:'text',id:'surmsg',maxlength:'80',value:keep,'aria-label':'Missatge de la sorpresa'});
  var parts=[
    h('p',{class:'tiny',style:'margin:0 0 10px'},'Una pluja de cors amb el missatge que triïs. A '+nm(ot)+' li sortirà la propera vegada que obri l’aplicació, sense cap avís previ perquè sigui sorpresa.'),
    inp,
    h('div',{class:'row',style:'margin-top:10px'},
      h('button',{class:'btn sm '+me,type:'button',style:'flex:1',onclick:function(){
        var m=inp.value.trim();if(!m){toast('Escriu el missatge.');return;}
        lAct(function(){return api.sendSurprise({from_player:me,to_player:ot,message:m});},'Sorpresa enviada. La veurà quan obri l’aplicació.');
      }},'Enviar la sorpresa'),
      h('button',{class:'btn sm',type:'button',style:'flex:none;background:var(--soft);color:var(--fg)',onclick:function(){
        surpriseOverlay(nm(me),inp.value.trim()||'T’estimo',null);
      }},'Veure com queda'))];
  if(pend.length)parts.push(h('p',{class:'tiny',style:'margin:10px 0 0'},pend.length===1?'Hi ha 1 sorpresa esperant que '+nm(ot)+' obri l’aplicació.':'Hi ha '+pend.length+' sorpreses esperant que '+nm(ot)+' obri l’aplicació.'));
  z.replaceChildren(h('section',{class:'card'},h('h2',null,'Sorpresa'),parts));
}

/* ---------- petons (màxim 3 al dia per persona) ---------- */
var KISSPTS=1,KISSMAX=3;
function kissPts(p){
  var n=0;
  S.kisses.forEach(function(x){
    if(x.kind==='give'){if(x.from_player===p)n+=KISSPTS;}
    else if(x.status==='returned')n+=KISSPTS;
  });
  return n;
}
function kissesToday(p){var k=dayKey(new Date());return S.kisses.filter(function(x){return x.from_player===p&&x.day===k;}).length;}
var kSaving=false;
function kissAct(fn,msg){
  if(kSaving)return;kSaving=true;
  fn().then(function(){toast(msg);}).catch(function(e){toast(saveErr(e));}).then(function(){kSaving=false;renderKisses();});
}
function renderKisses(){
  var z=$('kisses');
  if(!ready()||!S.who){z.replaceChildren();return;}
  var me=S.who,ot=other(me),used=kissesToday(me),left=Math.max(0,KISSMAX-used);
  var inc=S.kisses.filter(function(x){return x.kind==='ask'&&x.status==='pending'&&x.from_player===ot;});
  var out=S.kisses.filter(function(x){return x.kind==='ask'&&x.status==='pending'&&x.from_player===me;});
  var give=h('button',{class:'btn sm '+me,type:'button',disabled:left<1,onclick:function(){kissAct(function(){return api.giveKiss();},'Petó donat: +'+KISSPTS);}},left<1?'Límit d\'avui assolit':'Donar petó · +'+KISSPTS);
  var ask=h('button',{class:'btn sm ghost',type:'button',disabled:out.length>0||left<1,onclick:function(){kissAct(function(){return api.askKiss();},'Petó demanat');}},out.length?'Ja n\'has demanat un':'Demanar petó');
  var dots=[];for(var i=0;i<KISSMAX;i++)dots.push(h('span',{class:'kdot'+(i<used?' on':'')},'♥'));
  var parts=[h('div',{class:'hugbtns'},give,ask),
    h('div',{class:'kleft'},h('span',{class:'tiny'},'Petons d\'avui: '+used+' de '+KISSMAX),h('span',{class:'kdots','aria-hidden':'true'},dots))];
  inc.forEach(function(x){
    parts.push(h('div',{class:'hugreq'},h('div',null,h('b',null,nm(ot)),' et demana un petó.'),
      h('button',{class:'btn sm '+me,type:'button',onclick:function(){kissAct(function(){return api.returnKiss(x.id);},'Petó tornat: +'+KISSPTS+' per als dos');}},'Tornar el petó · +'+KISSPTS+' per als dos')));
  });
  if(out.length)parts.push(h('p',{class:'tiny',style:'margin:10px 0 0'},'Esperant que '+nm(ot)+' et torni el petó. Si el torna, sumeu '+KISSPTS+' punt cadascú.'));
  var rows=S.kisses.slice().sort(function(x,y){return y.ts-x.ts;}).slice(0,6).map(function(x){
    var txt;
    if(x.kind==='give')txt=nm(x.from_player)+' ha donat un petó · +'+KISSPTS;
    else if(x.status==='returned')txt=nm(other(x.from_player))+' ha tornat el petó a '+nm(x.from_player)+' · +'+KISSPTS+' cadascú';
    else txt=nm(x.from_player)+' ha demanat un petó · pendent';
    return h('div',{class:'hugrow'},h('span',null,txt),h('span',{class:'tiny'},fmtWhen(x.ts)));
  });
  if(rows.length)parts.push(h('div',{class:'hugs'},rows));
  z.replaceChildren(h('section',{class:'card'},h('h2',null,'Petons'),parts));
}

/* ---------- retrobada i hora de l'altre ---------- */
function tzOffMin(tz,date){
  try{
    var o={};new Intl.DateTimeFormat('en-GB',{timeZone:tz,hourCycle:'h23',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit'}).formatToParts(date).forEach(function(x){o[x.type]=x.value;});
    var u=Date.UTC(+o.year,+o.month-1,+o.day,+o.hour,+o.minute,+o.second);
    return Math.round((u-Math.floor(date.getTime()/1000)*1000)/60000);
  }catch(e){return null;}
}
function placeOff(pl,date){var o=pl.tz?tzOffMin(pl.tz,date):null;return o==null?Math.round(pl.lon/15)*60:o;}
function nextAug1(){var n=new Date(),t=new Date(n.getFullYear(),n.getMonth(),n.getDate()),d=new Date(n.getFullYear(),7,1);if(d<t)d=new Date(n.getFullYear()+1,7,1);return d;}
function parseDay(v){var m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(v||'');return m?new Date(+m[1],+m[2]-1,+m[3]):null;}
function ymd(d){return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());}
function meetInfo(){
  var n=new Date(),today=new Date(n.getFullYear(),n.getMonth(),n.getDate()),d=parseDay(S.meet),exact=true;
  if(!d||d<today){d=nextAug1();exact=false;}
  return {d:d,days:Math.round((d-today)/864e5),exact:exact};
}
function backfillTz(){
  var m=S.who&&S.places&&S.places[S.who];
  if(!m||m.tz||S.tzTry===S.who+'|'+m.name)return;
  S.tzTry=S.who+'|'+m.name;
  searchCity(shortPlace(m.name)).then(function(list){
    var best=null,bd=1e9;
    list.forEach(function(x){if(!x.tz)return;var dd=haversine(+m.lat,+m.lon,x.lat,x.lon);if(dd<bd){bd=dd;best=x;}});
    if(best&&bd<60)return api.savePlace({player:S.who,name:m.name,lat:m.lat,lon:m.lon,tz:best.tz});
  }).catch(function(){});
}
function renderMeet(){
  var z=$('meet');if(!z)return;
  if(!ready()||!S.who){z.replaceChildren();return;}
  if(S.meetEdit&&z.firstChild)return;
  var me=S.who,ot=other(me),mi=meetInfo(),parts=[];
  var dtxt=mi.d.toLocaleDateString('ca',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
  var big=mi.days===0?h('div',{class:'mbig'},'Avui us veieu ',h('span',{class:'heart'},'♥')):
    h('div',{class:'mrow'},h('span',{class:'mnum'},String(mi.days)),h('span',{class:'mlab'},(mi.days===1?'dia':'dies')+' per veure’ns'));
  parts.push(big,h('div',{class:'tiny'},(mi.exact?'':'Data orientativa: ')+dtxt));
  if(S.meetEdit){
    var inp=h('input',{type:'date',id:'meetd',value:mi.exact?ymd(mi.d):''});
    parts.push(h('div',{class:'row',style:'margin-top:10px'},inp,
      h('button',{class:'btn sm '+me,type:'button',onclick:function(){
        var v=inp.value;if(!parseDay(v)){toast('Tria una data.');return;}
        lAct(function(){return api.saveMeet(v);},'Data guardada').then(function(){S.meetEdit=false;z.replaceChildren();renderMeet();});
      }},'Guardar')),
      h('div',{class:'row',style:'margin-top:8px;gap:14px'},
        h('button',{class:'link',type:'button',onclick:function(){lAct(function(){return api.saveMeet(null);},'Tornem a l’1 d’agost').then(function(){S.meetEdit=false;z.replaceChildren();renderMeet();});}},'Encara no sabem el dia'),
        h('button',{class:'link',type:'button',onclick:function(){S.meetEdit=false;z.replaceChildren();renderMeet();}},'Cancel·lar')));
  }else{
    parts.push(h('button',{class:'link',type:'button',onclick:function(){S.meetEdit=true;z.replaceChildren();renderMeet();}},'Canviar la data'));
  }
  var pl=S.places&&S.places[ot];
  if(pl){
    var now=new Date(),off=placeOff(pl,now),d=new Date(now.getTime()+off*60000),hh=d.getUTCHours(),mm=d.getUTCMinutes();
    var mine=S.places[me],myOff=mine?placeOff(mine,now):-now.getTimezoneOffset(),diff=(off-myOff)/60;
    var approx=!(pl.tz&&tzOffMin(pl.tz,now)!=null);
    var day=hh>=7&&hh<21,dtx=diff===0?'la mateixa hora':(diff>0?'+':'−')+Math.abs(Math.round(diff*10)/10).toString().replace('.',',')+' h respecte a tu';
    parts.push(h('div',{class:'mclock'},h('span',{class:'sun'},day?'☀':'☾'),
      h('div',null,h('div',{class:'ctime'},nm(ot)+' · '+pad(hh)+':'+pad(mm)),
        h('div',{class:'tiny'},shortPlace(pl.name)+' · '+(day?'de dia':'de nit')+' · '+dtx+(approx?' (aprox.)':'')))));
  }
  z.replaceChildren(h('section',{class:'card meet'},parts));
}
setInterval(function(){if(S.authed&&ready()&&S.who)renderMeet();},30000);

/* ---------- cartes ---------- */
var TRANSPORTS=[
 {k:'colom',n:'Colom missatger',kmh:55,road:1,over:0,d:'Vola en línia recta, sense pressa.',
  svg:'<path d="M3 16c3 1 6 0 8-3l2-4 2 3 5 1-4 2c-1 4-5 6-9 5l-3 2z"/><circle cx="15.5" cy="9.5" r=".6"/>'},
 {k:'cotxe',n:'Cotxe',kmh:80,road:1.25,over:0,d:'Per carretera.',
  svg:'<path d="M3 15l2-5h14l2 5v3h-3v-2H6v2H3z"/><path d="M5 10l1.5-3h11L19 10"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>'},
 {k:'vaixell',n:'Vaixell',kmh:30,road:1.15,over:240,d:'Lent, però segur. Inclou 4 h de càrrega.',
  svg:'<path d="M3 16h18l-2.5 4h-13z"/><path d="M12 3v13"/><path d="M12 4l6 9h-6"/><path d="M12 6L7 13h5"/>'},
 {k:'avio',n:'Avió',kmh:800,road:1,over:120,d:'El més ràpid. Inclou 2 h d\'aeroport.',
  svg:'<path d="M21 3L3 10l7 3 3 7z"/><path d="M10 13l5-5"/>'},
 {k:'capsula',n:'Càpsula del temps',cap:true,d:'Tu tries el dia que s\'obrirà: un aniversari, un dia difícil, d\'aquí a un any…',
  svg:'<path d="M6 3h12M6 21h12"/><path d="M7 3c0 5 5 6 5 9s-5 4-5 9M17 3c0 5-5 6-5 9s5 4 5 9"/>'}
];
function isCap(x){return x&&x.transport==='capsula';}
function trOf(k){return TRANSPORTS.filter(function(t){return t.k===k;})[0]||TRANSPORTS[0];}
function icon(t){var s=document.createElement('span');s.className='ico';s.innerHTML='<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+t.svg+'</svg>';return s;}
function haversine(a,b,c,d){
  var R=6371,r=Math.PI/180,dl=(c-a)*r,dn=(d-b)*r;
  var x=Math.sin(dl/2)*Math.sin(dl/2)+Math.cos(a*r)*Math.cos(c*r)*Math.sin(dn/2)*Math.sin(dn/2);
  return 2*R*Math.asin(Math.min(1,Math.sqrt(x)));
}
function distKm(){var a=S.places.a,b=S.places.b;return(a&&b)?haversine(+a.lat,+a.lon,+b.lat,+b.lon):null;}
function etaMin(t,km){if(t.cap)return 1;return Math.max(1,Math.round(t.over+km*t.road/t.kmh*60));}
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
  var o={day:'numeric',month:'long'};if(d.getFullYear()!==n.getFullYear())o.year='numeric';
  return d.toLocaleDateString('ca',o)+' a les '+hm;
}
function fmtKm(km){return Math.round(km).toLocaleString('ca')+' km';}
function searchCity(q){
  return fetch('https://geocoding-api.open-meteo.com/v1/search?name='+encodeURIComponent(q)+'&count=6&language=ca&format=json')
    .then(function(r){if(!r.ok)throw new Error('geo');return r.json();})
    .then(function(j){return (j.results||[]).map(function(x){return {name:[x.name,x.admin1,x.country].filter(Boolean).join(', '),lat:x.latitude,lon:x.longitude,tz:x.timezone||null};});});
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
      savePlace(nmI.value.trim(),a,b,null);
    }},'Guardar');
    res.append(h('p',{class:'tiny',style:'margin:8px 0'},'No trobo el lloc. Pots escriure les coordenades (a Google Maps, clic dret sobre el mapa):'),nmI,la,lo,sv);
  }
  function doSearch(){
    var v=q.value.trim();if(v.length<2){toast('Escriu el nom d\'una ciutat.');return;}
    res.replaceChildren(h('p',{class:'tiny'},'Cercant…'));
    searchCity(v).then(function(list){
      res.replaceChildren();
      if(!list.length){showManual();return;}
      list.forEach(function(x){res.append(h('button',{class:'cityopt',type:'button',onclick:function(){savePlace(x.name,x.lat,x.lon,x.tz);}},x.name));});
    }).catch(function(){res.replaceChildren();res.append(h('p',{class:'tiny'},'No puc cercar ara.'));showManual();});
  }
  go.addEventListener('click',doSearch);
  q.addEventListener('keydown',function(e){if(e.key==='Enter')doSearch();});
  return h('div',null,h('div',{class:'row'},q,go),res);
}
function savePlace(name,lat,lon,tz){
  lAct(function(){return api.savePlace({player:S.who,name:name,lat:lat,lon:lon,tz:tz||null});},'Ubicació guardada').then(function(){S.editPlace=false;S.lsig='';renderLetters();});
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
          S.ltr=t.k;document.getElementById('lcap').hidden=!t.cap;Array.prototype.forEach.call(document.querySelectorAll('#letters .tr'),function(b){b.setAttribute('aria-pressed',String(b.getAttribute('data-k')===t.k));});
          document.getElementById('lsend').textContent=t.cap?'Segellar la càpsula':'Enviar carta amb '+t.n.toLowerCase();
        }},icon(t),h('span',{class:'tn'},t.n),h('span',{class:'te'},t.cap?'Tu tries el dia':fmtDur(m)),h('span',{class:'td'},t.d));
      });
      send.addEventListener('click',function(){
        var txt=ta.value.trim();
        if(txt.length<2){toast('Escriu la carta abans d\'enviar-la.');ta.focus();return;}
        if(!S.ltr){toast('Tria com viatjarà la carta.');return;}
        var t=trOf(S.ltr),m=etaMin(t,km),row={from_player:me,to_player:ot,transport:t.k,distance_km:Math.round(km),duration_min:m,body:txt},msg;
        if(t.cap){
          var v=(document.getElementById('lopen')||{}).value,od=v?new Date(v):null;
          if(!od||isNaN(od.getTime())||od.getTime()<Date.now()+120000||od.getTime()>Date.now()+5*365*864e5){toast('Tria quan s\'obrirà (entre d\'aquí 2 minuts i 5 anys).');return;}
          row.open_at=od.toISOString();row.distance_km=0;msg='Càpsula segellada. S\'obrirà '+fmtClock(od.getTime())+'.';
        }else msg='Carta enviada. Arribarà '+fmtClock(Date.now()+m*60000)+'.';
        send.disabled=true;
        lAct(function(){return api.sendLetter(row);},msg)
          .then(function(){ta.value='';send.disabled=false;});
      });
      if(S.ltr)send.textContent=trOf(S.ltr).cap?'Segellar la càpsula':'Enviar carta amb '+trOf(S.ltr).n.toLowerCase();
      var cap=h('div',{id:'lcap',class:'lcap',hidden:S.ltr!=='capsula'},
        h('label',{class:'lab',for:'lopen'},'Quan s\'ha d\'obrir?'),
        h('input',{type:'datetime-local',id:'lopen',value:S.lopen||'',oninput:function(ev){S.lopen=ev.target.value;}}),
        h('p',{class:'tiny',style:'margin:6px 0 0'},nm(ot)+' rebrà un avís quan s\'obri, però no podrà llegir-la abans.'));
      parts.push(h('span',{class:'lab'},'Nova carta'),ta,h('span',{class:'lab'},'Com viatjarà?'),h('div',{class:'trs'},opts),cap,send);
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
      if(isCap(x)){
        out.push(h('div',{class:'lt'},h('div',{class:'lth'},icon(t),h('div',null,
          h('div',{class:'ltt'},mineL?'Càpsula del temps per a '+nm(x.to_player):'Càpsula del temps de '+nm(x.from_player)),
          h('div',{class:'tiny'},'Es podrà obrir d\'aquí '+fmtDur((x.arrive-now)/60000)+' ('+fmtClock(x.arrive)+')'))),
          h('div',{class:'prog'},h('i',{style:'width:'+pct+'%'})),
          mineL?h('div',{class:'lbody'},x.body):null));
        return;
      }
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
          h('div',{class:'ltt'},isCap(x)?'Càpsula per a '+nm(x.to_player):'Enviada a '+nm(x.to_player)+' · '+t.n.toLowerCase()),
          h('div',{class:'tiny'},(isCap(x)?'Es va obrir ':'Va arribar ')+fmtClock(x.arrive)+(x.read?' · llegida':' · encara sense llegir')))),
          h('div',{class:'lbody'},x.body)));
      }else if(!x.read&&S.openL!==x.id){
        out.push(h('div',{class:'lt new'},h('div',{class:'lth'},icon(t),h('div',null,
          h('div',{class:'ltt'},isCap(x)?'S\'ha obert una càpsula del temps de '+nm(x.from_player):'Ha arribat una carta de '+nm(x.from_player)),
          h('div',{class:'tiny'},isCap(x)?'Segellada '+fmtClock(x.sent):'Ha viatjat en '+t.n.toLowerCase()+' (' +fmtKm(x.distance_km)+')'))),
          h('button',{class:'btn sm '+me,type:'button',onclick:function(){
            S.openL=x.id;renderLetterLists();
            lAct(function(){return api.readLetter(x.id);});
          }},isCap(x)?'Obrir càpsula':'Obrir carta')));
      }else{
        out.push(h('div',{class:'lt'},h('div',{class:'lth'},icon(t),h('div',null,
          h('div',{class:'ltt'},isCap(x)?'Càpsula de '+nm(x.from_player):'De '+nm(x.from_player)+' · '+t.n.toLowerCase()),
          h('div',{class:'tiny'},(isCap(x)?'Es va obrir ':'Va arribar ')+fmtClock(x.arrive)))),
          h('div',{class:'lbody'},x.body)));
      }
    });
  }
  if(!ls.length)out.push(h('p',{class:'tiny',style:'margin:14px 0 0'},'Encara no hi ha cap carta. La primera que envieu començarà el seu viatge.'));
  box.replaceChildren.apply(box,out);
}
setInterval(function(){if(S.authed&&ready()&&S.who)renderLetterLists();updateCta();},30000);


/* ---------- calendari de dates assenyalades ---------- */
function dimL(y,m){return new Date(y,m,0).getDate();}
function occursOn(ev,y,m,d){
  if(d!==Math.min(ev.day,dimL(y,m)))return false;
  var s=ev.since;
  if(ev.repeat==='monthly')return !(s&&y*12+m<s.y*12+s.m);
  if(ev.repeat==='yearly')return ev.month===m&&!(s&&y<s.y);
  return !!s&&s.y===y&&s.m===m&&s.d===d;
}
function countTxt(ev,y,m){
  if(!ev.since||ev.repeat==='once')return '';
  var s=ev.since,n=ev.repeat==='monthly'?y*12+m-(s.y*12+s.m):(y-s.y)*12;
  if(n<=0)return '';
  var yy=Math.floor(n/12),mm=n%12,p=[];
  if(yy)p.push(yy+(yy===1?' any':' anys'));
  if(mm)p.push(mm+(mm===1?' mes':' mesos'));
  return p.join(' i ');
}
/* dates especials d'avui en endavant: [{ev,date,days,label}] */
function calEvents(){
  var list=S.dates.map(function(e){return {ev:e,title:e.title};});
  if(S.meet){var md=parseDay(S.meet);if(md)list.push({ev:{id:'meet',title:'Retrobada',repeat:'once',day:md.getDate(),month:md.getMonth()+1,since:{y:md.getFullYear(),m:md.getMonth()+1,d:md.getDate()},fixed:true},title:'Retrobada'});}
  return list;
}
function eventsOn(y,m,d){return calEvents().filter(function(x){return occursOn(x.ev,y,m,d);});}
function upcoming(limit){
  var out=[],n=new Date(),base=new Date(n.getFullYear(),n.getMonth(),n.getDate()),all=calEvents();
  all.forEach(function(x){
    for(var i=0;i<800;i++){
      var d=new Date(base.getFullYear(),base.getMonth(),base.getDate()+i);
      if(occursOn(x.ev,d.getFullYear(),d.getMonth()+1,d.getDate())){out.push({x:x,date:d,days:i});break;}
    }
  });
  out.sort(function(a,b){return a.days-b.days;});
  return out.slice(0,limit);
}
var WD=['Dl','Dt','Dc','Dj','Dv','Ds','Dg'];
function dateFormOpen(ev){
  var n=new Date(),def=ymd(n);
  if(ev){
    var base=ev.since?ymd(new Date(ev.since.y,ev.since.m-1,ev.since.d)):ymd(new Date(n.getFullYear(),(ev.month||n.getMonth()+1)-1,Math.min(ev.day,dimL(n.getFullYear(),ev.month||n.getMonth()+1))));
    S.dateForm={id:ev.id,title:ev.title,repeat:ev.repeat,date:base,count:!!ev.since};
  }else S.dateForm={id:null,title:'',repeat:'yearly',date:def,count:true};
  renderCal(true);
}
function renderCal(force){
  var z=$('cal');
  if(!ready()||!S.who){z.replaceChildren();return;}
  var ae=document.activeElement;
  if(!force&&z.firstChild&&S.dateForm&&ae&&(ae.id==='dtt'||ae.id==='dtd'))return;
  var me=S.who,now=new Date(),cm=S.calMonth||{y:now.getFullYear(),m:now.getMonth()+1};
  var sel=S.calSel||{y:now.getFullYear(),m:now.getMonth()+1,d:now.getDate()};
  var parts=[];
  // capçalera de mes
  function go(dm){var m=cm.m+dm,y=cm.y;if(m<1){m=12;y--;}if(m>12){m=1;y++;}S.calMonth={y:y,m:m};renderCal(true);}
  parts.push(h('div',{class:'calh'},
    h('button',{class:'link calnav',type:'button','aria-label':'Mes anterior',onclick:function(){go(-1);}},'‹'),
    h('div',{class:'calt'},new Date(cm.y,cm.m-1,1).toLocaleDateString('ca',{month:'long',year:'numeric'}).replace(' del ',' ')),
    h('button',{class:'link calnav',type:'button','aria-label':'Mes següent',onclick:function(){go(1);}},'›')));
  var grid=[];
  WD.forEach(function(w){grid.push(h('div',{class:'calw'},w));});
  var first=(new Date(cm.y,cm.m-1,1).getDay()+6)%7,dim=dimL(cm.y,cm.m),i,d;
  for(i=0;i<first;i++)grid.push(h('div'));
  for(d=1;d<=dim;d++){
    (function(d){
      var evs=eventsOn(cm.y,cm.m,d),isT=cm.y===now.getFullYear()&&cm.m===now.getMonth()+1&&d===now.getDate();
      var isS=sel.y===cm.y&&sel.m===cm.m&&sel.d===d;
      grid.push(h('button',{class:'cald'+(evs.length?' has':'')+(isT?' today':'')+(isS?' sel':''),type:'button',
        'aria-label':d+' de '+new Date(cm.y,cm.m-1,1).toLocaleDateString('ca',{month:'long'})+(evs.length?': '+evs.map(function(e){return e.title;}).join(', '):''),
        onclick:function(){S.calSel={y:cm.y,m:cm.m,d:d};renderCal(true);}},String(d),evs.length?h('span',{class:'cdot'},'♥'):null));
    })(d);
  }
  parts.push(h('div',{class:'calg'},grid));
  // dia seleccionat
  var se=eventsOn(sel.y,sel.m,sel.d);
  parts.push(h('div',{class:'calsel'},
    h('div',{class:'tiny'},new Date(sel.y,sel.m-1,sel.d).toLocaleDateString('ca',{weekday:'long',day:'numeric',month:'long',year:'numeric'})),
    se.length?se.map(function(e){var c=countTxt(e.ev,sel.y,sel.m);return h('div',{class:'ltt'},'♥ '+e.title+(c?' · '+c:''));}):h('div',{class:'tiny'},'Cap data assenyalada.')));
  // properes
  var up=upcoming(6);
  parts.push(h('span',{class:'lab'},'Properes dates'));
  up.forEach(function(u){
    var c=countTxt(u.x.ev,u.date.getFullYear(),u.date.getMonth()+1);
    var when=u.days===0?'Avui!':(u.days===1?'Demà':'D’aquí '+u.days+' dies');
    parts.push(h('div',{class:'shr'},h('div',{class:'shl'},h('div',{class:'ltt'},u.x.title+(c?' · '+c:'')),
      h('div',{class:'tiny'},when+' · '+u.date.toLocaleDateString('ca',{weekday:'long',day:'numeric',month:'long'}))),
      u.x.ev.fixed?null:h('button',{class:'link',type:'button',onclick:function(){dateFormOpen(u.x.ev);}},'Editar')));
  });
  if(!up.length)parts.push(h('p',{class:'tiny',style:'margin:0'},'Encara no hi ha dates. Afegeix-ne alguna!'));
  parts.push(h('p',{class:'tiny',style:'margin:10px 0 0'},'Rebreu un avís el mateix dia a les 00:00 (hora de Madrid). La retrobada surt automàticament del compte enrere.'));
  // formulari
  var f=S.dateForm;
  if(!f){
    parts.push(h('button',{class:'btn '+me,type:'button',onclick:function(){dateFormOpen(null);}},'Afegir una data'));
  }else{
    var ti=h('input',{type:'text',id:'dtt',maxlength:'60',placeholder:'Ex.: Aniversari, el dia que ens vam conèixer…',value:f.title,oninput:function(e){f.title=e.target.value;}});
    var di=h('input',{type:'date',id:'dtd',value:f.date,oninput:function(e){f.date=e.target.value;}});
    var rp=h('select',{id:'dtr',onchange:function(e){f.repeat=e.target.value;renderCal(true);}},
      [['yearly','Cada any'],['monthly','Cada mes'],['once','Només una vegada']].map(function(o){var op=h('option',{value:o[0]},o[1]);if(f.repeat===o[0])op.selected=true;return op;}));
    var ck=h('input',{type:'checkbox',id:'dtc',onchange:function(e){f.count=e.target.checked;}});ck.checked=!!f.count;
    parts.push(h('div',{class:'dtform'},
      h('span',{class:'lab'},f.id?'Editar la data':'Nova data'),
      ti,h('label',{class:'lab',for:'dtd'},'Dia'),di,h('label',{class:'lab',for:'dtr'},'Es repeteix'),rp,
      f.repeat!=='once'?h('label',{class:'chk'},ck,h('span',null,'Compta el temps des d’aquest dia (mesos o anys junts)')):null,
      h('div',{class:'row',style:'margin-top:12px'},
        h('button',{class:'btn sm '+me,type:'button',style:'flex:1',onclick:function(){saveDateForm();}},'Guardar'),
        h('button',{class:'btn sm',type:'button',style:'flex:none;background:var(--soft);color:var(--fg)',onclick:function(){S.dateForm=null;renderCal(true);}},'Cancel·lar')),
      f.id?h('button',{class:'link',type:'button',style:'margin-top:8px',onclick:function(){
        if(window.confirm('Esborrar «'+f.title+'»?'))lAct(function(){return api.delDate(f.id);},'Data esborrada').then(function(){S.dateForm=null;renderCal(true);});
      }},'Esborrar aquesta data'):null));
  }
  z.replaceChildren(h('section',{class:'card'},h('h2',null,'Calendari'),parts));
}
function saveDateForm(){
  var f=S.dateForm,title=(f.title||'').trim(),pd=parseDay(f.date);
  if(title.length<2){toast('Escriu un nom per a la data.');return;}
  if(!pd){toast('Tria el dia.');return;}
  var row={title:title,repeat:f.repeat,month:f.repeat==='monthly'?null:pd.getMonth()+1,day:pd.getDate(),
    since:(f.repeat==='once'||f.count)?ymd(pd):null};
  if(f.id)row.id=f.id;
  lAct(function(){return api.saveDate(row);},'Data guardada').then(function(){S.dateForm=null;renderCal(true);});
}

/* ---------- xat ---------- */
function dayLabel(ts){
  var d=new Date(ts),n=new Date(),k=dayKey(d);
  if(k===dayKey(n))return 'Avui';
  if(k===dayKey(new Date(n.getTime()-864e5)))return 'Ahir';
  var o={weekday:'long',day:'numeric',month:'long'};if(d.getFullYear()!==n.getFullYear())o.year='numeric';
  return d.toLocaleDateString('ca',o);
}
function chatUnread(){var me=S.who;return S.chat.filter(function(x){return x.from_player!==me&&!x.read;}).length;}
function renderChat(){
  var z=$('chat');
  if(!ready()||!S.who){z.replaceChildren();return;}
  var me=S.who,ot=other(me),sig=JSON.stringify([me,S.names,S.chatOpen]);
  if(S.chsig!==sig||!z.firstChild){
    var kids=[];
    if(!S.chatOpen){
      kids.push(h('button',{class:'chhead',type:'button',onclick:function(){S.chatOpen=true;S.chsig='';renderChat();}},
        h('span',{class:'chti'},'Xat'),h('span',{class:'chpv tiny',id:'chpv'}),h('span',{class:'chbd',id:'chbd',hidden:true})));
    }else{
      var inp=h('input',{type:'text',id:'chatin',maxlength:'1000',placeholder:'Escriu un missatge a '+nm(ot)+'…',autocomplete:'off',enterkeyhint:'send'});
      var go=h('button',{class:'btn sm '+me,type:'button',id:'chatgo'},'Enviar');
      function send(){
        var v=inp.value.trim();if(!v)return;
        inp.value='';
        lAct(function(){return api.sendChat({from_player:me,body:v});}).then(function(){inp.focus();});
      }
      go.addEventListener('click',send);
      inp.addEventListener('keydown',function(e){if(e.key==='Enter'&&!e.isComposing){e.preventDefault();send();}});
      kids.push(h('div',{class:'chtop'},h('h2',{style:'margin:0'},'Xat'),
        h('button',{class:'link',type:'button',onclick:function(){S.chatOpen=false;S.chsig='';renderChat();}},'Tancar')),
        h('div',{class:'chlist',id:'chlist',role:'log','aria-live':'polite'}),
        h('div',{class:'row chrow'},inp,go));
    }
    z.replaceChildren(h('section',{class:'card chat'},kids));
    S.chsig=sig;S.chStick=true;
  }
  renderChatList();
}
function renderChatList(){
  var me=S.who;if(!me)return;
  var un=chatUnread(),last=S.chat[S.chat.length-1];
  var pv=document.getElementById('chpv'),bd=document.getElementById('chbd');
  if(pv)pv.textContent=last?(last.from_player===me?'Tu: ':'')+(last.body.length>60?last.body.slice(0,59)+'…':last.body):'Encara no hi ha missatges';
  if(bd){bd.hidden=!un;bd.textContent=String(un);}
  var list=document.getElementById('chlist');
  if(!list)return;
  var atEnd=S.chStick||(list.scrollHeight-list.scrollTop-list.clientHeight<40);
  var out=[],prevDay='',lastMineIdx=-1;
  S.chat.forEach(function(x,i){if(x.from_player===me)lastMineIdx=i;});
  S.chat.forEach(function(x,i){
    var dk=dayKey(new Date(x.ts));
    if(dk!==prevDay){out.push(h('div',{class:'chday'},dayLabel(x.ts)));prevDay=dk;}
    var d=new Date(x.ts);
    out.push(h('div',{class:'chm '+(x.from_player===me?'mine '+me:'theirs')},
      h('div',{class:'chb'},x.body),
      h('div',{class:'cht'},pad(d.getHours())+':'+pad(d.getMinutes())+(x.from_player===me&&i===lastMineIdx&&x.read?' · vist':''))));
  });
  if(!out.length)out.push(h('p',{class:'tiny',style:'text-align:center;margin:20px 0'},'Encara no hi ha missatges. Digues alguna cosa!'));
  list.replaceChildren.apply(list,out);
  if(atEnd)list.scrollTop=list.scrollHeight;
  S.chStick=false;
  if(S.chatOpen&&un>0&&!document.hidden&&!S.chReading){
    S.chReading=true;
    api.readChat(other(me)).catch(function(){}).then(function(){S.chReading=false;});
  }
}
document.addEventListener('visibilitychange',function(){if(S.authed&&ready()&&S.who)renderChatList();});

/* ---------- botiga de cupons ---------- */
function spent(p){return S.redeems.reduce(function(s,x){return x.buyer===p?s+x.cost:s;},0);}
function bal(p){return score(p)-spent(p);}
var SUG=[
 ['Un sopar cuinat per mi quan ens veiem',30],['Tria tu la pel·lícula',10],['Una videotrucada de 2 hores sense mirar el mòbil',15],
 ['Una carta escrita a mà',25],['Esmorzar al llit',30],['Una cançó dedicada',10],['Tria tu el pla del dissabte',40],['Un massatge de 20 minuts',35]
];
function renderShop(){
  var z=$('shop');
  if(!ready()||!S.who){z.replaceChildren();return;}
  var me=S.who,ot=other(me),b=bal(me);
  var sig=JSON.stringify([me,S.names,b,S.offers,S.redeems]);
  var ae=document.activeElement;
  if(z.firstChild&&(S.shsig===sig||(ae&&(ae.id==='oft'||ae.id==='ofc'))))return;
  var pt=document.getElementById('oft'),pc=document.getElementById('ofc');
  var keepT=pt?pt.value:'',keepC=pc?pc.value:'20';
  var parts=[];
  parts.push(h('div',{class:'mrow'},h('span',{class:'mnum'},String(b)),h('span',{class:'mlab'},b===1?'punt per gastar':'punts per gastar')),
    h('p',{class:'tiny',style:'margin:4px 0 0'},'Gastar punts no et fa baixar al marcador: només compta el que has guanyat.'));
  // cupons de l'altre
  var theirs=S.offers.filter(function(x){return x.from_player===ot;}).sort(function(x,y){return x.cost-y.cost;});
  parts.push(h('span',{class:'lab'},'Cupons de '+nm(ot)));
  if(!theirs.length)parts.push(h('p',{class:'tiny',style:'margin:0'},nm(ot)+' encara no ha afegit cap cupó.'));
  theirs.forEach(function(x){
    parts.push(h('div',{class:'shr'},h('div',{class:'shl'},h('div',{class:'ltt'},x.title),h('div',{class:'tiny'},x.cost+' punts')),
      h('button',{class:'btn sm '+me,type:'button',disabled:b<x.cost,onclick:function(){
        if(bal(me)<x.cost){toast('No tens prou punts.');return;}
        if(!window.confirm('Canviar «'+x.title+'» per '+x.cost+' punts?'))return;
        lAct(function(){return api.redeem({offer_id:x.id,offerer:ot,buyer:me,title:x.title,cost:x.cost});},'Cupó canviat. '+nm(ot)+' rebrà un avís.');
      }},b<x.cost?'Et falten '+(x.cost-b):'Canviar')));
  });
  // per complir
  var todo=S.redeems.filter(function(x){return x.offerer===me&&x.status==='pending';});
  if(todo.length){
    parts.push(h('span',{class:'lab'},'Pendents de complir'));
    todo.forEach(function(x){
      parts.push(h('div',{class:'shr'},h('div',{class:'shl'},h('div',{class:'ltt'},x.title),h('div',{class:'tiny'},nm(x.buyer)+' l’ha canviat per '+x.cost+' punts')),
        h('button',{class:'btn sm '+me,type:'button',onclick:function(){lAct(function(){return api.doneRedeem(x.id);},'Marcat com a fet');}},'Fet')));
    });
  }
  // els meus canvis
  var mine=S.redeems.filter(function(x){return x.buyer===me;}).slice(0,10);
  if(mine.length){
    parts.push(h('span',{class:'lab'},'Els teus cupons'));
    mine.forEach(function(x){
      parts.push(h('div',{class:'shr'},h('div',{class:'shl'},h('div',{class:'ltt'},x.title),h('div',{class:'tiny'},x.status==='done'?'Complert per '+nm(x.offerer):'Esperant que '+nm(x.offerer)+' el compleixi')),
        h('span',{class:'tag '+(x.status==='done'?'ok':'')},x.status==='done'?'Fet':'Pendent')));
    });
  }
  // els meus cupons a la botiga
  var ofs=S.offers.filter(function(x){return x.from_player===me;}).sort(function(x,y){return x.cost-y.cost;});
  parts.push(h('span',{class:'lab'},'Els teus cupons a la botiga'));
  if(!ofs.length)parts.push(h('p',{class:'tiny',style:'margin:0 0 8px'},'Afegeix coses que vols oferir a '+nm(ot)+'. Ho podrà canviar amb els seus punts.'));
  ofs.forEach(function(x){
    parts.push(h('div',{class:'shr'},h('div',{class:'shl'},h('div',{class:'ltt'},x.title),h('div',{class:'tiny'},x.cost+' punts')),
      h('button',{class:'link',type:'button',onclick:function(){if(window.confirm('Treure «'+x.title+'» de la botiga?'))lAct(function(){return api.delOffer(x.id);});}},'Treure')));
  });
  var ti=h('input',{type:'text',id:'oft',maxlength:'80',placeholder:'Ex.: Un sopar cuinat per mi',value:keepT});
  var ci=h('input',{type:'number',id:'ofc',min:'1',max:'500',inputmode:'numeric',value:keepC||'20',style:'width:90px;flex:none'});
  parts.push(h('div',{class:'row',style:'margin-top:8px'},ti,ci,h('span',{class:'tiny',style:'flex:none'},'punts')),
    h('button',{class:'btn '+me,type:'button',onclick:function(){
      var title=ti.value.trim(),cost=parseInt(ci.value,10);
      if(title.length<2){toast('Escriu què ofereixes.');ti.focus();return;}
      if(!(cost>=1&&cost<=500)){toast('El preu ha de ser entre 1 i 500 punts.');return;}
      lAct(function(){return api.addOffer({from_player:me,title:title,cost:cost});},'Cupó afegit a la botiga').then(function(){ti.value='';});
    }},'Afegir a la botiga'),
    h('span',{class:'lab'},'Idees'),
    h('div',{class:'chips'},SUG.map(function(x){return h('button',{class:'chip',type:'button',onclick:function(){ti.value=x[0];ci.value=String(x[1]);}},x[0]);})));
  S.shsig=sig;
  z.replaceChildren(h('section',{class:'card'},h('h2',null,'Botiga de cupons'),parts));
}

/* ---------- quatre en ratlla ---------- */
var C4W=7,C4H=6;
function c4Drop(b,col,pl){
  for(var r=C4H-1;r>=0;r--){var i=r*C4W+col;if(b.charAt(i)==='.')return {board:b.slice(0,i)+pl+b.slice(i+1),idx:i};}
  return null;
}
function c4Line(b,pl){
  var dirs=[[0,1],[1,0],[1,1],[1,-1]],r,c,d,k,cells;
  for(r=0;r<C4H;r++)for(c=0;c<C4W;c++){
    for(d=0;d<dirs.length;d++){
      cells=[];
      for(k=0;k<4;k++){
        var rr=r+dirs[d][0]*k,cc=c+dirs[d][1]*k;
        if(rr<0||rr>=C4H||cc<0||cc>=C4W||b.charAt(rr*C4W+cc)!==pl)break;
        cells.push(rr*C4W+cc);
      }
      if(cells.length===4)return cells;
    }
  }
  return null;
}
function c4Move(g,col){
  var me=S.who,ot=other(me);
  if(!g||g.status!=='playing'||g.turn!==me)return;
  var r=c4Drop(g.board,col,me);if(!r){toast('Aquesta columna és plena.');return;}
  var win=c4Line(r.board,me),full=r.board.indexOf('.')<0;
  var patch={board:r.board,turn:ot,last_by:me,moves:g.moves+1,status:win?'won':(full?'draw':'playing'),winner:win?me:null};
  lAct(function(){return api.moveC4(g.id,me,patch);},win?'Has guanyat!':null);
}
function renderC4(){
  var z=$('c4');
  if(!ready()||!S.who){z.replaceChildren();return;}
  var me=S.who,ot=other(me),cur=S.c4[0],parts=[];
  var w={a:0,b:0,d:0};
  S.c4.forEach(function(g){if(g.status==='won'&&g.winner)w[g.winner]++;else if(g.status==='draw')w.d++;});
  parts.push(h('div',{class:'c4t'},
    h('span',{class:'nm2'},h('span',{class:'dot',style:'background:var(--'+me+')'}),nm(me)+' '+w[me]),
    h('span',{class:'tiny'},'empats '+w.d),
    h('span',{class:'nm2'},nm(ot)+' '+w[ot],h('span',{class:'dot',style:'background:var(--'+ot+')'}))));
  if(cur){
    var line=cur.status==='won'?c4Line(cur.board,cur.winner):null,mine=cur.status==='playing'&&cur.turn===me;
    var msg;
    if(cur.status==='playing')msg=mine?'Et toca moure, '+nm(me)+'!':'Esperant que '+nm(ot)+' mogui fitxa…';
    else if(cur.status==='won')msg=cur.winner===me?'Has guanyat! ♥':nm(cur.winner)+' ha guanyat.';
    else msg='Empat: el tauler és ple.';
    parts.push(h('p',{class:'c4m'+(mine?' me':'')},msg));
    var cols=[];
    for(var c=0;c<C4W;c++){
      var cells=[],full=cur.board.charAt(c)!=='.';
      for(var r=0;r<C4H;r++){
        var i=r*C4W+c,v=cur.board.charAt(i);
        cells.push(h('div',{class:'c4p '+(v==='.'?'e':v)+(line&&line.indexOf(i)>=0?' win':'')}));
      }
      (function(col){
        cols.push(h('button',{class:'c4c',type:'button','aria-label':'Tirar la fitxa a la columna '+(col+1),disabled:!mine||full,onclick:function(){c4Move(cur,col);}},cells));
      })(c);
    }
    parts.push(h('div',{class:'c4b'},cols));
  }else{
    parts.push(h('p',{class:'tiny',style:'margin:8px 0'},'Quatre en ratlla: aneu jugant quan pugueu. Cadascú mou quan li va bé i, si teniu els avisos activats, rebreu una notificació quan us toqui.'));
  }
  if(!cur||cur.status!=='playing'){
    var first=!cur?ot:(cur.status==='won'?other(cur.winner):other(cur.starter));
    parts.push(h('button',{class:'btn '+me,type:'button',onclick:function(){
      lAct(function(){return api.newC4({starter:first,turn:first,board:'.'.repeat(C4W*C4H),status:'playing',moves:0});},'Partida nova. Comença '+nm(first)+'.');
    }},cur?'Nova partida':'Començar una partida'),
    h('p',{class:'tiny',style:'margin:8px 0 0'},'Comença '+nm(first)+(cur&&cur.status==='won'?' (qui ha perdut).':'.')));
  }
  z.replaceChildren(h('section',{class:'card'},h('h2',null,'Quatre en ratlla'),parts));
}

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
  renderTop();renderBoard();renderColors();renderPush();syncPush();renderChallengeCard();renderMeet();renderChat();renderCal();renderGames();renderC4();renderHugs();renderKisses();renderSurpriseCard();checkSurprise();renderShop();renderLetters();renderAdd();renderRewards();renderWall();
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
  savePlace:function(r){return sb.from('pp_places').upsert(r).then(function(x){
    if(x.error&&/tz/i.test(x.error.message||'')){var r2=Object.assign({},r);delete r2.tz;return sb.from('pp_places').upsert(r2);}
    return x;}).then(chk).then(loadAll);},
  saveMeet:function(v){return sb.from('pp_extra').upsert({id:1,meet_date:v,ts:new Date().toISOString()}).then(chk).then(loadAll);},
  saveDate:function(r){var q=r.id?sb.from('pp_dates').update(r).eq('id',r.id):sb.from('pp_dates').insert(r);return q.then(chk).then(loadAll);},
  delDate:function(id){return sb.from('pp_dates').delete().eq('id',id).then(chk).then(loadAll);},
  sendChat:function(r){return sb.from('pp_chat').insert(r).then(chk).then(loadAll);},
  readChat:function(p){return sb.from('pp_chat').update({read_at:new Date().toISOString()}).eq('from_player',p).is('read_at',null).then(chk).then(loadAll);},
  addOffer:function(r){return sb.from('pp_offers').insert(r).then(chk).then(loadAll);},
  delOffer:function(id){return sb.from('pp_offers').delete().eq('id',id).then(chk).then(loadAll);},
  redeem:function(r){return sb.from('pp_redeems').insert(r).then(chk).then(loadAll);},
  doneRedeem:function(id){return sb.from('pp_redeems').update({status:'done',done_at:new Date().toISOString()}).eq('id',id).eq('status','pending').then(chk).then(loadAll);},
  newC4:function(r){return sb.from('pp_c4').insert(r).then(chk).then(loadAll);},
  moveC4:function(id,me,patch){return sb.from('pp_c4').update(patch).eq('id',id).eq('status','playing').eq('turn',me).then(chk).then(loadAll);},
  sendLetter:function(r){return sb.from('pp_letters').insert(r).then(chk).then(loadAll);},
  readLetter:function(id){return sb.from('pp_letters').update({read_at:new Date().toISOString()}).eq('id',id).is('read_at',null).then(chk).then(loadAll);},
  sendSurprise:function(r){return sb.from('pp_surprises').insert(r).then(chk).then(loadAll);},
  seeSurprise:function(id){return sb.from('pp_surprises').update({seen_at:new Date().toISOString()}).eq('id',id).is('seen_at',null).then(chk).then(loadAll);},
  giveKiss:function(){var n=new Date();return sb.from('pp_kisses').insert({kind:'give',from_player:S.who,status:'done',day:dayKey(n)}).then(chk).then(loadAll);},
  askKiss:function(){var n=new Date();return sb.from('pp_kisses').insert({kind:'ask',from_player:S.who,status:'pending',day:dayKey(n)}).then(chk).then(loadAll);},
  returnKiss:function(id){var n=new Date();return sb.from('pp_kisses').update({status:'returned',ret_day:dayKey(n),ret_ts:n.toISOString()}).eq('id',id).eq('status','pending').then(chk).then(loadAll);},
  giveHug:function(){var n=new Date();return sb.from('pp_hugs').insert({kind:'give',from_player:S.who,status:'done',day:dayKey(n)}).then(chk).then(loadAll);},
  askHug:function(){var n=new Date();return sb.from('pp_hugs').insert({kind:'ask',from_player:S.who,status:'pending',day:dayKey(n)}).then(chk).then(loadAll);},
  returnHug:function(id){var n=new Date();return sb.from('pp_hugs').update({status:'returned',ret_day:dayKey(n),ret_ts:n.toISOString()}).eq('id',id).eq('status','pending').then(chk).then(loadAll);},
  saveAnswer:function(r){return sb.from('pp_answers').insert(r).then(chk).then(loadAll);},
  saveReward:function(r){return sb.from('pp_rewards').upsert(r).then(chk).then(loadAll);},
  deleteMoment:function(id){return sb.from('pp_moments').delete().eq('id',id).then(chk).then(loadAll);}
};
function saveErr(e){
  var m=String(e&&e.message||e||'');
  if(/petons al dia/i.test(m))return 'Ja has fet els '+KISSMAX+' petons d\'avui. Demà més!';
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
    sb.from('pp_letters').select('*').order('sent_at',{ascending:false}).limit(300),
    sb.from('pp_extra').select('*').eq('id',1).maybeSingle(),
    sb.from('pp_offers').select('*').order('ts',{ascending:false}).limit(300),
    sb.from('pp_redeems').select('*').order('ts',{ascending:false}).limit(500),
    sb.from('pp_c4').select('*').order('ts',{ascending:false}).limit(200),
    sb.from('pp_chat').select('*').order('ts',{ascending:false}).limit(200),
    sb.from('pp_dates').select('*'),
    sb.from('pp_kisses').select('*').order('ts',{ascending:false}).limit(500),
    sb.from('pp_surprises').select('*').order('ts',{ascending:false}).limit(100)
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
    S.places={a:null,b:null};(rs[6].data||[]).forEach(function(x){if(x.player==='a'||x.player==='b')S.places[x.player]={name:x.name,lat:x.lat,lon:x.lon,tz:x.tz||null};});
    S.meet=(rs[8]&&rs[8].data&&rs[8].data.meet_date)||null;backfillTz();
    S.offers=(rs[9]&&rs[9].data||[]).map(function(x){return {id:x.id,from_player:x.from_player,title:x.title,cost:+x.cost};});
    S.redeems=(rs[10]&&rs[10].data||[]).map(function(x){return {id:x.id,offerer:x.offerer,buyer:x.buyer,title:x.title,cost:+x.cost,status:x.status,ts:new Date(x.ts).getTime()};});
    S.dates=(rs[13]&&rs[13].data||[]).map(function(x){var p=x.since?/^(\d{4})-(\d{2})-(\d{2})/.exec(x.since):null;return {id:x.id,title:x.title,repeat:x.repeat,month:x.month,day:+x.day,since:p?{y:+p[1],m:+p[2],d:+p[3]}:null};});
    S.kisses=(rs[14]&&rs[14].data||[]).map(function(x){return {id:x.id,kind:x.kind,from_player:x.from_player,status:x.status,day:x.day,ret_day:x.ret_day,ts:new Date(x.ts).getTime()};});
    S.surprises=(rs[15]&&rs[15].data||[]).map(function(x){return {id:x.id,from_player:x.from_player,to_player:x.to_player,message:x.message,ts:new Date(x.ts).getTime(),seen:!!x.seen_at};});
    S.chat=(rs[12]&&rs[12].data||[]).map(function(x){return {id:x.id,from_player:x.from_player,body:x.body,ts:new Date(x.ts).getTime(),read:!!x.read_at};}).reverse();
    S.c4=(rs[11]&&rs[11].data||[]).map(function(x){return {id:x.id,starter:x.starter,board:x.board,turn:x.turn,status:x.status,winner:x.winner,last_by:x.last_by,moves:+x.moves,ts:new Date(x.ts).getTime()};});
    S.letters=(rs[7].data||[]).map(function(x){return {id:x.id,from_player:x.from_player,to_player:x.to_player,transport:x.transport,distance_km:x.distance_km,body:x.body,sent:new Date(x.sent_at).getTime(),arrive:new Date(x.arrive_at).getTime(),read:!!x.read_at};});
    S.ai={};S.answers.forEach(function(a){S.ai[a.day+'|'+a.game+'|'+a.slot+'|'+a.player]=a;});
    if(S.editNames||document.activeElement&&(document.activeElement.id==='phrase'||document.activeElement.id==='qans')){
      renderBoard();renderChallengeCard();renderRewards();renderWall();
      if(!S.editNames){renderMeet();renderChat();renderCal();renderC4();renderShop();renderGames();renderHugs();renderKisses();renderSurpriseCard();checkSurprise();renderLetters();renderAdd();}
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
