import { NextResponse } from "next/server";
import matter from "gray-matter";
import fs from "node:fs";
import { getContentFilePath, savePage } from "@/lib/content";
import { findNavNode } from "@/lib/nav-tree";
import type { PageFrontmatter, PageStatus } from "@/lib/types";

const VALID_STATUSES: PageStatus[] = ["rascunho", "em_revisao", "aprovado", "publicado"];

function joinSlug(slugParts: string[]): string {
  return slugParts.join("/");
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug: slugParts } = await params;
  const slug = joinSlug(slugParts);
  const filePath = getContentFilePath(slug);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json(
      { error: "Página ainda não possui conteúdo salvo." },
      { status: 404 }
    );
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return NextResponse.json({ frontmatter: data, content: content.trim() });
}

async function handleWrite(
  request: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug: slugParts } = await params;
  const slug = joinSlug(slugParts);

  const navNode = findNavNode(slug);
  if (!navNode) {
    return NextResponse.json({ error: "Página não encontrada na árvore de navegação." }, { status: 404 });
  }

  let body: { frontmatter?: PageFrontmatter; content?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corpo da requisição inválido (JSON esperado)." }, { status: 400 });
  }

  const { frontmatter, content } = body;

  if (!frontmatter || typeof content !== "string") {
    return NextResponse.json(
      { error: "Campos obrigatórios ausentes: frontmatter e content." },
      { status: 400 }
    );
  }

  if (frontmatter.slug !== slug) {
    return NextResponse.json(
      { error: "O slug do frontmatter não corresponde à URL e não é editável." },
      { status: 400 }
    );
  }

  if (frontmatter.kind !== navNode.kind) {
    return NextResponse.json(
      { error: "O kind do frontmatter não corresponde à árvore de navegação e não é editável." },
      { status: 400 }
    );
  }

  if (!frontmatter.title || typeof frontmatter.title !== "string") {
    return NextResponse.json({ error: "Campo obrigatório inválido: title." }, { status: 400 });
  }

  if (!VALID_STATUSES.includes(frontmatter.status)) {
    return NextResponse.json(
      { error: `Campo obrigatório inválido: status. Valores aceitos: ${VALID_STATUSES.join(", ")}.` },
      { status: 400 }
    );
  }

  const updatedFrontmatter: PageFrontmatter = {
    ...frontmatter,
    updated: new Date().toISOString().slice(0, 10),
  };

  try {
    const saved = savePage(slug, updatedFrontmatter, content);
    return NextResponse.json(saved);
  } catch (error) {
    console.error(`Falha ao gravar content/${slug}.md:`, error);
    return NextResponse.json({ error: "Falha ao gravar o arquivo." }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ slug: string[] }> }
) {
  return handleWrite(request, context);
}

// Alias para clientes que não enviam PUT.
export async function POST(
  request: Request,
  context: { params: Promise<{ slug: string[] }> }
) {
  return handleWrite(request, context);
}
