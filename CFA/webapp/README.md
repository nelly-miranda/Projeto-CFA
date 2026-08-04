# CFA/CRAs — Webapp

Ambiente de apoio à decisão e apresentação institucional do Programa Nacional de
Transformação Digital e Governança Integrada do Sistema CFA/CRAs.

Este README cobre o essencial para rodar o projeto no dia a dia. A especificação
técnica completa (arquitetura, schema de frontmatter, componentes e regras de
negócio) que orientou esta implementação está registrada na sessão que gerou o
scaffold; os schemas vivem, na prática, em `lib/types.ts` e `lib/nav-tree.ts`.

## Stack

- Next.js 16 (App Router, TypeScript, Turbopack)
- Tailwind CSS v4 (tokens de tema em `app/globals.css`, sem `tailwind.config.ts` —
  Tailwind v4 configura tudo via CSS)
- shadcn/ui (base-ui/react) — componentes em `components/ui/`
- Conteúdo em Markdown com frontmatter (`gray-matter`) em `content/`, sem banco de
  dados nesta fase (Supabase é a persistência planejada para uma fase futura)
- Storybook para desenvolvimento isolado de componentes

## Rodando localmente

Instalar dependências (se ainda não instaladas):

```bash
npm install
```

Rodar o site:

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) — a rota raiz redireciona
para `/home`.

Rodar o Storybook (catálogo de componentes: Sidebar, Card, CardGrid, PageEditor,
StatusBadge, NavGroup, NavItem):

```bash
npm run storybook
```

Abrir [http://localhost:6006](http://localhost:6006).

Build de produção e checagem de tipos/lint:

```bash
npm run build
npm run lint
```

## Editando conteúdo

Cada página do site é um arquivo `.md` em `content/`, com frontmatter no formato
descrito em `lib/types.ts` (`PageFrontmatter`). Duas formas de editar:

1. **Direto no arquivo** — qualquer editor de texto ou agente com acesso ao
   repositório pode abrir e editar `content/**/*.md` diretamente.
2. **Pela interface** — em qualquer página do tipo "leaf", a aba "Editar" do
   `PageEditor` permite alterar título, responsável, status, tags, resumo e o
   corpo markdown; o botão "Salvar" grava via `PUT /api/content/{slug}`, que
   regrava o arquivo `.md` correspondente em disco.

Não crie ou renomeie páginas apenas editando `content/`: a árvore de navegação
(`lib/nav-tree.ts`, `NAV_TREE`) é a fonte da verdade da estrutura do site. Para
adicionar uma página nova, adicione o nó em `NAV_TREE` e crie o `.md`
correspondente com o mesmo slug.

## Estrutura

```
app/[...slug]/page.tsx     rota dinâmica: decide hub (CardGrid) x leaf (PageEditor)
app/api/content/[...slug]  GET/PUT/POST sobre o arquivo .md do slug
components/layout/         Sidebar, Header, NavGroup, NavItem
components/content/        Card (ContentCard), CardGrid, PageEditor, MarkdownView, StatusBadge
components/ui/             componentes shadcn/ui (gerados — evitar editar à mão)
content/                   um .md por página, frontmatter + corpo
lib/nav-tree.ts            NAV_TREE (estrutura de navegação) e helpers
lib/content.ts             leitura/escrita de content/ via gray-matter
lib/types.ts               PageFrontmatter, PageStatus, PageKind, PageData
```
