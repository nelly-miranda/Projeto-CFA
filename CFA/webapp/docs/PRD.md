# PRD - Ambiente CFA/CRAs

**Produto:** Ambiente CFA/CRAs (webapp interno de apoio à decisão e apresentação institucional)
**Programa relacionado:** Programa Nacional de Transformação Digital e Governança Integrada do Sistema CFA/CRAs
**Responsável pelo documento:** Nelly Miranda, consultora de processos, Traevo
**Status:** Rascunho para validação interna
**Versão:** 0.1

---

## 1. Visão Geral e Problema a Resolver

O Programa CFA/CRAs é uma proposta de transformação digital e governança integrada respondendo ao Acórdão 309/2026 do TCU, estruturada em cinco documentos já redigidos (Apresentação Executiva, Projeto Técnico-Científico, Plano de Implantação, Matriz de Governança e Indicadores, Termo de Referência institucional) mais um Termo de Referência técnico complementar (TR Novo, focado em CRM e Bot IA). Hoje esse conteúdo vive espalhado em arquivos .docx, o que gera três problemas práticos:

1. **Fragmentação.** Não existe um lugar único onde alguém (a consultora, um agente de IA, um diretor do CFA) possa ver o estado atual do projeto como um todo, com relações claras entre contexto, objetivo, metodologia, sistemas e investimento.
2. **Dificuldade de colaboração entre humano e IA.** Editar .docx não é um formato amigável para agentes de IA lerem e escreverem de forma confiável e versionada. É preciso um formato de conteúdo simples, legível por máquina e por humano, que qualquer sessão futura de um agente de IA (inclusive sessões futuras do Claude Code neste mesmo repositório) consiga consumir e atualizar sem fricção.
3. **Falta de uma camada de apresentação.** Quando chegar o momento de apresentar o programa para a diretoria completa do CFA, um conjunto de arquivos .docx não comunica a mesma sensação de solidez e organização que uma ferramenta navegável apresenta.

O Ambiente CFA/CRAs resolve isso propondo uma arquitetura simples: **o conteúdo do projeto passa a viver em arquivos Markdown com frontmatter, dentro de uma pasta `content/`**, e o webapp é apenas uma camada de visualização e edição amigável sobre esses mesmos arquivos. Não existe uma API proprietária de agentes nesta fase: qualquer agente com acesso ao repositório pode ler e escrever os arquivos `.md` diretamente, com ou sem o webapp aberto. O webapp existe para tornar essa mesma informação legível, navegável e editável para humanos, e apresentável para a diretoria do CFA.

Não há banco de dados nesta fase. Supabase é a escolha planejada para uma fase futura de persistência, e deve constar apenas como intenção documentada, não como algo a implementar agora.

---

## 2. Personas

### 2.1 Nelly (consultora de processos e editora principal)
Responsável por manter o conteúdo do programa atualizado, revisar o que os agentes de IA escrevem, ajustar frontmatter (status, owner, tags), e usar o webapp tanto no dia a dia de trabalho quanto como ferramenta de apresentação para reuniões com o CFA. Precisa de edição rápida, sem fricção, e de confiança de que o que ela vê na tela é exatamente o que está gravado no arquivo.

### 2.2 Agentes de IA (colaboradores de conteúdo)
Sessões do Claude Code (ou de outros agentes com acesso ao repositório) que leem e escrevem diretamente os arquivos `.md` em `content/`, respeitando a estrutura de frontmatter definida. Não interagem com o webapp por meio de uma API dedicada nesta fase: interagem com o sistema de arquivos. O webapp precisa apenas garantir que o formato dos arquivos seja previsível o suficiente para que um agente consiga editá-los com segurança (frontmatter bem definido, corpo em Markdown puro).

### 2.3 Diretoria do CFA (público de apresentação, somente leitura)
Conselheiros e diretores que vão ver o Ambiente CFA/CRAs em uma reunião de diretoria, navegando pela árvore de conteúdo (contexto, objetivo, metodologias, sistemas e IA, documentos, investimento) sem editar nada. Para essa persona, o webapp precisa parecer pronto, institucional e fácil de seguir, mesmo sendo, por trás, uma ferramenta de trabalho interna da Traevo.

---

## 3. Requisitos Funcionais

### 3.1 Estrutura de conteúdo (base para tudo)

- Todo o conteúdo do programa fica em arquivos `.md` dentro de `content/`, um arquivo por página, espelhando o `slug` de cada página do sitemap.
- Cada arquivo tem frontmatter com, no mínimo: `title`, `slug`, `parent`, `kind` (`hub` ou `leaf`), `status`, `owner`, `tags`, `summary`, `updated`.
- O corpo do arquivo (depois do frontmatter) é Markdown livre, renderizado na página correspondente do webapp.
- Parse e regravação do frontmatter usam a biblioteca `gray-matter`.
- A árvore de navegação do webapp (`NAV_TREE`) é gerada a partir da relação `parent` entre os arquivos, refletindo exatamente o sitemap abaixo:

```
home (hub)
contexto (hub)
  contexto/apresentacao-executiva (leaf)
  contexto/acordao-tcu (leaf)
objetivo (hub)
  objetivo/indicadores (leaf)
    objetivo/indicadores/modelo-painel (leaf)
  objetivo/governanca-cfa (leaf)
metodologias (hub)
  metodologias/plano-implementacao (leaf)
    metodologias/plano-implementacao/projeto-tecnico-cientifico (leaf)
    metodologias/plano-implementacao/tr-macro (leaf)
  metodologias/vertice-conexoes (leaf)
sistemas-ia (hub)
  sistemas-ia/tr-novo-bot-ia (leaf)
  sistemas-ia/bitrix24 (leaf)
  sistemas-ia/ia (leaf)
documentos (leaf)
investimento (leaf)
```

Observação: `objetivo/indicadores` e `metodologias/plano-implementacao` funcionam como nós intermediários com filhos próprios, ainda que sejam classificados como `leaf` no sitemap fornecido; a página deve, nesse caso, exibir tanto seu próprio conteúdo quanto os cards de navegação para os filhos que possuir. A implementação deve tratar isso como uma variação de exibição, não como uma mudança na regra geral de hub versus leaf.

### 3.2 Navegação em árvore (sidebar)

- Sidebar fixa, sempre visível, com estrutura em árvore que reflete o `NAV_TREE`.
- Grupos correspondentes aos nós "hub" são colapsáveis (expandir/recolher).
- Itens simples (leaf) são links diretos para a página correspondente.
- Cada item de navegação tem `hover:bg` sutil ao passar o mouse, cantos arredondados (`rounded-xl`), e indicação visual de item ativo (página atual).
- Logomarca do CFA no topo da sidebar ou no cabeçalho, usando o arquivo copiado para `public/logo-cfa.png`.

### 3.3 Páginas "hub"

- Listam os filhos diretos em **cards**, nunca em tabela HTML de grade pesada.
- Cada card mostra ao menos: título, resumo (`summary` do frontmatter), badge de status, e é clicável para navegar até a página filha.
- Toggle **Grid/Lista** usando um `Select` do shadcn/ui, permitindo ao usuário escolher entre visualização em grade de cards ou lista vertical de cards. A preferência de visualização pode ser mantida por sessão (não precisa persistir entre sessões nesta fase).
- O corpo Markdown da própria página hub (se houver) é renderizado acima da listagem de filhos.

### 3.4 Páginas "leaf"

- Exibem os campos de frontmatter como campos editáveis: `title` (Input), `status` (Select), `owner` (Input), `tags` (input de tags ou Textarea simples), `summary` (Textarea).
- Corpo em Markdown é renderizado como conteúdo principal da página; tabelas Markdown dentro do corpo são aceitáveis quando o conteúdo for tabular (por exemplo, indicadores ou a tabela do Acórdão 309/2026), mas a navegação/listagem de itens continua sempre em cards.
- Botão **Salvar** grava de volta, via API route local, o arquivo `.md` correspondente (frontmatter atualizado + corpo), preservando o corpo Markdown tal como estava (a edição de corpo em Markdown bruto pode ser feita diretamente no editor de texto da página, sem WYSIWYG nesta fase).
- Após salvar, o campo `updated` do frontmatter é atualizado automaticamente com a data corrente.
- Confirmação visual de sucesso (toast ou indicador simples) após gravação bem-sucedida.

### 3.5 API route de conteúdo

- Rota `app/api/content/[...slug]/route.ts`.
- `GET`: lê o arquivo `.md` correspondente ao slug, faz parse com `gray-matter`, retorna frontmatter e corpo.
- `PUT`/`POST`: recebe frontmatter atualizado e corpo, faz `stringify` com `gray-matter` e regrava o arquivo `.md` em disco, preservando a codificação e formatação básica.
- Tratamento de erro simples para slug inexistente (404) e falha de escrita (500), sem necessidade de autenticação nesta fase.

### 3.6 Conteúdo específico a incorporar

Estas informações estão no diagrama original da consultora mas ainda não constam nos documentos `.docx` já redigidos, e foram escritas diretamente nos arquivos `.md` correspondentes:

1. **`content/contexto/acordao-tcu.md`**: a tabela de resposta ao Acórdão 309/2026 ganha duas linhas adicionais além das já existentes no Documento 1 (Apresentação Executiva): "Automação de processos" e "Inteligência Artificial".
2. **Dois Termos de Referência distintos**: "TR Macro" (`metodologias/plano-implementacao/tr-macro`) e "TR Novo — Bot IA" (`sistemas-ia/tr-novo-bot-ia`), este último com requisitos funcionais codificados (RF-COM, RF-VID, RF-GRP, RF-DOC, RF-IA, RF-IACRM), SLA, POC, cronograma e estimativa de investimento, com base no modelo real do CRC-ES.
3. **`content/sistemas-ia/bitrix24.md`**: nomeia explicitamente o Bitrix24 como a plataforma de CRM adotada. **`content/sistemas-ia/ia.md`**: descreve a camada de IA (Bot IA) integrada ao Bitrix24.
4. **`content/objetivo/indicadores/modelo-painel.md`**: conceito/wireframe do painel nacional de indicadores.
5. **`content/investimento.md`**: página de nível raiz nova, estrutura de investimento em blocos.

### 3.7 Página de Documentos do Projeto

- `content/documentos.md` lista, em cards, os seis documentos de referência do programa (cinco `.docx` já produzidos mais o TR Novo), cada um com link de download para `public/documentos/`.
- Não há preview embutido de `.docx` nesta fase, apenas download.

### 3.8 Página de Investimento do Projeto

- `content/investimento.md` apresenta a estrutura de investimento em blocos (Serviços técnicos de implantação, Licenciamento e assinatura recorrente, Banco de horas sob demanda), inspirada no modelo real do TR Novo, sem expor um total único e assustador.
- Deixa explícito que os valores específicos do Programa CFA/CRAs ainda serão dimensionados, e que os números do TR Novo (cerca de R$ 366 mil) referem-se a um único Regional (CRC-ES), não ao programa nacional completo.

### 3.9 Design system e componentes

- Fonte Inter via `next/font/google`.
- Paleta minimalista preto e branco com acento âmbar (`#D9A441`, já usado nos documentos `.docx` da Traevo).
- Cantos arredondados (`rounded-xl`/`rounded-2xl`) em cards e itens de navegação.
- Componentes shadcn/ui: `button`, `card`, `input`, `textarea`, `select`, `badge`, `separator`, `sheet`, `tabs`, `tooltip`.
- Storybook cobrindo, no mínimo: `Sidebar`, `Card`, `CardGrid`, `PageEditor`.

---

## 4. Requisitos Não Funcionais

- **Performance de leitura local:** leitura de conteúdo praticamente instantânea (arquivos locais, sem chamadas de rede externas).
- **Design system consistente:** todos os componentes visuais reutilizáveis têm stories no Storybook.
- **Responsividade básica:** desktop-first, sidebar colapsável em telas estreitas via `Sheet` do shadcn/ui.
- **Confiabilidade de escrita:** salvar uma página não pode corromper o arquivo `.md` nem descartar silenciosamente conteúdo.
- **Consistência de marca:** paleta, tipografia e logomarca seguem o mesmo padrão dos demais entregáveis da Traevo para o CFA.

---

## 5. Fora de Escopo Nesta Fase

- Supabase ou qualquer banco de dados real (fica documentado como intenção futura).
- Autenticação e controle de acesso.
- API de agentes de IA dedicada (agentes usam o sistema de arquivos diretamente).
- Multiidioma.
- Editor WYSIWYG de Markdown.
- Versionamento/histórico de edições dentro do webapp (resolvido pelo Git do repositório).
- Preview embutido de `.docx` na página de Documentos do Projeto.

---

## 6. Métricas de Sucesso

- **Cobertura de conteúdo:** todas as páginas do sitemap (19 slugs) existem como arquivos `.md` válidos, com frontmatter completo e navegáveis a partir da sidebar.
- **Paridade de edição:** 100% dos campos de frontmatter definidos são editáveis pela interface e a gravação reflete corretamente no arquivo `.md` em disco.
- **Usabilidade em apresentação:** navegação completa (contexto até investimento) em demonstração ao vivo sem erros de renderização ou informação faltante.
- **Consistência visual:** todos os componentes reutilizáveis têm story funcional no Storybook.
- **Fidelidade da informação nova:** as cinco lacunas de conteúdo identificadas na seção 3.6 estão presentes e corretas, sem contradição com os documentos `.docx` já existentes.
- **Ausência de retrabalho estrutural:** a decisão de arquitetura (Markdown com frontmatter, sem banco de dados) se mantém estável até o momento planejado para introduzir o Supabase.
