import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PageEditor } from "./page-editor";
import type { PageData } from "@/lib/types";

const pageComTabela: PageData = {
  frontmatter: {
    title: "Acórdão e Momento Tecnológico",
    slug: "contexto/acordao-tcu",
    parent: "contexto",
    kind: "leaf",
    status: "em_revisao",
    owner: "Nelly Miranda",
    tags: ["tcu", "acordao-309-2026", "contexto"],
    summary: "Leitura do Acórdão 309/2026 do TCU e o momento tecnológico do sistema CFA/CRAs.",
    updated: "2026-08-04",
  },
  content: `## Resposta ao Acórdão 309/2026

| Determinação do TCU | Resposta do CFA/CRAs |
| --- | --- |
| Governança de TI | Implantação de comitê de governança digital nacional. |
| Automação de processos | Adoção do Bitrix24 como CRM único do sistema. |
| Inteligência Artificial | Bot IA integrado ao CRM para atendimento e triagem. |
`,
};

const meta = {
  title: "Content/PageEditor",
  component: PageEditor,
  parameters: { layout: "padded" },
} satisfies Meta<typeof PageEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ComTabelaMarkdown: Story = {
  args: { page: pageComTabela },
};

export const ConteudoPlaceholder: Story = {
  args: {
    page: {
      frontmatter: {
        title: "Modelo do Painel",
        slug: "painel/modelo-painel",
        parent: "painel",
        kind: "leaf",
        status: "rascunho",
        owner: "Nelly Miranda",
        tags: [],
        summary: "Conceito e wireframe do painel nacional de indicadores para supervisão do CFA.",
        updated: "2026-08-04",
      },
      content: "Conteúdo em elaboração.",
    },
  },
};
