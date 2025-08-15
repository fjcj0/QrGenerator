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
        slider: 'rgba(20, 5, 43)',
      },
      fontFamily: {
        josefinSans: ['"Josefin Sans"', 'sans-serif'],
        josefinSlab: ['"Josefin Slab"', 'serif'],
        hachiMaruPop: ['"Hachi Maru Pop"', 'cursive'],
        mochiyPopPOne: ['"Mochiy Pop P One"', 'sans-serif'],
        poppins: ['"Poppins"', 'sans-serif'],
        kanchenjunga: ['"Kanchenjunga"', 'sans-serif'],
      },
      fontSize: {
        extraSmall: "10px;", 
      }
    },
  },
  plugins: [],
};