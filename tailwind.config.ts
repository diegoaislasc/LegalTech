import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F8FAFC",
        foreground: "#0F172A",
        primary: {
          DEFAULT: "#1E3A8A",
          foreground: "#F8FAFC",
        },
        secondary: {
          DEFAULT: "#1E40AF",
          foreground: "#F8FAFC",
        },
        accent: {
          DEFAULT: "#B45309",
          foreground: "#F8FAFC",
        },
        muted: {
          DEFAULT: "#F1F5F9",
          foreground: "#64748B",
        },
      },
      fontFamily: {
        heading: ["var(--font-eb-garamond)", "serif"],
        body: ["var(--font-lato)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
