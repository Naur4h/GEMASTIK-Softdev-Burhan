import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";

const display = Poppins({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "NUSA-CROP | Kenali Tanahmu, Tanam Lebih Beragam",
  description:
    "Analisis lahanmu dan temukan rekomendasi tanaman pangan lokal terbaik dengan NUSA-CROP.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body
        className={`${display.variable} ${body.variable} font-body bg-cream text-forest-dark`}
      >
        {children}
      </body>
    </html>
  );
}