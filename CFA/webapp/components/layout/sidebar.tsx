"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_TREE } from "@/lib/nav-tree";
import { NavGroup } from "@/components/layout/nav-group";
import { NavItem } from "@/components/layout/nav-item";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-72 shrink-0 flex-col bg-[#12153D]">
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
              defaultExpanded={pathname === `/${node.slug}` || pathname?.startsWith(`/${node.slug}/`)}
            />
          ) : (
            <NavItem key={node.slug} node={node} />
          )
        )}
      </nav>
    </aside>
  );
}
