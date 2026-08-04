"use client";

import { useState } from "react";
import { ContentCard } from "@/components/content/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { NavNode } from "@/lib/nav-tree";
import type { PageFrontmatter } from "@/lib/types";
import { cn } from "@/lib/utils";

export type ViewMode = "grid" | "list";

const VIEW_LABEL: Record<ViewMode, string> = { grid: "Grade", list: "Lista" };

export interface CardGridItem {
  node: NavNode;
  frontmatter: PageFrontmatter;
}

export interface CardGridProps {
  items: CardGridItem[];
  /** Prefixo de rota para os hrefs dos cards. Por padrão os slugs são absolutos ("/slug"). */
  basePath?: string;
  defaultView?: ViewMode;
  className?: string;
}

export function CardGrid({ items, basePath = "", defaultView = "grid", className }: CardGridProps) {
  const [view, setView] = useState<ViewMode>(defaultView);

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex items-center justify-end">
        <Select value={view} onValueChange={(value) => setView(value as ViewMode)}>
          <SelectTrigger aria-label="Modo de visualização" className="w-36">
            <SelectValue placeholder="Visualização">
              {(value: ViewMode | null) => (value ? VIEW_LABEL[value] : "Visualização")}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="grid">Grade</SelectItem>
            <SelectItem value="list">Lista</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {items.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-neutral-300 p-6 text-sm text-muted-foreground dark:border-neutral-700">
          Nenhum item cadastrado nesta seção ainda.
        </p>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ node, frontmatter }) => (
            <ContentCard
              key={node.slug}
              title={node.title}
              summary={frontmatter.summary}
              status={frontmatter.status}
              tags={frontmatter.tags}
              href={`${basePath}/${node.slug}`}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {items.map(({ node, frontmatter }) => (
            <ContentCard
              key={node.slug}
              compact
              title={node.title}
              summary={frontmatter.summary}
              status={frontmatter.status}
              tags={frontmatter.tags}
              href={`${basePath}/${node.slug}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
