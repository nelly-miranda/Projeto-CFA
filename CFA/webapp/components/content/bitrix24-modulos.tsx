"use client";

import { useState } from "react";
import Image from "next/image";
import { MessageCircle, Users, ListChecks, UserCog, ExternalLink, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCard {
  title: string;
  text: string;
  image: string;
}

interface Category {
  id: string;
  label: string;
  icon: LucideIcon;
  accent: string;
  heroImage: string;
  headline: string;
  description: string;
  sourceUrl: string;
  features: FeatureCard[];
}

const CATEGORIES: Category[] = [
  {
    id: "communications",
    label: "Colaboração",
    icon: MessageCircle,
    accent: "bg-sky-500",
    heroImage: "/images/bitrix24/communications/hero.jpg",
    headline: "Espaço de trabalho on-line para toda a equipe",
    description:
      "Por meio de uma ampla variedade de ferramentas de comunicação e colaboração, o Bitrix24 permite que as equipes trabalhem de maneira mais fácil e eficiente em qualquer lugar: em casa, no escritório ou em trânsito.",
    sourceUrl: "https://www.bitrix24.com.br/tools/communications/",
    features: [
      {
        title: "Espaço de trabalho on-line",
        text: "O melhor espaço de trabalho para sua equipe, com bate-papo, videoconferência, feed de atividades, comentários, reações, comunicados e muito mais.",
        image: "/images/bitrix24/communications/card-1.jpg",
      },
      {
        title: "Reuniões on-line",
        text: "Organize reuniões on-line e videoconferências para mais de 100 participantes, com compartilhamento de tela, planos de fundo personalizados, gravação de chamadas e muito mais.",
        image: "/images/bitrix24/communications/card-2.jpg",
      },
      {
        title: "Grupos de trabalho",
        text: "Crie grupos de trabalho e colabore em tarefas e projetos usando quadro Kanban, gráfico de Gantt, Scrum, listas de verificação, controle do tempo da tarefa, relatórios das tarefas e muito mais.",
        image: "/images/bitrix24/communications/card-3.jpg",
      },
      {
        title: "Documentos on-line e armazenamento de arquivos",
        text: "Armazenamento seguro na nuvem e sistema de gerenciamento de documentos on-line para colaboração rápida e eficiente em toda a empresa.",
        image: "/images/bitrix24/communications/card-4.jpg",
      },
      {
        title: "Calendários compartilhados",
        text: "Organize reuniões e eventos, marque compromissos e planeje seu dia, compartilhe seus horários disponíveis com sua equipe e usuários externos.",
        image: "/images/bitrix24/communications/card-5.jpg",
      },
      {
        title: "Comunicação no celular",
        text: "Fique em contato com sua equipe usando o aplicativo móvel: todos os seus bate-papos, chamadas de vídeo, tarefas, reuniões, comentários e documentos estão aqui.",
        image: "/images/bitrix24/communications/card-6.jpg",
      },
      {
        title: "Trabalho em conjunto com tecnologia de IA",
        text: "Use o CoPilot, assistente com tecnologia IA, para criar ideias, escrever e traduzir textos, gerar descrições de tarefas e muito mais.",
        image: "/images/bitrix24/communications/card-7.jpg",
      },
    ],
  },
  {
    id: "crm",
    label: "CRM",
    icon: Users,
    accent: "bg-[#5B6EF0]",
    heroImage: "/images/bitrix24/crm/hero.jpg",
    headline: "CRM adaptado à Gestão de Relacionamento Institucional (GRI)",
    description:
      "Atenda melhor. Atenda mais rápido. Uma plataforma única para o CFA e os CRAs gerirem o relacionamento com os profissionais registrados e com a sociedade — não uma ferramenta de vendas.",
    sourceUrl: "https://www.bitrix24.com.br/tools/crm/",
    features: [
      {
        title: "Gestão de relacionamento institucional",
        text: "Um conjunto completo de ferramentas para gerir o relacionamento do CFA e dos CRAs com profissionais e cidadãos, incluindo demandas, protocolos, pipelines por setor (registro, fiscalização, cobrança, atendimento) e muito mais.",
        image: "/images/bitrix24/crm/card-1.jpg",
      },
      {
        title: "Cobrança e documentos",
        text: "Tudo que os CRAs precisam para gerir a cobrança de anuidades está aqui: boletos, faturas, pagamentos, emissão de certidões e assinatura eletrônica de documentos.",
        image: "/images/bitrix24/crm/card-2.jpg",
      },
      {
        title: "Atendimento com tecnologia IA",
        text: "Use o Bot IA para responder dúvidas de profissionais e cidadãos, qualificar demandas, transcrever atendimentos e escalar casos ao setor responsável automaticamente.",
        image: "/images/bitrix24/crm/card-3.jpg",
      },
      {
        title: "Comunicação institucional",
        text: "Alcance profissionais e cidadãos da maneira mais conveniente para eles: e-mail, SMS, WhatsApp, telefone e páginas oficiais, para editais, comunicados e campanhas de educação continuada.",
        image: "/images/bitrix24/crm/card-4.jpg",
      },
      {
        title: "Atendimento no celular",
        text: "Gerencie atendimentos, protocolos e cadastro de profissionais no seu smartphone, usando o aplicativo móvel Bitrix24.",
        image: "/images/bitrix24/crm/card-5.jpg",
      },
      {
        title: "Central de atendimento multicanal",
        text: "Uma solução versátil de atendimento omnicanal ao profissional e ao cidadão, com formulários web, widgets, bate-papo ao vivo, integrações com WhatsApp, telefonia, e-mail e muito mais.",
        image: "/images/bitrix24/crm/card-6.jpg",
      },
      {
        title: "Análises e relatórios",
        text: "Obtenha indicadores completos de atendimento institucional, incluindo volume por setor, desempenho da equipe, relatórios de BI e painéis de supervisão exigidos pelo TCU.",
        image: "/images/bitrix24/crm/card-7.jpg",
      },
      {
        title: "Colaboração entre equipes de atendimento",
        text: "Melhore a comunicação entre as equipes de registro, fiscalização, cobrança e atendimento com bate-papo, reuniões on-line, tarefas, calendário, armazenamento de arquivos e documentos on-line.",
        image: "/images/bitrix24/crm/card-8.jpg",
      },
      {
        title: "Automação e integrações",
        text: "Um conjunto completo de ferramentas de automação de processos institucionais, incluindo regras e gatilhos personalizáveis, automação do fluxo de atendimento e integrações com outros sistemas do CFA e dos CRAs.",
        image: "/images/bitrix24/crm/card-9.jpg",
      },
    ],
  },
  {
    id: "tasks",
    label: "Tarefas e Projetos",
    icon: ListChecks,
    accent: "bg-emerald-500",
    heroImage: "/images/bitrix24/tasks/hero.jpg",
    headline: "Software gratuito de gerenciamento de tarefas para a sua empresa",
    description:
      "Defina tarefas, gerencie prazos, receba relatórios, acompanhe KPIs e execute projetos de onde você estiver.",
    sourceUrl: "https://www.bitrix24.com.br/tools/tasks_and_projects/",
    features: [
      {
        title: "Gerenciamento de tarefas",
        text: "Um conjunto completo de ferramentas de gerenciamento de tarefas para a sua empresa, incluindo quadro Kanban, gráfico de Gantt, Scrum e muito mais.",
        image: "/images/bitrix24/tasks/card-1.jpg",
      },
      {
        title: "Gerenciamento de projetos",
        text: "Todas as ferramentas já estão instaladas. Basta adicionar os membros da sua equipe, definir permissões de acesso e começar a trabalhar!",
        image: "/images/bitrix24/tasks/card-2.jpg",
      },
      {
        title: "Monitoramento de tarefas",
        text: "Aumente a eficiência do trabalho e melhore a colaboração da equipe com acompanhamento do tempo da tarefa, resumos de tarefas, monitoramento da carga de trabalho e muito mais.",
        image: "/images/bitrix24/tasks/card-3.jpg",
      },
      {
        title: "Colaboração em projetos",
        text: "Tudo para facilitar o trabalho produtivo da sua equipe está aqui: bate-papo, chamadas de vídeo, armazenamento de arquivos, documentos on-line e muito mais.",
        image: "/images/bitrix24/tasks/card-4.jpg",
      },
      {
        title: "Desempenho do funcionário",
        text: "Uma ampla variedade de ferramentas para ajudar você a monitorar e analisar o desempenho dos funcionários: relatórios de tarefas, envolvimento em tarefas, eficiência das tarefas, KPI etc.",
        image: "/images/bitrix24/tasks/card-5.jpg",
      },
      {
        title: "Automação",
        text: "Um conjunto completo de ferramentas de automação de vendas, incluindo regras e gatilhos personalizáveis, automação do fluxo de trabalho, modelos de tarefas, tarefas recorrentes e muito mais.",
        image: "/images/bitrix24/tasks/card-6.jpg",
      },
      {
        title: "Tarefas no celular",
        text: "Atribua tarefas, gerencie o andamento do trabalho, discuta questões relacionadas às tarefas nos bate-papos e comentários, organize reuniões e chamadas on-line.",
        image: "/images/bitrix24/tasks/card-7.jpg",
      },
      {
        title: "API e integrações",
        text: "Conecte seu Bitrix24 a outros serviços por meio da integração API na nuvem para automação avançada de tarefas e gerenciamento de projetos.",
        image: "/images/bitrix24/tasks/card-8.jpg",
      },
      {
        title: "Gerenciamento de projetos com tecnologia IA",
        text: "Use o Bitrix24 CoPilot para gerar descrições de tarefas, planejar projetos, criar resumos de tarefas, responder comentários e muito mais.",
        image: "/images/bitrix24/tasks/card-9.jpg",
      },
    ],
  },
  {
    id: "hr",
    label: "RH e Automação",
    icon: UserCog,
    accent: "bg-amber-500",
    heroImage: "/images/bitrix24/hr/hero.jpg",
    headline: "Gestão de RH e automação do fluxo de trabalho",
    description:
      "Otimize fluxos de trabalho, automatize seus processos de trabalho e gerencie os dados dos funcionários de maneira profissional.",
    sourceUrl: "https://www.bitrix24.com.br/tools/hr_automation/",
    features: [
      {
        title: "Gestão de funcionários",
        text: "Uma boa seleção de ferramentas de gestão de funcionários para sua empresa: perfis de funcionários, estrutura da empresa, permissões de acesso, login único e muito mais.",
        image: "/images/bitrix24/hr/card-1.jpg",
      },
      {
        title: "Gerenciamento do trabalho",
        text: "Todas as ferramentas que você precisa para gerenciar sua equipe e o trabalho: relatórios de tarefas, gerenciamento da carga de trabalho, KPI, controle das horas de trabalho e muito mais.",
        image: "/images/bitrix24/hr/card-2.jpg",
      },
      {
        title: "Gerenciamento de informações",
        text: "Gerencie os dados da empresa e da equipe usando bases de conhecimento, armazenamento de arquivos, documentos de texto on-line, planilhas, apresentações e muito mais.",
        image: "/images/bitrix24/hr/card-3.jpg",
      },
      {
        title: "Cultura e engajamento",
        text: "Aumente o engajamento dos funcionários e crie um ambiente de trabalho positivo usando feeds, enquetes, distintivos de agradecimento, marcadores, notificações pessoais e muito mais.",
        image: "/images/bitrix24/hr/card-4.jpg",
      },
      {
        title: "Comunicação interna",
        text: "Utilize uma forma de comunicação eficiente com a equipe por vários canais: mensagens, chamadas de vídeo e conferências, comentários, comunicados e muito mais.",
        image: "/images/bitrix24/hr/card-5.jpg",
      },
      {
        title: "Automação",
        text: "Um conjunto completo de ferramentas de automação de processos e fluxos de trabalho para sua empresa, incluindo RPA, regras, gatilhos, processos inteligentes e muito mais.",
        image: "/images/bitrix24/hr/card-6.jpg",
      },
      {
        title: "Espaço de trabalho alimentado por IA",
        text: "Use o CoPilot, assistente com tecnologia IA, para criar ideias, escrever comunicados, gerar resumos, responder comentários e muito mais.",
        image: "/images/bitrix24/hr/card-7.jpg",
      },
      {
        title: "RH no celular",
        text: "Gerencie sua equipe em qualquer lugar usando o aplicativo móvel: todos os seus bate-papos, chamadas de vídeo, tarefas, reuniões, comentários, perfis de funcionários e documentos estão aqui.",
        image: "/images/bitrix24/hr/card-8.jpg",
      },
    ],
  },
];

export function Bitrix24Modulos() {
  const [active, setActive] = useState(0);
  const category = CATEGORIES[active];

  return (
    <div className="flex flex-col gap-5">
      {/* Seletor de módulos, no modelo de abas do site oficial */}
      <div className="flex flex-wrap gap-2 border-b border-border pb-4">
        {CATEGORIES.map((cat, idx) => {
          const Icon = cat.icon;
          const isActive = idx === active;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActive(idx)}
              className={cn(
                "flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-medium transition-all",
                isActive
                  ? "border-[#5B6EF0] bg-[#5B6EF0]/8 text-foreground shadow-sm"
                  : "border-border text-muted-foreground hover:border-[#5B6EF0]/30 hover:text-foreground"
              )}
            >
              <span className={cn("flex size-6 shrink-0 items-center justify-center rounded-md text-white", cat.accent)}>
                <Icon className="size-3.5" />
              </span>
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Hero do módulo ativo */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="relative aspect-[1200/530] w-full bg-neutral-100 dark:bg-neutral-800">
          <Image src={category.heroImage} alt={category.headline} fill className="object-cover" priority={false} />
        </div>
        <div className="p-5">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#5B6EF0]">
            Bitrix24 · {category.label}
          </span>
          <h3 className="mt-1 text-xl font-bold text-foreground">{category.headline}</h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{category.description}</p>
          <a
            href={category.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[#4457C4] hover:underline"
          >
            Ver página oficial <ExternalLink className="size-3" />
          </a>
        </div>
      </div>

      {/* Cards de funcionalidades, com o designer do card do bloco Programa */}
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {category.features.map((feature) => (
          <div
            key={feature.title}
            className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-150 hover:-translate-y-0.5 hover:border-[#5B6EF0]/40 hover:shadow-md"
          >
            <div className="relative h-36 w-full bg-neutral-100 dark:bg-neutral-800">
              <Image src={feature.image} alt={feature.title} fill className="object-cover" />
            </div>
            <div className="flex flex-1 flex-col gap-1.5 p-4">
              <span className="text-[13.5px] font-semibold text-foreground">{feature.title}</span>
              <span className="text-[12px] leading-relaxed text-muted-foreground">{feature.text}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
