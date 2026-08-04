import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CardGrid, type CardGridItem } from "./card-grid";

const items: CardGridItem[] = [
  {
    node: { slug: "contexto/apresentacao-executiva", title: "Apresentação Executiva", kind: "leaf" },
    frontmatter: {
      title: "Apresentação Executiva",
      slug: "contexto/apresentacao-executiva",
      parent: "contexto",
      kind: "leaf",
      status: "aprovado",
      owner: "Nelly Miranda",
      tags: ["executivo"],
      summary: "Síntese executiva do programa para apresentação à diretoria do CFA.",
      updated: "2026-08-04",
    },
  },
  {
    node: { slug: "contexto/acordao-tcu", title: "Acórdão e Momento Tecnológico", kind: "leaf" },
    frontmatter: {
      title: "Acórdão e Momento Tecnológico",
      slug: "contexto/acordao-tcu",
      parent: "contexto",
      kind: "leaf",
      status: "em_revisao",
      owner: "Nelly Miranda",
      tags: ["tcu", "acordao-309-2026"],
      summary: "Leitura do Acórdão 309/2026 do TCU e o momento tecnológico do sistema CFA/CRAs.",
      updated: "2026-08-04",
    },
  },
  {
    node: { slug: "painel/modelo-painel", title: "Modelo do Painel", kind: "leaf" },
    frontmatter: {
      title: "Modelo do Painel",
      slug: "painel/modelo-painel",
      parent: "painel",
      kind: "leaf",
      status: "rascunho",
      owner: "Nelly Miranda",
      tags: ["indicadores"],
      summary: "Indicadores de acompanhamento definidos para medir o avanço do programa.",
      updated: "2026-08-04",
    },
  },
  {
    node: { slug: "sistemas-ia/bitrix24", title: "Bitrix24", kind: "leaf" },
    frontmatter: {
      title: "Bitrix24",
      slug: "sistemas-ia/bitrix24",
      parent: "sistemas-ia",
      kind: "leaf",
      status: "publicado",
      owner: "Nelly Miranda",
      tags: ["crm", "bitrix24"],
      summary: "Bitrix24 como plataforma de CRM adotada para suporte e atendimento do sistema CFA/CRAs.",
      updated: "2026-08-04",
    },
  },
];

const meta = {
  title: "Content/CardGrid",
  component: CardGrid,
  parameters: { layout: "padded" },
  args: { items },
} satisfies Meta<typeof CardGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Grade: Story = {
  args: { defaultView: "grid" },
};

export const Lista: Story = {
  args: { defaultView: "list" },
};

export const Vazio: Story = {
  args: { items: [] },
};
