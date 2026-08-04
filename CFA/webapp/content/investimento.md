---
title: Investimento do Projeto
slug: investimento
parent: null
kind: leaf
status: rascunho
owner: Nelly Miranda
tags: []
summary: >-
  Estrutura de investimento em três blocos (serviços técnicos, licenciamento
  recorrente e banco de horas), com os valores do TR Novo do CRC-ES como
  referência de mercado de um único Regional, não do programa nacional.
updated: '2026-08-04'
---
## Visão geral

Nenhum dos cinco documentos que fundamentam o programa nacional (Apresentação Executiva, Projeto Técnico-Científico, Plano de Implantação, Termo de Referência macro e Matriz de Governança e Indicadores) fecha um valor de investimento. Isso é proposital: o programa cobre o CFA e todos os CRAs, com níveis de maturidade tecnológica e porte muito diferentes entre si, e o dimensionamento financeiro completo só pode ser feito depois do diagnóstico previsto no Plano de Implantação, Regional por Regional.

O que já existe, e que esta página organiza, é a estrutura de investimento, ou seja, os blocos de custo que qualquer contratação desse tipo precisa prever, e uma referência de mercado concreta: o Termo de Referência técnico já formalizado pelo CRC-ES para contratar CRM, automação de processos e Bot IA (o "TR Novo com Bot IA", detalhado em [Sistemas e IA](/sistemas-ia/tr-novo-bot-ia)). Os valores desse TR são de um único Conselho Regional e não devem ser lidos como o custo do programa nacional CFA/CRAs, que é necessariamente maior e ainda será dimensionado.

## Estrutura em blocos

A experiência do CRC-ES mostra que uma contratação deste tipo se organiza em três blocos de natureza orçamentária distinta, e essa mesma lógica deve orientar o dimensionamento do programa nacional.

### Bloco A. Serviços técnicos de implantação (investimento, pagamento único)

Cobrem o trabalho de consultoria necessário para colocar o sistema em operação em cada Regional, tipicamente medido em horas de equipe especializada:

- Consultoria de mapeamento e modelagem de processos (diagnóstico e desenho do "as is" e "to be", conforme o núcleo de Diagnóstico do Método Vértice)
- Consultoria de implementação e parametrização (configuração da plataforma, dos fluxos e das integrações)
- Treinamento e capacitação de usuários finais e equipes técnicas do Regional

É despesa de investimento, paga uma única vez por onda de implantação, e escala com o número de Regionais atendidos e com a complexidade de cada um.

### Bloco B. Licenciamento e assinaturas recorrentes (custeio, pagamento anual ou mensal)

Cobrem o direito de uso continuado da plataforma e dos canais integrados a ela, enquanto o sistema estiver em operação:

- Licenciamento da plataforma de CRM e automação (Bitrix24), dimensionado por número de usuários
- Assinatura de canais de comunicação oficiais (WhatsApp Business API e equivalentes)
- Assinatura do módulo de inteligência artificial integrado ao CRM (Bot IA)
- Suporte técnico e manutenção, quando não incluído no valor de licenciamento

É despesa de custeio, recorrente, e representa o compromisso financeiro de longo prazo do programa, distinto do investimento inicial de implantação.

### Bloco C. Banco de horas sob demanda (investimento, sob demanda)

Cobre customizações, integrações e desenvolvimentos adicionais que surgem depois da implantação inicial, não previstos no escopo fechado dos blocos A e B:

- Horas de desenvolvimento e customização, consumidas apenas mediante solicitação formal e aprovação prévia do Regional ou do CFA, que define escopo, estimativa de horas e cronograma antes de qualquer execução

Esse bloco evita dois problemas comuns: contratar horas demais que nunca são usadas, ou travar o sistema por falta de horas quando uma necessidade legítima aparece depois da entrega.

## Referência de mercado: TR Novo do CRC-ES

A tabela abaixo reproduz a estimativa de valor da contratação do TR Novo com Bot IA, formalizada pelo CRC-ES. Ela serve como piso de referência de mercado para os três blocos, na escala de **um único Regional de porte médio**, não como o valor do programa nacional.

| Bloco | Item | Unidade | Qtd. | Valor unitário | Valor total | Natureza |
|---|---|---|---|---|---|---|
| A. Serviços técnicos | Consultoria de mapeamento e modelagem de processos (280h) | Serviço | 1 | R$ 48.061,60 | R$ 48.061,60 | Investimento |
| A. Serviços técnicos | Consultoria de implementação e parametrização (580h) | Serviço | 1 | R$ 192.482,60 | R$ 192.482,60 | Investimento |
| A. Serviços técnicos | Treinamento e capacitação de usuários (150h) | Serviço | 1 | R$ 13.428,00 | R$ 13.428,00 | Investimento |
| B. Licenciamento e assinaturas | Licenciamento plataforma colaborativa (100 usuários) | SaaS, mês | 12 | R$ 1.399,00 | R$ 13.428,00 | Custeio |
| B. Licenciamento e assinaturas | Assinatura WhatsApp Business API oficial | Mês | 12 | R$ 450,00 | R$ 5.400,00 | Custeio |
| B. Licenciamento e assinaturas | Assinatura módulo de IA integrado ao CRM (Bot IA) | Mês | 12 | R$ 1.330,00 | R$ 15.960,00 | Custeio |
| B. Licenciamento e assinaturas | Assinatura sistema de telefonia IP (50 ramais, 5 simultâneas) | Mês | 12 | R$ 1.129,00 | R$ 13.548,00 | Custeio |
| B. Licenciamento e assinaturas | Suporte técnico e manutenção | Mês | 12 | Incluso | R$ 0,00 | Custeio |
| C. Banco de horas | Banco de horas de desenvolvimento e customização | Hora | 200 | R$ 320,00 | R$ 64.000,00 | Investimento |
| — | **Valor global estimado (CRC-ES, 1 Regional)** | | | | **R$ 366.308,20** | — |

Desse total, os Blocos A e C somam aproximadamente R$ 318 mil de investimento (R$ 253,9 mil de serviços técnicos de implantação mais R$ 64 mil do banco de horas inicial), enquanto o Bloco B representa cerca de R$ 48,3 mil por ano de custeio recorrente de licenciamento e assinaturas, valor que se repete a cada exercício enquanto o contrato estiver vigente.

## O que ainda falta dimensionar

Os números acima não podem ser multiplicados diretamente pelo número de CRAs para chegar ao custo do programa nacional. Faltam pelo menos quatro variáveis, todas dependentes do diagnóstico Regional por Regional previsto no Plano de Implantação:

- **Heterogeneidade de porte:** CRAs de maior quadro de profissionais registrados demandam mais licenças de usuário, mais ramais de telefonia e potencialmente mais horas de parametrização do que um Regional de porte médio como o CRC-ES.
- **Maturidade tecnológica de partida:** Regionais que já operam com processos digitalizados e alguma automação tendem a consumir menos horas de mapeamento e implementação do que Regionais que partem de processos majoritariamente manuais.
- **Economia de escala em licenciamento nacional:** uma contratação centralizada pelo CFA para múltiplos CRAs tende a obter condições de licenciamento por volume distintas das de uma contratação isolada por um único Regional, o que pode reduzir o custo unitário de custeio do Bloco B.
- **Sequenciamento por ondas:** como a implantação segue ondas controladas e não um rollout único (ver [Plano de Implementação](/documentos/plano-implementacao)), o investimento do Bloco A e do banco de horas inicial do Bloco C se distribui ao longo do tempo, e não como desembolso único no primeiro ano do programa.

O dimensionamento financeiro completo do programa nacional é um produto do diagnóstico previsto no Plano de Implantação e será apresentado como atualização desta página assim que os primeiros CRAs-piloto tiverem seu levantamento concluído.
