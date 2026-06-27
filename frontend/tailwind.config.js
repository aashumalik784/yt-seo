/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ytred: '#FF0000',
        ytdark: '#0F0F0F',
        ytgray: '#272727',
      }
    },
  },
  plugins: [],
}
