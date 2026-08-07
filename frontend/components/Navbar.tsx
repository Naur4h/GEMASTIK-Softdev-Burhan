import Link from "next/link";
import { Globe, PlayCircle, ScanSearch, History, Menu } from "lucide-react";

type NavbarProps = {
  activeStep?: string; // contoh: "Langkah 1: Masukkan Data"
};

export default function Navbar({ activeStep }: NavbarProps) {
  return (
    <header className="w-full bg-cream-light">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Globe className="h-6 w-6 text-forest" strokeWidth={2} />
          <span className="font-display text-lg font-bold tracking-wide text-forest">
            NUSA-CROP
          </span>
        </Link>

        {/* Desktop nav actions */}
        <nav className="hidden items-center gap-3 md:flex">
          <button className="flex items-center gap-2 rounded-full border border-forest/30 px-4 py-2 text-sm font-medium text-forest hover:bg-forest/5">
            <PlayCircle className="h-4 w-4" />
            Cara pakai
          </button>
          <Link
            href="/riwayat"
            className="flex items-center gap-2 rounded-full border border-forest/30 px-4 py-2 text-sm font-medium text-forest hover:bg-forest/5"
          >
            <History className="h-4 w-4" />
            Riwayat
          </Link>
          <Link
            href="/analisis"
            className="flex items-center gap-2 rounded-full border border-forest/30 px-4 py-2 text-sm font-medium text-forest hover:bg-forest/5"
          >
            <ScanSearch className="h-4 w-4" />
            Analisis
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-forest"
          aria-label="Buka menu"
        >
          <Menu className="h-7 w-7" />
        </button>
      </div>

      {activeStep && (
        <div className="border-t border-forest/10 py-3 text-center">
          <span className="border-b-2 border-forest pb-1 text-sm font-semibold text-forest">
            {activeStep}
          </span>
        </div>
      )}
    </header>
  );
}
