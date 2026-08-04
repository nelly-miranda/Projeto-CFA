"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { HeroNetworkSvg } from "@/components/content/hero-network-svg";
import { NucleoModal, type NucleoModalData } from "@/components/content/nucleo-modal";
import { cn } from "@/lib/utils";

const HERO_STATS = [
  { value: "27", label: "Conselhos Regionais de Administração" },
  { value: "04", label: "Fases do Método Vértice" },
  { value: "01", label: "Sistema nacional integrado" },
];

interface NucleoCard {
  num: string;
  role: string;
  badge?: string;
  title: string;
  blurb: string;
  modal: NucleoModalData;
}

const NUCLEO_CARDS: NucleoCard[] = [
  {
    num: "01",
    role: "Infraestrutura",
    title: "Infraestrutura & Licenciamento",
    blurb:
      "Cada CRA opera seu próprio sistema Bitrix24, conectado ao ambiente master do CFA: múltiplos sistemas, cada um com autonomia própria, em modelo cloud, sem servidores próprios nos CRAs.",
    modal: {
      kicker: "Núcleo 01",
      title: "Infraestrutura & Licenciamento",
      description:
        "Arquitetura multi-instância: cada CRA participante recebe seu próprio sistema Bitrix24, com autonomia total sobre configuração, dados e processos internos. Todos os sistemas regionais se conectam ao ambiente master do CFA, que consolida a visão nacional sem centralizar a operação de cada Regional.",
      tableHeaders: ["Critério", "Justificativa"],
      tableRows: [
        ["Cobertura funcional única", "Comunicação corporativa, atendimento multicanal, CRM e automação reunidos em cada sistema regional."],
        ["Modelo cloud (SaaS)", "Dispensa infraestrutura própria de servidores em cada CRA."],
        ["Múltiplos sistemas, uma rede", "Cada CRA tem seu próprio sistema, conectado ao master do CFA: autonomia plena por Regional, com visão nacional consolidada."],
        ["Rastreabilidade e auditoria", "Histórico completo de interações, exigido pelo Acórdão 309/2026 do TCU."],
      ],
      note: "Detalhamento completo em Sistemas e IA, na página Bitrix24.",
    },
  },
  {
    num: "02",
    role: "Atendimento",
    title: "Central de Contatos Unificado",
    blurb:
      "Central unificada de canais em cada CRA: e-mail corporativo, WhatsApp, telefonia, formulários, agendamentos e campanhas de e-mail, tudo integrado em um único ponto de entrada, com SLA por severidade.",
    modal: {
      kicker: "Núcleo 02",
      title: "Central de Contatos Unificado",
      description:
        "Cada CRA opera sua própria central de atendimento unificada, integrando e-mail corporativo, WhatsApp, telefonia, formulários, agendamentos e campanhas de e-mail em um único ambiente de canais, com triagem automática e acordo de nível de serviço por severidade do chamado.",
      tableHeaders: ["Severidade", "Prazo de resposta e solução"],
      tableRows: [
        ["Crítico", "Resposta em 15 min, solução em 4h úteis"],
        ["Alto", "Resposta em 30 min, solução em 12h úteis"],
        ["Médio", "Resposta em 2h úteis, solução em 24h úteis"],
        ["Baixo", "Resposta em 8h úteis, solução em 48h úteis"],
      ],
      note: "Disponibilidade mínima de 99,5% em horário comercial, conforme o Termo de Referência técnico.",
    },
  },
  {
    num: "03",
    role: "GRI",
    badge: "Em protótipo",
    title: "GRI, Gestão de Relacionamento Institucional",
    blurb:
      "Atendimento ao profissional com Bot IA integrado ao CRM, disponível 24 horas por dia, com escalonamento humano nas questões de mérito.",
    modal: {
      kicker: "Núcleo 03 · Em protótipo",
      title: "GRI, Gestão de Relacionamento Institucional",
      description:
        "O Bot IA compreende linguagem natural, faz a triagem, registra e encaminha demandas com histórico completo. Questões de mérito permanecem sempre sob decisão humana.",
      tableHeaders: ["A IA resolve sozinha", "A decisão é sempre humana"],
      tableRows: [
        ["Segunda via de documentos e emissão de protocolos", "Deferimento, indeferimento ou julgamento de mérito"],
        ["Perguntas institucionais recorrentes", "Pareceres jurídicos e processos éticos"],
        ["Agendamentos e confirmações", "Exceções fora dos limites aprovados pela gestão"],
        ["Triagem inicial e roteamento de demandas", "Decisões oficiais de colegiados"],
      ],
      note: "Experimente o ambiente completo do GRI logo abaixo desta seção.",
    },
  },
  {
    num: "04",
    role: "Processos",
    title: "Processos Setoriais & Automação",
    blurb:
      "Dois processos de automação: atendimento, com fluxos de Registro e Fiscalização, e rotinas internas, com fluxos de Jurídico e Administração, ambos por regras e pipelines no CRM.",
    modal: {
      kicker: "Núcleo 04",
      title: "Processos Setoriais & Automação",
      description:
        "A automação é configurada sobre os fluxos já diagnosticados e padronizados pelo Método Vértice, nunca como ponto de partida da transformação. Além do processo de automação de atendimento, este núcleo cria o processo de automação de rotinas internas, tarefas administrativas recorrentes entre os setores do CFA e dos CRAs.",
      tableHeaders: ["Setor", "O que é automatizado"],
      tableRows: [
        ["Atendimento (cobrança e registro)", "Triagem, protocolos e regras de automação por etapa do pipeline"],
        ["Desenvolvimento Profissional", "Qualificação de demandas e roteamento automático"],
        ["Fiscalização", "Monitoramento de prazos legais e alertas automáticos"],
        ["Administração, TI e Licitação", "Fluxos de trabalho configuráveis e workflows de aprovação"],
        ["Rotinas internas (novo)", "Automação de tarefas administrativas recorrentes, aprovações e fluxos entre setores, complementar à automação de atendimento"],
      ],
      note: "A consultoria de mapeamento de processos precede qualquer configuração de automação, por exigência do Termo de Referência técnico.",
    },
  },
  {
    num: "05",
    role: "Comunicação",
    title: "Comunicação Interna Integrada",
    blurb:
      "Mensageria, videoconferência, documentos colaborativos e base de conhecimento entre CFA e CRAs em um único ambiente.",
    modal: {
      kicker: "Núcleo 05",
      title: "Comunicação Interna Integrada",
      description:
        "Módulo de colaboração do Bitrix24 que conecta as equipes do CFA e dos CRAs em um único ambiente de trabalho, com rastreabilidade das trocas institucionais.",
      tableHeaders: ["Recurso", "Função"],
      tableRows: [
        ["Mensageria e videoconferência", "Comunicação instantânea entre equipes do CFA e dos CRAs"],
        ["Grupos de trabalho e projetos", "Organização de iniciativas e ondas de implantação"],
        ["Documentos colaborativos", "Edição compartilhada de materiais institucionais"],
        ["Base de conhecimento e calendários", "Padrões documentados e agenda compartilhada entre equipes"],
      ],
      note: "Módulo já previsto no Termo de Referência técnico, sem uso de sistemas isolados adicionais.",
    },
  },
  {
    num: "06",
    role: "Capacitação",
    title: "Capacitação & Operação Assistida",
    blurb:
      "Treinamento das equipes, banco de horas para evolução contínua e operação assistida até a adoção plena da plataforma.",
    modal: {
      kicker: "Núcleo 06",
      title: "Capacitação & Operação Assistida",
      description:
        "A entrega técnica é acompanhada de capacitação formal e de um período de operação assistida, garantindo que o legado da implantação fique com as equipes do CFA e dos CRAs.",
      tableHeaders: ["Etapa", "Entregável"],
      tableRows: [
        ["Testes e treinamento", "Plano de testes, material de treinamento e aceite provisório"],
        ["Entrada em produção", "Monitoramento assistido na primeira semana e termo de aceite definitivo"],
        ["Banco de horas técnicas", "200 horas por ano para manutenção evolutiva, sob solicitação formal"],
      ],
      note: "Cronograma completo em Sistemas e IA, na página TR Novo, Bot IA.",
    },
  },
];

interface MetodoCard {
  tag: string;
  title: string;
  blurb: string;
  modal: NucleoModalData;
}

const METODO_CARDS: MetodoCard[] = [
  {
    tag: "Método 01",
    title: "Método Vértice",
    blurb: "Como a Traevo transforma a instituição por dentro: primeiro entende, depois desenha, só então automatiza.",
    modal: {
      kicker: "Método 01",
      title: "Método Vértice",
      description:
        "A forma como a Traevo conduz a transformação: primeiro entende como a instituição funciona de verdade, depois desenha o caminho certo, coloca a tecnologia para rodar e só avança quando as equipes validam que está funcionando.",
      tableHeaders: ["Fase", "O que acontece"],
      tableRows: [
        ["Diagnóstico", "Mapeia gargalos e maturidade por CRA participante"],
        ["Arquitetura", "Desenha padrões nacionais e o modelo de GRI"],
        ["Execução", "Implanta fluxos e coloca o GRI em operação"],
        ["Validação", "Homologa com as equipes antes da expansão"],
      ],
      note: "Cada fase entrega a base que a próxima precisa para funcionar.",
      ctaHref: "/metodologias/metodo-vertice",
      ctaLabel: "Ver a jornada completa",
    },
  },
  {
    tag: "Método 02",
    title: "Conexões Inteligentes",
    blurb: "Organiza a comunicação interna: o que é falado vira ação, e o que é feito fica registrado.",
    modal: {
      kicker: "Método 02",
      title: "Conexões Inteligentes",
      description:
        "Transforma a comunicação dispersa entre equipes do CFA e dos CRAs em um fluxo estruturado dentro do Bitrix24, para que nada se perca entre um setor e outro.",
      tableHeaders: ["Etapa", "O que acontece"],
      tableRows: [
        ["Diagnóstico da comunicação", "Mapeia como as equipes se falam hoje"],
        ["Estrutura de conversação", "Define grupos, canais e fluxos de mensagens"],
        ["Implementação dos fluxos", "Coloca a nova estrutura em operação no Bitrix24"],
        ["Treinamento e sustentação", "Capacita as equipes e acompanha a adoção"],
      ],
      ctaHref: "/metodologias/conexoes-inteligentes",
      ctaLabel: "Ver os cinco núcleos",
    },
  },
];

const PLANO_IMPLEMENTACAO = {
  title: "Plano de Implementação",
  description:
    "Diagnóstico por Regional e lógica de ondas controladas de implantação, em vez de rollout único e simultâneo para todos os CRAs, com o Projeto Técnico-Científico e o TR Macro como base jurídico-metodológica.",
  items: ["Ondas controladas, não rollout único", "Projeto Técnico-Científico CFA", "Termo de Referência macro"],
  href: "/documentos/plano-implementacao",
};

const PARTICIPANTES = [
  {
    num: "01",
    title: "CFA",
    description: "Coordenação nacional do programa, supervisão do sistema e visibilidade comparável entre Regionais.",
  },
  {
    num: "02",
    title: "CRAs Participantes",
    description: "Regionais selecionados por onda de implantação, conforme critérios do diagnóstico inicial.",
  },
  {
    num: "03",
    title: "Profissionais e Empresas",
    description: "Registrados que recebem atendimento mais rápido, com triagem assistida por IA e escalonamento humano.",
  },
  {
    num: "04",
    title: "Sociedade",
    description: "Beneficiária da transparência e da rastreabilidade das demandas, com histórico auditável para prestação de contas.",
  },
];

const PRINCIPLES = [
  {
    num: "01",
    title: "Autonomia preservada",
    description: "Padrões mínimos nacionais convivem com a autonomia administrativa de cada Regional.",
  },
  {
    num: "02",
    title: "Decisão humana no mérito",
    description: "Pareceres jurídicos e processos éticos permanecem sob decisão dos colegiados competentes.",
  },
  {
    num: "03",
    title: "Evidência antes do relato",
    description: "Indicadores nacionais comparáveis substituem relatos avulsos na supervisão do sistema.",
  },
];

const FAQ_ITEMS = [
  {
    question: "Este programa retira a autonomia dos CRAs?",
    answer:
      "Não. O programa define padrões mínimos nacionais para processos críticos, mas a autonomia administrativa de cada Regional é preservada. O CFA não precisa administrar os CRAs para exercer coordenação nacional.",
  },
  {
    question: "É um projeto de compra de sistema?",
    answer:
      "Não. É um programa de governança que usa tecnologia como instrumento, não como finalidade. A plataforma de CRM e a camada de IA sustentam operacionalmente o modelo, mas o objeto do programa é a governança integrada do Sistema CFA/CRAs.",
  },
  {
    question: "Qual metodologia orienta a implantação?",
    answer:
      "O Método Vértice, da Traevo, em quatro fases sequenciais: Diagnóstico, Arquitetura, Execução e Validação, cada uma entregando a base que a fase seguinte precisa para funcionar.",
  },
  {
    question: "Quem decide questões de mérito, jurídicas e éticas?",
    answer:
      "Permanecem, em qualquer etapa, sob decisão humana dos colegiados competentes do CFA e dos CRAs. A tecnologia amplia a capacidade operacional do sistema, mas não substitui a governança institucional.",
  },
  {
    question: "Como o programa responde ao Acórdão 309/2026 do TCU?",
    answer:
      "O Acórdão apontou fragmentação institucional, baixa padronização entre Regionais e ausência de indicadores nacionais consistentes. O programa responde a esses três pontos diretamente, com detalhamento em Objetivo e Contexto.",
  },
];

const FOOTER_LINKS = [
  { label: "Objetivo e Contexto", href: "/contexto" },
  { label: "Painel de Controle", href: "/painel" },
  { label: "Metodologias", href: "/metodologias" },
  { label: "Sistemas e IA", href: "/sistemas-ia" },
  { label: "Documentação Formal", href: "/documentos" },
  { label: "Investimento", href: "/investimento" },
];

function useScrollReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const elements = root.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return containerRef;
}

export function ApresentacaoSite() {
  const containerRef = useScrollReveal();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [openNucleo, setOpenNucleo] = useState<NucleoModalData | null>(null);

  return (
    <div ref={containerRef} className="bg-background font-sans text-foreground antialiased">
      {/* ─── HERO ────────────────────────────────────────── */}
      <section className="mx-auto grid max-w-[1280px] grid-cols-1 items-center overflow-hidden px-8 py-10 md:grid-cols-2 md:px-16">
        <div className="flex flex-col gap-6 md:py-10 md:pr-14">
          <span className="inline-flex items-center gap-2.5 text-[10.5px] font-semibold tracking-[0.13em] text-muted-foreground uppercase before:block before:h-0.5 before:w-[22px] before:rounded-full before:bg-[#5B6EF0] before:content-['']">
            Apresentação do Projeto
          </span>
          <h1 className="text-[clamp(26px,3.2vw,42px)] leading-[1.1] font-bold tracking-[-0.03em] text-foreground">
            Programa Nacional de Transformação Digital e{" "}
            <span className="text-[#5B6EF0]">Governança Integrada</span> do Sistema CFA/CRAs
          </h1>
          <p className="max-w-[520px] text-base leading-relaxed text-muted-foreground">
            Governança digital integrada para o Sistema CFA/CRAs, com padronização nacional de processos e autonomia
            preservada dos Regionais.
          </p>
          <div className="mt-1 flex flex-wrap gap-9 border-t border-border pt-7">
            {HERO_STATS.map((stat) => (
              <div key={stat.label}>
                <div className="text-[28px] font-bold tracking-[-0.04em] text-foreground">{stat.value}</div>
                <div className="mt-1.5 max-w-[130px] text-[11px] font-medium text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative hidden h-[560px] items-center justify-center overflow-hidden md:flex lg:h-[680px]">
          <HeroNetworkSvg />
        </div>
      </section>

      {/* ─── FILOSOFIA ───────────────────────────────────── */}
      <section className="-mx-6 bg-foreground px-8 py-28 text-center text-background md:-mx-10 md:px-16 md:py-36">
        <div className="mx-auto max-w-[820px]">
          <div className="mb-9 inline-flex items-center gap-2.5 text-[10.5px] font-semibold tracking-[0.13em] text-background/40 uppercase before:block before:h-0.5 before:w-[18px] before:rounded-full before:bg-[#5B6EF0]/50 before:content-['']">
            Filosofia
          </div>
          <p className="text-[clamp(22px,3.2vw,38px)] leading-[1.25] font-semibold tracking-[-0.025em] text-background">
            Este não é um projeto de <em className="text-[#5B6EF0] not-italic">compra de sistema</em>. É um programa de{" "}
            <em className="text-[#5B6EF0] not-italic">governança</em> que usa tecnologia como instrumento, não como
            finalidade.
          </p>
          <div className="mx-auto my-10 h-px w-13 rounded-full bg-[#5B6EF0]/45" />
          <p className="mx-auto max-w-[540px] text-[16.5px] leading-relaxed text-background/55">
            O Sistema CFA/CRAs exerce papel essencial na fiscalização, orientação, registro e valorização do
            exercício profissional da Administração no Brasil, atuando de forma descentralizada por vinte e sete
            Conselhos Regionais.
          </p>
        </div>
      </section>

      {/* ─── ARQUITETURA ─────────────────────────────────── */}
      <section id="arquitetura" className="py-28 md:py-36">
        <div className="mx-auto max-w-[1280px] px-8 md:px-16">
          <div className="mb-6 inline-flex items-center gap-2.5 text-[10.5px] font-semibold tracking-[0.13em] text-[#5B6EF0] uppercase before:block before:h-px before:w-[18px] before:bg-[#5B6EF0] before:content-['']">
            A Arquitetura do Programa
          </div>
          <div className="reveal max-w-[720px]">
            <h2 className="text-[clamp(26px,2.8vw,40px)] leading-[1.18] font-bold tracking-[-0.028em] text-foreground">
              Infraestrutura inteligente de governança tecnológica e de inovação
            </h2>
            <p className="mt-[1.125rem] text-[15.5px] leading-relaxed text-muted-foreground">
              A base tecnológica que sustenta a governança, a automação de processos e a inteligência artificial do
              Sistema CFA/CRAs, organizada em seis núcleos.
            </p>
          </div>
          <div className="mt-13 grid grid-cols-1 gap-4 md:grid-cols-3">
            {NUCLEO_CARDS.map((card) => (
              <button
                key={card.num}
                type="button"
                onClick={() => setOpenNucleo(card.modal)}
                className="reveal group relative overflow-hidden rounded-2xl border border-border bg-card p-8 text-left transition-all duration-200 before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:origin-left before:scale-x-0 before:bg-[#5B6EF0] before:transition-transform before:duration-300 hover:-translate-y-1 hover:border-[#5B6EF0]/30 hover:shadow-[0_14px_48px_rgba(0,0,0,0.07)] hover:before:scale-x-100"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="text-[10.5px] font-bold tracking-[0.1em] text-[#5B6EF0]">
                    Núcleo {card.num} · {card.role.toUpperCase()}
                  </div>
                  {card.badge ? (
                    <span className="rounded-full bg-[#5B6EF0]/12 px-2 py-0.5 text-[9.5px] font-bold tracking-[0.05em] text-[#5B6EF0] uppercase">
                      {card.badge}
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-3.5 text-[17.5px] font-bold tracking-[-0.02em] text-foreground">{card.title}</h3>
                <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{card.blurb}</p>
                <span className="mt-[1.125rem] inline-flex items-center gap-1.5 text-[11.5px] font-bold tracking-[0.06em] text-[#5B6EF0] uppercase">
                  Saiba mais
                  <svg width="12" height="12" viewBox="0 0 15 15" fill="none">
                    <path
                      d="M2.5 7.5h10M9 3.5l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
            ))}
          </div>

          <div className="reveal mt-13 grid grid-cols-1 gap-8 rounded-2xl border-2 border-[#5B6EF0]/25 bg-card p-9 md:grid-cols-[1.2fr_1fr] md:p-11">
            <div>
              <div className="mb-4 inline-flex items-center gap-2.5 text-[10.5px] font-bold tracking-[0.13em] text-[#5B6EF0] uppercase before:block before:h-px before:w-[18px] before:bg-[#5B6EF0] before:content-['']">
                Ambiente de protótipo · Núcleo 03
              </div>
              <h3 className="text-[clamp(20px,2.2vw,26px)] leading-tight font-bold tracking-[-0.025em] text-foreground">
                GRI, Gestão de Relacionamento Institucional
              </h3>
              <p className="mt-3 max-w-[480px] text-[14px] leading-relaxed text-muted-foreground">
                Simule um atendimento conduzido pela IA, veja o card se movendo no kanban e consulte, em tempo real, a
                conversa e as integrações por trás da resposta.
              </p>
              <Link
                href="/prototipo-gri"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-foreground px-6 py-3 text-sm font-semibold text-background transition-all hover:-translate-y-0.5 hover:opacity-90"
              >
                Abrir ambiente GRI
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path
                    d="M2.5 7.5h10M9 3.5l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/50 p-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-[#5B6EF0]/30 bg-[#5B6EF0]/10 text-sm font-bold text-[#5B6EF0]">
                  ▶
                </span>
                <div>
                  <h5 className="text-[12.5px] font-bold text-foreground">Simulação de IA em tempo real</h5>
                  <p className="mt-0.5 text-[11.5px] leading-snug text-muted-foreground">
                    Chat, integrações e kanban rodando lado a lado em quatro cenários reais.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/50 p-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-[#5B6EF0]/30 bg-[#5B6EF0]/10 text-sm font-bold text-[#5B6EF0]">
                  ▦
                </span>
                <div>
                  <h5 className="text-[12.5px] font-bold text-foreground">Kanban exclusivo da IA</h5>
                  <p className="mt-0.5 text-[11.5px] leading-snug text-muted-foreground">
                    Pipeline próprio, separado dos pipelines de cada setor do CFA e dos CRAs.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/50 p-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-[#5B6EF0]/30 bg-[#5B6EF0]/10 text-sm font-bold text-[#5B6EF0]">
                  ✦
                </span>
                <div>
                  <h5 className="text-[12.5px] font-bold text-foreground">Escalonamento auditável</h5>
                  <p className="mt-0.5 text-[11.5px] leading-snug text-muted-foreground">
                    Parâmetros claros de o que a IA resolve, onde não atua e quando escala para humanos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── METODOLOGIAS ────────────────────────────────── */}
      <section id="metodologias" className="-mx-6 bg-muted py-28 md:-mx-10 md:py-36">
        <div className="mx-auto max-w-[1280px] px-8 md:px-16">
          <div className="mb-6 inline-flex items-center gap-2.5 text-[10.5px] font-semibold tracking-[0.13em] text-[#5B6EF0] uppercase before:block before:h-px before:w-[18px] before:bg-[#5B6EF0] before:content-['']">
            Metodologias do Programa
          </div>
          <h2 className="reveal mb-13 max-w-[520px] text-[clamp(26px,2.8vw,40px)] leading-[1.18] font-bold tracking-[-0.028em] text-foreground">
            Duas metodologias. Uma arquitetura de transformação.
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {METODO_CARDS.map((card) => (
              <button
                key={card.tag}
                type="button"
                onClick={() => setOpenNucleo(card.modal)}
                className="reveal rounded-2xl border border-border bg-card p-9 text-left transition-all duration-200 hover:-translate-y-1 hover:border-[#5B6EF0]/30 hover:shadow-[0_16px_56px_rgba(0,0,0,0.06)]"
              >
                <div className="mb-[1.125rem] text-[10px] font-semibold tracking-[0.12em] text-[#5B6EF0] uppercase">
                  {card.tag}
                </div>
                <h3 className="mb-3 text-xl font-bold tracking-[-0.024em] text-foreground">{card.title}</h3>
                <p className="text-[13.5px] leading-relaxed text-muted-foreground">{card.blurb}</p>
                <div className="mt-5 flex items-center gap-1.5 border-t border-[#5B6EF0]/22 pt-[1.125rem] text-[11.5px] font-bold tracking-[0.06em] text-[#5B6EF0] uppercase">
                  Ver metodologia
                </div>
              </button>
            ))}
          </div>

          <div className="mt-10 border-t border-border pt-10">
            <div className="mb-4 text-[10px] font-semibold tracking-[0.12em] text-[#5B6EF0] uppercase">Cronograma</div>
            <Link
              href={PLANO_IMPLEMENTACAO.href}
              className="reveal flex flex-col gap-4 rounded-2xl border border-border bg-card p-9 transition-all duration-200 hover:-translate-y-1 hover:border-[#5B6EF0]/30 hover:shadow-[0_16px_56px_rgba(0,0,0,0.06)] md:flex-row md:items-center md:justify-between"
            >
              <div className="max-w-[600px]">
                <h3 className="mb-2 text-xl font-bold tracking-[-0.024em] text-foreground">{PLANO_IMPLEMENTACAO.title}</h3>
                <p className="text-[13.5px] leading-relaxed text-muted-foreground">{PLANO_IMPLEMENTACAO.description}</p>
              </div>
              <ul className="flex shrink-0 flex-col gap-2">
                {PLANO_IMPLEMENTACAO.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-[12.5px] font-medium whitespace-nowrap text-foreground/80 before:block before:h-1 before:w-1 before:flex-shrink-0 before:rounded-full before:bg-[#5B6EF0] before:content-['']"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── PARTICIPANTES ───────────────────────────────── */}
      <section id="participantes" className="py-28 md:py-36">
        <div className="mx-auto max-w-[1280px] px-8 md:px-16">
          <div className="mb-6 inline-flex items-center gap-2.5 text-[10.5px] font-semibold tracking-[0.13em] text-[#5B6EF0] uppercase before:block before:h-px before:w-[18px] before:bg-[#5B6EF0] before:content-['']">
            Quem Participa
          </div>
          <h2 className="reveal mb-13 max-w-[500px] text-[clamp(26px,2.8vw,40px)] leading-[1.18] font-bold tracking-[-0.028em] text-foreground">
            Construído para a governança de todo o sistema.
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PARTICIPANTES.map((item) => (
              <div
                key={item.num}
                className="reveal relative overflow-hidden rounded-xl border border-border bg-card p-7 transition-all duration-250 hover:-translate-y-1 hover:border-foreground/10 hover:shadow-[0_12px_44px_rgba(0,0,0,0.06)] after:absolute after:inset-x-0 after:bottom-0 after:h-[2.5px] after:origin-left after:scale-x-0 after:bg-[#5B6EF0] after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                <div className="mb-3.5 text-[10.5px] font-semibold tracking-[0.1em] text-foreground/25">{item.num}</div>
                <h3 className="mb-2 text-[17px] font-bold tracking-[-0.02em] text-foreground">{item.title}</h3>
                <p className="text-[12.5px] leading-relaxed text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MANIFESTO ────────────────────────────────────── */}
      <section className="-mx-6 bg-foreground px-8 py-32 text-background md:-mx-10 md:px-16 md:py-40">
        <div className="mx-auto max-w-[900px] text-center">
          <div className="mb-9 inline-flex items-center gap-2.5 text-[10.5px] font-semibold tracking-[0.13em] text-background/40 uppercase before:block before:h-px before:w-[18px] before:bg-[#5B6EF0]/45 before:content-['']">
            Manifesto
          </div>
          <h2 className="text-[clamp(28px,4.2vw,52px)] leading-[1.12] font-bold tracking-[-0.035em]">
            O futuro do Sistema CFA/CRAs não é uma questão de <em className="text-[#5B6EF0] not-italic">tecnologia</em>.
            <br />É uma questão de <em className="text-[#5B6EF0] not-italic">governança</em>.
          </h2>
          <p className="mx-auto my-7 max-w-[560px] text-[16.5px] leading-relaxed text-background/50">
            A transformação digital deve ser instrumento de governança, não finalidade isolada. A autonomia de cada
            Regional convive com padrões mínimos nacionais e supervisão baseada em evidência.
          </p>
          <div className="mt-14 grid grid-cols-1 overflow-hidden rounded-xl border border-background/10 md:grid-cols-3">
            {PRINCIPLES.map((principle, index) => (
              <div
                key={principle.num}
                className={cn(
                  "p-9 text-left",
                  index < PRINCIPLES.length - 1 && "border-background/10 md:border-r"
                )}
              >
                <div className="mb-4 text-[10.5px] font-semibold tracking-[0.1em] text-[#5B6EF0]">{principle.num}</div>
                <h4 className="mb-2 text-[15px] font-semibold text-background">{principle.title}</h4>
                <p className="text-[13px] leading-relaxed text-background/48">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─────────────────────────────────────────── */}
      <section id="faq" className="py-24">
        <div className="mx-auto max-w-[800px] px-8 md:px-16">
          <div className="mb-6 inline-flex items-center gap-2.5 text-[10.5px] font-semibold tracking-[0.13em] text-[#5B6EF0] uppercase before:block before:h-px before:w-[18px] before:bg-[#5B6EF0] before:content-['']">
            Perguntas Frequentes
          </div>
          <h2 className="reveal mb-10 text-[clamp(26px,2.8vw,36px)] font-bold tracking-[-0.028em] text-foreground">
            O que costuma gerar dúvida.
          </h2>
          <div className="flex flex-col gap-4">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={item.question}
                  className="reveal overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-[#5B6EF0]/22"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 p-6 text-left font-sans text-base font-semibold text-foreground"
                  >
                    {item.question}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 15 15"
                      fill="none"
                      className={cn("flex-shrink-0 text-[#5B6EF0] transition-transform duration-300", isOpen && "rotate-180")}
                    >
                      <path d="M3 6l4.5 4.5L12 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300 ease-out",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-[14.5px] leading-relaxed text-muted-foreground">{item.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── PRÓXIMOS PASSOS ─────────────────────────────── */}
      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-[1280px] px-8 md:px-16">
          <div className="reveal flex flex-col items-start gap-8 rounded-2xl bg-muted p-9 md:flex-row md:items-center md:justify-between md:p-13">
            <div className="max-w-[560px]">
              <div className="mb-3 inline-flex items-center gap-2.5 text-[10.5px] font-semibold tracking-[0.13em] text-[#5B6EF0] uppercase before:block before:h-px before:w-[18px] before:bg-[#5B6EF0] before:content-['']">
                Próximos Passos
              </div>
              <h3 className="text-2xl font-bold tracking-[-0.02em] text-foreground">
                Validação institucional e início do diagnóstico.
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
                Validação desta apresentação junto à diretoria do CFA, definição do modelo jurídico de cooperação e
                seleção dos CRAs participantes da primeira onda, com base nos critérios de diagnóstico.
              </p>
            </div>
            <div className="flex flex-shrink-0 flex-col gap-3 sm:flex-row">
              <Link
                href="/documentos"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-background transition-all hover:-translate-y-0.5 hover:opacity-90"
              >
                Ver Documentação Formal
              </Link>
              <Link
                href="/investimento"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-all hover:border-[#5B6EF0]/40 hover:bg-[#5B6EF0]/7"
              >
                Ver Investimento
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ──────────────────────────────────────── */}
      <footer className="-mx-6 bg-foreground px-8 py-12 md:-mx-10 md:px-16">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2.5 text-sm font-semibold text-background/80">
            <span className="flex h-[26px] w-[26px] items-center justify-center rounded-[5px] bg-[#5B6EF0] text-[11px] font-bold text-[#14161F]">
              C
            </span>
            Programa CFA/CRAs
          </div>
          <ul className="flex flex-wrap items-center justify-center gap-5">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-[12.5px] text-background/45 transition-colors hover:text-background/70">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="text-[11.5px] text-background/35">Conduzido em parceria com a Traevo</div>
        </div>
      </footer>

      <NucleoModal data={openNucleo} onClose={() => setOpenNucleo(null)} />

      <style jsx global>{`
        .reveal {
          opacity: 0;
          transform: translateY(22px);
          transition:
            opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal.is-visible {
          opacity: 1;
          transform: none;
        }
      `}</style>
    </div>
  );
}
