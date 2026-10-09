'use strict';
// Returns fixed configuration names only; never includes supplied values.
function configIssues(env, testMode) {
  const issues = [];
  if (env.PRIVACY_APPROVED !== 'true' && !testMode) issues.push('PRIVACY_APPROVED');
  for (const key of ['GOOGLE_CLIENT_EMAIL', 'GOOGLE_PRIVATE_KEY', 'GOOGLE_SHEET_ID', 'TURNSTILE_SECRET_KEY', 'TURNSTILE_SITE_KEY', 'DOWNLOAD_SIGNING_SECRET']) {
    if (!env[key]) issues.push(key);
  }
  if (env.DOWNLOAD_SIGNING_SECRET && env.DOWNLOAD_SIGNING_SECRET.length < 32) issues.push('DOWNLOAD_SIGNING_SECRET');
  if (!testMode) {
    if (!['smtp.hostinger.com', 'smtp.titan.email'].includes(env.SMTP_HOST || 'smtp.hostinger.com')) issues.push('SMTP_HOST');
    if (![465, 587].includes(Number(env.SMTP_PORT || 465))) issues.push('SMTP_PORT');
    if (env.SMTP_USER !== 'contato@kfgestao.com.br') issues.push('SMTP_USER');
    if (!env.SMTP_PASSWORD) issues.push('SMTP_PASSWORD');
  }
  return issues;
}
module.exports = { configIssues };
