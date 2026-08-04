---
title: "Modelo do Painel"
slug: "painel/modelo-painel"
parent: "painel"
kind: "leaf"
status: "rascunho"
owner: "Nelly Miranda"
tags: ["painel", "indicadores", "dashboard", "governança de dados"]
summary: "Conceito e estrutura do painel nacional de indicadores, com visão consolidada para o CFA e visão própria para cada CRA."
updated: "2026-08-04"
---

## O que é este documento

Esta página descreve o **conceito** do painel nacional de indicadores, isto é, sua estrutura de informação, os blocos de dados que ele deve exibir e os princípios que regem seu uso. Não se trata da implementação técnica do painel, que ocorre dentro do núcleo de Execução do Método Vértice, alimentada por dados reais de operação à medida que cada onda de CRAs entra em funcionamento no ambiente de Gestão de Relacionamento Institucional (GRI).

## Propósito

O painel nacional é a peça central de resposta ao Acórdão 309/2026 do TCU no que se refere à consolidação de indicadores nacionais consistentes e à supervisão federativa efetiva. Ele existe para que o CFA identifique, com evidência, onde o apoio técnico é mais necessário, e para que cada CRA acompanhe sua própria evolução ao longo do programa, não para expor ou penalizar Regionais.

> O painel nacional não existe para expor ou penalizar CRAs. Existe para que o CFA identifique, com evidência, onde o apoio técnico é mais necessário e para que cada CRA acompanhe sua própria evolução ao longo do programa.

## Estrutura conceitual

O painel é organizado em duas visões complementares, alimentadas pela mesma base de dados:

### Visão nacional (CFA)

- Indicadores consolidados de todos os CRAs participantes, exibidos como visão sistêmica única.
- Comparativo entre Regionais, permitindo identificar quais CRAs estão acima ou abaixo da média nacional em cada indicador.
- Evolução histórica do índice de maturidade médio do sistema, por período de apuração.
- Filtros por onda de implantação, por tipo de processo (atendimento, fiscalização, registro, relacionamento institucional) e por período.

### Visão por CRA

- Cada CRA participante acessa integralmente seus próprios dados, com o mesmo conjunto de indicadores usado na visão nacional.
- Comparação da própria evolução ao longo do tempo, do diagnóstico à validação da onda.
- Sem acesso aos dados individualizados de outros Regionais, apenas às médias e faixas comparativas nacionais.

## Blocos de indicadores exibidos

O painel consolida as categorias de indicadores definidas na Matriz de Governança e Indicadores, cada uma com dono, unidade de medida e frequência de apuração próprios:

| Bloco | Exemplo de indicador | Frequência típica |
|---|---|---|
| Indicadores nacionais | Tempo médio nacional de atendimento; índice de maturidade médio do sistema | Mensal / Trimestral |
| Indicadores por CRA | Tempo médio de atendimento por CRA; aderência aos fluxos padronizados | Mensal |
| Atendimento | Taxa de resolução no primeiro contato; percentual de escalonamento ao atendimento humano | Mensal |
| Fiscalização | Tempo médio de tramitação de processo fiscalizatório; processos dentro do prazo regulamentar | Mensal |
| Registro | Tempo médio de emissão de certidões; inscrições concluídas sem retrabalho | Mensal |
| Relacionamento institucional | Volume de interações por canal (GRI); índice de satisfação institucional | Mensal / Trimestral |
| Transformação digital | Processos críticos padronizados; CRAs com GRI em operação | Trimestral |

## Princípios de exibição

- Todo indicador exibido no painel tem dono, unidade de medida e frequência de apuração definidos previamente na Matriz de Governança e Indicadores, sem métricas ad hoc.
- Nenhum dado pessoal do registrado é exibido no painel; os indicadores são sempre agregados ou classificados por categoria de demanda, nunca por identidade individual.
- O acesso é segregado por perfil: cada CRA vê integralmente seus próprios dados e, de forma agregada, os indicadores comparativos nacionais; o CFA vê a visão nacional completa.
- Os dados que alimentam o painel têm a mesma rastreabilidade do GRI: data, hora, canal, responsável, classificação da demanda e status de resolução, com auditoria periódica dos logs, incluindo decisões tomadas por automação e por atendimento humano.

## Próximo passo

O modelo aqui descrito serve de referência para a especificação técnica do painel dentro da fase de Arquitetura de cada onda de implantação, quando é traduzido em telas, consultas e integrações com a plataforma de GRI escolhida a partir do diagnóstico.
