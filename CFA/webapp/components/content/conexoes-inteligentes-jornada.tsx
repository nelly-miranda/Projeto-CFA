"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
      { threshold: 0.15 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return containerRef;
}

interface VisionCard {
  title: string;
  description: string;
}

const VISION_CARDS: VisionCard[] = [
  { title: "Definição Estratégica", description: "Transforma comunicação dispersa em fluxo estruturado de trabalho." },
  { title: "Posicionamento", description: "Não é apenas uma implantação de sistema. É a construção de um novo modelo de trabalho." },
  { title: "Diferencial", description: "Integra pessoas, processos e ferramentas, atuando principalmente no comportamento das equipes." },
];

const PREMISES = [
  { kicker: "Tudo que é falado", highlight: "Vira ação", description: "Conversas viram tarefas com responsável e prazo definidos." },
  { kicker: "Tudo que é feito", highlight: "Fica registrado", description: "Toda decisão fica documentada, contextualizada e rastreável." },
  { kicker: "Tudo que importa", highlight: "Está conectado", description: "Pessoas e processos fluem de forma integrada e visível." },
];

interface Nucleo {
  code: string;
  label: string;
  title: string;
  description: string;
  foco: string;
  atividades: string[];
}

const NUCLEOS: Nucleo[] = [
  {
    code: "A",
    label: "Diagnóstico",
    title: "Diagnóstico da Comunicação",
    description: "Compreender a operação atual antes de qualquer mudança estratégica. O ponto de partida para a transformação.",
    foco: "Mapeamento de ruídos, gargalos e padrões que comprometem a produtividade.",
    atividades: ["Mapeamento de todos os canais", "Análise por departamento", "Identificação de retrabalho"],
  },
  {
    code: "B",
    label: "Estrutura",
    title: "Estrutura de Conversação",
    description: "Criar a base do novo modelo de trabalho: estruturar a comunicação de forma organizada e eficiente.",
    foco: "Substituir a dispersão por canais organizados e regras claras de operação.",
    atividades: ["Grupos de trabalho por setor", "Definição de regras de uso", "Espaços com permissões"],
  },
  {
    code: "C",
    label: "Fluxos",
    title: "Implementação dos Fluxos",
    description: "Transformar a operação real em fluxos estruturados, conectando comunicação e execução.",
    foco: "Fazer com que cada conversa relevante gere uma ação rastreável.",
    atividades: ["Kanbans e Gantt", "Automações de tarefas", "Padronização de rotinas"],
  },
  {
    code: "D",
    label: "Treinamento",
    title: "Treinamento por Área",
    description: "Capacitar cada equipe do CFA e dos CRAs para operar com autonomia no novo modelo.",
    foco: "Ensinar a pensar o trabalho de forma estruturada dentro do sistema.",
    atividades: ["Treinamentos específicos por setor", "Capacitação no aplicativo móvel", "Boas práticas de foco"],
  },
  {
    code: "E",
    label: "Sustentação",
    title: "Sustentação da Cultura",
    description: "Sustentar a transformação e garantir que o método evolua junto com o CFA e os CRAs.",
    foco: "Cultura de colaboração sustentável baseada em acordos e autonomia.",
    atividades: ["Curso Conexões Inteligentes", "Onboarding para novas equipes", "Rituais e suporte contínuo"],
  },
];

interface Tool {
  key: string;
  title: string;
  description: string;
  items: string[];
}

const TOOLS: Tool[] = [
  {
    key: "espaco",
    title: "Espaço Digital",
    description:
      "Espaço de trabalho on-line para toda a equipe do CFA e dos CRAs: bate-papo, reuniões, gerenciamento de tarefas, calendários e colaboração em documentos, tudo em um só lugar.",
    items: ["Messenger", "Colaboração", "Lousas", "Assistente IA", "Feed", "Reações"],
  },
  {
    key: "reunioes",
    title: "Reuniões HD",
    description: "Reuniões virtuais para discutir projetos e manter contato com a equipe de onde estiver: no CFA, em um CRA ou em trânsito.",
    items: ["Chamadas de vídeo HD", "Conferências web", "IA em videoconferência", "Comentários"],
  },
  {
    key: "projetos",
    title: "Projetos",
    description: "Colaboração em tarefas e projetos com quadro Kanban, gráfico de Gantt, bate-papo, reuniões e armazenamento de arquivos.",
    items: ["Grupos de trabalho", "Projetos", "Permissões de acesso", "Kanban e Gantt"],
  },
  {
    key: "copilot",
    title: "CoPilot IA",
    description: "Assistente de IA presente em todo o Bitrix24, disponível sempre que a equipe precisar para as tarefas do dia a dia.",
    items: ["IA no bate-papo", "IA em reuniões", "IA no CRM", "IA em tarefas"],
  },
  {
    key: "agenda",
    title: "Agenda",
    description: "Calendário on-line para planejar reuniões, gerenciar tarefas e agendar compromissos em uma única plataforma.",
    items: ["Calendário de equipe", "Horários disponíveis", "Agendamento de eventos", "Sincronização mobile"],
  },
  {
    key: "mobile",
    title: "App Mobile",
    description: "Contato com a equipe e acompanhamento dos projetos pelo aplicativo móvel do Bitrix24, de qualquer lugar.",
    items: ["Messenger", "Chamadas de vídeo", "Comentários", "Sincronização de calendário"],
  },
];

interface Screenshot {
  title: string;
  caption: string;
  src: string;
}

const SCREENSHOTS: Screenshot[] = [
  {
    title: "Sistema de Tarefas",
    caption: "Quadro Kanban com prazos, responsáveis e comentários em tempo real.",
    src: "https://www.bitrix24.com.br/upload/optimizer/converted/images/content_br/tools/tasks_and_projects/task-management/kanban-board.1748w.png.webp",
  },
  {
    title: "Controle de Grupo de Trabalho",
    caption: "Grupos com controle de privacidade, membros e função de cada participante.",
    src: "https://www.bitrix24.com.br/upload/optimizer/converted/images/content_br/tools/communications/workgroups/workgroups.3496w.png.webp",
  },
  {
    title: "Fluxos e Automação",
    caption: "Regras de automação e gatilhos que movem a tarefa entre etapas sozinhas.",
    src: "https://www.bitrix24.com.br/upload/optimizer/converted/images/content_br/tools/tasks_and_projects/automation/rules-and-triggers.3496w.png.webp",
  },
];

const ROADMAP = [
  { num: "01", title: "Alinhamento", description: "Entendimento das necessidades e escopo inicial." },
  { num: "02", title: "Diagnóstico", description: "Mapeamento profundo de ruídos e gargalos." },
  { num: "03", title: "Implementação", description: "Construção dos novos fluxos no Bitrix24." },
  { num: "04", title: "Capacitação", description: "Treinamento prático por área operacional." },
  { num: "05", title: "Sustentação", description: "Acesso ao curso Conexões Inteligentes e suporte contínuo." },
];

export function ConexoesInteligentesJornada() {
  const containerRef = useScrollReveal();
  const [activeNucleo, setActiveNucleo] = useState(0);
  const [openTool, setOpenTool] = useState<Tool | null>(null);
  const nucleo = NUCLEOS[activeNucleo];

  useEffect(() => {
    if (!openTool) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenTool(null);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [openTool]);

  return (
    <div ref={containerRef} className="flex flex-col gap-0">
      {/* ─── HERO ─── */}
      <section className="reveal flex flex-col gap-4 py-4">
        <span className="inline-flex items-center gap-2.5 text-[10.5px] font-semibold tracking-[0.13em] text-muted-foreground uppercase before:block before:h-0.5 before:w-[22px] before:rounded-full before:bg-[#5B6EF0] before:content-['']">
          Como Entregamos
        </span>
        <h1 className="text-[clamp(30px,3.6vw,48px)] leading-[1.05] font-bold tracking-[-0.03em] text-foreground">
          Conexões <span className="text-[#5B6EF0] italic">Inteligentes</span>
        </h1>
        <p className="max-w-[620px] text-base leading-relaxed text-muted-foreground">
          Organização da comunicação interna, da colaboração entre equipes e da execução das rotinas do CFA e dos
          CRAs em um fluxo contínuo de trabalho no Bitrix24.
        </p>
      </section>

      {/* ─── VISÃO DO MÉTODO ─── */}
      <section className="reveal py-16">
        <div className="mb-6 inline-flex items-center gap-2.5 text-[10.5px] font-semibold tracking-[0.13em] text-[#5B6EF0] uppercase before:block before:h-px before:w-[18px] before:bg-[#5B6EF0] before:content-['']">
          Estrutura e Estratégia
        </div>
        <h2 className="max-w-[680px] text-[clamp(24px,2.6vw,34px)] leading-[1.18] font-bold tracking-[-0.025em] text-foreground">
          Visão do método.
        </h2>
        <p className="mt-4 max-w-[680px] text-[15px] leading-relaxed font-medium text-muted-foreground">
          Conexões Inteligentes organiza a comunicação interna, a colaboração entre equipes e a execução das
          atividades dentro de um fluxo contínuo, usando o Bitrix24 como ambiente central.
        </p>
        <p className="mt-3 max-w-[680px] text-[17px] leading-snug font-bold text-[#5B6EF0]">
          Ele não implanta apenas um sistema. Ele constrói um novo modelo operacional.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {VISION_CARDS.map((card) => (
            <div key={card.title} className="rounded-2xl border border-border bg-card p-7 text-center">
              <h3 className="mb-2.5 text-[13px] font-bold tracking-[-0.01em] text-foreground uppercase">{card.title}</h3>
              <p className="text-[13px] leading-relaxed text-muted-foreground">{card.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── TRÊS PREMISSAS ─── */}
      <section className="reveal -mx-6 bg-foreground px-8 py-16 text-background md:-mx-10 md:px-14">
        <h2 className="mb-10 text-center text-[clamp(24px,3vw,38px)] leading-tight font-bold tracking-[-0.02em] text-background">
          Três premissas fundamentais
        </h2>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {PREMISES.map((premise) => (
            <div key={premise.kicker} className="text-center">
              <span className="mb-3 block text-[10px] font-bold tracking-[0.15em] text-background/40 uppercase">
                {premise.kicker}
              </span>
              <h3 className="mb-3 text-[26px] leading-tight font-extrabold text-[#5B6EF0] uppercase">{premise.highlight}</h3>
              <p className="mx-auto max-w-[260px] text-[13.5px] leading-relaxed text-background/55">{premise.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 5 NÚCLEOS ─── */}
      <section className="reveal py-16">
        <div className="mb-6 inline-flex items-center gap-2.5 text-[10.5px] font-semibold tracking-[0.13em] text-[#5B6EF0] uppercase before:block before:h-px before:w-[18px] before:bg-[#5B6EF0] before:content-['']">
          A Jornada
        </div>
        <h2 className="max-w-[680px] text-[clamp(24px,2.6vw,34px)] leading-[1.18] font-bold tracking-[-0.025em] text-foreground">
          Estrutura dos cinco núcleos.
        </h2>

        <div className="mt-7 flex gap-2 overflow-x-auto pb-1">
          {NUCLEOS.map((n, idx) => (
            <button
              key={n.code}
              type="button"
              onClick={() => setActiveNucleo(idx)}
              className={cn(
                "flex min-w-[150px] shrink-0 flex-col items-start gap-1 rounded-xl border p-4 text-left transition-all",
                idx === activeNucleo ? "border-[#5B6EF0] bg-[#5B6EF0]/8" : "border-border bg-card hover:border-[#5B6EF0]/30"
              )}
            >
              <span className={cn("text-[10px] font-bold tracking-[0.1em] uppercase", idx === activeNucleo ? "text-[#5B6EF0]" : "text-muted-foreground")}>
                Núcleo {n.code}
              </span>
              <strong className="text-[13px] font-bold text-foreground">{n.label}</strong>
            </button>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-1 gap-8 rounded-2xl border border-border bg-card p-8 md:grid-cols-[1fr_1.4fr] md:p-10">
          <div>
            <h3 className="mb-3 text-2xl font-bold text-foreground">{nucleo.title}</h3>
            <p className="text-[14px] leading-relaxed font-light text-muted-foreground">{nucleo.description}</p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <span className="mb-2.5 block text-[10px] font-bold tracking-[0.1em] text-[#5B6EF0] uppercase">Foco</span>
              <p className="text-[13.5px] leading-relaxed font-medium text-foreground/85">{nucleo.foco}</p>
            </div>
            <div>
              <span className="mb-2.5 block text-[10px] font-bold tracking-[0.1em] text-[#5B6EF0] uppercase">Atividades</span>
              <ul className="flex flex-col gap-1.5">
                {nucleo.atividades.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-[12.5px] font-medium text-muted-foreground before:mt-1.5 before:block before:size-1 before:shrink-0 before:rounded-full before:bg-[#5B6EF0] before:content-['']"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4 rounded-xl bg-muted p-5">
          <span className="text-[10px] font-bold tracking-[0.08em] text-[#5B6EF0] uppercase">Tecnologia habilitadora</span>
          <span className="text-[12.5px] text-muted-foreground">Estrutura centralizada no Bitrix24, com todos os módulos integrados.</span>
        </div>
      </section>

      {/* ─── FERRAMENTAS ─── */}
      <section className="reveal -mx-6 bg-muted py-16 md:-mx-10">
        <div className="px-8 md:px-14">
          <div className="mb-6 inline-flex items-center gap-2.5 text-[10.5px] font-semibold tracking-[0.13em] text-[#5B6EF0] uppercase before:block before:h-px before:w-[18px] before:bg-[#5B6EF0] before:content-['']">
            Tecnologia Aplicada
          </div>
          <h2 className="max-w-[680px] text-[clamp(24px,2.6vw,34px)] leading-[1.18] font-bold tracking-[-0.025em] text-foreground">
            Bitrix24: as ferramentas do método.
          </h2>
          <p className="mt-3 max-w-[680px] text-[14.5px] leading-relaxed text-muted-foreground">
            Espaço de trabalho on-line para toda a equipe. Permite que o CFA e os CRAs trabalhem de qualquer lugar,
            com tudo conectado na mesma plataforma.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {SCREENSHOTS.map((shot) => (
              <div key={shot.title} className="overflow-hidden rounded-2xl border border-border bg-card">
                <div className="relative aspect-video w-full bg-muted">
                  <Image src={shot.src} alt={shot.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover object-top" />
                </div>
                <div className="p-5">
                  <h3 className="mb-1.5 text-[13.5px] font-bold tracking-[-0.01em] text-foreground uppercase">{shot.title}</h3>
                  <p className="text-[12px] leading-relaxed text-muted-foreground">{shot.caption}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[11px] text-muted-foreground/70 italic">Capturas de tela oficiais de bitrix24.com.br.</p>

          <div className="mt-10 mb-4 text-[11px] font-bold tracking-[0.1em] text-[#5B6EF0] uppercase">Outras ferramentas</div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {TOOLS.map((tool) => (
              <button
                key={tool.key}
                type="button"
                onClick={() => setOpenTool(tool)}
                className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-5 text-center transition-all hover:-translate-y-0.5 hover:border-[#5B6EF0]/30 hover:shadow-[0_10px_28px_rgba(0,0,0,0.05)]"
              >
                <span className="flex size-9 items-center justify-center rounded-lg bg-[#5B6EF0]/12 text-[#5B6EF0]">✦</span>
                <span className="text-[11.5px] font-bold tracking-[-0.01em] text-foreground uppercase">{tool.title}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ROADMAP ─── */}
      <section className="reveal py-16">
        <div className="mb-6 inline-flex items-center gap-2.5 text-[10.5px] font-semibold tracking-[0.13em] text-[#5B6EF0] uppercase before:block before:h-px before:w-[18px] before:bg-[#5B6EF0] before:content-['']">
          Roadmap de Entrega
        </div>
        <h2 className="mb-8 max-w-[500px] text-[clamp(24px,2.6vw,34px)] leading-[1.18] font-bold tracking-[-0.025em] text-foreground">
          Como começa.
        </h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          {ROADMAP.map((step) => (
            <div key={step.num} className="rounded-xl border border-border bg-card p-5">
              <div className="mb-3 text-[26px] font-bold text-[#5B6EF0]/40 italic">{step.num}</div>
              <h3 className="mb-1.5 text-[14px] font-bold text-foreground">{step.title}</h3>
              <p className="text-[11.5px] leading-relaxed text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── ENCERRAMENTO ─── */}
      <section className="reveal -mx-6 mb-8 bg-foreground px-8 py-16 text-center text-background md:-mx-10 md:px-14">
        <div className="mx-auto max-w-[640px]">
          <p className="text-[clamp(19px,2.2vw,28px)] leading-[1.5] font-bold text-background">
            Produtividade não vem de trabalhar mais. Vem de <em className="text-[#5B6EF0] not-italic">trabalhar melhor</em>. E
            trabalhar melhor começa com <em className="text-[#5B6EF0] not-italic">conexões inteligentes</em>.
          </p>
          <Link
            href="/apresentacao"
            className="mt-7 inline-flex items-center gap-2 rounded-lg border border-background/25 bg-transparent px-6 py-3 text-sm font-semibold text-background transition-all hover:border-[#5B6EF0] hover:bg-[#5B6EF0]/10"
          >
            Voltar à apresentação do projeto
          </Link>
        </div>
      </section>

      {/* ─── MODAL DE FERRAMENTA ─── */}
      {openTool ? (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-foreground/40 p-6 backdrop-blur-sm"
          onClick={() => setOpenTool(null)}
        >
          <div
            className="max-h-[85vh] w-full max-w-[600px] overflow-y-auto rounded-2xl border border-border bg-card p-9 shadow-[0_30px_90px_rgba(0,0,0,0.28)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <span className="text-[10.5px] font-bold tracking-[0.13em] text-[#5B6EF0] uppercase">Ferramenta Bitrix24</span>
              <button
                type="button"
                onClick={() => setOpenTool(null)}
                aria-label="Fechar"
                className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-[#5B6EF0]"
              >
                ✕
              </button>
            </div>
            <h3 className="mt-4 text-2xl font-bold tracking-[-0.02em] text-foreground">{openTool.title}</h3>
            <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">{openTool.description}</p>
            <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {openTool.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 rounded-lg bg-muted px-3.5 py-2.5 text-[13px] font-semibold text-foreground"
                >
                  <span className="text-[#5B6EF0]">✦</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}

      <style jsx global>{`
        .reveal {
          opacity: 0;
          transform: translateY(20px);
          transition:
            opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal.is-visible {
          opacity: 1;
          transform: none;
        }
      `}</style>
    </div>
  );
}
