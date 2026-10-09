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
