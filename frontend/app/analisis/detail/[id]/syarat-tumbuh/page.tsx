
"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RiwayatModal from "@/components/RiwayatModal";
import { useCropDetail } from "@/lib/useCropDetail";

export default function SyaratTumbuhPage() {
  const [showRiwayat, setShowRiwayat] = useState(false);
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const crop = useCropDetail(params.id);

  if (crop === undefined) return null;

  if (crop === null) {
    return (
      <div className="flex min-h-screen flex-col bg-white">
        <Navbar onRiwayatClick={() => setShowRiwayat(true)} />

        <section className="flex flex-1 items-center justify-center px-4 py-6">
          Data tanaman tidak ditemukan.
        </section>

        <Footer />

        <RiwayatModal
          open={showRiwayat}
          onClose={() => setShowRiwayat(false)}
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar onRiwayatClick={() => setShowRiwayat(true)} />

      <section className="flex-1 px-4 py-5">
        <button
          onClick={() => router.back()}
          className="text-sm text-forest-dark hover:underline"
        >
          ← Kembali
        </button>

        <div className="relative mt-4 h-44 w-full bg-gray-100">
          <Image
            src={`/images/${crop.id}.png`}
            alt={crop.nama}
            fill
            className="object-cover"
          />
        </div>

        <h2 className="mt-5 font-display text-lg font-bold text-forest-dark">
          Syarat Tumbuh
        </h2>

        <p className="mb-5 text-base font-semibold text-forest-dark">
          {crop.nama}
        </p>

        <div className="space-y-3 text-sm text-forest-dark">
          <p>
            <span className="font-semibold">Kesuburan tanah :</span>{" "}
            {crop.kesuburan_ideal}
          </p>

          <p>
            <span className="font-semibold">Elevasi :</span>{" "}
            {crop.elevasi_ideal}
          </p>

          <p>
            <span className="font-semibold">pH tanah :</span>{" "}
            {crop.ph_ideal}
          </p>

          <p>
            <span className="font-semibold">Curah Hujan :</span>{" "}
            Data belum tersedia
          </p>
        </div>
      </section>

      <Footer />

      <RiwayatModal
        open={showRiwayat}
        onClose={() => setShowRiwayat(false)}
      />
    </div>
  );
}

