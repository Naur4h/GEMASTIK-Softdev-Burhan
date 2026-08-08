"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CircularGauge from "@/components/CircularGauge";
import { Leaf, Calendar, BarChart3 } from "lucide-react";

const tabs = ["Cara Budidaya", "Syarat Tumbuh", "Manfaat"];

const tabContent: Record<
  string,
  { title: string; paragraphs: string[] }
> = {
  "Cara Budidaya": {
    title: "Cara Budidaya Tanaman",
    paragraphs: [
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.",
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.",
    ],
  },

  "Syarat Tumbuh": {
    title: "Syarat Tumbuh Tanaman",
    paragraphs: [
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat.",
    ],
  },

  Manfaat: {
    title: "Manfaat Tanaman",
    paragraphs: [
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat.",
    ],
  },
};

const alasanRekomendasi = [
  "Tahan kondisi kering — curah hujan lahan Anda (340 mm/musim) sesuai toleransi tanaman ini",
  "pH tanah masam (5.2) masih dalam batas yang bisa ditoleransi",
  "Cocok untuk lahan dengan tingkat kesuburan rendah",
];

const allAlternatif = [
  { name: "SORGHUM", score: 78 },
  { name: "SORGHUM", score: 55 },
  { name: "SORGHUM", score: 40 },
  { name: "SINGKONG", score: 34 },
  { name: "UBI JALAR", score: 28 },
];

const ALT_TOP_COUNT = 3;

export default function DetailTanamanPage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("Cara Budidaya");
  const [showAllAlt, setShowAllAlt] = useState(false);

  const content = tabContent[activeTab];

  const visibleAlternatif = showAllAlt
    ? allAlternatif
    : allAlternatif.slice(0, ALT_TOP_COUNT);

  return (
    <>
      <Navbar />

      <section className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 md:px-8">
        <button
          onClick={() => router.back()}
          className="mb-4 text-sm text-forest-dark hover:underline"
        >
          ← Kembali ke hasil analisis
        </button>

        <div className="grid gap-5 md:grid-cols-[1.6fr_1fr]">
          {/* KIRI: info tanaman */}
          <div className="rounded-3xl bg-forest p-6 text-cream-light md:p-8">
            <div className="grid gap-6 md:grid-cols-[220px_1fr]">
              <div className="flex items-center justify-center rounded-2xl bg-cream-light p-4">
                <div className="relative h-52 w-full rounded-2xl bg-cream-light">
                  {/* GAMBAR TANAMAN NANTI DI SINI */}
                </div>
              </div>

              <div>
                <h1 className="font-display text-3xl font-bold">
                  Sorghum
                </h1>

                <p className="mb-3 italic text-cream-light/70">
                  (Sorghum Bicolor)
                </p>

                <p className="mb-3 text-sm leading-relaxed text-cream-light/90">
                  Sorghum adalah tanaman pangan yang toleran terhadap kondisi
                  lahan kering dan marginal. Tanaman ini mampu tumbuh pada
                  tanah dengan kesuburan rendah serta memiliki kebutuhan air
                  yang relatif rendah.
                </p>

                <p className="text-sm leading-relaxed text-cream-light/90">
                  Sorghum adalah tanaman pangan yang toleran terhadap kondisi
                  lahan kering dan marginal. Tanaman ini mampu tumbuh pada
                  tanah dengan kesuburan rendah serta memiliki kebutuhan air
                  yang relatif rendah.
                </p>
              </div>
            </div>

            {/* Row icon: Jenis Tanaman / Umur Panen / Potensi Hasil */}
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
                  <p className="text-cream-light/70">8-12 bulan</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-cream-light/80" />

                <div className="text-xs leading-tight">
                  <p className="font-semibold">Potensi Hasil</p>
                  <p className="text-cream-light/70">20-30 ton/ha</p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-6 flex gap-6 border-b border-cream-light/20">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`pb-2 text-sm font-semibold ${
                    activeTab === t
                      ? "border-b-2 border-cream-light text-cream-light"
                      : "text-cream-light/50"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="mt-4 rounded-2xl bg-sand p-5 text-sm leading-relaxed text-forest-dark">
              <h4 className="mb-3 font-display font-bold">
                {content.title}
              </h4>

              <div className="space-y-3">
                {content.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>

          {/* KANAN: ringkasan rekomendasi */}
          <div className="space-y-4">
            <h3 className="font-display text-xl font-bold text-forest-dark">
              Ringkasan Rekomendasi
            </h3>

            {/* Skor Kesesuaian */}
            <div className="rounded-2xl bg-sand p-5">
              <CircularGauge
                value={90}
                label="Skor Kesesuaian"
                sublabel="Sangat Sesuai"
              />
            </div>

            {/* Tingkat Keyakinan */}
            <div className="rounded-2xl bg-sand p-5">
              <CircularGauge
                value={82}
                label="Tingkat Keyakinan Model"
                sublabel="Tinggi"
              />
            </div>

            {/* Alternatif Lain */}
            <div className="rounded-2xl bg-sand p-5 text-sm">
              <p className="mb-2 font-semibold text-forest-dark">
                Alternatif Lain
              </p>

              <ul className="mb-3 space-y-1 text-forest-dark/80">
                {visibleAlternatif.map((alt, i) => (
                  <li
                    key={i}
                    className="flex justify-between"
                  >
                    <span>
                      {i + 1}. {alt.name}
                    </span>

                    <span>{alt.score}%</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setShowAllAlt((v) => !v)}
                className="w-full rounded-full bg-forest py-2 text-xs font-semibold text-cream-light hover:bg-forest-dark"
              >
                {showAllAlt
                  ? "Sembunyikan ↑"
                  : "Lihat Semua Alternatif →"}
              </button>
            </div>

            {/* Alasan Rekomendasi */}
            <div className="rounded-2xl bg-sand p-5 text-sm">
              <p className="mb-2 font-semibold text-forest-dark">
                Alasan Rekomendasi
              </p>

              <ul className="list-disc space-y-2 pl-4 text-forest-dark/80">
                {alasanRekomendasi.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}