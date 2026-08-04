// Dados estáticos do Ambiente de Protótipo GRI, extraídos do protótipo de referência
// (index.html do site institucional Traevo GovTech), removendo apenas os itens
// de "Plataforma Institucional / Em breve" que não fazem parte deste núcleo.

export const KPIS = [
  {
    label: "Setores Integrados",
    value: "7",
    suffix: "+",
    sub: "Atendimento, Cobrança, Registro, Desenv. Profissional, Assessoria, Jurídico, ADM/Licitação",
  },
  {
    label: "Resolução pela IA",
    value: "~70",
    suffix: "%",
    sub: "Sem intervenção humana, contra ~30% do bot convencional de menus",
  },
  {
    label: "Disponibilidade",
    value: "24",
    suffix: "/7",
    sub: "Triagem, respostas e emissão de boletos a qualquer hora",
  },
  {
    label: "Capacidade de Automação",
    value: "1.257",
    suffix: "+",
    sub: "Automações possíveis em mais de 15 pipelines, com mais de 60% de eficiência",
  },
];

export const PILLARS = [
  {
    num: "PILAR 01",
    title: "Atendimento ao Profissional",
    description:
      "Recepção omnichannel (WhatsApp, e-mail, portal) unificada no Bitrix24. Histórico completo por profissional registrado, com rastreabilidade de cada interação e SLA automático.",
    tags: ["WhatsApp Business API", "Omnichannel", "SLA"],
  },
  {
    num: "PILAR 02",
    title: "IA AssistPro integrada ao CRM",
    description:
      "Substitui o bot convencional de menus numerados. Entende intenção em linguagem natural, consulta sistemas (financeiro, cadastro), resolve cerca de 70% dos casos e escala apenas quando necessário.",
    tags: ["NLP", "Análise de Sentimento", "Aprendizado Contínuo"],
  },
  {
    num: "PILAR 03",
    title: "Kanbans por Setor + Kanban da IA",
    description:
      "Cada setor possui seu pipeline próprio no Bitrix24. A IA possui um kanban exclusivo onde os atendimentos em andamento por ela ficam visíveis: atendendo, aguardando dados, resolvido ou escalado.",
    tags: ["Pipelines Bitrix24", "Kanban IA", "Roteamento"],
  },
  {
    num: "PILAR 04",
    title: "Escalada Inteligente",
    description:
      "Gatilhos objetivos definem quando a IA transfere: sentimento negativo, pedido explícito de humano, assunto fora de alçada ou falha de compreensão. O card chega ao setor com dossiê completo da conversa.",
    tags: ["Gatilhos", "Dossiê Automático", "Prioridade"],
  },
];

export const FLOW_STEPS = [
  { title: "Profissional", sub: "WhatsApp, e-mail, portal", gold: false },
  { title: "IA AssistPro", sub: "Triagem, NLP, intenção", gold: true },
  { title: "Resolve?", sub: "FAQ, status, boletos", gold: false },
  { title: "Kanban IA", sub: "Resolvido 24/7", gold: true },
  { title: "Pipeline do Setor", sub: "Escalada com dossiê", gold: false },
];

export type TagColor = "gold" | "green" | "blue" | "red" | "gray" | "dark";

export interface KanbanCard {
  title: string;
  sub: string;
  badges: [string, TagColor][];
}

export interface KanbanColumn {
  title: string;
  color: "gold" | "blue" | "green" | "red" | "dark";
  cards: KanbanCard[];
}

export interface KanbanBoard {
  key: string;
  label: string;
  note: string;
  columns: KanbanColumn[];
}

export const KANBAN_BOARDS: KanbanBoard[] = [
  {
    key: "ia",
    label: "Kanban da IA",
    note: "Pipeline exclusivo da IA AssistPro: todo atendimento nasce aqui. O que ela resolve fica registrado; o que ela escala sai deste kanban e entra no pipeline do setor com dossiê.",
    columns: [
      {
        title: "Triagem IA",
        color: "gold",
        cards: [
          { title: "Ana Paiva", sub: "Mensagem recebida, identificando intenção", badges: [["NLP", "gold"]] },
          { title: "Otávio Ramos", sub: "\"Como faço para transferir meu registro?\"", badges: [["Intenção: registro", "blue"]] },
        ],
      },
      {
        title: "Atendimento IA",
        color: "gold",
        cards: [
          { title: "Carlos Mendes", sub: "2ª via de boleto, consultando financeiro", badges: [["Integração financeira", "gold"]] },
          { title: "Júlia Rocha", sub: "Status de registro, consultando CRM", badges: [["CRM", "blue"]] },
        ],
      },
      {
        title: "Aguardando Dados",
        color: "dark",
        cards: [{ title: "Marcos Teles", sub: "Validação de titularidade pendente (CPF)", badges: [["Dupla validação", "gray"]] }],
      },
      {
        title: "Resolvido pela IA",
        color: "green",
        cards: [
          { title: "Mariana Duarte", sub: "Boleto anuidade 2026 enviado", badges: [["24/7", "green"], ["Sem humano", "green"]] },
          { title: "Fernanda Luz", sub: "FAQ prazos de recadastramento", badges: [["Base de Conhecimento", "gray"]] },
          { title: "Rafael Nogueira", sub: "Status informado, protocolo #RG-3318", badges: [["Notificação automática", "blue"]] },
        ],
      },
      {
        title: "Escalado ao Setor",
        color: "red",
        cards: [
          { title: "Sérgio Tavares", sub: "Reclamação, sentimento negativo", badges: [["Supervisor", "red"], ["Alta", "red"]] },
          { title: "Beatriz Campos", sub: "Educação continuada, qualificado", badges: [["Desenv. Profissional", "gold"]] },
          { title: "Luiz Castro", sub: "Dúvida sobre edital de licitação", badges: [["ADM/Licitação", "gold"]] },
        ],
      },
    ],
  },
  {
    key: "fin",
    label: "Cobrança e Financeiro",
    note: "Recebe da IA apenas negociações fora de alçada e casos com julgamento humano. Boletos e consultas simples não chegam aqui: são resolvidos no kanban da IA.",
    columns: [
      {
        title: "Novo (via IA)",
        color: "gold",
        cards: [{ title: "Paulo Henrique", sub: "Parcelamento acima do limite da IA", badges: [["Dossiê anexado", "gold"], ["Alta", "red"]] }],
      },
      {
        title: "Em Atendimento",
        color: "blue",
        cards: [{ title: "Regina Alves", sub: "Acordo especial, 3 anuidades", badges: [["Supervisão", "gray"]] }],
      },
      {
        title: "Aguardando Profissional",
        color: "dark",
        cards: [{ title: "Tiago Nunes", sub: "Proposta enviada, aguardando aceite", badges: [["Follow-up automático", "blue"]] }],
      },
      {
        title: "Resolvido",
        color: "green",
        cards: [{ title: "Camila Freitas", sub: "Acordo firmado em 4 parcelas", badges: [["Régua ativada", "green"]] }],
      },
      {
        title: "Encerrado",
        color: "dark",
        cards: [{ title: "Eduardo Pires", sub: "Quitado, satisfação 5 de 5", badges: [["Auditoria", "gray"]] }],
      },
    ],
  },
  {
    key: "reg",
    label: "Registro",
    note: "Solicitações de registro, alteração cadastral e baixa. A IA protocola e informa status; a análise e o deferimento são sempre humanos.",
    columns: [
      {
        title: "Novo (via IA)",
        color: "gold",
        cards: [{ title: "Larissa Prado", sub: "Registro novo, documentos completos", badges: [["Qualificado pela IA", "gold"]] }],
      },
      {
        title: "Em Análise",
        color: "blue",
        cards: [
          { title: "Rafael Nogueira", sub: "Etapa 3 de 4, comissão", badges: [["#RG-3318", "blue"]] },
          { title: "Vera Lopes", sub: "Alteração cadastral crítica", badges: [["Validação manual", "gray"]] },
        ],
      },
      {
        title: "Pendência",
        color: "red",
        cards: [{ title: "Igor Matos", sub: "Falta comprovante de conclusão", badges: [["IA notificou", "gold"]] }],
      },
      {
        title: "Deferido",
        color: "green",
        cards: [{ title: "Helena Cruz", sub: "Registro ativo, carteira emitida", badges: [["Concluído", "green"]] }],
      },
      { title: "Encerrado", color: "dark", cards: [] },
    ],
  },
  {
    key: "dp",
    label: "Desenvolvimento Profissional",
    note: "Educação continuada, cursos e eventos. A IA elimina o antigo menu de nove opções: qualifica a demanda na conversa e entrega o card pronto para análise.",
    columns: [
      {
        title: "Novo (via IA)",
        color: "gold",
        cards: [{ title: "Beatriz Campos", sub: "Pontuação de curso 40h, instituição XYZ", badges: [["#DP-2214", "gold"], ["Qualificado", "gold"]] }],
      },
      {
        title: "Em Análise",
        color: "blue",
        cards: [{ title: "Diego Faria", sub: "Credenciamento de instituição", badges: [["Comissão", "gray"]] }],
      },
      { title: "Aguardando Profissional", color: "dark", cards: [] },
      {
        title: "Resolvido",
        color: "green",
        cards: [{ title: "Sônia Braga", sub: "Pontos lançados, 12 créditos", badges: [["IA notificou", "gold"]] }],
      },
      {
        title: "Encerrado",
        color: "dark",
        cards: [{ title: "Wagner Dias", sub: "Evento certificado", badges: [["Auditoria", "gray"]] }],
      },
    ],
  },
  {
    key: "jur",
    label: "Jurídico e ADM",
    note: "Denúncias, processos éticos e licitações (o antigo menu de dezessete opções). A IA nunca responde mérito: protocola, prioriza e escala imediatamente com dossiê.",
    columns: [
      {
        title: "Novo (via IA)",
        color: "gold",
        cards: [
          { title: "Luiz Castro", sub: "Dúvida sobre edital 04/2026", badges: [["ADM/Licitação", "gold"]] },
          { title: "Anônimo", sub: "Denúncia ética, sigilo", badges: [["Alta", "red"], ["Sigiloso", "gray"]] },
        ],
      },
      {
        title: "Em Atendimento",
        color: "blue",
        cards: [{ title: "Sérgio Tavares", sub: "Reclamação, supervisor atuando", badges: [["Dossiê da IA", "gold"], ["Alta", "red"]] }],
      },
      {
        title: "Investigação",
        color: "dark",
        cards: [{ title: "Processo 112/26", sub: "Análise estruturada em curso", badges: [["Prazo monitorado", "blue"]] }],
      },
      {
        title: "Resolvido",
        color: "green",
        cards: [{ title: "Márcia Reis", sub: "Resposta fundamentada enviada", badges: [["Follow-up", "blue"]] }],
      },
      { title: "Encerrado", color: "dark", cards: [] },
    ],
  },
];

export interface KnowledgeSection {
  id: string;
  badge: string;
  badgeColor: "green" | "gold" | "red" | "gray";
  title: string;
  defaultOpen?: boolean;
  intro: string;
  table?: { headers: string[]; rows: string[][] };
  list?: string[];
  flow?: { title: string; sub: string; gold: boolean }[];
  note?: string;
  extraTable?: { headers: string[]; rows: string[][] };
}

export const KNOWLEDGE_SECTIONS: KnowledgeSection[] = [
  {
    id: "k1",
    badge: "Autonomia Total",
    badgeColor: "green",
    title: "O que a IA resolve sozinha, sem escalada",
    defaultOpen: true,
    intro:
      "Interações resolvidas de ponta a ponta pela IA, 24 horas por dia, com registro automático no kanban da IA como Resolvido pela IA.",
    table: {
      headers: ["Serviço", "Como a IA executa", "Fonte de dados"],
      rows: [
        ["2ª via de boletos e anuidades", "Valida titularidade (CPF/registro), consulta débitos em aberto via integração financeira e envia o boleto atualizado na conversa", "Financeiro / ERP"],
        ["Situação financeira", "Informa débitos em aberto, valores, vencimentos e confirma pagamentos identificados", "Financeiro / ERP"],
        ["Status de registro profissional", "Consulta o cadastro no CRM e informa situação (ativo, pendente, em análise) e etapa do processo", "Bitrix24 CRM"],
        ["Certidão de regularidade", "Emite automaticamente quando o profissional está apto (sem débitos e registro ativo)", "Financeiro + CRM"],
        ["FAQ institucional", "Regulamentações, prazos, documentação exigida, horários, endereços e contatos", "Base de Conhecimento"],
        ["Agendamentos", "Agenda atendimento presencial ou callback, sincronizado com o calendário do setor", "Bitrix24 Calendário"],
        ["Protocolos", "Gera número de protocolo e registra a solicitação com data, hora e canal", "Bitrix24 CRM"],
      ],
    },
  },
  {
    id: "k2",
    badge: "Coleta e Validação",
    badgeColor: "gold",
    title: "O que a IA coleta e valida antes de agir",
    intro:
      "Antes de acessar qualquer dado pessoal ou financeiro, a IA executa validação de titularidade. Nenhuma informação sensível é exibida sem confirmação.",
    list: [
      "Identificação: nome completo, CPF/CNPJ e número de registro profissional, extraídos da conversa em linguagem natural, sem formulários rígidos.",
      "Validação cruzada: o telefone do WhatsApp é cruzado com o cadastro; divergência aciona confirmação adicional (dupla validação).",
      "Documentos: recebe anexos, valida formato e completude, classifica por tipo e vincula ao card do profissional.",
      "Consentimento LGPD: registro de consentimento na primeira interação, com log auditável.",
      "Contexto: motivo do contato, urgência e histórico anterior, anexados ao card para o caso de escalada.",
    ],
  },
  {
    id: "k3",
    badge: "Gatilhos de Escalada",
    badgeColor: "red",
    title: "Quando a IA escala para atendimento humano",
    intro:
      "A escalada é sempre acompanhada de dossiê automático: transcrição da conversa, dados validados, intenção detectada e ações já executadas. O atendente nunca recomeça do zero.",
    table: {
      headers: ["Gatilho", "Destino (pipeline)", "Prioridade"],
      rows: [
        ["Sentimento negativo ou reclamação: análise de sentimento detecta insatisfação ou reclamação formal", "Supervisor de Atendimento", "Alta"],
        ["Pedido explícito de humano: profissional solicita falar com atendente", "Setor identificado pela intenção", "Média"],
        ["Duas falhas de compreensão: a IA não identifica a intenção após duas tentativas", "Atendimento Geral", "Média"],
        ["Negociação fora dos limites: parcelamento ou acordo acima da alçada pré-definida pela gestão", "Cobrança / Financeiro (humano)", "Alta"],
        ["Assunto jurídico ou denúncia: processos éticos, fiscalização, denúncias", "Jurídico", "Alta"],
        ["Licitações e fornecedores: demandas de ADM/Licitação", "ADM / Licitação", "Média"],
        ["Solicitações especiais: casos que exigem julgamento ou exceção à regra", "Setor competente e supervisor", "Média"],
      ],
    },
  },
  {
    id: "k4",
    badge: "Limites",
    badgeColor: "gray",
    title: "Onde a IA não atua, nunca",
    intro: "Fronteiras fixas de atuação, definidas com a instituição e bloqueadas por configuração, que não dependem do comportamento do modelo.",
    list: [
      "Decisões de deferimento ou indeferimento de registro, baixa ou restabelecimento: sempre humanas.",
      "Orientação jurídica formal ou parecer sobre processos éticos e de fiscalização.",
      "Negociação de débitos fora dos limites de desconto e parcelamento aprovados pela gestão.",
      "Exibição de dados sensíveis sem dupla validação de titularidade.",
      "Cancelamento de registro ou alteração cadastral crítica: a IA apenas protocola e encaminha.",
      "Comunicação de decisões oficiais do plenário ou de comissões.",
    ],
  },
  {
    id: "k5",
    badge: "Busca Financeira",
    badgeColor: "gold",
    title: "Como a IA busca boletos e dados financeiros",
    intro: "Fluxo de consulta financeira executado pela IA em segundos, com validação de titularidade obrigatória e log completo para auditoria.",
    flow: [
      { title: "Solicitação", sub: "\"Preciso do boleto\"", gold: false },
      { title: "AssistPro", sub: "Intenção: financeiro", gold: true },
      { title: "Validação", sub: "CPF x WhatsApp", gold: false },
      { title: "Integração financeira", sub: "Débitos em aberto", gold: false },
      { title: "2ª via gerada", sub: "Enviada no chat", gold: true },
      { title: "Registro", sub: "Card + log LGPD", gold: false },
    ],
    note: "Regra de ouro: a IA nunca informa valores ou envia boletos sem validação de titularidade. Toda consulta gera log auditável com data, hora, dado acessado e resultado.",
  },
  {
    id: "k6",
    badge: "De-Para",
    badgeColor: "gray",
    title: "Substituição do bot convencional pela IA",
    intro:
      "Baseado no mapeamento completo do bot convencional (quinze condições, mais de quarenta chamadas de integração, menus de até dezessete opções): tudo que o bot fazia por menus numerados, a IA passa a fazer por intenção, e envia ao pipeline correto do CRM.",
    table: {
      headers: ["Bot antigo (menu numerado)", "IA AssistPro (intenção NLP)", "Pipeline de destino"],
      rows: [
        ["Opção 1, Atendimento Geral", "Detecta dúvidas gerais e resolve via FAQ; escala apenas o que exigir humano", "Atendimento Geral"],
        ["Opção 2, Cobrança (menu de 7 opções)", "Resolve boletos e situação financeira direto; escala só negociações fora de alçada", "Cobrança / Financeiro"],
        ["Opção 3, Registro", "Informa status e documentação; protocola solicitações de alteração", "Registro"],
        ["Opção 4, Desenv. Profissional (menu de 9 opções)", "Qualifica a demanda (cursos, pontuação, eventos) e cria card já classificado", "Desenv. Profissional"],
        ["Opção 5, Assessoria", "Coleta contexto e roteia com prioridade definida por urgência", "Assessoria"],
        ["Opção 6, Jurídico", "Não responde mérito; protocola e escala imediatamente com dossiê", "Jurídico"],
        ["Opção 7, ADM/Licitação (menu de 17 opções)", "Elimina o menu mais complexo do bot: identifica o assunto na conversa e roteia", "ADM / Licitação"],
      ],
    },
    extraTable: {
      headers: ["Métrica", "Bot convencional", "IA AssistPro"],
      rows: [
        ["Taxa de resolução sem humano", "40 a 50%", "75 a 85%"],
        ["Tempo médio de atendimento", "5 a 8 min (menus)", "2 a 3 min"],
        ["Compreensão", "Somente números digitados", "Linguagem natural e contexto"],
        ["Manutenção", "Reprogramação manual por opção", "Redução de 80% no esforço"],
        ["Escalada", "Sempre para humano", "Somente pelos gatilhos definidos"],
      ],
    },
  },
];

export const INTEGRATIONS = [
  {
    title: "Bitrix24 CRM",
    role: "Hub Central, Pipelines",
    rows: [
      "Kanban exclusivo da IA e kanbans por setor",
      "Histórico completo por profissional",
      "SLA, automações e relatórios em tempo real",
      "Mais de 15 pipelines integrados na mesma arquitetura",
    ],
  },
  {
    title: "IA AssistPro",
    role: "Inteligência Nativa",
    rows: [
      "NLP: intenção, contexto e entidades",
      "Análise de sentimento para escalada",
      "Aprendizado contínuo com cada interação",
      "Substitui totalmente o bot de menus",
    ],
  },
  {
    title: "WhatsApp Business API",
    role: "Canal Principal",
    rows: [
      "Atendimento 24 horas por dia com histórico sincronizado",
      "Transferência transparente da IA para o atendente",
      "Envio de boletos, certidões e protocolos",
    ],
  },
  {
    title: "Sistema Financeiro / ERP",
    role: "Integração financeira, boletos",
    rows: [
      "Consulta de débitos e anuidades em aberto",
      "Emissão de 2ª via em tempo real",
      "Confirmação de pagamentos identificados",
    ],
  },
  {
    title: "Base de Conhecimento",
    role: "Gestão de Conhecimento",
    rows: [
      "FAQ, regulamentações e documentos exigidos",
      "Atualizada automaticamente com resoluções",
      "Parâmetros e limites de atuação da IA",
    ],
  },
  {
    title: "Conformidade e Auditoria",
    role: "LGPD, Lei 14.133/2021",
    rows: [
      "Log de todas as interações e acessos a dados",
      "Consentimento registrado e auditável",
      "Criptografia em trânsito e em repouso",
    ],
  },
];
