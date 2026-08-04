"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type ChatMsg = { from: "user" | "bot"; text: string };
type LogLine = { kind: "cmd" | "kv" | "ok" | "note"; key?: string; value: string };
type TagColor = "green" | "blue" | "gold" | "red";

interface Scenario {
  id: string;
  tag: string;
  tagColor: TagColor;
  title: string;
  description: string;
  finalLabel: string;
  cardTitle: string;
  cardSubtitle: string;
  cardBadge: string;
  chat: ChatMsg[];
  log: LogLine[];
}

const SCENARIOS: Scenario[] = [
  {
    id: "boleto",
    tag: "Financeiro · sem escalada",
    tagColor: "green",
    title: "2ª via de boleto de anuidade",
    description:
      "A IA valida a titularidade, consulta o financeiro via integração com o CRM e envia o boleto atualizado. Resolvido 24 horas por dia, sem atendente humano.",
    finalLabel: "Resolvido pela IA",
    cardTitle: "Mariana Duarte",
    cardSubtitle: "Anuidade 2026 · R$ 680,00",
    cardBadge: "RESOLVIDO PELA IA",
    chat: [
      { from: "user", text: "Oi, preciso da 2ª via do boleto da anuidade 2026." },
      {
        from: "bot",
        text: "Olá, Mariana! Localizei seu cadastro pelo WhatsApp. Para sua segurança, confirma o CPF final ***-42?",
      },
      { from: "user", text: "Sim, sou eu." },
      {
        from: "bot",
        text: "Titularidade confirmada. Consultei o financeiro: anuidade 2026 em aberto, R$ 680,00. Aqui está a 2ª via atualizada, venc. 20/07: boleto.pdf",
      },
      { from: "user", text: "Perfeito, obrigada!" },
      {
        from: "bot",
        text: "Registrado no seu histórico. Se o pagamento não for identificado em 5 dias úteis, eu retorno por aqui.",
      },
    ],
    log: [
      { kind: "cmd", value: 'intent("financeiro.boleto_2via")' },
      { kind: "kv", key: "profissional", value: '"Mariana Duarte"' },
      { kind: "kv", key: "validacao", value: '"cpf_x_whatsapp: OK"' },
      { kind: "kv", key: "consulta", value: '"CRM · Financeiro"' },
      { kind: "kv", key: "anuidade", value: '"2026 · R$ 680,00"' },
      { kind: "kv", key: "boleto_gerado", value: "true" },
      { kind: "kv", key: "escalada", value: "false" },
      { kind: "ok", value: "200 OK · resolvido pela IA" },
      { kind: "note", value: "kanban IA: card movido para \"Resolvido pela IA\"" },
      { kind: "note", value: "log de conformidade: consulta registrada" },
    ],
  },
  {
    id: "registro",
    tag: "Consulta CRM · sem escalada",
    tagColor: "blue",
    title: "Status de registro profissional",
    description:
      "O profissional pergunta em linguagem natural. A IA consulta o CRM, informa a etapa do processo e emite protocolo de acompanhamento.",
    finalLabel: "Resolvido pela IA",
    cardTitle: "Rafael Nogueira",
    cardSubtitle: "Registro em análise · Protocolo #RG-3318",
    cardBadge: "RESOLVIDO PELA IA",
    chat: [
      {
        from: "user",
        text: "Queria saber como está meu pedido de registro, entreguei os documentos mês passado.",
      },
      {
        from: "bot",
        text: "Olá, Rafael! Encontrei seu processo: registro em análise pela comissão, etapa 3 de 4. Documentação completa.",
      },
      { from: "user", text: "Tem previsão?" },
      {
        from: "bot",
        text: "A etapa atual leva em média 10 dias úteis. Gerei o protocolo #RG-3318 e te aviso por aqui a cada mudança de status.",
      },
      { from: "user", text: "Ótimo, valeu!" },
    ],
    log: [
      { kind: "cmd", value: 'intent("registro.status")' },
      { kind: "kv", key: "profissional", value: '"Rafael Nogueira"' },
      { kind: "kv", key: "consulta", value: '"CRM · card de registro"' },
      { kind: "kv", key: "etapa", value: '"3/4 · em análise"' },
      { kind: "kv", key: "protocolo", value: '"#RG-3318"' },
      { kind: "kv", key: "notificacao_automatica", value: "true" },
      { kind: "ok", value: "200 OK · consulta respondida" },
      { kind: "note", value: "kanban IA: card movido para \"Resolvido pela IA\"" },
      { kind: "note", value: "automação: alerta programado para mudança de etapa" },
    ],
  },
  {
    id: "qualificacao",
    tag: "Qualificação · roteamento",
    tagColor: "gold",
    title: "Qualificação para desenvolvimento profissional",
    description:
      "Sem menu de opções numeradas: a IA entende a intenção, qualifica a demanda e cria o card já classificado no pipeline do setor responsável.",
    finalLabel: "Escalado ao setor",
    cardTitle: "Beatriz Campos",
    cardSubtitle: "Educação continuada · pontuação",
    cardBadge: "ENCAMINHADO · DESENV. PROFISSIONAL",
    chat: [
      {
        from: "user",
        text: "Consigo pontuar no programa de educação continuada com curso online de outra instituição?",
      },
      {
        from: "bot",
        text: "Olá, Beatriz! Cursos online podem pontuar se a instituição for credenciada. Me confirma o nome do curso e a carga horária?",
      },
      { from: "user", text: "Curso de contabilidade avançada, 40h, pela instituição XYZ." },
      {
        from: "bot",
        text: "Anotado. Esse caso passa por análise do setor de Desenvolvimento Profissional. Criei sua solicitação já qualificada, protocolo #DP-2214. Retorno em até 3 dias úteis.",
      },
    ],
    log: [
      { kind: "cmd", value: 'intent("desenvolvimento_profissional.pontuacao")' },
      { kind: "kv", key: "profissional", value: '"Beatriz Campos"' },
      { kind: "kv", key: "demanda", value: '"educação continuada"' },
      { kind: "kv", key: "dados_coletados", value: '"curso, 40h, instituição XYZ"' },
      { kind: "kv", key: "qualificacao", value: '"completa"' },
      { kind: "kv", key: "destino", value: '"pipeline Desenvolvimento Profissional"' },
      { kind: "kv", key: "protocolo", value: '"#DP-2214"' },
      { kind: "ok", value: "200 OK · card criado no setor" },
      { kind: "note", value: "kanban IA: card movido para \"Escalado ao setor\"" },
      { kind: "note", value: "dossiê anexado: conversa e dados coletados" },
    ],
  },
  {
    id: "reclamacao",
    tag: "Escalada · sentimento",
    tagColor: "red",
    title: "Reclamação com escalada ao supervisor",
    description:
      "A análise de sentimento detecta insatisfação. A IA não insiste na triagem automática: prioriza, monta o dossiê e escala para atendimento humano de imediato.",
    finalLabel: "Escalado ao setor",
    cardTitle: "Sérgio Tavares",
    cardSubtitle: "Reclamação · sentimento negativo",
    cardBadge: "ENCAMINHADO · SUPERVISOR · PRIORIDADE ALTA",
    chat: [
      {
        from: "user",
        text: "É a terceira vez que peço a correção do meu cadastro e nada! Um absurdo isso.",
      },
      {
        from: "bot",
        text: "Sérgio, você tem razão em estar insatisfeito. Encontrei suas duas solicitações anteriores. Vou te transferir agora para um supervisor com todo o histórico.",
      },
      {
        from: "bot",
        text: "Transferido com prioridade alta. O supervisor já recebeu as três solicitações, as datas e o que foi respondido. Você não vai precisar repetir nada.",
      },
      { from: "user", text: "Espero que resolvam dessa vez." },
    ],
    log: [
      { kind: "cmd", value: 'sentiment("negativo · 0.91")' },
      { kind: "kv", key: "profissional", value: '"Sérgio Tavares"' },
      { kind: "kv", key: "gatilho", value: '"sentimento_negativo"' },
      { kind: "kv", key: "historico", value: '"2 solicitações anteriores"' },
      { kind: "kv", key: "destino", value: '"supervisor de atendimento"' },
      { kind: "kv", key: "prioridade", value: '"ALTA"' },
      { kind: "kv", key: "dossie", value: '"transcrição e protocolos anteriores"' },
      { kind: "ok", value: "200 OK · escalada executada" },
      { kind: "note", value: "kanban IA: card movido para \"Escalado ao setor\"" },
      { kind: "note", value: "alerta em tempo real enviado ao supervisor" },
    ],
  },
];

const TAG_COLOR_CLASSES: Record<TagColor, string> = {
  green: "text-emerald-600 dark:text-emerald-400",
  blue: "text-blue-600 dark:text-blue-400",
  gold: "text-[#5B6EF0]",
  red: "text-red-600 dark:text-red-400",
};

const CARD_COLOR_CLASSES: Record<TagColor, string> = {
  green: "bg-emerald-600 text-white",
  blue: "bg-blue-600 text-white",
  gold: "bg-[#5B6EF0] text-[#14161F]",
  red: "bg-red-600 text-white",
};

type PanelStatus = "idle" | "running" | "done";

const STATUS_LABEL: Record<"chat" | "log" | "kanban", Record<PanelStatus, string>> = {
  chat: { idle: "Aguardando", running: "Processando", done: "Concluído" },
  log: { idle: "Aguardando", running: "Integrando", done: "Sucesso" },
  kanban: { idle: "Aguardando", running: "Atualizando", done: "Atualizado" },
};

function StatusBadge({ panel, status }: { panel: "chat" | "log" | "kanban"; status: PanelStatus }) {
  return (
    <span
      className={cn(
        "rounded-full border px-2.5 py-0.5 text-[9.5px] font-bold tracking-[0.05em] uppercase",
        status === "idle" && "border-white/15 text-white/35",
        status === "running" && "border-[#5B6EF0] text-[#5B6EF0]",
        status === "done" && "border-emerald-400 text-emerald-400"
      )}
    >
      {STATUS_LABEL[panel][status]}
    </span>
  );
}

export function GriSimulator() {
  const [selected, setSelected] = useState(0);
  const [running, setRunning] = useState(false);
  const [visibleChat, setVisibleChat] = useState(0);
  const [typing, setTyping] = useState(false);
  const [visibleLog, setVisibleLog] = useState(0);
  const [stage, setStage] = useState<"idle" | "triagem" | "final">("idle");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  function schedule(fn: () => void, delay: number) {
    const t = setTimeout(fn, delay);
    timers.current.push(t);
  }

  function reset() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setRunning(false);
    setVisibleChat(0);
    setTyping(false);
    setVisibleLog(0);
    setStage("idle");
  }

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function start() {
    reset();
    setRunning(true);
    const scenario = SCENARIOS[selected];

    setStage("idle");
    let delay = 300;
    const INTERVAL = 1400;
    const TYPING = 650;

    scenario.chat.forEach((msg, idx) => {
      if (msg.from === "bot") {
        schedule(() => setTyping(true), delay);
      }
      schedule(
        () => {
          setTyping(false);
          setVisibleChat(idx + 1);
        },
        delay + (msg.from === "bot" ? TYPING : 0)
      );
      delay += INTERVAL + (msg.from === "bot" ? TYPING : 0);
    });

    const logStart = delay * 0.4;
    const LOG_INTERVAL = 220;
    scenario.log.forEach((_, idx) => {
      schedule(() => setVisibleLog(idx + 1), logStart + idx * LOG_INTERVAL);
    });

    schedule(() => setStage("triagem"), logStart + 2 * LOG_INTERVAL);

    const finalDelay = logStart + scenario.log.length * LOG_INTERVAL + 700;
    schedule(() => {
      setStage("final");
      setRunning(false);
    }, finalDelay);
  }

  const scenario = SCENARIOS[selected];
  const chatStatus: PanelStatus = visibleChat === 0 ? "idle" : visibleChat === scenario.chat.length ? "done" : "running";
  const logStatus: PanelStatus = visibleLog === 0 ? "idle" : visibleLog === scenario.log.length ? "done" : "running";
  const kanbanStatus: PanelStatus = stage === "idle" ? "idle" : stage === "final" ? "done" : "running";

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {SCENARIOS.map((sc, idx) => (
          <button
            key={sc.id}
            type="button"
            onClick={() => {
              reset();
              setSelected(idx);
            }}
            className={cn(
              "rounded-xl border p-4 text-left transition-all",
              idx === selected
                ? "border-[#5B6EF0] bg-[#5B6EF0]/7 shadow-[0_8px_30px_rgba(91,110,240,0.14)]"
                : "border-border bg-card hover:border-[#5B6EF0]/30"
            )}
          >
            <div className={cn("text-[9.5px] font-bold tracking-[0.09em] uppercase", TAG_COLOR_CLASSES[sc.tagColor])}>
              {sc.tag}
            </div>
            <h4 className="mt-1.5 text-[13.5px] font-bold text-foreground">{sc.title}</h4>
            <p className="mt-1.5 text-[11.5px] leading-relaxed text-muted-foreground">{sc.description}</p>
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={start}
          disabled={running}
          className="inline-flex items-center gap-2 rounded-lg bg-foreground px-6 py-3 text-sm font-semibold text-background transition-all hover:-translate-y-0.5 hover:opacity-90 disabled:pointer-events-none disabled:opacity-50"
        >
          <span className="text-[#5B6EF0]">▶</span> Iniciar simulação
        </button>
        <button
          type="button"
          onClick={reset}
          className="rounded-lg border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-all hover:border-[#5B6EF0]/40"
        >
          Reiniciar
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3.5 lg:grid-cols-3">
        {/* Chat panel */}
        <div className="flex min-h-[380px] flex-col overflow-hidden rounded-2xl border border-[#5B6EF0]/18 bg-[#14161F] shadow-[0_14px_44px_rgba(0,0,0,0.14)]">
          <div className="flex items-start justify-between gap-2 border-b border-white/[0.07] p-4">
            <div>
              <div className="text-[12.5px] font-bold text-neutral-100">
                IA <span className="text-[#5B6EF0]">AssistPro</span> · WhatsApp
              </div>
              <div className="mt-0.5 text-[10px] text-white/35">Linguagem natural · canal oficial · 24/7</div>
            </div>
            <StatusBadge panel="chat" status={chatStatus} />
          </div>
          <div className="flex flex-1 flex-col gap-2.5 overflow-y-auto p-4">
            {visibleChat === 0 && !typing ? (
              <IdleMessage icon="💬" text="Selecione um cenário e inicie a simulação" />
            ) : (
              <>
                {scenario.chat.slice(0, visibleChat).map((msg, idx) => (
                  <div key={idx} className={cn("flex max-w-[86%] flex-col", msg.from === "user" ? "self-end items-end" : "self-start items-start")}>
                    {msg.from === "bot" ? (
                      <span className="mb-0.5 text-[9.5px] font-bold tracking-[0.03em] text-[#5B6EF0]/75">IA AssistPro</span>
                    ) : null}
                    <div
                      className={cn(
                        "rounded-2xl px-3.5 py-2.5 text-[12px] leading-snug",
                        msg.from === "user"
                          ? "rounded-br-sm bg-neutral-700 text-neutral-100"
                          : "rounded-bl-sm border border-[#5B6EF0]/18 bg-[#5B6EF0]/14 text-[#E3E7FB]"
                      )}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {typing ? (
                  <div className="flex w-fit items-center gap-1 self-start rounded-2xl rounded-bl-sm bg-[#5B6EF0]/10 px-3.5 py-2.5">
                    <span className="size-1.5 animate-bounce rounded-full bg-[#5B6EF0] [animation-delay:-0.2s]" />
                    <span className="size-1.5 animate-bounce rounded-full bg-[#5B6EF0] [animation-delay:-0.1s]" />
                    <span className="size-1.5 animate-bounce rounded-full bg-[#5B6EF0]" />
                  </div>
                ) : null}
              </>
            )}
          </div>
        </div>

        {/* Integration / log panel */}
        <div className="flex min-h-[380px] flex-col overflow-hidden rounded-2xl border border-[#5B6EF0]/18 bg-[#14161F] shadow-[0_14px_44px_rgba(0,0,0,0.14)]">
          <div className="flex items-start justify-between gap-2 border-b border-white/[0.07] p-4">
            <div>
              <div className="text-[12.5px] font-bold text-neutral-100">
                Integrações · <span className="text-[#5B6EF0]">CRM</span>
              </div>
              <div className="mt-0.5 text-[10px] text-white/35">Financeiro · cadastro · registro</div>
            </div>
            <StatusBadge panel="log" status={logStatus} />
          </div>
          <div className="flex-1 overflow-y-auto p-4 font-mono text-[11px] leading-loose">
            {visibleLog === 0 ? (
              <IdleMessage icon="⚡" text="Aguardando início da simulação" />
            ) : (
              scenario.log.slice(0, visibleLog).map((line, idx) => (
                <div key={idx} className="whitespace-pre-wrap">
                  {line.kind === "cmd" ? <span className="font-bold text-neutral-100">{"> " + line.value}</span> : null}
                  {line.kind === "kv" ? (
                    <>
                      <span className="text-[#5B6EF0]">{line.key}:</span>{" "}
                      <span className="text-emerald-300">{line.value}</span>
                    </>
                  ) : null}
                  {line.kind === "ok" ? <span className="font-bold text-emerald-400">{"< " + line.value}</span> : null}
                  {line.kind === "note" ? <span className="text-blue-300">{"< " + line.value}</span> : null}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Kanban panel */}
        <div className="flex min-h-[380px] flex-col overflow-hidden rounded-2xl border border-[#5B6EF0]/18 bg-[#14161F] shadow-[0_14px_44px_rgba(0,0,0,0.14)]">
          <div className="flex items-start justify-between gap-2 border-b border-white/[0.07] p-4">
            <div>
              <div className="text-[12.5px] font-bold text-neutral-100">
                CRM · <span className="text-[#5B6EF0]">Kanban da IA</span>
              </div>
              <div className="mt-0.5 text-[10px] text-white/35">Pipeline exclusivo da IA</div>
            </div>
            <StatusBadge panel="kanban" status={kanbanStatus} />
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {stage === "idle" ? (
              <IdleMessage icon="▦" text="O kanban será atualizado durante a simulação" />
            ) : (
              <div className="flex flex-col gap-2">
                {["Novo", "Triagem IA", "Atendimento IA", scenario.finalLabel].map((label, idx) => (
                  <div key={label} className="flex items-start gap-2">
                    <div className="w-[70px] shrink-0 pt-2.5 text-[8.5px] font-bold tracking-[0.04em] text-white/30 uppercase">
                      {label}
                    </div>
                    <div
                      className={cn(
                        "min-h-[40px] flex-1 rounded-lg border border-dashed border-white/10 p-1 transition-all duration-500",
                        idx === 1 && stage === "triagem" && "border-solid border-[#5B6EF0] bg-[#5B6EF0]/10",
                        idx === 3 && stage === "final" && cn("border-solid", TAG_COLOR_CLASSES[scenario.tagColor])
                      )}
                    >
                      {idx === 1 && stage === "triagem" ? (
                        <div className={cn("rounded-md p-2 text-[11px] leading-tight", CARD_COLOR_CLASSES.gold)}>
                          <div className="font-bold">{scenario.cardTitle}</div>
                          <div className="text-[10px] opacity-75">Triagem por linguagem natural em andamento</div>
                        </div>
                      ) : null}
                      {idx === 3 && stage === "final" ? (
                        <div className={cn("rounded-md p-2 text-[11px] leading-tight", CARD_COLOR_CLASSES[scenario.tagColor])}>
                          <div className="font-bold">{scenario.cardTitle}</div>
                          <div className="text-[10px] opacity-75">{scenario.cardSubtitle}</div>
                          <span className="mt-1 inline-block rounded px-1.5 py-0.5 text-[8.5px] font-bold tracking-[0.04em] uppercase opacity-90">
                            {scenario.cardBadge}
                          </span>
                        </div>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function IdleMessage({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex h-full min-h-[200px] flex-col items-center justify-center gap-2 p-5 text-center text-[12px] font-medium text-white/25">
      <span className="text-2xl opacity-80">{icon}</span>
      {text}
    </div>
  );
}
