import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

export interface MarkdownViewProps {
  content: string;
  className?: string;
}

/**
 * Renderiza o corpo markdown de uma página. Tabelas GFM (ex. indicadores,
 * respostas ao Acórdão 309/2026) recebem estilização leve via Tailwind;
 * a navegação/listagem de itens nunca usa este tipo de tabela.
 */
export function MarkdownView({ content, className }: MarkdownViewProps) {
  if (!content.trim()) {
    return <p className="text-sm text-muted-foreground">Conteúdo em elaboração.</p>;
  }

  return (
    <div className={cn("flex flex-col gap-4 text-sm leading-relaxed text-foreground", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ ...props }) => <h1 className="text-2xl font-bold" {...props} />,
          h2: ({ ...props }) => <h2 className="mt-2 text-xl font-semibold" {...props} />,
          h3: ({ ...props }) => <h3 className="mt-2 text-lg font-semibold" {...props} />,
          p: ({ ...props }) => <p className="text-sm leading-relaxed" {...props} />,
          ul: ({ ...props }) => <ul className="list-disc space-y-1 pl-5 text-sm" {...props} />,
          ol: ({ ...props }) => <ol className="list-decimal space-y-1 pl-5 text-sm" {...props} />,
          a: ({ ...props }) => (
            <a className="text-[#4457C4] underline-offset-2 hover:underline" {...props} />
          ),
          strong: ({ ...props }) => <strong className="font-semibold" {...props} />,
          blockquote: ({ ...props }) => (
            <blockquote
              className="border-l-2 border-[#5B6EF0] pl-4 italic text-muted-foreground"
              {...props}
            />
          ),
          table: ({ ...props }) => (
            <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800">
              <table className="w-full border-collapse text-sm" {...props} />
            </div>
          ),
          thead: ({ ...props }) => (
            <thead className="bg-neutral-100 dark:bg-neutral-800" {...props} />
          ),
          th: ({ ...props }) => (
            <th
              className="border-b border-neutral-200 px-3 py-2 text-left font-semibold dark:border-neutral-700"
              {...props}
            />
          ),
          td: ({ ...props }) => (
            <td
              className="border-b border-neutral-200 px-3 py-2 align-top dark:border-neutral-800"
              {...props}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
