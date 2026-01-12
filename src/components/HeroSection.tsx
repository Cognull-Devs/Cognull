import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Sparkles } from "lucide-react";
import cognullLogo from "@/assets/cognull1.png";

const HeroSection = () => {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToAbout = () => {
    const element = document.querySelector("#about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan/20 rounded-full blur-[128px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple/20 rounded-full blur-[128px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--cyan)) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(var(--cyan)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Floating Badge */}
          <div className="glass rounded-full px-4 py-2 mb-8 flex items-center gap-2 animate-fade-in-up">
            <Sparkles className="w-4 h-4 text-cyan" />
            <span className="text-sm text-muted-foreground">
              Startup de Tecnologia • Engenharia da Computação
            </span>
          </div>

          {/* Logo */}
          <div className="mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <img
              src={cognullLogo}
              alt="Cognull"
              className="w-48 h-48 md:w-64 md:h-64 object-contain animate-float glow-mixed rounded-[2rem]"
            />
          </div>

          {/* Main Heading */}
          <h1 
            className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Transformamos ideias em{" "}
            <span className="gradient-text text-glow-cyan">soluções digitais</span>{" "}
            inteligentes
          </h1>

          {/* Subtitle */}
          <p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            Desenvolvemos sites, sistemas web e soluções tecnológicas sob medida 
            para impulsionar o seu negócio com inovação e qualidade técnica.
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row gap-4 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <Button variant="hero" size="xl" onClick={scrollToContact}>
              Solicitar Orçamento
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="hero-outline" size="xl" onClick={scrollToAbout}>
              <Code2 className="w-5 h-5" />
              Conheça a Equipe
            </Button>
          </div>

          {/* Stats */}
          <div 
            className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-border/50 animate-fade-in-up"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="text-center">
              <div className="font-display text-2xl md:text-3xl font-bold gradient-text">3</div>
              <div className="text-sm text-muted-foreground">Engenheiros</div>
            </div>
            <div className="text-center">
              <div className="font-display text-2xl md:text-3xl font-bold gradient-text">100%</div>
              <div className="text-sm text-muted-foreground">Dedicação</div>
            </div>
            <div className="text-center">
              <div className="font-display text-2xl md:text-3xl font-bold gradient-text">∞</div>
              <div className="text-sm text-muted-foreground">Inovação</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/50 flex justify-center pt-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
