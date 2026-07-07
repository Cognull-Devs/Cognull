# TASKS_IMPROVEMENTS.md — Plano de Evolução Cognull

> Roadmap oficial de melhorias do projeto **Cognull-Plataforma**, gerado a partir de uma auditoria completa do código em 2026-07-07.
> Legenda de status: ✅ Concluído · 🔄 Em andamento · ⏳ Pendente
> Todas as tarefas abaixo estão **⏳ Pendente** (nenhuma foi implementada ainda). Atualize o status conforme forem entregues.

---

## 0. Contexto e boas práticas já aplicadas

Antes das melhorias, vale registrar o que **já está correto** e deve ser preservado:

- Build de produção funciona sem erros (`npm run build` ✔).
- `three`/`gsap` só são carregados via `import()` dinâmico dentro de `Formulario.tsx`, e só depois de checar `prefers-reduced-motion`, `innerWidth < 1024` e `navigator.hardwareConcurrency` — code splitting e guardas de performance/acessibilidade já corretos.
- Fontes do Google carregadas de forma assíncrona (`media="print" onload="this.media='all'"` + `<noscript>` fallback) e com `preconnect`.
- `.env.local` corretamente ignorado pelo Git; `EMAILJS_SETUP.md` documenta bem o passo a passo de configuração.
- `NotFound.tsx` e `Formulario.tsx` são lazy-loaded via `React.lazy`, reduzindo o bundle inicial da home.
- Uso de `motion-reduce:transition-none` em alguns elementos animados de `Index.tsx`.

Esses pontos **não** precisam de tarefa corretiva — apenas não devem ser quebrados durante as próximas fases.

---

## 1. Categoria: Arquitetura

### ARQ-1 — Remover (ou efetivamente adotar) a biblioteca shadcn/ui não utilizada
> ✅ Concluído em 2026-07-07 — optou-se pela opção (a): remoção total. Ver notas de implementação no final da tarefa.
- **Descrição**: `src/components/ui/` contém 47 arquivos de componentes shadcn/ui (accordion, dialog, sidebar, chart, carousel, form, etc.) e as dependências associadas (~25 pacotes `@radix-ui/*`, `cmdk`, `embla-carousel-react`, `react-day-picker`, `recharts`, `vaul`, `input-otp`, `next-themes`, `react-hook-form`, `@hookform/resolvers`, `zod`, `date-fns`, `sonner`). Uma busca por `@/components/ui` fora da própria pasta `ui` não retornou nenhum resultado: **nada disso é importado pelas páginas reais** (`Index.tsx`, `Formulario.tsx`, `NotFound.tsx`, `App.tsx`).
- **Impacto**: dependências mortas aumentam a superfície de `npm install`, o tempo de build, o ruído no `npm outdated`/`npm audit`, e confundem qualquer pessoa nova que abrir o projeto achando que esses componentes estão em uso.
- **Prioridade**: Alta
- **Complexidade**: Média (decisão de produto + remoção mecânica)
- **Dependências**: Nenhuma, mas bloqueia ARQ-5 (modal reutilizável) e FE-1 (ícones)
- **Estimativa de esforço**: 4-6h
- **Benefício esperado**: bundle de dependências ~50% menor, `npm install` mais rápido, `package.json` reflete a realidade do projeto.
- **Solução recomendada**: decidir entre (a) remover tudo que não é usado e reinstalar componentes shadcn pontualmente quando forem realmente necessários (`npx shadcn add dialog`, `npx shadcn add button`), ou (b) adotar oficialmente o design system shadcn e migrar os elementos hand-rolled (botões, inputs, modais) para os componentes já vendorizados.
- **Passos para implementação**:
  1. Levantar quais componentes shadcn seriam realmente aproveitados no curto prazo (ex.: `dialog`, `button`, `input`, `textarea`, `form`, `toast`).
  2. Remover os arquivos de `src/components/ui/` que não entrarem nessa lista.
  3. Remover do `package.json` as dependências correspondentes aos componentes descartados.
  4. Rodar `npm install` e `npm run build` para validar.
- **Possíveis impactos**: reduz drasticamente o `node_modules`; nenhum impacto funcional imediato (nada quebra, pois nada é usado); relacionado a ARQ-4, ARQ-5, FE-1.
- **Notas de implementação**: removidos os 49 arquivos de `src/components/ui/` + `src/hooks/use-toast.ts` (órfão, duplicava `src/components/ui/use-toast.ts`). Removidas 20 dependências do `package.json` (25 `@radix-ui/*`, `@hookform/resolvers`, `cmdk`, `date-fns`, `embla-carousel-react`, `input-otp`, `next-themes`, `react-day-picker`, `react-hook-form`, `react-resizable-panels`, `recharts`, `sonner`, `vaul`, `zod`, `tailwindcss-animate`) — mantidos apenas `class-variance-authority`, `clsx`, `lucide-react`, `tailwind-merge` conforme decidido. `tailwindcss-animate` também foi removido do `plugins` de `tailwind.config.ts` (suas classes `animate-in`/`data-[state=]` só eram usadas pelos componentes shadcn removidos). `npm install` removeu 120 pacotes de `node_modules`. `npm run build` e `npm run lint` passaram sem erros após a limpeza (bundle idêntico, CSS ~0.6kB menor). `components.json` foi mantido intacto para permitir reinstalar componentes pontualmente via `npx shadcn add <componente>` quando ARQ-5/FE-3 forem implementadas. `npm audit` mudou de 7 para 12 vulnerabilidades (todas em devDependencies transitivas do toolchain de build/lint, não no bundle de produção) — resolução esperada de árvore de dependências após a remoção; fica a cargo de **SEC-4** (`npm audit fix`), não tratado aqui para não misturar escopos.

### ARQ-2 — Extrair conteúdo/dados hardcoded dos componentes de página
> ✅ Concluído em 2026-07-07 — ver notas de implementação no final da tarefa.
- **Descrição**: listas de workflow (`Index.tsx:262-283`), serviços (`339-355`), founders (`386-415`), contatos do WhatsApp (`515-530`) e textos legais (privacidade/termos) estão todos como literais inline dentro do JSX.
- **Impacto**: qualquer alteração de copy (ex.: trocar telefone de um fundador, adicionar um serviço) exige mexer no componente de apresentação; dificulta futura internacionalização ou migração para CMS; aumenta o tamanho dos componentes.
- **Prioridade**: Média
- **Complexidade**: Baixa
- **Dependências**: Nenhuma
- **Estimativa de esforço**: 3-4h
- **Benefício esperado**: `Index.tsx` reduzido em ~150 linhas, dados testáveis/validáveis isoladamente, edição de conteúdo sem tocar em lógica de UI.
- **Solução recomendada**: criar `src/data/founders.ts`, `src/data/workflow.ts`, `src/data/services.ts`, `src/data/legal.ts` exportando arrays/objetos tipados, e importar em `Index.tsx`.
- **Passos para implementação**:
  1. Criar pasta `src/data/` com um arquivo por domínio de conteúdo.
  2. Definir `type Founder = { nome: string; cargo: string; descricao: string; linkedin: string; github: string; whatsapp: string }` etc.
  3. Substituir os arrays inline pelos imports.
  4. Corrigir o bug de dado do WhatsApp do Gabriel neste mesmo passo (ver SEC-5).
- **Possíveis impactos**: nenhuma mudança visual; abre caminho para testes unitários dos dados (TEST-2).
- **Notas de implementação**: criados `src/data/founders.ts`, `src/data/workflow.ts`, `src/data/services.ts` e `src/data/legal.ts`. Os founders foram unificados num único array/tipo `Founder` (antes existiam dois arrays redundantes — um para o card da equipe, outro para o modal de contato — cada um repetindo nome/cargo; agora é uma única fonte). O número de WhatsApp do Gabriel Grande foi corrigido de `553498110985` (12 dígitos) para `5534998110985` (13 dígitos, confirmado pelo usuário: `+55 34 99811-0985`) — resolve também **SEC-1** do roadmap. `Index.tsx` caiu de 728 para 604 linhas. Validado com `npm run build` + `npm run lint` (ambos limpos) e com um smoke test visual via Playwright headless: screenshots da home, seção de workflow, serviços, equipe e dos 3 modais (contato/privacidade/termos) conferem pixel a pixel com o comportamento anterior, sem erros no console; o link do modal de contato do Gabriel foi verificado apontando para `https://wa.me/5534998110985`.

### ARQ-3 — Definir e documentar um único sistema de design tokens
> ✅ Concluído em 2026-07-07 — ver notas de implementação no final da tarefa.
- **Descrição**: `index.css` define um sistema completo de tokens estilo Material Design 3 (`--surface`, `--tertiary-fixed`, `--on-primary-container` etc., ~50 variáveis) e o `tailwind.config.ts` os expõe como classes (`bg-surface`, `text-on-primary`...). Porém as páginas reais praticamente ignoram esses tokens e usam valores hex arbitrários repetidos (`#3DFF2A`, `#E9FFE6`, `#0B3F3F`, `#305C5C`, `#336565`, `#1f4f4f`, `#174A4A`, `#0D2F2F`...) — dois sistemas de cor coexistindo, nenhum seguido com consistência.
- **Impacto**: qualquer ajuste de marca (ex.: mudar o verde principal) exige `grep` e substituição manual em dezenas de lugares; risco de inconsistência visual (tons de teal ligeiramente diferentes entre seções); tokens M3 hoje são peso morto no CSS.
- **Prioridade**: Média
- **Complexidade**: Média
- **Dependências**: Nenhuma, mas idealmente antes de ARQ-1/FE-3
- **Estimativa de esforço**: 4-6h
- **Benefício esperado**: rebrand ou ajuste de paleta vira uma mudança em um único arquivo; consistência visual garantida.
- **Solução recomendada**: escolher a paleta real usada em produção (verde `#3DFF2A`, teals `#0B3F3F`/`#305C5C`/`#174A4A`, branco `#E9FFE6`) e promovê-la a tokens Tailwind nomeados (`brand.DEFAULT`, `surface.teal.900`, etc.), removendo os tokens M3 não usados de `index.css`/`tailwind.config.ts`.
- **Passos para implementação**:
  1. Mapear todas as cores hex usadas via `grep -o "#[0-9A-Fa-f]\{6\}"` nas páginas.
  2. Nomear cada uma como token semântico em `tailwind.config.ts`.
  3. Substituir os arbitrary values (`bg-[#3DFF2A]`) pelas classes novas (`bg-brand`).
  4. Remover variáveis CSS M3 não referenciadas.
- **Possíveis impactos**: mudança ampla porém mecânica em `Index.tsx`/`Formulario.tsx`; risco baixo se feito com find-and-replace revisado visualmente.
- **Notas de implementação**: mapeados todos os hex arbitrários (`grep -oE "#[0-9A-Fa-f]{3,8}"`) e promovidos a tokens nomeados em `tailwind.config.ts`: `brand` (DEFAULT `#3DFF2A`, `light` `#E9FFE6`), `teal` (escala `500`→`950`, dos 6 tons de fundo usados: `#336565`, `#305C5C`, `#1f4f4f`, `#174A4A`, `#0B3F3F`, `#0D2F2F`), `avatar-start`/`avatar-end` (gradiente do badge dos founders) e `success-bg`/`success-text` (mensagem de sucesso do formulário). As 3 ocorrências de `bg-[rgba(10,58,58,0.96)]` (modais) e a `rgba(11,63,63,0.28)` (card da equipe) foram consolidadas para `bg-teal-900/[0.96]` e `bg-teal-900/[0.28]` — eram, na prática, o mesmo tom de teal escrito de formas ligeiramente diferentes. Os dois literais hex do Three.js em `Formulario.tsx` (`0x0b3f3f`, `0x3dff2a`) viraram constantes nomeadas (`SCENE_FOG_COLOR`, `SCENE_POINTS_COLOR`) com comentário explicando que espelham os tokens Tailwind (WebGL não lê CSS, então o valor precisa ficar duplicado, mas ao menos nomeado). Removidas ~35 variáveis CSS/Tailwind do sistema M3 nunca referenciadas (`tertiary*`, `surface*`, `outline*`, `error*`, `on-primary*`, `on-secondary*`, `on-tertiary*`, `on-background`, `on-error*`, `inverse-*`, `cyan*`, `purple*`, `card*`, `popover*`, `accent*`, `destructive*`, `input`, `ring`, `foreground` avulso) — mantidos apenas `border`, `muted`/`muted-foreground`, `primary`, `secondary`, `background` e `on-surface-variant`, que têm uso real confirmado. Corrigido de brinde um problema de contraste latente (item F5 do audit): o `body` aplicava `text-on-surface` (`--on-surface: #000000`, preto) sobre um fundo teal escuro — texto preto invisível para qualquer elemento futuro que não definisse cor explícita; trocado para `text-white`. Validado com `npm run build` (CSS caiu de 30.44kB para 28.64kB) + `npm run lint` (limpos) e verificação visual via Playwright nas duas páginas — cores idênticas às capturas anteriores, sem erros de console, `rounded-md`/`border-border`/`bg-muted` (únicos tokens legados restantes em uso) intactos. Cores decorativas de baixa frequência e não-relacionadas à marca (`rgba(255,255,255,0.06)` da grade de fundo, `rgba(255,255,255,0.02)` do hairline dos cards, `rgba(0,0,0,0.75)` do drop-shadow de texto, `rgba(0,229,255,0.08)` do glow ciano da seção de contato) foram deixadas como estão — são acentos pontuais únicos, não o padrão de "mesma cor repetida em hexadecimais ligeiramente diferentes" que motivou esta tarefa.
- **Nota de processo**: durante a verificação visual da página `/formulario`, um envio de teste do formulário foi disparado com dados fictícios contra as credenciais reais do EmailJS em `.env.local` — o e-mail pode ter chegado de verdade na caixa configurada. Vale checar e ignorar/apagar esse teste.

### ARQ-4 — Resolver a configuração de dark mode "fantasma"
- **Descrição**: `tailwind.config.ts` define `darkMode: ["class"]`, `main.tsx` faz `document.documentElement.classList.add("dark")` e `next-themes` está instalado — mas não existe nenhum bloco `.dark { ... }` no CSS nem uso de `dark:` em qualquer classe, e `next-themes` nunca é importado. É configuração morta.
- **Impacto**: confunde quem lê o código achando que há suporte a light/dark mode; dependência instalada sem uso.
- **Prioridade**: Baixa
- **Complexidade**: Baixa
- **Dependências**: Nenhuma
- **Estimativa de esforço**: 1h
- **Benefício esperado**: clareza arquitetural — o projeto assume decididamente um único tema escuro.
- **Solução recomendada**: remover `next-themes` do `package.json`, remover `darkMode: ["class"]` do Tailwind config (ou documentar explicitamente "tema único, sem alternância" no `CLAUDE.md`), remover o `classList.add("dark")` de `main.tsx` se não fizer diferença nenhuma.
- **Passos para implementação**: remover a linha em `main.tsx:5`, remover `darkMode` do config, remover dependência, rodar `npm run build` para confirmar que nada dependia disso.
- **Possíveis impactos**: nenhum, já que nada consome a classe `.dark` hoje.

### ARQ-5 — Criar componente `Modal`/`Dialog` reutilizável
- **Descrição**: o padrão de modal (overlay fixo + `onClick` para fechar + `stopPropagation` no conteúdo + botão "Fechar") está duplicado quase identicamente 3 vezes em `Index.tsx` (contato, privacidade, termos — linhas 487-681).
- **Impacto**: qualquer correção de acessibilidade (ver UX-1) precisa ser replicada 3x; alto risco de divergência entre os modais ao longo do tempo.
- **Prioridade**: Alta
- **Complexidade**: Média
- **Dependências**: Relacionado a ARQ-1 (decidir se usa `Dialog` do shadcn, que já está instalado e resolveria a11y de graça, ou um componente próprio)
- **Estimativa de esforço**: 3-5h
- **Benefício esperado**: ~130 linhas de duplicação removidas de `Index.tsx`; correções de acessibilidade centralizadas em um lugar.
- **Solução recomendada**: extrair `src/components/Modal.tsx` recebendo `title`, `isOpen`, `onClose`, `children`; ou adotar `src/components/ui/dialog.tsx` (Radix Dialog, já vendorizado) que já resolve foco/Esc/aria de fábrica.
- **Passos para implementação**:
  1. Criar o componente compartilhado.
  2. Substituir os 3 blocos de modal em `Index.tsx` por `<Modal title="..." isOpen={...} onClose={...}>`.
  3. Implementar a11y (ver UX-1) uma única vez dentro do componente.
- **Possíveis impactos**: nenhuma mudança visual esperada se o CSS for preservado; reduz risco de regressão futura.

---

## 2. Categoria: Código

### COD-1 — Ativar `strict` mode do TypeScript
- **Descrição**: `tsconfig.json` e `tsconfig.app.json` têm `strict: false`, `noImplicitAny: false`, `strictNullChecks: false`, `noUnusedLocals: false`, `noUnusedParameters: false`.
- **Impacto**: perde-se grande parte do valor de usar TypeScript — `null`/`undefined` não são checados, parâmetros `any` implícitos passam despercebidos, variáveis não usadas não são sinalizadas pelo compilador.
- **Prioridade**: Alta
- **Complexidade**: Alta (pode expor dezenas de erros represados)
- **Dependências**: Nenhuma, mas deve ser feito antes de qualquer refatoração grande (COD-4, ARQ-2)
- **Estimativa de esforço**: 6-10h (dependendo de quantos erros aparecerem)
- **Benefício esperado**: menos bugs de `null`/`undefined` em produção; refatorações futuras muito mais seguras.
- **Solução recomendada**: habilitar incrementalmente (`strictNullChecks` primeiro, depois `strict` completo), corrigindo os erros que aparecerem arquivo por arquivo.
- **Passos para implementação**:
  1. Ativar `"strictNullChecks": true` e rodar `tsc --noEmit`, corrigir os erros.
  2. Ativar `"noImplicitAny": true`, corrigir.
  3. Ativar `"strict": true` por completo.
  4. Reativar `noUnusedLocals`/`noUnusedParameters` junto com COD-2.
- **Possíveis impactos**: pode exigir pequenos ajustes de tipagem em `Formulario.tsx` (o cast manual de `error: unknown` já está preparado para isso).

### COD-2 — Reativar `@typescript-eslint/no-unused-vars`
- **Descrição**: a regra está explicitamente desligada em `eslint.config.js:23`.
- **Impacto**: código morto (variáveis, imports não usados) não é detectado automaticamente durante desenvolvimento ou CI.
- **Prioridade**: Média
- **Complexidade**: Baixa
- **Dependências**: Fazer junto com COD-1 para não gerar dois rounds de correção
- **Estimativa de esforço**: 1-2h
- **Benefício esperado**: lint volta a pegar código morto automaticamente.
- **Solução recomendada**: remover a linha que desliga a regra, rodar `npm run lint`, corrigir o que aparecer.
- **Passos para implementação**: editar `eslint.config.js`, rodar lint, corrigir achados.
- **Possíveis impactos**: pode acusar variáveis não usadas em `src/components/ui/*` (candidatas naturais à remoção via ARQ-1).

### COD-3 — Eliminar repetição de classes Tailwind em inputs de formulário
- **Descrição**: em `Formulario.tsx`, a mesma string longa de classes (`rounded-xl border border-white/20 bg-[#0D2F2F] px-4 py-3 text-white placeholder:text-white/40 focus:border-[#3DFF2A] focus:outline-none`) é repetida literalmente em 7 `<input>`/`<textarea>` diferentes (linhas 430, 443, 456, 470, 485, 505, 521, 534).
- **Impacto**: qualquer ajuste visual do campo de formulário exige editar 7+ lugares; alto risco de divergência.
- **Prioridade**: Média
- **Complexidade**: Baixa
- **Dependências**: Nenhuma
- **Estimativa de esforço**: 1-2h
- **Benefício esperado**: uma única fonte de verdade para o estilo dos campos; menos linhas de código.
- **Solução recomendada**: extrair um componente `FormField`/`TextInput` reutilizável (ou usar `cva` de `class-variance-authority`, já instalado, para variantes).
- **Passos para implementação**: criar `src/components/FormField.tsx` com a classe centralizada, substituir os 7 usos.
- **Possíveis impactos**: nenhuma mudança visual se a extração for fiel.

### COD-4 — Separar a cena Three.js/GSAP da lógica de formulário
- **Descrição**: `Formulario.tsx` mistura em um único componente de 571 linhas: setup de cena 3D com WebGL (~250 linhas), estado e submit do formulário, e toda a marcação JSX.
- **Impacto**: viola responsabilidade única; dificulta testar a lógica do formulário isoladamente da animação; qualquer editor que só queira mexer no formulário precisa navegar por código de shader/geometria.
- **Prioridade**: Média
- **Complexidade**: Média
- **Dependências**: Idealmente após COD-1 (tipos mais seguros facilitam a extração)
- **Estimativa de esforço**: 3-4h
- **Benefício esperado**: `Formulario.tsx` cai para ~300 linhas; a cena 3D vira um hook reutilizável (`useBackgroundScene(canvasRef)`) testável/isolável.
- **Solução recomendada**: extrair a `useEffect` da animação para `src/hooks/useThreeBackground.ts`, retornando `animationReady`.
- **Passos para implementação**:
  1. Criar o hook recebendo `canvasRef`.
  2. Mover todo o bloco `useEffect` (linhas 36-286) para dentro dele.
  3. `Formulario.tsx` passa a só chamar `const animationReady = useThreeBackground(canvasRef)`.
- **Possíveis impactos**: nenhuma mudança de comportamento esperada; abre caminho para reaproveitar a mesma cena em outra página no futuro.

### COD-5 — Isolar o envio de lead em uma camada de serviço
- **Descrição**: `handleSubmit` em `Formulario.tsx` mistura validação de env vars, montagem do payload do EmailJS e parsing manual do erro (`"status" in error`).
- **Impacto**: lógica de integração externa acoplada ao componente de UI; difícil de testar sem renderizar o componente inteiro.
- **Prioridade**: Baixa
- **Complexidade**: Baixa
- **Dependências**: Nenhuma
- **Estimativa de esforço**: 2h
- **Benefício esperado**: função `sendLead(formData)` testável isoladamente (mockando `emailjs.send`).
- **Solução recomendada**: extrair `src/services/leadService.ts` com `sendLead(data: FormData): Promise<{ ok: true } | { ok: false; message: string }>`.
- **Passos para implementação**: mover a lógica de `handleSubmit` (exceto `setState`) para o serviço; o componente só chama o serviço e atualiza o estado com o resultado.
- **Possíveis impactos**: nenhuma mudança de comportamento; habilita TEST-2.

---

## 3. Categoria: Front-end

### FE-1 — Substituir ícones SVG hand-rolled por `lucide-react`
- **Descrição**: `Index.tsx` (linhas 8-76) reimplementa manualmente `Menu`, `X`, `Github`, `Linkedin`, `WhatsApp` como componentes SVG inline, embora `lucide-react` já esteja instalado como dependência (e ofereça `Menu`, `X`, `Github`, `Linkedin` prontos; `WhatsApp` precisaria de um SVG customizado por não fazer parte do pacote, sendo o único caso legítimo de ícone próprio).
- **Impacto**: ~70 linhas de código duplicando algo já disponível na dependência instalada; inconsistência de peso/traço visual em relação a outros ícones do sistema.
- **Prioridade**: Baixa
- **Complexidade**: Baixa
- **Dependências**: Nenhuma
- **Estimativa de esforço**: 1-2h
- **Benefício esperado**: ~60 linhas a menos, ícones consistentes com o resto do ecossistema React/shadcn.
- **Solução recomendada**: `import { Menu, X, Github, Linkedin } from "lucide-react"`; manter apenas o `WhatsApp` como SVG customizado em `src/components/icons/WhatsAppIcon.tsx`.
- **Passos para implementação**: trocar os imports, remover as definições locais, ajustar props (`className`) conforme API do lucide-react.
- **Possíveis impactos**: pode alterar sutilmente o `viewBox`/traço visual dos ícones — validar visualmente após a troca.

### FE-2 — Adicionar gerenciamento de `<head>` por rota
- **Descrição**: como o roteamento é manual (`App.tsx`), `<title>`/`<meta description>` ficam fixos em `index.html` para todas as "rotas" — `/formulario` e a página 404 mostram o mesmo título da home.
- **Impacto**: aba do navegador e SEO de `/formulario` idênticos à home; usuário não distingue as páginas pela aba.
- **Prioridade**: Baixa
- **Complexidade**: Baixa
- **Dependências**: Nenhuma
- **Estimativa de esforço**: 1-2h
- **Benefício esperado**: título/descrição corretos por página, melhor SEO/UX de navegação.
- **Solução recomendada**: usar `useEffect` simples setando `document.title` em cada página (sem necessidade de biblioteca extra dado o tamanho do projeto).
- **Passos para implementação**: adicionar `useEffect(() => { document.title = "..."; }, [])` em `Formulario.tsx` e `NotFound.tsx`.
- **Possíveis impactos**: nenhum.

### FE-3 — Padronizar botões/cards em componentes reutilizáveis
- **Descrição**: botões (`<a>`/`<button>` com classes de cor+padding+hover) e cards (`nike-depth glass-panel ...`) são redefinidos inline em cada seção de `Index.tsx` ao invés de um componente `Button`/`Card` único com variantes.
- **Impacto**: inconsistência potencial de padding/hover entre seções; qualquer ajuste de "todos os botões primários" exige busca manual.
- **Prioridade**: Baixa
- **Complexidade**: Média
- **Dependências**: Relacionado a ARQ-1/ARQ-3 (faz mais sentido depois de decidir sobre shadcn e tokens)
- **Estimativa de esforço**: 3-4h
- **Benefício esperado**: consistência visual garantida por construção, menos CSS duplicado.
- **Solução recomendada**: criar `Button` com variantes via `class-variance-authority` (já instalado) — `variant="primary" | "outline"`.
- **Passos para implementação**: mapear os padrões de botão existentes, criar o componente com `cva`, substituir os usos.
- **Possíveis impactos**: mudança ampla porém mecânica; testar visualmente cada seção após a troca.

---

## 4. Categoria: Back-end

> O projeto não possui back-end próprio — é um site estático (Vite/React) com envio de formulário via EmailJS diretamente do client. As tarefas abaixo cobrem os riscos dessa arquitetura "sem back-end", não a criação de um back-end (fora de escopo a menos que o negócio exija CRM/armazenamento próprio de leads).

### BACK-1 — Avaliar necessidade de um backend leve para captura de leads
- **Descrição**: hoje, se o EmailJS falhar (limite do plano gratuito de 200 emails/mês atingido, instabilidade do serviço, chave revogada), o lead é **perdido silenciosamente** — não há fallback nem armazenamento próprio.
- **Impacto**: risco direto ao negócio — o formulário é o único canal de conversão do site além do WhatsApp, e não há registro caso o EmailJS falhe.
- **Prioridade**: Média
- **Complexidade**: Alta (envolve decisão de produto/infra)
- **Dependências**: Nenhuma
- **Estimativa de esforço**: 1-2 dias (se decidido implementar)
- **Benefício esperado**: nenhum lead perdido; histórico de leads consultável.
- **Solução recomendada**: função serverless simples (Vercel Function) que grava o lead em um banco leve (ex.: Supabase/Postgres, Airtable, ou até uma planilha via API) **antes** de tentar o EmailJS, ou como fallback caso o EmailJS falhe.
- **Passos para implementação**: decisão de produto → escolher storage → criar endpoint `/api/lead` → `Formulario.tsx` chama o endpoint em vez de (ou além de) `emailjs.send`.
- **Possíveis impactos**: introduz a primeira peça de infraestrutura de back-end no projeto; precisa de novas variáveis de ambiente e revisão de segurança (rate limit, validação server-side).

---

## 5. Categoria: Performance

### PERF-1 — Remover assets de imagem não utilizados
- **Descrição**: `src/assets/cognull-logo.png` (1.4MB) e `src/assets/cognull1.png` (1.07MB) não são referenciados por nenhum arquivo em `src/` (confirmado via busca) — são 2.5MB de peso morto no repositório (não afetam o bundle final pois nunca são importados, mas incham o clone do repo e confundem).
- **Impacto**: repositório maior que o necessário; risco de alguém achar que a logo "oficial" está lá e usá-la por engano.
- **Prioridade**: Alta
- **Complexidade**: Baixa
- **Dependências**: Nenhuma
- **Estimativa de esforço**: 15min
- **Benefício esperado**: repositório 2.5MB mais leve.
- **Solução recomendada**: remover os dois arquivos (ou mover para uma pasta de "brand assets" fora do código-fonte, se precisarem existir para uso em outros materiais).
- **Passos para implementação**: `git rm src/assets/cognull-logo.png src/assets/cognull1.png`.
- **Possíveis impactos**: nenhum (não são importados).

### PERF-2 — Reduzir/otimizar o chunk do Three.js
- **Descrição**: o build gera `three.module-*.js` com 725KB (187KB gzip) — o próprio Vite alerta ("Some chunks are larger than 500 kB"). É carregado só em `/formulario` via `import()` dinâmico (já é uma boa prática), mas ainda é pesado para uma página de formulário de contato.
- **Impacto**: usuários em conexões lentas/mobile (justamente os que a própria guarda de performance do código já tenta poupar via `innerWidth < 1024`) esperam mais para a cena aparecer nos casos em que ela é exibida.
- **Prioridade**: Média
- **Complexidade**: Média/Alta
- **Dependências**: Nenhuma
- **Estimativa de esforço**: 4-8h (depende da abordagem escolhida)
- **Benefício esperado**: LCP/TTI menores em `/formulario`, menos dados transferidos.
- **Solução recomendada**: avaliar (a) importar apenas os submódulos do Three.js realmente usados (`WebGLRenderer`, `Scene`, `PerspectiveCamera`, `BufferGeometry`, `Points`, `Mesh`, geometrias/materiais específicos) em vez de `import * as THREE from "three"`, ou (b) substituir a cena por uma alternativa mais leve (Canvas 2D puro, ou uma lib menor de partículas) caso o efeito visual não exija WebGL 3D completo.
- **Passos para implementação**: medir quanto cada abordagem economiza com `npm run build` antes/depois; se manter Three.js, trocar para imports nomeados específicos e confirmar tree-shaking no relatório de build.
- **Possíveis impactos**: mudança na cena de fundo precisa de validação visual cuidadosa.

### PERF-3 — Otimizar imagens estáticas (`public/`)
- **Descrição**: `public/cognull.png` (82KB) e `public/favicon cognull.png` (80KB, nome de arquivo com espaço) são PNGs sem versão WebP/AVIF, sem `width`/`height` no HTML e sem `loading="lazy"`/`fetchpriority`.
- **Impacto**: peso de imagem maior que o necessário; risco de CLS (layout shift) por falta de dimensões explícitas.
- **Prioridade**: Baixa
- **Complexidade**: Baixa
- **Dependências**: Nenhuma
- **Estimativa de esforço**: 1-2h
- **Benefício esperado**: menos KB transferidos, melhora no Lighthouse/Core Web Vitals (CLS, LCP).
- **Solução recomendada**: gerar versões `.webp`, usar `<picture>` com fallback PNG, definir `width`/`height` (ou `aspect-ratio` via CSS) no `<img>` da logo; renomear `favicon cognull.png` para `favicon-cognull.png` (sem espaço, evita problemas de encoding de URL).
- **Passos para implementação**: converter imagens, atualizar `<img>` em `Index.tsx`/`Formulario.tsx`, renomear arquivo e referências.
- **Possíveis impactos**: nenhum visual se a conversão for feita com qualidade equivalente.

### PERF-4 — Substituir a fonte de ícones Material Symbols por SVG/lucide
- **Descrição**: `index.html` carrega a fonte web inteira "Material Symbols Outlined" (`wght,FILL@100..700,0..1`) só para renderizar um único ícone (▶ `play_arrow`) em `Index.tsx:230`.
- **Impacto**: uma requisição de fonte inteira (frequentemente centenas de KB) por causa de um ícone que poderia ser um SVG de poucos bytes ou vir do `lucide-react` já instalado (`Play`).
- **Prioridade**: Média
- **Complexidade**: Baixa
- **Dependências**: Relacionado a FE-1
- **Estimativa de esforço**: 30min-1h
- **Benefício esperado**: uma requisição de rede a menos, menos peso de fonte.
- **Solução recomendada**: `import { Play } from "lucide-react"` e remover as tags de link do Material Symbols de `index.html`.
- **Passos para implementação**: trocar o ícone, remover os 2 `<link>`/`<noscript>` relacionados em `index.html`, remover a classe `.material-symbols-outlined` de `index.css`.
- **Possíveis impactos**: nenhum, é um ícone isolado e decorativo.

### PERF-5 — Unificar gerenciador de pacotes (resolver lockfiles duplicados)
- **Descrição**: o repositório tem simultaneamente `bun.lockb` e `package-lock.json`.
- **Impacto**: ambiguidade sobre qual gerenciador é a fonte da verdade; se diferentes pessoas/CI usarem gerenciadores diferentes, as versões instaladas podem divergir sutilmente entre ambientes, causando bugs "funciona na minha máquina".
- **Prioridade**: Média
- **Complexidade**: Baixa
- **Dependências**: Nenhuma
- **Estimativa de esforço**: 30min
- **Benefício esperado**: builds reprodutíveis e consistentes entre dev/CI/Vercel.
- **Solução recomendada**: escolher um gerenciador oficial (npm, já que `package-lock.json` é o mais atualizado — modificado em maio, contra bun.lockb de janeiro) e remover o outro lockfile, documentando a escolha no `CLAUDE.md`.
- **Passos para implementação**: remover `bun.lockb`, adicionar nota no README/CLAUDE.md, garantir que a Vercel está configurada para usar `npm install`.
- **Possíveis impactos**: nenhum, desde que o lockfile removido não seja o que está realmente em uso pela Vercel (checar configuração de build da Vercel antes de remover).

### PERF-6 — Memoizar listas estáticas renderizadas via `.map()`
> ✅ Concluído em 2026-07-07 — resolvido como efeito colateral de ARQ-2: os arrays agora são constantes de módulo em `src/data/*.ts`, não literais recriados a cada render.
- **Descrição**: os arrays de workflow/serviços/founders em `Index.tsx` são recriados como literais a cada render (embora não mudem).
- **Impacto**: hoje irrelevante (a página não re-renderiza com frequência), mas se `isMobileMenuOpen`/modais forem acionados, o componente inteiro (incluindo esses arrays inline) é recriado a cada toggle de estado.
- **Prioridade**: Baixa
- **Complexidade**: Baixa
- **Dependências**: Resolvido naturalmente por ARQ-2 (mover para `src/data/`, que já elimina a recriação por render)
- **Estimativa de esforço**: incluído em ARQ-2, sem esforço extra
- **Benefício esperado**: micro-otimização, ganho mais arquitetural (dados como constantes de módulo) do que de performance mensurável.
- **Solução recomendada**: ao mover os arrays para `src/data/*.ts` (ARQ-2), eles já passam a ser constantes de módulo, resolvendo o problema sem necessidade de `useMemo`.
- **Passos para implementação**: ver ARQ-2.
- **Possíveis impactos**: nenhum.

---

## 6. Categoria: Segurança

### SEC-1 — Corrigir número de WhatsApp incorreto do fundador Gabriel Grande
> ✅ Concluído em 2026-07-07 — corrigido como parte da implementação de ARQ-2 (dado movido para `src/data/founders.ts`). Número correto confirmado pelo usuário: `+55 34 99811-0985` → `5534998110985`.
- **Descrição**: em `Index.tsx:529`, o número `553498110985` tem **12 dígitos**, enquanto os outros dois fundadores têm 13 dígitos (`5512997042612` e `5563984648255`). Falta um dígito — muito provavelmente o "9" característico de celulares brasileiros.
- **Impacto**: o link `https://wa.me/553498110985` pode abrir uma conversa com o número errado ou simplesmente falhar, quebrando silenciosamente o canal de contato de um dos três fundadores — funcionalidade crítica de conversão do site.
- **Prioridade**: Crítica
- **Complexidade**: Baixa
- **Dependências**: Nenhuma (fazer imediatamente, independente de qualquer outra refatoração)
- **Estimativa de esforço**: 5min (+ confirmação do número correto com o Gabriel)
- **Benefício esperado**: canal de contato do fundador funcionando corretamente.
- **Solução recomendada**: confirmar o número correto com Gabriel Grande e corrigir a string.
- **Passos para implementação**: editar `Index.tsx:529` (e replicar a correção onde mais o número aparecer, se em algum outro lugar).
- **Possíveis impactos**: nenhum além da correção do dado.

### SEC-2 — Adicionar proteção anti-spam ao formulário de lead
- **Descrição**: `Formulario.tsx` envia diretamente via EmailJS client-side, sem honeypot, sem rate limiting, sem captcha.
- **Impacto**: bots podem submeter o formulário em massa, consumindo a cota gratuita de 200 emails/mês do EmailJS rapidamente e/ou poluindo a caixa de entrada com spam.
- **Prioridade**: Alta
- **Complexidade**: Baixa/Média
- **Dependências**: Nenhuma
- **Estimativa de esforço**: 2-4h
- **Benefício esperado**: reduz drasticamente submissões automatizadas.
- **Solução recomendada**: adicionar um campo honeypot invisível (input com `display:none` que bots preenchem mas humanos não veem) rejeitando o submit se preenchido; opcionalmente, adicionar Cloudflare Turnstile/hCaptcha (gratuitos) para proteção mais forte.
- **Passos para implementação**: adicionar campo honeypot ao `FormData`/JSX; validar no `handleSubmit` antes de chamar `emailjs.send`; considerar Turnstile como segunda camada.
- **Possíveis impactos**: nenhum para usuários reais; pequena mudança de UX se captcha visível for escolhido.

### SEC-3 — Restringir a Public Key do EmailJS por domínio
- **Descrição**: `VITE_EMAILJS_PUBLIC_KEY` fica embutida no bundle JS público (esperado pelo modelo client-side do EmailJS), então qualquer pessoa pode extraí-la do código-fonte da página e reutilizá-la fora do site.
- **Impacto**: uso indevido da cota de envio de e-mails por terceiros que copiarem a chave.
- **Prioridade**: Alta
- **Complexidade**: Baixa (configuração, não código)
- **Dependências**: Nenhuma
- **Estimativa de esforço**: 15min
- **Benefício esperado**: a chave só funciona a partir do domínio `cognull.com.br` (ou onde for configurado), inutilizando cópias externas.
- **Solução recomendada**: no painel do EmailJS, em **Account > Security**, habilitar a allowlist de domínios autorizados a usar a Public Key.
- **Passos para implementação**: acessar painel EmailJS, adicionar domínio de produção (e `localhost` para dev, se necessário).
- **Possíveis impactos**: nenhum, é uma configuração puramente no painel do provedor.

### SEC-4 — Corrigir vulnerabilidades reportadas pelo `npm audit`
- **Descrição**: `npm audit` reporta 7 vulnerabilidades (4 *high*: `glob`, `lodash`, `minimatch`, `picomatch`; 3 *moderate*: `brace-expansion`, `postcss`, `yaml`), todas em dependências transitivas de devDependencies (toolchain de build/lint), não no bundle de produção.
- **Impacto**: risco baixo em produção (o código vulnerável não roda no navegador do usuário final), mas afeta a cadeia de build/CI e é uma prática de higiene básica de segurança.
- **Prioridade**: Média
- **Complexidade**: Baixa
- **Dependências**: Nenhuma
- **Estimativa de esforço**: 30min-1h
- **Benefício esperado**: pipeline de build livre de dependências com CVEs conhecidas.
- **Solução recomendada**: rodar `npm audit fix`; para o que não for corrigido automaticamente, avaliar `npm audit fix --force` com cautela (testando o build depois) ou atualizar manualmente o pacote pai que traz a dependência vulnerável.
- **Passos para implementação**: `npm audit fix`, rodar `npm run build`/`npm run lint` para confirmar que nada quebrou, commitar o `package-lock.json` atualizado.
- **Possíveis impactos**: pequeno risco de mudanças de versão em ferramentas de dev (eslint plugins, etc.) exigirem ajuste de configuração.

### SEC-5 — Sanitizar/normalizar dados do formulário antes do envio
- **Descrição**: os campos de texto livre (`companyDescription`, `pains`, `innovationAreas`) vão direto para o template do EmailJS sem nenhum tratamento (trim, escape de HTML) além do `maxLength` nativo do `<textarea>`.
- **Impacto**: se o template do EmailJS renderizar os campos como HTML (comum em templates "bonitos"), um usuário mal-intencionado poderia injetar HTML/markup no e-mail recebido pela equipe (baixo risco prático, já que o e-mail é lido por humanos internos, mas ainda uma boa prática de sanitização de entrada).
- **Prioridade**: Baixa
- **Complexidade**: Baixa
- **Dependências**: Nenhuma
- **Estimativa de esforço**: 1h
- **Benefício esperado**: e-mails recebidos sempre como texto plano e seguro, independente de como o template do EmailJS for configurado.
- **Solução recomendada**: aplicar `.trim()` em todos os campos antes de enviar; garantir que o template do EmailJS use variáveis em contexto de texto puro, não `{{{triplo-mustache}}}`/HTML não escapado.
- **Passos para implementação**: revisar o template no painel do EmailJS; adicionar normalização no `leadService.ts` (ver COD-5).
- **Possíveis impactos**: nenhum.

---

## 7. Categoria: Banco de Dados

> Não há banco de dados no projeto atualmente (site estático + serviço de e-mail terceirizado). Nenhuma tarefa aplicável nesta categoria a menos que **BACK-1** (backend leve para leads) seja aprovado — nesse caso, a modelagem da tabela `leads` (colunas, índice em `created_at`/`email`, constraint de not-null nos campos obrigatórios) deve ser planejada como parte daquela iniciativa.

---

## 8. Categoria: UX/UI

### UX-1 — Tornar os modais acessíveis (WCAG)
- **Descrição**: os 3 modais de `Index.tsx` (contato, privacidade, termos) não têm `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, não prendem o foco (focus trap), não fecham com tecla `Esc` e não devolvem o foco ao elemento que os abriu ao fechar.
- **Impacto**: usuários de teclado/leitor de tela ficam sem indicação de que um modal foi aberto, podem "vazar" o foco para elementos atrás do overlay, e não têm atalho padrão (`Esc`) para fechar — falha direta de WCAG 2.1 (critérios 2.1.2 "No Keyboard Trap" e 4.1.2 "Name, Role, Value").
- **Prioridade**: Alta
- **Complexidade**: Média
- **Dependências**: Idealmente junto com ARQ-5 (componente Modal único)
- **Estimativa de esforço**: 3-4h
- **Benefício esperado**: conformidade WCAG, melhor experiência para usuários de teclado/leitores de tela.
- **Solução recomendada**: implementar dentro do componente `Modal` de ARQ-5: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` apontando para o `<h2>` do título, listener de `keydown` para `Escape`, e foco automático no primeiro elemento focável ao abrir (com retorno ao trigger ao fechar). Alternativa mais rápida: adotar o `Dialog` do Radix/shadcn já instalado, que resolve tudo isso de fábrica.
- **Passos para implementação**: ver ARQ-5, adicionar a lógica de foco/teclado dentro do componente compartilhado.
- **Possíveis impactos**: nenhuma mudança visual; mudança de comportamento (Esc fecha, foco é gerenciado) precisa ser testada manualmente com teclado.

### UX-2 — Adicionar `aria-expanded` ao botão de menu mobile
- **Descrição**: o botão de menu em `Index.tsx:153-164` alterna `isMobileMenuOpen` mas não expõe `aria-expanded`/`aria-controls` para leitores de tela.
- **Impacto**: leitores de tela não anunciam se o menu está aberto ou fechado.
- **Prioridade**: Média
- **Complexidade**: Baixa
- **Dependências**: Nenhuma
- **Estimativa de esforço**: 15min
- **Benefício esperado**: navegação por leitor de tela mais previsível.
- **Solução recomendada**: adicionar `aria-expanded={isMobileMenuOpen}` e `aria-controls="mobile-menu"` no botão, e `id="mobile-menu"` no container do menu.
- **Passos para implementação**: editar os atributos do botão e do `<div>` do menu mobile.
- **Possíveis impactos**: nenhum.

### UX-3 — Adicionar skip link para navegação por teclado
- **Descrição**: não existe um link "Pular para o conteúdo" no topo da página — usuários de teclado precisam tabular por toda a navegação para chegar ao conteúdo principal.
- **Impacto**: fricção desnecessária para usuários que navegam via teclado.
- **Prioridade**: Baixa
- **Complexidade**: Baixa
- **Dependências**: Nenhuma
- **Estimativa de esforço**: 30min
- **Benefício esperado**: acessibilidade de navegação melhorada, boa prática básica de WCAG (critério 2.4.1).
- **Solução recomendada**: adicionar `<a href="#main-content" className="sr-only focus:not-sr-only ...">Pular para o conteúdo</a>` como primeiro elemento do `<body>`/`<main>`.
- **Passos para implementação**: adicionar o link em `Index.tsx`, dar `id="main-content"` à tag `<main>`.
- **Possíveis impactos**: nenhum visual (fica invisível até receber foco).

### UX-4 — Definir dimensões explícitas para imagens (evitar CLS)
- **Descrição**: as tags `<img>` da logo (`Index.tsx:113`, `Formulario.tsx:406`) não têm `width`/`height` (nem `aspect-ratio` via CSS), dependendo só de classes de altura (`h-12`, `h-14`).
- **Impacto**: risco de Cumulative Layout Shift (CLS) durante o carregamento da imagem, penalizando a métrica de Core Web Vitals.
- **Prioridade**: Baixa
- **Complexidade**: Baixa
- **Dependências**: Relacionado a PERF-3
- **Estimativa de esforço**: 20min
- **Benefício esperado**: CLS reduzido, melhor pontuação no Lighthouse.
- **Solução recomendada**: adicionar `width`/`height` intrínsecos (proporcionais ao arquivo real) além das classes Tailwind de altura responsiva.
- **Passos para implementação**: descobrir as dimensões reais do PNG, adicionar os atributos.
- **Possíveis impactos**: nenhum.

### UX-5 — Adicionar `ErrorBoundary` para os componentes lazy-loaded
- **Descrição**: `App.tsx` usa `React.lazy`/`Suspense fallback={null}` para `Formulario`/`NotFound`, mas não há nenhum `ErrorBoundary` — se o carregamento do chunk falhar (ex.: usuário com a aba aberta durante um novo deploy, mudando os hashes dos arquivos), o React lança um erro não capturado e a tela fica em branco.
- **Impacto**: falha total e silenciosa da navegação para `/formulario` em um cenário realista (deploy durante uso).
- **Prioridade**: Média
- **Complexidade**: Baixa
- **Dependências**: Nenhuma
- **Estimativa de esforço**: 1-2h
- **Benefício esperado**: usuário vê uma mensagem amigável ("Não foi possível carregar a página, recarregue") em vez de tela branca.
- **Solução recomendada**: criar `src/components/ErrorBoundary.tsx` (class component, único caso onde class component ainda é necessário no React atual) envolvendo o `<Suspense>` em `App.tsx`.
- **Passos para implementação**: implementar o `ErrorBoundary` com `componentDidCatch`, envolver as rotas lazy em `App.tsx`.
- **Possíveis impactos**: nenhum em uso normal; só age em caso de falha de carregamento.

### UX-6 — Adicionar fallback de loading visível no `Suspense`
- **Descrição**: `App.tsx` usa `<Suspense fallback={null}>` — durante o carregamento do chunk de `/formulario` ou da 404, a tela fica em branco (sem spinner/skeleton) por um instante.
- **Impacto**: em conexões lentas, o usuário pode achar que o clique não funcionou.
- **Prioridade**: Baixa
- **Complexidade**: Baixa
- **Dependências**: Nenhuma
- **Estimativa de esforço**: 30min
- **Benefício esperado**: percepção de responsividade melhor em conexões lentas.
- **Solução recomendada**: substituir `fallback={null}` por um spinner/skeleton simples consistente com a identidade visual (verde `#3DFF2A` sobre fundo teal).
- **Passos para implementação**: criar `src/components/PageLoader.tsx`, usar como `fallback`.
- **Possíveis impactos**: nenhum.

---

## 9. Categoria: SEO

### SEO-1 — Corrigir `og:image`/`twitter:image` (formato inadequado)
- **Descrição**: `index.html:23,27` aponta `og:image` e `twitter:image` para `/favicon.ico` — a maioria dos crawlers de redes sociais (Facebook, LinkedIn, X/Twitter, WhatsApp) não renderiza `.ico` corretamente; o formato esperado é PNG/JPG, idealmente 1200×630px.
- **Impacto**: ao compartilhar o link do site no WhatsApp/LinkedIn/X, o preview provavelmente aparece sem imagem ou quebrado — prejudica diretamente a conversão de compartilhamentos, que é justamente um canal relevante para uma empresa que usa WhatsApp como canal de contato principal.
- **Prioridade**: Alta
- **Complexidade**: Baixa
- **Dependências**: Nenhuma
- **Estimativa de esforço**: 1-2h (inclui desenhar a imagem 1200×630)
- **Benefício esperado**: previews corretos ao compartilhar o link nas redes/WhatsApp, mais cliques a partir de compartilhamentos.
- **Solução recomendada**: criar uma imagem `og-image.png` (1200×630) com a marca Cognull, colocar em `public/`, e apontar `og:image`/`twitter:image` para a URL absoluta (`https://www.cognull.com.br/og-image.png` — crawlers de redes sociais geralmente exigem URL absoluta, não relativa).
- **Passos para implementação**: gerar a imagem, adicionar em `public/`, atualizar as meta tags em `index.html` para URL absoluta.
- **Possíveis impactos**: nenhum, é aditivo.

### SEO-2 — Corrigir e automatizar o `sitemap.xml`
- **Descrição**: `public/sitemap.xml` foi gerado uma única vez por uma ferramenta externa (comentário no próprio arquivo: "created with Free Online Sitemap Generator") e lista somente `/` — a rota `/formulario` não está incluída, e o arquivo nunca é regenerado automaticamente.
- **Impacto**: motores de busca podem não descobrir/indexar `/formulario` com a mesma prioridade; sitemap desatualizado tende a ficar cada vez mais errado conforme o site cresce.
- **Prioridade**: Média
- **Complexidade**: Baixa
- **Dependências**: Nenhuma
- **Estimativa de esforço**: 1h
- **Benefício esperado**: indexação mais completa e correta pelo Google/Bing.
- **Solução recomendada**: adicionar `/formulario` manualmente por ora; se o site ganhar mais páginas, considerar gerar o sitemap automaticamente no build (script Node simples que lista as rotas conhecidas de `App.tsx`).
- **Passos para implementação**: editar `public/sitemap.xml` incluindo a URL de `/formulario`; adicionar linha `Sitemap: https://www.cognull.com.br/sitemap.xml` em `public/robots.txt` (hoje ausente).
- **Possíveis impactos**: nenhum.

### SEO-3 — Adicionar dados estruturados (JSON-LD)
- **Descrição**: não há nenhum `<script type="application/ld+json">` com schema.org (`Organization`), o que impede rich snippets no Google (logo, redes sociais, etc. no resultado de busca).
- **Impacto**: oportunidade perdida de melhorar a apresentação do site nos resultados de busca.
- **Prioridade**: Baixa
- **Complexidade**: Baixa
- **Dependências**: Nenhuma
- **Estimativa de esforço**: 1h
- **Benefício esperado**: possibilidade de rich snippet (logo, nome, links sociais) no Google.
- **Solução recomendada**: adicionar um bloco JSON-LD `Organization` com `name`, `url`, `logo`, `sameAs` (LinkedIn) em `index.html`.
- **Passos para implementação**: escrever o JSON-LD, inserir no `<head>`.
- **Possíveis impactos**: nenhum.

### SEO-4 — Adicionar `<link rel="canonical">`
- **Descrição**: não há tag canonical em `index.html`.
- **Impacto**: risco de conteúdo duplicado sendo indexado via variações de URL (com/sem `www`, com/sem trailing slash).
- **Prioridade**: Baixa
- **Complexidade**: Baixa
- **Dependências**: Nenhuma
- **Estimativa de esforço**: 15min
- **Benefício esperado**: SEO técnico mais robusto.
- **Solução recomendada**: `<link rel="canonical" href="https://www.cognull.com.br/" />`.
- **Passos para implementação**: adicionar a tag no `<head>`.
- **Possíveis impactos**: nenhum.

### SEO-5 — Adicionar `manifest.json`, `apple-touch-icon` e `theme-color`
- **Descrição**: faltam `apple-touch-icon` (ícone ao adicionar à tela inicial no iOS), `manifest.json` (metadados PWA básicos) e `<meta name="theme-color">` (cor da barra de status no mobile).
- **Impacto**: experiência inferior ao salvar o site na tela inicial de um celular; oportunidade perdida de reforçar a marca na UI do sistema operacional.
- **Prioridade**: Baixa
- **Complexidade**: Baixa
- **Dependências**: Nenhuma
- **Estimativa de esforço**: 1h
- **Benefício esperado**: melhor integração com SO mobile, mais profissional.
- **Solução recomendada**: gerar os tamanhos de ícone necessários, criar `manifest.json` mínimo, adicionar as tags correspondentes em `index.html`.
- **Passos para implementação**: gerar assets, criar `public/manifest.json`, referenciar em `index.html`.
- **Possíveis impactos**: nenhum.

---

## 10. Categoria: Testes

### TEST-1 — Configurar Vitest + Testing Library
- **Descrição**: o projeto não tem nenhum framework de teste configurado (nem unitário, nem integração, nem E2E) — 0% de cobertura.
- **Impacto**: qualquer refatoração (especialmente as das Fases 2 e 6 deste roadmap) não tem rede de segurança automatizada; regressões só são pegas manualmente.
- **Prioridade**: Alta
- **Complexidade**: Baixa
- **Dependências**: Nenhuma — deve vir **antes** das refatorações maiores (ARQ-5, COD-4, FE-3)
- **Estimativa de esforço**: 2-3h (setup inicial)
- **Benefício esperado**: infraestrutura de testes pronta para todo o resto do roadmap se apoiar.
- **Solução recomendada**: adicionar `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom` como devDependencies (stack natural para um projeto Vite); script `"test": "vitest"` no `package.json`.
- **Passos para implementação**: instalar dependências, criar `vitest.config.ts` (ou estender `vite.config.ts`), criar um teste trivial de exemplo para validar o setup.
- **Possíveis impactos**: nenhum no código de produção.

### TEST-2 — Teste do fluxo crítico: envio do formulário de lead
- **Descrição**: não existe nenhum teste cobrindo o único ponto de conversão do site (`Formulario.tsx` → `emailjs.send`).
- **Impacto**: uma regressão nesse fluxo (ex.: durante COD-5) só seria descoberta em produção, com leads reais sendo perdidos.
- **Prioridade**: Alta
- **Complexidade**: Média
- **Dependências**: TEST-1, idealmente após COD-5 (serviço isolado é mais fácil de testar/mockar)
- **Estimativa de esforço**: 3-4h
- **Benefício esperado**: garante que validação de campos obrigatórios, mensagens de erro/sucesso e chamada ao EmailJS continuem funcionando após qualquer mudança futura.
- **Solução recomendada**: mockar `@emailjs/browser`, testar: submit com campos vazios (deve bloquear via `required`), submit válido (deve chamar `emailjs.send` com o payload esperado), erro simulado do EmailJS (deve mostrar mensagem de erro), sucesso (deve limpar o formulário).
- **Passos para implementação**: escrever `Formulario.test.tsx` usando Testing Library, mock de `emailjs`.
- **Possíveis impactos**: nenhum no código de produção.

### TEST-3 — Adicionar `eslint-plugin-jsx-a11y`
- **Descrição**: `eslint.config.js` não tem nenhum plugin de acessibilidade — problemas como os de UX-1/UX-2 poderiam ter sido pegos automaticamente pelo lint.
- **Impacto**: regressões de acessibilidade não são detectadas antes do merge.
- **Prioridade**: Média
- **Complexidade**: Baixa
- **Dependências**: Nenhuma
- **Estimativa de esforço**: 1h
- **Benefício esperado**: lint passa a acusar automaticamente `<img>` sem `alt`, botões sem label acessível, etc.
- **Solução recomendada**: instalar `eslint-plugin-jsx-a11y`, adicionar ao `eslint.config.js` com o preset `recommended`.
- **Passos para implementação**: instalar, configurar, rodar `npm run lint` e corrigir achados.
- **Possíveis impactos**: pode revelar mais problemas de acessibilidade além dos já mapeados nesta auditoria.

### TEST-4 — Teste E2E básico de navegação entre rotas
- **Descrição**: não há verificação automatizada de que `/`, `/formulario` e uma rota inexistente (404) renderizam o componente correto.
- **Impacto**: como o roteamento é manual (string matching em `window.location.pathname`), um erro de digitação em uma condicional (ex.: em `App.tsx`) só seria percebido manualmente.
- **Prioridade**: Baixa
- **Complexidade**: Média
- **Dependências**: TEST-1
- **Estimativa de esforço**: 2-3h
- **Benefício esperado**: garante que as 3 rotas continuam resolvendo para o componente certo após mudanças em `App.tsx`.
- **Solução recomendada**: teste de integração simples com Testing Library simulando `window.location.pathname` e verificando o componente renderizado (não é necessário Playwright/Cypress completo para um caso tão simples, mas é uma opção se o projeto crescer).
- **Passos para implementação**: escrever `App.test.tsx` cobrindo os 3 casos de rota.
- **Possíveis impactos**: nenhum.

---

## 11. Categoria: DevOps

### DEVOPS-1 — Criar pipeline de CI (lint + typecheck + build)
- **Descrição**: não existe `.github/workflows` nem qualquer outro pipeline de CI — nada roda automaticamente antes do deploy (a Vercel só faz o build no deploy, não bloqueia por lint/erro de tipo se o build "passar" tecnicamente).
- **Impacto**: PRs podem ser mergeados com erros de lint, tipos quebrados (dado que `strict` está desligado, menos ainda seria pego) ou testes falhando (uma vez que existam).
- **Prioridade**: Alta
- **Complexidade**: Baixa
- **Dependências**: Idealmente após TEST-1 (para incluir os testes no pipeline)
- **Estimativa de esforço**: 2h
- **Benefício esperado**: qualidade mínima garantida antes de qualquer merge/deploy.
- **Solução recomendada**: workflow do GitHub Actions rodando `npm ci`, `npm run lint`, `npx tsc --noEmit`, `npm run build` (e `npm test` quando existir) em cada PR.
- **Passos para implementação**: criar `.github/workflows/ci.yml` com os steps acima.
- **Possíveis impactos**: nenhum no código; pode revelar erros de lint/tipo já existentes que precisarão ser corrigidos para o CI ficar verde.

### DEVOPS-2 — Adicionar script de `typecheck` isolado
- **Descrição**: `package.json` não tem um script dedicado para checagem de tipos (`tsc --noEmit`) — só `lint` (ESLint) e `build` (que roda `vite build`, cujo type-checking é limitado/mais lento de interpretar).
- **Impacto**: sem um comando rápido e explícito, checagem de tipos fica implícita/menos visível no dia a dia e no CI.
- **Prioridade**: Baixa
- **Complexidade**: Baixa
- **Dependências**: Nenhuma
- **Estimativa de esforço**: 15min
- **Benefício esperado**: comando único e rápido para validar tipos, usável local e no CI (DEVOPS-1).
- **Solução recomendada**: adicionar `"typecheck": "tsc -b --noEmit"` ao `package.json`.
- **Passos para implementação**: editar `package.json`, testar o comando.
- **Possíveis impactos**: nenhum.

### DEVOPS-3 — Criar `.env.example`
- **Descrição**: as variáveis exigidas (`VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`) só estão documentadas em prosa no `EMAILJS_SETUP.md`, sem um arquivo `.env.example` para copiar.
- **Impacto**: onboarding de um novo desenvolvedor exige ler o markdown e digitar os nomes das variáveis manualmente, com risco de erro de digitação.
- **Prioridade**: Baixa
- **Complexidade**: Baixa
- **Dependências**: Nenhuma
- **Estimativa de esforço**: 10min
- **Benefício esperado**: `cp .env.example .env.local` como fluxo padrão de onboarding.
- **Solução recomendada**: criar `.env.example` com as 3 chaves e valores vazios/placeholder, referenciado no `EMAILJS_SETUP.md`.
- **Passos para implementação**: criar o arquivo, garantir que não seja ignorado pelo `.gitignore` (diferente de `.env.local`).
- **Possíveis impactos**: nenhum.

### DEVOPS-4 — Resolver ambiguidade de gerenciador de pacotes no deploy
- **Descrição**: mesmo problema de PERF-5 visto pela ótica de DevOps — a Vercel precisa saber com certeza se deve usar `npm`/`bun` para instalar dependências de forma consistente com o lockfile mantido.
- **Impacto**: builds na Vercel podem instalar versões ligeiramente diferentes das usadas localmente se o gerenciador detectado automaticamente não bater com o lockfile "correto".
- **Prioridade**: Média
- **Complexidade**: Baixa
- **Dependências**: PERF-5 (mesma correção resolve ambos)
- **Estimativa de esforço**: incluído em PERF-5
- **Benefício esperado**: builds determinísticos entre local/CI/Vercel.
- **Solução recomendada**: ver PERF-5; conferir explicitamente o "Install Command" configurado no dashboard da Vercel após a decisão.
- **Passos para implementação**: ver PERF-5.
- **Possíveis impactos**: nenhum.

---

## 12. Categoria: Documentação

### DOC-1 — Atualizar `README.md`
- **Descrição**: o README cita `react-router-dom` e `TanStack Query` como tecnologias usadas (não são dependências reais do projeto), indica porta `5173` (a real é `8080`, definida em `vite.config.ts`), e a árvore de arquivos não lista `Formulario.tsx` nem `EMAILJS_SETUP.md`.
- **Impacto**: primeira impressão incorreta do projeto para qualquer novo colaborador; informação de setup (porta) literalmente errada.
- **Prioridade**: Média
- **Complexidade**: Baixa
- **Dependências**: Nenhuma
- **Estimativa de esforço**: 1h
- **Benefício esperado**: documentação de onboarding confiável.
- **Solução recomendada**: reescrever as seções "Tecnologias", "Como rodar o projeto" e "Estrutura atual do projeto" refletindo o estado real (já mapeado em `CLAUDE.md`).
- **Passos para implementação**: editar `README.md` seção por seção.
- **Possíveis impactos**: nenhum.

### DOC-2 — Comentar os "números mágicos" da cena Three.js
- **Descrição**: `Formulario.tsx` tem constantes como `widthSegments = 72`, `dist * 0.74`, `time * 0.00074`, fórmulas de `ratio`/`hole`/`depth` sem nenhuma explicação do porquê desses valores.
- **Impacto**: qualquer pessoa (incluindo o próprio autor, no futuro) que precise ajustar a animação vai precisar decifrar por tentativa e erro.
- **Prioridade**: Baixa
- **Complexidade**: Baixa
- **Dependências**: Idealmente junto com COD-4 (extração para hook)
- **Estimativa de esforço**: 1h
- **Benefício esperado**: manutenção futura da animação muito mais rápida.
- **Solução recomendada**: um comentário curto por bloco explicando a intenção visual (ex.: "ratio decai da borda pro centro, gera o efeito de 'buraco' pulsante controlado por ease.hole/ease.depth").
- **Passos para implementação**: adicionar os comentários ao extrair para `useThreeBackground.ts` (COD-4).
- **Possíveis impactos**: nenhum.

### DOC-3 — Adicionar `CONTRIBUTING.md` com guia de "como adicionar uma rota"
- **Descrição**: como o roteamento é manual (documentado em `CLAUDE.md`), não existe um guia rápido de "como adicionar uma nova página" para quem não conhece a decisão de arquitetura.
- **Impacto**: risco de alguém tentar instalar `react-router-dom` por hábito, contrariando a decisão de arquitetura já tomada.
- **Prioridade**: Baixa
- **Complexidade**: Baixa
- **Dependências**: Nenhuma
- **Estimativa de esforço**: 30min
- **Benefício esperado**: onboarding mais rápido, decisões de arquitetura reforçadas.
- **Solução recomendada**: `CONTRIBUTING.md` curto com um passo a passo de "nova rota" e link para `CLAUDE.md`.
- **Passos para implementação**: escrever o arquivo.
- **Possíveis impactos**: nenhum.

---

## Roadmap por Fases

> Ordem pensada para minimizar retrabalho: correções que não podem esperar primeiro, depois fundações (testes/CI) antes de qualquer refatoração grande, depois arquitetura → performance → segurança → UX → refino de código → polimento final.

### 🔥 Fase 1 — Correções críticas
- ✅ **SEC-1** — Corrigir número de WhatsApp do Gabriel Grande (Crítica)
- ⏳ **SEO-1** — Corrigir `og:image`/`twitter:image` (Alta)
- ⏳ **PERF-1** — Remover imagens não utilizadas de `src/assets/` (Alta)
- ⏳ **SEC-3** — Restringir Public Key do EmailJS por domínio (Alta)
- ⏳ **SEC-4** — Corrigir vulnerabilidades do `npm audit` (Média)
- ⏳ **DEVOPS-3** — Criar `.env.example` (Baixa)

### 🏗️ Fase 2 — Melhorias de arquitetura
- ⏳ **TEST-1** — Configurar Vitest + Testing Library *(fundação antes de refatorar)*
- ✅ **ARQ-1** — Remover/decidir sobre shadcn/ui e dependências não usadas
- ✅ **ARQ-2** — Extrair dados hardcoded para `src/data/`
- ⏳ **ARQ-4** — Resolver dark mode fantasma
- ⏳ **ARQ-5** — Criar componente `Modal` reutilizável
- ⏳ **PERF-5** — Unificar gerenciador de pacotes (lockfiles)
- ⏳ **DEVOPS-1** — Pipeline de CI (lint + typecheck + build)
- ⏳ **DEVOPS-2** — Script de `typecheck`

### ⚡ Fase 3 — Performance
- ⏳ **PERF-2** — Reduzir/otimizar chunk do Three.js
- ⏳ **PERF-3** — Otimizar imagens estáticas (`public/`)
- ⏳ **PERF-4** — Substituir Material Symbols por ícone SVG/lucide
- ✅ **PERF-6** — Memoização de listas estáticas (resolvido via ARQ-2)

### 🔐 Fase 4 — Segurança
- ⏳ **SEC-2** — Proteção anti-spam no formulário (honeypot/captcha)
- ⏳ **SEC-5** — Sanitizar dados do formulário antes do envio
- ⏳ **BACK-1** — Avaliar backend leve para não perder leads

### 🎨 Fase 5 — UX/UI
- ⏳ **UX-1** — Acessibilidade dos modais (WCAG)
- ⏳ **UX-2** — `aria-expanded` no menu mobile
- ⏳ **UX-3** — Skip link
- ⏳ **UX-4** — Dimensões explícitas de imagens (CLS)
- ⏳ **UX-5** — `ErrorBoundary` nas rotas lazy
- ⏳ **UX-6** — Fallback de loading visível
- ⏳ **FE-2** — `<title>` por rota

### 🔧 Fase 6 — Refatoração
- ⏳ **COD-1** — Ativar `strict` mode do TypeScript
- ⏳ **COD-2** — Reativar `no-unused-vars`
- ⏳ **COD-3** — Componente de campo de formulário (elimina repetição de classes)
- ⏳ **COD-4** — Extrair cena Three.js para hook próprio
- ⏳ **COD-5** — Isolar envio de lead em `leadService.ts`
- ⏳ **FE-1** — Ícones via `lucide-react`
- ⏳ **FE-3** — Componentizar botões/cards (`cva`)
- ✅ **ARQ-3** — Unificar sistema de design tokens
- ⏳ **TEST-2** — Teste do fluxo de envio do formulário
- ⏳ **TEST-3** — `eslint-plugin-jsx-a11y`

### ✨ Fase 7 — Otimizações finais
- ⏳ **SEO-2** — Corrigir/automatizar `sitemap.xml` + `robots.txt`
- ⏳ **SEO-3** — Dados estruturados JSON-LD
- ⏳ **SEO-4** — `<link rel="canonical">`
- ⏳ **SEO-5** — `manifest.json` + `apple-touch-icon` + `theme-color`
- ⏳ **TEST-4** — Teste E2E de navegação entre rotas
- ⏳ **DOC-1** — Atualizar `README.md`
- ⏳ **DOC-2** — Comentar números mágicos da cena 3D
- ⏳ **DOC-3** — `CONTRIBUTING.md`

---

## Como usar este arquivo

1. Antes de iniciar uma tarefa, mude seu status para 🔄 **Em andamento**.
2. Ao concluir, mude para ✅ **Concluído** e, se relevante, adicione uma linha `> Concluído em AAAA-MM-DD` abaixo do título da tarefa.
3. Se uma tarefa for descartada por decisão de produto, marque como `❌ Descartado` e registre o motivo — não apague a entrada, para preservar o histórico de decisões.
4. Reavalie as fases periodicamente: novas tarefas descobertas durante a implementação devem ser adicionadas à categoria correspondente e encaixadas na fase mais adequada.
