"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Modal from "@/components/Modal";
import { Check, Circle, Loader2 } from "lucide-react";
import { postAnalisisLahan, STORAGE_KEY_FORM, STORAGE_KEY_RESULT } from "@/lib/api";

const steps = ["Data satelit", "Data cuaca", "Data tanah", "Data elevasi"];

export default function LoadingPage() {
  const router = useRouter();
  const [doneCount, setDoneCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const raw = sessionStorage.getItem(STORAGE_KEY_FORM);
    if (!raw) {
      router.push("/analisis");
      return;
    }
    const payload = JSON.parse(raw);

    // Animasi checklist jalan pelan-pelan sambil nunggu response asli
    const tick = setInterval(() => {
      setDoneCount((c) => (c < steps.length - 1 ? c + 1 : c));
    }, 700);

    postAnalisisLahan(payload)
      .then((data) => {
        clearInterval(tick);
        setDoneCount(steps.length);
        sessionStorage.setItem(STORAGE_KEY_RESULT, JSON.stringify(data));
        
        setTimeout(() => router.push("/analisis/hasil"), 500);
      })
      .catch((err) => {
    console.error("Gagal fetch:", err);
  clearInterval(tick);
  setErrorMessage(err.message || "Terjadi kesalahan yang tidak diketahui.");
  setShowError(true);
      });

    return () => clearInterval(tick);
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar activeStep="Langkah 2: Analisis Cerdas NUSA-CROP" />

      <section className="flex flex-1 items-center justify-center px-5 py-10 md:px-8">
        <div className="w-full max-w-md rounded-3xl bg-forest p-10 text-center text-cream-light">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-cream-light">
            <Loader2 className="h-8 w-8 animate-spin text-forest" />
          </div>
          <h2 className="mb-6 font-display text-xl font-bold">Menganalisis Lahan Anda...</h2>
          <ul className="mx-auto max-w-xs space-y-3 text-left">
            {steps.map((s, i) => (
              <li key={s} className="flex items-center gap-2 text-sm">
                {i < doneCount ? (
                  <Check className="h-4 w-4 text-cream-light" />
                ) : (
                  <Circle className="h-4 w-4 text-cream-light/50" />
                )}
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Footer />

 <Modal
  open={showError}
  onClose={() => router.push("/analisis")}
  variant="error"
  title="Gagal Memuat Data Lahan"
  description={errorMessage || "Koneksi ke server data satelit atau cuaca sedang terganggu. Silakan periksa koneksi internet Anda atau coba beberapa saat lagi."}
  onConfirm={() => window.location.reload()}
/>
    </div>
  );
}