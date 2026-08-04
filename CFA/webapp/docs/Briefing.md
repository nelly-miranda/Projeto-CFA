# BRIEFING — Ambiente CFA/CRAs

## O que é

O Ambiente CFA/CRAs é o espaço de trabalho central do Programa Nacional de Transformação Digital e Governança Integrada do Sistema CFA/CRAs. Não é um site institucional nem uma landing page de apresentação: é o repositório vivo onde o conteúdo do programa é escrito, revisado, atualizado e consultado, tanto pela consultora responsável quanto por agentes de IA que colaboram no mesmo projeto, incluindo sessões futuras do Claude Code neste repositório.

A decisão técnica que sustenta essa proposta é simples e deliberada: cada página do programa é um arquivo Markdown com metadados (frontmatter), organizado em uma pasta de conteúdo dentro do próprio repositório. O webapp é uma camada de visualização e edição amigável sobre esses arquivos. Qualquer agente com acesso ao repositório pode ler ou editar o mesmo conteúdo diretamente pelos arquivos .md, sem depender de uma API própria de agentes nesta fase. Isso significa que a interface bonita e a fonte de verdade são a mesma coisa: não existe um banco de dados escondido guardando uma versão "real" diferente do que aparece na tela.

Essa escolha existe porque o projeto CFA/CRAs vai ser construído em ciclos de trabalho assíncronos, com a consultora e diferentes agentes de IA contribuindo em momentos distintos. Um arquivo Markdown versionável, legível por humano e por máquina, é o formato que permite essa colaboração sem fricção, sem exigir treinamento em uma ferramenta proprietária e sem risco de desalinhamento entre "o que o agente escreveu" e "o que está publicado".

## Por que existe

O programa responde ao Acórdão 309/2026 do TCU e propõe ao Conselho Federal de Administração um redesenho de processos, governança e uso de tecnologia, incluindo Bitrix24 e uma camada de Inteligência Artificial (Bot IA), antes de qualquer decisão de compra ou configuração de ferramenta. Um programa dessa natureza gera um volume grande de documentação interligada: contexto, objetivos, indicadores, metodologia, termos de referência, investimento. Manter isso em arquivos .docx separados dificulta a atualização contínua e impede que agentes de IA participem da manutenção do conteúdo de forma estruturada.

O Ambiente CFA/CRAs resolve esse problema ao dar a esse conjunto de documentos uma estrutura única, navegável em árvore, editável em campo e apresentável a uma plateia executiva. Ele também cumpre uma segunda função: será a interface usada na apresentação do programa à diretoria do CFA, o que significa que precisa ser não apenas funcional, mas visualmente à altura de uma reunião de conselho.

## Para quem serve

- **Nelly (consultora responsável)**: uso diário para escrever, revisar e organizar o conteúdo do programa, com edição direta nos campos e navegação em árvore fiel à estrutura do projeto.
- **O conselho do CFA**: uso pontual, na reunião de diretoria, como interface de apresentação institucional do programa, navegável ao vivo, com identidade visual consistente com os documentos já produzidos.
- **Agentes de IA (incluindo sessões futuras do Claude Code)**: colaboradores de conteúdo, lendo e escrevendo diretamente nos arquivos Markdown do repositório, sem precisar de uma API dedicada nesta fase.

## Fora do escopo desta primeira versão

- **Banco de dados real.** O conteúdo vive em arquivos Markdown no repositório. Supabase é a escolha planejada para uma fase futura de persistência, mas nesta versão consta apenas como intenção documentada, não como implementação.
- **Autenticação multiusuário.** Não há login, perfis ou controle de permissão por usuário nesta fase. O ambiente roda localmente e o acesso é controlado pelo próprio acesso ao repositório.
- **Chat de agentes ao vivo dentro da interface.** Os agentes de IA colaboram editando os arquivos .md diretamente, não por meio de um painel de conversa embutido no webapp.

## Critérios de sucesso

1. Toda a estrutura de páginas do sitemap está navegável em árvore na sidebar, com hubs colapsáveis e leafs simples, refletindo exatamente a hierarquia definida para o programa.
2. Qualquer página pode ser editada na interface e a alteração é persistida no arquivo .md correspondente, sem perda de frontmatter.
3. As lacunas de conteúdo identificadas no diagrama original (linhas adicionais do Acórdão 309/2026, os dois Termos de Referência distintos, o Bitrix24 nomeado explicitamente, o Modelo do Painel, a página de Investimento) estão presentes e coerentes com os documentos já produzidos.
4. A interface está pronta para ser usada ao vivo em uma reunião de diretoria: identidade visual consistente com os documentos .docx da Traevo, navegação fluida, sem elementos de "protótipo interno" visíveis.
5. Um agente de IA sem contexto prévio, ao abrir o repositório, consegue entender a estrutura de conteúdo apenas lendo os arquivos .md e seus frontmatters, sem depender de explicação adicional.
