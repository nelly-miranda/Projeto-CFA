import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { PageData, PageFrontmatter } from "@/lib/types";
import { getAllSlugs } from "@/lib/nav-tree";

export const CONTENT_DIR = path.join(process.cwd(), "content");

/** Caminho absoluto do arquivo .md correspondente a um slug (não valida existência). */
export function getContentFilePath(slug: string): string {
  return path.join(CONTENT_DIR, `${slug}.md`);
}

/** Lê e faz parse do arquivo .md de um slug. Retorna null se o arquivo não existir. */
export function getPageBySlug(slug: string): PageData | null {
  const filePath = getContentFilePath(slug);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    frontmatter: data as PageFrontmatter,
    content: content.trim(),
  };
}

/** Lê todas as páginas cujo slug está registrado em NAV_TREE (lib/nav-tree.ts). */
export function getAllPages(): PageData[] {
  return getAllSlugs()
    .map((slug) => getPageBySlug(slug))
    .filter((page): page is PageData => page !== null);
}

/**
 * Grava (ou cria) o arquivo .md de um slug com o frontmatter e corpo fornecidos.
 * Cria diretórios intermediários automaticamente quando o arquivo ainda não existe.
 */
export function savePage(slug: string, frontmatter: PageFrontmatter, content: string): PageData {
  const filePath = getContentFilePath(slug);
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });

  const fileContents = matter.stringify(content, frontmatter);
  fs.writeFileSync(filePath, fileContents, "utf8");

  return { frontmatter, content };
}
