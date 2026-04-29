/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        /* Theme tokens come from CSS variables (see src/index.css). */
        primary: "var(--brand-primary)",
        secondary: "var(--text-secondary)",
        accent: "var(--surface)",

        /* Semantic extras (we use these as we refactor for theme support). */
        surface: "var(--surface)",
        "surface-elevated": "var(--surface-elevated)",
        border: "var(--border)",
        "text-primary": "var(--text-primary)",
        "text-tertiary": "var(--text-tertiary)",
        "brand-secondary": "var(--brand-secondary)",
        highlight: "var(--accent)",
      },
      fontFamily: {
        marathi: ["Tiro Devanagari Marathi", "serif"],
        english: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

