# Entrega revisada — 09/10/2026

## O que este pacote atualiza

Esta entrega é incremental para o projeto existente e a branch `feature/ebook-google-sheets`. Mantém Azure, Sheets, PDF aprovado, capa real e navegação original. Não altera FlutterFlow ou Supabase. Não contém chaves nem substitui as configurações dos ambientes.

- Campo obrigatório “Razão social da empresa”; nome e e-mail continuam obrigatórios.
- Autorização comercial facultativa e desmarcada, com entrega também em caso de recusa.
- Orientação para não incluir dados sensíveis ou informações de terceiros.
- Minuta de privacidade atualizada com as decisões confirmadas e sem afirmar contratos ou bases legais ainda não verificados.
- Código atual do diagnóstico seguro para o teste fictício; sem detalhes do fornecedor em produção.
- Testes de configuração pública, ausência de método de leitura, validação, UTM, consentimento, CAPTCHA, confirmação de gravação e assinatura do download.
- Registro das evidências e rotina operacional em REVISAO_PRIVACIDADE_E_VALIDACAO.md.

## Atualização no GitHub, sem publicar em produção

1. Extrair o ZIP. Ele contém somente arquivos revisados, dentro das pastas api, site, tests e docs.
2. Abrir o repositório atual no GitHub e selecionar `feature/ebook-google-sheets`. Conferir o nome da branch antes de enviar arquivos.
3. Usar Add file / Upload files na raiz do repositório. Enviar o conteúdo extraído preservando as pastas; não criar uma pasta adicional com o nome do ZIP.
4. Conferir que a página está em `site/ebook/index.html`, a política em `site/privacidade.html` e a função em `api/src/functions.js`.
5. Confirmar o commit nesta branch com a mensagem `Revisar cadastro B2B e privacidade do e-book`.
6. Aguardar a execução do GitHub Actions e conferir o ambiente do PR 1. Não fazer merge em main nesta etapa.

No ambiente 1, manter `PRIVACY_APPROVED=false`, `EBOOK_TEST_MODE=true` e SITE_ORIGIN correspondente ao endereço de revisão. Não é necessário recriar chaves para aplicar este pacote.

## Resultado da revisão

A implementação está preparada para revisão técnica e teste interno. A política permanece minuta: a decisão B2B do responsável está registrada, mas não demonstra, isoladamente, a necessidade de todos os dados pessoais. A hipótese proposta de legítimo interesse precisa de conclusão documentada sobre finalidade, necessidade e balanceamento.

As condições públicas consultadas explicam os serviços, mas não permitem afirmar qual instrumento contratual ou mecanismo de transferência está incorporado às contas efetivamente usadas. Não declarar contrato Workspace para a conta Google pessoal. Não apresentar o rótulo Global do Azure como garantia de processamento no Brasil.

## Pendências para liberar cadastros reais

1. Concluir a revisão da base legal da coleta obrigatória com apoio jurídico em privacidade, usando a justificativa e os fatos documentados. Não incluir aceite comercial obrigatório como solução.
2. Confirmar os termos das contas Google, Azure e Cloudflare e o mecanismo aplicável às transferências internacionais. Não compartilhar credenciais para essa revisão.
3. Incorporar somente os fatos confirmados à política; remover a identificação de minuta e o noindex quando o texto final estiver aprovado.
4. Revisar as variáveis do ambiente de produção separadamente. Uma chave foi aplicada em produção durante os testes; não presumir que os dois ambientes tenham configuração igual.
5. Na etapa de teste real autorizada, definir EBOOK_TEST_MODE=false, PRIVACY_APPROVED=true e a origem correta. Revalidar os dois consentimentos, gravação, UTM, PDF, celular, link de privacidade e Founders. Não divulgar uma campanha antes dessa validação.
6. Só depois aprovar o merge do PR para main, que aciona a publicação existente. Guardar o commit anterior para reversão pelo GitHub, observando que variáveis de ambiente precisam de revisão independente.

## Operação

Consultar somente os registros autorizados para contatos comerciais. Atender o canal contato@kfgestao.com.br e executar a revisão mensal de retenção já aceita. Excluir registros fictícios após encerrar os testes. A rotina de exclusão não é automática.

O pacote não envia e-mails, não cria painel de analytics e não registra leitura do PDF. Os eventos preparados não contêm os dados do formulário. A chave Google anteriormente exposta não deve ser reutilizada; o usuário informou que ela já não consta na lista de chaves.

Se o repositório for público, o PDF versionado nele pode ser obtido fora do formulário. Não prometer restrição absoluta de acesso; avaliar a visibilidade do repositório antes de divulgar.
