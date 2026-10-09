const test=require('node:test'),assert=require('node:assert/strict'),Module=require('node:module'),crypto=require('node:crypto');
const handlers={},original=Module._load;
Module._load=function(name,...args){if(name==='@azure/functions')return {app:{http:(name,definition)=>handlers[name]=definition}};return original.call(this,name,...args);};
require('../api/src/functions');Module._load=original;
const {VERSION}=require('../api/src/core');
Object.assign(process.env,{PRIVACY_APPROVED:'true',GOOGLE_CLIENT_EMAIL:'test@example.com',GOOGLE_PRIVATE_KEY:crypto.generateKeyPairSync('rsa',{modulusLength:2048}).privateKey.export({type:'pkcs8',format:'pem'}),GOOGLE_SHEET_ID:'test',TURNSTILE_SECRET_KEY:'test',TURNSTILE_SITE_KEY:'test',DOWNLOAD_SIGNING_SECRET:'x'.repeat(32),SITE_ORIGIN:'https://www.kfgestao.com.br'});
const req=(consent=false)=>({headers:new Headers({'origin':process.env.SITE_ORIGIN,'content-type':'application/json'}),text:async()=>JSON.stringify({name:'Teste KF',email:'test@example.com',company:'Teste',challenge:'',consent,consentVersion:VERSION,captcha:'token'})});
test('gravação confirmada libera download para ambos os consentimentos',async()=>{const originalFetch=global.fetch;try{for(const consent of [false,true]){let calls=0;global.fetch=async(url,options)=>{calls++;if(url.includes('siteverify'))return Response.json({success:true,hostname:'www.kfgestao.com.br',action:'ebook'});if(url.includes('oauth2'))return Response.json({access_token:'token'});assert.equal(JSON.parse(options.body).values[0][12],consent);return Response.json({updates:{updatedRows:1}});};const r=await handlers.ebookRegister.handler(req(consent));assert.equal(r.status,200);assert.match(r.jsonBody.downloadUrl,/^\/api\/ebook-download\?token=/);assert.equal(calls,3);}}finally{global.fetch=originalFetch;}});
test('falha da planilha nunca confirma sucesso ou libera download',async()=>{const originalFetch=global.fetch;try{global.fetch=async url=>url.includes('siteverify')?Response.json({success:true,hostname:'www.kfgestao.com.br',action:'ebook'}):url.includes('oauth2')?Response.json({access_token:'token'}):Response.json({error:'fail'},{status:403});const r=await handlers.ebookRegister.handler(req());assert.equal(r.status,503);assert.equal(r.jsonBody.downloadUrl,undefined);}finally{global.fetch=originalFetch;}});
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
