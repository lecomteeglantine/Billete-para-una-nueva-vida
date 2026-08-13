(function(){
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const REVIEW_KEY='billete-training-reviews-v1';
const links={
 methodologie:{label:'Méthodologie / composition',href:'methodologie-composition.html'},
 francais:{label:'Français',href:'francais.html'},
 traduction:{label:'Traduction',href:'traduction.html'},
 didactique:{label:'Didactique',href:'didactique.html'},
 oral:{label:'Oral & entretien',href:'oral.html'},
 chirbes:{label:'Chirbes',href:'litterature.html'},
 transition:{label:'Transition',href:'civilisation.html'},
 capmany:{label:'Capmany',href:'bac5-capmany.html'},
 usigli:{label:'Usigli',href:'bac5-usigli.html'},
 padilla:{label:'Padilla',href:'bac5-padilla.html'}
};
const diagSources=[
 ['francais','billete-francais-diagnostic-v1'],
 ['traduction','billete-traduction-diagnostic-v1'],
 ['didactique','billete-didactique-diagnostic-v1'],
 ['methodologie','billete-methodologie-diagnostic-v1'],
 ['transition','billete-transition-diagnostic-v1'],
 ['capmany','billete-capmany-diagnostic-v1'],
 ['usigli','billete-usigli-diagnostic-v1'],
 ['padilla','billete-padilla-diagnostic-v1']
];
function json(key,fallback=null){try{return JSON.parse(localStorage.getItem(key)||'null')??fallback}catch(e){return fallback}}
function route(){return localStorage.getItem('billete-route')||'all'}
function reviews(){return json(REVIEW_KEY,[])||[]}
function oralDiag(){const r=route();return (r==='bac3'||r==='bac5')?json(`billete-oral-diagnostic-v1-${r}`):null}
function chirbesDiag(){return json('billete-chirbes-diagnostic-v1')||json('billete-chirbes-path-v1')||json('billete-chirbes-diagnostic')}
function candidates(){
 const out=[];
 reviews().slice(-12).reverse().forEach((x,idx)=>{
   if(x.result==='blocked')out.push({domain:x.domain,weight:-40+idx,reason:'Dernier bilan : bloqué'});
   else if(x.result==='review')out.push({domain:x.domain,weight:-25+idx,reason:'Dernier bilan : à consolider'});
 });
 diagSources.forEach(([domain,key])=>{
   const d=json(key);if(!d)return;
   const lvl=Number(d.level||4);
   out.push({domain,weight:lvl*10,reason:d.weakArea?`Diagnostic : priorité ${d.weakArea}`:`Diagnostic : niveau ${lvl}`});
 });
 const od=oralDiag();if(od)out.push({domain:'oral',weight:Number(od.level||4)*10,reason:od.weakArea?`Diagnostic : priorité ${od.weakArea}`:`Diagnostic oral : niveau ${od.level}`});
 const cd=chirbesDiag();if(cd)out.push({domain:'chirbes',weight:Number(cd.level||4)*10,reason:`Diagnostic Chirbes : niveau ${cd.level||'à revoir'}`});
 const global=json('billete-diagnostic-v2')||json('billete-diagnostic');
 if(global&&Array.isArray(global.priorities)){
   const map={'Français':'francais','Traduction':'traduction','Méthodologie':'methodologie','Didactique':'didactique','Oral & entretien':'oral','Littérature':'chirbes','Civilisation':'transition','Bac+5':'didactique','Programme':'methodologie'};
   global.priorities.forEach((p,i)=>{
     const raw=typeof p==='string'?p:(p.domain||p.name||p.label||'');
     const domain=map[raw]||map[(raw||'').trim()];
     if(domain)out.push({domain,weight:-15+i,reason:'Priorité du diagnostic global'});
   });
 }
 return out;
}
function priorities(){
 const best={};
 candidates().forEach(x=>{if(links[x.domain]&&(!best[x.domain]||x.weight<best[x.domain].weight))best[x.domain]=x});
 return Object.values(best).sort((a,b)=>a.weight-b.weight).slice(0,3);
}
function renderPriorities(){
 const box=$('#trainingPriorities'),sum=$('#trainingPrioritySummary');if(!box||!sum)return;
 const ps=priorities();
 if(!ps.length){
   sum.innerHTML='<strong>Aucune priorité enregistrée pour l’instant.</strong><p>Fais le diagnostic global ; le centre pourra ensuite choisir les exercices les plus rentables.</p>';
   box.innerHTML='<article class="training-priority"><strong>Commencer ici</strong><p class="reason">Diagnostic global · ≈ 15 min</p><a class="btn btn-primary" href="diagnostic.html">Faire le diagnostic →</a></article>';return;
 }
 sum.innerHTML=`<strong>${ps.length} priorité${ps.length>1?'s':''} détectée${ps.length>1?'s':''}</strong><p>Commence par la première, puis reviens ici après ton entraînement.</p>`;
 box.innerHTML=ps.map((x,i)=>`<article class="training-priority"><span class="badge ${i===0?'badge-red':'badge-gold'}">PRIORITÉ ${i+1}</span><strong>${links[x.domain].label}</strong><p class="reason">${x.reason}</p><a class="btn btn-secondary" href="${links[x.domain].href}">Travailler ce point →</a></article>`).join('');
}
function openStage(n,scroll=true){
 $$('.training-stage-panel').forEach(p=>p.classList.toggle('active',+p.dataset.trainingPanel===n));
 $$('[data-training-stage]').forEach(b=>b.classList.toggle('active',+b.dataset.trainingStage===n));
 localStorage.setItem('billete-training-stage',String(n));
 if(scroll)document.querySelector(`[data-training-panel="${n}"]`)?.scrollIntoView({behavior:'smooth',block:'start'});
}
$$('[data-training-stage]').forEach(b=>b.addEventListener('click',()=>openStage(+b.dataset.trainingStage,true)));
$$('[data-training-top]').forEach(b=>b.addEventListener('click',()=>$('#centre-entrainement')?.scrollIntoView({behavior:'smooth'})));
openStage(+(localStorage.getItem('billete-training-stage')||1),false);

let chosenResult='';
const domain=$('#trainingDomain'),save=$('#saveTrainingReview'),next=$('#trainingNext');
$$('[data-training-result]').forEach(b=>b.addEventListener('click',()=>{
 chosenResult=b.dataset.trainingResult;
 $$('[data-training-result]').forEach(x=>x.classList.toggle('selected',x===b));
 save.disabled=!domain.value;preview();
}));
domain?.addEventListener('change',()=>{save.disabled=!(domain.value&&chosenResult);preview()});
function preview(){
 if(!next||!domain?.value||!chosenResult)return;
 const x=links[domain.value];
 const text=chosenResult==='solid'?'Solide : passe à un autre domaine ou à un palier plus long.':chosenResult==='review'?'À consolider : retourne au module, travaille le point précis, puis refais un exercice court.':'Bloqué : arrête de multiplier les sujets. Reviens au module ciblé avant une nouvelle simulation.';
 next.innerHTML=`<span class="eyebrow">PROCHAINE ACTION</span><h3>${x.label}</h3><p>${text}</p><a class="btn btn-primary" href="${x.href}">Ouvrir le module →</a>`;
}
save?.addEventListener('click',()=>{
 if(!domain.value||!chosenResult)return;
 const arr=reviews();arr.push({date:new Date().toISOString(),domain:domain.value,result:chosenResult,route:route()});
 localStorage.setItem(REVIEW_KEY,JSON.stringify(arr.slice(-40)));
 renderPriorities();renderHistory();
 save.textContent='Bilan enregistré ✓';setTimeout(()=>save.textContent='Enregistrer le bilan',1200);
});
function renderHistory(){
 const el=$('#trainingHistory');if(!el)return;
 const arr=reviews().slice(-3).reverse();
 if(!arr.length){el.innerHTML='<strong>Historique :</strong> aucun bilan enregistré.';return}
 const names={solid:'solide',review:'à consolider',blocked:'bloqué'};
 el.innerHTML='<strong>Derniers bilans :</strong> '+arr.map(x=>`${links[x.domain]?.label||x.domain} · ${names[x.result]}`).join(' · ');
}
renderPriorities();renderHistory();
})();