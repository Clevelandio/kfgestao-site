'use strict';

const SENDER = 'contato@kfgestao.com.br';
function smtpConfig(env = process.env) {
  const host = env.SMTP_HOST || 'smtp.hostinger.com';
  const port = Number(env.SMTP_PORT || 465);
  if (!['smtp.hostinger.com', 'smtp.titan.email'].includes(host) ||
      ![465, 587].includes(port) || env.SMTP_USER !== SENDER || !env.SMTP_PASSWORD) return null;
  return { host, port, secure: port === 465, requireTLS: true,
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASSWORD },
    tls: { minVersion: 'TLSv1.2', rejectUnauthorized: true },
    connectionTimeout: 5000, greetingTimeout: 5000, socketTimeout: 10000,
    logger: false, debug: false, disableFileAccess: true, disableUrlAccess: true };
}
function message(recipient, downloadUrl, testMode = false) {
  const url = new URL(downloadUrl);
  if (url.protocol !== 'https:' || url.pathname !== '/api/ebook-download') throw Error('Invalid download URL');
  const href = url.href.replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  return {
    from: { name: 'KF Gestão', address: SENDER }, to: { address: recipient }, replyTo: SENDER,
    subject: (testMode ? '[TESTE INTERNO] ' : '') + 'Seu e-book KF Planejamento de 90 dias',
    text: 'Obrigado por solicitar o e-book KF Planejamento de 90 dias — primeira edição revisada.\n\n' +
      'Baixar e-book gratuito:\n' + url.href + '\n\n' +
      'O link é válido por 24 horas. O material pode ser aplicado de forma independente.\n\n' +
      'Se houver algum problema de acesso, responda a esta mensagem.\n\n' +
      'Esta mensagem atende à sua solicitação do material e não inscreve você em comunicações comerciais.\n' +
      'KF Gestão — KF GESTAO INTELIGENCIA EMPRESARIAL LTDA\nCNPJ 69.216.720/0001-95\n' +
      'Privacidade: https://www.kfgestao.com.br/privacidade.html',
    html: '<!doctype html><html lang="pt-BR"><body style="margin:0;padding:24px;background:#f4f6f8;color:#172536;font-family:Arial,sans-serif;line-height:1.6">' +
      '<table role="presentation" style="width:100%;max-width:600px;margin:auto;background:#ffffff;border-collapse:collapse"><tr><td style="padding:28px">' +
      '<p style="font-weight:bold;color:#267572">KF Gestão</p><h1 style="font-size:24px;line-height:1.3">Seu e-book Planejamento de 90 dias</h1>' +
      '<p>Obrigado por solicitar a primeira edição revisada do material.</p>' +
      '<p style="margin:28px 0"><a href="' + href + '" style="display:inline-block;background:#267572;color:#ffffff;padding:14px 22px;text-decoration:none;border-radius:6px;font-weight:bold">Baixar e-book gratuito</a></p>' +
      '<p>O link é válido por 24 horas. O material pode ser aplicado de forma independente.</p>' +
      '<p>Se o botão não abrir, <a href="' + href + '">acesse o link de download</a> ou copie este endereço para o navegador:</p>' +
      '<p style="overflow-wrap:anywhere;word-break:break-all;font-size:12px">' + href + '</p>' +
      '<p>Se houver algum problema de acesso, responda a esta mensagem.</p>' +
      '<p style="font-size:12px">Esta mensagem atende à sua solicitação do material e não inscreve você em comunicações comerciais.</p>' +
      '<p style="font-size:12px">KF GESTAO INTELIGENCIA EMPRESARIAL LTDA<br>CNPJ 69.216.720/0001-95<br>' +
      '<a href="https://www.kfgestao.com.br/privacidade.html">Privacidade</a></p></td></tr></table></body></html>',
    disableFileAccess: true, disableUrlAccess: true
  };
}
async function sendEbook(recipient, downloadUrl, testMode = false) {
  const config = smtpConfig();
  if (!config) { if (testMode) return 'test_not_sent'; throw Error('SMTP configuration unavailable'); }
  // Testes nunca enviam para o endereço fornecido no formulário fictício.
  const target = testMode ? SENDER : recipient;
  const transport = require('nodemailer').createTransport(config);
  try {
    const result = await transport.sendMail(message(target, downloadUrl, testMode));
    if (!result.accepted?.some(value => String(value).toLowerCase() === target.toLowerCase()) || result.rejected?.length) {
      throw Error('SMTP recipient not accepted');
    }
    return testMode ? 'test_accepted' : 'accepted';
  } finally { transport.close(); }
}
module.exports = { smtpConfig, message, sendEbook };
