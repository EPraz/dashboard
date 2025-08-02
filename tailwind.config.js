const customTheme = require('./tailwind/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class", // Soporte para dark mode con clase 'dark'
  theme: {
    extend: {
      colors: customTheme
    },
  },
  plugins: [],
}