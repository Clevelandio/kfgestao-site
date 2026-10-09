# Cadastro do e-book — Google Sheets e Azure

Versão preparada na branch `feature/ebook-google-sheets`, sem publicação. O site existente continua em `site/index.html`. O `index.html` da raiz não é publicado e não foi alterado. O Supabase e o FlutterFlow não são utilizados nem alterados.

## Configuração necessária

1. Criar uma planilha Google privada, chamada por exemplo `KF — Cadastros e-book`, com uma aba **Cadastros**. Não ativar publicação na web nem acesso por link. Cabeçalhos de A1 a P1, nesta ordem:

   Data UTC | Nome | E-mail | Empresa | Desafio | Material | Origem | utm_source | utm_medium | utm_campaign | utm_term | utm_content | Contato comercial autorizado | Data da decisão UTC | Versão da autorização | Texto da autorização

2. No Google Cloud, criar ou escolher um projeto, ativar **Google Sheets API** e criar uma conta de serviço dedicada. Compartilhar somente esta planilha, como editor, com o e-mail da conta de serviço. Obter suas credenciais por um canal privado. Não colocar o JSON da chave no GitHub, no HTML nem em mensagens públicas. O papel de editor permite leitura/escrita dessa planilha: o serviço implementado expõe apenas gravação, sem endpoint de consulta.
3. Criar um widget Cloudflare Turnstile para `www.kfgestao.com.br`; guardar a chave pública e a secreta separadamente. Essa configuração de proteção é necessária para ativar o cadastro.
4. No Azure Static Web Apps, nas configurações de ambiente da API, preencher:

| Variável | Valor |
|---|---|
| GOOGLE_CLIENT_EMAIL | E-mail da conta de serviço |
| GOOGLE_PRIVATE_KEY | Campo private_key do JSON, com quebras reais ou `\n` |
| GOOGLE_SHEET_ID | ID da planilha, encontrado na URL entre `/d/` e `/edit` |
| TURNSTILE_SITE_KEY | Chave pública do widget |
| TURNSTILE_SECRET_KEY | Chave secreta do widget |
| DOWNLOAD_SIGNING_SECRET | Segredo aleatório forte, com pelo menos 32 caracteres |
| SITE_ORIGIN | `https://www.kfgestao.com.br` |
| PRIVACY_APPROVED | Manter `false` até substituir a minuta por uma política revisada; depois `true` |

5. Revisar e finalizar `site/privacidade.html`: identificação do responsável, bases legais, retenção, acesso, exclusão, direitos e fornecedores. Só então remover a identificação de minuta e o `noindex`. Não há política aprovada no repositório original. A implementação não estabelece prazos ou bases legais por conta própria.

## GitHub e hospedagem

O workflow existente foi ajustado de `api_location: ""` para `api_location: "/api"`. A pasta publicada continua `/site`. O runtime declarado é Node 22. A API usa o modelo v4 de Azure Functions. A infraestrutura real deve ser validada em ambiente de revisão antes de promover para produção.

Criar um pull request desta branch para `main` é o caminho recomendado para revisão. O workflow já prevê ambientes de pull request. Não enviar primeiro os arquivos para `main`: isso publicará automaticamente. Para testar no ambiente de revisão, configurar credenciais próprias desse ambiente, uma planilha de teste, o domínio desse ambiente no Turnstile e SITE_ORIGIN correspondente.

## Verificações antes de publicar

- Cadastro com autorização desmarcada e marcada; ambos precisam gerar uma linha e liberar o material.
- Obrigatórios, e-mail inválido, falha de rede e captcha inválido; nenhum sucesso antes da confirmação da API Sheets.
- Comparar a linha gravada com os 16 cabeçalhos e conferir horário UTC, versão e texto.
- Abrir planilha em janela anônima: não deve exibir registros. Testar GET em `/api/ebook-register`: não há rota de leitura.
- Confirmar download, assinatura inválida e expiração em uma hora. PDF guardado em `api/material`, fora da pasta pública.
- Conferir celular, teclado, foco, rótulos e mensagens; repetir a busca FAQ e contatos do site original.
- Não selecionar cadastros com autorização `false` para ações comerciais. Retirada posterior de autorização precisa de processo manual definido pela KF.

## Mensuração e limitações

Eventos locais `kf:ebook-event`: `ebook_page_view`, `ebook_registration_complete`, `ebook_download_click`, `ebook_founders_click`. Não existe provedor de analytics no site original; esses eventos estão preparados, mas não geram um painel nem persistência de métricas. O payload contém apenas nome do evento e material. Uma integração posterior deve manter esses limites e não enviar URL com UTM arbitrários, nome, e-mail ou desafio.

Clique no botão não comprova download concluído nem leitura. Não há envio automático de e-mail. Não há criação de conta. A confirmação usa a resposta de gravação da Sheets API; falha de rede após gravação pode gerar duplicação numa nova tentativa, pois não há garantia transacional de idempotência no Google Sheets. O bloqueio de duplo clique é local, e o captcha reduz spam; não existe rate limiter distribuído. Monitorar consumo e reforçar controles caso o volume exija.

O Google Sheets não é um CRM e a autorização registrada é uma evidência de coleta, não um sistema completo de gestão de preferências. Não ordenar manualmente só parte das colunas. Fazer cópias de segurança conforme a política definida. O link temporário pode ser compartilhado enquanto válido: não é vinculado a uma conta.

## Testes locais

`node --test tests/ebook.test.js` verifica validação, autorização facultativa, neutralização de fórmulas e assinatura/expiração do download. Testes reais de Azure, Turnstile e Sheets dependem das configurações acima. Testes com serviços simulados não substituem esses testes integrados.


## Política operacional — decisões e pendências

- Acesso humano inicial: somente o responsável da KF; acesso técnico pela conta de serviço restrita à planilha. Novos acessos devem ser nominativos e revisados.
- Ativar autenticação de dois fatores nas contas Google, Azure e Cloudflare. Confirmar ativação nos painéis; não presumir que esteja ativa.
- Sem autorização comercial: excluir o cadastro identificável em até 30 dias da entrega. Não usar estes contatos em prospecção.
- Com autorização comercial: revisão após 12 meses sem interação significativa; excluir ou anonimizar quando não houver finalidade atual. Estes prazos foram aprovados pelo responsável em 08/10/2026; são escolhas operacionais, não prazos legais universais.
- Revisar mensalmente os registros vencidos e excluir também cópias/exportações controladas pela KF. A implementação atual não executa exclusão automática nem controla o histórico interno dos fornecedores.
- Solicitações de acesso, correção, exclusão e retirada da autorização: canal confirmado e acompanhado pelo responsável: contato@kfgestao.com.br. Interromper contatos após retirada; registrar o atendimento com o mínimo de dados necessário.
- Manter finalidade e base legal documentadas separadamente para entrega, contatos comerciais, segurança e eventuais registros necessários. Revisar bases legais e condições de transferência internacional antes de aprovar a política.
- Não coletar dados sensíveis nem informações pessoais de terceiros no desafio de gestão. Não enviar dados do formulário para analytics/publicidade.
- Não publicar a política como aprovada até confirmar identificação do controlador, canal de atendimento, prazos, pessoas com acesso e condições dos fornecedores.

Controlador confirmado: KF GESTAO INTELIGENCIA EMPRESARIAL LTDA, CNPJ 69.216.720/0001-95. A aprovação dos prazos e do canal não substitui a verificação dos fornecedores nem a validação da integração. Manter PRIVACY_APPROVED=false até concluir a revisão.
