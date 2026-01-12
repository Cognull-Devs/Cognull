# Guia de Configuração do EmailJS

## Passo a Passo para Configurar o Envio de Emails

### 1. Criar Conta no EmailJS
1. Acesse: https://www.emailjs.com/
2. Clique em "Sign Up" e crie uma conta gratuita
3. Faça login na sua conta

### 2. Adicionar Serviço de Email
1. No painel, vá em **Email Services**
2. Clique em **Add New Service**
3. Escolha seu provedor (Gmail recomendado)
4. Conecte sua conta do Gmail
5. Copie o **Service ID** gerado

### 3. Criar Template de Email
1. Vá em **Email Templates**
2. Clique em **Create New Template**
3. Configure o template com estas variáveis:
   ```
   Nome: {{from_name}}
   Email: {{from_email}}
   Mensagem: {{message}}
   ```
4. Personalize o assunto e corpo do email como preferir
5. Copie o **Template ID**

### 4. Obter Public Key
1. Vá em **Account** > **General**
2. Copie sua **Public Key**

### 5. Configurar no Projeto
1. Abra o arquivo `.env.local` na raiz do projeto
2. Substitua os valores:
   ```
   VITE_EMAILJS_SERVICE_ID=seu_service_id
   VITE_EMAILJS_TEMPLATE_ID=seu_template_id
   VITE_EMAILJS_PUBLIC_KEY=sua_public_key
   ```

### 6. Reiniciar o Servidor
Após configurar, reinicie o servidor de desenvolvimento:
```bash
npm run dev
```

## Testando
1. Preencha o formulário de contato no site
2. Clique em "Enviar Mensagem"
3. Verifique sua caixa de entrada do Gmail

## Importante
- ⚠️ Não commite o arquivo `.env.local` no Git (já está no .gitignore)
- 📧 O plano gratuito permite 200 emails/mês
- ✅ Para produção, configure as variáveis no serviço de hospedagem (Vercel, Netlify, etc.)
