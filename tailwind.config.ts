import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0e0e0c",
          50: "#5a5a55",
          100: "#3d3d39",
          200: "#262624",
          900: "#0e0e0c",
        },
        cream: {
          DEFAULT: "#f3eee3",
          50: "#fbf8f1",
          100: "#f3eee3",
          200: "#e9e1cf",
          300: "#dcd1b7",
        },
        gold: {
          DEFAULT: "#b08742",
          light: "#c9a961",
          dark: "#8a6a32",
        },
        moss: {
          DEFAULT: "#5a7a5e",
          light: "#7a9a7e",
          dark: "#3f5a44",
        },
        rust: {
          DEFAULT: "#a85a3a",
          light: "#c47a55",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "10xl": "10rem",
        "12xl": "12rem",
      },
      letterSpacing: {
        tightest: "-0.05em",
        wider2: "0.18em",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "slide-up": "slideUp 0.8s cubic-bezier(0.4,0,0.2,1) forwards",
        marquee: "marquee 38s linear infinite",
        "marquee-rev": "marquee-rev 38s linear infinite",
        blob: "blob 18s ease-in-out infinite",
        ticker: "ticker 24s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-rev": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(30px,-40px) scale(1.08)" },
          "66%": { transform: "translate(-20px,30px) scale(0.95)" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
