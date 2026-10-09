# E-book por e-mail — configuração e teste no Azure

Versão de 09/10/2026. Código preparado e testado localmente com fornecedores simulados. Envio real e aceitação da Hostinger ainda dependem de configuração no ambiente de revisão. Não houve publicação nem mudança de DNS.

## O que foi acrescentado

- SMTP autenticado e criptografado pelo backend Azure, com Nodemailer 10.0.16 fixado no package-lock.
- Gravação na planilha antes do envio. Ambos os consentimentos recebem a mesma mensagem transacional.
- Remetente fixo contato@kfgestao.com.br. A mensagem inclui somente o material e o link de download, sem empresa, desafio, promoção ou pixel de abertura.
- Download continua disponível na confirmação, inclusive quando o SMTP falha. Cadastro salvo, mensagem aceita e recebimento efetivo são estados distintos.
- Links novos valem 24 horas para permitir abertura posterior do e-mail. Não modificam o PDF e são compartilháveis durante a validade. Links antigos preservam o vencimento já assinado.
- Modo fictício envia somente para contato@kfgestao.com.br. Se não houver SMTP configurado, informa explicitamente que nenhum e-mail foi enviado.
- Encerramento opcional por data: bloqueia novas solicitações, mas preserva links válidos já emitidos. Não elimina cadastros automaticamente.

## Primeiro: atualizar somente a branch de revisão

Enviar as pastas do pacote incremental para a raiz do repositório existente na branch feature/ebook-google-sheets. Não enviar uma pasta com o nome do ZIP. Conferir especialmente api/src/email.js, api/package.json e api/package-lock.json. Aguardar GitHub Actions. Não fazer merge para main enquanto a política e o teste integrado estiverem pendentes.

## Depois: configurar no ambiente 1 do Azure

No recurso Azure Static Web Apps kfgestao, abrir as configurações de ambiente da API e selecionar **o ambiente de revisão 1**, correspondente ao PR. Acrescentar as variáveis abaixo; manter as variáveis Google e Turnstile já existentes.

| Nome | Valor |
| --- | --- |
| SMTP_HOST | smtp.hostinger.com, se confirmado nos detalhes SMTP da conta Hostinger Email |
| SMTP_PORT | 465 |
| SMTP_USER | contato@kfgestao.com.br |
| SMTP_PASSWORD | Senha da caixa de e-mail, inserida diretamente no Azure; não é a senha de login do painel Hostinger |

Conservar PRIVACY_APPROVED=false, EBOOK_TEST_MODE=true e SITE_ORIGIN=https://proud-mud-0d7110710-1.centralus.2.azurestaticapps.net nesse ambiente.

A documentação oficial Hostinger informa SMTP smtp.hostinger.com:465 com SSL/TLS e alternativa 587 com STARTTLS. Se o painel identificar Titan, usar o servidor confirmado smtp.titan.email; o código aceita somente esses dois hosts e as portas 465/587. Não trocar servidores por tentativa sem verificar o produto contratado. Na porta 587, STARTTLS é obrigatório; certificados continuam validados.

Não enviar a senha em conversa, imagem ou arquivo; não colocá-la no GitHub. Não é necessário recriar nenhuma chave Google. Não mudar MX ou DNS do domínio apenas para adicionar esse envio. Conferir no painel se SPF/DKIM estão válidos e os limites efetivos do plano antes de liberar campanha; não presumir quantidade gratuita de mensagens.

## Teste integrado necessário

1. Abrir /ebook/ no endereço de revisão. A página mantém nome Teste KF, test@example.com e empresa Teste, com os demais dados fictícios fixos.
2. Cadastrar com a caixa comercial desmarcada. Conferir a linha FALSE e receber na caixa contato@kfgestao.com.br o assunto iniciado por [TESTE INTERNO]. O endereço fictício nunca será o destinatário SMTP nesse modo.
3. Abrir o link da mensagem e baixar o PDF correto. Repetir com caixa marcada, conferindo TRUE e a mesma entrega.
4. Confirmar que a tela diz “mensagem aceita”, sem afirmar recebimento garantido. Conferir spam e eventuais avisos de devolução na caixa remetente.
5. Se houver falha, a tela deve indicar cadastro salvo sem confirmação de envio, mantendo o botão de download. Não repetir cadastros em sequência para tentar resolver credenciais. Rever variáveis no ambiente 1 e eventual bloqueio/limite da Hostinger.

Não foram realizados esses testes reais pelo agente. Os 20 testes locais cobrem consentimento, gravação, SMTP simulado, destinatário fixo de teste, TLS, falhas sem exposição de segredos, expiração e encerramento.

## Campanha limitada

Quando a KF escolher a data, configurar EBOOK_CAMPAIGN_ENDS_AT com instante ISO 8601 e fuso explícito. Formato: AAAA-MM-DDTHH:MM:SS-03:00. Não copiar o formato como valor. Uma data inválida fecha novas inscrições por segurança; ausência de valor mantém a campanha aberta. O backend verifica o vencimento em cada solicitação, sem precisar de tarefa agendada.

Ainda falta definir a data real. Duração da oferta, exclusão dos cadastros e validade de links são decisões distintas. Retenção não está automatizada. Para cumprir exclusão em até 30 dias, a rotina precisa antecipar vencimentos antes da próxima verificação, não apenas remover registros vencidos uma vez por mês.

## Limites e privacidade

A confirmação SMTP significa aceitação do destinatário pelo servidor, não entrega comprovada. Não há fila durável, reenvio automático ou webhook de entrega. A resposta pode falhar depois da gravação ou do envio; nova tentativa pode gerar duplicidade. O CAPTCHA reduz spam, mas não substitui limite distribuído. Monitorar solicitações e limites do e-mail, sobretudo antes de anúncios amplos.

Não foi acrescentado armazenamento de status de e-mail na planilha: seus 16 campos foram preservados. O servidor retorna um estado mínimo ao navegador, sem mensagem bruta do SMTP. Não há logging de credenciais ou conteúdo da mensagem pelo código. A caixa e os servidores de e-mail podem manter conteúdo, destinatário e registros conforme as condições do serviço; incluir esse tratamento na análise de retenção e transferências.

Hostinger passa a integrar a cadeia de fornecedores e recebe o e-mail destinatário e a mensagem com link temporário; não recebe nome, razão social, desafio ou consentimento comercial por esse envio. Os servidores do destinatário também participam da entrega. Antes da liberação, atualizar o aviso e concluir contratos/destinos aplicáveis; a informação “hospedado na Hostinger” não prova um país de processamento.

Referências oficiais consultadas:

- SMTP Hostinger: https://www.hostinger.com/br/support/4305847-como-configurar-os-e-mails-da-hostinger-em-dispositivos-e-plataformas/
- Limites do e-mail: https://www.hostinger.com/br/support/4625828-parametros-e-limites-dos-e-mails-da-hostinger/
- Privacidade Hostinger: https://www.hostinger.com/legal/privacy-policy
- Nodemailer SMTP: https://nodemailer.com/smtp

O DPA oficial Hostinger (https://www.hostinger.com/legal/dpa), revisado em 29/09/2026, inclui Email Services e menciona LGPD. É evidência contratual relevante, mas não estabelece sozinho os destinos reais ou o mecanismo brasileiro de toda a operação; verificar conta/entidade e subprocessadores. Não declarar essa pendência resolvida apenas pela página pública.
