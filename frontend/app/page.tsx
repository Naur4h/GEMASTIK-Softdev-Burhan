import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import StatCard from "@/components/StatCard";
import StepItem from "@/components/StepItem";

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-5 pt-6 md:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cream via-sand to-moss/60 p-8 md:p-12">
          <div className="max-w-lg">
            <h1 className="font-display text-3xl font-extrabold leading-tight text-forest-dark md:text-5xl">
              Kenali Tanahmu,
              <br />
              Tanam Lebih
              <br />
              <span className="mt-6 inline-block bg-forest px-6 rounded-lg text-cream-light">
                Beragam
              </span>
            </h1>
            <a href="/analisis" className="mt-8 inline-block">
             <Button
  variant="primary"
  className="!bg-forest !text-cream-light hover:!bg-forest"
>
  Coba Sekarang ↗
</Button>
            </a>
          </div>
          {/* Placeholder gambar tangan menabur tanah - ganti src dengan asset asli */}


          <div className="pointer-events-none absolute bottom-0 right-0 hidden h-full w-1/2 md:block">
            <div className="flex h-full items-end justify-center opacity-90">
                <Image
      src="/images/hand.png"
      alt="Hand"
      width={1000}
      height={1000}
      className="object-contain"
    />
            </div>
          </div>
        </div>
      </section>

      {/* URGENSI DIVERSIFIKASI PANGAN */}
      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <h2 className="mb-8 font-display text-2xl font-extrabold text-forest-dark md:text-3xl">
          <span className="text-clay">Urgensi</span> Diversifikasi Pangan
        </h2>
        <div className="grid gap-5 md:grid-cols-3">
          <StatCard
            title={
              <>
                Terlalu <mark className="bg-forest text-cream-light px-1">Bergantung Beras</mark>
              </>
            }
            description="Konsumsi beras 92 kg/kapita/tahun membuat Indonesia terlalu bergantung pada satu komoditas yang rentan gagal panen akibat perubahan iklim."
          />
          <StatCard
            title={
              <>
                Kebijakan Sudah Ada,{" "}
                <mark className="bg-forest text-cream-light px-1">
                  Eksekusi Belum Merata
                </mark>
              </>
            }
            description="Perpres No. 81 Tahun 2024 dorong diversifikasi pangan lokal. Tetapi, tanpa panduan konkret, pelaku pangan sulit mengetahui harus mulai dari mana."
          />
          <StatCard
            title={
              <>
                Potensi Lokal <mark className="bg-forest text-cream-light px-1">Terabaikan</mark>
              </>
            }
            description="Konsumsi pangan lokal alternatif seperti singkong, ubi jalar, dan sagu masih jauh di bawah beras. Padahal, ketiganya dapat tumbuh subur di Indonesia."
          />
        </div>
      </section>

      {/* UBAH URGENSI MENJADI AKSI NYATA */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-16 md:grid-cols-2 md:px-8">
          <div>
            <h2 className="mb-4 font-display text-2xl font-extrabold text-forest-dark md:text-3xl">
              Ubah <span className="text-clay">Urgensi</span> Menjadi{" "}
              <span className="text-clay">Aksi</span> Nyata!
            </h2>
            <p className="mb-6 leading-relaxed text-forest-dark/80">
              Ketergantungan pada beras, kebijakan yang belum terlaksana, dan
              potensi pangan lokal yang terabaikan, semuanya butuh satu
              jawaban konkret. Nusa-crop hadir untuk membantu pelaku pangan
              mengetahui komoditas lokal terbaik untuk lahan mereka!
            </p>
            <a href="/analisis">
              <Button variant="primary">Analisis Lahan Anda Sekarang ↗</Button>
            </a>
          </div>
          <div className="flex justify-center">
            <div className="flex h-56 w-56 items-center justify-center rounded-full bg-moss/30 text-sm italic text-forest-dark/50 md:h-72 md:w-72">
              <Image
      src="/images/komoditas.png"
      alt="Hand"
      width={1000}
      height={1000}
      className="object-contain"
    />
            </div>
          </div>
        </div>
      </section>

      {/* CEK REKOMENDASI 3 LANGKAH */}
      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <h2 className="mb-10 font-display text-2xl font-extrabold text-forest-dark md:text-3xl">
          Cek Rekomendasi Lahanmu dalam 3 Langkah
        </h2>
        <div className="grid gap-10 md:grid-cols-2">
          <div className="flex items-center justify-center">
           <div className="relative h-[500px] w-[340px]">

  <Image
    src="/images/rekomendasi1.png"
    alt="Rekomendasi 1"
    width={230}
    height={330}
    className="absolute right-0 top-0 rotate-[-2deg] drop-shadow-xl"
  />

  <Image
    src="/images/rekomendasi2.png"
    alt="Rekomendasi 2"
    width={210}
    height={310}
    className="absolute left-0 bottom-0 rotate-[6deg] drop-shadow-xl"
  />

</div>
          </div>
          <div>
            <StepItem
              number="01"
              title="Langkah 1: Lengkapi informasi lahan"
              description="Lengkapi informasi koordinat dan luas lahan serta target musim tanam."
            />
            <StepItem
              number="02"
              title="Langkah 2: Analisis cerdas Nusa-Crop"
              description="Algoritma kami akan memproses parameter lingkungan, mulai dari curah hujan hingga pH tanah dan data penginderaan jauh untuk mencocokkan lahan Anda dengan database pangan alternatif yang paling sesuai."
            />
            <StepItem
              number="03"
              title="Langkah 3: Terima rekomendasi"
              description="Lihat hasil analisis presisi berupa peta kondisi lahan, skor kesesuaian tanaman, hingga panduan lengkap cara budidayanya."
              isLast
            />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
