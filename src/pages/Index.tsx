import { Github, Linkedin } from "lucide-react";
import { useState } from "react";

const whatsappContacts = [
  {
    nome: "Nicolas",
    area: "Arquitetura & Solucoes",
    numero: "5563984648255",
  },
  {
    nome: "Lucca",
    area: "Experiencia Digital",
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
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  return (
    <div className="bg-gradient-to-b from-[#305C5C] to-[#336565] font-body text-on-surface-variant selection:bg-primary selection:text-white">
      <nav className="fixed top-0 z-50 flex w-full items-center justify-between px-8 py-6 transition-all duration-500 md:px-16 backdrop-blur-md">
        <div className="nike-depth font-headline text-2xl font-bold uppercase tracking-[0.2em] text-white">
          COGNULL
        </div>
        <div className="hidden items-center gap-12 font-label text-[10px] uppercase tracking-widest lg:flex">
          <a className="text-white transition-colors hover:text-[#E9FFE6]" href="#services">
            Serviços
          </a>
          <a className="text-white transition-colors hover:text-[#E9FFE6]" href="#pipeline">
            Workflow
          </a>
          <a className="text-white transition-colors hover:text-[#E9FFE6]" href="#team">
            Equipe
          </a>
          <a className="text-white transition-colors hover:text-[#E9FFE6]" href="#contact">
            Contato
          </a>
        </div>
        <a
          className="border-2 border-[#3DFF2A] bg-[#3DFF2A] px-6 py-3 font-label text-[10px] font-bold uppercase tracking-[0.2em] text-black transition-colors duration-300 hover:bg-[#E9FFE6] hover:text-[#0B3F3F]"
          href="#contact"
        >
          INICIAR
        </a>
      </nav>

      <header className="relative flex min-h-screen items-center overflow-hidden bg-transparent px-8 md:px-16">
        <div className="mobius-container pointer-events-none absolute right-[-5%] top-1/2 h-[800px] w-[800px] -translate-y-1/2 opacity-20">
          <svg className="mobius-svg h-full w-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="heroGradient" x1="0%" x2="100%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#00E5FF" stopOpacity="1" />
                <stop offset="100%" stopColor="#00A3FF" stopOpacity="1" />
              </linearGradient>
            </defs>
            <path
              d="M100,60 C140,60 160,100 100,140 C40,180 20,100 100,60 Z"
              fill="none"
              stroke="url(#heroGradient)"
              strokeDasharray="2 2"
              strokeWidth="0.5"
            />
            <path
              d="M100,40 C160,40 180,100 100,160 C20,220 0,100 100,40 Z"
              fill="none"
              opacity="0.3"
              stroke="url(#heroGradient)"
              strokeWidth="1"
            />
            <circle className="animate-pulse-slow" cx="100" cy="100" fill="#00E5FF" r="2" />
          </svg>
        </div>

        <div className="relative z-10 max-w-5xl pt-20">
          <div className="mb-8 flex items-center gap-4">
            <span className="h-[2px] w-12 bg-[#3DFF2A]" />
            <span className="font-label text-[11px] font-bold uppercase tracking-[0.4em] text-[#3DFF2A]">
              Feito Sob Medida
            </span>
          </div>
          <h1 className="mb-10 font-headline text-[clamp(3.5rem,10vw,8rem)] font-bold uppercase leading-[0.85] tracking-tighter text-white">
            COGNULL: ESCALANDO O <span className="text-[#3DFF2A]">CONHECIMENTO</span>
          </h1>
          <p className="mb-12 max-w-2xl text-xl font-normal leading-relaxed text-on-surface-variant md:text-2xl">
            Consultoria de software e solucoes de alto desempenho para o seu business.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <a
              className="bg-[#3DFF2A] px-12 py-6 font-label text-xs font-bold uppercase tracking-[0.2em] text-black shadow-xl transition-all hover:bg-[#E9FFE6] hover:text-[#0B3F3F]"
              href="#contact"
            >
              Fale Conosco
            </a>
            <a
              className="group flex items-center gap-4 font-label text-xs font-bold uppercase tracking-[0.2em] text-white"
              href="#pipeline"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#3DFF2A] text-[#3DFF2A] transition-colors group-hover:border-[#E9FFE6] group-hover:text-[#E9FFE6]">
                <span className="material-symbols-outlined text-sm">play_arrow</span>
              </span>
              Conheça nosso trabalho
            </a>
          </div>
        </div>
      </header>

      <div className="relative h-32 w-full overflow-hidden bg-transparent">
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent" />
        </div>
      </div>

      <section className="relative bg-transparent px-8 py-32 md:px-16" id="pipeline">
        <div className="mb-24 flex flex-col items-start justify-between gap-12 md:flex-row">
          <div>
            <span className="mb-4 block font-label text-xs font-bold uppercase tracking-[0.5em] text-[#3DFF2A]">
              Nosso Workflow
            </span>
            <h2 className="font-headline text-5xl font-bold uppercase tracking-tighter text-white md:text-6xl">
              Operação Cognull
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            ["01", "Concepção", "Alinhamos referências e necessidades para iniciar a execução e as primeiras validações no mesmo dia do contato."],
            ["02", "Arquitetura", "Desenvolvemos uma estrutura escalável desde o primeiro passo. Aplicamos boas práticas que garantem performance e flexibilidade."],
            ["03", "Desenvolvimento", "Planejamento com entregas e atualizações semanais. Mantemos você a par de cada passo, com um fluxo interno organizado para garantir ritmo e precisão."],
            ["04", "Escala", "Foco total na saúde do projeto a longo prazo. Desenvolvemos observabilidade para garantir suporte ágil e uma estrutura preparada para escalar, acompanhando cada nova etapa de crescimento da sua empresa."],
          ].map(([numero, titulo, descricao]) => (
            <div
              className="nike-depth glass-panel group rounded-2xl p-10 shadow-sm transition-all duration-500 hover:bg-[#3DFF2A]"
              key={titulo}
            >
              <div className="mb-8 font-headline text-5xl font-bold text-white transition-colors group-hover:text-black">
                {numero}
              </div>
              <h4 className="mb-4 font-headline text-2xl font-bold uppercase text-white transition-colors group-hover:text-black">{titulo}</h4>
              <p className="text-sm leading-relaxed text-white transition-colors group-hover:text-black">
                {descricao}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-transparent px-8 py-32 md:px-16" id="services">
        <div className="absolute bottom-0 left-[-10%] h-[600px] w-[600px] rounded-full bg-secondary/5 blur-[150px]" />
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="space-y-8 lg:sticky lg:top-28">
            <div className="space-y-4">
              <h2 className="font-headline text-6xl font-bold uppercase leading-[0.92] tracking-tighter text-white md:text-7xl">
                Pensado para
                <br />
                <span className="text-[#3DFF2A]">Performance.</span>
              </h2>
            </div>

            <p className="max-w-xl text-lg leading-relaxed text-white/85 md:text-xl">
              O que sustenta qualquer sistema não é apenas código,<br />
              é compreensão.<br />
              <br />
              Acreditamos no conhecimento como um processo contínuo,<br />
              não linear, não estático, mas em constante construção.
            </p>

            <div className="flex items-center gap-4 border-l-2 border-[#3DFF2A] pl-4">
              <span className="font-label text-[10px] uppercase tracking-[0.35em] text-[#3DFF2A]">
                Estratégia • Execução • Escala
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-[#3DFF2A] via-[#3DFF2A]/40 to-transparent" />

            <div className="space-y-10 pl-16">
              {[
                ["01", "Design Intuitivo e Fluido", "Criamos interfaces modernas e fáceis de usar, garantindo que seu cliente tenha uma experiência impecável em qualquer dispositivo, do celular ao computador."],
                ["02", "Sistemas Ágeis e Seguros", "Desenvolvemos o motor do seu projeto com foco em velocidade de resposta e proteção total de dados. Assim, garantimos que tudo funcione da melhor forma possível."],
                ["03", "Infraestrutura Sempre Online", "O suporte que sua empresa precisa para ir mais longe."],
              ].map(([numero, title, description]) => (
                <div className="group relative pb-10" key={title}>
                  <div className="absolute -left-16 top-1 flex h-12 w-12 items-center justify-center rounded-full border border-[#3DFF2A]/60 bg-[#0B3F3F] font-headline text-lg text-[#3DFF2A] transition-colors group-hover:bg-[#3DFF2A] group-hover:text-[#0B3F3F]">
                    {numero}
                  </div>
                  <div className="flex flex-col gap-3 border-b border-white/10 pb-10 transition-colors group-hover:border-[#3DFF2A]/40">
                    <h5 className="font-headline text-2xl font-bold uppercase text-white transition-colors group-hover:text-[#E9FFE6]">
                      {title}
                    </h5>
                    <p className="max-w-3xl text-sm leading-relaxed text-white/80 transition-colors group-hover:text-white">
                      {description}
                    </p>
                    <div className="mt-2 h-px w-24 bg-[#3DFF2A]/60 transition-all group-hover:w-40 group-hover:bg-[#E9FFE6]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-transparent px-8 py-32 md:px-16" id="team">
        <div className="mb-24 text-center">
          <h3 className="font-headline text-5xl font-bold uppercase tracking-tighter text-white md:text-6xl">
            The Founders
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              iniciais: "CS",
              nome: "Cauã Sarraf Ferri",
              cargo: "Fundador",
              descricao:
                "Movido pelo impacto real de converter ideias complexas em ferramentas simples que resolvem problemas do dia a dia.",
              linkedin: "https://www.linkedin.com/in/cauasarraf/?locale=pt",
              github: "https://github.com/CauaOdM",
            },
            {
              iniciais: "NM",
              nome: "Nicolas Marrai",
              cargo: "Fundador",
              descricao:
                "Transformou a curiosidade de quem desmontava tudo na infância na precisão de quem constrói sistemas hoje.",
              linkedin: "https://www.linkedin.com/in/nicolas-marrai-76363b34b/",
              github: "https://github.com/NicolasMarrai",
            },
            {
              iniciais: "LP",
              nome: "Luccas Pontes",
              cargo: "Fundador",
              descricao:
                "Mente estratégica focada em encontrar o caminho mais inteligente para sistemas que precisam de escala e segurança.",
              linkedin: "https://www.linkedin.com/in/lucca-pontes-menezes-engenheiro/",
              github: "https://github.com/DEVLucca",
            },
            {
              iniciais: "GG",
              nome: "Gabriel Grande",
              cargo: "Cofundador",
              descricao:
                "Traz a ética do trabalho duro e o compromisso de quem trata cada projeto como se fosse o dono do negócio.",
              linkedin: "https://www.linkedin.com/in/gabrielgrande-dev/",
              github: "https://github.com/GabrielGrande-dev",
            },
          ].map((membro) => (
            <article
              className="flex min-h-[520px] flex-col rounded-3xl border border-primary/35 bg-[rgba(11,63,63,0.28)] p-8 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-sm transition-colors hover:border-[#3DFF2A]"
              key={membro.nome}
            >
              <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-b from-[#49d86a] to-[#2fa14d] font-headline text-3xl text-white">
                {membro.iniciais}
              </div>
              <h5 className="mb-1 text-4xl font-headline text-white">{membro.nome}</h5>
              <p className="mb-8 text-2xl font-label tracking-tight text-[#3DFF2A]">{membro.cargo}</p>
              <p className="flex-1 text-xl leading-relaxed text-white/90">{membro.descricao}</p>

              <div className="mt-8 border-t border-primary/40 pt-7">
                <div className="flex gap-4">
                  <a
                    className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/50 text-white/80 transition-colors hover:border-primary hover:text-white"
                    href={membro.linkedin}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Linkedin className="h-7 w-7" />
                  </a>
                  <a
                    className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/50 text-white/80 transition-colors hover:border-primary hover:text-white"
                    href={membro.github}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Github className="h-7 w-7" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-transparent px-8 py-40" id="contact">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2">
          <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.08)_0,transparent_70%)]" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h2 className="mb-10 font-headline text-[clamp(2.5rem,8vw,5.5rem)] font-bold uppercase leading-[1.06] tracking-tighter text-white">
            Preparado Para
            <br />
            <span className="text-[#3DFF2A]">O Próximo Nível?</span>
          </h2>
          <p className="mx-auto mb-16 max-w-2xl text-lg font-normal text-on-surface-variant">
            Inicie sua jornada hoje. Nossa equipe esta pronta para o impactar o seu negócio.
          </p>
          <button
            onClick={() => setIsContactModalOpen(true)}
            className="group relative inline-block overflow-hidden bg-[#3DFF2A] px-16 py-8 font-headline text-xs font-bold uppercase tracking-[0.4em] text-black shadow-2xl transition-all duration-500 hover:bg-[#E9FFE6] hover:text-[#0B3F3F]"
            type="button"
          >
            <span className="relative z-10">Comece por Aqui</span>
            <span className="absolute inset-0 translate-y-full bg-[#E9FFE6] transition-transform duration-500 group-hover:translate-y-0" />
          </button>
        </div>
      </section>

      {isContactModalOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/55 px-4" onClick={() => setIsContactModalOpen(false)}>
          <div
            className="w-full max-w-6xl rounded-3xl border border-primary/40 bg-[rgba(10,58,58,0.9)] p-8 shadow-2xl backdrop-blur-md"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {whatsappContacts.map((contato) => (
                <a
                  className="rounded-2xl bg-[#8BAEB4]/85 px-6 py-7 transition-all hover:bg-[#C8FFC1]"
                  href={createWhatsAppLink(contato.numero, contato.nome)}
                  key={contato.nome}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <p className="mb-2 font-headline text-4xl text-white">{contato.nome}</p>
                  <p className="font-label text-sm uppercase tracking-[0.3em] text-white">{contato.area}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {isPrivacyModalOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/55 px-4"
          onClick={() => setIsPrivacyModalOpen(false)}
        >
          <div
            className="w-full max-w-4xl rounded-3xl border border-primary/40 bg-[rgba(10,58,58,0.94)] p-8 shadow-2xl backdrop-blur-md"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <span className="font-label text-[9px] font-bold uppercase tracking-[0.35em] text-[#3DFF2A]">
                  Privacidade
                </span>
                <h2 className="mt-3 font-headline text-3xl font-bold uppercase tracking-tighter text-white md:text-4xl">
                  Política de privacidade
                </h2>
              </div>
              <button
                className="rounded-full border border-primary/40 px-4 py-2 font-label text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:border-[#3DFF2A] hover:text-[#E9FFE6]"
                onClick={() => setIsPrivacyModalOpen(false)}
                type="button"
              >
                Fechar
              </button>
            </div>

            <div className="space-y-5 text-sm leading-relaxed text-on-surface-variant md:text-base">
              <p>
                A COGNULL coleta apenas as informações necessárias para responder
                contatos, entender solicitações e melhorar a experiência no site.
              </p>
              <p>
                Quando você entra em contato por formulário, WhatsApp ou outros
                canais, podemos armazenar nome, telefone, e-mail e mensagem para
                retorno e acompanhamento do atendimento.
              </p>
              <p>
                Também podemos usar dados de navegação de forma agregada e
                anônima para medir desempenho, identificar problemas e aprimorar o
                conteúdo do site.
              </p>
              <p>
                Não vendemos seus dados pessoais. O compartilhamento ocorre apenas
                quando necessário para operação, atendimento ou por exigência legal.
              </p>
              <p>
                Se desejar atualizar, corrigir ou solicitar a exclusão de dados,
                entre em contato com a equipe da COGNULL pelos canais do site.
              </p>
            </div>
          </div>
        </div>
      )}

      {isTermsModalOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/55 px-4"
          onClick={() => setIsTermsModalOpen(false)}
        >
          <div
            className="w-full max-w-4xl rounded-3xl border border-primary/40 bg-[rgba(10,58,58,0.94)] p-8 shadow-2xl backdrop-blur-md"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <span className="font-label text-[9px] font-bold uppercase tracking-[0.35em] text-[#3DFF2A]">
                  Termos
                </span>
                <h2 className="mt-3 font-headline text-3xl font-bold uppercase tracking-tighter text-white md:text-4xl">
                  Termos de uso
                </h2>
              </div>
              <button
                className="rounded-full border border-primary/40 px-4 py-2 font-label text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:border-[#3DFF2A] hover:text-[#E9FFE6]"
                onClick={() => setIsTermsModalOpen(false)}
                type="button"
              >
                Fechar
              </button>
            </div>

            <div className="space-y-5 text-sm leading-relaxed text-on-surface-variant md:text-base">
              <p>
                Ao acessar e utilizar o site da COGNULL, você concorda com estes
                termos básicos de uso.
              </p>
              <p>
                O conteúdo do site tem finalidade informativa e comercial. Os
                serviços descritos podem ser ajustados, atualizados ou removidos
                sem aviso prévio.
              </p>
              <p>
                O usuário se compromete a não utilizar este site para atividades
                ilegais, abusivas, maliciosas ou que possam comprometer seu
                funcionamento.
              </p>
              <p>
                O contato realizado por WhatsApp, formulário ou outros canais deve
                fornecer informações verdadeiras para que possamos atender de
                forma adequada.
              </p>
              <p>
                Todo o conteúdo visual, textual e técnico exibido neste site é de
                uso exclusivo da COGNULL, salvo indicação em contrário.
              </p>
              <p>
                A COGNULL pode atualizar estes termos a qualquer momento para se
                adequar a mudanças de serviço, operação ou legislação.
              </p>
            </div>
          </div>
        </div>
      )}

      <footer className="w-full border-t border-black/5 bg-transparent px-8 py-8 md:px-16">
        <div className="mx-auto flex max-w-7xl flex-nowrap items-center justify-between gap-6 whitespace-nowrap">
          <div className="font-headline text-lg font-bold uppercase tracking-[0.18em] text-white whitespace-nowrap">
            COGNULL
          </div>

          <div className="flex flex-nowrap items-center gap-6 text-[9px] uppercase tracking-[0.22em] text-on-surface-variant whitespace-nowrap">
            <a className="transition-colors hover:text-white" href="#services">
              SERVIÇOS
            </a>
            <a className="transition-colors hover:text-white" href="#team">
              EQUIPE
            </a>
            <a className="transition-colors hover:text-white" href="#contact">
              CONTATO
            </a>
            <button className="transition-colors hover:text-white" onClick={() => setIsPrivacyModalOpen(true)} type="button">
              PRIVACIDADE
            </button>
            <button className="transition-colors hover:text-white" onClick={() => setIsTermsModalOpen(true)} type="button">
              TERMOS
            </button>
          </div>

          <div className="text-[9px] uppercase tracking-[0.22em] text-[#E9FFE6] whitespace-nowrap">
            © 2026 COGNULL. ARQUITETANDO INTELIGENCIA.
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Index;
