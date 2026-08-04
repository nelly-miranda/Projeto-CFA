"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavNode } from "@/lib/nav-tree";
import { cn } from "@/lib/utils";

export interface NavItemProps {
  node: NavNode;
  /** Nível de profundidade na árvore, usado para indentação incremental. */
  depth?: number;
}

export function NavItem({ node, depth = 0 }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === `/${node.slug}`;

  return (
    <Link
      href={`/${node.slug}`}
      style={{ paddingLeft: `${0.75 + depth * 1}rem` }}
      className={cn(
        "flex items-center rounded-xl px-3 py-2.5 text-sm transition-all duration-150 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B6EF0] focus-visible:ring-offset-1",
        isActive
          ? "bg-white font-semibold text-[#12153D] shadow-md"
          : "font-medium text-white/65 hover:bg-white/[0.06] hover:text-white"
      )}
    >
      {node.title}
    </Link>
  );
}
