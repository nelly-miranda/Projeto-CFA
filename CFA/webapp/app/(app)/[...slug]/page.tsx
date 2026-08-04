import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";
import { findNavNode, getChildren } from "@/lib/nav-tree";
import { getPageBySlug } from "@/lib/content";
import { CardGrid } from "@/components/content/card-grid";
import { HomeLauncherGrid } from "@/components/content/home-launcher-grid";
import { PageEditor } from "@/components/content/page-editor";
import { MarkdownView } from "@/components/content/markdown-view";
import { PanelPreview } from "@/components/content/panel-preview";
import { ApresentacaoSite } from "@/components/content/apresentacao-site";
import { MetodoVerticeJornada } from "@/components/content/metodo-vertice-jornada";
import { ConexoesInteligentesJornada } from "@/components/content/conexoes-inteligentes-jornada";
import type { PageData } from "@/lib/types";

interface PageParams {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: PageParams) {
  const { slug: slugParts } = await params;
  const slug = slugParts.join("/");
  const node = findNavNode(slug);
  return { title: node ? `${node.title} — Programa CFA/CRAs` : "Programa CFA/CRAs" };
}

function fallbackPage(slug: string, title: string, kind: "hub" | "leaf"): PageData {
  return {
    frontmatter: {
      title,
      slug,
      parent: null,
      kind,
      status: "rascunho",
      owner: "",
      tags: [],
      summary: "",
      updated: "",
    },
    content: "",
  };
}

export default async function ContentPage({ params }: PageParams) {
  const { slug: slugParts } = await params;
  const slug = slugParts.join("/");

  const node = findNavNode(slug);
  if (!node) {
    notFound();
  }

  if (slug === "apresentacao") {
    return <ApresentacaoSite />;
  }

  if (slug === "metodologias/metodo-vertice") {
    return <MetodoVerticeJornada />;
  }

  if (slug === "metodologias/conexoes-inteligentes") {
    return <ConexoesInteligentesJornada />;
  }

  const page = getPageBySlug(slug) ?? fallbackPage(slug, node.title, node.kind);

  if (node.kind === "leaf") {
    const embed = slug === "painel/modelo-painel" ? <PanelPreview key="painel-preview" /> : undefined;
    return <PageEditor page={page} embed={embed} />;
  }

  // kind === "hub": cabeçalho + corpo introdutório + CardGrid dos filhos.
  const children = getChildren(slug);
  const items = children.map((child) => ({
    node: child,
    frontmatter: (getPageBySlug(child.slug) ?? fallbackPage(child.slug, child.title, child.kind))
      .frontmatter,
  }));

  return (
    <div className="flex flex-col gap-6">
      <div className={cn("flex flex-col gap-2", slug === "home" && "items-center text-center")}>
        {slug === "home" ? (
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-5">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#5B6EF0]">
              Programa CFA/CRAs
            </span>
            <h1 className="text-balance text-3xl leading-[1.15] font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Programa Nacional de Transformação Digital e{" "}
              <span className="text-[#5B6EF0]">Governança Integrada</span> do Sistema CFA/CRAs
            </h1>
          </div>
        ) : (
          <h1 className="text-2xl font-bold">{page.frontmatter.title}</h1>
        )}
        {page.frontmatter.summary ? (
          <p
            className={cn(
              "text-muted-foreground",
              slug === "home" ? "mx-auto max-w-xl text-base" : "max-w-2xl text-sm"
            )}
          >
            {page.frontmatter.summary}
          </p>
        ) : null}
      </div>

      {page.content ? <MarkdownView content={page.content} /> : null}

      {slug === "home" ? (
        <HomeLauncherGrid items={items.map((item) => item.node)} />
      ) : (
        <CardGrid items={items} />
      )}
    </div>
  );
}
