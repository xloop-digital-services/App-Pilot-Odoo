/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
    colors: {
      'bg-primary': '#F5F5F5',
      'bg-secondary': '#EE1D23',
      'bg-avatar' : '#000000',
      white : '#FFFFFF',
      'h-color' : "#252363",
      'btn-color' : '#141414',
      'sidbar-color' : '#FAF0F0',
    },
  },
  plugins: [],
};
