'use strict';
const crypto = require('node:crypto');
const CONSENT = 'Quero receber conteúdos e ser contatado pela KF Gestão sobre suas soluções e o Programa Founders.';
const VERSION = '2026-10-08-v1';
const HEADERS = ['Data UTC','Nome','E-mail','Empresa','Desafio','Material','Origem','utm_source','utm_medium','utm_campaign','utm_term','utm_content','Contato comercial autorizado','Data da decisão UTC','Versão da autorização','Texto da autorização'];
function validate(b) {
  if (!b || typeof b !== 'object' || Array.isArray(b)) throw Error('Dados inválidos.');
  const text = (k,min,max) => { const v = typeof b[k] === 'string' ? b[k].trim() : ''; if(v.length < min || v.length > max || /[\x00-\x1f\x7f]/.test(v)) throw Error('Verifique os campos do formulário.'); return v; };
  const data = { name:text('name',2,120), email:text('email',3,254), company:text('company',2,160), challenge:text('challenge',0,1500) };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || typeof b.consent !== 'boolean' || b.consentVersion !== VERSION) throw Error('Verifique os dados e atualize a página.');
  if (b.website) throw Error('Não foi possível validar o cadastro.');
  data.consent=b.consent;
  data.campaign={};
  for(const k of ['utm_source','utm_medium','utm_campaign','utm_term','utm_content']) data.campaign[k]=typeof b.campaign?.[k]==='string' ? b.campaign[k].replace(/[\x00-\x1f\x7f]/g,'').slice(0,200):'';
  return data;
}
function row(d, now=new Date().toISOString()) { const safe=v=>typeof v==='string' && /^[\s]*[=+@-]/.test(v) ? "'"+v:v; return [now,d.name,d.email,d.company,d.challenge,'KF Planejamento de 90 dias — primeira edição revisada','site:/ebook/',...Object.values(d.campaign),d.consent,now,VERSION,CONSENT].map(safe); }
function signDownload(secret,now=Date.now()) { const payload=Buffer.from(JSON.stringify({exp:now+3600000})).toString('base64url');return payload+'.'+crypto.createHmac('sha256',secret).update(payload).digest('base64url'); }
function verifyDownload(token,secret,now=Date.now()) { try { const [p,s,...extra]=token.split('.'); if(extra.length) return false; const actual=Buffer.from(s,'base64url'),expected=crypto.createHmac('sha256',secret).update(p).digest();return actual.length===expected.length && crypto.timingSafeEqual(actual,expected) && JSON.parse(Buffer.from(p,'base64url')).exp>now; } catch { return false; } }
module.exports={validate,row,signDownload,verifyDownload,CONSENT,VERSION,HEADERS};
