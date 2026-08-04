import type { Preview } from "@storybook/nextjs-vite";
import React from "react";
import "../app/globals.css";
import { TooltipProvider } from "../components/ui/tooltip";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },

    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#eef0f6" },
        { name: "dark", value: "#0d0f16" },
      ],
    },
  },
  decorators: [
    (Story) => (
      <TooltipProvider delay={200}>
        <div className="font-sans text-foreground">
          <Story />
        </div>
      </TooltipProvider>
    ),
  ],
};

export default preview;
