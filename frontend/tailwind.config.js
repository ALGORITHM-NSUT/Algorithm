/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage:
      {
        'polygon': "url('/src/assets/Polygon Luminary.svg')"
      }
    },
  },
  plugins: [],

};