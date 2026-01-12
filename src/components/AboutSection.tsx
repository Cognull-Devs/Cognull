import { Code, Cpu, Lightbulb, Rocket } from "lucide-react";

const features = [
  {
    icon: Code,
    title: "Código de Qualidade",
    description: "Desenvolvemos com as melhores práticas e tecnologias modernas",
  },
  {
    icon: Lightbulb,
    title: "Inovação Constante",
    description: "Sempre buscando novas soluções e aprendendo tecnologias emergentes",
  },
  {
    icon: Cpu,
    title: "Base Técnica Sólida",
    description: "Formação em Engenharia da Computação garante excelência técnica",
  },
  {
    icon: Rocket,
    title: "Entregas Ágeis",
    description: "Metodologias ágeis para entregar valor de forma rápida e eficiente",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2">
              <span className="w-2 h-2 bg-cyan rounded-full animate-pulse" />
              <span className="text-sm text-muted-foreground">Sobre nós</span>
            </div>

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold">
              Quem é a{" "}
              <span className="gradient-text">Cognull</span>?
            </h2>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Somos uma <strong className="text-foreground">startup de tecnologia</strong> formada por 
                três estudantes de Engenharia da Computação apaixonados por desenvolvimento de software 
                e soluções digitais inovadoras.
              </p>
              <p>
                Nossa missão é transformar ideias em produtos digitais de alta qualidade, 
                combinando <strong className="text-foreground">conhecimento técnico sólido</strong> com 
                criatividade e dedicação para entregar soluções que realmente fazem a diferença.
              </p>
              <p>
                Acreditamos que a tecnologia deve ser acessível e eficiente. Por isso, trabalhamos 
                próximos aos nossos clientes, entendendo suas necessidades e construindo juntos 
                o futuro digital de seus negócios.
              </p>
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="glass-strong rounded-2xl p-6 hover-glow group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan/20 to-purple/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
