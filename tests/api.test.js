const test=require('node:test'),assert=require('node:assert/strict'),Module=require('node:module'),crypto=require('node:crypto');
const handlers={},original=Module._load;let mailCalls=[],mailFailure=false;const fakeMailer={createTransport:()=>({sendMail:async message=>{mailCalls.push(message);if(mailFailure)throw Error('private-smtp-password-provider-error');return {accepted:[message.to.address],rejected:[]};},close:()=>{}})};
Module._load=function(name,...args){if(name==='./email'&&args[0]?.filename.endsWith('/functions.js'))return {...original.call(this,name,...args),sendEbook:async(recipient,url,testMode)=>{const {smtpConfig,message}=require('../api/src/email');if(!smtpConfig()){if(testMode)return 'test_not_sent';throw Error('unavailable');}const target=testMode?'contato@kfgestao.com.br':recipient;const r=await fakeMailer.createTransport().sendMail(message(target,url,testMode));if(!r.accepted.includes(target))throw Error('not accepted');return testMode?'test_accepted':'accepted';}};if(name==='@azure/functions')return {app:{http:(name,definition)=>handlers[name]=definition}};return original.call(this,name,...args);};
require('../api/src/functions');Module._load=original;
const {VERSION}=require('../api/src/core');
Object.assign(process.env,{PRIVACY_APPROVED:'true',GOOGLE_CLIENT_EMAIL:'test@example.com',GOOGLE_PRIVATE_KEY:crypto.generateKeyPairSync('rsa',{modulusLength:2048}).privateKey.export({type:'pkcs8',format:'pem'}),GOOGLE_SHEET_ID:'test',TURNSTILE_SECRET_KEY:'test',TURNSTILE_SITE_KEY:'test',DOWNLOAD_SIGNING_SECRET:'x'.repeat(32),SITE_ORIGIN:'https://www.kfgestao.com.br',SMTP_USER:'contato@kfgestao.com.br',SMTP_PASSWORD:'synthetic-password'});
const req=(consent=false)=>({headers:new Headers({'origin':process.env.SITE_ORIGIN,'content-type':'application/json'}),text:async()=>JSON.stringify({name:'Teste KF',email:'test@example.com',company:'Teste',challenge:'',consent,consentVersion:VERSION,captcha:'token'})});
test('configuração pública não expõe credenciais e cadastro não declara método de leitura',async()=>{
 const r=await handlers.ebookConfig.handler();
 assert.deepEqual(Object.keys(r.jsonBody).sort(),['available','campaignClosed','consentText','consentVersion','siteKey','testMode'].sort());
 assert.deepEqual(handlers.ebookRegister.methods,['POST']);
 assert.equal(r.headers['Cache-Control'],'no-store');
 assert.equal(r.jsonBody.GOOGLE_PRIVATE_KEY,undefined);
 assert.equal(r.jsonBody.DOWNLOAD_SIGNING_SECRET,undefined);
});
test('gravação confirmada libera download para ambos os consentimentos',async()=>{const originalFetch=global.fetch;try{for(const consent of [false,true]){let calls=0;global.fetch=async(url,options)=>{calls++;if(url.includes('siteverify'))return Response.json({success:true,hostname:'www.kfgestao.com.br',action:'ebook'});if(url.includes('oauth2'))return Response.json({access_token:'token'});assert.equal(JSON.parse(options.body).values[0][12],consent);return Response.json({updates:{updatedRows:1}});};const r=await handlers.ebookRegister.handler(req(consent));assert.equal(r.status,200);assert.match(r.jsonBody.downloadUrl,/^\/api\/ebook-download\?token=/);assert.equal(calls,3);assert.equal(r.jsonBody.emailStatus,'accepted');assert.equal(mailCalls.at(-1).to.address,'test@example.com');}}finally{global.fetch=originalFetch;}});
test('falha da planilha nunca confirma sucesso ou libera download',async()=>{const originalFetch=global.fetch;try{global.fetch=async url=>url.includes('siteverify')?Response.json({success:true,hostname:'www.kfgestao.com.br',action:'ebook'}):url.includes('oauth2')?Response.json({access_token:'token'}):Response.json({error:'fail'},{status:403});const r=await handlers.ebookRegister.handler(req());assert.equal(r.status,503);assert.equal(r.jsonBody.downloadUrl,undefined);assert.equal(r.jsonBody.diagnostic,undefined);}finally{global.fetch=originalFetch;}});
test('captcha inválido impede acesso ao Google',async()=>{const originalFetch=global.fetch;try{let calls=0;global.fetch=async()=>{calls++;return Response.json({success:false});};assert.equal((await handlers.ebookRegister.handler(req())).status,400);assert.equal(calls,1);}finally{global.fetch=originalFetch;}});
test('origem diferente é recusada e link inválido não recebe PDF',async()=>{const r=req();r.headers.set('origin','https://example.com');assert.equal((await handlers.ebookRegister.handler(r)).status,403);assert.equal((await handlers.ebookDownload.handler({query:new URLSearchParams('token=invalid')})).status,403);});
test('modo fictício exige endereço de revisão e recusa dados reais antes de chamar fornecedores',async()=>{
 const old={privacy:process.env.PRIVACY_APPROVED,mode:process.env.EBOOK_TEST_MODE,origin:process.env.SITE_ORIGIN},originalFetch=global.fetch;
 try{
  process.env.PRIVACY_APPROVED='false';process.env.EBOOK_TEST_MODE='true';
  assert.equal((await handlers.ebookConfig.handler()).jsonBody.available,false);
  process.env.SITE_ORIGIN='https://proud-mud-0d7110710-1.centralus.2.azurestaticapps.net';
  assert.equal((await handlers.ebookConfig.handler()).jsonBody.testMode,true);
  let calls=0;global.fetch=async(url)=>{calls++;return url.includes('siteverify')?Response.json({success:true,hostname:new URL(process.env.SITE_ORIGIN).hostname,action:'ebook'}):url.includes('oauth2')?Response.json({access_token:'token'}):Response.json({updates:{updatedRows:1}});};
  const real=req();real.text=async()=>JSON.stringify({name:'Pessoa real',email:'pessoa@empresa.com.br',company:'Empresa',consent:false,consentVersion:VERSION,captcha:'token'});
  assert.equal((await handlers.ebookRegister.handler(real)).status,400);assert.equal(calls,0);
  for(const consent of [false,true])assert.equal((await handlers.ebookRegister.handler(req(consent))).status,200);
  assert.equal(calls,6);
 }finally{process.env.PRIVACY_APPROVED=old.privacy;process.env.SITE_ORIGIN=old.origin;if(old.mode===undefined)delete process.env.EBOOK_TEST_MODE;else process.env.EBOOK_TEST_MODE=old.mode;global.fetch=originalFetch;}
});

test('diagnóstico do teste informa somente etapa e status, sem segredos ou resposta do fornecedor',async()=>{
 const old={privacy:process.env.PRIVACY_APPROVED,mode:process.env.EBOOK_TEST_MODE,origin:process.env.SITE_ORIGIN,key:process.env.GOOGLE_PRIVATE_KEY},originalFetch=global.fetch;
 try{
  process.env.PRIVACY_APPROVED='false';process.env.EBOOK_TEST_MODE='true';process.env.SITE_ORIGIN='https://proud-mud-0d7110710-1.centralus.2.azurestaticapps.net';
  for(const [stage,httpStatus] of [['captcha_verify',null],['google_key',null],['google_auth',401],['google_write',403],['google_confirm',200]]){
   process.env.GOOGLE_PRIVATE_KEY=stage==='google_key'?'invalid-private-secret':old.key;
   global.fetch=async url=>{
    if(url.includes('siteverify')){if(stage==='captcha_verify')throw Error('secret-provider-message');return Response.json({success:true,hostname:new URL(process.env.SITE_ORIGIN).hostname,action:'ebook'});}
    if(url.includes('oauth2'))return stage==='google_auth'?Response.json({error:'secret-provider-message'},{status:401}):Response.json({access_token:'secret-access-token'});
    return stage==='google_write'?Response.json({error:'secret-provider-message'},{status:403}):Response.json({updates:{updatedRows:0}});
   };
   const r=await handlers.ebookRegister.handler(req());assert.equal(r.status,503);assert.deepEqual(r.jsonBody.diagnostic,{stage,httpStatus});assert.equal(r.jsonBody.downloadUrl,undefined);assert.doesNotMatch(JSON.stringify(r.jsonBody),/secret-provider-message|secret-access-token|invalid-private-secret|test@example/);
  }
 }finally{process.env.PRIVACY_APPROVED=old.privacy;process.env.SITE_ORIGIN=old.origin;process.env.GOOGLE_PRIVATE_KEY=old.key;if(old.mode===undefined)delete process.env.EBOOK_TEST_MODE;else process.env.EBOOK_TEST_MODE=old.mode;global.fetch=originalFetch;}
});

test('falha SMTP preserva cadastro e download sem afirmar envio e sem revelar segredo',async()=>{
 const oldFetch=global.fetch;try{mailFailure=true;global.fetch=async url=>url.includes('siteverify')?Response.json({success:true,hostname:'www.kfgestao.com.br',action:'ebook'}):url.includes('oauth2')?Response.json({access_token:'token'}):Response.json({updates:{updatedRows:1}});const r=await handlers.ebookRegister.handler(req());assert.equal(r.status,200);assert.equal(r.jsonBody.emailStatus,'unavailable');assert.match(r.jsonBody.downloadUrl,/ebook-download/);assert.doesNotMatch(JSON.stringify(r.jsonBody),/private-smtp|synthetic-password/);}finally{mailFailure=false;global.fetch=oldFetch;}
});
test('produção sem SMTP permanece indisponível',async()=>{const old=process.env.SMTP_PASSWORD;try{delete process.env.SMTP_PASSWORD;assert.equal((await handlers.ebookConfig.handler()).jsonBody.available,false);assert.equal((await handlers.ebookRegister.handler(req())).status,503);}finally{process.env.SMTP_PASSWORD=old;}});
test('encerramento da campanha recusa cadastros e preserva download já emitido',async()=>{
 const old=process.env.EBOOK_CAMPAIGN_ENDS_AT;try{process.env.EBOOK_CAMPAIGN_ENDS_AT='2020-01-01T00:00:00Z';const c=await handlers.ebookConfig.handler();assert.equal(c.jsonBody.available,false);assert.equal(c.jsonBody.campaignClosed,true);assert.equal((await handlers.ebookRegister.handler(req())).status,410);const {signDownload}=require('../api/src/core');const r=await handlers.ebookDownload.handler({query:new URLSearchParams({token:signDownload(process.env.DOWNLOAD_SIGNING_SECRET)})});assert.equal(r.status,200);}finally{if(old===undefined)delete process.env.EBOOK_CAMPAIGN_ENDS_AT;else process.env.EBOOK_CAMPAIGN_ENDS_AT=old;}
});
test('modo fictício sem SMTP declara explicitamente que não enviou',async()=>{
 const old={mode:process.env.EBOOK_TEST_MODE,origin:process.env.SITE_ORIGIN,password:process.env.SMTP_PASSWORD},oldFetch=global.fetch;
 try{process.env.EBOOK_TEST_MODE='true';process.env.SITE_ORIGIN='https://proud-mud-0d7110710-1.centralus.2.azurestaticapps.net';delete process.env.SMTP_PASSWORD;global.fetch=async url=>url.includes('siteverify')?Response.json({success:true,hostname:new URL(process.env.SITE_ORIGIN).hostname,action:'ebook'}):url.includes('oauth2')?Response.json({access_token:'token'}):Response.json({updates:{updatedRows:1}});const r=await handlers.ebookRegister.handler(req());assert.equal(r.jsonBody.emailStatus,'test_not_sent');}
 finally{global.fetch=oldFetch;process.env.SITE_ORIGIN=old.origin;process.env.SMTP_PASSWORD=old.password;if(old.mode===undefined)delete process.env.EBOOK_TEST_MODE;else process.env.EBOOK_TEST_MODE=old.mode;}
});
