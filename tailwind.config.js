/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      animation: {
        'shake':'shake 0.9s ease-in-out infinite',
        'scale':'scale 2s ease-in-out infinite'
      },
      keyframes:{
        shake:{
          '0%, 100%': { transform:'rotate(10deg)'},
          '50%': { transform:'rotate(-10deg)'}
        },
        scale:{
          '0%,100%': { opacity:'0.5'},
          '50%':{ opacity:'0.9'}
        }
      },
    },
  },
  plugins: [],
};
