"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import type { NavNode } from "@/lib/nav-tree";
import { cn } from "@/lib/utils";

export interface NavItemProps {
  node: NavNode;
  /** Nível de profundidade na árvore, usado para indentação incremental. */
  depth?: number;
  /** Ícone exibido apenas nos itens de primeiro nível. */
  icon?: LucideIcon;
}

export function NavItem({ node, depth = 0, icon: Icon }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === `/${node.slug}`;

  return (
    <Link
      href={`/${node.slug}`}
      style={{ paddingLeft: `${0.75 + depth * 1}rem` }}
      className={cn(
        "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition-all duration-150 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B6EF0] focus-visible:ring-offset-1",
        isActive
          ? "bg-white font-semibold text-[#12153D] shadow-[0_10px_24px_-6px_rgba(0,0,0,0.45)]"
          : "font-medium text-white/65 hover:bg-white/[0.06] hover:text-white"
      )}
    >
      {Icon ? <Icon className={cn("size-4 shrink-0", isActive ? "text-[#12153D]" : "text-white/45")} /> : null}
      {node.title}
    </Link>
  );
}
