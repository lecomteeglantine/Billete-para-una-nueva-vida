(function(){
const $=id=>document.getElementById(id);
const DAY=86400000;

const CATEGORY_INFO={
 'Programme':{icon:'🧭',href:'programme.html',minutes:20},
 'Méthodologie':{icon:'✍️',href:'methodologie-composition.html',minutes:30},
 'Littérature':{icon:'📕',href:'litterature.html',minutes:30},
 'Civilisation':{icon:'🏛️',href:'civilisation.html',minutes:30},
 'Français':{icon:'🇫🇷',href:'francais.html',minutes:20},
 'Traduction':{icon:'🔁',href:'traduction.html',minutes:30},
 'Didactique':{icon:'🏫',href:'didactique.html',minutes:25},
 'Oral & entretien':{icon:'🎙️',href:'oral.html',minutes:30},
 'Jury':{icon:'⚖️',href:'jury.html',minutes:20},
 'Sujets officiels':{icon:'📄',href:'sujets-officiels.html',minutes:45},
 'Simulations':{icon:'⏱️',href:'entrainement.html',minutes:45},
 'Bac+5':{icon:'🎭',href:'bac5.html',minutes:30}
};

const DOMAIN_INFO={
 methodologie:{label:'Méthodologie / composition',category:'Méthodologie',icon:'✍️',href:'methodologie-composition.html',minutes:25},
 francais:{label:'Français',category:'Français',icon:'🇫🇷',href:'francais.html',minutes:20},
 traduction:{label:'Traduction',category:'Traduction',icon:'🔁',href:'traduction.html',minutes:25},
 didactique:{label:'Didactique',category:'Didactique',icon:'🏫',href:'didactique.html',minutes:25},
 oral:{label:'Oral & entretien',category:'Oral & entretien',icon:'🎙️',href:'oral.html',minutes:30},
 chirbes:{label:'Chirbes',category:'Littérature',icon:'📕',href:'litterature.html',minutes:25},
 transition:{label:'Transition',category:'Civilisation',icon:'🏛️',href:'civilisation.html',minutes:25},
 capmany:{label:'Capmany',category:'Bac+5',icon:'📜',href:'bac5-capmany.html',minutes:25},
 usigli:{label:'Usigli',category:'Bac+5',icon:'🎭',href:'bac5-usigli.html',minutes:25},
 padilla:{label:'Padilla',category:'Bac+5',icon:'🎬',href:'bac5-padilla.html',minutes:25}
};

const MODULE_DIAGS=[
 {domain:'francais',storage:'billete-francais-diagnostic-v1',route:'all'},
 {domain:'traduction',storage:'billete-traduction-diagnostic-v1',route:'all'},
 {domain:'methodologie',storage:'billete-methodologie-diagnostic-v1',route:'all'},
 {domain:'didactique',storage:'billete-didactique-diagnostic-v1',route:'all'},
 {domain:'chirbes',storage:'billete-chirbes-diagnostic-v1',route:'all'},
 {domain:'transition',storage:'billete-transition-diagnostic-v1',route:'bac3'},
 {domain:'capmany',storage:'billete-capmany-diagnostic-v1',route:'bac5'},
 {domain:'usigli',storage:'billete-usigli-diagnostic-v1',route:'bac5'},
 {domain:'padilla',storage:'billete-padilla-diagnostic-v1',route:'bac5'}
];

const WEEK=['Bilan & erreurs','Programme','Français','Traduction','Dossier & méthode','Didactique','Simulation'];

function readJSON(k,d){try{const raw=localStorage.getItem(k);return raw===null?d:JSON.parse(raw)}catch(e){return d}}
function readDiagnostic(){return readJSON('billete-diagnostic-v2',null)||readJSON('billete-diagnostic',null)}
function currentRoute(){return localStorage.getItem('billete-route')||'all'}
function dueErrorCount(){const now=Date.now(),rows=readJSON('billete-french-errors-v1',[]);return rows.filter(x=>(x.due||0)<=now).length}
function flashStats(){const s=readJSON('billete-flash-srs-v2',{}),rows=Object.values(s),now=Date.now();return{seen:rows.length,due:rows.filter(x=>(x.due||0)<=now).length,mastered:rows.filter(x=>(x.level||0)>=4).length}}
function oralStats(){return{oral1:readJSON('billete-oral1-history',[]).length,entretien:readJSON('billete-entretien-history',[]).length}}
function trainingReviews(){return readJSON('billete-training-reviews-v1',[])||[]}
function todayKey(){return new Date().toISOString().slice(0,10)}
function dailyHistory(){return readJSON('billete-daily-history-v1',{})}
function saveHistory(h){localStorage.setItem('billete-daily-history-v1',JSON.stringify(h))}
function weakest(categories){return [...categories].sort((a,b)=>a.percent-b.percent||b.total-a.total)}
function routeAllowed(rule,route){return rule==='all'||route==='all'||rule===route}

function moduleDiagnostics(route=currentRoute()){
 const rows=MODULE_DIAGS.filter(x=>routeAllowed(x.route,route)).map(x=>{
   const d=readJSON(x.storage,null),meta=DOMAIN_INFO[x.domain];
   return d?{...x,...meta,data:d,level:Number(d.level||4),weakArea:d.weakArea||'',date:d.date||''}:{...x,...meta,data:null};
 });
 if(route==='bac3'||route==='bac5'){
   const d=readJSON(`billete-oral-diagnostic-v1-${route}`,null),meta=DOMAIN_INFO.oral;
   rows.push(d?{domain:'oral',storage:`billete-oral-diagnostic-v1-${route}`,route,...meta,data:d,level:Number(d.level||4),weakArea:d.weakArea||'',date:d.date||''}:{domain:'oral',storage:`billete-oral-diagnostic-v1-${route}`,route,...meta,data:null});
 }
 return rows;
}

function completedModuleDiagnostics(route=currentRoute()){return moduleDiagnostics(route).filter(x=>x.data).length}
function reviewRows(route=currentRoute()){return trainingReviews().filter(x=>!x.route||x.route==='all'||route==='all'||x.route===route)}

async function stats(){
 const cat=await Billete.getProgressCatalog(),route=currentRoute(),catalog=Billete.filterCatalogForRoute(cat,route),progress=readJSON('billete-progress',{}),by={};
 catalog.forEach(x=>{
   by[x.category]??={name:x.category,total:0,done:0,items:[]};
   by[x.category].total++;
   by[x.category].done+=progress[x.key]?1:0;
   by[x.category].items.push({...x,done:!!progress[x.key]});
 });
 const categories=Object.values(by).map(x=>({...x,percent:x.total?Math.round(x.done/x.total*100):0}));
 return{catalog,progress,categories,route};
}

function globalPriorityRows(diag){
 if(!diag)return[];
 const scores=diag.scores||[];
 return (diag.priorities||diag.weak||[]).slice(0,4).map(cat=>{
   const s=scores.find(x=>x.cat===cat),meta=CATEGORY_INFO[cat]||{icon:'🎯',href:'aujourdhui.html',minutes:25};
   return{id:'global:'+cat,label:cat,category:cat,icon:meta.icon,href:meta.href,minutes:meta.minutes,rank:(s?.percent??45)+8,reason:s?`Diagnostic global : ${s.percent}% · ${s.label||'priorité'}`:'Priorité du diagnostic global',source:'Diagnostic global'};
 });
}

function modulePriorityRows(route=currentRoute()){
 return moduleDiagnostics(route).filter(x=>x.data).map(x=>{
   const level=Number(x.level||4),base={1:16,2:36,3:62,4:88}[level]||88;
   return{id:'module:'+x.domain,label:x.label,category:x.category,icon:x.icon,href:x.href,minutes:x.minutes,rank:base,reason:`Mini-diagnostic : niveau ${level}${x.weakArea?` · priorité ${x.weakArea}`:''}`,source:'Mini-diagnostic',level};
 });
}

function reviewPriorityRows(route=currentRoute()){
 const latest={};
 reviewRows(route).slice().reverse().forEach(x=>{if(!latest[x.domain])latest[x.domain]=x});
 return Object.values(latest).map(x=>{
   const meta=DOMAIN_INFO[x.domain];if(!meta)return null;
   const rank=x.result==='blocked'?0:x.result==='review'?10:92;
   const label=x.result==='blocked'?'Bloqué':x.result==='review'?'À consolider':'Solide';
   return{id:'review:'+x.domain,label:meta.label,category:meta.category,icon:meta.icon,href:meta.href,minutes:meta.minutes,rank,reason:`Dernier entraînement : ${label.toLowerCase()}`,source:'Bilan d’entraînement',review:x.result};
 }).filter(Boolean);
}

async function unifiedPriorities(limit=3){
 const st=await stats(),diag=readDiagnostic(),rows=[...reviewPriorityRows(st.route),...modulePriorityRows(st.route),...globalPriorityRows(diag)];
 weakest(st.categories).filter(c=>c.total&&c.percent<100).forEach(c=>{
   const meta=CATEGORY_INFO[c.name]||{icon:'🎯',href:c.items[0]?.page||'#',minutes:25};
   rows.push({id:'progress-category:'+c.name,label:c.name,category:c.name,icon:meta.icon,href:meta.href,minutes:meta.minutes,rank:55+c.percent/3,reason:`Progression : ${c.done}/${c.total} objectifs validés`,source:'Progression'});
 });
 const best={};
 rows.forEach(x=>{
   const key=x.href||x.category;
   if(!best[key]||x.rank<best[key].rank)best[key]=x;
 });
 return Object.values(best).sort((a,b)=>a.rank-b.rank).slice(0,limit);
}

function missionFromItem(item){
 const meta=CATEGORY_INFO[item.category]||{icon:'🎯',href:item.page,minutes:25};
 return{id:'progress:'+item.key,key:item.key,category:item.category,icon:meta.icon,title:item.label,reason:`Objectif encore non validé dans ${item.pageLabel}.`,href:item.page,minutes:meta.minutes,type:'progress'};
}

async function buildMissions(limitMinutes=60,salt=0){
 const st=await stats(),missions=[],diag=readDiagnostic(),errors=dueErrorCount(),flash=flashStats(),oral=oralStats(),day=new Date().getDay(),dayFocus=WEEK[day];
 if(!diag){
   return{missions:[{id:'diagnostic',category:'Diagnostic',icon:'🧭',title:'Faire le diagnostic de départ',reason:'Il construit les premières priorités avant les mini-diagnostics ciblés.',href:'diagnostic.html',minutes:15,type:'recurring'}],total:15,stats:st,errors,flash,oral,focus:'Diagnostic de départ',moduleCount:completedModuleDiagnostics(st.route)};
 }

 const priorities=await unifiedPriorities(5);
 priorities.filter(x=>x.rank<=36).slice(0,2).forEach(x=>missions.push({
   id:'adaptive:'+x.id,category:x.category,icon:x.icon,title:`Reprendre ${x.label}`,reason:x.reason,href:x.href,minutes:Math.min(x.minutes||25,25),type:'adaptive'
 }));

 if(errors>0)missions.push({id:'errors',category:'Français',icon:'🧠',title:`Revoir ${Math.min(errors,10)} erreur${errors>1?'s':''} arrivée${errors>1?'s':''} à échéance`,reason:'Le carnet personnel contient des difficultés prêtes à être réactivées.',href:'mes-erreurs.html',minutes:15,type:'recurring'});
 if(flash.seen===0 || flash.due>0)missions.push({id:'flashcards',category:'Français',icon:'🇫🇷',title:flash.seen===0?'Lancer 10 flashcards en rappel actif':`Réviser les ${flash.due} flashcard${flash.due>1?'s':''} déjà vue${flash.due>1?'s':''} et dues`,reason:'Le français doit devenir disponible sans délai de traduction mentale.',href:'francais.html',minutes:15,type:'recurring'});

 priorities.forEach(x=>{
   if(!missions.some(m=>m.href===x.href))missions.push({id:'priority:'+x.id,category:x.category,icon:x.icon,title:`Travailler ${x.label}`,reason:x.reason,href:x.href,minutes:x.minutes||25,type:'adaptive'});
 });

 const priorityCategories=new Set(priorities.map(x=>x.category));
 const cats=weakest(st.categories).sort((a,b)=>{
   const av=a.percent+(priorityCategories.has(a.name)?-25:0)+(Billete.norm(a.name).includes(Billete.norm(dayFocus))?-8:0);
   const bv=b.percent+(priorityCategories.has(b.name)?-25:0)+(Billete.norm(b.name).includes(Billete.norm(dayFocus))?-8:0);
   return av-bv;
 });
 for(const c of cats){
   const open=c.items.filter(x=>!x.done);if(!open.length)continue;
   const pick=open[(salt+missions.length)%open.length];missions.push(missionFromItem(pick));
 }

 if(st.route==='bac3'&&oral.oral1===0)missions.push({id:'oral1-first',category:'Oral & entretien',icon:'🎙️',title:'Faire une première simulation de l’oral 1',reason:'Aucune simulation n’est encore enregistrée dans ce navigateur.',href:'simulateur-oral1.html',minutes:45,type:'recurring'});

 const dedup=[],seen=new Set();
 for(const m of missions){
   const k=m.id.startsWith('progress:')?m.id:`${m.href}|${m.title}`;
   if(!seen.has(k)){seen.add(k);dedup.push(m)}
 }
 let used=0,chosen=[];
 for(const m of dedup){
   if(chosen.length>=4)break;
   if(chosen.length===0||used+m.minutes<=limitMinutes+10){chosen.push(m);used+=m.minutes}
 }
 if(!chosen.length&&dedup.length)chosen=[dedup[0]];
 return{missions:chosen,total:chosen.reduce((a,b)=>a+b.minutes,0),stats:st,errors,flash,oral,focus:priorities[0]?.label||dayFocus,moduleCount:completedModuleDiagnostics(st.route)};
}

function isDoneToday(id){return !!dailyHistory()[todayKey()]?.done?.includes(id)}
function markMission(m){
 if(m.key){
   const p=readJSON('billete-progress',{});
   p[m.key]=true;localStorage.setItem('billete-progress',JSON.stringify(p));Billete.updateProgressDisplays();
 }
 const h=dailyHistory(),k=todayKey();h[k]??={done:[],minutes:0};
 if(!h[k].done.includes(m.id)){h[k].done.push(m.id);h[k].minutes=(h[k].minutes||0)+(m.minutes||0)}
 saveHistory(h);document.dispatchEvent(new CustomEvent('billete:progress'));
}
function streak(){
 const h=dailyHistory();let n=0,d=new Date();
 for(;;){
   const k=d.toISOString().slice(0,10);
   if(h[k]?.done?.length)n++;else if(n>0)break;else if(k!==todayKey())break;
   d=new Date(d.getTime()-DAY);if(n>365)break;
 }
 return n;
}
function missionCard(m,i){
 const done=isDoneToday(m.id);
 return `<article class="today-mission card ${done?'mission-done':''}" data-mission="${m.id}"><div class="today-num">${i+1}</div><div class="today-icon">${m.icon}</div><span class="badge">${m.category}</span><h3>${m.title}</h3><p>${m.reason}</p><div class="today-meta"><span>≈ ${m.minutes} min</span>${done?'<span>✓ fait aujourd’hui</span>':''}</div><div class="actions"><a class="btn btn-secondary" href="${m.href}">Ouvrir</a><button class="btn ${done?'btn-secondary':'btn-primary'}" data-done="${m.id}" ${done?'disabled':''}>${done?'Validé':'Valider la mission'}</button></div></article>`;
}

async function renderToday(){
 const root=$('todayMissions');if(!root)return;
 const duration=Number($('sessionLength')?.value||60),salt=Number(sessionStorage.getItem('billete-daily-salt')||0),plan=await buildMissions(duration,salt);
 if($('todayFocus'))$('todayFocus').textContent=plan.focus;
 if($('todayTotal'))$('todayTotal').textContent=`≈ ${plan.total} min`;
 if($('todayStreak'))$('todayStreak').textContent=streak();
 root.innerHTML=plan.missions.map(missionCard).join('');
 root.querySelectorAll('[data-done]').forEach(b=>b.onclick=()=>{const m=plan.missions.find(x=>x.id===b.dataset.done);markMission(m);renderToday();renderHome();renderProgress()});
 if($('todaySignals'))$('todaySignals').innerHTML=`<div><strong>${plan.errors}</strong><small> erreurs dues</small></div><div><strong>${plan.flash.seen}</strong><small> cartes travaillées</small></div><div><strong>${plan.oral.oral1+plan.oral.entretien}</strong><small> simulations orales</small></div><div><strong>${plan.moduleCount}</strong><small> mini-diagnostics faits</small></div>`;
}

async function renderHome(){
 const root=$('homeToday'),path=$('homePathState'),progress=$('homeProgressState'),diag=readDiagnostic(),route=currentRoute();
 document.querySelectorAll('.home-route-mini [data-set-route]').forEach(b=>b.classList.toggle('route-active',b.dataset.setRoute===route));
 if(!diag){
   if(root)root.innerHTML=`<article class="callout"><span class="eyebrow">AUJOURD’HUI</span><h2>Commence par le diagnostic de départ.</h2><p>Il prépare les premières priorités avant que les mini-diagnostics ciblés ne les affinent.</p><div class="actions"><a class="btn btn-primary" href="diagnostic.html">Faire mon diagnostic · ≈ 15 min</a></div></article>`;
   return;
 }
 const priorities=await unifiedPriorities(3);
 if(path){
   path.innerHTML=`<div class="section-head"><div><span class="eyebrow">TON PARCOURS</span><h2>Tes trois priorités actuelles.</h2><p>Elles combinent diagnostic global, mini-diagnostics, progression et derniers bilans d’entraînement.</p></div></div><div class="home-priority-grid">${priorities.map((x,i)=>`<article class="card home-priority"><div class="home-priority-num">${i+1}</div><span class="badge badge-red">${x.icon} ${x.label}</span><h3>${x.reason}</h3><span class="home-priority-source">${x.source}</span><a href="${x.href}">Reprendre cette rubrique →</a></article>`).join('')}</div><div class="actions"><a class="btn btn-secondary" href="diagnostic.html">Refaire le diagnostic global</a><a class="btn btn-secondary" href="progression.html">Voir ma progression</a><a class="btn btn-secondary" href="entrainement.html">S’entraîner</a></div>`;
 }
 const scores=diag.scores||[];
 if(progress&&scores.length){
   const groups={priority:scores.filter(x=>x.key==='priority'),consolidate:scores.filter(x=>x.key==='consolidate'),solid:scores.filter(x=>x.key==='solid')},names=x=>x.length?x.map(v=>v.cat).join(' · '):'—';
   progress.innerHTML=`<div class="section-head"><div><span class="eyebrow">DIAGNOSTIC GLOBAL</span><h2>Le point de départ reste visible.</h2><p>Les priorités actuelles ci-dessus peuvent évoluer après un mini-diagnostic ou un entraînement, sans effacer ce résultat initial.</p></div></div><div class="home-status-grid"><article class="card home-status-card priority"><span class="badge badge-red">Prioritaire</span><h3>${names(groups.priority)}</h3><p>${groups.priority.length} domaine(s) sous le seuil prioritaire au dernier diagnostic global.</p></article><article class="card home-status-card consolidate"><span class="badge badge-gold">À consolider</span><h3>${names(groups.consolidate)}</h3><p>${groups.consolidate.length} domaine(s) avec une base déjà présente.</p></article><article class="card home-status-card solid"><span class="badge badge-green">Solide</span><h3>${names(groups.solid)}</h3><p>${groups.solid.length} domaine(s) à entretenir et mobiliser.</p></article></div>`;
 }
 if(root){
   const plan=await buildMissions(60,0);
   root.innerHTML=`<article class="callout home-today-callout"><span class="eyebrow">AUJOURD’HUI · PLAN PERSONNALISÉ</span><h2>Ta prochaine séance est prête.</h2><div class="home-mission-list">${plan.missions.slice(0,3).map((m,i)=>`<div><strong>${i+1}. ${m.icon} ${m.title}</strong><span>≈ ${m.minutes} min · ${m.category}</span></div>`).join('')}</div><div class="actions"><a class="btn btn-primary" href="aujourdhui.html">Commencer ma séance</a><a class="btn btn-secondary" href="entrainement.html">S’entraîner</a><a class="btn btn-secondary" href="progression.html">Voir ma progression</a></div></article>`;
 }
}

function levelLabel(n){return n===1?'Essentiel':n===2?'Consolider':n===3?'Concours':'Approfondir'}
function reviewLabel(r){return r==='blocked'?'Bloqué':r==='review'?'À consolider':'Solide'}

async function renderAdaptiveProgress(){
 const cards=$('adaptivePriorityCards'),mods=$('moduleDiagnosticGrid'),reviewsRoot=$('trainingReviewSummary');
 if(cards){
   const ps=await unifiedPriorities(3);
   cards.innerHTML=ps.length?ps.map((x,i)=>`<article class="card adaptive-priority"><div class="adaptive-priority-num">${i+1}</div><span class="badge badge-red">${x.icon} ${x.label}</span><h3>${x.reason}</h3><p class="adaptive-source">${x.source}</p><a href="${x.href}">Travailler maintenant →</a></article>`).join(''):'<article class="card"><h3>Aucune priorité calculée</h3><p>Fais le diagnostic global pour lancer le pilotage.</p><a class="btn btn-primary" href="diagnostic.html">Faire le diagnostic</a></article>';
 }
 if(mods){
   const rows=moduleDiagnostics();
   mods.innerHTML=rows.map(x=>x.data?`<article class="card module-diagnostic"><span class="badge">${x.icon} ${x.label}</span><div class="diag-level">Niveau ${x.level}</div><h3>${levelLabel(x.level)}</h3><p>${x.weakArea?`Priorité : ${x.weakArea}`:'Point de départ enregistré.'}</p><a href="${x.href}">Ouvrir →</a></article>`:`<article class="card module-diagnostic missing"><span class="badge">${x.icon} ${x.label}</span><div class="diag-level">—</div><h3>Pas encore fait</h3><p>Le mini-diagnostic de cette rubrique n’a pas encore été enregistré.</p><a href="${x.href}">Ouvrir la rubrique →</a></article>`).join('');
 }
 if(reviewsRoot){
   const rows=reviewRows().slice(-5).reverse();
   reviewsRoot.innerHTML=rows.length?rows.map(x=>{const meta=DOMAIN_INFO[x.domain]||{label:x.domain};const date=x.date?new Date(x.date).toLocaleDateString('fr-FR'):'—';return `<div class="training-review-row"><strong>${meta.label} · ${reviewLabel(x.result)}</strong><span>${date}</span></div>`}).join(''):'<p>Aucun bilan enregistré pour l’instant.</p>';
 }
}

async function renderProgress(){
 const root=$('categoryProgress');if(!root)return;
 const st=await stats(),cats=st.categories.sort((a,b)=>a.percent-b.percent||a.name.localeCompare(b.name)),total=st.catalog.length,done=st.catalog.filter(x=>st.progress[x.key]).length,pct=total?Math.round(done/total*100):0;
 if($('realDone'))$('realDone').textContent=done;
 if($('realTotal'))$('realTotal').textContent=total;
 if($('realPercent'))$('realPercent').textContent=pct+'%';
 const fs=flashStats(),er=dueErrorCount(),os=oralStats(),md=completedModuleDiagnostics(st.route);
 if($('progressSignals'))$('progressSignals').innerHTML=`<article class="card"><div class="progress-number">${er}</div><h3>erreurs à revoir</h3></article><article class="card"><div class="progress-number">${fs.seen}</div><h3>flashcards déjà travaillées</h3><p>${fs.due} à échéance parmi elles</p></article><article class="card"><div class="progress-number">${os.oral1+os.entretien}</div><h3>simulations orales enregistrées</h3></article><article class="card"><div class="progress-number">${md}</div><h3>mini-diagnostics enregistrés</h3></article>`;
 root.innerHTML=cats.map(c=>`<article class="category-progress card"><div class="category-progress-head"><h3>${CATEGORY_INFO[c.name]?.icon||'🎯'} ${c.name}</h3><strong>${c.done}/${c.total}</strong></div><div class="progress-bar"><span style="width:${c.percent}%"></span></div><p>${c.percent}% validé</p><a href="${CATEGORY_INFO[c.name]?.href||c.items[0]?.page||'#'}">Travailler cette catégorie →</a></article>`).join('');
 const weak=weakest(cats).filter(x=>x.total&&x.percent<100).slice(0,3);
 if($('weakProgress'))$('weakProgress').innerHTML=weak.length?weak.map((c,i)=>`<div><strong>${i+1}. ${c.name}</strong><span>${c.percent}% · ${c.total-c.done} objectif(s) encore ouvert(s)</span></div>`).join(''):'<p>Toutes les catégories suivies sont validées. Il faut maintenant maintenir les acquis en simulation.</p>';
 await renderAdaptiveProgress();
}

async function renderPlanning(){
 const root=$('adaptiveWeek');if(!root)return;
 const ps=await unifiedPriorities(3),er=dueErrorCount(),fs=flashStats();
 root.innerHTML=`<div class="grid grid-3">${ps.map((x,i)=>`<article class="card"><span class="badge">Priorité ${i+1}</span><h3>${x.icon} ${x.label}</h3><p>${x.reason}</p><a class="btn btn-secondary" href="${x.href}">Travailler</a></article>`).join('')}</div><div class="notice"><strong>Entretien de la mémoire :</strong> ${er} erreur(s) à revoir · ${fs.due} flashcard(s) à échéance. <a href="aujourdhui.html">Construire la séance du jour →</a></div>`;
}

document.addEventListener('DOMContentLoaded',()=>{
 renderToday();renderHome();renderProgress();renderPlanning();
 $('sessionLength')?.addEventListener('change',renderToday);
 $('reshuffleToday')?.addEventListener('click',()=>{sessionStorage.setItem('billete-daily-salt',String(Number(sessionStorage.getItem('billete-daily-salt')||0)+1));renderToday()});
});
document.addEventListener('billete:progress',()=>{renderHome();renderProgress();renderPlanning()});
})();