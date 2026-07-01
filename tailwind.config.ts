import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#641215",
          hover: "#7a1a1e",
          light: "#f7eded",
        },
        secondary: {
          DEFAULT: "#102039",
          hover: "#182d4f",
          light: "#e7ecf4",
        },
        accent: {
          DEFAULT: "#e2b13c", // Gold/yellow for industrial theme highlights
          hover: "#cfa132",
        }
      },
      fontFamily: {
        sans: ["var(--font-josefin)", "sans-serif"],
        display: ["var(--font-josefin)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
