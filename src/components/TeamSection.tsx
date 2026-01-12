import { Github, Linkedin, Mail } from "lucide-react";
import { useState } from "react";

const team = [
  {
    name: "Nicolas Marrai Alves Feitosa",
    role: "Co-founder",
    description: "Especialista em arquitetura de sistemas e desenvolvimento backend, com foco em soluções escaláveis e performance.",
    gradient: "from-cyan to-blue-500",
    linkedin: "https://www.linkedin.com/in/nicolas-marrai-76363b34b/",
    github: "https://github.com/NicolasMarrai",
    email: "nicolasmarrai.dev@gmail.com",
  },
  {
    name: "Lucca Pontes Menezes",
    role: "Co-founder",
    description: "Expert em interfaces modernas e experiência do usuário, transformando designs em código limpo e eficiente.",
    gradient: "from-purple to-pink-500",
    linkedin: "https://www.linkedin.com/in/lucca-dev-818a94328/",
    github: "https://github.com/DEVLucca",
    email: "luccapontesmenezes.dev@gmail.com",
  },
  {
    name: "Cauã Sarraf Ferri",
    role: "Co-founder",
    description: "Focado em integrações e automações, conectando sistemas e otimizando processos de negócio.",
    gradient: "from-cyan to-purple",
    linkedin: "https://www.linkedin.com/in/cauasarraf/?locale=pt",
    github: "https://github.com/CauaOdM",
    email: "cauasarraf04@gmail.com",
  },
];

const TeamSection = () => {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const handleEmailClick = (email: string) => {
    navigator.clipboard.writeText(email).then(() => {
      setCopiedEmail(email);
      setTimeout(() => setCopiedEmail(null), 2000);
    });
  };

  return (
    <section id="team" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/5 to-background" />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-cyan/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-purple/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-cyan rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">Nossa Equipe</span>
          </div>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Conheça os <span className="gradient-text">fundadores</span>
          </h2>

          <p className="text-muted-foreground text-lg">
            Três estudantes de Engenharia da Computação unidos pela paixão por tecnologia 
            e pelo compromisso com a excelência.
          </p>
        </div>

        {/* Team Grid - Horizontal Layout */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {team.map((member) => (
              <div key={member.name} className="group relative">
                <div className="glass-strong rounded-3xl p-8 text-center hover-glow h-full flex flex-col">
                  <div className="relative mx-auto mb-6">
                    <div className={`w-28 h-28 rounded-full bg-gradient-to-br ${member.gradient} p-[3px]`}>
                      <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                        <span className="font-display text-3xl font-bold gradient-text">
                          {member.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
                        </span>
                      </div>
                    </div>
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500`} />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-primary text-sm font-medium mb-4">{member.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-grow">{member.description}</p>
                  <div className="flex justify-center gap-3 mt-6 pt-6 border-t border-border/50">
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-cyan hover:glow-cyan transition-all duration-300">
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a href={member.github} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-purple hover:glow-purple transition-all duration-300">
                      <Github className="w-5 h-5" />
                    </a>
                    <button 
                      onClick={() => handleEmailClick(member.email)}
                      className="w-10 h-10 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-300 relative"
                      title={copiedEmail === member.email ? "Email copiado!" : `Copiar: ${member.email}`}
                    >
                      <Mail className="w-5 h-5" />
                      {copiedEmail === member.email && (
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-primary text-primary-foreground px-2 py-1 rounded whitespace-nowrap">
                          Copiado!
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Badge */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-3 glass rounded-full px-6 py-3">
            <span className="text-2xl">🎓</span>
            <span className="text-muted-foreground">
              Estudantes de <strong className="text-foreground">Engenharia da Computação</strong>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
