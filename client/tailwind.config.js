/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      width: {
        '72px': '72px',
        91.5: '368px',
        125: '500px',
        '162px': '162px',
        '265px': '265px',
        '344px': '344px',
        '414px': '414px',
        '1224px': '1224px',
        '1500px': '1500px',
      },
      height: {
        '72px': '72px',
        91.5: '368px',
        108: '432px',
        125: '500px',
        '162px': '162px',
        '265px': '265px',
        '344px': '344px',
        '414px': '414px',
      },
      colors: {
        codecolor: '#7F56D9',
        codecolordark: '#573b94',
        codecolorlight: '#e8defc',
        codecolorlighter: '#ece3ff',
        spiralcolor: 'rgba(32, 180, 134, 0.25)',
        blackcodecolor: '#101828',
      },
      lineHeight: {
        20: '5rem',
      },
      spacing: {
        '510px': '510px',
        '480px': '490px'
      },
      screens: {
        '3xl': '2000px',
        '4xl': '2500px',
        '5xl': '3000px',
        '6xl': '3800px',
        '7xl': '4900px',

      },
    }
  },
  plugins: [],
}
