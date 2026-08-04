"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Megaphone,
  Compass,
  Gauge,
  Workflow,
  Cpu,
  FileText,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { NAV_TREE } from "@/lib/nav-tree";
import { NavGroup } from "@/components/layout/nav-group";
import { NavItem } from "@/components/layout/nav-item";

const SECTION_ICONS: Record<string, LucideIcon> = {
  home: LayoutDashboard,
  apresentacao: Megaphone,
  contexto: Compass,
  painel: Gauge,
  metodologias: Workflow,
  "sistemas-ia": Cpu,
  documentos: FileText,
  investimento: TrendingUp,
};

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-3 m-3 mr-0 flex h-[calc(100vh-1.5rem)] w-72 shrink-0 flex-col rounded-2xl bg-[#12153D] shadow-xl shadow-black/20 print:hidden">
      <Link href="/home" className="flex items-center gap-3 border-b border-white/10 px-5 py-5">
        <Image
          src="/logo-cfa.png"
          alt="Logomarca do CFA"
          width={40}
          height={40}
          className="shrink-0 rounded-md"
          priority
        />
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-semibold text-white">CFA/CRAs</span>
          <span className="text-xs text-white/45">Programa de Transformação Digital</span>
        </div>
      </Link>

      <div className="px-6 pt-5 pb-1 text-[10.5px] font-semibold tracking-[0.14em] text-white/35 uppercase">
        Seções
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 pt-2 pb-4">
        {NAV_TREE.map((node) =>
          node.children && node.children.length > 0 ? (
            <NavGroup
              key={node.slug}
              node={node}
              icon={SECTION_ICONS[node.slug]}
              defaultExpanded={pathname === `/${node.slug}` || pathname?.startsWith(`/${node.slug}/`)}
            />
          ) : (
            <NavItem key={node.slug} node={node} icon={SECTION_ICONS[node.slug]} />
          )
        )}
      </nav>

      <div className="border-t border-white/10 px-5 py-4">
        <div className="text-[13px] font-bold text-white/90">CFA/CRAs</div>
        <div className="text-[11px] text-white/35">v1.0.0 · conteúdo institucional</div>
      </div>
    </aside>
  );
}
