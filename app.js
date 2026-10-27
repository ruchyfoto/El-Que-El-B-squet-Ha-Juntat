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

var S={authed:false,setup:false,names:null,cfgLoaded:false,moments:[],rewards:{},who:null,speaker:null,cat:'maca',editNames:false,confirmDel:null,saving:false,sig:''};
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
function score(p){return S.moments.reduce(function(s,m){return m.speaker===p?s+(+m.pts||0):s;},0);}
function level(p){return Math.floor(score(p)/STEP);}
function streak(p){
  var days={};S.moments.forEach(function(m){if(m.speaker===p)days[m.day]=1;});
  var d=new Date();d.setHours(12,0,0,0);
  if(!days[dayKey(d)])d.setDate(d.getDate()-1);
  var n=0;while(days[dayKey(d)]){n++;d.setDate(d.getDate()-1);}
  return n;
}
function reptDone(p){return S.moments.some(function(m){return m.speaker===p&&m.cat==='repte'&&m.wk===WEEK.key;});}
function ready(){return S.cfgLoaded&&S.names&&S.names.a&&S.names.b;}

/* ---------- renders ---------- */
function renderTop(){
  var box=h('div');
  if(S.setup){
    box.append(h('section',{class:'card'},h('h2',null,'Falta configurar'),
      h('p',{style:'margin:0'},'Obre config.js i enganxa-hi la URL i la clau pública del teu projecte de Supabase.')));
    put('top',box);return;
  }
  if(!S.authed){
    var em=h('input',{type:'text',id:'em',autocomplete:'username',inputmode:'email',placeholder:'correu@exemple.com'});
    var pw=h('input',{type:'password',id:'pw',autocomplete:'current-password',placeholder:'Contrasenya'});
    var go=h('button',{class:'btn',type:'button'},'Entrar');
    function submit(){
      if(!em.value.trim()||!pw.value){toast('Escriu el correu i la contrasenya.');return;}
      go.disabled=true;
      login(em.value.trim(),pw.value).catch(function(){toast('Correu o contrasenya incorrectes.');}).then(function(){go.disabled=false;});
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
        .catch(function(){toast('No s\'ha pogut guardar els noms.');})
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
      .catch(function(e){toast('No s\'ha pogut guardar. Comprova la connexió i torna-ho a provar.');})
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
            .catch(function(){toast('No s\'ha pogut guardar el premi.');sv.disabled=false;});
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
      h('button',{class:'link',type:'button',onclick:function(){S.confirmDel=null;api.deleteMoment(m.id).catch(function(){toast('No s\'ha pogut esborrar.');});}},'Esborrar de debò'),' ',
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
  $('btn-names').hidden=!(S.authed&&S.cfgLoaded&&ready());
  $('btn-out').hidden=!S.authed;
  renderTop();renderBoard();renderChallengeCard();renderAdd();renderRewards();renderWall();
}

/* challenge slot lives above the form */
(function(){var z=document.createElement('div');z.id='challenge';$('board').after(z);})();

$('btn-names').addEventListener('click',function(){S.editNames=!S.editNames;renderTop();});

/* ---------- Supabase ---------- */
var cfg=window.PUNTS_CONFIG||{};
var sb=null;
function chk(r){if(r&&r.error)throw r.error;return r;}
var api={
  saveNames:function(a,b){return sb.from('config').upsert({id:1,name_a:a,name_b:b}).then(chk).then(loadAll);},
  addMoment:function(m){return sb.from('moments').insert(m).then(chk).then(loadAll);},
  saveReward:function(r){return sb.from('rewards').upsert(r).then(chk).then(loadAll);},
  deleteMoment:function(id){return sb.from('moments').delete().eq('id',id).then(chk).then(loadAll);}
};
function login(email,pass){
  return sb.auth.signInWithPassword({email:email,password:pass}).then(function(r){
    if(r.error)throw r.error;S.authed=true;start();
  });
}
function loadAll(){
  return Promise.all([
    sb.from('config').select('*').eq('id',1).maybeSingle(),
    sb.from('moments').select('*').order('ts',{ascending:false}).limit(1000),
    sb.from('rewards').select('*')
  ]).then(function(rs){
    var c=rs[0].data;
    S.names=c?{a:c.name_a,b:c.name_b}:null;S.cfgLoaded=true;
    if(S.who&&!S.speaker)S.speaker=other(S.who);
    S.moments=(rs[1].data||[]).map(function(x){return {id:x.id,speaker:x.speaker,cat:x.cat,pts:x.pts,text:x.text,ts:new Date(x.ts).getTime(),day:x.day,wk:x.wk};});
    var r={};(rs[2].data||[]).forEach(function(x){r[x.player+'-'+x.level]={player:x.player,level:x.level,text:x.text};});
    S.rewards=r;
    if(S.editNames||document.activeElement&&document.activeElement.id==='phrase'){
      renderBoard();renderChallengeCard();renderRewards();renderWall();
      if(!S.editNames)renderAdd();
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
$('btn-out').addEventListener('click',function(){
  sb.auth.signOut().then(function(){S.authed=false;S.cfgLoaded=false;S.names=null;S.moments=[];S.rewards={};started=false;renderAll();});
});
if(!window.supabase||!cfg.url||cfg.url.indexOf('http')!==0||!cfg.key){S.setup=true;renderAll();}
else{
  sb=window.supabase.createClient(cfg.url,cfg.key);
  renderAll();
  sb.auth.getSession().then(function(r){
    if(r.data&&r.data.session){S.authed=true;renderAll();start();}else renderAll();
  });
}
})();
