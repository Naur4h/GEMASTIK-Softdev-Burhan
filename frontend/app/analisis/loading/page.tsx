"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check, Circle, Loader2 } from "lucide-react";

const steps = ["Data satelit", "Data cuaca", "Data tanah", "Data elevasi"];

export default function LoadingPage() {
  const router = useRouter();
  const [doneCount, setDoneCount] = useState(0);

  useEffect(() => {
    if (doneCount >= steps.length) {
      const t = setTimeout(() => router.push("/analisis/hasil"), 600);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setDoneCount((c) => c + 1), 800);
    return () => clearTimeout(t);
  }, [doneCount, router]);

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
    </div>
  );
}