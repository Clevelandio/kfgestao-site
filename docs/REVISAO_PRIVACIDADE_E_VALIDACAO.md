# E-book KF — revisão e validação

Registro de 09/10/2026. Versão para revisão; não constitui aprovação jurídica nem autorização de publicação. A política continua como minuta e `PRIVACY_APPROVED=false`. O modo de teste aceita somente os dados fictícios definidos no código, no ambiente de revisão 1.

## Evidências técnicas

| Verificação | Evidência e alcance |
| --- | --- |
| Cadastro e armazenamento | Usuário confirmou sucesso no Azure de revisão e visualizou registros na aba Cadastros. |
| Autorização facultativa | Registros separados com FALSE e TRUE, data, versão e texto da decisão; download disponível nos dois casos. |
| PDF | Usuário confirmou download correto no computador e no celular. O conteúdo do PDF aprovado permanece inalterado. |
| Founders | Convite abriu a seção existente do site. |
| Celular | Usuário confirmou formulário e download funcionando; avaliação visual detalhada não foi realizada neste registro. |
| Planilha privada | Link aberto em janela anônima solicitou autenticação. Isso verifica o link da planilha, não constitui auditoria completa de permissões. |
| Tratamento de falhas | Erro real impediu confirmação e download; testes locais cobrem falha de gravação, CAPTCHA, origem, token e diagnóstico sem segredos. |
| Mensuração | Eventos locais têm somente evento e material. Não há ferramenta externa de analytics conectada por esta implementação; clique não comprova leitura. |

Os testes com fornecedores simulados complementam os testes reais; não demonstram disponibilidade permanente dos serviços. A versão pública com dados reais e campanhas UTM ainda precisa de validação após a decisão sobre a política.

## Avaliação preliminar da coleta

Finalidade declarada: oferecer material de planejamento para empresários, registrar solicitações e, somente mediante autorização facultativa, iniciar contatos sobre conteúdos, soluções e Founders.

O interesse comercial é compreensível, mas isso não demonstra por si só a necessidade de todos os campos. A avaliação de legítimo interesse permanece inconclusiva:

| Dado | Finalidade prevista | Questão a resolver |
| --- | --- | --- |
| Nome | Identificação da solicitação | Justificar a obrigatoriedade para entrega imediata no navegador. |
| E-mail | Identificação e eventual relacionamento autorizado | Não há envio automático. Sem autorização comercial, justificar sua necessidade para o download. |
| Empresa | Entender o público empresarial | Avaliar se pode ser opcional sem comprometer a finalidade. |
| Desafio | Contextualização facultativa | Orientar a não incluir dados sensíveis ou dados de terceiros; não usar em abordagem comercial quando houver recusa. |
| Data, material e decisão | Registrar atendimento e autorização/recusa | Limitar retenção e acesso ao necessário. |
| UTM e origem | Atribuir solicitações a campanhas | Usar identificadores de campanha sem dados pessoais; preferir estatísticas agregadas após excluir cadastros. |

Salvaguardas já previstas: decisão comercial separada e desmarcada; entrega com recusa; planilha restrita; credenciais no backend; CAPTCHA; retenção curta para recusas; canal de direitos; ausência de envio do formulário a analytics. Essas medidas não substituem a avaliação de necessidade e balanceamento.

Decisão pendente da KF com revisão jurídica: documentar finalidade, necessidade, expectativas e impactos, e confirmar a base legal da coleta inicial. Se a necessidade dos campos obrigatórios não for sustentada, revisar o formulário. Não alterar os requisitos silenciosamente nem apresentar o aceite da política como autorização comercial.

### Decisão empresarial confirmada em 09/10/2026

O responsável decidiu manter nome, e-mail e razão social da empresa obrigatórios. Justificativa declarada: cadastrar solicitações de empresas interessadas em conteúdo de gestão, dentro da estratégia B2B da KF. A página informa os campos antes do envio; o visitante escolhe solicitar o material. O campo visível foi atualizado para “Razão social da empresa”, preservando a estrutura técnica e a coluna Empresa na planilha.

A autorização comercial permanece separada, facultativa e desmarcada. A recusa não impede a entrega nem autoriza prospecção posterior. A solicitação voluntária e a transparência são salvaguardas; não constituem, isoladamente, conclusão sobre a base legal ou a necessidade de cada campo. A decisão empresarial está confirmada; a avaliação jurídica da coleta inicial e dos fornecedores permanece pendente. Não justificar o e-mail como requisito de envio do PDF, pois a entrega ocorre no navegador.

## Fornecedores e transferências

| Serviço observado | Conclusão possível | Confirmação necessária |
| --- | --- | --- |
| Azure Static Web Apps Free | Hospedagem e backend existentes; não é necessário migrar para Hostinger para acrescentar a página. | Contrato aplicável à assinatura e DPA incorporado; condições de logs, processamento e transferência. O rótulo Global do portal não prova armazenamento exclusivo no Brasil. |
| Sheets em conta Google pessoal | Armazenamento privado funciona tecnicamente. | Termos aplicáveis à conta pessoal, responsabilidade no tratamento e mecanismo de transferência. Não presumir cobertura pelo contrato do Workspace ou Google Cloud. |
| Cloudflare Turnstile | Verificação contra spam antes da gravação. | Condições aplicáveis ao uso, dados técnicos tratados e informações a apresentar na política. |

As páginas gerais dos fornecedores não comprovam sozinhas que um mecanismo contratual específico foi incorporado às contas da KF. Não afirmar que todos os dados ficam no Brasil nem que as transferências já estão regularizadas.

Referências oficiais consultadas em 09/10/2026:

- ANPD, guia de legítimo interesse: https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia_legitimo_interesse.pdf
- ANPD, Resolução 19/2024: https://www.gov.br/anpd/pt-br/acesso-a-informacao/institucional/atos-normativos/regulamentacoes_anpd/resolucao-cd-anpd-no-19-de-23-de-agosto-de-2024
- Microsoft, documentos do DPA: https://www.microsoft.com/licensing/docs/view/Microsoft-Products-and-Services-Data-Protection-Addendum-DPA
- Azure, contratos: https://azure.microsoft.com/pt-br/support/legal/
- Google, termos gerais: https://policies.google.com/terms?hl=pt-BR
- Google, mecanismos de transferência: https://policies.google.com/privacy/frameworks?hl=pt-BR
- Cloudflare, privacidade do Turnstile: https://www.cloudflare.com/turnstile-privacy-policy/

## Rotina aceita pelo responsável

Responsável: KF GESTAO INTELIGENCIA EMPRESARIAL LTDA, CNPJ 69.216.720/0001-95. Canal confirmado: contato@kfgestao.com.br. Acompanhamento e revisão mensal aceitos pelo usuário.

1. Acompanhar o canal de privacidade e registrar pedido, data, providência e conclusão sem criar cópias desnecessárias dos dados.
2. Verificar identidade de forma proporcional, preferindo o e-mail do cadastro; não pedir documento por padrão.
3. Ao receber retirada de autorização, interromper novos contatos comerciais e atualizar o controle. Tratar o pedido de exclusão conforme a finalidade e obrigações efetivamente aplicáveis.
4. Excluir cadastros identificáveis sem autorização comercial em até 30 dias da entrega. Revisar mensalmente registros autorizados com 12 meses sem interação significativa, excluindo quando não houver finalidade atual.
5. Incluir exportações e cópias sob controle da KF no procedimento; não afirmar exclusão imediata de backups dos fornecedores sem conhecer suas condições.
6. Restringir abordagens comerciais aos registros com TRUE e revisar a lista antes de utilizá-la. Não enviar mensagens automaticamente.
7. Após encerrar a validação, remover somente os registros fictícios de teste.

## Antes da publicação

- Resolver e registrar a avaliação de necessidade e base legal da coleta inicial.
- Confirmar os termos aplicáveis às contas dos fornecedores e o mecanismo de transferência; consolidar a política a partir de fatos confirmados.
- Revisar as variáveis de produção separadamente: uma chave Google foi aplicada em produção durante a configuração, conforme relato do usuário. Não copiar automaticamente as configurações do ambiente 1.
- Manter segredos fora do GitHub; usuário informou que a chave antiga exposta já não aparece na lista de chaves.
- Aprovar o texto final, validar o cadastro com dados reais somente no ambiente autorizado e conferir armazenamento, campanhas e eventos.
- Preparar publicação no fluxo existente de GitHub/Azure com possibilidade de reversão. Este documento não executa merge nem publicação.

Limites conhecidos: exclusões são manuais; link de download é compartilhável durante sua validade; uma falha de conexão após gravação pode gerar nova tentativa duplicada. A disponibilização do PDF em repositório público, se mantida, permite acesso fora do formulário e deve ser considerada na estratégia de distribuição.
