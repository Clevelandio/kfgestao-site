const test=require('node:test'),assert=require('node:assert/strict'),Module=require('node:module');
const {smtpConfig,message,sendEbook}=require('../api/src/email');
const base={SMTP_USER:'contato@kfgestao.com.br',SMTP_PASSWORD:'synthetic-password'};
test('SMTP exige remetente fixo, servidor permitido e transporte seguro',()=>{
 const c=smtpConfig(base);assert.equal(c.host,'smtp.hostinger.com');assert.equal(c.port,465);assert.equal(c.secure,true);assert.equal(c.requireTLS,true);assert.equal(c.tls.rejectUnauthorized,true);
 assert.equal(smtpConfig({...base,SMTP_HOST:'attacker.example'}),null);assert.equal(smtpConfig({...base,SMTP_PORT:25}),null);assert.equal(smtpConfig({...base,SMTP_USER:'other@example.com'}),null);assert.equal(smtpConfig({...base,SMTP_PASSWORD:''}),null);
 const fallback=smtpConfig({...base,SMTP_PORT:587});assert.equal(fallback.secure,false);assert.equal(fallback.requireTLS,true);
});
test('mensagem transacional usa link do PDF sem desafio, empresa, promoção ou tracking',()=>{
 const m=message('test@example.com','https://www.kfgestao.com.br/api/ebook-download?token=test');assert.deepEqual(m.to,{address:'test@example.com'});assert.match(m.text,/24 horas/);assert.match(m.text,/ebook-download/);assert.doesNotMatch(m.text,/Conheça o Programa|utm_|<img|desafio/);assert.equal(m.html,undefined);assert.equal(m.attachments,undefined);
 assert.throws(()=>message('test@example.com','http://www.kfgestao.com.br/api/ebook-download?token=x'));
});
test('envio real usa destinatário solicitado, teste usa só caixa da KF e aceitação é exigida',async()=>{
 const old=Module._load,saved={};for(const k of ['SMTP_USER','SMTP_PASSWORD','SMTP_HOST','SMTP_PORT']){saved[k]=process.env[k];delete process.env[k];}Object.assign(process.env,base);let accepted=true,messages=[],closed=0;
 Module._load=function(name,...args){if(name==='nodemailer')return {createTransport:()=>({sendMail:async m=>{messages.push(m);return {accepted:accepted?[m.to.address]:[],rejected:accepted?[]:[m.to.address]};},close:()=>closed++})};return old.call(this,name,...args);};
 try{const url='https://www.kfgestao.com.br/api/ebook-download?token=x';assert.equal(await sendEbook('person@example.com',url),'accepted');assert.equal(messages[0].to.address,'person@example.com');assert.equal(await sendEbook('person@example.com',url,true),'test_accepted');assert.equal(messages[1].to.address,'contato@kfgestao.com.br');assert.match(messages[1].subject,/TESTE INTERNO/);accepted=false;await assert.rejects(sendEbook('person@example.com',url));assert.equal(closed,3);}
 finally{Module._load=old;for(const [k,v]of Object.entries(saved)){if(v===undefined)delete process.env[k];else process.env[k]=v;}}
});
