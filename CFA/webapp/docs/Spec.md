# SPEC.md — Ambiente CFA/CRAs (Webapp)

Especificação técnica do webapp interno de apoio à decisão e apresentação institucional do Programa Nacional de Transformação Digital e Governança Integrada do Sistema CFA/CRAs.

Este documento é a referência de implementação para qualquer sessão (humana ou de agente de IA) que for construir, alterar ou revisar o webapp. O projeto roda em:

```
C:/Users/nelly/OneDrive/Área de Trabalho/GovTech/CFA/webapp
```

## 1. Princípios de arquitetura

1. O conteúdo é a fonte da verdade. Cada página do site corresponde a exatamente um arquivo Markdown com frontmatter dentro de `content/`. O webapp é uma camada de leitura e edição amigável sobre esses arquivos.
2. Não há banco de dados nesta fase. Qualquer agente com acesso ao repositório pode ler ou editar o conteúdo diretamente nos arquivos `.md`, sem depender de uma API própria.
3. Supabase é a escolha planejada para uma fase futura de persistência (multiusuário concorrente, histórico de versões, autenticação). Nesta fase ele não é implementado, apenas documentado como intenção no Briefing/PRD do projeto.
4. O webapp precisa ser apresentável, pois também será usado para apresentar o programa à diretoria completa do CFA.

## 2. Árvore de pastas do projeto

```
webapp/
  app/
    layout.tsx                 # layout raiz, fonte Inter, Sidebar fixa, ThemeProvider
    globals.css                # tokens de cor (CSS custom properties), estilos base
    page.tsx                   # redireciona ou renderiza a home ("/" equivale ao slug "home")
    [...slug]/
      page.tsx                 # rota dinâmica catch-all, decide hub x leaf
    api/
      content/
        [...slug]/
          route.ts              # GET / PUT / POST sobre o arquivo .md correspondente
  components/
    layout/
      sidebar.tsx               # sidebar fixa com logo + árvore de navegação
      nav-group.tsx             # item de navegação tipo "hub" (colapsável)
      nav-item.tsx              # item de navegação tipo "leaf" (link simples)
      header.tsx                # cabeçalho opcional (logo, breadcrumb, título da página)
    content/
      card.tsx                  # card de apresentação de uma página filha
      card-grid.tsx              # grid/lista de cards + toggle via shadcn Select
      page-editor.tsx           # editor de frontmatter + corpo markdown de um leaf
      status-badge.tsx           # badge de status (rascunho, em_revisao, aprovado, publicado)
      markdown-view.tsx          # renderização do corpo markdown (react-markdown + remark-gfm)
    ui/                          # componentes gerados pelo shadcn/ui (não editar à mão)
      button.tsx
      card.tsx
      input.tsx
      textarea.tsx
      select.tsx
      badge.tsx
      separator.tsx
      sheet.tsx
      tabs.tsx
      tooltip.tsx
  content/
    home.md
    contexto.md
    contexto/
      apresentacao-executiva.md
      acordao-tcu.md
    objetivo.md
    objetivo/
      indicadores.md
      indicadores/
        modelo-painel.md
      governanca-cfa.md
    metodologias.md
    metodologias/
      plano-implementacao.md
      plano-implementacao/
        projeto-tecnico-cientifico.md
        tr-macro.md
      vertice-conexoes.md
    sistemas-ia.md
    sistemas-ia/
      tr-novo-bot-ia.md
      bitrix24.md
      ia.md
    documentos.md
    investimento.md
  lib/
    nav-tree.ts                 # NAV_TREE e tipos de navegação
    content.ts                  # leitura/escrita de arquivos .md com gray-matter
    types.ts                    # PageFrontmatter, PageStatus, PageKind
    utils.ts                    # helper cn() gerado pelo shadcn/ui
  public/
    logo-cfa.png
  .storybook/
    main.ts
    preview.ts
  tailwind.config.ts
  postcss.config.mjs
  next.config.ts
  tsconfig.json
  components.json               # config do shadcn/ui
  package.json
```

Regra de mapeamento slug para arquivo: o caminho do arquivo é sempre `content/{slug}.md`, onde cada segmento de slug separado por `/` vira um nível de diretório. Isso vale tanto para hub quanto para leaf, e permite que um hub (por exemplo `objetivo/indicadores.md`) coexista no mesmo diretório com uma subpasta de mesmo nome que contém seus filhos (`objetivo/indicadores/modelo-painel.md`). Não há arquivo `index.md`; a página "home" é apenas `content/home.md`.

## 3. Schema do frontmatter

Todo arquivo `.md` em `content/` começa com um bloco YAML de frontmatter no seguinte formato:

```yaml
---
title: "Acórdão e Momento Tecnológico"
slug: "contexto/acordao-tcu"
parent: "contexto"
kind: "leaf"
status: "em_revisao"
owner: "Nelly Miranda"
tags: ["tcu", "acordao-309-2026", "contexto"]
summary: "Leitura do Acórdão 309/2026 do TCU e o momento tecnológico do sistema CFA/CRAs."
updated: "2026-08-03"
---
```

Tipos correspondentes em `lib/types.ts`:

```ts
export type PageKind = "hub" | "leaf";

export type PageStatus =
  | "rascunho"
  | "em_revisao"
  | "aprovado"
  | "publicado";

export interface PageFrontmatter {
  title: string;
  slug: string;
  parent: string | null; // null representa "(raiz)"
  kind: PageKind;
  status: PageStatus;
  owner: string;
  tags: string[];
  summary: string;
  updated: string; // data ISO 8601, ex. "2026-08-03"
}

export interface PageData {
  frontmatter: PageFrontmatter;
  content: string; // corpo markdown, sem o frontmatter
}
```

Regras de valor:

- `kind = "hub"`: página que lista páginas filhas em cards (Grid/Lista). Pode ter corpo markdown próprio (texto introdutório) além da listagem.
- `kind = "leaf"`: página de conteúdo final, editável via `PageEditor`, sem listagem de filhos.
- `status`: workflow de maturidade do conteúdo, usado no `StatusBadge`. `rascunho` (cinza), `em_revisao` (âmbar contornado), `aprovado` (âmbar sólido), `publicado` (preto com detalhe âmbar).
- `parent`: slug do nó pai na árvore de navegação, ou `null` para os itens de nível raiz. É redundante em relação ao `nav-tree.ts`, mas mantido no frontmatter para permitir breadcrumbs e validação de consistência entre arquivo e árvore de navegação.
- `tags`: lista livre de palavras-chave, usada em badges secundários no `Card`.
- `summary`: descrição curta (1 a 2 frases) usada no `Card` quando a página aparece como filha de um hub.
- `updated`: atualizado automaticamente pela API route a cada gravação bem-sucedida.

## 4. Árvore de navegação (`lib/nav-tree.ts`)

```ts
export type NavKind = "hub" | "leaf";

export interface NavNode {
  slug: string;      // slug completo, ex. "metodologias/plano-implementacao"
  title: string;
  kind: NavKind;
  children?: NavNode[]; // presente apenas em nós kind = "hub" com filhos
}

export const NAV_TREE: NavNode[] = [
  { slug: "home", title: "Programa CFA/CRAs", kind: "hub" },
  {
    slug: "contexto",
    title: "Contexto do Projeto",
    kind: "hub",
    children: [
      { slug: "contexto/apresentacao-executiva", title: "Apresentação Executiva", kind: "leaf" },
      { slug: "contexto/acordao-tcu", title: "Acórdão e Momento Tecnológico", kind: "leaf" },
    ],
  },
  {
    slug: "objetivo",
    title: "Objetivo do Projeto",
    kind: "hub",
    children: [
      {
        slug: "objetivo/indicadores",
        title: "Indicadores do Projeto",
        kind: "hub",
        children: [
          { slug: "objetivo/indicadores/modelo-painel", title: "Modelo do Painel", kind: "leaf" },
        ],
      },
      { slug: "objetivo/governanca-cfa", title: "Governança do CFA", kind: "leaf" },
    ],
  },
  {
    slug: "metodologias",
    title: "Metodologias",
    kind: "hub",
    children: [
      {
        slug: "metodologias/plano-implementacao",
        title: "Plano de Implementação",
        kind: "hub",
        children: [
          { slug: "metodologias/plano-implementacao/projeto-tecnico-cientifico", title: "Projeto Técnico-Científico CFA", kind: "leaf" },
          { slug: "metodologias/plano-implementacao/tr-macro", title: "TR Macro", kind: "leaf" },
        ],
      },
      { slug: "metodologias/vertice-conexoes", title: "Método Vértice e Conexões Inteligentes", kind: "leaf" },
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
  { slug: "documentos", title: "Documentos do Projeto", kind: "leaf" },
  { slug: "investimento", title: "Investimento do Projeto", kind: "leaf" },
];
```

Nota: o título "TR Novo — Bot IA" contém travessão porque é um nome próprio de documento (título de página), não texto corrido de especificação; mantém-se como está no diagrama original da consultora.

Funções auxiliares esperadas em `lib/nav-tree.ts`:

```ts
export function findNavNode(slug: string): NavNode | undefined;
export function getChildren(slug: string): NavNode[]; // node.children ?? []
export function getBreadcrumb(slug: string): NavNode[]; // caminho da raiz até o nó
```

Caso especial "home": o nó `home` é `kind: "hub"` mas não tem `children` na árvore (não é pai de `contexto`, `objetivo`, etc., que são todos irmãos de nível raiz). A página `home` é renderizada como um dashboard que lista, via `CardGrid`, todos os nós de nível raiz de `NAV_TREE` exceto o próprio `home` (ou seja, os cards de entrada para Contexto, Objetivo, Metodologias, Sistemas e IA, Documentos e Investimento).

## 5. Sidebar e componentes de navegação

`components/layout/sidebar.tsx`:

- Server ou client component fixo (`position: fixed` ou `sticky`, altura total da viewport, `overflow-y-auto`).
- Cabeçalho da sidebar com `public/logo-cfa.png` (via `next/image`) e o título curto do programa.
- Renderiza `NAV_TREE` recursivamente: nó `kind = "hub"` vira `NavGroup`, nó `kind = "leaf"` vira `NavItem`.
- Estado de expansão de cada grupo é local (`useState<Record<string, boolean>>`), com o grupo do slug ativo expandido por padrão ao carregar a página (calculado a partir do breadcrumb do slug atual).

`components/layout/nav-group.tsx`:

- Recebe um `NavNode` com `children`.
- Renderiza um botão de cabeçalho (título + ícone de chevron que gira 90 graus ao expandir) com `rounded-xl`, `hover:bg-neutral-100 dark:hover:bg-neutral-800`.
- Abaixo do cabeçalho, quando expandido, renderiza recursivamente `NavGroup`/`NavItem` para cada filho, com indentação (`pl-4` incremental por nível).
- Se o slug ativo estiver dentro da subárvore deste grupo, aplica destaque (texto em âmbar ou peso de fonte 600).

`components/layout/nav-item.tsx`:

- Recebe um `NavNode` do tipo `leaf` (ou `hub` sem filhos, como conveniência).
- É um `next/link` estilizado como item de lista: `rounded-xl`, `px-3 py-2`, `hover:bg-neutral-100 dark:hover:bg-neutral-800`, transição suave.
- Estado ativo (slug atual igual ao slug do item): fundo `bg-amber-50 dark:bg-amber-500/10`, borda esquerda de 2px em âmbar (`border-l-2 border-amber-500`), texto em peso 600.

## 6. Rota dinâmica `app/[...slug]/page.tsx`

Responsabilidades:

1. Receber `params.slug: string[]`, montar `slug = params.slug.join("/")` (usar `"home"` como slug padrão quando o array vier vazio, ou tratar a rota `/` separadamente em `app/page.tsx` com `redirect("/home")`).
2. Buscar o nó em `NAV_TREE` via `findNavNode(slug)`. Se não existir, chamar `notFound()`.
3. Ler o arquivo correspondente via `getPageBySlug(slug)` em `lib/content.ts` (usa `gray-matter` sobre `fs.readFileSync(getContentFilePath(slug), "utf8")`). Se o arquivo não existir mas o nó estiver em `NAV_TREE` (conteúdo ainda não escrito), renderizar um estado vazio com frontmatter mínimo derivado do próprio `NavNode` (`title`, `slug`, `kind`, `status: "rascunho"`).
4. Decisão de renderização por `node.kind`:
   - **hub**: renderiza cabeçalho (título, `StatusBadge`, resumo), corpo markdown introdutório (se houver, via `MarkdownView`), e em seguida `CardGrid` com os filhos do nó (`getChildren(slug)`, ou todos os nós raiz exceto `home` quando `slug === "home"`). Para montar cada `Card`, é necessário ler o frontmatter de cada filho (`summary`, `status`, `tags`) chamando `getPageBySlug` para cada um.
   - **leaf**: renderiza `PageEditor` com o `PageData` completo (frontmatter + corpo).
5. Markdown é renderizado com `react-markdown` configurado com o plugin `remark-gfm` (necessário para suportar tabelas GFM, como a tabela do Acórdão 309/2026 em `contexto/acordao-tcu.md` e a tabela de indicadores).
6. O botão "Salvar" do `PageEditor` (client component) faz `fetch("/api/content/" + slug, { method: "PUT", body: JSON.stringify({ frontmatter, content }) })`. Em caso de sucesso, atualiza o `updated` exibido e mostra confirmação visual (ex. mensagem temporária ou estado de botão "Salvo"); em caso de erro, exibe mensagem de erro sem perder o conteúdo digitado.

## 7. API route `app/api/content/[...slug]/route.ts`

**GET**

- Recebe `params.slug: string[]`, monta `slug`.
- Resolve o caminho do arquivo via `getContentFilePath(slug)` (`content/{slug}.md`).
- Se o arquivo não existir, responde `404` com `{ error: "Página ainda não possui conteúdo salvo." }`.
- Se existir, lê com `fs.readFileSync` e faz `matter(fileContents)`, retorna `200` com `{ frontmatter: data, content }`.

**PUT** (e `POST` como alias, para compatibilidade com clientes que não enviam PUT):

- Corpo esperado: `{ frontmatter: PageFrontmatter, content: string }`.
- Validações antes de gravar:
  - `slug` da URL deve existir em `NAV_TREE` (via `findNavNode`); caso contrário `404`.
  - `frontmatter.slug` e `frontmatter.kind` no corpo devem ser iguais aos da URL e da árvore de navegação (o slug e o kind não são editáveis pela interface, apenas título, status, owner, tags, summary e corpo); em caso de divergência, `400`.
  - Campos obrigatórios presentes (`title`, `status` dentro do enum válido); caso contrário `400` com mensagem descrevendo o campo inválido.
- Ao gravar, sobrescreve `frontmatter.updated` com a data atual em ISO 8601 (`new Date().toISOString().slice(0, 10)`), preservando os demais campos enviados.
- Serializa com `matter.stringify(content, frontmatter)` e grava com `fs.writeFileSync` no mesmo caminho resolvido pelo GET, criando diretórios intermediários com `fs.mkdirSync(dir, { recursive: true })` caso o arquivo ainda não exista (caso de primeira gravação de uma página prevista em `NAV_TREE` mas sem `.md` criado).
- Retorna `200` com o `PageData` gravado.
- Tratamento de erro: qualquer exceção de I/O retorna `500` com `{ error: "Falha ao gravar o arquivo." }`, sem detalhes internos de stack trace na resposta ao cliente (logar no servidor apenas).

Nota de escopo: nesta fase a rota não tem autenticação nem controle de concorrência (é uma ferramenta interna de uso local/rede restrita da Traevo). Fica registrado aqui que controle de acesso e histórico de versões são parte do escopo futuro junto com a adoção do Supabase.

## 8. Componentes principais e Storybook

| Componente | Caminho | Story obrigatória | Observações |
|---|---|---|---|
| Sidebar | `components/layout/sidebar.tsx` | Sim | Story deve incluir a `NAV_TREE` completa e mostrar pelo menos um grupo expandido e um item ativo. |
| NavGroup | `components/layout/nav-group.tsx` | Recomendado | Estados: colapsado, expandido, ativo. |
| NavItem | `components/layout/nav-item.tsx` | Recomendado | Estados: normal, hover, ativo. |
| Card | `components/content/card.tsx` | Sim | Variar `status` para cobrir os quatro valores do `StatusBadge`. |
| CardGrid | `components/content/card-grid.tsx` | Sim | Story com toggle Grid/Lista, populada com 4 a 6 cards de exemplo. |
| PageEditor | `components/content/page-editor.tsx` | Sim | Story cobrindo aba "Visualizar" e aba "Editar", incluindo um exemplo com tabela markdown no corpo (via `remark-gfm`). |
| StatusBadge | `components/content/status-badge.tsx` | Recomendado | Uma variante por valor de `PageStatus`. |

Detalhamento dos componentes:

- **Card** (`components/content/card.tsx`): construído sobre o `Card` do shadcn/ui (`components/ui/card.tsx`). Props: `title`, `summary`, `status: PageStatus`, `tags: string[]`, `href`. `rounded-2xl`, sombra leve, `hover:border-amber-400` na borda ao passar o mouse, sem preenchimento amarelo de fundo.
- **CardGrid** (`components/content/card-grid.tsx`): props `items: { node: NavNode; frontmatter: PageFrontmatter }[]`. Contém um `Select` do shadcn/ui no topo com as opções `"grid"` (Grade) e `"list"` (Lista); estado do modo de visualização é local (`useState<"grid" | "list">("grid")`). Em modo grade, `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`; em modo lista, `flex flex-col gap-2` com o `Card` em layout horizontal compacto.
- **PageEditor** (`components/content/page-editor.tsx`): usa `Tabs` do shadcn/ui com duas abas, "Visualizar" (`MarkdownView` renderizando `content`) e "Editar" (bloco de metadados com `Input` para `title`/`owner`/`summary`, `Select` para `status`, campo de tags simples, mais um `Textarea` de largura total para o corpo markdown bruto). `Separator` entre o bloco de metadados e o corpo. Botão "Salvar" (`Button`) desabilitado enquanto a requisição está em andamento, com `Tooltip` explicando que a gravação altera o arquivo `.md` correspondente em disco.
- **StatusBadge** (`components/content/status-badge.tsx`): usa o `Badge` do shadcn/ui, mapeando `status` para variante visual: `rascunho` (cinza neutro), `em_revisao` (contorno âmbar), `aprovado` (preenchido âmbar, texto preto), `publicado` (preenchido preto, texto âmbar).
- **MarkdownView** (`components/content/markdown-view.tsx`): `react-markdown` com `remarkPlugins={[remarkGfm]}`. Estilização de tabelas via classes Tailwind diretas nos elementos `table`/`th`/`td` (bordas finas em cinza, cabeçalho com fundo neutro claro/escuro), sem grid pesado de HTML fora do corpo markdown, conforme a diretriz de nunca usar tabela para navegação.

## 9. Design system

### 9.1 Paleta de cores

Cor de acento âmbar reaproveitada dos documentos `.docx` da Traevo: `#D9A441`.

Tokens definidos em `app/globals.css` como CSS custom properties (convenção shadcn/ui), com override para tema escuro:

```css
:root {
  --background: 0 0% 100%;          /* branco */
  --foreground: 0 0% 4%;            /* quase preto */
  --card: 0 0% 100%;
  --card-foreground: 0 0% 4%;
  --border: 0 0% 90%;
  --input: 0 0% 90%;
  --muted: 0 0% 96%;
  --muted-foreground: 0 0% 40%;
  --accent: 40 62% 55%;             /* #D9A441 em HSL, uso pontual */
  --accent-foreground: 0 0% 4%;
  --primary: 0 0% 4%;               /* botões primários em preto */
  --primary-foreground: 0 0% 100%;
  --ring: 40 62% 55%;
  --radius: 0.75rem;                /* base para rounded-xl */
}

.dark {
  --background: 0 0% 4%;
  --foreground: 0 0% 96%;
  --card: 0 0% 7%;
  --card-foreground: 0 0% 96%;
  --border: 0 0% 18%;
  --input: 0 0% 18%;
  --muted: 0 0% 14%;
  --muted-foreground: 0 0% 65%;
  --accent: 40 62% 55%;
  --accent-foreground: 0 0% 4%;
  --primary: 0 0% 96%;
  --primary-foreground: 0 0% 4%;
  --ring: 40 62% 55%;
}
```

Uso do âmbar (`#D9A441` / `--accent`): estados ativos de navegação, bordas de destaque em hover de cards, `StatusBadge` para `em_revisao`/`aprovado`/`publicado`, ícones de destaque, texto de call-to-action. Nunca aplicado como cor de fundo dominante de página ou seção inteira; fundo é sempre a escala preto/branco/cinza (`--background`, `--card`, `--muted`).

Escala de cinza: usar diretamente a paleta `neutral` do Tailwind (`neutral-50` a `neutral-950`) para bordas, fundos de hover e texto secundário, mantendo consistência com os tokens acima.

### 9.2 Tipografia

Fonte Inter via `next/font/google`, carregada em `app/layout.tsx`:

```ts
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});
```

Aplicar `inter.variable` na tag `<html>` ou `<body>`, e configurar `fontFamily.sans` no `tailwind.config.ts` para usar `var(--font-inter)`. Pesos de uso: 400 (corpo de texto), 500 (labels, itens de navegação), 600 (títulos de card, item de navegação ativo), 700 (títulos de página H1/H2).

### 9.3 Raio de borda e hover

- Raio padrão: `--radius: 0.75rem`, usado como `rounded-xl` em itens de navegação e `rounded-2xl` (`calc(var(--radius) + 0.25rem)` ou classe Tailwind direta) em cards.
- Hover padrão em itens interativos de navegação e cards: `hover:bg-neutral-100 dark:hover:bg-neutral-800` combinado com `transition-colors duration-150 ease-out`.
- Foco de acessibilidade: anel de foco usando `--ring` (âmbar), `focus-visible:ring-2 focus-visible:ring-offset-2`.

## 10. Notas de instalação (comandos não interativos)

Executar a partir de `GovTech/CFA/` (o comando cria a subpasta `webapp`):

```bash
npx create-next-app@latest webapp \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --no-src-dir \
  --import-alias "@/*" \
  --no-turbopack \
  --use-npm
```

Entrar na pasta do projeto para os passos seguintes:

```bash
cd webapp
```

Inicializar shadcn/ui sem prompts (usa configuração padrão, os tokens de cor são ajustados manualmente depois em `app/globals.css` conforme a seção 9.1):

```bash
npx shadcn@latest init -d -y
```

Adicionar os componentes shadcn/ui mínimos exigidos, tudo em um único comando não interativo:

```bash
npx shadcn@latest add button card input textarea select badge separator sheet tabs tooltip -y
```

Inicializar o Storybook (detecta Next.js automaticamente):

```bash
npx storybook@latest init --yes
```

Instalar as dependências de conteúdo (parse de frontmatter e renderização de markdown com suporte a tabelas GFM):

```bash
npm install gray-matter react-markdown remark-gfm
```

Copiar a logomarca oficial do CFA para a pasta pública do projeto:

```bash
cp "cfa_logo_transparent.png" "public/logo-cfa.png"
```

Verificação final de que tudo sobe sem prompts:

```bash
npm run dev
npm run storybook
```

## 11. Apêndice: conteúdo pendente por página (referência histórica da etapa de redação)

Este apêndice documenta o que foi identificado como faltante nos 5 documentos `.docx` originais e que precisou ser escrito diretamente nos arquivos `.md` (etapa já concluída):

1. `content/contexto/acordao-tcu.md`: a tabela de resposta ao Acórdão 309/2026 ganhou duas linhas além das já existentes no Documento 1 ("Automação de processos" e "Inteligência Artificial").
2. `content/metodologias/plano-implementacao/tr-macro.md`: TR institucional/macro (`Documentos/Termo_Referencia_CFA.docx`). `content/sistemas-ia/tr-novo-bot-ia.md`: TR técnico separado, específico para CRM + automação + Bot IA, com base no modelo real do CRC-ES.
3. `content/sistemas-ia/bitrix24.md`: nomeia explicitamente o Bitrix24 como a plataforma de CRM. `content/sistemas-ia/ia.md`: descreve a camada de IA (Bot IA) integrada ao Bitrix24, coerente com o TR Novo.
4. `content/objetivo/indicadores/modelo-painel.md`: conceito/wireframe do painel nacional de indicadores para supervisão do CFA.
5. `content/investimento.md`: estrutura de investimento em blocos, deixando explícito que os valores do TR Novo referem-se a um único Regional (CRC-ES).
