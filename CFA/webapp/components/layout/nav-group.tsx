"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { NavItem } from "@/components/layout/nav-item";
import type { NavNode } from "@/lib/nav-tree";
import { cn } from "@/lib/utils";

export interface NavGroupProps {
  node: NavNode;
  depth?: number;
  /** Expandido por padrão (calculado a partir do breadcrumb do slug ativo). */
  defaultExpanded?: boolean;
}

export function NavGroup({ node, depth = 0, defaultExpanded = false }: NavGroupProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const pathname = usePathname();
  const isActiveSubtree =
    pathname === `/${node.slug}` || pathname?.startsWith(`/${node.slug}/`);

  const children = node.children ?? [];

  return (
    <div>
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
        style={{ paddingLeft: `${0.75 + depth * 1}rem` }}
        className={cn(
          "flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left text-sm transition-all duration-150 ease-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B6EF0] focus-visible:ring-offset-1",
          isActiveSubtree
            ? "bg-white font-semibold text-[#12153D] shadow-md"
            : "font-medium text-white/65 hover:bg-white/[0.06] hover:text-white"
        )}
      >
        <span>{node.title}</span>
        <ChevronRight
          className={cn(
            "size-4 shrink-0 transition-transform duration-150",
            isActiveSubtree ? "text-[#12153D]/50" : "text-white/30",
            expanded && "rotate-90"
          )}
        />
      </button>
      {expanded ? (
        <div className="mt-0.5 flex flex-col gap-0.5">
          {children.map((child) =>
            child.children && child.children.length > 0 ? (
              <NavGroup
                key={child.slug}
                node={child}
                depth={depth + 1}
                defaultExpanded={
                  pathname === `/${child.slug}` || pathname?.startsWith(`/${child.slug}/`)
                }
              />
            ) : (
              <NavItem key={child.slug} node={child} depth={depth + 1} />
            )
          )}
        </div>
      ) : null}
    </div>
  );
}
