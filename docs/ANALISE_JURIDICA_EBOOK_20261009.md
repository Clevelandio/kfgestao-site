# Cadastro do e-book KF — análise jurídica e técnica

Data: 09/10/2026. Responsável pelo tratamento informado: KF GESTAO INTELIGENCIA EMPRESARIAL LTDA, CNPJ 69.216.720/0001-95. Canal confirmado: contato@kfgestao.com.br.

Esta é uma análise assistida por IA, fundamentada em fontes oficiais e nas evidências disponíveis; não é um parecer assinado por advogado nem uma auditoria das contas dos fornecedores. Distingue conclusões jurídicas, fatos verificados e recomendações. Nenhuma publicação, alteração de configuração ou aprovação jurídica é executada por este documento.

## Atualização posterior ao esclarecimento da finalidade

O responsável esclareceu que a oferta temporária gratuita destina um material normalmente comercializado a empresas, identificadas por pessoa solicitante e razão social declarada, e que pretendia entrega por e-mail desde o início. Confirmou Hostinger como fornecedor da caixa. O código agora prepara envio transacional após gravação, sem condicionar entrega ao consentimento comercial; o SMTP real ainda não foi configurado/testado. Assim, as referências abaixo à ausência de envio descrevem o fluxo examinado inicialmente e não a implementação local posterior. Essa mudança fortalece a necessidade do e-mail para entrega, mas não comprova todos os campos ou contratos. Ver DECISAO_ENTREGA_EMAIL_20261009.md e ENVIO_HOSTINGER.md.

## Conclusão executiva

O cadastro B2B para acesso a um material gratuito não é proibido por si só. A arquitetura pode permanecer no Azure, acrescentando a página e uma integração separada das operações dos clientes. Porém, o funcionamento do formulário e a decisão empresarial de exigir dados não comprovam, por si, a licitude de todos os tratamentos.

O consentimento comercial separado, desmarcado e facultativo está corretamente estruturado. Os principais pontos abertos são: necessidade da coleta inicial, sobretudo do e-mail sem entrega por e-mail; instrumento e destinos das transferências de cada fornecedor; execução da retenção prometida; governança do armazenamento na conta pessoal. A recomendação é conservar o modo de teste até resolver esses pontos. Isso decorre dos fatos ainda não comprovados, e não de uma exigência genérica de contratar advogado ou migrar toda a hospedagem.

## 1. Escopo e evidências

Foram examinados o formulário, o código do navegador, o backend, a minuta de privacidade, a documentação do projeto, os testes e o contrato Azure fornecido. As confirmações do usuário demonstram cadastro e download com e sem autorização comercial, registros TRUE/FALSE na planilha e funcionamento no celular. O link da planilha exigiu autenticação em janela anônima.

O PDF é entregue no navegador após a confirmação de gravação. Não existe envio automático de e-mail. A integração não utiliza Supabase nem altera os dados operacionais dos clientes. O código prepara quatro eventos locais, sem conectar uma ferramenta externa de analytics. Esses fatos limitam as justificativas que podem ser apresentadas ao visitante.

Não foram auditados integralmente logs e backups dos fornecedores, histórico de permissões, condições específicas de todas as contas, eventual publicidade já existente em outras páginas ou termos contratuais completos do DPA Microsoft atual. Não se pode concluir que todo o site esteja coberto por um aviso destinado apenas ao cadastro do e-book.

## 2. Nome, e-mail e razão social obrigatórios

### A LGPD se aplica ao cadastro B2B

Nome e e-mail de um representante empresarial continuam sendo dados pessoais. Razão social de uma pessoa jurídica, isoladamente, não é necessariamente dado pessoal, mas pode identificar uma pessoa natural em determinados casos; sua associação ao cadastro integra a análise de proteção de dados. O uso de uma conta pessoal Google em atividade econômica da KF não transforma esse tratamento em atividade exclusivamente particular isenta da LGPD.

A lei não exige esses três campos para liberar um PDF, nem impõe um CNPJ para esse tipo de conteúdo. A empresa pode definir uma oferta voltada ao público empresarial, mas deve demonstrar finalidade, adequação e necessidade. A escolha voluntária do visitante ajuda a demonstrar expectativa; não dispensa essa análise.

### Bases legais possíveis e seus limites

| Operação | Base que pode ser avaliada | Condição essencial |
| --- | --- | --- |
| Registro da solicitação B2B | Legítimo interesse, art. 7º, IX, combinado com art. 10 | Finalidade concreta, necessidade de cada dado, expectativas e balanceamento favorável documentados. |
| Atendimento de uma relação contratual gratuita efetivamente estabelecida | Execução de contrato ou procedimento preliminar solicitado, art. 7º, V | Demonstrar a relação e a necessidade dos dados para atendê-la. O título “cadastro” não torna todos os campos necessários. |
| Comunicações comerciais | Consentimento, art. 7º, I | Ato livre, informado, específico, demonstrável e revogável. |
| Segurança e prevenção de abuso com dados comuns | Legítimo interesse, sujeito a balanceamento | Sinais limitados e proporcionais; não justifica conservar indiscriminadamente o formulário. |
| Cumprimento de obrigação efetivamente aplicável | Art. 7º, II | Identificar a obrigação e os dados abrangidos. Não foi encontrada obrigação geral de conservar os três campos para esta entrega. |

Não recomendo trocar a base apenas para produzir uma aparência de regularidade, nem acrescentar um aceite genérico de política para “resolver” a coleta. Consentimento comercial não cobre retroativamente a coleta de quem o recusou. Uma política é informação sobre o tratamento, não uma autorização universal.

### Necessidade por campo

| Campo | Justificativa empresarial identificada | Avaliação do fluxo atual |
| --- | --- | --- |
| Nome | Identificar a pessoa que solicita o material | É pertinente ao cadastro, mas a necessidade de identificação nominativa para uma entrega direta ainda exige justificativa. Não exigir nome completo se o primeiro nome cumprir a finalidade. |
| E-mail | Identificar o cadastro e realizar relacionamento quando autorizado | É o ponto mais frágil: o PDF não é enviado por e-mail e a recusa impede uso comercial. A validação sintática não verifica titularidade, não evita registros falsos nem constitui autenticação. |
| Razão social | Identificar a organização no contexto B2B | É coerente com o público, mas razão social exata pode ser mais informação que o nome empresarial suficiente. O campo livre não comprova existência da empresa ou poderes de representação. |
| Desafio opcional | Contextualizar uma necessidade de gestão | É pertinente quando voluntário e limitado. Não transformar esse relato em licença para prospecção sem autorização. Risco de dados sensíveis e dados de terceiros exige orientação e procedimento de remoção. |

A declaração “só pessoas interessadas se cadastrarão” demonstra uma expectativa comercial, mas não responde à pergunta sobre meios menos intrusivos. Um registro sem e-mail, um identificador de solicitação ou um nome empresarial menos formal devem ser comparados no teste de necessidade, mesmo que a KF prefira a oferta com cadastro.

**Conclusão:** manter os três campos é uma decisão empresarial confirmada; sua justificativa jurídica ainda não está demonstrada integralmente. O legítimo interesse é uma hipótese possível, não uma aprovação automática. Para sustentá-lo, registrar a razão concreta de manter cada campo mesmo com recusa comercial, a alternativa examinada e o motivo de ela não atender à finalidade. Se não houver razão suficiente, reduzir a coleta. Não inventar envio de e-mail, obrigação fiscal ou prevenção de fraude para justificar o que o sistema não faz.

### Teste de balanceamento já iniciado

- Finalidade: registrar solicitações de um conteúdo de gestão dirigido a empresas e produzir indicadores da ação. É uma finalidade comercial possível e delimitável.
- Necessidade: ainda insuficientemente demonstrada para nome nominativo, e-mail e razão social exata; registrar as alternativas e decidir com evidência.
- Expectativas: a página informa cadastro, finalidade e opção comercial; ajuda a transparência. Não pressupor expectativa de abordagem quando houve recusa.
- Impactos: mensagens indesejadas, acesso indevido, vinculação pessoa/empresa, exposição do desafio, transferências e conservação desnecessária.
- Salvaguardas: consentimento separado, download com recusa, acesso restrito, backend com segredos, CAPTCHA, retenção curta, canal de direitos e eventos sem formulário.
- Resultado: pendente na etapa de necessidade. As salvaguardas técnicas não superam uma coleta excessiva.

## 3. Consentimento comercial

O texto escolhido — “Quero receber conteúdos e ser contatado pela KF Gestão sobre suas soluções e o Programa Founders.” — delimita quem comunica e o assunto. A combinação de conteúdos e contato sobre as próprias soluções pode ser apresentada como uma finalidade de relacionamento comercial coerente, desde que não seja ampliada para publicidade de terceiros ou outros canais sem informação adequada.

Manter a caixa separada e desmarcada, sem impedir o download com FALSE. Não inserir aceite comercial dentro de termos obrigatórios. Informar ao lado da opção que a autorização é facultativa, revogável e não interfere na entrega. Indicar o canal efetivamente utilizado; com a integração atual, o canal disponível é o e-mail informado. Não acrescentar WhatsApp ou telefone que não foram coletados.

O registro atual de decisão, data, versão e texto é adequado como evidência inicial. A data usa UTC; isso deve ser considerado na interpretação dos horários. O sistema não verifica que o e-mail pertence ao solicitante: confirmação adicional pode fortalecer a prova, mas não foi implementada e não é apresentada aqui como obrigação universal de double opt-in.

Antes de cada campanha: selecionar somente consentimentos válidos, conferir revogações e registros duplicados, e oferecer saída fácil. Um TRUE antigo não deve prevalecer automaticamente sobre retirada posterior. Nova inscrição sem autorização não cria nova permissão. Uma lista de bloqueio ou evidência mínima de revogação pode ser avaliada para evitar recontato, com base, acesso e prazo próprios; não conservar toda a ficha indefinidamente sob essa justificativa.

O convite ao Founders na confirmação é conteúdo exibido no próprio fluxo solicitado. Não autoriza comunicações posteriores com quem recusou contatos. A negativa comercial não impede mensagens estritamente necessárias para atender direitos ou tratar incidentes, com finalidade própria e sem promoção.

## 4. Retenção, exclusão e atendimento

Os 30 dias e 12 meses são escolhas de governança da KF, não prazos obrigatórios gerais da LGPD. Retenção curta não torna legítima uma coleta desnecessária. A finalidade concluída ou a perda de necessidade pode exigir término antes do prazo máximo.

### Ajuste necessário na rotina

A redação anterior prometia exclusão em até 30 dias e revisão mensal. Se um registro atingir 30 dias logo após a revisão, pode ficar quase 60 dias. Recomendo executar verificações semanais, eliminando antecipadamente os registros que completariam 30 dias antes da próxima verificação, ou automatizar a exclusão com acompanhamento. Essa rotina ainda precisa ser adotada; não foi executada nem automatizada por esta análise.

Para registros autorizados, a decisão existente é revisão após 12 meses sem interação significativa, com exclusão se não houver finalidade atual. Isso é um marco de revisão, não uma autorização para prorrogação indefinida. Definir interação significativa como resposta ou conversa efetiva do titular, por exemplo; mero disparo da KF ou clique técnico de download não deve reiniciar o prazo automaticamente. Estabelecer data de revisão, decisão e motivo de eventual conservação limitada. Não mudar silenciosamente o compromisso para um prazo máximo diverso.

Separar cadastro comercial, prova mínima de autorização/revogação, pedidos de direitos e logs técnicos. Cada categoria exige finalidade e prazo próprios. Exceções de obrigação legal ou disputa concreta precisam ser identificadas e restritas; “guardar para segurança jurídica” não é prazo nem autorização genérica.

O art. 15 do Marco Civil prevê seis meses para registros de acesso de provedores de aplicações que se enquadrem em seus requisitos. Avaliar o enquadramento do site econômico da KF e o que a hospedagem efetivamente mantém. Esses registros são categoria distinta e não justificam conservar nome, e-mail, empresa e desafio por seis meses. Não afirmar que a aplicação já cumpre essa guarda sem verificar a configuração.

### Exclusão real

Excluir as linhas não prova eliminação imediata em histórico de versões do Sheets, lixeira, exportações, cópias locais, backups ou logs. Levantar o ciclo de cada serviço e as possibilidades reais de expurgo. Retirar o dado do uso ativo, tratar cópias sob controle da KF, comunicar a eliminação aos agentes pertinentes e documentar limites técnicos. Ao restaurar backup, reaplicar exclusões e revogações para não reintroduzir dados. Não prometer controle sobre backups de fornecedores que a KF não possui.

### Direitos e prazos

| Situação | Regra ou procedimento |
| --- | --- |
| Confirmação ou acesso | Regra geral: resposta simplificada imediata ou declaração completa em até 15 dias da solicitação, conforme art. 19. São dias, não “15 dias úteis”. |
| Correção, eliminação, bloqueio e outros direitos | Não atribuir automaticamente o prazo de acesso a todos os pedidos. Se a providência imediata não for possível, explicar os motivos e tratar conforme os requisitos e prazos aplicáveis. |
| Retirada do consentimento | Meio gratuito e facilitado; interromper novos usos comerciais após processamento da solicitação, sem esperar a revisão mensal. Não desfaz o tratamento anteriormente lícito. |
| Identidade | Verificação proporcional antes de divulgar ou alterar dados. Evitar solicitar documento por padrão; pedir informação adicional apenas quando necessária. |
| Cláusulas usadas em transferência | Quando aplicável ao mecanismo adotado, disponibilização em até 15 dias conforme art. 17 da Resolução 19/2024. |

Agentes de pequeno porte elegíveis podem ter flexibilizações de prazos e dispensa de encarregado segundo a Resolução 2/2022. Porte, faturamento, grupo econômico e natureza do tratamento precisam ser verificados; o CNPJ ou o uso de plano gratuito não comprovam elegibilidade. Recomendo conservar o compromisso mais simples de acesso completo em 15 dias e manter o canal existente. Não denominar o responsável como encarregado formal sem a definição correspondente.

Acompanhar a caixa de contato em dias úteis; registrar recebimento, validação proporcional, decisão e conclusão. Responder de modo seguro e sem expor dados de terceiros. Para incidente com risco ou dano relevante, a Resolução 15/2024 estabelece comunicação à ANPD e aos titulares, em regra em três dias úteis do conhecimento de que o incidente afetou dados pessoais; agentes elegíveis de pequeno porte têm regras diferenciadas. Manter plano de resposta e registro dos incidentes, inclusive dos não comunicados, pelo mínimo regulamentar de cinco anos. Não confundir esse registro com conservação de todos os cadastros.

## 5. Azure, Google Sheets e Cloudflare

### Papéis e contratos

| Fornecedor | Fluxo observado | Conclusão e pendência |
| --- | --- | --- |
| Microsoft Azure | Hospeda site e API e processa o formulário | O portal confirmou Microsoft Customer Agreement ativo desde 06/02/2026. O documento fornecido incorpora DPA na cláusula geral, mas contém termos suplementares para certos usuários individuais. Nome pessoal na cobrança não basta para decidir o enquadramento. Falta fechar aplicabilidade ao serviço/assinatura, DPA atual, logs, destinos e transferências. |
| Google Sheets | Recebe e conserva os cadastros em planilha privada da conta pessoal | A restrição técnica funciona. Termos de Drive individual protegem a privacidade do arquivo, mas isso não comprova o instrumento contratual para cadastros de terceiros. Criar projeto Google Cloud e conta de serviço não converte a planilha em Workspace nem comprova que o DPA Cloud cobre esse armazenamento. |
| Cloudflare Turnstile | Processa sinais técnicos de acesso e valida token contra spam | O adendo específico distingue operador na proteção do site e controlador no aperfeiçoamento da detecção. O DPA público atual, versão 6.4 de 03/04/2026, contempla acordos self-service; gratuidade não significa ausência de contrato. Falta comprovar termos incorporados à conta e mecanismo brasileiro de transferência para o fluxo. |

No Azure/Sheets, não atribuir automaticamente papel único para todas as atividades: processamento do conteúdo, administração de conta, segurança e dados de serviço podem ter enquadramentos diferentes conforme contrato. A classificação deve seguir a atividade concreta.

O código da KF não encaminha nome, e-mail, empresa ou desafio ao Turnstile, mas ele recebe sinais como IP, navegador, TLS e origem. Portanto, é incorreto dizer que o CAPTCHA não trata dados pessoais ou que Cloudflare atua sempre apenas como operador. Não atribuir a esse uso publicidade que não está demonstrada, nem prometer ausência absoluta de cookies técnicos.

### Conta Google pessoal

Não identifiquei proibição geral na LGPD de usar Sheets pessoal para esta finalidade. Recomendo conta administrada em nome da KF, com contrato verificável, controle de recuperação e continuidade, autenticação multifator e acessos mínimos. Uma conta pessoal pode tornar mais difícil separar patrimônio informacional da empresa, sucessão do responsável, administração de acesso e comprovação contratual.

Workspace é uma alternativa de governança, não uma exigência nominal da lei nem garantia automática de regularidade. Antes de pagar ou migrar, conferir os termos do produto e as cláusulas brasileiras aplicáveis. Outra alternativa é armazenamento separado na infraestrutura existente, se contratos e controles forem demonstrados. Não migrar dados de clientes nem hospedar segredos no navegador para resolver essa questão.

### Transferências internacionais

É necessário distinguir a base legal para tratar dados no Brasil do mecanismo que permite transferi-los ao exterior. Consentimento comercial não é consentimento específico de transferência do art. 33, VIII. Não recomendo acrescentar uma autorização genérica de transferência como atalho para manter fornecedores sem análise contratual.

A Resolução 19/2024 disciplina mecanismos e transparência. Para usar as cláusulas-padrão brasileiras, o instrumento precisa incorporar integralmente o texto aplicável e preencher os elementos da operação; cláusulas europeias, certificação ou declaração geral de cumprir a LGPD não substituem automaticamente esse mecanismo. O prazo de transição de 12 meses previsto na resolução já terminou em 2025.

Atualização relevante: a Resolução 32/2026 reconheceu adequação para União Europeia e o âmbito nela definido, incluindo Islândia, Liechtenstein e Noruega. Essa decisão não regulariza automaticamente processamento nos Estados Unidos nem transferências posteriores para outros países. Não presumir localização a partir do domínio, sede comercial ou rótulo “Global” do Azure.

A página Google de mecanismos de transferência menciona adequação e cláusulas, inclusive brasileiras. É evidência de política geral do fornecedor; ainda falta relacionar essa cobertura ao fluxo, conta e contrato da KF. O DPA Cloudflare examinado contém disciplina europeia e Global CBPR; não foi localizada nele referência expressa a cláusulas brasileiras. Isso identifica uma pendência de comprovação, não prova impossibilidade definitiva de usar o serviço. O DPA Microsoft atual não foi obtido integralmente nesta leitura; não há conclusão sobre suas cláusulas brasileiras.

Solicitar/obter de cada fornecedor: entidade contratante e papel; produtos abrangidos; destinos e subprocessadores; mecanismo do art. 33; documento e versão incorporados; duração e exclusão; atendimento de direitos e incidentes. Guardar evidência de aceitação pela KF. Publicar em português os países e informações exigidas para o mecanismo usado. “Podemos tratar dados no exterior” mais três links de políticas é informação insuficiente para fechar essa análise.

## 6. Segurança e mensuração

Controles positivos: segredos no backend, planilha privada, API de cadastro sem rota pública de consulta, validação, proteção de fórmulas, CAPTCHA validado no servidor, confirmação após gravação e link temporário do PDF. A conta de serviço é Editor da planilha: seu privilégio não é exclusivamente de escrita, embora a API desenvolvida só grave cadastros. Verificar acesso restrito à planilha necessária e proteção da chave nova; o usuário informou revogação da chave anteriormente exposta.

CAPTCHA e comparação de origem não equivalem a autenticação ou bloqueio distribuído de abuso. A arquitetura não tem idempotência nem limite distribuído de requisições: nova tentativa após falha de conexão pode duplicar registro. Monitorar volume e implementar limites proporcionais se necessário.

Parâmetros UTM ligados à ficha identificável também participam do tratamento pessoal. Campanhas não devem embutir nome, e-mail ou identificadores individuais. Os eventos preparados não incluem o formulário. Antes de conectar analytics, verificar configuração, URL completa, cookies e fornecedores; não deixar token de download ou dado pessoal em eventos. Clique de download não comprova leitura.

## 7. Texto consolidado e decisão para finalização

O arquivo POLITICA_PRIVACIDADE_EBOOK_REVISAO_20261009.md contém redação consolidada e blocos exatos que dependem de confirmação. Ele não deve ser publicado como política final enquanto esses blocos estiverem abertos. Seria inexato declarar aprovados a base inicial, os destinos ou um instrumento contratual não comprovado.

Não alterei os campos obrigatórios nem ativei produção. Para finalizar:

1. Resolver o teste de necessidade, especialmente e-mail sem entrega por e-mail e razão social exata. Registrar conclusão ou aprovar ajuste dos campos.
2. Comprovar a cobertura contratual e as transferências de cada conta; definir continuidade e controle da conta Google. Não solicitar ou publicar chaves secretas como evidência.
3. Adotar rotina que respeite o limite de 30 dias; definir revisão de consentimentos, cópias, históricos e logs. Confirmar o procedimento antes de prometer sua execução.
4. Preencher apenas os fatos documentados no aviso consolidado, aprovar texto e procedimento, validar a versão de produção e só então publicar no fluxo GitHub/Azure existente.

## Fontes oficiais

Consultadas em 09/10/2026. As conclusões aplicadas à KF são análise, não pronunciamento da ANPD sobre este projeto.

- LGPD, texto compilado: https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm — arts. 3º–10, 15–19, 33–39, 41, 46–49.
- ANPD, Guia de Legítimo Interesse: https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia_legitimo_interesse.pdf
- ANPD, Resolução 19/2024, com retificação indicada no acervo: https://www.gov.br/anpd/pt-br/acesso-a-informacao/institucional/atos-normativos/regulamentacoes_anpd/resolucao-cd-anpd-no-19-de-23-de-agosto-de-2024
- ANPD, acervo vigente e Resolução 32/2026: https://www.gov.br/anpd/pt-br/acesso-a-informacao/institucional/atos-normativos/regulamentacoes_anpd
- Reprodução oficial do DOU, Resolução 32/2026, TSE: https://sintse.tse.jus.br/documentos/2026/Jan/27/para-conhecimento-institucional/agencia-nacional-de-protecao-de-dados-resolucao-no-32-de-26-de-janeiro-de-2026-dispoe-sobre-o
- ANPD, Resolução 2/2022: https://www.gov.br/anpd/pt-br/acesso-a-informacao/institucional/atos-normativos/regulamentacoes_anpd/resolucao-cd-anpd-no-2-de-27-de-janeiro-de-2022
- Resolução 15/2024, reprodução pelo Governo de Mato Grosso do Sul: https://www.lgpd.ms.gov.br/wp-content/uploads/2024/05/REGULAMENTO-DE-COMUNICACAO-DE-INCIDENTE-DE-SEGURANCA-ABRIL-2024-ANPD-.pdf
- Marco Civil da Internet: https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2014/lei/l12965.htm — art. 15.
- Microsoft, catálogo DPA vigente: https://www.microsoft.com/licensing/docs/view/Microsoft-Products-and-Services-Data-Protection-Addendum-DPA — edição anunciada de maio de 2026; conteúdo integral não obtido nesta revisão.
- Contrato Azure fornecido pelo usuário: document Azure.docx; não contém o DPA completo atual.
- Google, termos Drive: https://www.google.com/drive/terms-of-service/
- Google, mecanismos de transferência: https://policies.google.com/privacy/frameworks?hl=pt-BR
- Cloudflare, adendo Turnstile: https://www.cloudflare.com/turnstile-privacy-policy/
- Cloudflare, DPA v6.4: https://www.cloudflare.com/cloudflare-customer-dpa/
