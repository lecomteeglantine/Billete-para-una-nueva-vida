const SITE = {
  pages: [
    ['index.html','Accueil','Commencer, diagnostic, parcours, routine'],
    ['programme.html','Programme 2027','Bac+3, bac+5, œuvres, axes, calendrier'],
    ['epreuves.html','Épreuves','Composition, traduction, leçon, entretien'],
    ['litterature.html','Littérature','La caída de Madrid, Capmany, Usigli, analyse'],
    ['civilisation.html','Civilisation','Franquismo, Transition, Cuba, Mexique, Espagne'],
    ['traduction.html','Langue & traduction','Thème, version, faits de langue, grammaire'],
    ['didactique.html','Didactique','Séquence, séance, CECRL, activités langagières'],
    ['francais.html','Français du concours','Vocabulaire français espagnol, flashcards, prononciation'],
    ['oral.html','Oral & entretien','Leçon, motivation, valeurs de la République, mise en situation'],
    ['jury.html','Rapports de jury','Attentes, erreurs fréquentes, critères de réussite'],
    ['entrainement.html','Entraînement','Diagnostic, QCM, chronomètre, sujets'],
    ['planning.html','Plan de travail','Planning, missions, révisions'],
    ['ressources.html','Ressources','Sources officielles, bibliographies, programmes'],
    ['ressources-en-ligne.html','Ressources en ligne','Presse, podcasts, vidéos, données, archives et outils du monde hispanophone'],
    ['progression.html','Ma progression','Sauvegarde, export, import, statistiques']
  ]
};

const NAV = [
  ['index.html','Accueil'],['programme.html','Programme'],['epreuves.html','Épreuves'],
  ['litterature.html','Littérature'],['civilisation.html','Civilisation'],
  ['traduction.html','Langue'],['didactique.html','Didactique'],['francais.html','Français'],
  ['oral.html','Oral'],['jury.html','Jury'],['ressources-en-ligne.html','Ressources en ligne'],['entrainement.html','S’entraîner']
];

function currentFile(){ return location.pathname.split('/').pop() || 'index.html'; }
function headerHTML(){
  const current = currentFile();
  return `<a class="skip-link" href="#main">Aller au contenu</a>
  <header class="site-header">
    <div class="header-inner">
      <a class="brand" href="index.html" aria-label="Billete para una nueva vida, accueil">
        <span class="ticket-mark" aria-hidden="true">🎟️</span>
        <span><strong>Billete para una nueva vida</strong><small>CAFEP-CAPES externe d’espagnol · Jennifer</small></span>
      </a>
      <button class="nav-toggle" id="navToggle" aria-expanded="false" aria-controls="mainNav">☰ Menu</button>
      <nav class="main-nav" id="mainNav" aria-label="Navigation principale">
        ${NAV.map(([href,label])=>`<a href="${href}" ${current===href?'aria-current="page"':''}>${label}</a>`).join('')}
      </nav>
      <div class="header-tools">
        <select class="route-select" id="routeSelect" aria-label="Choisir le parcours">
          <option value="all">Deux parcours</option><option value="bac3">Bac+3</option><option value="bac5">Bac+5</option>
        </select>
        <button class="tool-btn" id="searchOpen" aria-label="Rechercher"><span aria-hidden="true">⌕</span><span class="label"> Recherche</span></button>
        <button class="tool-btn" id="accessOpen" aria-label="Options d’accessibilité"><span aria-hidden="true">◐</span><span class="label"> Accessibilité</span></button>
      </div>
    </div>
  </header>`;
}
function footerHTML(){
  return `<footer class="site-footer"><div class="footer-inner">
    <div class="footer-grid">
      <div><h3>Billete para una nueva vida</h3><p>Préparer le CAFEP-CAPES externe d’espagnol avec une méthode claire, bilingue et progressive.</p></div>
      <div><h3>Parcours</h3><div class="footer-links"><a href="programme.html">Programme</a><a href="planning.html">Plan de travail</a><a href="progression.html">Progression</a></div></div>
      <div><h3>Travail utile</h3><div class="footer-links"><a href="francais.html">Français</a><a href="entrainement.html">Entraînement</a><a href="ressources.html">Sources</a></div></div>
    </div>
    <p class="legal">🔒 Vie privée : aucune donnée de progression n’est envoyée à un serveur. Les résultats restent dans ce navigateur et peuvent être exportés. Ce site est un outil de préparation indépendant : les textes officiels accessibles dans l’onglet Ressources restent la référence. Conception : Eglantine Lecomte.</p>
  </div></footer>`;
}
function overlaysHTML(){
 return `<div class="search-overlay" id="searchOverlay" role="dialog" aria-modal="true" aria-labelledby="searchTitle">
  <div class="dialog"><div class="dialog-head"><h2 id="searchTitle">Rechercher dans le site</h2><button class="close-btn" data-close="searchOverlay">✕</button></div>
  <input class="search-box" id="siteSearch" type="search" placeholder="Ex. problématique, laïcité, transition, thème…" autocomplete="off"><div id="searchResults"></div></div></div>
  <div class="access-overlay" id="accessOverlay" role="dialog" aria-modal="true" aria-labelledby="accessTitle"><div class="dialog">
   <div class="dialog-head"><h2 id="accessTitle">Accessibilité</h2><button class="close-btn" data-close="accessOverlay">✕</button></div>
   <div class="setting-row"><span>Taille du texte</span><span><button class="tool-btn" data-size="1">A</button> <button class="tool-btn" data-size="1.12">A+</button> <button class="tool-btn" data-size="1.25">A++</button></span></div>
   <div class="setting-row"><label for="contrast">Contraste renforcé</label><input id="contrast" type="checkbox"></div>
   <div class="setting-row"><label for="readingFont">Police de lecture simple</label><input id="readingFont" type="checkbox"></div>
   <div class="setting-row"><label for="reduceMotion">Réduire les animations</label><input id="reduceMotion" type="checkbox"></div>
   <div class="setting-row"><label for="focusMode">Mode concentration</label><input id="focusMode" type="checkbox"></div>
  </div></div><div class="toast" id="toast" role="status" aria-live="polite"></div>`;
}

function initShell(){
  document.body.insertAdjacentHTML('afterbegin',headerHTML());
  document.body.insertAdjacentHTML('beforeend',footerHTML()+overlaysHTML());
  document.getElementById('navToggle')?.addEventListener('click',e=>{
    const nav=document.getElementById('mainNav'); nav.classList.toggle('open'); e.currentTarget.setAttribute('aria-expanded',nav.classList.contains('open'));
  });
  const route = localStorage.getItem('billete-route') || 'all';
  const select=document.getElementById('routeSelect'); select.value=route; setRoute(route);
  select.addEventListener('change',e=>{localStorage.setItem('billete-route',e.target.value);setRoute(e.target.value);toast('Parcours enregistré.');});
  initOverlays(); initAccessibility(); initTabs(); initProgress(); initRouteButtons(); initPWA();
}
function setRoute(route){ document.body.classList.remove('route-all','route-bac3','route-bac5'); document.body.classList.add(`route-${route}`); }
function initRouteButtons(){ document.querySelectorAll('[data-set-route]').forEach(btn=>btn.addEventListener('click',()=>{const r=btn.dataset.setRoute;localStorage.setItem('billete-route',r);setRoute(r);document.getElementById('routeSelect').value=r;toast(r==='bac3'?'Parcours bac+3 sélectionné.':'Parcours bac+5 sélectionné.');})); }
function initOverlays(){
  const open=(id)=>{document.getElementById(id).classList.add('open');document.body.style.overflow='hidden'};
  const close=(id)=>{document.getElementById(id).classList.remove('open');document.body.style.overflow=''};
  document.getElementById('searchOpen').onclick=()=>{open('searchOverlay');setTimeout(()=>document.getElementById('siteSearch').focus(),50)};
  document.getElementById('accessOpen').onclick=()=>open('accessOverlay');
  document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>close(b.dataset.close));
  document.querySelectorAll('.search-overlay,.access-overlay').forEach(o=>o.addEventListener('click',e=>{if(e.target===o)close(o.id)}));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){close('searchOverlay');close('accessOverlay')}});
  const input=document.getElementById('siteSearch'); input.addEventListener('input',()=>renderSearch(input.value)); renderSearch('');
}
function renderSearch(q){
  const box=document.getElementById('searchResults'); const needle=q.trim().toLowerCase();
  const rows=SITE.pages.filter(p=>!needle || `${p[1]} ${p[2]}`.toLowerCase().includes(needle));
  box.innerHTML=rows.length?rows.map(p=>`<a class="search-result" href="${p[0]}"><strong>${p[1]}</strong><br><small>${p[2]}</small></a>`).join(''):'<p>Aucun résultat. Essaie un terme plus général.</p>';
}
function initAccessibility(){
  const settings=JSON.parse(localStorage.getItem('billete-access')||'{}');
  document.documentElement.style.setProperty('--text',(settings.size||1)+'rem');
  [['contrast','high-contrast'],['readingFont','reading-font'],['reduceMotion','reduce-motion'],['focusMode','focus-mode']].forEach(([id,cls])=>{const el=document.getElementById(id);el.checked=!!settings[id];document.body.classList.toggle(cls,!!settings[id]);el.addEventListener('change',()=>{settings[id]=el.checked;document.body.classList.toggle(cls,el.checked);save();});});
  document.querySelectorAll('[data-size]').forEach(b=>b.onclick=()=>{settings.size=Number(b.dataset.size);document.documentElement.style.setProperty('--text',settings.size+'rem');save();});
  function save(){localStorage.setItem('billete-access',JSON.stringify(settings));}
}
function initTabs(){
  document.querySelectorAll('[data-tabs]').forEach(group=>{const buttons=group.querySelectorAll('.tab-btn');const panels=group.querySelectorAll('.tab-panel');buttons.forEach((b,i)=>b.addEventListener('click',()=>{buttons.forEach(x=>x.setAttribute('aria-selected','false'));panels.forEach(p=>p.hidden=true);b.setAttribute('aria-selected','true');panels[i].hidden=false;}));});
}
function progressKey(el){return el.dataset.progress || el.id;}
function initProgress(){
  const data=JSON.parse(localStorage.getItem('billete-progress')||'{}');
  document.querySelectorAll('[data-progress]').forEach(el=>{const key=progressKey(el);el.checked=!!data[key];el.closest('.check-item')?.classList.toggle('done',el.checked);el.addEventListener('change',()=>{data[key]=el.checked;localStorage.setItem('billete-progress',JSON.stringify(data));el.closest('.check-item')?.classList.toggle('done',el.checked);updateProgressDisplays();});});
  updateProgressDisplays();
}
function updateProgressDisplays(){
 const data=JSON.parse(localStorage.getItem('billete-progress')||'{}'); const done=Object.values(data).filter(Boolean).length; const total=Math.max(1,document.querySelectorAll('[data-progress]').length || Number(localStorage.getItem('billete-total-checks')) || 80); localStorage.setItem('billete-total-checks',Math.max(total,80));
 document.querySelectorAll('[data-progress-count]').forEach(e=>e.textContent=done);
 document.querySelectorAll('[data-progress-percent]').forEach(e=>e.textContent=Math.min(100,Math.round(done/80*100))+'%');
 document.querySelectorAll('.progress-bar > span').forEach(e=>e.style.width=Math.min(100,Math.round(done/80*100))+'%');
}
function toast(message){const t=document.getElementById('toast');if(!t)return;t.textContent=message;t.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>t.classList.remove('show'),2200)}
function speak(text,lang){ if(!('speechSynthesis' in window)){toast('La synthèse vocale n’est pas disponible dans ce navigateur.');return;} speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang=lang;u.rate=.86;speechSynthesis.speak(u); }
window.speak=speak; window.toast=toast;
function initPWA(){ if('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('sw.js').catch(()=>{}); }
document.addEventListener('DOMContentLoaded',initShell);
