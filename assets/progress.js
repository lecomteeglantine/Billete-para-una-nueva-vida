document.addEventListener('DOMContentLoaded',()=>{
 const $=id=>document.getElementById(id);
 $('exportProgress').onclick=()=>{
  const data={
   version:1, exportedAt:new Date().toISOString(),
   progress:JSON.parse(localStorage.getItem('billete-progress')||'{}'),
   route:localStorage.getItem('billete-route')||'all',
   knownCards:JSON.parse(localStorage.getItem('billete-known-cards')||'[]'),
   diagnostic:JSON.parse(localStorage.getItem('billete-diagnostic')||'null'),
   access:JSON.parse(localStorage.getItem('billete-access')||'{}')
  };
  const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`billete-progression-${new Date().toISOString().slice(0,10)}.json`;a.click();URL.revokeObjectURL(a.href);toast('Sauvegarde téléchargée.');
 };
 $('importProgress').onclick=()=>{
  const file=$('importFile').files[0];if(!file){toast('Choisis d’abord un fichier JSON.');return;}
  const reader=new FileReader();reader.onload=()=>{try{const d=JSON.parse(reader.result);if(!d||typeof d!=='object')throw new Error();if(!confirm('Remplacer la progression locale par cette sauvegarde ?'))return;localStorage.setItem('billete-progress',JSON.stringify(d.progress||{}));localStorage.setItem('billete-route',d.route||'all');localStorage.setItem('billete-known-cards',JSON.stringify(d.knownCards||[]));if(d.diagnostic)localStorage.setItem('billete-diagnostic',JSON.stringify(d.diagnostic));localStorage.setItem('billete-access',JSON.stringify(d.access||{}));location.reload();}catch(e){toast('Fichier de sauvegarde invalide.');}};reader.readAsText(file);
 };
 $('resetProgress').onclick=()=>{if(confirm('Effacer toute la progression enregistrée sur cet appareil ?')){['billete-progress','billete-route','billete-known-cards','billete-diagnostic','billete-access','billete-total-checks'].forEach(k=>localStorage.removeItem(k));location.reload();}};
});
