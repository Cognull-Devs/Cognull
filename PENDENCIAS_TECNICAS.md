# Pendencias Tecnicas (Backlog de Melhorias)

Este arquivo registra problemas ja identificados no projeto para serem tratados em um ciclo futuro de melhoria.

## Prioridade Alta (corrigir primeiro)

### 1) Lint falhando (3 erros)

Status: Pendente
Impacto: Medio/Alto (qualidade e padrao de entrega)

Problemas detectados:

- Interface vazia em src/components/ui/command.tsx
- Interface vazia em src/components/ui/textarea.tsx
- Uso de require() em tailwind.config.ts

Checklist:

- [ ] Substituir interfaces vazias por type alias ou remover declaracao desnecessaria
- [ ] Trocar require("tailwindcss-animate") por import ESM
- [ ] Rodar npm run lint e confirmar zero errors

## Prioridade Media

### 2) Arquivo Index.tsx muito grande

Status: Pendente
Impacto: Medio (manutencao e evolucao)

Descricao:

- A pagina principal concentra muito codigo em src/pages/Index.tsx.
- Isso dificulta manutencao, revisao e reaproveitamento.

Checklist:

- [ ] Extrair secoes para componentes (Hero, Arquitetura, Pipeline, Equipe, Footer, Modal)
- [ ] Manter comportamento atual apos modularizacao
- [ ] Revisar imports e simplificar o arquivo Index

### 3) Dependencias/documentacao legadas (EmailJS)

Status: Pendente
Impacto: Medio (ruido tecnico)

Descricao:

- Fluxo atual de contato e via WhatsApp.
- Ainda existem artefatos de EmailJS no repositorio.

Checklist:

- [ ] Confirmar se EmailJS sera removido definitivamente
- [ ] Remover dependencia @emailjs/browser do package.json (se nao houver uso)
- [ ] Avaliar remocao/arquivamento de EMAILJS_SETUP.md
- [ ] Limpar variaveis de ambiente nao utilizadas

## Prioridade Baixa

### 4) Ajustes de documentacao

Status: Pendente
Impacto: Baixo/Medio

Descricao:

- README esta bom, mas pode ficar 100% aderente ao estado atual de arquivos/public.

Checklist:

- [ ] Revisar bloco de estrutura no README
- [ ] Garantir que exemplos e fluxo de contato reflitam o comportamento atual

### 5) Warnings nao bloqueantes

Status: Pendente
Impacto: Baixo

Itens:

- Warnings do react-refresh/only-export-components em componentes UI
- Aviso de Browserslist desatualizada durante build

Checklist:

- [ ] Decidir se warnings de react-refresh serao tratados agora ou aceitos
- [ ] Rodar npx update-browserslist-db@latest quando apropriado

## Criterio de conclusao

Uma rodada de melhoria sera considerada concluida quando:

- [ ] npm run lint passar sem errors
- [ ] npm run build passar sem regressao
- [ ] README estiver alinhado com o estado real do projeto
- [ ] Fluxo de contato (WhatsApp) continuar funcionando apos refactor
