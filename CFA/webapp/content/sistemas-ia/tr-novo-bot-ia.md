---
title: "TR Novo — Bot IA"
slug: "sistemas-ia/tr-novo-bot-ia"
parent: "sistemas-ia"
kind: "leaf"
status: "rascunho"
owner: "Nelly Miranda"
tags: []
summary: "Termo de Referência técnico para a contratação da solução de CRM, automação de processos e Bot IA, com requisitos funcionais, SLA, POC e cronograma, com base no modelo real usado pelo CRC-ES."
updated: "2026-08-04"
---

## Dois Termos de Referência, dois propósitos

O programa CFA/CRAs trabalha com dois documentos de Termo de Referência distintos, e é importante não confundi-los:

- **TR Macro** ([documentos/plano-implementacao/tr-macro](/documentos/plano-implementacao/tr-macro)) é o Termo de Referência institucional do programa: define o objeto amplo da cooperação entre CFA e CRAs, o escopo metodológico do Método Vértice e as condições gerais de contratação da consultoria de transformação digital.
- **TR Novo — Bot IA** (esta página) é um Termo de Referência **técnico**, específico para a contratação da solução de tecnologia em si — a plataforma de CRM, os módulos de automação de processos e o Bot IA descritos nas páginas [Bitrix24](/sistemas-ia/bitrix24) e [Inteligência Artificial](/sistemas-ia/ia). Ele desce ao nível de requisito funcional codificado, SLA, prova de conceito e cronograma de implantação.

Este TR Novo tem como base um modelo real de Termo de Referência já utilizado por um Conselho Regional (o CRC-ES, Conselho Regional de Contabilidade do Espírito Santo), adaptado como referência técnica para a contratação da solução de CRM e Bot IA no âmbito do Sistema CFA/CRAs. Os quantitativos, prazos e valores citados abaixo refletem a contratação de um único Regional e servem como parâmetro de dimensionamento técnico, não como orçamento do programa nacional — o investimento específico do programa CFA/CRAs, que envolve múltiplos Regionais, está tratado separadamente em Investimento do Projeto.

## Objeto da contratação

Contratação de empresa especializada para prestação de serviços de transformação digital, por meio da implantação de solução integrada de gestão e automação de processos de negócio e de relacionamento com o público (CRM), abrangendo análise, otimização, automação e digitalização dos processos de atendimento e gestão de tarefas, atividades e projetos do órgão contratante. O serviço é prestado em modalidade cloud computing, com vigência contratual de 12 meses, prorrogável na forma da Lei nº 14.133/2021.

## Módulos da solução

A solução contempla cinco módulos principais, o último deles incorporado especificamente para a camada de inteligência artificial:

| Módulo | Cobertura |
|---|---|
| Colaboração e Comunicação | Mensageria (RF-COM), videoconferência (RF-VID), gestão de grupos de trabalho e projetos (RF-GRP), documentos online (RF-DOC), base de conhecimento (RF-BC), calendários compartilhados (RF-CAL) e assistente de IA para colaboração (RF-IA). |
| Atendimento Multicanal | Contact center central (RF-CC), canais integrados — WhatsApp Business, Telegram, Facebook Messenger, Instagram Direct (RF-CAN), estatísticas de atendimento (RF-EST) e telefonia IP (RF-TEL). |
| CRM | Pipelines Kanban (RF-KAN), gestão de negócios e oportunidades (RF-NEG), automação e workflows no CRM (RF-AUT), assistente de IA para CRM (RF-IACRM), gestão de contatos e empresas (RF-CON) e relatórios/BI (RF-BI). |
| Automação de Processos | Regras de automação por etapa (RF-RAUT) e fluxos de trabalho configuráveis (RF-WF). |
| Atendimento com Inteligência Artificial (Bot IA) | Quatorze blocos funcionais (RF-BOTIA-001 a 079), descritos em detalhe na página [Inteligência Artificial](/sistemas-ia/ia): NLP, gestão de diálogo, integração com CRM, aprendizado de máquina, relatórios, multicanalidade, gestão de prazos, especialização por setor, coleta estruturada, conformidade legal, análise preditiva, feedback de qualidade, segurança/LGPD e atendimento fora do horário comercial. |

## Requisitos não funcionais

| Categoria | Exigência mínima |
|---|---|
| Performance | Resposta em até 3 segundos para 95% das operações; suporte a 100 usuários simultâneos; disponibilidade de 99,5% em horário comercial. |
| Segurança | Criptografia de dados sensíveis em trânsito e repouso, autenticação multifator, controle de acesso por perfil, auditoria de todas as ações, backup automático diário. |
| Usabilidade | Interface intuitiva e responsiva, conformidade com WCAG 2.1, idioma português brasileiro, documentação e treinamento inclusos. |
| Integração | API REST, webhooks, importação e exportação de dados em múltiplos formatos. |
| Conformidade | Aderência integral à LGPD (Lei nº 13.709/2018), com retenção configurável, portabilidade e exclusão completa de dados. |

## Integrações previstas

A solução deve integrar-se a canais de comunicação (WhatsApp Business API oficial, Facebook Messenger, Instagram Direct, e-mail SMTP/IMAP), a ferramentas de produtividade (Google Workspace, Google Sheets, calendários e videoconferência externos) e a sistemas técnicos de autenticação (Active Directory, LDAP) e integração (APIs REST próprias, webhooks).

## Consultoria prévia de mapeamento de processos

Antes de qualquer configuração de ferramenta, o TR exige consultoria especializada e obrigatória de mapeamento e desenho de processos (as is / to be), cobrindo no mínimo os setores de Administração e TI, Atendimento (cobrança e registro), Desenvolvimento Profissional, Fiscalização e Operacional (gestão de pessoal, recepção e protocolo). Esta exigência reafirma, no nível contratual, o princípio metodológico central do programa: a ferramenta é configurada em cima do processo já redesenhado, nunca o ponto de partida.

## Banco de horas técnicas

Previsão de 200 horas/ano de banco de horas para manutenção evolutiva e customização, utilizadas somente mediante solicitação formal e justificada, sem obrigatoriedade de uso pleno do quantitativo contratado.

## Prova de conceito (POC)

A POC valida, antes da contratação definitiva, que a solução proposta atende tecnicamente aos requisitos do projeto, por meio de cinco cenários obrigatórios:

1. Cadastro completo de pessoa física/jurídica com vínculo profissional e geração de protocolo único.
2. Fluxo de atendimento via WhatsApp com movimentação entre etapas do Kanban e registro de conclusão.
3. Consulta e relatório — busca por CPF/registro/nome, histórico e exportação de dados.
4. Integração de canais — e-mail, WhatsApp e formulário do site convergindo no sistema central.
5. Bot IA — atendimento simulado via WhatsApp com compreensão de linguagem natural, roteamento automático e criação de card no CRM.

| Categoria | Peso | Critério mínimo |
|---|---|---|
| Funcionalidades core | 40% | 90% dos requisitos críticos |
| Performance | 20% | Tempo de resposta inferior a 3s |
| Usabilidade | 15% | Interface intuitiva validada com usuários |
| Segurança | 15% | Controles básicos auditados |
| Escalabilidade | 10% | Suporte comprovado à expansão |

Nota mínima para aprovação: 80%.

## Acordo de Nível de Serviço (SLA)

Disponibilidade mínima de 99,5% em horário comercial (segunda a sexta, 8h às 18h), com indisponibilidade máxima mensal de aproximadamente 4 horas e 24 minutos.

| Severidade | Impacto | Resposta máxima | Solução máxima |
|---|---|---|---|
| Nível 1 — Crítico | Parada total do sistema ou de módulo essencial | 15 minutos | 4 horas úteis |
| Nível 2 — Alto | Degradação significativa ou impacto a muitos usuários | 30 minutos | 12 horas úteis |
| Nível 3 — Médio | Funcionalidades não essenciais ou usuários isolados | 2 horas úteis | 24 horas úteis |
| Nível 4 — Baixo | Melhorias ou erros que não impedem a operação | 8 horas úteis | 48 horas úteis |

O descumprimento do SLA sujeita a contratada às sanções administrativas da Lei nº 14.133/2021 (advertência, multa contratual e demais sanções cabíveis).

## Cronograma de implantação

| Etapa | Descrição | Entregáveis |
|---|---|---|
| 1. Planejamento e mapeamento | Kick-off, cronograma detalhado, consultoria de análise e modelagem de processos | Cronograma aprovado; documento de mapeamento e desenho de processos (to be) |
| 2. Implementação e parametrização | Instalação e configuração de todos os módulos; testes iniciais do Bot IA | Ambiente de homologação configurado e liberado |
| 3. Consultoria de fluxo de atendimento | Personalização de fluxos e telas por setor | Documento de mapeamento por setor |
| 4. Implantação por setor | Automação avançada, pipelines exclusivos, configuração do Bot IA por setor | Ambiente de homologação atualizado; Bot IA treinado por setor |
| 5. Testes, treinamento e homologação | Testes unitários e integrados, migração de dados, treinamento de usuários, testes de aceitação (UAT) | Plano de testes; material de treinamento; aceite provisório |
| 6. Entrada em produção e aceite definitivo | Go-live, monitoramento assistido na primeira semana | Solução em produção; relatório final; termo de aceite definitivo |

## Critérios de medição e pagamento

O pagamento das etapas de implantação é vinculado a entregáveis (20% na instalação e parametrização inicial, 30% na consultoria de modelagem de processos, 30% na implantação e execução por setor, 20% na capacitação e treinamento), enquanto licenciamento, suporte e banco de horas seguem regime de pagamento continuado (anual, mensal ou sob demanda, conforme o item).

## Estimativa de valor: referência de um único Regional

O modelo do CRC-ES estima o custo total da contratação em **R$ 366.308,20** para o período contratual, estruturado em três blocos: serviços técnicos de pagamento único (consultoria de mapeamento, consultoria de implementação, treinamento), licenciamento e assinaturas de pagamento recorrente (plataforma colaborativa, WhatsApp Business API, módulo de IA/Bot IA, telefonia IP) e banco de horas sob demanda (200 horas/ano). Este valor corresponde à contratação de **um único Conselho Regional** com 100 usuários licenciados, e não deve ser lido como estimativa do programa nacional CFA/CRAs, que envolve múltiplos Regionais em ondas de implantação sucessivas. O dimensionamento financeiro específico do programa está tratado em Investimento do Projeto.

## Qualificação técnica e equipe mínima do fornecedor

O TR exige comprovação de experiência em mapeamento e modelagem de processos (as is/to be), desenvolvimento e implementação de soluções de CRM e automação inteligente (RPA/BPM), desenho e automação de pipelines e fluxos de aprovação, integração com canais digitais (WhatsApp Business API, redes sociais, telefonia IP) e capacitação de usuários finais e técnicos. A equipe técnica mínima recomendada reúne consultor de processos sênior, analista de automação, especialista em plataforma de CRM e comunicação digital, e instrutor/treinador técnico.

