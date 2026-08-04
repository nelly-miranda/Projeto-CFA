import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { PageStatus } from "@/lib/types";

const STATUS_LABEL: Record<PageStatus, string> = {
  rascunho: "Rascunho",
  em_revisao: "Em revisão",
  aprovado: "Aprovado",
  publicado: "Publicado",
};

// Cor de acento azul 5B6EF0 aplicada pontualmente (nunca como fundo dominante de página).
const STATUS_CLASS: Record<PageStatus, string> = {
  rascunho:
    "border-transparent bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300",
  em_revisao: "border-[#5B6EF0] bg-transparent text-[#5B6EF0]",
  aprovado: "border-transparent bg-[#5B6EF0] text-neutral-950",
  publicado: "border-transparent bg-neutral-950 text-[#5B6EF0] dark:bg-neutral-50 dark:text-[#4457C4]",
};

export interface StatusBadgeProps {
  status: PageStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn("rounded-full border font-medium", STATUS_CLASS[status], className)}
    >
      {STATUS_LABEL[status]}
    </Badge>
  );
}
