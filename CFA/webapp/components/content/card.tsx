import Link from "next/link";
import { Card as UiCard, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { PageStatus } from "@/lib/types";

export interface ContentCardProps {
  title: string;
  summary?: string;
  status: PageStatus;
  tags?: string[];
  href: string;
  /** Layout compacto e horizontal, usado no modo "Lista" do CardGrid. */
  compact?: boolean;
  className?: string;
}

export function ContentCard({
  title,
  summary,
  tags = [],
  href,
  compact = false,
  className,
}: ContentCardProps) {
  return (
    <Link href={href} className="block h-full focus-visible:outline-none">
      <UiCard
        className={cn(
          "h-full rounded-2xl border border-transparent shadow-sm transition-colors duration-150 ease-out hover:border-[#5B6EF0] focus-visible:ring-2 focus-visible:ring-[#5B6EF0] focus-visible:ring-offset-2",
          compact && "flex-row items-center gap-4",
          className
        )}
      >
        <CardHeader className={cn(compact && "flex-1 grid-cols-[1fr_auto]")}>
          <CardTitle className="text-base font-semibold">{title}</CardTitle>
          {summary ? <CardDescription>{summary}</CardDescription> : null}
        </CardHeader>
        {tags.length > 0 ? (
          <CardContent className={cn("flex flex-wrap gap-1.5 pt-0", compact && "shrink-0 pt-0")}>
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="rounded-full">
                {tag}
              </Badge>
            ))}
          </CardContent>
        ) : null}
      </UiCard>
    </Link>
  );
}
