/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Extracted directly from Figma — see reference/DESIGN_TOKENS.md
        bg: "#f8fafc",
        ink: "#0f172a", // headings / dark text
        muted: "#475569", // body / secondary text
        border: "#e2e8f0",
        tag: "#f1f5f9",
        cyan: "#06b6d4",
        purple: "#a855f7",
      },
      fontFamily: {
        heading: ["Manrope", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(90deg, #06b6d4 0%, #a855f7 100%)",
      },
      borderRadius: {
        card: "12px",
        btn: "8px",
        pill: "30px",
      },
      boxShadow: {
        card: "0px 4px 8px rgba(15,23,42,0.03)",
        hero: "0px 16px 32px rgba(15,23,42,0.03)",
        // Deeper, layered shadows for the 3D-depth pass — used on
        // tilt cards and elevated surfaces to sell physical depth.
        "depth-sm": "0px 2px 4px rgba(15,23,42,0.04), 0px 1px 2px rgba(15,23,42,0.06)",
        "depth-md": "0px 12px 24px rgba(15,23,42,0.08), 0px 4px 8px rgba(15,23,42,0.04)",
        "depth-lg": "0px 24px 48px rgba(15,23,42,0.12), 0px 8px 16px rgba(15,23,42,0.06)",
        "depth-glow": "0px 8px 32px rgba(168,85,247,0.15), 0px 4px 12px rgba(6,182,212,0.1)",
      },
      keyframes: {
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "50%": { transform: "translateY(-24px) translateX(12px)" },
        },
        "float-slower": {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "50%": { transform: "translateY(20px) translateX(-16px)" },
        },
      },
      animation: {
        "float-slow": "float-slow 8s ease-in-out infinite",
        "float-slower": "float-slower 11s ease-in-out infinite",
      },
      perspective: {
        1000: "1000px",
      },
    },
  },
  plugins: [],
};
