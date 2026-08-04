// Tipos de domínio do conteúdo do webapp CFA/CRAs.
// Toda página em content/ é descrita por um PageFrontmatter + corpo markdown (PageData).

export type PageKind = "hub" | "leaf";

export type PageStatus = "rascunho" | "em_revisao" | "aprovado" | "publicado";

export interface PageFrontmatter {
  title: string;
  slug: string;
  parent: string | null; // null representa "(raiz)"
  kind: PageKind;
  status: PageStatus;
  owner: string;
  tags: string[];
  summary: string;
  updated: string; // data ISO 8601, ex. "2026-08-04"
}

export interface PageData {
  frontmatter: PageFrontmatter;
  content: string; // corpo markdown, sem o frontmatter
}
