/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class", // Soporte para dark mode con clase 'dark'
  theme: {
    extend: {
      colors: {
        // Paleta personalizada
        primary: "#0c232a",     // Azul oscuro
        secondary: "#29bfbd",   // Aqua
        background: "#fffddb",  // Crema
        card: "#ffffff",        // Blanco puro
        muted: "#d0dcdb",       // Background del dashboard (extraído de imagen)
        accent: "#29bfbd",      // Puede usarse también para botones, toggles, etc.
        foreground: "#0c232a",

        // Para usar con variantes como hover/bg/text, etc.
        custom: {
          primary: "#0c232a",
          accent: "#29bfbd",
          cream: "#fffddb",
          white: "#ffffff",
          muted: "#d0dcdb",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      screens: {
        web: "768px",
      },
    },
  },
  plugins: [],
}