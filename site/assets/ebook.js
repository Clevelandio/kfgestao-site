'use strict';
(()=>{
 const form=document.querySelector('#ebook-form'),status=document.querySelector('#status'),fields=document.querySelector('#fields');
 let config,widget,busy=false;
 // Eventos locais preparados. Nenhum provedor de analytics é instalado.
 // Um futuro adaptador deve receber somente estes dois campos; não encaminhar URL, formulário ou dados pessoais.
 const track=event=>document.dispatchEvent(new CustomEvent('kf:ebook-event',{detail:{event,material:'planejamento_90_dias'}}));
 track('ebook_page_view');
 document.querySelector('#download').addEventListener('click',()=>track('ebook_download_click'));
 document.querySelector('#founders').addEventListener('click',()=>track('ebook_founders_click'));
 async function setup(){try{
  const r=await fetch('/api/ebook-config',{cache:'no-store'});if(!r.ok)throw Error();config=await r.json();if(!config.available)throw Error();
  if(config.testMode){for(const [id,value] of Object.entries({name:'Teste KF',email:'test@example.com',company:'Teste',challenge:''})){const input=document.getElementById(id);input.value=value;input.readOnly=true;}const note=document.createElement('p');note.setAttribute('role','note');note.textContent='Modo de teste: somente dados fictícios fixos. A autorização pode ser marcada ou desmarcada. O cadastro público ainda não foi liberado.';form.before(note);}
  await new Promise((resolve,reject)=>{const s=document.createElement('script');s.src='https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';s.onload=resolve;s.onerror=reject;document.head.append(s);});
  widget=turnstile.render('#captcha',{sitekey:config.siteKey,action:'ebook','error-callback':()=>{status.textContent='Não foi possível carregar a verificação de segurança. Atualize a página.';},'expired-callback':()=>{status.textContent='Refaça a verificação de segurança.';}});fields.disabled=false;status.textContent='';
 }catch{status.textContent='O cadastro está temporariamente indisponível. Tente novamente mais tarde.';}}
 form.addEventListener('submit',async e=>{e.preventDefault();if(busy||!form.reportValidity())return;const captcha=turnstile.getResponse(widget);if(!captcha){status.textContent='Conclua a verificação de segurança.';return;}
  busy=true;fields.disabled=true;form.setAttribute('aria-busy','true');status.textContent='Salvando seu cadastro…';
  const campaign={},params=new URLSearchParams(location.search);for(const k of ['utm_source','utm_medium','utm_campaign','utm_term','utm_content'])campaign[k]=config.testMode?'':(params.get(k)||'').slice(0,200);
  const value=id=>document.getElementById(id).value.trim();
  try{const r=await fetch('/api/ebook-register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:value('name'),email:value('email'),company:value('company'),challenge:value('challenge'),website:value('website'),consent:document.querySelector('#consent').checked,consentVersion:config.consentVersion,captcha,campaign}),signal:AbortSignal.timeout(45000)});const result=await r.json();if(!r.ok)throw Error(result.error||'Não foi possível confirmar o cadastro.');if(typeof result.downloadUrl!=='string'||!result.downloadUrl.startsWith('/api/ebook-download?token='))throw Error('Não foi possível confirmar o download.');document.querySelector('#download').href=result.downloadUrl;form.hidden=true;status.textContent='';const success=document.querySelector('#success');success.hidden=false;success.focus();track('ebook_registration_complete');
  }catch(error){status.textContent=error.name==='TimeoutError'?'A conexão demorou. O cadastro pode ter sido salvo; tente novamente.':error.message;fields.disabled=false;turnstile.reset(widget);}finally{busy=false;form.removeAttribute('aria-busy');}
 });setup();
})();
