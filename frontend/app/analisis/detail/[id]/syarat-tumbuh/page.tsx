"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCropDetail } from "@/lib/useCropDetail";

export default function SyaratTumbuhPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const crop = useCropDetail(params.id);

  if (crop === undefined) return null;
  if (crop === null) {
    return (
      <div className="flex min-h-screen flex-col bg-white">
        <Navbar />
        <section className="flex flex-1 items-center justify-center px-5 text-center text-forest-dark">
          <p>Data tanaman tidak ditemukan.</p>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <section className="flex-1">
        <div className="px-4 py-3">
          <button onClick={() => router.back()} className="text-sm text-forest-dark hover:underline">
            ← Kembali
          </button>
        </div>
        <div className="relative h-44 w-full bg-gray-100">
          <Image
            src={`/images/${crop.id}.png`}
            alt={crop.nama}
            fill
            className="object-cover"
          />
        </div>
        <div className="px-4 py-5">
          <h1 className="font-display text-lg font-bold text-forest-dark">Syarat Tumbuh</h1>
          <p className="mb-3 text-sm text-forest-dark/50">{crop.nama}</p>
          <ul className="list-disc space-y-1.5 pl-4 text-sm text-forest-dark/80">
            <li>Kesuburan tanah : {crop.kesuburan_ideal}</li>
            <li>Elevasi : {crop.elevasi_ideal}</li>
            <li>pH tanah : {crop.ph_ideal}</li>
            <li>Curah Hujan : Data belum tersedia</li>
          </ul>
        </div>
      </section>
      <Footer />
    </div>
  );
}