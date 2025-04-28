import type { Config } from "tailwindcss";

const config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 20s linear infinite",
      },
      scale: {
        102: "1.02",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
