---
title: "Inteligência Artificial"
slug: "sistemas-ia/ia"
parent: "sistemas-ia"
kind: "leaf"
status: "rascunho"
owner: "Nelly Miranda"
tags: []
summary: "O Bot IA opera integrado nativamente ao Bitrix24 para triagem, orientação e resposta automatizada, com decisão humana preservada nas questões de mérito."
updated: "2026-08-04"
---

## O que é o Bot IA

A camada de inteligência artificial do Sistema CFA/CRAs é o **Bot IA**: um assistente de atendimento que compreende linguagem natural, roda integrado nativamente ao Bitrix24 e opera como parte do GRI, não como um sistema à parte. O Bot IA substitui o modelo tradicional de atendimento baseado em menus rígidos e respostas pré-programadas por uma arquitetura capaz de compreender a intenção do usuário, classificar a solicitação, priorizar o atendimento, registrar a interação no CRM e encaminhar ao setor competente com histórico completo e rastreável.

A especificação técnica completa dos requisitos funcionais do Bot IA está detalhada no [TR Novo — Bot IA](/sistemas-ia/tr-novo-bot-ia), que segue o modelo real de contratação usado por um Conselho Regional.

## Princípio inegociável: decisão humana no mérito

Nenhuma automação do Bot IA substitui julgamento humano em questões de mérito. Este é o princípio central que organiza toda a camada de IA do programa e que responde diretamente ao Acórdão 309/2026 do TCU: uso intensivo de inteligência artificial no atendimento do CFA e dos CRAs, sempre com decisão humana preservada nas questões de mérito.

| O que a IA resolve sozinha | Onde a decisão é sempre humana |
|---|---|
| Segunda via de documentos, status de processos e emissão de protocolos | Deferimento, indeferimento ou julgamento de mérito |
| Perguntas institucionais recorrentes | Pareceres jurídicos e processos éticos |
| Agendamentos e confirmações | Exceções fora dos limites aprovados pela gestão |
| Triagem inicial e roteamento de demandas | Decisões oficiais de colegiados |

A automação resolve demandas simples e recorrentes de forma imediata. Encaminha ao atendimento humano especializado os casos que envolvem insatisfação do usuário, pedido explícito de atendimento humano, assunto fora da alçada configurada, ou duas tentativas sem compreensão clara da demanda.

## Capacidades funcionais

O Bot IA organiza suas capacidades em blocos funcionais, conforme especificado no Termo de Referência técnico:

| Bloco funcional | O que cobre |
|---|---|
| Processamento de linguagem natural | Compreensão de intenção em texto livre, análise de sentimento, extração de entidades (CPF, CNPJ, número de registro, e-mail, telefone), suporte ao português brasileiro com regionalismos e resolução de ambiguidade. |
| Gestão de diálogo e contexto | Manutenção de contexto ao longo da conversa, histórico de interações, continuidade omnichannel (o usuário inicia no WhatsApp e continua no chat do site sem perder o histórico) e personalização da comunicação com dados já existentes no CRM. |
| Automação e integração com o CRM | Criação automática de leads, negócios, contatos e tarefas no Bitrix24; atualização de status em tempo real; roteamento inteligente para o setor responsável; transferência para atendente humano com histórico completo quando a IA não resolve. |
| Aprendizado de máquina e otimização | Treinamento inicial a partir de base de conhecimento institucional, aprendizado contínuo supervisionado por administradores, identificação de novas intenções ainda não mapeadas. |
| Análise e relatórios | Painel de performance em tempo real, taxa de resolução sem intervenção humana, tempo médio de atendimento, intenções mais frequentes, pontos de abandono do fluxo. |
| Atendimento multicanal | WhatsApp Business API oficial e widget de chat no site institucional, com experiência consistente entre canais. |
| Gestão de pendências e prazos | Definição automática de prazos de resposta, lembretes escalonados, finalização automática de atendimentos inativos e reabertura com histórico preservado. |
| Especialização por setor | Bases de conhecimento e fluxos próprios por área (atendimento geral, cobrança, registro, desenvolvimento profissional, fiscalização, jurídico, administração/licitação), com terminologia técnica adequada a cada uma. |
| Coleta estruturada de dados | Formulários conversacionais, validação de dados em tempo real, preenchimento automático de campos do CRM, reconhecimento de documentos anexados (OCR). |
| Conformidade legal e prazos | Monitoramento de prazos legais de processos administrativos, licitatórios e de registro profissional, com alertas automáticos de vencimento. |
| Análise preditiva | Previsão de volume de atendimento por período, identificação de sazonalidades e gargalos operacionais. |
| Feedback e qualidade | Pesquisa de satisfação automática, coleta de NPS e CSAT, análise de sentimento em comentários. |
| Segurança e LGPD | Criptografia de dados, auditoria de conversas, controle de acesso por perfil, anonimização e exclusão de dados mediante solicitação do titular. |
| Atendimento fora do horário comercial | Disponibilidade 24 horas por dia, 7 dias por semana, com priorização de urgências e notificação aos atendentes no próximo dia útil. |

## Relação com o GRI e com os indicadores nacionais

O Bot IA gera, em cada interação, um registro rastreável dentro do Bitrix24. É esse mesmo fluxo de dados que alimenta os indicadores nacionais de cobertura de automação, tempo médio de atendimento e rastreabilidade consolidados no painel de supervisão do CFA, e que é objeto de auditoria periódica dos logs de interação, incluindo as decisões tomadas por automação e por atendimento humano, e de revisão anual dos critérios de classificação de risco e escalonamento da inteligência artificial, conforme a Matriz de Governança e Indicadores do programa.
