"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { MapPin } from "lucide-react";

// Leaflet cuma bisa jalan di client, jadi SSR harus dimatikan
const MapPicker = dynamic(() => import("@/components/MapPicker"), {
  ssr: false,
  loading: () => (
    <div className="flex h-40 items-center justify-center rounded-xl bg-cream-light/90 text-sm italic text-forest-dark/50">
      Memuat peta...
    </div>
  ),
});

export default function AnalisisPage() {
  const router = useRouter();
  const [showResetModal, setShowResetModal] = useState(false);
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);

  const handleMapSelect = (newLat: number, newLng: number) => {
    setLat(Number(newLat.toFixed(4)));
    setLng(Number(newLng.toFixed(4)));
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      handleMapSelect(pos.coords.latitude, pos.coords.longitude);
    });
  };

  const handleSubmit = () => {
    router.push("/analisis/loading");
  };

  const handleReset = () => {
    setShowResetModal(true);
  };

  return (
    <>
      <Navbar activeStep="Langkah 1: Masukkan Data" />
      <section className="mx-auto max-w-2xl px-5 py-10 md:px-8">
        <div className="rounded-3xl bg-forest p-6 text-cream-light md:p-10">
          <h2 className="mb-1 font-display text-lg font-bold">MASUKKAN KOORDINAT ANDA</h2>
          <p className="mb-5 text-sm text-cream-light/80">
            Klik untuk pilih lokasi pada peta, atau masukkan koordinat secara manual
          </p>

          <MapPicker lat={lat} lng={lng} onSelect={handleMapSelect} />

          <div className="my-4 flex items-center gap-3 text-xs text-cream-light/60">
            <div className="h-px flex-1 bg-cream-light/30" />
            OR
            <div className="h-px flex-1 bg-cream-light/30" />
          </div>

          <button
            onClick={handleUseCurrentLocation}
            className="mb-4 flex w-full items-center justify-center gap-2 rounded-full bg-forest-dark py-3 text-sm font-semibold hover:bg-forest-dark/80"
          >
            <MapPin className="h-4 w-4" />
            Gunakan lokasimu sekarang
          </button>

          <div className="my-4 flex items-center gap-3 text-xs text-cream-light/60">
            <div className="h-px flex-1 bg-cream-light/30" />
            OR
            <div className="h-px flex-1 bg-cream-light/30" />
          </div>

          <p className="mb-2 text-sm font-semibold">Masukkan secara manual</p>
          <div className="mb-4 grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-bold uppercase">Lintang (Latitude)</label>
              <input
                type="text"
                placeholder="Contoh: -6.0288"
                value={lat ?? ""}
                onChange={(e) => setLat(e.target.value === "" ? null : Number(e.target.value))}
                className="w-full rounded-lg bg-cream-light px-3 py-2 text-sm text-forest-dark outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold uppercase">Bujur (Longitude)</label>
              <input
                type="text"
                placeholder="Contoh: 106.4856"
                value={lng ?? ""}
                onChange={(e) => setLng(e.target.value === "" ? null : Number(e.target.value))}
                className="w-full rounded-lg bg-cream-light px-3 py-2 text-sm text-forest-dark outline-none"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="mb-1 block text-xs font-bold uppercase">
              Masukkan Luas Lahan (Opsional)
            </label>
            <input
              type="text"
              placeholder="Masukkan luas lahan (hektar). Contoh: 67"
              className="w-full rounded-lg bg-cream-light px-3 py-2 text-sm text-forest-dark outline-none"
            />
          </div>

          <div className="mb-6">
            <label className="mb-1 block text-xs font-bold uppercase">
              Masukkan Target Musim Tanam (Opsional)
            </label>
            <select className="w-full rounded-lg bg-cream-light px-3 py-2 text-sm text-forest-dark outline-none">
              <option>Pilih musim tanam</option>
              <option>Musim Hujan</option>
              <option>Musim Kemarau</option>
            </select>
          </div>

          <div className="flex gap-3">
            <Button variant="primary" className="!bg-cream-light !text-forest-dark" onClick={handleSubmit}>
              KIRIM
            </Button>
            <Button variant="secondary" className="!bg-transparent !text-cream-light border-cream-light/40" onClick={handleReset}>
              KOSONGKAN
            </Button>
          </div>
        </div>
      </section>
      <Footer />

      <Modal
        open={showResetModal}
        onClose={() => setShowResetModal(false)}
        title="Kosongkan semua data yang diisi?"
        onConfirm={() => {
          setLat(null);
          setLng(null);
          setShowResetModal(false);
        }}
      />
    </>
  );
}