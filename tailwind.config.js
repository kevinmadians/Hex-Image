/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fade-in 0.2s ease-out forwards',
      },
      fontFamily: {
        sans: ['Lexend Deca', 'sans-serif'],
      },
    },
  },
  plugins: [],
};