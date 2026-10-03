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
          bg: '#0A0A0A',
          card: '#121212',
          cardHover: '#181818',
          border: '#232323',
          borderLight: '#323232',
          red: '#5A0F14', // Deep Burgundy / Dark Blood-Red #5A0F14
          redHover: '#75141B', // Rich Burgundy hover
          burgundy: '#5A0F14',
          burgundyLight: '#8A1C24',
          burgundyDark: '#3E0A0E',
          muted: '#8E8E93',
          subtle: '#5A5A60',
        }
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
