const API_BASE = process.env.NEXT_PUBLIC_URL;

export type KondisiLahan = {
  status: string;
  curah_hujan: number;
  suhu: number;
  et0: number;
  elevasi: number;
  ph_tanah: number;
  nitrogen: number;
  organic_carbon: number;
  tekstur_tanah: { sand: number; silt: number; clay: number };
  kesuburan_tanah: number;
};

export type RekomendasiItem = {
  id: string;
  nama: string;
  nama_latin: string;
  kesuburan_ideal: string;
  ph_ideal: string;
  elevasi_ideal: string;
  skor_kesesuaian: number; // skala 0-1, dikali 100 pas ditampilkan
};

export type RecommendResponse = {
  status: string;
  recommendation: {
    kondisi_lahan: KondisiLahan;
    rekomendasi: RekomendasiItem[];
  };
};

export type AnalisisPayload = {
  lat: number;
  lon: number;
  luas_lahan?: number;
  musim_target?: string;
};

export async function postAnalisisLahan(
  payload: AnalisisPayload
): Promise<RecommendResponse> {
  const res = await fetch(`${API_BASE}/api/recommend/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  // Cek dua kemungkinan: gagal di level HTTP, ATAU sukses HTTP tapi body-nya bilang error
  if (!res.ok || data.status === "error") {
    const pesan = data.message || `Gagal memuat data lahan (status ${res.status})`;
    throw new Error(pesan);
  }

  return data;
}

// Kunci penyimpanan sementara antar halaman (form -> loading -> hasil)
export const STORAGE_KEY_FORM = "nusa-crop-form-payload";
export const STORAGE_KEY_RESULT = "nusa-crop-result";