/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ehc: {
          emerald: {
            50: '#f0fdf4',
            100: '#dcfce7',
            200: '#bbf7d0',
            500: '#10b981',
            600: '#059669',
            700: '#047857',
            800: '#065f46',
            900: '#022c22',
          },
          gold: {
            50: '#fffbeb',
            100: '#fef3c7',
            400: '#fbbf24',
            500: '#f59e0b',
            600: '#d97706',
            700: '#b45309',
          },
          navy: {
            800: '#0f172a',
            900: '#0b0f19',
            950: '#070a10',
          },
          sand: {
            50: '#faf8f5',
            100: '#f4efe6',
            200: '#e7decb',
            300: '#d5c4a7',
          }
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        heading: ['Outfit', 'Plus Jakarta Sans', 'sans-serif']
      }
    },
  },
  plugins: [],
}
