const API_BASE = process.env.NEXT_PUBLIC_URL;

// Ganti ke true kalau backend lagi mati / mau develop tanpa nunggu API asli.
// Ganti balik ke false kalau backend udah hidup lagi.
const USE_MOCK = true;

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

// Data pura-pura, bentuknya PERSIS sama kayak response asli dari backend
const MOCK_RESPONSE: RecommendResponse = {
  status: "success",
  recommendation: {
    kondisi_lahan: {
      status: "success",
      curah_hujan: 2411.3,
      suhu: 24.9,
      et0: 1415.8,
      elevasi: 205.0,
      ph_tanah: 5.4,
      nitrogen: 2.41,
      organic_carbon: 59.3,
      tekstur_tanah: { sand: 32.0, silt: 34.7, clay: 33.3 },
      kesuburan_tanah: 0.9,
    },
    rekomendasi: [
      {
        id: "singkong",
        nama: "Singkong",
        nama_latin: "Manihot esculenta",
        kesuburan_ideal: "Tanah kekeringan",
        ph_ideal: "4.5 - 8.0",
        elevasi_ideal: "10 - 870 mdpl",
        skor_kesesuaian: 0.87,
      },
      {
        id: "jagung",
        nama: "Jagung",
        nama_latin: "Zea mays",
        kesuburan_ideal: "-",
        ph_ideal: "4.5 - 8.5",
        elevasi_ideal: "0 - 3000 mdpl",
        skor_kesesuaian: 0.82,
      },
      {
        id: "terong",
        nama: "Terong",
        nama_latin: "Solanum melongena L.",
        kesuburan_ideal: "-",
        ph_ideal: "5.5 - 7.5",
        elevasi_ideal: "0 - 1200 mdpl",
        skor_kesesuaian: 0.78,
      },
    ],
  },
};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function postAnalisisLahan(
  payload: AnalisisPayload
): Promise<RecommendResponse> {
  if (USE_MOCK) {
    console.log("Pakai MOCK data (backend asli tidak dipanggil). Payload:", payload);
    await delay(1500);
    return MOCK_RESPONSE;
  }

  const res = await fetch(`${API_BASE}/api/recommend/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok || data.status === "error") {
    const pesan = data.message || `Gagal memuat data lahan (status ${res.status})`;
    throw new Error(pesan);
  }

  return data;
}

export const STORAGE_KEY_FORM = "nusa-crop-form-payload";
export const STORAGE_KEY_RESULT = "nusa-crop-result";