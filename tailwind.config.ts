import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)"],
        atlantic: ["var(--font-atlantic)"],
      },
      colors: {
        "color-1": "#3B3D45",
        "color-2": "#525262",
        "color-3": "#DD127B",
        "color-4": "#2D3748",
        "color-5": "#AAA6A6",
        "color-6": "#796767",
        "color-7": "#666666",
        "color-8": "#555555",
        "color-9": "#333333",
        "color-10": "#999999",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar-hide")],
} satisfies Config;

export default config;
