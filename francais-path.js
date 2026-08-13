(function(){
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],KEY='billete-francais-diagnostic-v1';
const questions=[
{cat:'Consignes',q:"Dans une consigne, « étayer une analyse » signifie surtout…",o:[["l’appuyer par des éléments précis, des exemples ou des preuves.",2],["la résumer en quelques lignes.",0],["la rendre plus longue sans modifier l’argumentation.",0]]},
{cat:'Académique',q:"Quelle formulation convient le mieux dans une copie ?",o:[["Ces deux documents mettent en évidence des représentations divergentes du pouvoir.",2],["On voit bien que les deux documents ne pensent pas pareil.",0],["Les deux documents sont pas du tout d’accord.",0]]},
{cat:'Usage',q:"En français, « prétendre que… » signifie généralement…",o:[["affirmer ou soutenir que quelque chose est vrai.",2],["avoir l’intention de faire quelque chose.",0],["espérer discrètement que quelque chose arrive.",0]]},
{cat:'Grammaire',q:"Dans « J’analyse les documents », « les documents » est…",o:[["un groupe nominal, COD du verbe « analyse ».",2],["un nom, sujet du verbe « analyse ».",0],["un complément circonstanciel.",0]]},
{cat:'Grammaire',q:"Quelle affirmation est correcte ?",o:[["La nature indique ce qu’est un élément ; la fonction indique la relation qu’il entretient avec un autre élément.",2],["La nature et la fonction sont deux mots pour désigner la même chose.",0],["Seuls les mots isolés ont une fonction.",0]]},
{cat:'Grammaire',q:"Dans « les documents qui composent le dossier », « qui composent le dossier » est…",o:[["une proposition subordonnée relative liée au nom « documents ».",2],["un groupe nominal COD.",0],["une proposition indépendante.",0]]},
{cat:'Académique',q:"Pour nuancer une affirmation, quelle formulation est la plus adaptée ?",o:[["Cette interprétation paraît convaincante, même si elle doit être nuancée par le contexte de production.",2],["C’est vrai, mais bon, pas complètement.",0],["Je ne suis pas trop sûre de cette idée.",0]]},
{cat:'Oral professionnel',q:"Devant le jury, quelle réponse est la plus professionnelle ?",o:[["Je commencerais par identifier les enjeux de la situation avant d’examiner les réponses possibles.",2],["Alors là, je pense que je ferais un truc assez simple.",0],["Je sais pas trop, mais on peut toujours essayer quelque chose.",0]]},
{cat:'Usage',q:"Quelle phrase est correctement accordée ?",o:[["Les analyses que j’ai menées mettent en évidence plusieurs difficultés.",2],["Les analyses que j’ai mené mettent en évidence plusieurs difficultés.",0],["Les analyses que j’ai menée mettent en évidence plusieurs difficultés.",0]]},
{cat:'Méthode',q:"Après une erreur récurrente en français, le réflexe le plus utile est de…",o:[["noter l’erreur, sa correction et une phrase personnelle pour la réutiliser.",2],["relire la correction puis passer définitivement à autre chose.",0],["mémoriser uniquement la règle sans refaire d’exemple.",0]]}
];
let pos=0,answers=Array(questions.length).fill(null);
function saved(){try{return JSON.parse(localStorage.getItem(KEY)||'null')}catch(e){return null}}
function recommend(s){return s<=8?1:s<=14?2:s<=17?3:4}
function name(n){return ['','Niveau 1 · L’essentiel','Niveau 2 · Consolider','Niveau 3 · Concours','Niveau 4 · Approfondir'][n]}
function levelText(n){return ['','Commence par les consignes, le vocabulaire actif et des phrases simples mais justes.','Le socle est présent : travaille l’usage, les interférences et les bases de la grammaire française.','Passe à la formulation académique, à l’oral professionnel et à l’analyse grammaticale de concours.','Ta base est solide : utilise le guide officiel pour gagner en précision sur les points les plus fins.'][n]}
function weakArea(){
 const scores={}; questions.forEach((q,i)=>{scores[q.cat]??={score:0,max:0};scores[q.cat].score+=q.o[answers[i]][1];scores[q.cat].max+=2});
 return Object.entries(scores).sort((a,b)=>(a[1].score/a[1].max)-(b[1].score/b[1].max))[0][0];
}
function show(d){
 const box=$('#frPathStatus'); if(!box)return;
 if(!d){
  box.innerHTML='<span class="eyebrow">POINT DE DÉPART</span><h3>Pas encore déterminé</h3><p>Après 10 questions, le site te conseillera Essentiel, Consolider, Concours ou Approfondir.</p>';
  $('#frDiagReset').hidden=true; $$('[data-fr-level]').forEach(b=>{b.classList.remove('recommended');b.classList.remove('active')}); return;
 }
 box.innerHTML=`<span class="badge badge-red">RECOMMANDATION</span><h3>${name(d.level)}</h3><p>${levelText(d.level)}</p><span class="fr-priority-pill">Priorité repérée : ${d.weakArea}</span><div class="actions"><button class="btn btn-primary" type="button" id="frContinue">Continuer mon parcours</button></div>`;
 $('#frDiagReset').hidden=false;
 $('#frContinue')?.addEventListener('click',()=>openLevel(d.level,true));
 $$('[data-fr-level]').forEach(b=>b.classList.toggle('recommended',+b.dataset.frLevel===d.level));
}
function render(){
 const q=questions[pos];
 $('#frDiagCount').textContent=`Question ${pos+1} / ${questions.length} · ${q.cat}`;
 $('#frDiagBar').style.width=`${Math.round((pos+1)/questions.length*100)}%`;
 $('#frDiagQuestion').textContent=q.q;
 $('#frDiagOptions').innerHTML=q.o.map((x,i)=>`<button class="fr-diag-option ${answers[pos]===i?'selected':''}" type="button" data-i="${i}">${x[0]}</button>`).join('');
 $$('.fr-diag-option').forEach(b=>b.addEventListener('click',()=>{answers[pos]=+b.dataset.i;render()}));
 $('#frDiagPrev').disabled=pos===0;
 $('#frDiagNext').disabled=answers[pos]===null;
 $('#frDiagNext').textContent=pos===questions.length-1?'Voir mon point de départ →':'Suivant →';
}
function start(){pos=0;answers=Array(questions.length).fill(null);$('#frDiag').classList.remove('hidden');render();$('#frDiag').scrollIntoView({behavior:'smooth',block:'center'})}
function finish(){
 let score=0;questions.forEach((q,i)=>score+=q.o[answers[i]][1]);
 const d={version:1,date:new Date().toISOString(),score,max:20,level:recommend(score),weakArea:weakArea()};
 localStorage.setItem(KEY,JSON.stringify(d)); $('#frDiag').classList.add('hidden'); show(d); openLevel(d.level,false);
 document.dispatchEvent(new CustomEvent('billete:francais-diagnostic',{detail:d}));
}
function openLevel(n,scroll=true){
 $$('.fr-level-panel').forEach(p=>p.classList.toggle('active',+p.dataset.frPanel===n));
 $$('[data-fr-level]').forEach(b=>b.classList.toggle('active',+b.dataset.frLevel===n));
 localStorage.setItem('billete-francais-open-level',String(n)); updateValidation();
 if(scroll)document.querySelector(`[data-fr-panel="${n}"]`)?.scrollIntoView({behavior:'smooth',block:'start'});
}
function pdata(){try{return JSON.parse(localStorage.getItem('billete-progress')||'{}')}catch(e){return {}}}
function updateValidation(){
 const d=pdata();
 $$('[data-fr-validation]').forEach(box=>{
  const level=+box.dataset.frValidation,panel=document.querySelector(`[data-fr-panel="${level}"]`),checks=panel?[...panel.querySelectorAll('[data-progress]')]:[],done=checks.filter(c=>d[c.dataset.progress]).length,complete=checks.length>0&&done===checks.length;
  box.classList.toggle('complete',complete);
  box.innerHTML=`<strong>${complete?`✓ Niveau ${level} suffisamment solide`:`Niveau ${level} · ${done}/${checks.length} objectifs validés`}</strong><span>${complete&&level<3?`Tu peux passer au niveau ${level+1}.`:(complete&&level===3?'Le socle de français du concours est suffisamment solide ; approfondis ensuite selon tes erreurs réelles.':'Valide les objectifs au fur et à mesure.')}</span>`;
 });
}
$('#frDiagStart')?.addEventListener('click',start);
$('#frDiagReset')?.addEventListener('click',start);
$('#frDiagPrev')?.addEventListener('click',()=>{if(pos>0){pos--;render()}});
$('#frDiagNext')?.addEventListener('click',()=>{if(answers[pos]===null)return;if(pos<questions.length-1){pos++;render()}else finish()});
$$('[data-fr-level]').forEach(b=>b.addEventListener('click',()=>openLevel(+b.dataset.frLevel,true)));
$$('[data-fr-top]').forEach(b=>b.addEventListener('click',()=>$('#francais-parcours')?.scrollIntoView({behavior:'smooth'})));
document.addEventListener('change',e=>{if(e.target.matches('[data-progress]'))setTimeout(updateValidation,0)});
document.addEventListener('billete:progress',updateValidation);
const prior=saved(); show(prior);
if(prior){openLevel(+(localStorage.getItem('billete-francais-open-level')||prior.level),false)}
else{$$('.fr-level-panel').forEach(p=>p.classList.remove('active'));$$('[data-fr-level]').forEach(b=>b.classList.remove('active'))}
updateValidation();
})();