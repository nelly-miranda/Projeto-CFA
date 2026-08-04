import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NavGroup } from "./nav-group";

const meta = {
  title: "Layout/NavGroup",
  component: NavGroup,
  parameters: { layout: "padded", nextjs: { appDirectory: true } },
  args: {
    node: {
      slug: "sistemas-ia",
      title: "Sistemas e IA",
      kind: "hub",
      children: [
        { slug: "sistemas-ia/tr-novo-bot-ia", title: "TR Novo — Bot IA", kind: "leaf" },
        { slug: "sistemas-ia/bitrix24", title: "Bitrix24", kind: "leaf" },
        { slug: "sistemas-ia/ia", title: "Inteligência Artificial", kind: "leaf" },
      ],
    },
  },
} satisfies Meta<typeof NavGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Colapsado: Story = {
  args: { defaultExpanded: false },
  parameters: { nextjs: { appDirectory: true, navigation: { pathname: "/home" } } },
};

export const Expandido: Story = {
  args: { defaultExpanded: true },
  parameters: { nextjs: { appDirectory: true, navigation: { pathname: "/home" } } },
};

export const ExpandidoComItemAtivo: Story = {
  args: { defaultExpanded: true },
  parameters: {
    nextjs: { appDirectory: true, navigation: { pathname: "/sistemas-ia/bitrix24" } },
  },
};
