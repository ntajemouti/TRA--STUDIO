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
          red: '#B00000', // TRA Brand Red #B00000
          redHover: '#8F0000',
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
