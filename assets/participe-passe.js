(function(){
const $=s=>document.querySelector(s);
const KEY='billete-participe-passe-v1';
const qs=[
 {q:"Elle est ___ en voiture.",o:["parti","partie","partis"],a:1,e:"Auxiliaire être : accord avec le sujet « elle » → partie."},
 {q:"Ils sont ___ au combat.",o:["mort","morts","mortes"],a:1,e:"Auxiliaire être : accord avec le sujet masculin pluriel « ils » → morts."},
 {q:"Ces voitures, ils les ont ___.",o:["conduit","conduites","conduits"],a:1,e:"Avec avoir, le COD « les » reprend « ces voitures » et est placé avant → conduites."},
 {q:"Ils ont ___ ces voitures.",o:["conduit","conduites","conduits"],a:0,e:"Avec avoir, le COD est placé après le verbe → participe passé invariable : conduit."},
 {q:"Des solutions auxquelles j’ai ___.",o:["pensé","pensées","pensés"],a:0,e:"« Penser à » introduit un COI. Avec un COI, pas d’accord → pensé."},
 {q:"Ils se sont ___ dans la glace.",o:["vu","vus","vues"],a:1,e:"Ici « se » est COD : ils ont vu qui ? eux-mêmes → vus."},
 {q:"Elles se sont ___ de tout cela.",o:["souvenu","souvenues","souvenus"],a:1,e:"Avec « se souvenir », le participe s’accorde avec le sujet → souvenues."},
 {q:"Elle s’est ___ les mains.",o:["lavée","lavé","lavés"],a:1,e:"Le COD « les mains » est placé après. « se » est COI → lavé, invariable."},
 {q:"Les lettres que j’ai ___ hier sont sur la table.",o:["écrit","écrites","écrits"],a:1,e:"Le COD « que » reprend « les lettres » et est placé avant → écrites."},
 {q:"Les étudiants se sont ___ pendant l’exercice.",o:["aidé","aidés","aidées"],a:1,e:"Ils ont aidé qui ? eux-mêmes : « se » est COD → aidés."}
];
let i=0,score=0,answered=false;
function save(done=false){localStorage.setItem(KEY,JSON.stringify({date:new Date().toISOString(),score,total:qs.length,done}))}
function render(){
 const q=qs[i];answered=false;
 $('#ppCounter').textContent=`Question ${i+1} / ${qs.length}`;
 $('#ppQuestion').textContent=q.q;
 $('#ppFeedback').hidden=true;$('#ppNext').hidden=true;
 $('#ppOptions').innerHTML=q.o.map((x,j)=>`<button class="pp-option" type="button" data-i="${j}">${x}</button>`).join('');
 document.querySelectorAll('.pp-option').forEach(b=>b.addEventListener('click',()=>answer(+b.dataset.i)));
}
function answer(j){
 if(answered)return;answered=true;
 const q=qs[i];
 document.querySelectorAll('.pp-option').forEach((b,k)=>{b.disabled=true;if(k===q.a)b.classList.add('correct');else if(k===j)b.classList.add('wrong')});
 if(j===q.a)score++;
 $('#ppFeedback').hidden=false;
 $('#ppFeedback').innerHTML=`<strong>${j===q.a?'Bonne réponse.':'À revoir.'}</strong> ${q.e}`;
 $('#ppNext').hidden=false;
 save(false);
}
function finish(){
 const ok=score>=8;
 $('#ppExercise').innerHTML=`<span class="eyebrow">RÉSULTAT</span><h3>${score} / ${qs.length}</h3><p>${ok?'Le mécanisme est suffisamment solide.':'Refais le module après avoir revu la vidéo et la fiche mémo.'}</p><button class="btn btn-secondary" type="button" id="ppRestart">Refaire l’entraînement</button>`;
 if(ok){
   $('#ppComplete').hidden=false;
   const p=(()=>{try{return JSON.parse(localStorage.getItem('billete-progress')||'{}')}catch(e){return {}}})();
   p['fr-pp-1']=true;
   localStorage.setItem('billete-progress',JSON.stringify(p));
   document.dispatchEvent(new CustomEvent('billete:progress'));
 }
 save(ok);
 $('#ppRestart')?.addEventListener('click',()=>location.reload());
}
$('#ppNext')?.addEventListener('click',()=>{if(i<qs.length-1){i++;render()}else finish()});
if($('#ppExercise'))render();
})();