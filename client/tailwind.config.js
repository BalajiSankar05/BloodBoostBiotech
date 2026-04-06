/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blood: {
          50: '#fdf2f2',
          100: '#fbe5e5',
          200: '#f8cccc',
          300: '#f4a6a6',
          400: '#ee7777',
          500: '#e54343',
          600: '#d22727',
          700: '#b01d1d',
          800: '#911b1b',
          900: '#781c1c',
          950: '#410b0b',
        }
      }
    },
  },
  plugins: [],
}
