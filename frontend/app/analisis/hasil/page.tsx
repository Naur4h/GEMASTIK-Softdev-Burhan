"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import InfoStat from "@/components/InfoStat";
import NdviScale from "@/components/NdviScale";
import RecommendationCard from "@/components/RecommendationCard";
import { RecommendResponse, STORAGE_KEY_RESULT } from "@/lib/api";

export default function HasilPage() {
  const router = useRouter();
  const [showResetModal, setShowResetModal] = useState(false);
  const [data, setData] = useState<RecommendResponse | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem(STORAGE_KEY_RESULT);
    if (!raw) {
      router.push("/analisis");
      return;
    }
    setData(JSON.parse(raw));
  }, [router]);

  if (!data) return null;

  const { kondisi_lahan, rekomendasi } = data.recommendation;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar activeStep="Langkah 3: Terima Rekomendasi" />

      <section className="mx-auto w-full max-w-4xl flex-1 px-5 py-10 md:px-8">
        <button onClick={() => router.push("/analisis")} className="mb-4 text-sm text-forest-dark hover:underline">
          ← Kembali untuk analisis
        </button>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl bg-cream-light p-6 shadow-sm md:self-start">
            <h3 className="mb-4 font-display text-sm font-bold uppercase text-forest-dark">
              Kondisi Lingkungan Terdeteksi
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <InfoStat
                label="Curah Hujan"
                value={String(kondisi_lahan.curah_hujan)}
                unit="mm/musim"
                tag={kondisi_lahan.curah_hujan < 1000 ? "Kering" : "Cukup"}
              />
              <InfoStat
                label="pH Tanah"
                value={String(kondisi_lahan.ph_tanah)}
                tag={kondisi_lahan.ph_tanah < 6 ? "Masam" : "Netral"}
              />
              <InfoStat label="Elevasi" value={String(kondisi_lahan.elevasi)} unit="mdpl" tag="" />
              <InfoStat
                label="Kesuburan Tanah"
                value={String(kondisi_lahan.kesuburan_tanah)}
                tag={kondisi_lahan.kesuburan_tanah > 0.6 ? "Subur" : "Sedang"}
              />
            </div>
            <NdviScale />
          </div>

          <div className="rounded-3xl bg-cream-light p-6 shadow-sm">
            <h3 className="mb-4 font-display text-sm font-bold uppercase text-forest-dark">
              Rekomendasi Tanaman Lokal
            </h3>

            <div className="space-y-3">
              {rekomendasi.map((r, i) => (
                <RecommendationCard
                  key={r.id}
                  rank={i + 1}
                  name={r.nama}
                  latin={r.nama_latin}
                  note={`${r.kesuburan_ideal} | pH ${r.ph_ideal}`}
                  score={Math.round(r.skor_kesesuaian * 100)}
                  onClick={() => router.push(`/analisis/detail/${r.id}`)}
                />
              ))}
            </div>
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
    </div>
  );
}