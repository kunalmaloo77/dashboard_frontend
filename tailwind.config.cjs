/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        circle7124: {
          '0%': { top: '60px', height: '5px', borderRadius: '50px 50px 25px 25px', transform: 'scaleX(1.7)' },
          '40%': { height: '20px', borderRadius: '50%', transform: 'scaleX(1)' },
          '100%': { top: '0%' },
        },
        shadow046: {
          '0%': { transform: 'scaleX(1.5)' },
          '40%': { transform: 'scaleX(1)', opacity: '.7' },
          '100%': { transform: 'scaleX(.2)', opacity: '.4' },
        },
      },
      animation: {
        circle7124: 'circle7124 .5s alternate infinite ease',
        shadow046: 'shadow046 .5s alternate infinite ease',
      },
    },
  },
  plugins: [],
});
