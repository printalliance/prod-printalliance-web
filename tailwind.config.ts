import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx}",
    "./src/lib/**/*.{js,ts,jsx,tsx}",
    "./src/utils/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#001F3F",
        red: "#E63946",
        gray: {
          light: "#F8F9FA",
          dark: "#2C3E50",
        },
      },
      fontFamily: {
        inter: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      boxShadow: {
        card: "0 10px 30px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [forms],
};

export default config;

