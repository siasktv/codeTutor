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
        '125':'500px',
        '162px':'162px',
        '265px':'265px',
        '344px':'344px',
        '414px':'414px',
        '1224px':'1224px',
      },
      height:{
        '108':'432px',
        '125':'500px',
        '162px':'162px',
        '265px':'265px',
        '344px':'344px',
        '414px':'414px',
      },
      colors: {
        'codecolor': '#7F56D9',
        'spiralcolor':'rgba(32, 180, 134, 0.25)',
        'blackcodecolor': '#101828'
      },
      lineHeight: {
        '20': '5rem',
      },
      spacing: {
        '510px': '510px',
      },
    },
  },
  plugins: [],
}