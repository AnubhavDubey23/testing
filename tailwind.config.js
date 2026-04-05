/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: { light: "#2F8E92", dark: "#3BA0A4" },
        secondary: { light: "#10b981", dark: "#059669" },
        danger: { light: "#ef4444", dark: "#dc2626" },
        dark: { 800: "#1e293b", 900: "#0f172a" },
        navy: "#0B0F17",
        teal: { DEFAULT: "#2F8E92", dark: "#1E5C5F", light: "#3BA0A4" },
        cloud: "#F6F8FC",
        glass: {
          light: "rgba(255, 255, 255, 0.2)",
          dark: "rgba(15, 23, 42, 0.5)",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Outfit", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-1": [
          "clamp(2.75rem, 5vw, 4.5rem)",
          { lineHeight: "1.05", letterSpacing: "-0.02em" },
        ],
        "display-2": [
          "clamp(2rem, 3.6vw, 3.25rem)",
          { lineHeight: "1.1", letterSpacing: "-0.02em" },
        ],
        "display-3": [
          "clamp(1.5rem, 2.5vw, 2.25rem)",
          { lineHeight: "1.15", letterSpacing: "-0.01em" },
        ],
      },
      boxShadow: {
        glass: "0 18px 50px rgba(11, 15, 23, 0.10)",
        "glass-lg": "0 24px 60px rgba(11, 15, 23, 0.14)",
        chip: "0 10px 30px rgba(11, 15, 23, 0.08)",
        glow: "0 0 40px rgba(47, 142, 146, 0.25)",
        "glow-green": "0 0 15px rgba(16, 185, 129, 0.5)",
        "inner-xl": "inset 0 4px 6px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
}
