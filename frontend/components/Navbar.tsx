import Link from "next/link";
import { Globe, PlayCircle, History, ScanSearch } from "lucide-react";

type NavbarProps = {
  activeStep?: string;
  onRiwayatClick?: () => void;
};

export default function Navbar({ activeStep, onRiwayatClick }: NavbarProps) {
  return (
    <header className="w-full bg-header">
      <div className="flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-1.5">
          <Globe className="h-5 w-5 text-cream-light" strokeWidth={2} />
          <span className="font-display text-sm font-bold tracking-wide text-cream-light">
            NUSA-CROP
          </span>
        </Link>

        <div className="flex items-center gap-2">
         <Link
  href="/#cara-pakai"
  className="flex items-center gap-1 rounded-full bg-cream-light px-3 py-1.5 text-xs font-semibold text-forest-dark"
>
  <PlayCircle className="h-3.5 w-3.5" />
  Cara pakai
</Link>
          {onRiwayatClick ? (
            <button
              onClick={onRiwayatClick}
              className="flex items-center gap-1 rounded-full bg-cream-light px-3 py-1.5 text-xs font-semibold text-forest-dark"
            >
              <History className="h-3.5 w-3.5" />
              Riwayat
            </button>
          ) : (
            <Link
              href="/analisis"
              className="flex items-center gap-1 rounded-full bg-cream-light px-3 py-1.5 text-xs font-semibold text-forest-dark"
            >
              <ScanSearch className="h-3.5 w-3.5" />
              Analisis
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}