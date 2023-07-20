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
    keyframes: {
      'slide-top': {
        '0%': {
          '-webkit-transform': 'translateY(40px)',
          transform: 'translateY(40px)',
        },
        '100%': {
          '-webkit-transform': 'translateY(0)',
          transform: 'translateY(0)',
        },
      },
    },
    animation: {
      'slide-top':
        'slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
    },
  },
  plugins: ['@tailwindcss/line-clamp'],
};
