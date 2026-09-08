/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        studio: {
          bg: '#080808',
          card: '#121212',
          cardHover: '#181818',
          border: '#232323',
          borderLight: '#323232',
          red: '#FF1F2D', // TRA Red dot accent
          redHover: '#E01724',
          muted: '#8E8E93',
          subtle: '#5A5A60',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
