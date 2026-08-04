// Árvore de navegação estática do webapp CFA/CRAs.
// Espelha exatamente o sitemap do programa: cada NavNode corresponde a um
// arquivo content/{slug}.md. Não editar sem atualizar content/ em conjunto.

export type NavKind = "hub" | "leaf";

export interface NavNode {
  slug: string; // slug completo, ex. "documentos/plano-implementacao"
  title: string;
  kind: NavKind;
  children?: NavNode[]; // presente apenas em nós kind = "hub" com filhos
}

export const NAV_TREE: NavNode[] = [
  { slug: "home", title: "Programa CFA/CRAs", kind: "hub" },
  { slug: "apresentacao", title: "Apresentação do Projeto", kind: "leaf" },
  {
    slug: "contexto",
    title: "Objetivo e Contexto",
    kind: "hub",
    children: [
      { slug: "contexto/apresentacao-executiva", title: "Apresentação Executiva", kind: "leaf" },
      { slug: "contexto/acordao-tcu", title: "Acórdão e Momento Tecnológico", kind: "leaf" },
      { slug: "contexto/governanca-cfa", title: "Governança do CFA", kind: "leaf" },
    ],
  },
  {
    slug: "painel",
    title: "Painel de Controle Geral",
    kind: "hub",
    children: [{ slug: "painel/modelo-painel", title: "Modelo do Painel", kind: "leaf" }],
  },
  {
    slug: "metodologias",
    title: "Metodologias",
    kind: "hub",
    children: [
      {
        slug: "metodologias/metodo-vertice",
        title: "Método Vértice: a Jornada",
        kind: "leaf",
      },
      {
        slug: "metodologias/conexoes-inteligentes",
        title: "Conexões Inteligentes: os Núcleos",
        kind: "leaf",
      },
    ],
  },
  {
    slug: "sistemas-ia",
    title: "Sistemas e IA",
    kind: "hub",
    children: [
      { slug: "sistemas-ia/tr-novo-bot-ia", title: "TR Novo — Bot IA", kind: "leaf" },
      { slug: "sistemas-ia/bitrix24", title: "Bitrix24", kind: "leaf" },
      { slug: "sistemas-ia/ia", title: "Inteligência Artificial", kind: "leaf" },
    ],
  },
  {
    slug: "documentos",
    title: "Documentação Formal do Projeto",
    kind: "hub",
    children: [
      { slug: "documentos/vertice-conexoes", title: "Método Vértice e Conexões Inteligentes", kind: "leaf" },
      {
        slug: "documentos/plano-implementacao",
        title: "Plano de Implementação",
        kind: "hub",
        children: [
          {
            slug: "documentos/plano-implementacao/projeto-tecnico-cientifico",
            title: "Projeto Técnico-Científico CFA",
            kind: "leaf",
          },
          { slug: "documentos/plano-implementacao/tr-macro", title: "TR Macro", kind: "leaf" },
        ],
      },
    ],
  },
  { slug: "investimento", title: "Investimento do Projeto", kind: "leaf" },
];

/** Nós de nível raiz, exceto "home" — usados para montar o dashboard da home. */
export function getRootNodesExceptHome(): NavNode[] {
  return NAV_TREE.filter((node) => node.slug !== "home");
}

/** Busca recursiva de um nó pelo slug completo. */
export function findNavNode(slug: string, nodes: NavNode[] = NAV_TREE): NavNode | undefined {
  for (const node of nodes) {
    if (node.slug === slug) return node;
    if (node.children) {
      const found = findNavNode(slug, node.children);
      if (found) return found;
    }
  }
  return undefined;
}

/** Filhos diretos de um nó (vazio se for leaf ou não tiver filhos). Caso especial: "home". */
export function getChildren(slug: string): NavNode[] {
  if (slug === "home") return getRootNodesExceptHome();
  const node = findNavNode(slug);
  return node?.children ?? [];
}

/** Caminho da raiz até o nó (inclusive), para breadcrumbs. */
export function getBreadcrumb(slug: string): NavNode[] {
  const segments = slug.split("/");
  const path: NavNode[] = [];
  for (let i = 1; i <= segments.length; i++) {
    const partialSlug = segments.slice(0, i).join("/");
    const node = findNavNode(partialSlug);
    if (node) path.push(node);
  }
  return path;
}

/** Todos os slugs da árvore, em ordem de profundidade (pai antes dos filhos). */
export function getAllSlugs(nodes: NavNode[] = NAV_TREE): string[] {
  const slugs: string[] = [];
  for (const node of nodes) {
    slugs.push(node.slug);
    if (node.children) slugs.push(...getAllSlugs(node.children));
  }
  return slugs;
}
