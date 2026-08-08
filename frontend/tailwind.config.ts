import type { Config } from "tailwindcss";

const config: Config = {
  
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Hijau tua - warna utama (button, card gelap, navbar aktif)
        forest: {
          DEFAULT: "#3E4A2D",
          light: "#4E5C38",
          dark: "#2E3821",
        },
        // Hijau sedang - card sekunder / hover
        moss: "#6E7F4E",
        // Krem terang - background utama & card muda
        cream: {
          DEFAULT: "#F7F3E3",
          light: "#FBF9F0",
        },
        // Kuning-krem - card highlight (statistik, urgensi)
        sand: "#F1EAC0",
        // Aksen terracotta - highlight kata penting
        clay: "#E08A6B",
        // Merah - status error / peringatan
        alert: "#B5342A",
        rank1: "#3E4A2D",
        rank2: "#8A7B2E",
        rank3: "#8C3B33",
        
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
    },
  },
  plugins: [],
};
export default config;
