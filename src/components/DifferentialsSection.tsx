import { CheckCircle, Code2, Palette, MessageCircle, Clock, Wrench } from "lucide-react";

const differentials = [
  {
    icon: Code2,
    title: "Código Limpo e Escalável",
    description: "Desenvolvemos seguindo as melhores práticas de programação, garantindo manutenibilidade e crescimento do seu projeto.",
  },
  {
    icon: Palette,
    title: "Design Moderno",
    description: "Interfaces atuais e responsivas que encantam usuários e fortalecem a identidade visual da sua marca.",
  },
  {
    icon: MessageCircle,
    title: "Comunicação Clara",
    description: "Mantemos você informado em cada etapa do projeto, com relatórios regulares e total transparência.",
  },
  {
    icon: Clock,
    title: "Compromisso com Prazos",
    description: "Respeitamos deadlines e trabalhamos com metodologias ágeis para entregas pontuais e consistentes.",
  },
  {
    icon: Wrench,
    title: "Soluções Sob Medida",
    description: "Cada projeto é único. Desenvolvemos soluções personalizadas que atendem exatamente às suas necessidades.",
  },
  {
    icon: CheckCircle,
    title: "Suporte Contínuo",
    description: "Não terminamos na entrega. Oferecemos suporte pós-projeto para garantir o sucesso da sua solução.",
  },
];

const DifferentialsSection = () => {
  return (
    <section id="differentials" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-cyan/5 to-background" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan/10 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-cyan rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">Por que nos escolher</span>
          </div>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Nossos <span className="gradient-text">diferenciais</span>
          </h2>

          <p className="text-muted-foreground text-lg">
            O que nos torna a escolha certa para o seu próximo projeto digital.
          </p>
        </div>

        {/* Differentials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {differentials.map((item, index) => (
            <div
              key={item.title}
              className="group flex gap-5 glass-strong rounded-2xl p-6 hover-glow"
            >
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan/20 to-purple/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
              </div>

              {/* Content */}
              <div>
                <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="glass-strong inline-flex flex-col sm:flex-row items-center gap-6 rounded-2xl p-8">
            <div className="text-center sm:text-left">
              <h3 className="font-display text-xl font-semibold mb-2">
                Pronto para começar?
              </h3>
              <p className="text-muted-foreground">
                Entre em contato e vamos transformar sua ideia em realidade.
              </p>
            </div>
            <button 
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan to-purple text-background font-semibold shadow-[0_4px_20px_hsla(190,95%,55%,0.4)] hover:shadow-[0_6px_30px_hsla(190,95%,55%,0.6)] hover:scale-105 transition-all duration-300 whitespace-nowrap"
            >
              Fale Conosco
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DifferentialsSection;
