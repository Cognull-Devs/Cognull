import emailjs from "@emailjs/browser";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

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
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [animationReady, setAnimationReady] = useState(false);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<"success" | "error" | null>(null);

  useEffect(() => {
    let isMounted = true;
    let animationFrame = 0;
    let cleanupResize: (() => void) | null = null;
    let cleanupScene: (() => void) | null = null;

    const setupAnimation = async () => {
      const canvas = canvasRef.current;
      if (!canvas) {
        return;
      }

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isSmallScreen = window.innerWidth < 1024;
      const lowConcurrency = typeof navigator.hardwareConcurrency === "number" && navigator.hardwareConcurrency <= 4;

      if (prefersReducedMotion || isSmallScreen || lowConcurrency) {
        setAnimationReady(false);
        return;
      }

      const THREE = await import("three");
      const { gsap, Power0, Power1 } = await import("gsap");

      if (!isMounted) {
        return;
      }

      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);

      const scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0x0b3f3f, 80, 190);

      const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(0, 30, 100);

      const container = new THREE.Object3D();
      scene.add(container);

      const width = 150;
      const height = 150;
      const widthSegments = 72;
      const heightSegments = 72;
      const center = new THREE.Vector3(0, 0, 0);
      const maxDistance = new THREE.Vector3(width * 0.5, 0, height * 0.5).distanceTo(center);

      const pointCount = (widthSegments + 1) * (heightSegments + 1);
      const pointPositions = new Float32Array(pointCount * 3);
      const pointRatios = new Float32Array(pointCount);
      const pointDistances = new Float32Array(pointCount);

      let pointIndex = 0;
      for (let zi = 0; zi <= heightSegments; zi += 1) {
        const z = (zi / heightSegments) * height - height * 0.5;
        for (let xi = 0; xi <= widthSegments; xi += 1) {
          const x = (xi / widthSegments) * width - width * 0.5;
          const dist = new THREE.Vector3(x, 0, z).distanceTo(center);
          const ratio = (maxDistance - dist) / (maxDistance * 0.9);

          pointPositions[pointIndex * 3] = x * 1.2;
          pointPositions[pointIndex * 3 + 1] = 0;
          pointPositions[pointIndex * 3 + 2] = z * 1.2;
          pointRatios[pointIndex] = ratio;
          pointDistances[pointIndex] = dist;
          pointIndex += 1;
        }
      }

      const pointsGeometry = new THREE.BufferGeometry();
      pointsGeometry.setAttribute("position", new THREE.BufferAttribute(pointPositions, 3));

      const pointsMaterial = new THREE.PointsMaterial({
        color: 0x3dff2a,
        size: 0.74,
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
        sizeAttenuation: true,
      });

      const dots = new THREE.Points(pointsGeometry, pointsMaterial);
      container.add(dots);

      const planeGeometry = new THREE.PlaneGeometry(width * 2, height * 2, widthSegments, heightSegments);
      planeGeometry.rotateX(-Math.PI * 0.5);

      const planePositions = planeGeometry.attributes.position.array as Float32Array;
      const planeRatios = new Float32Array(planeGeometry.attributes.position.count);
      const planeDistances = new Float32Array(planeGeometry.attributes.position.count);

      for (let i = 0; i < planeGeometry.attributes.position.count; i += 1) {
        const x = planePositions[i * 3];
        const z = planePositions[i * 3 + 2];
        const dist = new THREE.Vector3(x, 0, z).distanceTo(center);
        const ratio = (maxDistance - dist) / (maxDistance * 0.9);
        planeRatios[i] = ratio;
        planeDistances[i] = dist;
      }

      const planeMaterial = new THREE.MeshBasicMaterial({
        color: 0x041f1f,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.38,
      });

      const plane = new THREE.Mesh(planeGeometry, planeMaterial);
      container.add(plane);

      const ease = { hole: 0, depth: 0 };

      const cameraTween = gsap.to(camera.position, {
        duration: 6,
        z: 50,
        y: 80,
        yoyo: true,
        ease: Power1.easeInOut,
        repeatDelay: 0.5,
        repeat: -1,
      });

      const rotateTween = gsap.to(container.rotation, {
        duration: 48,
        y: Math.PI * 2,
        ease: Power0.easeNone,
        repeat: -1,
      });

      const holeTween = gsap.to(ease, {
        duration: 6,
        hole: 2,
        depth: 1.5,
        yoyo: true,
        ease: Power1.easeInOut,
        repeatDelay: 0.5,
        repeat: -1,
      });

      const render = (time: number) => {
        if (!isMounted) {
          return;
        }

        if (document.hidden) {
          animationFrame = window.requestAnimationFrame(render);
          return;
        }

        const pointArray = pointsGeometry.attributes.position.array as Float32Array;
        for (let i = 0; i < pointCount; i += 1) {
          let ratioA = (pointRatios[i] * ease.depth) + ease.hole;
          ratioA *= pointRatios[i] * pointRatios[i] * pointRatios[i] * pointRatios[i];
          let y = ratioA * -150;
          y = Math.max(y, -10);
          y += Math.sin(-(pointDistances[i] * 0.74) + (time * 0.00074));
          pointArray[i * 3 + 1] = y;
        }

        for (let i = 0; i < planeGeometry.attributes.position.count; i += 1) {
          let ratioA = (planeRatios[i] * ease.depth) + ease.hole;
          ratioA *= planeRatios[i] * planeRatios[i] * planeRatios[i] * planeRatios[i];
          let y = ratioA * -150;
          y = Math.max(y, -10);
          y += Math.sin(-(planeDistances[i] * 0.74) + (time * 0.00074));
          planePositions[i * 3 + 1] = y;
        }

        pointsGeometry.attributes.position.needsUpdate = true;
        planeGeometry.attributes.position.needsUpdate = true;

        camera.lookAt(new THREE.Vector3(0, -20, 0));
        renderer.render(scene, camera);
        animationFrame = window.requestAnimationFrame(render);
      };

      animationFrame = window.requestAnimationFrame(render);
      setAnimationReady(true);

      const onResize = () => {
        if (!isMounted) {
          return;
        }

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener("resize", onResize);
      cleanupResize = () => window.removeEventListener("resize", onResize);

      cleanupScene = () => {
        cameraTween.kill();
        rotateTween.kill();
        holeTween.kill();
        pointsGeometry.dispose();
        pointsMaterial.dispose();
        planeGeometry.dispose();
        planeMaterial.dispose();
        renderer.dispose();
        setAnimationReady(false);
      };
    };

    setupAnimation();

    return () => {
      isMounted = false;
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
      cleanupResize?.();
      cleanupScene?.();
    };
  }, []);

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
    <main className="relative min-h-screen bg-gradient-to-b from-[#0B3F3F] to-[#174A4A] px-4 py-8 sm:px-6 md:px-10 md:py-10">
      <canvas className={`fixed inset-0 z-0 h-screen w-screen transition-opacity duration-500 ${animationReady ? "opacity-65" : "opacity-0"}`} ref={canvasRef} />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-20" style={{ backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "104px 104px" }} />

      <div className="relative z-10 mx-auto max-w-7xl pb-8">
        <div className="mb-6 flex justify-end">
          <a
            className="inline-flex items-center rounded-xl border border-white/30 px-4 py-2 font-label text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:border-[#3DFF2A] hover:text-[#E9FFE6]"
            href="/"
          >
            Voltar ao site
          </a>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <aside className="p-2 sm:p-3 lg:min-h-[720px]">
            <p className="font-headline text-4xl font-bold tracking-tight text-[#3DFF2A] sm:text-5xl">Cognull</p>
            <p className="mt-6 max-w-xl text-xl leading-tight text-white sm:text-3xl">
              Preencha o formulário para que possamos entender você e lhe ajudar da melhor forma possível.
            </p>
          </aside>

          <form className="border-l border-white/15 pl-0 sm:pl-0 md:grid md:grid-cols-2 md:gap-5 lg:pl-8" onSubmit={handleSubmit}>
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
      </div>
    </main>
  );
};

export default Formulario;
