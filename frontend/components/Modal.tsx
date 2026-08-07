"use client";

import { ReactNode } from "react";
import { AlertCircle } from "lucide-react";
import Button from "./Button";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  variant?: "confirm" | "error";
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  children?: ReactNode;
};

export default function Modal({
  open,
  onClose,
  variant = "confirm",
  title,
  description,
  confirmLabel = "Ya",
  cancelLabel = "Batal",
  onConfirm,
}: ModalProps) {
  if (!open) return null;

  const isError = variant === "error";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-forest-dark/60 p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="w-full max-w-lg rounded-[2.5rem] border-4 border-forest-dark bg-moss px-8 py-12 text-center text-cream-light shadow-xl md:px-14">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-alert">
          <AlertCircle className="h-8 w-8 text-cream-light" strokeWidth={2.5} />
        </div>

        <h2
          id="modal-title"
          className="mb-2 font-display text-2xl font-bold leading-snug md:text-3xl"
        >
          {title}
        </h2>

        {description && (
          <p className="mb-6 text-sm leading-relaxed text-cream-light/85">
            {description}
          </p>
        )}

        <div className={`flex justify-center gap-4 ${description ? "mt-2" : "mt-10"}`}>
          <button
            onClick={onConfirm ?? onClose}
            className="rounded-full bg-forest-dark px-10 py-3 text-base font-semibold text-cream-light transition-colors hover:bg-forest"
          >
            {isError ? "Coba lagi" : confirmLabel}
          </button>
          <button
            onClick={onClose}
            className="rounded-full bg-cream-light px-10 py-3 text-base font-semibold text-forest-dark transition-colors hover:bg-cream"
          >
            {isError ? "Tutup" : cancelLabel}
          </button>
        </div>
      </div>
    </div>
  );
}