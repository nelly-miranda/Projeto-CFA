---
title: "Governança do CFA"
slug: "contexto/governanca-cfa"
parent: "contexto"
kind: "leaf"
status: "rascunho"
owner: "Nelly Miranda"
tags: ["governança", "comitê gestor", "LGPD"]
summary: "Estrutura do comitê gestor, fronteira entre decisão técnica e institucional, e governança de dados do programa no âmbito do CFA."
updated: "2026-08-04"
---

## Papel da governança no programa

A transformação digital do Sistema CFA/CRAs é conduzida como um programa de governança, não como uma compra isolada de sistema. Isso significa que nenhuma automação, fluxo redesenhado ou uso de inteligência artificial entra em operação sem antes passar por um processo de validação institucional presidido pelo CFA, com o suporte técnico da Traevo e a participação dos CRAs de cada onda.

## Comitê gestor

O programa é conduzido sob um comitê gestor, com representação do CFA, dos CRAs participantes da onda em curso e da equipe técnica da Traevo. O comitê se reúne com periodicidade definida em conjunto e responde por:

- Acompanhar os indicadores nacionais e por CRA consolidados no painel do programa.
- Validar a passagem entre os núcleos do Método Vértice (Diagnóstico, Arquitetura, Execução e Validação) em cada onda de implantação.
- Aprovar a entrada de novas ondas, com base nos critérios de diagnóstico e maturidade de cada CRA.
- Decidir sobre eventuais ajustes de escopo ao longo da execução.

## Fronteira entre decisão técnica e decisão institucional

A governança do programa distingue claramente dois planos de decisão, que não se confundem:

| Plano | Responsável | Exemplos |
|---|---|---|
| Decisão técnica de execução | Equipe executora (Traevo) | Modelagem de fluxos, configuração de automação, arquitetura do ambiente de GRI |
| Decisão institucional e de governança | CFA e colegiados competentes | Aprovação de padrões mínimos nacionais, entrada de novas ondas, ajustes de escopo, decisões de mérito |

Decisões de mérito, pareceres jurídicos e processos éticos permanecem, em qualquer etapa do programa, sob decisão humana dos colegiados competentes do CFA e dos CRAs. A tecnologia, incluindo a inteligência artificial aplicada ao atendimento, amplia a capacidade operacional do sistema, mas não substitui a governança institucional do CFA e dos CRAs.

## Obrigações do CFA na estrutura de governança

- Designar interlocutor institucional responsável pelo acompanhamento do programa.
- Aprovar os padrões mínimos nacionais propostos, após validação técnica.
- Viabilizar o acesso da equipe técnica às informações necessárias ao diagnóstico.
- Participar do comitê gestor e decidir sobre a entrada de novas ondas de implantação.

## Governança de dados

A governança de dados do programa segue os princípios de minimização, finalidade e segregação de acesso da Lei Geral de Proteção de Dados (LGPD):

- Cada interação registrada no GRI recebe log completo de data, hora, canal, responsável, classificação da demanda e status de resolução, assegurando rastreabilidade e suporte à prestação de contas, sem exposição de dados pessoais além do estritamente necessário à operação do serviço.
- O acesso aos dados é segregado por perfil: cada CRA acessa integralmente seus próprios dados e, de forma agregada, os indicadores comparativos nacionais.
- Os logs de interação são auditados periodicamente, incluindo as decisões tomadas por automação e por atendimento humano.
- A política de retenção de dados segue os prazos legais de guarda documental de cada tipo de processo, e os critérios de classificação de risco e escalonamento da inteligência artificial são revisados anualmente.

## Relação com o Acórdão 309/2026

Essa estrutura de governança é a resposta institucional direta às fragilidades apontadas pelo TCU no Acórdão 309/2026: fragmentação institucional, baixa padronização entre Regionais, ausência de indicadores nacionais consistentes e supervisão federativa limitada. O comitê gestor e a segregação clara entre decisão técnica e decisão institucional dão ao CFA um instrumento concreto de coordenação nacional, sem sobrepor a autonomia administrativa de cada CRA.
