import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { StatusBadge } from "./status-badge";

const meta = {
  title: "Content/StatusBadge",
  component: StatusBadge,
  parameters: { layout: "centered" },
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Rascunho: Story = { args: { status: "rascunho" } };
export const EmRevisao: Story = { args: { status: "em_revisao" } };
export const Aprovado: Story = { args: { status: "aprovado" } };
export const Publicado: Story = { args: { status: "publicado" } };
