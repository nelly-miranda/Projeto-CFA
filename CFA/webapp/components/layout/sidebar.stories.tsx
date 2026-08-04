import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Sidebar } from "./sidebar";

const meta = {
  title: "Layout/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
    nextjs: { appDirectory: true },
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Estado inicial: nenhum grupo expandido, "home" ativo. */
export const Home: Story = {
  parameters: {
    nextjs: { appDirectory: true, navigation: { pathname: "/home" } },
  },
};

/**
 * Slug ativo dentro de um grupo aninhado ("documentos/plano-implementacao/tr-macro"):
 * os grupos "Documentação Formal" e "Plano de Implementação" vêm expandidos por padrão.
 */
export const GrupoExpandidoComItemAtivo: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: { pathname: "/documentos/plano-implementacao/tr-macro" },
    },
  },
};
