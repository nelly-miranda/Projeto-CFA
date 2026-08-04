import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ContentCard } from "./card";

const meta = {
  title: "Content/Card",
  component: ContentCard,
  parameters: { layout: "padded" },
  args: {
    title: "Acórdão e Momento Tecnológico",
    summary: "Leitura do Acórdão 309/2026 do TCU e o momento tecnológico do sistema CFA/CRAs.",
    tags: ["tcu", "acordao-309-2026"],
    href: "/contexto/acordao-tcu",
  },
} satisfies Meta<typeof ContentCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Rascunho: Story = {
  args: { status: "rascunho" },
};

export const EmRevisao: Story = {
  args: { status: "em_revisao" },
};

export const Aprovado: Story = {
  args: { status: "aprovado" },
};

export const Publicado: Story = {
  args: { status: "publicado" },
};

export const Compacto: Story = {
  args: { status: "aprovado", compact: true },
  parameters: { layout: "padded" },
};
