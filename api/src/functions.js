'use strict';
const {app}=require('@azure/functions');
const crypto=require('node:crypto');
const fs=require('node:fs/promises');
const path=require('node:path');
const {validate,row,signDownload,verifyDownload,CONSENT,VERSION}=require('./core');
const {smtpConfig,sendEbook}=require('./email');
const json=(status,data)=>({status,jsonBody:data,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
const testMode=()=>process.env.EBOOK_TEST_MODE==='true' && process.env.SITE_ORIGIN==='https://proud-mud-0d7110710-1.centralus.2.azurestaticapps.net';
const campaignOpen=()=>!process.env.EBOOK_CAMPAIGN_ENDS_AT || (Number.isFinite(Date.parse(process.env.EBOOK_CAMPAIGN_ENDS_AT)) && Date.now()<Date.parse(process.env.EBOOK_CAMPAIGN_ENDS_AT));
const ready=()=>(process.env.PRIVACY_APPROVED==='true'||testMode()) && ['GOOGLE_CLIENT_EMAIL','GOOGLE_PRIVATE_KEY','GOOGLE_SHEET_ID','TURNSTILE_SECRET_KEY','TURNSTILE_SITE_KEY','DOWNLOAD_SIGNING_SECRET'].every(k=>process.env[k]) && process.env.DOWNLOAD_SIGNING_SECRET.length>=32 && (testMode()||!!smtpConfig());
const origin=()=>process.env.SITE_ORIGIN || 'https://www.kfgestao.com.br';
async function googleToken(diagnostic){
  diagnostic.stage='google_key'; diagnostic.httpStatus=null;
  const now=Math.floor(Date.now()/1000),enc=x=>Buffer.from(JSON.stringify(x)).toString('base64url');
  const body=enc({alg:'RS256',typ:'JWT'})+'.'+enc({iss:process.env.GOOGLE_CLIENT_EMAIL,scope:'https://www.googleapis.com/auth/spreadsheets',aud:'https://oauth2.googleapis.com/token',iat:now,exp:now+3600});
  const signature=crypto.sign('RSA-SHA256',Buffer.from(body),process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g,'\n')).toString('base64url');
  diagnostic.stage='google_auth';
  const r=await fetch('https://oauth2.googleapis.com/token',{method:'POST',body:new URLSearchParams({grant_type:'urn:ietf:params:oauth:grant-type:jwt-bearer',assertion:body+'.'+signature}),signal:AbortSignal.timeout(10000)});
  diagnostic.httpStatus=r.status;
  if(!r.ok) throw Error('Google authentication failed'); const token=await r.json(); if(!token.access_token) throw Error('Missing access token'); return token.access_token;
}
app.http('ebookConfig',{methods:['GET'],authLevel:'anonymous',route:'ebook-config',handler:async()=>json(200,{available:!!ready()&&campaignOpen(),campaignClosed:!campaignOpen(),testMode:testMode(),siteKey:ready()&&campaignOpen()?process.env.TURNSTILE_SITE_KEY:null,consentText:CONSENT,consentVersion:VERSION})});
app.http('ebookRegister',{methods:['POST'],authLevel:'anonymous',route:'ebook-register',handler:async(req)=>{
  if(!ready()) return json(503,{error:'O cadastro está temporariamente indisponível. Tente novamente mais tarde.'});
  if(!campaignOpen())return json(410,{error:'O período de solicitação gratuita deste material foi encerrado.'});
  if(req.headers.get('origin')!==origin()) return json(403,{error:'Origem não autorizada.'});
  if(!req.headers.get('content-type')?.includes('application/json')) return json(415,{error:'Formato inválido.'});
  let b,d;
  try { const raw=await req.text();if(Buffer.byteLength(raw)>12000)return json(413,{error:'Dados acima do limite.'}); b=JSON.parse(raw); d=validate(b); } catch {return json(400,{error:'Verifique os campos e tente novamente.'});}
  if(testMode() && (d.name!=='Teste KF'||d.email!=='test@example.com'||d.company!=='Teste'||d.challenge!==''||Object.values(b.campaign||{}).some(v=>v!=='')))return json(400,{error:'Modo de teste: utilize somente os dados fictícios fixos, sem desafio ou parâmetros de campanha.'});
  if(typeof b.captcha!=='string'||b.captcha.length>2048)return json(400,{error:'Conclua a verificação de segurança.'});
  const diagnostic={stage:'captcha_verify',httpStatus:null};
  try {
    const r=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',body:new URLSearchParams({secret:process.env.TURNSTILE_SECRET_KEY,response:b.captcha}),signal:AbortSignal.timeout(10000)});
    diagnostic.httpStatus=r.status;
    const c=await r.json(); if(!r.ok||!c.success||c.hostname!==new URL(origin()).hostname||c.action!=='ebook')return json(400,{error:'Refaça a verificação de segurança.'});
    const access=await googleToken(diagnostic);
    const range=encodeURIComponent("'Cadastros'!A:P");
    diagnostic.stage='google_write';diagnostic.httpStatus=null;
    const saved=await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(process.env.GOOGLE_SHEET_ID)}/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,{method:'POST',headers:{Authorization:'Bearer '+access,'Content-Type':'application/json'},body:JSON.stringify({values:[row(d)]}),signal:AbortSignal.timeout(10000)});
    diagnostic.httpStatus=saved.status;
    if(!saved.ok)throw Error('Sheet write failed'); diagnostic.stage='google_confirm'; const result=await saved.json();if(result.updates?.updatedRows!==1)throw Error('Write not confirmed');
    diagnostic.stage='download_sign';diagnostic.httpStatus=null;
    const downloadUrl='/api/ebook-download?token='+signDownload(process.env.DOWNLOAD_SIGNING_SECRET,Date.now(),86400000);
    let emailStatus;
    try { emailStatus=await sendEbook(d.email,new URL(downloadUrl,origin()).href,testMode()); }
    catch { emailStatus='unavailable'; }
    // SMTP aceito não é confirmação de entrega na caixa de entrada. A gravação já foi confirmada.
    return json(200,{downloadUrl,emailStatus});
  }catch{return json(503,{error:'Não conseguimos confirmar o cadastro. Tente novamente. Se a conexão caiu, o registro pode ter sido salvo.',...(testMode()?{diagnostic}:{})});}
}});
app.http('ebookDownload',{methods:['GET'],authLevel:'anonymous',route:'ebook-download',handler:async(req)=>{
  if(!ready()||!verifyDownload(req.query.get('token')||'',process.env.DOWNLOAD_SIGNING_SECRET))return json(403,{error:'Link inválido ou expirado. Faça o cadastro novamente para baixar.'});
  try{return {status:200,body:await fs.readFile(path.join(__dirname,'../material/KF_Planejamento_de_90_dias.pdf')),headers:{'Content-Type':'application/pdf','Content-Disposition':'attachment; filename="KF_Planejamento_de_90_dias.pdf"','Cache-Control':'no-store','Referrer-Policy':'no-referrer','X-Content-Type-Options':'nosniff'}};}catch{return json(503,{error:'Material temporariamente indisponível.'});}
}});
