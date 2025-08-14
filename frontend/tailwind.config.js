/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dashboard: 'rgba(62, 24, 113)',
        slider: 'rgba(20, 5, 43, 0.5)',
      },
    },
  },
  plugins: [],
}