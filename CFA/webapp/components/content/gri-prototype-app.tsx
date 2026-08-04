"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GriSimulator } from "@/components/content/gri-simulator";
import {
  KPIS,
  PILLARS,
  FLOW_STEPS,
  KANBAN_BOARDS,
  KNOWLEDGE_SECTIONS,
  INTEGRATIONS,
  type TagColor,
} from "@/components/content/gri-prototype-data";
import { cn } from "@/lib/utils";

type TabKey = "visao" | "sim" | "kanban" | "know" | "int";

const TABS: { key: TabKey; label: string; icon: string }[] = [
  { key: "visao", label: "Visão Geral", icon: "◈" },
  { key: "sim", label: "Simulação de IA", icon: "▶" },
  { key: "kanban", label: "Kanbans", icon: "▦" },
  { key: "know", label: "Gestão de Conhecimento", icon: "✦" },
  { key: "int", label: "Integrações", icon: "⇄" },
];

const NAV_ITEMS: { key: TabKey; label: string }[] = [
  { key: "visao", label: "Visão Geral do GRI" },
  { key: "sim", label: "Simulação de IA" },
  { key: "kanban", label: "Kanbans de Atendimento" },
  { key: "know", label: "Gestão de Conhecimento" },
  { key: "int", label: "Integrações & Plataformas" },
];

const TAG_CLASSES: Record<TagColor, string> = {
  gold: "border-[#5B6EF0]/35 bg-[#5B6EF0]/10 text-[#4457C4]",
  green: "border-emerald-300 bg-emerald-50 text-emerald-800",
  blue: "border-blue-300 bg-blue-50 text-blue-800",
  red: "border-red-300 bg-red-50 text-red-800",
  gray: "border-neutral-200 bg-neutral-100 text-neutral-600",
  dark: "border-[#14161F] bg-[#14161F] text-[#5B6EF0]",
};

const COL_HEADER_CLASSES: Record<string, string> = {
  gold: "border-b-[#5B6EF0]",
  blue: "border-b-blue-500",
  green: "border-b-emerald-500",
  red: "border-b-red-500",
  dark: "border-b-[#14161F]",
};

const BADGE_CLASSES: Record<string, string> = {
  green: "bg-emerald-600 text-white",
  gold: "bg-[#5B6EF0] text-[#14161F]",
  red: "bg-red-600 text-white",
  gray: "bg-neutral-100 text-neutral-600 border border-neutral-200",
};

export function GriPrototypeApp() {
  const [tab, setTab] = useState<TabKey>("visao");
  const [board, setBoard] = useState(KANBAN_BOARDS[0].key);
  const [openSections, setOpenSections] = useState<Set<string>>(
    () => new Set(KNOWLEDGE_SECTIONS.filter((s) => s.defaultOpen).map((s) => s.id))
  );

  function toggleSection(id: string) {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="flex min-h-screen bg-white font-sans text-[#14161F] antialiased">
      {/* ─── SIDEBAR ─── */}
      <aside className="fixed inset-y-0 left-0 z-20 flex w-[272px] flex-col overflow-y-auto border-r border-black/[0.08] bg-white p-4 pt-6">
        <Link
          href="/apresentacao"
          className="mb-5 inline-flex items-center gap-2 rounded-lg border border-[#5B6EF0]/25 bg-[#5B6EF0]/8 px-3 py-2 text-[11.5px] font-bold text-[#4457C4] transition-colors hover:bg-[#5B6EF0]/15"
        >
          ← Voltar ao site institucional
        </Link>

        <div className="mb-4 flex items-center gap-2.5 border-b border-black/[0.08] px-2 pb-5">
          <Image src="/logo-cfa.png" alt="Logomarca do CFA" width={32} height={32} className="shrink-0" />
          <div className="flex flex-col leading-tight">
            <span className="text-[15px] font-bold tracking-[-0.3px]">
              CFA<span className="text-[#5B6EF0]">/CRAs</span>
            </span>
            <span className="mt-0.5 text-[10.5px] font-medium text-[#6B7280]">Plataforma Institucional</span>
          </div>
        </div>

        <div className="mb-2 mt-2 flex items-center gap-2 px-2 text-[10px] font-bold tracking-[0.13em] text-[#5B6EF0] uppercase">
          Núcleo Ativo · GRI
        </div>
        <nav className="flex flex-col gap-0.5">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setTab(item.key)}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-[13px] font-semibold transition-colors",
                tab === item.key ? "bg-[#14161F] text-white" : "text-[#444] hover:bg-black/[0.04]"
              )}
            >
              <span
                className={cn(
                  "size-1.5 shrink-0 rounded-full",
                  tab === item.key ? "bg-[#5B6EF0]" : "bg-black/15"
                )}
              />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto flex items-center gap-2.5 border-t border-black/[0.08] px-2 pt-4">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#14161F] text-[13px] font-bold text-[#5B6EF0]">
            NM
          </span>
          <div className="min-w-0">
            <div className="truncate text-[12.5px] font-bold">Nelly Miranda</div>
            <div className="truncate text-[10.5px] text-[#6B7280]">nelly.miranda@traevo.com.br</div>
          </div>
        </div>
      </aside>

      {/* ─── MAIN ─── */}
      <div className="flex min-w-0 flex-1 flex-col pl-[272px]">
        <header className="border-b border-black/[0.08] bg-white px-11 pt-8">
          <div className="mb-2.5 flex flex-wrap items-center gap-3">
            <h1 className="text-[26px] font-bold tracking-[-0.8px]">GRI, Gestão de Relacionamento Institucional</h1>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#14161F] bg-[#14161F] px-3.5 py-1 text-[10.5px] font-bold tracking-[0.05em] text-white uppercase">
              Núcleo <b className="text-[#5B6EF0]">01</b>
            </span>
            <span className="inline-flex items-center rounded-full border border-[#5B6EF0]/30 bg-[#5B6EF0]/10 px-3.5 py-1 text-[10.5px] font-bold tracking-[0.05em] text-[#4457C4] uppercase">
              CRM Institucional Integrado
            </span>
            <span className="inline-flex items-center rounded-full border border-black/[0.08] bg-white px-3.5 py-1 text-[10.5px] font-bold tracking-[0.05em] text-[#6B7280] uppercase">
              Protótipo
            </span>
          </div>
          <p className="mb-6 max-w-[880px] text-[13.5px] leading-relaxed text-[#6B7280]">
            Atendimento ao profissional com IA AssistPro integrada ao Bitrix24. Kanbans separados por setor mais um
            kanban exclusivo da IA. Escalada inteligente por sentimento, complexidade e intenção. Capacidade para
            mais de 1.257 automações em mais de 15 pipelines, com ganho de eficiência superior a 60%.
          </p>
          <div className="flex flex-wrap gap-2 pb-4">
            {TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg border px-4 py-2 text-[12.5px] font-semibold whitespace-nowrap transition-colors",
                  tab === t.key
                    ? "border-[#14161F] bg-[#14161F] text-white"
                    : "border-black/[0.08] bg-white text-[#444] hover:border-[#5B6EF0]/40 hover:bg-[#5B6EF0]/8"
                )}
              >
                <span className={cn("text-[12px]", tab === t.key ? "text-[#5B6EF0]" : "text-[#5B6EF0]")}>{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>
        </header>

        <main className="min-h-[60vh] flex-1 bg-[#F3F4F8] px-11 py-8">
          {tab === "visao" ? <VisaoGeralTab /> : null}
          {tab === "sim" ? <SimulacaoTab /> : null}
          {tab === "kanban" ? <KanbanTab board={board} setBoard={setBoard} /> : null}
          {tab === "know" ? <ConhecimentoTab openSections={openSections} toggleSection={toggleSection} /> : null}
          {tab === "int" ? <IntegracoesTab /> : null}
        </main>
      </div>
    </div>
  );
}

function SectionHeading({ label, title, description }: { label: string; title: string; description?: string }) {
  return (
    <div className="mb-5">
      <div className="mb-2 inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.13em] text-[#5B6EF0] uppercase before:block before:h-px before:w-4 before:bg-[#5B6EF0] before:content-['']">
        {label}
      </div>
      <h2 className="text-[20px] font-bold tracking-[-0.5px]">{title}</h2>
      {description ? <p className="mt-1.5 max-w-[760px] text-[13px] leading-relaxed text-[#6B7280]">{description}</p> : null}
    </div>
  );
}

function VisaoGeralTab() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        {KPIS.map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-xl border border-black/[0.08] bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-[#5B6EF0]/30 hover:shadow-[0_8px_28px_rgba(0,0,0,0.05)]"
          >
            <div className="mb-2 text-[10px] font-bold tracking-[0.1em] text-[#6B7280] uppercase">{kpi.label}</div>
            <div className="text-[28px] font-bold tracking-[-1px]">
              {kpi.value}
              <em className="text-[#5B6EF0] not-italic">{kpi.suffix}</em>
            </div>
            <div className="mt-2 text-[11px] leading-snug font-medium text-[#6B7280]">{kpi.sub}</div>
          </div>
        ))}
      </div>

      <div>
        <SectionHeading label="Arquitetura do Núcleo" title="Quatro pilares do GRI" />
        <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.num}
              className="relative overflow-hidden rounded-xl border border-black/[0.08] bg-white p-5.5 before:absolute before:inset-y-0 before:left-0 before:w-[3px] before:scale-y-0 before:bg-[#5B6EF0] before:transition-transform hover:before:scale-y-100"
            >
              <div className="text-[10px] font-bold tracking-[0.1em] text-[#5B6EF0]">{pillar.num}</div>
              <h3 className="mt-1.5 text-[14.5px] font-bold">{pillar.title}</h3>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-[#6B7280]">{pillar.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {pillar.tags.map((tag) => (
                  <span key={tag} className="rounded border border-black/[0.08] bg-[#F3F4F8] px-2 py-0.5 text-[10px] font-semibold text-[#555]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SectionHeading label="Fluxo Macro" title="Da mensagem ao pipeline do setor" />
        <FlowDiagram steps={FLOW_STEPS} />
      </div>

      <div className="rounded-xl border border-[#5B6EF0]/30 bg-[#5B6EF0]/8 p-4 text-[13px] leading-relaxed">
        <strong>Princípio Traevo:</strong> processo antes da tecnologia. Este protótipo materializa o diagnóstico do
        GRI, cada parâmetro da IA exibido na aba Gestão de Conhecimento é validado com a instituição antes da
        configuração no Bitrix24.
      </div>
    </div>
  );
}

function FlowDiagram({ steps }: { steps: typeof FLOW_STEPS }) {
  return (
    <div className="overflow-x-auto pb-1.5">
      <div className="flex min-w-max items-center">
        {steps.map((step, idx) => (
          <div key={step.title} className="flex items-center">
            <div
              className={cn(
                "rounded-lg px-5 py-3.5 text-center text-[12px] font-bold leading-tight",
                step.gold ? "bg-[#5B6EF0] text-[#14161F]" : "bg-[#14161F] text-white"
              )}
            >
              {step.title}
              <small className={cn("mt-0.5 block text-[10px] font-normal", step.gold ? "text-[#14161F]/60" : "text-white/55")}>
                {step.sub}
              </small>
            </div>
            {idx < steps.length - 1 ? <span className="px-3 text-[17px] font-bold text-[#5B6EF0]">→</span> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function SimulacaoTab() {
  return (
    <div className="flex flex-col gap-5">
      <SectionHeading
        label="Ambiente de Simulação"
        title="Simulação de IA, atendimento ao profissional"
        description="Selecione um cenário e clique em Iniciar simulação. Os três painéis mostram, em tempo real, a conversa no WhatsApp, as chamadas de integração e a movimentação no kanban da IA."
      />
      <GriSimulator />
    </div>
  );
}

function KanbanTab({ board, setBoard }: { board: string; setBoard: (key: string) => void }) {
  const current = KANBAN_BOARDS.find((b) => b.key === board) ?? KANBAN_BOARDS[0];

  return (
    <div className="flex flex-col gap-4">
      <SectionHeading
        label="Estrutura de Pipelines"
        title="Kanbans de Atendimento"
        description="Um kanban exclusivo para a IA, onde ficam os atendimentos que ela conduz e escala, e kanbans separados por setor, que recebem apenas o que exige intervenção humana, já com dossiê completo."
      />
      <div className="inline-flex w-fit flex-wrap gap-1.5 rounded-xl border border-black/[0.08] bg-white p-1.5">
        {KANBAN_BOARDS.map((b) => (
          <button
            key={b.key}
            type="button"
            onClick={() => setBoard(b.key)}
            className={cn(
              "rounded-lg px-4 py-2 text-[12.5px] font-semibold transition-colors",
              board === b.key ? "bg-[#14161F] text-white" : "text-[#555] hover:bg-[#5B6EF0]/10"
            )}
          >
            {b.label}
          </button>
        ))}
      </div>
      <p className="max-w-[800px] text-[11.5px] leading-relaxed text-[#6B7280]">{current.note}</p>
      <div className="flex items-start gap-3 overflow-x-auto pb-3">
        {current.columns.map((col) => (
          <div key={col.title} className="w-[220px] shrink-0 rounded-xl border border-black/[0.08] bg-white">
            <div className={cn("flex items-center justify-between border-b-2 px-3.5 py-3", COL_HEADER_CLASSES[col.color])}>
              <span className="text-[11px] font-bold tracking-[0.05em] uppercase">{col.title}</span>
              <span className="rounded-full border border-black/[0.08] bg-[#F3F4F8] px-2 py-0.5 text-[10px] font-bold text-[#6B7280]">
                {col.cards.length}
              </span>
            </div>
            <div className="flex flex-col gap-2 p-2.5">
              {col.cards.length === 0 ? (
                <div className="py-2 text-center text-[10.5px] font-medium text-neutral-300">vazio</div>
              ) : (
                col.cards.map((card) => (
                  <div
                    key={card.title}
                    className="rounded-lg border border-black/[0.08] bg-white p-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-all hover:-translate-y-0.5 hover:border-[#5B6EF0]/30"
                  >
                    <div className="text-[12px] font-bold leading-tight">{card.title}</div>
                    <div className="mt-0.5 text-[10.5px] leading-snug text-[#6B7280]">{card.sub}</div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {card.badges.map(([label, color]) => (
                        <span
                          key={label}
                          className={cn("rounded-full border px-2 py-0.5 text-[9px] font-bold whitespace-nowrap", TAG_CLASSES[color])}
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConhecimentoTab({
  openSections,
  toggleSection,
}: {
  openSections: Set<string>;
  toggleSection: (id: string) => void;
}) {
  return (
    <div className="flex flex-col gap-8">
      <SectionHeading
        label="Parâmetros da IA"
        title="Gestão de Conhecimento: o que a IA faz, onde não atua e quando escala"
        description="Base de regras que governa a IA AssistPro no GRI. Cada parâmetro abaixo é configurado no Bitrix24 e auditável: nenhuma decisão da IA acontece fora destes limites."
      />
      <div className="flex flex-col gap-3">
        {KNOWLEDGE_SECTIONS.map((section) => {
          const isOpen = openSections.has(section.id);
          return (
            <div key={section.id} className="overflow-hidden rounded-xl border border-black/[0.08] bg-white transition-colors hover:border-[#5B6EF0]/25">
              <button
                type="button"
                onClick={() => toggleSection(section.id)}
                className="flex w-full items-center gap-3.5 p-4 text-left"
              >
                <span className={cn("shrink-0 rounded-md px-2.5 py-1 text-[9.5px] font-bold tracking-[0.05em] whitespace-nowrap uppercase", BADGE_CLASSES[section.badgeColor])}>
                  {section.badge}
                </span>
                <h3 className="flex-1 text-[14px] font-bold">{section.title}</h3>
                <span className={cn("shrink-0 text-[10px] font-bold text-[#5B6EF0] transition-transform", isOpen && "rotate-180")}>▼</span>
              </button>
              {isOpen ? (
                <div className="border-t border-black/[0.08] p-5">
                  <p className="mb-3.5 text-[13px] leading-relaxed text-[#444]">{section.intro}</p>
                  {section.table ? <KnowledgeTable headers={section.table.headers} rows={section.table.rows} /> : null}
                  {section.list ? (
                    <ul className="flex flex-col">
                      {section.list.map((item, idx) => (
                        <li key={idx} className="flex gap-2.5 border-b border-black/[0.06] py-2 text-[12.5px] leading-relaxed font-medium last:border-b-0">
                          <span className="mt-1.5 size-[5px] shrink-0 rounded-full bg-[#5B6EF0]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {section.flow ? (
                    <>
                      <FlowDiagram steps={section.flow} />
                    </>
                  ) : null}
                  {section.note ? (
                    <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3.5 text-[13px] leading-relaxed">
                      {section.note}
                    </div>
                  ) : null}
                  {section.extraTable ? (
                    <div className="mt-4">
                      <KnowledgeTable headers={section.extraTable.headers} rows={section.extraTable.rows} />
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function KnowledgeTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="mb-4 overflow-x-auto rounded-lg border border-black/[0.08]">
      <table className="w-full min-w-[560px] border-collapse text-[12.5px]">
        <thead className="bg-[#F3F4F8]">
          <tr>
            {headers.map((h) => (
              <th key={h} className="border-b border-black/[0.08] px-4 py-2.5 text-left text-[10px] font-bold tracking-[0.05em] text-[#555] uppercase">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx}>
              {row.map((cell, cellIdx) => (
                <td key={cellIdx} className="border-b border-black/[0.06] px-4 py-2.5 align-top leading-relaxed last:font-bold last:text-[#4457C4]">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function IntegracoesTab() {
  return (
    <div className="flex flex-col gap-6">
      <SectionHeading
        label="Arquitetura Técnica"
        title="Integrações & Plataformas do GRI"
        description="Ecossistema técnico do núcleo, cada plataforma com papel definido e custo de licenças sob responsabilidade da instituição."
      />
      <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2 lg:grid-cols-3">
        {INTEGRATIONS.map((integration) => (
          <div key={integration.title} className="overflow-hidden rounded-xl border border-black/[0.08] bg-white">
            <div className="flex items-center gap-2 bg-[#14161F] px-4 py-3 text-[12px] font-bold text-white">
              <span className="size-1.5 rounded-full bg-[#5B6EF0]" />
              {integration.title}
            </div>
            <div className="p-4">
              <div className="mb-2.5 text-[10px] font-bold tracking-[0.07em] text-[#4457C4] uppercase">{integration.role}</div>
              {integration.rows.map((row) => (
                <div key={row} className="mb-1.5 flex gap-2 text-[12px] leading-relaxed text-[#444] last:mb-0">
                  <span className="shrink-0 font-bold text-[#5B6EF0]">→</span>
                  {row}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-[13px] leading-relaxed">
        <strong>Responsabilidade de custos:</strong> licenças Bitrix24, WhatsApp Business API, infraestrutura de
        integração e plataformas de terceiros são de responsabilidade exclusiva da instituição. A Traevo realiza
        implementação, configuração e treinamento.
      </div>
    </div>
  );
}
