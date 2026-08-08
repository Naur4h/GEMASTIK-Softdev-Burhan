"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CircularGauge from "@/components/CircularGauge";
import { Leaf, Calendar, BarChart3 } from "lucide-react";
import { RecommendResponse, STORAGE_KEY_RESULT } from "@/lib/api";

const tabs = ["Cara Budidaya", "Syarat Tumbuh", "Manfaat"];

const tabContent: Record<string, { title: string; paragraphs: string[] }> = {
  "Cara Budidaya": {
    title: "Cara Budidaya Tanaman",
    paragraphs: ["Data cara budidaya belum tersedia dari server. Menunggu endpoint detail tanaman."],
  },
  "Syarat Tumbuh": {
    title: "Syarat Tumbuh Tanaman",
    paragraphs: ["Data syarat tumbuh belum tersedia dari server."],
  },
  Manfaat: {
    title: "Manfaat Tanaman",
    paragraphs: ["Data manfaat belum tersedia dari server."],
  },
};

const cropImages: Record<string, string> = {
  sorgum: "/images/sorgum.png",
  jagung: "/images/jagung.png",
  singkong: "/images/singkong.png",
  terong: "/images/terong.png",
};
const FALLBACK_IMAGE = "/images/sorgum.png";

const ALT_TOP_COUNT = 3;

export default function DetailTanamanPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("Cara Budidaya");
  const [showAllAlt, setShowAllAlt] = useState(false);
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

  const allRekomendasi = data.recommendation.rekomendasi;
  const crop = allRekomendasi.find((r) => r.id === params.id);

  if (!crop) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <section className="flex flex-1 items-center justify-center px-5 text-center text-forest-dark">
          <p>Data tanaman tidak ditemukan. Coba analisis ulang.</p>
        </section>
        <Footer />
      </div>
    );
  }

  const imageSrc = cropImages[crop.id] || FALLBACK_IMAGE;
  const content = tabContent[activeTab];
  const alternatif = allRekomendasi.filter((r) => r.id !== crop.id);
  const visibleAlternatif = showAllAlt ? alternatif : alternatif.slice(0, ALT_TOP_COUNT);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <section className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 md:px-8">
        <button
          onClick={() => router.push("/analisis/hasil")}
          className="mb-4 text-sm text-forest-dark hover:underline"
        >
          ← Kembali ke hasil analisis
        </button>

        <div className="grid gap-5 md:grid-cols-[1.6fr_1fr]">
          <div className="rounded-3xl bg-forest p-6 text-cream-light md:p-8">
            <div className="grid gap-6 md:grid-cols-[220px_1fr]">
              <div className="flex items-center justify-center rounded-2xl bg-cream-light p-4">
                <div className="relative h-52 w-full">
                  <Image src={imageSrc} alt={crop.nama} fill className="object-contain" />
                </div>
              </div>

              <div>
                <h1 className="font-display text-3xl font-bold">{crop.nama}</h1>
                <p className="mb-3 italic text-cream-light/70">({crop.nama_latin})</p>
                <p className="text-sm leading-relaxed text-cream-light/90">
                  Toleran terhadap {crop.kesuburan_ideal.toLowerCase()}, cocok ditanam pada
                  pH tanah {crop.ph_ideal} dan elevasi {crop.elevasi_ideal}.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-6 border-t border-cream-light/20 pt-5">
              <div className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-cream-light/80" />
                <div className="text-xs leading-tight">
                  <p className="font-semibold">Jenis Tanaman</p>
                  <p className="text-cream-light/70">Pangan</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-cream-light/80" />
                <div className="text-xs leading-tight">
                  <p className="font-semibold">Umur Panen</p>
                  <p className="text-cream-light/70">Belum tersedia</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-cream-light/80" />
                <div className="text-xs leading-tight">
                  <p className="font-semibold">Potensi Hasil</p>
                  <p className="text-cream-light/70">Belum tersedia</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-6 border-b border-cream-light/20">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`pb-2 text-sm font-semibold ${
                    activeTab === t ? "border-b-2 border-cream-light text-cream-light" : "text-cream-light/50"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="mt-4 rounded-2xl bg-sand p-5 text-sm leading-relaxed text-forest-dark">
              <h4 className="mb-3 font-display font-bold">{content.title}</h4>
              <div className="space-y-3">
                {content.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-display text-xl font-bold text-forest-dark">Ringkasan Rekomendasi</h3>

            <div className="rounded-2xl bg-sand p-5">
              <CircularGauge
                value={Math.round(crop.skor_kesesuaian * 100)}
                label="Skor Kesesuaian"
                sublabel={crop.skor_kesesuaian > 0.7 ? "Sangat Sesuai" : "Cukup Sesuai"}
              />
            </div>

            <div className="rounded-2xl bg-sand p-5 text-sm">
              <p className="mb-2 font-semibold text-forest-dark">Alternatif Lain</p>
              <ul className="mb-3 space-y-1 text-forest-dark/80">
                {visibleAlternatif.map((alt, i) => (
                  <li key={alt.id} className="flex justify-between">
                    <button
                      onClick={() => router.push(`/analisis/detail/${alt.id}`)}
                      className="text-left hover:underline"
                    >
                      {i + 1}. {alt.nama.toUpperCase()}
                    </button>
                    <span>{Math.round(alt.skor_kesesuaian * 100)}%</span>
                  </li>
                ))}
              </ul>
              {alternatif.length > ALT_TOP_COUNT && (
                <button
                  onClick={() => setShowAllAlt((v) => !v)}
                  className="w-full rounded-full bg-forest py-2 text-xs font-semibold text-cream-light hover:bg-forest-dark"
                >
                  {showAllAlt ? "Sembunyikan ↑" : "Lihat Semua Alternatif →"}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}