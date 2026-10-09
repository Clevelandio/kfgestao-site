const test=require('node:test'),assert=require('node:assert/strict');
const {validate,row,signDownload,verifyDownload,VERSION}=require('../api/src/core');
const input={name:'Teste KF',email:'teste@example.com',company:'Empresa Teste',challenge:'',consent:false,consentVersion:VERSION,campaign:{utm_source:'linkedin'}};
test('recusa e autorização são registradas sem bloquear cadastro',()=>{for(const consent of [false,true]){const d=validate({...input,consent});const r=row(d);assert.equal(r.length,16);assert.equal(r[12],consent);assert.equal(r[14],VERSION);assert.equal(r[7],'linkedin');}});
test('campos obrigatórios e booleano são validados',()=>{for(const bad of [{name:''},{email:'invalido'},{company:''},{consent:'false'},{consentVersion:'antigo'},{website:'spam'}])assert.throws(()=>validate({...input,...bad}));});
test('fórmulas de planilha são neutralizadas',()=>{const r=row(validate({...input,name:'=IMPORTXML("x")',challenge:'+formula'}));assert.equal(r[1][0],"'");assert.equal(r[4][0],"'");});
test('link temporário exige assinatura íntegra e não expirada',()=>{const secret='x'.repeat(32),token=signDownload(secret,1000);assert.equal(verifyDownload(token,secret,2000),true);assert.equal(verifyDownload(token,'y'.repeat(32),2000),false);assert.equal(verifyDownload(token,secret,3601001),false);assert.equal(verifyDownload(token+'x',secret,2000),false);});
