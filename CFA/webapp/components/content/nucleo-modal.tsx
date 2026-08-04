"use client";

import { useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface NucleoModalData {
  kicker: string;
  title: string;
  description: string;
  tableHeaders: [string, string];
  tableRows: [string, string][];
  note?: string;
  ctaHref?: string;
  ctaLabel?: string;
}

export function NucleoModal({
  data,
  onClose,
}: {
  data: NucleoModalData | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!data) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [data, onClose]);

  if (!data) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-foreground/40 p-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="max-h-[85vh] w-full max-w-[640px] overflow-y-auto rounded-2xl border border-border bg-card p-9 shadow-[0_30px_90px_rgba(0,0,0,0.28)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <span className="inline-flex items-center gap-2.5 text-[10.5px] font-bold tracking-[0.13em] text-[#5B6EF0] uppercase before:block before:h-px before:w-[18px] before:bg-[#5B6EF0] before:content-['']">
            {data.kicker}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-[#5B6EF0]"
          >
            ✕
          </button>
        </div>
        <h3 className="mt-4 text-2xl font-bold tracking-[-0.02em] text-foreground">{data.title}</h3>
        <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">{data.description}</p>

        <div className="mt-6 overflow-hidden rounded-xl border border-border">
          <table className="w-full border-collapse text-[13px]">
            <thead className="bg-muted">
              <tr>
                <th className="border-b border-border px-4 py-2.5 text-left font-semibold text-foreground">
                  {data.tableHeaders[0]}
                </th>
                <th className="border-b border-border px-4 py-2.5 text-left font-semibold text-foreground">
                  {data.tableHeaders[1]}
                </th>
              </tr>
            </thead>
            <tbody>
              {data.tableRows.map((row, idx) => (
                <tr key={idx} className={cn(idx % 2 === 1 && "bg-muted/40")}>
                  <td className="border-b border-border px-4 py-2.5 align-top font-medium text-foreground">{row[0]}</td>
                  <td className="border-b border-border px-4 py-2.5 align-top text-muted-foreground">{row[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {data.note ? <p className="mt-5 text-[12.5px] leading-relaxed text-muted-foreground">{data.note}</p> : null}

        {data.ctaHref ? (
          <Link
            href={data.ctaHref}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-[13px] font-semibold text-background transition-all hover:opacity-90"
          >
            {data.ctaLabel ?? "Saiba mais"}
            <svg width="13" height="13" viewBox="0 0 15 15" fill="none">
              <path d="M2.5 7.5h10M9 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        ) : null}
      </div>
    </div>
  );
}
