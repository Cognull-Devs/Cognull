export type WorkflowStep = {
  numero: string;
  titulo: string;
  descricao: string;
};

export const workflowSteps: WorkflowStep[] = [
  {
    numero: "01",
    titulo: "Concepção",
    descricao:
      "Alinhamos referências e necessidades para iniciar a execução e as primeiras validações no mesmo dia do contato.",
  },
  {
    numero: "02",
    titulo: "Arquitetura",
    descricao:
      "Desenvolvemos uma estrutura escalável desde o primeiro passo. Aplicamos boas práticas que garantem performance e flexibilidade.",
  },
  {
    numero: "03",
    titulo: "Desenvolvimento",
    descricao:
      "Planejamento com entregas e atualizações semanais. Mantemos você a par de cada passo, com um fluxo interno organizado para garantir ritmo e precisão.",
  },
  {
    numero: "04",
    titulo: "Escala",
    descricao:
      "Foco total na saúde do projeto a longo prazo. Desenvolvemos observabilidade para garantir suporte ágil e uma estrutura preparada para escalar, acompanhando cada nova etapa de crescimento da sua empresa.",
  },
];
