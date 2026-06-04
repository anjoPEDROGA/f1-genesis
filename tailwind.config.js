/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        bg: "#050505",
        surface: "#111111",
        surface2: "#181818",
        surface3: "#202020",

        border: "#2b2b2b",

        primary: "#E10600",
        gold: "#C9A84C",

        text: "#F3F3F3",
        muted: "#7D7D7D",
      },

      boxShadow: {
        glow: "0 0 25px rgba(225, 6, 0, 0.25)",
      },

      borderRadius: {
        panel: "24px",
      },

      backdropBlur: {
        xs: "2px",
      },
    },
  },

  plugins: [],
}