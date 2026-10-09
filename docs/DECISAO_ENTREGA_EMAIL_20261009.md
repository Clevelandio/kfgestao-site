# Decisão de escopo — entrega por e-mail

Registro de 09/10/2026, após esclarecimento do responsável pela KF. Este registro complementa a análise jurídica anterior; não afirma que a integração de envio esteja implementada.

## Finalidade e campos

A KF pretende oferecer gratuitamente, em campanha experimental de duração limitada, um material normalmente comercializado, destinado ao público empresarial. Os campos obrigatórios permanecem nome, e-mail e razão social. Nome identifica a pessoa solicitante; razão social identifica a organização declarada; e-mail será utilizado para entregar o material solicitado. A indicação da empresa é uma seleção declaratória do público, sem comprovação de existência, representação ou interesse efetivo.

O objetivo comercial da ação não transforma a solicitação em autorização de prospecção. A caixa comercial permanece facultativa e desmarcada. Quem a recusar deve receber o mesmo material por e-mail. Não utilizar o desafio opcional para abordagem posterior sem autorização.

Essa finalidade fortalece a pertinência dos campos. A necessidade e proporcionalidade continuam sendo avaliadas por campo, especialmente a razão social exata e a extensão do nome solicitado. A justificativa de entrega por e-mail só passa a corresponder ao fluxo quando o envio estiver efetivamente implementado e testado. Não declarar a base jurídica integralmente aprovada apenas por essa decisão empresarial.

## Fluxo a implementar após verificar o serviço de envio

1. Apresentar a oferta B2B e a entrega por e-mail antes do formulário.
2. Validar dados e proteção contra spam e confirmar gravação na planilha privada.
3. Enviar uma mensagem transacional individual com link para o PDF aprovado, independentemente da opção comercial.
4. Diferenciar cadastro salvo, envio aceito pelo fornecedor e efetiva entrega. Aceitação do fornecedor não prova recebimento na caixa de entrada.
5. Em falha de envio, informar que o cadastro foi salvo, tratar nova tentativa com proteção contra duplicidade e abuso e não afirmar que o e-mail foi enviado.
6. Manter o acesso ao download previsto nos requisitos, avaliando a validade do link para quem abre o e-mail mais tarde. A validade atual de uma hora foi criada para entrega imediata no navegador e deve ser revista para envio por e-mail.
7. Registrar somente metadados necessários do envio, com prazo e acesso definidos; não gravar segredos ou conteúdo completo em logs.

Mensagem proposta: assunto “Seu e-book KF Planejamento de 90 dias”; corpo com agradecimento pela solicitação, identificação do material, link de download e orientação para responder se houver problema de acesso. Não inserir sequência comercial ou rastreamento de abertura. O convite ao Founders permanece na confirmação da página conforme os requisitos existentes.

## Oferta limitada e retenção

O responsável aprovou uma campanha de duração limitada, mas não informou a data de encerramento. Não inventar uma data nem programar desligamento por estimativa. Após definir o período, avaliar solicitações, downloads e interesse comercial autorizado; clique não comprova leitura. Ao encerrar, suspender novas solicitações e informar o término da oferta, respeitando materiais já prometidos e pedidos de direitos.

A duração da campanha não substitui os prazos de retenção. Mantêm-se a decisão de excluir cadastros identificáveis sem autorização em até 30 dias da disponibilização e a revisão dos autorizados após 12 meses sem interação significativa. Implementar rotina compatível com esses compromissos e tratar exportações, cópias e históricos. Encerramento antecipado também exige avaliar se os dados continuam necessários.

## Resultado da inspeção técnica

O projeto atual tem integração Google Sheets, Cloudflare Turnstile e download no Azure. Não foi encontrada integração SMTP ou API de envio de e-mail, dependência de envio ou configuração documentada de fornecedor. A existência de contato@kfgestao.com.br não comprova o serviço que hospeda a caixa ou a capacidade de envio automático.

Informação necessária para concluir a implementação: fornecedor que hospeda contato@kfgestao.com.br (por exemplo, Hostinger Email, Titan, Google Workspace, Microsoft 365 ou outro). Verificar então conexão suportada, autenticação, limites, domínio remetente, contrato e transferências. Credenciais serão configuradas no backend; não solicitar senha ou chave por mensagem e não incluí-las no GitHub.

Não há motivo para recriar a planilha, trocar chaves Google ou migrar o site para adicionar esse envio. A escolha da integração depende do fornecedor real da caixa. Nenhum envio ou publicação foi realizado nesta etapa.

## Atualização de implementação — Hostinger confirmada

O usuário confirmou que contato@kfgestao.com.br está na Hostinger. Foi acrescentado envio SMTP após gravação, com mensagem transacional igual para os dois consentimentos, link de 24 horas, download de contingência e destinatário fixo da KF no modo de teste. Não foi configurada senha, realizado envio real ou publicado o código. As instruções atuais estão em ENVIO_HOSTINGER.md. A data de término da campanha continua pendente.
