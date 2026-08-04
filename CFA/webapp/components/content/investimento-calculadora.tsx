"use client";

import { useMemo, useState } from "react";
import { Wrench, RefreshCw, Clock3, Users, Download, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

const inputClasses =
  "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30";

interface CalcItem {
  id: string;
  label: string;
  unit: string;
  baseQtyPerConselho: number;
  rate: number;
}

interface CalcBlock {
  id: "A" | "B" | "C";
  title: string;
  nature: string;
  icon: typeof Wrench;
  accent: string;
  items: CalcItem[];
  optional?: boolean;
}

const BLOCKS: CalcBlock[] = [
  {
    id: "A",
    title: "Bloco A · Serviços técnicos e implantação",
    nature: "Investimento · pagamento único",
    icon: Wrench,
    accent: "#5B6EF0",
    items: [
      {
        id: "a1",
        label: "Consultoria de mapeamento e modelagem de processos",
        unit: "hora",
        baseQtyPerConselho: 280,
        rate: 48061.6 / 280,
      },
      {
        id: "a2",
        label: "Consultoria de implementação e parametrização",
        unit: "hora",
        baseQtyPerConselho: 580,
        rate: 192482.6 / 580,
      },
      {
        id: "a3",
        label: "Treinamento e capacitação de usuários",
        unit: "hora",
        baseQtyPerConselho: 150,
        rate: 89.52,
      },
    ],
  },
  {
    id: "B",
    title: "Bloco B · Licenciamento e assinaturas",
    nature: "Custeio · recorrente anual",
    icon: RefreshCw,
    accent: "#059669",
    items: [
      {
        id: "b1",
        label: "Licença plataforma colaborativa (100 usuários)",
        unit: "mês",
        baseQtyPerConselho: 12,
        rate: 1119,
      },
      {
        id: "b2",
        label: "Assinatura WhatsApp Business API oficial",
        unit: "mês",
        baseQtyPerConselho: 12,
        rate: 450,
      },
      {
        id: "b3",
        label: "Módulo de IA integrado ao CRM (AssistPro)",
        unit: "mês",
        baseQtyPerConselho: 12,
        rate: 1330,
      },
      {
        id: "b4",
        label: "Telefonia IP (50 ramais, 5 simultâneas)",
        unit: "mês",
        baseQtyPerConselho: 12,
        rate: 1129,
      },
      {
        id: "b5",
        label: "Suporte técnico e manutenção",
        unit: "mês",
        baseQtyPerConselho: 12,
        rate: 0,
      },
    ],
  },
  {
    id: "C",
    title: "Bloco C · Banco de horas sob demanda",
    nature: "Investimento potencial · não obrigatório",
    icon: Clock3,
    accent: "#D97706",
    optional: true,
    items: [
      {
        id: "c1",
        label: "Banco de horas de desenvolvimento e customização",
        unit: "hora",
        baseQtyPerConselho: 200,
        rate: 320,
      },
    ],
  },
];

const currency = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const percent = new Intl.NumberFormat("pt-BR", { style: "percent", maximumFractionDigits: 1 });

function loadImageAsDataUrl(src: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas 2D context indisponível"));
        return;
      }
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => reject(new Error(`Falha ao carregar imagem: ${src}`));
    img.src = src;
  });
}

export function InvestimentoCalculadora() {
  const [numConselhos, setNumConselhos] = useState(1);
  const [overrides, setOverrides] = useState<Record<string, number>>({});
  const [includeBlockC, setIncludeBlockC] = useState(false);
  const [generating, setGenerating] = useState(false);

  function qtyFor(item: CalcItem) {
    return overrides[item.id] ?? Math.round(item.baseQtyPerConselho * numConselhos);
  }

  function setQty(id: string, value: number) {
    setOverrides((prev) => ({ ...prev, [id]: Math.max(0, value) }));
  }

  const hasOverrides = Object.keys(overrides).length > 0;

  const blockTotals = useMemo(() => {
    const totals: Record<string, number> = {};
    for (const block of BLOCKS) {
      totals[block.id] = block.items.reduce(
        (sum, item) => sum + (overrides[item.id] ?? Math.round(item.baseQtyPerConselho * numConselhos)) * item.rate,
        0
      );
    }
    return totals;
  }, [numConselhos, overrides]);

  const investimentoInicial = blockTotals.A + (includeBlockC ? blockTotals.C : 0);
  const custeioAnual = blockTotals.B;
  const totalAno1 = investimentoInicial + custeioAnual;
  const activeBlocks = BLOCKS.filter((block) => !block.optional || includeBlockC);

  async function handleGeneratePdf() {
    setGenerating(true);
    try {
      const [{ jsPDF }, autoTableModule, logoDataUrl] = await Promise.all([
        import("jspdf"),
        import("jspdf-autotable"),
        loadImageAsDataUrl("/logo-cfa.png").catch(() => null),
      ]);
      const autoTable = autoTableModule.default;

      const doc = new jsPDF({ unit: "mm", format: "a4" });
      const pageWidth = doc.internal.pageSize.getWidth();
      const marginX = 14;
      let y = 18;
      const generatedAt = new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });

      if (logoDataUrl) {
        doc.addImage(logoDataUrl, "PNG", marginX, y - 8, 15, 15);
      }
      const textX = logoDataUrl ? marginX + 19 : marginX;

      doc.setTextColor(91, 110, 240);
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.text("PROGRAMA CFA/CRAS", textX, y - 3);

      doc.setTextColor(20, 20, 20);
      doc.setFontSize(17);
      doc.text("Simulação de orçamento", textX, y + 4);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(110, 110, 110);
      doc.text(`Gerado em ${generatedAt}`, pageWidth - marginX, y - 3, { align: "right" });
      doc.text(`${numConselhos} conselho(s) simulado(s)`, pageWidth - marginX, y + 2, { align: "right" });

      y += 10;
      doc.setDrawColor(91, 110, 240);
      doc.setLineWidth(0.6);
      doc.line(marginX, y, pageWidth - marginX, y);
      y += 9;

      for (const block of activeBlocks) {
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(20, 20, 20);
        doc.text(block.title, marginX, y);
        doc.setFontSize(8.5);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(120, 120, 120);
        doc.text(block.nature, pageWidth - marginX, y, { align: "right" });
        y += 4;

        const rows = block.items.map((item) => [
          item.label,
          item.unit,
          String(qtyFor(item)),
          currency.format(item.rate),
          currency.format(qtyFor(item) * item.rate),
        ]);
        rows.push(["", "", "", "Subtotal do bloco", currency.format(blockTotals[block.id])]);

        autoTable(doc, {
          startY: y,
          margin: { left: marginX, right: marginX },
          head: [["Item", "Unidade", "Qtd.", "Valor unitário", "Valor total"]],
          body: rows,
          styles: { fontSize: 8.5, cellPadding: 2.2 },
          headStyles: { fillColor: [230, 232, 250], textColor: [20, 20, 20], fontStyle: "bold" },
          columnStyles: {
            2: { halign: "right" },
            3: { halign: "right" },
            4: { halign: "right" },
          },
          didParseCell: (data) => {
            if (data.row.index === rows.length - 1) {
              data.cell.styles.fontStyle = "bold";
            }
          },
        });

        y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 9;
      }

      doc.setDrawColor(91, 110, 240);
      doc.setLineWidth(0.6);
      doc.line(marginX, y, pageWidth - marginX, y);
      y += 7;

      const totalsCols = [
        { label: "Investimento inicial", value: investimentoInicial, highlight: false },
        { label: "Custeio anual recorrente", value: custeioAnual, highlight: false },
        { label: "Total estimado · ano 1", value: totalAno1, highlight: true },
      ];
      const colWidth = (pageWidth - marginX * 2) / 3;
      totalsCols.forEach((col, idx) => {
        const x = marginX + idx * colWidth;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7.5);
        doc.setTextColor(120, 120, 120);
        doc.text(col.label.toUpperCase(), x, y);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(13);
        if (col.highlight) {
          doc.setTextColor(91, 110, 240);
        } else {
          doc.setTextColor(20, 20, 20);
        }
        doc.text(currency.format(col.value), x, y + 6.5);
      });

      y += 16;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(130, 130, 130);
      const disclaimer =
        "Simulação baseada nos valores de referência de mercado do TR Novo do CRC-ES (um único Conselho Regional). " +
        "O dimensionamento financeiro final do programa nacional depende do diagnóstico Regional por Regional " +
        "previsto no Plano de Implantação.";
      const lines = doc.splitTextToSize(disclaimer, pageWidth - marginX * 2);
      doc.text(lines, marginX, y);

      doc.save(`orcamento-cfa-cras-${numConselhos}-conselhos.pdf`);
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Resumo do cenário */}
      <div className="flex flex-col gap-4 rounded-2xl border border-[#5B6EF0]/25 bg-[#5B6EF0]/[0.04] p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#5B6EF0] text-white">
            <Users className="size-5" />
          </span>
          <div>
            <div className="text-sm font-semibold text-foreground">Quantos conselhos (CFA + CRAs) entram nesta simulação?</div>
            <div className="text-xs text-muted-foreground">
              Define a quantidade padrão de cada item nos blocos abaixo. Você ainda pode ajustar item a item.
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            inputMode="numeric"
            value={String(numConselhos)}
            onChange={(event) => setNumConselhos(Math.max(1, Number(event.target.value.replace(/\D/g, "")) || 1))}
            className={cn(inputClasses, "h-10 w-24 text-center text-base font-semibold")}
          />
          <span className="text-sm text-muted-foreground">conselho(s)</span>
        </div>
      </div>

      {/* Formulários por bloco */}
      <div className="flex flex-col gap-4">
        {BLOCKS.map((block) => {
          const Icon = block.icon;
          const disabled = block.optional && !includeBlockC;
          return (
            <div key={block.id} className="overflow-hidden rounded-2xl border border-border bg-card">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4">
                <div className="flex items-center gap-3">
                  <span
                    className="flex size-9 shrink-0 items-center justify-center rounded-lg text-white"
                    style={{ backgroundColor: block.accent }}
                  >
                    <Icon className="size-4.5" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{block.title}</div>
                    <div className="text-[11.5px] text-muted-foreground">{block.nature}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {block.optional ? (
                    <label className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                      Incluir no orçamento
                      <button
                        type="button"
                        role="switch"
                        aria-checked={includeBlockC}
                        onClick={() => setIncludeBlockC((prev) => !prev)}
                        className={cn(
                          "relative h-6 w-11 shrink-0 rounded-full transition-colors",
                          includeBlockC ? "bg-[#5B6EF0]" : "bg-neutral-300 dark:bg-neutral-700"
                        )}
                      >
                        <span
                          className={cn(
                            "absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition-transform",
                            includeBlockC && "translate-x-5"
                          )}
                        />
                      </button>
                    </label>
                  ) : null}
                  <div className="text-right">
                    <div className="text-[11px] text-muted-foreground">Subtotal do bloco</div>
                    <div className="text-base font-bold text-foreground">{currency.format(blockTotals[block.id])}</div>
                  </div>
                </div>
              </div>

              <div className={cn("overflow-x-auto", disabled && "pointer-events-none opacity-40")}>
                <table className="w-full border-collapse text-sm">
                  <thead className="bg-neutral-100 dark:bg-neutral-800">
                    <tr>
                      <th className="border-b border-neutral-200 px-3 py-2 text-left font-semibold dark:border-neutral-700">
                        Item
                      </th>
                      <th className="border-b border-neutral-200 px-3 py-2 text-left font-semibold dark:border-neutral-700">
                        Unidade
                      </th>
                      <th className="border-b border-neutral-200 px-3 py-2 text-right font-semibold dark:border-neutral-700">
                        Quantidade
                      </th>
                      <th className="border-b border-neutral-200 px-3 py-2 text-right font-semibold dark:border-neutral-700">
                        Valor unitário
                      </th>
                      <th className="border-b border-neutral-200 px-3 py-2 text-right font-semibold dark:border-neutral-700">
                        Valor total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {block.items.map((item) => (
                      <tr key={item.id}>
                        <td className="border-b border-neutral-200 px-3 py-2 align-top dark:border-neutral-800">
                          {item.label}
                        </td>
                        <td className="border-b border-neutral-200 px-3 py-2 align-top text-muted-foreground dark:border-neutral-800">
                          {item.unit}
                        </td>
                        <td className="border-b border-neutral-200 px-3 py-2 align-top dark:border-neutral-800">
                          <input
                            type="text"
                            inputMode="numeric"
                            disabled={disabled}
                            value={String(qtyFor(item))}
                            onChange={(event) => setQty(item.id, Number(event.target.value.replace(/\D/g, "")) || 0)}
                            className={cn(inputClasses, "ml-auto w-24 text-right")}
                          />
                        </td>
                        <td className="border-b border-neutral-200 px-3 py-2 text-right align-top text-muted-foreground dark:border-neutral-800">
                          {currency.format(item.rate)}
                        </td>
                        <td className="border-b border-neutral-200 px-3 py-2 text-right align-top font-semibold text-foreground dark:border-neutral-800">
                          {currency.format(qtyFor(item) * item.rate)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}

        {hasOverrides ? (
          <button
            type="button"
            onClick={() => setOverrides({})}
            className="inline-flex w-fit items-center gap-1.5 self-end text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="size-3.5" />
            Restaurar quantidades automáticas
          </button>
        ) : null}
      </div>

      {/* Totais e geração de PDF */}
      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-foreground p-6 text-background">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <div className="text-[11px] tracking-wide text-background/55 uppercase">Investimento inicial</div>
            <div className="mt-1 text-xl font-bold text-background">{currency.format(investimentoInicial)}</div>
            <div className="text-[11px] text-background/40">
              Bloco A{includeBlockC ? " + Bloco C" : ""} · pagamento único
            </div>
          </div>
          <div>
            <div className="text-[11px] tracking-wide text-background/55 uppercase">Custeio anual recorrente</div>
            <div className="mt-1 text-xl font-bold text-background">{currency.format(custeioAnual)}</div>
            <div className="text-[11px] text-background/40">Bloco B · repete a cada exercício</div>
          </div>
          <div>
            <div className="text-[11px] tracking-wide text-[#8C98F5] uppercase">Total estimado · ano 1</div>
            <div className="mt-1 text-2xl font-bold text-[#8C98F5]">{currency.format(totalAno1)}</div>
            <div className="text-[11px] text-background/40">{numConselhos} conselho(s) simulado(s)</div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGeneratePdf}
          disabled={generating}
          className="inline-flex w-fit items-center gap-2 rounded-full bg-[#5B6EF0] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:opacity-90 disabled:pointer-events-none disabled:opacity-60"
        >
          <Download className="size-4" />
          {generating ? "Gerando PDF…" : "Gerar PDF do orçamento"}
        </button>
      </div>

      {/* Resumo analítico da composição do preço */}
      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#5B6EF0]">
            Resumo analítico
          </span>
          <h3 className="mt-1 text-base font-bold text-foreground">Como o orçamento foi composto</h3>
        </div>

        <div className="flex flex-col gap-3">
          {activeBlocks.map((block) => (
            <div key={block.id} className="rounded-xl border border-border/70 p-3.5">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[13px] font-semibold text-foreground">{block.title}</span>
                <span className="text-[13px] font-bold text-foreground">{currency.format(blockTotals[block.id])}</span>
              </div>
              <ul className="mt-2 flex flex-col gap-1">
                {block.items.map((item) => {
                  const qty = qtyFor(item);
                  const isOverridden = overrides[item.id] !== undefined;
                  return (
                    <li key={item.id} className="flex flex-wrap items-baseline justify-between gap-x-3 text-[12px] text-muted-foreground">
                      <span>
                        {item.label} —{" "}
                        {isOverridden ? (
                          <>
                            <strong className="font-medium text-foreground">{qty}</strong> {item.unit} (ajustado manualmente)
                          </>
                        ) : (
                          <>
                            {item.baseQtyPerConselho} {item.unit} × {numConselhos} conselho(s) ={" "}
                            <strong className="font-medium text-foreground">{qty}</strong> {item.unit}
                          </>
                        )}{" "}
                        × {currency.format(item.rate)}
                      </span>
                      <span className="font-medium text-foreground">{currency.format(qty * item.rate)}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="rounded-xl bg-[#5B6EF0]/[0.05] p-3.5 text-[12.5px] leading-relaxed text-muted-foreground">
          Para <strong className="font-semibold text-foreground">{numConselhos} conselho(s)</strong>, o{" "}
          <strong className="font-semibold text-foreground">investimento inicial</strong> de{" "}
          {currency.format(investimentoInicial)} corresponde a{" "}
          {percent.format(totalAno1 ? investimentoInicial / totalAno1 : 0)} do total do ano 1 e reúne o Bloco A
          {includeBlockC ? " e o Bloco C" : ""}, pagos uma única vez. O{" "}
          <strong className="font-semibold text-foreground">custeio anual recorrente</strong> de{" "}
          {currency.format(custeioAnual)} ({percent.format(totalAno1 ? custeioAnual / totalAno1 : 0)} do total do ano
          1) refere-se apenas ao Bloco B e se repete a cada exercício enquanto o contrato estiver vigente. Somados,
          os dois compõem o <strong className="font-semibold text-foreground">total estimado do ano 1</strong> de{" "}
          {currency.format(totalAno1)}.
        </div>
      </div>
    </div>
  );
}
