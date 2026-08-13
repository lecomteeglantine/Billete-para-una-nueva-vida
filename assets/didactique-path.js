(function(){
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],KEY='billete-didactique-diagnostic-v1';
const questions=[
{cat:'Problématique',q:"Laquelle est une vraie problématique culturelle ?",o:[["Comment la transmission familiale transforme-t-elle ce qui est considéré comme un héritage ?",2],["La famille dans le monde hispanique.",0],["Les relations entre les générations et les traditions.",1]]},
{cat:'Problématique',q:"À quoi sert d’abord la problématique ?",o:[["À organiser les documents et la progression autour d’une question de sens.",2],["À rendre le titre de la séquence plus original.",0],["À annoncer toutes les activités prévues.",0]]},
{cat:'Objectifs',q:"Quel objectif est le plus observable ?",o:[["Comparer deux points de vue sur la transmission et justifier une préférence à l’aide d’exemples.",2],["Comprendre la culture hispanique.",0],["Découvrir le vocabulaire de la famille.",1]]},
{cat:'Objectifs',q:"Un objectif linguistique pertinent doit…",o:[["servir une activité ou une production réellement prévue dans la progression.",2],["être choisi parce qu’il figure dans le manuel.",0],["être le plus ambitieux possible, quel que soit le niveau.",0]]},
{cat:'CECRL',q:"Pourquoi annoncer un niveau CECRL ?",o:[["Parce qu’il doit influer sur la complexité des tâches, les aides et les productions attendues.",2],["Parce qu’il suffit de mentionner A2, B1 ou B2 pour justifier la séquence.",0],["Parce que chaque document possède automatiquement un niveau CECRL fixe.",0]]},
{cat:'CECRL',q:"Pour un niveau fragile, quel choix est le plus cohérent ?",o:[["Conserver l’objectif mais prévoir davantage d’étayage, de repérage et de modèles.",2],["Supprimer l’objectif culturel pour ne travailler que la grammaire.",0],["Donner exactement la même tâche sans aide pour rester équitable.",0]]},
{cat:'Documents',q:"Pourquoi choisir un document plutôt qu’un autre ?",o:[["Parce qu’il apporte une fonction précise dans la progression : point de vue, contradiction, ressource ou réinvestissement.",2],["Parce qu’il est authentique et donc forcément adapté.",0],["Parce qu’il est intéressant pour le professeur.",0]]},
{cat:'Documents',q:"Un corpus cohérent est surtout un corpus où…",o:[["les documents se répondent et permettent de faire évoluer la compréhension du problème culturel.",2],["tous les documents parlent exactement du même sujet de la même manière.",0],["chaque document permet une activité différente.",1]]},
{cat:'Activités',q:"Quelle formulation place réellement l’élève au centre ?",o:[["Les élèves repèrent deux indices, les comparent en binômes puis justifient oralement l’interprétation retenue.",2],["Le professeur explique le document puis fait une activité de vocabulaire.",0],["On travaillera la compréhension et l’expression orale.",1]]},
{cat:'Activités',q:"À quoi sert l’étayage ?",o:[["À fournir une aide temporaire qui permet d’atteindre l’objectif sans faire la tâche à la place de l’élève.",2],["À simplifier définitivement l’objectif pour certains élèves.",0],["À donner toutes les réponses avant l’activité.",0]]},
{cat:'Évaluation',q:"Une évaluation cohérente doit surtout…",o:[["reprendre des compétences et des critères déjà préparés pendant la progression.",2],["être plus difficile que l’entraînement pour départager les élèves.",0],["évaluer toutes les compétences possibles en une seule tâche.",0]]},
{cat:'Évaluation',q:"Quel lien est le plus solide entre entraînement et tâche finale ?",o:[["Les activités précédentes construisent progressivement les ressources nécessaires pour réussir la tâche finale.",2],["La tâche finale est annoncée à la fin pour éviter d’influencer les élèves.",0],["La tâche finale doit être complètement différente pour vérifier l’autonomie.",0]]}
];
let pos=0,answers=Array(questions.length).fill(null);
function saved(){try{return JSON.parse(localStorage.getItem(KEY)||'null')}catch(e){return null}}
function recommend(s){return s<=10?1:s<=17?2:s<=21?3:4}
function name(n){return ['','Niveau 1 · L’essentiel','Niveau 2 · Consolider','Niveau 3 · Concours','Niveau 4 · Approfondir'][n]}
function text(n){return ['','Commence par le contexte, la problématique et le vocabulaire professionnel.','Le socle est présent : travaille le niveau visé, les documents, les objectifs et ce que font réellement les élèves.','Passe à l’application exacte de l’épreuve préparée et aux réflexes jury.','Ta base est solide : approfondis différenciation, évaluation et justification des choix.'][n]}
function weakArea(){
 const scores={};
 questions.forEach((q,i)=>{scores[q.cat]??={score:0,max:0};scores[q.cat].score+=q.o[answers[i]][1];scores[q.cat].max+=2});
 return Object.entries(scores).sort((a,b)=>(a[1].score/a[1].max)-(b[1].score/b[1].max))[0][0];
}
function show(d){
 const box=$('#didPathStatus');if(!box)return;
 if(!d){
  box.innerHTML='<span class="eyebrow">POINT DE DÉPART</span><h3>Pas encore déterminé</h3><p>Après 12 questions, le site te conseillera Essentiel, Consolider, Concours ou Approfondir et indiquera la priorité à travailler.</p>';
  $('#didDiagReset').hidden=true;
  $$('[data-did-level]').forEach(b=>{b.classList.remove('recommended');b.classList.remove('active')});return;
 }
 box.innerHTML=`<span class="badge badge-red">RECOMMANDATION</span><h3>${name(d.level)}</h3><p>${text(d.level)}</p><span class="did-priority-pill">Priorité repérée : ${d.weakArea}</span><div class="actions"><button class="btn btn-primary" type="button" id="didContinue">Continuer mon parcours</button></div>`;
 $('#didDiagReset').hidden=false;
 $('#didContinue')?.addEventListener('click',()=>openLevel(d.level,true));
 $$('[data-did-level]').forEach(b=>b.classList.toggle('recommended',+b.dataset.didLevel===d.level));
}
function render(){
 const q=questions[pos];
 $('#didDiagCount').textContent=`Question ${pos+1} / ${questions.length} · ${q.cat}`;
 $('#didDiagBar').style.width=`${Math.round((pos+1)/questions.length*100)}%`;
 $('#didDiagQuestion').textContent=q.q;
 $('#didDiagOptions').innerHTML=q.o.map((x,i)=>`<button class="did-diag-option ${answers[pos]===i?'selected':''}" type="button" data-i="${i}">${x[0]}</button>`).join('');
 $$('.did-diag-option').forEach(b=>b.addEventListener('click',()=>{answers[pos]=+b.dataset.i;render()}));
 $('#didDiagPrev').disabled=pos===0;$('#didDiagNext').disabled=answers[pos]===null;
 $('#didDiagNext').textContent=pos===questions.length-1?'Voir mon point de départ →':'Suivant →';
}
function start(){pos=0;answers=Array(questions.length).fill(null);$('#didDiag').classList.remove('hidden');render();$('#didDiag').scrollIntoView({behavior:'smooth',block:'center'})}
function finish(){
 let score=0;questions.forEach((q,i)=>score+=q.o[answers[i]][1]);
 const d={version:1,date:new Date().toISOString(),score,max:24,level:recommend(score),weakArea:weakArea()};
 localStorage.setItem(KEY,JSON.stringify(d));$('#didDiag').classList.add('hidden');show(d);openLevel(d.level,false);
 document.dispatchEvent(new CustomEvent('billete:didactique-diagnostic',{detail:d}));
}
function openLevel(n,scroll=true){
 $$('.did-level-panel').forEach(p=>p.classList.toggle('active',+p.dataset.didPanel===n));
 $$('[data-did-level]').forEach(b=>b.classList.toggle('active',+b.dataset.didLevel===n));
 localStorage.setItem('billete-didactique-open-level',String(n));updateValidation();
 if(scroll)document.querySelector(`[data-did-panel="${n}"]`)?.scrollIntoView({behavior:'smooth',block:'start'});
}
function pdata(){try{return JSON.parse(localStorage.getItem('billete-progress')||'{}')}catch(e){return {}}}
function updateValidation(){
 const d=pdata();
 $$('[data-did-validation]').forEach(box=>{
  const level=+box.dataset.didValidation,panel=document.querySelector(`[data-did-panel="${level}"]`),checks=panel?[...panel.querySelectorAll('[data-progress]')]:[],done=checks.filter(c=>d[c.dataset.progress]).length,complete=checks.length>0&&done===checks.length;
  box.classList.toggle('complete',complete);
  box.innerHTML=`<strong>${complete?`✓ Niveau ${level} suffisamment solide`:`Niveau ${level} · ${done}/${checks.length} objectifs validés`}</strong><span>${complete&&level<3?`Tu peux passer au niveau ${level+1}.`:(complete&&level===3?'Le socle didactique du concours est suffisamment solide ; approfondis ensuite selon les questions du jury.':'Valide les objectifs au fur et à mesure.')}</span>`;
 });
}
function drill(prefix,data){
 let i=0;const q=$(`#${prefix}Question`),opts=$(`#${prefix}Options`),fb=$(`#${prefix}Feedback`),next=$(`#${prefix}Next`);
 if(!q)return;
 function renderD(){
  const x=data[i];q.textContent=x.q;fb.hidden=true;next.hidden=true;
  opts.innerHTML=x.o.map((t,j)=>`<button class="did-qoption" type="button" data-i="${j}">${t}</button>`).join('');
  opts.querySelectorAll('button').forEach(b=>b.onclick=()=>{
   opts.querySelectorAll('button').forEach((bb,j)=>{bb.disabled=true;if(j===x.a)bb.classList.add('correct');else if(j===+b.dataset.i)bb.classList.add('wrong')});
   fb.hidden=false;fb.innerHTML=`<strong>${+b.dataset.i===x.a?'Bonne réponse.':'À corriger.'}</strong> ${x.e}`;next.hidden=false;
  });
 }
 next.onclick=()=>{if(i<data.length-1){i++;renderD()}else{q.textContent='Réflexe acquis.';opts.innerHTML='';fb.hidden=false;fb.textContent='Tu distingues bien le geste attendu pour cette épreuve.';next.hidden=true}};
 renderD();
}
drill('didBac3',[
 {q:"Dans la seconde partie de l’oral bac+3, que faut-il faire en priorité ?",o:["Proposer une séquence complète.","Expliciter l’intérêt culturel et la portée interculturelle du dossier.","Présenter une tâche finale pour une classe."],a:1,e:"La seconde partie est une analyse culturelle et interculturelle du dossier, pas une séquence pédagogique."},
 {q:"Quel début est le plus adapté ?",o:["Je proposerais aux élèves de…","Le dossier met en tension deux représentations de…","Ma tâche finale serait…"],a:1,e:"Commence par les enjeux et les représentations portés par les documents."},
 {q:"Que signifie « portée interculturelle » ?",o:["Inventer une comparaison avec la France à tout prix.","Montrer ce que le dossier permet de questionner dans la rencontre, l’écart ou le dialogue entre représentations culturelles.","Faire une activité de médiation avec des élèves."],a:1,e:"Il s’agit d’analyser ce que le dossier ouvre comme questionnement entre représentations ou contextes culturels."}
]);
drill('didBac5',[
 {q:"Dans l’épreuve disciplinaire appliquée, la première décision pédagogique consiste à…",o:["utiliser tous les supports fournis.","sélectionner les supports utiles et justifier leur mise en relation.","inventer immédiatement la tâche finale."],a:1,e:"Le candidat opère des choix parmi les supports puis construit une séquence à partir de ceux qu’il retient."},
 {q:"À la leçon, que doit contenir une proposition crédible ?",o:["Des objectifs et un déroulement avec des exemples concrets d’activités.","Uniquement une analyse brillante des documents.","Une liste de notions grammaticales à enseigner."],a:0,e:"Le jury attend des objectifs et une mise en œuvre cohérente avec des activités concrètes."},
 {q:"Le jury demande « pourquoi ce document ? ». La meilleure réponse est…",o:["Parce qu’il est authentique.","Parce qu’il apporte ce point de vue précis et prépare l’activité suivante.","Parce que les élèves aiment les vidéos."],a:1,e:"La fonction du document dans la progression est plus défendable qu’une qualité générale."}
]);
$('#didDiagStart')?.addEventListener('click',start);$('#didDiagReset')?.addEventListener('click',start);
$('#didDiagPrev')?.addEventListener('click',()=>{if(pos>0){pos--;render()}});
$('#didDiagNext')?.addEventListener('click',()=>{if(answers[pos]===null)return;if(pos<questions.length-1){pos++;render()}else finish()});
$$('[data-did-level]').forEach(b=>b.addEventListener('click',()=>openLevel(+b.dataset.didLevel,true)));
$$('[data-did-top]').forEach(b=>b.addEventListener('click',()=>$('#didactique-parcours')?.scrollIntoView({behavior:'smooth'})));
document.addEventListener('change',e=>{if(e.target.matches('[data-progress]'))setTimeout(updateValidation,0)});
document.addEventListener('billete:progress',updateValidation);
const prior=saved();show(prior);
if(prior){openLevel(+(localStorage.getItem('billete-didactique-open-level')||prior.level),false)}
else{$$('.did-level-panel').forEach(p=>p.classList.remove('active'));$$('[data-did-level]').forEach(b=>b.classList.remove('active'))}
updateValidation();
})();