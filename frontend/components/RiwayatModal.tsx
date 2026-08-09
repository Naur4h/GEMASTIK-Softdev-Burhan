// "use client";

// import { ChevronRight } from "lucide-react";

// type RiwayatItem = {
//   nama: string;
//   koordinat: string;
//   rekomendasiTeratas: string;
// };

// const dummyRiwayat: RiwayatItem[] = [
//   { nama: "Nama", koordinat: "-7.9125, 110.5875", rekomendasiTeratas: "Singkong (87%)" },
//   { nama: "Nama", koordinat: "-7.9125, 110.5875", rekomendasiTeratas: "Singkong (87%)" },
//   { nama: "Nama", koordinat: "-7.9125, 110.5875", rekomendasiTeratas: "Singkong (87%)" },
// ];

// export default function RiwayatModal({
//   open,
//   onClose,
// }: {
//   open: boolean;
//   onClose: () => void;
// }) {
//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5">
//       <div className="w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-xl">
//         <div className="bg-[#8BAA5C] px-5 py-4">
//           <h2 className="font-display text-lg font-bold text-white">RIWAYAT</h2>
//         </div>
//         <div className="space-y-3 px-5 py-5">
//        {dummyRiwayat.map((item, i) => (
//   <button
//     key={i}
//     className="flex w-full items-stretch overflow-hidden rounded-2xl bg-white shadow-sm"
//   >
//     <span className="flex w-10 shrink-0 items-center justify-center bg-moss font-display text-lg font-bold text-white">
//       {i + 1}
//     </span>
//     <span className="flex flex-1 items-center gap-2 px-3 py-3">
//       <span className="flex-1 text-xs text-forest-dark">
//         <span className="block font-semibold">{item.nama}</span>
//         <span className="block text-forest-dark/60">• koordinat</span>
//         <span className="block text-forest-dark/60">
//           • Rekomendasi teratas: {item.rekomendasiTeratas}
//         </span>
//       </span>
//       <ChevronRight className="h-4 w-4 shrink-0 text-forest-dark/40" />
//     </span>
//   </button>
// ))}
       
//         </div>
//         <div className="px-5 pb-5">
//           <button
//             onClick={onClose}
//             className="w-full rounded-full bg-forest py-2.5 text-sm font-semibold text-white"
//           >
//             TUTUP
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { ChevronRight } from "lucide-react";

type RiwayatItem = {
  nama: string;
  koordinat: string;
  rekomendasiTeratas: string;
};

const dummyRiwayat: RiwayatItem[] = [
  {
    nama: "Nama",
    koordinat: "-7.9125, 110.5875",
    rekomendasiTeratas: "Singkong (87%)",
  },
  {
    nama: "Nama",
    koordinat: "-7.9125, 110.5875",
    rekomendasiTeratas: "Singkong (87%)",
  },
  {
    nama: "Nama",
    koordinat: "-7.9125, 110.5875",
    rekomendasiTeratas: "Singkong (87%)",
  },
];

export default function RiwayatModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4">
      <div className="relative z-[10000] w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-xl">
        {/* HEADER */}
        <div className="bg-forest px-5 py-4">
          <h2 className="font-display text-lg font-bold text-white">
            RIWAYAT
          </h2>
        </div>

        {/* LIST RIWAYAT */}
        <div className="space-y-3 px-5 py-5">
          {dummyRiwayat.map((item, i) => (
            <button
              key={i}
              className="flex w-full items-stretch overflow-hidden rounded-2xl bg-white shadow-sm"
            >
              <span className="flex w-12 shrink-0 items-center justify-center bg-moss font-display text-lg font-bold text-white">
                {i + 1}
              </span>

              <span className="flex flex-1 items-center gap-2 px-3 py-3">
                <span className="flex-1 text-left text-xs text-forest-dark">
                  <span className="block font-semibold">{item.nama}</span>

                  <span className="block text-forest-dark/60">
                    • {item.koordinat}
                  </span>

                  <span className="block text-forest-dark/60">
                    • Rekomendasi teratas: {item.rekomendasiTeratas}
                  </span>
                </span>

                <ChevronRight className="h-4 w-4 shrink-0 text-forest-dark/40" />
              </span>
            </button>
          ))}
        </div>

        {/* TUTUP */}
        <div className="px-5 pb-5">
          <button
            onClick={onClose}
            className="w-full rounded-full bg-forest py-2.5 text-sm font-semibold text-white"
          >
            TUTUP
          </button>
        </div>
      </div>
    </div>
  );
}