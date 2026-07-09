import { useState, type CSSProperties } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Modal } from "@/components/Modal";
import { founders } from "@/data/founders";
import { privacyPolicyParagraphs, termsParagraphs } from "@/data/legal";
import { services } from "@/data/services";
import { workflowSteps } from "@/data/workflow";

type IconProps = {
  className?: string;
};

const Menu = ({ className }: IconProps) => (
  <svg
    aria-hidden="true"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 7h16M4 12h16M4 17h16"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="2"
    />
  </svg>
);

const X = ({ className }: IconProps) => (
  <svg
    aria-hidden="true"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 6l12 12M18 6L6 18"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="2"
    />
  </svg>
);

const Github = ({ className }: IconProps) => (
  <svg
    aria-hidden="true"
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.1.68-.21.68-.47v-1.66c-2.78.6-3.37-1.34-3.37-1.34-.45-1.14-1.1-1.45-1.1-1.45-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.33 1.08 2.9.83.09-.64.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.99 1.03-2.69-.1-.26-.45-1.28.1-2.66 0 0 .84-.27 2.75 1.03a9.6 9.6 0 0 1 5 0c1.9-1.3 2.74-1.03 2.74-1.03.55 1.38.2 2.4.1 2.66.64.7 1.03 1.6 1.03 2.69 0 3.84-2.35 4.69-4.59 4.94.36.31.68.93.68 1.88v2.78c0 .26.18.57.69.47A10 10 0 0 0 12 2Z" />
  </svg>
);

const Linkedin = ({ className }: IconProps) => (
  <svg
    aria-hidden="true"
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6.94 8.5A1.56 1.56 0 1 1 6.93 5.4a1.56 1.56 0 0 1 .01 3.1ZM5.6 18.6h2.66V9.56H5.6V18.6Zm4.18 0h2.65v-4.7c0-1.24.24-2.44 1.77-2.44 1.5 0 1.52 1.4 1.52 2.52v4.62h2.66v-5.16c0-2.54-.55-4.49-3.52-4.49-1.43 0-2.39.78-2.78 1.52h-.04V9.56H9.78c.03.66 0 9.04 0 9.04Z" />
  </svg>
);

const WhatsApp = ({ className }: IconProps) => (
  <svg
    aria-hidden="true"
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.5 4.5A10.48 10.48 0 0 0 12 1C6.48 1 2 5.35 2 10.7c0 1.92.6 3.71 1.64 5.21L2.5 23l7.28-1.9a10.63 10.63 0 0 0 2.22.24C17.52 21.34 22 16.99 22 11.64c0-2.59-1.06-5.01-2.5-7.14Zm-7.5 15.19c-.74 0-1.46-.1-2.14-.3l-.49-.14-4.32 1.13 1.15-4.1-.17-.43a7.95 7.95 0 0 1-.62-3.05c0-4.28 3.63-7.76 8.1-7.76 2.17 0 4.2.82 5.73 2.31a7.55 7.55 0 0 1 2.37 5.45c0 4.28-3.63 7.76-8.1 7.76Zm4.72-5.67c-.26-.13-1.55-.76-1.79-.85-.24-.09-.42-.13-.6.13-.18.26-.69.85-.85 1.02-.16.17-.31.19-.57.06-.26-.13-1.09-.39-2.08-1.25-.77-.69-1.29-1.54-1.44-1.8-.15-.26-.02-.4.11-.53.12-.12.26-.31.39-.46.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.45-.06-.13-.6-1.42-.82-1.94-.22-.53-.44-.46-.6-.47h-.51c-.17 0-.45.06-.69.32-.24.26-.91.89-.91 2.17 0 1.28.93 2.52 1.06 2.7.13.17 1.83 2.77 4.44 3.77.62.24 1.1.38 1.48.49.62.2 1.18.17 1.62.1.49-.07 1.55-.63 1.77-1.24.22-.62.22-1.15.16-1.24-.06-.09-.23-.15-.49-.28Z" />
  </svg>
);

const ATOM_COUNT = 75;
const atomIndexes = Array.from({ length: ATOM_COUNT }, (_, index) => index);

const Index = () => {
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="relative isolate bg-gradient-to-b from-teal-600 to-teal-500 font-body text-on-surface-variant selection:bg-primary selection:text-white">
      <main>
        {!isMobile && (
          <div aria-hidden className="organism-background">
            {[0, 1].map((organismIndex) => (
              <div
                className={`organism ${organismIndex === 0 ? "organism--mirror" : ""}`}
                key={organismIndex}
              >
                {atomIndexes.map((index) => (
                  <div
                    className="atom"
                    key={index}
                    style={{ "--i": index } as CSSProperties}
                  />
                ))}
              </div>
            ))}
          </div>
        )}

        <nav className="fixed top-0 z-50 w-full bg-teal-700/70 md:bg-transparent md:backdrop-blur-md">
          <div className="flex items-center justify-between px-4 py-4 transition-all duration-500 sm:px-6 md:px-16 md:py-6">
            <div className="nike-depth flex items-center gap-2 font-headline text-lg font-bold uppercase tracking-[0.16em] text-white sm:gap-3 sm:text-2xl sm:tracking-[0.2em]">
              <img
                alt="Logo da Cognull"
                className="h-12 w-auto sm:h-16"
                src="/cognull.png"
              />
              <span>COGNULL</span>
            </div>
            <div className="hidden items-center gap-12 font-label text-[10px] uppercase tracking-widest lg:flex">
              <a
                className="text-white transition-colors hover:text-brand-light"
                href="#services"
              >
                Serviços
              </a>
              <a
                className="text-white transition-colors hover:text-brand-light"
                href="#pipeline"
              >
                Workflow
              </a>
              <a
                className="text-white transition-colors hover:text-brand-light"
                href="#team"
              >
                Equipe
              </a>
              <a
                className="text-white transition-colors hover:text-brand-light"
                href="#contact"
              >
                Contato
              </a>
            </div>
            <div className="flex items-center gap-2">
              <a
                className="border-2 border-brand bg-brand px-3 py-2 font-label text-[9px] font-bold uppercase tracking-[0.18em] text-black transition-colors duration-300 hover:bg-brand-light hover:text-teal-900 sm:px-6 sm:py-3 sm:text-[10px] sm:tracking-[0.2em]"
                href="#contact"
              >
                INICIAR
              </a>
              <button
                aria-label="Abrir menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/20 text-white lg:hidden"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                type="button"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          {isMobileMenuOpen && (
            <div className="border-t border-white/10 bg-teal-700/95 px-4 py-4 lg:hidden">
              <div className="flex flex-col gap-3 font-label text-[11px] uppercase tracking-[0.2em] text-white">
                <a
                  className="transition-colors hover:text-brand-light"
                  href="#services"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Serviços
                </a>
                <a
                  className="transition-colors hover:text-brand-light"
                  href="#pipeline"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Workflow
                </a>
                <a
                  className="transition-colors hover:text-brand-light"
                  href="#team"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Equipe
                </a>
                <a
                  className="transition-colors hover:text-brand-light"
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contato
                </a>
              </div>
            </div>
          )}
        </nav>

        <header className="relative overflow-hidden bg-transparent px-4 py-14 sm:px-6 md:px-16 md:py-20">
          <div className="relative z-10 max-w-5xl">
            <div className="mb-6 flex items-center gap-3 md:mb-8 md:gap-4">
              <span className="h-[2px] w-10 bg-brand md:w-12" />
              <span className="font-label text-[10px] font-bold uppercase tracking-[0.28em] text-brand md:text-[11px] md:tracking-[0.4em]">
                Feito Sob Medida
              </span>
            </div>
            <h1 className="mb-6 font-headline text-[clamp(2.25rem,11vw,8rem)] font-bold uppercase leading-[0.9] tracking-tighter text-white md:mb-10 md:leading-[0.85]">
              COGNULL: ESCALANDO O{" "}
              <span className="text-brand">CONHECIMENTO</span>
            </h1>
            <p className="mb-8 max-w-2xl text-base font-normal leading-relaxed text-on-surface-variant sm:text-lg md:mb-12 md:text-2xl">
              Conhecimento aplicado, resultado inevitável.
            </p>
            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              <a
                className="bg-brand px-7 py-4 font-label text-[10px] font-bold uppercase tracking-[0.18em] text-black shadow-xl transition-all hover:bg-brand-light hover:text-teal-900 sm:px-10 sm:py-5 sm:text-xs md:px-12 md:py-6 md:tracking-[0.2em]"
                href="#contact"
              >
                Fale Conosco
              </a>
              <a
                className="group flex items-center gap-3 font-label text-[10px] font-bold uppercase tracking-[0.16em] text-white sm:gap-4 sm:text-xs sm:tracking-[0.2em]"
                href="#pipeline"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-brand text-brand transition-colors group-hover:border-brand-light group-hover:text-brand-light">
                  <span className="material-symbols-outlined text-sm">
                    play_arrow
                  </span>
                </span>
                Conheça nosso trabalho
              </a>
            </div>
          </div>
        </header>

        <div className="relative h-px w-full overflow-hidden bg-transparent">
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent" />
          </div>
        </div>

        <section
          className="relative bg-transparent px-4 py-14 sm:px-6 md:px-16 md:py-20"
          id="pipeline"
        >
          <div className="mb-12 flex flex-col items-start justify-between gap-10 md:mb-24 md:flex-row md:gap-12">
            <div>
              <span className="mb-3 block font-label text-[10px] font-bold uppercase tracking-[0.35em] text-brand md:mb-4 md:text-xs md:tracking-[0.5em]">
                Nosso Workflow
              </span>
              <h2 className="font-headline text-3xl font-bold uppercase tracking-tighter text-white sm:text-4xl md:text-6xl">
                Operação Cognull
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {workflowSteps.map(({ numero, titulo, descricao }) => (
              <div
                className="nike-depth glass-panel group rounded-2xl p-7 shadow-sm transition-all duration-500 hover:bg-brand motion-reduce:transition-none sm:p-10"
                key={titulo}
              >
                <div className="mb-6 font-headline text-4xl font-bold text-white transition-colors group-hover:text-black sm:mb-8 sm:text-5xl">
                  {numero}
                </div>
                <h3 className="mb-3 font-headline text-xl font-bold uppercase text-white transition-colors group-hover:text-black sm:mb-4 sm:text-2xl">
                  {titulo}
                </h3>
                <p className="text-sm leading-relaxed text-white transition-colors group-hover:text-black">
                  {descricao}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          className="relative overflow-hidden bg-transparent px-4 py-20 sm:px-6 md:px-16 md:py-32"
          id="services"
        >
          <div className="absolute bottom-0 left-[-10%] hidden h-[600px] w-[600px] rounded-full bg-secondary/5 blur-[150px] md:block" />
          <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div className="space-y-8 lg:sticky lg:top-28">
              <div className="space-y-4">
                <h2 className="font-headline text-4xl font-bold uppercase leading-[0.94] tracking-tighter text-white sm:text-5xl md:text-7xl md:leading-[0.92]">
                  Pensado para
                  <br />
                  <span className="text-brand">Performance.</span>
                </h2>
              </div>

              <p className="max-w-xl text-base leading-relaxed text-white/85 md:text-xl">
                O que sustenta qualquer sistema não é apenas código,
                <br />
                é compreensão.
                <br />
                <br />
                Acreditamos no conhecimento como um processo contínuo,
                <br />
                não linear, não estático, mas em constante construção.
              </p>

              <div className="flex items-center gap-4 border-l-2 border-brand pl-4">
                <span className="font-label text-[10px] uppercase tracking-[0.35em] text-brand">
                  Estratégia • Execução • Escala
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-3 top-0 h-full w-px bg-gradient-to-b from-brand via-brand/40 to-transparent sm:left-6" />

              <div className="space-y-10 pl-10 sm:pl-16">
                {services.map(({ numero, title, description }) => (
                  <div className="group relative pb-10" key={title}>
                    <div className="absolute -left-10 top-1 flex h-10 w-10 items-center justify-center rounded-full border border-brand/60 bg-teal-900 font-headline text-base text-brand transition-colors group-hover:bg-brand group-hover:text-teal-900 sm:-left-16 sm:h-12 sm:w-12 sm:text-lg">
                      {numero}
                    </div>
                    <div className="flex flex-col gap-3 border-b border-white/10 pb-10 transition-colors group-hover:border-brand/40">
                      <h3 className="font-headline text-xl font-bold uppercase text-white transition-colors group-hover:text-white sm:text-2xl">
                        {title}
                      </h3>
                      <p className="max-w-3xl text-sm leading-relaxed text-white/80 transition-colors group-hover:text-white">
                        {description}
                      </p>
                      <div className="mt-2 h-px w-24 bg-brand/60 transition-all group-hover:w-40 group-hover:bg-brand-light" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          className="bg-transparent px-4 py-20 sm:px-6 md:px-16 md:py-32"
          id="team"
        >
          <div className="mb-12 text-center md:mb-24">
            <h3 className="font-headline text-3xl font-bold uppercase tracking-tighter text-white sm:text-4xl md:text-6xl">
              The Founders
            </h3>
          </div>
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {founders.map((membro) => (
              <article
                className="flex min-h-[420px] flex-col rounded-3xl border border-primary/35 bg-teal-900/[0.28] p-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-sm transition-colors hover:border-brand sm:min-h-[520px] sm:p-8"
                key={membro.nome}
              >
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-b from-avatar-start to-avatar-end font-headline text-2xl text-white sm:mb-8 sm:h-14 sm:w-14 sm:text-3xl">
                  {membro.iniciais}
                </div>
                <h4 className="mb-1 text-2xl font-headline text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.75)] sm:text-4xl">
                  {membro.nome}
                </h4>
                <p className="mb-6 text-lg font-label tracking-tight text-white sm:mb-8 sm:text-2xl">
                  {membro.cargo}
                </p>
                <p className="flex-1 text-base leading-relaxed text-white sm:text-xl">
                  {membro.descricao}
                </p>

                <div className="mt-8 border-t border-primary/40 pt-7">
                  <div className="flex gap-4">
                    <a
                      aria-label={`LinkedIn de ${membro.nome}`}
                      className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/50 text-white transition-colors hover:border-primary hover:text-white sm:h-14 sm:w-14"
                      href={membro.linkedin}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <Linkedin className="h-6 w-6 sm:h-7 sm:w-7" />
                    </a>
                    <a
                      aria-label={`GitHub de ${membro.nome}`}
                      className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/50 text-white transition-colors hover:border-primary hover:text-white sm:h-14 sm:w-14"
                      href={membro.github}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <Github className="h-6 w-6 sm:h-7 sm:w-7" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          className="relative overflow-hidden bg-transparent px-4 py-24 sm:px-6 md:px-8 md:py-40"
          id="contact"
        >
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2">
            <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.08)_0,transparent_70%)]" />
          </div>
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <h2 className="mb-10 font-headline text-[clamp(2.5rem,8vw,5.5rem)] font-bold uppercase leading-[1.06] tracking-tighter text-white">
              Preparado Para
              <br />
              <span className="text-brand">O Próximo Nível?</span>
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-base font-normal text-on-surface-variant md:mb-16 md:text-lg">
              Inicie sua jornada hoje. Nossa equipe esta pronta para o impactar
              o seu negócio.
            </p>
            <a
              href="/formulario"
              className="group relative inline-block overflow-hidden bg-brand px-8 py-5 font-headline text-[10px] font-bold uppercase tracking-[0.25em] text-black shadow-2xl transition-all duration-500 hover:bg-brand-light hover:text-teal-900 motion-reduce:transition-none sm:px-12 sm:py-7 sm:text-xs sm:tracking-[0.35em] md:px-16 md:py-8 md:tracking-[0.4em]"
            >
              <span className="relative z-10">Comece por Aqui</span>
              <span className="absolute inset-0 translate-y-full bg-brand-light transition-transform duration-500 group-hover:translate-y-0" />
            </a>
          </div>
        </section>

        <Modal
          eyebrow="Canais de Contato"
          isOpen={isContactModalOpen}
          maxWidth="2xl"
          onClose={() => setIsContactModalOpen(false)}
          title="Escolha um fundador"
        >
          <div className="space-y-4">
            {founders.map((founder) => (
              <a
                key={founder.nome}
                href={`https://wa.me/${founder.whatsapp}?text=${encodeURIComponent(`Olá, ${founder.nome}! Gostaria de falar com a Cognull.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 rounded-2xl border border-primary/40 bg-brand/5 p-5 transition-none hover:border-brand hover:bg-brand/15 hover:shadow-lg md:p-6"
                onClick={() => setIsContactModalOpen(false)}
              >
                <div className="flex min-w-0 items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand text-black md:h-14 md:w-14">
                    <WhatsApp className="h-6 w-6 md:h-7 md:w-7" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate font-headline text-lg font-bold text-white md:text-xl">
                      {founder.nome}
                    </h3>
                    <p className="text-sm text-white/70">{founder.cargo}</p>
                  </div>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand text-brand transition-colors group-hover:bg-brand group-hover:text-black">
                  →
                </div>
              </a>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-white/50">
            💬 Clique em um fundador para abrir o WhatsApp
          </p>
        </Modal>

        <Modal
          eyebrow="Privacidade"
          isOpen={isPrivacyModalOpen}
          onClose={() => setIsPrivacyModalOpen(false)}
          title="Política de privacidade"
        >
          <div className="space-y-5 text-sm leading-relaxed text-on-surface-variant md:text-base">
            {privacyPolicyParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Modal>

        <Modal
          eyebrow="Termos"
          isOpen={isTermsModalOpen}
          onClose={() => setIsTermsModalOpen(false)}
          title="Termos de uso"
        >
          <div className="space-y-5 text-sm leading-relaxed text-on-surface-variant md:text-base">
            {termsParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Modal>
      </main>
      <footer className="w-full border-t border-black/5 bg-transparent px-4 py-8 sm:px-6 md:px-16">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 text-left md:flex-row md:items-center md:text-center">
          <div className="font-headline text-base font-bold uppercase tracking-[0.14em] text-white sm:text-lg sm:tracking-[0.18em]">
            COGNULL
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[9px] uppercase tracking-[0.18em] text-on-surface-variant sm:gap-6 sm:tracking-[0.22em]">
            <a className="transition-colors hover:text-white" href="#services">
              SERVIÇOS
            </a>
            <a className="transition-colors hover:text-white" href="#team">
              EQUIPE
            </a>
            <button
              className="transition-colors hover:text-white"
              onClick={() => setIsContactModalOpen(true)}
              type="button"
            >
              CONTATO
            </button>
            <button
              className="transition-colors hover:text-white"
              onClick={() => setIsPrivacyModalOpen(true)}
              type="button"
            >
              PRIVACIDADE
            </button>
            <button
              className="transition-colors hover:text-white"
              onClick={() => setIsTermsModalOpen(true)}
              type="button"
            >
              TERMOS
            </button>
          </div>

          <div className="text-[9px] uppercase tracking-[0.18em] text-brand-light sm:tracking-[0.22em]">
            © 2026 COGNULL. ARQUITETANDO INTELIGENCIA.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
