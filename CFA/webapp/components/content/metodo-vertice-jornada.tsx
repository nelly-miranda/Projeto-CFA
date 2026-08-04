"use client";

import { useEffect, useRef, useState } from "react";
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

interface Nexo {
  num: string;
  label: string;
  world: "Consultoria de Processos" | "Execução, Validação e Testes";
  objetivo: string;
  resultado: string;
  entregaveis: string[];
  importancia: string;
}

const NEXOS: Nexo[] = [
  {
    num: "01",
    label: "Discovery",
    world: "Consultoria de Processos",
    objetivo: "Entender o negócio como ele realmente funciona, dentro do CFA e de cada CRA.",
    resultado: "O modelo sistematizado do negócio.",
    entregaveis: ["Processo mapeado", "Riscos identificados", "Modelo futuro", "Indicação tecnológica"],
    importancia: "O coração do método: o ponto de inflexão de todo o programa.",
  },
  {
    num: "02",
    label: "Arquitetura",
    world: "Consultoria de Processos",
    objetivo: "Traduzir o modelo entendido em arquitetura técnica.",
    resultado: "O mapa de arquitetura do programa.",
    entregaveis: ["Estrutura de dados", "Automações", "Integrações", "Tecnologias prescritas"],
    importancia: "A ferramenta serve ao processo. Nunca o contrário.",
  },
  {
    num: "03",
    label: "Execução",
    world: "Execução, Validação e Testes",
    objetivo: "Construir dentro do Bitrix24 exatamente o que foi projetado.",
    resultado: "O sistema implantado, fiel ao modelo desenhado.",
    entregaveis: ["Configuração", "Homologação por entrega", "Validação com o CFA e o CRA"],
    importancia: "Reduz o risco de um sistema que não funciona na prática.",
  },
  {
    num: "04",
    label: "Validação",
    world: "Execução, Validação e Testes",
    objetivo: "Garantir que o que foi construído funciona na vida real de cada Regional.",
    resultado: "Calibragens finas, não retrabalho.",
    entregaveis: ["Ajustes finos", "Homologação formal"],
    importancia: "Protege o CFA, os CRAs e a Traevo.",
  },
];

const REGIONAIS = [
  { code: "CRA-SP", stage: "Treinamento" },
  { code: "CRA-RJ", stage: "Validação" },
  { code: "CRA-MG", stage: "Execução" },
  { code: "CRA-BA", stage: "Execução" },
];

const GAINS = [
  "Entregas incrementais",
  "Maior previsibilidade",
  "Menor risco",
  "Redução do retrabalho",
  "Validação contínua",
  "Implantação paralela",
  "Adoção gradual",
  "Menor tempo para gerar valor",
];

const CHANNELS = [
  {
    tag: "Canal principal",
    title: "Collabs Bitrix24",
    description: "Discussões de tarefas, arquivos, histórico e evolução do programa. Transparência total e rastreável.",
  },
  {
    tag: "Comunicação rápida",
    title: "WhatsApp",
    description: "Contato direto com a gestão de projetos para dúvidas pontuais e avisos urgentes.",
  },
  {
    tag: "Formalizações",
    title: "E-mail",
    description: "Reuniões registradas, entregas formais, aprovações e comunicações oficiais do programa.",
  },
];

const TRAINING = [
  { tag: "01 · Treinamento geral", description: "Nivelamento sobre a plataforma Bitrix24: funcionalidades básicas para toda a equipe." },
  { tag: "02 · Treinamento de processo", description: "Focado na solução construída: como usar o que foi configurado para cada Regional." },
  { tag: "03 · Aprendizado prático", description: "Soluções pré-prontas e materiais de apoio para acelerar a curva de aprendizado das equipes." },
];

const TEAM = [
  { role: "Consultoria de Processos", description: "Mapeia, modela e encaminha cada solução." },
  { role: "Time de Implementação Técnica", description: "Constrói automações e fluxos na plataforma." },
  { role: "Treinadores e Suporte", description: "Capacitam as equipes durante todo o processo." },
  { role: "Gestor de Projetos", description: "Cuida de prazos, agendas e validações." },
];

const EXPECTATIONS = [
  { title: "Disponibilidade real", description: "Tempo protegido para o método." },
  { title: "Respostas ágeis", description: "Agilidade para avançar de etapa." },
  { title: "Participação ativa", description: "Presença nas validações e decisões." },
  { title: "Mentalidade de mudança", description: "Curiosidade, não resistência." },
  { title: "Compromisso com o processo", description: "Aprovar cada avanço no ritmo combinado." },
];

const DELIVERABLES = [
  { num: "01", title: "Mapeamento", description: "O processo real, sem rodeios" },
  { num: "02", title: "Arquitetura", description: "O mapa técnico do programa" },
  { num: "03", title: "Implantação", description: "Construído nas ferramentas" },
  { num: "04", title: "Treinamentos", description: "Adoção com naturalidade" },
  { num: "05", title: "Validação", description: "Uso real, homologado" },
  { num: "06", title: "Operação Assistida", description: "Acompanhamos o go-live" },
  { num: "07", title: "Documentação", description: "O antes e o depois" },
];

export function MetodoVerticeJornada() {
  const containerRef = useScrollReveal();
  const [activeNexo, setActiveNexo] = useState(0);
  const nexo = NEXOS[activeNexo];

  return (
    <div ref={containerRef} className="flex flex-col gap-0">
      {/* ─── HERO ─── */}
      <section className="reveal flex flex-col gap-4 py-4">
        <span className="inline-flex items-center gap-2.5 text-[10.5px] font-semibold tracking-[0.13em] text-muted-foreground uppercase before:block before:h-0.5 before:w-[22px] before:rounded-full before:bg-[#5B6EF0] before:content-['']">
          Como Entregamos
        </span>
        <h1 className="text-[clamp(30px,3.6vw,48px)] leading-[1.05] font-bold tracking-[-0.03em] text-foreground">
          Método <span className="text-[#5B6EF0] italic">Vértice</span>
        </h1>
        <p className="max-w-[620px] text-base leading-relaxed text-muted-foreground">
          A metodologia da Traevo para transformar a instituição por dentro: entender primeiro, desenhar depois, só
          então automatizar. É assim que o programa CFA/CRAs é conduzido, do diagnóstico ao Go-live de cada Regional.
        </p>
      </section>

      {/* ─── FILOSOFIA ─── */}
      <section className="reveal -mx-6 mt-8 bg-foreground px-8 py-16 text-background md:-mx-10 md:px-14">
        <div className="max-w-[760px]">
          <div className="mb-5 inline-flex items-center gap-2.5 text-[10.5px] font-semibold tracking-[0.13em] text-background/40 uppercase before:block before:h-0.5 before:w-[18px] before:rounded-full before:bg-[#5B6EF0]/50 before:content-['']">
            Por que fazemos assim
          </div>
          <p className="text-[clamp(19px,2vw,26px)] leading-[1.5] font-semibold tracking-[-0.015em] text-background">
            O Método Vértice existe para entregar mais resultado de forma eficiente e ágil.{" "}
            <span className="text-[#5B6EF0]">Tecnologia sem processo é desperdício</span>, e ferramenta sem
            diagnóstico organizado é aposta. Por isso o consultor de processos entende primeiro, para que a
            tecnologia sustente depois.
          </p>
        </div>
      </section>

      {/* ─── NEXOS ─── */}
      <section className="reveal py-16">
        <div className="mb-6 inline-flex items-center gap-2.5 text-[10.5px] font-semibold tracking-[0.13em] text-[#5B6EF0] uppercase before:block before:h-px before:w-[18px] before:bg-[#5B6EF0] before:content-['']">
          Quatro Movimentos, Dois Mundos
        </div>
        <h2 className="max-w-[680px] text-[clamp(24px,2.6vw,34px)] leading-[1.18] font-bold tracking-[-0.025em] text-foreground">
          Da consultoria de processos à execução validada.
        </h2>
        <p className="mt-3 max-w-[680px] text-[14.5px] leading-relaxed text-muted-foreground">
          Consultoria de processos entende e modela. Execução e validação constroem e comprovam. Clique em cada NEXO
          para ver o que ele entrega.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-1.5 border-b border-border pb-2 text-center text-[11px] font-bold tracking-[0.1em] text-muted-foreground uppercase">
          <span className={cn(activeNexo < 2 && "text-[#5B6EF0]")}>Consultoria de Processos</span>
          <span className={cn(activeNexo >= 2 && "text-[#5B6EF0]")}>Execução, Validação e Testes</span>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {NEXOS.map((n, idx) => (
            <button
              key={n.num}
              type="button"
              onClick={() => setActiveNexo(idx)}
              className={cn(
                "flex flex-col items-center gap-2.5 rounded-xl border p-4 text-center transition-all",
                idx === activeNexo
                  ? "border-[#5B6EF0] bg-[#5B6EF0]/8 shadow-[0_8px_24px_rgba(91,110,240,0.14)]"
                  : "border-border bg-card hover:border-[#5B6EF0]/30"
              )}
            >
              <span
                className={cn(
                  "flex size-11 items-center justify-center rounded-full border-2 text-[15px] font-bold transition-colors",
                  idx === activeNexo ? "border-[#5B6EF0] bg-[#5B6EF0] text-[#14161F]" : "border-border text-muted-foreground"
                )}
              >
                {n.num}
              </span>
              <span className="text-[12.5px] font-bold text-foreground">{n.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 rounded-2xl border border-border bg-card p-8 md:grid-cols-2 md:p-10">
          <div className="flex flex-col gap-5">
            <div>
              <div className="mb-1.5 text-[10.5px] font-bold tracking-[0.1em] text-[#5B6EF0] uppercase">Objetivo</div>
              <p className="text-[14px] leading-relaxed text-foreground">{nexo.objetivo}</p>
            </div>
            <div>
              <div className="mb-1.5 text-[10.5px] font-bold tracking-[0.1em] text-[#5B6EF0] uppercase">Resultado</div>
              <p className="text-[16px] font-bold leading-snug text-foreground">{nexo.resultado}</p>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div>
              <div className="mb-2 text-[10.5px] font-bold tracking-[0.1em] text-[#5B6EF0] uppercase">Entregáveis</div>
              <div className="flex flex-wrap gap-1.5">
                {nexo.entregaveis.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#5B6EF0]/30 bg-[#5B6EF0]/8 px-3 py-1 text-[11.5px] font-semibold text-[#4457C4]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-1.5 text-[10.5px] font-bold tracking-[0.1em] text-[#5B6EF0] uppercase">Importância</div>
              <p className="text-[16px] font-bold leading-snug text-foreground">{nexo.importancia}</p>
            </div>
          </div>
        </div>
        <p className="mt-5 max-w-[680px] text-[13px] leading-relaxed text-muted-foreground italic">
          A jornada não termina na Validação. Depois do Vértice: acompanhamento estratégico mensal e evolução
          contínua.
        </p>
      </section>

      {/* ─── ROADMAP: ARQUITETURA ÚNICA, REGIONAIS EM PARALELO ─── */}
      <section className="reveal -mx-6 bg-foreground px-8 py-16 text-background md:-mx-10 md:px-14">
        <div className="mb-6 inline-flex items-center gap-2.5 text-[10.5px] font-semibold tracking-[0.13em] text-background/40 uppercase before:block before:h-px before:w-[18px] before:bg-[#5B6EF0] before:content-['']">
          Roadmap de Entrega
        </div>
        <h2 className="max-w-[680px] text-[clamp(24px,2.6vw,34px)] leading-[1.18] font-bold tracking-[-0.025em] text-background">
          Arquitetura única. Regionais em paralelo.
        </h2>
        <p className="mt-3 max-w-[680px] text-[14.5px] leading-relaxed text-background/55">
          O programa desenha o processo uma vez só. A partir daí, quantos CRAs estiverem prontos avançam juntos, ao
          mesmo tempo, sem esperar uns pelos outros.
        </p>

        <div className="mt-9 flex flex-col items-center gap-2">
          <div className="w-full max-w-[420px] rounded-xl border border-[#5B6EF0]/35 bg-[#5B6EF0]/10 p-5 text-center">
            <div className="text-[10px] font-bold tracking-[0.1em] text-[#5B6EF0] uppercase">Consultoria, uma vez</div>
            <div className="mt-1.5 text-[16px] font-bold text-background">Diagnóstico + Arquitetura</div>
            <div className="mt-1 text-[12px] text-background/55">Padrão nacional válido para todos os CRAs</div>
          </div>
          <div className="h-8 w-px bg-[#5B6EF0]/40" />
          <div className="text-[10.5px] font-bold tracking-[0.08em] text-[#5B6EF0] uppercase">
            Alimenta N regionais, ao mesmo tempo
          </div>
          <div className="h-8 w-px bg-[#5B6EF0]/40" />
        </div>

        <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {REGIONAIS.map((regional) => (
            <div key={regional.code} className="rounded-xl border border-[#5B6EF0]/25 bg-white/[0.04] p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[13px] font-bold text-background">{regional.code}</span>
                <span className="rounded-full border border-[#5B6EF0]/40 bg-[#5B6EF0]/15 px-2 py-0.5 text-[9px] font-bold tracking-[0.05em] text-[#5B6EF0] uppercase">
                  {regional.stage}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                {["Execução", "Validação", "Treinamento", "Go-live"].map((step) => (
                  <div key={step} className="flex items-center gap-2 text-[11px] font-medium text-background/60">
                    <span className="size-1.5 shrink-0 rounded-full bg-[#5B6EF0]" />
                    {step}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="flex items-center justify-center rounded-xl border border-dashed border-background/20 p-4 text-center text-[12.5px] font-semibold text-background/40">
            + demais Regionais, conforme o diagnóstico
          </div>
        </div>

        <p className="mt-6 max-w-[720px] text-[13.5px] leading-relaxed text-background/50 italic">
          Cada Regional inicia a Execução assim que a arquitetura é aprovada. Como o desenho é compartilhado, vários
          CRAs implantam e treinam ao mesmo tempo, e outra equipe cuida do treinamento enquanto a implementação
          avança.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-background/10 sm:grid-cols-4">
          {GAINS.map((gain, idx) => (
            <div key={gain} className="bg-foreground p-5">
              <div className="mb-3 flex size-7 items-center justify-center rounded-full bg-[#5B6EF0] text-[11px] font-bold text-[#14161F]">
                {String(idx + 1).padStart(2, "0")}
              </div>
              <div className="text-[13px] leading-snug font-bold text-background">{gain}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── ORIENTAÇÕES DO PROJETO ─── */}
      <section className="reveal py-16">
        <div className="mb-6 inline-flex items-center gap-2.5 text-[10.5px] font-semibold tracking-[0.13em] text-[#5B6EF0] uppercase before:block before:h-px before:w-[18px] before:bg-[#5B6EF0] before:content-['']">
          Orientações do Programa
        </div>
        <h2 className="max-w-[680px] text-[clamp(24px,2.6vw,34px)] leading-[1.18] font-bold tracking-[-0.025em] text-foreground">
          Como este programa roda, na prática.
        </h2>

        <div className="mt-8 flex flex-wrap items-baseline gap-4 rounded-xl border border-border bg-card p-6">
          <div className="text-[clamp(32px,3vw,44px)] font-bold text-[#5B6EF0] italic">90 a 120</div>
          <div>
            <div className="text-[11px] font-bold tracking-[0.1em] text-foreground uppercase">Dias por Conselho</div>
            <div className="text-[12px] text-muted-foreground">Janela para encerrar os ciclos de um CRA</div>
          </div>
        </div>
        <p className="mt-3 max-w-[680px] text-[13px] leading-relaxed text-muted-foreground italic">
          O prazo é uma média por Regional: varia conforme a quantidade de processos mapeados. Como a arquitetura é
          compartilhada entre todos os CRAs, essa janela pode rodar em paralelo em vários Regionais ao mesmo tempo,
          sem fila de espera entre eles.
        </p>

        <div className="mt-10 mb-4 text-[11px] font-bold tracking-[0.1em] text-[#5B6EF0] uppercase">
          Canais de comunicação
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {CHANNELS.map((channel) => (
            <div key={channel.title} className="rounded-xl border border-border bg-card p-5">
              <div className="mb-1.5 text-[10px] font-bold tracking-[0.08em] text-[#5B6EF0] uppercase">{channel.tag}</div>
              <div className="mb-1.5 text-[15px] font-bold text-foreground">{channel.title}</div>
              <p className="text-[12.5px] leading-relaxed text-muted-foreground">{channel.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 mb-4 text-[11px] font-bold tracking-[0.1em] text-[#5B6EF0] uppercase">
          Estratégia de treinamento
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {TRAINING.map((item) => (
            <div key={item.tag} className="rounded-xl border border-border bg-card p-5">
              <div className="mb-1.5 text-[10px] font-bold tracking-[0.08em] text-[#5B6EF0] uppercase">{item.tag}</div>
              <p className="text-[12.5px] leading-relaxed text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 max-w-[600px] border-l-2 border-[#5B6EF0]/40 pl-4 text-[13px] leading-relaxed text-muted-foreground italic">
          Treinamos durante todo o processo. Não esperamos o final para capacitar: cada entrega já inclui
          transferência de conhecimento.
        </p>

        <div className="mt-10 mb-4 text-[11px] font-bold tracking-[0.1em] text-[#5B6EF0] uppercase">Time de trabalho</div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member, idx) => (
            <div key={member.role} className="rounded-xl border border-border bg-card p-5">
              <div className="mb-3 flex size-7 items-center justify-center rounded-full bg-muted text-[11px] font-bold text-[#5B6EF0]">
                {String(idx + 1).padStart(2, "0")}
              </div>
              <div className="mb-1.5 text-[13.5px] font-bold text-foreground">{member.role}</div>
              <p className="text-[12px] leading-relaxed text-muted-foreground">{member.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── O QUE ESPERAMOS ─── */}
      <section className="reveal -mx-6 bg-foreground px-8 py-16 text-background md:-mx-10 md:px-14">
        <div className="mb-5 inline-flex items-center gap-2.5 text-[10.5px] font-semibold tracking-[0.13em] text-background/40 uppercase before:block before:h-px before:w-[18px] before:bg-[#5B6EF0] before:content-['']">
          O que esperamos do CFA e dos CRAs
        </div>
        <h2 className="max-w-[600px] text-[clamp(22px,2.4vw,30px)] leading-[1.2] font-bold tracking-[-0.02em] text-background">
          Dois critérios são inegociáveis: disponibilidade e mentalidade de mudança.
        </h2>
        <div className="mt-8 flex flex-col">
          {EXPECTATIONS.map((item) => (
            <div key={item.title} className="flex items-start gap-5 border-b border-background/10 py-5 last:border-b-0">
              <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-[#5B6EF0] text-[12px] text-[#5B6EF0]">
                ✓
              </span>
              <div>
                <h3 className="text-[15px] font-bold text-background">{item.title}</h3>
                <p className="mt-0.5 text-[13px] text-background/55">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── O QUE VOCÊ RECEBE ─── */}
      <section className="reveal py-16">
        <div className="mb-6 inline-flex items-center gap-2.5 text-[10.5px] font-semibold tracking-[0.13em] text-[#5B6EF0] uppercase before:block before:h-px before:w-[18px] before:bg-[#5B6EF0] before:content-['']">
          O que o CFA e os CRAs recebem
        </div>
        <h2 className="mb-8 max-w-[500px] text-[clamp(24px,2.6vw,34px)] leading-[1.18] font-bold tracking-[-0.025em] text-foreground">
          Sete entregas.
        </h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {DELIVERABLES.map((item) => (
            <div
              key={item.num}
              className="flex min-h-[150px] flex-col gap-2.5 rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-[#5B6EF0]/30 hover:shadow-[0_14px_38px_rgba(0,0,0,0.06)]"
            >
              <div className="text-[26px] font-bold text-[#5B6EF0] italic">{item.num}</div>
              <div className="text-[14.5px] font-bold text-foreground">{item.title}</div>
              <div className="text-[11.5px] leading-snug font-semibold text-muted-foreground">{item.description}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── ENCERRAMENTO ─── */}
      <section className="reveal -mx-6 mb-8 bg-foreground px-8 py-16 text-center text-background md:-mx-10 md:px-14">
        <div className="mx-auto max-w-[720px]">
          <p className="text-[clamp(19px,2vw,26px)] leading-[1.5] font-semibold text-background italic">
            Não vendemos sistemas: desenhamos a transformação digital da operação, por meio de processos organizados
            e sistemas robustos que sustentam essa união.
          </p>
          <Link
            href="/apresentacao"
            className="mt-7 inline-flex items-center gap-2 rounded-lg border border-background/25 bg-transparent px-6 py-3 text-sm font-semibold text-background transition-all hover:border-[#5B6EF0] hover:bg-[#5B6EF0]/10"
          >
            Voltar à apresentação do projeto
          </Link>
        </div>
      </section>

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
