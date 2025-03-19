/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#f7f7f8',
          100: '#eeeef1',
          200: '#d5d5db',
          300: '#b0b1bb',
          400: '#848595',
          500: '#6b6c7f',
          600: '#555669',
          700: '#444455',
          800: '#383847',
          900: '#31313d',
          950: '#1c1c24',
        },
      },
    },
  },
  plugins: [],
};