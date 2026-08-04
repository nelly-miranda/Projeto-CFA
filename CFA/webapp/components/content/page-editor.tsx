"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { MarkdownView } from "@/components/content/markdown-view";
import type { PageData, PageStatus } from "@/lib/types";

const STATUS_OPTIONS: { value: PageStatus; label: string }[] = [
  { value: "rascunho", label: "Rascunho" },
  { value: "em_revisao", label: "Em revisão" },
  { value: "aprovado", label: "Aprovado" },
  { value: "publicado", label: "Publicado" },
];

export interface PageEditorProps {
  page: PageData;
  embed?: React.ReactNode;
}

type SaveState = "idle" | "saving" | "saved" | "error";

export function PageEditor({ page, embed }: PageEditorProps) {
  const [frontmatter, setFrontmatter] = useState(page.frontmatter);
  const [content, setContent] = useState(page.content);
  const [tagsInput, setTagsInput] = useState(page.frontmatter.tags.join(", "));
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSave() {
    setSaveState("saving");
    setErrorMessage(null);

    const tags = tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    const payload = {
      frontmatter: { ...frontmatter, tags },
      content,
    };

    try {
      const response = await fetch(`/api/content/${frontmatter.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({ error: "Falha ao gravar o arquivo." }));
        throw new Error(body.error ?? "Falha ao gravar o arquivo.");
      }

      const saved: PageData = await response.json();
      setFrontmatter(saved.frontmatter);
      setContent(saved.content);
      setSaveState("saved");
      setTimeout(() => setSaveState("idle"), 2000);
    } catch (error) {
      setSaveState("error");
      setErrorMessage(error instanceof Error ? error.message : "Falha ao gravar o arquivo.");
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <h1 className="text-2xl font-bold">{frontmatter.title}</h1>
        <div className="flex items-center gap-2">
          {saveState === "saved" ? (
            <span className="text-sm text-muted-foreground">
              Salvo em {frontmatter.updated}
            </span>
          ) : null}
          {saveState === "error" && errorMessage ? (
            <span className="text-sm text-destructive">{errorMessage}</span>
          ) : null}
          <Tooltip>
            <TooltipTrigger
              render={
                <Button onClick={handleSave} disabled={saveState === "saving"}>
                  {saveState === "saving" ? "Salvando…" : saveState === "saved" ? "Salvo" : "Salvar"}
                </Button>
              }
            />
            <TooltipContent>
              A gravação altera o arquivo .md correspondente em disco (content/{frontmatter.slug}.md).
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      <Tabs defaultValue="visualizar">
        <TabsList className="print:hidden">
          <TabsTrigger value="visualizar">Visualizar</TabsTrigger>
          <TabsTrigger value="editar">Editar</TabsTrigger>
        </TabsList>

        <TabsContent value="visualizar" className="pt-4 print:pt-0">
          <div className="flex flex-col gap-6">
            {content.trim() ? <MarkdownView content={content} /> : null}
            {embed}
          </div>
        </TabsContent>

        <TabsContent value="editar" className="flex flex-col gap-6 pt-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={frontmatter.title}
                onChange={(event) =>
                  setFrontmatter((prev) => ({ ...prev, title: event.target.value }))
                }
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="owner">Responsável</Label>
              <Input
                id="owner"
                value={frontmatter.owner}
                onChange={(event) =>
                  setFrontmatter((prev) => ({ ...prev, owner: event.target.value }))
                }
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="status">Status</Label>
              <Select
                value={frontmatter.status}
                onValueChange={(value) =>
                  setFrontmatter((prev) => ({ ...prev, status: value as PageStatus }))
                }
              >
                <SelectTrigger id="status" className="w-full">
                  <SelectValue>
                    {(value: PageStatus | null) =>
                      STATUS_OPTIONS.find((option) => option.value === value)?.label ?? "Selecione"
                    }
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
              <Input
                id="tags"
                value={tagsInput}
                onChange={(event) => setTagsInput(event.target.value)}
                placeholder="ex. tcu, acordao-309-2026, contexto"
              />
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
              <Label htmlFor="summary">Resumo</Label>
              <Textarea
                id="summary"
                rows={2}
                value={frontmatter.summary}
                onChange={(event) =>
                  setFrontmatter((prev) => ({ ...prev, summary: event.target.value }))
                }
              />
            </div>
          </div>

          <Separator />

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="content">Corpo (markdown)</Label>
            <Textarea
              id="content"
              rows={16}
              value={content}
              onChange={(event) => setContent(event.target.value)}
              className="font-mono text-sm"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
