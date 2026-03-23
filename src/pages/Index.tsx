import { useState } from "react";
import { Github, Linkedin } from "lucide-react";

const whatsappContacts = [
  {
    nome: "Nicolas",
    area: "Arquitetura & Soluções",
    numero: "5563984648255",
  },
  {
    nome: "Lucca",
    area: "Experiência Digital",
    numero: "5563981066558",
  },
  {
    nome: "Caua",
    area: "Sistemas Inteligentes",
    numero: "5512997042612",
  },
  {
    nome: "Gabriel Grande",
    area: "Banco de Dados e Infraestrutura",
    numero: "553498110985",
  },
];

const createWhatsAppLink = (numero: string, nome: string) => {
  const mensagem = encodeURIComponent(
    `Ola, ${nome}! Vim pelo site da Cognull e quero iniciar uma consultoria.`,
  );
  return `https://wa.me/${numero}?text=${mensagem}`;
};

const Index = () => {
  const [isConsultoriaOpen, setIsConsultoriaOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-on-surface font-body selection:bg-primary/30 selection:text-primary">
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-surface/70 shadow-[0_4px_20px_rgba(58,110,165,0.16)] backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 font-headline tracking-tight antialiased md:px-8">
          <div className="flex items-center gap-3">
            <img
              alt="Logo Cognull"
              className="h-10 w-10 object-contain"
              src="/favicon.ico"
            />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-2xl font-bold tracking-tighter text-transparent">
              COGNULL
            </span>
          </div>

          <div className="hidden items-center gap-8 md:flex">
            <a
              className="border-b-2 border-secondary pb-1 text-secondary shadow-[0_10px_15px_-3px_rgba(58,110,165,0.35)] transition-all duration-300 hover:text-on-surface"
              href="#solucoes"
            >
              Soluções
            </a>
            <a
              className="font-medium text-zinc-400 transition-all duration-300 hover:text-white"
              href="#arquitetura"
            >
              Arquitetura
            </a>
            <a
              className="font-medium text-zinc-400 transition-all duration-300 hover:text-white"
              href="#plataforma"
            >
              Plataforma
            </a>
            <a
              className="font-medium text-zinc-400 transition-all duration-300 hover:text-white"
              href="#equipe"
            >
              Equipe
            </a>
            <a
              className="font-medium text-zinc-400 transition-all duration-300 hover:text-white"
              href="#documentacao"
            >
              Documentação
            </a>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <button
              className="material-symbols-outlined scale-95 text-on-surface-variant transition-all hover:text-on-surface active:scale-90"
              type="button"
            >
              grid_view
            </button>
            <button
              className="rounded-lg bg-primary-container px-5 py-2 font-bold text-on-primary-container transition-all hover:shadow-[0_0_20px_rgba(58,110,165,0.4)] active:scale-90 md:px-6"
              onClick={() => setIsConsultoriaOpen(true)}
              type="button"
            >
              Começar
            </button>
          </div>
        </nav>
      </header>

      <main>
        <section
          className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20"
          id="solucoes"
        >
          <div className="technical-grid pointer-events-none absolute inset-0"></div>
          <div className="hero-glow pointer-events-none absolute inset-0"></div>
          <div className="absolute -left-20 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-[120px]"></div>
          <div className="absolute -right-20 bottom-1/4 h-96 w-96 rounded-full bg-secondary/10 blur-[120px]"></div>

          <div className="relative z-10 mx-auto max-w-5xl px-6 text-center md:px-8">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-outline-variant/30 bg-surface-container-high px-3 py-1">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary-fixed-dim opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary"></span>
              </span>
              <span className="text-[0.6875rem] font-bold uppercase tracking-widest text-secondary">
                Status do Sistema: Ótimo
              </span>
            </div>

            <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tighter md:text-7xl">
              Arquitetando Inteligência{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Digital
              </span>{" "}
              em Escala
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-on-surface-variant md:text-xl">
              Entregamos resultados previsíveis por meio de integração robusta
              de sistemas, automação de alta fidelidade e arquiteturas
              cloud-native escaláveis.
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button
                className="rounded-lg bg-gradient-to-r from-primary-container to-secondary-container px-8 py-4 font-bold text-on-primary-container shadow-[0_0_25px_rgba(58,110,165,0.35)] transition-all hover:scale-105 active:scale-95"
                onClick={() => setIsConsultoriaOpen(true)}
                type="button"
              >
                Iniciar Projeto
              </button>
              <button
                className="rounded-lg border border-outline-variant/30 bg-surface-variant/40 px-8 py-4 font-semibold text-on-surface backdrop-blur-md transition-all hover:bg-surface-variant/60"
                type="button"
              >
                Ver Documentação
              </button>
            </div>
          </div>
        </section>

        <section className="bg-surface-container-low py-24" id="arquitetura">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="mb-20 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
              <div className="max-w-xl">
                <h2 className="mb-4 text-3xl font-semibold tracking-tight md:text-4xl">
                  Fundações de Engenharia
                </h2>
                <p className="text-on-surface-variant">
                  Vamos além de padrões genéricos para construir ecossistemas
                  técnicos que priorizam performance, segurança e
                  manutenibilidade no longo prazo.
                </p>
              </div>
              <div className="text-sm font-bold uppercase tracking-widest text-primary">
                Matriz de Capacidades
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: "account_tree",
                  color: "text-primary",
                  title: "Arquitetura Escalavel",
                  description:
                    "Sistemas modulares e desacoplados, projetados para lidar com crescimento exponencial de dados sem degradacao de performance.",
                },
                {
                  icon: "hub",
                  color: "text-secondary",
                  title: "Integracao de Sistemas",
                  description:
                    "Conectamos ambientes legados distintos com infraestruturas modernas orientadas a API de forma fluida.",
                },
                {
                  icon: "bolt",
                  color: "text-primary",
                  title: "Automacao Inteligente",
                  description:
                    "Fluxos autonomos movidos por logica preditiva para eliminar gargalos operacionais.",
                },
                {
                  icon: "layers",
                  color: "text-secondary",
                  title: "Desenvolvimento Full-stack",
                  description:
                    "Execucao ponta a ponta: da otimizacao de banco de dados ao desenvolvimento de interfaces de alta fidelidade.",
                },
              ].map((item) => (
                <div
                  className="group rounded-xl border border-outline-variant/5 bg-surface-container-high p-8 transition-all duration-500 hover:bg-surface-container-highest"
                  key={item.title}
                >
                  <span
                    className={`material-symbols-outlined mb-6 block text-4xl ${item.color}`}
                  >
                    {item.icon}
                  </span>
                  <h3 className="mb-3 text-xl font-bold">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-on-surface-variant">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface py-24" id="plataforma">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="mb-16 text-center">
              <h2 className="mb-2 text-3xl font-bold">
                O Pipeline Operacional
              </h2>
              <div className="mx-auto h-1 w-20 rounded-full bg-primary"></div>
            </div>

            <div className="relative flex flex-col justify-between gap-8 md:flex-row">
              <div className="absolute left-0 top-1/2 hidden h-[0.5px] w-full bg-outline-variant/20 md:block"></div>

              {[
                [
                  "FASE_01",
                  "text-primary/60",
                  "Diagnostico",
                  "Auditoria Profunda e Mapeamento de Sistema",
                ],
                [
                  "FASE_02",
                  "text-secondary/60",
                  "Arquitetura",
                  "Blueprint e Protocolo de Seguranca",
                ],
                [
                  "FASE_03",
                  "text-primary/60",
                  "Desenvolvimento",
                  "Execucao Agil com CI/CD",
                ],
                [
                  "FASE_04",
                  "text-secondary/60",
                  "Escala",
                  "Monitoramento e Otimizacao",
                ],
              ].map(([phase, color, title, description]) => (
                <div
                  className="group relative z-10 flex-1 rounded-lg border border-outline-variant/10 bg-surface-container-lowest p-6"
                  key={phase}
                >
                  <div
                    className={`mb-4 font-mono text-xs tracking-[0.3em] ${color}`}
                  >
                    {phase}
                  </div>
                  <h4 className="mb-2 text-lg font-bold">{title}</h4>
                  <p className="text-xs uppercase tracking-wider text-on-surface-variant">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface-container-low py-24" id="equipe">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="mx-auto mb-14 max-w-3xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-secondary">
                Nossa Equipe
              </p>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Conheça os fundadores
              </h2>
              <p className="text-on-surface-variant">
                Quatro estudantes de Engenharia da Computação unidos pela paixão
                por tecnologia e pelo compromisso com a excelência.
              </p>
            </div>

            <div className="grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  iniciais: "NM",
                  nome: "Nicolas Marrai Alves Feitosa",
                  cargo: "Fundador",
                  linkedin:
                    "https://www.linkedin.com/in/nicolas-marrai-76363b34b/",
                  github: "https://github.com/NicolasMarrai",
                  descricao:
                    "Atua na definição de arquitetura e construção de sistemas escaláveis, com foco em desempenho, organização e evolução contínua das soluções.",
                },
                {
                  iniciais: "LP",
                  nome: "Lucca Pontes Menezes",
                  cargo: "Fundador",
                  linkedin:
                    "https://www.linkedin.com/in/lucca-pontes-menezes-engenheiro/",
                  github: "https://github.com/DEVLucca",
                  descricao:
                    "Responsável pela experiência digital e interfaces, desenvolvendo aplicações intuitivas, funcionais e com alto padrão de usabilidade.",
                },
                {
                  iniciais: "CS",
                  nome: "Cauã Sarraf Ferri",
                  cargo: "Fundador",
                  linkedin: "https://www.linkedin.com/in/cauasarraf/?locale=pt",
                  github: "https://github.com/CauaOdM",
                  descricao:
                    "Responsável pela estrutura de dados e infraestrutura, assegurando estabilidade, segurança e base sólida para crescimento das aplicações.",
                },
                {
                  iniciais: "GG",
                  nome: "Gabriel Grande Santos",
                  cargo: "Cofundador",
                  linkedin: "https://www.linkedin.com/in/gabrielgrande-dev/",
                  github: "https://github.com/GabrielGrande-dev",
                  descricao:
                    "Responsável por banco de dados e infraestrutura, garantindo estabilidade, segurança e escalabilidade das soluções.",
                },
              ].map((membro) => (
                <article
                  className="flex h-full flex-col rounded-2xl border border-outline-variant/20 bg-surface-container p-6"
                  key={membro.nome}
                >
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-container to-secondary-container text-sm font-bold tracking-wide text-on-primary-container">
                    {membro.iniciais}
                  </div>
                  <h3 className="mb-1 text-lg font-bold">{membro.nome}</h3>
                  <p className="mb-4 text-sm font-semibold text-secondary">
                    {membro.cargo}
                  </p>
                  <p className="flex-1 text-sm leading-relaxed text-on-surface-variant">
                    {membro.descricao}
                  </p>

                  <div className="mt-6 flex items-center gap-3 border-t border-outline-variant/25 pt-5">
                    <a
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-outline-variant/35 bg-surface-container-low text-on-surface-variant transition-all hover:border-secondary/60 hover:text-secondary"
                      href={membro.linkedin}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-outline-variant/35 bg-surface-container-low text-on-surface-variant transition-all hover:border-secondary/60 hover:text-secondary"
                      href={membro.github}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="border-t border-outline-variant/10 py-24"
          id="documentacao"
        >
          <div className="mx-auto max-w-7xl px-6 text-center md:px-8">
            <h3 className="mb-12 text-sm font-bold uppercase tracking-[0.3em] text-on-surface-variant">
              A Matriz Tecnologica Integrada
            </h3>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 opacity-60 transition-opacity hover:opacity-100">
              {[
                "APIs RESTful",
                "Cloud Native",
                "PostgreSQL",
                "TypeScript",
                "Docker/K8s",
                "Seguranca Zero Trust",
              ].map((item) => (
                <span
                  className="text-xl font-semibold tracking-tighter"
                  key={item}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden py-32">
          <div className="absolute left-1/2 top-0 h-[300px] w-[800px] -translate-x-1/2 rounded-[100%] bg-primary/20 blur-[120px]"></div>
          <div className="relative z-10 mx-auto max-w-4xl px-6 text-center md:px-8">
            <h2 className="mb-6 text-4xl font-bold md:text-5xl">
              Construa sistemas que realmente escalam.
            </h2>
            <p className="mb-10 text-lg text-on-surface-variant">
              Converse com nossa equipe de arquitetura para discutir seu próximo
              desafio técnico.
            </p>
            <button
              className="rounded-lg bg-secondary px-12 py-5 font-bold text-on-secondary transition-all hover:shadow-[0_0_30px_rgba(58,110,165,0.35)] active:scale-95"
              onClick={() => setIsConsultoriaOpen(true)}
              type="button"
            >
              INICIAR CONSULTORIA
            </button>
          </div>
        </section>
      </main>

      <footer className="w-full border-t border-white/10 bg-surface-dim px-6 py-12 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-lg font-bold text-on-surface">COGNULL</div>

          <div className="flex gap-6 text-xs uppercase tracking-widest text-on-surface-variant md:gap-8">
            {["Privacidade", "Termos", "Seguranca", "Status"].map((item) => (
              <button
                className="opacity-80 transition-colors hover:text-secondary hover:opacity-100"
                key={item}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="text-xs uppercase tracking-widest text-on-surface-variant">
            © 2026 COGNULL. ARQUITETANDO INTELIGENCIA.
          </div>
        </div>
      </footer>

      {isConsultoriaOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-2xl rounded-2xl border border-outline-variant/40 bg-surface-container p-6 shadow-[0_20px_80px_rgba(0,0,0,0.5)] md:p-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold tracking-tight">
                  Iniciar consultoria pelo WhatsApp
                </h3>
                <p className="mt-2 text-sm text-on-surface-variant">
                  Escolha com quem você quer falar para abrir a conversa direta.
                </p>
              </div>
              <button
                className="material-symbols-outlined rounded-lg border border-outline-variant/40 p-2 text-on-surface-variant transition-colors hover:text-on-surface"
                onClick={() => setIsConsultoriaOpen(false)}
                type="button"
              >
                close
              </button>
            </div>

            <div className="grid gap-3">
              {whatsappContacts.map((contato) => (
                <a
                  className="group flex items-center justify-between rounded-xl border border-outline-variant/30 bg-surface-container-low px-4 py-4 transition-all hover:border-secondary/60 hover:bg-surface-container-high"
                  href={createWhatsAppLink(contato.numero, contato.nome)}
                  key={contato.nome}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <div>
                    <p className="font-semibold">{contato.nome}</p>
                    <p className="text-sm text-on-surface-variant">
                      {contato.area}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-secondary transition-colors group-hover:text-primary">
                    Chamar no WhatsApp
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
