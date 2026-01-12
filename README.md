# Cognull - Plataforma de Desenvolvimento

> Transformando ideias em soluções digitais inteligentes

## 📋 Sobre o Projeto

Site institucional da **Cognull**, empresa de desenvolvimento de software especializada em criar soluções digitais sob medida. O projeto apresenta nossos serviços, diferenciais, equipe e portfólio de forma moderna e interativa.

## ✨ Funcionalidades

- 🎨 Design moderno com animações fluidas
- 📱 Totalmente responsivo (mobile-first)
- 🌙 Otimizado para performance
- 📧 Formulário de contato integrado com EmailJS
- 🔗 Links sociais da equipe (LinkedIn, GitHub, Email)
- ⚡ Navegação suave entre seções
- 🎯 SEO otimizado

## 🚀 Tecnologias

Este projeto foi construído com as seguintes tecnologias:

- **[Vite](https://vitejs.dev/)** - Build tool ultra-rápida
- **[React](https://react.dev/)** - Biblioteca para interfaces
- **[TypeScript](https://www.typescriptlang.org/)** - JavaScript com tipagem
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utility-first
- **[shadcn/ui](https://ui.shadcn.com/)** - Componentes UI reutilizáveis
- **[EmailJS](https://www.emailjs.com/)** - Serviço de envio de emails
- **[Lucide React](https://lucide.dev/)** - Ícones modernos

## 🛠️ Instalação e Uso

### Pré-requisitos

- Node.js 18+ e npm instalados
- Git

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/Cognull-Plataforma.git

# 2. Entre na pasta do projeto
cd Cognull-Plataforma

# 3. Instale as dependências
npm install

# 4. Configure as variáveis de ambiente (opcional)
cp .env.example .env.local
# Edite o .env.local com suas credenciais do EmailJS

# 5. Inicie o servidor de desenvolvimento
npm run dev
```

O site estará disponível em `http://localhost:5173`

## 📧 Configuração do EmailJS

Para ativar o envio de emails pelo formulário de contato:

1. Crie uma conta em [EmailJS](https://www.emailjs.com/)
2. Configure um serviço de email (Gmail recomendado)
3. Crie um template de email
4. Obtenha suas credenciais (Service ID, Template ID, Public Key)
5. Adicione no arquivo `.env.local`:

```env
VITE_EMAILJS_SERVICE_ID=seu_service_id
VITE_EMAILJS_TEMPLATE_ID=seu_template_id
VITE_EMAILJS_PUBLIC_KEY=sua_public_key
```

Documentação completa: [EMAILJS_SETUP.md](./EMAILJS_SETUP.md)

## 📦 Build para Produção

```bash
# Gerar build otimizado
npm run build

# Preview do build
npm run preview
```

Os arquivos otimizados estarão na pasta `dist/`

## 🚀 Deploy

Recomendamos as seguintes plataformas para deploy:

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Outras opções
- GitHub Pages
- Cloudflare Pages
- Railway
- Render

## 📂 Estrutura do Projeto

```
Cognull-Plataforma/
├── public/              # Arquivos estáticos
│   ├── favicon.ico      # Ícone do site
│   └── robots.txt       # SEO
├── src/
│   ├── components/      # Componentes React
│   │   ├── ui/         # Componentes shadcn/ui
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── DifferentialsSection.tsx
│   │   ├── TeamSection.tsx
│   │   ├── ContactSection.tsx
│   │   └── Footer.tsx
│   ├── pages/          # Páginas
│   ├── hooks/          # Custom hooks
│   ├── lib/            # Utilitários
│   ├── App.tsx         # Componente principal
│   └── main.tsx        # Entry point
├── .env.local          # Variáveis de ambiente (não commitado)
└── package.json        # Dependências
```

## 👥 Equipe

- **Nicolas Marrai Alves Feitosa** - Co-founder | Backend & Arquitetura
- **Lucca Pontes Menezes** - Co-founder | Frontend & UI/UX
- **Cauã Sarraf Ferri** - Co-founder | Integrações & Automações

## 📄 Licença

Este projeto é propriedade da **Cognull** e todos os direitos são reservados.

## 📞 Contato

- 🌐 Website: [em breve]
- 📧 Email: cognull.Dev@gmail.com
- 💼 LinkedIn: [Cognull](https://www.linkedin.com/company/cognull)

---

Desenvolvido com ❤️ pela equipe **Cognull**
