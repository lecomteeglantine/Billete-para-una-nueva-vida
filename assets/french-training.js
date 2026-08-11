(function(){
  const ERROR_KEY='billete-french-errors-v1';
  const DAY=24*60*60*1000;
  const $=id=>document.getElementById(id);
  function readErrors(){
    try{return JSON.parse(localStorage.getItem(ERROR_KEY)||'[]')}catch(e){return []}
  }
  function writeErrors(rows){localStorage.setItem(ERROR_KEY,JSON.stringify(rows));updateBadges();}
  function makeId(x){return String(x||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'').slice(0,80)}
  function addError(item){
    const now=Date.now(), rows=readErrors();
    const id=item.id || makeId(`${item.source||'fr'}-${item.prompt||item.question||''}`);
    const i=rows.findIndex(x=>x.id===id);
    const next={id,source:item.source||'Français',type:item.type||'À revoir',prompt:item.prompt||item.question||'',answer:item.answer||'',note:item.note||'',count:1,created:now,updated:now,due:now};
    if(i>=0){rows[i]={...rows[i],...next,count:(rows[i].count||1)+1,created:rows[i].created||now,due:Math.min(rows[i].due||now,now)};}
    else rows.unshift(next);
    writeErrors(rows); if(window.toast) toast('Ajouté à « Mes erreurs ».');
  }
  function removeError(id){writeErrors(readErrors().filter(x=>x.id!==id));}
  function reviewError(id,rating){
    const rows=readErrors(), i=rows.findIndex(x=>x.id===id); if(i<0)return;
    if(rating==='mastered'){rows.splice(i,1);writeErrors(rows);return;}
    const wait=rating==='hard'?DAY:3*DAY;
    rows[i].due=Date.now()+wait; rows[i].updated=Date.now(); writeErrors(rows);
  }
  function dueErrors(){const now=Date.now();return readErrors().filter(x=>(x.due||0)<=now)}
  function updateBadges(){
    const n=dueErrors().length;
    document.querySelectorAll('[data-error-count]').forEach(el=>el.textContent=n);
  }
  window.BilleteFrench={readErrors,addError,removeError,reviewError,dueErrors,updateBadges,DAY};

  const FRENCH_QCM=[
    {cat:'Prépositions',q:'Complète : « Cette analyse dépend ___ contexte historique. »',o:['du','au','sur le','avec le'],a:0,e:'On dit « dépendre de quelque chose » : dépend du contexte.'},
    {cat:'Prépositions',q:'Complète : « Les élèves participent ___ activité proposée. »',o:['de l’','à l’','avec l’','pour l’'],a:1,e:'Le verbe « participer » se construit avec « à ».'},
    {cat:'Prépositions',q:'Complète : « Ce document permet ___ comprendre l’enjeu mémoriel. »',o:['à','de','pour','—'],a:1,e:'La construction standard est « permettre de + infinitif ».'},
    {cat:'Genre',q:'Choisis la forme correcte.',o:['un analyse pertinente','une analyse pertinente','une analyse pertinant','un analyse pertinant'],a:1,e:'« analyse » est féminin : une analyse pertinente.'},
    {cat:'Genre',q:'Choisis la forme correcte.',o:['la problème principal','le problème principal','le problème principale','la problème principale'],a:1,e:'« problème » est masculin malgré sa terminaison.'},
    {cat:'Accords',q:'Complète : « Les deux hypothèses qu’elle a ___ sont convaincantes. »',o:['formulé','formulée','formulés','formulées'],a:3,e:'Avec avoir, le participe passé s’accorde avec le COD placé avant : « les hypothèses qu’elle a formulées ».'},
    {cat:'Accords',q:'Complète : « Une série de documents ___ présentée au candidat. »',o:['sont','est','étaient','ont'],a:1,e:'Le noyau du groupe sujet est « série », singulier.'},
    {cat:'Déterminants',q:'Quelle formulation est la plus naturelle ?',o:['La mémoire de la Transition reste un enjeu.','Mémoire de Transition reste un enjeu.','Une mémoire de la Transition reste l’enjeu.','La mémoire du Transition reste un enjeu.'],a:0,e:'Le français emploie ici les déterminants : « la mémoire de la Transition ».'},
    {cat:'Pronoms',q:'Complète : « Le jury pose une question ; Jennifer ___ répond précisément. »',o:['la','lui','y','en'],a:1,e:'« répondre à quelqu’un » → pronom COI « lui ».'},
    {cat:'Pronoms',q:'Complète : « Cette question, Jennifer ___ a déjà réfléchi. »',o:['la','lui','y','en'],a:2,e:'« réfléchir à quelque chose » → « y réfléchir ».'},
    {cat:'Relatifs',q:'Complète : « Le rapport ___ je parle insiste sur la précision terminologique. »',o:['que','qui','dont','où'],a:2,e:'« parler de quelque chose » → le pronom relatif « dont ».'},
    {cat:'Relatifs',q:'Complète : « La candidate ___ répond maintenant maîtrise son dossier. »',o:['que','qui','dont','où'],a:1,e:'Le pronom relatif est sujet du verbe « répond » : « qui ».'},
    {cat:'Subordination',q:'Quelle phrase est correcte ?',o:['Bien qu’elle est stressée, elle répond clairement.','Bien qu’elle soit stressée, elle répond clairement.','Bien qu’elle sera stressée, elle répond clairement.','Malgré qu’elle soit stressée, elle répond clairement.'],a:1,e:'« bien que » se construit avec le subjonctif.'},
    {cat:'Subordination',q:'Complète : « Il faut que Jennifer ___ précisément le document. »',o:['analyse','analysait','analysera','analyser'],a:0,e:'Après « il faut que », on emploie le subjonctif : « qu’elle analyse ».'},
    {cat:'Connecteurs',q:'Quel connecteur introduit le mieux une concession ?',o:['En effet','Certes','Par conséquent','D’abord'],a:1,e:'« Certes » permet de concéder un point avant de le nuancer, souvent avec « mais ».'},
    {cat:'Connecteurs',q:'Quel connecteur marque une conséquence ?',o:['Dès lors','Cependant','En revanche','Or'],a:0,e:'« Dès lors » introduit une conséquence ou un résultat logique.'},
    {cat:'Construction',q:'Choisis la formulation correcte.',o:['Cette question permet à comprendre le contexte.','Cette question permet de comprendre le contexte.','Cette question permet comprendre le contexte.','Cette question permet pour comprendre le contexte.'],a:1,e:'« permettre de + infinitif ».'},
    {cat:'Construction',q:'Choisis la formulation correcte.',o:['Elle insiste dans la nécessité de contextualiser.','Elle insiste sur la nécessité de contextualiser.','Elle insiste à la nécessité de contextualiser.','Elle insiste de la nécessité de contextualiser.'],a:1,e:'On dit « insister sur quelque chose ».'},
    {cat:'Faux amis',q:'« Actualmente » se traduit ici par…',o:['actuellement','éventuellement','en réalité','finalement'],a:0,e:'« actualmente » = actuellement ; « éventuellement » = posiblemente / en su caso selon le contexte.'},
    {cat:'Faux amis',q:'Dans « asistir a una conferencia », le verbe espagnol se traduit par…',o:['assister quelqu’un','assister à une conférence','aider une conférence','présenter une conférence'],a:1,e:'En français, « assister à » signifie être présent ; « assister quelqu’un » signifie l’aider.'},
    {cat:'Registre',q:'Quelle formulation convient le mieux dans une copie ?',o:['Le texte dit que la société change.','Le texte parle d’un truc important.','Le texte met en évidence une transformation sociale.','Le texte raconte que tout change beaucoup.'],a:2,e:'« met en évidence » est précis et académique sans être artificiellement compliqué.'},
    {cat:'Registre',q:'Quelle formulation est la plus précise ?',o:['On voit que…','Il y a comme une opposition.','L’extrait fait apparaître une opposition entre…','C’est un peu contradictoire.'],a:2,e:'Il faut nommer précisément le phénomène observé.'},
    {cat:'Ponctuation',q:'Quelle phrase est correctement ponctuée ?',o:['Cependant le document 2, nuance cette lecture.','Cependant, le document 2 nuance cette lecture.','Cependant le document 2 nuance, cette lecture.','Cependant; le document 2 nuance cette lecture.'],a:1,e:'Un connecteur détaché en tête de phrase est généralement suivi d’une virgule.'},
    {cat:'Adjectifs',q:'Quelle formulation est la plus naturelle ?',o:['une politique décision importante','une importante décision politique','une décision politique importante','une décision importante politique'],a:2,e:'« politique » classifie le nom et se place normalement après ; « importante » se place ici naturellement après l’ensemble.'}
  ];

  const SAY_IT=[
    {p:'Évite « Ce document parle de la Transition ». Formule une phrase plus académique.',a:'Ce document met en évidence les tensions qui accompagnent la Transition démocratique.',n:'On peut aussi dire : « Le document interroge… », « L’auteur met en lumière… ».'},
    {p:'Reformule : « On voit que les deux documents ne sont pas d’accord. »',a:'La confrontation des deux documents fait apparaître des interprétations divergentes.',n:'Nommer la relation entre les documents est plus précis que « on voit ».'},
    {p:'Introduis une citation sans écrire « l’auteur dit ».',a:'L’auteur souligne cette rupture lorsqu’il affirme que…',n:'Autres verbes utiles : observe, insiste sur, dénonce, suggère, reconnaît, affirme.'},
    {p:'Nuance une affirmation trop absolue : « La Transition rompt totalement avec le franquisme. »',a:'Si la Transition marque une rupture institutionnelle décisive, elle s’accompagne néanmoins de plusieurs continuités politiques et sociales.',n:'Le couple « si… néanmoins… » permet une concession structurée.'},
    {p:'Annonce une problématique à partir de l’idée : mémoire / oubli / démocratisation.',a:'On peut dès lors se demander comment la démocratisation espagnole s’est construite entre nécessité de rupture et gestion conflictuelle du passé.',n:'Une problématique doit faire apparaître une tension, pas seulement un thème.'},
    {p:'Remplace « c’est important parce que » par une formulation de concours.',a:'Cet élément est déterminant dans la mesure où il permet de comprendre…',n:'Évite cependant d’accumuler des formules figées si une phrase simple suffit.'},
    {p:'Compare deux documents sans écrire « le document 1 dit…, le document 2 dit… ».',a:'Alors que le premier document insiste sur la rupture, le second met davantage l’accent sur les continuités.',n:'La comparaison doit apparaître dans la syntaxe.'},
    {p:'Exprime une limite : ton interprétation est plausible mais pas certaine.',a:'Cette lecture semble plausible, mais elle doit être nuancée au regard du troisième document.',n:'« semble », « suggère », « peut être interprété comme » permettent de doser l’affirmation.'},
    {p:'Présente une conséquence logique.',a:'Dès lors, la question de la légitimité politique devient centrale.',n:'Autres possibilités : « par conséquent », « de ce fait », selon le registre.'},
    {p:'Conclue une sous-partie sans écrire « donc voilà ».',a:'Ainsi, ces éléments montrent que la rupture démocratique ne peut être dissociée des continuités héritées du régime précédent.',n:'La phrase doit synthétiser le raisonnement et préparer la suite.'},
    {p:'Réponds au jury si tu dois corriger une erreur que tu viens de faire.',a:'Vous avez raison : ma première formulation était imprécise. Je la corrigerais ainsi…',n:'Reconnaître précisément une erreur vaut mieux que la défendre à tout prix.'},
    {p:'Exprime un désaccord professionnel sans agressivité.',a:'Je nuancerais cette interprétation, car le document permet également de considérer que…',n:'Le désaccord doit rester argumenté et centré sur les faits.'}
  ];

  const TRANSLATION={
    version:[
      {p:'La memoria de la Transición sigue siendo objeto de debates intensos en la sociedad española.',a:'La mémoire de la Transition continue de faire l’objet de débats intenses dans la société espagnole.',n:'Attention à « seguir + gérondif » : selon le contexte, « continuer de/à » est souvent plus idiomatique que le calque.'},
      {p:'Los jóvenes tardan cada vez más en acceder a una vivienda independiente.',a:'Les jeunes mettent de plus en plus de temps à accéder à un logement indépendant.',n:'Éviter le calque *tarder à*. « Tardar en + infinitif » se rend souvent par « mettre du temps à ».'},
      {p:'El documento pone de relieve las desigualdades que persisten entre generaciones.',a:'Le document met en évidence les inégalités qui persistent entre les générations.',n:'« poner de relieve » → « mettre en évidence / en lumière ».'},
      {p:'Aunque el cambio político fue profundo, ciertas estructuras sociales permanecieron intactas.',a:'Bien que le changement politique ait été profond, certaines structures sociales sont restées intactes.',n:'« bien que » + subjonctif. Attention aussi au choix du temps en français.'},
      {p:'A medida que avanza el relato, el lector descubre la fragilidad de los personajes.',a:'À mesure que le récit progresse, le lecteur découvre la fragilité des personnages.',n:'« a medida que » → « à mesure que ».'},
      {p:'La autora cuestiona la idea según la cual una generación transmite pasivamente sus valores a la siguiente.',a:'L’autrice remet en question l’idée selon laquelle une génération transmet passivement ses valeurs à la suivante.',n:'« cuestionar » → selon le contexte « remettre en question », pas nécessairement « questionner ».'},
      {p:'No se trata de negar la ruptura, sino de analizar sus límites.',a:'Il ne s’agit pas de nier la rupture, mais d’en analyser les limites.',n:'Construction très utile : « il ne s’agit pas de…, mais de… ». Le pronom « en » évite la répétition.'},
      {p:'Cuanto más precisa sea la contextualización, más convincente resultará el análisis.',a:'Plus la contextualisation sera précise, plus l’analyse sera convaincante.',n:'Construction corrélative : « plus…, plus… ».'}
    ],
    theme:[
      {p:'Le jury attend une analyse précise qui s’appuie sur les documents.',a:'El tribunal espera un análisis preciso que se apoye en los documentos.',n:'« s’appuyer sur » → « apoyarse en ».'},
      {p:'Il convient de distinguer le contexte représenté du contexte de production.',a:'Conviene distinguir el contexto representado del contexto de producción.',n:'« il convient de » → « conviene ».'},
      {p:'Bien que cette interprétation soit séduisante, elle ne rend pas compte de l’ensemble du dossier.',a:'Aunque esta interpretación resulte atractiva, no da cuenta del conjunto del dosier.',n:'« bien que » peut se rendre par « aunque » + subjonctif lorsque le fait est présenté comme concession.'},
      {p:'La candidate a su nuancer sa réponse sans renoncer à son argument principal.',a:'La candidata supo matizar su respuesta sin renunciar a su argumento principal.',n:'« savoir + infinitif » au passé peut rendre la capacité effectivement mise en œuvre : « supo ».'},
      {p:'Ces continuités ne doivent pas être confondues avec une absence de changement.',a:'Estas continuidades no deben confundirse con una ausencia de cambio.',n:'Passif pronominal espagnol très naturel ici.'},
      {p:'Le texte fait apparaître une tension entre mémoire individuelle et récit collectif.',a:'El texto pone de manifiesto una tensión entre memoria individual y relato colectivo.',n:'« faire apparaître / mettre en évidence » → « poner de manifiesto / de relieve ».'},
      {p:'La transmission n’implique pas nécessairement la reproduction à l’identique.',a:'La transmisión no implica necesariamente una reproducción idéntica.',n:'Attention au choix nominal et à l’adverbe « necesariamente ».'},
      {p:'On peut dès lors se demander dans quelle mesure cette rupture transforme réellement les rapports sociaux.',a:'Cabe preguntarse entonces en qué medida esta ruptura transforma realmente las relaciones sociales.',n:'« on peut se demander » → « cabe preguntarse » est très idiomatique en espagnol académique.'}
    ],
    rep:[
      {q:'Dans « Los jóvenes tardan cada vez más en acceder… », quelle difficulté faut-il repérer avant de traduire ?',o:['Le genre de jóvenes','La construction tardar en + infinitif','Un subjonctif obligatoire','Une proposition relative'],a:1,e:'Le danger est le calque : « tardar en » se rend souvent par « mettre du temps à ».'},
      {q:'Dans « Aunque el cambio fue profundo… », quel point doit guider la traduction française ?',o:['La place de l’adjectif','La concession et le mode verbal','Le pronom relatif','La voix passive'],a:1,e:'« aunque » introduit ici une concession ; en français « bien que » appelle le subjonctif.'},
      {q:'Dans « No se trata de negar…, sino de analizar… », quelle structure française est la plus naturelle ?',o:['Il ne traite pas de… sinon de…','Il ne s’agit pas de…, mais de…','Ce n’est pas question de…','Il s’agit de ne pas…'],a:1,e:'La structure française consacrée est « il ne s’agit pas de…, mais de… ».'},
      {q:'Dans « La autora cuestiona la idea… », quel faux ami potentiel faut-il surveiller ?',o:['autora','idea','cuestiona','según'],a:2,e:'« cuestionar » n’est pas toujours « questionner » ; « remettre en question » est souvent plus juste.'},
      {q:'Dans « Plus la contextualisation sera précise… », quel mécanisme faut-il reconnaître avant le thème ?',o:['Une relative','Une corrélation comparative','Une interrogation indirecte','Une voix passive'],a:1,e:'Le français « plus…, plus… » appelle une structure corrélative en espagnol : « cuanto más…, más… ».'},
      {q:'« Le jury attend une analyse qui s’appuie sur les documents » : quelle construction espagnole correspond à « s’appuyer sur » ?',o:['apoyar a','apoyarse en','depender a','basar de'],a:1,e:'« apoyarse en » ou « basarse en » selon la phrase.'}
    ],
    facts:[
      {q:'Dans « Je crois qu’elle réussira », quelle est la nature et la fonction de « qu’elle réussira » ?',o:['Relative, épithète','Complétive conjonctive, COD','Circonstancielle, cause','Interrogative totale, COD'],a:1,e:'La subordonnée est introduite par « que » et équivaut à « je crois cela » : complétive COD.'},
      {q:'Dans « La candidate qui parle maîtrise son sujet », quelle est la fonction de « qui » dans la subordonnée ?',o:['COD','COI','Sujet','Complément du nom'],a:2,e:'« qui » est sujet du verbe « parle ».'},
      {q:'Dans « Le rapport dont je parle », quelle est la fonction de « dont » dans la relative ?',o:['Sujet','COD','COI','Attribut'],a:2,e:'« parler de quelque chose » : « dont » reprend un complément introduit par « de ».'},
      {q:'Dans « Bien qu’elle soit stressée, elle répond clairement », quelle est la fonction de la subordonnée ?',o:['COD','Sujet','Complément circonstanciel de concession','Épithète'],a:2,e:'Une subordonnée circonstancielle de concession a fonction de complément circonstanciel.'},
      {q:'Dans « La crainte qu’elle échoue disparaît », quelle est la fonction de « qu’elle échoue » ?',o:['COD','Complément du nom','Sujet','Apposition'],a:1,e:'La subordonnée dépend du nom « crainte » : complément du nom.'},
      {q:'Dans « J’entends Jennifer répéter son introduction », comment analyser « Jennifer répéter son introduction » ?',o:['Groupe infinitif sujet','Proposition subordonnée infinitive COD','Relative substantive COD','Complétive sujet'],a:1,e:'L’infinitif possède un sujet propre, distinct du sujet de la principale ; l’ensemble est COD de « entends ».'}
    ]
  };

  function renderQcm(boxId,buttonId,nextId,data,source){
    const box=$(boxId), check=$(buttonId), next=$(nextId); if(!box||!check||!next)return;
    let current=null, idx=-1;
    function draw(){idx=(idx+1)%data.length;current=data[idx];box.innerHTML=`<span class="badge">${current.cat||source}</span><h3>${current.q}</h3><div class="option-grid">${current.o.map((x,i)=>`<button class="option ft-option" data-i="${i}">${x}</button>`).join('')}</div><div class="ft-feedback" aria-live="polite"></div>`;check.hidden=true;next.hidden=true;box.querySelectorAll('.ft-option').forEach(b=>b.onclick=()=>answer(Number(b.dataset.i)));}
    function answer(i){const ok=i===current.a;box.querySelectorAll('.ft-option').forEach((b,j)=>{b.disabled=true;if(j===current.a)b.classList.add('correct');else if(j===i)b.classList.add('wrong')});box.querySelector('.ft-feedback').innerHTML=`<div class="feedback ${ok?'ok':'no'}"><strong>${ok?'Exact.':'À revoir.'}</strong> ${current.e}</div>`;if(!ok)addError({source,type:current.cat||source,prompt:current.q,answer:current.o[current.a],note:current.e,id:`${source}-${idx}`});next.hidden=false;}
    next.onclick=draw; draw();
  }

  function renderProduction(boxId,nextId,data,source){
    const box=$(boxId), next=$(nextId); if(!box||!next)return; let idx=-1,current=null;
    function draw(){idx=(idx+1)%data.length;current=data[idx];box.innerHTML=`<span class="badge badge-green">${source}</span><h3>${current.p}</h3><textarea class="ft-textarea" rows="3" placeholder="Écris ou dis ta proposition avant d’afficher le modèle…"></textarea><div class="actions"><button class="btn btn-primary ft-reveal">Afficher une proposition</button></div><div class="ft-model" hidden><div class="callout"><strong>Proposition :</strong> ${current.a}<br><small>${current.n||''}</small></div><div class="recall-ratings"><button class="btn btn-secondary" data-rate="good">✓ Ça va</button><button class="btn btn-secondary" data-rate="almost">~ Presque</button><button class="btn btn-secondary" data-rate="again">↻ À revoir</button></div></div>`;next.hidden=true;box.querySelector('.ft-reveal').onclick=()=>{box.querySelector('.ft-model').hidden=false;box.querySelector('.ft-reveal').disabled=true};box.querySelectorAll('[data-rate]').forEach(b=>b.onclick=()=>rate(b.dataset.rate));}
    function rate(r){if(r!=='good')addError({source,type:r==='almost'?'Presque':'À revoir',prompt:current.p,answer:current.a,note:current.n,id:`${source}-${idx}`});next.hidden=false;box.querySelectorAll('[data-rate]').forEach(b=>b.disabled=true);}
    next.onclick=draw;draw();
  }

  function renderTranslation(){
    const box=$('translationTrainer'), tabs=[...document.querySelectorAll('[data-translation-mode]')], next=$('nextTranslation'); if(!box||!next)return;
    let mode='version',idx=-1,current=null;
    function draw(){const rows=TRANSLATION[mode];idx=(idx+1)%rows.length;current=rows[idx];const qcm=!!current.q;if(qcm){box.innerHTML=`<span class="badge badge-red">${mode==='rep'?'Repérage':'Fait de langue'}</span><h3>${current.q}</h3><div class="option-grid">${current.o.map((x,i)=>`<button class="option ft-option" data-i="${i}">${x}</button>`).join('')}</div><div class="ft-feedback"></div>`;box.querySelectorAll('.ft-option').forEach(b=>b.onclick=()=>{const i=Number(b.dataset.i),ok=i===current.a;box.querySelectorAll('.ft-option').forEach((x,j)=>{x.disabled=true;if(j===current.a)x.classList.add('correct');else if(j===i)x.classList.add('wrong')});box.querySelector('.ft-feedback').innerHTML=`<div class="feedback ${ok?'ok':'no'}"><strong>${ok?'Exact.':'À revoir.'}</strong> ${current.e}</div>`;if(!ok)addError({source:'Langue & traduction',type:mode==='rep'?'Repérage':'Fait de langue',prompt:current.q,answer:current.o[current.a],note:current.e,id:`trans-${mode}-${idx}`});next.hidden=false;});}
      else {box.innerHTML=`<span class="badge badge-red">${mode==='version'?'Version · espagnol → français':'Thème · français → espagnol'}</span><h3>${current.p}</h3><textarea class="ft-textarea" rows="4" placeholder="Traduis d’abord sans regarder la correction…"></textarea><div class="actions"><button class="btn btn-primary ft-reveal">Afficher la correction proposée</button></div><div class="ft-model" hidden><div class="callout"><strong>Proposition :</strong> ${current.a}<br><small>${current.n}</small></div><div class="recall-ratings"><button class="btn btn-secondary" data-rate="good">✓ Correct</button><button class="btn btn-secondary" data-rate="almost">~ Presque</button><button class="btn btn-secondary" data-rate="again">↻ À revoir</button></div></div>`;box.querySelector('.ft-reveal').onclick=()=>{box.querySelector('.ft-model').hidden=false;box.querySelector('.ft-reveal').disabled=true};box.querySelectorAll('[data-rate]').forEach(b=>b.onclick=()=>{if(b.dataset.rate!=='good')addError({source:'Langue & traduction',type:mode==='version'?'Version':'Thème',prompt:current.p,answer:current.a,note:current.n,id:`trans-${mode}-${idx}`});box.querySelectorAll('[data-rate]').forEach(x=>x.disabled=true);next.hidden=false;});}
      next.hidden=true;
    }
    tabs.forEach(t=>t.onclick=()=>{mode=t.dataset.translationMode;idx=-1;tabs.forEach(x=>x.classList.toggle('active',x===t));draw()});next.onclick=draw;draw();
  }

  function renderErrorPage(){
    const list=$('errorList'), today=$('errorToday'), total=$('errorTotal'), filter=$('errorFilter'); if(!list)return;
    function draw(){const rows=readErrors(), due=dueErrors();if(total)total.textContent=rows.length;if(today)today.textContent=due.length;const f=filter?.value||'all';const visible=(due.length?due:rows).filter(x=>f==='all'||x.source===f).slice(0,12);if(filter){const sources=[...new Set(rows.map(x=>x.source))];const cur=filter.value;filter.innerHTML='<option value="all">Toutes les sources</option>'+sources.map(x=>`<option>${x}</option>`).join('');filter.value=sources.includes(cur)?cur:'all'}list.innerHTML=visible.length?visible.map(x=>`<article class="card error-card" data-id="${x.id}"><span class="badge">${x.source}</span><span class="error-count">vue ${x.count||1}×</span><h3>${x.prompt}</h3><details><summary>Afficher la réponse</summary><div class="error-answer"><strong>${x.answer}</strong><p>${x.note||''}</p></div></details><div class="actions"><button class="btn btn-secondary" data-er="hard">↻ Encore difficile</button><button class="btn btn-secondary" data-er="later">~ Revoir plus tard</button><button class="btn btn-primary" data-er="mastered">✓ Maîtrisé</button></div></article>`).join(''):'<div class="callout"><h3>Rien à revoir aujourd’hui 🎉</h3><p>Les erreurs ajoutées depuis les flashcards, la grammaire ou la traduction apparaîtront ici automatiquement.</p></div>';list.querySelectorAll('[data-er]').forEach(b=>b.onclick=()=>{const card=b.closest('[data-id]');reviewError(card.dataset.id,b.dataset.er);draw()});}
    filter?.addEventListener('change',draw);$('clearErrors')?.addEventListener('click',()=>{if(confirm('Supprimer tout le carnet d’erreurs ?')){writeErrors([]);draw()}});draw();
  }

  document.addEventListener('DOMContentLoaded',()=>{
    updateBadges();
    renderQcm('frenchQcm','checkFrenchQcm','nextFrenchQcm',FRENCH_QCM,'Français express');
    renderProduction('sayItBox','nextSayIt',SAY_IT,'Dis-le comme au concours');
    renderTranslation();
    renderErrorPage();
  });
})();