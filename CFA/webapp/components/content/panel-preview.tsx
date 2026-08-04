"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface Cra {
  code: string;
  name: string;
}

interface Metric {
  key: string;
  label: string;
  panelSub: string;
  unit: string;
  values: Record<string, number>;
}

const CRAS: Cra[] = [
  { code: "SP", name: "CRA-SP" },
  { code: "RJ", name: "CRA-RJ" },
  { code: "MG", name: "CRA-MG" },
  { code: "BA", name: "CRA-BA" },
  { code: "RS", name: "CRA-RS" },
  { code: "PR", name: "CRA-PR" },
  { code: "CE", name: "CRA-CE" },
  { code: "PE", name: "CRA-PE" },
];

const METRICS: Metric[] = [
  {
    key: "tarefas",
    label: "Tarefas em aberto",
    panelSub: "Fiscalização e registro — processos aguardando ação",
    unit: "",
    values: { SP: 61, RJ: 54, MG: 47, BA: 39, RS: 35, PR: 30, CE: 22, PE: 18 },
  },
  {
    key: "atendimento",
    label: "Atendimentos — resolução no 1º contato",
    panelSub: "Percentual de solicitações resolvidas sem escalonamento humano",
    unit: "%",
    values: { SP: 78, RJ: 74, MG: 71, BA: 69, RS: 73, PR: 68, CE: 62, PE: 60 },
  },
  {
    key: "solicitacoes",
    label: "Solicitações recebidas (GRI) no mês",
    panelSub: "Volume de interações institucionais por canal",
    unit: "",
    values: { SP: 210, RJ: 185, MG: 160, BA: 140, RS: 150, PR: 120, CE: 95, PE: 80 },
  },
];

function avg(values: Record<string, number>) {
  const codes = Object.keys(values);
  return codes.reduce((s, c) => s + values[c], 0) / codes.length;
}

function total(values: Record<string, number>) {
  return Object.values(values).reduce((s, v) => s + v, 0);
}

function fmt(n: number, unit: string) {
  return `${Math.round(n)}${unit}`;
}

function craName(code: string) {
  return CRAS.find((c) => c.code === code)?.name ?? code;
}

function synthTrend(final: number, seed: number) {
  const pts: number[] = [];
  for (let i = 0; i < 6; i++) {
    const wobble = Math.sin(seed + i * 1.7) * final * 0.03;
    const ramp = final * (0.82 + i * 0.032);
    pts.push(Math.max(0, ramp + wobble));
  }
  pts[5] = final;
  return pts;
}

function Sparkline({ points, width = 64, height = 22 }: { points: number[]; width?: number; height?: number }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const step = width / (points.length - 1);
  const coords = points.map((p, i) => [i * step, height - ((p - min) / range) * (height - 4) - 2]);
  const path = coords.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const [lastX, lastY] = coords[coords.length - 1];

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="shrink-0">
      <path d={path} fill="none" className="stroke-muted-foreground" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={lastX.toFixed(1)} cy={lastY.toFixed(1)} r={2.6} className="fill-accent" />
    </svg>
  );
}

function TipMark({ tip, children }: { tip: string; children: React.ReactElement }) {
  return (
    <Tooltip>
      <TooltipTrigger render={children} />
      <TooltipContent>{tip}</TooltipContent>
    </Tooltip>
  );
}

export function PanelPreview() {
  const [view, setView] = useState<"federal" | "cra">("federal");
  const [cra, setCra] = useState("SP");
  const [tableOpen, setTableOpen] = useState(false);

  const kpis = useMemo(() => {
    return METRICS.map((m, idx) => {
      const nationalAvg = avg(m.values);
      const isFederal = view === "federal";
      const value = isFederal
        ? m.key === "atendimento"
          ? nationalAvg
          : total(m.values)
        : m.values[cra];
      const deltaLabel = isFederal
        ? m.key === "atendimento"
          ? "média entre 8 Regionais"
          : "consolidado nacional"
        : `${value - nationalAvg > 0 ? "+" : ""}${fmt(value - nationalAvg, m.unit)} vs média nacional`;
      const seed = idx * 3 + (isFederal ? 0 : cra.length);
      const trendFinal = isFederal ? (m.key === "atendimento" ? nationalAvg : total(m.values)) : value;
      return { metric: m, value, deltaLabel, trend: synthTrend(trendFinal, seed) };
    });
  }, [view, cra]);

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-muted/40 p-4">
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold uppercase tracking-wide text-accent">Pré-visualização (mockup)</span>
        <p className="text-xs text-muted-foreground">
          Dados fictícios para ilustrar a estrutura descrita nesta página — a implementação técnica ocorre na fase de
          Arquitetura de cada onda.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-card p-3">
        <div className="inline-flex overflow-hidden rounded-lg border border-border">
          <Button
            type="button"
            size="sm"
            variant={view === "federal" ? "default" : "ghost"}
            className="rounded-none"
            onClick={() => setView("federal")}
          >
            Visão Federal (CFA)
          </Button>
          <Button
            type="button"
            size="sm"
            variant={view === "cra" ? "default" : "ghost"}
            className="rounded-none"
            onClick={() => setView("cra")}
          >
            Visão por CRA
          </Button>
        </div>

        {view === "cra" ? (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Regional:</span>
            <Select value={cra} onValueChange={(value) => value && setCra(value)}>
              <SelectTrigger size="sm">
                <SelectValue>{craName(cra)}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {CRAS.map((c) => (
                  <SelectItem key={c.code} value={c.code}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : null}

        <div className="flex-1" />

        <Button type="button" size="sm" variant="outline" onClick={() => setTableOpen((v) => !v)}>
          {tableOpen ? "Ocultar tabela" : "Ver dados em tabela"}
        </Button>
      </div>

      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
        {view === "federal" ? (
          <>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2.5 rounded-sm bg-chart-4" /> Regionais (8 CRAs)
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-0 w-3.5 border-t-2 border-dashed border-accent" /> Média nacional (Federal/CFA)
            </span>
          </>
        ) : (
          <>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2.5 rounded-sm bg-chart-4/50" /> Faixa nacional (sem identificar outros CRAs)
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-0 w-3.5 border-t-2 border-dashed border-muted-foreground" /> Média nacional
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-accent" /> {craName(cra)} (selecionado)
            </span>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {kpis.map(({ metric, value, deltaLabel, trend }) => (
          <div key={metric.key} className="flex flex-col gap-1.5 rounded-lg border border-border bg-card p-3">
            <span className="text-[11px] font-semibold text-muted-foreground">{metric.label}</span>
            <span className="text-2xl font-bold tabular-nums tracking-tight">{fmt(value, metric.unit)}</span>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">{deltaLabel}</span>
              <Sparkline points={trend} />
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {METRICS.map((m) => (
          <MetricPanel key={m.key} metric={m} view={view} cra={cra} />
        ))}
      </div>

      {tableOpen ? (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="border-b border-border px-3 py-2 text-left font-semibold">Regional</th>
                <th className="border-b border-border px-3 py-2 text-right font-semibold">Tarefas em aberto</th>
                <th className="border-b border-border px-3 py-2 text-right font-semibold">Atendimentos — 1º contato</th>
                <th className="border-b border-border px-3 py-2 text-right font-semibold">Solicitações (GRI/mês)</th>
              </tr>
            </thead>
            <tbody>
              {CRAS.map((c) => (
                <tr key={c.code}>
                  <td className="border-b border-border px-3 py-2 font-medium">{c.name}</td>
                  {METRICS.map((m) => (
                    <td key={m.key} className="border-b border-border px-3 py-2 text-right tabular-nums">
                      {fmt(m.values[c.code], m.unit)}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="px-3 py-2 font-medium italic text-muted-foreground">Média nacional</td>
                {METRICS.map((m) => (
                  <td key={m.key} className="px-3 py-2 text-right italic tabular-nums text-muted-foreground">
                    {fmt(avg(m.values), m.unit)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}

function MetricPanel({ metric, view, cra }: { metric: Metric; view: "federal" | "cra"; cra: string }) {
  const nationalAvg = avg(metric.values);

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border bg-card p-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold">{metric.label}</div>
          <div className="text-xs text-muted-foreground">{metric.panelSub}</div>
        </div>
        <div className="whitespace-nowrap text-right text-xs text-muted-foreground">
          Média nacional
          <br />
          <span className="font-bold text-foreground">{fmt(nationalAvg, metric.unit)}</span>
        </div>
      </div>

      {view === "federal" ? <FederalBars metric={metric} nationalAvg={nationalAvg} /> : <CraRange metric={metric} nationalAvg={nationalAvg} cra={cra} />}
    </div>
  );
}

function FederalBars({ metric, nationalAvg }: { metric: Metric; nationalAvg: number }) {
  const sorted = [...CRAS].sort((a, b) => metric.values[b.code] - metric.values[a.code]);
  const max = Math.max(sorted[0] ? metric.values[sorted[0].code] : 0, nationalAvg) * 1.12;
  const benchPct = (nationalAvg / max) * 100;

  return (
    <div className="flex flex-col gap-1.5">
      {sorted.map((c) => {
        const value = metric.values[c.code];
        const pct = (value / max) * 100;
        return (
          <div key={c.code} className="grid grid-cols-[3.5rem_1fr_3rem] items-center gap-2.5">
            <span className="text-xs font-semibold text-muted-foreground">{c.name}</span>
            <div className="relative h-3.5 rounded bg-muted">
              <div className="pointer-events-none absolute -top-1 -bottom-1 w-0 border-l-2 border-dashed border-accent" style={{ left: `${benchPct}%` }} />
              <TipMark tip={`${c.name}: ${fmt(value, metric.unit)}`}>
                <div className="absolute inset-y-0 left-0 rounded bg-chart-4" style={{ width: `${pct}%` }} />
              </TipMark>
            </div>
            <span className="text-right text-xs font-bold tabular-nums">{fmt(value, metric.unit)}</span>
          </div>
        );
      })}
    </div>
  );
}

function CraRange({ metric, nationalAvg, cra }: { metric: Metric; nationalAvg: number; cra: string }) {
  const codes = Object.keys(metric.values);
  const min = Math.min(...codes.map((c) => metric.values[c]));
  const max = Math.max(...codes.map((c) => metric.values[c]));
  const lo = min * 0.9;
  const hi = max * 1.08;
  const span = hi - lo;
  const value = metric.values[cra];
  const delta = value - nationalAvg;

  const pct = (v: number) => ((v - lo) / span) * 100;

  return (
    <div className="flex flex-col gap-2">
      <div className="relative h-9 rounded-lg bg-muted">
        <TipMark tip={`Faixa nacional: ${fmt(min, metric.unit)} a ${fmt(max, metric.unit)}`}>
          <div
            className="absolute inset-y-0 rounded-lg bg-chart-4/50"
            style={{ left: `${pct(min)}%`, width: `${pct(max) - pct(min)}%` }}
          />
        </TipMark>
        <div className="pointer-events-none absolute -top-1.5 -bottom-1.5 w-0 border-l-2 border-dashed border-muted-foreground" style={{ left: `${pct(nationalAvg)}%` }} />
        <TipMark tip={`${craName(cra)}: ${fmt(value, metric.unit)}`}>
          <div
            className="absolute top-1/2 size-4.5 -translate-y-1/2 -translate-x-1/2 rounded-full border-2 border-card bg-accent shadow"
            style={{ left: `${pct(value)}%` }}
          />
        </TipMark>
      </div>
      <div className="flex justify-between text-[11px] tabular-nums text-muted-foreground">
        <span>{fmt(min, metric.unit)}</span>
        <span>{fmt(max, metric.unit)}</span>
      </div>
      <div className="text-xs text-muted-foreground">
        <span className="font-bold text-foreground">
          {craName(cra)}: {fmt(value, metric.unit)}
        </span>{" "}
        · {delta > 0 ? "+" : ""}
        {fmt(delta, metric.unit)} em relação à média nacional
      </div>
    </div>
  );
}
