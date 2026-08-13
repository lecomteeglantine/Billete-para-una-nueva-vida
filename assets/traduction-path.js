(function(){
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],KEY='billete-traduction-diagnostic-v1';
const questions=[
{cat:'Version',q:"Quelle traduction de « Llevaba años viviendo allí » est la plus naturelle ?",o:[["Il y vivait depuis des années.",2],["Il portait des années en vivant là.",0],["Il avait vécu là depuis des années.",1]]},
{cat:'Version',q:"Dans une version, si la syntaxe espagnole paraît très longue, le meilleur réflexe est de…",o:[["repérer les unités de sens puis reconstruire une syntaxe française naturelle sans perdre les liens logiques.",2],["conserver exactement le même ordre des propositions.",0],["supprimer les subordonnées qui alourdissent la phrase.",0]]},
{cat:'Version',q:"Face à un mot polysémique, il faut d’abord…",o:[["identifier le sens activé par le contexte avant de choisir l’équivalent français.",2],["prendre le premier équivalent du dictionnaire.",0],["choisir le mot français qui ressemble le plus graphiquement.",0]]},

{cat:'Thème',q:"Quelle traduction de « Je me suis rendu compte de mon erreur » est correcte ?",o:[["Me di cuenta de mi error.",2],["Me realicé de mi error.",0],["Me rendí cuenta de mi error.",0]]},
{cat:'Thème',q:"Pour traduire « Depuis trois ans, elle travaille ici », quelle solution respecte le mieux la durée encore en cours ?",o:[["Desde hace tres años trabaja aquí.",2],["Desde tres años trabajó aquí.",0],["Hace tres años trabajaba aquí.",1]]},
{cat:'Thème',q:"En thème, pourquoi faut-il vérifier la construction d’un verbe ?",o:[["Parce que la préposition et le régime du verbe ne se transfèrent pas automatiquement du français vers l’espagnol.",2],["Parce que tous les verbes espagnols exigent une préposition.",0],["Parce que l’ordre des mots est toujours identique dans les deux langues.",0]]},

{cat:'Faits de langue',q:"Dans « Cuando llegó, ya habían salido », « habían salido » est…",o:[["un plus-que-parfait exprimant une antériorité par rapport à un repère passé.",2],["un passé simple exprimant un événement ponctuel.",0],["un futur antérieur à valeur hypothétique.",0]]},
{cat:'Faits de langue',q:"Une analyse de fait de langue solide suit quel ordre ?",o:[["Identifier → décrire la construction → interpréter la valeur → comparer et justifier la traduction.",2],["Traduire → donner une règle générale → passer au segment suivant.",0],["Nommer le temps verbal → proposer plusieurs traductions sans les commenter.",1]]},
{cat:'Faits de langue',q:"Pourquoi distinguer catégorie grammaticale et fonction ?",o:[["Parce que la catégorie dit ce qu’est l’élément, tandis que la fonction décrit son rôle dans la construction.",2],["Parce qu’un mot ne peut avoir qu’une catégorie mais aucune fonction.",0],["Parce que les deux termes sont interchangeables au concours.",0]]},

{cat:'Justification',q:"Quelle justification est la plus convaincante ?",o:[["Je choisis cette formulation parce qu’elle restitue l’antériorité tout en restant idiomatique dans la langue d’arrivée.",2],["Je préfère cette traduction parce qu’elle sonne mieux.",0],["C’est la traduction qui me paraît la plus jolie.",0]]},
{cat:'Justification',q:"Si une traduction littérale est grammaticalement possible mais change le registre, il faut…",o:[["expliquer le changement de registre et choisir une solution qui respecte la voix du passage.",2],["conserver la traduction littérale puisqu’elle est grammaticale.",0],["augmenter systématiquement le niveau de langue pour faire plus académique.",0]]},
{cat:'Justification',q:"Après une erreur récurrente de traduction, la meilleure fiche contient…",o:[["le fragment source, ta solution, la correction, la raison linguistique et un nouvel exemple.",2],["uniquement la bonne traduction.",0],["la règle générale sans le contexte où l’erreur s’est produite.",1]]}
];
let pos=0,answers=Array(questions.length).fill(null);

function saved(){try{return JSON.parse(localStorage.getItem(KEY)||'null')}catch(e){return null}}
function recommend(s){return s<=10?1:s<=17?2:s<=21?3:4}
function name(n){return ['','Niveau 1 · L’essentiel','Niveau 2 · Consolider','Niveau 3 · Concours','Niveau 4 · Approfondir'][n]}
function text(n){return ['','Commence par la méthode, le sens global et la qualité de la langue d’arrivée.','Le socle est présent : travaille les interférences, temps, pronoms, prépositions, registre et repérage.','Passe aux tâches complètes : version, thème, faits de langue et justification en français.','Ta base est solide : transforme tes erreurs réelles en programme d’analyse contrastive.'][n]}

function weakArea(){
  const scores={};
  questions.forEach((q,i)=>{
    scores[q.cat]??={score:0,max:0};
    scores[q.cat].score += q.o[answers[i]][1];
    scores[q.cat].max += 2;
  });
  return Object.entries(scores).sort((a,b)=>(a[1].score/a[1].max)-(b[1].score/b[1].max))[0][0];
}

function show(d){
  const box=$('#trPathStatus'); if(!box)return;
  if(!d){
    box.innerHTML='<span class="eyebrow">POINT DE DÉPART</span><h3>Pas encore déterminé</h3><p>Après 12 questions, le site te conseillera Essentiel, Consolider, Concours ou Approfondir et indiquera le domaine à travailler en priorité.</p>';
    $('#trDiagReset').hidden=true;
    $$('[data-tr-level]').forEach(b=>{b.classList.remove('recommended');b.classList.remove('active')});
    return;
  }
  box.innerHTML=`<span class="badge badge-red">RECOMMANDATION</span><h3>${name(d.level)}</h3><p>${text(d.level)}</p><span class="tr-priority-pill">Priorité repérée : ${d.weakArea}</span><div class="actions"><button class="btn btn-primary" type="button" id="trContinue">Continuer mon parcours</button></div>`;
  $('#trDiagReset').hidden=false;
  $('#trContinue')?.addEventListener('click',()=>openLevel(d.level,true));
  $$('[data-tr-level]').forEach(b=>b.classList.toggle('recommended',+b.dataset.trLevel===d.level));
}

function render(){
  const q=questions[pos];
  $('#trDiagCount').textContent=`Question ${pos+1} / ${questions.length} · ${q.cat}`;
  $('#trDiagBar').style.width=`${Math.round((pos+1)/questions.length*100)}%`;
  $('#trDiagQuestion').textContent=q.q;
  $('#trDiagOptions').innerHTML=q.o.map((x,i)=>`<button class="tr-diag-option ${answers[pos]===i?'selected':''}" type="button" data-i="${i}">${x[0]}</button>`).join('');
  $$('.tr-diag-option').forEach(b=>b.addEventListener('click',()=>{answers[pos]=+b.dataset.i;render()}));
  $('#trDiagPrev').disabled=pos===0;
  $('#trDiagNext').disabled=answers[pos]===null;
  $('#trDiagNext').textContent=pos===questions.length-1?'Voir mon point de départ →':'Suivant →';
}

function start(){
  pos=0; answers=Array(questions.length).fill(null);
  $('#trDiag').classList.remove('hidden');
  render();
  $('#trDiag').scrollIntoView({behavior:'smooth',block:'center'});
}

function finish(){
  let score=0;
  questions.forEach((q,i)=>score+=q.o[answers[i]][1]);
  const d={version:1,date:new Date().toISOString(),score,max:24,level:recommend(score),weakArea:weakArea()};
  localStorage.setItem(KEY,JSON.stringify(d));
  $('#trDiag').classList.add('hidden');
  show(d);
  openLevel(d.level,false);
  document.dispatchEvent(new CustomEvent('billete:traduction-diagnostic',{detail:d}));
}

function openLevel(n,scroll=true){
  $$('.tr-level-panel').forEach(p=>p.classList.toggle('active',+p.dataset.trPanel===n));
  $$('[data-tr-level]').forEach(b=>b.classList.toggle('active',+b.dataset.trLevel===n));
  localStorage.setItem('billete-traduction-open-level',String(n));
  updateValidation();
  if(scroll)document.querySelector(`[data-tr-panel="${n}"]`)?.scrollIntoView({behavior:'smooth',block:'start'});
}

function pdata(){try{return JSON.parse(localStorage.getItem('billete-progress')||'{}')}catch(e){return {}}}

function updateValidation(){
  const d=pdata();
  $$('[data-tr-validation]').forEach(box=>{
    const level=+box.dataset.trValidation,
          panel=document.querySelector(`[data-tr-panel="${level}"]`),
          checks=panel?[...panel.querySelectorAll('[data-progress]')]:[],
          done=checks.filter(c=>d[c.dataset.progress]).length,
          complete=checks.length>0&&done===checks.length;
    box.classList.toggle('complete',complete);
    box.innerHTML=`<strong>${complete?`✓ Niveau ${level} suffisamment solide`:`Niveau ${level} · ${done}/${checks.length} objectifs validés`}</strong><span>${complete&&level<3?`Tu peux passer au niveau ${level+1}.`:(complete&&level===3?'Le socle de traduction du concours est suffisamment solide ; approfondis ensuite à partir de tes erreurs réelles.':'Valide les objectifs au fur et à mesure.')}</span>`;
  });
}

$('#trDiagStart')?.addEventListener('click',start);
$('#trDiagReset')?.addEventListener('click',start);
$('#trDiagPrev')?.addEventListener('click',()=>{if(pos>0){pos--;render()}});
$('#trDiagNext')?.addEventListener('click',()=>{if(answers[pos]===null)return;if(pos<questions.length-1){pos++;render()}else finish()});
$$('[data-tr-level]').forEach(b=>b.addEventListener('click',()=>openLevel(+b.dataset.trLevel,true)));
$$('[data-tr-top]').forEach(b=>b.addEventListener('click',()=>$('#traduction-parcours')?.scrollIntoView({behavior:'smooth'})));
document.addEventListener('change',e=>{if(e.target.matches('[data-progress]'))setTimeout(updateValidation,0)});
document.addEventListener('billete:progress',updateValidation);

const prior=saved();
show(prior);
if(prior){openLevel(+(localStorage.getItem('billete-traduction-open-level')||prior.level),false)}
else{$$('.tr-level-panel').forEach(p=>p.classList.remove('active'));$$('[data-tr-level]').forEach(b=>b.classList.remove('active'))}
updateValidation();
})();