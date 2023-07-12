/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      main: ['Poppins', 'sans - serif'],
    },
    extend: {
      width: {
        main: '1220px',
      },
      backgroundColor: {
        main: '#ee3131',
      },
      colors: {
        main: '#ee3131',
      },
    },
  },
  plugins: [],
};
