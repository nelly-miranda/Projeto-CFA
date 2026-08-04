"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { getBreadcrumb } from "@/lib/nav-tree";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export function Header() {
  const pathname = usePathname();
  const slug = pathname?.replace(/^\//, "") || "home";
  const breadcrumb = getBreadcrumb(slug);

  return (
    <header className="flex items-center justify-between gap-2 border-b border-neutral-200 px-6 py-4 text-sm text-muted-foreground print:hidden dark:border-neutral-800 md:px-10">
      <div className="flex items-center gap-2">
        {breadcrumb.length === 0 ? (
          <span className="font-medium text-foreground">Programa CFA/CRAs</span>
        ) : (
          breadcrumb.map((node, index) => (
            <span key={node.slug} className="flex items-center gap-2">
              {index > 0 ? <span className="text-neutral-300 dark:text-neutral-700">/</span> : null}
              <Link
                href={`/${node.slug}`}
                className={
                  index === breadcrumb.length - 1
                    ? "font-medium text-foreground"
                    : "hover:text-foreground"
                }
              >
                {node.title}
              </Link>
            </span>
          ))
        )}
      </div>
      <ThemeToggle />
    </header>
  );
}
