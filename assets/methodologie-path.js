(function(){
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],KEY='billete-methodologie-diagnostic-v1';
const questions=[
{cat:'Consigne',q:"Le sujet sépare une analyse du document 1 et un commentaire des documents 2 et 3. Ton premier réflexe est de…",o:[["respecter cette séparation et définir le geste attendu dans chaque partie.",2],["chercher un plan unique qui intègre les trois documents.",0],["commencer par rédiger une introduction générale sur le thème.",0]]},
{cat:'Consigne',q:"Pourquoi souligner les verbes de la consigne ?",o:[["Parce qu’ils indiquent ce qu’il faut produire : analyser, commenter, confronter, expliquer…",2],["Parce qu’ils donnent automatiquement le nombre de parties.",0],["Parce qu’ils permettent de repérer les mots difficiles.",0]]},

{cat:'Contextualisation',q:"Quelle contextualisation est la plus utile ?",o:[["Situer précisément le document dans le moment historique ou dans l’œuvre, puis montrer pourquoi cela éclaire ce passage.",2],["Raconter toute la Transition avant de présenter le document.",0],["Donner auteur, titre et date sans expliquer leur intérêt.",1]]},
{cat:'Contextualisation',q:"Un élément de contexte doit être conservé dans l’introduction s’il…",o:[["aide à comprendre l’enjeu précis du document ou du dossier.",2],["figure dans le cours et peut montrer les connaissances du candidat.",0],["est antérieur chronologiquement au document.",0]]},

{cat:'Problématique',q:"Quelle problématique est la plus utile ?",o:[["Comment la pluralité des points de vue révèle-t-elle à la fois l’imminence du changement politique et la persistance des hiérarchies sociales ?",2],["La société espagnole à la fin du franquisme.",0],["¿En qué medida La caída de Madrid habla de la Transición?",1]]},
{cat:'Problématique',q:"Une bonne problématique permet surtout de…",o:[["faire apparaître une tension que le plan devra progressivement expliquer.",2],["transformer le sujet en question avec un point d’interrogation.",0],["annoncer les trois thèmes que l’on connaît le mieux.",0]]},

{cat:'Plan',q:"Quel plan est le plus problématisé ?",o:[["I. Une société qui anticipe la rupture · II. Des rapports de force qui structurent cette attente · III. Un changement politique traversé par des continuités.",2],["I. Pour la Transition · II. Contre la Transition · III. Mon avis.",0],["I. Document 1 · II. Document 2 · III. Document 3.",0]]},
{cat:'Plan',q:"À quoi sert une sous-partie ?",o:[["À démontrer une étape précise de l’argument à partir d’éléments du dossier.",2],["À placer une connaissance de cours ou une citation.",0],["À résumer un document avant de passer au suivant.",0]]},

{cat:'Analyse',q:"Quelle phrase relève le mieux de l’analyse ?",o:[["La focalisation sur les perceptions matérielles du personnage transforme l’espace social en expérience sensible de la différence de classe.",2],["Le passage utilise une focalisation et plusieurs descriptions.",1],["Le personnage voit un appartement différent du sien.",0]]},
{cat:'Analyse',q:"Que doit faire une connaissance historique dans un paragraphe ?",o:[["éclairer un détail ou une tension du document que l’on est en train d’analyser.",2],["prouver que le cours a été appris, même si le document ne l’exige pas.",0],["ouvrir systématiquement le paragraphe avant la citation.",0]]},

{cat:'Rédaction',q:"Une citation efficace est…",o:[["courte, exacte, intégrée à la phrase et immédiatement commentée.",2],["longue pour éviter de déformer le document.",0],["placée seule entre guillemets après l’argument.",1]]},
{cat:'Rédaction',q:"La meilleure relecture finale consiste à…",o:[["faire plusieurs passages ciblés : consigne/structure, langue, accents et accords, noms propres et citations.",2],["relire rapidement depuis le début en espérant voir toutes les erreurs.",0],["corriger uniquement l’orthographe des mots soulignés.",0]]}
];
let pos=0,answers=Array(questions.length).fill(null);

function saved(){try{return JSON.parse(localStorage.getItem(KEY)||'null')}catch(e){return null}}
function recommend(s){return s<=10?1:s<=17?2:s<=21?3:4}
function name(n){return ['','Niveau 1 · L’essentiel','Niveau 2 · Consolider','Niveau 3 · Concours','Niveau 4 · Approfondir'][n]}
function levelText(n){return ['','Commence par la consigne, la lecture du dossier et la contextualisation utile.','Le socle est présent : travaille problématique, plan, confrontation et mobilisation des connaissances.','Passe à la rédaction analytique et au vrai sujet 2026 en conditions concours.','Ta base est solide : améliore gestion du temps, précision, citations et relecture.'][n]}
function weakArea(){
 const scores={};questions.forEach((q,i)=>{scores[q.cat]??={score:0,max:0};scores[q.cat].score+=q.o[answers[i]][1];scores[q.cat].max+=2});
 return Object.entries(scores).sort((a,b)=>(a[1].score/a[1].max)-(b[1].score/b[1].max))[0][0];
}
function show(d){
 const box=$('#methPathStatus');if(!box)return;
 if(!d){
  box.innerHTML='<span class="eyebrow">POINT DE DÉPART</span><h3>Pas encore déterminé</h3><p>Après 12 questions, le site te conseillera Essentiel, Consolider, Concours ou Approfondir et indiquera la priorité à travailler.</p>';
  $('#methDiagReset').hidden=true;$$('[data-meth-level]').forEach(b=>{b.classList.remove('recommended');b.classList.remove('active')});return;
 }
 box.innerHTML=`<span class="badge badge-red">RECOMMANDATION</span><h3>${name(d.level)}</h3><p>${levelText(d.level)}</p><span class="meth-priority-pill">Priorité repérée : ${d.weakArea}</span><div class="actions"><button class="btn btn-primary" type="button" id="methContinue">Continuer mon parcours</button></div>`;
 $('#methDiagReset').hidden=false;$('#methContinue')?.addEventListener('click',()=>openLevel(d.level,true));$$('[data-meth-level]').forEach(b=>b.classList.toggle('recommended',+b.dataset.methLevel===d.level));
}
function render(){
 const q=questions[pos];
 $('#methDiagCount').textContent=`Question ${pos+1} / ${questions.length} · ${q.cat}`;
 $('#methDiagBar').style.width=`${Math.round((pos+1)/questions.length*100)}%`;
 $('#methDiagQuestion').textContent=q.q;
 $('#methDiagOptions').innerHTML=q.o.map((x,i)=>`<button class="meth-diag-option ${answers[pos]===i?'selected':''}" type="button" data-i="${i}">${x[0]}</button>`).join('');
 $$('.meth-diag-option').forEach(b=>b.addEventListener('click',()=>{answers[pos]=+b.dataset.i;render()}));
 $('#methDiagPrev').disabled=pos===0;$('#methDiagNext').disabled=answers[pos]===null;$('#methDiagNext').textContent=pos===questions.length-1?'Voir mon point de départ →':'Suivant →';
}
function start(){pos=0;answers=Array(questions.length).fill(null);$('#methDiag').classList.remove('hidden');render();$('#methDiag').scrollIntoView({behavior:'smooth',block:'center'})}
function finish(){
 let score=0;questions.forEach((q,i)=>score+=q.o[answers[i]][1]);
 const d={version:1,date:new Date().toISOString(),score,max:24,level:recommend(score),weakArea:weakArea()};
 localStorage.setItem(KEY,JSON.stringify(d));$('#methDiag').classList.add('hidden');show(d);openLevel(d.level,false);
 document.dispatchEvent(new CustomEvent('billete:methodologie-diagnostic',{detail:d}));
}
function openLevel(n,scroll=true){
 $$('.meth-level-panel').forEach(p=>p.classList.toggle('active',+p.dataset.methPanel===n));
 $$('[data-meth-level]').forEach(b=>b.classList.toggle('active',+b.dataset.methLevel===n));
 localStorage.setItem('billete-methodologie-open-level',String(n));updateValidation();
 if(scroll)document.querySelector(`[data-meth-panel="${n}"]`)?.scrollIntoView({behavior:'smooth',block:'start'});
}
function pdata(){try{return JSON.parse(localStorage.getItem('billete-progress')||'{}')}catch(e){return {}}}
function updateValidation(){
 const d=pdata();
 $$('[data-meth-validation]').forEach(box=>{
  const level=+box.dataset.methValidation,panel=document.querySelector(`[data-meth-panel="${level}"]`),checks=panel?[...panel.querySelectorAll('[data-progress]')]:[],done=checks.filter(c=>d[c.dataset.progress]).length,complete=checks.length>0&&done===checks.length;
  box.classList.toggle('complete',complete);
  box.innerHTML=`<strong>${complete?`✓ Niveau ${level} suffisamment solide`:`Niveau ${level} · ${done}/${checks.length} objectifs validés`}</strong><span>${complete&&level<4?`Tu peux passer au niveau ${level+1}.`:(complete?'Approfondissement validé.':'Valide les objectifs au fur et à mesure.')}</span>`;
 });
}

const labs={
 consigne:{q:"Le sujet demande une analyse du texte 1 puis un commentaire des documents 2 et 3. Que fais-tu ?",o:["Je construis une dissertation unique sur les trois documents.","Je traite deux tâches distinctes et j’adapte ma méthode à chacune.","Je commence par présenter les trois documents ensemble."],a:1,e:"La structure de la copie vient de la consigne réelle, pas d’un moule."},
 problematique:{q:"Laquelle ferait le mieux travailler un dossier sur changement politique et continuités sociales ?",o:["¿En qué medida España cambia después de Franco?","¿Cómo la ruptura política anunciada revela también la persistencia de jerarquías, intereses y memorias?","La Transición española entre 1975 y 1982."],a:1,e:"La deuxième formulation fait apparaître une tension à expliquer et prépare une progression de raisonnement."},
 plan:{q:"Quel principe de plan est le plus solide ?",o:["Une partie par document.","Pour / contre / synthèse.","Chaque partie répond à une étape différente de la problématique et confronte les documents utiles."],a:2,e:"Un plan analytique fait progresser la réponse ; il n’est ni documentaire ni binaire."},
 analyse:{q:"Après une citation, que faut-il écrire ?",o:["Une autre citation pour confirmer.","Ce que le détail montre, comment il fonctionne et pourquoi il compte pour l’argument.","Une connaissance historique générale."],a:1,e:"La preuve n’est jamais l’analyse : il faut expliciter son fonctionnement et sa portée."}
};
Object.entries(labs).forEach(([key,x])=>{
 const root=document.querySelector(`[data-meth-lab="${key}"]`);if(!root)return;
 const q=root.querySelector('.meth-lab-q'),opts=root.querySelector('.meth-lab-options'),fb=root.querySelector('.meth-lab-feedback');
 q.textContent=x.q;opts.innerHTML=x.o.map((t,i)=>`<button class="meth-lab-option" type="button" data-i="${i}">${t}</button>`).join('');
 opts.querySelectorAll('button').forEach(b=>b.onclick=()=>{
  opts.querySelectorAll('button').forEach((bb,i)=>{bb.disabled=true;if(i===x.a)bb.classList.add('correct');else if(i===+b.dataset.i)bb.classList.add('wrong')});
  fb.hidden=false;fb.innerHTML=`<strong>${+b.dataset.i===x.a?'Bonne décision.':'À corriger.'}</strong> ${x.e}`;
 });
});

$('#methDiagStart')?.addEventListener('click',start);$('#methDiagReset')?.addEventListener('click',start);
$('#methDiagPrev')?.addEventListener('click',()=>{if(pos>0){pos--;render()}});
$('#methDiagNext')?.addEventListener('click',()=>{if(answers[pos]===null)return;if(pos<questions.length-1){pos++;render()}else finish()});
$$('[data-meth-level]').forEach(b=>b.addEventListener('click',()=>openLevel(+b.dataset.methLevel,true)));
$$('[data-meth-top]').forEach(b=>b.addEventListener('click',()=>$('#methodologie-parcours')?.scrollIntoView({behavior:'smooth'})));
document.addEventListener('change',e=>{if(e.target.matches('[data-progress]'))setTimeout(updateValidation,0)});
document.addEventListener('billete:progress',updateValidation);

const prior=saved();show(prior);
if(prior){openLevel(+(localStorage.getItem('billete-methodologie-open-level')||prior.level),false)}
else{$$('.meth-level-panel').forEach(p=>p.classList.remove('active'));$$('[data-meth-level]').forEach(b=>b.classList.remove('active'))}
updateValidation();
})();