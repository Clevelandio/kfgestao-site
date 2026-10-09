const test=require('node:test'),assert=require('node:assert/strict');
const {configIssues}=require('../api/src/config-diagnostic');
const valid={PRIVACY_APPROVED:'true',GOOGLE_CLIENT_EMAIL:'synthetic',GOOGLE_PRIVATE_KEY:'private-secret',GOOGLE_SHEET_ID:'synthetic',TURNSTILE_SECRET_KEY:'captcha-secret',TURNSTILE_SITE_KEY:'synthetic',DOWNLOAD_SIGNING_SECRET:'x'.repeat(44),SMTP_USER:'contato@kfgestao.com.br',SMTP_PASSWORD:'smtp-secret'};
test('diagnóstico distingue ausências e valores inválidos sem revelar valores',()=>{
 assert.deepEqual(configIssues(valid,false),[]);
 for(const key of Object.keys(valid)) {
  const env={...valid};delete env[key];assert.deepEqual(configIssues(env,false),[key]);
 }
 assert.deepEqual(configIssues({...valid,SMTP_PORT:'invalid-secret',SMTP_HOST:'invalid-secret',SMTP_USER:'invalid-secret',DOWNLOAD_SIGNING_SECRET:'short-secret'},false),['DOWNLOAD_SIGNING_SECRET','SMTP_HOST','SMTP_PORT','SMTP_USER']);
 assert.deepEqual(configIssues({...valid,PRIVACY_APPROVED:'false',SMTP_USER:'',SMTP_PASSWORD:''},true),[]);
});
