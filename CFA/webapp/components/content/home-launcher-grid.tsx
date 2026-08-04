import Link from "next/link";
import { Megaphone, Compass, Gauge, Workflow, Cpu, FileText, TrendingUp, BookOpen, type LucideIcon } from "lucide-react";
import type { NavNode } from "@/lib/nav-tree";
import { cn } from "@/lib/utils";

interface SectionVisual {
  icon: LucideIcon;
  bg: string;
  badge?: string;
}

const SECTION_VISUALS: Record<string, SectionVisual> = {
  apresentacao: { icon: Megaphone, bg: "bg-violet-500", badge: "Novo" },
  contexto: { icon: Compass, bg: "bg-sky-500" },
  painel: { icon: Gauge, bg: "bg-emerald-500", badge: "Novo" },
  metodologias: { icon: Workflow, bg: "bg-amber-500" },
  "sistemas-ia": { icon: Cpu, bg: "bg-fuchsia-500" },
  documentos: { icon: FileText, bg: "bg-slate-700" },
  investimento: { icon: TrendingUp, bg: "bg-rose-500" },
};

const DEFAULT_VISUAL: SectionVisual = { icon: FileText, bg: "bg-neutral-500" };

export function HomeLauncherGrid({ items }: { items: NavNode[] }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((node) => {
          const visual = SECTION_VISUALS[node.slug] ?? DEFAULT_VISUAL;
          const Icon = visual.icon;
          return (
            <Link
              key={node.slug}
              href={`/${node.slug}`}
              className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3.5 transition-all duration-150 hover:-translate-y-0.5 hover:border-[#5B6EF0]/40 hover:shadow-md"
            >
              <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-xl text-white", visual.bg)}>
                <Icon className="size-5" />
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="flex items-center gap-1.5">
                  <span className="truncate text-[13.5px] font-semibold text-foreground">{node.title}</span>
                  {visual.badge ? (
                    <span className="shrink-0 rounded-full bg-emerald-100 px-1.5 py-[1px] text-[9px] font-bold tracking-wide text-emerald-700 uppercase dark:bg-emerald-500/15 dark:text-emerald-400">
                      {visual.badge}
                    </span>
                  ) : null}
                </span>
                <span className="truncate text-[11.5px] text-muted-foreground">/{node.slug}</span>
              </span>
            </Link>
          );
        })}
      </div>

      <Link
        href="/documentos"
        className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-[12.5px] font-medium text-foreground transition-colors hover:border-[#5B6EF0]/40"
      >
        <BookOpen className="size-3.5" />
        Documentação
      </Link>
    </div>
  );
}
