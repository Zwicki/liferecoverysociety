/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        phoenix: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          red: '#dc2626',
          crimson: '#b91c1c',
          darkRed: '#7f1d1d'
        },
        bronze: {
          50: '#fdf8f4',
          100: '#f9eee3',
          200: '#f1d6be',
          300: '#e5b993',
          400: '#d59461',
          500: '#c57739',
          600: '#a75a2a',
          700: '#844222',
          800: '#6d3620',
          900: '#5a2d1d',
        },
        slateDark: {
          850: '#151f33',
          900: '#0f172a',
          950: '#090d16',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}
