import { Globe, Layers, Zap, Link2, Settings, Code2 } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Sites Institucionais",
    description: "Websites profissionais e responsivos que representam sua marca com excelência e convertem visitantes em clientes.",
    color: "cyan",
  },
  {
    icon: Layers,
    title: "Sistemas Web",
    description: "Aplicações web completas e escaláveis para automatizar processos e gerenciar seu negócio de forma eficiente.",
    color: "purple",
  },
  {
    icon: Zap,
    title: "Landing Pages",
    description: "Páginas de alta conversão otimizadas para campanhas de marketing e captação de leads qualificados.",
    color: "cyan",
  },
  {
    icon: Link2,
    title: "Integrações com APIs",
    description: "Conectamos seu sistema com plataformas de pagamento, CRMs, ERPs e serviços externos de forma segura.",
    color: "purple",
  },
  {
    icon: Settings,
    title: "Automação",
    description: "Automatize tarefas repetitivas e otimize fluxos de trabalho para aumentar a produtividade da sua equipe.",
    color: "cyan",
  },
  {
    icon: Code2,
    title: "Soluções Personalizadas",
    description: "Desenvolvimento sob medida para necessidades específicas do seu negócio, do conceito à implementação.",
    color: "purple",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-purple/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan/10 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-purple rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">Nossos Serviços</span>
          </div>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Soluções <span className="gradient-text">completas</span> para seu negócio
          </h2>

          <p className="text-muted-foreground text-lg">
            Oferecemos uma gama completa de serviços de desenvolvimento para transformar 
            sua visão em realidade digital.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group glass-strong rounded-2xl p-8 hover-glow relative overflow-hidden"
            >
              {/* Hover gradient */}
              <div 
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  service.color === "cyan" 
                    ? "bg-gradient-to-br from-cyan/10 to-transparent" 
                    : "bg-gradient-to-br from-purple/10 to-transparent"
                }`}
              />

              <div className="relative z-10">
                {/* Icon */}
                <div 
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 ${
                    service.color === "cyan"
                      ? "bg-gradient-to-br from-cyan/20 to-cyan/5"
                      : "bg-gradient-to-br from-purple/20 to-purple/5"
                  }`}
                >
                  <service.icon 
                    className={`w-7 h-7 ${
                      service.color === "cyan" ? "text-cyan" : "text-purple"
                    }`}
                  />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>

                {/* Decorative line */}
                <div 
                  className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 ${
                    service.color === "cyan"
                      ? "bg-gradient-to-r from-cyan to-cyan/0"
                      : "bg-gradient-to-r from-purple to-purple/0"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
