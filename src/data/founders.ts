export type Founder = {
  iniciais: string;
  nome: string;
  cargo: string;
  descricao: string;
  linkedin: string;
  github: string;
  whatsapp: string;
};

export const founders: Founder[] = [
  {
    iniciais: "CS",
    nome: "Cauã Sarraf Ferri",
    cargo: "Fundador",
    descricao:
      "Movido pelo impacto real de converter ideias complexas em ferramentas simples que resolvem problemas do dia a dia.",
    linkedin: "https://www.linkedin.com/in/cauasarraf/?locale=pt",
    github: "https://github.com/CauaOdM",
    whatsapp: "5512997042612",
  },
  {
    iniciais: "NM",
    nome: "Nicolas Marrai",
    cargo: "Fundador",
    descricao:
      "Transformou a curiosidade de quem desmontava tudo na infância na precisão de quem constrói sistemas hoje.",
    linkedin: "https://www.linkedin.com/in/nicolas-marrai-76363b34b/",
    github: "https://github.com/NicolasMarrai",
    whatsapp: "5563984648255",
  },
  {
    iniciais: "GG",
    nome: "Gabriel Grande",
    cargo: "Fundador",
    descricao:
      "Traz a ética do trabalho duro e o compromisso de quem trata cada projeto como se fosse o dono do negócio.",
    linkedin: "https://www.linkedin.com/in/gabrielgrande-dev/",
    github: "https://github.com/GabrielGrande-dev",
    whatsapp: "5534998110985",
  },
];
