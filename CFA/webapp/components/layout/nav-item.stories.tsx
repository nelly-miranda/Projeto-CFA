import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NavItem } from "./nav-item";

const meta = {
  title: "Layout/NavItem",
  component: NavItem,
  parameters: { layout: "padded", nextjs: { appDirectory: true } },
  args: {
    node: { slug: "sistemas-ia/bitrix24", title: "Bitrix24", kind: "leaf" },
  },
} satisfies Meta<typeof NavItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  parameters: { nextjs: { appDirectory: true, navigation: { pathname: "/home" } } },
};

export const Ativo: Story = {
  parameters: {
    nextjs: { appDirectory: true, navigation: { pathname: "/sistemas-ia/bitrix24" } },
  },
};
