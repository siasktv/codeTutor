/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width:{
        '91.5':'368px',
        '125':'500px'
      },
      height:{
        '108':'432px',
        '125':'500px'
      },
      colors: {
        'codecolor': '#7F56D9'
      }
    },
  },
  plugins: [],
}