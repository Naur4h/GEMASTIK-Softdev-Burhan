"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import InfoStat from "@/components/InfoStat";
import RecommendationCard from "@/components/RecommendationCard";
import { ChevronUp, ChevronDown } from "lucide-react";
import NdviScale from "@/components/NdviScale";

const allRecommendations = [
  { rank: 1 as const, name: "Sorgum", latin: "Sorghum bicolor", note: "Tahan kekeringan | pH 5.0-8.5 | dataran menengah", score: 90 },
  { rank: 2 as const, name: "Sorgum", latin: "Sorghum bicolor", note: "Tahan kekeringan | pH 5.0-8.5 | dataran menengah", score: 78 },
  { rank: 3 as const, name: "Sorgum", latin: "Sorghum bicolor", note: "Tahan kekeringan | pH 5.0-8.5 | dataran menengah", score: 55 },
  { rank: 3 as const, name: "Singkong", latin: "Manihot esculenta", note: "Tahan lahan marginal | pH 4.5-8.0 | dataran rendah-tinggi", score: 47 },
  { rank: 3 as const, name: "Ubi Jalar", latin: "Ipomoea batatas", note: "Tahan kekeringan sedang | pH 5.5-6.5 | dataran rendah", score: 40 },
  { rank: 3 as const, name: "Jagung", latin: "Zea mays", note: "Butuh curah hujan cukup | pH 5.5-7.5 | dataran rendah-menengah", score: 32 },
];

const TOP_COUNT = 3;

export default function HasilPage() {
  const router = useRouter();
  const [showResetModal, setShowResetModal] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const visibleRecommendations = showAll
    ? allRecommendations
    : allRecommendations.slice(0, TOP_COUNT);

  return (
    <>
      <Navbar activeStep="Langkah 3: Terima Rekomendasi" />
      <section className="mx-auto max-w-4xl px-5 py-10 md:px-8">
        <button onClick={() => router.push("/analisis")} className="mb-4 text-sm text-forest-dark hover:underline">
          ← Kembali untuk analisis
        </button>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl bg-cream-light p-6 shadow-sm md:self-start">
            <h3 className="mb-4 font-display text-sm font-bold uppercase text-forest-dark">
              Kondisi Lingkungan Terdeteksi
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <InfoStat label="Curah Hujan" value="340" unit="mm/musim" tag="Kering" />
              <InfoStat label="pH Tanah" value="5.2" tag="Masam" />
              <InfoStat label="Elevasi" value="780" unit="mdpl" tag="" />
              <InfoStat label="NDVI Rata-rata" value="0.31" tag="Rendah" />
            </div>
            <NdviScale />
          </div>

          <div className="rounded-3xl bg-cream-light p-6 shadow-sm">
            <h3 className="mb-4 font-display text-sm font-bold uppercase text-forest-dark">
              Rekomendasi Tanaman Lokal
            </h3>

            <div className="space-y-3">
              {visibleRecommendations.map((r, i) => (
                <RecommendationCard key={i} {...r} onClick={() => router.push("/analisis/detail")} />
              ))}
            </div>

            <Button
              variant="ghost"
              className="mt-4 flex w-full items-center justify-center gap-1"
              onClick={() => setShowAll((v) => !v)}
            >
              {showAll ? (
                <>
                  Sembunyikan sebagian <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  Lihat semua rekomendasi <ChevronDown className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Button variant="secondary" onClick={() => setShowResetModal(true)}>
            ISI ULANG DATA
          </Button>
        </div>
      </section>
      <Footer />

      <Modal
        open={showResetModal}
        onClose={() => setShowResetModal(false)}
        title="Isi ulang data?"
        onConfirm={() => router.push("/analisis")}
      />
    </>
  );
}