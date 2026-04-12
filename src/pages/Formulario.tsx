import emailjs from "@emailjs/browser";
import { FormEvent, useMemo, useState } from "react";

type FormData = {
  companyName: string;
  role: string;
  phone: string;
  companySector: string;
  contactName: string;
  companyDescription: string;
  pains: string;
  innovationAreas: string;
};

const INITIAL_FORM: FormData = {
  companyName: "",
  role: "",
  phone: "",
  companySector: "",
  contactName: "",
  companyDescription: "",
  pains: "",
  innovationAreas: "",
};

const Formulario = () => {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<"success" | "error" | null>(null);

  const remainingChars = useMemo(
    () => 300 - formData.companyDescription.length,
    [formData.companyDescription.length],
  );

  const handleChange = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage(null);
    setStatusType(null);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatusType("error");
      setStatusMessage("Configuração de email incompleta. Defina as variáveis VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID e VITE_EMAILJS_PUBLIC_KEY.");
      return;
    }

    setIsSubmitting(true);

    try {
      const composedMessage = [
        `Nome da empresa: ${formData.companyName}`,
        `Cargo: ${formData.role}`,
        `Telefone: ${formData.phone}`,
        `Setor da empresa: ${formData.companySector}`,
        `Nome do contato: ${formData.contactName}`,
        `Descricao da empresa: ${formData.companyDescription}`,
        `Dores a resolver: ${formData.pains || "Nao informado"}`,
        `Areas para inovacao: ${formData.innovationAreas || "Nao informado"}`,
      ].join("\n");

      await emailjs.send(
        serviceId,
        templateId,
        {
          // Campos do template customizado do projeto
          company_name: formData.companyName,
          role: formData.role,
          phone: formData.phone,
          company_sector: formData.companySector,
          contact_name: formData.contactName,
          company_description: formData.companyDescription,
          pains: formData.pains,
          innovation_areas: formData.innovationAreas,
          submitted_at: new Date().toLocaleString("pt-BR"),

          // Campos de compatibilidade para templates padrão do EmailJS
          from_name: formData.contactName,
          from_email: "nao-informado@cognull.local",
          subject: `Novo lead - ${formData.companyName}`,
          message: composedMessage,
        },
        { publicKey },
      );

      setStatusType("success");
      setStatusMessage("Formulário enviado com sucesso. Em breve entraremos em contato.");
      setFormData(INITIAL_FORM);
    } catch (error: unknown) {
      const details =
        typeof error === "object" &&
        error !== null &&
        "status" in error &&
        "text" in error
          ? ` (EmailJS ${String((error as { status: number }).status)}: ${String((error as { text: string }).text)})`
          : "";

      setStatusType("error");
      setStatusMessage(`Não foi possível enviar agora.${details} Verifique Service ID, Template ID, Public Key e variáveis do template.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0B3F3F] to-[#174A4A] px-4 py-10 sm:px-6 md:px-10">
      <div className="mx-auto w-full max-w-5xl rounded-3xl border border-white/10 bg-[rgba(8,40,40,0.84)] p-6 shadow-2xl backdrop-blur-sm sm:p-8 md:p-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-label text-[10px] uppercase tracking-[0.32em] text-[#3DFF2A]">Comece por aqui</p>
            <h1 className="mt-3 font-headline text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
              Formulário de inovação
            </h1>
          </div>
          <a
            className="inline-flex items-center rounded-xl border border-white/30 px-4 py-2 font-label text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:border-[#3DFF2A] hover:text-[#E9FFE6]"
            href="/"
          >
            Voltar ao site
          </a>
        </div>

        <form className="grid grid-cols-1 gap-5 md:grid-cols-2" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-white">Nome da empresa *</span>
            <input
              className="rounded-xl border border-white/20 bg-[#0D2F2F] px-4 py-3 text-white placeholder:text-white/40 focus:border-[#3DFF2A] focus:outline-none"
              placeholder="Nome da Sua Empresa"
              required
              value={formData.companyName}
              onChange={(event) => handleChange("companyName", event.target.value)}
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-white">Cargo *</span>
            <input
              className="rounded-xl border border-white/20 bg-[#0D2F2F] px-4 py-3 text-white placeholder:text-white/40 focus:border-[#3DFF2A] focus:outline-none"
              placeholder="Head de criação"
              required
              value={formData.role}
              onChange={(event) => handleChange("role", event.target.value)}
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-white">Telefone *</span>
            <input
              className="rounded-xl border border-white/20 bg-[#0D2F2F] px-4 py-3 text-white placeholder:text-white/40 focus:border-[#3DFF2A] focus:outline-none"
              placeholder="+55 47 99999-9999"
              required
              type="tel"
              value={formData.phone}
              onChange={(event) => handleChange("phone", event.target.value)}
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-white">Setor da empresa *</span>
            <input
              className="rounded-xl border border-white/20 bg-[#0D2F2F] px-4 py-3 text-white placeholder:text-white/40 focus:border-[#3DFF2A] focus:outline-none"
              placeholder="Tecnologia"
              required
              value={formData.companySector}
              onChange={(event) => handleChange("companySector", event.target.value)}
            />
          </label>

          <label className="flex flex-col gap-2 md:col-span-2">
            <span className="text-sm font-semibold text-white">Seu nome *</span>
            <input
              className="rounded-xl border border-white/20 bg-[#0D2F2F] px-4 py-3 text-white placeholder:text-white/40 focus:border-[#3DFF2A] focus:outline-none"
              placeholder="James Web"
              required
              value={formData.contactName}
              onChange={(event) => handleChange("contactName", event.target.value)}
            />
          </label>

          <label className="flex flex-col gap-2 md:col-span-2">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-semibold text-white">Breve descrição da empresa *</span>
              <span className="text-xs text-white/60">{remainingChars} caracteres</span>
            </div>
            <textarea
              className="min-h-[96px] rounded-xl border border-white/20 bg-[#0D2F2F] px-4 py-3 text-white placeholder:text-white/40 focus:border-[#3DFF2A] focus:outline-none"
              maxLength={300}
              placeholder="Descreva em até 300 caracteres"
              required
              value={formData.companyDescription}
              onChange={(event) => handleChange("companyDescription", event.target.value)}
            />
          </label>

          <label className="flex flex-col gap-2 md:col-span-2">
            <span className="text-sm font-semibold text-white">Quais são as dores que gostaria de resolver?</span>
            <textarea
              className="min-h-[110px] rounded-xl border border-white/20 bg-[#0D2F2F] px-4 py-3 text-white placeholder:text-white/40 focus:border-[#3DFF2A] focus:outline-none"
              placeholder="Ex: Reduzir custos operacionais, melhorar a experiência do cliente, etc."
              value={formData.pains}
              onChange={(event) => handleChange("pains", event.target.value)}
            />
          </label>

          <label className="flex flex-col gap-2 md:col-span-2">
            <span className="text-sm font-semibold text-white">Quais são as principais áreas da empresa que precisam de inovação?</span>
            <textarea
              className="min-h-[110px] rounded-xl border border-white/20 bg-[#0D2F2F] px-4 py-3 text-white placeholder:text-white/40 focus:border-[#3DFF2A] focus:outline-none"
              placeholder="Ex: Vendas, Atendimento ao Cliente, Marketing, etc."
              value={formData.innovationAreas}
              onChange={(event) => handleChange("innovationAreas", event.target.value)}
            />
          </label>

          <div className="md:col-span-2">
            <button
              className="w-full rounded-xl bg-[#3DFF2A] px-6 py-4 font-label text-[11px] font-bold uppercase tracking-[0.24em] text-black transition-colors hover:bg-[#E9FFE6] disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Enviando..." : "Enviar formulário"}
            </button>
          </div>

          {statusMessage && (
            <p
              className={`md:col-span-2 rounded-xl border px-4 py-3 text-sm ${
                statusType === "success"
                  ? "border-[#3DFF2A]/40 bg-[#113f2f] text-[#d7ffe8]"
                  : "border-red-400/30 bg-red-950/35 text-red-200"
              }`}
            >
              {statusMessage}
            </p>
          )}
        </form>
      </div>
    </main>
  );
};

export default Formulario;
