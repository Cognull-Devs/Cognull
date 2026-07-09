import { useEffect, useId, useRef, type ReactNode } from "react";

type ModalMaxWidth = "2xl" | "4xl";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  eyebrow: string;
  title: string;
  maxWidth?: ModalMaxWidth;
  children: ReactNode;
};

const maxWidthClasses: Record<ModalMaxWidth, string> = {
  "2xl": "max-w-2xl",
  "4xl": "max-w-4xl",
};

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export const Modal = ({
  isOpen,
  onClose,
  eyebrow,
  title,
  maxWidth = "4xl",
  children,
}: ModalProps) => {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const triggerElement = document.activeElement as HTMLElement | null;
    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
      FOCUSABLE_SELECTOR,
    );
    focusable?.[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      triggerElement?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/55 px-4"
      onClick={onClose}
    >
      <div
        aria-labelledby={titleId}
        aria-modal="true"
        className={`w-full ${maxWidthClasses[maxWidth]} rounded-3xl border border-primary/40 bg-teal-900/[0.96] p-6 shadow-2xl backdrop-blur-sm md:p-8 md:backdrop-blur-md`}
        onClick={(event) => event.stopPropagation()}
        ref={dialogRef}
        role="dialog"
      >
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <span className="font-label text-[9px] font-bold uppercase tracking-[0.35em] text-brand">
              {eyebrow}
            </span>
            <h2
              className="mt-3 font-headline text-3xl font-bold uppercase tracking-tighter text-white md:text-4xl"
              id={titleId}
            >
              {title}
            </h2>
          </div>
          <button
            className="rounded-full border border-primary/40 px-4 py-2 font-label text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:border-brand hover:text-brand-light"
            onClick={onClose}
            type="button"
          >
            Fechar
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
