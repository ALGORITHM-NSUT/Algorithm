/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'polygon': "url('/static/Polygon Luminary.svg')",
      },
    },
  },
  plugins: [
    import('tailwind-scrollbar'),
    import('@tailwindcss/line-clamp'),
  ],
};
